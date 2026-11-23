# Boshlang‘ich holat (Agentgacha): to‘lovlarni solishtirish

Praktikum 3.0 · Sinov va hisob-kitob · Fayl: `kit5-pilot/baseline.md`

2-darsdan keyin to‘ldiriladi.
Bu raqamlar B shaklidagi (numbers.md) «Agentgacha» ustuniga o‘tadi.
Odamni emas, ishni o‘lchaymiz: kim sekin ishlagani emas, jarayon haftasiga qancha ish va vaqt olishi yoziladi.
Tarix bo‘lsa (Telegram eksporti, Excel, CRM), oxirgi 2-4 haftani undan oling; tarixi yo‘q narsani 5 ish kuni jonli yozing.
Daqiqani o‘lchash kerak bo‘lsa, loyiha yetakchisi ish vaqtida har bir turdan 3 ta holatni o‘lchaydi.

- Jarayon (To‘plam 2, B.1): 4. To‘lovlarni solishtirish: Click/Payme’ga pul tushadi, buyurtma bilan solishtiriladi
- Davr: 2026-10-12 - 2026-10-31 (3 to‘liq hafta, dushanba-shanba; yakshanbada xabar yo‘q)
- Kim o‘lchadi: tarix: Claude, 2026-11-03; jonli yozuv: Malika (loyiha yetakchisi), hali boshlanmagan
- Ish haftasi: haftasiga 6 ish kuni (CLAUDE.md)

## Raqamlar

| Ko‘rsatkich | Haftasiga | Hisob | Manba | Usul: tarix / jonli / namuna | Ishonch |
|---|---|---|---|---|---|
| B.1 Bajarilgan so‘rovlar (solishtirilgan buyurtmalar) | 282,3 | (285 + 281 + 281) / 3 = 847 / 3 = 282,3 | `data/tolovlar-guruhi.json`, #1001-#1847, 12-31-oktabr | tarix | yuqori |
| B.2 O‘rtacha vaqt, daqiqa (bitta buyurtma) | 1,9 [?] | 90 daq/kun × 6 kun / 282,3 = 540 / 282,3 = 1,9 | Malika, To‘plam 1 B shakli («bir yarim soat» kuniga) + B.1 | taxmin; jonli yozuv kerak | past |
| B.3 Xato javoblar (noto‘g‘ri tasdiqlangan yoki o‘tkazib yuborilgan to‘lov) | [?] | tarixda ko‘rinmaydi | - | jonli yozuv (5 ish kuni) | - |
| B.4 Takroriy so‘rovlar (birinchi tekshiruvda chiqmagan: «to‘lov topilmadi» + «summa mos emas») | 21,7 | (27 + 19 + 19) / 3 = 65 / 3 = 21,7 | `data/tolovlar-guruhi.json` | tarix | yuqori |
| B.5 To‘liq hal qilingan so‘rovlar (tasdiqlangan buyurtmalar) | 273 | (274 + 270 + 275) / 3 = 819 / 3 = 273 | `data/tolovlar-guruhi.json` | tarix | o‘rta: guruhda yopilmagan 28 ta buyurtma boshqa joyda hal bo‘lgan bo‘lishi mumkin [?] |
| B.6 Yakunlangan bitimlar yoki buyurtmalar | [?] | - | Google Sheets (egasi o‘zi oladi) | tarix (Sheets) | - |
| B.8 Mijoz shikoyatlari («pul o‘tkazgan, buyurtma kelmagan») | 1,3 | (1 + 1 + 2) / 3 = 4 / 3 = 1,3 | `data/tolovlar-guruhi.json` | tarix | yuqori |

B.7 (tekshirish soati) va B.14 (topilgan pul) agentgacha 0 bo‘ladi.
B.2 - bitta so‘rovga odam sarflagan daqiqa.
B.3 ta’rifi egasi bilan kelishildi (2026-11-03): noto‘g‘ri tasdiqlangan yoki o‘tkazib yuborilgan to‘lov, shikoyatdan keyin topilganlari ham.

### Haftalar bo‘yicha

| Ko‘rsatkich | 1-hafta (12-17.10) | 2-hafta (19-24.10) | 3-hafta (26-31.10) | Jami |
|---|---|---|---|---|
| Xabarlar | 302 | 290 | 296 | 888 |
| B.1 Buyurtmalar | 285 (#1001-#1285) | 281 (#1286-#1566) | 281 (#1567-#1847) | 847 |
| «to‘lov topilmadi» | 15 | 15 | 10 | 40 |
| «summa mos emas» | 12 | 4 | 9 | 25 |
| B.4 Muammoli holatlar | 27 | 19 | 19 | 65 |
| «qayta: chek keldi, tasdiqlandi» | 16 | 8 | 13 | 37 |
| Guruhda yopilmagan | 27 - 16 = 11 | 19 - 8 = 11 | 19 - 13 = 6 | 28 |
| B.5 Tasdiqlangan | 285 - 11 = 274 | 281 - 11 = 270 | 281 - 6 = 275 | 819 |
| B.8 Shikoyat | 1 | 1 | 2 | 4 |

Ikki marta tekshirildi:
1) xabarlar qo‘lda o‘qib sanaldi;
2) butun fayl bo‘yicha `grep -c`: «topilmadi» 40, «mos emas» 25, «qayta:» 37, «shikoyat» 4, «tasdiqlandi» 819 = 782 (darhol) + 37 (qayta).
Xabarlar: 847 + 37 + 4 = 888 ✓.
Kunlik sanoq ham mos: 302 + 290 + 296 = 888 ✓.

### Guruhda yopilmagan 28 ta buyurtma (holati [?])

Ularda «to‘lov topilmadi» yoki «summa mos emas» yozilgan, lekin keyin «qayta: ... tasdiqlandi» yozilmagan.
Pul tushganmi, buyurtma bekor bo‘lganmi yoki boshqa joyda hal bo‘lganmi, noma’lum [?] (egasi, 2026-11-03).
Bu yo‘qolgan pul degani emas; sinovda agent shunday holatlarni ushlasa, B.14 uchun tekshiriladigan joy shu.

| Hafta | Buyurtmalar va summa, ming so‘m | Jami, so‘m |
|---|---|---|
| 1 | #1063 95, #1105 145, #1112 210, #1116 185, #1157 120, #1211 145, #1215 260, #1236 120, #1253 260, #1258 120, #1268 185 | 1 845 000 [?] |
| 2 | #1288 65, #1320 120, #1351 260, #1361 260, #1413 85, #1430 65, #1484 120, #1494 95, #1513 145, #1535 95, #1558 210 | 1 520 000 [?] |
| 3 | #1575 210, #1587 210, #1617 185, #1694 185, #1740 185, #1754 85 | 1 060 000 [?] |
| Jami | 28 ta buyurtma | 1 845 000 + 1 520 000 + 1 060 000 = 4 425 000 [?] |

Summalar ikki marta qo‘shildi: ketma-ket va bir xil summalarni guruhlab (masalan, 1-hafta: 120 × 3 + 145 × 2 + 260 × 2 + 185 × 2 + 95 + 210 = 1 845).

## Manbalar

| Fayl yoki tizim | Davr | Nima sanaldi | Qanday sanaldi |
|---|---|---|---|
| `data/tolovlar-guruhi.json` (Telegram «Oydin Kitob - to‘lovlar» guruhi eksporti) | 2026-10-12 - 2026-10-31 | B.1, B.4, B.5, B.8, yopilmagan buyurtmalar | xabarlar haftalarga bo‘lindi (dushanba-shanba), har bir xabar turi sanaldi; `grep -c` bilan qayta tekshirildi |
| `kit1-interviews/malika-form-b.md`, 3-vazifa | 2026-11-02 suhbat | B.2 taxmini: kuniga 90 daqiqa | xodimning so‘zi, egasi tasdiqlagan; o‘lchov emas |
| Google Sheets (buyurtmalar) | 12-31-oktabr | B.6 | egasi keyin oladi [?] |

## Jonli yozuv (tarixi yo‘q ko‘rsatkichlar uchun)

Kim: Malika (loyiha yetakchisi), ish vaqtida, 5 ish kuni; avval `briefing.md` bo‘yicha suhbat.
B.2: har kuni 3 ta Click, 3 ta Payme, 3 ta muammoli holat («topilmadi» yoki «mos emas»), boshlanish va tugash vaqti.
Faqat to‘lovni solishtirish vaqti yoziladi: mijozdan chek kutish vaqti kirmaydi.
B.3: shu kuni topilgan noto‘g‘ri tasdiq yoki o‘tkazib yuborilgan to‘lov soni (shikoyatdan keyin topilgani ham).
Odamni emas, ishni o‘lchaymiz: kim qancha tez ishlagani emas, bitta to‘lovga qancha vaqt ketishi yoziladi.

| Sana | B.1 | B.2 namunalar, daqiqa (Click / Payme / muammoli) | B.3 | B.4 | Izoh |
|---|---|---|---|---|---|
|   |   |   /   /   |   |   |   |
|   |   |   /   /   |   |   |   |
|   |   |   /   /   |   |   |   |
|   |   |   /   /   |   |   |   |
|   |   |   /   /   |   |   |   |

## Holat

- Tarixdan: B.1, B.4, B.5, B.8 (3 hafta).
- Jonli yozuvda: B.2, B.3, Malika bilan suhbatdan keyin, 5 ish kuni.
- Egasidan: B.6 (Google Sheets).
- Noma’lum: 28 ta yopilmagan buyurtmaning holati [?].
