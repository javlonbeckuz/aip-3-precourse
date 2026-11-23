# To‘plam 1 · B shakli: Vazifalar ro‘yxati

Praktikum 3.0 · Ish qayerga ketyapti? · Fayl: `kit1-interviews/jamshid-form-b.md`

- Xodim: Jamshid Karimov (B02)
- Lavozim: savdo bo‘limi rahbari (ROP)
- Bo‘lim: savdo
- Sana: 2026-11-25 (suhbat), B shakli 2026-11-26 da tuzildi
- Xodim ko‘rib chiqdi: 

| B.1 Vazifa (fe’l bilan) | B.2 Haftasiga necha marta | B.3 Har safar, daqiqa | B.4 Haftalik vaqt, soat | B.5 Ma’lumot qayerdan keladi | B.6 Natija kimga yoki qayerga yuboriladi | B.7 Qoida Q / Fikr F | B.8 Xatoning narxi | B.9 Ertaga A/R/I/B |
|---|---|---|---|---|---|---|---|---|
| 1. Menejerlar bilan planyorka o‘tkazish | 6 (kuniga 1 × 6 kun) | 15 | 1,5 (6 × 15 / 60) | [?] | menejerlar | F | past | I: jamoani boshqarish odamning ishi |
| 2. Telegramda narx, chegirma, ombor qoldig‘i va muddat haqidagi savollarga javob berish | 150 [?] (kuniga 25 × 6 kun; 20-30) | 2,5 [?] (2-3) | 6,3 [?] (150 × 2,5 / 60) | prays-list (narxlar.csv), qoidalar.md, 1C ombor qoldig‘i | menejerlar va call-markaz, Telegram | Q | yuqori | B: agent javob tayyorlaydi; 5% dan katta chegirmani ROP hal qiladi |
| 3. Katta KPlarni yuborishdan oldin tekshirish | 12,5 [?] (10-15) | 15 | 3,1 [?] (12,5 × 15 / 60) | menejer tuzgan KP, prays-list | menejer orqali mijozga [?] | Q | yuqori | B: agent narx, ulgurji/chakana va QQSni tekshiradi; ROP tasdiqlaydi |
| 4. Direktorga kunlik savdo hisobotini tayyorlash | 6 (kuniga 1 × 6 kun) | 60 [?] («bir soatcha») | 6,0 [?] (6 × 60 / 60) | amoCRM | direktor, Excel | Q | o‘rta | B: agent hisobotni yig‘adi; har bir menejer savdosi ko‘ringani uchun ROP tekshiradi |
| 5. Katta tenderlar va qiyin mijozlar bilan muzokara olib borish | [?] | [?] | [?] | [?] | mijoz | F | yuqori | I: tajriba va mulohaza kerak |
| **Haftasiga jami soat** |   |   | **16,9 [?]** (1,5 + 6,3 + 3,1 + 6,0) + 5-vazifa [?] |   |   |   |   |   |

B.4 = B.2 x B.3 / 60.
B.7: Q - aniq qoida; F - tajriba va mulohaza talab qiladigan ish.
B.8: past, o‘rta, yuqori.
B.9: A agent, R robot, I inson, B birga.
[?] - taxmin: xodim bilan tekshiring.

Jami tekshiruvi: 1,5 + 6,3 = 7,8; 7,8 + 3,1 = 10,9; 10,9 + 6,0 = 16,9.
Yaxlitlanmagan holda: 1,5 + 6,25 + 3,125 + 6,0 = 16,875 ≈ 16,9.
Jamiga 5-vazifa va bo‘linib ketgan ishga qayta kirishish vaqti kirmagan.
B.9 ni egasi tasdiqladi (2026-11-26); 4-vazifa egasi qarori bilan R → B.

## Raqamlar tekshiruvi

| № | Matndan iqtibos | Qanday tushunildi | Holat | Izoh |
|---|---|---|---|---|
| 1 | «sakkiz yarimda kelaman» | 08:30 da keladi | aniq | kelish vaqti, hisobga kirmaydi |
| 2 | «To‘qqizda ... o‘n besh daqiqalik planyorka, har kuni» | kuniga 15 daqiqa, 6 kun | tasdiqlandi (egasi) | shanba kuni ham o‘tadi |
| 3 | «Kuniga yigirma-o‘ttizta savol» | kuniga 20-30, hisobga 25 | tasdiqlandi (egasi), oraliq [?] | audioda shunday; aniq sonni xodim aytadi |
| 4 | «har biriga ikki-uch daqiqa» | 2-3 daqiqa, hisobga 2,5 | tasdiqlandi (egasi), oraliq [?] | ishning bo‘linishi bu raqamga kirmagan |
| 5 | «5% bersam bo‘ladimi?» | savolga misol | - | miqdor emas |
| 6 | «menejer 5% gacha, men 10% gacha» | prays-listdagi qoida | aniq | qoidalar.md bilan mos |
| 7 | «o‘ttiz-qirq millionlik buyurtmada» | 30 000 000-40 000 000 so‘m | tasdiqlandi (egasi) | og‘zaki qoida, egasi to‘xtatdi |
| 8 | «o‘n ikki-o‘n besh foizgacha» | buyurtma summasidan 12-15% chegirma | tasdiqlandi (egasi) | og‘zaki qoida, egasi to‘xtatdi; qoidalarda 10% dan yuqori taqiqlangan |
| 9 | «uch ish kunida yetkazamiz» | mijozga 3 ish kuni va’dasi | tasdiqlandi (egasi) | og‘zaki qoida, egasi to‘xtatdi; amaldagisi 7 ish kuni |
| 10 | «Zavod ba’zan yetti kunda chiqaradi» | 7 kun | aniq | qoidalardagi 7 ish kuniga mos |
| 11 | «haftasiga o‘n-o‘n beshta» KP | haftasiga 10-15, hisobga 12,5 | tasdiqlandi (egasi), oraliq [?] | aniq sonni xodim aytadi |
| 12 | «har biriga o‘n besh daqiqa» | KP uchun 15 daqiqa | aniq | - |
| 13 | «QQSni ikki marta qo‘shish» | xato turi | - | miqdor emas |
| 14 | «Har kuni kechqurun ... hisobot» | kuniga 1 marta, 6 kun | tasdiqlandi (egasi) | shanba kuni ham qilinadi |
| 15 | «bir soatcha ketadi» | taxminan 60 daqiqa | tasdiqlandi (egasi), taxmin [?] | «bir ... -cha» = taxminan |

## Kuzatuvlar

- Telegramdagi savollarning ko‘pi bir xil (narx, chegirma, qoldiq, yetkazish). Javoblari prays-list, qoidalar.md va 1C qoldig‘ida bor.
- Menejerlar va call-markaz javobni ROP dan kutib turadi. ROP ning ishi esa kun bo‘yi bo‘linadi; buning vaqti hisoblanmagan.
- Og‘zaki qoidalar (30-40 mln buyurtmaga 12-15% chegirma, 3 ish kunida yetkazish) yozma qoidalardan farq qilardi. Egasi 2026-11-26 da yozma qoidani amaldagi deb tasdiqladi: menejer 5% gacha, ROP 10% gacha, yetkazish 7 ish kuni. Agent yo‘riqnomasi faqat qoidalar.md ga tayanishi kerak.
- KP tekshiruvida takrorlanadigan xatolar: eski prays, ulgurji o‘rniga chakana narx, QQSni ikki marta qo‘shish (qoidalar.md: narxlar QQS 12% bilan). Bularning hammasi qoida bo‘yicha tekshiriladi.
- Kunlik hisobot har kuni amoCRM dan Excelga bir xil tartibda qo‘lda yig‘iladi.

## Xodimdan so‘rash kerak

1. Telegramda kuniga o‘rtacha nechta savol keladi: 20 ga yaqinmi yoki 30 ga? Shanba kuni ham shunchami?
2. Bitta savolga javob berish 2 daqiqa oladimi yoki 3? Savoldan keyin oldingi ishga qaytish uchun qancha vaqt ketadi?
3. Haftasiga nechta KP tekshirasiz: 10 ga yaqinmi yoki 15 ga?
4. Tekshirilgan KP ni mijozga kim yuboradi: menejermi yoki o‘zingizmi?
5. Kunlik hisobotga aniq qancha vaqt ketadi: 60 daqiqami yoki boshqa?
6. Planyorkada qaysi ma’lumotdan foydalanasiz (amoCRM, hisobot, boshqa)?
7. Tenderlar va qiyin muzokaralar haftasiga necha marta bo‘ladi va har biriga qancha vaqt ketadi?
8. Tender va muzokaralar uchun ma’lumotni qayerdan olasiz?
