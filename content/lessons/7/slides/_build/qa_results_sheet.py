"""Render-check the results sheet offline: 1440 px, 390 px, A4 print (must be exactly one page).

Run:  uv run --with playwright --with pypdf python3 day-6/_build/qa_results_sheet.py
Uses the installed Google Chrome (channel="chrome"); no browser download. Paths resolve relative to this file.
Writes screenshots and PDFs to day-6/_build/qa/results-sheet/ and copies the guide images to results-sheet/img/.
Exit code 1 on any problem: sheet content overflowing the A4 box, PDF not one page, console errors,
network requests, horizontal page scroll, or fonts not loaded.
"""
import io
import json
import pathlib
import shutil
import sys

from playwright.sync_api import sync_playwright
from pypdf import PdfReader

HERE = pathlib.Path(__file__).resolve().parent
DAY6 = HERE.parent
PAGE = DAY6 / "results-sheet" / "index.html"
OUT = HERE / "qa" / "results-sheet"
IMG = DAY6 / "results-sheet" / "img"

CHECK_JS = r"""
() => {
  const sheet = document.getElementById('sheet');
  const sr = sheet.getBoundingClientRect();
  const k = sr.width / sheet.offsetWidth;
  const problems = [];
  // every element must stay inside the A4 box (allow 0.5 px rounding)
  sheet.querySelectorAll('*').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    if (r.bottom > sr.bottom + 0.5 || r.right > sr.right + 0.5) problems.push({cls: el.className, text: (el.innerText || '').slice(0, 50), over: [Math.round(r.right - sr.right), Math.round(r.bottom - sr.bottom)]});
  });
  // text that overflows its own cell (nowrap numbers)
  sheet.querySelectorAll('td, .kpi .v, .val, .badge').forEach(el => {
    if (el.scrollWidth > el.clientWidth + 1) problems.push({cls: 'clip:' + el.className, text: el.innerText.slice(0, 40), sw: el.scrollWidth, cw: el.clientWidth});
  });
  const padB = parseFloat(getComputedStyle(sheet).paddingBottom) * k;
  const lastR = sheet.querySelector('.s-foot').getBoundingClientRect();
  if (lastR.bottom > sr.bottom - padB + 0.5) problems.push({cls: 'past-padding', over: Math.round((lastR.bottom - (sr.bottom - padB)) / k / 3.7795 * 10) / 10 + 'mm'});
  const sign = sheet.querySelector('.s-sign').getBoundingClientRect();
  const r3 = sheet.querySelector('.s-row.r3').getBoundingClientRect();
  const slackMm = Math.round((sign.top - r3.bottom) / k / 3.7795 * 10) / 10;
  if (slackMm < 2) problems.push({cls: 'no-slack', slackMm});
  const foot = sheet.querySelector('.s-foot').getBoundingClientRect();
  return {
    problems,
    freeMm: slackMm,
    hScroll: document.documentElement.scrollWidth > window.innerWidth + 1,
    fonts: document.fonts.check('12px RSInter'),
    warnings: Array.from(document.querySelectorAll('#warnlist .w')).map(w => w.className.split(' ')[1] + ': ' + w.innerText)
  };
}
"""

CASES = [
    ("baraka", "namuna=baraka", {}),
    ("yomon", "namuna=yomon", {}),
    ("baraka-sahna", "namuna=baraka", {"stage": True}),
    ("bosh", "", {"clear": True}),
]


def run() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    IMG.mkdir(parents=True, exist_ok=True)
    failed = False
    report = []
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        for name, query, opts in CASES:
            for width, height in [(1440, 1000), (390, 844)]:
                ctx = browser.new_context(viewport={"width": width, "height": height}, device_scale_factor=2 if width == 390 else 1, offline=True)
                page = ctx.new_page()
                errors, net = [], []
                page.on("console", lambda m, errors=errors: errors.append(m.text) if m.type == "error" else None)
                page.on("pageerror", lambda e, errors=errors: errors.append(str(e)))
                page.on("request", lambda r, net=net: net.append(r.url) if not r.url.startswith(("file:", "data:", "blob:")) else None)
                page.goto(PAGE.as_uri() + ("?" + query if query else ""))
                if opts.get("clear"):
                    page.evaluate("localStorage.clear()")
                    page.goto(PAGE.as_uri())
                if opts.get("stage"):
                    page.evaluate("RS_APP.state().stageMode = true; RS_APP.update()")
                page.wait_for_function("document.fonts.status === 'loaded'")
                page.wait_for_timeout(400)
                res = page.evaluate(CHECK_JS)
                tag = f"{name}-{width}"
                page.screenshot(path=str(OUT / f"{tag}.png"), full_page=(width == 390))
                page.locator(".preview").screenshot(path=str(OUT / f"{tag}-sheet.png"))
                bad = bool(res["problems"] or res["hScroll"] or not res["fonts"] or errors or net)
                failed |= bad
                report.append({"case": tag, **res, "errors": errors, "network": net})
                print(f"{tag:20s} {'FAIL' if bad else 'ok'} slack={res['freeMm']}mm hscroll={res['hScroll']} fonts={res['fonts']}"
                      + (f" problems={res['problems'][:4]}" if res["problems"] else "") + (f" errors={errors}" if errors else "") + (f" net={net}" if net else ""))
                if width == 1440:
                    pdf = page.pdf(format="A4", print_background=True, prefer_css_page_size=True)
                    (OUT / f"{name}.pdf").write_bytes(pdf)
                    pages = len(PdfReader(io.BytesIO(pdf)).pages)
                    # a browser or printer that ignores @page and adds its own 12 mm margins
                    pdf2 = page.pdf(format="A4", print_background=True, prefer_css_page_size=False,
                                    margin={"top": "12mm", "bottom": "12mm", "left": "12mm", "right": "12mm"})
                    (OUT / f"{name}-margins.pdf").write_bytes(pdf2)
                    pages2 = len(PdfReader(io.BytesIO(pdf2)).pages)
                    ok = pages == 1 and pages2 == 1
                    failed |= not ok
                    print(f"{'':20s} A4 PDF pages={pages}, with 12 mm printer margins pages={pages2} {'ok' if ok else 'FAIL'}")
                    page.emulate_media(media="print")
                    page.set_viewport_size({"width": 794, "height": 1123})
                    page.wait_for_timeout(200)
                    page.locator("#sheet").screenshot(path=str(OUT / f"{name}-a4.png"))
                    page.emulate_media(media="screen")
                ctx.close()
        # example first, then the owner's own file: nothing of Baraka may stay on the sheet
        ctx = browser.new_context(viewport={"width": 1440, "height": 1000}, offline=True)
        page = ctx.new_page()
        page.goto(PAGE.as_uri() + "?namuna=baraka")
        page.wait_for_timeout(300)
        fixture = (HERE / "tests" / "fixtures" / "kit5-skill-oydin-numbers.md").read_text(encoding="utf-8")
        page.evaluate("t => RS_APP.loadTexts([{name: 'numbers.md', text: t}])", fixture)
        page.wait_for_timeout(200)
        st = page.evaluate("RS_APP.state()")
        leaked = [k for k, v in [("company", st["meta"]["company"]), ("notes", st["notes"]["notProven"]), ("next", st["next"]["process"]), ("owner", st["signoff"]["owner"])] if "Baraka" in str(v) or "Rustamov" in str(v) or "Lidni" in str(v) or "bitta" in str(v)]
        ok = not leaked and st["weeks"][0].get("B1") == 282.3
        failed |= not ok
        print(f"{'example-then-file':20s} {'ok' if ok else 'FAIL'} leaked={leaked} B1={st['weeks'][0].get('B1')}")
        ctx.close()
        # own data saved, then the ?namuna= link from exercise 01: the own data must go to the backup and come back
        ctx = browser.new_context(viewport={"width": 1440, "height": 1000}, offline=True)
        page = ctx.new_page()
        page.goto(PAGE.as_uri())
        page.evaluate("localStorage.clear()")
        page.goto(PAGE.as_uri())
        page.evaluate("t => RS_APP.loadTexts([{name: 'numbers.md', text: t}])", fixture)
        page.evaluate("RS_APP.state().meta.company = 'Mening kompaniyam'; RS_APP.update()")
        page.goto(PAGE.as_uri() + "?namuna=baraka")
        page.wait_for_timeout(300)
        shown_restore = page.is_visible("#restore-btn")
        page.click("#restore-btn")
        page.wait_for_timeout(200)
        back = page.evaluate("RS_APP.state().meta.company")
        ok = shown_restore and back == "Mening kompaniyam"
        failed |= not ok
        print(f"{'link-keeps-backup':20s} {'ok' if ok else 'FAIL'} restore_button={shown_restore} restored={back!r}")
        ctx.close()
        browser.close()
    (OUT / "report.json").write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding="utf-8")
    # images used by the guide
    for src, dst in [("baraka-1440.png", "namuna-1440.png"), ("baraka-a4.png", "namuna-a4.png"), ("baraka-390.png", "namuna-390.png"), ("yomon-a4.png", "yomon-a4.png"), ("baraka-sahna-a4.png", "sahna-a4.png")]:
        if (OUT / src).exists():
            shutil.copyfile(OUT / src, IMG / dst)
    print("FAILED" if failed else "ALL OK")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(run())
