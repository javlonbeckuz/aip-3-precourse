# Praktikum 3.0 · 2-dars: promptlar to‘plami

2-darsdagi barcha promptlar, bitta joyda.
Ular 2.0 kursining 2-kun to‘plamidan yangilandi: endi ko‘pchiligi Claude Code’da, kompaniya papkangiz ichida ishlaydi.

## Qanday foydalaniladi

1. Claude Code’ni kompaniya papkangizda oching: Warp’da `cd ~/praktikum/kompaniya` (macOS va Windows’da bir xil), keyin `claude`.
2. Kerakli promptni toping, `[qavs]` ichidagi joylarni o‘zingizniki bilan almashtiring.
3. Kod blokidagi matnni to‘liq nusxalab joylang, Enter bosing.
4. Javobni o‘qing: raqam va faktni o‘z hujjatingiz bilan tekshiring.

Nega Claude Code’da: Claude `CLAUDE.md` ni har safar o‘qiydi, shuning uchun kompaniyangizni qayta tushuntirmaysiz.
Claude Code bo‘lmasa (telefonda, boshqa kompyuterda), 5-bo‘lim promptlari oddiy Claude chatida ham ishlaydi: boshiga kompaniyangiz haqida 3-4 qator qo‘shing.

Promptlar Claude’ga «sen» deb yozilgan: bu AI’ga beriladigan topshiriq, hurmatsizlik emas.

## Mundarija

| Bo‘lim | Promptlar |
|---|---|
| 1. Claude Code bilan tanishuv | 01-05 |
| 2. Kompaniya papkasi va CLAUDE.md | 06-10 |
| 3. To‘plam 2: qaysi jarayondan boshlaymiz | 11-15 |
| 4. Reja va skill | 16-21 |
| 5. Kompaniya ma’lumoti bilan biznes promptlar (2.0 dan yangilangan) | 22-31 |
| 6. Uy vazifasi uchun | 32-34 |

## 1. Claude Code bilan tanishuv

### 01. Birinchi gap

```text
Salom! Bu papkada nima bor? Oddiy so‘zlar bilan ayt.
```

### 02. Papkani tartibga keltirish (1-mashq)

```text
Bu papkadagi fayllarni ko‘rib chiq.
Ularni turiga qarab papkalarga ajratish rejasini tuz: Hujjatlar, Rasmlar, Jadvallar, Arxivlar, O‘rnatish fayllari, Boshqalar.
Avval rejani jadval qilib ko‘rsat: qaysi papkaga nechta fayl ketadi.
Men «ha» desam, ko‘chir.
Hech bir faylni o‘chirma va nomini o‘zgartirma.
Har bir ko‘chirishni tartib-jurnal.md fayliga yoz: qaysi fayl, qayerdan, qayerga.
Oxirida nechta fayl qayerga ketganini qisqa ayt.
```

### 03. Qaytarish

```text
tartib-jurnal.md bo‘yicha hamma fayllarni joyiga qaytar. Avval nima qilishingni ko‘rsat.
```

### 04. Skrinshot qilib so‘rang

Avval skrinshotni joylang: macOS’da Ctrl+V (Cmd+V emas), Windows’da Alt+V, yoki rasm faylini oynaga sichqoncha bilan torting.

```text
Bu xato nima va nima qilishim kerak? 5 yoshli bolaga tushuntirgandek, keyin aniq buyruqni ber.
```

### 05. 5 yoshli bolaga tushuntir

```text
[Atama] nima? 5 yoshli bolaga tushuntirgandek, bitta misol bilan. Keyin bir gapda: bu menga biznesda nima uchun kerak?
```

## 2. Kompaniya papkasi va CLAUDE.md

### 06. CLAUDE.md ning bo‘sh joylarini to‘ldirish (2-mashq)

```text
CLAUDE.md ni o‘qi.
Kvadrat qavsda qolgan va [?] bilan belgilangan joylarni men bilan birga to‘ldiramiz.
Menga savol ber, bir xabarda 3 tadan ko‘p emas.
Javoblarimni CLAUDE.md ga yoz, faylni 200 qatordan qisqa saqla.
Raqam to‘qima: men bilmagan joyni [?] bilan qoldir.
Parol, karta raqami yoki token aytsam, yozma va meni ogohlantir.
```

### 07. CLAUDE.md ni tekshirish savoli

```text
Faqat CLAUDE.md ga tayanib javob ber: biz nima sotamiz, asosiy mijozimiz kim va qaysi tizimlarda ishlaymiz? Javob qaysi qatordan olinganini ko‘rsat.
```

### 08. CLAUDE.md ni tozalash

```text
CLAUDE.md faylimni o‘qi. Unda zid qoidalar, xavfli ruxsatlar, parol yoki kalitlar, raqamsiz sifat so‘zlari va 200 qatordan uzun joylar bormi? Har birini qator raqami bilan jadval qilib ko‘rsat. Hech narsani o‘zgartirma, faqat ro‘yxat ber.
```

### 09. Global ko‘rsatmalar (3-mashq)

```text
~/.claude/CLAUDE.md faylini och (yo‘q bo‘lsa, yarat) va oxiriga quyidagi qoidalarni qo‘sh.
Bor matnni o‘chirma.
Qo‘shgandan keyin faylning oxirgi 10 qatorini menga ko‘rsat.

- Uzun tire belgisini ishlatma, oddiy chiziqcha (-) ishlat.
- Ortiqcha gap va maqtovsiz, qisqa va aniq yoz.
- Men xato bo‘lsam yoki yaxshiroq yo‘l bo‘lsa, ochiq ayt va sababini tushuntir.
- Hozir 2026-yil. Yangilik, narx yoki qonun qidirganda shu yilni hisobga ol.
- Men bilan o‘zbek tilida gaplash. Yangi atamani birinchi marta ishlatganda oddiy so‘zlar bilan tushuntir.
```

### 10. Hujjatlar orasidagi ziddiyatni topish (1-namoyish)

```text
hujjatlar/ papkasidagi hujjatlar va kit1-interviews/ dagi intervyularni solishtir. Bir-biriga zid raqamlar bormi: yetkazish muddati, chegirma, kafolat? Qaysi fayl, qaysi gap - jadval qilib ko‘rsat.
```

Topilgan ziddiyatni hal qilgach, uni `CLAUDE.md` dagi «Rasmiy hujjatlar» bo‘limiga yozdiring: «Ziddiyat bo‘lsa, [hujjat] to‘g‘ri».

## 3. To‘plam 2: qaysi jarayondan boshlaymiz

Modelni tanlang: baholash uchun `/model sonnet` yoki `/model haiku`, tanlov uchun `/model opus`.

### 11. Jarayonlarni ajratish va baholash (4-mashq)

```text
kit1-interviews/ papkasidagi barcha *-form-b.md fayllarini o‘qi (nomi ism- bilan boshlanadigan bo‘sh andozalarni o‘tkazib yubor).
Ulardan 8 tagacha jarayon ajrat. Jarayon - boshlanishi va natijasi bor vazifalar zanjiri, unga bir nechta xodimning vazifasi kirishi mumkin.
Har bir jarayon uchun qaysi vazifalar kirganini fayl va qator raqami bilan yoz, haftalik soatni B.4 lardan qo‘shib, hisobi bilan ko‘rsat.
Keyin kit2-scoring/form-a-scoring.md andozasidagi shkala bo‘yicha A.2-A.7 ni 1 dan 5 gacha bahola va har bir ball uchun bitta qisqa sabab yoz.
A.8 Qiymat = A.2 + A.3 + A.7, A.9 Osonlik = A.4 + A.5 + A.6; katakka hisobi bilan yoz, masalan 13 (4+5+4).
Raqam to‘qima: B shaklida [?] bo‘lgan raqamga tayangan ball ham [?] bo‘lsin.
Avval jadvalni menga chatda ko‘rsat. Men «yoz» desam, form-a-scoring.md ga yoz.
```

### 12. Ballni tuzatish

```text
[N]-jarayonda [A.?] ni [yangi ball] qil. Sababi: [o‘z so‘zlaringiz bilan].
Sababni «Sabablar» bo‘limiga eski ball bilan birga yoz va Qiymat yoki Osonlikni qayta hisobla.
```

### 13. Matritsa (5-mashq)

```text
kit2-scoring/form-a-scoring.md dagi Qiymat (A.8) va Osonlik (A.9) bo‘yicha matritsa chiz va kit2-scoring/matrix.html sahifasi qilib saqla.
Gorizontal o‘q - Osonlik, vertikal o‘q - Qiymat, ikkalasi 3 dan 15 gacha, chegara 9 da.
To‘rt qism nomi: yuqori o‘ngda «Birinchi sinov», yuqori chapda «Foydali, puxta reja kerak», pastki o‘ngda «Oson, lekin foydasi kichik», pastki chapda «Hozircha tegmang».
Har bir jarayon raqamli nuqta bo‘lsin, yonida raqam va nom bilan ro‘yxat.
Sahifa internetsiz ishlasin: tashqi shrift va kutubxona ishlatma.
Keyin kit2-scoring/form-b-matrix.md dagi «Matritsadagi nuqtalar» jadvalini to‘ldir va sahifani brauzerda och.
```

### 14. Matritsa kurs andozasi bilan

```text
../skills/kit2/matrix-template.html faylini kit2-scoring/matrix.html ga nusxala.
Unda faqat <script id="data"> ichidagi JSON ni almashtir: kompaniya, bo‘lim, sana va jarayonlar (n, name, value = A.8, ease = A.9) form-a-scoring.md dan.
Boshqa hech narsani o‘zgartirma. Keyin sahifani brauzerda och.
```

### 15. Birinchi sinovni tanlash (6-mashq, Opus)

```text
kit2-scoring/form-a-scoring.md va kit2-scoring/form-b-matrix.md ni o‘qi.
Matritsaning yuqori o‘ng qismidan birinchi sinov uchun eng yaxshi va ikkinchi variantni taklif qil, har biri uchun bitta sabab.
Eng yaxshisi uchun sinov muvaffaqiyatsiz bo‘lishining 3 ta eng ehtimolli sababini va boshlashdan oldin javob topishim kerak bo‘lgan bitta savolni yoz.
Keyin mendan so‘ra: B.1 qaysi jarayonni tanlaysiz, B.2 nega aynan shu, B.3 hozir nimani qilmayapmiz.
Javoblarimni form-b-matrix.md ga yoz va tanlangan jarayonni CLAUDE.md dagi «Hozirgi sinov jarayoni» bo‘limiga qo‘sh.
```

## 4. Reja va skill

### 16. Reja rejimi: PRD va vazifalar (7-mashq)

Avval reja rejimini yoqing: Shift+Tab ni pastda «plan mode on» chiqquncha bosing (Windows’da kerak bo‘lsa Alt+M), yoki `/plan` deb yozing.

```text
AI yo‘q deb tasavvur qilaylik.
CLAUDE.md dagi «Hozirgi sinov jarayoni» uchun yordamchi vosita qurmoqchiman.
Bunday ishni odatda qaysi mutaxassislar qilardi va ular menga qanday savollar berardi?
Shu mutaxassislar nomidan menga eng muhim 6 ta savol ber, bir xabarda 3 tadan ko‘p emas.
Savollar tugagach, prd.md uchun reja tuz, ko‘pi bilan 2 sahifa: nima quriladi, kim uchun, nima kiradi, nima kirmaydi, qaysi ma’lumot manbalari, muvaffaqiyat qanday o‘lchanadi, xavflar.
Keyin shu PRDni kichik dasturchi tushunadigan 10-15 ta kichik vazifaga bo‘l: tasks.md.
Hozircha kod yozma.
```

### 17. Texnik savolga javob

```text
Sen tanla, eng soddasini. Nega tanlaganingni bir gapda ayt.
```

### 18. To‘plam 1 prompti (1-dars; 8-mashqda skill bo‘ladi)

Manba: To‘plam 1 qo‘llanmasi (KIT_01), «AI chat uchun so‘rov» bo‘limi, so‘zma-so‘z.

```text
Siz kichik biznes egasiga o‘z kompaniyasidagi ishlarni xaritaga tushirishda yordam beryapsiz.
Quyida bir xodim bilan 20-30 daqiqalik suhbat transkripti yoki suhbatchining qo‘lda yozgan qaydlari berilgan.
Ikki ishni bajaring.

1) Raqamlarni tekshirish.
Matndagi har bir raqam va miqdorni, so‘z bilan aytilganlarini ham, jadvalga chiqaring: matndan aynan iqtibos, siz qanday tushundingiz, ishonch (aniq yoki [?]).
Ovozni matnga o‘girish o‘zbekcha taxminiy raqamlarni buzadi.
Raqam oldidagi «bir» ko‘pincha «taxminan» degani: «bir uch-to‘rt yuz ming» taxminan 300 000-400 000 degani, 1 300 000 emas.
«uch-to‘rt», «besh-o‘n» kabi oraliqlarni oraliq qilib qoldiring.
Gapga mos kelmaydigan raqamni (masalan, kichik do‘konda kuniga 1 300 000 ta buyurtma) [?] bilan belgilang.
Shubhali raqamni o‘zingiz «to‘g‘rilamang»: uni [?] bilan qoldiring.

2) Vazifalar ro‘yxati.
Xodim aytgan har bir alohida vazifani ajratib oling va aynan quyidagi ustunlar va kodlar bilan Markdown jadval qaytaring: B.1 Vazifa (fe’l bilan boshlang), B.2 Haftasiga necha marta, B.3 Har safar, daqiqa, B.4 Haftalik vaqt, soat, B.5 Ma’lumot qayerdan keladi, B.6 Natija kimga yoki qayerga yuboriladi, B.7 Qoida (Q) yoki fikr (F), B.8 Xatoning narxi (past / o‘rta / yuqori).
B.4 ni har bir qatorda hisobi bilan yozing, masalan «10 × 15 / 60 = 2,5».
Oxirida haftalik soatlar yig‘indisini ham hisobi bilan yozing.
Faqat xodim aytgan narsalardan foydalaning.
Aniq raqam aytilmagan bo‘lsa, eng yaxshi taxminingizni yozing va uni [?] bilan belgilang.
Turli vazifalarni birlashtirmang.
B.9 ustunini bo‘sh qoldiring: uni biznes egasi to‘ldiradi.

Jadvaldan keyin 3-5 banddan iborat ro‘yxatda yozing: har doim bir xil takrorlanadigan vazifalar, xodim ma’lumot kutib qoladigan joylar va xodim aytgan xatolar.
Oxirida xodimdan so‘rash kerak bo‘lgan savollarni sanang: har bir [?] uchun bittadan.
O‘zbek tilida javob bering.
```

### 19. Promptni skill qilish (8-mashq)

```text
Quyidagi promptni Claude Code skill qilib saqla.
Joyi: .claude/skills/suhbat-tahlili/SKILL.md.
Tepasida frontmatter bo‘lsin: name: suhbat-tahlili, description: o‘zbekcha, bir-ikki gap, qachon ishlatilishini aytsin (xodim suhbati transkripti berilganda), argument-hint: [transkript fayli].
Skill argument sifatida transkript faylini olsin va natijani kit1-interviews/<ism>-form-b.md ga yozishdan oldin mendan so‘rasin.
Promptning matnini o‘zgartirma, faqat «Quyida ... transkripti berilgan» joyini «$ARGUMENTS faylini o‘qi» ga almashtir.
Prompt:
[18-promptni shu yerga joylang]
```

Claude `.claude` papkasiga yozish uchun ruxsat so‘raydi: «Yes».

### 20. Skill’ni o‘rnatishdan oldin tekshirish

```text
../skills papkasidagi kit1, kit2, kit3, kit4, kit5 skill’larini o‘qi, hali o‘rnatma.
Har biri uchun jadval qil: qaysi fayllarni o‘qiydi va yozadi, buyruq (Bash) ishga tushiradimi, internetga chiqadimi, kalit yoki parol so‘raydimi, faylni o‘chiradimi.
Shubhali joy bo‘lsa, qatorini ko‘rsat.
```

Begona skill uchun ham xuddi shu prompt: papka nomini almashtiring.

### 21. Kurs skill’larini o‘rnatish

```text
../skills ichidagi kit1, kit2, kit3, kit4, kit5 papkalarini shu papkadagi .claude/skills/ ichiga nusxala.
Bor faylning ustiga yozma.
Oxirida .claude/skills ichida nima borligini ko‘rsat.
```

## 5. Kompaniya ma’lumoti bilan biznes promptlar (2.0 dan yangilangan)

2.0 kursining 47 ta promptidan Claude Code ichida eng ko‘p ishlatilgan 10 tasi.
Farqi: endi kompaniyangizni tushuntirmaysiz, Claude uni `CLAUDE.md` va `hujjatlar/` dan oladi.
Qolgan 37 ta prompt (g‘oyalar, reklama, o‘rganish) 2.0 to‘plamida; ular ham shu papkada ishlaydi.

### 22. Meni intervyu qil

```text
CLAUDE.md ni o‘qi va mendan intervyu ol.
Kundalik ishimdagi qiyinchiliklar haqida 10 ta savol ber, bittadan.
Intervyu tugagach, qaysi ishimni AI’ga birinchi bo‘lib berish kerakligini 3 ta variantda taklif qil, har biri uchun haftasiga taxminan necha soat bo‘shashini hisobi bilan ko‘rsat.
```

### 23. Uchta tanqidchi

```text
Ushbu rejani jiddiy sinovdan o‘tkaz: [reja, masalan prd.md].
Uchta alohida rol nomidan javob ber: shubha bilan qaraydigan investor, bo‘lajak mijozlarim ichidagi eng ishonchsizi va meni bozordan siqib chiqarmoqchi bo‘lgan raqobatchi.
Keyin qaysi e’tiroz rejani barbod qilish ehtimoli eng yuqori ekanini ayt.
```

### 24. Fakt va taxminni ajratish

```text
[Fayl yoki matn] ni o‘qi.
U tayangan barcha farazlarni sana, ochiq aytilganlarini ham, yashirinlarini ham.
Ularni uch guruhga ajrat: tekshirilgan faktlar, asosli taxminlar va faqat umidga tayangan fikrlar.
Har bir umidga tayangan fikrni fakt deb hisoblash uchun qanday dalil kerakligini ayt.
```

### 25. Muvaffaqiyatsizlikni oldindan ko‘rish

```text
prd.md dagi reja nega muvaffaqiyatsiz bo‘lishi mumkinligini oldindan tahlil qil.
Tasavvur qil: 3 oy o‘tdi va sinov butunlay barbod bo‘ldi.
Jamoa uchun qisqa hisobot yoz: nima noto‘g‘ri ketdi, qaysi ketma-ketlikda va qaysi dastlabki belgini e’tiborsiz qoldirdik.
3 ta bir-biridan farqli ssenariy ber.
```

### 26. Qarordan oldin nimani bilish kerak

```text
Men [variantlar] orasidan birini tanlamoqchiman.
Vaziyatni uch qismga ajrat: hozir bilganlarim, qaror qilishdan oldin arzon aniqlay oladiganlarim va faqat sinab ko‘rgandan keyin biladiganlarim.
Uchinchi guruhni kutib, qarorni cho‘zmayapmanmi?
```

### 27. Mijoz e’tirozlariga tayyorgarlik

```text
hujjatlar/ dagi narx va shartlarimizni o‘qi.
Mijozlarimiz eng ko‘p aytadigan 10 ta e’tirozni yoz.
Har biri uchun: e’tiroz ortidagi xavotir, vaziyatga boshqacha qarashga yordam beradigan izoh, bitta dalil (hujjatdan, qaysi band) va e’tiroz yopilganini tekshiradigan savol.
Faqat rasmiy hujjatdagi shartlarni va’da qil.
```

### 28. «Qimmat» degan javob

```text
Mijoz «Juda qimmat» dedi.
Bu gapning olti xil sababiga mos oltita javob ber: byudjeti yo‘q, qiymatni ko‘rmayapti, noto‘g‘ri muqobil bilan solishtiryapti, odat bo‘yicha savdolashyapti, bu taklif uchun mos xaridor emas, taklif ehtiyojiga mos kelmaydi.
Har biri uchun qaysi holatda ekanimni aniqlaydigan savolni ham qo‘sh.
Chegirma va’da qilma: chegirma qoidalari CLAUDE.md da.
```

### 29. Javobsiz qolgan taklifni qayta ochish

```text
Tijoriy taklif yuborganimdan keyin mijoz javob bermay qo‘ydi.
Ikki hafta ichida yuboriladigan 3 ta xabar yoz: birinchisi yangi foyda bersin, ikkinchisi vaziyatga mos dalil keltirsin, uchinchisi bu masalani yopayotganimni ochiq aytsin.
«Shunchaki holatni bilmoqchi edim» mazmunidagi gaplarni ishlatma.
CLAUDE.md dagi mijozga yozish qoidalariga amal qil.
```

### 30. Uchrashuvdan keyingi tahlil

```text
Uchrashuv qaydlarim: [qaydlarni joylang yoki fayl nomi].
Ularni ajrat: tasdiqlangan muammolar, mijoz aytgan raqamlar, ochiq aytilmagan, lekin men sezgan xavflar, qaror qilish tartibi va keyingi suhbatda albatta so‘rashim kerak bo‘lgan 3 ta savol.
```

### 31. Yaxshiroq savol

```text
Hozir berayotgan savolim: [savol].
Undan yaxshiroq 5 ta savol tuz: ularga javob topilsa, dastlabki savolim ahamiyatini yo‘qotsin yoki javobi osonlashsin.
```

## 6. Uy vazifasi uchun

### 32. Boshlang‘ich raqamlar: kurs skill’i bilan

Kurs skill’lari o‘rnatilgan bo‘lsa (8-mashq):

```text
/kit5 baseline
```

### 33. Telegram eksportidan sanash

Avval chatni eksport qiling: Telegram Desktop (macOS’da «Telegram Lite» emas, to‘liq versiya) - chat - ⋮ - «Export chat history» - format JSON.
Hosil bo‘lgan papkani `kompaniya/manbalar/` ichiga qo‘ying.

```text
manbalar/[papka nomi]/result.json ni o‘qi. Bu bizning [chat nomi] Telegram chatimiz.
Oxirgi 4 hafta uchun sanab ber: [jarayon] bo‘yicha nechta so‘rov kelgan, nechtasiga qayta so‘rash bo‘lgan (bir odam 24 soat ichida yana yozgan), nechta javobni rahbar tuzatgan.
Qaysi so‘zlar bo‘yicha ajratganingni yoz.
Keyin menga 20 ta tasodifiy xabarni ko‘rsat: men ularni qo‘lda tekshiraman.
Natijani kit5-pilot/baseline.md ga «tarix» usuli bilan yoz.
```

### 34. Tizimlar va API

```text
Tanlangan jarayonim tegadigan tizimlar: [Excel, Google Sheets, Telegram guruhi, 1C, AmoCRM, Bitrix, Click, Payme ...].
Har biri uchun jadval qil: API bormi, rasmiy hujjat havolasi, eksport qilish mumkinmi (qaysi formatda), ulash qanchalik qiyin (oson, o‘rta, qiyin) va kimdan ruxsat kerak.
Internetda tekshir, hozir 2026-yil. Topolmagan joyni [?] bilan qoldir.
```
