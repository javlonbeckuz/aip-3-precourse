# Baraka Office MChJ

Bu fayl Claude uchun kompaniya qoidalari.
Claude Code har safar shu papkada ochilganda uni o‘qiydi.

## Kompaniya haqida

- Nima qilamiz: ofis mebeli ishlab chiqaramiz (Sergelidagi o‘z fabrikamiz, 3 500 kv.m) va ofisni «kalit topshirish» sharti bilan jihozlaymiz; showroom Chilonzorda.
- Mijozlar: Toshkentdagi kompaniyalar (B2B), tenderlar.
- Xodimlar: 64 kishi; bo‘limlar: savdo (rahbar Jamshid Karimov, 8 menejer, 2 showroom maslahatchisi, 2 call-markaz operatori), marketing, dizayn, HR, moliya, IT, ma’muriy, ishlab chiqarish va logistika.
- Ish haftasi: haftasiga 6 ish kuni (dushanba-juma 09:00-18:00, shanba 09:00-15:00; jami 46 soat)
- O‘rtacha soatbay haq: 35 700 so‘m (To‘plam 5 dagi hisoblar uchun)
  - Oklad / 200 soat (haftasiga 46 soat × 4,3): Madina 5 000 000 / 200 = 25 000; Malika 4 500 000 / 200 = 22 500; Jamshid aka 12 000 000 / 200 = 60 000.
  - Narx va qoldiq savollariga kim javob berishiga qarab vaznli o‘rtacha (kuniga Madina 12, Malika 5, Jamshid aka 8 ta; egasining bahosi): (12 × 25 000 + 5 × 22 500 + 8 × 60 000) / 25 = 892 500 / 25 = 35 700.
- Tizimlar: amoCRM (savdo), 1C (ombor, buxgalteriya), Excel prays-list, Telegram guruhlari («Baraka Savdo»), Instagram, Click, Payme, Didox.

## Qoidalar

- Men bilan o‘zbek tilida, oddiy gaplar bilan gaplash.
- Raqamni o‘zingdan to‘qima: taxmin bo‘lsa, [?] bilan belgila.
- Har bir hisobni formulasi bilan ko‘rsat.
- Faylni o‘chirishdan yoki ustidan yozishdan oldin mendan so‘ra.
- Kalit va parollar faqat .env faylida turadi; ularni chatga yoki kodga yozma.
- Xodimlar haqidagi ma’lumot faqat shu papkada qoladi; darsda ko‘rsatishda ismlarni olib tashla.

## Kitlar

To‘plamlar natijasi shu papkalarda.
Har bir to‘plamni /kit1 ... /kit5 buyrug‘i ochadi.

- kit1-interviews/: xodimlar bilan suhbat transkripti va B shakli (vazifalar ro‘yxati), har bir xodimga bittadan
- kit2-scoring/: jarayonlarni baholash (form-a-scoring.md), matritsa (form-b-matrix.md, matrix.html), tanlangan jarayon
- kit3-agent/: jarayon qadamlari (form-a-steps.md), agent yo‘riqnomasi (form-b-agent.md), tizim yo‘riqnomasi (instructions.md)
- kit4-people/: qobiliyatlar xaritasi, har bir xodimning mashg‘ulot vazifasi, sinov to‘plami (test-set.md)
- kit5-pilot/: boshlang‘ich holat (baseline.md), sinov rejasi (plan.md), haftalik raqamlar va xatolar jurnali (numbers.md)
- data/: prays-list (narxlar.csv), ombor qoldig‘i (ombor-1c.csv), qoidalar (qoidalar.md), amoCRM eksporti
- app/: sinovdagi agentning o‘zi; u kit3-agent/instructions.md ni tizim yo‘riqnomasi sifatida o‘qiydi

## Nega shunday yozildi

- «Ish haftasi: haftasiga 6 ish kuni» qatori aniq yozilgan, chunki /kit1 haftaga aylantirishda (kuniga × 6) va /kit5 hisoblarda shu songa tayanadi.
  Shanbani unutsangiz, hamma haftalik soat kam chiqadi.
- «O‘rtacha soatbay haq: 35 700 so‘m» manbasi bilan yozilgan: oklad / 200 soat (haftasiga 46 soat × 4,3), savollarga kim javob berishiga qarab o‘rtacha.
  `numbers.md` dagi B.11, B.16 va oylik hisob shu raqamdan hisoblanadi; manbasiz soatbay haq yozmang.
- «Har bir hisobni formulasi bilan ko‘rsat» qoidasi tufayli hamma kit fayllarida hisob ochiq turadi, masalan, `numbers.md` da «(4,5 + 2,0) × 35 700 = 232 050».
- Tizimlar ro‘yxati (amoCRM, 1C, Excel prays-list, Telegram, Instagram, Click, Payme, Didox) To‘plam 3 dagi B.3 manbalariga va API bor-yo‘qligini tekshirishga asos bo‘ladi.
- «Raqamni o‘zingdan to‘qima: taxmin bo‘lsa, [?] bilan belgila» qoidasi hamma kit fayllaridagi [?] belgisining manbai.
- «Xodimlar haqidagi ma’lumot faqat shu papkada qoladi; darsda ko‘rsatishda ismlarni olib tashla» qatori xodimni himoya qiladi: darsda jarayon ko‘rsatiladi, odam emas.
  Xodim ma’lumotining AI xizmatiga borishi Mehnat kodeksi 178-moddasiga tegadi (lex.uz/mact/6257288); yurist tasdiqlasin.
- «Kitlar» bo‘limi papka nomlarini aynan beradi: /kit1 ... /kit5 fayllarni shu yo‘llardan o‘qiydi va yozadi, nomlarini o‘zgartirmang.
- data/ papkasi (narxlar.csv, ombor-1c.csv, qoidalar.md, amoCRM eksporti) qo‘shilgan, chunki To‘plam 2-5 dagi javoblar shu fayllarga tayanadi.
