# First-build examples

Three finished targets the instructor shows at 0:15 so the room sees what "done" looks like.
Each is one self-contained HTML file that works offline and on a phone.

How they were made: written by Claude (Opus 5.5, in this overnight build) following the prompt on the prompt sheet, filled in as below.
They are not screenshots of claude.ai artifacts, and a participant's own artifact will look different.
All companies and prices are labelled as namuna (sample); Baraka Office is the course's fictional demo company.

| File | Prompt on the sheet | Filled in with |
| --- | --- | --- |
| `namuna-kalkulyator.html` | 7. Ishlab chiqarish | Ofis mebeli; 8 products with codes, retail (1-4) and wholesale (5+) prices from `nlm-lead-magnet-video/demo-fayllar/01_Prays_list_va_Katalog_2026.md`; manager discount up to 5% above 20 000 000 so‘m |
| `namuna-banket.html` | 5. Restoran yoki to‘yxona | Standart 185 000 / Premium 260 000 so‘m per guest; cake, live music, decoration, welcome tea; 10% service |
| `namuna-taklif.html` | 4. O‘quv markazi | English and maths courses for children, 450-520 thousand so‘m a month, 8 per group, 10% sibling discount, Chilonzor |

The slide-7 image (`deck/assets/img/namuna-kalkulyator.png`) is regenerated from `namuna-kalkulyator.html` by `_build/qa_pages.py`.
