# Demo 1: one brain, three doors (Claude chat, the agentic Claude window, Claude Code)

Run sheet 0:23-0:28 · 5 minutes · slides 7-9 · bold terms: **Harness**, **Claude web / desktop / Claude Code**.

## What the room must take away

1. The model is the engine; the harness is the car around it (tools: read files, run commands, open the browser).
   The same Opus behaves differently in a chat window and in Claude Code.
2. There are three doors to the same brain, and which door you use decides what it can touch:
   - Claude app on the web, phone or desktop: chat, plus long agentic tasks (what used to be "Cowork" now lives in the same window).
   - Claude desktop app: the same, plus a Code tab and access to local files while the app is open.
   - Claude Code in the terminal: works directly in a folder on your disk; every file there is in reach without uploading.
3. Real company data lives on disks, in hundreds of files; Claude Code is the door that opens the folder.

Facts checked 2026-11-03: chat and Cowork are one Claude (support.claude.com/en/articles/16761823); chat uploads take up to 500 MB per file and 20 files per chat (support.claude.com/en/articles/8241126, dated 23 July 2026).
Do not repeat the old "20 MB limit" line from the curriculum; it is out of date.

## Setup

- Browser tab: claude.ai, new chat, logged in to the demo Pro account.
- Warp tab 2: `~/Praktikum/baraka/kompaniya` (from `setup-demo-machine.sh`).
- Finder window on the same folder, list view, so the room sees 4 documents + 3 Form B files + templates.

## Script

| Step | Do | What appears | Say (UZ) |
|---|---|---|---|
| 1 | Slide 7 (engine and car) | - | "Model - dvigatel. Harness - mashinaning qolgani: rul, g‘ildirak, eshik. Bitta dvigatelni velosipedga ham, yuk mashinasiga ham qo‘yish mumkin." |
| 2 | Slide 8 (three doors) | - | "Bitta miya, uchta eshik. Qaysi eshikdan kirsangiz, u shuncha narsaga qo‘l uzata oladi." |
| 3 | Browser chat. Type the question below, no attachments. | Claude says it has no access to the documents and asks you to upload them. | "Chat papkamni ko‘rmaydi. Hujjatlarni bittalab yuklashim kerak." |
| 4 | Warp tab 2: `claude`, then the same question. | Claude lists the folder, reads the 4 documents and 3 Form B files, answers with the contradictions and file names. | "Claude Code papkaning ichida o‘tiribdi. Hech narsa yuklamadim. Fayllarni o‘zi ochdi." |
| 5 | Point at the file names in the answer. | - | "U qaysi fayldan olganini ko‘rsatyapti. Bu biz 1-darsda o‘rgangan odat: manbani ko‘rsat." |

The question (same in both windows):

```text
hujjatlar/ papkasidagi hujjatlar va kit1-interviews/ dagi intervyularni solishtir. Bir-biriga zid raqamlar bormi: yetkazish muddati, chegirma, kafolat? Qaysi fayl, qaysi gap - jadval qilib ko‘rsat.
```

Expected answer in Claude Code (the planted contradictions in the Baraka documents and Form B files):

| Mavzu | Rasmiy hujjat | Boshqa joyda |
|---|---|---|
| Yetkazish | 7 ish kuni (shartnoma 3.1) | «3 ish kunida» (ROP, intervyu); Malika «3 kun» ham, «7 ish kuni» ham degan |
| Chegirma | sotuvchi 5%, ROP 10% (prays-list 5) | «12-15%» (ROP, intervyu); Malika «chegirma qoidasi yozilmagan» deydi |
| Kafolat | 24 va 12 oy (shartnoma 4.1) | «36 oy» (KP) |
| Servis | 5 ish kuni (shartnoma 4.2) | «48 soat ichida» (KP) |

Real run on 2026-11-03: `demos/expected/demo-1-ziddiyatlar.md`.
The KP also promises free delivery across the region (the contract charges 8 000 so‘m per km); this run did not list it because the question asks about delivery time, discount and warranty only.

## While it runs (no side demos)

Say once, slowly: "Kod degan so‘zni unutdik. Bu yerda bitta qator kod yo‘q. U o‘qiyapti, solishtiryapti va jadval qilyapti."
If it takes more than 60 seconds, explain the harness slide again; do not open a second window.

## Fallback

- Claude Code slow or offline: slide 9 has the pre-run answer; read the table from it.
- Chat answers from memory or invents document content: good, say "Mana, gallyutsinatsiya: u bu hujjatlarni ko‘rmagan", and move on.
