"""Build the Day 1 printable pages: Markdown source -> styled HTML (screen, with copy buttons) -> A4 PDF.

Run:  uv run --with markdown --with playwright python3 day-1/_build/build_docs.py [--no-pdf]
Paths resolve relative to this file. Sources are the .md files listed in DOCS; outputs are regenerated,
so edit the .md, not the .html. Fenced ```text blocks become prompt boxes with a copy button.
"<!-- pagebreak -->" in a source forces a new printed page.
"""
import html
import os
import pathlib
import re
import sys

import markdown

HERE = pathlib.Path(__file__).resolve().parent
DAY1 = HERE.parent
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# (source md, output html, pdf path or None, pill label)
DOCS = [
    ("first-build/promptlar.md", "first-build/prompt-sheet.html", "first-build/prompt-sheet.pdf", "Birinchi qurilish"),
    ("notebooklm-exercise/mashq.md", "notebooklm-exercise/mashq.html", "notebooklm-exercise/mashq.pdf", "Gemini Notebook mashqi"),
    ("handouts/src/glossariy.md", "handouts/glossariy.html", "handouts/pdf/glossariy.pdf", "Lug‘at"),
    ("handouts/src/ai-qanday-ishlaydi.md", "handouts/ai-qanday-ishlaydi.html", "handouts/pdf/ai-qanday-ishlaydi.pdf", "Tarqatma"),
    ("handouts/src/bilimlar-bazasi.md", "handouts/bilimlar-bazasi.html", "handouts/pdf/bilimlar-bazasi.pdf", "Tarqatma"),
    ("handouts/src/prompt-va-tekshirish.md", "handouts/prompt-va-tekshirish.html", "handouts/pdf/prompt-va-tekshirish.pdf", "Tarqatma"),
    ("homework.md", "handouts/uy-vazifasi.html", "handouts/pdf/uy-vazifasi.pdf", "Uy vazifasi"),
    ("kit1-live-demo/juftlik-mashqi.md", "kit1-live-demo/juftlik-mashqi.html", "kit1-live-demo/juftlik-mashqi.pdf", "To‘plam 1 mashqi"),
    ("uy-vazifasi-namuna.md", "handouts/uy-vazifasi-namuna.html", "handouts/pdf/uy-vazifasi-namuna.pdf", "Uy vazifasi namunasi"),
    ("notebooklm-exercise/namuna-natijalar.md", "notebooklm-exercise/namuna-natijalar.html", "notebooklm-exercise/namuna-natijalar.pdf", "Namuna natijalar"),
    ("first-build/birinchi-qurilish.qollanma.md", "first-build/birinchi-qurilish.qollanma.html", "first-build/birinchi-qurilish.qollanma.pdf", "Qo‘llanma"),
    ("demos/tokenizer/tokenizer.qollanma.md", "demos/tokenizer/tokenizer.qollanma.html", "demos/tokenizer/tokenizer.qollanma.pdf", "Qo‘llanma"),
    ("demos/side-by-side/side-by-side.qollanma.md", "demos/side-by-side/side-by-side.qollanma.html", "demos/side-by-side/side-by-side.qollanma.pdf", "Qo‘llanma"),
    ("demos/formula-check/formula-check.qollanma.md", "demos/formula-check/formula-check.qollanma.html", "demos/formula-check/formula-check.qollanma.pdf", "Qo‘llanma"),
    ("demos/pick-a-number/pick-a-number.qollanma.md", "demos/pick-a-number/pick-a-number.qollanma.html", "demos/pick-a-number/pick-a-number.qollanma.pdf", "Qo‘llanma"),
    ("demos/data-trip/data-trip.qollanma.md", "demos/data-trip/data-trip.qollanma.html", "demos/data-trip/data-trip.qollanma.pdf", "Qo‘llanma"),
    ("demos/models/models.qollanma.md", "demos/models/models.qollanma.html", "demos/models/models.qollanma.pdf", "Qo‘llanma"),
]
# Pages that are already HTML and only need a PDF.
PDF_ONLY = [
    ("demos/models/index.html", "handouts/pdf/bu-hafta-ai-da.pdf"),
]

TEMPLATE = """<!DOCTYPE html>
<html lang="uz">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<link rel="stylesheet" href="{css}">
</head>
<body>
<main class="paper">
<div class="bar"><span>Praktikum 3.0 // 1-dars</span><span class="pill">{pill}</span></div>
{body}
<div class="foot">Praktikum 3.0 · 1-dars · 21-noyabr (shanba) / 22-noyabr (yakshanba) 2026 · {src}</div>
</main>
<script>
document.querySelectorAll('.prompt .copy').forEach(function (b) {{
  b.addEventListener('click', function () {{
    var t = b.parentElement.querySelector('pre').innerText;
    var ok = function () {{ b.textContent = 'Nusxa olindi'; b.classList.add('done'); setTimeout(function () {{ b.textContent = 'Nusxa olish'; b.classList.remove('done'); }}, 1600); }};
    if (navigator.clipboard && window.isSecureContext) {{ navigator.clipboard.writeText(t).then(ok, ok); }}
    else {{ var ta = document.createElement('textarea'); ta.value = t; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); ok(); }}
  }});
}});
</script>
</body>
</html>
"""


def render(src: pathlib.Path, out: pathlib.Path, pill: str) -> str:
    text = src.read_text(encoding="utf-8")
    text = text.replace("<!-- pagebreak -->", '<div class="pagebreak"></div>')
    md = markdown.Markdown(extensions=["tables", "fenced_code", "sane_lists"])
    body = md.convert(text)
    # prompt boxes
    body = re.sub(
        r'<pre><code class="language-text">(.*?)</code></pre>',
        lambda m: '<div class="prompt"><button class="copy" type="button">Nusxa olish</button><pre>' + m.group(1).rstrip("\n") + "</pre></div>",
        body,
        flags=re.S,
    )
    body = body.replace('<li>[ ] ', '<li class="cb">').replace('<li>[x] ', '<li class="cb done">')
    title_m = re.search(r"<h1>(.*?)</h1>", body)
    title = html.unescape(re.sub("<.*?>", "", title_m.group(1))) if title_m else pill
    css = os.path.relpath(DAY1 / "assets" / "page.css", out.parent)
    rel_src = src.relative_to(DAY1).as_posix()
    page = TEMPLATE.format(title=html.escape(title), css=css, pill=html.escape(pill), body=body, src=html.escape("manba: day-1/" + rel_src))
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(page, encoding="utf-8")
    return title


def print_pdfs(jobs):
    from playwright.sync_api import sync_playwright

    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME, headless=True)
        ctx = browser.new_context(offline=True)
        page = ctx.new_page()
        for html_path, pdf_path in jobs:
            page.goto(html_path.as_uri())
            page.wait_for_load_state("load")
            page.evaluate("document.fonts.ready")
            page.wait_for_timeout(300)
            pdf_path.parent.mkdir(parents=True, exist_ok=True)
            page.pdf(path=str(pdf_path), format="A4", print_background=True, prefer_css_page_size=True)
            print("pdf", pdf_path.relative_to(DAY1))
        browser.close()


def main():
    jobs = []
    for src_rel, out_rel, pdf_rel, pill in DOCS:
        src = DAY1 / src_rel
        if not src.exists():
            print("skip (missing source)", src_rel)
            continue
        out = DAY1 / out_rel
        title = render(src, out, pill)
        print("html", out_rel, "|", title)
        if pdf_rel:
            jobs.append((out, DAY1 / pdf_rel))
    for html_rel, pdf_rel in PDF_ONLY:
        if (DAY1 / html_rel).exists():
            jobs.append((DAY1 / html_rel, DAY1 / pdf_rel))
    if "--no-pdf" not in sys.argv:
        print_pdfs(jobs)


if __name__ == "__main__":
    main()
