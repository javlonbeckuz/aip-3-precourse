# Visual design audit: AI Praktikum 3.0 student platform

- **Audited:** `AI-Praktikum-3.0-final.html` on 2026-10-19 (`?solo`), in headless Chrome over CDP.
- **Viewports:** 390×844 (mobile emulation), 1024×900 and 1440×900.
- **States:**
  - all 42 crawl routes at `?today=2026-10-12` with the seeded demo and lesson 4 open;
  - day 0 (`2026-09-05`) and the live lesson (`2026-09-26`) with empty progress;
  - the lesson folder tabs, the popup, the name menu, the locked sheet, and login focus, error and welcome.
- **Lens:** visual design, meaning hierarchy, type, spacing and rhythm, colour, layout and grid, consistency between screens, and anything that looks templated.
- **Method:**
  - `design-critique` dimensions, plus the `impeccable` critique flow.
  - I did the design review (Assessment A) before running the deterministic detector (`impeccable detect`, Assessment B).
  - This was a degraded single-context run, because a subagent cannot start further subagents.
- **Checked against:** `taste-profile.md`, `tokens.md` and `reference-blueprint.md`.
- **Not repeated:** anything already open in `ux-pass-2.md`, `redundancy-audit.md`, `element-audit.md` or `color-audit.md`, except where the visual angle is new. Those cases are cross-referenced.
- **Respected user decisions, not re-proposed:**
  - fixed lesson identity colours;
  - no glows;
  - the hero card;
  - ☰;
  - the login photo;
  - copy = done;
  - Uzbek course material;
  - no slop decoration.
- **Screenshots:** `C:/Users/User/AppData/Local/Temp/claude/C--Users-User-vs-code-HEAD-projects-praktikum3-precourse-platform/7b93abd2-e86f-4f93-b0fc-efc57770bbb1/scratchpad/audit5/visual/`, written below as `v/…`.
  - Name pattern: `{width}-{seed|empty}-{MM-DD}_{route}[-full].png`.
  - `st-{width}-…` = interactive states.
- **Tags:** **SAFE** = usability or conformance to the existing spec, no taste sign-off needed. **LOOK** = changes what the screen looks like, so the user decides.

**Verdict:** the system is on-brief and has real character. On its main screens it is not templated. The weak spots are composition, not palette:
- a big empty colour slab on every lesson page;
- the primary action is the quietest thing on home;
- the type rules (mono = data only, one headline scale) have drifted across about 40 screens.

---

## High

### 1 · The default lesson tab is an empty colour slab, and the three tabs use three different layouts · `#/dars/1`–`#/dars/3` (Slaydlar tab)
- **What is wrong:**
  - All panes share one grid cell, so the folder is as tall as the Amaliyot list. The Slaydlar pane (the tab that opens first) holds one 15px label ("78 TA SLAYD · VIDEO") and one 44px button.
  - **At 1440:** the pane is 688×525px, and its content uses the top ~80px, so **~85% of the largest object on the page is empty lilac or grey**.
  - **At 390:** the pane is ~500px tall with ~95px of content.
  - **At 1024:** the same.
  - The three tabs show three different layouts:
    - Slaydlar: label top-left, action top-right, and nothing below.
    - Amaliyot: a hairline list.
    - Vazifa: a 200px "0/8" panel numeral, a caption, and the action bottom-right.
- **Why it matters:** the eye lands on the biggest, brightest shape, and it says nothing. On a phone the student scrolls through half a screen of flat colour to reach nothing. It reads as a rendering failure, not as calm.
- **Fix (fits the look):** give Slaydlar the Vazifa layout, which is the reference's "700" card:
  - the panel numeral is the slide position ("14/40", or "78" when untouched) in display 400 at 200 / 120px;
  - the caption is "slayd · video";
  - the action ("Qayta koʻrish" / "Davom etish") goes bottom-right.
  - Every tab then has the same anatomy: eyebrow top-left, one huge element, and the action bottom-right.
- **Shots:** `v/1440-seed-10-12__dars_1.png`, `v/1440-seed-10-12__dars_2-full.png`, `v/390-seed-10-12__dars_1-full.png`, `v/1024-seed-10-12__dars_1.png`, compare `v/st-1440-dars1-vz.png`
- **Tag:** LOOK

### 2 · The primary action on home is its quietest element · `#/dastur` (most days: no live lesson)
- **What is wrong:**
  - "Keyingi qadam" (the one next action, per design intent #3) is an 18px Golos line with a 13px grey sub-line and a 44px outline circle.
  - **At 1440 with no live lesson** (`?today=2026-10-12`, which is every day except class day), the top 380px holds only the ring and this line on the left. **The right 560px column is empty.**
  - The ring numeral (46px) and the 88px-scale folder titles all outrank the action.
- **Why it matters:** the brief says the next action comes first. A non-technical student scanning home sees a progress donut and five big coloured folders, and never sees the one line that takes them to their exact prompt.
- **Fix:** use the reference's own CTA, the outline pill (`.pill-cta`, 486×60, white 1px, white 52px circle with →, already in `tokens.md`), labelled "Keyingi qadam · 1-dars · Amaliyot 01 · P3".
  - **Desktop, no live lesson:** put it in the empty right column, where the hero sits on class days.
  - **Desktop, live lesson:** it stays under the ring.
  - **Phones:** a full-width 56px pill.
  - No new element, only a stronger form for an existing one.
- **Shots:** `v/1440-seed-10-12__dastur-full.png`, `v/1024-seed-10-12__dastur-full.png`, `v/390-seed-10-12__dastur-full.png`
- **Tag:** LOOK

### 3 · Martian Mono is used for sentences, against "mono = data only" · Hermes index, exercise and Vazifa rows, the 03 picker, the welcome
- **What is wrong:** measured on the live DOM, these Martian runs are prose, not data:
  - **Hermes index (`#/dars/4/amaliyot`):** all 10 "Natija: …" outcome lines, 12–13px `#8A8A90`, up to 2 lines of ~100 characters at 1440.
  - "Avval shuni oching" (exercise 01).
  - "Hammasini yuklash" (Vazifa zip).
  - "5/8 asosiy bajarildi".
  - "Namoyish yoki uyga vazifa" (`#/dars/1/amaliyot`).
  - "Servis · Operator uchun murojaat qabul q…" and "Ombor · Mind Map…" (`#/dars/1/amaliyot/03`).
  - "Xush kelibsiz, Student!" (welcome loader).
- **Why it matters:**
  - The "Natija" line is the most useful sentence on the Hermes index: it is how a student knows a card worked.
  - Set in small grey mono, it reads like a terminal log. The taste profile bans exactly that HUD feel.
  - Mono is also the slowest face here for non-technical readers.
  - It blurs the rule that makes file sizes and IDs look like data.
- **Fix (SAFE, restores the spec):**
  - Set these runs in Golos 400 at 15px (desktop 16), `--text-2`.
  - Keep Martian only for the size and type tokens ("PDF · 34,2 KB"), the ID and paste targets.
  - On the Hermes rows, keep "Natija:" in Golos 500.
- **Shots:** `v/1440-seed-10-12__dars_4_amaliyot-full.png`, `v/390-seed-10-12__dars_1_amaliyot_01.png`, `v/1440-seed-10-12__dars_1_vazifa-full.png`, `v/st-390-login-loader.png`
- **Tag:** SAFE

### 4 · Hermes prompt rows squeeze the prompt into a 272px column on phones · `#/dars/4/amaliyot/01–10` at 390
- **What is wrong:**
  - On Hermes cards the copy circle and its "NUSXALASH" label sit in a right-hand column, vertically centred against the prompt.
  - The prompt body is **272px wide at 17px, about 28–30 characters per line**. Card 06's prompt runs 14 lines.
  - Exercise prompts on the same lilac use the agreed phone layout from `tokens.md`: the copy circle shares the first line, and the body spans the full 358px.
- **Why it matters:**
  - A short measure doubles the scroll on the longest texts in the product.
  - The copy button floats mid-paragraph, away from the title it belongs to.
  - The same component looks different in lesson 1 and lesson 4.
- **Fix (SAFE):** use the exercise row rule for Hermes rows below 900px:
  - the title line carries the copy circle at the right;
  - the body goes full width underneath;
  - the "NUSXALASH" label stays under the circle.
- **Shots:** `v/390-seed-10-12__dars_4_amaliyot_06-full.png` vs `v/390-seed-10-12__dars_1_amaliyot_01-full.png`
- **Tag:** SAFE

### 5 · A glow is still on the login field · `#/kirish`
- **What is wrong:**
  - `.mx-glow` is a 2px underline with `box-shadow: 0 0 15px var(--mercury)` on focus, and `0 0 15px var(--danger)` (a red bloom) on error.
  - The field group also slides 10px right on focus.
  - The comment says this card is MercuryLogin's `.auth-container`, a borrowed template component.
  - The detector flags the glow (`dark-glow`) and the elastic `cubic-bezier(.175,.885,.32,1.275)` easing in the same block (`bounce-easing`).
- **Why it matters:**
  - It is the first interactive thing a student touches, and it carries the one effect the user removed everywhere else ("no glows").
  - The red bloom on a busy photo reads as a neon effect, not as an error.
- **Fix:**
  - Keep the 2px underline. Drop the `box-shadow` in both states.
  - Use `--ease` (150ms) instead of the elastic curve.
  - Remove the 10px slide. The 2px white focus underline is already a sufficient focus mark on the photo.
  - The photo itself is untouched.
- **Shots:** `v/st-390-login-error.png`, `v/st-390-login-focus.png`
- **Tag:** LOOK (it follows an existing user decision)

---

## Medium

### 6 · Home card titles sit at different heights in the same row · `#/dastur` at 1024 and 1440
- **What is wrong:** the state note moves depending on the title length.
  - When the title is long, the note drops *under* it: 0-dars "Oʻrnatish va tayyorgarlik".
  - When the title is short, the note sits *beside* it: "Kirish" and "Claude va Code".
- **Measured:**
  - **At 1440:** the title bottoms are 711 / 743 / 743px in row 1.
  - **At 1024:** they are 513 / 543 / 512, and the notes are 536 / 536 / 536.
- **Why it matters:** the row reads as ragged, which is exactly the "precise alignment" the profile protects. The folder titles are the most repeated type on home.
- **Fix (SAFE):** give the card bottom two fixed rows:
  - the title, bottom-aligned, with `max-width: 60%`;
  - the note, always on the same baseline at the right.
  - Or always put the note on its own line under the title.
  - Either way, every title in a row shares one baseline.
- **Shots:** `v/1440-seed-10-12__dastur-full.png`, `v/1024-seed-10-12__dastur-full.png`
- **Tag:** SAFE

### 7 · The headline scale breaks rank: lesson 4's H1 is smaller than its own sub-pages · `#/dars/4`, all sub-pages
- **What is wrong** (measured H1 sizes):

  | Page | 1440 | 390 |
  |---|---|---|
  | Lessons 1–3 | 88px | 40.6px |
  | Lesson 4 (`.long`) | **52px** | |
  | Sub-pages (Vazifa, Amaliyot, exercise, Hermes card, library section) | 56px | 33.2px |
  | Prep (`#/dars/0`), a lesson page | 56px, sub-page style | |

  - So "4-DARS / AGENT VA ALTERNATIVALAR" (52) is smaller than its child "HERMES AGENTI" (56).
- **Why it matters:**
  - Hierarchy in this look comes only from size + uppercase.
  - An inverted step makes lesson 4 feel like a lesser page.
  - The scale is also one more value for the user to keep in sync.
- **Fix (SAFE):** two headline steps only, lesson (88 / 40.6) and sub-page (56 / 33.2).
  - For long lesson titles, allow 3 lines at a stepped-down **64px**. That keeps it larger than 56. "ALTERNATIVALAR" measures ~495px at 52, so ~610px at 64, which fits the 636px column. At 72 it would not fit (~685px).
  - Do not use a one-off 52.
- **Shots:** `v/1440-seed-10-12__dars_4-full.png`, `v/1440-seed-10-12__dars_4_amaliyot-full.png`
- **Tag:** SAFE

### 8 · There are 24 type sizes where the token table has 8 roles · all screens
- **What is wrong:** crawling every route, I counted **24 distinct size/family pairs per viewport**.
  - **At 1440:**
    - Golos: 11, 12, 13, 14, 15, 16, 18, 20, 24, 32;
    - Mona: 16, 21, 22, 38, 46, 52, 56, 88, 96, 200;
    - Martian: 12, 16, 17, 22.
  - **11px Golos uppercase is used 29 times**: "NUSXALASH" under every copy circle and the "Bajarildi" chips. It is the smallest text in the product, on the most important control.
  - Neighbouring steps (13/14/15/16, 20/21/22) are too close to read as different levels.
- **Why it matters:**
  - Near-equal sizes look like mistakes, not hierarchy.
  - 11px uppercase on lilac is hard for older eyes on a phone.
- **Fix (SAFE):** snap to the token roles:
  - body 18 / 17;
  - label 15 / 13 uppercase;
  - small 13 (floor);
  - card title 22 / 19;
  - panel title 34 / 22;
  - sub-page H1 56;
  - lesson H1 88;
  - numerals 96 / 200.
  - Raise "NUSXALASH" to 13px, as ux-pass-2 #4 already suggests for the chip.
  - Record the scale in `tokens.md` and treat any other value as a bug.
- **Shots:** `v/1440-seed-10-12__dars_1_amaliyot_01-full.png`, `v/390-seed-10-12__dars_1_amaliyot_01.png`
- **Tag:** SAFE

### 9 · Desktop inner pages leave 42% of the frame empty, and four right edges compete · Vazifa, Amaliyot index, exercise and Hermes headers, prep, library intro
- **What is wrong:**
  - Every sub-page is one column from x=66 to **x=834**. The right **606px (42%) stays black** for the full height: 1,395px on Vazifa, 1,277px on the Hermes index.
  - Four different right edges appear across the product: 834 (headers, file lists), 1166 (lilac prompt list rules), 1374 (library and prep cards), 1379/1390 (home cards, nav).
  - The lesson page and home use the reference's two-column split. Every page below them does not.
- **Why it matters:**
  - At 1440 the inner pages look like an unstyled mobile layout, stretched.
  - The broken edges are visible because the black is so flat.
- **Fix:**
  1. **SAFE:** align all content edges to one frame, 66 / 61 (the hero sides in `tokens.md`), and give the lilac list rules and file lists the same right edge.
  2. **LOOK:** from ≥1200px, reuse the lesson page split (636 | 688):
     - the header (back link, meta, H1, lede, rules) goes left;
     - the file groups ("1 · Avval oʻqing / 2 · NotebookLMʼga yuklang", Manbaalar, Kartalar) go right, aligned to the top of the H1.
     - The lilac prompt section stays full-bleed below. No new content.
- **Shots:** `v/1440-seed-10-12__dars_1_vazifa-full.png`, `v/1440-seed-10-12__dars_4_amaliyot-full.png`, `v/1440-seed-10-12__dars_1_amaliyot_01-full.png`
- **Tag:** LOOK (part 1 is SAFE)

### 10 · The end-of-page row floats mid-column on desktop · every exercise (`#/dars/1/amaliyot/01–06`) and every Hermes card
- **What is wrong:**
  - **At 1440:** the "Mashqni / Kartani bajarildi deb belgilash" checkbox sits at x=66, but the "Keyingi mashq · 02 · Mahsulotdan suhbatga" link spans **x=342–660**.
  - The link is aligned to neither the left edge, nor the 1166 rule end, nor the copy column.
  - It sits about 30px lower than the checkbox, so the two read as unrelated.
  - **At 390:** it is correctly flush-left at 16.
- **Why it matters:** it is the last thing on a 2,000–2,800px page, the "what now" moment, and it looks misplaced.
- **Fix (SAFE):**
  - One row, two ends: the checkbox left at 66, and "Keyingi mashq" with its circle right-aligned to the 1166 rule end (the copy column).
  - Both on one baseline, with a 1px rule above the row.
- **Shots:** `v/1440-seed-10-12__dars_1_amaliyot_01-full.png`, `v/1440-seed-10-12__dars_4_amaliyot_08-full.png`
- **Tag:** SAFE

### 11 · Note paragraphs run 105–115 characters per line on desktop · Hermes card notes, Vazifa section notes
- **What is wrong:**
  - The Hermes card notes ("Yakuniy dalil", "Noutbuk yoʻli", "Eslatma") and the Vazifa section notes are 14–15px Golos across **~770px**, about 105–115 characters per line.
  - The prompt bodies right below are capped at 62ch.
- **Why it matters:**
  - These notes are the instructions that make a card work, for example card 04's five steps.
  - Long grey lines at small size are where readers lose their place.
- **Fix (SAFE):** `max-width: 62ch` (the prompt rule), plus 16px on desktop.
- **Shots:** `v/1440-seed-10-12__dars_4_amaliyot_08-full.png`, `v/1440-seed-10-12__dars_1_vazifa-full.png`
- **Tag:** SAFE

### 12 · The background grid conflicts with the taste profile's own hard rule · `#/dastur`, `#/dars/*`, all sub-pages
- **What is wrong:**
  - `taste-profile.md` "Never" lists "grids", but `tokens.md` (2026-10-16) still specifies the 1px `rgb(255 255 255 / .05)` grid (96×64 cells) and the `#000 → rgb(9 9 12)` floor gradient. Both render on every app screen.
  - The detector flags it (`codex-grid-background`).
  - The grid is 1.08:1 against black: invisible on most phones, but on a bright monitor it draws lines through the gaps between cards and behind the H1.
  - The floor gradient ends in a visible band where a black header meets the lilac prompt section, for example the exercise and Hermes headers.
  - Now that the glows are gone, the grid is the last ambient decoration left.
- **Why it matters:**
  - The reference stage is flat, pure black.
  - A barely-there grid is the "tech HUD" texture the user asked to avoid. It adds noise without meaning.
- **Fix:**
  - Remove the grid and the floor gradient, so `.site` is `#000`.
  - Then delete the "Project background" paragraph in `tokens.md`, so the docs agree.
- **Shots:** `v/1440-seed-10-12__dastur-full.png`, `v/1440-seed-10-12__dars_1_amaliyot_01-full.png`
- **Tag:** LOOK (earlier audits left the grid as the user's call. This finding raises the contradiction in the docs and does not decide it.)

### 13 · The lesson 4 card and folder lose their shape on black · `#/dastur`, `#/dars/4`
- **What is wrong:**
  - `#161616` on `#000` is **1.16:1** (1.10:1 against the floor gradient).
  - The folder tab, the ramp and the rounded corners, which are the signature shapes, disappear. The card reads as a hole in the list.
  - On `#/dars/4` the tab folder and its inactive "KITOB" tab merge into the canvas.
- **Why it matters:**
  - Lesson 4 is the final lesson, and its card should look as built as the others.
  - Outdoors on a phone, the student sees floating text, not a card.
- **Fix:**
  - Keep the identity colour (user decision), and add a 1px `--line` (#3F3F3F) stroke to the dark folder body and tab outline (`.c-dark`, `.gt.g-4`).
  - That is the same hairline the nav and menus already use.
- **Shots:** `v/390-seed-10-12__dastur-full.png`, `v/1440-seed-10-12__dars_4-full.png`, `v/390-empty-09-05__dastur-full.png`
- **Tag:** LOOK (small)

### 14 · The welcome loader is off-system clip-art · `#/kirish` → login
- **What is wrong:**
  - The 1.8s welcome shows an isometric, shaded 3D "server stack" in off-palette blues, not `#0A14FC`, with red/green strobing LEDs (`#17e300`, `ldr-strobe-g`) and an infinite `ldr-bounce`.
  - Under it, "Xush kelibsiz, Student!" is set in Martian Mono.
  - colour-audit #8 flagged the LEDs. They are still there.
- **Why it matters:**
  - It is the hand-off from the approved photo to the product, and the only 3D, gradient-shaded and looping object in a flat, nothing-loops system.
  - It reads as stock or HUD imagery.
- **Fix:**
  - A flat black screen with "Xush kelibsiz, {ism}!" in display 500 uppercase (34 / 22px).
  - Optionally the yellow ring arc drawing once (the existing `.prog` animation), which shows the student's own progress.
  - No LEDs, no bounce.
- **Shot:** `v/st-390-login-loader.png`
- **Tag:** LOOK

### 15 · The slide stage shape does not match the slides · `#/dars/n/slayd/k`
- **What is wrong:**
  - **At 390:** the stage is a **358×683 portrait** frame.
  - **At 1440:** it is **1407×719 (1.96:1)**.
  - The 2.0 slides are 16:9 Keynote stills and clips (1600px). A real slide will sit as a 358×201 strip inside a 683px black box on phones, with the arrows 480px below it.
- **Why it matters:** the placeholder hides it now, but with real content the phone viewer looks broken: a thin slide, a huge void, and the controls far from the content.
- **Fix (SAFE):**
  - `aspect-ratio: 16/9; max-height: calc(100svh - 160px)`.
  - Centre the stage vertically on desktop.
  - On phones, put the arrows directly under the slide, plus the existing tap zones.
- **Shots:** `v/390-seed-10-12__dars_1_slayd_1.png`, `v/1440-seed-10-12__dars_3_slayd_14.png`
- **Tag:** SAFE

---

## Low

### 16 · The library grid leaves a hole, and is the wrong lesson colour · `#/dars/2/amaliyot` at 1024 and 1440
- **What is wrong:**
  - The five section cards fill a 3+2 grid, so row 2 has an empty third cell (lower right, 441×260px).
  - Home already solves this with the 6-column 2+2+2 / 3+3 spans.
  - All five are lilac, which is lesson 1's identity colour, on lesson 2's page (lesson 2 is grey).
- **Why it matters:** the hole reads as a missing sixth section. The lilac makes a lesson 2 page feel like lesson 1.
- **Fix:**
  - Use the home grid rule: three cards spanning 2 and two cards spanning 3.
  - Use the flat-card grey (lesson 2), or keep lilac only if the user reads these as "prompt sections" (`tokens.md` lilac rule).
- **Shot:** `v/1440-seed-10-12__dars_2_amaliyot-full.png`
- **Tag:** LOOK

### 17 · The prep cards are ragged at the bottom · `#/dars/0` at 1440
- **What is wrong:**
  - Card 02's 4-line note makes it 1090px tall against 1069px for the others.
  - Its "Bajarildi" checkbox sits at 1042px, while the other three are at 1021px.
- **Fix (SAFE):** `align-items: stretch` on the row and `margin-top: auto` on the step toggle and checkbox block, so all footers share one baseline.
- **Shot:** `v/1440-seed-10-12__dars_0-full.png`
- **Tag:** SAFE

### 18 · Raw backticks show inside prompts and notes · Hermes cards 06, 08, 09
- **What is wrong:**
  - `` `ssh -t vps sudo reboot` ``, `` `~/.hermes/memories/USER.md` `` and `` `ssh -N hermes-panel` `` render as Golos text with literal backtick characters.
  - In this system, a command is data.
- **Fix (SAFE, display only):** render backtick spans as Martian Mono at 0.9em, with no backticks shown and a `currentColor` 9% well (the prompt-well token). Copy still returns the raw text.
- **Shots:** `v/1440-seed-10-12__dars_4_amaliyot_08-full.png`, `v/390-seed-10-12__dars_4_amaliyot_06-full.png`
- **Tag:** SAFE

---

## Detector (Assessment B) summary
`impeccable detect --json` found 13 hits in 8 rules on the single file.

| Rule | Hits | Where it went |
|---|---|---|
| `dark-glow` (login error underline) | 1 | #5 |
| `bounce-easing` (login card, loader) | 2 | #5, #14 |
| `codex-grid-background` | 1 | #12 |
| `overused-font` (Mona Sans) | 1 | False positive here: it is the user's pinned display face. |
| `all-caps-body` (109 and 62 uppercase characters in one run) | 2 | The locked-card subtitle and sheet lines: short, acceptable. |
| `cramped-padding` / `clipped-overflow-container` on `.frame`, `.gate-stage`, `.sheet` | 5 | Intentional full-bleed containers: false positives. |
| `layout-transition` (`transition: width` on `.mx-glow`) | 1 | Disappears with the #5 fix. |

---

## What this platform does best (keep)
1. **The exercise page.** It goes black header, then a numbered "1 · Avval oʻqing / 2 · NotebookLMʼga yuklang" file list, then a full-bleed lilac prompt list with 96px numerals and hairlines. It is editorial, unmistakably this product, and the clearest screen in it. Every other prompt surface should copy it (see #4).
2. **A palette with discipline.** There are four flat fills on pure black, every text-on-fill pair is computed (white on blue 8.34, black on lilac 8.96, black on yellow 13.68), and identity colours carry from the home folder to the lesson folder. With the glows gone it is a truly flat system with no gradients on content.
3. **A signature shape and real type.** The folder-tab card has a fixed-ratio ramp (never stretched). Mona Sans Expanded headlines at 88px give the lesson pages genuine presence. There is no horizontal overflow on any of the 42 routes at 390, and no console errors.
