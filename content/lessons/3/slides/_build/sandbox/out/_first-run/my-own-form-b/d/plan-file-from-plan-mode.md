# Reja: «Savdo yordamchisi» uchun prd.md va tasks.md

## Kontekst
Foydalanuvchi CLAUDE.md dagi «Hozirgi sinov jarayoni» (To‘plam 2, B.1: narx, qoldiq, chegirma, muddat savollariga javob) uchun ichki yordamchi qurmoqchi. Hozircha kod yozilmaydi. Plan mode tugagach loyiha ildizida 2 ta yangi fayl yaratiladi: `prd.md` va `tasks.md` (mavjud fayllar ustidan yozilmaydi). Savollarga javoblar CLAUDE.md, hujjatlar/, kit2-scoring/ dan olindi.

---

## 1-fayl: prd.md (≤ 2 sahifa)

# PRD: «Savdo yordamchisi» (ichki agent)

**Holat:** qoralama · **Sana:** 2026-11-03 · **Egasi:** Savdo bo‘limi (ROP) · **Manba:** kit2-scoring/form-b-matrix.md, B.1

## 1. Nima quriladi
Xodim mijoz savolini (narx, qoldiq, chegirma, yetkazish muddati, kafolat) yozadi → agent rasmiy hujjatlardan javob **qoralamasini** tayyorlaydi va manbasini ko‘rsatadi → xodim tekshiradi, kerak bo‘lsa tuzatadi va mijozga o‘zi yuboradi. Agent mijozga o‘zi yozmaydi.

## 2. Kim uchun
- 2 call-markaz operatori, 8 sotuv menejeri (CLAUDE.md).
- Muammo: kuniga ~28 savol (15 + 5 + 8), haftasiga 15,2 soat (6,0 + 3,0 + 3,0 + 3,2); operator menejerdan javobni 5-10 daqiqa kutadi (form-a-scoring.md).
- Pul qiymati (to‘liq vaqt, kamayish emas): 15,2 soat × 22 600 so‘m = 343 520 so‘m/hafta. Agent necha foiz vaqtni tejashi: [?] (baseline o‘lchanadi).

## 3. Nima kiradi (MVP)
1. Narx: kod yoki nom bo‘yicha; chakana (1-4 dona) va ulgurji (5+ dona); paketlar (Startap 10 = 34 500 000, Biznes 20 = 89 000 000). Manba: 01_Prays_list.
2. Hisob formulasi bilan: `soni × narx = jami`, chegirmadan keyingi summa.
3. Chegirma darajasini aniqlash: ≤5% (buyurtma > 20 mln) – sotuvchi; ≤10% (100% oldindan to‘lov yoki > 50 mln) – «ROP yozma ruxsati kerak, @baraka_rop_jamshid»; >10% – «taqiqlangan» (faqat direktor, > 150 mln tender).
4. Muddat: oldindan to‘lovdan keyin 7 ish kuni; MDF/shpon 12 ish kuni. «3 kun» hech qachon aytilmaydi.
5. Yetkazish narxi: Toshkent ichida ≥10 mln bepul, <10 mln 350 000 so‘m; viloyat: km × 8 000 so‘m; liftsiz 3-qavatdan yuqori: har qavatga 1% (03_Shartnoma, 3.2).
6. Kafolat: korpus 24 oy, kreslo mexanizmi/gazlift 12 oy (03_Shartnoma, 4.1).
7. Qoldiq: kunlik 1C eksportidan; javobda «qoldiq [sana, soat] holatiga» deb yoziladi.
8. Har javob oxirida: manba hujjat va bo‘lim; ishonch past bo‘lsa – [?] va kimga murojaat (CLAUDE.md jadvali).
9. Mijozga matn qoralamasi: «Hurmatli [Ism] aka/opa», «Siz»; taqiqlangan so‘zlar filtri («narxi lichkada», «shoshiling», «shok narx»).
10. Har savol-javob jurnalga yoziladi (kit5-pilot/numbers.md uchun).

## 4. Nima kirmaydi
- Mijozga avtomatik yozish (Telegram/Instagram bot).
- Chegirmani tasdiqlash (ROP ishi), KP tayyorlash, lid qabul qilish, AmoCRM ga yozish.
- Yetkazish sanasini band qilish (Otabek aka jadvali).
- Shartnoma/schet-faktura, Didox.
- KP (02-hujjat) ni manba sifatida ishlatish: unda xatolar bor (36 oy, viloyatga bepul, 1 kunda montaj).

## 5. Ma’lumot manbalari (ustuvorlik tartibida)
| # | Manba | Nima uchun | Yangilanishi |
|---|---|---|---|
| 1 | CLAUDE.md «Rasmiy hujjatlar» | ziddiyatda hakam | qo‘lda |
| 2 | hujjatlar/01_Prays_list_va_Katalog_2026.md | narx, chegirma, 3D, bo‘lib to‘lash | 31.12.2026 gacha amal qiladi |
| 3 | hujjatlar/03_Namunaviy_Shartnoma_va_Kafolat.md | muddat, yetkazish, kafolat, qaytarish | qo‘lda |
| 4 | 1C qoldiq eksporti | qoldiq | kuniga 1 marta [?] |
| 5 | hujjatlar/04_Ichki_Tartib | kimga murojaat | qo‘lda |
| – | 02_KP | **ishlatilmaydi** | marketing tuzatguncha |

## 6. Muvaffaqiyat qanday o‘lchanadi (4 haftalik sinov)
| Ko‘rsatkich | Hozir | Maqsad |
|---|---|---|
| Savolga javob vaqti | 5-10 daqiqa | ≤ 1 daqiqa [?] |
| Test to‘plamida to‘g‘ri javob | – | ≥ 95% [?] |
| Noto‘g‘ri va’da («3 kun», >10% chegirma, «36 oy») | bor (soni [?]) | 0 |
| Xodim qoralamani o‘zgartirmasdan ishlatgan ulush | – | ≥ 70% [?] |
| Faol foydalanuvchilar (10 tadan) | 0 | ≥ 8 [?] |
| ROPga «narx/muddat» savoli bilan yozishlar | [?] | 50% kam [?] |
Baseline 1-haftada qo‘lda o‘lchanadi (kit5-pilot/baseline.md).

## 7. Xavflar
1. **Ziddiyatlar tasdiqlanmagan** (3 kun / 7 ish kuni; 12-15% / 10%): Rustamov S.A. yozma qarori yo‘q → agent rasmiy hujjatga tayanadi, lekin xodimlar e’tiroz qiladi. Chora: sinovdan oldin yozma qaror.
2. **Eski qoldiq:** eksport kuniga 1 marta → kun ichida sotilgan mebel «bor» ko‘rinadi. Chora: javobda eksport vaqti + «Otabek akadan tasdiqlang».
3. **Raqam to‘qish:** model narx yoki chegirmani o‘ylab topadi. Chora: narx/hisob kod orqali (jadvaldan), model faqat matn yozadi; [?] belgisi.
4. **Xodimlar ishlatmaydi**, eski odat bilan Jamshid akaga yozadi. Chora: ROP savollarni agentga yo‘naltiradi.
5. **Prays-list 31.12.2026 da tugaydi:** yangi prays yuklanmasa, agent eski narx beradi. Chora: amal muddati tekshiruvi.
6. **Maxfiylik:** narx jadvallari va mijoz ma’lumoti tashqariga chiqmasin (04-hujjat, «qizil chiziq» 2); kalitlar faqat .env da.

## 8. Ochiq savollar
1. Rustamov S.A. «3 kun/7 ish kuni» va «12-15%/10%» bo‘yicha yozma qaror berdimi? [?]
2. 1C qoldig‘ini kuniga necha marta, kim (Otabek aka yoki Sardorbek) va qaysi formatda eksport qiladi? [?]
3. «Ish kuni» ga shanba kiradimi? Kompaniya 6 kun ishlaydi, shartnomada aniqlanmagan. [?]
4. Chegirma prays narxidan yoki ulgurji narxdan hisoblanadimi? Ulgurji «5+ dona» bitta mahsulot bo‘yicha yoki butun buyurtma bo‘yicha? [?]
5. Hujjat shkafi narxi prays-listda yo‘q (faqat paket ichida). [?]
6. Paket narxiga qo‘shimcha chegirma beriladimi? [?]
7. Vosita qayerda ishlaydi: Telegram ichki bot, veb-sahifa yoki AmoCRM vidjeti? [?]
8. Qaysi model va qayerda (bulut API / mahalliy) – ma’lumot maxfiyligi talabi? [?]
9. Maqsadli raqamlar (≤1 daqiqa, ≥95%, ≥70%) ni Jamshid Karimov tasdiqlaydimi? [?]
10. Hisob uchun 1 oy = necha hafta (4 yoki 4,33)? [?]
11. KP (02) ni marketing qachon tuzatadi? [?]
12. kit2 fayllaridagi sana 2026-11-29, bugun 2026-11-03 – qaysi biri to‘g‘ri? [?]

---

## 2-fayl: tasks.md (kichik dasturchi uchun 14 vazifa)

Har vazifada: **nima qilish**, **natija**, **qanday tekshiriladi**. Tartib bo‘yicha bajariladi.

1. **Papka tuzilmasi.** `app/` ichida `data/`, `src/`, `tests/`, `logs/` yarating; `.env.example` (kalit nomlari, qiymatsiz), `.gitignore` ga `.env` va `logs/`. *Tekshiruv:* `.env` git ga tushmaydi.
2. **Prays-listni jadvalga o‘tkazish.** `hujjatlar/01_...md` dan `app/data/prices.csv`: kod, nom, o‘lcham, chakana, ulgurji, seriya. Paketlar alohida `packages.csv`. Qo‘lda yozmang – skript bilan, keyin ko‘z bilan solishtiring. *Tekshiruv:* 12 mahsulot + 2 paket; WS-101 = 1 450 000 / 1 280 000.
3. **Qoidalar fayli.** `app/data/rules.yaml`: chegirma chegaralari (5% / 20 mln, 10% / 50 mln yoki 100% to‘lov, >10% taqiq), muddat (7 / 12 ish kuni), yetkazish (10 mln, 350 000, 8 000/km, 1%/qavat), kafolat (24 / 12 oy), har birida `manba:` maydoni. *Tekshiruv:* har qiymat hujjatdagi qator bilan mos.
4. **Narx hisoblagich (kod, AI siz).** `calc_price(kod, soni)` → chakana/ulgurji tanlaydi, formulani matn qilib qaytaradi (`5 × 1 280 000 = 6 400 000`). *Tekshiruv:* 4 dona → chakana, 5 dona → ulgurji.
5. **Chegirma tekshirgich.** `check_discount(summa, foiz, oldindan_tolov_100)` → «ruxsat / ROP kerak / taqiqlangan» + sabab. *Tekshiruv:* 15 mln + 5% → ruxsat yo‘q; 60 mln + 8% → ROP; 12% → taqiqlangan.
6. **Yetkazish va muddat hisoblagich.** `calc_delivery(summa, hudud, km, qavat, lift)` va `calc_deadline(tolov_sanasi, mdf_shpon)`. Shanba masalasi ochiq – parametr qilib qo‘ying. *Tekshiruv:* 8 mln, Toshkent → 350 000; viloyat 30 km → 240 000.
7. **1C qoldiq o‘quvchi.** Eksport faylini (`data/stock_YYYY-MM-DD.csv`, formati Otabek aka/Sardorbekdan so‘raladi) o‘qiydi; fayl sanasini qaytaradi; fayl 1 kundan eski bo‘lsa ogohlantiradi. *Tekshiruv:* namunaviy fayl bilan.
8. **Tizim yo‘riqnomasi qoralamasi.** `kit3-agent/instructions.md`: rol (ichki yordamchi), faqat 4 ta vosita natijasiga tayanish, manba ko‘rsatish, [?] qoidasi, KP ni ishlatmaslik, murojaat jadvali, mijoz matni uslubi. *Tekshiruv:* ROP o‘qib chiqadi.
9. **Agentni ulash.** Model API (kalit `.env` dan) + 4–7-vazifadagi funksiyalar «tool» sifatida. Model raqamni o‘zi hisoblamaydi. *Tekshiruv:* «CH-202 dan 6 ta qancha?» → 15 000 000 va manba.
10. **Taqiqlangan so‘z filtri.** Javob chiqishidan oldin «narxi lichkada», «shoshiling», «shok narx», «3 kun», «36 oy» ni qidiradi; topsa – bloklab, xodimga ogohlantirish. *Tekshiruv:* 5 ta yomon matn bloklanadi.
11. **Oddiy interfeys.** Bitta sahifa (yoki ochiq savol 7 javobiga ko‘ra Telegram): savol maydoni, javob qoralamasi, manba, «Nusxa olish», «Noto‘g‘ri» tugmasi. *Tekshiruv:* operator 1 daqiqada savol berib javob oladi.
12. **Jurnal.** Har savol: vaqt, xodim ID (ism emas), savol, javob, manba, «tuzatildi/yo‘q». `logs/` ga CSV. *Tekshiruv:* 10 ta savoldan keyin 10 qator.
13. **Sinov to‘plami.** `kit4-people/test-set.md` da 30 ta savol (narx 10, chegirma 8, muddat/yetkazish 8, kafolat/qoldiq 4) + kutilgan javob; ziddiyatli savollar shart («3 kunda olib kelasizmi?», «15% bera olasizmi?»). Avtomatik test skripti. *Tekshiruv:* natija foizda chiqadi.
14. **Sinovga tayyorlik.** README (ishga tushirish, yangi prays/qoldiq yuklash), ochiq savollar ro‘yxatini ROPga yuborish, `kit5-pilot/baseline.md` uchun 1-hafta qo‘lda o‘lchov shabloni. *Tekshiruv:* boshqa dasturchi README bo‘yicha ishga tushiradi.

---

## Bajarish (plan tasdiqlangach)
- Loyiha ildizida `prd.md` va `tasks.md` yaratiladi (yuqoridagi matn bilan). Ikkalasi ham hozir yo‘q – ustidan yozish yo‘q.
- Kod yozilmaydi.

## Tekshirish
- prd.md ≤ 2 sahifa (~900 so‘z); barcha 7 bo‘lim + «Ochiq savollar».
- Har raqam manbasi bilan; to‘qilgan raqam yo‘q, taxminlar [?].
- tasks.md da 14 vazifa, har birida tekshiruv mezoni.
