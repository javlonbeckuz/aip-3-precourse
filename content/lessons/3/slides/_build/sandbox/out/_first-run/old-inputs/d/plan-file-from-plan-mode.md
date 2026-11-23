# Reja: savdo bo‘limi yordamchisi uchun prd.md va tasks.md

## Kontekst

Foydalanuvchi CLAUDE.md dagi «Hozirgi sinov jarayoni» uchun ichki yordamchi vosita qurmoqchi.
Bu jarayon To‘plam 2 dagi B.1: narx, qoldiq, chegirma va muddat savollariga javob, savdo bo‘limi.
Avval «AI yo‘q» dunyosidagi mutaxassislar nomidan savollar beriladi, bir xabarda 3 tadan ko‘p emas.
Foydalanuvchi javob bera olmaydi, shuning uchun javoblar faqat CLAUDE.md, hujjatlar/ va kit2-scoring/ dan olinadi.
kit2 o‘zi havola qilgan kit1 qatorlari faqat aniqlik uchun ishlatiladi va shunday belgilanadi.
Topilmagan javob [?] bilan qoladi va PRD oxiridagi «Ochiq savollar»ga tushadi.
Natija: loyiha ildizida `prd.md` va `tasks.md`. Kod yozilmaydi.

Bu plan fayli loyiha papkasidan tashqarida turadi, shuning uchun bu yerda xodim ismlari yo‘q, faqat lavozimlar.
`prd.md` va `tasks.md` papka ichida bo‘ladi, ularda CLAUDE.md dagi ismlar ishlatiladi.

## Tasdiqdan keyin bajariladigan ishlar

1. `prd.md` yozish: 2-qism asosida, ilovada 1-qismdagi savol-javoblar.
2. `tasks.md` yozish: 3-qism asosida, 15 ta vazifa.
3. Tekshiruv: pastdagi «Tekshiruv» bo‘limi.
4. Papka git repo emas: commit qilinmaydi, `git init` qilinmaydi.
5. `kit3-agent/`, `kit4-people/`, `kit5-pilot/`, `app/` papkalariga tegilmaydi: ular /kit3 ... /kit5 buyruqlarining ishi.

---

## 1-qism. Mutaxassislar savollari

AI bo‘lmasa, bunday ichki «ma’lumotnoma va kalkulyator»ni odatda 6 mutaxassis qurardi:
mahsulot menejeri, biznes-tahlilchi, ma’lumotlar va 1C muhandisi, UX dizayner, xavfsizlik va huquq mutaxassisi, sifat nazorati (QA) muhandisi.
Har biri bitta xabar, har xabarda 3 ta savol.

### 1-xabar. Mahsulot menejeri

1. Qaysi muammoni hal qilamiz, raqamda?
   - Kuniga 25 ta savol = 12 + 5 + 8 (kit2 form-a, 1-jarayon, A.2).
   - Haftasiga 16,2 soat = 6,0 + 2,5 + 1,5 + 3,0 + 3,2 (kit2 form-a, «Jarayonlar tarkibi»).
   - Noto‘g‘ri va’dalar: «3 kunda yetkazamiz», «12-15% chegirma» (kit2 form-b-matrix, B.2).
   - Pul qiymati: 16,2 × 40 000 [?] = 648 000 so‘m/hafta [?]; soatbay haq CLAUDE.md da [?] bilan yozilgan.
2. Kim ishlatadi?
   - Call-markaz operatorlari va sotuv menejerlari; bo‘lim boshlig‘i ROP (CLAUDE.md, «Hozirgi sinov jarayoni»).
   - Ichki yordamchi: mijozga o‘zi yozmaydi (o‘sha joy).
   - Nechta operator va nechta sotuvchi bor: [?] (kit2 form-a 3-jarayonda «5 sotuvchi [?]» deyilgan).
3. Birinchi versiyaga nima kirmaydi?
   - Lidni malakalash, KP, chegirmaga ruxsat berish, mijozga o‘zi yozish (kit2 form-b-matrix, B.3).

### 2-xabar. Biznes-tahlilchi

4. Odamlar aytayotgan gap rasmiy hujjatga zid bo‘lsa, qaysi biri to‘g‘ri?
   - Rasmiy hujjat to‘g‘ri (CLAUDE.md, «Rasmiy hujjatlar»).
   - Ma’lum ziddiyatlar: 3 kun va 7 ish kuni, 12-15% va 10% (kit2 form-a «Egasi o‘zgartirgan ballar»; form-b-matrix «Sinov nega muvaffaqiyatsiz bo‘lishi mumkin», 1-band).
   - Egasining yozma qarori hali yo‘q: form-b-matrix kelishuv ro‘yxatida belgi qo‘yilmagan [?].
5. Hujjatlarning o‘zi bir-biriga zidmi?
   - Ha. KP (hujjatlar/02) «36 oy kafolat» deydi, shartnoma 4.1 da 24 oy korpus, 12 oy mexanizm.
   - KP «butun viloyatga bepul yetkazamiz» deydi, shartnoma 3.2 da halqa yo‘lidan har km uchun 8 000 so‘m.
   - KP «24 soatda bepul 3D» ni hammaga va’da qiladi, prays-list 5.5 da faqat 15 mln so‘mdan oshsa.
   - Xulosa: KP javob manbai emas, uning gaplari sinovda «tuzoq» sifatida ishlatiladi.
   - Prays-list ichida: sarlavhada «barcha stollar 25 mm», WS-101 qatorida «LDSP 18 mm» [?].
6. Hisob qoidalari to‘liqmi?
   - Yo‘q. Ulgurji «5+ dona» bitta kod bo‘yicha mi yoki butun buyurtma bo‘yicha mi [?].
   - Chegirma paket narxiga va EX seriyasiga qo‘llanadimi [?].
   - Yetkazishdagi «ish kuni» ga shanba kiradimi [?]: kompaniya 6 kun ishlaydi (CLAUDE.md), shartnomada «ish kuni» va «bank ish kuni» alohida.
   - Hujjat shkafining alohida narxi va «Biznes 20» ning to‘liq tarkibi prays-listda yo‘q [?].
   - Liftsiz binoda 1% qo‘shimcha: 3-qavatdan yuqori har qavatgami yoki hamma qavatgami [?] (shartnoma 3.2).

### 3-xabar. Ma’lumotlar va 1C muhandisi

7. Qoldiq qayerdan keladi va qanchalik yangi?
   - 1C eksportidan; hozir logistika boshlig‘idan og‘zaki so‘raladi (kit2 form-a, 1-jarayon, A.5).
   - Kim va kuniga necha marta eksport qiladi: [?]. kit2 buni «boshlashdan oldin javob topish kerak bo‘lgan savol» deb yozgan (form-b-matrix).
   - Kuniga bir marta bo‘lsa, kun ichida sotilgan mebel «bor» bo‘lib ko‘rinadi (form-b-matrix, xavf 2).
8. Prays-listni kim yangilaydi, qachon eskiradi?
   - Egasi 2026-10-01 da tasdiqlagan, 2026-12-31 gacha amal qiladi (prays-list sarlavhasi).
   - Faylni kim yangilaydi va 2027 prays-listi qachon chiqadi: [?].
9. AmoCRM, Didox bilan ulash kerakmi?
   - v1 da yo‘q: lid malakalash keyingi navbat (form-b-matrix, B.3).
   - To‘lov tushgani bosh buxgalterda (CLAUDE.md jadvali): vosita faqat yo‘naltiradi.

### 4-xabar. UX dizayner

10. Xodim savolni qayerda oladi, vositani qayerda ochadi?
    - Operator: Telegram va Instagram yozishmalari; sotuvchi: telefon va Telegram; ROPga sotuvchilar Telegram’da yozadi (kit2 form-a «Jarayonlar tarkibi» havola qilgan kit1 qatorlari).
    - Vosita qayerda bo‘ladi (ichki Telegram bot yoki web sahifa): [?]. CLAUDE.md faqat `app/` papkasini aytadi.
11. Javob qanday ko‘rinishda bo‘lishi kerak?
    - Ikki qism: mijozga qoralama va ichki izoh.
    - Qoralama: «Hurmatli [Ism] aka / opa», «Siz»; «narxi lichkada», «shoshiling», «shok narx» taqiqlangan (CLAUDE.md, «Qoidalar»).
    - Ichki izoh: qaysi hujjat va qaysi band, hisob formulasi, [?] belgilari (CLAUDE.md, «Qoidalar»).
12. Javob topilmasa nima bo‘ladi?
    - Raqam to‘qilmaydi, [?] qo‘yiladi (CLAUDE.md).
    - Mas‘ulga yo‘naltiriladi: qoldiq va yetkazish - logistika boshlig‘i; chegirma 10% gacha - ROP; to‘lov va shartnoma - bosh buxgalter; 3D - dizayner; AmoCRM - IT (CLAUDE.md jadvali).

### 5-xabar. Xavfsizlik va huquq mutaxassisi

13. Kim kira oladi?
    - Narx jadvallarini uchinchi shaxsga berish «qizil chiziq» (hujjatlar/04, 3-bo‘lim, 2-band).
    - Faqat savdo bo‘limi xodimlari; aniq ro‘yxat [?].
    - Kalit va parollar faqat `.env` da (CLAUDE.md).
14. Mijoz ma’lumoti saqlanadimi?
    - Jurnal kerak: kit5 raqamlari uchun (CLAUDE.md, «Kitlar»).
    - Xodim ma’lumoti papkadan chiqmaydi, darsda ismlar olib tashlanadi (CLAUDE.md).
    - Qaysi maydonlar va necha kun saqlanadi: [?].
15. Xato javob uchun kim javob beradi?
    - Agent qoralaydi, operator yoki sotuvchi tasdiqlaydi: xato mijozga yetmaydi (form-b-matrix, B.2).
    - Chegirma ruxsati ROPda qoladi (form-b-matrix, B.3).
    - ROP qoralamalarni qanchalik tez-tez tanlab ko‘radi: [?].

### 6-xabar. Sifat nazorati (QA) muhandisi

16. Qaysi savollar bilan sinaymiz?
    - `kit4-people/test-set.md` hali yo‘q: uni /kit4 tuzadi [?].
    - Majburiy tuzoqlar: «3 kunda yetkazasizmi?», «15% chegirma bering», «36 oy kafolatmi?», «viloyatga bepulmi?», MDF/shpon 12 ish kuni.
    - Chegaralar: 4 va 5 dona; 20 mln, 50 mln (chegirma); 10 mln (shahar ichida bepul yetkazish); 15 mln (bepul 3D).
17. Qachon «tayyor» deymiz?
    - Manbalarda qabul mezoni yo‘q [?].
    - Taklif [?]: taqiqlangan va’da 0 ta; hisob savollari 100% to‘g‘ri; har javobda manba bor.
18. Pilot qancha va kim bilan?
    - `kit5-pilot/plan.md` hali yo‘q: uni /kit5 tuzadi [?].
    - kit2 form-a: ROP 2026-12-02 da ko‘rib chiqadi, demak pilot dekabrga tushadi va prays-list muddati (2026-12-31) bilan kesishadi.

---

## 2-qism. prd.md mazmuni

### 0. Hujjat haqida
Versiya 0.1, sana 2026-11-03, holat: loyiha. Tasdiqlovchi: ROP, keyin egasi. Manbalar: CLAUDE.md, hujjatlar/, kit2-scoring/.

### 1. Muammo
- 25 savol/kun = 12 + 5 + 8; 16,2 soat/hafta = 6,0 + 2,5 + 1,5 + 3,0 + 3,2 (kit2 form-a).
- ROP kuniga 8 ta savolga javob beradi: 8 × 6 = 48 savol/hafta (kit2 form-a A.2; 6 kunlik hafta CLAUDE.md).
- Noto‘g‘ri va’dalar: «3 kun», «12-15%» (form-b-matrix B.2).
- Qoldiq javobi og‘zaki, kechikadi (form-a A.5, A.7).
- Qiymat: 16,2 × 40 000 [?] = 648 000 so‘m/hafta [?].
- Bu raqamlar xodimlarning o‘z bahosi, o‘lchanmagan: kit5 baseline.md da qayta o‘lchanadi.

### 2. Nima quriladi
Ichki yordamchi: xodim mijoz savolini kiritadi, vosita javob qoralamasi va ichki izoh qaytaradi, xodim tekshirib, o‘zi yuboradi.
Asosiy qaror: raqamlarni til modeli emas, oddiy kalkulyatorlar hisoblaydi.
Ma’lumot (prays-list, qoidalar, 1C qoldig‘i) tuzilgan fayllarda turadi.
Agent faqat savolni tushunadi, kerakli kalkulyatorni chaqiradi va matnni qoralaydi.
Sabab: CLAUDE.md «raqamni to‘qima» deydi va xato narx pulga tushadi (form-a A.6).
Ish oqimi: savol → savol turi → kalkulyator yoki qoida → qoralama + manba + formula → taqiqlangan gaplar filtri → xodim tasdiqlaydi → jurnal.

### 3. Kim uchun
| Foydalanuvchi | Hozir nima qiladi | Vosita nima beradi |
| Operator | Telegram/Instagram savollariga javob, qoldiqni so‘rab qayta yozadi | tayyor qoralama, qoldiq va uning eksport vaqti |
| Sotuv menejeri | prays-listni varaqlaydi, ROP va logistikaga yozadi | narx, chegirma chegarasi, muddat bir joyda |
| ROP | sotuvchilarning savollariga javob beradi | savollar kamayadi; tanlab ko‘rib chiqadi |
| Egasi | ziddiyatlarni hal qiladi | ochiq savollar ro‘yxati |

### 4. Nima kiradi (v1)
1. Narx: kod yoki nom va dona bo‘yicha chakana yoki ulgurji narx, jami, formula (prays-list 1-4).
2. Chegirma: so‘ralgan foiz kim tomonidan berilishi mumkin: sotuvchi, ROP yozma ruxsati bilan yoki taqiqlangan (prays-list 5.1-5.3). Vosita ruxsat bermaydi.
3. Yetkazish muddati: to‘lov tushgan kundan 7 ish kuni, MDF/shpon 12 ish kuni (shartnoma 3.1).
4. Yetkazish narxi: shahar ichida 10 mln va undan yuqori bepul, kam bo‘lsa 350 000 so‘m; viloyat har km 8 000 so‘m; liftsiz 3-qavatdan yuqori 1% (shartnoma 3.2).
5. Kafolat: korpus 24 oy, kreslo mexanizmi va gazlift 12 oy, istisnolar (shartnoma 4.1-4.3).
6. Qoldiq: 1C eksportidan, eksport vaqti bilan.
7. Iqtibos savollari: 3D shart (prays-list 5.5), to‘lov shartlari va bo‘lib to‘lash (prays-list 5.4, shartnoma 2.2), qaytarish (shartnoma 5) - hisobsiz, band matni bilan.
8. Yo‘naltirish: javob yo‘q bo‘lsa mas’ul va uning Telegrami.
9. Taqiqlangan gaplar filtri va prays-list muddati ogohlantirishi.
10. Jurnal: kit5 raqamlari uchun.

### 5. Nima kirmaydi
Mijozga avtomatik yozish; lid malakalash va AmoCRM; KP tayyorlash; chegirmaga ruxsat berish; to‘lov tushganini tekshirish (Didox, 1C buxgalteriya); yetkazish sanasini brigada bilan kelishish; ovozli qo‘ng‘iroq; 10% dan yuqori chegirmani taklif qilish (istisno faqat egasi imzosi bilan 150 mln+ tender, prays-list 5.3 - vosita faqat yo‘naltiradi).

### 6. Ma’lumot manbalari
| Manba | Nima beradi | Holati | Egasi |
| hujjatlar/01 Prays-list | narx, chegirma, to‘lov, 3D | rasmiy, 2026-12-31 gacha | egasi tasdiqlagan; fayl yangilovchi [?] |
| hujjatlar/03 Shartnoma | muddat, yetkazish narxi, kafolat, qaytarish, to‘lov | rasmiy | [?] |
| hujjatlar/04 Reglament 4-bo‘lim va CLAUDE.md jadvali | kim nimaga javob beradi | rasmiy | HR |
| CLAUDE.md «Qoidalar» | mijoz matni, [?] qoidasi | ichki | egasi |
| 1C ombor qoldig‘i eksporti | qoldiq | format, chastota, egasi [?] | logistika yoki IT [?] |
| kit3-agent/instructions.md | agent qoidalari | /kit3 tuzadi | - |
| kit4-people/test-set.md | sinov savollari | /kit4 tuzadi | - |
Manba emas: hujjatlar/02 KP (36 oy, viloyatga bepul, hammaga bepul 3D - xato); intervyudagi og‘zaki va’dalar. Ikkalasi faqat tuzoq va baseline uchun.

### 7. Agent qoidalari (instructions.md ga albatta kirishi kerak)
Faqat rasmiy hujjat va har javobda hujjat + band; topilmasa [?] va mas’ul; har hisob formulasi bilan; «3 kun» yo‘q, muddat to‘lov tushgan kundan; chegirma 5/10/taqiq, ruxsat bermaydi; kafolat 24/12, 36 emas; mijoz matni qoidalari; qoldiqda eksport vaqti; prays-list muddati o‘tsa ogohlantirish; mijozga o‘zi yubormaydi.

### 8. Muvaffaqiyat o‘lchovi
| Ko‘rsatkich | Hozir | Maqsad | Qanday o‘lchanadi |
| Bo‘lim vaqti | 16,2 soat/hafta (kit2) | [?] | kit5 baseline.md va numbers.md |
| Bitta javob vaqti | 4-6 daqiqa (kit1, o‘z bahosi) | [?] | jurnal: kiritishdan «tasdiqlandi» gacha |
| Qoldiq kutish | 20-30 daqiqa (kit1) | [?] | jurnal |
| Taqiqlangan va’dalar | bor, soni [?] | taklif 0 [?] | sinov to‘plami + ROP tanlama |
| Hisob aniqligi | [?] | taklif 100% [?] | sinov yurgizgichi |
| ROPga savollar | 48/hafta = 8 × 6 | [?] | ROP hisobi [?] |
| Foydalanish ulushi | 0 | [?] | jurnal savollari / 25 × 6 = 150 savol/hafta |
| Tahrir ulushi | yo‘q | [?] | jurnal: qoralama o‘zgartirilganmi |

### 9. Xavflar
1. Ziddiyatlar yozma hal qilinmagan (3/7 kun, 12-15/10%) → pilotdan oldin egasi qarori.
2. 1C qoldig‘i eskiradi → eksport vaqtini ko‘rsatish, eskirsa logistikaga yo‘naltirish.
3. Odat: sotuvchilar ROPga yozishda davom etadi → ROP savolga vosita javobi bilan qaytaradi [?] taklif; vosita odatdagi kanalda [?].
4. KPdagi xatolar mijozda turibdi → KP manba emas; shablonda to‘g‘ri javob + marketingga xabar.
5. Prays-list 2026-12-31 da tugaydi, pilot dekabrga tushadi → muddat ogohlantirishi, 2027 fayli.
6. Agent raqam to‘qiydi → raqamlar faqat kalkulyatordan; sinov to‘plami.
7. Xodim qoralamani tekshirmay yuboradi → manba va formula ko‘rinadi; ROP tanlama.
8. Ma’lumot sizib chiqishi → kirish ro‘yxati, `.env`, jurnalda minimal ma’lumot.
9. Prays-listdagi noaniqliklar (5+ dona, paket chegirmasi, hujjat shkafi) → [?] bilan javob, ochiq savol.
10. Baseline o‘z bahosi → kit5 da o‘lchash.

### 10. Keyingi To‘plamlar bilan bog‘liqlik
/kit3: form-a-steps.md, form-b-agent.md, instructions.md (7-bo‘lim qoidalari kiradi). /kit4: test-set.md (16-savoldagi tuzoqlar kiradi). /kit5: baseline.md, plan.md, numbers.md (8-bo‘lim ko‘rsatkichlari).

### 11. Ochiq savollar
| # | Savol | Kimdan | Nimani to‘sadi |
| OS-01 | 1C qoldig‘ini kim, kuniga necha marta, qaysi formatda eksport qiladi | logistika / IT | V-08, pilot |
| OS-02 | 3/7 kun va 12-15/10% bo‘yicha egasining yozma qarori | egasi | pilot |
| OS-03 | Ulgurji 5+ dona: kod bo‘yicha mi, buyurtma bo‘yicha mi | egasi / ROP | V-05 |
| OS-04 | Chegirma paketga va EX seriyasiga qo‘llanadimi; 20/50 mln chegarasi chegirmagacha bo‘lgan summami | ROP | V-06 |
| OS-05 | Yetkazishdagi «ish kuni» ga shanba kiradimi; bayramlar | logistika / buxgalter | V-07 |
| OS-06 | Liftsiz 1%: 3-qavatdan yuqori har qavatgami | logistika | V-07 |
| OS-07 | Hujjat shkafi narxi, «Biznes 20» tarkibi | egasi | V-02 |
| OS-08 | WS-101: 18 mm mi, 25 mm mi | ishlab chiqarish | V-02 |
| OS-09 | Qoldiq yo‘q bo‘lsa ham muddat 7 ish kunimi | logistika | V-07, V-08 |
| OS-10 | Interfeys: ichki Telegram bot yoki web; kirish ro‘yxati | egasi / IT | V-13 |
| OS-11 | Muvaffaqiyat maqsad raqamlari va qabul mezoni | ROP | 8-bo‘lim, V-15 |
| OS-12 | Nechta operator va sotuvchi | HR | 8-bo‘lim |
| OS-13 | O‘rtacha soatbay haq (40 000 [?]) | buxgalter | 1-bo‘lim |
| OS-14 | 2027 prays-listi qachon, kim fayl beradi | egasi | V-02, pilot |
| OS-15 | Jurnal maydonlari va saqlash muddati | egasi / IT | V-14 |
| OS-16 | KP xatolari qachon tuziladi; mijoz eski KPni ko‘rsatsa nima deymiz | marketing / ROP | V-10 |
| OS-17 | Pilot muddati, qatnashchilar, sinov to‘plami qachon (kit4, kit5) | ROP | V-15 |
| OS-18 | ROP qoralamalarni qanchalik tez-tez tanlab ko‘radi | ROP | 8-bo‘lim |

### Ilova A. Mutaxassislar savol-javoblari
1-qismdagi 6 xabar (ismlar bilan).

---

## 3-qism. tasks.md mazmuni (15 vazifa)

Har vazifada: Maqsad, Kirish, Chiqish, «Tayyor, agar», Bog‘liq, To‘suvchi savol. Kod namunasi yo‘q.
Yadro kanalga bog‘liq emas: interfeys savoli (OS-10) faqat V-13 ni to‘sadi.

| # | Vazifa | Chiqish | Tayyor, agar | Bog‘liq | To‘sadi |
|---|---|---|---|---|---|
| V-01 | `app/` tuzilmasi, `.env` namunasi, manbalar ro‘yxati (KP manba emasligi yozilgan) | papkalar, README | README da har manba va holati bor; `.env` gitignore’da | - | - |
| V-02 | Prays-listni tuzilgan jadvalga ko‘chirish | katalog fayli | har qator hujjat bilan mos, har qatorda bo‘lim raqami, amal qilish sanasi saqlangan, yo‘q narx [?] | V-01 | OS-07, OS-08, OS-14 |
| V-03 | Qoidalar jadvali: chegirma, muddat, yetkazish narxi, kafolat, to‘lov, 3D, qaytarish | qoidalar fayli | har qoida hujjat bandi bilan; KPdan hech narsa yo‘q | V-01 | - |
| V-04 | Sinov yurgizgichi: test-set.md ni o‘qiydi; u yo‘q bo‘lsa PRDdagi tuzoqlar vaqtincha | yurgizgich va hisobot | har savolga «o‘tdi / o‘tmadi» chiqadi | V-02, V-03 | OS-17 (qisman) |
| V-05 | Narx kalkulyatori | kod + dona → narx, jami, formula | 4/5 dona chegarasi sinovdan o‘tadi | V-02, V-04 | OS-03 |
| V-06 | Chegirma tekshiruvchi | summa, to‘lov turi, foiz → kim bera oladi + mas’ul | 20/50 mln va 100% oldindan to‘lov chegaralari o‘tadi; ruxsat bermaydi | V-03, V-04 | OS-04 |
| V-07 | Yetkazish muddati va narxi | material, km, summa, qavat → muddat va narx, formula | 7/12 ish kuni, 10 mln, km hisobi o‘tadi | V-03, V-04 | OS-05, OS-06, OS-09 |
| V-08 | Qoldiq o‘quvchi (1C eksport) | kod → qoldiq + eksport vaqti; eskirsa ogohlantirish | namunaviy fayl bilan ishlaydi; eski fayl ogohlantiradi | V-01 | OS-01 |
| V-09 | Yo‘naltirish jadvali va «bilmayman» javobi | savol turi → mas’ul + Telegram | jadval CLAUDE.md bilan bir xil | V-01 | - |
| V-10 | Javob shabloni: mijozga qoralama + ichki izoh | shablonlar | «Hurmatli [Ism] aka / opa», «Siz», manba, formula bor | V-05..V-09 | OS-16 |
| V-11 | Taqiqlangan gaplar filtri va prays-list muddati ogohlantirishi | filtr | tuzoq iboralar ushlanadi; 2026-12-31 dan keyin ogohlantiradi | V-10 | - |
| V-12 | Agent qatlami: savol turi, kalkulyatorni chaqirish, instructions.md ni o‘qish | savol → tayyor javob | raqam faqat kalkulyatordan; tuzoqlar o‘tadi | V-05..V-11; /kit3 | - |
| V-13 | Interfeys (tavsiya [?]: ichki Telegram bot) | kanal, kirish ro‘yxati, «nusxa / tasdiq / tuzatdim» tugmalari | ro‘yxatda yo‘q odam kira olmaydi; token faqat `.env` da | V-12 | OS-10 |
| V-14 | Jurnal va haftalik eksport | jurnal, haftalik jadval | kit5 numbers.md uchun raqamlar chiqadi; minimal ma’lumot | V-13 | OS-15 |
| V-15 | Yakuniy tekshiruv va pilotga tayyorlash | sinov hisoboti, 1 sahifa qo‘llanma | to‘liq sinov to‘plami o‘tadi; ROP ko‘rib chiqdi | hammasi; /kit4, /kit5 | OS-02, OS-11, OS-17 |

tasks.md da har vazifa alohida bo‘limda, kichik dasturchi uchun oddiy so‘z bilan va «nimani qilmaslik» bandi bilan yoziladi.

---

## Tekshiruv (fayllar yozilgandan keyin)

1. Har raqam yonida fayl va bo‘lim, hisoblarda formula bor: `grep` bilan raqamlarni ko‘zdan kechirish.
2. 1-qismdagi har [?] 11-bo‘lim «Ochiq savollar»da bor: ikki ro‘yxatni solishtirish.
3. Uzun tire (em dash) yo‘q: grep bo‘sh chiqishi kerak.
4. Har jumla alohida qatorda (global qoida).
5. Kod va kod namunasi yo‘q.
6. KP hech joyda manba sifatida ishlatilmagan.
7. Plan faylida ismlar yo‘q; ismlar faqat prd.md va tasks.md da.
