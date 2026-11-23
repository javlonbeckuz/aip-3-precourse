# 1-dars: so‘zlash matni (v2)

Praktikum 3.0, 1-dars, yakshanba 22-noyabr 2026, 10:00-13:30 (210 daqiqa).
Slayd raqamlari `deck/index.html` dagi haqiqiy raqamlarga to‘liq mos (43 ta slayd).
Vaqtlar dars boshidan hisoblanadi: 0:00 = 10:00 (2:50 gacha bo‘lgan hamma bloklar shanba va yakshanba guruhlari uchun bir xil).
Qo‘shimcha 30 daqiqa dars oxiridagi o‘rnatish blokiga qo‘shilgan (2:50-3:28), agar uni boshiga ko‘chirsangiz, barcha vaqtlar 30 daqiqaga suriladi.

## O‘qish va repetitsiya uchun qisqa yo‘riqnoma

- Oddiy qatorlar: zalga aytiladigan jonli gap, har bir jumla alohida qatorda.
- `[Kvadrat qavsdagi qatorlar]`: ekranda nima ochasiz, mentor nima qiladi, zal bilan nima bo‘ladi (aytilmaydi).
- `[Agar ...]` qatorlari: jonli namoyish boshqacha chiqsa yoki internet pand bersa, o‘sha zahoti nima deysiz.
- Asosiy vaqt nazorat nuqtalari: 0:15 birinchi qurilish boshlanadi, 0:45 noutbuklar yarim yopiladi, 1:00 qat’iy model qismiga o‘tiladi, 1:35 tanaffus, 1:45 Gemini Notebook, 2:10 To‘plam 1, 2:45 uy vazifasi, 2:50 o‘rnatish va tekshiruv, 3:28 yakun.
- Bu fayl `_build/build_talk.py` orqali slaydlar ostidagi eslatma oynasiga (`P` tugmasi) tushadi: tahrir qilsangiz, skriptni qayta ishga tushiring.

## 1 · 0:00 · Kirish

[Eshik 0:00 da yopiladi, slayd ekranda turadi.]
[Mentorlar stollarda o‘tirib, 1.1-1.5 kodlarini tekshiryapti.]

Assalomu alaykum, do‘stlar, xush kelibsizlar!
Boshlashdan oldin bitta kichkina iltimos: telefonlarni ovozsiz rejimga qo‘yib olaylik, shunda chalg‘imasdan ishlaymiz.

Bugungi darsdan sizlarga bitta aniq va’da beraman.
Hozirdan roppa-rosa 45 daqiqa o‘tib, mana shu zalda o‘tirgan har biringiz o‘z biznesingiz uchun ishlaydigan bitta tayyor vosita qurib olgan bo‘lasiz.
Slayd tomosha qilib, quruq nazariya eshitib emas - o‘z noutbukingizda, o‘zingizning haqiqiy mahsulotlaringiz va narxlaringiz bilan.

[O‘zingiz haqingizda 30 soniya, erkin: ERP joriy qilganingiz, har xil bizneslarning jarayonini ichidan ko‘rganingiz, 2022-yildan beri AI bilan ishlayotganingiz, bu uchinchi Praktikum ekani.]

Bitta narsani boshidan kelishib olaylik.
Men sizlardan dasturchi tayyorlamoqchi emasman.
Maqsadimiz - biznes egasi sifatida AI’ni o‘z kompaniyangizdagi real jarayonlarga qanday qo‘yishni o‘rganish va qo‘lingiz bilan qilib ketish.
Olti hafta davomida aynan shu ish bilan shug‘ullanamiz.

Yana bir muhim gap: bu kurs aslida AI haqida emas, sizning biznesingiz haqida.
AI bu yerda shunchaki bir qurol, xuddi Excel yoki 1C kabi.
Bozorda qurolni nazariy bilgan odam emas, o‘sha qurol bilan real ishini bitirib, foyda chiqargan odam yutadi.

Dars davomida biror savol tug‘ilsa yoki men ishlatgan termin tushunarsiz tuyulsa, sira uyalmasdan qo‘l ko‘taring.
To‘xtab, darrov soddaroq qilib tushuntirib beraman.
Bu yerda ahmoqona savol degan narsa yo‘q - yoningizdagi odam hamma narsani biladi deb o‘ylamang, ko‘pincha u ham xuddi shu savolni berishga iymanib o‘tirgan bo‘ladi.

## 2 · 0:02 · Unumdorlik oshdi. Foyda esa kam.

[Ikki katta raqam ekranda 3-4 soniya jim tursin, odamlar o‘qib olsin.]

Mana, ekrandagi shu ikkita raqamga yaxshilab qaranglar.

McKinsey 2026-yil yozida dunyoning 97 ta davlatida 1 719 nafar rahbar o‘rtasida so‘rov o‘tkazdi.
Bu global so‘rov, qatnashganlarning katta qismi yirik kompaniyalar rahbarlari.
Ularning 80 foizi: «Ha, AI mening shaxsiy unumdorligimni oshirdi», deb javob bergan.
Xat tezroq yozilyapti, hisobot tezroq chiqyapti, matn tayyorlash osonlashgan.

Endi yonidagi ikkinchi raqamga qarang.
O‘sha so‘rovda qatnashganlarning faqat 37 foizi kompaniya foydasida qandaydir ta’sir sezganini aytgan.
E’tibor bering: katta foyda emas, shunchaki foydada qandaydir ijobiy ta’sir bor deganlar xolos.

Keling, buni hozir o‘zimizning zalda ham tekshirib ko‘ramiz.
Orangizda ChatGPT, Claude yoki Gemini’ni deyarli har kuni ishlatadiganlar, qo‘lingizni bir ko‘taring-chi?

[Kuting, zalning katta qismi qo‘l ko‘taradi.]

Zo‘r, deyarli hammamiz ishlatar ekanmiz.
Endi ikkinchi savol: mana shu ishlatgan AI hisobiga biznesingiz foydasi aynan qanchaga oshganini aniq raqamda ayta oladiganlar qo‘l ko‘taring.

[Kuting, odatda juda kam qo‘l ko‘tariladi.]

Mana, boyagi global statistika o‘zimizning zalda ham xuddi shunday chiqdi.

Xo‘sh, aslida nima bo‘lyapti?
Hamma tezroq ishlayotgandek tuyulyapti, lekin oy oxirida kassaga qarasangiz, hech narsa o‘zgarmagan.

Oddiy hayotiy misol keltiraman.
Aytaylik, sotuv menejeringiz avval bitta tijorat taklifini bir soatda yozib chiqardi.
Endi AI bilan 15 daqiqada tayyorlab tashlayapti.
O‘rtada 45 daqiqa vaqt tejaldi.
Savol: o‘sha 45 daqiqa qayerga ketdi?
Ko‘proq mijozga qo‘ng‘iroq qildimi, yangi kelishuv yopdimi?
Yoki choy ichib, Telegram titib o‘tirdimi?
Buni siz ham bilmaysiz, ko‘pincha xodimning o‘zi ham sezmay qoladi.

Sababi juda oddiy.
Ko‘p kompaniyalarda AI alohida odamning qo‘liga berib qo‘yildi, lekin biznes jarayonining o‘ziga kiritilmadi.
Odam sal tezlashdi, lekin jarayon eski holicha qoldi - tejalgan vaqt qayerga yo‘naltirilishini hech kim belgilamadi va o‘lchamadi.

Bizning bu dasturimiz aynan o‘sha ikkinchi raqam, ya’ni foyda qatori haqida.
Olti hafta ichida bitta aniq jarayonni tanlab olamiz, uni o‘lchaymiz va natijani his-tuyg‘u bilan emas, qog‘ozdagi aniq raqam bilan ko‘ramiz.

## 3 · 0:06 · Olti dars

Olti hafta davomida oltita dars o‘tamiz, har hafta bittadan.
Bitta muhim printsipimiz bor: har bir darsdan keyin qo‘lingizda quruq konspekt emas, real ishlaydigan narsa qolishi kerak.

Birinchi dars, ya’ni bugun: AI o‘zi qanday ishlaydi, ma’lumotingiz qayerga ketadi va bu sizga qanchaga tushadi - shularni tagiga yetib olamiz.
Ikkinchi darsda kompaniyangizdagi qaysi ishni AI’ga topshirish mumkin, qaysinisini bermaslik kerakligini ajratib, birinchi jarayonni tanlaymiz.
Uchinchi darsda shaxsiy AI assistentingizni yig‘amiz - u Telegram, jadval va CRM bilan ulanib ishlaydi.
To‘rtinchi darsda o‘sha tizimni serverga chiqaramiz: kompyuteringiz o‘chiq bo‘lsa ham, telefoningizdan boshqarib turasiz.
Beshinchi darsda uni xodimingizga topshirib ishlatamiz va real hayotda chiqqan xatolarini birga tuzatamiz.
Oltinchi darsda esa oldin qancha edi, keyin qancha bo‘ldi degan aniq raqamlarni solishtiramiz va keyingi jarayonga reja tuzamiz.

Boshidan bitta narsani ochiq aytib qo‘yay.
Darsimiz haftasiga uch soat, lekin asosiy natija zalda emas, o‘zingizning kompaniyangizda bo‘ladi.
Darslar orasida haftasiga taxminan 3-4 soat vaqt ajratib, o‘z jarayoningiz ustida ishlashingizga to‘g‘ri keladi.

Yana bir jihatga e’tibor bering: bu ro‘yxatda «chiroyli prompt yozishni o‘rganamiz» degan alohida dars yo‘q.
Prompt yozishni siz jarayon ichida o‘z-o‘zidan o‘rganib ketasiz.
Oltinchi darsda sahnaga chiqqaningizda chiroyli slayd emas, real raqam ko‘rsatasiz: oldin qancha vaqt yoki pul ketardi, hozir qanchaga tushdi.

## 4 · 0:08 · Kafolat: uchta shart

[Sotuv sahifasidagi kafolat shartlarini o‘zgartirmasdan, yumshatmasdan aniq ayting.]

Kafolat masalasiga ham bir daqiqa to‘xtalib o‘taylik, hamma narsa boshidan ochiq bo‘lsin.

Kafolatimiz sotuv sahifasida qanday yozilgan bo‘lsa, xuddi shunday kuchda qoladi.
Agar siz barcha darslarga qatnashsangiz, har bir topshiriqni vaqtida bajarsangiz va aytilgan hamma narsani qilsangiz, shunda ham biznesingizda va o‘zingizda AI bo‘yicha o‘zgarish bo‘lmasa, to‘lagan pulingizni to‘liq qaytarib beramiz.

E’tibor bering, uchta shartning uchtasi ham to‘liq sizning qo‘lingizda.

Shuning uchun uy vazifasi bizda ixtiyoriy emas, majburiy topshiriq hisoblanadi.
Mentor har dars boshida hamma vazifalarni birma-bir ko‘rib, jadvalga belgilab qo‘yadi.
Buni sizni maktab o‘quvchisidek tekshirish uchun qilmayapmiz - shunchaki tajribamizdan bilamiz, uy vazifasini qilmagan odamda real natija chiqmaydi.

## 5 · 0:09 · Mentor va kompaniya papkasi

[Mentorlardan o‘rinlaridan turishni so‘rang va har birini stoli bilan tanishtiring.]

Endi jamoamiz bilan tanishib olaylik - mentorlarimiz, iltimos, bir turinglar, hamma ko‘rib olsin.

Ko‘rib turganingizdek, har bir stolga bittadan mentor biriktirilgan, ya’ni besh kishiga bitta mentor.
Olti hafta davomida aynan shu inson sizning stolingiz bilan birga ishlaydi.
Faqat darsda emas, hafta davomida stolingizning Telegram guruhida ham savollaringizga javob berib, qotib qolgan joyingizda yordam berib turadi.

Rahmat, yigitlar, o‘tiraveringlar.

[Slaydning o‘ng tomonidagi papka daraxtini ko‘rsating.]

Endi ekranning o‘ng tomoniga qaranglar.
Mana shu narsa «kompaniya papkasi» deb ataladi.
Olti hafta davomida biznesingiz bo‘yicha qiladigan hamma ishlaringiz tartib bilan aynan shu papkaning ichiga yig‘ilib boradi.
Bugun va shu hafta qiladigan xodimlar bilan suhbatlaringiz mana bu birinchi bo‘limga tushadi.
Kelasi hafta esa Claude Code aynan shu papkani ochib, kompaniyangizni ichidan o‘qib oladi.

Agar hozir bu nomlar sal g‘alati yoki tushunarsiz ko‘rinayotgan bo‘lsa, sira xavotir olmang.
Hammasini birdan to‘ldirmaymiz, har hafta bittadan bo‘limi o‘z-o‘zidan to‘lib boradi.

## 6 · 0:11 · Bugungi reja

Mana bugungi rejamiz qanday ketadi.

Hozir kirishni tugatamiz va 15-daqiqadan boshlab darrov birinchi qurilishga o‘tamiz - hamma o‘z noutbukida ishlaydi.
Undan keyin AI aslida qayerda yashaydi va modelning ichida nima sodir bo‘ladi, shuni jonli ko‘rib chiqamiz.
Keyin 10 daqiqa tanaffus qilamiz.
Tanaffusdan so‘ng Gemini Notebook bilan ishlaymiz: AI faqat siz bergan hujjatlardan qanday javob berishini amalda sinaysiz.
Keyin bugunning eng muhim qismi - To‘plam 1: kompaniyangizda ish va vaqt aslida qayerga ketyapti, shuni o‘lchashni o‘rganamiz.
Oxirida esa uy vazifasini tushuntirib olamiz va noutbuklaringizga kerakli dasturlarni bitta qoldirmay o‘rnatib, tekshirib chiqamiz.

[Qo‘l ko‘tarish bilan tekshiruv qiling.]

Boshlashdan oldin bitta tezkor tekshiruv qilib olaylik.
Kimda hozir claude.ai sayti ochiq va akkauntga kirib turibdi, qo‘l ko‘taring-chi?
Noutbukingiz zaryadkaga ulanganmi?

[Mentorlar stol bo‘yicha sanaydi va kirmaganlarni 1.1 kodi bilan belgilaydi.]

Qo‘l ko‘tarmaganlar sira hijolat bo‘lmang, hozir stolingizdagi mentorga ayting, birga kirib olasizlar.

## 7 · 0:13 · Qotib qoldingizmi?

Olti hafta davomida amal qiladigan bitta oltin qoidamiz bor.

Biror joyda qotib qoldingizmi yoki ekranda xato chiqdimi?
Darrov mentorga yugurmaysiz.
Birinchi ekranni skrinshot qilasiz, ikkinchi o‘sha skrinshotni Claude’ga tashlab «bu nima, nima qilay?» deb so‘raysiz, shundan keyin ham chiqmasa - mana o‘shanda mentor.

Nega bunday?
Chunki olti haftadan keyin yoningizda mentor bo‘lmaydi, Claude esa har doim qo‘lingizda bo‘ladi.
Shuning uchun mentorlar ham birinchi bo‘lib: «Skrinshot qilib Claude’dan so‘radingizmi?» deb so‘rashadi, xafa bo‘lmaysizlar.

## 8 · 0:15 · Birinchi qurilish (bo‘lim)

[Mentorlar prompt varag‘ini tarqatadi.]
[Bu slaydda 10 soniyadan ko‘p turmang, darrov namunaga o‘ting.]

Xo‘sh, kirish gaplari yetarli bo‘ldi.
Noutbuklarni ochinglar, ishga kirishamiz.
Oldimizda 30 daqiqa bor va shu vaqt ichida o‘z biznesingiz uchun real ishlaydigan bitta vosita yasab olasiz.

## 9 · 0:15 · Mana shuni yasaysiz

[Brauzerga o‘ting va `first-build/examples/namuna-kalkulyator.html` sahifasini oching.]
[Miqdorni jonli o‘zgartiring, chegirma qatorini va pastdagi tayyor Telegram matnini ko‘rsating.]
[Ko‘pi bilan 2 daqiqa.]

Qaranglar, hozir taxminan mana shunaqa narsa yasaysizlar.
Bu biz dars uchun o‘ylab topgan Baraka Office degan ofis mebeli kompaniyasining narx kalkulyatori - haqiqiy kompaniya emas, namuna.

Mana, mahsulot sonini o‘zgartirib ko‘rsataman.
Ko‘rdingizmi, jami summa o‘z-o‘zidan qayta hisoblandi.
Belgilangan miqdordan oshishi bilan chegirma qoidasi ham avtomatik ishladi.
Pastga qarasangiz, mijozga Telegram orqali tashlab yuborish uchun tayyor matn chiqib turibdi - nusxa olib jo‘natasiz, tamom.

Claude’da mana shunaqa chat ichida darrov ishlaydigan sahifa yasab berish imkoniyati «artefakt» deyiladi.
Buning uchun sizga na dasturchi kerak, na alohida hosting, na bitta satr kod bilish.

20 daqiqadan keyin har biringizning ekraningizda xuddi shunaqa tayyor vosita turadi - faqat o‘z biznesingizning haqiqiy mahsulotlari va narxlari bilan.
Agar sohangizda narx kalkulyatori unchalik to‘g‘ri kelmasa, xuddi shu usulda bir sahifalik chiroyli tijorat taklifi yasasangiz ham bo‘ladi.

## 10 · 0:18 · Besh qadam

[Qo‘lingizdagi prompt varag‘ini ko‘rsating: 8 ta biznes turi va orqasida bo‘sh shablon bor.]

Demak, beshta oddiy qadam bilan ketamiz.

Birinchisi: claude.ai ni oching.
Ikkinchisi: hozir qo‘lingizga tarqatilgan varaqdan o‘z biznes turingizni toping.
Savdo, qurilish, klinika, o‘quv markaz, restoran, logistika, ishlab chiqarish, xizmat ko‘rsatish - hammasi bor, sizniki ro‘yxatda bo‘lmasa, orqa tomonda bo‘sh shablon turibdi.
Qo‘lda terib o‘tirishingiz shart emas, shu varaqning elektron nusxasi stolingiz chatiga tashlangan, shunday ko‘chirib olasiz.
Uchinchisi: o‘zingizning 3-5 ta mahsulotingiz yoki xizmatingiz nomi va narxini kiriting.
To‘rtinchisi: Claude’ga yuboring va chiqqan kalkulyatorni o‘zingiz bosib sinab ko‘ring.
Beshinchisi: birinchi natijada to‘xtab qolmang, chatda yozib kamida bitta narsasini o‘zgartiring.

Agar kimdadir o‘ng tomonda tayyor sahifa chiqmasdan, faqat kod yozib tashlasa, sira vahima qilmang.
Sozlamalarga kirasiz, Capabilities bo‘limidan «Code execution and file creation» degan tugmani yoqib qo‘yasiz, bo‘ldi.
Topishga qiynalsangiz, stolingizdagi mentor darrov ko‘rsatib beradi.

## 11 · 0:20-0:33 · Prompt shu ko‘rinishda

[Bu slayd 13 daqiqa davomida ekranda turadi.]
[Zalni aylaning, odamlar nima yozayotganini ko‘rib yuring.]

Mana, prompt taxminan shu ko‘rinishda bo‘ladi.
Qavs ichidagi rangli joylarni o‘zingizning ma’lumotlaringizga almashtirib chiqasiz, xolos.

Faqat boshidan bitta qat’iy qoida qo‘yib olaylik.
Promptga faqat mahsulot nomi va narxini yozing.
Mijozning ismi, telefon raqami, pasport ma’lumoti, hisob raqami - bularning bittasini ham chatga tashlamang.
Nega bunday deyayotganimni 15 daqiqadan keyin aniq dalili bilan ko‘rsataman.

Bo‘ldi, boshladik!
Oldingizda 13 daqiqa vaqt bor.

[Kimdir nimadan boshlashni bilmay qotib qolsa, yoningizga borib ayting:]
Claude’ga shunday yozing: «Men mana shu sohada ishlayman, avval menga 3 ta savol ber, keyin kalkulyator qurib ber.»

[0:28 da zalga ovoz chiqarib eslating:]
Do‘stlar, 5 daqiqa vaqt qoldi, birinchi versiyani chiqarib olinglar, keyin uni birga yaxshilaymiz.

[Agar zalda claude.ai umuman ishlamay qolsa: zal bilan bitta biznes turini tanlab, o‘z ekraningizda birga quring va shaxsiy qurilishni uy vazifasiga o‘tkazing.]

## 12 · 0:33-0:45 · Uch marta takrorlang

[0:33 da hammaning e’tiborini o‘zingizga qarating.]

Xo‘sh, bir daqiqa to‘xtab, menga qaranglar-chi.
Kimning ekranida kalkulyator yoki taklif ishlab ketdi, qo‘l ko‘taring!
Barakalla, qarang, qancha odamda chiqdi.

Endi AI bilan ishlashdagi eng muhim odatlardan birini aytaman.
AI bergan birinchi javob - bu har doim xom qoralama.
Ko‘pchilik qayerda xato qiladi?
Bitta prompt yozadi, chiqqan narsa ko‘nglidagidek bo‘lmaydi-da, «e, bu AI o‘yinchoq ekan» deb oynani yopib qo‘yadi.
Aslida esa haqiqiy sifat ikkinchi va uchinchi o‘zgartirishda chiqadi.

Shuning uchun hozir xuddi shu chat ichida vositangizni kamida uch marta yaxshilang.
Nima deb yozishni o‘ylab o‘tirmasangiz, ekranda uchta tayyor g‘oya turibdi: 10 donadan ko‘p olsa ulgurji narx qo‘sh, dollar kursi kiritiladigan maydon qo‘sh, yoki dizaynni mening kompaniyam ranglariga mosla.
Yoki o‘zingizning biznesingizga kerakli istalgan shartni oddiy o‘zbek tilida yozavering.

Natijaga bahoni faqat uchinchi raunddan keyin berasiz.
Bunga sakkiz daqiqa vaqt, ketdik!

[0:41 da har stoldan bittadan nomzod so‘rang, ikkitasini tanlab, katta ekranda 1 daqiqadan ko‘rsating.]

Xo‘sh, vaqt bo‘ldi, ikkita ko‘ngilli chiqsin.
Qisqacha ko‘rsatinglar: nima yasadingiz va ikkinchi-uchinchi o‘zgartirishda nimani qo‘shdirdingiz?

[0:44 da ko‘prik gap bilan keyingi blokka o‘ting.]

Ajoyib, rahmat!
Endi bitta narsaga e’tibor beringlar.
Hozir siz bir satr ham dastur kodi yozmadingiz - o‘zingizga nima kerakligini oddiy tilda tushuntirib berdingiz, xolos.
Claude esa o‘sha gaplaringizdan kelib chiqib, keyingi so‘zni, aniqrog‘i keyingi kod bo‘lagini taxmin qilib yozib chiqdi.

Ana endi biznes egasi sifatida o‘zingizga bitta jiddiy savol bering.
Hozir siz o‘z mahsulotlaringiz va narxlaringizni yozib Enter bosganingizda, o‘sha xabar aslida qayerga ketdi?

## 13 · 0:45 · AI qayerda yashaydi (bo‘lim)

[Bu blok 1:00 da qat’iy tugashi kerak.]
[Agar chip, ASML yoki eksport taqiqlari haqida chuqur savol tushsa, bir gap bilan javob bering va qolganini tanaffusga qoldiring.]

Noutbuklarning qopqog‘ini yarim yopib qo‘yinglar, ko‘zimiz ekranda bo‘lsin.
Hozir 15 daqiqa diqqat bilan tinglab olamiz.

Ikkitagina muhim savolga javob topamiz: birinchisi - siz yozgan ma’lumot qayerga borib tushyapti, ikkinchisi - nega AI narxlari va shartlari har oy o‘zgarib turibdi?

## 14 · 0:45 · AI uch qavatli

[Slaydni pastdan tepaga qarab tushuntiring: 1-qavat, 2-qavat, 3-qavat.]

Bugun hamma «sun’iy intellekt» deb gapiradi, yangiliklarda ham har kuni o‘qiysiz.
Lekin gap aynan nima haqida ketayotganini chalkashtirmaslik uchun AI’ni uch qavatli bino deb tasavvur qiling.

Eng pastki birinchi qavat, ya’ni poydevor - bu infratuzilma.
Buning ichida chiplar, ulkan elektr stansiyalari va data markazlar turadi.
Biznes egasi uchun bu qavatda bitta savol muhim: nega AI narxlari o‘ynab turibdi va ertaga qaysidir xizmatga kirish o‘zgarib qolmaydimi?

Ikkinchi qavat - modellar.
Bu sizga javob yozib beradigan asosiy «miya»: Claude, GPT, Gemini, DeepSeek, Qwen.
Bu qavatda siz beradigan savol oddiy: menga qaysi model mos keladi va u qanchaga tushadi?

Uchinchi, eng tepa qavat esa platformalar, ya’ni biz har kuni ochib ishlatadigan ilovalar va saytlar.
Bu yerda savol: kundalik ishim uchun qaysi ilova qulay?

Oson esda qolishi uchun bitta o‘xshatish: model - bu mashinaning dvigateli, ilova esa mashinaning o‘zi.
Bitta dvigatel har xil mashinada turishi mumkin.

Nega buni ajrata bilishingiz kerak?
Chunki ba’zan siz boshqa ilovaga o‘tasiz, lekin ichida xuddi o‘sha model ishlayotgan bo‘ladi.
Yoki aksincha: siz har kuni ochadigan ilova o‘zgarmagan, lekin egasi kechasi ichidagi modelni yangisiga almashtirib qo‘ygan - qarabsizki, kecha zo‘r ishlagan prompt bugun boshqacha javob beryapti.

Yangilik o‘qiganda ham shu uch qavatni darrov ko‘z oldingizga keltiring.
«Nvidia aksiyasi tushdi» deyaptimi - bu birinchi qavat.
«Yangi model chiqdi» - ikkinchi qavat.
«Ilovaga yangi tugma qo‘shildi» - uchinchi qavat.
Shuni ajrata olsangiz, shov-shuvli sarlavhalarga aldanmaysiz.

## 15 · 0:49 · Chip zanjiri

[3 daqiqa, texnik tafsilotlarga cho‘zilib ketmang.]

Birinchi qavatdagi zanjirni bitta qatorda tushuntiraman.

AQShdagi Nvidia chipni loyihalaydi, Tayvandagi TSMC zavodi esa uni ishlab chiqaradi.
Keyin o‘n minglab GPU katta elektr bilan data markazlarga teriladi, laboratoriyalar u yerda modelni oylab o‘qitadi, oxirida ilova uni sizga so‘z bo‘yicha sotadi.
Bitta kuchli modelni o‘qitishga shuncha chip va oylab vaqt ketadi - kuchli modellar nega pullik ekanining sababi aynan shunda.

Biznes egasi uchun bu yerdan ikkita xulosa chiqadi.
Birinchisi: chiplar arzonlashgani sari AI narxi tushyapti va tushishda davom etadi.
Ikkinchisi: siyosat o‘zgarsa, kirish shartlari bir kunda o‘zgarishi mumkin - qaysidir xizmat O‘zbekiston kartasini olmaydi, qaysidir platforma ma’lum davlatlarda yopiladi, sizdan hech kim so‘ramaydi.

Shuning uchun biznesingizni hech qachon bitta ilovaga qulflab qo‘ymang.
Olti hafta davomida biz yig‘adigan tizimda modelni almashtirish atigi bitta qatorni o‘zgartirish bo‘ladi - kerak payti o‘n daqiqada boshqasiga o‘tib ketasiz.

## 16 · 0:52 · Xabaringiz qayerga boradi?

[`demos/data-trip/index.html` sahifasini oching va A, keyin B, keyin C variantlarini birma-bir ko‘rsating.]
[Keyin yakun uchun shu slaydga qayting.]

Endi boyagi savolimizga qaytamiz: siz hozir kalkulyator yasash uchun yozgan xabaringiz qayerga borib keldi?

A varianti - oddiy bulutli xizmatlar: Claude, ChatGPT, Gemini.
Siz Enter bosganingizda xabar noutbukingizdan chiqadi, internet orqali AQSh yoki Yevropadagi data markazga boradi, u yerdagi GPU javobni yozib sizga qaytaradi.
Ya’ni u ma’lumot Toshkentda qolmaydi.

Endi B variantiga qarang - men buni ko‘p tadbirkorlar tushib qoladigan tuzoq deyman.
Sizga biror IT-kompaniya yoki pudratchi kelib: «Xavotir olmang, bizning serverimiz Toshkentda, hamma ma’lumotingiz O‘zbekistonda qoladi», deydi.
Chiroyli eshitiladi, to‘g‘rimi?
Lekin bitta nozik joyi bor: agar o‘sha Toshkentdagi server sizning savolingizni olib, javob olish uchun chet eldagi API’ga, ya’ni OpenAI yoki Claude’ga yuborayotgan bo‘lsa, ma’lumotingiz baribir chet elga chiqib ketdi!
Serverning qayerda turgani hech narsani hal qilmaydi - modelning o‘zi qayerda ishlayotgani hal qiladi.

Shuning uchun ertaga sizga kimdir AI yechim taklif qilsa, ko‘ziga qarab bitta savol bering: «Ichida qaysi model ishlaydi va o‘sha model qayerdagi serverda turadi?»
Agar chaynalib, aniq javob bera olmasa, o‘sha sukutning o‘zi sizga yetarli javob bo‘ladi.

C varianti esa - o‘z serveringiz va uning ichiga o‘rnatilgan ochiq vaznli, ya’ni open-weight model.
Mana shunda ma’lumotingiz tashqariga chiqmaydi, butunlay kompaniyangiz ichida qoladi.
Ochiq vaznli model nima ekanini hozir 20 daqiqadan keyin batafsil ko‘rib chiqamiz.

Ana endi tushundingizmi, boya birinchi qurilishda nega mijozning ismi va telefonini yozmang deb qat’iy aytdim?

## 17 · 0:57 · Qonun nima deydi

[2 daqiqa tushuntirish, keyin 1 daqiqa savol-javob.]

O‘zbekiston qonunchiligi bu borada nima deydi, qisqacha ko‘rib o‘taylik.
Avvaldan aytaman: bu yuridik maslahat emas, kompaniyangiz bunga tayanishidan oldin albatta yuristingiz tasdiqlashi kerak.

2026-yilda shaxsiy ma’lumotlar bo‘yicha qoidalar yangilandi.

Birinchisi, ruxsat: oddiy shaxsiy ma’lumotlarni tasdiqlangan 49 ta davlat va hududga chiqarish mumkin, masalan Germaniya shartsiz ro‘yxatda.
Ikkinchisi, shart bilan: AQShga faqat DPF sertifikatiga ega kompaniyalarga ruxsat berilgan.
Google bu sertifikat borligini aytadi, Claude’ning maxfiylik siyosatida esa DPF haqida gap yo‘q - shuning uchun Claude’ga mijoz shaxsiy ma’lumotini kiritmaymiz.
Uchinchisi, faqat O‘zbekistonda qolishi shart bo‘lgan ma’lumotlar: biometrik, genetik va aloqa abonentlari ma’lumotlari.
To‘rtinchisi, jarima: AI bilan shaxsiy ma’lumotlarga noqonuniy ishlov berish 22 milliondan 44 million so‘mgacha jarimaga tortiladi.

Yana bir qoida bugun kerak bo‘ladi: xodim ma’lumotini uchinchi tomonga, jumladan AI’ga ham, faqat uning yozma roziligi bilan berasiz - To‘plam 1 dagi rozilik matni aynan shuni hal qiladi.

Amalda uchtagina savol kifoya: chatga tashlashdan oldin o‘zingizdan so‘rang - bu kerakmi, ismsiz bo‘ladimi, odam rozimi?

## 18 · 1:00 · Model qanday ishlaydi (bo‘lim)

[Keyingi tabda `demos/pick-a-number/index.html` ochiq tursin, R tugmasi bilan nolga tushirib qo‘ying.]

Bo‘ldi, birinchi qavat va ma’lumot masalasini tushunib oldik, endi ikkinchi qavatga - modelning ichiga kiramiz.
Xo‘sh, bu «miya» aslida qanday fikrlaydi?

Buni nazariya qilib tushuntirib o‘tirmayman, hozir o‘zingiz o‘z ko‘zingiz bilan ko‘rasiz.

## 19 · 1:00 · 7 testi

Hamma telefonini yoki noutbukini olsin.
Qo‘lingizda qaysi AI bo‘lsa o‘shani oching - Claude, ChatGPT, Gemini, farqi yo‘q.
Va unga shunday deb yozing: «1 dan 10 gacha bitta son ayt. Faqat son.»

Chiqib kelgan sonni darrov stolingizdagi mentorga ayting.
Bunga bir daqiqa vaqt.

[`demos/pick-a-number/index.html` sahifasiga o‘ting.]
[Mentorlar stol bo‘yicha natijani ovoz chiqarib aytadi, siz klaviaturada 1-9 va 10 uchun 0 tugmalarini bosib kiritasiz.]

Birinchi stol, sizlarda nimalar chiqdi?
Ikkinchi stol?
Uchinchi stol?

[Hamma stollar kiritilgach, grafikdagi 10 foizlik punktir chiziqni ko‘rsating.]

Mana, ekranga qaranglar!
Agar AI xuddi kubik tashlagandek rostdan tasodifiy son tanlaganida, 1 dan 10 gacha har bir son taxminan bir xil, ya’ni mana bu 10 foizlik chiziq atrofida chiqishi kerak edi.

[Agar 7 ko‘pchilikda chiqqan bo‘lsa:]
Qarang, deyarli hammada 7 chiqyapti!
Nega?
Chunki model siz o‘ylagandek tasodifiy tanlamaydi.
Insonlardan 1 dan 10 gacha bitta son ayt desangiz, statistika bo‘yicha ko‘pchilik 7 deydi - model esa milliardlab inson yozgan matnlarni o‘qigan va eng ko‘p uchraydigan javobni taxmin qilib chiqarib beryapti.

[Agar 7 yetakchi chiqmagan bo‘lsa, ekranda ko‘rinib turganini ochiq ayting:]
Mana qaranglar, bugun 7 emas, boshqa son ko‘p chiqdi, lekin baribir natijalar hamma sonlarga teng tarqalmadi - bir-ikkita songa uyulib qoldi.
Haqiqiy tasodif bo‘lganda bunaqa uyulish bo‘lmasdi.
Asosiy gap aynan 7 sonida emas, modelning tasodifiy emas, ehtimollik bo‘yicha javob berishida.

## 20 · 1:04 · Model keyingi so‘zni taxmin qiladi

Katta til modeli, ya’ni LLM’ning butun siri mana shu bitta slaydda.

Tasavvur qiling, men sizlarga «Osh bilan birga...» deb to‘xtab qolsam, xayolingizga birinchi qaysi so‘z keladi?

[Zaldan bir-ikki javob eshiting.]

Choy, achichuk, salat, non - to‘g‘rimi?
Hech kimning xayoliga «osh bilan birga traktor» degan gap kelmadi.

Telefoningizda Telegram yozayotganingizda klaviatura tepasida keyingi so‘zni o‘zi taklif qilib turadi-ku, bilasiz.
Hozirgi kuchli AI modellari xuddi o‘sha narsaning aql bovar qilmas darajada katta va juda ko‘p matn o‘qib chiqqan varianti.

Model internetdagi ulkan matnlarni o‘qib, qaysi so‘zdan keyin qaysi so‘z kelish ehtimoli yuqoriligini o‘rgangan.
Siz savol berganingizda u eng ehtimolli bitta so‘zni yozadi, keyin uning ketidan yana eng mos keladiganini qo‘shadi va shu zaylda butun javobni terib chiqadi.
Ekrandagi foizlarni shunchaki tushunarli bo‘lishi uchun qo‘yganmiz, bu o‘lchangan ilmiy raqam emas.

Bundan biznes egasi uchun o‘ta muhim xulosa chiqadi.
Model aslida kalkulyatordek hisoblamaydi, u siz-u mendek nimanidir ongli ravishda «bilmaydi» - u eng to‘g‘ri ko‘ringan davomni taxmin qiladi.
Ko‘pincha bu taxmin hayratlanarli darajada to‘g‘ri chiqadi, lekin ba’zan xuddi shunday to‘liq ishonch bilan xato ham qilib yuboradi.
Buning maxsus nomi bor, 25 daqiqadan keyin uni amalda ushlab ko‘ramiz.

## 21 · 1:06 · Token: bir gap, uch til

Endi hamma tadbirkorni qiziqtiradigan joyi - pul masalasiga keldik.

Model siz yozgan matnni butun so‘z sifatida o‘qimaydi.
U har bir gapni mayda bo‘laklarga ajratib oladi - ana shu bitta bo‘lak «token» deyiladi.
Va siz API yoki katta tizimlarda aynan mana shu tokenga pul to‘laysiz.

[`demos/tokenizer/index.html` sahifasini oching.]
[Bitta gapni o‘zbek, rus va ingliz tilida ko‘rsating, keyin tepadan boshqa tokenizatorga almashtiring.]

Mana, bitta ma’nodagi gap uch xil tilda turibdi.
Qaranglar: inglizchasida nechta token chiqdi?
Ruschasi qancha?
Endi o‘zbekchasiga qarang!

[Raqamlarni aynan ekrandagi sahifadan o‘qing, bitta qat’iy koeffitsient aytmang.]

Ko‘ryapsizmi, bir xil gap o‘zbek tilida ancha ko‘proq bo‘lakka bo‘linib ketyapti.
Aniq necha barobar ko‘p?
Buni bitta raqam bilan aytib bo‘lmaydi, chunki har bir model turlicha bo‘ladi - mana, boshqa tokenizatorga o‘tkazdim, raqam darrov o‘zgardi.
Shuning uchun taxmin qilmaymiz, har safar o‘lchab ko‘ramiz.

Nega o‘zbekchada token ko‘p chiqadi?
Sababi oddiy: modellar ko‘proq ingliz tilidagi matnlarda o‘qitilgan.
Inglizcha so‘z ko‘pincha bitta bo‘lakka sig‘adi, bizning o‘zbek tilimizda esa qo‘shimchalar ulanib uzun bo‘lib ketadi - masalan, «mijozlarimizdan» degan bitta so‘zning o‘zi bir nechta tokenga bo‘linib ketishi mumkin.

[3 daqiqalik qisqa mashq, oflayn fayl stol chatida bor.]

Keling, uch daqiqa o‘zingiz ham sinab ko‘ring.
O‘z biznesingizdan bitta oddiy gapni avval o‘zbekcha, keyin inglizcha yozib ko‘ring - necha token farq chiqyapti?
Link ochilmasa, oflayn fayli stolingiz chatida va mentordagi fleshkada bor.

[Agar kimdir «Unda inglizcha yozishimiz kerakmi?» deb so‘rasa: «Yo‘q, oddiy chatda bu farq tiyinlar, o‘zingizga qulay tilda yozavering. Bu keyinchalik, botingiz kuniga minglab mijozga javob beradigan darajaga chiqqanda byudjetga ta’sir qiladi.»]

## 22 · 1:11 · Nima uchun to‘laysiz

Xo‘sh, tokenga pul to‘lashimizni tushundik, lekin hamma tokenning narxi bir xil emas.

To‘rt xil token bor, shuni ajratib olishingiz kerak.
Birinchisi - kirish tokeni: siz yozgan prompt, yuklagan fayl va hujjatlar, bunisi odatda eng arzoni.
Ikkinchisi - chiqish tokeni: model sizga yozib bergan javob, bu kirishdan bir necha barobar qimmat turadi.
Uchinchisi - fikrlash tokeni: ba’zan Claude yoki boshqa modellar javob yozishdan oldin «o‘ylayotgan» jarayonini ko‘rasiz-ku - o‘sha o‘ylagan hamma ichki matni ham token hisoblanadi va eng qimmat chiqish narxida ketadi.
To‘rtinchisi - keshlangan token: model avval o‘qigan matnini qayta o‘qiganda keshdan oladi, bu esa ancha arzon tushadi.

Misol uchun, siz 50 betlik shartnomani yukladingiz - bu kirish.
Model javob berishdan oldin o‘zicha tahlil qilib, o‘ylab oldi - bu fikrlash.
Keyin sizga bir bet xulosa chiqarib berdi - bu chiqish.
Aniq narxlar necha dollar turishini hozir bir necha daqiqadan keyin tarqatiladigan varaqda ko‘rasiz.

Bu yerdan chiqadigan eng amaliy xulosa mana bu.
Agar siz bitta chatda uzoq gaplashaversangiz, yuzinchi xabaringizni yuborganingizda model avvalgi to‘qson to‘qqizta xabarni ham boshidan qayta o‘qib chiqadi.
Shuning uchun bitta chatni cho‘zib yuborish ham cho‘ntakka zarar, ham boshqa bir katta muammoga olib keladi - javobning sifati tushib ketadi.

## 23 · 1:13 · Kontekst oynasi: dastarxon

[Agar repetitsiyada uzoq chatda qoidani unutgan skrinshot olgan bo‘lsangiz, shu yerda ko‘rsating.]
[Bo‘lmasa, flipchartga dastarxon chizib ko‘rsating: bir chetidan likopcha qo‘shiladi, narigi chetidan tushib ketadi.]

Mana o‘sha sifat tushishining sababi - «kontekst oynasi» degan tushuncha.
Oddiy qilib aytganda, bu model bitta suhbat ichida miyasida ushlab tura oladigan ma’lumot hajmi.

Men buni o‘zimizning tilda «dastarxon» deb tushuntiraman.

Tasavvur qiling, oldingizda bitta dastarxon yozilgan.
Har safar yangi savol berganingizda, hujjat yuklaganingizda, model javob qaytarganda o‘sha dastarxonga bittadan yangi likopcha qo‘yilaveradi: qoidalar, narxlar, savollar, javoblar.
Dastarxon to‘lib bo‘lgach yana yangi likopcha qo‘ysangiz nima bo‘ladi?
Narigi chetida turgan eski likopchalar sirg‘alib tushib ketadi!

Endi qarang, birinchi bo‘lib nima tushib ketdi?
Suhbatning boshida siz aytib qo‘ygan eng muhim qoidangiz: «Chegirma 5 foizdan oshmasin», «Mijoz bilan mana bunday ohangda gaplash».
Ikki soat gaplashib, bitta chatda ishlab o‘tirsangiz, birdan model 12 foiz chegirma taklif qilib yuboradi.
U sizni ataylab aldamayapti - u shunchaki dastarxon chetidan tushib qolgan qoidani unutib yubordi.

Yana bir nozik jihati bor: uzoq chat dastarxon butunlay to‘lishidan ancha oldin xiralasha boshlaydi.
Buni qanday sezasiz?
Boshida aytgan shartlaringizni buzishni boshlaydi, bir gapni qayta-qayta takrorlaydi, ism va raqamlarni chalkashtirib yuboradi.
Shunday holatni ko‘rdingizmi, u bilan asabiylashib tortishib o‘tirmang, baribir foydasi yo‘q.

Qoida juda oddiy: yangi vazifa boshladingizmi - yangi chat oching.
Agar eski suhbatdagi gaplar muhim bo‘lsa, «shu paytgacha kelishgan hamma narsamizni qisqa xulosa qilib ber» deng-da, o‘sha xulosani olib yangi chatga o‘tib keting.
Kelasi hafta Claude Code’da buning uchun bitta tugmalik maxsus buyruq ham ko‘ramiz.

## 24 · 1:17 · Model darajalari

[Mentorlar sanasi yozilgan model varag‘ini (`handouts/pdf/bu-hafta-ai-da.pdf`) tarqatadi.]

Endi modellar oilasiga qaraylik - ular xuddi kompaniyangizdagi xodimlarga o‘xshaydi.
Har qanday korxonada stajyor bor, tajribali mutaxassis bor va direktor bor, to‘g‘rimi?
Modellar ham xuddi shunday uch darajaga bo‘linadi.

Birinchisi - arzon va tez modellar, masalan Haiku.
Bular ko‘p, oddiy, bir xil ishlarni tez saralab tashlash uchun ideal.
Ikkinchisi - muvozanatli daraja, masalan Sonnet.
Kundalik ishlarning asosiy qismi: matn yozish, jadval bilan ishlash, tahlil qilish.
Uchinchisi - eng kuchli modellar, masalan Opus yoki Fable.
Bular murakkab reja tuzish, chuqur fikrlash va bitta xato qimmatga tushadigan strategik joylar uchun.

Keling, buni amalda ko‘ramiz: men uchala darajadagi modelga bitta oddiy savol berdim - «20 ta o‘zbek milliy taomini sanab ber».

[Repetitsiyada olingan `1-arzon.png`, `2-muvozanatli.png`, `3-kuchli.png` skrinshotlarini yonma-yon ko‘rsating.]
[Faqat skrinshotda haqiqatan bor narsani ayting.]

Qaranglar-chi, qaysi ro‘yxatda g‘alati xato ko‘ryapsiz?

[Agar arzon model yo‘q taom to‘qib chiqargan bo‘lsa:]
Mana, buni qaranglar!
Bunaqa taom hayotda yo‘q, lekin arzon model xuddi haqiqiy milliy taomdek jiddiy qilib yozib qo‘ygan.

[Agar bu safar uchalasi ham to‘g‘ri chiqqan bo‘lsa:]
Bu safar uchalasi ham to‘g‘ri sanab beribdi, lekin izohlarining aniqligi va sifatidagi farqni ko‘ryapsiz.
Avvalgi oqimimizda esa arzon model bemalol yo‘q taomni to‘qib, ro‘yxatga qo‘shib yuborgan edi.

[Agar na skrinshot, na internet bo‘lsa: namoyishni o‘tkazib yuborib, to‘g‘ridan-to‘g‘ri qoidaga o‘ting.]

Xulosa oddiy: arzon modelni saralashga qo‘ying, kuchli modelni esa reja va murakkab tahlilga saqlang.
Har bitta mayda ishga eng qimmat modelni ishlatavermang - axir ofisda xat tashishga bosh direktorni yubormaysiz-ku.

Yana bitta «effort» degan sozlama bor, eshitib qo‘ying.
Effort - bu model javob berishdan oldin qancha uzoq o‘ylash darajasi.
Ko‘proq o‘ylasa, javob ancha chuqur va aniq chiqadi, lekin sekinroq bo‘ladi va qimmatroqqa tushadi.

Model nomlari va aniq narxlarni slaydda ataylab yozmadik, ular hozir qo‘lingizga berilgan sanali varaqda turibdi.
Chunki bu bozor har oy yangilanadi - keyingi oy narxlar yana boshqacha bo‘ladi.

## 25 · 1:22 · Frontier va ochiq vaznli modellar

[2 daqiqa.]

Modellar yana bir muhim belgisiga ko‘ra ikkiga bo‘linadi: frontier va ochiq vaznli modellar.

Frontier - bu dunyodagi eng ilg‘or, eng kuchli yopiq modellar: Claude, GPT, Gemini.
Ularning ichki fayllarini ko‘ra olmaysiz va o‘zingizga yuklab ololmaysiz - faqat ishlab chiqaruvchining sayti yoki API orqali foydalanasiz.
Qisqasi, model ularning serverida turadi, biz esa u yerda mehmondamiz.

Ikkinchi turi - ochiq vaznli modellar, inglizchasiga «open-weight» deyiladi.
Bularning model fayli internetda ochiq e’lon qilingan: xohlasangiz yuklab olib, o‘zingizning serveringizga o‘rnatib ishlatishingiz mumkin.
Masalan: DeepSeek, Qwen, Kimi, GLM.

Boyagi C variantini esladingizmi?
Ma’lumot kompaniyadan tashqariga chiqmaydigan, o‘z serveringizda ishlaydigan variant aynan mana shu ochiq vaznli modellar yordamida qilinadi.

## 26 · 1:24 · DeepSeek momenti

[1 daqiqa.]

Bu ikki dunyo qattiq to‘qnashgan tarixiy kun bor, ko‘pchiligingiz yangiliklarda ko‘rgan bo‘lsangiz kerak.

2025-yil 27-yanvar kuni Xitoyning DeepSeek modeli chiqdi: ochiq vaznli, ancha arzon va kutilmaganda juda kuchli.
O‘sha bitta kunning o‘zida Nvidia kompaniyasi bozor qiymatidan taxminan 590 milliard dollar yo‘qotdi.
Tasavvur qiling, bir kunda!
Bu AQSh fond bozori tarixidagi eng katta bir kunlik qulash bo‘ldi.

Investorlar nimadan bunchalik cho‘chib ketdi?
«Agar ochiq va arzon model ham shunchalik kuchli ishlay olsa, unda milliardlab dollarga qimmat chiplar sotib olish kimga kerak?» degan savol chiqdi.

Biznes egasi uchun bundan bitta aniq xulosa bor: bugun qo‘lingizda faqat qimmat G‘arb modellari emas, kuchli va arzon ochiq muqobillar ham bor va ular kundan kunga yaxshilanib boryapti.

## 27 · 1:25 · Qachon qaysi biri?

Xo‘sh, amalda qaysi birini tanlaymiz?

Agar vazifangiz hujjat saralash, qoralama yozish, ko‘p takrorlanadigan arzon ish bo‘lsa - yoki ma’lumot qat’iyan kompaniya ichida qolishi shart bo‘lsa, ochiq vaznli model bemalol yetadi.
Agar murakkab tahlil kerak bo‘lsa, chiroyli o‘zbek tili muhim bo‘lsa yoki bitta xato sizga qimmatga tushadigan joy bo‘lsa - frontier model, ya’ni Claude yoki shunga o‘xshash kuchli model kerak.

Faqat shu yerda ko‘pchilik adashadigan bitta nozik nuqta bor, yaxshilab eslab qoling.
«Ochiq vaznli» degani - modelning fayli ochiq, uni o‘z serveringizga qo‘yib ishlata olasiz degani.
Lekin siz shunchaki DeepSeek’ning o‘z saytiga kirib chatda yozsangiz, ma’lumotingiz Xitoydagi serverda saqlanadi, Qwen chatida esa Singapurda.
Ya’ni «ochiq model» degani «sayti maxfiy» degani emas!

[`demos/side-by-side/index.html` sahifasini oching: vazifa, ikki javob va 1 000 ta savol narxini ko‘rsating.]

Mana, bitta oddiy biznes vazifasini ikkala turdagi modelga berib ko‘rdik: mijoz 12 foiz chegirma so‘rayapti, kompaniya qoidasi esa boshqa.

[Agar repetitsiyada haqiqiy model javoblarini joylagan bo‘lsangiz: ikkalasini o‘qib, qaysi biri qoidaga aniq amal qilganini zaldan so‘rang.]
[Agar joylamagan bo‘lsangiz, ochiq ayting: ekrandagi ikki javob tushuntirish uchun qo‘lda yozilgan namuna, jonli model javobi emas.]

Endi pastdagi narxiga qarang: oyiga mingta shunaqa savolga javob berish ikkala modelda ham bor-yo‘g‘i bir necha dollar turadi.
Demak, bu yerda tejamkorlikni bir-ikki dollardan emas, javobning aniqligi va xatosizligidan qidirish kerak.

[Agar soat 1:22 dan 3 daqiqadan ko‘p kechikkan bo‘lsangiz, 3 daqiqalik mashqni uy vazifasiga o‘tkazing va buni zalga ochiq ayting.]

Keling, uch daqiqalik tezkor sinov: bitta oddiy vazifani Claude’da va DeepSeek yoki Qwen chatida bir vaqtda berib solishtiring.
Faqat esingizda bo‘lsin - hech qanday maxfiy matn yoki kompaniya ma’lumoti kiritilmaydi!

## 28 · 1:30 · Gallyutsinatsiya

Boya aytgan edim: model ba’zan hech ikkilanmasdan, yuz foiz ishonch bilan xato qilib yuboradi.
Texnik tilda buning nomi - gallyutsinatsiya.

O‘zingiz o‘ylab ko‘ring: Excel’da biror formula xato ketsa nima bo‘ladi?
Katak qizil bo‘lib yonadi, xatolik belgisi chiqib qoladi.
Aslida xatoni ko‘zingiz bilan ko‘ra olishingiz - juda katta ne’mat!
AI xato qilsa-chi?
Hech qanday qizil chiroq yo‘q - aksincha, sizga shunaqangi chiroyli, savodli, ishonchli ohangda noto‘g‘ri raqam yozib beradiki, o‘qib bemalol ishonib yuborasiz.

Buni quruq gap bilan emas, hozir jonli ko‘rsataman.

[Claude’da yangi chat oching, `demos/formula-check/savdo-oktabr.xlsx` faylini yuklang.]
[Yozing: «Oktabr oyidagi jami savdo qancha?»]
[Chiqib kelgan raqamni ovoz chiqarib o‘qing va flipchartga yozib qo‘ying.]

Mana, Claude bizga aniq bitta summa chiqarib berdi - chiroyli, ishonchli.
Xo‘sh, shu raqamni olib hisobotga qo‘yib yuboraveraymi?

[Yozing: «Qanday hisobladingiz? Formulani va qaysi qatorlarni qo‘shganingizni ko‘rsat.»]
[Javob kaliti: `demos/formula-check/javob-kaliti.md`, haqiqiy oktabr jamisi 14 723 000 so‘m.]

[Agar model tuzoqqa tushgan bo‘lsa:]
Ana, qaranglar nima chiqdi!
Bu faylning ichida uchta summa Telegram’dan ko‘chirilgandek matn ko‘rinishida turibdi, eng oxirgi qatorda esa oktabr emas, noyabr oyining bitta savdosi aralashib qolgan.
Model buni sezmasdan yoki qo‘shib yuborib, bizga hech qanday ogohlantirishsiz chiroyli javob chiqarib berdi - bitta ham qizil katak yo‘q!

[Agar model bu safar to‘g‘ri hisoblagan bo‘lsa:]
Qoyil, bu safar to‘g‘ri topibdi!
Lekin bitta narsaga e’tibor bering: biz bu raqamga qachon haqiqatan ishonch hosil qildik?
«Qanday hisoblading, formulangni va qatorlaringni ko‘rsat» deb so‘raganimizdan keyin!
Asosiy saboq aynan shunda.

[Agar internet ishlamasa: faylni Excel’da ochib `=SUM(E2:E36)` yozing - Excel ham ogohlantirmasdan 16 270 000 so‘m noto‘g‘ri jami chiqaradi.]

Endi bir tasavvur qilib ko‘ring.
Shu tekshirilmagan raqam choraklik hisobotga tushdi va sherigingizga yoki bankka ketdi.
Xatoni AI qildi, lekin tagida kimning imzosi turadi?
Sizning imzongiz!

Shuning uchun temir qoida: AI bergan raqamga tekshirmasdan aslo ishonmang.
Har doim bir og‘iz so‘rang: «Buni qanday hisoblading, formulangni va qaysi qatorlarni olganingni ko‘rsat.»

## 29 · 1:34 · Bugungi 4 odat

[30 soniya, tanaffusdan oldin qisqa va lo‘nda.]

Tanaffusdan oldin bugungi to‘rtta asosiy odatimizni eslab qolaylik.

Ishingni ko‘rsat - har doim formula, hisob yoki manbani so‘rang.
Uch marta - birinchi javob qoralama, uch martada pishiting.
Yangi chat - yangi vazifa uchun yangi chat oching.
Meni intervyu qil - qotib qolsangiz, AI’ga avval savol berdiring.

Bu to‘rttasi olti hafta davomida har kuni qo‘l keladi.

## 30 · 1:35 · Tanaffus

[T tugmasini bosing: 10 daqiqalik taymer ketadi.]

Hozir 10 daqiqa tanaffus qilamiz, ozgina nafas rostlab, choy-kofe ichib olinglar.
Soat 1:45 da, ya’ni roppa-rosa 10 daqiqadan keyin Gemini Notebook bilan davom etamiz, noutbuklarni o‘chirmasdan qoldiringlar.

Birinchi qurilishda kalkulyatori chiqmay qolganlar, tanaffusda stolingizdagi mentor bilan bir daqiqa qolib to‘g‘rilab oling.

[Tanaffusda mentorlar chiqmagan qurilishlarni tuzatadi.]
[Bitta mentor 2:17 dagi To‘plam 1 jonli suhbati uchun ko‘ngillini tanlab tayyorlaydi: haqiqiy ishini aytsin va kamida bitta raqamni «bir uch-to‘rt yuz ming» kabi og‘zaki oraliqda ishlatsin.]

## 31 · 1:45 · Gemini Notebook (bo‘lim)

[Mentorlar mashq varag‘ini (`notebooklm-exercise/mashq.pdf`) tarqatadi.]

Qaytdikmi, do‘stlar?
Tanaffusdan oldin bitta jiddiy muammoni ko‘rdik: model hamma narsani eslab qolmaydi, bilmagan joyini ishonch bilan taxmin qilib yuboradi.

Ana endi tabiiy savol tug‘iladi: AI’ga «chetdan to‘qima, faqat mening kompaniyam hujjatlariga qarab javob ber» deb buyruq berib bo‘ladimi?

Bo‘ladi va buning uchun juda zo‘r tayyor vosita bor - Gemini Notebook.
Ko‘pchiligingiz uni eski nomi bilan, ya’ni NotebookLM deb bilasiz; Google 2026-yil yozida uning nomini Gemini Notebook’ga o‘zgartirdi.

## 32 · 1:45 · Ochiq kitob imtihoni

Bu qanday ishlashini tushunish uchun universitetdagi «ochiq kitob imtihoni»ni tasavvur qiling.

Talaba hamma qoidani yoddan aytib o‘tirmaydi.
Savolni o‘qiydi, oldidagi kitobni ochadi, kerakli joyini topadi va «mana, 42-betda shunday yozilgan» deb javob beradi.

Gemini Notebook ham xuddi shunday ishlaydi.
U javobni faqat siz yuklagan hujjatlar ichidan oladi va har bir gapining yoniga kichkina manba raqamini qo‘yib ketadi.
Texnik tilda bu yondashuv RAG deyiladi - ya’ni model avval sizning bilim bazangizdan qidirib topadi, keyin o‘shanga tayanib javob yozadi.

[Oldindan tayyorlangan Baraka Office daftarini oching.]
[Bitta savol bering, chiqqan javobdagi manba raqamini bosing va chap tomonda hujjatning aynan qaysi qatori belgilanganini ko‘rsating.]

Mana, ko‘ring: bu yerda o‘sha namunaviy Baraka Office kompaniyasining hujjatlari yuklangan.
Savol beraman.
Javob chiqdi, qarang, gapning oxirida raqamcha turibdi.
O‘sha raqamni bosaman - chap tomonda hujjatning aynan qaysi qatoridan olganini sariq qilib ko‘rsatib berdi!

Siz ham har bir javobdagi ana shu raqamni bosib, manbasini ko‘zingiz bilan tekshiring.
Bu boyagi «Ishingni ko‘rsat» odatining o‘zi.

## 33 · 1:48-2:04 · Mashq: 16 daqiqa

Endi navbat sizga, 16 daqiqa amalda ishlaymiz.

Birinchi qadam: brauzerda notebook.google.com saytini ochib, yangi daftar yarating.
Ikkinchi qadam: ichiga 3 tadan 5 tagacha hujjat yuklang.
O‘zingizning kompaniyangiz hujjatlari bo‘lsa yanada zo‘r - masalan, narxlar ro‘yxati, ichki qoidalar, shartnoma shabloni.
Hozir qo‘lingizda o‘zingizniki yo‘q bo‘lsa, stolingiz chatida Baraka Office to‘plami tayyor turibdi, shuni yuklang.
Uchinchi qadam: kamida 3 ta savol bering va har bir javobda manba raqamini bosib tekshirib chiqing.
To‘rtinchi qadam: hozir keyingi slaydda chiqadigan ziddiyat promptini yuborasiz - u qo‘lingizdagi varaqda ham bor.
Beshinchi qadam: oxirida hujjatlaringiz asosida o‘zbekcha test tuzib berishini so‘rang.

Boshlashdan oldin ikkita muhim eslatma.
Birinchisi: Gemini Notebook’da podkast, ya’ni Audio Overview hozircha o‘zbek tilida chiqmaydi, faqat rus yoki ingliz tilida chiqadi.
Shuning uchun o‘zbekcha natija ko‘rmoqchi bo‘lsangiz, test so‘rang - buning ustiga, 40 kishi birdan audio yoqsa navbat cho‘zilib ketadi, test esa darrov tayyor bo‘ladi.
Ikkinchisi: agar hujjatingiz Excel bo‘lsa, uni to‘g‘ridan-to‘g‘ri yuklamang, oldin CSV yoki PDF qilib saqlab keyin tashlang.

Va yana boyagi xavfsizlik qoidasi: mijozlar bazasi, bemor ma’lumotlari, xodimlar maosh vedomosti kabi shaxsiy hujjatlarni yuklamaymiz.
Birinchi sinovni faqat ochiq ichki hujjatlar bilan qilamiz.

Ketdik, boshladik!

[Zalni aylaning.]
[Mentorlar har ishtirokchida javoblar manba raqami bilan chiqayotganini tekshiradi: 1.7 kodi.]

[Agar internet uzilib qolsa: oldindan tayyor daftarni o‘z ekraningizda ko‘rsating va mashqni uy vazifasiga o‘tkazing.]

## 34 · 1:55-2:10 · Ziddiyatlarni toping

[Taxminan 1:55 da keyingi qadamga o‘ting.]

Uchta savol berib, manbalarini tekshirib bo‘lganlar, endi ekrandagi mana shu promptni nusxalab yuboringlar.
Bu prompt yuklangan hamma hujjatlaringizni bir-biriga solishtiradi va qayerda raqam, muddat yoki qoida bir-biriga zid kelayotganini jadval qilib chiqarib beradi.

[2:04 da zalni to‘xtating, ikkita stoldan bittadan topilgan ziddiyatni o‘qitib eshiting.]

Xo‘sh, to‘xtadik, kim qanaqa qiziq ziddiyat topdi?
Ikkita stoldan bittadan eshitaylik-chi.

[Keyin Baraka Office hujjatlariga ataylab joylangan 4 ta ziddiyatni ochib tushuntiring.]

Barakalla!
Aslida Baraka Office hujjatlariga biz ataylab to‘rtta jiddiy ziddiyat qo‘yib qo‘ygan edik.

Birinchisi, yetkazib berish muddati: shartnomada 7 ish kuni deb yozilgan, sotuv boshlig‘i esa intervyuda mijozga 3 kunda olib boramiz deb aytadi.
Ikkinchisi, chegirma chegarasi: kompaniya qoidasida ko‘pi bilan 5 va 10 foiz deyilgan, sotuvchi esa 12-15 foiz chegirma va’da qilib yuribdi.
Uchinchisi, kafolat va yetkazish: ichki hujjatda kafolat 24 va 12 oy, viloyatlarga yetkazish pullik deyilgan, tijorat taklifida esa 36 oy kafolat va bepul yetkazish deb yozib qo‘yilgan.
To‘rtinchisi, maosh va savdo rejasi: bitta hujjatda maosh 5 va 15-sanada, reja 120 million deyilgan, HR hujjatida esa 10-sana va 100 million.

Sinab ko‘rganimizda Gemini Notebook shu to‘rttasining hammasini bitta qoldirmay topdi, ustiga yana biz sezmagan to‘rtta mayda ziddiyatni ham chiqarib berdi - jami sakkizta!

Endi o‘zingizga halol savol bering.
Xuddi shunaqa holat sizning kompaniyangizda ham yo‘qmi?
Shartnomada bir gap yozilgan, sotuvchi telefonda mijozga boshqa narsa va’da qiladi.
Muammo chiqqanda esa mijoz sotuvchining gapini ushlab keladi, sud esa shartnomaga qaraydi.

Odamlar oylab payqamaydigan mana shu ziddiyatlarni AI besh daqiqada stoldan chiqarib beradi.
Uyda albatta o‘zingizning haqiqiy hujjatlaringiz bilan ham bir tekshirib ko‘ring.

## 35 · 2:10 · To‘plam 1 (bo‘lim)

[To‘plam 1 PDF ekranda ochilishga tayyor tursin.]
[Jonli suhbat uchun tanlangan ko‘ngilli oldingi qatorda o‘tiradi.]

Ana endi bugungi darsning eng muhim qismiga yetib keldik.

Shu paytgacha AI’ning o‘zi qanday ishlashini o‘rgandik.
Endi esa ekrandan bosh ko‘tarib, to‘g‘ridan-to‘g‘ri o‘zingizning biznesingizga qaytamiz.

Oldimizda bitta oddiy, lekin hal qiluvchi savol turibdi: kompaniyangizda ish va vaqt aslida qayerga ketyapti?

## 36 · 2:10 · Avval ishni xaritaga tushiramiz

Ko‘pchilik AI joriy qilishni qayerdan boshlaydi?
Darrov «keling, bitta bot qilamiz» deydi, lekin aynan qaysi ishni hal qilishini aniq bilmaydi.

Agentga vazifa berishdan oldin korxonangizda vaqt aslida qayerga ketayotganini bilishimiz shart.
Buni esa siz emas, o‘sha ishni har kuni qilayotgan xodimlaringiz biladi.
Siz «sotuv menejerim kun bo‘yi sotadi» deb o‘ylaysiz, u esa kunining yarmini Excel’dan narx ko‘chirib Telegram’ga yozishga sarflayotgan bo‘ladi.

Faqat bu yerda katta bitta xavf bor.
Rahbar AI kursidan kelib «kun bo‘yi nima qilasan, aytib ber» desa, xodim «meni bo‘shatmoqchi» deb qo‘rqib ketadi.
Qo‘rqqan odam esa rostini aytmaydi, ishini yashiradi.

Shuning uchun birinchi qadam: birinchi suhbatdan oldin jamoani yig‘ib, o‘zingiz ochiq ayting - maqsad odamlarni almashtirish emas, ishni xaritaga tushirish.

[To‘plam 1 oxiridagi «Jamoaga xabar» matnini ekranda 20 soniya ko‘rsating.]

Bu audit yoki tekshiruv emas - biz aybdor emas, qo‘lda qilinadigan takror va zerikarli ishlarni qidiryapmiz.
Odatda xodimning o‘zi ham o‘sha zerikarli yumushdan qutulishni xohlaydi.
Tayyor «Jamoaga xabar» matni To‘plam 1 oxirida bor, yozma majburiyat namunasi ham qo‘yilgan va tavsiya etiladi.

So‘z tanlashga ham ehtiyot bo‘ling: «optimizatsiya» emas, «ishni yengillashtirish» va «tejalgan vaqt» deb gapiramiz.

[Agar zalda kimdir ishdan bo‘shatish haqida hazil qilib yuborsa, jiddiy va xotirjam ayting:]
Hazilligini bilaman, lekin xodimlaringiz buni reja deb eshitadi - keling, raqamlarga qaytaylik.

## 37 · 2:14 · Rozilik: ikki variantli savol

Har bir suhbat rozilikdan boshlanadi - ekranda qisqa varianti, to‘liq rasmiy matni To‘plam 1 ning A shaklida.

[Ekrandagi rozilik matnini bir marta ravon ovoz chiqarib o‘qing.]

Oxirgi qatorga qarang: «Yozib olaymi yoki qo‘lda yozaymi?»
Nega «rozimisiz?» deb so‘ramaymiz?
Chunki rahbarga «yo‘q» deyish noqulay - xodim majburan «ha» deydi-da, butun suhbat davomida yopilib o‘tiradi.
Ikki variant bersangiz, tanlov uning qo‘lida bo‘ladi va o‘zi tanlagan odam ochilib gapiradi.

Hozir juftlikka bo‘lining va bir-biringizga shu matnni bittadan ovoz chiqarib o‘qing - uch daqiqa.

[Mentorlar tinglaydi, kim «Rozimisiz?» deb yuborsa, ikki variantli savolga to‘g‘rilab qo‘yadi.]

## 38 · 2:17-2:29 · Jonli: suhbatdan B shakligacha

Endi bu jarayon boshidan oxirigacha qanday ishlashini sahnada jonli ko‘rsataman.

[Ko‘ngilli zalga qarab o‘tiradi.]
[Rozilik matnini so‘zma-so‘z o‘qing, u «yozib oling» variantini tanlaydi.]
[Telefonda ovoz yozuvini yoqing.]

Hozir besh daqiqa ichida A shaklidagi eng asosiy to‘rtta savolni beraman.

Birinchisi: odatdagi bir ish kuningiz qanday o‘tadi?
Ikkinchisi: hafta davomida eng ko‘p vaqtingizni oladigan uchta vazifa qaysi va har biriga taxminan necha daqiqa ketadi?
Uchinchisi: ishingizda eng ko‘p xatolar qayerda bo‘ladi va ular taxminan qanchaga tushadi?
To‘rtinchisi: agar ertaga sizga bitta yordamchi berishsa, birinchi bo‘lib qaysi vazifani unga topshirardingiz?

[Har bir javobdan keyin bitta aniq hayotiy misol so‘rang: «Oxirgi marta bu qachon bo‘ldi, aytib bering-chi?»]
[Hikoya qanchalik qiziq bo‘lmasin, roppa-rosa 5 daqiqada to‘xtating.]

Katta rahmat, juda zo‘r misollar bo‘ldi!

[2:23 da ovoz faylini noutbukka o‘tkazing.]
[gemini.google.com saytini ochib, audioni To‘plam 1 dagi «Audioni matnga aylantirish uchun so‘rov» bilan yuklang va ekranda ko‘rsatib boring.]

Qaranglar, endi yozib olgan ovozimizni Gemini’ga tashlayman va yoniga To‘plam 1 da berilgan tayyor transkript so‘rovini qo‘yaman.
Mana, bir necha soniyada matn chiqib keldi.

Shu yerda bitta texnik eslatma, uyda juda asqatadi.
Bepul Gemini bitta so‘rovda ko‘pi bilan 10 daqiqalik audioni qabul qiladi.
Uyda xodimingiz bilan suhbatingiz esa 20-30 daqiqa davom etadi.
Shuning uchun diktofonni bitta uzun fayl qilib yozmang - har 8 daqiqada to‘xtatib, yangi yozuv boshlab keting, shunda hammasi bepul Gemini’ga bemalol sig‘adi.

[Chiqib kelgan transkriptni Claude’ga o‘tkazing va To‘plam 1 dagi «AI chat uchun so‘rov» bilan yuboring.]

Endi tayyor matnni Claude’ga beraman va To‘plam 1 dagi maxsus so‘rovni ishga tushiraman.
Qarang, javob ikkita qismdan iborat bo‘lib chiqdi.
Birinchi qismida - suhbatda aytilgan hamma raqamlarning tekshiruv jadvali.
Ikkinchi qismida esa tayyor B shakli: barcha vazifalar ro‘yxati, qancha vaqt olishi va qayta takrorlanish soni bilan.

[Agar ko‘ngilli chiqmasa, ovoz o‘tmasa yoki Gemini sekinlashsa: oldindan tayyorlangan transkriptdan foydalaning va zalga ochiq ayting: «Texnik sababga ko‘ra oldindan tayyorlangan transkript bilan ko‘rsataman.»]

## 39 · 2:26 · Xato raqamni ushlang

[Agar ko‘ngillining jonli transkriptida xato chiqqan raqam bo‘lsa, birinchi o‘shani ko‘rsating.]
[Agar hammasi to‘g‘ri chiqqan bo‘lsa, shu slayddagi real misolga o‘ting.]

Ana endi eng ko‘p xato qilinadigan va eng muhim joyga keldik.

Oldingi darslarimizdan bitta haqiqiy holat.
Xodim suhbatda o‘zbekcha jonli tilda: «bir uch-to‘rt yuz ming bo‘ladi» deb aytdi.
Bizning tilimizda «bir» so‘zi bu yerda «taxminan» degan ma’noni beradi, ya’ni 300-400 ming so‘m haqida gap ketyapti.

Ovozni matnga o‘girgan transkriptda nima chiqib keldi deng?
«1 300 000»!

Qarang: 300 ming qayerda-yu, 1 million 300 ming qayerda - to‘rt barobar farq!
Va yana boyagi holat: hech qanday qizil katak yo‘q, jadval ko‘zingizga top-toza, ishonchli bo‘lib ko‘rinib turadi.

Agar siz shu xato raqamni tekshirmasdan keyingi hafta hisob-kitob qilsangiz, butunlay noto‘g‘ri jarayonni tanlab, behuda vaqt va pul sarflaysiz.

Shuning uchun ikkita qat’iy qoida: birinchidan, transkriptdagi har bir raqamni audio bilan solishtirib chiqasiz.
Ikkinchidan, tayyor bo‘lgan B shaklini albatta o‘sha xodimning o‘ziga ko‘rsatasiz - u daqiqalarni va takrorlanish sonini o‘z qo‘li bilan to‘g‘rilab beradi.

[Ko‘ngilliga Claude javobi oxiridagi ikkita [?] belgili savolni jonli bering va jadvalni ekranda to‘g‘rilab ko‘rsating.]
[Keyin B.9 ustuniga ishora qiling.]

Mana bu eng oxirgi ustun esa xodimniki emas, bevosita sizniki - bu yerda har bir vazifa qarshisiga «agent, robot, inson yoki birga» deb belgilab chiqasiz.
Kelasi hafta ikkinchi darsda aynan mana shu jadvalingizdan birinchi jarayonni tanlab olamiz.

## 40 · 2:29-2:45 · Juftlikda: 14 daqiqa

[Mentorlar juftlik mashqi kartasini (`kit1-live-demo/juftlik-mashqi.pdf`) tarqatadi.]

Endi xuddi shu zanjirni o‘zingiz juftlikda boshidan oxirigacha bosib o‘tasiz.
Oldingizda 14 daqiqa vaqt bor.

Bir: sherigingizga rozilik matnini ovoz chiqarib o‘qing.
Ikki: 5 daqiqa davomida o‘sha to‘rtta savolni berib, telefonga ovozni yozib oling.
Uch: audioni Gemini’ga tashlab matnga aylantiring.
To‘rt: matnni To‘plam 1 so‘rovi bilan Claude’ga yuboring.
Besh: chiqqan jadvaldan kamida bitta raqamni audio bilan solishtirib, qo‘lda to‘g‘rilab qo‘ying.

Iltimos, o‘ylab topilgan narsa emas, o‘zingizning haqiqiy ishingiz haqida gapiring.
Faqat mijoz yoki hamkasblarning haqiqiy ismini aytmang - agar og‘zingizdan chiqib ketsa ham, Claude’ga berishdan oldin matnda «[mijoz]» deb almashtirib qo‘ying.

Qachon mashq bajarildi hisoblanadi?
Qo‘lingizda tayyor B shakli jadvali turibdi va unda kamida bitta raqam qo‘lda tekshirib to‘g‘rilangan.
Vaqt ortib qolsa, rollarni almashtirib ikkinchi sherigingizni ham sinab ko‘rasiz.

Ketdik, boshladik!

[2:36 da zalga e’lon qiling:]
Do‘stlar, vaqtning yarmi o‘tdi - suhbatni tugatib, Gemini’da transkript qilishga o‘tinglar.

[2:43 da qo‘l ko‘tarish bilan tekshiring; mentorlar 1.8 kodini yozib oladi.]

Xo‘sh, to‘xtadik!
Kimda hozir B shakli tayyor bo‘ldi va kamida bitta raqamni qo‘lda to‘g‘rilab ulgurdi, qo‘l ko‘taring-chi?

Ajoyib, ko‘pchilik ulgurdi!
Tugata olmaganlar xavotir olmang, qolgan qismini uyda bemalol yakunlab qo‘yasiz.

## 41 · 2:45 · Uy vazifasi

[Mentorlar uy vazifasi varag‘ini (`handouts/pdf/uy-vazifasi.pdf`) va Baraka Office namunasini (`uy-vazifasi-namuna.pdf`) tarqatadi.]

Endi shu haftalik uy vazifamizni kelishib olaylik.
Aslida bu hozirgina zalda qilgan ishingizning o‘zi, faqat endi haqiqiy kompaniyangiz va haqiqiy xodimlaringiz bilan.

Birinchi qadam: birorta suhbat boshlashdan oldin jamoaga ochiq tushuntiring va bo‘lim chatiga «Jamoaga xabar» matnini tashlang.
Ikkinchi qadam: bitta bo‘limni tanlab, 2-3 nafar xodimingiz bilan 20-30 daqiqadan suhbat o‘tkazing.
Agar hozircha jamoangiz bo‘lmasa yoki o‘zingiz yolg‘iz ishlasangiz, o‘zingizni yoki eng yaqin bo‘lim boshlig‘ingizni suhbatdan o‘tkazasiz.
Uchinchi qadam: audioni Gemini’da matnga aylantiring, mijoz ismlari chiqqan bo‘lsa olib tashlang, keyin To‘plam 1 so‘rovi bilan Claude’ga bering.
To‘rtinchi qadam: chiqqan B shaklini xodimga ko‘rsating, u daqiqalar va sonlarni o‘zi to‘g‘rilasin, siz esa B.9 ustunini to‘ldiring.
Beshinchi qadam: har bir xodimning yakuniy B shaklini .md fayl qilib saqlab qo‘ying - nomi mana bunday bo‘lsin: malika-form-b.md.
Buning uchun Claude’ga «yakuniy B shaklini .md fayl qilib ber» desangiz, tayyor yuklab oladigan fayl qilib beradi.

Ikkita muhim eslatma yodingizdan chiqmasin.
Suhbat yozayotganda har 8 daqiqada diktofonni to‘xtatib, yangi qism boshlang - bepul Gemini 10 daqiqagacha oladi.
Va yozib olgan audiolarni 7 kun ichida albatta o‘chirib tashlang, chunki rozilik matnida xodimga shunday va’da bergansiz.

Bu vazifa haftasiga taxminan 3-4 soat vaqt oladi - oxirgi kunga taqab qo‘ymay, hafta bo‘yi bo‘lib-bo‘lib qiling.

Eslatib qo‘yaman: bu topshiriq kafolat shartiga kiradi, kelasi dars boshida mentor tekshirib belgilab oladi.
Chorshanba kuni esa mentoringiz chatda har biringizdan bitta savol so‘raydi: «Jamoaga aytdingizmi va nechta suhbat qilib ulgurdingiz?»

## 42 · 2:50-3:30 · Dasturlarni o‘rnatish va tekshirish

[Bu blok jami 40 daqiqa: rejadagi 8 daqiqa va yakshanba guruhi uchun qo‘shimcha 30 daqiqa.]
[Asosiy qurol: Claude Desktop ilovasi (Code bo‘limi); kim terminalga o‘rgangan bo‘lsa, Warp/CLI ixtiyoriy qoladi.]
[Mentorlar claude.ai/download orqali o‘rnatishga yordam beradi, akkaunt va Code bo‘limini tekshiradi: 1.3 va 1.9 kodlari.]

Endi zaldan chiqib ketmasdan oldin bitta eng muhim texnik ishni hammaning noutbukida tekshirib olamiz.
Kelasi hafta ikkinchi darsda Claude Code bilan ishlaymiz - agar u noutbukingizda ochilmasa, butun ikkinchi darsni qo‘ldan boy berasiz.
Biznes egalari uchun terminalda qiyinlik tug‘dirmaslik uchun biz asosiy qurol sifatida Claude Desktop ilovasidagi «Code» bo‘limidan foydalanamiz.

Shuning uchun hozir hamma birgalikda sinab ko‘rsin.
Kompyuteringizda Claude Desktop ilovasini oching - agar hali o‘rnatmagan bo‘lsangiz, brauzerda claude.ai/download sahifasidan hozir yuklab oling.
Ichida o‘z pullik akkauntingizga kiring va yuqoridagi «Code» bo‘limini bosing.

Lokal papkani tanlab ishga tushirish oynasi chiqdimi?
Kimda chiqqan bo‘lsa, qo‘l ko‘taring!

[Mentorlar stol bo‘yicha sanab oladi.]

Kimda chiqqan bo‘lsa - tabriklayman, kelasi haftaga to‘liq tayyorsiz!
Hozir stolingiz chatiga bitta qisqa qator yozib qo‘ying: «Bugun nima qurdim va jamoamga qaysi kuni aytaman».
Keyin shoshilmang, yoningizdagi hali o‘rnatolmagan sherigingizga ham ozgina qarashib yuboring.

Kimda ochilmagan bo‘lsa - sira siqilmang, bugungi qo‘shimcha 30 daqiqamizni ataylab aynan shu ishga ajratganmiz.
Hozir mentorlar har bir stolga kelib, bittama-bitta o‘rnatib, tekshirib chiqadi.

[Mentorlar ro‘yxat bo‘yicha Claude Desktop o‘rnatadi va Code bo‘limini tekshiradi.]
[Siz zalni aylaning, eng murakkab holatlarni o‘zingiz oling, ayniqsa Windows noutbuklarda ruxsat va kirish masalalariga e’tibor bering.]

[Har 10 daqiqada zalga ovoz chiqarib tekshiring:]
Do‘stlar, kimda hali ham Claude Desktop’da «Code» bo‘limi ochilmadi, qo‘l ko‘tarib turing, mentorlar boradi.

[3:25 da yakuniy tekshiruv:]
Kimda shu paytgacha ham muammo hal bo‘lmagan bo‘lsa, hozirning o‘zida mentoringiz bilan aniq vaqt belgilab oling.
Chorshanbagacha onlayn ulanib to‘liq sozlab beramiz, ikkinchi darsga hamma tayyor kelishi shart.

## 43 · 3:28 · Keyingi hafta: Claude Code

[Darsni vaqtida yakunlang.]
[Mentorlar 1.10 kodini tasdiqlaydi: jamoaga aytadigan kun, suhbat o‘tkaziladigan xodimlar soni va sanalari.]

Xo‘sh, do‘stlar, bugungi darsni sarhisob qilaylik - qaranglar, uch yarim soat ichida nimalarni uddaladingiz!
O‘z biznesingiz uchun ishlaydigan birinchi vositangizni qurdingiz.
AI aslida qayerda yashashi, ma’lumotingiz qayerga ketishi va model ichida nima sodir bo‘lishini o‘z ko‘zingiz bilan ko‘rdingiz.
Hujjatlar ichidan odam payqamaydigan ziddiyatlarni besh daqiqada topib ko‘rdingiz.
Va qo‘lingizda birinchi B shakli jadvali turibdi.

Kelasi hafta ikkinchi darsda Claude Code siz olib keladigan o‘sha .md fayllarni o‘qiydi va qaysi jarayondan boshlash eng ko‘p foyda berishini birga hisoblab tanlaymiz.

Stol chatiga «bugun nima qurdim va jamoaga qaysi kuni aytaman» degan bir qatorni hali yozmaganlar, chiqishdan oldin albatta yozib qo‘yinglar.

Barchangizga faolligingiz uchun katta rahmat!
Yaxshi dam olinglar, kelasi yakshanba xuddi shu yerda ko‘rishamiz!
