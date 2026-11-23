# Namuna: Baraka Office hujjatlari bilan Gemini Notebook natijalari

Bu sahifada mashqning tayyor natijalari bor: Gemini Notebook haqiqatan nima javob bergani va uni qanday tekshirish.
Hammasi 2026-yil 3-noyabrda «Baraka Office - bilim bazasi (demo)» daftarida olingan: 8 ta manba (prays-list, tijoriy taklif, shartnoma, ichki tartib, uchta rahbar intervyusining audiosi va 25 ta savol shabloni).
Javoblar qisqartirilgan, lekin raqamlar va xulosalar o‘zgartirilmagan.

## 1. Savol va javob: «Optima» stoli

**Savol:**

```text
Mijoz 20 ta «Optima» stoli olmoqchi. Ulgurji narx bilan jami qancha bo‘ladi va oddiy sotuvchi qancha chegirma bera oladi?
```

**Gemini Notebook javobi (qisqartirilgan):**

> Ulgurji narx (5+ dona): 1 890 000 so‘m [1]. 20 ta stol: 20 × 1 890 000 = 37 800 000 so‘m [1].
> Oddiy sotuv menejeri buyurtma 20 000 000 so‘mdan oshganda maksimum 5% gacha chegirma bera oladi [2]. 5% bilan: 35 910 000 so‘m.
> Qo‘shimcha: Toshkent shahri hamda Toshkent viloyati bo‘ylab yetkazib berish bepul [4, 5].

**Qanday tekshirdik:**

- Narx va hisob to‘g‘ri: prays-listda WS-102 ulgurji narxi 1 890 000 so‘m, 20 × 1 890 000 = 37 800 000.
- Chegirma to‘g‘ri: prays-list, 5-bo‘lim, 1-band.
- **Oxirgi qatorda xato bor.** [5] raqamini bosganda shartnoma ochiladi, unda esa viloyatga yetkazish «har 1 km uchun 8 000 so‘m» deb yozilgan.
  «Bepul» degan gap faqat tijoriy taklifda [4] bor.
  AI ikki zid manbani bitta gapga qo‘shib yuborgan.

**Xulosa:** to‘g‘ri raqamlar orasida ham bitta noto‘g‘ri gap bo‘lishi mumkin; har bir manba raqamini bosib ko‘ring.

## 2. Ziddiyatlar jadvali

**So‘rov:** mashq varag‘idagi «Ziddiyatlarni toping» prompti.

**Gemini Notebook javobi:** 8 ta ziddiyat, har biriga ikki manbadan iqtibos bilan.
Jadval qisqartirilgan:

| # | Mavzu | 1-manba | 2-manba |
| --- | --- | --- | --- |
| 1 | Kafolat | Tijoriy taklif: barcha mebelga 36 oy | Shartnoma: korpusga 24 oy, kreslo mexanizmiga 12 oy |
| 2 | Yetkazish muddati | ROP Jamshid Karimov: «3 ish kuni» | Shartnoma: 7 ish kuni (maxsus buyurtma 12) |
| 3 | Chegirma | Prays-list: sotuvchi 5%, ROP 10% | ROP: «30-40 mln buyurtmada sotuvchi 12-15% beradi» |
| 4 | Viloyatga yetkazish | Tijoriy taklif: butun viloyatga bepul | Shartnoma: 1 km uchun 8 000 so‘m |
| 5 | Bepul 3D loyiha | Prays-list: faqat 15 mln so‘mdan oshsa | ROP va taklif: har bir mijozga bepul |
| 6 | Sotuv rejasi | Ichki tartib: 120 mln so‘m | HR rahbari Dilnoza: 100 mln so‘m |
| 7 | Oylik sanasi | Ichki tartib: oklad 5-sanada, bonus 15-sanada | HR: ikkalasi 10-sanagacha |
| 8 | Kechikish jarimasi | Ichki tartib: 4-kechikishdan bonus kesiladi | HR: 3 martadan ko‘p kechiksa kesiladi |

Ataylab qo‘yilgan 4 ta ziddiyatning hammasi topildi (1, 2, 3, 4, 6, 7-qatorlar); 5 va 8-qatorlar hujjatlardagi qo‘shimcha haqiqiy farqlar.

**Biznes egasi uchun:** har bir qator bitta qaror: qaysi hujjat to‘g‘ri, qaysi biri tuzatiladi va xodimlarga kim aytadi.

## 3. O‘zbekcha test (Quiz)

Audio Overview o‘zbek tilida chiqmaydi.
O‘zbekcha test uchun chatga shunday yozing:

```text
Yangi sotuv menejeri uchun 5 ta savollik test tuz: har bir savolga 3 ta javob varianti, to‘g‘ri javobi va manbasi bilan. O‘zbek tilida yoz.
```

Natija: chatda 5 ta savolli o‘zbekcha test va Studio bo‘limida «Yangi sotuv menejeri uchun test» nomli interaktiv test paydo bo‘ldi.
To‘liq matni: `namuna/studio-quiz-gemini-notebook.md`.
Bitta savol namunasi:

> Oddiy sotuv menejerining mijozga chegirma berish vakolati chegarasi va sharti qanday?
> To‘g‘ri javob: faqat umumiy buyurtma summasi 20 000 000 so‘mdan oshganda maksimum 5% gacha chegirma bera oladi.

## 4. Yomon savol va uning to‘g‘ri varianti

Bu bo‘lim qo‘lda yozilgan misol, Gemini Notebook javobi emas.

**Yomon:**

```text
Kompaniya haqida gapirib ber.
```

**Nima noto‘g‘ri:** savol juda keng.
Javob uzun umumiy matn bo‘ladi, undan qaror chiqmaydi va har bir gapni tekshirish qiyin.

**To‘g‘ri:**

```text
Mijoz «kreslo 1,5 yilda buzildi» deb shikoyat qilyapti. Hujjatlarga ko‘ra kafolat bormi? Har bir gapga manba ko‘rsat, hujjatlar bir-biriga zid bo‘lsa, buni alohida yoz.
```

**Nega yaxshi:** aniq vaziyat, aniq savol, manba talabi va ziddiyatni ko‘rsatish talabi bor.
Bu savolga Baraka hujjatlarida ikki xil javob bor (36 oy va 12 oy): yaxshi so‘rov buni ochib beradi.

## Natijani qanday o‘qish

- Har bir raqamni manba raqamini bosib tekshiring.
- Javobda ikki manba bitta gapda kelsa, ikkalasini ham oching: ular zid bo‘lishi mumkin.
- «Hujjatlarda yo‘q» degan javob ham yaxshi natija: AI to‘qimadi.
- Ziddiyatlar jadvalini mas’ul xodim bilan ko‘rib chiqing va qaysi hujjat to‘g‘ri ekanini yozib qo‘ying.
