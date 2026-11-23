# 2-dars uy vazifasi: jarayonni tasdiqlash va boshlang‘ich raqamlar

Muddat: 3-darsgacha (5-dekabr, shanba yoki 6-dekabr, yakshanba).
Jami vaqt: taxminan 3 soat, bir haftaga bo‘lingan.
Mentoringizga chorshanba kuni yozing: qaysi manbadan raqam olayapsiz va qayerda qotib qoldingiz.

Nega bu muhim: 6-darsda natijani raqam bilan ko‘rsatasiz.
Boshlang‘ich raqam bo‘lmasa, solishtiradigan narsa yo‘q, demak natija ham yo‘q.
Kursning kafolat sharti uchun har bir uy vazifasi dalili bilan hisobga olinadi.

## Ro‘yxat

| № | Vazifa | Vaqt | Natija fayli |
|---|---|---|---|
| 1 | Bo‘lim boshlig‘i bilan To‘plam 2 ballari va B.1-B.3 | 30-45 daqiqa | `kit2-scoring/form-a-scoring.md`, `form-b-matrix.md` |
| 2 | Boshlang‘ich raqamlar: tarixdan, tarixi yo‘qini 5 kun jonli | 1-2 soat va 5 kun | `kit5-pilot/baseline.md` |
| 3 | Telegram bot (BotFather), token maxfiy | 5 daqiqa | bot nomi; token parollar ilovasida |
| 4 | OpenRouter kaliti va limitini tekshirish (0-haftada qilingan) | 5 daqiqa | `praktikum` kaliti limit bilan, balans kamida 5 dollar |
| 5 | Jarayon tegadigan tizimlar va ularning API’si | 20 daqiqa | `kit3-agent/tizimlar.md` |
| + | Darsda ulgurmaganlar: 1-mashq, o‘z skill’ingiz, `prd.md` | - | - |

## 1. Bo‘lim boshlig‘i bilan kelishuv

Nega: siz ma’lumot qanchalik tartibsiz ekanini odatda bilmaysiz, bo‘lim boshlig‘i biladi.
Uning roziligisiz sinov qog‘ozda qoladi.

1. Uchrashuv belgilang: 30-45 daqiqa, ish vaqtida.
2. Unga `kit2-scoring/matrix.html` va `form-a-scoring.md` ni ko‘rsating.
   Har bir ballni birga o‘qing: «Shu to‘g‘rimi?»
3. U o‘zgartirgan ballarni Claude Code’da yozing:

```text
/kit2 qayta
```

   Kurs skill’i o‘rnatilmagan bo‘lsa, `prompt-pack.md` dagi 12-prompt bilan har bir ballni sababi bilan o‘zgartiring.
4. B.1, B.2, B.3 ni birga yakunlang va `form-b-matrix.md` dagi «Bo‘lim boshlig‘i bilan kelishuv» belgilarini qo‘ying.
5. Kim loyiha yetakchisi bo‘ladi (jarayonni har kuni qiladigan, hurmatli xodim)?
   U bilan yolg‘iz 5 daqiqa gaplashing: tayyor matn `kit5-pilot/briefing.md` da.
   Asosiy gap: «sizni emas, ishni hisoblaymiz».

## 2. Boshlang‘ich raqamlar (baseline)

Nega: bular To‘plam 5 dagi «Agentgacha» ustuni.
6-darsda agentli hafta shu raqamlar bilan solishtiriladi.

Qoida: avval tarix, keyin jonli.
Tarix bor joyda (Telegram chat, Excel, CRM) oxirgi 2-4 haftani undan oling.
Tarixi yo‘q ko‘rsatkichni 5 ish kuni jonli yozing.
Odamni emas, ishni o‘lchaymiz.

1. Kerakli eksportlarni oling va `kompaniya/manbalar/` papkasiga qo‘ying:
   - Telegram: Telegram Desktop’da (macOS’da to‘liq versiya, «Telegram Lite» eksport qilmaydi) chatni oching, ⋮, «Export chat history», format JSON.
   - Excel yoki Google Sheets: faylning nusxasi.
   - CRM (AmoCRM, Bitrix): oxirgi 4 hafta bitimlari, CSV yoki Excel.
2. Claude Code’da:

```text
/kit5 baseline
```

   Skill sizdan jarayon, davr va manbalarni so‘raydi, sanaydi va har bir raqamning manbasini yozadi.
   Telegram eksportini sanash uchun alohida prompt: `prompt-pack.md`, 33-prompt.
3. Claude sanagan 20 ta tasodifiy xabarni qo‘lda tekshiring: to‘g‘ri ajratilganmi?
4. Tarixdan chiqmaydigan raqamni (odatda bitta so‘rovga ketadigan daqiqa) 5 ish kuni jonli yozing: har kuni har turdan 3 ta holat.

O‘lchanadigan ko‘rsatkichlar (`kit5-pilot/baseline.md` andozasida):

| Kod | Ko‘rsatkich | Misol |
|---|---|---|
| B.1 | Bajarilgan so‘rovlar, haftasiga | 120 ta savolga javob berildi |
| B.2 | Bitta so‘rovga o‘rtacha vaqt, daqiqa | 6 daqiqa |
| B.3 | Xato javoblar | rahbar tuzatgan 9 ta javob |
| B.4 | Takroriy so‘rovlar | 15 ta mijoz 24 soat ichida yana so‘radi |
| B.5 | To‘liq hal qilingan so‘rovlar | 100 ta |
| B.6 | Yakunlangan bitim yoki buyurtmalar | bog‘lab bo‘lmasa [?] |
| B.8 | Mijoz shikoyatlari | 2 ta |

## 3. Telegram bot

Batafsil qadamlar: 0-hafta qo‘llanmasi, «Telegram bot oching» qadami (14-qadam).
Qisqasi: Telegram’da @BotFather, `/newbot`, nom, username (`_bot` bilan tugaydi, masalan `baraka_savdo_bot`).
BotFather bergan token - bot kaliti.
Uni hech kimga, hech qanday chatga, CLAUDE.md ga yoki skrinshotga qo‘ymang.
Telefon yoki kompyuterdagi parollar ilovasida saqlang; 3-darsda `.env` faylga qo‘yamiz.

## 4. OpenRouter: kalit va limitni tekshiring

Buni 0-haftada qilgansiz: 0-hafta qo‘llanmasi, «AI so‘rovlari limiti: OpenRouter» qadami (10-qadam).
Yangi hisob ochmang va qayta pul to‘ldirmang.
Faqat tekshiring: openrouter.ai/keys sahifasida `praktikum` kaliti va uning limiti bor, «Credits» sahifasida balans kamida 5 dollar.
0-haftada qilmagan bo‘lsangiz, o‘sha qadamni hozir bajaring.
Limit bo‘lsa, xato kod ham hisobingizni bo‘shata olmaydi.
Kalitni ham token kabi saqlang: 3-darsda shu kalit `.env` ga qo‘yiladi.

## 5. Tizimlar va API

Jarayoningiz qaysi tizimlarga tegadi: Excel, Google Sheets, Telegram guruhlari, 1C, Bitrix, AmoCRM, Click, Payme?
Har biri uchun bilib qo‘ying: API bormi, eksport qilish mumkinmi, kimdan ruxsat kerak.
Claude Code’da: `prompt-pack.md`, 34-prompt; natijani `kit3-agent/tizimlar.md` ga yozdiring.
3-darsda agent shu tizimlarga ulanadi.

---

## Yaxshi namuna: «Baraka Office»

Rustamov S.A., 2-darsdan keyingi hafta.
Fayllar (zip ichida): `baraka-office/kompaniya/`.

| № | Nima qildi | Nega yaxshi |
|---|---|---|
| 1 | 2-dekabr, 40 daqiqa, Jamshid Karimov (savdo bo‘limi rahbari) bilan. Jamshid aka 6-jarayon (KP) dagi [?] ni yopdi: «qolgan menejerlar ham haftasiga 4-5 ta KP yozadi». B.1 o‘zgarmadi. Rustamov S.A. yozma qaror berdi: muddat 7 ish kuni, chegirma ko‘pi bilan 10%. Loyiha yetakchisi - Malika Rashidova. | Ballar sababi bilan o‘zgardi; ziddiyat yozma hal qilindi; yetakchi tanlandi. |
| 2 | Telegram eksporti (2 chat, 4 hafta: 02.11-28.11) va AmoCRM eksporti. `/kit5 baseline`: B.1 = 120, B.3 = 9, B.4 = 15, B.5 = 100, B.8 = 2 tarixdan; B.2 = 6 daqiqa 5 kun jonli o‘lchovdan (18 holat, loyiha yetakchisi Malika boshchiligida). 20 ta xabarni qo‘lda tekshirdi: 19 tasi to‘g‘ri ajratilgan. | Har raqamda manba va hisob; tarix birinchi; qo‘lda tekshiruv. To‘liq fayl: `kit5-pilot/baseline.md`. |
| 2a | To‘plam 2 da intervyulardan haftasiga 17,3 soat chiqqan edi, o‘lchov 120 × 6 / 60 = 12,0 soat ko‘rsatdi. Sabab: bitta mijoz savoli Zarinadan Malikaga, keyin Jamshid akaga o‘tadi va intervyularda 2-3 marta sanaladi. Rustamov S.A. 12,0 ni oldi. | O‘lchangan raqam taxmindan ustun, farqning sababi yozilgan. |
| 3 | @baraka_savdo_bot yaratildi; token telefondagi parollar ilovasida, hech qayerga yuborilmadi. | Token maxfiy. |
| 4 | OpenRouter: 0-haftadagi `praktikum` kaliti, limit 10 dollar, balans 10 dollar; yangi kalit ochilmadi. | Bitta kalit, limit bor. |
| 5 | Tizimlar: 1C (ombor qoldig‘i; Excel eksporti, kunda bir marta, Otabek aka), Telegram (bot API bor), AmoCRM (API bor, Sardorbek orqali kalit), prays-list (fayl). | Har tizim uchun API yoki eksport, mas’ul odam. |

## Zaif namuna

| № | Nima qildi | Nima xato | To‘g‘risi |
|---|---|---|---|
| 1 | «Bo‘lim boshlig‘iga matritsani Telegram’da tashladim, "yaxshi" dedi.» | Ballar birga o‘qilmagan, hech narsa o‘zgarmagan, ziddiyat hal qilinmagan. | Uchrashuv, har ballni birga o‘qish, o‘zgarishlar sababi bilan. |
| 2 | «Kuniga taxminan 50 ta savol keladi, har biriga 10 daqiqa.» | Manba yo‘q, hisob yo‘q, bu xotiradan taxmin. 6-darsda bu raqam bilan hech narsani isbotlab bo‘lmaydi. | Telegram eksportidan sanash; daqiqani jonli o‘lchash; har raqam yonida manba. |
| 2a | «Raqamlarni Claude o‘zi topdi.» | Claude sanaganini hech kim tekshirmagan. | 20 ta tasodifiy xabarni qo‘lda tekshirish. |
| 3 | Bot tokeni stol guruh chatiga «tekshirib bering» deb yuborilgan. | Token bilan begona odam botingizni boshqaradi. | Tokenni darhol BotFather’da almashtiring (`/token`), yangisini maxfiy saqlang. |
| 4 | OpenRouter’da ikkinchi hisob ochilgan va yana 10 dollar to‘ldirilgan; limit qo‘yilmagan. | Ikki kalit: 3-darsda qaysi biri `.env` ga borishi noma’lum; limitsiz kalit bir kechada hisobni bo‘shatishi mumkin. | 0-haftadagi `praktikum` kalitidan foydalaning, ortiqchasini o‘chiring, limitni tekshiring. |
| 5 | «API bor-yo‘qligini bilmayman, IT bilan gaplashaman.» | 3-darsda agent ulanadigan joy noma’lum. | 34-prompt bilan qidiring, IT xodimga aniq savol bering: «1C dan qoldiqni qaysi formatda va kuniga necha marta eksport qila olasiz?» |

---

## Mentor tekshiruvi: 3-dars boshida (0:00-0:20)

Mentor uchun.
Kodlar mentor qo‘llanmasidagi 3-dars varag‘i bilan bir xil (`mentor-handbook/day-3.md`).
V - uy vazifasi: kafolat sharti uchun hisoblanadi, jadvalga dalili bilan yoziladi.

| Kod | Tekshiruv | Ekranda nimani ko‘rasiz | Yo‘q bo‘lsa |
|---|---|---|---|
| **3.1** V | To‘plam 2 B.1-B.3 to‘ldirilgan va bo‘lim boshlig‘i bilan kelishilgan | `form-b-matrix.md`: B.1-B.3 va «Bo‘lim boshlig‘i bilan kelishuv» belgilari; so‘rang: «boshliq qaysi ballni o‘zgartirdi?» | Bugun ishtirokchining qoralama B.1 i bilan ishlaymiz; kelishuv shu hafta, mentor juma kuni so‘raydi |
| **3.2** V | Boshlang‘ich raqamlar bor: tarixdan yoki kamida 3 kun jonli | `kit5-pilot/baseline.md`: har raqam yonida manba va usul | Tarix bormi? Bo‘lsa, darsning birinchi amaliy blokida `/kit5 baseline` bilan 15 daqiqa; bo‘lmasa, bugundan jonli yozuv |
| **3.3** V | Tizimlar ro‘yxati, har birining API’si bormi | `kit3-agent/tizimlar.md` yoki qog‘oz | 34-prompt, 5 daqiqa |
| **3.4** V | Bot tokeni va OpenRouter hisobi, xarajat limiti bilan | BotFather’da bot; OpenRouter’da limit sahifasi. Tokenni yoki kalitni ko‘rsatishni so‘ramang | Hozir, 10 daqiqa: 0-hafta qo‘llanmasi, «Telegram bot oching» (14-qadam) va «AI so‘rovlari limiti: OpenRouter» (10-qadam) |
| **3.5** | `CLAUDE.md` kompaniya va tanlangan jarayonni tasvirlaydi | «Hozirgi sinov jarayoni» bo‘limi to‘ldirilgan | 6-mashqdagi prompt, 3 daqiqa |

Yaxshi va zaif farqi bir savolda: «Shu raqam qayerdan?»
Javob fayl yoki tizim nomi bo‘lsa - yaxshi.
«Taxminan», «o‘zim bilaman» bo‘lsa - jadvalga sariq belgi va chorshanba kuni qayta so‘raladi.
