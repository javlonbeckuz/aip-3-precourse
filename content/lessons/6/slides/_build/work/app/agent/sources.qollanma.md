# Ma’lumot manbalarini ulash (`sources.toml` va `data/`): qo‘llanma

Agent faqat Siz bergan ma’lumotdan javob beradi (3-to‘plam B.3).
`agent/sources.toml` - manbalar ro‘yxati, `data/` - eksport fayllari va hujjatlar.
API bo‘lmasa yoki 1C o‘rnatuvchisi kalit bermasa, eksport fayli yetarli.

## Qaysi manba qanday ulanadi

| Manba | Qanday | `type` |
|---|---|---|
| Excel (`.xlsx`) | Faylni `data/` ga qo‘ying | `file` |
| CSV, jumladan 1C eksporti | Faylni `data/` ga qo‘ying; Windows-1251, «;» ajratgich va sarlavha ustidagi qatorlar avtomatik tushuniladi | `file` |
| Qoidalar, FAQ, narx siyosati | `.md` yoki `.txt` matn fayli | `file` |
| Google Sheet | Havola; jadval «Anyone with the link: Viewer» qilib ulashilgan bo‘lsin | `google_sheet` |
| «Excel» deb saqlangan `.xls` (Bitrix24, bank va to‘lov kabinetlari, eski 1C), 1C hisobotidagi «Итого» qatorlari | Faylni `data/` ga qo‘ying; ichida aslida nima borligini o‘zi aniqlaydi | `excel` |
| Haqiqiy eski Excel 97-2003 (`.xls`) | Excel’da oching va `.xlsx` qilib saqlang | `file` |
| Telegram yoki Instagram chat eksporti (JSON) | Faylni `data/` ga qo‘ying; ismlar yashiriladi, telefonlar qisqartiriladi | `telegram_json`, `instagram_json` |
| Bank ko‘chirmasi «1C formatida» (matn) | Faylni `data/` ga qo‘ying | `bank_1c` |
| amoCRM, Bitrix24, MoySklad, Poster, 1C OData | Kalit `.env` da; bot faqat o‘qiydi | `amocrm`, `bitrix24`, `moysklad`, `poster`, `odata_1c` |
| Maxfiy havoladagi CSV yoki JSON (Apps Script, 1C HTTP xizmati) | Havola `.env` da | `url` |
| Boshqa tizimning API’si | Claude Code yangi manba turini qo‘shadi (`pilot/sources.py` boshidagi namuna) | yangi tur |

`file` va `google_sheet` dan boshqa turlar `pilot/adapters/` papkasida (kursning integratsiyalar to‘plamidan olingan).
Har bir tizimdan ma’lumotni qanday chiqarish va `sources.toml` ga qanday yozish - kurs materiallaridagi `integrations/<tizim>/qollanma.md` da; qaysi manbani tanlash - `integrations/tanlash.md`.

## Qanday to‘ldiriladi

1. Tizimingizdan eksport qiling. 1C: hisobotni oching - «Сохранить как» - «Лист Excel 2007-... (*.xlsx)».
   1C ning «Сохранить как» oynasida CSV yo‘q; CSV faylni faqat 1C o‘rnatuvchisi qo‘shgan maxsus ishlov (obrabotka) beradi (namunadagi `ombor-1c.csv` shunday).
2. Faylni `data/` papkasiga qo‘ying, nomini lotin harflarida qisqa qiling: `ombor-1c.csv`.
3. Claude Code’ga yozing:

   ```text
   data/ga ombor-1c.csv qo'ydim. agent/sources.toml ga shu manbani qo'sh.
   Ustunlarni ko'rsat va qaysilari ichki ma'lumot (tannarx, telefon, maosh) ekanini so'ra:
   ularni modelga ko'rsatmaslik uchun columns ro'yxatini yoz.
   Keyin "uv run pilot check" ni ishga tushir.
   ```

4. `pilot check` natijasida manba nomi, qatorlar soni va ustunlar chiqadi.

## To‘ldirilgan namuna: Baraka Office

`agent/sources.toml` dagi uchta manba:

```toml
[[source]]
name = "Prays-list 2026"
type = "file"
path = "data/narxlar.csv"

[[source]]
name = "Chegirma, to‘lov, yetkazib berish va kafolat qoidalari"
type = "file"
path = "data/qoidalar.md"

[[source]]
name = "Ombor qoldig‘i (1C eksport)"
type = "file"
path = "data/ombor-1c.csv"
columns = ["Код", "Номенклатура", "Количество", "Последнее движение"]
```

Nega shunday:
- Prays-list - CSV eksport: narxlar o‘zgarsa, faqat faylni almashtirasiz, yo‘riqnoma o‘zgarmaydi.
- Qoidalar - oddiy matn: chegirma, to‘lov, yetkazish, kafolat shartnomadagi raqamlar bilan bir joyda.
- 1C eksporti haqiqiy 1C fayli kabi: ruscha ustunlar, Windows-1251, tepada «Ведомость по товарам на складах» sarlavhasi.
  Raqamlar kursdagi Baraka moliya ma’lumotlaridan (1C qoldiq vedomosti, 01.11.2026): tayyor mahsulot ombori, 11 qator.
  Unda «Себестоимость ед.» (tannarx) va «Сумма» ustunlari ham bor: `columns` ularni modelga ko‘rsatmaydi.
  Menejer tannarxni so‘rasa, agent bilmaydi va odamga uzatadi (bu `evals/test-set.toml` da test qilingan).

`pilot check` natijasi: `samples/pilot-check.txt`.

## Narx tekshiruvi

Prays-list uchun `sources.toml` ga tekshiruv blokini qo‘shing (Baraka namunasida bor):

```toml
[source.check]
price_columns = ["Chakana narx (1-4 dona)", "Ulgurji narx (5+ dona)"]
retail = "Chakana narx (1-4 dona)"
wholesale = "Ulgurji narx (5+ dona)"
wholesale_min_share = 0.7
min = 100000
max = 200000000
```

`uv run pilot check` har bir qatorni tekshiradi: narx bo‘sh, nol, raqam emas, `min`-`max` oralig‘idan tashqarida, ulgurji chakanadan katta yoki chakananing 70% idan kam bo‘lsa (ortiqcha yoki yetishmagan nol), xato beradi.
Bunday qator modelga berilmaydi, egaga ogohlantirish keladi, `deploy.py` esa joylashni to‘xtatadi.
Ishonchli ko‘ringan xatoni (1 890 000 o‘rniga 1 980 000) faqat aniq narx so‘raydigan testlar ushlaydi: `uv run pilot eval`.

## Google Sheet

```toml
[[source]]
name = "Lidlar"
type = "google_sheet"
url = "https://docs.google.com/spreadsheets/d/JADVAL_ID/edit#gid=0"
refresh_minutes = 10
```

Jadvalni ulashing: Share - General access - «Anyone with the link» - Viewer.
Diqqat: havolasi bor har qanday odam jadvalni o‘qiy oladi.
Narx, qoldiq kabi ma’lumotlar uchun mos; mijozlarning shaxsiy ma’lumotlari uchun mos emas.
Bunday jadval uchun Claude Code’dan «service account» bilan yopiq ulanishni so‘rang.
Bot jadvalni har 10 daqiqada qayta o‘qiydi.

## Katta jadval

Jadval katta bo‘lsa (`DATA_MAX_CHARS`, standart 12 000 belgi), bot modelga hamma qatorni emas, savolga eng yaqin qatorlarni yuboradi.
Bu narxni past ushlab turadi: o‘zbekcha matn ko‘proq token oladi.
Agent kerakli qatorni ko‘rmayotgan bo‘lsa, `columns` bilan keraksiz ustunlarni olib tashlang.

## Yangi eksportni serverga yuborish

Bot serverda ishlayotganda yangi eksportni ikki yo‘l bilan yetkazasiz, kodni qayta joylamasdan:
- Telegram’da faylni botga yuboring (faqat Siz va loyiha yetakchisi); fayl nomi `data/` dagi nom bilan bir xil bo‘lsin, masalan `ombor-1c.csv`.
- Yoki faylni noutbukdagi `data/` ga qo‘yib, Claude Code’ga yozing: `deploy.py data ni ishga tushir`.

Ikkala yo‘lda ham fayl avval tekshiriladi (bo‘sh fayl, narx xatosi); xatoli fayl rad etiladi va eski ma’lumot ishlashda davom etadi.
Yangi fayl serverdagi `runtime/data/` ga tushadi; keyin `deploy.py` bilan yangiroq `data/` joylansa, yangirog‘i ishlatiladi.

## Eksport eskirsa yoki bo‘sh kelsa

Fayl bo‘sh, topilmasa yoki ustunlari o‘zgarsa:
- egaga «⚠️ Ma’lumot manbasi muammosi» xabari keladi (kuniga ko‘pi bilan ikki marta);
- modelga «DIQQAT: ...» yoziladi va u raqam o‘ylab topmasdan savolni odamga uzatadi.

Fayl har kuni yangilanishi kerak bo‘lsa, `sources.toml` da `max_age_hours` qo‘ying: eksport har kuni 08:00 da bo‘lsa, `max_age_hours = 25`.
Baraka sinovda eski fayl ikki marta xato bergandan keyin (16 va 18.12) buni 5-darsda (20.12) qo‘shadi: Otabek aka 1C eksportini har ish kuni 08:00 da qiladi, 10:30 da «1C fayli tekshiruvi» ishi unga eslatadi; 2-haftadan ishlaydi.
Yoshi har bir savolda tekshiriladi; ma’lumot blokidagi «yangilangan» vaqti - faylning o‘zi yozilgan vaqt, bot uni o‘qigan vaqt emas.

## Ko‘p uchraydigan xatolar

| Xato | Belgi | To‘g‘risi |
|---|---|---|
| Fayl nomi `Остатки (1).CSV`, bo‘sh joy va kirill harflari bilan | `fayl topilmadi` | `ombor-1c.csv` |
| `columns` da ustun nomi xato yozilgan | `ustun topilmadi: ... Bor ustunlar: ...` | Ro‘yxatdagi aniq nomni ko‘chiring |
| Excel’da birlashtirilgan katakchalar, bir nechta jadval bitta varaqda | Ustunlar aralashib ketadi | Bitta oddiy jadval: birinchi qator - sarlavhalar |
| Tannarx yoki maosh ustuni yashirilmagan | Agent ichki ma’lumotni aytib yuboradi | `columns` ga faqat kerakli ustunlar |
| Google Sheet ulashilmagan | `Google Sheet o‘qilmadi ... Anyone with the link` | Ulashish sozlamasi |

Bajarildi, agar: `pilot check` har bir manbani ✅ bilan ko‘rsatadi va ichki ustunlar ro‘yxatda yo‘q.
