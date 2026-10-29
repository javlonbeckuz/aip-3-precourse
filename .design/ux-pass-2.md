# UX pass 2: AI Praktikum 3.0 student prototype

- **Walked:** `AI-Praktikum-3.0-final.html` on 2026-10-17, as a non-technical business owner. Viewports: 390×844 (mobile emulation) and 1440×900, headless Chrome over CDP.
- **Start state:** empty progress, `aip3.demo.v1 = {"t":{},"sl":{"1":0,"2":0,"3":0,"4":0},"u4":0}`, default demo date (lesson 3 live). Lesson 4 was opened with `S.setU4(true)` for the Hermes cards and the book.
- **Route:** login → home → prep → lessons 1–4 → slides → Vazifa + prompt sheet → Amaliyot → exercise → Hermes cards → book → name menu.
- **Skipped (already in progress):** date-driven lesson states and the day-0 hero; the lesson 2 library split.
- **Rules:** every fix stays inside the 2.0 skeleton (`reference-blueprint.md`) and the decided look (`taste-profile.md`). No new screens.
- **Screenshots:** `C:/Users/User/AppData/Local/Temp/claude/C--Users-User-vs-code-HEAD-projects-praktikum3-precourse-platform/7b93abd2-e86f-4f93-b0fc-efc57770bbb1/scratchpad/ux2/`. `m-*` = 390 with the popup showing, `mc-*` / `dc-*` = 390 / 1440 with the popup dismissed.
- **Labels:** **SAFE** = pure usability, no taste sign-off needed. **LOOK** = changes what the screen looks like, so the user decides.

---

## P1 · Blocks the student

### 1 · The "Yangi dars ochildi" popup follows the student onto every screen · all routes
- **What happens:**
  - After login, the white popup (`aside.nl`, `position:fixed`, 138px tall at 390) stays on screen across every route until the student taps "Yopish".
  - Its own "Darsni ochish" link goes to `#/dars/3` but does not close it, so it then covers lesson 3's headline.
  - It covers the back link and headline on prep, lessons, Vazifa, Amaliyot and exercises. In the slide viewer it covers the top of the slide. On home it hides the progress ring and repeats the blue "Hozir davom etmoqda" card right below it.
  - The router's route change (`index.html` ~l.558) closes the menu and the toast, but not the popup.
- **Why it hurts:** on a phone the student cannot see "← Dastur" or the page title until they find "Yopish". A student who taps "Darsni ochish", the obvious action, is still blocked on the next screen.
- **Fix (SAFE):**
  - Treat "Darsni ochish" as a dismissal: call `hideNewLesson()` on click.
  - Hide the popup on any route change, and show it only on `#/dastur`.
  - Coordinate with the date-driven states work, because `showNewLesson()` reads `liveLesson()`.
- **Shots:** `…/ux2/m-04-gate-welcome.png`, `…/ux2/m-06-prep-fold.png`, `…/ux2/m-08-slides1.png`, `…/ux2/m-07-dars3.png`, `…/ux2/m-15-file.png`

### 2 · "Keyingi qadam" and the lesson button skip the files the prompts depend on · `#/dastur` → `#/dars/1/amaliyot/01?p=P1`, `#/dars/1` pill
- **What happens:**
  - With nothing done, home's "Keyingi qadam · 1-dars · Amaliyot 01 · P1" and lesson 1's "Boshlash: Amaliyot 01 · P1" both land with the page scrolled to P1 (scrollY 667). The "1 · Avval oʻqing" brief and the "2 · NotebookLMʼga yuklang" sources are 343px above the screen, out of view.
  - The Vazifa route has the same problem. "Davom etish · Vazifa · P1" opens `#/dars/1/vazifa/promptlar?p=P1` directly, which skips the Vazifa page where the 7 source files live.
- **Why it hurts:**
  - The first prompt only works once the sources are in NotebookLM ("Faqat 03_Yetkazish_qoidalari manbasidan…").
  - A first-timer copies P1 into an empty notebook, gets a useless answer and blames the tool. The resume link is right for prompt 3 and wrong for prompt 1.
- **Fix (SAFE):** in `nextOf()` / `exHref()`, add `?p=` only when at least one prompt of that exercise is already done. The same applies to the Vazifa route: point at `#/dars/1/vazifa` until one Vazifa prompt is done. The labels stay as they are.
- **Shots:** `…/ux2/mc-22-nextstep-landing.png`, `…/ux2/mc-05-home-fold.png`

---

## P2 · Friction

### 3 · Two different "Boshlash" buttons on the lesson page, and the verb is wrong · `#/dars/1` (also 3, 4)
- **What happens:**
  - The hero pill says "Boshlash: Amaliyot 01 · P1". Next to it, the open Slaydlar pane has another "Boshlash ▶" that goes to the slides.
  - After the student views one slide, the hero pill flips to "Davom etish: Amaliyot 01", although no practice has been touched.
  - The Vazifa pane says "Davom etish · Vazifa · P1" at 0/8.
- **Why it hurts:** the student cannot tell which button is "the" next step, and "continue" on something never started reads as a bug.
- **Fix (SAFE, copy + logic):**
  - Pick the verb from the *target's* progress: "Boshlash" when the target is untouched, "Davom etish" when it is partly done.
  - Make the slide pane action read "Slaydlarni koʻrish" (the label the earlier comp used), so the screen has only one "Boshlash".
- **Shots:** `…/ux2/mc-07-dars1-fold.png`, `…/ux2/mc-08-slides-all.png` (pill after 1 slide), `…/ux2/mc-07-dars1-vz.png`, `…/ux2/dc-07-dars1.png`

### 4 · One label for two different "done" controls, and the chip is the smallest target · exercise / Hermes / Vazifa sheet / prep
- **What happens:**
  - Each prompt has an outline chip "BAJARILDI DEB BELGILASH" (24px tall, 11px text; on prep it is 28px tall with 12px text).
  - The end of the page has a pill with the *same words* that marks the whole exercise or card.
  - Copying a prompt already marks it done, so the chip is a secondary path.
- **Why it hurts:**
  - The student cannot tell whether the bottom button marks P4 or the exercise.
  - The chip is the hardest thing on the page to hit with a thumb. It passes the WCAG 2.5.8 minimum of 24px but falls well short of 44px.
  - 11px uppercase is the smallest text in the product. The chip also looks identical to the non-tappable status pills on home cards (element-audit #10, still open).
- **Fix:**
  - **SAFE:**
    - End-of-page labels: "Mashqni bajarildi deb belgilash" (exercise) and "Kartani bajarildi deb belgilash" (Hermes).
    - A 44px hit area on the chip through padding or `::after`.
    - Chip text at 13px.
  - **LOOK:** element-audit #10, a square checkbox + "Bajarildi", which is already named in `tokens.md`.
- **Shots:** `…/ux2/m-13-ex01.png` (bottom), `…/ux2/m-18-h01.png`, `…/ux2/mc-06-prep-fold.png`

### 5 · Dead ends at the end of the slides and the homework sheet, and no way back on long pages · `#/dars/n/slayd/N`, `#/dars/1/vazifa/promptlar`
- **What happens:**
  - On the last slide the → button greys out and "Koʻrildi" appears. Nothing offers the next step or the way back to the lesson.
  - The Vazifa prompt sheet (4,155px at 390) ends with the "Qoʻshimcha · Q1–Q5" disclosure and a footnote, with no next block. Exercises and Hermes cards do have one ("Keyingi mashq", "Keyingi karta").
  - The `<summary>` has `list-style:none` and no chevron, so it reads as a caption, not as something that opens 5 more prompts.
  - The nav is `position:static`, so on these long pages the only way back is a long scroll up.
- **Why it hurts:** the student finishes the work and is left with nowhere to go. The same "end of task" moment behaves differently on three screens.
- **Fix:**
  - **SAFE:**
    - On slide N, replace the disabled → with the existing `nextBlock` pill: "Darsga qaytish" → `#/dars/n`.
    - At the end of the sheet, the same pill: "Vazifa sahifasi" → `#/dars/1/vazifa`, or the next lesson unit once 8/8 are done.
  - **LOOK (small):** a ⌄ on the Q1–Q5 summary that turns when open.
  - Keep the nav static (it is part of the look). The end pills solve the way back.
- **Shots:** `…/ux2/dc-08-slides3.png`, `…/ux2/mc-23-vz1sheet-end.png`, `…/ux2/mc-24-ex01-scrolled.png`

### 6 · Slide topic rows look like chapters but do nothing · `#/dars/1`, `#/dars/3` Slaydlar pane (ux-audit M5 / element-audit #8, still open)
- **What happens:** 5–8 rows with 48px dividers and mono numbers "01 AI nima…". They look exactly like the Amaliyot pane's rows, which *are* links with →, but tapping them does nothing.
- **Why it hurts:** the student taps "03 Context" expecting that section of the slides. On lesson 3 the rows also push "Boshlash" below the fold.
- **Fix (SAFE):** either link each row to its first slide (`#/dars/n/slayd/k`; `slidePage` already maps slide → topic), or drop the dividers and numbers and show the topics as one line of text, which the hero subtitle already repeats.
- **Shots:** `…/ux2/m-07-dars3.png`, `…/ux2/dc-07-dars1.png`

### 7 · Prep cards: nothing shows they open, and the student can tick "done" without seeing the steps · `#/dars/0`
- **What happens:**
  - Only the first unfinished card is open. Cards 02–04 show a title, a note and a "Bajarildi deb belgilash" chip, with no chevron or "steps" cue.
  - Their steps and the external links ("Claude dasturini yuklash", the Google account link) appear only after the header is tapped.
  - The open card's illustration loops every 6–7 s, next to the steps the student is reading.
- **Why it hurts:**
  - A student scanning the list ticks "Claude" without ever seeing the install link, and arrives on day 1 without the app. Prep is the one place where a missed step costs class time.
  - The looping picture pulls the eye away from the steps.
- **Fix:**
  - **SAFE:**
    - Show the step count on closed cards ("3 ta qadam ⌄").
    - On a closed card, the first tap on the chip opens the card instead of ticking it.
  - **LOOK:** play the illustration once when the card opens, instead of looping. It already stops under `prefers-reduced-motion`.
- **Shots:** `…/ux2/mc-06-prep-fold.png`, `…/ux2/m-06-prep.png`, `…/ux2/dc-06-prep.png`

### 8 · Hermes card 04: the whole task is one block of text · `#/dars/4/amaliyot/04`
- **What happens:**
  - Card 04 has no prompt, so its five steps (CHANNELS → QR → Connect → ALLOWED USERS → "Salom") are the work itself.
  - The 2.0 text separates them with `\n`, but 3.0 renders them as one `<p class="ef-hint">` at 15px grey, with "1. … 2. … 3." run together.
- **Why it hurts:** the student is switching between phone, laptop and the panel. In one paragraph they lose their place, and step 4 (ALLOWED USERS) is the one people skip.
- **Fix (SAFE):** when a note's lines start with `N.`, render them as an `<ol>` like the prep steps. Otherwise use `white-space:pre-line`. The same code path covers all Hermes notes.
- **Shot:** `…/ux2/m-18-h04.png`

### 9 · Exercise 03 picker gives no basis for choosing · `#/dars/1/amaliyot/03`
- **What happens:** the two options read "03A · Operator nima qiladi?" with "03B BILAN BIRIDAN BIRI" under it, and the reverse for 03B. The meta repeats the rule the lede already gave, not what each option is.
- **Why it hurts:** a business owner chooses by *their* business (service desk or warehouse), and the page never says which is which.
- **Fix (SAFE, 2.0 content):** use the 2.0 `note` as the meta:
  - "Operator uchun murojaat qabul qilish yoʻriqnomasi va FAQ" (Servis);
  - "Mind Map va joʻnatishdan oldingi tekshiruv roʻyxati" (Ombor).
  - Prefix each with the area: "Servis ·" / "Ombor ·".
- **Shot:** `…/ux2/m-13-ex03.png`

### 10 · Login: the placeholder ID looks already typed · `#/kirish` (element-audit #6, still open)
- **What happens:** the empty field shows "AIP-7KQ2XM" in light grey, in the same mono font as a typed value, on the photo. The help line stays empty until the student types.
- **Why it hurts:** a student taps KIRISH on an empty field ("Yana 6 ta belgi kiriting"), or thinks everyone shares this ID.
- **What works now:** pasting "AIP-7KQ2XM" from a message logs in, and the bad-character error is legible with its icon. ux-audit H3 is fixed.
- **Fix (SAFE):** drop the placeholder and put "Masalan: AIP-7KQ2XM" in the help line, visible before typing.
- **Shots:** `…/ux2/m-01-gate.png`, `…/ux2/mc-02c-gate-badchar.png`

---

## P3 · Polish

### 11 · The lesson 1 hero repeats the Vazifa PDF · `#/dars/1` (ux-audit H5.5 / element-audit #9, still open)
- **What happens:** "Promptlar varaqasi P1–P8, Q1–Q5 · PDF" sits under the Amaliyot button. The same file is already a row on the Vazifa page ("PDF varianti").
- **Why it hurts:** it reads as the practice prompts, and "P1–P8, Q1–Q5" is jargon on first contact.
- **Fix (SAFE):** remove it from the hero.
- **Shot:** `…/ux2/mc-07-dars1-fold.png`

### 12 · The profile menu hides behind ☰ (phone) and a bare name (desktop); small language targets · all screens, `#/kirish` (element-audit #11, still open)
- **What happens:**
  - ☰ promises navigation, but it opens ID, group, mentor, language and Chiqish.
  - On desktop, "Dilshod Rahimov" looks like a label.
  - The gate's UZ/RU/EN targets are 23×30px.
- **Fix:**
  - **LOOK (small):** "Dilshod ⌄" on phone, "Dilshod Rahimov ⌄" on desktop.
  - **SAFE:** 44px hit areas on the language switch.
- **Shots:** `…/ux2/mc-21-menu.png`, `…/ux2/dc-05-home-fold.png`

### 13 · Login always waits 1.8 s · `#/kirish`
- **What happens:** `tryLogin()` shows the server-stack loader for a fixed 1,800 ms on every login, even when the check is instant.
- **Why it hurts:** students in class all log in at once, and every one of them waits for an animation.
- **Fix (SAFE):** in production, show the loader only while the request is pending, for at least about 500 ms so it doesn't flash. Keep "Xush kelibsiz, {name}!" (2.0 parity).
- **Shot:** `…/ux2/m-04-gate-welcome.png`

### 14 · Copy feedback works, but the toast sits on the next prompt; titles repeat the ID · prompt lists
- **What works:** copy shows "Nusxalandi" for 2 s, marks the prompt done, and shows "P1 bajarildi · Bekor qilish" for 5 s. ux-audit H2 is fixed.
- **What happens:**
  - The toast (bottom, about 50px) covers the next prompt's number and part of its copy circle at 390.
  - Every title repeats the big numeral: "P1 · BITTA MANBALI JAVOB" under "P1".
- **Fix (SAFE):**
  - Add bottom padding to `.s1` equal to the toast height while the toast is shown.
  - Drop the "P1 ·" prefix from Vazifa titles, because the numeral already says it.
- **Shot:** `…/ux2/m-11-copy.png`

### 15 · Small wording mismatches · home, book
- **What happens:**
  - **Home:** the ring is labelled "Sizning natijangiz". "Natija" reads as a score (element-audit #5).
  - **Book (`#/dars/4/kitob`):** one row is a file name ("Biznesda_AIni_qollash_lotin.pdf") and the other a label ("Кирилл ёзувида").
  - **Prep:** the meta says "0/4 tayyor" where every other counter says "qadam" or "bajarildi".
- **Fix (SAFE, copy):**
  - Ring label: "Kurs progressi".
  - Book rows: "Lotin yozuvida" / "Кирилл ёзувида", with the file name in the meta line.
  - Prep counter: "0/4 bajarildi".
- **Shots:** `…/ux2/mc-05-home-fold.png`, `…/ux2/mc-19-book.png`

---

## Earlier audits re-checked
| Item | Status now |
|---|---|
| ux H1 (hero sends to old work), M3 (logout in the back slot), L3 / el #4 (global Amaliyot nav) | Fixed |
| ux H2 / el #18 (copy label, undo, target line, "x/y bajarildi") | Fixed |
| ux H3 (paste, error legibility) | Fixed. The placeholder half lives on as #10 above |
| ux H4 / el #12 (progress units) | Fixed: "0/6 qadam" everywhere, tabs show only ✓ |
| ux H5 (dead Kitob tab, Vazifa pane copy) | Fixed. H5.5 (the hero PDF) is still open → #11 |
| ux M2 / el #15 (file groups and roles) | Fixed |
| ux M4 (exercise dead end) | Fixed for exercises and Hermes. Slides and the Vazifa sheet are still open → #5 |
| ux M5 / el #8 (dead slide rows) | Still open → #6 |
| el #3 (P-numbers) | Fixed on exercises and the Vazifa sheet |
| el #5 ("natija") | Moved to the home ring → #15 |
| el #6 placeholder, #9 hero PDF, #10 chip shape, #11 ☰ | Still open → #10, #11, #4, #12 |
| el #13 (↗ on internal cards), grid/glow background | Still the user's call (look), not repeated here |
| el #14, #16, #17 (0-dars / locked card labels) | Not re-judged: part of the date-driven states work in progress |
| ux M6 (how a new lesson is announced) | Answered by the popup. Its behaviour is #1 |

## What works: keep it
- **One-tap paths:** a prompt is 3 taps from home (card → Amaliyot tab row → exercise). The lesson panes list exercises and Hermes cards directly.
- **Exercise layout:** "1 · Avval oʻqing / 2 · NotebookLMʼga yuklang", then the lilac prompts with "Qayerga:" in bold, then "Keyingi mashq". It is the clearest screen in the product.
- **Slide viewer:** 44px+ controls, the "Barcha slaydlar" grid at 52px cells, and a resume position.
- **No overflow and no console errors** on any walked route at 390 or 1440.
