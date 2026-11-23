# Demo 2: "Desktop papkamni tartibga keltir"

Run sheet 0:36-0:42 · 6 minutes · slide 13 · term: agentic (reference), first chore before Exercise 1.

## What the room must take away

1. Claude Code takes an everyday job in plain Uzbek, makes a plan, then acts.
2. It asks before acting (permission prompts) and deletes nothing when told so.
3. Undo: moves made by shell commands are NOT covered by `/rewind` (official checkpointing docs, checked 2026-11-03: files changed only by Bash are not tracked).
   That is why the prompt asks for a move log, and "qaytar" uses the log.

## Setup

- Demo user Desktop holds 40 messy files from `setup-demo-machine.sh` (KP drafts, 3D renders, Excel, zips, installers, a voice note).
- Finder window on Desktop, icon view, visible to the room before you start.
- Warp tab 1 in `~/Desktop`.

## Script

| Step | Do | What appears | Say (UZ) |
|---|---|---|---|
| 1 | Show the messy Desktop for 5 seconds. | 40 icons | "Tanish manzara?" |
| 2 | Warp tab 1: `claude`, paste the prompt. | A table: 6 folders and counts | "Avval reja. Hali hech narsa ko‘chmadi." |
| 3 | Type `ha`. Approve the permission prompt with "Yes". | Files move; `tartib-jurnal.md` appears | "U ruxsat so‘radi. Siz «Yes» bosmaguningizcha hech narsa qilmaydi." |
| 4 | Switch to Finder. | 6 folders + the log | "40 ta fayl, 0 ta o‘chirilgan." |
| 5 | Type the undo prompt for one folder only (below). | Files from «Arxivlar» go back | "Qaytarish ham oddiy so‘z bilan. Jurnal bo‘lgani uchun." |

Prompt (same as Exercise 1, Desktop instead of Downloads):

```text
Bu papkadagi fayllarni ko‘rib chiq.
Ularni turiga qarab papkalarga ajratish rejasini tuz: Hujjatlar, Rasmlar, Jadvallar, Arxivlar, O‘rnatish fayllari, Boshqalar.
Avval rejani jadval qilib ko‘rsat: qaysi papkaga nechta fayl ketadi.
Men «ha» desam, ko‘chir.
Hech bir faylni o‘chirma va nomini o‘zgartirma.
Har bir ko‘chirishni tartib-jurnal.md fayliga yoz: qaysi fayl, qayerdan, qayerga.
Oxirida nechta fayl qayerga ketganini qisqa ayt.
```

Undo prompt (one folder, to keep it short):

```text
tartib-jurnal.md bo‘yicha faqat Arxivlar papkasidagi fayllarni joyiga qaytar. Avval nima qilishingni ko‘rsat.
```

Expected plan (counts depend on Claude’s judgement on edge files such as `.numbers` and `.vcf`; 12 / 11 / 9 / 3 / 2 / 3 is typical):

| Papka | Soni | Misol |
|---|---|---|
| Hujjatlar | 12 | KP .docx, shartnoma va prays-list .pdf, .md qaydlar |
| Rasmlar | 11 | 3D renderlar, IMG_*.jpg, skrinshotlar, logo .svg |
| Jadvallar | 9 | .xlsx, .csv, .numbers |
| Arxivlar | 3 | .zip |
| O‘rnatish fayllari | 2 | .dmg, .pkg |
| Boshqalar | 3 | .ogg, .vcf, .txt |

Note `xato-skrinshot.png` on the Desktop is for Demo 3b; if Claude moves it to «Rasmlar», take it from there.

## While it runs

"Bu agent degani: vazifani qadamlarga bo‘ladi va har birini bajaradi. Siz unga «qanday» emas, «nima» kerakligini aytasiz."

## Fallback

- Permission prompts confuse the room: say "Bu xavfsizlik. Har safar so‘raydi, siz qaror qilasiz."
- Claude moves before showing the plan: press Esc, say "Esc - «Labbay?». To‘xtadi, lekin sessiya yopilmadi", then "Avval rejani ko‘rsat".
- Nothing works: slide 13 has before and after pictures.
