# To‘plam 3 · A shakli: Jarayon qadamlari: bugun va ertaga

Praktikum 3.0 · Ishni qayta taqsimlash · Fayl: `kit3-agent/form-a-steps.md`

- Jarayon: narx, qoldiq, chegirma va muddat savoli (To‘plam 2, B.1; agent: «Savdo yordamchisi»)
- Boshlanadi: xodim mijozdan savol oladi
- Tugaydi: xodim mijozga to‘g‘ri javobni aytadi (amoCRMga yozish bu jarayonga kirmaydi)
- Jarayon egasi: Jamshid Karimov (ROP)
- Sana: 2026-12-06

| # | A.1 Qadam (bitta harakat) | A.2 Ma’lumot | A.3 Bugun: kim | A.4 Ertaga A / R / I | A.5 Kim tekshiradi | A.6 Kim qaror qiladi | A.7 Kim javobgar | A.8 Izoh: kutish, xatolar |
|---|---|---|---|---|---|---|---|---|
| 1 | Mijozdan savol oladi (mahsulot, dona soni, chegirma, muddat, manzil) | mijoz savoli (telefon, Instagram, Telegram) | operator, menejer | I: mijoz bilan jonli suhbat | - | savol olgan xodim | Jamshid Karimov | - |
| 2 | Savolni «Savdo yordamchisi» ga yozadi | savol matni | operator menejerga Telegramda yozadi | I: savolni xodim beradi | - | savol olgan xodim | Jamshid Karimov | bugun savol operator → menejer → ombor/ROP zanjiridan o‘tadi |
| 3 | Dona soniga qarab ulgurji (5+) yoki chakana narxni topadi va summani hisoblaydi | `data/narxlar.csv` | menejer (prays-list, 14 sahifa) | A, keyin I tasdiqlaydi: pul bilan bog‘liq | savol bergan xodim (noto‘g‘ri bo‘lsa ❌) | savol bergan xodim | Jamshid Karimov | eski prays bo‘yicha narx: 350 000 so‘m zarar; ulgurji o‘rniga chakana narx aytiladi |
| 4 | Ombordagi qoldiqni o‘qiydi | 1C qoldig‘i (har kuni ertalab CSV) | Umid aka (telefon yoki Telegram) | A: fayldan o‘qish | savol bergan xodim (❌) | savol bergan xodim | Jamshid Karimov | bugun 20-30 daqiqa kutish; fayl kunda bir marta yangilanadi, kun ichida eskiradi; kodlash cp1251; fayl kelmasa yoki eski bo‘lsa: Jamshid Karimov → fabrikada Otabek aka |
| 5 | Chegirmani `qoidalar.md` bo‘yicha aytadi: menejer 5% gacha, buyurtma 20 000 000 so‘mdan oshsa | `data/qoidalar.md`, 3-qadam summasi | ROP (8-10 daqiqa kutish) | A, keyin I tasdiqlaydi: pul bilan bog‘liq | savol bergan xodim (❌) | savol bergan xodim | Jamshid Karimov | og‘zaki 12-15% chegirma to‘xtatilgan (egasi, 2026-11-26) |
| 6 | 5% dan katta chegirmani hal qiladi (100% oldindan to‘lov bo‘lsa ham) | `data/qoidalar.md`, buyurtma | ROP | I: faqat Jamshid Karimov | - | Jamshid Karimov | Jamshid Karimov | agent faqat uzatadi |
| 7 | Yetkazish muddati va shartlarini aytadi: 7 ish kuni (maxsus o‘lcham 12); Toshkent shahri ichida 10 mln dan bepul, kam bo‘lsa 350 000 so‘m; viloyatga 8 000 so‘m/km; 15 mln dan katta buyurtmaga 3D bepul | `data/qoidalar.md` | ROP, menejer | A, keyin I tasdiqlaydi: mijozga va’da | savol bergan xodim (❌) | savol bergan xodim | Jamshid Karimov | og‘zaki «3 kunda» va’dasi to‘xtatilgan; muddat ikki xil aytilib 2 marta janjal bo‘lgan |
| 8 | Javobni manbasi bilan savol bergan xodimga yozadi | 3-7 qadamlar natijasi | ROP, menejer (Telegram) | A | savol bergan xodim (❌); Jamshid Karimov birinchi hafta kunlik jurnalni ko‘radi | savol bergan xodim | Jamshid Karimov | - |
| 9 | Javobni tekshiradi va mijozga aytadi | agent javobi | operator, menejer | I: mijozga xodim aytadi | - | savol bergan xodim | Jamshid Karimov | dushanba holati: 35 daqiqadan keyin qayta qo‘ng‘iroq, mijoz «o‘ylab ko‘raman» dedi; kuniga 2-3 mijoz ketadi [?] |

A.4: A agent, R robot, I inson.
Agent hech qachon o‘z qadamini o‘zi tekshirmaydi: 3, 4, 5, 7, 8-qadamlarni savol bergan xodim tekshiradi.

## Real holat (egasi, o‘tgan dushanba)

Mijoz operatorga qo‘ng‘iroq qildi: 8 ta «Optima» stol, 7% chegirma va 3 kunda yetkazish so‘radi.
Operator menejerga Telegramda yozdi. Menejer ulgurji narxni topdi: 1 890 000 × 8 = 15 120 000 so‘m.
Qoldiqni ombordan so‘radi, 20 daqiqada javob keldi: 12 ta bor.
Chegirmani ROP dan so‘radi, 10 daqiqada javob keldi: 20 mln dan kichik buyurtmaga chegirma yo‘q.
Muddat: shartnoma bo‘yicha 7 ish kuni. Operator mijozga 35 daqiqadan keyin qayta qo‘ng‘iroq qildi, mijoz «o‘ylab ko‘raman» dedi.
Javobda aytilmagan, lekin qoidaga tushadigan shartlar: 15 120 000 ≥ 10 000 000, demak Toshkent ichida yetkazish va montaj bepul; 15 120 000 > 15 000 000, demak 3D bepul.

## Tekshiruv

- Bo‘sh katak: yo‘q (A.5 dagi «-» faqat inson qadamlarida: ularni qilgan xodimning o‘zi qaror qiladi).
- Agent o‘zini o‘zi tekshiradigan qator: yo‘q.
- Javobgari yo‘q qadam: yo‘q.
- Egasi tasdiqladi: 2026-12-06.
