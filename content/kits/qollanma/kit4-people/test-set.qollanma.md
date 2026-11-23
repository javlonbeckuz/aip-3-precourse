# Sinov to‘plami (test-set.md): qanday to‘ldirish

Sinov to‘plami - jarayondan olingan 3 ta yaxshi va 3 ta yomon real misol.
Ular ikki ishga xizmat qiladi: To‘plam 4 dagi B.4 mashg‘ulot misollari va agentning sinov to‘plami (test set); 3-dars uyga vazifasida yig‘iladi, 5-darsda har bir xatodan keyin to‘ldiriladi.

## Boshlashdan oldin kerak bo‘ladi

- Jarayonning o‘tgan haftalardagi real holatlari: Telegram yozishmalari, qo‘ng‘iroq yozuvlari, CRM yozuvlari.
- Har bir holat uchun to‘g‘ri javob hujjati (prays-list, qoidalar, shartnoma).
- Yaxshi va yomon holatlarni ajrata oladigan xodim (Baraka misolida Jamshid Karimov yoki Malika Rashidova).
- Vaqt: 30-40 daqiqa.

## Har bir maydon

| Kod | Maydon | Oddiy so‘z bilan nima | Javob qayerdan olinadi | Baraka Office misoli |
|---|---|---|---|---|
| - | Sarlavha: [jarayon] | Qaysi jarayon misollari | To‘plam 2, B.1 | Narx, qoldiq, chegirma va muddat savollariga javob |
| - | Ro‘yxat: ID, Baho, Qisqacha, Manba | Hamma misollar bir jadvalda | Quyidagi bo‘limlar | T1 yaxshi, «Optima, 8 dona: ulgurji narx bilan to‘g‘ri hisob», Malika, Telegram, 2026-11-25 |
| T1-T4 | Kirish | Agent nimani oladi: savol yoki hujjat | Real holat | «Optima stolidan 8 ta kerak, qancha bo‘ladi?» |
| T1-T4 | Natija | Real ishda to‘g‘ri berilgan javob | Real holat | 8 dona - ulgurji narx: 1 890 000 × 8 = 15 120 000 so‘m |
| T1-T4 | Nega yaxshi | Nimasi to‘g‘ri | Hujjat bilan solishtirish | 5 va undan ko‘p dona uchun ulgurji narx olingan |
| T5-T7 | Natija (xato bilan) | Real ishda berilgan noto‘g‘ri javob | Real holat | T5: «Ha, katta buyurtma, 15% bera olasiz» |
| T5-T7 | Nega yomon | Qaysi qoida buzilgan | Hujjat | Menejer 5% gacha, ROP 10% gacha; 15% taqiqlangan; 35 mln ga 15% - 5 250 000 so‘m yo‘qotish |
| T5-T7 | To‘g‘ri natija | Qanday bo‘lishi kerak edi | Hujjat | «ODAMGA: 15% chegirma menejer vakolatidan (5%) yuqori», Jamshid Karimovga uzatiladi |
| T1-T8 | Tekshirish | Agent javobi qanday bo‘lsa, o‘tdi | Siz | «Javobda 15% va’da qilinmagan va ROP ga uzatilgan bo‘lsa, o‘tdi» |
| T9, T10 ... | Yangi misollar | Agent xatosidan keyin qo‘shiladi | /kit5 xato | 15.12 da bot 5 ta Optima stolga chakana narx aytdi: 5-darsda `ulgurji-5-dona` testi bo‘ldi; Barakada sinov oxirida 14 ta test (`numbers.md`, xatolar jurnali) |
| - | Sinov natijalari | Har bir yo‘riqnoma o‘zgarishidan keyin bitta qator | Agentni hamma misolda sinash | Sana, o‘zgarish, nechtasi o‘tdi |

Baraka misolidagi savollar kursning tayyor botidagi sinovlar bilan bir xil: `pilot-template/evals/test-set.toml`.
Baraka namunasida 8 ta misol, botning test faylidagi 8 ta test bilan bir xil.
Yaxshi misollar: T1 Optima 8 dona (ulgurji, 1 890 000 × 8 = 15 120 000 so‘m), T2 Start 2 dona (chakana, 1 450 000 × 2 = 2 900 000 so‘m), T3 ErgoPro X5 3 dona (chakana, 2 850 000 × 3 = 8 550 000 so‘m), T4 ErgoPro qoldig‘i (150 dona, 1C fayli sanasi bilan).
Yomon misollar: T5 35 mln so‘mlik buyurtmaga 15% chegirma, T6 «3 kunda yetkazamiz», T7 ErgoPro mexanizmiga «36 oy kafolat».
Xavfsizlik testi: T8, tannarx so‘ralsa, bot aytmaydi.
Sinov davomida botning real xatolaridan yangi testlar qo‘shildi: 5-darsda 4 ta (5 va 6 dona - ulgurji, 18 mln ga chegirma, viloyatga yetkazish), 2-haftada T13 (aniq topilmagan mahsulot) va T14 (12 mln ga bepul 3D): oxirida 14 ta.

## Ko‘p uchraydigan xatolar

1. Faqat oson, to‘g‘ri misollar yig‘ilgan.
   Bunday to‘plam agent xatoni qayerda qilishini ko‘rsatmaydi.
   Tuzatish: kamida 3 ta yomon yoki qiyin holat qo‘shing: ruxsatsiz chegirma, qisqa muddat va’dasi, ma’lumotda yo‘q narsa.
2. Misollar o‘ylab topilgan.
   Tuzatish: faqat real holatlardan oling va manbasini yozing.
3. «Tekshirish» qatori yo‘q.
   Tuzatish: har bir misolga aniq qoida yozing, aks holda «o‘tdi» yoki «o‘tmadi» ni hech kim ayta olmaydi.
4. Mijozning telefon yoki karta raqami qolgan.
   Tuzatish: yashiring yoki o‘zgartiring (+998 90 *** ** 12).
5. Agent xatosidan keyin yangi misol qo‘shilmagan.
   Tuzatish: har bir B.13 yozuvidan yangi test qiling (Barakada 8 tadan 14 taga yetdi).

## Tayyor bo‘lganini qanday bilasiz

Mentor 4-darsning boshida tekshiradi:

- [ ] 3 ta yaxshi va 3 ta yomon real misol bor, har birida manba.
- [ ] Har bir misolda «Tekshirish» qatori bor.
- [ ] Shaxsiy ma’lumot yashirilgan.
- [ ] Agent yo‘riqnoma o‘zgargandan keyin hamma misolda sinalgan va natija yozilgan.

## Claude Code bilan

```text
/kit4
```

/kit4 misollarni sizdan so‘rab, shu shaklga keltiradi; o‘zidan misol to‘qimaydi.
Agent xato qilganda `/kit5 xato` yangi misol qo‘shadi.

## Namuna

- To‘ldirilgan namuna: [Baraka Office, test-set.md](../../namunalar/baraka-office/kit4-people/test-set.md)
- Yomon misollar: [yomon-misollar.md](../../namunalar/yomon-misollar.md) (faqat oson holatlardan iborat sinov to‘plami)
- Skill namunasi: [skills/kit4/example/](../../skills/kit4/example/) (`suhbat.md` - aniq so‘rovlar va to‘liq javoblar)
- Sinov davomida qo‘shilgan testlar (8 → 12 → 14): [Baraka Office, numbers.md](../../namunalar/baraka-office/kit5-pilot/numbers.md) (xatolar jurnali)
