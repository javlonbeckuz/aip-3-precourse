# Yomon CLAUDE.md: nima xato va qanday tuzatiladi

Yonidagi `CLAUDE.md` ni ataylab yomon yozdik.
Bunday fayllar darsda ko‘p uchraydi.
Har bir xatoni toping, keyin to‘g‘ri namuna bilan solishtiring: `../baraka-office/kompaniya/CLAUDE.md`.

Muhim: bu fayldagi login, parol va token soxta.
Haqiqiy faylda ular bo‘lsa, darhol o‘chiring va parolni almashtiring.

## 9 ta xato

| № | Fayldagi qator | Nima xato | To‘g‘risi |
|---|---|---|---|
| 1 | «Sen dunyodagi eng zo‘r biznes konsultantsan» | Maqtov Claude’ga hech narsa bermaydi: u baribir sizning kompaniyangizni bilmaydi. Joy va diqqat behuda ketadi. | Rol emas, fakt yozing: nima qilasiz, kimga, qayerda, qancha xodim. |
| 2 | «Narxlarimiz arzon, sifatimiz yuqori, yetkazib berish tez» | Sifat so‘zlari, bitta ham raqam yo‘q. Claude «tez» degani 1 kunmi yoki 7 kunmi, bilmaydi. | «Yetkazish: oldindan to‘lovdan 7 ish kuni.» |
| 3 | «Hamma narsani tez qil, savol berma» | Claude taxmin qiladi va xato qiladi. Kursdagi asosiy odat buning teskarisi: «Meni intervyu qil». | «Yozishdan oldin menga savol ber, bir xabarda 3 tadan ko‘p emas.» |
| 4 | «Kerakli chegirmani ber, mijoz ketib qolmasin» | Xavfli qoida: Claude marjani kuydiradigan javob yozishi mumkin. Rasmiy chegara (5% va 10%) yozilmagan. | «Chegirma: sotuvchi 5% gacha, ROP yozma ruxsati bilan 10% gacha, undan yuqori taqiqlangan.» |
| 5 | «Yetkazib berishni 3 kun deb ayt» | Shartnomada 7 ish kuni. Endi Claude mijozga yolg‘on va’da yozadi va siz buni o‘zingiz o‘rgatgansiz. | Faqat rasmiy hujjatdagi muddat, va qaysi hujjatdan olingani. |
| 6 | «Eski fayllarni o‘zing tozalab tur» | Claude’ga o‘chirishga ruxsat berildi. Kerakli fayl yo‘qolishi mumkin. | «Faylni o‘chirishdan yoki ustidan yozishdan oldin mendan so‘ra.» |
| 7 | Login, parol, bot tokeni | Eng xavfli xato. CLAUDE.md oddiy matn fayl: uni nusxalash, kimgadir yuborish, GitHub’ga yuklash oson. Token bilan begona odam botingizni boshqaradi. | Kalitlar faqat `.env` faylida. CLAUDE.md da: «Kalit va parollar faqat .env faylida turadi.» |
| 8 | «Ingliz tilida yoz, menga o‘zbekcha tushuntir, qisqa va batafsil bo‘lsin» | Bir-biriga zid ko‘rsatmalar. Rasmiy hujjatda ham aytilgan: ikki qoida zid bo‘lsa, Claude ulardan birini tasodifan tanlaydi. | Bitta aniq qoida: «Men bilan o‘zbek tilida, oddiy gaplar bilan gaplash.» |
| 9 | 14 sahifalik prays-list shu yerga ko‘chirilgan | CLAUDE.md har safar to‘liq o‘qiladi: uzun fayl kontekstni to‘ldiradi va qoidalarga e’tibor kamayadi (rasmiy tavsiya: 200 qatordan kam). Narx o‘zgarsa, ikki joyda yangilash kerak bo‘ladi. | Prays-listni `hujjatlar/` ga qo‘ying va CLAUDE.md da faqat fayl nomini yozing. |

Yana nima yo‘q: «Kitlar» bo‘limi.
U bo‘lmasa, /kit1 ... /kit5 skill’lari fayllarni qayerdan izlashni bilmaydi.

## Qanday tekshirasiz

Claude Code’ni kompaniya papkasida oching va so‘rang:

```text
CLAUDE.md faylimni o‘qi. Unda zid qoidalar, xavfli ruxsatlar, parol yoki kalitlar, raqamsiz sifat so‘zlari va 200 qatordan uzun joylar bormi? Har birini qator raqami bilan jadval qilib ko‘rsat. Hech narsani o‘zgartirma, faqat ro‘yxat ber.
```

Kutiladigan natija: Claude yuqoridagi 9 ta xatoning kamida 7 tasini topadi, parol va tokenni birinchi o‘ringa qo‘yadi.
Topmasa, savolni boshqacha so‘rang: «Bu faylni xavfsizlik bo‘yicha mutaxassis sifatida tekshir.»

## Manba

- CLAUDE.md hajmi va zid qoidalar haqida: https://code.claude.com/docs/en/memory (2026-11-03 da tekshirildi): «target under 200 lines per CLAUDE.md file», «if two instructions contradict each other, Claude may pick one arbitrarily».
