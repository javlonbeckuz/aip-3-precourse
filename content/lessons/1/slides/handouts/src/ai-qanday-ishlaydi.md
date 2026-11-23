# AI qanday ishlaydi: rahbar uchun qisqa qo‘llanma

1-dars tarqatmasi.
Praktikum 2.0 dagi «AI anatomiyasi» va «Tokenlar iqtisodiyoti» tarqatmalarining yangilangan, qisqartirilgan nusxasi.
Eskirgan model nomlari va narxlar olib tashlandi: ular endi sanasi yozilgan «Bu hafta AI’da» varag‘ida.

**Qanday foydalanish:** darsdan keyin bir marta o‘qing, keyin oxiridagi «O‘zingizni tekshiring» ro‘yxatini belgilang.
Belgilay olmagan bandingiz bo‘lsa, shu bo‘limni qayta o‘qing yoki stol chatida mentoringizdan so‘rang.

## 1. Uch qavat

| Qavat | Nima | Rahbar savoli |
| --- | --- | --- |
| Platformalar | Siz ishlatadigan ilovalar: ChatGPT, Claude, Gemini | Qaysi ilova menga kerak? |
| Modellar | Matn yozadigan «miya»: Claude, GPT, Gemini, DeepSeek, Qwen | Qaysi model, qancha turadi? |
| Infratuzilma | Chiplar, elektr, data markazlar | Narx va kirish nega o‘zgaradi? |

Chip zanjiri bir qatorda: Nvidia chipni loyihalaydi, Tayvandagi TSMC ishlab chiqaradi, laboratoriyalar data markazda modelni o‘qitadi, ilovalar sizga sotadi.
Chip arzonlashsa, narx tushadi; siyosat o‘zgarsa, kirish o‘zgaradi.

## 2. Xabaringiz qayerga boradi

| Holat | Yo‘l | Natija |
| --- | --- | --- |
| Bulut (Claude, ChatGPT, Gemini) | Noutbuk → internet → AQSh yoki Yevropadagi data markaz → javob | Ma’lumot chet elga ketadi |
| Toshkentdagi server + chet el modeli | Noutbuk → Toshkent server → chet el API → javob | Baribir chet elga ketadi |
| O‘z serveringiz + ochiq vaznli model | Noutbuk → sizning server (model ichida) → javob | Ma’lumot ichkarida qoladi |

Qonun (2026):

- Oddiy shaxsiy ma’lumot ro‘yxatdagi 49 ta davlat va hududga yuborilishi mumkin (Vazirlar Mahkamasining 415-qarori, 29.07.2026); Germaniya shartsiz ro‘yxatda.
- AQSh faqat EU-US Data Privacy Framework sertifikati bor kompaniyalar uchun; Anthropic (Claude) maxfiylik siyosatida DPF ko‘rsatilmagan, shuning uchun «Claude uchun AQSh ro‘yxatda» deb bo‘lmaydi.
- Biometrik, genetik ma’lumot va aloqa abonentlari ma’lumoti faqat O‘zbekistonda saqlanadi (ZRU-1125, 26.03.2026).
- Xodim ma’lumotini uchinchi tomonga, jumladan AI xizmatiga, faqat uning yozma roziligi bilan berish mumkin (Mehnat kodeksi, 178-modda).
- AI yordamida shaxsiy ma’lumotni noqonuniy qayta ishlash uchun 50-100 BHM, taxminan 22-44 mln so‘m jarima (MJtK 46-2-modda).

Manbalar: lex.uz.
Bu yuridik maslahat emas: kompaniyangiz bunga tayanishdan oldin yurist tasdiqlashi kerak.

**Baraka misolida:** 3-4-darsda quriladigan «Savdo yordamchisi» boti Toshkentdagi serverda turadi, lekin javobni chet eldagi model yozadi (2-qator).
Shuning uchun botga narxlar, qoldiq va qoidalar beriladi, mijozlarning shaxsiy ma’lumoti berilmaydi.

**Chatga yozishdan oldin uch savol:** bu ma’lumot kerakmi, ismsiz qilsa bo‘ladimi, odam rozimi?

## 3. Model taxmin qiladi

Model internetdagi ulkan matndan qaysi so‘zdan keyin qaysi so‘z kelishini o‘rgangan.
U javobni bilmaydi, eng ehtimolli davomini yozadi.
«1 dan 10 gacha son ayt» desangiz, ko‘p modellar 7 deydi: bu tanlov emas, taxmin.
Shuning uchun raqam, sana va summani doim tekshiring.

## 4. Token: nimaga to‘laysiz

Model matnni token deb ataladigan bo‘laklarga bo‘ladi va narx tokenda hisoblanadi.
2026-yil 3-noyabrda bir xil biznes gapini 7 ta tokenizatorda o‘lchadik:

| Til | Token soni | Inglizchaga nisbatan |
| --- | --- | --- |
| O‘zbekcha | 44-51 | taxminan 1,8-2,1 barobar |
| Ruscha | 33-55 | modelga qarab juda farq qiladi |
| Inglizcha | 24-26 | asos |

Bitta raqamni yodlamang: farq modelga qarab har xil, o‘zingiz o‘lchang (dars sahifasi: demos/tokenizer).

| Token turi | Nima | Narxi |
| --- | --- | --- |
| Kirish | Siz yuborgan matn va fayllar | Eng arzon |
| Chiqish | Model yozgan javob | Kirishdan bir necha barobar qimmat |
| Fikrlash | Javobdan oldingi «o‘ylash» | Chiqish narxida |
| Kesh | Qayta o‘qilgan matn | Ancha arzon |

**Bitta vazifa qoidasi:** token narxiga emas, bajarilgan bitta vazifa narxiga qarang.
Qimmat model vazifani qisqa javob bilan hal qilishi, arzon model esa uzoq «o‘ylab» ko‘p token sarflashi mumkin.

## 5. Kontekst oynasi: dastarxon

Model bitta suhbatda ushlab tura oladigan matn hajmi.
Har gapingiz dastarxonga yangi likopcha; to‘lsa, chetidagi narsa tushib ketadi.
Uzun chat oyna to‘lishidan ancha oldin xiralashadi: boshida aytgan qoidangizni unutadi.

- Yangi vazifa: yangi chat.
- Mavzu o‘zgarsa, eski chatdan qisqa xulosa olib, yangisiga o‘ting.
- 500 betlik hujjatni oddiy chatga tashlamang: buning uchun Gemini Notebook bor.

## 6. Qaysi model qachon

| Daraja | Qachon | Claude’da |
| --- | --- | --- |
| Arzon va tez | Saralash, qisqa javob, ko‘p takrorlanadigan ish | Haiku |
| Muvozanatli | Kundalik matn, jadval, tahlil | Sonnet |
| Kuchli | Reja, murakkab tahlil, xato qimmat bo‘lgan ish | Opus, Fable |

Effort (o‘ylash darajasi): ko‘proq o‘ylasa, sifat oshadi, lekin sekin va qimmat.

**Frontier yoki ochiq vaznli?**
Frontier (Claude, GPT, Gemini) faqat ishlab chiqaruvchi orqali ishlaydi va murakkab fikrlash hamda o‘zbek tilida hozircha kuchliroq.
Ochiq vaznli model (DeepSeek, Qwen, Kimi, GLM) fayli e’lon qilingan: o‘z serveringizda ishlatib, ma’lumotni ichkarida saqlash mumkin; oddiy saralash va qoralama uchun ko‘pincha yetarli va ancha arzon.
DeepSeek saytidagi chat esa ma’lumotni Xitoyda saqlaydi: «ochiq» degani sayt maxfiy degani emas.

## 7. Hisob-kitobni AI’ga emas, formulaga bering

| | Formula (Excel, 1C, dastur) | AI |
| --- | --- | --- |
| Qoida | 100 × 10 har doim 1000 | Ehtimolga qarab taxmin |
| Xato qilsa | Katak qizil bo‘ladi, ko‘rinadi | Ishonch bilan noto‘g‘ri javob beradi |
| Nima uchun | Hisob, summa, hisobot | Tahlil, xulosa, xat, saralash |

To‘g‘ri tartib: ma’lumot bazangiz (1C, CRM, jadval) → formula yoki dastur hisoblaydi → AI tushuntiradi, saralaydi, yozadi.

## O‘zingizni tekshiring

- [ ] Uch qavatni chizib, har biriga bitta savol ayta olaman.
- [ ] Claude’ga yozgan xabarim qayerga borishini va qonun nima deyishini bilaman.
- [ ] O‘zbekcha nega ko‘proq token olishini va buni qanday o‘lchashni bilaman.
- [ ] Yangi vazifa uchun nega yangi chat ochishni tushuntira olaman.
- [ ] Ikki xil vazifa uchun model darajasini tanlay olaman.
