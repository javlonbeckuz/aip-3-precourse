# Sinov to‘plami: To‘lovlarni solishtirish

Praktikum 3.0 · Xodimlarni yangi rolga tayyorlash · Fayl: `kit4-people/test-set.md`

Jarayon natijasidan 3 ta yaxshi va 3 ta yomon real misol.
Ular ikki ishga xizmat qiladi: To‘plam 4 dagi B.4 mashg‘ulot misollari va agentning sinov to‘plami (test set).
Yo‘riqnomada (`kit3-agent/instructions.md`) har bir o‘zgarishdan keyin agentni shu misollarning hammasida qayta tekshiring (`/kit5 xato`).
Agent xatosidan yangi misol qo‘shsangiz, uni oxiriga T7, T8 ... deb yozing.
Mijozning telefon raqami, karta raqami va boshqa shaxsiy ma’lumotini yashiring yoki o‘zgartiring (masalan, +998 90 *** ** 12).

## Ro‘yxat

| ID | Baho | Qisqacha | Manba (qayerdan, qachon) |
|---|---|---|---|
| T1 | yaxshi | #1021, Click 185 000, izohda #1021 → mos keldi, to‘langan | Sardor aka aytdi 2026-11-03; voqea 2026-10-13 |
| T2 | yaxshi | #1088, Payme 95 000, izohda raqam yo‘q → telefon bo‘yicha topildi, to‘langan | Sardor aka aytdi 2026-11-03; voqea 2026-10-16 |
| T3 | yaxshi | #1102, Click 120 000, Sheets’da 125 000 → farq 5 000, Sardorga uzatildi | Sardor aka aytdi 2026-11-03; voqea 2026-10-20 |
| T4 | yomon | #1063, Click 210 000 → «topilmadi» deb mijozga 2 marta yozilgan, aslida Click’da bor edi | Sardor aka aytdi 2026-11-03; voqea 2026-10-14 |
| T5 | yomon | #1215, Payme 145 000 → boshqa mijozning to‘lovi bir xil telefon raqami sabab shu buyurtmaga moslangan | Sardor aka aytdi 2026-11-03; voqea 2026-10-21 |
| T6 | yomon | #1310, Click 85 000 → buyurtma Sheets’ga kiritilmagan edi, to‘lov «to‘lovsiz» deb belgilangan | Sardor aka aytdi 2026-11-03; voqea 2026-10-28 |
| T7 | yomon (agent xatosi) | #2305, Payme 120 000 → agent telefon bo‘yicha shu oilaning boshqa buyurtmasiga (#2299) moslagan | Sardor aka aytdi; voqea 2026-12-18, sinovning 1-haftasi; B.13 |

Yil 2026 deb olindi: egasi faqat kun va oyni aytdi, oktabr bugungi sanadan (2026-11-03) oldin keladi.

## T1 (yaxshi)

- Kirish (agent nimani oladi): Click eksporti: 185 000 so‘m, izohda «#1021». Sheets: buyurtma #1021, summa 185 000 so‘m.
- Natija (real ish natijasi): mos keldi, buyurtma «to‘langan» deb belgilandi.
- Nega yaxshi: buyurtma raqami ham, summa ham mos keldi: 185 000 − 185 000 = 0.
- Tekshirish: agent javobi shunday bo‘lsa, o‘tdi: «mos keldi, #1021». Belgini **taklif qiladi**, lekin Malika tasdiqlamaguncha o‘zi qo‘ymaydi.

## T2 (yaxshi)

- Kirish: Payme eksporti: 95 000 so‘m, izohda buyurtma raqami yo‘q, telefon raqami bor (yashirilgan). Sheets: buyurtma #1088, shu telefon raqami bilan; Sheets’dagi summa [?].
- Natija: telefon raqami bo‘yicha #1088 topildi, «to‘langan» deb belgilandi.
- Nega yaxshi: izohda raqam bo‘lmasa telefon bo‘yicha qidirish qoidasi ishlatildi (`form-a-steps.md`, 5-qadam).
- Tekshirish: agent #1088 ga moslaydi, «telefon bo‘yicha topildi» deb yozadi va belgini taklif qiladi. Shu telefon bilan boshqa ochiq buyurtma bo‘lsa, belgi taklif qilmaydi (T5 ga qarang).

## T3 (yaxshi)

- Kirish: Click eksporti: 120 000 so‘m, #1102 uchun. Sheets: buyurtma #1102, summa 125 000 so‘m.
- Natija: farq Sardor akaga uzatildi.
- Nega yaxshi: farq 125 000 − 120 000 = 5 000 so‘m. Qoida: 5 000 so‘m va undan katta farq Sardorga uzatiladi (`instructions.md`, B.6). 5 000 ≥ 5 000, demak to‘g‘ri uzatilgan.
- Tekshirish: agent «mos kelmadi, farq 5 000 so‘m» deb, «Sardorga» belgisi bilan ko‘rsatadi. «To‘langan» belgisini taklif qilmaydi.

## T4 (yomon)

- Kirish: Click eksporti: 210 000 so‘m, #1063 uchun. Sheets: buyurtma #1063; Sheets’dagi summa [?].
- Natija (xato bilan): to‘lov «topilmadi» deb hisoblangan, mijozga chek so‘rab 2 marta yozilgan. Aslida to‘lov Click’da bor edi.
- Nega yomon: to‘lov kabinet ro‘yxatida bor edi, lekin topilmadi. Mijoz ortiqcha bezovta qilindi, buyurtma kutib qoldi.
- To‘g‘ri natija qanday bo‘lishi kerak: to‘lov Click eksportida topiladi, #1063 «mos keldi» bo‘ladi, chek so‘rash xabari tayyorlanmaydi.
- Tekshirish: agent shu xatoni takrorlamasa, o‘tdi: #1063 ni Click eksportidan topadi va «mos keldi» deydi. Chek so‘rash qoralamasi **yo‘q**. Summa farqi bo‘lsa, B.6 bo‘yicha ko‘rsatadi.

## T5 (yomon)

- Kirish: Payme eksporti: 145 000 so‘m. To‘lovchining telefon raqami #1215 buyurtmasidagi raqam bilan bir xil, lekin to‘lov boshqa mijozniki. Izohda buyurtma raqami: [?]. Sheets’dagi summa: [?].
- Natija (xato bilan): boshqa mijozning to‘lovi #1215 ga moslangan.
- Nega yomon: faqat telefon raqami bo‘yicha moslangan. To‘lov boshqa buyurtmaga tegishli edi. #1215 to‘lanmagan holda «to‘langan» bo‘lib qolishi mumkin edi, haqiqiy to‘lovchining buyurtmasi esa kutib qoldi.
- To‘g‘ri natija: bitta to‘lov bir nechta buyurtmaga mos kelishi mumkin bo‘lsa, belgi taklif qilinmaydi, ikkala variant ko‘rsatiladi (`instructions.md`, B.6). Malika qaysi biri to‘g‘riligini aniqlaydi.
- Tekshirish: agent #1215 ga belgi **taklif qilmaydi**. Shu telefon bilan bog‘liq barcha buyurtmalarni variant sifatida ko‘rsatadi.

## T6 (yomon)

- Kirish: Click eksporti: 85 000 so‘m. Sheets’da #1310 buyurtma hali kiritilmagan.
- Natija (xato bilan): to‘lov «to‘lovsiz» deb belgilangan.
- Nega yomon: to‘lov bor edi, faqat buyurtma Sheets’ga hali yozilmagan edi. «To‘lovsiz» degan belgi noto‘g‘ri.
- To‘g‘ri natija: «Buyurtma topilmadi» deb ko‘rsatiladi, «to‘lovsiz» deyilmaydi (`instructions.md`, B.6).
- Tekshirish: agent «Buyurtma topilmadi» deydi, 85 000 so‘mni ko‘rsatadi. «To‘lovsiz» so‘zini ishlatmaydi va hech qanday belgi taklif qilmaydi.

## T7 (yomon, agent xatosi)

- Kirish: Payme eksporti: 120 000 so‘m, to‘lov #2305 uchun; izohda buyurtma raqami [?]. To‘lovchining telefoni Sheets’da ikkita buyurtmada bor: #2305 va #2299 (bir oila). Sheets’dagi summalar: #2305 [?], #2299 [?].
- Natija (xato bilan): agent to‘lovni #2299 ga moslagan. Malika tekshirishda topdi, belgi qo‘yilmadi.
- Nega yomon: bitta telefonda ikkita ochiq buyurtma bor edi, agent ulardan birini o‘zi tanladi. Malika tekshirmaganda, #2299 «to‘langan» bo‘lib qolardi, #2305 esa to‘lanmagan ko‘rinardi.
- To‘g‘ri natija: belgi taklif qilinmaydi. #2305 va #2299 ikkalasi ham raqami va summasi bilan variant qilib ko‘rsatiladi, «telefon bo‘yicha bir nechta buyurtma» deb yoziladi (`instructions.md`, B.4 va B.6).
- Tekshirish: agent #2299 ga ham, #2305 ga ham belgi **taklif qilmaydi**. Ikkala buyurtma ham ro‘yxatda bor bo‘lsa, o‘tdi.

## Yetishmayotgan ma’lumot

- T7: izohda buyurtma raqami bormidi [?]; #2305 va #2299 ning Sheets’dagi summasi [?].
- T2, T4, T5: Sheets’dagi buyurtma summasi [?].
- T5: izohda buyurtma raqami bormidi [?]; to‘lov aslida qaysi buyurtmaniki edi [?].
- Agentni sinashdan oldin har bir misol uchun eksport va Sheets qatorini (shaxsiy ma’lumot yashirilgan holda) alohida faylga saqlash kerak.

## Sinov natijalari

Har bir yo‘riqnoma o‘zgarishidan keyin bitta qator.

| Sana | instructions.md dagi o‘zgarish | O‘tdi | O‘tmadi | Izoh |
|---|---|---|---|---|
| 2026-12-20 | B.4 va B.6: telefon bo‘yicha bir nechta ochiq buyurtma bo‘lsa tanlamaslik (B.13, #2305) | T1-T7, 7 ta | 0 | egasi aytdi; har bir misolning agent javobi faylda saqlanmagan [?] |
