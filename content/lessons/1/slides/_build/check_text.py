"""Text checks for the Day 1 package (overnight RULES.md items 4 and the Uzbek apostrophe rule).

Run:  python3 day-1/_build/check_text.py
Fails (exit 1) on:
  - any em dash (U+2014) in a file we wrote;
  - an English word ending in o or g followed by an apostrophe in Uzbek text (for example "Pro’dan"),
    which the Uzbek apostrophe typesetter would turn into o‘ or g‘.
Warns on Markdown lines that hold two or more full sentences (one-sentence-per-line rule).
Paths resolve relative to this file. Third-party data (node_modules, tokenizer cache, vendor bundles) is skipped.
"""
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).resolve().parent
DAY1 = HERE.parent
SKIP_PARTS = {"node_modules", "cache", "qa", "vendor"}
SKIP_FILES = {"tokenizer-offline.html", "expected.json", "package-lock.json", "measurements.json"}
APOS_SKIP = {"studio-quiz-gemini-notebook.md"}  # verbatim Gemini Notebook export, ASCII apostrophes kept as produced
EXT = {".md", ".html", ".js", ".mjs", ".css", ".json", ".py", ".csv", ".txt"}
POSSESSIVE = re.compile(r"\b[A-Z][A-Za-z0-9.\-]*[ogOG][’']\w")
# sentence end followed by a capital letter on the same line (rough heuristic, prose only)
TWO_SENTENCES = re.compile(r"[a-z‘’)»][.!?] +[A-ZÀ-ÖØ-Þ«]")


def files():
    for p in DAY1.rglob("*"):
        if p.is_file() and p.suffix in EXT and not (set(p.relative_to(DAY1).parts) & SKIP_PARTS) and p.name not in SKIP_FILES:
            yield p


def main():
    bad = 0
    warn = 0
    for p in sorted(files()):
        rel = p.relative_to(DAY1).as_posix()
        text = p.read_text(encoding="utf-8", errors="replace")
        in_code = False
        for n, line in enumerate(text.splitlines(), 1):
            if line.lstrip().startswith("```"):
                in_code = not in_code
            if chr(0x2014) in line:
                print(f"EM DASH  {rel}:{n}: {line.strip()[:90]}")
                bad += 1
            if p.suffix in {".md", ".html", ".js"} and p.name not in APOS_SKIP:
                for m in POSSESSIVE.finditer(line):
                    word = m.group(0)
                    if word.startswith(("O‘", "G‘", "O'", "G'")):
                        continue
                    print(f"APOSTROPHE {rel}:{n}: {word!r} in {line.strip()[:80]}")
                    bad += 1
            if p.suffix == ".md" and not in_code and '"' not in line and '«' not in line and not line.lstrip().startswith(("|", "#", "-", ">", "```", "*")) and TWO_SENTENCES.search(line):
                warn += 1
                if "--verbose" in sys.argv:
                    print(f"two sentences? {rel}:{n}: {line.strip()[:90]}")
    print(f"{bad} problem(s), {warn} two-sentence line warning(s) (use --verbose to list)")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
