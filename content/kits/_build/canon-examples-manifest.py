"""Point the /kit4 and /kit5 examples in example_manifest.json at the canon reruns (baraka-run/canon-k4, canon-k5)."""
import json
import pathlib

HERE = pathlib.Path(__file__).resolve().parent
P = HERE / "example_manifest.json"
K4 = HERE / "canon-k4-prompts"
K5 = HERE / "canon-k5-prompts"


def read(p: pathlib.Path) -> str:
    return p.read_text(encoding="utf-8").strip()


M = json.loads(P.read_text(encoding="utf-8"))
M["kits"]["4"] = {
    "today": "2026-12-13 (4-dars)",
    "before": "canon-before-kit4",
    "after": "canon-after-kit4",
    "inputs": ["CLAUDE.md", "kit1-interviews/malika-form-b.md", "kit1-interviews/zarina-form-b.md", "kit1-interviews/jamshid-form-b.md",
               "kit3-agent/form-a-steps.md", "kit3-agent/form-b-agent.md", "kit3-agent/instructions.md", "kit4-people/test-set.md"],
    "outputs": ["kit4-people/form-a-skills-map.md", "kit4-people/madina-form-b.md"],
    "note": "Asosiy misol: Madina Sattorova, showroom maslahatchisi (To‘plam 1 suhbati bo‘lmagan, ish hajmi Jamshid akaning kuzatuvi). "
            "Skill o‘zi topgan muammo: T4 testi 01.11 dagi 1C fayliga tayanadi, 14-dekabrda bu fayl 43 kunlik bo‘ladi; egasi bot yoqiladigan kuni yangi fayl qo‘yishga qaror qildi. "
            "Kursning yakuniy namunasi (`namunalar/baraka-office/kit4-people/`) 4-dars fayllaridan olingan: so‘zlar boshqacha, tuzilma va raqamlar bir xil.",
    "sessions": [{"title": "1-sessiya: qobiliyatlar xaritasi va Madinaning mashg‘ulot vazifasi (4-dars)",
                  "turns": [["canon-k4/c-kit4-1", read(K4 / "k4-1.txt")], ["canon-k4/c-kit4-2", read(K4 / "k4-2.txt")],
                            ["canon-k4/c-kit4-3", read(K4 / "k4-3.txt")]]}],
}
M["kits"]["5"] = {
    "today": "2026-12-20 (1-hafta, 5-dars) va 2026-12-27 (yakun, 6-dars)",
    "before": "canon-before-kit5",
    "after": "canon-after-kit5",
    "inputs": ["CLAUDE.md", "kit5-pilot/baseline.md", "kit5-pilot/plan.md", "kit5-pilot/briefing.md", "kit4-people/test-set.md", "kit3-agent/instructions.md"],
    "outputs": ["kit5-pilot/numbers.md", "kit5-pilot/plan.md", "kit5-pilot/announcement.md"],
    "note": "Kursning kanonik raqamlari bilan qayta ishga tushirilgan: agentgacha `baseline.md` (2-dars), reja `plan.md` (4-dars). "
            "Skill xom raqamlardan kursdagi natijani chiqardi: B.15 3,2 va 7,2 soat/hafta, B.11 232 050, B.16 agent 10 452 / inson 3 570, B.14 680 000. "
            "B.12 da 1 so‘m farq bor (2 351 702): skill obunani haftalab yaxlitlagan (2 × 117 326), kurs namunasi esa 504 500 × 2 / 4,3 = 234 651. "
            "Sozlashsiz agent narxini skill har hafta alohida berdi (1 560-2 673), kurs namunasi ikki hafta birga (2 074). "
            "Kursning yakuniy namunasi `namunalar/baraka-office/kit5-pilot/` da.",
    "sessions": [{"title": "1-sessiya: /kit5 hafta 1 (5-dars, 20-dekabr)",
                  "turns": [["canon-k5/c-kit5-hafta1-1", read(K5 / "hafta1-1.txt")], ["canon-k5/c-kit5-hafta1-2", read(K5 / "hafta1-2.txt")]]},
                 {"title": "2-sessiya: /kit5 yakun, 2-hafta raqamlari bilan (6-dars, 27-dekabr)",
                  "turns": [["canon-k5/c-kit5-yakun-1", read(K5 / "yakun-1.txt")], ["canon-k5/c-kit5-yakun-2", read(K5 / "yakun-2.txt")]]}],
}
P.write_text(json.dumps(M, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print("kit4 and kit5 examples point at the canon reruns")
