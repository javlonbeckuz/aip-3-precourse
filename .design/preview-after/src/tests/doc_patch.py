import os
os.chdir(r'C:\Users\User\vs code\HEAD projects\praktikum3-precourse-platform\.design')
t = open('tokens.md', encoding='utf-8').read().split('\n')
def setline(prefix, new, doc=t):
    idx = [i for i, l in enumerate(doc) if l.startswith(prefix)]
    assert len(idx) == 1, (prefix, idx)
    doc[idx[0]] = new
setline('Brand palette (unchanged)', "Brand palette (unchanged): blue, grey, yellow and lilac on black. **Each lesson has ONE fixed identity colour, whatever its state** (2026-10-16, user decision: three lilac cards looked identical). **State is never carried by colour: it is a word plus an icon** (✓ Bajarildi · n/n qadam, Ochiq · n/n qadam, ● Hozir davom etmoqda · n/n qadam, 🔒 date). A light fill always carries black text; blue and the dark identity colour carry white text.")
setline('| `--state-live` = `--blue`', "| `--state-live` = `--blue` | `#0A14FC` | **lesson 3's identity colour** and the colour of the home hero (the live lesson takes its own identity colour, so hero and card always match) | white only (8.34). Never black (2.52) |")
setline('| `--state-open` = `--lilac`', "| `--state-open` = `--lilac` | `#B4A1D1` | **lesson 1's identity colour** (card, tab folder) and the full-bleed prompt section (`.s1`) | ink 8.96, ink-2 6.21. Never white (2.34) |")
setline('| `--state-done` = `--grey`', "| `--state-done` = `--grey` | `#E0E0E0` | **lesson 2's identity colour**. Not a \"done\" colour any more: done = ✓ and the word \"Bajarildi\" | ink 15.9. Never white (1.32) |")
setline('| `--state-locked` = `--surface-1`', "| `--state-locked` = `--surface-1` | `#161616` | **lesson 4's identity colour**. While locked: text-2 ink, lock and the date (the \"locked look\"). Once unlocked: the same dark fill with white ink | text-2 7.43, white 17.6 |")
setline('| `--you` = `--yellow`', "| `--you` = `--yellow` | `#FDC959` | **lesson 0's identity colour** (prep) and **your progress** (the course ring arc and its note). | ink on it 13.68; as text on black 13.68 |")
setline('Decoration (not signals)', "Decoration (not signals): the per-element ambient glows (see \"Project background\" below), the 5% grid, and the loader LEDs. There is no green anywhere: \"done / OK\" is a ✓ and a word.")
setline('**Lesson cards by state**', "**Lesson identity colours** (home cards, the lesson page folder, the glow behind them): lesson 0 yellow (ink black), lesson 1 lilac (black), lesson 2 grey (black), lesson 3 blue (white), lesson 4 dark `#161616` (text-2 while locked, white once unlocked). Every card is a different colour in every state; the colour never changes. State is the note in the card's corner: prep \"12-sentabrgacha · 3/4 qadam\" while unfinished; \"✓ Bajarildi · n/n qadam\" when done; \"Ochiq · n/n qadam\" when open; \"● Hozir davom etmoqda · n/n qadam\" when live (a quiet dot, never a filled pill: a filled pill looks like a button); \"🔒 3-oktabrda ochiladi\" when locked. The hero card (\"Hozir davom etmoqda\") takes the identity colour of whichever lesson is live (lesson 3 in the demo, so it is blue like the card below it); its ink follows the colour (white on blue and dark, black on yellow, lilac and grey). Code: `LCOL` in `proto_app.js`.")
setline('**Lilac rule (changed 2026-10-16):**', "**Lilac rule:** lilac is lesson 1's identity colour (its card and tab folder) and the prompt-section background. It is not a state colour. It also appears as a dimmed ambient glow behind lilac elements; that is decoration, not a signal.")
setline('- **Hero card (home)**', "- **Hero card (home)**: the live lesson as a flat card `.folder.flatc.now-card` at the top of home, in the identity colour of that lesson (blue for lesson 3), with a bigger title (26px, desktop 44u). Desktop: the card sits right (560u, min-height 340u), the ring and the next step left. There is no greeting.")
setline('- **Project background**', "- **Project background** (dastur, dars and ex `.site`, not the sign-in photo): **per-element ambient glow in the element's own identity colour: decoration only, never a signal.** The canvas itself is quiet: black, the 1px grid `rgb(255 255 255 / .05)` (cells 48x32 on phones, 96u x 64u on desktop) and a barely-there neutral floor (`#000` to `rgb(9 9 12)`). The colour comes from the things on it: every home card (`li.g-*`), the hero (`.main-head.g-*`) and the lesson folder (`.gt.g-*`) has a `::before` radial gradient behind it (`inset:-45% -30%`, `inset:-14% -12%` for the folder), in its own fill colour at low alpha (blue .42, lilac .36, dark violet `rgb(124 112 168)` .34, yellow .30, grey .22 at the card edge, a cosine fade to 0 over 11 stops so it does not band); the lilac prompt section throws a short glow above its top edge (`.s1::before`, .11). Neighbouring glows (yellow beside lilac beside grey) overlap softly; on phones each card's glow shows in the gaps and the margins and they cross-fade vertically. Implementation: `.site{isolation:isolate}` and the glows sit at `z-index:-1`, so the card edges stay crisp; literal `rgb()` values (no `color-mix`, no blur filters, `pointer-events:none`). Measured on the export at 1440 / 390 / 320 (UZ + RU): muted text outside the cards stays at 4.65:1 or better against the brightest glow pixel under it (ring label, next step, ledes, file meta, hints); text on the cards and folders at 5.3:1 or better.")
open('tokens.md', 'w', encoding='utf-8').write('\n'.join(t))

u = open('ux-spec.md', encoding='utf-8').read().split('\n')
def setline_u(contains, new):
    idx = [i for i, l in enumerate(u) if contains in l]
    assert len(idx) == 1, (contains, idx)
    u[idx[0]] = new
setline_u('| done | grey card, "✓ Bajarildi · 3/3 qadam"', '| done | "✓ Bajarildi · n/n qadam" in the lesson\'s own colour | state is a word and an icon, never a colour (each lesson has one fixed identity colour) |')
i = [k for k, l in enumerate(u) if l.startswith('| live | "Davom etmoqda"')]
assert len(i) == 1
u[i[0]] = '| live | "Davom etmoqda" | the live lesson is the big hero card at the top of home, in the identity colour of that lesson (blue for lesson 3, so it matches the card below); in the list its note reads "● Hozir davom etmoqda · 0/2 qadam" |'
setline_u('| open | lilac card, "Ochiq · 3/6 qadam"', '| open | "Ochiq · n/n qadam" in the lesson\'s own colour | |')
setline_u('| 1 | Kirish | 12-sentabr |', '| 1 | Kirish | 12-sentabr | lilac · open · "Ochiq · 3/6 qadam" |')
setline_u('| 2 | Claude va Code | 19-sentabr |', '| 2 | Claude va Code | 19-sentabr | grey · done · "✓ Bajarildi · 3/3 qadam" (after an untick: "Ochiq · 2/3 qadam", still grey) |')
setline_u('| 3 | Skill va agentlar | 26-sentabr |', '| 3 | Skill va agentlar | 26-sentabr | blue · live: blue hero card on top (slides at 14 / 40) and the same blue card in the list · "● Hozir davom etmoqda · 0/2 qadam" |')
open('ux-spec.md', 'w', encoding='utf-8').write('\n'.join(u))
print('ok')
