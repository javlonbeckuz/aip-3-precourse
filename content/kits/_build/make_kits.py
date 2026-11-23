#!/usr/bin/env python3
"""
Render the five Praktikum 3.0 kits from one content file.

    python3 _build/make_kits.py              # uz-latn (the only language in 3.0 so far)

Reads   content/uz-latn.json, content/all.uz-latn.json
Writes  _build/design/kit-0N-uz-latn.html     print sources (kit.css, kit.js linked; build_kits.py inlines them)
        _build/design/all-cover-uz-latn.html  workbook cover for KITS_ALL
        KIT_0N_<file>_UZ_LATN.md              digital twin of the kit: steps, Claude Code line, chat prompt, forms, scripts
        templates/kompaniya/<folder>/<file>   blank form and script templates laid out as the company folder
        skills/kitN/templates/<file>          a copy of every template of kit N (forms, scripts and hand-written ones)

Copied from the Praktikum 2.0 Day 4 pipeline (praktikum-2/day-4/handouts/kits/_build/make_kits.py) and extended:
scripts pages, a consent box on Kit 1 Form A, field notes, Kit 5 results and money-found lines, per-form file names,
one sentence per line in every generated Markdown file.
"""
import html
import json
import pathlib
import re
import shutil
import sys

HERE = pathlib.Path(__file__).resolve().parent
KITS = HERE.parent
CONTENT = KITS / "content"
DESIGN = HERE / "design"
TEMPLATES = KITS / "templates" / "kompaniya"
SKILLS = KITS / "skills"

MD_UI = {
    "uz-latn": {
        "how": "Qanday ishlatiladi",
        "cc": "Claude Code’da",
        "prompt": "AI chat uchun so‘rov",
        "form": "Shakl",
        "answer": "Javob",
        "paste": "Claude Code bo‘lmasa: shakl yoki transkriptni so‘rovdan keyin qo‘shib, hammasini Claude, ChatGPT yoki Gemini chatiga joylang.",
        "files": "Fayllar kompaniya papkasida",
        "file": "Fayl",
        "per_person": "Har bir xodim uchun bitta fayl: nomidagi «ism» o‘rniga xodimning ismini lotincha kichik harflar bilan yozing (masalan, dilnoza-form-b.md).",
        "fill": "Shu faylni to‘ldiring yoki Claude Code’da {skill} ni ishga tushiring: u siz bilan birga to‘ldiradi.",
        "dots": "Matritsadagi nuqtalar",
        "where": "Matritsadagi joyi",
        "results_formula": "Hisob",
        "value": "Natija",
        "cost_item": "Xarajat",
        "sum": "So‘m",
        "note": "Eslatma",
        "when": "Qachon",
        "scripts_intro": "Ovoz chiqarib o‘qing yoki o‘z so‘zlaringiz bilan ayting. Kvadrat qavsdagi joylarni o‘zingiz to‘ldiring.",
    },
}

LANG_TAG = {"uz-latn": "UZ_LATN"}

NB_HYPHEN = re.compile(r"(\d)-(?=[a-zA-Z‘’]+)")


def e(text) -> str:
    """HTML-escape, and keep "178-modda", "2-dars", "5-qadam" on one line in print (non-breaking hyphen)."""
    return NB_HYPHEN.sub("\\1&#8209;", html.escape(str(text)))

# a sentence ends at . ! ? (optionally followed by a closing quote or bracket) and the next one starts with a capital,
# a digit, an opening quote or a bracket. Field codes like A.2 never have a space after the dot, so they never split.
SENT = re.compile(r"(?:(?<=[.!?])|(?<=[.!?][»)]))\s+(?=[A-ZÀ-Ý«\[(0-9])")


INITIAL = re.compile(r"(?:^|[\s(])(?:[A-ZÀ-Ý]\.)+$")


def sentences(text: str) -> list[str]:
    out: list[str] = []
    for s in (x.strip() for x in SENT.split(text.strip()) if x.strip()):
        if out and INITIAL.search(out[-1]):      # "M. Rashidova", "S.A." are initials, not sentence ends
            out[-1] = out[-1] + " " + s
        else:
            out.append(s)
    return out


def lines_of(value) -> list[str]:
    """Prompts and scripts are stored as line arrays; older fields are strings."""
    return list(value) if isinstance(value, list) else [value]


def kit_label(T, kit_i):
    return f"{T['ui']['kit_word']} {kit_i} / 5"


def file_path(K, F) -> str:
    return f"{K['folder']}/{F['file']}"


# ------------------------------------------------------------------ html

def cover(T, K, i) -> str:
    ui = T["ui"]
    steps = "".join(f"<p>{step_html(s)}</p>" for s in K["steps"])
    return f"""
<section class="page cover" id="k{i}-cover">
  <div class="frame">
    <div class="kitno"><span>{e(ui['series'])}</span><span>{e(kit_label(T, i))}</span></div>
    <h1>{e(K['title'])}</h1>
    <div class="purpose">{e(K['purpose'])}</div>
    <div class="steps">{steps}</div>
    <div class="box ai"><div class="bl">{e(K['ai_label'])}</div><div class="bt">{e(K['ai_short'])}</div><div class="hint cc">{e(K['skill_line'])}</div></div>
    <div class="grow"></div>
    <div class="author"><div class="al">{e(ui['author_label'])}</div><div class="an">{e(ui['author'])}</div></div>
  </div>
</section>"""


def step_html(step: str) -> str:
    """A step that opens with a short time label ("2-darsdan keyin:", "4-darsda:") gets that label in bold."""
    m = re.match(r"^(\d+-dars[^:]{0,20}:)(.*)$", step)
    return f"<b>{e(m.group(1))}</b>{e(m.group(2))}" if m else e(step)


def header_fields(T, F) -> str:
    out = "".join(f'<div class="hf">{e(h)}<span class="ln"></span></div>' for h in F["header"])
    sig = ""
    if F.get("consent_box"):
        sig = f'<div class="hdr"><div class="hf sig"><span class="cb"></span>{e(F["consent_box"])}<span class="ln"></span></div></div>'
    return f'<div class="hdr">{out}</div>{sig}'


def form_shell(T, K, i, F, n, inner, cls="form", fid=None, title=None, hint=None) -> str:
    land = F.get("orient") == "landscape"
    ui = T["ui"]
    fid = F["id"] if fid is None else fid
    title = F["title"] if title is None else title
    hint = hint or f"{ui['file_hint']}: {file_path(K, F)} · Claude Code: {K['skill']}"
    fid_html = f'<span class="fid">{fid}</span>' if fid else ""
    head = header_fields(T, F) if F.get("header") else ""
    return f"""
<section class="page form {cls}{' land' if land else ''}" id="k{i}-{F.get('id', 'S')}">
  <div class="frame">
    <div class="top"><div class="ft">{fid_html}{e(title)}</div><div class="kt">{e(kit_label(T, i))}<br>{e(K['title'])}</div></div>
    {head}
    <div class="body">{inner}</div>
    <div class="foot"><span>{e(ui['author_label'])} {e(ui['author'].title())} · {e(ui['series'])}</span><span>{e(hint)}</span><span>{e(ui['page_of'])} {n}</span></div>
  </div>
</section>"""


def f_table(T, F) -> str:
    cols = F["cols"]
    numbered = F.get("numbered")
    total_w = sum(c["w"] for c in cols) + (8 if numbered else 0)
    colgroup = ('<col style="width:%.2f%%">' % (800 / total_w) if numbered else "") + \
        "".join('<col style="width:%.2f%%">' % (100 * c["w"] / total_w) for c in cols)
    th = ('<th></th>' if numbered else "") + "".join(
        f'<th><span class="code">{c["code"]}</span>{e(c["h"])}</th>' for c in cols)
    rows = "".join("<tr>" + (f'<td class="n">{r+1}</td>' if numbered else "") + "<td></td>" * len(cols) + "</tr>"
                   for r in range(F["rows"]))
    if F.get("total"):
        # the total row sums the hours column (B.4) and is shaded elsewhere
        cells = []
        for c in cols:
            if c is cols[0]:
                cells.append(f"<td>{e(F['total'])}</td>")
            elif c["code"].endswith(".4"):
                cells.append("<td></td>")
            else:
                cells.append('<td class="shade"></td>')
        rows += '<tr class="total">' + ("<td></td>" if numbered else "") + "".join(cells) + "</tr>"
    extra = ""
    if F.get("legend"):
        extra += f'<div class="legend">{e(F["legend"])}</div>'
    if F.get("scale"):
        extra += '<div class="scale">' + "".join(
            f'<div><b>{c}</b>{e(lo)}<br><span style="padding-left:7.4mm;">{e(hi)}</span></div>' for c, lo, hi in F["scale"]) + "</div>"
    return f'<div class="tw" data-minrow="10"><table class="grid"><colgroup>{colgroup}</colgroup><thead><tr>{th}</tr></thead><tbody>{rows}</tbody></table></div>{extra}'


def f_questions(T, F) -> str:
    consent = ""
    if F.get("consent"):
        legal = f'<div class="legal">{e(F["legal_note"])}</div>' if F.get("legal_note") else ""
        consent = (f'<div class="consent"><div class="bl">{e(F["consent_label"])}</div>'
                   f'<div class="bt">«{e(" ".join(lines_of(F["consent"])))}»</div>{legal}</div>')
    qs = "".join(f'<div class="q"><div class="qt"><span class="code">{q["code"]}</span>{e(q["q"])}</div><div class="ruled"></div></div>'
                 for q in F["items"])
    return f'{consent}<div class="qs">{qs}</div>'


def f_fields(T, F) -> str:
    def one(f):
        note = f'<div class="fn">{e(f["note"])}</div>' if f.get("note") else ""
        return (f'<div class="f" data-lines="{f["lines"]}"><div class="fl"><span class="code">{f["code"]}</span>{e(f["label"])}{note}</div>'
                f'<div class="ruled"></div></div>')
    return f'<div class="fs">{"".join(one(f) for f in F["fields"])}</div>'


def f_matrix(T, F) -> str:
    S = 150.0                       # plot side, mm; scores run 3..15
    def P(v): return (v - 3) / 12 * S
    g = []
    for v in range(3, 16):
        x = P(v)
        strong = v in (3, 9, 15)
        col = "#111111" if strong else "#E2E2E2"
        w = 0.35 if strong else 0.2
        g.append(f'<line x1="{x:.2f}" y1="0" x2="{x:.2f}" y2="{S}" stroke="{col}" stroke-width="{w}"/>')
        g.append(f'<line x1="0" y1="{S-x:.2f}" x2="{S}" y2="{S-x:.2f}" stroke="{col}" stroke-width="{w}"/>')
        g.append(f'<text x="{x:.2f}" y="{S+4.2}" text-anchor="middle" font-size="2.8" fill="#8A8A8A">{v}</text>')
        g.append(f'<text x="-2" y="{S-x+1:.2f}" text-anchor="end" font-size="2.8" fill="#8A8A8A">{v}</text>')
    q = [(F["q_tl"], 3, 8, "start", "#4A4A4A"), (F["q_tr"], S - 3, 8, "end", "#2563EB"),
         (F["q_bl"], 3, S - 4, "start", "#8A8A8A"), (F["q_br"], S - 3, S - 4, "end", "#4A4A4A")]
    for txt, x, y, anchor, col in q:
        weight = 700 if col == "#2563EB" else 500
        g.append(f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-size="4.2" font-weight="{weight}" fill="{col}">{e(txt)}</text>')
    g.append(f'<rect x="{S/2}" y="0" width="{S/2}" height="{S/2}" fill="#2563EB" fill-opacity="0.05"/>')
    svg = f'<svg width="{S+6}mm" height="{S+7}mm" viewBox="-6 0 {S+6} {S+7}">{"".join(g)}</svg>'
    choice = "".join(f'<div class="f" data-lines="{2 if k else 1}"><div class="fl"><span class="code">{c["code"]}</span>{e(c["label"])}</div><div class="ruled"></div></div>'
                     for k, c in enumerate(F["choice"]))
    return f'''<div class="mx"><div class="ya">{e(F["y"])}</div>{svg}<div class="xa">{e(F["x"])}</div></div>
      <div class="choice fs">{choice}</div>'''


def f_scorecard(T, F) -> str:
    ph = F["period_h"]
    head = f'<th>{e(F["metric_h"])}</th>' + "".join(f"<th>{e(p)}</th>" for p in ph)
    rows = "".join(f'<tr><td><span class="code">{m["code"]}</span> {e(m["label"])}</td>' + "<td></td>" * len(ph) + "</tr>"
                   for m in F["metrics"])
    # first period column ("Agentgacha") is the longest header
    rest = (100 - 31 - 13) / (len(ph) - 1)
    cg = '<colgroup><col style="width:31%"><col style="width:13%">' + f'<col style="width:{rest:.2f}%">' * (len(ph) - 1) + "</colgroup>"
    costs = "".join(f'<tr{" class=\"total\"" if k == len(F["costs"]) - 1 else ""}><td><span class="code">{c["code"]}</span> {e(c["label"])}</td><td></td></tr>'
                    for k, c in enumerate(F["costs"]))
    results = "".join(f'<tr><td><span class="code">{r["code"]}</span> {e(r["label"])}<span class="fx">{e(r["formula"])}</span></td><td></td></tr>'
                      for r in F.get("results", []))
    lh = "".join(f'<th>{("<span class=\"code\">" + c["code"] + "</span>") if c.get("code") else ""}{e(c["h"])}</th>' for c in F["log_cols"])
    log = "".join("<tr>" + "<td></td>" * len(F["log_cols"]) + "</tr>" for _ in range(F["log_rows"]))
    dec = "".join(f'<span><span class="cb"></span>{e(d)}</span>' for d in F["decision"])
    legend = f'<div class="legend">{e(F["legend"])}</div>' if F.get("legend") else ""
    res_block = ""
    if results:
        res_block = (f'<div class="sub">{e(F["results_h"])}</div>'
                     f'<table class="grid" style="height:auto;"><colgroup><col style="width:62%"><col style="width:38%"></colgroup>'
                     f'<tbody>{results.replace("<tr", "<tr style=\"height:10mm\"")}</tbody></table>')
    return f'''<div class="sc">
      <div class="col">
        <div class="tw" data-minrow="9"><table class="grid">{cg}<thead><tr>{head}</tr></thead><tbody>{rows}</tbody></table></div>
        {legend}
      </div>
      <div class="col">
        <div class="sub">{e(F["costs_h"])}</div>
        <table class="grid" style="height:auto;"><colgroup><col style="width:62%"><col style="width:38%"></colgroup><tbody>{costs.replace("<tr", "<tr style=\"height:7.6mm\"")}</tbody></table>
        {res_block}
        <div class="sub">{e(F["log_h"])}</div>
        <div class="tw" data-minrow="9"><table class="grid"><colgroup><col style="width:17%"><col style="width:35%"><col style="width:20%"><col style="width:28%"></colgroup><thead><tr>{lh}</tr></thead><tbody>{log}</tbody></table></div>
        <div class="sub">{e(F["decision_h"])}</div>
        <div class="decision">{dec}</div>
        <div class="reason">{e(F["reason"])}<span class="ln"></span></div>
      </div>
    </div>'''


RENDER = {"table": f_table, "questions": f_questions, "fields": f_fields, "matrix": f_matrix, "scorecard": f_scorecard}


def sig_row(line: str) -> str:
    """'Imzo: ____  Lavozim: ____' becomes a row of labelled write-in lines."""
    labels = re.findall(r"([^\s:_][^:_]*?):\s*_+", line)
    cells = "".join(f'<div class="hf">{e(l.strip())}<span class="ln"></span></div>' for l in labels)
    return f'<div class="hdr sig">{cells}</div>'


def scripts_page(T, K, i, n) -> str:
    ui = T["ui"]
    blocks = []
    for S in K["scripts"]:
        paras = "".join(sig_row(l) if l.startswith("Imzo:") else f"<p>{e(l)}</p>" for l in S["text"])
        blocks.append(f'<div class="scr"><div class="sl">{e(S["label"])}</div><div class="sw">{e(S["when"])}</div>{paras}</div>')
    files = sorted({S["file"] for S in K["scripts"]})
    hint = f"{ui['file_hint']}: " + ", ".join(f"{K['folder']}/{f}" for f in files)
    return form_shell(T, K, i, {"orient": "portrait", "id": "S"}, n, "".join(blocks), cls="scripts", fid="",
                      title=ui["scripts_title"], hint=hint)


def kit_pages(K) -> int:
    return 1 + len(K["forms"]) + (1 if K.get("scripts") else 0)


def kit_html(T, K, i, lang) -> str:
    pages = [cover(T, K, i)]
    n = 1
    for F in K["forms"]:
        n += 1
        pages.append(form_shell(T, K, i, F, n, RENDER[F["type"]](T, F)))
    if K.get("scripts"):
        n += 1
        pages.append(scripts_page(T, K, i, n))
    return f"""<!DOCTYPE html>
<html lang="{T['lang']}">
<head>
<meta charset="utf-8">
<title>{e(K['title'])}</title>
<link rel="stylesheet" href="kit.css">
</head>
<body>
{''.join(pages)}
<script src="kit.js"></script>
</body>
</html>
"""


# ------------------------------------------------------------------ workbook cover (KITS_ALL)

def all_cover(T, A) -> str:
    rows = []
    page = 2
    for i, (K, line) in enumerate(zip(T["kits"], A["kit_lines"]), start=1):
        rows.append(f'''<div class="tr"><div class="tn">{i:02d}</div>
          <div class="tt"><div class="tk">{e(K["title"])}</div><div class="tl">{e(line)}</div></div>
          <div class="tp">{page}</div></div>''')
        page += kit_pages(K)
    return f"""<!DOCTYPE html>
<html lang="{T['lang']}">
<head>
<meta charset="utf-8">
<title>{e(A['title'])}</title>
<link rel="stylesheet" href="kit.css">
</head>
<body>
<section class="page cover allcover" id="all-cover">
  <div class="frame">
    <div class="kitno"><span>{e(A['top_left'])}</span><span>{e(A['top_right'])}</span></div>
    <h1>{e(A['title'])}</h1>
    <div class="sub">{e(A['subtitle'])}</div>
    <div class="purpose">{e(A['purpose'])}</div>
    <div class="toc">
      <div class="tch"><span>{e(A['contents_label'])}</span><span>{e(A['page_word'])}</span></div>
      {''.join(rows)}
    </div>
    <div class="how"><div class="bl">{e(A['how_label'])}</div><div class="bt">{e(A['how'])}</div></div>
    <div class="grow"></div>
    <div class="author"><div class="al">{e(T['ui']['author_label'])}</div><div class="an">{e(T['ui']['author'])}</div></div>
  </div>
</section>
<script src="kit.js"></script>
</body>
</html>
"""


# ------------------------------------------------------------------ markdown

def md_table(header: list[str], rows: int, first: list[str] | None = None) -> list[str]:
    L = ["| " + " | ".join(header) + " |", "|" + "---|" * len(header)]
    for r in range(rows):
        cells = [" "] * len(header)
        if first is not None and r < len(first):
            cells[0] = first[r]
        L.append("| " + " | ".join(cells) + " |")
    return L


def md_lines(text: str) -> list[str]:
    return sentences(text)


def form_body_md(T, K, F, M) -> list[str]:
    """The fillable part of one form: header fields, then the form itself."""
    L = [f"- {h}: " for h in F["header"]]
    if F.get("consent_box"):
        L += [f"- [ ] {F['consent_box']} "]
    L += [""]
    if F.get("consent"):
        L += [f"**{F['consent_label']}:**", ""]
        L += [f"> {l}" for l in lines_of(F["consent"])] + [""]
        if F.get("legal_note"):
            L += md_lines(F["legal_note"]) + [""]
    t = F["type"]
    if t == "questions":
        for q in F["items"]:
            L += [f"### {q['code']} {q['q']}", "", f"{M['answer']}: ", ""]
    elif t == "fields":
        for f in F["fields"]:
            L += [f"### {f['code']} {f['label']}", ""]
            if f.get("note"):
                L += [f"{M['note']}: {f['note']}", ""]
            if f.get("md_table"):
                L += md_table(f["md_table"], 3) + [""]
            else:
                L += [""]
    elif t == "matrix":
        L += [f"{F['y']} / {F['x']}: {F['q_tr']} · {F['q_tl']} · {F['q_br']} · {F['q_bl']}", ""]
        L += [f"### {M['dots']}", ""]
        L += md_table(["#", "Jarayon (A.1)", F["y"], F["x"], M["where"]], 8, [str(n) for n in range(1, 9)]) + [""]
        for c in F["choice"]:
            L += [f"### {c['code']} {c['label']}", "", ""]
    elif t == "table":
        cols = F["cols"]
        hdr = (["#"] if F.get("numbered") else []) + [f"{c['code']} {c['h']}" for c in cols]
        L += ["| " + " | ".join(hdr) + " |", "|" + "---|" * len(hdr)]
        for r in range(F["rows"]):
            L += ["| " + " | ".join(([str(r + 1)] if F.get("numbered") else []) + [" "] * len(cols)) + " |"]
        if F.get("total"):
            L += ["| " + " | ".join(([""] if F.get("numbered") else []) + [f"**{F['total']}**"] + [" "] * (len(cols) - 1)) + " |"]
        L += [""]
        if F.get("legend"):
            L += legend_lines(F["legend"]) + [""]
        if F.get("scale"):
            L += [f"- {c}: {lo} … {hi}" for c, lo, hi in F["scale"]] + [""]
    elif t == "scorecard":
        hdr = [F["metric_h"]] + F["period_h"]
        L += ["| " + " | ".join(hdr) + " |", "|" + "---|" * len(hdr)]
        L += ["| " + f"{m['code']} {m['label']}" + " |" + "   |" * len(F["period_h"]) for m in F["metrics"]]
        L += [""]
        if F.get("legend"):
            L += legend_lines(F["legend"]) + [""]
        L += [f"### {F['costs_h']}", "", f"| {M['cost_item']} | {M['sum']} |", "|---|---|"]
        L += [f"| {c['code']} {c['label']} |   |" for c in F["costs"]]
        if F.get("results"):
            L += ["", f"### {F['results_h']}", "", f"| {F['metric_h']} | {M['results_formula']} | {M['value']} |", "|---|---|---|"]
            L += [f"| {r['code']} {r['label']} | {r['formula']} |   |" for r in F["results"]]
        if F.get("money_cols"):
            L += ["", f"### {F['money_h']}", ""] + md_table(F["money_cols"], 4)
        L += ["", f"### {F['log_h']}", ""]
        lc = [((c.get('code', '') + ' ') if c.get('code') else '') + c["h"] for c in F["log_cols"]]
        L += md_table(lc, 6)
        L += ["", f"### {F['decision_h']}", ""] + [f"- [ ] {d}" for d in F["decision"]] + ["", f"{F['reason']}: ", ""]
    return L


def legend_lines(legend: str) -> list[str]:
    """Paper legends separate their parts with two spaces; in Markdown each part, and each sentence, gets its own line."""
    out = []
    for part in re.split(r"\s{2,}", legend.strip()):
        out += sentences(part)
    return out


def form_template_md(T, K, i, F, lang) -> str:
    M = MD_UI[lang]
    L = [f"# {T['ui']['kit_word']} {i} · {F['id']} {M['form'].lower()}i: {F['title']}", ""]
    L += [f"{T['ui']['series']} · {K['title']} · {M['file']}: `{file_path(K, F)}`", ""]
    if F["file"].startswith("ism-"):
        L += [M["per_person"]]
    L += [M["fill"].format(skill=K["skill"]), ""]
    L += form_body_md(T, K, F, M)
    return "\n".join(L).rstrip() + "\n"


def script_lines(text: list[str]) -> list[str]:
    """Script lines as Markdown: one sentence per line, numbered clauses kept as a list with blank lines around it."""
    out, in_list = [], False
    for l in text:
        is_item = bool(re.match(r"\d+\. ", l))
        if is_item != in_list and out:
            out.append("")
        out.append(l)
        in_list = is_item
    return out


def script_template_md(T, K, i, scripts, lang) -> str:
    M = MD_UI[lang]
    S0 = scripts[0]
    L = [f"# {T['ui']['kit_word']} {i} · {T['ui']['scripts_title']}: {', '.join(S['label'] for S in scripts)}", ""]
    L += [f"{T['ui']['series']} · {K['title']} · {M['file']}: `{K['folder']}/{S0['file']}`", ""]
    L += md_lines(M["scripts_intro"]) + [""]
    for S in scripts:
        L += [f"## {S['label']}", "", f"*{S['when']}*", ""]
        L += script_lines(S["text"]) + [""]
    return "\n".join(L).rstrip() + "\n"


def kit_md(T, K, i, lang) -> str:
    M = MD_UI[lang]
    L = [f"# {K['title']}", "", f"{T['ui']['series']} · {kit_label(T, i)} · {T['ui']['author_label']} {T['ui']['author'].title()}", ""]
    L += md_lines(K["purpose"]) + ["", f"## {M['how']}", ""]
    for n, s in enumerate(K["steps"], 1):
        parts = sentences(s)
        L += [f"{n}. {parts[0]}"] + [f"   {p}" for p in parts[1:]]
    L += ["", f"## {M['cc']}", ""] + md_lines(K["skill_line"].split(": ", 1)[1]) + ["", f"{M['files']}:", ""]
    for F in K["forms"]:
        L += [f"- {F['id']} {M['form'].lower()}i, {F['title']}: `{file_path(K, F)}`"]
    for f in sorted({S["file"] for S in K.get("scripts", [])}):
        labels = ", ".join(S["label"] for S in K["scripts"] if S["file"] == f)
        L += [f"- {labels}: `{K['folder']}/{f}`"]
    if K.get("transcribe_prompt"):
        L += ["", f"## {K['transcribe_label']}", "", "```text"] + lines_of(K["transcribe_prompt"]) + ["```"]
    L += ["", f"## {M['prompt']}", ""] + md_lines(M["paste"]) + ["", "```text"] + lines_of(K["ai_prompt"]) + ["```", ""]
    for F in K["forms"]:
        L += [f"## {M['form']} {F['id']}: {F['title']}", "", f"{M['file']}: `{file_path(K, F)}`", ""]
        L += form_body_md(T, K, F, M)
    if K.get("scripts"):
        L += [f"## {T['ui']['scripts_title']}", ""] + md_lines(M["scripts_intro"]) + [""]
        for S in K["scripts"]:
            L += [f"### {S['label']}", "", f"*{S['when']}*", ""]
            L += script_lines(S["text"]) + [""]
    return "\n".join(L).rstrip() + "\n"


# ------------------------------------------------------------------ templates and skills

def write_templates(T, lang) -> list[pathlib.Path]:
    """Blank form and script templates, written where they belong in the company folder."""
    written = []
    for i, K in enumerate(T["kits"], start=1):
        folder = TEMPLATES / K["folder"]
        folder.mkdir(parents=True, exist_ok=True)
        for F in K["forms"]:
            p = folder / F["file"]
            p.write_text(form_template_md(T, K, i, F, lang), encoding="utf-8")
            written.append(p)
        by_file: dict[str, list] = {}
        for S in K.get("scripts", []):
            by_file.setdefault(S["file"], []).append(S)
        for fname, group in by_file.items():
            p = folder / fname
            p.write_text(script_template_md(T, K, i, group, lang), encoding="utf-8")
            written.append(p)
    return written


# templates a skill needs from another kit's folder (kit 3 starts the test set that kit 4 owns)
CROSS_KIT = {3: ["kit4-people/test-set.md"]}


def sync_skill_templates(T) -> None:
    """skills/kitN/templates/ = an exact copy of templates/kompaniya/<folder of kit N>/, plus CROSS_KIT files."""
    for i, K in enumerate(T["kits"], start=1):
        skill = SKILLS / f"kit{i}"
        if not skill.exists():
            continue
        dst = skill / "templates"
        if dst.exists():
            shutil.rmtree(dst)
        shutil.copytree(TEMPLATES / K["folder"], dst)
        for extra in CROSS_KIT.get(i, []):
            shutil.copy2(TEMPLATES / extra, dst / pathlib.Path(extra).name)


def main() -> None:
    langs = sys.argv[1:] or ["uz-latn"]
    DESIGN.mkdir(parents=True, exist_ok=True)
    for lang in langs:
        T = json.loads((CONTENT / f"{lang}.json").read_text(encoding="utf-8"))
        for i, K in enumerate(T["kits"], start=1):
            (DESIGN / f"kit-{i:02d}-{lang}.html").write_text(kit_html(T, K, i, lang), encoding="utf-8")
            (KITS / f"KIT_{i:02d}_{K['file']}_{LANG_TAG[lang]}.md").write_text(kit_md(T, K, i, lang), encoding="utf-8")
        all_src = CONTENT / f"all.{lang}.json"
        if all_src.exists():
            A = json.loads(all_src.read_text(encoding="utf-8"))
            (DESIGN / f"all-cover-{lang}.html").write_text(all_cover(T, A), encoding="utf-8")
        n = len(write_templates(T, lang))
        sync_skill_templates(T)
        print(f"{lang}: {len(T['kits'])} kits, {n} generated templates")


if __name__ == "__main__":
    main()
