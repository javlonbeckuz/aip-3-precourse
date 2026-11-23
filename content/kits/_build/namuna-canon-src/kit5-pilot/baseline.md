# Boshlang‘ich holat (Agentgacha): narx, qoldiq, chegirma va muddat savoli

Praktikum 3.0 · Sinov va hisob-kitob · Fayl: `kit5-pilot/baseline.md`

2-darsdan keyin to‘ldiriladi.
Bu raqamlar B shaklidagi (numbers.md) «Agentgacha» ustuniga o‘tadi.
Odamni emas, ishni o‘lchaymiz: kim sekin ishlagani emas, jarayon haftasiga qancha ish va vaqt olishi yoziladi.

- Jarayon (To‘plam 2, B.1): 1-jarayon, narx, qoldiq, chegirma va muddat savoli; bot «Savdo yordamchisi»
- Davr: 2026-11-02 - 2026-11-28 (tarix, 4 hafta, dushanba-shanba); jonli yozuv 2026-11-30 - 2026-12-05 (6 ish kuni)
- Kim o‘lchadi: tarix - egasi («Baraka Savdo» Telegram guruhi eksportidan Claude Code bilan sanadi); jonli yozuv - loyiha yetakchisi (Malika)
- Ish haftasi: haftasiga 6 ish kuni (CLAUDE.md)
- Soatbay haq: 35 700 so‘m (CLAUDE.md; hisobi `numbers.md` da)
- Yozilgan sana: 2026-12-05

## Raqamlar

| Ko‘rsatkich | Haftasiga | Hisob | Manba | Usul: tarix / jonli / namuna | Ishonch |
|---|---|---|---|---|---|
| B.1 Bajarilgan so‘rovlar | 120 | 480 savol / 4 hafta = 120 | «Baraka Savdo» Telegram eksporti, 02.11-28.11 | tarix | yuqori (4 hafta) |
| B.2 O‘rtacha vaqt, daqiqa | 6 | 108 daqiqa / 18 holat = 6,0; eng kami 2, eng ko‘pi 15 | Malikaning jonli o‘lchovi, 30.11-05.12 | jonli (namuna) | o‘rta (18 holat, bitta odam o‘lchagan) |
| B.3 Xato javoblar | 9 | 36 / 4 hafta = 9 | Telegram eksporti: keyin guruhda tuzatilgan yoki Jamshid aka bekor qilgan javoblar | tarix | o‘rta (faqat tuzatilgan xato ko‘rinadi) |
| B.4 Takroriy so‘rovlar | 15 | 60 / 4 hafta = 15 | Telegram eksporti: bitta buyurtma haqida 48 soat ichida qayta berilgan savol | tarix | yuqori (4 hafta) |
| B.5 To‘liq hal qilingan so‘rovlar | 100 | 400 / 4 hafta = 100 | Telegram eksporti: javobdan keyin qayta savol bo‘lmagan | tarix | yuqori (4 hafta) |
| B.6 Yakunlangan bitimlar yoki buyurtmalar | - | - | o‘lchanmadi: savolni amoCRM dagi bitim bilan bog‘lab bo‘lmadi | - | - |
| B.7 Tekshirish soati | 0 | agentgacha tekshiradigan agent javobi yo‘q | - | - | aniq |
| B.8 Mijoz shikoyatlari | 2 | 8 / 4 hafta = 2 | Telegram va amoCRM dagi «shikoyat» tegi | tarix | yuqori (4 hafta) |

B.1 - «Baraka Savdo» guruhiga yozilgan narx, qoldiq, chegirma va muddat savollari.
Xodim prays-listdan o‘zi topgan narxlar bu yerga kirmaydi: ular To‘plam 1 B shakllarida alohida turibdi.
B.2 - bitta so‘rovga odam sarflagan daqiqa, tekshirishsiz (tekshirish B.7 da).
B.2 ga javobni kutish ham kiradi, chunki mijoz shu paytda kutib turadi.
B.14 (topilgan pul) agentgacha 0.

### Qo‘shimcha hisoblar (ma’lumot uchun)

- Javob topishga ketadigan vaqt: 120 × 6 / 60 = 12 soat/hafta (tekshirish: 720 daqiqa / 60 = 12).
- Kuniga: 120 / 6 = 20 ta savol; 720 / 6 = 120 daqiqa.
- Shu vaqtning puli: 12 × 35 700 = 428 400 so‘m/hafta.
- Inson qilgan bitta ishning narxi (B.16, inson): 6 / 60 × 35 700 = 3 570 so‘m (tekshirish: 0,1 × 35 700 = 3 570).
- To‘liq javob olinmagan savollar: 120 - 100 = 20 ta haftasiga.
- Xato javoblar ulushi: 9 / 120 × 100 = 7,5%.

## Manbalar

| Fayl yoki tizim | Davr | Nima sanaldi | Qanday sanaldi |
|---|---|---|---|
| «Baraka Savdo» Telegram guruhi eksporti (fayl papkada yo‘q) | 02.11-28.11 (4 hafta, dush-shan) | B.1, B.3, B.4, B.5 | egasi Claude Code bilan sanadi, har hafta alohida (pastda) |
| Telegram va amoCRM «shikoyat» tegi | 02.11-28.11 | B.8 | egasi sanadi |
| Malikaning jonli yozuvi | 30.11-05.12 | B.2 | kuniga 3 ta holat, soat bilan: savol kelgandan javob topilguncha |
| amoCRM eksporti | - | B.6 | savol va bitimni bog‘laydigan belgi yo‘q: o‘lchanmadi |

## Haftalar bo‘yicha (tarix)

| Hafta | B.1 | B.3 | B.4 | B.5 | B.8 |
|---|---|---|---|---|---|
| 02.11-07.11 | 116 | 10 | 14 | 96 | 2 |
| 09.11-14.11 | 122 | 8 | 16 | 103 | 3 |
| 16.11-21.11 | 118 | 9 | 15 | 99 | 1 |
| 23.11-28.11 | 124 | 9 | 15 | 102 | 2 |
| Jami | 480 | 36 | 60 | 400 | 8 |
| Haftasiga (jami / 4) | 120 | 9 | 15 | 100 | 2 |

Tekshiruv: 116 + 122 + 118 + 124 = 480; 10 + 8 + 9 + 9 = 36; 14 + 16 + 15 + 15 = 60; 96 + 103 + 99 + 102 = 400; 2 + 3 + 1 + 2 = 8.
Haftalar bir-biriga yaqin (116-124): o‘rtacha bitta g‘alati haftaga tayanmaydi.

## Jonli yozuv (B.2, 18 holat)

| Sana | Holatlar (tur: daqiqa) | Jami, daqiqa |
|---|---|---|
| 30.11 (dush) | narx 4, qoldiq 9, chegirma 6 | 19 |
| 01.12 | narx 3, qoldiq 15, muddat 5 | 23 |
| 02.12 | narx 2, chegirma 8, qoldiq 7 | 17 |
| 03.12 | narx 5, muddat 4, chegirma 6 | 15 |
| 04.12 | narx 3, qoldiq 11, muddat 3 | 17 |
| 05.12 (shan) | narx 4, chegirma 7, qoldiq 6 | 17 |
| Jami | 18 holat | 108 |

O‘rtacha: 108 / 18 = 6,0 daqiqa.
Tur bo‘yicha: narx 21 / 6 = 3,5; qoldiq 48 / 5 = 9,6; chegirma 27 / 4 = 6,75; muddat 12 / 3 = 4,0.
Eng uzoq - qoldiq: omborchi Umid aka yoki Otabek akaning javobini kutish shu vaqtga kirgan.

## Nima yetishmaydi

- B.6 yakunlangan bitimlar o‘lchanmadi: natijada ishlatilmaydi.
- B.2 ni faqat Malika o‘lchagan, 18 holat: o‘rtacha 6 taxminiy.
  Sinov haftalarida ham shu usulda o‘lchanadi: har hafta 10 ta holat, har birining daqiqasi alohida.
- B.3 tarixda faqat ko‘ringan xatolar: guruhda tuzatilmagan xato sanalmagan, haqiqiy xato ko‘proq bo‘lishi mumkin.
