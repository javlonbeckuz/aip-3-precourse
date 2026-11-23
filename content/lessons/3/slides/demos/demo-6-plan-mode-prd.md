# Demo 6: "Imagine there is no AI", plan mode, PRD and task list

Run sheet 2:04-2:12 · 8 minutes · slides 33-36 · bold terms: **Plan mode (Shift+Tab)**, **PRD**; habit «AI yo‘q deb tasavvur qiling».

The curriculum’s demo plans "a Telegram report bot".
This script plans the Baraka sales assistant instead, because it is the Baraka pilot the participants saw scored in Demo 5 and the pilot template builds on Day 3; the point (questions before code) is the same.

## What the room must take away

1. Before asking AI, picture who would do the job without AI: a business analyst, a developer, a designer, a tester, your department head.
   Each asks different questions; we make Claude ask them.
2. Plan mode: Claude only thinks, asks and writes a plan; it touches no file until you approve.
3. A PRD is the building’s drawing (the TZ): what is built, for whom, what is in and out, data sources, how success is measured, risks.
   A vendor who cannot give you one is guessing.
4. The task list cuts the PRD into steps a junior developer understands: foundation, walls, roof.

## Setup

- Warp tab 2 in `~/Praktikum/baraka/kompaniya`, `/clear`, then `/model opus`.
- Fallback: `~/Praktikum/baraka-tayyor/kompaniya/prd.md` and `tasks.md`.

## Script

| Step | Do | What appears | Say (UZ) |
|---|---|---|---|
| 1 | Slide 34. Ask the room: "AI bo‘lmasa, bu vositani kimlar qurardi?" Take 3 answers. | - | "Har biri sizga boshqa savol beradi. Claude’dan aynan shular nomidan so‘rashini so‘raymiz." |
| 2 | Shift+Tab until the footer shows "plan mode on" (the cycle is Manual, Accept edits, Plan). Or type `/plan`. | Footer changes | "Endi u faqat reja tuzadi. Kod yozmaydi, faylga tegmaydi." |
| 3 | Paste the Exercise 7 prompt. | Claude names 5-6 specialists and asks the first 3 questions | - |
| 4 | Answer 2-3 questions in plain words (answers below). For any technical question: "Sen tanla, eng soddasini, nega tanlaganingni bir gapda ayt." | Next questions, then the plan | "Texnik qarorni unga qoldiraman, lekin sababini so‘rayman." |
| 5 | When the plan appears, scroll to "Nima kirmaydi". | The out-of-scope list | "Eng muhim bo‘lim shu: nima qilmaydi. Mijozga o‘zi yozmaydi. Chegirma bermaydi." |
| 6 | Approve ("Yes"). | `prd.md`, `tasks.md` written | "Endi 9 qavatli binoning chizmasi bor. Quvurlar qayerdan o‘tishini oldindan bilamiz." |
| 7 | Slide 36: PRD = TZ. | - | "Kimdir sizga dastur sotsa, avval shunday hujjat so‘rang." |

Answers to give (from the Baraka example; keep them short):

| Likely question | Answer |
|---|---|
| Kim ishlatadi? | "Operatorlar va sotuv menejerlari. Mijoz emas." |
| Qoldiq qayerdan keladi? | "1C dan eksport, kuniga bir marta, Otabek aka beradi. Aniq vaqtini bilmayman: [?] qoldir." |
| 3 kun yoki 7 ish kuni? | "Shartnoma to‘g‘ri: 7 ish kuni. Yozma qarorni men beraman." |
| Qayerda ishlaydi: Telegram yoki sahifa? | "Hali bilmayman. Ochiq savol qilib yoz." |
| Qachon «tayyor» deymiz? | "Tuzoq savollarning hammasiga to‘g‘ri javob bersa va «3 kun» degan javob bitta ham bo‘lmasa." |

## While it runs

"Rejasiz qurish - 9 qavatli binoni quvursiz qurib, keyin devorni buzib quvur o‘tkazish."
"Bu reja kodni Claude yozishi uchun ham, sizning dasturchingiz uchun ham bir xil ishlaydi."

## Expected result

Two headless runs on 2026-11-03 (Opus 5.5, plan mode):

- With the first version of the prompt ("savollar ber"): 6 specialists, 18 questions, a PRD with 11 sections and 18 open questions, 15 tasks (`_build/sandbox/out/_first-run/old-inputs/d/`).
- With the Exercise 7 prompt ("eng muhim 6 ta savol", "ko‘pi bilan 2 sahifa"), on the final Baraka files: a PRD of about 2 pages for «Savdo yordamchisi» (8 sections, 12 open questions) and 14 tasks with a check for each (`_build/sandbox/out/d/plan-file-from-plan-mode.md`).

The owner-facing worked example is the edited 2-page version: `company-folder-starter/baraka-office/kompaniya/prd.md` and `tasks.md`.
Its central decision is worth saying aloud: numbers (price, discount limit, delivery days, km cost) come from a small calculator, never from the language model; AI only understands the question and drafts the reply.

Two facts from that run that matter in class:

- 18 questions is too many for an 18-minute exercise; the Exercise 7 prompt therefore asks for "eng muhim 6 ta savol" and "PRD ko‘pi bilan 2 sahifa", and the rerun confirmed the shorter result.
- In plan mode Claude keeps its plan in a plan file (`~/.claude/plans/...`) until you approve; only after "Yes" does it write `prd.md` and `tasks.md` into the company folder.
  Participants who close the session before approving will not find the files in their folder.

## Fallback

Opus limit on the demo account: switch to Sonnet; the plan is shorter but fine.
Nothing works: open the finished `prd.md` from the fallback folder and walk sections 4, 5 and 9.
