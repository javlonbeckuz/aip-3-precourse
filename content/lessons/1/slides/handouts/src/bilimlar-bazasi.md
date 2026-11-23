# Kompaniya bilim bazasi: Gemini Notebook bilan

1-dars tarqatmasi.
Praktikum 2.0 dagi «Korxona bilimlar bazasi» tarqatmasining yangilangan nusxasi.
NotebookLM 2026-yil iyulda Gemini Notebook deb qayta nomlandi; manzil: notebook.google.com.

**Qanday foydalanish:** o‘z kompaniyangiz uchun daftar ochayotganda yoningizda tursin: 3-bo‘limdagi to‘rt qadamni ketma-ket bajaring, 4-bo‘limdagi promptlarni nusxalang.
Baraka Office hujjatlari bilan olingan haqiqiy javoblar va ularni qanday tekshirish: `notebooklm-exercise/namuna-natijalar.md`.

## 1. Nega oddiy chat yetmaydi

Oddiy chat internetdan o‘rgangan umumiy bilimi bilan javob beradi.
Sizning narxlaringiz, shartnomangiz yoki ichki qoidangizni bilmaydi va bilmasa ham ishonch bilan javob berishi mumkin.

RAG (manbaga tayanish) boshqacha ishlaydi:

1. Siz hujjatlarni yuklaysiz.
2. Savol bersangiz, tizim avval hujjatlardan kerakli joyni qidiradi.
3. Faqat topilgan matn asosida javob yozadi va manba raqamini ko‘rsatadi.

Bu ochiq kitob imtihoni: javob kitobda bo‘lsa topadi, bo‘lmasa «hujjatlarda yo‘q» deydi.

## 2. Gemini Notebook bugun (2026-yil noyabr)

| Qism | Nima qiladi |
| --- | --- |
| Sources (manbalar) | PDF, Word, Markdown, CSV, Google Docs, audio, veb-sahifa, YouTube; har biri 200 MB gacha |
| Chat | Faqat manbalardan javob, har gapda bosiladigan manba raqami |
| Studio | Audio Overview, Video Overview, Mind Map, hisobotlar, Flashcards, Quiz, Slide Deck, Infographic |

Bepul tarif: 100 ta daftar, har birida 50 tagacha manba; limit tugasa, bir necha soatdan keyin yoki ertaga davom ettiring.
O‘zbek tili rasmiy javob tillari ro‘yxatida hali yo‘q: audio uchun rus yoki ingliz tilini tanlang.
Chat esa o‘zbekcha savolga odatda o‘zbekcha javob beradi (3-noyabr sinovida shunday bo‘ldi).

## 3. To‘rt qadam

1. **Yig‘ing.** Bitta mavzu uchun bitta daftar: narxlar, shartnoma shabloni, ichki tartib, yo‘riqnomalar.
   Maxfiy ma’lumot yuklanmaydi: mijoz yoki bemor ro‘yxati, tashxis va tahlil natijalari, pasport, maosh varag‘i, parollar.
2. **Ziddiyatni toping.** Birinchi savol har doim shu: hujjatlar bir-biriga zid joyi bormi?
   Shartnoma 7 kun desa, sotuvchi 3 kun va’da qilsa, mijoz baribir norozi bo‘ladi.
3. **Savol bering.** Har javobdagi manba raqamini bosing va asl matnni o‘qing.
4. **Natija yarating.** Yangi xodim uchun Quiz, rahbar uchun qisqa hisobot, mijoz uchun savol-javoblar.

## 4. Tayyor promptlar

Ziddiyatlar:

```text
Yuklangan barcha hujjatlarni solishtirib chiq.
Raqamlar, muddatlar, narxlar, chegirmalar, kafolat va ichki qoidalar bir-biriga zid kelgan joylarni top.
Har birini jadval qil: mavzu, 1-manba nima deydi, 2-manba nima deydi, ikkala manbadan iqtibos, biznes uchun xavfi.
Manbada yo‘q narsani to‘qima.
```

Yangi xodim uchun:

```text
Yangi xodim birinchi haftada bilishi shart bo‘lgan 10 ta qoidani ro‘yxat qil va har biriga manba ko‘rsat.
Keyin bilimini tekshirish uchun 5 ta amaliy savol tuz, to‘g‘ri javoblari bilan.
```

Mijoz uchun:

```text
Mijozlar eng ko‘p beradigan 5 ta savolga hujjatlarga asoslangan qisqa javob yoz.
Har javobga manba ko‘rsat. Ichki xodim ismlarini yozma.
```

## 5. Misollar

**HR bilim bazasi.**
HR rahbari bilan bir soatlik suhbatni telefonga yozib, daftarga yuklaysiz: ta’til, ish vaqti, sinov muddati qoidalari.
Yangi xodim savolini HR’ni bezovta qilmasdan shu yerdan so‘raydi.

**Servis markazi.**
30 xil uskunaning PDF yo‘riqnomalari bitta daftarda.
Viloyatdagi usta «M400 da uchta qizil chiroq yonyapti» deb yozadi va yo‘riqnomaning kerakli sahifasini oladi.

**Baraka Office (haqiqiy sinov, 3-noyabr).**
8 ta hujjat yuklangan daftarda ziddiyat prompti 8 ta ziddiyatni topdi: kafolat 36 oy va 12 oy, yetkazish 3 va 7 kun, chegirma 5-10% va 12-15%, sotuv rejasi 100 va 120 mln so‘m.
Har biri bitta boshqaruv qarori: qaysi hujjat to‘g‘ri va xodimlarga kim aytadi.

**Mijoz shikoyatlari.**
Bir oylik shikoyat matnlari yuklanadi va so‘raladi: mijozlar eng ko‘p nimadan norozi?
Natija: taxmin emas, manbali ro‘yxat.
Maqsad mahsulot va jarayonni yaxshilash, xodimlarni baholash emas.

## 6. O‘zbekcha raqamlarga ehtiyot bo‘ling

Ovozni matnga o‘girish o‘zbekcha taxminiy raqamlarda adashadi.

> **Audio:** «Aka, bu ishga bir uch-to‘rt yuz ming bersangiz yetadi.» (taxminan 300-400 ming so‘m)
> **Matn:** «1 300 000 so‘m»

Audiodan yaratilgan bilim bazasidagi har bir summa, sana va raqamni manba raqami orqali asl matn bilan, kerak bo‘lsa audio bilan solishtiring.

## O‘zingizni tekshiring

- [ ] Oddiy chat va manbaga tayanadigan javob farqini tushuntira olaman.
- [ ] Hujjat yuklagach, birinchi navbatda ziddiyatlarni nega qidirishni bilaman.
- [ ] Har javobdagi manba raqamini bosib tekshiraman.
- [ ] Audiodan olingan raqamlarni ko‘r-ko‘rona qabul qilmayman.
