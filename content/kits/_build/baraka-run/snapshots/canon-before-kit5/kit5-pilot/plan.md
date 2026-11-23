# To‘plam 5 · A shakli: Sinov rejasi

Praktikum 3.0 · Sinov va hisob-kitob · Fayl: `kit5-pilot/plan.md`

«Baraka Office» MChJ: shartli misol, raqamlar usulni ko‘rsatish uchun.
To‘ldirildi: 4-dars, 2026-12-13, mentor bilan; Jamshid Karimov bilan kelishildi 2026-12-14 08:30 da.
O‘ng ustundagi «Nega shunday» izohlari namunaning bir qismi: o‘z rejangizga ularni ko‘chirmang.

- Jarayon: narx, qoldiq, chegirma va muddat savollariga javob (To‘plam 2, B.1)
- Sinov egasi: Rustamov S.A., bosh direktor
- Loyiha yetakchisi: Malika Rashidova, savdo menejeri (2-darsdan keyin o‘zi rozi bo‘lgan, `briefing.md`)
- Bo‘lim boshlig‘i: Jamshid Karimov, savdo bo‘limi rahbari (ROP) - rozi, 2026-12-14
- Sana: 2026-12-13

### A.1 Jarayon va agent

Mijoz narx, ombor qoldig‘i, chegirma, yetkazish yoki kafolat haqida so‘raganda xodim savolni «Savdo yordamchisi» botiga yozadi.
Bot prays-list 2026, qoidalar hujjati va 1C ombor eksportidan javob qoralaydi; javobni mijozga xodim o‘zi aytadi.
Bot serverda ishlaydi (4-darsda joylandi), agent yo‘riqnomasi - To‘plam 3 B (`kit3-agent/instructions.md`).

> Nega shunday: jarayon va agent bitta gapda; «javobni mijozga xodim aytadi» - bot mijozga o‘zi yozmasligi birinchi qatordayoq ko‘rinadi.

### A.2 Maqsad, bitta raqamda (... dan ... gacha)

Bitta savolga javob topish vaqti (B.2): **6 daqiqadan 2 daqiqagacha**, o‘rtacha, tekshirish vaqtisiz.

> Nega shunday: 6 daqiqa - boshlang‘ich raqam (`baseline.md` va botdagi `kit5-baseline.toml`, B.2).
> Birlik bitta: «bitta savolga daqiqa».
> «Tezlashtirish» degan so‘z maqsad emas: 6-darsda unga yetdikmi, aytib bo‘lmaydi.
> Tekshirish vaqti alohida B.7 da sanaladi (A.6), aks holda natija haqiqatdan yaxshi ko‘rinadi.

### A.3 Sanalar: boshlanishi - tugashi (2-4 hafta)

- 14-dekabr, dushanba: 09:30-11:00 - har bir xodim bilan 15 daqiqalik suhbat (To‘plam 4), 14:00 - bot xodimlar uchun yoqiladi.
- 14-dekabr - 26-dekabr (shanba): 2 hafta, 12 ish kuni (haftasiga 6 kun).
- 27-dekabr: 6-dars, natija va qaror.
  Davom etsa, 3-4-haftalar 9-yanvargacha.

> Nega shunday: 6-darsgacha kamida 2 to‘liq hafta kerak; ishga tushirish dushanbadan kechikmaydi.
> Suhbatlar ishga tushirishdan **oldin**, o‘sha kuni ertalab.

### A.4 Qamrov: qaysi mijozlar, so‘rovlar yoki buyurtmalar

- Botga 4 kishi yozadi: Madina Sattorova (showroom), Malika Rashidova (savdo menejeri), Bekzod Aliyev (savdo menejeri), Zarina Abdullayeva (call-markaz operatori).
- Faqat 4 mavzu: narx (chakana va ulgurji), ombor qoldig‘i, menejer chegirmasi (5% gacha), yetkazish, to‘lov va kafolat.
- Kirmaydi: tijoriy taklif (KP), tender, 150 000 000 so‘mdan katta buyurtma, AmoCRM, boshqa menejerlar.
- Mijozlar botga yozmaydi: bot faqat ichki yordamchi.

> Nega shunday: kichik boshlanadi - 4 kishi, 4 mavzu.
> Qolgan 6 menejer 2-haftadan keyin, natija yaxshi bo‘lsa qo‘shiladi.

### A.5 Chegaralar: agent qila oladi / qila olmaydi

| Qila oladi | Qila olmaydi |
|---|---|
| Prays-listdagi narxni aytadi: 1-4 dona chakana, 5+ dona ulgurji | 5% dan katta chegirma va’da qilish |
| Summani hisoblaydi va hisobni bir qatorda ko‘rsatadi | 7 ish kunidan qisqa muddat va’da qilish |
| Ombor qoldig‘ini 1C fayli sanasi bilan aytadi | Ma’lumotda yo‘q narx, qoldiq yoki muddatni o‘ylab topish |
| 20 000 000 so‘mdan katta buyurtmaga 5% gacha chegirma vakolatini aytadi | Mijozga o‘zi yozish, to‘lov qabul qilish, biror narsani o‘chirish |
| Qoidalardan yetkazish, to‘lov va kafolatni aytadi | Tannarx, boshqa mijozlar, xodimlar haqida gapirish |
| Qiyin holatni Jamshid akaga uzatadi (B.6) | Xodimlarni baholash yoki kuzatish |

1-hafta (14-19-dekabr): bot faqat qoralama yozadi, har bir javobni Malika tasdiqlaydi (`REPLY_MODE=approve`).
2-hafta (21-26-dekabr): 19-dekabrdagi ko‘rib chiqishda A.7 bajarilmagan, 1-hafta xatolarining har biri yo‘riqnomaga tuzatish bo‘lib kirgan va testlar o‘tgan bo‘lsa - **qisman to‘g‘ridan-to‘g‘ri**: narx va qoldiq savollariga bot xodimga darhol javob beradi (xodim ✅ yoki ❌ bosadi), chegirma va yetkazish sanasi javoblarini esa Malika oldingidek 100% tasdiqlaydi (qanday sozlanishi - 5-darsda).
A.6 mezonlari 2-hafta oxirida baholanadi: tasdiqlash haftasida tekshirish vaqti (B.7) baland bo‘lishi kutilgan.

> Nega shunday: chap ustun To‘plam 3 B.4 dan, o‘ng ustun B.5 dan aynan olingan: reja yo‘riqnomadan ko‘p ruxsat bermaydi.
> Ishonch bosqichma-bosqich: avval tasdiqlash, keyin bo‘shatish, faqat kelishilganda.

### A.6 Muvaffaqiyat mezonlari

2-hafta oxirida hammasi bajarilsa, «davom etamiz»:

| Ko‘rsatkich | Agentgacha | 2-haftada |
|---|---|---|
| B.2 Bitta savolga vaqt, daqiqa | 6 | 2 yoki kam |
| B.3 Xato javoblar, haftasiga | 9 | 5 yoki kam |
| B.7 Tekshirish vaqti, haftasiga soat | 0 (agentgacha tekshiradigan narsa yo‘q) | 3 yoki kam |
| B.1 Botga kelgan savollar, haftasiga | 120 (jarayonda) | kamida 60 (xodimlar o‘zi ishlatyapti) |
| B.8 Mijoz shikoyatlari, haftasiga | 2 | 2 yoki kam |

Hisob: agentgacha 120 savol x 6 daqiqa = 12 soat haftasiga.
Maqsadda 120 x 2 = 4 soat, tekshirish bilan 7 soat: haftasiga taxminan 5 soat tejaladi (B.15).
1-hafta faqat to‘g‘rilik o‘lchanadi: tasdiqlash kutilgani uchun vaqt hali tushmaydi.

> Nega shunday: har mezon raqam bilan va «agentgacha» bilan yonma-yon.
> B.1 xodimlar botni haqiqatan ishlatayotganini ko‘rsatadi: ishlatilmagan bot «xato qilmaydi».

### A.7 To‘xtatish sharti: agar ... bo‘lsa, darhol to‘xtatamiz

Darhol `/stop` (Malika, Jamshid aka yoki Rustamov S.A. telefondan), agar:

1. Mijozga bot javobi orqali noto‘g‘ri narx, 5% dan katta chegirma yoki 7 ish kunidan qisqa muddat aytilsa: **bitta holat ham**.
2. Bir kunda 3 ta yoki ko‘p javob ❌ yoki «rad etildi» bo‘lsa.
3. Bot tannarx yoki boshqa mijoz haqida ma’lumot bersa.

To‘xtagandan keyin: o‘sha kuni Jamshid aka va Malika xatoni ko‘rib, yo‘riqnomani tuzatadi, testlarni ishga tushiradi, Rustamov S.A. ruxsati bilan `/davom`.

> Nega shunday: shart aniq hodisa, his-tuyg‘u emas («yomon ishlasa» - shart emas).
> Kim to‘xtatishi va qaysi buyruq bilan yozilgan.
> Xato haqida aytgan odam ayblanmaydi (yozma majburiyat, 3-band).

### A.8 Agent javoblarini kim va qanchalik tez-tez tekshiradi

- 1-hafta: Malika Madina, Zarina va Bekzodning har bir qoralamasini ish vaqtida 5 daqiqa ichida tasdiqlaydi yoki tuzatadi; tuzatilgan har bir javob B.13 ga yoziladi.
  Malikaning o‘z savollariga bot darhol javob beradi: u javobni o‘zi tekshiradi.
- Har kuni 09:00: Rustamov S.A. botdan kunlik hisobot oladi (jami raqamlar, ismlarsiz).
- Har kuni 17:30: Malika kunning ❌ belgilarini ko‘radi (`/xatolar`), 10 daqiqa; B.7 ga kuniga bitta raqam yozadi.
- Jamshid aka B.6 holatlarini (katta chegirma, tender, topilmagan mahsulot) bot orqali oladi va o‘sha kuni javob beradi.

> Nega shunday: tekshirish - bitta odamga yuklanmagan va vaqti cheklangan; B.7 butun vazifa uchun bitta raqam, shaxsiy tabel emas.

### A.9 Haftalik ko‘rib chiqish: kun, vaqt, kim qatnashadi

Har shanba 16:00, 30 daqiqa, direktor xonasida: Rustamov S.A., Jamshid Karimov, Malika Rashidova.
Ko‘riladi: botning haftalik fayli (`/hafta`), xatolar jurnali (B.13), A.6 mezonlari, keyingi haftaga ruxsat.
Birinchisi: 19-dekabr, shanba (5-darsdan bir kun oldin); ikkinchisi: 26-dekabr.

> Nega shunday: ko‘rib chiqish taqvimda turibdi; 19-dekabr natijasi 5-darsga 1-hafta ustuni bo‘lib boradi.

---

## Rejadan bot sozlamasiga (`app/.env`, 14-dekabr, suhbatlardan keyin)

Reja qog‘ozda qolmasin: har bir band botning bitta sozlamasiga aylanadi.
Raqamlar - Telegram ID (har kim botga `/id` yozib biladi); bu yerda shartli.

| Reja bandi | `.env` qatori |
|---|---|
| A.4 Kim yozadi | `ALLOWED_USER_IDS=111111111,222222222,333333333,555555555` (Madina, Malika, Zarina, Bekzod) |
| A.5 1-hafta tasdiqlash | `REPLY_MODE=approve` va `REVIEWER_CHAT_ID=222222222` (Malika) |
| A.7 Kim to‘xtata oladi | `ADMIN_USER_IDS=222222222,444444444` (Malika, Jamshid aka); egasi doim admin |
| A.8 Qiyin holat kimga | `ESCALATION_CHAT_ID=444444444` (Jamshid aka) |
| A.3 Boshlanish | `PILOT_START_DATE=2026-12-14` |
| A.8 Kunlik hisobot | `DAILY_REPORT_TIME=09:00`, `WORK_HOURS=09:00-18:00`, `WORK_DAYS=1-6` |

Keyin Claude Code’ga: `deploy.py env ni ishga tushir`.
Xodimni `.env` siz, telefondan ham qo‘shish mumkin: botga `/ruxsat 111111111 Madina`.
