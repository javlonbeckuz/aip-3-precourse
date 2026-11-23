"""Compress only the day 4 clay objects (raw/d4-*.png) to deck-engine/art/art-d4-*.webp.

Same steps as deck-engine/_build/art/compress.py, limited to the d4- files so parallel work on other days is not touched.
Run: uv run --with pillow python3 day-4/_build/deck/compress_d4_art.py
"""
from pathlib import Path
from PIL import Image

ENGINE = Path(__file__).resolve().parents[3] / "deck-engine"
for f in sorted((ENGINE / "_build" / "art" / "raw").glob("d4-*.png")):
    im = Image.open(f).convert("RGBA")
    al = im.split()[3]
    im.putalpha(al.point(lambda v: 0 if v < 24 else v))
    box = im.getbbox()
    if box:
        im = im.crop(box)
    im.thumbnail((512, 512), Image.LANCZOS)
    dst = ENGINE / "art" / f"art-{f.stem}.webp"
    im.save(dst, "WEBP", quality=90, method=6)
    print(dst.name, dst.stat().st_size // 1024, "kB", im.size)
