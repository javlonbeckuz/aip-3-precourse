# Day 2 instructor run sheet: Claude Code, and which process to start with

Instructor notes, English.
Participant-facing material is in Uzbek in `exercises/`, `handouts/`, `homework.md` and `prompt-pack.md`.
Curriculum of record: `final-curriculum/praktikum-3-curriculum.md`, Day 2 section (lines 230-330).

| Item | Detail |
|---|---|
| Session | "2-dars" (Day 2): Saturday 28 November (Saturday group) or Sunday 29 November 2026 (Sunday group), same content; run this sheet twice. The Baraka example keeps the Sunday-group dates; the Saturday group is one day earlier. |
| Length | 180 minutes, one 10-minute break at 1:50 |
| Room | 40 owners at 8 tables of 5, one mentor per table (mentor page: `mentor-handbook/day-2.md`) |
| Kit | Kit 2 "Qaysi jarayondan boshlaymiz?" (`kits/KIT_02_...`, skill `/kit2`) |
| Habits introduced today | "AI yo‘q deb tasavvur qiling" (Imagine there is no AI), "Skrinshot qilib so‘rang" (Screenshot and ask), "5 yoshli bolaga tushuntir" (Explain like I'm 5) |
| Bold terms taught live | Harness; Claude web / desktop / Claude Code; CLAUDE.md; Plan mode; PRD; Skill; Screenshot and ask |

## What participants leave with

1. A `kompaniya/` folder on their laptop with their Kit 1 files and a `CLAUDE.md` that describes the company, checked by one question Claude answers correctly.
2. Global instructions saved in the Claude app and in `~/.claude/CLAUDE.md`.
3. A Kit 2 scoring table (`kit2-scoring/form-a-scoring.md`) with at least one score they corrected themselves, and the Value/Ease matrix as an HTML page.
4. A draft pilot choice (B.1-B.3) to confirm with the department head.
5. `prd.md` and `tasks.md` for the likely pilot, made in plan mode.
6. Their own first skill and the course skills `/kit1` to `/kit5` installed after a safety read.

## Evidence this plan is built on

- 2.0 Day 2 had 2.6-6.5% visible hands-on time; the plan below has 101 of 180 minutes at the keyboard (`final-curriculum/_build/evidence/2-0-day-2.md`, section 11, lesson 1).
- No instructor block is longer than 10 minutes without the room touching a keyboard, except the opening demo block (30 minutes), which has a 3-minute "everyone types one line" break at 0:33.
- The 2.0 live funnel failed at the BotFather 40-bot limit and on a pre-warmed instructor machine (lesson 3, section 10b point 1).
  Today nothing integration-heavy is live; every demo has a pre-recorded or pre-run fallback, and the demo machine is a clean account on a Pro plan.
- 15 minutes were lost to side demos in 2.0 (lesson 6).
  Rule for today: one demo window open at a time, no parallel tabs, no content tangents; "while it runs" talking points are written into each demo script.
- 2.0 told owners not to bother checking a recommended skill (section 10b point 4).
  Today the course's own skills go through the same safety read as any other skill.

## Before class

### Three days before (Thursday)

- [ ] Run `python3 day-2/_build/make_starter.py` and send `day-2/_build/dist/2-dars-kompaniya-papkasi.zip` to every group chat with the Friday reminder (mentors: "B shakllaringizni .md qilib olib keling").
- [ ] Copy the same zip and `company-folder-starter/baraka-office/` to 8 USB sticks, one per mentor (venue Wi-Fi is not reliable).
- [ ] Print per participant: `handouts/pdf/claude-code-shpargalka.pdf` (1 page), `handouts/pdf/lugat.pdf` (3 pages), the Kit 2 forms from `kits/KIT_02_Qaysi_jarayondan_boshlaymiz_UZ_LATN.pdf`.
  Print per mentor: `mentor-handbook/day-2.md` and `homework.md` (last section is the Day 3 mentor check).

### The day before

- [ ] Demo laptop: a separate macOS user "Praktikum Demo" with nothing private on it, Warp, Claude Code (`claude --version`), logged in to a **Pro** account, the same plan most of the room has (2.0 evidence: the instructor demoed on the top plan while the room was on Pro; plans today: Pro $20, Max $100, Ultra $200, plus 12% VAT).
- [ ] On that user run `bash day-2/demos/inputs/setup-demo-machine.sh`: it fills `~/Desktop` with 40 messy demo files, puts `~/Praktikum/baraka/kompaniya/` (the Baraka example without Kit 2 outputs) and `~/Praktikum/baraka-tayyor/kompaniya/` (the full worked example) in place, and copies the error screenshot for the "Screenshot and ask" demo.
- [ ] Rehearse every demo once end to end on that user; then run `/clear` and close Warp, so no session memory carries into class.
- [ ] Demo 3 only: Adobe Illustrator installed and opened once, or decide now to use the Keynote fallback; for the computer-use route, enable it once (`/mcp`, select `computer-use`, Enable; grant Accessibility and Screen Recording).
- [ ] Open the deck `day-2/deck/index.html` in Chrome full screen and press `F` for full screen, `N` or `P` for the notes drawer (it opens over the slide, so the room sees it on a mirrored screen); check slide 1 renders the deck font (Inter) and the logo with Wi-Fi off.

### 60 minutes before

- [ ] Projector at 1920x1080; Warp font size 18 or more, light theme for readability.
- [ ] Two Warp tabs ready on the demo user: tab 1 in `~/Desktop`, tab 2 in `~/Praktikum/baraka/kompaniya`.
- [ ] Mentor huddle (10 min): today's checklist codes 2.1-2.10, who did not bring Form B files (they use the Baraka Form B files from the zip; FAQ X-02), the "Screenshot and ask" first-response rule.

## Minute by minute

Slide numbers refer to `deck/index.html`; speaker notes are in the deck (press `N`).

| Time | Min | Instructor does and says | Room does | Slide | Material | Fallback |
|---|---|---|---|---|---|---|
| 0:00-0:03 | 3 | Welcome. Today's three results on one slide: company folder with CLAUDE.md, a chosen pilot on the matrix, a first plan (PRD). "By 3:00 every one of you has these three files on your own laptop." | Listen | 1-3 | - | - |
| 0:03-0:15 | 12 | Walks the tables. Mentors run checks 2.1-2.4 (Form B files as .md, corrected numbers, B.9 filled, `claude` starts in Warp). Participants unzip the starter (zip from Friday's chat or the USB stick). | Mentor check at tables; unzip `2-dars-kompaniya-papkasi.zip` | 4 | `company-folder-starter/kompaniya.qollanma.md` | No Form B: use the three Baraka Form B files in the zip (`baraka-office/kompaniya/kit1-interviews/`) today, bring real ones by Wednesday (X-02). Claude Code does not start: mentor fixes now with `week-0-setup/doctor/` scripts; if not fixed by 0:20, the participant pairs with a neighbour for the demo block. |
| 0:15-0:20 | 5 | Two volunteers share one surprising finding from Kit 1 (60-90 seconds each). Instructor links: "Today we turn these task lists into one choice." | 2 people speak | 5 | - | No volunteer: instructor reads the Baraka finding (sales staff promise "3 days", the contract says 7 working days). |
| 0:20-0:23 | 3 | Opening line, slowly: "Kod degan so‘zni unuting. Bu dasturlash vositasi emas. Bu kompyuteringiz yonida o‘tirib ishlaydigan, yollagan mutaxassisingiz. Kod - u biladigan ishlardan faqat bittasi." | Listen | 6 | - | - |
| 0:23-0:28 | 5 | **Demo 1.** Model vs harness: same engine, different car. The three doors: Claude app (chat and long tasks, the former Cowork now in the same window), Claude desktop app (also has a Code tab), Claude Code in the terminal. Ask the same question about the Baraka folder in chat and in Claude Code; chat needs uploads, Claude Code opens the folder itself. | Watch | 7-9 | `demos/demo-1-bir-miya-uch-eshik.md` | Pre-run screenshots on slides 8-9. |
| 0:28-0:33 | 5 | Warp tour: the folder path at the top, .md files render nicely, "it is just another chat window". Keys: Esc = "Labbay?" (stops, does not cancel the session), Shift+Tab cycles modes, `/model`, `/usage`. Point at the cheat sheet; do not teach the full list. | Find the cheat sheet on the table | 10-11 | `handouts/pdf/claude-code-shpargalka.pdf` | - |
| 0:33-0:36 | 3 | "Everyone: open Warp, type `claude`, then: Salom! Bu papkada nima bor? Oddiy so‘zlar bilan ayt." | Everyone types one line | 12 | - | Mentors type for anyone stuck; nobody installs anything now. |
| 0:36-0:42 | 6 | **Demo 2.** "Desktop papkamni tartibga keltir" in plain Uzbek. Show the plan first, then the moves, then the move log, then "qaytar" (undo) on one folder. Say: files moved by commands are not covered by `/rewind`, so we always ask for a move log or work on a copy. | Watch | 13 | `demos/demo-2-desktop-tartibi.md` | Pre-run before/after screenshots on slide 13. |
| 0:42-0:46 | 4 | **Demo 3.** "Illustrator’ni och va ko‘k doira chiz." Point: Claude Code is not only for code. Hard stop at 0:46 whatever happens. | Watch | 14 | `demos/demo-3-boshqa-dastur.md` | Keynote instead of Illustrator; second fallback: an SVG circle opened in the browser. |
| 0:46-0:50 | 4 | **Screenshot and ask** and **Explain like I'm 5**: paste the error screenshot (macOS Ctrl+V, Windows Alt+V, or drag the file in), Claude explains and fixes. Then "Harness nima? 5 yoshli bolaga tushuntir." Mentors' rule from now: before helping, ask "skrinshot qilib Claude’dan so‘radingizmi?" | Watch | 15-16 | `demos/inputs/xato-skrinshot.png` | If paste fails in Warp, drag the PNG file into the window (inserts the path). |
| 0:50-0:53 | 3 | **Demo 4.** Same customer question in the same Baraka folder, without and with CLAUDE.md: "Kafolat necha yil? Chirchiqqa yetkazib berish bepulmi?" Without: correct facts, but it hedges on the KP that promises 36 months and free delivery. With: it states the KP is wrong, greets «Hurmatli ... aka», names Otabek aka’s Telegram, shows the km formula. Tested 2026-11-03. | Watch | 17-18 | `demos/demo-4-claude-md-va-xotira.md` | Pre-run answers on slide 18 and in `demos/expected/`. |
| 0:53-0:59 | 6 | Exercise 1, first chore. | Organize Downloads, nothing deleted | 19 | `exercises/01-birinchi-topshiriq.md` | Behind schedule at 0:53: skip, it becomes homework. |
| 0:59-1:14 | 15 | Exercise 2, company folder: put the zip contents into the `~/praktikum` folder from Week 0 (not Documents: OneDrive on Windows), copy Kit 1 files in, open Claude Code there, `/init`, then the "interview me" prompt fills CLAUDE.md, then the check question. Instructor shows each step once on screen, then walks. | Build `kompaniya/` | 20-22 | `exercises/02-kompaniya-papkasi.md` | `/init` slow or odd: skip it, use the interview prompt only. No own Form B: use the Baraka files. |
| 1:14-1:20 | 6 | Exercise 3, global instructions: Claude app (Settings, "Your Claude", Instructions) and Claude Code (`~/.claude/CLAUDE.md`). | Paste the 5 rules | 23 | `exercises/03-global-korsatmalar.md` | Settings menu named differently on someone's account: search "Instructions" in Settings; Claude Code part is enough today. |
| 1:20-1:25 | 5 | **Demo 5.** Kit 2 from three Baraka Form B files on Sonnet: processes, scores with reasons and line numbers, Value = A.2+A.3+A.7, Ease = A.4+A.5+A.6, threshold 9, matrix page. Correct one score live: process 1, A.6 = 2 with its reason, so Ease becomes 10 (the course example's value). Model choice: "sorting work, Sonnet or Haiku; save Opus for the choice and the plan." | Watch, `/model sonnet` | 24-27 | `demos/demo-5-kit2-fayllardan.md` | Open the finished Baraka files from `~/Praktikum/baraka-tayyor/`. |
| 1:25-1:40 | 15 | Exercise 4, Kit 2 scoring on their own Form B files with the prompt. Mentors check: every score has a reason, at least one score corrected by the owner, sums shown. | Score own processes | 28 | `exercises/04-kit2-baholash.md` | Prompt goes wrong: run `/kit2` from the starter's `skills/kit2` (mentor installs it for that participant). Limit reached: switch to Haiku, or score on the paper form. |
| 1:40-1:47 | 7 | Exercise 5, matrix as an HTML page, opened in the browser. | Draw matrix | 29 | `exercises/05-kit2-matritsa.md` | Page looks broken: use the course template (`skills/kit2/matrix-template.html`) as written in the exercise fallback. |
| 1:47-1:50 | 3 | Exercise 6, part 1: `/usage`; say which model they used for scoring and why. | Check usage | 30 | `exercises/06-model-tanlash.md` | - |
| 1:50-2:00 | 10 | Break. Mentors mark who is behind on 2.5-2.7. Instructor runs `/clear` on the demo machine and opens tab 2. | Break | 31 | - | - |
| 2:00-2:04 | 4 | Exercise 6, part 2: `/model opus`, the choice prompt: best and second candidate, three ways it could fail, one question to answer first; owner writes a draft B.1-B.3 and adds B.1 to CLAUDE.md. | Draft pilot choice | 32 | `exercises/06-model-tanlash.md` | Opus limit on Pro: stay on Sonnet, it is fine for this. |
| 2:04-2:12 | 8 | **Demo 6.** "AI yo‘q deb tasavvur qiling": who would build this tool without AI (business analyst, developer, designer, tester, the department head)? Then plan mode (Shift+Tab until "plan mode on", or `/plan`), plan the Baraka sales assistant, answer 2-3 of its questions, show the PRD, approve, `prd.md` and `tasks.md` appear. "PRD = TZ. A vendor who cannot give you one is guessing." | Watch | 33-36 | `demos/demo-6-plan-mode-prd.md` | Pre-run PRD in `~/Praktikum/baraka-tayyor/kompaniya/prd.md`. |
| 2:12-2:30 | 18 | Exercise 7, first PRD in plan mode on their own likely pilot. Mentors: if Claude asks "Python or Node?", the owner answers "sen tanla, eng soddasini" (C-03). | Plan mode, PRD, tasks | 37 | `exercises/07-birinchi-prd.md` | Running late: stop at the plan (no files) and finish `prd.md` at home. |
| 2:30-2:35 | 5 | **Demo 7.** What a skill is (restaurant tech card), the three dashes of frontmatter, turn the Kit 1 prompt into `/suhbat-tahlili`, run it on Otabek's transcript; it catches "bir uch yuz ming". | Watch | 38-40 | `demos/demo-7-skill.md` | Pre-run output in `demos/expected/`. |
| 2:35-2:38 | 3 | Skill safety: the 2.0 story of a 1C administrator whose installed tool tried to delete the admin account; the official line "a plugin can execute arbitrary code on your machine". Rule: read before you install, even the course's own skills. | Watch | 41 | `demos/demo-7-skill.md` (part C) | - |
| 2:38-2:50 | 12 | Exercise 8: own skill from the Kit 1 prompt (6 min), safety read of the course skills, install `/kit1`-`/kit5` (4 min), check the `/` menu (2 min). | Make and install skills | 42 | `exercises/08-birinchi-skill.md` | Own skill fails: install the course skills anyway (needed for homework `/kit5 baseline`); own skill becomes homework. |
| 2:50-2:57 | 7 | Homework, one slide per item: confirm B.1-B.3 with the department head; baseline from history with `/kit5 baseline` (show the Baraka example: Telegram export counted by Claude Code); BotFather bot (`baraka_savdo_bot`-style name), token private; check the OpenRouter key and limit set up in Week 0 (no new account, no new top-up); list the systems the pilot touches and whether each has an API. | Write the department-head meeting date on the homework sheet | 43-46 | `homework.md` | - |
| 2:57-3:00 | 3 | Mentors confirm 2.5-2.10 at the tables; each participant says their homework and their next blocker. Day 3 teaser: "Next week your plan becomes a working agent v0." | Tables | 47 | `mentor-handbook/day-2.md` | - |

Time at the keyboard: 3 + 6 + 15 + 6 + 15 + 7 + 3 + 4 + 18 + 12 = 89 minutes of exercises, plus 12 minutes of unzipping and table checks at 0:03-0:15 = 101 of 180 minutes (56%).
Curriculum target: about 60% hands-on; the shortfall is the 0:20-0:50 demo block the curriculum fixes.

## Bold terms and where each is demonstrated

| Term (curriculum) | Live demo | Minute | Exercise |
|---|---|---|---|
| Harness | Demo 1: same model in chat and in Claude Code | 0:23 | - |
| Claude web / desktop / Claude Code | Demo 1: the Baraka folder in chat (upload) vs Claude Code (opens the folder) | 0:23 | Ex 1 |
| CLAUDE.md | Demo 4: same customer question without and with CLAUDE.md (the KP contradicts the contract) | 0:50 | Ex 2, Ex 3 |
| Plan mode (Shift+Tab) | Demo 6: plan the sales assistant, questions before code | 2:04 | Ex 7 |
| PRD | Demo 6: `prd.md` and `tasks.md` | 2:04 | Ex 7 |
| Skill | Demo 7: Kit 1 prompt to `/suhbat-tahlili` | 2:30 | Ex 8 |
| Screenshot and ask | Demo at 0:46: paste an error screenshot | 0:46 | every block (mentor rule) |

Reference terms (glossary, not taught live): agentic, terminal / CLI / Warp, working directory, .md file, global instructions, nested CLAUDE.md, `/init`, task list, frontmatter, plugin, prompt injection via skills, key commands.
All are on `handouts/lugat.md`; the key commands are on the cheat sheet.

## Habits introduced today

| Habit | Where it is introduced | How it is reinforced today |
|---|---|---|
| AI yo‘q deb tasavvur qiling | Demo 6 at 2:04, before plan mode | Ex 7 prompt starts with it |
| Skrinshot qilib so‘rang | 0:46 | Mentors ask it before every rescue from 0:50 on |
| 5 yoshli bolaga tushuntir | 0:46 ("Harness nima?") | Glossary handout footer; any new term in Ex 7 |

## If you are running late

Cut in this order, and say what moved to homework:

1. Exercise 1 (first chore) at 0:53: homework.
2. Demo 3 (Illustrator) at 0:42: one sentence and a slide.
3. Exercise 5 (matrix): mentors install `/kit2` for the table and it draws the matrix from the existing scores in one step.
4. Exercise 7 stops at the plan; `prd.md` is written at home.
5. Exercise 8: own skill becomes homework; the course skills are still installed (homework needs `/kit5`).

Never cut: the company folder (Ex 2), Kit 2 scoring (Ex 4), the homework briefing.

## Fallback cards for the whole day

| Problem | What to do |
|---|---|
| Venue Wi-Fi down | Claude Code needs internet; phones as hotspots for the demo machine first, then for tables in rotation. Exercises that need no model (reading the Baraka example, drawing the matrix on the paper form) fill the gap. |
| Demo machine Claude Code fails | Switch to the pre-run screenshots in the deck (each demo slide has them) and the pre-run files in `~/Praktikum/baraka-tayyor/`. |
| A participant's plan runs out of usage | `/usage` to see it; switch to Haiku (`/model haiku`); continue on paper forms; the Max plan ($100 a month plus 12% VAT) is the course recommendation (decision memo `decisions/02-subscription.md`). |
| Windows laptop | Every exercise has Windows lines; Shift+Tab may need Alt+M; image paste is Alt+V. |
| Claude answers in English | Global instructions (Ex 3) fix it for the next session; for now: "o‘zbekcha javob ber". |
| Fear of deleting files | Nothing is deleted today; every prompt says "o‘chirma"; folder moves come with a log. |

## Facts used today, checked on 2026-11-03

| Fact | Source |
|---|---|
| Claude Code needs Pro or higher; the free plan has no Claude Code | https://code.claude.com/docs/en/setup |
| CLAUDE.md locations, `/init`, under 200 lines, HTML comments stripped, contradicting rules picked arbitrarily, subfolder files load on demand | https://code.claude.com/docs/en/memory |
| Shift+Tab cycles Manual, Accept edits, Plan (then Auto); Windows Alt+M fallback; `claude --permission-mode plan`; `/plan` | https://code.claude.com/docs/en/permission-modes, https://code.claude.com/docs/en/commands |
| Skills live in `.claude/skills/<name>/SKILL.md`, invoked as `/<name>`; `.claude/commands` merged into skills | https://code.claude.com/docs/en/skills |
| "A Claude Code plugin you install can execute arbitrary code on your machine with your user privileges" | https://code.claude.com/docs/en/plugins/security |
| `/rewind` (aliases `/checkpoint`, `/undo`) restores files Claude edited; files changed only by Bash commands are not tracked; not a replacement for Git | https://code.claude.com/docs/en/checkpointing |
| Paste image: macOS Ctrl+V (Cmd+V only in iTerm2), Windows Alt+V | https://code.claude.com/docs/en/interactive-mode |
| `/usage` (aliases `/cost`, `/stats`), `/context`, `/compact`, `/resume`, `/btw` | https://code.claude.com/docs/en/commands |
| Chat and Cowork are now one Claude window; local files and computer use only while Claude Desktop is open | https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude |
| Chat uploads: 500 MB per file, 20 files per chat; Projects 30 MB per file | https://support.claude.com/en/articles/8241126-uploading-files (dated 23 July 2026) |
| Claude app instructions: Settings, "Your Claude" (older layout: "Account"), "Instructions" | https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features |
| Computer use in Claude Code CLI: research preview, macOS, Pro, Max or Ultra (not Team or Enterprise), enabled with `/mcp` | https://code.claude.com/docs/en/computer-use |
| Models in Claude Code: Opus 5.5 (default), Sonnet 5.5, Haiku 5.5, Fable 5.1 | https://code.claude.com/docs/en/model-config |

The curriculum's "no 20 MB upload limit" line is out of date: chat now takes 500 MB per file and 20 files per chat.
Today's slide says instead: Claude Code works on the whole folder on your disk, hundreds of files, without uploading anything.
