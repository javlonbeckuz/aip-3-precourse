#!/usr/bin/env python3
"""Copy the exact exercise prompts into the Day 2 deck, so slides and handouts never drift.

Source of truth: day-2/exercises/0N-*.md (first ```text block of each, unless noted).
Target: the `prompt:` value of the slide with the matching `seg` in day-2/deck/assets/slides_data.js.
Run: python3 day-2/_build/deck/sync_prompts.py, then check_prompts.py and qa_deck.py.
Paths resolve relative to this file.
"""
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
DAY2 = HERE.parent.parent
DATA = DAY2 / "deck" / "assets" / "slides_data.js"

# slide seg -> (exercise file prefix, which ```text block, 0-based)
MAP = {
    "0:53-0:59": ("01", 0),
    "1:05-1:14": ("02", 0),
    "1:14-1:20": ("03", 0),
    "1:25-1:40": ("04", 0),
    "1:40-1:47": ("05", 0),
    "2:00-2:04": ("06", 0),
    "2:12-2:30": ("07", 0),
    "2:38-2:50": ("08", 0),
}


def block(prefix, idx):
    f = next((DAY2 / "exercises").glob(prefix + "-*.md"))
    blocks = re.findall(r"```text\n(.*?)```", f.read_text(encoding="utf-8"), re.S)
    text = blocks[idx].rstrip("\n")
    # deck placeholder style: a bracketed instruction on its own line becomes {{...}}
    text = re.sub(r"^\[(1-darsdagi To‘plam 1 promptini shu yerga joylang)\]$", r"{{\1}}", text, flags=re.M)
    return text


def js_str(t):
    return "'" + t.replace("\\", "\\\\").replace("'", "\\'").replace("\n", "\\n") + "'"


def main():
    js = DATA.read_text(encoding="utf-8")
    changed = 0
    for seg, (prefix, idx) in MAP.items():
        pat = re.compile(r"(seg: '" + re.escape(seg) + r"'[^\n]*layout: 'prompt',.*?\n\s*prompt: )('(?:[^'\\]|\\.)*')", re.S)
        m = pat.search(js)
        if not m:
            print("slide not found for seg", seg)
            return 1
        new = js_str(block(prefix, idx))
        if m.group(2) != new:
            js = js[: m.start(2)] + new + js[m.end(2):]
            changed += 1
            print("updated", seg, "from exercise", prefix)
    DATA.write_text(js, encoding="utf-8")
    print(f"{changed} slide prompt(s) updated")
    return 0


if __name__ == "__main__":
    sys.exit(main())
