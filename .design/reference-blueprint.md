# Reference blueprint — AI Praktikum 2.0 precourse portal

Source: https://ai.birfoizbilim.uz/aip/ (researched 2026-10-15, logged in as demo ID `XM`).
Goal for 3.0: keep WHAT it does, replace the look entirely.

Not seen (403 on binary endpoints): slide images/clips, PDF/CSV contents, rendered lesson/task/exercise pages.

**2026-10-17: the full 2.0 content is captured.** `POST /api/aip/login {"id":"XM"}` (with an `aip_lang` cookie for uz/ru/en) returns every lesson's text: prep steps, all prompts, exercises, Hermes cards. Dumps: `.design/ref-2.0-api/lessons_{uz,ru,en}.json`; lesson-0 prep plus 2.0's four prep pictures: `.design/ref-prep-2.0/`. Use these, not placeholders. Re-fetch if 2.0 changes.

## 1. Purpose and users
- Private student portal for "AI Praktikum 2.0": HEAD's offline AI course for business owners in Tashkent. Mentor: Xurshid Maroziqov (1% bilim / Head.uz).
- Students get, for each weekly session: slides, homework (Vazifa), in-class practical (Amaliyot) with source files and copy-ready prompts, a book, and a pre-course prep checklist.
- Students: personal ID, group (`shanba` = Saturday / `yakshanba` = Sunday), mentor.
- No admin UI. Content comes from outside the portal (a CRM plus a slide "push script" and files on the server).
- The root https://ai.birfoizbilim.uz/ is already the 3.0 waitlist page (Tashkent, offline, 36,000,000 so'm, date TBA). The portal itself is `noindex`.

## 2. Routes and flow
One HTML shell is served for every /aip/* path (Node: `aip.js`, `aip-i18n.js`). The client routes with the History API.

| URL | View |
|---|---|
| `/aip/` | Gate (ID door), or the lesson list ("Dastur") when a session exists |
| `/aip/dars/{n}` | Lesson: cards for Slaydlar, Vazifa, Amaliyot, Kitob (+ prep for lesson 0) |
| `/aip/dars/{n}/slaydlar` | Fullscreen slide viewer |
| `/aip/dars/{n}/vazifa` | Homework text + materials panels |
| `/aip/dars/{n}/vazifa/promptlar` | Homework prompt sheet |
| `/aip/dars/{n}/amaliyot` | Practical index: rules, guide, exercises, closing |
| `/aip/dars/{n}/amaliyot/{key}` | Exercise: brief PDF, prompts PDF, sources, prompt cards, notes |

- Unknown paths and locked lessons redirect to `/aip/`.
- Back goes to the parent view on deep links.
- `pageshow` re-checks `/me` to handle Safari's bfcache.

**Flow:**
1. **Gate:** the ID field auto-submits once 6 characters are typed (Enter for short IDs). A welcome animation ("Xush kelibsiz, {name}!") follows.
2. **Lesson list:** state chips are "{date}gacha" for prep, "Davom etmoqda" for live, "Ochiq" for open, and a date when locked.
3. **Lesson page:** a card is clickable only when it has content; otherwise it shows "opens after the lesson".
4. **Viewers:** the viewers and file downloads open from the lesson page.
5. **Logout:** from the name menu.

**Absent in 2.0:** signup, password, progress tracking, quizzes, submissions, leaderboard, certificate, comments, Telegram, analytics.

## 3. Content inventory (2.0)
The Saturday group met on 12, 19 and 26 Sep and 3 Oct 2026. The Sunday group met a day later each week. Four sessions in all.

| n | Title | Subtitle | Slides | Vazifa | Amaliyot | Other |
|---|---|---|---|---|---|---|
| 0 | Tayyorgarlik | Oʻrnatish va tayyorgarlik | – | – | – | Prep checklist (4 items) + PDF |
| 1 | Kirish | AI, modellar, Context, RAG, NotebookLM | 78 video | "Ravon Uy" NotebookLM case | 7 exercises | – |
| 2 | Claude va Code | Claude, Code/Cowork, terminologiya | 63 image | free text | 47-prompt library | – |
| 3 | Skill va agentlar | Skill, Plugin, Connector, Plan, agent teams, here.now | 40 video | free text | – | – |
| 4 | Agent va alternativalar | Hermes Agent, /oops, alternativalar | 0 | – | 10 Hermes cards | Book |

**Lesson 0, prep checklist:** "Hammasi 30 daqiqa" (all in 30 minutes). Full text (notes, 3/4/5/3 steps, actions incl. "Google akkaunt ochish") is in `.design/ref-prep-2.0/prep_uz.json`; the list below is a summary only.
- Kompyuter: MacBook, ≥5 GB free.
- Google account.
- Claude: account + desktop app.
- Visa card: needed for Claude Pro at $20; Uzcard and Humo don't work.
- Public PDFs: `/aip/asset/prep-{uz|ru|en}.pdf`.

**Lesson 1:**
- **Vazifa:**
  - 7 source files + a zip.
  - Talaba_qollanmasi.pdf (student guide).
  - Prompt sheet: 3 rules, P1–P8 main, Q1–Q5 extra.
- **Amaliyot:** "Korxona bilimini ishga soling" (put the company's knowledge to work).
  - Guide file + closing file (Biznesimda_7_kunlik_sinov.pdf, a 7-day trial in your own business).
  - Exercises: 01 HR · 02 Savdo · 03A Servis / 03B Ombor (pick one) · 04 Marketing · 05 Xarid (extra) · 06 Rahbar audio.
  - Each exercise has a brief PDF, a prompts PDF, 1–3 sources, and prompts with a `target` (where in NotebookLM to paste the prompt).

**Lesson 2 Amaliyot:** 47 prompts in 5 sections, with [bracket] placeholders.
- Biznes gʻoyalar 01–11
- Tanqidiy fikrlash 12–20
- Savdo 21–32
- Reklama 33–39
- Oʻrganish 40–47

**Lesson 4 Amaliyot:** Hermes personal agent. Each card has a "Natija" (result) line, prompts with send-to labels, and notes.
- 01 Oʻrnatish
- 02 Miya
- 03 Panel/gateway
- 04 Telegram
- 05 Intervyu
- 06 Xotira (USER.md)
- 07 Ertalabki brifing (cron)
- 08 Yakuniy sinov
- 09 VPS
- 10 bonus: Ovozli agent

**Lesson 4 book:** "Biznesda AIʼni qoʻllash" (applying AI in business), Latin + Cyrillic (`?v=cyrl`).

**Media:** Keynote exports served one per slide, as 1600px stills or MP4 clips (1080/2160). No YouTube.

**Languages:** the UI and metadata exist in UZ/RU/EN. Prompts and files are mostly Uzbek only.

## 4. Features
**Auth:** a personal ID, `AIP-` + 6 chars from `23456789ABCDEFGHJKMNPQRSTUVWXYZ`. Short hand-assigned IDs exist too (`XM` = demo mentor).
- `POST /api/aip/login {id}` returns `{ok, student, lessons, schedule, live}` and sets the cookie `__Host-aip_session` (HttpOnly, Secure, Lax, 24 h).
- Login is rate-limited to 8/min, with an origin check.
- Content is per group, not per student.

**Gating:**
- A lesson opens when it is `published` or has homework or prep.
- The live lesson goes by date, unless `live.override` (set from the CRM) pins one.

**Language:** the `aip_lang` cookie + a reload. Strings are rendered on the server.

**Prompt cards:** copy-to-clipboard with a fallback.

**Slide viewer:**
- Navigation: keyboard, swipe and tap zones; fullscreen.
- Clips double-buffered, LRU frame cache.
- Anti-capture: blur on tab blur/PrintScreen, no right-click, no image URLs in the DOM.

## 5. Stack and data model
**Stack:**
- Cloudflare → Node.
- Vanilla JS inline in one HTML file (~150 KB).
- Strict CSP.
- `liquidglass.js`, `orbs.js`.
- Fonts: Inter, Manrope, Raleway, Orbitron.

**Endpoints:**
- `POST /api/aip/login`
- `GET /api/aip/me`
- `POST /api/aip/logout`
- `GET /api/aip/lesson/{n}/slide/{i}`
- `GET|HEAD /api/aip/lesson/{n}/clip/{i}?q=1080|2160`
- `GET /api/aip/lesson/{n}/doc/{slug}`
- `GET /api/aip/lesson/{n}/book[?v=cyrl]`
- `/aip/asset/*` (public)

```
student {id, fullName, firstName, mentor, group:'shanba'|'yakshanba'}
schedule {shanba:date, yakshanba:date, sessions:4}   live {override:n|null}
lesson {n, title, subtitle, summary, topics[], date, published, slideCount, slideKind:'image'|'video',
  hasBook, bookNote, bookVariants[{v,label}], homework, materials[], materialsHtml,
  prompts:{title,subtitle,lede,rules[],footnote,groups[{title,note,items[{id,title,target,text}]}]}|null,
  praktikum:{title,lead,rules[],exercisesTitle,exercisesNote,promptsNote,guide:file|null,closing:file|null,
    exercises[{key,num,tag,title,note,yoriqnoma:file,promptsPdf:file,sources[file],extras[file],
               prompts[{id,title,target,text}],notes[{title,text}]}]}|null,
  prep:{intro,items[{brand,title,note,steps[],actions[{label,url,quiet?}],footnote?}],html}|null }
materials[] {art:'sources'|'prompts'|'book', title, note, files[file], bundle?, opens?, cta?, count?, footnote?}
file {slug, name, size, file?}
```
Leak to avoid in 3.0: `file.file` exposes paths on the server.

## 6. 2.0 look (replace)
- Dark, `#121212` / `#171717`, Inter, "libraries.dev" style.
- Gate: a cinematic mountain hero, a liquid-glass pill input, and the ID in Orbitron.
- Live card: Claude-orange `#D97757` gradient with a dancing pixel-Claude mascot. A thinking-orb plays during load.
- Lessons: a 2-column grid of rounded cards with 3D-ish illustrations.

## 7. Must keep for parity
- Server-checked personal-ID login, session cookie, rate limit.
- Student name, group and mentor.
- Two cohorts, with dates per group.
- Lesson states (locked / open / live / prep) + live pin.
- Lesson views:
  - Slides viewer
  - Vazifa + prompt sheet
  - Amaliyot index/exercise with copyable prompts and a "where to paste" target
  - Book variants
  - Prep checklist
- UZ/RU/EN.
- Deep links + Back.
- Mobile.
- Slide protection.
