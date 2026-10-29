# Taste profile: AI Praktikum 3.0 student portal

- Written 2026-10-15 from the Taste Interview the main thread ran with the user.
- The functional source of truth is `reference-blueprint.md`. The 2.0 look (blueprint §6) is what we are moving away from.
- **Revised 2026-10-15:** the user chose a **literal match of the Dribbble reference** (`ref-dribbble/01-hero-flat.png`, "Learning Website" by Roohi Koohi). They want its palette, layout and proportions, filled with real Praktikum 2.0 content. This overrides the earlier "technical / Linear" direction and the Firuza teal accent.

## Product
- Private student portal for HEAD's offline AI course for business owners in Tashkent (cohort 3.0).
- Login is a personal ID (`AIP-XXXXXX`).
- Lessons have five states: locked, open, live, prep and done.
- Each lesson has slides, Vazifa, Amaliyot (prompt cards with a "where to paste" target), a book and a prep checklist.
- Languages: UZ (Latin, the default), RU and EN.
- New in 3.0:
  - Per-student progress.

## Vibe
**Reference-literal editorial / bold.**
- Pure black canvas with flat, saturated colour blocks.
- Huge uppercase wide-grotesque headlines.
- Folder-tab cards, outline pills and one white square button.
- Airy spacing.

## References
- **Dribbble "Learning Website"** (`ref-dribbble/`): *the* reference, matched literally.
- What carries over from the earlier interview: dark only, precise alignment, real states, no slop.

## Palette (literal, from the reference)
| Role | Hex | Text on it |
|---|---|---|
| Canvas | `#000000` | white |
| Nav hairline | `#3F3F3F` | |
| Tag pill outline | `#595959` | |
| Blue card | `#0A14FC` | white (8.3:1) |
| Grey card | `#E0E0E0` | black |
| Yellow card | `#FDC959` | black |
| Lilac media panel + prompt sections | `#B4A1D1` | black (9:1) |
| Locked card (our addition) | `#161616` | `#9A9A9A` (6.3:1) |

The colour of a card has a meaning:
- **Blue:** live, "now" or the next action.
- **Grey:** open, done, or a resource.
- **Yellow:** your progress, your result, or prep.
- **Dark:** locked.

**Prompt sections = full-bleed lilac, editorial numbered list; copy = done.**
- Decided 2026-10-15.
- This is the one place lilac is used as a section background. Elsewhere it is only the notched media panel.
- The black site ends and the prompts begin on lilac: large numbers, black text, hairlines between prompts, and one outline copy circle each.
- Specs are in `tokens.md` under "Usage rule".

## Type
| Role | Face | Notes |
|---|---|---|
| Display: headlines, card titles, numerals, wordmark | `--font-display`: **Mona Sans Expanded** (`font-stretch:125%`, wght 500; numerals wght 400), per-glyph fallback **Roboto Flex 125%** for Cyrillic | Hierarchy comes from size + UPPERCASE, as in the reference. |
| Body, nav, labels, tag pills | **Golos Text** | Body/nav 18px desktop. Labels and tags 15px UPPERCASE. |
| Data only: ID input, prompt text, paste target, file sizes | **Martian Mono** | |

**Uzbek apostrophe gotcha (verified with fontTools):**
- Coverage:
  - Mona Sans has neither U+02BB (ʻ) nor U+02BC (ʼ).
  - Golos Text and Martian Mono lack U+02BB.
- Rule:
  - Render U+02BB as U+2018 (‘) and U+02BC as U+2019 (’).
  - Copy buttons return the raw U+02BB/U+02BC.

## Density
Airy, at reference scale:
- 66px gutters.
- A 120px nav.
- 340×252 folder cards.
- 88px headlines at 1440.

Mobile (375): everything stacks into one column, with full-width cards around 200px tall.

## Framework
- Plain HTML, CSS and vanilla JS on a small Node server.
- SPA with History API routes (`/aip/...`).
- Inline SVG sprite. No libraries.

## Hard constraints
- Mobile-first: works at 375px and reflows at 320px.
- WCAG 2.2 AA. Every fill pair above passes 4.5:1. The focus ring is a 2px white outline on black.
- `prefers-reduced-motion` is respected. Motion is limited to 150ms colour/brightness changes on hover and press.
- **Never:**
  - Photos, avatars, cutouts, ✱ art or mascots.
  - Glitch, HUD, particles, grids, glow, orbs or gradient blobs.
  - Typing effects.
- The reference's avatar cluster is NOT carried over: three numbered circles were tried and removed on 2026-10-16 because they read as lesson states but meant nothing.
- Real Uzbek microcopy only.
- Never expose server file paths.

## Design intent
1. It should look like the reference: black stage, bold flat blocks, huge uppercase type. The content should be unmistakably Praktikum.
2. Colour is never random. Blue means now, yellow means you, grey means material, dark means locked.
3. On a phone, the next action (live lesson, continue pill) comes first, and progress is one glance away.
