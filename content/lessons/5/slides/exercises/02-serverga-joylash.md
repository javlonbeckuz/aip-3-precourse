# 2-mashq. Assistentni serverga joylash (1:05-1:40, 35 daqiqa)

**Natija:** shaxsiy AI assistentingiz serverda (VPS) ishlaydi.
Noutbukni yopasiz, telefondan yozasiz, javob keladi.
Bot yiqilsa yoki server qayta yuklansa, o‘zi qayta ishga tushadi.
Bu sotuv sahifasidagi 4-dars va’dasi: «Yordamchi kompyuteringiz o‘chiq bo‘lsa ham ishlab turadi, telefoningiz orqali boshqara olasiz».

Buyruqlarni Claude Code bajaradi.
Siz faqat ikki joyda o‘zingiz yozasiz: `.env` fayli va telefoningiz.
To‘liq texnik qo‘llanma: `app/deploy/deploy.qollanma.md` (pilot shablonida).

## Boshlashdan oldin kerak

| Nima | Tekshirish | Yo‘q bo‘lsa |
|---|---|---|
| Server Claude Code’ni parolsiz kiritadi | Warp’da `ssh vps echo ok` (yoki `ssh root@IP echo ok`) `ok` qaytaradi | `00-dars-oldidan.md`, 1-qadam; mentor |
| Server bir marta sozlangan | Chorshanba kuni `deploy.py setup` «Server is ready» bilan tugagan | Hozir ikkinchi Warp oynasida ishga tushiring (3-5 daqiqa), GitHub mashqi bilan parallel |
| Assistent noutbukda ishlaydi | `uv run pilot check` «Tayyor.» deydi | 3-dars; mentor |
| Telegram ID raqamingiz | Botga `/id` yozing | - |

Server hali yo‘q bo‘lsa: deploy’ni stoldoshingiz bilan birga kuzating, 1 va 1.5-qadamlarni o‘z noutbukingizda bajaring, serverni bugun sotib oling; 48 soat ichida mentor bilan ekran ulashib joylaysiz (`00-dars-oldidan.md`, «Server darsgacha tayyor bo‘lmasa»).

## 1-qadam. `.env` ni o‘zingiz tekshiring (2 daqiqa)

`app/.env` faylini o‘zingiz oching (Claude emas).
Warp’da `app` papkasida turib yozing:

- Mac: `open -e .env`
- Windows: `notepad .env`

Uchta qatorni tekshiring:

```
ALLOWED_USER_IDS=1234567890
REPLY_MODE=direct
DEPLOY_HOST=vps
```

- `ALLOWED_USER_IDS` da bugun **faqat o‘zingizning ID raqamingiz**.
  Xodimlar botga To‘plam 4 suhbatidan keyin qo‘shiladi, hech qachon oldin emas.
- `REPLY_MODE=direct` bugun o‘zingiz sinash uchun.
  Xodimlar qo‘shilgan kuni `approve` ga o‘tkazasiz (uy vazifasi).
- `DEPLOY_HOST` da `vps` yoki `root@IP`.

Faylni saqlang (Cmd+S yoki Ctrl+S) va oynani yoping.
Windows’da fayl nomi `.env.txt` bo‘lib qolmasin: Notepad’ni `notepad .env` bilan ochsangiz, nom to‘g‘ri qoladi.

## 1.5-qadam. Namuna fayllar qolmaganmi (1 daqiqa)

Serverga **o‘z** assistentingiz chiqishi kerak, Baraka Office’niki emas.
Claude Code’ga:

```text
"uv run pilot check" ni ishga tushir. Natijada "Baraka Office namunasi hali bor" degan qator bormi? Oxirgi qator nima?
```

- Oxirgi qator «Tayyor.» va «namunasi hali bor» qatori **yo‘q**: 2-qadamga o‘ting.
- `⚠️ Baraka Office namunasi hali bor: ...` chiqdi: **deploy qilmang**.
  Bu - Baraka’ning yo‘riqnomasi, narxlari yoki jadvali hali Sizning botingizda degani: xodimlaringiz mebel narxlarini oladi.
  Avval `app/PARTICIPANT_GUIDE.uz.md` dagi 1.3-qadamni Claude bilan bajaring (o‘z yo‘riqnomangiz va ma’lumotingiz bilan almashtirish, 10-15 daqiqa), keyin `pilot check` ni qayta ishga tushiring.
  Ulgurmasangiz, qizil kartani ko‘taring: mentor siz bilan birga qiladi.

## 2-qadam. `.env` ni serverga yuborish (1 daqiqa)

Claude Code’ga:

```text
"uv run python deploy/deploy.py env" ni ishga tushir. .env faylini ochma va o'qima. Natijani bir gapda ayt.
```

Kutilgan natija (`namuna/natijalar/02-env.txt`):

```text
.env is on the server (/opt/pilot/.env, readable only by the bot).
Reminder: one bot token can run in one place only. Stop the bot on your laptop (Ctrl+C).
```

Inglizcha: «.env serverda, faqat bot o‘qiy oladi»; «eslatma: bitta token faqat bitta joyda ishlaydi».
Kalitlar shifrlangan SSH orqali boradi va serverda faqat bot o‘qiy oladigan faylda turadi.
Chatga ham, GitHub’ga ham tushmaydi.

## 3-qadam. Joylash (3-5 daqiqa)

**Avval noutbukdagi botni to‘xtating:** `uv run pilot run` ishlayotgan Warp oynasida **Ctrl+C**.
Bitta bot tokeni faqat bitta joyda ishlaydi: server bot ishga tushganda noutbukdagisi ham ishlab tursa, Telegram «409 Conflict» deydi va javoblar goh keladi, goh kelmaydi.

Keyin Claude Code’ga:

```text
"uv run python deploy/deploy.py" ni ishga tushir. Tugagach, natijani menga oddiy tilda 3-4 gapda tushuntir:
testlar o'tdimi, serverda tekshiruv o'tdimi, bot ishlayaptimi.
```

Buyruq o‘zi 5 ish qiladi:

1. Noutbukda hamma testlarni ishga tushiradi; bitta test o‘tmasa, hech narsa joylanmaydi.
2. Kodni serverga yuklaydi (`.env` siz).
3. Serverda kutubxonalarni o‘rnatadi va sozlamalarni tekshiradi; tekshiruv o‘tmasa, eski versiya ishlashda qoladi.
4. Botni ishga tushiradi va 8 soniya kuzatadi; yiqilsa, oldingi versiyaga o‘zi qaytadi.
5. Logning oxirgi qatorlarini ko‘rsatadi.

Kutilgan natija, qisqartirilgan (to‘liq: `namuna/natijalar/03-deploy.txt`):

```text
==> Running the tests on this computer first
........................................................................ [ 51%]
...................................................................      [100%]
==> Uploading (74 KB)
==> Installing libraries (uv sync)
==> Checking settings with the server .env
...
Tayyor.
==> Waiting 8 seconds to see that it stays up
OK: pilot-bot is running release 20261213-071502
... INFO pilot.bot: bot @baraka_savdo_bot started, model google/gemini-3.8-flash, mode direct

Done. Write to your bot from your phone to check.
```

Inglizcha yozuvlarni Claude o‘zbekchaga tushuntiradi; versiya raqamlari, fayl hajmi va server turi Sizda boshqacha bo‘lishi normal.
Muhimi uchta qator: `Tayyor.` (sozlamalar to‘g‘ri), `OK: pilot-bot is running` (bot ishlayapti), `Done.` (tamom).
Bu namuna kurs sinovida Baraka Office namunasi bilan yozib olingan; Sizning natijangizda `⚠️ Baraka Office namunasi hali bor` qatori **bo‘lmasligi** kerak (1.5-qadam).

Bir necha soniyadan keyin telefoningizga xabar keladi:

```text
🟢 «Savdo yordamchisi» ishga tushdi.
Model: google/gemini-3.8-flash.
Rejim: darhol javob beradi.
```

## 4-qadam. Noutbuk testi (5 daqiqa)

Bu darsning asosiy dalili.

1. Noutbukdagi bot 3-qadam boshida to‘xtatilganmi, tekshiring (Warp oynasida bot yozuvlari to‘xtagan).
2. Noutbukni yoping.
3. Telefoningizdan botga yozing: `/start`, keyin o‘z jarayoningizdagi bitta real savol, keyin `/holat`.
4. Javob keladi: assistent endi Sizning noutbukingizda emas, serverda.
5. Telefondan boshqarishni sinang: `/stop` (to‘xtatish), `/davom` (yana yoqish), `/hisobot` (bugungi hisobot).
6. Endi bu - Sizning shaxsiy yordamchingiz. Telefondan sinang (faqat Siz va loyiha yetakchisi uchun):
   - `/eslat 15:30 Jamshid aka bilan tender bo'yicha gaplashish` - vaqtni hozirdan 2 daqiqa keyinga qo‘ying va eslatmani kuting;
   - `/eslab_qol Menejerlar «140 lik stol» deganda Optima stolini (WS-102) nazarda tutadi` - endi har bir javobda hisobga oladi, ro‘yxat: `/xotira`;
   - `/jadval 07:45 Ombordan 15 donadan kam qolgan mahsulotlar ro'yxatini yubor` - har ish kuni 7:45 da yuboradi, ro‘yxat: `/jadval`.

   Hammasi serverda saqlanadi va server qayta yuklansa ham yo‘qolmaydi (sinovda tekshirilgan).
   To‘liq ro‘yxat: `app/bot-commands.qollanma.md` va `app/PARTICIPANT_GUIDE.uz.md`, 2.8-qadam.

Baraka namunasi (`namuna/natijalar/04-telefon.txt`, soxta model bilan yozib olingan; haqiqiy model so‘zlari boshqacha bo‘ladi):

```text
[Siz] Optima stolidan 8 ta kerak, qancha bo'ladi?
[Bot] «Optima» ergonomik stol 140x70 (WS-102), 8 dona - ulgurji narx: 1 890 000 x 8 = 15 120 000 so‘m.
[Siz] /stop
[Bot] ⏸ Yordamchi to‘xtatildi. Xodimlarga «vaqtincha to‘xtatilgan» deb javob beradi.
      Qayta yoqish: /davom
[Siz] /davom
[Bot] ▶️ Yordamchi yana ishlayapti.
[Siz] /eslat 15:30 Jamshid aka bilan tender bo'yicha gaplashish
[Bot] 🔔 Eslataman: bugun soat 15:30 da.
[Bot] 🔔 Eslatma: Jamshid aka bilan tender bo'yicha gaplashish
```

`/stop` - To‘plam 5 A.7 dagi «to‘xtatish sharti» tugmasi: xato ketsa, telefondan bir so‘z bilan to‘xtatasiz.

## 5-qadam. Log: server kundaligi (5 daqiqa)

Noutbukni oching.
Claude Code’ga:

```text
"uv run python deploy/deploy.py logs -n 20" ni ishga tushir va oxirgi 20 qatorni menga oddiy tilda tushuntir:
bot qachon ishga tushdi, nechta savol keldi, har biri qancha turdi, xato bormi.
```

Kutilgan natija (`namuna/natijalar/06-logs.txt`):

```text
... systemd[1]: Started pilot-bot.service - Praktikum pilot bot (Telegram + OpenRouter).
... INFO pilot.bot: bot @baraka_demo_bot started, model google/gemini-3.8-flash, mode direct
... INFO pilot.bot: exchange 173e7ad5: answered, $0.0030, 22 ms
```

Qanday o‘qiladi: `exchange 173e7ad5` - bitta savol; `answered` - bot javob berdi (`handed_over` - odamga uzatdi); `$0.0030` - shu javob narxi (taxminan 36 so‘m); `22 ms` - javob vaqti.
Logda ism ham, savol matni ham yo‘q: bu ataylab shunday, xodimlar kuzatilmaydi.
Savol-javoblarning o‘zi serverdagi ish jurnalida turadi va 60 kundan keyin o‘chadi.

## Kundalik buyruqlar (keyin ham kerak bo‘ladi)

| Nima kerak | Claude Code’ga yozing |
|---|---|
| Bot ishlayaptimi? | `deploy.py status ni ishga tushir va tushuntir` |
| Nima bo‘ldi? | `deploy.py logs ni ishga tushir va oxirgi 20 qatorni tushuntir` |
| Yo‘riqnoma, ma’lumot yoki kod o‘zgardi | `avval commit qil, keyin deploy.py ni ishga tushir` |
| `.env` o‘zgardi (masalan, `REPLY_MODE`) | `deploy.py env ni ishga tushir` (bot o‘zi qayta ishga tushadi) |
| Yangi versiya yomon ishlayapti | `deploy.py rollback ni ishga tushir` (serverdagi oldingi versiyaga qaytadi) |

## Xato chiqsa

Avval skrinshot qiling va Claude’dan so‘rang («bu xato nimani bildiradi, nima qilay?»), keyin mentor.

Kim nimani ushlaydi:

- **Testlar** (`deploy.py` boshida) **kodni** tekshiradi: Claude biror faylni buzib qo‘ysa, hech narsa joylanmaydi.
- **`pilot check`** (serverda, joylashdan oldin) **imkonsiz narxni** ushlaydi: bo‘sh, nol, raqam emas, ulgurji narx chakanadan katta yoki undan 30% dan ko‘proq arzon.
  Joylash to‘xtaydi, ishlab turgan versiyaga tegilmaydi (`x7-narx-imkonsiz.txt`).
- **Ishonarli xato** (1 890 000 o‘rniga 1 980 000) ikkalasidan ham o‘tadi.
  Uni 5-darsdagi test to‘plami (`pilot eval`, aniq narxli savollar) va xodimning ❌ tugmasi topadi.

| Ekranda | Sabab | Nima qilasiz | Namuna |
|---|---|---|---|
| `Permission denied (publickey,password)` | Noutbukdagi kalit serverga o‘rnatilmagan | `deploy/deploy.qollanma.md`, 1-qadam; parolli buyruqni alohida oynada o‘zingiz | `x1-kalit-yoq.txt` |
| `Connection refused` yoki `Connection timed out` | IP yoki port xato; server o‘chiq; zal Wi-Fi 22-portni yopgan | Panelda holat va IP; telefon internetiga (hotspot) ulanib qayta urining | `x6-server-ulanmaydi.txt` |
| `No /opt/pilot/.env on the server yet` | `.env` yuborilmagan | 2-qadam | `x2-env-yoq.txt` |
| `Tests failed: nothing was deployed` | Kodda xato (masalan, Claude o‘zgartirgan faylda qavs yopilmay qolgan) | Claude’ga: «qaysi test yiqildi, nega? tuzat». Serverdagi eski versiya ishlashda davom etadi | `x3-testlar-otmadi.txt` |
| `Check failed: the running version was not touched` | Serverdagi `.env` to‘liq emas (ko‘pincha `OWNER_CHAT_ID` yoki `ALLOWED_USER_IDS` bo‘sh) yoki prays-listda imkonsiz narx (`❌ Prays-list ...` qatori) | `.env` ni to‘ldiring (2-qadam) yoki narxni tuzating, keyin 3-qadam | `x4-check-failed.txt`, `x7-narx-imkonsiz.txt` |
| `status` da `failed` va `status=78` | `.env` da bot tokeni yo‘q yoki xato | Tokenni tekshiring, 2-qadam: bot o‘zi qayta ishga tushadi | `x5-token-xato.txt`, `x5b-token-tuzatildi.txt` |
| Bot `TELEGRAM_BOT_TOKEN yo‘q` deydi, lekin tokenni yozgansiz | Windows’da fayl `.env.txt` bo‘lib qolgan | Claude’ga: «app papkasida .env.txt bormi? Bo‘lsa, nomini .env ga o‘zgartir, ichini o‘qima». Keyin 2-qadam | - |
| Telegram’da «409 Conflict» haqida ogohlantirish | Bot noutbukda ham ishlayapti | Noutbukdagi Warp oynasida Ctrl+C | FAQ B-04 |
| Telefonga javob kelmaydi, `status` da `active (running)` | Boshqa akkauntdan yozyapsiz yoki ID ro‘yxatda yo‘q | Botga `/id` yozing; shu raqam `ALLOWED_USER_IDS` dami? | - |
| Hamma savol «odamga uzatildi» | OpenRouter kaliti limiti yoki balansi tugagan | Botga `/xarajat`; openrouter.ai da balans | FAQ K-03 |

## Yomon namuna va tuzatish

**Yomon.**
Ishtirokchi provayder xatidagi root parolini Claude Code chatiga yozdi va «botni serverga joyla» dedi.
Claude serverga kirdi, kodni nusxaladi va botni `nohup python ...` bilan fonda ishga tushirdi.
Bot javob berdi, ishtirokchi xursand bo‘lib uyiga ketdi.
Kechasi provayder serverni yangilash uchun qayta yukladi: ertalab bot o‘lik edi.
Noutbukdagi bot ham hali ishlab turgan, shuning uchun kechqurun javoblar goh keldi, goh kelmadi (409).

**Nima xato:**

1. Parol chatda: suhbat yozuvi saqlanadi, parol endi faqat Sizniki emas.
2. Claude o‘zi yo‘l o‘ylab topdi: testsiz, avtomatik qayta ishga tushirishsiz (systemd yo‘q), orqaga qaytish yo‘lisiz.
3. Noutbukdagi nusxa to‘xtatilmagan.

**Tuzatish:**
server parolini panelda almashtiring (FAQ S-06), kalit bilan kirishni sozlang (`deploy.qollanma.md`, 1-qadam), noutbukdagi botni to‘xtating, keyin shu mashqning 2-3-qadamlaridagi aniq topshiriq matnlarini yuboring.
Tekshirilgan yo‘l bor ekan, Claude’ga yangi yo‘l o‘ylab topdirmang.

## Tayyor bo‘ldi, agar

- [ ] `deploy.py` oxirida `OK: pilot-bot is running release ...` chiqdi.
- [ ] Noutbuk yopiq holda telefondan savol yozdingiz va javob keldi (mentor ko‘rdi: kod 4.7).
- [ ] `/stop` va `/davom` telefondan ishladi.
- [ ] `/eslat` bilan qo‘yilgan eslatma telefoningizga keldi.
- [ ] Logning oxirgi qatorlarini Claude tushuntirdi va Siz «bot oxirgi marta nima qildi» degan savolga javob bera olasiz.
- [ ] Noutbukdagi bot deploy’dan oldin to‘xtatilgan.
- [ ] `pilot check` da «Baraka Office namunasi hali bor» qatori yo‘q.

Sinovimizda (Docker ichidagi toza Ubuntu 24.04 va 26.04, 2026-11-03) shu qadamlar to‘liq o‘tdi, jumladan botni majburan «o‘ldirish» (5 soniyada qaytdi) va serverni qayta yuklash (bot o‘zi qaytdi).
Haqiqiy provayder serverida va Windows noutbukda bu yo‘l hali sinalmagan: Windows’dagilarni mentor birinchi kuzatadi.
