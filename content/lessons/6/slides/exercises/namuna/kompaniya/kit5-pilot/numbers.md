# To‘plam 5 · B shakli: Sinov raqamlari

Praktikum 3.0 · Sinov va hisob-kitob · Fayl: `kit5-pilot/numbers.md`

«Baraka Office» MChJ: shartli misol, raqamlar usulni ko‘rsatish uchun.
Holat: 5-darsda, yakshanba 20-dekabr, 1-hafta ustuni to‘ldirildi.
Baraka sanalari yakshanba guruhiniki (5-dars 20-dekabr); shanba guruhida hammasi bir kun oldin (19-dekabr).
Bu kursning umumiy Baraka namunasi (6-darsdagi `kit5-pilot/numbers.md` bilan bir xil 1-hafta).
Bot sanagan qatorlar `/hafta` faylidan (`../../baraka-1-hafta/kit5-raqamlar-2026-12-20.md`), qolganlari qo‘lda, manbasi bilan.

- Jarayon: narx, qoldiq, chegirma va muddat savollariga javob (Savdo yordamchisi)
- Sinov sanalari: 2026-12-14 - 2026-12-26 (2 hafta, dushanba-shanba); 1-hafta 14-19.12
- Soatbay haq, so‘m: 35 700 (hisobi pastda)
- Loyiha yetakchisi: Malika Rashidova (`plan.md`)

| Ko‘rsatkich | Agentgacha | 1-hafta | 2-hafta | 3-hafta | 4-hafta | O‘zgarish |
|---|---|---|---|---|---|---|
| B.1 Bajarilgan so‘rovlar | 120 | 132 |   |   |   |   |
| B.2 O‘rtacha vaqt, daqiqa | 6 | 2,5 |   |   |   |   |
| B.3 Xato javoblar | 9 | 7 |   |   |   |   |
| B.4 Takroriy so‘rovlar | 15 | 12 |   |   |   |   |
| B.5 To‘liq hal qilingan so‘rovlar | 100 | 104 |   |   |   |   |
| B.6 Yakunlangan bitimlar yoki buyurtmalar | - | - |   |   |   |   |
| B.7 Xodimning tekshirishga sarflagan vaqti, soat | 0 | 4,5 |   |   |   |   |
| B.14 Topilgan pul, so‘m | 0 | 0 |   |   |   |   |
| B.8 Mijoz shikoyatlari | 2 | 2 |   |   |   |   |

B.2 - bitta so‘rovga odam sarflagan daqiqa, tekshirishsiz (tekshirish B.7 da).
B.14 - oldi olingan xato, yo‘qolmagan so‘rov, tezroq tushgan pul.

### Xarajatlar

| Xarajat | So‘m |
|---|---|
| B.9 Obuna | 116 722 (1-hafta) |
| B.10 Integratsiya va sozlash | 0 (6-darsda qayta ko‘riladi) |
| B.11 Tekshirish soati x soatbay haq | 160 650 (1-hafta) |
| B.12 Jami | 277 372 (1-hafta) |

### Natija

| Ko‘rsatkich | Hisob | Natija |
|---|---|---|
| B.15 Tejalgan vaqt, soat/hafta | (B.2 agentgacha - B.2 sinovda) x B.1 / 60 - B.7 | 1-hafta: 3,2 |
| B.16 Bitta bajarilgan ish narxi: agent / inson | agent: B.12 / B.5 yig‘indisi; inson: B.2 agentgacha / 60 x soatbay haq | 1-hafta: 2 667 / 3 570 |

### Topilgan pul tafsiloti (B.14)

| Sana | Nima bo‘ldi | Summa, so‘m | Qanday hisobladik |
|---|---|---|---|
| 14-19.12 | Isbotlangan holat yo‘q | 0 | Jamshid aka va menejerlar bilan ko‘rib chiqildi: pul saqlab qolingan, hujjat bilan tasdiqlanadigan holat topilmadi |
|   |   |   |   |

### Xatolar jurnali

| B.13 Sana | Nima bo‘ldi | Kim topdi | Nimani o‘zgartirdik |
|---|---|---|---|
| 15.12 | «Optima stolidan 5 ta»: chakana narx (2 150 000 x 5 = 10 750 000); 5 donadan ulgurji narx (1 890 000) bo‘lishi kerak edi | Malika | Yo‘riqnoma B.4: «5 va undan ko‘p dona - ulgurji; 5 dona ham ulgurji»; namuna; T9 (test ulgurji-5-dona) |
| 15.12 | «Start stoli 6 ta»: chakana narx (1 450 000 x 6 = 8 700 000); 6 dona - ulgurji narx (1 280 000) kerak edi | Madina | Xuddi shu o‘zgarish; T10 (test ulgurji-6-dona); testlar qayta o‘tdi |
| 16.12 | «ErgoPro omborda bormi?» - «Ha, omborda bor (1C)»; ombor fayli 31 soat eski edi, mahsulot sotilgan ekan | Madina | sources.toml: max_age_hours = 25; Otabek aka bilan har ish kuni 08:00 eksport; 10:30 da «1C fayli tekshiruvi» ishi |
| 16.12 | «18 mln lik buyurtmaga chegirma bera olamanmi?» - «Ha, 5% gacha»; qoida: 20 000 000 so‘mdan oshsa, 18 mln da chegirma yo‘q | Malika | examples.md: 18 mln namunasi (chegirma 20 000 000 dan); T11 (test chegirma-18-mln) |
| 17.12 | «Chirchiqqa yetkazish bepulmi?» - «Ha, Toshkent viloyatiga bepul»; KP dagi gap, shartnomada 8 000 so‘m/km; mijozga ketishidan oldin tasdiqlashda ushlandi | Malika | KP manbalardan olindi; memory.md: shartlar faqat qoidalar hujjatidan (shartnoma ustun); T12 (test yetkazish-chirchiq) |
| 17.12 | «Kreslo kafolati qancha?» - «Barcha kreslolarga 3 yil kafolat»; KP dagi gap, shartnomada mexanizmga 12 oy | Jamshid aka | Xuddi shu o‘zgarish; T7 (kafolat-kreslo) testi 3-darsdan beri bor edi, endi har o‘zgarishdan keyin ishga tushiriladi |
| 18.12 | «Senator kreslo omborda bormi?» - «Ha, bor (1C)»; ombor fayli yana eski edi | Madina | 16.12 dagi bilan bitta tuzatish |

### Qaror

- [ ] Davom etish
- [ ] O‘zgartirish
- [ ] To‘xtatish

Sababi: 6-darsda.

### Ruxsatlar (5-darsdagi qaror)

1-hafta (`REPLY_MODE=approve`): Malika har bir qoralamani mijozga ketishidan oldin tasdiqladi, har kuni 17:30 da ❌ larni ko‘rdi.
2-haftadan qisman to‘g‘ridan-to‘g‘ri: narx va qoldiq javoblari to‘g‘ridan-to‘g‘ri ketadi; chegirma va yetkazish muddati javoblarini Malika avvalgidek 100% tasdiqlaydi.
Sababi: 1-hafta raqamlari 4-darsdagi A.6 maqsadlariga yetmadi, lekin 7 xatoning hammasi mijozga yetmasdan ushlandi (A.5 dagi variant).
Sozlama: `.env` da `REPLY_MODE=topics`, `agent/approval.toml` da `direct_topics = ["narx", "qoldiq"]` (telefondan: `/darhol narx qoldiq`).
Tender, 5% dan katta chegirma, tez yetkazish va eski ombor fayli - avvalgidek ROPga uzatiladi.
Kelishildi: Jamshid Karimov (ROP), 20.12.2026.

## Hisoblar

Soatbay haq: oklad / 200 soat (Baraka ichki tartibi: dushanba-juma 8 soat, shanba 6 soat = haftasiga 46 soat x 4,3 ≈ 200).
Madina 5 000 000 / 200 = 25 000; Malika 4 500 000 / 200 = 22 500; Jamshid aka 12 000 000 / 200 = 60 000.
Kuniga Madina 12, Malika 5, Jamshid aka 8 ta savolga javob beradi: (12 x 25 000 + 5 x 22 500 + 8 x 60 000) / 25 = 35 700 so‘m.

- B.1 = 132: bot jurnali, 14-19.12 (`/hafta`, 20.12 soat 10:20).
  Agentgachadan 12 ta ko‘p: bot bilan so‘rash oson bo‘ldi; takroriy so‘rovlar 15 dan 12 ga tushdi (B.4).
  Bir xil ish o‘lchanmoqda: savdo bo‘limining narx, qoldiq, chegirma va muddat savollari.
- B.2 = 2,5: Madina 10 ta holatni soat bilan o‘lchadi (savolni botga yozish va javobni mijozga aytish), tekshirishsiz; tekshirish B.7 da.
- B.3 = 7: bot jurnali (❌ bosilgan yoki tasdiqlashda tuzatilgan javoblar) = xatolar jurnalidagi 7 qator.
  Yettalasi ham mijozga ketmasdan ushlangan (17.12 Chirchiq xatosini Malika tasdiqlashda ushladi).
- B.4 = 12: savdo guruhi Telegram yozishmasi, 14-19.12, bir mijoz bo‘yicha qayta so‘ralgan savollar.
- B.5 = 104: bot jurnali (javob berilgan 111 tadan 7 tasi ❌; 21 tasi odamga uzatilgan).
- B.6: bu jarayon bitimni bevosita yopmaydi, o‘lchanmaydi.
- B.7 agentgacha = 0: agent ishini tekshirish agentgacha yo‘q edi (To‘plam 5 skilli: «B.7 va B.14 agentgacha 0»).
- B.7 = 4,5: Malika har bir qoralamani tasdiqladi va har kuni 17:30 da ❌ larni ko‘rdi (taxminan 2,5 soat); Jamshid aka uzatishlarni va jurnalni ko‘rdi (taxminan 2 soat).
- B.8 = 2: Telegram va amoCRM «shikoyat» tegi; ikkala shikoyat ham sinovgacha berilgan muddat va’dasi haqida.
- B.14 = 0: isbotlangan holat yo‘q (pastdagi jadval).
- B.9 = 46 512 (server 200 000 / 4,3) + 62 209 (Claude Pro 20 $ + 12% QQS = 267 500 / 4,3) + 8 001 (OpenRouter paneli: 1-hafta $0,67 x 11 941,65, MB kursi 03.11.2026) = 116 722.
  6-darsda ikki haftalik panel (1,45 $, sinfdagi `pilot eval` lar bilan) bo‘yicha oylik obuna 504 500 so‘m bo‘ladi.
- B.10 = 0 hozircha: sozlash soatlari (egasi va yordamchisi) 6-darsda qo‘shiladi.
- B.11 = 4,5 x 35 700 = 160 650.
- B.12 = 116 722 + 0 + 160 650 = 277 372.
- B.15 = (6 - 2,5) x 132 / 60 - 4,5 = 7,7 - 4,5 = 3,2 soat/hafta.
- B.16 agent = 277 372 / 104 = 2 667 so‘m; inson = 6 / 60 x 35 700 = 3 570 so‘m.
  Tekshirish (B.11) xarajatning 58 foizi.
