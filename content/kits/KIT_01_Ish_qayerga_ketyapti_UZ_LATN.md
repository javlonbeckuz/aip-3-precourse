# Ish qayerga ketyapti?

Praktikum 3.0 · To‘plam 1 / 5 · Tuzuvchi: Xurshid Maroziqov

Agent yoki robotga vazifa berishdan oldin, odamlaringiz hafta davomida qaysi vazifaga qancha vaqt sarflayotganini aniq toping.

## Qanday ishlatiladi

1. Avval jamoaga ayting.
   Birinchi suhbatdan oldin bo‘lim xodimlariga o‘zingiz qisqa yig‘ilishda yoki bitta xabarda tushuntiring: maqsad ishni xaritaga tushirish, odamlarni almashtirish emas.
   Odamlar ishini yo‘qotishdan qo‘rqsa, asl holatni yashiradi.
   Tayyor matn shu to‘plamning oxirida.
2. Bitta bo‘lim va 2-3 xodimni tanlang.
   Jamoangiz bo‘lmasa yoki siz menejer bo‘lsangiz, o‘zingizni yoki bo‘lim boshlig‘ini suhbatdan o‘tkazing.
   Har biri bilan A shakli bo‘yicha 20-30 daqiqa gaplashing: avval rozilik matnini o‘qing, xodim yozib olish yoki qo‘lda yozishni o‘zi tanlaydi.
   Yozib olsangiz, bo‘laklab yozing: A.2 dan keyin, A.5 dan keyin yoki har 8 daqiqada, qaysi biri oldin kelsa, yozishni to‘xtatib yangisini boshlang.
   Xodimdan mijozning ismi va telefonini aytmaslikni so‘rang.
3. Har bir bo‘lakni Gemini’ga alohida yuklang (bepul Gemini bir so‘rovda 10 daqiqagacha audio oladi) va matnlarni ketma-ket bitta faylga qo‘ying.
   Mijoz yoki bemorning ismi, telefoni, tashxisi qolgan bo‘lsa, AI’ga berishdan oldin «[mijoz]» deb almashtiring.
   Har bir raqamni audio bilan solishtiring: «bir uch-to‘rt yuz ming» (taxminan 300-400 ming) matnda «1 300 000» bo‘lib chiqishi mumkin.
4. Transkriptni pastdagi so‘rov bilan AI chatga joylang yoki Claude Code’da /kit1 ni ishga tushiring.
   Natija B shakli bo‘ladi.
   Uni xodimga ko‘rsating: u daqiqalar va takrorlanish sonini to‘g‘rilaydi, [?] belgili har bir taxmin aniq raqamga aylanadi.
5. Haftalik soatlarni qo‘shing va B.9 da har bir vazifani ertaga kim qilishini belgilang: A agent, R robot, I inson, B birga.
   Har bir xodim uchun .md fayl saqlang (masalan, dilnoza-form-b.md) va 2-darsga olib keling.
   Audio faylni 7 kun ichida o‘chiring.

## Claude Code’da

kompaniya papkasida /kit1 dilnoza-transcript.md deb yozing.
Natija kit1-interviews/ papkasiga yoziladi.

Fayllar kompaniya papkasida:

- A shakli, Xodim bilan suhbat: `kit1-interviews/ism-form-a.md`
- B shakli, Vazifalar ro‘yxati: `kit1-interviews/ism-form-b.md`
- Jamoaga xabar, Yozma majburiyat (tavsiya etiladi): `kit1-interviews/team-message.md`

## Audioni matnga aylantirish uchun so‘rov (Gemini)

```text
Bu audioni o‘zbek tilida so‘zma-so‘z matnga aylantir.
Gapiruvchilarni «Suhbatdosh» va «Xodim» deb belgila.
Raqamlarni eshitganingdek so‘z bilan yoz, masalan «bir uch-to‘rt yuz ming», o‘zing raqamga aylantirma.
Mijoz yoki bemorning ismi, telefoni va tashxisi o‘rniga «[mijoz]» deb yoz.
Eshitilmagan joyni [eshitilmadi] deb belgila, taxmin qilma.
Hech narsani qisqartirma va tuzatma.
```

## AI chat uchun so‘rov

Claude Code bo‘lmasa: shakl yoki transkriptni so‘rovdan keyin qo‘shib, hammasini Claude, ChatGPT yoki Gemini chatiga joylang.

```text
Siz kichik biznes egasiga o‘z kompaniyasidagi ishlarni xaritaga tushirishda yordam beryapsiz.
Quyida bir xodim bilan 20-30 daqiqalik suhbat transkripti yoki suhbatchining qo‘lda yozgan qaydlari berilgan.
Ikki ishni bajaring.

1) Raqamlarni tekshirish.
Matndagi har bir raqam va miqdorni, so‘z bilan aytilganlarini ham, jadvalga chiqaring: matndan aynan iqtibos, siz qanday tushundingiz, ishonch (aniq yoki [?]).
Ovozni matnga o‘girish o‘zbekcha taxminiy raqamlarni buzadi.
Raqam oldidagi «bir» ko‘pincha «taxminan» degani: «bir uch-to‘rt yuz ming» taxminan 300 000-400 000 degani, 1 300 000 emas.
«uch-to‘rt», «besh-o‘n» kabi oraliqlarni oraliq qilib qoldiring.
Gapga mos kelmaydigan raqamni (masalan, kichik do‘konda kuniga 1 300 000 ta buyurtma) [?] bilan belgilang.
Shubhali raqamni o‘zingiz «to‘g‘rilamang»: uni [?] bilan qoldiring.

2) Vazifalar ro‘yxati.
Xodim aytgan har bir alohida vazifani ajratib oling va aynan quyidagi ustunlar va kodlar bilan Markdown jadval qaytaring: B.1 Vazifa (fe’l bilan boshlang), B.2 Haftasiga necha marta, B.3 Har safar, daqiqa, B.4 Haftalik vaqt, soat, B.5 Ma’lumot qayerdan keladi, B.6 Natija kimga yoki qayerga yuboriladi, B.7 Qoida (Q) yoki fikr (F), B.8 Xatoning narxi (past / o‘rta / yuqori).
B.4 ni har bir qatorda hisobi bilan yozing, masalan «10 × 15 / 60 = 2,5».
Oxirida haftalik soatlar yig‘indisini ham hisobi bilan yozing.
Faqat xodim aytgan narsalardan foydalaning.
Aniq raqam aytilmagan bo‘lsa, eng yaxshi taxminingizni yozing va uni [?] bilan belgilang.
Turli vazifalarni birlashtirmang.
B.9 ustunini bo‘sh qoldiring: uni biznes egasi to‘ldiradi.

Jadvaldan keyin 3-5 banddan iborat ro‘yxatda yozing: har doim bir xil takrorlanadigan vazifalar, xodim ma’lumot kutib qoladigan joylar va xodim aytgan xatolar.
Oxirida xodimdan so‘rash kerak bo‘lgan savollarni sanang: har bir [?] uchun bittadan.
O‘zbek tilida javob bering.
```

## Shakl A: Xodim bilan suhbat

Fayl: `kit1-interviews/ism-form-a.md`

- Xodim: 
- Lavozim: 
- Sana: 
- Suhbatni o‘tkazdi: 
- [ ] Yozib olishga va yozuv yoki matni AI xizmatiga berilishiga roziman, audio 7 kunda o‘chiriladi; xodim imzosi: 

**Suhbat boshida ovoz chiqarib o‘qing:**

> [Ism] aka/opa, boshlashdan oldin bir narsani aytay.
> Takrorlanadigan ishlarning bir qismini yelkangizdan olish uchun ishingiz aslida qanday yurishini tushunmoqchiman.
> Bu sizni tekshirish emas: aytganlaringiz maoshingiz, ishingizni baholash yoki lavozimingiz haqidagi hech qanday qaror uchun ishlatilmaydi.
> Detallarni o‘tkazib yubormaslik uchun suhbatni telefonga yozib olmoqchiman.
> Yozuvni yoki uning matnini AI xizmatiga beraman: u ovozni matnga aylantiradi va vazifalar ro‘yxatini tuzishga yordam beradi.
> Ovozli faylni bir hafta ichida o‘chiraman.
> Matnni kompaniyada faqat men ko‘raman; vazifalar ro‘yxatining nusxasini sizga beraman, xohlagan joyini tuzatasiz.
> Yozib olmasdan, men qo‘lda yozib borsam ham bo‘ladi; qaydlarimni ham AI’ga bermasligimni xohlasangiz, ro‘yxatni o‘zim tuzaman.
> Mehnat kodeksiga ko‘ra, ma’lumotingizni AI xizmatiga faqat yozma roziligingiz bilan bera olaman, shuning uchun pastga imzo qo‘yishingizni so‘rayman.
> Istalgan payt to‘xtatishimiz mumkin.
> Qaysi biri sizga qulay: yozib olaymi yoki qo‘lda yozaymi?

Egasi uchun: Mehnat kodeksi 178-modda (lex.uz/mact/6257288) - xodim ma’lumoti uchinchi tomonga, AI xizmati ham, faqat uning yozma roziligi bilan beriladi.
Kompaniyangiz bunga tayanishidan oldin yurist tasdiqlasin.

### A.1 Odatdagi bir ish kuningiz qanday o‘tadi, ishga kelganingizdan to ketguningizgacha aytib bering.

Javob: 

### A.2 Hafta davomida eng ko‘p vaqtingizni oladigan uchta vazifa qaysi? Har biriga taxminan necha daqiqa ketadi?

Javob: 

### A.3 Qaysi vazifalarni har doim bir xil bajarasiz? Menga oxirgisini ko‘rsating.

Javob: 

### A.4 Qayerda ma’lumot kutib qolasiz yoki bir narsani boshqalardan qayta-qayta so‘raysiz?

Javob: 

### A.5 Eng ko‘p xatolar qayerda bo‘ladi? Ularni kim sezadi va bu xatolar qanchaga tushadi?

Javob: 

### A.6 Qaysi ishingiz sizning tajribangizni talab qiladi, ya’ni yangi kelgan xodim uni birinchi oyida eplay olmaydi?

Javob: 

### A.7 Agar ertaga sizga yordamchi berishsa, birinchi bo‘lib qaysi vazifani unga topshirardingiz?

Javob: 

## Shakl B: Vazifalar ro‘yxati

Fayl: `kit1-interviews/ism-form-b.md`

- Xodim: 
- Lavozim: 
- Bo‘lim: 
- Sana: 
- Xodim ko‘rib chiqdi: 

| B.1 Vazifa (fe’l bilan) | B.2 Haftasiga necha marta | B.3 Har safar, daqiqa | B.4 Haftalik vaqt, soat | B.5 Ma’lumot qayerdan keladi | B.6 Natija kimga yoki qayerga yuboriladi | B.7 Qoida Q / Fikr F | B.8 Xatoning narxi | B.9 Ertaga A/R/I/B |
|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |
|   |   |   |   |   |   |   |   |   |
|   |   |   |   |   |   |   |   |   |
|   |   |   |   |   |   |   |   |   |
|   |   |   |   |   |   |   |   |   |
|   |   |   |   |   |   |   |   |   |
|   |   |   |   |   |   |   |   |   |
|   |   |   |   |   |   |   |   |   |
|   |   |   |   |   |   |   |   |   |
|   |   |   |   |   |   |   |   |   |
|   |   |   |   |   |   |   |   |   |
| **Haftasiga jami soat** |   |   |   |   |   |   |   |   |

B.4 = B.2 x B.3 / 60.
B.7: Q - aniq qoida; F - tajriba va mulohaza talab qiladigan ish.
B.8: past, o‘rta, yuqori.
B.9: A agent, R robot, I inson, B birga.
[?] - taxmin: xodim bilan tekshiring.

## Tayyor matnlar

Ovoz chiqarib o‘qing yoki o‘z so‘zlaringiz bilan ayting.
Kvadrat qavsdagi joylarni o‘zingiz to‘ldiring.

### Jamoaga xabar

*Birinchi suhbatdan oldin: yig‘ilishda ayting, keyin shu matnni bo‘lim guruhiga yozing.*

Assalomu alaykum, jamoa.
Men AI bo‘yicha kursda o‘qiyapman va [bo‘lim] ishini yengillashtirish yo‘lini qidiryapman.
Buning uchun shu hafta 2-3 kishi bilan 20-30 daqiqadan gaplashaman: ish kuni qanday o‘tadi, qaysi ish ko‘p vaqt oladi, qayerda ma’lumot kutib qolasiz.
Maqsad ishni xaritaga tushirish, odamlarni almashtirish emas.
Aytganlaringiz maosh, baholash yoki lavozim haqidagi qarorlar uchun ishlatilmaydi.
Suhbatni yozib olaymi yoki qo‘lda yozaymi, har kim o‘zi tanlaydi.
Suhbat yozuvi yoki matni AI dasturiga faqat sizning yozma roziligingiz bilan beriladi (Mehnat kodeksi, 178-modda).
Har biringiz o‘z vazifalar ro‘yxatingizni ko‘rasiz va tuzatasiz.
Savolingiz bo‘lsa, menga to‘g‘ridan-to‘g‘ri ayting yoki shaxsan yozing.

### Yozma majburiyat (tavsiya etiladi)

*Ishga olish va bo‘shatish huquqi bor odam imzolaydi; bo‘limdagi har bir xodimga bittadan nusxa.*

[Bo‘lim] bo‘yicha AI yordamchisi loyihasi haqida majburiyatim.

1. [Sana, bugundan kamida olti oy keyin]gacha [bo‘lim]da hech kim bu loyiha yoki u tejagan vaqt sababli ishdan bo‘shatilmaydi, maoshi kamaytirilmaydi va pastroq lavozimga o‘tkazilmaydi.
2. Biz odamni emas, ishni o‘lchaymiz: raqamlar hech kimni baholash, jazolash yoki maoshini belgilash uchun ishlatilmaydi, har kim o‘z ishi haqidagi raqamlarni ko‘radi.
3. Yordamchi xato qilsa, men, [ism], javob beraman; xato yoki u haqda xabar bergani uchun hech kim ayblanmaydi.
4. Loyihani boshqaradigan xodim (ishga tushishidan oldin nomi aytiladi) va men yordamchini istalgan payt to‘xtata olamiz.
5. Tejalgan vaqt qayerga ketishini hech narsa o‘zgarishidan oldin shu ishdagi odamlar bilan birga hal qilamiz; kimningdir vazifasi o‘zgarsa, avval yozma kelishamiz.
6. Bu loyiha haqida menga istalgan payt, yolg‘iz ham savol berishingiz mumkin.

Imzo: ____________  Lavozim: ____________  Sana: ____________
