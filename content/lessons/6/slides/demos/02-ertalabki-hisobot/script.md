# Demo 2: the 9:00 report and a scheduled business job

Day 5, part 1 at 0:41-0:46 (the idea), part 2 at 1:50-1:54 (live), before exercise 4.
Bold term taught: **Cron job**; also proactive agent.
Curriculum: "Morning report. ‹Every day at 9:00, send me yesterday's numbers and anything unusual› set up as a cron job" (`praktikum-3-curriculum.md:588`).

## What the room should see

Information comes to you; you do not go and ask for it.
Three places a schedule lives in the pilot, from the simplest:

| Where | Who sets it | Example |
| --- | --- | --- |
| `.env`: `DAILY_REPORT_TIME=09:00`, `WEEKLY_REPORT_DAY=1` | Owner, once | Yesterday's requests, errors, cost, «Diqqat» notes; Monday: the Kit 5 weekly file |
| Phone: `/jadval 09:05 <savol>` | Owner, in 10 seconds | «Eng uzoq harakatsiz turgan 3 ta mahsulot» |
| `agent/schedule.toml` with Claude Code | Owner and Claude Code, then deploy | «1C fayli tekshiruvi» at 10:30 to the person who exports, Monday to Saturday |

A server `crontab` line is the fourth place, for lab skills that build a report with a script (finance `/owner-weekly`, marketing `/mkt-report`): `30 8 * * 1` means every Monday 08:30.

## Materials

| What | Path |
| --- | --- |
| A week of the owner's Telegram, with every report and job | `../../exercises/namuna/baraka-1-hafta/rahbar-telegrami.txt`, `../../exercises/namuna/baraka-2-hafta/rahbar-telegrami.txt` |
| The job added on Day 5 and its test run | `../../exercises/namuna/yaxshilash/agent-v2/schedule.toml`, `job-1c-tekshiruvi.txt` |
| Template guide for jobs | `pilot-template/agent/schedule.qollanma.md` |

## Steps

Part 1 (0:41, 5 minutes): show the owner's chat for Tuesday 15 December: 08:30 low stock, 09:00 daily report.
UZ: «Bu xabarlarni hech kim so‘ramagan. Bot o‘zi, vaqtida yuborgan. Biznesdagi foydaning ko‘pi shu yerda: chatdan emas, jadvaldan.»

Part 2 (1:50, 4 minutes), live on your demo bot:

1. Phone: `/jadval 09:05 Eng uzoq harakatsiz turgan 3 ta mahsulot`.
   The bot confirms: «✅ Har ish kuni soat 09:05 da javob yuboraman ...».
2. Phone: `/jadval` shows the file jobs and the phone job together.
3. Terminal: open `agent/schedule.toml`, show the «1C fayli tekshiruvi» block (`send_to`, `days = "1-6"`).
4. Terminal: `uv run pilot job "1C fayli tekshiruvi"` (no `--send`): it prints the answer the person would get.
   With a file older than 25 hours (on a Sunday: Saturday's file) it says «ODAMGA: ... fayl 28 soatdan beri yangilanmagan (chegara 25 soat)»: that is the job working.
5. Show what happened in week 2: Tuesday 22 Dec the export was late, Otabek aka got the reminder at 10:30 and exported at 10:50 (`baraka-2-hafta/rahbar-telegrami.txt`).

UZ: «Ish odamga boradigan bo‘lsa, u botda bir marta /start bosgan bo‘lsin. Xodimga xabar faqat ish vaqtida boradi: yakshanba guruhida dushanba 9:00 da, shanba guruhida darhol.»

## The weak version to warn against

«Har kuni 7:00 da dunyo yangiliklari va ob-havo»: nothing from the company; the head-mentor and owner reviews call that "a weather app" (`final-curriculum/_build/reviews/01-business-owner.md:191-204`).
And never a per-person table to the whole team: the bot measures the process, not people.

## Fallback

The two `rahbar-telegrami.txt` files have every message with its time; read the Tuesday and Thursday mornings aloud.
