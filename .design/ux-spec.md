# UX spec: AI Praktikum 3.0 student portal (after sign-in)

**For:** the three visual designers. This is the shared UX floor. Visuals are yours; structure, states, copy and rules are not.

**Sources:**
- `reference-blueprint.md` (2.0 behaviour).
- The 2.0 `login.json`, lessons 0–4. All strings here come from it.

**Not covered:** the sign-in page (it is finished).

**User feedback to design against:**
- Bright flat colour cards are "eye-hardening". The saturated block palette in `taste-profile.md` is that style, so do not reuse it.
- Info-heavy prompt cards had "too many distractors".
- The quiet minimal version was "boring".
- No Y2K, utilitarian or Bauhaus pastiche.
- **Target:** alive at the edges (motion, light, the live state) and calm where people read (prompts, steps).

---

## 1. Information architecture and navigation

**Model:** one app shell with History API routes (as in 2.0). There are no tabs and no bottom nav; the structure is home → lesson → section → item.

| Route | Screen | Back goes to |
|---|---|---|
| `/aip/` | Home ("Dastur") | none (root) |
| `/aip/dars/0` | Prep checklist (lesson 0 has only this) | `/aip/` |
| `/aip/dars/{n}` | Lesson page | `/aip/` |
| `/aip/dars/{n}/slaydlar?s=14` | Slide viewer (`s` = 1-based slide) | `/aip/dars/{n}` |
| `/aip/dars/{n}/vazifa` | Vazifa (homework) | `/aip/dars/{n}` |
| `/aip/dars/{n}/vazifa/promptlar#P3` | Vazifa prompt sheet (lesson 1) | `/aip/dars/{n}/vazifa` |
| `/aip/dars/{n}/amaliyot` | Amaliyot index | `/aip/dars/{n}` |
| `/aip/dars/{n}/amaliyot/{key}#P3` | Exercise page, Hermes card page, or a library section anchor | `/aip/dars/{n}/amaliyot` |

**Back behaviour**
- The in-app back control always goes to the **parent route** in the table, never `history.back()`.
- It is labelled with the parent's name: "← Dastur", "← 1-dars", "← Amaliyot".
- **Cold entry on a deep route** (from a shared link or a bookmark): run `replaceState(parent)` then `pushState(current)`. Android/iOS system Back then lands on the parent instead of leaving the app.
- **Returning to a parent:** restore its scroll position and move focus to the row the student came from.

**Deep links**
- **Logged out:** sign-in, then a redirect to the original route via `?next=`. The finished sign-in page needs to support `next` (a dependency, not a redesign).
- **Locked or unpublished lesson:** open home with that lesson's locked sheet showing (§3.2). Never redirect silently, as 2.0 did.
- **Unknown route:** home plus the toast "Sahifa topilmadi".
- **`#P3` / `#27` anchors:** scroll to that prompt and focus its heading. The heading must not be hidden under the sticky bar; use `scroll-padding-top`.

**Global chrome**
- **Top bar (56px):** back control + the screen title, or on home the progress ring (the home has no greeting).
- **Name button**, which opens a sheet with (home no longer shows the group, mentor, dates or ID as tags, and "Chiqish" is never in the back-arrow slot):
  - group ("Shanba guruhi"),
  - mentor,
  - course dates ("4 dars · 12 sen – 3 okt"),
  - ID,
  - language (Oʻzbekcha / Русский / English),
  - "Chiqish" (log out).
- The menu is a sheet, not a route.
- **Global links:** "Dastur" and "Amaliyot" only. **"Kitob" has no global link:** the book «Biznesda AIʼni qoʻllash» (Latin + Cyrillic) lives in lesson 4 (its home card and its lesson page), and lessons 0–3 never mention it.

### 1.1 New-lesson popup (replaces the old Telegram notice)
A student learns that a lesson opened from an on-screen popup the first time they open the portal after it opened.
- **When:** the SERVER decides "a lesson opened since this student's last visit" (it knows the last-seen lesson per student). The comp fakes it: it shows after a login and with `?view=dastur&newlesson`, and remembers a dismissal per lesson in `localStorage` (`aip3.nl.seen`). Production stores "seen" server-side.
- **Content:** eyebrow "Yangi dars ochildi", title "3-dars · Skill va agentlar", primary "Darsni ochish" (goes to the lesson), secondary "Yopish".
- **Placement:** fixed, top-left. Desktop: 380px wide, 16px from the top and 24px from the left, over the nav links, so the progress ring stays clear. Phones: full width minus 16px gutters, 72px from the top (below the nav). It never fills the screen.
- **Behaviour:**
  - It fades and slides in (≈350ms, eased); with reduced motion it just appears.
  - It does NOT take focus.
  - It is announced through the polite live region: "Yangi dars ochildi: 3-dars, Skill va agentlar."
  - It stays until dismissed, with no timer, because a student may miss it.
  - It closes with "Yopish" (focus goes to the page heading), with Esc while focus is inside it, or when the lesson is opened from the popup or from home. Closing or opening records it as seen. Esc used to close the name menu never dismisses it.
  - Signing out hides it without recording.
- **Look:** a flat white card, black text, a 1px black ring, 15px radius. White is the only colour that stands out on black and on every card colour (blue, grey, yellow, lilac).

### Home structure (top to bottom, 375px)
1. **Hero: the one primary action.** Pick the first that applies:
   1. a live lesson → "Darsni ochish";
   2. the course hasn't started and prep is incomplete → "Tayyorgarlikni davom ettirish";
   3. an open lesson has unfinished units → "Davom etish" (resume the exact item);
   4. everything opened is done → the next lesson's date;
   5. the course is over → "Kurs yakunlandi" + the book + the closing PDF.
2. **"Keyingi qadam" (next step):** one secondary row pointing to the exact unfinished item, e.g. "1-dars · Amaliyot 01 · P3 Vaziyatli test". Hide it when it duplicates the hero.
3. **Progress ring, top-left of the content (the home has no greeting any more; its h1 is the hidden "Dastur"):** a radial ring (yellow arc on a thin track) with "1/4" inside, the label "Sizning natijangiz", the line "Toʻliq bajarilgan darslar" and the small note "✓ Tayyorgarlik" (lesson 0 is done; the note is shown only then). `role="progressbar"`, with `aria-valuetext` spelling it out. Lessons 1–4 only; prep is separate. Per-lesson fractions live on the cards below. **One model, units always written, no percentages, and a library prompt count is never a result.**
4. **Lesson list 0–4:** every row shows number, title, a date or subtitle, a state chip, and a progress fraction where relevant.

---

## 2. Screens: content, hierarchy, primary action

**Progress model** (new in 3.0, stored per student on the server, written optimistically):

| Lesson | Units counted |
|---|---|
| 0 | the 4 prep items |
| 1 | slides + core exercises 01, 02, 03A **or** 03B, 04 + Vazifa = **6** (05 and 06 are extra and not counted) |
| 2 | slides + Amaliyot + Vazifa = **3** |
| 3 | slides + Vazifa = **2** |
| 4 | Hermes cards 01–09 = **9** (bonus 10, the book and slides = 0, not counted) |

How a unit gets done:
- **Slides:** reaching the last slide.
- **Prompt Vazifa:** all main prompts (P1–P8) marked.
- **Free-text Vazifa:** the manual toggle "Bajardim".
- **Exercise or card:** all its prompts marked, or its end toggle "Bajarildi" (needed for prompt-less cards such as Hermes 04).
- **Library Amaliyot (lesson 2):** the manual "Amaliyotni yakunladim".

A lesson is **done** when all its units are done.

### (a) Home / lesson list
- **Primary task:** know what to do now.
- **Primary action:** the hero button.
- **Rows:** the whole row is the tap target (≥56px tall).

**State notes** (in the comp: a calm 14px UPPERCASE note at the bottom-right of the big folder card, `.f-note`, in the card's ink, with the unit written out; there are no pills and no topic subtitles on the cards):

| State | Note text | Notes |
|---|---|---|
| prep | yellow card; unfinished "12-sentabrgacha · 3/4 qadam", finished "✓ Bajarildi · 4/4 qadam" (the demo student has finished it) | user decision 2026-10-16: prep keeps yellow (this overrides colour-audit #2); the note always says the state in words |
| done | "✓ Bajarildi · n/n qadam" in the lesson's own colour | state is a word and an icon, never a colour (each lesson has one fixed identity colour) |
| live | "Davom etmoqda" | the live lesson is the big hero card at the top of home, in the identity colour of that lesson (blue for lesson 3, so it matches the card below); in the list its note reads "● Hozir davom etmoqda · 0/2 qadam" |
| open | "Ochiq · n/n qadam" in the lesson's own colour | |
| locked | dark card, "🔒 3-oktabrda ochiladi" as the note, and what opens as the one subtitle the locked card keeps ("10 ta Hermes kartasi va kitob: «Biznesda AIʼni qoʻllash» (lotin va kirill)") | tappable: opens the §3.2 sheet |

- **State never by colour alone:** the chip text is always present.
- **Hidden by default:** summaries, topics, lesson internals. Home is a list, not a dashboard.

### (b) Lesson page: lesson 1 "Kirish"

**Header** (one format everywhere; there is no separate result card):
- the back link "Dastur"
- the meta line "1-dars · 12-sentabr · 3/6 qadam" (date and progress in one line)
- the title "Kirish" (the comp writes "1-dars" over "Kirish")
- the subtitle "AI nima, modellar, Context, RAG, NotebookLM"

**Primary action:** "Davom etish", which goes to the first unfinished item ("Amaliyot 01 · P3"). When the lesson is live it becomes "Slaydlarni ochish".

**Section rows, in order:**

| Row | Meta | Status (shown inside the pane, not on the tab) |
|---|---|---|
| Slaydlar | "78 ta slayd · video" | "Koʻrildi" |
| Amaliyot | "Korxona bilimini ishga soling." | "2/4 asosiy mashq bajarildi" |
| Vazifa | "Ravon Uy — NotebookLM mashqi" | "5/8" |
| Kitob | lesson 4 only | |

**Order everywhere: Slaydlar · Amaliyot · Vazifa (· Kitob in lesson 4).** In the comp these are the three tabs of the gooey folder. **Tabs carry no status line; a ✓ shows only on a finished tab** (lesson 1: Slaydlar). **The Amaliyot pane is the list of exercises**, one tap each, with the label "2 / 4 asosiy mashq bajarildi". Lesson 1 has 7 exercises as in 2.0 (01 HR, 02 Savdo, 03A Servis or 03B Ombor, 04 Marketing, 05 Xarid, 06 Rahbar audio), shown as 6 rows because 03 is one "Bittasini tanlang" row; 05 and 06 are marked "qoʻshimcha". A row is the number, the title, a mark (✓ done, "2/4 prompt" in progress) and an arrow, 48px or more. The lesson header carries the progress: "1-dars · 12-sentabr · 3/6 qadam" (there is no separate result card). A pane's action is words first, then the circle, and the whole link is the target. Lessons 1–3 have no Kitob tab, tag or row.

**Secondary:** the summary paragraph, one line under the subtitle. It expands on tap.

**Hidden or removed:** topic chips (they duplicate the subtitle).

**Row visibility:**
- Unpublished section: the row shows "Darsdan keyin ochiladi" and is disabled, with `aria-disabled` and the reason in text.
- `slideCount: 0` on a published lesson (lesson 4): no Slaydlar row at all.

### (c) Amaliyot exercise: lesson 1, "01 · Yangi xodimga tayanch"

**Header:**
- the eyebrow "01 · Asosiy"
- the title
- the note "Birinchi hafta rejasi, yodlash kartalari va bilimni tekshiruvchi test."
- "2/4 prompt"

**Files block (above the prompts):**
1. "01_Yoriqnoma.pdf · 34,2 KB", labelled "Avval shuni oching".
2. "Manbaalar": "Ichki mehnat tartibi qoidalari.pdf · 210,6 KB" and "Onboarding qo'llanmasi.pdf · 194,2 KB".

Once one or more prompts are marked, the block collapses to "Fayllar · 3".

**Prompt cards P1–P4.** Each card has exactly four things:
1. id + title
2. a "Qayerga:" target line
3. the full text
4. the copy button

The four cards:

| Prompt | Target |
|---|---|
| P1 Birinchi hafta rejasi | Chat |
| P2 Yodlash kartalari | Studio → Flashcards → sozlash |
| P3 Vaziyatli test | Studio → Quiz → sozlash |
| P4 Studio oʻrniga matn | Chat / zaxira |

**Primary action:** the copy button of the **first unmarked prompt** (P3). The other copy buttons use the secondary style.

**Page end:**
- the "Bajarildi" toggle;
- "Keyingi mashq: 02 · Mahsulotdan suhbatga". It becomes the primary once all prompts are marked.

**Hidden by default:**
- "02_Promptlar.pdf · 37,0 KB" (a duplicate of the cards), behind a "PDF variant" text link at the bottom;
- `notes` and `extras` (empty here).

### (d) Prep checklist: lesson 0
- **Header:**
  - "Birinchi darsgacha"
  - the lede "Birinchi dars 12-sentabr. … hammasi 30 daqiqacha vaqt oladi …" (fill `{sana}` from the group's date)
  - a secondary "PDF yuklab olish" (prep-uz.pdf, or ru/en by UI language)
  - progress "4/4" in the comp demo (the student has finished prep; the spec demo had 3/4 with Visa karta unchecked)
- **The 4 items:** Kompyuter, Google akkaunt, Claude, Visa karta.
  - Each item is an accordion row: a checkbox + the title + the note.
  - The steps (an ordered list) and the action links show only when the row is expanded.
  - The first unchecked item opens automatically.
- **Primary action:** the expanded item's first action ("Claude dasturini yuklash"). It opens in a new tab.
  - Quiet actions ("claude.ai da hisob ochish") are secondary.
  - Visa has no actions, so its checkbox is the only control.
  - The footnote "Keyingi darslarda kerak boʻladi." shows under it.
- **Checking an item:** collapses it and opens the next one.

### (e) Slide viewer
- **Layout:** fullscreen on a dark neutral stage, whatever the theme.
- **Always visible:**
  - "Yopish" (close, top-left)
  - the counter "14 / 40"
  - "Toʻliq ekran" (hidden where unsupported)
  - "Barcha slaydlar" (a grid sheet, for jumping)
  - visible ‹ › buttons at the bottom
- **Navigation:**
  - swipe;
  - tap zones (left third = back, right two thirds = forward);
  - ← → and Space keys;
  - the buttons, which give a non-drag alternative (WCAG 2.5.7).
- **Slide kinds:**
  - **Video** (lessons 1 and 3): muted inline MP4 that loops, with `playsinline`.
  - **Image** (lesson 2): a still.
  - The UI is the same for both.
- **Resume:** reopening goes to the last slide seen, with a "Boshidan" chip for 3 s.
- **Done:** the slides unit is marked done on reaching the last slide.
- **Loading and errors:**
  - Show a loader only after 300 ms.
  - On failure: "Slayd yuklanmadi" + "Qayta urinish".
- **Keep the 2.0 protection:** blur when the tab loses focus, no context menu, no slide URLs in the DOM.

### (f) Progress
**Where progress shows:**
- home: the progress ring + a fraction on each card;
- the lesson header;
- each section row;
- the exercise header.

There is no separate progress page and no streaks or points.


---

## 3. Interaction rules

### 3.1 Copy = mark done
1. **Tapping "Nusxalash":**
   - copies the **original string from the data**, never the DOM text (see 4.4);
   - turns the button into "Nusxalandi" for 2 s;
   - fills the card's tick, labelled "Bajarildi";
   - announces "P3 nusxalandi" via `aria-live="polite"`.
2. **Undo:**
   - the comp's control is a circle + the word "Nusxalash" (one button), and the done mark is a chip under the title: filled "Bajarildi" when marked, outline "Bajarildi deb belgilash" when not. The chip is the toggle.
   - the toast "P3 bajarildi · **Bekor qilish**" stays 5 s (pauses while it has focus);
   - the tick itself is a toggle (≥24×24 hit area, labelled "Bajarildi deb belgilash"), so a student can also mark a prompt they typed by hand.
3. **Re-copying** a marked card copies again and keeps it marked. Marked cards stay **expanded** (students come back to re-copy) and only their tick and title tone change.
4. **No auto-scroll** after copying; the student is switching apps.
5. **Clipboard failure:** open a sheet with the text pre-selected: "Nusxalab boʻlmadi. Matnni bosib turing va «Nusxalash»ni tanlang."
6. **Sync is optimistic:**
   - Failed writes are retried.
   - After 3 failures, show "Saqlanmadi · Qayta urinish" inline.
   - Never lose a tick on reload; queue it locally.

### 3.2 Locked and not-yet-published content
- **Locked lessons** stay visible in the list, showing title + date. Tapping one opens a bottom sheet:
  - "4-dars 3-oktabr kuni ochiladi."
  - "Yopish".
- **Published lesson with an unpublished section:** the row is disabled with "Darsdan keyin ochiladi".
- **Content that will never exist** (`slideCount: 0`, no book): the row is not rendered.

### 3.3 Empty and error states (exact copy)
| Case | What shows |
|---|---|
| Offline | Banner: "Internet yoʻq. Promptlarni nusxalash ishlaydi, belgilar keyinroq saqlanadi." Loaded prompts stay usable. |
| Session expired (401) | Sign-in with `next=`; the queued ticks are kept. Toast after login: "Sessiya tugadi. Qayta kirdingiz." |
| File download failed | Inline on that file row: "Fayl yuklanmadi · Qayta urinish" |
| Library search finds nothing | "Hech narsa topilmadi. Boshqa soʻz bilan qidiring." + "Tozalash" |
| No live lesson (between weeks) | The hero falls through the rule in §1 |
| Loading | Skeletons of the real layout. No spinner before 300 ms, and no animated mascot or orb |

### 3.4 Mobile-first at 375px
**Layout:**
- one column with 16px side gutters;
- no horizontal page scroll (only the library's section chip row scrolls sideways);
- reflows at 320px and at 200% zoom.

**Touch:**
- primary buttons ≥48px tall;
- every target ≥44×44 (the floor is 24×24, WCAG 2.5.8);
- the copy button carries a text label, never an icon alone.

**Text and safe areas:**
- long file names wrap (`overflow-wrap:anywhere`) and are never truncated;
- respect the safe-area insets.

**What stays out:**
- no sticky bottom CTA bars (they hide prompt text when the keyboard or browser chrome changes);
- the only sticky elements are the top bar and, in the library, the search + chips.

**Performance:** lazy-load images; the first view must work on a mid-range Android over 3G.

**Desktop (≥1024):**
- the lesson list may go to 2 columns;
- reading columns stay single and ≤ 68ch;
- the slide viewer letterboxes.

---

### 3.5 Sign-in ID entry (usability layer; the sign-in look is finished)
The 2.0 portal has the personal ID `AIP-` + 6 characters from `23456789ABCDEFGHJKMNPQRSTUVWXYZ`, **and short hand-assigned IDs** (for example `XM`, the demo mentor). Both must work.
- **Accepted input:** the bare code (`7KQ2XM`) or the full ID (`AIP-7KQ2XM`), in any case, with or without the hyphen, with spaces trimmed, typed or pasted. A paste that contains a message ("ID: AIP-7KQ2XM") is searched for the ID. `maxlength` is 10 (a full ID with its prefix).
- **Submit:** a complete valid 6-character code submits by itself, once. A short ID submits on Enter or "KIRISH", never on its own, and a short ID the server knows must not get a "too short" error. While the loader shows, the field is read-only, so a second submit does nothing.
- **Errors** (14px Golos 500, white, with the same dark halo as the "Shaxsiy ID" label, and red only on the underline and the ⚠ icon; there is no box. The halo keeps every glyph at 4.5:1 or better over the photo, measured. The message is out of flow, so the button never moves). All of them must fit 2 lines at 320px:

| Case | Copy |
|---|---|
| Nothing or one character | "Yana N ta belgi kiriting." |
| Bad characters (any length) | "IDʼda 0, 1, I, L va O boʻlmaydi. Qayta tekshiring." |
| More than 6 characters | "ID 6 ta belgidan iborat. Xabardagi IDʼni qayta tekshiring." |
| Short ID the server does not know | "Bu ID topilmadi. Xabardagi IDʼni toʻliq yozing." |
| Server: not found | "Bu ID topilmadi. Mentoringizdan tekshirib oling." |

- **The comp** fakes the server: `XM` is a known short ID, and `KKKKKK` and every other short ID are "not found".

## 4. Guardrails (all three designs)

### 4.1 Reading comfort for prompts
**Type:**
- prompt text ≥17px on mobile;
- line-height 1.55–1.65;
- 45–68ch per line;
- on a calm low-chroma surface with ≥7:1 contrast as the target (4.5:1 is the minimum).

**Fonts:**
- Use a proportional reading font for prompt text, not mono.
- Monospace only for inline `code` (Hermes prompts contain backtick commands) and file sizes.

**Formatting:**
- Keep the `\n` line breaks.
- Render `[placeholders]` with a subtle highlight. The copied text is unchanged.

**Card contents:** a prompt card holds only id/title, the "where" line, the text and the copy button. No tags, file chips, counters or illustrations inside cards.

**Texture and accent:**
- Decorative texture or motion never sits behind running text.
- Accent colour covers ≤10% of any reading screen.

### 4.2 One primary action per view
- Exactly one primary-styled button is visible per screen state.
- Everything else is secondary or a text link.
- On prompt lists, the primary is the copy button of the first unmarked prompt. It moves down as prompts are marked.

### 4.3 WCAG 2.2 AA
**Contrast:**
- text 4.5:1, or 3:1 for text ≥24px or bold ≥18.66px;
- UI boundaries and focus indicators 3:1.

**Focus:**
- focus is always visible and never covered by sticky bars (2.4.11);
- logical order;
- sheets trap focus and close on Esc.

**Language attributes:**
- `lang="uz-Latn"` on content;
- `lang="uz-Cyrl"` on "Кирилл ёзувида";
- `lang` switches with the UI language.

**Announcements:** copy, toasts and tick changes are announced with `aria-live`.

**Accordions and states:**
- accordions use `button[aria-expanded]`;
- disabled rows state the reason in text.

**Motion:**
- `prefers-reduced-motion` turns off all non-essential motion, including the live pulse;
- nothing flashes more than 3 times per second.

**Consistent help (3.2.6):** the mentor's name and the menu stay in the same place on every screen.

### 4.4 Uzbek ʻ and ʼ
**What the data uses:**
- U+02BB ʻ (oʻ, gʻ; 669 occurrences) and U+02BC ʼ (eʼtibor, maʼlumot, AIʼni; 92).
- Some file names use ASCII `'` ("Onboarding qo'llanmasi.pdf"). Leave those as they are.

**Rule:**
- In display only, render ʻ as ‘ (U+2018) and ʼ as ’ (U+2019), unless you have verified the face has the real glyph.
- `taste-profile.md` checked several faces with fontTools: Mona Sans lacks both; Golos Text and Martian Mono lack U+02BB.

**Copying:**
- Copy buttons and downloads use the raw data string.
- Pass the original to `aria-label` where the substitution would read oddly.

**Library search:** treat ʻ ʼ ‘ ’ ' ` as the same character, and ignore them altogether (so "oʻrganish" = "o'rganish" = "organish").

**Test string:** "Oʻzbek, gʻoya, eʼtibor, maʼlumot, AIʼni" in every font weight you use.

### 4.5 Languages
- The UI is UZ / RU / EN.
- Lesson content and prompts stay Uzbek in every UI language. Never machine-translate them.
- Leave ~30% extra width in chips and buttons for RU.

---

## 5. Content types from 2.0: structure and navigation

**Lesson 0: prep.**
- A checklist of 4 accordion items, with steps, action links and footnotes, plus a PDF per language (§2d).

**Lesson 1: Vazifa (`/vazifa`)**
- Three numbered steps, in order:
  1. **Manbaalar:** 7 files + "Hammasini yuklash" (ZIP 59,3 KB), with the footnote "Fayl nomlarini oʻzgartirmang — promptlar ularga nom bilan murojaat qiladi."
  2. **Promptlar:** "13 ta prompt" → the prompt sheet.
  3. **Talaba qoʻllanmasi:** a PDF, 25,7 KB.
- **Primary action:** "Hammasini yuklash" until the ZIP has been downloaded, then "Promptlarni ochish".

**Lesson 1: prompt sheet (`/vazifa/promptlar`)**
- **Header:** the subtitle "NotebookLM mashqi — Ravon Uy", the lede, and the 3 rules as a short numbered list (collapsed after the first visit).
- **Group "Asosiy mashq":** "Sakkizta prompt, birma-bir." P1–P8 are **sequential**. Show "har biri oldingisining javobiga tayanadi" once, and number them clearly.
- **Group "Qoʻshimcha":** "Vaqt qolsa yoki uyda ishlash uchun." Q1–Q5 are **collapsed by default**.
- **Where line:** the item's `sources`, shown as "Manbaa: 02_Amaldagi_narxlar, 04_Reklama_qoralamasi" (which NotebookLM sources to tick).
- **Footnote:** shown at the end.

**Lesson 1: Amaliyot index**
- Title, lead, and the 3 rules.
- The guide "Talaba_qollanmasi.pdf · 37,4 KB" sits **before** the exercises.
- **Asosiy list:** 01, 02, then **03 as a choice**, then 04.
  - 03 is one block, "03 · Bittasini tanlang", holding two option rows: 03A "Operator nima qiladi?" and 03B "Buyurtma yoʻlini koʻring".
  - Either one completes the unit. After that, the other shows "ixtiyoriy".
- **"Qoʻshimcha" subgroup:** 05 "Takliflarni bir jadvalga" (Qoʻshimcha) and 06 "Rahbar yoʻlda ham tushunsin" (Namoyish yoki uyga vazifa).
- **At the end:** the closing file "Biznesimda_7_kunlik_sinov.pdf · 31,7 KB".
- **Tags:** the data's uppercase tags are shown in sentence case.

**Lesson 2: the 47-prompt library (`/amaliyot`, one scrolling page)**

The library is a catalogue, so nothing is sequential.
- **Sticky search field:** "Prompt qidirish". It filters on number + title + text; typing "27" jumps to #27.
- **Sticky horizontal chip row** for the 5 sections, which are `{key}` anchors:

| Section | Prompts |
|---|---|
| Biznes gʻoyalar | 01–11 |
| Tanqidiy fikrlash | 12–20 |
| Savdo va muzokaralar | 21–32 |
| Reklama va kreativ | 33–39 |
| Oʻrganish | 40–47 |

- **Rules:** the 4 rules, collapsed into one line ("[Qavslar] ichini oʻzingiz toʻldirasiz" + "Qoidalar (4)").
- **Cards are collapsed by default:** number + title only. A tap expands to the text + copy. Several can be open at once.
- **Placeholders:** `[bracket]` placeholders are highlighted. There is no fill-in form in 3.0; students edit in Claude.
- **Done:** ticks work as in §3.1. The unit is done via "Amaliyotni yakunladim" at the page end.

**Lessons 2 and 3: free-text Vazifa (`/vazifa`)**
- One paragraph: "Erkin ijod: … u biznesingizga haqiqatan kerak boʻlsin."
- **Primary action:** "Bajardim" (a toggle; undo by tapping again).
- There is no submission (2.0 had none).

**Lesson 4: Hermes (`/amaliyot`)**

An **ordered sequence of 9 steps + a bonus**.
- **Index:** a vertical stepper 01–09, each with its "Natija" line. 10 "Ovozli agent" is set apart as "Bonus".
  - The current step is the first one not done.
  - Steps are **suggested, not enforced**: none are locked, because students may be ahead in class.
- **Persistent caution, on the index and on every card:** "Kalit, token va parolni hech qachon chatga yozmang."

**Lesson 4: Hermes card page**
1. "07 / 09" + title.
2. The **Natija** line, styled as the goal.
3. The prompts. Each one is headed by its **send-to label** (the prompt's `title`), which is the most prominent text on the card, because pasting into the wrong place is the main mistake. The labels in the data:
   - "Claude Codeʼga yuboring"
   - "Buni Telegramʼda botga yozing"
   - "Oʻzingiz, alohida terminalda"
   - "Keyin Claude Codeʼga yuboring"
4. The notes:
   - "Eslatma", "Sinov" and "Yakuniy dalil" are visible.
   - Alternative-path notes are **collapsed**: "Noutbuk yoʻli", "QR ishlamasa".
5. The end: "Bajarildi" + "Keyingi karta: 08 · Yakuniy sinov".
- **Card 04 Telegram has no prompts:** render its numbered "Boshqaruv panelida (nusxa olish shart emas)" note as the main content, with the manual toggle.

**Lesson 4: book.** A "Kitob" row on the lesson page:
- "Biznesda AIʼni qoʻllash: amaliy qoʻllanma"
- "Beshta toʻplam — chop etib, jamoangiz bilan toʻldirasiz."
- "Ochish" (Latin, the primary only when nothing else is pending) + "Кирилл ёзувида" (secondary, `lang="uz-Cyrl"`).
- Both open the PDF in a new tab. No size is shown (the data has none).

**Slides per lesson:**

| Lesson | Slides |
|---|---|
| 1 | 78 video |
| 2 | 63 image |
| 3 | 40 video |
| 4 | none (no row) |

Meta format: "78 ta slayd · video" or "63 ta slayd".

---

## 6. Demo content pack (use exactly these)

**Moment:** Saturday 26 Sep 2026, during lesson 3. Saturday group. The Sunday group's dates are each +1 day ("13-sentabr, yakshanba").

**Student:**
- Aziza Karimova, ID `AIP-7KQ2MP` (the comp uses "Dilshod Rahimov", ID `AIP-7KQ2XM`; the home has no greeting)
- "Shanba guruhi"
- "Mentor: Xurshid Maroziqov"

**Home:**
- **Hero:** "Hozir davom etmoqda · 3-dars", "Skill va agentlar", "Skill, Plugin, Connector, Plan, agentlar jamoasi, here.now", button "Darsni ochish".
- **Next step:** "Keyingi qadam: 1-dars · Amaliyot 01 · P3 Vaziyatli test"
- **Progress ring:** "1/4", "Sizning natijangiz", "Toʻliq bajarilgan darslar", "✓ Tayyorgarlik"
- **Lesson rows:**

| n | Title | Sub / date | Chip |
|---|---|---|---|
| 0 | Tayyorgarlik | Oʻrnatish va tayyorgarlik bosqichi | prep (yellow) · comp: "✓ Bajarildi · 4/4 qadam" (spec demo had "3/4 tayyor", Visa karta unchecked) |
| 1 | Kirish | 12-sentabr | lilac · open · "Ochiq · 3/6 qadam" |
| 2 | Claude va Code | 19-sentabr | grey · done · "✓ Bajarildi · 3/3 qadam" (after an untick: "Ochiq · 2/3 qadam", still grey) |
| 3 | Skill va agentlar | 26-sentabr | blue · live: blue hero card on top (slides at 14 / 40) and the same blue card in the list · "● Hozir davom etmoqda · 0/2 qadam" |
| 4 | Agent va alternativalar | 3-oktabr | locked (dark) · "🔒 3-oktabrda ochiladi" |

**Chip translations:**

| UZ | RU | EN |
|---|---|---|
| 12-sentabrgacha | до 12 сентября | by 12 Sep |
| 3/4 tayyor | 3/4 готово | 3/4 ready |
| Bajarildi | Пройден | Done |
| Davom etmoqda | Идёт сейчас | Live now |
| Ochiq | Открыт | Open |
| 3-oktabr | 3 октября | 3 Oct |

**Lesson 1 progress state:**
- slides ✓;
- Vazifa 5/8 (P1–P5 marked);
- Amaliyot 01 is 2/4 (P1, P2 marked);
- 02 ✓;
- 03A ✓;
- 04 not started.

**Lesson 1 Vazifa files:**

| File | Size |
|---|---|
| 01_Kompaniya.pdf | PDF · 21,1 KB |
| 02_Amaldagi_narxlar.csv | CSV · 1,2 KB |
| 03_Yetkazish_qoidalari.pdf | PDF · 21,0 KB |
| 04_Reklama_qoralamasi.pdf | PDF · 20,8 KB |
| 05_Eski_narxlar.csv | CSV · 934 B |
| 06_Buyurtmalar.csv | CSV · 3,3 KB |
| 07_Yigilish_qaydi.txt | TXT · 1,6 KB |
| Manbaalar.zip | ZIP · 59,3 KB |
| Talaba_qollanmasi.pdf | PDF · 25,7 KB |

**Lesson 1 Vazifa prompt (the short one):**
> **P1 · Bitta manbali javob** — Manbaa: 03_Yetkazish_qoidalari
> Faqat 03_Yetkazish_qoidalari manbasidan foydalaning. Omborda bor mahsulotni Toshkent viloyatiga standart yetkazish muddati qancha? Javobni bir jumlada, tegishli band iqtibosi bilan bering.

**Exercise 01 (Yangi xodimga tayanch):**
- **Files:**

| File | Size |
|---|---|
| 01_Yoriqnoma.pdf | 34,2 KB |
| Ichki mehnat tartibi qoidalari.pdf | 210,6 KB |
| Onboarding qo'llanmasi.pdf | 194,2 KB |
| 02_Promptlar.pdf | 37,0 KB |

- **Prompts:** use the full texts from `login.json` → `lessons[1].praktikum.exercises[0].prompts`. Their lengths are 703, 415, 420 and 310 characters, and P1 must be shown in full. P3 (the current primary) in full:
> **P3 · Vaziyatli test** — Qayerga: Studio → Quiz → sozlash
> Yangi savdo menejeri uchun vaziyatli test yarating. "Mahsulot kodini qayerdan topaman?", "Servis boʻyicha kimga murojaat qilaman?", "Parolni hamkasbga bersam boʻladimi?", "Mijozga muddat aytishdan oldin nima qilaman?" kabi ish vaziyatlarini qamrang. Har savolda bitta asosli javob boʻlsin. Javob izohi manbaga tayanishi kerak. Taʼtil va hujjatlar oʻrtasidagi ziddiyatlarni testga kiritmang. Oʻzbek lotin yozuvida yozing.

**Lesson 2 library card (shown expanded, unmarked):**
> **01 · Takroriy muammolardan biznes topish**
> [Soha]dagi korxonalar hozir qoʻl mehnati, elektron jadvallar yoki Telegram guruhlari orqali hal qilayotgan, kundalik ishda takrorlanadigan 20 ta muammoni sanab bering.
> Har biri uchun uch narsani baholang: muammo oyiga qancha xarajat keltiradi, uni hal qilish uchun qancha toʻlashga tayyor boʻlishadi va nega bu ish hali avtomatlashtirilmagan.
> Javobni oʻzbek tilida bering.

Collapsed neighbours: "02 · Sizdagi ustunlikka mos biznes", "03 · Mendan intervyu oling". The search demo uses the query "qimmat", which returns 2 results: **27 · “Qimmat” degan javobni aniqlashtirish** (a title match, ranked first) and 06 · AI xarajati tushganda paydo boʻladigan imkoniyatlar (a text match).

**Lesson 4 Hermes card 07 (Ertalabki brifing):**
- **Natija:** "Natija: sinov brifingi keladi va vazifa boshqaruv panelining CRON sahifasida koʻrinadi."
- **Send-to label:** "Buni Telegramʼda botga yozing"
- **Prompt:**
> Har kuni ertalab soat 8:00 da (Toshkent vaqti) menga qisqa brifing yubor:
> 1. Oʻzbekiston va dunyoda [sohangiz] boʻyicha eng muhim 3 ta yangilik, manbalari bilan;
> 2. raqobatchilarim [nomlar] haqida yangi maʼlumotlar;
> 3. bugun uchun bitta amaliy maslahat.
> Oʻzbek tilida, 15 qatordan oshmasin.
> Sinov tariqasida bittasini hozir yubor.
- **Note "Eslatma":** "Raqamlarni tekshiring. Agent internetdan qidiradi va manbalarni koʻrsatadi, ammo u adashishi ham mumkin. Har qanday muhim qarordan oldin manbani ochib koʻring."
- **Stepper state:** in the spec's own demo 01–06 are done, 07 is current, 08–09 are upcoming and 10 is the bonus. The clickable prototype keeps lesson 4 locked and untouched (no card is done), so it does not show that state.

**Fixed UI strings:**
- Nusxalash / Nusxalandi / Bajarildi
- "P3 bajarildi · Bekor qilish"
- Davom etish / Darsni ochish / Slaydlarni ochish
- Darsdan keyin ochiladi
- Qayta urinish
- Yopish
- Barcha slaydlar
- Boshidan
- Chiqish

**Every screen must be built with real `login.json` strings. No lorem ipsum.**

---

## 7. Clickable prototype (final-check build)
`comp/index.html` (and the single-file export `AI-Praktikum-3.0-final.html`) is a hash-routed prototype rendered from one data object. Every lesson card, tab row, exercise, file row and slide opens a real screen; there is no `href="#"`.

**Routes** (parent in brackets: the back link always goes there):
- `#/kirish` login · `#/dastur` home · `#/shrift` type check
- `#/dars/0` prep checklist [dastur]
- `#/dars/{1-4}` lesson page [dastur]; `#/dars/4` is locked until the review toggle "4-dars: ochish" is on (until then the deep link opens home with the locked sheet)
- `#/dars/{1-3}/slayd/{i}` slide viewer [lesson] (`1 / 78`, `1 / 63`, `1 / 40`)
- `#/dars/1/vazifa` [lesson], `#/dars/1/vazifa/promptlar` [vazifa]; `#/dars/{2,3}/vazifa` (free text + "Bajardim") [lesson]
- `#/dars/1/amaliyot` index [lesson]; `#/dars/1/amaliyot/{01,02,03,04,05,06}` and `03/{03a,03b}` [amaliyot, or 03]
- `#/dars/2/amaliyot` the 47-prompt library (search + 5 sections) [lesson]
- `#/dars/4/amaliyot` Hermes index [lesson]; `#/dars/4/amaliyot/{01-10}` cards [index]; `#/dars/4/kitob` [lesson]
- `#/fayl/{slug}` any file row (no real file in the prototype) [the page you came from]
- `?p=P3` scrolls to and focuses that prompt; `#/all` (also `?view=all`) stacks home, lesson 1 and exercise 06.

**State.** Ticks, slide position and the review toggle persist in `localStorage` (`aip3.demo.v1`); "Reset demo" in the comp bar restores the demo student: prep 4/4 done; lesson 1 = 3/6 (slides ✓, 02 ✓, 03A ✓, 01 at 2/4, Vazifa 5/8); lesson 2 = 3/3; lesson 3 = 0/2 with slides 14/40. The ring, lesson notes, tab marks, "Keyingi qadam" and every count are computed from the same ticks, so they always agree.

**Content policy.** Real 2.0 data wherever the blueprint or this spec has it (titles, counts, file names and sizes, the P3 / Vazifa P1 / library 01 / Hermes 07 texts, the prep items, the book). Anything 2.0 never showed (most prompt texts, exercise notes, prep steps, rules, slide images, the 04 exercise title) is marked with a small "namuna" tag and never presented as real.

**Build.** `comp/index.html` and the export are generated; never edit them. The sources are in `comp/src/`: `index.pre-proto.html`, `proto_data.js` (2.0 content), `proto_app.js` (state, templates, router, language switch), `proto_i18n.js` (UZ dictionary + helpers; the RU/EN blocks are generated), `i18n_ru.json` / `i18n_en.json` (translations), `assemble.py` + `assemble_post.py`. One command rebuilds everything, from any folder, using paths relative to the scripts (needs Python 3 and Node):

```
python ".design/comp/src/build.py"
```

It runs, in order: `gen_uz.mjs` (I18N.uz + `c.*` content -> `i18n_uz.json`) -> `merge_i18n.py` (RU/EN json -> `proto_i18n.js`) -> `assemble.py` (+ `assemble_post.py`) -> `comp/index.html` -> `export_final.py` -> `AI-Praktikum-3.0-final.html` (single file, login photo inlined, real mode; `?review` brings the comp bar and the "missing translation" underline back) -> `i18n_check.py` (keys, `{params}`, plural forms, line breaks, length limits, banned words, raw `< > & "`). The build stops with an error if the check finds a problem.
