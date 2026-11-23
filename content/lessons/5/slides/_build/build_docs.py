"""Build the Day 4 printable pages (copied from day-2/_build/build_docs.py and adapted): Markdown source -> styled HTML (screen, with copy buttons) -> A4 PDF.

Run:  uv run --with markdown --with playwright python3 day-4/_build/build_docs.py [--no-pdf]
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
DAY4 = HERE.parent
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# (source md, output html, pdf path or None, pill label)
DOCS = [
    ("handouts/src/lugat.md", "handouts/lugat.html", "handouts/pdf/lugat.pdf", "Lug‘at"),
    ("handouts/src/assistent-ishlamayapti.md", "handouts/assistent-ishlamayapti.html", "handouts/pdf/assistent-ishlamayapti.pdf", "Assistent ishlamayapti"),
    ("handouts/src/server-xavfsizligi.md", "handouts/server-xavfsizligi.html", "handouts/pdf/server-xavfsizligi.pdf", "Server xavfsizligi"),
    ("homework.md", "handouts/uy-vazifasi.html", "handouts/pdf/uy-vazifasi.pdf", "Uy vazifasi"),
    ("_build/mashqlar-hammasi.md", "exercises/mashqlar.html", "handouts/pdf/mashqlar.pdf", "Mashqlar"),
    ("exercises/vositalar/sayt.qollanma.md", "exercises/vositalar/sayt.qollanma.html", None, "Qo‘llanma"),
]
# Pages that are already HTML and only need a PDF.
PDF_ONLY = []
EXERCISES = sorted((HERE.parent / "exercises").glob("0*.md"))


def concat_exercises():
    """All Day 4 exercises in one printable page, each on a new sheet (generated, do not edit)."""
    parts = ["# 4-dars mashqlari\n\nYettita mashq (darsdan oldingisi bilan), darsdagi tartibda. Manba: day-4/exercises/0*.md.\n"]
    for p in EXERCISES:
        text = p.read_text(encoding="utf-8")
        # demote every heading one level, so each exercise title becomes an h2 under the page h1
        # (the output page sits in exercises/, so relative image links keep working)
        text = re.sub(r"^(#+) ", r"#\1 ", text, flags=re.M)
        parts.append("<!-- pagebreak -->\n\n" + text)
    out = HERE / "mashqlar-hammasi.md"
    out.write_text("\n".join(parts), encoding="utf-8")


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
<div class="bar"><span>Praktikum 3.0 // 4-dars</span><span class="pill">{pill}</span></div>
{body}
<div class="foot">Praktikum 3.0 · 4-dars · {src}</div>
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
    css = os.path.relpath(DAY4 / "assets" / "page.css", out.parent)
    rel_src = src.relative_to(DAY4).as_posix()
    page = TEMPLATE.format(title=html.escape(title), css=css, pill=html.escape(pill), body=body, src=html.escape("manba: day-4/" + rel_src))
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
            print("pdf", pdf_path.relative_to(DAY4))
        browser.close()


def main():
    concat_exercises()
    jobs = []
    for src_rel, out_rel, pdf_rel, pill in DOCS:
        src = DAY4 / src_rel
        if not src.exists():
            print("skip (missing source)", src_rel)
            continue
        out = DAY4 / out_rel
        title = render(src, out, pill)
        print("html", out_rel, "|", title)
        if pdf_rel:
            jobs.append((out, DAY4 / pdf_rel))
    for html_rel, pdf_rel in PDF_ONLY:
        if (DAY4 / html_rel).exists():
            jobs.append((DAY4 / html_rel, DAY4 / pdf_rel))
    if "--no-pdf" not in sys.argv:
        print_pdfs(jobs)


if __name__ == "__main__":
    main()
