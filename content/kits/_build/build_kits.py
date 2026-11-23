#!/usr/bin/env python3
"""
Print the Praktikum 3.0 kits to PDF (copied from the 2.0 Day 4 pipeline, paths made relative to this file).

    python3 _build/make_kits.py                   # content -> _build/design/kit-0N-<lang>.html + .md twins + templates
    python3 _build/build_kits.py                  # PDFs for every language that has HTML in _build/design/
    CHROME=/path/to/chrome python3 _build/build_kits.py   # another Chrome or Chromium binary

Per kit: inline kit.css, kit.js and the Archetica TTFs (CID TrueType in the PDF), print with
headless Chrome (portrait covers, landscape forms via @page land), rasterize to _build/qa/<lang>/,
and report anything that leaves its frame. Also writes KITS_ALL_<LANG>.pdf, all five kits in one file.
"""
import base64
import json
import os
import pathlib
import re
import shutil
import subprocess
import sys

HERE = pathlib.Path(__file__).resolve().parent
KITS = HERE.parent
DESIGN = HERE / "design"
CONTENT = KITS / "content"
TMP = HERE / "tmp"
PROJECT_ROOT = KITS.parents[2]                                   # 01_MD
FONT_DIR = PROJECT_ROOT / "30_assets" / "fonts" / "archetica"
FONT_REL = "../../../../../30_assets/fonts/archetica/"         # as written in _build/design/kit.css
FONT_FILES = ["Archetica-Regular.ttf", "Archetica-Medium.ttf", "Archetica-Bold.ttf"]
CHROME = os.environ.get("CHROME", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
TAG = {"uz-latn": "UZ_LATN"}


def inline(html: str) -> str:
    css = (DESIGN / "kit.css").read_text(encoding="utf-8")
    for name in FONT_FILES:
        data = base64.b64encode((FONT_DIR / name).read_bytes()).decode()
        css = css.replace(f"url({FONT_REL}{name})", f"url(data:font/ttf;base64,{data})")
    if FONT_REL in css:
        sys.exit("a font url in kit.css was not inlined")
    js = (DESIGN / "kit.js").read_text(encoding="utf-8")
    html = html.replace('<link rel="stylesheet" href="kit.css">', "<style>\n" + css + "\n</style>")
    return html.replace('<script src="kit.js"></script>', "<script>\n" + js + "\n</script>")


def chrome(*args: str) -> subprocess.CompletedProcess:
    return subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
                           "--hide-scrollbars", "--run-all-compositor-stages-before-draw", "--virtual-time-budget=8000", *args],
                          capture_output=True, text=True, timeout=180)


def build(lang: str) -> None:
    src = CONTENT / f"{lang}.json"
    kits = json.loads(src.read_text(encoding="utf-8"))["kits"]
    qa = HERE / "qa" / lang
    if qa.exists():
        shutil.rmtree(qa)
    qa.mkdir(parents=True)
    TMP.mkdir(exist_ok=True)
    pdfs = []
    for i, K in enumerate(kits, start=1):
        page = DESIGN / f"kit-{i:02d}-{lang}.html"
        tmp = TMP / f"kit-{i:02d}-{lang}.inlined.html"
        tmp.write_text(inline(page.read_text(encoding="utf-8")), encoding="utf-8")
        out = KITS / f"KIT_{i:02d}_{K['file']}_{TAG[lang]}.pdf"
        res = chrome("--no-pdf-header-footer", f"--print-to-pdf={out}", tmp.as_uri())
        if res.returncode != 0 or not out.exists():
            sys.exit(f"chrome failed for kit {i} {lang}:\n{res.stderr[-1500:]}")
        pdfs.append(out)
        subprocess.run(["pdftoppm", "-r", "80", "-png", str(out), str(qa / f"k{i:02d}")], check=True)
        dom = chrome("--dump-dom", tmp.as_uri()).stdout
        m = re.search(r"<title>(.*?)</title>", dom, re.S)
        rep = json.loads(m.group(1)) if m else ["no report"]
        info = subprocess.run(["pdfinfo", str(out)], capture_output=True, text=True).stdout
        pages = re.search(r"Pages:\s+(\d+)", info).group(1)
        print(f"[{lang} k{i:02d}] {out.name}: {pages} pages; {'; '.join(rep)}")
    cover_html = DESIGN / f"all-cover-{lang}.html"
    if cover_html.exists():
        tmp = TMP / f"all-cover-{lang}.inlined.html"
        tmp.write_text(inline(cover_html.read_text(encoding="utf-8")), encoding="utf-8")
        cover_pdf = TMP / f"all-cover-{lang}.pdf"
        chrome("--no-pdf-header-footer", f"--print-to-pdf={cover_pdf}", tmp.as_uri())
        subprocess.run(["pdftoppm", "-r", "80", "-png", str(cover_pdf), str(qa / "k00")], check=True)
        dom = chrome("--dump-dom", tmp.as_uri()).stdout
        m = re.search(r"<title>(.*?)</title>", dom, re.S)
        print(f"[{lang} cover] {'; '.join(json.loads(m.group(1)) if m else ['no report'])}")
        pdfs.insert(0, cover_pdf)
    allpdf = KITS / f"KITS_ALL_{TAG[lang]}.pdf"
    subprocess.run(["pdfunite", *map(str, pdfs), str(allpdf)], check=True)
    fonts = subprocess.run(["pdffonts", str(allpdf)], capture_output=True, text=True).stdout
    kinds = sorted({" ".join(l.split()[1:3]) for l in fonts.splitlines()[2:] if l.strip()})
    print(f"[{lang}] {allpdf.name}, fonts {kinds}")


def main() -> None:
    if not pathlib.Path(CHROME).exists():
        sys.exit(f"Chrome not found at {CHROME}; set the CHROME environment variable")
    langs = sys.argv[1:] or sorted({p.stem.split("-", 2)[2] for p in DESIGN.glob("kit-*.html")})
    for lang in langs:
        build(lang)


if __name__ == "__main__":
    main()
