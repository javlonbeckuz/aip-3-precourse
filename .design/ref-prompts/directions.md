# Prompt display: 4 researched directions

Screenshots are in this folder. All sizes are estimates.

**Rules for every direction:**
- Copying marks the prompt done.
- Copy returns the raw ʻ ʼ characters.
- [placeholder] text is `#FDC959`, text colour only, never a fill.

**Use the same two prompts in every mockup:**
- **P1 "Manbalarni tekshirish"** (done)
  - Target: NotebookLM → Chat
  - Text: "Yuklangan manbalar asosida «Ravon Uy» kompaniyasining oxirgi choragidagi 5 ta asosiy raqamini jadval qilib chiqar. Har bir raqam qaysi hujjatdan olinganini koʻrsat."
- **P2 "Audio-brifing sozlamasi"** (not done)
  - Target: NotebookLM → Studio → Audio Overview → Customize
  - Text: "Rahbar uchun 10 daqiqalik brifing tayyorla. Avval eng muhim 3 ta muammo, keyin [boʻlim nomi] boʻyicha raqamlar. Ohang: qisqa va aniq, rasmiy emas. Oxirida bitta aniq tavsiya ber."
- **For C and D, also add 2 more short prompts** so the switcher/list has 4 items:
  - P3 "Savol-javob kartalari" (NotebookLM → Studio → Flashcards)
  - P4 "Xatolarni topish" (NotebookLM → Chat)

## A · Target window (Claude Academy app window 04 + GitHub header bar 03)
Each prompt is drawn as a small mock of the app it gets pasted into.

**Structure:**
- **Title bar:** the paste target path, e.g. `NOTEBOOKLM › STUDIO › AUDIO OVERVIEW › CUSTOMIZE`, in Martian Mono 12px uppercase `#9A9A9A`, with a copy icon on the right. Fill `#161616`, 40px tall, hairline below.
- **Body:** the prompt in Golos Text 17/1.6 `#EDEDED`, the body font, to preview how it reads once pasted.
- **Footer:** the title in Golos 15px uppercase `#9A9A9A` on the left, and a 40px white square copy button on the right.

**Window:** `#111` fill, 1px `#2A2A2A` border, 14px radius.

**Done:** the button reads "✓ Nusxalandi" and the border turns `#595959`.

**Mobile:**
- The path shows only its last 2 segments, after "…".
- Copy is a full-width 48px button.
- Windows stack 16px apart.

## B · Prompt wall (Raycast ray.so/prompts 02)
A 2-column grid of tiles. The prompt text IS the tile.

**Tile structure:**
- **Text panel:** `#141414` inside a `#0E0E0E` outer, radius 10/6, 1px `#1F1F1F`. About 220px tall, clamped to 7 lines with a fade-out.
- **Prompt:** Martian Mono 13/1.7, `#8C8C8C` at rest, `#FFF` on hover/focus. Placeholders light up yellow on hover.
- **Caption below:** the title in Golos 15px uppercase white, then the target in Martian Mono 11px `#6E6E6E`.
- **Copy:** clicking anywhere on the tile copies. A focusable `<button>` covers the tile; no visible button.

**Done:** a ✓ in `#FDC959` before the caption, and the tile tint shifts to `#121212` with `#0A14FC` at 8%.

**Mobile:** 1 column. On `(hover:none)` devices the text is white by default.

## C · Sample switcher (OpenAI ChatGPT "Samples" 05)
Only one prompt is visible at a time.

**Switcher:**
- A row of outline pills at the top: "1 · MANBALAR", "2 · AUDIO", …
- Pills: Golos 15px uppercase, 1px `#595959`, 999 radius, 40px tall.
- Active pill: white fill, black text.
- Done pill: ✓ before the label, border `#9A9A9A`.

**Panel (no box, straight on black, max width about 720px):**
- **Speaker line:** `SIZ → NOTEBOOKLM · STUDIO · AUDIO OVERVIEW`, in Martian Mono 12px uppercase, white at 60%.
- **Prompt:** Golos Text 22/1.55 white.
- **Copy:** a white square button labelled "NUSXA OLISH".
- **After copying:** a "Keyingisi →" link appears.

**Mobile:**
- The pill row scrolls sideways with snap and a fade on the right edge.
- The prompt drops to 18px.
- Copy is full width.

## D · Fold-open library (Claude Code prompt library 01 + GitHub header 03 + Linear numbering 06)
An accordion. Only one row is open at a time, and the first prompt that isn't done opens by default.

**Collapsed row:**
- Fill `#111`, 12px radius, 8px gap between rows. The rows are FILLED, not hairlines; the hairline list was rejected.
- Mono number on the left, in Martian Mono 13px `#595959`.
- The title in Mona Sans Expanded 18px uppercase, wght 500.
- A one-line cut-off preview in Martian Mono 12px `#7A7A7A`.
- The done ✓ on the right.

**Open row:**
- A "QAYERGA" label with the target path.
- A prompt block: `#080808` fill, 1px `#2A2A2A`, prompt in Martian Mono 14/1.7 `#F2F2F2`.
- The block's header bar holds a `›` mark and a 32px white square copy button.

**Done:** the number becomes ✓ in `#FDC959`.

**Mobile:**
- The preview line is hidden below 400px.
- In the open block, copy becomes a 44px full-width bar under the text.
