# To‘plam 2 · A shakli: Jarayonlarni baholash

Praktikum 3.0 · Qaysi jarayondan boshlaymiz? · Fayl: `kit2-scoring/form-a-scoring.md`

- Bo‘lim: savdo
- Baholadi: egasi (savdo bo‘limi boshlig‘i Jamshid Karimov hali ko‘rib chiqmagan)
- Sana: 2026-11-29

| # | A.1 Jarayon (boshlanishi - natijasi) | A.2 Takrorlanishi | A.3 Ketadigan vaqt | A.4 Aniq qoidasi bor | A.5 Ma’lumot raqamli | A.6 Xatosi arzon | A.7 Mijozga ta’siri | A.8 Qiymat | A.9 Osonlik |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Narx, qoldiq, chegirma, muddat savoli: mijoz savol beradi - javob mijozga yetadi | 5 | 5 | 4 | 4 | 2 | 5 | 15 (5+5+5) | 10 (4+4+2) |
| 2 | Kiruvchi qo‘ng‘iroq: mijoz qo‘ng‘iroq qiladi - savoliga javob oladi (shikoyat ham) | 5 | 5 | 2 | 2 | 2 | 5 | 15 (5+5+5) | 6 (2+2+2) |
| 3 | amoCRM yuritish: kechagi zayavkalardan kun rejasi - qo‘ng‘iroq natijasi CRMga yozilgan | 5 | 5 | 4 | 2 [?] | 4 | 2 | 12 (5+5+2) | 10 (4+2+4) [?] |
| 4 | Chiquvchi qo‘ng‘iroq: zayavka - mijoz zamer yoki 3D ga yozilgan | 5 | 4 | 2 | 2 | 2 | 4 | 13 (5+4+4) | 6 (2+2+2) |
| 5 | Kunlik savdo hisoboti: amoCRM ma’lumoti - Excel hisobot ROP va direktorda | 4 | 4 | 5 | 5 | 4 | 1 | 9 (4+4+1) | 14 (5+5+4) |
| 6 | KP: mijoz so‘raydi - tekshirilgan KP mijozga ketadi | 4 | 4 [?] | 5 | 5 | 2 | 4 | 12 (4+4+4) [?] | 12 (5+5+2) |
| 7 | Instagram va Telegram xabarlari: xabar keladi - mijozga javob boradi | 5 | 4 | 2 | 4 | 3 | 5 | 14 (5+4+5) | 9 (2+4+3) |
| 8 | Yangi murojaat menejerga: yangi mijoz - zayavka menejerda | 5 | 4 | 5 | 3 | 4 | 2 | 11 (5+4+2) | 12 (5+3+4) |

- A.2: 1 ball - oyiga bir marta … 5 ball - kuniga bir necha marta
- A.3: 1 ball - haftasiga bir necha daqiqa … 5 ball - haftasiga 10 soatdan ko‘p
- A.4: 1 ball - har bir holat har xil … 5 ball - har doim bir xil qadamlar
- A.5: 1 ball - qog‘ozda yoki odamlar yodida … 5 ball - allaqachon tizim yoki jadvalda
- A.6: 1 ball - xato pul yoki ishonchni yo‘qotadi … 5 ball - xatoni sezish va to‘g‘rilash oson
- A.7: 1 ball - faqat ichki jarayon … 5 ball - mijoz buni kutib turadi

A.8 = A.2 + A.3 + A.7; A.9 = A.4 + A.5 + A.6.
Har bir yig‘indi ikki marta tekshirildi.
Manbalar: `kit1-interviews/jamshid-form-b.md`, `malika-form-b.md`, `zarina-form-b.md` (qator raqami bilan), `data/qoidalar.md`, `data/narxlar.csv`, `data/ombor-1c.csv`.
Uchala B shaklini xodim 2026-11-27 da ko‘rib chiqqan; barcha soatlar tasdiqlangan.

## Sabablar

### 1. Narx, qoldiq, chegirma, muddat savoli

- A.2 = 5: Jamshidga kuniga 25 ta savol (jamshid 14-qator), Malikada kuniga 12 ta (malika 18-qator).
- A.3 = 5: 17,3 soat > 10 (Jarayonlar tarkibi, 1).
- A.4 = 4: hamma vazifada B.7 = Q; chegirma qoidasi `data/qoidalar.md` da yozilgan (menejer 5% gacha, ROP 10% gacha), shuning uchun malika 20-qatordagi «Q [?]» yopiladi.
  5 emas: 5% dan katta chegirmani ROP hal qiladi (jamshid 14).
- A.5 = 4: javob `narxlar.csv`, `qoidalar.md` va 1C qoldig‘ida bor (jamshid 14).
  5 emas: 1C fayli 01.11.2026 holatiga, Malika qoldiqni Umid akadan telefonda so‘raydi (malika 19).
- A.6 = 2: B.8 = yuqori (jamshid 14, malika 18, zarina 17); eski narx 350 000 so‘m zarar bergan (malika 18); telefonda aytilgan narxni qaytarib bo‘lmaydi.
- A.7 = 5: mijoz javobni 5-10 daqiqa kutadi (zarina 17); kuniga 2-3 mijoz ketib qolishi [?] (zarina, raqamlar tekshiruvi 11), lekin ball kutishning o‘ziga tayanadi.

### 2. Kiruvchi qo‘ng‘iroq

- A.2 = 5: kuniga 50 ta (zarina 13).
- A.3 = 5: 15,5 soat > 10.
- A.4 = 2: B.7 = F (zarina 13, 19); har suhbat har xil.
- A.5 = 2: ma’lumot jonli ovozdan keladi (zarina 13).
- A.6 = 2: B.8 o‘rta, g‘azablangan mijozda yuqori (zarina 13, 19).
- A.7 = 5: mijoz telefonda kutib turadi.

### 3. amoCRM yuritish

- A.2 = 5: har qo‘ng‘iroqdan keyin, kuniga 32 marta (malika 16, 17).
- A.3 = 5: 11,0 soat > 10.
- A.4 = 4: B.7 = Q; maydonlar bir xil: nima dedi, keyingi qadam qachon (malika 15, 17).
- A.5 = 2 [?]: 9 soatlik qismning ma’lumoti qo‘ng‘iroqdan, Malikaning yodidan keladi (malika 17).
  Qo‘ng‘iroqlar yozib olinishi noma’lum; yozilsa, 4.
- A.6 = 4: B.8 = past (malika 15, 17).
- A.7 = 2: natija amoCRM ga, ichki.

### 4. Chiquvchi qo‘ng‘iroq

- A.2 = 5: kuniga 32 ta (malika 16).
- A.3 = 4: 9,6 soat (4 dan ko‘p, 10 gacha).
- A.4 = 2: B.7 = F (malika 16, 22).
- A.5 = 2: jonli suhbat (malika 22).
- A.6 = 2: B.8 o‘rta, zamerga olib borishda yuqori (malika 16, 22).
- A.7 = 4: natija mijozga boradi, lekin mijoz qo‘ng‘iroqni kutib turmaydi.

### 5. Kunlik savdo hisoboti

- A.2 = 4: har biri kuniga 1 marta (jamshid 16, zarina 18).
- A.3 = 4: 8,0 soat.
- A.4 = 5: B.7 = Q, har kuni bir xil tartibda (jamshid, kuzatuvlar 75-qator).
- A.5 = 5: hammasi amoCRM da (jamshid 16, zarina 18).
- A.6 = 4: B.8 past va o‘rta; xatoni ROP sezadi.
- A.7 = 1: faqat ichki hisobot.

### 6. KP

- A.2 = 4: ROP haftasiga 12 ta KP tekshiradi (jamshid 15); 12 / 6 = kuniga 2; «kuniga bir necha marta» chegarasida, kichik ball olindi.
- A.3 = 4 [?]: 6,8 soat; faqat Malika va ROP vaqti, qolgan 7 menejer bilan suhbat qilinmagan, haqiqiy soat ko‘proq bo‘lishi mumkin.
- A.4 = 5: B.7 = Q; ulgurji 5+ dona (`narxlar.csv` sarlavhasi), QQS 12% (`qoidalar.md`).
- A.5 = 5: prays-list va Excel (malika 21).
- A.6 = 2 (egasi o‘zgartirdi, 2026-11-29; eski ball 3): eski: «KP yozma, mijozga ketishidan oldin ROP tekshiradi».
  Egasi: ROP tekshirsa ham eski narx bilan 350 000 so‘m yo‘qotilgan (malika 18).
  B.8 = yuqori (malika 21, jamshid 15).
  A.9 = 5 + 5 + 3 = 13 edi, endi 5 + 5 + 2 = 12.
- A.7 = 4: KP mijozga ketadi va mijoz uni kutadi.

### 7. Instagram va Telegram xabarlari

- A.2 = 5: kuniga 30 ta (zarina 14).
- A.3 = 4: 6,0 soat.
- A.4 = 2: B.7 = F (zarina 14).
- A.5 = 4: xabarlar yozma va raqamli; kanallarga ulanish (API) tekshirilmagan.
- A.6 = 3: B.8 = o‘rta (zarina 14).
- A.7 = 5: mijoz javob kutadi.

### 8. Yangi murojaat menejerga

- A.2 = 5: kuniga 20 ta zayavka va 11 ta topshirish (zarina 15, 16).
- A.3 = 4: 5,7 soat.
- A.4 = 5: B.7 = Q; maydonlar belgilangan, navbat bo‘yicha (zarina 15, 16).
- A.5 = 3: maydonlar qo‘ng‘iroq yoki xabardan (zarina 15), menejer bandligi Telegramda so‘raladi (zarina 16).
- A.6 = 4: B.8 o‘rta va past (zarina 15, 16).
- A.7 = 2: asosan ichki, mijozga bilvosita ta’sir qiladi.

## Jarayonlar tarkibi

| # | Vazifalar (fayl, qator) | Haftalik soat |
|---|---|---|
| 1 | jamshid 14 (2-vazifa) 6,25; malika 18 (4) 3,6; malika 19 (5) 1,2; malika 20 (6, javob kutish) 3,2; zarina 17 (5) 3,0 | 6,25 + 3,6 + 1,2 + 3,2 + 3,0 = 17,25 ≈ 17,3 |
| 2 | zarina 13 (1) 15,0; zarina 19 (7) 0,5 | 15,0 + 0,5 = 15,5 |
| 3 | malika 15 (1) 2,0; malika 17 (3) 9,0 | 2,0 + 9,0 = 11,0 |
| 4 | malika 16 (2) 9,6; malika 22 (8) 2-vazifa ichida | 9,6 |
| 5 | jamshid 16 (4) 6,0; zarina 18 (6) 2,0 | 6,0 + 2,0 = 8,0 |
| 6 | malika 21 (7) 3,75; jamshid 15 (3) 3,0 | 3,75 + 3,0 = 6,75 ≈ 6,8 |
| 7 | zarina 14 (2) 6,0 | 6,0 |
| 8 | zarina 15 (3) 4,0; zarina 16 (4) 1,65 | 4,0 + 1,65 = 5,65 ≈ 5,7 |

Tekshiruv: 17,25 + 15,5 + 11,0 + 9,6 + 8,0 + 6,75 + 6,0 + 5,65 = 79,75 soat.
Kirmagan (egasi qarori, 2026-11-29: odamning ishi): planyorka (jamshid 13) 1,5 va tender muzokaralari (jamshid 17) 4,0; 1,5 + 4,0 = 5,5.
79,75 + 5,5 = 85,25 = 20,75 + 32,35 + 32,15 (uchta B shaklining yaxlitlanmagan jami) ✓

## Nega shunday yozildi

- Har bir ballning sababi va manbasi «Sabablar» bo‘limida: masalan, 1-jarayonda A.2 = 5, chunki «Jamshidga kuniga 25 ta savol (jamshid 14-qator)».
  Sababsiz ball yozmang: bo‘lim boshlig‘i bilan ko‘rib chiqishda aynan shu sabablar muhokama qilinadi.
- A.8 va A.9 kataklarida qo‘shiluvchilar yozilgan: «15 (5+5+5)», «10 (4+4+2)»; har bir yig‘indi ikki marta tekshirilgan.
- 6-jarayonda (KP) egasi A.6 ni 3 dan 2 ga o‘zgartirdi: ROP tekshirsa ham eski narx bilan 350 000 so‘m yo‘qotilgan.
  Eski ball va yangi ball ikkalasi saqlangan, Osonlik qayta hisoblangan (13 dan 12 ga).
- 1-jarayonda A.4 = 4, 5 emas: 5% dan katta chegirmani ROP hal qiladi, demak hammasi qoida bilan yechilmaydi.
  A.5 = 4, 5 emas: 1C fayli 01.11.2026 holatiga, ya’ni eski.
- 3- va 6-jarayondagi [?] qolgan: amoCRM qaydlari uchun qo‘ng‘iroqlar yozib olinadimi, noma’lum; KP soatlari faqat Malika va ROP bo‘yicha, qolgan 7 menejer bilan suhbat bo‘lmagan.
- «Jarayonlar tarkibi» jadvali har bir jarayonga qaysi vazifalar kirganini fayl va qator bilan ko‘rsatadi.
  Oxirida 85,25 soat uchta B shaklining jamiga (20,75 + 32,35 + 32,15) teng ekani tekshirilgan: hech bir vazifa yo‘qolmagan va ikki marta sanalmagan.
- «Baholadi» maydonida «Jamshid Karimov hali ko‘rib chiqmagan» halol yozilgan: bo‘lim boshlig‘i bilan ko‘rib chiqish uyga vazifa.
- Planyorka va tenderlar ro‘yxatga kirmagan: egasi ularni odamning ishi deb qoldirdi (2026-11-29).
