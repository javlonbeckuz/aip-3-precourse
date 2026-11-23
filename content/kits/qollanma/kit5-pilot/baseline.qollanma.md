# Boshlang‘ich holat (baseline.md): qanday to‘ldirish

Boshlang‘ich holat - agent ishga tushishidan oldingi raqamlar, har birining manbasi bilan.
2-darsdan keyin boshlanadi; bu raqamlar B shaklidagi «Agentgacha» ustuniga o‘tadi; boshlang‘ich raqam bo‘lmasa, 6-darsda faqat taassurot qoladi.

## Boshlashdan oldin kerak bo‘ladi

- To‘plam 2 dagi tanlov (`form-b-matrix.md`, B.1).
- Jarayonning tarixi: Telegram guruh eksporti (Telegram Desktop: «Export chat history», JSON), Excel yoki Google Sheets, CRM eksporti.
- Tarixi yo‘q raqamlar uchun loyiha yetakchisi bilan kelishuv: 5-6 ish kuni jonli yozuv, har bir holat daqiqasi bilan.
- Loyiha yetakchisi bilan yolg‘iz suhbat (`briefing.md`): o‘lchashdan oldin.

## Har bir maydon

| Kod | Maydon | Oddiy so‘z bilan nima | Javob qayerdan olinadi | Baraka Office misoli |
|---|---|---|---|---|
| - | Jarayon | To‘plam 2, B.1 | `form-b-matrix.md` | Narx, qoldiq, chegirma va muddat savoli («Savdo yordamchisi») |
| - | Davr | Raqamlar qaysi kunlardan | Eksport sanalari | Tarix 02.11-28.11 (4 hafta); jonli o‘lchov 30.11-04.12 (5 ish kuni) |
| - | Kim o‘lchadi | Tarixni kim sanadi, jonli yozuvni kim qildi | O‘zingiz | Tarix: egasi (Claude Code bilan sanadi, Jamshid aka tekshirdi); jonli o‘lchov: Malika (loyiha yetakchisi), Zarina va Jamshid aka, har biri 6 tadan |
| - | Ish haftasi | Haftasiga necha ish kuni | CLAUDE.md | 6 kun |
| B.1 | Bajarilgan so‘rovlar | Haftasiga nechta savol yoki so‘rov | Telegram, CRM eksporti | 120 (482 savol / 4 hafta = 120,5 → 120; Telegram: «Baraka savdo» guruhi va mijozlar chati, 02.11-28.11) |
| B.2 | O‘rtacha vaqt, daqiqa | Bitta so‘rovga odam sarflagan daqiqa, tekshirishsiz | Jonli o‘lchov: 18 holat, soat bilan | 6 (108 daqiqa / 18 holat = 6,0; eng kami 4, eng ko‘pi 8) |
| B.3 | Xato javoblar | Haftasiga nechta noto‘g‘ri javob | Eksport: Jamshid aka guruhda tuzatgan javoblar | 9 (36 / 4 hafta; tuzatilmagan xato sanalmagan) |
| B.4 | Takroriy so‘rovlar | Bir xil savol qayta so‘ralgani | Telegram eksporti | 15 (60 / 4 hafta) |
| B.5 | To‘liq hal qilingan so‘rovlar | Oxirigacha javob berilganlar | Telegram, CRM | 100 (400 / 4 hafta) |
| B.6 | Yakunlangan bitimlar | Yopilgan bitimlar yoki buyurtmalar | CRM | [?]: o‘lchanmadi, savolni bitim bilan bog‘lab bo‘lmadi; sababi yozilgan |
| B.7 | Tekshirish soati | Agent javoblarini tekshirish vaqti | - | 0: agentgacha tekshiradigan agent javobi yo‘q |
| B.8 | Mijoz shikoyatlari | Haftasiga nechta shikoyat | Telegram, CRM «shikoyat» tegi | 2 (8 / 4 hafta) |
| - | Hisob | Har bir raqam qanday chiqdi | Siz | «482 / 4 hafta = 120,5 → 120»; «108 / 18 = 6,0» |
| - | Manba, Usul, Ishonch | Fayl va sanalar; tarix, jonli yoki namuna; qanchalik ishonchli | Siz | «Telegram eksporti, 02.11-28.11, tarix, yuqori»; egasi 20 ta tasodifiy xabarni qo‘lda tekshirdi, 19 tasi to‘g‘ri |
| - | Jonli yozuv jadvali | Tarixi yo‘q raqamlar uchun kunlik yozuv | Loyiha yetakchisi | Har kuni B.2 holatlari daqiqasi bilan (30.11: 5, 7, 6, 4) va kim o‘lchagani |

Baraka raqamlari kursning tayyor boti bilan bir xil: `pilot-template/kit5-baseline.toml` (shartli raqamlar).
B.14 (topilgan pul) agentgacha 0.
B.7 (tekshirish soati) odatda agentgacha 0; agentgacha ham kimdir boshqa odamning javoblarini muntazam tekshirgan bo‘lsa, o‘sha soat yoziladi.
Baraka misolida B.7 agentgacha 0: tekshiradigan agent javobi yo‘q edi.
B.2 ga tekshirish vaqti kirmaydi: tekshirish sinovda B.7 da alohida sanaladi.
B.2 ga javobni kutish kiradi, chunki mijoz shu paytda kutib turadi (Barakada 8 daqiqalik holat: qoldiq ombordan kutildi).
Intervyu bilan solishtiring: Barakada To‘plam 2 dagi 17,3 soat va o‘lchangan 12,0 soat farqi tushuntirilgan, sinov o‘lchangan raqam bilan solishtiriladi.

## Ko‘p uchraydigan xatolar

1. Raqam taassurotdan yozilgan: «kuniga 50 ga yaqin».
   Tuzatish: har bir raqamga manba va sanalarni yozing.
2. Odam o‘lchanadi, ish emas: «Malika sekin javob beradi».
   Tuzatish: xodim bo‘yicha tezlik yozilmaydi; jarayon haftasiga qancha vaqt olishi yoziladi.
3. Jonli o‘lchovda faqat qiyin holatlar o‘lchangan, o‘rtacha oshib ketgan.
   Tuzatish: har turdan teng emas, ishdagi ulushiga qarab o‘rtachani hisoblang.
4. Loyiha yetakchisi bilan gaplashmasdan o‘lchash boshlangan.
   Tuzatish: avval `briefing.md` bo‘yicha yolg‘iz suhbat, keyin o‘lchash.
5. Bitta hafta, bayram yoki mavsum haftasi olingan.
   Tuzatish: 2-4 hafta oling; mavsum ta’sirini izohda yozing.

## Tayyor bo‘lganini qanday bilasiz

Mentor 3-darsning boshida tekshiradi:

- [ ] Har bir raqamda manba va hisob bor.
- [ ] Raqamlar tarixdan yoki kamida 3 kunlik jonli yozuvdan.
- [ ] «Agentgacha» ustuni `numbers.md` ga ko‘chirilgan.

## Claude Code bilan

```text
/kit5 baseline
```

/kit5 eksport fayllarini o‘qib, haftalik raqamlarni hisobi va manbasi bilan chiqaradi, tarixda yo‘q raqamlar uchun jonli yozuvni taklif qiladi.

## Namuna

- To‘ldirilgan namuna: [Baraka Office, baseline.md](../../namunalar/baraka-office/kit5-pilot/baseline.md)
- Yomon misollar: [yomon-misollar.md](../../namunalar/yomon-misollar.md) (boshlang‘ich raqamsiz natija)
- Skill namunasi: [skills/kit5/example/](../../skills/kit5/example/) (`suhbat.md` - aniq so‘rovlar va to‘liq javoblar)
