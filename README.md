# AI Praktikum 3.0 portal: backend

One Node process (Node 24+, no npm dependencies): `node:http`, `node:sqlite`, `node:crypto`, `node:test`, and the Telegram Bot API through `fetch`. It serves the JSON API, the static SPA from `public/`, and (if `BOT_TOKEN` is set) the admin-only Telegram bot.

The API contract for the frontend is in [API.md](API.md).

```
server/    index.js (http, routes, static) db.js (SQLite, migrations, students, progress)
           auth.js (ids, sessions, cookies, rate limit) content.js (content files, schedule, gating)
           bot.js (admin bot) migrations/*.sql   *.test.js
content/   schedule.json  lessons/{n}/lesson.{uz,ru,en}.json  lessons/{n}/files/  prep/prep-{lang}.pdf
public/    the SPA (stage 2). Shell: public/aip/index.html, else public/index.html
scripts/   import-2.0.mjs (one-off importer from .design/ref-2.0-api)
```

## Run

```
cp .env.example .env     # then export the variables (the app reads process.env only, no dotenv)
node server/index.js     # http://localhost:3000, health at /health
node --test              # all tests (no network, in-memory DB)
```

With plain `node` you can load the file with `node --env-file=.env server/index.js`.
Demo student: ID `XM` (shown as "Student", group shanba) exists only when `SEED_DEMO=1` is set (dev and tests); setting it later re-activates the row. Without it every start switches an existing XM row off. This guard only covers XM: the login itself still accepts any short ID that someone inserted by hand into the database, so do not do that in production (the bot and `createStudent` only make `AIP-XXXXXX` IDs).

### Env vars

| Name | Default | Purpose |
|---|---|---|
| `PORT` | 3000 | HTTP port |
| `NODE_ENV` | development | `production`: `__Host-` Secure cookie, HSTS, `NOW` ignored |
| `DATA_DIR` | `./data` | folder for `aip.db` (put the volume here) |
| `CONTENT_DIR` | `./content` | schedule, lessons, files |
| `PUBLIC_DIR` | `./public` | built SPA |
| `PORTAL_URL` | empty | public portal address; used in the bot's student message and the login origin check |
| `TRUST_PROXY` | 0 | proxies in front of the app, a non-negative integer or the server refuses to start: Railway = 2 (measured 2026-10-19: its X-Forwarded-For carries two hops), Cloudflare + Railway = 3; the client address is the n-th from the right of `X-Forwarded-For` (a one-time warning is logged if a request arrives without it) |
| `TRUST_CF` | 0 | `1` = prefer `CF-Connecting-IP`. Only with Cloudflare in front of everything (see the Cloudflare note below) |
| `HOST` | 0.0.0.0 | bind address; use `127.0.0.1` on a droplet behind Caddy |
| `SEED_DEMO` | unset | `1` = create or re-activate the demo student XM (dev only; unset = XM is off) |
| `BOT_TOKEN` | empty | admin bot token; empty = bot off |
| `ADMIN_TG_IDS` | empty | comma-separated Telegram user IDs allowed to use the bot |
| `INTEGRATION_KEY` | empty | secret (32+ characters, else the server refuses to start) the CRM sends as `Authorization: Bearer <key>` to `POST /api/int/students`; empty = that endpoint answers 404. Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`. See "CRM integration" in API.md |
| `ALLOW_NOW` | unset | must be `1` for `NOW` to work |
| `NOW` | unset | TESTING: pretend it is this time, e.g. `2026-09-12T09:59` (Tashkent). Ignored in production, and the server refuses to start if it is set together with an https `PORTAL_URL`, `TRUST_PROXY` or `TRUST_CF` |

### Hosting (Railway or a droplet)

Both work the same: run `node server/index.js`, mount a persistent volume, set `DATA_DIR` to it (SQLite lives there, WAL mode, so keep it on a real disk, not a network share), and set `NODE_ENV=production`, `PORTAL_URL`, `TRUST_PROXY` (Railway = 2, measured 2026-10-19; a direct droplet behind Caddy = 1). Put TLS in front (Railway does; on a droplet use Caddy). The session cookie is `Secure`, so production needs HTTPS. `CONTENT_DIR` must also persist if you edit content on the server: either put it on the volume too or redeploy with the repo's `content/`. Cloudflare note: if Cloudflare sits in front, remove or block the Railway `*.up.railway.app` domain (and any other direct route to the app). Otherwise a client can skip Cloudflare and send its own `CF-Connecting-IP` or `X-Forwarded-For`, and the per-client rate limits become meaningless. Verify the proxy setting at deploy time: login with a wrong ID from your phone and from your laptop and check that they hit separate limits (or log `x-forwarded-for` once); if all clients share one bucket, `TRUST_PROXY` is too low, and if a client can change its bucket by sending its own `X-Forwarded-For`, it is too high. On a droplet bind `HOST=127.0.0.1` so only Caddy can reach the port. Run one instance only (rate limits and the bot's conversation state are in memory). Stop with SIGTERM.

## Frontend: `public/aip` (built, never hand-edited)

The SPA is generated from the design sources in `.design/comp/src/`, the same ones as the clickable prototype (`AI-Praktikum-3.0-final.html`):

```
python .design/comp/src/build.py --app    # prototype + i18n check, then public/aip/{index.html, app.js, app.css, fonts/, login-pin.webp}
node --test                               # includes scripts/shell.test.js: no inline script, no remote fonts, no course text in public/
```

- It has no inline script (CSP `script-src 'self'`), no third-party requests (fonts are local; `python .design/comp/src/fetch_fonts.py` re-downloads them) and **no lesson text**: lessons, prompts, prep and the book come from `/api/aip` after login, so the gating stays on the server. Only platform UI strings are in `app.js`.
- Routes use the History API under `/aip/...` (`/aip/dars/1`, `/aip/dars/1/amaliyot/01`, `/aip/dars/2/amaliyot/01-biznes-goyalar`, ...); the server returns the shell for every `/aip/*` path.
- Language: the `aip_lang` cookie (set by the language switch, which refetches `/me`). Progress: `PUT /progress`, optimistic. A 401 anywhere returns to the login screen; `pageshow` re-checks `/me`.
- Try it locally with a pinned clock: `SEED_DEMO=1 ALLOW_NOW=1 NOW=2026-09-12T09:59 DATA_DIR=$(mktemp -d) node server/index.js`, open `http://localhost:3000/aip/`, log in as `XM`.

## Admin bot (BotFather steps for the owner)

1. In Telegram open `@BotFather`, send `/newbot`, choose a name and a username ending in `bot`. Copy the token.
2. Find your own numeric Telegram ID (message `@userinfobot`). Do the same for every other admin.
3. Set `BOT_TOKEN=<token>` and `ADMIN_TG_IDS=<id1>,<id2>`, and `PORTAL_URL`. Restart. The log says `admin bot polling`.
4. In BotFather send `/setjoingroups` and choose **Disable**. This is required: the bot must not be addable to groups (it also ignores everything outside private chats).

The bot uses long polling, so no webhook or public URL is needed. Do not run two copies with the same token (Telegram answers 409). If Telegram rejects the token the bot stops and logs it; the portal keeps running. The token is never logged.

Commands (Uzbek UI, admins only; everyone else gets a polite refusal and a `bot: refused user <id>` log line):
- `/new` (alias `/new_user`): full name, then phone, then group (Shanba / Yakshanba buttons), then mentor (buttons of previous mentors, or type one). The phone is the duplicate key: a number that is already registered shows the existing student's card instead of making a second one. Replies "Talaba yaratildi" with name, phone, group, mentor, ID and portal, then a second message you can forward to the student (portal URL + ID).
- `/find <text>`: by name, ID or phone (4+ digits); shows phone, group, mentor, created date, last login, "Tayyorgarlik k/4 | darslar n/4 bajarilgan".
- `/edit <ID> ism|telefon|guruh|mentor <value>`: fixes one field (`mentor -` clears the mentor). A phone that belongs to another student is refused.
- `/list [shanba|yakshanba|yangi]`: 10 per page with Oldingi/Keyingi buttons; `yangi` = students who have no group yet.
- `/start`, `/help`, `/cancel`.

When the CRM creates a student (`POST /api/int/students`) every admin gets a card "Talaba yaratildi (CRM)" with **Shanba / Yakshanba** buttons plus the forwardable message. Any admin can press a button once: it sets the group and edits the card. Until a group is set the student sees only the precourse (lesson 0). If the bot is off or a send fails, the student is still created; the failure is logged as `#rowid`, never the ID. Look the student up with `SELECT id, full_name FROM students WHERE rowid = N` (rowids can change after a plain `VACUUM` or a restore), or in the bot with `/list` (newest first) or `/list yangi` if no group is set yet.

There is no blocking or broadcasting. To deactivate a student (the API then answers the same `invalid_id` as for an unknown ID), or to give one the review flag that opens lesson 4 early, use SQL on the volume (`busy_timeout` avoids "database is locked" while the portal runs):
```
node -e "const {DatabaseSync}=require('node:sqlite');const d=new DatabaseSync(process.env.DATA_DIR+'/aip.db');d.exec('PRAGMA busy_timeout=5000');d.exec(\"UPDATE students SET active=0 WHERE id='AIP-XXXXXX'\")"
```
Same with `UPDATE students SET review=1 WHERE id='AIP-XXXXXX'` for the review flag (opens lesson 4 early; clients cannot set it).

## Timed releases: `content/schedule.json`

```json
{
  "timezone": "Asia/Tashkent",
  "groups": { "shanba": ["2026-09-12T10:00", "2026-09-19T10:00", "2026-09-26T10:00", "2026-10-03T10:00"],
              "yakshanba": ["2026-09-13T10:00", "2026-09-20T10:00", "2026-09-27T10:00", "2026-10-04T10:00"] },
  "liveOverride": null,
  "liveDays": 7,
  "release": { "1": { "vazifa": "+3h" }, "4": { "kitob": "2026-10-10T09:00" } }
}
```

- **Dates to follow**: `"shanba": null` (the shipped state) means the dates are not decided. For that group, and for any student with no group, lessons 1-4 stay locked whatever `release` says (and even with the `review` flag), the app shows "date to follow", `live` is 0, and lesson 0 (the precourse) stays open. `liveOverride` cannot change this.
- `groups.<g>[i]` is the start of lesson i+1 for that group. Times without a zone are Asia/Tashkent (UTC+5, no DST). The start time of day (10:00) is an assumption: change it.
- `liveOverride`: `null`, or 1-4 to pin the live lesson. It only changes `live`; it does not open anything.
- `liveDays`: lesson 4 stays "live" this many days after its start. Lessons 1-3 are live until the next lesson starts.
- `release.<lesson>.<part>`: when that part opens. Parts: `slides`, `vazifa`, `amaliyot`, `kitob`, `prep`. Value is `open`, a relative offset from that group's lesson start (`+0h`, `+3h`, `-2d`, `+30m`), or an absolute time. Lesson 0 offsets are relative to lesson 1's start.
- Defaults: `prep` is `open`; every other part is `+0h`.
- The server enforces it: locked parts are absent from payloads (only `opensAt`), and slide, clip, doc, book and prep-pdf endpoints answer 403 `locked`.
- The file is re-read when it changes (mtime). If an edit is invalid the server logs the error and keeps serving the last good copy; at startup an invalid file stops the server.

### Filling in the dates

1. Edit `content/schedule.json`: replace `null` with the four lesson start times of each group, increasing, e.g. `"shanba": ["2026-11-21T10:00", "2026-11-28T10:00", "2026-12-05T10:00", "2026-12-12T10:00"]`. Add `release` offsets only where a part should open later than its lesson start (`"1": { "vazifa": "+3h" }`); with no entry every part opens at the start. Lesson 1 never opens before the start.
2. Run `node --test` (it checks the shipped file: nothing in lessons 1-4 may open before that group's lesson 1).
3. Content is baked into the image, so the change goes live with a deploy (`railway up`, about a minute).

The precourse links (`prep.more` in `content/lessons/0/lesson.{uz,ru,en}.json`, shape in API.md) are filled in the same way; while the key is absent the section stays hidden.

### Before a deploy: back up the database

Migration 003 rebuilds the `students` table when the new version first starts. It is tested on a v2 copy, but take a copy of the live file first (WAL-safe, run on the server with the same `DATA_DIR`):
```
node -e "const {DatabaseSync}=require('node:sqlite');const d=new DatabaseSync(process.env.DATA_DIR+'/aip.db');d.exec(\"VACUUM INTO '\"+process.env.DATA_DIR+\"/aip-backup.db'\")"
```
(`VACUUM INTO` fails if the target exists; delete or rename an old backup first.) Then check the backup itself before you deploy (it must print nothing, and both counts must match the live ones):
```
node -e "const {DatabaseSync}=require('node:sqlite');const d=new DatabaseSync(process.env.DATA_DIR+'/aip-backup.db');console.log(d.prepare('PRAGMA foreign_key_check').all(),d.prepare('SELECT COUNT(*) c FROM students').get(),d.prepare('SELECT COUNT(*) c FROM progress').get())"
```
To go back, stop the app and put the backup in place as `aip.db`.

### Rotating the CRM key

Generate a new `INTEGRATION_KEY` (command in the env table), set it in the host's env vars, restart the app, then give the new key to the CRM developers. The old key stops working at the restart; there is only ever one key. Students created through the CRM have `created_by = 0` in the database (admin-bot students carry the admin's Telegram ID).

Abuse limits of the endpoint: 10 failed keys per 10 minutes per client (then 429), 300 authenticated calls per minute per client, and at most 100 new students per hour overall (past that: 429, one `ALERT` log line and one admin message per hour). A repeat payment for a deactivated student, or under another name, is answered 200 as usual but the admins get a "qayta toʻlov" card (once a day per student, 20 an hour overall). A refused authenticated request (bad name, phone, ...) sends one admin alert per 10 minutes, without the data. Logs refer to students by SQLite rowid (`#123`), never by ID.

## Content format

`content/lessons/{n}/lesson.{uz,ru,en}.json` (n = 0..4). A missing language falls back to `uz`. Edits are picked up without a restart.

Example (shortened) `lesson.uz.json` of lesson 1:

```json
{
  "n": 1, "title": "Kirish", "subtitle": "AI nima, modellar, Context, RAG, NotebookLM",
  "summary": "...", "topics": ["AI nima", "Modellar"],
  "slideCount": 78, "slideKind": "video",
  "hasBook": false, "bookNote": "", "bookVariants": [],
  "homework": "",
  "materials": [{ "art": "sources", "title": "Manbaalar", "note": "...", "files": [{ "slug": "hw-kompaniya", "name": "01_Kompaniya.pdf", "size": 21620 }],
                  "bundle": { "slug": "hw-manbaalar", "name": "Manbaalar.zip", "size": 60748, "label": "Hammasini yuklash" }, "footnote": "..." }],
  "prompts": { "title": "...", "subtitle": "...", "lede": "...", "rules": ["..."], "footnote": "...",
               "groups": [{ "title": "Asosiy mashq", "note": "", "items": [{ "id": "P1", "title": "...", "target": "...", "text": "..." }] }] },
  "praktikum": { "title": "...", "lead": "...", "rules": ["..."], "exercisesTitle": "", "exercisesNote": "", "promptsNote": "", "guide": { "slug": "qollanma", "name": "Talaba_qollanmasi.pdf", "size": 38284 }, "closing": null,
                 "exercises": [{ "key": "01-hr-onboarding", "num": "01", "tag": "ASOSIY", "title": "...", "note": "...",
                                 "yoriqnoma": { "slug": "01-hr-onboarding-yoriqnoma", "name": "01_Yoriqnoma.pdf", "size": 35017 }, "promptsPdf": null,
                                 "sources": [], "extras": [], "prompts": [{ "id": "P1", "target": "Chat", "title": "...", "text": "..." }], "notes": [{ "title": "...", "text": "..." }] }] },
  "prep": null
}
```

- A part exists if its fields are non-empty: slides (`slideCount > 0`), vazifa (`homework`, `materials` or `prompts`), amaliyot (`praktikum`), kitob (`hasBook`), prep (`prep`, lesson 0 only).
- Every downloadable file object has a unique `slug` (per lesson), a display `name` and a `size`. There is no path field.
- Course material (prompt texts and titles, exercise titles and notes, homework, group titles) is Uzbek in all three language files; only platform metadata is translated. `scripts/import-2.0.mjs` generated the files this way from `.design/ref-2.0-api/lessons_*.json`, dropping the 2.0 server paths and pre-rendered HTML.

### Where the files go

| What | Path | Name rule |
|---|---|---|
| Lesson downloads | `content/lessons/{n}/files/` | `<slug><ext>`, ext from the file's `name`, e.g. `hw-kompaniya.pdf` |
| Book (lesson 4) | `content/lessons/4/` | `book.pdf`, `book.cyrl.pdf` (variant `v` from `bookVariants`) |
| Slide stills | `content/lessons/{n}/slides/` | `1.webp` .. `N.webp` (`.jpg` / `.png` also work), 1-based |
| Slide clips (video lessons) | `content/lessons/{n}/clips/` | `{i}-1080.mp4`, `{i}-2160.mp4` |
| Prep checklist PDFs | `content/prep/` | `prep-uz.pdf`, `prep-ru.pdf`, `prep-en.pdf` (real files, from the prototype) |

### Placeholders

The 2.0 binaries are not available. Wherever a real file is missing the server falls back to a clearly marked stand-in:
- Downloads and books: `<name>.placeholder` next to the real name, e.g. `files/hw-kompaniya.pdf.placeholder` (a one-page PDF saying "PLACEHOLDER", a short text/CSV, or an empty ZIP). **To publish the real file, drop it at the name without `.placeholder`; it wins automatically** (delete the placeholder when you like).
- Slides: no files exist; `/slide/{i}` serves a generated SVG "i / N PLACEHOLDER slide". Clips return 404 until `clips/` has files.

Current placeholders (40): all of `content/lessons/1/files/*.placeholder` (hw-kompaniya, hw-narxlar, hw-yetkazish, hw-reklama, hw-eski-narxlar, hw-buyurtmalar, hw-yigilish, hw-manbaalar (zip), hw-qollanma, qollanma, sinov, and the yoriqnoma / promptlar-pdf / source files of exercises 01, 02, 03a, 03b, 04, 05, 06) and `content/lessons/4/book.pdf.placeholder`, `book.cyrl.pdf.placeholder`. Find them with `find content -name "*.placeholder"`. The `size` in the JSON is the 2.0 size, not the placeholder's.

## Security notes

- Sessions: random 32-byte token in the cookie; only its SHA-256 is stored; 24 h; a deactivated student is cut off immediately.
- Login: only FAILED attempts count, 10 per 10 minutes per client (IPv6 grouped by /64). A global budget of 300 failures per hour tightens every client to 1 attempt per minute until the hour ends, logs `ALERT ...` and (if the bot runs) messages the admins; nobody is hard-locked out. Unknown and inactive IDs get the identical 401. Origin must match the host or `PORTAL_URL`; the body must be JSON with only the allowed fields.
- IDs are never sent by the client after login; every call is checked against the session.
- Responses never contain filesystem paths; file endpoints resolve names only from the lesson JSON.
- Strict CSP, `nosniff`, `X-Frame-Options: DENY`, `no-store` on the API, `noindex`. API file responses may be framed by the portal itself (`SAMEORIGIN`); PDFs drop the page CSP (it breaks Chrome's viewer) and keep only `frame-ancestors 'self'`.
- node:http limits: `headersTimeout` 10 s, `requestTimeout` 15 s (time for the client to send its request; streaming a response such as a clip is not limited), 1000 connections. Oversized bodies get 413 with `Connection: close`.
- Shared addresses: a classroom or office behind one NAT shares one rate-limit bucket (and, on IPv6, one /64). Ten wrong IDs from anyone in the room within 10 minutes lock the whole room out for the rest of that window, so typos by a few students can block everybody. Hand out the IDs on paper or by message and tell students to copy them rather than type them.
- Sessions: the newest 5 per student are kept; expired rows are purged every 10 minutes.
- The slide "anti-capture" (blur, no right-click) is a frontend job; the server only gates by time and session.

## Re-importing

`npm run import-2.0` (or `node scripts/import-2.0.mjs`) rewrites the lesson JSON from `.design/ref-2.0-api` and re-creates missing placeholders. It overwrites hand edits to `lesson.*.json`: use it only for a fresh start.
