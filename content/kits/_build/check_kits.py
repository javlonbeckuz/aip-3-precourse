#!/usr/bin/env python3
"""
Language and consistency checks for the Praktikum 3.0 kits.

    python3 _build/check_kits.py        # exit code 1 if any FAIL

FAIL
  - an em dash anywhere in kits/ (text files)
  - Cyrillic letters in Uzbek Latin files
  - ASCII or modifier apostrophes in o‘ / g‘ and in tutuq words (ma’lumot), in Uzbek files
  - an English possessive ("Claude Code’s"), which the Uzbek apostrophe typesetter misreads
  - words the change-management review bans from staff-facing scripts
  - two sentences on one line in Markdown prose (tables, code blocks and HTML comments excepted)
  - a generated form template missing a field code from content/uz-latn.json
  - a skill template copy that differs from templates/kompaniya/
  - a SKILL.md with bad frontmatter, a name that does not match its folder, a template reference that does not exist,
    or more than 500 lines
  - an absolute home-directory path inside a build script
WARN
  - en dashes (allowed, but the house style is a plain hyphen)
"""
import json
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).resolve().parent
KITS = HERE.parent
CONTENT = KITS / "content"
TEMPLATES = KITS / "templates" / "kompaniya"
SKILLS = KITS / "skills"

EM_DASH, EN_DASH = chr(0x2014), chr(0x2013)   # built with chr so this file passes its own check
USERS = "/" + "Users" + "/"

fails: list[str] = []
warns: list[str] = []


def rel(p: pathlib.Path) -> str:
    return str(p.relative_to(KITS))


def text_files() -> list[pathlib.Path]:
    skip_dirs = {"qa", "tmp", "test-run", "baraka-run", "__pycache__"}
    out = []
    for p in KITS.rglob("*"):
        if not p.is_file() or any(part in skip_dirs for part in p.relative_to(KITS).parts):
            continue
        if p.suffix in {".md", ".json", ".py", ".html", ".css", ".js", ".sh"}:
            out.append(p)
    return sorted(out)


def uzbek_files() -> list[pathlib.Path]:
    out = [p for p in KITS.glob("KIT_*.md")]
    out += list(CONTENT.glob("*.json"))
    out += [p for p in TEMPLATES.rglob("*.md")]
    out += [p for p in SKILLS.rglob("*") if p.is_file() and p.suffix in {".md", ".html"}]
    out += [p for p in (HERE / "design").glob("*.html")]
    for extra in ("qollanma", "namunalar"):
        out += [p for p in (KITS / extra).rglob("*") if p.is_file() and p.suffix in {".md", ".html"}]
    return sorted(set(out))


def prose_lines(path: pathlib.Path):
    """Yield (line number, line) for Markdown prose: no frontmatter, fenced code, table rows or HTML comments."""
    in_code = False
    in_comment = False
    lines = path.read_text(encoding="utf-8").splitlines()
    front_end = 0
    if lines and lines[0] == "---":
        front_end = next((i for i, l in enumerate(lines[1:], 2) if l == "---"), 0)
    for n, line in enumerate(lines, 1):
        if n <= front_end:
            continue
        s = line.strip()
        if s.startswith("```"):
            in_code = not in_code
            continue
        if in_code:
            continue
        if "<!--" in s:
            in_comment = "-->" not in s
            continue
        if in_comment:
            in_comment = "-->" not in s
            continue
        if s.startswith("|"):
            continue
        yield n, line


# 1. dashes and Cyrillic -----------------------------------------------------------------------------
for p in text_files():
    t = p.read_text(encoding="utf-8")
    for n, line in enumerate(t.splitlines(), 1):
        if EM_DASH in line:
            fails.append(f"{rel(p)}:{n}: em dash")
        if EN_DASH in line:
            warns.append(f"{rel(p)}:{n}: en dash")
    if p.suffix == ".py" or p.suffix == ".sh":
        for n, line in enumerate(t.splitlines(), 1):
            if USERS in line:
                fails.append(f"{rel(p)}:{n}: absolute home path in a script")

CYR = re.compile(r"[Ѐ-ӿ]")
ASCII_OG = re.compile(r"(?<![A-Za-z])(?:[A-Za-z]*[oOgG])['ʻ`´](?=[a-z])")
ASCII_TUTUQ = re.compile(r"\b(ma|fe|ta|e|ba|qat|sun|mas|ya|san|da|me)['ʻ`´](?=[a-z])", re.I)
POSSESSIVE = re.compile(r"[A-Za-z]+[’']s\b")      # any English possessive ("Code’s"); Uzbek words never end in ’s
for p in uzbek_files():
    if p.suffix == ".py":
        continue
    for n, line in enumerate(p.read_text(encoding="utf-8").splitlines(), 1):
        # Cyrillic is allowed only inside a code span: identifiers copied from Russian-language exports (1C column names)
        if CYR.search(re.sub(r"`[^`]*`", "", line)):
            fails.append(f"{rel(p)}:{n}: Cyrillic letters")
        m = ASCII_OG.search(line)
        if m and "http" not in line:
            fails.append(f"{rel(p)}:{n}: ASCII apostrophe in o‘/g‘: {m.group(0)!r}")
        m = ASCII_TUTUQ.search(line)
        if m:
            fails.append(f"{rel(p)}:{n}: ASCII apostrophe in tutuq word: {m.group(0)!r}")
        m = POSSESSIVE.search(line)
        if m:
            fails.append(f"{rel(p)}:{n}: English possessive: {m.group(0)!r}")

# 2. staff-facing word list (review 05, change 8) -----------------------------------------------------
T = json.loads((CONTENT / "uz-latn.json").read_text(encoding="utf-8"))
BANNED = ["optimizatsiya", "qisqartir", "o‘rnini bosadi", "bo‘shatilgan soat", "bo‘shatilgan vaqt", "bo‘shagan",
          "nazoratchi", "sokrashch", "chopish"]
staff_texts = []
for K in T["kits"]:
    for S in K.get("scripts", []):
        staff_texts.append((f"{K['id']} script {S['label']}", " ".join(S["text"])))
    for F in K["forms"]:
        if F.get("consent"):
            staff_texts.append((f"{K['id']} consent", " ".join(F["consent"])))
for label, txt in staff_texts:
    low = txt.lower()
    for w in BANNED:
        if w in low:
            fails.append(f"content/uz-latn.json [{label}]: banned staff-facing word {w!r}")
    if re.search(r"\bsinov", low):
        fails.append(f"content/uz-latn.json [{label}]: 'sinov' in a staff-facing script (use loyiha or tajriba)")

# 3. one sentence per line in Markdown prose ----------------------------------------------------------
TWO = re.compile(r"[a-z0-9»)\]%][.!?] +[A-ZÀ-Ý«\[]")
md_files = [p for p in KITS.rglob("*.md") if not any(x in p.parts for x in ("qa", "tmp", "test-run", "baraka-run"))]
LIST_MARK = re.compile(r"^\s*(?:\d+\.|[-*]|>)\s+")
for p in sorted(md_files):
    for n, line in prose_lines(p):
        if line.lstrip().startswith("#"):
            continue
        # a transcript line is one speaker turn ("Suhbatdosh: ...", "Xodim: ..."): an utterance, like a quote
        if re.match(r"^\s*(Suhbatdosh|Xodim):", line):
            continue
        # quoted speech «...» may hold several sentences; it is one utterance
        if TWO.search(re.sub(r"«[^»]*»", "«»", LIST_MARK.sub("", line))):
            fails.append(f"{rel(p)}:{n}: two sentences on one line")

# 4. generated templates carry every field code --------------------------------------------------------
for i, K in enumerate(T["kits"], 1):
    for F in K["forms"]:
        p = TEMPLATES / K["folder"] / F["file"]
        if not p.exists():
            fails.append(f"missing template {rel(p)}")
            continue
        body = p.read_text(encoding="utf-8")
        codes = [c["code"] for c in F.get("cols", [])] + [q["code"] for q in F.get("items", [])] + \
                [f["code"] for f in F.get("fields", [])] + [c["code"] for c in F.get("choice", [])] + \
                [m["code"] for m in F.get("metrics", [])] + [c["code"] for c in F.get("costs", [])] + \
                [r["code"] for r in F.get("results", [])] + [c["code"] for c in F.get("log_cols", []) if c.get("code")]
        for c in codes:
            if not re.search(re.escape(c) + r"(?!\d)", body):
                fails.append(f"{rel(p)}: field code {c} missing")

# 5. skills: frontmatter, template copies, references ---------------------------------------------------
NAME = re.compile(r"^[a-z0-9-]{1,64}$")
for i, K in enumerate(T["kits"], 1):
    sk = SKILLS / f"kit{i}"
    md = sk / "SKILL.md"
    if not md.exists():
        fails.append(f"missing {rel(md)}")
        continue
    t = md.read_text(encoding="utf-8")
    if not t.startswith("---\n"):
        fails.append(f"{rel(md)}: frontmatter must start on line 1")
    fm = t.split("---", 2)[1] if t.count("---") >= 2 else ""
    name = re.search(r"^name:\s*(.+)$", fm, re.M)
    desc = re.search(r"^description:\s*(.+)$", fm, re.M)
    if not name or name.group(1).strip() != f"kit{i}" or not NAME.match(name.group(1).strip()):
        fails.append(f"{rel(md)}: name must be kit{i}")
    if not desc or not (20 <= len(desc.group(1)) <= 1024):
        fails.append(f"{rel(md)}: description missing or longer than 1024 characters")
    if t.count("\n") > 500:
        fails.append(f"{rel(md)}: more than 500 lines")
    src = TEMPLATES / K["folder"]
    dst = sk / "templates"
    src_files = {p.name: p.read_bytes() for p in src.iterdir() if p.is_file()}
    for extra in {3: ["kit4-people/test-set.md"]}.get(i, []):
        src_files[pathlib.Path(extra).name] = (TEMPLATES / extra).read_bytes()
    dst_files = {p.name: p.read_bytes() for p in dst.iterdir() if p.is_file()} if dst.exists() else {}
    if src_files != dst_files:
        fails.append(f"{rel(dst)}: differs from {rel(src)} (run make_kits.py)")
    for ref in re.findall(r"\$\{CLAUDE_SKILL_DIR\}/([\w./-]+)", t):
        if not (sk / ref).exists():
            fails.append(f"{rel(md)}: reference to missing ${{CLAUDE_SKILL_DIR}}/{ref}")
    for line in t.splitlines():
        if "Andozalar" not in line:
            continue
        for ref in re.findall(r"`(?:\$\{CLAUDE_SKILL_DIR\}/templates/)?([\w-]+\.md)`", line):
            if ref not in dst_files:
                fails.append(f"{rel(md)}: lists template {ref} which is not in {rel(dst)}")

# Baraka worked example = course canon ------------------------------------------------------------------
# Kit 3-5 files in namunalar/baraka-office are copies of canonical course files (make_canon_snapshot.py).
# Other packages keep editing theirs, so a stale copy is a FAIL: rerun make_canon_snapshot.py and make_examples.py.
sys.path.insert(0, str(HERE))
import make_canon_snapshot as canon  # noqa: E402

NAMUNA = KITS / "namunalar" / "baraka-office"
for rel_path, src_rel in canon.CANON.items():
    src = canon.ROOT / src_rel
    out = NAMUNA / rel_path
    if not src.exists() or not out.exists():
        fails.append(f"canon: missing {src_rel if not src.exists() else rel(out)}")
        continue
    expected = src.read_text(encoding="utf-8")
    for old, new, _why in canon.EDITS.get(rel_path, []):
        if expected.count(old) != 1:
            fails.append(f"canon: edit no longer applies to {src_rel}: {old[:60]}")
        expected = expected.replace(old, new)
    actual = out.read_text(encoding="utf-8")
    if "\n## Nega shunday yozildi\n" not in expected:
        actual = actual.split("\n\n## Nega shunday yozildi\n")[0]
    if actual.rstrip() != expected.rstrip():
        fails.append(f"canon: {rel(out)} differs from {src_rel} (rerun make_canon_snapshot.py and make_examples.py)")
for key, want in {"B.12": "2 351 701", "B.14": "680 000", "soatbay": "35 700"}.items():
    if want not in (NAMUNA / "kit5-pilot" / "numbers.md").read_text(encoding="utf-8"):
        fails.append(f"canon: numbers.md has no {key} {want}")

# report ------------------------------------------------------------------------------------------------
for w in warns:
    print("WARN", w)
for f in fails:
    print("FAIL", f)
print(f"{len(fails)} FAIL, {len(warns)} WARN")
sys.exit(1 if fails else 0)
