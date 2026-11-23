/* Praktikum 3.0, Day 1 deck content (light design, 2026-11-10).
   do: true = yellow ground, the room works now. note / noteTone = one margin line under the content.
   On-screen text: Uzbek Latin. Notes (do/say): English, with Uzbek lines to say quoted as UZ.
   seg = run-of-show time for this slide (keep in sync with ../../instructor-run-sheet.md).
   Inline markup: **bold**, [[accent]], {{placeholder}}; in steps, "main||small" adds a second line. */
window.SLIDES_DATA = [

/* ===================== 0:00-0:15 WHY WE ARE HERE ===================== */
{
  seg: '0:00', mod: 'Kirish', layout: 'title',
  kicker: 'Praktikum 3.0, birinchi dars. 21 va 22-noyabr 2026',
  big: 'AI qanday ishlaydi va ishingiz qayerga ketadi',
    notes: {
    do: 'Doors close at 0:00. Slide on screen while people sit. Mentors are already at their tables checking codes 1.1-1.5.',
    say: 'UZ: "Xush kelibsiz. Bugun 45-daqiqaga borib har biringiz o‘z biznesingiz uchun ishlaydigan bitta narsa qurgan bo‘lasiz."\nNever say "this part is boring" (2.0 opened with it).'
  }
},
{
  seg: '0:02', mod: 'Kirish', layout: 'bignum',
  title: 'Unumdorlik oshdi. Foyda esa kam.',
  nums: [
    { n: '80%', label: 'AI shaxsiy unumdorligimni oshirdi' },
    { n: '37%', tone: 'acc', label: 'foydada qandaydir ta’sir ko‘rdi' }
  ],
  foot: 'Bu dastur foyda qatori haqida: bitta jarayon, o‘lchangan natija.',
  source: 'McKinsey, The state of AI in 2026 (25.08.2026). So‘rovda 1 719 rahbar, 97 davlat',
  notes: {
    do: 'Let the two numbers sit for a few seconds. Then the foot line.',
    say: 'UZ: "McKinsey 2026-yilda 1 719 rahbardan so‘radi. 80 foizi: AI mening unumdorligimni oshirdi, dedi. Lekin faqat 37 foizi foydada qandaydir ta’sir ko‘rgan. Unumdorlik bor, foyda kam."\nWording: both numbers are shares of respondents (not companies); the 80% is individual productivity. Global survey, 36% of respondents at firms above $1B revenue: say "global", not "Uzbek companies". High performers flat at about 6%. Sources F1-F2 in sources.md.'
  }
},
{
  seg: '0:06', mod: 'Kirish', layout: 'agenda',
  title: 'Olti dars. Har biridan keyin ishlaydigan vosita.',
  items: [
    ['1-dars', 'AI qanday ishlaydi va qanchaga tushadi'],
    ['2-dars', 'AI’ga beriladigan ishlar, birinchi jarayon'],
    ['3-dars', 'Shaxsiy AI assistent: Telegram, jadval, CRM'],
    ['4-dars', 'Kompyuter o‘chiq bo‘lsa ham ishlaydi'],
    ['5-dars', 'Xodimingiz ishlatadi, xatolar tuzatiladi'],
    ['6-dars', 'Oldin va keyin raqamlari, keyingi jarayon']
  ],
  now: 0,
  arts: ['model', 'map', 'chat', 'server', 'wrench', 'bars'],
  notes: {
    do: 'Two minutes on the six lessons (wording taken from the live sales page, ai.birfoizbilim.uz, saved 2026-11-03).',
    say: 'UZ: "Olti dars, har hafta. Har darsdan keyin qo‘lingizda ishlaydigan vosita bo‘ladi. Uchinchi va to‘rtinchi darsda shaxsiy AI assistentingiz telefoningizdan boshqariladigan bo‘ladi."\nDates (Saturday / Sunday group, same content): 21/22 Nov, 28/29 Nov, 5/6 Dec, 12/13 Dec, 19/20 Dec, 26/27 Dec. The page also says: 3-4 hours a week of work between lessons.'
  }
},
{
  seg: '0:08', mod: 'Kirish', layout: 'points',
  title: 'Kafolat: uchta shart',
  points: ['Barcha darslarga qatnashsangiz', 'Har bir topshiriqni vaqtida bajarsangiz', 'Aytilgan hamma narsani qilsangiz'],
  arts: ['calendar', 'clipboard', 'stairs'],
  foot: 'Uy vazifasi ham topshiriq: mentor har dars boshida ko‘radi.',
  notes: {
    do: 'One minute on the guarantee. Do not add promises; read the three conditions as the sales page states them.',
    say: 'UZ: "Kafolatimiz o‘zgarmaydi: barcha darslarga qatnashsangiz, har bir topshiriqni vaqtida bajarsangiz va aytilgan hamma narsani qilsangiz, shunda ham biznesingizda va o‘zingizda AI bo‘yicha o‘zgarish bo‘lmasa, to‘lagan pulingizni to‘liq qaytaramiz. Shuning uchun uy vazifasi ham topshiriq: mentor har dars boshida ko‘radi va belgilaydi."'
  }
},
{
  seg: '0:09', mod: 'Kirish', layout: 'tree',
  title: 'Har stolda mentor. Har kimda kompaniya papkasi.',
  side: [
    { tone: 'acc', art: 'table', body: ['5 kishiga **1 mentor**', 'Har hafta **o‘sha stolda**', 'Hafta davomida **stol chatida** yordam'] }
  ],
  code: 'kompaniya/\n  CLAUDE.md          # kompaniya, qoidalar\n  kit1-interviews/   # suhbatlar, B shakli\n  kit2-scoring/      # baholash, matritsa\n  kit3-agent/        # agent yo‘riqnomasi\n  kit4-people/       # ko‘nikmalar xaritasi\n  kit5-pilot/        # reja, raqamlar\n  app/               # vositaning o‘zi',
  notes: {
    do: 'Ask all 8 mentors to stand and wave; name them by table. Then point at the folder tree.',
    say: 'UZ: "Har stolda mentor bor, olti hafta davomida o‘sha odam. Bugungi suhbatlaringiz keyingi hafta shu papkaga tushadi va Claude Code ularni o‘qiydi."'
  }
},
{
  seg: '0:11', mod: 'Kirish', layout: 'agenda',
  title: 'Bugungi reja',
  items: [
    ['0:15', '**Birinchi qurilish**||o‘z noutbukingizda'],
    ['0:45', 'AI qayerda yashaydi'],
    ['1:00', 'Model qanday ishlaydi'],
    ['1:35', 'Tanaffus', true],
    ['1:45', '**Gemini Notebook:** hujjatlaringizdan javob'],
    ['2:10', '**To‘plam 1:** Ish qayerga ketyapti?'],
    ['2:45', 'Uy vazifasi va Claude Code tekshiruvi']
  ],
  notes: {
    do: 'Read the times quickly. Then: hands up if claude.ai is open and logged in, laptop plugged in. Mentors count and note code 1.1.',
    say: ''
  }
},
{
  seg: '0:13', mod: 'Kirish', layout: 'steps',
  title: 'Qotib qoldingizmi?',
  steps: ['Skrinshot qiling', 'Claude’dan so‘rang', 'Keyin mentor'],
  arts: ['camera', 'chat', 'figures'],
  notes: {
    do: 'Twenty seconds. This is the rule for all six weeks.',
    say: 'UZ: "Qotib qoldingizmi? Avval skrinshot qiling va Claude’dan so‘rang. Keyin mentor."'
  }
},

/* ===================== 0:15-0:45 FIRST BUILD ===================== */
{
  seg: '0:15-0:45', mod: 'Birinchi qurilish', do: true, layout: 'divider',
  time: '0:15-0:45', big: 'Birinchi qurilish',
  sub: 'Noutbuklarni oching. 30 daqiqada o‘z biznesingiz uchun ishlaydigan narsa.',
  notes: { do: 'Mentors hand out the prompt sheet now.', say: 'Keep this to 10 seconds; go straight to the example.' }
},
{
  seg: '0:15', mod: 'Birinchi qurilish', layout: 'image',
  title: 'Mana shuni yasaysiz',
  img: 'assets/img/namuna-kalkulyator.png', alt: 'Baraka Office narx kalkulyatori namunasi',
  lines: ['Narx kalkulyatori yoki bir sahifalik taklif. Sizning mahsulotlaringiz, sizning narxlaringiz.', 'Miqdorni o‘zgartirsangiz, jami o‘zi hisoblanadi. Telegram uchun matn ham tayyor.'],
  notes: {
    do: 'Switch to the browser and open first-build/examples/namuna-kalkulyator.html. Change a quantity live, show the discount line and the Telegram text. 2 minutes max.',
    say: 'UZ: "Bu artefakt deyiladi: Claude chat ichida yasab beradigan kichik ishlaydigan sahifa. 20 daqiqadan keyin sizda ham shunaqasi bo‘ladi, o‘z mahsulotlaringiz bilan."\nThe example was built from the prompt on the sheet (manufacturing/trade row) using the Baraka Office demo price list; it is a namuna, not a real company.'
  }
},
{
  seg: '0:18', mod: 'Birinchi qurilish', do: true, layout: 'steps',
  title: 'Besh qadam',
  steps: [
    'claude.ai ni oching',
    'Varaqdan biznes turingizni toping||prompt matnini nusxalang',
    '3-5 ta mahsulot va narxni yozing',
    'Yuboring va natijani sinab ko‘ring',
    'Chatda bitta narsani o‘zgartiring'
  ],
  note: 'Artefakt chiqmasa: Sozlamalar, Capabilities, «Code execution and file creation» ni yoqing.', noteTone: 'warn',
  notes: {
    do: 'Point at the prompt sheet: 8 business types plus a blank template on the back.',
    say: 'Artifacts need "Code execution and file creation" on in Settings > Capabilities (F16). Link sharing works on Pro and above only, and viewers need a Claude account (F17): sharing is not part of the exercise.'
  }
},
{
  seg: '0:20-0:33', mod: 'Birinchi qurilish', do: true, layout: 'prompt', promptSize: 34,
  title: 'Prompt shu ko‘rinishda',
    prompt: 'Men Toshkentda {{biznes turi}} biznesini yuritaman.\nMijozlarim uchun narx kalkulyatori kerak.\nUni artefakt qilib yasab ber.\n\nMahsulotlar va narxlar (so‘mda):\n- {{mahsulot 1}}: {{narx}}\n- {{mahsulot 2}}: {{narx}}\n- {{mahsulot 3}}: {{narx}}\n\nMijoz miqdorni tanlasin, jami avtomatik chiqsin.\n{{chegirma qoidasi}}\nPastda Telegram uchun tayyor matn bo‘lsin.\nHamma yozuvlar o‘zbek tilida.',
  side: [
    { h: 'Faqat shu', tone: 'ok', body: ['Mahsulot nomi va narxi'] },
    { h: 'Yozmang', tone: 'warn', body: ['Mijoz ismi, telefoni', 'Hisob raqami, pasport'] }
  ],
  notes: {
    do: 'Leave this slide up for the whole 13-minute build. Walk the room. At 0:28 say "5 minutes, then we change one thing".',
    say: 'UZ: "Faqat mahsulot nomi va narxini yozing. Mijozning ismi, telefoni, hisob raqami yo‘q. Nega shunday, 15 daqiqadan keyin ko‘rasiz."\nStuck: "Claude’ga ayting: avval menga 3 ta savol ber, keyin qur." (the interview-me habit).'
  }
},
{
  seg: '0:33-0:45', mod: 'Birinchi qurilish', do: true, layout: 'cards', cols: 2,
  title: 'Uch marta takrorlang',
  cards: [
    { h: 'Tayyor qachon?', tone: 'ok', art: 'calculator', body: ['Kalkulyator **real mahsulotlaringiz** bilan ishlaydi', 'Chat orqali kamida **bitta narsa** o‘zgartirilgan'] },
    { h: '2- va 3-raund uchun', tone: 'acc', art: 'loop', body: ['«Ulgurji narxni qo‘sh: 10 donadan ko‘p bo‘lsa»', '«Dollar kursi uchun maydon qo‘sh»', '«Dizaynni kompaniyam ranglariga moslab ber»'] }
  ],
  foot: 'Birinchi javob qoralama. Baholashni [[uchinchisidan keyin]] qiling.',
  notes: {
    do: '0:33-0:41 iterate. 0:41-0:45 two volunteers on the big screen, one minute each (tables nominate, you pick two).',
    say: 'UZ at 0:44: "Siz kod yozmadingiz. Siz tasvirlab berdingiz. Claude keyingi so‘zni, bu yerda kodni, taxmin qilib yozdi. Endi bu qanday ishlaganini ko‘ramiz: siz yozgan xabar qayerga ketdi?"'
  }
},

/* ===================== 0:45-1:00 WHERE AI LIVES ===================== */
{
  seg: '0:45-1:00', mod: 'AI qayerda yashaydi', layout: 'divider',
  time: '0:45-1:00', big: 'AI qayerda yashaydi',
  sub: 'Siz yozgan xabar qayerga boradi va narxlar nega o‘zgaradi.',
  notes: { do: 'Hard stop for this block at 1:00. If questions about chips or export bans: one sentence, then offer the break.', say: '' }
},
{
  seg: '0:45', mod: 'AI qayerda yashaydi', layout: 'layers',
  title: 'AI uch qavatli',
  layers: [
    { k: '3', art: 'app', t: 'Platformalar', d: 'Siz ishlatadigan ilovalar: ChatGPT, Claude, Gemini', q: 'Qaysi ilova menga kerak?' },
    { k: '2', art: 'model', t: 'Modellar', d: 'Matn yozadigan «miya»: Claude, GPT, Gemini, DeepSeek, Qwen', q: 'Qaysi model, qancha turadi?' },
    { k: '1', art: 'server', t: 'Infratuzilma', d: 'Chiplar, elektr, data markazlar', q: 'Narx va kirish nega o‘zgaradi?' }
  ],
  notes: {
    do: 'Bottom to top. One owner question per layer.',
    say: 'UZ: "AI uch qavatli: pastda chip, elektr va data markazlar; o‘rtada modellar; tepada siz ishlatadigan ilovalar. Model = dvigatel, ilova = mashina."'
  }
},
{
  seg: '0:49', mod: 'AI qayerda yashaydi', layout: 'chain',
  title: 'Chip zanjiri, bir qatorda',
  nodes: [
    { k: 'AQSh', art: 'chip-design', t: 'Nvidia', d: 'chipni loyihalaydi' },
    { k: 'Tayvan', art: 'wafer', t: 'TSMC', d: 'chipni ishlab chiqaradi' },
    { k: 'Data markaz', art: 'server', t: 'GPU', d: 'o‘n minglab chip, katta elektr' },
    { k: 'Laboratoriya', art: 'model', t: 'Model', d: 'oylab o‘qitiladi' },
    { k: 'Siz', art: 'app', t: 'Ilova', d: 'so‘z bo‘yicha to‘laysiz' }
  ],
  foot: 'Chip arzonlashsa, narx tushadi. Siyosat o‘zgarsa, [[kirish]] o‘zgaradi.',
  notes: {
    do: 'Three minutes. This replaces 90 minutes of 2.0 chips and geopolitics.',
    say: 'UZ: "Nvidia chipni loyihalaydi, Tayvandagi TSMC uni ishlab chiqaradi, laboratoriyalar data markazda modelni o‘qitadi, ilovalar sizga sotadi. Bitta kuchli modelni o‘qitish uchun o‘n minglab GPU oylab ishlaydi. Shuning uchun kuchli model so‘z bo‘yicha pullik, va chip arzonlashgani sari narx tushyapti."'
  }
},
{
  seg: '0:52', mod: 'AI qayerda yashaydi', layout: 'routes',
  title: 'Xabaringiz qayerga boradi?',
  routes: [
    { k: 'A · bulut', t: 'Claude, ChatGPT, Gemini', tone: 'warn', hops: ['Noutbuk', 'Internet', '!AQSh / Yevropa', '!GPU'], v: 'Ma’lumot chet elga ketadi' },
    { k: 'B · tuzoq', t: 'Toshkentdagi server + chet el modeli', tone: 'warn', hops: ['Noutbuk', '+Toshkent server', '!Chet el API'], v: 'Baribir chet elga ketadi' },
    { k: 'C · o‘zingizniki', t: 'O‘z serveringiz + ochiq vaznli model', tone: 'ok', hops: ['Noutbuk', '+Sizning server', '+Model ichida'], v: 'Ma’lumot ichkarida qoladi' }
  ],
  notes: {
    do: 'Open demos/data-trip/index.html and play A, then B, then C. Come back to this slide as the summary.',
    say: 'UZ: "Siz Claude’ga yozgan xabar Toshkentda qolmaydi. U AQSh yoki Yevropadagi data markazga boradi, u yerda GPU javob yozadi va qaytaradi. Toshkentdagi server ham chet eldagi modelni chaqirsa, ma’lumot baribir chet elga ketadi. O‘z serveringizda ochiq vaznli model ishlasa, ma’lumot ichkarida qoladi."'
  }
},
{
  seg: '0:57', mod: 'AI qayerda yashaydi', layout: 'cards', cols: 4,
  title: 'Qonun nima deydi (2026)',
  cards: [
    { h: 'Ruxsat', tone: 'ok', art: 'globe', body: ['Oddiy shaxsiy ma’lumot **49 ta** davlat va hududga', 'Germaniya shartsiz'] },
    { h: 'Shart bilan', tone: 'acc', art: 'certificate', body: ['AQSh: faqat **DPF** sertifikati bor kompaniyalar', 'Claude siyosatida DPF yo‘q'] },
    { h: 'Faqat bu yerda', tone: 'warn', art: 'fingerprint', body: ['Biometrik, genetik ma’lumot', 'Aloqa abonentlari'] },
    { h: 'Jarima', tone: 'warn', art: 'gavel', body: ['AI bilan noqonuniy ishlov: **22-44 mln so‘m**'] }
  ],
  foot: 'Chatga yozishdan oldin: [[Kerakmi? Ismsiz bo‘ladimi? Odam rozimi?]]',
  source: 'ZRU-1125, VM qarori 415, MJtK 46-2, Mehnat kodeksi 178 · lex.uz · Yurist tasdiqlashi kerak',
  notes: {
    do: 'Two minutes, then one minute of questions. Say "this is not legal advice".',
    say: 'Facts F3-F6, F26, F27 in sources.md. ZRU-1125 (26.03.2026) narrowed localisation to biometric, genetic and telecom-subscriber data. The 49 states and territories are Cabinet Resolution 415 (29.07.2026): Germany unconditionally, the US only for companies certified under the EU-US Data Privacy Framework; Anthropic\'s privacy policy does not cite the DPF, so never say "the US is on the list for Claude". Admin Code 46-2 part 2: unlawful processing of personal data with AI is fined 50-100 BRV (about 22-44 million so\'m). Labour Code 178: employee data to a third party (an AI service too) only with written consent; Kit 1 handles this. Say "a lawyer must confirm before your company relies on this".\nUZ: "Chatga mijoz ma’lumotini yozishdan oldin uch savol: bu kerakmi? Ismsiz bo‘ladimi? Odam rozimi?"'
  }
},

/* ===================== 1:00-1:35 HOW A MODEL WORKS ===================== */
{
  seg: '1:00-1:35', mod: 'Model qanday ishlaydi', layout: 'divider',
  time: '1:00-1:35', big: 'Model qanday ishlaydi',
  sub: 'Token, kontekst, model tanlash va AI qachon taxmin qilayotganini bilish.',
  notes: { do: 'Open demos/pick-a-number/index.html in the next tab.', say: '' }
},
{
  seg: '1:00', mod: 'Model qanday ishlaydi', do: true, layout: 'live',
  title: '7 testi', art: 'die',
  instr: 'Istalgan AI’dan so‘rang: «1 dan 10 gacha bitta son ayt. Faqat son.»',
  sub: 'Javobni stolingiz mentoriga ayting. Ekranda birga sanaymiz.',
  notes: {
    do: 'Everyone asks on phone or laptop, any AI. Mentors collect their table and call out the counts; you click them into the tally page. Script: demos/scripts/01-pick-a-number.md.',
    say: 'UZ after the tally: "Ko‘pchilik 7 oldi. Agar AI haqiqatan tasodifiy tanlaganda, har bir son taxminan 10 foiz chiqardi. Model tanlamaydi, u eng ko‘p uchraydigan javobni taxmin qiladi."\nIf the room does not land on 7, say so honestly: the point is the pile-up on one or two numbers, not the exact number.'
  }
},
{
  seg: '1:04', mod: 'Model qanday ishlaydi', layout: 'predict',
  title: 'Model keyingi so‘zni taxmin qiladi',
  prompt: '«Osh bilan birga ...»',
  bars: [['choy', 46], ['salat', 27], ['non', 19], ['kompot', 8]],
  barNote: 'Misol: foizlar tushuntirish uchun, o‘lchangan emas',
  side: [
    { h: 'Demak', tone: 'acc', art: 'pilaf', body: ['U **hisoblamaydi** va **bilmaydi**', 'Eng ehtimolli davomni yozadi', 'Shuning uchun ko‘pchilikda 7 chiqdi'] }
  ],
  notes: {
    do: 'Point at the bars: the model writes the likeliest next word, then the next, and so on.',
    say: 'UZ: "Model butun internetdagi matnni o‘qib, qaysi so‘zdan keyin qaysi so‘z kelishini o‘rgangan. U javobni bilmaydi, u davomini taxmin qiladi. Ko‘pincha to‘g‘ri chiqadi, lekin ba’zan ishonch bilan xato qiladi."\nThe percentages are illustrative; the slide says so.'
  }
},
{
  seg: '1:06', mod: 'Model qanday ishlaydi', layout: 'live',
  title: 'Token: bir gap, uch til', art: 'blocks',
  instr: 'Model matnni bo‘laklarga bo‘lib o‘qiydi. Bo‘lak = [[token]]. Pul tokenga to‘lanadi.',
  note: 'Mashq, 3 daqiqa: biznesingizdan bitta gapni o‘zbekcha va inglizcha yozing. Necha token ko‘p?', noteTone: 'acc',
    notes: {
    do: 'Open demos/tokenizer/index.html (works offline). Show the same sentence in UZ, RU, EN, then switch tokenizer. Then exercise 2: everyone tries one business sentence (the offline file is in the Telegram group).',
    say: 'UZ: "Model so‘zni emas, token deb ataladigan bo‘laklarni o‘qiydi. Siz tokenga pul to‘laysiz. O‘zbekcha gap ko‘proq tokenga bo‘linadi. Qanchaga ko‘p: modelga qarab har xil, shuning uchun hozir o‘lchaymiz."\nDo not quote one Uzbek ratio (the REALITY draft said 30%, a 2.0 handout 2.5-3x; measured 2026-11-03: about 1.8x-2.3x English). Read the numbers off the page; it names each tokenizer.'
  }
},
{
  seg: '1:11', mod: 'Model qanday ishlaydi', layout: 'cards', cols: 4,
  title: 'Nima uchun to‘laysiz',
  cards: [
    { h: 'Kirish', art: 'inbox', body: ['Siz yuborgan matn va fayllar'] },
    { h: 'Chiqish', tone: 'acc', art: 'plane', body: ['Model yozgan javob', 'Kirishdan bir necha barobar qimmat'] },
    { h: 'Fikrlash', tone: 'acc', art: 'bulb', body: ['Javobdan oldingi «o‘ylash»', 'Chiqish narxida'] },
    { h: 'Kesh', tone: 'ok', art: 'archive', body: ['Qayta o‘qilgan matn', 'Ancha arzon'] }
  ],
  foot: 'Uzun chatda har safar [[butun suhbat]] qaytadan o‘qiladi.',
  notes: {
    do: 'If time: show a thinking trace in Claude (expand "thinking").',
    say: 'UZ: "Eng qimmati chiqish va fikrlash. Uzun chat qimmatlashadi, chunki model har javobda butun suhbatni qaytadan o‘qiydi."\nExact ratios are on the dated sheet (for example Claude Sonnet 5.5: $2 in / $10 out per million).'
  }
},
{
  seg: '1:13', mod: 'Model qanday ishlaydi', layout: 'dastarxon',
  title: 'Kontekst oynasi: dastarxon',
  capL: 'Suhbat boshi', capR: 'Oyna chegarasi',
  segs: [
    { w: 18, c: '#5e8bff', t: 'qoidalar' }, { w: 22, c: '#7d9fff', t: 'narxlar' }, { w: 20, c: '#9db6ff', t: 'savollar' },
    { w: 22, c: '#bccdff', t: 'javoblar' }, { w: 18, c: '#dbe4ff', t: 'yangi mavzu' }
  ],
  fallenLabel: 'Tushib qolganlar',
  fallen: ['boshidagi qoida', 'chegirma 5%', 'mijoz sharti'],
  side: [
    { h: 'Bilib qo‘ying', body: ['Model bitta suhbatda **qancha narsani** ushlay olishi', 'Uzun chat oyna to‘lishidan **ancha oldin** xiralashadi'] },
    { h: 'Qoida', tone: 'acc', body: ['**Yangi vazifa: yangi chat**'] }
  ],
  notes: {
    do: 'Script: demos/scripts/03-dastarxon.md (show the context meter or a long chat forgetting an early rule).',
    say: 'UZ: "Kontekst oynasi bu dastarxon. Dastarxon to‘lsa, chetidagi narsa tushib ketadi. Uzun chat sekin-asta xiralashadi, oyna to‘lishidan ancha oldin. Yangi vazifa, yangi chat."\nNo dumb-zone percentage (2.0 used both 40% and 60%). Claude Code /compact comes on Day 2.'
  }
},
{
  seg: '1:17', mod: 'Model qanday ishlaydi', layout: 'ladder',
  title: 'Model darajalari',
  rungs: [
    { k: 'Arzon va tez', art: 'bolt', t: 'Saralash', f: 'Haiku', d: 'Ko‘p, oddiy, tez ish' },
    { k: 'Muvozanatli', art: 'scale', t: 'Kundalik ish', f: 'Sonnet', d: 'Matn, jadval, tahlil' },
    { k: 'Kuchli', art: 'knight', t: 'Reja va tahlil', f: 'Opus, Fable', d: 'Murakkab fikrlash, qimmat xato' }
  ],
  foot: 'Effort = model qancha o‘ylashi. Aniq nomlar va narxlar: [[sanasi yozilgan varaqda]].',
  notes: {
    do: 'Ladder demo: "20 ta o‘zbek milliy taomini sanab ber" on the cheap, balanced and strong model; script demos/scripts/02-model-ladder.md. Show rehearsal screenshots if live fails. Mentors hand out the dated sheet (demos/models).',
    say: 'UZ: "Arzon model saralash uchun, kuchli model reja tuzish uchun. Har ishga eng qimmatini qo‘ymang."\nIn 2.0 the cheap model invented "shavlama"; show only what your rehearsal screenshots show.'
  }
},
{
  seg: '1:22', mod: 'Model qanday ishlaydi', layout: 'cards', cols: 2,
  title: 'Frontier va ochiq vaznli modellar',
  cards: [
    { h: 'Frontier', tone: 'acc', art: 'vault', body: ['Eng kuchli modellar', 'Faqat ishlab chiqaruvchining **ilovasi yoki API** orqali', 'Claude, GPT, Gemini'] },
    { h: 'Ochiq vaznli', tone: 'ok', art: 'openbox', body: ['Model **fayli ochiq** e’lon qilingan', 'Uni **o‘z serveringizda** ishlatsa bo‘ladi', 'DeepSeek, Qwen, Kimi, GLM'] }
  ],
  notes: {
    do: 'Two minutes.',
    say: 'UZ: "Frontier: eng kuchli modellar, faqat ishlab chiqaruvchi orqali. Ochiq vaznli: model fayli internetda ochiq, uni o‘z serveringizda ishlata olasiz."'
  }
},
{
  seg: '1:24', mod: 'Model qanday ishlaydi', layout: 'bignum',
  title: 'DeepSeek momenti',
  nums: [
    { n: '~590 mlrd $', small: true, tone: 'warn', art: 'fall', label: '27-yanvar 2025: Nvidia **bir kunda** yo‘qotgan bozor qiymati' }
  ],
  foot: 'Arzon ochiq model kuchli chiqdi, bozor qo‘rqib ketdi.',
  source: 'CNBC, 27.01.2025: «almost $600 billion»; Bloomberg $589B, Reuters $593B',
  notes: {
    do: 'One minute.',
    say: 'UZ: "2025-yil yanvarda Xitoyning DeepSeek modeli chiqdi: ochiq, arzon va yetarlicha kuchli. Bir kunda Nvidia’ning bozor qiymati taxminan 590 milliard dollarga tushdi. Bu AQSh tarixidagi eng katta bir kunlik yo‘qotish."\nSource F9.'
  }
},
{
  seg: '1:25', mod: 'Model qanday ishlaydi', layout: 'cards', cols: 3,
  title: 'Qachon qaysi biri?',
  cards: [
    { h: 'Ochiq vaznli yetarli', tone: 'ok', art: 'openbox', body: ['Saralash, qoralama', 'Arzon, ko‘p takrorlanadigan ish', 'Ma’lumot **ichkarida** qolsin'] },
    { h: 'Frontier kerak', tone: 'acc', art: 'vault', body: ['Murakkab fikrlash', '**O‘zbek tilida** sifat', 'Xato qimmat bo‘lsa'] },
    { h: 'Diqqat', tone: 'warn', art: 'warning', body: ['DeepSeek chati ma’lumotni **Xitoyda** saqlaydi', '«Ochiq» degani maxfiy sayt emas'] }
  ],
  foot: 'Mashq: bitta oddiy vazifa Claude’da va DeepSeek yoki Qwen chatida. [[Maxfiy matn yo‘q.]]',
  notes: {
    do: 'Open demos/side-by-side/index.html: task, two answers from rehearsal, price per million and the cost of 1,000 such tasks. Then exercise 3 (3 minutes). If late at 1:22, move exercise 3 to homework (it is on the sheet as "extra").',
    say: 'UZ: "Ochiq vaznli model degani: model fayli internetda ochiq, uni o‘z serveringizda ishlata olasiz. Lekin DeepSeek saytidagi chatga yozsangiz, ma’lumotingiz Xitoydagi serverga boradi. Ochiq degani sayt maxfiy degani emas."\nDeepSeek: data stored in China (F7). Qwen Chat: Singapore (F8). Open-weight is often good enough for routine sorting; frontier still leads on hard reasoning and Uzbek. No "90% of tasks" claim.'
  }
},
{
  seg: '1:30', mod: 'Model qanday ishlaydi', layout: 'statement', tone: 'bad',
  title: 'Gallyutsinatsiya', art: 'sheet',
  big: 'Excel xatoni qizil qiladi. [[AI hech qachon.]]',
  sub: 'Raqamni tekshirmasdan ishonmang. So‘rang: «Qanday hisoblading? Formulani ko‘rsat.»',
  notes: {
    do: 'Upload demos/formula-check/savdo-oktabr.xlsx to Claude, ask for the October total, then "how did you calculate this? show the formula". Script: demos/scripts/04-formula-check.md; answer key: demos/formula-check/javob-kaliti.md.',
    say: 'UZ: "Excel xato qilsa, katakni qizil qiladi. AI xato qilsa, chiroyli va ishonchli javob beradi. Shuning uchun har doim so‘rang: formulangni ko‘rsat."\nThe 2.0 line "Excel shows a red cell, AI never does" (Day 1, 01:03:00).'
  }
},
{
  seg: '1:34', mod: 'Model qanday ishlaydi', layout: 'cards', cols: 4,
  title: 'Bugungi 4 odat',
  cards: [
    { h: 'Ishingni ko‘rsat', tone: 'acc', art: 'magnifier', body: ['Formula, manba yoki hisobni so‘rang'] },
    { h: 'Uch marta', art: 'loop', body: ['Birinchi javob qoralama'] },
    { h: 'Yangi chat', art: 'chat', body: ['Yangi vazifa: yangi chat'] },
    { h: 'Meni intervyu qil', art: 'microphone', body: ['«Avval menga savollar ber»'] }
  ],
  notes: { do: 'Thirty seconds, then the break.', say: 'UZ: "Bu to‘rtta odat olti hafta davomida har kuni kerak bo‘ladi."' }
},

/* ===================== 1:35-1:45 BREAK ===================== */
{
  seg: '1:35-1:45', mod: 'Tanaffus', layout: 'timer',
  title: 'Tanaffus', minutes: 10,
  sub: '1:45 da Gemini Notebook. Noutbukni yopmang.',
  notes: {
    do: 'Press T to start the 10-minute timer. Mentors fix failed first builds and brief the Kit 1 volunteer (real job, at least one amount said as a spoken range).',
    say: ''
  }
},

/* ===================== 1:45-2:10 GEMINI NOTEBOOK ===================== */
{
  seg: '1:45-2:10', mod: 'Gemini Notebook', do: true, layout: 'divider',
  time: '1:45-2:10', big: 'Gemini Notebook',
  sub: 'AI faqat sizning hujjatlaringizdan javob beradi. Avvalgi nomi NotebookLM.',
  notes: { do: 'Mentors hand out the exercise sheet (notebooklm-exercise/mashq.pdf).', say: 'Renamed 16 Jul 2026; notebook.google.com (F10, F11).' }
},
{
  seg: '1:45', mod: 'Gemini Notebook', layout: 'statement',
  title: 'Ochiq kitob imtihoni', art: 'book',
  big: 'Javob faqat siz bergan hujjatlardan. Har javobda [[manba raqami]].',
  sub: 'Bu RAG deyiladi: model avval hujjatdan qidiradi, keyin javob yozadi.',
  notes: {
    do: 'Switch to the prepared Baraka Office notebook. Ask one question, click the citation number, show the highlighted source line.',
    say: 'UZ: "Bu ochiq kitob imtihoni: AI faqat siz bergan hujjatdan javob beradi va qaysi joydan olganini ko‘rsatadi. Har bir javobdagi raqamni bosing va manbada tekshiring."'
  }
},
{
  seg: '1:48-2:04', mod: 'Gemini Notebook', do: true, layout: 'steps',
  title: 'Mashq: 16 daqiqa',
  steps: [
    'notebook.google.com da yangi daftar oching',
    '3-5 hujjat yuklang||o‘zingizniki yoki Baraka Office to‘plami',
    '3 ta savol bering, manba raqamini bosib tekshiring',
    'Ziddiyat promptini yuboring',
    'O‘zbekcha test so‘rang'
  ],
  note: 'Audio o‘zbekcha chiqmaydi: o‘zbekcha uchun test so‘rang. Excel bo‘lsa, CSV yoki PDF qiling.', noteTone: 'warn',
  notes: {
    do: 'Walk the room. Suggest the Uzbek test first: 40 people starting audio at once may queue (usage is compute-based, F13).',
    say: 'Uzbek is not on the official output-language list (F15), so Audio Overview comes out in Russian or English only. Tested 2026-11-03: asking in chat in Uzbek for a 5-question test produced an Uzbek test in chat and an Uzbek Studio quiz (notebooklm-exercise/namuna/studio-quiz-gemini-notebook.md). Worked outputs: notebooklm-exercise/namuna-natijalar.md.'
  }
},
{
  seg: '1:55-2:10', mod: 'Gemini Notebook', do: true, layout: 'prompt',
  title: 'Ziddiyatlarni toping', promptBig: true,
    prompt: 'Yuklangan barcha hujjatlarni solishtirib chiq.\nRaqamlar, muddatlar, narxlar, chegirmalar, kafolat va ichki qoidalar bir-biriga zid kelgan joylarni top.\nHar birini jadval qil: mavzu, 1-manba nima deydi, 2-manba nima deydi, ikkala manbadan iqtibos, biznes uchun xavfi.\nManbada yo‘q narsani to‘qima.',
  side: [
    { h: 'Baraka Office', tone: 'acc', art: 'mismatch', body: ['Hujjatlarga **4 ta** ziddiyat ataylab qo‘yilgan', 'Sinovda Gemini Notebook **8 tasini** topdi', 'Siz nechtasini topdingiz?'] }
  ],
  notes: {
    do: '2:04-2:10: two tables read one contradiction each; then reveal the four planted ones: delivery 7 vs 3 days; discount 5%/10% vs 12-15%; warranty 24/12 months and paid regional delivery vs 36 months free; salary dates 5th/15th and plan 120M vs 10th and 100M. Tested 2026-11-03 on the owner\'s existing Baraka notebook: this exact prompt, in Uzbek, returned all four plus four smaller real ones (free 3D design threshold, regional delivery, lateness fine), answering in Uzbek with citations.',
    say: 'UZ: "Bu sizning kompaniyangizda ham bor: shartnoma bir narsa deydi, sotuvchi boshqa narsa va’da qiladi. AI buni besh daqiqada topadi."'
  }
},

/* ===================== 2:10-2:45 KIT 1 ===================== */
{
  seg: '2:10-2:45', mod: 'To‘plam 1', layout: 'divider',
  time: '2:10-2:45', big: 'To‘plam 1: Ish qayerga ketyapti?',
  sub: 'Agentga ish berishdan oldin vaqt qayerga ketyapganini bilib olamiz.',
  notes: { do: 'Have the Kit 1 PDF ready (kits/KIT_01_Ish_qayerga_ketyapti_UZ_LATN.pdf). The volunteer sits near the front.', say: '' }
},
{
  seg: '2:10', mod: 'To‘plam 1', layout: 'cards', cols: 3,
  title: 'Avval ishni xaritaga tushiramiz',
  cards: [
    { h: 'Nega', tone: 'acc', art: 'map', body: ['Qaysi ishga qancha vaqt ketishini **xodimlaringiz** biladi, siz emas'] },
    { h: 'Xavf', tone: 'warn', art: 'lockfolder', body: ['Odamlar qo‘rqsa, **ishni yashiradi**'] },
    { h: 'Birinchi qadam', tone: 'ok', art: 'megaphone', body: ['Suhbatdan oldin **jamoaga o‘zingiz** ayting'] }
  ],
  foot: 'Maqsad ishni xaritaga tushirish, [[odamlarni almashtirish emas]].',
  notes: {
    do: 'Point to the ready team message at the end of Kit 1 ("Jamoaga xabar").',
    say: 'UZ: "Agentga vazifa berishdan oldin, ish qayerga ketyapganini bilishimiz kerak. Buni xodimlaringiz biladi, siz emas. Odamlar qo‘rqsa, ishni yashiradi. Shuning uchun birinchi suhbatdan oldin jamoaga o‘zingiz aytasiz."\nLanguage: "ishni yengillashtirish", never "optimizatsiya"; "tejalgan vaqt", never "bo‘shatilgan". No jokes about firing.'
  }
},
{
  seg: '2:14', mod: 'To‘plam 1', layout: 'script',
  title: 'Rozilik: ikki variantli savol',
  lines: [
    '[Ism] aka/opa, ishingiz aslida qanday yurishini tushunmoqchiman.',
    'Bu sizni tekshirish emas: aytganlaringiz maosh yoki baholash uchun ishlatilmaydi.',
    'Ovozni AI matnga aylantiradi, audio bir hafta ichida o‘chiriladi.',
    'Buning uchun yozma roziligingiz kerak: pastga imzo qo‘yasiz.',
    'Vazifalar ro‘yxatini sizga beraman, xohlagan joyini tuzatasiz.',
    'Qaysi biri sizga qulay: yozib olaymi yoki qo‘lda yozaymi?'
  ],
  foot: '«Rozimisiz?» demang: boshliqqa «yo‘q» deyish qiyin.',
  notes: {
    do: 'Short version on screen; the full text is in Kit 1, form A (kits/content/uz-latn.json, kits[0].forms[0].consent), which now includes the Labour Code Art. 178 written-consent line and the employee initials box. Pairs read it to each other (3 minutes).',
    say: 'UZ: "Rozilik so‘ralganda «Rozimisiz?» demang: boshliqqa «yo‘q» deyish qiyin. «Yozib olaymi yoki qo‘lda yozaymi?» deb so‘rang."'
  }
},
{
  seg: '2:17-2:29', mod: 'To‘plam 1', layout: 'flow',
  title: 'Jonli: suhbatdan B shakligacha',
  nodes: [
    { k: '5 daqiqa', art: 'microphone', t: 'Suhbat', d: 'A.1, A.2, A.5, A.7, telefonga' },
    { k: 'Gemini', art: 'wavedoc', t: 'Audiodan matn', d: 'Raqamlarni so‘z bilan' },
    { k: 'Claude', art: 'chat', t: 'To‘plam 1 so‘rovi', d: 'Raqamlar jadvali + vazifalar' },
    { k: 'Natija', art: 'clipboard', t: 'B shakli', d: 'B.1-B.8, [?] belgilar' }
  ],
  foot: 'Oxirgi qadam har doim siz: [[har bir raqamni audio bilan solishtiring]].',
  notes: {
    do: '2:17-2:23 interview the volunteer (kit1-live-demo/jonli-suhbat-ssenariysi.md). 2:23-2:29 upload audio to gemini.google.com with the Kit 1 transcription prompt, paste the transcript into Claude with the Kit 1 prompt, show Form B.',
    say: 'Gemini free plan: 10 minutes of audio per prompt (F18), enough for this demo. If transcription fails or Wi-Fi drops: kit1-live-demo/fallback-transkript.md, then kit1-live-demo/namuna-form-b.md.'
  }
},
{
  seg: '2:26', mod: 'To‘plam 1', layout: 'catch3',
  title: 'Xato raqamni ushlang',
  boxes: [
    { k: 'Xodim aytdi', art: 'chat', v: '«bir uch-to‘rt yuz ming»', d: '«bir» bu yerda «taxminan» degani' },
    { k: 'Transkriptda', tone: 'warn', art: 'warning', v: '1 300 000', d: 'Ovozni matnga o‘girish raqamni buzdi' },
    { k: 'Aslida', tone: 'ok', art: 'check', v: '300-400 ming', d: 'Xodim bilan tekshirib tuzatildi' }
  ],
  foot: 'AI xatoni qizil qilmaydi. [[Har bir raqamni]] tekshiring.',
  notes: {
    do: 'Use the volunteer\'s own wrong number if one appears; otherwise this example.',
    say: 'UZ: "Mana: u «bir uch-to‘rt yuz ming» dedi, ya’ni taxminan 300-400 ming. Transkriptda 1 300 000 chiqdi. AI xatoni qizil qilmaydi. Har bir raqamni audio bilan solishtiring."\nThe example is from the 2.0 Day 1 class (01:11:14).'
  }
},
{
  seg: '2:29-2:45', mod: 'To‘plam 1', do: true, layout: 'steps',
  title: 'Juftlikda: 14 daqiqa',
  steps: [
    'Rozilik matnini o‘qing',
    '5 daqiqa suhbat: A.1, A.2, A.5, A.7||telefonga yozing',
    'Gemini’da matnga aylantiring',
    'To‘plam 1 so‘rovini Claude’ga yuboring',
    'Kamida bitta raqamni qo‘lda to‘g‘rilang'
  ],
  note: 'Tayyor: B shakli jadvali bor, bitta raqam qo‘lda to‘g‘rilangan. Vaqt qolsa, rollarni almashtiring.', noteTone: 'ok',
  notes: {
    do: 'At 2:43: hands up, who has a Form B with at least one number corrected by hand. Mentors note code 1.8.',
    say: 'No staff names on the big screen; talk about the process, not the person.'
  }
},

/* ===================== 2:45-3:00 HOMEWORK + SETUP ===================== */
{
  seg: '2:45', mod: 'Uy vazifasi', layout: 'steps',
  title: 'Uy vazifasi: 2-darsgacha',
  steps: [
    'Jamoaga ayting: nega suhbat',
    '2-3 xodim bilan suhbat||20-30 daqiqa; jamoa yo‘q bo‘lsa, o‘zingiz',
    'Matnga aylantiring, To‘plam 1 so‘rovi',
    'B shaklini xodim to‘g‘rilaydi',
    '.md fayl: malika-form-b.md'
  ],
  note: 'Gemini bepul: 10 daqiqa audio. Har 8 daqiqada yozuvni to‘xtatib, yangisini boshlang.', noteTone: 'warn',
  notes: {
    do: 'Mentors hand out the homework sheet and the worked example (handouts/pdf/uy-vazifasi.pdf, uy-vazifasi-namuna.pdf). Each person names the day they tell the team and the 2-3 people. File names follow the kits: ism-form-b.md (the curriculum says kit1-dilnoza.md; Day 2 reads kit1-interviews/*-form-b.md).',
    say: 'UZ: "Uy vazifasi: avval jamoaga ayting, keyin 2-3 xodim bilan suhbat. Har biridan B shakli, xodim o‘zi to‘g‘rilagan. .md fayl qilib saqlang va keyingi haftaga olib keling."'
  }
},
{
  seg: '2:50-2:58', mod: 'Uy vazifasi', do: true, layout: 'steps',
  title: 'Hozir: Claude Desktop va Code tekshiruvi',
  steps: [
    'Claude Desktop ilovasini oching||o‘rnatilmagan bo‘lsa: claude.ai/download',
    'Akkauntga kiring va **Code** bo‘limini tanlang',
    'Lokal papka tanlab ishga tushdimi? Tayyor.'
  ],
  arts: ['d2-laptop', 'terminal', 'check'],
  note: 'Chiqmadimi? Mentor hozir o‘rnatadi yoki tuzatish vaqtini belgilaydi.', noteTone: 'warn',
  notes: {
    do: 'Primary tool is Claude Desktop (Code tab). Mentors help install from claude.ai/download and verify login + Code tab opens a local folder (Warp/CLI stays optional for those who prefer terminal). Codes 1.3 and 1.9.',
    say: ''
  }
},
{
  seg: '2:58', mod: 'Uy vazifasi', ground: 'cobalt', layout: 'statement',
  title: 'Keyingi hafta: Claude Code', art: 'terminal',
  big: 'Claude Code sizning To‘plam 1 fayllaringizni o‘qiydi va [[birinchi jarayonni]] birga tanlaymiz.',
  sub: '2-dars: 28 va 29-noyabr. Stol chatiga bitta qator yozing: bugun nima qurdim va jamoaga qaysi kuni aytaman.',
  notes: {
    do: 'End on time. Mentors confirm code 1.10 (team message day, names, interview dates).',
    say: 'UZ: "Keyingi hafta Claude Code sizning shu fayllaringizni o‘qiydi va qaysi jarayondan boshlashni birga tanlaymiz. Rahmat."'
  }
}
];
