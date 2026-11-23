# Demo 01: the laptop test (0:21 and 0:33)

Curriculum Day 4 demo 1: "Close the laptop; the local bot stops answering. Then show the same bot on a VPS answering from a phone."
It is also the sales-page promise for lesson 4, shown live: "Yordamchi kompyuteringiz o‘chiq bo‘lsa ham ishlab turadi, telefoningiz orqali boshqara olasiz."
Deck slides 8 (part A) and 15 (part B); demo 02 (deploy) runs between them.
Instructor notes in English; lines marked UZ are said to the room.

## Set up the day before (30 minutes)

| What | How | Check |
|---|---|---|
| Demo bot | Your own BotFather bot, not a participant’s; name it like Baraka’s, e.g. `@baraka_demo_bot` | `/start` from your phone answers |
| Demo app | A copy of `pilot-template` in `~/Praktikum/demo-4/app` with a real token and a real OpenRouter key limited to $5 | `uv run pilot check --online` says «Tayyor.» |
| Demo server | Your own Airnet demo box (the course holds no spare servers), with `deploy.py setup` already run and `DEPLOY_HOST=vps` in the demo `.env` | `ssh vps echo ok` prints `ok` over the venue Wi-Fi **and** over your phone hotspot |
| Phone on screen | Phone mirroring to the projector (QuickTime on macOS, or the document camera) | Text readable from the back row |
| Not yet deployed | Run `deploy.py rollback` or stop the service if you rehearsed (`ssh vps systemctl stop pilot-bot`) so 0:28 starts from "only the laptop" | `deploy.py status` shows `inactive` |

## Part A, 0:21 (3 minutes): the laptop dies, the bot dies

1. Warp tab 1: `uv run pilot run` is already running (bot on the laptop).
2. From the phone: `Optima stolidan 8 ta kerak, qancha bo'ladi?` - the answer arrives (about 2-5 seconds with a real model).
3. Close the lid.
   Say nothing for a moment.
4. From the phone: `Start stoli 2 dona necha pul?` - nothing arrives.
   Wait 20 seconds, phone held up.

UZ: "Ko‘ryapsizmi? Savol ketdi, javob yo‘q. Noutbuk uxladi, bot ham uxladi. Biznes vositasi noutbukka bog‘liq bo‘lmasligi kerak."

Leave the lid closed until 0:28.
When you reopen it, the bot in tab 1 may answer the waiting question at once: that is Telegram keeping the message until a bot asks for it (the green path on the diagram, slide 16).
Say so; it is a good bridge.

## Part B, 0:33 (3 minutes): same bot, from the server

Only after demo 02 printed `OK: pilot-bot is running release ...`.

1. The laptop bot was stopped with Ctrl+C at the start of demo 02, before the deploy; check that Warp tab 1 shows no new bot lines.
   If both run, Telegram returns 409 Conflict to one of the two pollers and answers come and go (FAQ B-04).
2. Close the lid.
3. From the phone, in this order:
   - the question that got no answer at 0:21;
   - `/holat` (what is running, which data, when loaded);
   - `/stop`, then any question (the bot answers that it is paused), then `/davom`;
   - `/eslat <two minutes from now> Jamshid aka bilan tender bo'yicha gaplashish` - it fires during the diagram (slide 16); point at the phone when it buzzes;
   - optionally `/eslab_qol Menejerlar «140 lik stol» deganda Optima stolini (WS-102) nazarda tutadi`, then `/xotira`.

   These owner commands (memory, phone jobs `/jadval`, reminders `/eslat`) are what make the pilot bot the owner's personal assistant (`pilot-template/PARTICIPANT_GUIDE.uz.md`, step 2.8).
   In our container run a reminder set from the phone fired on time on the server, and the memory survived a reboot (`_build/sandbox/out/result-ubuntu-24.04.md`).

UZ: "Noutbuk yopiq. 20 daqiqa oldin javob kelmagan savolni yana yozaman... Mana. Bu javob mening noutbukimdan emas, Toshkentdagi serverdan keldi. Boshqaruv esa telefonimda: /stop - bir so‘z bilan to‘xtatdim."

## Fallback (no Wi-Fi, no server, phone mirroring broken)

- Slide 15 shows the recorded phone screen: `telefon-egasi-qisqa.png` (deck) and `telefon-egasi.png` (full) in this folder.
  They are rendered from `../../exercises/namuna/natijalar/04-telefon.txt`, a real run of the template bot on a fresh Ubuntu 24.04 container with fake Telegram and a fake model (`_build/sandbox/run_day4.py`).
  Say that it is a recording: "Bu yozib olingan namuna; hozir internet yo‘q, shuning uchun yozuvni ko‘rsatyapman."
- No server but Wi-Fi works: do part A only, then show the recordings for part B and demo 02.

## What can go wrong

| Symptom | Cause | Fix on stage |
|---|---|---|
| Answer still arrives after closing the lid in part A | Laptop set to stay awake on power, or the bot is already deployed | Pull the power cable; or stop the server service before class |
| No answer in part B | Laptop bot not stopped (409), or the server `.env` has a different token | `deploy.py status` and `logs` (slide 20 is the next topic anyway) |
| Answer in part B is slow (10-20 s) | First question after start loads the data; model latency | Keep talking; it is normal |
