# 4-mashq: Jadvalga ish qo‘shish (ertalabki hisobot va rejali ish)

5-dars, 1:57-2:15.
Natija: telefoningizga birinchi rejali xabar keldi (tekshiruv 5.7).
Biznesdagi foydaning ko‘pi chatdan emas, jadvaldan keladi: ma’lumot o‘zi Sizga keladi, Siz so‘rab yurmaysiz.

## Atamalar, bir gapda

- **Rejali ish (cron)** - belgilangan vaqtda o‘zi bajariladigan ish: «har ish kuni 9:00 da».
- **Proaktiv agent** - so‘ramasangiz ham, jadval yoki hodisa bo‘yicha o‘zi yozadigan agent.
- **Ertalabki hisobot (brifing)** - kechagi raqamlar va g‘ayrioddiy holatlar, har kuni bir xil vaqtda.

## Botingizda allaqachon nima bor

| Ish | Qachon | Kimga | Qayerda sozlanadi |
|---|---|---|---|
| Kunlik hisobot: kechagi so‘rovlar, xatolar, xarajat, «Diqqat» | `DAILY_REPORT_TIME` (masalan 09:00) | Sizga | `.env` |
| Haftalik To‘plam 5 fayli | `WEEKLY_REPORT_DAY` (1 = dushanba) | Sizga | `.env` |
| Ma’lumot muammosi haqida ogohlantirish (fayl bo‘sh yoki eski) | Darhol, 12 soatda ko‘pi bilan bir marta | Sizga | `agent/sources.toml` (`max_age_hours`) |

Bugun bularga **o‘z biznes ishingizni** qo‘shasiz: agent ma’lumotlaringizdan belgilangan vaqtda javob tayyorlaydi.

## Ikki yo‘l

| | A. Telefondan: `/jadval` | B. Claude Code bilan: `agent/schedule.toml` |
|---|---|---|
| Kim qo‘shadi | Siz, telefondan, 10 soniyada | Siz va Claude Code, noutbukda |
| Kimga boradi | Faqat Sizga | Istalgan odamga (`send_to`): xodimga faqat ish vaqtida |
| Qaysi kunlar | Ish kunlari (`WORK_DAYS`) | Istalgan kunlar (`days = "1-6"`) |
| Serverga joylash | Shart emas | Kerak (`deploy.py`) |
| Qachon tanlang | O‘zingiz uchun shaxsiy hisobot | Xodimga eslatma, eskalatsiya, aniq kunlar |

### A. Telefondan

Botga yozing:

```text
/jadval 09:05 Eng uzoq harakatsiz turgan 3 ta mahsulot
```

- `/jadval` - hamma rejali ishlar ro‘yxati.
- `/jadval_ochir 1` - 1-ishni o‘chirish.
- `/eslat 17:00 Otabek aka bilan 1C eksporti haqida gaplashish` - bir martalik eslatma.

Savolni qisqa yozing: uning birinchi 40 belgisi ishning nomi bo‘ladi.

### B. `agent/schedule.toml` orqali

Claude Code’ga yozing:

```text
app/agent/schedule.qollanma.md ni o'qi.
Har ish kuni [vaqt] da [kimga] [nima kerak] ni yuboradigan ish qo'sh.
Qaysi manbadan (agent/sources.toml) olishini ayt; manba bo'lmasa, avval menga ayt.
Javobda xodim ismlari va har bir xodim bo'yicha raqamlar bo'lmasin.
Keyin narxini aytib, "uv run pilot job <nom>" bilan bir marta sinab ko'r (yubormasdan),
natija to'g'ri bo'lsa, testlarni ishga tushir va serverga joyla.
```

Ish boshqa odamga boradigan bo‘lsa (`send_to`), o‘sha odam botni bir marta ochib `/start` bosgan bo‘lishi kerak: Telegram boti o‘zi birinchi bo‘lib odamga yoza olmaydi.

### Serverdagi oddiy cron (bilib qo‘ying)

Ba’zi bo‘lim skillari (masalan moliya `/owner-weekly`, marketing `/mkt-report`) hisobotni skript bilan tayyorlaydi.
Ularni serverning o‘z jadvali - cron - ishga tushiradi.
Cron qatori beshta maydon: daqiqa, soat, oy kuni, oy, hafta kuni.
`30 8 * * 1` - har dushanba 08:30.
Claude Code bu qatorni o‘zi yozadi; Siz faqat vaqt va kimga borishini aytasiz.

## Bo‘limlar uchun foydali rejali ishlar

Faqat Sizning ma’lumotingizdan javob beradigan ish foydali.
Kompaniyangizdan hech narsa bo‘lmagan ertalabki xabar - bu ob-havo ilovasi.

| Bo‘lim | Ish | Vaqt | Kimga | Kurs materiali |
|---|---|---|---|---|
| Savdo | Har sotuvchiga o‘z kuzatuv ro‘yxati (KP dan keyin qo‘ng‘iroq qilinmaganlar) | Ish kunlari 09:00 | Har kim o‘ziga | `department-labs/sales/opportunity-map.md`, 3-qator |
| Marketing | Haftalik hisobot: xarajat, lidlar, manbasi noma’lum lidlar | Dushanba 08:30 | Egasiga | `department-labs/marketing/exercises/06-weekly-report.md` |
| Moliya | Bir sahifa: pul, debitorka, ombor, marja va bu hafta qilinadigan ishlar | Dushanba 09:00 | Egasiga | `department-labs/finance-ops/exercises/08-owner-weekly.md` |
| Moliya | Soliq kalendari eslatmasi (faqat eslatma, summa hisoblamaydi) | Oyning 10, 15, 20-sanalari | Bosh buxgalterga | `department-labs/finance-ops/opportunity-map.md`, 13-qator |
| Ombor | Kam qolgan mahsulotlar | Ish kunlari 08:30 | Egasiga, ombor boshlig‘iga | `app/agent/schedule.toml` (namuna) |
| Ombor | 1C fayli kelmadi: eslatma | Ish kunlari 10:30 | Eksport qiladigan odamga | Pastdagi Baraka namunasi |
| HR | Shu hafta tugaydigan hujjat muddatlari (masalan, shartnomani 5 ish kunida ro‘yxatdan o‘tkazish) | Dushanba 09:00 | Faqat HR rahbariga | `department-labs/hr/opportunity-map.md`, A4 |

Xodimlar haqidagi ma’lumot bilan ishlaganda: xodimning yozma roziligi bo‘lmasa, uning ma’lumotini uchinchi tomonga bermang (Mehnat kodeksi 178-modda, https://lex.uz/mact/6257288).
Har qanday shaxsiy ma’lumot bilan ishlashdan oldin yurist bilan tekshiring.

## Baraka Office namunasi

Shartli misol, natijalar botni soxta Telegram bilan ishlatib olingan (`namuna/baraka-2-hafta/rahbar-telegrami.txt`).

Baraka sanalari yakshanba guruhiniki (5-dars 20-dekabr); shanba guruhida hammasi bir kun oldin (19-dekabr).

**1. Telefondan, rahbar uchun** (yakshanba 20-dekabr, 12:40):

```text
/jadval 09:05 Eng uzoq harakatsiz turgan 3 ta mahsulot
✅ Har ish kuni soat 09:05 da javob yuboraman: «Eng uzoq harakatsiz turgan 3 ta mahsulot». Ro‘yxat: /jadval
```

Dushanba 21-dekabr, 09:05 da kelgani:

```text
⏰ Eng uzoq harakatsiz turgan 3 ta mahsulot

Eng uzoq harakatsiz turgan mahsulotlar (1C):
- CH-203-BR Кресло руководителя Senator Lux коричневое: 26 dona, oxirgi harakat 18.04.2026
- WS-104 Стол подъемный AeroLift 150x75 (2 мотора): 21 dona, oxirgi harakat 20.10.2026
- SH-501 Шкаф для документов 80x40x200: 58 dona, oxirgi harakat 27.10.2026
```

**Nega aynan shu ish:** jigarrang Senator Lux kreslolari 8 oydan beri omborda turibdi.
Bu - muzlab qolgan pul.
Rahbar har kuni buni ko‘rib, aksiya yoki sotuvchilarga topshiriq beradi.
Tannarx agentga ko‘rsatilmaydi (`sources.toml` dagi `columns`), summasini buxgalterdan so‘raydi.

**2. Claude Code bilan, ombor uchun: «10:30 gacha 1C fayli kelmasa, Otabek akaga eslatma»**

Bu 1-mashqdagi 16-dekabr xatosiga (eski 1C fayli) javob.
`agent/schedule.toml` ga qo‘shilgani (`namuna/yaxshilash/agent-v2/schedule.toml`):

```toml
[[job]]
name = "1C fayli tekshiruvi"
time = "10:30"
days = "1-6"
send_to = 7100032   # Otabek aka (namunadagi shartli ID)
prompt = """
1C fayli bugun yangilanganini tekshir: ombor qoldig'i jadvalida DIQQAT yozuvi bormi?
DIQQAT bo'lsa yoki jadval bo'sh bo'lsa, ODAMGA qatori bilan sababini yoz.
Hammasi joyida bo'lsa, faylning yangilangan vaqtini va qatorlar sonini bir qatorda yoz.
"""
```

Yuborishdan oldin sinov (`namuna/yaxshilash/job-1c-tekshiruvi.txt`, yakshanba, fayl shanbadan beri eski):

```text
$ uv run pilot job "1C fayli tekshiruvi"

ODAMGA: Ombor qoldig‘i (1C eksport): fayl 28 soatdan beri yangilanmagan (chegara 25 soat). Otabek aka 1C dan bugungi qoldiqni eksport qilsin.
```

2-haftada nima bo‘ldi:

| Kun | 10:30 da Otabek akaga kelgani |
|---|---|
| Dushanba 21.12 | «1C ombor fayli joyida: ogohlantirish yo‘q, 11 qator.» |
| Seshanba 22.12 | «1C fayli tekshiruvi: bu safar javob tayyorlab bo‘lmadi (... fayl 26 soatdan beri yangilanmagan (chegara 25 soat) ...)» - Otabek aka 10:50 da eksport qildi |
| Chorshanba-shanba | «joyida» |

Seshanba kuni 10:15 da bitta qoldiq savoli odamga uzatildi, eski fayldan javob berilmadi.
Rejali ish har safar bitta xabar yuboradi, promptga «hammasi joyida bo‘lsa, hech narsa yozma» deb yozsangiz ham.
Shuning uchun Otabek aka bilan kelishildi: «joyida» xabari - kunlik tasdiq.

**3. Ertalabki hisobot** (o‘rnatilgan, `DAILY_REPORT_TIME=09:00`), seshanba 22-dekabr:

```text
📊 Kunlik hisobot: 21-dekabr, dushanba
«Savdo yordamchisi»

• So‘rovlar: 22
• Javob berildi: 19
• Odamga uzatildi: 3
• Xato deb belgilandi: 0
• To‘liq hal qilindi: 19
```

## Yomon namuna

> /jadval 07:00 Dunyo va O‘zbekiston yangiliklari, ob-havo va kunning maslahati
>
> schedule.toml: har kuni 08:00 da har bir menejerga «kecha kim nechta savol berdi va kim eng sekin javob berdi» jadvali, butun savdo guruhiga.

**Nimasi yomon:**

- Birinchisida kompaniyangizdan hech narsa yo‘q: bu ish Gemini ilovasida ham bor, pilotga hech narsa qo‘shmaydi.
  Bot faqat ulangan ma’lumotdan javob beradi; internetdan yangilik qidirmaydi.
- Ikkinchisi odamni o‘lchaydi, ishni emas: xodimlarga «bot sizni kuzatmaydi» deb va’da berilgan (To‘plam 4 suhbati).
  Bot hisobotlarga ism va har bir xodim bo‘yicha raqam qo‘shmaydi; buni so‘rash va’dani buzadi.
- Ikkinchisi soat 08:00 da, ish vaqtidan oldin: xodimlarga bot xabarlari faqat ish vaqtida boradi.

**To‘g‘rilangan:**

> /jadval 09:05 Eng uzoq harakatsiz turgan 3 ta mahsulot
>
> schedule.toml: ish kunlari 10:30 da, faqat Otabek akaga: «1C fayli kelmagan bo‘lsa, eslatma».

## Tez-tez uchraydigan xatolar

- **Xabar kelmadi.**
  `/jadval` da ish bormi?
  Vaqt allaqachon o‘tgan bo‘lsa, ish ertaga boshlanadi.
  `WORK_DAYS=1-6` bo‘lsa: yakshanba guruhida xodimga ish dushanba keladi, shanba guruhida darhol (ish vaqtida); ikkala holda ham sinfda `pilot job "<nom>"` bilan sinang.
- **Xodimga kelmadi.**
  U botda `/start` bosmagan, yoki hozir ish vaqtidan tashqari: xabar ish vaqtigacha kutadi.
- **Javob «bajarilmadi» deydi.**
  Bu ko‘pincha yaxshi belgi: ma’lumot eski yoki bo‘sh, agent taxmin qilmadi.
  `/holat` bilan qaysi fayl muammoli ekanini ko‘ring.
- **Har bir rejali ish pul turadi.**
  Bitta ish taxminan $0.003-0.005, kuniga bitta ish oyiga 15-20 sent.
  Xarajat kunlik hisobotda ko‘rinadi.

## Tayyor, agar

- [ ] Kamida bitta o‘z biznes ishingiz qo‘shilgan (telefondan yoki `schedule.toml` da).
- [ ] U Sizning ma’lumotingizdan javob beradi, ismlar va har bir xodim bo‘yicha raqamlarsiz.
- [ ] Bir marta sinalgan: `pilot job "<nom>"` yoki birinchi rejali xabar telefoningizga keldi.
- [ ] Kunlik hisobot vaqti (`DAILY_REPORT_TIME`) qo‘yilgan.
- [ ] Mentor telefoningizdagi xabarni ko‘rdi (tekshiruv 5.7).
