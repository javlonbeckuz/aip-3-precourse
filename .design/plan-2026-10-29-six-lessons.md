# Plan 2026-10-29 (b): 2.0 shape (lesson 0 + 4) → 3.0 (Week 0 + 6 days)

Source: `C:\Users\User\Downloads\Telegram Desktop\praktikum-3-curriculum.md` (v3, Khurshid, 825 lines). Builds on `plan-2026-10-29-access.md` (already built).

## User decisions (final)
- 6 lessons at 10:00 Tashkent:
  - shanba: 2026-11-21, 11-28, 12-05, 12-12, 12-19, 12-26
  - yakshanba: 2026-11-22, 11-29, 12-06, 12-13, 12-20, 12-27
- `release: {}`. Each lesson opens on its day. A student with a NULL group or TBA dates stays fail-closed, as before.
- Prep keeps 4 items: Kompyuter / Google akkaunt / Claude paid plan (card folded in) / **Warp + Claude Code**.
  - New Warp picture in the same flat style. No typing animation, no blinking cursor: the reply block slides up instead.
  - Prep PDF deck reprinted.
- Lesson parts: **Slaydlar / Amaliyot / Kit / Vazifa**. Kitob is dropped.
- Lesson colours (fixed): 0 yellow, 1 lilac, 2 grey, 3 blue, 4 dark, **5 orange #FF7A2F (black text), 6 emerald #0B7A55 (white text, full opacity even for subtitles)**.
  - Preview: `.design/comp/lesson-colours-options.html`, option A.
  - Reword `tokens.md` "no green anywhere": emerald is an identity colour, never a success colour.
- Lesson titles/topics: the drafts in section 9 (UZ/RU/EN), pending the user's review (see "User review" at the bottom).

## 0. Findings
1. The project has no git of its own. Snapshot it before deleting any 2.0 code.
2. The app is built from the prototype page (`build_app.py`), so the prototype follows the change. It does not freeze.
3. `build_app.py` does exact-text `rep()`/`sub1()` on `proto_app.js` (`resolve()` head, the `render()` u4/todaySel block, lines 112-116). Update both in the same change.
4. `shell.test.js` fails if any lesson-JSON string of 18+ chars appears in `public/`. Keep card titles with `\n` breaks.
5. `i18n_check.py:10` bans `harness`. Narrow it to `harness(?:ing)? the`.
6. Typing effects are banned (`taste-profile.md`).
7. Ship `slideCount: 0` until real stills exist.
8. Archive to `.design/archive-2.0/` (already in `.dockerignore`), not under `content/`. Add `server/fixtures` to `.dockerignore`.
9. Archive `scripts/import-2.0.mjs` and drop the `import-2.0` npm script.
10. `.md` is served as an attachment. That's fine.
11. The prep deck PDF is printed from `.design/comp/files/prep-deck.html`. It has its own data D, SVG copies and a hard-coded date, and it still contains em-dashes.
12. Kit map:
    - Day 1: Kit 1
    - Day 2: Kit 2. Baseline = the Kit 5 B "Agentgacha" column, as homework.
    - Day 3: Kit 3
    - Day 4: Kit 5 A + Kit 4 A/B
    - Day 5: Kit 5 B week 1
    - Day 6: Kit 5 B final + Kit 4 B.6

## 1. Inventory ("N" = from `LESSON_COUNT = 6` in content.js; SPA from payload; prep stays 4)

**Server / content**
- `content.js`:
  - :7 PARTS → slides, amaliyot, kit, vazifa, prep
  - :32 needs N times
  - :39 liveOverride 1..N
  - :42 release keys 0..N
  - :104 lessonNumbers `\d` ≤ N
  - :115 requires 0..N
  - :120-123 `review` opens every lesson early; TBA or no group still wins
  - :134-136 live N
  - :145-146 sessions N
  - :149-156 new block model
  - :180-194 fileIndex over blocks, real names, drop dlName
  - :218-223 drop bookFile
  - :227-239 generic `units()`
  - :243 summary N
- `db.js:177` → `sl:([1-9])`
- `bot.js:45` → `darslar d/${Object.keys(p.lessons).length}`
- `index.js`:
  - rename unlock4 → review
  - :260 `f.name`
  - drop the `/book` route
- `schedule.json`: dates above, rewrite `_help`.
- `lessons/1-4` → archive.
- Docs: API.md :16-17, :27-40, :46-49, :75-79, :92-97. README :76, :83, :87, :98-114, :145-182.

**Tests**
- `testutil` → 6 dates per group, plus a fixture overlay.
- `app.test`: :55 lessons 7; drop the 2.0 lesson-1/kitob/book/dl-name asserts; live n; `sl:9` now valid (use `sl:10`); review test; TBA loops 1..6; shipped invariant.
- `hardening`: :137-201 clip/files/lessonNumbers.
- `bot.test`: :118 `/6`.
- `integration.test`: :186 loop 1..6.

**SPA (`.design/comp/src`)**
- `proto_app.js`:
  - drop `u4`/`setU4`
  - LCOL +2
  - TODAY_PRESETS → 3.0 dates
  - liveLesson N
  - generic `units()`
  - ring = done/`LN().length`
  - drop the `nextOf` n===1 branch
  - nextStep prep `[1,2,3]`
  - keep prep `pl:4`, `k===4`, `repeat(4)`
  - locked card → `lesson.${n}.sub`
  - `c-night` colour-driven (`LCOL[n]==='dark'`)
  - `next.all_done` → `#/dars/${last}`
  - `[0,...LN()]`
  - `tabOfHref`/`unitsLine` → `units.am`
  - drop bookRow and the kitob pane; `kt` = Kit pane
  - one generic tabsDef pane
  - drop vz1Page/vz1Sheet/am1Index/exPage/lib*/hIndex/hCard; keep `pli` + copy/toast helpers
  - generic resolve/ROUTES
  - drop u4 in render (+ `build_app.py:112-116`)
  - lock sheet → `lock.desc_n`
- `proto_data.js`: LESSONS 0-6 with 3.0 dates; PREP item 3 → Warp; `PREP_ART[3]` → Warp SVG; hand-written 3.0 C20 demo (keep the `/*C20:begin*/…/*C20:end*/` markers); buildData parts only; SEED; registerContent.
- `app_state.js`: makeC20 → parts; loops over payload lessons `n>0`; tab order sl, am, kt, vz; drop the l1 headings and BOOK.
- `app_core.js:28`: last lesson date.
- `index.pre-proto.html`: :156-157 and :177-180 colours +5/6; :223 grid for 7 cards (3+4).
- `polish.css:101-102`; `prep_c.css` :81-85 (Warp anim) and :150 (endb per new colour).
- `assemble.py:91,136` (u4), `assemble_post.py:59` (lock sheet text), `build.py:11` (drop gen_content), `i18n_check.py:10`.
- i18n keys:
  - change `unit.kt`/`units.kt` → Kit/kit, `lock.desc_n`, `next.all_done`, `menu.course_tba` (6), `lesson.1-4.*`, `prep.2.*`, `prep.3.*`
  - add `lesson.5.*`, `lesson.6.*`, `units.am`, `lesson.soon`, `note.soon` (+ NOTES)
  - leave old 2.0 keys unreferenced
- `prep-deck.html` + `content/prep/prep-*.pdf`: reprint.

## 2. Part model
- Parts: `slides`, `amaliyot`, `kit`, `vazifa` (+ `prep` for lesson 0). SPA tab keys stay sl/am/kt/vz (`kt` = Kit). `release.<n>.<part>` works as before; `kitob` → unknown part error.
- Block shape for amaliyot/kit/vazifa in `lesson.uz.json`:
  ```
  null | { "text": "paragraphs \n\n between", "groups": [ { "title", "note"?, "files": [ { "slug", "name", "size" } ] } ] }
  ```
  - `has[part] = !!(b && (b.text || b.groups?.length))`
  - `has.slides = slideCount > 0`
  - `FIELDS = { slides: ['slideCount','slideKind'], amaliyot: ['amaliyot'], kit: ['kit'], vazifa: ['vazifa'], prep: ['prep'] }`
- Files: `lessons/<n>/files/<slug><ext>`. `.placeholder` still works.
- Parts are always read from the UZ file. ru/en lesson files hold only n/title/subtitle/summary/topics (+ prep for lesson 0).
- fileIndex: loop the blocks' groups/files; `{name, part}`. The doc route gates with `partOpen(n, part)`; a locked slug gives the same 404 as an unknown one. Real file names are kept (students save into `kompaniya/`).
- Kit holds the day's form `.md` + skill `kitN-skill.zip` (optional PDF). Day 4 = two groups ("Kit 5 A", "Kit 4 A/B"). Copy files per lesson.
- Delete all Kitob/book code. The archive keeps a copy.
- Payload: `has: {slides, amaliyot, kit, vazifa, prep}`, `parts`; open blocks under their own key. homework/materials/prompts/praktikum/book fields disappear.

## 3. 2.0 content and empty lessons
- Archive:
  - `content/lessons/1..4` → `.design/archive-2.0/lessons/`
  - `AI-Praktikum-3.0-final.html` → `.design/archive-2.0/AI-Praktikum-3.0-final.2.0-shape.html`
  - `gen_content.py` and `scripts/import-2.0.mjs` alongside
- Ship lessons 1-6 with title/subtitle/summary/topics, `slideCount: 0`, and `amaliyot`/`kit`/`vazifa: null`. Strip the 2.0 fields from lesson 0 and fix its topics typo "Cod".
- Empty lesson open rule:
  ```js
  if (n > 0 && !PARTS.some(p => has[p])) v.open = isOpen(opensAt(n, 'start', group, review))
  ```
  'start' is not a release key, so it means +0h. Review → 0. No group / TBA → NaN.
- What students see:
  - Home card: colour + "N-dars · date" + `note.soon` ("Ochiq · materiallar tez orada").
  - Lesson page: hero + `lesson.soon`, no tabs (an empty folder breaks).
  - Live hero: `lesson.soon`, not "0/0".
  - Before the day: locked card + `lock.desc_n`.

## 4. Progress
- Units per lesson (existing parts only):
  - slides: `sl[n] >= slideCount`
  - amaliyot: tick `f:am{n}`
  - vazifa: tick `f:v{n}` (the "Bajardim" toggle, now on every n)
  - Kit is NOT counted.
- Done = all units done, t > 0, and no part locked.
- Ring = done/6. Bot: `Tayyorgarlik a/4 | darslar d/6 bajarilgan`.

## 5. Generic lesson page (SPA)
- `applyLessons` builds parts in the order sl, am, kt, vz.
- `makeC20` → `{parts: {[n]: {am|kt|vz: {text, groups:[{title, note, files: files.map(f => fo(n, f))}]}}}}` from the uz payload.
- registerContent keys `c.p.{n}.{k}.text|g{i}|g{i}.n` (`lang="uz-Latn"`).
- One pane renderer for am/kt/vz: label `unit.{k}`, paragraphs, `group()` + `fileRow()`, then `endb('f:am'+n | 'f:v'+n)` for am/vz.
- Routes:
  - `/dars/{n}`
  - `/dars/{n}/slayd/{i}`
  - `/dars/{n}/amaliyot|vazifa|kit` → `?tab=`
  - `/kitob` dropped
- Check 4 tabs at 320/360px. If they don't fit, hide the `.lkd` svg under 360px.

## 6. Migration
- No schema change.
- Before deploy (when that's ever allowed):
  - back up
  - `SELECT COUNT(*) FROM students WHERE id <> 'XM'`
  - `SELECT COUNT(*) FROM progress WHERE key='prep:3'` (Visa → Warp meaning change)
  - no `review=1` rows

## 7. Prototype follows
- Archive the current final HTML.
- Drop `gen_content.py` from build.py STEPS.
- Hand-written 3.0 C20 demo:
  - Lesson 1 has all 4 parts with `ph: true` sample files.
  - The other lessons are empty ("soon" state).
- TODAY_PRESETS: before 2026-11-14, day1 2026-11-21, story 2026-12-05, over 2027-01-05.

## 8. Work split (no overlap)
**B (backend/content)**
- Owns: `server/**`, `content/**` except `content/prep/*.pdf`, `API.md`, `README.md`, `.dockerignore`, `package.json`, `scripts/import-2.0.mjs`, `.design/archive-2.0/lessons/`.
- Tests:
  - fixture `server/fixtures/lessons/1` (old slugs `hw-kompaniya.pdf`, `hw-narxlar.csv`, `qollanma.pdf`, + `kit1-forma.md`, `x.pdf.placeholder`) and `lessons/3` (`slideCount: 40`)
  - `tmpCopy` overlay with an option to skip it
  - new tests: empty lesson open on its date / shut with no group or TBA; Kit doc gated by `release.1.kit`; 4 times rejected; liveOverride 6 ok / 7 rejected; `kitob` rejected; parts from uz under `?lang=ru`; review opens 6 early but not TBA / no group; bot `/6`
  - delete the book/dl-name tests
**F (frontend/SPA)**
- Owns: `.design/comp/**`, `public/aip/**`, `AI-Praktikum-3.0-final.html` + its archive copy, `content/prep/*.pdf`, `scripts/shell.test.js`.
- Warp art:
  - 300×300 viewBox; `.s` 6px black stroke; fills #E0E0E0/#000/#FDC959/#0A14FC; `.badge` at `translate(278 22)`
  - terminal window with a black title bar and 3 dots, a "> claude" line, a reply block
  - `.w-win` scales in on `.enter`; `.w-reply` slides up as a loop
  - same SVG in `prep-deck.html #svgs`
- prep-deck: D items 2/3; date line "21-noyabr (shanba guruhi) yoki 22-noyabr (yakshanba guruhi)"; no em-dashes; print 3 PDFs headless (`--no-pdf-header-footer`), 6 pages; copy to `.design/comp/files/` and `content/prep/`.
- Sequencing: B lands content.js + the payload contract first. F starts on the prototype demo data (same block shape) and integrates against the real server with `ALLOW_NOW=1 NOW=2026-11-21T10:00 CONTENT_DIR=<tmp copy + fixtures>`.

## 9. Copy drafts (UZ | RU | EN). Apostrophes are U+02BB ʻ and U+02BC ʼ
Format per row: title ("card with \n") | subtitle | summary.

**Day 1**
- UZ: AI qanday ishlaydi ("AI qanday\nishlaydi") | AI qatlamlari, token, kontekst, modellar, NotebookLM, Kit 1 | Avval oʻz biznesingiz uchun birinchi vositani yasaymiz. Keyin AI qayerda ishlashi, token va kontekst nima ekani, qaysi modelni tanlashni koʻramiz. Kit 1: ish qayerga ketadi.
- RU: Как работает AI ("Как работает\nAI") | Слои AI, токены, контекст, модели, NotebookLM, Kit 1 | Сначала делаем первый инструмент для своего бизнеса. Потом разбираем, где работает AI, что такое токен и контекст и какую модель выбрать. Kit 1: куда уходит работа.
- EN: How AI works ("How AI\nworks") | AI layers, tokens, context, models, NotebookLM, Kit 1 | First you build a tool for your own business. Then we see where AI runs, what tokens and context are, and which model to pick. Kit 1: where the work goes.

**Day 2**
- UZ: Claude Code ("Claude\nCode") | Harness, CLAUDE.md, Plan mode, PRD, Skill, Kit 2 | Claude Codeʼni oʻz Kit 1 fayllaringizda oʻrganamiz: kompaniya papkasi, CLAUDE.md, reja va PRD. Kit 2: qaysi jarayondan boshlashni tanlaymiz.
- RU: Claude Code | Harness, CLAUDE.md, Plan mode, PRD, Skill, Kit 2 | Осваиваем Claude Code на своих файлах Kit 1: папка компании, CLAUDE.md, план и PRD. Kit 2: выбираем, с какого процесса начать.
- EN: Claude Code | Harness, CLAUDE.md, Plan mode, PRD, Skills, Kit 2 | You learn Claude Code on your own Kit 1 files: the company folder, CLAUDE.md, a plan and a PRD. Kit 2: pick the process to start with.

**Day 3**
- UZ: API va MCP ("API va\nMCP") | API, kalitlar, MCP, frontend va backend, system prompt, Kit 3 | Tanlangan jarayonni qadamlarga ajratamiz va agent yoʻriqnomasini yozamiz. Keyin agentning birinchi versiyasini haqiqiy tizimlarga ulaymiz. Kit 3: ishni qayta taqsimlash.
- RU: API и MCP | API, ключи, MCP, frontend и backend, system prompt, Kit 3 | Разбиваем выбранный процесс на шаги и пишем инструкцию агента. Затем подключаем первую версию агента к реальным системам. Kit 3: перераспределяем работу.
- EN: API and MCP | APIs, keys, MCP, frontend and backend, system prompt, Kit 3 | We split the chosen process into steps and write the agent's instructions. Then we connect the first version of the agent to real systems. Kit 3: redistributing the work.

**Day 4**
- UZ: Ishga tushirish ("Ishga\ntushirish") | VPS, domen, DNS, Git, pilot rejasi, Kit 5 A, Kit 4 | Agentni noutbukdan 24/7 ishlaydigan serverga koʻchiramiz. Pilot rejasini yozamiz va xodimlar bilan suhbatga tayyorlanamiz. Kit 5 A va Kit 4.
- RU: Запуск в работу ("Запуск\nв работу") | VPS, домен, DNS, Git, план пилота, Kit 5 A, Kit 4 | Переносим агента с ноутбука на сервер, который работает 24/7. Пишем план пилота и готовимся к разговору с сотрудниками. Kit 5 A и Kit 4.
- EN: Ship it | VPS, domain, DNS, Git, the pilot plan, Kit 5 A, Kit 4 | We move the agent from the laptop to a server that runs 24/7. We write the pilot plan and prepare the talk with staff. Kit 5 A and Kit 4.

**Day 5**
- UZ: Agentni yaxshilash ("Agentni\nyaxshilash") | Xatolar jurnali, test toʻplami, cron, eskalatsiya, xavfsizlik, Kit 5 B | Pilotning birinchi haftasidagi xatolar boʻyicha agentni tuzatamiz. Jadval boʻyicha hisobot, eskalatsiya va xavfsizlik qoidalarini qoʻshamiz. Kit 5 B: 1-hafta.
- RU: Улучшаем агента ("Улучшаем\nагента") | Журнал ошибок, тесты, cron, эскалация, безопасность, Kit 5 B | Исправляем агента по ошибкам первой недели пилота. Добавляем отчёт по расписанию, эскалацию и правила безопасности. Kit 5 B: неделя 1.
- EN: Improve the agent ("Improve\nthe agent") | Error log, test set, cron, escalation, security, Kit 5 B | We fix the agent using the mistakes from pilot week 1. We add a scheduled report, escalation and security rules. Kit 5 B: week 1.

**Day 6**
- UZ: Natijalar va demo kuni ("Natijalar va\ndemo kuni") | Baseline va farq, vazifa narxi, ROI, qaror, build yoki buy, demo | Pilot vaqt, pul va xatolarda nimani oʻzgartirganini hisoblaymiz va davom ettirish, oʻzgartirish yoki toʻxtatishni hal qilamiz. Keyin natijani taqdim etasiz. Kit 5 B: yakuniy raqamlar.
- RU: Итоги и демо-день ("Итоги и\nдемо-день") | Baseline и разница, цена задачи, ROI, решение, build или buy, демо | Считаем, что пилот изменил во времени, деньгах и ошибках, и решаем: продолжить, изменить или остановить. Потом показываем результат. Kit 5 B: итоговые цифры.
- EN: Results and demo day ("Results and\ndemo day") | Baseline and delta, cost per task, ROI, the decision, build or buy, demo | We work out what the pilot changed in time, money and errors, and decide to continue, change or stop. Then you present it. Kit 5 B: final numbers.

**topics[]**

UZ (RU/EN as in the planner report: same items, translated):
- 1: AI qatlamlari · Maʼlumot qayerga ketadi · LLM va token · Kontekst oynasi · Model darajalari · Frontier va open-weight · Gallyutsinatsiya · NotebookLM · Kit 1
- 2: Harness · Claude Code · Kompaniya papkasi · CLAUDE.md · Plan mode · PRD · Skill · Kit 2
- 3: API · API kaliti va .env · MCP va connector · Frontend va backend · Open source · System prompt · Agent v0 · Kit 3
- 4: Lokal va server · VPS · Domen va DNS · Git va GitHub · Pilot · Muvaffaqiyat va toʻxtash sharti · Kit 5 A · Kit 4
- 5: Builder va assistent · Cron · Eskalatsiya · Test toʻplami · Prompt injection · Maʼlumotlar tartibi · Kit 5 B
- 6: Baseline va farq · Bitta vazifa narxi · Topilgan pul · ROI · Davom, oʻzgartirish yoki toʻxtatish · Build, buy yoki open source · Demo
- Lesson 0: Kompyuter · Google akkaunt · Claude · Warp va Claude Code

RU:
- 1: Слои AI · Куда уходят данные · LLM и токены · Контекстное окно · Уровни моделей · Frontier и open-weight · Галлюцинации · NotebookLM · Kit 1
- 2: Harness · Claude Code · Папка компании · CLAUDE.md · Plan mode · PRD · Skill · Kit 2
- 3: API · API-ключ и .env · MCP и connector · Frontend и backend · Open source · System prompt · Агент v0 · Kit 3
- 4: Локально и на сервере · VPS · Домен и DNS · Git и GitHub · Пилот · Критерии успеха и стоп-условие · Kit 5 A · Kit 4
- 5: Builder и ассистент · Cron · Эскалация · Тестовый набор · Prompt injection · Порядок в данных · Kit 5 B
- 6: Baseline и разница · Цена одной задачи · Найденные деньги · ROI · Продолжить, изменить или остановить · Build, buy или open source · Демо

EN:
- 1: AI layers · Where your data goes · LLMs and tokens · Context window · Model tiers · Frontier vs open-weight · Hallucination · NotebookLM · Kit 1
- 2: Harness · Claude Code · Company folder · CLAUDE.md · Plan mode · PRD · Skills · Kit 2
- 3: API · API keys and .env · MCP and connectors · Frontend and backend · Open source · System prompt · Agent v0 · Kit 3
- 4: Local vs server · VPS · Domain and DNS · Git and GitHub · Pilot · Success and stop condition · Kit 5 A · Kit 4
- 5: Builder vs assistant · Cron jobs · Escalation · Test set · Prompt injection · Data governance · Kit 5 B
- 6: Baseline and delta · Cost per task · Money found · ROI · Continue, change or stop · Build, buy or open source · Demo

**New UI strings (UZ / RU / EN)**
- `lesson.soon`: Materiallar tez orada shu yerda chiqadi. / Материалы скоро появятся здесь. / The materials will appear here soon.
- `note.soon`: Ochiq · materiallar tez orada / Открыт · материалы скоро / Open · materials soon
- `units.am`: amaliyot / практика / practice
- `unit.kt`, `units.kt`: Kit / kit
- `lock.desc_n`: Slaydlar, amaliyot, kit va vazifa dars kuni shu yerda chiqadi. / Слайды, практика, kit и задание появятся здесь в день урока. / The slides, practice, kit and homework will appear here on the day of the lesson.
- `next.all_done`: Hammasi bajarildi ✓ / Всё выполнено ✓ / All done ✓
- `menu.course_tba`: 6 dars, sanasi keyinroq / 6 уроков, даты позже / 6 lessons, dates to follow

**Prep items (UZ; B writes ru/en translations)**

00 Kompyuter
- Note: macOS yoki Windows noutbuk, dastur oʻrnatish huquqi bilan. Telefon yoki planshet yetarli emas.
- Steps:
  1. Darsga oʻz noutbukingiz bilan keling. Praktikum boshdan-oxir amaliy.
  2. Administrator huquqi borligini tekshiring: dastur oʻrnata olishingiz kerak. Ish kompyuteri boʻlsa, IT boʻlimidan soʻrang.
  3. Diskda kamida 5 GB boʻsh joy qoldiring.
  4. Quvvat adapterini ham oling.

01 Google akkaunt
- Note: NotebookLM, Gemini va Google Sheets shu akkaunt orqali ochiladi. Akkauntingiz boʻlsa, yangisi shart emas.
- Steps: the four 2.0 steps.
- Action: Google akkaunt ochish.

02 Claude obunasi
- Note: Praktikumning asosiy vositasi. Kamida Pro tarifi kerak, 2-darsdan Max tavsiya etiladi.
- Steps:
  1. claude.ai ga kiring va «Continue with Google» orqali roʻyxatdan oʻting.
  2. Settings → Billing boʻlimida Pro tarifini tanlang. Narxi oyiga $20.
  3. Toʻlov xalqaro Visa yoki Mastercard bilan. Kartada dollar hisobi va onlayn toʻlov yoqilgan boʻlsin. Uzcard va Humo ishlamaydi.
  4. claude.ai/download sahifasidan Claude dasturini oʻrnating va oʻsha akkaunt bilan kiring.
- Footnote: 2-darsdan Claude Code koʻp ishlatiladi va Pro limiti tez tugashi mumkin. Shunda Max tarifiga oʻting (oyiga $100 dan).
- Actions:
  - Claude dasturini yuklash
  - claude.ai da hisob ochish (quiet)

03 Warp va Claude Code
- Note: Claude Code Warp terminalida ishlaydi. Oʻrnating va bir marta ochib koʻring.
- Steps:
  1. warp.dev saytidan Warpʼni yuklab oling va oʻrnating.
  2. Mac: Warpʼni oching va kiriting: curl -fsSL https://claude.ai/install.sh | bash
  3. Windows: Warpʼni oching va kiriting: irm https://claude.ai/install.ps1 | iex
  4. claude deb yozing va Enter bosing. Brauzer ochiladi: Claude akkauntingiz bilan kiring.
  5. Claude Code salomingizga javob bersa, hammasi tayyor.
- Footnote: Oʻrnatish chiqmasa, xatoning skrinshotini mentoringizga yuboring. 1-dars oxirida mentorlar yordam beradi.
- Actions:
  - Warpʼni yuklab olish (https://www.warp.dev/)
  - Claude Code qoʻllanmasi (quiet)

Verify these facts before shipping: the install commands, whether Windows needs Git for Windows, the Billing path, the Max price, the URLs.

## 10. Defaults
- Kit is not counted in progress.
- The review flag opens all 6 lessons early (never beats TBA or a missing group).
- `pli` copy rows are kept, unused.
- Old i18n keys and CSS are left for a later cleanup.

## User review (2026-10-29, final)
- Titles and topics in section 9: APPROVED as drafted.
- Git: `git init` the project folder (local only, never pushed). Commit a snapshot of today's state before the change. Commits as javlonbeck, with no Claude/AI attribution.
- Kit tab = the day's form (.md) PLUS the ready-made /kit skill (zip), from Day 1. So students who fall behind can install it.
- Week 0 setup call: NOT mentioned on the platform.
- Open question 2 (Kit 5 B on Day 2): default to putting the baseline instructions in Day 2 Vazifa. Add the Kit 5 B form to Day 2's Kit group too ("Kit 5 B: Agentgacha ustuni"). This is content only, so the block model already allows it.
- Open question 6 (copyable prompts): not now. Files + text are enough for launch. Add `prompts[]` when the Day 1 materials need it.
- Prep PDF date line "21-noyabr (shanba guruhi) yoki 22-noyabr (yakshanba guruhi)": OK (default).
