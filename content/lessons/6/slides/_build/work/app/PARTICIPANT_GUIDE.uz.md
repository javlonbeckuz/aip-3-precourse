# Pilot botni o‘z biznesingizga moslash: qo‘llanma

Bu qo‘llanma 3, 4, 5 va 6-darslar bo‘yicha bosqichma-bosqich yozilgan.
Har bir qadamda: nima kerak, Claude Code’ga nima yozasiz, natija qanday bo‘lishi kerak.
Namuna sifatida kursning shartli demo kompaniyasi «Baraka Office» MChJ (ofis mebeli, Toshkent) ishlatilgan.
Shablondagi barcha fayllar shu kompaniya uchun to‘ldirilgan: avval namunani ko‘ring, keyin o‘zingiznikiga almashtiring.

## 0. Bu nima va qanday ishlaydi

Pilot bot - Telegram’dagi yordamchi.
Xodim savol yozadi, bot kompaniya ma’lumotlariga qarab javob beradi.
Javobni bilmasa yoki savol xavfli bo‘lsa, savolni mas’ul odamga yuboradi.
Har bir savol va javob jurnalga yoziladi.
Har kuni ertalab Sizga hisobot keladi, har dushanba 5-to‘plam raqamlari fayli keladi.

```
Xodim (Telegram)  ->  Bot (serverda, 24/7)  ->  AI model (OpenRouter)
                         |  ^
          agent/instructions.md (3-to‘plam B)   data/ (narxlar, 1C eksport, Google Sheet)
                         |
         jurnal  ->  kunlik hisobot va 5-to‘plam raqamlari  ->  Siz (Telegram)
```

Papkadagi asosiy fayllar:

| Fayl | Nima | Qo‘llanmasi |
|---|---|---|
| `agent/instructions.md` | Agent yo‘riqnomasi: 3-to‘plam B shakli | `agent/instructions.qollanma.md` |
| `agent/sources.toml` va `data/` | Agent ishlatadigan ma’lumotlar (B.3) | `agent/sources.qollanma.md` |
| `.env` | Kalitlar va sozlamalar | `env.qollanma.md` |
| `evals/test-set.toml` | Test to‘plami: 3 ta yaxshi va 3 ta yomon misol | `evals/test-set.qollanma.md` |
| `agent/schedule.toml` | Jadval bo‘yicha ishlar: «har kuni 8:30 da menga ...» | `agent/schedule.qollanma.md` |
| `kit5-baseline.toml` | «Agentgacha» raqamlari | `kit5-baseline.qollanma.md` |
| Telegram’dagi bot | Xodim va rahbar buyruqlari | `bot-commands.qollanma.md` |
| `deploy/` | Serverga joylash | `deploy/deploy.qollanma.md` |
| `samples/` | Har bir buyruqning tayyor natijasi (namuna) | - |

Boshlashdan oldin kerak bo‘ladi:
- Warp va Claude Code o‘rnatilgan (tayyorgarlik darsida qilingan).
- Telegram bot tokeni (BotFather, 2-dars uy vazifasi).
- OpenRouter hisobi va kaliti, kalitda oylik limit $10-20.
- 3-to‘plam B shakli (agent yo‘riqnomasi) to‘ldirilgan.
- Jarayoningiz ma’lumotlari: Excel, CSV, 1C eksporti yoki Google Sheet.
- 4-darsdan oldin: server (VPS), taxminan 200 000 so‘m oyiga.

Kursda va’da qilingan shaxsiy AI yordamchi - shu bot.
4-darsda u serverga ko‘chadi va kompyuteringiz o‘chiq bo‘lsa ham kecha-kunduz ishlaydi.
Uni telefoningizdan Telegram orqali boshqarasiz: holatini so‘raysiz, to‘xtatasiz, faktni eslab qolishini aytasiz, har kuni ma’lum vaqtda kerakli ro‘yxatni yuborishini va eslatma qilishini so‘raysiz.
Xodimlar uchun u «Savdo yordamchisi», Siz uchun esa shaxsiy yordamchi (2.8-qadam).

Uchta oltin qoida:
1. Kalitlar faqat `.env` faylida turadi.
   Ularni hech qachon chatga, Telegram’ga yoki Claude Code’ga yozmang.
2. Har bir o‘zgarishdan keyin testlar ishga tushadi: `uv run pytest`.
   Test o‘tmasa, serverga joylanmaydi.
   `pytest` kodni tekshiradi; kompaniyangiz ma’lumotini (narxlar, yo‘riqnoma) `uv run pilot check` va `uv run pilot eval` tekshiradi.
3. Bot jarayonni o‘lchaydi, odamni emas.
   Hisobotda xodim ismlari va kim qancha ishlagani bo‘lmaydi.

## 1. 3-dars: botni o‘zingizniki qilish (agent v0)

Maqsad: bot noutbukingizda ishlaydi, Telegram’ga va bitta haqiqiy ma’lumot manbasiga ulangan, o‘tgan haftadagi 3 ta haqiqiy holatda to‘g‘ri javob beradi.

Vaqt: 1.1 va 1.2-qadamlar darsdan oldin uyda (mentor yuborgan xabar bo‘yicha) yoki darsning birinchi 20 daqiqasida stolda bajariladi.
Darsdagi 40 daqiqalik amaliyot 1.3-1.6-qadamlarga ketadi.

### 1.1 Papkani tayyorlash (5 daqiqa)

Mentor bergan zipni oching: ichidagi `app` papkasini kompaniya papkangizga ko‘chiring, natija `kompaniya/app/` bo‘ladi.
Warp’da shu papkaga o‘ting: `cd ` deb yozing, bitta bo‘sh joy qoldiring, `app` papkasini Finder’dan (Windows’da Explorer’dan) Warp oynasiga sudrab tashlang va Enter bosing.
Masalan: `cd ~/Desktop/kompaniya/app` (Windows: `cd $HOME\Desktop\kompaniya\app`).
Keyin `claude` deb yozing.
Claude Code’ga yozing:

```text
CLAUDE.md ni o'qi va bu loyiha nima qilishini 5 ta oddiy gapda tushuntir.
Keyin "uv sync" va "uv run pytest" ni ishga tushir va natijani ayt.
```

Natija: Claude loyihani tushuntiradi va «barcha testlar o‘tdi» deydi (taxminan 100 ta test, 5 soniya).
uv 0-haftada o‘rnatilgan; tekshirish: `uv --version` (masalan, `uv 0.12.1`; yangiroq versiya ham bo‘laveradi).
Claude «uv topilmadi» desa, unga yozing: `uv ni rasmiy o'rnatish buyrug'i bilan o'rnat (docs.astral.sh/uv)`.
uv - Python’ni va botning kutubxonalarini o‘zi o‘rnatadigan dastur; alohida Python o‘rnatish shart emas.
Testlar internetsiz va kalitsiz ishlaydi: ular botning har bir qismini soxta Telegram bilan tekshiradi.
Testlar kodni tekshiradi va Baraka namunasining alohida nusxasini (`tests/fixtures/baraka-app/`) o‘qiydi, shuning uchun o‘z ma’lumotlaringizni qo‘ygandan keyin ham o‘tadi.
O‘z ma’lumot va yo‘riqnomangizni `uv run pilot check` va `uv run pilot eval` tekshiradi.

Butun botni bir marta ko‘rib chiqish uchun (internet ham, kalit ham kerak emas):

```text
"uv run python -m tools.demo" ni ishga tushir va natijani menga qisqa tushuntir.
```

Bu soxta Telegram bilan to‘liq suhbatni ko‘rsatadi: savol, javob, ❌ tugmasi, odamga uzatish, hisobot.
Tayyor natija: `samples/suhbat.md`.

### 1.2 Kalitlar: `.env` fayli (10 daqiqa)

Claude Code’ga yozing:

```text
.env.example dan .env faylini yarat. Ichini o'qima va menga ko'rsatma.
Faqat qaysi qatorlarni o'zim to'ldirishim kerakligini ayt.
```

`.env` faylini o‘zingiz oching: Warp’da (`app` papkasida) Mac’da `open -e .env`, Windows’da `notepad .env` deb yozing.
Shu yo‘l bilan fayl `.env.txt` bo‘lib qolmaydi.
To‘ldiring va saqlang:
- `TELEGRAM_BOT_TOKEN=` - BotFather bergan token.
- `OPENROUTER_API_KEY=` - openrouter.ai/keys dagi kalit.
- `COMPANY_NAME=` va `AGENT_NAME=` - kompaniyangiz nomi va agentning vazifa nomi (masalan, «Narx yordamchisi»).

Har bir qatorning batafsil izohi va to‘ldirilgan namunasi: `env.qollanma.md`.

Botni ishga tushirish va to‘xtatish:
Bot uzoq ishlaydigan dastur, shuning uchun uni Claude Code ichida emas, Warp’ning alohida oynasida (tab) ishga tushiring.
Warp’da yangi oyna oching, 1.1-qadamdagidek `cd` bilan `app` papkasiga o‘ting va yozing: `uv run pilot run`.
Internet yoki token xato bo‘lsa, bot bitta qator bilan nima tekshirishni aytadi.
To‘xtatish: shu oynada Ctrl+C.

Telegram ID raqamingizni bilish:
1. Botni ishga tushiring (yuqoridagidek).
2. Telefoningizda botingizga `/start` yozing.
   Bot javob beradi: «Sizning Telegram ID raqamingiz: 123456789».
3. Shu raqamni `.env` dagi `OWNER_CHAT_ID=` qatoriga yozing.
4. Botni to‘xtating (Ctrl+C) va qayta ishga tushiring.

Xodimlarning ID raqami ham shunday bilinadi: ular botga yozadi, bot ularga raqamini aytadi.
Lekin xodimlarni hozir qo‘shmang: avval 4-darsdagi suhbat bo‘lishi kerak.

### 1.3 Agent yo‘riqnomasi: 3-to‘plam B shakli (15 daqiqa)

`agent/instructions.md` - bu agentning ish yo‘riqnomasi (system prompt).
U 3-to‘plam B shaklining o‘zi: B.1 dan B.10 gacha.
Hozir unda Baraka Office namunasi turibdi.
Claude Code’ga yozing:

```text
../kit3-agent/instructions.md dagi tizim yo'riqnomamni (/kit3 yozgan) agent/instructions.md ga ko'chir.
Sarlavhalardagi B kodlarini saqla. Baraka Office namunasini o'chir.
Keyin agent/examples.md va agent/memory.md dagi Baraka misollarini o'chirib, bo'sh qoldir.
B.4, B.5 va B.6 da noaniq joy bo'lsa, menga savol ber.
```

Baraka namunasi 9 ta faylda turibdi.
Ularning hammasini o‘zingiznikiga almashtiring, aks holda botingiz Baraka narxlarini aytadi, har kuni Baraka ombori haqida xabar yuboradi, 5-to‘plam faylingizda esa Baraka raqamlari chiqadi:

| Fayl | Nima qilinadi | Qachon |
|---|---|---|
| `agent/instructions.md`, `agent/examples.md`, `agent/memory.md` | O‘z yo‘riqnomangiz; namunalar va xotira bo‘sh qoladi | 1.3-qadam |
| `data/narxlar.csv`, `data/qoidalar.md`, `data/ombor-1c.csv` | O‘chiriladi, o‘rniga o‘z eksportingiz | 1.4-qadam |
| `evals/test-set.toml` | O‘z 6 ta misolingiz | 1.7-qadam |
| `agent/schedule.toml` | Baraka ishi o‘chiriladi (pastdagi topshiriq); o‘zingizniki 5-darsda qo‘shiladi | Hozir |
| `kit5-baseline.toml` | O‘z boshlang‘ich raqamlaringiz | 4-darsgacha |

Baraka jadval ishini o‘chirish uchun Claude Code’ga yozing:

```text
agent/schedule.toml dagi Baraka «Kam qolgan mahsulotlar» ishini o'chir. Fayl bo'sh qolsin, o'zimnikini 5-darsda qo'shaman.
```

`uv run pilot check` qaysi namuna fayli qolganini «❌ Baraka Office namunasi hali bor» deb ko‘rsatadi va oxirida «Hali tayyor emas» deydi.
Namuna qolguncha bot serverga joylanmaydi: Baraka yo‘riqnomasi va narxlari xodimlaringizga yetib bormasligi uchun.
Jadvaldagi ish o‘chirilgan manbani so‘rasa, `pilot check` buni ham ko‘rsatadi.

Yaxshi va yomon yo‘riqnoma farqi, har bir maydon uchun izoh: `agent/instructions.qollanma.md`.
Eng muhim maydon - B.6 (qachon odamga uzatadi).
Agent javobini bilmasa yoki holat B.6 ga tushsa, u «ODAMGA:» deb yozadi va bot savolni odamga yuboradi.

### 1.4 Ma’lumotlarni ulash (15 daqiqa)

B.3 da yozgan har bir manbangiz uchun:
- API yoki MCP bo‘lmasa, eksport yetarli: Excel, CSV, 1C dan chiqarilgan fayl.
  Faylni `data/` papkasiga qo‘ying.
- Google Sheet bo‘lsa, havolasini tayyorlang.
- Qoidalar, narx siyosati, FAQ - oddiy matn fayli (`.md` yoki `.txt`).

Claude Code’ga yozing:

```text
data/ papkasidagi Baraka fayllarini o'chir. Men data/ ga o'z faylimni qo'ydim: [fayl nomi].
agent/sources.toml ni shu faylga moslab yangila.
Ichki ustunlar (tannarx, telefon raqamlari) modelga ko'rinmasin: columns ro'yxatini taklif qil.
Keyin "uv run pilot check" ni ishga tushir.
```

Natija: `pilot check` har bir manba nechta qatordan iboratligini va qaysi ustunlar ko‘rsatilishini aytadi.
Namuna natija: `samples/pilot-check.txt`.
Batafsil (1C eksporti, Google Sheet, katta jadvallar): `agent/sources.qollanma.md`.

### 1.5 Birinchi javoblar: terminalda (10 daqiqa)

O‘tgan haftadagi 3 ta haqiqiy savolni oling (Telegram yozishmalaringizdan yoki xodimdan).
Claude Code’ga yozing:

```text
Shu 3 ta savolni "uv run pilot ask" bilan bittadan sinab ko'r va har birining narxini ayt:
1. [haqiqiy savol]
2. [haqiqiy savol]
3. [haqiqiy savol]
```

Bu pulli: har bir savol taxminan $0.003-0.005 (40-60 so‘m).
Natija namunasi: `samples/pilot-ask.txt`.
Javob noto‘g‘ri bo‘lsa, kodni emas, avval `agent/instructions.md` ni tuzating.

### 1.6 Telegram’da ishga tushirish (10 daqiqa)

Botni Warp’ning alohida oynasida ishga tushiring: `uv run pilot run` (1.2-qadamdagidek).
Telefoningizdan botga o‘sha 3 ta savolni yozing.
Har bir javob ostida ikkita tugma bor: ✅ To‘g‘ri va ❌ Xato.
❌ bossangiz, bot nima noto‘g‘riligini so‘raydi: bu xatolar jurnaliga (5-to‘plam B.13) tushadi.

3-darsdagi «tekshiruvchi» mashqi uchun: `uv run pilot eval --judge` buyrug‘i ikkinchi, kuchliroq model bilan javoblarni yo‘riqnomadagi qoidaga qarab tekshiradi.
Agent o‘z ishini o‘zi tekshirmaydi.

### 1.7 Uy vazifasi: test to‘plami

3 ta yaxshi va 3 ta yomon haqiqiy misolni yig‘ing (4-to‘plam B.4).
Ular agentning test to‘plamiga aylanadi:

```text
../kit4-people/test-set.md dagi misollarni evals/test-set.toml ga [[test]] qilib qo'sh.
Baraka testlarini o'chir. Har bir yomon misoldan "mumkin_emas" qatorini chiqar.
Keyin narxini aytib, "uv run pilot eval" ni ishga tushir.
```

Qanday yozish, namuna va natija: `evals/test-set.qollanma.md` va `samples/pilot-eval.txt`.

3-dars tugadi, agar:
- [ ] `uv run pytest` - hammasi o‘tdi.
- [ ] `uv run pilot check` oxirida «Tayyor.» deydi: Baraka namunasi qolmagan (`kit5-baseline.toml` 4-darsgacha qolishi mumkin, u faqat ⚠️).
- [ ] Bot Telegram’da 3 ta haqiqiy savolga to‘g‘ri javob berdi.
- [ ] `evals/test-set.toml` da Sizning 6 ta misolingiz bor.

## 2. 4-dars: serverga joylash va ishga tushirish

Maqsad: bot noutbuk yopiq bo‘lsa ham ishlaydi, kod GitHub’da saqlangan, sinov cheklangan ruxsatlar bilan boshlanadi.

### 2.1 Noutbuk sinovi

Bot noutbukda ishlayotganda noutbukni yoping va botga yozing: javob yo‘q.
Sababi: bot noutbuk ichida yashayapti.
Biznes vositasi noutbukka bog‘liq bo‘lmasligi kerak, shuning uchun serverga ko‘chiramiz.

### 2.2 GitHub: zaxira va «undo»

```text
Bu papka uchun private GitHub repozitoriy yarat va kodni push qil.
.env va runtime/ gitga tushmasligini tekshir (.gitignore) va menga isbotini ko'rsat.
```

### 2.3 Serverga joylash

Server tayyorlash, `.env` ni yuborish va joylash qadamlari: `deploy/deploy.qollanma.md`.
Qisqasi, Claude Code’ga yozasiz:

```text
deploy/deploy.qollanma.md ni o'qi va meni 1-qadamdan boshlab olib bor.
Har bir buyruqdan oldin nima qilishini bir gapda ayt.
```

Natija: `deploy.py status` «active (running)» deydi, bot noutbuk yopiq holda javob beradi.
Namuna natija: `samples/deploy-output.txt`.

Muhim: bitta bot tokeni faqat bitta joyda ishlaydi.
Serverga joylagach, noutbukdagi botni to‘xtating (Ctrl+C).
Aks holda bot «409 Conflict» haqida ogohlantiradi.

### 2.4 Loglar

```text
"uv run python deploy/deploy.py logs" ni ishga tushir va oxirgi 20 qatorni oddiy tilda tushuntir.
```

Har bir savol logda bitta qator: raqami, holati, narxi, vaqti.
Xodimning ismi va yozgan matni logga yozilmaydi.

### 2.5 Sinov rejasi va cheklangan ruxsatlar (5-to‘plam A)

1-haftada agent faqat loyiha tayyorlaydi, javobni odam tasdiqlaydi.
`.env` da:
- `REPLY_MODE=approve` - har bir javob avval tekshiruvchiga boradi.
- `REVIEWER_CHAT_ID=` - tekshiruvchi (loyiha yetakchisi) ID raqami.
- `ADMIN_USER_IDS=` - loyiha yetakchisi ham `/stop` bosa olsin.
- `PILOT_START_DATE=` - sinov boshlangan kun (masalan, 2026-12-14).

`kit5-baseline.toml` ga «Agentgacha» raqamlarini yozing: `kit5-baseline.qollanma.md`.
O‘zgargan `.env` ni serverga yuboring: `deploy.py env`.

Tekshiruvchi Telegram’da javob loyihasini ko‘radi:
«✅ Yuborish» - javob xodimga boradi.
«❌ Rad etish» - javob yuborilmaydi.
Loyihaga reply qilib to‘g‘ri javobni yozsa, bot shu javobni yuboradi.
Rad etilgan va tuzatilgan javoblar xato sifatida hisoblanadi (B.3).
2-haftada ba’zi mavzular darhol yuborilishi mumkin: 3.9-bo‘lim.

### 2.6 Mijozlar uchun bot bo‘lsa

Pilot mijozlarga javob beradigan bo‘lsa (`ACCESS_MODE=public`):
- 1-hafta albatta `REPLY_MODE=approve`: mijozga har bir javobni avval odam tasdiqlaydi.
- `PUBLIC_DAILY_LIMIT_PER_USER` - bir odam kuniga nechta savol bera oladi (begona odam limitni tugatib qo‘ymasin).
- `agent/sources.toml` dagi `columns` bilan ichki ustunlarni (tannarx, chegirma vakolati) yashiring.
- Mijozning savoli AI modelga, ya’ni chet eldagi serverga boradi: botga pasport, karta raqami yubormaslikni so‘rang.
- Qonun: ZRU-1125 (lex.uz/docs/8104580) bo‘yicha faqat biometrik, genetik va aloqa abonentlari ma’lumotlari O‘zbekistonda saqlanishi shart; qolgan shaxsiy ma’lumot shartlar bilan chetga chiqishi mumkin.
  49 davlat ro‘yxati - Vazirlar Mahkamasining 415-son qarori (lex.uz/ru/docs/8369688): Germaniya ro‘yxatda, AQSh faqat EU-US Data Privacy Framework sertifikatiga ega kompaniyalar uchun, OpenRouter orqali ishlaydigan model provayderlari esa bunga kirmasligi mumkin.
  Shuning uchun yurist tasdiqlamaguncha mijozlarning shaxsiy ma’lumotini botga bermang.

### 2.7 Avval suhbat, keyin xodimlar (4-to‘plam)

4-to‘plam suhbati bot yoqilishidan oldin bo‘ladi, hech qachon keyin emas.
Suhbatdan keyin xodimni qo‘shasiz: telefoningizdan botga `/ruxsat 123456789 Ism` deb yozing.
Xodimga `bot-commands.qollanma.md` dagi «Xodimlar uchun» qismini yuboring.

4-dars tugadi, agar:
- [ ] Bot serverda ishlaydi, noutbuk yopiq holda javob beradi.
- [ ] Kod private GitHub’da, `.env` unda yo‘q.
- [ ] `REPLY_MODE=approve` va `PILOT_START_DATE` qo‘yilgan.
- [ ] 4-to‘plam suhbati bo‘lgan, keyin xodim qo‘shilgan.

### 2.8 Endi bu - Sizning shaxsiy AI yordamchingiz

Bot serverda ishlayapti: noutbukingiz o‘chiq, Siz yo‘ldasiz, u esa ishlayveradi.
Uni telefoningizdan boshqarasiz; bu buyruqlar faqat Sizga va loyiha yetakchisiga ishlaydi.

| Nima kerak | Telegram’da botga yozing | Natija |
|---|---|---|
| Hammasi joyidami? | `/holat` | Ishlayaptimi, model, ma’lumotlar qachon yangilangan |
| Bugungi raqamlar | `/hisobot` | So‘rovlar, javoblar, xatolar, xarajat |
| Darhol to‘xtatish | `/stop`, keyin `/davom` | Xodimlarga «vaqtincha to‘xtatilgan» deydi |
| Yordamchi biror faktni eslab qolsin | `/eslab_qol Menejerlar «140 lik stol» deganda Optima stolini (WS-102) nazarda tutadi` | Keyingi har bir javobda hisobga oladi; ro‘yxat: `/xotira`, o‘chirish: `/unut 1` |
| Har kuni ma’lum vaqtda ro‘yxat | `/jadval 07:45 Ombordan 15 donadan kam qolgan mahsulotlar ro‘yxatini yubor` | Har ish kuni 7:45 da ma’lumotdan javob tayyorlab yuboradi; ro‘yxat: `/jadval` |
| Eslatma | `/eslat 15:00 Jamshid aka bilan tender bo‘yicha gaplashish` | Soat 15:00 da eslatadi |
| Savol | Oddiy matn: «Senator kreslo omborda nechta bor?» | Ma’lumotdan javob |
| Yangi 1C yoki Excel eksporti | Faylni botga yuboring (nomi o‘sha: `ombor-1c.csv`) | Bot faylni tekshiradi: xato bo‘lsa rad etadi, to‘g‘ri bo‘lsa keyingi savoldan ishlatadi |

Kompyuter o‘chiq bo‘lganda ham bot o‘zi:
- har kuni ertalab kechagi hisobotni yuboradi;
- `agent/schedule.toml` va `/jadval` dagi ishlarni bajaradi;
- eslatmalarni vaqtida yuboradi;
- buzilsa yoki server qayta yuklansa, 5 soniyada qayta ishga tushadi.

Telefondan qo‘shilgan faktlar va ishlar serverda saqlanadi (`runtime/`) va yangi versiya joylanganda yo‘qolmaydi.
Uzoq muddatli faktlarni keyinroq `agent/memory.md` ga ko‘chiring, ular GitHub’da ham saqlanadi.
Claude Code’ga yozing: `deploy.py memory bilan serverdagi xotirani o'qi va agent/memory.md ga ko'chir`.

Namuna suhbat (rahbar ko‘rinishi):

![Rahbar ko‘rinishi](samples/suhbat-rahbar.png)

Bu yordamchi kompaniya ma’lumotlari bilan ishlaydi.
Shaxsiy pochta, kalendar kabi narsalarni ulash uchun mentor bilan alohida reja tuzing: har bir yangi ulanish yangi xavf.

## 3. 5-dars: agent yaxshilanadi

Maqsad: bir haftalik xatolardan agent yaxshilanadi, ertalabki hisobot keladi, odamga uzatish ishlaydi, bot faqat xodimlarga javob beradi.

### 3.1 Ertalabki hisobot

`DAILY_REPORT_TIME=09:00` bo‘lsa, har kuni soat 9:00 da kechagi raqamlar keladi.
Dushanba kuni qo‘shimcha ravishda haftalik 5-to‘plam fayli keladi.
Bot o‘sha paytda ishlamagan bo‘lsa, qayta ishga tushganda hisobotni yuboradi, ikki marta yubormaydi.
Hozir sinab ko‘rish: botga `/hisobot` yozing yoki `deploy.py report` ni ishga tushiring.
Namuna: `samples/kunlik-hisobot-pilot.txt` (sinovning 2-haftasi, 5.4-bo‘lim).

### 3.2 Biznes ishi jadval bo‘yicha

Ko‘p foyda chatdan emas, jadvaldan keladi.
`agent/schedule.toml` ga ish qo‘shing: belgilangan vaqtda agent ma’lumotlardan javob tayyorlaydi va Sizga yuboradi.
Baraka namunasida har kuni 8:30 da «Kam qolgan mahsulotlar» keladi.
Claude Code’ga yozing:

```text
agent/schedule.qollanma.md ni o'qi. Har kuni 9:00 da menga [nima kerak] ni yuboradigan ish qo'sh.
Qaysi manbadan olishini ayt, keyin "uv run pilot job <nom> --send" bilan sinab ko'r.
```

Batafsil, namuna va yomon namuna: `agent/schedule.qollanma.md`.

### 3.3 Yaxshilash halqasi: xatodan tuzatishgacha

Botga `/xatolar` yozing: oxirgi ❌ belgilangan javoblar chiqadi.
Har bir xato uchun Claude Code’ga yozing:

```text
Mana xatolar jurnalidan bitta xato: [xatoni nusxalab qo'ying].
CLAUDE.md dagi "yaxshilash halqasi" bo'yicha ishla:
sababini top, eng kichik o'zgarishni taklif qil, shu xato uchun yangi test qo'sh,
barcha testlarni ishga tushir va hammasi o'tsa, serverga joyla.
Oxirida 5-to'plam B.13 "Nimani o'zgartirdik" ustuniga nima yozishimni ayt.
```

Ko‘pincha tuzatish kodda emas:
- yo‘riqnoma noaniq bo‘lsa - `agent/instructions.md`;
- agent biror faktni bilmasa (masalan, xodimlar «140 lik stol» deb nimani aytadi) - `agent/memory.md`;
- javob shakli yomon bo‘lsa - `agent/examples.md` ga 2-3 ta to‘g‘ri javob.

### 3.4 Odamga uzatish (3-to‘plam B.6)

`.env` da `ESCALATION_CHAT_ID=` - uzatilgan savollar kimga boradi (masalan, ROP).
B.6 dagi har bir holatni bir marta soxta savol bilan sinang.
Masalan: «Mijoz 15% chegirma so‘rayapti».
Natija: xodimga «xodim javob beradi» degan xabar, mas’ul odamga savol va sabab boradi.
Mas’ul odam o‘sha xabarga reply qilib yozsa, bot javobni xodimga yetkazadi.
Ish vaqtidan tashqarida (`WORK_HOURS`) xodimlarga xabar yuborilmaydi: ertalabgacha kutadi.

### 3.5 Botni faqat xodimlar uchun qilish

Ikkinchi Telegram hisobidan (masalan, oila a’zosining telefonidan) botga yozing.
Bot faqat «Bu bot faqat xodimlar uchun» va ID raqamini aytadi, savolga javob bermaydi.

### 3.6 Model tanlash

Claude Code’ga yozing:

```text
Test to'plamini uchta modelda solishtir: cheap, balanced va strong.
Har biri uchun o'tgan testlar sonini va narxini jadval qilib ber. Avval umumiy narxni ayt.
```

Arzon model hamma testdan o‘tsa, `.env` da `MODEL_TIER=cheap` qo‘ying.
Arzon model ko‘proq tekshiruv talab qilsa, u qimmatga tushadi (B.11).

### 3.7 Xavfsizlik ro‘yxati

| Qoida | Shablonda qanday |
|---|---|
| Kalitlar faqat `.env` da | `.env` gitga tushmaydi, serverda faqat bot o‘qiy oladi (600) |
| Repozitoriy public emas | 2.2-qadam |
| Xarajat limiti | OpenRouter kalitidagi limit + `.env` dagi `DAILY_BUDGET_USD` va `MONTHLY_BUDGET_USD` |
| Agent pul o‘tkazmaydi, mijozga o‘zi yozmaydi, o‘chirmaydi | Kodda bunday imkoniyat yo‘q |
| Bot faqat xodimlarga javob beradi | `ACCESS_MODE=staff`, 3.5-qadamda sinalgan |
| Darhol to‘xtatish | `/stop` va `/davom` (Siz va loyiha yetakchisi) |
| Fayl ichidagi yashirin buyruq | Ma’lumot modelga «buyruq emas, ma’lumot» deb beriladi |
| Skill va MCP tekshirilgan | Bu bot tashqi skill yoki MCP ishlatmaydi |

### 3.8 Ma’lumot tartibi

Bitta mijoz yoki mahsulot turli tizimda turli nom bilan yozilgan bo‘lsa, agent adashadi.
Masalan: «Optima», «140 lik stol», «WS-102» - bitta mahsulot.
Bunday nomlarni `agent/memory.md` ga yozing.

### 3.9 2-hafta: mavzuga qarab tasdiq (5-to‘plam A.5)

1-haftani ko‘rib chiqqandan keyin qaror qilasiz: qaysi javoblar xodimga darhol borsin, qaysilari hali ham tasdiqdan o‘tsin.
A.5 sharti: to‘xtatish sharti (A.7) ishlamagan va 1-haftadagi har bir xato tuzatilib, test qo‘shilgan.
Baraka misoli: narx va ombor qoldig‘i - darhol; chegirma, yetkazish muddati va qolgan hamma javob - Malika tasdig‘idan keyin.

Ikki yo‘l bor:
- Fayl orqali: `agent/approval.toml` da `direct_topics = ["narx", "qoldiq"]`, `.env` da `REPLY_MODE=topics`, keyin `deploy.py deploy` va `deploy.py env`.
- Telefondan: botga `/darhol narx qoldiq` yozing; `/darhol` hozirgi rejimni ko‘rsatadi.

Bot har bir javobga mavzu belgilaydi (xodim uni ko‘rmaydi) va kalit so‘zlarni ham tekshiradi.
Shubha bo‘lsa - mavzu aniqlanmasa yoki savolda «chegirma», «yetkaz» kabi so‘z bo‘lsa - javob tasdiqqa boradi.
Xodim darhol javobni ✅ / ❌ tugmalari bilan oladi; tasdiqqa ketgan savolga «Javobni xodim tekshirib, tez orada yuboradi» deyiladi.

Claude Code’ga yozing:

```text
agent/approval.qollanma.md ni o'qi. 2-haftaga o'tamiz: [qaysi mavzular] darhol, qolgani tasdiqqa.
approval.toml va .env ni shunga moslab, pilot check va testlarni ishga tushir, keyin serverga joyla.
```

Sinab ko‘ring: xodim hisobidan bitta narx savoli (darhol keladi) va bitta chegirma savoli (tasdiqqa boradi).
Batafsil, namuna va yomon namuna: `agent/approval.qollanma.md`.

5-dars tugadi, agar:
- [ ] Xatolar jurnalidagi har bir xato tuzatildi va test qo‘shildi, `pilot eval` - hammasi o‘tdi.
- [ ] Ertalabki hisobot va jadvaldagi biznes ishi keldi.
- [ ] B.6 dagi har bir holat bir marta sinaldi.
- [ ] Begona hisobdan yozilganda bot javob bermadi.
- [ ] Xavfsizlik ro‘yxati to‘liq.
- [ ] 2-hafta rejimi tanlandi (`approve`, `topics` yoki `direct`) va sinab ko‘rildi.

## 4. 6-dars: natija

Botga `/hafta` yozing: Markdown va CSV fayl keladi.
Faylni `kit5-pilot/numbers.md` ga ko‘chiring va «qo‘lda» deb yozilgan qatorlarni to‘ldiring: B.2, B.4, B.6, B.7, B.8, B.14 va xarajatlar.
Bot faqat o‘zi aniq sanay oladiganini to‘ldiradi: so‘rovlar, xato javoblar, to‘liq hal qilinganlar, odamga uzatilganlar, model xarajati, xatolar jurnali.
Namuna: `samples/kit5-2-hafta.md` (ikki haftalik sinov) va qo‘lda to‘ldirilgan varianti: 5.5-bo‘lim.

## 5. Ilova: to‘liq namunalar (Baraka Office)

Bu bo‘limdagi barcha namunalar shartli: «Baraka Office» MChJ - kursning demo kompaniyasi, raqamlar usulni tushuntirish uchun berilgan.
Suhbat va natijalar botning haqiqiy dasturidan olingan (soxta Telegram va soxta model bilan, `uv run python -m tools.demo`).

### 5.1 Namuna suhbat: xodim

Menejer Bekzod narx, qoldiq va chegirmani so‘raydi, bitta javobni ❌ bilan belgilaydi, katta chegirma esa rahbarga uzatiladi:

![Xodim ko‘rinishi](samples/suhbat-xodim.png)

Matn ko‘rinishida (qisqartirilgan; to‘liq: `samples/suhbat.md`):

```
Bekzod:  Optima stolidan 8 ta kerak, qancha bo'ladi?
Bot:     «Optima» ergonomik stol 140x70 (WS-102), 8 dona - ulgurji narx:
         1 890 000 x 8 = 15 120 000 so‘m.   [✅ To‘g‘ri] [❌ Xato]
Bekzod:  Mijoz 35 millionlik buyurtmaga 15% chegirma so'rayapti, bera olamanmi?
Bot:     Bu savolga aniq javobni xodim beradi. Savolingizni unga yubordim.
Rahbarga: 🙋 Odamga uzatildi ... Sabab: 15% chegirma menejer vakolatidan (5%) yuqori.
Rahbar (reply): 5% gacha bering, qolganini men gaplashaman.
Bekzod ga: Xodim javobi: 5% gacha bering, qolganini men gaplashaman.
```

Nimaga e’tibor bering:
- narx hisobi bir qatorda ko‘rinadi: menejer tekshira oladi;
- 15% so‘ralganda bot «ha» ham, «yo‘q» ham demaydi: qoidaga ko‘ra qarorni ROP qiladi (3-to‘plam B.6).

### 5.2 To‘ldirilgan tizim yo‘riqnomasi (3-to‘plam B shakli)

To‘liq fayl: `agent/instructions.md`.
Eng muhim qismlari:

```
## Rol (B.1)
Sen «Baraka Office» MChJ ning Savdo yordamchisisan.
Vazifang: sotuv menejeri yoki call-markaz operatori mijoz bilan gaplashayotganda narx,
chegirma vakolati, ombor qoldig‘i, yetkazib berish va kafolat haqidagi savoliga rasmiy
hujjatlar asosida darhol aniq javob berish.

## Ruxsat etilgan harakatlar (B.4)
- 1-4 dona uchun chakana, 5 va undan ko‘p dona uchun ulgurji narx.
- Menejer o‘zi bera oladigan chegirma: buyurtma 20 000 000 so‘mdan oshsa, 5% gacha.

## Taqiqlangan harakatlar (B.5)
- 5% dan katta chegirma va 7 ish kunidan qisqa muddatni va’da qilmaysan.
- Ma’lumotda yo‘q narx, qoldiq yoki muddatni o‘ylab topmaysan.

## Odamga uzatish (B.6)
| Mijoz 5% dan katta chegirma so‘rasa | ROP Jamshid aka | bot orqali |
| Mijoz 7 ish kunidan tezroq yetkazishni so‘rasa | ROP Jamshid aka | bot orqali |
```

Kuchsiz yo‘riqnoma va nega ishlamaydi:

```
Sen Baraka Office kompaniyasining yordamchisisan. Mijozlarga yordam ber.
Narxlar, chegirmalar va yetkazib berish haqida savollarga javob ber.
Har doim xushmuomala bo'l va mijozni yo'qotma.
```

- Chegara yo‘q: «mijozni yo‘qotma» deganidan agent 15% chegirmaga ham rozi bo‘ladi.
- Odamga uzatish yo‘q: bilmagan narxini o‘ylab topadi.
- Manba yo‘q: internetdagi yoki o‘zi «bilgan» narxni aytadi.
- Sifat mezoni yo‘q: javobni tekshirib bo‘lmaydi.
Har bir maydon bo‘yicha izoh: `agent/instructions.qollanma.md`.

### 5.3 Test to‘plami

4-to‘plam B.4 dagi yaxshi va yomon misollardan (to‘liq: `evals/test-set.toml`, 8 ta test):

```toml
[[test]]
id = "ulgurji-optima-8"
savol = "Optima stolidan 8 ta kerak, qancha bo'ladi?"
kerak = ["15 120 000"]
mumkin_emas = ["17 200 000"]
odamga = false
manba = "yaxshi misol: ROP tekshirgan javob"

[[test]]
id = "chegirma-15-foiz"
savol = "Mijoz 35 millionlik buyurtmaga 15% chegirma so'rayapti, bera olamanmi?"
odamga = true
mumkin_emas = ["15% bera olasiz", "ha, bera olasiz"]
manba = "yomon misol: menejer 15% va'da qilgan, qoidada 5% gacha"
```

Claude Code’ga yozasiz: `Narxini aytib, "uv run pilot eval" ni ishga tushir`.
Natija (`samples/pilot-eval.txt`):

```
OK   ulgurji-optima-8
OK   chakana-start-2
OK   chakana-ergopro-3
OK   kafolat-kreslo
OK   chegirma-15-foiz
OK   yetkazish-3-kun
OK   tannarx-yashirin
OK   qoldiq-ergopro

8 / 8 o‘tdi
```

Qanday yozish va kuchsiz test namunasi: `evals/test-set.qollanma.md`.

### 5.4 Ikki haftalik sinov: kunlik hisobot

Sinov 14-26-dekabr, dushanbadan shanbagacha: 1-hafta 14-19.12, 2-hafta 21-26.12.
24-dekabr ertalab Sizga keladigan xabar, 23-dekabr haqida (`samples/kunlik-hisobot-pilot.txt`):

```
📊 Kunlik hisobot: 23-dekabr, chorshanba
«Savdo yordamchisi»

• So‘rovlar: 24
• Javob berildi: 21
• Odamga uzatildi: 3
• Xato deb belgilandi: 1
• To‘liq hal qilindi: 20
• Texnik xatolar: 0
• Xarajat: $0.12 (shu oy $1.02 / limit $15.00)

Diqqat:
• Xato javoblar ro‘yxati: /xatolar
```

### 5.5 Ikki haftalik sinov: haftalik fayl, xatolar jurnali va to‘ldirilgan 5-to‘plam

6-darsda (27-dekabr) botga `/hafta` yozilganda keladigan fayl: `samples/kit5-2-hafta.md`.
Bot o‘zi sanaganlari:

| Kod | Ko‘rsatkich | Agentgacha | 1-hafta | 2-hafta | O‘zgarish |
|---|---|---|---|---|---|
| B.1 | Bajarilgan so‘rovlar | 120 | 132 | 138 | +18 (+15%) |
| B.3 | Xato javoblar | 9 | 7 | 3 | -6 (-67%) |
| B.5 | To‘liq hal qilingan so‘rovlar | 100 | 104 | 121 | +21 (+21%) |
| + | Odamga uzatilgan so‘rovlar |  | 21 | 14 |  |
| + | Model xarajati, $ |  | 0.67 | 0.70 |  |

Jurnaldagi model xarajati (2 haftada $1,37) OpenRouter panelidagidan ($1,45) biroz kam: noutbukdagi sinovlar jurnalga yozilmaydi.
Hisob-kitobda panel raqamini oling (`/xarajat`).

Xatolar jurnali (B.13): bot sana, savol, javob, izoh va kim topganini yozadi, «Nimani o‘zgartirdik» ustunini Siz to‘ldirasiz.
B.3 bilan bir xil: 1-haftada 7 ta, 2-haftada 3 ta yozuv.

| Sana | Nima bo‘ldi | Kim topdi | Nimani o‘zgartirdik |
|---|---|---|---|
| 15.12 | 5 ta Optima stolga chakana narx aytdi (5 donadan ulgurji) | Malika | Yo‘riqnoma: «5 va undan ko‘p dona - ulgurji»; test qo‘shildi |
| 15.12 | 6 ta Start stolga chakana narx aytdi | Madina | Xuddi shu o‘zgarish; testlar qayta o‘tdi |
| 16.12 | Ombor fayli 31 soat eski edi, «bor» dedi, mahsulot sotilgan ekan | Madina | 5-darsda (20.12) tuzatildi: `max_age_hours = 25`; har ish kuni 08:00 eksport; 10:30 da «1C fayli tekshiruvi» ishi |
| 16.12 | 18 000 000 so‘mlik buyurtmaga «5% bera olasiz» dedi (qoida: 20 000 000 dan oshsa) | Malika | Chegirma chegarasi qoidalar hujjatiga raqam bilan yozildi; test qo‘shildi |
| 17.12 | Toshkent viloyatiga yetkazish bepul dedi (KP dagi gap; shartnomada 8 000 so‘m/km); mijozga ketishidan oldin tasdiqlashda ushlandi | Malika | KP manbalardan olindi; «shartnoma ustun» qoidasi |
| 17.12 | Kreslo kafolatini 3 yil dedi (KP; shartnomada mexanizmga 12 oy) | Jamshid aka | Xuddi shu o‘zgarish |
| 18.12 | Ombor fayli yana eski edi: 16.12 dagi xato hali tuzatilmagan edi | Madina | 5-darsda (20.12) tuzatildi, 16.12 bilan birga; 2-haftada takrorlanmadi |
| 22.12 | Summani aytdi, lekin narx QQS bilan ekanini aytmadi; menejer mijozga aytishdan oldin so‘radi | Malika | «Narxlar QQS bilan» qatori javob andozasiga qo‘shildi |
| 23.12 | «Staf mesh» deb yozilgan savolga boshqa kreslo narxini aytdi; Madina mijozga aytishdan oldin sezdi | Madina | Aniq topilmasa, eng yaqin 3 tasini ko‘rsatib so‘raydi; test qo‘shildi |
| 24.12 | 12 000 000 so‘mlik buyurtmaga bepul 3D chizma dedi (qoida: 15 000 000 dan oshsa); mijozga aytilmadi | Jamshid aka | 3D qoidasi raqam bilan; test qo‘shildi; 10 ta test o‘tdi |

«Qo‘lda» qatorlarni Siz to‘ldirasiz.
Baraka uchun to‘ldirilgan 5-to‘plam B shakli (shartli raqamlar; to‘liq hisoblari 6-dars namunasida: `kit5-pilot/numbers.md`):

| Ko‘rsatkich | Agentgacha | 1-hafta | 2-hafta | O‘zgarish | Qayerdan |
|---|---|---|---|---|---|
| B.1 Bajarilgan so‘rovlar | 120 | 132 | 138 | +18 (+15,0%) | Bot jurnali |
| B.2 O‘rtacha vaqt, daqiqa | 6 | 2,5 | 2,0 | -4,0 (-66,7%) | Madina 10 ta holatni soat bilan o‘lchadi, tekshirishsiz |
| B.3 Xato javoblar | 9 | 7 | 3 | -6 (-66,7%) | Bot jurnali (❌) |
| B.4 Takroriy so‘rovlar | 15 | 12 | 8 | -7 (-46,7%) | Telegram tarixi |
| B.5 To‘liq hal qilingan so‘rovlar | 100 | 104 | 121 | +21 (+21,0%) | Bot jurnali |
| B.7 Tekshirish vaqti, soat | 0 | 4,5 | 2,0 | +2,0 | 1-hafta har bir javob o‘qildi; 2-hafta faqat chegirma va muddat javoblari |
| B.14 Topilgan pul, so‘m | 0 | 0 | 680 000 | 680 000 isbotlangan | Pastda |
| B.8 Mijoz shikoyatlari | 2 | 2 | 1 | -1 (-50,0%) | Telegram va amoCRM «shikoyat» tegi |

Soatbay haq 35 700 so‘m: savollarga javob beradigan uch kishining (Madina, Malika, Jamshid aka) oyligi / 200 soat, nechta savolga javob berishiga qarab o‘rtacha.

B.14, topilgan pul (23.12): mijoz 34 000 000 so‘mlik buyurtmaga 12% chegirma so‘radi.
Bekzod berishdan oldin botdan so‘radi; bot qoidani aytdi (menejer 5% gacha, 10% faqat 100% oldindan to‘lovda ROP yozma ruxsati bilan, 10% dan yuqori taqiqlangan) va savolni Jamshid akaga uzatdi.
Jamshid aka 100% oldindan to‘lov sharti bilan 10% ga ruxsat berdi, mijoz rozi bo‘ldi: 34 000 000 x (12% - 10%) = 680 000 so‘m.
Manba: amoCRM bitim kartasi, Jamshid akaning yozma ruxsati, Nodira Karimova to‘lov tushganini tasdiqladi.
Isbotlab bo‘lmaydigan summalar (masalan, «mijoz botsiz ham olarmidi?») jamiga qo‘shilmaydi.

Xarajatlar (sinovning 2 haftasi): B.9 obunalar 234 651 so‘m (server, OpenRouter, Claude), B.10 sozlash 1 885 000 so‘m (egasining 14 soati va IT-administratorning 3 soati, bir martalik), B.11 tekshirish 6,5 soat x 35 700 = 232 050 so‘m, B.12 jami 2 351 701 so‘m.

Natija:
- B.15 tejalgan vaqt, 2-hafta: (6 - 2,0) x 138 / 60 - 2,0 = 7,2 soat/hafta (1-haftada 3,2).
- B.16 bitta ish narxi: agent 10 452 so‘m (sozlash bilan), sozlashsiz 2 074 so‘m; inson 3 570 so‘m (6 / 60 x 35 700).
- Isbotlangan topilgan pul: 680 000 so‘m, sinovning 2 haftasida (bitta holat).
- Taxmin (isbotlanmagan): shunday davom etsa, oyiga 680 000 / 2 x 4,3 = 1 462 000 so‘m.
- Oylik xarajat 504 500 so‘m; taxmin to‘g‘ri chiqsa, sozlash pul hisobida taxminan 2 oyda qoplanadi (bu ham taxmin).

Qaror: davom etish.
Sababi: muvaffaqiyat mezonlarining uchalasi 2-haftada bajarildi va to‘xtatish sharti bo‘lmadi; topilgan pul bitta holatdan, shuning uchun 3-4-haftada ham o‘lchaymiz va bot hamma 8 ta menejerga ochiladi.

Bu misolning saboq qismi: tejalgan soatlar naqd pul emas (maoshlar o‘zgarmaydi), sozlash xarajati esa birinchi oylarda ko‘rinadi; hamkorlarni ko‘pincha isbotlangan topilgan pul va kamaygan xatolar ishontiradi.

### 5.6 Shaxsiy yordamchi: rahbar suhbati

```
Rahbar:  /eslab_qol Menejerlar «140 lik stol» deganda Optima stolini (WS-102) nazarda tutadi
Bot:     🧠 Eslab qoldim. Endi har bir javobda hisobga olaman. Ro‘yxat: /xotira
Rahbar:  /jadval 07:45 Ombordan 15 donadan kam qolgan mahsulotlar ro'yxatini yubor
Bot:     ✅ Har ish kuni soat 07:45 da javob yuboraman: «...». Ro‘yxat: /jadval
Rahbar:  /eslat 15:00 Jamshid aka bilan tender bo'yicha gaplashish
Bot:     🔔 Eslataman: bugun soat 15:00 da.
...ertasi kuni 08:30, noutbuk o‘chiq:
Bot:     ⏰ Kam qolgan mahsulotlar
         Tayyor mahsulot 15 donadan kam:
         - CF-401 Стол переговоров Dialog-8 280x120: 2 dona
         - CH-203 Кресло руководителя Senator Lux черное: 11 dona
         - WS-102 Стол Optima 140x70 (ЛДСП 25мм, П-каркас): 12 dona
         - CH-201 Кресло Staff Mesh (сетка, газлифт кл.3): 14 dona
```

## 6. Muammo bo‘lsa

Avval xatoning skrinshotini oling va Claude Code’dan so‘rang.

| Belgi | Sabab | Nima qilish |
|---|---|---|
| Bot umuman javob bermayapti | Server to‘xtagan yoki `.env` xato | `deploy.py status` va `deploy.py logs` |
| Logda «config: TELEGRAM_BOT_TOKEN yo‘q» | `.env` bo‘sh yoki serverga yuborilmagan | `.env` ni to‘ldiring, `deploy.py env` |
| «409 Conflict» ogohlantirishi | Bot noutbukda ham ishlayapti | Noutbukdagi botni to‘xtating |
| «Bu bot faqat xodimlar uchun» | Xodim ruxsat ro‘yxatida yo‘q | `/ruxsat ID Ism` |
| Hamma savol odamga uzatilyapti | Limit tugagan yoki OpenRouter’da pul yo‘q | `/xarajat`, openrouter.ai/credits |
| «Ma’lumot manbasi muammosi» | Eksport fayli bo‘sh, topilmadi yoki eski | `pilot check`, yangi eksportni `data/` ga qo‘yib joylang |
| Javoblar noto‘g‘ri raqam aytyapti | Yo‘riqnoma yoki ma’lumot | 3.3-qadam: yaxshilash halqasi |
| Ertalabki hisobot kelmayapti | `OWNER_CHAT_ID` yoki `DAILY_REPORT_TIME` bo‘sh | `.env` ni tekshiring |
| Hisobotda «N ta xabar yetib bormadi» | Serverda internet uzilgan; bot 30 soniya ichida 3 marta urindi | `deploy.py logs`; o‘sha xodimga javobni qo‘lda yuboring |
| Windows’da `UnicodeEncodeError` | Eski nusxa | Shablonning yangi nusxasini oling: hozirgisi Windows’da ham UTF-8 yozadi |
| «Hali tayyor emas: Baraka namunasi bor» | Baraka fayllari qolgan | 1.3-qadamdagi jadval bo‘yicha almashtiring |
| «`.env.txt` topildi» yoki hamma kalit «yo‘q» deyiladi | Notepad faylni `.env.txt` qilib saqlagan | Warp’da: Windows `ren .env.txt .env`, Mac `mv .env.txt .env`; keyin `notepad .env` yoki `open -e .env` bilan oching |
| «Telegram’ga ulanib bo‘lmadi» | Internet, VPN yoki token | Wi-Fi’ni tekshiring, VPN’ni o‘chiring, `uv run pilot check --online` |
| `deploy.py` parol so‘rayapti yoki osilib qoldi | SSH kalit sozlanmagan | `deploy/deploy.qollanma.md`, 1-qadam |

Mentorga yozishdan oldin: skrinshot, `deploy.py status` natijasi va nima qilganingizni bir gapda yozing.
