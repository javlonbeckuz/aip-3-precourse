# Praktikum 3.0, Day 1 class package

Day 1 (1-dars), "How AI works, and where your work goes": Saturday 21 November (Saturday group) and Sunday 22 November 2026 (Sunday group), same content, 180 minutes, 40 owners and 8 mentors per group.
Participant material shows both dates, «1-dars · 21-noyabr (shanba) / 22-noyabr (yakshanba)» (owner decision, 2026-11-03 14:30).
Built overnight on 2026-11-03 from the curriculum of record (`../final-curriculum/praktikum-3-curriculum.md`, section "Day 1").
Status: ready for rehearsal; the rehearsal steps (two days before) are at the top of the run sheet.

Participant-facing material is Uzbek Latin; instructor notes, scripts and this README are English.
Everything opens offline from this folder (fonts and scripts are bundled); copy `day-1/` without `_build/` (about 11 MB) to each mentor's USB stick.

## Start here

1. `instructor-run-sheet.md`: the minute-by-minute script, with what to say, what to show, what mentors do and the fallbacks.
   `talking-track.md` is the full natural-Uzbek talking track (v2, 2026-11-20 for the Sunday group, 210-minute slot; v1 archived under the 01_MD archive folder, project praktikum-3, dated 2026-11-20), one section per slide; `_build/build_talk.py` copies it into the deck notes drawer.
2. `deck/index.html`: the slides (keys: arrows, P notes, G grid, F full screen, T break timer).
3. `sources.md`: every 2026 fact used, with its source and the date it was checked.

## Map: run of show to material

| Time | Segment | Slides | Material in this folder | Printed |
| --- | --- | --- | --- | --- |
| 0:00-0:15 | Why we are here | 1-7 | | |
| 0:15-0:45 | First build | 8-12 | `first-build/prompt-sheet.html`, `first-build/examples/` | `first-build/prompt-sheet.pdf` |
| 0:45-1:00 | Where AI lives | 13-17 | `demos/data-trip/` | |
| 1:00-1:35 | How a model works | 18-29 | `demos/pick-a-number/`, `demos/tokenizer/`, `demos/models/`, `demos/side-by-side/`, `demos/formula-check/`, `demos/scripts/` | `handouts/pdf/bu-hafta-ai-da.pdf` |
| 1:35-1:45 | Break | 30 | | |
| 1:45-2:10 | Gemini Notebook | 31-34 | `notebooklm-exercise/` | `notebooklm-exercise/mashq.pdf` |
| 2:10-2:45 | Kit 1 | 35-40 | `kit1-live-demo/` plus the kit itself in `../kits/` | `kit1-live-demo/juftlik-mashqi.pdf`, Kit 1 PDF from `../kits/` |
| 2:45-3:00 | Homework and setup check | 41-43 | `homework.md` | `handouts/pdf/uy-vazifasi.pdf`, take-home handouts in `handouts/pdf/` |

## Bold terms and their demos

| Curriculum bold term | Demo |
| --- | --- |
| AI landscape: 3 layers | Slides 14-15 |
| Where your data goes | `demos/data-trip/` (cloud abroad; Tashkent server calling a model abroad; own server with an open-weight model) |
| Large language model | 7 test: `demos/pick-a-number/` and `demos/scripts/01-pick-a-number.md` |
| Token | `demos/tokenizer/` (OpenAI o200k_base and DeepSeek V4 Pro in the browser, 7 tokenizers pre-measured) |
| Context window | `demos/scripts/03-dastarxon.md`, slide 23 |
| Model tiers and effort | `demos/scripts/02-model-ladder.md`, `demos/models/` |
| Frontier vs open-weight | `demos/side-by-side/`, `demos/models/`, slides 25-27 |
| Hallucination | `demos/scripts/04-formula-check.md`, `demos/formula-check/` |

## Every item, its guide and its worked example

Owner's rule (overnight RULES, "How-to guides and worked examples"): nothing ships without an Uzbek how-to and a filled example.
Interactive pages have a "Qanday ishlatish" panel and a "Namuna bilan ochish" button (also opened by adding `#namuna` to the address).

| Item | How-to guide (Uzbek) | Worked example | Bad example |
| --- | --- | --- | --- |
| First build prompt sheet | `first-build/birinchi-qurilish.qollanma.md` (+ .html/.pdf) | Filled Baraka Office prompt and its result `first-build/examples/namuna-kalkulyator.html` (+ banquet, offer) with screenshots | «Menga kalkulyator qilib ber» and the fix, in the guide |
| Tokenizer page | Panel on the page + `demos/tokenizer/tokenizer.qollanma.md` | Button: Baraka manager's reply in 3 languages; screenshot `qollanma-namuna.png` | Common mistakes in the guide |
| Frontier vs open-weight page | Panel + `demos/side-by-side/side-by-side.qollanma.md` | Button: Baraka 12% discount request, two hand-written sample answers (marked), 1 000 questions a month | The weaker sample answer drops the approval condition |
| Formula check (new page) | Panel + `demos/formula-check/formula-check.qollanma.md` | Button: an AI answer of 17 203 000 diagnosed as "November row added" | All four wrong totals explained on the page |
| 7-test tally | Panel + `demos/pick-a-number/pick-a-number.qollanma.md` | Button: sample tally (marked as illustrative) | Common mistakes in the guide |
| Data-trip diagram | Panel + `demos/data-trip/data-trip.qollanma.md` | "Baraka misolida" line in each variant (the pilot bot is variant B) | Common mistakes in the guide |
| Dated model sheet | Reading guide on the sheet + `demos/models/models.qollanma.md` | Baraka "Savdo yordamchisi" monthly cost on 6 models, with the formula | Common mistakes in the guide |
| Gemini Notebook exercise | `notebooklm-exercise/mashq.md` (+ .html/.pdf) | `notebooklm-exercise/namuna-natijalar.md`: real outputs from 2026-11-03 (answer, contradiction table, Uzbek quiz in `namuna/`) | A vague question and the fixed one; a real answer that mixes two contradicting sources |
| Kit 1 live demo | `kit1-live-demo/jonli-suhbat-ssenariysi.md`, pairs card `juftlik-mashqi.md` | Canonical Baraka example from the kits agent (`../kits/namunalar/baraka-office/kit1-interviews/`), plus the short `kit1-live-demo/fallback-transkript.md` and `namuna-form-b.md` | The planted wrong numbers |
| Homework | `homework.md` (+ `handouts/pdf/uy-vazifasi.pdf`) | `uy-vazifasi-namuna.md`: Baraka sales team (team message, 3 interviews, numbers checked, Form B), quoting the kits' canonical Malika files | Weak submission and 7 fixes in the same file |
| Glossary and handouts | Usage line at the top of each | Baraka examples inside (data trip, contradictions, prompt) | |

Kit 1 forms themselves, with their own guides and examples, belong to the kits agent (`../kits/qollanma/`, `../kits/namunalar/`).

## Folder

| Path | What |
| --- | --- |
| `instructor-run-sheet.md` | 180-minute script, rehearsal list, crosswalk |
| `sources.md` | Fact register (F1-F24 plus the dated model sheet) |
| `homework.md` | Day 1 homework brief (Uzbek) and the Day 2 mentor check |
| `uy-vazifasi-namuna.md` | Worked example of good and weak homework (Baraka Office) |
| `deck/` | 43-slide web deck in the modular tile design of 2026-11-10 (v3): grey page, rounded tiles, soft green, lime and peach gradients, Inter with light numerals, data drawn as dots, build-in animation on every slide (`?noanim=1` turns it off; QA uses it). A lime tile or the "Noutbukda" pill means the room works now, a peach-green tile opens a new part. `assets/deck.css`, `assets/deck.js`, the fonts, `index.html` and the `art-*.webp` objects are copies written by `../deck-engine/sync.py` (source of truth: `../deck-engine/`, never edit the copies; `deck.json` holds the day number and title); `assets/slides_data.js` holds the text and English notes. Keys: arrows, P notes, G slide list, F fullscreen, T timer. The two decks it replaced (dark, then light Archetica) are archived under the 01_MD archive folder, project praktikum-3, dated 2026-11-10 |
| `first-build/` | Prompt sheet source (`promptlar.md`), screen and print versions, 3 finished examples |
| `demos/` | Offline demo pages with how-to panels and example buttons, a `*.qollanma.md` guide per tool, scripts, the formula-check page and sales file; `demos/index.html` lists them |
| `notebooklm-exercise/` | Participant sheet (Uzbek), real worked outputs (`namuna-natijalar.md`, `namuna/`), instructor README with the live test result and answer key |
| `kit1-live-demo/` | Live interview script, fallback transcript with a planted wrong number, sample Form B, pairs card |
| `handouts/` | Glossary and three refreshed 2.0 handouts (sources in `handouts/src/`, PDFs in `handouts/pdf/`) |
| `assets/` | Shared fonts and the two page styles (`ovd-dark.css` for screen demos, `page.css` for print) |
| `_build/` | Build and QA scripts, tokenizer build, QA screenshots |

## Depends on other folders (read only)

| What | Where | Owner |
| --- | --- | --- |
| Kit 1 forms A/B, team message, two-option consent, transcription prompt, Kit 1 prompt, written commitment | `../kits/KIT_01_Ish_qayerga_ketyapti_UZ_LATN.md` and `.pdf`, `../kits/skills/kit1/` | kits agent |
| Mentor check codes 1.1-1.10 | `../mentor-handbook/day-1.md` | mentor-handbook agent |
| Setup doctor scripts for the 2:50 check | `../week-0-setup/doctor/`, `../week-0-setup/setup-guide.md` | week-0 agent |
| Baraka Office demo documents | `../nlm-lead-magnet-video/demo-fayllar/` | existing |

## Build and test

All scripts resolve paths relative to their own file; run them from anywhere.

| Script | Does |
| --- | --- |
| `uv run --with markdown --with playwright python3 _build/build_docs.py` | Markdown sources to screen HTML and A4 PDFs (prompt sheet, exercise sheet, glossary, handouts, homework, pairs card, dated model sheet) |
| `python3 ../deck-engine/sync.py day-1` | Copies the shared deck engine, fonts and the clay objects the slides name into `deck/`; `--check` fails if the copy has drifted |
| `uv run --with playwright python3 _build/shot_notes.py . --anim 1 20 42` | Screenshots the notes drawer (talking track) on the given slides and every slide in animated mode; output in `_build/qa/notes/` and `_build/qa/anim/` |
| `uv run --with playwright python3 _build/qa_deck.py` | Runs the shared `../deck-engine/qa_deck.py`: renders all 43 slides at 1920x1080 offline, checks clipping, overflow, fonts, images and network calls; screenshots in `_build/qa/deck/` |
| `uv run --with playwright python3 _build/qa_pages.py` | Renders every other page at 1440, 390 and 1920 widths offline with the same checks; screenshots in `_build/qa/pages/` |
| `uv run --with playwright python3 _build/qa_interactions.py` | Clicks through the interactive parts: tokenizer counts equal the Python measurements, example buttons and how-to panels work, formula-check verdicts, timer |
| `uv run --with playwright python3 _build/shoot_guides.py` | Screenshots of every tool in its example state for the guides |
| `python3 _build/check_refs.py` | Every path named in the docs exists; the run sheet covers 0:00-3:00 without gaps |
| `uv run --with openpyxl python3 _build/make_formula_check.py` | Regenerates the sales file and its answer key |
| `python3 _build/inline_page.py` | Builds the single-file `demos/tokenizer/tokenizer-offline.html` |
| `_build/tokenizer/` | Tokenizer measurement, bundling and tests (see its README) |
| `python3 _build/build_talk.py` | Builds `deck/assets/talk_data.js` from `talking-track.md`, prints words and minutes per slide; fails if a slide has no section |
| `python3 _build/check_text.py` | Fails on em dashes and on English possessives after o or g in Uzbek files |

The QA scripts use the installed Google Chrome, not a downloaded browser.

## Dated content

Model names and prices appear only in `demos/models/models-data.js` (which feeds the dated sheet and the side-by-side page) and in `sources.md`.
Re-check them in the week before each session: Gemini 4 Argon doubles its price on 1 Dec 2026 and Gemini 3.8 Flash on 1 Jan 2027.
