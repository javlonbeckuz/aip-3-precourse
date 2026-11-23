"""One-off port of day-2/deck/assets/slides_data.js to the shared deck engine (2026-11-20).
Removes the old `flow` background field, adds clay objects (`art`) and the laptop flag (`do`).
Words are untouched. Kept for the record; it refuses to run twice.
Run: python3 day-2/_build/deck/port_patch.py
"""
import re
import sys
from pathlib import Path

DATA = Path(__file__).resolve().parent.parent.parent / "deck" / "assets" / "slides_data.js"

# (seg, card heading) -> object
CARD_ART = {
    ("0:01", "Kompaniya papkasi"): "d2-folder",
    ("0:01", "Tanlangan jarayon"): "check",
    ("0:01", "Birinchi reja"): "d2-blueprint",
    ("0:23", "Model = dvigatel"): "d2-engine",
    ("0:23", "Harness = mashina"): "d2-car",
    ("0:25", "Claude ilovasi"): "app",
    ("0:25", "Claude desktop"): "d2-laptop",
    ("0:25", "Claude Code"): "terminal",
    ("0:28", "Tepada"): "terminal",
    ("0:28", "Pastda"): "chat",
    ("0:46", "Qotib qoldingizmi?"): "camera",
    ("0:46", "Rasm qanday qo‘yiladi"): "clipboard",
    ("1:47-1:50", "Haiku · Sonnet"): "bolt",
    ("1:47-1:50", "Opus"): "knight",
    ("1:47-1:50", "/usage"): "calculator",
    ("2:04", "Biznes-tahlilchi"): "clipboard",
    ("2:04", "Dasturchi"): "terminal",
    ("2:04", "Dizayner"): "app",
    ("2:04", "Sinovchi"): "magnifier",
    ("2:04", "Bo‘lim boshlig‘i"): "figures",
    ("2:07", "Qanday yoqiladi"): "enterkey",
    ("2:07", "Nega kerak"): "d2-blueprint",
    ("2:10", "prd.md"): "d2-blueprint",
    ("2:10", "tasks.md"): "clipboard",
    ("2:10", "Baraka misoli"): "chat",
    ("2:35-2:38", "2.0 dagi voqea"): "warning",
    ("2:35-2:38", "Qoida"): "magnifier",
    ("2:50", "Hozir yozing"): "calendar",
    ("2:54", "Telegram bot"): "plane",
    ("2:54", "OpenRouter"): "key",
    ("2:56", "Baraka misoli"): "cable",
}
# seg -> slide-level art (statement, live)
SLIDE_ART = {"0:15-0:20": "magnifier", "0:48": "figures", "2:57-3:00": "flow", "0:33-0:36": "enterkey"}
# bignum: number -> art
NUM_ART = {"120": "inbox", "6": "d2-stopwatch", "9": "warning"}
# exercises done on laptops
DO = {"0:53-0:59", "0:59-1:14", "1:05-1:14", "1:14-1:20", "1:25-1:40", "1:40-1:47", "2:00-2:04", "2:12-2:30", "2:38-2:50"}


def main():
    t = DATA.read_text(encoding="utf-8")
    if " art: '" in t:
        sys.exit("already ported")
    out, seg, used = [], None, set()
    for ln in t.split("\n"):
        m = re.match(r"\s*seg: '([^']+)'", ln)
        if m:
            seg = m.group(1)
            extra = ""
            if seg in SLIDE_ART:
                extra += f" art: '{SLIDE_ART[seg]}',"; used.add(("slide", seg))
            if seg in DO:
                extra += " do: true,"; used.add(("do", seg))
            ln = ln.rstrip() + extra
        if re.match(r"\s*flow: \{[^}]*\},\s*$", ln):
            continue
        m = re.match(r"(\s*\{ h: '((?:[^'\\]|\\.)*)',)(.*)$", ln)
        if m and (seg, m.group(2)) in CARD_ART:
            ln = f"{m.group(1)} art: '{CARD_ART[(seg, m.group(2))]}',{m.group(3)}"; used.add((seg, m.group(2)))
        m = re.match(r"(\s*\{ n: '(\d+)',)(.*)$", ln)
        if m and seg == "2:52" and m.group(2) in NUM_ART:
            ln = f"{m.group(1)} art: '{NUM_ART[m.group(2)]}',{m.group(3)}"; used.add(("num", m.group(2)))
        out.append(ln)
    want = set(CARD_ART) | {("slide", s) for s in SLIDE_ART} | {("do", s) for s in DO} | {("num", n) for n in NUM_ART}
    if want - used:
        sys.exit(f"not applied: {sorted(want - used)}")
    DATA.write_text("\n".join(out), encoding="utf-8")
    print("patched", len(used), "places")


if __name__ == "__main__":
    main()
