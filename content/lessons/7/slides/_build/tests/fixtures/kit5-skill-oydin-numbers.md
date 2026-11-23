# To‘plam 5 · B shakli: Sinov raqamlari

Praktikum 3.0 · Sinov va hisob-kitob · Fayl: `kit5-pilot/numbers.md`

Shu faylni to‘ldiring yoki Claude Code’da /kit5 ni ishga tushiring: u siz bilan birga to‘ldiradi.

- Jarayon: to‘lovlarni solishtirish (Click/Payme - buyurtma)
- Sinov sanalari: 2026-12-14 - 2026-12-26 (2 hafta, dushanba-shanba; `plan.md`, A.3)
- Haftalar: 1-hafta 14-19.12, 2-hafta 21-26.12 (3- va 4-hafta ustunlari bu sinovda ishlatilmaydi)
- Soatbay haq, so‘m: 25 000 (CLAUDE.md)

| Ko‘rsatkich | Agentgacha | 1-hafta | 2-hafta | 3-hafta | 4-hafta | O‘zgarish |
|---|---|---|---|---|---|---|
| B.1 Bajarilgan so‘rovlar | 282,3 | 296 | 305 |   |   | +22,7 (+8,0%) |
| B.2 O‘rtacha vaqt, daqiqa | 2,1 | 1,3 | 0,9 |   |   | -1,24 (-57,9%) |
| B.3 Xato javoblar | 2 | 1 | 0 |   |   | -2 (-100%) |
| B.4 Takroriy so‘rovlar | 21,7 | 18 | 16 |   |   | -5,7 (-26,3%) |
| B.5 To‘liq hal qilingan so‘rovlar | 273 | 290 | 301 |   |   | +28 (+10,3%) |
| B.6 Yakunlangan bitimlar yoki buyurtmalar | 268 | 280 | 290 |   |   | +22 (+8,2%) |
| B.7 Xodimning tekshirishga sarflagan vaqti, soat | 0 | 4,5 | 3,0 |   |   | +3,0 |
| B.14 Topilgan pul, so‘m | 0 | 260 000 | 0 (+540 000 [?]) |   |   | 2 haftada isbotlangan 260 000 |
| B.8 Mijoz shikoyatlari | 1,3 | 1 | 0 |   |   | -1,3 (-100%) |

B.2 - bitta so‘rovga odam sarflagan daqiqa, tekshirishsiz (tekshirish B.7 da).
B.14 - oldi olingan xato, yo‘qolmagan so‘rov, tezroq tushgan pul.

## Hisoblar

Agentgacha (manba: `kit5-pilot/baseline.md`, `data/tolovlar-guruhi.json`, 2026-10-12 - 2026-10-31, 3 hafta):

- B.1 = (285 + 281 + 281) / 3 = 847 / 3 = 282,3
- B.2 = (407 × 1,6 + 375 × 1,8 + 65 × 7,5) / 847 = (651,2 + 675,0 + 487,5) / 847 = 1 813,7 / 847 = 2,14 ≈ 2,1 (jonli yozuv, Malika, 5 ish kuni: Click 1,6, Payme 1,8, muammoli 7,5; ulushlar `data/tolovlar-guruhi.json` dan; tafsiloti `baseline.md` da). Eski taxmin 1,9 (To‘plam 1) va egasi aytgan 2,4 o‘rniga; 2,4 qanday hisoblangani [?]
- B.3 = 2 (jonli yozuv, Malika, 5 ish kuni; egasi aytdi 2026-11-03; ta’rif: noto‘g‘ri tasdiqlangan yoki o‘tkazib yuborilgan to‘lov)
- B.4 = (27 + 19 + 19) / 3 = 65 / 3 = 21,7
- B.5 = (274 + 270 + 275) / 3 = 819 / 3 = 273
- B.6 = 268 (Google Sheets, 12-31-oktabr, haftalik o‘rtacha yetkazilgan buyurtma; egasi Sardor aytdi 2026-11-03)
- B.8 = (1 + 1 + 2) / 3 = 4 / 3 = 1,3
- B.7 = 0, B.14 = 0 (agentgacha)
- Inson, bitta ish narxi (B.16 uchun) = B.2 / 60 × soatbay haq = 2,14 / 60 × 25 000 = 892 so‘m (tekshiruv: 25 000 / 60 = 416,7; 416,7 × 2,14 = 892)
- Agentgacha haftalik vaqt: 2,14 × 282,3 / 60 = 10,1 soat (tekshiruv: 1 813,7 daq / 3 hafta / 60 = 10,1)
- Yopilmagan 28 ta buyurtma, 4 425 000 so‘m: holati [?], B.14 ga qo‘shilmaydi

1-hafta, 14-19-dekabr (manba: egasi Sardor aytdi, `/kit5 hafta 1`; Malika ishi bo‘yicha raqamlar butun vazifa uchun):

- B.1 = 296 ta to‘lov (egasi)
- B.2 = 1,3 daqiqa, tekshirishsiz (egasi; Malika o‘lchagan)
- B.3 = 1 (egasi; 18-dekabr, #2305 noto‘g‘ri moslangan, B.13 jurnalida)
- O‘tkazib yuborilgan muammoli to‘lov = 0 (egasi, A.6)
- A.7 to‘xtatish sharti bajarilmadi: agent mijozga yozmadi, tasdiqlanmagan qatorga yozmadi, Sheets’da noto‘g‘ri belgi qolmadi (egasi)
- B.4 = 18, B.5 = 290, B.6 = 280, B.8 = 1 (egasi)
- B.7 = 4,5 soat, butun vazifa uchun (egasi)
- B.14 = 260 000 (tafsiloti pastda)

Agentgacha bilan solishtirish (1-hafta - agentgacha; foiz = farq / agentgacha × 100):

- B.1: 296 - 282,3 = +13,7; 13,7 / 282,3 × 100 = +4,9%
- B.2: 1,3 - 2,14 = -0,84; -0,84 / 2,14 × 100 = -39,3%. Maqsad 1,0 (A.2): yetilmadi
- B.3: 1 - 2 = -1; -1 / 2 × 100 = -50%
- B.4: 18 - 21,7 = -3,7; -3,7 / 21,7 × 100 = -17,1%
- B.5: 290 - 273 = +17; 17 / 273 × 100 = +6,2%
- B.6: 280 - 268 = +12; 12 / 268 × 100 = +4,5%
- B.7: 4,5 - 0 = +4,5 soat
- B.8: 1 - 1,3 = -0,3; -0,3 / 1,3 × 100 = -23,1%
- Eslatma: dekabr, Yangi yil oldidan (A.3); B.1, B.5, B.6 o‘sishi mavsumdan ham bo‘lishi mumkin [?]

1-hafta xarajatlari:

- OpenRouter = 6 $ × 12 100 = 72 600 so‘m (egasi: shu hafta 6 $, kurs 12 100)
- VPS = 200 000 / 4,3 = 46 512 so‘m/hafta (egasi: oyiga 200 000)
- B.9 = 72 600 + 46 512 = 119 112 so‘m (tekshiruv: 119 112 - 72 600 = 46 512)
- B.10 = 10 × 25 000 = 250 000 so‘m (egasi o‘zi sozladi, 10 soat; naqd to‘lov 0; egasi qo‘shishga rozi). 25 000 bu o‘rtacha soatbay haq, egasining soati emas. Bir martalik xarajat, 2-haftaga takrorlanmaydi
- B.11 = 4,5 × 25 000 = 112 500 so‘m (tekshiruv: 112 500 / 25 000 = 4,5)
- B.12 = 119 112 + 250 000 + 112 500 = 481 612 so‘m (tekshiruv: 481 612 - 112 500 - 250 000 = 119 112)
- B.12, sozlashsiz (faqat haftalik xarajat) = 119 112 + 112 500 = 231 612 so‘m

1-hafta natija:

- B.15 = (2,14 - 1,3) × 296 / 60 - 4,5 = 0,84 × 296 / 60 - 4,5 = 248,64 / 60 - 4,5 = 4,14 - 4,5 = -0,36 soat (tekshiruv: 296 / 60 = 4,933; 4,933 × 0,84 = 4,14). Vaqt tejalmadi: tekshirish 4,14 soatdan ko‘p
- B.15, B.2 = 2,1 bilan: (2,1 - 1,3) × 296 / 60 - 4,5 = 3,95 - 4,5 = -0,55 soat (natija o‘zgarmaydi: manfiy)
- B.16 agent = 481 612 / 290 = 1 660,7 ≈ 1 661 so‘m (tekshiruv: 290 × 1 661 = 481 690 ≈ 481 612). Sozlashsiz: 231 612 / 290 = 798,7 ≈ 799 so‘m
- B.16 inson = 2,14 / 60 × 25 000 = 892 so‘m
- Eslatma: agent narxiga Malikaning 1,3 daqiqasi kirmaydi: 1,3 / 60 × 25 000 = 541,7 so‘m. Sozlashsiz to‘liq narx agent bilan = 798,7 + 541,7 = 1 340,4 so‘m, agentsiz 892 so‘m
- Yakunda B.10 (250 000) ikki haftaning B.5 yig‘indisiga bo‘linadi, shuning uchun 1-haftadagi 1 661 so‘m yakuniy narx emas
- Bitta hafta, oraliq 2-haftadan keyin chiqadi

2-hafta, 21-26-dekabr (manba: egasi Sardor aytdi, `/kit5 yakun`):

- B.1 = 305, B.2 = 0,9 daqiqa (tekshirishsiz), B.3 = 0, B.4 = 16, B.5 = 301, B.6 = 290, B.8 = 0 (egasi)
- B.7 = 3,0 soat, butun vazifa uchun (egasi)
- B.14 = 0 isbotlangan; 540 000 [?] (tafsiloti pastda)
- O‘tkazib yuborilgan muammoli to‘lov: [?]. A.7 hodisasi: [?] (B.3 = 0, lekin egasi alohida tasdiqlamagan)
- Yo‘riqnoma o‘zgarishidan keyin T1-T7 qayta sinovi: hammasi o‘tdi, 2026-12-20 (egasi; `test-set.md`)

2-hafta xarajatlari:

- OpenRouter = 5 $ × 12 100 = 60 500 so‘m (egasi: 2-haftada 5 $)
- VPS = 200 000 / 4,3 = 46 512 so‘m
- B.9 = 60 500 + 46 512 = 107 012 so‘m (tekshiruv: 107 012 - 60 500 = 46 512)
- B.10 = 0 (sozlash 1-haftada hisoblangan)
- B.11 = 3,0 × 25 000 = 75 000 so‘m
- B.12 = 107 012 + 0 + 75 000 = 182 012 so‘m (tekshiruv: 182 012 - 75 000 = 107 012)

2-hafta natija:

- B.15 = (2,14 - 0,9) × 305 / 60 - 3,0 = 1,24 × 305 / 60 - 3,0 = 378,2 / 60 - 3,0 = 6,30 - 3,0 = 3,30 soat (tekshiruv: 305 / 60 = 5,083; 5,083 × 1,24 = 6,30)
- B.16 agent (faqat shu hafta) = 182 012 / 301 = 604,7 so‘m (tekshiruv: 301 × 605 = 182 105 ≈ 182 012)
- Bitta to‘lovning to‘liq narxi agent bilan = 604,7 + 0,9 / 60 × 25 000 = 604,7 + 375,0 = 979,7 so‘m; agentsiz 892 so‘m

## Yakun (2 hafta, 14-26-dekabr)

O‘zgarish ustuni: oxirgi hafta (2-hafta) - agentgacha; foiz = farq / agentgacha × 100.

- B.1: 305 - 282,3 = +22,7; 22,7 / 282,3 × 100 = +8,0%
- B.2: 0,9 - 2,14 = -1,24; -1,24 / 2,14 × 100 = -57,9%. Maqsad 1,0 (A.2): 2-haftada yetildi, 1-haftada yo‘q (1,3)
- B.3: 0 - 2 = -2; -100%
- B.4: 16 - 21,7 = -5,7; -5,7 / 21,7 × 100 = -26,3%
- B.5: 301 - 273 = +28; 28 / 273 × 100 = +10,3%
- B.6: 290 - 268 = +22; 22 / 268 × 100 = +8,2%
- B.7: 3,0 - 0 = +3,0 soat
- B.8: 0 - 1,3 = -1,3; -100%
- Eslatma: dekabr, Yangi yil oldidan; B.1, B.5, B.6 o‘sishining bir qismi mavsumdan bo‘lishi mumkin [?]. B.3 va B.8 kichik sonlar: 2 hafta ichida 0 tasodif ham bo‘lishi mumkin

Xarajatlar, 2 hafta jami:

- B.9 = 119 112 + 107 012 = 226 124 so‘m
- B.10 = 250 000 so‘m (bir martalik)
- B.11 = 112 500 + 75 000 = 187 500 so‘m (tekshiruv: (4,5 + 3,0) × 25 000 = 7,5 × 25 000 = 187 500)
- B.12 = 226 124 + 250 000 + 187 500 = 663 624 so‘m (tekshiruv: 481 612 + 182 012 = 663 624)

B.15 tejalgan vaqt, oraliq: -0,36 soat/hafta (1-hafta, eng yomon) - 3,30 soat/hafta (2-hafta, eng yaxshi).

B.16 bitta ish narxi:

- Agent, 2 hafta, sozlash bilan = 663 624 / (290 + 301) = 663 624 / 591 = 1 122,9 so‘m (tekshiruv: 591 × 1 123 = 663 693 ≈ 663 624)
- Agent, sozlashsiz = (663 624 - 250 000) / 591 = 413 624 / 591 = 699,9 ≈ 700 so‘m
- Agent, haftalar oraliq (sozlashsiz): 604,7 (2-hafta) - 798,7 (1-hafta) so‘m
- Inson = 2,14 / 60 × 25 000 = 892 so‘m
- Eslatma: B.16 agent narxiga Malikaning har bir to‘lovga sarflagan vaqti kirmaydi. 2-hafta to‘liq narxi 979,7 so‘m, agentsiz 892 so‘m: vaqt tejaldi, lekin obuna uni hozircha yopmaydi

Oylik qiymat va xarajat (oyda 4,3 hafta):

- Oylik xarajat (sozlashsiz; tekshirish soati B.15 ichida ayirilgan, ikki marta sanalmaydi):
  - OpenRouter = (6 + 5) / 2 × 4,3 × 12 100 = 5,5 × 4,3 × 12 100 = 23,65 × 12 100 = 286 165 so‘m [taxmin: 2 haftaning o‘rtachasi]
  - VPS = 200 000 so‘m
  - Jami = 286 165 + 200 000 = 486 165 so‘m
- Tejalgan vaqt qiymati = B.15 × 25 000 × 4,3:
  - 2-hafta bo‘yicha: 3,30 × 25 000 × 4,3 = 82 500 × 4,3 = 354 750 so‘m
  - 1-hafta bo‘yicha: -0,36 × 25 000 × 4,3 = -38 700 so‘m
  - Bu naqd pul emas: Malika maoshi o‘zgarmaydi, qiymat faqat bo‘shagan soat boshqa ishga ketsa paydo bo‘ladi
- Faqat vaqt: 354 750 - 486 165 = -131 415 so‘m/oy. Vaqtning o‘zi xarajatni yopmaydi
- Vaqt xarajatni yopishi uchun B.15 = 486 165 / 4,3 / 25 000 = 113 062 / 25 000 = 4,52 soat/hafta kerak (2-haftada 3,30)
- Oylik topilgan pul, faqat isbotlangan: 260 000 / 2 × 4,3 = 130 000 × 4,3 = 559 000 so‘m. Bu 2 haftadagi bitta holatdan; bu tezlik davom etishi isbotlanmagan [?]. Bu tushum, foyda emas
- Vaqt + isbotlangan topilgan pul: 354 750 + 559 000 = 913 750 so‘m, xarajat 486 165 so‘m; farq 913 750 - 486 165 = +427 585 so‘m/oy
- Oktabrdagi qayta tekshiruv (330 000) bir martalik: 28 ta yopilmagan buyurtmaning qolgan 28 - 3 = 25 tasi hali tekshirilmagan, summasi [?]. Oylik hisobga qo‘shilmaydi

A.6 muvaffaqiyat mezonlari:

- B.2 ≤ 1,0: 1-hafta 1,3 (yo‘q), 2-hafta 0,9 (ha)
- B.3 ≤ 2: 1-hafta 1 (ha), 2-hafta 0 (ha)
- O‘tkazib yuborilgan muammoli to‘lov 0: 1-hafta 0 (ha), 2-hafta [?]
- B.8 ≤ 1,3: 1-hafta 1 (ha), 2-hafta 0 (ha)

A.7 to‘xtatish sharti: 1-haftada bajarilmadi (egasi). 2-hafta [?].

Xatolar turlari (B.13): bitta xato, bitta tur.

- Bir telefonda bir nechta ochiq buyurtma: noto‘g‘ri moslash (#2305; oktabrdagi T5 ham shu tur, lekin u odam xatosi edi). O‘zgarish: `instructions.md`, B.4 va B.6, telefon bo‘yicha bir nechta buyurtma bo‘lsa tanlamaslik qoidasi. Qayta sinov 2026-12-20, T1-T7 o‘tdi; 2-haftada xato 0

### Xarajatlar

| Xarajat | So‘m |
|---|---|
| B.9 Obuna | 1-hafta: 119 112 (72 600 OpenRouter + 46 512 VPS); 2-hafta: 107 012 (60 500 + 46 512); jami 226 124 |
| B.10 Integratsiya va sozlash | 1-hafta: 250 000 (egasi vaqti, 10 × 25 000; bir martalik); 2-hafta: 0; jami 250 000 |
| B.11 Tekshirish soati x soatbay haq | 1-hafta: 112 500; 2-hafta: 75 000; jami 187 500 |
| B.12 Jami | 1-hafta: 481 612; 2-hafta: 182 012; jami 663 624 |

### Natija

| Ko‘rsatkich | Hisob | Natija |
|---|---|---|
| B.15 Tejalgan vaqt, soat/hafta | (B.2 agentgacha - B.2 sinovda) x B.1 / 60 - B.7 | 1-hafta: -0,36; 2-hafta: (2,14 - 0,9) × 305 / 60 - 3,0 = 3,30; oraliq -0,36 - 3,30 |
| B.16 Bitta bajarilgan ish narxi: agent / inson | agent: B.12 / B.5 yig‘indisi; inson: B.2 agentgacha / 60 x soatbay haq | agent: 663 624 / 591 = 1 123 (sozlashsiz 700; haftalar 605-799) / inson: 892 |

### Topilgan pul tafsiloti (B.14)

| Sana | Nima bo‘ldi | Summa, so‘m | Qanday hisobladik |
|---|---|---|---|
| 2026-12-15 | #2210, Click: to‘lov kelgan, lekin yopilmagan, buyurtma jo‘natilmay qolgan. Agent topdi, buyurtma yetkazildi; mijoz bekor qilmoqchi edi | 260 000 | Yo‘qolmagan so‘rov: bekor qilinganda 260 000 qaytarilardi. Summa to‘lovdan (egasi). Bu tushum, foyda emas; foydasi [?] |
| 14-19.12 [?] | #2231, Payme: 145 000 ikki marta to‘langan, ortiqchasi mijozga qaytarildi | 0 (yig‘indiga qo‘shilmaydi) | Oldi olingan xato: pul mijozniki edi, biz uchun topilgan pul emas. Shikoyatning oldi olingan bo‘lishi mumkin [?] |
| 2026-12-22 | #2388, Click: to‘lov kelgan, yopilmay qolgan; agent topdi, buyurtma jo‘natildi | 210 000 [?] (yig‘indiga qo‘shilmaydi) | Pul hisobda allaqachon bor edi. Agentsiz mijoz shikoyat qilib, buyurtma kech yuborilardi yoki pul qaytarilardi: qaysi biri, noma’lum. Mijoz bekor qilmoqchi bo‘lgani aytilmagan. Bu tushum, foyda emas |
| 21-26.12 [?] | Oktabrdagi 28 ta yopilmagan buyurtmadan 3 tasi qayta tekshirildi: 2 tasi to‘langan ekan, kitoblar yuborildi. Raqamlari [?] | 330 000 [?] (yig‘indiga qo‘shilmaydi) | Odam jarayoni ularni 2 oy topmagan (`baseline.md`). Lekin pul oktabrda tushgan; endi kitob yuborildi, bu xarajat. Yo‘qotish (qaytarish yoki shikoyat) bo‘lardimi, isbot yo‘q. Bir martalik: qolgan 25 ta hali tekshirilmagan |
| Jami | Isbotlangan / isbotlanmagan | 260 000 / 540 000 [?] | 210 000 + 330 000 = 540 000 |

### Xatolar jurnali

| B.13 Sana | Nima bo‘ldi | Kim topdi | Nimani o‘zgartirdik |
|---|---|---|---|
| 2026-12-18 | #2305, Payme 120 000: agent to‘lovni telefon raqami bo‘yicha shu oilaning boshqa buyurtmasiga (#2299) moslagan. Belgi qo‘yilmadi, Sheets’ga noto‘g‘ri belgi tushmadi | Sotuv operatori, kundalik tekshirishda | `instructions.md`, B.4 va B.6: telefon bo‘yicha qidirganda shu raqamdagi barcha ochiq buyurtmalar ko‘riladi; bittadan ko‘p bo‘lsa, summa mos kelsa ham tanlanmaydi, hammasi variant qilib ko‘rsatiladi (2026-11-03). Sinov to‘plamiga T7 qo‘shildi |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |

### Qaror

- [ ] Davom etish
- [ ] O‘zgartirish
- [ ] To‘xtatish

Sababi:
