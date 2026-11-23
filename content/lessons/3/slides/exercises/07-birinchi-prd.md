# 7-mashq. Birinchi reja: reja rejimi, PRD va vazifalar ro‘yxati

2-dars · 2:12-2:30 · 18 daqiqa · Claude Code, Opus modeli, reja rejimi

## Maqsad

Biror narsa qurishdan oldin reja tuzasiz.
Claude reja rejimida faqat savol beradi va reja yozadi, kodga tegmaydi.
Natija ikki fayl:

- `prd.md` - nima quriladi, kim uchun, nima kiradi va nima kirmaydi (texnik topshiriq, TZ).
- `tasks.md` - shu rejani kichik dasturchi tushunadigan 10-15 ta kichik vazifaga bo‘lish.

Rejasiz qurish - 9 qavatli binoni quvurlarsiz qurib, keyin devorni buzib quvur o‘tkazish bilan teng.

## Atamalar, oddiy so‘zlar bilan

- **Reja rejimi (plan mode)** - Claude faqat o‘ylaydi, savol beradi va reja yozadi; hech qanday faylni o‘zgartirmaydi.
  Siz rejani tasdiqlaganingizdan keyingina ishga kirishadi.
- **PRD** - mahsulot talablari hujjati: binoning loyiha chizmasi.
  Dasturchi yoki kompaniya sizga xizmat sotsa, avval shuni so‘rang.
- **Vazifalar ro‘yxati** - PRD ni poydevor, devor, tom kabi kichik qadamlarga bo‘lish.

## «AI yo‘q deb tasavvur qiling» odati

Promptdan oldin 1 daqiqa o‘ylang: AI bo‘lmaganda bu vositani kimlar qurardi?
Masalan: biznes-tahlilchi (jarayonni o‘rganadi), dasturchi, dizayner, sinovchi va sizning bo‘lim boshlig‘ingiz.
Har biri sizga boshqa savol beradi.
Promptda Claude’dan aynan shu odamlar nomidan savol so‘raymiz.

## Qadamlar

1. `/model opus` deb yozing (limit tugagan bo‘lsa, `sonnet`).
2. Reja rejimini yoqing: Shift+Tab ni bir necha marta bosing, pastda «plan mode on» chiqquncha.
   Windows’da Shift+Tab ishlamasa, Alt+M.
   Yoki shunchaki `/plan` deb yozing.
3. Quyidagi promptni yuboring.
4. Claude savollar beradi: bir xabarda 3 tadan.
   Oddiy so‘zlar bilan javob bering.
   Texnik savol bersa («Python yoki Node?», «qaysi baza?»), shunday javob bering: «Sen tanla, eng soddasini, nega tanlaganingni bir gapda ayt».
5. Claude rejani ko‘rsatadi va «davom etaymi?» deb so‘raydi.
   O‘qing.
   Rozi bo‘lsangiz, «Yes» ni tanlang.
   Rozi bo‘lmasangiz, nimani o‘zgartirishni yozing: Claude rejani qayta tuzadi.
6. Tasdiqlagandan keyin Claude `prd.md` va `tasks.md` ni kompaniya papkasiga yozadi.
7. `prd.md` ni oching va 3 savolga o‘zingiz javob bering (pastda, «Tayyor bo‘lsa»).

## Prompt

```text
AI yo‘q deb tasavvur qilaylik.
CLAUDE.md dagi «Hozirgi sinov jarayoni» uchun yordamchi vosita qurmoqchiman.
Bunday ishni odatda qaysi mutaxassislar qilardi va ular menga qanday savollar berardi?
Shu mutaxassislar nomidan menga eng muhim 6 ta savol ber, bir xabarda 3 tadan ko‘p emas.
Savollar tugagach, prd.md uchun reja tuz, ko‘pi bilan 2 sahifa: nima quriladi, kim uchun, nima kiradi, nima kirmaydi, qaysi ma’lumot manbalari, muvaffaqiyat qanday o‘lchanadi, xavflar.
Keyin shu PRDni kichik dasturchi tushunadigan 10-15 ta kichik vazifaga bo‘l: tasks.md.
Hozircha kod yozma.
```

«Hozirgi sinov jarayoni» `CLAUDE.md` da yo‘q bo‘lsa (6-mashqni o‘tkazib yuborgan bo‘lsangiz), ikkinchi qatorni o‘zgartiring: «[jarayon nomi] uchun yordamchi vosita qurmoqchiman».

## «Baraka Office» namunasi

Fayllar (zip ichida): `baraka-office/kompaniya/prd.md` va `baraka-office/kompaniya/tasks.md`.
Ular haqiqiy reja rejimi natijasidan qisqartirilgan (Opus 5.5, 2026-11-03 sinovi).

Claude qaysi mutaxassislarni tanladi: mahsulot menejeri, biznes-tahlilchi, ma’lumotlar va 1C mutaxassisi, interfeys dizayneri, xavfsizlik va huquq mutaxassisi, sifat nazoratchisi.
Ulardan eng foydali 3 ta savol:

1. Biznes-tahlilchi: «Hujjatlarda 7 ish kuni, ROP esa 3 kun deydi. Qaysi biri to‘g‘ri ekanini kim yozma tasdiqlaydi?»
2. Ma’lumotlar mutaxassisi: «1C qoldig‘ini kim va kuniga necha marta eksport qiladi? Kun ichida sotilgani ko‘rinadimi?»
3. Sifat nazoratchisi: «Qaysi tuzoq savollar bilan sinaymiz va qachon tayyor deymiz?»

PRD dagi eng muhim qaror: raqamlarni (narx, chegirma chegarasi, muddat, km bo‘yicha narx) til modeli emas, oddiy kalkulyator hisoblaydi.
AI faqat savolni tushunadi va javob matnini qoralaydi.
Shunday qilib, «raqamni to‘qima» qoidasi kod darajasida ta’minlanadi.

## Yomon PRD namunasi

```text
Telegram bot kerak. Mijozlarga javob bersin. Tez va sifatli bo‘lsin. Narxlarni bilsin.
```

Nima xato:

- Kim ishlatadi - xodimmi yoki mijozmi - yozilmagan.
- Nima kirmaydi, yozilmagan: bot chegirma bera oladimi, mijozga o‘zi yozadimi?
- Ma’lumot manbasi yo‘q: «narxlarni bilsin» - qaysi fayldan, kim yangilaydi?
- Muvaffaqiyat o‘lchovi yo‘q: «tez» - necha daqiqa?
- Xavflar yo‘q: eskirgan qoldiq, noto‘g‘ri muddat.

Bunday «TZ» bilan dasturchi taxmin qiladi, siz esa natijani tekshira olmaysiz.

## Tayyor bo‘lsa

- [ ] Kompaniya papkasida `prd.md` va `tasks.md` bor.
- [ ] `prd.md` da «Nima kirmaydi» bo‘limi bor va unda kamida 2 ta band.
- [ ] Muvaffaqiyat raqam bilan yozilgan (yoki raqam [?] bilan belgilangan va kim aniqlashi yozilgan).
- [ ] O‘zingiz bir gapda ayta olasiz: bu vosita kim uchun va nimani qiladi.

## Ko‘p uchraydigan xatolar

| Nima bo‘ldi | Nima qilish kerak |
|---|---|
| Claude reja o‘rniga kod yoza boshladi | Esc. Pastda «plan mode on» yozuvi bormi? Bo‘lmasa, Shift+Tab yoki `/plan`. |
| Savollar juda ko‘p (15-20 ta) | «Faqat eng muhim 6 tasini ber» deng. |
| Texnik savollarga javob bera olmayapman | «Sen tanla, eng soddasini, nega tanlaganingni bir gapda ayt.» |
| PRD 6 sahifa, o‘qib bo‘lmaydi | «PRD ni 2 sahifaga qisqartir, eng muhimini qoldir» deng. |
| Vaqt tugadi | Reja chatda qolsin; uyda «rejani prd.md va tasks.md ga yoz» deng. |

## Mentor tekshiruvi (2.8)

`prd.md` va `tasks.md` papkada.
Mentor so‘raydi: «Bu vosita nimani qilmaydi?»
Ishtirokchi `prd.md` dan javob beradi.
