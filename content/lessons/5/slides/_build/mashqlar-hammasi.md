# 4-dars mashqlari

Yettita mashq (darsdan oldingisi bilan), darsdagi tartibda. Manba: day-4/exercises/0*.md.

<!-- pagebreak -->

## 4-darsga tayyorgarlik (dars oldidan, 30-40 daqiqa)

Bu xabarni mentor stol chatiga chorshanba kuni (9-dekabr) yuboradi.
Maqsad: darsda server bilan emas, assistentingiz bilan ishlash.
4-darsda shaxsiy AI assistentingiz noutbukdan serverga ko‘chadi: noutbuk yopiq bo‘lsa ham ishlaydi, telefondan boshqarasiz.
Buning uchun uchta narsa oldindan tayyor bo‘lishi kerak: server Claude Code’ni parolsiz kiritadi, server bir marta sozlangan, GitHub akkaunti bor.

### Chatga yuboriladigan matn

```text
Assalomu alaykum! 4-dars: 12-dekabr (shanba) yoki 13-dekabr (yakshanba). Assistentingiz serverga ko'chadi.
Darsdan oldin 30-40 daqiqa ajrating, iltimos (juma kechgacha):

1. Warp'da kompaniya/app papkasini oching va "claude" deb yozing.
2. Pastdagi 1-matnni Claude Code'ga yuboring: u server bilan aloqani tekshiradi va serverni sozlaydi.
3. github.com/signup da akkaunt oching (email, parol, login). Keyin 2-matnni yuboring.
4. Domeningiz bo'lsa: domen panelida bitta A yozuvi qo'shing (pastda, 3-qadam). Domen bo'lmasa, o'tkazib yuboring.
5. Oxirida shu chatga yozing: "server tayyor, github tayyor".
   Xato chiqsa: skrinshot, avval Claude'dan so'rang, keyin menga.

Parol, token, kalitni hech kimga yubormang: na chatga, na menga, na Claude'ga.
Server hali sotib olinmagan bo'lsa, bugun Airnet'da oling: faollashishi 2 ish kunigacha cho'zilishi mumkin. Faollashmagan bo'lsa, menga yozing.
```

### 1-qadam. Server bilan aloqa va sozlash (Claude Code’ga 1-matn)

Avval o‘zingiz bitta ish qiling: `app/.env` faylini oching va oxiriga qator qo‘shing.
Warp’da `app` papkasida turib yozing: Mac’da `open -e .env`, Windows’da `notepad .env`.
Saqlang (Cmd+S yoki Ctrl+S); Windows’da nom `.env.txt` bo‘lib qolmasligi uchun faylni aynan shu buyruq bilan oching.
0-haftada Claude «vps» degan qisqa nom yaratgan bo‘lsa:

```
DEPLOY_HOST=vps
```

Qisqa nom bo‘lmasa yoki esingizda bo‘lmasa, IP manzil bilan:

```
DEPLOY_HOST=root@203.0.113.10
```

`203.0.113.10` o‘rniga o‘z serveringiz IP manzilini yozing (provayder panelida turadi).
Keyin Claude Code’ga yuboring:

```text
Men 4-darsga tayyorlanyapman. Har qadamdan oldin nima qilishingni bir gapda ayt.
1. .env faylini ochma. DEPLOY_HOST qatorini men yozdim.
2. Serverga parolsiz kirish ishlayaptimi, tekshir: avval "ssh vps echo ok", ishlamasa "ssh root@IP echo ok" (IP ni mendan so'ra).
   "ok" chiqmasa, deploy/deploy.qollanma.md dagi 1-qadamni men bilan birga bajar: parol so'raydigan buyruqni men o'zim alohida oynada yozaman.
3. "uv run python deploy/deploy.py setup" ni ishga tushir. 3-5 daqiqa ketadi. Har bosqichni menga bir gapda tushuntir.
4. Oxirida 2 ta gap yoz: server tayyormi, qaysi Ubuntu versiyasi.
```

#### Natija qanday bo‘lishi kerak

`ssh vps echo ok` faqat bitta so‘z qaytaradi:

```text
ok
```

`deploy.py setup` oxiri shunday tugaydi (to‘liq namuna: `namuna/natijalar/01-setup.txt`):

```text
==> 5/6 User 'pilot' (no password, no sudo) and folders in /opt/pilot

==> 6/6 uv 0.13.6 for 'pilot' (it installs Python and the bot's libraries)
...
==> Server is ready. Next: deploy.py env, then deploy.py
```

Inglizcha yozuvlarni Claude tushuntiradi; versiya raqamlari va server turi Sizda boshqacha bo‘lishi normal.
Muhimi oxirgi qator: `Server is ready` («server tayyor»).

Skriptni ikki marta ishga tushirsangiz ham zarar yo‘q: darsda yana bir marta ishga tushiramiz.

### 2-qadam. GitHub (Claude Code’ga 2-matn)

GitHub - kodingizning zaxira nusxasi va «orqaga qaytish» tugmasi.
Avval brauzerda github.com/signup sahifasida akkaunt oching: email, parol, foydalanuvchi nomi (masalan, `rustamov-baraka`).
Emailga kelgan kodni kiriting.
GitHub ikki bosqichli himoyani (2FA) yoqishni so‘rasa, telefoningizdagi autentifikator ilovasi bilan yoqing.

Keyin Claude Code’ga:

```text
GitHub uchun "gh" dasturini o'rnatmoqchiman.
1. "gh --version" bilan tekshir. Bor bo'lsa, 3-bandga o't.
2. O'rnat: Mac'da Homebrew bo'lsa "brew install gh"; Homebrew bo'lmasa, github.com/cli/cli/releases/latest dan macOS zip faylini curl bilan yuklab, ichidagi gh ni ~/.local/bin ga qo'y.
   Windows'da: winget install --id GitHub.cli --source winget. Keyin Warp'ni yopib qayta ochishimni ayt.
3. "gh auth login" ni men o'zim alohida oynada yozaman (brauzer ochiladi). Menga qaysi variantni tanlashimni ayt: GitHub.com, HTTPS, brauzer orqali.
4. Men "tayyor" desam, "gh auth status" va "gh auth setup-git" ni ishga tushir va natijani bir gapda ayt.
Repo yaratma: uni darsda birga qilamiz.
```

`gh auth login` ni o‘zingiz yozasiz, chunki u brauzerda bir martalik kod so‘raydi.
Ekranda 8 belgili kod chiqadi (masalan `4F2A-9C1B`): brauzerda shu kodni kiriting va «Authorize» bosing.

#### Natija

```text
github.com
  ✓ Logged in to github.com account rustamov-baraka (keyring)
  - Git operations protocol: https
```

Inglizcha: «github.com’ga rustamov-baraka akkaunti bilan kirilgan». Sizda o‘z login nomingiz turadi.

### 3-qadam. Domen (ixtiyoriy, 5 daqiqa)

Domen bo‘lmasa, bu qadamni o‘tkazib yuboring: assistent uchun domen shart emas, u Telegram orqali ishlaydi.
Domen bo‘lsa, hozir bitta yozuv qo‘shing, darsgacha butun internetga tarqalib ulguradi.

Domen sotib olgan joyingizda (masalan, Airnet mijoz paneli) domen uchun «DNS» yoki «DNS-zona» bo‘limini oching va yangi yozuv qo‘shing:

| Maydon | Nima yoziladi | Baraka namunasi |
|---|---|---|
| Tur (Type) | `A` | `A` |
| Nom (Name, Host) | subdomen nomi, bitta so‘z | `forma` |
| Qiymat (Value, IP) | serveringiz IP manzili | `203.0.113.10` |
| TTL | 3600 yoki «default» | 3600 |

Natija: `forma.barakaoffice.uz` sizning serveringizga qaraydi.
Panel ko‘rinishi registratorga qarab har xil; maydon nomlari yuqoridagidek.
Topa olmasangiz, registrator yordam xizmatiga yozing: «Domenimga A yozuvi qo‘shmoqchiman».

Tekshirish (bir necha soatdan keyin), Claude Code’ga:

```text
"nslookup forma.barakaoffice.uz 1.1.1.1" ni ishga tushir. Javobdagi IP serverim IP manzili bilan bir xilmi?
```

### Ko‘p uchraydigan xatolar

| Belgi | Sabab | Yechim |
|---|---|---|
| `Permission denied (publickey)` | Kalit serverga o‘rnatilmagan | `deploy/deploy.qollanma.md`, 1-qadam: kalitni nusxalash buyrug‘ini o‘zingiz alohida oynada yozasiz |
| `Connection refused` yoki `Connection timed out` | IP xato, server hali faollashmagan yoki o‘chiq | Provayder panelida server holati «Running»mi? IP’ni qayta nusxalang |
| Claude parol so‘rab qotib qoldi | Kalit ishlamayapti, buyruq parol kutyapti | Esc bosing; parolli buyruqni alohida oynada o‘zingiz yozing |
| Panelda foydalanuvchi `root` emas, `ubuntu` | Provayder boshqa nom bergan | `.env` da `DEPLOY_HOST=ubuntu@IP` yozing (qisqa nom emas); `sudo` parolsiz ishlashi kerak, Claude’dan tekshirishni so‘rang |
| `Could not get lock /var/lib/dpkg` | Yangi server o‘zini yangilayapti | 5 daqiqa kuting, `setup` ni qayta ishga tushiring |
| `gh: command not found` o‘rnatgandan keyin | Terminal yangi yo‘lni bilmaydi | Warp’ni yopib, qayta oching |
| Server hali sotib olinmagan yoki faollashmagan | - | Bugun sotib oling (0-hafta qo‘llanmasi, 13-qadam) va mentorga yozing; darsgacha tayyor bo‘lmasa - pastdagi bo‘lim |

### Server darsgacha tayyor bo‘lmasa

Kursda zaxira server yo‘q: har kim o‘z serverini oladi.
Server darsgacha faollashmasa yoki hali sotib olinmagan bo‘lsa:

1. Darsda deploy’ni stoldoshingiz bilan birga kuzatasiz va noutbukdagi qadamlarni o‘zingiz bajarasiz: GitHub (1-mashq), `.env` va `pilot check` (2-mashq, 1 va 1.5-qadamlar).
2. Serverni **shu kuni** sotib olasiz (Airnet, Click yoki Payme, 15 daqiqa).
3. 48 soat ichida mentor Siz bilan ekran ulashadi va assistentingizni serverga joylaysiz: shu fayldagi 1-2-qadamlar va 2-mashq, 15-20 daqiqa.

Shungacha assistentingiz faqat noutbuk yoqiq paytda ishlaydi: 4-darsning asosiy natijasi o‘sha qo‘ng‘iroqda bajariladi.

### Tayyor bo‘ldi, agar

- [ ] `ssh vps echo ok` (yoki `ssh root@IP echo ok`) parolsiz `ok` qaytaradi.
- [ ] `deploy.py setup` «Server is ready» bilan tugadi.
- [ ] `gh auth status` «Logged in» deydi.
- [ ] (Domen bo‘lsa) A yozuvi qo‘shilgan.
- [ ] Stol chatiga «server tayyor, github tayyor» deb yozdingiz.

Mentor uchun: juma kechgacha har kimni belgilang: yashil (ikkalasi tayyor), sariq (bittasi qolgan), qizil (server yo‘q yoki kira olmaydi).
Qizillar darsdan oldin 10 daqiqalik ekran ulashish qo‘ng‘irog‘iga (shanba guruhi juma kechqurun, yakshanba guruhi shanba kuni); server yo‘qlar ro‘yxati juma 18:00 gacha bosh mentorga: ularga serverni bugun sotib olishni eslating.

<!-- pagebreak -->

## 1-mashq. GitHub: kodning zaxira nusxasi (0:50-1:05, 15 daqiqa)

**Natija:** assistentingiz kodi GitHub’dagi **yopiq (private)** repoda turadi, ichida bitta ham kalit yo‘q.
Noutbuk yo‘qolsa yoki o‘zgarish hammasini buzsa, ishlagan versiya joyida qoladi.

### Bu nima va nega kerak

- **Git** - kodingizning «saqlash nuqtalari».
  Har bir saqlash nuqtasi (**commit**) - shu daqiqadagi barcha fayllarning surati.
  Xato qilsangiz, oxirgi yaxshi suratga qaytasiz.
- **GitHub** - shu suratlarni internetda saqlaydigan joy, dasturchilarning «YouTube»i.
  Suratlarni GitHub’ga yuborish - **push**.
- **Yopiq repo (private)** - kodni faqat Siz ko‘rasiz.
  Ochiq repodagi kalitni begonalar bir necha daqiqada topib ishlatadi: 2.0 da buni «Robin Gud» hikoyasida ko‘rgansiz.

GitHub’ga **faqat `app/` papkasi** boradi.
`kompaniya/` ning qolgan papkalarida (`kit1-interviews/`, `kit4-people/`) xodimlaringiz suhbatlari va ma’lumotlari bor.
Mehnat kodeksining 178-moddasi: xodim ma’lumotini uning yozma roziligisiz uchinchi shaxsga berib bo‘lmaydi, GitHub esa uchinchi shaxs.

### Boshlashdan oldin kerak

| Nima | Qayerdan | Tekshirish |
|---|---|---|
| GitHub akkaunti va `gh` dasturi | 4-dars oldidan xabar (`00-dars-oldidan.md`, 2-qadam) | Warp’da `gh auth status` «Logged in» deydi |
| Ishlayotgan assistent noutbukda | 3-dars | `kompaniya/app/` da `uv run pilot check` «Tayyor.» deydi |

`gh` hali yo‘q bo‘lsa: `00-dars-oldidan.md` dagi 2-matnni hozir yuboring (10 daqiqa).
Bu mashq deploy’ni to‘xtatmaydi: GitHub ishlamay qolsa ham, 2-mashqni boshlayverasiz, GitHub’ni kechqurun mentor bilan tugatasiz.

### Qadamlar

Warp’da `kompaniya/app` papkasini oching, `claude` deb yozing va yuboring:

```text
app papkasini GitHub'dagi yopiq (private) repoga zaxiralaymiz. Har qadamdan oldin nima qilishingni bir gapda ayt.
1. Faqat shu app papkasida ishla. Yuqoridagi kompaniya papkasini (kit1-interviews, kit4-people) GitHub'ga yuborma: unda xodimlar ma'lumoti bor.
2. .gitignore faylida .env, .env.* va runtime/ borligini tekshir. .env faylini ochma.
3. Git hali yo'q bo'lsa "git init -b main" qil. Keyin "git add -A" va "git status --short" ni ko'rsat.
   Ro'yxatda .env yoki runtime/ bo'lsa, darhol to'xta va menga ayt.
4. data/ va evals/ dagi fayllarda mijozning telefon raqami, karta raqami yoki pasport ma'lumoti bormi, tekshir. Bo'lsa, menga ko'rsat va commit qilma.
5. Commit qil: "4-dars: serverga chiqishdan oldin".
6. "gh repo create baraka-pilot --private --source=. --push" ni ishga tushir (baraka-pilot o'rniga o'z kompaniyam nomini qo'y).
7. "gh repo view --json visibility,url" bilan repo PRIVATE ekanini ko'rsat.
```

`baraka-pilot` o‘rniga o‘z nomingizni yozing, lotin harflarida, bo‘sh joysiz: masalan `sodiq-school-pilot`.

### Natija qanday bo‘lishi kerak

Bizning sinovimizda (Docker ichidagi toza server, 2026-11-03) git qismi shunday chiqdi (to‘liq: `namuna/natijalar/11-git.txt`):

```text
$ git status --short --branch
### main...origin/main

$ git ls-files | grep -E '(^|/)\.env$|^runtime/'
(bo'sh: kalit fayli repoda yo'q)
```

GitHub qismi taxminan shunday bo‘ladi (`gh` dasturining o‘z xabarlari):

```text
✓ Created repository rustamov-baraka/baraka-pilot on github.com
  https://github.com/rustamov-baraka/baraka-pilot
✓ Added remote https://github.com/rustamov-baraka/baraka-pilot.git
✓ Pushed commits to https://github.com/rustamov-baraka/baraka-pilot.git
{"url":"https://github.com/rustamov-baraka/baraka-pilot","visibility":"PRIVATE"}
```

Inglizcha: «repo yaratildi», «manzil qo‘shildi», «commit’lar yuborildi»; Claude o‘zbekcha tushuntiradi, nomlar Sizda boshqacha bo‘ladi.
Oxirgi qatorda `"visibility":"PRIVATE"` bo‘lishi shart.
Brauzerda repo sahifasini oching: nom yonida «Private» yozuvi turadi, fayllar ro‘yxatida `.env` yo‘q, `.env.example` bor.
`.env.example` - bo‘sh namuna, kalitsiz: u repoda turishi kerak.

### Bundan keyin: har bir o‘zgarishdan oldin commit

Bu bir martalik ish emas, odat.
Yo‘riqnoma, ma’lumot yoki kodni o‘zgartirishdan oldin Claude Code’ga yozing:

```text
Hozirgi holatni commit qil va GitHub'ga push qil. Xabar: "<nima o'zgarayotgani, bir gap>".
```

Xato chiqsa, «oxirgi commit’ga qaytar» deysiz (namuna: `namuna/natijalar/09-rollback.txt`, oxiri).

### Yomon namuna va tuzatish

**Yomon.**
Ishtirokchi Claude’ga «kodimni GitHub’ga qo‘y» deb yozdi.
Claude `kompaniya/` papkasining hammasini ochiq (public) repoga yukladi: ichida `app/.env` (bot tokeni va OpenRouter kaliti) va `kit1-interviews/` (xodimlar suhbatlari) bor edi.

**Nima xato:**

1. «Qaysi papka» va «yopiqmi» aytilmagan: Claude eng oddiy yo‘lni tanlagan.
2. `.env` repoga tushgan: kalit internetda ochiq.
3. Xodimlar suhbatlari uchinchi shaxsga berilgan.

**Tuzatish (shu tartibda, darhol):**

1. Kalitlarni almashtiring: BotFather’da `/token` (yangi token), openrouter.ai/keys da eski kalitni o‘chirib yangisini yarating.
   GitHub tarixida qolgan kalit o‘chirildi deb hisoblanmaydi: faqat almashtirish yordam beradi.
2. Repo sozlamalarida (Settings, General, oxirida «Danger Zone») reponi yoping yoki o‘chiring.
3. Yangi kalitlarni `.env` ga o‘zingiz yozing, `deploy.py env` bilan serverga yuboring.
4. Yuqoridagi to‘g‘ri topshiriq matni bilan faqat `app/` ni, yopiq repoga qayta yuklang.
5. Mentorga ayting (FAQ D-04, K-01).

### Tayyor bo‘ldi, agar

- [ ] `gh repo view --json visibility,url` `"PRIVATE"` ko‘rsatadi.
- [ ] Brauzerda repo ochiladi: `.env` yo‘q, `.env.example` bor, `kit1-interviews` yo‘q.
- [ ] Mentor ekranda ko‘rdi (tekshiruv kodi 4.6).

<!-- pagebreak -->

## 2-mashq. Assistentni serverga joylash (1:05-1:40, 35 daqiqa)

**Natija:** shaxsiy AI assistentingiz serverda (VPS) ishlaydi.
Noutbukni yopasiz, telefondan yozasiz, javob keladi.
Bot yiqilsa yoki server qayta yuklansa, o‘zi qayta ishga tushadi.
Bu sotuv sahifasidagi 4-dars va’dasi: «Yordamchi kompyuteringiz o‘chiq bo‘lsa ham ishlab turadi, telefoningiz orqali boshqara olasiz».

Buyruqlarni Claude Code bajaradi.
Siz faqat ikki joyda o‘zingiz yozasiz: `.env` fayli va telefoningiz.
To‘liq texnik qo‘llanma: `app/deploy/deploy.qollanma.md` (pilot shablonida).

### Boshlashdan oldin kerak

| Nima | Tekshirish | Yo‘q bo‘lsa |
|---|---|---|
| Server Claude Code’ni parolsiz kiritadi | Warp’da `ssh vps echo ok` (yoki `ssh root@IP echo ok`) `ok` qaytaradi | `00-dars-oldidan.md`, 1-qadam; mentor |
| Server bir marta sozlangan | Chorshanba kuni `deploy.py setup` «Server is ready» bilan tugagan | Hozir ikkinchi Warp oynasida ishga tushiring (3-5 daqiqa), GitHub mashqi bilan parallel |
| Assistent noutbukda ishlaydi | `uv run pilot check` «Tayyor.» deydi | 3-dars; mentor |
| Telegram ID raqamingiz | Botga `/id` yozing | - |

Server hali yo‘q bo‘lsa: deploy’ni stoldoshingiz bilan birga kuzating, 1 va 1.5-qadamlarni o‘z noutbukingizda bajaring, serverni bugun sotib oling; 48 soat ichida mentor bilan ekran ulashib joylaysiz (`00-dars-oldidan.md`, «Server darsgacha tayyor bo‘lmasa»).

### 1-qadam. `.env` ni o‘zingiz tekshiring (2 daqiqa)

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

### 1.5-qadam. Namuna fayllar qolmaganmi (1 daqiqa)

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

### 2-qadam. `.env` ni serverga yuborish (1 daqiqa)

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

### 3-qadam. Joylash (3-5 daqiqa)

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

### 4-qadam. Noutbuk testi (5 daqiqa)

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

### 5-qadam. Log: server kundaligi (5 daqiqa)

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

### Kundalik buyruqlar (keyin ham kerak bo‘ladi)

| Nima kerak | Claude Code’ga yozing |
|---|---|
| Bot ishlayaptimi? | `deploy.py status ni ishga tushir va tushuntir` |
| Nima bo‘ldi? | `deploy.py logs ni ishga tushir va oxirgi 20 qatorni tushuntir` |
| Yo‘riqnoma, ma’lumot yoki kod o‘zgardi | `avval commit qil, keyin deploy.py ni ishga tushir` |
| `.env` o‘zgardi (masalan, `REPLY_MODE`) | `deploy.py env ni ishga tushir` (bot o‘zi qayta ishga tushadi) |
| Yangi versiya yomon ishlayapti | `deploy.py rollback ni ishga tushir` (serverdagi oldingi versiyaga qaytadi) |

### Xato chiqsa

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

### Yomon namuna va tuzatish

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

### Tayyor bo‘ldi, agar

- [ ] `deploy.py` oxirida `OK: pilot-bot is running release ...` chiqdi.
- [ ] Noutbuk yopiq holda telefondan savol yozdingiz va javob keldi (mentor ko‘rdi: kod 4.7).
- [ ] `/stop` va `/davom` telefondan ishladi.
- [ ] `/eslat` bilan qo‘yilgan eslatma telefoningizga keldi.
- [ ] Logning oxirgi qatorlarini Claude tushuntirdi va Siz «bot oxirgi marta nima qildi» degan savolga javob bera olasiz.
- [ ] Noutbukdagi bot deploy’dan oldin to‘xtatilgan.
- [ ] `pilot check` da «Baraka Office namunasi hali bor» qatori yo‘q.

Sinovimizda (Docker ichidagi toza Ubuntu 24.04 va 26.04, 2026-11-03) shu qadamlar to‘liq o‘tdi, jumladan botni majburan «o‘ldirish» (5 soniyada qaytdi) va serverni qayta yuklash (bot o‘zi qaytdi).
Haqiqiy provayder serverida va Windows noutbukda bu yo‘l hali sinalmagan: Windows’dagilarni mentor birinchi kuzatadi.

<!-- pagebreak -->

## 3-mashq. Domen va HTTPS yoki bot (kengaytma, 1:30-1:40 va uyda)

**Natija (ikki yo‘ldan biri):**

- **Bot yo‘li (hamma uchun yetarli):** assistent serverdan Telegram orqali ishlaydi.
  2-mashq tayyor bo‘lsa, bu yo‘l ham tayyor: Telegram bot uchun domen kerak emas.
- **Domen yo‘li (kengaytma):** o‘z subdomeningizda (masalan, `forma.barakaoffice.uz`) ochiq sahifa, qulf belgisi (HTTPS) bilan, telefondan ochiladi.

Domen yo‘li faqat 2-mashq tugaganlar uchun.
Domen bo‘lmasa yoki DNS hali tarqalmagan bo‘lsa, bot yo‘li bilan to‘xtang: mentor 4.8 ni «bot serverdan ishlaydi» deb belgilaydi.

### Bu nima: uchta so‘z, bitta rasm

Rasm: `demos/03-domen-dns-https/diagramma.html` (darsda ekranda ko‘rsatiladi).

- **IP manzil** - serverning telefon raqami: `203.0.113.10`.
  Kompyuterlar faqat raqamni tushunadi.
- **Domen** - shu raqamning odam eslab qoladigan ismi: `barakaoffice.uz`.
  **Subdomen** - ism oldiga qo‘shilgan so‘z: `forma.barakaoffice.uz`, `bot.barakaoffice.uz`. Bitta domen, ko‘p manzil.
- **DNS** - telefon kitobi: ismni raqamga bog‘laydi.
  Kitobga yozuvni Siz domen panelida qo‘shasiz: **A yozuvi** «forma -> 203.0.113.10».
  Yozuv butun internetga bir necha daqiqadan bir necha soatgacha tarqaladi.
- **HTTPS** - manzil satridagi qulf belgisi: sayt bilan telefon orasidagi gap shifrlangan.
  Qulfsiz formaga mijoz telefon raqamini yozishga ishonmaydi.
  Qulfni sertifikat beradi; uni **Let’s Encrypt** bepul beradi.
- **Caddy** - serverdagi «qabulxona»: kelgan mehmonni kerakli eshikka yo‘naltiradi va sertifikatni o‘zi olib, o‘zi yangilaydi.
  Dasturchi smetasida bu ish ko‘pincha **Nginx** deb yoziladi: vazifasi bir xil.

### Boshlashdan oldin kerak

| Nima | Tekshirish |
|---|---|
| 2-mashq tayyor | Noutbuk yopiq holda bot javob bergan |
| Domen | Registrator panelida domen «faol» |
| A yozuvi | `00-dars-oldidan.md`, 3-qadam; chorshanba kuni qo‘shilgan bo‘lsa yaxshi |
| Ikkita fayl: `sayt.py` va `sayt-sozlash.sh` | Stol chatidagi `4-dars-materiallar.zip` ichida |

### 1-qadam. DNS tayyormi (2 daqiqa)

Claude Code’ga (o‘z subdomeningiz bilan):

```text
"nslookup forma.barakaoffice.uz 1.1.1.1" ni ishga tushir. Javobdagi IP manzil .env dagi serverim IP manzili bilan bir xilmi?
.env ni ochma: men IP ni o'zim aytaman: 203.0.113.10
```

- Bir xil: 2-qadamga o‘ting.
- `NXDOMAIN` yoki boshqa IP: A yozuvini tekshiring (nom faqat `forma`, qiymat faqat raqam, `http://` siz).
  Yozuv to‘g‘ri bo‘lsa, kuting: tarqalish bir necha soat olishi mumkin.
  Kutayotganda ham 3-qadamni qilsangiz bo‘ladi: Caddy DNS tayyor bo‘lishi bilan sertifikatni o‘zi oladi.

### 2-qadam. Sayt papkasi (3 daqiqa)

Saytga faqat ochiq bo‘lishi mumkin bo‘lgan fayllar boradi.
Shuning uchun ular uchun alohida `sayt/` papka qilamiz.
Claude Code’ga:

```text
app ichida "sayt" papkasini yarat.
3-darsdagi lid formam bo'lsa (examples/lead-form/index.html), faqat shu index.html ni sayt/ ga nusxala.
Bo'lmasa, sayt/index.html ga kompaniyam uchun bitta oddiy sahifa yoz: nomi, nima bilan shug'ullanishi, telefon raqami
va Telegram botimga havola (t.me/BOT_NOMI). Telefonda chiroyli ko'rinsin, tashqi fayl va shriftlarsiz.
sayt/ ga .env, kod yoki xodimlar ma'lumotini qo'yma.
```

### 3-qadam. Joylash (5 daqiqa)

Avval ikkita faylni `app/deploy/` ga qo‘ying.
Claude Code’ga:

```text
Yuklanmalar papkasidagi 4-dars-materiallar.zip ichidan sayt.py va sayt-sozlash.sh ni app/deploy/ ga nusxala.
Keyin "uv run python deploy/sayt.py forma.barakaoffice.uz sayt" ni ishga tushir va har bosqichni bir gapda tushuntir.
```

`forma.barakaoffice.uz` o‘rniga o‘z subdomeningizni yozing.
Skript serverda 5 ish qiladi: Caddy’ni o‘rnatadi, firewall’da 80 va 443 portlarini ochadi, sahifani joylaydi, Caddy’ni sozlaydi, DNS va HTTPS’ni tekshiradi.

Kutilgan natija, DNS tayyor bo‘lsa (oxiri):

```text
==> 5/5 Tekshiruv: DNS va HTTPS
DNS: forma.barakaoffice.uz -> 203.0.113.10 (shu server). To'g'ri.

==> Tayyor: https://forma.barakaoffice.uz ochiladi (HTTPS, qulf belgisi bilan).
Sertifikatni Caddy o'zi yangilab turadi. Telefoningizda ham oching.
```

DNS hali tayyor bo‘lmasa (`namuna/natijalar/10b-sayt-dns-tayyor-emas.txt`):

```text
==> 5/5 Tekshiruv: DNS va HTTPS
DIQQAT: forma.barakaoffice.uz hali hech qaysi IP manzilga qaramayapti (DNS yozuvi yo'q yoki hali tarqalmagan).
Domen panelida A yozuvi qo'shing: nom = forma, qiymat = serveringiz IP manzili.

==> Caddy sozlandi, lekin https://forma.barakaoffice.uz hali ochilmadi.
DNS tayyor bo'lishi bilan Caddy sertifikatni o'zi oladi: qayta ishga tushirish shart emas.
```

Bu holatda hech narsani qayta qilmaysiz: kechqurun telefonda manzilni oching.

### 4-qadam. Telefonda tekshiring

Telefon brauzerida `https://forma.barakaoffice.uz` ni to‘liq yozing.
Manzil satrida qulf belgisi bor, sahifa ochiladi.
Qulfni bosing: «Connection is secure» va sertifikat beruvchi «Let’s Encrypt».

### Baraka namunasi

Rustamov S.A. chorshanba kuni Airnet panelida `forma` uchun A yozuvi qo‘shdi (qiymat - server IP).
Dars kuni `nslookup` server IP manzilini ko‘rsatdi.
`sayt/` papkasiga 3-darsdagi lid formasi (`examples/lead-form/index.html`) nusxalandi va `sayt.py` bilan joylandi.
Endi `https://forma.barakaoffice.uz` - Baraka Office’ning qulfli sahifasi: forma Google Sheets’ga yozadi va Telegram’ga xabar beradi (3-dars namoyishi).
Sinovimizda (Docker, 2026-11-03) shu sahifa Caddy orqali HTTPS bilan ochildi va server qayta yuklangandan keyin ham bot bilan birga o‘zi qaytdi (`namuna/natijalar/10-sayt-test.txt`).
Haqiqiy Let’s Encrypt sertifikati sinovda olinmadi: konteynerda ochiq domen yo‘q, Caddy’ning o‘z test sertifikati (`--test-local`) ishlatildi.

### Yomon namunalar va tuzatish

| Yomon | Nima xato | Tuzatish |
|---|---|---|
| A yozuvi: nom `forma.barakaoffice.uz`, qiymat `http://203.0.113.10` | Ko‘p panel nomga domenni o‘zi qo‘shadi: `forma.barakaoffice.uz.barakaoffice.uz` bo‘lib qoladi; qiymatda faqat raqam bo‘lishi kerak | Nom: `forma`. Qiymat: `203.0.113.10` |
| `sayt.py forma.barakaoffice.uz .` (butun `app/` papkasi) | `.env` yashirin fayl sifatida yuborilmaydi, lekin `data/` (narxlar, 1C qoldig‘i) va kod internetga ochiladi | Faqat `sayt/` papkasi; unda faqat ochiq sahifa |
| Saytni `http://203.0.113.10:8000` da ochish | IP bilan qulf (HTTPS) bo‘lmaydi; ochiq port - qo‘shimcha eshik | Faqat domen orqali; 80 va 443 dan boshqa portni ochmang |
| DNS tarqalmagan, Claude’ga «HTTPS’ni majburan ol» deyish | Let’s Encrypt DNS tayyor bo‘lmaguncha sertifikat bermaydi; ko‘p urinish limitga uriladi | Kuting; Caddy o‘zi qayta urinadi |

### Orqaga qaytarish (saytni o‘chirish)

Claude Code’ga:

```text
Serverda Caddy saytini o'chir: "systemctl disable --now caddy", keyin firewall'dan "ufw delete allow 80/tcp" va "ufw delete allow 443/tcp". Bot (pilot-bot) ga tegma.
```

### Tayyor bo‘ldi, agar

- [ ] Bot yo‘li: 2-mashq tayyor (mentor 4.8 ni «bot» deb belgilaydi).
- [ ] Yoki domen yo‘li: telefonda `https://<subdomen>` qulf bilan ochiladi (mentor 4.8 ni «domen» deb belgilaydi).
- [ ] DNS tarqalmagan bo‘lsa: `sayt.py` ishga tushirilgan, kechqurun tekshirasiz va natijani stol chatiga yozasiz.

<!-- pagebreak -->

## 4-mashq. To‘plam 5 A: sinov rejasi (1:50-2:20, 30 daqiqa)

**Natija:** `kompaniya/kit5-pilot/plan.md` - bitta raqamli maqsad, sanalar, chegaralar, muvaffaqiyat mezonlari, to‘xtatish sharti, kim tekshiradi, haftalik ko‘rib chiqish.
Reja bo‘lim boshlig‘i bilan agent ishga tushishidan **oldin** kelishiladi.

### Nega kerak

Sinov (pilot) - cheklangan, muddatli, real sinov: 2 hafta, bitta jarayon, bir necha xodim.
Rejasiz sinov 6-darsda «yaxshi bo‘ldi shekilli» degan taassurot bilan tugaydi.
Reja bilan esa 6-darsda (26 yoki 27-dekabr) bitta savolga javob berasiz: maqsadga yetdikmi, ha yoki yo‘q.

### Boshlashdan oldin kerak

| Nima | Qayerda |
|---|---|
| Boshlang‘ich raqamlar («Agentgacha») | `kit5-pilot/baseline.md` (2-darsdan keyin) |
| Agent yo‘riqnomasi: nima qila oladi (B.4) va qila olmaydi (B.5), kimga uzatadi (B.6) | `kit3-agent/instructions.md` |
| Kim botga yozadi, kim tekshiradi | Boshingizda: bugun yozamiz |
| Loyiha yetakchisi (2-darsdan keyin rozilik bergan xodim) | `kit5-pilot/briefing.md` |

### Qadamlar

#### 1. Namunani o‘qing (5 daqiqa, juftlikda)

Ikki faylni yonma-yon oching:

- Yaxshi: `namuna/kompaniya/kit5-pilot/plan.md` (Baraka Office, izohlar bilan).
- Yomon: `namuna/yomon/plan-yomon.md`.

Yomon rejaning har bandida nima xato ekanini sherigingizga ayting.
Keyin faylning oxiridagi javob bilan solishtiring.

#### 2. O‘z rejangiz (17 daqiqa)

Warp’da `kompaniya` papkasini oching (app emas!), `claude` deb yozing va yuboring:

```text
/kit5 reja
```

Skill sizdan A.1-A.9 ni bittalab so‘raydi.
`/kit5` ishlamasa, shu topshiriq matnini yuboring:

```text
kit5-pilot/baseline.md va kit3-agent/instructions.md ni o'qi.
Men bilan birga kit5-pilot/plan.md ni To'plam 5 A shakli bo'yicha to'ldir (A.1-A.9). Bir xabarda ko'pi bilan 3 ta savol ber.
Qoidalar:
- A.2 maqsad bitta raqam, baseline.md dagi raqamdan: "... dan ... gacha", birligi bilan.
- A.3: 6-darsgacha (26 yoki 27-dekabr) kamida 2 to'liq hafta; ishga tushirish dushanbadan kechikmasin.
- A.5 instructions.md dagi B.4 va B.5 dan ko'p ruxsat bermasin. 1-hafta: agent qoralama yozadi, odam har javobni tasdiqlaydi.
- A.7 aniq hodisa bo'lsin, "ko'p xato" emas; kim to'xtatadi va qanday.
- A.8 da agent o'zini o'zi tekshirmaydi.
Oxirida plan.md ni yoz va A.2, A.7 ni menga qayta o'qib ber.
```

Mentor stol bo‘ylab yuradi va uchta narsani tekshiradi: A.2 da birlik bormi, A.7 aniq hodisami, A.8 da odam ismi bormi.

#### 3. Rejadan bot sozlamasiga (3 daqiqa, uyda ham bo‘ladi)

Rejaning A.4, A.5, A.7, A.8 bandlari botning `.env` qatorlariga aylanadi.
Baraka namunasidagi «Rejadan bot sozlamasiga» jadvalini o‘qing.
Bugun `.env` ga tegmaysiz: xodimlar bilan suhbatdan keyin, uy vazifasida o‘zgartirasiz.

### Har bir maydon qayerdan keladi

| Maydon | Qayerdan | Odatiy xato |
|---|---|---|
| A.1 | To‘plam 2 B.1 (jarayon nomi), `instructions.md` (agent nomi) | Jarayon o‘rniga bo‘lim nomi |
| A.2 | `baseline.md` dagi bitta ko‘rsatkich | Raqamsiz fe’l: «tezlashtirish», «yaxshilash» |
| A.3 | Taqvim: dushanba, 14-dekabr | «Bot tayyor bo‘lgach» |
| A.4 | To‘plam 3 A (kim bugun shu ishni qiladi) | «Hamma» |
| A.5 | `instructions.md` B.4 va B.5 | Yo‘riqnomadan ko‘p ruxsat |
| A.6 | `baseline.md` + maqsad | «Mamnun bo‘lsa» |
| A.7 | Xatoning narxi (To‘plam 1 B.8: «yuqori» deb belgilangan vazifalar) | «Juda ko‘p xato bo‘lsa» |
| A.8 | To‘plam 3 A.5 (kim tekshiradi) | «Agent o‘zi» |
| A.9 | Bo‘lim boshlig‘i taqvimi | «Vaqt bo‘lganda» |

Birliklarni aralashtirmang: kunlik va haftalik raqam bitta qatorda bo‘lmasin (FAQ R-02).

### Tayyor bo‘ldi, agar

- [ ] `kit5-pilot/plan.md` saqlangan, A.1-A.9 bo‘sh emas.
- [ ] A.2 - bitta raqam, birligi bilan, `baseline.md` dagi raqamdan boshlanadi.
- [ ] A.7 - aniq hodisa va kim `/stop` qiladi.
- [ ] A.8 - odam ismi bilan, agent emas.
- [ ] Bo‘lim boshlig‘i bilan uchrashuv vaqti belgilangan (ishga tushirishdan oldin).
- [ ] Mentor tekshirdi: kod 4.9.

<!-- pagebreak -->

## 5-mashq. To‘plam 4: xodimlarni yangi rolga tayyorlash (2:26-2:37, 11 daqiqa)

**Natija:** `kompaniya/kit4-people/form-a-skills-map.md` (har bir ishi o‘zgarayotgan xodim) va har biri uchun `kit4-people/<ism>-form-b.md` (mashg‘ulot vazifasi va 15 daqiqalik suhbat rejasi).
Suhbatning o‘zi - uy vazifasi: bot xodimlar uchun yoqilishidan **oldin**.

### Nega kerak

Xodim botni rahbardan emas, tasodifan bilib qolsa, «meni almashtirishyapti» deb o‘ylaydi va haqiqiy ishini yashiradi.
Shunda sinov raqamlari yolg‘on chiqadi.
To‘plam 4 uchta savolga javob beradi: kim nimani eng yaxshi qiladi, ertaga u nimani tekshiradi, bu haqda unga qanday aytamiz.
Biz odamni almashtirmaymiz, kuchaytiramiz: bo‘shagan emas, **tejalgan** vaqt yuqoriroq qiymatli ishga ketadi.

### Boshlashdan oldin kerak

| Nima | Qayerda |
|---|---|
| Jarayon qadamlari: bugun kim, ertaga kim, kim tekshiradi | `kit3-agent/form-a-steps.md` (A.3, A.4, A.5) |
| 3 ta yaxshi va 3 ta yomon real misol | `kit4-people/test-set.md` (3-dars uy vazifasi) |
| Har bir xodimning To‘plam 1 dagi vazifalar ro‘yxati | `kit1-interviews/<ism>-form-b.md` |
| Sinov rejasi | `kit5-pilot/plan.md` (4-mashq) |

### Qadamlar

#### 1. Namunani ko‘ring (2 daqiqa)

- Yaxshi: `namuna/kompaniya/kit4-people/form-a-skills-map.md` va `madina-form-b.md`.
- Yomon: `namuna/yomon/kit4-yomon.md` - har qatorda nima xato, sherigingiz bilan bir-ikki misol ayting.

#### 2. A va B shakllari (9 daqiqa, uyda tugatasiz)

Warp’da `kompaniya` papkasini oching, `claude` deb yozing va yuboring:

```text
/kit4
```

Skill avval ishi o‘zgarayotgan xodimlar ro‘yxatini To‘plam 3 dan topib, tasdiqlatadi.
Keyin har biri uchun bittadan so‘raydi: eng kuchli qobiliyati va **real misol** (qachon, nima bo‘ldi).
Misolni o‘zingiz aytasiz: Claude uni to‘qimaydi; esingizda bo‘lmasa, `[?]` qoladi va uyda to‘ldirasiz.

`/kit4` ishlamasa, shu topshiriq matnini yuboring:

```text
kit3-agent/form-a-steps.md, kit4-people/test-set.md va kit1-interviews/ dagi B shakllarini o'qi.
1. Ishi o'zgarayotgan xodimlar ro'yxatini menga ko'rsat va tasdiqlat.
2. Har bir xodim uchun mendan so'ra: eng kuchli qobiliyati va bitta real misol (sana va voqea). Misolni o'zing to'qima.
3. kit4-people/form-a-skills-map.md ni To'plam 4 A shakli bo'yicha yoz (A.1-A.6).
4. Har bir xodim uchun kit4-people/<ism>-form-b.md yoz: B.1-B.7, B.3 ni bir daqiqalik 4-6 ta ha/yo'q savol qil,
   B.4 ga test-set.md dagi 6 misolni qo'y. B.8 va B.9 ni bo'sh qoldir: ular suhbatdan keyin to'ldiriladi.
5. Har bir B shakli oxiriga 15 daqiqalik suhbat rejasini qo'sh: nima o'zgaradi, nima o'zgarmaydi (maosh va lavozim),
   endi nimani tekshiradi, qanday to'xtatiladi, xavotirlarini so'rash, kelishuv.
Xodimlarga aytiladigan matnda "optimizatsiya", "qisqartirish", "o'rnini bosadi", "bo'shagan vaqt", "nazorat" so'zlarini ishlatma.
Har doim "siz" va ism bilan "aka" yoki "opa".
```

#### 3. Yozma majburiyatni yangilang (uyda, 5 daqiqa)

1-darsda imzolagan yozma majburiyatingizda (`kit1-interviews/team-message.md`) ikkita joy hali umumiy: 4 va 5-bandlar.
Suhbatlardan oldin ularni aniq qiling va har bir xodimga yangi nusxani bering:

```text
4. [Loyiha yetakchisi ismi] va men yordamchini istalgan payt telefondan /stop buyrug'i bilan to'xtata olamiz.
   Yordamchi zarar yetkazayotganini ko'rgan har kim [ism]ga aytsin; buning uchun hech kim jazolanmaydi.
5. Yordamchi tejagan vaqt [nimaga] ketadi; bu shu ishdagi odamlar bilan birga hal qilingan.
   U qo'shimcha haqsiz ish bilan to'ldirilmaydi. Kimningdir vazifasi o'zgarsa, avval yozma kelishamiz.
```

Baraka namunasi: «4. Malika Rashidova va men ... /stop ...», «5. ... showroomdagi mijozlar va ofis o‘lchovlariga ketadi».

### Har bir maydon qayerdan keladi

| Maydon | Qayerdan | Odatiy xato |
|---|---|---|
| A.1 | To‘plam 3 A.3 (bugun kim) va A.5 (kim tekshiradi) | Ishi o‘zgarayotgan odamni unutish (masalan, savollarga javob beradigan omborchi) |
| A.2 | Sizning xotirangiz: oxirgi marta qachon ko‘rdingiz? | Sifat so‘zi, misolsiz («mas’uliyatli») |
| A.3 | To‘plam 1 B shakli | Lavozim nomi, ish emas |
| A.4 | A.2 ni jarayondagi joyga bog‘lash | «AI’ni o‘rganadi» |
| A.5 | To‘plam 3 A.5 | «Nazorat qiladi», natijasiz |
| B.3 | `instructions.md` B.4, B.5 | «To‘g‘ri bo‘lsin» |
| B.4 | `test-set.md` | Faqat yaxshi misollar |
| B.8, B.9 | Suhbatdan keyin, xodimning so‘zlari | Suhbatdan oldin egasi yozgan |

### Tayyor bo‘ldi, agar

- [ ] A shaklida har bir ishi o‘zgarayotgan xodim bor va A.2 da real misol (yoki `[?]`, uyda to‘ldiriladi).
- [ ] Har bir xodim uchun B shakli: B.3 - 4-6 ta ha/yo‘q savol, B.4 - 6 misol, oxirida suhbat rejasi.
- [ ] B.8 va B.9 bo‘sh: suhbatdan keyin to‘ldiriladi.
- [ ] Har bir xodim bilan suhbat kuni va soati yozilgan, bot yoqiladigan vaqtdan **oldin**.
- [ ] Mentor ko‘rdi: kodlar 4.10 va 4.11.

<!-- pagebreak -->

## 6-mashq. 15 daqiqalik suhbat mashqi, juftlikda (2:37-2:50, 13 daqiqa)

**Natija:** har biringiz bir marta «rahbar», bir marta «xodim» bo‘lasiz.
Har bir sherik bitta xavotirni eshitib, unga javob bergan bo‘ladi.
Haqiqiy suhbat - uy vazifasi: bot xodimlar uchun yoqilishidan oldin, har bir xodim bilan yolg‘iz.

### Nega mashq qilamiz

Rahbar uchun eng qiyin joy - xodimning savoliga darhol javob topish: «meni bo‘shatasizmi?», «xato bo‘lsa men aybdormanmi?».
Bu savolni birinchi marta xodimdan eshitsangiz, bahslashib yuborasiz yoki hazil qilasiz.
Bugun begona odam bilan, xavfsiz joyda bir marta aytib ko‘rasiz.

### Tartib

| Vaqt | Nima |
|---|---|
| 0:00-0:01 | Sherik tanlang (bir stoldan). A va B ni belgilang. |
| 0:01-0:07 | **1-davra.** A - rahbar (o‘z kompaniyasi, o‘z xodimi), B - xodim. B pastdagi ro‘yxatdan bitta xavotirni tanlaydi va A ga oldindan aytmaydi. |
| 0:07-0:13 | **2-davra.** Rollarni almashtiring. |
| 0:13 | Mentor bitta savol beradi: «Qaysi gap qiyin bo‘ldi?» |

Har davrada «rahbar» 6 daqiqada suhbat rejasining hammasidan o‘tadi (to‘liq suhbat 15 daqiqa; bugun qisqa varianti).
Reja `kit4-people/<ism>-form-b.md` oxirida (5-mashq) yoki Baraka namunasida: `namuna/kompaniya/kit4-people/madina-form-b.md`.

### Rahbar kartasi (A)

1. **Nega gaplashyapmiz:** «[Ism] aka/opa, botni yoqishdan oldin bu haqda Siz mendan eshitishingizni xohladim.»
2. **Nima o‘zgaradi:** bitta-ikki gap, aniq: bot nimani qoralaydi, Siz nimani qilasiz.
3. **Nima o‘zgarmaydi:** mijoz bilan ishlash, maosh, lavozim; yozma majburiyat va uning muddati.
4. **Endi nimani tekshirasiz:** 4-6 ta ha/yo‘q savol (B.3); ❌ tugmasi.
5. **Qanday to‘xtatiladi:** kim, qaysi buyruq; xato haqida aytgan odam ayblanmaydi.
6. **«Sizni nima xavotirga solyapti?»** - so‘rang, tinglang, bahslashmang.
   Javob bering, keyin uning so‘zlarini yozing (B.8).
7. **Kelishuv:** nima deb kelishdik (B.9), mashq va birinchi ko‘rib chiqish sanasi.

Aytmang: «optimizatsiya», «qisqartirish», «o‘rningizni bosadi», «bo‘shagan vaqt», «nazorat», «sinov muddati», «sen».
Hazil qilmang: hazilni xodim reja deb eshitadi.

### Xodim kartasi (B): bitta xavotirni tanlang

Real xodimdek gapiring: qisqa, biroz xavotir bilan, darhol rozi bo‘lmang.

| # | Xavotir (xodim aytadi) | Yaxshi javob nimaga tayanadi |
|---|---|---|
| 1 | «Bot hamma narsani bilsa, keyin menga nima ish qoladi?» | Nima o‘zgarmaydi (mijoz, qaror); tejalgan vaqt qayerga ketishi, birga hal qilingan; yozma majburiyat |
| 2 | «Bot xato qilsa-yu, men payqamasam, men aybdor bo‘lamanmi?» | Majburiyat 3-bandi: bot xatosi uchun rahbar javob beradi; xatoni topgan maqtaladi |
| 3 | «Har bir yozganimni o‘qib, kuzatib o‘tirasizmi?» | Hisobotda faqat jami raqamlar, ism yo‘q; logda matn yo‘q; jurnal faqat sifat uchun, 60 kunda o‘chadi |
| 4 | «Menda shusiz ham vaqt yo‘q, bu qo‘shimcha ish-ku» | Nima sizdan olinadi; tekshirish ish vaqtida, kuniga 10-15 daqiqa; loyiha yetakchisiga qo‘shimcha haq (kelishilgan bo‘lsa) |
| 5 | «Mijoz oldida telefonga yozib o‘tirsam, mijoz nima deydi?» | Amaliy javob: «bir daqiqa, aniq narxni tekshiraman»; PDF’dan qidirishdan tezroq |
| 6 | «Men kompyuterni yaxshi bilmayman» | Bu Telegram, hamkasbga yozgandek; 30 daqiqalik mashq 6 misol ustida |
| 7 | «Ishim kamaysa, keyin maoshimni ham kamaytirasiz-da?» | Majburiyat 1-bandi: maosh va lavozim [sana]gacha o‘zgarmaydi; yozma |

### Mentor kuzatadi (har juftlikda bitta davra)

| Kuzatuv | Ha / yo‘q |
|---|---|
| Nima o‘zgarishi aniq aytildi | |
| Maosh va lavozim o‘zgarmasligi aytildi (yozma majburiyat bilan) | |
| Xodim endi nimani tekshirishi aytildi | |
| Kim va qanday to‘xtatishi aytildi | |
| Xavotir so‘raldi va bahslashmasdan tinglandi | |
| Taqiqlangan so‘z yoki «sen» ishlatilmadi | |

Mentor oxirida bitta narsani aytadi: eng yaxshi chiqqan gap va bitta tuzatish.

### Yomon namuna va tuzatish

**Yomon** (rahbar, 2 daqiqa, yo‘lakda):
«Madina, bot qo‘ydik, endi narxni o‘zing qidirib o‘tirma, botdan so‘ra. Xavotir olma, hech kimni haydamaymiz, hozircha. Savol bormi? Yo‘qmi? Bo‘ldi.»

**Nima xato:** «sen» bilan, yo‘lakda; nima o‘zgarmasligi va maosh aytilmagan; «hozircha» - eng qo‘rqinchli so‘z; nimani tekshirishi va qanday to‘xtatishi aytilmagan; savolga vaqt berilmagan («Yo‘qmi?», «Bo‘ldi»).

**Tuzatilgan** (boshi):
«Madina opa, 15 daqiqa vaqtingiz bormi? Ertaga yangi yordamchini yoqmoqchimiz, oldin bu haqda Siz mendan eshitishingizni xohladim.
Narx, qoldiq va muddat savollariga javobni endi bot qoralaydi: Siz savolni yozasiz, javobni o‘qiysiz va mijozga o‘zingiz aytasiz.
Mijoz bilan gaplashish Sizda qoladi, maoshingiz va lavozimingiz o‘zgarmaydi: mana yozma majburiyatim, may oyining oxirigacha...»

### Tayyor bo‘ldi, agar

- [ ] Ikkala davrada ham «rahbar» rejaning 7 qadamidan o‘tdi.
- [ ] Har bir sherik bitta xavotirni eshitib, unga javob berdi.
- [ ] Har biringiz haqiqiy suhbat kuni va soatini yozdingiz (uy vazifasi, 1-band).
