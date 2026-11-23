# Demo 4: CLAUDE.md and memory

Run sheet 0:50-0:53 · 3 minutes · slides 17-18 · bold term: **CLAUDE.md**; reference terms: `/init`, global instructions, nested CLAUDE.md, auto memory.

## What the room must take away

1. Claude Code can read your documents by itself (Demo 1).
   CLAUDE.md adds what documents cannot: which source wins when they disagree, how you speak to customers, who answers what, and your house rules.
2. It is read at the start of every session, so you write your company context once.
3. Keep it short (under 200 lines), facts not adjectives, no passwords.

## The honest result we tested (2026-11-03)

We ran the same customer question in the same Baraka folder twice, once without and once with CLAUDE.md (Claude Code 2.1.316, Sonnet 5.5).
Full answers: `demos/expected/claude-md-siz.md` and `demos/expected/claude-md-bilan.md`.

| | Without CLAUDE.md | With CLAUDE.md |
|---|---|---|
| Facts (24 / 12 months, 8 000 so‘m per km) | correct, found in the contract | correct, same contract clauses |
| The KP says "36 months, free delivery in the region" | sees the conflict, then hedges: "check with management which one applies; if the KP is right I will change the answer" | decides: "these two are wrong; CLAUDE.md and the contract override them" |
| Greeting | "Assalomu alaykum!" | «Hurmatli [Ism] aka / opa», «Siz» (house rule) |
| Who to ask about the distance | "logistika boshlig‘i (Otabek aka)" | Otabek aka with his Telegram, @baraka_logistika |
| Formula | prose | `km × 8 000 so‘m [masofa: ?]` (house rule "show the formula", no invented number) |

A first version of this demo used the question "Optima, 20 pieces, 15% off, delivered in 3 days?".
Both runs answered it correctly from the price list and the contract (`_build/sandbox/out/h-15foiz`, `i-15foiz`), so it did not show the difference.
The warranty question below does, because the KP contradicts the contract and only CLAUDE.md says which one is right.

## Setup

- Warp tab 2 in `~/Praktikum/baraka-chatsiz/kompaniya` (same folder, no CLAUDE.md); a second Warp tab in `~/Praktikum/baraka/kompaniya` (with CLAUDE.md).
- Fallback: slide 18 shows both answers side by side.

## Script

| Step | Do | Say (UZ) |
|---|---|---|
| 1 | Tab without CLAUDE.md: `claude`, paste the question. | "Claude Code hujjatlarni o‘zi o‘qiydi. Qarang, javob to‘g‘ri. Lekin oxiriga e’tibor bering: «rahbariyatdan so‘rang, KP to‘g‘ri bo‘lsa, o‘zgartiraman». U ikkilanyapti." |
| 2 | Tab with CLAUDE.md: same question. | "Endi u biladi: KP xato, shartnoma to‘g‘ri. Mijozga «Hurmatli ... aka» deb yozdi, Otabek akaning Telegramini ko‘rsatdi, formulani berdi. Bularning hammasi CLAUDE.md da bir marta yozilgan." |
| 3 | Open `CLAUDE.md` in Warp (or the editor), scroll to «Rasmiy hujjatlar». | "Eng muhim bo‘lim shu: ziddiyat bo‘lsa, qaysi hujjat to‘g‘ri." |
| 4 | One sentence on the grey comments. | "Kulrang izohlarni Claude o‘qimaydi, ular siz uchun eslatma." |

The question:

```text
Mijoz Telegram’da so‘radi: «Kafolat necha yil? Chirchiqqa yetkazib berish bepulmi?» Mijozga yuboriladigan javob matnini yoz va qaysi hujjatga tayanganingni alohida ayt.
```

## Memory, in one breath (say during Exercise 2, not as a separate demo)

- `CLAUDE.md` in the company folder: you write it, it travels with the folder.
- `~/.claude/CLAUDE.md`: your global rules for every Claude Code session (Exercise 3).
- A `CLAUDE.md` inside a subfolder (for example `kit1-interviews/`): loaded only when Claude works in that folder, so the main file stays short.
- Auto memory: Claude Code also keeps its own short notes about your corrections (on by default; `/memory` shows and switches it).
  It is not a substitute for CLAUDE.md, because you do not control what it writes.
- `/init`: reads the folder and drafts a CLAUDE.md.
  Tested 2026-11-03: in a folder with no CLAUDE.md it wrote an English, developer-style file ("This file provides guidance to Claude Code ... when working with code in this repository"), see `_build/sandbox/out/a/folder/CLAUDE.md`.
  With the course template already in the folder it filled the Uzbek template from the documents and asked before replacing the file (`_build/sandbox/out/b/folder/CLAUDE.new.md`).
  That is why the starter ships the template.

Sources checked 2026-11-03: code.claude.com/docs/en/memory (locations, `/init`, under 200 lines, HTML comments stripped, subfolder files load on demand, auto memory).

## Fallback

Slide 18 has both answers; read the two differences aloud.
