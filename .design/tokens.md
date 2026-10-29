# Design tokens: AI Praktikum 3.0 (literal reference match)

- **Source:** `ref-dribbble/01-hero-flat.png`, measured on its 1440px frame. The user chose a literal match of its palette and layout on 2026-10-15.
- The canonical CSS is the `:root` block in `comp/index.html`. A new pattern is added here first.

## Scale unit
- On desktop (container ≥ 900px), every layout dimension is written as `calc(N * var(--u))` with `--u: calc(100cqi / 1440)`, so 1 u = 1px at a 1440 frame and proportions hold at any width.
- Body text is clamped with `max(15px, 18u)` so it never shrinks below readable.
- Mobile (< 900px) uses plain px.

## Color
Brand palette (unchanged): blue, grey, yellow and lilac on black. **Each lesson has ONE fixed identity colour, whatever its state** (2026-10-16, user decision: three lilac cards looked identical). **State is never carried by colour: it is a word plus an icon** (✓ Bajarildi · n/n qadam, Ochiq · n/n qadam, ● Hozir davom etmoqda · n/n qadam, 🔒 date). A light fill always carries black text; blue and the dark identity colour carry white text.

| Token | Hex | The one meaning | Text allowed on it (contrast) |
|---|---|---|---|
| `--surface-0` / `--black` | `#000000` | page canvas | white 21 · text-2 8.63 · text-3 6.12 · danger 7.52 · you 13.68 |
| `--surface-1` | `#161616` | a raised neutral surface: locked card, sheet | white 18.1 · text-2 7.43 · text-3 5.27 |
| `--line` | `#3F3F3F` | decorative hairline (nav rule, row rules, menu and toast borders) | n/a |
| `--line-ui` | `#595959` | the outline of a control that has no other cue (tag pills) | 3.0 as a UI part |
| `--text-1` | `#FFFFFF` | primary text on dark | |
| `--text-2` | `#A6A6A6` | secondary text and **locked text** (lede, eyebrow, help, locked card) | 8.63 on black, 7.43 on `#161616` |
| `--text-3` | `#8A8A90` | **data only**: file sizes, dates in Martian | 6.12 on black, 5.27 on `#161616` |
| `--ink` / `--ink-2` | `#000000` / `#2E2440` | text on light fills / secondary text on lilac | ink on grey 15.9, on yellow 13.7, on lilac 8.96; ink-2 on lilac 6.21 |
| `--state-live` = `--blue` | `#0A14FC` | **lesson 3's identity colour** and the colour of the home hero (the live lesson takes its own identity colour, so hero and card always match) | white only (8.34). Never black (2.52) |
| `--state-open` = `--lilac` | `#B4A1D1` | **lesson 1's identity colour** (card, tab folder) and the full-bleed prompt section (`.s1`) | ink 8.96, ink-2 6.21. Never white (2.34) |
| `--state-done` = `--grey` | `#E0E0E0` | **lesson 2's identity colour**. Not a "done" colour any more: done = ✓ and the word "Bajarildi" | ink 15.9. Never white (1.32) |
| `--state-locked` = `--surface-1` | `#161616` | **lesson 4's identity colour**. While locked: text-2 ink, lock and the date (the "locked look"). Once unlocked: the same dark fill with white ink | text-2 7.43, white 17.6 |
| `--you` = `--yellow` | `#FDC959` | **lesson 0's identity colour** (prep) and **your progress** (the course ring arc and its note). | ink on it 13.68; as text on black 13.68 |
| `--danger` | `#FF6B5E` | errors only: the ID error's underline and its ⚠ icon (the message text itself is white with a dark halo), always with ⚠ and text | 7.52 on black |
| action | `#FFFFFF` | something you press: circle + arrow, outline pill, square button | |

Decoration (not signals): the loader LEDs. Green is never a status colour: "done / OK" is a ✓ and a word. The one green on screen is emerald #0B7A55, the fixed identity colour of lesson 6 (white ink at full opacity); it never means success or done. Lesson 5 is orange #FF7A2F with black ink.

**Lesson identity colours** (home cards, the lesson page folder, the glow behind them): lesson 0 yellow (ink black), lesson 1 lilac (black), lesson 2 grey (black), lesson 3 blue (white), lesson 4 dark `#161616` (text-2 while locked, white once unlocked), lesson 5 orange `#FF7A2F` (black), lesson 6 emerald `#0B7A55` (white, full opacity for subtitles and notes too). Every card is a different colour in every state; the colour never changes. State is the note in the card's corner: prep "12-sentabrgacha · 3/4 qadam" while unfinished; "✓ Bajarildi · n/n qadam" when done; "Ochiq · n/n qadam" when open; "● Hozir davom etmoqda · n/n qadam" when live (a quiet dot, never a filled pill: a filled pill looks like a button); "🔒 28-noyabrda ochiladi" when locked. The hero card ("Hozir davom etmoqda") takes the identity colour of whichever lesson is live (lesson 3 in the demo, so it is blue like the card below it); its ink follows the colour (white on blue and dark, black on yellow, lilac and grey). Code: `LCOL` in `proto_app.js`.

**Lilac rule:** lilac is lesson 1's identity colour (its card and tab folder) and the prompt-section background. It is not a state colour. It also appears as a dimmed ambient glow behind lilac elements; that is decoration, not a signal.

**Greys:** only the tokens above exist. Merged away: `#9A9A9A`, `#8D8D92` and `#8A8A8A` (now text-2 or text-3), `#D9D9DE` (text-1), `#1C1C1F` (line), `#111` (surface-1), `#595959` as popup text (ink-2).

## Type
```
--font-display: 'Mona Sans', 'Roboto Flex', sans-serif;  /* always font-stretch:125% */
--font-body:    'Golos Text', system-ui, sans-serif;
--font-mono:    'Martian Mono', ui-monospace, monospace;  /* data only */
```
Google Fonts families:
- `Mona+Sans:wdth,wght@75..125,200..900`
- `Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000` (Cyrillic fallback)
- `Golos+Text:wght@400;500;600`
- `Martian+Mono:wdth,wght@87.5..100,400..500`

| Token | Face | Desktop (1440) | Mobile | Style |
|---|---|---|---|---|
| headline | display 500 | 88 / lh 104 | `clamp(34px, 10.4cqi, 46px)` / 1.18 | UPPERCASE, -0.01em |
| panel numeral | display 400 | 200 | 120 | lh .85 |
| card numeral | display 400 | 78 | 64 | lh .9 |
| panel title | display 500 | 34 | 22 | UPPERCASE |
| card title | display 500 | 22 / lh 1.36 | 19 | UPPERCASE, 2 lines |
| wordmark | display 500 | 22 | 16 | sentence case |
| body / nav / CTA | Golos 400 | 18 | 17 | |
| label / tag / card label | Golos 500 | 15 | 13 | UPPERCASE, 2 lines on cards |
| data (ID, prompt, target, sizes) | Martian | 18 ID, 13 prompt (stretch 87.5%), 10–11 tab target | same | |

**Uzbek apostrophes:**
- Render U+02BB as U+2018 and U+02BC as U+2019. Mona Sans has neither source glyph, and Golos and Martian lack U+02BB.
- Copy returns the raw text.

## Layout (desktop, 1440 frame)
| Element | Value |
|---|---|
| Nav | height 120, padding `0 49 0 66`. Grid `1fr auto 1fr`: 3 text links (gap 48) · centred wordmark · name + square button. Hairline below. |
| Home hero | padding-top 62, sides `66 / 61`. Two columns `1fr | 560` (gap 40). The home has no greeting: the progress ring (180) and the "Keyingi qadam" row sit left, centred against the blue hero card (min-height 340), which sits right. |
| Lesson-page hero | padding-top 62, sides `66 / 50`. Columns `636 | 688`: left = back link, meta line, headline, lede, CTA pill, play link; right = the gooey tab folder (`align-self:start`, min height 480, grown by its tallest pane). |
| Lesson grid (home) | **12 columns**, gap 16 / row gap 28: lessons 0, 1, 2 span 4 each (3 per row), lessons 3 to 6 span 3 each (4 per row), so the grid is always full. No lower row, no tag stack. |
| Card sizes | Folder body min-height 260 (mobile 196), rise 21 (mobile 16). Phones: one column, in order 0 to 4. |
| Mobile | One column. Gutters 16, block gap 24–32. Nav 64 (wordmark, square button, menu). |

## Components
| Token | Desktop | Mobile | Spec |
|---|---|---|---|
| **Folder-tab card** `.folder` | 340 × 252 (rise 21 + body 231) | full width, min body 196, rise 16 | See the card details below. |
| **Prompt card** `.pcard` | rise 30 | rise 28 | Tab text = paste target, Martian 10–11 uppercase, `→` separators. Copy = 44 outline circle (fills with ink when copied). Mark-done = native checkbox, `accent-color: ink`. Prompt well = `currentColor` 9%. |
| ~~Lilac panel + inverted notch `.panel`~~ | removed from the comp (the lesson page uses the gooey tab folder) | | |
| **Outline pill CTA** `.pill-cta` | 486 × 60, 1px white, radius 999 | full width × 56 | Label 18 left. White circle 52 (44 mobile) with black →. The ID input uses the same pill with an `AIP-` prefix in Martian. |
| **Play link** `.play` | 44 circle + two-line 18px label | same | Solid white circle (black on the lilac panel), or a 1px white outline circle for secondary actions. |
| **Tag pill** `.tag` | h 44, padding 0 33, 1px `#595959` | h 40 | Radius 999, 15px UPPERCASE. |
| **Square button** `.btn-sq` | 147 × 47, radius **0**, white fill, black text | h 40 | Exactly one per screen, in the nav. |

**Folder-tab card details:**
- Body radius 15 with a square top-right corner.
- The tab is a real element, right-aligned, `min-width: 35%`, 1px overlap into the body.
- Ramp: a fixed-ratio SVG (`viewBox 0 0 28 21`), height = rise, width = rise × 28/21, so it is never stretched.
- Padding `31 27 34`.
- Top: a 2-line uppercase label on the left and a thin ↗ (34) on the right.
- Bottom-left: ONE huge element, either a numeral or a 2-line title.

**Notch details:**
- The notch is a black block with a bottom-left radius.
- Its two convex fillets are R×R squares carrying `radial-gradient(circle at 0 100%, transparent R, #000 R)`.
- The notch holds an uppercase meta label in white.

## Radii
| Element | Radius |
|---|---|
| Card | 15 (mobile 14) |
| Panel | 32 (mobile 24) |
| Pills | 999 |
| Square button | 0 |
| Prompt well | 10 |

## Motion
- 150ms `cubic-bezier(.2,0,0,1)`.
- Hover effects:
  - Cards: brightness 1.07.
  - Pill: the circle nudges 2px.
  - Play circle: scale .96.
- Nothing loops.
- `prefers-reduced-motion` turns it all off.

## Focus
- 2px white outline, offset 3, on every interactive element.
- The pill field shows its focus outline on `:focus-within`.

## Usage rule (user, 2026-10-15)
- **The folder-tab card is used ONLY on the main page lesson list:** Dars 0–6 (the hero card and everything else use the flat card). It is used nowhere else.
- **Other screens use the flat card** (`.folder.flatc`): the same fills, radius 15 on all corners, no tab. This covers the lesson resources.
- **Login is minimal:** headline + pill ID input + help link. No folder, no notch panel. A separate reference for it is pending.
- **Prompt sections = full-bleed lilac, editorial numbered list; copy = done** (user decision, 2026-10-15; design 1 in `comp/prompt-options.html`).
  - Lilac `#B4A1D1` is the "work left" state colour (see Color above); the prompt section is its full-bleed use.
  - The section runs full width under the black page header. The file list stays above it, on black, as a quiet list.
  - Layout:
    - Eyebrow "Promptlar · N ta" in `--ink-2`, then the rule line "[Qavslar] ichini oʻzingiz toʻldirasiz.", then a 1.5px black top rule.
    - Rows are separated by 1px `rgb(0 0 0 / .3)`.
    - Desktop row grid: `150px | 1fr | 56px`, with the number Mona Sans 400 at 96px.
    - Mobile: the 40px number and the copy circle share the first line, and the body spans the full width below.
  - Type, all black on lilac:
    - Title: Mona Sans Expanded 500 UPPERCASE, 17px mobile / 21px desktop.
    - Target: one grey line, Golos 14px, `#2E2440` (6.2:1).
    - Prompt: Golos Text 400, 17px mobile / 20px desktop, line-height 1.6, max 62ch (9:1).
    - Placeholder: bold with its brackets, plain text colour, no underline and no fill (it must not look like a link); a line above the list explains it.
  - Copy: a 48px (desktop 56px) circle with a 1.5px black outline. Hover/copied: black fill with a lilac icon; the icon flashes ✓ for 1.5s.
  - Copying marks the prompt done: a "Bajarildi" chip under the title, and the number dims to 55% opacity. Copy returns the raw ʻ ʼ.

## Patterns added 2026-10-16 (UX audit pass; canonical CSS in `comp/index.html`)
- **State note `.f-note`** (lesson cards): a calm note at the bottom-right of the folder card, in the card's ink, Golos 500 14px (desktop `max(14px, 15u)`) UPPERCASE, with a 14px ✓, ● or 🔒 where it helps ("✓ Bajarildi · 4/4 qadam", "Ochiq · 3/6 qadam", "✓ Bajarildi · 3/3 qadam", "● Hozir davom etmoqda · 0/2 qadam", "3-oktabrda ochiladi"). It replaced the outline pill. Cards carry the plain label ("1-dars · 12-sentabr"), the title, and no topic subtitle (only the locked lesson 4 card keeps one: what opens).
- **Hero card (home)**: the live lesson as a flat card `.folder.flatc.now-card` at the top of home, in the identity colour of that lesson (blue for lesson 3), with a bigger title (26px, desktop 44u). Desktop: the card sits right (560u, min-height 340u), the ring and the next step left. There is no greeting.
- **Progress ring `.prog`**: SVG circle r=42 in a 100 box, `pathLength=100`. Track: `rgb(255 255 255 / .12)`, stroke 4. Arc: `--you`, stroke 9, round caps, from 12 o'clock clockwise. It animates `stroke-dasharray` 0 → value in .9s `--ease`; reduced motion shows the final value. Size: 88px on phones, `max(112px, 180u)` on desktop. Centre `.pv`: display 500, "1/4" (22px; desktop `max(28px, 46u)`). Beside it: `.pl` "Sizning natijangiz" (muted 13px UPPERCASE), `.ps` "Toʻliq bajarilgan darslar" (17px; desktop `max(15px, 24u)`) and `.pn` "✓ Tayyorgarlik" (14px, yellow). Flat: no glow.
- **Canvas (decision 2026-10-19, audit 05):** the dastur, dars and ex canvas is plain `#000`. The 1px background grid, the neutral floor gradient and the per-element ambient glows (incl. `.s1::before`) are gone: colour comes only from the cards and folders.
- **Copy control + done chip** (lilac prompt list): circle 48 (desktop 56) + the word "Nusxalash" (Golos 500 11px UPPERCASE) in ONE button; after a copy the word reads "Nusxalandi" for 2s. Done chip `.chip`: 24px high, radius 999, filled black with lilac text "Bajarildi" ✓, or outline "Bajarildi deb belgilash"; a 44px hit area via `::after`. "Qayerga:" is Golos 500 15px, black, with a 600 label.
- **Undo toast `.toast`**: fixed bottom-centre, max 420, black, 1px `--line`, radius 999, min-height 48. Text "01 bajarildi" + a "Bekor qilish" button (44px high, underlined). It stays 5s and pauses on focus. It is announced through the live region, not through its own `role`.
- **New-lesson popup `.nl`**: a flat white card, 1px black ring, radius 15, padding 18. Eyebrow Golos 500 12px UPPERCASE `#595959`, title display 500 17px UPPERCASE, a black pill "Darsni ochish ›" and an outline pill "Yopish" (both 44px). Fixed top-left: desktop top 16 / left 24 / width 380, phones full width minus 16px at 72px from the top. Enter: opacity + 12px slide, .35s. Behaviour: `ux-spec.md` §1.1.
- **Name menu `.nmenu`**: a black card with a 1px `--line` border, radius 15, fixed under the trigger (desktop 340px wide, right-aligned; phones full width minus 16px). It holds the name, a definition list (ID in Martian, group, mentor, dates), UZ/RU/EN, and an outline pill "Chiqish".
- **Locked sheet `.sheet`**: a native `<dialog>`, a bottom sheet on phones (radius 24 24 0 0) and centred from 700px, `--surface-1` fill, backdrop `rgb(0 0 0 / .6)`, a 48px outline "Yopish" pill.
- **Login error `.mx-help.err`**: Golos 500 14px white with a 5-layer black text-shadow halo (`0 1px 2px, 0 0 3px, 0 0 8px, 0 0 16px .95, 0 0 28px .85`), no box; red only on the underline and the ⚠ icon. Out of flow under the field, so the button never moves; at most 2 lines (about 39px) in the 50px gap above KIRISH, at 320px too. Measured on the rendered photo: every glyph pixel is at least 6.9:1.
- **File row `.ef-row`**: the whole row is the link (min 60px); the name is white, the meta is Martian 12px `#8A8A90`, and a 40px outline download circle sits at the right.
- **Pane action** (lilac folder panes): words first, then the 44px circle, right-aligned, Golos 16px; the whole link is the target.
- **Lesson-folder tab** `.gt-tab`: one line (46px high, desktop `max(44px, 56u)`), with a ✓ (and a hidden " · koʻrildi") only when its section is finished. **All panes share one grid cell** (inactive ones are `inert` + `visibility:hidden`), so the body is as tall as the tallest pane (min 460px on phones): it never jumps and never clips, even at larger text. **Exercise row** `.xr` (in a `.p-list`): number (Martian 12), title, a mark (✓ with a hidden " · bajarildi", or "2/4 prompt") and an arrow; min 48px; optional exercises carry a 12px "qoʻshimcha" under the title; a row whose title is only a 2.0 category tag (04 Marketing) shows it as a small outline tag. Keys: ← → Home End.
- **Done prompt number:** a done row's number is dimmed to 55% (was 30%): 3.66:1 on lilac, enough for large text. The ✓ "Bajarildi" chip still carries the state.
- **Placeholder `[boʻlim nomi]`:** plain text, bold, with its brackets; no colour, no underline, so it does not look like a link. A line above the prompt list explains it: "[Qavslar] ichini oʻzingiz toʻldirasiz." (2.0 wording, Golos 15px, ink-2).

## Audit 2026-10-19 additions

**Type scale (snap, nothing between):** body 18 desktop / 17 phone; label 15 / 13 UPPERCASE; small text floor 13 (`.ns` badge 12); card title 22 / 19; panel 34 / 22; sub-page H1 56; lesson H1 88 (a long lesson 4 title is 64 on desktop, never 52); numerals 96 phone / 200 desktop. Martian Mono is data only (ID, sizes, counts, 01-10): sentences are Golos 15 (16 desktop), `--text-2`. `text-wrap:balance` on headlines, titles and sheet titles; `pretty` on ledes and notes. Notes are 62ch wide.

**Motion tokens:** `--ease:cubic-bezier(.2,0,0,1)` (default), `--ease-drawer:cubic-bezier(.32,.72,0,1)` (things that slide into place: tab indicator, sheet, view transitions), `--ease-in-out:cubic-bezier(.77,0,.175,1)`; `--dur-press:100ms --dur-1:160ms --dur-2:200ms --dur-3:260ms`. Press = scale .96 (cards .985) in 100ms. Hover rules live inside `@media (hover:hover) and (pointer:fine)` (done by `src/hover.py` at build). Tab swap: indicator 260ms drawer, panes crossfade 120 out / 200 in with 8px, no blur, keyboard instant. Overlays (toast, popup, menu, sheet) transition opacity and a short slide, in and out; under reduced motion they keep a 160ms fade.

**Type scale, measured (every route, `comp/src/tests/t_scale.mjs`):** distinct size/family pairs per viewport went from 29 to 13 at 1440 (Mona 13/22/28/34/56/88/96/200, Golos 13/15/16/18, Martian 13) and from 26 to 11 at 390 (Mona 13/19/22/28/32/40/96, Golos 13/15/17, Martian 13). Loader: `ldr-in` 160ms, the home renders underneath and the loader fades out over 200ms.

**Background Paths (user decision 2026-10-19, an exception to "no ambient decoration"):** a vanilla port of the React/framer-motion "Background Paths" component. Two fixed layers (`position:1` and `-1`) of 36 curves, viewBox `0 0 696 316`, stretched to cover, `z-index:0` behind `.frame`, `pointer-events:none`, white at 0.22 layer opacity (0.2 on phones), so the brightest line is about 0.13 effective and body text keeps 4.7:1 (text-3) or more over it. Only on the app screens (`dastur`, `dars`, `ex`), never on the login photo; the canvas stays plain `#000` (the grid stays removed). Code: `initBgPaths()` in `src/tabs.js`, CSS at the end of `src/polish.css`. Motion: each path has `pathLength="1"`, a seeded dash length (0.3-1) and a seeded 20-30s `stroke-dashoffset` loop (0 to -1 to 0), stepped on one shared 12 Hz clock. The original's pathLength and opacity pulses are not ported: animating `stroke-dasharray` or `opacity` on SVG paths re-rasters every frame (7 fps at 4x CPU, 1440), while the offset alone holds 60 fps. Phones draw every 3rd path. Reduced motion: static full paths. Hidden tab: paused (`html.hid`).
