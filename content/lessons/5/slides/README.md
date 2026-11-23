# day-4: lesson 4 class package

Praktikum 3.0, lesson 4 ("4-dars"): "Ship it, prepare the people, plan the pilot".
Saturday 12 December (Saturday group) or Sunday 13 December 2026 (Sunday group), same content (owner decision; `sources.md` F2).
Built overnight 2026-11-03 by the day-4 agent; report: `../_build/overnight-2026-11-03/reports/day-4.md`.

Goal: every owner leaves with the pilot bot (the "personal AI assistant" of the sales page) running 24/7 on their own server, controlled from the phone with the laptop closed (mentor code 4.7), plus a Kit 5 A pilot plan and Kit 4 A and B for each affected employee, so the pilot can go live on Monday 14 December after the staff conversations.
The deploy path is the pilot template's `deploy/deploy.py`; this package adds no other deploy path, only an optional domain tool for the HTTPS extension.

Participant-facing material is Uzbek Latin; instructor notes, this README and the build scripts are English.

## Map against the run of show

| Time | Segment (curriculum) | Deck slides | Instructor | Participants | Demo |
|---|---|---|---|---|---|
| Wed 9 Dec | Pre-class | - | Run sheet "Before the day" | `exercises/00-dars-oldidan.md` (SSH check, `deploy.py setup`, GitHub and `gh`, optional A record) | - |
| 0:00-0:20 | v0 round | 1-6 | `instructor-run-sheet.md` | Mentor codes 4.1-4.5 (`mentor-handbook/day-4.md`) | - |
| 0:20-0:50 | Where software lives | 7-22 | Talk + five demos | - | `demos/01` (0:21, 0:33), `demos/02` (0:28), `demos/03` (0:36), `demos/04` (0:43) |
| 0:50-1:05 | Deploy: GitHub backup | 23-24 | Hard stop at 1:05 | `exercises/01-github-zaxira.md` | - |
| 1:05-1:30 | Deploy the pilot | 25-28 | Live board, triage | `exercises/02-serverga-joylash.md` | - |
| 1:30-1:40 | Laptop test, logs, domain or bot | 29-31 | Count 4.7 | `exercises/02` steps 4-5, `exercises/03-domen-va-https.md` (extension) | - |
| 1:40-1:50 | Break | 32 | - | - | - |
| 1:50-2:20 | Kit 5 A: pilot plan | 33-39 | - | `exercises/04-kit5-sinov-rejasi.md` | - |
| 2:20-2:50 | Kit 4: people | 40-46 | Role-play | `exercises/05-kit4-xodimlar.md`, `exercises/06-suhbat-mashqi.md` | `demos/05` (2:21) |
| 2:50-3:00 | Homework | 47-51 | - | `homework.md` (mentor check for Day 5 at its end) | - |

## Bold terms and where each is taught

| Curriculum term (bold) | Slide | Demo or exercise |
|---|---|---|
| Local vs server | 8-9 | Demo 01 part A (lid closed, bot dies) and part B (same bot from the server) |
| VPS | 10 | Demo 02 (deploy to the VPS); exercise 02 |
| IP address, domain, DNS | 16-17 | Demo 03: one diagram (`demos/03-domen-dns-https/diagramma.html`), padlock on the phone; exercise 03 |
| Git, commit, push | 18-19 | Demo 04 (rollback and `git restore`); exercise 01 |
| Pilot | 34 | Exercise 04 (Kit 5 A) |
| Success criteria / stop condition | 35-37 | Exercise 04; `/stop` tried in exercise 02 step 4 |
| Upgrade, not replace | 40-43 | Demo 05 (role-play); exercises 05-06 |

Also asked for in the brief: HTTPS/SSL (slides 16-17, demo 03, exercise 03), deploy to a VPS (slides 12-14, demo 02, exercise 02), keeping it running 24/7 (slide 14: systemd restart and reboot, recorded in `natijalar/07-qulash.txt` and `08-qayta-yuklash.txt`), logs (slide 20, exercise 02 step 5), GitHub (slides 18 and 24, exercise 01).
Non-bold terms (SSH, subdomain, Nginx, uptime, environment variables, staging, rollback, Remote Control, baseline, limited permissions) are in the glossary handout.

## Every item, its guide and its example

| Item | What it is | Guide (Uzbek) | Worked example | Bad example |
|---|---|---|---|---|
| `deck/index.html` | 51 slides, 1920x1080, offline (fonts bundled), notes in English (P), timers (T), copy the prompt (C). Since 2026-11-20 on the shared light engine (`../deck-engine/`, day 1 tile design): edit only `deck/deck.json` and `deck/assets/slides_data.js`; `index.html`, `deck.css`, `deck.js`, fonts and `img/art-*.webp` are copies written by `python3 deck-engine/sync.py day-4` | - | Baraka throughout | Slides 37 (plan), 43 (words) |
| `instructor-run-sheet.md` | Minute by minute, parallel deploys, "No server yet" procedure, fallbacks | - | - | - |
| `demos/01-noutbuk-testi/` | Laptop test script; phone screenshots for the fallback | `ssenariy.md` | `telefon-egasi.png`, `telefon-egasi-qisqa.png` | - |
| `demos/02-deploy-jonli/` | Live deploy script, crash demo | `ssenariy.md` | `exercises/namuna/natijalar/03-deploy.txt`, `07`, `08` | - |
| `demos/03-domen-dns-https/` | The one diagram (HTML and PNG) and its script | `ssenariy.md` | `diagramma.html` | - |
| `demos/04-rollback/` | Break, rollback, git restore | `ssenariy.md` | `natijalar/09-rollback.txt` | - |
| `demos/05-madina-suhbati/` | Kit 4 conversation role-play, mentor card, debrief | `ssenariy.md` | The dialogue itself | Exercise 06 "Yomon namuna" |
| `exercises/00-dars-oldidan.md` | Wednesday message: SSH, setup, GitHub, A record, what to do if the server is not ready | itself | `natijalar/00-ssh-ok.txt`, `01-setup.txt` | Error table |
| `exercises/01-github-zaxira.md` | Private repo with `app/` only | itself | `natijalar/11-git.txt` | Public repo with `.env` and interviews |
| `exercises/02-serverga-joylash.md` | `.env` check, `env`, deploy, laptop test, logs | itself | `natijalar/02`-`06`, `telefon-egasi.png` | Password in chat, `nohup` deploy |
| `exercises/03-domen-va-https.md` | Bot path, or subdomain with HTTPS | itself | `natijalar/10-sayt-test.txt`, `10b-sayt-dns-tayyor-emas.txt` | A-record and folder mistakes table |
| `exercises/vositalar/sayt.py`, `sayt-sozlash.sh` | Domain tool (Caddy, Let’s Encrypt) next to `deploy.py` | `sayt.qollanma.md` (+ `.html`) | Baraka `forma.barakaoffice.uz` | Error table |
| `exercises/04-kit5-sinov-rejasi.md` | Kit 5 A on Baraka, then own company | itself | `namuna/kompaniya/kit5-pilot/plan.md` (margin notes, plan to `.env` mapping) | `namuna/yomon/plan-yomon.md` (with answers) |
| `exercises/05-kit4-xodimlar.md` | Kit 4 A and B, commitment update | itself | `namuna/kompaniya/kit4-people/form-a-skills-map.md`, `madina-form-b.md` (with the 15-minute plan) | `namuna/yomon/kit4-yomon.md` (with answers) |
| `exercises/06-suhbat-mashqi.md` | Pair role-play, cards, mentor checklist | itself | Demo 05 dialogue | Corridor version and its fix |
| `exercises/mashqlar.html` | All exercises in one printable page (generated) | - | - | - |
| `exercises/namuna/natijalar/` | Real outputs of every command, Ubuntu 24.04 test container | - | 24 files | `x1`-`x7` failure outputs |
| `handouts/lugat.*` | Glossary, 7 bold terms plus reference | itself | - | - |
| `handouts/assistent-ishlamayapti.*` | "My assistant is down" card | itself | Messages from the test run | - |
| `handouts/server-xavfsizligi.*` | Passwords, keys, updates, ports, money, data law | itself | - | "Do / don’t" table |
| `homework.md` (+ `handouts/uy-vazifasi.*`) | Conversations, go-live with `REPLY_MODE=approve`, error log, week 1 column; mentor check 5.1-5.5 | itself | Baraka week | Weak example |
| `sources.md` | Fact register F1-F29 with dates | - | - | - |

## Build and verify

All scripts resolve paths relative to their own file and use the installed Google Chrome; none needs real keys.

| Script | Does | Writes |
|---|---|---|
| `_build/sandbox/make_sandbox.py` | Copies `pilot-template` (read only) into a participant-like `work/kompaniya/app/`, adds the domain tools | `_build/sandbox/work/` |
| `_build/sandbox/run_day4.py` | The whole owner flow against a fresh Ubuntu container (Docker, systemd, SSH) with fake Telegram and OpenRouter: 30 checks, including the owner's assistant commands and a reminder firing on the server | `exercises/namuna/natijalar/*.txt`, `_build/sandbox/out/result-ubuntu-*.md` |
| `_build/tests/test_sayt.py` | 18 offline tests of the domain tool (`uv run --with pytest python -m pytest day-4/_build/tests`) | - |
| `_build/make_phone.py` | Phone screenshots from the recorded transcripts | `deck/assets/img/telefon-*.png`, `demos/01-noutbuk-testi/*.png` |
| `_build/diagram/build_diagram.py` | The DNS/HTTPS diagram from `dns.svg` (dark for the demo page, re-skinned light for the deck) | `demos/03-domen-dns-https/diagramma.*`, `deck/assets/diagram_dns.js` |
| `_build/build_docs.py` | Markdown to HTML and A4 PDF (copied from Day 2) | `handouts/*.html`, `handouts/pdf/*.pdf`, `exercises/mashqlar.html`, `exercises/vositalar/sayt.qollanma.html` |
| `_build/make_dist.py` | Zip for the Wednesday table-chat message | `_build/dist/4-dars-materiallar.zip` |
| `_build/deck/qa_deck.py` | Wrapper for `deck-engine/qa_deck.py`: renders all slides at 1920x1080 offline, fails on overflow, clipping, missing fonts or art, network use | `_build/qa/deck/` |
| `_build/deck/contact_sheet.py` | Wrapper for `deck-engine/contact_sheet.py`: 3x3 overview sheets from the QA screenshots | `_build/qa/sheets/` |
| `python3 deck-engine/sync.py --check day-4` (from `praktikum-3/`) | Fails if the engine copy in `deck/` differs from `deck-engine/` | - |
| `_build/deck/compress_d4_art.py` | Compresses the three day 4 clay objects (laptop, clock, door) into `deck-engine/art/` | `deck-engine/art/art-d4-*.webp` |
| `_build/deck/outline.js` | Prints layout, title and art per slide (node) | - |
| `_build/qa_pages.py` | Renders every HTML page at 1440 and 390 px | `_build/qa/pages/` |
| `_build/check_text.py` | House rules: no dashes, no Cyrillic, Uzbek apostrophes, no English possessive after o/g | - |

Order after any change: `make_sandbox.py`, `run_day4.py`, `make_phone.py`, `build_diagram.py`, `build_docs.py`, `make_dist.py`, `deck-engine/sync.py day-4`, `qa_deck.py`, `contact_sheet.py`, `qa_pages.py`, `check_text.py`.
The dark deck this one replaced is archived under the 01_MD archive folder, project praktikum-3, `2026-11-20_day-4-deck`.
