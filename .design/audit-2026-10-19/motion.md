# Motion and interaction-feel audit · 2026-10-19

- **Audited:** `AI-Praktikum-3.0-final.html` (file://), driven in headless Chrome over CDP at 390×844 (mobile emulation + touch) and 1440×900.
- **Source of every rule:** `.design/comp/index.html` (CSS + the inline JS), exported into the final file. Prep pictures: `src/prep_c.css`.
- **Lens:** motion and feel only. Skills applied: emil-design-eng, apple-design, motion-design, improve-animations.
- **How it was measured:**
  - Frame pacing: an in-page `requestAnimationFrame` logger, plus `PerformanceObserver` for `longtask` and `long-animation-frame`.
  - Main-thread cost: deltas of CDP `Performance.getMetrics` (LayoutCount, RecalcStyleCount, Layout/Script/Task duration).
  - "4× CPU" means `Emulation.setCPUThrottlingRate 4`, standing in for a mid-range Android.
  - Headless runs with `--disable-gpu` (software raster), so raster-heavy numbers are pessimistic. Main-thread numbers are not affected.
  - Frame sequences: running animations were paused and seeked with `document.getAnimations()` to exact times, or slowed to 0.1× with CDP `Animation.setPlaybackRate`.
- **Already covered elsewhere, not repeated:** ux-pass-2 #13 (loader only while the request is pending), ux-pass-2 #5 (Q1–Q5 chevron, now shipped), color-audit #8 (red/green loader LEDs as colour).
- **Respected decisions:** prep pictures play once; no blur reveals, glow pulses, particles or glitch; the gooey folder look (element-audit L29) and the login photo stay.
- **Frames:** `F/` = `C:/Users/User/AppData/Local/Temp/claude/C--Users-User-vs-code-HEAD-projects-praktikum3-precourse-platform/7b93abd2-e86f-4f93-b0fc-efc57770bbb1/scratchpad/audit5/motion/frames/`.
- **Tags:** **SAFE** = feel only, no visual sign-off needed. **LOOK** = changes what the screen looks like, so the user decides.

## Motion inventory (what ships today)
| Motion | Trigger | Duration · curve | Property | Interruptible | Reduced motion |
|---|---|---|---|---|---|
| Folder-tab indicator | tab tap / ← → | 400ms `(.3,0,0,1)`; Safari: none | transform, under an SVG blur filter | yes (CSS transition) | off |
| Tab pane swap | same | out 150ms `ease-in` (awaited), then in 220ms `--ease` | opacity + translateY 24px + **blur 8px** | yes (seq guard) | instant |
| Tab label colour | same | 250ms `--ease` | color | yes | off |
| Progress ring | every home render | 900ms `--ease`, 150ms delay | stroke-dasharray (paint) | n/a | final value |
| Wordmark wave | login, forever | 1.35s step-end, alternate, infinite | font-weight (layout) | n/a | static |
| Login loader | good ID | 700ms total (in 350ms), 4s bounce, 0.5s/0.8s strobes | opacity, backdrop blur 6px, transform, fill | no | static |
| ID field focus | focus | 400ms slide 10px + 600ms underline | transform, **width**, box-shadow glow | yes | slide off |
| KIRISH hover | hover | 300ms letter-spacing + `all` 500ms back-out | letter-spacing (layout), transform under an SVG blur filter | yes | off |
| Popup / name menu | open | 350ms / 200ms `--ease`, keyframes | opacity + translateY −12px | restart | off |
| Toast | show | 250ms `--ease`, keyframes; exit = hard cut | opacity + translateY 8px | restart | off |
| Copy circle | tap | 150ms bg; label 2s | background, colour | yes | off |
| Prep pictures | card opens | enter 400–600ms + one 3s pass `(.45,0,.55,1)` | transform, opacity | paused off-screen | final frame |
| Q1–Q5 chevron | toggle | 200ms `--ease` | transform | yes | off |
| Sheets, accordions, prep open/close, routes, slides | — | **instant** | — | — | — |

`tokens.md` §Motion says "150ms, nothing loops". The build has drifted from it: two infinite loops (the wordmark and the loader), a 900ms ring, a 400ms indicator, and **seven hand-typed curves** (`--ease`, `(.3,0,0,1)`, `(.2,1,.3,1)`, `(.175,.885,.32,1.275)`, `ease-in`, `(.45,0,.55,1)`, bare `ease`). Every fix below reuses the house `--ease: cubic-bezier(.2,0,0,1)`, which is already a strong ease-out. Two tokens are added: `--ease-drawer: cubic-bezier(.32,.72,0,1)` for sheets and the indicator, and `--ease-in-out: cubic-bezier(.77,0,.175,1)` for one on-screen morph. Record both in `tokens.md` §Motion with the durations `--dur-press:100ms`, `--dur-1:160ms`, `--dur-2:200ms` and `--dur-3:260ms`.

---

## High

### 1 · No press state anywhere. Phones show Chrome's cyan tap rectangle instead, and hover sticks · all screens, 390
- **Measured:**
  - The stylesheet has **0 `:active` rules** and **0 `@media (hover:hover)` blocks**.
  - With nothing designed, Android Chrome paints its default translucent cyan tap highlight: a square rectangle that ignores the 15px radii and the gooey tab shape.
  - On the lesson-4 card it shows *through* the bottom sheet that the tap opens: it is still there 16ms after the tap, over the sheet.
  - Each route change is a 109–238ms long task at 4× CPU (#10). After a tap, nothing designed responds for up to a quarter second.
  - `a.play:hover .play-circ{scale(.96)}` puts a press gesture on hover. On touch it fires on tap and then stays.
- **Why it matters:** these students are non-technical and on phones. A tap that shows nothing designed (or a cyan box) makes them tap again, and a second tap on a pill navigates twice. Apple §1 and §10: highlight on touch-down, commit on touch-up.
- **Fix (SAFE):**

| Before | After | Why |
|---|---|---|
| default `-webkit-tap-highlight-color` | `html{-webkit-tap-highlight-color:transparent}` | removes the square cyan flash |
| no `:active` | `.pill-cta:active .pill-circ,.pill-ink:active .pc-c,.play:active .play-circ,.slv-btn:active,.s1 .cp:active .cp-c,.ef-row:active .ef-dl,.nl-go:active,.nl-x:active,.sheet-x:active,.nm-out:active,.mx-btn:active{transform:scale(.96);transition-duration:100ms}` | instant press feedback, 100ms in |
| no card press | `a.folder:active,button.folder:active,.prep .pc:not(.open):active{transform:scale(.985);transition:transform 100ms var(--ease)}` (base `transition:filter .15s var(--ease),transform 160ms var(--ease)`) | large surfaces scale less; the 160ms release is slower than the 100ms press |
| `.gt-tab` no press | `.gt-tab:active{color:var(--white)}` | label lights on touch-down, before the 400ms indicator moves |
| every `:hover` rule bare | wrap all `:hover` rules in `@media (hover:hover) and (pointer:fine){…}` | stops sticky hover on touch (#3) |
| `a.play:hover .play-circ{scale(.96)}` | move it to `:active`; hover = none | shrinking is a press gesture, not a hover gesture |
| iOS ignores `:active` | `document.addEventListener('touchstart',()=>{},{passive:true})` once | Safari only applies `:active` when a touch listener exists |

- **Frames:** `F/zoom-tab-tap.png` (cyan box on the Amaliyot tab), `F/m-lock-sheet-16ms.png` (box through the sheet)

### 2 · Folder-tab pane swap: an 8px blur reveal, an empty folder for about 50ms, and three clocks for one tap · `#/dars/1` (all lessons), 390 + 1440
- **Measured (real time, 390, 1×):**
  - The old pane fades with `ease-in` and blurs to about 5px. Its exit is *awaited* (150ms, landing at about 200ms after the tap).
  - From about 200 to 230ms **both panes are invisible** (new pane opacity 0, blur 8px).
  - The new pane is legible (opacity ≥ .7, blur < 2.5px) only at **about 270ms** and settles at **about 400ms**.
  - The indicator runs on its own 400ms clock, and the label colour on a 250ms clock.
  - Same shape at 1440 (`F/sheet-d-tabs.png`).
- **Why it matters:**
  - `filter: blur()` on entering content is the "blur reveal" the user ruled out.
  - The `ease-in` exit spends its first 50ms barely moving: the moment the eye watches most.
  - The awaited sequence puts a blank folder between two readable states. This is a medium-frequency control (3–4 taps per lesson visit), so it should feel like ~200ms, not ~400.
- **Fix (SAFE):** no await, one crossfade inside the shared grid cell, no blur.
  - **Old pane:** `animate([{opacity:1},{opacity:0}],{duration:120,easing:'cubic-bezier(.2,0,0,1)'})`, then `inert`.
  - **New pane, at the same moment:** `animate([{opacity:0,transform:\`translateY(${8*dir}px)\`},{opacity:1,transform:'none'}],{duration:200,easing:'cubic-bezier(.2,0,0,1)'})`.
  - **Indicator:** `transition:transform 260ms var(--ease-drawer)`. **Label:** `transition:color 160ms var(--ease)`.
  - Everything settles by 260ms.
- **Frames:** `F/sheet-m-tabs.png`, `F/sheet-d-tabs.png` (0.1× slow motion, 50ms real per frame), `F/m-tabs-slow-00.png` … `-09.png`

### 3 · Sticky hover keeps the copy circle "copied" after the label says "Nusxalash" again · prompt lists (`#/dars/1/amaliyot/01`, Vazifa, library, Hermes), 390
- **Measured:**
  - Tap copy: the fill starts at about 75ms and is solid by about 210ms (150ms transition). The label reads "Nusxalandi".
  - At 2.3s the label is back to "Nusxalash", but the circle is **still solid black**, because `.s1 .cp:hover .cp-c` matches (`:hover` = true after a tap). It stays that way until the student taps elsewhere.
  - The icon swap ✓ ↔ copy is an instant hard cut.
- **Why it matters:** on the next look the student sees a filled "pressed" circle beside "Nusxalash": a contradiction on the core action of the course (copy = done).
- **Fix (SAFE):**
  - Gate the hover fill (part of #1): `@media (hover:hover) and (pointer:fine){.s1 .cp:hover .cp-c{…}}`.
  - Give the flash its own timing:

| Before | After | Why |
|---|---|---|
| `transition:background .15s,color .15s` | `transition:background 160ms var(--ease),color 160ms var(--ease)` | token, not a bare `ease` |
| icon `href` swapped instantly | wrap the `<svg>` and animate the new icon in: `animate([{opacity:0,transform:'scale(.8)'},{opacity:1,transform:'none'}],{duration:160,easing:'cubic-bezier(.2,0,0,1)'})` | ✓ "arrives" instead of flickering |
| revert at 2000ms, instant | keep 2000ms; revert with the same 160ms | symmetric with the release, calm |

- **Frames:** `F/pair-copy-flash-vs-2s.png` (left: flash; right: 2.3s later, still filled)

## Medium

### 4 · The progress ring redraws for 1.05s on every visit to home, including Back · `#/dastur`, 390 + 1440
- **Measured:**
  - `ring-in` is 900ms `--ease` with a 150ms delay, re-created on every render.
  - After `history.back()` to home it is `running` again.
  - It animates `stroke-dasharray`, which is paint on the main thread. That is cheap here (one 88–180px SVG; no dropped frames at 4×).
- **Why it matters:**
  - Home is the hub, visited after every lesson, exercise and the slides: tens of times per session. Emil's frequency rule says reduce it.
  - A ring that grows from zero on every visit says "you just made progress" when nothing changed.
  - It runs 3× the 300ms UI budget.
- **Fix (SAFE):**
  - Animate only when the value went **up** since the last home render (keep the last value in `sessionStorage`, e.g. `aip3.ring`).
  - Draw from the old value to the new one: `@keyframes ring-in{from{stroke-dasharray:var(--from) 100}}` with `--from` set inline.
  - `animation:ring-in 600ms var(--ease) both`, delay 0. Otherwise no animation.
- **Frames:** `F/sheet-home-ring.png` (0, 100 … 1050ms)

### 5 · At 0 progress the ring shows a yellow dot, and every draw-in starts from that dot · `#/dastur`, empty progress
- **Measured:**
  - `stroke-dasharray:0 100` with `stroke-linecap:round` paints a 9px yellow cap at 12 o'clock.
  - The same dot is the first 150ms (the delay) of every draw-in.
- **Why it matters:** the ring reads as data. At "0/4" it shows a bit of yellow progress that is not there (feedback: audit every element).
- **Fix (SAFE):**
  - When the value is 0, render the arc with `stroke-opacity:0` (or omit the `<circle class="rp">`).
  - With #4's from-value, the dot is never the first frame.
- **Frames:** `F/home-ring-zero.png`, `F/home-ring-0000.png`

### 6 · The gooey filter drops frames during the tab slide on a slower device · `#/dars/1`, 1440, 4× CPU
- **Measured:** 1 → 3 switch, three runs each.

| Variant | fps | Worst frame |
|---|---|---|
| As shipped | 48.6–52.9 | 50ms |
| Without the pane animation | 47–56 | 33ms |
| **Without `filter:url(#goo-tabs)`** | **61.4** | **17ms** |

  - `feGaussianBlur stdDeviation=12` over the 688px folder is re-rasterised every frame of the 400ms slide.
  - At 390 it held 60fps, because the folder is smaller and uses the `-sm` filter.
- **Why it matters:** a laptop in class (they bring one for Claude and NotebookLM) can stutter on the screen they use most. Shortening the slide (#2: 400 → 260ms) cuts the exposed frames by about a third.
- **Fix:**
  - **SAFE:** #2's 260ms. Add `will-change:transform` to `.gt-ind` only while switching (set it on click, remove it on `transitionend`).
  - **LOOK (if the stutter still shows):** drop the filter only *during* the slide. Animate a plain, unfiltered indicator (the goo needs no blur while moving), then put the filter back on `transitionend`. Or replace the blur filter with a static SVG path for the tab joint.
- **Frames:** `F/sheet-d-tabs.png`

### 7 · Safari: the indicator jumps while the pane still animates · `#/dars/n` on iPhone/Mac Safari
- **Measured (code):**
  - `.is-safari .gt-ind{transition:none}`, because Safari repaints badly under the SVG filter.
  - The JS pane swap still runs its full 150 + 220ms blur sequence.
- **Why it matters:** many students carry iPhones. They get a teleporting folder joint with a slow content dissolve under it: two speeds for one action. That is the reverse of Apple §7 (motion should telegraph the destination).
- **Fix (SAFE):**
  - With #2, the pane swap is 200ms opacity + 8px.
  - On `.is-safari`, also give the pane opacity only (no translate), so the jump and the content agree.
  - Better, if #6's LOOK option is taken: an unfiltered indicator during the slide lets Safari animate it too, and the `.is-safari` branch can go.
- **Frames:** n/a (Safari UA rule, read from `index.html` l.187)

### 8 · Ticking a prep card re-lays the whole deck in one frame · `#/dars/0` (empty progress), 390 + 1440
- **Measured:**
  - At 390, ticking card 01:
    - Card 01 shrinks 330 → 245px.
    - Card 02 **jumps up 85px and grows 270 → 514px** in the same frame, and focus moves to its header.
    - Three one-shot picture animations start at once.
  - At 1440, the deck's `--cols` switches from `2fr 1fr 1fr 1fr` to `1fr 2fr 1fr 1fr` instantly: every card changes width and the pictures re-flow.
  - This is the one moment of completion on the prep page, and it teleports.
- **Why it matters:** "preventing jarring changes" (Emil) and spatial continuity (Apple §7). The student does not see that the deck moved them on to the next step. It reads as the page reloading.
- **Fix (SAFE):** wrap the re-layout in a View Transition. It is GPU-composited snapshots, with no height or width animation of live layout.
  - **JS:** `const vt = document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches; vt ? document.startViewTransition(paint) : paint();` in the chip and header handlers.
  - **CSS:**
    - `.prep .pc{view-transition-name:var(--vt)}`, with `--vt:pc0..pc3` inline.
    - `::view-transition-group(*){animation-duration:260ms;animation-timing-function:cubic-bezier(.32,.72,0,1)}`
    - `::view-transition-old(*),::view-transition-new(*){animation-duration:160ms}`
  - Browsers without support keep today's instant swap.
- **Frames:** `F/m-prep-after-tick.png`, `F/d-prep-after-tick.png`

### 9 · Bottom sheets appear in one frame · `#/dastur` locked lesson 4 (`?today=2026-09-26`), slide viewer "Barcha slaydlar"
- **Measured:**
  - `showModal()` gives 0 animations. At 16ms the sheet sits at its final position and the `.6` backdrop is fully dark.
  - Closing is also a cut.
- **Why it matters:**
  - A bottom sheet with no rise reads as a page swap, not as a layer that came from the bottom edge and goes back there (Apple §7).
  - Students tap the locked card more than once before the date, so it gets seen.
- **Fix (SAFE):**
  - **Phones:**
    - `.sheet{transition:transform 260ms var(--ease-drawer),overlay 260ms allow-discrete,display 260ms allow-discrete}`
    - `@starting-style{.sheet[open]{transform:translateY(100%)}}`
    - `.sheet:not([open]){transform:translateY(100%);transition-duration:200ms}`
  - **Backdrop:** `.sheet::backdrop{transition:opacity 200ms var(--ease),overlay 200ms allow-discrete,display 200ms allow-discrete}` with `@starting-style{.sheet[open]::backdrop{opacity:0}}`.
  - **≥700px (centred):** use `opacity:0;transform:scale(.96)` instead of the translate (modal, origin centre).
  - **Reduced motion:** opacity only, 160ms.
- **Frames:** `F/m-lock-sheet-16ms.png`, `F/m-slides-sheet-16ms.png`

### 10 · Route changes are a 77–266ms long task on a mid-range phone · all routes, 390, 4× CPU
- **Measured (hash change → first frame, 4×):**

| Route | Hash change → first frame | Long task |
|---|---|---|
| `#/dars/1` | 118ms | 109ms |
| `#/dars/1/amaliyot/01` | **266ms** | 238ms, **182ms of it layout** |
| `#/dars/1/vazifa/promptlar` | 148ms | 127ms |
| `#/dars/0` | 182ms | 162ms |
| `#/dars/2/amaliyot/…` | 77ms | 57ms |

  - At 1× all routes paint in 13–34ms.
  - Routes cut instantly with no transition. That is right for a hub-and-spoke app opened tens of times per session.
- **Why it matters:** with no press state (#1), the tap → nothing → new page gap is the whole perceived latency.
- **Fix (SAFE):**
  - #1 first: the press state paints on touch-down, before the long task.
  - Then skip layout of off-screen rows: `.s1 li,.ex-files li,.prep .pc:nth-child(n+3){content-visibility:auto;contain-intrinsic-size:auto 280px}`.
  - Re-measure with this harness. Target: ≤ 100ms at 4× on `#/dars/1/amaliyot/01`.
  - No route animation.
- **Frames:** n/a (numbers above)

### 11 · The name menu stays put while the page scrolls away from ☰ · all app screens, 390
- **Measured:**
  - The menu opens 8px under ☰ (200ms, settled by 190ms: good).
  - After a 403px page drag, the menu is still at `top:62` while ☰ is at `-349`. A floating card covers the lesson list with nothing anchoring it.
- **Why it matters:** anchored UI must stay with its source (Apple §7). The student cannot tell what the card belongs to, and the only way out is to find the off-screen ☰ or tap blank space.
- **Fix (SAFE):**
  - Close on a real scroll. While the menu is open, `addEventListener('scroll', …, {passive:true})` with `if (Math.abs(scrollY - y0) > 24) closeMenu()`, removed on close.
  - Add `overscroll-behavior:contain` on `.nmenu`.
- **Frames:** `F/m-menu-after-scroll.png`

### 12 · The login wordmark weight wave loops forever and re-lays out text at 37/s · `#/kirish`, 390 + 1440
- **Measured (3s, at rest):**

| | Layouts | Style recalcs | Main-thread task time |
|---|---|---|---|
| Wave on | 110 | 180 (every frame) | 105ms (1×) · **623–645ms (4×)** |
| Wave off | 1 | 1 | 31ms (1×) · 180–190ms (4×) |

  - At 4× that is about 21% vs 6% of the main thread, while the student types or pastes the ID.
  - No dropped frames.
  - The step-end keyframes change weight every 67.5ms (about 15 visible steps per second), by design.
- **Why it matters:**
  - `tokens.md` and the taste profile say "Nothing loops". Apple flags slow perpetual oscillations (here a 2.7s cycle).
  - It is the only moving thing beside the one field the student must focus on.
- **Fix (LOOK):**
  - Play it as an arrival, then rest: `animation:wm-wave 1.35s step-end 2 alternate` (one full wave out and back, ending on 300). Add `.wm-g{animation-fill-mode:none}` so it settles on the token weight 500.
  - Pause while the ID field has focus: `.gate-stage:has(#gid:focus) .wm-g{animation-play-state:paused}`.
- **Frames:** `F/sheet-gate-wm.png` (0–1400ms, 50ms steps)

### 13 · The welcome loader spends half its life fading in, its loops never read, and it ends in a hard cut · `#/kirish` → `#/dastur`, 390
- **Measured:**
  - Visible 700ms. `ldr-in` is 350ms (opacity .86 at 178ms, 1 at about 368ms).
  - The 4s `ldr-bounce` shows about 17% of a cycle (≈2px).
  - `strobe-c3` has a 3s delay, so it **never fires**.
  - `backdrop-filter: blur(6px)` blurs the photo in (a blur transition).
  - Then home replaces the gate in one frame.
- **Why it matters:**
  - Decorative loops that cannot be perceived are pure cost.
  - The cut from a dark blurred photo to the bright home cards is the harshest brightness jump in the product (Apple §14: ease abrupt brightness changes).
- **Fix:**
  - **SAFE:**
    - `ldr-in` 160ms `var(--ease)`.
    - Render home underneath first, then fade the loader out: `ldr.animate([{opacity:1},{opacity:0}],{duration:200,easing:'cubic-bezier(.2,0,0,1)'}).finished.then(()=>ldr.hidden=true)`.
    - Delete `strobe-c3` (dead).
  - **LOOK:**
    - Drop the backdrop blur (the `.82` black scrim alone is enough).
    - Make the server stack static, or keep only `ldr-bounce` at 1.2s so one bob is visible.
    - The pending-only timing is ux-pass-2 #13.
- **Frames:** `F/sheet-gate-ldr.png` (≈70ms steps), `F/gate-ldr-00.png` … `-18.png`

## Low

### 14 · Toast and popup: keyframe entries, hard-cut exits · prompt lists (toast), `#/dastur` (popup)
- **Measured:**
  - The toast enters in 250ms (opacity + 8px) and is removed by `hidden` at 5s: shown at 5028ms, gone at 5059ms, no fade.
  - The popup enters over 350ms (above the 300ms budget) and "Yopish" removes it in one frame.
  - Both are `@keyframes` on `display` toggles, so they restart rather than retarget.
- **Fix (SAFE):**
  - `.toast,.nl{transition:opacity 200ms var(--ease),transform 200ms var(--ease),display 200ms allow-discrete}`
  - `@starting-style{.toast:not([hidden]){opacity:0;transform:translateY(8px)} .nl:not([hidden]){opacity:0;transform:translateY(-8px)}}`
  - `.toast[hidden],.nl[hidden]{display:none;opacity:0;transition-duration:150ms}`
  - Delete `toast-in` and `nl-in`. The exit (150ms) is faster than the entry (200ms).
- **Frames:** `F/m-toast-000.png` … `-250.png`, `F/sheet-home-popup.png`

### 15 · Arrow-key tab switching runs the full animation · `#/dars/n` tablist
- **Measured:** after `ArrowLeft`, four animations run: indicator 400ms, two label colours 250ms, and the 150ms awaited exit.
- **Why it matters:** "never animate keyboard-initiated actions" (Emil). Holding → through three tabs queues dissolves.
- **Fix (SAFE):** the keydown handler already exists. Set `root.dataset.instant='1'` around `show(to,true)`, like the language switch does. Keep the indicator's CSS transition at 160ms for keys, via a `.kbd` class.
- **Frames:** n/a (`document.getAnimations()` dump)

### 16 · ID field: the whole group slides 10px on focus, and the underline grows by `width` with a glow · `#/kirish`
- **Measured:**
  - `translateX` reaches 9.4px at about 190ms and 10px at about 330ms (400ms `(.2,1,.3,1)`).
  - The underline `width` 0 → 310px takes about 600ms (a layout property), with `box-shadow:0 0 15px`.
  - On a phone this slide happens while the keyboard opens and the caret appears.
- **Why it matters:** movement with no job; a glow ("no glows"); and a layout-bound property.
- **Fix (LOOK):**
  - Drop the slide.
  - `.mx-glow{width:100%;transform:scaleX(0);transform-origin:left;box-shadow:none;transition:transform 200ms var(--ease)} .mx-group:focus-within .mx-glow{transform:scaleX(1)}`
- **Frames:** numbers above (sampled every 45ms)

### 17 · KIRISH hover: `transition: all` with an overshoot, and letter-spacing re-layout · `#/kirish`, 1440
- **Measured:**
  - The hover runs 18 layouts in 700ms (letter-spacing 2 → 4px over 300ms).
  - `.mx-drop` uses `transition:all .5s cubic-bezier(.175,.885,.32,1.275)`, a back-out bounce on a tap-target hover, under the gooey blur filter.
  - It holds 61fps at 4×.
- **Fix (SAFE):**
  - `.mx-btn{transition:none}`, and drop the `:hover` letter-spacing.
  - `.mx-drop{transition:transform 200ms var(--ease),filter 200ms var(--ease)}`
  - Add `.mx-btn:active{transform:scale(.97)}` (#1), inside `(hover:hover)`.
- **Frames:** n/a

### 18 · The Google picture's tick grows from `scale(0)` · `#/dars/0`, card 02
- **Measured:** `g-tick` holds `scale(0)` from 0 to 45%, then grows to 1 by 65% (1.35 → 1.95s of the 3s pass).
- **Fix (SAFE):** `@keyframes g-tick{0%,45%{transform:scale(.5);opacity:0}65%,100%{transform:scale(1);opacity:1}}` in `src/prep_c.css`. Nothing appears from nothing.
- **Frames:** `F/sheet-m-prep-pics.png` (row 2)

### 19 · Accordions and "+/–" open in one frame · library `#/dars/2/amaliyot/*`, Vazifa Q1–Q5
- **Measured:**
  - A library row's panel (307px) appears at 16ms, with no animation. The +/– glyph swaps instantly.
  - Q1–Q5 (1,966px) opens instantly while its chevron turns over 200ms.
- **Why it matters (mildly):** in a 47-prompt list a 300px block popping in is a small jolt. Height animation would be layout work on a long list, so opacity only.
- **Fix (SAFE):** `.s1 .accp:not([hidden]){transition:opacity 160ms var(--ease);@starting-style{opacity:0}}`. Same on `.s1-more[open]>ol`. No height animation.
- **Frames:** `F/m-lib-acc-open.png`

### 20 · Reduced motion zeroes everything, including comprehension fades · global
- **Measured:** with `prefers-reduced-motion: reduce`:
  - 0 animations on the gate, the loader, home, the tabs and prep.
  - The ring shows its final value and the pictures show their final frame. Good.
  - The global `*{transition-duration:0s!important;animation:none!important}` also kills the toast, menu and sheet opacity fades.
- **Why it matters:** reduced motion means fewer and gentler animations, not zero (Emil, Apple §14). A toast that blinks into existence is harder to notice.
- **Fix (SAFE):** after #9 and #14 land, exempt the overlays from the global kill: `@media (prefers-reduced-motion:reduce){.toast,.nl,.nmenu,.sheet,.sheet::backdrop{transition:opacity 160ms var(--ease)!important;transform:none!important}}`.
- **Frames:** n/a

---

## Strengths (keep)
1. **The prep pictures are well-behaved motion.**
   - They play once (user decision) and are authored at the final frame.
   - They pause off-screen (IntersectionObserver at 20%) and while the tab is hidden. Card 04's slide resumed exactly where it stopped after a scroll away and back.
   - Reduced motion shows the finished frame.
2. **Routes and slides do not animate, and that is correct.**
   - The slide viewer's next tap paints "2 / 78" in 14ms. Focus stays on ›, and tap zones, keys and buttons all replace history.
   - Back restores the scroll position and focuses the link you came from.
   - No smooth-scroll anywhere.
3. **The tab switch is interruptible.**
   - A second tap 80ms after the first never shows the middle pane: the `seq` guard drops it and pane 1 → pane 3 cleanly.
   - The language switch and reduced motion already take an instant path.
   - The name menu's 200ms ease-out lands in about 190ms, from its trigger's side.
