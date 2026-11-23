# 3-mashq. Ikkinchi jarayonni matritsadan tanlash

6-dars · 1:03-1:07 · 4 daqiqa darsda, qolgani uyda · matritsa va Claude Code

## Maqsad

Keyingi jarayonni o‘z matritsangizdan tanlaysiz va kim bilan To‘plam 1 suhbatini qilishingizni yozasiz.
Kompaniya papkangiz, skillar va bot allaqachon bor: ikkinchi jarayon birinchisidan tezroq yuradi.

## Avval kengaytiring, keyin yangisi

Yangi jarayondan oldin o‘zingizga savol bering: ishlayotgan sinovni kengaytirsa bo‘ladimi?
Ko‘proq xodim, ko‘proq filial, ko‘proq so‘rov turi.
Bu yangi qurilishdan arzon va tezroq natija beradi.
Qoida: bir vaqtda bitta yangi sinov; oldingisi 2 hafta tuzatishsiz ishlagandan keyin yangisi boshlanadi.

## Nima kerak

- `kit2-scoring/form-b-matrix.md` va `kit2-scoring/matrix.html` (2-darsda yaratilgan).
- `kit2-scoring/form-a-scoring.md`: har bir jarayonning ballari va sabablari.
- Matritsada yuqori o‘ngda boshqa nuqta bo‘lmasa: bo‘limlar bo‘yicha imkoniyatlar xaritalari (`department-labs/*/opportunity-map.md`) va qo‘shimcha to‘plam 1 («AI’ga nima berish mumkin?»).

## Qadamlar

1. `matrix.html` ni oching.
   Yuqori o‘ng qismdagi («Birinchi sinov») nuqtalarni ko‘ring; birinchi sinovingizdan keyingisi - nomzod.
2. Ikkita nomzod bo‘lsa, pulga yaqinrog‘ini tanlang: qaysi birida xato, yo‘qolgan so‘rov yoki kech tushgan pul ko‘proq?
3. To‘rtta tekshiruv (bittasi «yo‘q» bo‘lsa, keyingi nomzodga o‘ting):
   - haftasiga kamida 20 ta ish bor (2 haftada signal bo‘ladi);
   - ma’lumot allaqachon raqamli keladi: Telegram, Excel, CRM yoki 1C eksporti;
   - jarayonni siz bilan birga boshqaradigan xodim bor va rozi bo‘lishi mumkin;
   - agent pul yubormaydi va mijozga odam tasdiqlamasdan yozmaydi.
4. To‘plam 1 uchun 2-3 suhbatdoshni yozing: shu ishni bugun qiladiganlar.
5. Uyda: Claude Code’da quyidagi so‘rov bilan bir sahifalik reja yozdiring.

## So‘rov (uyda)

```text
kit2-scoring/form-a-scoring.md va form-b-matrix.md ni o‘qi.
Birinchi sinovim: [jarayon]. Ikkinchi jarayon uchun yuqori o‘ng qismdagi nomzodlarni ko‘rsat.
Har biri uchun: haftasiga nechta ish, ma’lumot qayerdan keladi, xatosi qancha pulga tushishi mumkin; bilmaganingni [?] deb yoz.
Keyin men tanlagan jarayon uchun ikkinchi-jarayon.md fayl yoz: jarayon, nega aynan shu, To‘plam 1 suhbatdoshlari va sanalar, boshlang‘ich raqam qayerdan olinadi.
Yozishdan oldin mendan so‘ra.
```

## «Baraka Office» namunasi

Matritsa (2-dars, `day-2/company-folder-starter/baraka-office/kompaniya/kit2-scoring/form-b-matrix.md`):

| # | Jarayon | Qiymat | Osonlik | Joyi |
|---|---|---|---|---|
| 1 | Narx, qoldiq, chegirma, muddat savoli | 15 | 10 | Birinchi sinov (bajarildi) |
| 3 | amoCRM yuritish | 12 | 10 [?] | Birinchi sinov |
| 6 | KP | 12 ([?] 2-dekabrda yopildi) | 12 | Birinchi sinov |
| 8 | Yangi murojaat menejerga | 11 | 12 | Birinchi sinov |

Jadvalda faqat yuqori o‘ng qism («Birinchi sinov»); matritsada jami 8 ta jarayon.
2-darsda B.3 da «KPni hozir qilmayapmiz: u 2-jarayon, kursdan keyin» deb yozilgan edi.
6-darsda Baraka egasi sinov natijasi bilan uchta nomzodni (3, 6, 8) solishtirdi va KP tayyorlashni tanladi.
Fayl: `namuna/kompaniya/ikkinchi-jarayon.md`.
Qisqasi, hoshiyadagi izohlar bilan:

- **Avval kengaytirish:** bot 4 kishidan (Madina, Malika, Zarina, Bekzod) qolgan 6 ta menejerga ham ochiladi (3-hafta). *Izoh: bu yangi jarayon emas, lekin eng arzon qo‘shimcha natija.*
- **2-jarayon: KP tayyorlash** (3D chizmadan KP yuborilguncha). *Izoh: uchta nomzod ichida KP ballari eng yuqori (12 / 12), u pulga eng yaqin va birinchi sinovdagi narsalarni qayta ishlatadi.*
- **Nega KP:** KPdagi xato narx shartnomaga o‘tadi (To‘plam 2, A.6 = 2); sinovning xatolar jurnalida ham KP shartnomaga zid chiqqan (bepul yetkazish, 3 yil kafolat); 680 000 so‘mlik chegirma holati ham KP bosqichida bo‘lgan.
  Prays-list, qoidalar hujjati va agent endi tayyor: amalda 2-darsdagi bahodan ham osonroq.
  Egasi diagnostikada (30.11) «tez birinchi qo‘ng‘iroq» variantini ham ko‘rdi: AmoCRM da 10 daqiqa ichida qo‘ng‘iroq qilingan sdelkalarning 21,5% i yutilgan, kechlarining 14,6% i; lekin hozir KP yutadi, chunki u sinovdagi prays-list, qoidalar va botni qayta ishlatadi va KP xatosi shartnomaga o‘tadi.
  Tez birinchi qo‘ng‘iroq (matritsada «Yangi murojaat menejerga», 11 / 12) keyingi nomzod; diagnostikadagi AmoCRM filtri AIsiz hozirdan boshlanishi mumkin.
  amoCRM yuritishda Osonlik hali [?]: qo‘ng‘iroqlar yozib olinadimi, noma’lum.
- **To‘rtta tekshiruv:** bo‘limda haftasiga 32-40 ta KP (8 menejer × 4-5 ta: Malika To‘plam 1 da 5 ta, Jamshid aka 2-dekabrda «qolganlar ham 4-5 ta» dedi; aniq soni amoCRM «KP yuborildi» bosqichidan); prays-list va 3D chizma raqamli (ha); Malika birga boshqarishga rozi bo‘lishi mumkin (suhbat kerak); agent KP qoralamasini yozadi, mijozga menejer yuboradi (ha).
- **Suhbatdoshlar:** Malika Rashidova (KPni o‘zi tayyorlaydi: To‘plam 1 da haftasiga 5 ta, har biri 45 daqiqa), Javohir Tursunov (bosh arxitektor-dizayner: 3D chizma), Jamshid Karimov (KPdagi narx va chegirmani tasdiqlaydi). *Izoh: ishni qiladigan, unga ma’lumot beradigan va uni tekshiradigan odam.*
- **Boshlang‘ich raqam:** amoCRM dan oxirgi 4 hafta: KP soni, 3D chizmadan KP yuborilguncha vaqt, Jamshid aka tuzatgan KPlar; bitta KP vaqtini Malika 10 ta holatda soat bilan o‘lchaydi.
- **Pul qayerda:** KPdagi noto‘g‘ri narx yoki chegirma shartnomaga o‘tib, foydani kamaytiradi; KP kech ketsa, mijoz boshqa joyga ketadi [?]: suhbatlarda tekshiramiz.

## Yomon namuna

> 2-jarayon: marketingni AI bilan avtomatlashtirish. Suhbat: keyin.

Nimasi yomon:

1. «Marketing» - bo‘lim, jarayon emas: boshlanishi va natijasi yo‘q.
2. Matritsada yo‘q: ballari yo‘q, nega aynan shu - noma’lum.
3. Suhbatdosh yo‘q: To‘plam 1 boshlanmaydi.

To‘g‘rilangani:

> 2-jarayon: KP tayyorlash, 3D chizmadan KP yuborilguncha (matritsada 12 / 12). Suhbat: Malika, Javohir, Jamshid aka, 5-9-yanvar.

## Tayyor bo‘lsa

- [ ] 2-jarayon nomi «boshlanishi - natijasi» shaklida.
- [ ] Matritsadagi joyi va balli yozilgan.
- [ ] To‘rtta tekshiruvdan o‘tgan.
- [ ] 2-3 suhbatdosh nomi bilan.
- [ ] Boshlang‘ich raqam qayerdan olinishi yozilgan.

## Mentor tekshiruvi (6.7)

2-jarayon nomi va suhbatdoshlar natija varag‘ining «Keyingi qadam» blokida yoki `ikkinchi-jarayon.md` da.
