# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Baraka Office MChJ

Bu fayl Claude uchun kompaniya qoidalari.
Claude Code har safar shu papkada ochilganda uni o‘qiydi.
Bu papka kod emas, hujjatlar va jarayonlar ish joyi (Praktikum 3.0).
Build, lint yoki test buyruqlari yo‘q.
Ish: xodimlar vazifalarini yig‘ish, jarayonlarni baholash, AI agent uchun yo‘riqnoma yozish.

## Kompaniya haqida

- Nima qilamiz: korporativ mijozlar uchun ofis mebelini ishlab chiqarish va "kalit topshirish" (turnkey) asosida jihozlash. 2019-yildan.
- Mijozlar: IT-kompaniyalar, banklar, xususiy klinikalar, o‘quv markazlari, davlat tashkilotlari. Toshkent shahri va viloyati.
- Xodimlar: [?] kishi.
- Bo‘limlar: savdo (ROP, sotuv menejerlari, call-markaz), buxgalteriya, 3D dizayn, logistika va ishlab chiqarish, IT, HR.
- Ish haftasi: haftasiga 6 ish kuni (dushanba - juma 09:00-18:00, shanba 09:00-15:00, yakshanba dam).
- O‘rtacha soatbay haq: [?] so‘m (To‘plam 5 dagi hisoblar uchun). Hujjatlarda yo‘q, egasidan so‘ra.
- Tizimlar: AmoCRM, Didox.uz (elektron hujjat), IP-telefoniya, Telegram (`@Baraka_HR_bot` va bo‘lim guruhlari), FaceID turniket, Excel, NotebookLM (bilim bazasi).

## Rasmiy hujjatlar: ziddiyat bo‘lsa, shular to‘g‘ri

Manba: `hujjatlar/`.
Tijoriy taklif (02) reklama hujjati.
Ziddiyat chiqsa 01, 03, 04 ustun turadi.

- 01 Prays-list va katalog 2026 (2026-10-01, Rustamov S.A.): sotuv menejeri chegirmasi 5% gacha (buyurtma 20 mln so‘mdan oshsa), ROP 10% gacha (yozma ruxsat, 100% oldindan to‘lov yoki 50 mln dan oshsa), 10% dan yuqori faqat Bosh direktor (150 mln dan yuqori tender).
- 03 Namunaviy shartnoma (2026): to‘lov 70% avans + 30% topshirgandan keyin 15 bank ish kuni, kechikish penyasi kuniga 0,4% (eng ko‘pi 20%), kafolat 24 oy (stol, shkaf, tumba) va 12 oy (kreslo mexanizmi), nuqson 5 ish kunida tuzatiladi.
- 04 Ichki tartib va KPI reglamenti (HR-REG-2026/04, 2026-09-01): oklad har oyning 5-sanasida, KPI bonus 15-sanasida, 4 ta "qizil chiziq" bo‘lsa shartnoma bir kunda bekor qilinadi.
- 02 Kompaniya taqdimoti (KP, 2026): reklama. Mijozga yuborishdan oldin 01 va 03 bilan solishtir.

### Ma’lum ziddiyatlar (02 bilan 03 o‘rtasida)

- Kafolat: KP "3 yil (36 oy), hammasiga" deydi. Shartnoma 24 oy va 12 oy. To‘g‘risi: shartnoma.
- Servis muddati: KP "48 soat". Shartnoma "5 ish kuni". To‘g‘risi: shartnoma.
- Yetkazib berish: KP "Toshkent viloyatida ham mutlaqo bepul". Shartnoma: faqat shahar ichida va 10 mln so‘mdan yuqori bo‘lsa bepul, viloyatga 1 km uchun 8 000 so‘m. To‘g‘risi: shartnoma.
- Material: KP "hamma stollar Egger 25 mm". Prays-listda WS-101 18 mm. To‘g‘risi: prays-list.
- Yetkazib berish muddati: KP "1 kun ichida montaj". Shartnoma: to‘lovdan keyin 7 ish kuni (individual buyurtma 12). To‘g‘risi: shartnoma.

## Hozirgi sinov jarayoni

- Jarayon (To‘plam 2, B.1): [?] (kit2-scoring hali to‘ldirilmagan).
- Kim ishlatadi: [?]. Savdo bo‘limi xodimlari suhbatdan o‘tgan.
- Bo‘lim boshlig‘i: Jamshid Karimov (savdo bo‘limi rahbari, ROP).

## Kim nimaga javob beradi

Manba: 04-hujjat, 4-bo‘lim.

| Masala | Kim | Aloqa |
|---|---|---|
| Shartnoma, schet-faktura, Didox.uz, to‘lov tushganini tekshirish | Nodira Karimova, bosh buxgalter | `@baraka_buxgalter`, ichki 104 |
| 3D dizayn-loyiha, ofis o‘lchovi | Javohir Tursunov, bosh arxitektor-dizayner | `@baraka_3d_design`, ichki 108 |
| Ombor qoldig‘i, yetkazib berish grafigi, montaj brigadasi | Otabek aka, logistika va ishlab chiqarish boshlig‘i | `@baraka_logistika`, ichki 112 |
| AmoCRM, IP-telefoniya, noutbuk, internet | Sardorbek, IT-administrator | `@baraka_it_help`, ichki 109 |
| Ta’til, ruxsat, oylik, kadrlar | Dilnoza Murodova, HR rahbari | `@baraka_hr_dilnoza`, ichki 102 |
| 10% gacha maxsus chegirma, murakkab B2B muzokara | Jamshid Karimov, ROP | `@baraka_rop_jamshid`, ichki 105 |
| 10% dan yuqori chegirma, 150 mln+ tender | Rustamov S.A., Bosh direktor | [?] |

## Qoidalar

- Men bilan o‘zbek tilida, oddiy gaplar bilan gaplash.
- Raqamni o‘zingdan to‘qima: taxmin bo‘lsa, [?] bilan belgila.
- Har bir hisobni formulasi bilan ko‘rsat.
- Faylni o‘chirishdan yoki ustidan yozishdan oldin mendan so‘ra.
- Kalit va parollar faqat .env faylida turadi; ularni chatga yoki kodga yozma.
- Xodimlar haqidagi ma’lumot faqat shu papkada qoladi; darsda ko‘rsatishda ismlarni olib tashla.

## Shakllar va hisob qoidalari

- B shakli (kit1): vazifa fe’l bilan yoziladi. Formula: B.4 (haftalik soat) = B.2 (haftasiga marta) x B.3 (daqiqa) / 60. Jami qator ikki marta tekshiriladi (oldindan va oxiridan).
- B.7: Q aniq qoida, F fikr va tajriba talab qiladigan ish. B.9: A agent, R robot, I inson, B birga.
- Xodim B shaklini ko‘rib chiqib tasdiqlaydi. Sarlavhada sana va tuzatish yoziladi.
- A shakli (kit2): har jarayon 1-5 ball bilan baholanadi (A.2 - A.9). Matritsa: qiymat (A.8) va osonlik (A.9).
- Suhbat fayllari shartli misol ("raqamlar usulni ko‘rsatish uchun"). Haqiqiy deb hisoblama.

## Kitlar

To‘plamlar natijasi shu papkalarda.
Har bir to‘plamni /kit1 ... /kit5 buyrug‘i ochadi (buyruq fayllari hali `.claude/` da yo‘q).

- kit1-interviews/: xodimlar bilan suhbat transkripti va B shakli (vazifalar ro‘yxati), har bir xodimga bittadan. Hozir: jamshid, malika, madina.
- kit2-scoring/: jarayonlarni baholash (form-a-scoring.md), matritsa (form-b-matrix.md, matrix.html), tanlangan jarayon. Shakllar bo‘sh, matrix.html yo‘q.
- kit3-agent/: jarayon qadamlari (form-a-steps.md), agent yo‘riqnomasi (form-b-agent.md), tizim yo‘riqnomasi (instructions.md). Hali yaratilmagan.
- kit4-people/: qobiliyatlar xaritasi, har bir xodimning mashg‘ulot vazifasi, sinov to‘plami (test-set.md). Hali yaratilmagan.
- kit5-pilot/: boshlang‘ich holat (baseline.md), sinov rejasi (plan.md), haftalik raqamlar va xatolar jurnali (numbers.md). Hali yaratilmagan.
- app/: sinovdagi agentning o‘zi; u kit3-agent/instructions.md ni tizim yo‘riqnomasi sifatida o‘qiydi. Hali yaratilmagan.
