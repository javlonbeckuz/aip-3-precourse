"""Check that every file path mentioned in the Day 1 docs exists, and that the run sheet covers 0:00-3:00 exactly.

Run:  python3 day-1/_build/check_refs.py
Paths in backticks are resolved against day-1/ first, then the project root (ROOT), then the notes' folder.
Also scans the English `do:` notes in deck/assets/slides_data.js. Exit 1 on any missing path or a gap/overlap in the run sheet.
Paths resolve relative to this file.
"""
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).resolve().parent
DAY1 = HERE.parent
ROOT = DAY1.parent
PATHLIKE = re.compile(r"`([A-Za-z0-9_.~\-][A-Za-z0-9_./\-]*?/[A-Za-z0-9_./\-]*|[A-Za-z0-9_\-]+\.(?:md|html|pdf|js|json|py|mjs|xlsx|csv|css|txt))`")
BARE = re.compile(r"\b((?:deck|demos|first-build|notebooklm-exercise|kit1-live-demo|handouts|kits|mentor-handbook|week-0-setup|nlm-lead-magnet-video|_build)/[A-Za-z0-9_./\-]+)")
IGNORE = {"kit1-interviews/ism-form-a.md", "kit1-interviews/ism-form-b.md", "kit1-dilnoza.md", "kompaniya/", "node_modules/", "cache/"}
HF_ORGS = ("deepseek-ai/", "Qwen/", "moonshotai/", "zai-org/", "google/", "openai/", "meta-models/", "mistralai/")
ALL_FILES = None


def suffix_match(ref):
    global ALL_FILES
    if ALL_FILES is None:
        ALL_FILES = [q.as_posix() for base in (DAY1, ROOT / "nlm-lead-magnet-video", ROOT / "kits", ROOT / "week-0-setup", ROOT / "mentor-handbook") for q in base.rglob("*") if "node_modules" not in q.parts]
    r = "/" + ref.rstrip("/")
    return any(f.endswith(r) for f in ALL_FILES)


def exists(ref: str, base: pathlib.Path) -> bool:
    ref = ref.rstrip(".,;:)")
    if ref in IGNORE or ref.startswith(("http", "~", "/") + HF_ORGS) or "*" in ref or "<" in ref:
        return True
    for root in (DAY1, ROOT, base):
        p = root / ref
        if p.exists():
            return True
        # tolerate references with "ROOT/" prefix
        if ref.startswith("ROOT/") and (ROOT / ref[5:]).exists():
            return True
    return suffix_match(ref)


def check_paths():
    missing = []
    docs = [p for p in DAY1.rglob("*.md") if not ({"node_modules", "cache", "qa"} & set(p.relative_to(DAY1).parts))]
    for p in docs:
        for n, line in enumerate(p.read_text(encoding="utf-8").splitlines(), 1):
            for m in PATHLIKE.finditer(line):
                if not exists(m.group(1), p.parent):
                    missing.append(f"{p.relative_to(DAY1)}:{n}: {m.group(1)}")
    js = (DAY1 / "deck/assets/slides_data.js").read_text(encoding="utf-8")
    for n, line in enumerate(js.splitlines(), 1):
        if "do:" in line or "say:" in line or "img:" in line:
            for m in BARE.finditer(line):
                ref = m.group(1).rstrip(".,;:)'")
                if ref.startswith("assets/"):
                    ref = "deck/" + ref
                if not exists(ref, DAY1 / "deck"):
                    missing.append(f"deck/assets/slides_data.js:{n}: {ref}")
    return missing


def check_runsheet():
    text = (DAY1 / "instructor-run-sheet.md").read_text(encoding="utf-8")
    sect = text.split("## Minute by minute", 1)[1].split("## Crosswalk", 1)[0]
    rows = re.findall(r"^\| (\d):(\d\d)-(\d):(\d\d) \|", sect, re.M)
    spans = [(int(a) * 60 + int(b), int(c) * 60 + int(d)) for a, b, c, d in rows]
    problems = []
    t = 0
    for s, e in spans:
        if s != t:
            problems.append(f"run sheet: expected a row starting at {t // 60}:{t % 60:02d}, found {s // 60}:{s % 60:02d}")
        if e <= s:
            problems.append(f"run sheet: empty or reversed row {s}-{e}")
        t = e
    if t != 180:
        problems.append(f"run sheet ends at minute {t}, not 180")
    return problems, len(spans)


def main():
    missing = check_paths()
    problems, n = check_runsheet()
    for m in missing:
        print("MISSING", m)
    for p in problems:
        print("TIMING", p)
    print(f"{len(missing)} missing path(s); run sheet: {n} minute rows, {'0:00-3:00 contiguous' if not problems else 'PROBLEMS'}")
    sys.exit(1 if missing or problems else 0)


if __name__ == "__main__":
    main()
