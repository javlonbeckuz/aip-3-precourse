# To‘plam 2 · A shakli: Jarayonlarni baholash

Praktikum 3.0 · Qaysi jarayondan boshlaymiz? · Fayl: `kit2-scoring/form-a-scoring.md`

Shu faylni to‘ldiring yoki Claude Code’da /kit2 ni ishga tushiring: u siz bilan birga to‘ldiradi.

- Bo‘lim: Savdo bo‘limi
- Baholadi: Claude (qoralama, bo‘lim boshlig‘i tasdiqlashi kerak)
- Sana: 

| # | A.1 Jarayon (boshlanishi - natijasi) | A.2 Takrorlanishi | A.3 Ketadigan vaqt | A.4 Aniq qoidasi bor | A.5 Ma’lumot raqamli | A.6 Xatosi arzon | A.7 Mijozga ta’siri | A.8 Qiymat | A.9 Osonlik |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Narx, qoldiq, muddat, chegirma savoli keldi - mijozga to‘g‘ri javob yozildi | 5 | 5 | 4 | 3 | 1 | 5 | 15 (5+5+5) | 8 (4+3+1) |
| 2 | Lid keldi (qo‘ng‘iroq) - kartochka to‘ldirilib, sotuvchi mijoz bilan bog‘landi | 5 | 5 | 4 | 3 | 3 | 5 | 15 (5+5+5) | 10 (4+3+3) |
| 3 | KP so‘raldi - KP yuborilib, ertasi kuni qayta qo‘ng‘iroq qilindi | 4 | 3 | 4 | 3 | 1 | 5 | 12 (4+3+5) | 8 (4+3+1) |
| 4 | Chegirma so‘raldi - yozma ruxsat berildi yoki rad etildi | 4 | 2 | 3 | 4 | 1 | 3 | 9 (4+2+3) | 8 (3+4+1) |
| 5 | AmoCRM bosqichi o‘zgardi - yozuv yangilandi, «qizil» vazifalar yopildi | 5 | 3 | 5 | 5 | 3 | 2 | 10 (5+3+2) | 13 (5+5+3) |
| 6 | Kun yoki hafta tugadi - hisobot rahbarga yuborildi | 4 | 3 | 5 | 5 | 4 | 1 | 8 (4+3+1) | 14 (5+5+4) |
| 7 | Yangi sotuvchi savol berdi - javob oldi | 3 | 2 | 2 | 4 | 3 | 1 | 6 (3+2+1) | 9 (2+4+3) |
| 8 |   |   |   |   |   |   |   |   |   |

- A.2: 1 ball - oyiga bir marta … 5 ball - kuniga bir necha marta
- A.3: 1 ball - haftasiga bir necha daqiqa … 5 ball - haftasiga 10 soatdan ko‘p
- A.4: 1 ball - har bir holat har xil … 5 ball - har doim bir xil qadamlar
- A.5: 1 ball - qog‘ozda yoki odamlar yodida … 5 ball - allaqachon tizim yoki jadvalda
- A.6: 1 ball - xato pul yoki ishonchni yo‘qotadi … 5 ball - xatoni sezish va to‘g‘rilash oson
- A.7: 1 ball - faqat ichki jarayon … 5 ball - mijoz buni kutib turadi

## Jarayonga kirgan vazifalar va haftalik soat

Manba: `kit1-interviews/*-form-b.md`, B.4 ustuni.
Fayl:qator formatida yozilgan.

| # | Vazifalar (fayl:qator, B.4 soat) | Haftalik soat hisobi |
|---|---|---|
| 1 | madina:15 (6,0), madina:18 (2,5), madina:19 (0,8), madina:21 (1,5), malika:16 (3,0), malika:22 (0,8), jamshid:15 (3,2) | 6,0 + 2,5 + 0,8 + 1,5 + 3,0 + 0,8 + 3,2 = 17,8 |
| 2 | madina:16 (5,4), madina:17 (3,3), jamshid:21 (1,5), malika:15 (1,3) | 5,4 + 3,3 + 1,5 + 1,3 = 11,5 |
| 3 | malika:17 (1,0), malika:18 (3,3), malika:19 (0,8) | 1,0 + 3,3 + 0,8 = 5,1 |
| 4 | malika:21 (0,5), jamshid:16 (1,0) | 0,5 + 1,0 = 1,5 |
| 5 | malika:20 (2,5), jamshid:18 (2,0) | 2,5 + 2,0 = 4,5 |
| 6 | madina:20 (2,0), jamshid:17 (2,0) | 2,0 + 2,0 = 4,0 |
| 7 | jamshid:20 (1,5) | 1,5 |

Jarayonlarga kirgan jami: 17,8 + 11,5 + 5,1 + 1,5 + 4,5 + 4,0 + 1,5 = 45,9 soat.
Kirmagan (odam ishi, I): jamshid:19 (6,0, yirik muzokara) va malika:23 (10,5, kunlik sotuv qo‘ng‘iroqlari), jami 16,5 soat.
Tekshiruv: 45,9 + 16,5 = 62,4 = 17,2 (Jamshid) + 21,5 (Madina) + 23,7 (Malika).

A.3 uchun xarita (shkalada faqat chetki ballar bor, oralig‘i taxmin):
1 ball - 1 soatdan kam; 2 ball - 1 dan 3 soatgacha; 3 ball - 3 dan 6 soatgacha; 4 ball - 6 dan 10 soatgacha; 5 ball - 10 soatdan ko‘p.

## Ballar sababi

B shakllarida [?] belgili raqam yo‘q, shuning uchun hech bir ball [?] bo‘lmadi.
Soatbay haq [?] bu jadvalda ishlatilmadi.

### 1. Narx, qoldiq, muddat, chegirma savoliga javob

- A.2 = 5: kuniga 12 (Madina), 8 (Jamshid), 5 (Malika) savol.
- A.3 = 5: 17,8 soat, 10 dan ko‘p.
- A.4 = 4: narx va muddat rasmiy hujjatda bor, chegirma qismi fikr talab qiladi.
- A.5 = 3: prays-list PDF bor, qoldiq Otabek akadan so‘raladi.
- A.6 = 1: B.8 yuqori: noto‘g‘ri narx yoki «3 kunda yetkazamiz» va’dasi.
- A.7 = 5: mijoz javobni kutib turadi.

### 2. Lidni qabul qilish va rasmiylashtirish

- A.2 = 5: kuniga 9 qo‘ng‘iroq va 8-9 kartochka.
- A.3 = 5: 11,5 soat, 10 dan ko‘p.
- A.4 = 4: 3 ta shart va kartochka maydonlari aniq, suhbatning o‘zi odamda.
- A.5 = 3: ma’lumot telefon suhbatidan keladi, AmoCRM’ga qo‘lda kiritiladi.
- A.6 = 3: B.8 o‘rta: yaxshi lid «sifatsiz» deb belgilansa yo‘qoladi.
- A.7 = 5: 10 daqiqa qoidasi, mijoz qo‘ng‘iroq kutadi.

### 3. KP tayyorlash va qayta qo‘ng‘iroq

- A.2 = 4: haftasiga 4 KP va 8 qayta qo‘ng‘iroq, deyarli har kuni.
- A.3 = 3: 5,1 soat.
- A.4 = 4: KP qadamlari bir xil, 3D o‘lcham va qayta qo‘ng‘iroq fikr talab qiladi.
- A.5 = 3: prays-list PDF va AmoCRM bor, o‘lchov qog‘ozda.
- A.6 = 1: B.8 yuqori: KPdagi xato narx shartnomaga o‘tadi.
- A.7 = 5: KP mijozga boradi.

### 4. Chegirma uchun yozma ruxsat

- A.2 = 4: haftasiga 3 ta so‘rov (Malika) va 6 ta ko‘rib chiqish (Jamshid), taxminan kuniga bitta.
- A.3 = 2: 1,5 soat.
- A.4 = 3: chegara aniq (5% va 10%), lekin qaror ROPda qoladi (F).
- A.5 = 4: so‘rov va buyurtma summasi yozma, Telegram va AmoCRM’da.
- A.6 = 1: B.8 yuqori: pulga tegadi.
- A.7 = 3: mijoz chegirma javobini bilvosita kutadi.

### 5. AmoCRM yozuvlarini yangilash va eslatish

- A.2 = 5: kuniga 25 ta yangilash (Malika).
- A.3 = 3: 4,5 soat.
- A.4 = 5: ikkala vazifa ham Q, aniq qoida.
- A.5 = 5: hamma ma’lumot AmoCRM’da.
- A.6 = 3: B.8 o‘rta: «qizil» vazifa 10% dan oshsa bonusning 15% ushlanadi, AmoCRM’da ko‘rinadi.
- A.7 = 2: ichki jarayon, mijoz faqat unutilsa sezadi.

### 6. Hisobotlar (kunlik va haftalik)

- A.2 = 4: kunlik hisobot har kuni, haftalik haftada bir.
- A.3 = 3: 4,0 soat.
- A.4 = 5: ikkala vazifa Q.
- A.5 = 5: manba AmoCRM va Telegram.
- A.6 = 4: B.8 past va o‘rta: hisobot ichkarida qoladi, xato topilsa tuzatiladi.
- A.7 = 1: mijozga ta’siri yo‘q (Jamshid kuzatuvi).

### 7. Yangi sotuvchini o‘qitish

- A.2 = 3: haftasiga 3 marta.
- A.3 = 2: 1,5 soat.
- A.4 = 2: vazifa F, savollar har xil.
- A.5 = 4: reglament va NotebookLM bilim bazasi bor.
- A.6 = 3: B.8 o‘rta: noto‘g‘ri o‘rgatilsa xato takrorlanadi.
- A.7 = 1: faqat ichki jarayon.
