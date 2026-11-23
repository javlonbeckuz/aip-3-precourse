"""Checks for the Day 2 package. Run: python3 day-2/_build/tests/test_day2.py
Paths resolve relative to this file. No network, no Claude calls.
"""
import importlib.util
import json
import re
import subprocess
import sys
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
BUILD = HERE.parent
DAY2 = BUILD.parent
ROOT = DAY2.parent
STARTER = DAY2 / "company-folder-starter"
BARAKA = STARTER / "baraka-office" / "kompaniya"

# Files written by Claude Code or copied from other packages keep their own typography.
UZ_EXEMPT = [
    "_build/", "deck/assets/fonts", "demos/expected/", "company-folder-starter/yomon-namuna/CLAUDE.md",
    "baraka-office/kompaniya/hujjatlar/", "company-folder-starter/skills/", "company-folder-starter/kompaniya/kit",
    "baraka-office/kompaniya/kit3-agent/", "baraka-office/kompaniya/kit4-people/",
    "baraka-office/kompaniya/kit5-pilot/announcement.md", "baraka-office/kompaniya/kit5-pilot/briefing.md",
    "baraka-office/kompaniya/kit5-pilot/numbers.md", "baraka-office/kompaniya/kit5-pilot/plan.md",
]
TEXT_EXT = {".md", ".html", ".js", ".css", ".py", ".sh", ".json", ".txt"}


def text_files(exempt=()):
    for p in sorted(DAY2.rglob("*")):
        if not p.is_file() or p.suffix not in TEXT_EXT:
            continue
        rel = p.relative_to(DAY2).as_posix()
        if any(rel.startswith(e) or e in rel for e in exempt):
            continue
        yield p, rel


def code_free(text):
    """Drop fenced shell blocks and inline code, which may hold ASCII on purpose."""
    text = re.sub(r"```(?:bash|sh|powershell)\n.*?```", "", text, flags=re.S)
    return re.sub(r"`[^`\n]*`", "", text)


def kit_prompt(kit_md):
    s = kit_md.read_text(encoding="utf-8")
    part = s.split("## AI chat uchun so‘rov", 1)[1]
    return re.search(r"```text\n(.*?)```", part, re.S).group(1).rstrip()


class Day2(unittest.TestCase):
    def test_no_em_dash_anywhere(self):
        bad = [rel for p, rel in text_files() if "\u2014" in p.read_text(encoding="utf-8", errors="ignore")]
        self.assertEqual(bad, [], "em dash found")

    def test_uzbek_apostrophes(self):
        """o‘ and g‘ use U+2018 in our Uzbek text, never an ASCII apostrophe."""
        bad = []
        for p, rel in text_files(UZ_EXEMPT):
            if p.suffix not in {".md", ".html", ".js"}:
                continue
            t = code_free(p.read_text(encoding="utf-8"))
            for m in re.finditer(r"\b\w*[oOgG]'[a-z]\w*", t):
                bad.append(f"{rel}: {m.group(0)}")
        self.assertEqual(bad[:20], [], f"{len(bad)} ASCII o'/g' found")

    def test_no_english_possessive_after_o_or_g(self):
        bad = []
        for p, rel in text_files(UZ_EXEMPT):
            if p.suffix not in {".md", ".html", ".js"} or rel.endswith(("README.md", "instructor-run-sheet.md")) or rel.startswith("demos/demo-"):
                continue  # English instructor files are exempt
            for m in re.finditer(r"\w*[og][’']s\b", p.read_text(encoding="utf-8")):
                bad.append(f"{rel}: {m.group(0)}")
        self.assertEqual(bad, [])

    def test_baraka_arithmetic(self):
        r = subprocess.run([sys.executable, str(BUILD / "make_baraka.py")], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        self.assertIn("OK: copied the kits Baraka", r.stdout)

    def test_matrix_json_matches_form_a(self):
        html = (BARAKA / "kit2-scoring" / "matrix.html").read_text(encoding="utf-8")
        data = json.loads(re.search(r'<script id="data" type="application/json">(.*?)</script>', html, re.S).group(1))
        form_a = (BARAKA / "kit2-scoring" / "form-a-scoring.md").read_text(encoding="utf-8")
        for proc in data["processes"]:
            row = re.search(rf"^\| {proc['n']} \| .*?\| (\d+) \(\d\+\d\+\d\)[^|]*\| (\d+) \(\d\+\d\+\d\)[^|]*\|$", form_a, re.M)
            self.assertIsNotNone(row, proc)
            self.assertEqual((int(row.group(1)), int(row.group(2))), (proc["value"], proc["ease"]))

    def test_kit1_prompt_verbatim_in_prompt_pack(self):
        k = kit_prompt(ROOT / "kits" / "KIT_01_Ish_qayerga_ketyapti_UZ_LATN.md")
        self.assertIn(k, (DAY2 / "prompt-pack.md").read_text(encoding="utf-8"))

    def test_baraka_matches_kits_example(self):
        """Kit 1, Kit 2 and the baseline are the kits package's Baraka files (one story across the course)."""
        src = ROOT / "kits" / "namunalar" / "baraka-office"
        pairs = [(f, BARAKA / sub / f.name) for sub in ["kit1-interviews", "kit2-scoring"] for f in (src / sub).glob("*") if f.is_file()]
        for f, g in pairs:
            self.assertTrue(g.exists(), g)
            self.assertEqual(f.read_text(encoding="utf-8").replace("\u2014", "-"), g.read_text(encoding="utf-8"), f"stale copy {g}; run make_baraka.py")
        self.assertFalse((BARAKA / "kit1-interviews" / "madina-form-b.md").exists())
        base = (BARAKA / "kit5-pilot" / "baseline.md").read_text(encoding="utf-8")
        for row in ["| B.1 Bajarilgan so‘rovlar | 120 |", "| B.2 O‘rtacha vaqt, daqiqa | 6 |", "| B.3 Xato javoblar | 9 |",
                    "| B.4 Takroriy so‘rovlar | 15 |", "| B.5 To‘liq hal qilingan so‘rovlar | 100 |", "| B.8 Mijoz shikoyatlari | 2 |"]:
            self.assertIn(row, base)
        self.assertIn("B.7 (tekshirish soati) va B.14 (topilgan pul) agentgacha 0", base)
        self.assertNotIn("22 600", base)
        self.assertIn("## Nega shunday yozildi", base)  # Day 2 owns the baseline, notes included (kits copies it)

    def test_baraka_skill_is_kit1_prompt(self):
        k = kit_prompt(ROOT / "kits" / "KIT_01_Ish_qayerga_ketyapti_UZ_LATN.md")
        first = "Quyida bir xodim bilan 20-30 daqiqalik suhbat transkripti yoki suhbatchining qo‘lda yozgan qaydlari berilgan."
        skill = (BARAKA / ".claude" / "skills" / "suhbat-tahlili" / "SKILL.md").read_text(encoding="utf-8")
        for line in k.splitlines():
            if line.strip() and line.strip() != first:
                self.assertIn(line, skill)
        self.assertTrue(skill.startswith("---\nname: suhbat-tahlili\ndescription: "))

    def test_exercise_prompts_in_prompt_pack(self):
        pack = re.sub(r"\s+", " ", (DAY2 / "prompt-pack.md").read_text(encoding="utf-8"))
        missing = []
        for ex in sorted((DAY2 / "exercises").glob("0*.md")):
            for b in re.findall(r"```text\n(.*?)```", ex.read_text(encoding="utf-8"), re.S):
                for line in b.splitlines():
                    line = line.strip()
                    if not line or line.startswith("[") or "Hurmatli" in line or "Sen eng aqlli" in line:
                        continue
                    if re.sub(r"\s+", " ", line) not in pack and "Baraka" not in ex.read_text(encoding="utf-8")[:0]:
                        missing.append(f"{ex.name}: {line[:70]}")
        # Baraka-only check questions and bad examples are allowed to live only in the exercise
        allowed = ("Faqat CLAUDE.md ga tayanib javob ber: mijozga 3 kunda", "Hurmatli", "Sen eng aqlli", "Telegram bot kerak. Mijozlarga javob bersin")
        missing = [m for m in missing if not any(a in m for a in allowed)]
        self.assertEqual(missing, [])

    def test_deck_prompts_match_handouts(self):
        r = subprocess.run([sys.executable, str(BUILD / "deck" / "check_prompts.py")], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stdout)

    def test_starter_copies_match_kits(self):
        kits = ROOT / "kits"
        for n in range(1, 6):
            for f in (kits / "skills" / f"kit{n}").rglob("*"):
                if f.is_file() and f.name != ".DS_Store":
                    g = STARTER / "skills" / f"kit{n}" / f.relative_to(kits / "skills" / f"kit{n}")
                    self.assertTrue(g.exists(), g)
                    self.assertEqual(f.read_bytes(), g.read_bytes(), f"stale copy {g}; run make_starter.py")
        for f in (kits / "templates" / "kompaniya").rglob("*.md"):
            if f.name == "CLAUDE.md":
                continue
            g = STARTER / "kompaniya" / f.relative_to(kits / "templates" / "kompaniya")
            self.assertEqual(f.read_bytes(), g.read_bytes(), f"stale copy {g}; run make_starter.py")

    def test_claude_md_keeps_kits_section(self):
        def kitlar(p):
            return p.read_text(encoding="utf-8").split("## Kitlar", 1)[1]
        ref = kitlar(ROOT / "kits" / "templates" / "kompaniya" / "CLAUDE.md").strip()
        for p in [STARTER / "kompaniya" / "CLAUDE.md", BARAKA / "CLAUDE.md"]:
            got = re.sub(r"<!--.*?-->\n\n", "", kitlar(p), flags=re.S).strip()
            self.assertEqual(got, ref, p)

    def test_claude_md_short_and_secret_free(self):
        for p in [STARTER / "kompaniya" / "CLAUDE.md", BARAKA / "CLAUDE.md", STARTER / "src" / "CLAUDE.md"]:
            t = p.read_text(encoding="utf-8")
            self.assertLess(len(t.splitlines()), 200, p)
            self.assertIsNone(re.search(r"\d{8,10}:[A-Za-z0-9_-]{20,}|sk-[A-Za-z0-9]{10,}|parol\s*:", t, re.I), p)

    def test_bad_example_is_bad(self):
        t = (STARTER / "yomon-namuna" / "CLAUDE.md").read_text(encoding="utf-8")
        for needle in ["parol", "token", "3 kun", "savol berma", "tozalab"]:
            self.assertIn(needle, t.lower())

    def test_run_sheet_minutes_and_slides(self):
        s = (DAY2 / "instructor-run-sheet.md").read_text(encoding="utf-8")
        rows = re.findall(r"^\| (\d):(\d\d)-(\d):(\d\d) \| (\d+) \|", s, re.M)
        total, prev_end = 0, 0
        for h1, m1, h2, m2, mins in rows:
            start, end = int(h1) * 60 + int(m1), int(h2) * 60 + int(m2)
            self.assertEqual(start, prev_end, f"gap or overlap at {h1}:{m1}")
            self.assertEqual(end - start, int(mins), f"minutes column wrong at {h1}:{m1}")
            total += int(mins)
            prev_end = end
        self.assertEqual(total, 180)
        js = (DAY2 / "deck" / "assets" / "slides_data.js").read_text(encoding="utf-8")
        n_slides = len(re.findall(r"^\{\n  seg: ", js, re.M))
        self.assertEqual(n_slides, 47)
        cited = [int(x) for x in re.findall(r"\| (\d{1,2})(?:-(\d{1,2}))? \| `", s) for x in x if x]
        self.assertTrue(cited and max(cited) <= n_slides)

    def test_zip_holds_what_participants_are_told_to_open(self):
        """Unzip the group-chat zip and resolve every zip-relative path the Uzbek files mention."""
        import tempfile
        import zipfile
        z = BUILD / "dist" / "2-dars-kompaniya-papkasi.zip"
        self.assertTrue(z.exists(), "run make_starter.py")
        prefixes = ("baraka-office/", "yomon-namuna/", "natijalar/", "sahifalar/", "skills/kit", "prompt-pack.md", "kompaniya.qollanma.md")
        sources = sorted((DAY2 / "exercises").glob("0*.md")) + [
            DAY2 / "homework.md", DAY2 / "prompt-pack.md", DAY2 / "handouts" / "src" / "lugat.md",
            STARTER / "kompaniya.qollanma.md", STARTER / "yomon-namuna" / "nima-xato.md",
        ]
        with tempfile.TemporaryDirectory() as tmp:
            zipfile.ZipFile(z).extractall(tmp)
            top = Path(tmp) / "praktikum"
            self.assertFalse((top / "kompaniya" / "app").exists(), "no app/ placeholder (playtest D3-10)")
            missing = []
            for src in sources:
                for ref in re.findall(r"`([^`\s]+)`", src.read_text(encoding="utf-8")):
                    if ref.startswith(prefixes) and "<" not in ref and "[" not in ref:
                        if not (top / ref.rstrip("/")).exists():
                            missing.append(f"{src.name}: {ref}")
            self.assertEqual(missing, [])
            for page in (top / "sahifalar").glob("*.html"):
                html = page.read_text(encoding="utf-8")
                self.assertNotIn('<link rel="stylesheet"', html, page.name)
                self.assertIsNone(re.search(r'src="(?!data:)[^"]+\.(png|jpg|svg)"', html), page.name)

    def test_paths_in_readme_exist(self):
        readme = (DAY2 / "README.md").read_text(encoding="utf-8")
        missing = []
        for m in re.findall(r"`((?:deck|demos|exercises|handouts|company-folder-starter|_build|homework|prompt-pack|instructor)[^`*]*?)`", readme):
            if "<" in m or " " in m:
                continue
            if not (DAY2 / m).exists():
                missing.append(m)
        self.assertEqual(missing, [])


if __name__ == "__main__":
    unittest.main(verbosity=1)
