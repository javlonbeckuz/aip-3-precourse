# To‘plam 5 · B shakli: Sinov raqamlari

Praktikum 3.0 · Sinov va hisob-kitob · Fayl: `kit5-pilot/numbers.md`

- Jarayon: narx, qoldiq, chegirma va muddat savollariga javob, savdo bo‘limi (To‘plam 2, B.1); agent: «Savdo yordamchisi» boti
- Sinov sanalari: 2026-12-14 - 2026-12-26 (2 hafta, haftasiga 6 ish kuni); 6-dars 2026-12-27
- Soatbay haq, so‘m: 35 700 (CLAUDE.md: kim javob berishiga qarab vaznli o‘rtacha, 892 500 / 25 = 35 700)
- To‘ldirildi: 1-hafta, 2026-12-20

| Ko‘rsatkich | Agentgacha | 1-hafta | 2-hafta | 3-hafta | 4-hafta | O‘zgarish (hozircha 1-hafta) |
|---|---|---|---|---|---|---|
| B.1 Bajarilgan so‘rovlar | 120 | 132 | | | | +12 (+10,0%) |
| B.2 O‘rtacha vaqt, daqiqa | 6 | 2,5 | | | | -3,5 (-58,3%) |
| B.3 Xato javoblar | 9 | 7 | | | | -2 (-22,2%) |
| B.4 Takroriy so‘rovlar | 15 | 12 | | | | -3 (-20,0%) |
| B.5 To‘liq hal qilingan so‘rovlar | 100 | 104 | | | | +4 (+4,0%) |
| B.6 Yakunlangan bitimlar yoki buyurtmalar | [?] | [?] | | | | - |
| B.7 Xodimning tekshirishga sarflagan vaqti, soat | 0 | 4,5 | | | | +4,5 (foiz yo‘q: agentgacha 0) |
| B.14 Topilgan pul, so‘m | 0 | 0 | | | | 0 |
| B.8 Mijoz shikoyatlari | 2 | 2 | | | | 0 (0,0%) |

B.2 - bitta so‘rovga odam sarflagan daqiqa, tekshirishsiz (tekshirish B.7 da).
B.14 - oldi olingan xato, yo‘qolmagan so‘rov, tezroq tushgan pul.
1-hafta to‘liq tasdiqlash haftasi edi (`REPLY_MODE=approve`): A.6 mezonlari 2-hafta oxirida baholanadi.

## Hisoblar

Manba, agar boshqasi yozilmagan bo‘lsa: botning haftalik fayli (`/hafta`, 2026-12-20), davr 2026-12-14 - 2026-12-19.
Agentgacha ustuni: `kit5-pilot/baseline.md` (2026-11-02 - 2026-11-28 tarix va 2026-11-30 - 2026-12-04 jonli o‘lchov).

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

| Xarajat | Hisob | So‘m (1-hafta holatiga) |
|---|---|---|
| B.9 Obuna | 504 500 / 4,3 = 117 326 so‘m/hafta × 1 hafta | 117 326 |
| B.10 Integratsiya va sozlash (bir martalik) | egasi 14 soat × 125 000 (25 000 000 / 200) = 1 750 000; IT-administrator 3 soat × 45 000 (9 000 000 / 200) = 135 000; 1 750 000 + 135 000 | 1 885 000 |
| B.11 Tekshirish soati x soatbay haq | 4,5 × 35 700 | 160 650 |
| B.12 Jami | 117 326 + 1 885 000 + 160 650 | 2 162 976 |

Izoh: B.11 CLAUDE.md dagi o‘rtacha 35 700 bilan hisoblangan.
Tekshirishni asosan savdo menejeri va ROP qilgani uchun ularning o‘z soatbay haqi bilan 2,5 × 22 500 + 2 × 60 000 = 56 250 + 120 000 = 176 250 so‘m bo‘lardi (15 600 so‘m ko‘p).
6-darsda B.11 va B.12 ikkala hafta yig‘indisi bilan qayta hisoblanadi.

### Natija

1-hafta bo‘yicha oraliq raqam; yakuniy oraliq (eng yomon va eng yaxshi hafta) 2-haftadan keyin.

| Ko‘rsatkich | Hisob | Natija |
|---|---|---|
| B.15 Tejalgan vaqt, soat/hafta | (6 - 2,5) × 132 / 60 - (4,5 - 0) = 3,5 × 132 / 60 - 4,5 = 462 / 60 - 4,5 = 7,7 - 4,5 | 3,2 soat/hafta (1-hafta) |
| B.16 Bitta bajarilgan ish narxi: agent | B.12 / B.5 = 2 162 976 / 104 = 20 797,9 | 20 798 so‘m (sozlash bilan, 1-hafta) |
| B.16 agent, sozlashsiz (ma’lumot uchun) | (117 326 + 160 650) / 104 = 277 976 / 104 = 2 672,8 | 2 673 so‘m |
| B.16 inson | 6 / 60 × 35 700 | 3 570 so‘m |

B.16 agent 1-haftada baland, chunki bir martalik sozlashning hammasi (1 885 000) bitta haftaga tushgan; har haftadan keyin pasayadi.
Sozlashsiz ham 2 673 so‘m ichida faqat bot va tekshirish bor, xodimning 2,5 daqiqasi yo‘q: 2,5 / 60 × 35 700 = 1 488 so‘m qo‘shilsa, 4 161 so‘m, ya’ni insondan (3 570) hali qimmat.
Asosiy sabab B.7 (4,5 soat): 2-haftada narx va qoldiq tasdiqsiz ketgach, u tushishi kutiladi.

### Topilgan pul tafsiloti (B.14)

| Sana | Nima bo‘ldi | Summa, so‘m | Qanday hisobladik |
|---|---|---|---|
| 1-hafta | holat yo‘q | 0 | egasining so‘zi, 2026-12-20 |

Eslatma: 1-haftada xatolar tasdiqlashda ushlandi, lekin bu xatolarni botning o‘zi qilgan; ularni «topilgan pul» deb sanab bo‘lmaydi.

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

Testlar: boshida 8 ta, 5-darsda 4 ta qo‘shildi (`ulgurji-5-dona`, `ulgurji-6-dona`, `chegirma-18-mln`, `yetkazish-chirchiq`), endi 12 ta, hammasi o‘tdi (serverdagi nusxa, egasining so‘zi).

### A.7 to‘xtatish sharti, 1-hafta

| Shart | 1-haftada | Bajarildimi |
|---|---|---|
| 1. Mijozga bot orqali noto‘g‘ri narx, 5% dan katta chegirma yoki 7 ish kunidan qisqa muddat | 0: 7 xatoning hammasi mijozga yetmasdan ushlandi (egasining so‘zi) | yo‘q |
| 2. Bir kunda 3 ta yoki ko‘p ❌ | eng ko‘pi 2 ta (15, 16, 17-dekabr) | yo‘q |
| 3. Tannarx yoki boshqa mijoz haqida ma’lumot | B.13 da bunday holat yo‘q | yo‘q |

### Qaror

1-hafta: oraliq; yakuniy qaror 6-darsda (2026-12-27).

- [ ] Davom etish
- [ ] O‘zgartirish
- [ ] To‘xtatish

Sababi:
