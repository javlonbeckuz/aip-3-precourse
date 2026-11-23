# Day 2 class package: Claude Code, and which process to start with

Praktikum 3.0, session 2 ("2-dars").
Two groups, same content: Saturday 28 November or Sunday 29 November 2026 (owner decision, RULES.md 2026-11-03 14:30).
Built overnight 2026-11-03 (report: `../_build/overnight-2026-11-03/reports/day-2.md`).
Curriculum of record: `../final-curriculum/praktikum-3-curriculum.md`, Day 2 section.
Instructor and owner files are in English; everything participants and mentors read is Uzbek Latin.

Start with `instructor-run-sheet.md`: it is the minute-by-minute plan and every other file hangs off it.

## Map: run of show to material

| Time | Segment | Slides | Instructor material | Participant material | Worked example (Baraka Office) |
|---|---|---|---|---|---|
| 0:00-0:20 | Kit 1 review, unzip the starter | 1-5 | `instructor-run-sheet.md` (before-class checklist) | `company-folder-starter/kompaniya.qollanma.md`, zip `_build/dist/2-dars-kompaniya-papkasi.zip` | three Form B files in `company-folder-starter/baraka-office/kompaniya/kit1-interviews/` (Zarina Abdullayeva, call centre; Malika Rashidova, sales manager; Jamshid Karimov, head of sales), copied from the kits package's Baraka example `../kits/namunalar/baraka-office/` |
| 0:20-0:50 | Meet Claude Code | 6-16 | `demos/demo-1-bir-miya-uch-eshik.md`, `demos/demo-2-desktop-tartibi.md`, `demos/demo-3-boshqa-dastur.md`; setup `demos/inputs/setup-demo-machine.sh` | `handouts/claude-code-shpargalka.html` (PDF in `handouts/pdf/`), `handouts/lugat.html` | `demos/expected/demo-1-ziddiyatlar.md` |
| 0:50-1:20 | The company folder | 17-23 | `demos/demo-4-claude-md-va-xotira.md` | `exercises/01-birinchi-topshiriq.md`, `exercises/02-kompaniya-papkasi.md`, `exercises/03-global-korsatmalar.md` | `company-folder-starter/baraka-office/kompaniya/CLAUDE.md` (annotated), bad example `company-folder-starter/yomon-namuna/`, `demos/expected/claude-md-siz.md` vs `claude-md-bilan.md` |
| 1:20-1:50 | Kit 2 with Claude Code | 24-30 | `demos/demo-5-kit2-fayllardan.md` | `exercises/04-kit2-baholash.md`, `exercises/05-kit2-matritsa.md`, `exercises/06-model-tanlash.md` (part 1) | `company-folder-starter/baraka-office/kompaniya/kit2-scoring/` (form A, form B, `matrix.html`; screenshot `handouts/img/baraka-matritsa.png`) |
| 1:50-2:00 | Break | 31 | - | - | - |
| 2:00-2:30 | Plan before you build | 32-37 | `demos/demo-6-plan-mode-prd.md` | `exercises/06-model-tanlash.md` (part 2), `exercises/07-birinchi-prd.md` | `company-folder-starter/baraka-office/kompaniya/prd.md`, `tasks.md` |
| 2:30-2:50 | Skills | 38-42 | `demos/demo-7-skill.md` | `exercises/08-birinchi-skill.md`, course skills in `company-folder-starter/skills/` | `company-folder-starter/baraka-office/kompaniya/.claude/skills/suhbat-tahlili/SKILL.md`, input `demos/inputs/otabek-transcript.md`, output `demos/expected/suhbat-tahlili-otabek.md` |
| 2:50-3:00 | Homework | 43-47 | `homework.md` (last section: mentor check at the start of Day 3) | `homework.md` (also `handouts/uy-vazifasi.html`) | good and weak homework in `homework.md`; filled baseline `company-folder-starter/baraka-office/kompaniya/kit5-pilot/baseline.md` |

All prompts in one place for participants: `prompt-pack.md` (screen version with copy buttons: `handouts/promptlar.html`).
What participants receive is one zip, `_build/dist/2-dars-kompaniya-papkasi.zip` (top folder `praktikum/`, the course folder Week 0 creates as `~/praktikum`; RULES.md): `kompaniya/` (blank starter), `skills/`, `baraka-office/` (the worked example, with Otabek's transcript), `yomon-namuna/`, `natijalar/` (the real Claude Code outputs from `demos/expected/`), `sahifalar/` (prompts, exercises, homework, cheat sheet, glossary and the folder guide as single offline HTML files), `prompt-pack.md` and `kompaniya.qollanma.md`.
Participant-facing text names paths relative to that zip; `test_day2.py` unzips it and checks every such path.
All eight exercises in one printable page: `exercises/mashqlar.html`, PDF `handouts/pdf/mashqlar.pdf`.

## Deliverables

| # | Deliverable | Path | Guide (how to use) | Worked example | Bad example |
|---|---|---|---|---|---|
| 1 | Web deck, 47 slides, offline, on the shared deck engine (day 1 tile design, clay objects) | `deck/index.html` (keys: arrows, `P`/`N` notes, `G` slide list, `T` timer, `F` full screen, `C` copy the prompt) | speaker notes in every slide; run sheet | real Claude Code outputs on slides 9, 18, 27, 40 | - |
| 2 | Instructor run sheet, 180 minutes | `instructor-run-sheet.md` | itself | - | - |
| 3 | Company-folder starter | `company-folder-starter/kompaniya/` (generated), `company-folder-starter/skills/` (generated), template source `company-folder-starter/src/CLAUDE.md` | `company-folder-starter/kompaniya.qollanma.md` (+ `.html`) | `company-folder-starter/baraka-office/kompaniya/` | `company-folder-starter/yomon-namuna/CLAUDE.md` + `nima-xato.md` |
| 4 | Demos 1-7 | `demos/demo-*.md`, inputs `demos/inputs/`, expected outputs `demos/expected/` | each script has setup, steps, what to say, fallback | `demos/expected/` | Demo 4 shows the no-CLAUDE.md answer |
| 5 | Exercises 1-8 | `exercises/0*.md` | each file is its own step-by-step guide | Baraka section in each | exercises 3, 4, 6, 7, 8 |
| 6 | Prompt pack | `prompt-pack.md` | "Qanday foydalaniladi" section | prompts used on Baraka in exercises | - |
| 7 | Handouts | `handouts/lugat.html`, `handouts/claude-code-shpargalka.html`, PDFs in `handouts/pdf/` | - | - | - |
| 8 | Homework + Day 3 mentor check | `homework.md` | itself | good example (Baraka) | weak example with fixes |
| 9 | This README | `README.md` | - | - | - |

## Facts and sources

Every Claude Code behaviour in this package was checked on 2026-11-03 against code.claude.com/docs and support.claude.com; the list with URLs is at the end of `instructor-run-sheet.md`.
Where possible it was also run for real with Claude Code 2.1.316 in throwaway folders (`_build/sandbox/run_checks.sh`, outputs in `_build/sandbox/out/`):

| Check | What it showed |
|---|---|
| a, b | `/init` in a folder without CLAUDE.md writes an English, developer-style file; with the course template present it fills the Uzbek template and asks before replacing it. |
| c | The Exercise 4 prompt on the three Baraka Form B files gives 7 scored processes with file:line references on Sonnet; process 1 has the same 17,3 hours as the course example but Ease 9 [?] (A.6 = 1, A.4 with [?]). Demo 5 uses this gap to show the owner correcting a score with a reason. Groupings differ every run. |
| d | Plan mode on Opus with the first prompt asked 18 questions and wrote a long PRD; with the Exercise 7 prompt (6 questions, 2 pages) it wrote a 2-page PRD for «Savdo yordamchisi» and 13 tasks. The plan is held in `~/.claude/plans/` until approved. |
| e | Writing into `.claude/skills/` always needs the owner’s approval, even in accept-edits mode and with an allow rule; Exercise 8 tells participants to answer "Yes". |
| g | The skill made from the Kit 1 prompt runs as `/suhbat-tahlili` and catches «bir uch yuz ming» and «1520». |
| h, i | Without CLAUDE.md Claude Code still finds the right facts in the documents but hedges on the contradicting KP; with CLAUDE.md it decides, uses the house greeting and names the right contact. |
| j | Demo 1's contradiction search finds the planted contradictions (3 days vs 7 working days, 12-15% vs 10%, 36 months vs 24/12, 48 hours vs 5 working days) and that Malika does not know the discount rule is written down. |

## Build and checks

```text
python3 _build/make_baraka.py                     # copies the kits Baraka Kit 1, Kit 2 and baseline files, checks every sum and matrix.html
uv run --with markdown --with playwright python3 _build/build_docs.py     # handouts, prompt page, exercises page, PDFs
python3 _build/make_starter.py                    # kompaniya/ and skills/ from ../kits, Baraka documents, then the zip in _build/dist/
python3 _build/deck/sync_prompts.py               # copy exercise prompts into the deck
python3 ../deck-engine/sync.py day-2             # copy the shared engine, fonts and used clay objects into deck/ (after any slide or engine change)
uv run --with playwright python3 _build/deck/qa_deck.py [--slides 4,9]   # render and check all slides at 1920x1080, output in _build/qa/deck/
uv run --with pillow python3 _build/deck/contact_sheet.py                # contact sheets in _build/qa/sheets/
uv run --with playwright python3 ../deck-engine/check_coverage.py day-2  # every data string is drawn on its slide
python3 ../deck-engine/sync.py --check day-2     # fails if the engine copy in deck/ drifted
bash _build/qa_pages.sh                           # render every page at 1440 and 390 px, offline
python3 _build/tests/test_day2.py                 # consistency tests
bash _build/sandbox/run_checks.sh [a b c d e g h i j]     # real Claude Code runs (uses the owner's plan)
```

Generated, do not edit by hand: `company-folder-starter/kompaniya/`, `company-folder-starter/skills/`, the Baraka `kit1-interviews/`, `kit2-scoring/` and `kit5-pilot/baseline.md` (copied from `../kits/namunalar/baraka-office/`), `company-folder-starter/baraka-office/kompaniya/hujjatlar/`, every `.html` built from a `.md` by `build_docs.py`, `handouts/pdf/`, `_build/dist/`.
Re-run `make_starter.py` whenever `../kits/` changes; `test_day2.py` fails on stale copies.

Scripts resolve paths relative to their own file.
The deck runs on the shared engine in `../deck-engine/` (ported 2026-11-20): `deck/deck.json` and `deck/assets/slides_data.js` are this day's own files, while `deck/index.html`, `deck/assets/deck.css`, `deck/assets/deck.js`, `deck/assets/fonts/` and the clay objects in `deck/assets/img/` are copies written by `../deck-engine/sync.py` and are never edited here.
Slide fields, layouts and clay objects are described in `../deck-engine/README.md`.
The old dark deck (`tokens.css`, `flowfield.js`), its QA script and screenshots are archived under the 01_MD archive folder, project praktikum-3, `2026-11-20_day-2-deck/`; `_build/deck/port_patch.py` records what the port changed (pictures and the "Noutbukda" pill on slides 19, 21, 22, 23, 28, 29, 32, 37, 42; no words).
`assets/page.css` and its fonts (for the handout and exercise pages) are copies of the Day 1 v3 files (`../day-1/`); `assets/page.css` has a short Day 2 addition at the end for images and code blocks.
