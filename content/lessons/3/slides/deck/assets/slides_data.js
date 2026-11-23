/* Praktikum 3.0, Day 2 ("2-dars") deck content.
   On-screen text: Uzbek Latin. Notes (do/say): English, with Uzbek lines to say quoted as UZ.
   seg = run-of-show time for this slide (keep in sync with ../../instructor-run-sheet.md, which cites slide numbers).
   Inline markup: **bold**, [[accent]], {{placeholder}}; in steps, "main||small" adds a second line.
   Terminal lines (layout 'term'): "> " typed by the user, "~" dim, "+" green, "!" red.
   Prompts are copied from ../../exercises/*.md and ../../prompt-pack.md; demo results from ../../_build/sandbox/out/. */
window.SLIDES_DATA = [

/* ===================== 0:00-0:20 KIRISH, TO‘PLAM 1 TEKSHIRUVI ===================== */
{
  seg: '0:00', mod: 'Kirish', layout: 'title',
  kicker: 'Praktikum 3.0 · 2-dars',
  big: 'Claude Code va qaysi jarayondan boshlaymiz',
  sub: 'Bugun: kompaniya papkangiz, To‘plam 2 va birinchi reja. Hammasi o‘z noutbukingizda.',
  notes: {
    do: 'Slide on screen while people sit. Mentors are already at the tables with checklist codes 2.1-2.4.',
    say: 'UZ: "Xush kelibsiz. O‘tgan hafta xodimlaringiz bilan gaplashdingiz. Bugun shu suhbatlardan bitta jarayonni tanlaymiz va uni Claude Code bilan rejalashtiramiz."'
  }
},
{
  seg: '0:01', mod: 'Kirish', layout: 'cards', cols: 3,
  title: 'Soat 3:00 da sizda uchta narsa bo‘ladi',
  cards: [
    { h: 'Kompaniya papkasi', art: 'd2-folder', body: ['**kompaniya/** va **CLAUDE.md**', 'Claude kompaniyangizni biladi'] },
    { h: 'Tanlangan jarayon', art: 'check', tone: 'acc', body: ['To‘plam 2 jadvali va **matritsa**', 'Birinchi sinov uchun bitta jarayon'] },
    { h: 'Birinchi reja', art: 'd2-blueprint', body: ['**prd.md** va **tasks.md**', 'Kod yo‘q, avval reja'] }
  ],
  foot: 'Hammasi [[o‘z biznesingiz]] haqida, namunaviy kompaniya haqida emas.',
  notes: {
    do: 'Point at each card for 10 seconds. These are the three files mentors confirm at 2:57 (codes 2.5, 2.7, 2.8).',
    say: 'UZ: "Soat uchda har biringizning noutbukida shu uchta narsa bo‘ladi. Men emas, siz qilasiz."'
  }
},
{
  seg: '0:02', mod: 'Kirish', layout: 'agenda',
  title: 'Bugungi reja',
  items: [
    ['0:00', 'To‘plam 1 tekshiruvi'],
    ['0:20', '**Claude Code bilan tanishuv**||namoyish'],
    ['0:50', '**Kompaniya papkasi**||o‘z noutbukingizda'],
    ['1:20', '**To‘plam 2:** qaysi jarayondan boshlaymiz?'],
    ['1:50', 'Tanaffus', true],
    ['2:00', '**Avval reja:** reja rejimi va PRD'],
    ['2:30', '**Skill’lar**'],
    ['2:50', 'Uy vazifasi']
  ],
  side: [
    { h: 'Qotib qoldingizmi?', tone: 'acc', body: ['1. Skrinshot qiling', '2. Claude’dan so‘rang', '3. Keyin mentor'] },
    { h: 'Stolda', body: ['Claude Code **shpargalkasi**', 'Atamalar **lug‘ati**'] }
  ],
  notes: {
    do: 'Read the times quickly. Hold up the printed cheat sheet and glossary so everyone finds them.',
    say: 'UZ: "Bugun ham qoida bir xil: qotib qolsangiz, avval skrinshot, keyin Claude, keyin mentor."'
  }
},
{
  seg: '0:03-0:15', mod: 'Kirish', layout: 'steps',
  title: 'Stol tekshiruvi va papkani ochish',
  steps: [
    'Mentor B shakllaringizni ko‘radi||kamida 2 ta .md fayl',
    'Raqamlar xodim bilan tuzatilganmi?||[?] belgilari qolmagan',
    'B.9 har bir vazifada to‘ldirilgan||A, R, I yoki B',
    'Warp’da **claude** ochiladi',
    'Chatdagi zip faylni oching||2-dars-kompaniya-papkasi.zip'
  ],
  side: [
    { h: 'B shakli yo‘qmi?', tone: 'warn', body: ['Bugun **Baraka Office** fayllari bilan ishlang', 'Haqiqiysini chorshanbagacha olib keling'] },
    { h: 'Zip ochilmadimi?', body: ['Mentorda **USB fleshka** bor'] }
  ],
  notes: {
    do: 'Walk the tables for 12 minutes. Mentors run 2.1-2.4 and note results in the tracker. Anyone whose Claude Code does not start: mentor fixes with the week-0 doctor script; if not fixed by 0:20, the participant pairs with a neighbour for the demo block.',
    say: 'UZ: "B shakli yo‘q bo‘lsa, xavotir olmang: bugun Baraka Office fayllari bilan ishlaysiz, o‘zingiznikini chorshanbagacha olib kelasiz."\nFallback for no Form B is FAQ X-02 in the mentor handbook.'
  }
},
{
  seg: '0:15-0:20', mod: 'Kirish', layout: 'statement', art: 'magnifier',
  big: 'Bitta kutilmagan topilma',
  sub: 'Ikki kishi, bir daqiqadan: To‘plam 1 suhbatida nimani bilib oldingiz?',
  foot: 'Bugun shu ro‘yxatlardan [[bitta tanlov]] qilamiz.',
  notes: {
    do: 'Two volunteers, 60-90 seconds each, microphone. Tables nominate, you pick. No volunteer: tell the Baraka finding below.',
    say: 'UZ fallback: "Baraka Office’da sotuvchilar mijozga «3 kunda yetkazamiz» deydi. Shartnomada 7 ish kuni. Bu suhbat qilinmaguncha hech kim bilmagan."\nUZ link: "Endi shu ro‘yxatlardan bitta jarayonni tanlaymiz. Lekin avval yangi asbob bilan tanishamiz."'
  }
},

/* ===================== 0:20-0:50 CLAUDE CODE BILAN TANISHUV ===================== */
{
  seg: '0:20', mod: 'Claude Code', layout: 'divider',
  time: '0:20-0:50', big: 'Claude Code bilan tanishuv',
  sub: 'Kod degan so‘zni unuting. Bu dasturlash vositasi emas. Bu kompyuteringiz yonida o‘tirib ishlaydigan, yollagan mutaxassisingiz. Kod - u biladigan ishlardan faqat bittasi.',
  notes: {
    do: 'Say the opening line slowly, word for word. This is where fear peaks (curriculum Day 2). Pause after "mutaxassisingiz".',
    say: 'UZ: "Kod degan so‘zni unuting. Bu dasturlash vositasi emas. Bu kompyuteringiz yonida o‘tirib ishlaydigan, yollagan mutaxassisingiz. Kod - u biladigan ishlardan faqat bittasi."'
  }
},
{
  seg: '0:23', mod: 'Claude Code', layout: 'cards', cols: 2,
  title: 'Model va harness',
  cards: [
    { h: 'Model = dvigatel', art: 'd2-engine', body: ['Opus, Sonnet, Haiku', 'O‘ylaydi va matn yozadi', 'O‘zi hech narsaga tega olmaydi'] },
    { h: 'Harness = mashina', art: 'd2-car', tone: 'acc', body: ['Modelning atrofidagi dastur', 'Fayl o‘qiydi, buyruq beradi, brauzer ochadi', '**Claude Code** - shunday harness'] }
  ],
  foot: 'Bir xil dvigatel, boshqa mashina: [[asbobni tanlash ham modelni tanlashdek muhim]].',
  notes: {
    do: 'Demo 1 starts here (demos/demo-1-bir-miya-uch-eshik.md). 2 minutes on this slide.',
    say: 'UZ: "Opus - dvigatel. Chat oynasi bitta mashina, Claude Code boshqa mashina. Dvigatel bir xil, lekin biri faqat gapiradi, ikkinchisi qo‘l bilan ishlaydi: faylni ochadi, yozadi, saqlaydi."'
  }
},
{
  seg: '0:25', mod: 'Claude Code', layout: 'cards', cols: 3,
  title: 'Bitta miya, uchta eshik',
  cards: [
    { h: 'Claude ilovasi', art: 'app', body: ['Brauzer yoki telefon', 'Chat va uzoq vazifalar (sobiq **Cowork** endi shu oynada)', 'Faylni **yuklaysiz**'] },
    { h: 'Claude desktop', art: 'd2-laptop', body: ['Kompyuterga o‘rnatiladi', 'Papkalaringizga kira oladi, ilova ochiq paytda', '**Code** bo‘limi ham bor'] },
    { h: 'Claude Code', art: 'terminal', tone: 'acc', body: ['Terminalda (bizda Warp)', '**Papkada ochiladi**: hamma fayl qo‘l ostida', 'Buyruq beradi, fayl yozadi'] }
  ],
  foot: 'Bugun [[Claude Code]] bilan ishlaymiz: kompaniya ma’lumoti diskda turadi, chatda emas.',
  notes: {
    do: 'Do not spend time on menu names: interfaces differ by account and rollout.',
    say: 'Facts checked 2026-11-03: chat and Cowork are now one Claude window; local files and computer use work only while Claude Desktop is open (support article 16761823). Chat uploads take 500 MB per file, 20 files per chat (support article 8241126), so do not say "20 MB limit". The point is not size: Claude Code opens the whole folder without uploading anything.'
  }
},
{
  seg: '0:26', mod: 'Claude Code', layout: 'term',
  title: 'Bir savol: papkani Claude Code o‘zi ochadi',
  termTitle: '~/Praktikum/baraka/kompaniya · claude',
  termNote: 'haqiqiy natija, qisqartirilgan',
  lines: [
    '> hujjatlar/ papkasidagi hujjatlar va kit1-interviews/ dagi intervyularni solishtir. Bir-biriga zid raqamlar bormi: yetkazish muddati, chegirma, kafolat? Qaysi fayl, qaysi gap - jadval qilib ko‘rsat.',
    '~● Intervyular yetkazish muddati va chegirmada rasmiy hujjatlarga zid chiqdi.',
    '',
    '|Mavzu|Rasmiy hujjat|Boshqa joyda|',
    '!|Yetkazish|7 ish kuni (shartnoma, 3.1)|«3 ish kunida» (jamshid-form-b.md)|',
    '!|Chegirma|5% / 10% (prays-list, 5)|«12-15%» (jamshid-form-b.md)|',
    '!|Kafolat|24 va 12 oy (shartnoma, 4.1)|«36 oy» (KP)|',
    '!|Servis|5 ish kuni (shartnoma, 4.2)|«48 soat ichida» (KP)|'
  ],
  side: [
    { h: 'Chatda', tone: 'warn', body: ['Har bir faylni **yuklaysiz**', 'Fayl o‘zgarsa, qayta yuklaysiz'] },
    { h: 'Claude Code’da', tone: 'ok', body: ['Papkani **o‘zi ochadi**', 'Qaysi fayldan olganini aytadi'] }
  ],
  notes: {
    do: 'Run the prompt live in Warp tab 2 (~/Praktikum/baraka/kompaniya). This slide is the fallback and shows the real 2026-11-03 run (Sonnet 5.5), shortened: demos/expected/demo-1-ziddiyatlar.md. The run also found that Malika thinks the discount rule is not written down (it is, price list section 5), which is why every discount question goes to Jamshid aka. In chat, show the upload button only; do not run the chat version live.',
    say: 'UZ: "Chatda men 7 ta faylni bittalab yuklashim kerak. Claude Code’da papkada turibman: u o‘zi ochadi, o‘qiydi va qaysi fayldan olganini aytadi."\nWhile it runs: "Bu ziddiyatlar real kompaniyalarda doim bor: rahbar bir narsa deydi, hujjatda boshqasi."'
  }
},
{
  seg: '0:28', mod: 'Claude Code', layout: 'cards', cols: 2,
  title: 'Warp: bu ham chat oynasi',
  cards: [
    { h: 'Tepada', art: 'terminal', body: ['Qaysi **papkada** turganingiz', 'Masalan: ~/praktikum/kompaniya', 'Claude faqat shu papkada ishlaydi'] },
    { h: 'Pastda', art: 'chat', tone: 'acc', body: ['Oddiy o‘zbekcha yozasiz', '.md fayllar chiroyli ochiladi', 'Qora ekrandan qo‘rqmang'] }
  ],
  foot: 'Terminal - kompyuter bilan [[matn orqali]] gaplashadigan oyna. Xolos.',
  notes: {
    do: 'Show the folder path at the top of Warp, then open one Form B .md file in Warp so the room sees it render.',
    say: 'UZ: "Bu yerda hech narsa portlamaydi. Bu ham chat oynasi, faqat kompyuteringiz ichida."'
  }
},
{
  seg: '0:30', mod: 'Claude Code', layout: 'keys',
  title: 'Oltita tugma yetarli',
  keys: [
    ['Esc', '«Labbay?» Claude to‘xtaydi||suhbat va fayllar joyida qoladi'],
    ['Shift+Tab', 'Rejimlar: Manual, Accept edits, Plan, Auto||Windows’da ishlamasa: Alt+M'],
    ['/model', 'Model almashtirish: haiku, sonnet, opus'],
    ['/usage', 'Limitdan qancha qoldi'],
    ['/compact', 'Uzun suhbatni qisqartirish'],
    ['/rewind', 'Claude tahrir qilgan faylni qaytarish||yoki Esc ni ikki marta bosing']
  ],
  side: [
    { h: 'Qolgani', tone: 'acc', body: ['Stoldagi **shpargalkada**', 'Yodlash shart emas'] },
    { h: 'Yangi mavzu', body: ['Yangi suhbat: **/clear**', 'Kechagi suhbat: **/resume**'] }
  ],
  notes: {
    do: 'Two minutes. Demonstrate Esc and Shift+Tab live (show the mode label at the bottom of the input box). Do not walk the full command list; 2.0 lost the room on the commands block.',
    say: 'UZ: "Esc - bu «Labbay?». Claude to‘xtaydi, lekin hech narsa o‘chmaydi. Shift+Tab rejimni almashtiradi: oddiy, tahrirlarga ruxsat, reja. Qolganini shpargalkadan topasiz."\nFacts (code.claude.com/docs, 2026-11-03): Shift+Tab cycles Manual, Accept edits, Plan, then Auto; Windows falls back to Alt+M; /usage has aliases /cost and /stats; /rewind restores files Claude edited, not files changed by shell commands.'
  }
},
{
  seg: '0:33-0:36', mod: 'Claude Code', layout: 'live', art: 'enterkey',
  label: 'HAMMA · 3 DAQIQA',
  instr: 'Warp’ni oching, **claude** deb yozing. Keyin: «Salom! Bu papkada nima bor? Oddiy so‘zlar bilan ayt.»',
  path: 'Birinchi gap. Hech narsa o‘rnatmaymiz.',
  side: [
    { h: 'Chiqmadimi?', tone: 'warn', body: ['Qo‘lni ko‘taring: mentor keladi', 'Qo‘shningiz ekraniga qarang'] },
    { h: 'Chiqdimi?', tone: 'ok', body: ['Claude papkangizdagi fayllarni sanab beradi'] }
  ],
  notes: {
    do: 'Everyone types one line. Mentors type for anyone stuck. Nobody installs anything now. Hard stop at 0:36.',
    say: 'UZ: "Hamma: Warp, claude, va bitta gap. Uch daqiqa."'
  }
},
{
  seg: '0:36-0:42', mod: 'Claude Code', layout: 'term',
  title: 'Desktop’ni tartibga keltirish',
  termTitle: '~/Desktop · claude',
  termNote: 'namuna',
  lines: [
    '> Bu papkadagi fayllarni ko‘rib chiq. Turiga qarab papkalarga ajratish rejasini tuz... (1-mashq prompti)',
    '~● 40 ta fayl topildi',
    'Reja: 6 ta papka',
    '  Hujjatlar · Rasmlar · Jadvallar',
    '  Arxivlar · O‘rnatish fayllari · Boshqalar',
    'Ko‘chiraymi?',
    '> ha',
    '+● 40 ta fayl ko‘chirildi, 0 ta o‘chirildi',
    '+● Jurnal: tartib-jurnal.md',
    '> tartib-jurnal.md bo‘yicha faqat Arxivlar papkasidagi fayllarni joyiga qaytar',
    '+● Arxivlar papkasidagi 3 ta fayl Desktop’ga qaytdi'
  ],
  side: [
    { h: 'Qaytarish', tone: 'acc', body: ['Jurnal bo‘yicha: «...ni qaytar»'] },
    { h: 'Diqqat', tone: 'warn', body: ['/rewind buyruq bilan ko‘chirilgan faylni **qaytarmaydi**', 'Shuning uchun jurnal yoki nusxa'] }
  ],
  notes: {
    do: 'Demo 2 (demos/demo-2-desktop-tartibi.md) in Warp tab 1 on the demo user. The Desktop was filled by setup-demo-machine.sh. Show plan, approve, show the log, undo one folder. Counts on the slide are illustrative; say the real numbers from your run.',
    say: 'UZ: "Oddiy o‘zbekcha. Avval reja, keyin ish. Hech narsa o‘chmadi. Va hamma ko‘chirish jurnalda: istasam, qaytaraman."\nFact (code.claude.com/docs/en/checkpointing, 2026-11-03): files changed only by shell commands are not tracked by /rewind. That is why every folder chore asks for a move log.'
  }
},
{
  seg: '0:42-0:46', mod: 'Claude Code', layout: 'live',
  label: 'JONLI · 4 DAQIQA',
  instr: '«Illustrator’ni och, yangi hujjat yarat va o‘rtasiga ko‘k doira chiz.»',
  path: 'Claude Code faqat kod uchun emas',
  side: [
    { h: 'Nimani ko‘rasiz', body: ['Claude boshqa dasturni boshqaradi', 'Siz faqat tasvirlab berasiz'] },
    { h: 'Ishlamasa', tone: 'warn', body: ['Keynote’da xuddi shu', 'Yoki brauzerda SVG doira'] }
  ],
  notes: {
    do: 'Demo 3 (demos/demo-3-boshqa-dastur.md). Hard stop at 0:46 whatever happens. If Illustrator is not installed or the run stalls, switch to the Keynote fallback after 90 seconds.',
    say: 'UZ: "Claude Code kod yozishi shart emas. U kompyuterdagi boshqa dasturni ham ochib, ishlata oladi."\nDo not call this "computer use is everywhere": CLI computer use is a macOS research preview on Pro and Max (code.claude.com/docs/en/computer-use, 2026-11-03).'
  }
},
{
  seg: '0:46', mod: 'Claude Code', layout: 'cards', cols: 2,
  title: 'Odat: skrinshot qilib so‘rang',
  cards: [
    { h: 'Qotib qoldingizmi?', art: 'camera', tone: 'acc', body: ['1. Xatoni **skrinshot** qiling', '2. Claude Code’ga qo‘ying', '3. «Bu nima? Qanday tuzataman?»'] },
    { h: 'Rasm qanday qo‘yiladi', art: 'clipboard', body: ['macOS: **Ctrl+V** (Cmd+V emas)', 'Windows: **Alt+V**', 'Bo‘lmasa: rasm faylini oynaga sudrang'] }
  ],
  foot: 'Asbobning o‘zi [[birinchi ustozingiz]]. Mentor ikkinchi.',
  notes: {
    do: 'Paste demos/inputs/xato-skrinshot.png into Claude Code (Ctrl+V on macOS). If paste does nothing in Warp, drag the PNG into the window. Claude explains the error and the fix.',
    say: 'UZ: "Bugundan boshlab mentorlar sizdan birinchi bo‘lib so‘raydi: skrinshot qilib Claude’dan so‘radingizmi?"\nFact (code.claude.com/docs/en/interactive-mode, 2026-11-03): macOS Ctrl+V (Cmd+V only in iTerm2), Windows Alt+V.'
  }
},
{
  seg: '0:48', mod: 'Claude Code', layout: 'statement', art: 'figures',
  big: 'Odat: «5 yoshli bolaga tushuntir»',
  sub: 'Yangi so‘z chiqdimi? So‘rang: «Harness nima? 5 yoshli bolaga tushuntirgandek ayt.» Uyalmang: bu eng tez o‘rganish yo‘li.',
  foot: 'Atamalar lug‘atining pastida ham [[shu odat]] yozilgan.',
  notes: {
    do: 'Type the question live in Claude Code and read the answer aloud.',
    say: 'UZ: "Bu kursda ko‘p yangi so‘z bo‘ladi: harness, PRD, skill. Tushunmasangiz, Claude’ning o‘zidan so‘rang. U sizni kulmaydi."'
  }
},

/* ===================== 0:50-1:20 KOMPANIYA PAPKASI ===================== */
{
  seg: '0:50', mod: 'Kompaniya papkasi', layout: 'divider',
  time: '0:50-1:20', big: 'Kompaniya papkasi',
  sub: 'Claude kompaniyangizni bir marta o‘qiydi va har safar eslaydi.',
  notes: { do: 'Ten seconds, then straight to Demo 4.', say: '' }
},
{
  seg: '0:50-0:53', mod: 'Kompaniya papkasi', layout: 'cards', cols: 2,
  title: '«Kafolat necha yil? Chirchiqqa yetkazish bepulmi?»',
  cards: [
    { h: 'CLAUDE.md siz', tone: 'warn', body: ['Raqamlar to‘g‘ri: shartnomadan **24 va 12 oy**, km uchun **8 000 so‘m**', 'Lekin ikkilanadi: «KP 36 oy deydi. **Rahbariyatdan so‘rang**, KP to‘g‘ri bo‘lsa, javobni o‘zgartiraman»', '«Assalomu alaykum!»'] },
    { h: 'CLAUDE.md bilan', tone: 'ok', body: ['«KPdagi 36 oy va bepul yetkazish **xato**, shartnoma to‘g‘ri»', '«**Hurmatli [Ism] aka / opa**», «Siz»', 'Masofani **@baraka_logistika** dan so‘rang: km × 8 000 so‘m [?]'] }
  ],
  foot: 'Hujjatlarni Claude o‘zi ham o‘qiydi. CLAUDE.md qo‘shadigani: [[qaysi hujjat to‘g‘ri]], qanday murojaat qilish, kimga yo‘naltirish.',
  notes: {
    do: 'Demo 4 (demos/demo-4-claude-md-va-xotira.md). Same question in ~/Praktikum/baraka-chatsiz/kompaniya (no CLAUDE.md), then in ~/Praktikum/baraka/kompaniya. Both answers on this slide are real Claude Code runs (Sonnet 5.5, 2026-11-03): demos/expected/claude-md-siz.md and claude-md-bilan.md. Do not claim the first answer is wrong: it is right on facts and weak on judgement.',
    say: 'UZ: "Birinchi javobda raqamlar to‘g‘ri, chunki Claude Code hujjatlarni o‘zi o‘qidi. Lekin oxiriga qarang: «rahbariyatdan so‘rang». Ikkinchisi ikkilanmaydi: KP xato, shartnoma to‘g‘ri. Mijozga bizning uslubda yozdi va Otabek akaning Telegramini ko‘rsatdi. Bularning hammasi bitta faylda: CLAUDE.md."'
  }
},
{
  seg: '0:53-0:59', mod: 'Kompaniya papkasi', layout: 'prompt', do: true,
  title: 'Mashq 1: birinchi topshiriq',
  termTitle: 'Claude Code · ~/Downloads',
  prompt: 'Bu papkadagi fayllarni ko‘rib chiq.\nUlarni turiga qarab papkalarga ajratish rejasini tuz: Hujjatlar, Rasmlar, Jadvallar, Arxivlar, O‘rnatish fayllari, Boshqalar.\nAvval rejani jadval qilib ko‘rsat: qaysi papkaga nechta fayl ketadi.\nMen «ha» desam, ko‘chir.\nHech bir faylni o‘chirma va nomini o‘zgartirma.\nHar bir ko‘chirishni tartib-jurnal.md fayliga yoz: qaysi fayl, qayerdan, qayerga.\nOxirida nechta fayl qayerga ketganini qisqa ayt.',
  side: [
    { h: 'Ochish', body: ['macOS: **cd ~/Downloads**', 'Windows: **cd $HOME\\Downloads**', 'Keyin: **claude**'] },
    { h: 'Tayyor', tone: 'ok', body: ['Fayllar papkalarda', '**Hech narsa o‘chirilmagan**'] }
  ],
  notes: {
    do: 'Exercise 1 (exercises/01-birinchi-topshiriq.md), 6 minutes. If you are behind schedule at 0:53, skip it: it becomes homework.',
    say: 'UZ: "Birinchi ish - kichik va xavfsiz: Downloads papkasi. Hech narsa o‘chmaydi, hammasi jurnalda."'
  }
},
{
  seg: '0:59', mod: 'Kompaniya papkasi', layout: 'tree',
  title: 'Kompaniyangizning bitta papkasi',
  side: [
    { h: 'Bitta papka', tone: 'acc', body: ['Har bir to‘plam natijasi **.md** fayl bo‘lib shu yerga tushadi', 'Claude Code hammasini o‘qiydi'] },
    { h: '6-darsgacha', art: 'd2-folder', body: ['Suhbatlar, baholash, agent, kod va natijalar bir joyda'] }
  ],
  code: 'kompaniya/\n  CLAUDE.md          # kompaniya, qoidalar\n  hujjatlar/         # prays-list, shartnoma\n  kit1-interviews/   # suhbatlar, B shakli\n  kit2-scoring/      # baholash, matritsa\n  kit3-agent/        # agent yo‘riqnomasi\n  kit4-people/       # ko‘nikmalar xaritasi\n  kit5-pilot/        # reja, raqamlar\n  app/               # vositaning o‘zi (3-dars)\n  .claude/skills/    # skill’lar (2:30 dan)',
  notes: {
    do: 'Point at kit1-interviews: "your Form B files go here today". The zip already holds this skeleton with the kit templates and a CLAUDE.md template.',
    say: 'UZ: "Shu papka olti hafta davomida kompaniyangizning xotirasi bo‘ladi. To‘plamlar qog‘oz emas, Claude o‘qiydigan kontekst bo‘ladi."'
  }
},
{
  seg: '0:59-1:14', mod: 'Kompaniya papkasi', layout: 'steps', do: true,
  title: 'Mashq 2: kompaniya papkasi',
  steps: [
    'Zip ichidagilarni uy papkangizdagi **praktikum** ga qo‘ying||Windows: «Extract All», joy C:\\Users\\ismingiz',
    'B shakllaringizni **kit1-interviews/** ga qo‘ying',
    'Warp: **cd ~/praktikum/kompaniya**||xato bo‘lsa: «cd », keyin papkani Warp’ga torting',
    '**claude**, keyin **/init**',
    'Intervyu prompti bilan CLAUDE.md ni to‘ldiring'
  ],
  side: [
    { h: 'Tayyor', tone: 'ok', body: ['Claude kompaniya haqidagi savolga **CLAUDE.md dan** to‘g‘ri javob beradi'] },
    { h: '/init sekin yoki g‘alati', body: ['O‘tkazib yuboring', 'Faqat intervyu prompti yetarli'] }
  ],
  notes: {
    do: 'Exercise 2 (exercises/02-kompaniya-papkasi.md). Show each step once on screen, then walk. Mentors: Finder hides .claude; nothing to do with it now.',
    say: 'UZ: "/init papkani o‘qiydi va CLAUDE.md ga taklif yozadi. Keyin Claude sizdan savol so‘rab, bo‘sh joylarni to‘ldiradi."\nFact (code.claude.com/docs/en/memory, 2026-11-03): if a CLAUDE.md exists, /init suggests improvements instead of overwriting it.'
  }
},
{
  seg: '1:05-1:14', mod: 'Kompaniya papkasi', layout: 'prompt', do: true,
  title: 'CLAUDE.md ni intervyu bilan to‘ldiramiz',
  termTitle: 'Claude Code · kompaniya',
  prompt: 'CLAUDE.md ni o‘qi.\nKvadrat qavsda qolgan va [?] bilan belgilangan joylarni men bilan birga to‘ldiramiz.\nMenga savol ber, bir xabarda 3 tadan ko‘p emas.\nJavoblarimni CLAUDE.md ga yoz, faylni 200 qatordan qisqa saqla.\nRaqam to‘qima: men bilmagan joyni [?] bilan qoldir.\nParol, karta raqami yoki token aytsam, yozma va meni ogohlantir.',
  side: [
    { h: 'Tekshiruv savoli', tone: 'acc', body: ['«Faqat CLAUDE.md ga tayanib javob ber: biz nima sotamiz, asosiy mijozimiz kim va qaysi tizimlarda ishlaymiz?»'] },
    { h: 'Yozmang', tone: 'warn', body: ['Parol, karta, bot tokeni'] }
  ],
  notes: {
    do: 'Leave this slide up until 1:14. The check question is the done-test for code 2.5.',
    say: 'UZ: "Bu «meni intervyu qil» odati: Claude siz haqingizda taxmin qilmaydi, so‘raydi."'
  }
},
{
  seg: '1:14-1:20', mod: 'Kompaniya papkasi', layout: 'prompt', do: true,
  title: 'Mashq 3: global ko‘rsatmalar',
  termTitle: 'Har bir suhbat uchun 5 ta qoida',
  prompt: '- Uzun tire belgisini ishlatma, oddiy chiziqcha (-) ishlat.\n- Ortiqcha gap va maqtovsiz, qisqa va aniq yoz.\n- Men xato bo‘lsam yoki yaxshiroq yo‘l bo‘lsa, ochiq ayt va sababini tushuntir.\n- Hozir 2026-yil. Yangilik, narx yoki qonun qidirganda shu yilni hisobga ol.\n- Men bilan o‘zbek tilida gaplash. Yangi atamani birinchi marta ishlatganda oddiy so‘zlar bilan tushuntir.',
  side: [
    { h: 'Claude ilovasi', body: ['Sozlamalar → **Your Claude** → **Instructions**', 'Eski ko‘rinishda: Account'] },
    { h: 'Claude Code', tone: 'acc', body: ['**~/.claude/CLAUDE.md**', '«Shu qoidalarni ~/.claude/CLAUDE.md ga qo‘sh» deb so‘rang'] }
  ],
  notes: {
    do: 'Exercise 3 (exercises/03-global-korsatmalar.md). Claude Code asks permission to write outside the folder: approve. If someone cannot find the app menu, the Claude Code part is enough today.',
    say: 'UZ: "Kompaniya qoidalari CLAUDE.md da. Sizning shaxsiy qoidalaringiz esa hamma suhbatda ishlaydi."\nFact (support.claude.com article 10185728, 2026-11-03): Settings, "Your Claude" (older layout "Account"), "Instructions".'
  }
},

/* ===================== 1:20-1:50 TO‘PLAM 2 ===================== */
{
  seg: '1:20', mod: 'To‘plam 2', layout: 'divider',
  time: '1:20-1:50', big: 'To‘plam 2: Qaysi jarayondan boshlaymiz?',
  sub: 'B shakllaringizdan jarayonlar, ballar va bitta tanlov.',
  notes: { do: 'Switch to Warp tab 2 (Baraka folder) and run /model sonnet before you start Demo 5.', say: '' }
},
{
  seg: '1:20', mod: 'To‘plam 2', layout: 'table',
  title: 'Har bir jarayonga oltita ball',
  lead: '**Jarayon** - boshlanishi va natijasi bor vazifalar zanjiri: «savol kelganidan to‘g‘ri javob ketguncha».',
  head: ['Kod', 'Mezon', '1 ball', '5 ball'],
  colw: [0.55, 1.7, 3, 3],
  rows: [
    ['A.2', 'Takrorlanishi', 'oyiga bir marta', 'kuniga bir necha marta'],
    ['A.3', 'Ketadigan vaqt', 'haftasiga bir necha daqiqa', 'haftasiga 10 soatdan ko‘p'],
    ['A.4', 'Aniq qoidasi bor', 'har bir holat har xil', 'har doim bir xil qadamlar'],
    ['A.5', 'Ma’lumot raqamli', 'qog‘ozda yoki odamlar yodida', 'allaqachon tizim yoki jadvalda'],
    ['A.6', 'Xatosi arzon', 'xato pul yoki ishonchni yo‘qotadi', 'xatoni sezish va to‘g‘rilash oson'],
    ['A.7', 'Mijozga ta’siri', 'faqat ichki jarayon', 'mijoz buni kutib turadi']
  ],
  notes: {
    do: 'Demo 5 (demos/demo-5-kit2-fayllardan.md) starts. The scale is the Kit 2 Form A scale, word for word (kits/KIT_02).',
    say: 'UZ: "Bitta vazifa emas, zanjir: bir nechta xodimning ishi. Baraka’da: Zarina savolni oladi, Malika narxni qidiradi, Jamshid aka chegirmani aytadi. Bu bitta jarayon."'
  }
},
{
  seg: '1:22', mod: 'To‘plam 2', layout: 'formula',
  title: 'Ikki son va bitta chegara',
  rows: [
    { name: 'Qiymat', code: 'A.8', tone: 'acc', terms: ['A.2|Takrorlanishi', 'A.3|Vaqt', 'A.7|Mijoz'], range: '3-15', rangeLabel: 'har biri 1-5' },
    { name: 'Osonlik', code: 'A.9', terms: ['A.4|Qoida', 'A.5|Raqamli', 'A.6|Xato arzon'], range: '3-15', rangeLabel: 'har biri 1-5' }
  ],
  exampleLabel: 'Baraka, 1-jarayon',
  example: ['Qiymat **15** = 5 + 5 + 5', 'Osonlik **10** = 4 + 4 + 2'],
  foot: 'Ikkalasi [[9 dan katta]] bo‘lsa: birinchi sinov uchun nomzod.',
  notes: {
    do: 'Point at the sums: every cell shows its working ("Show your work" habit, Day 1).',
    say: 'UZ: "Qiymat: qancha tez-tez, qancha vaqt, mijozga qanchalik ta’sir. Osonlik: qoida bormi, ma’lumot raqamlimi, xato arzonmi. Ikkalasi 9 dan oshsa - nomzod."'
  }
},
{
  seg: '1:23', mod: 'To‘plam 2', layout: 'matrix',
  title: 'Baraka Office: 8 jarayon matritsada',
  threshold: 9, chosen: 1,
  xLabel: 'Osonlik (A.9)', yLabel: 'Qiymat (A.8)',
  quads: { tr: 'Birinchi sinov', tl: 'Foydali, puxta reja kerak', br: 'Oson, lekin foydasi kichik', bl: 'Hozircha tegmang' },
  dots: [
    { n: 1, name: '**Narx, qoldiq, chegirma, muddat savoli**', value: 15, ease: 10 },
    { n: 2, name: 'Kiruvchi qo‘ng‘iroq', value: 15, ease: 6 },
    { n: 3, name: 'amoCRM yuritish [?]', value: 12, ease: 10 },
    { n: 4, name: 'Chiquvchi qo‘ng‘iroq', value: 13, ease: 6 },
    { n: 5, name: 'Kunlik savdo hisoboti', value: 9, ease: 14 },
    { n: 6, name: 'KP [?]', value: 12, ease: 12 },
    { n: 7, name: 'Instagram va Telegram xabarlari', value: 14, ease: 9 },
    { n: 8, name: 'Yangi murojaat menejerga', value: 11, ease: 12 }
  ],
  notes: {
    do: 'Open ~/Praktikum/baraka-tayyor/kompaniya/kit2-scoring/matrix.html in the browser if you want the full page. Dots and sums are the kits package’s Baraka example (kits/namunalar/baraka-office/kit2-scoring/form-a-scoring.md, a real /kit2 run), copied into company-folder-starter/baraka-office/. Owner correction to show: process 6 (KP) A.6 from 3 to 2, Osonlik 13 to 12, because an old price already cost 350 000 so‘m.',
    say: 'UZ: "Yuqori o‘ngda to‘rtta nomzod: 1, 3, 6 va 8. 3 va 6 da [?] bor, ya’ni bir raqam hali tasdiqlanmagan. Qiymati eng katta va [?] siz jarayon - 1: narx, qoldiq, chegirma va muddat savoli. Kiruvchi va chiquvchi qo‘ng‘iroqlar foydali, lekin jonli suhbat: puxta reja kerak."\nReal Claude Code runs on the same three Form B files group the processes differently each time (day-2/_build/sandbox/out/c): the owner reads every row and corrects it with a reason.'
  }
},
{
  seg: '1:25-1:40', mod: 'To‘plam 2', layout: 'prompt', do: true,
  title: 'Mashq 4: To‘plam 2 ballari',
  termTitle: 'Claude Code · kompaniya · /model sonnet',
  dense: true,
  prompt: 'kit1-interviews/ papkasidagi barcha *-form-b.md fayllarini o‘qi (nomi ism- bilan boshlanadigan bo‘sh andozalarni o‘tkazib yubor).\nUlardan 8 tagacha jarayon ajrat. Jarayon - boshlanishi va natijasi bor vazifalar zanjiri, unga bir nechta xodimning vazifasi kirishi mumkin.\nHar bir jarayon uchun qaysi vazifalar kirganini fayl va qator raqami bilan yoz, haftalik soatni B.4 lardan qo‘shib, hisobi bilan ko‘rsat.\nKeyin kit2-scoring/form-a-scoring.md andozasidagi shkala bo‘yicha A.2-A.7 ni 1 dan 5 gacha bahola va har bir ball uchun bitta qisqa sabab yoz.\nA.8 Qiymat = A.2 + A.3 + A.7, A.9 Osonlik = A.4 + A.5 + A.6; katakka hisobi bilan yoz, masalan 13 (4+5+4).\nRaqam to‘qima: B shaklida [?] bo‘lgan raqamga tayangan ball ham [?] bo‘lsin.\nAvval jadvalni menga chatda ko‘rsat. Men «yoz» desam, form-a-scoring.md ga yoz.',
  side: [
    { h: 'Model', body: ['**/model sonnet** (yoki haiku)'] },
    { h: 'Tayyor', tone: 'ok', body: ['Har bir ballning sababi bor', 'Kamida **bitta ballni** o‘zingiz tuzatdingiz', 'form-a-scoring.md saqlandi'] }
  ],
  notes: {
    do: 'Exercise 4 (exercises/04-kit2-baholash.md), 15 minutes. Mentors check: every score has a reason, at least one score corrected by the owner with a reason, sums shown. Prompt goes wrong: mentor installs /kit2 from the starter skills folder for that participant.',
    say: 'UZ: "Claude qo‘ygan ballar - qoralama. Har birini o‘qing. Rozi bo‘lmasangiz: «3-jarayonda A.6 ni 2 qil, chunki ... Yig‘indini qayta hisobla.»"'
  }
},
{
  seg: '1:40-1:47', mod: 'To‘plam 2', layout: 'prompt', do: true,
  title: 'Mashq 5: matritsa',
  termTitle: 'Claude Code · kompaniya',
  dense: true,
  prompt: 'kit2-scoring/form-a-scoring.md dagi Qiymat (A.8) va Osonlik (A.9) bo‘yicha matritsa chiz va kit2-scoring/matrix.html sahifasi qilib saqla.\nGorizontal o‘q - Osonlik, vertikal o‘q - Qiymat, ikkalasi 3 dan 15 gacha, chegara 9 da.\nTo‘rt qism nomi: yuqori o‘ngda «Birinchi sinov», yuqori chapda «Foydali, puxta reja kerak», pastki o‘ngda «Oson, lekin foydasi kichik», pastki chapda «Hozircha tegmang».\nHar bir jarayon raqamli nuqta bo‘lsin, yonida raqam va nom bilan ro‘yxat.\nSahifa internetsiz ishlasin: tashqi shrift va kutubxona ishlatma.\nKeyin kit2-scoring/form-b-matrix.md dagi «Matritsadagi nuqtalar» jadvalini to‘ldir va sahifani brauzerda och.',
  side: [
    { h: 'Tayyor', tone: 'ok', body: ['Brauzerda **raqamli nuqtalar**', 'form-b-matrix.md to‘ldirilgan'] },
    { h: 'Sahifa buzildimi?', tone: 'warn', body: ['Mentor **/kit2** ni o‘rnatadi: u kurs andozasidan chizadi'] }
  ],
  notes: {
    do: 'Exercise 5 (exercises/05-kit2-matritsa.md), 7 minutes. macOS opens the page with: open kit2-scoring/matrix.html; Windows: start kit2-scoring\\matrix.html.',
    say: 'UZ: "Matritsa tanlovni ko‘rinadigan qiladi: yuqori o‘ngdagi nuqtalar - birinchi nomzodlar."'
  }
},
{
  seg: '1:47-1:50', mod: 'To‘plam 2', layout: 'cards', cols: 3,
  title: 'Mashq 6: qaysi ishga qaysi model',
  cards: [
    { h: 'Haiku · Sonnet', art: 'bolt', body: ['Saralash, baholash, jadval', 'Arzon va tez', 'To‘plam 2 ballari'] },
    { h: 'Opus', art: 'knight', tone: 'acc', body: ['Tanlov va reja', 'Qiyin mulohaza', 'B.1-B.3 va PRD'] },
    { h: '/usage', art: 'calculator', body: ['Limitdan qancha qoldi?', 'Tugasa: Haiku yoki qog‘oz shakl'] }
  ],
  foot: 'Kuchli model [[rejalashtirish]] uchun, arzoni [[saralash]] uchun.',
  notes: {
    do: 'Exercise 6 part 1 (exercises/06-model-tanlash.md): everyone runs /usage and tells a neighbour which model they used for scoring and why.',
    say: 'UZ: "Ballarni Sonnet qo‘ydi: bu saralash ishi. Tanaffusdan keyin tanlov va reja: bu Opus ishi."\nModels in Claude Code on 2026-11-03: Opus 5.5 (default on Pro, Max and Ultra), Sonnet 5.5, Haiku 5.5 (code.claude.com/docs/en/model-config).'
  }
},
{
  seg: '1:50-2:00', mod: 'Tanaffus', layout: 'timer',
  title: 'Tanaffus', minutes: 10,
  sub: '2:00 da tanlov va reja. Noutbukni yopmang.',
  notes: {
    do: 'Press T to start the timer. Mentors mark who is behind on 2.5-2.7. On the demo machine: /clear, then open Warp tab 2.',
    say: ''
  }
},
{
  seg: '2:00-2:04', mod: 'To‘plam 2', layout: 'prompt', do: true,
  title: 'Tanlov: B.1, B.2, B.3',
  termTitle: 'Claude Code · kompaniya · /model opus',
  dense: true,
  prompt: 'kit2-scoring/form-a-scoring.md va kit2-scoring/form-b-matrix.md ni o‘qi.\nMatritsaning yuqori o‘ng qismidan birinchi sinov uchun eng yaxshi va ikkinchi variantni taklif qil, har biri uchun bitta sabab.\nEng yaxshisi uchun sinov muvaffaqiyatsiz bo‘lishining 3 ta eng ehtimolli sababini va boshlashdan oldin javob topishim kerak bo‘lgan bitta savolni yoz.\nKeyin mendan so‘ra: B.1 qaysi jarayonni tanlaysiz, B.2 nega aynan shu, B.3 hozir nimani qilmayapmiz.\nJavoblarimni form-b-matrix.md ga yoz va tanlangan jarayonni CLAUDE.md dagi «Hozirgi sinov jarayoni» bo‘limiga qo‘sh.',
  side: [
    { h: 'Model', tone: 'acc', body: ['**/model opus**', 'Limit yetmasa: Sonnet ham bo‘ladi'] },
    { h: 'Keyin', body: ['B.1 ni CLAUDE.md dagi «Hozirgi sinov jarayoni» ga yozing', 'Uyda bo‘lim boshlig‘i bilan tasdiqlang'] }
  ],
  notes: {
    do: 'Exercise 6 part 2, 4 minutes. This is a draft choice: the department head confirms it as homework.',
    say: 'UZ: "Bu qoralama tanlov. Bo‘lim boshlig‘i ko‘rmaguncha yakuniy emas: egasi odatda ma’lumot qanchalik tartibsiz ekanini bilmaydi."'
  }
},

/* ===================== 2:00-2:30 AVVAL REJA ===================== */
{
  seg: '2:04', mod: 'Reja', layout: 'divider',
  time: '2:04-2:30', big: 'Avval reja, keyin qurilish',
  sub: 'Reja rejimi, PRD va kichik vazifalar ro‘yxati.',
  notes: { do: 'Five seconds. Demo 6 begins with the habit on the next slide.', say: '' }
},
{
  seg: '2:04', mod: 'Reja', layout: 'cards', cols: 5,
  title: 'Odat: AI yo‘q deb tasavvur qiling',
  cards: [
    { h: 'Biznes-tahlilchi', art: 'clipboard', body: ['«Kim ishlatadi? Nima o‘zgaradi?»'] },
    { h: 'Dasturchi', art: 'terminal', body: ['«Ma’lumot qayerdan keladi?»'] },
    { h: 'Dizayner', art: 'app', body: ['«Ekranda nima ko‘rinadi?»'] },
    { h: 'Sinovchi', art: 'magnifier', body: ['«Xato bo‘lsa, qanday bilamiz?»'] },
    { h: 'Bo‘lim boshlig‘i', art: 'figures', tone: 'acc', body: ['«Xodimlar buni ishlatadimi?»'] }
  ],
  foot: '2000-yilda bu vositani [[kim qurardi]]? Shu odamlarning savollari Claude’ga to‘g‘ri yo‘l beradi.',
  notes: {
    do: 'Ask the room first: "2000-yil. Sotuvchilar uchun shunday yordamchi kerak. Kimni yollardingiz?" Take 3-4 answers, then show the cards.',
    say: 'UZ: "AI yo‘q deb tasavvur qiling. Kim kerak bo‘lardi? Tahlilchi, dasturchi, dizayner, sinovchi va bo‘lim boshlig‘i. Endi Claude’dan shu odamlar nomidan savol berishini so‘raymiz."\n2.0 called this the "Brilliant rule"; the room responded to it (evidence 2-0-day-2.md, claim j).'
  }
},
{
  seg: '2:07', mod: 'Reja', layout: 'cards', cols: 2,
  title: 'Reja rejimi: avval o‘ylaydi, keyin quradi',
  cards: [
    { h: 'Qanday yoqiladi', art: 'enterkey', tone: 'acc', body: ['**Shift+Tab** ni «plan mode on» chiqquncha bosing', 'Yoki yozing: **/plan**', 'Claude faqat reja qiladi, **kod yozmaydi**'] },
    { h: 'Nega kerak', art: 'd2-blueprint', body: ['Rejasiz qurish: 9 qavatli binoni bitkazib, keyin quvurni qayta yotqizish', 'Claude avval **savol beradi**', 'Rejani tasdiqlaganingizdan keyin ishlaydi'] }
  ],
  notes: {
    do: 'Demo 6 (demos/demo-6-plan-mode-prd.md) in the Baraka folder on Opus. Press Shift+Tab until the label reads plan mode, paste the Exercise 7 prompt, answer 2-3 of its questions, approve the plan, show prd.md and tasks.md.',
    say: 'UZ: "Reja rejimida Claude faqat reja qiladi. Hech qanday kod yozmaydi. Savol beradi, reja ko‘rsatadi, siz «ha» desangiz, keyin ishlaydi."\nFact (code.claude.com/docs/en/permission-modes and commands, 2026-11-03): Shift+Tab cycle includes Plan; /plan enters plan mode; claude --permission-mode plan starts in it.'
  }
},
{
  seg: '2:10', mod: 'Reja', layout: 'cards', cols: 3,
  title: 'PRD - loyiha chizmasi (TZ)',
  cards: [
    { h: 'prd.md', art: 'd2-blueprint', tone: 'acc', body: ['Nima quriladi, kim uchun', 'Nima kiradi, nima **kirmaydi**', 'Manbalar, o‘lchov, xavflar'] },
    { h: 'tasks.md', art: 'clipboard', body: ['PRD kichik qadamlarga bo‘linadi', 'Poydevor, devor, tom', '«Kichik dasturchi tushunadigan»'] },
    { h: 'Baraka misoli', art: 'chat', body: ['Sotuvchilar uchun ichki yordamchi', 'Manba: prays-list, 1C qoldig‘i, qoidalar', 'Mijozga **o‘zi yozmaydi**'] }
  ],
  foot: 'Vendor sizga PRD bera olmasa, u [[taxmin qilyapti]].',
  notes: {
    do: 'Open ~/Praktikum/baraka-tayyor/kompaniya/prd.md if the live plan is slow. Read the "nima kirmaydi" section aloud: scope is what saves the pilot.',
    say: 'UZ: "PRD - binoning loyiha chizmasi. TZ deymiz. Dasturchi yollasangiz, birinchi undan so‘rang: PRD qani? Bermasa, u taxmin qilyapti."'
  }
},
{
  seg: '2:12-2:30', mod: 'Reja', layout: 'prompt', do: true,
  title: 'Mashq 7: birinchi PRD',
  termTitle: 'Claude Code · kompaniya · plan mode · opus',
  dense: true,
  prompt: 'AI yo‘q deb tasavvur qilaylik.\nCLAUDE.md dagi «Hozirgi sinov jarayoni» uchun yordamchi vosita qurmoqchiman.\nBunday ishni odatda qaysi mutaxassislar qilardi va ular menga qanday savollar berardi?\nShu mutaxassislar nomidan menga eng muhim 6 ta savol ber, bir xabarda 3 tadan ko‘p emas.\nSavollar tugagach, prd.md uchun reja tuz, ko‘pi bilan 2 sahifa: nima quriladi, kim uchun, nima kiradi, nima kirmaydi, qaysi ma’lumot manbalari, muvaffaqiyat qanday o‘lchanadi, xavflar.\nKeyin shu PRDni kichik dasturchi tushunadigan 10-15 ta kichik vazifaga bo‘l: tasks.md.\nHozircha kod yozma.',
  side: [
    { h: 'Avval', tone: 'acc', body: ['**/model opus**', 'Shift+Tab: plan mode on'] },
    { h: 'Tayyor', tone: 'ok', body: ['**prd.md** va **tasks.md** papkada'] },
    { h: '«Python yoki Node?»', body: ['«Sen tanla, eng soddasini»'] }
  ],
  notes: {
    do: 'Exercise 7 (exercises/07-birinchi-prd.md), 18 minutes. Running late: stop at the approved plan, write prd.md at home.',
    say: 'UZ: "Texnik savol bersa - «sen tanla, eng soddasini». Biznes savol bersa - o‘zingiz javob bering: bu sizning jarayoningiz."'
  }
},

/* ===================== 2:30-2:50 SKILL’LAR ===================== */
{
  seg: '2:30', mod: 'Skill’lar', layout: 'divider',
  time: '2:30-2:50', big: 'Skill’lar',
  sub: 'Bir marta yozilgan yo‘riqnoma. Har safar bir xil natija.',
  notes: { do: 'Five seconds.', say: '' }
},
{
  seg: '2:30', mod: 'Skill’lar', layout: 'tree',
  title: 'Skill: saqlangan yo‘riqnoma',
  side: [
    { h: 'Skill nima', tone: 'acc', body: ['Restoranning **texnologik kartasi**: taom har safar bir xil chiqadi', 'Bitta matn fayl: **SKILL.md**'] },
    { h: 'Uch chiziqcha', body: ['Tepasida **name** va **description**', 'Claude qachon ishlatishni shundan biladi', 'Chaqirish: **/suhbat-tahlili**'] }
  ],
  code: '.claude/skills/suhbat-tahlili/SKILL.md\n\n---\nname: suhbat-tahlili\ndescription: Xodim suhbati transkriptidan\n  B shaklini tuzadi. Transkript\n  berilganda ishlating.\nargument-hint: [transkript fayli]\n---\n\n$ARGUMENTS faylini o‘qi.\n1) Raqamlarni tekshirish ...\n2) Vazifalar ro‘yxati ...',
  notes: {
    do: 'Demo 7 part A (demos/demo-7-skill.md): ask Claude Code to save the Kit 1 prompt as this skill. Claude Code asks permission before writing inside .claude/: approve it (in the sandbox run it was refused in accept-edits mode until approved).',
    say: 'UZ: "Har safar To‘plam 1 promptini nusxalab yurmaysiz. Bir marta skill qilib saqlaysiz, keyin /suhbat-tahlili deysiz. Xuddi oshxonadagi texnologik karta: kim pishirsa ham, bir xil."\nFact (code.claude.com/docs/en/skills, 2026-11-03): project skills live in .claude/skills/<name>/SKILL.md and are invoked as /<name>.'
  }
},
{
  seg: '2:33', mod: 'Skill’lar', layout: 'term',
  title: 'Yangi transkript, bitta buyruq',
  termTitle: 'kompaniya · claude',
  termNote: 'sinov natijasi',
  lines: [
    '> /suhbat-tahlili kit1-interviews/otabek-transcript.md',
    '~Natija hozircha faqat chatda. Faylga yozish haqida oxirida so‘rayman.',
    '',
    '|Matndan|Qanday tushunildi|Ishonch|',
    '!|«Kuniga 1520 ta savol»|1 520 bo‘lishi mumkin emas, ehtimol 15-20|[?]|',
    '!|«bir uch yuz ming so‘m»|taxminan 300 000 so‘m, 1 300 000 emas|[?]|',
    '!|«bir qirq daqiqa»|taxminan 40 daqiqa|[?]|',
    '',
    'Jami: taxminan 14,7 soat/hafta (pastki chegara)',
    '+kit1-interviews/otabek-form-b.md ga yozaymi?'
  ],
  side: [
    { h: 'Tuzoq ushlandi', tone: 'ok', body: ['«bir uch yuz ming» = taxminan **300 000**, 1 300 000 emas'] },
    { h: 'Yozishdan oldin', body: ['Skill avval **so‘raydi**, keyin yozadi'] }
  ],
  notes: {
    do: 'Demo 7 part B: run the skill on demos/inputs/otabek-transcript.md. Lines on the slide are from the real run of the skill (day-2/_build/sandbox/out/g, Sonnet 5.5, 2026-11-03), shortened; full output in demos/expected/suhbat-tahlili-otabek.md.',
    say: 'UZ: "Bir buyruq. Claude transkriptni o‘qidi, «bir uch yuz ming» ni ushladi: bu taxminan 300 ming, 1 million 300 ming emas. Va faylga yozishdan oldin so‘rayapti."'
  }
},
{
  seg: '2:35-2:38', mod: 'Skill’lar', layout: 'cards', cols: 2,
  title: 'Skill xavfsizligi: o‘rnatishdan oldin o‘qiting',
  cards: [
    { h: '2.0 dagi voqea', art: 'warning', tone: 'warn', body: ['1C administratori internetdan bitta MCP vositasini o‘rnatdi', 'U admin akkauntini o‘chirib, yangisini yaratmoqchi bo‘ldi'] },
    { h: 'Qoida', art: 'magnifier', tone: 'acc', body: ['O‘rnatishdan oldin **Claude’ga o‘qiting**', 'Qaysi fayllarga tegadi? Internetga chiqadimi? Kalit so‘raydimi?', '**Kursnikini ham** shunday tekshiring'] }
  ],
  source: 'Rasmiy hujjat: «A Claude Code plugin you install can execute arbitrary code on your machine with your user privileges.» code.claude.com/docs/en/plugins/security · 2026-11-03',
  notes: {
    do: 'Tell the story in 60 seconds (2.0 Saturday group, recorded in evidence 2-0-day-2.md, part 2, 01:26). Then read the official sentence. Do not soften it for any recommended skill: 2.0 did, and it undercut the rule.',
    say: 'UZ: "O‘tgan oqimda bir ishtirokchi, 1C administratori, internetdan bitta vosita o‘rnatdi. U admin akkauntini o‘chirib, yangisini yaratmoqchi bo‘ldi. Shuning uchun qoida: har qanday skill’ni o‘rnatishdan oldin Claude’ga o‘qiting. Bizning kursnikini ham."'
  }
},
{
  seg: '2:38-2:50', mod: 'Skill’lar', layout: 'prompt', do: true,
  title: 'Mashq 8: birinchi skill va kurs skill’lari',
  termTitle: 'Claude Code · kompaniya',
  dense: true,
  prompt: 'Quyidagi promptni Claude Code skill qilib saqla.\nJoyi: .claude/skills/suhbat-tahlili/SKILL.md.\nTepasida frontmatter bo‘lsin: name: suhbat-tahlili, description: o‘zbekcha, bir-ikki gap, qachon ishlatilishini aytsin (xodim suhbati transkripti berilganda), argument-hint: [transkript fayli].\nSkill argument sifatida transkript faylini olsin va natijani kit1-interviews/<ism>-form-b.md ga yozishdan oldin mendan so‘rasin.\nPromptning matnini o‘zgartirma, faqat «Quyida ... transkripti berilgan» joyini «$ARGUMENTS faylini o‘qi» ga almashtir.\nPrompt:\n{{1-darsdagi To‘plam 1 promptini shu yerga joylang}}',
  side: [
    { h: 'Keyin: kurs skill’lari', tone: 'acc', body: ['Avval Claude’ga o‘qiting: **../skills/kit2/SKILL.md**', 'Keyin **kit1-kit5** ni .claude/skills/ ga nusxalatish'] },
    { h: 'Tayyor', tone: 'ok', body: ['**/** menyusida /suhbat-tahlili va /kit1-/kit5'] }
  ],
  notes: {
    do: 'Exercise 8 (exercises/08-birinchi-skill.md): own skill 6 minutes, safety read and install of the course skills 4 minutes, check the / menu 2 minutes. Claude Code asks permission before writing into .claude/: approve. If the own skill fails, still install the course skills: homework needs /kit5 baseline.',
    say: 'UZ: "Avval o‘zingiznikini qiling. Keyin kursning skill’larini o‘rnatishdan oldin Claude’ga o‘qiting va so‘rang: qaysi fayllarga tegadi, internetga chiqadimi? Keyin nusxalating."'
  }
},

/* ===================== 2:50-3:00 UY VAZIFASI ===================== */
{
  seg: '2:50', mod: 'Uy vazifasi', layout: 'steps',
  title: 'Uy vazifasi 1: bo‘lim boshlig‘i bilan',
  steps: [
    'Ballarni bo‘lim boshlig‘i bilan ko‘rib chiqing||egasi odatda ma’lumot qanchalik tartibsiz ekanini bilmaydi',
    '**B.1** tanlangan jarayon',
    '**B.2** nega aynan shu',
    '**B.3** hozir nimani qilmayapmiz',
    'O‘zgargan ballarni **/kit2 qayta** bilan yangilang'
  ],
  side: [
    { h: 'Hozir yozing', art: 'calendar', tone: 'acc', body: ['Uchrashuv kuni va soati', 'Uy vazifasi varag‘iga'] }
  ],
  notes: {
    do: 'Everyone writes the meeting date on the homework sheet now (homework.md, printed).',
    say: 'UZ: "Bo‘lim boshlig‘isiz tanlov yakuniy emas. Uchrashuv kunini hozir yozing."'
  }
},
{
  seg: '2:52', mod: 'Uy vazifasi', layout: 'bignum',
  title: 'Uy vazifasi 2: boshlang‘ich raqamlar',
  nums: [
    { n: '120', art: 'inbox', label: 'so‘rov haftasiga (Telegram eksporti)' },
    { n: '6', art: 'd2-stopwatch', tone: 'acc', label: 'daqiqa bitta javobga' },
    { n: '9', art: 'warning', label: 'xato javob haftasiga' }
  ],
  foot: '**/kit5 baseline**: oxirgi 2-4 hafta tarixdan; tarixi yo‘qini [[5 ish kuni]] jonli yozing.',
  source: 'Baraka Office, shartli misol · To‘plam 5, B shakli, «Agentgacha» ustuni',
  notes: {
    do: 'Show homework.md, the Baraka good example: Claude Code counted the requests from a Telegram chat export. Numbers match pilot-template/kit5-baseline.toml (B1 = 120, B2 = 6, B3 = 9).',
    say: 'UZ: "Boshlang‘ich raqamsiz demo kunda natija yo‘q. Telegram eksporti, Excel yoki CRM tarixi bo‘lsa, Claude Code o‘zi sanaydi. Tarixi yo‘qini 5 ish kuni qo‘lda yozasiz."'
  }
},
{
  seg: '2:54', mod: 'Uy vazifasi', layout: 'cards', cols: 2,
  title: 'Uy vazifasi 3-4: bot va OpenRouter',
  cards: [
    { h: 'Telegram bot', art: 'plane', tone: 'acc', body: ['@BotFather → **/newbot**', 'Tokenni **hech kimga** yubormang', 'Chatga ham, Claude’ga ham yozmang'] },
    { h: 'OpenRouter', art: 'key', body: ['0-haftada qilgansiz: **tekshiring**', '`praktikum` kaliti va **limiti** bor', 'Yangi hisob ochmang, qayta to‘ldirmang'] }
  ],
  foot: 'Batafsil: 0-hafta qo‘llanmasi, [[«Telegram bot oching» (14)]] va [[«OpenRouter» (10)]] qadamlari.',
  notes: {
    do: 'week-0-setup/setup-guide.md: step 14 (Telegram bot, the Day 2 homework) and step 10 (OpenRouter, already done in Week 0: only check the key and limit; playtest D2-02). Mentors repeat: tokens and keys never go into a chat (FAQ K-01).',
    say: 'UZ: "Bot tokeni - kalit. Uni hech kimga, hatto mentorga ham yubormang."'
  }
},
{
  seg: '2:56', mod: 'Uy vazifasi', layout: 'steps',
  title: 'Uy vazifasi 5: jarayon tegadigan tizimlar',
  steps: [
    'Jarayon tegadigan tizimlarni yozing||Excel, Google Sheets, Telegram guruhlari, 1C, Bitrix, amoCRM, Click, Payme',
    'Har biri uchun: **API** bormi?',
    'Bilmasangiz, Claude’dan so‘rang||yoki tizimni o‘rnatgan dasturchidan',
    'Ro‘yxatni **kit3-agent/tizimlar.md** ga yozdiring'
  ],
  side: [
    { h: 'Baraka misoli', art: 'cable', body: ['AmoCRM: API bor', '1C: kunlik eksport (Excel)', 'Telegram: bot API'] }
  ],
  notes: {
    do: 'One minute. This list drives Day 3 (API and MCP).',
    say: 'UZ: "3-darsda agentingizni shu tizimlarga ulaymiz. Qaysi biri API beradi, qaysi biri faqat eksport - shuni bilib keling."'
  }
},
{
  seg: '2:57-3:00', mod: 'Uy vazifasi', layout: 'statement', art: 'flow',
  big: 'Keyingi dars: rejangiz ishlaydigan agentga aylanadi',
  sub: '3-dars: API, MCP va agent v0. Hozir mentor bilan tekshiring: papka, CLAUDE.md, matritsa, PRD, skill’lar va uy vazifasi.',
  foot: 'Har biringiz aytasiz: [[uy vazifam]] va [[keyingi to‘sig‘im]].',
  notes: {
    do: 'Mentors confirm codes 2.5-2.10 at the tables; each participant says their homework and next blocker aloud.',
    say: 'UZ: "Rahmat. Keyingi hafta shu reja ishlaydigan agentga aylanadi. Chorshanbagacha bo‘lim boshlig‘i bilan uchrashing va boshlang‘ich raqamlarni yig‘ishni boshlang."'
  }
}

];
