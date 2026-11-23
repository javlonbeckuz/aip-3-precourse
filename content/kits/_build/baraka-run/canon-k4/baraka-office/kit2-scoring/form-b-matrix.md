# To‘plam 2 · B shakli: Qiymat va osonlik

Praktikum 3.0 · Qaysi jarayondan boshlaymiz? · Fayl: `kit2-scoring/form-b-matrix.md`

- Bo‘lim: savdo
- Sana: 2026-11-29

Qiymat (A.8) / Osonlik (A.9): Birinchi sinov · Foydali, puxta reja kerak · Oson, lekin foydasi kichik · Hozircha tegmang

### Matritsadagi nuqtalar

| # | Jarayon (A.1) | Qiymat (A.8) | Osonlik (A.9) | Matritsadagi joyi |
|---|---|---|---|---|
| 1 | Narx, qoldiq, chegirma, muddat savoli | 15 (5+5+5) | 10 (4+4+2) | Birinchi sinov |
| 2 | Kiruvchi qo‘ng‘iroq | 15 (5+5+5) | 6 (2+2+2) | Foydali, puxta reja kerak |
| 3 | amoCRM yuritish | 12 (5+5+2) | 10 (4+2+4) [?] | Birinchi sinov |
| 4 | Chiquvchi qo‘ng‘iroq | 13 (5+4+4) | 6 (2+2+2) | Foydali, puxta reja kerak |
| 5 | Kunlik savdo hisoboti | 9 (4+4+1) | 14 (5+5+4) | Chegarada |
| 6 | KP | 12 (4+4+4) [?] | 12 (5+5+2) | Birinchi sinov |
| 7 | Instagram va Telegram xabarlari | 14 (5+4+5) | 9 (2+4+3) | Chegarada |
| 8 | Yangi murojaat menejerga | 11 (5+4+2) | 12 (5+3+4) | Birinchi sinov |

### B.1 Tanlangan jarayon

1-jarayon: narx, qoldiq, chegirma va muddat savoli (mijoz savol beradi - javob mijozga yetadi).
Qiymat 15 (5+5+5), Osonlik 10 (4+4+2). Bot nomi: «Savdo yordamchisi».

### B.2 Nega aynan shu

Menejerlar va call-markaz bir xil savolni kuniga o‘nlab marta Jamshid akaga beradi, mijoz kutadi, javob esa hujjatlarda bor.
Jamshid akaning vaqti tenderlarga qoladi.

### B.3 Hozir nimani qilmayapmiz

- KPni hozir qilmayapmiz: u 2-jarayon, kursdan keyin.
- Bot mijozga hech narsa yozmaydi, faqat xodimlarga (menejerlar, call-markaz) javob beradi.

### Xatarlar va boshlashdan oldingi savol

Muvaffaqiyatsizlikning 3 ta ehtimolli sababi:
1. Ma’lumot eskiradi: eski narx yoki qoldiq aytiladi (350 000 so‘mlik zarar takrorlanadi).
2. Xodimlar odatdagidek Jamshid akaga yozishda davom etadi, botdan foydalanmaydi.
3. Og‘zaki qoidalar qaytadi (12-15% chegirma, 3 kunda yetkazish) yoki qoidalar.md da javob yo‘q holat chiqadi.

Savol: 1C qoldig‘i va prays-list qanchalik tez-tez yangilanadi?
Egasining javobi (2026-11-29): 1C qoldig‘i har kuni ertalab 1C dan CSV qilib yuklanadi; prays-list o‘zgarsa, CSV almashtiriladi.
Eslatma: hozirgi `data/ombor-1c.csv` 01.11.2026 holatiga va kirill kodlashi (cp1251) da; kunlik yuklashda bot uni to‘g‘ri o‘qishini tekshirish kerak.
