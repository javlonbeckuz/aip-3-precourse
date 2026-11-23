"""Screenshot a deck with the notes drawer open (P) on given slides, and optionally every slide animated.

Run: uv run --with playwright python3 day-1/_build/shot_notes.py [day-dir] [--anim] [slide numbers]
Slides are reached with the arrow key, the way the presenter does. Output: <day>/_build/qa/notes/ and qa/anim/.
"""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
args = [a for a in sys.argv[1:] if a != "--anim"]
anim = "--anim" in sys.argv
day = Path(args[0]).resolve() if args else HERE.parent
nums = [int(x) for x in args[1:]] or [1, 20, 42]
url = (day / "deck" / "index.html").as_uri()
with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome")
    pg = b.new_page(viewport={"width": 1920, "height": 1080})
    out = day / "_build" / "qa" / "notes"
    out.mkdir(parents=True, exist_ok=True)
    pg.goto(url + "?noanim=1")
    pg.wait_for_timeout(600)
    cur = 1
    for n in sorted(nums):
        for _ in range(n - cur):
            pg.keyboard.press("ArrowRight")
        cur = n
        pg.wait_for_timeout(300)
        pg.keyboard.press("p")
        pg.wait_for_timeout(400)
        pg.screenshot(path=str(out / f"notes-{n:02d}.png"))
        pg.keyboard.press("p")
    if anim:
        out = day / "_build" / "qa" / "anim"
        out.mkdir(parents=True, exist_ok=True)
        total = pg.evaluate("window.SLIDES_DATA.length")
        pg.goto(url)
        pg.wait_for_timeout(4500)
        for n in range(1, total + 1):
            pg.screenshot(path=str(out / f"slide-{n:02d}.png"))
            pg.keyboard.press("ArrowRight")
            pg.wait_for_timeout(4500)
    b.close()
print("ok", day.name)
