"""House-rule checks for every Day 4 text file.

    python3 day-4/_build/check_text.py

FAIL (exit 1): an em dash or en dash anywhere; Cyrillic letters outside recorded outputs;
an ASCII apostrophe in o'/g' in Uzbek prose (outside code and prompts); an English possessive
after o or g ("Code's"), which the Uzbek apostrophe typesetter would mangle.
WARN: two sentences on one physical line in Markdown prose (tables and code excluded).
Paths resolve relative to this file. Recorded command outputs (natijalar) and the sandbox copy are skipped
for the Cyrillic and apostrophe rules: they are real program output (1C column names, shell messages).
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
DAY4 = HERE.parent
SKIP_DIRS = {"_build", "fonts"}
RAW_OUTPUT = ("natijalar",)

DASHES = re.compile("[\u2014\u2013]")
CYR = re.compile("[Ѐ-ӿ]")
ASCII_OG = re.compile(r"(?<![A-Za-z])(?:[A-Za-z]*[oOgG])'(?=[a-z])")
POSSESSIVE = re.compile(r"[A-Za-z]*[oOgG][’']s\b")
TWO_SENT = re.compile(r"[a-z‘’»)\]][.!?] [A-Z«‘]")


def files():
    for p in sorted(DAY4.rglob("*")):
        if not p.is_file() or p.suffix not in (".md", ".html", ".js", ".sh", ".py", ".svg", ".txt"):
            continue
        rel = p.relative_to(DAY4)
        if rel.parts[0] in SKIP_DIRS and not (len(rel.parts) > 1 and rel.parts[1] in ("diagram", "sandbox", "tests")
                                               and p.suffix in (".py", ".svg")):
            continue
        if any(part in ("work", "out", "qa", "phone", "dist") for part in rel.parts):
            continue
        yield p, rel


def prose_lines(text: str):
    """Markdown lines outside fenced code, with inline code removed."""
    fence = False
    for n, line in enumerate(text.splitlines(), 1):
        if line.strip().startswith("```"):
            fence = not fence
            continue
        if fence:
            continue
        yield n, re.sub(r"`[^`]*`", "", line), line


def main() -> int:
    fails, warns = [], []
    for p, rel in files():
        text = p.read_text(encoding="utf-8")
        for n, line in enumerate(text.splitlines(), 1):
            if DASHES.search(line):
                fails.append(f"{rel}:{n}: dash character")
        raw = any(part in RAW_OUTPUT for part in rel.parts)
        if not raw and p.suffix in (".md", ".js", ".svg"):
            for n, line in enumerate(text.splitlines(), 1):
                if CYR.search(line):
                    fails.append(f"{rel}:{n}: Cyrillic letter: {line.strip()[:70]}")
        if p.suffix == ".md" and not raw:
            for n, prose, line in prose_lines(text):
                if ASCII_OG.search(prose):
                    fails.append(f"{rel}:{n}: ASCII apostrophe in Uzbek prose: {prose.strip()[:70]}")
                if POSSESSIVE.search(prose) and not prose.lstrip().startswith("|"):
                    fails.append(f"{rel}:{n}: English possessive after o/g: {prose.strip()[:70]}")
                if not line.lstrip().startswith(("|", "#", ">")) and TWO_SENT.search(prose):
                    warns.append(f"{rel}:{n}: two sentences on one line: {prose.strip()[:70]}")
        if p.suffix == ".js":
            # On-screen strings (not prompts, not notes) must use the typographic apostrophe.
            for n, line in enumerate(text.splitlines(), 1):
                s = line.strip()
                if s.startswith(("prompt:", "do:", "say:", "/*", "*", "//")):
                    continue
                for m in re.finditer(r"'((?:[^'\\]|\\.)*)'", s):
                    if ASCII_OG.search(m.group(1).replace("\\'", "'")):
                        fails.append(f"{rel}:{n}: ASCII apostrophe on a slide: {m.group(1)[:60]}")
    for w in warns:
        print("WARN", w)
    for f in fails:
        print("FAIL", f)
    print(f"{len(fails)} fail, {len(warns)} warn")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
