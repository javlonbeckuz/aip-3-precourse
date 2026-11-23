# PRD: «Savdo yordamchisi» - savdo bo‘limi uchun ichki yordamchi (narx, qoldiq, chegirma, muddat)

<!--
Namuna haqida: 2-dars, 7-mashq.
Reja rejimi natijasidan (Opus 5.5, 2026-11-03 sinovi, xom natija: day-2/_build/sandbox/out/d/) egasi uchun 2 sahifaga qisqartirildi.
Shartli misol: raqamlar To‘plam 1 va 2 dan, haqiqiy o‘lchov uy vazifasida (kit5-pilot/baseline.md).
-->

Versiya 0.1 · 2026-11-29 · holat: qoralama · tasdiqlaydi: Jamshid Karimov (ROP), keyin Rustamov S.A.
Manbalar: `CLAUDE.md`, `hujjatlar/`, `kit2-scoring/`.

## 1. Muammo

- Narx, qoldiq, chegirma va muddat savollari: Jamshid akaga kuniga 25 ta, Malikaga kuniga 12 ta, Zarina esa kuniga 15 marta menejer yoki Jamshid akadan so‘raydi (`kit2-scoring/form-a-scoring.md`).
- Intervyular bo‘yicha bunga haftasiga 17,3 soat ketadi (6,25 + 3,6 + 1,2 + 3,2 + 3,0); bitta savol bir necha kishidan o‘tgani uchun bu raqam o‘lchovdan katta (`kit5-pilot/baseline.md`: 12,0 soat).
- Javob uchun xodim prays-list PDF’ni varaqlaydi, qoldiqni Otabek akadan so‘raydi (20-30 daqiqa kutadi), chegirmani Jamshid akadan so‘raydi.
- Noto‘g‘ri va’dalar bor: «3 kunda yetkazamiz» (shartnomada 7 ish kuni), «12-15% chegirma» (ruxsat etilgani ko‘pi bilan 10%).
- Bu raqamlar xodimlarning o‘z bahosi: tarixdan o‘lchov uy vazifasida qilinadi.

## 2. Nima quriladi

Xodim mijoz savolini yozadi, yordamchi esa javob qoralamasini va ichki izohni qaytaradi: qaysi hujjatdan, qanday hisoblangan.
Xodim tekshiradi va mijozga o‘zi yuboradi.
Asosiy qaror: raqamlarni (narx, chegirma chegarasi, muddat, km bo‘yicha narx) til modeli emas, oddiy kalkulyator hisoblaydi.
AI faqat savolni tushunadi, kerakli hisobni chaqiradi va matnni qoralaydi.

## 3. Kim uchun

| Kim | Hozir | Yordamchi bilan |
|---|---|---|
| Call-markaz operatorlari (Zarina, Sevara) | Narx, qoldiq va muddatni menejer yoki Jamshid akadan so‘raydi, javobni 5-10 daqiqa kutadi | Tayyor qoralama va qoldiq, eksport vaqti bilan |
| Sotuv menejerlari (Malika va yana 7 kishi) | Prays-listni varaqlaydi, ROP va logistikaga yozadi | Narx, chegirma chegarasi, muddat bir joyda |
| ROP (Jamshid aka) | Kuniga 25 ta savolga javob beradi | Savollar kamayadi; haftada bir tanlab ko‘rib chiqadi |

## 4. Nima kiradi (1-versiya)

1. Narx: kod yoki nom va dona soni bo‘yicha chakana yoki ulgurji narx, jami va formula.
2. Chegirma: so‘ralgan foizni kim bera oladi - sotuvchi (5% gacha), ROP yozma ruxsati bilan (10% gacha) yoki taqiqlangan.
   Yordamchi chegirma bermaydi, faqat qoidani aytadi.
3. Yetkazish muddati: to‘lov tushgandan 7 ish kuni, MDF va shpon 12 ish kuni.
4. Yetkazish narxi: viloyatga har km uchun 8 000 so‘m.
5. Kafolat: korpus 24 oy, kreslo mexanizmi 12 oy.
6. Qoldiq: 1C eksportidan, eksport vaqti bilan.
7. Javob topilmasa: kim javob beradi va uning Telegrami (`CLAUDE.md`, «Kim nimaga javob beradi»).
8. Taqiqlangan gaplar filtri: «3 kun», «36 oy», «narxi lichkada».
9. Jurnal: har savol va javob, To‘plam 5 raqamlari uchun.

## 5. Nima kirmaydi

- Mijozga o‘zi yozish: har javobni xodim yuboradi.
- Chegirmaga ruxsat berish, tijoriy taklif (KP) tuzish.
- KP tayyorlash: u 2-jarayon, kursdan keyin; AmoCRM bilan ulash ham keyin.
- To‘lov tushganini tekshirish (Didox, buxgalteriya).

## 6. Ma’lumot manbalari

| Manba | Nima beradi | Holati |
|---|---|---|
| `hujjatlar/01_Prays_list...` | narx, chegirma, to‘lov, 3D | rasmiy, 2026-12-31 gacha amal qiladi |
| `hujjatlar/03_Namunaviy_Shartnoma...` | muddat, yetkazish narxi, kafolat | rasmiy |
| 1C ombor qoldig‘i eksporti | qoldiq | kim va necha marta eksport qiladi: [?] |
| `CLAUDE.md` | kim nimaga javob beradi, mijozga yozish qoidalari | ichki |

Manba emas: `hujjatlar/02_Kompaniya_Taqdimoti_KP.md` («36 oy kafolat», «viloyatga bepul» - xato), intervyudagi og‘zaki va’dalar.
Ular faqat sinov uchun tuzoq savol bo‘ladi.

## 7. Muvaffaqiyat qanday o‘lchanadi

| Ko‘rsatkich | Hozir | Maqsad | Qayerdan |
|---|---|---|---|
| Bo‘lim vaqti, haftasiga | 12,0 soat (o‘lchov: 120 × 6 / 60) | [?] ROP bilan | `kit5-pilot/baseline.md`, `numbers.md` |
| Bitta javob vaqti | 4-6 daqiqa | [?] | jurnal |
| Noto‘g‘ri va’dalar («3 kun», 10% dan ortiq) | bor, soni [?] | 0 | sinov to‘plami va ROP tanlovi |
| ROPga keladigan savollar | haftasiga 150 (25 × 6, intervyu) | [?] | ROP hisobi |

## 8. Xavflar

1. 3 kun / 7 ish kuni va 12-15% / 10% ziddiyati yozma hal qilinmagan: sinovdan oldin Rustamov S.A. qarori kerak.
2. 1C qoldig‘i kunda bir marta yangilansa, kun ichida sotilgan mebel «bor» bo‘lib ko‘rinadi: javobda eksport vaqti ko‘rsatiladi.
3. Sotuvchilar odat bilan Jamshid akaga yozishda davom etadi: ROP savolga yordamchi javobi bilan qaytaradi.
4. Prays-list 2026-12-31 da tugaydi, sinov dekabrga tushadi: muddat o‘tsa, yordamchi ogohlantiradi.
5. Xodim qoralamani tekshirmay yuboradi: manba va formula har javobda ko‘rinadi.

## 9. Ochiq savollar

| # | Savol | Kimdan |
|---|---|---|
| 1 | 1C qoldig‘ini kim, kuniga necha marta, qaysi formatda eksport qiladi? | Otabek aka, Sardorbek |
| 2 | 3 kun / 7 ish kuni va 12-15% / 10% bo‘yicha yozma qaror | Rustamov S.A. |
| 3 | Ulgurji «5+ dona» bitta mahsulot bo‘yicha mi, butun buyurtma bo‘yicha mi? | Jamshid aka |
| 4 | Yordamchi qayerda ishlaydi: ichki Telegram bot yoki veb-sahifa? Kim kira oladi? | Rustamov S.A., Sardorbek |
| 5 | Muvaffaqiyat maqsad raqamlari | Jamshid aka |
| 6 | O‘rtacha soatbay haq 35 700 so‘m qaysi xodimlar bo‘yicha hisoblangan | Nodira opa |
