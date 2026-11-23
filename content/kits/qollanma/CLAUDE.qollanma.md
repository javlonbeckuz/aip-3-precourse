# CLAUDE.md: qanday to‘ldirish

CLAUDE.md - kompaniyangiz haqidagi qoidalar varag‘i: Claude Code har safar papkani ochganda uni o‘qiydi.
2-darsda /init birinchi matnni yozadi, siz uni shu tartibga keltirasiz; /kit1 ... /kit5 ish kunlari va soatbay haqni shu fayldan oladi.

## Boshlashdan oldin kerak bo‘ladi

- Kompaniya papkasi (`kompaniya/`) va unda bir marta ishga tushirilgan /init.
- Xodimlar ro‘yxati (HR yoki buxgalteriyadan): soni va bo‘limlar.
- Ichki tartib hujjati: ish kunlari va soatlari.
- Jarayonda ishlaydigan odamlarning oyligi: soatbay haqni hisoblash uchun (bitta lavozim bo‘lsa, bittasi yetadi).
- Kompaniya ishlatadigan tizimlar ro‘yxati (CRM, 1C, Excel, Telegram guruhlari, to‘lov tizimlari).
- Vaqt: 15-20 daqiqa.

## Har bir maydon

| Kod | Maydon | Oddiy so‘z bilan nima | Javob qayerdan olinadi | Baraka Office misoli |
|---|---|---|---|---|
| - | Sarlavha | Kompaniyaning nomi | Ro‘yxatdan o‘tish guvohnomasi | Baraka Office |
| - | Nima qilamiz | Mahsulot yoki xizmat, bitta gapda | O‘zingiz | Ofis mebeli ishlab chiqaramiz (Sergeli, 3 500 m² zavod), Chilonzorda showroom, ofislarni «kalit topshirish» bilan jihozlaymiz |
| - | Mijozlar | Kim sotib oladi, qayerda | Savdo bo‘limi, CRM | Toshkentdagi kompaniyalar (B2B), tenderlar |
| - | Xodimlar, bo‘limlar | Nechta odam, qaysi bo‘limlar | HR ro‘yxati | 64 kishi; savdo: rahbar Jamshid Karimov, 8 menejer, 2 showroom maslahatchisi, 2 call-markaz operatori; yana marketing, dizayn, HR, moliya, IT, ma’muriy, ishlab chiqarish va logistika |
| - | Ish haftasi | Haftasiga necha ish kuni | Ichki tartib hujjati | 6 kun: dushanba-juma 09:00-18:00, shanba 09:00-15:00 (haftasiga 46 soat) |
| - | O‘rtacha soatbay haq | Bir soat ishning narxi, so‘mda | Oylik ÷ oyiga ish soatlari; bir necha odam bo‘lsa, kim qancha ish qilishiga qarab o‘rtacha | 35 700 so‘m: oklad ÷ 200 soat (46 × 4,3 ≈ 200); Madina 25 000, Malika 22 500, Jamshid aka 60 000, savollarga kim javob berishiga qarab o‘rtacha (hisobi `kit5-pilot/numbers.md` da) |
| - | Tizimlar | Ma’lumot qayerda turadi | IT xodimi yoki o‘zingiz | amoCRM (savdo), 1C (ombor, buxgalteriya), Excel prays-list, «Baraka Savdo» Telegram guruhi, Instagram, Click, Payme, Didox |
| - | Qoidalar | Claude qanday ishlashi kerak | Andozadagi 6 ta qoida + o‘zingiznikilar | Andozadagi qoidalar o‘zgarishsiz |
| - | Kitlar | Har bir to‘plam qaysi papkada | Andoza | O‘zgarishsiz qoldiriladi |

## Ko‘p uchraydigan xatolar

1. «Ish haftasi» yozilmagan.
   /kit1 «kuniga 3 marta» degan gapni haftaga aylantirolmaydi va har safar so‘raydi.
   Tuzatish: aniq «haftasiga 6 ish kuni» deb yozing.
2. Soatbay haq o‘rniga oylik yozilgan.
   To‘plam 5 dagi xarajatlar 200 baravar katta chiqadi.
   Tuzatish: oylikni oyiga ish soatlariga bo‘ling va hisobni qavsda qoldiring.
3. Kalit, parol yoki bot tokeni CLAUDE.md ga yozilgan.
   Tuzatish: ularni faqat `.env` faylida saqlang.
4. «Kitlar» bo‘limi o‘chirib tashlangan yoki papka nomlari o‘zgartirilgan.
   Tuzatish: papka nomlarini andozadagidek qoldiring, skillar aynan shu nomlarni qidiradi.
5. Juda uzun matn: kompaniya tarixi, missiya, shiorlar.
   Tuzatish: 30-40 qatordan oshirmang, Claude har safar hammasini o‘qiydi.

## Tayyor bo‘lganini qanday bilasiz

- [ ] Claude kompaniyangiz haqidagi oddiy savolga (masalan, «Qaysi kunlari ishlaymiz?») shu fayldan to‘g‘ri javob beradi.
- [ ] Ish haftasi va soatbay haq raqam bilan yozilgan.
- [ ] «Kitlar» bo‘limi va papka nomlari andozadagidek.
- [ ] Faylda hech qanday kalit yoki parol yo‘q.

## Claude Code bilan

Kompaniya papkasida Claude Code’ni oching va yozing:

```text
/init
```

Keyin shuni yozing:

```text
CLAUDE.md ni templates/kompaniya/CLAUDE.md tartibiga keltir. Menga savol berib, qavs ichidagi joylarni to‘ldir.
```

## Namuna

- To‘ldirilgan namuna: [Baraka Office, CLAUDE.md](../namunalar/baraka-office/CLAUDE.md)
- Yomon misollar: [yomon-misollar.md](../namunalar/yomon-misollar.md)
- Skill namunasi: [skills/kit1/example/](../skills/kit1/example/) (`input/CLAUDE.md` - skill sinovida ishlatilgan Baraka CLAUDE.md; `suhbat.md` - aniq so‘rovlar va to‘liq javoblar)
