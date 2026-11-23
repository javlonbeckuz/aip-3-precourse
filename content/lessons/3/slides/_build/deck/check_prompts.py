#!/usr/bin/env python3
"""Check that every prompt shown on a Day 2 slide matches the participant materials.

Reads day-2/deck/assets/slides_data.js, takes each slide's `prompt` text, and looks for
every line of it (placeholders like {{...}} skipped) in day-2/exercises/*.md and
day-2/prompt-pack.md. Prints slides whose lines are missing, so the deck and the
handouts never drift apart. Paths resolve relative to this file.
Run: python3 day-2/_build/deck/check_prompts.py     (exit code 1 on any mismatch)
"""
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
DAY2 = HERE.parent.parent
DATA = DAY2 / "deck" / "assets" / "slides_data.js"


def norm(t):
    return re.sub(r"\s+", " ", t.replace("\\n", "\n")).strip()


def main():
    js = DATA.read_text(encoding="utf-8")
    sources = list((DAY2 / "exercises").glob("*.md")) + [DAY2 / "prompt-pack.md"]
    corpus = "\n".join(norm(p.read_text(encoding="utf-8")) for p in sources if p.exists())
    if not corpus:
        print("no exercises or prompt-pack yet: nothing to compare")
        return 1
    bad = 0
    slides = re.split(r"\n\{\n", js)
    for i, block in enumerate(slides[1:], 1):
        m = re.search(r"\n  prompt: '((?:[^'\\]|\\.)*)'", block)
        if not m:
            continue
        title = re.search(r"title: '([^']*)'", block)
        lines = [l for l in m.group(1).split("\\n") if l.strip() and "{{" not in l]
        missing = [l for l in lines if norm(l) not in corpus]
        if missing:
            bad += 1
            print(f"slide {i:02d} {title.group(1) if title else ''}: {len(missing)} line(s) not found")
            for l in missing:
                print("   -", l)
    print("OK: every slide prompt matches the handouts" if not bad else f"{bad} slide(s) differ")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
