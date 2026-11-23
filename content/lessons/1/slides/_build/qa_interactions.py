"""Click through the interactive Day 1 pages offline and check they behave, not just render.

Run:  uv run --with playwright python3 day-1/_build/qa_interactions.py
Checks:
  - tokenizer: for every sentence set x in-browser tokenizer, the live counts equal the Python pre-measured counts;
    the own-sentence (empty) state renders;
  - data trip: variants A, B, C render at phone and projector width;
  - 7-test tally: 15 clicks give a total of 15 and a verdict;
  - side-by-side: changing both models updates prices and the monthly cost;
  - deck: pressing T on the break slide starts the countdown.
Fails on any console error or network request. Screenshots in _build/qa/interactions/.
Paths resolve relative to this file.
"""
import pathlib
import sys

from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
DAY1 = HERE.parent
OUT = HERE / "qa" / "interactions"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
fails = []


def ok(cond, msg):
    print(("ok   " if cond else "FAIL ") + msg)
    if not cond:
        fails.append(msg)


def new_page(browser, w, h, errors, net):
    ctx = browser.new_context(viewport={"width": w, "height": h}, offline=True)
    page = ctx.new_page()
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("request", lambda r: net.append(r.url) if not r.url.startswith(("file:", "data:", "blob:", "about:")) else None)
    return ctx, page


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    errors, net = [], []
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=CHROME, headless=True)

        # tokenizer parity, both builds
        for name in ["index.html", "tokenizer-offline.html"]:
            ctx, page = new_page(b, 1920, 1080, errors, net)
            page.goto((DAY1 / "demos/tokenizer" / name).as_uri())
            page.wait_for_timeout(500)
            M = page.evaluate("window.MEASUREMENTS")
            for s in M["sets"]:
                for tok in ["o200k", "deepseek-v4"]:
                    page.click(f'#setSeg button[data-id="{s["id"]}"]')
                    page.click(f'#tokSeg button[data-id="{tok}"]')
                    page.wait_for_timeout(150)
                    got = {lang: int(page.inner_text(f"#n-{lang}").split("\n")[0].replace("token", "").strip()) for lang in ["uz", "ru", "en"]}
                    exp = s["counts"][tok]
                    ok(got == {k: exp[k] for k in got}, f"tokenizer {name} {s['id']}/{tok}: page {got} == python {exp}")
            page.click('#setSeg button[data-id="own"]')
            page.wait_for_timeout(150)
            ok(page.inner_text("#n-uz").startswith("0"), f"tokenizer {name}: own-sentence state starts empty")
            page.fill("#t-uz", "Ertaga 5 ta stol keladi.")
            page.wait_for_timeout(150)
            ok(not page.inner_text("#n-uz").startswith("0"), f"tokenizer {name}: typing updates the count")
            page.screenshot(path=str(OUT / f"tokenizer-own-{name}.png"))
            ctx.close()
        for w, h, tag in [(390, 844, "phone"), (1920, 1080, "projector")]:
            ctx, page = new_page(b, w, h, errors, net)
            page.goto((DAY1 / "demos/tokenizer/index.html").as_uri())
            page.click('#setSeg button[data-id="own"]')
            page.wait_for_timeout(200)
            page.screenshot(path=str(OUT / f"tokenizer-own-{tag}.png"), full_page=True)
            ctx.close()

        # data trip variants
        for w, h, tag in [(390, 844, "phone"), (1920, 1080, "projector")]:
            for v in "ABC":
                ctx, page = new_page(b, w, h, errors, net)
                page.goto((DAY1 / "demos/data-trip/index.html").as_uri() + "#" + v)
                page.wait_for_timeout(1300)
                verdict = page.inner_text("#explain .verdict")
                ok(len(verdict) > 5, f"data-trip {v} {tag}: verdict '{verdict}'")
                sw = page.evaluate("document.documentElement.scrollWidth")
                ok(sw <= w + 1, f"data-trip {v} {tag}: no horizontal overflow ({sw})")
                page.screenshot(path=str(OUT / f"data-trip-{v}-{tag}.png"), full_page=(tag == "phone"))
                ctx.close()

        # tally
        ctx, page = new_page(b, 1920, 1080, errors, net)
        page.goto((DAY1 / "demos/pick-a-number/index.html").as_uri())
        page.keyboard.press("r")
        for n in [7, 7, 7, 7, 7, 7, 3, 3, 3, 5, 7, 4, 7, 10, 8]:
            page.click(f'#keys button[data-n="{n}"]')
        ok(page.inner_text("#tot") == "15", f"tally total is {page.inner_text('#tot')}")
        ok("7" in page.inner_text("#verdict"), f"tally verdict: {page.inner_text('#verdict')}")
        page.screenshot(path=str(OUT / "tally-15.png"))
        page.keyboard.press("r")
        ctx.close()

        # side-by-side
        for w, h, tag in [(390, 844, "phone"), (1920, 1080, "projector")]:
            ctx, page = new_page(b, w, h, errors, net)
            page.goto((DAY1 / "demos/side-by-side/index.html").as_uri())
            page.select_option("#ASel", "claude-opus-5-5")
            page.select_option("#BSel", "qwen3.8")
            page.wait_for_timeout(150)
            res = page.inner_text("#result")
            ok("Claude Opus 5.5" in res and "Qwen3.8" in res, f"side-by-side {tag}: result updates ({res.splitlines()[0]})")
            ok("$4" in page.inner_text("#APrice") and "$2" in page.inner_text("#BPrice"), f"side-by-side {tag}: prices update")
            page.screenshot(path=str(OUT / f"side-by-side-{tag}.png"), full_page=(tag == "phone"))
            ctx.close()

        # formula check: each known total gets its verdict, the example button works
        ctx, page = new_page(b, 1440, 1000, errors, net)
        page.goto((DAY1 / "demos/formula-check/index.html").as_uri())
        T = page.evaluate("window.FC_DATA.totals")
        for key, cls in [("true_oct", "ok"), ("excel_all", "bad"), ("excel_oct", "bad"), ("all_incl_nov", "bad")]:
            page.fill("#ans", str(T[key]))
            page.click("#go")
            got = page.get_attribute("#diag", "class")
            ok(cls in got, f"formula-check {key}={T[key]} -> {got}: {page.inner_text('#diag')[:60]}")
        page.fill("#ans", "15 000 000")
        page.click("#go")
        ok("unk" in page.get_attribute("#diag", "class"), "formula-check unknown number -> grey verdict")
        page.click("#exBtn")
        ok("ortiqcha" in page.inner_text("#diag"), "formula-check example button diagnoses the November row")
        ctx.close()

        # example buttons on the other tools
        for rel, check_js, label in [
            ("demos/tokenizer/index.html", "document.getElementById('t-uz').value.indexOf('Optima') >= 0", "tokenizer example fills the Baraka sentence"),
            ("demos/side-by-side/index.html", "document.getElementById('AAns').value.indexOf('Namuna javob') >= 0 && document.getElementById('nper').value === '1000'", "side-by-side example fills task, answers and volume"),
            ("demos/pick-a-number/index.html", "document.getElementById('tot').textContent === '40'", "tally example loads 40 answers"),
        ]:
            ctx, page = new_page(b, 1440, 1000, errors, net)
            page.goto((DAY1 / rel).as_uri())
            page.wait_for_timeout(300)
            page.click("#exBtn")
            page.wait_for_timeout(300)
            ok(page.evaluate(check_js), label)
            page.click("#howBtn")
            ok(page.evaluate("document.getElementById('howto').open"), label.split()[0] + ": how-to panel opens")
            ctx.close()

        # deck break timer
        ctx, page = new_page(b, 1920, 1080, errors, net)
        page.goto((DAY1 / "deck/index.html").as_uri() + "?slide=30")
        page.wait_for_timeout(300)
        page.keyboard.press("t")
        page.wait_for_timeout(1600)
        clock = page.inner_text("#clock")
        ok(clock != "10:00" and clock.startswith("09:5"), f"deck break timer runs ({clock})")
        page.screenshot(path=str(OUT / "deck-timer.png"))
        ctx.close()
        b.close()

    ok(not errors, f"no console errors {errors[:3]}")
    ok(not net, f"no network requests {net[:3]}")
    print("FAILED" if fails else "ALL OK", f"({len(fails)} failures)")
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
