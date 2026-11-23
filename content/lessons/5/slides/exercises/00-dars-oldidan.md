# 4-darsga tayyorgarlik (dars oldidan, 30-40 daqiqa)

Bu xabarni mentor stol chatiga chorshanba kuni (9-dekabr) yuboradi.
Maqsad: darsda server bilan emas, assistentingiz bilan ishlash.
4-darsda shaxsiy AI assistentingiz noutbukdan serverga ko‘chadi: noutbuk yopiq bo‘lsa ham ishlaydi, telefondan boshqarasiz.
Buning uchun uchta narsa oldindan tayyor bo‘lishi kerak: server Claude Code’ni parolsiz kiritadi, server bir marta sozlangan, GitHub akkaunti bor.

## Chatga yuboriladigan matn

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

## 1-qadam. Server bilan aloqa va sozlash (Claude Code’ga 1-matn)

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

### Natija qanday bo‘lishi kerak

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

## 2-qadam. GitHub (Claude Code’ga 2-matn)

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

### Natija

```text
github.com
  ✓ Logged in to github.com account rustamov-baraka (keyring)
  - Git operations protocol: https
```

Inglizcha: «github.com’ga rustamov-baraka akkaunti bilan kirilgan». Sizda o‘z login nomingiz turadi.

## 3-qadam. Domen (ixtiyoriy, 5 daqiqa)

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

## Ko‘p uchraydigan xatolar

| Belgi | Sabab | Yechim |
|---|---|---|
| `Permission denied (publickey)` | Kalit serverga o‘rnatilmagan | `deploy/deploy.qollanma.md`, 1-qadam: kalitni nusxalash buyrug‘ini o‘zingiz alohida oynada yozasiz |
| `Connection refused` yoki `Connection timed out` | IP xato, server hali faollashmagan yoki o‘chiq | Provayder panelida server holati «Running»mi? IP’ni qayta nusxalang |
| Claude parol so‘rab qotib qoldi | Kalit ishlamayapti, buyruq parol kutyapti | Esc bosing; parolli buyruqni alohida oynada o‘zingiz yozing |
| Panelda foydalanuvchi `root` emas, `ubuntu` | Provayder boshqa nom bergan | `.env` da `DEPLOY_HOST=ubuntu@IP` yozing (qisqa nom emas); `sudo` parolsiz ishlashi kerak, Claude’dan tekshirishni so‘rang |
| `Could not get lock /var/lib/dpkg` | Yangi server o‘zini yangilayapti | 5 daqiqa kuting, `setup` ni qayta ishga tushiring |
| `gh: command not found` o‘rnatgandan keyin | Terminal yangi yo‘lni bilmaydi | Warp’ni yopib, qayta oching |
| Server hali sotib olinmagan yoki faollashmagan | - | Bugun sotib oling (0-hafta qo‘llanmasi, 13-qadam) va mentorga yozing; darsgacha tayyor bo‘lmasa - pastdagi bo‘lim |

## Server darsgacha tayyor bo‘lmasa

Kursda zaxira server yo‘q: har kim o‘z serverini oladi.
Server darsgacha faollashmasa yoki hali sotib olinmagan bo‘lsa:

1. Darsda deploy’ni stoldoshingiz bilan birga kuzatasiz va noutbukdagi qadamlarni o‘zingiz bajarasiz: GitHub (1-mashq), `.env` va `pilot check` (2-mashq, 1 va 1.5-qadamlar).
2. Serverni **shu kuni** sotib olasiz (Airnet, Click yoki Payme, 15 daqiqa).
3. 48 soat ichida mentor Siz bilan ekran ulashadi va assistentingizni serverga joylaysiz: shu fayldagi 1-2-qadamlar va 2-mashq, 15-20 daqiqa.

Shungacha assistentingiz faqat noutbuk yoqiq paytda ishlaydi: 4-darsning asosiy natijasi o‘sha qo‘ng‘iroqda bajariladi.

## Tayyor bo‘ldi, agar

- [ ] `ssh vps echo ok` (yoki `ssh root@IP echo ok`) parolsiz `ok` qaytaradi.
- [ ] `deploy.py setup` «Server is ready» bilan tugadi.
- [ ] `gh auth status` «Logged in» deydi.
- [ ] (Domen bo‘lsa) A yozuvi qo‘shilgan.
- [ ] Stol chatiga «server tayyor, github tayyor» deb yozdingiz.

Mentor uchun: juma kechgacha har kimni belgilang: yashil (ikkalasi tayyor), sariq (bittasi qolgan), qizil (server yo‘q yoki kira olmaydi).
Qizillar darsdan oldin 10 daqiqalik ekran ulashish qo‘ng‘irog‘iga (shanba guruhi juma kechqurun, yakshanba guruhi shanba kuni); server yo‘qlar ro‘yxati juma 18:00 gacha bosh mentorga: ularga serverni bugun sotib olishni eslating.
