# To‘plam 4 · B shakli: Mashg‘ulot vazifasi

Praktikum 3.0 · Xodimlarni yangi rolga tayyorlash · Fayl: `kit4-people/malika-form-b.md`

- Xodim: Malika (sotuv operatori)
- Menejer: Sardor (rahbar)
- Sana: 2026-11-03

### B.1 Nimani tekshiradi (qanday natijani)

To‘lov yordamchisi (agent) har kuni ertalab tuzadigan solishtirish ro‘yxatini tekshiradi. Ro‘yxatda kechagi Click va Payme to‘lovlari Sheets’dagi buyurtmalar bilan solishtirilgan bo‘ladi (`form-a-steps.md`, 4-8-qadamlar).
Tekshirgandan keyin «to‘langan» belgisini tasdiqlaydi. Agent qoralagan chek so‘rash xabarini o‘qib, mijozga o‘zi yuboradi.

### B.2 Nega aynan shu xodim: qaysi qobiliyati kerak

Raqamdagi xatoni tez ko‘radi: o‘tgan seshanba Payme’dan 185 000 o‘rniga 158 000 so‘m tushganini o‘zi payqagan.
Mijoz bilan muloyim gaplashadi: agent qoralagan xabarni mijozga yuborishdan oldin u o‘qib, kerak bo‘lsa tuzatadi.

### B.3 Mezonlar: to‘g‘ri natija bu ... / xato natija bu ...

- To‘g‘ri natija: har bir to‘lov uchun bitta holat bor. Bu «mos keldi» (buyurtma raqami bilan) yoki «mos kelmadi» (sababi bilan). Belgi faqat aniq mos kelgan qatorlarga taklif qilinadi. Shubhali qatorlar odamga uzatilgan.
- Xato natija: to‘lov boshqa buyurtmaga moslangan; bor to‘lov «topilmadi» deyilgan; kiritilmagan buyurtma «to‘lovsiz» deyilgan; 5 000 so‘m va undan katta farq Sardorga uzatilmagan.

Cheklist (har bir qator uchun ha/yo‘q, bir qatorga 1 daqiqadan kam):

1. Qatorda bitta holat bormi: «mos keldi» va buyurtma raqami, yoki «mos kelmadi» va sababi?
2. Ro‘yxatdagi to‘lovlar soni va jami summasi eksportdagi bilan bir xilmi? (kuniga bir marta, ro‘yxat boshida)
3. Telefon bo‘yicha moslangan bo‘lsa: shu telefon bilan boshqa ochiq buyurtma yo‘qmi? (T5)
4. Summa farqi 5 000 so‘m va undan katta bo‘lsa, «Sardorga» belgisi bormi? (T3)
5. Sheets’da buyurtma yo‘q bo‘lsa, «Buyurtma topilmadi» deb yozilganmi, «to‘lovsiz» emasmi? (T6)
6. Chek so‘rash qoralamasi faqat eksportda haqiqatan topilmagan to‘lov uchunmi? (T4)

Hammasi «ha» bo‘lsa, belgini tasdiqlaydi. Bitta «yo‘q» bo‘lsa ham, tasdiqlamaydi va qatorni o‘zi hal qiladi yoki Sardorga uzatadi.

### B.4 Misollar: 3 ta yaxshi va 3 ta yomon, manbasi

Eslatma: Bu 6 ta misol agentning sinov to‘plami ham: har bir o‘zgarishdan keyin agent shularda tekshiriladi (kit4-people/test-set.md).

| ID | Baho | Mazmuni |
|---|---|---|
| T1 | yaxshi | #1021, Click 185 000, izohda raqam bor, summa mos → mos keldi |
| T2 | yaxshi | #1088, Payme 95 000, izohda raqam yo‘q → telefon bo‘yicha topildi |
| T3 | yaxshi | #1102, Click 120 000, Sheets 125 000, farq 5 000 → Sardorga uzatildi |
| T4 | yomon | #1063, Click 210 000 bor edi, lekin «topilmadi» deb mijozga 2 marta yozilgan |
| T5 | yomon | #1215, Payme 145 000: boshqa mijozning to‘lovi bir xil telefon sabab moslangan |
| T6 | yomon | #1310, Click 85 000: buyurtma kiritilmagan edi, «to‘lovsiz» deb belgilangan |

Manba: Sardor aka, 2026-11-03; voqealar 2026-10-13 dan 2026-10-28 gacha.

### B.5 Muddat

2 hafta: suhbat kunidan boshlab.
Ko‘rib chiqish sanasi = suhbat sanasi + 14 kun (suhbatdan keyin `/kit4 suhbat malika` bilan yoziladi).

### B.6 O‘sishni qanday o‘lchaymiz

1. Bitta qatorni tekshirish vaqti, daqiqa: mashqda va 1-hafta oxirida, 2-hafta oxirida o‘lchanadi. Boshlang‘ich qiymat: [?] (mashqda o‘lchanadi).
2. Sinov to‘plamidagi xatolarni topish ulushi: T4-T6 dagi 3 ta xatodan nechtasi topildi. Formula: topilgan / 3.

Bu raqamlar Malikani emas, tekshirish ishini o‘lchaydi. Ular maosh yoki baholash uchun ishlatilmaydi.

### B.7 Natijani kim ko‘rib chiqadi

Sardor (rahbar).

### B.8 Suhbatdan: uning savollari va xavotirlari


### B.9 Nima deb kelishdik


## Mashq (30 daqiqa)

Sardor aka bilan birga, agent ishga tushishidan oldin.

1. 5 daqiqa: T1-T3 ni ko‘rish. Har birida to‘g‘ri natija nega to‘g‘riligini Malika opa o‘z so‘zi bilan aytadi.
2. 10 daqiqa: T4-T6 ni «Nega yomon» qatorini yopib ko‘rish. Malika opa har birida xatoni topadi va cheklistning qaysi savoli uni ushlashini aytadi.
3. 10 daqiqa: cheklist bilan bitta yangi ro‘yxatni tekshirish. Ro‘yxat sifatida kechagi kun eksportidan bir necha qator olinadi [?] (Sardor aka tayyorlaydi). Bitta qatorga ketgan vaqt yozib boriladi (B.6, 1-ko‘rsatkich).
4. 5 daqiqa: savollar va cheklistda nimani o‘zgartirish kerakligi.

## Suhbat rejasi

15 daqiqa, yolg‘iz, agent ishga tushishidan **oldin**. Sardor aka aytadi.

1. **Nima o‘zgaradi.** «Malika opa, to‘lovlarni endi siz qo‘lda solishtirmaysiz. Yordamchi dastur har kuni ertalab ro‘yxatni tayyorlaydi, siz uni tekshirasiz va «to‘langan» belgisini o‘zingiz tasdiqlaysiz.»
2. **Nima o‘zgarmaydi.** «Maoshingiz, lavozimingiz va jamoangiz o‘zgarmaydi. Mijozlar bilan gaplashish ham sizda qoladi. Yordamchi mijozga hech narsa yubormaydi.»
   Sardor akaga eslatma: yozma majburiyat imzolanmagan. Shuning uchun muddat aytmang va faqat o‘zingiz aniq bera oladigan va’dani bering.
3. **Nimani tekshiradi va nega aynan u.** «Siz o‘tgan seshanba 185 000 o‘rniga 158 000 tushganini o‘zingiz payqadingiz. Yordamchi ham shunaqa xato qilishi mumkin, uni topadigan odam esa sizsiz. «To‘langan» belgisi faqat sizning tasdiqingiz bilan qo‘yiladi.»
4. **Kutilayotgan xavotirlar va halol javoblar.**
   - «Bu dastur mening ishimni olib qo‘yadimi?» → «Yo‘q. U solishtirishda yordam beradi, qaror esa sizda: siz tasdiqlamasangiz, belgi qo‘yilmaydi. Tejalgan vaqtni mijozlarga ko‘proq ajratasiz.»
   - «Dastur meni kuzatadimi?» → «Yo‘q. U faqat to‘lovlarni yozib boradi. Xodimlar nima deganini, qachon onlayn bo‘lganini yoki qanchalik tez javob berganini yozmaydi (yo‘riqnoma, B.7).»
   - «Dastur xato qilsa, men javob beramanmi?» → «Javobgar menman (Sardor). Sizdan so‘raladigan narsa: shubhali qatorni tasdiqlamaslik. 5 000 so‘m va undan katta farq menga keladi.»
5. **Malika opadan so‘raladigan 2 ta savol.**
   - «Nima sizga yordam beradi?»
   - «Qayerda dastur xato qilishi mumkin deb o‘ylaysiz?»
6. Oxirida: To‘plam 1 dagi vazifalar ro‘yxatini (`kit1-interviews/malika-form-b.md`) ko‘rsatib, raqamlarni tasdiqlatish.
