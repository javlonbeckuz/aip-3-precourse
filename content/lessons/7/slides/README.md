# Day 6: Results, decisions, and demo day

Class package for Praktikum 3.0 lesson 6 ("6-dars"): Saturday 26 December 2026 (Saturday group) or Sunday 27 December 2026 (Sunday group), same content (owner decision, 3 Nov 2026 14:30).
The Baraka worked example keeps the Sunday group's dates and says once that the Saturday group runs one day earlier.
Source of record: `final-curriculum/praktikum-3-curriculum.md`, section "Day 6" (lines 629-716).
Built overnight 2026-11-03 by the day-6 agent; report: `../_build/overnight-2026-11-03/reports/day-6.md`.
Participant-facing text is Uzbek Latin; this README, the run sheet, the host card and the sources register are English.

Status: complete draft, verified by tests and headless renders (see "Build and checks").
Two pending owner decisions shape it and are flagged where they apply: decision 07 (demo format) and decision 06 (pilot length, optional January results night).

## Start here

| Reader | Open |
| --- | --- |
| Instructor | `instructor-run-sheet.md`, then `deck/index.html` (P notes, T timer, G slide list) |
| Head mentor | `instructor-run-sheet.md` sections "Before the day" and "Closing the refund evidence", `demo-day/sahna-boshlovchi.md` |
| Table mentors | `mentor-handbook/day-6.md` (mentor-handbook agent), `after-the-program/mentor-yordami.md` section 4 |
| Owners (participants) | `results-sheet/index.html`, `exercises/`, `demo-day/namoyish-formati.md`, `homework.md` |

## Run of show to material

| Time | Curriculum segment | Material in this folder |
| --- | --- | --- |
| 0:00-0:40 | Kit 5 B final: change column, costs, cost per task, money found, Kit 5 prompt, decision with mentor | Slides 1-13; `results-sheet/` (generator, guide, Baraka example, bad example); `exercises/01-yakuniy-raqamlar.md`; `exercises/02-qaror.md` (three critics); Baraka Kit 5 files in `exercises/namuna/kompaniya/kit5-pilot/` |
| 0:40-1:10 | AI that shows up in profit: cut vs grow, redesign vs bolt-on, saved hours, scaling to process #2 | Slides 14-23; `exercises/03-ikkinchi-jarayon.md`; `exercises/04-30-kunlik-reja.md`; `exercises/namuna/kompaniya/ikkinchi-jarayon.md`, `30-kunlik-reja.md` |
| 1:10-1:30 | Buying AI wisely: build vs buy vs open source, frontier vs open-weight, vendor checklist, fair price | Slides 24-32; `vendor-checklist/` (offline tool, printable checklist, guide, "Alfa AI" worked example) |
| 1:30-1:40 | Break | Slide 33 (timer) |
| 1:40-2:20 | Demo round 1: tables, 3 minutes each, table picks one | Slides 34-38; `demo-day/namoyish-formati.md`, `namoyish-ssenariy.md` (3-minute template), `baholash-varagi.md` / `.html` (printable scoring sheets), `namuna/` |
| 2:20-2:50 | Demo round 2: stage, one per table, Q&A | Slides 39-42; `demo-day/sahna-boshlovchi.md` (host card), `demo-day/ekran-yozuvi.qollanma.md` (60-second recordings, set as Day 5 homework) |
| 2:50-3:00 | Graduation: certificates, 1 month support, AI community, process #2, testimonials | Slides 43-50; `after-the-program/` (support month, PRAKTIK hand-off, certificate texts, day-30 survey, testimonial consent, costs card); `homework.md` |

Other curriculum rows:

| Curriculum row | Material |
| --- | --- |
| Learning outcomes (5) | Run sheet crosswalk table |
| Terminology (bold terms taught live) | Slides 6-7, 9, 11, 25; `exercises/atamalar.md` (glossary, Uzbek) |
| Vendor checklist (8 questions) | `vendor-checklist/`, slides 28-29 |
| Hands-on 1 Final numbers, 2 Cost per task | `exercises/01-yakuniy-raqamlar.md`, results sheet (B.16 agent, agent without setup, human) |
| Hands-on 3 Decision | `exercises/02-qaror.md` |
| Hands-on 4 Next process | `exercises/03-ikkinchi-jarayon.md` |
| Hands-on 5 Demo | `demo-day/` |
| Kit 5 integration: B final, B decision | Exercises 01-02, results sheet |
| Kit 5 integration: Kit 4 B.6 employee growth (first 2-week check) | `exercises/05-xodim-osishi.md` |
| After the program | `after-the-program/`, `homework.md` |
| Definition of done (graduation) | Slide 44, run sheet graduation block, `after-the-program/sertifikat-matni.md` |
| Refund guarantee evidence (sales page) | Run sheet "Closing the refund evidence"; slide 49; mentor message template in `after-the-program/mentor-yordami.md` section 4 |

## Every item, its guide and its example

| Item | Guide (how to use) | Worked Baraka example | Bad example |
| --- | --- | --- | --- |
| Results sheet generator `results-sheet/index.html` | `results-sheet/natija-varagi.qollanma.md` (also inside the page, "Qo‘llanma") | "Namuna bilan ochish" button (loads `exercises/namuna/kompaniya/kit5-pilot/numbers.md` + `plan.md`); screenshots in `results-sheet/img/` | "Yomon namuna" button (`results-sheet/namuna/yomon-numbers.md`); guide section 8 |
| Exercise 01 final numbers | In the file | In the file + `exercises/namuna/kompaniya/kit5-pilot/numbers.md` | In the file |
| Exercise 02 decision and three critics | In the file | In the file | In the file |
| Exercise 03 process #2 | In the file | `exercises/namuna/kompaniya/ikkinchi-jarayon.md` | In the file |
| Exercise 04 30-day plan | In the file | `exercises/namuna/kompaniya/30-kunlik-reja.md` | In the file |
| Exercise 05 employee growth (Kit 4 B.6) | In the file | In the file (Madina) | In the file |
| Vendor checklist tool `vendor-checklist/index.html` | `vendor-checklist/sotuvchi-tekshiruvi.qollanma.md` (short version in the page) | "Namuna bilan ochish" button; `vendor-checklist/namuna/alfa-ai-taklifi.md`; screenshots in `vendor-checklist/img/` | In the guide and the example file |
| Printable vendor checklist | `vendor-checklist/sotuvchi-tekshiruvi.md` header | as above | as above |
| Demo format | `demo-day/namoyish-formati.md` | `demo-day/namuna/baraka-namoyish.md` | `demo-day/namuna/yomon-namoyish.md` |
| 3-minute script template | `demo-day/namoyish-ssenariy.md` | `demo-day/namuna/baraka-namoyish.md` | `demo-day/namuna/yomon-namoyish.md` |
| Screen recording guide | `demo-day/ekran-yozuvi.qollanma.md` (macOS, Windows 11, iPhone, Android) | In the file (58-second Baraka recording, shot list) | In the file |
| Scoring sheets | `demo-day/baholash-varagi.md`; print `baholash-varagi.html` (2 A4 pages) | In the .md (filled table sheet) | In the .md |
| Stage host card | `demo-day/sahna-boshlovchi.md` (English) | Question list and order rules | Failure plan |
| Mentor support month | `after-the-program/mentor-yordami.md` | Sample question message; mentor's evening status message | Out-of-scope table |
| PRAKTIK hand-off | `after-the-program/praktik-hamjamiyat.md` | First post | In the file |
| Certificate wording | `after-the-program/sertifikat-matni.md` | Variant A for Rustamov S.A. | Overclaiming wording |
| Day-30 survey | `after-the-program/sorovnoma.md` (with Google Forms steps) | Filled answers | Bad questions |
| Testimonial and consent | `after-the-program/video-fikr.md` | In the file | In the file |
| Costs and upkeep card | `after-the-program/xarajatlar-kartasi.md` | Baraka monthly bills | In the file |
| Post-course homework | `homework.md` | In the file | In the file |
| Glossary | `exercises/atamalar.md` | Baraka numbers in the examples column | - |

## The Baraka Office numbers used throughout

`exercises/namuna/kompaniya/kit5-pilot/numbers.md` is the canonical Baraka Kit 5 Form B for every agent (`BARAKA-CANON.md`, "Kit 5 numbers"); other folders depend on it, so its values must not change without telling the orchestrator.
The pilot plan (`kit5-pilot/plan.md`) is Day 4's, copied, with a result section added: project lead Malika Rashidova, five success criteria, all met by these numbers.

| | Baseline | Week 1 (14-19 Dec) | Week 2 (21-26 Dec) |
| --- | --- | --- | --- |
| B.1 questions a week (6 working days) | 120 | 132 | 138 |
| B.2 minutes per question | 6 | 2.5 | 2.0 |
| B.3 wrong answers | 9 | 7 | 3 |
| B.7 checking hours | 0 | 4.5 | 2.0 |
| B.14 money found (proven) | 0 | 0 | 680,000 so'm |

Hourly rate 35,700 so'm (Madina 25,000, Malika 22,500, Jamshid 60,000, weighted by questions answered; salary / 200 hours from Baraka's 46-hour week).
Monthly tool cost 504,500 so'm (server 200,000; OpenRouter 37,000; Claude Pro 267,500 = $22.40 at 11,941.65); setup (B.10) 1,885,000 so'm; B.12 2,351,701 so'm.
Results: saved time 7.2 h/week (3.2 in week 1; illustrative split Madina 3.9, Jamshid 2.4, Malika 0.9), error rate 7.5% to 2.2%, decision "davom etish", mentor verdict "VC".
Money found: a client asked 12% on a 34,000,000 so'm order; the bot gave the rule and escalated; the head of sales allowed 10% against 100% prepayment (price list section 5): 680,000 so'm, proven for the two weeks.
Every monthly money figure (1,462,000 found, +957,500 net, payback about 2 months) is labelled an estimate («taxmin»), because it comes from one case.
Process #2, chosen on Day 6: KP tayyorlash (drafting commercial offers), with Malika Rashidova, Javohir Tursunov and Jamshid Karimov as the Kit 1 interviewees.

## Folder

```
day-6/
  README.md                  this file
  instructor-run-sheet.md    minute by minute, logistics, refund evidence, fallbacks, crosswalk
  sources.md                 fact register with sources and dates
  homework.md                post-course tasks (not among the 19 counted tasks)
  deck/                      50-slide offline web deck on the shared engine (../deck-engine/, day 1 tile design, clay objects); deck.json + assets/slides_data.js are ours, the rest is copied in by sync.py
  results-sheet/             offline one-page results sheet generator, guide, examples, images
  vendor-checklist/          offline build-vs-buy and vendor tool, printable checklist, guide, example
  demo-day/                  format, script template, recording guide, scoring sheets, host card, examples
  exercises/                 01-05 (Uzbek), glossary, Baraka worked company files in namuna/
  after-the-program/         support month, PRAKTIK, certificates, survey, testimonials, costs card
  _build/                    tests, QA scripts, generators, QA renders (regenerable)
```

## Build and checks

All scripts resolve paths relative to their own file; run them from the project root.

| Command | What it does |
| --- | --- |
| `node --test day-6/_build/tests/*.test.js` | 19 tests: Kit 5 parser on real files (kits template, bot weekly export, a `/kit5`-written file from the kits skill test, Day 2 baseline, Baraka worked files), Kit 5 formulas against the canon numbers printed in `numbers.md`, monthly money labelled as an estimate, bad-example handling, comma and dot thousands, tiny so'm amounts flagged, Uzbek number format, embedded examples in sync, no em dashes |
| `python3 day-6/_build/make_examples.py` | Embeds the Baraka and bad-example Kit 5 files into `results-sheet/assets/examples.js` (run after editing them) |
| `python3 day-6/_build/build_guide.py` | Copies `natija-varagi.qollanma.md` into the page as the in-page guide |
| `uv run --with playwright --with pypdf python3 day-6/_build/qa_results_sheet.py` | Renders the results sheet offline at 1440 px and 390 px (Baraka, bad example, stage mode, empty), prints each to A4 with the page's own margins and again with 12 mm printer margins and asserts exactly one page, checks overflow past the print box, vertical slack, fonts, console errors and network; checks that loading an owner's file after the example leaves nothing of Baraka on the sheet and that an owner's saved sheet survives the `?namuna=baraka` link; refreshes the guide images |
| `python3 deck-engine/sync.py day-6` | Copies the shared engine, fonts and the clay objects the slides name into `deck/`; `--check` fails if the copy drifted. Run after any edit to `deck/assets/slides_data.js` that adds an `art` name |
| `uv run --with playwright python3 day-6/_build/qa_deck.py` | Thin wrapper around `deck-engine/qa_deck.py`: renders all 50 slides at 1920x1080 offline; fails on clipping, overflow, missing fonts or art, network. Screenshots in `_build/qa/deck/` |
| `uv run --with pillow python3 day-6/_build/contact_sheet.py` | Contact sheets of those screenshots in `_build/qa/sheets/` |
| `uv run --with playwright python3 deck-engine/check_coverage.py day-6` | Lists slide text the engine did not draw |
| `uv run --with playwright --with pypdf python3 day-6/_build/qa_pages.py` | Vendor tool and scoring sheet at 1440 px and 390 px; scoring sheet prints to 2 A4 pages; own vendor data survives `?namuna=1` |
| `uv run --with playwright --with pillow python3 day-6/_build/render_deck_image.py` | Re-renders the slide 8 image from the Baraka results sheet and the slide 21 matrix image from Day 2's Baraka `kit2-scoring/matrix.html` (read only) |

The deck's slide-8 image (`deck/assets/img/natija-varagi-baraka*.png`) is a 2x render of the results sheet; re-render it with `render_deck_image.py` if the example changes.
The slide-21 image (`deck/assets/img/baraka-matritsa.png`) is a 2x render of Day 2's Baraka Kit 2 matrix; the same script re-renders it if Day 2 changes the matrix.

The deck was ported from the dark deck to the shared engine on 2026-11-20: same 50 slides, same order, same words (`_build/qa/text-diff.txt`; the one flagged field is a tone on slide 11, see below).
The dark deck, its QA script and its screenshots are in the 01_MD archive folder, project praktikum-3, `2026-11-20_day-6-deck`; `_build/old-shell/` and `_build/qa/old-dark/` hold the local leftovers.
Slide 11: the «To‘xtatish» box no longer has `tone: 'warn'`, because the engine strikes a warn value through and a stop decision is not a mistake.
`_build/port_art.py` is the one-off script that attached the clay objects; it is kept as a record and does not run twice.

## Dependencies on other packages (read only)

- Kit 5 and `/kit5 yakun`: `kits/` (the results sheet reads their `numbers.md` format; formulas copied, not changed).
- Pilot bot weekly export format: `pilot-template/pilot/kit5.py` (parsed, not changed).
- Mentor checks 6.1-6.9 and the tracker: `mentor-handbook/` (its Day 6 example uses a different Baraka process; see the report).
- Day 5 homework must ask for the 60-second recording and the Thursday pre-audit; told to the day-5 agent.
