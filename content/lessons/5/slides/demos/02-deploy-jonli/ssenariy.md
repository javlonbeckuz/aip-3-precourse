# Demo 02: deploy in plain words, live (0:28-0:33)

Curriculum Day 4 demo 2: "Here are my VPS details in .env. Deploy this agent, connect bot X, set it to restart if it crashes."
The path is the pilot template’s `deploy/deploy.py` (owned by the pilot-template agent); do not improvise another one on stage.
Deck slides 12-14; the crash demo is slide 14.
Instructor notes in English; lines marked UZ are said to the room.

## Before class

- Demo server prepared as in demo 01 (setup already run, service stopped).
- Demo app has `DEPLOY_HOST=vps` and `ALLOWED_USER_IDS=<your own Telegram ID>` in `.env`.
- Rehearse once on Saturday from the venue network: the whole `deploy.py` run takes 1-3 minutes (`uv sync` on the server dominates the first time).
- Open these files in a browser tab for the fallback: `../../exercises/namuna/natijalar/02-env.txt`, `03-deploy.txt`, `07-qulash.txt`, `08-qayta-yuklash.txt`.

## On stage

1. Warp tab 1: **Ctrl+C** to stop the laptop bot from demo 01, before anything else.
   One token runs in one place; a laptop bot still polling when the server bot starts gives Telegram's 409 Conflict (playtest D4-03).
   UZ: "Avval noutbukdagi botni to‘xtataman: bitta token - bitta joy."
2. Warp tab 2, Claude Code in the demo `app/` folder.
   Paste the prompt from slide 12:

   ```text
   "uv run python deploy/deploy.py env" ni ishga tushir. .env faylini ochma va o'qima.

   Keyin "uv run python deploy/deploy.py" ni ishga tushir. Tugagach, natijani menga oddiy tilda 3-4 gapda tushuntir: testlar o'tdimi, serverda tekshiruv o'tdimi, bot ishlayaptimi.
   ```

   Approve the two commands when Claude asks.
   UZ: "Men buyruq yozmayapman: Claude Code’ga oddiy o‘zbekcha aytdim."

3. While it runs, go to slide 13 and narrate the five steps (tests on the laptop, upload without `.env`, install, check with the server `.env`, start and watch 8 seconds).
   Point out the line `.env is on the server (/opt/pilot/.env, readable only by the bot)`.

4. When `OK: pilot-bot is running release ...` appears, read Claude’s 3-4 sentence summary aloud: that is what owners will get too.
   The demo app is the Baraka sample, so the check prints `⚠️ Baraka Office namunasi hali bor`; say it out loud: UZ: "Menda bu qator bor, chunki bu kursning demo kompaniyasi. Sizda bu qator bo‘lmasligi kerak: chiqsa, deploy qilmaysiz (2-mashq, 1.5-qadam)."
   The phone shows `🟢 «...» ishga tushdi` within seconds.

5. Go to demo 01 part B (slide 15).

6. Crash demo (slide 14, 1 minute), in Warp tab 3, typed by you, not by Claude:

   ```bash
   ssh vps 'systemctl show -p MainPID --value pilot-bot'
   ssh vps 'kill -9 <that number>'
   sleep 6; ssh vps 'systemctl status pilot-bot --no-pager | head -5'
   ```

   Expected: a new PID, `active (running) since ... 3s ago`, and the log line `Scheduled restart job, restart counter is at 1` (recorded: `natijalar/07-qulash.txt`).
   UZ: "Botni ataylab o‘ldirdim. Besh soniya - u yana tirik. Bu systemd: serverdagi navbatchi."

   Do not reboot the demo server live (it takes 30-90 seconds and the room loses the thread); quote the recorded reboot (`08-qayta-yuklash.txt`).

## Fallback

- Deploy fails on stage: read the error with the room and ask Claude "bu xato nimani bildiradi?"; that is the habit we teach.
  Then switch to slide 13 (recorded output) and move on; fix it in the break.
- Wi-Fi down: phone hotspot for the laptop (SSH needs very little data), or present slides 13-14 as recordings.

## What the recordings are

`natijalar/*.txt` come from `_build/sandbox/run_day4.py`: a fresh `ubuntu:24.04` container with systemd and SSH stands in for the VPS, the pilot template is deployed exactly as the exercise prompts say (`DEPLOY_HOST=vps` through an `~/.ssh/config` alias, as Week 0 sets it up), and Telegram and OpenRouter are the template’s local fakes.
Addresses are rewritten to the documentation IP 203.0.113.10 and the container name to `baraka-vps`.
The same run passed on `ubuntu:26.04` (`_build/sandbox/out/result-ubuntu-26.04.md`).
Not covered: a real provider server, a real reboot, Windows laptops.
