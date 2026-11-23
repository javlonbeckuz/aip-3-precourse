# Reja: «Savdo yordamchisi» uchun savollar, prd.md va tasks.md

## Kontekst
Tanlangan jarayon (kit2-scoring/form-b-matrix.md, B.1): narx, qoldiq, chegirma va muddat savoliga javob.
Hozir menejerlar va call-markaz bu savollarni Jamshid akaga beradi: kuniga 25 ta (form-a, 1-jarayon), haftasiga 17,3 soat, mijoz 5-10 daqiqa kutadi.
Kod yozilmaydi. Tasdiqdan keyin papka ildizida 2 ta fayl yaratiladi: `prd.md` va `tasks.md` (ikkalasi yangi, hech narsaning ustidan yozilmaydi).

Tekshirilgan manbalar: CLAUDE.md, hujjatlar/01-04, kit2-scoring/form-a-scoring.md, form-b-matrix.md.
Topilmadi: `data/` papkasi (narxlar.csv, qoidalar.md, ombor-1c.csv), `app/`, `kit3-agent/`.

---

## 1-qism. AI bo‘lmaganda bu ishni kim qilardi
Mahsulot menejeri (PM), biznes-tahlilchi, UX-tadqiqotchi, ma’lumot muhandisi (1C integratsiyasi), QA/sifat muhandisi, xavfsizlik va muvofiqlik mutaxassisi.

### 1-xabar (3 ta savol)
1. **PM:** Sinov qaysi raqam o‘zgarsa muvaffaqiyatli hisoblanadi?
   Javob: boshlang‘ich holat bor: Jamshid akaga kuniga 25 ta savol, jarayon haftasiga 17,25 soat, mijoz 5-10 daqiqa kutadi (form-a, 1-jarayon). Maqsadli raqam yozilmagan → [?].
2. **Biznes-tahlilchi:** Qaysi savollarga javob beriladi va hujjatlar bir-biriga zid bo‘lsa, qaysi biri ustun?
   Javob: narx, qoldiq, chegirma, muddat (B.1). Ustunlik CLAUDE.md «Rasmiy hujjatlar» bo‘limida va prays-list, shartnoma, reglamentda. KP (02) dagi 3 ta gap xato: «36 oy kafolat» (to‘g‘risi 24/12 oy), «butun viloyat bo‘ylab bepul yetkazish» (to‘g‘risi har km uchun 8 000 so‘m), «1 kunda o‘rnatamiz» (to‘g‘risi 7/12 ish kuni).
3. **UX-tadqiqotchi:** Kim, qayerda va qanday vaziyatda ishlatadi?
   Javob: call-markazning 2 ta operatori va 8 ta menejer, ko‘pincha mijoz telefonda kutib turganda. Bot mijozga yozmaydi (B.3). Interfeys (Telegram bot yoki veb-sahifa) → [?].

### 2-xabar (3 ta savol)
4. **Ma’lumot muhandisi:** Qoldiq va narx qayerdan keladi, qanchalik yangi?
   Javob: 1C qoldig‘i har kuni ertalab CSV qilib yuklanadi, prays o‘zgarsa CSV almashtiriladi (egasi, 2026-11-29). Fayl cp1251 kodlashida. Fayl hozir papkada yo‘q → [?]. Yangilanish vaqti (08:30) faqat «Nega shunday yozildi» izohida bor → [?].
5. **QA muhandisi:** Xato javob qanchaga tushadi, bot qachon «bilmayman, X ga murojaat qiling» deyishi kerak?
   Javob: eski narx 350 000 so‘m zarar bergan (form-a). 5% dan katta chegirma → ROP; qoldiq va yetkazish grafigi → Otabek aka; to‘lov tushgani → Nodira opa (CLAUDE.md jadvali). Sinov savollari to‘plami (kit4 test-set.md) hali yo‘q → [?].
6. **Xavfsizlik mutaxassisi:** Ma’lumot kimga ko‘rinadi, nima tashqariga chiqmasligi kerak?
   Javob: narx/texnologik jadvallarni uchinchi shaxslarga berish taqiqlangan (reglament 3.2). Kalitlar faqat .env da. Botga kim kira olishi (ruxsat ro‘yxati) → [?].

---

## 2-qism. `prd.md` mazmuni (≤2 sahifa)

1. **Nima quriladi:** «Savdo yordamchisi» - ichki chat-yordamchi. Xodim savol yozadi, yordamchi rasmiy hujjat va 1C qoldig‘idan javob beradi, manbani (hujjat, bo‘lim) va ma’lumot sanasini ko‘rsatadi.
2. **Kim uchun:** 2 call-markaz operatori, 8 menejer, 2 showroom maslahatchisi [?]; egasi: Jamshid Karimov (ROP).
3. **Nima kiradi:**
   - narx: chakana 1-4 / ulgurji 5+, paketlar, QQS bilan (prays-list 01);
   - chegirma tekshiruvi: summa va to‘lov turiga qarab 0 / 5 / 10% va kim ruxsat beradi; formula bilan;
   - muddat: 7 / 12 ish kuni, to‘lov tushgan kundan (shartnoma 3.1);
   - yetkazish narxi: shahar ichida 10 mln dan bepul, kam bo‘lsa 350 000; viloyatga km × 8 000; liftsiz 3-qavatdan yuqori +1%/qavat (shartnoma 3.2);
   - kafolat 24/12 oy, qaytarish 10 kun (shartnoma 4, 5);
   - qoldiq: 1C CSV, sanasi bilan;
   - javob yo‘q yoki vakolatdan tashqari bo‘lsa, kimga murojaat qilishni aytish.
4. **Nima kirmaydi:** mijozga to‘g‘ridan-to‘g‘ri yozish; KP tayyorlash (2-jarayon); AmoCRM ga yozish; buyurtma rezerv qilish; 10% dan katta chegirma; oylik, HR savollari.
5. **Ma’lumot manbalari:** hujjatlar/01 (prays), 03 (shartnoma), 04 (reglament, mas’ullar), CLAUDE.md «Rasmiy hujjatlar»; 1C qoldiq CSV (kunlik). 02 (KP) - faqat «xato gaplar» ro‘yxati sifatida, javob manbai emas.
6. **Muvaffaqiyat o‘lchovi:**
   - Jamshid akaga keladigan savollar: 25 ta/kun → maqsad [?];
   - jarayonga ketadigan vaqt: 17,25 soat/hafta → maqsad [?]; pulda: 17,25 × 35 700 = 615 825 so‘m/hafta (boshlang‘ich);
   - javob vaqti: 5-10 daqiqa → maqsad [?];
   - aniqlik: sinov to‘plamida to‘g‘ri javoblar ulushi ≥ [?]%, taqiqlangan va’da («3 kunda», >10%) = 0;
   - foydalanish: xodimlarning necha foizi har kuni ishlatadi [?].
7. **Xavflar (form-b-matrix + hujjatlar):** eskirgan qoldiq/narx (350 000 so‘m zarar takrorlanishi); xodimlar baribir Jamshid akaga yozadi; og‘zaki qoidalar (12-15% chegirma, 3 kunda yetkazish); KPdagi xato gaplar javobga kirib qolishi; cp1251 kodlash buzilishi; narx jadvali tashqariga chiqishi.
8. **Ochiq savollar:** quyidagi ro‘yxat.

### Ochiq savollar (prd.md oxiriga)
- Maqsadli raqamlar (savollar soni, soat, javob vaqti, aniqlik %) qancha? - Jamshid aka.
- Interfeys: Telegram bot yoki veb-sahifa? - Jamshid aka + Sardorbek (IT).
- `data/narxlar.csv`, `data/qoidalar.md`, `data/ombor-1c.csv` qayerda? form-a ularga tayanadi, papkada yo‘q.
- 1C eksporti aniq soat nechada va qaysi papkaga tushadi? - Otabek aka / Sardorbek.
- Showroom maslahatchilari ham foydalanuvchimi?
- Botga kim kira oladi (ruxsat ro‘yxati)?
- Chegirma qoidasida 20 mln dan kam buyurtmaga 0% - to‘g‘rimi? 5% va 10% oralig‘i (masalan 7%) ham ROP ruxsati bilanmi?
- «Startap 10» tarkibidagi hujjat shkafining alohida narxi praysda yo‘q.
- form-a va form-b 2026-11-29 sanasi bilan, bugun 2026-11-03; form-b dagi dekabr voqealari (numbers.md, 18.12) hali bo‘lmagan - andoza matnmi?
- KP dagi ish vaqti (19:00) CLAUDE.md dagi 18:00 bilan zid.

---

## 3-qism. `tasks.md` mazmuni (13 ta vazifa, kichik dasturchi uchun)
Har bir vazifada: nima qilish, qaysi fayl, «tayyor» sharti.

1. Papka tuzilmasi: `app/`, `data/`, `.env.example` (faqat kalit nomi). Tayyor: `.env` gitignore da.
2. Prays-listni (01) CSV ga ko‘chirish: kod, nom, chakana, ulgurji, paket. Tayyor: 12 mahsulot + 2 paket, raqamlar praysga qo‘lda solishtirilgan.
3. Qoidalar faylini yozish (`data/qoidalar.md`): chegirma, muddat, yetkazish, kafolat, qaytarish - har qoida yonida hujjat va band raqami.
4. «Xato gaplar» ro‘yxati: KPdagi 36 oy, bepul viloyat, 1 kunda montaj, «3 kunda yetkazamiz». Tayyor: ro‘yxat yordamchi yo‘riqnomasiga ulangan.
5. 1C CSV o‘qigich: cp1251 → UTF-8, fayl sanasini o‘qish. Tayyor: namunaviy fayl o‘zbek/rus harflari buzilmasdan o‘qiladi.
6. Eskirish tekshiruvi: qoldiq fayli bugungi emas bo‘lsa, javobga «ma’lumot [sana] holatiga, Otabek akadan tekshiring» qo‘shiladi.
7. Narx hisoblagich: dona soniga qarab chakana/ulgurji, jami summa, formula matni bilan.
8. Chegirma tekshirgich: summa + to‘lov turi → ruxsat etilgan max % va kim ruxsat beradi; >10% doim rad.
9. Yetkazish va muddat hisoblagich: shahar/viloyat (km × 8 000), 10 mln chegarasi, qavat +1%, 7/12 ish kuni (6 kunlik hafta [?] - yakshanbani hisobga olmaslik).
10. Tizim yo‘riqnomasi (`kit3-agent/instructions.md` ga qoralama): faqat rasmiy hujjat, manbani ayt, raqam to‘qima, mijozga yozma, taqiqlangan so‘zlar, kimga yo‘naltirish jadvali.
11. Chat interfeysi (interfeys tanlangach): savol → javob + manba + sana.
12. Sinov to‘plami: 30 [?] ta savol kutilgan javobi bilan (narx, chegirma chegaralari, muddat, viloyat, qoldiq, «javob yo‘q» holatlari, provokatsiya: «15% bersak bo‘ladimi?»). Tayyor: avtomatik tekshiruv skripti.
13. Jurnal: har savol/javob, vaqt, foydalanuvchi, «to‘g‘ri/xato» belgisi - kit5 `numbers.md` uchun haftalik raqam chiqadi. Ism-sharif faqat shu papkada.

---

## Tekshiruv
- prd.md ≤2 sahifa (taxminan ≤900 so‘z); bo‘limlar: nima, kim, kiradi, kirmaydi, manbalar, o‘lchov, xavflar, ochiq savollar.
- Har raqam yonida manba yoki [?]; hisoblar formulasi bilan (17,25 × 35 700 = 615 825).
- tasks.md da 13 ta vazifa, har birida «tayyor» sharti.
- Kod yozilmaydi; mavjud fayllar o‘zgarmaydi.
