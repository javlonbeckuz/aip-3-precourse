#!/usr/bin/env python3
"""Assemble the Day 2 company-folder starter from its sources.

Sources (read only):
  kits/templates/kompaniya/*        kit form templates (owned by the kits package)
  kits/skills/kit1..kit5            reference /kit1../kit5 skills (owned by the kits package)
  nlm-lead-magnet-video/demo-fayllar/0[1-4]_*.md   Baraka Office official documents
  day-2/company-folder-starter/src/ hand-written Day 2 files (CLAUDE.md template, placeholders)

Writes (generated, do not edit by hand; re-run after kits change):
  day-2/company-folder-starter/kompaniya/            blank starter for participants
  day-2/company-folder-starter/skills/kit1..kit5     course skills, installed in the Skills block
  day-2/company-folder-starter/baraka-office/kompaniya/hujjatlar/   Baraka documents
  day-2/company-folder-starter/baraka-office/kompaniya/kit3..kit5 blank templates (kit5 baseline kept)
  day-2/company-folder-starter/baraka-office/kompaniya/kit1-interviews/otabek-transcript.md (from demos/inputs)
  day-2/_build/dist/2-dars-kompaniya-papkasi.zip     what mentors send to the group chat:
      praktikum/kompaniya/, skills/, baraka-office/, yomon-namuna/, natijalar/ (real Claude outputs),
      sahifalar/ (the participant pages as single offline HTML files), prompt-pack.md, kompaniya.qollanma.md

Run after make_baraka.py and build_docs.py (the zip takes the built pages): python3 make_starter.py
"""
import base64
import re
import shutil
import sys
import zipfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
DAY2 = HERE.parent
ROOT = DAY2.parent
KITS = ROOT / "kits"
DEMO = ROOT / "nlm-lead-magnet-video" / "demo-fayllar"
STARTER = DAY2 / "company-folder-starter"
SRC = STARTER / "src"
BLANK = STARTER / "kompaniya"
BARAKA = STARTER / "baraka-office" / "kompaniya"
DIST = HERE / "dist"

PLACEHOLDERS = {
    "hujjatlar/README.md": "# hujjatlar/\n\nKompaniyaning rasmiy hujjatlarini shu yerga qo‘ying: prays-list, shartnoma namunasi, ichki tartib, KP.\nMaxfiy hujjat (pasport, karta, parol) qo‘ymang.\nCLAUDE.md dagi «Rasmiy hujjatlar» bo‘limida shu fayllarning nomini yozing.\n",
}


# participant pages that go into the zip, as single self-contained files
PAGES = {
    "promptlar.html": "handouts/promptlar.html",
    "mashqlar.html": "exercises/mashqlar.html",
    "uy-vazifasi.html": "handouts/uy-vazifasi.html",
    "shpargalka.html": "handouts/claude-code-shpargalka.html",
    "lugat.html": "handouts/lugat.html",
    "kompaniya-qollanma.html": "company-folder-starter/kompaniya.qollanma.html",
}
MIME = {".woff2": "font/woff2", ".png": "image/png", ".svg": "image/svg+xml", ".jpg": "image/jpeg"}


def data_uri(f):
    return f"data:{MIME.get(f.suffix, 'application/octet-stream')};base64," + base64.b64encode(f.read_bytes()).decode()


def inline_page(src):
    """One HTML file with its stylesheet, fonts and images inside, so it opens offline from Telegram."""
    html = src.read_text(encoding="utf-8")

    def css(m):
        css_path = (src.parent / m.group(1)).resolve()
        text = css_path.read_text(encoding="utf-8")
        text = re.sub(r"url\('?([^')]+)'?\)", lambda u: u.group(0) if u.group(1).startswith("data:") else f"url('{data_uri((css_path.parent / u.group(1)).resolve())}')", text)
        return "<style>\n" + text + "\n</style>"

    html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', css, html)
    html = re.sub(r'<img ([^>]*?)src="(?!data:|https?:)([^"]+)"', lambda m: f'<img {m.group(1)}src="{data_uri((src.parent / m.group(2)).resolve())}"', html)
    return html


def copytree(src, dst):
    if dst.exists():
        shutil.rmtree(dst)
    shutil.copytree(src, dst, ignore=shutil.ignore_patterns(".DS_Store"))


def main():
    for p in [KITS / "templates" / "kompaniya", KITS / "skills", SRC / "CLAUDE.md"]:
        if not p.exists():
            print(f"FAIL: missing source {p}")
            return 1

    # 1. blank starter
    copytree(KITS / "templates" / "kompaniya", BLANK)
    shutil.copy2(SRC / "CLAUDE.md", BLANK / "CLAUDE.md")
    for rel, text in PLACEHOLDERS.items():
        f = BLANK / rel
        f.parent.mkdir(parents=True, exist_ok=True)
        f.write_text(text, encoding="utf-8")

    # 2. course skills, not active until the Skills block installs them
    skills_out = STARTER / "skills"
    if skills_out.exists():
        shutil.rmtree(skills_out)
    skills_out.mkdir()
    for n in range(1, 6):
        copytree(KITS / "skills" / f"kit{n}", skills_out / f"kit{n}")

    # 3. Baraka example: documents and the templates not filled on Day 2
    docs = BARAKA / "hujjatlar"
    docs.mkdir(parents=True, exist_ok=True)
    for f in sorted(DEMO.glob("0[1-4]_*.md")):
        # copies follow the overnight rule: no em dash in our folder
        (docs / f.name).write_text(f.read_text(encoding="utf-8").replace("\u2014", "-"), encoding="utf-8")
    for sub in ["kit3-agent", "kit4-people", "kit5-pilot"]:
        for f in (KITS / "templates" / "kompaniya" / sub).glob("*.md"):
            dst = BARAKA / sub / f.name
            dst.parent.mkdir(parents=True, exist_ok=True)
            if not dst.exists():  # never overwrite the filled Baraka baseline.md
                shutil.copy2(f, dst)
    shutil.copy2(DAY2 / "demos" / "inputs" / "otabek-transcript.md", BARAKA / "kit1-interviews" / "otabek-transcript.md")
    # No app/ placeholder: Day 3 brings the real app/ folder, and a placeholder made Claude stop
    # and offer to rename or delete it (playtest D3-10).
    for stale in [BLANK / "app", BARAKA / "app"]:
        if stale.exists():
            shutil.rmtree(stale)

    # 4. zip for the group chat: everything the participant-facing text tells people to open
    DIST.mkdir(exist_ok=True)
    z = DIST / "2-dars-kompaniya-papkasi.zip"
    top = Path("praktikum")  # the course folder Week 0 creates in the home folder: ~/praktikum (RULES.md)
    trees = {
        "kompaniya": BLANK,
        "skills": skills_out,
        "baraka-office": STARTER / "baraka-office",
        "yomon-namuna": STARTER / "yomon-namuna",
        "natijalar": DAY2 / "demos" / "expected",
    }
    missing = []
    with zipfile.ZipFile(z, "w", zipfile.ZIP_DEFLATED) as zf:
        for name, base in trees.items():
            for f in sorted(base.rglob("*")):
                if f.is_file() and f.name != ".DS_Store" and f.suffix != ".html" or (f.is_file() and f.name == "matrix.html"):
                    zf.write(f, top / name / f.relative_to(base))
        for f in [DAY2 / "prompt-pack.md", STARTER / "kompaniya.qollanma.md"]:
            zf.write(f, top / f.name)
        for out_name, rel in PAGES.items():
            src = DAY2 / rel
            if not src.exists():
                missing.append(rel)
                continue
            zf.writestr(str(top / "sahifalar" / out_name), inline_page(src))
    if missing:
        print("FAIL: build the pages first (build_docs.py):", ", ".join(missing))
        return 1
    n_blank = sum(1 for f in BLANK.rglob("*") if f.is_file())
    print(f"starter: {n_blank} files in kompaniya/, 5 skills, zip {z.relative_to(DAY2)} ({z.stat().st_size // 1024} KB)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
