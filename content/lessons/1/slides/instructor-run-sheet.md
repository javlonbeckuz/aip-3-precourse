# Day 1 instructor run sheet

Praktikum 3.0, Day 1: "How AI works, and where your work goes".
Saturday 21 Nov 2026 (Saturday group) and Sunday 22 Nov 2026 (Sunday group), same content (owner decision, 2026-11-03 14:30). Participants know it as "1-dars".
180 minutes, one 10-minute break, 40 owners and 8 mentors (one mentor per table of 5).
Source of record: `final-curriculum/praktikum-3-curriculum.md`, section "Day 1".
Instructor notes are in English; lines in quotes marked UZ are said to the room in Uzbek, close to verbatim.

The 2.0 lesson behind this plan: 90 minutes of chips and geopolitics before anyone touched a keyboard lost the room.
Here everyone builds something by minute 45, and every concept after that is shown live on what they just built or on a short demo.

## Files you need open

| What | Path | When |
| --- | --- | --- |
| Deck (43 slides, press P for notes) | `deck/index.html` | All day |
| First-build prompt sheet (print one per person) | `first-build/prompt-sheet.html` and `.pdf` | 0:15 |
| Finished first-build examples | `first-build/examples/` | 0:15 |
| "Pick a number" tally | `demos/pick-a-number/index.html` | 1:00 |
| Tokenizer, offline | `demos/tokenizer/index.html` | 1:06 |
| Data trip diagram | `demos/data-trip/index.html` | 0:52 |
| Frontier vs open-weight side-by-side | `demos/side-by-side/index.html` | 1:25 |
| Model-tier sheet, dated (print one per person) | `demos/models/index.html` and `handouts/pdf/bu-hafta-ai-da.pdf` | 1:17 |
| Demo scripts (7 test, ladder, dastarxon, formula check) | `demos/scripts/` | 1:00-1:34 |
| Sales file for the formula check | `demos/formula-check/savdo-oktabr.xlsx` | 1:30 |
| Gemini Notebook exercise sheet | `notebooklm-exercise/mashq.html` and `.pdf` | 1:45 |
| Baraka Office documents | `nlm-lead-magnet-video/demo-fayllar/` | 1:45 |
| Kit 1 live demo script and fallback transcript | `kit1-live-demo/` | 2:10 |
| Kit 1 forms, prompts, team message, consent | `kits/KIT_01_Ish_qayerga_ketyapti_UZ_LATN.md` and `.pdf` (kits agent) | 2:10 |
| Homework brief and Day 2 mentor check | `homework.md`, printed as `handouts/pdf/uy-vazifasi.pdf` | 2:45 |
| Pairs card for the Kit 1 exercise | `kit1-live-demo/juftlik-mashqi.pdf` | 2:29 |
| Glossary and refreshed handouts (take-home) | `handouts/pdf/` | 2:45 |
| Setup doctor scripts and the mentor fix-it sheet | `week-0-setup/doctor/`, `week-0-setup/mentor-fixit-checklist.md` (week-0 agent) | 2:50 |
| How-to guides (Uzbek) with worked examples for every tool | `first-build/birinchi-qurilish.qollanma.md`, `demos/*/*.qollanma.md`, `notebooklm-exercise/namuna-natijalar.md`, `uy-vazifasi-namuna.md` | take-home |
| Mentor sheet with check codes 1.1-1.10 | `mentor-handbook/day-1.md` (mentor-handbook agent) | All day |

## Rehearsal, two days before (about 90 minutes)

1. Open every page in `demos/` with Wi-Fi switched off and confirm it works.
2. Measure Claude and Gemini token counts for the three tokenizer sentences (steps in `demos/tokenizer/README.md`) and type them into the page's "measured in rehearsal" boxes.
3. Run the model ladder ("20 ta o‘zbek milliy taomi") on the cheap, balanced and strong Claude models and screenshot all three answers into `demos/scripts/ladder-screenshots/`; circle any invented dish.
4. Run the side-by-side task on one frontier and one open-weight model through OpenRouter, paste both answers into `demos/side-by-side/` and save.
5. Run the formula check on `savdo-oktabr.xlsx` once; note whether the model fell into the trap, so you know what to expect.
6. Build the Baraka Office notebook in Gemini Notebook (all 7 documents), ask the contradiction prompt, generate one Quiz and one Audio Overview (in Russian or English), and download the audio.
7. Re-check the dated rows in `sources.md` (model names, prices); prices on Gemini change on 1 Dec and Claude, OpenAI and Google all moved in the past two months.
8. Copy `day-1/` without `_build/` onto 8 USB sticks (one per mentor).
   The evening before, mentors post in their table Telegram group: `first-build/prompt-sheet.html`, `demos/tokenizer/tokenizer-offline.html`, `notebooklm-exercise/mashq.html`, the Baraka Office 5 PDFs and 3 interview `.md` files, the Kit 1 PDF and `.md` from `kits/`, and `kit1-live-demo/juftlik-mashqi.pdf`.
   After class they post `handouts/pdf/` (glossary, three handouts, homework) and `handouts/pdf/bu-hafta-ai-da.pdf`.
9. Charge and test the 4G hotspot router; it is the fallback for every live AI call.

## On the day, 60 minutes before

- Deck open on the projector at slide 1; laptop on power; Do Not Disturb on.
- Second browser window: claude.ai logged in, Gemini Notebook with the Baraka notebook, gemini.google.com, chat.deepseek.com.
- Tally page and tokenizer page open in tabs.
- Mentors: 30 minutes early, check codes 1.1-1.5 in `mentor-handbook/day-1.md` as people sit down (paid Claude plan, Google account, Claude Desktop with Code tab, 3-5 company documents on the laptop, table Telegram group).
- Volunteer for the 2:17 Kit 1 interview: ask one mentor to pick a willing participant at the break and brief them (a real job, a few numbers said as ranges).

## Minute by minute

### 0:00-0:15 Why we are here (talk)

| Time | What happens | Slide | Mentors |
| --- | --- | --- | --- |
| 0:00-0:02 | Welcome, who we are, phones on silent | 1 | Seat latecomers quietly |
| 0:02-0:06 | The paradox: productivity up, profit flat; this program is about the profit line | 2 | Note anyone without a laptop |
| 0:06-0:09 | The six lessons as the sales page lists them, and the guarantee with its three conditions (homework counts) | 3-4 | |
| 0:09-0:11 | Mentors stand up and wave; the company folder | 5 | Stand when named |
| 0:11-0:15 | Today's map and the one rule for being stuck; hands up if claude.ai is open and logged in | 6-7 | Count hands, note who is not logged in (code 1.1) |

Say (UZ):
- "Xush kelibsiz. Bugun 45-daqiqaga borib har biringiz o‘z biznesingiz uchun ishlaydigan bitta narsa qurgan bo‘lasiz."
- "McKinsey 2026-yilda 1 719 rahbardan so‘radi. 80 foizi: AI mening unumdorligimni oshirdi, dedi. Lekin faqat 37 foizi foydada qandaydir ta’sir ko‘rgan."
- "Unumdorlik bor, foyda kam. Bu dastur foyda qatori haqida: bitta jarayon, o‘lchangan natija."
- "Olti dars, har hafta. Har darsdan keyin qo‘lingizda ishlaydigan vosita bo‘ladi."
- "Kafolat: barcha darslarga qatnashsangiz, har bir topshiriqni vaqtida bajarsangiz va aytilgan hamma narsani qilsangiz, shunda ham biznesingizda va o‘zingizda AI bo‘yicha o‘zgarish bo‘lmasa, to‘lagan pulingizni to‘liq qaytaramiz. Uy vazifasi ham topshiriq."
- "Qotib qoldingizmi? Avval skrinshot qiling va Claude’dan so‘rang. Keyin mentor."

Notes:
- Survey wording: 80% of respondents say AI improved their individual productivity; 37% of respondents attribute at least some EBIT impact (F1, F2 in `sources.md`).
  It is a global survey of large firms (36% above $1B revenue); say "global", not "Uzbek companies".
- Never open with "this part is boring" (2.0 did, part 1, 00:03:38).
- The lesson list on slide 3 and the guarantee on slide 4 use the live sales page's own wording (`ROOT/decisions/_build/sources/landing-2026-11-03.txt`, lines 93-105 and 139-144); do not add or soften conditions.
  Because the refund depends on "every task done on time", mentors record homework at the start of every lesson (the Day 2 check in `homework.md`).

If it fails:
- Projector dead: run the first 15 minutes without slides; the first build does not need the projector until 0:41.

### 0:15-0:45 First build (hands-on)

| Time | What happens | Slide | Mentors |
| --- | --- | --- | --- |
| 0:15-0:18 | Show the target: open a finished example and use it live (change a quantity, see the total) | 8-9, `first-build/examples/` | Hand out the prompt sheet |
| 0:18-0:20 | Steps and the data rule: product names and prices only, no customer names or phones | 10-11 | Check Settings > Capabilities toggle on laptops that fail |
| 0:20-0:33 | Everyone builds: pick a business type on the sheet, paste the prompt, fill in 3-5 real products and prices, send, test | 11 | Circulate; ask "skrinshot qilib Claude’dan so‘radingizmi?" before helping |
| 0:33-0:41 | Change one thing by chatting, then two more rounds (iterate three times) | 12 | Push each person to a second and third change |
| 0:41-0:45 | Two volunteers show their calculator on the big screen, one minute each | 12 | Each table nominates one person; instructor picks two |

Say (UZ):
- "Bu artefakt deyiladi: Claude chat ichida yasab beradigan kichik ishlaydigan sahifa."
- "Faqat mahsulot nomi va narxini yozing. Mijozning ismi, telefoni, hisob raqami yo‘q. Nega shunday, 15 daqiqadan keyin ko‘rasiz."
- "Birinchi javob qoralama. Uch marta o‘zgartiring, baholashni uchinchisidan keyin qiling."
- At 0:44: "Siz kod yozmadingiz. Siz tasvirlab berdingiz. Claude keyingi so‘zni, bu yerda kodni, taxmin qilib yozdi. Endi bu qanday ishlaganini ko‘ramiz: siz yozgan xabar qayerga ketdi?"

Notes:
- Artifacts need "Code execution and file creation" switched on in Settings > Capabilities (F16).
- Pro, Max and Ultra can share an artifact by link; Free cannot share new artifacts by link, and anyone opening a link needs a Claude account (F17).
  Do not make link sharing part of the exercise.
- Stuck person script: "Claude’ga ayting: avval menga 3 ta savol ber, keyin qur."
  This is the "interview me" habit; Kit 1 is its human version.

If it fails:
- Wi-Fi down: instructor's 4G router for the room; participants use their phone hotspot.
- claude.ai down: build on the instructor's screen together (one business type chosen by the room) and move the personal build to homework; continue at 0:45 as planned.
- A participant has no paid plan: the first build works on Free; mentor notes code 1.1 for 2:50.

### 0:45-1:00 Where AI lives (talk + diagram)

| Time | What happens | Slide | Mentors |
| --- | --- | --- | --- |
| 0:45-0:49 | The three layers: infrastructure, models, platforms; one owner question per layer | 13-14 | |
| 0:49-0:52 | The chip chain in one line, and why prices and access move | 15 | |
| 0:52-0:57 | The trip a chat message takes: cloud abroad; Tashkent server calling a model abroad; own server with an open-weight model | 16, `demos/data-trip/` | |
| 0:57-1:00 | What the 2026 law says, and three questions before pasting customer data | 17 | |

Say (UZ):
- "AI uch qavatli: pastda chip, elektr va data markazlar; o‘rtada modellar; tepada siz ishlatadigan ilovalar."
- "Nvidia chipni loyihalaydi, Tayvandagi TSMC uni ishlab chiqaradi, laboratoriyalar data markazda modelni o‘qitadi, ilovalar sizga sotadi. Chip arzonlashsa, narx tushadi. Siyosat o‘zgarsa, kirish o‘zgaradi."
- "Siz Claude’ga yozgan xabar Toshkentda qolmaydi. U AQSh yoki Yevropadagi data markazga boradi, u yerda GPU javob yozadi va qaytaradi."
- "Toshkentdagi server ham chet eldagi modelni chaqirsa, ma’lumot baribir chet elga ketadi."
- "Chatga mijoz ma’lumotini yozishdan oldin uch savol: bu kerakmi? Ismsiz bo‘ladimi? Odam rozimi?"

Notes:
- Law facts (F3-F6, F26, F27; corrected wording from the overnight RULES):
  ZRU-1125 (signed 26 Mar 2026, in force 27 Mar) narrowed data localisation to biometric, genetic and telecom-subscriber data; other personal data may go abroad under conditions.
  The 49 states and territories are Cabinet Resolution 415 (29 Jul 2026, in force 3 Aug): Germany unconditionally, the USA only for companies certified under the EU-US Data Privacy Framework.
  Anthropic's privacy policy does not cite the DPF, so never say "the US is included" for Claude; Google says it is certified (F6).
  Labour Code Art. 178: employee data to a third party, an AI service included, only with the employee's written consent (Kit 1 consent handles it).
  Admin Code Art. 46-2 part 2: unlawful processing of personal data with AI is fined 50-100 BRV, about 22-44 million so'm.
  Say "this is not legal advice; a lawyer must confirm before your company relies on it".
- Keep this block to 15 minutes.
  If someone asks about export bans or ASML, answer in one sentence and offer it in the break.

If it fails:
- The data-trip page is fully offline; if the laptop dies, draw the three variants on the flipchart.

### 1:00-1:35 How a model works (demo + talk, with exercises 2 and 3)

| Time | What happens | Slide | Mentors |
| --- | --- | --- | --- |
| 1:00-1:04 | The 7 test: the whole room asks any AI for a number from 1 to 10; instructor tallies on the big screen | 18-19, `demos/pick-a-number/` | Collect the numbers from their table and call them out |
| 1:04-1:06 | A model predicts the next word; it guesses, it does not calculate or know | 20 | |
| 1:06-1:11 | Tokens: one sentence in Uzbek, Russian and English in the tokenizer; exercise 2, everyone tries one business sentence | 21, `demos/tokenizer/` | Send the offline tokenizer file to anyone who cannot open the link |
| 1:11-1:13 | What you pay for: input, output, reasoning, cached tokens | 22 | |
| 1:13-1:17 | The context window as a dastarxon; long chats get worse; new task, new chat | 23, `demos/scripts/03-dastarxon.md` | |
| 1:17-1:22 | Model tiers and effort; the ladder demo "20 ta o‘zbek milliy taomi"; hand out the dated model sheet | 24, `demos/models/`, `demos/scripts/02-model-ladder.md` | Hand out the dated sheet |
| 1:22-1:24 | Frontier vs open-weight | 25 | |
| 1:24-1:25 | The DeepSeek moment | 26 | |
| 1:25-1:30 | When to use which; exercise 3 (short): the same non-sensitive task in Claude and in one free open-weight chat | 27, `demos/side-by-side/` | Check nobody pastes company data into DeepSeek |
| 1:30-1:34 | Hallucination: the formula check on a small sales file | 28, `demos/scripts/04-formula-check.md` | |
| 1:34-1:35 | Four habits for today | 29 | |

Say (UZ):
- 7 test: "Hozir hammangiz telefoningizda yoki noutbukda istalgan AI’dan so‘rang: 1 dan 10 gacha bitta son ayt, faqat son. Javobni stolingiz mentoriga ayting."
- After the tally: "Ko‘pchilik 7 oldi. Agar AI haqiqatan tasodifiy tanlaganda, har bir son taxminan 10 foiz chiqardi. Model tanlamaydi, u eng ko‘p uchraydigan javobni taxmin qiladi."
- Token: "Model so‘zni emas, token deb ataladigan bo‘laklarni o‘qiydi. Siz tokenga pul to‘laysiz. O‘zbekcha gap ko‘proq tokenga bo‘linadi. Qanchaga ko‘p: modelga qarab har xil, shuning uchun hozir o‘lchaymiz."
- Context: "Kontekst oynasi bu dastarxon. Dastarxon to‘lsa, chetidagi narsa tushib ketadi. Uzun chat sekin-asta xiralashadi, oyna to‘lishidan ancha oldin. Yangi vazifa, yangi chat."
- Tiers: "Arzon model saralash uchun, kuchli model reja tuzish uchun. Har ishga eng qimmatini qo‘ymang."
- Open-weight: "Ochiq vaznli model degani: model fayli internetda ochiq, uni o‘z serveringizda ishlata olasiz. Lekin DeepSeek saytidagi chatga yozsangiz, ma’lumotingiz Xitoydagi serverga boradi. Ochiq degani sayt maxfiy degani emas."
- Hallucination: "Excel xato qilsa, katakni qizil qiladi. AI xato qilsa, chiroyli va ishonchli javob beradi. Shuning uchun har doim so‘rang: formulangni ko‘rsat."

Notes:
- Exercises 2 and 3 have no separate slot in the curriculum's run of show; they live inside this block as 2-3 minute micro-exercises.
  If you are more than 3 minutes late at 1:22, skip exercise 3 in class and move it to optional homework (it is on the homework sheet as "extra").
- Do not quote a single Uzbek token ratio (the REALITY draft said "about 30% more" and a 2.0 handout said "2.5-3x"; measured on 2026-11-03 it is about 1.8x to 2.3x English, depending on the tokenizer).
  Read the numbers off the tokenizer page; the pre-measured table there names each tokenizer and its date.
- Do not give a "dumb zone" percentage; 2.0 said 40% in one place and 60% in another.
- Model names and prices live only on the dated sheet (`demos/models/`), never on core slides.
- DeepSeek stores chat data in China (F7); Qwen Chat stores it in Singapore (F8).
- DeepSeek moment: Nvidia lost about $590 billion in one day on 27 Jan 2025 (F9).
- The "Haiku invents shavlama" line is from the 2.0 class; show only what your rehearsal screenshots show.

If it fails:
- Wi-Fi down for the 7 test: use your phone on 4G and the 2.0 result (most models say 7); the tally page works offline.
- Tokenizer: the page runs offline; if a laptop cannot open it, use the projector only.
- Ladder or side-by-side live call fails: show the rehearsal screenshots and pasted answers.
- Formula check fails live: the expected answer and the trap are in `demos/formula-check/javob-kaliti.md`.

### 1:35-1:45 Break

| Time | What happens | Slide | Mentors |
| --- | --- | --- | --- |
| 1:35-1:45 | Break; timer on screen | 30 | Fix anyone whose first build failed; brief the Kit 1 volunteer |

### 1:45-2:10 Gemini Notebook: AI on your own documents (hands-on)

| Time | What happens | Slide | Mentors |
| --- | --- | --- | --- |
| 1:45-1:48 | RAG as an open-book exam; show the prepared Baraka Office notebook answering with a citation | 31-32 | Hand out the exercise sheet |
| 1:48-2:04 | Hands-on: new notebook, 3-5 documents (own or Baraka pack), 3 questions, the contradiction prompt, one Studio output (Quiz, or Audio in Russian or English) | 33-34, `notebooklm-exercise/` | Check every answer has a source number; Excel files go in as CSV or PDF |
| 2:04-2:10 | Two tables each read one contradiction they found; instructor reveals Baraka's four planted contradictions | 34 | Pick the table's best finding |

Say (UZ):
- "Bu ochiq kitob imtihoni: AI faqat siz bergan hujjatdan javob beradi va qaysi joydan olganini ko‘rsatadi."
- "Har bir javobdagi raqamni bosing va manbada tekshiring. Bu bugungi «ishingni ko‘rsat» odati."
- "Audio o‘zbek tilida chiqmaydi. Rus yoki ingliz tilini tanlang."

Notes:
- NotebookLM is now called Gemini Notebook (renamed 16 Jul 2026), at notebook.google.com; panels are Sources, Chat, Studio (F10, F11).
- Uzbek is not on the supported output-language list (F15), so Audio Overview comes out in Russian or English only; say so before people try.
  The Uzbek fallback is a test: asked in Uzbek in chat (prompt on the sheet), it produced an Uzbek test in chat and an Uzbek Studio quiz on 2026-11-03 (`notebooklm-exercise/namuna/studio-quiz-gemini-notebook.md`).
  Real worked outputs, including one answer that mixes two contradicting sources, are in `notebooklm-exercise/namuna-natijalar.md`.
- Free plan: 50 sources per notebook, usage refreshes every 5 hours (F13).
  40 people generating audio at the same minute may queue; Quiz is faster, so suggest Quiz first.
- Tested on 2026-11-03 in the owner's existing Baraka notebook: the Uzbek contradiction prompt returned an Uzbek table of 8 contradictions with citations, including all 4 planted ones (`notebooklm-exercise/README.md`).
- Baraka's planted contradictions (from `nlm-lead-magnet-video/demo-fayllar/README_DEMO_QOLLANMA.md`): delivery 7 working days in the contract vs "3 days" in the sales head's interview; maximum discount 5%/10% vs "12-15%"; warranty 24/12 months and paid regional delivery vs "36 months, free delivery" in the offer; salary dates and sales plan (5th and 15th, 120 million) vs HR's "10th, 100 million".

If it fails:
- Wi-Fi down: show the prepared notebook and the downloaded audio from your laptop on 4G; participants do the exercise as homework (it is on the sheet).
- Gemini Notebook rate-limits the room: switch everyone to Quiz or Mind Map; audio from the prepared notebook only.

### 2:10-2:45 Kit 1: Where does the work go? (demo + pairs)

| Time | What happens | Slide | Mentors |
| --- | --- | --- | --- |
| 2:10-2:14 | Why map work first; staff hide work when they are afraid; the owner tells the team before any interview | 35-36 | |
| 2:14-2:17 | The consent script, read aloud in pairs (each reads it once) | 37 | Listen; correct "Rozimisiz?" to the two-option question |
| 2:17-2:23 | Live interview of the volunteer, 5 minutes, recorded on the instructor's phone | 38 | |
| 2:23-2:29 | Transcribe in Gemini, run the Kit 1 prompt in Claude, Form B on screen; catch the wrong number | 38-39, `kit1-live-demo/` | |
| 2:29-2:43 | Pairs: 5-minute mock interview with A.1, A.2, A.5, A.7; transcribe; run the prompt; correct one number by hand; swap if time (card: `kit1-live-demo/juftlik-mashqi.pdf`) | 40 | Check each pair reads the consent and checks numbers |
| 2:43-2:45 | Hands up: who has a Form B table with at least one number corrected by hand | 40 | Count, note code 1.8 |

Say (UZ):
- "Agentga vazifa berishdan oldin, ish qayerga ketyapganini bilishimiz kerak. Buni xodimlaringiz biladi, siz emas."
- "Odamlar qo‘rqsa, ishni yashiradi. Shuning uchun birinchi suhbatdan oldin jamoaga o‘zingiz aytasiz: maqsad ishni xaritaga tushirish, odamlarni almashtirish emas."
- "Rozilik so‘ralganda «Rozimisiz?» demang: boshliqqa «yo‘q» deyish qiyin. «Yozib olaymi yoki qo‘lda yozaymi?» deb so‘rang."
- At the wrong number: "Mana: u «bir uch-to‘rt yuz ming» dedi, ya’ni taxminan 300-400 ming. Transkriptda 1 300 000 chiqdi. AI xatoni qizil qilmaydi. Har bir raqamni audio bilan solishtiring."

Notes:
- Kit 1 materials are owned by the kits agent: `kits/KIT_01_Ish_qayerga_ketyapti_UZ_LATN.md` (forms A and B, the team message, the two-option consent, the Gemini transcription prompt, the Kit 1 prompt with its number check, and the recommended written commitment); Claude Code skill in `kits/skills/kit1/`.
  The Day 1 class uses the chat prompt; the /kit1 skill comes on Day 2 with Claude Code.
- Brief the volunteer at the break to describe a real job and to say at least one amount as a spoken range ("bir uch-to‘rt yuz ming", "besh-olti kun").
  If the transcript gets every number right, show the planted error in `kit1-live-demo/fallback-transkript.md`.
- Gemini free plan accepts 10 minutes of audio per prompt (F18): enough for the 5-minute mock, not for a 25-minute homework interview (see homework).
- Language: "ishni yengillashtirish", never "optimizatsiya"; "tejalgan vaqt", never "bo‘shatilgan"; no jokes about firing.
  If an owner jokes: "Hazilligini bilaman. Xodimlaringiz buni reja deb eshitadi. Raqamga qaytamiz."
- No staff names on the big screen; use "the process", not the person.

If it fails:
- Nobody volunteers: interview a mentor about their real job (brief one in advance as plan B).
- Gemini transcription fails or Wi-Fi drops: use `kit1-live-demo/fallback-transkript.md` (a raw transcript with one planted misheard number) and run the prompt on 4G; if nothing works, show `kit1-live-demo/namuna-form-b.md`.
- Pairs run out of time: they finish the prompt run at home; the Form B check moves to the Day 2 mentor check.

### 2:45-3:00 Homework and setup check (tables)

| Time | What happens | Slide | Mentors |
| --- | --- | --- | --- |
| 2:45-2:50 | Homework brief: tell the team, 2-3 interviews, transcribe, prompt, employee corrects, save as .md | 41, `homework.md` | Hand out the homework sheet |
| 2:50-2:58 | Setup check at tables: Claude Desktop opens, logged in, Code tab starts on a local folder (Warp/CLI optional); mentors install from https://claude.ai/download and fix anyone stuck with `week-0-setup/mentor-fixit-checklist.md` | 42, `week-0-setup/doctor/` | Codes 1.3, 1.9; book a fix time for anyone still broken |
| 2:58-3:00 | Close: next week Claude Code reads your Kit 1 files; each person writes one line in the table chat | 43 | Confirm code 1.10 (team message day, names, interview dates) |

Say (UZ):
- "Uy vazifasi: avval jamoaga ayting, keyin 2-3 xodim bilan suhbat. Har biridan B shakli, xodim o‘zi to‘g‘rilagan. .md fayl qilib saqlang va keyingi haftaga olib keling."
- "Keyingi hafta Claude Code sizning shu fayllaringizni o‘qiydi va qaysi jarayondan boshlashni birga tanlaymiz."
- "Stol chatiga bitta qator yozing: bugun nima qurdim va jamoaga qaysi kuni aytaman."

## Sunday 22 November: the 210-minute slot

The room is booked 10:00-13:30, 30 minutes more than this sheet.
The extra time goes to the closing setup block: 2:50-3:28 is install and fix at the tables (slide 42), and the close (slide 43) moves to 3:28 (owner decision, 2026-11-20).
Nothing before 2:50 moves.
The full Uzbek talking track, slide by slide, is `talking-track.md`; it also shows in the deck notes drawer (P).

## Crosswalk: run of show to material

| Run-of-show row | Deck slides | Demo or exercise material | Print | Mentor action |
| --- | --- | --- | --- | --- |
| 0:00-0:15 Why we are here | 1-7 | | | Codes 1.1-1.5 at the door |
| 0:15-0:45 First build | 8-12 | `first-build/prompt-sheet.html`, `first-build/examples/` | Prompt sheet | Help at tables; code 1.6 |
| 0:45-1:00 Where AI lives | 13-17 | `demos/data-trip/` | Glossary | |
| 1:00-1:35 How a model works | 18-29 | `demos/pick-a-number/`, `demos/tokenizer/`, `demos/models/`, `demos/side-by-side/`, `demos/scripts/`, `demos/formula-check/` | Dated model sheet | Exercises 2 and 3 at tables |
| 1:35-1:45 Break | 30 | | | Fix stragglers; brief volunteer |
| 1:45-2:10 Gemini Notebook | 31-34 | `notebooklm-exercise/` | Exercise sheet | Code 1.7 |
| 2:10-2:45 Kit 1 | 35-40 | `kit1-live-demo/`, `kits/KIT_01_Ish_qayerga_ketyapti_UZ_LATN.pdf` | Kit 1 PDF (kits agent) | Code 1.8 |
| 2:45-3:00 Homework + setup | 41-43 | `homework.md`, `week-0-setup/doctor/` | Homework sheet | Codes 1.9, 1.10 |

## Bold terms and their demos

| Bold term (curriculum) | Demo | Slide |
| --- | --- | --- |
| AI landscape: 3 layers | Three-layer diagram | 14-15 |
| Where your data goes | `demos/data-trip/` (three variants) | 16-17 |
| Large language model | 7 test, `demos/pick-a-number/`, `demos/scripts/01-pick-a-number.md` | 19-20 |
| Token | `demos/tokenizer/` | 21-22 |
| Context window | `demos/scripts/03-dastarxon.md` | 23 |
| Model tiers and effort | `demos/scripts/02-model-ladder.md`, `demos/models/` | 24 |
| Frontier vs open-weight | `demos/side-by-side/`, `demos/models/` | 25-27 |
| Hallucination | `demos/scripts/04-formula-check.md`, `demos/formula-check/` | 28 |
