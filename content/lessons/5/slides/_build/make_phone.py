"""Turn the recorded Telegram transcripts into phone-sized screenshots for the deck and the demos.

    uv run --with playwright python3 day-4/_build/make_phone.py

Reads (relative to this file): ../exercises/namuna/natijalar/04-telefon.txt and 12-xodim-va-tasdiqlash.txt,
written by _build/sandbox/run_day4.py from a real run against fake Telegram and a fake model.
Writes phone pages to _build/phone/*.html and PNGs to ../deck/assets/img/ and ../demos/01-noutbuk-testi/.
"""

from __future__ import annotations

import html
import re
import shutil
from pathlib import Path

HERE = Path(__file__).resolve().parent
DAY4 = HERE.parent
NAT = DAY4 / "exercises" / "namuna" / "natijalar"
OUT_HTML = HERE / "phone"
DECK_IMG = DAY4 / "deck" / "assets" / "img"
DEMO = DAY4 / "demos" / "01-noutbuk-testi"
FONT = DAY4 / "deck" / "assets" / "fonts" / "InterVariable-latin.woff2"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

CSS = """
@font-face { font-family: 'Inter'; src: url('FONT') format('woff2'); font-weight: 100 900; }
:root { --bg:#dbe5d1; --in:#ffffff; --out:#e3fbd0; --ink:#1d2327; --muted:#6b7680; }
* { box-sizing: border-box; }
body { margin:0; width:390px; background:var(--bg); font:15px/1.4 'Inter', -apple-system, 'Segoe UI', sans-serif; color:var(--ink); }
.status { display:flex; justify-content:space-between; padding:8px 18px 4px; font-size:13px; font-weight:600; background:#fff; }
.top { display:flex; align-items:center; gap:10px; padding:8px 14px 10px; background:#fff; border-bottom:1px solid #d6dde3; }
.ava { width:38px; height:38px; border-radius:50%; background:#4f9d6b; color:#fff; display:grid; place-items:center; font-weight:650; font-size:14px; }
.name { font-weight:650; font-size:16px; } .sub { color:var(--muted); font-size:13px; }
.list { padding:12px 10px 18px; display:flex; flex-direction:column; gap:8px; }
.msg { max-width:86%; padding:7px 11px 8px; border-radius:14px; white-space:pre-wrap; overflow-wrap:anywhere; box-shadow:0 1px 1px rgba(0,0,0,.08); }
.bot { align-self:flex-start; background:var(--in); border-bottom-left-radius:4px; }
.me { align-self:flex-end; background:var(--out); border-bottom-right-radius:4px; }
.note { align-self:center; font-size:12.5px; color:#fff; background:rgba(40,60,50,.45); padding:3px 10px; border-radius:10px; text-align:center; max-width:92%; }
.btns { display:flex; gap:6px; max-width:86%; }
.btn { flex:1; text-align:center; padding:7px 6px; border-radius:9px; background:rgba(40,60,50,.28); color:#fff; font-size:14px; font-weight:500; }
"""


def parse(path: Path) -> list[tuple[str, str]]:
    """[(who, text)] from the transcript format '[Siz] ...' / '[Bot] ...' with 6-space continuation lines."""
    items: list[list[str]] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        m = re.match(r"^\[([^\]]+)\] (.*)$", line)
        if m:
            items.append([m.group(1), m.group(2)])
        elif line.startswith("      ") and items:
            items[-1][1] += "\n" + line[6:]
        elif re.match(r"^\d\) ", line):
            items.append(["note", line[3:]])
    return [(w, t) for w, t in items]


def render(items, title: str, sub: str, viewer: str, keep, clock: str = "09:41") -> str:
    rows = []
    for who, text in items:
        if not keep(who):
            continue
        if who == "note":
            rows.append(f'<div class="note">{html.escape(text)}</div>')
            continue
        if who.startswith("Egasi") and "tugmasini" in text:
            rows.append('<div class="note">✅ Yuborish bosildi</div>')
            continue
        mine = who in (viewer,)
        body = re.sub(r"(\d) (?=\d{3}\b)", "\\1\u00a0", html.escape(text))  # keep 1 890 000 on one line
        rows.append(f'<div class="msg {"me" if mine else "bot"}">{body}</div>')
        if "Javob loyihasi" in text:
            rows.append('<div class="btns"><div class="btn">✅ Yuborish</div><div class="btn">❌ Rad etish</div></div>')
    css = CSS.replace("FONT", FONT.as_uri())
    return (f"<!doctype html><html lang='uz'><head><meta charset='utf-8'><style>{css}</style></head><body>"
            f"<div class='status'><span>{clock}</span><span>4G ▮▮▮ 82%</span></div>"
            f"<div class='top'><div class='ava'>SY</div><div><div class='name'>{html.escape(title)}</div>"
            f"<div class='sub'>{html.escape(sub)}</div></div></div><div class='list'>{''.join(rows)}</div></body></html>")


def main() -> None:
    from playwright.sync_api import sync_playwright
    OUT_HTML.mkdir(exist_ok=True)
    DECK_IMG.mkdir(parents=True, exist_ok=True)
    DEMO.mkdir(parents=True, exist_ok=True)
    owner = parse(NAT / "04-telefon.txt")
    staff = parse(NAT / "12-xodim-va-tasdiqlash.txt")
    # Short version for the deck: the question, /stop and a reminder from the phone; everything else dropped.
    short, keep = [], False
    for who, text in owner:
        if who == "Siz":
            keep = text.startswith(("Optima", "/eslat"))
        if keep:
            short.append((who, text))
    pages = {
        "telefon-egasi": render(owner, "Savdo yordamchisi", "bot · noutbuk yopiq, server ishlayapti", "Siz", lambda w: True),
        "telefon-egasi-qisqa": render(short, "Savdo yordamchisi", "bot · noutbuk yopiq, server ishlayapti", "Siz", lambda w: True,
                                      clock=next((re.match(r"/eslat (\d\d:\d\d)", t).group(1) for w, t in short
                                                  if w == "Siz" and t.startswith("/eslat")), "09:41")),
        "telefon-xodim": render(staff, "Savdo yordamchisi", "bot · Madina telefoni", "Madina",
                                lambda w: w in ("Madina", "Bot -> Madina")),
        "telefon-tasdiqlash": render(staff, "Savdo yordamchisi", "bot · egasi (tasdiqlovchi) telefoni", "Siz",
                                     lambda w: w in ("Siz", "Bot", "Bot -> egasi") or w.startswith("Egasi")),
    }
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=CHROME)
        pg = b.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2)
        for name, doc in pages.items():
            f = OUT_HTML / f"{name}.html"
            f.write_text(doc, encoding="utf-8")
            pg.goto(f.as_uri())
            pg.wait_for_timeout(200)
            png = DECK_IMG / f"{name}.png"
            pg.screenshot(path=str(png), full_page=True)
            shutil.copy(png, DEMO / f"{name}.png")
        b.close()
    print("phones:", ", ".join(pages))


if __name__ == "__main__":
    main()
