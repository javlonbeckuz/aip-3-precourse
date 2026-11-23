"""QA for every Day 1 HTML page except the deck: offline render at desktop, phone and projector widths.

Run:  uv run --with playwright python3 day-1/_build/qa_pages.py [page.html ...]
With no arguments it checks every page listed in PAGES. Paths resolve relative to this file.
Checks: no network requests, no console errors, no horizontal overflow, no broken images,
fonts loaded (when the page declares OVD fonts). Screenshots go to _build/qa/pages/.
Also writes the deck image of the first-build example (deck/assets/img/namuna-kalkulyator.png).
"""
import json
import pathlib
import sys

from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
DAY1 = HERE.parent
OUT = HERE / "qa" / "pages"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

PAGES = [
    "first-build/examples/namuna-kalkulyator.html",
    "first-build/examples/namuna-banket.html",
    "first-build/examples/namuna-taklif.html",
    "first-build/prompt-sheet.html",
    "demos/index.html",
    "demos/tokenizer/index.html",
    "demos/tokenizer/tokenizer-offline.html",
    "demos/data-trip/index.html",
    "demos/pick-a-number/index.html",
    "demos/side-by-side/index.html",
    "demos/models/index.html",
    "demos/formula-check/index.html",
    "notebooklm-exercise/namuna-natijalar.html",
    "handouts/uy-vazifasi-namuna.html",
    "first-build/birinchi-qurilish.qollanma.html",
    "demos/tokenizer/tokenizer.qollanma.html",
    "demos/side-by-side/side-by-side.qollanma.html",
    "demos/formula-check/formula-check.qollanma.html",
    "demos/pick-a-number/pick-a-number.qollanma.html",
    "demos/data-trip/data-trip.qollanma.html",
    "demos/models/models.qollanma.html",
    "notebooklm-exercise/mashq.html",
    "handouts/glossariy.html",
    "handouts/ai-qanday-ishlaydi.html",
    "handouts/bilimlar-bazasi.html",
    "handouts/prompt-va-tekshirish.html",
]
SIZES = {"desktop": (1440, 900), "phone": (390, 844), "projector": (1920, 1080)}

CHECK_JS = r"""
() => {
  const sw = document.documentElement.scrollWidth, iw = window.innerWidth;
  const wide = [];
  if (sw > iw + 1) {
    document.querySelectorAll('body *').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.right > iw + 1 && r.width > 0 && getComputedStyle(el).position !== 'fixed') {
        let p = el.parentElement, scrolls = false;
        while (p) { const o = getComputedStyle(p).overflowX; if (o === 'auto' || o === 'scroll' || o === 'hidden') { scrolls = true; break; } p = p.parentElement; }
        if (!scrolls) wide.push((el.className || el.tagName) + ': ' + (el.innerText || '').slice(0, 40));
      }
    });
  }
  const broken = Array.from(document.images).filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src);
  const usesOvd = Array.from(document.fonts).some(f => f.family.includes('OVD'));
  const fontsOk = !usesOvd || (document.fonts.check('16px OVDInter') || document.fonts.check('16px "OVDInter"'));
  return {overflow: sw > iw + 1 ? wide.slice(0, 5) : [], scrollWidth: sw, innerWidth: iw, broken, fontsOk};
}
"""


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    pages = args or PAGES
    OUT.mkdir(parents=True, exist_ok=True)
    failed = False
    results = []
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME, headless=True)
        for rel in pages:
            path = DAY1 / rel
            if not path.exists():
                print(f"MISSING {rel}")
                failed = True
                continue
            for size_name, (w, h) in SIZES.items():
                ctx = browser.new_context(viewport={"width": w, "height": h}, device_scale_factor=1, offline=True)
                page = ctx.new_page()
                net, errors = [], []
                page.on("request", lambda r: net.append(r.url) if not r.url.startswith(("file:", "data:", "blob:", "about:")) else None)
                page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
                page.on("pageerror", lambda e: errors.append(str(e)))
                page.goto(path.as_uri())
                page.wait_for_load_state("load")
                page.evaluate("document.fonts.ready")
                page.wait_for_timeout(400)
                res = page.evaluate(CHECK_JS)
                shot = OUT / (rel.replace("/", "__").replace(".html", "") + f"__{size_name}.png")
                page.screenshot(path=str(shot), full_page=(size_name != "projector"))
                bad = res["overflow"] or res["broken"] or not res["fontsOk"] or net or errors
                failed |= bool(bad)
                results.append({"page": rel, "size": size_name, **res, "net": net, "errors": errors})
                print(f"{'FAIL' if bad else 'ok  '} {size_name:9s} {rel}"
                      + (f" overflow={res['overflow']} sw={res['scrollWidth']}" if res["overflow"] else "")
                      + (f" broken={res['broken']}" if res["broken"] else "")
                      + ("" if res["fontsOk"] else " FONTS")
                      + (f" net={net[:3]}" if net else "")
                      + (f" errors={errors[:3]}" if errors else ""))
                ctx.close()
        # deck image of the first-build example
        ex = DAY1 / "first-build/examples/namuna-kalkulyator.html"
        if ex.exists():
            ctx = browser.new_context(viewport={"width": 1180, "height": 760}, device_scale_factor=2, offline=True)
            page = ctx.new_page()
            page.goto(ex.as_uri())
            page.wait_for_timeout(300)
            img = DAY1 / "deck/assets/img/namuna-kalkulyator.png"
            img.parent.mkdir(parents=True, exist_ok=True)
            page.screenshot(path=str(img))
            ctx.close()
        browser.close()
    (OUT / "report.json").write_text(json.dumps(results, ensure_ascii=False, indent=1), encoding="utf-8")
    print("FAILED" if failed else "ALL OK")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
