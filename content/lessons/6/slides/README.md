# Day 5 class package: "Agents that work while you sleep, and get better"

Praktikum 3.0, lesson 5 ("5-dars"): Saturday 19 December (Saturday group) or Sunday 20 December 2026 (Sunday group), same content (owner decision 2026-11-03 14:30, `RULES.md`).
Baraka's worked timeline uses the Sunday group's dates; the materials say once that the Saturday group runs one day earlier.
180 minutes, 40 owners, 8 mentors.
Participant-facing material is Uzbek Latin; instructor notes, this README and the sources are English.
Curriculum of record: `final-curriculum/praktikum-3-curriculum.md`, Day 5 (lines 533-627).

Status (2026-11-03): built overnight on the `pilot-template` bot as of about 03:30; 12 package tests green; deck renders cleanly at 1920x1080 and 1440x810; every page passes offline QA at desktop, phone and projector widths.

**Owner decision (2026-11-03):** the always-on personal assistant is each participant's pilot bot on their own VPS (`decisions/04-always-on-assistant.md`, option D); Hermes stays an optional demo only.
The install card is optional reading for after the course; mentors do not support Hermes in class.
If the owner picks "Hermes core for everyone", see the run sheet's "What today must deliver".

## The idea in one paragraph

By Day 5 each owner's pilot bot has run for a week on their server, with every answer checked by a person (Day 4: `REPLY_MODE=approve`).
Baraka's worked example follows the course canon (`_build/overnight-2026-11-03/BARAKA-CANON.md`, Kit 5 numbers): week 1 (14-19 Dec) B.1 132, B.2 2.5 min, B.3 7, B.4 12, B.5 104, B.7 4.5 h, B.8 2, B.14 0; week 2 in the homework example: 138 / 2.0 / 3 / 8 / 121 / 2.0 / 1 / 680,000 so‘m; hourly rate 35,700 so‘m.
Day 5 turns that week's error log into a better agent (classify, test first, smallest fix, all tests, redeploy), gives the bot a scheduled business job and tested hand-over paths, locks it down, and fills Kit 5 B week 1 with the new "money found" line.
Every Baraka Office example is real output of the pilot-template code, run offline for two simulated weeks against fake Telegram and a rule-based fake model (`_build/sim/`), so the logs, error list, weekly file and eval scores are consistent with each other and regenerable.

## Folder map against the run of show

| Time | Segment | Material |
|---|---|---|
| Before | Mentor message Wed 16 Dec; instructor prep | `instructor-run-sheet.md` ("Before the day") |
| 0:00-0:30 | Pilot week 1 review at tables; Kit 5 B week 1 and money found | Deck 0:00-0:28; `exercises/05-kit5-b-1-hafta-va-topilgan-pul.md`; worked `exercises/namuna/kompaniya/kit5-pilot/numbers.md`; bot output `exercises/namuna/baraka-1-hafta/` |
| 0:30-1:00 | Kinds of agents: builder vs assistant, proactive, cron, memory files, Hermes, human in the loop | Deck 0:30-0:58; `demos/06-tunda-ishlaydi/`, `demos/02-ertalabki-hisobot/` (part 1), `demos/04-xotira-fayllari/`, `demos/05-hermes/` |
| 1:00-1:40 | The improvement loop (hands-on) | `demos/01-xatodan-tuzatishgacha/`; `exercises/01-...`, `02-...`, `03-...`; `exercises/namuna/yaxshilash/`; handout card |
| 1:40-1:50 | Break | Deck timer |
| 1:50-2:30 | Schedules and escalation (hands-on), permissions decision | `demos/02-ertalabki-hisobot/` (part 2), `demos/03-eskalatsiya/`; `exercises/04-jadvalga-ish-qoshish.md`, `exercises/06-eskalatsiya-va-qulf.md` |
| 2:30-2:50 | Security and data governance | `demos/07-yashirin-buyruq/`, `demos/08-bir-mahsulot-turli-nom/`; `exercises/07-xavfsizlik-va-malumot-tartibi.md`; card back page |
| 2:50-3:00 | Homework and the Day 6 mentor check | `homework.md` (also `handouts/uy-vazifasi.html` and `.pdf`) |

## Bold terms and their demos

| Bold term (curriculum) | Demo | Exercise |
|---|---|---|
| Builder vs assistant | Deck 0:31; `demos/05-hermes/`; `demos/06-tunda-ishlaydi/` | - |
| Cron job | `demos/02-ertalabki-hisobot/` | 4 |
| Escalation path | `demos/03-eskalatsiya/` | 6 |
| Test set (evals) | `demos/01-xatodan-tuzatishgacha/` | 3 |
| Prompt injection | `demos/07-yashirin-buyruq/` | 7 |
| Data governance / master data | `demos/08-bir-mahsulot-turli-nom/` | 7 |

The brief's extra terms: memory files and Soul/User/Memory (`demos/04-xotira-fayllari/`), loops and agents that improve (`demos/01`), the error log (`exercises/01`), scheduled jobs (`demos/02`, `exercises/04`).

## Every item, its guide and its worked example

| Item | Guide (Uzbek, "Qanday bajariladi") | Baraka worked example | Bad example |
|---|---|---|---|
| Exercise 1: read and classify the error log | `exercises/01-xatolar-jurnalini-oqish.md` | 6 entries classified, with margin notes; source `namuna/baraka-1-hafta/xatolar.txt` | "model zaif, kuchliroq model qo‘yamiz" |
| Exercise 2: fix instructions or data | `exercises/02-yoriqnoma-yoki-malumotni-tuzatish.md` | `namuna/yaxshilash/agent-v1/` vs `agent-v2/`, `farq.diff`, `check-eski-fayl.txt`, `ask-*.txt` | the over-broad B.4 rule (regression) |
| Exercise 3: re-run the Kit 4 test set, redeploy | `exercises/03-test-toplamini-qayta-ishga-tushirish.md` | four runs: 7/12, 9/12 (KP removed), 9/12 (regression: two old retail tests fail), 12/12 (`namuna/yaxshilash/eval-*.txt`, `.md`) | a test that checks only "so‘m" |
| Exercise 4: add a scheduled job | `exercises/04-jadvalga-ish-qoshish.md` | phone `/jadval` job and its Monday output; `schedule.toml` job "1C fayli tekshiruvi" and its week-2 runs | "world news at 7:00" and a per-person table |
| Exercise 5: Kit 5 B week 1 with money found | `exercises/05-kit5-b-1-hafta-va-topilgan-pul.md` | `namuna/kompaniya/kit5-pilot/numbers.md` (full Form B, calculations, B.13) | revenue and caught agent errors counted as money found |
| Exercise 6: escalation paths and lockdown | `exercises/06-eskalatsiya-va-qulf.md` | 5 B.6 cases via `pilot ask` (B.1 unchanged), Thursday 09:10 empty-file hand-over as the live path; stranger test | "Murakkab savollar - direktorga" |
| Exercise 7: security checklist and data check | `exercises/07-xavfsizlik-va-malumot-tartibi.md` | checklist with proof; names table incl. a real CRM vs 1C mismatch | "hammasi joyida ✅" with no proof |
| Handout: glossary (2 pages) | `handouts/lugat.html`, `handouts/pdf/lugat.pdf` (source `handouts/src/lugat.md`) | Baraka examples per term | - |
| Handout: "improve your agent in 5 steps" card, security checklist and names table on the back (2 pages) | `handouts/yaxshilash-5-qadam.html`, `.pdf` | - | - |
| Homework and Day 6 mentor check | `homework.md` | Baraka week 2 column, costs, money found, demo plan | "hammasi yaxshi", B.7 = 0, revenue as money found |
| Optional Hermes install card | `demos/05-hermes/ornatish-kartasi.md` (`.html`, `.pdf`) | `demos/04-xotira-fayllari/hermes-namuna/` | pilot token reused, staff on Hermes |
| Memory-files one-pager | `demos/04-xotira-fayllari/xotira-fayllari.md` | Baraka `memory.md` before/after, `/eslab_qol` in week 2 | wishes instead of facts |
| Names table (master data) | `demos/08-bir-mahsulot-turli-nom/nomlar-jadvali.md` | Optima, Senator Lux, Start, Ziyo Ta'lim | - |
| Injection page and simulated result | `demos/07-yashirin-buyruq/script.md` | `yetkazib-beruvchi-narxlari.html`, `natija.md` | the no-rule bot in `natija.md` |
| Printable exercises | `exercises/html/`, `exercises/pdf/` (built from the `.md`) | - | - |

## Files

```
day-5/
  README.md                    this file
  instructor-run-sheet.md      minute by minute, prep, fallbacks (English)
  homework.md                  homework, good and weak examples, Day 6 mentor check (Uzbek)
  sources.md                   fact register with sources and dates
  deck/                        41 slides, offline, shared engine in the day 1 tile design (deck.json + assets/slides_data.js are this day's; index.html, deck.css, deck.js, fonts, img/art-*.webp are copied by ../deck-engine/sync.py; P notes, G grid, T timer, C copy prompt)
  demos/01..08/                script.md per demo (English with UZ lines) + assets
  exercises/01..07-*.md        participant exercises (Uzbek); html/ and pdf/ are built from them
  exercises/namuna/            Baraka worked examples (baraka-1-hafta/, baraka-2-hafta/, yaxshilash/ are generated)
  handouts/                    glossary and 5-step card (src/*.md -> .html -> pdf/)
  assets/                      page.css and fonts for the printable pages
  _build/                      scripts, tests, QA output, work copies (regenerable)
```

## Build and checks

All scripts resolve paths from their own file; run from the project root.

| Command | What it does |
|---|---|
| `uv run --no-project --with httpx --with openpyxl --with python-dotenv --with tzdata python day-5/_build/sim/simulate.py` | Copies `pilot-template` to `_build/work/app`, rolls the agent back to the go-live version, runs week 1 (14-19 Dec; the journal records wrong answers as ❌ presses, as in `pilot-template/samples/kit5-2-hafta.md`, although the story says Malika approved drafts), the Day 5 loop on Sunday 20 Dec and week 2 (21-26 Dec) on a simulated clock against fake Telegram/OpenRouter on 127.0.0.1, and writes `exercises/namuna/baraka-*`, `exercises/namuna/yaxshilash/`, `demos/06-tunda-ishlaydi/tungi-xronologiya.md`, `demos/07-yashirin-buyruq/natija.md`. About 10 seconds; no network (socket guard), no keys. |
| `... python day-5/_build/sim/live_eval.py v1\|kp\|regressiya\|v2 [eski-fayl] eval\|ask "..."\|check` | Offline live demo: the real `pilot` CLI at one stage of the loop against the fake model. |
| `uv run --no-project --with pytest --with httpx --with openpyxl --with python-dotenv --with tzdata python -m pytest day-5/_build/tests -q` | 12 tests: reruns the simulation and checks every number the materials quote, plus house rules (no dashes, one sentence per line, no absolute paths, no secrets, Hermes memory limits, every run-of-show block has its material). |
| `uv run --with playwright python3 day-5/_build/deck/qa_deck.py [--slides 4,9]` | Runs the shared `deck-engine/qa_deck.py` on this deck: every slide at 1920x1080 offline in the installed Chrome, fails on clipping, overflow, missing fonts or art, network requests; screenshots in `_build/qa/deck/`. |
| `uv run --with pillow python3 day-5/_build/deck/contact_sheet.py` | Contact sheets from those screenshots: `_build/qa/sheets/sheet-N.png`. |
| `python3 deck-engine/sync.py day-5` (from `praktikum-3/`) | Copies the engine and the art the slides name into `deck/`; `--check` fails if the copy drifted. Run after any change to `deck.json` or to `art` fields. |
| `python3 deck-engine/text_diff.py <archived slides_data.js> day-5/deck/assets/slides_data.js` | Proves the 2026-11-20 port changed no words; result kept in `_build/qa/text-diff.txt`. |
| `uv run --no-project --with markdown --with playwright python3 day-5/_build/build_docs.py` | Markdown to HTML and A4 PDF for handouts, homework, exercises and two demo pages. |
| `uv run --no-project --with playwright python3 day-5/_build/qa_pages.py` | Offline QA of every HTML page at 1440, 390 and 1920 px. |

## Dependencies on other folders (read only)

- `pilot-template/` (copied at run time; if it changes, rerun the simulation and the tests, which name the number that moved).
- `kits/` (Kit 5 labels, `/kit5` modes), `mentor-handbook/day-5.md`, `day-6.md` (check codes), `decisions/04-always-on-assistant.md`, `department-labs/*` (job ideas, HR roster, CRM and 1C names), `deck-engine/` (shared deck engine and porting guide; the dark deck used until 2026-11-20 is archived under the 01_MD archive folder, project praktikum-3, `2026-11-20_day-5-deck`), `day-3/` (page builder and stylesheet, copied).
- `praktikum-2/day-4/live-demo/hermes-qanday-ishlaydi.png` copied as the Hermes fallback picture.
