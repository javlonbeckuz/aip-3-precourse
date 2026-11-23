# 5-mashq: To‘plam 5 B shakli: 1-hafta ustuni va topilgan pul (B.14)

5-dars, 0:03-0:18 stolda (mentor bilan), qolgani uy vazifasida.
Natija: `kit5-pilot/numbers.md` da 1-hafta ustuni to‘liq, har bir raqamning manbasi bilan; topilgan pul qatori isbotlangan va isbotlanmagan qismlarga ajratilgan.

## Kerak bo‘ladi

- Botdan `/hafta` fayli (`kit5-raqamlar-<sana>.md`).
- `kit5-pilot/numbers.md` (4-darsda «Agentgacha» ustuni to‘ldirilgan) va `kit5-pilot/plan.md`.
- Soatbay haq: jarayonda ishlaydigan xodimlarning oyligi / oyiga ish soati (173,3 yoki 200 soat; qaysi birini olganingizni yozing).
- Tekshiruvchi (loyiha yetakchisi) bilan 5 daqiqa: u bu hafta tekshirishga qancha vaqt sarfladi.

## Qanday bajariladi

1. **Bot sanaganini ko‘chiring.**
   `/hafta` faylidan: B.1, B.3, B.5, odamga uzatilganlar va model xarajati.
   Bot bu qatorlarni jurnaldan sanaydi; ularni qo‘lda o‘zgartirmang, faqat izoh yozing.
2. **Bot sanay olmaydiganini qo‘lda to‘ldiring.**
   - B.2 O‘rtacha vaqt: har bir so‘rov turidan 3 ta holatni o‘lchang (xodim savol yozadi va javobni o‘qiydi).
     Tekshiruv vaqti bu yerga kirmaydi.
   - B.4 Takroriy so‘rovlar: bir mijoz bir narsani ikki marta so‘ragan holatlar (Telegram guruhi, CRM).
   - B.6 Yakunlangan bitimlar: CRM yoki 1C dan, xuddi shu kunlar uchun.
   - B.7 Tekshirish vaqti: butun vazifa uchun bitta raqam, soatda.
     Kim qancha tekshirgani emas, jami.
   - B.8 Mijoz shikoyatlari: shu hafta.
3. **Topilgan pul (B.14).**
   Har bir holat alohida qator: sana, nima bo‘ldi, summa, qanday hisoblandi.
   Isbotlangan summa (hujjat bor: hisob-faktura, to‘lov, 1C) ustunga yoziladi.
   Isbotlanmagan summa `[?]` bilan yoziladi va jamiga qo‘shilmaydi.
4. **Xarajatlar:** B.9 obuna (oyliksini 4,3 ga bo‘ling), B.10 sozlash, B.11 = B.7 x soatbay haq, B.12 = jami.
5. **B.13 xatolar jurnali:** `/hafta` faylidagi jadvalni ko‘chiring, «Nimani o‘zgartirdik» ni 2-mashqdan to‘ldiring.
6. **Ta’rifni tekshiring:** B.1 oldin ham, hozir ham bir xil ishni sanayaptimi?
   Sinfda yuborilgan sinov savollari ham B.1 ga kiradi: ularni ayirib tashlang va izoh yozing.

### Claude Code uchun topshiriq

```text
/kit5 hafta 1
```

Skill raqamlarni so‘raydi, har birining manbasini `## Hisoblar` bo‘limiga yozadi va topilgan pulni isbotlangan va isbotlanmagan qismlarga ajratadi.
`/hafta` faylini oldindan `kit5-pilot/` ga qo‘ying, skill uni o‘qiydi.

## «Topilgan pul» nima va nima emas

| Topilgan pul (B.14) | Topilgan pul emas |
|---|---|
| Agent tufayli oldi olingan xato: noto‘g‘ri narx, noto‘g‘ri muddat mijozga ketmadi | Agentning o‘z xatosini tekshiruvchi ushlagani: bu tekshirish xarajati (B.11) |
| Yo‘qolmagan so‘rov: kechki savol ertalab javob oldi va sotuvga aylandi | Sotuvning butun summasi: daromad emas, faqat sizga qolgan qismi (marja) va faqat busiz yo‘qolishi aniq bo‘lsa |
| Tezroq tushgan pul: eslatma tufayli to‘lov oldinroq keldi | «Bo‘lishi mumkin edi» degan taxmin, hujjatsiz |
| Oldin bepul berib yuborilgan xizmat endi to‘g‘ri hisoblandi | Tejalgan soatlar: ular B.15 da alohida hisoblanadi |

Mahalliy maoshlarda tejalgan soatlar ko‘pincha vositaning oylik narxidan kichik chiqadi.
Hamkorlarni odatda topilgan pul qatori ishontiradi: shuning uchun uni halol va hujjat bilan yozing.

## Baraka Office namunasi

To‘liq to‘ldirilgan shakl: `namuna/kompaniya/kit5-pilot/numbers.md`.
Bot sanagan qatorlar: `namuna/baraka-1-hafta/kit5-raqamlar-2026-12-20.md` (yakshanba 10:20 dagi `/hafta`).
Baraka sanalari yakshanba guruhiniki (5-dars 20-dekabr); shanba guruhida hammasi bir kun oldin (19-dekabr).
Bu kursning umumiy Baraka namunasi: 6-darsda xuddi shu 1-hafta ustunini davom ettirasiz.

| Ko‘rsatkich | Agentgacha | 1-hafta | Manba |
|---|---|---|---|
| B.1 Bajarilgan so‘rovlar | 120 | 132 | bot jurnali, 14-19.12 |
| B.2 O‘rtacha vaqt, daqiqa | 6 | 2,5 | Madina 10 ta holatni soat bilan o‘lchadi, tekshirishsiz |
| B.3 Xato javoblar | 9 | 7 | bot jurnali (❌ bosilgan yoki tasdiqlashda tuzatilgan) = xatolar jurnalidagi 7 qator |
| B.4 Takroriy so‘rovlar | 15 | 12 | savdo guruhi Telegram yozishmasi, 14-19.12 |
| B.5 To‘liq hal qilingan | 100 | 104 | bot jurnali |
| B.6 Yakunlangan buyurtmalar | - | - | bu jarayon bitimni bevosita yopmaydi: o‘lchanmaydi |
| B.7 Tekshirish vaqti, soat | 0 | 4,5 | Malika har qoralamani tasdiqladi, 17:30 da ❌ larni ko‘rdi (2,5); Jamshid aka uzatishlar va jurnal (2) |
| B.14 Topilgan pul, so‘m | 0 | 0 | bu hafta isbotlangan holat yo‘q |
| B.8 Mijoz shikoyatlari | 2 | 2 | Telegram va amoCRM «shikoyat» tegi: ikkalasi ham sinovgacha berilgan muddat va’dasi haqida |

**Topilgan pul 0 so‘m:** bu halol natija.
Bu hafta agent pulni saqlab qolgan, hujjat bilan isbotlanadigan holat bo‘lmadi.
Birinchi holat ko‘pincha 2-haftada keladi: namunada 23-dekabr kuni mijoz 34 000 000 so‘mlik buyurtmaga 12% chegirma so‘radi, bot qoidani aytdi, ROP 100% oldindan to‘lov bilan 10% berdi (uy vazifasi, `homework.md`).
O‘ylab topilgan summadan ko‘ra «0 va sababi» yaxshiroq: 6-darsda mentor har bir summaning hujjatini so‘raydi.

Xarajat va natija (1-hafta):

```text
Soatbay haq: (12 x 25 000 + 5 x 22 500 + 8 x 60 000) / 25 = 35 700 so‘m
             (Madina, Malika, Jamshid aka: oklad / 200 soat; kuniga 12, 5 va 8 ta savol)
B.9  = server 200 000 / 4,3 + Claude Pro 267 500 / 4,3 + OpenRouter $0,67 x 11 941,65
     = 46 512 + 62 209 + 8 001 = 116 722 so‘m
B.10 = 0 so‘m hozircha (sozlash soatlari 6-darsda qo‘shiladi)
B.11 = 4,5 soat x 35 700 = 160 650 so‘m
B.12 = 116 722 + 0 + 160 650 = 277 372 so‘m
B.15 = (6 - 2,5) x 132 / 60 - 4,5 = 7,7 - 4,5 = 3,2 soat/hafta
B.16 = agent: 277 372 / 104 = 2 667 so‘m; inson: 6 / 60 x 35 700 = 3 570 so‘m
```

**Qanday o‘qiladi:** 1-haftada bitta ish agent bilan 2 667 so‘m, inson bilan 3 570 so‘m.
Tekshirish (B.11) xarajatning 58 foizi: 1-hafta ishonch qozonish haftasi, Malika har bir qoralamani tasdiqladi.
5-darsdagi ruxsat qarori, qisman to‘g‘ridan-to‘g‘ri: 2-haftada narx va qoldiq javoblari to‘g‘ridan-to‘g‘ri ketadi, chegirma va yetkazish muddati javoblarini Malika 100% tasdiqlaydi.
Botda bu `REPLY_MODE=topics` va `agent/approval.toml` dagi `direct_topics = ["narx", "qoldiq"]` (yoki telefondan `/darhol narx qoldiq`).
Tejalgan vaqt hozircha 3,2 soat: B.7 ni ayirmasangiz, 7,7 chiqardi.

**B.1 haqida:** 132 agentgachadagi 120 dan ko‘p.
Bot bilan so‘rash oson bo‘ldi: ilgari menejer ba’zan so‘ramasdan taxmin qilardi, endi so‘raydi; takroriy so‘rovlar esa 15 dan 12 ga tushdi (B.4).
Bir xil ish o‘lchanmoqda (savdo bo‘limining narx, qoldiq, chegirma va muddat savollari): buni izohga yozing.

**B.3 haqida:** 7 ta xatoning hammasi mijozga ketmasdan ushlangan (Malika qoralamalarni tasdiqlagan, xodimlar ❌ bosgan).
Agentgacha sanalgan 9 xato mijozga ketgan javoblarda edi: buni ham izohga yozing.

## Yomon namuna

> B.14 Topilgan pul (1-hafta): 9 450 000 so‘m.
> - 5 ta Optima buyurtmasi, bot narxni aytdi: 9 450 000
>
> B.7: -
> B.15 = (6 - 2,5) x 132 / 60 = 7,7 soat tejaldi.

**Nimasi yomon:**

- Buyurtmaning butun summasi topilgan pul emas: bu daromad, foyda emas, va bot bo‘lmaganda ham sotilarmidi - noma’lum.
- Bu buyurtmada bot avval xato qilgan (chakana narx aytgan) va xatoni Malika ushlagan: agentning o‘z xatosini xodim ushlagani - pul topish emas, tekshirishning narxi.
- B.7 bo‘sh: tekshirish vaqti ayirilmagan, tejalgan vaqt 2,4 barobar oshirib ko‘rsatilgan (3,2 o‘rniga 7,7).
- Summaning hujjati yo‘q: 6-darsda mentor raqamlar tekshiruvidan o‘tmaydi (7-band: manbasiz summa o‘chiriladi).

**To‘g‘rilangan:** yuqoridagi Baraka jadvali: B.14 = 0 va sababi, B.7 = 4,5 soat ayirilgan, B.15 = 3,2.

## Tez-tez uchraydigan xatolar

- **Birliklar aralash.** B.2 daqiqa, B.7 soat, B.1 haftasiga; sarlavhada yozilganidek.
- **Agentgacha qatori bo‘sh.** Taqqoslab bo‘lmaydi: tarixdan (1C, CRM, Telegram) hozir oling va manbasini yozing.
- **Topilgan pul «0».** Bu ham halol natija; yonida bir gap: «bu hafta isbotlangan holat bo‘lmadi».
- **Raqamni kimdir «yaxshiroq» qilib o‘zgartirdi.** Bot sanagan qatorlarni o‘zgartirmang; izoh yozing.
- **Xodim bo‘yicha raqamlar.** Shakl jarayonni o‘lchaydi: «Malika 30 ta savol berdi» kabi yozuvlar bo‘lmaydi.

## Tayyor, agar

- [ ] 1-hafta ustunidagi har bir katakda raqam yoki `[?]` va manba bor.
- [ ] B.7 tekshirish vaqti yozilgan va B.15 da ayirilgan.
- [ ] B.14: har bir summa alohida qator, hisob va hujjat bilan; isbotlanmagani `[?]`.
- [ ] B.9-B.12 hisoblangan (hozircha 1-hafta uchun).
- [ ] B.13 dagi har bir xatoda «Nimani o‘zgartirdik» to‘ldirilgan.
- [ ] Mentor ko‘rdi (tekshiruv 5.3).
