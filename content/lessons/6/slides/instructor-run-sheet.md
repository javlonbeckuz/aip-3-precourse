# Day 5 instructor run sheet

Praktikum 3.0, lesson 5 ("5-dars"): "Agents that work while you sleep, and get better".
Saturday 19 December (Saturday group) or Sunday 20 December 2026 (Sunday group): same run of show (owner decision 2026-11-03 14:30, `sources.md` S1).
Baraka's worked timeline uses the Sunday group's dates; with the Saturday group say once that for them everything happens one day earlier.
Saturday is a working day for the bots (`WORK_DAYS=1-6`): in the Saturday group, test messages to staff arrive during class, so warn staff beforehand; in the Sunday group they wait until Monday 09:00.
180 minutes, one 10-minute break, 40 owners and 8 mentors (one mentor per table of 5).
Source of record: `final-curriculum/praktikum-3-curriculum.md`, section "Day 5" (lines 533-627).
Instructor notes are in English; lines marked UZ are said to the room in Uzbek, close to verbatim.

## What today must deliver

By Day 5 every owner's pilot bot (the `pilot-template` bot, adapted on Day 3 and deployed on Day 4) has run for about a week on their server, with every answer checked by a person (Day 4: `REPLY_MODE=approve`).
Baraka's worked example is the course canon (`BARAKA-CANON.md`, Kit 5 numbers): week 1 = 14-19 Dec, B.1 132, B.3 7, B.5 104, B.7 4.5 h, B.14 0; Malika approved every draft and reviewed the ❌ list daily, as in `day-6/exercises/namuna/kompaniya/kit5-pilot/numbers.md`.
Today turns that week of logs into a better agent: read the error log, find the cause, fix the instructions or the data, re-run the test set, redeploy.
Then the bot gets a scheduled business job and tested hand-over paths, and the owner leaves with a filled Kit 5 B week 1 column, including the new "money found" line.

The sales page promises "Shaxsiy AI assistent" that keeps working with the computer off and is controlled from the phone (`sources.md` S2).
Say plainly today: the assistant is the bot you built for your own process; it runs on your server, reports to your phone at 9:00 and hands hard cases to the right person.
Hermes is shown as a 6-minute demo only (owner decision 2026-11-03: `decisions/04-always-on-assistant.md`, option D; the assistant every participant gets is their pilot bot on their own VPS).
Mentors do not install or support Hermes in class; the install card is optional reading for after the course.

Three things every owner has at 3:00, each with a mentor check code (`mentor-handbook/day-5.md`):

| Output | Check code |
| --- | --- |
| Every error log entry fixed, a test per error, all tests green, redeployed | 5.6 |
| A first scheduled message on the phone (daily report or own business job) | 5.7 |
| Every Kit 3 B.6 hand-over tested once, the bot silent to a second account, security checklist ticked | 5.8, 5.9, 5.10 |

## Files you need open

| What | Path | When |
| --- | --- | --- |
| Deck (P notes, T timers, G grid, F fullscreen) | `deck/index.html` | All day |
| Exercises 01-07 (Uzbek, one file each) | `exercises/` | Hands-on blocks |
| Baraka week 1 logs, error list, weekly file | `exercises/namuna/baraka-1-hafta/` | 0:03, 0:35, 1:00 |
| Baraka improvement loop: v1/v2 agent files, diff, four eval runs | `exercises/namuna/yaxshilash/` | 1:00 |
| Baraka Kit 5 B week 1, filled | `exercises/namuna/kompaniya/kit5-pilot/numbers.md` | 0:03, 2:50 |
| Demo scripts 01-08 | `demos/` (one folder each, `script.md` inside) | see run of show |
| Handouts: glossary, "improve your agent in 5 steps" card with the security checklist on the back | `handouts/` (`.html` and `.pdf`) | 0:30, 1:10, 2:40 |
| Homework with good and weak examples, mentor check for Day 6 | `homework.md` | 2:50 |
| Mentor sheet, codes 5.1-5.11 | `mentor-handbook/day-5.md` (mentor-handbook agent) | All day |
| Kit 5 form and `/kit5` skill (`hafta 1`, `xato`) | `kits/KIT_05_Sinov_va_hisob_UZ_LATN.md`, `kits/skills/kit5/` (kits agent) | 0:03, 1:15 |
| The pilot bot (participants' copy is in `kompaniya/app/`) | `pilot-template/` (pilot-template agent): `CLAUDE.md` "5-darsdagi yaxshilash halqasi", `PARTICIPANT_GUIDE.uz.md` section 3 | All day |

## Before the day

### Wednesday 16 December (mentors, in the table chats)

- Ask every owner to send `/hafta` and `/xatolar` to their bot and post a screenshot of the error list (no staff names in the screenshot).
- Mentors mark three groups in the tracker: pilot live with errors logged; live but empty error log; not live.
  Anyone not live by Wednesday gets a 20-minute call with their mentor on Thursday (Day 4 deploy guide, `pilot-template/deploy/deploy.qollanma.md`).
- Each mentor picks one volunteer per table to present "the worst mistake and what caused it" at 0:18 (75 seconds, no names of staff or customers).

### Two days before (instructor, about 2 hours)

1. Run the offline simulation and confirm it still matches the materials:
   `uv run --no-project --with httpx --with openpyxl --with python-dotenv --with tzdata python day-5/_build/sim/simulate.py`, then `uv run --no-project --with pytest python -m pytest day-5/_build/tests -q`.
   The tests check that the numbers quoted in the exercises (week 1: 132 requests, 7 errors, 104 resolved; eval runs 7/12, 9/12, 9/12, 12/12) still come out; if the pilot template changed, they fail and tell you which file to update.
2. Prepare your own Baraka demo bot from `pilot-template` with real keys (an OpenRouter key with a $5 limit), deployed to your VPS, in approve mode, for the live demos at 1:00 and 1:50.
   Copy `exercises/namuna/yaxshilash/agent-v1/*` into its `agent/` folder and `test-set-v1.toml` into `evals/test-set.toml`, so the live loop starts from the same "before" state as the handout.
   Run `uv run pilot eval` once with the real model and write the result next to the fake one in your notes: real models fail different tests (the fake model is rules, see `_build/sim/brain.py`).
3. Hermes (only for the 0:52 demo): use the head mentor's pinned install on a separate VPS user, with its own Telegram bot (never the pilot's token), SOUL.md and AGENTS.md about Baraka, and one cron job "every working day 9:00, three lines from ~/biznes/hisobot.md".
   Record `hermes --version` in `demos/05-hermes/script.md`; Hermes shipped 9 releases between 8 Oct and 2 Nov (`sources.md` S9), so test it the day before, not the week before.
4. Injection demo: open `demos/07-yashirin-buyruq/yetkazib-beruvchi-narxlari.html` in a browser, check that the hidden line is invisible, and try it once in claude.ai with the prompt in `demos/07-yashirin-buyruq/script.md`.
   Write down what the model did; current models often notice and refuse, which is fine (see the script).
5. Print one handout set per person: glossary (2 pages) and the 5-step card (2 pages, security checklist on the back).

### Morning of the day (30 minutes before doors)

- Deck open from the local file, Wi-Fi off once, check that fonts load and every slide renders (press G).
- Your phone: demo bot chat open, Hermes chat open, screen mirroring tested.
- Terminal: your demo bot folder, `uv run pilot check` green, and a second tab in `day-5/exercises/namuna/yaxshilash/` for the fallback files.

## Run of show, minute by minute

Times are from the start of the lesson.
"Deck" refers to slide segment times shown in the deck's grid view (G).

### 0:00-0:30 Pilot week 1 review (tables)

| Time | Who | What | Material |
| --- | --- | --- | --- |
| 0:00-0:03 | Instructor | Opening: three outputs by 3:00; the bot is the assistant the course promised. UZ: «O‘tgan hafta botingiz siz uxlaganda ham ishladi. Bugun uning xatolaridan uni yaxshiroq qilamiz.» | Deck 0:00-0:02 |
| 0:03-0:18 | Mentors at tables | Codes 5.1-5.5. Each owner: `/hafta` and `/xatolar` on the phone; fill Kit 5 B week 1, including B.7 checking hours and the B.14 money-found line (exercise 5). Mentor asks every empty log: «Hech kim hech narsa topmadimi yoki hech kim tekshirmadimi?» | `exercises/05-...md`, namuna `numbers.md` |
| 0:03-0:18 | Instructor | Walk the tables; confirm the 8 presenters; note two money-found claims to use at 2:50 (one good, one weak). | - |
| 0:18-0:28 | One owner per table | 75 seconds each: worst mistake, what caused it, what they think the fix is. Instructor writes each on the whiteboard under one of five headings: fakt, yo‘riqnoma, ma’lumot, shakl, agent xatosi emas. | Deck 0:18 (the five baskets) |
| 0:28-0:30 | Instructor | Read the board: most errors are facts and data, not intelligence. UZ: «Ko‘ryapsizmi: xatolarning ko‘pi model aqlsizligidan emas, u bilmagan fakt yoki eski fayldan.» | Deck 0:28 |

### 0:30-1:00 Kinds of agents (talk + demo)

| Time | What | Bold term | Material |
| --- | --- | --- | --- |
| 0:30-0:35 | Builder vs assistant: Claude Code builds and repairs; the bot on the server serves you and your staff every day. The sales page's "shaxsiy AI assistent" is this bot. | **Builder vs assistant** | Deck 0:30-0:33 |
| 0:35-0:41 | Demo 6, "while you slept": the Baraka pilot from real logs. 46 messages the bot sent on its own in 13 days, 19 of them outside working hours: 08:30 low stock, 09:00 report, an empty 1C file at 08:00 on Thursday (the 09:10 stock question went to Jamshid aka, not «0 dona»), a Saturday 18:40 tender held until Monday 09:00. | Proactive agent | `demos/06-tunda-ishlaydi/` |
| 0:41-0:46 | Cron, the idea: "every working day at 9:00". Three places it lives: `DAILY_REPORT_TIME`, `agent/schedule.toml`, `/jadval` from the phone (and a server crontab line for lab skills). | **Cron job** | Deck 0:41, demo 2 part 1 |
| 0:46-0:52 | Memory files: the pilot's `instructions.md`, `examples.md`, `memory.md` and phone facts (`/eslab_qol`) next to Hermes's SOUL.md, AGENTS.md, USER.md, MEMORY.md. Memory limits on purpose (Hermes: 2,200 and 1,375 characters). | Memory files, memory limits | `demos/04-xotira-fayllari/` |
| 0:52-0:58 | Demo 5, Hermes as a business job: your pinned Hermes in Telegram answers from AGENTS.md, shows its 9:00 cron, remembers a fact. Close: «Bu ixtiyoriy. Kursda hamma uchun yordamchi - o‘z botingiz.» Hermes is an optional demo only (owner decision): say the install card is optional reading for after the course and that mentors do not support Hermes in class. | Builder vs assistant (again) | `demos/05-hermes/` |
| 0:58-1:00 | Human in the loop, multi-agent, model per agent: one slide, no demo. | - | Deck 0:58 |

### 1:00-1:40 The improvement loop (hands-on)

| Time | Who | What | Material |
| --- | --- | --- | --- |
| 1:00-1:10 | Instructor, live | Demo 1: Baraka's week-1 errors from `/xatolar` to green tests: reproduce with `pilot ask`, classify (7 entries, 4 causes), write the tests first (red, 7/12, including the Day 3 warranty test nobody re-ran after the KP was added), remove the KP source and add one `memory.md` line (9/12), an over-broad B.4 rule «har doim ulgurji» (9/12 again, but two old retail tests now fail: the regression), the precise B.4 rule and two examples (12/12), the data-freshness fix last (`pilot check`, `pilot ask`), then `deploy.py`. | `demos/01-xatodan-tuzatishgacha/` |
| 1:10-1:15 | Owners | Exercise 1: classify their own errors into the five baskets with the 5-step card. | `exercises/01-...md`, handout card |
| 1:15-1:35 | Owners, mentors | Exercises 2 and 3: smallest fix, one test per error, `pilot eval`, redeploy. Mentors redirect: «Skrinshot qilib Claude’dan so‘radingizmi?» | `exercises/02-...md`, `03-...md` |
| 1:35-1:40 | Instructor | Hands up: all tests green? Count it out loud and write it on the board. Two owners say in one sentence what they changed. | Deck 1:35 |

### 1:40-1:50 Break

Mentors use the break for anyone whose bot is down (see fallbacks).

### 1:50-2:30 Schedules and escalation (hands-on)

| Time | Who | What | Material |
| --- | --- | --- | --- |
| 1:50-1:57 | Instructor, live | Demo 2: `/jadval 09:05 ...` from the phone; show the Baraka `schedule.toml` job "1C fayli tekshiruvi" and its test run. Demo 3: the empty 1C file of Thursday 17 Dec: alert at 08:00, stock question handed to the head of sales instead of "0 dona". | `demos/02-ertalabki-hisobot/`, `demos/03-eskalatsiya/` |
| 1:57-2:15 | Owners | Exercise 4: one own business job that answers from their data; test it with `pilot job "<nom>"` (Sunday group: a staff recipient gets it on Monday; Saturday group: during class, within working hours). | `exercises/04-...md` |
| 2:15-2:27 | Owners | Exercise 6: every Kit 3 B.6 case once with a fake question through `pilot ask` (B.1 stays clean); the live path once through the bot if no real hand-over happened this week; a second account gets only its ID. | `exercises/06-...md` |
| 2:27-2:30 | Mentors | Code 5.11: permissions decision with each owner: every answer still checked (`REPLY_MODE=approve` stays), or loosen one step (Baraka: partial direct mode from week 2: price and stock answers go direct; discount and delivery-date answers are still 100% approved by Malika; tender, discounts above 5% and fast delivery still go to the ROP). How: `REPLY_MODE=topics` in `.env` and `direct_topics = ["narx", "qoldiq"]` in `agent/approval.toml`, then `deploy.py deploy` and `deploy.py env`; or from the phone `/darhol narx qoldiq` (`/darhol` shows the mode, `/darhol standart` goes back to `.env`). Anything unlisted or unclear still goes to approval. Switch it on only if A.7 never fired and every week-1 error has a fix and a passing test (`app/agent/approval.qollanma.md`). Only what was agreed with the department head. | `mentor-handbook/day-5.md` |

### 2:30-2:50 Security and data governance (talk + checklist)

| Time | What | Bold term | Material |
| --- | --- | --- | --- |
| 2:30-2:36 | Demo 7: a supplier price page with a hidden instruction; ask a chat model to summarise it; then show why the pilot treats data as data, and the rules that matter more than any prompt: no payment or customer-messaging power, bot locked to IDs, spending limit. | **Prompt injection**, bot lockdown, guardrails | `demos/07-yashirin-buyruq/` |
| 2:36-2:40 | Demo 8: one product, four names (price list, 1C, staff slang, a second colour code), and one customer with two names in CRM and 1C. | **Data governance / master data** | `demos/08-bir-mahsulot-turli-nom/` |
| 2:40-2:50 | Exercise 7 with mentors: the 9-point checklist with proof on screen; a names table. | Audit trail (the journal) | `exercises/07-...md`, card back |

### 2:50-3:00 Homework

| Time | Who | What |
| --- | --- | --- |
| 2:50-2:56 | Instructor | `homework.md`: pilot week 2 with the improved agent; week 2 column with B.7, in `numbers.md` by Thursday evening (mentor pre-audit 24-26 Dec, about 20 minutes per owner); costs B.9-B.12; money found with a source per amount (Baraka: 0 in week 1, 680,000 so‘m in week 2); a 3-minute demo plus a 60-second screen recording and one Kit 5 B screenshot to the table mentor by Saturday 26 Dec 18:00. Show the weak money-found example from the tables (anonymised) next to the Baraka good one. |
| 2:56-3:00 | Mentors | Last 10 minutes rule: each owner says their homework and their next blocker; codes 5.6-5.11 into the tracker. |

## Fallbacks

| Situation | Signal | What to do |
| --- | --- | --- |
| A participant's bot is down | `/holat` gets no answer; mentor code 5.4 fails | Mentor, 5 minutes max: `uv run python deploy/deploy.py status`, then `logs`; usual causes: a `.env` change not sent (`deploy.py env`), the same token running on the laptop (409 Conflict), the server out of disk. Not fixed in 5 minutes: do the loop on the laptop (`pilot ask` and `pilot eval` need no server), deploy at home, note the blocker in the tracker. |
| No errors were logged | Empty `/xatolar` | Ask who checked. Then: 10 real questions from last week through `uv run pilot ask`, the owner judges each; any wrong answer becomes the first error log entry and a test. If everything is right, practise exercise 1 on the Baraka log (`exercises/namuna/baraka-1-hafta/xatolar.txt`) and agree who checks in week 2. |
| A pilot never went live | Code 5.2 fails, no `/hafta` file | At 1:00 that owner deploys with the mentor instead of the loop (Day 4 guide), go-live in approve mode today; tell the instructor at the break. Their Day 6 will have one week of data: say so honestly in the demo; the pilot-length decision memo covers a January results night (`decisions/06-pilot-length.md`). Record the task status honestly in the tracker (refund guarantee evidence). |
| Venue Wi-Fi or projector fails | - | Deck and every demo fallback work offline from files. Participants' bots need internet: phone hotspots for the evals. If there is no internet at all, do exercises 1, 5 and 7 first (files only) and the evals at home. |
| OpenRouter limit reached during evals | "xarajat limiti tugagan" in `pilot eval` | Raise the key's limit on openrouter.ai, or run only the new tests (`pilot eval --only id1,id2`), then the full set at home. |
| Live demo 1 behaves differently with the real model | A test passes that the handout shows failing | Say it: "real models make different mistakes; the method is the same", then show the recorded runs in `exercises/namuna/yaxshilash/eval-*.txt`. |
| Hermes demo fails | Bot silent, install broken | Do not debug on stage. Show `demos/05-hermes/fallback/` (the 2.0 "how Hermes works" picture and the memory-file examples) and move on; 2.0 lost half a day to Hermes setup (`sources.md` S8). |
| Injection demo: the model refuses | It flags the hidden line | That is a good outcome: "modern models often resist, but you cannot rely on it"; show the simulated before/after in `demos/07-yashirin-buyruq/natija.md`. |
| Hand-over tests do not reach staff | Bot says "ish vaqtida javob beradi" | Expected in the Sunday group: `WORK_DAYS=1-6`, staff get bot messages from Monday 09:00. For the B.6 cases `pilot ask` («ODAMGA: ...») is the evidence; if the live path was not exercised by a real hand-over this week, the mentor confirms Monday's delivery in the chat. |
| "Buni Gemini ham qiladi" | A participant challenges the value | Answer with their own numbers: "Gemini 1C faylingizni har kuni 8:30 da o‘qiydimi va xatoni Jamshid akaga uzatadimi?" (`mentor-handbook/blockers-faq.md` J-05). |
