"""Render a local HTML file to PNG (or PDF) with the installed Google Chrome, offline.

Usage:
  uv run --with playwright python3 render.py page.html out.png --width 1440 [--height 900] [--full] [--selector .win]
  uv run --with playwright python3 render.py page.html out.pdf --pdf
Paths may be relative to the current folder. Blocks every network request and
prints any that were attempted, so offline pages can be checked.
"""
import argparse
import pathlib
import sys

from playwright.sync_api import sync_playwright

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("html")
    ap.add_argument("out")
    ap.add_argument("--width", type=int, default=1440)
    ap.add_argument("--height", type=int, default=900)
    ap.add_argument("--full", action="store_true")
    ap.add_argument("--selector")
    ap.add_argument("--pdf", action="store_true")
    ap.add_argument("--js", help="JavaScript to run before the screenshot")
    a = ap.parse_args()
    html = pathlib.Path(a.html).resolve()
    out = pathlib.Path(a.out).resolve()
    out.parent.mkdir(parents=True, exist_ok=True)
    blocked = []
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=CHROME, args=["--force-color-profile=srgb"])
        pg = b.new_page(viewport={"width": a.width, "height": a.height}, device_scale_factor=1)

        def route(r):
            if r.request.url.startswith("file:") or r.request.url.startswith("data:"):
                r.continue_()
            else:
                blocked.append(r.request.url)
                r.abort()

        pg.route("**/*", route)
        pg.goto(html.as_uri())
        pg.wait_for_timeout(400)
        pg.evaluate("document.fonts.ready")
        if a.js:
            pg.evaluate(a.js)
            pg.wait_for_timeout(300)
        if a.pdf:
            pg.emulate_media(media="print")
            pg.pdf(path=str(out), format="A4", print_background=True, prefer_css_page_size=True)
        elif a.selector:
            pg.locator(a.selector).first.screenshot(path=str(out))
        else:
            pg.screenshot(path=str(out), full_page=a.full)
        overflow = pg.evaluate("document.documentElement.scrollWidth > window.innerWidth + 1")
        b.close()
    print(f"wrote {out}  horizontal_overflow={overflow}  blocked_requests={len(blocked)}")
    for u in blocked:
        print("  blocked:", u)
    return 1 if blocked else 0


if __name__ == "__main__":
    sys.exit(main())
