# Demo 5: Hermes as a business job (6 minutes, demo only)

Day 5, 0:52-0:58.
Bold term taught: **Builder vs assistant** (second time, with a second assistant).

> **Owner decision (2026-11-03): option D.**
> This follows `decisions/04-always-on-assistant.md`, option D: the owner's pilot bot is the "personal AI assistant" the sales page promises; Hermes is an instructor demo plus an optional, version-pinned install card.
> The owner chose this on 3 Nov 2026 (`_build/overnight-2026-11-03/RULES.md`, "Owner decisions"), replacing the 19 October answer ("Hermes core for everyone").
> Hermes stays an optional demo only: mentors do not install or support it in class; the install card is optional reading for after the course.

## Why only six minutes

In 2.0, Hermes and its setup took 53% of Day 4, a participant challenged its value three times ("Gemini would do this too"), and the instructor said Hermes is taught "because it's the hype on Instagram" (`final-curriculum/_build/evidence/2-0-day-4.md:231`, `:524`, `:548`, `:574`).
1.0's best moment was Hermes reports from a VPS, when Hermes had a job (`evidence/1-0-lessons-5-7.md:615`).
So: show one job, not the product.

## Before the day

- The head mentor's pinned Hermes on a VPS, under its own Linux user, with its **own** Telegram bot (never the pilot's token: one token works in one place only).
- `~/.hermes/SOUL.md` and `~/biznes/AGENTS.md` from `../04-xotira-fayllari/hermes-namuna/`; `~/biznes/hisobot.md` holds a copy of one Baraka daily report.
- One cron job created from Telegram: "har ish kuni 9:00 da ~/biznes/hisobot.md dan 3 qatorli xulosa yubor".
- Record the version here: `hermes --version` = __________ (tested on __________).
  Latest release when this was written: v0.22.6, 2 Nov 2026; 9 releases between 8 Oct and 2 Nov (https://github.com/NousResearch/hermes-agent/releases, read 2026-11-03).
  Install: `curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash` (https://hermes-agent.nousresearch.com/docs, read 2026-11-03); updates with `hermes update`.

## Steps

| Min | Do | Say |
| --- | --- | --- |
| 0 | Phone on the projector, Hermes chat: «Bugun savdo bo‘yicha nima muhim?» | UZ: «Bu Hermes - ochiq kodli doimiy yordamchi, serverda yashaydi.» |
| 1 | It answers from `AGENTS.md` and `hisobot.md`, with «Birinchi qadam:». | UZ: «U kompaniya faktlarini AGENTS.md dan oladi: xuddi bizning botimiz instructions.md dan olgandek.» |
| 2 | «Buni xotirangga saqla: dushanba 10:00 da savdo yig‘ilishi.» Then show `USER.md` in the dashboard or with Claude Code. | UZ: «Xotira - oddiy matn fayli. 1 375 belgi, ataylab kichik.» |
| 3 | Show the cron job list (dashboard CRON page, or ask the bot «qanday rejali ishlaring bor?»). | UZ: «Jadval - bu yerda ham asosiy ish. 9:00 hisobot, xuddi o‘z botingizdagidek.» |
| 4 | Slide: builder vs assistant: Claude Code builds and repairs both bots; the pilot bot serves staff; Hermes serves only you. | UZ: «Claude Code - quruvchi. Bot - yordamchi. Hermes buzilsa ham, Claude Code tuzatadi.» |
| 5 | Close. | UZ: «Hermes ixtiyoriy. Kursda hamma uchun shaxsiy yordamchi - o‘z botingiz: serverda, telefoningizda, 9:00 da hisobot bilan. Piloti barqaror bo‘lganlarga o‘rnatish kartasi bor.» |

## Never on stage

- No install, no debugging: 2.0 lost half a day to it.
- Staff never talk to an agent that has terminal access; Hermes is the owner's alone (`reviews/04-head-mentor-feasibility.md:94-97`).
- Never give any agent your personal Telegram account (MTProto): it could write "lend me money" to your contacts (`evidence/2-0-day-4.md:522`).

## Fallback

`fallback/hermes-qanday-ishlaydi.png` (the 2.0 "how Hermes works" picture) and the four Baraka files in `../04-xotira-fayllari/hermes-namuna/`; one minute, then move on.

## Optional install card

`ornatish-kartasi.md` (Uzbek): for owners whose pilot is stable after Day 5, or for the support month.
Mentors do not support Hermes in class (`decisions/04-always-on-assistant.md`, "Mentor handbook").
