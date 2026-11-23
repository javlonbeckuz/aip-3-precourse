# 4-mashq. To‘plam 2: jarayonlarni baholash

2-dars · 1:25-1:40 · 15 daqiqa · Claude Code, Sonnet yoki Haiku modeli

## Maqsad

To‘plam 1 dagi vazifalar ro‘yxatlaridan Claude Code 8 tagacha jarayon ajratadi va har birini 6 ta mezon bo‘yicha baholaydi.
Siz har bir ballni o‘qiysiz va rozi bo‘lmaganingizni sababi bilan o‘zgartirasiz.
Natija: `kit2-scoring/form-a-scoring.md` (To‘plam 2, A shakli).

## Boshlashdan oldin

- 2-mashq tayyor: `kompaniya/` papkasi, ichida `CLAUDE.md` va kamida 2 ta B shakli.
- Claude Code kompaniya papkasida ochiq.
- Bosma To‘plam 2 shakli stolda: shkalani qog‘ozda ko‘rib turasiz.
- B shaklingiz yo‘q va «Baraka Office» fayllari bilan ishlayapsizmi?
  Natija Baraka jarayonlari bo‘ladi: bu mashq, usulni o‘rganasiz.
  O‘z B shakllaringiz tayyor bo‘lgach, uyda `/kit2` bilan o‘zingiznikini qiling va Baraka fayllarini `kit1-interviews/` dan olib tashlang.

## Atamalar, oddiy so‘zlar bilan

- **Jarayon** - boshlanishi va natijasi bor vazifalar zanjiri.
  Masalan: «mijoz savoli keldi - to‘g‘ri javob ketdi».
  Unga bir nechta xodimning vazifasi kirishi mumkin.
- **Qiymat (A.8)** = A.2 takrorlanishi + A.3 ketadigan vaqt + A.7 mijozga ta’siri.
  Qanchalik foydali?
- **Osonlik (A.9)** = A.4 aniq qoidasi bor + A.5 ma’lumot raqamli + A.6 xatosi arzon.
  AI’ga berish qanchalik oson?
- Har bir mezon 1 dan 5 gacha, shuning uchun Qiymat va Osonlik 3 dan 15 gacha bo‘ladi.

| Mezon | 1 ball | 5 ball |
|---|---|---|
| A.2 Takrorlanishi | oyiga bir marta | kuniga bir necha marta |
| A.3 Ketadigan vaqt | haftasiga bir necha daqiqa | haftasiga 10 soatdan ko‘p |
| A.4 Aniq qoidasi bor | har bir holat har xil | har doim bir xil qadamlar |
| A.5 Ma’lumot raqamli | qog‘ozda yoki odamlar yodida | allaqachon tizim yoki jadvalda |
| A.6 Xatosi arzon | xato pul yoki ishonchni yo‘qotadi | xatoni sezish va to‘g‘rilash oson |
| A.7 Mijozga ta’siri | faqat ichki jarayon | mijoz buni kutib turadi |

## Qadamlar

1. Modelni tanlang: `/model sonnet` (limit kam bo‘lsa, `/model haiku`).
   Saralash va baholash uchun eng kuchli model shart emas.
2. Quyidagi promptni yuboring.
3. Claude jadvalni chatda ko‘rsatadi.
   Har bir qatorni o‘qing: jarayonlar to‘g‘ri ajratilganmi, ballar sizning biznesingizga mosmi?
4. Kamida bitta ballni o‘zgartiring, sababi bilan (pastdagi «Tuzatish» prompti).
5. «yoz» deng: Claude `kit2-scoring/form-a-scoring.md` ga yozadi.
6. Faylni oching va yig‘indilarni tekshiring: `13 (4+5+4)` kabi hisob har bir katakda ko‘rinib turishi kerak.

## Prompt

```text
kit1-interviews/ papkasidagi barcha *-form-b.md fayllarini o‘qi (nomi ism- bilan boshlanadigan bo‘sh andozalarni o‘tkazib yubor).
Ulardan 8 tagacha jarayon ajrat. Jarayon - boshlanishi va natijasi bor vazifalar zanjiri, unga bir nechta xodimning vazifasi kirishi mumkin.
Har bir jarayon uchun qaysi vazifalar kirganini fayl va qator raqami bilan yoz, haftalik soatni B.4 lardan qo‘shib, hisobi bilan ko‘rsat.
Keyin kit2-scoring/form-a-scoring.md andozasidagi shkala bo‘yicha A.2-A.7 ni 1 dan 5 gacha bahola va har bir ball uchun bitta qisqa sabab yoz.
A.8 Qiymat = A.2 + A.3 + A.7, A.9 Osonlik = A.4 + A.5 + A.6; katakka hisobi bilan yoz, masalan 13 (4+5+4).
Raqam to‘qima: B shaklida [?] bo‘lgan raqamga tayangan ball ham [?] bo‘lsin.
Avval jadvalni menga chatda ko‘rsat. Men «yoz» desam, form-a-scoring.md ga yoz.
```

## Tuzatish prompti

```text
[N]-jarayonda [A.?] ni [yangi ball] qil. Sababi: [o‘z so‘zlaringiz bilan].
Sababni «Sabablar» bo‘limiga eski ball bilan birga yoz va Qiymat yoki Osonlikni qayta hisobla.
```

## «Baraka Office» namunasi

Bu namuna kursning `/kit2` skill’ini «Baraka Office» papkasida haqiqiy ishga tushirib olingan (To‘plam qo‘llanmasidagi namuna bilan bir xil).
Kirish: uchta B shakli (`baraka-office/kompaniya/kit1-interviews/`): Zarina Abdullayeva (call-markaz operatori, haftasiga 32,2 soat), Malika Rashidova (savdo menejeri, 32,4 soat), Jamshid Karimov (savdo bo‘limi rahbari, 20,8 soat).
Natija: `baraka-office/kompaniya/kit2-scoring/form-a-scoring.md`.

| # | Jarayon | Qiymat | Osonlik | Matritsada |
|---|---|---|---|---|
| 1 | Narx, qoldiq, chegirma, muddat savoli | 15 (5+5+5) | 10 (4+4+2) | Birinchi sinov |
| 2 | Kiruvchi qo‘ng‘iroq | 15 (5+5+5) | 6 (2+2+2) | Foydali, puxta reja kerak |
| 3 | amoCRM yuritish | 12 (5+5+2) | 10 (4+2+4) [?] | Birinchi sinov |
| 4 | Chiquvchi qo‘ng‘iroq | 13 (5+4+4) | 6 (2+2+2) | Foydali, puxta reja kerak |
| 5 | Kunlik savdo hisoboti | 9 (4+4+1) | 14 (5+5+4) | Chegarada |
| 6 | KP | 12 (4+4+4) [?] | 12 (5+5+2) | Birinchi sinov |
| 7 | Instagram va Telegram xabarlari | 14 (5+4+5) | 9 (2+4+3) | Chegarada |
| 8 | Yangi murojaat menejerga | 11 (5+4+2) | 12 (5+3+4) | Birinchi sinov |

Nega shunday baholandi (1-jarayon, faylda hammasi bor):

- A.2 = 5: Jamshid akaga kuniga 25 ta savol (jamshid-form-b.md), Malikada kuniga 12 ta (malika-form-b.md).
- A.3 = 5: haftasiga 17,3 soat, 10 soatdan ko‘p.
- A.6 = 2: telefonda aytilgan noto‘g‘ri narxni qaytarib bo‘lmaydi; eski narx bir marta 350 000 so‘m zarar bergan.
- A.7 = 5: mijoz javobni 5-10 daqiqa kutadi.

Egasi qanday tuzatdi.
6-jarayonda (KP) Claude A.6 = 3 qo‘ygan edi.
Rustamov S.A. uni 2 ga tushirdi va sababini yozdi: «ROP tekshirsa ham, eski narx bilan 350 000 so‘m yo‘qotilgan».
Eski ball ham, yangisi ham faylda qoldi, Osonlik 13 dan 12 ga qayta hisoblandi.
Bu to‘g‘ri tuzatish, chunki sabab bor va uni bo‘lim boshlig‘i tekshira oladi.
E’tibor bering: Claude har safar jarayonlarni biroz boshqacha guruhlaydi (2026-11-03 dagi sinovlarimizda ham shunday bo‘ldi), shuning uchun har bir qatorni o‘zingiz o‘qiysiz.

Yomon tuzatish: «1-jarayon menga yoqadi, hamma ballni 5 qil».
Sabab yo‘q, demak bu baholash emas, o‘zini aldash.

## Tayyor bo‘lsa

- [ ] `kit2-scoring/form-a-scoring.md` da 3-8 ta jarayon bor.
- [ ] Har bir ballning sababi yozilgan.
- [ ] Qiymat va Osonlik katakda hisobi bilan: `15 (5+5+5)`.
- [ ] Kamida bitta ballni o‘zingiz, sababi bilan o‘zgartirgansiz.

## Ko‘p uchraydigan xatolar

| Nima bo‘ldi | Nima qilish kerak |
|---|---|
| Claude har bir vazifani alohida jarayon qildi (20 ta qator) | «Bir-biriga ulangan vazifalarni bitta jarayonga birlashtir, 8 tadan oshmasin» deng. |
| Yig‘indi noto‘g‘ri | «Har bir yig‘indini qayta hisobla va hisobini ko‘rsat» deng. Bu «Hisobni ko‘rsat» odati. |
| Hamma jarayon 13-15 ball oldi | Ballar sizning raqamlaringizga emas, umumiy gaplarga qarab qo‘yilgan. «Har bir ball qaysi qatordan olinganini ko‘rsat» deng. |
| Limit tugadi | `/model haiku` yoki qog‘oz shaklda davom eting; uyda tugatasiz. |
| Prompt umuman ishlamadi | Mentor kurs skill’ini o‘rnatadi: `/kit2`. U xuddi shu ishni qadamma-qadam qiladi. |

## Mentor tekshiruvi (2.7)

Mentor bitta tasodifiy ballni so‘raydi: «Nega 4?»
Ishtirokchi sababni fayldan o‘qib bera oladi.
Kamida bitta ball egasi tomonidan o‘zgartirilgan.
