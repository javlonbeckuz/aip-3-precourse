"""Build snapshots/namuna-canon: the Baraka company folder at the end of the course, aligned to BARAKA-CANON.md.

Kit 1 and Kit 2 come from the namuna-final snapshot: they are the course canon and other packages copy them.
Kit 3 to Kit 5 come from the course's canonical files (pilot-template, Day 3, Day 4, Day 6), copied byte for byte,
except the few edits listed in EDITS (each with its reason, also reported in example_manifest.json).
Files written by the kits agent for this snapshot live in _build/namuna-canon-src/.

Run: python3 make_canon_snapshot.py, then python3 make_examples.py.
"""
import pathlib
import shutil

HERE = pathlib.Path(__file__).resolve().parent
KITS = HERE.parent
ROOT = KITS.parent
SNAP = HERE / "baraka-run" / "snapshots"
SRC = SNAP / "namuna-final"
DST = SNAP / "namuna-canon"
OWN = HERE / "namuna-canon-src"

# company-folder path -> canonical source, relative to the project root (read only)
CANON = {
    "kit3-agent/form-a-steps.md": "day-3/exercises/namuna/kompaniya/kit3-agent/form-a-steps.md",
    "kit3-agent/form-b-agent.md": "day-3/exercises/namuna/uy-vazifasi/form-b-agent-imzolangan.md",
    "kit3-agent/instructions.md": "pilot-template/agent/instructions.md",
    "kit4-people/test-set.md": "day-3/exercises/namuna/uy-vazifasi/test-set.md",
    "kit4-people/madina-form-b.md": "day-4/exercises/namuna/kompaniya/kit4-people/madina-form-b.md",
    "kit4-people/form-a-skills-map.md": "day-4/exercises/namuna/kompaniya/kit4-people/form-a-skills-map.md",
    "kit5-pilot/baseline.md": "day-2/company-folder-starter/baraka-office/kompaniya/kit5-pilot/baseline.md",
    "kit5-pilot/plan.md": "day-6/exercises/namuna/kompaniya/kit5-pilot/plan.md",
    "kit5-pilot/numbers.md": "day-6/exercises/namuna/kompaniya/kit5-pilot/numbers.md",
}

# Kit 4 Form B files from the kits agent's own run: replaced by Madina's canonical Form B
DROP = ["kit4-people/malika-form-b.md", "kit4-people/zarina-form-b.md"]

OWN_FILES = ["kit5-pilot/announcement.md"]


# (old, new, reason): every old string must occur exactly once
EDITS = {
    "CLAUDE.md": [
        ("- O‘rtacha soatbay haq: 22 600 so‘m (menejer okladi 4 500 000 / 199 soat; To‘plam 5 dagi hisoblar uchun)",
         "- O‘rtacha soatbay haq: 35 700 so‘m (To‘plam 5 dagi hisoblar uchun)\n  - Oklad / 200 soat (haftasiga 46 soat × 4,3): Madina 5 000 000 / 200 = 25 000; Malika 4 500 000 / 200 = 22 500; Jamshid aka 12 000 000 / 200 = 60 000.\n  - Narx va qoldiq savollariga kim javob berishiga qarab vaznli o‘rtacha (kuniga Madina 12, Malika 5, Jamshid aka 8 ta; egasining bahosi): (12 × 25 000 + 5 × 22 500 + 8 × 60 000) / 25 = 892 500 / 25 = 35 700.",
         "canon hourly rate 35 700 (BARAKA-CANON.md, Kit 5 numbers)"),
    ],
    "kit3-agent/form-b-agent.md": [
        ("Darsdagi versiya: `../kompaniya/kit3-agent/form-b-agent.md`.",
         "Darsdagi (imzosiz) versiya 3-dars materiallarida.",
         "the Day 3 relative link does not exist in this folder"),
        ("Tasdiqladi: Jamshid Karimov, savdo bo‘limi rahbari (ROP). Xodimlar bilan",
         "Tasdiqladi: Jamshid Karimov, savdo bo‘limi rahbari (ROP).\nXodimlar bilan",
         "one sentence per line (house style); text unchanged"),
    ],
    "kit4-people/test-set.md": [
        ("; sinov nusxasidagi natija: `../natijalar/05-eval.txt`", "",
         "the Day 3 relative link does not exist in this folder"),
    ],
    "kit5-pilot/plan.md": [
        ("Bu fayl 4-dars namunasining nusxasi (`day-4/exercises/namuna/kompaniya/kit5-pilot/plan.md`); ",
         "Bu fayl 4-darsda yozilgan; ",
         "course-package path replaced with a plain statement"),
        ("(`../30-kunlik-reja.md`)",
         "(6-darsdagi 30 kunlik reja)",
         "the 30-day plan is a Day 6 exercise file, not part of this folder"),
    ],
    "kit5-pilot/briefing.md": [
        ("| Malikadan olinadigan vazifa | kunlik hisobot | egasining so‘zi |",
         "| Malikadan olinadigan vazifa | ertalabki amoCRM ko‘rib chiqish (kuniga 20 daqiqa, To‘plam 1, 1-vazifa) | egasining so‘zi |",
         "a task that exists in Malika's canonical Kit 1 Form B"),
        ("| Qo‘shimcha haq | haftasiga 200 000 so‘m, natijadan qat’i nazar | egasining so‘zi |",
         "| Qo‘shimcha haq | yo‘q: o‘rniga bitta vazifa olinadi (yuqoridagi qator) | egasining so‘zi |",
         "canon B.12 has no project-lead pay; a promised pay outside the costs would be a hidden cost"),
        ("Bu davrda kunlik hisobotni sizdan olaman, shunda bu qo‘shimcha ish bo‘lmaydi; qo‘shimcha mehnat uchun natijadan qat’i nazar haftasiga 200 000 so‘m to‘layman.",
         "Bu davrda ertalabki amoCRM ko‘rib chiqishini sizdan olaman, shunda loyiha qo‘shimcha ish bo‘lib qolmaydi.",
         "a task from Malika's canonical Kit 1 Form B; no extra pay (see the row above)"),
    ],
}


def main() -> None:
    if DST.exists():
        shutil.rmtree(DST)
    shutil.copytree(SRC, DST)
    for rel in DROP:
        (DST / rel).unlink()
    for rel, src in CANON.items():
        shutil.copy2(ROOT / src, DST / rel)
    for rel in OWN_FILES:
        shutil.copy2(OWN / rel, DST / rel)
    for rel, edits in EDITS.items():
        path = DST / rel
        text = path.read_text(encoding="utf-8")
        for old, new, _why in edits:
            n = text.count(old)
            if n != 1:
                raise SystemExit(f"{rel}: expected 1 match, found {n}: {old[:70]}")
            text = text.replace(old, new)
        path.write_text(text, encoding="utf-8")
    print(f"namuna-canon: {sum(1 for p in DST.rglob('*') if p.is_file())} files")


if __name__ == "__main__":
    main()
