# A shakli, jarayonlarni baholash: qanday to‘ldirish

A shakli - 8 tagacha jarayonni bir xil 6 mezon bo‘yicha 1-5 ball bilan baholash jadvali.
2-darsda Claude Code To‘plam 1 fayllaridan qoralama tuzadi, siz har bir balni tekshirasiz; uyga vazifada bo‘lim boshlig‘i bilan ko‘rib chiqasiz.

## Boshlashdan oldin kerak bo‘ladi

- Kamida 2 ta xodimning B shakli (`kit1-interviews/*-form-b.md`), xodim tuzatgan holda.
- Bo‘lim boshlig‘i bilan 20-30 daqiqa: u ma’lumotlar qanchalik tartibsiz ekanini biladi.
- Vaqt: Claude Code bilan 30 daqiqa.

## Har bir maydon

| Kod | Maydon | Oddiy so‘z bilan nima | Javob qayerdan olinadi | Baraka Office misoli |
|---|---|---|---|---|
| - | Bo‘lim | Qaysi bo‘lim jarayonlari | To‘plam 1 | Savdo |
| - | Baholadi | Kim ball qo‘ydi | Egasi, keyin bo‘lim boshlig‘i | Egasi; Jamshid Karimov (B02) hali ko‘rib chiqmagan (uyga vazifa) |
| - | Sana | Baholangan kun | Taqvim | 2026-11-29 |
| A.1 | Jarayon (boshlanishi - natijasi) | Bir-biriga ulangan vazifalar zanjiri | B shakllaridagi vazifalar | «Narx, qoldiq, chegirma, muddat savoli: mijoz savol beradi - javob mijozga yetadi» |
| A.2 | Takrorlanishi | Qanchalik tez-tez | B.2 ustuni | 5: Jamshidga kuniga 25 ta savol (jamshid-form-b.md, 14-qator), Malikada kuniga 12 ta (malika-form-b.md, 18-qator) |
| A.3 | Ketadigan vaqt | Haftasiga hamma xodimlar bo‘yicha jami soat | B.4 yig‘indisi | 5: jarayonga kirgan vazifalar jami 17,3 soat, 10 soatdan ko‘p |
| A.4 | Aniq qoidasi bor | Har safar bir xil qadammi | B.7 ustuni (Q yoki F) | 4: narx va kafolat hujjatda, lekin 5% dan katta chegirma mulohaza talab qiladi |
| A.5 | Ma’lumot raqamli | Ma’lumot tizimda yoki jadvaldami | B.5 ustuni | 4: prays-list Excel’da, qoldiq 1C da, chegirma qoidasi hali yozilmagan |
| A.6 | Xatosi arzon | Xatoni sezish va to‘g‘rilash osonmi | B.8 ustuni | 2: noto‘g‘ri chegirma yoki muddat va’dasi pul va ishonchni yo‘qotadi |
| A.7 | Mijozga ta’siri | Mijoz buni kutib turadimi | B.6 ustuni | 5: mijoz telefonda javob kutib turadi |
| A.8 | Qiymat | A.2 + A.3 + A.7, 3 dan 15 gacha | Hisob | 5 + 5 + 5 = 15 |
| A.9 | Osonlik | A.4 + A.5 + A.6, 3 dan 15 gacha | Hisob | 4 + 4 + 2 = 10 |

Baraka Office’da 8 ta jarayon baholandi, masalan: «KP tayyorlash» Qiymat 12, Osonlik 12 (2-jarayon, kursdan keyin) va «Kunlik savdo hisoboti» Qiymat 9, Osonlik 14.

Raqamga bog‘liq ikki mezon uchun oraliq ballar:

| Ball | A.2 Takrorlanishi | A.3 Ketadigan vaqt (haftasiga) |
|---|---|---|
| 1 | oyiga bir marta | bir necha daqiqa |
| 2 | haftasiga bir marta | 1 soatgacha |
| 3 | haftasiga bir necha marta | 1 soatdan ko‘p, 4 soatgacha |
| 4 | kuniga bir marta | 4 soatdan ko‘p, 10 soatgacha |
| 5 | kuniga bir necha marta | 10 soatdan ko‘p |

## Ko‘p uchraydigan xatolar

1. Ball sababsiz qo‘yilgan.
   Tuzatish: har bir ball yoniga bitta sabab va manbani yozing: «A.2 = 5: Malikada kuniga 12 ta savol (malika-form-b.md, 18-qator)».
2. Yig‘indi xato yoki Qiymat bilan Osonlik almashib ketgan.
   Tuzatish: A.8 = A.2 + A.3 + A.7, A.9 = A.4 + A.5 + A.6; ikkalasini qo‘shiluvchilari bilan yozing.
3. Mulohaza talab qiladigan ishga «aniq qoida» 5 ball.
   Baraka misolida 5% dan katta chegirma bo‘yicha qaror shunday ish.
   Tuzatish: qadamlarning bittasi ham mulohaza talab qilsa, A.4 ni 5 qo‘ymang.
4. Faqat egasi baholagan.
   Tuzatish: bo‘lim boshlig‘i bilan ko‘rib chiqing, u o‘zgartirgan ballarni sababi bilan yozing.
5. Jarayon o‘rniga bitta vazifa yozilgan: «prays-listni ochish».
   Tuzatish: boshlanishi va natijasi bor zanjirni yozing.

## Tayyor bo‘lganini qanday bilasiz

- [ ] 8 tagacha jarayon, har birida boshlanish va natija.
- [ ] A.2-A.7 ning har bir balida sabab va manba bor.
- [ ] A.8 va A.9 qo‘shiluvchilari bilan, har biri 3-15 oralig‘ida.
- [ ] Bo‘lim boshlig‘i ko‘rib chiqqan (mentor 3-darsda tekshiradi).

## Claude Code bilan

```text
/kit2
```

Bo‘lim boshlig‘i ballarni o‘zgartirgandan keyin:

```text
/kit2 qayta
```

## Namuna

- To‘ldirilgan namuna: [Baraka Office, form-a-scoring.md](../../namunalar/baraka-office/kit2-scoring/form-a-scoring.md)
- Yomon misollar: [yomon-misollar.md](../../namunalar/yomon-misollar.md) (dalilsiz baholash)
- Skill namunasi: [skills/kit2/example/](../../skills/kit2/example/) (`suhbat.md` - aniq so‘rovlar va to‘liq javoblar)
