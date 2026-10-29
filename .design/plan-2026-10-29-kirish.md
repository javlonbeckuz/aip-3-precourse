# Plan 2026-10-29 (c): add 2.0 "Kirish" as lesson 02, numbers as 01-DARS (7 lessons)

This builds on `plan-2026-10-29-six-lessons.md`, which is committed as `ac4852c`. User decisions (final):

## Order and dates
| Card label | Lesson | Shanba | Yakshanba | Colour |
|---|---|---|---|---|
| TAYYORGARLIK (no number) | 0 Tayyorgarlik | open from purchase | | yellow (as now) |
| 01-DARS | AI qanday ishlaydi (curriculum Day 1) | 2026-11-21 10:00 | 2026-11-22 10:00 | lilac |
| 02-DARS | **Kirish** (2.0 lesson 1) | **TBA: date decided later** | **TBA** | grey |
| 03-DARS | Claude Code (Day 2) | 11-28 | 11-29 | blue |
| 04-DARS | API va MCP (Day 3) | 12-05 | 12-06 | dark |
| 05-DARS | Ishga tushirish (Day 4) | 12-12 | 12-13 | orange #FF7A2F, black text |
| 06-DARS | Agentni yaxshilash (Day 5) | 12-19 | 12-20 | emerald #0B7A55, white text |
| 07-DARS | Natijalar va demo kuni (Day 6) | 12-26 | 12-27 | **cyan #33CBEA, black text (10.87:1)** |

Colours follow position, so `LCOL[n]` gets an 8th entry. The desktop grid for 8 cards is probably 4+4.

## Schedule model change
- `LESSON_COUNT = 7`.
- `groups.<g>` is either an array of 7 entries or null. An entry may itself be `null`, which means that lesson's date is TBA. For now Kirish is `null` in both groups.
- The "increasing" check only applies to the non-null entries.
- A TBA lesson fails closed:
  - every part is locked, with `opensAt: null` and `start`/`date: null`;
  - it is never live;
  - `review` does NOT open it (same rule as group TBA).
- `live()`, `scheduleView` and `starts` skip null entries. The SPA shows "Sana keyinroq" on that card and in its lock sheet, reusing the TBA path.
- `liveOverride` is 1..7 and must not point at a TBA lesson.
- Content dirs: move `content/lessons/2..6` to `3..7` (git mv, highest first), then create the new `content/lessons/2`.

## Kirish content (from `.design/archive-2.0/lessons/1/`)
Copy it; don't move it, because the archive stays intact.

**Meta and slides**
- title, subtitle, summary and topics come from the 2.0 uz/ru/en files.
- `slideCount: 78` and `slideKind` as in 2.0. The slide stills were never downloadable (403), so the server serves the placeholder SVG until real stills land in `lessons/2/slides/`.
- The server logs a startup WARNING for any lesson with `slideCount > 0` but no stills. README tells the user to drop the stills in before setting the date.

**Converting 2.0 into the 3.0 blocks (UZ file only)**
- `vazifa` = 2.0 `homework` text, plus the 2.0 `materials` as groups (title, note, files) and the 2.0 `prompts` groups.
- `amaliyot` = the 2.0 `praktikum` lead and rules as text, plus each exercise as a group (title, note, files: yoriqnoma, sources, extras, promptsPdf) with its prompts.
- `kit` = null.
- Files are copied into `lessons/2/files/`, `.placeholder` files included. Each slug must pass `SLUG_RE`. Keep `name` as the student-facing file name.

**Block model extension**
- A group may carry `prompts: [{id, title, target?, text}]`.
- The server passes prompts through inside open blocks only. Prompt text stays Uzbek and is marked `lang="uz-Latn"` in ru/en.
- The SPA renders prompts with the existing `pli` copy rows.
- Copying a prompt writes the progress key `p:k2:{id}`, the same "copy = done" tick as 2.0.
  - If a prompt id is empty, use `P{index}`.
  - `TICK_RE` already allows `p:[a-z0-9]{1,8}:[A-Za-z0-9]{1,8}`. Use the page `l{n}` (e.g. `l2`) so it stays generic.
  - Prompt ticks are NOT counted in lesson units. Units stay slides / `f:am{n}` / `f:v{n}`.

## Numbering
- Lesson labels are zero-padded:
  - UZ `01-DARS` (`lesson.n` = `{nn}-dars`, uppercased where the label is caps);
  - RU `Урок 01`;
  - EN `Lesson 01`.
- Use `num2` (it already exists in proto_app.js) wherever a lesson number is shown: cards, the lesson page H1 line, the lock sheet ("02-dars sanasi keyinroq eʼlon qilinadi."), the slide viewer title, the next-step pill and the menu.
- Tayyorgarlik never shows a number. Its card label is just "TAYYORGARLIK" (not "0-DARS · TAYYORGARLIK"), and the prep page has no number either.
- Bot: `darslar d/7` comes from the payload length. Bot texts that mention a lesson number use the same `01` form, if there are any.

## Other
- The ring is done/7. Every 6 or `/6` literal becomes 7, preferably derived from the count rather than written out.
- `menu.course_tba`: "7 dars, sanasi keyinroq" (RU/EN too); `menu.course_*` should be derived from the count if possible.
- The prototype demo: 7 lessons. Kirish has the 2.0 sample with `ph:true`. TODAY_PRESETS still work.
- Tests: update every count. Add tests for:
  - a TBA lesson inside a dated group: locked, `opensAt` null, review cannot open it, never live;
  - schedule validation with a null entry;
  - prompts passing through only when the part is open;
  - the `p:l2:*` key;
  - the shipped invariant: lessons 1 and 3-7 have dates and 2 is null.
- Docs: API.md and README.md.

## Next: one locked course folder + 3D paper animation (user, 2026-10-29)
User pasted a React/Tailwind "file folder" component: a back panel with a tab, 3 paper sheets (`work-4/3/2`) inside, and a front panel (`work-1`) with its own tab. On hover, the sheets and the front tilt back with rotateX (-20, -30, -38, -46deg) on `perspective:1500px`, origin bottom.
Take the ANIMATION ONLY. Keep our flat lesson colours. No gradients, no shadows, no inset glows.

- **Before the course starts** (lesson 01 not open yet), the home order is:
  1. the **Tayyorgarlik** folder (open, with this animation);
  2. **ONE locked "course" folder** holding all 7 lessons as papers inside: label like "KURS · 7 dars", 🔒 "21-noyabrda ochiladi" (the group's lesson 01 date, or "Sana keyinroq" if the group is TBA). Tapping it opens the lock sheet, listing the 7 lessons with their dates.
- **After the start** (lesson 01 open), the big folder is gone. The lessons show as separate folders (01-07, each opening on its own date), and the **Tayyorgarlik folder moves AFTER all lesson folders**.
- **Every folder card** (lessons and Tayyorgarlik) gets the 3D paper animation:
  - on hover for `(hover:hover)` pointers;
  - on press or focus-visible on touch and keyboard;
  - none under `prefers-reduced-motion`.
- Papers use neutral tints of the card's own colour or the existing greys. No new colour language.

## Change (user, 2026-10-29 evening): Kirish has NO number
The curriculum has 6 days. Kirish is not in it, so it is unnumbered, like Tayyorgarlik. Numbered lessons are **01-06 = curriculum Day 1-6**.

Card order (internal lesson n stays as is; only the DISPLAY changes):

| Internal n | Card label | Lesson |
|---|---|---|
| 0 | TAYYORGARLIK | Tayyorgarlik |
| 1 | 01-DARS | AI qanday ishlaydi |
| 2 | **KIRISH** | Kirish (no number, still grey, date TBA) |
| 3 | 02-DARS | Claude Code |
| 4 | 03-DARS | API va MCP |
| 5 | 04-DARS | Ishga tushirish |
| 6 | 05-DARS | Agentni yaxshilash |
| 7 | 06-DARS | Natijalar va demo kuni |

**Content.** `lesson.uz.json` for lesson 2 gets `"numbered": false`. The server adds `num` to every lesson in the payload:
- 1..6 for numbered lessons, counted in order and skipping unnumbered ones;
- `null` for 0 and for Kirish.

Labels use `num2(num)`. When `num` is null, the label is the lesson's short name, as Tayyorgarlik's is, so the Kirish card label reads "KIRISH". Lock sheet: "Kirish sanasi keyinroq eʼlon qilinadi."

**Counting (default, pending user OK).**
- Kirish is NOT counted in the ring, the all-done check, the course size or the bot summary. Those are numbered lessons only: ring x/6, "KURS · 6 DARS", menu "6 dars", bot `darslar d/6`.
- Kirish progress is still stored, and its prompts still tick.
- The course folder's date list still shows Kirish as an unnumbered row.

**Colours** stay by internal n: Kirish grey, then blue, dark, orange, emerald, cyan.

**Prep text.** Change "03-darsdan" back to "02-darsdan", because Claude Code is now 02. "01-dars oxirida" stays as it is. Same in RU and EN ("с урока 02", "from Lesson 02"). Reprint the PDFs.

**Tests.**
- `num` mapping.
- Ring and summary over numbered lessons only.
- The bot shows /6.
- The shipped invariant: `num` sequence 1..6 with Kirish null.
