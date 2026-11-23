# A shakli, qobiliyatlar xaritasi: qanday to‘ldirish

A shakli - ishi o‘zgarayotgan har bir xodimning eng kuchli qobiliyati va yangi ish taqsimotidagi o‘rni.
4-darsda to‘ldiriladi, agent ishga tushishidan oldin bo‘lim boshlig‘i bilan tekshiriladi.

## Boshlashdan oldin kerak bo‘ladi

- To‘plam 3, A shakli: qaysi qadamlar agentga o‘tadi va kim tekshiradi (A.4, A.5).
- To‘plam 1 dagi har bir xodimning B shakli: bugungi ishi.
- Har bir xodim uchun bitta real misol: u qachon o‘z qobiliyatini ko‘rsatgan.
- Bo‘lim boshlig‘i bilan 15 daqiqa.

## Har bir maydon

| Kod | Maydon | Oddiy so‘z bilan nima | Javob qayerdan olinadi | Baraka Office misoli |
|---|---|---|---|---|
| - | Bo‘lim, Jarayon, Sana | Qaysi bo‘lim va jarayon | To‘plam 2 va 3 | Savdo bo‘limi; narx, qoldiq, chegirma va muddat savollariga javob («Savdo yordamchisi»); 2026-12-13 |
| A.1 | Xodim | Ishi o‘zgarayotgan odam | To‘plam 3, A.3 va A.5 ustunlari | Madina Sattorova (B12), Malika Rashidova (B04), Bekzod Aliyev (B03), Zarina Abdullayeva (B13), Otabek Mirzayev (B32), Jamshid Karimov (B02) |
| A.2 | Eng kuchli qobiliyati | Eng yaxshi qiladigan ishi, real misol bilan | Egasi yoki bo‘lim boshlig‘i | Madina: 1-dekabr «Optima’dan 8 ta» degan mijozga «140 lik stolmi, qachonga kerak?» deb qayta so‘rab, buyurtmani aniqladi; Zarina: oktabrda yetkazish kechikkan mijozni boshqa joyga ketkazmay, Jamshid akaga ulagan |
| A.3 | Bugungi asosiy ishi | Hozir eng ko‘p vaqtini oladigan ish | To‘plam 1, B shakli (suhbat bo‘lmagan bo‘lsa, kuzatuv) | Madina: showroom va Telegram’da narx, qoldiq, muddat savollari, kuniga taxminan 12 ta (egasining bahosi, Jamshid aka kuzatuvidan, suhbat bo‘lmagan); Malika: qo‘ng‘iroqlar haftasiga 192, narx topish 72 marta |
| A.4 | Yangi ish taqsimotidagi roli | Qobiliyati ertaga qayerda ishlaydi | A.2 + To‘plam 3 | Madina: savolni aniq qilib botga beradi, javobni mijozga aytishdan oldin o‘qiydi; Malika: loyiha yetakchisi, 1-hafta qoralamalarni tasdiqlaydi; Jamshid aka: bot uzatgan qiyin holatlarni hal qiladi |
| A.5 | Yangi nazorat vazifasi | Aniq nimani tekshiradi | To‘plam 3, A.5 | Madina: har bir javobda 5 ta savol (kod, dona soni va narx turi, hisob qatori, muddat 7 ish kuni, chegirma 5% gacha); xato bo‘lsa ❌ va bir gap |
| A.6 | O‘qish kerakmi | ha yoki yo‘q | Siz va xodim | Madina: ha, 30 daqiqa, 6 misol ustida; Jamshid aka: yo‘q |

## Ko‘p uchraydigan xatolar

1. A.2 da umumiy maqtov: «yaxshi xodim», «mas’uliyatli».
   Tuzatish: bitta real voqea yozing: qachon, nima qildi.
2. A.4 qobiliyatga bog‘lanmagan: hammaga «agentni tekshiradi».
   Tuzatish: har kimning kuchli tomoni ishlaydigan joyni tanlang.
3. Ro‘yxatda faqat bitta odam, tekshiruvchi xodim unutilgan.
   Tuzatish: To‘plam 3 dagi A.5 ustunidagi hamma odamlarni kiriting.
4. Xodimlar baholanadi yoki solishtiriladi: «Bekzod Malikadan sustroq».
   Tuzatish: bu varaq odamlarni kuchaytirish haqida; solishtirmang.
5. Xodimlar haqidagi yozuvlar roziliksiz AI’ga beriladi.
   Tuzatish: Mehnat kodeksi 178-modda (lex.uz/mact/6257288) bo‘yicha xodimning yozma roziligi kerak; rozilik bo‘lmasa, ism o‘rniga lavozimni yozing; yurist tasdiqlasin.

## Tayyor bo‘lganini qanday bilasiz

- [ ] Ishi o‘zgarayotgan har bir xodim ro‘yxatda.
- [ ] Har bir A.2 da real misol bor.
- [ ] A.4 va A.5 A.2 dagi qobiliyatdan foydalanadi.
- [ ] Bo‘lim boshlig‘i tekshirgan.

## Claude Code bilan

```text
/kit4
```

/kit4 ishi o‘zgarayotgan xodimlarni To‘plam 3 dan topadi va har biri uchun sizdan qobiliyati va real misolni so‘raydi.

## Namuna

- To‘ldirilgan namuna: [Baraka Office, form-a-skills-map.md](../../namunalar/baraka-office/kit4-people/form-a-skills-map.md)
- Yomon misollar: [yomon-misollar.md](../../namunalar/yomon-misollar.md)
- Skill namunasi: [skills/kit4/example/](../../skills/kit4/example/) (`suhbat.md` - aniq so‘rovlar va to‘liq javoblar)
