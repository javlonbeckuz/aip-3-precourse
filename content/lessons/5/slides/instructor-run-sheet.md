# Day 4 instructor run sheet

Praktikum 3.0, lesson 4 ("4-dars"): "Ship it, prepare the people, plan the pilot".
Saturday 12 December (Saturday group) or Sunday 13 December 2026 (Sunday group), same content (owner decision, RULES.md "Owner decisions, 2026-11-03 14:30"; `sources.md` F2).
**Saturday group:** Saturday 12 December is an official working day in Uzbekistan (the rest day is moved to 31 December), so expect late arrivals and absences; mentors confirm attendance on Friday evening, start at 0:00 with whoever is there, and give absent owners the recorded lesson plus a 48-hour call for the deploy.
180 minutes, one 10-minute break, 40 owners and 8 table mentors (one per table of 5) plus a head mentor who does not run a table.
Source of record: `final-curriculum/praktikum-3-curriculum.md`, section "Day 4"; mentor checks and FAQ codes: `mentor-handbook/day-4.md`, `mentor-handbook/blockers-faq.md`.
Instructor notes are in English; lines marked UZ are said to the room in Uzbek, close to verbatim.

## What today must deliver

The sales page promises, for lesson 4: "Yordamchi kompyuteringiz o‘chiq bo‘lsa ham ishlab turadi, telefoningiz orqali boshqara olasiz" (`sources.md` F1).
Decision memo 04 makes the owner's pilot bot that "personal AI assistant" (`decisions/04-always-on-assistant.md`).
So the one number that matters today is **mentor code 4.7 for 40 of 40 owners**: laptop closed, the owner messages the bot from the phone, the answer comes from the server, and `/stop` and `/davom` work from the phone.
Everything else (GitHub, domain, Kit 5 A, Kit 4) is important, but a missed 4.7 is a broken promise and is reported to the organiser the same evening.

Second priority: the order of the week.
Owners leave knowing that the Kit 4 conversation happens **before** staff are added to the bot, and that week one runs with `REPLY_MODE=approve` (curriculum: "Order matters").

## Files you need open

| What | Path | When |
| --- | --- | --- |
| Deck (P for notes, T for timers, G for the slide list) | `deck/index.html` | All day |
| Pre-class message and zip for the table chats (Wednesday 9 Dec) | `exercises/00-dars-oldidan.md`, `_build/dist/4-dars-materiallar.zip` | Before class |
| Demo 01 laptop test | `demos/01-noutbuk-testi/ssenariy.md` | 0:21, 0:33 |
| Demo 02 deploy live | `demos/02-deploy-jonli/ssenariy.md` | 0:28 |
| Demo 03 domain, DNS, HTTPS (one diagram) | `demos/03-domen-dns-https/` (`diagramma.html`, `ssenariy.md`) | 0:36 |
| Demo 04 rollback | `demos/04-rollback/ssenariy.md` | 0:43 |
| Demo 05 staff conversation role-play | `demos/05-madina-suhbati/ssenariy.md` | 2:21 |
| Exercises 01-06 (Uzbek, one file each; all in one: `exercises/mashqlar.html`) | `exercises/` | Hands-on blocks |
| Recorded outputs of every command (fallback for anything live) | `exercises/namuna/natijalar/` | 0:28-1:40 |
| Baraka worked examples (Kit 5 A, Kit 4 A and B) and bad examples | `exercises/namuna/kompaniya/`, `exercises/namuna/yomon/` | 1:50, 2:20 |
| Handouts: glossary, "assistant is down" card, server safety card (print one set per person) | `handouts/pdf/` | 0:02 |
| Homework with good and weak example, mentor check for Day 5 | `homework.md` (printable: `handouts/pdf/uy-vazifasi.pdf`) | 2:50 |
| Mentor sheet, codes 4.1-4.11 | `mentor-handbook/day-4.md` (mentor-handbook agent) | All day |
| Kit 4 and Kit 5 forms and skills | `kits/KIT_04_*`, `kits/KIT_05_*`, `kits/skills/kit4`, `kits/skills/kit5` (kits agent) | 1:50, 2:20 |
| The deploy path | `pilot-template/deploy/` (pilot-template agent): `deploy.py setup / env / deploy / status / logs / rollback` | 0:28-1:40 |

## Before the day

### Wednesday 9 December (mentors, in the table chats)

- Rebuild and post the zip: `python3 day-4/_build/make_dist.py` writes `_build/dist/4-dars-materiallar.zip` (domain tool, its guide, the three handout PDFs, the exercises PDF).
- Post `exercises/00-dars-oldidan.md`: each owner confirms `ssh vps echo ok`, runs `deploy.py setup` once (3-5 minutes of server work, safe to repeat), creates a GitHub account and logs `gh` in, and, if they have a domain, adds the A record now so DNS has four days to spread.
- This moves the slowest, most failure-prone steps (key setup, first apt run, `gh` install and login) out of the room and shows failures four days early.

### Friday 11 December, 18:00 (mentors to head mentor, both groups)

- Each mentor sends one line per owner: green (server and GitHub ready), yellow (one missing), red (no server, or cannot log in).
- Head mentor books 10-minute screen-share calls before class for every red owner with a server (Friday evening for the Saturday group, Saturday for the Sunday group).
- Owners without an active server are told to buy today: Airnet activation can take up to 2 working days (`sources.md` F4). The course holds no spare servers (owner decision).
- Instructor gets the counts.
  Tell the organiser that night how many owners will have no server in class: they cannot meet 4.7 in the room and each gets a 48-hour deploy call (see "No server yet").

### The day before the first group: Friday 11 December (instructor and head mentor at the venue, 60 minutes)

1. **Venue network test.** From the venue Wi-Fi, on a laptop: `ssh -o ConnectTimeout=10 vps echo ok` against the demo server, then `curl -sI https://api.telegram.org` and `curl -sI https://openrouter.ai`.
   If port 22 is blocked or the guest Wi-Fi isolates clients, ask the venue to open outbound 22 and bring the course 4G router with an unlimited SIM as the backup network.
   One shared public IP serves all 40 laptops: a server's fail2ban bans that IP for 10 minutes after 5 wrong passwords (`sources.md` F14), which locks out only that owner's server, but tell mentors.
2. **Demo rehearsal.** Run demos 01-04 end to end on the demo server (`demos/*/ssenariy.md`, "Before class"), then put the demo bot back to "laptop only" (`ssh vps systemctl stop pilot-bot`).
   Run `sayt.py` for the demo subdomain and confirm the padlock on a phone over mobile data (demo 03).
3. **Re-run the test path** if the pilot template changed this week: `python3 day-4/_build/sandbox/make_sandbox.py`, then `uv run --project day-4/_build/sandbox/work/kompaniya/app python day-4/_build/sandbox/run_day4.py` (about 5 minutes, needs Docker); expect `30 / 30 checks passed` (Docker networking can drop one message right after a container restart; if a single check fails with "Network is unreachable" in the log, run it again).

### Each class day, 60 minutes before

- Projector at 1920x1080, deck in full screen (F), phone mirroring tested.
- Print: handouts (one set each), the 40-row live board (A3, or a shared sheet on the head mentor's laptop), green/yellow/red table cards (one set per owner).
- Mentors read `mentor-handbook/day-4.md` and this sheet's "How 8 mentors run 40 deploys".

## No server yet

Owner decision (2026-11-03): every participant buys their own VPS; the course holds no spare servers.
An owner whose server is not bought or not yet active on the day:

1. **Follows the deploy with a tablemate.** The mentor seats them next to a green neighbour; they watch every step of exercise 02 on the neighbour's screen and do the laptop-side steps themselves: GitHub (exercise 01), `.env` check, `pilot check` with no Baraka sample line (exercise 02, steps 1 and 1.5).
2. **Buys the server the same day.** Airnet "Strong" with Click or Payme, about 15 minutes (`week-0-setup/setup-guide.md`, step 13); activation can take up to 2 working days.
3. **Deploys within 48 hours with a mentor.** The head mentor books a 30-minute screen-share call before the clock runs out and writes it in the tracker; on the call the owner runs `00-dars-oldidan.md` steps 1-2 and exercise 02 unchanged (15-20 minutes once the server is active).

Until that call, the owner's assistant runs only while the laptop is on, so 4.7 stays 0.
The instructor reports the count and the call times to the organiser the same evening; the sales-page promise for lesson 4 is met for that owner only when the call is done.

## Run of show (180 minutes)

| Time | Slides | Instructor | Table mentors | Head mentor |
| --- | --- | --- | --- | --- |
| 0:00-0:03 | 1-3 | Welcome; the three outcomes; agenda; hold up the handouts | At tables with the 4.1-4.5 checklist | Friday's no-server list ready |
| 0:03-0:18 | 4-5 | Start the 13-minute timer; walk the room | v0 round: 1 minute per owner on a real case; codes 4.1-4.5; write who cannot log in (4.5) | Seats owners without a server next to a green tablemate |
| 0:18-0:20 | 6 | "Where does your assistant run now?" | One line to the head mentor: green / needs SSH fix / no server | Collects the counts, tells the instructor |
| 0:20-0:21 | 7 | Divider: where software lives | - | Fixes SSH for the 0:18 list |
| 0:21-0:24 | 8 | **Demo 01 part A**: local bot answers, lid closed, silence | - | - |
| 0:24-0:28 | 9-11 | Local vs server; VPS vs Mac mini; where the question travels (Day 1 link) | - | - |
| 0:28-0:33 | 12-14 | **Demo 02**: deploy in plain words, live; narrate the five steps; crash demo | - | Fixes SSH for the 0:18 list, one by one |
| 0:33-0:36 | 15 | **Demo 01 part B**: same bot from the server, lid closed; `/holat`, `/stop`, `/davom` | - | - |
| 0:36-0:41 | 16-17 | **Demo 03**: the diagram; padlock on the phone; four words | - | - |
| 0:41-0:45 | 18-19 | Git as undo; **demo 04** rollback and `git restore` | - | - |
| 0:45-0:48 | 20-21 | Logs; three safety rules | - | - |
| 0:48-0:50 | 22 | Three steps; traffic-light cards; owners without a server follow a tablemate | Hand out cards; stand | Books 48-hour calls for owners without a server |
| 0:50-1:05 | 23-24 | GitHub (exercise 01); anyone without Wednesday setup starts it now in a second tab | Seat-order loop; check 4.6 on the repo page (Private, no `.env`); **hard stop at 1:05** | SSH fixes; buying help for owners without a server |
| 1:05-1:30 | 25-28 | `.env` check (`open -e .env` or `notepad .env`), `pilot check` with no Baraka sample line, laptop bot stopped with Ctrl+C, then deploy (exercise 02); 20-minute timer | Seat-order loop, 3 minutes per owner, then escalate; Windows laptops first | Floats to red cards; keeps the live board |
| 1:30-1:40 | 29-31 | Laptop test (4.7); logs; extension: domain (exercise 03); "if not today" | **See** the closed lid and the phone answer; mark 4.7 and 4.8 | Board count to the instructor at 1:35 |
| 1:40-1:50 | 32 | Break; decide whether to compress Kit 5 A | - | Last red owners |
| 1:50-1:55 | 33-36 | Kit 5 A: what a pilot is; success and stop; the Baraka plan | - | Last red owners |
| 1:55-2:00 | 37 | Bad vs good plan: pairs find the faults in `plan-yomon.md` | Pairs read the bad plan | - |
| 2:00-2:17 | 38 | `/kit5 reja` on their own company (exercise 04) | Check A.2 unit, A.7 event, A.8 a person; code 4.9 | Writes the 48-hour call list |
| 2:17-2:20 | 39 | Plan to bot settings (not today: after the conversations) | - | - |
| 2:20-2:21 | 40 | Divider: upgrade, not replace; the word list | - | - |
| 2:21-2:26 | 41 | **Demo 05**: role-play with a mentor as Madina; 1-minute debrief | One mentor plays Madina | - |
| 2:26-2:28 | 42-43 | Kit 4 A Baraka; words to use and avoid | - | - |
| 2:28-2:37 | 44 | `/kit4` (exercise 05) | Codes 4.10, 4.11 (conversation dates before go-live) | - |
| 2:37-2:50 | 45-46 | Role-play in pairs (exercise 06), two rounds of 6 minutes | Observe one round per pair with the 6-line checklist | - |
| 2:50-2:55 | 47-49 | Homework: order of the week; adding staff with `/ruxsat` and `REPLY_MODE=approve` | - | - |
| 2:55-2:57 | 50 | Day 5 check codes 5.1-5.5 | - | - |
| 2:57-3:00 | 51 | Close: "Noutbukni yoping" | Confirm 4.6-4.11; write "Keyingi to‘siq" in the tracker | Final board count to the instructor |

## How 8 mentors run 40 deploys in parallel

The deploy itself is not the bottleneck: each owner's server installs its own packages, and the upload from the laptop is about 70 KB.
The bottleneck is mentor attention, so the plan spreads it.

1. **Move the slow steps out of the room.** Key setup, the first `deploy.py setup` (apt, firewall, fail2ban, uv) and `gh` login happen on Wednesday at home (exercise 00).
   In class each owner runs only `env` and `deploy` (about 3-5 minutes of waiting) plus the phone test.
2. **Run waits in parallel.** Owners who missed Wednesday start `setup` in a second Warp tab at 0:50 and do GitHub in the first tab while it runs.
3. **Seat-order loop.** Each mentor walks seats 1 to 5 in order, 3 minutes per owner at most, then moves on and comes back.
   "Did you screenshot it and ask Claude?" is the first question (mentor rhythm).
4. **Escalate at 3 minutes.** A problem not solved in 3 minutes goes to the head mentor (red card up), so one hard case never freezes a table of five.
5. **Windows first.** `deploy.py` has been tested from macOS and Linux only (`pilot-template/README.md`, "Not tested"); mentors check Windows laptops in the first loop (PowerShell key copy line is in `pilot-template/deploy/deploy.qollanma.md`, step 1).
6. **Traffic-light cards.** Green = the phone answered with the lid closed; yellow = working; red = stuck 5 minutes.
   The instructor reads the room by colour and never needs to ask.
7. **Live board.** 40 rows, columns: SSH ok, setup, `env`, deploy OK, laptop test (4.7), logs, GitHub (4.6), domain or bot (4.8).
   Mentors call out ticks; the head mentor fills it.
   Targets: 30 of 40 green at 1:25, 38 of 40 at 1:40, the rest booked for a 48-hour call.
8. **GitHub never blocks the deploy.** `deploy.py` uploads over SSH; GitHub is a backup.
   Hard stop at 1:05; unfinished GitHub moves to the evening with the mentor in the chat.
9. **Claude Code limits.** If an owner's Claude plan hits its limit mid-block (FAQ P-03), every prompt in exercises 01-02 names the exact command; the owner types `uv run python deploy/deploy.py env` and `uv run python deploy/deploy.py` in Warp directly.

### If deploy runs long

At 1:25, if fewer than 30 owners are green: announce that the deploy block runs to 1:45, cut the break to 5 minutes, and shorten Kit 5 A by dropping the "bad vs good" pair reading (slide 37); owners read `plan-yomon.md` at home.
Never cut Kit 4: the conversation order is the homework that protects the pilot's numbers.

## Fallbacks

| Situation | What we do | Who | Keeps the promise today? |
| --- | --- | --- | --- |
| Server bought, activation still pending | Everything else today; deploy at home when active, mentor on a screen-share call within 48 hours | Head mentor books the call | No: report to organiser Monday |
| No server bought | Follow the deploy with a tablemate, buy the server today (Airnet, Click or Payme), deploy within 48 hours with a mentor on a screen-share call ("No server yet") | Head mentor, owner | No: report |
| SSH times out on the venue Wi-Fi (port 22 blocked) | Phone hotspot for that laptop (SSH needs little data); if many, switch the room to the course 4G router | Mentor | Yes |
| SSH refused after a few password tries | fail2ban banned the venue IP for that server: wait 10 minutes or use a hotspot; never retry passwords | Mentor | Yes, late |
| `Permission denied (publickey)` | Key not on the server: `deploy.qollanma.md` step 1, owner types the password in a separate window | Mentor | Yes |
| Provider console needed (locked out, no key) | Provider panel console (Airnet "konsol"), head mentor guides | Head mentor | Usually yes |
| DNS not propagated | Domain is optional: bot path counts for 4.8; `sayt.py` already set Caddy, which retries by itself; check in the evening | Owner | Yes (bot) |
| Wi-Fi down for the whole room | Hotspots per table; demos from the recorded outputs (`natijalar/`); Kit 5 A and Kit 4 need no internet beyond Claude | Instructor | Partly |
| Telegram or OpenRouter outage | `uv run pilot check --online` shows which; nothing to fix locally; continue with Kit work, finish the phone test at home | Instructor | No: report |
| Deploy says `Tests failed` | Claude fixes the failing test (usually a fresh edit); the old release keeps running | Mentor | Yes |
| Deploy says `Check failed` | Server `.env` incomplete (`OWNER_CHAT_ID`, `ALLOWED_USER_IDS`), or an impossible price in the price list (`❌ Prays-list ...`: zero, empty, wholesale above retail): owner fixes `.env` or the price, then `env` and `deploy`; the running release is untouched | Mentor | Yes |
| Bot answers sometimes, not always | 409 Conflict: the laptop bot is still running; Ctrl+C on the laptop | Mentor | Yes |

## Mentor checks today (codes from `mentor-handbook/day-4.md`)

- 0:03-0:18: 4.1-4.5 (homework from Day 3, counts toward the refund-guarantee evidence).
- 1:05: 4.6 (private repo, no keys) where done.
- 1:30-1:40: 4.7 (the promise) and 4.8 (domain with HTTPS, or bot from the server).
- 2:17: 4.9 (plan with one numeric goal, a stop condition and a person who checks).
- 2:37: 4.10 (Kit 4 A, and B per employee), 4.11 (conversation date before go-live).
- 2:57: mentors confirm 4.6-4.11 and write "Keyingi to‘siq" for each owner.

Every owner without 4.7 is reported to the instructor by Thursday (`mentor-handbook/day-4.md`).

## Language rules on stage

- Address owners with "Siz"; staff in the role-play with "siz", name and aka or opa.
- Never laugh along with a firing joke; use Script A: "Hazilligini bilaman. Xodimlaringiz buni reja deb eshitadi. Raqamga qaytamiz." (`reviews/05-change-management.md`, change 8).
- Staff-facing words: "loyiha", "tekshirish", "tejalgan vaqt", "yengillashtirish"; never "optimizatsiya", "bo‘shagan vaqt", "nazorat", "sinov muddati".

## After class

- Head mentor posts the board count in the organiser chat the same evening: 4.7 green, owners without a server and their booked 48-hour calls.
- Mentors post `homework.md` (or `handouts/pdf/uy-vazifasi.pdf`) in the table chats.
- Wednesday 16 Dec, table chats: "Suhbatlar bo‘ldimi, assistent yoqildimi, jurnalda nechta yozuv?"; anyone silent gets a call on Thursday.
- Monday 14 Dec, instructor to organiser: owners still without 4.7 and the plan for each.
