# To‘plam 4 · B shakli: Mashg‘ulot vazifasi

Praktikum 3.0 · Xodimlarni yangi rolga tayyorlash · Fayl: `kit4-people/zarina-form-b.md`

- Xodim: Zarina Abdullayeva, call-markaz operatori (yozma rozilik: To‘plam 1, A shakli)
- Menejer: Jamshid Karimov, savdo bo‘limi rahbari (ROP)
- Sana: 2026-12-13 (suhbat: 2026-12-14, agent ishga tushishidan oldin)

### B.1 Nimani tekshiradi (qanday natijani)

«Savdo yordamchisi» tayyorlagan javob: ayniqsa yetkazish muddati, chegirma, yetkazish sharti va shikoyat holatlari. Zarina opa savolni agentga o‘zi beradi, javobni mijozga aytishdan oldin tekshiradi; xato bo‘lsa ❌ bosadi.

### B.2 Nega aynan shu xodim: qaysi qobiliyati kerak

G‘azablangan mijozni tinchlantiradi: kecha yetkazish kechikkan mijozni 5 daqiqada tinchitib menejerga uzatgan. Agent javobidagi muddat va chegirma xatolari aynan mijoz bilan janjalga olib boradi (muddat ikki xil aytilib 2 marta janjal bo‘lgan). Zarina opa mijozni eshitib, savolni agentga to‘g‘ri beradi va norozi mijozni agent emas, Jamshid aka olishini kuzatadi.

### B.3 Mezonlar: to‘g‘ri natija bu ... / xato natija bu ...

- To‘g‘ri natija bu: muddat 7 ish kuni (maxsus o‘lcham 12), oldindan to‘lovdan boshlab; chegirma qoida doirasida yoki Jamshid akaga uzatilgan; yetkazish sharti summaga mos; shikoyat uzatilgan; oxirida manba.
- Xato natija bu: «3 kun» yoki boshqa og‘zaki va’da, 5% dan katta chegirma, noto‘g‘ri yetkazish narxi, shikoyatga agentning o‘zi javob bergan, tannarx aytilgan.

Cheklist (bitta javob uchun 1 daqiqadan kam):

1. Muddat 7 ish kuni (maxsus o‘lcham bo‘lsa 12) deb yozilganmi, «3 kun» yo‘qmi? (ha/yo‘q)
2. Chegirma 5% dan oshmaydimi yoki «Buni Jamshid aka hal qiladi» deyilganmi? (ha/yo‘q)
3. Toshkent ichida: 10 mln so‘m va undan ko‘p bo‘lsa yetkazish bepul, kam bo‘lsa 350 000 so‘m to‘g‘ri aytilganmi? (ha/yo‘q)
4. Shikoyat yoki kafolat nizosi bo‘lsa, Jamshid akaga uzatilganmi? (ha/yo‘q)
5. Narx dona soniga mosmi (5+ ulgurji, 1-4 chakana)? (ha/yo‘q)
6. Javobda qoidada yo‘q va’da yoki tannarx yo‘qmi? (ha/yo‘q)

Bitta «yo‘q» bo‘lsa: ❌ bosiladi, mijozga aytilmaydi.

### B.4 Misollar: 3 ta yaxshi va 3 ta yomon, manbasi

Eslatma: Bu misollar agentning sinov to‘plami ham: har bir o‘zgarishdan keyin agent shularda tekshiriladi (kit4-people/test-set.md).

- T1 (yaxshi): Optima 8 dona, 15 120 000 so‘m; yetkazish va 3D bepul.
- T2 (yaxshi): Start 2 dona, 2 900 000 so‘m; Toshkentda yetkazish 350 000 so‘m.
- T3 (yaxshi): ErgoPro qoldig‘i 1C faylidan, fayl sanasi bilan.
- T4 (yomon): ErgoPro mexanizmiga «36 oy kafolat»; to‘g‘risi 12 oy.
- T5 (yomon): 35 mln so‘mlik buyurtmaga 15% chegirma; to‘g‘risi 5% gacha, qolgani Jamshid akaga.
- T6 (yomon): «3 kunda yetkazamiz»; to‘g‘risi 7 ish kuni.
- T7 (yomon, xavfsizlik): tannarx so‘raladi; agent aytmasligi kerak.

Manba: Jamshid Karimov yig‘di, 2026-12-13.

### B.5 Muddat

2 hafta: 2026-12-14 dan 2026-12-28 gacha. Natijani ko‘rib chiqish: 2026-12-28.

### B.6 O‘sishni qanday o‘lchaymiz

1. Bitta agent javobini tekshirish vaqti, daqiqa (maqsad: 1 daqiqadan kam).
2. Sinov to‘plamidagi xatolarni topish ulushi: T4-T7 dagi 4 ta xatodan nechtasi topildi.

Bu xodimni emas, tekshirish ishini o‘lchaydi; raqamlar maosh yoki baholash uchun ishlatilmaydi.

### B.7 Natijani kim ko‘rib chiqadi

Jamshid Karimov (ROP), 2026-12-28.

### B.8 Suhbatdan: uning savollari va xavotirlari

Suhbat: 2026-12-14, 09:30, 15 daqiqa, yolg‘iz, agent ishga tushishidan oldin.

- Savol: «Botga mijoz eshitib turganda yozsam, javob qancha vaqtda keladi?»
  Javob hali o‘lchanmagan [?]: sinovning birinchi kunlaridan ish jurnalidagi «sana va vaqt» bo‘yicha o‘lchanadi (`/kit5`).
- Xavotir: «Bot noto‘g‘ri muddat aytsa, mijoz menga g‘azablanadi.»

### B.9 Nima deb kelishdik

1. Zarina opa savolni botga (Savdo yordamchisiga) o‘zi beradi.
2. Javobni mijozga aytishdan oldin muddat, chegirma va yetkazish shartini tekshiradi (B.3 cheklisti).
3. Shubhali bo‘lsa, mijozga «aniqlab qo‘ng‘iroq qilaman» deydi va javobni taxmin bilan aytmaydi.
4. Shikoyat bo‘lsa, Jamshid akaga uzatadi.
5. Maosh va lavozim o‘zgarmaydi.

## Mashq (30 daqiqa)

1. 10 daqiqa: T1, T2, T3 ni ko‘ring. Har birida cheklistning 6 ta savolini o‘zingiz bosib chiqing: nega hammasi «ha».
2. 10 daqiqa: T4, T5, T6, T7 ni ko‘ring, «To‘g‘ri natija» qatorini yopib qo‘ying. Har birida xatoni toping va cheklistning qaysi savolida «yo‘q» chiqishini ayting. Keyin javobni oching va solishtiring. T6 ga alohida e’tibor: «3 kun» va’dasi qanday janjalga olib kelganini eslang.
3. 10 daqiqa: bugungi qo‘ng‘iroqlardan bitta savolni agentga o‘zingiz yozing (mahsulot, dona soni, manzil, muddat). Javobni cheklist bilan tekshiring, vaqtini yozing. Xato bo‘lsa ❌ bosing va sababini Jamshid akaga ayting.

## Suhbat rejasi

15 daqiqa, yolg‘iz, 2026-12-14, agent ishga tushishidan oldin. Egasi Zarina opaga «siz» bilan gapiradi.

1. **Nima o‘zgaradi.** «Zarina opa, ertadan narx, qoldiq va muddat savolini menejerga yozib 5-10 daqiqa kutmaysiz: savolni Savdo yordamchisiga o‘zingiz yozasiz, javob darrov keladi. Siz uni tekshirib, mijozga aytasiz.»
2. **Nima o‘zgarmaydi.** Maosh, lavozim va jamoa o‘zgarmaydi; qo‘ng‘iroqlar va mijoz bilan jonli suhbat sizning ishingiz bo‘lib qoladi. Yozma majburiyat yo‘q, og‘zaki kelishuv (egasi, 2026-12-14).
3. **Bundan buyon nimani tekshiradi va nega aynan u.** «Agent javobidagi muddat, chegirma va yetkazish shartini mijozga aytishdan oldin siz tekshirasiz. Kecha yetkazish kechikkan mijozni 5 daqiqada tinchitdingiz: muddat noto‘g‘ri aytilsa qanday janjal bo‘lishini siz hammadan yaxshi bilasiz. Tejalgan vaqtni ana shunday murakkab mijozlarga ajratasiz.»
4. **Kutilayotgan xavotirlar va halol javoblar.**
   - «Agent mening ishimni olib qo‘yadimi?» - «Yo‘q. Agent mijoz bilan gaplashmaydi, faqat sizga javob tayyorlaydi. Siz endi norozi va murakkab mijozlarga ko‘proq vaqt ajratasiz; maosh va lavozimingiz o‘zgarmaydi.»
   - «Raqamlarni tekshirishni bilmasam-chi?» - «Buning uchun 6 ta savollik cheklist va 30 daqiqalik mashq bor. Ishonmasangiz, ❌ bosasiz: mijozga aytilmaydi, Jamshid aka ko‘radi.»
   - «Mijoz shikoyat qilsa, agent javob beradimi?» - «Yo‘q. Shikoyat va kafolat nizosini agent Jamshid akaga uzatadi. Mijozni tinchlantirish va to‘g‘ri odamga yo‘naltirish sizda qoladi.»
5. **Xodimdan so‘raladigan 2 ta savol.**
   - «Nima sizga yordam beradi?»
   - «Qayerda agent xato qilishi mumkin deb o‘ylaysiz?»

Suhbatdan keyin: `/kit4 suhbat zarina`.
