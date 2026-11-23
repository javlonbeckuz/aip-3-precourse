# Boshlang‘ich holat (Agentgacha): narx, qoldiq, chegirma va muddat savoli

Praktikum 3.0 · Sinov va hisob-kitob · Fayl: `kit5-pilot/baseline.md`

2-darsdan keyin to‘ldiriladi.
Bu raqamlar B shaklidagi (numbers.md) «Agentgacha» ustuniga o‘tadi.
Odamni emas, ishni o‘lchaymiz: kim sekin ishlagani emas, jarayon haftasiga qancha ish va vaqt olishi yoziladi.

- Jarayon (To‘plam 2, B.1): 1-jarayon, narx, qoldiq, chegirma va muddat savoli; bot «Savdo yordamchisi»
- Davr: 2026-11-30 - 2026-12-05 (tarix, 1 hafta); jonli yozuv 2026-12-01 - 2026-12-05 (5 ish kuni)
- Kim o‘lchadi: tarix - egasi («Baraka Savdo» eksportidan sanadi); jonli yozuv - loyiha yetakchisi (Malika)
- Ish haftasi: haftasiga 6 ish kuni (CLAUDE.md)
- Soatbay haq: 22 600 so‘m (CLAUDE.md)
- Yozilgan sana: 2026-12-12

## Raqamlar

| Ko‘rsatkich | Haftasiga | Hisob | Manba | Usul: tarix / jonli / namuna | Ishonch |
|---|---|---|---|---|---|
| B.1 Bajarilgan so‘rovlar | 120 | 120 savol / 1 hafta = 120 | «Baraka Savdo» Telegram eksporti, 30.11-05.12 | tarix | o‘rta (faqat 1 hafta) |
| B.2 O‘rtacha vaqt, daqiqa | 6 | 4 tur × 3 holat = 12 holat, o‘rtacha 6; eng kami 2, eng ko‘pi 15 | Malikaning jonli o‘lchovi, 01.12-05.12 | jonli (namuna) | o‘rta (12 holat, alohida daqiqalar saqlanmagan) |
| B.3 Xato javoblar | 9 | 9 xato / 100 tekshirilgan javob × 100 = 9% | Jamshid aka hamma 100 ta to‘liq javobni tekshirgan, 30.11-05.12 | tarix + tekshiruv | o‘rta (faqat 1 hafta) |
| B.4 Takroriy so‘rovlar | 15 | 15 / 120 × 100 = 12,5% | «Baraka Savdo» eksporti, 30.11-05.12 | tarix | o‘rta (faqat 1 hafta) |
| B.5 To‘liq hal qilingan so‘rovlar | 100 | 100 / 120 × 100 = 83,3% | «Baraka Savdo» eksporti, 30.11-05.12 | tarix | o‘rta (faqat 1 hafta) |
| B.6 Yakunlangan bitimlar yoki buyurtmalar | [?] | - | amoCRM, hali sanalmagan | - | - |
| B.7 Tekshirish soati | 3 | butun vazifa uchun bitta raqam | egasining so‘zi (Jamshid aka haftasiga 3 soat) | egasining so‘zi | o‘rta |
| B.8 Mijoz shikoyatlari | 2 | 2 / 1 hafta = 2 | egasi sanagan, 30.11-05.12 | tarix | o‘rta (faqat 1 hafta) |

B.2 - bitta so‘rovga odam sarflagan daqiqa, tekshirishsiz (tekshirish B.7 da).
B.14 (topilgan pul) agentgacha 0.

**B.7 nega 0 emas.** Odatda agentgacha B.7 = 0 yoziladi.
Bu yerda egasining qarori bilan 3 soat yozildi, chunki Jamshid aka agent yo‘q paytda ham javoblarni tekshiradi.
Bu vaqt hozir ham ketyapti, uni 0 desak, agentgacha holat arzon ko‘rinib qoladi.

### Qo‘shimcha hisoblar (ma’lumot uchun)

- Javob topishga ketadigan vaqt: 120 × 6 / 60 = 12 soat/hafta (tekshirish: 720 daqiqa / 60 = 12).
- Tekshirish bilan jami vaqt: 12 + 3 = 15 soat/hafta.
- Shu vaqtning puli: 15 × 22 600 = 339 000 so‘m/hafta (tekshirish: 12 × 22 600 = 271 200; 3 × 22 600 = 67 800; 271 200 + 67 800 = 339 000).
- Inson qilgan bitta ishning narxi (B.16, inson): 6 / 60 × 22 600 = 2 260 so‘m (tekshirish: 0,1 × 22 600 = 2 260).
- To‘liq javob olinmagan savollar: 120 - 100 = 20 ta.
  Bu 20 ta tekshirilmagan, ularning xato bor-yo‘qligi noma’lum.

## Manbalar

| Fayl yoki tizim | Davr | Nima sanaldi | Qanday sanaldi |
|---|---|---|---|
| «Baraka Savdo» Telegram guruhi eksporti (fayl papkada yo‘q) | 30.11-05.12 (dush-shan) | B.1, B.4, B.5 | egasi qo‘lda sanagan; eksportda faqat shu 1 hafta bor |
| Jamshid akaning tekshiruvi | 30.11-05.12 | B.3 | hamma 100 ta to‘liq javob tekshirilgan, 9 tasi xato |
| Mijoz shikoyatlari | 30.11-05.12 | B.8 | egasining so‘zi |
| Malikaning jonli yozuvi | 01.12-05.12 | B.2 | har turdan 3 ta holat (narx, qoldiq, chegirma, muddat) |
| Egasining so‘zi | haftasiga | B.7 | Jamshid aka javoblarni tekshirishga 3 soat sarflaydi |
| amoCRM (`data/amocrm-eksport-2026-11.csv`) | - | B.6 | hali sanalmagan; eksportda 30.11-05.12 bormi, tekshirilmagan |

## Jonli yozuv (tarixi yo‘q ko‘rsatkichlar uchun)

Kunlik daqiqalar alohida saqlanmagan, shuning uchun jadvalda faqat 5 kunning umumiy natijasi bor.

| Sana | B.1 | B.2 namunalar, daqiqa | B.3 | B.4 | Izoh |
|---|---|---|---|---|---|
| 01.12-05.12 (5 ish kuni) | - | 12 holat (4 tur × 3): o‘rtacha 6, eng kami 2, eng ko‘pi 15 | - | - | B.1, B.3, B.4 tarixdan olingan; kunlik daqiqalar saqlanmagan |

Keyingi safar (sinov haftalarida) har bir holat daqiqasini alohida yozing: o‘rtacha va oraliqni tekshirsa bo‘ladi.

## Nima yetishmaydi

- B.6 yakunlangan bitimlar: [?], amoCRMdan sanash kerak, 3-darsgacha (reja bosqichidan oldin).
- Tarix bor-yo‘g‘i 1 hafta: qoidada 2-4 hafta.
  Ishonch «o‘rta».
- B.2 ning alohida 12 daqiqasi yo‘q: o‘rtacha 6 ni qayta tekshirib bo‘lmaydi.
