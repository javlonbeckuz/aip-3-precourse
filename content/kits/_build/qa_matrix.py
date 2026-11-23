#!/usr/bin/env python3
"""
Render the Kit 2 matrix template with sample data at desktop (1440 px) and phone (390 px) width.

    python3 _build/qa_matrix.py [page-with-data.html]

Takes the JSON data block from the given page (default: the test-run company), puts it into
skills/kit2/matrix-template.html, writes _build/qa/html/matrix-sample.html and two PNG screenshots.
The phone shot uses a 390 px iframe, because headless Chrome will not open a window that narrow.
"""
import os
import pathlib
import re
import subprocess
import sys
import urllib.parse

HERE = pathlib.Path(__file__).resolve().parent
KITS = HERE.parent
OUT = HERE / "qa" / "html"
CHROME = os.environ.get("CHROME", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
DATA = re.compile(r'(<script id="data" type="application/json">)(.*?)(</script>)', re.S)

src = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else HERE / "test-run" / "oydin-kitob" / "kit2-scoring" / "matrix.html"
template = (KITS / "skills" / "kit2" / "matrix-template.html").read_text(encoding="utf-8")
data = DATA.search(src.read_text(encoding="utf-8")).group(2)
OUT.mkdir(parents=True, exist_ok=True)
sample = OUT / "matrix-sample.html"
sample.write_text(DATA.sub(lambda m: m.group(1) + data + m.group(3), template), encoding="utf-8")
frame = OUT / "phone-frame.html"
frame.write_text('<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;background:#888}'
                 'iframe{border:0;width:390px;height:1700px;background:#fff;display:block}</style></head>'
                 '<body><iframe id="f"></iframe><script>document.getElementById("f").src = '
                 'decodeURIComponent(location.hash.slice(1));</script></body></html>', encoding="utf-8")
base = [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars"]
subprocess.run(base + ["--window-size=1440,1000", f"--screenshot={OUT / 'matrix-1440.png'}", sample.as_uri()], capture_output=True)
subprocess.run(base + ["--window-size=600,1700", f"--screenshot={OUT / 'matrix-390.png'}",
                       frame.as_uri() + "#" + urllib.parse.quote(sample.as_uri())], capture_output=True)
print(OUT / "matrix-1440.png", OUT / "matrix-390.png", sep="\n")
