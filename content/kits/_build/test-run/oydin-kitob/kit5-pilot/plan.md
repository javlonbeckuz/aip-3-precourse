# To‘plam 5 · A shakli: Sinov rejasi

Praktikum 3.0 · Sinov va hisob-kitob · Fayl: `kit5-pilot/plan.md`

- Jarayon: to‘lovlarni solishtirish (Click/Payme - buyurtma)
- Sinov egasi: Sardor (rahbar); loyiha yetakchisi: Malika (sotuv operatori)
- Bo‘lim boshlig‘i: Sardor, rozi (2026-11-03)
- Sana: 2026-11-03

### A.1 Jarayon va agent

To‘lovlarni solishtirish (To‘plam 2, 4-jarayon; `kit3-agent/form-a-steps.md`, 4-8-qadamlar).
Agent: «To‘lov yordamchisi» (`kit3-agent/instructions.md`).
Click va Payme eksportini Sheets’dagi buyurtmalar bilan solishtiradi, mos kelmaganlar ro‘yxatini va chek so‘rash qoralamasini tayyorlaydi.

### A.2 Maqsad, bitta raqamda (... dan ... gacha)

B.2, bitta to‘lovga odam sarflagan vaqt: 2,1 daqiqadan 1,0 daqiqagacha.

- Boshlang‘ich: 2,1 (`baseline.md`: (407 × 1,6 + 375 × 1,8 + 65 × 7,5) / 847 = 2,14).
- Kamayish: (2,14 - 1,0) / 2,14 × 100 = 53%.
- Maqsad egasi bilan 2,4 daqiqaga qarab kelishilgan edi. Tortilgan baseline 2,1 chiqdi, egasi 1,0 ni qoldirdi (2026-11-03).
- Maqsadga yetilsa, tekshirishgacha tejalgan vaqt: (2,14 - 1,0) × 282,3 / 60 = 5,4 soat/hafta. Sof tejash = 5,4 - B.7. Demak, tekshirish haftasiga 5,4 soatdan ko‘p bo‘lsa, vaqt tejalmaydi.

### A.3 Sanalar: boshlanishi - tugashi (2-4 hafta)

2026-12-14 (dushanba) - 2026-12-26 (shanba): 2 to‘liq hafta, 2 × 6 = 12 ish kuni.

- 1-hafta: 14-19-dekabr. 2-hafta: 21-26-dekabr.
- 6-dars 26-dekabrdan keyin bo‘lishi kerak, sanasi [?].
- Yangi yil oldidan buyurtmalar ko‘payishi mumkin [?]: B.1 va B.6 ni oktabr bilan solishtirganda buni hisobga olamiz.

### A.4 Qamrov: qaysi mijozlar, so‘rovlar yoki buyurtmalar

Hamma to‘lovlar: Click va Payme, hamma buyurtmalar (egasi, 2026-11-03).
Agentgacha bu haftasiga 282,3 ta to‘lov (B.1).

### A.5 Chegaralar: agent qila oladi / qila olmaydi

Qila oladi (instructions.md, B.4 doirasida):
- to‘lovni buyurtma bilan raqam va summa bo‘yicha, raqam bo‘lmasa telefon bo‘yicha solishtiradi;
- mos kelmaganlar ro‘yxatini tuzadi va chek so‘rash xabarini qoralaydi;
- «to‘langan» belgisini taklif qiladi;
- natijani Malikaga Telegramda yuboradi.

1-hafta (14-19-dekabr) qo‘shimcha cheklov: agent faqat ro‘yxat va qoralama tayyorlaydi. Malika har bir qatorni tasdiqlaydi. Sheets’ga belgini Malika o‘zi qo‘yadi.
Bu yo‘riqnomadan qattiqroq, kengroq emas.
2-hafta uchun ruxsatni 19-dekabrdagi ko‘rib chiqishda egasi hal qiladi; kelishilgani shu yerga yoziladi.
2-hafta (21-26-dekabr), egasi qarori 19-dekabr: 1-haftadagidek, agent faqat ro‘yxat va qoralama tayyorlaydi; Malika har bir qatorni tasdiqlaydi; Sheets’ga belgini Malika o‘zi qo‘yadi. Hech qanday qadam bo‘shatilmadi.

Qila olmaydi (instructions.md, B.5): pul o‘tkazish va qaytarish; mijozga biror narsa yuborish; ma’lumotni o‘chirish; xodimlarni baholash va kuzatish; Malika tasdiqlamagan qatorga belgi qo‘yish; summa farqini o‘zi hal qilish; Telegram buyurtmalariga javob berish.

### A.6 Muvaffaqiyat mezonlari

Har bir haftada, agentgacha bilan solishtirib:

| Mezon | Agentgacha | Sinovda kerak |
|---|---|---|
| B.2 O‘rtacha vaqt, daqiqa | 2,1 | 1,0 yoki kam |
| B.3 Xato javoblar, haftasiga | 2 | 2 yoki kam |
| B.4 Muammoli holatlar agent ro‘yxatida | - | hammasi (o‘tkazib yuborilgan 0 ta) |
| B.8 Mijoz shikoyatlari, haftasiga | 1,3 | 1,3 yoki kam |

### A.7 To‘xtatish sharti: agar ... bo‘lsa, darhol to‘xtatamiz

Quyidagilardan biri bo‘lsa, agentni darhol to‘xtatamiz:
- agent mijozga biror narsa yuborsa;
- agent Malika tasdiqlamagan qatorga yozsa;
- Sheets’da noto‘g‘ri «to‘langan» belgisi qolsa (`test-set.md`, T5 kabi holat).

Har bir xato `/kit5 xato` bilan B.13 jurnaliga yoziladi.

### A.8 Agent javoblarini kim va qanchalik tez-tez tekshiradi

Malika, har kuni ertalab, agent ro‘yxatidagi har bir qatorni (To‘plam 4, A.5).
Tekshirishga ketgan vaqt hafta oxirida butun vazifa uchun bitta raqam qilib yoziladi (B.7). Odam bo‘yicha emas.

### A.9 Haftalik ko‘rib chiqish: kun, vaqt, kim qatnashadi

Shanba, soat 18:00: 2026-12-19 va 2026-12-26.
Qatnashadi: Sardor va Malika.
Har ko‘rib chiqishda: `/kit5 hafta N` (raqamlar, B.7, B.14), A.7 tekshiruvi, keyingi hafta ruxsatlari.
