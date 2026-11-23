# To‘plam 2 · B shakli: Qiymat va osonlik

Praktikum 3.0 · Qaysi jarayondan boshlaymiz? · Fayl: `kit2-scoring/form-b-matrix.md`

- Bo‘lim: savdo
- Sana: 2026-11-29

Qiymat (A.8) / Osonlik (A.9): Birinchi sinov · Foydali, puxta reja kerak · Oson, lekin foydasi kichik · Hozircha tegmang

### Matritsadagi nuqtalar

| # | Jarayon (A.1) | Qiymat (A.8) | Osonlik (A.9) | Matritsadagi joyi |
|---|---|---|---|---|
| 1 | Narx, qoldiq, chegirma, muddat savoli | 15 (5+5+5) | 10 (4+4+2) | Birinchi sinov |
| 2 | Kiruvchi qo‘ng‘iroq | 15 (5+5+5) | 6 (2+2+2) | Foydali, puxta reja kerak |
| 3 | amoCRM yuritish | 12 (5+5+2) | 10 (4+2+4) [?] | Birinchi sinov |
| 4 | Chiquvchi qo‘ng‘iroq | 13 (5+4+4) | 6 (2+2+2) | Foydali, puxta reja kerak |
| 5 | Kunlik savdo hisoboti | 9 (4+4+1) | 14 (5+5+4) | Chegarada |
| 6 | KP | 12 (4+4+4) [?] | 12 (5+5+2) | Birinchi sinov |
| 7 | Instagram va Telegram xabarlari | 14 (5+4+5) | 9 (2+4+3) | Chegarada |
| 8 | Yangi murojaat menejerga | 11 (5+4+2) | 12 (5+3+4) | Birinchi sinov |

### B.1 Tanlangan jarayon

1-jarayon: narx, qoldiq, chegirma va muddat savoli (mijoz savol beradi - javob mijozga yetadi).
Qiymat 15 (5+5+5), Osonlik 10 (4+4+2).
Bot nomi: «Savdo yordamchisi».

### B.2 Nega aynan shu

Menejerlar va call-markaz bir xil savolni kuniga o‘nlab marta Jamshid akaga beradi, mijoz kutadi, javob esa hujjatlarda bor.
Jamshid akaning vaqti tenderlarga qoladi.

### B.3 Hozir nimani qilmayapmiz

- KPni hozir qilmayapmiz: u 2-jarayon, kursdan keyin.
- Bot mijozga hech narsa yozmaydi, faqat xodimlarga (menejerlar, call-markaz) javob beradi.

### Xatarlar va boshlashdan oldingi savol

Muvaffaqiyatsizlikning 3 ta ehtimolli sababi:
1. Ma’lumot eskiradi: eski narx yoki qoldiq aytiladi (350 000 so‘mlik zarar takrorlanadi).
2. Xodimlar odatdagidek Jamshid akaga yozishda davom etadi, botdan foydalanmaydi.
3. Og‘zaki qoidalar qaytadi (12-15% chegirma, 3 kunda yetkazish) yoki qoidalar.md da javob yo‘q holat chiqadi.

Savol: 1C qoldig‘i va prays-list qanchalik tez-tez yangilanadi?
Egasining javobi (2026-11-29): 1C qoldig‘i har kuni ertalab 1C dan CSV qilib yuklanadi; prays-list o‘zgarsa, CSV almashtiriladi.
Eslatma: hozirgi `data/ombor-1c.csv` 01.11.2026 holatiga va kirill kodlashi (cp1251) da; kunlik yuklashda bot uni to‘g‘ri o‘qishini tekshirish kerak.

## Nega shunday yozildi

- «Matritsadagi nuqtalar» jadvali `matrix.html` sahifasining ma’lumoti.
  Sahifa skill andozasidan olingan, faqat ma’lumot qismi almashtirilgan; internetsiz ochiladi, tanlangan jarayon ko‘k rangda.
- «Birinchi sinov» qismida to‘rtta jarayon bor (1, 3, 6, 8); egasi Qiymati eng katta bo‘lgan 1-jarayonni tanladi (15, Osonlik 10).
  Bir nechta jarayon shu qismga tushsa, qiymati katta va [?] belgisi yo‘q jarayonni tanlang: 3- va 6-jarayonda [?] bor.
- 5- va 7-jarayon «Chegarada»: ballardan biri aynan 9.
  Ularni «yuqori» yoki «past» deb majburan joylash o‘rniga chegarada ekani ochiq aytilgan.
- B.2 ikki gapda: kim kutadi, javob qayerda bor va tejalgan vaqt nimaga ketadi (Jamshid akaning tenderlari).
- B.3 da ikki chegara: KP hozir emas (2-jarayon, kursdan keyin) va bot mijozga yozmaydi.
  Bu chegaralar keyin To‘plam 3 dagi B.5 ga va To‘plam 5 dagi to‘xtatish shartiga o‘tdi.
- «Xatarlar» bo‘limidagi 1- va 3-xatar keyin haqiqatga aylandi (`numbers.md`, B.13).
  1-xatar: bot qoldiqni eski 1C faylidan aytdi (16.12, 18.12).
  3-xatar: qoidada raqami yo‘q chegaralar (16.12 da 18 mln so‘mlik buyurtmaga «5%», 24.12 da 12 mln ga bepul 3D) va KP dagi og‘zaki va’dalar (17.12: bepul viloyat yetkazish, 3 yil kafolat) chiqdi.
  Xatarni oldindan yozib qo‘ysangiz, uni sinovda kuzatish osonlashadi.
- Boshlashdan oldingi savolga egasi javob berdi (2026-11-29: 1C qoldig‘i har kuni ertalab CSV): bu To‘plam 3 dagi B.3 ga eksport sifatida o‘tdi (har kuni 08:00 da Otabek aka chiqaradi).
- Eslatma qatori fayl muammosini oldindan ko‘rsatadi: `ombor-1c.csv` 01.11.2026 holatiga va cp1251 kodlashida.
