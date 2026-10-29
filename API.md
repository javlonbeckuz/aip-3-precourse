# API contract

Base path `/api/aip` (the student portal) and `/api/int` (the CRM, see "CRM integration"). JSON in, JSON out. Every API response carries `Cache-Control: no-store`.
Errors always look like `{ "error": { "code": "...", "message": "..." } }`, sometimes with extra fields inside `error` (`opensAt`, `retryAfter`).

Auth: cookie `__Host-aip_session` (HttpOnly, Secure, SameSite=Lax, 24 h) in production; plain `aip_session` without Secure on http dev. The client never touches it. POST/PUT need `Content-Type: application/json` and, if the browser sends `Origin`, it must be the portal's own origin.

Language: `?lang=uz|ru|en`, else the `aip_lang` cookie, else `uz`. Only platform text is translated (titles, subtitles, summaries, topics and prep). Slides and the amaliyot, kit and vazifa blocks are always read from the Uzbek lesson file, in every language.

All times are ISO 8601 with the Tashkent offset, e.g. `2026-09-12T10:00:00+05:00`.

## Shared shapes

```
student  { id, fullName, firstName, mentor, group: "shanba"|"yakshanba"|null }   // group is null until an admin picks one; the phone is never in this payload
schedule { sessions: 7, shanba: "2026-11-21"|null, yakshanba: "2026-11-22"|null, group, starts: { "1": iso|null, ... "7": iso|null } }   // starts = this student's group; null = date to follow (the whole group, or just that lesson)
live     { n: 0..7, override: null|1..7 }      // n = the live lesson for this student's group (0 = none); override = pinned by schedule.json
progress { t: { "<tick key>": 1 }, sl: { "1": 12 } }              // sl[lesson] = highest slide reached, 1-based
file     { slug, name, size }                   // no server path, ever; size = integer number of bytes
```

### lesson (what a student may see)

```
{ n, num, title, subtitle, summary, topics[],   // n = folder/URL number (0..7); num = the number to DISPLAY: 1..6 in order over the numbered lessons, null for lesson 0 and for unnumbered ones (Kirish, n=2: "numbered": false in its uz file). Use num, never n, in labels ("03-dars" for num 3); a null num shows the short name
  start: iso|null, date: "YYYY-MM-DD"|null,           // this group's lesson start; null for lesson 0, and null while the dates are to follow (or the student has no group)
  has:   { slides, amaliyot, kit, vazifa, prep },   // booleans: the part exists at all (render or hide the row)
  parts: { <part>: { open: true } | { open: false, opensAt: iso|null } },   // only parts that exist; opensAt null = date to follow
  open:  true if any part is open,
  // then, ONLY for open parts:
  slides   -> slideCount, slideKind: "image"|"video"
  amaliyot -> amaliyot block   // read from the Uzbek lesson file in every language
  kit      -> kit block        // the day's form (.md) + the ready-made skill (.zip)
  vazifa   -> vazifa block
  prep     -> prep { intro, items[{ brand, title, note, steps[], actions[{label,url,quiet?}], footnote? }],
                     more?: { title, note, links[{ title, note, url }] } }   // more = extra links under the checklist; absent = hide the section; not counted as prep items
}
block    { text, groups[{ title, note?, files[file], prompts?[{ id, title, target?, text }] }] }   // prompts: copy rows, Uzbek text in every language (lang="uz-Latn"); ids are 1-8 letters/digits, unique per lesson; they travel only inside an open block   // text = paragraphs separated by a blank line; a part exists when it has text or at least one group
// A lesson with no parts yet ("empty": has all false) has parts: {} and open = true from its start time on (review: at once). Show "materials soon".
// Title, subtitle, summary and topics follow ?lang= / the lang cookie; blocks and slides never do. prep follows the language (lesson 0).
```

Notes for the frontend:
- A locked part has NO content fields in the payload, only `parts.<part>.opensAt`. Show "opens on ...".
- Dates to follow: while a group's dates are not decided (`groups.<g>: null` in schedule.json), and for a student with no group, lessons 1-7 stay locked, `start`/`date`/`opensAt`/`schedule.starts.*`/`schedule.<group>` are `null` (show "date to follow"), and `live.n` is 0. Lesson 0 (prep) is still open. A 403 `locked` then carries `error.opensAt: null`.
- One lesson can be TBA inside a dated group (`null` in that group's array; shipped: lesson 2 "Kirish"). It behaves like the group case for that lesson only: `start`/`date`/`opensAt` null, every part locked, never live, and `review` does not open it. Other lessons are unaffected. `starts["2"]` is null.
- Lesson 0 (prep) is open at once. Lessons 1 and 3-7 ship with `has.amaliyot` and `has.vazifa` true (Uzbek only, with prompts) and no slides or kit: show only those tabs. The empty state (all `has.*` false, "materials soon") is for a lesson added later. Lesson 2 (Kirish, the 2.0 lesson) has slides (78, placeholder svg until stills land), amaliyot and vazifa with prompts, and no kit.
- Progress counts numbered lessons only (`num` not null): the ring and the bot are x/6, Kirish progress is stored but not counted. Kit is not counted in progress. The counted units are: slides reached (`sl:{n} >= slideCount`), the `f:am{n}` tick, the `f:v{n}` tick.
- `prep.intro` contains the placeholder `{sana}`; fill it with `lessons[1].date` formatted. When `lessons[1].date` is null (dates to follow) do not fill it in; use the "date to follow" text instead.
- File URL: `/api/aip/lesson/{n}/doc/{slug}`.

## Auth

### POST /login
Body `{ "id": "XM" }` (only `id`; unknown fields are rejected). The id is case-insensitive; `AIP-` may be typed or omitted.
No auth. Only FAILED attempts count against a client (10 per 10 minutes, IPv6 by /64); successful logins are free. If the global failure budget trips, every client is held to 1 attempt per minute for the rest of the hour. Origin check.

200: `{ ok: true, lang, student, lessons: lesson[], schedule, live, progress }` plus `Set-Cookie`.

Errors: 400 `bad_id` (empty/garbage), 400 `unknown_field`, 400 `bad_json`, 401 `invalid_id` (unknown AND inactive ids give the same answer), 403 `bad_origin`, 413 `too_large` (sent with `Connection: close`), 415 `unsupported_media_type`, 429 `rate_limited` (`Retry-After` header and `error.retryAfter` seconds).

### GET /me
Auth. Same body as login (fresh state: use it on load and on `pageshow`). 401 `unauthorized` when there is no valid session. A deactivated student gets 401 at once.

### POST /logout
Body `{}`. Clears the cookie, returns `{ ok: true }`. Always 200.

## Lessons and files (auth required for all; 401 `unauthorized`)

| Method and path | Returns | Gate |
|---|---|---|
| `GET /lesson/{n}` | `{ ok, lesson }` | none (locked parts come back as `opensAt`) |
| `GET /lesson/{n}/slide/{i}` | image (`i` is 1-based; svg placeholder until real stills are added) | slides |
| `GET\|HEAD /lesson/{n}/clip/{i}?q=1080\|2160` | `video/mp4`, Range supported; 404 when no clip exists | slides |
| `GET /lesson/{n}/doc/{slug}` | the file; PDFs inline, others as attachment | amaliyot, kit or vazifa, by which block lists the slug; sent under its real file name |
| `GET /prep/pdf?lang=uz\|ru\|en` | prep checklist PDF | prep |

Errors: 403 `locked` with `error.opensAt` before the opening time (slides, clips); a locked `doc` answers 404 `not_found`, exactly like an unknown slug, so file names cannot be probed; 404 `not_found` (no such lesson, part, slide, clip or file); 400 `bad_quality`.

## Progress (auth)

### GET /progress
`{ ok, progress }`.

### PUT /progress
Body `{ "key": "...", "value": ... }` (only these two fields). One key per call; send it optimistically and ignore the response unless you want the full state. Returns `{ ok, progress }`.

| Key | Value | Meaning |
|---|---|---|
| `prep:{0-99}` | `1` set, `0`/`null` clear | prep item ticked |
| `p:{page}:{id}` | same | prompt marked. `page`: any `[a-z0-9]{1,8}`; lesson prompts use `l{n}` with the prompt id from the payload (`p:l2:P1`, `p:l2:01P1`): copying a prompt sets it; these ticks are not counted as units. The 2.0 pages (`01`..`06`, `v1`, `lib`, `h01`..`h10`) are legacy: still accepted, nothing in 3.0 uses them; `id`: `P1`, `12`, ... (`[a-z0-9]{1,8}` and `[A-Za-z0-9]{1,8}`) |
| `x:{name}` | same | end toggle "Bajarildi" (`x:01`, `x:h04`) |
| `f:{name}` | same | manual finish: `f:am{n}` (amaliyot) and `f:v{n}` (vazifa), n = 1..7 |
| `sl:{1-9}` | integer 0..1000 | slide high-water mark, 1-based (the number of the furthest slide seen); the server keeps the maximum and never lowers it |

There is no client-writable unlock switch: the early opening of every lesson is the server-side `students.review` flag, set by hand in the DB (README). `u4` is rejected as `bad_key`.

Limits: body 256 bytes, 600 keys per student, 240 writes per minute. Errors: 400 `bad_key`, 400 `bad_value`, 400 `unknown_field`, 400 `too_many_keys`, 413, 429 `rate_limited`, 403 `bad_origin`.

## CRM integration

For the developers of the HEAD CRM. Call this endpoint when a student's **first payment** is received (any amount; normally 3,000,000 so'm). The portal then creates the student's login ID and notifies the admins in Telegram. The CRM does not need to know the group: the admins set it from a button.

```
POST https://<portal host>/api/int/students
Authorization: Bearer <INTEGRATION_KEY>
Content-Type: application/json
```

The key is a secret of at least 32 characters, shared out of band; keep it on the CRM server only. If the portal has no key configured the endpoint answers 404. There is no cookie and no Origin check; send only server-to-server.

Body (JSON object, at most 1024 bytes, no other fields):

| Field | Type | Required | Notes |
|---|---|---|---|
| `fullName` | string | yes | 2-80 characters |
| `phone` | string | yes | any common spelling of an Uzbek number (`+998 90 123 45 67`, `998901234567`, `901234567`, `(90) 123-45-67`); a foreign number needs a leading `+` and 8-15 digits. Stored as `+998901234567`. This is the duplicate key. |
| `group` | string | no | `"shanba"` or `"yakshanba"`; empty or missing = no group yet |
| `mentor` | string | no | up to 80 characters |

A field of another type than string is treated as empty.

Responses (all JSON). The success bodies carry **no** student data (no ID, name or phone): the admins forward the ID to the student, the CRM never needs it.

| Status | Body | When |
|---|---|---|
| 201 | `{ "ok": true, "created": true }` | new phone: student created, admins notified |
| 200 | `{ "ok": true, "created": false }` | this phone is already known: nothing changed. If that student is deactivated, or the CRM sent a different name than the one on file, the admins get a "repeat payment" notice to look at (still 200). A plain retry with the same name is silent, and the same student is reported at most once a day (20 notices an hour overall). |
| 400 | `{ "error": { "code": "...", "message": "..." } }`, code one of `bad_name`, `bad_phone`, `bad_group`, `bad_mentor`, `bad_json`, `unknown_field` | invalid input. Invisible formatting characters (zero-width, bidi marks) in a name or mentor are removed, control characters are refused. A refused request alerts the admins (at most one alert per 10 minutes, so check the CRM's own log for others); fix and resend. |
| 401 | `unauthorized` | missing or wrong key (the scheme is exactly `Bearer`) |
| 404 | `not_found` | the portal has no integration key configured (every method on `/api/int/*`) |
| 405 | `method_not_allowed` | any method but POST on this path |
| 413 | `too_large` | body over 1024 bytes |
| 415 | `unsupported_media_type` | not `application/json` |
| 429 | `rate_limited`, with a `Retry-After` header | 10 failed keys per 10 minutes per client; more than 300 calls per minute per client; or more than 100 new students per hour overall (a spent cap answers 429 for known phones too) |

Retrying is safe: the phone number is the identity, so a repeated or timed-out call returns 200 instead of making a second student. **Retry 429 and 5xx** (and network errors) with the same body, after `Retry-After` or with exponential backoff. **Do not retry any other 4xx**: fix the request (or the key) first.

```
curl -sS -X POST https://<portal host>/api/int/students \
  -H "Authorization: Bearer $INTEGRATION_KEY" \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Ali Valiyev","phone":"+998 90 123 45 67"}'
```

The admins' own flow (bot `/new`) also refuses a phone that is already registered, so the same person never gets two IDs.

## Other

- `GET /health` -> `{ "ok": true }` (no auth, outside `/api`).
- Everything under `/aip/*` that is not a real file in `public/` returns the SPA shell (`public/aip/index.html`, else `public/index.html`). `/aip` redirects to `/aip/`.
- CSP (non-API pages): `default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self' blob:; font-src 'self'; connect-src 'self'; frame-src 'self' blob:; manifest-src 'self'; object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'`. API file responses (documents, slides, clips) may be framed by the portal itself; PDFs are served without the page CSP (only `frame-ancestors 'self'`) so browsers can show them. Slides and clips carry `Cache-Control: private, max-age=3600`; everything else in the API is `no-store`. So: no inline `<script>` and no `eval`; JS must be external files. Inline `style=""` is allowed.
