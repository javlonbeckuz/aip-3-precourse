# Redundancy audit: AI Praktikum 3.0 student prototype

- **Walked:** `AI-Praktikum-3.0-final.html` on 2026-10-17, all 45 routes from `ROUTES()` plus every folder tab, in headless Chrome over CDP.
- **Viewports:** 390×844 (mobile emulation) and 1440×900.
- **Progress states:**
  - Empty: `aip3.demo.v1 = {"t":{},"sl":{"1":0,"2":0,"3":0,"4":0},"u4":0}`.
  - The seeded demo.
- **Dates:**
  - `?today=2026-10-12`: everything open.
  - `?today=2026-09-05`: day 0, home and prep only.
  - `?today=2026-09-26`: lesson 3 live. Added because the live-lesson hero only renders on that date.
- **Trigger:** the user removed the lesson-page hero pill ("Boshlash: Slaydlar · 0 / 40") because "the buttons already exist on its window". This audit looks for every other case like it.
- **Not repeated:** anything `ux-pass-2.md` fixed. Where a finding touches an item that is still open there, it is cross-referenced.
- **Screenshots:** `C:/Users/User/AppData/Local/Temp/claude/C--Users-User-vs-code-HEAD-projects-praktikum3-precourse-platform/7b93abd2-e86f-4f93-b0fc-efc57770bbb1/scratchpad/redund/`, written below as `redund/…`.
  - Name pattern: `{m|d}-{empty|seed}-{MM-DD}_{route}.png`.
  - `_tabN` = that folder tab is open.
  - Full-page captures.
- **Counts:**
  - Characters = visible non-space text inside the page. Screen-reader-only text (for example the "Yuklab olish:" prefix on file rows) and the review bar are excluded.
  - Controls = visible `a[href]`, `button`, `summary`, `input` and tabs.
  - The "after" numbers were measured by applying the removals to the live DOM and recounting. They are not estimates.
- **Labels:**
  - **SAFE:** a pure duplicate. Removing it loses no information and no path.
  - **CHECK:** changes what a student sees, so the user decides.

---

## Ranked findings (by impact)

| # | Screen | Element | Where it duplicates | Recommendation | Mark | Screenshot |
|---|---|---|---|---|---|---|
| 1 | `#/dastur`, day 0 | Yellow prep hero card ("0-DARS · TAYYORGARLIK / 12-SENTABRGACHA / BIRINCHI DARSGACHA / 0/4 bajarildi") | **Same item twice:** the 0-dars folder card right below says "0-DARS · TAYYORGARLIK … 12-SENTABRGACHA · 0/4 QADAM". "Keyingi qadam" also goes to `#/dars/0`, so there are **3 links to one page** in one phone screen. **"0/4" appears 3 times with 3 meanings:** ring = lessons, hero = prep items "bajarildi", card = prep items "qadam". | **REMOVE** the hero before day 1. "Keyingi qadam · Tayyorgarlik · Kompyuter" stays as the single next action, and the folder card carries the deadline and count. (The alternative, keeping the hero and hiding card 0, breaks the 0–4 sequence.) | CHECK | `redund/m-empty-09-05_dastur.png`, `redund/m-seed-09-05_dastur.png` |
| 2 | `#/dastur`, lesson live (09-26) | Blue "HOZIR DAVOM ETMOQDA · 3-DARS · SKILL VA AGENTLAR · Slaydlar 14/40 · davom etish" hero | **Same item twice:** folder card 3 below repeats the title, the date and "HOZIR DAVOM ETMOQDA". It is also a **second, competing next action:** the hero points at lesson 3 slides, while "Keyingi qadam" right under it points at "1-dars · Amaliyot 01 · P3". | **REMOVE** the hero. Folder card 3 keeps "Hozir davom etmoqda", and "Keyingi qadam" is the one next step. If the user wants live first, do the opposite: keep the hero and let it *be* "Keyingi qadam" (one block, not two). | CHECK | `redund/m-empty-09-26_dastur.png`, `redund/d-seed-09-26_dastur.png` |
| 3 | Hermes cards with one prompt (01, 02, 03, 05, 06, 07, 09, 10) | "PROMPTLAR · 0/1 BAJARILDI" + the prompt's "Bajarildi deb belgilash" chip + the end toggle "Kartani bajarildi deb belgilash" | Three done signals for one prompt, and copy already marks it done. A counter that only goes from 0/1 to 1/1 says the same as the chip. | **REMOVE** the 0/1 counter on single-prompt cards. | SAFE | `redund/m-empty-10-12_dars_4_amaliyot_06.png` |
| 3b | Same cards | The per-prompt chip | The end toggle does the same job: either one makes the card count as done. | **REMOVE** the chip on single-prompt cards (cross-reference ux-pass-2 #4). | CHECK | same |
| 4 | Every sub-page header (`dl-h` meta line), including the lesson page | The meta line under the back link | It repeats the back label and the H1. See the table under the findings. | **SHORTEN** the meta to what is new: the count, the exercise number, "NotebookLM mashqi". Drop the tokens the back link or H1 already show. | SAFE | `redund/m-empty-10-12_dars_1.png`, `redund/m-empty-10-12_dars_1_vazifa.png`, `redund/d-seed-10-12_dars_4_kitob.png`, `redund/m-empty-10-12_dars_2_amaliyot.png` |
| 5 | `#/dars/n` Slaydlar pane | Pane label "SLAYDLAR · VIDEO / 0 / 78", or "14 / 40" when seeded | "SLAYDLAR" = the tab name. "VIDEO" and "78" = the pane foot "78 TA SLAYD · VIDEO". "14 / 40" = the button "Davom etish 14 / 40", so the same count shows twice in one pane. | **REMOVE** the pane label. | SAFE | `redund/m-empty-10-12_dars_1.png`, `redund/d-seed-09-26_dars_3.png` |
| 6 | Every screen with the nav, and the gate | Wordmark "AI PRAKTIKUM 3.0" is a link to `#/dastur` | The home circle beside it goes to the same place. On home, both link to the page you are on. On lesson pages, "← DASTUR" is a third link to the same place within 100px. On the gate, it links into the app from the login screen. | **Make the wordmark plain text.** The home circle stays. −1 control on every screen. | SAFE | `redund/m-empty-10-12_dars_1.png`, `redund/d-empty-10-12_kirish.png` |
| 7 | `#/dars/1–4` folder panes | Pane eyebrows "AMALIYOT · DARSDA QILINADI", "VAZIFA · UYDA", "AMALIYOT · KUTUBXONA", "AMALIYOT · HERMES AGENTI", "KITOB · 4-DARS" | The first word repeats the tab that is open right above it. "4-DARS" repeats the page H1. | **SHORTEN** to "Darsda qilinadi", "Uyda", "Kutubxona", "Hermes agenti", and the book title alone. | SAFE | `redund/m-empty-10-12_dars_1_tab1.png`, `redund/m-empty-10-12_dars_1_tab2.png`, `redund/d-seed-10-12_dars_4_tab1.png` |
| 8 | `#/dars/1` Vazifa pane, 0/8 done | Text link "VAZIFA SAHIFASI" next to the round button "Vazifani boshlash" | Both go to `#/dars/1/vazifa`. Two controls, one destination, in one pane. After the first prompt they differ: the button goes to the sheet `?p=P6`. | **REMOVE** the text link whenever the two targets are equal. Keep it once the button deep-links. | SAFE | `redund/m-empty-10-12_dars_1_tab2.png` |
| 9 | `#/dars/n` | The topic list | It shows up to 3 times on one screen: the subtitle "AI nima, modellar, Context, RAG, NotebookLM", then the lede, then the pane's middle line "AI nima · Modellar · Context · RAG · NotebookLM". After ux-pass-2 #6 the pane line is plain text, so it now only repeats the subtitle. | **REMOVE** the pane topic line. Subtitle and lede stay (both are 2.0 text). This leaves the pane's middle empty, which is a look change. | CHECK | `redund/m-empty-10-12_dars_1.png`, `redund/d-seed-09-26_dars_3.png` |
| 10 | Exercise pages, Vazifa sheet, Hermes cards | "Bajarildi deb belgilash" chip on every prompt: 8 on the sheet (13 with Q1–Q5 open), 2–4 per exercise | **The same label on every row.** Copy already marks the prompt done, with an undo toast. The 47 library prompts have no chip and work fine, which shows the chip is not needed. | **REMOVE** the per-prompt chip. Keep copy = done, the undo toast and the end-of-page toggle. Overlaps ux-pass-2 #4 / el #10, which are still open: removing the chip makes their 44px fix unnecessary. | CHECK | `redund/m-empty-10-12_dars_1_vazifa_promptlar.png`, `redund/m-empty-10-12_dars_1_amaliyot_01.png` |
| 11 | `#/dars/2`, `#/dars/3` Vazifa pane → `#/dars/n/vazifa` | The pane shows the full homework text under the title "ERKIN IJOD" | The text itself starts "Erkin ijod: …", repeating the title. The Vazifa page then repeats the same text word for word and adds only "Bajardim" plus one helper line. | **SHORTEN** the pane to the title + "Bajarilmagan" + the button, or move the "Bajardim" toggle into the pane. The `/vazifa` route stays either way (2.0 route). | CHECK | `redund/m-empty-10-12_dars_2_tab2.png`, `redund/m-empty-10-12_dars_2_vazifa.png` |
| 12 | `#/dars/4` Kitob pane → `#/dars/4/kitob` | Pane: book title + note + "Kitob sahifasi" | The Kitob page repeats the note again, under "4-DARS" / "4-DARS · KITOB" / "KITOB", then shows only 2 file rows. 2.0 had no book page: the book card opened the file (blueprint §2, `GET /lesson/4/book[?v=cyrl]`). | **MERGE:** put the two variant rows ("Lotin yozuvida" / "Кирилл ёзувида") in the pane and drop the page. This saves one tap and one screen. | CHECK | `redund/d-seed-10-12_dars_4_tab1.png`, `redund/d-seed-10-12_dars_4_kitob.png` |
| 13 | `#/dastur` progress ring | "KURS PROGRESSI" + "To'liq bajarilgan darslar" + (seeded) "✓ Tayyorgarlik" | Two labels for one number. "✓ Tayyorgarlik" repeats the prep card's "✓ BAJARILDI · 4/4 QADAM", which sits on the same screen. | **SHORTEN** to one label, "To'liq bajarilgan darslar", because it says what the number counts. **REMOVE** the ✓ Tayyorgarlik line. | SAFE | `redund/d-seed-10-12_dastur.png`, `redund/m-seed-09-05_dastur.png` |
| 14 | `#/dastur` locked cards (day 0, story date) | Eyebrow "1-DARS · 12-SENTABR" + note "🔒 12-SENTABRDA OCHILADI" | The date twice on every locked card. | **SHORTEN** the eyebrow on locked cards to "1-DARS". The lock note keeps the date. | SAFE | `redund/m-empty-09-05_dastur.png` |
| 15 | Hermes cards 01–10 | "Kalit, token va parolni hech qachon chatga yozmang." under every Natija | 2.0 has it once, as rule 4 on the Hermes index (also shown in 3.0). 3.0 repeats it on all 10 cards (`c.hermes.caution`), including cards with no secret involved (05, 06, 07, 08). | **SHORTEN** the scope: keep it on the index and on the cards that handle a key or token (02, 04, 09, 10). It is a safety line, hence CHECK. | CHECK | `redund/m-empty-10-12_dars_4_amaliyot_06.png` |
| 16 | Hermes cards | The big prompt numeral ("06") | It equals the card number already in the meta ("06 / 09"). Card 08 shows "08" on both of its prompts. It is **decoration that reads as data**, and it looks like an ID. | **REMOVE** it on Hermes cards, or number the prompts 1, 2 on card 08. | SAFE | `redund/m-empty-10-12_dars_4_amaliyot_06.png`, `redund/m-empty-10-12_dars_4_amaliyot_08.png` |
| 17 | Exercises 01–06, 03A, 03B | Helper "Keyin pastdagi promptlardan nusxa oling." (3.0 copy) | The lilac prompt list starts right below it, with "NUSXALASH" on each prompt. | **REMOVE.** | SAFE | `redund/m-empty-10-12_dars_1_amaliyot_01.png` |
| 18 | `#/dars/2` Amaliyot pane | Row numerals "01 / 12 / 21 / 33 / 40" | Each numeral equals the start of the range at the right ("12 Tanqidiy fikrlash 12–20"). The library page numbers the same sections 01–05, so the same thing is numbered two ways. | **REMOVE** the left numeral. The range stays. | SAFE | `redund/m-empty-10-12_dars_2_tab1.png` |
| 19 | `#/dars/2/amaliyot` section cards; section pages | Card: "01" + pill "01–11" + "0/11" + ↗. Section page meta "2-DARS · AMALIYOT · 01" | The section index and the prompt numbers share the same digits, so section "02" holds prompts 12–20. "11" is stated twice on one card. | **REMOVE** the section index numeral (card and meta). The range pill identifies the section. | CHECK | `redund/m-empty-10-12_dars_2_amaliyot.png`, `redund/m-empty-10-12_dars_2_amaliyot_02-tanqidiy-fikrlash.png` |
| 20 | `#/dars/1/amaliyot` | "qo'shimcha" tag on exercise 05 | The row already sits under the "QO'SHIMCHA" group heading. A tag pill that adds nothing there. | **REMOVE** it on this page. The lesson pane keeps it, because the pane has no groups. | SAFE | `redund/m-empty-10-12_dars_1_amaliyot.png` |
| 21 | `#/dars/1/vazifa` | Row "13 ta prompt / Promptlarni ochish · 0/8 asosiy prompt bajarildi". Row sub "Qo'llanmani yuklash · PDF · 25,7 KB" | "13" is already in the 2.0 note right above ("Mashqning o'n uchta prompti"). "Qo'llanmani yuklash" repeats the section heading "3 · TALABA QO'LLANMASI" and the download icon. | **SHORTEN** to the title "Promptlarni ochish", meta "0/8 asosiy bajarildi", and sub "PDF · 25,7 KB". | SAFE | `redund/m-empty-10-12_dars_1_vazifa.png` |
| 22 | `#/dars/4/amaliyot/04` | Empty state "BU KARTADA NUSXA OLINADIGAN PROMPT YO'Q" (3.0) | The 2.0 note heading above already says "Boshqaruv panelida (nusxa olish shart emas)". The note's first line also repeats "Boshqaruv panelida:". | **REMOVE** the empty-state line. | SAFE | `redund/m-empty-10-12_dars_4_amaliyot_04.png` |
| 23 | `#/dars/4/amaliyot` | Footnote "Qadamlar tavsiya etiladi, majburiy emas: sinfda oldinroq ketgan bo'lishingiz mumkin." (3.0) | It contradicts 2.0 rule 1 on the same page: "Kartalarni tartib bilan bajaring — har biri oldingisiga tayanadi." | **REMOVE.** | CHECK | `redund/m-empty-10-12_dars_4_amaliyot.png` |
| 24 | `#/dars/2/vazifa`, `#/dars/3/vazifa` | Helper "Yuborish yo'q: bajarganingizdan keyin "Bajardim" deb belgilang." (3.0) | It names the button directly below it. | **SHORTEN** to "Yuborish shart emas." | SAFE | `redund/m-empty-10-12_dars_2_vazifa.png` |
| 25 | `#/dars/1/vazifa`, `#/dars/4/kitob` | "NAMUNA" pill + "namuna fayl" in the meta | The sample marker shows twice per row. | **REMOVE** the text and keep the pill. Prototype only. | SAFE | `redund/m-empty-10-12_dars_1_vazifa.png`, `redund/d-seed-10-12_dars_4_kitob.png` |

### #4 in detail: meta lines that repeat the back link and the H1
| Screen | Back link | Meta now | H1 | Meta after |
|---|---|---|---|---|
| `#/dars/1` (all lessons) | ← DASTUR | 1-DARS · 12-SENTABR · 0/6 QADAM | 1-DARS / KIRISH | 12-SENTABR · 0/6 QADAM |
| `#/dars/1/vazifa` | ← 1-DARS | 1-DARS · VAZIFA · NOTEBOOKLM MASHQI | VAZIFA | NOTEBOOKLM MASHQI |
| `#/dars/1/vazifa/promptlar` | ← VAZIFA | 1-DARS · VAZIFA · NOTEBOOKLM MASHQI — RAVON UY | PROMPTLAR | RAVON UY |
| `#/dars/1/amaliyot` | ← 1-DARS | 1-DARS · AMALIYOT · 0/4 ASOSIY MASHQ BAJARILDI | KORXONA BILIMINI… | AMALIYOT · 0/4 ASOSIY MASHQ BAJARILDI |
| `#/dars/1/amaliyot/01` | ← AMALIYOT | 1-DARS · AMALIYOT · 01 | YANGI XODIMGA TAYANCH | MASHQ 01 |
| `#/dars/2/amaliyot` | ← 2-DARS | 2-DARS · AMALIYOT · PROMPT KUTUBXONASI | PROMPT KUTUBXONASI | AMALIYOT |
| `#/dars/2/amaliyot/{sect}` | ← BO'LIMLAR | 2-DARS · AMALIYOT · 01 | BIZNES G'OYALAR | PROMPTLAR 1–11 |
| `#/dars/n/vazifa` (2, 3) | ← 2-DARS | 2-DARS · VAZIFA | VAZIFA | (remove the line) |
| `#/dars/4/kitob` | ← 4-DARS | 4-DARS · KITOB | KITOB | (remove the line, or the page, see #12) |
| `#/dars/0` | ← DASTUR | 0-DARS · TAYYORGARLIK · 0/4 BAJARILDI | BIRINCHI DARSGACHA | TAYYORGARLIK · 0/4 BAJARILDI |

---

## Checked and kept (with the reason)
- **End-of-page pills that equal the back link:** "Amaliyot sahifasi" (ex 06), "Kartalar sahifasi" (card 10), "Bo'limlar ro'yxati" (section 05), and "Darsga qaytish" next to "Yopish" on the last slide. They were added by ux-pass-2 #5 because the nav is static and these pages run 2,000–4,300px at 390. The duplicate is deliberate.
- **"OCHIQ" on every open home card:** it is 2.0's state chip ("Ochiq"), which is in the parity list (blueprint §7, lesson states).
- **"← DASTUR" on lesson pages:** keeps one back pattern on every inner page. Only the wordmark link goes (#6).
- **Prep pictures with "5 GB" and "$20":** they look like data, but they are real values from the item notes and a user override (`prep-options.md`). They are not fake data.
- **"[Qavslar] ichini o'zingiz to'ldirasiz." on each library section:** sections are reachable straight from the lesson pane, which skips the index rules.
- **"Sakkizta prompt, birma-bir."** (sheet) and the Natija lines (Hermes index): 2.0 text.
- **↗ on internal cards:** still the user's call (element-audit #13), not re-judged.

## Found on the walk, not redundancy
- At `?today=2026-10-12` the home prep card still reads "12-SENTABRGACHA". The prep lede still says "Birinchi dars 12-sentabr. Shu ro'yxatni o'shangacha tayyorlab qo'ying", a month after lesson 1. Once lesson 1 has started, the deadline wording should flip, for example to "BAJARILDI" or "0/4 qadam" with no "gacha".
- No console errors on any route, in any of the 7 crawl configurations.

---

## Before / after: the 5 worst screens (390, measured)
"After SAFE" applies only the SAFE rows for that screen. "After all" also applies its CHECK rows.

| Screen | State | Before | After SAFE | After all | What changes |
|---|---|---|---|---|---|
| A · `#/dastur` day 0 | empty, 09-05 | 599 chars · 10 controls | 544 · 9 | **481 · 8** (−20% text, −2 controls) | #6, #13, #14 SAFE; #1 CHECK. Links to `#/dars/0`: 3 → 2. "0/4" on screen: 3 → 2. |
| B · `#/dastur` live lesson | seed, 09-26 | 502 · 10 | 477 · 9 | **404 · 8** (−20%, −2) | #6, #13 SAFE; #2 CHECK. Lesson 3 is listed once, and there is one next action instead of two. |
| C · `#/dars/1` (each tab view) | empty, 10-12 | Slaydlar 317 · 8 / Amaliyot 492 · 14 / Vazifa 326 · 9 | 292 · 7 / 476 · 13 / 298 · 7 | **254 · 7** / 476 · 13 / 298 · 7 | #4, #5, #6, #7, #8 SAFE; #9 CHECK. Slide count 2 → 1, topic list 3 → 2, "1-DARS" 2 → 1, Vazifa pane 2 links → 1. |
| D · Hermes card 06 (same for 8 of 10 cards) | empty, 10-12 | 767 · 8 | 743 · 7 | **678 · 6** (−12%, −2) | #3, #6, #16 SAFE; #3b, #15 CHECK. Done signals for one prompt: 3 → 1. |
| E · Exercise 01 (same pattern on all 7 exercise pages with prompts) | empty, 10-12 | 2,313 · 18 | 2,266 · 17 | **2,182 · 13** (−6% text, **−28% controls**) | #4, #6, #17 SAFE; #10 CHECK. The text is mostly 2.0 prompts, which stay. The gain is in controls. |

**Platform-wide:**
- #6 removes 1 control from all ~50 screens.
- #10 removes 41 chips: 18 on the 7 exercise pages, 13 on the Vazifa sheet (with Q1–Q5) and 10 on the 9 Hermes cards that have prompts.
- #3 removes 8 counters.
