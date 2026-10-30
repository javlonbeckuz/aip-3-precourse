# Kit tab drafts: notes

## Decisions

- Kit names follow the approved lesson text, not the 2.0 handout: Kit 1 "Ish qayerga ketadi" (2.0: "Ish qayerga ketyapti?"), Kit 4 "Yangi rollar" (2.0: "Xodimlarni yangi rolga tayyorlash"). Kit 5 is "Pilot va hisob-kitob", matching the parallel company-folder draft (2.0: "Sinov va hisob-kitob").
- "Sunʼiy intellekt" is now "agent" everywhere: Kit 3 B is "Agent koʻrsatmalari", and the Kit 5 B column is "Agentgacha".
- Kit 2 A.8/A.9 are "Value" and "Ease" (2.0: Qiymat/Osonlik), as in lesson 3 amaliyot 04-06.
- Kit 4 wording follows lesson 5: koʻnikma (2.0: qobiliyat), oʻquv vazifasi (2.0: mashgʻulot vazifasi), namuna (2.0: misol).
- Kit 5 B uses "murojaat" (2.0: soʻrov), as in the approved baseline prompts.
- Skill placement: /kit1 is in lesson 1, /kit2 and /kit5 are in lesson 3 (the Kit 5 baseline starts there), /kit3 is in lesson 4, /kit4 is in lesson 5. Lessons 5, 6 and 7 point to /kit5 by mode (`/kit5 reja`, `/kit5 hafta 1`, `/kit5 qaror`).
- Kit 5 B (`kit5-b-raqamlar.md`) is listed in lessons 3, 6 and 7 as identical copies in each `files/<n>/`.
- Slug = file name without `.md`, lowercased (`kit1-SKILL.md` → `kit1-skill`). The server serves `content/lessons/<n>/files/<slug>.md`, so the files need that rename when they are placed.
- New prompt ids are K1P1, K1P2, K2P1, K3P1, K4P1, K5P1 and K7P1. K5P1 appears in lessons 5, 6 and 7 with different texts; ids only need to be unique within a lesson. `validateLesson` passes for every lesson with the kit merged in.
- Note tags are DARSDA, UYGA, DARSDA VA UYGA, IKKINCHI DARSDA and KERAK BOʻLGANDA. Amaliyot only uses ASOSIY.
- The 2.0 handout said "Claude, ChatGPT yoki Gemini". The 3.0 prompts target only Claude, Gemini or Claude Code.

## Conflicts between the 2.0 forms and the approved 3.0 text (3.0 followed)

- Kit 1 B.9: 2.0 has S/I/B. Lesson 1 uses A agent, R robot, I inson, B birgalikda.
- Kit 3 A.4: 2.0 has S/I. It is now A/R/I, per lesson 4 ("agent, robot yoki inson").
- Kit 1: 3-5 employees became 2-3, with the solo fallback. A new first step was added: the owner tells the team why. The number check with "bir uch-toʻrt yuz ming" → 1 300 000 is now explicit.
- Kit 5 order: the 2.0 "one week without AI" step is replaced by a baseline after Day 2, taken from history where it exists. Form A is filled on Day 4.

## Please confirm

1. "Robot" (R) is never defined in the sources. Should one line like "qatʼiy qoida boʻyicha avtomatika, AIʼsiz" be added?
2. "Topilgan pul" is an unnumbered row right after B.7, plus a detail table. This keeps the numbers B.9-B.13 that the lessons cite.
3. Definitions I had to choose:
   - Agentgacha is one week's figure, so it compares with the weekly columns.
   - Oʻzgarish is the last filled week compared with Agentgacha.
   - The Kit 2 matrix midline is 9 (3-8 low, 9-15 high).
   - Bitta vazifa narxi is B.12 ÷ B.5 for the agent, and Agentgacha B.2 / 60 × stavka for a person.
4. The /kit1 skill says "bir uch-toʻrt yuz ming" means about 300-400 ming. That gloss is not in the sources.
5. Lesson 6 kit, group 03: the permission decision is written into Kit 5 A.5. The curriculum only says "apply only what was agreed".
6. Lesson 3 amaliyot 08 has students build /kit1 by hand, and the Kit tab also offers a ready kit1-SKILL.md. Keep both?
7. Other stand-ins not in `fixes.json` (it only covers `[shakl matni]`):
   - lesson 3 04P1 `[Kit 2 shakli fayli]` → kit2-a-baholash.md
   - lesson 3 08P1 `[Kit 1 prompti matni]` → K1P2
   - lesson 5 05P1 `[Kit 5 shakli fayli]` → kit5-a-reja.md

   Should these be fixed too?
8. Duplicates: the Kit tab prompts K1P1/K1P2 repeat lesson 1 V3P1/V3P2 (fixed). K3P1 overlaps lesson 4 02P1. This is intended, so the Kit tab works on its own.
