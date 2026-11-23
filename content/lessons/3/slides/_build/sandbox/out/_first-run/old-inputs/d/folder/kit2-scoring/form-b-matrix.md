# To‘plam 2 · B shakli: Qiymat va osonlik

Praktikum 3.0 · Qaysi jarayondan boshlaymiz? · Fayl: `kit2-scoring/form-b-matrix.md`

«Baraka Office» MChJ: shartli misol, raqamlar usulni ko‘rsatish uchun.

- Bo‘lim: Savdo bo‘limi
- Sana: 2026-11-29

Qiymat (A.8) / Osonlik (A.9): Birinchi sinov · Foydali, puxta reja kerak · Oson, lekin foydasi kichik · Hozircha tegmang
Chegara: 9 ball. Ikkalasi 9 dan katta - «Birinchi sinov»; biri 9 ga teng - «Chegarada».

### Matritsadagi nuqtalar

| # | Jarayon (A.1) | Qiymat (A.8) | Osonlik (A.9) | Matritsadagi joyi |
|---|---|---|---|---|
| 1 | Narx, qoldiq, chegirma va muddat savollariga javob (savol kelganidan to‘g‘ri javob ketguncha) | 15 | 11 | Birinchi sinov |
| 2 | Lidni malakalash va AmoCRM kartochkasi (zayavkadan sotuvchiga uzatilguncha) | 14 | 10 | Birinchi sinov |
| 3 | Tijoriy taklif (3D chizmadan KP yuborilguncha) | 11 | 9 | Chegarada |
| 4 | KPdan keyin qayta aloqa (KP yuborilgandan javob olguncha) | 9 | 11 | Chegarada |
| 5 | Chegirmaga ruxsat (sotuvchi so‘rovidan ROP qaroriga) | 10 | 8 | Foydali, puxta reja kerak |
| 6 | Haftalik sotuv hisoboti (AmoCRM’dan direktorga) | 6 | 14 | Oson, lekin foydasi kichik |
| 7 | Yetkazish sanasini kelishish (shartnomadan sana tasdiqlanguncha) | 10 | 5 | Foydali, puxta reja kerak |
| 8 | Yangi sotuvchini o‘qitish (birinchi kundan imtihongacha) | 8 | 8 | Hozircha tegmang |

Matritsa rasmi: `kit2-scoring/matrix.html` (brauzerda oching).

### B.1 Tanlangan jarayon

Narx, qoldiq, chegirma va muddat savollariga javob (savol kelganidan to‘g‘ri javob ketguncha), savdo bo‘limi.

### B.2 Nega aynan shu

Haftasiga 16,2 soat ketadi va kuniga 25 ga yaqin savol keladi. Javoblar prays-list, shartnoma va 1C qoldig‘ida yozilgan, ya’ni qoida aniq. Agent javobni qoralaydi, sotuvchi yoki operator tasdiqlaydi: xato mijozga yetmaydi. Shu bilan «3 kunda yetkazamiz» va «12-15% chegirma» kabi noto‘g‘ri va’dalar ham to‘xtaydi.

### B.3 Hozir nimani qilmayapmiz

Lidni malakalash (2-o‘rin) keyingi jarayon bo‘ladi. KP va chegirmaga ruxsatga hozir tegmaymiz: pulga to‘g‘ridan-to‘g‘ri tegadi. Agent mijozga o‘zi yozmaydi: avval faqat xodimlar uchun ichki yordamchi.

### Sinov nega muvaffaqiyatsiz bo‘lishi mumkin

1. Prays-list va shartnoma bilan intervyudagi gaplar zid (3 kun va 7 ish kuni; 12-15% va 10%): rahbar qaysi biri to‘g‘ri ekanini yozma tasdiqlamasa, agent ham chalkashadi.
2. 1C qoldig‘i kuniga bir marta eksport qilinsa, kun ichida sotilgan mebel «bor» bo‘lib ko‘rinadi.
3. Sotuvchilar eski odat bilan Jamshid akaga yozishda davom etadi va agentni ishlatmaydi.

Boshlashdan oldin javob topish kerak bo‘lgan savol: 1C qoldig‘ini kuniga necha marta va kim eksport qiladi (Otabek aka yoki Sardorbek)?

### Bo‘lim boshlig‘i bilan kelishuv (uy vazifasi)

- [ ] Jamshid Karimov ballarni ko‘rib chiqdi (sana: ____ )
- [ ] B.1-B.3 ga rozi
- [ ] 3 kun / 7 ish kuni va 12-15% / 10% ziddiyati bo‘yicha Rustamov S.A. yozma qaror berdi
