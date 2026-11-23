# To‘plam 5 · B shakli: Sinov raqamlari

Praktikum 3.0 · Sinov va hisob-kitob · Fayl: `kit5-pilot/numbers.md`

Shu faylni to‘ldiring yoki Claude Code’da /kit5 ni ishga tushiring: u siz bilan birga to‘ldiradi.

- Jarayon: narx, qoldiq, chegirma va muddat savoli («Savdo yordamchisi»)
- Sinov sanalari: 2026-12-14 - 2026-12-27, 2 hafta (`plan.md`); 3-hafta va 4-hafta ustunlari ishlatilmaydi
- Soatbay haq, so‘m: 22 600 (CLAUDE.md: menejer okladi 4 500 000 / 199 soat)
- Loyiha yetakchisi: Malika

| Ko‘rsatkich | Agentgacha | 1-hafta | 2-hafta | 3-hafta | 4-hafta | O‘zgarish |
|---|---|---|---|---|---|---|
| B.1 Bajarilgan so‘rovlar | 120 | 115 | 134 | - | - | +14 (+11,7%) |
| B.2 O‘rtacha vaqt, daqiqa | 6 | 3 | 2 | - | - | -4 (-66,7%) |
| B.3 Xato javoblar | 9 | 7 | 2 | - | - | -7 (-77,8%) |
| B.4 Takroriy so‘rovlar | 15 | 12 | 9 | - | - | -6 (-40%) |
| B.5 To‘liq hal qilingan so‘rovlar | 100 | 104 | 125 | - | - | +25 (+25%) |
| B.6 Yakunlangan bitimlar yoki buyurtmalar | [?] | [?] | [?] | - | - | [?] |
| B.7 Xodimning tekshirishga sarflagan vaqti, soat | 3 | 3,5 | 2,5 | - | - | -0,5 (-16,7%) |
| B.14 Topilgan pul, so‘m | 0 | 1 500 000 | 0 | - | - | 2 hafta jami: 1 500 000 |
| B.8 Mijoz shikoyatlari | 2 | 1 | 0 | - | - | -2 (-100%) |

B.2 - bitta so‘rovga odam sarflagan daqiqa, tekshirishsiz (tekshirish B.7 da).
B.14 - oldi olingan xato, yo‘qolmagan so‘rov, tezroq tushgan pul.

## Hisoblar

Agentgacha ustuni (manbalar batafsil: `kit5-pilot/baseline.md`):

- B.1 = 120 savol / 1 hafta = 120.
  Manba: «Baraka Savdo» eksporti, 30.11-05.12, tarix.
- B.2 = 6 daqiqa (12 holat, oraliq 2-15).
  Manba: Malikaning jonli yozuvi, 01.12-05.12.
- B.3 = 9 (100 tekshirilgan javobdan: 9 / 100 × 100 = 9%).
  Manba: Jamshid akaning tekshiruvi, 30.11-05.12.
- B.4 = 15 (15 / 120 × 100 = 12,5%).
  Manba: eksport, 30.11-05.12.
- B.5 = 100 (100 / 120 × 100 = 83,3%).
  Manba: eksport, 30.11-05.12.
- B.6 = [?].
  Sanalmaydi: egasining qarori (2026-12-13), bu pilotda asosiy ko‘rsatkich emas.
- B.7 = 3 soat.
  Manba: egasining so‘zi.
  Izoh: Jamshid aka agent yo‘q paytda ham javoblarni tekshiradi, shuning uchun egasining qarori bilan 0 emas, 3 yozildi.
  Puli: 3 × 22 600 = 67 800 so‘m/hafta.
- B.8 = 2.
  Manba: egasi, 30.11-05.12.
- B.14 = 0 (agentgacha).

1-hafta ustuni (14.12-19.12, 6 ish kuni; egasi 2026-12-19 da berdi):

- B.1 = 115 savol.
  Manba: bot ish jurnali, 14.12-19.12.
- B.2 = 3 daqiqa (12 holat, o‘rtacha).
  Manba: Malikaning jonli o‘lchovi, 14.12-19.12; har bir holatning daqiqasi uning jadvalida (egasining so‘zi).
  Oraliq bu faylga hali ko‘chirilmagan [?].
- B.3 = 7 (7 / 115 × 100 = 6,1%; agentgacha 9 / 100 × 100 = 9%).
  Manba: bot jurnali; 7 ta holat pastdagi B.13 jurnalida, ularni savdo bo‘limi rahbari topdi.
- B.4 = 12 (12 / 115 × 100 = 10,4%).
  Manba: bot jurnali.
- B.5 = 104 (104 / 115 × 100 = 90,4%).
  Manba: bot jurnali.
- B.6 = [?].
  Sanalmaydi (egasining qarori, 2026-12-13).
- B.7 = 3,5 soat, butun vazifa uchun.
  Manba: egasining so‘zi.
  Puli: 3,5 × 22 600 = 79 100 so‘m.
- B.8 = 1.
  Manba: egasining so‘zi, 14.12-19.12.
  Shikoyat yetkazish kechikkani haqida, bot xatosi emas.
- B.14 = 1 500 000 so‘m (faqat isbotlangan; tafsilot pastda).

1-hafta va agentgacha (1-hafta - agentgacha; foiz = farq / agentgacha × 100):

- B.1: 115 - 120 = -5; -5 / 120 × 100 = -4,2%
- B.2: 3 - 6 = -3; -3 / 6 × 100 = -50% (A.2 maqsadi 3 daqiqa; rasmiy tekshiruv 26.12)
- B.3: 7 - 9 = -2; -2 / 9 × 100 = -22,2%.
  A.6 mezoni (≤ 3) bajarilmadi: 7 > 3
- B.4: 12 - 15 = -3; -3 / 15 × 100 = -20%
- B.5: 104 - 100 = +4; 4 / 100 × 100 = +4%
- B.6: [?]
- B.7: 3,5 - 3 = +0,5; 0,5 / 3 × 100 = +16,7%
- B.8: 1 - 2 = -1; -1 / 2 × 100 = -50%.
  A.6 mezoni (≤ 2) bajarildi
- B.14: 1 500 000 - 0 = +1 500 000 so‘m

A.7 to‘xtatish sharti: bajarilmadi.
Bot mijozga yozgani haqida xabar yo‘q; 15% so‘ralgan holatda bot chegirma va’da qilmadi, Jamshid akaga uzatdi.

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
  - Agar B.7 to‘liq ayirilsa (eski formula): 5,75 - 3,5 = 2,25 soat/hafta.
    Qaysi biri - yakunda kelishiladi.
- B.16 agent (1-hafta) = 693 391 / 104 = 6 667 so‘m (tekshirish: 104 × 6 667 = 693 368; qoldiq 23).
  - Bir martalik sozlashsiz: (693 391 - 361 809) / 104 = 331 582 / 104 = 3 188 so‘m.
  - Inson: 6 / 60 × 22 600 = 2 260 so‘m.
  - 1-haftada agentning bitta ishi insondan qimmat; asosiy sabab - sozlash va loyiha yetakchisi haqi.

Yakunda e’tibor bering: agentgacha B.7 = 3 bo‘lgani uchun B.15 dagi «- B.7 sinovda» o‘rniga «- (B.7 sinovda - 3)» olish halolroq bo‘ladi.
Aks holda Jamshid akaning hozir ham ketayotgan 3 soati agentning xarajatiga yozilib qoladi.
Qaysi formulani olishni yakun bosqichida egasi bilan kelishamiz.
Yakunda (2026-12-27): To‘plam 5 formulasi bo‘yicha «- (B.7 sinovda - B.7 agentgacha)» olindi; eski variant ham pastda ko‘rsatilgan.

2-hafta ustuni (21.12-26.12, 6 ish kuni; egasi 2026-12-27 da berdi):

- B.1 = 134 savol.
  Manba: bot ish jurnali, 21.12-26.12.
- B.2 = 2 daqiqa (12 holat, o‘rtacha; eng kami 1, eng ko‘pi 4).
  Manba: Malikaning jonli o‘lchovi, 21.12-26.12 (egasining so‘zi).
- B.3 = 2 (2 / 134 × 100 = 1,5%).
  Manba: bot jurnali; 2 ta holat B.13 jurnalida (21.12 va 23.12), ularni savdo bo‘limi rahbari topdi.
- B.4 = 9 (9 / 134 × 100 = 6,7%).
  Manba: egasining so‘zi.
- B.5 = 125 (125 / 134 × 100 = 93,3%).
  Manba: bot jurnali.
- B.6 = [?].
  Sanalmaydi (egasining qarori, 2026-12-13).
- B.7 = 2,5 soat, butun vazifa uchun.
  Manba: egasining so‘zi.
  Puli: 2,5 × 22 600 = 56 500 so‘m (tekshirish: 2 × 22 600 + 0,5 × 22 600 = 45 200 + 11 300 = 56 500).
- B.8 = 0.
  Manba: egasining so‘zi.
- B.14 = 0.
  Bu hafta topilgan pul yo‘q (egasining so‘zi).

2-hafta va agentgacha (2-hafta - agentgacha; foiz = farq / agentgacha × 100):

- B.1: 134 - 120 = +14; 14 / 120 × 100 = +11,7%
- B.2: 2 - 6 = -4; -4 / 6 × 100 = -66,7%.
  A.2 maqsadi (3 daqiqa yoki kam) bajarildi: 2 ≤ 3
- B.3: 2 - 9 = -7; -7 / 9 × 100 = -77,8%.
  Ulushda: 1,5% va 9%
- B.4: 9 - 15 = -6; -6 / 15 × 100 = -40%.
  Ulushda: 6,7% va 12,5%
- B.5: 125 - 100 = +25; 25 / 100 × 100 = +25%.
  Ulushda: 93,3% va 83,3%
- B.6: [?]
- B.7: 2,5 - 3 = -0,5; -0,5 / 3 × 100 = -16,7%
- B.8: 0 - 2 = -2; -2 / 2 × 100 = -100%
- B.14: 2-haftada 0; 2 hafta jami 1 500 000 so‘m

A.7 to‘xtatish sharti, 2-hafta: **2-shart bajarildi** (2026-12-23).
Bot xodimga «ha, 10% gacha mumkin» deb yozdi: bu 5% dan katta chegirma va’dasi va u xodimga yetib bordi.
Mijozga yetmadi: xodim ❌ bosdi.
`/stop` berilmadi (egasining so‘zi, 2026-12-27).
**A.7 bo‘yicha kamchilik:** shart bajarilganda `/stop` berilishi kerak edi; mijozga yetmagani bundan ozod qilmaydi.
Keyingi safar `/stop` beriladi (egasining qarori).

Xarajatlar hisobi, 2-hafta:

- B.9 obuna = OpenRouter + VPS = 6 807 + 46 512 = 53 318 so‘m.
  - OpenRouter: 0,57 × 11 941,65 = 6 806,74 ≈ 6 807 so‘m.
    Kurs 11 941,65: egasining qarori (2026-12-27), ikkala haftaga bir xil.
  - Tekshirish: 0,5 × 11 941,65 + 0,07 × 11 941,65 = 5 970,83 + 835,92 = 6 806,75 (yaxlitlash farqi 0,01).
  - VPS: 200 000 / 4,3 = 46 511,63 ≈ 46 512 so‘m.
  - Jami: 6 806,74 + 46 511,63 = 53 318,37 ≈ 53 318.
- B.10 = - (bir martalik sozlash 1-haftada yozilgan).
- B.11 = 2,5 × 22 600 = 56 500 so‘m.
- Loyiha yetakchisi: 200 000 so‘m.
- B.12 (2-hafta) = 53 318 + 56 500 + 200 000 = 309 818 so‘m (tekshirish: 200 000 + 56 500 = 256 500; + 53 318 = 309 818).

Qayta sinov (`kit4-people/test-set.md`, «Sinov natijalari»):

- 2026-12-20: T1-T15 dan 14 tasi o‘tdi; T3 o‘tmadi, chunki 1C fayli eski edi (bot xatosi emas, fayl almashtirilmagan).
- 2026-12-21: fayl yangilangach, 15/15.
- E’tibor: o‘sha 21.12 kuni ishda bot Optima qoldig‘ini 18.12 dagi fayldan aytdi.
  Sinovda T15 o‘tgan, ishda esa xuddi shu qoida buzildi.

## Yakuniy hisob (2026-12-27)

### Xarajatlar, 2 hafta

- B.9 = 52 482 + 53 318 = 105 800 so‘m.
- B.10 = 361 809 so‘m (bir martalik).
- B.11 = 79 100 + 56 500 = 135 600 so‘m (tekshirish: (3,5 + 2,5) × 22 600 = 6 × 22 600 = 135 600).
- Loyiha yetakchisi = 2 × 200 000 = 400 000 so‘m.
- B.12 = 105 800 + 361 809 + 135 600 + 400 000 = 1 003 209 so‘m (tekshirish: 693 391 + 309 818 = 1 003 209).
- Izoh: B.11 ning hammasi yangi xarajat emas.
  Agentgacha ham haftasiga 3 soat tekshirish bor edi: 2 × 3 × 22 600 = 135 600 so‘m.
  Qo‘shimcha tekshirish: (0,5 - 0,5) × 22 600 = 0 so‘m.

### B.15 Tejalgan vaqt (oraliq)

Formula: (B.2 agentgacha - B.2 sinovda) × B.1 sinovda / 60 - (B.7 sinovda - B.7 agentgacha).

- 1-hafta (eng yomon): (6 - 3) × 115 / 60 - (3,5 - 3) = 345 / 60 - 0,5 = 5,75 - 0,5 = 5,25 soat/hafta.
- 2-hafta (eng yaxshi): (6 - 2) × 134 / 60 - (2,5 - 3) = 536 / 60 + 0,5 = 8,93 + 0,5 = 9,43 soat/hafta.
  - Tekshirish: 4 × 134 = 536; 536 / 60 = 8,9333; 8,9333 + 0,5 = 9,4333.
- **B.15 = 5,25-9,43 soat/hafta.**
- Pulda: 5,25 × 22 600 = 118 650; 9,4333 × 22 600 = 213 193 so‘m/hafta (tekshirish: 9 × 22 600 + 0,4333 × 22 600 = 203 400 + 9 793 = 213 193).
- Eski variant (B.7 to‘liq ayirilsa): 5,75 - 3,5 = 2,25 va 8,93 - 2,5 = 6,43 soat/hafta.
  Bu agentgacha ham ketgan 3 soatni agentga yozib qo‘yadi, shuning uchun asosiy raqam emas.
- Cheklov: agentgacha B.2 (6 daqiqa) ning alohida 12 daqiqasi saqlanmagan, oraliq 2-15 edi; sinovda 1-4.
  Raqam namunadan, ishonch «o‘rta».

### B.16 Bitta bajarilgan ish narxi

- Agent, 2 hafta: B.12 / (104 + 125) = 1 003 209 / 229 = 4 380,83 ≈ 4 381 so‘m (tekshirish: 229 × 4 381 = 1 003 249; 40 ga ko‘p, ya’ni 4 380,8).
- Agent, haftalar bo‘yicha oraliq: 2-hafta 309 818 / 125 = 2 478,5 ≈ 2 479 so‘m; 1-hafta 693 391 / 104 = 6 667 so‘m.
  **Oraliq: 2 479-6 667 so‘m.**
  - Tekshirish: 125 × 2 479 = 309 875 (57 ga ko‘p, 2 478,5); 104 × 6 667 = 693 368 (23 kam).
- Agent, bir martalik sozlashsiz: (1 003 209 - 361 809) / 229 = 641 400 / 229 = 2 800,9 ≈ 2 801 so‘m.
- Inson: 6 / 60 × 22 600 = 2 260 so‘m.
- Halol taqqoslash (bir xil narsani solishtirish uchun, haftasiga jarayonning to‘liq narxi):
  - Agentgacha: (120 × 6 / 60 + 3) × 22 600 = (12 + 3) × 22 600 = 339 000 so‘m; 339 000 / 100 = 3 390 so‘m bitta ishga.
  - 2-hafta: odam vaqti 134 × 2 / 60 = 4,47 soat × 22 600 = 100 947; + tekshirish 56 500 + obuna 53 318 + loyiha yetakchisi 200 000 = 410 765 so‘m; 410 765 / 125 = 3 286 so‘m bitta ishga.
  - Tekshirish: 100 947 + 56 500 = 157 447; + 53 318 = 210 765; + 200 000 = 410 765.
  - Loyiha yetakchisi haqisiz: 210 765 / 125 = 1 686 so‘m bitta ishga.
  - Xulosa: hozir jarayon 1 ta ish uchun deyarli avvalgidek turadi (3 286 va 3 390); Malikaning haqi 4-haftadan keyin to‘xtaydi (egasining qarori, 2026-12-27); shundan keyin bitta ish 1 686 so‘m bo‘ladi (agentgacha 3 390).

### B.14 Topilgan pul

- Isbotlangan: 1 500 000 so‘m (1 holat, 2026-12-18, ErgoPro KP).
- Isbotlanmagan: 3 500 000 so‘m [?] (35 mln buyurtma, 15% o‘rniga 5%).
- 2-hafta: 0.

### Oylik qiymat va xarajat

Oylik xarajat (sozlashsiz, davom etsa):
- VPS 200 000 + OpenRouter (0,50 + 0,57) / 2 × 4,3 × 11 941,65 = 200 000 + 2,3005 × 11 941,65 = 200 000 + 27 472 = 227 472 so‘m (kurs 11 941,65).
- Tekshirish (B.11) bu yerga qo‘shilmaydi: uning o‘zgarishi B.15 da allaqachon ayirilgan, qo‘shsak ikki marta sanaladi.
- Malikaning haqi yana 2 hafta (3-4-hafta) qoladi, keyin to‘xtaydi (egasining qarori, 2026-12-27).
  - 3-4-haftada: 2 × 200 000 = 400 000 so‘m.
  - Oyga hisoblasak: 200 000 × 4,3 = 860 000; jami 227 472 + 860 000 = 1 087 472 so‘m.
  - 4-haftadan keyin oylik xarajat: 227 472 so‘m.

Oylik qiymat:
- Tejalgan vaqt: 5,25 × 22 600 × 4,3 = 510 195 so‘m; 9,4333 × 22 600 × 4,3 = 916 731 so‘m.
  Oraliq 510 195-916 731.
  - Tekshirish: 118 650 × 4,3 = 474 600 + 35 595 = 510 195; 213 193 × 4,3 = 852 772 + 63 958 = 916 730 (yaxlitlash farqi 1).
- Topilgan pul: 2 haftada 1 ta isbotlangan holat.
  Shu tezlikda oyiga 1 500 000 / 2 × 4,3 = 3 225 000 so‘m [?], lekin bu 1 ta holatdan; 2-haftada 0.
  Isbotlangan oylik raqam yo‘q.

Solishtirish:
- Malikaning haqisiz (4-haftadan keyin): 510 195 - 227 472 = +282 723; 916 731 - 227 472 = +689 259 so‘m/oy.
  Tejalgan vaqtning o‘zi xarajatni qoplaydi.
- Malikaning haqi bilan (faqat 3-4-hafta): 510 195 - 1 087 472 = -577 277; 916 731 - 1 087 472 = -170 741 so‘m/oy.
  Tejalgan vaqt yetmaydi; faqat topilgan pul qoplaydi, u esa hali 1 ta holat.
- Tejalgan vaqt pulga faqat u ishlatilsa aylanadi: Malika - yangi menejerlarga botni o‘rgatish va KP tekshirish; Zarina - norozi mijozlar bilan suhbat (egasining so‘zi, 2026-12-27).
- Bir martalik 361 809 so‘m sozlash: Malikaning haqisiz oyiga 282 723-689 259 tejalsa, 1-2 oyda qoplanadi (361 809 / 282 723 = 1,28; 361 809 / 689 259 = 0,52).

### A.6 va A.7 bilan solishtirish

- A.2 / A.6 B.2 ≤ 3 daqiqa: bajarildi (1-hafta 3, 2-hafta 2).
- A.6 B.3 har haftada ≤ 3: bajarilmadi (1-hafta 7); 2-haftada bajarildi (2).
- A.6 B.8 har haftada ≤ 2: bajarildi (1 va 0).
- A.7 1-shart (bot mijozga yozsa): bajarilmadi.
- A.7 2-shart (5% dan katta chegirma xodimga yetsa): **bajarildi, 2026-12-23** (10%).
  `/stop` berilmadi: bu A.7 bo‘yicha kamchilik, keyingi safar `/stop` beriladi.

### Xatolar turlari (B.13, 2 hafta, 10 yozuv)

| Tur | Yozuvlar | Soni | 2-haftada qaytdimi | Yo‘riqnomadagi o‘zgarish |
|---|---|---|---|---|
| 1. Qoidadan tashqari va’da (muddat, chegirma, kafolat, bepul yetkazish) | 14.12, 16.12, 17.12 (kafolat), 23.12 | 4 | ha (23.12, chegirma) | B.5 taqiqlari bor edi; matn yetmadi. Taklif: chegirma javobida foiz faqat «5% gacha», qolgani uzatiladi + dastur darajasida tekshiruv |
| 2. Eskirgan 1C ma’lumoti | 18.12, 21.12 | 2 | ha (21.12) | B.4 sana tekshiruvi bor edi; matn yetmadi. Taklif: sanalarni javobda ochiq solishtirish + dastur o‘zi tekshiradi + yangilanish ishlamasa IT xabari |
| 3. Hisob xatosi (chakana/ulgurji, QQS) | 15.12, 17.12 (QQS) | 2 | yo‘q | B.4: tanlov ochiq yoziladi, QQS qo‘shilmaydi (19.12) - ishladi |
| 4. Qidiruv va to‘liqsiz javob (o‘lcham, variant) | 15.12 (140 lik), 18.12 (Senator) | 2 | yo‘q | B.4: o‘lcham bo‘yicha qidirish, hamma variantlar (19.12) - ishladi |

Jami 10 yozuv, 9 ta xato javob (18.12 dagi 2 yozuv bitta javobda): 7 + 2 = 9.

### Xarajatlar

| Xarajat | 1-hafta, so‘m | 2-hafta, so‘m | Jami, so‘m |
|---|---|---|---|
| B.9 Obuna (OpenRouter + VPS / 4,3) | 52 482 | 53 318 | 105 800 |
| B.10 Integratsiya va sozlash (bir martalik) | 361 809 | - | 361 809 |
| B.11 Tekshirish soati x soatbay haq | 79 100 | 56 500 | 135 600 |
| Loyiha yetakchisi qo‘shimcha haqi | 200 000 | 200 000 | 400 000 |
| B.12 Jami | 693 391 | 309 818 | 1 003 209 |

Izoh: loyiha yetakchisiga qo‘shimcha haq, haftasiga 200 000 so‘m, natijadan qat’i nazar (briefing.md, egasining so‘zi).
2 haftada: 2 × 200 000 = 400 000 so‘m (tekshirish: 200 000 + 200 000 = 400 000).
Egasining qarori bilan (2026-12-13, `plan.md`) B.12 ga qo‘shiladi: B.12 = B.9 + B.10 + B.11 + 400 000.

### Natija

| Ko‘rsatkich | Hisob | Natija |
|---|---|---|
| B.15 Tejalgan vaqt, soat/hafta | (B.2 agentgacha - B.2 sinovda) × B.1 sinovda / 60 - (B.7 sinovda - B.7 agentgacha) | 5,25-9,43 (1-hafta: 3 × 115 / 60 - 0,5 = 5,25; 2-hafta: 4 × 134 / 60 + 0,5 = 9,43) |
| B.16 Bitta bajarilgan ish narxi: agent / inson | agent: B.12 / B.5 yig‘indisi; inson: B.2 agentgacha / 60 × soatbay haq | agent: 1 003 209 / 229 = 4 381 so‘m (haftalar bo‘yicha 2 479-6 667) / inson: 6 / 60 × 22 600 = 2 260 so‘m |

### Topilgan pul tafsiloti (B.14)

| Sana | Nima bo‘ldi | Summa, so‘m | Qanday hisobladik |
|---|---|---|---|
| 2026-12-18 (avans kuni) | Oldi olingan xato: menejer 10 ta ErgoPro (CH-202) uchun KP ni eski narx 2 350 000 bilan yozmoqchi edi; botdan so‘rab, prays-listdagi ulgurji 2 500 000 bilan yozdi. Eski KP yuborilmadi, yangisi yuborildi; mijoz qabul qilib, 18.12 da 70% avans to‘ladi | 1 500 000 (isbotlangan) | (2 500 000 - 2 350 000) × 10 = 150 000 × 10 = 1 500 000; narx `narxlar.csv` CH-202 ulgurji 2 500 000 bilan mos. Isbot: ikkala KP saqlangan, 18.12 da avans tushgan (egasining so‘zi, 2026-12-19) |
| 1-hafta [?] aniq kun | 35 000 000 so‘mlik buyurtmaga mijoz 15% so‘radi; bot va’da qilmadi, Jamshid akaga uzatdi; bitim 5% bilan yopildi | 3 500 000 [?] (yig‘indiga qo‘shilmadi) | 35 000 000 × (15% - 5%) = 5 250 000 - 1 750 000 = 3 500 000. Isbotlanmagan: botsiz 15% berilarmidi yoki mijoz 15% siz ham olarmidi, bilmaymiz |
|   |   |   |   |
|   |   |   |   |

B.14 1-hafta (isbotlangan) = 1 500 000 so‘m.
Isbotlanmagan: 3 500 000 [?].
B.14 2-hafta = 0 (egasining so‘zi, 2026-12-27: bu hafta holat yo‘q).
B.14 2 hafta jami (isbotlangan) = 1 500 000 + 0 = 1 500 000 so‘m.

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
| 2026-12-21 | Optima qoldig‘ini (12 dona) 18.12 dagi 1C faylidan aytdi; o‘sha kuni 08:30 dagi yangilanish ishlamagan. B.4 qoidasi (19.12) bo‘yicha qoldiq aytilmasligi va uzatilishi kerak edi. Mijozga yetmadi | Savdo bo‘limi rahbari (ish jurnali) | B.4: qoldiq javobining 1-qatori «1C fayli: [sana], bugun: [sana]»; sanalar bir xil bo‘lmasa, qoldiq soni yozilmaydi (2026-12-27). Dastur sanani o‘zi tekshiradi; 08:30 yangilanishi ishlamasa, IT-administratorga xabar boradi. Test T17 |
| 2026-12-23 | 60 000 000 so‘mlik buyurtma, 100% oldindan to‘lov, 7% chegirma so‘raldi; bot «ha, 10% gacha mumkin» dedi. Qoida: 5% gacha, kattasi Jamshid akaga uzatiladi (B.5, B.6). A.7 2-sharti bajarildi, `/stop` berilmadi (kamchilik). Mijozga yetmadi | Savdo bo‘limi rahbari (ish jurnali) | B.4: 5% dan katta foiz so‘ralsa «ha», «mumkin», «... gacha» demaydi, 5% dan boshqa foiz yozmaydi, uzatadi (2026-12-27). Dastur tekshiruvi: javobda 5% dan katta foiz bo‘lsa, yuborilmaydi va uzatiladi (IT-administrator). Test T16 |

### Qaror

- [ ] Davom etish
- [x] O‘zgartirish
- [ ] To‘xtatish

Sababi (egasining qarori, 2026-12-27): vaqt maqsadi bajarildi (B.2: 6 → 2 daqiqa), lekin chegirma va eski qoldiq xatosi yo‘riqnoma matni tuzatilgandan keyin ham qaytdi.

- Yana 2 hafta (3-4-hafta) faqat qoralama tartibida, dastur tekshiruvi bilan: chegirma foizi va 1C fayli sanasi.
  Dastur qismini IT-administrator qiladi.
- Yo‘riqnoma 2026-12-27 da o‘zgartirildi, T16 va T17 qo‘shildi; ishga tushishdan oldin T1-T17 da qayta sinash kerak.
- Malikaning haqi 3-4-haftada qoladi, keyin to‘xtaydi.
- A.7 kamchiligi: 23.12 da `/stop` berilmadi; keyingi safar beriladi.
