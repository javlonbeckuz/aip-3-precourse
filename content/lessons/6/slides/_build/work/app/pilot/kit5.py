"""Kit 5 numbers (Sinov va hisob-kitob), counted from the journal.

Only what the bot can honestly count is filled in:
  B.1 requests, B.3 wrong answers, B.5 fully resolved, model cost, hand-overs, B.13 error log.
Everything that needs a person (B.2 minutes per task, B.4 repeats, B.6 deals, B.7 checking
hours, B.8 complaints, setup costs, money found) is marked "qo‘lda" for the owner to fill.
Totals only: no per-person rows, no reply speeds, no online times.
"""

from __future__ import annotations

import csv
import io
import tomllib
from dataclasses import dataclass, field
from datetime import date, timedelta
from pathlib import Path

from .config import Config
from .journal import Journal
from . import texts

MANUAL = "qo‘lda"

# Official Kit 5 Form B labels and order (Praktikum 3.0 kits: kits/KIT_05_Sinov_va_hisob_UZ_LATN.md).
METRICS = [
    ("B.1", "Bajarilgan so‘rovlar", "requests"),
    ("B.2", "O‘rtacha vaqt, daqiqa", None),
    ("B.3", "Xato javoblar", "wrong"),
    ("B.4", "Takroriy so‘rovlar", None),
    ("B.5", "To‘liq hal qilingan so‘rovlar", "resolved"),
    ("B.6", "Yakunlangan bitimlar yoki buyurtmalar", None),
    ("B.7", "Xodimning tekshirishga sarflagan vaqti, soat", None),
    ("B.14", "Topilgan pul, so‘m", None),
    ("B.8", "Mijoz shikoyatlari", None),
]
EXTRA = [
    ("+", "Qo‘shimcha: odamga uzatilgan so‘rovlar", "escalated"),
    ("+", "Qo‘shimcha: model xarajati, $", "cost"),
]


@dataclass
class Numbers:
    requests: int = 0
    answered: int = 0
    escalated: int = 0
    wrong: int = 0
    resolved: int = 0
    errors: int = 0
    cost: float = 0.0
    send_failures: int = 0
    wrong_items: list[dict] = field(default_factory=list)


def count(events: list[dict]) -> Numbers:
    n = Numbers()
    exchanges: dict[str, dict] = {}
    answered_ids: set[str] = set()
    wrong: dict[str, dict] = {}

    for ev in events:
        kind = ev.get("type")
        if kind == "exchange":
            if ev.get("status") == "limit":
                continue  # spam guard in public mode, not a real request
            exchanges[ev["id"]] = ev
            n.requests += 1
            n.cost += float(ev.get("cost_usd") or 0.0)
            status = ev.get("status")
            if status == "answered":
                answered_ids.add(ev["id"])
            elif status in ("escalated", "error", "budget"):
                n.escalated += 1  # handed to a person (paused questions are counted in B.1 only)
            if status == "error":
                n.errors += 1
        elif kind == "review":
            if ev.get("action") in ("approved", "edited"):
                answered_ids.add(ev["id"])
            if ev.get("action") in ("rejected", "edited"):
                wrong.setdefault(ev["id"], {"found_by": ev.get("by_name", ""), "note": "", "ts": ev["ts"]})
                if ev.get("action") == "edited":
                    wrong[ev["id"]]["note"] = f"xodim tuzatdi: {ev.get('text', '')[:160]}"
        elif kind == "system" and ev.get("kind") == "send_failed":
            n.send_failures += 1
        elif kind in ("job", "tool"):
            n.cost += float(ev.get("cost_usd") or 0.0)  # scheduled jobs, pilot ask/eval cost money too (B.9)
        elif kind == "feedback" and ev.get("verdict") == "bad":
            wrong.setdefault(ev["id"], {"found_by": ev.get("by_name", ""), "note": "", "ts": ev["ts"]})
        elif kind == "feedback_note":
            if ev["id"] in wrong:
                wrong[ev["id"]]["note"] = ev.get("note", "")

    wrong = {k: v for k, v in wrong.items() if k in exchanges}
    n.answered = len(answered_ids)
    n.wrong = len(wrong)
    n.resolved = len(answered_ids - set(wrong))
    for ex_id, info in sorted(wrong.items(), key=lambda kv: kv[1]["ts"]):
        ex = exchanges[ex_id]
        n.wrong_items.append({
            "date": info["ts"][:10],
            "question": ex.get("question", ""),
            "answer": ex.get("answer", ""),
            "note": info["note"],
            "found_by": info["found_by"],
            "id": ex_id,
        })
    return n


def numbers_for(journal: Journal, start: date, end: date) -> Numbers:
    return count(list(journal.events(start, end)))


# ------------------------------------------------------------------ daily report


def owner_notes(paused: bool, month_share: int, data_problems: list[str]) -> list[str]:
    """The "Diqqat" lines under a report: things the owner should look at."""
    notes = []
    if paused:
        notes.append(texts.NOTE_PAUSED)
    if month_share >= 80:
        notes.append(texts.NOTE_BUDGET.format(pct=month_share))
    notes += [texts.NOTE_DATA.format(detail=p) for p in data_problems]
    return notes


def daily_report(cfg: Config, journal: Journal, day: date, month_cost: float,
                 notes: list[str] | None = None) -> str:
    n = numbers_for(journal, day, day)
    text = texts.DAILY_REPORT.format(
        day=texts.day_label(day), agent=cfg.agent_name, requests=n.requests,
        answered=n.answered, escalated=n.escalated, wrong=n.wrong, resolved=n.resolved,
        errors=n.errors, cost=n.cost, month_cost=month_cost, monthly_cap=cfg.monthly_budget_usd,
    )
    notes = list(notes or [])
    if n.errors:
        notes.append(texts.NOTE_ERRORS)
    if n.send_failures:
        notes.append(texts.NOTE_SEND_FAILED.format(n=n.send_failures))
    if n.wrong:
        notes.append(texts.NOTE_WRONG)
    if notes:
        text += texts.REPORT_NOTES.format(notes="\n".join(notes))
    return text


def error_list(journal: Journal, start: date, end: date, limit: int = 10) -> str:
    items = numbers_for(journal, start, end).wrong_items[-limit:]
    if not items:
        return texts.NO_ERRORS
    lines = ["❌ Xato deb belgilangan javoblar:"]
    for it in items:
        lines.append(
            f"\n{it['date']} #{it['id']}\nSavol: {it['question'][:200]}\nJavob: {it['answer'][:300]}"
            + (f"\nIzoh: {it['note']}" if it["note"] else "")
        )
    return "\n".join(lines)


# ------------------------------------------------------------------ weekly export


def load_baseline(app_dir: Path) -> dict[str, float]:
    path = app_dir / "kit5-baseline.toml"
    if not path.exists():
        return {}
    raw = tomllib.loads(path.read_text(encoding="utf-8"))
    out = {}
    for key, value in raw.items():
        if isinstance(value, (int, float)):
            out["B." + key[1:] if key.upper().startswith("B") and "." not in key else key.upper()] = float(value)
    return out


def pilot_weeks(cfg: Config, today: date) -> list[tuple[str, date, date]]:
    """(label, first day, last day) for every pilot week up to today.
    A week that is not over yet is labelled with its number of days, e.g. "2-hafta (3 kun)"."""
    if cfg.pilot_start_date is None or cfg.pilot_start_date > today:
        return [("Oxirgi 7 kun", today - timedelta(days=6), today)]
    weeks = []
    start = cfg.pilot_start_date
    i = 1
    while start <= today:
        end = min(start + timedelta(days=6), today)
        days = (end - start).days + 1
        weeks.append((f"{i}-hafta" + (f" ({days} kun)" if days < 7 else ""), start, end))
        start += timedelta(days=7)
        i += 1
    return weeks


def _fmt(value) -> str:
    if isinstance(value, float):
        return str(int(value)) if value.is_integer() else f"{value:.2f}"
    return str(value)


def _change(base: float | None, last) -> str:
    if base is None or not isinstance(last, (int, float)):
        return ""
    diff = last - base
    pct = f" ({diff / base * 100:+.0f}%)" if base else ""
    return f"{diff:+.0f}{pct}"


def weekly_tables(cfg: Config, journal: Journal, today: date) -> tuple[list[str], list[list[str]], Numbers]:
    weeks = pilot_weeks(cfg, today)
    baseline = load_baseline(cfg.app_dir)
    per_week = [numbers_for(journal, s, e) for _, s, e in weeks]
    # Compare the baseline week with the last full week (a half week would look like a drop).
    full = [i for i, (label, _, _) in enumerate(weeks) if "kun)" not in label]
    ref = full[-1] if full else len(weeks) - 1
    header = ["Kod", "Ko‘rsatkich", "Agentgacha"] + [w[0] for w in weeks] + ["O‘zgarish"]
    rows = []
    for code, label, attr in METRICS + EXTRA:
        base = baseline.get(code)
        base_cell = _fmt(base) if base is not None else (MANUAL if code != "+" else "")
        if attr is None:
            cells = [MANUAL] * len(weeks)
            change = ""
        else:
            values = [getattr(n, attr) for n in per_week]
            cells = [_fmt(round(v, 2)) if isinstance(v, float) else _fmt(v) for v in values]
            change = _change(base, values[ref]) if code != "+" else ""
        rows.append([code, label, base_cell, *cells, change])
    return header, rows, per_week[-1]


def weekly_markdown(cfg: Config, journal: Journal, today: date) -> str:
    header, rows, last = weekly_tables(cfg, journal, today)
    weeks = pilot_weeks(cfg, today)
    first, final = weeks[0][1], weeks[-1][2]
    md = [
        f"# Sinov raqamlari: {cfg.agent_name}",
        "",
        f"Davr: {first.isoformat()} - {final.isoformat()}.",
        f"Yaratildi: {journal.now().strftime('%Y-%m-%d %H:%M')} (bot jurnalidan).",
        "",
        "| " + " | ".join(header) + " |",
        "|" + "---|" * len(header),
    ]
    md += ["| " + " | ".join(r) + " |" for r in rows]
    md += [
        "",
        "## Xarajatlar",
        "",
        "| Kod | Xarajat | Qiymat |",
        "|---|---|---|",
        f"| B.9 | Obuna | model (OpenRouter): ${last.cost:.2f} oxirgi haftada; VPS va boshqa obunalar: {MANUAL} |",
        f"| B.10 | Integratsiya va sozlash | {MANUAL} |",
        f"| B.11 | Tekshirish soati x soatbay haq | {MANUAL} |",
        f"| B.12 | Jami | {MANUAL} |",
        "",
        "## Natija",
        "",
        "| Kod | Ko‘rsatkich | Hisob |",
        "|---|---|---|",
        "| B.15 | Tejalgan vaqt, soat/hafta | (B.2 agentgacha - B.2 sinovda) x B.1 / 60 - B.7 |",
        "| B.16 | Bitta bajarilgan ish narxi: agent / inson | agent: B.12 / B.5 yig‘indisi; "
        "inson: B.2 agentgacha / 60 x soatbay haq |",
        "",
        "## Xatolar jurnali (B.13)",
        "",
        "| Sana | Nima bo‘ldi | Kim topdi | Nimani o‘zgartirdik |",
        "|---|---|---|---|",
    ]
    all_wrong = numbers_for(journal, first, final).wrong_items
    for it in all_wrong:
        what = f"Savol: {it['question'][:120]} / Javob: {it['answer'][:160]}"
        if it["note"]:
            what += f" / Izoh: {it['note'][:160]}"
        what = what.replace("|", "/").replace("\n", " ")
        md.append(f"| {it['date']} | {what} | {it['found_by']} | |")
    if not all_wrong:
        md.append("| - | Bu davrda xato belgilanmagan | - | - |")
    md += [
        "",
        "## Raqamlar qanday hisoblandi",
        "",
        "- B.1: botga kelgan barcha savollar (bot javob bergan, odamga uzatilgan va bot to‘xtatilgan paytda kelganlar).",
        "- B.3: ❌ bosilgan, rad etilgan yoki xodim tuzatgan javoblar.",
        "- B.5: bot javob bergan va xato deb belgilanmagan savollar.",
        "- Model xarajati: xodim savollari, jadvaldagi ishlar va shu serverdagi pilot ask/eval buyruqlari.",
        "  Noutbukda ishlatilgan buyruqlar bu yerga kirmaydi: aniq jami - botga /xarajat (OpenRouter kaliti bo‘yicha).",
        "- «Agentgacha» ustuni kit5-baseline.toml faylidan olinadi.",
        "- «O‘zgarish»: oxirgi to‘liq hafta minus «Agentgacha».",
        "- B.2: bitta so‘rovga odam sarflagan daqiqa, tekshirishsiz (tekshirish B.7 da).",
        "- B.14: oldi olingan xato, yo‘qolmagan so‘rov, tezroq tushgan pul; har bir summaning manbasini yozing.",
        f"- «{MANUAL}» deb yozilgan qatorlarni Siz to‘ldirasiz: bot ularni o‘lchay olmaydi.",
        "- Bu faylni kit5-pilot/numbers.md ga ko‘chiring (5-to‘plam B shakli).",
        "- Hisobot faqat jami raqamlarni ko‘rsatadi: kim qancha savol berganini ko‘rsatmaydi.",
    ]
    return "\n".join(md) + "\n"


def weekly_csv(cfg: Config, journal: Journal, today: date) -> bytes:
    header, rows, _ = weekly_tables(cfg, journal, today)
    buf = io.StringIO()
    writer = csv.writer(buf)
    writer.writerow(header)
    writer.writerows(rows)
    return buf.getvalue().encode("utf-8-sig")  # BOM so Excel shows Uzbek letters correctly


def write_exports(cfg: Config, journal: Journal, today: date) -> tuple[Path, Path]:
    out = cfg.runtime_dir / "exports"
    out.mkdir(parents=True, exist_ok=True)
    stem = f"kit5-raqamlar-{today.isoformat()}"
    md_path = out / f"{stem}.md"
    csv_path = out / f"{stem}.csv"
    md_path.write_text(weekly_markdown(cfg, journal, today), encoding="utf-8")
    csv_path.write_bytes(weekly_csv(cfg, journal, today))
    return md_path, csv_path
