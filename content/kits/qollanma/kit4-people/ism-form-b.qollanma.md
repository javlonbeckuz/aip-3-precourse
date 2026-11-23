# B shakli, mashg‘ulot vazifasi: qanday to‘ldirish

B shakli - bitta xodim uchun «AI’ni o‘rgan» o‘rniga tekshirsa bo‘ladigan aniq vazifa va 15 daqiqalik suhbat yozuvi.
4-darsda tayyorlanadi; suhbat agent ishga tushishidan oldin, hech qachon keyin emas.

## Boshlashdan oldin kerak bo‘ladi

- To‘ldirilgan A shakli (`form-a-skills-map.md`).
- Sinov to‘plami: 3 ta yaxshi va 3 ta yomon real misol (`test-set.md`).
- Xodim bilan yolg‘iz, 15 daqiqa.
- Har bir xodim uchun alohida fayl: `ism-form-b.md` da «ism» o‘rniga ismi (masalan, `madina-form-b.md`).

## Har bir maydon

| Kod | Maydon | Oddiy so‘z bilan nima | Javob qayerdan olinadi | Baraka Office misoli |
|---|---|---|---|---|
| - | Xodim, Menejer, Sana | Kim uchun, kim rahbari, qachon | A shakli | Madina Sattorova (B12), showroom maslahatchisi; menejeri Jamshid Karimov (B02), loyiha yetakchisi Malika Rashidova; suhbat 2026-12-14, 09:30-09:45, bot yoqilishidan oldin |
| B.1 | Nimani tekshiradi | Qanday natijani | A shakli, A.5 | «Savdo yordamchisi» botining narx, qoldiq, chegirma, yetkazish va kafolat haqidagi javobini, mijozga aytishdan oldin |
| B.2 | Nega aynan shu xodim | Qaysi qobiliyati kerak | A shakli, A.2 | Mijozning chalkash savolidan aniq ehtiyojni ajratadi; botga savol qanchalik aniq berilsa, javob shunchalik to‘g‘ri |
| B.3 | Mezonlar | To‘g‘ri natija bu ... / xato natija bu ..., keyin 4-6 ta ha/yo‘q savol | Siz + B shakli (To‘plam 3), B.9 | «Kod va nomi mos keladimi?», «Dona soni va narx turi to‘g‘rimi (1-4 chakana, 5+ ulgurji)?», «Hisob qatori bormi va to‘g‘rimi?», «Muddat 7 ish kuni, kafolat qoidadagidekmi?», «Chegirma 5% dan oshmayaptimi?» |
| B.4 | Misollar | 3 yaxshi, 3 yomon, manbasi | test-set.md dagi 8 testdan 3 yaxshi va 3 yomon | T1 Optima 8 dona, ulgurji, 1 890 000 × 8 = 15 120 000 so‘m (yaxshi); T5 35 mln so‘mlik buyurtmaga 15% chegirma «bera olasiz» (yomon) |
| B.5 | Muddat | Qachon natijani ko‘ramiz | Siz | Mashq 2026-12-14, 11:00-11:30; botdan 14-26-dekabr; birinchi natija 19-dekabr |
| B.6 | O‘sishni qanday o‘lchaymiz | 2 ta ko‘rsatkich | Siz | Mashqda 6 misoldan nechtasini bir daqiqada to‘g‘ri baholadi (maqsad 6); ikki haftada mijozga ketgan xato narx yoki muddat (maqsad 0) |
| B.7 | Natijani kim ko‘rib chiqadi | Ikki haftadan keyin | Siz | Malika Rashidova (har kuni 17:30) va Jamshid Karimov (har shanba 16:00) |
| B.8 | Suhbatdan: savollar va xavotirlar | Xodim nima dedi, uning so‘zlariga yaqin | Suhbatdan keyin | «Bot hamma narsani bilsa, keyin menga nima ish qoladi?»; «Bot xato qilsa-yu, men payqamasam, aybdor bo‘lamanmi?» |
| B.9 | Nima deb kelishdik | Kelishuv | Suhbatdan keyin | Maosh va lavozim o‘zgarmaydi (yozma majburiyat 2027-yil 31-maygacha); bot xatosi uchun egasi javob beradi; tejalgan vaqt showroom mijozlariga |

B.4 eslatmasi: bu 6 ta misol agentning sinov to‘plami ham; yo‘riqnoma har o‘zgarganda agent shularda qayta tekshiriladi.
B.6 xodimni emas, tekshirish ishini o‘lchaydi; raqamlar maosh yoki baholash uchun ishlatilmaydi.

## 15 daqiqalik suhbat

1. Nima o‘zgaradi, oddiy so‘zlar bilan.
2. Nima o‘zgarmaydi: maosh, lavozim, jamoa.
3. Bundan buyon nimani tekshiradi va nega aynan u (A.2 dagi misol bilan).
4. Xodimdan ikki savol: «Nima sizga yordam beradi?», «Agent qayerda xato qilishi mumkin?».
«Siz» bilan, ismi va «aka» yoki «opa» bilan gapiring; «optimizatsiya», «o‘rnini bosadi», «bo‘shatilgan vaqt» demang.

## Ko‘p uchraydigan xatolar

1. B.1 da «AI’ni o‘rganadi».
   Tuzatish: tekshirsa bo‘ladigan aniq natija yozing.
2. B.3 da cheklist yo‘q, faqat «sifatli bo‘lsin».
   Tuzatish: 4-6 ta ha/yo‘q savol, bitta javobni bir daqiqadan kam vaqtda tekshirsa bo‘lsin.
3. Suhbat agent ishga tushgandan keyin bo‘ladi.
   Tuzatish: avval suhbat, keyin agent.
4. Bermaydigan va’da beriladi: «hech qachon hech kim ketmaydi».
   Tuzatish: faqat o‘zingiz aniq bajara oladigan va’dani bering; yozma majburiyat bo‘lsa, uning muddatini ayting.
5. B.8 bo‘sh qolgan.
   Tuzatish: suhbatdan keyin xavotirlarni yozing; jarayonga tegishlisini To‘plam 3 dagi B.6 ga istisno qilib qo‘shing.

## Tayyor bo‘lganini qanday bilasiz

Mentor 5-darsning boshida tekshiradi:

- [ ] Har bir xodim uchun alohida B shakli.
- [ ] B.3 da 4-6 savolli cheklist, B.4 da test-set.md dagi 6 misol, ID lari bir xil.
- [ ] Suhbat agent ishga tushishidan oldin bo‘lgan, B.8 va B.9 to‘ldirilgan.

## Claude Code bilan

```text
/kit4
```

Suhbatdan keyin:

```text
/kit4 suhbat madina
```

## Namuna

- To‘ldirilgan namuna: [madina-form-b.md](../../namunalar/baraka-office/kit4-people/madina-form-b.md) (15 daqiqalik suhbat rejasi bilan)
- Yomon misollar: [yomon-misollar.md](../../namunalar/yomon-misollar.md)
- Skill namunasi: [skills/kit4/example/](../../skills/kit4/example/) (`suhbat.md` - aniq so‘rovlar va to‘liq javoblar)
