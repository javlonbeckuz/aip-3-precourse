# Demo 5: Kit 2 from three Form B files

Run sheet 1:20-1:25 · 5 minutes · slides 24-27 · kit: To‘plam 2 «Qaysi jarayondan boshlaymiz?».

## What the room must take away

1. A process is a chain with a start and a result; it can cross several people (Zarina, Malika and Jamshid aka all answer the same price questions).
2. Six criteria, 1 to 5 each: Value = A.2 + A.3 + A.7, Ease = A.4 + A.5 + A.6, each 3-15, threshold 9.
3. Claude drafts the scores with a reason and a line number for every one; the owner corrects at least one, with a reason.
4. Sorting work runs on Sonnet or Haiku; Opus is for the choice and the plan.

## Setup

- Warp tab 2 in `~/Praktikum/baraka/kompaniya` (the live folder has blank Kit 2 templates).
- `/model sonnet` before you start.
- Browser tab ready for `kit2-scoring/matrix.html`.
- Fallback folder: `~/Praktikum/baraka-tayyor/kompaniya/kit2-scoring/` (finished files).
- The Baraka `CLAUDE.md` already names the chosen process (the worked example is the state at the end of Day 2); say so: "Sizda bu bo‘lim hozircha bo‘sh."

## Script

| Step | Do | What appears | Say (UZ) |
|---|---|---|---|
| 1 | Slides 24-26: process, six criteria, the two sums. | - | "Qiymat - qanchalik foydali. Osonlik - AI’ga berish qanchalik oson. Ikkalasi ham 9 dan katta bo‘lsa, boshlash joyi." |
| 2 | Paste the Exercise 4 prompt. | Claude reads the three Form B files, lists 7-8 processes with file:line references and hours, then the score table with reasons. Takes 1-2 minutes on Sonnet. | (while it runs, see below) |
| 3 | Point at process 1, its A.4 and A.6. | In the 2026-11-03 test run on these three Form B files Claude scored process 1 Value 15 (17,3 hours) but Ease 9 [?]: A.6 = 1 ("an old price already cost 350 000 so‘m") and A.4 = 4 [?] (Malika says the discount rule is not written down). Expect a different grouping every run (that run made 7 processes, the course example 8). | "Claude ehtiyotkor. Bilmagan joyini [?] qoldirdi. Endi qaror meniki." |
| 4 | Type the correction (below), then `yoz`. | Process 1 becomes Ease 10 (4 + 4 + 2): "Birinchi sinov". Reasons keep the old and the new score. | "Har bir o‘zgartirishning sababi yoziladi. Sababsiz ball ko‘tarish - o‘zini aldash." |
| 5 | Ask for the matrix (Exercise 5 prompt) or open the finished `matrix.html` from the fallback folder. | In the course example four dots are top right: 1, 3, 6, 8; 3 and 6 carry a [?]. | "To‘rtta nomzod. Qiymati eng katta va [?] siz jarayon - 1. Yakuniy qarorni uyda bo‘lim boshlig‘i bilan qilasiz." |

Correction prompt:

```text
1-jarayonda A.4 dagi [?] ni olib tashla: chegirma qoidasi prays-listning 5-bo‘limida yozilgan (menejer 5% gacha, ROP 10% gacha).
1-jarayonda A.6 ni 2 qil. Sababi: bot faqat xodimga javob beradi va xodim mijozga aytishdan oldin tekshiradi; lekin telefonda aytilgan narxni qaytarib bo‘lmaydi, shuning uchun 3 emas.
Sabablarni «Sabablar» bo‘limiga eski ball bilan birga yoz va Osonlikni qayta hisobla.
```

## While it runs

- "U uchta faylni o‘qiyapti va har bir vazifani qaysi qatordan olganini yozyapti. Bu «Hisobni ko‘rsat» odati."
- "Bu ish uchun eng kuchli model shart emas. Sonnet yetadi, limitni tejaymiz."

## Expected result

Course example (the kits package’s Baraka folder, a real `/kit2` run reviewed by the owner), copied into `company-folder-starter/baraka-office/kompaniya/kit2-scoring/`: `form-a-scoring.md`, `form-b-matrix.md`, `matrix.html`.
Its own owner correction: process 6 (KP) A.6 from 3 to 2, because an old price already cost 350 000 so‘m; Ease 13 to 12.
Raw Claude Code output of the Exercise 4 prompt on the same three Form B files (Sonnet 5.5, 2026-11-03): `_build/sandbox/out/c/folder/kit2-scoring/form-a-scoring.md` (7 processes; process 1 Value 15, Ease 9 [?]).

| # | Jarayon | Qiymat | Osonlik | Joyi |
|---|---|---|---|---|
| 1 | Narx, qoldiq, chegirma, muddat savoli | 15 | 10 | Birinchi sinov |
| 2 | Kiruvchi qo‘ng‘iroq | 15 | 6 | Foydali, puxta reja kerak |
| 3 | amoCRM yuritish | 12 | 10 [?] | Birinchi sinov |
| 4 | Chiquvchi qo‘ng‘iroq | 13 | 6 | Foydali, puxta reja kerak |
| 5 | Kunlik savdo hisoboti | 9 | 14 | Chegarada |
| 6 | KP | 12 [?] | 12 | Birinchi sinov |
| 7 | Instagram va Telegram xabarlari | 14 | 9 | Chegarada |
| 8 | Yangi murojaat menejerga | 11 | 12 | Birinchi sinov |

## Fallback

Claude Code slow: open the finished files from `~/Praktikum/baraka-tayyor/` and walk the reasons from the file; slide 27 shows the matrix.
