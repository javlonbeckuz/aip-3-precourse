# Kits 3.0

The five "Biznesda AI’ni qo‘llash" kits for Praktikum 3.0, updated from the 2.0 Day 4 handout.
In 3.0 each kit runs on the participant's own company across the six sessions, and every output is saved as a .md file in the company folder, so Claude Code can read it.
Status: built overnight 2026-11-03 (see `../_build/overnight-2026-11-03/reports/kits.md`); Kit 1 is used live on Day 1 (21/22 Nov 2026).

Participant-facing text (kits, templates, skills) is Uzbek Latin.
This README is the owner-facing guide, in English.

## What is here

| Path | What it is |
|---|---|
| `KIT_0N_<name>_UZ_LATN.md` | Digital twin of each kit: steps, consent and staff scripts, the chat prompt, the Claude Code line, and both blank forms with their field codes. Generated. |
| `KIT_0N_<name>_UZ_LATN.pdf`, `KITS_ALL_UZ_LATN.pdf` | Print copies: each kit is a cover with steps plus its blank forms; the ALL file opens with a workbook cover. Generated. |
| `templates/kompaniya/` | Blank fillable .md templates laid out exactly as the company folder from the curriculum. Copy the subfolders into the participant's `kompaniya/`. |
| `skills/kit1/` ... `skills/kit5/` | Claude Code skills `/kit1` to `/kit5`. Each folder holds `SKILL.md`, a `templates/` copy of that kit's templates (so the skill works even if the owner never copied the templates) and `example/` (a recorded Baraka Office run: input files, every prompt and full reply, output files). |
| `qollanma/` | One Uzbek fill-in guide per template (18), laid out like the company folder: what you need, where each answer comes from, each field in plain words, common mistakes, what done looks like. |
| `namunalar/baraka-office/` | Every template filled for Baraka Office (23 files plus `kit3-agent/instructions.izoh.md`), each with margin notes «Nega shunday yozildi». Kit 1-2 come from a real run of the skills and are the course canon (Day 1, Day 2 and the mentor handbook copy them); Kit 3-5 are copies of the course's canonical files (`pilot-template/`, Day 3, Day 4, Day 6), kept in sync by `_build/make_canon_snapshot.py`. |
| `namunalar/yomon-misollar.md` | Seven bad examples with what is wrong and the corrected version. |
| `content/uz-latn.json` | Single source for kit titles, steps, prompts, field codes and labels (copied from 2.0 and edited for 3.0). |
| `content/all.uz-latn.json` | Text of the workbook cover in `KITS_ALL`. |
| `_build/` | Build scripts, the HTML sources, QA renders and the skill test run. |

## Company folder and file names

The curriculum fixes the folder names; this table fixes the file names inside them.
Every skill reads and writes these exact paths, and the demo company folder and the bonus kits should use them too.
`<ism>` is the employee's first name in lowercase Latin letters, for example `dilnoza`.
Template files that start with `ism-` are per-person: copy and rename them, one per employee.

| Company folder path | Kit / form | Written by | Read by |
|---|---|---|---|
| `CLAUDE.md` | Company context (Day 2, /init) plus a "Kitlar" section pointing at the folders below | owner, /init | every skill |
| `kit1-interviews/team-message.md` | Kit 1 step 1: the owner's message to the team, optional written commitment | /kit1 or owner | /kit1 |
| `kit1-interviews/<ism>-transcript.md` | Kit 1: interview transcript, or the interviewer's notes | owner (Gemini transcription) | /kit1 |
| `kit1-interviews/<ism>-form-a.md` | Kit 1 Form A: interview sheet with the consent text (for interviews done on notes) | owner | /kit1 |
| `kit1-interviews/<ism>-form-b.md` | Kit 1 Form B: task list, B.1-B.9, with the number check | /kit1 | /kit2 |
| `kit2-scoring/form-a-scoring.md` | Kit 2 Form A: process scoring, A.1-A.9 | /kit2 | /kit3, /kit5 |
| `kit2-scoring/form-b-matrix.md` | Kit 2 Form B: dot list, B.1-B.3 choice | /kit2 | /kit3, /kit5 |
| `kit2-scoring/matrix.html` | Kit 2 Form B drawn as an offline HTML page | /kit2 | owner, browser |
| `kit3-agent/form-a-steps.md` | Kit 3 Form A: process steps today and tomorrow, A.1-A.8 | /kit3 | /kit4 |
| `kit3-agent/form-b-agent.md` | Kit 3 Form B: the owner's agent brief in his own words, B.1-B.10, signed | /kit3 | /kit3 |
| `kit3-agent/instructions.md` | Kit 3 Form B rewritten as the agent's system prompt; the pilot tool in `app/` loads it | /kit3, /kit5 (fixes) | `app/`, /kit5 |
| `kit4-people/form-a-skills-map.md` | Kit 4 Form A: skills map, A.1-A.6 | /kit4 | /kit4 |
| `kit4-people/<ism>-form-b.md` | Kit 4 Form B: training task and conversation notes, B.1-B.9 | /kit4 | /kit5 |
| `kit4-people/test-set.md` | 3 good + 3 bad real examples: Kit 4 B.4 and the agent's test set | /kit3 (collect), /kit4, /kit5 (new cases) | `app/`, /kit5 |
| `kit5-pilot/baseline.md` | Kit 5 "Agentgacha" numbers with the source of each (history or live) | /kit5 baseline | /kit5 |
| `kit5-pilot/briefing.md` | Kit 5: private briefing script for the pilot lead | /kit5 or owner | owner |
| `kit5-pilot/plan.md` | Kit 5 Form A: pilot plan, A.1-A.9 | /kit5 reja | /kit5 |
| `kit5-pilot/numbers.md` | Kit 5 Form B: weekly numbers, costs, results, error log B.13, money found, decision | /kit5 hafta, xato, yakun | /kit5 |
| `kit5-pilot/announcement.md` | Kit 5 last step: the team announcement after the decision | /kit5 yakun | owner |
| `app/`, `prd.md`, `tasks.md` | The pilot tool, its PRD and task list (curriculum Days 2-4; not part of the kits) | Claude Code | - |

Field codes never change between paper, .md and skill.
The 2.0 codes the curriculum cites (Kit 1 B.9, Kit 3 B.3 and B.6, Kit 4 B.4, B.6, B.8, B.9, Kit 5 B.7, B.9-B.12, B.13) keep their numbers; new 3.0 lines get new codes (Kit 5 B.14-B.16).

## Installing the skills (participant, from Day 2)

Skills live in the company folder at `kompaniya/.claude/skills/<name>/SKILL.md` (Claude Code project skills; checked against the official docs at https://code.claude.com/docs/en/skills on 2026-11-03).
The `.claude` folder is hidden in Finder and Explorer, so the easy way is to let Claude Code copy it.
Open Claude Code in `kompaniya/` and say, in Uzbek:

```text
<kits papkasi>/skills ichidagi kit1, kit2, kit3, kit4, kit5 papkalarini shu papkadagi .claude/skills/ ichiga nusxala. templates/kompaniya ichidagi papkalarni ham shu papkaga nusxala, lekin bor faylning ustiga yozma.
```

Manual way (macOS): `mkdir -p kompaniya/.claude/skills && cp -R kits/skills/kit* kompaniya/.claude/skills/`.
Restart Claude Code or type `/` and check that `/kit1` ... `/kit5` appear in the menu.

On Day 2 the curriculum has participants turn the Kit 1 prompt into their own `/kit1` (exercise 8, "First skill").
Keep that exercise: it is how they learn what a skill is.
The skills shipped here are the reference version and the fallback for anyone whose own skill does not work.

## What each skill does

| Skill | Day | Input | Output |
|---|---|---|---|
| `/kit1 [transkript fayli]` | Day 1 homework, Day 2 on | A transcript or notes | Number check of every figure (the "bir uch-to‘rt yuz ming" trap), Form B with B.4 worked out row by row, open `[?]` marks, the B.9 decision taken with the owner |
| `/kit2` | Day 2 | All `kit1-interviews/*-form-b.md` | Up to 8 processes scored A.2-A.7 with a reason per score, Value and Ease shown as sums, the matrix as HTML, B.1-B.3 from the owner |
| `/kit3` | Day 3 | Kit 2 choice | Form A by interviewing the owner step by step, Form B, a source table (API / MCP / export / manual), `instructions.md` as the system prompt, the start of `test-set.md` |
| `/kit4` | Day 4 | Kit 3 Form A, `test-set.md` | Skills map, one training task per employee built on the test set, the 15-minute conversation plan, before go-live |
| `/kit5 [baseline \| reja \| hafta N \| xato \| yakun]` | Day 2 to Day 6 | Everything above | Baseline from history, pilot plan, weekly column, error log plus the improvement loop, final numbers with costs, hours saved, money found, cost per task, decision, team announcement |

All five skills speak Uzbek, ask the owner before they write ("Interview me"), show every calculation in the file ("Show your work"), and never invent a number: a guess is marked `[?]` until a person confirms it.
Each skill marks its owner checkpoints with **To‘xtang** (stop and wait); without them Haiku skipped the questions and wrote files straight away (seen in testing, fixed).

On Day 1 there is no company folder or skill yet: owners transcribe in Gemini and paste the Kit 1 chat prompt ("AI chat uchun so‘rov" in `KIT_01_*.md`) into any chat.
That prompt does the number check on its own (tested without tools on Sonnet).

### Tested on

| What | Model | Result |
|---|---|---|
| Kit 1 chat prompt, no skill, no tools (the Day 1 path) | Sonnet 5.5 | Flagged «34 daqiqa», «15-6», «1 300 000»; read «1 yarim soat» as 90 minutes; left B.9 empty |
| `/kit1` first turn | Sonnet 5.5, Opus 5.5 | All number traps caught, cross-check per error, nothing written before asking |
| `/kit1` full run and correction mode | Opus 5.5 | Form B written, then corrected with the employee's numbers, no `[?]` left in the table |
| `/kit2` | Opus 5.5 (full), Haiku 5.5 (first turn) | Full run correct; Haiku stops at the first checkpoint after the fix |
| `/kit3`, `/kit4` | Opus 5.5 | Full runs |
| `/kit5 baseline`, `reja`, `hafta 1`, `xato`, `yakun` | Opus 5.5 | Full chain; baseline counts match the invented export exactly |

| Baraka Office worked examples: all five skills in every mode except `/kit2 qayta`, 39 turns, on the final skill text except the last wording fixes | Opus 5.5 | Kits 3-5 converge on the course pilot (`pilot-template/`); the runs found a 42-day-old 1C file, a cost-price column the bot could leak, verbal rules clashing with written ones, and a biased timing sample |
| Final text, first turns after all edits | Opus 5.5 (`/kit1` correction mode, `/kit3` with no argument, `/kit5` with no argument), Haiku 5.5 (`/kit2`) | `/kit3` entered exceptions mode; `/kit5` found the next step, re-checked the sums, and flagged an unsigned promise and the word «bo‘shagan» |

The full chains above ran on the skill text as it stood during the night; the last edits (the **To‘xtang** stop points, hyphens for empty cells, the Kit 5 wording, promise and Form B sync rules) came from those runs and were then checked by the first-turn runs in the last row, not by a second full chain.
The Opus `/kit3` full run also used an install that still lacked the `test-set.md` template (it built the table itself).

Not exercised: `/kit2 qayta`, `/kit5 hafta 2` as a separate call (week 2 was given inside `yakun` in both companies), and any run on Windows; `/kit3 istisno` and `/kit4 suhbat <ism>` ran in the Baraka examples.

## Guides and worked examples

Every template has a fill-in guide in Uzbek (`qollanma/`), a filled Baraka Office example with margin notes (`namunalar/baraka-office/`, closing section «Nega shunday yozildi»), and the skill that fills it has a real recorded run (`skills/kitN/example/`: `input/`, `suhbat.md` with every prompt typed and Claude's full reply, `output/`).
Bad examples with corrections for the most common mistakes (vague task list, unchecked number, scoring without evidence, weak system prompt, easy-only test set, numbers without a baseline, a bad consent) are in `namunalar/yomon-misollar.md`.

| Template | Fill-in guide (Uzbek) | Filled Baraka Office example | Skill example (prompts + full replies) |
|---|---|---|---|
| `templates/kompaniya/CLAUDE.md` | `qollanma/CLAUDE.qollanma.md` | `namunalar/baraka-office/CLAUDE.md` | - |
| `templates/kompaniya/kit1-interviews/ism-form-a.md` | `qollanma/kit1-interviews/ism-form-a.qollanma.md` | `namunalar/baraka-office/kit1-interviews/malika-form-a.md` | `skills/kit1/example/` |
| `templates/kompaniya/kit1-interviews/ism-form-b.md` | `qollanma/kit1-interviews/ism-form-b.qollanma.md` | `namunalar/baraka-office/kit1-interviews/malika-form-b.md`, `namunalar/baraka-office/kit1-interviews/zarina-form-b.md`, `namunalar/baraka-office/kit1-interviews/jamshid-form-b.md` | `skills/kit1/example/` |
| `templates/kompaniya/kit1-interviews/ism-transcript.md` | `qollanma/kit1-interviews/ism-transcript.qollanma.md` | `namunalar/baraka-office/kit1-interviews/malika-transcript.md`, `namunalar/baraka-office/kit1-interviews/zarina-transcript.md`, `namunalar/baraka-office/kit1-interviews/jamshid-transcript.md` | `skills/kit1/example/` |
| `templates/kompaniya/kit1-interviews/team-message.md` | `qollanma/kit1-interviews/team-message.qollanma.md` | `namunalar/baraka-office/kit1-interviews/team-message.md` | `skills/kit1/example/` |
| `templates/kompaniya/kit2-scoring/form-a-scoring.md` | `qollanma/kit2-scoring/form-a-scoring.qollanma.md` | `namunalar/baraka-office/kit2-scoring/form-a-scoring.md` | `skills/kit2/example/` |
| `templates/kompaniya/kit2-scoring/form-b-matrix.md` | `qollanma/kit2-scoring/form-b-matrix.qollanma.md` | `namunalar/baraka-office/kit2-scoring/form-b-matrix.md`, `namunalar/baraka-office/kit2-scoring/matrix.html` | `skills/kit2/example/` |
| `templates/kompaniya/kit3-agent/form-a-steps.md` | `qollanma/kit3-agent/form-a-steps.qollanma.md` | `namunalar/baraka-office/kit3-agent/form-a-steps.md` | `skills/kit3/example/` |
| `templates/kompaniya/kit3-agent/form-b-agent.md` | `qollanma/kit3-agent/form-b-agent.qollanma.md` | `namunalar/baraka-office/kit3-agent/form-b-agent.md` | `skills/kit3/example/` |
| `templates/kompaniya/kit3-agent/instructions.md` | `qollanma/kit3-agent/instructions.qollanma.md` | `namunalar/baraka-office/kit3-agent/instructions.md` (notes in `instructions.izoh.md`, because the bot reads the file whole) | `skills/kit3/example/` |
| `templates/kompaniya/kit4-people/form-a-skills-map.md` | `qollanma/kit4-people/form-a-skills-map.qollanma.md` | `namunalar/baraka-office/kit4-people/form-a-skills-map.md` | `skills/kit4/example/` |
| `templates/kompaniya/kit4-people/ism-form-b.md` | `qollanma/kit4-people/ism-form-b.qollanma.md` | `namunalar/baraka-office/kit4-people/madina-form-b.md` | `skills/kit4/example/` (Malika and Zarina; see note below) |
| `templates/kompaniya/kit4-people/test-set.md` | `qollanma/kit4-people/test-set.qollanma.md` | `namunalar/baraka-office/kit4-people/test-set.md` | `skills/kit4/example/` |
| `templates/kompaniya/kit5-pilot/announcement.md` | `qollanma/kit5-pilot/announcement.qollanma.md` | `namunalar/baraka-office/kit5-pilot/announcement.md` | `skills/kit5/example/` |
| `templates/kompaniya/kit5-pilot/baseline.md` | `qollanma/kit5-pilot/baseline.qollanma.md` | `namunalar/baraka-office/kit5-pilot/baseline.md` | `skills/kit5/example/` |
| `templates/kompaniya/kit5-pilot/briefing.md` | `qollanma/kit5-pilot/briefing.qollanma.md` | `namunalar/baraka-office/kit5-pilot/briefing.md` | `skills/kit5/example/` |
| `templates/kompaniya/kit5-pilot/numbers.md` | `qollanma/kit5-pilot/numbers.qollanma.md` | `namunalar/baraka-office/kit5-pilot/numbers.md` | `skills/kit5/example/` |
| `templates/kompaniya/kit5-pilot/plan.md` | `qollanma/kit5-pilot/plan.qollanma.md` | `namunalar/baraka-office/kit5-pilot/plan.md` | `skills/kit5/example/` |

How the examples were made: the five skills were run headless on a Baraka Office company folder (`_build/baraka-run/baraka-office/`, simulated course dates 26 Nov - 27 Dec 2026 on the Sunday group's calendar, as the owner decided on 3 Nov for fixed example timelines; `namunalar/README.md` says once that the Saturday group runs a day earlier; Opus 5.5) with the owner's answers given turn by turn; `_build/make_examples.py` packages each run from `_build/example_manifest.json` and the folder snapshots.
The skill examples are verbatim (only apostrophes, dashes and one-sentence-per-line normalised).
The `/kit5` example was rerun on the canonical inputs (`_build/baraka-run/canon-k5/`, prompts in `_build/canon-k5-prompts/`), so its numbers are the course canon.
The `/kit3` and `/kit4` examples are the earlier run: their input `CLAUDE.md` carries the canon hourly rate (those skills do not use it), and the `/kit4` example still shows Malika and Zarina, not Madina.
The filled examples: Kit 1-2 come from the run (they are the course canon that other packages copy); Kit 3-5 are the course's canonical files copied by `_build/make_canon_snapshot.py` with a few documented edits (dangling links, Madina's B.4 ids, her observed count, the rate formula), listed in that script and in the manifest (`namunalar.curated`).
`check_kits.py` fails if a copy drifts from its source, so rerun `make_canon_snapshot.py` and `make_examples.py` after any canon change.
Baraka facts follow `ROOT/_build/overnight-2026-11-03/BARAKA-CANON.md`.

## Build

```text
python3 _build/make_kits.py      # content/*.json -> _build/design/*.html, KIT_0N .md twins, form templates, skill template copies
python3 _build/build_kits.py     # PDFs at kits/ root, QA PNGs in _build/qa/uz-latn/, overflow report per kit
python3 _build/qa_sheet.py       # contact sheet _build/qa/sheet-uz-latn.jpg
python3 _build/check_kits.py     # language and consistency checks (exit code 1 on FAIL)
python3 _build/qa_matrix.py      # Kit 2 matrix page at 1440 px and 390 px -> _build/qa/html/
python3 _build/make_canon_snapshot.py  # Baraka end-of-course folder: Kit 1-2 from the run, Kit 3-5 from the course canon
python3 _build/make_examples.py  # skills/kitN/example/ and namunalar/baraka-office/ from the snapshots
```

Skill tests: `_build/test-run/oydin-kitob/` is an invented company (a Telegram bookshop) with the skills installed in `.claude/skills/`; `_build/test-run/make_sample_export.py` writes its invented Telegram export.
`_build/test-run/` is test evidence, not a demo: its files carry test artifacts (December pilot dates written on 3 November, corrected test dates, the skills' remarks about them), and the snapshot folders `oydin-kitob-k5`, `-sonnet`, `-haiku` hold partial states.
Build a demo company from `templates/` and `skills/`, not from this folder.
`_build/run_skill_test.sh <company-dir> <log-name> "<prompt>" [session-id]` runs one headless turn the way a participant types it, with parent and personal CLAUDE.md files switched off and the company `CLAUDE.md` passed in; the JSON log of every turn is kept next to the company folder.

Needs Python 3 with Pillow, Google Chrome (path overridable with the `CHROME` environment variable) and poppler (`pdftoppm`, `pdfunite`, `pdfinfo`, `pdffonts`).
Fonts come from `30_assets/fonts/archetica/` and are inlined into the PDFs.

Generated files: the `KIT_0N` .md and .pdf files, `KITS_ALL_UZ_LATN.pdf`, everything in `_build/design/*.html`, the form and script templates in `templates/kompaniya/` (each form's `file` and each script's `file` in the JSON), and every `skills/kitN/templates/` copy.
Edit `content/uz-latn.json` for those, never the outputs.
Hand-written files: `skills/kitN/SKILL.md` with their helpers (`kit1/raqamlar.md`, `kit2/matrix-template.html`), and five templates: `CLAUDE.md`, `kit1-interviews/ism-transcript.md`, `kit3-agent/instructions.md`, `kit4-people/test-set.md`, `kit5-pilot/baseline.md`.

## Change trace

### Curriculum table "Changes to the kit handout for 3.0"

| # | Kit | Change (curriculum) | Where it is applied |
|---|---|---|---|
| 1 | All | Relabel "Praktikum 3.0"; ship each form as .md plus a matching skill (/kit1 to /kit5), not only PDF | `content/uz-latn.json` `ui.series`, `content/all.uz-latn.json` (cover top line, how-to); every cover, footer and .md header. Forms as .md: `templates/kompaniya/` (13 generated form and script templates plus 5 hand-written ones). Skills: `skills/kit1/` ... `skills/kit5/`, each with its own template copy. Each cover's AI box and each form footer names the skill and the company-folder file. |
| 2 | Kit 1 | 2-3 employees instead of 3-5; fallback for solo owners and managers | Kit 1 step 2 ("Bitta bo‘lim va 2-3 xodimni tanlang. Jamoangiz bo‘lmasa yoki siz menejer bo‘lsangiz, o‘zingizni yoki bo‘lim boshlig‘ini ..."); `/kit1` step 1.3 accepts a self-interview. |
| 3 | Kit 1 | New first step: the owner tells the team why the interviews happen, before any interview | Kit 1 step 1 ("Avval jamoaga ayting"); new scripts page 4 in the Kit 1 PDF ("Jamoaga xabar", plus the optional written commitment); template `kit1-interviews/team-message.md`; `/kit1` step 0.4 asks whether it was done and records the date. |
| 4 | Kit 1 | Step 3: explicit check of every number in the transcript, with the "bir uch-to‘rt yuz ming" example | Kit 1 step 3 (the example, "matnda «1 300 000» bo‘lib chiqishi mumkin"); the chat prompt now starts with "1) Raqamlarni tekshirish" (works on Day 1 without Claude Code); a Gemini transcription prompt that keeps numbers as spoken words (`KIT_01` .md, `ism-transcript.md`); Form B legend line "[?] - taxmin"; `/kit1` step 2 with `skills/kit1/raqamlar.md` (ten trap patterns, cross-checks between numbers, conversion to per-week). |
| 5 | Kit 3 | Note under B.3: each source needs an API, MCP, export or manual step; mark which | B.3 note printed under the label on Form B; the .md and template turn B.3 into a two-column table (Manba / Ulanish); Kit 3 step 3; chat prompt task 2; `/kit3` step 2.3 (with an offer to check a vendor's API on the web); `instructions.md` "Manbalar" table. |
| 6 | Kit 4 | Note: the good / bad examples in B.4 are also the agent's test set | B.4 note on Form B; Kit 4 step 4; chat prompt task 4; one shared file `kit4-people/test-set.md` (T1-T6 with a pass rule each, plus a results log), started by `/kit3`, completed by `/kit4`, extended with T7+ by `/kit5 xato`. |
| 7 | Kit 5 | Split the order for weekly sessions: baseline starts after Day 2 (from history where it exists); Form A is filled on Day 4 | Kit 5 steps 1-2 reordered and labelled "2-darsdan keyin" and "4-darsda"; template `kit5-pilot/baseline.md` (source and method per number, live log for what has no history); `/kit5 baseline` and `/kit5 reja` modes; Kit 2 step 5 and `/kit2` step 6 point to the baseline. |
| 8 | Kit 5 | Add a "money found" line to Form B next to the hours | Form B row B.14 "Topilgan pul, so‘m" directly under B.7 (checking hours); legend line; a "Topilgan pul tafsiloti (B.14)" table in the .md; Kit 5 step 4; chat prompt task 4; `/kit5 hafta N` step 4 and `/kit5 yakun` steps 5-6 (proven and unproven sums kept apart). |

### Kit rows of the curriculum table "What changed from the REALITY draft"

| REALITY row | Where it is applied |
|---|---|
| Kit 1: the owner tells the team before any interview | Row 3 above. |
| Day 2 homework, Kit 5: baseline pulled from history (Telegram, Excel, CRM) where it exists; live recording only where it does not | Row 7 above; `/kit5 baseline` steps 3-5 read the exports and count per week with the source and date range written next to each number. |
| Day 5 homework, Day 6, Kit 5: "money found" line next to hours | Row 8 above. |
| Outcome 4, Day 3 exercise 6: an export counts when there is no API | Kit 3 B.3 note lists "eksport"; `/kit3` step 2.3: "API kalitini vendor bermasa, eksport ham hisoblanadi". |

### Other changes, and why

| Change | Where | Why |
|---|---|---|
| Consent, Form A box and team message cover sending the recording or transcript to an AI service and cite Labour Code Art. 178 (https://lex.uz/mact/6257288, written consent before employee data goes to a third party), with «yurist tasdiqlasin» for the owner; `/kit1` refuses to process a transcript until the owner confirms written consent, `/kit4` reminds the owner before employee data goes to the AI | Kit 1 Form A (`legal_note`), team message, `skills/kit1`, `skills/kit4` | Corrected legal facts in RULES.md (02:00): review 05's «Art. 176» was inaccurate. |
| Consent text replaced by the Uzbek draft of review 05 §3.1, ending on "yozib olaymi yoki qo‘lda yozaymi?" instead of "Rozimisiz?"; the employee signs the box ("audio 7 kun ichida o‘chiriladi") | Kit 1 Form A (moved from the cover to the sheet the interviewer holds) | The lead's brief points to §3.1; a yes/no question from the boss has one safe answer. One sentence was made honest: the transcript also goes to the AI to build the task list, not only to transcribe. |
| Pilot-lead briefing (§3.2) and team announcement (§3.4) | Kit 5 scripts page; templates `briefing.md`, `announcement.md`; `/kit5 baseline` step 2 and `/kit5 yakun` step 11 | The curriculum's Day 2 homework confirms the pilot with a colleague, and Day 6 ends with the decision; the review's scripts are the tested wording. Word list from review change 8 applied (no "sinov", "optimizatsiya", "bo‘shatilgan" in staff-facing text; "tejalgan vaqt"). |
| Kit 5 Form B: B.15 saved hours, B.16 cost per completed task (agent and human), hourly-rate header, B.2 defined as minutes without checking time | Kit 5 Form B, prompt, `/kit5` formula table | Day 6 exercise 2 needs one number for the agent and one for the human; the 2.0 language review (§8) flagged that B.2 and B.7 could double count checking time. |
| Kit 1 Form B header "Xodim ko‘rib chiqdi"; Kit 5 Form A header "Bo‘lim boshlig‘i" | Kit 1 Form B, Kit 5 Form A | The Day 2 mentor check wants employee-corrected numbers; Day 4 wants Kit 5 A agreed with the department head before go-live. |
| Kit 4 step 3 says the conversation happens before go-live, never after | Kit 4 step 3, `/kit4` | Curriculum Day 4: "Order matters". |
| Kit 3 step 4 collects 3 good and 3 bad real examples | Kit 3 step 4, `/kit3` step 5 | Curriculum Day 3 homework 3. |
| Every chat prompt asks for the calculation, not only the result | All five prompts | The "Show your work" habit from the curriculum. |
| Kit 4 prompt "metrika" became "ko‘rsatkich" | Kit 4 prompt | 2.0 language review term list. |
| Workbook cover: each kit labelled with its session, 3.0 how-to, page numbers computed from the real page count | `content/all.uz-latn.json`, `_build/make_kits.py` `all_cover()` | Kits 1 and 5 now have a fourth page (scripts). |

Kept unchanged on purpose: all 2.0 kit titles, form titles and field labels and codes, including Kit 4 A.5 "Yangi nazorat vazifasi" and Kit 5 Form A header "Sinov egasi" (review 05 suggests softer words; see the open questions in the overnight report).
