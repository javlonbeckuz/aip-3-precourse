# To‘plam 5 · B shakli: Sinov raqamlari

Praktikum 3.0 · Sinov va hisob-kitob · Fayl: `kit5-pilot/numbers.md`

- Jarayon: narx, qoldiq, chegirma va muddat savollariga javob, savdo bo‘limi (To‘plam 2, B.1); agent: «Savdo yordamchisi» boti
- Sinov sanalari: 2026-12-14 - 2026-12-26 (2 hafta, haftasiga 6 ish kuni); 6-dars 2026-12-27
- Soatbay haq, so‘m: 35 700 (CLAUDE.md: kim javob berishiga qarab vaznli o‘rtacha, 892 500 / 25 = 35 700)
- To‘ldirildi: 1-hafta, 2026-12-20; 2-hafta va yakun, 2026-12-27

| Ko‘rsatkich | Agentgacha | 1-hafta | 2-hafta | 3-hafta | 4-hafta | O‘zgarish (2-hafta - agentgacha) |
|---|---|---|---|---|---|---|
| B.1 Bajarilgan so‘rovlar | 120 | 132 | 138 | | | +18 (+15,0%) |
| B.2 O‘rtacha vaqt, daqiqa | 6 | 2,5 | 2,0 | | | -4 (-66,7%) |
| B.3 Xato javoblar | 9 | 7 | 3 | | | -6 (-66,7%) |
| B.4 Takroriy so‘rovlar | 15 | 12 | 8 | | | -7 (-46,7%) |
| B.5 To‘liq hal qilingan so‘rovlar | 100 | 104 | 121 | | | +21 (+21,0%) |
| B.6 Yakunlangan bitimlar yoki buyurtmalar | [?] | [?] | [?] | | | - |
| B.7 Xodimning tekshirishga sarflagan vaqti, soat | 0 | 4,5 | 2,0 | | | +2,0 (foiz yo‘q: agentgacha 0) |
| B.14 Topilgan pul, so‘m | 0 | 0 | 680 000 | | | +680 000 |
| B.8 Mijoz shikoyatlari | 2 | 2 | 1 | | | -1 (-50,0%) |

B.2 - bitta so‘rovga odam sarflagan daqiqa, tekshirishsiz (tekshirish B.7 da).
B.14 - oldi olingan xato, yo‘qolmagan so‘rov, tezroq tushgan pul.
1-hafta to‘liq tasdiqlash haftasi edi (`REPLY_MODE=approve`): A.6 mezonlari 2-hafta oxirida baholanadi.
2-hafta qisman to‘g‘ridan-to‘g‘ri: narx va qoldiq javoblari xodimga darhol ketdi, chegirma va yetkazish sanasini Malika 100% tasdiqladi (`plan.md`, 2026-12-19 kelishuvi).

## Hisoblar

Manba, agar boshqasi yozilmagan bo‘lsa: botning haftalik fayli (`/hafta`, 2026-12-20), davr 2026-12-14 - 2026-12-19.
Agentgacha ustuni: `kit5-pilot/baseline.md` (2026-11-02 - 2026-11-28 tarix va 2026-11-30 - 2026-12-04 jonli o‘lchov).

### 2-hafta (2026-12-21 - 2026-12-26)

Manba: botning haftalik fayli (`/hafta`, 2026-12-27) va egasining so‘zi, 2026-12-27.

| Ko‘rsatkich | Hisob | Manba |
|---|---|---|
| B.1 | 138 ta savol | bot jurnali |
| B.2 | (2 + 2 + 2 + 1 + 3 + 2 + 2 + 2 + 2 + 2) / 10 = 20 / 10 = 2,0 daqiqa | jonli o‘lchov, 10 holat, showroom, soat bilan (1-haftadagi usul), tekshirishsiz |
| B.3 | 3 ta | bot jurnali; B.13 dagi 2-hafta 3 qatori bilan mos |
| B.4 | 8 ta | egasining so‘zi |
| B.5 | 121 ta | bot jurnali |
| B.6 | o‘lchanmaydi | agentgacha ham [?] |
| B.7 | 2,0 soat: chegirma va yetkazish sanasi javoblarini 100% tasdiqlash + narx va qoldiq javoblarining har 5 tadan bittasini keyin ko‘rish | egasining so‘zi; butun vazifa uchun bitta raqam |
| B.8 | 1 ta | egasining so‘zi |
| B.14 | 680 000 so‘m, faqat isbotlangan holat (pastda «Topilgan pul tafsiloti») | amoCRM, Telegram, to‘lov tasdig‘i |

O‘zgarish ustuni (2-hafta, ya’ni oxirgi hafta): (2-hafta - agentgacha) / agentgacha × 100.
- B.1: (138 - 120) / 120 × 100 = 18 / 120 × 100 = +15,0%
- B.2: (2,0 - 6) / 6 × 100 = -4 / 6 × 100 = -66,7%
- B.3: (3 - 9) / 9 × 100 = -6 / 9 × 100 = -66,7%
- B.4: (8 - 15) / 15 × 100 = -7 / 15 × 100 = -46,7%
- B.5: (121 - 100) / 100 × 100 = +21,0%
- B.8: (1 - 2) / 2 × 100 = -50,0%
- B.7: 2,0 - 0 = +2,0 soat; foiz hisoblanmaydi (0 ga bo‘lib bo‘lmaydi)
- B.14: 680 000 - 0 = +680 000 so‘m; foiz hisoblanmaydi

1-haftadan 2-haftaga: B.7 4,5 dan 2,0 ga tushdi (narx va qoldiq tasdiqsiz ketgani uchun), B.3 7 dan 3 ga.

### 1-hafta (2026-12-14 - 2026-12-19)

| Ko‘rsatkich | Hisob | Manba |
|---|---|---|
| B.1 | 132 ta savol | bot jurnali |
| B.2 | (3 + 2 + 3 + 2 + 2 + 3 + 2 + 3 + 2 + 3) / 10 = 25 / 10 = 2,5 daqiqa | jonli o‘lchov, 10 holat, showroom; soat bilan: savolni botga yozish va javobni mijozga aytish, tekshirishsiz |
| B.3 | 7 ta (❌ bosilgan yoki tasdiqlashda tuzatilgan) | bot jurnali; B.13 dagi 7 qator bilan mos |
| B.4 | 12 ta | bot jurnali |
| B.5 | 104 ta | bot jurnali |
| B.6 | o‘lchanmaydi | egasining so‘zi; agentgacha ham [?] |
| B.7 | tasdiqlash va kunlik 17:30 dagi ❌ ko‘rish ≈ 2,5 + uzatishlar va jurnalni ko‘rish ≈ 2 = 4,5 soat | egasining so‘zi, taxminiy; butun vazifa uchun bitta raqam |
| B.8 | 2 ta | Telegram va amoCRM «shikoyat» tegi; ikkalasi ham sinovgacha berilgan muddat va’dasi haqida, botga bog‘liq emas |
| B.14 | 0 | egasining so‘zi: bu hafta topilgan pul yo‘q |

O‘zgarish ustuni: (1-hafta - agentgacha) / agentgacha × 100.
- B.1: (132 - 120) / 120 × 100 = 12 / 120 × 100 = +10,0%
- B.2: (2,5 - 6) / 6 × 100 = -3,5 / 6 × 100 = -58,3%
- B.3: (7 - 9) / 9 × 100 = -2 / 9 × 100 = -22,2%
- B.4: (12 - 15) / 15 × 100 = -3 / 15 × 100 = -20,0%
- B.5: (104 - 100) / 100 × 100 = +4,0%
- B.8: (2 - 2) / 2 × 100 = 0,0%
- B.7: 4,5 - 0 = +4,5 soat; foiz hisoblanmaydi (0 ga bo‘lib bo‘lmaydi)

Ehtiyot bo‘ladigan joylar:
- Cheklov: B.2 10 ta holatdan, bitta ish joyidan (showroom) o‘lchangan; agentgacha 18 holat, uch ish joyidan.
  2-haftada ham showroomda 10 ta holat o‘lchanadi, chunki savollarning ko‘pi showroomdan keladi (egasining qarori, 2026-12-20).
  Call-markaz va menejer savollari uchun B.2 sinovda o‘lchanmaydi.
- B.2 ga 1-haftada tasdiqni kutish vaqti kirmagan (u odam ishi emas, lekin mijoz kutgan vaqt) [?].
- Bot 14-dekabr 14:00 da yoqilgan: 1-hafta to‘liq 6 kun emas, taxminan 5,5 kun.
- B.7 taxminiy («taxminan 2,5» va «taxminan 2»): 2-haftada kunlik raqam yozilsa, aniqroq bo‘ladi (A.8).

### Xarajatlar

Oylik obuna (egasining so‘zi va OpenRouter paneli):
- Server: 200 000 so‘m/oy
- OpenRouter: panel bo‘yicha 2 haftaga ≈ 1,45 $; 1,45 / 2 × 4,3 = 3,12 $/oy; 3,12 × 11 941,65 = 37 258 → taxminan 37 000 so‘m/oy
- Claude Pro: 20 $ + 12% QQS = 22,40 $; 22,40 × 11 941,65 = 267 493 → 267 500 so‘m/oy
- Jami: 200 000 + 37 000 + 267 500 = 504 500 so‘m/oy

2-hafta: oylik obuna o‘zgarmadi, 504 500 so‘m/oy (egasining so‘zi, 2026-12-27).
OpenRouter paneli 2 haftada jami 1,45 $ ko‘rsatdi; 1,45 × 11 941,65 = 17 315 so‘m, oylik hisobdagi 2 haftalik ulush 37 000 / 4,3 × 2 = 17 209 so‘m bilan deyarli bir xil, shuning uchun oylik raqam o‘zgartirilmadi.

| Xarajat | Hisob | So‘m (2 hafta jami, 2026-12-14 - 2026-12-26) |
|---|---|---|
| B.9 Obuna | 504 500 / 4,3 = 117 326 so‘m/hafta; 117 326 × 2 hafta | 234 652 |
| B.10 Integratsiya va sozlash (bir martalik) | egasi 14 soat × 125 000 (25 000 000 / 200) = 1 750 000; IT-administrator 3 soat × 45 000 (9 000 000 / 200) = 135 000; 1 750 000 + 135 000 | 1 885 000 |
| B.11 Tekshirish soati × soatbay haq | (4,5 + 2,0) × 35 700 = 6,5 × 35 700 | 232 050 |
| B.12 Jami | 234 652 + 1 885 000 + 232 050 | 2 351 702 |

Haftalar bo‘yicha: 1-hafta 117 326 + 1 885 000 + 160 650 = 2 162 976; 2-hafta 117 326 + 0 + 71 400 (2,0 × 35 700) = 188 726; jami 2 162 976 + 188 726 = 2 351 702 (tekshiruv: mos).

Izoh: B.11 CLAUDE.md dagi o‘rtacha 35 700 bilan hisoblangan.
1-haftada tekshirishni asosan savdo menejeri va ROP qilgani uchun ularning o‘z soatbay haqi bilan 2,5 × 22 500 + 2 × 60 000 = 56 250 + 120 000 = 176 250 so‘m bo‘lardi (15 600 so‘m ko‘p).
B.10 ga 2-haftadagi yo‘riqnoma tuzatishlari (3 ta, `app/` da) va 1-hafta tuzatishlari vaqti kirmagan: soati yozilmagan [?].

### Natija

Yakuniy, 2 hafta bo‘yicha; oraliq = eng yomon va eng yaxshi hafta.

| Ko‘rsatkich | Hisob | Natija |
|---|---|---|
| B.15, 1-hafta | (6 - 2,5) × 132 / 60 - (4,5 - 0) = 3,5 × 132 / 60 - 4,5 = 462 / 60 - 4,5 = 7,7 - 4,5 | 3,2 soat/hafta |
| B.15, 2-hafta | (6 - 2,0) × 138 / 60 - (2,0 - 0) = 4 × 138 / 60 - 2,0 = 552 / 60 - 2,0 = 9,2 - 2,0 | 7,2 soat/hafta |
| **B.15 Tejalgan vaqt, oraliq** | eng yomon hafta - eng yaxshi hafta | **3,2 - 7,2 soat/hafta** |
| B.16 agent, sozlash bilan (formula bo‘yicha) | B.12 / (104 + 121) = 2 351 702 / 225 = 10 452,0 | 10 452 so‘m |
| B.16 agent, sozlashsiz, 1-hafta | (117 326 + 160 650) / 104 = 277 976 / 104 = 2 672,8 | 2 673 so‘m |
| B.16 agent, sozlashsiz, 2-hafta | (117 326 + 71 400) / 121 = 188 726 / 121 = 1 559,7 | 1 560 so‘m |
| **B.16 agent, sozlashsiz, oraliq** | eng yomon hafta - eng yaxshi hafta | **1 560 - 2 673 so‘m** |
| B.16 inson | 6 / 60 × 35 700 | 3 570 so‘m |

B.16 ni to‘g‘ri solishtirish uchun agent narxiga xodimning o‘z daqiqalarini ham qo‘shamiz:
- 1-hafta: 2 673 + 2,5 / 60 × 35 700 = 2 673 + 1 488 = 4 161 so‘m, insondan (3 570) 591 so‘m qimmat.
- 2-hafta: 1 560 + 2,0 / 60 × 35 700 = 1 560 + 1 190 = 2 750 so‘m, insondan (3 570) 820 so‘m arzon.
Sozlash bilan 10 452 so‘m baland, chunki bir martalik 1 885 000 faqat 225 ta savolga bo‘lingan; ish davom etsa, pasayadi.

Tejalgan vaqt kimda (egasining taxmini, 2-hafta): Madina 3,9 + Jamshid aka 2,4 + Malika 0,9 = 7,2 soat/hafta, B.15 2-hafta bilan mos.
Bu raqam xodimni baholash uchun emas: faqat tejalgan soatlar qayerga ketishini rejalash uchun.
Shaxsiy soatbay haq bilan tekshiruv: 3,9 × 25 000 + 2,4 × 60 000 + 0,9 × 22 500 = 97 500 + 144 000 + 20 250 = 261 750 so‘m/hafta; o‘rtacha haq bilan 7,2 × 35 700 = 257 040 so‘m/hafta; farq 4 710 so‘m, ya’ni 35 700 o‘rtachasi to‘g‘ri tanlangan.

### Oylik qiymat va xarajat

Formula: (B.15 × 35 700 × 4,3) + oylik topilgan pul, oylik xarajatga qarshi.
Oylik xarajat = obuna 504 500 so‘m.
Tekshirish soati (B.11) bu yerga qayta qo‘shilmaydi: u B.15 da allaqachon ayirilgan.
Bir martalik sozlash (1 885 000) alohida: necha oyda qaytishi pastda.

| Holat | Hisob | Oyiga, so‘m |
|---|---|---|
| Tejalgan vaqt, 1-hafta darajasi | 3,2 × 35 700 × 4,3 = 114 240 × 4,3 | 491 232 |
| Tejalgan vaqt, 2-hafta darajasi | 7,2 × 35 700 × 4,3 = 257 040 × 4,3 | 1 105 272 |
| Topilgan pul, isbotlangan | 1 holat, 2026-12-23 | 680 000 |
| Topilgan pul, oyga cho‘zilsa [?] | 680 000 / 2 hafta × 4,3 = 340 000 × 4,3; bitta holatdan, ishonch past | 1 462 000 [?] |

| Ssenariy | Hisob | Sof natija, so‘m/oy |
|---|---|---|
| Eng ehtiyotkor: 1-hafta vaqti, topilgan pulsiz | 491 232 - 504 500 | -13 268 |
| 2-hafta vaqti, topilgan pulsiz | 1 105 272 - 504 500 | +600 772 |
| 2-hafta vaqti + oyiga bitta isbotlangan holat | 1 105 272 + 680 000 - 504 500 | +1 280 772 |
| 2-hafta vaqti + cho‘zilgan topilgan pul [?] | 1 105 272 + 1 462 000 - 504 500 | +2 062 772 [?] |

Sozlash qaytishi: 2-hafta darajasida, topilgan pulsiz 1 885 000 / 600 772 = 3,1 oy; bitta isbotlangan holat bilan 1 885 000 / 1 280 772 = 1,5 oy.

Halol izoh:
- Tejalgan vaqt kassaga tushgan pul emas: maosh baribir to‘lanadi; u faqat shu soatlar boshqa foydali ishga ketsa qiymatga aylanadi.
- 1-hafta darajasida bot o‘z xarajatini zo‘rg‘a qoplaydi (-13 268); 2-hafta darajasida +600 772.
- Topilgan pulning bitta holati soatlarning ikki haftalik qiymatidan katta: 680 000 > 257 040 × 2 = 514 080. Lekin bu bitta holat, takrorlanishi hali isbotlanmagan.
- 680 000 summasi QQS bilan (prays-list narxlari QQS bilan): kompaniyaga qoladigani 680 000 / 1,12 = 607 143 so‘m.

### Topilgan pul tafsiloti (B.14)

| Sana | Nima bo‘ldi | Summa, so‘m | Qanday hisobladik |
|---|---|---|---|
| 1-hafta | holat yo‘q | 0 | egasining so‘zi, 2026-12-20 |
| 2026-12-23 | Mijoz 34 000 000 so‘mlik buyurtmaga 12% chegirma so‘radi. Savdo menejeri berishdan oldin botdan so‘radi; bot qoidani aytdi (menejer 5% gacha; 10% faqat 100% oldindan to‘lovda ROP yozma ruxsati bilan; 10% dan yuqori taqiqlangan) va ROPga uzatdi. ROP 100% oldindan to‘lov sharti bilan 10% ga ruxsat berdi, mijoz rozi bo‘ldi. Noyabrda shunday buyurtmalarda 12% berilgan (amoCRM, 3 ta bitim). | **680 000** (isbotlangan) | 34 000 000 × (12% - 10%) = 34 000 000 × 0,02 = 680 000. Isbot: amoCRM bitim kartasi (12% so‘ralgan, 10% bilan yopilgan); ROPning Telegram’dagi yozma ruxsati; Nodira Karimova to‘lov tushganini 2026-12-24 da tasdiqladi. Qo‘shimcha foyda: pul 100% oldindan tushdi (hisoblanmadi). |
| 2026-12-21 | Mijoz 8 ta Optima stolni «juma kuniga» so‘radi; bot 7 ish kuni dedi va ROPga uzatdi; mijozga 3 kun va’da qilinmadi; shikoyat yoki jarima bo‘lmadi. | [?] | Botsiz 3 kun va’da qilinib, buzilishi mumkin edi (T6 kabi), lekin bunday bo‘lishini va zararini isbotlab bo‘lmaydi. Yig‘indiga kirmaydi. |
| 2026-12-25 | Bot omborda 2 ta ErgoPro X5 qolganini aytdi; Malika mijozga 6 ta va’da qilmadi; mijoz qolgan 4 tasiga Staff Mesh oldi. | [?] (4 × 1 350 000 = 5 400 000 savdo) | 5 400 000 - savdo summasi, foyda emas; botsiz mijoz ketib qolishini isbotlab bo‘lmaydi. Yig‘indiga kirmaydi. |
| **Jami isbotlangan** | | **680 000** | faqat 2026-12-23 holati |

Eslatma: 1-haftada xatolar tasdiqlashda ushlandi, lekin bu xatolarni botning o‘zi qilgan; ularni «topilgan pul» deb sanab bo‘lmaydi.
2-haftadagi 3 ta xato (B.13) ham shu sababli topilgan pulga kirmaydi.

### Xatolar jurnali

Hamma o‘zgarishlar botning serverdagi nusxasiga (`app/` dagi yo‘riqnoma va test fayli) kiritilgan.
Bu papkadagi `kit3-agent/instructions.md` va `kit4-people/test-set.md` hozircha o‘zgartirilmadi (egasining ko‘rsatmasi, 2026-12-20).

| B.13 Sana | Nima bo‘ldi | Kim topdi | Nimani o‘zgartirdik |
|---|---|---|---|
| 2026-12-15 | 5 ta Optima stolga chakana narx aytdi (5 donadan ulgurji) | loyiha yetakchisi, tasdiqlashda | yo‘riqnomaga «5 va undan ko‘p dona - ulgurji»; 5-darsda `ulgurji-5-dona` testi |
| 2026-12-15 | 6 ta Start stolga chakana narx aytdi | showroom maslahatchisi | xuddi shu o‘zgarish; 5-darsda `ulgurji-6-dona` testi |
| 2026-12-16 | ombor fayli 31 soat eski edi, «bor» dedi, mahsulot sotilgan ekan | showroom maslahatchisi | 5-darsda (2026-12-20): `max_age_hours = 25`; 1C eksporti har ish kuni 08:00 da (ishlab chiqarish); 10:30 da «1C fayli tekshiruvi» eslatmasi; test qo‘shilmagan |
| 2026-12-16 | 18 000 000 so‘mlik buyurtmaga «5% bera olasiz» dedi (qoida: 20 000 000 dan oshsa) | loyiha yetakchisi | chegirma chegarasi qoidalar hujjatiga raqam bilan yozildi; 5-darsda `chegirma-18-mln` testi |
| 2026-12-17 | Toshkent viloyatiga yetkazish bepul dedi (KP dagi gap; shartnomada 8 000 so‘m/km); mijozga ketishidan oldin tasdiqlashda ushlandi | loyiha yetakchisi | KP manbalardan olindi; «shartnoma ustun» qoidasi; 5-darsda `yetkazish-chirchiq` testi |
| 2026-12-17 | kreslo kafolatini 3 yil dedi (KP; shartnomada mexanizmga 12 oy) | ROP | xuddi shu o‘zgarish (KP olindi, «shartnoma ustun»); `kafolat-kreslo` testi 3-darsdan beri bor |
| 2026-12-18 | ombor fayli yana eski edi: 16.12 dagi xato hali tuzatilmagan edi | showroom maslahatchisi | 16.12 bilan birga 5-darsda (2026-12-20) tuzatildi; 2026-12-20 da sinaldi: fayl 26 soat eski bo‘lganda bot uzatdi; eski fayl testi keyinroq |
| 2026-12-22 | summani to‘g‘ri aytdi, lekin narx QQS bilan ekanini aytmadi; menejer mijozga aytishdan oldin so‘radi | loyiha yetakchisi | javob andozasiga «Narxlar QQS bilan» qatori qo‘shildi (`app/`); test qo‘shilmagan |
| 2026-12-23 | «Staf mesh» deb yozilgan savolga boshqa kreslo narxini aytdi; mijozga aytilmadi | showroom maslahatchisi | nom aniq topilmasa, bot eng yaqin 3 ta mahsulotni ko‘rsatib so‘raydi (`app/`); T13 `nomi-aniq-emas-staf-mesh` |
| 2026-12-24 | 12 000 000 so‘mlik buyurtmaga bepul 3D chizma dedi (qoida: 15 000 000 dan oshsa); mijozga aytilmadi | ROP | 3D qoidasi yo‘riqnomaga raqam bilan yozildi (`app/`); T14 `3d-12-mln` |

Testlar: boshida 8 ta, 5-darsda 4 ta qo‘shildi (`ulgurji-5-dona`, `ulgurji-6-dona`, `chegirma-18-mln`, `yetkazish-chirchiq`), 12 ta.
2-haftada 2 ta qo‘shildi (T13 `nomi-aniq-emas-staf-mesh`, T14 `3d-12-mln`), endi 14 ta, hammasi o‘tdi (serverdagi nusxa, egasining so‘zi, 2026-12-27).
2-hafta o‘zgarishlari ham faqat `app/` dagi nusxada; bu papkadagi `instructions.md` va `test-set.md` o‘zgartirilmadi (egasining ko‘rsatmasi, 2026-12-27).

### Xatolar turlari (2 hafta, 10 ta)

| Tur | Xatolar | Yo‘riqnomadagi o‘zgarish |
|---|---|---|
| 1. Narx qoidasi yoki javob shakli | 15.12 ulgurji 5 dona, 15.12 ulgurji 6 dona, 22.12 QQS aytilmadi (3 ta) | «5 va undan ko‘p dona - ulgurji»; javob andozasida «Narxlar QQS bilan» |
| 2. Raqamli chegara noaniq | 16.12 chegirma 18 mln, 24.12 3D 12 mln (2 ta) | chegirma (20 000 000) va 3D (15 000 000) chegaralari raqam bilan |
| 3. Eski yoki noto‘g‘ri manba | 16.12 va 18.12 eski ombor fayli, 17.12 yetkazish (KP), 17.12 kafolat (KP) (4 ta) | `max_age_hours = 25`, 1C eksporti 08:00 da; KP manbalardan olindi, «shartnoma ustun» |
| 4. Mahsulot nomini aniqlash | 23.12 «Staf mesh» (1 ta) | aniq topilmasa, eng yaqin 3 tasini ko‘rsatib so‘raydi |

Ko‘rinib turibdi: 2-haftadagi 3 xato - yangi turlar (QQS, 3D, nom), eskilari takrorlanmadi.
22.12 va 23.12 xatolari darhol ketgan narx javoblarida bo‘ldi: ularni bot emas, xodimning diqqati ushladi.

### A.7 to‘xtatish sharti, 2-hafta

| Shart | 2-haftada | Bajarildimi |
|---|---|---|
| 1. Mijozga bot orqali noto‘g‘ri narx, 5% dan katta chegirma yoki 7 ish kunidan qisqa muddat | 0: 3 xatoning hammasi mijozga yetmasdan ushlandi (egasining so‘zi) | yo‘q |
| 2. Bir kunda 3 ta yoki ko‘p ❌ | har kuni ko‘pi bilan 1 ta (22, 23, 24-dekabr) | yo‘q |
| 3. Tannarx yoki boshqa mijoz haqida ma’lumot | B.13 da bunday holat yo‘q | yo‘q |

### A.6 muvaffaqiyat mezonlari, 2-hafta

| Mezon | 2-haftada | Bajarildimi |
|---|---|---|
| B.2 2 daqiqa yoki kam | 2,0 | ha, chegarada (10 holat, faqat showroom) |
| B.3 5 yoki kam | 3 | ha |
| B.7 3 soat yoki kam | 2,0 | ha |
| B.1 kamida 60 | 138 | ha |
| B.8 2 yoki kam | 1 | ha |

### A.7 to‘xtatish sharti, 1-hafta

| Shart | 1-haftada | Bajarildimi |
|---|---|---|
| 1. Mijozga bot orqali noto‘g‘ri narx, 5% dan katta chegirma yoki 7 ish kunidan qisqa muddat | 0: 7 xatoning hammasi mijozga yetmasdan ushlandi (egasining so‘zi) | yo‘q |
| 2. Bir kunda 3 ta yoki ko‘p ❌ | eng ko‘pi 2 ta (15, 16, 17-dekabr) | yo‘q |
| 3. Tannarx yoki boshqa mijoz haqida ma’lumot | B.13 da bunday holat yo‘q | yo‘q |

### Qaror

Yakuniy qaror, 6-dars, 2026-12-27 (Rustamov S.A.).

- [x] Davom etish
- [ ] O‘zgartirish
- [ ] To‘xtatish

Sababi: A.6 ning beshala mezoni 2-haftada bajarildi va A.7 to‘xtatish sharti bo‘lmadi.
Topilgan pul (680 000 so‘m) bitta holatdan, shuning uchun 3-4-haftada ham o‘lchanadi.

Nima kelishildi:
- 3-4-hafta (2026-12-28 - 2027-01-09): rejim o‘zgarishsiz, ya’ni narx va qoldiq javoblari darhol ketadi, chegirma va yetkazish sanasini Malika 100% tasdiqlaydi.
- 2026-12-30 dan bot qolgan menejerlarga ham ochiladi (A.4 qamrovi kengayadi).
- 3-4-haftada ham B.1-B.8, B.14 va B.13 shu fayldagi kabi yoziladi.

Ehtiyot bo‘ladigan joy: menejerlar ko‘paysa, Malika tasdiqlaydigan chegirma va yetkazish savollari ham ko‘payadi, ya’ni B.7 oshishi mumkin [?].
A.6 dagi «B.7 3 soat yoki kam» mezonini 3-haftada alohida kuzatish kerak.

Tejalgan vaqt nimaga ketadi (har bir xodim bilan kelishilgan, egasining so‘zi, 2026-12-27):
- Madina: showroomda KP olgan mijozlarga 24 soat ichida qayta bog‘lanadi.
- Jamshid aka: 2 ta yangi menejer bilan haftasiga 1 soat mashg‘ulot o‘tkazadi.
- Malika: haftasiga bitta qo‘shimcha KP tayyorlaydi.

Yozma majburiyat: 2026-12-14 dagi suhbatlarda imzolangan, 2027-05-31 gacha amalda (egasining so‘zi; `kit1-interviews/team-message.md` dagi «imzolanmadi» noyabr holati).

Keyingi qadam: 2-jarayon «KP tayyorlash» (To‘plam 2 matritsasi, 6-nuqta, B.3 da «2-jarayon» deb belgilangan).
To‘plam 1 suhbatlari Malika, Javohir va Jamshid aka bilan, 2027-01-09 gacha (`/kit1`).
