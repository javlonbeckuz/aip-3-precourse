/* Praktikum 3.0, lesson 6 deck content. Runs on the shared engine (../../../deck-engine/README.md lists layouts and fields).
   On-screen text: Uzbek Latin. Notes (do/say): English, with Uzbek lines to say marked UZ.
   seg = run-of-show time for this slide (keep in sync with ../../instructor-run-sheet.md).
   Facts: ../../sources.md (S-numbers in the notes).
   Inline markup: **bold**, [[accent]], {{placeholder}}; in steps, "main||small" adds a second line. */
window.SLIDES_DATA = [

/* ===================== 0:00-0:40 KIT 5 B FINAL ===================== */
{
  seg: '0:00', mod: 'Kirish', layout: 'title',
  kicker: 'Praktikum 3.0 · 6-dars',
  big: 'Natija, qaror va namoyish kuni',
  sub: 'Sinovingiz nimani o‘zgartirdi, raqamda. Davom etamizmi. Keyingi jarayon qaysi.',
  notes: {
    do: 'Slide on screen as people sit. Mentors at the door mark "6-dars: keldi" with the arrival time.',
    say: 'UZ: "Olti hafta oldin bitta jarayonni tanladik. Bugun uchta savolga raqam bilan javob beramiz: nima o‘zgardi, davom etamizmi, keyingi jarayon qaysi."'
  }
},
{
  seg: '0:01', mod: 'Kirish', layout: 'agenda',
  title: 'Bugungi reja',
  items: [
    ['0:00', '**Yakuniy raqamlar** va natija varag‘i||o‘z noutbukingizda'],
    ['0:40', 'AI foydada qachon ko‘rinadi'],
    ['1:10', 'AI’ni to‘g‘ri sotib olish'],
    ['1:30', 'Tanaffus', true],
    ['1:40', '**Namoyish:** stolda, har kim 3 daqiqa'],
    ['2:20', '**Sahna:** 8 ta namoyish va ovoz berish'],
    ['2:50', 'Bitiruv']
  ],
  side: [
    { h: 'Ochiq bo‘lsin', tone: 'acc', body: ['kit5-pilot/numbers.md', 'kit5-pilot/plan.md', 'Natija varag‘i sahifasi'] },
    { h: 'Mentor', body: ['Raqamlaringiz oldindan tekshirilgan', 'Bugun faqat yakun va qaror'] }
  ],
  notes: {
    do: 'Read the times in 30 seconds. Point at the right column: the files must be open now.',
    say: 'UZ: "Raqamlaringizni mentoringiz darsdan oldingi uch kunda ko‘rib chiqdi. Bugun faqat oxirgi kun raqamini qo‘shasiz, varaqni yopasiz va qaror qilasiz."'
  }
},
{
  seg: '0:02', mod: 'Kirish', layout: 'cards', cols: 3,
  title: 'Bugun uyga uchta narsa bilan ketasiz',
  cards: [
    { h: '1. Natija varag‘i', tone: 'acc', body: ['Bitta A4: oldin va keyin', 'Soat, so‘m, xato ulushi', 'Mentor imzosi bilan'], art: 'clipboard' },
    { h: '2. Qaror', body: ['Davom etish, o‘zgartirish yoki to‘xtatish', 'Sababi bitta gapda'], art: 'scale' },
    { h: '3. Keyingi jarayon', body: ['Matritsangizdan 2-jarayon', 'Kim bilan suhbat qilasiz'], art: 'map' }
  ],
  foot: 'Varaqni hamkoringizga ko‘rsatsangiz, [[savol bermasdan]] tushunishi kerak.',
  notes: {
    do: 'One breath per card. This is the promise of lesson 6 on the sales page (S2).',
    say: 'UZ: "Bugun ketayotganingizda qo‘lingizda bitta varaq bo‘ladi: uni hamkoringizga ko‘rsatsangiz, savol bermasdan tushunadi."'
  }
},
{
  seg: '0:03', mod: 'Yakuniy raqamlar', layout: 'vs',
  title: 'Uchta xatoni toping',
  cols: [
    { k: 'Varaqda yozilgan', tone: 'warn', t: '«Vaqt 2 barobar tejaldi. Oyiga taxminan 10 mln so‘m foyda. Hammaga yoqdi.»', d: 'Qaror: davom etish' },
    { art: 'magnifier', k: 'Jadvalda', body: ['B.2 vaqt: agentgacha **-**, 1-hafta 2,5, 2-hafta 2', 'B.7 tekshirish: **-**', 'B.14 topilgan pul: **10 000 000**, tafsiloti yo‘q', 'B.3 xatolar: «ko‘p emas», «kam»'] }
  ],
  foot: 'Stol bo‘lib toping. Birinchi topgan stol [[qo‘l ko‘tarsin]].',
  notes: {
    do: 'Optionally open results-sheet/index.html?namuna=yomon on screen instead. Tables race, 3-4 minutes. Stop at the second correct answer, then slide 5.',
    say: 'UZ: "Bu varaqda uchta katta xato bor. Stol bo‘lib toping."\nExpected: no baseline; checking time not counted; saved hours counted as money with no document. Bonus: "Hammaga yoqdi" is not a reason.'
  }
},
{
  seg: '0:07', mod: 'Yakuniy raqamlar', layout: 'catch3',
  title: 'Javoblar',
  boxes: [
    { k: '1. Agentgacha yo‘q', tone: 'warn', art: 'bars', v: '2 barobar', d: 'Nimaga nisbatan? Boshlang‘ich raqamsiz bu taassurot.' },
    { k: '2. Tekshirish yo‘q', tone: 'warn', art: 'magnifier', v: 'B.7 bo‘sh', d: 'Agent ishini tekshirish ham vaqt. Ayirilmasa, tejalgan vaqt bo‘rttiriladi.' },
    { k: '3. Soat pul emas', tone: 'warn', art: 'd6-coins', v: '10 mln', d: 'Hujjat yo‘q va tejalgan soat pulga aylantirilgan. Maosh kamaymagan.' }
  ],
  foot: 'Halol kichik raqam [[katta taxmindan kuchli]].',
  notes: {
    do: 'Name the winning table. Then move on; the bad example is in the guide, section 8, and in exercise 01.',
    say: 'UZ: "Uchala xato ham 2.0 dagi haqiqiy varaqlarda bo‘lgan. Bugun bizning varaq ularni o‘zi ushlaydi: boshlang‘ich raqam bo‘lmasa, qizil yozuv chiqadi."'
  }
},
{
  seg: '0:09', mod: 'Yakuniy raqamlar', layout: 'chain',
  title: 'Tejalgan vaqt: Baraka misolida',
  nodes: [
    { art: 'd6-clock', k: 'Agentgacha', t: '6 daqiqa', d: 'bitta savolga (B.2)' },
    { art: 'bolt', k: '2-hafta', t: '2,0 daqiqa', d: 'odam vaqti, tekshirishsiz' },
    { art: 'calculator', k: '× 138 savol ÷ 60', t: '9,2 soat', d: 'shu hafta tejalgan odam vaqti' },
    { art: 'magnifier', k: '− tekshirish (B.7)', t: '2,0 soat', d: 'chegirma va muddat 100%, narx va qoldiq darhol' },
    { art: 'check', k: 'B.15', t: '[[7,2 soat]]', d: 'haftasiga tejaldi' }
  ],
  foot: '(6 − 2,0) × 138 / 60 − 2,0 = 7,2. 1-haftada 3,2 edi: hamma javob tekshirilgan; 2-haftada chegirma va muddat to‘liq.',
  notes: {
    do: 'Walk left to right. The formula is Kit 5 B.15, unchanged. Numbers: day-6/exercises/namuna/kompaniya/kit5-pilot/numbers.md. Week 2 ran partial direct (Day 4 plan A.5): week 1 missed three A.6 targets (2.5 min, 7 errors, 4.5 h) but all 7 errors were caught before a customer, so from 21 Dec price and stock answers went straight to staff while Malika kept approving every discount and delivery-date answer.',
    say: 'UZ: "Formulani yodlash shart emas: /kit5 yakun buni sizga hisoblaydi. Lekin bitta narsani tushuning: tekshirish vaqti ayiriladi. 1-haftada hamma javob tekshirildi, shuning uchun 3,2 soat edi."'
  }
},
{
  seg: '0:11', mod: 'Yakuniy raqamlar', layout: 'bridge',
  title: 'Soat imkoniyat. Pul pul.',
  items: [
    { l: 'Topilgan pul, oyiga taxmin', s: '2 haftada isbotlangan 680 000 so‘m (1 holat) ÷ 2 × 4,3', v: 1462000, t: '+1 462 000' },
    { l: 'Vosita xarajati', s: 'server, model, Claude obunasi', v: -504500, t: '−504 500', tone: 'neg' },
    { l: 'Pul hisobida (taxmin)', s: 'oyiga', v: 957500, t: '+957 500', tone: 'tot' },
    { l: 'Tejalgan vaqt qiymati (shartli)', s: '7,2 soat × 35 700 × 4,3; maosh kamaymaydi', v: 1105272, t: '+1 105 000', tone: 'cond' }
  ],
  foot: 'Sariq chiziq faqat tejalgan soat [[yangi ishga ketsa]] qiymat bo‘ladi. Pulga qo‘shib gapirmang.',
  notes: {
    do: 'This is the core idea of the day. Monthly figures, Baraka example (day-6/exercises/namuna/kompaniya/kit5-pilot/numbers.md, the canon Kit 5 Form B). Money found: on 23 Dec a client asked 12% on a 34,000,000 so‘m deal; the bot gave the rule and escalated; the head of sales allowed 10% against 100% prepayment (price list section 5): 2% = 680,000 so‘m, with the amoCRM card and written approval. That 680,000 is proven for the two weeks; the monthly 1,462,000 is an estimate from one case, so the slide says «taxmin».',
    say: 'UZ: "Maoshlar o‘zgarmaydi. Shuning uchun 1,1 million - imkoniyat, pul emas. 680 ming esa pul: bot 12 foizli chegirmani to‘xtatdi va hujjati bor. Oylik 1,46 million - taxmin, bitta holatdan."\nCurriculum term: money found. The owner review: partners ask "qancha pul?", not "necha minut?".'
  }
},
{
  seg: '0:12', mod: 'Yakuniy raqamlar', layout: 'image',
  title: 'Natija varag‘i: yuqoridan pastga o‘qing',
  img: 'assets/img/natija-varagi-baraka-yuqori.png', alt: 'Baraka Office natija varag‘ining yuqori qismi',
  side: [
    { h: 'O‘qish tartibi', tone: 'acc', body: ['1. Ko‘k ramkadagi gap', '2. To‘rtta kartochka', '3. Oldin va keyin jadvali', '4. Pul hisobi va qaror'] },
    { h: 'Sahifa', body: ['results-sheet/index.html', 'Internetsiz ishlaydi', '«Namuna bilan ochish»'] }
  ],
  notes: {
    do: 'Better: switch to the browser with results-sheet/index.html?namuna=baraka and read it live for 90 seconds. Show the "Tekshiruv" box and the badge "Tekshirildi, izoh bilan" (the caveat: money found from one case, so the monthly figure is an estimate).',
    say: 'UZ: "Hamkoringiz faqat ko‘k ramkadagi gapni o‘qishi mumkin. U to‘g‘ri bo‘lsin. Qolgani - isbot."'
  }
},
{
  seg: '0:13', mod: 'Yakuniy raqamlar', layout: 'prompt',
  title: 'Yakunni Claude Code hisoblaydi',
  termTitle: 'CLAUDE CODE · KOMPANIYA PAPKASIDA',
  prompt: '/kit5 yakun\n\nKeyin: results-sheet/index.html ni oching,\n«Kit 5 faylini ochish» → numbers.md va plan.md',
  side: [
    { h: 'U nima qiladi', tone: 'acc', body: ['O‘zgarish ustuni, foizi bilan', 'B.11, B.12, B.15, B.16', 'Isbotlangan va isbotlanmagan pul'] },
    { h: 'Claude Code ochilmasa', body: ['To‘plam 5 dagi «AI chat uchun so‘rov»', 'Claude, ChatGPT yoki Gemini chatiga'] }
  ],
  notes: {
    do: 'Point to exercise 01 (exercises/01-yakuniy-raqamlar.md): it has the full steps, the Baraka worked example and the weak example.',
    say: 'UZ: "Skill sizdan so‘raydi, keyin yozadi. To‘xtang degan joyda javob bering."'
  }
},
{
  seg: '0:14', mod: 'Yakuniy raqamlar', layout: 'timer', minutes: 18,
  sub: 'Shanba raqamini qo‘shing → /kit5 yakun → natija varag‘i: ish kunlari, soatbay haq, xarajatlar',
  notes: {
    do: 'Press T. Mentors: pre-audited V/VC owners finish in 10 minutes; spend the time on NV owners. At 0:30 call "ikki daqiqa".',
    say: 'UZ: "Raqamni chiroyli qilish uchun o‘zgartirmaymiz. Raqam yo‘q bo‘lsa, varaq buni ochiq aytadi."'
  }
},
{
  seg: '0:32', mod: 'Qaror', layout: 'catch3',
  title: 'Uchta halol qaror',
  boxes: [
    { art: 'check', k: 'Davom etish', tone: 'ok', v: 'Mezon bajarildi', d: 'Muvaffaqiyat mezoni (A.6) bajarildi, to‘xtatish sharti (A.7) yuz bermadi.' },
    { art: 'wrench', k: 'O‘zgartirish', v: 'Bir qismi ishladi', d: 'Bitta narsa o‘zgaradi: qamrov, ruxsat, ma’lumot yoki tekshiruvchi. Yana 2 hafta.' },
    { art: 'warning', k: 'To‘xtatish', tone: 'peach', v: 'Shart yuz berdi', d: 'Yoki 2 haftadan keyin raqamlar avvalgidan yaxshi emas.' }
  ],
  foot: 'To‘xtatish ham natija: [[nima ishlamasligini]] aniq bilasiz.',
  notes: {
    do: 'Decisions are measured against A.6 and A.7 written before the pilot: no moved goalposts.',
    say: 'UZ: "To‘xtatgan odam nima ishlamasligini aniq biladi, bu keyingi xatoning pulini tejaydi. Bugun eng halol qarorni sahnada alohida aytamiz."'
  }
},
{
  seg: '0:33', mod: 'Qaror', layout: 'prompt',
  title: 'Qarordan oldin: uchta tanqidchi',
  termTitle: 'CLAUDE · NUMBERS.MD VA PLAN.MD BILAN',
  prompt: 'kit5-pilot/numbers.md va plan.md ni o‘qi.\nMening qarorim: {{davom etish / o‘zgartirish / to‘xtatish}}.\nUni uch kishi sifatida tanqid qil:\n1) shubhali investor: raqamlar nimani isbotlamaydi?\n2) talabchan mijoz: men nimani sezaman?\n3) raqobatchi: buni qanday arzonroq qilardim?\nHar biriga 3 qator. Oxirida: qarorim A.6 va A.7 ga mosmi?',
  side: [
    { h: 'Odat', tone: 'acc', body: ['3-darsdan beri: uchta tanqidchi', 'Javobni o‘qing, keyin qaror'] },
    { h: 'Mentor bilan', body: ['Belgilang: bitta qaror', 'Sababi bitta gapda'] }
  ],
  notes: {
    do: 'Exercise 02 has this prompt and a worked Baraka answer. 2 minutes to read the critics, then decide with the mentor (slide 13 timer).',
    say: 'UZ: "Tanqidchi sizning o‘rningizga qaror qilmaydi. U siz ko‘rmagan narsani ko‘rsatadi."'
  }
},
{
  seg: '0:34', mod: 'Qaror', layout: 'timer', minutes: 4,
  sub: 'Uchta tanqidchi → mentor bilan qaror → «Sababi» bitta gapda',
  notes: {
    do: 'Press T. Mentors mark 6.6 in the tracker. At 0:38 two owners read their decision aloud: first a change or stop (asked before class), then a continue.',
    say: 'UZ: "Ikki kishi qarorini o‘qiydi: bittasi o‘zgartirish yoki to‘xtatish, bittasi davom etish."'
  }
},

/* ===================== 0:40-1:10 AI THAT SHOWS UP IN PROFIT ===================== */
{
  seg: '0:40', mod: 'Foyda', layout: 'divider',
  time: '0:40 - 1:10',
  big: 'AI foydada qachon ko‘rinadi',
  sub: 'Eski jarayonga qo‘shish yoki jarayonni qayta qurish',
  notes: { do: 'Transition. 30 minutes of talk with one 4-minute hands-on at 1:03.', say: '' }
},
{
  seg: '0:40', mod: 'Foyda', layout: 'bignum',
  title: '1-darsdagi raqamlar, endi o‘z raqamingiz bilan',
  nums: [
    { n: '80%', label: 'respondentlar: AI **shaxsiy unumdorligimni** oshirdi' },
    { n: '37%', label: 'respondentlar: **foydada** qandaydir ta’sir bor' },
    { n: '6%', tone: 'acc', label: '**yuqori natijali** kompaniyalar' }
  ],
  foot: 'Siz endi o‘z jarayoningizda [[raqam bilan]] bilasiz: qaysi guruhdasiz.',
  source: 'McKinsey, The state of AI in 2026 (25.08.2026): 1 719 respondent, 97 davlat, ko‘pi yirik kompaniyalar',
  notes: {
    do: 'Same wording as Day 1 (S5): respondents, not companies; global survey, mostly large firms; a direction, not a measurement of Uzbek SMEs.',
    say: 'UZ: "Birinchi darsda bu raqamlar boshqalarniki edi. Bugun sizda o‘zingizniki bor."'
  }
},
{
  seg: '0:45', mod: 'Foyda', layout: 'vs',
  title: 'Qo‘shish emas, qayta qurish',
  cols: [
    { art: 'wrench', k: 'Boshqa respondentlar', n: '~1/4', t: 'jarayonni qayta qurgan', d: 'AI eski qadamlarga qo‘shiladi: tezroq, lekin o‘sha ish.' },
    { art: 'loop', k: 'Yuqori natijalilar', tone: 'ok', n: '~3/4', t: 'jarayonni qayta qurgan', d: 'Ish AI qila oladigan narsa atrofida qayta tuziladi.' }
  ],
  source: 'McKinsey, The state of AI in 2026, 17-18-betlar: «nearly three-quarters» va «just one-quarter»',
  notes: {
    do: 'S6. High performers: up from 55% last year.',
    say: 'UZ: "Ular AI’ni eski jarayonga yopishtirmaydi. Ishni qaytadan quradi. Siz To‘plam 3 da aynan shuni qildingiz."'
  }
},
{
  seg: '0:47', mod: 'Foyda', layout: 'flow',
  title: 'Baraka: 9 qadam, 6 tasi agentda, 3 tasi odamda',
  nodes: [
    { art: 'chat', k: 'Odam', t: 'Savolni aniqlashtirish', d: 'qaysi mahsulot, necha dona, qachonga' },
    { art: 'model', k: 'Agent: 6 qadam', t: 'Narx, summa, qoldiq, chegirma, muddat, kafolat', d: 'prays-list, 1C eksporti, qoidalar' },
    { art: 'scale', k: 'Odam', t: '5% dan katta chegirma', d: 'Jamshid aka qaror qiladi' },
    { art: 'megaphone', k: 'Odam', t: 'Mijozga aytish', d: 'agent mijozga o‘zi yozmaydi' }
  ],
  foot: '1C eksporti har kuni 08:00 da, 10:30 da tekshiruv: bu ham qayta qurish, [[AI emas]].',
  notes: {
    do: 'From Day 3 Kit 3 A (day-3/exercises/namuna/kompaniya/kit3-agent/form-a-steps.md). Count: steps 3-8 are A (agent), steps 1, 2 and 9 are I (person); the person also decides above 5%.',
    say: 'UZ: "Qayta qurish har doim ham AI emas. Ombor faylini har kuni 08:00 da chiqarish va 10:30 da tekshirish oddiy qaror edi, lekin eski fayl xatosini yo‘q qildi."'
  }
},
{
  seg: '0:50', mod: 'Foyda', layout: 'bignum',
  title: 'Qaysi yo‘l qancha qiymat beradi',
  nums: [
    { n: '13%', label: 'Xodimlarga **vosita berish** (chatbot obunasi)' },
    { n: '24%', label: 'Jarayonlarni **avtomatlashtirish**' },
    { n: '48%', tone: 'acc', label: 'Ishni **qayta qurish**' }
  ],
  foot: 'Rahbarlarning qancha qismi sezilarli qiymat ko‘rgan. Sizning sinovingiz [[uchinchi yo‘l]].',
  source: 'McKinsey Quarterly, The key to AI value is hiding in plain sight: Your operating model (2026-09), 3-bet',
  notes: {
    do: 'S7. Share of leaders reporting meaningful enterprise value, by horizon.',
    say: 'UZ: "Hammaga chatbot obunasi - bu 13 foizli yo‘l. Jarayonni qayta qurish - 48 foizli yo‘l."'
  }
},
{
  seg: '0:52', mod: 'Foyda', layout: 'vs',
  title: 'Kamaytirish yoki o‘sish',
  cols: [
    { k: 'Kamaytirish', t: 'Shu ishni kamroq xarajat bilan', body: ['Qo‘shimcha ish vaqti yo‘qoladi', 'Ketgan xodim o‘rniga yangi olinmaydi', 'Hech kim sinov sababli ishdan bo‘shamaydi'] },
    { k: 'O‘sish', tone: 'ok', t: 'Shu odamlar bilan ko‘proq ish', body: ['Madina: KP olgan mijozga 24 soatda qayta bog‘lanish', 'Malika: haftasiga bitta qo‘shimcha KP', 'Har biri haftalik raqam bilan'] }
  ],
  foot: 'Yuqori natijalilar samaradorlik bilan birga [[o‘sishni]] ham ko‘zlaydi.',
  source: 'McKinsey, The state of AI in 2026, 17-bet: samaradorlik ~80% ikkala guruhda; o‘sish ko‘proq yuqori natijalilarda',
  notes: {
    do: 'Baraka canon: the 7.2 saved hours split (illustrative) Madina 3.9, Jamshid 2.4, Malika 0.9 (numbers.md). Madina Sattorova (B12) calls showroom clients who got a KP within 24 hours; Malika Rashidova (B04) drafts one more KP a week; Jamshid Karimov (B02) uses his time to coach the newest managers (Rustam Nazarov, Shahzoda Mirzayeva). Same story as bonus kit 5\'s Baraka example. Do not use the curriculum\'s "Dilnoza becomes a sales analyst": in this Baraka, Dilnoza is the HR head.',
    say: 'UZ: "Tejalgan soatni kimgadir berish oson, uni o‘lchash qiyin. Shuning uchun har bir soatga haftalik raqam: nechta qo‘ng‘iroq, nechta o‘qitish."'
  }
},
{
  seg: '0:55', mod: 'Foyda', layout: 'steps',
  title: 'Tejalgan soat qayerga ketadi',
  steps: [
    'Uchta raqam||nazariy, tekshirishdan keyin tejalgan, haqiqatan boshqa ishga ketgan',
    'Haftasiga 2 soatdan kam: boshqa ishga bermang||faqat yozib qo‘ying: bo‘laklarda yo‘qolib ketadi',
    'Har bir soatga kalendarda joy||masalan, seshanba va payshanba 15:00-17:00',
    'Haftalik raqam||u yangi ish bo‘lganini isbotlaydi'
  ],
  side: [
    { h: 'Va’da', tone: 'acc', body: ['4-darsda xodimga berilgan va’da kuchda', 'E’londa ishdan bo‘shatish yo‘q'] },
    { h: 'Batafsil', body: ['Qo‘shimcha to‘plam 5:', '«Tejalgan vaqt qayerga ketadi?»'] }
  ],
  notes: {
    do: 'Mention bonus kit 5 (bonus-kits/BONUS_05_*); do not teach it. The team announcement is Kit 5 announcement.md (/kit5 yakun writes it).',
    say: 'UZ: "Xodimlaringiz bugun bitta narsani kutyapti: menga nima bo‘ladi? E’londa birinchi shunga javob bering."'
  }
},
{
  seg: '1:00', mod: 'Keyingi jarayon', layout: 'image',
  title: 'Avval kengaytiring, keyin 2-jarayon',
  img: 'assets/img/baraka-matritsa.png', alt: 'Baraka Office qiymat va osonlik matritsasi',
  side: [
    { h: 'Baraka', tone: 'acc', body: ['Bot 4 kishidan qolgan menejerlarga', '2-jarayon: KP tayyorlash (12 / 12)'] },
    { h: 'Qoida', body: ['Bir vaqtda bitta yangi sinov', 'Oldingisi 2 hafta tuzatishsiz ishlasin'] }
  ],
  notes: {
    do: 'The matrix is Baraka\'s Kit 2 B from Day 2 (day-2/company-folder-starter). Process #1 is dot 1; dots 3, 6 and 8 are the other upper-right candidates; Baraka picks dot 6 (KP, 12 / 12). Image: _build/render_deck_image.py.',
    say: 'UZ: "Ishlayotganini kengaytirish yangi narsa qurishdan arzon. Keyin matritsadagi keyingi nuqta."'
  }
},
{
  seg: '1:03', mod: 'Keyingi jarayon', layout: 'timer', minutes: 4,
  sub: 'kit2-scoring/matrix.html ni oching → 2-jarayon → 2-3 suhbatdosh (3-mashq)',
  notes: {
    do: 'Press T. Mentors mark 6.7 (process #2 named, interviewees named).',
    say: 'UZ: "Yuqori o‘ng qismdagi keyingi nuqta. Agar ikkitasi bo‘lsa, pulga yaqinrog‘ini tanlang."'
  }
},
{
  seg: '1:07', mod: 'Keyingi jarayon', layout: 'steps',
  title: 'Keyingi 30 kun',
  steps: [
    '28-dekabr - 2-yanvar: sinovning 3-haftasi||jamoaga e’lon; 31-dekabr va 1-yanvar dam olish',
    '4-9-yanvar: 2-jarayon uchun To‘plam 1 suhbatlari||sinovning 4-haftasi',
    '11-16-yanvar: 2-jarayonning boshlang‘ich raqami||tarixdan: Telegram yoki CRM eksporti',
    'Taxminan 22-yanvar: 4 hafta raqami||natija varag‘ini yangilang'
  ],
  side: [
    { h: 'Uy vazifasi', tone: 'acc', body: ['4-mashq: 30 kunlik reja', 'Mentor oyi davomida yordam beradi'], art: 'calendar' }
  ],
  notes: {
    do: 'Exercise 04 is homework. Dates: 2027 New Year decree is not out yet (decision memo 06); say "taxminan".',
    say: 'UZ: "Reja bir sahifa: nima, kim, qachon, qaysi raqam. Bugun kechqurun yoki ertaga to‘ldiring."'
  }
},

/* ===================== 1:10-1:30 BUYING AI WISELY ===================== */
{
  seg: '1:10', mod: 'Sotib olish', layout: 'divider',
  time: '1:10 - 1:30',
  big: 'AI’ni to‘g‘ri sotib olish',
  sub: 'Qurish, sotib olish yoki ochiq kod. Sotuvchiga 8 ta savol.',
  notes: { do: 'Transition. Hand out the printed vendor checklist now.', say: '' }
},
{
  seg: '1:10', mod: 'Sotib olish', layout: 'cards', cols: 3,
  title: 'Qurish, sotib olish yoki ochiq kod',
  cards: [
    { h: 'O‘zingiz qurish', tone: 'acc', body: ['Jarayon faqat sizda shunday', 'Claude Code bilan, kursdagidek', 'Oylik: server, model, obuna'], art: 'wrench' },
    { h: 'Sotib olish', body: ['Sinalgan tayyor mahsulot bor', 'Ma’lumot qoidasi ruxsat beradi', 'Oylik narxi va chiqish yo‘li aniq'], art: 'd6-tag' },
    { h: 'Ochiq kod', tone: 'ok', body: ['Ishning 80% ini bepul loyiha qiladi', 'Masalan, Twenty CRM (3-dars)', 'Claude Code bilan moslaysiz'], art: 'openbox' }
  ],
  foot: 'Odat: [[avval ochiq kod]]. GitHub’da qidiring, keyin quring yoki sotib oling.',
  notes: {
    do: 'Twenty CRM facts: Day 3 sources D19 (GitHub, 2026-11-03).',
    say: 'UZ: "Pulni o‘zingiz noyob bo‘lgan joyga sarflang. Hamma uchun bir xil ish uchun tayyorini oling."'
  }
},
{
  seg: '1:13', mod: 'Sotib olish', layout: 'statement',
  big: 'Respondentlarning [[32%]] i: kamida bitta dasturni sotib olmadik, chunki o‘zimiz qura oldik.',
  sub: 'Kod yozadigan AI agentlar bilan. Endi bu sizning qo‘lingizda ham bor.',
  art: 'terminal',
  source: 'McKinsey, The state of AI in 2026, 8-bet',
  notes: {
    do: 'S8. Most common in technology and healthcare.',
    say: 'UZ: "Uch kompaniyadan biri. Siz endi shu uchdan birdasiz: o‘z vositangizni qurdingiz."'
  }
},
{
  seg: '1:15', mod: 'Sotib olish', layout: 'cards', cols: 2,
  title: 'Model tanlash: narx va ma’lumot',
  cards: [
    { h: 'Frontier model', tone: 'acc', body: ['Xatosi pulga tushadigan qadamlar', 'Qimmatroq, kuchliroq', 'Ma’lumot qaysi davlatga borishini tekshiring'], art: 'vault' },
    { h: 'Ochiq model (open-weight)', tone: 'ok', body: ['Oddiy, takroriy qadamlar', 'Ancha arzon', 'O‘z serveringizda ishlashi mumkin'], art: 'server' }
  ],
  foot: 'Shaxsiy ma’lumot chet elga faqat qonundagi shartlar bilan chiqadi. [[Yurist tasdiqlasin]].',
  notes: {
    do: 'Legal wording only as corrected (S9-S10): ZRU-1125 narrowed localisation to biometric, genetic and telecom-subscriber data; other personal data may go abroad under conditions; the 49-country list is Cabinet Resolution No. 415; do not say "the US is included" for Claude. Always add: a lawyer confirms.',
    say: 'UZ: "1-darsdagi savol: ma’lumot qayerga ketadi? Sotuvchidan shuni yozma so‘rang."'
  }
},
{
  seg: '1:17', mod: 'Sotib olish', layout: 'qa',
  title: 'Sotuvchiga 8 ta savol (1-4)',
  rows: [
    ['1', 'Qaysi jarayon, bugungi raqami qancha?', 'Aniq jarayon va raqam', '«Butun kompaniya uchun AI»'],
    ['2', 'Natijani qanday o‘lchaymiz, qachon to‘xtatamiz?', 'Maqsad va to‘xtatish sharti', 'Raqam yo‘q, faqat namoyish'],
    ['3', 'Qaysi model, almashtirsa bo‘ladimi?', 'Nomi aytilgan, almashtiriladi', 'Bitta yopiq model'],
    ['4', 'Tizimlarimizga API yoki MCP bilan ulanadimi?', 'Ha, tizimlar nomi bilan', 'Nusxa yoki skrinshot']
  ],
  notes: {
    do: 'The curriculum\'s 8 questions (lines 681-690), as on the printed checklist. Bonus kit 3 has 12 with a scored comparison.',
    say: 'UZ: "Har savolga ikki xil javob bor: yaxshisi va xavf belgisi. Xavf belgisi eshitsangiz, yozib qo‘ying."'
  }
},
{
  seg: '1:19', mod: 'Sotib olish', layout: 'qa',
  title: 'Sotuvchiga 8 ta savol (5-8)',
  rows: [
    ['5', 'Ma’lumotimiz qayerda, kim ko‘radi?', 'Yozma, davlati bilan', 'Noaniq'],
    ['6', 'Agent ishini kim va qanday tekshiradi?', 'Odam tekshiruvi va jurnal', '«U xato qilmaydi»'],
    ['7', 'Ochiq kod varianti bormi?', 'Ko‘rilgan va solishtirilgan', '«Eshitmaganmiz»'],
    ['8', 'Ishga tushgandan keyin oyiga qancha?', 'Obuna, xizmat, tekshirish vaqti', 'Faqat o‘rnatish narxi']
  ],
  notes: {
    do: 'Question 7 is the "open source first" habit.',
    say: 'UZ: "Sakkizinchi savol eng muhimi: 12 oyda asosiy pul oylik to‘lovga ketadi."'
  }
},
{
  seg: '1:21', mod: 'Sotib olish', layout: 'vs',
  title: '«Alfa AI» taklifi Baraka’ga: 12 oyda',
  cols: [
    { art: 'd6-tag', k: '«Alfa AI» (to‘qima nom)', tone: 'warn', n: '69,3 mln', t: 'so‘m 12 oyda', d: '4 000 $ o‘rnatish + 150 $ oyiga. Model nomi yo‘q, 1C «skrinshot bilan».' },
    { art: 'wrench', k: 'Kursda qurilgani', tone: 'ok', n: '7,9 mln', t: 'so‘m 12 oyda', d: 'Sozlash 1 885 000 + 12 × 504 500. Kod va bot egasining nomida.' }
  ],
  foot: 'Kurs narxi bu hisobda yo‘q: u [[keyingi jarayonlarni]] ham qurishni o‘rgatdi.',
  source: '1 $ = 11 941,65 so‘m (MB, 03.11.2026). Tekshirish vaqti ikkala tomonda ham hisobga olinmagan.',
  notes: {
    do: 'Invented vendor; worked example in vendor-checklist/namuna/alfa-ai-taklifi.md. 4000 x 11,941.65 = 47,766,600; 150 x 11,941.65 = 1,791,248 a month, x 12 = 21,494,976; total 69,261,576. Own: setup 1,885,000 (owner 14 h, IT 3 h) + 12 x 504,500 = 7,939,000.',
    say: 'UZ: "O‘rnatish narxi arzonroq bo‘lsa ham, savolingiz bitta: 12 oyda qancha va natijani qanday o‘lchaymiz?"'
  }
},
{
  seg: '1:24', mod: 'Sotib olish', layout: 'timer', minutes: 3,
  sub: 'Stolda: «Alfa AI» taklifini 8 savol bo‘yicha belgilang: yaxshi, noaniq yoki xavf',
  notes: {
    do: 'Press T. Expected: 6 red flags, 2 unclear (Q4 names Telegram but 1C by screenshot; Q8 gives a monthly fee but no model or checking costs). Live tool: vendor-checklist/index.html?namuna=1.',
    say: 'UZ: "Har bir savolga bitta belgi. Uch daqiqa."'
  }
},
{
  seg: '1:27', mod: 'Sotib olish', layout: 'cards', cols: 3,
  title: 'Adolatli narx qanday ko‘rinadi',
  cards: [
    { h: 'Bozor (sotuvchi sahifalari)', body: ['AI bot: 1,99 mln so‘mdan + oyiga 490 ming dan', 'CRM bilan AI agent: 5 mln so‘mdan', '«Shaxsiy Jarvis»: 2 000-5 000 $'] },
    { h: 'O‘zingiz qursangiz', tone: 'ok', body: ['Server: oyiga ~200 000 so‘m', 'Model: oyiga bir necha dollar', 'Claude: 20 $ + 12% QQS'], art: 'server' },
    { h: 'Har doim so‘rang', tone: 'acc', body: ['Oylik narx', '12 oylik jami', 'Kod va ma’lumot kimniki'], art: 'calculator' }
  ],
  foot: 'Taklifni 12 oyga ko‘paytiring. O‘rnatish narxi [[kichik qismi]].',
  source: 'gptbot.uz (18.09.2026), fera-tech.com (16.02.2026), tekshirildi 03.11.2026; «Jarvis» narxi kursda kuzatilgan, tekshirilmagan',
  notes: {
    do: 'S11-S12 from bonus kit 3 research. Then 30 seconds of demo logistics: table order is clockwise from the mentor; the stage files are already on the presenter laptop.',
    say: 'UZ: "Tanaffusdan keyin namoyish. Navbat: mentordan soat yo‘nalishi bo‘yicha."'
  }
},
{
  seg: '1:30', mod: 'Tanaffus', layout: 'timer', minutes: 10,
  sub: 'Tanaffus. Namoyishdan oldin: natija varag‘ingiz ochiq bo‘lsin',
  notes: {
    do: 'Press T. Mentors confirm the order and the timekeeper phone; head mentor checks the presenter laptop.',
    say: ''
  }
},

/* ===================== 1:40-2:20 DEMO ROUND 1: TABLES ===================== */
{
  seg: '1:40', mod: 'Namoyish', layout: 'divider',
  time: '1:40 - 2:20',
  big: 'Namoyish: stolda',
  sub: 'Har kim 3 daqiqa. Stol sahnaga bittasini tanlaydi.',
  notes: { do: 'Transition.', say: '' }
},
{
  seg: '1:40', mod: 'Namoyish', layout: 'steps',
  title: '3 daqiqa, 4 qism',
  steps: [
    '30 soniya: jarayon||nima, kim qiladi, agentgacha raqam',
    '60 soniya: oldin va keyin||natija varag‘i: vaqt, xato ulushi, topilgan pul, xarajat',
    '45 soniya: nima buzildi||bitta xato va uni qanday tuzatdingiz',
    '45 soniya: qaror va keyingi jarayon||sababi bitta gapda'
  ],
  side: [
    { h: 'Andoza', tone: 'acc', body: ['demo-day/namoyish-ssenariy.md', 'Video bo‘lsa, ustidan gapiring'] },
    { h: 'Bo‘lmasin', tone: 'warn', body: ['AI haqida umumiy gap', '12 ta slayd'] }
  ],
  notes: {
    do: 'The 4 parts match the script template in demo-day/namoyish-ssenariy.md and the scoring sheet.',
    say: 'UZ: "AI haqida umumiy gap yo‘q. Faqat sizning jarayoningiz va raqamingiz."'
  }
},

{
  seg: '1:42', mod: 'Namoyish', layout: 'cards', cols: 3,
  title: 'Stol qoidalari',
  cards: [
    { h: 'Vaqt', tone: 'acc', body: ['Mentor vaqtni kuzatadi', '3:00 da to‘xtaydi', '1 ta savol, 1 daqiqa'], art: 'd6-clock' },
    { h: 'Ekranda yo‘q', tone: 'warn', body: ['Xodim ismi', 'Transkript', 'Mijoz ma’lumoti'], art: 'lockfolder' },
    { h: 'Pul', body: ['So‘m faqat o‘zingiz xohlasangiz', 'Soat va xatolar soni kifoya'], art: 'd6-coins' }
  ],
  foot: 'Har tinglovchi baholash varag‘ida [[bitta qator]] to‘ldiradi.',
  notes: {
    do: 'Same-trade owners already sit at different tables (Week 0). Decision memo 07: so\'m only by the owner\'s choice.',
    say: 'UZ: "Raqobatchingiz zalda bo‘lishi mumkin. So‘mni aytmasangiz ham bo‘ladi: soat va xatolar yetarli."'
  }
},
{
  seg: '1:43', mod: 'Namoyish', layout: 'timer', minutes: 3,
  sub: 'Namoyish: jarayon → oldin va keyin → nima buzildi → qaror',
  notes: {
    do: 'Press T at the start of each owner; mentors also keep time on their phones (25 minutes for 5 owners: 3 min + 1 min question + 1 min scoring). Mentors mark 6.8 as each owner finishes.',
    say: ''
  }
},
{
  seg: '2:08', mod: 'Namoyish', layout: 'qa',
  title: 'Baholash: har mezon 1-3 ball',
  hq: 'Mezon', hg: '3 ball', hr: '1 ball',
  rows: [
    ['1', 'Agentgacha raqam', 'Manbasi bilan', 'Yo‘q yoki taxmin'],
    ['2', 'Oldin va keyin', 'Tekshirish ayirilgan', '«2 barobar», birliksiz'],
    ['3', 'Topilgan pul yoki xato', 'Hujjati bor holat', 'Manbasiz summa'],
    ['4', 'Nima buzildi', 'Aniq xato va tuzatish', '«Hammasi zo‘r»'],
    ['5', 'Qaror va vaqt', 'Mezon bilan, 3 daqiqada', 'Sababsiz yoki cho‘zildi']
  ],
  foot: 'Har kim bitta ovoz beradi, [[o‘ziga emas]]. Teng bo‘lsa: tekshirilgan varaq, keyin halol qaror.',
  notes: {
    do: 'Table vote 2:08-2:13. Mentor messages the head mentor: "N-stol: ism, jarayon, qaror". Stage order is set by 2:20.',
    say: 'UZ: "Eng chiroyli emas, eng halol va aniq namoyishga ovoz bering."'
  }
},

/* ===================== 2:20-2:50 DEMO ROUND 2: STAGE ===================== */
{
  seg: '2:13', mod: 'Sahna', layout: 'divider',
  time: '2:20 - 2:50',
  big: 'Sahna: 8 ta namoyish',
  sub: 'Har stoldan bittasi. Oxirida ovoz beramiz.',
  notes: { do: 'Host card: demo-day/sahna-boshlovchi.md.', say: '' }
},
{
  seg: '2:20', mod: 'Sahna', layout: 'agenda',
  title: 'Sahna tartibi',
  items: [
    ['1', '{{1-chiqish: ism, jarayon}}'], ['2', '{{2-chiqish}}'], ['3', '{{3-chiqish}}'], ['4', '{{4-chiqish}}'],
    ['5', '{{5-chiqish}}'], ['6', '{{6-chiqish}}'], ['7', '{{7-chiqish}}'], ['8', '{{8-chiqish}}']
  ],
  side: [
    { h: 'Har biriga', tone: 'acc', body: ['3 daqiqa, video bilan', '1 ta savol, 20 soniya'] },
    { h: 'Ovoz berish', body: ['Guruh chatida so‘rovnoma', '«Ertaga qaysi sinovni o‘zimda takrorlardim?»'] }
  ],
  notes: {
    do: 'Read the order from the head mentor\'s note (placeholders are not filled on screen). Mix trades; a change or stop decision in the middle; the strongest number fourth.',
    say: 'UZ: "Sakkizta stol, sakkizta sinov. Videoni ko‘rsatamiz, egasi gapiradi."'
  }
},
{
  seg: '2:21', mod: 'Sahna', layout: 'timer', minutes: 3,
  sub: 'Sahna: video ekranda, egasi gapiradi. 3:00 da «Rahmat».',
  notes: {
    do: 'Switch the projector to the presenter laptop for each video, back to this timer between demos if you need it, or keep the timer on the host\'s phone. Press T per presenter. Send the poll at demo 7.',
    say: ''
  }
},
{
  seg: '2:48', mod: 'Sahna', layout: 'cards', cols: 2,
  title: 'Ovoz natijasi va eng halol qaror',
  cards: [
    { h: 'Zal tanlovi', tone: 'acc', body: ['{{N-stol: ism, jarayon}}', '«Ertaga o‘zimda takrorlardim»'], art: 'd6-trophy' },
    { h: 'Eng halol qaror', tone: 'ok', body: ['{{ism: o‘zgartirish yoki to‘xtatish}}', '{{bitta gapda sababi}}'], art: 'scale' }
  ],
  foot: 'Faqat g‘alabaga qarsak chalinsa, xona g‘alaba [[o‘ylab topadi]].',
  notes: {
    do: 'Fill aloud, not on screen. The honest-decision mention is agreed with the head mentor in the break. If there was no change or stop decision, name the most carefully measured sheet instead.',
    say: 'UZ: "Bugun eng halol qaror uchun alohida rahmat: u to‘xtatdi yoki o‘zgartirdi va nima uchunligini raqam bilan aytdi."'
  }
},

/* ===================== 2:50-3:00 GRADUATION ===================== */
{
  seg: '2:50', mod: 'Bitiruv', layout: 'divider',
  time: '2:50 - 3:00',
  big: 'Bitiruv',
  sub: 'Siz bitta jarayonni o‘lchadingiz. Endi bu odat.',
  notes: { do: 'Transition.', say: '' }
},
{
  seg: '2:50', mod: 'Bitiruv', layout: 'steps',
  title: 'Bitiruv mezoni: uchta shart',
  steps: [
    'Kichik bitta vosita kamida bitta real tizimga ulangan||Telegram va jadval, CRM yoki 1C eksporti',
    'Hamkasbingiz undan 2 hafta foydalangan',
    'To‘plam 5 raqamlari natijani boshlang‘ich holat bilan solishtiradi'
  ],
  side: [
    { h: 'Hali bo‘lmasa', tone: 'acc', body: ['Mentor bir oy davomida yordam beradi', 'Bajarilganda bitiruv sertifikati'], art: 'd6-gradcap' }
  ],
  notes: {
    do: 'Curriculum line 112; mentor check 6.9.',
    say: 'UZ: "Sertifikat raqamning kattaligiga bog‘liq emas. U shu uch shartga bog‘liq."'
  }
},
{
  seg: '2:51', mod: 'Bitiruv', layout: 'cards', cols: 3,
  title: 'Kursdan keyin',
  cards: [
    { h: '1 oy mentor yordami', tone: 'acc', body: ['Stol chatida, o‘sha mentor', 'Kunduzgi savolga o‘sha kuni javob', '31-dekabr - 3-yanvar dam olish'], art: 'figures' },
    { h: 'Darslar va resurslar', body: ['Darslar yozuvi, umrbod', 'Birfoizbilim Premium, 6 oy', 'P57.UZ, umrbod'], art: 'book' },
    { h: '«PRAKTIK» hamjamiyati', tone: 'ok', body: ['1.0 va 2.0 bitiruvchilari bilan', 'Taklif havolasi mentordan', 'Yopiq guruh, so‘rov bilan kirish'], art: 'table' }
  ],
  foot: 'Sotuv sahifasida va’da qilinganlar [[aynan shular]].',
  notes: {
    do: 'Exactly the sales page list (S3). Do not add webinars or "any time of day". Response standard as in the course (mentor-handbook.md "Javob berish standarti": daytime question answered by 21:00 the same day, evening question by 12:00 next day): after-the-program/mentor-yordami.md. PRAKTIK: invite link is not yet created (THE PRAKTIK README); say the mentor sends it.',
    say: 'UZ: "Bir oy davomida savolingiz bo‘lsa, stol chatiga yozasiz. Kunduzi yozsangiz, o‘sha kuni javob beramiz."'
  }
},
{
  seg: '2:52', mod: 'Bitiruv', layout: 'statement',
  big: 'Sertifikatlar [[stolingizda]].',
  sub: 'Mentoringiz har biringizga topshiradi. Keyin stol bilan bitta surat.',
  art: 'certificate',
  notes: {
    do: 'All 8 tables at once, about 4 minutes. Two variants in identical envelopes (after-the-program/sertifikat-matni.md); nobody else sees which. Instructor walks the room and shakes hands.',
    say: 'UZ: "Olti hafta shu stolda ishladingiz. Sertifikatni ham shu stolda olasiz."'
  }
},
{
  seg: '2:56', mod: 'Bitiruv', layout: 'steps',
  title: 'Uy vazifasi: keyingi 30 kun',
  steps: [
    '30 kunlik rejani yozing (4-mashq)',
    'Sinovning 3-4-haftasi: To‘plam 5 ustunlari',
    'Jamoaga e’lon: avval har biri bilan yolg‘iz',
    '2-jarayon: To‘plam 1 suhbatlari',
    '30-kunda qisqa so‘rovnoma'
  ],
  side: [
    { h: 'Bilib qo‘ying', tone: 'acc', body: ['Bu vazifalar 19 ta kurs vazifasiga kirmaydi', 'Ular sizning biznesingiz uchun'], art: 'stairs' }
  ],
  notes: {
    do: 'homework.md. Say clearly that post-course tasks are not part of the 19 counted for the guarantee.',
    say: 'UZ: "Kurs vazifalari bugun yopildi. Endi vazifalar kurs uchun emas, kompaniyangiz uchun."'
  }
},
{
  seg: '2:57', mod: 'Bitiruv', layout: 'statement',
  big: 'Natijalar kechasi: [[23 yoki 24-yanvar]], guruhingiz kunida kechqurun.',
  sub: '4-5 haftalik raqam bilan. Hamkoringizni va sinovda ishlagan xodimingizni olib keling.',
  art: 'calendar',
  notes: {
    do: 'PENDING decision 06: delete this slide if the owner did not approve the results night. Saturday group Sat 23 Jan, Sunday group Sun 24 Jan 2027. If the date changed, edit the date here and in homework.md.',
    say: 'UZ: "Ikki hafta - birinchi raqam. Besh hafta - ishonchli raqam. Yanvarda shuni ko‘rsatamiz."'
  }
},
{
  seg: '2:58', mod: 'Bitiruv', layout: 'statement',
  art: 'chat',
  big: 'Bugun 21:00 gacha mentoringiz [[sizga shaxsan]] yozadi.',
  sub: '6 darsdan nechtasi va 19 vazifadan nechtasi tasdiqlangan. Rozi bo‘lmasangiz, shu kecha yozing: bosh mentor 3 kun ichida javob beradi.',
  notes: {
    do: 'Refund evidence transparency (run sheet, "Closing the refund evidence"): disputes reach the head mentor the same evening and are decided within 3 days; anything that changes refund eligibility is confirmed by the instructor (rule set for tonight, pending the owner). Never discuss refunds on stage; facts only.',
    say: 'UZ: "Hamma uchun bitta qoida. Har bir katakda dalil bor: nima, qayerda, qachon."'
  }
},
{
  seg: '2:59', mod: 'Bitiruv', layout: 'title',
  kicker: 'Praktikum 3.0 · Rahmat',
  big: 'Raqam bilan boshladingiz. Raqam bilan davom eting.',
  sub: 'Video fikr qoldirmoqchi bo‘lsangiz: darsdan keyin, yon devor yonida, 2 daqiqa.',
  notes: {
    do: 'Testimonials after close, voluntary, with the consent form (after-the-program/video-fikr.md): what you built, one number, what you would tell a friend.',
    say: 'UZ: "Rahmat. Olti hafta dam olish kuningizni berdingiz. Endi raqamlaringiz sizniki."'
  }
}
];
