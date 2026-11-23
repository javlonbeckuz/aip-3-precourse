# [Kompaniya nomi]

<!--
QANDAY TO‘LDIRISH (bu izohni Claude o‘qimaydi, faqat siz uchun):
1. Kvadrat qavs ichidagi har bir joyni o‘z ma’lumotingiz bilan almashtiring.
2. Bir qatorda bitta fakt yozing: nom, raqam, tizim. «Arzon», «sifatli», «tez» kabi sifatlar Claude’ga hech narsa bermaydi.
3. Bilmagan raqamingizni to‘qimang: [?] qo‘yib qoldiring va kim aniqlab berishini yozing.
4. Parol, karta raqami, bot tokeni, API kalitini bu faylga HECH QACHON yozmang.
5. Fayl qisqa bo‘lsin: 200 qatordan kam. Katta narxlar ro‘yxatini bu yerga ko‘chirmang, faylning nomini yozing.
6. /init yozgan matn bo‘lsa, uni shu tartibga keltiring: keraksiz texnik gaplarni o‘chiring.
Namuna: baraka-office/kompaniya/CLAUDE.md. Yomon namuna: yomon-namuna/CLAUDE.md.
-->

Bu fayl Claude uchun kompaniya qoidalari.
Claude Code har safar shu papkada ochilganda uni o‘qiydi.
2-darsda /init yozgan matnni shu tartibga keltiring va qavs ichidagi joylarni to‘ldiring.

## Kompaniya haqida

<!-- Mijozingizga 30 soniyada qanday tushuntirsangiz, shunday yozing. -->

- Nima qilamiz: [mahsulot yoki xizmat, bir gapda]
- Mijozlar: [kimlar, qayerda]
- Xodimlar: [soni], bo‘limlar: [ro‘yxat]
- Ish haftasi: haftasiga [5 yoki 6] ish kuni
- O‘rtacha soatbay haq: [so‘m] (To‘plam 5 dagi hisoblar uchun)
- Tizimlar: [Excel, Google Sheets, Telegram guruhlari, 1C, Bitrix, amoCRM, Click, Payme ...]

## Rasmiy hujjatlar: ziddiyat bo‘lsa, shular to‘g‘ri

<!--
Ixtiyoriy, lekin juda foydali.
Narx, chegirma, muddat, kafolat kabi qoidalar qaysi hujjatda yozilgan?
Xodimlar og‘zaki boshqacha gapirsa, Claude qaysi biriga ishonishini shu yerda ayting.
Hujjatlarning o‘zini kompaniya papkasidagi hujjatlar/ ichiga qo‘ying.
-->

- [Hujjat nomi va sanasi]: [undagi eng muhim qoida bir gapda]

## Hozirgi sinov jarayoni

<!-- 2-darsning oxirida, To‘plam 2 dan keyin to‘ldiring (B.1). Claude PRD va agentni shu chegarada yozadi. -->

- Jarayon (To‘plam 2, B.1): [jarayon nomi]
- Kim ishlatadi: [xodimlar]
- Bo‘lim boshlig‘i: [ism]

## Kim nimaga javob beradi

<!-- Ixtiyoriy. Claude xat yoki vazifa yozganda kimga yuborishni biladi. -->

| Masala | Kim | Aloqa |
|---|---|---|
| [masala] | [ism, lavozim] | [Telegram yoki ichki raqam] |

## Qoidalar

<!-- Birinchi oltita qoidani o‘chirmang: kurs skill’lari ularga tayanadi. O‘zingiznikini pastiga qo‘shing. -->

- Men bilan o‘zbek tilida, oddiy gaplar bilan gaplash.
- Raqamni o‘zingdan to‘qima: taxmin bo‘lsa, [?] bilan belgila.
- Har bir hisobni formulasi bilan ko‘rsat.
- Faylni o‘chirishdan yoki ustidan yozishdan oldin mendan so‘ra.
- Kalit va parollar faqat .env faylida turadi; ularni chatga yoki kodga yozma.
- Xodimlar haqidagi ma’lumot faqat shu papkada qoladi; darsda ko‘rsatishda ismlarni olib tashla.

## Kitlar

<!-- Bu bo‘limni o‘zgartirmang: /kit1 ... /kit5 skill’lari fayllarni shu nomlar bilan qidiradi. -->

To‘plamlar natijasi shu papkalarda.
Har bir to‘plamni /kit1 ... /kit5 buyrug‘i ochadi.

- kit1-interviews/: xodimlar bilan suhbat transkripti va B shakli (vazifalar ro‘yxati), har bir xodimga bittadan
- kit2-scoring/: jarayonlarni baholash (form-a-scoring.md), matritsa (form-b-matrix.md, matrix.html), tanlangan jarayon
- kit3-agent/: jarayon qadamlari (form-a-steps.md), agent yo‘riqnomasi (form-b-agent.md), tizim yo‘riqnomasi (instructions.md)
- kit4-people/: qobiliyatlar xaritasi, har bir xodimning mashg‘ulot vazifasi, sinov to‘plami (test-set.md)
- kit5-pilot/: boshlang‘ich holat (baseline.md), sinov rejasi (plan.md), haftalik raqamlar va xatolar jurnali (numbers.md)
- app/: sinovdagi agentning o‘zi; u kit3-agent/instructions.md ni tizim yo‘riqnomasi sifatida o‘qiydi
