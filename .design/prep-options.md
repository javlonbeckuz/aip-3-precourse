# Prep checklist (`#/dars/0`): 3 redesign options with animated object pictures

- Written 2026-10-17. Status: spec only, nothing built yet. The user picks one option, then it is ported into `proto_app.js` `prepPage()`.
- **User override for this screen only:** every item gets an animated picture of its object. This replaces the taste profile's "no illustrations, 150ms motion only" rule **on `#/dars/0` only**. Every other rule still holds (palette, fonts, no slop, WCAG 2.2 AA, 390/320 mobile).
- Read first: `reference-blueprint.md` §3 (lesson 0), `ux-spec.md` §2(d), `tokens.md`, and the current screen (`AI-Praktikum-3.0-final.html#/dars/0`).

---

## 0. Shared: what never changes (2.0 parity + 3.0 spec)

**Header (black, as now):** the nav (home circle, centred wordmark "AI Praktikum 3.0", name "Dilshod Rahimov" + menu button on phones), the back link "← Dastur", the meta "0-dars · tayyorgarlik · {d}/4 tayyor" (live count), H1 "Birinchi darsgacha", the lede "Birinchi dars 12-sentabr. Hammasi 30 daqiqacha vaqt oladi.", and the "Qoʻllanma" group with one file row: `prep-uz.pdf` · "PDF yuklab olish" plus the 40px download circle.

**The 4 items. Copy is exact; the keys are in `i18n_uz.json`:**

| # | Title | Note | Steps (with the `NAMUNA` tag, still placeholders) | Actions | Foot |
|---|---|---|---|---|---|
| 01 | Kompyuter | MacBook, kamida 5 GB boʻsh joy. | Boʻsh joyni tekshiring · Yangilanishlarni oʻrnating | none | none |
| 02 | Google akkaunt | Google akkauntingiz boʻlishi kerak. | Akkauntga kirib koʻring | none | none |
| 03 | Claude | Akkaunt va desktop ilova. | Ilovani yuklab oling · Akkauntga kiring | **Claude dasturini yuklash** ↗ (primary, `claude.ai/download`) · claude.ai da hisob ochish ↗ (quiet, `claude.ai`) | none |
| 04 | Visa karta | Claude Pro uchun kerak ($20). Uzcard va Humo ishlamaydi. | none | none | Keyingi darslarda kerak boʻladi. |

**Behaviour, the same in all three options:**
- Each item is an accordion. Its header is `button[aria-expanded]` holding the number, the title and the note. The steps, actions and foot show only when the item is open.
- On load, the first unchecked item is open and the others are closed. At 4/4 nothing is open.
- Check-off reuses the existing chip: outline "Bajarildi deb belgilash", which becomes filled "✓ Bajarildi". It is a `button` with `aria-pressed`, and its accessible name stays "Bajarildi deb belgilash"; only the pressed state changes. It sits outside the header button, so no control is nested inside another. Its hit area is 44px via `::after`.
- Checking an item collapses it, opens the next unchecked one, and moves focus to that item's header button. It updates the meta count and announces "Kompyuter bajarildi · 2/4 tayyor" through the existing live region.
- Unchecking reopens that item. There is no toast: the chip itself is the undo.
- Primary action: the open item's first action. Only Claude has actions, so its "Claude dasturini yuklash" is the one primary pill on the page. "claude.ai da hisob ochish" stays a quiet underlined link. Both open in a new tab with `rel="noopener noreferrer"` and a sr-only "(yangi oynada)".
- No new sections, flows, copy or data. Every string already exists.
- Note: today's build shows all four items expanded (no accordion). The ux-spec behaviour above is the target, so each option restores it.

---

## 1. Shared illustration art rules (all options)

**Style:** flat inline SVG with thick, confident blocks, matching the flat-block look of the Dribbble reference.
- Fills come only from black `#000`, blue `#0A14FC`, grey `#E0E0E0`, yellow `#FDC959`, lilac `#B4A1D1` and white.
- Outlines are black, a uniform 6 units in a 240-unit box (scale with the viewBox, `vector-effect` off). Corner radii are 6 to 14 units, never sharp.
- No gradients, shadows, blur, glow, particles, HUD, grid, glitch, typing effect, 3D tilt or perspective, mascots, faces or avatars (an account is shown as an envelope or a sign-in panel, never a person).
- **No fake data:** no fake e-mail, card number, name or chat text. Text-like content is drawn as grey or black bars. The only real text allowed inside an SVG is **"5 GB"** (laptop) and **"$20"** (Visa), both taken from the item notes, set in Martian Mono 500.
- **Recognition comes from the silhouette:** a MacBook (thin lid, wide base with a notch lip), the Gmail M-envelope, the Claude spark and the "VISA" wordmark (Mona Sans Expanded 700 italic, white, on a blue card). Brand-colour rules are set per option below and stay inside the mark.
- **The Claude spark is the only asterisk-like shape allowed.** It is the brand mark (the taste profile bans ✱ *decoration*). Draw it with its irregular rays. It never spins and never acts as a loader.

**Motion:**
- Animate only `transform` and `opacity`, in CSS `@keyframes` on SVG groups (`transform-box: fill-box; transform-origin` set per group).
- Calm loops run 4 to 8s, `cubic-bezier(.45,0,.55,1)` (ease-in-out), with a hold of at least 40% of each loop. State one-shots run 300 to 700ms on `--ease` `cubic-bezier(.2,0,0,1)`. Exits run 200ms ease-in. Nothing bounces more than twice, and nothing flashes.
- **Only one thing loops at a time: the open item's picture.** Done items and closed items show their static **final frame**.
- **Author every SVG at its final frame**, so the static markup is the finished picture. Keyframes animate *from* offset values. Reduced motion and no-JS then show the right image for free.
- **Pausing:**
  - An `IntersectionObserver` (threshold 0.2) toggles `.is-on` on each picture. Without it, `animation-play-state: paused`.
  - A `visibilitychange` listener pauses all pictures while the tab is hidden.
  - A one-shot fired while its picture is off-screen is queued and plays when the picture enters the view.
- `@media (prefers-reduced-motion: reduce)`: `.ill *, .ill { animation: none !important; transition: none !important }`. State changes swap instantly to the final frame.

**Done treatment (all options):** on check, the loop stops and the picture eases to its final frame (≤300ms). Then a 28-unit black circle with a white ✓ (`#i-check`) pops in at the picture's top-right (scale .6 → 1, opacity 0 → 1, 250ms `--ease`). The ✓ badge is decoration. The state is carried by the chip text "✓ Bajarildi".

---

## 2. Option A: "Illustrated list" (smallest change)

The current lilac editorial list stays. Each row gains a square, yellow picture tile. It reads as the same screen, now with pictures.

**Layout 1440** (desktop scale is in `u`):
- Header unchanged.
- Full-bleed lilac `.s1`: eyebrow "Tayyorgarlik · 4 ta band", the rule line, a 1.5px black top rule, list max-width 1100u.
- Row grid: `150u | minmax(0,1fr) | 200u`, gap 40u.
  - Column 1: the numeral (Mona 400, 96u).
  - Column 2: the header button (title 21u uppercase, note 15u 500), the chip, and the body when open: steps, then the actions (primary = ink pill: 1px black outline, height 56, black 44 circle with a lilac ↗), then the foot.
  - Column 3: the tile, 200u square, top-aligned, radius 15.
- Collapsed row height = the tile (200u) + padding 26/30.

**Layout 390:** line 1 is the 40px numeral (left) plus an **88px tile** (right), in the slot the copy circle uses on prompt rows. The title, note, chip and body span the full width below. Rows are separated by 1px `rgb(0 0 0/.3)`. The tile never shrinks below 88px; at 320 it holds and the text reflows.

**Tile:** yellow `#FDC959` fill (lesson 0's identity colour), no border, the picture inset 12%.

**Brand marks: redrawn in palette, black on yellow.** At 88 to 200px the four Gmail colours turn into confetti, and Google yellow disappears on `#FDC959`. Silhouette plus the title beside it carries recognition, and this option stays the closest to the taste profile.

**Pictures (viewBox 240×240):**

| Item | Shapes | Loop (open item only) | Final frame |
|---|---|---|---|
| 01 Kompyuter | MacBook front view: black lid frame, blue `#0A14FC` screen, grey base slab with a black lip. On screen: a white storage bar (10 cells), 8 cells black (used), 2 cells white with "5 GB" in Martian white above them | 6s: the 2 free cells scale X from 0 → 1 (origin left, 700ms), hold, fade back to 0 at 90% | bar full, "5 GB" visible |
| 02 Google akkaunt | A white envelope, 6u black outline, with the M drawn as two black flap strokes (Gmail silhouette). Behind it, a grey sign-in panel with two black bars and one blue pill | 6s: the flap scales Y from 1 → -1 around its top edge (opens, 500ms); the panel rises 18u from the envelope (opacity 0 → 1); hold 2.5s; reverse | flap open, panel up |
| 03 Claude | A dock bar (grey, radius 10) at the bottom with 3 white app squares; the middle one is black with the white Claude spark. Above it, an app window (white body, black title strip, 3 grey bars) | 7s: the spark icon hops −14u twice (200ms each, ease-out up / ease-in down); the window scales .9 → 1 from the icon's position, with opacity; hold 3s; window fades | window open |
| 04 Visa karta | A blue card (radius 12) with a yellow chip square, white "VISA" italic wordmark and 2 white bars. A white price tag with a black string, reading "$20" | 5s: the tag swings rotate(−6deg ↔ 4deg) from its string point, ease-in-out; the card stays still | tag at 0deg |

**State:**
- Open row: the tile loops.
- Closed and done rows: final frame. Done rows also get the ✓ badge, and their numeral dims to 55% (the existing rule).
- Checking an item: the ✓ badge one-shot, then the next row opens (no height animation, as today).

**Skills to load:** `redesign-existing-projects` (audit-first, keep `.s1`), `minimalist-ui`, `animate`, `animation-vocabulary`, `anti-ui-slop`, then the gates `design-critique`, `accessibility-review`, `ux-copy`.

**Risks:**
- Yellow on lilac is a low-luminance pair (1.53:1): both are pastel. It works as a hue contrast, but if it reads muddy in review, fall back to a black tile with the same picture on a yellow inner ground.
- Four 200u tiles make the list longer (+~240u in total). Acceptable.
- It is the least "new" of the three. The user may find it too close to today's screen.

---

## 3. Option B: "Desk scene" (scene = progress)

One sticky picture of a desk that **assembles as items are checked**. The checklist is the control and the scene is the reward. It replaces "4/4" as the emotional progress, while the meta count stays.

**Layout 1440:** the lesson-page hero grid, `636u | 688u` (gap per `.hero`, sides 66/50), on black.
- **Left:** the header (back, meta, H1, lede, Qoʻllanma file row), then the checklist on black.
  - Rows are ruled with `--line`. Numerals are white Mona 400, 64u. Titles are white, 22u uppercase; notes text-2.
  - Primary action: the white `.pill-cta` with ↗.
  - Chip on black (new pattern, add it to `tokens.md`): filled white with black text "✓ Bajarildi", or a 1.5px white outline with white text "Bajarildi deb belgilash".
- **Right:** the scene panel, a yellow flat card, radius 32u, 688×560u, `position: sticky; top: 32u`, starting level with the back link.

**Layout 390:**
- The header comes first. Then the scene, full width, radius 24, aspect 4:3 (358×268). It is **not sticky** (sticky would take a third of the phone screen).
- Then the checklist.
- One-shots fired while the scene is off-screen are queued and play when the user scrolls back up (shared rule).
- At 320 the scene keeps 4:3, and the SVG scales with the viewBox.

**Brand marks: true brand colours as tiny accents, inside the laptop screen only.**
- Gmail M: `#EA4335 #4285F4 #34A853 #FBBC04 #C5221F`, on a white tile.
- Claude spark: `#D97757`, on a white app icon.
- Why: the scene depicts the student's real Mac, and the true icons are what they will look for on their own screen. Each accent is ≤ 24 units, sits on white (never on the yellow ground), and covers ≤ 2% of the scene.

**Scene (viewBox 688×560), yellow ground:**
- **Desk:** a black slab, y 440 to 466, full width. Below it, two black legs 20u wide. This is the only furniture.
- **Ghost slots:** every object not yet done is drawn as a 3u dashed black outline at 35% opacity in its final position. This is how the scene shows what is still missing.

| Layer | Final frame | One-shot on check (enter) | Idle loop (only while it is the most recently placed layer) |
|---|---|---|---|
| 01 Laptop | A centred MacBook, 380u wide: black lid frame, blue screen, grey base on the desk. On screen, top-right: the storage bar + "5 GB" (as in A) | Rises 28u → 0 + opacity, 600ms `--ease`; then the free cells fill (400ms, 150ms delay) | 8s: the free cells pulse opacity 1 → .6 → 1 once per loop |
| 02 Google | Left half of the screen: a white window with the Gmail M tile, 2 grey bars and a blue sign-in pill, plus a small black ✓ on the pill | The window slides up 16u + opacity (450ms), then the pill's ✓ pops (250ms) | 6s: the envelope flap opens and closes (as in A, scaled) |
| 03 Claude | A dock strip at the bottom of the screen (3 white icons; the middle one is white with the terracotta spark) and, on the right half of the screen, a white Claude window with a black title strip | The dock icon hops twice (−12u, 2×200ms), then the window scales .9 → 1 from the icon (400ms) | 7s: one block of 3 grey reply bars slides up 8u + fades in as one block (not line by line), holds, fades |
| 04 Visa | A blue Visa card lying on the desk, right of the laptop, rotated −4deg, with the "$20" tag | Slides from translateX(140u) rotate(−10deg) → its final pose, 700ms `--ease` | 5s: the tag swings ±4deg |

**State:**
- The open item's ghost slot breathes (opacity .25 ↔ .5, 4s ease-in-out). That breathing is the "this goes here" cue, and the only loop besides the latest layer's idle loop.
- Unchecking plays the layer's exit (opacity → 0 + 12u down, 200ms ease-in) and puts the ghost back.
- Layers are independent: the screen layers can sit inside a ghost laptop.
- At 4/4 the scene is complete and still, except the Visa tag idle. There is no celebration effect.
- The scene panel carries `aria-hidden="true"`; the checklist holds all meaning.

**Skills to load:** `motion-design` (choreography and staging of the 4 layers), `animate`, `emil-design-eng` (interruptible state transitions: a fast check, then uncheck mid-animation, must not jump), `design-taste-frontend` (two-column composition), `anti-ui-slop`. After building: `review-animations`, `design-critique`, `accessibility-review`, `ux-copy`.

**Risks:**
- The most complex option: 4 layers × (enter, exit, idle) + ghosts. Interrupt handling needs care (use CSS transitions on classes, not chained timeouts).
- On phones the scene scrolls away while the student checks items lower down, so the reward is delayed. That is mitigated by the queued one-shots.
- Brand colours are an exception to the palette; keep them strictly inside the screen.
- The sticky panel must never cover focus (2.4.11). It sits in its own column, so this is fine at ≥900px.

---

## 4. Option C: "Flat block cards" (reference style, horizontal accordion)

The four items are four big yellow flat blocks in one row, in the reference card look. The open card widens to show its steps, and the picture is large in each.

**Layout 1440:**
- Header unchanged.
- Below it, on black, one row of 4 `.folder.flatc` cards (flat card: radius 15, no tab, per the usage rule). Sides 66u, gap 16u, height 600u.
- `grid-template-columns`: the open card gets `2fr` and the others `1fr` (≈ 504u vs 252u). At 4/4 all four are `1fr`.
- Card padding is `31 27 34` (the folder padding). Contents, top to bottom:
  - the label "01" + title (card title 22u, uppercase, 2 lines);
  - the picture: closed = 200u square; open = 300u square, aligned left;
  - the note (15u 500);
  - when open: the steps, the actions (primary = ink pill with a black circle and yellow ↗; secondary = underlined), and the foot;
  - at the bottom-left: the chip. At the bottom-right of done cards: the existing `.f-note` "✓ Bajarildi".
- The whole card is not a button. The header button (number + title + note) is the accordion trigger. A closed card gets `cursor: pointer` and forwards the click on its empty area to the header button (no second tab stop).

**Layout 390:**
- The cards stack in one column, full width, gap 16.
- **Closed card:** min-height 160. Left: the number, title and note. Right: a 112px picture.
- **Open card:** the picture moves to the top as a 220px-tall band (the picture centred at 200px), then the title, note, chip, steps and actions.
- At 320 a closed card's picture drops to 88px.

**Card colour: all four are yellow** (lesson 0's identity colour, black ink, 13.68:1).
- State is not shown by colour (the 2026-10-16 rule); it is the chip and the `.f-note`.
- The row still reads multi-colour, because each picture's dominant block differs: the laptop is black and blue, Gmail white, the Claude window black, and the Visa card blue.

**Brand marks: true brand colours, but only on a white plate** (the envelope or the app icon), so no brand colour ever touches the yellow card.
- Why: the marks are drawn large (up to 300u). A palette-only Gmail at that size reads as a knock-off, and a big true mark is instantly recognised.
- Accent hexes as in B.

**Pictures (viewBox 300×300, larger and more detailed than A):**

| Item | Shapes | Loop (open card only) | One-shot on open |
|---|---|---|---|
| 01 Kompyuter | A MacBook in 3/4-free front view (still flat, no perspective): black lid, blue screen, grey base. On screen, a storage window: a white panel with a 10-cell bar and "5 GB" | 6s: the free cells fill from the left, hold, then reset with a 300ms fade | the lid group rises 16u + opacity, 500ms |
| 02 Google akkaunt | A large white Gmail envelope with the true-colour M, with a grey sign-in card tucked behind it holding a blue pill | 6s: the flap opens (scale Y 1 → −1), the card rises 24u, a black ✓ appears on the pill, hold, reverse | the envelope drops in from −20u, 450ms |
| 03 Claude | A black app window (radius 14) with a white body. Left: a white app icon with the terracotta spark. Right: one block of 3 grey reply bars | 7s: the reply block slides up 8u + fades in as one block, holds, fades | the window scales .92 → 1 from the icon, 400ms |
| 04 Visa karta | Two grey generic cards behind (each with one black bar, no logos, no text) and a blue "VISA" card sliding over them; the "$20" tag | 6s: the Visa card slides 0 → 18u right, revealing the grey cards, then back (the grey cards = "other cards"; the note's text says which ones) | the Visa card slides in from 60u right, 600ms |

**State:**
- Opening a card switches the grid columns **instantly**, with no width animation (layout animation breaks the transform/opacity rule and janks text reflow). The picture inside then plays its one-shot, which makes the change feel animated.
- Closed cards: static final frame.
- Done cards: final frame + the ✓ badge + `.f-note` "✓ Bajarildi".
- Checking a card collapses it to `1fr` and opens the next.

**Skills to load:** `design-taste-frontend` (reference-literal block layout), `impeccable` (polish pass on the cards), `animate`, `motion-design`, `anti-ui-slop`. After building: `review-animations`, `design-critique`, `accessibility-review` (the horizontal accordion and focus order), `ux-copy`.

**Risks:**
- An open Claude card (2 steps + 2 actions + a 300u picture) must fit 504u × 600u. Verify at 1440 and at 900 (the narrowest desktop). If it does not fit, drop to a 2×2 grid at 900 to 1199px.
- Four yellow blocks in one row are heavy next to the black header. The pictures carry the variety.
- Closed cards at 252u hold the note at 15u in up to 4 lines. Check RU, which runs about 25% longer.
- This is the biggest visual departure from the rest of 3.0 (no lilac list here).

---

## 5. Accessibility (all options)

- **Pictures:** each is an inline `<svg aria-hidden="true" focusable="false">` with no `<title>`. They are pure decoration, and the text already says everything. "5 GB" and "$20" in the SVG duplicate the note.
- **Contrast pairs used:**
  - ink on yellow 13.68
  - ink on lilac 8.96
  - ink-2 on lilac 6.21
  - white on black 21
  - text-2 on black 8.63
  - chip: black fill with lilac text 8.96, black fill with yellow text 13.68, or (B) white fill with black text 21
  - pill outlines: black on light 8.96 or more, white on black 21
  - dimmed done numeral: 3.66 on lilac (large text only)
- **Focus:** 2px outline, offset 3. It is white on black and black on lilac and yellow (`.s1 :focus-visible` already does this; add the same for C's cards). After a check, focus moves to the next item's header button. Nothing sticky covers focus.
- **Targets ≥ 44px:** header buttons (whole row), chips (via `::after`), pills (56), quiet links (`min-height: 44px`), and the download circle (40 visible, 44 hit area).
- **Semantics:** `ol` > `li`; header `button[aria-expanded][aria-controls]`; the body region gets `id` + `hidden` when closed. Use `lang="uz-Latn"`, and render ʻ/ʼ as ‘/’ in display (the existing `T()` helper rule).
- **Motion:** reduced motion = static final frames. Loops are ≥ 4s, with no flashing (≤ 3/s, never). Everything pauses off-screen and in hidden tabs.
- **Check at:** 1440, 900, 390, 320, and at 200% zoom.

---

## 6. File contract (for the frontend agent)

- **Output:** three standalone files: `.design/comp/prep-a.html`, `prep-b.html` and `prep-c.html`. Vanilla HTML, CSS and JS: no libraries, no build step, no fetch. They must work when double-clicked (`file://`).
- **In-situ fidelity:** copy from `.design/comp/index.html`, verbatim:
  - the Google Fonts `<link>` (lines 8 to 10);
  - the `:root` block;
  - the reset;
  - `.site` + `--u` (the container query; wrap the page in a `.frame` with `container-type: inline-size`);
  - `.nav*`, `.home-btn`, `.wordmark`, `.nav-name`, `.menu-btn`, `.dl-h`, `.eyebrow`, `.headline`, `.ex-h`, `.ex-wrap`, `.lede`, `.ex-files`, `.ef-*`, `.ns`;
  - for A, also `.s1*` + `.chip`; for B, also `.hero` column values; for C, also `.folder.flatc` + `.f-note`;
  - the background grid of `.site`;
  - the sprite symbols `i-home`, `i-menu`, `i-back`, `i-down`, `i-ne`, `i-check`, `i-next`.
  Do not restyle anything outside the checklist area.
- **Copy:** hard-code the Uzbek strings from §0 with the display substitution already applied (‘ ’). Keep the `NAMUNA` tags on the steps.
- **Demo state:** a comp-only bar above the frame (the `.comp-bar` style) with the buttons `0/4 · 1/4 · 3/4 · 4/4` and `390 / 1440`. The default is 1/4 (Kompyuter done, Google open). There is no persistence.
- **Structure:** one `<svg class="ill">` per picture (B: one scene SVG with `<g>` layers). CSS keyframes sit in one `<style>` block, grouped per item. JS stays under ~120 lines: accordion, chip toggle, count + live region, the IntersectionObserver / visibility pausing, and the one-shot queue.
- **New patterns to record in `tokens.md` once an option is chosen:**
  - A: the yellow picture tile.
  - B: the chip on black and the sticky scene panel.
  - C: the horizontal card accordion and the ink pill on yellow.
  - All: the `.ill` motion rules (from §1).
