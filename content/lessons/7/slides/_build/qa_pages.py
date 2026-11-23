"""Render-check the other Day 6 HTML pages offline at 1440 px and 390 px, and print the scoring sheet to A4.

Run:  uv run --with playwright --with pypdf python3 day-6/_build/qa_pages.py
Uses installed Google Chrome (channel="chrome"). Paths resolve relative to this file.
Writes screenshots to day-6/_build/qa/pages/ and the guide images to vendor-checklist/img/.
Exit code 1 on console errors, network requests, horizontal page scroll, missing fonts, or a wrong A4 page count.
"""
import io
import pathlib
import shutil
import sys

from playwright.sync_api import sync_playwright
from pypdf import PdfReader

HERE = pathlib.Path(__file__).resolve().parent
DAY6 = HERE.parent
OUT = HERE / "qa" / "pages"
PAGES = [
    ("vendor-namuna", DAY6 / "vendor-checklist" / "index.html", "namuna=1", "VCInter", None),
    ("vendor-bosh", DAY6 / "vendor-checklist" / "index.html", "", "VCInter", None),
    ("baholash", DAY6 / "demo-day" / "baholash-varagi.html", "", "BVInter", 2),
]


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    failed = False
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        for name, path, query, font, pdf_pages in PAGES:
            for width in (1440, 390):
                ctx = browser.new_context(viewport={"width": width, "height": 900}, device_scale_factor=2 if width == 390 else 1, offline=True)
                page = ctx.new_page()
                errors, net = [], []
                page.on("console", lambda m, e=errors: e.append(m.text) if m.type == "error" else None)
                page.on("pageerror", lambda x, e=errors: e.append(str(x)))
                page.on("request", lambda r, n=net: n.append(r.url) if not r.url.startswith(("file:", "data:", "blob:")) else None)
                if not query:
                    page.goto(path.as_uri()); page.evaluate("localStorage.clear()")
                page.goto(path.as_uri() + ("?" + query if query else ""))
                page.wait_for_function("document.fonts.status === 'loaded'")
                page.wait_for_timeout(300)
                hs = page.evaluate("document.documentElement.scrollWidth > window.innerWidth + 1")
                fonts = page.evaluate(f"document.fonts.check('14px {font}')")
                shot = OUT / f"{name}-{width}.png"
                page.screenshot(path=str(shot), full_page=True)
                bad = bool(errors or net or hs or not fonts)
                failed |= bad
                print(f"{name}-{width:<5} {'FAIL' if bad else 'ok'} hscroll={hs} fonts={fonts}" + (f" errors={errors}" if errors else "") + (f" net={net}" if net else ""))
                if pdf_pages and width == 1440:
                    pdf = page.pdf(format="A4", print_background=True, prefer_css_page_size=True)
                    n = len(PdfReader(io.BytesIO(pdf)).pages)
                    (OUT / f"{name}.pdf").write_bytes(pdf)
                    ok = n == pdf_pages
                    failed |= not ok
                    print(f"{'':12} A4 pages={n} (want {pdf_pages}) {'ok' if ok else 'FAIL'}")
                ctx.close()
        # vendor tool: own costs only, then ?namuna=1: backup must exist and restore must bring it back
        ctx = browser.new_context(viewport={"width": 1440, "height": 900}, offline=True)
        page = ctx.new_page()
        vpath = DAY6 / "vendor-checklist" / "index.html"
        page.goto(vpath.as_uri()); page.evaluate("localStorage.clear()"); page.goto(vpath.as_uri())
        page.fill("input[data-c='own.0']", "1 000 000")
        page.goto(vpath.as_uri() + "?namuna=1")
        page.wait_for_timeout(200)
        vis = page.is_visible("#restore-btn")
        page.click("#restore-btn"); page.wait_for_timeout(200)
        val = page.evaluate("VC.state().cost.own[0]")
        ok = vis and val == 1000000
        failed |= not ok
        print(f"{'vendor-backup':12} {'ok' if ok else 'FAIL'} restore_button={vis} restored={val}")
        ctx.close()
        browser.close()
    img = DAY6 / "vendor-checklist" / "img"
    img.mkdir(exist_ok=True)
    for src, dst in [("vendor-namuna-1440.png", "namuna-1440.png"), ("vendor-namuna-390.png", "namuna-390.png")]:
        shutil.copyfile(OUT / src, img / dst)
    print("FAILED" if failed else "ALL OK")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
