# Gemini Notebook: AI faqat sizning hujjatlaringizdan javob beradi

25 daqiqalik mashq: o‘z kompaniyangiz hujjatlarini yuklaysiz, savol berasiz, ziddiyatlarni topasiz va test yoki audio yaratasiz.
Gemini Notebook bu NotebookLM’ning yangi nomi (2026-yil iyulda o‘zgargan).
Manzil: **notebook.google.com** (eski notebooklm.google.com manzili ham shu yerga olib keladi).

## Bu nima uchun kerak

Oddiy chat internetdan o‘rgangan bilimi bilan javob beradi va adashishi mumkin.
Gemini Notebook esa faqat siz yuklagan hujjatlardan javob beradi va har bir javobda manba raqamini ko‘rsatadi.
Bu ochiq kitob imtihoniga o‘xshaydi: javob kitobda bo‘lsa topadi, bo‘lmasa «hujjatlarda yo‘q» deydi.

## Qaysi hujjatlarni yuklash mumkin

- O‘zingizniki: narxlar ro‘yxati, ichki tartib qoidalari, shartnoma shabloni, tijoriy taklif, yo‘riqnoma.
- Yoki o‘quv to‘plami: «Baraka Office» MChJ hujjatlari (mentoringiz Telegram guruhga tashlaydi).
- PDF, Word, Markdown, CSV, Google Docs, audio va veb-sahifa yuklanadi.
  Excel faylini CSV yoki PDF qilib yuklang.

> **Yuklamang:** mijoz yoki bemor ro‘yxati, tashxis va tahlil natijalari, pasport ma’lumotlari, maosh varag‘i, parollar.
> **Mumkin:** prays-list, xizmatlar ro‘yxati, ichki tartib, shartnoma shabloni.
> Mashq uchun maxfiy bo‘lmagan hujjat yetarli.

## Qadamlar (16 daqiqa)

1. notebook.google.com ni oching va Google akkauntingiz bilan kiring.
2. Yangi daftar (notebook) yarating (tayyorgarlik darsida ochgan «Sinov» daftaringiz ham bo‘ladi).
3. **Sources** (manbalar) bo‘limiga 3-5 ta hujjat yuklang va ular o‘qib bo‘linishini kuting.
4. **Chat** bo‘limida 3 ta savol bering.
   Har bir javobdagi kichik raqamni bosing: hujjatning qaysi joyidan olingani ochiladi.
   Raqam to‘g‘ri joyni ko‘rsatyaptimi, tekshiring.
5. Pastdagi ziddiyat promptini yuboring.
6. O‘zbekcha test so‘rang (pastdagi prompt) yoki **Studio** bo‘limida **Audio Overview** yarating (faqat rus yoki ingliz tilida).

**Tayyor bo‘ldi:** 3 ta javob manba raqami bilan va kamida bitta topilgan ziddiyat.

## 3 ta savol

Baraka Office hujjatlari bilan ishlasangiz:

```text
Mijoz 20 ta «Optima» stoli olmoqchi. Ulgurji narx bilan jami qancha bo‘ladi va oddiy sotuvchi qancha chegirma bera oladi?
```

```text
Kreslo mexanizmiga kafolat necha oy? Hujjatlar bu borada bir xil gapiryaptimi?
```

```text
Yangi sotuvchiga oylik va bonus qaysi sanada beriladi?
```

O‘z hujjatlaringiz bilan ishlasangiz, shu qolipda so‘rang:

```text
[Mahsulot yoki xizmat] narxi qancha va qanday chegirma qoidasi bor? Faqat yuklangan hujjatlardan javob ber, manbasini ko‘rsat.
```

```text
Yangi xodim birinchi haftada bilishi shart bo‘lgan 10 ta qoidani ro‘yxat qil. Har biriga manba ko‘rsat.
```

```text
Mijoz [tez-tez beriladigan savol] deb so‘rasa, hujjatlarga ko‘ra qanday javob berishimiz kerak?
```

## Ziddiyatlarni toping

Bu eng kuchli mashq: shartnoma bir narsa deydi, sotuvchi boshqa narsa va’da qiladi, AI buni besh daqiqada topadi.

```text
Yuklangan barcha hujjatlarni solishtirib chiq.
Raqamlar, muddatlar, narxlar, chegirmalar, kafolat va ichki qoidalar bir-biriga zid kelgan joylarni top.
Har birini jadval qil: mavzu, 1-manba nima deydi, 2-manba nima deydi, ikkala manbadan iqtibos, biznes uchun xavfi.
Manbada yo‘q narsani to‘qima.
```

Baraka Office hujjatlariga 4 ta ziddiyat ataylab qo‘yilgan.
Nechtasini topdingiz?

## Studio: test yoki audio

**Audio Overview o‘zbek tilida chiqmaydi.**
O‘zbek tili Gemini Notebook’ning rasmiy javob tillari ro‘yxatida yo‘q, shuning uchun audio faqat rus yoki ingliz tilida bo‘ladi.
Audio tilini rus yoki ingliz qilib tanlang.

**O‘zbekcha natija kerak bo‘lsa: test (Quiz).**
Chatga o‘zbekcha yozing:

```text
Yangi sotuv menejeri uchun 5 ta savollik test tuz: har bir savolga 3 ta javob varianti, to‘g‘ri javobi va manbasi bilan. O‘zbek tilida yoz.
```

3-noyabrdagi sinovda chatda o‘zbekcha test chiqdi va Studio bo‘limida ham o‘zbekcha interaktiv test paydo bo‘ldi.
Testni avval o‘zingiz yeching: xato javob bo‘lsa, manbani tekshiring.

**Mind Map** (aqliy xarita): hujjatlardagi mavzular bitta xaritada; tilga bog‘liq emas, tez tayyorlanadi.

Zalda 40 kishi bir vaqtda audio boshlasa, navbat bo‘lishi mumkin.
Darsda testdan boshlang, audioni uyda tayyorlang.

Tayyor natijalar namunasi: `namuna-natijalar.md` (Baraka Office hujjatlari bilan haqiqiy javoblar va ularni qanday tekshirish).

## Uyda davom ettirish

- Kompaniyangizning 5-10 ta asosiy hujjatini bitta daftarga yig‘ing.
- Ziddiyat promptini ishga tushiring va topilganlarni mas’ul xodim bilan tekshiring.
- Daftarni bitta xodimga ko‘rsating: u bir hafta davomida savollarini shu yerdan so‘rasin.
- To‘plam 1 suhbatlaringiz matnini ham shu daftarga qo‘shsangiz, «xodimlar aytgan» va «hujjatda yozilgan» o‘rtasidagi farqlarni ko‘rasiz.

## Muammo bo‘lsa

| Muammo | Nima qilish kerak |
| --- | --- |
| Hujjat yuklanmayapti | Excel bo‘lsa CSV yoki PDF qiling; fayl 200 MB dan kichik bo‘lsin |
| Javob inglizcha keldi | «O‘zbek tilida javob ber» deb qo‘shing |
| Javobda manba raqami yo‘q | «Har bir gapga manba ko‘rsat» deb qayta so‘rang |
| Audio uzoq tayyorlanyapti | Chatda o‘zbekcha test so‘rang yoki Mind Map qiling, audio keyin |
| Audio o‘zbekcha chiqmadi | Bu kutilgan holat: audio faqat rus yoki ingliz tilida; o‘zbekcha uchun test so‘rang |
| «Limitga yetdingiz» yozuvi | Bir necha soatdan keyin yoki ertaga davom ettiring; uyda tugating |
