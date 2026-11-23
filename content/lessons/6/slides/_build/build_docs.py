"""Build the Day 5 printable pages (copied from day-3/_build/build_docs.py, itself from day-1): Markdown source -> styled HTML (screen, with copy buttons) -> A4 PDF.

Run:  uv run --no-project --with markdown --with playwright python3 day-5/_build/build_docs.py [--no-pdf]
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
DAY1 = HERE.parent  # day-5 (name kept from the day-1 copy)
CHROME = os.environ.get("CHROME", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")  # macOS default

# (source md, output html, pdf path or None, pill label)
DOCS = [
    ("handouts/src/lugat.md", "handouts/lugat.html", "handouts/pdf/lugat.pdf", "Lug‘at"),
    ("handouts/src/yaxshilash-5-qadam.md", "handouts/yaxshilash-5-qadam.html", "handouts/pdf/yaxshilash-5-qadam.pdf", "5 qadam kartasi"),
    ("homework.md", "handouts/uy-vazifasi.html", "handouts/pdf/uy-vazifasi.pdf", "Uy vazifasi"),
    ("exercises/01-xatolar-jurnalini-oqish.md", "exercises/html/01-xatolar-jurnalini-oqish.html", "exercises/pdf/01-xatolar-jurnalini-oqish.pdf", "1-mashq"),
    ("exercises/02-yoriqnoma-yoki-malumotni-tuzatish.md", "exercises/html/02-yoriqnoma-yoki-malumotni-tuzatish.html", "exercises/pdf/02-yoriqnoma-yoki-malumotni-tuzatish.pdf", "2-mashq"),
    ("exercises/03-test-toplamini-qayta-ishga-tushirish.md", "exercises/html/03-test-toplamini-qayta-ishga-tushirish.html", "exercises/pdf/03-test-toplamini-qayta-ishga-tushirish.pdf", "3-mashq"),
    ("exercises/04-jadvalga-ish-qoshish.md", "exercises/html/04-jadvalga-ish-qoshish.html", "exercises/pdf/04-jadvalga-ish-qoshish.pdf", "4-mashq"),
    ("exercises/05-kit5-b-1-hafta-va-topilgan-pul.md", "exercises/html/05-kit5-b-1-hafta-va-topilgan-pul.html", "exercises/pdf/05-kit5-b-1-hafta-va-topilgan-pul.pdf", "5-mashq"),
    ("exercises/06-eskalatsiya-va-qulf.md", "exercises/html/06-eskalatsiya-va-qulf.html", "exercises/pdf/06-eskalatsiya-va-qulf.pdf", "6-mashq"),
    ("exercises/07-xavfsizlik-va-malumot-tartibi.md", "exercises/html/07-xavfsizlik-va-malumot-tartibi.html", "exercises/pdf/07-xavfsizlik-va-malumot-tartibi.pdf", "7-mashq"),
    ("exercises/namuna/kompaniya/kit5-pilot/numbers.md", "exercises/html/namuna-kit5-numbers.html", "exercises/pdf/namuna-kit5-numbers.pdf", "Namuna: To‘plam 5 B"),
    ("demos/04-xotira-fayllari/xotira-fayllari.md", "demos/04-xotira-fayllari/xotira-fayllari.html", None, "Xotira fayllari"),
    ("demos/05-hermes/ornatish-kartasi.md", "demos/05-hermes/ornatish-kartasi.html", "demos/05-hermes/ornatish-kartasi.pdf", "Ixtiyoriy karta"),
    ("demos/08-bir-mahsulot-turli-nom/nomlar-jadvali.md", "demos/08-bir-mahsulot-turli-nom/nomlar-jadvali.html", None, "Ma’lumot tartibi"),
]
PDF_ONLY = []

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
<div class="bar"><span>Praktikum 3.0 // 5-dars</span><span class="pill">{pill}</span></div>
{body}
<div class="foot">Praktikum 3.0 · 5-dars · 19-dekabr (shanba) yoki 20-dekabr (yakshanba) 2026 · {src}</div>
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
    # images are written relative to the .md file; make them relative to the .html file
    def _img(m):
        src_attr = m.group(1)
        if re.match(r"^(https?:|data:|/)", src_attr):
            return m.group(0)
        return 'src="' + os.path.relpath((src.parent / src_attr).resolve(), out.parent.resolve()) + '"'
    body = re.sub(r'src="([^"]+)"', _img, body)
    title_m = re.search(r"<h1>(.*?)</h1>", body)
    title = html.unescape(re.sub("<.*?>", "", title_m.group(1))) if title_m else pill
    css = os.path.relpath(DAY1 / "assets" / "page.css", out.parent)
    rel_src = src.relative_to(DAY1).as_posix()
    page = TEMPLATE.format(title=html.escape(title), css=css, pill=html.escape(pill), body=body, src=html.escape("manba: day-5/" + rel_src))
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
