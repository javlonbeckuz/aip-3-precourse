# To‘plam 3 · A shakli: Jarayon qadamlari: bugun va ertaga

Praktikum 3.0 · Ishni qayta taqsimlash · Fayl: `kit3-agent/form-a-steps.md`

«Baraka Office» MChJ: shartli misol, raqamlar usulni ko‘rsatish uchun.
To‘ldirildi: 3-dars, 2026-12-06, mentor bilan (namunadagi sanalar yakshanba guruhi bo‘yicha; shanba guruhida hammasi bir kun oldin).
Real holat bilan tekshirildi: 2026-12-01 (seshanba) Madina Sattorovaga (showroom maslahatchisi) kelgan savol, pastda.

- Jarayon: narx, qoldiq, chegirma va muddat savollariga javob (To‘plam 2, B.1)
- Boshlanadi: mijoz Telegram, Instagram yoki telefonda narx, qoldiq, chegirma yoki muddat haqida so‘raydi
- Tugaydi: mijozga to‘g‘ri javob ketdi yoki savol mas’ul odamga o‘tdi
- Jarayon egasi: Jamshid Karimov, savdo bo‘limi rahbari (ROP)

| # | A.1 Qadam (bitta harakat) | A.2 Ma’lumot | A.3 Bugun: kim | A.4 Ertaga A / R / I | A.5 Kim tekshiradi | A.6 Kim qaror qiladi | A.7 Kim javobgar | A.8 Izoh: kutish, xatolar |
|---|---|---|---|---|---|---|---|---|
| 1 | Mijoz savolini aniqlashtirish: qaysi mahsulot, necha dona, qachonga kerak | mijoz xabari yoki qo‘ng‘irog‘i | call-markaz (Zarina, Sevara), showroom (Madina), savdo menejerlari | I | savolni olgan xodim: mijozga qaytarib aytib tasdiqlatadi | savolni olgan xodim | Jamshid aka | Haftasiga taxminan 120 savol, bittasiga o‘rtacha 6 daqiqa (boshlang‘ich raqamlar, `kit5-pilot/baseline.md`); ko‘pi Telegram’da |
| 2 | Savolni Savdo yordamchisiga yozish | aniqlashtirilgan savol | yo‘q (bugun Otabek akaga yoki Jamshid akaga yoziladi) | I | savolni olgan xodim: savol to‘liq yozilganini ko‘radi | savolni olgan xodim | Jamshid aka | Bugun javob kutish 15-40 daqiqa |
| 3 | Mahsulotni prays-listdan topish va narxni aytish: 1-4 dona chakana, 5+ dona ulgurji | prays-list 2026 (CSV eksport) | operator va menejerlar, 14 sahifalik PDF’dan | A | operator yoki menejer: mijozga aytishdan oldin o‘qiydi | operator yoki menejer | Jamshid aka | PDF’da qidirish 3-5 daqiqa; ulgurji narx 5 donadan, tez-tez adashiladi |
| 4 | Buyurtma summasini hisoblash va hisobni bir qatorda ko‘rsatish (narx x dona) | 3-qadamdagi narx, dona soni | operator va menejerlar, kalkulyatorda | A | operator yoki menejer: hisob qatorini tekshiradi | operator yoki menejer | Jamshid aka | Haftasiga 1-2 hisob xatosi [?] |
| 5 | Ombor qoldig‘ini aytish: tayyor mahsulot soni, 1C fayli sanasi bilan | 1C eksport (fayl, har kuni 08:00) | Otabek aka, Telegram’da so‘rashadi | A | operator yoki menejer: fayl sanasini ko‘radi | Otabek aka (fayl eski bo‘lsa) | Otabek aka | Kun ichida sotilgan mebel faylda «bor» ko‘rinadi |
| 6 | Chegirma so‘ralsa, vakolatni aytish: 20 mln so‘mdan oshsa 5% gacha menejer o‘zi | chegirma qoidalari (hujjat) | menejer o‘zi yoki Jamshid akadan so‘raydi | A | Jamshid aka: haftasiga bir marta ish jurnalini ko‘radi | Jamshid aka (5% dan yuqori) | Jamshid aka | Intervyuda «12-15% bemalol» degan gap bor edi; qoida 5% / 10% |
| 7 | 5% dan katta chegirma, tender yoki 150 mln so‘mdan katta buyurtmani hal qilish | mijoz talabi, buyurtma summasi | Jamshid aka | I | Rustamov S.A. (10% dan yuqori bo‘lsa) | Jamshid aka | Jamshid aka | Agent bu holatni o‘zi yechmaydi, Jamshid akaga uzatadi |
| 8 | Yetkazish muddati, to‘lov va kafolatni aytish | qoidalar hujjati, namunaviy shartnoma | menejer xotiradan | A | operator yoki menejer: mijozga aytishdan oldin o‘qiydi | Jamshid aka (7 ish kunidan tez so‘ralsa, Otabek aka bilan) | Jamshid aka | Sotuvchilar «3 kunda» degan; shartnomada 7 ish kuni |
| 9 | Javobni mijozga yuborish yoki telefonda aytish | 3-8-qadam natijasi | operator yoki menejer | I | operator yoki menejer o‘zi | operator yoki menejer | Jamshid aka | Agent mijozga o‘zi yozmaydi |
| 10 | Noto‘g‘ri javobni ❌ bilan belgilash va nima xatoligini yozish | agent javobi | yo‘q | I | Jamshid aka: haftalik ko‘rib chiqishda | Jamshid aka (yo‘riqnomani o‘zgartirish) | Jamshid aka | Bu yozuvlar To‘plam 5, B.13 xatolar jurnaliga tushadi |

A.4: A agent, R robot, I inson.
Agent hech qachon o‘z qadamini o‘zi tekshirmaydi.

Hisob: 10 qadam; 5 tasi agentga (3, 4, 5, 6, 8), 5 tasi odamda (1, 2, 7, 9, 10).
Agent qadamlarining har birini odam tekshiradi (A.5).

## Real holat bilan tekshiruv (2026-12-01)

Madinaga Telegram’da yozishdi: «Optima stoldan 8 ta kerak, qancha bo‘ladi, omborda bormi, juma kuniga keltira olasizlarmi?»

| Bugun nima bo‘ldi | Qaysi qadam |
|---|---|
| Madina savolni qayta so‘radi: «140 lik stolmi, Optima?» | 1 |
| Prays-list PDF’idan Optima’ni topdi, 4 daqiqa | 3 |
| Chakana narx bilan hisobladi: 2 150 000 x 8 = 17 200 000 so‘m (xato: 8 dona ulgurji) | 3, 4 |
| Otabek akaga (logistika) yozdi, 25 daqiqa javob kutdi: «12 ta bor» | 5 |
| «Juma kuniga» so‘raldi: menejer Malika Rashidovadan so‘radi, u «3 kunda bo‘ladi» dedi | 8 |
| Mijozga javob ketdi: 17 200 000 so‘m va «3 kunda» | 9 |

Topilgan narsalar:

- Ikki xato bir savolda: ulgurji narx o‘rniga chakana (2 080 000 so‘m ortiqcha: 17 200 000 - 15 120 000) va shartnomaga zid muddat.
- Qoralamada «7 ish kunidan tez so‘ralsa kim qaror qiladi» yozilmagan edi: 8-qadamning A.6 ustuniga qo‘shildi.
- 2-qadam (savolni yordamchiga yozish) birinchi qoralamada yo‘q edi: real holatni o‘tib chiqqanda qo‘shildi.

## Nega shunday yozildi (izohlar)

| Qator | Izoh |
|---|---|
| Sarlavha | «Boshlanadi» va «Tugaydi» aniq bo‘lsa, jarayon chegarasi aniq: KP tayyorlash bu jarayonga kirmaydi (To‘plam 2, B.3). |
| 1 | Savolni aniqlashtirish odamda qoladi: mijoz bilan gaplashish sotuvchining asosiy ishi. |
| 2 | Yangi qadam: ertaga paydo bo‘ladi. Bugun bu qadam o‘rnida «Otabek akaga yozish va kutish» bor. |
| 3-6, 8 | Qoidasi aniq (B.7 = Q, To‘plam 1) va manbasi bor: shuning uchun A. Har birida A.5 da odam bor. |
| 4 | [?] belgisi: «haftasiga 1-2 xato» taxmin, Madina bilan aniqlanadi. Raqamni to‘qimaymiz. |
| 5 | A.7 Otabek aka: fayl yangiligi uning ishi. Agent eski fayldan javob bermaydi, odamga uzatadi. |
| 6, 7 | Pulga tegadigan joy ikkiga bo‘lindi: 5% gacha agent aytadi, undan yuqorisi faqat odam. |
| 9 | Mijozga yuborish odamda: To‘plam 2, B.3 «agent mijozga o‘zi yozmaydi». |
| 10 | Yangi qadam: xatoni kim belgilaydi. Bu bo‘lmasa, To‘plam 5 da xatolar jurnali bo‘sh qoladi. |
