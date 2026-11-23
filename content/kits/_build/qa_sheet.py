#!/usr/bin/env python3
"""Contact sheet: python3 _build/qa_sheet.py [lang] -> _build/qa/sheet-<lang>.jpg (one row per kit; default uz-latn)."""
import glob, pathlib, sys
from PIL import Image
HERE = pathlib.Path(__file__).resolve().parent
lang = sys.argv[1] if len(sys.argv) > 1 else "uz-latn"
H = 520
rows = []
for k in range(1, 6):
    ims = [Image.open(f).convert("RGB") for f in sorted(glob.glob(str(HERE / "qa" / lang / f"k{k:02d}-*.png")))]
    rows.append([i.resize((int(i.width * H / i.height), H)) for i in ims])
W = max(sum(i.width + 10 for i in r) for r in rows)
o = Image.new("RGB", (W, (H + 10) * len(rows)), "#9a9a9a")
for y, r in enumerate(rows):
    x = 0
    for i in r:
        o.paste(i, (x, y * (H + 10))); x += i.width + 10
out = HERE / "qa" / f"sheet-{lang}.jpg"
o.save(out, quality=82); print(out)
