# pilot-template: the reference pilot bot

A small, tested starting point for the Praktikum 3.0 pilot.
Participants copy it into `kompaniya/app/` and adapt it with Claude Code; the instructor uses it for the lesson 3, 4 and 5 demos.

What it does, in one line: a Telegram bot answers staff (or customers) through an LLM on OpenRouter, using the agent instructions from Kit 3 Form B and the company's own data (CSV/Excel/1C export, Google Sheet, documents), logs every exchange, hands hard cases to a person, and sends the owner a daily report and the weekly Kit 5 numbers.

It ships filled in for the course demo company "Baraka Office" MChJ (office furniture, Tashkent): a sales assistant for managers asking about prices, discounts, stock, delivery and warranty.
Baraka data follows `_build/overnight-2026-11-03/BARAKA-CANON.md`: prices and rules from `nlm-lead-magnet-video/demo-fayllar/`, stock mirrored from finance-ops `1c-stock-balance-2026-11-01.xlsx` (finished goods; rebuilt by `_build/make_stock_sample.py`), people from the HR roster (ROP Jamshid Karimov, manager Bekzod Aliyev).
Per the canon, this template's baseline (`kit5-baseline.toml`) and `samples/` are the canonical Baraka pilot numbers that other folders quote.
Everything is labelled as a conditional example.

Status (2026-11-03): 199 offline Python tests and 8 Node tests green; full fake end-to-end run recorded; deploy path tested end to end in fresh Ubuntu 24.04 and 26.04 containers, 30 of 30 checks each (see "What was tested").

## The owner's always-on assistant (the sales-page promise)

The live sales page promises every participant a personal AI assistant that runs with the computer off and is controlled from the phone (lessons 3-4).
Once deployed to the VPS, this bot is that assistant for the owner, with no second system to install:

- Runs 24/7 under systemd, restarts itself after a crash or a reboot.
- Owner commands from Telegram: `/holat`, `/hisobot`, `/hafta`, `/xatolar`, `/xarajat`, `/stop`, `/davom`, `/ruxsat`, `/taqiq`.
- Memory from the phone: `/eslab_qol <fact>` writes to `runtime/memory.md`, which is added to every answer and survives deploys; `/xotira`, `/unut N`; `deploy.py memory` prints it so Claude Code can move lasting facts into `agent/memory.md` (the curriculum's memory file).
- Scheduled jobs: `agent/schedule.toml`, plus `/jadval HH:MM <question>` from the phone (working days), `/jadval`, `/jadval_ochir N`.
- Reminders: `/eslat HH:MM <text>`.
- Approval mode from the phone: `/darhol narx qoldiq` (week 2: only these topics go straight to staff), `/darhol hammasi`, `/darhol yo‘q`, `/darhol standart`.
- The daily report and the weekly Kit 5 file arrive by themselves.

It works on the company's data; personal mail or calendar access is deliberately not built in (each new connection is a new risk).
Whether this replaces Hermes for the promise is an owner decision (see the report).
The guide says this in Uzbek: `PARTICIPANT_GUIDE.uz.md`, section 0 and step 2.8.

## Who reads what

| Reader | Start here |
|---|---|
| Participant (Uzbek) | `PARTICIPANT_GUIDE.uz.md`, then the `*.qollanma.md` guide next to each file |
| Participant's Claude Code | `CLAUDE.md` (rules for changing this project safely) |
| Mentor | `deploy/mentor-runbook.md` (English), `deploy/deploy.qollanma.md` (what participants follow) |
| Instructor (demos) | "Demo map" below |
| Agent building the Baraka demo company | "Using it inside a company folder" below |

## Quick start (laptop, 5 minutes)

```bash
uv sync                        # installs Python 3.12 and the 4 libraries (uv brings its own Python)
uv run pytest                  # 199 tests, offline, no keys needed (network is blocked in tests)
uv run python -m tools.demo    # the whole bot end to end against fake Telegram + OpenRouter
cp .env.example .env           # then fill TELEGRAM_BOT_TOKEN, OPENROUTER_API_KEY, OWNER_CHAT_ID, ALLOWED_USER_IDS
uv run pilot check --online    # checks settings, agent files, data, and both keys
uv run pilot ask "Optima stolidan 8 ta kerak, qancha bo'ladi?"   # one answer in the terminal, no Telegram
uv run pilot run               # the bot, live; Ctrl+C to stop
```

Server: `uv run python deploy/deploy.py setup`, then `env`, then `deploy` (details in `deploy/deploy.qollanma.md`).

## How it maps to the course (3.0 lessons)

| Lesson | Participant does | Files they touch | Command |
|---|---|---|---|
| 3-dars (API, MCP) | Kit 3 B becomes the agent's instructions; connect Telegram + one data source; v0 on 3 real past cases | `agent/instructions.md`, `agent/sources.toml`, `data/`, `.env` | `pilot check`, `pilot ask`, `pilot run` |
| 3-dars homework | 3 good + 3 bad examples become the test set | `evals/test-set.toml` | `pilot eval` |
| 4-dars (ship it) | Private GitHub repo, deploy to the VPS, auto-restart, logs; Kit 5 A; go live in approve mode | `.env` (`REPLY_MODE=approve`, `PILOT_START_DATE`), `kit5-baseline.toml` | `deploy.py setup/env/deploy/status/logs/rollback` |
| 5-dars (agents that improve) | Error log to fix: change instructions or memory, add a test, re-run, redeploy; daily report; a scheduled business job; escalation; lockdown | `agent/memory.md`, `agent/examples.md`, `evals/test-set.toml`, `agent/schedule.toml` | `pilot eval`, `pilot job`, `/xatolar`, `/hafta`, `deploy.py` |
| 6-dars (results) | Weekly file into Kit 5 B; decide continue / change / stop | `runtime/exports/kit5-raqamlar-*.md` | `/hafta` or `pilot kit5` |

Kit field mapping:

| Kit field | Where it lives in the template |
|---|---|
| Kit 3 B.1-B.10 (agent instructions) | `agent/instructions.md`, same headings; read on every question, so edits apply without a restart |
| Kit 3 B.3 (sources) | `agent/sources.toml` (+ files in `data/`) |
| Kit 3 B.5 (never does) / B.4 (may do) | instructions text; hard limits in code: no sending to customers unless public mode, no payments, no deletes |
| Kit 3 B.6 (hand to a person) | the model writes `ODAMGA: <reason>`; the bot forwards to `ESCALATION_CHAT_ID`; the person replies to that message and the bot relays it |
| Kit 3 B.7 (what it records) | `runtime/journal/<date>.jsonl` |
| Kit 4 B.4 (3 good + 3 bad) | `evals/test-set.toml`, run with `pilot eval` |
| Kit 5 A.5 (limits) / week 1 "drafts only" | `REPLY_MODE=approve`: a person approves or rewrites every answer |
| Kit 5 A.5, week 2 "partial direct" (canon) | `REPLY_MODE=topics` + `agent/approval.toml` (`direct_topics = ["narx", "qoldiq"]`): the model tags each answer `MAVZU: <topic>` (stripped before anyone sees it); an answer goes direct only if its topic is listed and no keyword of another topic is in the question or answer; untagged, unknown or `boshqa` goes to the reviewer. Switch from the phone with `/darhol`; a phone setting lasts until `.env` or `approval.toml` changes |
| Kit 5 A.7 (stop condition) | `/stop` and `/davom` from the owner or the pilot lead's phone |
| Kit 5 B.1, B.3, B.5, cost, B.13 | counted from the journal; daily report at `DAILY_REPORT_TIME`, weekly file on `WEEKLY_REPORT_DAY` |
| Kit 5 B.2, B.4, B.6, B.7, B.8, B.14, B.9-B.12 | marked "qo‘lda" (filled by hand); the bot cannot measure them honestly |
| Kit 5 "Agentgacha" (baseline) | `kit5-baseline.toml` |

## Demo map (instructor)

| Lesson | Demo | How |
|---|---|---|
| 3 | Kit 3 B to system prompt | Show `agent/instructions.md` next to Kit 3 B; `pilot ask` one question; then edit B.5 and ask again |
| 3 | Data from an export (no API) | `data/ombor-1c.csv` is a real-shaped 1C export (Windows-1251, `;`, title rows, cost column hidden by `columns`); `pilot check` shows it read |
| 3 | Lead form to Sheets to Telegram | `examples/lead-form/` (separate, Google Apps Script) |
| 4 | The laptop test | `pilot run` on the laptop, close it, the bot stops; then the same bot from the VPS |
| 4 | Deploy in plain words | `deploy.py setup`, `env`, `deploy`; then `kill -9` the process and watch systemd restart it (`deploy.py status`) |
| 4 | Rollback | Break `agent/instructions.md`, deploy, then `deploy.py rollback` |
| 5 | Error log to fix | Press ❌ on an answer, write the note, `/xatolar`; add a line to `agent/memory.md` and a `[[test]]`; `pilot eval`; deploy |
| 5 | Morning report | Set `DAILY_REPORT_TIME` two minutes ahead, restart, wait; or `deploy.py report` |
| 5 | Business job ("every day at 9:00, send me ...") | `agent/schedule.toml` ships "Kam qolgan mahsulotlar" (08:30, low stock from the 1C export); `pilot job "Kam qolgan mahsulotlar" --send` runs it now |
| 5 | Escalation | Ask for a 15% discount: the manager gets "xodim beradi", the owner gets the case, replies, the manager gets the answer |
| 5 | Empty Excel | Replace `data/ombor-1c.csv` with an empty file: the owner gets an alert, the model is told the data is missing and hands over instead of answering zero |
| 5 | Lockdown | Message the bot from a second account: it answers only with that account's ID |
| 5 | Model per job | `pilot eval --tier cheap` vs `--tier strong`: pass rate and cost side by side |

## Using it inside a company folder

The curriculum's company folder is `kompaniya/` with `kit1-interviews/` ... `kit5-pilot/` and `app/`.
Copy this folder's contents (not `_build/`) into `kompaniya/app/`.
Only `app/` goes to the server, so everything the agent needs at run time lives inside it:

- `kompaniya/kit3-agent/instructions.md` (the system prompt that the kits' `/kit3` skill writes from Kit 3 Form B, headings like "Rol (B.1)") is copied into `app/agent/instructions.md`; the shipped Baraka sample uses the same layout.
- `kompaniya/kit4-people/test-set.md` (Kit 4 B.4 examples) is converted into `app/evals/test-set.toml`.
- The weekly export from the bot is copied into `kompaniya/kit5-pilot/numbers.md`.

`CLAUDE.md` tells the participant's Claude Code to keep these in sync.
For the Baraka demo company: the template is already Baraka-filled; replace nothing, just copy, set `.env`, and add the demo company's own Kit 3-5 files around it.
`pilot check` fails with "Hali tayyor emas: Baraka namunasi bor" while sample files remain in `agent/`, `data/` or `evals/`, which also stops a deploy; the demo company sets `DEMO_SAMPLE=on` in its `.env` to allow the sample on purpose (a real company never does).
A real participant replaces the 9 sample files listed in `PARTICIPANT_GUIDE.uz.md`, step 1.3.

## Design choices (and why)

**Python 3.12 with uv.**
uv installs the right Python by itself on macOS, Windows and Linux, so a participant never fights a system Python, and `uv.lock` pins every library version.
Python reads closest to plain language, and Claude Code explains and edits it reliably.
Four runtime libraries only: `httpx` (HTTP), `openpyxl` (Excel), `python-dotenv` (`.env`), `tzdata` (Tashkent time zone on Windows).

**No bot framework.**
`pilot/telegram.py` is about 150 lines over the plain Bot API (long polling).
Every call is visible, the token is redacted from errors, and Claude Code can add any method with `tg.call("methodName", ...)`.
One sequential loop: simple to explain and change, no threads, no races in the journal or the budget; for a pilot with a handful of staff the wait is a few seconds, with a "typing…" indicator.

**OpenRouter, three tiers.**
`MODEL_TIER=cheap|balanced|strong`, with model IDs in `.env`.
Defaults, from the live model list on 2026-11-03 (https://openrouter.ai/api/v1/models), price per 1M tokens input / output: cheap `anthropic/claude-haiku-5.5` ($0.10 / $0.50), balanced `google/gemini-3.8-flash` ($0.825 / $4.125, the model the 2.0 Hermes setup ran on), strong `anthropic/claude-sonnet-5.5` ($2 / $10).
Open-weight comparison: `deepseek/deepseek-v4.1-flash` ($0.045 / $0.50).
Every response carries `usage.cost` (https://openrouter.ai/docs/use-cases/usage-accounting, checked 2026-11-03), so each answer's cost is logged; `/xarajat` also reads the key's limit from `GET /api/v1/key` (https://openrouter.ai/docs/api-reference/limits).
At the sample data size a balanced answer costs about $0.003-0.005, so 100 questions a day is about $10-15 a month.

**Sending that does not lose or double messages.**
`sendMessage` and `sendDocument` are retried up to 3 times within about 30 seconds, but only when Telegram surely did not receive the request (no connection, or a 429 with `retry_after`); a timeout after the request went out is not retried, so a message is never delivered twice.
A send that still fails is logged as `send_failed` in the journal and shown in `/holat` and the daily report.

**UTF-8 everywhere.**
On Windows, Python writes to a pipe in the ANSI code page, where ✅ and o‘ do not exist; the CLI, `deploy.py` and the demo force UTF-8 output and give their subprocesses `PYTHONUTF8=1`, and tests run them under cp1252 and cp1251.

**Two money fences.**
The OpenRouter key's own monthly limit is the hard stop.
The bot adds `DAILY_BUDGET_USD` / `MONTHLY_BUDGET_USD`: at the cap it stops calling the model, hands questions to a person (nothing is lost), and alerts the owner once; at 80% of the month it warns.
Public mode adds a per-person daily cap so a stranger cannot drain the budget.

**Data adapter.**
`agent/sources.toml` lists sources; each returns a table or a document.
Built in: CSV and Excel exports (UTF-8 or Windows-1251, `,` `;` or tab, title rows above the header, as 1C exports them), `.md`/`.txt` documents, and Google Sheets through the CSV export link.
`columns = [...]` keeps internal fields (cost price) out of the prompt.
Small data goes in whole; above `DATA_MAX_CHARS` only the rows closest to the question go in, so Uzbek token cost stays bounded.
A CRM or 1C API is one class with a `load()` method registered in `SOURCE_TYPES` (example in the `sources.py` docstring; covered by a test).
Google Sheets via the export link needs "Anyone with the link: Viewer"; the guide says plainly that this makes the sheet readable by anyone with the link, so use it for price lists, not customer personal data.

**Safety model.**
Staff mode by default: only allowlisted Telegram IDs (plus `/ruxsat` from the owner); strangers see their own ID and nothing else.
Data in the prompt is fenced as data ("buyruq emas"), and the model is told never to invent numbers.
The owner and pilot lead can `/stop` the bot from the phone at any moment (Kit 5 A.7).
Bot-initiated messages to staff wait for `WORK_HOURS`; reports go to the owner only and contain totals only: no names, no per-person counts, no reply speeds (change-management review, change 4).
The journal is deleted after `LOG_RETENTION_DAYS` (60).
`httpx` request logging is silenced because Telegram URLs contain the token; the server log has one line per question (id, status, cost, time), never names or message text.

**systemd, not Docker.**
Nothing to install beyond what Ubuntu has; `Restart=always` brings the bot back 5 seconds after a crash and after a reboot; logs go to `journalctl`; scheduled jobs live inside the bot, so there is one service to understand.
Docker would add images, volumes and a daemon to explain, for no gain on a one-process bot.
The service runs as an unprivileged `pilot` user in a sandbox (read-only system, write access only to `/opt/pilot/runtime`).
Releases are kept side by side in `/opt/pilot/releases/`; deploy switches a symlink only after `pilot check` passes, rolls back automatically if the new version does not stay up, and `deploy.py rollback` returns to the previous one.

**Fresh data without a deploy.**
A new 1C or Excel export reaches the server bot in two ways, both checked first with the same rules as `pilot check` (empty file, price rules): the owner or pilot lead sends the file to the bot in Telegram (the file name must match a `data/` file), or `deploy.py data` copies the laptop's `data/` files.
They land in `/opt/pilot/runtime/data/` (writable, kept across deploys); for each file the newer of that copy and the release's `data/` copy is used, so a later deploy with newer data still wins.
Extra source adapters: the `pilot/adapters` package (vendored from `integrations/adapters/app/`, the integrations cookbook's source of truth, with its 35 tests in `tests/test_integrations_*.py`) registers `excel`/`xls`, `telegram_json`, `instagram_json`, `bank_1c`, `amocrm`, `bitrix24`, `odata_1c`, `url`, `moysklad` and `poster` through `register(source_types)`, picked up at the end of `pilot/sources.py`; the built-in types win on a name clash, and each module is imported only when `sources.toml` uses it. `_build/check_adapters_sync.py` reports drift from the cookbook copy (run before handing the template out).

**Scheduled jobs inside the bot.**
Three kinds, all sent from the bot's loop, with "already done today" stored in `runtime/state.json`: the daily pilot report (owner, `DAILY_REPORT_TIME`, about yesterday), the weekly Kit 5 file (`WEEKLY_REPORT_DAY`), and business jobs from `agent/schedule.toml` (a question answered from the data at a fixed time, e.g. low stock at 08:30, sent to the owner, or to staff in working hours only).
If the bot was down at the scheduled time it catches up on its first loop after it comes back, never twice; on the very first start nothing is sent about the past.
This is the curriculum's "scheduled tasks inside the pilot itself" option; `pilot report --send` and `pilot job NAME --send` exist for cron or by-hand runs.
A job's cost counts toward the budget caps and the weekly model cost, but not toward B.1 (it is not a staff request).

## File map

| Path | What it is | Guide (Uzbek) | Worked example |
|---|---|---|---|
| `PARTICIPANT_GUIDE.uz.md` | Step by step for lessons 3-6, the owner's assistant (2.8), and an appendix of full worked examples (section 5: chat, filled and weak system prompt, test set, daily report, two-week Kit 5 file with the error log filled in) | (itself) | Baraka throughout |
| `CLAUDE.md` | Rules for the participant's Claude Code | `PARTICIPANT_GUIDE.uz.md` section 0 | - |
| `.env.example` | Settings and secrets template | `env.qollanma.md` | filled Baraka example and bad example in the guide |
| `agent/instructions.md` | Kit 3 Form B = system prompt | `agent/instructions.qollanma.md` | Baraka file itself; weak vs strong prompt in the guide |
| `agent/examples.md`, `agent/memory.md` | Few-shot answers; facts and lessons | `agent/instructions.qollanma.md` | Baraka files |
| `agent/sources.toml`, `data/` | Data sources (Kit 3 B.3) | `agent/sources.qollanma.md` | price list CSV, rules document, 1C export |
| `agent/schedule.toml` | Scheduled business jobs (5-dars) | `agent/schedule.qollanma.md` | "Kam qolgan mahsulotlar"; output in `samples/jadval-ishi.txt` |
| `agent/approval.toml` | Week-2 per-topic approval (`REPLY_MODE=topics`, off by default) | `agent/approval.qollanma.md`; `PARTICIPANT_GUIDE.uz.md` 3.9 | Baraka week 2 (price and stock direct); bad example in the guide |
| `evals/test-set.toml` | Test set (Kit 4 B.4) | `evals/test-set.qollanma.md` | 8 Baraka cases (3 exact-price questions, so a price typo fails `pilot eval`); output in `samples/pilot-eval.txt` |
| `kit5-baseline.toml` | Kit 5 "Agentgacha" column | `kit5-baseline.qollanma.md` | Baraka baseline; a two-week pilot in `samples/kit5-2-hafta.md` and `samples/kunlik-hisobot-pilot.txt`, the hand-filled Kit 5 B in `PARTICIPANT_GUIDE.uz.md` section 5.5 |
| The bot in Telegram | Staff and owner commands, incl. the assistant commands | `bot-commands.qollanma.md` | `samples/suhbat.md`, `samples/suhbat-xodim.png`, `samples/suhbat-rahbar.png` |
| `deploy/` | Server setup, deploy, systemd unit | `deploy/deploy.qollanma.md`; mentors: `deploy/mentor-runbook.md` | `samples/deploy-output.txt`, `deploy-status.txt`, `deploy-logs.txt`, `deploy-rollback.txt` |
| `samples/` | Real outputs of every command (`pilot check`, `ask`, `eval`, `job`, `report`, `kit5`, `deploy.py` and its status, logs, rollback), from the offline run and the container deploy test | - | - |
| `pilot/` | The code (start at `bot.py` and `assistant.py`) | - | - |
| `tests/` | 199 offline tests, network blocked; they read the frozen Baraka sample in `tests/fixtures/baraka-app/`, so they keep passing after the owner swaps in their own company (owner content is checked by `pilot check` and `pilot eval`) | - | - |
| `tools/` | Fake Telegram + OpenRouter, offline demo | - | `_build/e2e-transcript.md` |
| `examples/lead-form/` | Lesson 3 instructor demo: form to Sheets to Telegram | `examples/lead-form/lead-form.qollanma.md` | Baraka landing page |
| `_build/` | Verification only (deploy test, transcripts, screenshots); not for participants | - | - |

## What was tested, and what was not

Tested:

- `uv run pytest` (199 tests, about 3 seconds): config, data sources (CSV, Excel, 1C cp1251, Google Sheet via a mock transport, custom source), prompt, both HTTP clients (mock transports), assistant, budget, bot flows (allowlist, buttons, notes, hand-over and relay, work hours, approve mode, per-topic approval, public limit, budget cap, pause, reports, weekly file, scheduled jobs, 409 conflict, bad update), Kit 5 export, eval runner, CLI and broken agent files; plus two end-to-end tests that run the real `pilot run` process against the fake servers (the main demo, and week-2 topics mode: a price answer goes direct, a discount answer waits for the reviewer and is sent after «Yuborish»).
  A socket guard blocks every non-localhost connection during tests; the suite also passes with an empty environment and `uv --offline`, and in a copy where the Baraka sample was replaced by another company's files (the day-3 agent's scenario).
  `tools/demo.py` also runs on the frozen sample (`PILOT_APP_DIR`), so the demo keeps working in a personalised app.
- `node --test examples/lead-form/test/code.test.mjs`: 8 tests for the Apps Script handler.
- `tools/demo.py`: the scripted run in `_build/e2e-transcript.md`.
- `_build/deploy-test/run_deploy_test.py`: a fresh Ubuntu container with systemd and SSH, deployed with `deploy.py` exactly as a participant would (setup, env, deploy, crash, restart, report, logs, second deploy, rollback, bad `.env`, price-typo gate, fresh data without a deploy, week-2 topics mode and `/darhol`, SSH hardening).
  Results: `_build/deploy-test/result-ubuntu-*.md`.

Not tested (needs real accounts or hardware):

- Real Telegram and real OpenRouter calls (paid calls are not allowed in this run); the clients follow the documented APIs and are tested against mock transports.
- Answer quality in Uzbek per model tier; run `pilot eval --tier ...` with a real key before Day 3 and pick the default tier from the results.
- A real VPS reboot (a container restart stands in), real `ufw`/`fail2ban` behaviour on a provider's kernel, and Windows `ssh`/`scp` for `deploy.py`.
- Google Sheets with a real shared sheet.
