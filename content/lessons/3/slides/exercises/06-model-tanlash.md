# 6-mashq. Qaysi ishga qaysi model

2-dars · 1:47-1:50 va 2:00-2:04 · 7 daqiqa · Claude Code

## Maqsad

Claude Code’da modelni o‘zingiz tanlaysiz.
Saralash va baholash - arzon va tez model.
Muhim tanlov va reja - eng kuchli model.
Limitingizni `/usage` bilan ko‘rib turasiz.

## Modellar (2026-11-03 holatiga)

| Model | `/model` da yozish | Qachon |
|---|---|---|
| Haiku 5.5 | `/model haiku` | Tez saralash, oddiy ko‘chirish, limit tugay deganda |
| Sonnet 5.5 | `/model sonnet` | Ko‘pchilik kundalik ish: jadval, baholash, matn |
| Opus 5.5 | `/model opus` | Tanlov, reja (PRD), murakkab tahlil. Claude Code’da odatiy model shu |

Manba: code.claude.com/docs/en/model-config, 2026-11-03 da tekshirildi.
Model nomlari tez-tez yangilanadi; har darsdagi «Bu hafta AI’da» varag‘iga qarang.

## 1-qism (1:47, 3 daqiqa): limitni ko‘rish

1. `/usage` deb yozing.
   Ko‘rasiz: shu sessiya qancha sarfladi va tarif limitingizdan qancha qoldi.
2. Javob bering (mentorga og‘zaki): 4-mashqni qaysi modelda qildingiz va nega?

## 2-qism (2:00, 4 daqiqa): sinov jarayonini tanlash, Opus’da

1. `/model opus` deb yozing.
2. Quyidagi promptni yuboring.
3. Claude ikki nomzodni taklif qiladi va 3 ta savol beradi: B.1, B.2, B.3.
4. Hozircha qoralama javob bering.
   Yakuniy tanlovni uyda bo‘lim boshlig‘i bilan qilasiz.
5. Tanlangan jarayonni `CLAUDE.md` dagi «Hozirgi sinov jarayoni» bo‘limiga yozdiring (promptning oxirgi qatori).

```text
kit2-scoring/form-a-scoring.md va kit2-scoring/form-b-matrix.md ni o‘qi.
Matritsaning yuqori o‘ng qismidan birinchi sinov uchun eng yaxshi va ikkinchi variantni taklif qil, har biri uchun bitta sabab.
Eng yaxshisi uchun sinov muvaffaqiyatsiz bo‘lishining 3 ta eng ehtimolli sababini va boshlashdan oldin javob topishim kerak bo‘lgan bitta savolni yoz.
Keyin mendan so‘ra: B.1 qaysi jarayonni tanlaysiz, B.2 nega aynan shu, B.3 hozir nimani qilmayapmiz.
Javoblarimni form-b-matrix.md ga yoz va tanlangan jarayonni CLAUDE.md dagi «Hozirgi sinov jarayoni» bo‘limiga qo‘sh.
```

## «Baraka Office» namunasi

Fayl (zip ichida): `baraka-office/kompaniya/kit2-scoring/form-b-matrix.md`.

- Eng yaxshi variant: 1 - narx, qoldiq, chegirma va muddat savoli (Qiymat 15, Osonlik 10).
- Ikkinchi variant: 6 - KP tayyorlash (Qiymat 12, Osonlik 12); u kursdan keyingi 2-jarayon bo‘ladi.
- Sinov muvaffaqiyatsiz bo‘lishi mumkin, agar: ma’lumot eskirsa (eski narx 350 000 so‘m zarar bergan edi); xodimlar odatdagidek Jamshid akaga yozishda davom etsa; og‘zaki qoidalar qaytsa (12-15% chegirma, «3 kunda yetkazamiz»).
- Boshlashdan oldin savol: «1C qoldig‘i va prays-list qanchalik tez-tez yangilanadi?»
  Egasining javobi: 1C qoldig‘i har kuni ertalab CSV qilib yuklanadi.
- Egasining javoblari:
  - B.1: 1-jarayon, bot nomi «Savdo yordamchisi».
  - B.2: menejerlar va call-markaz bir xil savolni kuniga o‘nlab marta Jamshid akaga beradi, mijoz kutadi, javob esa hujjatlarda bor; Jamshid akaning vaqti tenderlarga qoladi.
  - B.3: KPni hozir qilmayapmiz (2-jarayon, kursdan keyin); bot mijozga hech narsa yozmaydi, faqat xodimlarga javob beradi.

Yomon B.2: «Chunki AI zo‘r».
Bu sabab emas: bo‘lim boshlig‘i uni tekshira olmaydi.
Yaxshi B.2 da kim kutishi, javob qayerda borligi va bo‘shagan vaqt nimaga ketishi bor: buni tekshirsa bo‘ladi.

## Tayyor bo‘lsa

- [ ] 4-mashqni qaysi modelda qilganingizni va nega ekanini ayta olasiz.
- [ ] `/usage` ni ko‘rgansiz.
- [ ] `form-b-matrix.md` da B.1-B.3 qoralamasi bor, `CLAUDE.md` da sinov jarayoni yozilgan.

## Ko‘p uchraydigan xatolar

| Nima bo‘ldi | Nima qilish kerak |
|---|---|
| Opus’da limit tugadi yoki «usage credits» so‘radi | `/model sonnet` bilan davom eting: bu tanlov uchun ham yetadi. |
| Yuqori o‘ng qism bo‘sh | Claude buni ochiq aytadi va eng yaqinini ko‘rsatadi. Ballarni bo‘lim boshlig‘i bilan qayta ko‘ring (uy vazifasi). |
| Claude B.1-B.3 ni o‘zi yozib qo‘ydi | «Bu qarorni men qilaman, mendan so‘ra» deng. |
