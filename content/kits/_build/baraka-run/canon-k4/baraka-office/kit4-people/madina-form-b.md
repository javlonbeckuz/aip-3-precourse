# To‘plam 4 · B shakli: Mashg‘ulot vazifasi

Praktikum 3.0 · Xodimlarni yangi rolga tayyorlash · Fayl: `kit4-people/madina-form-b.md`

«Baraka Office» MChJ: shartli misol, raqamlar usulni ko‘rsatish uchun.

- Xodim: Madina Sattorova, showroom maslahatchisi (yozma rozilik: 2026-12-12)
- Menejer: Jamshid Karimov, savdo bo‘limi rahbari (ROP); mashqni olib boradi: Malika Rashidova, loyiha yetakchisi
- Sana: 2026-12-13

### B.1 Nimani tekshiradi (qanday natijani)

Savdo yordamchisi (bot) tayyorlagan narx, qoldiq va muddat javobini - mijozga aytishdan oldin.
Kuniga taxminan 12 ta javob (Jamshid aka kuzatuvi; Madina suhbatda tasdiqlaydi).
To‘plam 3 dagi 3, 4, 5 va 8-qadamlar natijasi.

### B.2 Nega aynan shu xodim: qaysi qobiliyati kerak

Mijozning chalkash savolidan aniq ehtiyojni ajratadi.
2026-12-01: «Optima’dan 8 ta» degan mijozga «140 lik stolmi, qachonga kerak?» deb qayta so‘rab, buyurtmani aniqladi.
Bot faqat yozilgan savolga javob beradi; mijoz aslida nima so‘raganini va javob shunga mosligini Madina eng yaxshi ko‘radi.

### B.3 Mezonlar: to‘g‘ri natija bu ... / xato natija bu ...

To‘g‘ri natija bu: mijoz so‘ragan mahsulot va dona soniga to‘g‘ri narx turi (1-4 dona chakana, 5+ ulgurji), hisob qatori bilan; qoldiq bugungi 1C faylidan, sanasi bilan; muddat 7 ish kunidan kam emas; ma’lumot yo‘q yoki holat qiyin bo‘lsa, bot odamga uzatgan.

Xato natija bu: boshqa mahsulot yoki o‘lcham; 5+ donaga chakana narx; hisob xato; eski 1C faylidan qoldiq; «3 kunda» kabi 7 ish kunidan qisqa muddat; 5% dan katta chegirma va’dasi; mijoz so‘ragan savollardan biri javobsiz qolgan.

Cheklist (bitta javob, bir daqiqadan kam):

1. Bot mijoz so‘ragan mahsulot va o‘lcham haqida yozganmi? (ha/yo‘q)
2. Narx turi dona soniga mosmi: 1-4 dona chakana, 5 donadan ulgurji? (ha/yo‘q)
3. Hisob qatori bormi va to‘g‘rimi: narx x dona = summa? (ha/yo‘q)
4. Qoldiq javobida 1C fayli sanasi bugungimi? (ha/yo‘q)
5. Muddat 7 ish kunidan kam emasmi va 5% dan katta chegirma va’da qilinmaganmi? (ha/yo‘q)
6. Mijoz so‘ragan hamma narsaga (narx, qoldiq, muddat) javob bormi? (ha/yo‘q)

Bittasi «yo‘q» bo‘lsa: javobni mijozga aytmaydi, ❌ bosadi va sababini bir gapda yozadi.

### B.4 Misollar: 3 ta yaxshi va 3 ta yomon, manbasi

Eslatma: Bu 6 ta misol agentning sinov to‘plami ham: har bir o‘zgarishdan keyin agent shularda tekshiriladi (kit4-people/test-set.md).
ID lar test-set.md dagi bilan bir xil. T3 va T8 ham sinov to‘plamida bor, lekin bu mashqqa kirmaydi.

| ID | Baho | Bir qatorda | Manba |
|---|---|---|---|
| T1 | yaxshi | Optima, 8 dona: ulgurji 1 890 000 x 8 = 15 120 000 so‘m | Jamshid aka tekshirgan javob, 2026-11-25 |
| T2 | yaxshi | Start, 2 dona: chakana 1 450 000 x 2 = 2 900 000 so‘m | Telegram, 2026-11-27 |
| T4 | yaxshi | ErgoPro X5 qoldig‘i: son 1C faylidan, fayl sanasi bilan | Otabek akadan so‘rab, 1C eksporti |
| T5 | yomon | 35 mln ga 15% chegirma va’da qilingan; to‘g‘risi: 5% dan yuqori, Jamshid akaga uzatiladi | menejer, 2026-11-24; Jamshid aka bekor qildi |
| T6 | yomon | «3 kunda yetkazamiz» deyilgan; to‘g‘risi: 70% to‘lovdan keyin 7 ish kuni | menejer, 2026-12-01 |
| T7 | yomon | Kreslo mexanizmiga «36 oy kafolat»; to‘g‘risi: 12 oy | marketing KP shabloni; shartnomada 12 oy |

Eslatma (T4): test-set.md dagi 150 dona 01.11.2026 dagi 1C fayliga tegishli. 2026-12-14 08:00 da Otabek aka yangi 1C faylini chiqaradi; `app/` dagi sinov har safar shu kungi faylni qo‘yadi, shuning uchun son o‘zgarishi mumkin.
Madina T4 da sonni yodlamaydi: son 1C faylidagi bilan mosligini va fayl sanasi bugungi ekanini tekshiradi.
Fayl 36 soatdan eski bo‘lsa, to‘g‘ri javob - bot odamga uzatadi (To‘plam 3, B.6).

### B.5 Muddat

2 hafta: 2026-12-14 - 2026-12-26 (12 ish kuni: 14-19 va 21-26-dekabr).
- 2026-12-14 09:30: suhbat (15 daqiqa).
- 2026-12-14 11:00-11:30: mashq, Malika bilan, 6 misol ustida.
- 2026-12-14 14:00: bot yoqiladi; shundan 26-dekabrgacha botdan har kuni foydalanadi.
- 2026-12-19 (shanba) 16:00: birinchi natija, haftalik ko‘rib chiqishda.
- 2026-12-26 (shanba) 16:00: ikki haftalik natija.

### B.6 O‘sishni qanday o‘lchaymiz

| Ko‘rsatkich | Qanday sanaladi | Maqsad |
|---|---|---|
| Mashqda to‘g‘ri baholangan misollar | 6 ta misoldan nechtasini bir daqiqa ichida to‘g‘ri baholadi (yaxshi yoki yomon, yomon bo‘lsa xatosi) | 6 / 6 |
| Mijozga ketgan xato | 2026-12-14 - 2026-12-26 da Madina tekshirgan javoblardan mijozga ketgan xato narx yoki muddat soni (❌ jurnali va Malikaning 17:30 dagi ko‘rib chiqishidan) | 0 |

Bu xodimni emas, tekshirish ishini o‘lchaydi; raqamlar maosh yoki baholash uchun ishlatilmaydi.

### B.7 Natijani kim ko‘rib chiqadi

- Malika Rashidova: har kuni 17:30 (❌ lar va xatolar jurnali, To‘plam 5, B.13). 1-haftada Madinaning har bir qoralamasini ish vaqtida 5 daqiqa ichida tasdiqlaydi.
- Jamshid aka: har shanba 16:00 (2026-12-19, 2026-12-26).

### B.8 Suhbatdan: uning savollari va xavotirlari

(Suhbatdan keyin to‘ldiriladi: `/kit4 suhbat madina`.)

### B.9 Nima deb kelishdik

(Suhbatdan keyin to‘ldiriladi.)

## Mashq (30 daqiqa)

2026-12-14, 11:00-11:30, Malika bilan. Material: test-set.md dagi T1, T2, T4, T5, T6, T7 va shu fayldagi cheklist (B.3).

| Vaqt | Nima qilinadi |
|---|---|
| 11:00-11:07 | Yaxshi misollar: T1, T2, T4. Malika har birida nega to‘g‘ri ekanini ko‘rsatadi: ulgurji chegarasi (5 dona), hisob qatori, 1C fayli sanasi. T4 ni bugungi (14-dekabr 08:00) 1C fayli bilan ko‘radi. |
| 11:07-11:16 | Yomon misollar: T5, T6, T7. Madina avval o‘zi xatoni topadi, keyin to‘g‘ri javobni aytadi (5% vakolat, 7 ish kuni, 12 oy kafolat). |
| 11:16-11:23 | O‘lchov (B.6): Malika 6 ta misolni aralashtirib, bahosini yashirib beradi; Madina har biriga bir daqiqada cheklist bilan baho beradi. Malika nechtasi to‘g‘ri ekanini yozadi. |
| 11:23-11:28 | Bitta yangi javob: cheklist bilan to‘liq tekshiradi. Yangi javobni Malika sinov rejimida botdan oldindan oladi [?] (bot 14:00 da yoqiladi). |
| 11:28-11:30 | Savollar: cheklistda nima tushunarsiz, nimani qo‘shish kerak. |

## Suhbat rejasi

2026-12-14, 09:30, 15 daqiqa, yolg‘iz; bot yoqilishidan (14:00) oldin.
Madinaga «Madina opa» deb, «siz» bilan murojaat qilinadi.

### 1. Nima o‘zgaradi

Bugun 14:00 dan narx, qoldiq va muddatni Otabek akadan so‘rab kutish shart emas: Savdo yordamchisi prays-list, qoidalar va bugungi 1C faylidan javob tayyorlaydi.
Siz savolni mijoz bilan aniqlab botga yozasiz, javobni tekshirasiz va mijozga o‘zingiz aytasiz.

### 2. Nima o‘zgarmaydi

- Maosh, lavozim va jamoangiz o‘zgarmaydi.
- Mijoz bilan gaplashish sizda qoladi: bot mijozga o‘zi yozmaydi.
- Yozma majburiyat: [?] (egasi imzolagan bo‘lsa, muddatini shu yerga yozing).

### 3. Bundan buyon nimani tekshirasiz va nega aynan siz

Botning narx, qoldiq va muddat javobini mijozga aytishdan oldin, 6 savollik cheklist bilan (bir daqiqadan kam).
Nega siz: 1-dekabrda «Optima’dan 8 ta» degan mijozga «140 lik stolmi, qachonga kerak?» deb qayta so‘rab, buyurtmani aniqladingiz. Bot faqat yozilgan savolga javob beradi; mijoz aslida nima so‘raganini siz ko‘rasiz.
Siz aytgan istisno (mijoz eski prays-list narxini aytsa, Jamshid akaga uzatiladi) botning yo‘riqnomasiga kirgan (To‘plam 3, B.6).

### 4. Kutilayotgan xavotirlar va halol javoblar

| Xavotir | Javob |
|---|---|
| «Bot mening ishimni olib qo‘yadimi?» | Yo‘q. Mijoz bilan gaplashish, savolni aniqlash va javobni aytish sizda qoladi; bot sizga yordam beradi. Maosh va lavozimingiz o‘zgarmaydi. |
| «Bot xato qilsa, men javobgarmanmi?» | Javobni mijozga aytishdan oldin tekshirasiz; xato ko‘rsangiz ❌ bosasiz - bu jazo emas, botni tuzatish uchun kerak. Birinchi haftada har bir javobni Malika opa ham 5 daqiqa ichida tasdiqlaydi. Jarayon uchun javobgar - Jamshid aka. |
| «Mening ishimni kuzatishadimi?» | Yo‘q. Bot kim qachon onlayn bo‘lganini va qanchalik tez javob berganini yozmaydi. Mashqdagi va ikki haftadagi raqamlar tekshirish ishini o‘lchaydi; maosh yoki baholash uchun ishlatilmaydi. |

### 5. Madina opadan so‘raladigan 2 ta savol

1. Nima sizga yordam beradi?
2. Qayerda bot xato qilishi mumkin deb o‘ylaysiz?

Shuningdek tasdiqlatish: kuniga taxminan 12 ta narx, qoldiq va muddat savoli to‘g‘rimi (A.3)?
