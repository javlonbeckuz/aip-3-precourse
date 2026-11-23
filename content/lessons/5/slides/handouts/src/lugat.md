# 4-dars lug‘ati: server, domen, sinov va odamlar

Qalin yozilgan 7 ta atama darsda jonli ko‘rsatiladi.
Qolganlari - ma’lumotnoma: o‘z ishingizda uchraganda shu yerdan qarang.
Atama tushunarsiz bo‘lsa, Claude’dan so‘rang: «[atama] nima? 5 yoshli bolaga tushuntir».

## Dastur qayerda yashaydi

| Atama | Oddiy so‘z bilan | O‘xshatish yoki namoyish | Biznes uchun nima |
|---|---|---|---|
| **Lokal va server** | Lokal - noutbukingizda; server - boshqa joyda, doim yoqiq turadigan kompyuter | Noutbukni yopasiz: lokal bot «o‘ladi» | Biznes vositasi noutbukka bog‘liq bo‘lmasligi kerak |
| **VPS** | Data markazda ijaraga olingan, faqat Sizniki bo‘lgan kompyuter | Kvartira ijarasi (VPS) va uy sotib olish (Mac mini) | Taxminan 200 000 so‘m/oy; Mac mini $600-800 va tok, internet |
| SSH | Noutbukdan serverga xavfsiz ulanish yo‘li | Claude Code serverga «kirib» ishlaydi | Buyruqlarni o‘rganish shart emas |
| SSH kalit | Parol o‘rniga ikki qismli kalit: yopiq qismi noutbukda, ochiq qismi (.pub) serverda | Ochiq kalit - qulf, yopiq kalit - kalitning o‘zi | Parol chatda aylanmaydi; Claude parol yozmasdan kiradi |
| systemd | Serverdagi «navbatchi»: dasturni ishga tushiradi, yiqilsa qayta turg‘izadi | Botni ataylab o‘ldirdik: 5 soniyada qaytdi | Kecha-kunduz ishlash shundan |
| Uptime | Xizmat qancha vaqt ishlab turgani | 24/7 bot | Server uchun to‘laydigan narsangiz |
| Server muhit o‘zgaruvchilari | Serverning o‘z `.env` fayli: `/opt/pilot/.env` | Kalitlar serverga, GitHub’ga emas | Xavfsizlik qoidasi bir xil, joyi yangi |
| Log | Serverning kundaligi: nima, qachon bo‘ldi | Claude’ga «oxirgi 20 qatorni tushuntir» | Biror narsa buzilsa, birinchi qaraladigan joy |
| Release | Serverga chiqarilgan bitta versiya; oxirgi 5 tasi saqlanadi | `release 20261213-071502` | Orqaga qaytish uchun eski versiya tayyor turadi |
| Rollback | Serverda oldingi yaxshi versiyaga qaytish | `deploy.py rollback`, 3 soniya | Xato arzon, agar qaytarish oson bo‘lsa |
| Staging va production | Sinov nusxasi va jonli nusxa | Avval noutbukda sinash, keyin serverga | Xodimlar faqat ishlaydigan versiyani ko‘radi |
| Shaxsiy yordamchi buyruqlari | Egasi va loyiha yetakchisi telefondan beradigan buyruqlar: `/eslat` (eslatma), `/eslab_qol`, `/xotira`, `/unut` (xotira), `/jadval` (har kungi ish), `/stop`, `/davom` | «Soat 15:30 da tender haqida eslat» | Noutbuk o‘chiq bo‘lsa ham ishlaydi: sotuv sahifasidagi va’da |
| Remote Control | Noutbukda ishlayotgan Claude Code sessiyasini telefondan boshqarish | Mashinadan «tugadimi?» deb so‘rash | Noutbuk **yoqiq** bo‘lishi kerak: bu assistent emas |

## Domen va HTTPS

| Atama | Oddiy so‘z bilan | O‘xshatish yoki namoyish | Biznes uchun nima |
|---|---|---|---|
| **IP manzil, domen, DNS** | Serverning raqami, uning odam eslaydigan ismi va ularni bog‘laydigan telefon kitobi | `forma.barakaoffice.uz` → `203.0.113.10` | Mijozga raqam emas, ism kerak |
| A yozuvi | DNS dagi bitta qator: ism → IP manzil | Domen panelida: nom `forma`, qiymat IP | Bitta qator - bitta subdomen |
| Subdomen | Domen oldiga qo‘shilgan so‘z | `forma.barakaoffice.uz`, `bot.barakaoffice.uz` | Bitta domen, ko‘p vosita |
| DNS tarqalishi | Yangi yozuv internetdagi hamma «kitob»larga yetib borishi | Bir necha daqiqadan bir necha soatgacha | Yozuvni bir kun oldin qo‘shing |
| HTTPS / SSL | Manzil satridagi qulf: telefon va sayt orasidagi gap shifrlangan | Qulfni bosib ko‘rsatish | Qulfsiz formaga mijoz raqamini yozmaydi |
| Let’s Encrypt | Bepul sertifikat beradigan tashkilot; hozir 90 kunlik, 2027-yil fevraldan 64 kunlik | «Qulf»ning hujjati | Pul to‘lamaysiz; yangilashni Caddy o‘zi qiladi |
| Caddy | Serverdagi veb-server: saytni beradi, sertifikatni o‘zi oladi va yangilaydi | Qabulxona | Bir buyruq bilan HTTPS |
| Nginx, reverse proxy | Xuddi shu «qabulxona»ning boshqa, eng keng tarqalgan turi | Har mehmonni kerakli eshikka yo‘naltiradi | Dasturchi smetasida ko‘rsangiz, taniysiz |
| Port, firewall | Port - serverdagi eshik raqami (22 SSH, 80 va 443 sayt); firewall - qaysi eshik ochiqligini hal qiladi | Bizda faqat 22, sayt bo‘lsa 80 va 443 | Ortiqcha ochiq eshik - ortiqcha xavf |

## Git va GitHub

| Atama | Oddiy so‘z bilan | O‘xshatish yoki namoyish | Biznes uchun nima |
|---|---|---|---|
| **Git, commit, push** | Kodning saqlash nuqtalari va ularni GitHub’ga yuborish | O‘yindagi saqlash nuqtasi | Ishlagan versiya hech qachon yo‘qolmaydi |
| GitHub, repo | Kod saqlanadigan joy; repo - bitta loyiha papkasi | «Dasturchilarning YouTube’i» | Noutbuk yo‘qolsa ham kod qoladi |
| Yopiq (private) va ochiq (public) repo | Kodni kim ko‘ra olishi | Kalit ochiq repoda bo‘lsa, bir necha daqiqada o‘g‘irlanadi | Faqat private; faqat `app/` papkasi |
| `.gitignore` | Gitga «bu fayllarga tegma» degan ro‘yxat | `.env`, `runtime/` shu yerda | Kalit tasodifan repoga tushmaydi |
| `git restore` | Faylni oxirgi commit holatiga qaytarish | Noutbukdagi «bekor qilish» | Serverdagi rollback’ning juftligi |

## Sinov va odamlar

| Atama | Oddiy so‘z bilan | O‘xshatish yoki namoyish | Biznes uchun nima |
|---|---|---|---|
| **Sinov (pilot)** | Cheklangan, muddatli, real sinov | 2 hafta, bitta jarayon, 3-5 xodim | Butun bo‘limga yoyishdan oldin arzon o‘rganish |
| Boshlang‘ich raqam (baseline) | Agentgacha bo‘lgan raqamlar | To‘plam 5 B, «Agentgacha» ustuni | Raqamsiz faqat taassurot qoladi |
| **Muvaffaqiyat mezoni va to‘xtatish sharti** | Nima bo‘lsa «ishlayapti» deymiz; nima bo‘lsa darhol to‘xtatamiz | «Mijozga bitta noto‘g‘ri narx = to‘xtatamiz» | Mijozni va pulni himoya qiladi |
| Cheklangan ruxsat | Birinchi hafta agent faqat qoralama yozadi, odam tasdiqlaydi | `REPLY_MODE=approve` | Ishonch bosqichma-bosqich |
| Loyiha yetakchisi | Jarayonni har kuni qiladigan, o‘zi rozi bo‘lgan xodim: qoralamalarni tekshiradi, jurnal yuritadi | Baraka: Malika | Bo‘lim boshlig‘i emas; u imzolaydi va ko‘rib chiqishda bo‘ladi |
| **Almashtirmaymiz, kuchaytiramiz** | Tejalgan vaqt yuqoriroq qiymatli ishga ketadi | Madina: savolni aniqlaydi, javobni tekshiradi | Qo‘rquv xodimni haqiqiy ishni yashirishga majbur qiladi |
| Xatolar jurnali (B.13) | Agentning har bir xatosi: sana, nima bo‘ldi, kim topdi, nimani o‘zgartirdik | ❌ tugmasi va bir gap | 5-darsdagi yaxshilash shu yerdan boshlanadi |
