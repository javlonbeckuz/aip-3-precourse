# B shakli, agentning ish yo‘riqnomasi: qanday to‘ldirish

B shakli - agentga beriladigan ish yo‘riqnomasi, egasining o‘z so‘zlari bilan: nima qiladi, nimani hech qachon qilmaydi, qachon odamga beradi.
3-darsda to‘ldiriladi; uyga vazifada xodimlarga ko‘rsatiladi, istisnolar qo‘shiladi va imzolanadi.

## Boshlashdan oldin kerak bo‘ladi

- To‘ldirilgan A shakli (`form-a-steps.md`): A.4 da «A» bo‘lgan qadamlar.
- Agent ishlatadigan har bir manbaning ro‘yxati va ulanish turi.
- Kompaniyaning amaldagi qoidalari: narxlar, chegirma, to‘lov, yetkazish.
- Agent bilan ishlaydigan xodimlar: istisnolarni ular biladi.

## Har bir maydon

| Kod | Maydon | Oddiy so‘z bilan nima | Javob qayerdan olinadi | Baraka Office misoli |
|---|---|---|---|---|
| - | Agent nomi | Vazifa nomi, odam ismi emas | O‘zingiz | Savdo yordamchisi |
| - | Jarayon | To‘plam 2 dagi tanlov | B.1 | Narx, qoldiq, chegirma va muddat savollariga javob (A shaklining 3, 4, 5, 6, 8-qadamlari) |
| B.1 | Agentning vazifasi | Bitta gapda nima qiladi | A shakli, «A» qadamlar | Operator yoki sotuv menejeri mijoz bilan gaplashayotganda narx, chegirma vakolati, ombor qoldig‘i, yetkazib berish va kafolat haqidagi savoliga faqat rasmiy hujjatlar asosida darhol aniq javob beradi |
| B.2 | Javobgar rahbar | Agentning ishi uchun javob beradigan odam | O‘zingiz | Jamshid Karimov (B02) |
| B.3 | Manbalar | Agent nimadan foydalanadi, har biri qanday ulanadi: API, MCP, eksport yoki qo‘lda | IT xodimi, tizim hujjatlari | Prays-list 2026: eksport (CSV, narx o‘zgarganda Madina yangilaydi); qoidalar: qo‘lda (hujjat, .md); ombor qoldig‘i: eksport, 1C hisobotidan fayl, har kuni 08:00 da Otabek aka chiqaradi; AmoCRM: hozir ulanmaydi |
| B.4 | O‘zi qila oladigan ishlar | Faqat siz ruxsat bergan harakatlar | O‘zingiz | Prays-listdagi narxni aytadi (1-4 dona chakana, 5 va undan ko‘p ulgurji), summani hisobi bilan ko‘rsatadi, 20 000 000 so‘mdan katta buyurtmaga 5% gacha chegirmani aytadi |
| B.5 | Hech qachon qilmaydigan ishlar | Taqiqlar | O‘zingiz + andozadagi 4 ta taqiq | 5% dan katta chegirma va 7 ish kunidan qisqa muddat va’da qilmaydi; yo‘q narxni o‘ylab topmaydi; tannarx haqida gapirmaydi; mijozga o‘zi yozmaydi |
| B.6 | Qachon odamga uzatadi | Holat - kimga - qanday | A shakli izohlari, xodimlar | 5% dan katta chegirma, 7 ish kunidan tezroq yetkazish, tender yoki 150 000 000 so‘mdan katta buyurtma, 1C fayli bo‘sh yoki 36 soatdan eski - Jamshid aka - bot orqali; xodimlar aytgan 3 ta istisno ham shu yerda |
| B.7 | Nimani yozib qo‘yadi | Har bir harakatdan keyin ish jurnaliga | O‘zingiz | Sana va vaqt, savol, javob, ishlatilgan manba, odamga uzatilgan bo‘lsa sababi va xarajat; kim qachon onlayn bo‘lgani yozilmaydi |
| B.8 | Ohang va til | Qanday yozadi | Kompaniya uslubi | O‘zbek tilida, «siz» bilan, qisqa |
| B.9 | Sifat mezoni | Natija qachon to‘g‘ri | O‘zingiz | Narx va summa prays-listga mos; chegirma qoidaga zid emas; muddat 7 ish kunidan qisqa emas; ma’lumot bo‘lmasa, odamga uzatilgan |
| B.10 | Tasdiqladi, sana, keyingi ko‘rib chiqish | Kim imzoladi, qachon qayta ko‘riladi | Xodimlar ko‘rgandan keyin | Jamshid Karimov (ROP), 2026-12-10, Madina, Malika va Zarina bilan 20 daqiqa ko‘rib chiqilgandan keyin; keyingi ko‘rib chiqish 2026-12-21 |

B.3 eslatmasi: har bir manba yoniga ulanish turini yozing.
API - tizimning dasturlar uchun rasmiy kirish yo‘li; MCP - AI uchun tayyor ulagich; eksport - tizimdan olinadigan fayl (Excel, CSV, Telegram JSON); qo‘lda - odam kiritadi.
Vendor API kalitini bermasa, eksport ham hisoblanadi.
To‘liq namuna yo‘riqnoma kursning tayyor botida bor: `pilot-template/agent/instructions.md`.

## Ko‘p uchraydigan xatolar

1. Hujjatlardagi qarama-qarshilik agentga ko‘chirilgan.
   Baraka misolida ROP sotuvchilarga «3 ish kunida yetkazamiz» va «12-15% chegirma» deydi, prays-list va shartnoma esa 5% / 10% va 7 ish kuni deydi.
   Tuzatish: avval bitta qoidani o‘zingiz tanlang, keyin B.4 va B.5 ga yozing; qarama-qarshilikni B.6 da odamga uzatish holati qiling.
2. B.4 da siz bermagan ruxsat bor: «mijozga o‘zi javob beradi».
   Tuzatish: birinchi haftada agent faqat xodimga javob yozadi, odam har birini tasdiqlaydi.
3. B.3 da ulanish turi yozilmagan.
   Tuzatish: har bir manba uchun API, MCP, eksport yoki qo‘lda deb yozing.
4. B.6 da faqat «murakkab holatlarda» deb yozilgan.
   Tuzatish: aniq holat, aniq odam, aniq kanal.
5. Agentga xodimning ismi berilgan: «yangi Malika».
   Tuzatish: vazifa nomi bering: «Savdo yordamchisi».
6. Xodimlar ko‘rmasdan imzolangan.
   Tuzatish: avval agent bilan ishlaydigan xodimlarga ko‘rsating, ular aytgan istisnolarni B.6 ga qo‘shing.

## Tayyor bo‘lganini qanday bilasiz

Mentor 4-darsning boshida tekshiradi:

- [ ] B.1-B.9 to‘ldirilgan, B.3 da har bir manbaning ulanish turi bor.
- [ ] Xodimlar ko‘rgan, ular aytgan istisnolar B.6 da.
- [ ] B.10 imzolangan va sana qo‘yilgan.
- [ ] B shakli `instructions.md` ga aylantirilgan.

## Claude Code bilan

```text
/kit3
```

Xodimlar istisno aytgandan keyin:

```text
/kit3 istisno
```

## Namuna

- To‘ldirilgan namuna: [Baraka Office, form-b-agent.md](../../namunalar/baraka-office/kit3-agent/form-b-agent.md)
- Yomon misollar: [yomon-misollar.md](../../namunalar/yomon-misollar.md) (kuchsiz tizim yo‘riqnomasi)
- Skill namunasi: [skills/kit3/example/](../../skills/kit3/example/) (`suhbat.md` - aniq so‘rovlar va to‘liq javoblar)
