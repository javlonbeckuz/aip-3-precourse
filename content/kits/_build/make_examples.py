#!/usr/bin/env python3
"""
Package the real Baraka Office skill runs as worked examples.

    python3 _build/make_examples.py

Reads   _build/baraka-run/<log>.json            headless Claude Code logs, one per turn (run_skill_test.sh)
        _build/baraka-run/snapshots/<name>/     the company folder copied before and after each kit
        _build/example_manifest.json            which turns, prompts, inputs and outputs belong to each kit
Writes  skills/kitN/example/README.md           how to reproduce the example
        skills/kitN/example/suhbat.md           every prompt typed and Claude's full reply, turn by turn
        skills/kitN/example/input/...           the files the skill read
        skills/kitN/example/output/...          the files the skill wrote
        namunalar/baraka-office/...             the final company folder, every template filled (notes are added by make_namunalar.py)

Text is copied verbatim except for house style: ASCII apostrophes in o‘ g‘ and tutuq words become ‘ and ’,
and em or en dashes become "-". Nothing else is edited.
"""
import json
import pathlib
import re
import shutil

HERE = pathlib.Path(__file__).resolve().parent
KITS = HERE.parent
RUN = HERE / "baraka-run"
SNAP = RUN / "snapshots"
MANIFEST = HERE / "example_manifest.json"

OG = re.compile(r"(?<=[oOgG])['ʻ`´](?=[a-zA-Z])")
TUTUQ = re.compile(r"(?<=[a-zA-Z])['ʻ`´](?=[a-zA-Z])")


SENT = re.compile(r"(?:(?<=[.!?])|(?<=[.!?][»)*]))\s+(?=[A-ZÀ-Ý«\[(0-9*`])")
ITEM = re.compile(r"^(\s*(?:[-*]|\d+\.)\s+)")


INITIAL = re.compile(r"(?:^|[\s(])(?:[A-ZÀ-Ý]\.)+$")


def merge_initials(parts: list[str]) -> list[str]:
    """A part that ends in an initial ("M.", "S.A.") is not a sentence end: glue it to the next part."""
    out: list[str] = []
    for part in parts:
        if out and INITIAL.search(out[-1]):
            out[-1] = out[-1] + " " + part
        else:
            out.append(part)
    return out


def one_sentence_per_line(text: str) -> str:
    """Prose lines get one sentence per physical line (house rule); tables, code, headings and quotes stay as they are.
    A sentence that follows a list marker continues on an indented line, so the list renders the same."""
    out, in_code = [], False
    for line in text.split("\n"):
        s = line.strip()
        if s.startswith("```"):
            in_code = not in_code
        if in_code or s.startswith(("```", "|", "#", ">")) or not s or re.match(r"^\s*(Suhbatdosh|Xodim):", line):
            out.append(line)
            continue
        m = ITEM.match(line)
        lead = m.group(1) if m else line[: len(line) - len(line.lstrip())]
        body = line[len(lead):]
        parts = merge_initials(SENT.split(body))
        if len(parts) == 1:
            out.append(line)
            continue
        pad = " " * len(lead)
        out.append(lead + parts[0])
        out += [pad + x for x in parts[1:]]
    return "\n".join(out)


def house_style(text: str, prose: bool = True) -> str:
    text = OG.sub("‘", text)
    text = TUTUQ.sub("’", text)
    text = text.replace(chr(0x2014), "-").replace(chr(0x2013), "-")
    # a Russian column name quoted from the 1C export is a data identifier: show it as code
    text = re.sub(r"«([\u0400-\u04FF][\u0400-\u04FF ]*)»", r"`\1`", text)
    return one_sentence_per_line(text) if prose else text


def copy_text(src: pathlib.Path, dst: pathlib.Path) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    if src.suffix in {".md", ".html", ".txt"}:
        # sentence splitting is for Markdown prose only: in HTML it would break strings inside the page script
        dst.write_text(house_style(src.read_text(encoding="utf-8"), prose=src.suffix == ".md"), encoding="utf-8")
    else:
        # data exports (CSV, the 1C file in Windows-1251) are copied byte for byte
        shutil.copy2(src, dst)


def result_of(log: str) -> str:
    data = json.loads((RUN / f"{log}.json").read_text(encoding="utf-8"))
    return house_style(data.get("result", "").strip())


def model_of(log: str) -> str:
    data = json.loads((RUN / f"{log}.json").read_text(encoding="utf-8"))
    return ", ".join((data.get("modelUsage") or {}).keys())


def build_kit(n: int, spec: dict) -> None:
    out = KITS / "skills" / f"kit{n}" / "example"
    if out.exists():
        shutil.rmtree(out)
    out.mkdir(parents=True)
    before = SNAP / spec["before"]
    after = SNAP / spec["after"]
    for rel in spec["inputs"]:
        src = before / rel
        if rel == "CLAUDE.md" and spec.get("claude_md_from"):
            # only the hourly-rate line differs (course canon 35 700); this skill does not use it
            src = SNAP / spec["claude_md_from"] / rel
        copy_text(src, out / "input" / rel)
    for rel in spec["outputs"]:
        copy_text(after / rel, out / "output" / rel)
    L = [f"# /kit{n} namunasi: «Baraka Office» MChJ", "",
         f"Sana (kurs taqvimi bo‘yicha): {spec['today']}.",
         f"Model: {model_of(spec['sessions'][0]['turns'][0][0])}.",
         "Quyida egasi yozgan har bir xabar va Claude Code’ning to‘liq javobi, o‘zgartirilmagan holda (faqat apostrof va chiziqcha uslubi bir xil qilingan).", ""]
    for s in spec["sessions"]:
        L += [f"## {s['title']}", ""]
        for k, (log, prompt) in enumerate(s["turns"], 1):
            L += [f"### {k}-xabar: siz yozasiz", "", "```text", prompt, "```", "", "### Claude javobi", "", result_of(log), ""]
    (out / "suhbat.md").write_text("\n".join(L).rstrip() + "\n", encoding="utf-8")
    R = [f"# /kit{n} namunasi: qanday takrorlash", ""] + ([spec["top_note"], ""] if spec.get("top_note") else []) + [
         "Bu papka /kit" + str(n) + " ni «Baraka Office» kompaniya papkasida haqiqiy ishga tushirish natijasi.", "",
         "1. `input/` ichidagi fayllarni kompaniya papkangizga xuddi shu yo‘llar bilan nusxalang (yoki o‘z fayllaringizni qo‘ying).",
         "2. Claude Code’ni kompaniya papkasida oching.",
         "3. `suhbat.md` dagi xabarlarni ketma-ket yozing: birinchisi buyruq, keyingilari Claude savollariga javob.",
         "4. Natija `output/` dagi fayllarga o‘xshash bo‘lishi kerak; so‘zlar boshqacha bo‘lishi mumkin, tuzilma va hisoblar bir xil bo‘ladi.", "",
         "## Fayllar", "",
         "- `suhbat.md`: siz yozadigan xabarlar va Claude javoblari, to‘liq.",
         "- `input/`: skill o‘qigan fayllar."] + [f"  - `input/{x}`" for x in spec["inputs"]] + [
         "- `output/`: skill yozgan yoki o‘zgartirgan fayllar."] + [f"  - `output/{x}`" for x in spec["outputs"]] + [""]
    if spec.get("note"):
        R += [spec["note"], ""]
    (out / "README.md").write_text(house_style("\n".join(R).rstrip()) + "\n", encoding="utf-8")


NOTES = HERE / "namuna-notes"


def build_namunalar(spec: dict) -> None:
    """Copy the final company folder and append the hand-written margin notes (_build/namuna-notes/<path>.md)
    as a closing section «Nega shunday yozildi», so a rebuild never loses them.
    Files in spec["verbatim"] are canonical course files: copied byte for byte, never restyled.
    Files in spec["notes_separate"] are read whole by the bot, so their notes go to a separate file."""
    final = spec["from"]
    verbatim = set(spec.get("verbatim", []))
    separate = spec.get("notes_separate", {})
    dst = KITS / "namunalar" / "baraka-office"
    if dst.exists():
        shutil.rmtree(dst)
    for rel in spec["files"]:
        src = SNAP / final / rel
        if rel in verbatim:
            (dst / rel).parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dst / rel)
        else:
            copy_text(src, dst / rel)
        note = NOTES / (rel + ".md" if not rel.endswith(".md") else rel)
        if not (note.exists() and rel.endswith(".md")):
            continue
        notes = house_style(note.read_text(encoding="utf-8").strip())
        if rel in separate:
            title = f"# `{rel}` haqida izohlar\n\nBu izohlar alohida faylda, chunki `{rel}` ni bot butunlay o‘qiydi.\n\n## Nega shunday yozildi\n\n"
            (dst / separate[rel]).write_text(title + notes + "\n", encoding="utf-8")
        else:
            body = dst / rel
            text = body.read_text(encoding="utf-8").rstrip()
            if "\n## Nega shunday yozildi\n" in text:
                continue  # a canonical copy that already carries these notes (another package copied them in)
            body.write_text(text + "\n\n## Nega shunday yozildi\n\n" + notes + "\n", encoding="utf-8")


def main() -> None:
    M = json.loads(MANIFEST.read_text(encoding="utf-8"))
    for n, spec in M["kits"].items():
        if (SNAP / spec["after"]).exists():
            build_kit(int(n), spec)
            print(f"kit{n}: example written")
        else:
            print(f"kit{n}: snapshot {spec['after']} missing, skipped")
    if M.get("namunalar") and (SNAP / M["namunalar"]["from"]).exists():
        build_namunalar(M["namunalar"])
        print(f"namunalar: {len(M['namunalar']['files'])} files")


if __name__ == "__main__":
    main()
