# Day 4 owner flow on Ubuntu 24.04, native CPU (arm64 on this Mac) (Docker container as the VPS)

Run: 2026-11-03 03:47 to 03:50. Script: `run_day4.py`.
Fake Telegram and OpenRouter on the host (pilot-template `tools/fake_services.py`); no real keys, no real server.

Result: 30 / 30 checks passed.

| | Check | Detail |
|---|---|---|
| PASS | Week 0 alias works: ssh vps echo ok | ok |
| PASS | failure shown: key not on server -> Permission denied | root@203.0.113.10: Permission denied (publickey,password). |
| PASS | failure shown: wrong address or port -> Connection refused | ssh: connect to host 203.0.113.10 port 22: Connection refused |
| PASS | deploy.py setup with DEPLOY_HOST=vps | ==> 4/6 fail2ban: blocks IPs that guess SSH passwords ==> 5/6 User 'pilot' (no password, no sudo) and folders in /opt/pilot ==> 6/6 uv 0.13.6 for 'pilot' (it installs Python and the bot's libraries) uv 0.13.6 (aarch64-unknown-linux-gnu) ==> Server is ready. Ne |
| PASS | git: .env and runtime/ are never committed (template .gitignore) | 104 files tracked |
| PASS | failure shown: deploy before env -> clear message | ==> Uploading (74 KB) No /opt/pilot/.env on the server yet: run 'deploy.py env' first |
| PASS | .env on server, 600, owned by pilot | 600 pilot |
| PASS | deploy.py: tests, upload, uv sync, check, start | Nov 03 03:48:19 baraka-vps systemd[1]: Started pilot-bot.service - Praktikum pilot bot (Telegram + OpenRouter). Nov 03 03:48:19 baraka-vps python[2117]: 2026-11-03 03:48:19,875 INFO pilot.bot: bot @baraka_demo_bot started, model google/gemini-3.8-flash, mode d |
| PASS | owner's phone gets the start message | 🟢 «Savdo yordamchisi» ishga tushdi. Model: google/gemini-3.8-flash. Rejim: darhol javob beradi. |
| PASS | owner question answered from the server | «Optima» ergonomik stol 140x70 (WS-102), 8 dona - ulgurji narx: 1 890 000 x 8 = 15 120 000 so‘m. |
| PASS | owner controls the bot from the phone: /holat /hisobot /stop /davom | Omborda (1C, tayyor mahsulot): - CH-203 Кресло руководителя Senator Lux черное: 11 dona - CH-203-BR Кресло руководителя Senator Lux коричневое: 26 dona |
| PASS | assistant from the phone: /eslab_qol, /xotira, /jadval, and an /eslat reminder fires on time | 🔔 Eslatma: Jamshid aka bilan tender bo'yicha gaplashish |
| PASS | deploy.py status shows active (running) | ● pilot-bot.service - Praktikum pilot bot (Telegram + OpenRouter) Loaded: loaded (/etc/systemd/system/pilot-bot.service; enabled; preset: enabled) Active: active (running) since Tue 2026-11-03 03:48:19 +05; 41s ago Main PID: 2117 (python) Tasks: 1 (limit: 9520 |
| PASS | logs: one line per question, no token, no message text | ed, model google/gemini-3.8-flash, mode direct Nov 03 03:48:27 baraka-vps python[2117]: 2026-11-03 03:48:27,948 INFO pilot.bot: exchange 4cd7e618: answered, $0.0030, 55 ms Nov 03 03:48:27 baraka-vps python[2117]: 2026-11-03 03:48:27,999 INFO pilot.bot: exchang |
| PASS | kill -9: systemd brings the bot back | 2117 -> 2220 |
| PASS | after a reboot the bot is back by itself and answers | active ActiveEnterTimestamp=Tue 2026-11-03 03:49:10 +05 |
| PASS | phone memory survives the reboot (kept in /opt/pilot/runtime) | 🧠 Telefondan qo‘shilgan faktlar (o‘chirish: /unut raqam): 1. 2026-11-03: Menejerlar «140 lik stol» deganda Optima stolini (WS-102) nazarda tutadi |
| PASS | impossible price: pilot check refuses the deploy, running release untouched | .csv O‘z pilotingiz bo‘lsa, ularni almashtiring (PARTICIPANT_GUIDE.uz.md, 1.3-qadam). • Ma’lumot bloki: 4507 belgi (chegara 12000) Tuzatish kerak. Check failed: the running version was not touched. Fix what the check lists above (.env: deploy.py env; data/: co |
| PASS | failure shown: a broken code edit fails the tests, nothing deployed | 20261102-224817 |
| PASS | rollback: server back to the good file; git restore: laptop back too | 4693ed9c6056 -> 7aa3d17896be -> 4693ed9c6056 |
| PASS | sayt.py --test-local: Caddy serves the lead form over HTTPS | DNS va HTTPS Test rejimi: DNS tekshirilmaydi, sertifikat Caddy'ning o'zidan (brauzer uni tanimaydi). ==> Tayyor (test rejimi): sayt HTTPS bilan javob beryapti, lekin sertifikat faqat sinov uchun. Haqiqiy domen bilan --test-local siz qayta ishga tushiring: shun |
| PASS | firewall opened 80 and 443 for the site | 80/tcp ALLOW Anywhere 443/tcp ALLOW Anywhere 80/tcp (v6) ALLOW Anywhere (v6) 443/tcp (v6) ALLOW Anywhere (v6) |
| PASS | DNS not ready: tool explains the A record and that Caddy retries by itself | aysi IP manzilga qaramayapti (DNS yozuvi yo'q yoki hali tarqalmagan). Domen panelida A yozuvi qo'shing: nom = forma, qiymat = serveringiz IP manzili. ==> Caddy sozlandi, lekin https://forma.barakaoffice.uz hali ochilmadi. DNS tayyor bo'lishi bilan Caddy sertif |
| PASS | after reboot: site and bot both back | active active 200 |
| PASS | homework: /ruxsat from the phone lets the employee in (no redeploy) | «Optima» ergonomik stol 140x70 (WS-102), 8 dona - ulgurji narx: 1 890 000 x 8 = 15 120 000 so‘m. |
| PASS | approve mode: draft goes to the owner, employee gets it only after ✅ | «Start» xodim stoli 120x60 (WS-101), 2 dona - chakana narx: 1 450 000 x 2 = 2 900 000 so‘m. |
| PASS | failure shown: incomplete server .env -> Check failed, old release kept | .csv O‘z pilotingiz bo‘lsa, ularni almashtiring (PARTICIPANT_GUIDE.uz.md, 1.3-qadam). • Ma’lumot bloki: 4632 belgi (chegara 12000) Tuzatish kerak. Check failed: the running version was not touched. Fix what the check lists above (.env: deploy.py env; data/: co |
| PASS | failure shown: empty token -> service failed (78), no restart loop | × pilot-bot.service - Praktikum pilot bot (Telegram + OpenRouter) Loaded: loaded (/etc/systemd/system/pilot-bot.service; enabled; preset: enabled) Active: failed (Result: exit-code) since Tue 2026-11-03 03:50:32 +05; 10s ago Duration: 91ms Process: 417 ExecSta |
| PASS | fixed .env: bot restarts by itself | active |
| PASS | server safety state (as reported) | Restart=always User=pilot ProtectSystem=strict Status: active To Action From -- ------ ---- OpenSSH ALLOW Anywhere 80/tcp ALLOW Anywhere active Asia/Tashkent |
