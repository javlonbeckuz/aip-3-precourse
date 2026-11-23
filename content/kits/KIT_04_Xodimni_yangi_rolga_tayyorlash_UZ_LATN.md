# Xodimlarni yangi rolga tayyorlash

Praktikum 3.0 · To‘plam 4 / 5 · Tuzuvchi: Xurshid Maroziqov

Har bir xodimning eng kuchli qobiliyatini yangi ish taqsimotidagi mos joyga qo‘ying va «AI’ni o‘rgan» o‘rniga aniq tekshirish mumkin bo‘lgan vazifa bering.

## Qanday ishlatiladi

1. A shakliga To‘plam 3 dagi jarayonda ishi o‘zgarayotgan har bir xodimni yozing.
   Ularning eng kuchli qobiliyatini o‘z ishidan olingan real misol bilan yozing.
2. Bu qobiliyat ertaga qayerda ishlashini hal qiling.
   Mijozning chalkash gapidan asosiy ehtiyojni ajrata oladigan yaxshi sotuvchi agentga to‘g‘ri topshiriq bera oladi.
   Ehtiyotkor muharrir esa agent yozgan narsani tekshira oladi.
3. Agent ishga tushishidan oldin, hech qachon keyin emas, har bir xodim bilan 15 daqiqa suhbatlashing.
   Ularga nima o‘zgarishini, nima o‘zgarishsiz qolishini va bundan buyon nimalarni tekshirishini tushuntiring.
   Savol va xavotirlarini B.8 ga, kelishuvni B.9 ga yozing.
4. Har bir xodim uchun B shaklida bitta mashg‘ulot vazifasini to‘ldiring: qanday natijani tekshiradi, qaysi mezonlarga asosan va qaysi misollar ustida.
   B.4 uchun To‘plam 3 da yig‘ilgan 3 ta yaxshi va 3 ta yomon misoldan foydalaning: ular agentning sinov to‘plami ham.
5. Muddatni va o‘sishni qanday o‘lchashni kelishib oling.
   Ikki haftadan so‘ng xodim bilan natijani ko‘rib chiqing va kerak bo‘lsa, mezonlarni o‘zgartiring.

## Claude Code’da

/kit4.
Natija kit4-people/ papkasiga yoziladi; 6 ta misol test-set.md faylida.

Fayllar kompaniya papkasida:

- A shakli, Qobiliyatlar xaritasi: `kit4-people/form-a-skills-map.md`
- B shakli, Mashg‘ulot vazifasi: `kit4-people/ism-form-b.md`

## AI chat uchun so‘rov

Claude Code bo‘lmasa: shakl yoki transkriptni so‘rovdan keyin qo‘shib, hammasini Claude, ChatGPT yoki Gemini chatiga joylang.

```text
Siz biznes egasiga xodimlarini AI agenti bilan birga ishlashga tayyorlashda yordam beryapsiz.
Quyida A shakli (qobiliyatlar xaritasi: A.1 xodim, A.2 kuchli qobiliyati misol bilan, A.3 bugungi asosiy ishi, A.4 yangi taqsimotdagi o‘rni, A.5 yangi nazorat vazifasi, A.6 o‘qish kerakmi ha/yo‘q) va B shakli (bir xodim uchun mashg‘ulot vazifasi, B.1-B.9) berilgan.
1) A shaklidagi har bir xodim uchun A.4 va A.5 haqiqatan ham A.2 dagi qobiliyatdan foydalanyaptimi, ayting; agar yo‘q bo‘lsa, yaxshiroq variant taklif qiling.
2) B.3 dagi mezonlarni qayta yozib, inson bitta agent javobini bir daqiqadan kam vaqtda tekshirishi uchun 4-6 ta ha/yo‘q savolidan iborat cheklist qiling.
3) B.4 dagi yaxshi va yomon misollardan foydalanib, 30 daqiqalik mashq ishlab chiqing.
4) B.4 dagi misollar agentning sinov to‘plami ham bo‘ladi: har bir misol uchun kirish, to‘g‘ri natija va nega yaxshi yoki yomonligini bittadan qatorda yozing.
5) Ikki haftadan so‘ng natijani o‘lchash uchun ikkita ko‘rsatkich taklif qiling (B.6).
6) B.8 ga yozilgan xavotirlarga javob berish uchun biznes egasi ishlatishi mumkin bo‘lgan uchta dangal gap tuzib bering.
O‘zbek tilida javob bering.
```

## Shakl A: Qobiliyatlar xaritasi

Fayl: `kit4-people/form-a-skills-map.md`

- Bo‘lim: 
- Jarayon: 
- Sana: 

| A.1 Xodim | A.2 Eng kuchli qobiliyati (real misol) | A.3 Bugungi asosiy ishi | A.4 Yangi ish taqsimotidagi roli | A.5 Yangi nazorat vazifasi | A.6 O‘qish kerakmi |
|---|---|---|---|---|---|
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |

## Shakl B: Mashg‘ulot vazifasi

Fayl: `kit4-people/ism-form-b.md`

- Xodim: 
- Menejer: 
- Sana: 

### B.1 Nimani tekshiradi (qanday natijani)


### B.2 Nega aynan shu xodim: qaysi qobiliyati kerak


### B.3 Mezonlar: to‘g‘ri natija bu ... / xato natija bu ...


### B.4 Misollar: 3 ta yaxshi va 3 ta yomon, manbasi

Eslatma: Bu 6 ta misol agentning sinov to‘plami ham: har bir o‘zgarishdan keyin agent shularda tekshiriladi (kit4-people/test-set.md).


### B.5 Muddat


### B.6 O‘sishni qanday o‘lchaymiz


### B.7 Natijani kim ko‘rib chiqadi


### B.8 Suhbatdan: uning savollari va xavotirlari


### B.9 Nima deb kelishdik
