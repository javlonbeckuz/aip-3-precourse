# Reja: «Savdo yordamchisi» uchun prd.md va tasks.md

## Kontekst
Foydalanuvchi CLAUDE.md dagi «Hozirgi sinov jarayoni» (To‘plam 2, B.1: narx, qoldiq, chegirma va muddat savollariga javob) uchun yordamchi vosita qurmoqchi.
Avval mutaxassislar nomidan savollar (bir xabarda 3 tadan), keyin `prd.md`, keyin `tasks.md` (10-15 vazifa). Kod yozilmaydi.
Foydalanuvchi javob bera olmaydi: javoblar CLAUDE.md, `hujjatlar/`, `kit2-scoring/` dan olindi; topilmagani [?] va PRD oxiridagi «Ochiq savollar»ga.

O‘qilgan manbalar: `CLAUDE.md`, `hujjatlar/01..04`, `kit2-scoring/form-a-scoring.md`, `form-b-matrix.md`, `kit1-interviews/jamshid-form-b.md`.
Hali yo‘q: `kit3-agent/`, `kit4-people/test-set.md`, `kit5-pilot/`, `app/`, 1C qoldiq fayli.

## Bajariladigan ish (tasdiqdan keyin)
1. Loyiha ildizida **yangi** `prd.md` yaratish (hozir bunday fayl yo‘q, ustidan yozilmaydi).
2. Loyiha ildizida **yangi** `tasks.md` yaratish.
3. Boshqa fayllarga tegilmaydi, kod yozilmaydi.

---

## 1-qism. Mutaxassislar savollari va topilgan javoblar

**Bu ishni odatda kim qiladi:** biznes-tahlilchi, mahsulot menejeri, savdo jarayoni eksperti (ROP), ma’lumotlar muhandisi (1C/AmoCRM), UX dizayner, sinovchi (QA), xavfsizlik va huquq mutaxassisi.

### 1-xabar: biznes-tahlilchi va mahsulot menejeri
1. *Kim ishlatadi?* - Call-markaz operatorlari va sotuv menejerlari; ichki yordamchi, mijozga o‘zi yozmaydi (CLAUDE.md). Sotuvchilar soni ~5 [?] (form-a, 3-jarayon).
2. *Qancha savol, qancha vaqt?* - Kuniga 15 + 5 + 8 = 28 ta savol, ustiga ~30 Instagram/Telegram xabari; haftasiga 15,2 soat = 6,0 + 3,0 + 3,0 + 3,2 (form-a).
3. *Hozir og‘riq qayerda?* - Operator javobni menejerdan 5-10 daqiqa kutadi; ROP haftasiga 48 ta savolga javob beradi (48 × 4 / 60 = 3,2 soat); noto‘g‘ri va’dalar: «3 kunda», «12-15% chegirma» (form-b-matrix B.2).

### 2-xabar: savdo eksperti (ROP) va ma’lumotlar muhandisi
4. *Hujjatlar zid bo‘lsa, qaysi biri to‘g‘ri?* - CLAUDE.md «Rasmiy hujjatlar»: prays-list, shartnoma. KPdagi «36 oy» va «viloyatga bepul» - xato. 3 kun / 7 ish kuni va 12-15% / 10% bo‘yicha Rustamov S.A.ning yozma qarori hali yo‘q [?].
5. *Qoldiq qayerdan?* - 1C, kuniga bir marta eksport [?]; kim eksport qiladi (Otabek aka yoki Sardorbek) [?]; fayl formati [?].
6. *Prays-list qancha amal qiladi?* - 2026-01-oktabrdan 31-dekabrgacha; 2027 prays-listi qachon chiqadi [?].

### 3-xabar: UX dizayner va sinovchi (QA)
7. *Qayerda ishlatiladi (veb, Telegram, AmoCRM vidjeti)?* - Hujjatlarda yo‘q [?]. Faqat `app/` `kit3-agent/instructions.md` ni o‘qishi aniq. Taklif: birinchi sinov uchun oddiy ichki veb-sahifa.
8. *Javob qanday ko‘rinishda?* - Qoralama + manba (qaysi hujjat, qaysi band) + formula; mijoz matnida «Hurmatli [Ism] aka / opa», «Siz»; taqiqlangan so‘zlar yo‘q (CLAUDE.md).
9. *Qabul mezoni va sinov savollari?* - `kit4-people/test-set.md` hali yo‘q [?]; aniqlik chegarasi belgilanmagan [?].

### 4-xabar: xavfsizlik, huquq va pilot rahbari
10. *Qaysi ma’lumot tashqariga chiqmasligi kerak?* - Narx/texnologik jadvallar va AmoCRM bazasini uchinchi shaxsga berish «qizil chiziq» (hujjat 04, 3-bo‘lim); kalitlar faqat `.env`; xodim ismlari papkadan chiqmaydi.
11. *Agent bilmasa nima qiladi?* - Mas’ullar jadvaliga yo‘naltiradi (CLAUDE.md «Kim nimaga javob beradi»).
12. *Pilot qancha, boshlang‘ich raqam qayerda?* - `kit5-pilot/` hali yo‘q [?]; soatbay haq 40 000 so‘m [?].

---

## 2-qism. prd.md tuzilmasi (yoziladigan mazmun)

1. **Nima quriladi** - «Savdo yordamchisi»: operator/sotuvchi savolini yozadi, vosita rasmiy hujjatlardan javob **qoralamasini** manba va formula bilan beradi; odam tekshirib, o‘zi yuboradi.
2. **Kim uchun** - operatorlar, sotuv menejerlari; egasi - Jamshid Karimov (ROP). Mijoz bevosita ishlatmaydi.
3. **Nima kiradi**
   - Narx: chakana 1-4 dona / ulgurji 5+ dona; paketlar (Startap 10 - 34 500 000, Biznes 20 - 89 000 000).
   - Chegirma darajasi: ≤5% sotuvchi (>20 mln); ≤10% ROP yozma ruxsati (100% oldindan yoki >50 mln); >10% - taqiq (faqat direktor, >150 mln tender).
   - Muddat: 7 ish kuni, MDF/shpon 12 ish kuni, oldindan to‘lovdan keyin.
   - Yetkazish: shahar ichida ≥10 mln bepul, aks holda 350 000; viloyat - km × 8 000; liftsiz 3-qavatdan yuqori - har qavatga 1%.
   - Kafolat: korpus 24 oy, mexanizm/gazlift 12 oy. To‘lov: 70/30, 15 bank ish kuni. 3D: >15 mln bepul, aks holda 500 000.
   - Qoldiq: 1C eksportidan, eksport sanasi ko‘rsatiladi.
   - Bilmasa - mas’ul shaxsga yo‘naltirish.
   - Har javobda manba va formula; jurnal va «to‘g‘ri/noto‘g‘ri» bahosi.
4. **Nima kirmaydi** - mijozga avtomatik yozish; chegirmani tasdiqlash (ROPda qoladi); KP tayyorlash; lid qabul qilish; AmoCRMga yozish; yetkazish sanasini band qilish; HR/oylik savollari.
5. **Ma’lumot manbalari** - `hujjatlar/01` (narx, chegirma, to‘lov, 3D), `hujjatlar/03` (muddat, yetkazish, kafolat, qaytarish), CLAUDE.md (mas’ullar, qoidalar), 1C qoldiq eksporti [?], `kit3-agent/instructions.md`. `hujjatlar/02` (KP) - manba emas, ziddiyatlar ro‘yxati sifatida.
6. **Muvaffaqiyat o‘lchovi** (formulalar bilan)
   - Kutish vaqti: hozir 5-10 daq → maqsad ≤1 daq [?].
   - Sinov to‘plamida to‘g‘ri javob ≥95% [?].
   - Taqiqlangan va’da (3 kun, >10%, 36 oy) - 0 ta.
   - ROPga keladigan savollar: 48/hafta → ≤10/hafta [?].
   - Tejalgan vaqt: 15,2 soat × ulush [?]; pul: soat × 40 000 so‘m [?] (masalan, 50% bo‘lsa 15,2 × 0,5 × 40 000 = 304 000 so‘m/hafta [?]).
   - Foydalanish: qoralamalarning ≥70% i o‘zgarishsiz yoki kichik tuzatish bilan yuboriladi [?].
7. **Xavflar** - hujjat ziddiyatlari tasdiqlanmagan; qoldiq kun ichida eskiradi; agent raqam to‘qishi; xodimlar eski odat bilan ROPga yozaveradi; narx jadvali tashqi xizmatga yuborilishi (maxfiylik); 31-dekabrdan keyin prays-list eskiradi; paket + chegirma birga qo‘llanishi noaniq.
8. **Ochiq savollar** - 3 kun/7 kun va 12-15%/10% bo‘yicha direktor qarori; 1C eksporti (kim, necha marta, format); interfeys kanali; sotuvchilar soni; test-set va aniqlik chegarasi; soatbay haq; ulgurji narxdan yana chegirma beriladimi; paketlarga chegirma beriladimi; aralash buyurtmada 5+ dona har bir kod bo‘yichami yoki jamimi; 2027 prays-list; tashqi LLM xizmatiga narx yuborishga ruxsat; pilot muddati va boshlang‘ich raqamlar.

---

## 3-qism. tasks.md (14 ta kichik vazifa)
Har vazifada: maqsad, kirish, chiqish, «tayyor» mezoni.

1. `app/` papka tuzilmasi, `README.md`, `.env.example` (faqat kalit **nomi**).
2. Prays-listni `mahsulotlar.json` ga o‘tkazish (kod, nom, chakana, ulgurji, seriya, manba bandi) + qo‘lda 2 marta solishtirish.
3. Qoidalarni `qoidalar.json` ga yozish (chegirma, muddat, yetkazish, kafolat, to‘lov, 3D, qavat) - har biriga manba hujjat va band.
4. Narx hisobi funksiyasi: miqdorga qarab chakana/ulgurji, jami summa, formula matni bilan + testlar.
5. Chegirma darajasi funksiyasi: summa va to‘lov turiga qarab «sotuvchi / ROP / taqiq» + chegara testlari (20 mln, 50 mln, 10%).
6. Yetkazish narxi funksiyasi: shahar/viloyat, km, qavat, lift + testlar.
7. 1C qoldiq faylini o‘qish (namuna CSV bilan), eksport sanasini chiqarish, 24 soatdan eski bo‘lsa ogohlantirish.
8. Tizim yo‘riqnomasini `kit3-agent/instructions.md` dan yuklash (fayl yo‘q bo‘lsa - aniq xato).
9. Til modeli chaqiruvi: savol + tegishli qoidalar → qoralama; javobda manba majburiy; kalit `.env` dan.
10. Taqiqlar tekshiruvi: «3 kun», >10%, «36 oy», «narxi lichkada», «shoshiling», «shok narx» - topilsa qoralama bloklanadi.
11. Yo‘naltirish: javob topilmasa mas’ul shaxs va Telegram manzilini ko‘rsatish.
12. Oddiy ichki veb-sahifa: savol maydoni, qoralama, manba, «Nusxa olish», «To‘g‘ri / Noto‘g‘ri» tugmalari.
13. Jurnal: vaqt, savol, javob, baho, javob vaqti → CSV (ismsiz); haftalik raqamlar skripti `kit5-pilot/numbers.md` uchun.
14. Sinov to‘plami ishga tushirgichi: `test-set.md` savollari → kutilgan javob bilan solishtirish, foiz hisobi.

## Tekshirish
- `prd.md` da 8 bo‘lim bor, har raqam yonida manba yoki [?].
- `tasks.md` da 14 vazifa, har birida «tayyor» mezoni.
- Raqamlar hujjatlar bilan qayta solishtiriladi (paket narxlari, chegirma chegaralari, 8 000 so‘m/km, 350 000, 15,2 soat).
