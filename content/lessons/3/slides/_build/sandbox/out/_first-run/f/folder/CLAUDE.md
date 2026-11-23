# «Baraka Office» MChJ

<!--
Namuna haqida: bu «Baraka Office» uchun to‘ldirilgan CLAUDE.md, shartli misol.
Mana shunday izoh bloklari faqat odam uchun: Claude Code ularni o‘qimaydi (rasmiy hujjat: code.claude.com/docs/en/memory, 2026-11-03 da tekshirildi).
Shuning uchun «nega shunday yozildi» degan izohlarni shu yerda qoldirdik.
Fayl 200 qatordan qisqa bo‘lsin: uzun fayl Claude e’tiborini tarqatadi.
-->

Bu fayl Claude uchun kompaniya qoidalari.
Claude Code har safar shu papkada ochilganda uni o‘qiydi.

## Kompaniya haqida

<!-- Izoh: har qatorda bitta fakt. «Arzon», «sifatli» kabi sifatlar emas, raqam va nom. -->

- Nima qilamiz: ofis mebelini o‘zimiz ishlab chiqaramiz va ofisni «kalit topshirish» asosida jihozlaymiz (stol, kreslo, rahbar kabineti, muzokara stoli, tayyor paketlar).
- Mijozlar: Toshkentdagi 10-100 xodimli kompaniyalar: IT, xususiy klinika, o‘quv markazi, bank filiali, logistika va qurilish ofislari. Qarorni egasi yoki ofis-menejer qiladi.
- Joylashuv: zavod Sergeli sanoat zonasida (3 500 kv.m), Showroom Chilonzor, Bunyodkor shoh ko‘chasi 42-uy (400 kv.m).
- Xodimlar: taxminan 60 [?]; bo‘limlar: savdo, marketing, HR, buxgalteriya, 3D dizayn, logistika va ishlab chiqarish, IT.
- Ish haftasi: haftasiga 6 ish kuni (dushanba-shanba, shanba 15:00 gacha).
- O‘rtacha soatbay haq: savdo bo‘limida taxminan 40 000 so‘m [?] (Nodira opadan aniqlanadi; To‘plam 5 dagi hisoblar uchun).
- Tizimlar: AmoCRM (sotuv), 1C (ombor va buxgalteriya), Didox.uz (hujjatlar), IP-telefoniya, Telegram (katalog @baraka_office_uz, ichki guruhlar, @Baraka_HR_bot), Instagram va Facebook reklama, FaceID turniket, NotebookLM bilim bazasi.

## Rasmiy hujjatlar: ziddiyat bo‘lsa, shular to‘g‘ri

<!-- Izoh: bu bo‘lim eng muhimi. Intervyularda Jamshid aka «3 kun» va «12-15% chegirma» degan, KPda «36 oy kafolat» yozilgan. Claude qaysi biriga ishonishini aniq bilishi kerak. -->

Fayllar `hujjatlar/` papkasida.

- Prays-list 2026 (1-oktabr, Rustamov S.A. tasdiqlagan): narxlar QQS bilan, chakana 1-4 dona, ulgurji 5+ dona.
- Chegirma: sotuvchi 5% gacha (buyurtma 20 mln so‘mdan oshsa); ROP yozma ruxsati bilan 10% gacha (100% oldindan to‘lov yoki 50 mln so‘mdan oshsa); 10% dan yuqori taqiqlangan.
- Yetkazish: oldindan to‘lov tushgandan 7 ish kuni; MDF va shpon buyurtmalar 12 ish kuni. «3 kunda yetkazamiz» deyilmaydi.
- Kafolat: korpus 24 oy, kreslo mexanizmi va gazlift 12 oy. KPdagi «36 oy» xato, marketing tuzatadi.
- Toshkent viloyatiga yetkazish: halqa yo‘lidan har km uchun 8 000 so‘m.
- Oylik: oklad 5-sanada, KPI bonus 15-sanada; sotuvchining oylik rejasi 120 mln so‘m.

## Hozirgi sinov jarayoni

<!-- Izoh: 2-darsda To‘plam 2 dan keyin qo‘shildi. Claude PRD va agent yozganda shu chegaradan chiqmaydi. -->

- Jarayon (To‘plam 2, B.1): narx, qoldiq, chegirma va muddat savollariga javob, savdo bo‘limi.
- Kim ishlatadi: call-markaz operatorlari va sotuv menejerlari. Bu ichki yordamchi: agent mijozga o‘zi yozmaydi.
- Bo‘lim boshlig‘i: Jamshid Karimov (ROP).

## Kim nimaga javob beradi

| Masala | Kim | Telegram |
|---|---|---|
| Shartnoma, schet-faktura, Didox, to‘lov tushgani | Nodira Karimova, bosh buxgalter | @baraka_buxgalter |
| 3D loyiha va o‘lchov | Javohir Tursunov, arxitektor-dizayner | @baraka_3d_design |
| Ombor qoldig‘i, yetkazish, montaj | Otabek aka, logistika boshlig‘i | @baraka_logistika |
| AmoCRM, telefoniya, kompyuter | Sardorbek, IT | @baraka_it_help |
| Chegirma 10% gacha, yirik B2B | Jamshid Karimov, ROP | @baraka_rop_jamshid |
| Ta’til, oylik, xodimlar | Dilnoza Murodova, HR | @baraka_hr_dilnoza |

## Qoidalar

<!-- Izoh: birinchi oltitasi kurs andozasidan (kits/templates/kompaniya/CLAUDE.md), keyingilari Baraka uchun qo‘shildi. -->

- Men bilan o‘zbek tilida, oddiy gaplar bilan gaplash.
- Raqamni o‘zingdan to‘qima: taxmin bo‘lsa, [?] bilan belgila.
- Har bir hisobni formulasi bilan ko‘rsat.
- Faylni o‘chirishdan yoki ustidan yozishdan oldin mendan so‘ra.
- Kalit va parollar faqat .env faylida turadi; ularni chatga yoki kodga yozma.
- Xodimlar haqidagi ma’lumot faqat shu papkada qoladi; darsda ko‘rsatishda ismlarni olib tashla.
- Narx, chegirma yoki muddat so‘ralsa, faqat «Rasmiy hujjatlar» bo‘limiga tayan va qaysi hujjatdan olganingni ayt.
- Mijozga yoziladigan matnda: «Hurmatli [Ism] aka / opa», «Siz»; «narxi lichkada», «shoshiling», «shok narx» so‘zlari taqiqlangan.

## Kitlar

To‘plamlar natijasi shu papkalarda.
Har bir to‘plamni /kit1 ... /kit5 buyrug‘i ochadi.

- kit1-interviews/: xodimlar bilan suhbat transkripti va B shakli (vazifalar ro‘yxati), har bir xodimga bittadan
- kit2-scoring/: jarayonlarni baholash (form-a-scoring.md), matritsa (form-b-matrix.md, matrix.html), tanlangan jarayon
- kit3-agent/: jarayon qadamlari (form-a-steps.md), agent yo‘riqnomasi (form-b-agent.md), tizim yo‘riqnomasi (instructions.md)
- kit4-people/: qobiliyatlar xaritasi, har bir xodimning mashg‘ulot vazifasi, sinov to‘plami (test-set.md)
- kit5-pilot/: boshlang‘ich holat (baseline.md), sinov rejasi (plan.md), haftalik raqamlar va xatolar jurnali (numbers.md)
- app/: sinovdagi agentning o‘zi; u kit3-agent/instructions.md ni tizim yo‘riqnomasi sifatida o‘qiydi
