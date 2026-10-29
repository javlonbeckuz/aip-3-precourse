# Plan 2026-10-29: purchase → ID → precourse-only access

User decisions (2026-10-29):
- The user's own Telegram bot (linked to the CRM) calls our API to create students. The platform never talks to the CRM.
- Our admin bot stays. It auto-posts each new ID and a forwardable message to the admins; the admins send it on by hand.
- A student has name, phone, group and mentor. The duplicate key is the normalized phone (2.0 deduped by name, which was a bug).
- Students see only lesson 0 (setup plus links to HEAD platforms) until the start. Lessons 1-4 open part by part on the user's dates.

## FINAL CHANGES to the decisions above (user, later on 2026-10-29). These win over section A where they differ
- The caller is HEAD's own self-built **CRM** (not a bot of the user's). The CRM decides when access is earned: any first payment, normally 3,000,000 so'm, partial payment allowed. It then POSTs `{fullName, phone}` to our integration endpoint with the bearer key. The CRM does NOT know the group.
- So `group` (and `mentor`) are OPTIONAL in the API. A student created by the CRM has `grp = NULL`:
  - they see precourse only, with lessons 1-4 locked and "Sana keyinroq" (section B, fail closed);
  - this needs migration 003 to rebuild `students` so `grp` is nullable (`CHECK (grp IS NULL OR grp IN ('shanba','yakshanba'))`) and to add `phone`.
  - SQLite can't drop NOT NULL in place. Because of the FKs from sessions and progress, `migrate()` must run with `PRAGMA foreign_keys=OFF` around the rebuild (outside the transaction) and run `PRAGMA foreign_key_check` after.
  - Only the demo XM exists live, but the upgrade test must still prove that rows and progress survive.
- The admin announce card carries inline buttons **Shanba / Yakshanba** (callback such as `sg:<ID>:<grp>`). Pressing one sets the group, edits the card to show it, and works for any admin. `/edit` remains for the mentor and for fixes.
- `/new` in the admin bot keeps asking for the group, since admins know it.
- `/list` and the bot's group labels must handle a NULL group ("Guruh yoʻq"). `/list` without arguments shows everyone; add `/list yangi` for the students who still have no group.
- Write a short integration note for the CRM developers in `API.md`: the URL, the header, the JSON body, the responses, that a retry is safe, and a curl example.

## A. Backend (CRM API + phone)
1. `server/migrations/003_phone.sql`: `phone TEXT` plus a partial unique index. Safe on the live DB; back up first with `VACUUM INTO`.
2. `db.js`:
   - `normPhone` stores `+998XXXXXXXXX` and accepts `993038999`, `998…` and `+998 99 …`.
   - Shared `clean()`.
   - `getStudentByPhone`, a `duplicate_phone` 409, and `updateStudent`.
   - `/find` also matches phone.
   - Narrow the id-retry catch so a phone UNIQUE error doesn't trigger the retry loop.
3. `auth.js`: `bearerOk`, a constant-time comparison of SHA-256 hashes.
4. `index.js`: `POST /api/int/students` with `Authorization: Bearer <INTEGRATION_KEY>` (≥32 chars).
   - Without the key the endpoint is off (404).
   - 60 requests/min per client.
   - Idempotent: a known phone returns 200 `created:false` with the existing ID; a new phone returns 201 and announces to the admins without awaiting it.
5. `bot.js`:
   - `/new` (also `/new_user`) asks name → phone → group → mentor.
   - The success message has the 2.0 shape, plus the forwardable message.
   - A duplicate shows the existing student's card.
   - New `/edit <ID> ism|telefon|guruh|mentor <value>`.
   - `announce()` DMs every `ADMIN_TG_IDS`. There's no outbox, so a failure is only logged.
6. Phone numbers never go to logs or to the student payload.
7. Tests:
   - new `server/integration.test.js`;
   - phone steps in `bot.test.js` and `hardening.test.js`;
   - migration upgrade test.
8. Docs: `API.md` (integration contract), `README.md`, `.env.example`.

## B. Locking + precourse (content + SPA)
1. `content.js` treats `groups.<g>: null` as "dates TBA": lessons 1-4 stay shut (fail closed), dates are null, live = 0, prep stays open.
2. `schedule.json`: groups null, `release: {}`. When the dates arrive, fill 4 times per group plus per-part offsets (`+3h`, `+2d`, absolute).
3. Lesson 0 gets `prep.more` = `{title, note, links[{title, note, url}]}`.
   - It is not counted as prep items, and no server change is needed.
   - Each language file has its own copy.
   - The section stays hidden until the links exist.
4. SPA (`.design/comp/src/`):
   - a "Date to follow" path (fixes the `[1,1]` → "1-yanvar" bug);
   - a links section under the prep checklist using the existing file-row pattern;
   - a pill to the links once prep is done;
   - a TBA lock-sheet title;
   - menu TBA text.
5. Remove the em-dashes in the lesson 0 copy.
6. `testutil.tmpCopy` pins fixture dates so the gating tests don't break when `schedule.json` changes. Tests to add: a TBA gating test, null-schedule parse, and a shipped-file invariant (nothing opens before lesson 1).
7. Content stays baked into the image: date and link edits mean `railway up` (about a minute).

## Fill-in template (user)
```
Shanba:    1-dars ____-__-__ __:__  2-dars …  3-dars …  4-dars …
Yakshanba: 1-dars ____-__-__ __:__  2-dars …  3-dars …  4-dars …
Part openings (+0h default; +3h / +2d / exact date-time). Lesson 1: nothing before start.
          Slaydlar  Vazifa  Amaliyot  Kitob
1-dars    ___       ___     ___       -
2-dars    ___       ___     ___       -
3-dars    ___       ___     -         -
4-dars    -         -       ___       ___
Precourse links: section heading (UZ/RU/EN), then per link: url, title, one line about it.
```

## Rollout
1. Back up the DB.
2. Build: `build.py --app`.
3. Run `node --test`.
4. `railway up`.
5. Set `INTEGRATION_KEY`.
6. Give the key to the user's bot.
7. Test once with curl and check that the admin DM arrives.
