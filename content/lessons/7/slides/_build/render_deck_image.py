"""Re-render the deck's images at 2x: the results sheet (slide 8) from the Baraka example,
and the Kit 2 matrix (slide 21) from Day 2's Baraka company folder (read only).

Run:  uv run --with playwright --with pillow python3 day-6/_build/render_deck_image.py
Paths resolve relative to this file; uses installed Chrome (channel="chrome").
"""
import pathlib

from PIL import Image
from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
DAY6 = HERE.parent
OUT = DAY6 / "deck" / "assets" / "img"
MATRIX = DAY6.parent / "day-2" / "company-folder-starter" / "baraka-office" / "kompaniya" / "kit2-scoring" / "matrix.html"


def main() -> None:
    full = OUT / "natija-varagi-baraka.png"
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 1000}, device_scale_factor=2)
        page.goto((DAY6 / "results-sheet" / "index.html").as_uri() + "?namuna=baraka")
        page.wait_for_function("document.fonts.status === 'loaded'")
        page.emulate_media(media="print")
        page.set_viewport_size({"width": 794, "height": 1123})
        page.wait_for_timeout(300)
        page.locator("#sheet").screenshot(path=str(full))
        browser.close()
    im = Image.open(full)
    w, h = im.size
    im.crop((0, 0, w, int(h * 0.56))).save(OUT / "natija-varagi-baraka-yuqori.png")
    print("wrote", full.name, "and the top crop")
    render_matrix()


def render_matrix() -> None:
    out = OUT / "baraka-matritsa.png"
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        page = browser.new_page(viewport={"width": 1180, "height": 900}, device_scale_factor=2)
        page.goto(MATRIX.as_uri())
        page.wait_for_function("document.fonts.status === 'loaded'")
        page.wait_for_timeout(300)
        page.locator("main").screenshot(path=str(out))
        browser.close()
    print("wrote", out.name, "from", MATRIX.relative_to(DAY6.parent))


if __name__ == "__main__":
    main()
