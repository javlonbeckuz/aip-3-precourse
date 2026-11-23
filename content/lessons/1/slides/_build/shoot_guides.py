"""Screenshots of every tool in its worked-example state, for the *.qollanma.md guides.

Run:  uv run --with playwright python3 day-1/_build/shoot_guides.py
Opens each page offline with "#namuna" (which clicks "Namuna bilan ochish") and saves a PNG next to the tool.
Paths resolve relative to this file.
"""
import pathlib

from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
DAY1 = HERE.parent
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

SHOTS = [
    # page, hash, output, (w, h), full_page
    ("demos/tokenizer/index.html", "#namuna", "demos/tokenizer/qollanma-namuna.png", (1440, 1100), False),
    ("demos/side-by-side/index.html", "#namuna", "demos/side-by-side/qollanma-namuna.png", (1440, 1400), False),
    ("demos/formula-check/index.html", "#namuna", "demos/formula-check/qollanma-namuna.png", (1440, 1000), False),
    ("demos/pick-a-number/index.html", "#namuna", "demos/pick-a-number/qollanma-namuna.png", (1440, 1000), False),
    ("demos/data-trip/index.html", "#B", "demos/data-trip/qollanma-namuna.png", (1440, 1000), False),
    ("demos/models/index.html", "", "demos/models/qollanma-namuna.png", (1000, 900), True),
    ("first-build/examples/namuna-kalkulyator.html", "", "first-build/examples/namuna-kalkulyator.png", (1280, 900), False),
    ("first-build/examples/namuna-banket.html", "", "first-build/examples/namuna-banket.png", (1280, 900), False),
    ("first-build/examples/namuna-taklif.html", "", "first-build/examples/namuna-taklif.png", (1280, 900), False),
]


def main():
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=CHROME, headless=True)
        for page_rel, hsh, out_rel, (w, h), full in SHOTS:
            ctx = b.new_context(viewport={"width": w, "height": h}, offline=True)
            page = ctx.new_page()
            page.goto((DAY1 / page_rel).as_uri() + hsh)
            page.wait_for_timeout(1400)
            page.screenshot(path=str(DAY1 / out_rel), full_page=full)
            print("shot", out_rel)
            ctx.close()
        b.close()


if __name__ == "__main__":
    main()
