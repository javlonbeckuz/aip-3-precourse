/* Praktikum 3.0, Day 4 ("4-dars") deck content.
   On-screen text: Uzbek Latin. Notes (do/say): English, with Uzbek lines to say quoted as UZ.
   seg = run-of-show time for this slide (keep in sync with ../../instructor-run-sheet.md, which cites slide numbers).
   Inline markup: **bold**, [[accent]], {{placeholder}}; in steps, "main||small" adds a second line.
   Terminal lines (layout 'term'): "> " typed by the user, "~" dim, "+" green, "!" red.
   Design fields (art, colw, do: true) and the engine are documented in ../../../deck-engine/README.md; this deck runs on the shared engine since 2026-11-20.
   Prompts are copied from ../../exercises/*.md; terminal outputs from ../../exercises/namuna/natijalar/ (real run, fake keys). */
window.SLIDES_DATA = [

/* ===================== 0:00-0:20 KIRISH, v0 DAVRASI ===================== */
{
  seg: '0:00', mod: 'Kirish', layout: 'title',
  kicker: 'Praktikum 3.0 · 4-dars',
  big: 'Assistentingiz serverga chiqadi',
  sub: 'Bugun: noutbuk yopiq bo‘lsa ham ishlaydigan shaxsiy AI assistent, sinov rejasi va xodimlar bilan suhbat.',
  notes: {
    do: 'Slide on screen while people sit. Mentors are already at the tables with checklist codes 4.1-4.5 (mentor-handbook/day-4.md). Head mentor has Friday\'s list of owners without an active server.',
    say: 'UZ: "Xush kelibsiz. 3-darsda assistentingiz noutbukda ishladi. Bugun u noutbukdan chiqib, serverga ko‘chadi: noutbukni yopasiz, u ishlayveradi."'
  }
},
{
  seg: '0:01', mod: 'Kirish', layout: 'cards', cols: 3,
  title: 'Soat 3:00 da sizda uchta narsa bo‘ladi',
  cards: [
    { h: 'Assistent serverda', art: 'server', tone: 'acc', body: ['Noutbuk **yopiq**, telefondan javob keladi', 'Yiqilsa, o‘zi qayta turadi'] },
    { h: 'Sinov rejasi', art: 'clipboard', body: ['**plan.md**: bitta raqamli maqsad', 'To‘xtatish sharti va kim tekshiradi'] },
    { h: 'Odamlar', art: 'figures', body: ['Har xodim uchun **mashg‘ulot vazifasi**', '15 daqiqalik suhbat rejasi'] }
  ],
  foot: 'Shu hafta: avval xodimlar bilan suhbat, keyin [[assistent ishga tushadi]].',
  notes: {
    do: 'Point at each card for 10 seconds. These are what mentors confirm at 2:57 (codes 4.6-4.11).',
    say: 'UZ: "Sotuv sahifasida 4-dars uchun bir va’da bor: yordamchi kompyuteringiz o‘chiq bo‘lsa ham ishlaydi, telefoningizdan boshqarasiz. Bugun shu va’da har biringizning telefoningizda bajariladi."'
  }
},
{
  seg: '0:02', mod: 'Kirish', layout: 'agenda',
  title: 'Bugungi reja',
  items: [
    ['0:00', 'v0 davrasi: stolda 1 daqiqalik namoyish'],
    ['0:20', '**Dastur qayerda yashaydi**||namoyish: noutbuk testi, deploy, domen'],
    ['0:50', '**Deploy:** o‘z assistentingiz serverga||GitHub, server, telefon'],
    ['1:40', 'Tanaffus', true],
    ['1:50', '**To‘plam 5 A:** sinov rejasi'],
    ['2:20', '**To‘plam 4:** odamlar va suhbat mashqi'],
    ['2:50', 'Uy vazifasi: suhbatlar, keyin ishga tushirish']
  ],
  side: [
    { h: 'Qotib qoldingizmi?', tone: 'acc', body: ['1. Skrinshot qiling', '2. Claude’dan so‘rang', '3. Keyin mentor'] },
    { h: 'Stolda', body: ['**Atamalar lug‘ati**', '«Assistent ishlamayapti» kartasi', 'Server xavfsizligi kartasi'] }
  ],
  notes: {
    do: 'Read the times quickly. Hold up the three printed handouts (handouts/*.pdf) so every table finds them.',
    say: 'UZ: "Bugun qo‘l bilan ishlash ko‘p: 50 daqiqa deploy, 30 daqiqa reja, 30 daqiqa odamlar."'
  }
},
{
  seg: '0:03-0:20', mod: 'v0 davrasi', layout: 'steps',
  title: 'Stolda: v0 bir daqiqada',
  steps: [
    'Har kim 1 daqiqa: v0 bitta **real holatda** ishlaydi||telefoningizdan, noutbukdagi bot bilan',
    'Mentor To‘plam 3 ni ko‘radi||B.6 da xodimlardan kelgan istisnolar, imzo',
    '3 yaxshi va 3 yomon misol saqlangan||kit4-people/test-set.md',
    'Claude Code serverga kiradi||ssh vps echo ok → ok'
  ],
  side: [
    { h: 'Server yo‘qmi?', tone: 'warn', body: ['Stoldoshingiz bilan **kuzatasiz**', 'Bugun sotib oling, **48 soat** ichida joylaymiz'] },
    { h: 'Kira olmayapsizmi?', body: ['Mentor ro‘yxatga yozadi', '0:50 gacha tuzatamiz'] }
  ],
  notes: {
    do: 'Mentors run codes 4.1-4.5 and write in the tracker: who cannot log in to their server (4.5). At 0:18 each mentor gives the head mentor one line: "table N: X green, Y need SSH fix, Z have no server". Head mentor seats owners without a server next to a green tablemate now (run sheet, "No server yet"; the course holds no spare servers).',
    say: 'UZ: "Bir daqiqa: bitta real savol, bitta javob. Ko‘rsatib bo‘lgach, Warp’da ssh vps echo ok ni yozing: ok chiqsa, bugun hammasi tayyor."'
  }
},
{
  seg: '0:05-0:18', mod: 'v0 davrasi', layout: 'timer', minutes: 13,
  sub: 'Stol davrasi: har kim 1 daqiqa. Mentor 4.1-4.5 ni belgilaydi.',
  notes: {
    do: 'Press T to start. Walk the room; listen for blockers that will hit the deploy block (no server, password prompts, Windows ssh).',
    say: 'Silence is fine here. Fallback if a table finishes early: they open exercises/00-dars-oldidan.md and confirm deploy.py setup ran on Wednesday; if not, they run it now in a second Warp tab (3-5 minutes, safe to repeat).'
  }
},
{
  seg: '0:18-0:20', mod: 'v0 davrasi', layout: 'statement', art: 'd4-laptop',
  big: 'Bitta savol: Sizning assistentingiz hozir qayerda ishlayapti?',
  sub: 'Noutbukingizda. Noutbuk yopilsa, u ham uxlaydi.',
  foot: 'Keyingi 30 daqiqa: uni [[doim yoqiq kompyuterga]] ko‘chirishni ko‘rsataman.',
  notes: {
    do: 'Ask the room; let two people answer. Collect from the head mentor the count of owners without a server (they follow a tablemate and get a 48-hour call).',
    say: 'UZ: "Hozir ko‘pchilikda bot noutbukda ishlayapti. Bu - 2.0 dagi muammo: kimdir server olmagan, Mac’da o‘rnatgan, Mac yopilgan, bot to‘xtagan. Bugun shuni tugatamiz."'
  }
},

/* ===================== 0:20-0:50 DASTUR QAYERDA YASHAYDI ===================== */
{
  seg: '0:20', mod: 'Qayerda yashaydi', layout: 'divider',
  time: '0:20-0:50', big: 'Dastur qayerda yashaydi',
  sub: 'Noutbuk yoki server. VPS, domen, DNS, HTTPS, Git va log. 1-darsdagi infratuzilma qatlami endi o‘zingizniki.',
  notes: {
    do: 'Demo laptop is on the stage table, lid open, bot running locally in Warp tab 1 (demos/01-noutbuk-testi/ssenariy.md, setup checklist).',
    say: 'UZ: "1-darsda AI qayerda yashashini ko‘rdik: data markazlar, serverlar. Bugun Siz ham o‘sha qatlamdan bitta kichik joy ijaraga olasiz."'
  }
},
{
  seg: '0:21', mod: 'Qayerda yashaydi', layout: 'live', label: 'JONLI · NOUTBUK TESTI', art: 'd4-laptop',
  instr: 'Bot noutbukda javob beradi. Endi noutbukni **yopaman** va telefondan yana yozaman.',
  path: 'demos/01-noutbuk-testi/ssenariy.md',
  side: [
    { h: 'Hozir', body: ['Bot **noutbukda**: uv run pilot run', 'Telefondan savol: javob keladi'] },
    { h: 'Yopgandan keyin', tone: 'warn', body: ['Javob **kelmaydi**', 'Mijoz kutadi, xodim kutadi'] }
  ],
  notes: {
    do: 'Phone mirrored on screen 2 (or held to the document camera). 1) Ask the demo bot "Optima stolidan 8 ta kerak, qancha bo‘ladi?" from the phone: answer arrives. 2) Close the lid. 3) Ask "Start stoli 2 dona necha pul?": nothing. Wait 20 seconds in silence. Do not reopen the lid until slide 15.',
    say: 'UZ: "Ko‘ryapsizmi? Savol ketdi, javob yo‘q. Noutbuk uxladi, bot ham uxladi. Biznes vositasi noutbukka bog‘liq bo‘lmasligi kerak."'
  }
},
{
  seg: '0:24', mod: 'Qayerda yashaydi', layout: 'cards', cols: 2,
  title: 'Lokal yoki server',
  cards: [
    { h: 'Lokal = noutbukingiz', art: 'd4-laptop', tone: 'warn', body: ['Noutbuk yopilsa, dastur to‘xtaydi', 'Internet uzilsa, to‘xtaydi', 'Sinab ko‘rish uchun **zo‘r**'] },
    { h: 'Server = doim yoqiq kompyuter', art: 'server', tone: 'ok', body: ['Data markazda, kecha-kunduz yoqiq', 'Siz uxlasangiz ham ishlaydi', 'Biznes uchun **shu kerak**'] }
  ],
  foot: '3-darsda qurdik, 4-darsda [[ko‘chiramiz]]. Kod bir xil, joyi boshqa.',
  notes: {
    do: 'One minute. Keep it concrete: same code, different place.',
    say: 'UZ: "Noutbukda yasash va sinash qulay. Ishlatish esa serverda. Bugun aynan shu ko‘chishni qilamiz, kodning o‘zi o‘zgarmaydi."'
  }
},
{
  seg: '0:25', mod: 'Qayerda yashaydi', layout: 'table',
  title: 'VPS: kvartira ijarasi',
  lead: '**VPS** - data markazda ijaraga olingan kompyuter, faqat Sizniki. Uni noutbukdan **SSH** orqali boshqarasiz.',
  head: ['', 'Nima', 'Narx', '24/7', 'Kim qaraydi'],
  rows: [
    ['Noutbuk', 'O‘zingizniki', '0', 'Yo‘q', 'Siz'],
    ['Mac mini', 'Uy sotib olish', '$600-800 + tok + internet', 'Tok o‘chguncha', 'Siz'],
    ['VPS', 'Kvartira ijarasi', 'taxminan 200 000 so‘m/oy', 'Ha', 'Provayder + Siz']
  ],
  notes: {
    do: 'Prices: Airnet Strong 200,000 so‘m a month (decisions/03-vps.md, checked 2026-11-03); Mac mini $600-800 is the curriculum figure. Do not quote other providers live.',
    say: 'UZ: "Mac mini - uy sotib olish: bir marta katta pul, keyin tok va internet sizning bo‘yningizda. VPS - kvartira ijarasi: oyiga 200 ming atrofida, tok ham, internet ham provayderniki."'
  }
},
{
  seg: '0:27', mod: 'Qayerda yashaydi', layout: 'flow',
  title: 'Savol qayerdan qayerga boradi',
  nodes: [
    { k: 'Telefon', t: 'Xodim yoki Siz', art: 'app', d: 'Telegram’da savol' },
    { k: 'Telegram', t: 'Xabar kutadi', art: 'chat', d: 'bot o‘zi olib ketadi' },
    { k: 'Server', t: 'Sizning VPS', art: 'server', d: 'Toshkent · pilot-bot' },
    { k: 'OpenRouter', t: 'Model', art: 'model', d: 'xorijda · javob yozadi' },
    { k: 'Server', t: 'Javob qaytadi', art: 'inbox', d: 'jurnalga yoziladi' }
  ],
  foot: 'Server Toshkentda bo‘lsa ham, savol [[modelga xorijga]] boradi: 1-darsdagi qoida o‘zgarmaydi.',
  notes: {
    do: 'Link back to Day 1 (where data goes). The server is in Tashkent (Airnet) but the model call goes abroad via OpenRouter. Do not give legal advice beyond the Day 1 card: personal data rules, a lawyer confirms (RULES.md corrected legal facts).',
    say: 'UZ: "Server - Sizniki, Toshkentda. Lekin javobni yozadigan model xorijda. Shuning uchun 1-darsdagi qoida: pasport, karta raqami, xodim ma’lumotini botga bermaymiz."'
  }
},
{
  seg: '0:28', mod: 'Qayerda yashaydi', layout: 'prompt',
  title: 'Deploy oddiy so‘zlar bilan',
  termTitle: 'CLAUDE CODE · kompaniya/app',
  prompt: '"uv run python deploy/deploy.py env" ni ishga tushir. .env faylini ochma va o\'qima.\n\nKeyin "uv run python deploy/deploy.py" ni ishga tushir. Tugagach, natijani menga oddiy tilda 3-4 gapda tushuntir: testlar o\'tdimi, serverda tekshiruv o\'tdimi, bot ishlayaptimi.',
  side: [
    { h: 'Server manzili', body: ['**.env** da: DEPLOY_HOST=vps', 'Claude uni o‘qimaydi: skript o‘zi oladi'] },
    { h: 'Parol yo‘q', tone: 'ok', body: ['Kirish **SSH kalit** bilan', 'Parol chatga hech qachon yozilmaydi'] }
  ],
  notes: {
    do: 'Demo 02 (demos/02-deploy-jonli/ssenariy.md). Open the laptop again; first Ctrl+C the laptop bot in tab 1 (one token, one place: otherwise 409 Conflict), then Warp tab 2 (demo copy of the app with the demo .env). Paste the prompt. While it runs (about 2-3 minutes), go to the next slide and narrate the five steps.',
    say: 'UZ: "Men buyruq yozmayapman: Claude Code’ga oddiy o‘zbekcha aytdim. Serverga qanday kirishni u .env dan emas, skriptdan biladi: kalitlar Claude’ning ko‘ziga ham ko‘rinmaydi."'
  }
},
{
  seg: '0:29', mod: 'Qayerda yashaydi', layout: 'term',
  title: 'Deploy nima qiladi',
  termTitle: 'uv run python deploy/deploy.py',
  termNote: 'sinovdan, qisqartirilgan',
  lines: [
    '~==> Running the tests on this computer first',
    '~........................................................................ [ 51%]',
    '+...................................................................      [100%]',
    '~==> Uploading (74 KB)',
    '~==> Installing libraries (uv sync)',
    '~==> Checking settings with the server .env',
    '+Tayyor.',
    '~==> Waiting 8 seconds to see that it stays up',
    '+OK: pilot-bot is running release 20261213-071502',
    '',
    'Done. Write to your bot from your phone to check.'
  ],
  side: [
    { h: '5 ta ish', body: ['1. Testlar noutbukda', '2. Kod serverga (kalitsiz)', '3. Serverda tekshiruv', '4. Ishga tushirish, 8 s kuzatish', '5. Logning oxiri'] },
    { h: 'Xato bo‘lsa', tone: 'ok', body: ['Eski versiya **ishlashda qoladi**'] }
  ],
  notes: {
    do: 'Narrate while the live deploy runs. If the live deploy fails or Wi-Fi is down: this slide IS the fallback; the full recorded output is exercises/namuna/natijalar/03-deploy.txt (Ubuntu 24.04 container, 2026-11-03). The test count on the real screen may differ (template updates); what matters is "passed" with no "failed".',
    say: 'UZ: "Avval testlar: bitta test o‘tmasa, hech narsa serverga chiqmaydi. Keyin serverda tekshiruv: sozlama xato bo‘lsa, eski versiya ishlayveradi. Oxirida 8 soniya kuzatadi: yiqilsa, o‘zi orqaga qaytadi."'
  }
},
{
  seg: '0:31', mod: 'Qayerda yashaydi', layout: 'cards', cols: 2,
  title: '24/7: kecha-kunduz ishlash nimadan iborat',
  cards: [
    { h: 'systemd: navbatchi', art: 'loop', tone: 'acc', body: ['Bot yiqilsa: **5 soniyada** qayta turadi', 'Server qayta yuklansa: o‘zi yonadi', 'Token xato bo‘lsa: to‘xtaydi va kutadi'] },
    { h: 'Uptime: nima uchun pul to‘laysiz', art: 'd4-clock', body: ['Server doim yoqiq, doim internetda', 'Telegram xabarni saqlab turadi', 'Bot qaytgach, **o‘zi olib ketadi**'] }
  ],
  foot: 'Sinovimizda botni ataylab «o‘ldirdik»: [[5 soniyada]] qaytdi. Serverni qayta yukladik: o‘zi qaytdi.',
  notes: {
    do: 'If the live deploy is done: run the crash demo from demos/02-deploy-jonli/ssenariy.md step 5 ("ssh vps kill -9 ..." then status). Recorded fallback: natijalar/07-qulash.txt and 08-qayta-yuklash.txt.',
    say: 'UZ: "Serverda bitta navbatchi dastur bor: systemd. U botga qarab turadi. Bot yiqilsa, besh soniyada qayta turg‘izadi. Svet o‘chib, server qayta yonsa ham, botni o‘zi yoqadi."'
  }
},
{
  seg: '0:33', mod: 'Qayerda yashaydi', layout: 'phone',
  title: 'Noutbuk yopiq. Telefondan:',
  img: 'assets/img/telefon-egasi-qisqa.png', alt: 'Egasining telefonida bot bilan yozishma',
  side: [
    { h: 'Boshqarish', tone: 'ok', body: ['**/stop**, **/davom** - to‘xtatish, yoqish', '**/holat**, **/hisobot** - holat, raqamlar'] },
    { h: 'Shaxsiy yordamchi', tone: 'acc', body: ['**/eslat 15:30 ...** - eslatma', '**/eslab_qol ...** - faktni eslab qoladi', '**/jadval 07:45 ...** - har kuni ro‘yxat'] }
  ],
  notes: {
    do: 'Demo 01 part B. Close the laptop lid again (the deployed bot now runs on the VPS; the laptop bot was stopped before the deploy). From the phone: the same question that got no answer at 0:21, then /holat, /stop, a question (paused reply), /davom, then /eslat two minutes ahead (it buzzes during the diagram). The screenshot is the recorded fallback (natijalar/04-telefon.txt rendered); its 03:21 times are from the overnight test run, not a suggestion.',
    say: 'UZ: "Noutbuk yopiq. 20 daqiqa oldin javob kelmagan savolni yana yozaman... Mana. Bu javob mening noutbukimdan emas, Toshkentdagi serverdan keldi. Va boshqaruv mening telefonimda: /stop - bir so‘z bilan to‘xtatdim."'
  }
},
{
  seg: '0:36', mod: 'Domen, DNS, HTTPS', layout: 'diagram', svg: 'DIAGRAM_DNS',
  foot: 'Assistent uchun [[domen shart emas]]: bot Telegram’ga o‘zi ulanadi. Domen - sayt yoki forma uchun.',
  notes: {
    do: 'Demo 03 (demos/03-domen-dns-https/ssenariy.md). Walk the three colours: blue (website: 1 lookup, 2 number, 3 https), green (bot: no open port, Telegram holds messages), grey (you log in with a key). Then open https://forma.<demo-domain> on the phone and show the padlock (prepared the day before).',
    say: 'UZ: "Domen - serverning ismi. DNS - telefon kitobi: ism va raqam. Mijoz ismni yozadi, kitob raqamni beradi, brauzer serverga qulf bilan ulanadi. Bot esa bu yo‘ldan yurmaydi: u Telegram’ga o‘zi boradi. Shuning uchun assistent uchun domen shart emas."'
  }
},
{
  seg: '0:39', mod: 'Qayerda yashaydi', layout: 'cards', cols: 4,
  title: 'To‘rtta so‘z',
  cards: [
    { h: 'IP manzil', art: 'map', body: ['Serverning **raqami**', '203.0.113.10'] },
    { h: 'Domen', art: 'globe', body: ['Raqamning **ismi**', 'barakaoffice.uz', 'subdomen: forma.barakaoffice.uz'] },
    { h: 'DNS', art: 'book', tone: 'acc', body: ['**Telefon kitobi**', 'A yozuvi: forma → IP', 'tarqalishi: daqiqalardan soatlargacha'] },
    { h: 'HTTPS', art: 'certificate', tone: 'ok', body: ['**Qulf belgisi**', 'Let’s Encrypt bepul beradi', 'Caddy o‘zi yangilaydi'] }
  ],
  foot: 'Dasturchi smetasida «Nginx» ko‘rsangiz: bu ham [[qabulxona]], Caddy bilan bir xil vazifa.',
  notes: {
    do: 'Habit of the day: "Explain like I am 5". Optional 60 seconds: ask Claude live "Nginx nima? Besh yoshli bolaga tushuntir." Certificate facts: Let’s Encrypt certificates are 90 days today and move to 64 days on 10 Feb 2027 (letsencrypt.org, 2025-12-02); Caddy renews automatically (caddyserver.com/docs/automatic-https).',
    say: 'UZ: "Qulfsiz formaga mijoz telefon raqamini yozmaydi. Qulfni Let’s Encrypt bepul beradi, serverdagi Caddy uni o‘zi oladi va o‘zi yangilaydi: Sizdan hech narsa talab qilinmaydi."'
  }
},
{
  seg: '0:41', mod: 'Qayerda yashaydi', layout: 'cards', cols: 3,
  title: 'Git: saqlash nuqtalari va bekor qilish',
  cards: [
    { h: 'Commit', art: 'camera', body: ['Shu daqiqadagi barcha fayllar **surati**', 'Har o‘zgarishdan **oldin**'] },
    { h: 'Push', art: 'plane', body: ['Suratlarni **GitHub**’ga yuborish', 'Noutbuk yo‘qolsa ham kod qoladi'] },
    { h: 'Yopiq repo', art: 'lockfolder', tone: 'warn', body: ['**Private**: faqat Siz ko‘rasiz', '.env hech qachon repoga tushmaydi', '«Robin Gud» kalit o‘g‘rilari'] }
  ],
  foot: 'GitHub’ga [[faqat app/]]: kit1 va kit4 papkalarida xodimlar ma’lumoti bor.',
  notes: {
    do: 'Labour Code Art. 178 (no employee data to third parties without written consent, lex.uz/mact/6257288): this is why only app/ goes to GitHub. Robin Hood story is from 2.0 Day 3 (people harvesting keys from public repos).',
    say: 'UZ: "Git - o‘yindagi saqlash nuqtasi. Xato qildingizmi? Oxirgi yaxshi nuqtaga qaytasiz. GitHub - shu nuqtalarning internetdagi nusxasi. Faqat yopiq repo va faqat app papkasi: xodimlaringiz suhbatlari GitHub’ga chiqmaydi."'
  }
},
{
  seg: '0:43', mod: 'Qayerda yashaydi', layout: 'term',
  title: 'Ikki xil «bekor qilish»',
  termTitle: 'rollback namoyishi',
  termNote: 'sinovdan',
  lines: [
    '~# yo‘riqnomada xato: «15% gacha chegirma va’da qilasan»',
    '> uv run python deploy/deploy.py',
    '!OK: pilot-bot is running release ...-213645   (xato versiya)',
    '',
    '> uv run python deploy/deploy.py rollback',
    '+Now running: ...-213558   (oldingi, yaxshi versiya)',
    '',
    '> git restore agent/instructions.md',
    '+noutbuk ham oxirgi yaxshi commit’da'
  ],
  side: [
    { h: 'Serverda', tone: 'acc', body: ['**deploy.py rollback**', 'oldingi versiya 3 soniyada'] },
    { h: 'Noutbukda', body: ['**git restore** yoki oxirgi commit’ga qaytish', 'aks holda keyingi deploy xatoni qaytaradi'] }
  ],
  notes: {
    do: 'Demo 04 (demos/04-rollback/ssenariy.md): break agent/instructions.md (B.5 line), deploy, ask the 15% discount question from the phone, show the wrong answer, rollback, ask again. Then git restore. Recorded fallback: natijalar/09-rollback.txt. Keep the two undos separate: rollback = server release, git = laptop files.',
    say: 'UZ: "Ikkita bekor qilish bor. Serverda - rollback: oldingi versiya darhol qaytadi. Noutbukda - git: faylni oxirgi yaxshi commit’ga qaytaramiz. Faqat serverda qaytarsangiz, keyingi deploy xatoni yana olib chiqadi."'
  }
},
{
  seg: '0:45', mod: 'Qayerda yashaydi', layout: 'term',
  title: 'Log: serverning kundaligi',
  termTitle: 'uv run python deploy/deploy.py logs -n 20',
  termNote: 'sinovdan',
  lines: [
    '~systemd[1]: Started pilot-bot.service',
    '~INFO pilot.bot: bot @baraka_demo_bot started, mode direct',
    'INFO pilot.bot: exchange 173e7ad5: [[answered]], $0.0030, 22 ms',
    'INFO pilot.bot: exchange c314c795: [[answered]], $0.0031, 1 ms'
  ],
  side: [
    { h: 'Qanday o‘qiladi', body: ['**exchange** - bitta savol', '**answered** / handed_over', '**$0.0030** - taxminan 36 so‘m', '**22 ms** - javob vaqti'] },
    { h: 'Logda yo‘q', tone: 'ok', body: ['Ism ham, savol matni ham', 'Xodim kuzatilmaydi'] }
  ],
  notes: {
    do: 'Prompt to show: "deploy.py logs ni ishga tushir va oxirgi 20 qatorni tushuntir". The log has one line per question with no names and no text (pilot-template design, change-management review change 4). Cost line uses fake-model token counts with real prices; $0.003 x 11,941.65 = about 36 so‘m.',
    say: 'UZ: "Biror narsa buzilsa, birinchi qaraladigan joy - log. Uni o‘qishni bilish shart emas: Claude’ga «oxirgi 20 qatorni tushuntir» deysiz."'
  }
},
{
  seg: '0:47', mod: 'Qayerda yashaydi', layout: 'cards', cols: 3,
  title: 'Server xavfsizligi: uchta qoida',
  cards: [
    { h: 'Parol', art: 'key', tone: 'warn', body: ['Hech qachon chatga, Claude’ga, mentorga', 'Kirish **SSH kalit** bilan'] },
    { h: 'Kalitlar', art: 'vault', body: ['Faqat **.env** da: noutbuk va server', 'GitHub’da yo‘q, ekranda yo‘q'] },
    { h: 'Eshiklar', art: 'd4-door', tone: 'ok', body: ['Firewall: faqat 22 (va sayt bo‘lsa 80, 443)', 'Xavfsizlik yangilanishlari **avtomatik**'] }
  ],
  foot: 'Hammasi bitta kartada: «Server xavfsizligi» (stolda).',
  notes: {
    do: 'Point at the printed safety card (handouts/server-xavfsizligi). deploy.py setup already did firewall (ufw, SSH only), fail2ban and unattended upgrades; the domain tool opens 80/443 only when used (natijalar/13-xavfsizlik.txt).',
    say: 'UZ: "Uchta qoida. Parol chatga yozilmaydi. Kalit faqat .env da. Serverda ortiqcha eshik ochilmaydi. Qolganini deploy.py setup o‘zi qildi."'
  }
},
{
  seg: '0:48-0:50', mod: 'Qayerda yashaydi', layout: 'steps',
  title: 'Endi Siz: 50 daqiqa, uch qadam',
  steps: [
    '**GitHub:** app papkasi yopiq repoga||1-mashq, 0:50-1:05',
    '**Deploy:** .env serverga, keyin deploy.py||2-mashq, 1:05-1:30',
    '**Noutbuk testi va log:** yopiq noutbuk, telefondan savol||2-mashq, 1:30-1:40'
  ],
  side: [
    { h: 'Kartangiz', tone: 'acc', body: ['**Yashil**: telefondan javob keldi', '**Sariq**: ishlayapman', '**Qizil**: 5 daqiqadan beri qotganman'] },
    { h: 'Tez tugatdingizmi?', body: ['3-mashq: domen va HTTPS', 'Yoki qo‘shningizga yordam'] }
  ],
  notes: {
    do: 'Hand out (or point at) the green/yellow/red table cards. Mentors stand. Head mentor seats owners without a server next to a green tablemate and books their 48-hour calls (no spare servers: owner decision).',
    say: 'UZ: "Qizil kartani ko‘targan odamga mentor keladi. Qizil - uyat emas: besh daqiqa qotib qolsangiz, ko‘taring."'
  }
},

/* ===================== 0:50-1:40 DEPLOY ===================== */
{
  seg: '0:50', mod: 'Deploy', layout: 'divider',
  time: '0:50-1:40', big: 'Assistentingiz serverga',
  sub: 'Avval zaxira nusxa, keyin server, oxirida telefon. Buyruqlarni Claude Code bajaradi.',
  notes: {
    do: 'Anyone whose Wednesday setup did not run: start "uv run python deploy/deploy.py setup" in a second Warp tab NOW, then do GitHub in the first tab while it runs (3-5 minutes of server work in parallel).',
    say: 'UZ: "Chorshanba kuni setup qilmaganlar: hozir ikkinchi Warp oynasida setup’ni boshlang, u o‘zi ishlayversin, Siz esa GitHub’ga o‘ting."'
  }
},
{
  seg: '0:50-1:05', mod: 'Deploy', layout: 'prompt', dense: true,
  title: '1-mashq: GitHub zaxirasi',
  do: true,
  termTitle: 'CLAUDE CODE · kompaniya/app',
  prompt: 'app papkasini GitHub\'dagi yopiq (private) repoga zaxiralaymiz. Har qadamdan oldin nima qilishingni bir gapda ayt.\n1. Faqat shu app papkasida ishla. Yuqoridagi kompaniya papkasini (kit1-interviews, kit4-people) GitHub\'ga yuborma: unda xodimlar ma\'lumoti bor.\n2. .gitignore faylida .env, .env.* va runtime/ borligini tekshir. .env faylini ochma.\n3. Git hali yo\'q bo\'lsa "git init -b main" qil. Keyin "git add -A" va "git status --short" ni ko\'rsat. Ro\'yxatda .env yoki runtime/ bo\'lsa, darhol to\'xta va menga ayt.\n4. data/ va evals/ dagi fayllarda mijozning telefon raqami, karta raqami yoki pasport ma\'lumoti bormi, tekshir.\n5. Commit qil: "4-dars: serverga chiqishdan oldin".\n6. "gh repo create baraka-pilot --private --source=. --push" (o\'z nomim bilan).\n7. "gh repo view --json visibility,url" bilan PRIVATE ekanini ko\'rsat.',
  side: [
    { h: 'Tayyor', tone: 'ok', body: ['**"visibility":"PRIVATE"**', '.env yo‘q, .env.example bor'] },
    { h: 'gh yo‘qmi?', tone: 'warn', body: ['Kechqurun mentor bilan', '**Deploy’ni kutdirmang**'] }
  ],
  notes: {
    do: 'Hard cap: at 1:05 everybody moves to deploy, GitHub or not. deploy.py uploads with scp and never needs GitHub. Mentors check 4.6 by looking at the repo page (Private badge, no .env). Exercise file: exercises/01-github-zaxira.md.',
    say: 'UZ: "Soat 1:05 da GitHub tugamagan bo‘lsa ham, deploy’ga o‘tamiz. GitHub’ni kechqurun tugatasiz, serverga chiqish uchun u shart emas."'
  }
},
{
  seg: '1:05', mod: 'Deploy', layout: 'steps',
  title: '2-mashq: avval .env ni o‘zingiz tekshiring',
  do: true,
  steps: [
    '**ALLOWED_USER_IDS** = faqat o‘zingizning ID||xodimlar - suhbatdan keyin',
    '**REPLY_MODE** = direct||bugun o‘zingiz sinaysiz',
    '**DEPLOY_HOST** = vps||yoki root@IP',
    'Faylni saqlang||Claude .env ni ochmaydi'
  ],
  side: [
    { h: 'Ochish', tone: 'acc', body: ['Mac: **open -e .env**', 'Windows: **notepad .env**', 'ID: botga **/id**'] },
    { h: 'Nega faqat Siz?', body: ['Xodim botni **Sizdan** eshitishi kerak', 'Suhbatsiz emas'] }
  ],
  notes: {
    do: 'Owners open app/.env themselves from Warp in app/: open -e .env (Mac) or notepad .env (Windows; this also prevents a .env.txt file). Mentors do not touch keyboards for this file. Staff IDs go in only after the Kit 4 conversations (homework).',
    say: 'UZ: "Bugun botda faqat Siz. Xodimingiz botni tasodifan ko‘rib qolsa, «meni almashtirishyapti» deb o‘ylaydi. U bu haqda avval Sizdan eshitadi."'
  }
},
{
  seg: '1:07', mod: 'Deploy', layout: 'prompt',
  title: '2-mashq: deploy',
  do: true,
  termTitle: 'CLAUDE CODE · kompaniya/app',
  prompt: '"uv run python deploy/deploy.py env" ni ishga tushir. .env faylini ochma va o\'qima. Natijani bir gapda ayt.\n\nKeyin "uv run python deploy/deploy.py" ni ishga tushir. Tugagach, natijani menga oddiy tilda 3-4 gapda tushuntir: testlar o\'tdimi, serverda tekshiruv o\'tdimi, bot ishlayaptimi.',
  side: [
    { h: 'Avval', tone: 'warn', body: ['Noutbukdagi bot: **Ctrl+C**', '**pilot check**: «namunasi hali bor» yo‘q'] },
    { h: 'Oxirgi qator', tone: 'ok', body: ['**OK: pilot-bot is running**', 'Telefonga: 🟢 «... ishga tushdi»'] }
  ],
  notes: {
    do: 'Exercise file: exercises/02-serverga-joylash.md. Mentor loop per table: walk the five owners in seat order, 3 minutes max each, then escalate to the head mentor (run sheet "Mentor triage"). Windows laptops first: deploy.py has not been run on Windows in testing.',
    say: 'UZ: "Ikki buyruq, bitta topshiriq matni. 3-5 daqiqa kutasiz. Kutayotganda Claude’ning tushuntirishini o‘qing."'
  }
},
{
  seg: '1:08-1:30', mod: 'Deploy', layout: 'table',
  title: 'Xato chiqsa: eng ko‘p uchraydiganlari',
  head: ['Ekranda', 'Sabab', 'Nima qilasiz'],
  rows: [
    ['Permission denied', 'Kalit serverda yo‘q', 'Kalitni nusxalash, parolni o‘zingiz alohida oynada'],
    ['Connection refused / timed out', 'IP xato, server o‘chiq, zal 22-portni yopgan', 'Panel, IP, **telefon hotspot**'],
    ['No /opt/pilot/.env', '.env yuborilmagan', 'deploy.py env'],
    ['Tests failed', 'Kodda xato', 'Claude’ga: «qaysi test, nega?»'],
    ['Check failed', '.env to‘liq emas yoki narx imkonsiz', '.env yoki narxni tuzating, keyin deploy'],
    ['409 Conflict', 'Bot noutbukda ham ishlayapti', 'Noutbukda Ctrl+C']
  ],
  notes: {
    do: 'All messages are real outputs from the container run (exercises/namuna/natijalar/x1-x7). Three gates: pytest checks the code; pilot check catches impossible prices and blocks the deploy; pilot eval and staff ❌ catch plausible typos (1 890 000 typed as 1 980 000). Hotspot fallback: SSH port 22 blocked by venue Wi-Fi shows as "timed out"; a phone hotspot fixes it in 1 minute. The venue was tested on Saturday (run sheet "Day before").',
    say: 'UZ: "Qizil yozuv - qo‘rqinchli emas. Har birining sababi bor. Avval Claude’ga skrinshotni ko‘rsating."'
  }
},
{
  seg: '1:10-1:30', mod: 'Deploy', layout: 'timer', minutes: 20,
  sub: 'Deploy: .env, deploy.py, telefonga 🟢 xabar. Qizil karta - mentor keladi.',
  notes: {
    do: 'Press T. Head mentor watches the board (run sheet "Live board"): column per checkpoint, one row per owner. At 1:25 if fewer than 30 of 40 are green: tell the room you extend the block to 1:45 and shorten Kit 5 A by 5 minutes (run sheet "If deploy runs long").',
    say: 'No talking over the room. Answer individual questions only.'
  }
},
{
  seg: '1:30', mod: 'Deploy', layout: 'steps',
  title: 'Noutbuk testi: bugungi asosiy dalil',
  do: true,
  steps: [
    'Noutbukdagi bot deploy’dan oldin to‘xtatilgan||pilot run oynasida **Ctrl+C**',
    '**Noutbukni yoping**',
    'Telefondan: /start, bitta real savol, /holat',
    'Javob keldi → kartangiz **yashil**',
    '/stop, /davom va **/eslat** ni sinang||eslatma 2 daqiqadan keyin keladi'
  ],
  side: [
    { h: 'Mentor ko‘radi', tone: 'acc', body: ['Yopiq noutbuk + telefondagi javob', 'Kod **4.7**'] },
    { h: 'Javob yo‘qmi?', tone: 'warn', body: ['Noutbukni oching: deploy.py status', '«Assistent ishlamayapti» kartasi'] }
  ],
  notes: {
    do: 'Mentors must SEE the closed laptop and the phone answer (code 4.7: the sales-page promise). Anyone without 4.7 by 2:57 goes on the instructor list by Thursday (mentor-handbook/day-4.md).',
    say: 'UZ: "Yoping, yozing, kuting. Javob keldimi? Tabriklayman: assistentingiz endi Sizning noutbukingizdan mustaqil."'
  }
},
{
  seg: '1:33', mod: 'Deploy', layout: 'prompt',
  title: 'Log va kengaytma',
  do: true,
  termTitle: 'CLAUDE CODE · kompaniya/app',
  prompt: '"uv run python deploy/deploy.py logs -n 20" ni ishga tushir va oxirgi 20 qatorni menga oddiy tilda tushuntir: bot qachon ishga tushdi, nechta savol keldi, har biri qancha turdi, xato bormi.',
  side: [
    { h: 'Tayyor', tone: 'ok', body: ['«Bot oxirgi marta nima qildi?»', 'Siz javob bera olasiz'] },
    { h: 'Vaqt qoldimi?', tone: 'acc', body: ['**3-mashq:** domen va HTTPS', 'forma.kompaniya.uz, qulf bilan'] }
  ],
  notes: {
    do: 'Domain extension only for green owners whose A record was added on Wednesday (exercise 03). DNS not propagated: Caddy keeps trying by itself; owners check in the evening (natijalar/10b). Mentor marks 4.8 as "bot" or "domen".',
    say: 'UZ: "Domen - kengaytma. Bot uchun domen kerak emas. Yashil bo‘lsangiz va domeningiz bo‘lsa, 3-mashqni oching."'
  }
},
{
  seg: '1:35', mod: 'Deploy', layout: 'cards', cols: 3,
  title: 'Agar bugun bo‘lmasa',
  cards: [
    { h: 'Server yo‘q', art: 'server', tone: 'warn', body: ['Stoldoshingiz bilan kuzating', 'Bugun sotib oling, **48 soat** ichida mentor bilan'] },
    { h: '22-port yopiq', art: 'd4-door', body: ['**Telefon hotspot**', 'Yoki provayder panelidagi konsol'] },
    { h: 'DNS tarqalmagan', art: 'globe', tone: 'ok', body: ['Bot yo‘li yetarli', 'Caddy o‘zi qayta urinadi'] }
  ],
  foot: 'Server yo‘q bo‘lsa: [[48 soat ichida]] mentor bilan joylaymiz; shungacha assistent faqat noutbuk yoqiq paytda ishlaydi.',
  notes: {
    do: 'Say this at 1:35 to the room, then individually. Anyone still red at 1:40: the head mentor books a 30-minute screen-share call within 48 hours and writes it in the tracker (4.7 = 0 for now). The promise is not met for that owner until the call; the instructor reports the count to the organiser the same evening.',
    say: 'UZ: "Bugun ulgurmaganlar: tashvishlanmang, lekin uyga ham ketmaymiz deb aytmayman. 48 soat ichida mentor Siz bilan ekran ulashib, oxiriga yetkazadi."'
  }
},
{
  seg: '1:40', mod: 'Tanaffus', layout: 'timer', minutes: 10,
  sub: 'Tanaffus. Noutbukni yopiq qoldiring: assistent ishlayveradi.',
  notes: {
    do: 'Press T. Head mentor uses the break for the last red owners. Instructor checks the board count and decides whether to compress Kit 5 A.',
    say: 'UZ: "Tanaffusda noutbukni yopiq qoldiring va botga yana bir savol yozing. Choy ichayotganingizda ham ishlaydi."'
  }
},

/* ===================== 1:50-2:20 TO‘PLAM 5 A ===================== */
{
  seg: '1:50', mod: 'To‘plam 5 A', layout: 'divider',
  time: '1:50-2:20', big: 'Sinov rejasi',
  sub: 'Bitta raqamli maqsad, chegaralar, muvaffaqiyat mezoni va to‘xtatish sharti. Bo‘lim boshlig‘i bilan, ishga tushirishdan oldin.',
  notes: {
    do: 'Exercise 04 (exercises/04-kit5-sinov-rejasi.md). Kit 5 form: kits/KIT_05_Sinov_va_hisob_UZ_LATN.md, skill /kit5 reja.',
    say: 'UZ: "Assistent tayyor. Endi uni qanday sinashni yozamiz, aks holda 6-darsda «yaxshi bo‘ldi shekilli» deb qolamiz."'
  }
},
{
  seg: '1:51', mod: 'To‘plam 5 A', layout: 'cards', cols: 3,
  title: 'Sinov (pilot) nima',
  cards: [
    { h: 'Cheklangan', art: 'figures', body: ['**Bitta** jarayon', '3-5 xodim, bir necha mavzu'] },
    { h: 'Muddatli', art: 'calendar', body: ['**2 hafta**: 14-26-dekabr', '6-dars (26/27-dekabr): natija va qaror'] },
    { h: 'O‘lchanadigan', art: 'bars', tone: 'acc', body: ['Boshlang‘ich raqam bilan solishtiriladi', 'Raqamsiz faqat **taassurot**'] }
  ],
  foot: 'Arzon xato qilish uchun: [[avval kichik]], keyin butun bo‘lim.',
  notes: {
    do: 'Pilot dates: lesson 6 is Saturday 26 or Sunday 27 Dec (two groups, owner decision); the pilot weeks are the same for both. Go-live no later than Monday 14 Dec (FAQ X-05).',
    say: 'UZ: "Sinov - bu kichik, muddatli, o‘lchanadigan tajriba. Ikki hafta, bitta jarayon. Natija yaxshi bo‘lsa, kengaytiramiz."'
  }
},
{
  seg: '1:52', mod: 'To‘plam 5 A', layout: 'cards', cols: 2,
  title: 'Ikki muhim qator: muvaffaqiyat va to‘xtatish',
  cards: [
    { h: 'A.6 Muvaffaqiyat mezoni', art: 'check', tone: 'ok', body: ['Nima bo‘lsa, «ishlayapti» deymiz', 'Baraka: javob **6 → 2 daqiqa**, xato haftasiga 5 tadan kam'] },
    { h: 'A.7 To‘xtatish sharti', art: 'warning', tone: 'warn', body: ['Nima bo‘lsa, **darhol** to‘xtatamiz', 'Baraka: mijozga noto‘g‘ri narx **bitta holat ham** → /stop'] }
  ],
  foot: '«Rahbar hisobotida ikkita noto‘g‘ri raqam = to‘xtatamiz»: [[aniq hodisa]], his-tuyg‘u emas.',
  notes: {
    do: 'Bold terms: Pilot, Success criteria / stop condition. The /stop command they tried on the phone at 1:30 is the tool behind A.7.',
    say: 'UZ: "To‘xtatish sharti mijozni va pulni himoya qiladi. «Yomon ishlasa» - bu shart emas. «Mijozga bitta noto‘g‘ri narx ketsa» - bu shart. Va kim to‘xtatadi: telefondan /stop."'
  }
},
{
  seg: '1:53', mod: 'To‘plam 5 A', layout: 'table',
  title: 'Baraka Office: sinov rejasi qisqacha',
  head: ['Band', 'Nima', 'Baraka'],
  rows: [
    ['A.2', 'Maqsad', 'Bitta savolga javob: **6 → 2 daqiqa**'],
    ['A.3', 'Sanalar', '14-dekabr 14:00 - 26-dekabr; suhbatlar 14-dekabr ertalab'],
    ['A.4', 'Qamrov', '4 xodim, 4 mavzu; mijoz botga yozmaydi'],
    ['A.5', 'Chegaralar', '1-hafta: hammasini Malika tasdiqlaydi; 2-hafta: chegirma va muddatni'],
    ['A.7', 'To‘xtatish', 'Mijozga xato narx, 5%+ chegirma yoki 7 kundan qisqa muddat'],
    ['A.8, A.9', 'Kim, qachon', 'Malika har kuni 17:30; har shanba 16:00 uchrashuv']
  ],
  notes: {
    do: 'Full worked example with margin notes: exercises/namuna/kompaniya/kit5-pilot/plan.md. Baseline numbers come from pilot-template kit5-baseline.toml (B.2 = 6 minutes, B.1 = 120 a week).',
    say: 'UZ: "Hisob: 120 savol × 6 daqiqa = haftasiga 12 soat. Maqsadda 4 soat va 3 soat tekshirish: haftasiga 5 soatga yaqin tejaladi."'
  }
},
{
  seg: '1:55-2:00', mod: 'To‘plam 5 A', layout: 'cards', cols: 2,
  title: 'Yomon reja va yaxshi reja',
  cards: [
    { h: 'Yomon', art: 'mismatch', tone: 'warn', body: ['A.2: «Javoblarni tezlashtirish»', 'A.7: «Juda ko‘p xato bo‘lsa»', 'A.8: «Agent o‘zi tekshiradi»'] },
    { h: 'Yaxshi', art: 'clipboard', tone: 'ok', body: ['A.2: «6 daqiqadan 2 daqiqagacha»', 'A.7: «Bitta xato narx ham → /stop»', 'A.8: «Malika, har kuni 17:30»'] }
  ],
  foot: 'Juftlikda: yomon rejaning [[har bir bandida]] xatoni toping (5 daqiqa).',
  notes: {
    do: 'Pairs open exercises/namuna/yomon/plan-yomon.md and find the faults, then compare with the answer table at the end of the file.',
    say: 'UZ: "Yomon rejada hamma so‘z chiroyli, lekin hech biri o‘lchanmaydi. 6-darsda bunday rejaga qarab «davom etamizmi?» degan savolga javob berib bo‘lmaydi."'
  }
},
{
  seg: '2:00-2:17', mod: 'To‘plam 5 A', layout: 'prompt',
  title: 'O‘z rejangiz: /kit5 reja',
  do: true,
  termTitle: 'CLAUDE CODE · kompaniya',
  prompt: '/kit5 reja',
  side: [
    { h: 'Skill so‘raydi', body: ['A.1-A.9 ni bittalab', 'Bir xabarda 3 savoldan ko‘p emas'] },
    { h: 'Mentor tekshiradi', tone: 'acc', body: ['A.2 da **birlik** bormi', 'A.7 **aniq hodisa**mi', 'A.8 da **odam ismi** bormi'] }
  ],
  foot: 'Ishlamasa: 4-mashqdagi to‘liq topshiriq matni. Fayl: [[kit5-pilot/plan.md]].',
  notes: {
    do: 'Open Claude Code in kompaniya/ (not app/). 17 minutes. Mentor code 4.9 at the end of the day.',
    say: 'UZ: "Endi o‘z rejangiz. Skill savol beradi, Siz javob berasiz. Raqamni boshingizdan to‘qimang: baseline.md dagi raqamdan boshlang."'
  }
},
{
  seg: '2:17', mod: 'To‘plam 5 A', layout: 'table',
  title: 'Rejadan bot sozlamasiga',
  lead: 'Rejaning har bandi botning bitta sozlamasi bo‘ladi. **Bugun emas**: suhbatlardan keyin.',
  head: ['Reja', 'app/.env', 'Baraka'],
  rows: [
    ['A.4 Kim yozadi', 'ALLOWED_USER_IDS', 'Madina, Malika, Zarina, Bekzod'],
    ['A.5 1-hafta tasdiqlash', 'REPLY_MODE=approve, REVIEWER_CHAT_ID', 'Malika'],
    ['A.7 Kim to‘xtatadi', 'ADMIN_USER_IDS', 'Malika, Jamshid aka'],
    ['A.8 Qiyin holat', 'ESCALATION_CHAT_ID', 'Jamshid aka'],
    ['A.3 Boshlanish', 'PILOT_START_DATE', '2026-12-14']
  ],
  notes: {
    do: 'This mapping is in the worked example and in homework.md. Verified in the container: /ruxsat from the owner’s phone adds an employee with no redeploy; REPLY_MODE=approve sends each draft to the reviewer first (natijalar/12-xodim-va-tasdiqlash.txt).',
    say: 'UZ: "Reja qog‘ozda qolmaydi: har bir band botda bitta qator. Xodimni telefondan ham qo‘shish mumkin: /ruxsat va uning ID raqami."'
  }
},

/* ===================== 2:20-2:50 TO‘PLAM 4 ===================== */
{
  seg: '2:20', mod: 'To‘plam 4', layout: 'divider',
  time: '2:20-2:50', big: 'Odamlar: almashtirmaymiz, kuchaytiramiz',
  sub: 'Har bir xodimning eng kuchli qobiliyati yangi ish taqsimotida joy topadi. Suhbat - bot yoqilishidan oldin, hech qachon keyin emas.',
  notes: {
    do: 'Bold term: Upgrade, not replace. Kit 4: kits/KIT_04_Xodimni_yangi_rolga_tayyorlash_UZ_LATN.md. Language rules: change-management review section 8 (no "optimizatsiya", "bo‘shagan vaqt", "sinov", "nazorat", always "siz").',
    say: 'UZ: "Bo‘shagan vaqt emas, tejalgan vaqt. Qisqartirish emas, yengillashtirish. Bu so‘zlar xodimlaringizning qulog‘ida boshqacha eshitiladi."'
  }
},
{
  seg: '2:21', mod: 'To‘plam 4', layout: 'live', label: 'JONLI · ROLLI O‘YIN', art: 'figures',
  instr: 'Rahbar va xodim: **15 daqiqalik suhbat**, qisqa varianti. Mentor - Madina opa rolida.',
  path: 'demos/05-madina-suhbati/ssenariy.md',
  side: [
    { h: 'Kuzating', tone: 'acc', body: ['Nima o‘zgaradi, nima **o‘zgarmaydi**', 'Endi nimani tekshiradi', 'Qanday to‘xtatiladi'] },
    { h: 'Va', body: ['Xavotirni qanday **tinglaydi**', 'Qaysi so‘zlarni ishlatmaydi'] }
  ],
  notes: {
    do: 'Demo 05: instructor plays the owner (Rustamov S.A.), one mentor plays Madina Sattorova with two prepared worries. 5 minutes. Script and mentor card in demos/05-madina-suhbati/ssenariy.md. This is the 2.0 "Dilnoza conversation" renamed: Dilnoza Murodova is Baraka’s HR head on the roster, so the worried employee is Madina (report, decisions).',
    say: 'Say nothing before; start the role-play. After: UZ: "Nimani payqadingiz? U qaysi gapdan keyin tinchlandi?" Take two answers.'
  }
},
{
  seg: '2:26', mod: 'To‘plam 4', layout: 'table',
  title: 'Qobiliyatlar xaritasi: Baraka',
  head: ['Xodim', 'Eng kuchli qobiliyati', 'Yangi roli'],
  rows: [
    ['Madina', 'Chalkash savoldan aniq ehtiyojni ajratadi (1-dekabr misoli)', 'Botga aniq savol beradi, javobni tekshiradi'],
    ['Malika', 'Prays va shartnomani eng yaxshi biladi', '**Loyiha yetakchisi**: qoralamalarni tasdiqlaydi'],
    ['Zarina', 'Jahli chiqqan mijozni xotirjam tinglaydi', 'Qo‘ng‘iroq paytida botdan so‘raydi'],
    ['Bekzod', 'Katta bitimlarni yopadi (oktabr: 219 mln so‘m)', 'Narx va chegirmani avval botdan so‘raydi'],
    ['Otabek aka', 'Omborni yoddan biladi', '08:00 eksport; savollar unga kamayadi']
  ],
  foot: 'A.2 da har doim [[sana va voqea]]: «kompyuterni yaxshi biladi» emas.',
  notes: {
    do: 'Worked example: exercises/namuna/kompaniya/kit4-people/form-a-skills-map.md and madina-form-b.md; bad example: exercises/namuna/yomon/kit4-yomon.md. Names from the HR roster (department-labs/hr/data/baraka-xodimlar.csv).',
    say: 'UZ: "Har bir qatorda real misol: qachon, nima bo‘ldi. Misolni Claude to‘qimaydi, Siz aytasiz. Esingizda bo‘lmasa, so‘roq belgisi qoladi va uyda to‘ldirasiz."'
  }
},
{
  seg: '2:27', mod: 'To‘plam 4', layout: 'cards', cols: 2,
  title: 'Xodimga aytiladigan so‘zlar',
  cards: [
    { h: 'Aytmang', tone: 'warn', body: ['optimizatsiya, qisqartirish', 'o‘rningizni bosadi', 'bo‘shagan vaqt', 'nazorat, sinov muddati', '«sen»'] },
    { h: 'Ayting', tone: 'ok', body: ['ishni yengillashtirish', 'yordam beradi, kuchaytiradi', 'tejalgan vaqt', 'tekshirish, loyiha', '«siz», ism va aka/opa'] }
  ],
  foot: 'Hazil qilmang: [[xodim hazilni reja deb eshitadi]].',
  notes: {
    do: 'Change-management review, change 8 and Script A. If an owner jokes about firing in the room: "Hazilligini bilaman. Xodimlaringiz buni reja deb eshitadi. Raqamga qaytamiz." The instructor never laughs along.',
    say: 'UZ: "«Bo‘shagan vaqt» so‘zining ildizi - «ishdan bo‘shatish». Xodim shu so‘zni eshitsa, qolganini eshitmaydi."'
  }
},
{
  seg: '2:28', mod: 'To‘plam 4', layout: 'prompt',
  title: '5-mashq: /kit4',
  do: true,
  termTitle: 'CLAUDE CODE · kompaniya',
  prompt: '/kit4',
  side: [
    { h: 'Natija', tone: 'ok', body: ['**form-a-skills-map.md**', 'Har xodimga **<ism>-form-b.md**', 'Oxirida suhbat rejasi'] },
    { h: 'B.8 va B.9', tone: 'warn', body: ['**Bo‘sh qoladi**', 'Suhbatdan keyin, xodimning so‘zlari bilan'] }
  ],
  foot: 'B.4 - 3 yaxshi va 3 yomon misol: [[agentning testlari ham]] shu.',
  notes: {
    do: '9 minutes. Exercise 05. If /kit4 fails, the full prompt is in the exercise file. Mentor codes 4.10 (A and B per employee) and 4.11 (conversation date before go-live).',
    say: 'UZ: "Skill avval ro‘yxatni ko‘rsatadi: kimning ishi o‘zgaradi. Tasdiqlang. Keyin har biri uchun bitta savol: u eng yaxshi nimani qiladi, oxirgi marta qachon ko‘rdingiz?"'
  }
},
{
  seg: '2:37-2:50', mod: 'To‘plam 4', layout: 'steps',
  title: '6-mashq: juftlikda suhbat mashqi',
  steps: [
    '**1-davra, 6 daqiqa:** A - rahbar, B - xodim||B bitta xavotirni tanlaydi, oldindan aytmaydi',
    '**2-davra, 6 daqiqa:** rollarni almashtiring',
    'Rahbar 7 qadamdan o‘tadi||nima o‘zgaradi, nima o‘zgarmaydi, nimani tekshiradi, qanday to‘xtatiladi, xavotir, kelishuv',
    'Mentor: bitta yaxshi gap, bitta tuzatish'
  ],
  side: [
    { h: 'Xavotirlar', tone: 'acc', body: ['«Keyin menga nima ish qoladi?»', '«Xato bo‘lsa, men aybdormanmi?»', '«Har yozganimni kuzatasizmi?»'] },
    { h: 'Kartalar', art: 'figures', body: ['6-mashq faylida: rahbar va xodim kartasi'] }
  ],
  notes: {
    do: 'Exercise 06. Pairs from the same table. Mentor observes one round per pair with the 6-line checklist in the exercise file. Each owner leaves having heard and answered one worry (curriculum done-when).',
    say: 'UZ: "Xodim bo‘lganingizda darhol rozi bo‘lmang. Haqiqiy xodimdek, biroz xavotir bilan gapiring."'
  }
},
{
  seg: '2:39-2:50', mod: 'To‘plam 4', layout: 'timer', minutes: 11,
  sub: 'Ikki davra. 6 daqiqadan keyin rollarni almashtiring.',
  notes: {
    do: 'Press T. At 6 minutes say "almashtiring". At 0, mentors give their one-line feedback.',
    say: 'UZ (at 6 minutes): "Rollarni almashtiring."'
  }
},

/* ===================== 2:50-3:00 UY VAZIFASI ===================== */
{
  seg: '2:50', mod: 'Uy vazifasi', layout: 'divider',
  time: '2:50-3:00', big: 'Shu hafta: avval odamlar, keyin assistent',
  sub: 'Dushanba ertalab suhbatlar, dushanba kunduzi ishga tushirish. Birinchi hafta cheklangan ruxsat bilan.',
  notes: {
    do: 'homework.md is the file to share in the group chat after class.',
    say: 'UZ: "Tartib muhim: suhbat - avval, bot - keyin. Hech qachon aksincha emas."'
  }
},
{
  seg: '2:51', mod: 'Uy vazifasi', layout: 'steps',
  title: 'Uy vazifasi: to‘rtta qadam',
  steps: [
    '**Suhbatlar:** har bir xodim bilan 15 daqiqa||B.8 xavotirlar, B.9 kelishuv; yangilangan yozma majburiyat',
    '**Ishga tushirish:** dushanbadan kechikmay||xodimlar /ruxsat bilan, REPLY_MODE=approve',
    '**Xatolar jurnali:** har xato B.13 ga||sana, nima bo‘ldi, kim topdi, nimani o‘zgartirdik',
    '**1-hafta ustuni:** To‘plam 5 B||shanba kuni haftalik ko‘rib chiqishda'
  ],
  side: [
    { h: 'Chorshanba', art: 'calendar', tone: 'acc', body: ['Mentor so‘raydi:', 'suhbatlar bo‘ldimi, bot yoqildimi,', 'jurnalda nechta yozuv?'] }
  ],
  notes: {
    do: 'Read the four steps. Mentor mid-week check on Wednesday 16 Dec in the table chat (mentor-handbook/day-4.md last line).',
    say: 'UZ: "Birinchi hafta bot faqat qoralama yozadi, har javobni odam tasdiqlaydi. Ishonch asta-sekin: avval tasdiqlash, keyin bo‘shatish."'
  }
},
{
  seg: '2:53', mod: 'Uy vazifasi', layout: 'term',
  title: 'Suhbatdan keyin: xodimni qo‘shish',
  termTitle: 'Telegram · egasining telefoni',
  termNote: 'sinovdan',
  lines: [
    '~Madina botga yozadi:',
    '!Bu bot faqat Baraka Office xodimlari uchun. Sizning ID raqamingiz: 2001',
    '',
    '> /ruxsat 2001 Madina',
    '+✅ 2001 (Madina) endi botdan foydalana oladi.',
    '',
    '~Keyin app/.env: REPLY_MODE=approve, PILOT_START_DATE=2026-12-14',
    '> deploy.py env ni ishga tushir',
    '+Bot restarted.'
  ],
  side: [
    { h: 'Approve rejimi', art: 'check', tone: 'acc', body: ['Bot javobni **tasdiqlovchiga** yuboradi', '«✅ Yuborish» dan keyin xodimga'] }
  ],
  notes: {
    do: 'Exact lines are in homework.md. Verified in the container run (natijalar/12-xodim-va-tasdiqlash.txt, 12a-env-approve.txt).',
    say: 'UZ: "Xodim botga yozadi, bot unga ID raqamini aytadi. Siz telefoningizdan /ruxsat va shu raqam. Tamom."'
  }
},
{
  seg: '2:55', mod: 'Uy vazifasi', layout: 'table',
  title: '5-dars boshida mentor tekshiradi',
  head: ['Kod', 'Nima', 'Ekranda'], colw: [1, 6, 4.5],
  rows: [
    ['5.1', 'Reja kelishilgan; suhbatlar bot yoqilishidan oldin', 'Suhbat sanasi < ishga tushirish sanasi'],
    ['5.2', 'Sinov kamida 4 ish kuni jonli, jurnalda yozuv bor', 'B.13: sana, nima, kim topdi'],
    ['5.3', '1-hafta ustuni to‘ldirilgan', 'numbers.md, birliklar bilan'],
    ['5.4', 'Assistent serverda', 'Noutbuk yopiq, javob keladi'],
    ['5.5', 'Kod yopiq repoda, kalitsiz', 'GitHub: Private']
  ],
  notes: {
    do: 'Codes match mentor-handbook/day-5.md. 5.1-5.3 are homework (V) and count toward the refund-guarantee evidence column.',
    say: 'UZ: "Keyingi darsda mentor shu beshtasini ko‘radi. Birinchi uchtasi - uy vazifasi: kafolat shartida hisobga olinadi."'
  }
},
{
  seg: '2:57-3:00', mod: 'Yakun', layout: 'statement', art: 'server',
  big: 'Noutbukni yoping. Assistentingiz ishlayveradi.',
  sub: 'Bu hafta u xodimlaringiz bilan ishlay boshlaydi: avval suhbat, keyin ishga tushirish.',
  foot: 'Mentor hozir tasdiqlaydi: [[4.6-4.11]].',
  notes: {
    do: 'Mentors confirm 4.6-4.11 at each table and write "Keyingi to‘siq" in the tracker. Instructor collects the board count (4.7 green) and posts it to the organiser chat tonight.',
    say: 'UZ: "Bugun uyga borayotganingizda telefondan botga bitta savol yozing. Noutbuk sumkada yopiq, javob esa keladi. Rahmat."'
  }
}
];
