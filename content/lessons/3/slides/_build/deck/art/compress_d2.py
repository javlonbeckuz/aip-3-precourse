"""Compress only the day 2 clay objects (raw/d2-*.png) into deck-engine/art/art-d2-*.webp, same settings as
deck-engine/_build/art/compress.py, without rewriting anyone else's files. Also builds a preview sheet here.
Run: uv run --with pillow python3 day-2/_build/deck/art/compress_d2.py
"""
import glob
import os
from PIL import Image

here = os.path.dirname(os.path.abspath(__file__))
eng = os.path.normpath(os.path.join(here, '..', '..', '..', '..', 'deck-engine'))
tiles = []
for f in sorted(glob.glob(os.path.join(eng, '_build', 'art', 'raw', 'd2-*.png'))):
    im = Image.open(f).convert('RGBA')
    al = im.split()[3]
    im.putalpha(al.point(lambda v: 0 if v < 24 else v))
    box = im.getbbox()
    if box:
        im = im.crop(box)
    im.thumbnail((512, 512), Image.LANCZOS)
    dst = os.path.join(eng, 'art', 'art-' + os.path.basename(f)[:-4] + '.webp')
    im.save(dst, 'WEBP', quality=90, method=6)
    print(os.path.basename(dst), im.size, os.path.getsize(dst) // 1024, 'kB', 'alpha-min', al.getextrema()[0])
    tiles.append(im)
sheet = Image.new('RGB', (540 * len(tiles), 540), (236, 236, 238))
for i, im in enumerate(tiles):
    sheet.paste(im, (540 * i + (540 - im.width) // 2, (540 - im.height) // 2), im)
sheet.save(os.path.join(here, 'd2-sheet.png'))
