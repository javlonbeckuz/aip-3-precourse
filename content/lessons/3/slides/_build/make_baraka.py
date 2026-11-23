#!/usr/bin/env python3
"""Fill the Day 2 Baraka Office example from the kits package's canonical Baraka folder.

One story across the course: the Kit 1, Kit 2 and Kit 5 baseline files of the Baraka
example are the kits package's own (kits/namunalar/baraka-office/, made by running
/kit1, /kit2 and /kit5 on Baraka). Day 2 copies them; it does not write its own.

Copies (generated here, never edit by hand; re-run after kits changes):
  kits/namunalar/baraka-office/kit1-interviews/*  -> company-folder-starter/baraka-office/kompaniya/kit1-interviews/
  kits/namunalar/baraka-office/kit2-scoring/*     -> .../kit2-scoring/
Day 2's own Baraka files stay as they are: kit5-pilot/baseline.md (the course's single Baraka baseline,
owned by Day 2 including its «Nega shunday yozildi» notes; kits copies it byte for byte, so never copy it
back from kits, or the two loop), CLAUDE.md (annotated), prd.md, tasks.md,
.claude/skills/suhbat-tahlili/SKILL.md; otabek-transcript.md is added by make_starter.py.

Checks Value = A.2 + A.3 + A.7 and Ease = A.4 + A.5 + A.6 on every Form A row and that
matrix.html carries the same numbers. Exit code 1 on any mismatch.
Run: python3 make_baraka.py
"""
import json
import re
import shutil
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
DAY2 = HERE.parent
ROOT = DAY2.parent
SRC = ROOT / "kits" / "namunalar" / "baraka-office"
OUT = DAY2 / "company-folder-starter" / "baraka-office" / "kompaniya"
# files Day 2 wrote itself in earlier drafts; they would contradict the kits story
STALE = ["kit1-interviews/madina-form-b.md"]


def copy_text(src, dst):
    dst.parent.mkdir(parents=True, exist_ok=True)
    if src.suffix in {".md", ".html"}:
        dst.write_text(src.read_text(encoding="utf-8").replace("\u2014", "-"), encoding="utf-8")
    else:
        shutil.copy2(src, dst)


def main():
    errors = []
    if not SRC.exists():
        print(f"FAIL: {SRC} missing")
        return 1
    for sub in ["kit1-interviews", "kit2-scoring"]:
        target = OUT / sub
        if target.exists():
            shutil.rmtree(target)
        for f in sorted((SRC / sub).glob("*")):
            if f.is_file():
                copy_text(f, target / f.name)
    for rel in STALE:
        (OUT / rel).unlink(missing_ok=True)

    # arithmetic check on Form A and agreement with matrix.html
    form_a = (OUT / "kit2-scoring" / "form-a-scoring.md").read_text(encoding="utf-8")
    rows = re.findall(
        r"^\| (\d) \| [^|]+\|((?: [^|]+ \|){6}) (\d+) \((\d)\+(\d)\+(\d)\)[^|]*\| (\d+) \((\d)\+(\d)\+(\d)\)[^|]*\|$",
        form_a, re.M)
    if len(rows) < 3:
        errors.append(f"form A: only {len(rows)} scored rows parsed")
    scores = {}
    for n, _, v, v1, v2, v3, e, e1, e2, e3 in rows:
        if int(v) != int(v1) + int(v2) + int(v3):
            errors.append(f"row {n}: Value {v} != {v1}+{v2}+{v3}")
        if int(e) != int(e1) + int(e2) + int(e3):
            errors.append(f"row {n}: Ease {e} != {e1}+{e2}+{e3}")
        scores[int(n)] = (int(v), int(e))
    html = (OUT / "kit2-scoring" / "matrix.html").read_text(encoding="utf-8")
    data = json.loads(re.search(r'<script id="data" type="application/json">(.*?)</script>', html, re.S).group(1))
    for p in data["processes"]:
        if scores.get(p["n"]) != (p["value"], p["ease"]):
            errors.append(f"matrix.html process {p['n']} {p['value']}/{p['ease']} != form A {scores.get(p['n'])}")
    for n, (v, e) in sorted(scores.items()):
        print(f"  {n}. Qiymat {v:>2}  Osonlik {e:>2}")
    if errors:
        print("FAIL:", *errors, sep="\n  ")
        return 1
    print(f"OK: copied the kits Baraka Kit 1 and Kit 2 files; {len(scores)} processes checked")
    return 0


if __name__ == "__main__":
    sys.exit(main())
