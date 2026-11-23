"""Day 5 package checks. Run from anywhere (paths resolve from this file):

    uv run --no-project --with pytest --with httpx --with openpyxl --with python-dotenv --with tzdata \
        python -m pytest day-5/_build/tests -q

1. The offline simulation (pilot-template code, fake Telegram and fake model) still produces the numbers
   that the exercises, the demos, the deck and the run sheet quote. If the pilot template changes, these
   tests say which number moved, so the materials can be updated instead of silently going stale.
2. House rules: no em or en dash, one sentence per Markdown line, no absolute paths in scripts,
   no secrets, Hermes memory examples within the documented limits.
"""

from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

import pytest

HERE = Path(__file__).resolve().parent
DAY5 = HERE.parents[1]
SIM = DAY5 / "_build" / "sim" / "simulate.py"
OUT = DAY5 / "_build" / "work" / "out"
NAMUNA = DAY5 / "exercises" / "namuna"


@pytest.fixture(scope="session")
def summary() -> dict:
    run = subprocess.run([sys.executable, str(SIM)], capture_output=True, text=True, timeout=600)
    assert run.returncode == 0, run.stdout[-2000:] + run.stderr[-4000:]
    return json.loads((OUT / "summary.json").read_text(encoding="utf-8"))


def read(rel: str) -> str:
    return (DAY5 / rel).read_text(encoding="utf-8")


# ------------------------------------------------------------------ the simulation and the numbers quoted

CANON_W1 = {"B1": 132, "B3": 7, "B5": 104, "escalated": 21}   # BARAKA-CANON.md, Kit 5 numbers
CANON_W2 = {"B1": 138, "B3": 3, "B5": 121, "escalated": 14}
CANON_W1_IDS = ["2e09e4b8", "ab195b47", "c958a792", "7c213c12", "e928d1d5", "ba30a818", "3f8803ea"]


def test_eval_runs_match_the_handouts(summary):
    ev = {k: (v["passed"], v["total"]) for k, v in summary["evals"].items()}
    assert ev == {"1-oldin": (7, 12), "2-kp-olib-tashlandi": (9, 12), "3-regressiya": (9, 12), "4-keyin": (12, 12)}
    assert set(summary["evals"]["1-oldin"]["failed"]) == {
        "kafolat-kreslo", "ulgurji-5-dona", "ulgurji-6-dona", "chegirma-18-mln", "yetkazish-chirchiq"}
    assert set(summary["evals"]["3-regressiya"]["failed"]) == {
        "chakana-start-2", "chakana-ergopro-3", "chegirma-18-mln"}  # the regression: two old tests break
    ex3 = read("exercises/03-test-toplamini-qayta-ishga-tushirish.md")
    for s in ("| 7 / 12 |", "| 9 / 12 |", "| 12 / 12 |", "FAIL chakana-start-2", "FAIL kafolat-kreslo"):
        assert s in ex3, s
    deck = read("deck/assets/slides_data.js")
    for s in ("'7 / 12'", "'9 / 12'", "'12 / 12'", "[[chakana-start-2]]"):
        assert s in deck, s


def test_week_numbers_are_the_canon(summary):
    assert summary["canon_week1"] == CANON_W1
    assert summary["canon_week2"] == CANON_W2
    w1, w2 = summary["numbers"]["1-hafta"], summary["numbers"]["2-hafta"]
    assert (w1["cost"], w2["cost"]) == (0.67, 0.70)
    assert summary["escalation_tests"] == 5  # through pilot ask: they never reach the journal
    assert [w["id"] for w in w1["wrong"]] == CANON_W1_IDS
    assert [w["found_by"] for w in w1["wrong"]] == ["Malika", "Madina", "Madina", "Malika",
                                                    "Malika", "Jamshid aka", "Madina"]  # 17.12: canon, caught at approval
    weekly = (NAMUNA / "baraka-1-hafta" / "kit5-raqamlar-2026-12-20.md").read_text(encoding="utf-8")
    assert "| B.1 | Bajarilgan so‘rovlar | 120 | 132 |" in weekly       # what /hafta showed at 10:20
    assert "| B.3 | Xato javoblar | 9 | 7 |" in weekly
    assert "| B.5 | To‘liq hal qilingan so‘rovlar | 100 | 104 |" in weekly
    assert "| 0.67 |" in weekly
    numbers = read("exercises/namuna/kompaniya/kit5-pilot/numbers.md")
    for row in ("| B.1 Bajarilgan so‘rovlar | 120 | 132 |", "| B.2 O‘rtacha vaqt, daqiqa | 6 | 2,5 |",
                "| B.3 Xato javoblar | 9 | 7 |", "| B.4 Takroriy so‘rovlar | 15 | 12 |",
                "| B.5 To‘liq hal qilingan so‘rovlar | 100 | 104 |",
                "| B.7 Xodimning tekshirishga sarflagan vaqti, soat | 0 | 4,5 |",
                "| B.14 Topilgan pul, so‘m | 0 | 0 |", "| B.8 Mijoz shikoyatlari | 2 | 2 |",
                "Soatbay haq, so‘m: 35 700", "1-hafta: 3,2"):
        assert row in numbers, row
    ex5 = read("exercises/05-kit5-b-1-hafta-va-topilgan-pul.md")
    for row in ("| B.1 Bajarilgan so‘rovlar | 120 | 132 |", "| B.14 Topilgan pul, so‘m | 0 | 0 |",
                "B.15 = (6 - 2,5) x 132 / 60 - 4,5 = 7,7 - 4,5 = 3,2 soat/hafta"):
        assert row in ex5, row
    hw = read("homework.md")
    for row in ("| B.1 Bajarilgan so‘rovlar | 120 | 132 | 138 |", "| B.2 O‘rtacha vaqt, daqiqa | 6 | 2,5 | 2,0 |",
                "| B.3 Xato javoblar | 9 | 7 | 3 |", "| B.4 Takroriy so‘rovlar | 15 | 12 | 8 |",
                "| B.5 To‘liq hal qilingan | 100 | 104 | 121 |", "| B.7 Tekshirish vaqti, soat | 0 | 4,5 | 2,0 |",
                "| B.14 Topilgan pul, so‘m | 0 | 0 | 680 000 |", "| B.8 Mijoz shikoyatlari | 2 | 2 | 1 |",
                "= 9,2 - 2,0 = 7,2 soat/hafta", "6-darsdan bir kun oldin, 18:00 gacha", "26-dekabr (shanba guruhi) yoki 27-dekabr (yakshanba guruhi)"):
        assert row in hw, row


def test_error_log_ids_quoted_in_exercise_1(summary):
    xatolar = (NAMUNA / "baraka-1-hafta" / "xatolar.txt").read_text(encoding="utf-8")
    ex1 = read("exercises/01-xatolar-jurnalini-oqish.md")
    ids = re.findall(r"#([0-9a-f]{8})", ex1)
    assert sorted(set(ids)) == sorted(CANON_W1_IDS)
    for i in ids:
        assert f"#{i}" in xatolar


def test_messages_quoted_in_demos_and_run_sheet(summary):
    night = summary["night_messages"]
    total, off = night["total"], night["off_hours"]
    assert (total, off) == (46, 19)
    sentence = f"{total} messages the bot sent on its own in 13 days, {off} of them"
    assert sentence in read("instructor-run-sheet.md") and sentence in read("demos/06-tunda-ishlaydi/script.md")
    deck = read("deck/assets/slides_data.js")
    assert f"{{ n: '{total}'" in deck and f"{{ n: '{off}'" in deck
    owner_w1 = (NAMUNA / "baraka-1-hafta" / "rahbar-telegrami.txt").read_text(encoding="utf-8")
    assert "--- 2026-12-17 08:00 -> Rustamov\n⚠️ Ma’lumot manbasi muammosi: Ombor qoldig‘i (1C eksport): jadvalda qatorlar yo‘q" in owner_w1
    jamshid = (NAMUNA / "baraka-1-hafta" / "jamshid-telegrami.txt").read_text(encoding="utf-8")
    assert "Kimdan: Zarina\nSavol: ErgoPro omborda nechta bor?" in jamshid  # Thursday 09:10, empty file
    assert "#70ce7993" in jamshid and "#70ce7993" in read("exercises/06-eskalatsiya-va-qulf.md")
    owner_w2 = (NAMUNA / "baraka-2-hafta" / "rahbar-telegrami.txt").read_text(encoding="utf-8")
    assert "--- 2026-12-21 09:05 -> Rustamov\n⏰ Eng uzoq harakatsiz turgan 3 ta mahsulot" in owner_w2
    report_tue = owner_w2.split("--- 2026-12-22 09:00 -> Rustamov\n", 1)[1].split("---", 1)[0]
    for line in ("• So‘rovlar: 22", "• Javob berildi: 19", "• Odamga uzatildi: 3", "• To‘liq hal qilindi: 19"):
        assert line in report_tue, line
    otabek = owner_w2.split("--- 2026-12-22 10:30 -> Otabek\n", 1)[1].split("---", 1)[0]
    assert "26 soatdan" in otabek
    escal = (NAMUNA / "yaxshilash" / "eskalatsiya-sinovi.txt").read_text(encoding="utf-8")
    assert escal.count("ODAMGA:") == 5


def test_injection_demo_shows_both_outcomes(summary):
    natija = read("demos/07-yashirin-buyruq/natija.md")
    naive, guarded = natija.split("## 2.", 1)
    assert "8600 1234 5678 9012 kartaga" in naive.split("## 1.", 1)[1]
    assert "kartaga" not in guarded.split("## Xulosa", 1)[0].split("Qoida:", 1)[1].split("\n", 2)[2]


def test_simulation_never_leaves_this_computer(summary):
    src = SIM.read_text(encoding="utf-8")
    assert "Network blocked in the Day 5 simulation" in src
    assert "FAKE" in src and "sk-or-v1-" not in src
    assert summary["llm_calls"] > 250  # every answer went through the fake OpenRouter on 127.0.0.1


# ------------------------------------------------------------------ house rules

TEXT_SUFFIXES = {".md", ".html", ".js", ".py", ".toml", ".txt", ".json", ".jsonl", ".css", ".diff", ".csv"}
SKIP_PARTS = {"work", "qa", "__pycache__", ".pytest_cache"}


def authored_files():
    for p in DAY5.rglob("*"):
        if p.is_file() and p.suffix in TEXT_SUFFIXES and not (SKIP_PARTS & set(p.relative_to(DAY5).parts)):
            yield p


def test_no_em_or_en_dash():
    bad = [str(p.relative_to(DAY5)) for p in authored_files()
           if "\N{EM DASH}" in p.read_text(encoding="utf-8", errors="ignore")
           or "\N{EN DASH}" in p.read_text(encoding="utf-8", errors="ignore")]
    assert bad == []


SENTENCE = re.compile(r"[a-zA-Z0-9)»”'’`*][.!?] +[«\"A-ZÀ-ÝО-ЯЎҚҒҲ][a-z‘’'a-zа-я]")
ABBR = ("e.g.", "i.e.", "No.", "vs.", "Dr.", "S.A.", "etc.", "Ctrl+A", "Cmd+A")


def test_markdown_one_sentence_per_line():
    bad = []
    for p in DAY5.rglob("*.md"):
        rel = p.relative_to(DAY5)
        if (SKIP_PARTS & set(rel.parts) or "hermes-namuna" in rel.parts
                or rel.parts[:2] == ("exercises", "namuna") and "kompaniya" not in rel.parts):
            continue
        fence = False
        for n, line in enumerate(p.read_text(encoding="utf-8").splitlines(), 1):
            if line.strip().startswith("```"):
                fence = not fence
                continue
            if fence or line.lstrip().startswith(("|", ">", "    ", "#")):
                continue
            text = re.sub(r"«[^»]*»|\"[^\"]*\"|‹[^›]*›", "«»", line)  # a quoted line is one unit
            text = re.sub(r"\*\*\d+\.\s", "**", text)
            text = re.sub(r"^\s*(\d+[.-]\S*\s+|[-*]\s+)?(\[[ x]\]\s+)?(\d+\.\s+)?", "", text)
            text = re.sub(r"`[^`]*`", "``", text)
            text = re.sub(r"\*\*[^*]+:\*\*", "", text)  # glossary labels: **Nima:** ... **Misol:** ...
            for a in ABBR:
                text = text.replace(a, a.replace(".", ""))
            if SENTENCE.search(text):
                bad.append(f"{rel}:{n}: {line.strip()[:90]}")
    assert bad == [], "\n".join(bad)


def test_scripts_use_relative_paths():
    for p in (DAY5 / "_build").rglob("*.py"):
        if SKIP_PARTS & set(p.relative_to(DAY5).parts):
            continue
        text = p.read_text(encoding="utf-8")
        assert "/" + "Users/" not in text, p


def test_no_secret_shaped_strings():
    token = re.compile(r"\b\d{8,10}:[A-Za-z0-9_-]{30,}\b")
    key = re.compile(r"sk-or-v1-[0-9a-f]{20,}")
    for p in authored_files():
        text = p.read_text(encoding="utf-8", errors="ignore")
        assert not key.search(text), p
        for m in token.finditer(text):
            assert "FAKE" in m.group(0), (p, m.group(0)[:16])


def test_hermes_memory_examples_within_limits():
    base = DAY5 / "demos" / "04-xotira-fayllari" / "hermes-namuna"
    assert len((base / "USER.md").read_text(encoding="utf-8")) <= 1375
    assert len((base / "MEMORY.md").read_text(encoding="utf-8")) <= 2200


def test_every_run_of_show_block_has_material():
    sheet = read("instructor-run-sheet.md")
    for path in ("demos/01-xatodan-tuzatishgacha/", "demos/02-ertalabki-hisobot/", "demos/03-eskalatsiya/",
                 "demos/04-xotira-fayllari/", "demos/05-hermes/", "demos/06-tunda-ishlaydi/",
                 "demos/07-yashirin-buyruq/", "demos/08-bir-mahsulot-turli-nom/"):
        assert path in sheet and (DAY5 / path / "script.md").exists(), path
    for n in range(1, 8):
        assert any(p.name.startswith(f"0{n}-") for p in (DAY5 / "exercises").glob("*.md")), n
        assert f"0{n}-" in sheet or f"xercise {n}" in sheet or f"and {n}" in sheet, n
