# Element-meaning audit: AI Praktikum 3.0 comp

- **Audited:** `comp/index.html` on 2026-10-16, after the 01-02-03 circles were removed. Screens `gate`, `dastur` (+ `&newlesson`), `dars` (all 3 tabs) and `ex`, rendered at 1440 and 390. The name menu, the locked sheet and the toast were read from the markup.
- **The question for every element:** what does a non-technical adult student on a phone think it tells them, and is that true? Style is not in question. Decoration is.
- **Checked against:** `reference-blueprint.md` (2.0), plus the user's 3.0 changes: Telegram removed, Amaliyot before Vazifa, Kitob only in lesson 4, short IDs like `XM` still log in.
- **Not repeated:** the findings in `ux-audit.md` that are fixed now. Three of its findings are still in the comp and still mislead, so they come back here, marked "(ux-audit …, unfixed)".
- **Visual options:** `comp/element-options.html` (HOZIR → fix).

**Verdicts:** ✅ OK · ⚠️ misleading (it looks like data, state or an action and isn't, or it contradicts other data) · ❓ unclear · 🗑 noise. The numbers in the "Fix" column refer to the fix list below.

---

## Inventory

### Gate `?view=gate` (16 elements)
| # | Element | Reads as | Actually is | Verdict | Fix |
|---|---|---|---|---|---|
| G1 | Photo: man at a CRT, bookshelf, city | decoration | decoration | ✅ | |
| G2 | "1%" on the CRT | the mentor's brand ("1% bilim") | brand mark | ✅ Students know the brand. A stranger could read it as a load percentage. | |
| G3 | Pixel swirl over the photo | decoration | decoration | ✅ No meaning. (It is "glitch" by the taste profile's own list. That is a style question, not part of this audit.) | |
| G4 | Edge vignette | nothing | decoration | ✅ | |
| G5 | Wordmark "AI PRAKTIKUM 3.0" (+ cursor blur on desktop) | the product name | in the comp, a link into Dastur that skips the login | ✅ This is a comp shortcut. In production it must not be a link. | |
| G6 | "SHAXSIY KABINET" | "my personal page" | the heading | ✅ | |
| G7 | Label "SHAXSIY ID" | "type your ID here" | the label | ✅ | |
| G8 | Fixed "AIP-" prefix | "every ID starts with AIP- and then 6 characters" | a visual prefix. ~~The code requires exactly 6 characters, so `XM` is refused.~~ **STALE (re-audit):** short IDs now log in on Enter/KIRISH. | ✅ now. Real IDs are `AIP-` + 6, so the prefix tells the truth. | 6 |
| G9 | Placeholder "7KQ2XM" at 60% white, the same mono as a typed value | "my ID is already filled in" | an example | ⚠️ The student presses Kirish on an empty field. | 6 |
| G10 | Underline + glow line | the field / focus | the field / focus | ✅ | |
| G11 | Help line (empty until typing) and its 5 error texts | | | ✅ The texts are right. The short-ID case is covered by fix 6. | |
| G12 | "KIRISH" white button + its gooey drop | the submit button | the submit button | ✅ | |
| G13 | UZ · RU · EN | language | language (2.0 parity) | ✅ | |
| G14 | Loader: a server stack with blinking LEDs | "loading" | a 1.8 s transition | ✅ Decoration that reads correctly. | |
| G15 | "Xush kelibsiz, Dilshod!" | a welcome by name | 2.0 parity | ✅ | |
| G16 | Gooey "Kirish" hover | hover | hover | ✅ | |

### Home `?view=dastur` (39 rows: 38 live elements + the removed cluster; includes the popup, the name menu and the locked sheet)
| # | Element | Reads as | Actually is | Verdict | Fix |
|---|---|---|---|---|---|
| D1 | 01 · 02 · 03 coloured circles next to the name | lesson states | the reference's avatar cluster | **Removed 2026-10-16 (user decision).** See fix #1. | 1 |
| D2 | Nav hairline | divider | decoration | ✅ | |
| D3 | "Dastur" (underlined) | "I'm on the lesson list" | the current page | ✅ | |
| D4 | "Amaliyot" (desktop nav) | "all my practice", or today's practice | a link to lesson 1's exercise 06. Lesson 3, which is live, has no Amaliyot in 2.0 at all. | ⚠️ (ux-audit L3, unfixed) | 4 |
| D5 | Wordmark (centre) | home | a link to home | ✅ | |
| D6 | "Dilshod Rahimov" (desktop, top right) | my name, a label | a button that opens the menu with logout | ❓ Nothing shows it can be tapped. | 11 |
| D7 | ☰ icon, no text (phone) | "site navigation" | the profile menu: ID, group, mentor, language, Chiqish. It has no navigation in it. | ❓ An icon with no text that promises something else. | 11 |
| D8 | Faint grid on the canvas | nothing (graph paper) | decoration | ✅ Reads as nothing. `taste-profile.md` "Never: grids, glow" conflicts with `tokens.md` "Project background", see open questions. | |
| D9 | Violet glow + blue floor | nothing | decoration | ✅ Same note as D8. | |
| D10 | Ring with a yellow arc | "my progress" | real: 1 of 4 lessons | ✅ | |
| D11 | "1/4" in the ring | 1 of 4 | real | ✅ | |
| D12 | "KURS PROGRESSI" | label | label | ✅ | |
| D13 | "1 / 4 dars toʻliq bajarildi" | the unit, written out | real. It agrees with the list (only lesson 2 is done). | ✅ | |
| D14 | "SALOM, DILSHOD" | greeting | greeting | ✅ | |
| D15 | Blue hero card | "now" | the live lesson. Blue appears once. | ✅ | |
| D16 | "HOZIR DAVOM ETMOQDA / 3-DARS · 26-SENTABR" | the lesson is live | true | ✅ | |
| D17 | "SKILL VA AGENTLAR" | lesson title | 2.0 title | ✅ | |
| D18 | "Slaydlar 14 / 40 · davom etish" | where I stopped + the action | real (2.0: 40 slides) | ✅ | |
| D19 | ↗ on the hero card | "opens outside / in a new tab" | an in-app link | ❓ See fix 13. | 13 |
| D20 | "Keyingi qadam" + outline → circle | the next thing to do | a link | ✅ The label is right, but in the comp it lands on the wrong exercise (fix 2). | 2 |
| D21 | "1-dars · Amaliyot 01 · P3" | exercise 01, prompt P3 | the ux-spec demo state | ✅ The text is right. The page it opens has no P3 (fix 3). | 3 |
| D22 | Folder tab rise on the list cards | a folder | decoration (the user's rule: folders only on the lesson list) | ✅ It is empty, so it never looks like a label. | |
| D23 | ↗ on 4 list cards; none on the locked card | "opens elsewhere"; absent = locked | in-app links | ❓ The present/absent rule works. The glyph is the problem. | 13 |
| D24 | Yellow fill on the 0-dars card | "needs attention" / "prep" | prep, which is **finished** (4/4) | ❓ Yellow is the universal "pending" colour. Done lesson 2 is grey. | 14 |
| D25 | "0-DARS · TAYYORGARLIK" | label | lesson number + the 2.0 *title* | 🗑 It repeats the card title. It is the only card with no date. | 16 |
| D26 | "✓ TAYYOR · 4/4" | prep done | real (4 items) | ✅ | |
| D27 | "OʻRNATISH VA TAYYORGARLIK" | title | the 2.0 *subtitle*. The title and subtitle are swapped compared with the other 4 cards. | 🗑 "Tayyorgarlik" twice. | 16 |
| D28 | "1-DARS · 12-SENTABR" | number + date | 2.0 date | ✅ | |
| D29 | "OCHIQ · 3/6 QADAM" | open, 3 of 6 steps | real (ux-spec model) | ✅ What "qadam" is gets explained on the lesson page (fix 5). | |
| D30 | "KIRISH" + "AI, modellar, Context, RAG, NotebookLM" | title + topics | 2.0 | ✅ | |
| D31 | "✓ BAJARILDI · 3/3 QADAM" (lesson 2) | done | real | ✅ | |
| D32 | Lesson 3: grey card + filled "HOZIR · 0/2 QADAM" | the live lesson, nothing finished yet | real; it agrees with the hero's 14/40 | ✅ | |
| D33 | Lesson 3 subtitle "…agent teams, here.now" | topics | the 2.0 string | ✅ | |
| D34 | Dark card "4-DARS · 3-OKTABR" | number + date | the date again, which the pill below repeats | 🗑 | 17 |
| D35 | "🔒 3-OKTABRDA OCHILADI" | locked until 3 Oct | true | ✅ | |
| D36 | "10 ta Hermes kartasi va kitob: «Biznesda AIʼni qoʻllash» (lotin va kirill)" | what is coming | 2.0 (9 cards + bonus, the book, no slides) | ✅ | |
| D37 | Locked card tap → sheet "4-dars 3-oktabr kuni ochiladi." + Yopish | "nothing to tap here" (no ↗, dimmed) | it opens a sheet that repeats the card | ✅ Harmless. The sheet exists for deep links to a locked lesson (ux-spec §1). | |
| D38 | New-lesson popup: "YANGI DARS OCHILDI / 3-DARS · SKILL VA AGENTLAR / Darsni ochish → / Yopish" | a notice + 2 actions | the replacement for Telegram | ✅ Note: at 390 it covers the ring and "SALOM", the "progress one glance away" spot, until it is dismissed. Layout, not meaning. | |
| D39 | Name menu: name, "Shaxsiy ID AIP-7KQ2XM", "Guruh Shanba guruhi", "Mentor X. Maroziqov", "Kurs 4 dars · 12 sen – 3 okt", UZ/RU/EN, Chiqish | profile | real (2.0: 4 sessions) | ✅ "12 sen" next to "12-sentabr" elsewhere is a format detail (ux-audit L1). | |

### Lesson `?view=dars` (29 elements, all 3 tabs)
| # | Element | Reads as | Actually is | Verdict | Fix |
|---|---|---|---|---|---|
| L1–L5 | Nav, as on home ("Dastur" current, "Amaliyot", wordmark, name / ☰) | | | as D3–D7 | 4, 11 |
| L6 | Grid + glow | | | ✅ as D8 | |
| L7 | "← DASTUR · 12-SENTABR · OCHIQ" | back + date + state | back link. "ochiq" on a page you just opened says nothing. | 🗑 (ux-audit L2, unfixed) | 19 |
| L8 | "01-DARS / KIRISH" | lesson 1 | the same lesson that home calls "1-dars" | 🗑 A different number format for the same thing (ux-audit L1, unfixed). | 19 |
| L9 | Lede | what the lesson is | 2.0 subtitle + summary | ✅ | |
| L10 | Pill "Amaliyotni davom ettirish" → | continue the practice | primary action | ✅ (the comp's target is wrong, fix 2) | 2 |
| L11 | ↓ "Promptlar varaqasi / P1–P8, Q1–Q5 · PDF" | "the prompts for this lesson's practice" (it sits under the Amaliyot button) | the **Vazifa** prompt sheet as a PDF. "P1–P8, Q1–Q5" is jargon. | ⚠️ (ux-audit H5.5, unfixed) | 9 |
| L12 | Lilac gooey folder shape | a folder with tabs | decoration + tab container | ✅ | |
| L13 | Tab "SLAYDLAR ✓ koʻrildi" | slides seen | real | ✅ | |
| L14 | Tab "AMALIYOT 2/4" | 2 of 4 … something | 2 of 4 core exercises | ❓ No unit. It sits next to 5/8 and the 3/6 below. | 12 |
| L15 | Tab "VAZIFA 5/8" | 5 of 8 … something | 5 of 8 main prompts | ❓ No unit. | 12 |
| L16 | Slides pane label "SLAYDLAR · VIDEO / KOʻRILDI" | label | it repeats the tab name and the tab status | 🗑 | 8 |
| L17 | 4 numbered rows with dividers "01 AI va modellar … 04 NotebookLM bilan ishlash" | 4 tappable chapters, or exercises 01–04 (the same "01" as "Amaliyot 01") | dead text that repeats the lede | ⚠️ (ux-audit M5, unfixed) | 8 |
| L18 | "78 SLAYD" | slide count | 2.0 (78 video) | ✅ | |
| L19 | "Slaydlarni koʻrish" ▶ | opens the viewer | a link | ✅ | |
| L20 | Amaliyot pane label "AMALIYOT · DARSDA QILINADI / KORXONA BILIMINI ISHGA SOLING" | when + title | 2.0 title | ✅ | |
| L21 | "2/4" + "asosiy mashq bajarildi" | 2 of 4 core exercises | real | ✅ | |
| L22 | "Davom etish / 01 · P3 Vaziyatli test" → | resume there | a link (wrong target in the comp, fix 2) | ✅ | 2 |
| L23 | Vazifa pane label "VAZIFA · UYDA / «RAVON UY» KEYSI" | homework + case name | 2.0 | ✅ | |
| L24 | "5/8" + "prompt bajarildi. NotebookLMʼda birma-bir." | 5 of 8 prompts | real | ✅ | |
| L25 | "Davom etish / Vazifa · P6" → | resume | a dead `#` in the comp (the Vazifa page is not built) | ✅ | |
| L26 | Yellow card "SIZNING NATIJANGIZ" | "your result", i.e. a score or grade | progress in steps | ⚠️ 3/6 under "natija" reads as a 50% mark. | 5 |
| L27 | "1-DARS · QADAMLAR" + "3/6" | 3 of 6 steps | real. But "qadam" is never defined, and 2/4 + 5/8 on the tabs do not visibly add up to 3/6. | ❓ | 5 |
| L28 | "3 TA QADAM QOLDI" | 3 left | true, but it does not say *which* 3 | ❓ | 5 |
| L29 | Gooey tab motion | tab switch | motion | ✅ | |

### Exercise `?view=ex` (29 elements)
| # | Element | Reads as | Actually is | Verdict | Fix |
|---|---|---|---|---|---|
| E1–E5 | Nav as home, but "Amaliyot" is underlined as the current page | "I'm in the Amaliyot section" | `href="#"`, so tapping it does nothing | ⚠️ (part of fix 4) | 4, 11 |
| E6 | Grid + glow | | | ✅ | |
| E7 | "← 1-DARS · AMALIYOT · 06 · QOʻSHIMCHA" | back to lesson 1; this is extra exercise 06 | back link + true labels | ✅ | |
| E8 | "RAHBAR UCHUN AUDIO" | exercise 06's title | **invented**. In 2.0, 06 is "Rahbar yoʻlda ham tushunsin" (tag "Rahbar audio"). | ⚠️ | 2 |
| E9 | Lede "Avval fayllarni yuklab olib, NotebookLMʼga qoʻshing. Keyin promptlardan nusxa oling…" | "upload all the files" | it contradicts step 1 just below (the brief is for reading, not for uploading) | ⚠️ / 🗑 | 15 |
| E10 | "1 · AVVAL OʻQING" | read this first | true | ✅ | |
| E11 | "06_Rahbar_audio.pdf · PDF · 240 KB" | the brief | **invented**. The 2.0 pattern is `06_Yoriqnoma.pdf`. | ⚠️ | 2 |
| E12 | "2 · NOTEBOOKLMʼGA YUKLANG" | upload these | true | ✅ | |
| E13 | "Ravon_Uy_Q3_hisobot.pdf", "Savdo_jadvali_Q3.csv" | this exercise's sources | **invented**. "Ravon Uy" is lesson 1's *Vazifa* case, so the Amaliyot page now looks like the homework. | ⚠️ | 2 |
| E14 | ↓ outline circles | download | the whole row is the link | ✅ | |
| E15 | Martian "PDF · 1,2 MB" | type + size | real format | ✅ | |
| E16 | "Keyin pastdagi promptlardan nusxa oling." | next step | a repeat of the lede's second sentence | 🗑 | 15 |
| E17 | Full-bleed lilac | "the prompts start here" | section background | ✅ | |
| E18 | "PROMPTLAR · 2 TA" | 2 prompts | true, but it hides that 1 is already done | ❓ (ux-audit H2 proposed "1 / 2 bajarildi") | 18 |
| E19 | Huge "01" / "02" | prompt numbers 01 and 02 | the source data calls them **P1/P2**, and every link into this page says "P3" | ⚠️ "P3" is nowhere on the page. "01" also means exercise 01 and lesson 01 elsewhere. | 3 |
| E20 | "01" dimmed to 30% | done | done | ✅ The "Bajarildi" chip confirms it. | |
| E21 | Titles "MANBALARNI TEKSHIRISH", "AUDIO-BRIFING SOZLAMASI" | prompt name | placeholder data from `ref-prompts/directions.md` | ✅ as an element (the content is fix 2) | |
| E22 | Filled "✓ BAJARILDI" | done, tap to undo | a toggle | ✅ | |
| E23 | Outline "BAJARILDI DEB BELGILASH" | a status label, the same outline pill as "OCHIQ · 3/6 QADAM" on home, which is **not** tappable | a toggle button | ❓ The same shape means "status" on one screen and "button" on the next. | 10 |
| E24 | "Qayerga: NotebookLM → Chat" | where to paste | real 2.0 target format | ✅ | |
| E25 | Prompt text | the prompt | the prompt | ✅ | |
| E26 | **[boʻlim nomi]** bold + solid underline | a link: "tap to see sections" | a placeholder to fill in | ⚠️ The same underline as the real link "PDF varianti" 2 rows below. | 7 |
| E27 | Circle + "NUSXALASH" | copy | copy + mark done | ✅ | |
| E28 | "↓ PDF varianti · 96 KB" | the same prompts as a PDF | a link | ✅ | |
| E29 | Toast "01 bajarildi · Bekor qilish" | prompt 01 done, undo | true | ⚠️ It uses "01", not "P1" (same as E19). | 3 |

**Totals:** gate 16 · home 39 (38 live + the removed cluster) · lesson 29 · exercise 29 = **113 elements**.

---

## Fix list (ranked)

### #1 · 01-02-03 circles next to the greeting · REMOVED 2026-10-16 (user decision)
- **What it was:** the reference's avatar cluster refilled with lesson numbers. It read as lesson states, but blue "01" contradicted the live lesson (3, blue on the hero card). It stopped at 03 in a 0–4 course, and it duplicated the ring.
- **Options considered:**
  - (a) remove. Recommended, and chosen.
  - (b) make them real dots 00–04 with true states. Rejected: blue would still mean "live" in a second place, and the ring + list already carry the states.
- **Docs still to update:** `taste-profile.md` ("The reference's avatar cluster becomes three overlapping circles…") and `tokens.md` ("Lesson-number cluster") still describe it.

### #2 ⚠️ The only built exercise is the wrong one, with invented content
- **Fix:** make real. Rebuild `?view=ex` as **exercise 01 "Yangi xodimga tayanch"** from the `ux-spec.md` §6 demo pack. It uses the real files `01_Yoriqnoma.pdf · 34,2 KB`, `Ichki mehnat tartibi qoidalari.pdf · 210,6 KB`, `Onboarding qo'llanmasi.pdf · 194,2 KB`, and P1–P4 with P1/P2 done and P3 as the primary.
  - If 06 stays as a second sample, use its 2.0 title "Rahbar yoʻlda ham tushunsin" and `06_Yoriqnoma.pdf`.
  - Never use "Ravon Uy" outside Vazifa.
- **Why it matters:**
  - Three entry points promise "01 · P3 Vaziyatli test": the home "Keyingi qadam", the lesson pill and the Amaliyot pane. All three land on the *optional* 06, which has 2 placeholder prompts. That is the old H1 trap again, inside the demo.
  - "Ravon Uy" files on an Amaliyot page make it look like the homework.
- **2.0 check:** fails. The title, the files and the prompts are not 2.0 data. The spec says to use the exact `login.json` strings.

### #3 ⚠️ Prompt numbers "01 / 02" while every link says "P3"
- **Fix:** relabel. The big numeral shows the data's ID: **"P1"**, **"P2"**. The toast becomes "P1 bajarildi · Bekor qilish". Two-digit numbers stay for exercises only ("Amaliyot 01"), as ux-audit L1 already ruled.
- **Why it matters:**
  - The student arrives looking for "P3" and finds only 01 and 02.
  - "01" also means lesson 01 and exercise 01 one level up.
- **2.0 check:** passes once fixed. Prompt IDs in 2.0 are `P1…`, `Q1…` (Vazifa) and `{id}` on exercise prompts. Lesson 2's library is the exception: it really is numbered 01–47.

### #4 ⚠️ The global "Amaliyot" nav link points at no lesson
- **Fix:** remove it from the nav. The desktop nav keeps "Dastur" only. Practice is reached through the lesson, as in 2.0.
  - On the exercise page the current location is already said by the eyebrow "← 1-dars · Amaliyot · 06".
  - If a cross-lesson index is ever wanted, *make it real*: a page listing lesson 1 (7 exercises), lesson 2 (47 prompts) and lesson 4 (10 Hermes cards). That is new scope.
- **Why it matters:**
  - During lesson 3, the one that is live, "Amaliyot" opens lesson 1's extra exercise, because lesson 3 has no Amaliyot.
  - On the exercise page it is "current" but `href="#"`.
- **2.0 check:** 2.0 has no global Amaliyot. `ux-spec.md` §1 lists it, so the spec needs the same edit.

### #5 ⚠️ Lesson page yellow card "Sizning natijangiz · 3/6"
- **Fix:** relabel + make real.
  - Label "1-dars · bajarilgan qadamlar".
  - Keep "3/6".
  - Replace "3 ta qadam qoldi" with the 3 remaining steps by name, as **one plain line**: "Qoldi: Amaliyot 01, Amaliyot 04, Vazifa".
  - Not link rows (re-audit): the tabs above already hold "Davom etish" for each, so rows with → would be a second style of the same action.
- **Fix (B):** remove the card and put "3/6 qadam" in the eyebrow (ux-audit H4/L4).
- **Why it matters:**
  - "Natija" means result or score. A big 3/6 under it reads as a 50% grade.
  - "Qadam" is not defined anywhere, and the student cannot add 2/4 + 5/8 + ✓ to get 3/6.
- **2.0 check:** progress is new in 3.0, so this is spec-only. It follows the ux-spec model (1 slides + 4 core exercises + 1 Vazifa = 6).

### #6 ⚠️ Login: the placeholder looks typed (the short-ID half is STALE)
- **Fix:** relabel + code.
  - Remove the "7KQ2XM" placeholder.
  - Put the example in the help line, which is visible before typing: "Masalan: AIP-7KQ2XM".
  - Keep the "AIP-" prefix (re-audit: it was only a problem while short IDs failed).
  - ~~Short IDs submit on Enter.~~ **Done in the comp:** `XM` logs in on Enter/KIRISH, never on auto-submit.
- **Why it matters:**
  - On the photo, the 60% placeholder in the value's own font looks filled in, so the student taps Kirish on an empty field.
  - ~~A student with `XM` cannot log in.~~ Stale.
- **2.0 check:** passes now (blueprint §4: short IDs log in on Enter).

### #7 ⚠️ The placeholder [boʻlim nomi] is underlined like a link
- **Fix A (recommended):** make it non-tappable-looking. Keep it bold with the brackets, and drop the underline. It keeps the user's "no colour, no fill" rule.
  - Add one line above the list, the 2.0 rule text: "[Qavslar] ichini oʻzingiz toʻldirasiz."
- **Fix B:** a light tint (`rgb(0 0 0 / .1)`, radius 4). This is clearer, but it breaks the "no fill" rule in `tokens.md`.
- **Why it matters:**
  - The "PDF varianti" link two rows below uses the same underline. Students will tap the placeholder.
  - Students also paste it unchanged, because nothing says to fill it in.
- **2.0 check:** passes. 2.0 shows the rule "[Qavslar] ichini oʻzingiz toʻldirasiz" on the lesson 2 library.

### #8 ⚠️ Slides pane: dead numbered rows + a label that repeats the tab
- **Fix:** remove the 4 topic rows, which repeat the lede.
  - The pane follows the other two: label "Slaydlar · video", the big "78" with its unit under it ("ta slayd, hammasi koʻrildi."), and the action "Qaytadan koʻrish ▶". The count appears once (re-audit: the first draft had "78" in the label and in the numeral).
  - For a lesson in progress, show "14/40" + "Davom etish · 14-slayd". **Size note:** five characters at the 120px phone numeral are about 340px, wider than the about 260px pane at 320, so a 5-character value needs a smaller numeral (about 72px).
- **Why it matters:** the rows have dividers and mono "01–04", so they look like tappable chapters or exercises 01–04, and they do nothing. "Koʻrildi" is said twice.
- **2.0 check:** passes. 2.0 has slideCount + kind. The spec removes the topic chips.

### #9 ⚠️ "Promptlar varaqasi · P1–P8, Q1–Q5 · PDF" on the lesson hero (ux-audit H5.5, unfixed)
- **Fix:** remove it from the hero. On the Vazifa page it becomes a quiet "PDF varianti" link, like the exercise page has.
- **Why it matters:** it sits under "Amaliyotni davom ettirish", so it reads as the practice prompts. They are the homework's. "P1–P8, Q1–Q5" means nothing on first contact.
- **2.0 check:** in 2.0 this PDF belongs to Vazifa.

### #10 ❓ The outline "Bajarildi deb belgilash" pill looks like a status pill
- **Fix:** make it read as a toggle: a 22px square checkbox + "Bajarildi" (sentence case, 15px). Checked = a filled black square with ✓. It keeps the 44px hit area.
  - `tokens.md` already names "Mark-done = native checkbox, `accent-color: ink`" for prompt cards.
  - The same control everywhere a prompt is marked (re-audit: the #3 panel first showed the old chip as its fix, so the page proposed two different done marks).
- **Why it matters:** on home, the identical outline pill ("OCHIQ · 3/6 QADAM") is a label you cannot tap. One shape, two meanings.
- **2.0 check:** n/a. Marks are new in 3.0.

### #11 ❓ ☰ icon (phone) and a plain name (desktop) open the profile menu
- **Fix:** make the trigger say what it is: "Dilshod" + ⌄ on phones, "Dilshod Rahimov ⌄" on desktop. Both are 44px high. Drop ☰.
- **Why it matters:**
  - ☰ promises navigation, but the menu holds the ID, group, mentor, language and **Chiqish**.
  - On desktop the name looks like a label, so logout and language are hidden.
- **2.0 check:** passes. 2.0: "Logout from the name menu".

### #12 ❓ Tab fractions have no unit
- **Fix:** relabel "2/4" → "2/4 mashq" and "5/8" → "5/8 prompt". At 390 each tab is about 120px and "5/8 prompt" in 11px Martian is about 75px, so it fits.
- **Why it matters:** three bare fractions on one screen (2/4, 5/8, 3/6) measure three different things.
- **2.0 check:** n/a (progress is new in 3.0).

### #13 ❓ ↗ on cards that open pages inside the portal
- **Fix A (minimal, keeps the reference glyph):** keep ↗ on cards, and never use it for anything else.
- **Fix B:** use → (the glyph the pill, "Keyingi qadam" and the pane actions already use), and keep ↗ for what really leaves the portal: the lesson 4 book PDF and the prep links ("Claude dasturini yuklash" opens in a new tab).
- **Why it matters:** ↗ is the web's "opens outside" sign. Once internal cards use it, nothing is left to warn that the book or the prep links leave the site.
- **2.0 check:** passes either way. **Undecided:** this is the reference's signature, so it is the user's call.

### #14 ❓ The 0-dars card stays yellow after prep is done
- **Fix:** make real. Yellow while prep is unfinished ("Ochiq · 3/4 qadam"); grey once it is 4/4, with the same pill as done lesson 2: **"Bajarildi · 4/4 qadam"**.
  - Re-audit: the first draft kept "Tayyor · 4/4" on the grey card. That gave "done" two words on one screen ("Tayyor" next to lesson 2's "Bajarildi"), and the only fraction with no unit.
- **Why it matters:** yellow reads as "still to do" (and the taste profile says yellow = prep *or* you). A finished item in the warning colour makes the student look for what is missing.
- **2.0 check:** 2.0 had a prep chip "{date}gacha" that stopped mattering after the date.

### #15 ⚠️/🗑 Exercise lede says "upload the files" while step 1 says "read this"
- **Fix:** relabel the lede to the exercise's 2.0 `note` (what it produces).
  - The steps carry the order: "1 · Avval oʻqing", "2 · NotebookLMʼga yuklang", then the lilac list.
  - Remove "Keyin pastdagi promptlardan nusxa oling.", which repeats the lede.
- **Why it matters:** this is the M2 failure. The student uploads the brief into NotebookLM, and the answers start quoting it.
- **2.0 check:** passes once fixed (2.0 exercises have a `note`).

### #16 🗑 0-dars label and title repeat "tayyorgarlik", and there is no date
- **Fix:** relabel to match the other cards:
  - label "0-dars · 12-sentabrgacha";
  - title "Tayyorgarlik" (2.0 title);
  - subtitle "Kompyuter, Google, Claude, Visa karta".
- **Why it matters:** it is the only card whose title is the 2.0 subtitle and whose label has no date.
- **2.0 check:** 2.0: title "Tayyorgarlik", subtitle "Oʻrnatish va tayyorgarlik", chip "{date}gacha".

### #17 🗑 Locked card: the date twice
- **Fix:** relabel the label to "4-dars". The pill "🔒 3-oktabrda ochiladi" carries the date.
- **Why it matters:** "3-OKTABR" and "3-OKTABRDA OCHILADI" sit 12px apart.
- **2.0 check:** passes (2.0: the date on a locked lesson).

### #18 ❓ "Promptlar · 2 ta" hides what is done
- **Fix:** relabel to "Promptlar · 1 / 2 bajarildi" (ux-audit H2 proposed it, and it was not applied).
- **2.0 check:** n/a.

### #19 🗑 Lesson eyebrow "· ochiq" and "01-dars" vs "1-dars" (ux-audit L1/L2, unfixed)
- **Fix:**
  - The eyebrow becomes "← Dastur".
  - The headline becomes "1-dars / Kirish", with the date + "3/6 qadam" on one meta line.
- **Why it matters:** the same lesson is called "1-dars" on home and "01-dars" here, and "ochiq" tells you nothing on a page you are already on.

---

## Re-audit 2026-10-16 (proposals + current comp)

The same question, asked of every element in the proposed fixes on `comp/element-options.html`, and of the HOZIR panels against the comp after the latest fix round (short IDs, the 1440 solo cap, menu/popup/toast fixes).

### Stale (fixed in the comp since the first pass)
| Item | Status |
|---|---|
| G8 / #6, "AIP-" blocks short IDs | **Stale.** `XM` logs in on Enter/KIRISH. #6 is now only the placeholder. |
| Everything else in the fix list | Still present in the comp. The fix round did not touch it. |
| D38, the popup covers the ring at 390 | Still true in `?solo&view=dastur&newlesson` at 390 (re-shot). It is a layout note, not a fix-list item. |

### HOZIR panels vs the current comp
| Panel | Verdict |
|---|---|
| #3 | ⚠️ was wrong: P2 was missing its outline "Bajarildi deb belgilash" chip. Fixed. |
| #6 | ⚠️ caption was stale (the XM claim). Fixed. |
| #13–#17 cards | ❓ the locked card left out its "10 ta Hermes kartasi va kitob…" line. Added. |
| #5, #7, #8, #10, #11 | ✅ match the comp. |

### The proposals, element by element
| Panel | Element | Reads as | Verdict | Change |
|---|---|---|---|---|
| #3 | "Promptlar · 1 / 2 bajarildi" | 1 of 2 done | ✅ | |
| #3 | "P1" / "P2" numerals | the IDs the links use | ✅ | |
| #3 | done mark | | ⚠️ the fix used the old chip while #10 proposed a checkbox: two marks for one thing | Now the #10 checkbox |
| #3 | toast "P1 bajarildi · Bekor qilish" | | ✅ | |
| #5 | "1-dars · bajarilgan qadamlar" + "3/6" | progress with its unit | ✅ | |
| #5 | 3 link rows with → | 3 more "continue" buttons | 🗑 they repeated the tab actions ("Davom etish 01 · P3", "Vazifa · P6") in a second style | Now one plain line "Qoldi: Amaliyot 01, Amaliyot 04, Vazifa" (Amaliyot before Vazifa ✅) |
| #6 | the field without the prefix | | 🗑 dropping "AIP-" was only needed for short IDs, which now work | The prefix is back. Empty field + "Masalan: AIP-7KQ2XM" ✅ |
| #7 A | "[Qavslar] ichini oʻzingiz toʻldirasiz." + bold placeholder | fill this in | ✅ (2.0 wording) | |
| #7 B | tinted placeholder | could also read as "selected text" | ❓ still B | |
| #8 | label "78 ta slayd · video" + numeral "78" | | 🗑 the count twice | Label "Slaydlar · video", numeral "78", "ta slayd, hammasi koʻrildi." |
| #8 | tabs "2/4 mashq", "5/8 prompt" | | ✅ units; fits at 320 | |
| #10 | square checkbox + "Bajarildi" | a toggle | ✅ | |
| #11 | "Dilshod ⌄" | my menu | ✅; fits at 320 | |
| cards A/B | "Tayyor · 4/4" on the grey card | | ⚠️ "done" in two words on one screen, and no unit | "Bajarildi · 4/4 qadam" |
| cards A/B | "0-dars · 12-sentabrgacha" | | ❓ broke at the hyphen at 320 | The date is kept on one line; the panel is now real card width |
| cards A/B | "4-dars" + "🔒 3-oktabrda ochiladi" + the book line | | ✅ Kitob only in lesson 4 ✅ | |

No proposal mentions Telegram. None reorders Amaliyot and Vazifa. No new chip looks tappable: the only pill-shaped things left on the fixes page are status pills on cards, and the toggle is a checkbox.

### The blank phone frames: cause
- **It is a capture artifact, not a page bug.**
  - Chrome's one-shot `--screenshot` captures the wrapper as soon as it loads.
  - The page is a cross-origin iframe (`file://` wrapper → `http://localhost:8765`), so it paints in its own process.
  - On the options page that frame was not yet presented at capture time, because two 1984×2400 `login-pin.webp` decodes delay its first paint. The magenta wrapper shows through.
- **Proof, over CDP with real time:**
  - At 300 ms the frame is magenta. At 1200 ms and later it is fully painted.
  - No console errors, no failed requests. Both images `complete`, `naturalWidth` 1984.
  - `--virtual-time-budget`, `--timeout` and switching off site isolation do not change the one-shot capture.
  - The same page loaded from a `file://` copy (same process) captures fine.
- **The real comp:** `index.html?solo` at 390 and 320 (gate, dastur, dars, ex, plus the popup) renders correctly over CDP, with no console errors. A phone browser keeps painting, so students would not see this.
- **A real side finding (performance, not meaning):** `login-pin.webp` (600 KB) is fetched on dastur, dars and ex too. The gate's `<img>` sits in a `display:none` screen, and hidden non-lazy images still download.
  - If production keeps one HTML shell (as 2.0 did), every cold load costs 600 KB on 3G, even for a signed-in student (ux-spec §3.4: "mid-range Android over 3G").
  - The JPG fallback is 1.38 MB.
  - Fix: render the gate photo only on the gate route (or set its `src` when the gate shows).
- **Capture method for later reviews:** use CDP `Page.captureScreenshot` after about 1.5 s, not `--screenshot`, for phone-width iframes with large images (`scratchpad/cdp.mjs`).

## Could not decide / for the user
1. **↗ (fix 13):** a meaning problem, but it is the reference's signature glyph. A and B are both shown in the options page.
2. **Grid + glow background:** it reads as nothing, so it does not mislead. But `taste-profile.md` "Never: … grids, glow" contradicts `tokens.md` "Project background (2026-10-16)". One of the two docs is stale.
3. **Placeholder style (fix 7):** A keeps the user's "no fill" rule. B is clearer but breaks it.
4. **The yellow result card (fix 5):** make it real (A) or remove it (B, as ux-audit H4 asked). The user kept it after H4, so A is recommended.
5. **The locked sheet (D37)** repeats the card. It is kept because deep links to a locked lesson need it. Tapping the card itself could do nothing; I left it as ✅.
