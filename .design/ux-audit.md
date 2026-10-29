# UX audit: AI Praktikum 3.0 student portal comp

- **Audited:** `comp/index.html` as of 2026-10-16. The screens are `gate`, `dastur`, `dars` and `ex`. Telegram has been removed from the platform, so the `tg` screen is out of scope.
- **Checked against:** `ux-spec.md` (structure, states, copy), `reference-blueprint.md` (what students actually use) and real phone renders at 390px and 320px.
- **Out of scope:** visual direction. Every fix stays inside the approved look. The login page is reviewed for usability only.
- **Visual options:** `comp/ux-options.html` shows findings H1 to H5, M1 and M2 as HOZIR / A / B.

**Who the student is:** an adult on a phone, often non-technical. They come for five jobs:
1. open today's lesson;
2. download files;
3. copy a prompt into NotebookLM or Claude;
4. do the homework;
5. see how far along they are.

## Tap cost of the core jobs today (390px)

| Job | Path in the comp | Cost |
|---|---|---|
| Open today's live lesson (3) | Home → scroll about 1.5 screens past 3 cards → blue card → lesson → scroll → "Slaydlarni koʻrish" | 2 taps + 2 scrolls. The big pill goes somewhere else. |
| Download a lesson-1 exercise file | Home → Dars 01 card → Amaliyot tab → ↗ → *(Amaliyot index, not designed)* → exercise → a 36px icon | 5 taps |
| Copy a prompt | Same as above, + scroll to the lilac section → copy | 5–6 taps |
| Homework (Vazifa) | Home → lesson → Vazifa tab → ↗ → *(Vazifa page, not designed)* → prompt sheet | 5 taps. The only one-tap route is the "Promptlar varaqasi · PDF" on the lesson hero, and a PDF is the worst format for copying on a phone. |
| "How am I doing?" | Home → scroll to the last card → "12/47" | Misleading (H4) |

With the recommended fixes:
- today's lesson takes 1 tap from home;
- resuming the exact unfinished prompt takes 1 tap (the "Keyingi qadam" row);
- the files keep their 5-tap path but become unambiguous.

---

## High

### H1 · Home: the main button sends students to old optional work · `dastur`
- **Problem:** the hero pill says "Davom etish: 1-dars, 06-mashq".
  - Exercise 06 is *extra* (the spec counts only 01–04).
  - Lesson 3 is live. Its blue card is 4th in the list, below three tag pills.
  - This breaks the spec's §1 rule: if a lesson is live, the hero is "Darsni ochish".
- **Scenario:** it is Saturday and the mentor says "open today's slides". Dilshod taps the big button and lands on lesson 1, exercise 06. He goes back and scrolls to find the blue card while the class moves on.
- **Fix (A, recommended):**
  - Under the greeting, a line: "Hozir davom etmoqda · 3-dars".
  - The pill: "Darsni ochish: Skill va agentlar".
  - A secondary row: "Keyingi qadam · 1-dars · Amaliyot 01 · P3". It points at the first unfinished *core* item and is hidden when it duplicates the pill.
  - The tags move into the name menu (see M3).
- **Fix (B):** the live lesson as a flat blue card under the greeting. The cost is that the card is repeated in the list.

### H2 · Practice: the copy button is an unlabelled icon, with no undo · `ex`
- **Problem:** the most important control in the product is a 48px circle with the two-squares icon and no word on it. It breaks spec §3.4 ("the copy button carries a text label, never an icon alone").
  - A copy marks the prompt done silently. There is no "Bekor qilish" toast and no tick toggle (spec §3.1).
  - Every copy button looks the same, so the screen has no single primary action (spec §4.2).
  - The "where to paste" line ("NotebookLM → Studio → Audio Overview → Customize") is the faintest text in the row: 14px in `#2E2440`.
- **Scenario:**
  - A student who doesn't recognise the icon reads the prompt and retypes it by hand. Nothing marks it done, so progress stays wrong.
  - Another student taps the icon to see what it does, and the prompt is now "done".
  - Another pastes into Chat instead of Studio → Customize because the target line was easy to miss.
- **Fix (A, recommended):**
  - An outline pill reading "Nusxalash"; the first unmarked prompt gets the filled black pill.
  - After copying: "Nusxalandi" for 2 s.
  - A 26px tick circle before the title, with a 46px hit area, that toggles "Bajarildi deb belgilash".
  - A toast: "01 bajarildi · Bekor qilish".
  - The target line becomes "**Qayerga:** NotebookLM → Chat" in 15px/500 black.
  - The eyebrow becomes "Promptlar · 1 / 2 bajarildi".
- **Fix (B):** keep the circle and add the label "NUSXALASH" under it, plus a "Bajarildi" chip.

### H3 · Login: pasting the full ID fails, and the error is hard to read · `gate` (usability only)
- **Problem 1, paste:** the input has `maxlength="6"` and a visual "AIP-" prefix.
  - Students will copy their ID from a message as "AIP-7KQ2XM".
  - The paste becomes "AIP-7K" and the student is told "Bunday ID yoʻq", which is false.
  - **Code fix:** strip `AIP-`, spaces and dashes, uppercase the rest, *then* check. Drop the maxlength. Keep auto-submit at 6 cleaned characters.
- **Problem 2, legibility:** the error is 11px Martian Mono in red, sitting on the brightest part of the photo. At 390px "0, 1, I, L va O" is barely readable (see `comp390-gate-err.png`).
- **Problem 3, wrong message:** every format error says "Bunday ID yoʻq" ("no such ID"), although the server was never asked. The empty help line also gives no hint before the student starts typing.
- **Copy fix (Uzbek):**

| Case | Copy |
|---|---|
| Too short | "Yana 2 ta belgi kiriting." (keep) |
| Bad characters | "IDʼda 0, 1, I, L va O boʻlmaydi. Xabardagi IDʼni qayta tekshiring." |
| Server: not found | "Bu ID topilmadi. Mentoringizdan tekshirib oling." |
| Server: rate limit (8/min) | "Juda koʻp urinish. 1 daqiqadan keyin qayta urinib koʻring." |
| Network | "Internet yoʻq. Ulanishni tekshirib, qayta urinib koʻring." |

- **Visual fix (A, recommended):** 14px Golos 500 with a ⚠ icon, on a black strip at 78% opacity. It stays legible on any part of the photo.
- **Visual fix (B):** white 14px text with the same dark halo the "Shaxsiy ID" label uses, with red only on the line and the icon. It adds no box, but it can lose against the brightest swirl.

### H4 · Progress numbers: no units, and they contradict each other · `dastur`, `dars`
**The comp shows one idea, "how far am I", in at least six ways:**

| Where | Text | What it really is |
|---|---|---|
| Home, yellow card | "12/47" under "Sizning natijangiz" | lesson 2's library only |
| Home, under it | "1 / 5 dars yakunlandi" | 5 counts lesson 0, while the spec says 1/4 with prep separate |
| Home, tag | "4 dars · 12 sen – 3 okt" | contradicts the 5 cards and "1/5" |
| Dars 01 card | "5/7 bajarildi" | the spec's model is 6 units, and "5/7" says nothing about what was counted |
| Dars 02 card | "12/47 prompt" | a different unit on the next card |
| Lesson page | "71%" (5/7), and "4/5" + "7 ta mashq · 13 ta prompt" in the Amaliyot tab | three numbers, none of them labelled |

- **Scenario:** the student sees a huge "12/47" as their result and thinks they are a quarter of the way through the course and behind. They have actually finished everything that counts except a few prompts.
- **Fix (A, recommended):** one model everywhere, with the unit always written out.
  - Home card: "1/4" + "Toʻliq bajarilgan darslar", and "✓ Tayyorgarlik" as the note.
  - Lesson cards and the lesson header: "3/6 qadam".
  - Amaliyot: "2/4 asosiy mashq bajarildi".
  - Use fractions, not percentages, and delete the 71% card. Its number moves into the lesson header ("1-dars · 12-sentabr · 3/6 qadam").
  - Never show a library prompt count as a result.
- **Fix (B):** the yellow card becomes "5 ta ish qoldi" with up to 3 tappable rows. This overlaps the "Keyingi qadam" row from H1.

### H5 · Lesson folder: a dead tab, no state per tab, unclear Vazifa · `dars`
- **Problem 1, dead tab:** "Kitob" takes ¼ of the tab bar on lessons 1–3 only to say "4-darsda ochiladi". The spec says content that won't exist in this lesson is not rendered.
- **Problem 2, no state:** the tabs carry no state. To learn what is left, the student taps all four.
- **Problem 3, the Vazifa pane** ("Vazifa · bajarilmagan / 7 fayl + ZIP / «Ravon Uy» keysi ↗") never says what the homework *is* or how it counts as done.
  - In the spec, lesson 1's homework is 8 prompts (P1–P8) in NotebookLM, and it is done when they are all marked.
  - "bajarilmagan" also contradicts the spec's demo state (5/8).
- **Problem 4, Vazifa vs Amaliyot:** the student cannot tell them apart from a single-word tab label.
- **Problem 5, misplaced PDF:** the lesson hero carries "Promptlar varaqasi P1–P8, Q1–Q5 · PDF".
  - It is the Vazifa prompt sheet as a PDF, sitting outside the Vazifa tab.
  - "P1–P8, Q1–Q5" is jargon on first contact.
- **Fix (A, recommended):**
  - Three tabs on lessons 1–3: Slaydlar, Vazifa, Amaliyot. Kitob appears only in lesson 4, where Slaydlar is absent.
  - A second line in each tab, in Martian 11px: "✓ koʻrildi", "5/8", "2/4".
  - Pane labels: "Amaliyot · darsda qilinadi" and "Vazifa · uyda".
  - Vazifa pane copy: "8 ta prompt, NotebookLMʼda birma-bir. 5 tasi bajarildi." with the action "Davom etish: P6".
  - The hero's PDF link moves into the Vazifa page as a quiet "PDF varianti" link.
- **Fix (B):** a list of exercises inside the Amaliyot pane (one tap to an exercise), with ✓ only on finished tabs.

## Medium

### M1 · Lesson card labels: too many capitals, and the state is buried · `dastur`
- **Problem:** two lines of 13px uppercase ("DARS 01 · 12 SENTABR / OCHIQ · 5/7 BAJARILDI"). The state, which is what students scan for, sits on line 2 at the same weight as the date.
- **Other issues:**
  - Lesson 00 still says "Hammasi 30 daqiqa" after it is done.
  - The locked card is a non-interactive `div`.
- **Fix (A, recommended):**
  - Label: "1-dars · 12-sentabr".
  - The state in an outline pill drawn in the card's ink: "Ochiq · 3/6 qadam", "Bajarildi", "Davom etmoqda", "Tayyor · 4/4".
  - Locked card: "🔒 3-oktabrda ochiladi" + "Slaydlar va vazifa dars kuni shu yerda chiqadi". Keep the big cards.
- **Fix (B):** state as a bottom-right note and no topic subtitle. Calmer, but the state is small and the topics are lost.

### M2 · Practice files: no order, no role, and a duplicate · `ex`
- **Problem 1, no roles:** four identical rows, one for the brief, one for the prompts PDF and two for the NotebookLM sources.
- **Problem 2, the duplicate:** `06_Promptlar.pdf` repeats the prompts right below it, and the spec hides it behind "PDF variant".
- **Problem 3, small target:** the download target is a 36px icon (under 44px), and the row is not a link.
- **Problem 4, sizes:** the file sizes wrap to their own line at 390px.
- **Scenario:** the student uploads all four files into NotebookLM, prompts PDF included, and the answers start quoting the prompt sheet.
- **Fix (A, recommended):**
  - Two groups: "1 · Avval oʻqing" (the brief) and "2 · NotebookLMʼga yuklang" (the sources).
  - The whole row is the link (60px), with meta under the name ("PDF · 1,2 MB").
  - After the files: "Keyin pastdagi promptlardan nusxa oling."
- **Fix (B):** "Hammasini yuklash · ZIP". Not recommended: NotebookLM does not take a ZIP, and many phone users struggle to open one.

### M3 · Home header: logout sits where "back" lives · `dastur`
- **Problem 1:** the first tappable thing on home is "← AIP-7KQ2XM · Chiqish". It sits in the exact slot, with the same arrow, that every other screen uses for "← Dastur".
- **Scenario:** a student who taps "back" by habit is logged out and has to find their ID again.
- **Problem 2:** the three tag pills (group, mentor, dates) take about 150px above the lessons on every visit.
- **Fix:** move the ID, group, mentor, language and "Chiqish" into the name/menu sheet (spec §1). Home starts with the greeting.

### M4 · Practice page dead end · `ex`
- **Problem 1, dead end:** after the last prompt there is nothing: no "Bajarildi" and no "Keyingi mashq" (spec §2c).
- **Problem 2, back skips a level:** back goes to the lesson page rather than "← Amaliyot", and the Amaliyot index is not designed.
- **Problem 3, unlabelled extra:** exercise 06 is optional but nothing says so.
- **Fix:**
  - Page end: "Keyingi mashq: 04 · Marketing" as the primary once all prompts are marked.
  - Eyebrow: "← Amaliyot · 06 · Qoʻshimcha".
  - Design the Amaliyot index: rules, the guide file, 01–04 with 03 as "Bittasini tanlang", the extras, and the closing file.

### M5 · Slides pane: rows look tappable but aren't, and there is no resume point · `dars`
- **Problem:** the 4 topic rows have 48px dividers like links, but tapping them does nothing. "Slaydlarni koʻrish" sits at the bottom of the pane, below the fold at 390px, and doesn't say where the student left off.
- **Fix:**
  - Either the rows open the viewer at that section (`?s=`), or drop their dividers.
  - The action reads "Davom etish · 14 / 78" (or "Boshlash" when new).
  - Meta: "78 ta slayd · video" (the spec's format).

### M6 · No answer to "when does the next lesson open?" · `dastur`
Telegram has been removed. Today the only signal is the date on the locked card.
- **Open question:** how does a student learn that a lesson has opened? The options are in-class only, the mentor's group chat, or a "Yangi" pill on the card on the first visit after it opens.

## Low

- **L1 · Number and date formats vary:** "Dars 01", "01-dars", "1-dars", "06-mashq" and "Amaliyot · 06", and "12 sentabr" next to "12-sentabr".
  - Use "1-dars" and "12-sentabr" everywhere. Keep two-digit numbers only for exercises and prompts ("01").
- **L2 · Redundant states:** the lesson eyebrow "Dastur · 12-sentabr · ochiq" says "ochiq" on a page the student just opened.
  - Make it "← Dastur", and put the date and progress in the header line.
- **L3 · Global nav without context (desktop):** the links "Amaliyot" and "Kitob" carry no lesson, so it is unclear which lesson they open. "Kitob" is locked until lesson 4.
  - On mobile the ☰ menu has no designed sheet.
  - Fix: the nav is "Dastur" plus the name/menu sheet. Amaliyot and Kitob are reached through the lesson.
- **L4 · The progress card sits under the lesson page's folder** as a second, competing number. Remove it, per H4.
- **L5 · Login: no "where is my ID?" hint.**
  - Add a quiet line under the field once the student fails twice: "ID kursga yozilganda yuborilgan."
  - This needs confirmation of where students actually get the ID.

---

## What works: keep it
- **Colour means state.** Blue = now, dark = locked, yellow = you. On a phone the blue live card and the dark locked card can be read without reading any text.
- **The big folder cards.** The whole card is the tap target (196px+). Students can't miss it. Keep them, as the user decided.
- **The lilac prompt section.** Golos 17px with line-height 1.6, real numbers, placeholders underlined and not coloured, nothing else on the card. It is the most readable part of the product.
- **Copy returns the raw ʻ/ʼ.** The display mapping is correct.
- **The gooey tabs' mechanics.** A fixed body height (no page jump), arrow-key support and crisp text above the filter. The problem is only *which* tabs exist and what they say.
- **The login's ID alphabet** (no 0/1/I/L/O), auto-submit at 6 characters, and the welcome by name. Fix paste and the error text; the rest stays as it is.
- **The exercise lede** gives the order of work in one sentence. Make the steps visible in the layout as well (M2).

## Open questions
1. **Homework submission:** the brief says students "submit homework", but 2.0 had no submission and the spec has only a "Bajardim" toggle or prompt marks. Is real submission planned for 3.0? If so, the Vazifa pane needs a proper submit state.
2. **New-lesson signal:** how do students learn a lesson has opened now that Telegram is gone? (M6)
3. **Where students get their ID:** this decides the help copy (L5) and confirms that they paste it with "AIP-" (H3).
