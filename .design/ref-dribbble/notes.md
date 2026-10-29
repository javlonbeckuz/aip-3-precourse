# Dribbble reference: "Learning Website" by Roohi Koohi

Source: https://dribbble.com/shots/25028122-Learning-Website. Internal reference only: never ship its photo or avatars.

## Images
| File | What it shows |
|---|---|
| `01-hero-flat.png` | Flat view of the hero. Measure from this one. |
| `02-hero-device.png` | The same hero shown in a device mockup. |
| `03-typography.png` | Type card: SF Pro, Thin to Bold. |

The whole reference is ONE desktop marketing hero. Sidebar, course list, progress UI, lesson view, mobile layout and motion are not shown. Everything below about those screens is our translation.

## What it is
- **Canvas:** pure black `#000`. A 1px `#3F3F3F` hairline runs under the nav.
- **Colour:** flat blocks only. No gradients, glow or shadow. White on black, black on colour.

### Folder-tab card (the signature)
- The body is a rounded rect, radius 14–16px.
- The right 35% of the top edge rises ~21px.
- The rise meets the body with a ~45° ramp, rounded at both joins.
- Flat fills: blue `#0A14FC`, grey `#E0E0E0`, yellow `#FDC959`.
- **Content:** a 15px uppercase two-line label at top-left and a thin ↗ at top-right. At bottom-left, ONE big element: a 22px uppercase title, a ✱, or a big numeral ("700", ~78px, regular weight).

### Inverted folder notch
- A lilac media panel, radius ~32px.
- The notch is cut from its top-right: ~120px wide, ~62px deep, with rounded joins.

### Controls
- **Outline pill CTA:** fully rounded, 1px white outline, ~60px tall. The label sits left, with a 52px white circle button carrying a black → on the right.
- **Play link:** a 40px circle plus a two-line label.
- **Tag pills:** 1px `#595959` outline, 15px uppercase, ~44px tall.
- **Square button:** the white "Sign up" button has radius 0. It is the only square element.

### Type
- SF Pro, Regular and Medium.
- Hierarchy comes from size + UPPERCASE, not weight:
  - display ~88px uppercase
  - big numeral ~78px
  - card title 22px uppercase
  - body 18px
  - labels 15px uppercase

## Translation to AIP 3.0 (locked decisions win)
- **Background:** keep `--bg-0` (#0B0D0E), not pure black.
- **Colours:** card fills only from state colours. Live = `--accent`, prep = `--warn`, neutral = `--bg-2`. Drop blue, lilac and grey. At most one filled accent card per screen.
- **Fonts:**
  - Display uppercase → Mona Sans Expanded wght 500, with Roboto Flex 125% for Cyrillic. Map Uzbek ʻ correctly in uppercase.
  - Body → Golos Text 16px.
  - Labels and tags → Martian Mono 11–12px uppercase, 0.06em tracking.
  - Big numerals → display face.
- **Imagery:** no photos, avatars, cutouts, ✱ art or stars. Panels hold real content.
- **Spacing:** airy only on the gate. App screens stay compact. Folder cards are 160–200px tall.
- **Responsive:** mobile-first. Tab rise is 16px on mobile and 21px on desktop.
- **Hero size:** add `--t-hero: clamp(32px, 8.5vw, 72px)`, line-height 1.1, for the gate headline.
- **Square button:** keep it, radius 0. One per screen at most, e.g. the top-bar primary action.

## Per screen
### ID gate
- Uppercase hero headline.
- The ID field is the outline pill:
  - 56/60px tall, 1px `--line-3`.
  - The value in Martian Mono.
  - A 44px accent circle submit with →.
- Auto-submit once 6 characters are typed.

### Lesson list
- **"Now" strip of folder cards:**
  - Live: accent fill, label "DAVOM ETMOQDA · 2-DARS", ↗.
  - Progress: `--bg-2`, with a big "3/7" or "42%" numeral and the label "BAJARILDI".
  - Prep: warn fill, label "{SANA}GACHA".
- **Full list:** hairline rows. Each row has a display numeral, the title, mono tag pills for topics, and a state chip.

### Lesson page
- **Header:** a big "02" numeral, the title, then topic pills.
- **Slides panel:** a `--bg-1` panel with the inverted notch holding "78 SLAYD" in mono. A play-circle + two-line label opens the viewer.
- **Vazifa / Amaliyot / Kitob / Prep:** folder cards, 2 columns (1 at 320px).
- **Unavailable item:** a flat rect with NO tab, `--text-3`, and "dars tugagach ochiladi".

### Amaliyot
- **Exercise cards:** folder cards with the tag (HR/SAVDO) in mono at top-left, a big "01" at bottom-left, and ↗. A done exercise shows an accent check + "BAJARILDI" and stays unfilled.
- **Prompt card:** a `--bg-1` folder card.
  - THE TAB CARRIES THE PASTE TARGET, e.g. "NOTEBOOKLM → CHAT". The tab rise is ~26px to fit it.
  - Prompt text sits in a `--bg-3` well.
  - Copy button: a 40px outline circle at top-right that fills accent once copied.
  - A mark-done control sits in the footer.

### Top bar
- The wordmark is centred on desktop and left on mobile. Name and group sit on the right.
- One hairline runs under it.
- Height is 64px on mobile and 88px on desktop.

## Folder shape implementation
- The body is a rounded rect. An absolutely positioned tab sits top-right: width 35%, height `--tab-rise`, same fill.
- The tab's left edge is a FIXED-SIZE inline SVG ramp (e.g. 24×21). Never stretch one SVG over the card.
- Use the shape on filled variants only.
- Don't use `clip-path: shape()`.

## Motion
- 150–200ms colour/opacity changes on hover and press only.
