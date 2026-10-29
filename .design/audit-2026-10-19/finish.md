# Finish gate: AI Praktikum 3.0 student prototype

- **Audited:** `AI-Praktikum-3.0-final.html` over file:// on 2026-10-19, in headless Chrome over CDP (`cdp_sc.mjs`).
- **Checklists applied:** the anti-ui-slop audit playbook, the redesign-existing-projects audit, and impeccable's polish, harden and audit sections.
- **Contract:** `reference-blueprint.md` (no new screens or flows), `taste-profile.md` and `tokens.md`.
- **Not repeated:** anything that is still open in `ux-pass-2.md`, `redundancy-audit.md`, `element-audit.md` or `color-audit.md`. These are known and left out:
  - the popup repeating the hero;
  - the hero repeating card 3;
  - the toast covering the next prompt;
  - the section numeral next to its range;
  - ☰;
  - meta lines that repeat the back link.
- **User decisions respected:**
  - fixed lesson colours;
  - no glows;
  - no Telegram;
  - Uzbek course material;
  - copy = done;
  - the hero card stays;
  - ☰;
  - the login photo;
  - no AI-slop decoration.

## Coverage
- **Routes:** all 41 routes in `ROUTES()` (minus `#/shrift`), plus 7 `?tab=` folder states.
  - **Widths:** 320, 390×844 (mobile emulation), 1024 and 1440×900.
  - **Languages:** uz and ru.
  - **Captures:** a viewport shot for every route, plus a full-page shot at 390 and 1440.
- **States:** 16 key routes in each of these states: day 0 (`?today=2026-09-05`), live (`2026-09-26`), empty progress and all done. Each was captured at 390 uz, 390 ru, 1440 uz and 320 uz.
- **Overlays and edge cases:**
  - the gate in its default, short, bad-characters, not-found, loading, offline and rate-limit states;
  - the new-lesson popup;
  - the name menu, including a 36-character name;
  - the locked sheet;
  - the copy toast;
  - an empty and a full library search;
  - an unknown route;
  - the last slide and the "Barcha slaydlar" sheet;
  - 90-character file names.
- **Totals:** 1,347 screenshots and 644 per-route DOM measurements. The measurements cover:
  - horizontal overflow, and elements past the viewport;
  - truncation;
  - targets under 24 and 44px;
  - visible U+02BB/U+02BC;
  - text under 12px;
  - one-word last lines.
- **Screenshots:** in `C:/Users/User/AppData/Local/Temp/claude/C--Users-User-vs-code-HEAD-projects-praktikum3-precourse-platform/7b93abd2-e86f-4f93-b0fc-efc57770bbb1/scratchpad/audit5/finish/`, written below as `…/<file>`.
  - **File names:** `{open|day0|live|empty|done}-{uz|ru}-{width}_{route}[_full].png`.
  - `x-*` files are the overlay and edge-case shots.
  - `f-*` files are scrolled close-ups.
- **Clean everywhere:**
  - no console errors;
  - no page-level horizontal scroll;
  - **0 visible raw ʻ/ʼ in any language or state.**
- **Labels:** **SAFE** = a usability or bug fix that needs no taste sign-off. **LOOK** = it changes how the screen looks, so the user decides.

### State coverage per screen
✓ = designed and working · ~ = exists, but has a defect below · ✗ = missing

| Screen | Default | Empty / 0 | Loading | Error | Done | Locked | Partly locked |
|---|---|---|---|---|---|---|---|
| Gate `#/kirish` | ✓ | ✓ (example in help) | ✓ (loader, see #17) | ✓ short / chars / not found / offline / rate | ✓ welcome | n/a | n/a |
| Home `#/dastur` | ✓ | ~ ring dot (#6) | ✗ (no skeleton; the prototype is instant) | ✓ save_failed toast exists | ~ no completion state (#6) | ✓ lock note + sheet | ✗ `partLock()` always returns null (see note) |
| Lesson `#/dars/n` | ~ empty panes (#3) | ✓ 0/8 numeral | ✗ | n/a | ✓ ✓ on the tabs | ✓ redirect + sheet | ✗ (see note) |
| Prep `#/dars/0` | ✓ | ✓ | n/a | n/a | ~ copy still nags (#6) | n/a | n/a |
| Exercise / Vazifa sheet | ✓ | ✓ | n/a | ✓ copy_failed text | ✓ ✓ title, dimmed number | via lesson | ✗ |
| Hermes card | ✗ broken layout (#1) | ✓ | n/a | ✓ | ✓ | via lesson | ✗ |
| Library | ✓ | ~ search empty (#18) | n/a | n/a | ✓ toggle | n/a | n/a |
| Slides | ~ (#2) | n/a | ✗ (#16) | ✗ (#16) | ✓ "Koʻrildi" + back pill | via lesson | n/a |

**Partly locked:** the prototype hard-codes `partLock = () => null`, so "Amaliyot opens after the lesson" has never been rendered. The app returns an opening time for it. This is the one state the user will meet every week that has no design. **Before ship:** render one lesson with `partLock(n,'vz')` returning a time, and check the tab and pane.

---

## Ranked fixes

### Critical

#### 1 · Hermes prompts: the text column is squeezed, and card 10 runs off the screen · `#/dars/4/amaliyot/01–10`
- **What is wrong, measured:**
  - The Hermes prompt rows have no number (`li.nonum`). They switch to `grid-template-columns: minmax(0,1fr) auto; align-items: center`, so the copy circle keeps its own right-hand column on phones.
  - **Narrow text:** the prompt text gets about 230px at 320 and 260px at 390 (tokens: "body spans the full width below"). That is 4–5 words per line for the longest prompts in the course.
  - **Card 10 overflow:** `p.tx` and `h3.tt` run from x=16 to x=449 on a 390 screen, and to x=449 at 320 too, in uz and ru. Long tokens like `` `https://generativelanguage.googleapis.com/v1beta` `` have no break opportunity, so the right ends of lines are clipped.
  - **The copy button:** it is centred vertically on a 1,700px prompt, so it sits on top of the text ("NUSXALASH" over "skript").
  - **Desktop:** the circle floats halfway down the prompt, about 330px from the title, and 330px to the right of the 62ch text column.
- **Why it matters:** card 10 cannot be read or checked on a phone, and the copy button covers the text. All 10 cards are the hardest technical tasks in the course, and they get the narrowest column.
- **Fix:**
  - Phones: `.s1 li.nonum{grid-template-columns:1fr auto;align-items:start}`, `.s1 li.nonum .body{grid-column:1/-1;grid-row:2}`. The copy circle then shares row 1 with the title, as the numbered rows do.
  - All widths: `.s1 .tx{overflow-wrap:anywhere}`.
  - Desktop: `align-self:start` on `.cpw`.
- **Tag:** SAFE
- **Shots:** `…/open-uz-390_dars_4_amaliyot_10_full.png`, `…/f-uz-320_h02_prompt.png`, `…/open-uz-1440_dars_4_amaliyot_10_full.png`

#### 2 · A stray "}" is printed under the book rows · `#/dars/4?tab=kt` (also present in the DOM of `#/dars/4` and `?tab=am`)
- **What is wrong, measured:**
  - A visible `}` glyph shows under "Кирилл ёзувида" at every width.
  - The cause is a template typo, `.join('')}}</ol>`, in `.design/comp/src/proto_app.js:310`. **The same typo is in the shipping SPA, `public/aip/app.js:1498`.**
- **Why it matters:** template junk on a finished screen is the clearest sign of "not done", and it is already in production code.
- **Fix:** delete the second `}` in both files. Add a crawl assertion that no visible text node is a lone `{`, `}` or `${`. The scan used here found only this one.
- **Tag:** SAFE
- **Shot:** `…/open-uz-390_dars_4_tab_kt_full.png`

### High

#### 3 · The slide viewer breaks at 320 in Russian · `#/dars/n/slayd/{last}` and the top bar
- **What is wrong, measured:**
  - On the last slide the footer runs from x=16 to x=333 on a 320 screen:
    - the → circle is cut off at the right edge;
    - "Назад / к / уроку" wraps one word per line.
  - The top bar does the same, so the "Все слайды" pill loses its right side, and so does the stage border.
  - The same happens on lessons 1 and 2.
- **Why it matters:** the way back from the slides is the one action on that screen, and on a small Android in Russian it is clipped.
- **Fix:**
  - Footer: `grid-template-columns: auto 1fr auto` with `min-width:0`.
  - Under 360px:
    - drop the "Просмотрено" word and keep the ✓;
    - add `white-space:nowrap` on the play label.
  - Top bar: let the counter shrink, or move it under the bar.
- **Tag:** SAFE
- **Shot:** `…/open-ru-320_dars_1_slayd_78.png`

#### 4 · The lesson folder shows large empty slabs · `#/dars/1–4` (Slaydlar pane, lesson 3's blue pane, Kitob pane)
- **What is wrong, measured:**
  - All panes share one grid cell, sized by the tallest pane, with a minimum of 460px on phones.
  - **Slaydlar pane:** it holds one 13px line ("78 TA SLAYD · VIDEO") and a 2-line action. It shows as about 400px of flat lilac at 390 and about 480×370px at 1440.
  - **Lesson 3's blue pane:** in the live state it is a blue block taller than the screen, with one row of content.
  - **Kitob pane:** about 200px of empty dark fill between the book title and its note.
  - The Vazifa pane shows that the same space can carry meaning: its "5/8" display numeral is the strongest object on the page.
- **Why it matters:** on a phone, the first thing below the hero is an empty coloured slab. It reads as content still loading, or missing, on the most visited inner page.
- **Fix:**
  - **LOOK:** give each pane the folder card's grammar: one huge element bottom-left. That is the slide count in display 400, "14/40" or "78", at the same size as "5/8", with the action top-right. The Kitob pane then keeps title + note together and puts the rows at the bottom.
  - **SAFE fallback:** on phones, size panes to their content (accept the tab-switch height change), and keep the shared cell from 900px up.
- **Tag:** LOOK
- **Shots:** `…/open-uz-390_dars_1.png`, `…/open-uz-1440_dars_1.png`, `…/live-ru-390_dars_3.png`, `…/open-uz-390_dars_4_tab_kt_full.png`

#### 5 · Martian Mono is used for sentences · ex-03 picker, Hermes index
- **What is wrong, measured:**
  - **Ex-03 picker:** the 03A/03B descriptions are full sentences in Martian 13px, condensed to 87.5%. At 320 in Russian that is 6 lines of mono, ending in "· выполнено".
  - **Hermes index:** each row has a 2–4 line "Natija: …" sentence in mono.
  - **The rule they break:** `tokens.md` and `taste-profile.md` reserve Martian for data (ID, prompt target, sizes).
- **Why it matters:** for non-technical readers on a phone, condensed mono prose is the slowest text in the product. It sits exactly where they have to choose (03A or 03B) or decide which card to open.
- **Fix:**
  - Sentence subtitles in `.xr` / `.p-list` rows: Golos 14px, `--text-2` (on lilac, `--ink-2`).
  - Mono stays for counts like "2/4" and the 01 to 10 numbers.
  - Show the done state with the ✓ alone; drop the "· bajarildi" appended to the sentence.
- **Tag:** SAFE (it restores the token rule)
- **Shots:** `…/open-uz-390_dars_1_amaliyot_03.png`, `…/open-ru-320_dars_1_amaliyot_03.png`, `…/open-uz-390_dars_4_amaliyot.png`

#### 6 · Zero, day-0 and finished states on home and prep look undesigned · `#/dastur`, `#/dars/0`
- **What is wrong, measured:**
  - **(a) Zero ring:** at 0/4 the ring draws a lone yellow dot at 12 o'clock, because the arc is zero length with round caps. This shows at every width, on day 0 and with empty progress. It reads as a marker or a glitch next to "0/4".
  - **(b) All done (4/4):** the "Keyingi qadam" slot just disappears. The course end has no message and no pointer to what is still worth doing (the book, bonus card 10).
  - **(c) Day 0, prep done:** the yellow hero still says "12-SENTABRGACHA" over "4/4 bajarildi", and there is no next step at all.
  - **(d) The prep lede ignores progress:** at 4/4 it still says "imkon qadar tezroq tayyorlab qoʻying".
- **Why it matters:** these are the first screen (day 0) and the last screen (course done) every student sees. Both look like leftovers of the "in progress" design.
- **Fix:**
  - **(a)** Don't draw the arc at 0 (`stroke-linecap:butt` when the value is 0, or omit the path).
  - **(b)** Fill the next-step slot with a done line, for example "Hammasi bajarildi ✓ · Kitob va bonus karta ochiq" linking to `#/dars/4?tab=kt`.
  - **(c)** When prep is done before day 1, the hero says "Tayyorsiz · 1-dars 12-sentabr" with no deadline styling.
  - **(d)** Pick the lede by state.
- **Tag:** SAFE
- **Shots:** `…/day0-uz-1440_dastur.png`, `…/empty-uz-390_dastur_full.png`, `…/done-uz-390_dastur_full.png`, `…/day0-uz-390_dastur_full.png`, `…/done-uz-390_dars_0.png`

### Medium

#### 7 · Rows break at 320, and one list has two row designs · `#/dars/1?tab=am` and `#/dars/1/amaliyot`
- **What is wrong, measured:**
  - **At 320 RU:** the "промпты 2/4" meta keeps its own column, so titles break one word per line ("Yangi / xodimga / tayanch", "Rahbar / yoʻlda ham / tushunsin"). Rows reach 4 lines.
  - **Two designs for one list:**
    - the pane uses a mono number column + title + mono meta + →;
    - the index page uses an inline "01 · Title" + bold mono meta + →.
- **Why it matters:**
  - The narrowest phones get the most broken version of the main navigation into the practice.
  - Two row designs for one list make the index feel like a different product.
- **Fix:**
  - Under 400px, put the meta in a second grid row under the title (`grid-template-areas`).
  - Use the pane's `.xr` row on the index page too.
- **Tag:** SAFE
- **Shots:** `…/f-ru-320_dars1_am_pane.png`, `…/open-uz-390_dars_1_amaliyot.png`, `…/open-uz-390_dars_1_tab_am.png`

#### 8 · Orphans and bad breaks in headings and ledes · many routes
- **What is wrong, measured:**
  - The CSS has one `text-wrap` rule in total. The crawl found 68 one-word last lines after a line of 3 or more words. Examples:
    - **1440 H1s:**
      - "KORXONA BILIMINI ISHGA / SOLING";
      - "BITTA KEYS, BIR NECHA / FORMAT";
      - "RAHBAR YOʻLDA HAM / TUSHUNSIN".
    - **RU 320:** "ВЫБЕРИТЕ ОДНО: А / ИЛИ В".
    - **Library prompt titles (h3.tt):** "… BIZNES / TOPISH", "… YONDASHUV".
    - **Ledes:** they end on a lone "NotebookLM.".
    - **Hyphen splits:** the Vazifa pane's "birma- / bir." and the 1440 Vazifa lede.
- **Why it matters:** huge uppercase headlines are the signature of this look. An orphan in an 88px line is the most visible polish miss in the product.
- **Fix:**
  - `.headline,.tt,.f-title,.gt-h,.sheet-t{text-wrap:balance}`.
  - `.lede,.tx,.ef-hint,.gt-meta{text-wrap:pretty}`.
  - Join "birma-bir" with a non-breaking hyphen (U+2011) in the copy.
- **Tag:** SAFE
- **Shots:** `…/open-uz-1440_dars_1_amaliyot.png`, `…/open-ru-320_dars_1_amaliyot_03.png`, `…/empty-uz-390_dars_1_tab_vz.png`, `…/open-uz-390_dars_2_amaliyot_01-biznes-goyalar_full.png`

#### 9 · Decoration left over after "no glows" · every lilac prompt section; the canvas
- **What is wrong, measured:**
  - **Glow:** the shipped CSS still has `.s1::before`, a radial lilac glow (alpha .11, up to 170px tall) above every prompt section. It is faint on screen, but it is a glow the user has ruled out.
  - **Grid:** the canvas still carries the 1px 5% grid (48×32 on phones, 96u×64u on desktop). `taste-profile.md` lists grids under "Never".
- **Why it matters:** the user has already ruled out glows, and grid + glow is a standard AI-landing-page fingerprint. On a flat-block reference look they add noise without meaning.
- **Fix:**
  - **SAFE:** delete `.s1::before` (the user already decided this).
  - **LOOK:** drop the grid so the canvas is pure black, as the taste profile says. It is still marked "user's call" in the element audit, so ask once and close it.
- **Tag:** SAFE (glow) / LOOK (grid)
- **Shots:** `…/open-uz-1440_dars_1_amaliyot_01.png`, `…/open-uz-390_dastur_full.png`

#### 10 · Prep cards at 320: the picture squeezes the text · `#/dars/0`
- **What is wrong, measured:**
  - The illustration keeps about 110px of a 288px card. The note wraps to 6 lines of about 14 characters ("Рекомендуем / MacBook, подойдёт / и Windows. / Телефона или / планшета / недостаточно.").
  - The Russian titles break into two lines ("АККАУНТ / GOOGLE").
- **Why it matters:** prep is the only screen where a skipped line costs class time, and on the smallest phones the instructions are the hardest text to read.
- **Fix:** below 360px, cap the picture at 64px and place it top-right next to the number, so the note spans the full card width.
- **Tag:** SAFE
- **Shot:** `…/f-ru-320_prep_cards.png`

#### 11 · File rows use two components, and the book rows don't match each other · `#/dars/4?tab=kt` vs every other file list
- **What is wrong, measured:**
  - **Everywhere else:** files are `.ef-row`: name, a mono meta line "PDF · 21,1 KB", and a 40px ↓ circle.
  - **The book:** its rows use the navigation-row pattern: a label, a filename or "PDF · kirill" meta, a NAMUNA pill and a → arrow.
  - **The two book rows disagree:** one meta is a file name ("Biznesda_AIni_qollash_lotin.pdf"), the other is "PDF · kirill".
- **Why it matters:** → means "go to a page" everywhere else in the product, so the book reads as another screen, not a download.
- **Fix:** render both book variants as `.ef-row` with the ↓ circle and parallel metas: "Lotin yozuvida / PDF · lotin" and "Кирилл ёзувида / PDF · kirill".
- **Tag:** SAFE
- **Shot:** `…/open-uz-390_dars_4_tab_kt_full.png`

#### 12 · Action labels wrap, and the end-of-card row lines up with nothing · lesson panes, slide viewer, Hermes / exercise ends
- **What is wrong, measured:**
  - **Labels wrap into 2 lines** at every width, even with free space:
    - "Qayta / koʻrish", "Slaydlarni / koʻrish";
    - "Darsga / qaytish";
    - "Kartalar / sahifasi";
    - "Смотреть / снова".
  - **End of a card at 1440:** the "Kartani bajarildi deb belgilash" checkbox sits at x=65, and the "Kartalar sahifasi" pill sits on its own line at x≈330. Neither the left edge nor the text column lines up with it.
- **Why it matters:** two-line button labels next to a single circle look accidental, and the closing row of every task is the last impression of the page.
- **Fix:**
  - `white-space:nowrap` on `.play > span` when the label is 24 characters or less.
  - End row: `display:flex; justify-content:space-between; align-items:center`, wrapping on phones.
- **Tag:** SAFE
- **Shots:** `…/open-uz-1440_dars_1.png`, `…/x-uz-390_slide-last.png`, `…/open-uz-1440_dars_4_amaliyot_10_full.png`

#### 13 · Desktop sub-pages leave 60% of the screen black · `#/dars/1/vazifa`, exercises, prep, Hermes cards, library sections at 1440
- **What is wrong, measured:**
  - **The column:** the content sits in about 530px on the left of a 1440 frame (file rows end at x≈572). The lesson page next to it uses a two-column layout.
  - **On lilac:** the copy circles sit at x≈1110, about 300px away from a text column that ends at about x=815.
- **Why it matters:** the reference look is about filled, deliberate composition. These pages look like phone layouts on a big screen, and the copy button is cut off from the text it copies.
- **Fix:**
  - **LOOK:** give these pages the lesson page's grid. The left column holds the heading, the lede and the file groups, and the right column holds the 1/2/3 steps or rules.
  - Or centre a 760px reading column, and cap `.s1 ol` at the text width + 56px so the circle sits next to the text.
- **Tag:** LOOK
- **Shots:** `…/open-uz-1440_dars_1_amaliyot_01.png`, `…/x-1440_longfile2.png`, `…/open-uz-1440_dars_4_amaliyot_10_full.png`

#### 14 · 11px text in labels and tabs · copy labels, the 320 folder tabs, tags, the gate example
- **What is wrong, measured:**
  - **Copy label:** "NUSXALASH" / "КОПИРОВАТЬ" is 11px under every copy circle (88 + 44 routes).
  - **Folder tabs at 320:** "AMALIYOT", "VAZIFA", "KITOB" and "SLAYDLAR · BAJARILDI" drop to 11px.
  - **Tags:** "NAMUNA" / "ОБРАЗЕЦ" is 11px.
  - **Gate example:** "Masalan: AIP-7KQ2XM" is 11px mono on the photo, and the field underline runs right above it.
  - The token minimum for labels on phones is 13px.
- **Why it matters:** the tabs are the main navigation inside a lesson, and the example ID is the one hint on the login screen. Both are at the size users zoom to read.
- **Fix:**
  - 13px for `.cpl`, `.gt-tab` and `.mx-help`.
  - 12px for `.ns`.
  - At 320, shorten the tab text instead (the ✓ already marks done) rather than shrinking it.
- **Tag:** SAFE
- **Shots:** `…/open-uz-320_dars_1.png`, `…/x-uz-390_gate-default.png`

#### 15 · Hermes notes and placeholders: raw markdown and a false placeholder · `#/dars/4/amaliyot/02`, `/10`
- **What is wrong, measured:**
  - **Raw markup:** the "Eslatmalar" block shows raw backticks (`` `/voice on` ``) and "- " hyphen bullets as typed characters.
  - **False placeholder:** in card 10, `[GEMINI_API_KEY]` is a literal YAML value inside backticks, but it is set bold like a fill-in placeholder.
  - **Rule line:** "[Qavslar] ichini oʻzingiz toʻldirasiz." shows on cards that have no placeholder.
- **Why it matters:** a student will replace the bracketed text with their own key and break the config. This is a real failure risk on the most technical card.
- **Fix:**
  - Skip bracket detection inside backtick spans.
  - In notes, render backtick spans as `<code>` and "- " lines as `<ul>`.
  - Show the rule line only when the prompt has a placeholder.
- **Tag:** SAFE
- **Shot:** `…/open-uz-1440_dars_4_amaliyot_10_full.png`

#### 16 · Slides have no loading or error state · `#/dars/n/slayd/i` (`public/aip/app.js:1916`)
- **What is wrong, measured:**
  - **Prototype:** the stage is a placeholder.
  - **Production:** it renders a bare `<img>` with no loading state and no `error` handler for stills. Only a failed clip is caught (it falls back to the still).
  - **Result:** on a slow phone the student sees an empty black box. A 404 or expired session shows a broken image.
- **Why it matters:** slides are 2.0's heaviest content (78 clips in lesson 1), and they are watched on mobile data.
- **Fix:**
  - **Loading:** the stage keeps its aspect ratio with the slide number in display type (the current placeholder layout), and the image fades in on `load`.
  - **Error:** "Slayd yuklanmadi · Qayta urinish". On a 401, go to the gate.
- **Tag:** SAFE
- **Shot:** `…/open-uz-390_dars_1_slayd_1.png`

### Low

#### 17 · The gate loader uses a glossy 3D server-stack illustration · `#/kirish` while logging in
- **What is wrong, measured:**
  - The loader is an isometric server stack with gradient shading, over a blurred screen.
  - It is the only rendered or shaded object in a product that is otherwise flat blocks and line icons.
  - "Xush kelibsiz, Student!" under it is set in Martian Mono.
- **Why it matters:** it reads as stock AI art, which the user rejects. The rest of the product is flat line icons, so this is the one place where the visual language breaks.
- **Fix:** replace it with the flat ring (the home progress ring drawing itself) or just the welcome line in display type. Set the welcome line in Golos.
- **Tag:** LOOK
- **Shot:** `…/x-uz-390_gate-loading.png`

#### 18 · The library's empty search says the same thing twice · `#/dars/2/amaliyot`
- **What is wrong, measured:**
  - "0 ta natija" under the field and "Hech narsa topilmadi. Boshqa soʻz bilan qidiring." in the lilac block both say the same thing.
  - The "Tozalash" pill wraps into the middle of the sentence.
  - About 300px of empty lilac follows.
- **Why it matters:** this is a small moment, but it is the one empty state in the product and it looks unplanned.
- **Fix:**
  - Hide the counter at 0.
  - Put "Tozalash" on its own line, left-aligned.
  - Let the block collapse to its content.
- **Tag:** SAFE
- **Shot:** `…/x-uz-390_lib-empty.png`

#### 19 · Long file names break mid-word · file rows, at 320
- **What is wrong, measured:** a 90-character name wraps to 4 lines at arbitrary points ("muloq/ot", "versiya/.pdf"). The meta line and the ↓ circle stay correct.
- **Why it matters:** CRM file names are long and use underscores, so this will happen with real files.
- **Fix:**
  - Insert `<wbr>` after `_` and before the extension when rendering names, so breaks land between words.
  - Optionally clamp to 2 lines with the full name in `title`.
- **Tag:** SAFE
- **Shot:** `…/x-320_longfile2.png`

#### 20 · The wordmark is wider than its box · nav, all widths
- **What is wrong, measured:** the text box is 8px wider than its container (162 > 154 at 390, 220 > 212 at 1440). The wordmark centring is about 4px off against the hairline grid.
- **Why it matters:** it is minor, but the wordmark is the one centred element on every screen.
- **Fix:** give `.wordmark` `width:max-content`, or remove the fixed width / padding that it overflows.
- **Tag:** SAFE
- **Shot:** `…/open-uz-390_dastur.png`

---

## Verdict: NO-SHIP
The look is product-specific and very close to finished, but these block shipping:
- **#1 and #2:** a clipped, unreadable Hermes card on phones, and template junk that is already in `public/aip/app.js`.
- **#3:** the slide exit is clipped at 320 RU.

Fix those three (all SAFE, all small CSS or one-character changes), plus #6 (the day-0 and finished screens). Then re-run this crawl. It ships after that. #4, #9-grid, #13 and #17 are the user's LOOK calls and do not block.

## Three strengths
1. **It reads as Praktikum, not a template.**
   - Each lesson keeps its own colour in every state, and state is carried by words + ✓/🔒, never by colour.
   - Folder cards, the huge uppercase headlines and the full-bleed lilac prompt lists are used consistently.
   - No slop components: no 3-card feature row, no gradients on the content, no avatars, no fake data.
2. **Localisation holds.**
   - Zero raw ʻ/ʼ across 1,347 captures.
   - Russian expands without page-level horizontal scroll at 320 on every route except the two last-slide screens (#3).
   - Language switches keep scroll, the open tab and the toast.
3. **Feedback states are real and specific.**
   - Every gate error has precise copy.
   - There are offline and rate-limit messages.
   - Copy → done comes with an undo toast and a live-region announcement.
   - A not-found deep link lands on home with "Sahifa topilmadi".
   - There are no console errors on any route, in any state.
