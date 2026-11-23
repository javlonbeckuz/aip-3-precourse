# Suhbat transkripti: qanday to‘ldirish

Transkript - xodim bilan suhbatning so‘zma-so‘z matni yoki suhbatchining qo‘lda yozgan qaydlari.
1-darsdan keyin har bir suhbat uchun bitta fayl tuziladi; /kit1 B shaklini shu fayldan tuzadi.

## Boshlashdan oldin kerak bo‘ladi

- Suhbat audiosi (telefon diktofoni) yoki qo‘lda yozilgan qaydlar.
- Xodimning A shaklidagi yozma roziligi: yozuv yoki matn AI xizmatiga faqat shundan keyin beriladi.
- Gemini (yoki boshqa AI) va andozadagi transkripsiya so‘rovi.
- Vaqt: 30 daqiqalik suhbat uchun 10-15 daqiqa, keyin bir marta o‘qib chiqish uchun 10 daqiqa.

## Har bir maydon

| Kod | Maydon | Oddiy so‘z bilan nima | Javob qayerdan olinadi | Baraka Office misoli |
|---|---|---|---|---|
| - | Fayl nomi | `ism-transcript.md` da «ism» o‘rniga xodim ismi | O‘zingiz | `malika-transcript.md` |
| - | Xodim | Kim bilan gaplashildi | A shakli | Malika Rashidova (B04) |
| - | Lavozim | Uning lavozimi | HR ro‘yxati | Savdo menejeri |
| - | Bo‘lim | Qaysi bo‘lim | HR ro‘yxati | Savdo |
| - | Suhbat sanasi | Qachon gaplashildi | A shakli | 2026-11-24 |
| - | Suhbatni o‘tkazdi | Kim savol berdi | A shakli | Jamshid Karimov (B02, savdo bo‘limi rahbari) |
| - | Usul | Yozib olindimi yoki qo‘lda yozildimi | Xodimning tanlovi | Yozib olindi, Gemini’da matnga aylantirildi |
| - | Rozilik | Xodim imzo qo‘ydimi | A shaklidagi rozilik qatori | Xodim A shaklida imzo qo‘ydi (yozib olish va AI xizmatiga berish) |
| - | Audio o‘chiriladigan sana | Suhbatdan 7 kun keyin | Suhbat sanasi + 7 kun | 2026-12-01 |
| - | Matn | Transkript yoki qaydlar, o‘zgartirilmagan holda | Gemini yoki qo‘lda yozilgan qaydlar | «Suhbatdosh:» va «Xodim:» deb belgilangan matn |

## Audioni bo‘laklab yozish va yuklash

Bepul Gemini bir so‘rovda 10 daqiqagacha audio qabul qiladi (Google AI Pro va Ultra: 3 soatgacha; support.google.com/gemini/answer/14903178, 2026-11-03 da tekshirildi).
20-30 daqiqalik suhbat bitta yuklashga sig‘maydi.
Shuning uchun suhbatni bir nechta alohida yozuv qilib yozing: A.2 dan keyin, A.5 dan keyin yoki har 8 daqiqada, qaysi biri oldin kelsa, diktofonni to‘xtatib, yangisini boshlang.
Har bir bo‘lakni Gemini’ga alohida yuklang va olingan matnlarni ketma-ket transkript faylining «Matn» bo‘limiga qo‘ying.

## Mijoz ma’lumotini yashirish

Xodim suhbatda mijozning ismi yoki telefonini aytmasin: buni suhbat boshida so‘rang.
Baribir aytilgan bo‘lsa, transkriptni Claude yoki boshqa AI’ga berishdan oldin mijoz yoki bemorning ismi, telefoni, tashxisi o‘rniga «[mijoz]» yozing.
Misol (klinika): «Dilfuza Karimova, +998 90 123 45 67, qandli diabet» o‘rniga «[mijoz]».
Andozadagi Gemini so‘rovi buni matnga aylantirish paytida o‘zi qiladi; baribir bir marta o‘qib tekshiring.

## Raqamlarni tekshirish

Ovozni matnga aylantiruvchi dasturlar o‘zbekcha taxminiy raqamlarni noto‘g‘ri yozadi.
Xodim «bir uch-to‘rt yuz ming» desa, bu taxminan 300 000-400 000 so‘m degani.
Matnda esa «1 300 000» bo‘lib chiqishi mumkin.
Xodim «uch-to‘rt marta» desa, matnda «34 marta» chiqishi mumkin.
Baraka misolida Malikaning transkriptida ikkalasi ham bor: «1 300 000 yo‘qotdik» aslida 350 000 so‘m, «kuniga 34 marta» aslida 4 marta.
Shuning uchun Gemini’dan raqamlarni so‘z bilan yozishni so‘rang va matnni o‘zgartirmang: /kit1 har bir raqamni alohida ro‘yxat qilib, audio bilan solishtirishni so‘raydi.

## Ko‘p uchraydigan xatolar

1. Rozilik imzosiz audio AI’ga yuklangan.
   Mehnat kodeksining 178-moddasiga ko‘ra (lex.uz/mact/6257288) xodim ma’lumoti uchinchi tomonga, AI xizmati ham, faqat uning yozma roziligi bilan beriladi.
   Tuzatish: avval A shaklidagi qatorga imzo oling; kompaniya bunga tayanishidan oldin yurist tasdiqlasin.
2. Transkriptdagi raqamlar «chiroyli» qilib qo‘lda tuzatilgan.
   Tuzatish: matnni o‘zgartirmang, tuzatishni B shaklidagi «Raqamlar tekshiruvi» jadvaliga yozing.
3. Gemini xulosa yozib bergan, so‘zma-so‘z matn emas.
   Tuzatish: andozadagi so‘rovni ishlating, unda «qisqartirma va tuzatma» deyilgan.
4. Gapiruvchilar belgilanmagan.
   Tuzatish: «Suhbatdosh» va «Xodim» deb ajrating, aks holda kimning vazifasi ekani aralashadi.
5. Audio o‘chirilmay qolgan.
   Tuzatish: o‘chirish sanasini faylga yozing va o‘sha kuni o‘chiring.

## Tayyor bo‘lganini qanday bilasiz

- [ ] Fayl nomi xodim ismi bilan: `malika-transcript.md`.
- [ ] Sarlavhadagi hamma maydon to‘ldirilgan, rozilik qatori «imzo qo‘ydi».
- [ ] Matnda raqamlar o‘zgartirilmagan.
- [ ] Audio o‘chiriladigan sana yozilgan.

## Claude Code bilan

```text
/kit1 malika-transcript.md
```

/kit1 transkriptni o‘qiydi, avval har bir raqamni ro‘yxat qiladi, keyin B shaklini tuzadi.
Audio faylni bersangiz, avval Gemini’da matnga aylantirishni aytadi.

## Namuna

- To‘ldirilgan namunalar: [malika-transcript.md](../../namunalar/baraka-office/kit1-interviews/malika-transcript.md), [zarina-transcript.md](../../namunalar/baraka-office/kit1-interviews/zarina-transcript.md), [jamshid-transcript.md](../../namunalar/baraka-office/kit1-interviews/jamshid-transcript.md)
- Yomon misollar: [yomon-misollar.md](../../namunalar/yomon-misollar.md)
- Skill namunasi: [skills/kit1/example/](../../skills/kit1/example/) (`suhbat.md` - aniq so‘rovlar va to‘liq javoblar)
