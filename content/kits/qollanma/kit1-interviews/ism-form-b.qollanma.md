# B shakli, vazifalar ro‘yxati: qanday to‘ldirish

B shakli - bitta xodim hafta davomida qaysi vazifaga qancha vaqt sarflashining jadvali.
1-darsdan keyin har bir suhbat uchun to‘ldiriladi; 2-darsda To‘plam 2 shu fayllardan jarayonlarni tanlaydi.

## Boshlashdan oldin kerak bo‘ladi

- Suhbat transkripti yoki qaydlar (`ism-transcript.md`).
- Kompaniyada haftasiga necha ish kuni ekani (CLAUDE.md).
- Xodimning o‘zi: oxirida raqamlarni u tuzatadi.
- Vaqt: /kit1 bilan 15-20 daqiqa, xodim bilan ko‘rib chiqish 10 daqiqa.

## Har bir maydon

| Kod | Maydon | Oddiy so‘z bilan nima | Javob qayerdan olinadi | Baraka Office misoli |
|---|---|---|---|---|
| - | Xodim, Lavozim, Bo‘lim | Kimning ro‘yxati | A shakli | Malika Rashidova (B04), savdo menejeri, savdo |
| - | Sana | Ro‘yxat tuzilgan kun | Taqvim | Suhbat 2026-11-24, B shakli 2026-11-26 |
| - | Xodim ko‘rib chiqdi | Xodim raqamlarni tuzatgan sana | Xodim bilan uchrashuv | 2026-11-27; bo‘sh bo‘lsa, raqamlar hali taxmin |
| B.1 | Vazifa (fe’l bilan) | Bitta aniq ish, fe’l bilan boshlanadi | Transkript | «Prays-listdan narxni topish» |
| B.2 | Haftasiga necha marta | Haftada nechta, hisobi bilan | Transkript + ish haftasi | 72 (kuniga 12 × 6 kun) |
| B.3 | Har safar, daqiqa | Bir martasiga necha daqiqa | Transkript | 3 |
| B.4 | Haftalik vaqt, soat | B.2 × B.3 / 60 | Hisob | 3,6 (72 × 3 / 60) |
| B.5 | Ma’lumot qayerdan keladi | Ish uchun kerakli ma’lumot manbasi | Transkript | Excel prays-list (14 sahifa) |
| B.6 | Natija kimga yoki qayerga | Tayyor ish kimga ketadi | Transkript | Mijozga, telefonda |
| B.7 | Qoida Q / Fikr F | Q - har safar bir xil qoida; F - tajriba va mulohaza | O‘zingiz baholaysiz | Q (narx topish); mijoz bilan jonli suhbat esa F |
| B.8 | Xatoning narxi | past, o‘rta, yuqori | A.5 javobi | yuqori: eski narx bo‘yicha 350 000 so‘m zarar; chakana narx aytilsa, mijoz ketadi |
| B.9 | Ertaga A/R/I/B | Ertaga kim qiladi: A agent, R robot, I inson, B birga | Egasi hal qiladi, /kit1 taklif beradi | B: agent narxni darrov aytadi, Malika tekshiradi |
| - | Haftasiga jami soat | Hamma B.4 yig‘indisi, qo‘shiluvchilar bilan | Hisob | 32,4 (2,0 + 9,6 + 9,0 + 3,6 + 1,2 + 3,2 + 3,8), ikki marta qo‘shilgan |
| - | Raqamlar tekshiruvi | Transkriptdagi har bir raqam, iqtibos va holati bilan (/kit1 qo‘shadi) | Transkript, audio | «kuniga 34 marta» → 4 (egasi audiodan, xodim tasdiqladi); «1 300 000 yo‘qotdik» → 350 000 so‘m |

`[?]` - taxmin: xodim bilan tekshirish kerak.
Har bir hisob formulasi bilan yoziladi, kasr vergul bilan: 3,6.

## Raqamlarni tekshirish

Transkriptdagi har bir raqamni audio bilan solishtiring.
«bir uch-to‘rt yuz ming» taxminan 300 000-400 000 so‘m degani, «1 300 000» emas.
Baraka misolida egasi audioni eshitdi, Malika aniq summani aytdi: 350 000 so‘m.
Raqam oldidagi «bir» ko‘pincha «taxminan» degani; «bir yarim soat» esa doim 90 daqiqa.
Raqamlarni bir-biri bilan solishtiring: oylik zarar ÷ oyiga xatolar soni = bitta xato narxi; natija mantiqqa to‘g‘ri kelmasa, raqamlardan biri xato.

## Ko‘p uchraydigan xatolar

1. Vazifalar umumiy: «mijozlar bilan ishlash», «hujjatlar».
   Tuzatish: har bir qatorda bitta harakat, fe’l bilan: «Prays-listdan narxni topish».
2. Bir nechta vazifa bitta qatorga qo‘shilgan.
   Tuzatish: alohida qatorlarga ajrating, aks holda To‘plam 2 da baholab bo‘lmaydi.
3. Shubhali raqam tekshirilmasdan qolgan («1 300 000»).
   Tuzatish: «Raqamlar tekshiruvi» jadvalini to‘ldiring va audioni eshiting.
4. B.4 da hisob yo‘q, faqat natija.
   Tuzatish: «72 × 3 / 60 = 3,6» shaklida yozing, jami qatorni ikki marta qo‘shing.
5. B.9 ni AI hal qilgan.
   Tuzatish: B.9 ni egasi belgilaydi; pul, mijoz va xodimga baho tegadigan ishda «B» tanlang.
6. Xodim ko‘rmagan, `[?]` lar qolgan.
   Tuzatish: ro‘yxatni xodimga ko‘rsating, tuzatishlarini `/kit1 malika` bilan kiriting.

## Tayyor bo‘lganini qanday bilasiz

Mentor 2-darsning boshida tekshiradi:

- [ ] Kamida 2 ta xodimning B shakli .md fayl sifatida bor.
- [ ] Daqiqa va takrorlanish sonini xodim tuzatgan, `[?]` qolmagan, «Xodim ko‘rib chiqdi» to‘ldirilgan.
- [ ] Har bir vazifada B.9 (A, R, I yoki B) belgilangan.
- [ ] Haftalik jami soat hisobi bilan yozilgan.

## Claude Code bilan

```text
/kit1 malika-transcript.md
```

Xodim ro‘yxatni tuzatgandan keyin:

```text
/kit1 malika
```

## Namuna

- To‘ldirilgan namunalar: [malika-form-b.md](../../namunalar/baraka-office/kit1-interviews/malika-form-b.md) (32,4 soat/hafta, xodim tuzatishlari bilan), [zarina-form-b.md](../../namunalar/baraka-office/kit1-interviews/zarina-form-b.md) (32,2), [jamshid-form-b.md](../../namunalar/baraka-office/kit1-interviews/jamshid-form-b.md) (20,8)
- Yomon misollar: [yomon-misollar.md](../../namunalar/yomon-misollar.md) (noaniq vazifalar ro‘yxati, tekshirilmagan raqam)
- Skill namunasi: [skills/kit1/example/](../../skills/kit1/example/) (`suhbat.md` - aniq so‘rovlar va to‘liq javoblar)
