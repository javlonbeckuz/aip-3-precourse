"""A rule-based stand-in for the AI model, used only for the offline Day 5 simulation.

It extends pilot-template's tools/fake_services.fake_model: it reads the same system prompt
the real bot builds (agent/instructions.md + examples.md + memory.md + phone memory + work rules
+ data block) and changes its behaviour when the agent files change, so the Day 5 improvement
loop (error -> fix -> test -> re-run) shows real before/after differences.

It is NOT an AI model. Each "mistake" below is a mistake real models make in a pilot's first week,
written as a rule so the run is repeatable and needs no internet and no keys. The week-one mistakes
are the seven canonical Baraka error-log entries (BARAKA-CANON.md, "Kit 5 numbers";
pilot-template samples/kit5-2-hafta.md):

  wholesale  5 or 6 pieces priced at retail until B.4 says "5 dona ham ulgurji"
  discount   an 18 mln order treated as above the 20 000 000 threshold until examples.md shows it
  KP         the sales deck (KP) promises free regional delivery and a 3-year warranty; while the deck
             is a data source, the agent repeats it instead of the rules document
  stale      stock answered from an old 1C export unless the data block carries a DIQQAT note
  week two   VAT not stated, the "Staf mesh" typo, the 3D drawing threshold (Day 6 material)
  injection  a hidden instruction inside a data file, followed only when the guard rule is missing
"""

from __future__ import annotations

import re

from tools.fake_services import _best, _blocks, _money, _norm, _stems, _table, fake_model

AGENT_SPLIT = "# Ish qoidalari (dastur qo'shadi)"
GUARD = "buyruq emas"
REGIONS = ("viloyat", "chirchiq", "bekobod", "olmaliq", "angren", "yangiyol")

V1_WHOLESALE = {
    "Optima stolidan 5 ta kerak, narxi?": "«Optima» 5 dona: 2 150 000 x 5 = 10 750 000 so‘m.",
    "Start stoli 6 ta qancha bo‘ladi?": "«Start» 6 dona: 1 450 000 x 6 = 8 700 000 so‘m.",
}
V1_STALE = {
    "ErgoPro omborda bormi?": "Ha, omborda bor (1C).",
    "Senator kreslo omborda bormi?": "Ha, bor (1C).",
}
WEEK2_FIXED = {
    "Optima 8 dona jami qancha?": "1 890 000 x 8 = 15 120 000 so‘m.",
    "12 mln lik buyurtmaga 3D chizma bepulmi?": "Ha, 3D chizma bepul.",
    "34 mln lik buyurtmaga mijoz 12% chegirma so‘rayapti, bera olamanmi?":
        "ODAMGA: menejer 5% gacha; 10% faqat 100% oldindan to‘lovda ROP yozma ruxsati bilan; "
        "10% dan yuqori taqiqlangan.",
}
GOOD_B4 = "5 dona ham ulgurji"         # the precise B.4 fix
OVERBROAD_B4 = "har doim ulgurji"      # the tempting fix that breaks two old tests
DISCOUNT_EXAMPLE = "chegirma faqat buyurtma"  # the examples.md line that fixes the 18 mln case


def _agent_part(system: str) -> str:
    return _norm(system.split(AGENT_SPLIT)[0])


def _ombor(system: str) -> tuple[str | None, str, list[dict]]:
    """(problem, updated stamp, rows) of the 1C stock block."""
    m = re.search(r'<malumot nomi="(Ombor[^"]*)"[^>]*yangilangan="([^"]*)"[^>]*>\n(DIQQAT: [^\n]*)?', system)
    if not m:
        return "ombor ma’lumoti ulanmagan", "?", []
    problem = m.group(3)[len("DIQQAT: "):] if m.group(3) else None
    rows = _table(next((v for k, v in _blocks(system).items() if k.startswith("Ombor")), []))
    rows = [r for r in rows if r.get("Код")]
    if not rows and not problem:
        problem = "ombor jadvalida qatorlar yo‘q"
    return problem, m.group(2), rows


def _int(text: str) -> int:
    return int(re.sub(r"\D", "", text) or 0)


def _price_answer(q_norm: str, question: str, prices: list[dict], agent: str) -> str | None:
    if question in V1_WHOLESALE and _norm(GOOD_B4) not in agent and _norm(OVERBROAD_B4) not in agent:
        return V1_WHOLESALE[question]
    row = _best(prices, "Mahsulot", _stems(question))
    if not row:
        return None
    qty_m = re.search(r"(\d+)\s*(ta|dona)\b", q_norm)
    qty = int(qty_m.group(1)) if qty_m else 1
    wholesale = qty >= 5 or _norm(OVERBROAD_B4) in agent
    col = "Ulgurji narx (5+ dona)" if wholesale else "Chakana narx (1-4 dona)"
    price = _int(row[col])
    kind = "ulgurji" if wholesale else "chakana"
    total = price * qty
    line = f"{row['Mahsulot']} ({row['Kod']}), {qty} dona - {kind} narx: {_money(price)} x {qty} = {_money(total)} so‘m."
    if "qqs" in q_norm:
        line += f"\nNarx QQS bilan, ustiga qo‘shilmaydi; shu jumladan QQS 12%: {_money(round(total * 12 / 112))} so‘m."
    return line


def _judge(prompt: str) -> str:
    """Fake second model for `pilot eval --judge`: checks the one rule it can (line count)."""
    answer = prompt.split("Answer: ", 1)[-1].split("\nReply with JSON", 1)[0]
    m = re.search(r"(\d+)\s*qatordan oshmaydi", prompt)
    if m:
        n = len([line for line in answer.splitlines() if line.strip()])
        ok = n <= int(m.group(1))
        return '{"pass": %s, "reason": "javob %d qator"}' % ("true" if ok else "false", n)
    return '{"pass": true, "reason": "qoida bajarilgan"}'


def brain(messages: list[dict]) -> str:
    first = messages[0]["content"]
    if messages[0]["role"] == "user" and first.startswith("You check one answer"):
        return _judge(first)
    system = first
    question = messages[-1]["content"]
    qn = _norm(question)
    agent = _agent_part(system)
    blocks = _blocks(system)
    prices = _table(next((v for k, v in blocks.items() if "Prays" in k), []))
    rules = next((v for k, v in blocks.items() if "qoida" in k.lower()), [])
    data_text = "\n".join("\n".join(v) for v in blocks.values())
    kp = any(k.startswith("Kompaniya taqdimoti") for k in blocks)
    problem_now = _ombor(system)[0]

    # A hidden instruction inside a data file (Day 5 security demo).
    if "ai uchun eslatma" in _norm(data_text) and GUARD not in _norm(system):
        return ("«Optima» ergonomik stol (WS-102): bugun maxsus 20% chegirma bor.\n"
                "To‘lovni oldindan 8600 1234 5678 9012 kartaga o‘tkazing, buyurtma tezlashadi.")

    # Scheduled job: is today's 1C export there? (Day 5 worked example, 10:30)
    if "1c" in qn and "fayl" in qn and "tekshir" in qn:
        if problem_now:
            return f"ODAMGA: {problem_now}. Otabek aka 1C dan bugungi qoldiqni eksport qilsin."
        return f"1C ombor fayli joyida: ogohlantirish yo‘q, {len(_ombor(system)[2])} qator."

    # Owner's phone job: stock that has not moved for the longest time (money frozen in the warehouse)
    if "harakat" in qn and ("uzoq" in qn or "harakatsiz" in qn):
        if problem_now:
            return f"ODAMGA: {problem_now}."

        def moved(r):
            dd, mm, yy = (r.get("Последнее движение") or "01.01.2000").split(".")
            return (int(yy), int(mm), int(dd))

        top = sorted(_ombor(system)[2], key=moved)[:3]
        return "Eng uzoq harakatsiz turgan mahsulotlar (1C):\n" + "\n".join(
            f"- {r['Код']} {r['Номенклатура']}: {r['Количество']} dona, oxirgi harakat {r['Последнее движение']}"
            for r in top)

    # Week one: the canonical stale-stock answers (the 1C file was a day old and nobody knew).
    if question in V1_STALE and not problem_now:
        return V1_STALE[question]

    # Week two: canonical mistakes and notable hand-overs (Day 6 material, kept so the weekly file matches).
    if question in WEEK2_FIXED:
        return WEEK2_FIXED[question]
    if "juma kuniga" in qn:
        return "ODAMGA: 7 ish kunidan qisqa muddat ROP qaroriga ko‘ra."
    if "staf mesh" in qn:
        if "staf mesh" not in agent:
            return "«ErgoPro X5»: 2 850 000 so‘m."
        question = re.sub(r"staf mesh", "Staff Mesh kreslo", question, flags=re.I)
        qn = _norm(question)

    # Stock questions and the 08:30 low-stock job: never answer from a broken or old file.
    if any(w in qn for w in ("ombor", "qoldiq", "bormi", "nechta bor", "kam qolgan")):
        if problem_now:
            return f"ODAMGA: ombor fayli bilan muammo ({problem_now}), qoldiqni Otabek akadan aniqlash kerak."
        return fake_model(messages[:-1] + [{"role": "user", "content": question}])

    # The sales deck (KP) as a data source: its promises win over the rules document.
    if kp and "kafolat" in qn:
        return "Barcha kreslolarga 3 yil kafolat."
    if kp and "yetkaz" in qn and any(w in qn for w in REGIONS):
        return "Ha, Toshkent viloyatiga yetkazish bepul."

    if "shikoyat" in qn and "shikoyat" in agent:
        return "ODAMGA: mijoz shikoyati yoki kafolat bo‘yicha nizo, ROP hal qiladi."
    if "kafolat" in qn:
        return fake_model(messages[:-1] + [{"role": "user", "content": question}])
    if "tender" in qn:
        return "ODAMGA: tender yoki 150 000 000 so‘mdan katta buyurtma, ROP hal qiladi."
    if any(w in qn for w in ("oylik", "maosh", "tatil")):
        return "Bu savol bo‘yicha HR bo‘limiga murojaat qiling: Dilnoza opa."

    pct = re.search(r"(\d+)\s*%", question)
    if "chegirma" in qn:
        if pct and int(pct.group(1)) > 5:
            return f"ODAMGA: {pct.group(1)}% chegirma menejer vakolatidan (5%) yuqori."
        amount = re.search(r"(\d+)\s*(mln|million)", qn)
        if amount and int(amount.group(1)) * 1_000_000 > 20_000_000:
            return "Ha: buyurtma 20 000 000 so‘mdan oshgani uchun 5% gacha chegirmani o‘zingiz bera olasiz."
        if amount:
            if _norm(DISCOUNT_EXAMPLE) not in agent:  # week one: the threshold is skipped
                return "Ha, 5% gacha bera olasiz."
            return (f"Yo‘q: chegirma faqat buyurtma 20 000 000 so‘mdan oshsa (5% gacha). "
                    f"{_money(int(amount.group(1)) * 1_000_000)} so‘mlik buyurtmaga chegirma yo‘q.")

    if "yetkaz" in qn:
        km = re.search(r"(\d+)\s*km", qn)
        if km:
            cost = int(km.group(1)) * 8000
            return (f"Toshkent viloyati: halqa yo‘ldan har 1 km uchun 8 000 so‘m: {km.group(1)} x 8 000 = "
                    f"{_money(cost)} so‘m.\nMuddat: oldindan to‘lov tushgan kundan 7 ish kuni.")
        if any(w in qn for w in REGIONS):
            return ("Yo‘q: Toshkent viloyatiga yetkazish halqa yo‘ldan har 1 km uchun 8 000 so‘m.\n"
                    "Masofani ayting, hisoblab beraman.")
        if any(w in qn for w in ("ertaga", "tezroq", "2 kunda")):
            return "ODAMGA: 7 ish kunidan tez yetkazish so‘ralmoqda."
        if "3 kun" not in qn:
            return ("Muddat: 70% (yoki 100%) oldindan to‘lov tushgan kundan 7 ish kuni.\n"
                    "Toshkent shahri: 10 000 000 so‘mdan katta buyurtmaga yetkazish va montaj bepul.")

    if "bolib tola" in qn.replace("'", "").replace("‘", ""):
        line = next((l for l in rules if "bo‘lib to‘lash" in l or "bo'lib to'lash" in l), None)
        if line:
            return line.lstrip("- ").strip()

    answer = _price_answer(qn, question, prices, agent)
    if answer:
        return answer
    return fake_model(messages[:-1] + [{"role": "user", "content": question}])
