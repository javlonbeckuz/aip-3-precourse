# To‘plam 5 · B shakli: Sinov raqamlari

Praktikum 3.0 · Sinov va hisob-kitob · Fayl: `kit5-pilot/numbers.md`

Shu faylni to‘ldiring yoki Claude Code’da /kit5 ni ishga tushiring: u siz bilan birga to‘ldiradi.

- Jarayon: narx, qoldiq, chegirma va muddat savoli («Savdo yordamchisi»)
- Sinov sanalari: 2026-12-14 - 2026-12-27, 2 hafta (`plan.md`); 3-hafta va 4-hafta ustunlari ishlatilmaydi
- Soatbay haq, so‘m: 22 600 (CLAUDE.md: menejer okladi 4 500 000 / 199 soat)
- Loyiha yetakchisi: Malika

| Ko‘rsatkich | Agentgacha | 1-hafta | 2-hafta | 3-hafta | 4-hafta | O‘zgarish |
|---|---|---|---|---|---|---|
| B.1 Bajarilgan so‘rovlar | 120 | 115 |   | - | - |   |
| B.2 O‘rtacha vaqt, daqiqa | 6 | 3 |   | - | - |   |
| B.3 Xato javoblar | 9 | 7 |   | - | - |   |
| B.4 Takroriy so‘rovlar | 15 | 12 |   | - | - |   |
| B.5 To‘liq hal qilingan so‘rovlar | 100 | 104 |   | - | - |   |
| B.6 Yakunlangan bitimlar yoki buyurtmalar | [?] | [?] |   | - | - |   |
| B.7 Xodimning tekshirishga sarflagan vaqti, soat | 3 | 3,5 |   | - | - |   |
| B.14 Topilgan pul, so‘m | 0 | 1 500 000 |   | - | - |   |
| B.8 Mijoz shikoyatlari | 2 | 1 |   | - | - |   |

B.2 - bitta so‘rovga odam sarflagan daqiqa, tekshirishsiz (tekshirish B.7 da).
B.14 - oldi olingan xato, yo‘qolmagan so‘rov, tezroq tushgan pul.

## Hisoblar

Agentgacha ustuni (manbalar batafsil: `kit5-pilot/baseline.md`):

- B.1 = 120 savol / 1 hafta = 120. Manba: «Baraka Savdo» eksporti, 30.11-05.12, tarix.
- B.2 = 6 daqiqa (12 holat, oraliq 2-15). Manba: Malikaning jonli yozuvi, 01.12-05.12.
- B.3 = 9 (100 tekshirilgan javobdan: 9 / 100 × 100 = 9%). Manba: Jamshid akaning tekshiruvi, 30.11-05.12.
- B.4 = 15 (15 / 120 × 100 = 12,5%). Manba: eksport, 30.11-05.12.
- B.5 = 100 (100 / 120 × 100 = 83,3%). Manba: eksport, 30.11-05.12.
- B.6 = [?]. Sanalmaydi: egasining qarori (2026-12-13), bu pilotda asosiy ko‘rsatkich emas.
- B.7 = 3 soat. Manba: egasining so‘zi. Izoh: Jamshid aka agent yo‘q paytda ham javoblarni tekshiradi, shuning uchun egasining qarori bilan 0 emas, 3 yozildi. Puli: 3 × 22 600 = 67 800 so‘m/hafta.
- B.8 = 2. Manba: egasi, 30.11-05.12.
- B.14 = 0 (agentgacha).

1-hafta ustuni (14.12-19.12, 6 ish kuni; egasi 2026-12-19 da berdi):

- B.1 = 115 savol. Manba: bot ish jurnali, 14.12-19.12.
- B.2 = 3 daqiqa (12 holat, o‘rtacha). Manba: Malikaning jonli o‘lchovi, 14.12-19.12; har bir holatning daqiqasi uning jadvalida (egasining so‘zi). Oraliq bu faylga hali ko‘chirilmagan [?].
- B.3 = 7 (7 / 115 × 100 = 6,1%; agentgacha 9 / 100 × 100 = 9%). Manba: bot jurnali; 7 ta holat pastdagi B.13 jurnalida, ularni savdo bo‘limi rahbari topdi.
- B.4 = 12 (12 / 115 × 100 = 10,4%). Manba: bot jurnali.
- B.5 = 104 (104 / 115 × 100 = 90,4%). Manba: bot jurnali.
- B.6 = [?]. Sanalmaydi (egasining qarori, 2026-12-13).
- B.7 = 3,5 soat, butun vazifa uchun. Manba: egasining so‘zi. Puli: 3,5 × 22 600 = 79 100 so‘m.
- B.8 = 1. Manba: egasining so‘zi, 14.12-19.12. Shikoyat yetkazish kechikkani haqida, bot xatosi emas.
- B.14 = 1 500 000 so‘m (faqat isbotlangan; tafsilot pastda).

1-hafta va agentgacha (1-hafta - agentgacha; foiz = farq / agentgacha × 100):

- B.1: 115 - 120 = -5; -5 / 120 × 100 = -4,2%
- B.2: 3 - 6 = -3; -3 / 6 × 100 = -50% (A.2 maqsadi 3 daqiqa; rasmiy tekshiruv 26.12)
- B.3: 7 - 9 = -2; -2 / 9 × 100 = -22,2%. A.6 mezoni (≤ 3) bajarilmadi: 7 > 3
- B.4: 12 - 15 = -3; -3 / 15 × 100 = -20%
- B.5: 104 - 100 = +4; 4 / 100 × 100 = +4%
- B.6: [?]
- B.7: 3,5 - 3 = +0,5; 0,5 / 3 × 100 = +16,7%
- B.8: 1 - 2 = -1; -1 / 2 × 100 = -50%. A.6 mezoni (≤ 2) bajarildi
- B.14: 1 500 000 - 0 = +1 500 000 so‘m

A.7 to‘xtatish sharti: bajarilmadi. Bot mijozga yozgani haqida xabar yo‘q; 15% so‘ralgan holatda bot chegirma va’da qilmadi, Jamshid akaga uzatdi.

Xarajatlar hisobi, 1-hafta:

- B.9 obuna = OpenRouter + VPS haftaga = 5 971 + 46 512 = 52 482 so‘m.
  - OpenRouter: 0,50 × 11 941,65 = 5 970,83 ≈ 5 971 so‘m (egasi: shu haftalik hisob, kurs 11 941,65).
  - VPS: 200 000 / 4,3 = 46 511,63 ≈ 46 512 so‘m (egasi: oyiga 200 000).
  - Tekshirish: 5 970,83 + 46 511,63 = 52 482,46 ≈ 52 482.
- B.10 sozlash (bir martalik) = 8 × 9 000 000 / 199 = 72 000 000 / 199 = 361 809 so‘m.
  - IT-administrator, 8 soat, okladi 9 000 000 (egasining so‘zi).
  - 199 soat - CLAUDE.md dagi oylik norma; egasi tasdiqladi (2026-12-19).
  - Tekshirish: 9 000 000 / 199 = 45 226,13 so‘m/soat; 45 226,13 × 8 = 361 809,04.
- B.11 = 3,5 × 22 600 = 79 100 so‘m (tekshirish: 3 × 22 600 + 0,5 × 22 600 = 67 800 + 11 300 = 79 100).
- Loyiha yetakchisi: 200 000 so‘m.
- B.12 (1-hafta) = 52 482 + 361 809 + 79 100 + 200 000 = 693 391 so‘m (tekshirish: 414 291 + 79 100 = 493 391; + 200 000 = 693 391).

1-hafta oraliq natija (yakuniy hisob 2-haftadan keyin, oraliq bilan):

- B.15 = (6 - 3) × 115 / 60 - (3,5 - 3) = 345 / 60 - 0,5 = 5,75 - 0,5 = 5,25 soat/hafta.
  - Pulda: 5,25 × 22 600 = 118 650 so‘m/hafta (tekshirish: 5 × 22 600 + 0,25 × 22 600 = 113 000 + 5 650 = 118 650).
  - Agar B.7 to‘liq ayirilsa (eski formula): 5,75 - 3,5 = 2,25 soat/hafta. Qaysi biri - yakunda kelishiladi.
- B.16 agent (1-hafta) = 693 391 / 104 = 6 667 so‘m (tekshirish: 104 × 6 667 = 693 368; qoldiq 23).
  - Bir martalik sozlashsiz: (693 391 - 361 809) / 104 = 331 582 / 104 = 3 188 so‘m.
  - Inson: 6 / 60 × 22 600 = 2 260 so‘m.
  - 1-haftada agentning bitta ishi insondan qimmat; asosiy sabab - sozlash va loyiha yetakchisi haqi.

Yakunda e’tibor bering: agentgacha B.7 = 3 bo‘lgani uchun B.15 dagi «- B.7 sinovda» o‘rniga «- (B.7 sinovda - 3)» olish halolroq bo‘ladi.
Aks holda Jamshid akaning hozir ham ketayotgan 3 soati agentning xarajatiga yozilib qoladi.
Qaysi formulani olishni yakun bosqichida egasi bilan kelishamiz.

### Xarajatlar

| Xarajat | 1-hafta, so‘m | 2-hafta, so‘m | Jami, so‘m |
|---|---|---|---|
| B.9 Obuna (OpenRouter + VPS / 4,3) | 52 482 |   |   |
| B.10 Integratsiya va sozlash (bir martalik) | 361 809 | - | 361 809 |
| B.11 Tekshirish soati x soatbay haq | 79 100 |   |   |
| Loyiha yetakchisi qo‘shimcha haqi | 200 000 | 200 000 | 400 000 |
| B.12 Jami | 693 391 |   |   |

Izoh: loyiha yetakchisiga qo‘shimcha haq, haftasiga 200 000 so‘m, natijadan qat’i nazar (briefing.md, egasining so‘zi).
2 haftada: 2 × 200 000 = 400 000 so‘m (tekshirish: 200 000 + 200 000 = 400 000).
Egasining qarori bilan (2026-12-13, `plan.md`) B.12 ga qo‘shiladi: B.12 = B.9 + B.10 + B.11 + 400 000.

### Natija

| Ko‘rsatkich | Hisob | Natija |
|---|---|---|
| B.15 Tejalgan vaqt, soat/hafta | (B.2 agentgacha - B.2 sinovda) x B.1 / 60 - B.7 |   |
| B.16 Bitta bajarilgan ish narxi: agent / inson | agent: B.12 / B.5 yig‘indisi; inson: B.2 agentgacha / 60 x soatbay haq | agent: - / inson: 6 / 60 × 22 600 = 2 260 so‘m |

### Topilgan pul tafsiloti (B.14)

| Sana | Nima bo‘ldi | Summa, so‘m | Qanday hisobladik |
|---|---|---|---|
| 2026-12-18 (avans kuni) | Oldi olingan xato: menejer 10 ta ErgoPro (CH-202) uchun KP ni eski narx 2 350 000 bilan yozmoqchi edi; botdan so‘rab, prays-listdagi ulgurji 2 500 000 bilan yozdi. Eski KP yuborilmadi, yangisi yuborildi; mijoz qabul qilib, 18.12 da 70% avans to‘ladi | 1 500 000 (isbotlangan) | (2 500 000 - 2 350 000) × 10 = 150 000 × 10 = 1 500 000; narx `narxlar.csv` CH-202 ulgurji 2 500 000 bilan mos. Isbot: ikkala KP saqlangan, 18.12 da avans tushgan (egasining so‘zi, 2026-12-19) |
| 1-hafta [?] aniq kun | 35 000 000 so‘mlik buyurtmaga mijoz 15% so‘radi; bot va’da qilmadi, Jamshid akaga uzatdi; bitim 5% bilan yopildi | 3 500 000 [?] (yig‘indiga qo‘shilmadi) | 35 000 000 × (15% - 5%) = 5 250 000 - 1 750 000 = 3 500 000. Isbotlanmagan: botsiz 15% berilarmidi yoki mijoz 15% siz ham olarmidi, bilmaymiz |
|   |   |   |   |
|   |   |   |   |

B.14 1-hafta (isbotlangan) = 1 500 000 so‘m. Isbotlanmagan: 3 500 000 [?].

### Xatolar jurnali

1-hafta: jurnalda 8 ta yozuv, lekin xato javoblar 7 ta: 8-yozuv 7-yozuvdagi Senator javobining o‘zida topildi, shuning uchun B.3 = 7 qoladi.
Hech bir xato mijozga yetmadi, xodimlar ❌ bosdi (egasining so‘zi, 2026-12-19).
Hamma o‘zgarishlar `instructions.md` (B.4, B.5) va `form-b-agent.md` ga 2026-12-19 da kiritildi; bot serverda T1-T14 da hali sinalmagan.

| B.13 Sana | Nima bo‘ldi | Kim topdi | Nimani o‘zgartirdik |
|---|---|---|---|
| 2026-12-14 | «Bench-4 ni 3 ish kunida yetkazamiz» dedi; qoidada 7 ish kuni, «3 kun» taqiqlangan (B.5) | Savdo bo‘limi rahbari (ish jurnali) | B.4: muddat faqat 7 yoki 12 ish kuni, omborda bo‘lsa ham; tezroq so‘ralsa Jamshid akaga uzatadi. B.5: boshqa muddat taqiqi. Test T8 |
| 2026-12-15 | «140 lik stol» ni topilmadi deb uzatdi; aslida Optima WS-102 (140x70) | Savdo bo‘limi rahbari (ish jurnali) | B.4: o‘lcham yoki tur bo‘yicha qidiradi, «shu mahsulotmi?» deb so‘raydi. Test T9 |
| 2026-12-15 | Optima 6 dona uchun chakana 2 150 000 aytdi; 6 ≥ 5, ulgurji 1 890 000 kerak edi | Savdo bo‘limi rahbari (ish jurnali) | B.4: tanlovni javobda ochiq yozadi («6 dona ≥ 5 → ulgurji»). Test T10 |
| 2026-12-16 | Chirchiqqa yetkazish bepul dedi; bepul faqat Toshkent shahri ichida, viloyatga 8 000 so‘m/km | Savdo bo‘limi rahbari (ish jurnali) | B.4: bepul faqat Toshkent shahri; viloyat shaharlari (Chirchiq va boshqalar) 8 000 so‘m/km; km ni so‘raydi. Test T11 |
| 2026-12-17 | AeroLift kafolati 36 oy dedi; qoidada mexanizm 12 oy | Savdo bo‘limi rahbari (ish jurnali) | B.4: yangi kafolat qatori (korpus 24 oy, mexanizm 12 oy, AeroLift ham). B.5: «36 oy» taqiqi. Test T12 |
| 2026-12-17 | ErgoPro 10 dona narxiga QQSni ikki marta qo‘shdi; narxlar QQS bilan | Savdo bo‘limi rahbari (ish jurnali) | B.4: QQS qo‘shilmaydi, misol bilan. B.5: QQSni qayta qo‘shish taqiqi. Test T13 |
| 2026-12-18 | Senator qora (CH-203) 11 dona dedi; jigarrang CH-203-BR 26 dona borligini aytmadi | Savdo bo‘limi rahbari (ish jurnali) | B.4: 1C dagi hamma variantlarni alohida aytadi; CH-203-BR narxi CH-203 bilan bir xil. Test T14 |
| 2026-12-18 | Shu Senator javobida qoldiqni kechagi (17.12) 1C faylidan aytdi; qoida (B.6): fayl bugungi bo‘lmasa, qoldiq aytilmaydi, uzatiladi | Kompaniya egasi (haftalik ko‘rib chiqish, 2026-12-19) | 1C fayli har kuni 08:30 da yangilanadi (IT-administrator). B.3: yangilanish vaqti. B.4: har bir qoldiq javobida fayl sanasi; sana bugungi bo‘lmasa (kechagi ham) qoldiq aytilmaydi, uzatiladi. Test T15 |

### Qaror

- [ ] Davom etish
- [ ] O‘zgartirish
- [ ] To‘xtatish

Sababi:
