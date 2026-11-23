# /kit3 namunasi: «Baraka Office» MChJ

Sana (kurs taqvimi bo‘yicha): 2026-12-06 (istisnolar 2026-12-13).
Model: claude-opus-5-5.
Quyida egasi yozgan har bir xabar va Claude Code’ning to‘liq javobi, o‘zgartirilmagan holda (faqat apostrof va chiziqcha uslubi bir xil qilingan).

## 1-sessiya: jarayon qadamlari, agent yo‘riqnomasi va tizim yo‘riqnomasi (3-dars)

### 1-xabar: siz yozasiz

```text
/kit3
```

### Claude javobi

Holatni ko‘rib chiqdim.
Ikkinchi to‘plamda tanlangan jarayon: **narx, qoldiq, chegirma va muddat savoli**.
Agentning nomi «Savdo yordamchisi».
Agent mijozga yozmaydi, faqat xodimlarga javob beradi.

Birinchi to‘plamdagi suhbatlardan qadamlar qoralamasini tuzdim:

| # | A.1 Qadam | A.2 Ma’lumot | A.3 Bugun kim qiladi |
|---|---|---|---|
| 1 | Mijozdan savol oladi (telefon, Instagram, Telegram) | mijoz savoli | menejer, call-markaz operatori |
| 2 | Savolni ROP ga Telegramda yozadi | savol matni | menejer, operator |
| 3 | Narxni topadi: ulgurji (5 donadan) yoki chakana | `narxlar.csv` (14 sahifali prays-list) | ROP yoki menejer |
| 4 | Ombordagi qoldiqni so‘raydi | 1C qoldig‘i yoki ombordan telefonda | ombor xodimi (Umid aka) |
| 5 | Chegirma 5% doirasida bo‘lsa, qoida bo‘yicha javob beradi | `qoidalar.md` | ROP |
| 6 | 5% dan katta chegirmani hal qiladi | `qoidalar.md`, buyurtma summasi | ROP |
| 7 | Yetkazib berish muddatini aytadi (7 yoki 12 ish kuni) | `qoidalar.md` | ROP |
| 8 | Javobni xodimga Telegramda yozadi | 3-7 qadamlar natijasi | ROP |
| 9 | Javobni mijozga aytadi | ROP javobi | menejer, operator |

Suhbatlarda aytilgan kutish joylari:
- ombor javobi: ba’zan 30 daqiqa;
- chegirma bo‘yicha javob: 8 daqiqa;
- ROP javobi: 5-10 daqiqa.

Shu kutish paytida kuniga 2-3 mijoz ketib qoladi [?].

Bir nechta savolim bor:

1. Jarayon mijoz savol bergan payt boshlanib, javob mijozga yetganda tugaydimi?
   Shunday bo‘lsa, javob yetdi deb qachon hisoblaymiz: xodim mijozga aytgandami yoki amoCRM ga yozilgandami?
2. Jarayon egasi kim bo‘ladi: Jamshid Karimovmi (ROP)?
3. O‘tgan haftadagi bitta real holatni boshidan oxirigacha aytib bering.
   Masalan, kelgan bitta savolni eslang: kim so‘radi, kimga yozdi, javobni kim qayerdan topdi, mijoz qancha kutdi?
   Qoralamada qolib ketgan qadamlarni shu holat bilan topaman.

### 2-xabar: siz yozasiz

```text
1. Boshlanadi: xodim mijozdan savol oladi. Tugaydi: xodim mijozga to‘g‘ri javobni aytadi; amoCRMga yozish bu jarayonga kirmaydi. 2. Jarayon egasi Jamshid Karimov (ROP). 3. O‘tgan dushanba: Zarinaga mijoz qo‘ng‘iroq qilib, 8 ta Optima stol so‘radi, 7% chegirma va 3 kunda yetkazishni so‘radi. Zarina Malikaga Telegramda yozdi. Malika prays-listni ochib ulgurji narxni topdi: 1 890 000 × 8 = 15 120 000. Qoldiqni Umid akadan so‘radi, 20 daqiqada javob keldi: omborda 12 ta bor. Chegirmani Jamshid akaga yozdi, 10 daqiqada javob keldi: 20 mln dan kichik buyurtmaga chegirma yo‘q. Muddat: shartnoma bo‘yicha 7 ish kuni. Malika Zarinaga yozdi, Zarina mijozga 35 daqiqadan keyin qayta qo‘ng‘iroq qildi, mijoz o‘ylab ko‘raman dedi.
```

### Claude javobi

Dushanbadagi holatni prays-list bilan solishtirdim.
«Optima» stolining ulgurji narxi to‘g‘ri chiqdi: 5 donadan 1 890 000 so‘m (`narxlar.csv`, 3-qator).
Summa: 1 890 000 × 8 = 15 120 000 so‘m.

**Bu holatdan chiqqan narsalar:**
- Savol uch kishidan o‘tgan: Zarina → Malika → Umid aka va Jamshid aka.
  Javob mijozga 35 daqiqadan keyin yetgan: omborni 20 daqiqa, ROP ni 10 daqiqa kutishgan.
- `qoidalar.md` bo‘yicha bu buyurtmada mijozga yana ikkita foyda bor edi, lekin ular aytilmagan:
  - yetkazish va montaj bepul, chunki buyurtma 10 mln dan katta: 15 120 000 ≥ 10 000 000;
  - 3D loyiha bepul, chunki buyurtma 15 mln dan katta: 15 120 000 > 15 000 000.
- Bitta noaniq joy bor.
  Qoidada ROP 100% oldindan to‘lov bo‘lsa 10% gacha chegirma bera oladi.
  Jamshid aka esa «20 mln dan kichik buyurtmaga chegirma yo‘q» degan.

**Ertangi qadamlar (qoralama):**

| # | A.1 Qadam | A.3 Bugun | A.4 Ertaga | A.5 Tekshiradi | A.6 Qaror | A.7 Javobgar | A.8 Kutish, xatolar |
|---|---|---|---|---|---|---|---|
| 1 | Mijozdan savol oladi (mahsulot, dona soni, chegirma, muddat) | operator, menejer | I | - | xodim | Jamshid K. | - |
| 2 | Savolni «Savdo yordamchisi» ga yozadi | operator → menejerga Telegramda | I | - | xodim | Jamshid K. | bugun bir xodimdan ikkinchisiga o‘tadi |
| 3 | Dona soniga qarab ulgurji yoki chakana narxni topadi, summani hisoblaydi | menejer | A, keyin I tasdiqlaydi | savol bergan xodim | xodim | Jamshid K. | eski prays (350 000 so‘m zarar); ulgurji o‘rniga chakana narx |
| 4 | 1C CSV dan qoldiqni o‘qiydi | Umid aka (20-30 daq.) | A | savol bergan xodim; shubha bo‘lsa Umid aka | Umid aka | Jamshid K. | fayl kunda bir marta yangilanadi, cp1251 kodlashda; fayl eski bo‘lishi mumkin |
| 5 | Chegirmani `qoidalar.md` bo‘yicha aytadi (menejer 5% gacha, 20 mln dan katta buyurtmada) | ROP (8-10 daq.) | A | savol bergan xodim | xodim | Jamshid K. | og‘zaki 12-15% to‘xtatilgan |
| 6 | 5% dan katta chegirmani hal qiladi | ROP | I | - | Jamshid K. | Jamshid K. | yozma ruxsat kerak |
| 7 | Yetkazish muddatini aytadi: 7 ish kuni, maxsus o‘lchamli buyurtma 12 ish kuni | ROP | A | savol bergan xodim | xodim | Jamshid K. | og‘zaki «3 kun» to‘xtatilgan, 2 marta janjal bo‘lgan |
| 8 | Javobni manbasi bilan xodimga yozadi | ROP, menejer | A | savol bergan xodim | - | Jamshid K. | - |
| 9 | Javobni tekshiradi va mijozga aytadi | operator, menejer | I | - | xodim | Jamshid K. | mijoz kutsa, ketib qoladi (kuniga 2-3 [?]) |

**Tekshiruv natijasi:** agent hech bir qadamda o‘zini o‘zi tekshirmaydi: agent qadamlarini (3, 4, 5, 7, 8) savol bergan xodim tekshiradi.
Har bir qadamning javobgari bor.
Bo‘sh kataklar faqat odam qiladigan qadamlarda qoldi.

Faylga yozishdan oldin uchta savol:

1. Jadvalni tasdiqlaysizmi?
   Birinchi haftada javoblarni savol bergan xodim tekshiradimi yoki Jamshid aka ham har bir javobni ko‘radimi?
2. Mijoz 100% oldindan to‘lasa, agent «ROP 10% gacha berishi mumkin» deb aytsinmi?
   Yoki bunday savollarni faqat Jamshid akaga uzatadimi?
3. Buyurtma qoidaga tushsa, agent javobga «yetkazish va montaj bepul», «3D bepul» kabi shartlarni ham qo‘shsinmi?

### 3-xabar: siz yozasiz

```text
1. Tasdiqlayman. Har bir javobni savol bergan xodim tekshiradi (noto‘g‘ri bo‘lsa ❌ bosadi), Jamshid aka birinchi hafta kunlik jurnalni ko‘radi. 2. 5% dan katta har qanday chegirma, 100% oldindan to‘lov bo‘lsa ham, faqat Jamshid akaga uzatiladi. 3. Ha, qoidaga tushsa qo‘shsin, lekin bepul yetkazish faqat Toshkent shahri ichida, viloyatga 8 000 so‘m/km. B shakli uchun: manbalar - narxlar.csv (eksport), qoidalar.md (qo‘lda hujjat), 1C qoldig‘i (har kuni ertalab CSV eksport), Telegram bot (API). Tender yoki 150 mln dan katta buyurtma, shikoyat, kafolat nizosi, prays-listda yoki omborda yo‘q mahsulot va ishlab chiqarish muddati - Jamshid akaga. HR va IT savollariga javob bermaydi: HR - Dilnoza Murodova, IT - Sardorbek Umarov. B shaklini o‘zingiz taklif qilib, bir marta ko‘rsating.
```

### Claude javobi

A shaklini `kit3-agent/form-a-steps.md` ga yozdim: 9 ta qadam, ulardan 5 tasi agentga, 4 tasi odamga.
Dushanbadagi holatni ham shu faylga qo‘shdim.

Quyida B shakli qoralamasi.
U hali faylga yozilmagan.

---

**Agent nomi:** Savdo yordamchisi

**B.1 Vazifa:** menejer va call-markaz operatorining narx, qoldiq, chegirma va yetkazish muddati haqidagi savoliga prays-list, `qoidalar.md` va 1C qoldig‘idan manbasi bilan javob tayyorlaydi.

**B.2 Javobgar rahbar:** Jamshid Karimov (ROP)

**B.3 Manbalar**

| Manba | Ulanish |
|---|---|
| `narxlar.csv` (prays-list) | eksport |
| `qoidalar.md` (chegirma, to‘lov, yetkazish, 3D, kafolat) | qo‘lda (hujjat) |
| 1C ombor qoldig‘i | eksport (har kuni ertalab CSV) |
| Telegram bot | API (kalit faqat `.env` da) |

**B.4 Mustaqil qila oladigan ishlar**
- Dona soniga qarab ulgurji (5 donadan) yoki chakana narxni topadi va summani hisoblaydi.
- 1C faylidan qoldiqni o‘qiydi va fayl sanasini ko‘rsatadi.
- Chegirmani faqat qoida doirasida aytadi: buyurtma 20 000 000 so‘mdan oshsa, 5% gacha.
- Muddat va shartlarni aytadi:
  - yetkazish 7 ish kuni, maxsus o‘lchamli buyurtma 12 ish kuni;
  - Toshkent shahri ichida 10 mln va undan katta buyurtmaga yetkazish va montaj bepul, kichigiga 350 000 so‘m;
  - viloyatga 8 000 so‘m/km;
  - 15 mln dan katta buyurtmaga 3D loyiha bepul.
- Javobni faqat savol bergan xodimga yozadi.
  Xodim uni tekshiradi va mijozga o‘zi aytadi.

**B.5 Hech qachon qilmaydigan ishlar**
- Mijozga yozmaydi.
- 5% dan katta chegirma va’da qilmaydi.
- «3 kunda yetkazamiz», «12-15% chegirma» kabi og‘zaki qoidalarni aytmaydi.
- Pul o‘tkazmaydi.
- Ma’lumotni o‘chirmaydi va o‘zgartirmaydi.
- Xodimlarni baholamaydi va kuzatmaydi.
- HR va IT savollariga javob bermaydi.

**B.6 Odamga uzatish**

| Holat | Kimga | Qanday |
|---|---|---|
| 5% dan katta chegirma (100% oldindan to‘lov bo‘lsa ham) | Jamshid Karimov | xodimga «Buni Jamshid aka hal qiladi» deb yozadi va savolni summasi bilan Jamshid akaga yuboradi |
| Tender yoki 150 mln dan katta buyurtma | Jamshid Karimov | xuddi shunday |
| Shikoyat | Jamshid Karimov | xuddi shunday |
| Kafolat bo‘yicha nizo | Jamshid Karimov | xuddi shunday |
| Mahsulot prays-listda yoki omborda yo‘q | Jamshid Karimov | xuddi shunday |
| Ishlab chiqarish muddati | Jamshid Karimov | xuddi shunday |
| HR savoli | Dilnoza Murodova | javob bermaydi, xodimga kimga murojaat qilishni aytadi |
| IT savoli | Sardorbek Umarov | javob bermaydi, xodimga kimga murojaat qilishni aytadi |
| *taklif:* 1C fayli kelmagan, bo‘sh yoki bugungi emas; format notanish | Jamshid Karimov | qoldiq haqida javob bermaydi, sababini yozadi |
| *taklif:* narx kechagidan keskin farq qiladi yoki agent javobga ishonmayapti | Jamshid Karimov | «ishonchim yo‘q» deb yozadi va uzatadi |

**B.7 Jurnalga nima yozadi:** sana va vaqt, savol, javob, qaysi manbadan olingani (fayl va qator, 1C fayli sanasi), odamga uzatilgan-uzatilmagani, ❌ bosilgan-bosilmagani.
Xodim nimani yozganini, qachon onlayn bo‘lganini va qancha tez javob berganini yozmaydi.

**B.8 Ohang va til:** o‘zbek tilida, xodimga «siz» bilan, qisqa yozadi.
Summalar so‘mda yoziladi (`15 120 000 so‘m`), oxirida manba ko‘rsatiladi.
Ishonmasa, buni ochiq aytadi.

**B.9 Sifat mezoni:** javob to‘g‘ri hisoblanadi, agar:
- narx `narxlar.csv` bilan aynan mos kelsa;
- dona soniga qarab ulgurji yoki chakana narx to‘g‘ri tanlangan bo‘lsa;
- summa narx × dona soniga teng bo‘lsa;
- qoldiq bugungi 1C faylidan olingan bo‘lsa;
- chegirma, muddat va shartlar `qoidalar.md` ga mos kelsa;
- uzatish kerak bo‘lgan holat uzatilgan bo‘lsa;
- savol bergan xodim ❌ bosmagan bo‘lsa.

**B.10 Tasdiq:** bo‘sh qoladi.
Xodimlar ko‘rgandan keyin siz imzolaysiz.

---

Tekshiruvda topilgan narsalar:
- A.4-A.7 da bo‘sh katak yo‘q, agent o‘zini o‘zi tekshiradigan joy ham yo‘q.
- Har bir manbaning ulanish turi yozilgan.
- Pul bilan bog‘liq xavfli ruxsatlar (chegirma, bepul yetkazish) faqat `qoidalar.md` doirasida qoldi, har bir javobni xodim ❌ bilan tekshiradi.

Faylga yozishdan oldin uchta savol:

1. «Ishlab chiqarish muddati» deganda nimani nazarda tutasiz?
   Men shunday tushundim: oddiy 7 va 12 ish kunini agent o‘zi aytadi, zavoddan aniq sana so‘ralsa yoki nostandart buyurtma bo‘lsa, Jamshid akaga uzatadi.
   To‘g‘rimi?
2. Jadvaldagi ikkita «taklif» qatorini qabul qilasizmi?
   1C fayli kelmasa yoki eski bo‘lsa, Jamshid akagami yoki Umid akaga uzatsin?
3. Yana qo‘shish yoki o‘zgartirish kerak bo‘lgan joy bormi?
   B.9 uchun maqsad belgilasangiz ham bo‘ladi, masalan ❌ bosilgan javoblar haftasiga necha foizdan oshmasligi kerak.
   Raqamni o‘zim qo‘ymadim.

### 4-xabar: siz yozasiz

```text
1. To‘g‘ri tushundingiz. 2. Ikkalasini qabul qilaman; 1C fayli kelmasa yoki eski bo‘lsa, Jamshid akaga uzatsin, u fabrikadagi Otabek akaga yo‘naltiradi. 3. Javob 6 qatordan oshmasin. B.9 ga raqam qo‘ymang, maqsad To‘plam 5 da. Fayllarni yozing.
```

### Claude javobi

Fayllarni yozdim: `kit3-agent/` ichida `form-a-steps.md`, `form-b-agent.md` va `instructions.md`, hamda bo‘sh `kit4-people/test-set.md`.

- **Jarayon:** 9 ta qadam: 5 tasini agent qiladi (narx, qoldiq, chegirma, muddat, javob yozish), 4 tasini odam qiladi.
  Agent yozgan har bir javobni savol bergan xodim tekshiradi.
- **Manbalar:** `narxlar.csv` va 1C qoldig‘i fayl qilib olinadi (eksport), `qoidalar.md` qo‘lda yuritiladigan hujjat.
  Telegram botga API orqali ulanadi, kaliti faqat `.env` da turadi.
- **instructions.md** agentning birinchi versiyasi uchun texnik topshiriq ham bo‘ladi.
  Reja rejimini Shift+Tab bilan yoqib, shu faylni bersangiz, agentni qurishni boshlash mumkin.
- **Uyga vazifa:**
  1. `form-b-agent.md` ni menejer va operatorlarga ko‘rsating; ular aytgan istisnolarni `/kit3 istisno` bilan qo‘shing.
  2. B.10 ni imzolab, sana qo‘ying.
  3. 3 ta yaxshi va 3 ta yomon real misol yig‘ing (`test-set.md`).
     Dushanbadagi «Optima» holati yomon misollardan biri bo‘lishi mumkin.
  4. Agentni `instructions.md` asosida quring va o‘tgan 5 ta real holatda sinab ko‘ring.
- **Keyingi to‘plam:** 4-darsda `/kit4` va `/kit5 reja`.

## 2-sessiya: /kit3 istisno (4-darsdan oldin, xodimlar ko‘rgandan keyin)

### 1-xabar: siz yozasiz

```text
/kit3 istisno. 2026-12-13 da Malika va Jamshid aka form-b-agent.md ni ko‘rib, ikki istisno aytdi: 1) bot tannarxni hech qachon aytmaydi, 1C faylidagi tannarx ustunini ishlatmaydi; so‘rasa, «bu ichki ma’lumot» deydi va Jamshid akaga uzatadi. 2) Bot «omborda yo‘q» desa yoki 1C fayli bilan javondagi holat farq qilsa, Jamshid aka omborchidan tekshirtiradi. Ikkalasini qo‘shing, yozishga ruxsat beraman.
```

### Claude javobi

Ikkala istisno `form-b-agent.md` va `instructions.md` ga qo‘shildi.

**1) Tannarx**
- **Taqiqlar ro‘yxatiga (B.5) qo‘shildi:** bot tannarxni hech qachon aytmaydi va 1C faylidagi tannarx ustunini (`себестоимость`) ishlatmaydi.
  1C faylidan faqat qoldiqni oladi.
- **Odamga uzatish (B.6):**

| Holat | Kimga | Qanday |
|---|---|---|
| Tannarx so‘raladi | Jamshid Karimov | «bu ichki ma’lumot» deydi va savolni Jamshid akaga yuboradi |

**2) Ombor**
- **Odamga uzatish (B.6):**

| Holat | Kimga | Qanday |
|---|---|---|
| Bot «omborda yo‘q» deydi yoki 1C fayli bilan javondagi holat farq qiladi | Jamshid Karimov (u omborchidan tekshirtiradi) | 1C dagi sonni va fayl sanasini yozadi, «omborchi tekshirishi kerak» deydi va savolni Jamshid akaga yuboradi |

- Avvalgi «prays-listda yoki omborda yo‘q» qatori ikkiga bo‘lindi.
  Ombor qismi yangi qatorga o‘tdi, eskisida faqat «prays-listda yo‘q» qoldi.

`instructions.md` dagi o‘zgarishlar tarixiga 2026-12-13 sanasi bilan qator yozildi: kim aytdi va nima qo‘shildi.

**Eslatma:** `kit4-people/test-set.md` da 7 ta misol bor (T1-T7).
Yo‘riqnoma o‘zgardi, shuning uchun agentni hammasida qayta sinash kerak.
Ayniqsa T7 (tannarx) va T3 (qoldiq) muhim.

Uchta savol:
1. 2-istisnoning «Qanday» ustunini Malika va Jamshid aka aytmagan, uni men yozdim: bot 1C dagi son va sanani yozadi, keyin uzatadi.
   Shu to‘g‘rimi?
2. Omborchining ismini yozaymi?
   Ismni o‘zim qo‘ymadim.
3. `test-set.md` da T7 ostida «bu taqiq hali yo‘q» degan eslatma qoldi.
   Endi u eskirdi.
   O‘sha qatorni yangilashga ruxsat berasizmi?

### 2-xabar: siz yozasiz

```text
1. To‘g‘ri. 2. Yo‘q, «omborchi» deb qolsin, uning yozma roziligi yo‘q. 3. Ha, yangilang.
```

### Claude javobi

`test-set.md` dagi T7 eslatmasini yangiladim.
Endi u taqiq `instructions.md` ga 2026-12-13 da qo‘shilganini aytadi va agentni yangi versiyada qayta sinashni eslatadi.

Javoblaringiz bo‘yicha:
1. Ombor qatoridagi «Qanday» ustuni men yozgandek qoldi.
2. Omborchining ismi yozilmadi, hamma joyda «omborchi» deb turibdi.

**Sinash:** agent yo‘riqnomasi o‘zgardi.
Agentni T1-T7 ning hammasida qayta tekshirish kerak, ayniqsa T3 (qoldiq) va T7 (tannarx).
Sinovdan oldin bugungi 1C faylini qo‘yishni unutmang.
Natijani `test-set.md` oxiridagi «Sinov natijalari» jadvaliga bitta qator qilib yozing.

**Savol:** T7 ning qolgan qismi hali eski talab bo‘yicha yozilgan.
Hozir u faqat «tannarxni aytmaydi yoki rad etadi» deydi.
Yangi qoidaga ko‘ra yana ikki narsa kerak: bot «bu ichki ma’lumot» deydi va savolni Jamshid akaga uzatadi.
Shu ikkalasini T7 ning «To‘g‘ri natija» va «Tekshirish» qismlariga qo‘shaymi?
Ularsiz agent uzatishni qilmasa ham T7 dan o‘tib ketaveradi.

### 3-xabar: siz yozasiz

```text
Ha, qo‘shing.
```

### Claude javobi

T7 ni yangiladim (`kit4-people/test-set.md`).

- **To‘g‘ri natija:** agent tannarxni aytmaydi.
  Xodimga «bu ichki ma’lumot» deydi va savolni Jamshid akaga uzatadi.
  Sotuv narxini aytishi mumkin.
- **Tekshirish:** 3 ta shart bor:
  - 1 520 000 so‘m (fayldagi tannarx) yoki tannarxga oid boshqa son aytilmagan;
  - javobda «bu ichki ma’lumot» degan gap bor;
  - savol Jamshid akaga uzatilgan va bu ish jurnaliga yozilgan.

Ikkala istisno ham B shakliga, `instructions.md` ga va o‘zgarishlar tarixiga qo‘shilgan.
Agent hali yangi versiyada sinalmagan.

Qolgan ishlar:
1. Bugungi 1C faylini qo‘ying va agentni T1-T7 da qayta sinang.
   Natijani «Sinov natijalari» jadvaliga bitta qator qilib yozing.
2. Ombor istisnosi uchun sinov misoli yo‘q.
   Bot «omborda yo‘q» degan yoki 1C javondan farq qilgan real holat bo‘lsa, menga bering.
   Uni T8 qilib qo‘shaman, misolni o‘zim to‘qimayman.
3. B.10 hali imzolanmagan.
   Jamshid aka tasdiqlagach, imzo va sanani qo‘ying.
