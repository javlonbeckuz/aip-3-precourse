# Birinchi qurilish: tayyor promptlar

> **Elektron nusxa stol Telegram guruhida: `prompt-sheet.html`.**
> Promptni qog‘ozdan qayta yozmang: o‘sha fayldan «Nusxa olish» tugmasi bilan oling.

30 daqiqada o‘z biznesingiz uchun narx kalkulyatori yoki bir sahifalik taklif quramiz.
Claude uni chat ichida ishlaydigan sahifa qilib yasaydi: bu artefakt deyiladi.

## Qanday ishlaymiz

1. claude.ai ni oching.
2. Quyidan biznes turingizni toping va promptni elektron nusxadan (`prompt-sheet.html`) nusxalang.
3. Kvadrat qavs ichidagi joylarga o‘z mahsulot va narxlaringizni yozing: 3-5 ta yetarli.
4. Yuboring va natijani sinab ko‘ring: miqdorni o‘zgartiring, jami to‘g‘ri chiqyaptimi?
5. Chatda bitta narsani o‘zgartirishni so‘rang, keyin yana ikkitasini.

> **Faqat mahsulot nomi va narxini yozing.**
> Mijozning ismi, telefoni, hisob raqami yoki pasport ma’lumotini yozmang.
> Nega shunday ekanini darsning 45-daqiqasida ko‘ramiz.

Artefakt chiqmasa: Settings (Sozlamalar) → Capabilities bo‘limida «Code execution and file creation» yoqilganini tekshiring.
Qotib qoldingizmi?
Skrinshot qiling va Claude’dan so‘rang, keyin mentorga ayting.

## 1. Savdo: do‘kon yoki ulgurji savdo

```text
Men Toshkentda [nima sotasiz, masalan: qurilish mollari] savdosi bilan shug‘ullanaman.
Mijozlarim uchun narx kalkulyatori kerak, uni artefakt qilib yasab ber.

Mahsulotlar (nomi, birligi, chakana narxi, ulgurji narxi, so‘mda):
- [mahsulot 1], [dona / kg / qop], [chakana narx], [ulgurji narx]
- [mahsulot 2], [birligi], [chakana narx], [ulgurji narx]
- [mahsulot 3], [birligi], [chakana narx], [ulgurji narx]

Ulgurji narx [10] donadan boshlab o‘zi qo‘llansin.
Mijoz har bir mahsulot miqdorini kiritsin, qator summasi va jami avtomatik chiqsin.
Yetkazib berish: shahar ichida [narx], viloyatga [narx].
Pastda mijozga Telegram’da yuborish uchun tayyor matn va «Nusxa olish» tugmasi bo‘lsin.
Barcha yozuvlar o‘zbek tilida, narxlar «1 250 000 so‘m» ko‘rinishida bo‘lsin.
```

## 2. Qurilish va ta’mirlash: taxminiy smeta

```text
Men Toshkentda kvartira va ofis ta’miri bilan shug‘ullanaman.
Mijozlar uchun taxminiy smeta kalkulyatori kerak, uni artefakt qilib yasab ber.

Ishlar va narxlar (so‘mda):
- [shpaklyovka va bo‘yash], 1 m² uchun: [narx]
- [laminat yotqizish], 1 m² uchun: [narx]
- [kafel yotqizish], 1 m² uchun: [narx]
- [elektr montaj], 1 nuqta uchun: [narx]

Mijoz maydonni (m²) kiritsin va kerakli ishlarni belgilasin.
Ishlar summasi, materiallar uchun taxminan [30]% va jami alohida ko‘rinsin.
Pastda «Bu taxminiy hisob, aniq narx o‘lchovdan keyin» degan yozuv bo‘lsin.
Telegram uchun tayyor matn va «Nusxa olish» tugmasini qo‘sh.
Barcha yozuvlar o‘zbek tilida bo‘lsin.
```

## 3. Klinika: xizmatlar va paketlar

```text
Men Toshkentda xususiy klinika yuritaman.
Bemorlar uchun xizmatlar narxini hisoblaydigan sahifa kerak, uni artefakt qilib yasab ber.

Xizmatlar (so‘mda):
- [terapevt ko‘rigi]: [narx]
- [umumiy qon tahlili]: [narx]
- [qorin bo‘shlig‘i UZI]: [narx]
- [EKG]: [narx]

Tayyor paket: [Yillik tekshiruv] = [qaysi xizmatlar kiradi], narxi [paket narxi].
Bemor xizmatlarni belgilasin, jami chiqsin; paket arzonroq bo‘lsa, buni ko‘rsatsin.
Tibbiy maslahat bermasin: faqat narx va tahlilga tayyorgarlik bo‘yicha qisqa eslatma bo‘lsin.
Telegram uchun tayyor matn va «Nusxa olish» tugmasini qo‘sh.
Barcha yozuvlar o‘zbek tilida bo‘lsin.
```

## 4. O‘quv markazi: bir sahifalik taklif

```text
Men Toshkentda o‘quv markazi yuritaman: [qaysi kurslar].
Ota-onalarga yuborish uchun bir sahifalik taklif kerak, uni artefakt qilib yasab ber.

Ma’lumotlar:
- Kurslar va oylik narxi: [kurs 1: narx], [kurs 2: narx], [kurs 3: narx]
- Dars jadvali: [haftasiga necha marta, soat nechada]
- Guruhda [necha] o‘quvchi
- Chegirma: [masalan, ikkinchi farzand uchun 10%]
- Manzil: [tuman, mo‘ljal]

Tuzilishi: qisqa sarlavha, kimlar uchun, 3 ta afzallik, kurslar va narxlar jadvali, chegirma, qanday yozilish mumkin.
Pastda Telegram uchun qisqa matn va «Nusxa olish» tugmasi bo‘lsin.
Telefonda chiroyli ko‘rinsin. Barcha yozuvlar o‘zbek tilida bo‘lsin.
```

## 5. Restoran yoki to‘yxona: banket kalkulyatori

```text
Men Toshkentda restoran yuritaman, banket va to‘ylar ham qilamiz.
Mijozlar uchun banket narxi kalkulyatori kerak, uni artefakt qilib yasab ber.

Menyu paketlari (1 kishi uchun, so‘mda):
- [Standart]: [narx], tarkibi: [nimalar kiradi]
- [Premium]: [narx], tarkibi: [nimalar kiradi]
Qo‘shimchalar: [tort: narx], [jonli musiqa: narx], [zal bezagi: narx].
Xizmat haqi: [10]%.

Mijoz mehmonlar sonini, paketni va qo‘shimchalarni tanlasin.
Jami va bir kishiga to‘g‘ri keladigan narx avtomatik chiqsin.
Telegram uchun tayyor matn va «Nusxa olish» tugmasini qo‘sh.
Barcha yozuvlar o‘zbek tilida bo‘lsin.
```

## 6. Logistika: yetkazish narxi

```text
Men Toshkentda yuk tashish xizmatini yuritaman.
Mijozlar uchun yetkazish narxi kalkulyatori kerak, uni artefakt qilib yasab ber.

Narxlar (so‘mda):
- Shahar ichida bitta reys: [narx]
- Shahardan tashqarida 1 km uchun: [narx]
- Mashina turi: [Labo: narx], [5 tonnalik: narx], [20 tonnalik fura: narx]
- Yuklash yoki tushirish, 1 soat: [narx]

Mijoz masofani (km), mashina turini va yuklash vaqtini kiritsin, jami avtomatik chiqsin.
Telegram uchun tayyor matn va «Nusxa olish» tugmasini qo‘sh.
Barcha yozuvlar o‘zbek tilida bo‘lsin.
```

## 7. Ishlab chiqarish: buyurtma kalkulyatori

```text
Men Toshkentda [nima ishlab chiqarasiz, masalan: ofis mebeli] ishlab chiqaraman.
Dilerlar va korporativ mijozlar uchun buyurtma kalkulyatori kerak, uni artefakt qilib yasab ber.

Mahsulotlar (kodi, nomi, chakana narx 1-4 dona, ulgurji narx 5+ dona, so‘mda):
- [kod], [nomi], [chakana narx], [ulgurji narx]
- [kod], [nomi], [chakana narx], [ulgurji narx]
- [kod], [nomi], [chakana narx], [ulgurji narx]

Qoidalar: 5 donadan boshlab ulgurji narx o‘zi qo‘llansin.
Buyurtma [20 000 000] so‘mdan oshsa, menejer [5]% gacha chegirma tanlay olsin, undan kam bo‘lsa chegirma yopiq tursin.
Mijoz miqdorlarni kiritsin; har bir qator, chegirma va jami chiqsin.
Pastda Telegram uchun tijoriy taklif matni va «Nusxa olish» tugmasi bo‘lsin.
Barcha yozuvlar o‘zbek tilida bo‘lsin.
```

## 8. Xizmatlar: salon, avtoservis, agentlik

```text
Men Toshkentda [xizmat turi] xizmatini ko‘rsataman.
Mijozlarga yuborish uchun bir sahifalik taklif kerak, uni artefakt qilib yasab ber.

Ma’lumotlar:
- Paketlar: [paket 1: nima kiradi, narx], [paket 2: nima kiradi, narx], [paket 3: nima kiradi, narx]
- Ish vaqti: [kunlar, soatlar]
- Nega biz: [3 ta sabab]
- Kafolat yoki shart: [masalan, 30 kun kafolat]

Tuzilishi: sarlavha, 3 ta afzallik, paketlar kartochkalarda (eng ko‘p olinadiganini belgilab), qanday buyurtma berish.
Pastda Telegram uchun qisqa matn va «Nusxa olish» tugmasi bo‘lsin.
Telefonda chiroyli ko‘rinsin. Barcha yozuvlar o‘zbek tilida bo‘lsin.
```

## Boshqa biznes: bo‘sh shablon

```text
Men Toshkentda [biznesingiz nima qiladi].
Mijozlarim uchun [narx kalkulyatori / bir sahifalik taklif] kerak, uni artefakt qilib yasab ber.

Mahsulot yoki xizmatlar va narxlar (so‘mda):
- [nomi]: [narx]
- [nomi]: [narx]
- [nomi]: [narx]

Qoidalar: [chegirma, ulgurji narx, yetkazish yoki boshqa shart].
Mijoz [nimani tanlaydi yoki kiritadi], natijada [nima chiqadi].
Pastda Telegram uchun tayyor matn va «Nusxa olish» tugmasi bo‘lsin.
Barcha yozuvlar o‘zbek tilida bo‘lsin.
```

## Qotib qoldingizmi?

Nima so‘rashni bilmasangiz, shuni yuboring.
Bu «Meni intervyu qil» odati: Claude avval savol beradi, keyin quradi.

```text
Men o‘z biznesim uchun mijozlarga yuboriladigan narx kalkulyatori yoki bir sahifalik taklif yasamoqchiman.
Avval menga 3 ta savol ber: biznesim, mahsulotlarim va narx qoidalarim haqida.
Javoblarimdan keyin uni artefakt qilib yasab ber. Barcha yozuvlar o‘zbek tilida bo‘lsin.
```

## Uch marta takrorlang

Birinchi javob qoralama.
Har safar bitta o‘zgarish so‘rang va uchinchisidan keyin baholang.

- «Ulgurji narxni qo‘sh: 10 donadan ko‘p bo‘lsa, narx [narx] bo‘lsin.»
- «Dollar kursi uchun maydon qo‘sh, narxlar dollarda ham ko‘rinsin.»
- «Dizaynni kompaniyam ranglariga moslab ber: asosiy rang [rang].»
- «Kalkulyatorga mijoz o‘zi ismini yozadigan bo‘sh maydon qo‘sh, Telegram matni shu ism bilan boshlansin.» (Haqiqiy mijoz ismini promptga yozmang.)
- «Telefonda ochib ko‘rdim, tugmalar mayda. Kattaroq qil.»
- «Hisobda xato bor: [nima noto‘g‘ri]. Qanday hisoblayotganingni ko‘rsat va tuzat.»

Tayyor bo‘lganda: kalkulyator real mahsulotlaringiz bilan ishlaydi va chat orqali kamida bitta narsa o‘zgartirilgan.

## Namunalar

Instruktor ekranda ko‘rsatadigan uchta tayyor natija, shu varaqdagi promptlar asosida yasalgan:

- Ishlab chiqarish (7-prompt, Baraka Office o‘quv prays-listi bilan): `examples/namuna-kalkulyator.html`
- Restoran (5-prompt): `examples/namuna-banket.html`
- O‘quv markazi (4-prompt): `examples/namuna-taklif.html`

Sizning artefaktingiz boshqacha ko‘rinadi: muhimi, u sizning mahsulot va narxlaringiz bilan ishlashi.
To‘ldirilgan Baraka Office prompti, natijani tekshirish va yomon misol: `birinchi-qurilish.qollanma.md`.
