# Namunalar: «Baraka Office» MChJ misolida to‘ldirilgan to‘plamlar

Bu papkada beshta to‘plamning hamma shakli bitta kompaniya misolida to‘ldirilgan.
«Baraka Office» MChJ - kursning shartli demo kompaniyasi: ofis mebeli ishlab chiqaruvchi, Sergelida fabrika, Chilonzorda showroom, 64 xodim.
To‘plam 1 va 2 fayllari /kit1 va /kit2 ni shu kompaniya papkasida haqiqiy ishga tushirib olingan.
To‘plam 3-5 fayllari kursning umumiy Baraka fayllaridan aynan ko‘chirilgan (bot shabloni, 3-, 4- va 6-dars namunalari): darslarda ham, botda ham xuddi shu raqamlar.
Sanalar yakshanba guruhi taqvimida (masalan, 4-dars 13-dekabr, 6-dars 27-dekabr); shanba guruhida darslar bir kun oldin bo‘ladi.
Har bir faylga «Nega shunday yozildi» izohi qo‘shilgan; botning `instructions.md` fayliga esa izoh yozilmaydi, uning izohlari alohida faylda.

## Qanday o‘qish kerak

1. Avval o‘z shaklingizning qo‘llanmasini oching: `../qollanma/` (har bir shakl uchun alohida).
2. Keyin shu papkadagi to‘ldirilgan namunani o‘qing va oxiridagi «Nega shunday yozildi» bo‘limiga e’tibor bering.
3. Claude bilan qanday suhbat bo‘lganini ko‘rish uchun `../skills/kitN/example/suhbat.md` ni oching: u yerda egasi yozgan har bir xabar va Claude javobi bor.
4. Eng ko‘p uchraydigan xatolar va ularning to‘g‘ri varianti: `yomon-misollar.md`.

## Hikoya qisqacha

- To‘plam 1 (1-darsdan keyin): bosh direktor jamoaga xabar beradi, savdo bo‘limi rahbari Malika (menejer) va Zarina (call-markaz) bilan, direktor esa Jamshid aka bilan suhbatlashadi.
  Malikaning transkriptida raqam tuzoqlari bor: «34 marta» aslida «uch-to‘rt marta», «1 300 000» aslida «bir uch-to‘rt yuz ming».
- To‘plam 2 (2-dars): 8 ta jarayon baholanadi, birinchi sinov uchun «narx, qoldiq, chegirma va muddat savoli» tanlanadi: «Savdo yordamchisi» boti.
  KP tayyorlash ikkinchi jarayon bo‘lib qoladi.
- To‘plam 3 (3-dars): jarayonning 10 qadami, imzolangan agent yo‘riqnomasi va botning tizim yo‘riqnomasi (`kit3-agent/instructions.md`, izohlari `instructions.izoh.md` da).
- To‘plam 4 (4-dars): qobiliyatlar xaritasi (Madina, Malika, Bekzod, Zarina, Otabek aka, Jamshid aka), asosiy misol - Madina Sattorovaning mashg‘ulot vazifasi va 15 daqiqalik suhbat rejasi, sinov to‘plami (boshida 8 ta test, T1-T8; sinov oxirida 14 ta).
- To‘plam 5 (2-6-darslar): boshlang‘ich raqamlar (4 hafta tarix), sinov rejasi (14-26-dekabr), 2 haftalik raqamlar, xatolar jurnali, yakuniy hisob va qaror («Davom etish») va jamoaga e’lon.
  Asosiy raqamlar: bitta savolga vaqt 6 daqiqadan 2,0 ga, tejalgan vaqt haftasiga 7,2 soat, 2 haftalik xarajat 2 351 701 so‘m, isbotlangan topilgan pul 680 000 so‘m; oylik pul raqamlari faqat taxmin.

## Fayllar

- `baraka-office/CLAUDE.md`: kompaniya qoidalari.
- `baraka-office/kit1-interviews/`: jamoaga xabar, uchta transkript, Malikaning A shakli, uchta B shakli.
- `baraka-office/kit2-scoring/`: baholash jadvali, matritsa (`matrix.html` brauzerda ochiladi), tanlov.
- `baraka-office/kit3-agent/`: qadamlar, agent yo‘riqnomasi, tizim yo‘riqnomasi va uning izohlari (`instructions.izoh.md`).
- `baraka-office/kit4-people/`: qobiliyatlar xaritasi, Madinaning mashg‘ulot vazifasi (`madina-form-b.md`), sinov to‘plami.
- `baraka-office/kit5-pilot/`: boshlang‘ich holat, suhbat matni, sinov rejasi, raqamlar, e’lon.
- `yomon-misollar.md`: yettita yomon misol va to‘g‘ri varianti.

Raqamlar Baraka hujjatlaridan va kursning pilot shablonidan olingan; ism va lavozimlar kompaniyaning xodimlar ro‘yxatidan.
Bu shartli misol: o‘z kompaniyangiz raqamlari boshqa bo‘ladi.
