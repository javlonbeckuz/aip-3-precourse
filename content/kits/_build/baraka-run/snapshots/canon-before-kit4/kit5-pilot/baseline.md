# Boshlang‘ich holat (Agentgacha): narx, qoldiq, chegirma va muddat savollariga javob

Praktikum 3.0 · Sinov va hisob-kitob · Fayl: `kit5-pilot/baseline.md`

<!--
Namuna haqida: 2-dars uy vazifasining yaxshi namunasi, «Baraka Office», shartli misol.
Raqamlar BARAKA-CANON va pilot-template/kit5-baseline.toml bilan bir xil (B.1 120, B.2 6, B.3 9, B.4 15, B.5 100, B.7 0, B.8 2), shunda 3-6-darslardagi hisoblar shu boshlang‘ich holatdan boshlanadi.
Bu Day 2 ning o‘z fayli: make_baraka.py uni kits nusxasi bilan almashtirmaydi; 6-dars numbers.md shu faylga tayanadi.
Qanday tuzilgan: egasi /kit5 baseline ni ishga tushirdi, Telegram va AmoCRM eksportlarini kompaniya papkasiga qo‘ydi, Claude Code sanadi, egasi har bir raqamni tekshirdi.
-->

2-darsdan keyin to‘ldiriladi.
Bu raqamlar B shaklidagi (numbers.md) «Agentgacha» ustuniga o‘tadi.
Odamni emas, ishni o‘lchaymiz: kim sekin ishlagani emas, jarayon haftasiga qancha ish va vaqt olishi yoziladi.
Tarix bo‘lsa (Telegram eksporti, Excel, CRM), oxirgi 2-4 haftani undan oling; tarixi yo‘q narsani 5 ish kuni jonli yozing.
Daqiqani o‘lchash kerak bo‘lsa, loyiha yetakchisi ish vaqtida har bir turdan 3 ta holatni o‘lchaydi.

- Jarayon (To‘plam 2, B.1): narx, qoldiq, chegirma va muddat savollariga javob, savdo bo‘limi
- Davr: 2026-11-02 - 2026-11-28 (4 hafta, tarix); 2026-11-30 - 2026-12-04 (5 ish kuni, jonli o‘lchov)
- Kim o‘lchadi: Rustamov S.A. (Claude Code bilan), Jamshid Karimov tekshirdi 2026-12-02
- Ish haftasi: haftasiga 6 ish kuni

## Raqamlar

| Ko‘rsatkich | Haftasiga | Hisob | Manba | Usul: tarix / jonli / namuna | Ishonch |
|---|---|---|---|---|---|
| B.1 Bajarilgan so‘rovlar | 120 | 482 / 4 hafta = 120,5 → 120 | Telegram: «Baraka savdo» guruhi va @baraka_office_uz chatlari | tarix | yuqori |
| B.2 O‘rtacha vaqt, daqiqa | 6 | 18 holat: (5 + 7 + 6 + 4 + 8 + 6 + 5 + 6 + 7 + 6 + 5 + 7 + 6 + 6 + 5 + 7 + 6 + 6) / 18 = 108 / 18 = 6,0 | Malika (loyiha yetakchisi), Zarina va Jamshid aka, har biri 6 tadan | jonli (namuna) | o‘rta |
| B.3 Xato javoblar | 9 | 36 / 4 hafta = 9 | Telegram guruhida Jamshid aka tuzatgan javoblar («7 ish kuni», «10% dan oshmaydi») | tarix | o‘rta: tuzatilmagan xatolar sanalmagan |
| B.4 Takroriy so‘rovlar | 15 | 60 / 4 hafta = 15 | bir mijoz 24 soat ichida yana so‘ragan (Telegram) | tarix | yuqori |
| B.5 To‘liq hal qilingan so‘rovlar | 100 | 400 / 4 hafta = 100 | javobdan keyin mijoz qayta so‘ramagan yoki KP so‘ragan | tarix | o‘rta |
| B.6 Yakunlangan bitimlar yoki buyurtmalar | [?] | - | AmoCRM: savol bilan bitimni bog‘lab bo‘lmadi | - | - |
| B.8 Mijoz shikoyatlari | 2 | 8 / 4 hafta = 2 | AmoCRM, «shikoyat» tegi, muddat yoki narx bo‘yicha | tarix | yuqori |

B.7 (tekshirish soati) va B.14 (topilgan pul) agentgacha 0 bo‘ladi.
B.2 - bitta so‘rovga odam sarflagan daqiqa.

Intervyu bilan solishtirish: To‘plam 2 da intervyulardan bu jarayonga haftasiga 17,3 soat chiqqan edi.
Tarix va o‘lchov: 120 × 6 / 60 = 12,0 soat.
Farq 5,3 soat: bitta savol Zarinadan Malikaga, keyin Jamshid akaga o‘tadi va intervyularda 2-3 marta sanaladi; ba’zi savollar Telegram’dan tashqarida (telefonda) bo‘lgan.
Sinov natijasi 12,0 soat bilan solishtiriladi, chunki u o‘lchangan.

## Manbalar

| Fayl yoki tizim | Davr | Nima sanaldi | Qanday sanaldi |
|---|---|---|---|
| `manbalar/telegram-savdo-guruh/result.json` (Telegram Desktop, «Export chat history», JSON) | 2026-11-02 - 2026-11-28 | narx, qoldiq, chegirma, muddat so‘zlari bor savollar; Jamshid aka tuzatgan javoblar | Claude Code kalit so‘zlar bilan ajratdi, egasi 20 ta tasodifiy xabarni qo‘lda tekshirdi: 19 tasi to‘g‘ri |
| `manbalar/telegram-baraka-office/result.json` | 2026-11-02 - 2026-11-28 | mijoz savollari va 24 soat ichida qayta so‘rash | xuddi shu usul |
| `manbalar/amocrm-eksport-2026-11.csv` | 2026-11-02 - 2026-11-28 | «shikoyat» tegi bor bitimlar | teg bo‘yicha filtr |

## Jonli yozuv (tarixi yo‘q ko‘rsatkichlar uchun)

| Sana | B.1 | B.2 namunalar, daqiqa | B.3 | B.4 | Izoh |
|---|---|---|---|---|---|
| 2026-11-30 | - | 5, 7, 6, 4 | - | - | Zarina: 2 ta, Malika: 2 ta |
| 2026-12-01 | - | 8, 6, 5, 6 | - | - | 8 daqiqa: qoldiq ombordan kutildi |
| 2026-12-02 | - | 7, 6, 5, 7 | - | - | Jamshid aka: 2 ta |
| 2026-12-03 | - | 6, 6, 5, 7 | - | - | |
| 2026-12-04 | - | 6, 6 | - | - | jami 18 ta namuna |

## Nega shunday yozildi

- Bu kursning yagona Baraka boshlang‘ich holati: 2-dars namunasi va 6-darsdagi `numbers.md` aynan shu faylga tayanadi.
- Har bir raqamda hisob, manba, usul va ishonch bor: B.1 = 482 / 4 = 120,5 → 120 Telegram eksportidan, B.2 = 108 / 18 = 6,0 jonli o‘lchovdan.
- Tarix 4 hafta (qoidadagi 2-4 haftaning yuqori chegarasi): bitta g‘alati hafta o‘rtachani buzmaydi.
- B.2 ning 18 holati daqiqasi bilan yozilgan va uch kishi o‘lchagan (Malika, Zarina, Jamshid aka): o‘rtachani istalgan odam qayta hisoblay oladi.
- Claude Code sanagan raqamni egasi tekshirgan: 20 ta tasodifiy xabardan 19 tasi to‘g‘ri ajratilgan.
  Kalit so‘z bilan sanash xato qilishi mumkin, shuning uchun tekshiruv yozilgan.
- B.7 = 0: agentgacha tekshiradigan agent javobi yo‘q; keyin B.15 da sinovdagi tekshirish soati to‘liq ayiriladi.
- B.6 o‘lchanmagani yashirilmagan ([?]) va sababi yozilgan; natijada ishlatilmaydi.
- B.3 ning cheklovi ochiq: faqat Jamshid aka tuzatgan xatolar sanalgan.
- Intervyu bilan solishtiruv bor: To‘plam 2 dagi 17,3 soat va o‘lchangan 12,0 soat farqi tushuntirilgan (bitta savol intervyularda 2-3 marta sanalgan).
  Sinov natijasi o‘lchangan 12,0 soat bilan solishtiriladi.
