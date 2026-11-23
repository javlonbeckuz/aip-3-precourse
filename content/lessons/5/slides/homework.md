# 4-dars uy vazifasi: avval odamlar, keyin assistent

Muddat: 5-darsgacha (19-dekabr, shanba yoki 20-dekabr, yakshanba).
Jami vaqt: taxminan 3-4 soat, hafta davomida; sinovning o‘zi har kuni 10-15 daqiqa.
Mentoringiz chorshanba kuni (16-dekabr) stol chatida so‘raydi: «Suhbatlar bo‘ldimi, assistent yoqildimi, jurnalda nechta yozuv?»

Nega bu muhim: 6-darsda (26 yoki 27-dekabr) sinov natijasini raqam bilan ko‘rsatasiz.
Buning uchun kamida 2 to‘liq hafta kerak: ishga tushirish dushanbadan (14-dekabr) kechikmasin.
Kursning kafolat sharti uchun har bir uy vazifasi dalili bilan hisobga olinadi.

## Tartib - eng muhim qoida

**Avval har bir xodim bilan suhbat, keyin assistent xodimlar uchun yoqiladi.**
**Hech qachon aksincha emas.**
Xodim botni Sizdan emas, tasodifan bilib qolsa, «meni almashtirishyapti» deb o‘ylaydi va haqiqiy ishini yashiradi: sinov raqamlari yolg‘on chiqadi.

## Ro‘yxat

| № | Vazifa | Qachon | Vaqt | Natija |
|---|---|---|---|---|
| 1 | Yozma majburiyatni yangilash, rejani bo‘lim boshlig‘i bilan kelishish | Dushanba, 14-dekabr, ertalab | 30 daqiqa | `kit1-interviews/team-message.md` (4 va 5-band), `kit5-pilot/plan.md` (boshliq rozi) |
| 2 | Har bir xodim bilan 15 daqiqalik suhbat | Dushanba ertalab, bot yoqilishidan oldin | 15 daqiqa × xodimlar | `kit4-people/<ism>-form-b.md` da B.8 va B.9 |
| 3 | Ishga tushirish: xodimlar botga, birinchi hafta tasdiqlash bilan | Dushanba, suhbatlardan keyin | 20 daqiqa | Xodimlar botdan foydalanmoqda, `REPLY_MODE=approve` |
| 4 | Har bir xatoni jurnalga yozish | Har kuni | kuniga 5-10 daqiqa | `kit5-pilot/numbers.md`, B.13 |
| 5 | 1-hafta ustuni | Hafta oxiri, 5-darsdan oldin, haftalik ko‘rib chiqishda | 30 daqiqa | `numbers.md` 1-hafta ustuni |
| + | Darsda ulgurmaganlar: GitHub (1-mashq), deploy (server yo‘q bo‘lsa: bugun sotib olish va 48 soat ichida mentor bilan qo‘ng‘iroq), domen (3-mashq, ixtiyoriy) | 48 soat ichida | - | - |

## 1. Majburiyat va reja (dushanba ertalab, 30 daqiqa)

1-darsda imzolagan yozma majburiyatingizning 4 va 5-bandlarini aniq qiling (5-mashq, 3-qadam): loyiha yetakchisi ismi, `/stop` buyrug‘i, tejalgan vaqt nimaga ketishi.
Imzolang va suhbat qiladigan har bir xodimga bittadan nusxa tayyorlang.

Bo‘lim boshlig‘i bilan `kit5-pilot/plan.md` ni 15 daqiqa o‘qing.
U o‘zgartirgan joyni Claude Code’da tuzating:

```text
/kit5 reja
```

Sarlavhadagi «Bo‘lim boshlig‘i» qatoriga uning ismi va sanani yozing.
Boshliq rozi bo‘lmasa, ishga tushirmang: mentoringizga yozing.

## 2. Suhbatlar (dushanba ertalab, har biri 15 daqiqa)

Har bir xodim bilan yolg‘iz, ish vaqtida, `kit4-people/<ism>-form-b.md` oxiridagi reja bo‘yicha.
Darsdagi mashqdagi 7 qadam: nega gaplashyapmiz, nima o‘zgaradi, nima o‘zgarmaydi (maosh, lavozim, majburiyat), endi nimani tekshiradi, qanday to‘xtatiladi, xavotirlari, kelishuv.

Suhbatdan keyin darhol Claude Code’ga (xodim ismi bilan):

```text
/kit4 suhbat madina
```

Skill B.8 (xodimning savollari va xavotirlari, uning so‘zlari bilan) va B.9 (nima deb kelishdik) ni Siz bilan to‘ldiradi.
Xodim rozi bo‘lmasa yoki qatnashishni istamasa: jazosiz qabul qiling, sababini so‘rang va yozing (FAQ X-06).

## 3. Ishga tushirish (dushanba, suhbatlardan keyin, 20 daqiqa)

**3.1.** Har bir xodim o‘z telefonidan botga `/start` yozadi.
Bot unga ID raqamini aytadi («Sizning Telegram ID raqamingiz: ...»).
Telegram qoidasi: bot faqat o‘ziga avval yozgan odamga xabar yubora oladi.

**3.2.** Raqamlarni `app/.env` ga o‘zingiz yozing (Claude emas): Warp’da `app` papkasida Mac’da `open -e .env`, Windows’da `notepad .env`.
Baraka namunasi (raqamlar shartli):

```
ALLOWED_USER_IDS=111111111,222222222,333333333,555555555
ADMIN_USER_IDS=222222222,444444444
REVIEWER_CHAT_ID=222222222
ESCALATION_CHAT_ID=444444444
REPLY_MODE=approve
PILOT_START_DATE=2026-12-14
```

| Qator | Nima | Rejadagi joyi |
|---|---|---|
| `ALLOWED_USER_IDS` | Botga yoza oladigan xodimlar (vergul bilan, bo‘sh joysiz) | A.4 |
| `ADMIN_USER_IDS` | `/stop`, `/davom`, `/hisobot` qila oladiganlar; Siz doim adminsiz | A.7 |
| `REVIEWER_CHAT_ID` | Birinchi hafta har bir javobni tasdiqlovchi (bo‘sh bo‘lsa - Siz) | A.5, A.8 |
| `ESCALATION_CHAT_ID` | Qiyin holatlar kimga boradi (bo‘sh bo‘lsa - Siz) | To‘plam 3 B.6 |
| `REPLY_MODE=approve` | Birinchi hafta: bot qoralama yozadi, odam tasdiqlaydi | A.5 |
| `PILOT_START_DATE` | Sinov boshlangan kun: haftalik raqamlar shundan sanaladi | A.3 |

**3.3.** Claude Code’ga:

```text
"uv run python deploy/deploy.py env" ni ishga tushir. .env faylini ochma. Natijani bir gapda ayt.
```

Kutilgan natija (`exercises/namuna/natijalar/12a-env-approve.txt`):

```text
Bot restarted.
.env is on the server (/opt/pilot/.env, readable only by the bot).
Reminder: one bot token can run in one place only. Stop the bot on your laptop (Ctrl+C).
```

**3.4.** Sinab ko‘ring: xodim bitta savol yozadi.
Xodim «Savolingiz qabul qilindi. Javobni xodim tekshirib, tez orada yuboradi.» degan javob oladi.
Tasdiqlovchiga «📝 Javob loyihasi» keladi, u «✅ Yuborish» ni bosadi va javob xodimga boradi.
Sinovimizdagi to‘liq yozishma: `exercises/namuna/natijalar/12-xodim-va-tasdiqlash.txt`.

Tez yo‘l: bitta xodimni `.env` siz, telefoningizdan ham qo‘shish mumkin: botga `/ruxsat 111111111 Madina`.
Ish vaqtidan tashqari (`WORK_HOURS`, odatda 09:00-18:00) bot xodimlarga xabar yubormaydi: qoralamalar ertalab keladi; Sizga esa istalgan vaqtda.

## 4. Xatolar jurnali (har kuni)

Xodim noto‘g‘ri javobni ko‘rsa, ❌ ni bosadi va bir gap yozadi.
Tasdiqlovchi rad etgan yoki tuzatgan javob ham xato hisoblanadi.
Har kuni kechqurun (yoki loyiha yetakchisi 17:30 da) botga yozing:

```text
/xatolar
```

Har bir xatoni jurnalga Claude Code bilan yozing:

```text
/kit5 xato
```

Har yozuvda 4 narsa: sana, nima bo‘ldi, kim topdi (ayblovsiz), nimani o‘zgartirdik.
«Nimani o‘zgartirdik» 5-darsda to‘ldiriladi, hozircha bo‘sh qolishi mumkin.
Jurnal bo‘sh qolsa, mentor so‘raydi: «Hech kim hech narsa topmadimi yoki hech kim tekshirmadimi?»

A.7 dagi to‘xtatish sharti bajarilsa: darhol `/stop`, o‘sha kuni sababini ko‘rib chiqing, mentoringizga yozing.
To‘xtatish - muvaffaqiyatsizlik emas, rejaning ishlayotgani.

## 5. 1-hafta ustuni (hafta oxiri, 5-darsdan oldin)

Haftalik ko‘rib chiqishda (A.9) botga yozing:

```text
/hafta
```

Bot haftalik faylni yuboradi: B.1, B.3, B.5 va model xarajatini o‘zi sanaydi; qolganlari «qo‘lda».
Keyin Claude Code’ga:

```text
/kit5 hafta 1
```

Skill fayldagi raqamlarni `numbers.md` ga ko‘chiradi va qolganlarini so‘raydi: B.2 (bitta savolga daqiqa, tekshirishsiz), B.7 (shu hafta tekshirishga jami necha soat ketdi, butun vazifa uchun bitta raqam), B.14 (topilgan pul, faqat isbotlangani).

## Yaxshi namuna: «Baraka Office»

Sanalar yakshanba guruhi bo‘yicha; shanba guruhida darslar bir kun oldin, sinov haftalari bir xil.


- Dushanba 08:30: Jamshid aka rejani o‘qidi, A.6 ga «B.8 shikoyat 2 tadan oshmasin» qatorini qo‘shdi va imzoladi.
- 09:30-10:45: Madina, Zarina, Bekzod, Otabek aka va Malika bilan suhbatlar; Madinaning uchta xavotiri B.8 da uning so‘zlari bilan (`exercises/namuna/kompaniya/kit4-people/madina-form-b.md`).
- 11:00: Malika Madina, Zarina va Bekzod bilan 30 daqiqa mashq qildi (6 misol).
- 14:00: `.env` yangilandi, `deploy.py env`, Madinaning birinchi savoli Malikaga qoralama bo‘lib keldi va 2 daqiqada yuborildi.
- Hafta davomida (14-19-dekabr): 132 savol, 7 ta xato (masalan, 5+ donaga chakana narx, eski 1C fayli, kafolat muddati); har biri B.13 da kim topgani bilan.
- Shanba: 1-hafta ustuni to‘ldirildi: B.2 2,5 daqiqa (6 edi), B.7 4,5 soat (tasdiqlash haftasi, kutilgan), B.3 7 ta; A.7 bajarilmagan, 7 xatoning har biri yo‘riqnomaga tuzatish bo‘lib kirdi va testlar o‘tdi, shuning uchun 2-hafta qisman to‘g‘ridan-to‘g‘ri: narx va qoldiq javoblari xodimga darhol, chegirma va yetkazish sanasi javoblari oldingidek Malika tasdig‘idan keyin; A.6 2-hafta oxirida baholanadi.

Raqamlar shartli: usulni ko‘rsatish uchun.

## Zaif namuna

- Egasi dushanba kuni ertalab assistentni xodimlar uchun yoqdi va «hamma botdan foydalansin» deb guruhga yozdi.
  Suhbatlar «vaqt bo‘lmadi», payshanbaga qoldi.
- `REPLY_MODE=direct` qoldi: birinchi kundan javoblar tekshiruvsiz.
- Jurnal bo‘sh: «xato bo‘lmadi».

**Nima xato:** tartib buzilgan (FAQ X-05): xodimlar botni rahbardan emas, guruhdan bilib olishdi; birinchi hafta cheklangan ruxsat yo‘q; bo‘sh jurnal - ko‘pincha hech kim tekshirmaganining belgisi.

**Endi nima qilish kerak:** shu hafta har bir xodim bilan suhbatni o‘tkazing (kech bo‘lsa ham), `REPLY_MODE=approve` ga o‘ting, 5-darsga qadar kamida 4 ish kuni jurnal yuriting.
Mentoringizga ochiq yozing: bu birinchi marta emas, X-05 ning yechimi bor.

---

## Mentor tekshiruvi: 5-dars boshida (0:00-0:30)

Kodlar `mentor-handbook/day-5.md` bilan bir xil.
V - uy vazifasi: kafolat sharti uchun hisoblanadi, jadvalga dalili bilan yoziladi.

| Kod | Tekshiruv | Ekranda nimani ko‘rasiz | Yaxshi | Zaif |
|---|---|---|---|---|
| **5.1** V | To‘plam 5 A kelishilgan; To‘plam 4 suhbatlari agent yoqilishidan oldin bo‘lgan | `plan.md` da boshliq ismi va sana; har `<ism>-form-b.md` da B.8, B.9; suhbat sanasi ishga tushirish sanasidan oldin | Suhbat 14.12 09:30, ishga tushirish 14.12 14:00 | Suhbat ishga tushirishdan keyin yoki umuman yo‘q |
| **5.2** V | Sinov kamida 4 ish kuni jonli; xatolar jurnalida yozuv bor | B.13: sana, nima bo‘ldi, kim topdi; botda `/hisobot` | 6 kun, 4 yozuv | 1 kun, jurnal bo‘sh |
| **5.3** V | To‘plam 5 B 1-hafta ustuni to‘ldirilgan | `numbers.md`, har raqam birligi bilan | B.2 daqiqada, B.7 soatda | «30» - birliksiz (FAQ R-02) |
| **5.4** | Assistent serverda, noutbukda emas | Noutbuk yopiq, telefondan savol, javob keladi | Javob 10 soniyada | Faqat noutbuk ochiq bo‘lsa |
| **5.5** | Kod yopiq repoda, kalit commit qilinmagan | GitHub: «Private», `.env` yo‘q | Private, `.env.example` bor | Public yoki `.env` repoda (FAQ D-04) |

5.4 bajarilmagan har bir ishtirokchi: 4-darsdan beri sotuv sahifasidagi va’da bajarilmagan, bugun bosh mentor bilan.
Sinov boshlanmagan bo‘lsa: bugun instruktorga (`mentor-handbook.md`, 9-bo‘lim).

**Chorshanba (16-dekabr), stol chatida:** «Suhbatlar bo‘ldimi, assistent yoqildimi, jurnalda nechta yozuv?»
Javob bermaganlarga payshanba kuni qo‘ng‘iroq.
