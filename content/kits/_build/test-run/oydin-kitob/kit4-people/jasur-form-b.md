# To‘plam 4 · B shakli: Mashg‘ulot vazifasi

Praktikum 3.0 · Xodimlarni yangi rolga tayyorlash · Fayl: `kit4-people/jasur-form-b.md`

- Xodim: Jasur (omborchi)
- Menejer: Sardor (rahbar)
- Sana: 2026-11-03

### B.1 Nimani tekshiradi (qanday natijani)

Robot Telegramda yuboradigan yig‘ish ro‘yxatini tekshiradi (`form-a-steps.md`, 9-qadam). Ro‘yxat Malika tasdiqlagan «to‘langan» buyurtmalardan tuziladi.
Yig‘ishdan oldin ro‘yxatdagi har bir kitob omborda borligini va nomi to‘g‘riligini tekshiradi.

### B.2 Nega aynan shu xodim: qaysi qobiliyati kerak

Omborni hammadan yaxshi biladi: qaysi kitob qaysi javonda ekanini yoddan aytadi. 2026-11-02 da yangi kelgan 40 ta kitobni 10 daqiqada joyiga qo‘ygan.
Kitob yo‘qligini yoki nomi chalkashligini jadvalga qaramasdan biladi.

### B.3 Mezonlar: to‘g‘ri natija bu ... / xato natija bu ...

- To‘g‘ri natija: ro‘yxatda faqat «to‘langan» deb tasdiqlangan buyurtmalar bor. Har bir kitob omborda bor va nomi bitta aniq kitobga to‘g‘ri keladi.
- Xato natija: ro‘yxatda kitob omborda yo‘q, nomi boshqa kitob bilan adashadi yoki tasdiqlanmagan buyurtma ro‘yxatga tushib qolgan.

Cheklist (har bir buyurtma uchun ha/yo‘q, bir buyurtmaga 1 daqiqadan kam):

1. Buyurtma raqami yozilganmi?
2. Kitob nomi bitta aniq kitobga to‘g‘ri keladimi (boshqasi bilan adashmaydimi)?
3. Kitob omborda bormi va soni yetadimi?
4. «Yo‘q» bo‘lsa: yig‘ishni boshlamasdan Malikaga aytildimi?

### B.4 Misollar: 3 ta yaxshi va 3 ta yomon, manbasi

Eslatma: Bu 6 ta misol agentning sinov to‘plami ham: har bir o‘zgarishdan keyin agent shularda tekshiriladi (kit4-people/test-set.md).

Jasur aka uchun bu misollarning ma’nosi: qaysi buyurtma yig‘ish ro‘yxatiga tushishi kerak, qaysi biri kerak emas.

| ID | Baho | Mazmuni | Yig‘ish ro‘yxatida bo‘lishi kerakmi |
|---|---|---|---|
| T1 | yaxshi | #1021, Click 185 000, mos keldi | ha, Malika tasdiqlagandan keyin |
| T2 | yaxshi | #1088, Payme 95 000, telefon bo‘yicha topildi | ha, Malika tasdiqlagandan keyin |
| T3 | yaxshi | #1102, farq 5 000, Sardorga uzatildi | yo‘q, Sardor hal qilguncha |
| T4 | yomon | #1063, Click 210 000 bor edi, «topilmadi» deyilgan | ha: to‘lov bor, kechikmasligi kerak edi |
| T5 | yomon | #1215, boshqa mijozning to‘lovi moslangan | yo‘q, Malika aniqlaguncha |
| T6 | yomon | #1310, buyurtma Sheets’da yo‘q edi | yo‘q, buyurtma kiritilguncha |

Ombor tomondagi misollar yo‘q: kitob yo‘qligi yoki nomi adashgani bo‘yicha real holat [?]. Sardor akadan 1-2 ta real misol so‘rab, sinov to‘plamiga T7, T8 deb qo‘shish tavsiya qilinadi.

### B.5 Muddat

2 hafta: suhbat kunidan boshlab.
Ko‘rib chiqish sanasi = suhbat sanasi + 14 kun (suhbatdan keyin `/kit4 suhbat jasur` bilan yoziladi).

### B.6 O‘sishni qanday o‘lchaymiz

1. Bitta yig‘ish ro‘yxatini tekshirish vaqti, daqiqa: 1-hafta va 2-hafta oxirida o‘lchanadi. Boshlang‘ich qiymat: [?].
2. Yig‘ishdan **oldin** topilgan muammoli buyurtmalar ulushi. Formula: oldin topilganlar / (oldin topilganlar + yig‘ish paytida yoki kuryerdan keyin chiqqanlar).

Bu raqamlar Jasurni emas, tekshirish ishini o‘lchaydi. Ular maosh yoki baholash uchun ishlatilmaydi.

### B.7 Natijani kim ko‘rib chiqadi

Sardor (rahbar).

### B.8 Suhbatdan: uning savollari va xavotirlari


### B.9 Nima deb kelishdik


## Mashq (30 daqiqa)

A.6 bo‘yicha o‘qish kerak emas. Bu dars emas, yangi ro‘yxat bilan tanishish uchun.

1. 5 daqiqa: T1-T3 ni ko‘rish. Qaysi biri yig‘ish ro‘yxatiga tushadi, qaysi biri yo‘q va nega?
2. 10 daqiqa: T4-T6 ni ko‘rish. Har birida ro‘yxatga tushishi kerakmidi yoki yo‘qmi, Jasur aka o‘zi aytadi.
3. 10 daqiqa: cheklist bilan bitta namunaviy yig‘ish ro‘yxatini omborda tekshirish. Ro‘yxatni Sardor aka bugungi buyurtmalardan tuzadi [?]. Ketgan vaqt yoziladi (B.6, 1-ko‘rsatkich).
4. 5 daqiqa: savollar.

## Suhbat rejasi

15 daqiqa, yolg‘iz, agent ishga tushishidan **oldin**. Sardor aka aytadi.

1. **Nima o‘zgaradi.** «Jasur aka, yig‘ish ro‘yxati endi Telegramda yordamchi dasturdan keladi. Unda faqat Malika opa tasdiqlagan buyurtmalar bo‘ladi. Siz yig‘ishdan oldin ro‘yxatni bir ko‘rib chiqasiz.»
2. **Nima o‘zgarmaydi.** «Maoshingiz, lavozimingiz va jamoangiz o‘zgarmaydi. Ombor, yig‘ish va kuryerga topshirish sizda qoladi.»
   Sardor akaga eslatma: yozma majburiyat imzolanmagan. Shuning uchun muddat aytmang va faqat o‘zingiz aniq bera oladigan va’dani bering.
3. **Nimani tekshiradi va nega aynan u.** «Kecha 40 ta yangi kitobni 10 daqiqada joyiga qo‘ydingiz. Omborda nima bor-yo‘qligini sizdan yaxshi hech kim bilmaydi. Ro‘yxatdagi kitob yo‘q bo‘lsa yoki nomi chalkash bo‘lsa, buni siz birinchi ko‘rasiz. Kuryer qaytib bormasligi uchun shuni yig‘ishdan oldin Malika opaga aytsangiz bo‘ldi.»
4. **Kutilayotgan xavotirlar va halol javoblar.**
   - «Endi menga ish ko‘payadimi?» → «Bitta ro‘yxatni ko‘rib chiqish qancha vaqt olishini 2 hafta birga o‘lchaymiz. Ko‘p vaqt olsa, cheklistni birga o‘zgartiramiz.»
   - «Ro‘yxat dasturdan kelsa, savolni kimga beraman?» → «Avvalgidek Malika opaga. Ro‘yxatni u tasdiqlaydi.»
   - «Dastur meni kuzatadimi?» → «Yo‘q. U faqat to‘lovlarni yozib boradi. Xodimlar nima deganini, qachon onlayn bo‘lganini yoki qanchalik tez javob berganini yozmaydi.»
5. **Jasur akadan so‘raladigan 2 ta savol.**
   - «Nima sizga yordam beradi?»
   - «Qayerda dastur xato qilishi mumkin deb o‘ylaysiz?»
