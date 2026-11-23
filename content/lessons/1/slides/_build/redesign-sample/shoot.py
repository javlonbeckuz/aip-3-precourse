"""Inline the Head logo into index.html (once) and screenshot each slide to shots/.
Run: uv run --with playwright python3 shoot.py   (uses installed Google Chrome; paths relative to this file)"""
import pathlib, re
from playwright.sync_api import sync_playwright
HERE = pathlib.Path(__file__).resolve().parent
PAGE = HERE / "index.html"
LOGO = HERE.parents[4] / "30_assets" / "brand" / "head-logo-white.svg"
html = PAGE.read_text(encoding="utf-8")
if "<!--HEAD_LOGO-->" in html:
    inner = re.search(r"<svg[^>]*>(.*)</svg>", LOGO.read_text(encoding="utf-8"), re.S).group(1)
    inner = re.sub(r'\s(id|class|style|fill)="[^"]*"', "", inner)
    PAGE.write_text(html.replace("<!--HEAD_LOGO-->", inner), encoding="utf-8")
OUT = HERE / "shots"; OUT.mkdir(exist_ok=True)
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
    pg = b.new_page(viewport={"width": 1920, "height": 1080})
    pg.goto(PAGE.as_uri()); pg.evaluate("document.fonts.ready")
    pg.wait_for_timeout(400)
    for i, s in enumerate(pg.query_selector_all(".slide"), 1):
        over = s.evaluate("e => [...e.querySelectorAll('*')].filter(x => { const r = x.getBoundingClientRect(), p = e.getBoundingClientRect(); return !x.classList.contains('numeral') && (r.right > p.right + 1 || r.bottom > p.bottom + 1); }).map(x => x.className || x.tagName)")
        if over: print("OVERFLOW slide", i, over)
        s.screenshot(path=str(OUT / f"slide-{i:02d}.png"))
    print("fonts:", pg.evaluate("[...document.fonts].map(f => f.family + ' ' + f.status).join(', ')"))
    b.close()
