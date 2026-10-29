# UX audit: flows, information architecture and microcopy (2026-10-19)

- **Walked:** `AI-Praktikum-3.0-final.html` over file://, headless Chrome via `cdp_sc.mjs`.
- **Persona:** a 45-year-old business owner, first visit, on a phone. Every tap was counted.
- **Coverage:**
  - All 42 crawl routes from `ROUTES()` at 390×844 (mobile emulation), 1024×768 and 1440×900.
  - Dates: `?today=2026-10-12` (all open), `2026-09-05` (day 0), `2026-09-12` (lesson 1 live) and `2026-09-26` (lesson 3 live).
  - Progress: empty (`aip3.demo.v1` reset), plus the seeded demo.
- **Interactive walks:**
  - Gate errors and login.
  - Menu, language switch and logout.
  - Prep ticking through to 4/4.
  - All lesson tabs.
  - Copy, undo, and a forced copy failure.
  - Library search, including the empty state.
  - Hermes cards, the slides, a 404 and a locked deep link.
- **Console:** no errors on any route in any of the 8 crawl configurations.
- **Screenshots:** `C:/Users/User/AppData/Local/Temp/claude/C--Users-User-vs-code-HEAD-projects-praktikum3-precourse-platform/7b93abd2-e86f-4f93-b0fc-efc57770bbb1/scratchpad/audit5/ux/`, written below as `ux/…`.
  - `m-` / `t-` / `d-` = 390 / 1024 / 1440.
  - `-open` / `-day0` / `-live` / `-seed` = the date or progress state.
  - `mw-` / `mc-` = interactive walk shots.
- **Not repeated:** anything `ux-pass-2.md` or `redundancy-audit.md` already fixed or proposed. These are fixed in the build and were re-checked:
  - popup scope
  - `?p=` deep links
  - "Slaydlarni koʻrish"
  - the end pills on the slides and the sheet
  - the gate "Masalan" line
  - prep step counts
  - the per-prompt chips removed
  - the Hermes 04 steps shown as a list
- **No new screens or flows.** Every fix reuses an existing pattern: `nextBlock` pill, `pc-lk` external link, `flashToast`, `?tab=` or `vz1.zip` bundle row.
- **Tags:**
  - **SAFE** = usability only.
  - **LOOK** = changes what the screen looks like, so the user decides.

---

## Critical

### 1 · A raw translation key is on screen: "⟦HC.NO_PROMPTS⟧" · `#/dars/4/amaliyot/04`
- **What:** the lilac prompt section of Hermes card 04 shows `⟦HC.NO_PROMPTS⟧` at 390, 1024 and 1440, in all three languages. It is the only text in that section.
- **Cause:** `redundancy-audit #22` deleted the `hc.no_prompts` string, but `proto_app.js:469` still renders `T('hc.no_prompts')` when a card has no prompts.
- **Why it matters:** this is the card where students juggle phone, laptop and the Hermes panel. A broken code string tells them the portal is broken, right at the hardest step.
- **Fix:** in the `h.prompts.length ? … : …` else branch, render nothing (an empty string). The note heading above already says "Boshqaruv panelida (nusxa olish shart emas)". Also add a build check: fail on any `⟦` in the rendered text of all routes. `i18n_check.py` only checks the JSON files, not the keys the code calls.
- **Shots:** `ux/mc-H04-rawkey.png`, `ux/d-open_dars_4_amaliyot_04.png`
- **Tag:** SAFE

## High

### 2 · The portal never links to NotebookLM, and deep links skip the "new notebook" rule · exercise pages, `#/dars/1/vazifa`, the sheet
- **What:**
  - Grepping every URL in the file finds 0 links to notebooklm.google.com.
  - Yet 7 exercise pages ("2 · NotebookLMʼga yuklang"), the Vazifa page and the prompt sheet all tell the student to upload to NotebookLM or paste into it.
  - The setup rules ("Har mashq uchun alohida notebook oching. Faqat oʻsha mashqning … fayllarini yuklang.") exist only on `#/dars/1/amaliyot`. "Keyingi qadam" goes straight to `#/dars/1/amaliyot/01`, so a first-timer never sees them.
- **Why it matters:**
  - This is the core job of lesson 1.
  - A non-technical owner has to leave the portal, open a new tab and know the address (about 3 actions). Students who reuse one notebook for every exercise mix sources and get wrong answers.
- **Fix:**
  - Under the "2 · NotebookLMʼga yuklang" heading, add the hint line and an external link in the prep card's `pc-lk` style (an existing pattern):
    - Hint: **"Yangi notebook oching va faqat shu fayllarni yuklang."**
    - Link: **"NotebookLMʼni ochish ↗"** → https://notebooklm.google.com
  - On the Vazifa page under "1 · Manbalar", add the same link.
  - On the library rules (lesson 2, "Claude ichiga joylang"), add **"Claudeʼni ochish ↗"** → https://claude.ai.
- **Shots:** `ux/m-open_dars_1_amaliyot_01.png`, `ux/m-open_dars_1_vazifa.png`, `ux/t-open_dars_1_amaliyot_01.png`
- **Tag:** SAFE

### 3 · Library: 40 of 47 prompts have [brackets] the student never sees before copying · `#/dars/2/amaliyot/{section}`
- **What:**
  - Measured: 40 of 47 prompts contain `[…]` placeholders.
  - Every prompt is collapsed to its title plus a small "+", and the copy button works on the collapsed row.
  - After copying, the toast says only "01 bajarildi". The clipboard holds "[Soha]dagi korxonalar hozir…".
  - The one reminder ("[Qavslar] ichini oʻzingiz toʻldirasiz.") sits at the top of the section, above the fold of the list.
- **Why it matters:**
  - The owner pastes "[Soha]" into Claude unfilled and gets a generic answer.
  - The library is the part they will reuse after the course. Copy = done also marks it done, so the failure is invisible.
- **Fix:**
  - **SAFE:** for prompts whose text contains `[`, the copy toast reads **"01 nusxalandi. Claudeʼda [qavslar]ni oʻz maʼlumotingiz bilan almashtiring."** It keeps "Bekor qilish", and the toast stays 5 s.
  - **LOOK:** under each collapsed title, add one mono line listing the fields: **"Toʻldiring: [Soha]"**. The student then sees the fields without expanding.
- **Shots:** `ux/mw-G5-sect.png`, `ux/mc-G7-lib-copied.png`, `ux/mw-G2-search.png`
- **Tag:** SAFE (+ LOOK option)

### 4 · On lesson day the "now" card does not take you to today's work · `#/dastur` at 09-12 and 09-26
- **What:**
  - **Lesson 3 day:** right after login, the 390 home stacks three blocks:
    - the popup "Yangi dars ochildi → Darsni ochish" (lesson 3);
    - the blue hero "Slaydlar · 40 ta · boshlash" (lesson 3);
    - "Keyingi qadam · 1-dars · Amaliyot 01 · P1" (lesson 1).
    These are three "next" signals pointing two different ways.
  - The hero's sub-line promises "boshlash" (start), but the hero opens the lesson page, not the slides: +1 tap.
  - **Lesson 1 day:** the in-class job is Amaliyot 01, yet the hero says "Slaydlar · 78 ta · boshlash" and the lesson page opens on SLAYDLAR. Reaching exercise 01 takes **3 taps** (hero → AMALIYOT tab → 01).
  - `nextStep()` skips the live lesson on purpose ("the live lesson is the hero card"), but the hero does not carry that lesson's next step.
- **Why it matters:** the student is sitting in class, the mentor says "open exercise 1", and the biggest button on the phone points elsewhere.
- **Fix:**
  - The hero's sub-line and link use `nextOf(live)`, the same logic as "Keyingi qadam":
    - **"Mashq 01 · P1 Birinchi hafta rejasi"** → `#/dars/1/amaliyot/01`;
    - or, for a slides-only lesson, **"Slaydlar · 14 / 40 · davom etish"** → `#/dars/3/slayd/14`.
  - When a live lesson exists, the block below is relabelled from "Keyingi qadam" to **"Qolib ketgan ish"**, so it reads as backlog, not as today. Add `next.k_backlog = "Qolib ketgan ish"`.
  - The popup stays (it is already marked seen once lesson 3 opens).
- **Shots:** `ux/mw-A6-landed-live.png`, `ux/m-live_dastur.png`, `ux/d-live_dastur.png`, `ux/mc-L1-home-0912.png`, `ux/mc-L2-dars1-0912.png`
- **Tag:** SAFE (copy + link; the hero looks the same)

## Medium

### 5 · Lesson pages always open on SLAYDLAR, even when the work is elsewhere · `#/dars/1–3`
- **What:**
  - With no `?tab=`, every lesson opens on its first tab. That is SLAYDLAR for lessons 1–3, at all sizes.
  - At 1440 that tab is a 557px lilac pane holding one button.
  - A student coming back for homework or practice taps the card, then a tab: 2 taps where 1 would do.
  - `?tab=sl|am|vz|kt` already works.
- **Why it matters:** the page should open on "what's next" (taste intent #3), not on the material that is already shown in class.
- **Fix:** when there is no `?tab`, `lessonPage(n)` selects the tab that holds `nextOf(n)`'s unit. It falls back to tab 0 when the lesson is done.
- **Shots:** `ux/m-open_dars_1.png`, `ux/d-open_dars_1.png`, `ux/m-open_dars_2.png`
- **Tag:** SAFE

### 6 · "qadam" means four different things, and the "0/6" is never explained · home cards, `#/dars/0`, lesson meta
- **What:**
  - "Keyingi qadam" = the next action.
  - Lesson cards "OCHIQ · 0/6 QADAM" = slides + 4 core exercises + Vazifa. Those 6 are listed nowhere, and the tabs show only ✓.
  - The prep card says "OCHIQ · 0/4 QADAM", but the prep page header says "0/4 BAJARILDI" for the same 4 items.
  - Inside prep item 02, "4 ta qadam" means the sub-steps.
  - Prep's screen-reader text says "4/4 tayyor": a fifth word.
- **Why it matters:** a student who sees "0/4 qadam" on the card and then "4 ta qadam" inside one item reads it as 16 steps. Progress is the new 3.0 feature, and it reads as noise.
- **Fix (copy):** keep "qadam" only for "Keyingi qadam" and the prep sub-steps ("4 ta qadam").
  - `note.open` → **"Ochiq · {d}/{t} bajarildi"**.
  - `note.prep_todo` → **"{until} · {d}/4 bajarildi"**.
  - `lesson.meta` → **"{date} · {d}/{t} bajarildi"**.
  - `live.prep_done` → **"{title} bajarildi · {d}/4"**.
  - On the lesson page, add one plain line under the meta that names the units: **"Slaydlar, 4 ta mashq va vazifa"**. It is per lesson and built from `L.parts`.
- **Shots:** `ux/m-open_dastur.png`, `ux/m-open_dars_0.png`, `ux/mc-C5-prep-alldone-end.png`
- **Tag:** SAFE

### 7 · One exercise, three names, and the homework is called "mashq" too · home, lesson panes, `#/dars/1/vazifa/promptlar`
- **What:**
  - "Keyingi qadam" and the hero say **"Amaliyot 01 · P1"**, while the page it opens says **"MASHQ 01"** and the lesson pane row says "01 Yangi xodimga tayanch".
  - The picker meta still says "1-DARS · AMALIYOT · 03", where its siblings say "MASHQ 0x".
  - The Vazifa sheet calls P1–P8 **"ASOSIY MASHQ · 0/8"**, which collides with "Asosiy mashqlar" (core exercises 01–04) one tab over.
- **Why it matters:** the glossary says Mashq = exercise and Amaliyot = the tab. Mixing them makes "Amaliyot 01" look like a different place from "Mashq 01".
- **Fix (copy):**
  - `next.ex_prompt` → **"Mashq {num} · {pid} {title}"**.
  - `next.ex` → **"Mashq {num}"**.
  - `next.pick` → **"Mashq 03 · {num} {title}"**.
  - `pick.meta` → **"Mashq 03"**.
  - `vz1.sheet.k` → **"Asosiy promptlar · {d}/{t} bajarildi"**.
- **Shots:** `ux/m-open_dastur.png`, `ux/m-open_dars_1_amaliyot_01.png`, `ux/t-open_dars_1_vazifa_promptlar.png`, `ux/mw-E3-pick.png`
- **Tag:** SAFE

### 8 · Deep pages lose the lesson, and the only back path is a 17px-tall link · exercises, Hermes cards, sheet, library sections
- **What:**
  - Arriving from "Keyingi qadam", exercise 01 shows "← AMALIYOT / MASHQ 01" and Hermes 04 shows "← AMALIYOT / 04 / 09". "1-dars" / "4-dars" appears nowhere above the fold.
  - The back link is **90×17 px** at 390 on every sub-page.
  - The nav is static, so on a 3,108px exercise page this link is the only way out until the end pill.
- **Why it matters:**
  - "Where am I?" fails on the pages students reach most.
  - A 17px target is hard for an older thumb (WCAG 2.5.8 asks for 24px; this is the primary back path).
- **Fix:**
  - **Back labels:** **"1-dars · Amaliyot"**, **"1-dars · Vazifa"**, **"2-dars · Kutubxona"** (library sections, instead of "Boʻlimlar") and **"4-dars · Hermes kartalari"**.
  - **Hit area:** a 44px hit area on `.dl-h a.eyebrow`, made with padding plus a negative margin, so nothing visibly changes.
- **Shots:** `ux/m-open_dars_1_amaliyot_01.png`, `ux/m-open_dars_4_amaliyot_04.png`, `ux/mw-G5-sect.png`
- **Tag:** SAFE

### 9 · Finishing prep has no ending: no message, no next step, a 1,700px scroll back · `#/dars/0`
- **What:**
  - After the 4th tick, the page shows 4 ticked cards and stops. The only feedback is screen-reader text ("Visa karta bajarildi · 4/4 tayyor").
  - Nothing visible says "you're ready", and nothing offers a way back except scrolling up about 1,700px to "← DASTUR".
  - Exercises, Hermes cards, slides and the sheet all end with a `nextBlock` pill. Prep is the only list without one.
- **Why it matters:** prep is the first thing a new student finishes. By the peak-end rule, this is the moment that should feel like a win, and right now it fizzles.
- **Fix:** at 4/4, append the existing `nextBlock` under the last card:
  - text: **"Tayyorsiz. Birinchi dars 12-sentabr."** (after day 1: **"Tayyorgarlik tugadi."**);
  - pill: **"Dasturga qaytish"** → `#/dastur`.
- **Shots:** `ux/mc-C5-prep-alldone-end.png`, `ux/mc-C4-prep-alldone.png`
- **Tag:** SAFE

### 10 · After day 1, unfinished prep is never suggested, and its title contradicts its text · `#/dastur`, `#/dars/0` at 10-12
- **What:**
  - Once the course has started, `nextStep()` scans only lessons 1–4. With prep at 0/4, "Keyingi qadam" sends the student to "1-dars · Amaliyot 01 · P1", which needs a Google account (prep item 02) and NotebookLM.
  - The prep page still has the H1 **"BIRINCHI DARSGACHA"** (before the first lesson) directly above "Birinchi dars 12-sentabr kuni boʻldi" (the first lesson took place).
- **Why it matters:** latecomers and no-shows are exactly the students who skipped prep, and the portal walks them into a wall.
- **Fix:**
  - If prep item 02 (Google) or 03 (Claude) is unticked, "Keyingi qadam" = **"Tayyorgarlik · Google akkaunt"** → `#/dars/0`.
  - After `courseStarted()`, `prep.title` becomes **"Tayyorgarlik"**.
- **Shots:** `ux/m-open_dastur.png`, `ux/m-open_dars_0.png`
- **Tag:** SAFE

### 11 · Gate: an incomplete ID is reported as "not found", and the help line never says where the ID is · `#/kirish`
- **What:**
  - Typing 3 characters and tapping KIRISH shows **"Bu ID topilmadi. Xabardagi IDʼni toʻliq yozing."** The ID is not unknown, it is incomplete.
  - The precise message `gate.err.short` ("Yana {n} ta belgi kiriting.") only fires below 2 characters.
  - Before typing, the help line says only "Masalan: AIP-7KQ2XM".
- **Why it matters:** "topilmadi" tells a first-timer their ID is wrong, so they message the mentor instead of typing 3 more characters.
- **Fix (copy + logic):**
  - For 2–5 characters that are not a known short ID: **"ID 6 ta belgidan iborat. Yana {n} ta belgi yozing."**
  - `gate.help` → **"ID roʻyxatdan oʻtganingizda kelgan xabarda. Masalan: AIP-7KQ2XM"**.
- **Shots:** `ux/mw-A2b-short-submit.png`, `ux/m-open_kirish.png`
- **Tag:** SAFE

### 12 · A failed copy is silent · every prompt list
- **What:** I forced the clipboard and the `execCommand` fallback to fail.
  - The button label stays "NUSXALASH" and no toast appears.
  - The only feedback is the screen-reader line "Nusxa olinmadi. Matnni qoʻlda belgilang.".
  - This happens for real in some in-app browsers on iOS.
- **Why it matters:**
  - The student taps, pastes into NotebookLM and gets nothing, or the previous clipboard.
  - Copy = done also means nothing gets marked. The student has no clue why.
- **Fix:** on failure, call `flashToast` with **"Nusxa olinmadi. Matnni bosib turing va «Nusxalash»ni tanlang."** and keep the `#live` text.
- **Shot:** `ux/mc-E4-copy-failed.png`
- **Tag:** SAFE

### 13 · Downloads: different files with the same name, a raw file name as a label, no "download all" on exercises · exercise pages, `#/dars/1/vazifa`, `#/dars/1/amaliyot`, `#/dars/0`
- **What:**
  - The brief on 6 exercises is in every case **"01_Yoriqnoma.pdf"**.
  - There are two different files both named **"Talaba_qollanmasi.pdf"**: Vazifa 25,7 KB and Amaliyot 37,4 KB.
  - In Downloads these become "01_Yoriqnoma (3).pdf", and the student cannot tell them apart when uploading.
  - The prep row's visible name is **"prep-uz.pdf"**.
  - Exercises with 2–5 sources have no bundle row. The Vazifa page has one ("Hammasini yuklash · ZIP").
- **Why it matters:** uploading the wrong brief or source into a notebook is the most likely silent error in lesson 1.
- **Fix:**
  - The server sends unique download names (Content-Disposition), for example "1-dars_Mashq-01_Yoriqnoma.pdf" and "1-dars_Vazifa_Talaba_qollanmasi.pdf". The visible names stay, because the prompts cite them.
  - The prep row name becomes **"Tayyorgarlik qoʻllanmasi"**, with "prep-uz.pdf" moved into the meta.
  - Exercises with 2 or more sources get the existing `vz1.zip` row, **"Hammasini yuklash"**, at the end of group 2.
- **Shots:** `ux/m-open_dars_1_amaliyot_01.png`, `ux/m-open_dars_1_amaliyot_02.png`, `ux/m-open_dars_0.png`
- **Tag:** SAFE

## Low

### 14 · Three spellings of "source" and two of "to NotebookLM" · Vazifa page, sheet
- **What:** the 3.0 UI strings mix the forms:
  - `vz1.g1` "1 · **Manbaalar**";
  - `vz1.g1_note` "**manbaa** sifatida";
  - `vz1.lede` "**manbalarni**";
  - `lbl.manba` "**Manba:**".
  - "NotebookLM **ga**" (`vz1.g1_note`, `vz1.g2_note`, `vz1.sheet.lede`) sits next to "NotebookLM**ʼga**" (`ex.g2`).
  - "claude.ai **da**" in `prep.2.note`.
- **Fix (copy):** use **"1 · Manbalar"**, **"manba sifatida"**, **"NotebookLMʼga"** and **"claude.aiʼda"**. The 2.0 sheet rules ("manbaa", "Manbaalar papkasidagi") go to the content owner. The zip keeps its file name.
- **Shots:** `ux/m-open_dars_1_vazifa.png`, `ux/t-open_dars_1_vazifa_promptlar.png`
- **Tag:** SAFE

### 15 · "Vazifa" means homework, but the library uses it for "your task" · `#/dars/2/amaliyot`
- **What:** `lib.lede` says "Vazifangizga mos boʻlimni oching." on lesson 2, which has its own VAZIFA tab (Erkin ijod).
- **Fix:** `lib.lede` → **"47 ta tayyor prompt, 5 boʻlimda. Ishingizga mos boʻlimni tanlang."**
- **Shot:** `ux/mw-G2-search.png`
- **Tag:** SAFE

### 16 · The Vazifa page says 13 prompts, the counter says 8 · `#/dars/1/vazifa`, lesson 1 Vazifa pane
- **What:** "Mashqning oʻn uchta prompti" sits right above "0/8 asosiy bajarildi". The pane shows a giant "0/8".
- **Fix:** `vz1.g2_note` → **"8 ta asosiy va 5 ta qoʻshimcha prompt. Har birini nusxalab, NotebookLMʼga qoʻyasiz."**
- **Shots:** `ux/mc-V1-vazifa-13v8.png`, `ux/mw-D2-l1-vz.png`
- **Tag:** SAFE

### 17 · Lesson 2 asks the student to tick "I finished the library" with no criterion · `#/dars/2?tab=am`, `#/dars/2/amaliyot`
- **What:** lesson 2 progress (0/3) needs the manual checkbox "Amaliyotni yakunladim" ("Amaliyot: bajarilmagan") on a 47-prompt reference library. No one ever "finishes" a library, so the lesson can stay at 2/3 forever.
- **Fix:** Lesson 2 Amaliyot counts as done once any library prompt has been copied. This extends the "copy = done" decision from prompts to the library unit, and the checkbox goes. If the checkbox stays, relabel it **"Kutubxonadan foydalandim"**.
- **Shots:** `ux/mw-D3-l2-am.png`, `ux/m-open_dars_2_amaliyot.png`
- **Tag:** SAFE

### 18 · Six wordings for the same "done" checkbox · prep, exercises, Hermes, Vazifa 2/3, library, slides
- **What:** the same checkbox pattern carries six labels:
  - "Bajarildi deb belgilash" (prep)
  - "Mashqni bajarildi deb belgilash" (31 characters)
  - "Kartani bajarildi deb belgilash"
  - "Bajardim"
  - "Amaliyotni yakunladim" / "Amaliyot yakunlandi"
  - "Koʻrildi"
- **Fix:** a checkbox already shows the state, so use one constant state label:
  - **"Bajarildi"** for prep items;
  - **"Mashq bajarildi"**;
  - **"Karta bajarildi"**;
  - **"Vazifa bajarildi"**.

  "Koʻrildi" stays for slides, because viewing is a different act.
- **Shots:** `ux/mw-E2-ex01-end.png`, `ux/mc-V2-bajardim-off.png`, `ux/mc-C5-prep-alldone-end.png`
- **Tag:** SAFE

### 19 · 2.0 lines that can cause a wrong action (for the content owner) · lesson ledes, sheet rule 3, exercise 01 P4
- **What:**
  - **Lesson 3 lede:** "Amaliyot: build va deployment", but lesson 3 has no AMALIYOT tab.
  - **Lesson 2 lede:** promises "vebsayt, lead forma, Telegram bot", while its Amaliyot is a prompt library.
  - **Sheet rule 3:** "…kerakli manbaalarni belgilang, qolganini **oʻchiring**". Here "oʻchiring" also means *delete*, and deleted sources must be uploaded again.
  - **Exercise 01 P4:** the target reads "Qayerga: Chat / **zaxira**".
- **Fix (content, the text stays Uzbek):**
  - Sheet rule 3: **"…kerakli manbalarni belgilang, qolganlarining belgisini olib tashlang (oʻchirmang)."**
  - Exercise 01 P4 target: **"Chat (Studio ishlamasa)"**.
  - Ledes: confirm with the mentor whether 3.0 keeps these practices.
- **Shots:** `ux/m-live_dars_3.png`, `ux/mw-D4-l2-vz.png`, `ux/t-open_dars_1_vazifa_promptlar.png`
- **Tag:** SAFE (content edit)

### 20 · Language and logout: the menu behaves differently by size, and the desktop trigger has no affordance · all screens
- **What:**
  - On a phone, picking RU in the ☰ menu leaves the menu open (3 taps: ☰, RU, close). On desktop the same action closes it.
  - Because the nav is static, both language and Chiqish need a scroll to the top on long pages first (exercise 3,108px, sheet 4,188px).
  - At 1024 and 1440, the menu trigger is a bare "Student" that reads as a label.
- **Fix:**
  - **SAFE:** close the menu after a language is chosen, at every size (the whole page visibly switches).
  - **LOOK (small):** add **"⌄"** after the name on desktop. ☰ stays on the phone.
- **Shots:** `ux/mw-B1-menu.png`, `ux/mw-B2-ru-menu.png`, `ux/d-open_dastur.png`
- **Tag:** SAFE + LOOK

---

## Jobs: taps today → after the fixes (390, first-time student)
Taps are in-app taps. External work (NotebookLM upload, account creation) is not counted. Opening NotebookLM without a link is counted as 3: new tab, type the address, go.

| Job | Route walked | Taps today | After fixes | Fixes |
|---|---|---|---|---|
| First login | field → type 6 chars (auto-submit) | 1 (+6 keys) | 1 (+6 keys); incomplete IDs now say what's missing | #11 |
| Finishing prep (day 0) | Keyingi qadam → 4 ticks → 2 external links → home | 8 + ~1,700px scroll back | 8, no scroll; a visible "Tayyorsiz" end | #9, #10 |
| Starting today's lesson (lesson-1 day, first exercise) | hero → AMALIYOT tab → 01 | 3 | 1 | #4, #5 |
| Starting today's lesson (lesson-3 day, slides) | hero → "Slaydlarni koʻrish" | 2 | 1 | #4 |
| Vazifa + prompt sheet (home → P1 pasted into NotebookLM) | card → VAZIFA tab → Vazifani boshlash → zip → Promptlarni ochish → copy P1 → open NotebookLM | 9 | 7 | #2, #5 |
| Exercise → prompt into NotebookLM | Keyingi qadam → brief → 2 sources → open NotebookLM → back to tab → copy P1 | 9 | 6 | #2, #13 |
| Finding a library prompt, ready to paste | card → AMALIYOT tab → Kutubxonani ochish → search → "+" to see the brackets → copy | 6 | 6 SAFE (toast now says to fill the brackets) / 5 with the LOOK line | #3, #2 |
| Hermes card done → next card | card 4 → row 01 → copy → Kartani bajarildi → Keyingi karta | 5 | 5 (no raw key on card 04) | #1 |
| Downloading all files of one exercise | brief + 2 sources | 3 | 2 | #13 |
| Switching language (phone, mid-page) | scroll up → ☰ → RU → close | 3 + scroll | 2 + scroll | #20 |
| Logging out | ☰ → Chiqish | 2 | 2 | n/a |

## Strengths (keep)
1. **Copy = done is a one-tap prompt job.** Copy shows "Nusxalandi", marks the prompt and offers 5 s "Bekor qilish". Every exercise prompt carries a bold "Qayerga:" line, so the student knows where it goes (`ux/mw-E1-copied.png`).
2. **Library search is strong.**
   - It searches all 47 prompts and ignores apostrophe variants: "qimmat" finds 2 and "mijoz" finds 18.
   - The result count is announced.
   - The empty state says what to do and offers "Tozalash" (`ux/mw-G2-search.png`, `ux/mw-G4-empty.png`).
3. **Dead ends are routed, not shown.**
   - A locked deep link lands on home with the sheet "2-dars 19-sentabrda ochiladi".
   - An unknown route lands on home with "Sahifa topilmadi".
   - The gate names the bad characters (0, 1, I, L, O) and cleans pasted IDs.
   - Tapping a closed prep card's checkbox opens the card instead of ticking it, and each tick opens the next card (`ux/mw-J3-locked-deeplink.png`, `ux/mw-C0-chip-closed-tap.png`).

## Summary
1. **1 Critical:** the raw key "⟦HC.NO_PROMPTS⟧" shows on Hermes card 04 in every language and size. It came from a string removed without removing its call. It is a one-line fix plus a `⟦` build check.
2. **3 High:**
   - no link to NotebookLM anywhere, and deep links skip the "new notebook" rule;
   - 40 of 47 library prompts are copied with unseen [brackets];
   - on lesson day the hero doesn't lead to today's work.
3. **9 Medium:**
   - lesson pages always open on Slides;
   - "qadam" has 4 meanings;
   - one exercise has 3 names;
   - a 17px back link that loses the lesson;
   - no prep ending;
   - prep is skipped after day 1;
   - a misleading short-ID error;
   - a silent copy failure;
   - colliding download names.
4. **7 Low:** spelling of manba/NotebookLMʼga, "vazifa" in the library, 13 vs 8, a manual library checkbox, 6 done-labels, 2.0 lines for the content owner, and menu behaviour.
5. **Tags:** 18 of 20 are SAFE. #3 and #20 add optional LOOK variants. No new screens; every fix reuses `nextBlock`, `pc-lk`, `flashToast`, `?tab=` or the zip row.
6. **Taps:** today's lesson 3 → 1, exercise-to-NotebookLM 9 → 6, Vazifa 9 → 7, exercise downloads 3 → 2. There were no console errors on any of the 8 crawl configurations.
