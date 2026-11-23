# Vazifalar ro‘yxati: savdo bo‘limi yordamchisi

<!--
Namuna haqida: 2-dars, 7-mashq. prd.md ni kichik dasturchi tushunadigan qadamlarga bo‘lish.
Haqiqiy reja rejimi natijasidagi 15 ta vazifadan (day-2/_build/sandbox/out/d/) qisqartirildi.
Har vazifada: nima qilinadi, nima chiqadi, qachon «tayyor», nimaga bog‘liq.
Kodni 3-darsda Claude Code yozadi; bu ro‘yxat uning ish tartibi.
-->

Manba: `prd.md` (versiya 0.1).
Qoida: har vazifa tugagach, egasi «tayyor, agar» bandini o‘zi tekshiradi.

| # | Vazifa | Nima chiqadi | Tayyor, agar | Bog‘liq |
|---|---|---|---|---|
| 1 | `app/` papkasini tayyorlash, `.env.example` va manbalar ro‘yxati | papka tuzilmasi, README | README da har manba va holati bor; KP manba emasligi yozilgan; `.env` hech qayerga yuklanmaydi | - |
| 2 | Prays-listni jadvalga ko‘chirish (kod, nom, chakana, ulgurji) | `narxlar.csv` | har qator hujjat bilan bir xil; amal qilish sanasi saqlangan | 1 |
| 3 | Qoidalar jadvali: chegirma, muddat, yetkazish narxi, kafolat | `qoidalar.md` | har qoida yonida hujjat va band raqami; KPdan hech narsa yo‘q | 1 |
| 4 | Tuzoq savollar ro‘yxati va ularni tekshiradigan sinov | 15 ta savol va kutilgan javob | «3 kunda yetkazasizmi?», «15% chegirma bering», «36 oy kafolatmi?» kabilar bor | 2, 3 |
| 5 | Narx kalkulyatori | kod + dona → narx, jami, formula | 4 dona chakana, 5 dona ulgurji narx bilan chiqadi | 2, 4 |
| 6 | Chegirma tekshiruvchi | summa, to‘lov turi, foiz → kim bera oladi | 20 mln va 50 mln chegaralari to‘g‘ri; hech qachon «beraman» demaydi | 3, 4 |
| 7 | Yetkazish muddati va viloyat narxi | material, km → muddat va narx, formula | 7 / 12 ish kuni; 40 km = 320 000 so‘m | 3, 4 |
| 8 | 1C qoldig‘ini o‘qish | kod → qoldiq va eksport vaqti | eski eksportda ogohlantiradi | 1 |
| 9 | «Bilmayman» javobi va yo‘naltirish | savol turi → mas’ul va Telegram | jadval `CLAUDE.md` bilan bir xil | 1 |
| 10 | Javob shabloni: mijozga qoralama + ichki izoh | shablon | «Hurmatli [Ism] aka / opa», «Siz», manba va formula bor | 5-9 |
| 11 | Taqiqlangan gaplar filtri | filtr | tuzoq iboralar ushlanadi; prays-list muddati o‘tsa ogohlantiradi | 10 |
| 12 | AI qismi: savolni tushunib, kerakli hisobni chaqirish | savol → tayyor qoralama | raqam faqat kalkulyatordan; 4-vazifadagi 15 savoldan 15 tasi o‘tadi | 5-11, `kit3-agent/instructions.md` (3-dars) |
| 13 | Xodimlar uchun kanal (ochiq savol 4 hal bo‘lgach) | ichki Telegram bot yoki sahifa | ro‘yxatda yo‘q odam kira olmaydi; token faqat `.env` da | 12 |
| 14 | Jurnal va haftalik hisobot | jurnal fayli, haftalik jadval | `kit5-pilot/numbers.md` uchun raqamlar chiqadi | 13 |

Kichik dasturchiga eslatma: savolni tushunmasangiz, taxmin qilmang, `prd.md` dagi «Ochiq savollar» ga yozing.
