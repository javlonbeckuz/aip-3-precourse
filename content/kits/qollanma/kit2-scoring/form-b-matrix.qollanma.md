# B shakli, qiymat va osonlik matritsasi: qanday to‘ldirish

B shakli - har bir jarayon matritsada bitta nuqta; yuqori o‘ng qismdan birinchi sinov uchun bittasi tanlanadi.
2-darsda chiziladi, tanlov (B.1-B.3) uyga vazifada bo‘lim boshlig‘i bilan tasdiqlanadi.

## Boshlashdan oldin kerak bo‘ladi

- To‘ldirilgan A shakli (`form-a-scoring.md`): har bir jarayonning A.8 Qiymati va A.9 Osonligi.
- Brauzer: `matrix.html` ni ochish uchun (internet kerak emas).
- Bo‘lim boshlig‘i bilan 15 daqiqa tanlov uchun.

## Har bir maydon

| Kod | Maydon | Oddiy so‘z bilan nima | Javob qayerdan olinadi | Baraka Office misoli |
|---|---|---|---|---|
| - | Bo‘lim, Sana | Qaysi bo‘lim, qachon | A shakli | Savdo, 2026-11-29 |
| - | Matritsadagi nuqtalar | Har bir jarayon: raqami, Qiymat, Osonlik | A shaklidagi A.8 va A.9 | Savdo savollariga javob: Qiymat 15, Osonlik 10 |
| - | Matritsadagi joyi | To‘rt qismdan qaysi biri | Qoida: 9 dan katta - yuqori yoki o‘ng; 9 ga teng - chegarada | Savdo savollariga javob: «Birinchi sinov» |
| B.1 | Tanlangan jarayon | Birinchi sinov uchun bitta jarayon | Yuqori o‘ng qism, egasi tanlaydi | 1-jarayon: narx, qoldiq, chegirma va muddat savoli; Qiymat 15, Osonlik 10; bot nomi «Savdo yordamchisi» |
| B.2 | Nega aynan shu | Egasining o‘z so‘zi bilan sabab | Egasi | Menejerlar va call-markaz bir xil savolni kuniga o‘nlab marta Jamshid akaga beradi, mijoz kutadi, javob esa hujjatlarda bor |
| B.3 | Hozir nimani qilmayapmiz | Ataylab keyinga qoldirilgan ish | Egasi | KP tayyorlash (2-jarayon, kursdan keyin); bot mijozga o‘zi yozmaydi, faqat xodimlarga javob beradi |

Matritsaning to‘rt qismi:

- Yuqori o‘ng, «Birinchi sinov»: foydali va oson.
- Yuqori chap, «Foydali, puxta reja kerak»: katta foyda, lekin ma’lumot tartibsiz yoki xato qimmat.
- Pastki o‘ng, «Oson, lekin foydasi kichik».
- Pastki chap, «Hozircha tegmang».

## matrix.html

/kit2 matritsani `kit2-scoring/matrix.html` sahifasi qilib chizadi.
Sahifa internetsiz ochiladi: macOS’da `open kit2-scoring/matrix.html`, Windows’da `start kit2-scoring\matrix.html`.
Tanlangan jarayon ko‘k nuqta bilan ko‘rinadi, o‘ngda har bir jarayonning Qiymati, Osonligi va qismi yozilgan.
Sahifani bosib chiqarish yoki telefonda ko‘rsatish mumkin.

## Ko‘p uchraydigan xatolar

1. Eng katta Qiymatli jarayon tanlangan, Osonligi qaralmagan.
   Tuzatish: birinchi sinov uchun yuqori o‘ng qismdan tanlang, yuqori chapdagini keyinga qoldiring.
2. B.2 da «AI hamma narsani qiladi» deb yozilgan.
   Tuzatish: o‘z biznesingizdagi aniq sabab: vaqt, xato narxi, ma’lumot qayerda.
3. B.3 bo‘sh qolgan.
   Tuzatish: hozir nimani ataylab qilmasligingizni yozing; bu To‘plam 3 dagi taqiqlarga asos bo‘ladi.
4. Nuqtalar qo‘lda chizilgan, A shaklidagi raqamlar bilan mos emas.
   Tuzatish: Qiymat va Osonlikni A shaklidan aynan ko‘chiring.
5. Tanlovdan keyin boshlang‘ich raqamlar yig‘ilmaydi.
   Tuzatish: shu hafta `/kit5 baseline` ni boshlang, aks holda 6-darsda natija bo‘lmaydi.

## Tayyor bo‘lganini qanday bilasiz

Mentor 3-darsning boshida tekshiradi:

- [ ] B.1-B.3 to‘ldirilgan va bo‘lim boshlig‘i bilan kelishilgan.
- [ ] Tanlangan jarayon yuqori o‘ng qismda yoki nega emasligi yozilgan.
- [ ] `matrix.html` brauzerda ochiladi.
- [ ] Boshlang‘ich raqamlar yig‘ila boshlagan (`kit5-pilot/baseline.md`).

## Claude Code bilan

```text
/kit2
```

/kit2 jarayonlarni baholagandan keyin matritsani chizadi, eng yaxshi ikki variantni taklif qiladi va B.1-B.3 ni sizdan so‘raydi.

## Namuna

- To‘ldirilgan namuna: [Baraka Office, form-b-matrix.md](../../namunalar/baraka-office/kit2-scoring/form-b-matrix.md)
- Yomon misollar: [yomon-misollar.md](../../namunalar/yomon-misollar.md)
- Matritsa sahifasi: [matrix.html](../../namunalar/baraka-office/kit2-scoring/matrix.html)
- Skill namunasi: [skills/kit2/example/](../../skills/kit2/example/) (`suhbat.md` - aniq so‘rovlar va to‘liq javoblar)
