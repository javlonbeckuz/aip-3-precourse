# Botdan foydalanish: xodimlar va rahbar uchun qo‘llanma

Bu qo‘llanmaning birinchi qismini xodimlarga yuboring (4-to‘plam suhbatidan keyin).
Ikkinchi qism - Siz (rahbar) va loyiha yetakchisi uchun.

## 1. Xodimlar uchun

Bu bot - «Savdo yordamchisi» (sizning kompaniyangizda boshqa nom bo‘lishi mumkin).
U kompaniyaning narxlari, qoidalari va ombor ma’lumotlariga qarab savolingizga javob beradi.
Javobni bilmasa yoki savol rahbar qarorini talab qilsa, savolingizni mas’ul xodimga yuboradi.

Qanday foydalaniladi:
1. Botni oching va `/start` bosing.
2. Savolni oddiy matn bilan yozing, xuddi hamkasbingizga yozgandek: «Optima stolidan 8 ta kerak, qancha bo‘ladi?»
3. Javob ostida ikkita tugma bor:
   - ✅ To‘g‘ri - javob to‘g‘ri;
   - ❌ Xato - javobda xato bor.
     Bot nima noto‘g‘ri ekanini so‘raydi: bitta xabar bilan qisqa yozing.
4. Yangi mavzuga o‘tsangiz, `/yangi` yozing: bot oldingi savollarni unutadi.

Bilib qo‘ying:
- ❌ bosish - yordam: har bir xato bot yaxshilanishi uchun yoziladi; xatoni topgan odam hech qachon ayblanmaydi.
- Savol va javoblar faqat sifatni tekshirish uchun saqlanadi; ular kimningdir ishini baholash uchun ishlatilmaydi.
- Bot ish vaqtidan tashqarida sizga o‘zi xabar yubormaydi.
- Bot hozircha faqat matnni tushunadi: ovozli xabar va rasm yubormang.
- Muhim qarorni (katta chegirma, muddat) bot emas, mas’ul xodim qabul qiladi.

Namuna suhbat (xodim ko‘rinishi): `samples/suhbat-xodim.png`.

![Xodim ko‘rinishi](samples/suhbat-xodim.png)

## 2. Rahbar va loyiha yetakchisi uchun

`OWNER_CHAT_ID` (Siz) va `ADMIN_USER_IDS` (loyiha yetakchisi) qo‘shimcha buyruqlarni ishlata oladi.

| Buyruq | Nima qiladi | Qachon |
|---|---|---|
| `/holat` | Bot ishlayaptimi, qaysi model, ma’lumotlar qachon yangilangan | Har kuni bir marta yoki shubha bo‘lsa |
| `/hisobot` | Bugungi raqamlar | Istalgan payt |
| `/hafta` | 5-to‘plam B shakli uchun Markdown va CSV fayl | Haftalik ko‘rib chiqish oldidan |
| `/xatolar` | Oxirgi 14 kunda ❌ belgilangan javoblar | 5-darsdagi yaxshilash halqasi uchun |
| `/xarajat` | Bugun va shu oy model xarajati, OpenRouter kalitida qolgan limit | Haftasiga bir marta |
| `/stop` | Botni darhol to‘xtatadi: xodimlarga «vaqtincha to‘xtatilgan» deydi | 5-to‘plam A.7 dagi to‘xtatish sharti bajarilsa |
| `/davom` | Botni qayta yoqadi | Muammo hal bo‘lgach |
| `/ruxsat 5004445566 Bekzod` | Xodimga kirish beradi | 4-to‘plam suhbatidan keyin |
| `/taqiq 5004445566` | Kirishni olib tashlaydi | Xodim ketsa yoki loyihadan chiqsa |
| `/id` | Telegram ID raqamingiz | Sozlashda |
| `/eslab_qol fakt` | Yordamchi faktni eslab qoladi va har bir javobda hisobga oladi | Xatolar jurnalidan saboq chiqqanda, yangi qoida paydo bo‘lganda |
| `/xotira`, `/unut 2` | Eslab qolingan faktlar ro‘yxati; 2-faktni o‘chirish | Haftalik ko‘rib chiqishda |
| `/jadval 09:00 savol` | Har ish kuni shu vaqtda ma’lumotdan javob tayyorlab yuboradi | «Har kuni ertalab menga ... ni yubor» kerak bo‘lganda |
| `/jadval`, `/jadval_ochir 1` | Jadvaldagi ishlar ro‘yxati; telefondan qo‘shilgan 1-ishni o‘chirish | Kerak bo‘lganda |
| `/eslat 15:00 matn` | Shu vaqtda eslatma yuboradi (vaqt o‘tgan bo‘lsa, ertaga) | Istalgan payt |
| `/darhol narx qoldiq` | Faqat shu mavzulardagi javoblar xodimga darhol boradi, qolgani tasdiqqa; `/darhol` - hozirgi rejim, `/darhol standart` - `.env` dagi rejimga qaytish | Sinovning 2-haftasi (`agent/approval.qollanma.md`) |
| Faylni botga yuborish | Yangi eksport (masalan, `ombor-1c.csv`): bot tekshiradi va keyingi savoldan ishlatadi; xatoli fayl rad etiladi, eski ma’lumot qoladi | Har kuni 1C dan eksport qilgach |

Shu buyruqlar bilan bot kursda va’da qilingan shaxsiy AI yordamchi vazifasini bajaradi: serverda kecha-kunduz ishlaydi, uni telefondan boshqarasiz, u eslab qoladi, jadval bo‘yicha ishlaydi va eslatadi.

Bot o‘zi yuboradigan xabarlar (faqat Sizga):
- Har kuni `DAILY_REPORT_TIME` da kechagi hisobot: so‘rovlar, javoblar, odamga uzatilganlar, xatolar, xarajat.
- Har dushanba haftalik 5-to‘plam fayli.
- Jadvaldagi ishlar (`agent/schedule.toml` va `/jadval`) va eslatmalar (`/eslat`).
- Ogohlantirishlar: xarajat limiti tugadi yoki 80% ga yetdi, ma’lumot fayli bo‘sh yoki eski, token boshqa joyda ishlayapti (409), bot qayta ishga tushdi.

Hisobotda xodim ismlari va kim qancha savol bergani yo‘q: bot jarayonni o‘lchaydi, odamni emas.

### Odamga uzatilgan savolga javob berish

Bot «🙋 Odamga uzatildi» xabarini yuboradi: kimdan, savol va sabab.
Shu xabarga Telegram’da reply qiling (xabarni chapga suring yoki bosib «Reply» ni tanlang) va javobni yozing.
Bot javobingizni «Xodim javobi:» deb xodimga yetkazadi va Sizga «✅ yuborildi» deydi.

### Javob loyihasini tasdiqlash (`REPLY_MODE=approve`)

1-haftada har bir javob avval tekshiruvchiga keladi: «📝 Javob loyihasi».
- «✅ Yuborish» - javob xodimga boradi.
- «❌ Rad etish» - javob yuborilmaydi va xato sifatida yoziladi.
- Loyihaga reply qilib to‘g‘ri javobni yozsangiz, bot Sizning javobingizni yuboradi; bu ham xato sifatida hisoblanadi (B.3).

### Mavzuga qarab tasdiq (`REPLY_MODE=topics`, 2-hafta)

2-haftada narx va qoldiq javoblari xodimga darhol boradi, qolganlari (chegirma, yetkazish muddati va boshqalar) tekshiruvchiga «📝 Javob loyihasi» bo‘lib keladi.
Tugmalar va reply xuddi yuqoridagidek ishlaydi.
Rejimni telefondan o‘zgartirish: `/darhol narx qoldiq`, `/darhol hammasi`, `/darhol yo‘q`; batafsil: `agent/approval.qollanma.md`.

Namuna (rahbar ko‘rinishi): `samples/suhbat-rahbar.png`.

![Rahbar ko‘rinishi](samples/suhbat-rahbar.png)

## Ko‘p uchraydigan xatolar

| Holat | Nima uchun | Nima qilish |
|---|---|---|
| Xodimga «Bu bot faqat ... xodimlari uchun» deyildi | Uning ID raqami ro‘yxatda yo‘q | Xodim raqamini Sizga yuboradi, Siz `/ruxsat ID Ism` |
| `/stop` yozdim, «faqat rahbar uchun» dedi | Sizning ID `OWNER_CHAT_ID` yoki `ADMIN_USER_IDS` da yo‘q | `.env` ni tekshiring, `deploy.py env` |
| Reply qildim, lekin javob xodimga bormadi | Reply boshqa xabarga qilingan | Aynan «🙋 Odamga uzatildi» xabariga reply qiling |
| Kechqurun uzatilgan savol ertalab keldi | Ish vaqti qoidasi (`WORK_HOURS`) | Shunday bo‘lishi kerak; Sizga (rahbarga) darhol keladi |
| Hisobot kelmadi | `DAILY_REPORT_TIME` bo‘sh yoki bot to‘xtagan | `/holat`, `deploy.py status` |

Bajarildi, agar: xodim savol berib, ✅ yoki ❌ bosa oladi; Siz `/hisobot` va `/stop` ishlatib ko‘rdingiz; uzatilgan savolga reply bilan javob berdingiz.
