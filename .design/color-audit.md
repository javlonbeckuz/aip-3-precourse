# Colour-system audit: AI Praktikum 3.0 comps

- **Audited:** 2026-10-16. Three options:
  - `comp/design-option-2.html`: flat cards + grid/violet glow. `comp/index.html` is identical apart from its title.
  - `comp/design-option-3.html`: option 2 + white WebGL "threads" on dastur/dars/ex.
  - `comp/design-glass.html` + `comp/glass-folder.js`: smoked glass over state-colour art.
- **Screens:** gate (+ ID error), dastur (+ glass `&open=0..4`), dars (tabs 0 and 1), ex, and the four overlays (new-lesson popup, name menu, toast, locked sheet). Rendered at 390 and 1440.
- **Glass was re-measured after the reviewer's 18:34 edit:** the panel tint went from .64 to .72 and the blur is now baked. The figures below are the current file.
- **Checked against:**
  - `tokens.md`, `taste-profile.md` (its design intent: "Blue means now, yellow means you, grey means material, dark means locked");
  - `element-audit.md` (#5, #7, #14 are colour findings);
  - `reference-blueprint.md` (2.0).
- **Visual companion:** `comp/color-options.html` (palette, semantic map, HOZIR → fix for each option).

**How contrast was measured.**
- Flat pairs are computed (WCAG 2.2 relative luminance).
- Everything that sits on art, glow, threads or a photo was measured from rendered pixels:
  1. hide all text (`color:transparent`) and screenshot the page;
  2. composite each text run's real colour (alpha × ancestor opacity) over the pixels under its glyph boxes;
  3. report the worst 5th percentile.
- Text-shadow halos are not credited, so the gate label and ID prefix read slightly worse here than they look.
- Threads are animated, so a snapshot shows one moment. The worst case can only be worse.
- Thresholds: 4.5:1 body; 3:1 for large text (≥ 24 px, or ≥ 18.66 px bold), UI parts, state indicators and focus.

## 2.0 baseline (what colour meant in Praktikum 2.0)
- **One saturated colour:** the live card was the Claude-orange gradient. Everything else was neutral dark (`#121212` / `#171717`).
- **States were words:** "{date}gacha" (prep), "Davom etmoqda" (live), "Ochiq" (open), a date (locked).
- **The 2.0 rule we keep:**
  - one accent colour means "now";
  - every state is a word, and colour only adds to it;
  - no colour is the sole carrier of a state.

---

## 1. Inventory

Literal counts are colour literals in the source (CSS, inline SVG, JS). "On screen" lists where the colour actually renders. Near-duplicates are grouped.

### Brand palette and its tints
| Group | Values (count) | On screen (options) | Note |
|---|---|---|---|
| **Black** | `#000` ×9 CSS (+ ×9 glass, ×4 js). Alpha: `.25` ×2 panel rules, `.3` prompt rules, `.55/.6` backdrops, `.78` error strip, `.82` loader, `.7/.9` text halos | canvas, ink on light fills, prompt rules, overlay backdrops (2, 3, G) | |
| **White** | `#fff` ×13 CSS, ×27 glass CSS, ×11 js. Alpha: `.05` grid ×4, `.06/.07/.1/.12/.14/.16/.17/.2/.32/.35/.38/.4/.42` glass fills and lines (≈20), `.45/.6/.7/.85` gate | text, CTA pill + circle, focus ring, square button, now-pill (glass), threads lines (3) | `#F5F5F7` (glass ink ×5) is a second white |
| **Blue** | `#0A14FC` token. Glass art: `#03053a #02021c #0610c9 #7d89ff`. Accent `#8f99ff` (off-palette) | hero card (2, 3). Hero art + lesson-3 folder art + section numerals (G) | |
| **Grey** | `#E0E0E0` token + login "mercury" `#e0e0e0`. Glass done art: `#17171a #5d5d63 #26262a #8f8f96` | lesson cards 1, 2, 3 (2, 3). Done folder art + accent (G). ID focus glow (all) | |
| **Yellow** | `#FDC959` token. Glass prep art: `#1c1503 #7d5f12 #C79A2E #ffeab2` | 0-dars card + result card + ring arc (2, 3). Prep folder art + result-card art + yellow numeral + ring (G) | |
| **Lilac** | `#B4A1D1` token. `#2E2440` lilac-ink ×2. Glass open art: `#1a1229 #5f4e80 #9884b8 #e9e0f7`. Prompt art: `#150e22 #3c2f58 #6b5a8e #d9ccee`. Glass text tints: `#d8d0e6 #f3effa #e9e0f7` | tab folder + prompts section (2, 3). Open folder art, dars slab art, prompt cards, numerals, chips, placeholder, copy ring (G) | |
| **Dark** | `#161616` token. Plus: `#0d0d0d` body, `#111` hover, `#05070f` gate stage. Glass: `#0c0c0f #1b1924 #0c0b11 #17151e #121214 #0e0e10 #1e1e21 #2a2a2e` and tints `rgb(18 16 26 / .72–.93)` | locked card + sheet (2, 3). Every glass surface (G) | 10+ near-blacks in glass |
| **Danger** | `#FF6B5E` token. Loader LEDs `#FF715E` ×9 + strobe `rgb(255 95 74)` | ID error (all). **Login loader LEDs (all)** | loader red ≈ danger |
| **Violet glow** | `rgb(130 104 214 / .24)`, `rgb(110 90 200 / .16)`, `rgb(80 66 170 / .09)`, `rgb(50 40 120 / .035)`; floor `#0b0830 #140c47` | top-right glow + floor on dastur/dars/ex (2, G) | hue is next to lilac |
| **Loader illustration** | `#396CAA` ×13, `#173D7A` ×4, `#0665B2` ×3, `#163C79`, `#124E89`, `#163874`, `#173E7B`, `#3A6DAB`, `#3C4F6D`; green `#17e300` (+ `.71`) | welcome loader after a good ID (all) | |

### Greys used for text and lines
| Group | Values | Used for | Tokens? |
|---|---|---|---|
| Secondary text, solid surfaces | `#A6A6A6` (muted), `#9A9A9A` (dark-ink), `#8A8A90` (file meta), `#8a8a8a` (ID prefix) | lede, eyebrows, help, locked card text, file sizes | 2 of 4 are tokens |
| Secondary text, glass | `#CFCFD6` (g-soft ×5), `#B9B9C1` (file meta), `#8D8D92` (locked ×3, js ×3), `#E6E6EA`, `#E8E8EC` (hover), `#D9D9DE` (file row) | glass eyebrows, metas, locked rows | none are tokens |
| Lines | `#3F3F3F` hair, `#595959` tag-line (also popup eyebrow text), `#1C1C1F` file-row rule, glass `rgb(255 255 255 / .14)` | hairlines, pill outlines, row rules | 2 of 4 |
| Placeholder | `#555` (pill field), `rgb(255 255 255 / .6)` (gate) | ID example | |
| Comp chrome only | `#050505 #222 #2a2a2a #1a1a1a #555 #7a7a7a #9a9a9a` | review bar. Not product | ignore |

**Count:**
- **9 secondary greys:** `#E6E6EA #D9D9DE #CFCFD6 #B9B9C1 #A6A6A6 #9A9A9A #8D8D92 #8A8A90 #8A8A8A`.
- **About 12 near-blacks** in glass.
- **2 whites.**
- **1 off-palette blue tint.**
- **2 reds.**
- **1 green.**

---

## 2. Meaning map (colour as signal)

| Colour | What it means on screen now | Where | Verdict |
|---|---|---|---|
| **Blue** | "now / live lesson" | 2/3: hero card only (list copy is grey + filled pill). G: hero art **and** lesson-3 folder art **and** blue section numerals | ⚠ G breaks "blue once per screen" (2 blue objects). The `#8f99ff` accent is not in the palette |
| **Yellow** | (a) prep (0-dars card / prep art); (b) "Sizning natijangiz" = your progress; (c) course ring arc = your progress; (d) a *finished* prep ("Tayyor · 4/4") | dastur + dars, all options. G even uses the *prep* art recipe for the result card | ⚠ one colour, three meanings. ⚠ finished item in the "pending" colour (element-audit #14). ⚠ G result card literally = prep art |
| **Grey** | 2/3: open lesson (1) **and** done lesson (2) **and** live lesson in the list (3). G: done only. Login: focus glow | dastur | ⚠ in 2/3 grey = "any accessible lesson". ⚠ meaning flips between options (G grey = done) |
| **Lilac** | 2/3: lesson tab folder ("the lesson's content") + prompts section. G: **open lesson** (lesson-1 folder art, accent), dars slab art, prompt cards, prompt numerals, chips, copy ring, **placeholder** | dars + ex (+ dastur in G) | ⚠ meaning flips: G lilac = open state, 2/3 lilac = content surface. ⚠ G placeholder in lilac + underline = link look (element-audit #7 asked for no colour) |
| **Dark `#161616`** | locked | dastur, sheet | ✅ always with lock icon + date |
| **White fill** | 2/3: CTA circles, square button, popup "Darsni ochish" (black fill on white card). G: CTA circles **and** the "Hozir" status pill **and** the popup's "Darsni ochish" | everywhere | ⚠ in G a filled white pill is both a *status* ("Hozir") and an *action* (popup button): a status that looks tappable |
| **Black fill on a light card** | 2/3: "Hozir" status pill (list) **and** the play/next circles on lilac (actions) | dastur, dars | ⚠ same pattern: status pill and action circle share one look (minor: the circle has an arrow) |
| **Red** | ID error (with ⚠ + text) **and** the welcome loader's strobing LEDs (with green) | gate | ⚠ decoration that looks like data: red/green blinking lights read as error/OK during a *successful* login |
| **Violet glow** | nothing (decoration) | 2, G | ✅ no state. It sits in the lilac hue family behind the top-right card, so in G it slightly warms the live hero toward "open" |
| **White threads** | nothing (decoration) | 3 | ⚠ decoration in the text colour, moving under text (see contrast) |

### Conflicts, by type
- **One colour, two or more meanings:**
  - yellow (prep / your result / ring / done-prep);
  - grey in 2/3 (open / done / live-in-list);
  - lilac in G (open state / content / prompts / placeholder);
  - a filled ink pill (status "Hozir" / action button);
  - red (error / loader decoration).
- **One meaning, two colours:**
  - "open lesson" = grey (2/3) vs lilac (G);
  - "done" = grey card (2/3) vs grey art (G) vs 30 % opacity (prompts);
  - "live" = `#0A14FC` vs `#8f99ff`;
  - "secondary text" = 9 greys;
  - "locked text" = `#9A9A9A` (2/3) vs `#8D8D92` (G).
- **Colour as the only carrier:**
  - G dars tab selection: the selected tab differs only by a 17 % vs 6 % white fill (1.55–1.73:1) and white vs `#CFCFD6` text. No word or icon marks which tab is selected; `aria-selected` covers screen readers only.
  - Every other state has a word and/or icon:
    - lesson pills ✓;
    - the lock + date ✓;
    - the "Bajarildi" chip ✓;
    - ⚠ + text on errors ✓;
    - the underline on nav and language links ✓.
- **Meaning flips between screens or options:**
  - **0-dars:** flat card yellow → G yellow art. Both are "prep". But on the dars screen the same yellow/prep art means "your result".
  - **Lilac:** "content" (2/3) → "open" (G).
  - **Grey:** "available" (2/3) → "done" (G).
- **Decoration that looks like data:**
  - the loader LEDs (red/green blinking);
  - the yellow "done" prep card (the colour still says "to do").

### Colour-blind check (Machado 2009, full deutan/protan)
- **Yellow, grey and lilac stay distinct.**
  - Yellow vs grey: RGB distance 132 deutan / 150 protan (normal 140). They differ by hue, not lightness: 1.16:1. In greyscale or strong glare they merge, so the state words on the pills must stay.
- **Lilac shifts to a blue-grey (`#9BA9D0`)** but stays well away from blue `#0A14FC`.
- **Danger `#FF6B5E` turns khaki (`#B6A75A`) for deutans**, close to the yellow family. That is acceptable only because errors always carry ⚠ + text.

---

## 3. Contrast

### Text: fails
| # | Option · screen · width | Pair | Ratio | Need |
|---|---|---|---|---|
| C1 | 3 · dars · 390 | lede `#A6A6A6` over threads (bg to `#CDCDCD`) | **1.09** | 4.5 |
| C2 | 3 · dastur · 390 | "1-dars · Amaliyot 01 · P3" `#A6A6A6` over threads | **1.47** | 4.5 |
| C3 | 3 · dars · 390 | CTA label "Amaliyotni davom ettirish" `#fff` over threads (bg `#EFEFEF`) | **1.48** | 4.5 |
| C4 | 3 · ex · 390 | file meta `#8A8A90` / file names `#fff` / group heading `#fff` over threads | **1.51 / 1.59 / 2.19** | 4.5 |
| C5 | 3 · dastur · 390 | "Keyingi qadam" `#fff` over threads (first run, threads move) | **1.8** | 4.5 |
| C6 | 2, 3 · ex | done prompt number `#000` @ 30 % on lilac | **1.93** | 3 (large) |
| C7 | G · ex | done prompt number lilac @ 30 % on glass | **1.70** | 3 (large) |
| C8 | all · gate · 390 | "Shaxsiy kabinet" `#fff` over the bright photo (no halo on the h1) | **2.1** | 3 (large) |
| C9 | all · gate · 390 | "AIP-" prefix `#fff` @ 85 % over the photo (halo not credited) | 4.1 | 4.5 |

Threads at 1440 happened to stay clear of the text in the snapshot (lowest 5.1). They still move, so C1–C5 hold for any width.

### Text: passes, lowest per element
| Pair | Ratio | Options |
|---|---|---|
| white on blue card | 8.34 | 2, 3 |
| black on grey / yellow / lilac | 15.91 / 13.68 / 8.96 | 2, 3 |
| `#2E2440` on lilac (eyebrow, target) | 6.21 | 2, 3 |
| `#9A9A9A` on `#161616` (locked card + sheet) | 6.43 | 2, 3 |
| `#A6A6A6` on black / glow floor | 8.63 / 7.35 | 2, G |
| `#8A8A90` file meta on black | 5.70–6.12 | 2 |
| `#FF6B5E` error on `.78` black strip over photo | 5.84 | all |
| popup eyebrow `#595959` on white | 7.0 | 2, 3 |
| G text on art: eyebrow / sub `#CFCFD6` | ≥ 7.9 | G |
| G inactive tab `#CFCFD6` on track over art | 5.5–5.9 (one earlier frame: 4.58) | G |
| G locked `#8D8D92` on smoked glass | 5.26 | G |
| G `#8f99ff` numerals on blue art | 5.88 large / 6.99 small | G |
| G lilac numerals / prompt "02" on art | 5.27–5.76 | G |
| G "Bajarildi deb belgilash" chip lilac on art | 6.87 | G |
| G yellow 3/6 on prep art | 11.35 | G |
| G overlays (popup, menu, toast, sheet) | ≥ 11 | G |

**Static pairs that must never be used:**
- black on blue: 2.52;
- blue `#0A14FC` as text on black: 2.52;
- white on lilac: 2.34;
- white on yellow: 1.54;
- white on grey: 1.32.

### UI parts, state indicators, focus
| Pair | Ratio | Need | Verdict |
|---|---|---|---|
| Focus ring white on black | 21 | 3 | ✅ |
| Focus ring black inside lilac / grey / yellow | 8.96 / 15.9 / 13.7 | 3 | ✅ |
| **Focus ring white over threads** (3) | **1.15** | 3 | ❌ |
| G focus white on glass | ≥ 14 | 3 | ✅ |
| **G selected tab indicator vs track** | **1.55–1.73** | 3 | ❌ (state) |
| Flat selected tab (lilac vs black) | 8.96 | 3 | ✅ |
| Ring arc yellow vs track | 10.78 | 3 | ✅. The track (`.12` white) is 1.27 on black: decorative |
| Tag pill outline `#595959` | 3.00 | 3 | ✅ (exactly on the line) |
| Hairline `#3F3F3F`; download circle outline | 1.99 | n/a | decorative. The white icon identifies the control |
| G status-pill outline `.42` white; close-circle outline `.38` | 4.09 / 3.57 | 3 | ✅ |
| Blue hero card edge vs glow floor `#140C47` | 2.15 | n/a | fine: the card holds white text, so its edge isn't needed to identify it |
| Locked card `#161616` vs black | 1.16 | n/a | fine: content is visible. The card edge is not a control boundary that needs 3:1 |

---

## 4. Adaptation across options

**Option 2: flat + grid/glow.**
- **Consistent:** every fill is the literal palette and every text pair passes.
- **Background:** the glow floor (`#0b0830` → `#140c47`) keeps `#A6A6A6` at ≥ 7.35. The grid lines are at 5 % white and never sit under card text, because cards are opaque.
- **Drift:** meaning, not contrast.
  - grey carries open + done + live-in-list;
  - yellow carries prep + done-prep + "you".
- **The glow's hue (violet) is next to lilac.** It reads as decoration, but it means option 2 already has two violets.

**Option 3: flat + threads.**
- **Shares option 2's palette and meanings,** so it inherits its meaning problems.
- **Adds the worst contrast problem in the set.** At full opacity and 1.4 brightness, the white threads pass behind the lede, the "Keyingi qadam" line, the CTA pill and the file list on phones: 1.09–2.19:1.
  - They also erase the white focus ring (1.15).
  - Because they move, any text on the canvas can be hit at any moment.
- **Threads and text are the same colour (white).** The decoration competes with the content in exactly the channel the content uses.
- **Cards are safe:** they are opaque.

**Glass.**
- **State colours survive, but only where the art is unfrosted:**
  - the folder's back panel / tab strip;
  - the open section's top edge.
- **On the frosted front and on panels, every state reads as near-black.** The hero card is "dark navy", the result card "dark amber".
- **So in glass the state is carried by:**
  - the 30–60 px art strip;
  - the accent numerals;
  - the pill word.
- That is fine for contrast: every text pair passes. It also means glass depends on the words even more than flat does.
- **Drift:**
  - blue appears twice (hero + lesson-3 folder);
  - an extra blue `#8f99ff`;
  - lilac becomes the "open" state;
  - yellow prep art is reused for "your result";
  - nine new greys and twelve near-blacks;
  - the tab selection loses the strong lilac fill that flat has.
- **Glass does one thing better than flat:** open (lilac) and done (grey) differ.

**Shared by all three.**
- The gate: the photo headline (C8) and the loader LEDs.
- The prompt-done dimming (C6/C7).

---

## 5. Patterns

| Pattern | Option 2 / 3 | Glass | Consistency |
|---|---|---|---|
| **State pill** | 1px `currentColor` outline on the card's ink. Live = filled ink | same in `.gl-pill` / `.gf-pill`. Live = filled `#F5F5F7` | ✅ shape. ⚠ the live fill = the same look as action buttons |
| **Chips** | prompt done chip: filled black + lilac text / outline black | filled lilac + black / outline lilac. File status `.r-st`: `.12` white fill + accent ✓ | ✅ within each option. Glass has two chip styles |
| **CTA** | white outline pill + white circle; black circle on lilac | the same pill on `.05` frosted white; white circle | ✅ |
| **Links** | underline (nav current, PDF link, "Bekor qilish") | the same + `.gl-more`. The **placeholder** is lilac + underline | ⚠ G placeholder looks like a link |
| **Focus** | 2px white, offset 3; black inside lilac (`.gt-body`, `.s1`); `currentColor` in popup / toast | 2px white everywhere; folder = thicker rim + title underline | ✅ (except over threads) |
| **Errors** | `--danger` text + ⚠ + glow line, on a `.78` black strip | same (gate unchanged) | ✅. The loader LEDs reuse red |
| **Success / done** | grey card + ✓ "Bajarildi"; prompt number 30 % + filled chip; "Nusxalandi" + ✓ | grey art + ✓; `.r-st.done` fill; lilac chip | ⚠ three "done" looks per option. "Tayyor" vs "Bajarildi" for the same state (element-audit #14) |
| **Locked / disabled** | `#161616` card, `#9A9A9A` ink, lock + date | art none, `#8D8D92` ink, lock + date, sheets peek through blurred | ✅ meaning. ⚠ two greys |
| **Hover / pressed** | cards `brightness(1.07)`; pill `#111`; circles fill white/black | rows `.07` / `.1` white; circles fill white; glass tint lighter | ✅ no colour carries meaning on hover |
| **Selected tab** | lilac fill under the active tab, black text | `.17` white indicator | ❌ G too faint |
| **Progress** | yellow ring arc + "1/4" text; yellow result card | same ring; yellow numeral on prep art | ✅ the ring. ⚠ yellow overloaded |

---

## 6. Ranked fix list
Order: how much it misleads or blocks a student on a phone outdoors, then how many screens it touches.

### 1. Threads under text (option 3)
- **Problem:** white moving lines run behind body text, CTA labels, file rows and the focus ring at 1.09–2.19:1 (ring 1.15).
- **Why it hurts:** outdoors on a phone, the lede, the "Keyingi qadam" line and the file sizes disappear mid-read. The keyboard focus ring vanishes on the canvas.
- **Fix (pick one):**
  - **(a) cap the threads at 12 % opacity.** The brightest line becomes `#1F1F1F`: text-3 ≥ 4.8, text-2 ≥ 6.8, white and the ring ≥ 16.
  - **(b) keep full threads, but only where no text is** (masked out of the text column on phones).
  - 20 % is not enough: text-3 drops to 3.7.
- **2.0 check:** 2.0 had no animated background. No meaning is lost.

### 2. Yellow means prep, your result, the ring, and a finished prep
- **Problem:** in all options, the 0-dars card stays yellow at 4/4 and the lesson page's "Sizning natijangiz" is the same yellow. Glass even paints the result card with the *prep* art.
- **Why it hurts:** yellow reads "still to do". A finished item in it sends the student hunting for what is missing. "Your result" then looks like another prep task.
- **Fix:** `--you` = yellow, one meaning: *your progress* (the ring arc, the step-count card, your numerals). Yellow is never a lesson state.
  - The prep lesson takes the open colour while unfinished ("12-sentabrgacha · 3/4 qadam") and the done colour when finished ("Bajarildi · 4/4 qadam").
  - Glass: rename the `prep` recipe to `you`. Use it only on the step card. 0-dars gets `open` / `done` art.
- **2.0 check:** passes. 2.0 showed prep as a *word* ("{date}gacha"), never as a colour. This also matches the taste profile's own intent line, "yellow means you".

### 3. "Open" has a different colour in each option
- **Problem:** 2/3 paint open, done and live-in-list the same grey and use lilac for content. Glass paints open lilac and done grey.
- **Why it hurts:** the student can't scan "what's left" by colour in 2/3. Moving between options teaches the opposite rule.
- **Fix:**
  - `--state-open` = lilac: "work left". It covers the open lesson card, that lesson's tab panel and its prompt list.
  - `--state-done` = grey: finished. A done lesson's tab panel turns grey.
  - The live lesson in the list is lilac + a filled "● Hozir" pill.
- **2.0 check:** passes. The words "Ochiq", "Bajarildi" and "Hozir" stay on every card, so colour only adds to them.

### 4. Blue twice on the glass home, plus an off-palette blue
- **Problem:** the hero's blue art + lesson 3's blue folder art; the accent `#8f99ff`.
- **Why it hurts:** two "now" signals compete. The rule "blue once per screen" (tokens.md) exists for this.
- **Fix:**
  - The list folder for the live lesson uses `open` art + the filled "Hozir" pill.
  - Make `#8F99FF` a declared token, `--live-ink`: blue *text* on dark only. `#0A14FC` text is 2.52 on black, so a tint is required.
- **2.0 check:** passes (2.0: one live card).

### 5. Glass tab selection is invisible outdoors
- **Problem:** the indicator is 1.55–1.73:1 against the track, and the text is white vs `#CFCFD6`.
- **Why it hurts:** the student can't tell whether they are reading Slaydlar, Amaliyot or Vazifa. The only cue is a faint lighter pill.
- **Fix:** the selected tab is a lilac fill with black text (8.96), as in flat. It turns grey when the lesson is done.
  - Narrow screens: the label must fit inside the indicator. At 320 use 11 px with a 9.5 px sub-label; otherwise black text spills onto the dark track (1.45).
- **2.0 check:** 2.0 had separate lesson sub-pages, not tabs. No conflict.

### 6. A done prompt's number fades to 30 %
- **Problem:** 1.93 on lilac, 1.70 on glass.
- **Why it hurts:** "Keyingi qadam" points at a prompt by its number. A done row's number is unreadable in sunlight.
- **Fix:** 55 % in flat (3.66) and 60 % in glass (≥ 3.2). The ✓ "Bajarildi" chip carries the state.
- **2.0 check:** prompt done-state is new in 3.0. Not applicable.

### 7. Login headline over the bright photo
- **Problem:** 2.1:1 at 390. The label has a halo; the h1 has none.
- **Why it hurts:** the first screen; the student must read "Shaxsiy kabinet" and the field.
- **Fix:** on phones, a 55–60 % black scrim behind the form block, plus the label's halo on the h1. That gives ≥ 4.9.
  - The photo and colours are unchanged.
  - Desktop already passes (the form sits on the dark left).
- **2.0 check:** 2.0 also had a hero photo gate. No meaning change.

### 8. Red/green blinking LEDs on the welcome loader
- **Problem:** `#FF715E` (≈ danger) and `#17E300` strobe while "Xush kelibsiz" shows.
- **Why it hurts:** decoration that looks like data. Red blinking right after a login reads "something failed".
- **Fix:** LEDs in white and `--live-ink`. Red stays exclusive to errors. No green anywhere: "OK" = ✓ + word.
- **2.0 check:** passes (2.0 used a neutral orb).

### 9. Glass placeholder in lilac + underline
- **Problem:** `[bo‘lim nomi]` looks like a link.
- **Why it hurts:** the student taps it and nothing happens. This was already flagged as element-audit #7 for flat (fix A: no colour, no underline).
- **Fix:** text-1, semibold, brackets only.
- **2.0 check:** passes. 2.0 used plain [brackets].

### 10. Nine secondary greys, twelve near-blacks, two whites
- **Problem:** the sprawl listed in §1.
- **Why it hurts:**
  - no visible benefit;
  - locked text differs between options (6.43 vs 5.26);
  - future screens will pick at random.
- **Fix:** three text tokens:
  - `--text-2` `#A6A6A6`, which also becomes locked text (7.43 on `#161616`);
  - `--text-3` `#8A8A90`, data/meta only;
  - one glass override, `--text-2` = `#CFCFD6`.
- **Merges:**
  - `#9A9A9A`, `#8D8D92` → text-2;
  - `#8A8A8A` → text-3;
  - `#B9B9C1`, `#D9D9DE`, `#E6E6EA` → glass text-2 or text-1;
  - `#F5F5F7` → `#FFFFFF`;
  - glass near-blacks → `--surface-1` + one tint recipe.
- **2.0 check:** n/a.

### 11. A live status pill looks like a button
- **Problem:** the filled white (glass) or black (flat) "Hozir" pill has the same look as the popup's filled "Darsni ochish" button.
- **Fix:** status pills never carry an arrow and get a leading "●". Actions always carry an arrow or icon circle.
- **2.0 check:** n/a.

---

## 7. Proposed colour system

**Rules.**
1. Keep the brand palette: blue, grey, yellow, lilac on black.
2. One meaning per colour.
3. Every state is also a word, plus an icon where one exists.
4. A light fill always carries black text.
5. Blue is the only fill with white text.
6. Decoration never uses a state colour at full strength under text.

### Semantic tokens
| Token | Hex | The one meaning | Text allowed on it (ratio) | Flat card (2) | Threads (3) | Glass |
|---|---|---|---|---|---|---|
| `--surface-0` | `#000000` | page canvas | text-1 21 · text-2 8.63 · text-3 6.12 · danger 7.52 · live-ink 8.17 · you 13.68 · open 8.96 | canvas + 5 % grid + violet glow | canvas + threads ≤ 12 % (or masked from text) | canvas + glow (unchanged) |
| `--surface-1` | `#161616` | a raised neutral surface: locked card, sheet, menu | text-1 18.1 · text-2 7.43 · text-3 5.27 | locked card, sheet | same | smoked fill `#1B1924 → #0C0B11` (flat glass); tint `rgb(18 16 26 / .72 → .93)` over art |
| `--line` | `#3F3F3F` | decorative hairline | n/a (1.99) | nav rule, row rules | same | `rgb(255 255 255 / .14)` |
| `--line-ui` | `#595959` | the outline of a control that has no other cue | n/a (3.00) | tag pills | same | `rgb(255 255 255 / .42)` (4.09) |
| `--text-1` | `#FFFFFF` | primary text on dark | n/a | headings, body | same | the same (drop `#F5F5F7`) |
| `--text-2` | `#A6A6A6` (glass: `#CFCFD6`) | secondary text, locked text | n/a: 8.63 on black, 7.43 on `#161616`; glass ≥ 5.5 on art | lede, eyebrow, help, locked | same (needs the threads cap) | eyebrow, sub, meta, inactive tab, locked rows |
| `--text-3` | `#8A8A90` | data only (sizes, dates in Martian) | n/a: 6.12 on black, 5.27 on `#161616` | file meta | same | use `--text-2` (`#CFCFD6`) on glass |
| `--ink` / `--ink-2` | `#000000` / `#2E2440` | text on light fills / secondary text on lilac | 15.9 grey · 13.7 yellow · 8.96 lilac; ink-2 on lilac 6.21 | all light cards | same | text on the lilac selected tab, lilac chip |
| `--state-live` | `#0A14FC` | **now**: the live lesson. Once per screen as a fill | white only (8.34). Never black (2.52) | hero card | same | hero art `live` only |
| `--live-ink` | `#8F99FF` | blue as *text* on dark (numerals, ✓, LED) | n/a: 8.17 on black, ≥ 5.9 on blue art | (not needed) | (not needed) | section numerals / ✓ for the live lesson |
| `--state-open` | `#B4A1D1` | **work left**: open or live lesson in the list, unfinished prep, that lesson's tab panel and prompt list | ink 8.96 · ink-2 6.21. Never white (2.34) | lilac card; lilac tab panel; prompts section | same | `open` art (folder + section); `lilac` art for prompt cards; lilac numerals/chips; **selected tab fill** |
| `--state-done` | `#E0E0E0` | **finished** lesson, prep or step. Always ✓ + "Bajarildi" | ink 15.9. Never white (1.32) | grey card; a done lesson's tab panel | same | `done` streak art; grey ✓; done prompt may switch to `done` art |
| `--state-locked` | `#161616` | **not yet open**. Always lock + "{date}da ochiladi" | text-2 7.43 | dark card | same | no art; text-2 |
| `--you` | `#FDC959` | **your progress**: course ring arc, step-count card, your numerals. Never a lesson state | ink 13.68; as text on black 13.68 / on art 11.35 | ring arc; step card fill | same | ring arc; `you` art (= today's `prep` recipe) on the step card only |
| `--action` | `#FFFFFF` | something you press: circle + arrow, outline pill, square button | ink 21 | CTA pill/circle | same | same |
| `--focus` | `#FFFFFF` on dark, `#000000` inside light fills | keyboard focus, 2 px, offset 3 | n/a: 21 / ≥ 8.96 | as today | needs threads ≤ 12 % (else 1.15) | as today |
| `--danger` | `#FF6B5E` | error only. Always ⚠ + text | n/a: 7.52 on black, 6.48 on `#161616`, 5.84 on the photo strip | ID error | same | same |
| `--success` | (no colour) | "done / OK" = ✓ + word in the current ink | | | | |

**Decoration tokens (not signals):**
- the violet glow (`rgb(130 104 214 / .24)` …);
- the grid (`rgb(255 255 255 / .05)`);
- threads (white, ≤ 12 %);
- loader LEDs (white + `--live-ink`).

### What each option needs to adopt it
- **Option 2 (flat + glow).**
  - 0-dars: grey + "Bajarildi · 4/4 qadam" when done; lilac + "12-sentabrgacha" while not.
  - Lessons 1 and 3 become lilac cards; lesson 3 keeps the filled pill with "●".
  - A done lesson's dars tab panel turns grey.
  - The step card stays yellow, relabelled per element-audit #5.
  - Prompt done number at 55 %.
  - Locked ink `#9A9A9A` → `#A6A6A6`.
  - Loader LEDs recoloured.
  - Login scrim on phones.
- **Option 3 (flat + threads).** Everything for option 2, plus `opacity ≤ .12` in the `mountThreads` call (or mask the threads out of the text column). Without that, option 3 fails WCAG on every signed-in phone screen.
- **Glass.**
  - Rename the `prep` recipe to `you` and use it on the step card only.
  - 0-dars uses `open` / `done` art.
  - The lesson-3 folder uses `open` art + "● Hozir".
  - Section `--acc` per state: live → `#8F99FF`, open → lilac, done → grey, locked → text-2.
  - The selected tab gets a lilac fill + black text, with 11 px / 9.5 px labels under 300 px.
  - Placeholder in text-1.
  - Done prompt number at 60 %.
  - Locked `#8D8D92` → text-2.
  - Merge the greys and whites.
  - The login items above.

---

## 8. Open questions for the user
1. **Does "your result" keep yellow?**
   - The recommendation is **yes**, and prep loses yellow: it becomes "open" with its deadline word. That follows the taste profile's own line, "yellow means you", and 2.0's prep chip (a word, not a colour).
   - The alternative: yellow = prep, and "your progress" goes white (a white ring arc and a white step card). That keeps the 0-dars yellow card, but the yellow ring goes.
2. **Should "open" be lilac everywhere?** This is glass's mapping, and the recommendation.
   - It gives open ≠ done at a glance.
   - It changes a recorded flat rule: tokens.md says lilac appears only as the media panel and the prompt section.
   - The alternative is grey everywhere: flat's mapping. Glass would lose its lilac folder, and open vs done would differ only by word.
3. **Threads:** a 12 % cap (quiet, but nearly invisible) or masking (full threads, only in empty areas)? Either passes. They look very different.
4. **Done lesson cards are the brightest fill on the page** (`#E0E0E0`), brighter than the open lilac. That is a hierarchy choice, not a contrast failure. Keep the reference's grey, or dim done cards (e.g. a grey outline on `--surface-1`)? The second would break the "palette fills" look.
