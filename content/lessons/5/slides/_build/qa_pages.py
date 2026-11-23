"""Render every Day 4 HTML page offline at 1440 px and 390 px; flag horizontal overflow, missing fonts, network use.

    uv run --with playwright python3 day-4/_build/qa_pages.py

Screenshots go to _build/qa/pages/ (first screen and full page). Exit code 1 on any problem.
Paths resolve relative to this file; uses the installed Google Chrome.
"""

from __future__ import annotations

import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
DAY4 = HERE.parent
OUT = HERE / "qa" / "pages"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PAGES = sorted(list((DAY4 / "handouts").glob("*.html")) + [DAY4 / "exercises" / "mashqlar.html",
               DAY4 / "exercises" / "vositalar" / "sayt.qollanma.html",
               DAY4 / "demos" / "03-domen-dns-https" / "diagramma.html"])

CHECK = r"""
() => {
  const doc = document.documentElement;
  const wide = [];
  document.querySelectorAll('body *').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width && r.right > window.innerWidth + 1) {
      // allowed: elements inside a horizontally scrollable box
      let p = el.parentElement, scroller = false;
      while (p) { const s = getComputedStyle(p); if (['auto','scroll'].includes(s.overflowX)) { scroller = true; break; } p = p.parentElement; }
      if (!scroller) wide.push(el.tagName + '.' + el.className + ' ' + (el.innerText || '').slice(0, 40));
    }
  });
  const fonts = [...document.fonts].map(f => f.family + ':' + f.status);
  return {scrollW: doc.scrollWidth, innerW: window.innerWidth, wide: wide.slice(0, 5), fonts};
}
"""


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    bad = False
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=CHROME)
        for w in (1440, 390):
            ctx = b.new_context(viewport={"width": w, "height": 900}, offline=True)
            page = ctx.new_page()
            net = []
            page.on("request", lambda r: net.append(r.url) if not r.url.startswith(("file:", "data:")) else None)
            for f in PAGES:
                page.goto(f.as_uri())
                page.wait_for_load_state("load")
                page.evaluate("document.fonts.ready")
                page.wait_for_timeout(200)
                res = page.evaluate(CHECK)
                name = f"{f.parent.name}-{f.stem}-{w}"
                page.screenshot(path=str(OUT / f"{name}.png"))
                page.screenshot(path=str(OUT / f"{name}-full.png"), full_page=True)
                loaded = [x for x in res["fonts"] if x.endswith(":loaded")]
                problem = res["scrollW"] > res["innerW"] + 1 or res["wide"] or not loaded
                bad |= bool(problem)
                print(("FAIL " if problem else "ok   ") + f"{w:4d} {f.relative_to(DAY4)} scrollW={res['scrollW']} fonts={len(loaded)}"
                      + (f" wide={res['wide']}" if res["wide"] else ""))
            if net:
                print("NETWORK:", net[:5])
                bad = True
            ctx.close()
        b.close()
    print("FAILED" if bad else "ALL OK")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
