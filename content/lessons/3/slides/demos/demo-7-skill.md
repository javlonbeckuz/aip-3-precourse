# Demo 7: turn the Kit 1 prompt into a skill, run it, then the safety read

Run sheet 2:30-2:38 · 8 minutes · slides 38-41 · bold term: **Skill**; reference terms: frontmatter, plugin, prompt injection via skills.

## What the room must take away

1. A skill is a saved instruction file Claude loads when the job comes up, like a restaurant tech card: every cook makes the dish the same way.
2. It lives in the company folder at `.claude/skills/<name>/SKILL.md`; the top, between three dashes, says its name and when to use it (frontmatter).
3. The long Kit 1 prompt from Day 1 becomes one word: `/suhbat-tahlili <file>`.
4. Skills and plugins can carry harmful instructions; read before you install, even the course’s own.

Facts checked 2026-11-03 (code.claude.com/docs/en/skills, /en/plugins/security):
project skills live in `.claude/skills/<name>/SKILL.md` and are invoked as `/<name>`; `description` tells Claude when to use it; "A Claude Code plugin you install can execute arbitrary code on your machine with your user privileges."
Tested on 2026-11-03: Claude Code always asks before writing into `.claude/` (even in "accept edits" mode); headless runs without that approval could not create the skill.
So in class the participant must answer "Yes" to that prompt.

## Setup

- Warp tab 2 in `~/Praktikum/baraka/kompaniya`, `/clear`, `/model sonnet`.
- `kit1-interviews/otabek-transcript.md` is in the live folder (`setup-demo-machine.sh` copies it from `demos/inputs/`).
- The Kit 1 chat prompt open in a text editor (from `prompt-pack.md`, section 4, or `kits/KIT_01_...md`).
- Fallback: `~/Praktikum/baraka-tayyor/kompaniya/.claude/skills/suhbat-tahlili/SKILL.md` and `demos/expected/suhbat-tahlili-otabek.md`.

## Part A (2:30-2:35): make it and run it

| Step | Do | What appears | Say (UZ) |
|---|---|---|---|
| 1 | Slide 39 (tech card, three dashes). | - | "1-darsdagi uzun promptni har safar qidirib, nusxalab yurasizmi? Endi u bitta so‘z bo‘ladi." |
| 2 | Paste Exercise 8, prompt 1, with the Kit 1 prompt at the end. | Claude asks permission to write `.claude/skills/suhbat-tahlili/SKILL.md` | "U «.claude» papkasiga yozish uchun doim ruxsat so‘raydi. «Yes»." |
| 3 | "Yes". Then type `/` and find `suhbat-tahlili`. | The skill in the menu (if not: `/exit`, `claude`) | "Mana, menyuda." |
| 4 | `/suhbat-tahlili kit1-interviews/otabek-transcript.md` | Number check table, task table with B.4 sums, questions for Otabek aka (1-2 minutes) | (while it runs, see below) |
| 5 | Point at two rows of the number check. | «bir uch yuz ming» read as about 300 000 so‘m, not 1 300 000; «1520 ta savol» flagged as probably 15-20 with [?] | "1-darsdagi tuzoq. Skill uni har safar ushlaydi, chunki qoida skill ichida yozilgan." |

While it runs: "Skill - siz bir marta yozgan yaxshi prompt. Kursdagi /kit1 ... /kit5 ham xuddi shunday fayllar, faqat uzunroq."

Expected output: `demos/expected/suhbat-tahlili-otabek.md` (real run, 2026-11-03, Sonnet 5.5).
One honest weakness to mention if it repeats: in that run Claude estimated "omborchiga qo‘ng‘iroq" as a quarter of the questions and marked it [?]; say "taxmin [?] bilan belgilangan, demak xodimdan so‘raymiz".

## Part B (2:35-2:38): the safety read

| Step | Do | Say (UZ) |
|---|---|---|
| 1 | Slide 41: the 2.0 story. | "O‘tgan kursda bir ishtirokchi, 1C administratori, internetdan bir vosita o‘rnatdi. U administrator hisobini o‘chirib, yangisini yaratmoqchi bo‘ldi. Ishtirokchi «endi qo‘rqib qoldim» dedi." |
| 2 | Quote the official line. | "Rasmiy hujjatda yozilgan: o‘rnatilgan plagin kompyuteringizda siz nomingizdan istalgan buyruqni bajara oladi." |
| 3 | Paste Exercise 8, prompt 2 (safety read of `../skills`). | "Kursning o‘z skill’larini ham tekshiramiz. Qoida hammaga bir xil." |
| 4 | Read the table: only `.md` files in the company folder (and one `.html` for /kit2), pre-approved tools Read Write Edit Glob Grep, no Bash, no internet, no passwords, asks before overwriting. | "Hammasi tushunarli. Endi o‘rnatsak bo‘ladi." |

Source of the story: `final-curriculum/_build/evidence/2-0-day-2.md`, section 10b point 4, and `final-curriculum/evidence-review.md` line 78 (Saturday group, part 2, 01:26).
Do not repeat the 2.0 mistake of telling the room a recommended skill needs no checking (same evidence file, point 4).

## Fallback

- Permission prompt answered "No" by accident: send prompt 1 again.
- Skill not in the menu after restart: show the fallback `SKILL.md` and run the prompt by hand; the point still lands.
- Live run slow: show `demos/expected/suhbat-tahlili-otabek.md` (slide 40 has the two key rows).
