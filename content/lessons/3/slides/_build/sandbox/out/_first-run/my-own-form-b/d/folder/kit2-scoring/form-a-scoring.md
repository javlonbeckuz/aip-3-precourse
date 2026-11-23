# To‘plam 2 · A shakli: Jarayonlarni baholash

Praktikum 3.0 · Qaysi jarayondan boshlaymiz? · Fayl: `kit2-scoring/form-a-scoring.md`

«Baraka Office» MChJ: shartli misol, raqamlar usulni ko‘rsatish uchun.

- Bo‘lim: Savdo bo‘limi (call-markaz, sotuv menejerlari, ROP)
- Baholadi: Rustamov S.A. (egasi) Claude Code bilan; 2026-12-02 da Jamshid Karimov (ROP) ko‘rib chiqadi
- Sana: 2026-11-29

| # | A.1 Jarayon (boshlanishi - natijasi) | A.2 Takrorlanishi | A.3 Ketadigan vaqt | A.4 Aniq qoidasi bor | A.5 Ma’lumot raqamli | A.6 Xatosi arzon | A.7 Mijozga ta’siri | A.8 Qiymat | A.9 Osonlik |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Narx, qoldiq, chegirma va muddat savollariga javob (savol kelganidan to‘g‘ri javob ketguncha) | 5 | 5 | 4 | 4 | 3 | 5 | 15 (5+5+5) | 11 (4+4+3) |
| 2 | Lidni qabul qilish va AmoCRM zayavkasi (qo‘ng‘iroq yoki xabardan menejerga uzatilguncha) | 5 | 4 | 3 | 4 | 3 | 4 | 13 (5+4+4) | 10 (3+4+3) |
| 3 | Tijoriy taklif (3D chizmadan KP yuborilguncha) | 3 | 4 | 4 | 3 | 2 | 4 | 11 (3+4+4) | 9 (4+3+2) |
| 4 | KPdan keyin qayta aloqa (KP yuborilgandan javob olguncha) | 3 | 2 | 3 | 4 | 4 | 4 | 9 (3+2+4) | 11 (3+4+4) |
| 5 | Chegirmaga ruxsat (sotuvchi so‘rovidan ROP qaroriga) | 4 | 3 | 4 | 3 | 1 | 3 | 10 (4+3+3) | 8 (4+3+1) |
| 6 | Kunlik va haftalik sotuv hisoboti (AmoCRM’dan rahbarga) | 4 | 4 | 5 | 5 | 4 | 1 | 9 (4+4+1) | 14 (5+5+4) |
| 7 | Yetkazish sanasini kelishish (shartnomadan sana tasdiqlanguncha) | 3 | 2 | 2 | 2 | 1 | 5 | 10 (3+2+5) | 5 (2+2+1) |
| 8 | Yangi sotuvchini o‘qitish (birinchi kundan imtihongacha) | 3 | 3 | 2 | 3 | 3 | 2 | 8 (3+3+2) | 8 (2+3+3) |

- A.2: 1 ball - oyiga bir marta … 5 ball - kuniga bir necha marta
- A.3: 1 ball - haftasiga bir necha daqiqa … 5 ball - haftasiga 10 soatdan ko‘p
- A.4: 1 ball - har bir holat har xil … 5 ball - har doim bir xil qadamlar
- A.5: 1 ball - qog‘ozda yoki odamlar yodida … 5 ball - allaqachon tizim yoki jadvalda
- A.6: 1 ball - xato pul yoki ishonchni yo‘qotadi … 5 ball - xatoni sezish va to‘g‘rilash oson
- A.7: 1 ball - faqat ichki jarayon … 5 ball - mijoz buni kutib turadi

A.8 Qiymat = A.2 + A.3 + A.7; A.9 Osonlik = A.4 + A.5 + A.6; har biri 3 dan 15 gacha.

## Sabablar

### 1. Narx, qoldiq, chegirma va muddat savollariga javob (savol kelganidan to‘g‘ri javob ketguncha)

- `A.2 = 5`: kuniga 15 + 5 + 8 = 28 ta narx, qoldiq va muddat savoli (zarina-form-b.md 5-qator, malika-form-b.md 2-qator, jamshid-form-b.md 1-qator), ustiga kuniga 30 ta Instagram va Telegram xabari (zarina-form-b.md 2-qator)
- `A.3 = 5`: haftasiga 15,2 soat, 10 soatdan ko‘p (pastdagi tarkib)
- `A.4 = 4`: javoblar prays-list va shartnomada yozilgan; lekin intervyularda ziddiyat bor (3 kun va 7 kun), shuning uchun 5 emas
- `A.5 = 4`: prays-list PDF va 1C qoldiq eksporti raqamli; qoldiq hozir Otabek akadan og‘zaki so‘raladi
- `A.6 = 3`: noto‘g‘ri narx pulga tushadi, lekin sotuvchi tasdiqlasa, xato mijozga yetmaydi
- `A.7 = 5`: mijoz javobni kutib turadi; Zarina javobni menejerdan 5-10 daqiqa kutadi (zarina-form-b.md 5-qator)

### 2. Lidni qabul qilish va AmoCRM zayavkasi (qo‘ng‘iroq yoki xabardan menejerga uzatilguncha)

- `A.2 = 5`: kuniga 20 ta yangi zayavka (zarina-form-b.md 3-qator)
- `A.3 = 4`: haftasiga 7,2 soat, 4-10 soat oralig‘ida
- `A.4 = 3`: zayavka maydonlari aniq (ism, telefon, kompaniya, ish o‘rinlari), lekin suhbat har xil o‘tadi
- `A.5 = 4`: AmoCRM kartochkasi raqamli
- `A.6 = 3`: zayavka chala yoki noto‘g‘ri menejerga ketsa, mijoz kutib qoladi
- `A.7 = 4`: mijoz menejer qo‘ng‘irog‘ini kutadi; 10 daqiqa qoidasi shunga bog‘liq

### 3. Tijoriy taklif (3D chizmadan KP yuborilguncha)

- `A.2 = 3`: haftasiga 4 ta KP (malika-form-b.md 4-qator)
- `A.3 = 4`: bitta sotuvchida 4,3 soat; 5 sotuvchida ko‘proq [?]
- `A.4 = 4`: narx va chegirma qoidasi yozilgan
- `A.5 = 3`: narx PDF’da, 3D chizma Javohirda, o‘lcham qog‘ozda
- `A.6 = 2`: KPdagi xato narx shartnomaga o‘tadi
- `A.7 = 4`: mijoz KPni kutadi

### 4. KPdan keyin qayta aloqa (KP yuborilgandan javob olguncha)

- `A.2 = 3`: haftasiga 8 marta
- `A.3 = 2`: haftasiga 0,8 soat, 1 soatgacha
- `A.4 = 3`: eslatish qoidasi aniq, suhbat har xil
- `A.5 = 4`: KP sanasi AmoCRM’da bor
- `A.6 = 4`: eslatma xatosini sezish oson
- `A.7 = 4`: mijoz bilan bevosita aloqa

### 5. Chegirmaga ruxsat (sotuvchi so‘rovidan ROP qaroriga)

- `A.2 = 4`: haftasiga 3 + 6 = 9 marta, kuniga bir martadan ko‘p
- `A.3 = 3`: haftasiga 1,5 soat
- `A.4 = 4`: 5% va 10% chegarasi prays-listda yozilgan
- `A.5 = 3`: so‘rov Telegram’da og‘zaki keladi
- `A.6 = 1`: xato chegirma to‘g‘ridan-to‘g‘ri pul yo‘qotadi
- `A.7 = 3`: mijoz javob kutadi, lekin bir kun kuta oladi

### 6. Kunlik va haftalik sotuv hisoboti (AmoCRM’dan rahbarga)

- `A.2 = 4`: kuniga bir marta (zarina-form-b.md 6-qator), ustiga haftalik hisobot
- `A.3 = 4`: haftasiga 4,0 soat = 2,0 + 2,0
- `A.4 = 5`: har kuni va har hafta bir xil jadval
- `A.5 = 5`: hamma raqam AmoCRM’da
- `A.6 = 4`: xato hisobot ichkarida qoladi, sezish oson
- `A.7 = 1`: faqat ichki jarayon

### 7. Yetkazish sanasini kelishish (shartnomadan sana tasdiqlanguncha)

- `A.2 = 3`: haftasiga 3 marta (faqat Malika so‘raldi)
- `A.3 = 2`: haftasiga 0,8 soat
- `A.4 = 2`: qoida bir xil emas: sotuvchilar 3 kun deydi, shartnomada 7 ish kuni
- `A.5 = 2`: ombor va brigada jadvali Otabek akaning yodida va Telegram’da
- `A.6 = 1`: noto‘g‘ri sana mijozga berilgan yolg‘on va’da bo‘ladi
- `A.7 = 5`: mijoz sanani kutadi, ofisga ko‘chishi shunga bog‘liq

### 8. Yangi sotuvchini o‘qitish (birinchi kundan imtihongacha)

- `A.2 = 3`: haftasiga 3 marta
- `A.3 = 3`: haftasiga 1,5 soat
- `A.4 = 2`: har bir yangi xodim har xil
- `A.5 = 3`: reglament va NotebookLM bilim bazasi bor, qolgani Jamshid akaning tajribasida
- `A.6 = 3`: noto‘g‘ri o‘rgatilsa, xato takrorlanadi, lekin vaqtida ushlanadi
- `A.7 = 2`: mijozga bilvosita ta’sir qiladi

## Jarayonlar tarkibi

1. Narx, qoldiq, chegirma va muddat savollariga javob (savol kelganidan to‘g‘ri javob ketguncha): zarina-form-b.md 2-qator (6,0 soat), zarina-form-b.md 5-qator (3,0 soat), malika-form-b.md 2-qator (3,0 soat), jamshid-form-b.md 1-qator (3,2 soat).
   Haftasiga 15,2 soat = 6,0 + 3,0 + 3,0 + 3,2.
2. Lidni qabul qilish va AmoCRM zayavkasi (qo‘ng‘iroq yoki xabardan menejerga uzatilguncha): zarina-form-b.md 3-qator (4,0 soat), zarina-form-b.md 4-qator (1,7 soat), jamshid-form-b.md 7-qator (1,5 soat).
   Haftasiga 7,2 soat = 4,0 + 1,7 + 1,5.
3. Tijoriy taklif (3D chizmadan KP yuborilguncha): malika-form-b.md 3-qator (1,0 soat), malika-form-b.md 4-qator (3,3 soat).
   Haftasiga 4,3 soat = 1,0 + 3,3.
4. KPdan keyin qayta aloqa (KP yuborilgandan javob olguncha): malika-form-b.md 5-qator (0,8 soat).
   Haftasiga 0,8 soat = 0,8.
5. Chegirmaga ruxsat (sotuvchi so‘rovidan ROP qaroriga): malika-form-b.md 7-qator (0,5 soat), jamshid-form-b.md 2-qator (1,0 soat).
   Haftasiga 1,5 soat = 0,5 + 1,0.
6. Kunlik va haftalik sotuv hisoboti (AmoCRM’dan rahbarga): zarina-form-b.md 6-qator (2,0 soat), jamshid-form-b.md 3-qator (2,0 soat).
   Haftasiga 4,0 soat = 2,0 + 2,0.
7. Yetkazish sanasini kelishish (shartnomadan sana tasdiqlanguncha): malika-form-b.md 8-qator (0,8 soat).
   Haftasiga 0,8 soat = 0,8.
8. Yangi sotuvchini o‘qitish (birinchi kundan imtihongacha): jamshid-form-b.md 6-qator (1,5 soat).
   Haftasiga 1,5 soat = 1,5.

## Ro‘yxatga kirmaganlar

- Kiruvchi qo‘ng‘iroqlarga javob berish va g‘azablangan mijozni tinchlantirish (zarina-form-b.md 1 va 7-qator): jonli suhbat, B.9 = I.
- Kunlik sotuv qo‘ng‘iroqlari (malika-form-b.md 9-qator) va yirik mijoz bilan muzokara (jamshid-form-b.md 5-qator): sotuvchining o‘z ishi, B.9 = I.
- AmoCRM vazifalarini yangilash va «qizil» vazifalar nazorati (malika-form-b.md 6-qator, jamshid-form-b.md 4-qator): 8 tadan oshmaslik uchun keyingi navbatga qoldirildi.
- Yangi lidga birinchi qo‘ng‘iroq (malika-form-b.md 1-qator): suhbatning o‘zi, B.9 = I.

## Egasi o‘zgartirgan ballar

Claude Code birinchi qoralamada (Sonnet, 2026-11-03 dagi sinov) 1-jarayonga A.5 = 3 va A.6 = 1 qo‘ygan edi: Osonlik 8 chiqdi va jarayon «Foydali, puxta reja kerak» qismiga tushdi.

- 1-jarayon, A.5: 3 dan 4 ga.
  Sabab: «1C qoldig‘i har kuni eksport qilinadi (Otabek aka), prays-list fayl ko‘rinishida bor».
- 1-jarayon, A.6: 1 dan 3 ga.
  Sabab: «agent faqat javobni qoralaydi, sotuvchi yoki operator tasdiqlab yuboradi; xato mijozga yetmaydi».
- Natija: Osonlik 4 + 3 + 1 = 8 emas, 4 + 4 + 3 = 11; jarayon «Birinchi sinov» qismiga o‘tdi.
- Qoida: har bir o‘zgartirishning sababi yoziladi.
  Sababsiz ball ko‘tarish o‘zini aldash bo‘ladi; Jamshid aka uy vazifasida shu sabablarni tekshiradi.
