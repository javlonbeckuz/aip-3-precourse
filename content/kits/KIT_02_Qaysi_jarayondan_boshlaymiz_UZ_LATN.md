# Qaysi jarayondan boshlaymiz?

Praktikum 3.0 · To‘plam 2 / 5 · Tuzuvchi: Xurshid Maroziqov

Jarayonlarni bir xil mezonlarda baholang va birinchi sinov (pilot) uchun bittasini tanlang: qiymati yuqori, boshlash oson, xatosi arzon bo‘lsin.

## Qanday ishlatiladi

1. To‘plam 1 dagi B shakllaridan 8 tagacha jarayonni A shakliga yozing.
   Claude Code’da /kit2 buni kit1-interviews/ papkasidagi fayllardan o‘zi qiladi.
   Jarayon - bu boshlanishi va natijasi bor vazifalar zanjiri, masalan «mijoz murojaatidan sinov darsiga yozilguncha».
2. Har bir jarayonni oltita mezon bo‘yicha 1 dan 5 gacha baholang.
   Shkala jadval ostida berilgan.
   AI qo‘ygan har bir balning sababini so‘rang va rozi bo‘lmaganingizni o‘zgartiring.
   Keyin baholarni bo‘lim boshlig‘i bilan ko‘rib chiqing: biznes egasi odatda ma’lumotlar qanchalik tartibsiz ekanini bilmaydi.
3. Qiymat (A.2 + A.3 + A.7) va Osonlik (A.4 + A.5 + A.6) ni hisoblang.
   Har biri 3 va 15 oralig‘ida bo‘lishi kerak.
4. Har bir jarayonni B shaklidagi qiymat va osonlik matritsasiga bitta nuqta qilib tushiring: gorizontal bo‘yicha Osonlik, vertikal bo‘yicha Qiymat.
   Nuqta yoniga uning raqamini yozing. /kit2 matritsani brauzerda ochiladigan sahifa qilib ham chizadi.
5. Matritsaning yuqori o‘ng qismidan bitta jarayonni tanlang.
   Nega aynan shuni tanlaganingizni va hozir nimani qilmayotganingizni yozing.
   Shu hafta tanlangan jarayonning boshlang‘ich raqamlarini yig‘ishni boshlang (To‘plam 5, 1-qadam).

## Claude Code’da

/kit2.
U kit1-interviews/ dagi B shakllarini o‘qiydi va natijani kit2-scoring/ papkasiga yozadi.

Fayllar kompaniya papkasida:

- A shakli, Jarayonlarni baholash: `kit2-scoring/form-a-scoring.md`
- B shakli, Qiymat va osonlik: `kit2-scoring/form-b-matrix.md`

## AI chat uchun so‘rov

Claude Code bo‘lmasa: shakl yoki transkriptni so‘rovdan keyin qo‘shib, hammasini Claude, ChatGPT yoki Gemini chatiga joylang.

```text
Siz kichik biznes egasiga jarayonning bir qismini AI agentiga berish uchun birinchi jarayonni tanlashda yordam beryapsiz.
Quyida uning baholash jadvali berilgan (A.1-A.9 kodlari; har bir mezon 1-5 gacha baholangan; A.8 Qiymat = A.2 + A.3 + A.7, A.9 Osonlik = A.4 + A.5 + A.6).
1) A.8 va A.9 ni qayta hisoblang, hisobni har bir qatorda ko‘rsating (masalan, A.8 = 4 + 3 + 5 = 12) va arifmetik xatolarni ko‘rsating.
2) Jarayon nomiga to‘g‘ri kelmaydigan baholarni ko‘rsating (masalan, shaxsiy qarorni talab qiladigan jarayon «aniq qoidasi bor» degan mezonda 5 olgan bo‘lsa).
3) Jarayonlarni Qiymat va Osonlik bo‘yicha tartiblang va 2-4 haftalik sinov uchun eng yaxshi hamda ikkinchi eng yaxshi variantni ayting.
4) Eng yaxshi variant uchun sinov muvaffaqiyatsiz tugashining uchta eng ehtimolli sababini va biznes egasi boshlashdan oldin javob topishi kerak bo‘lgan bitta savolni yozing.
Raqamlarni o‘zingizdan to‘qimang.
O‘zbek tilida javob bering.
```

## Shakl A: Jarayonlarni baholash

Fayl: `kit2-scoring/form-a-scoring.md`

- Bo‘lim: 
- Baholadi: 
- Sana: 

| # | A.1 Jarayon (boshlanishi - natijasi) | A.2 Takrorlanishi | A.3 Ketadigan vaqt | A.4 Aniq qoidasi bor | A.5 Ma’lumot raqamli | A.6 Xatosi arzon | A.7 Mijozga ta’siri | A.8 Qiymat | A.9 Osonlik |
|---|---|---|---|---|---|---|---|---|---|
| 1 |   |   |   |   |   |   |   |   |   |
| 2 |   |   |   |   |   |   |   |   |   |
| 3 |   |   |   |   |   |   |   |   |   |
| 4 |   |   |   |   |   |   |   |   |   |
| 5 |   |   |   |   |   |   |   |   |   |
| 6 |   |   |   |   |   |   |   |   |   |
| 7 |   |   |   |   |   |   |   |   |   |
| 8 |   |   |   |   |   |   |   |   |   |

- A.2: 1 ball - oyiga bir marta … 5 ball - kuniga bir necha marta
- A.3: 1 ball - haftasiga bir necha daqiqa … 5 ball - haftasiga 10 soatdan ko‘p
- A.4: 1 ball - har bir holat har xil … 5 ball - har doim bir xil qadamlar
- A.5: 1 ball - qog‘ozda yoki odamlar yodida … 5 ball - allaqachon tizim yoki jadvalda
- A.6: 1 ball - xato pul yoki ishonchni yo‘qotadi … 5 ball - xatoni sezish va to‘g‘rilash oson
- A.7: 1 ball - faqat ichki jarayon … 5 ball - mijoz buni kutib turadi

## Shakl B: Qiymat va osonlik

Fayl: `kit2-scoring/form-b-matrix.md`

- Bo‘lim: 
- Sana: 

Qiymat (A.8) / Osonlik (A.9): Birinchi sinov · Foydali, puxta reja kerak · Oson, lekin foydasi kichik · Hozircha tegmang

### Matritsadagi nuqtalar

| # | Jarayon (A.1) | Qiymat (A.8) | Osonlik (A.9) | Matritsadagi joyi |
|---|---|---|---|---|
| 1 |   |   |   |   |
| 2 |   |   |   |   |
| 3 |   |   |   |   |
| 4 |   |   |   |   |
| 5 |   |   |   |   |
| 6 |   |   |   |   |
| 7 |   |   |   |   |
| 8 |   |   |   |   |

### B.1 Tanlangan jarayon


### B.2 Nega aynan shu


### B.3 Hozir nimani qilmayapmiz
