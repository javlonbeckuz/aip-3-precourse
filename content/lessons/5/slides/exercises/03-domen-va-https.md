# 3-mashq. Domen va HTTPS yoki bot (kengaytma, 1:30-1:40 va uyda)

**Natija (ikki yo‘ldan biri):**

- **Bot yo‘li (hamma uchun yetarli):** assistent serverdan Telegram orqali ishlaydi.
  2-mashq tayyor bo‘lsa, bu yo‘l ham tayyor: Telegram bot uchun domen kerak emas.
- **Domen yo‘li (kengaytma):** o‘z subdomeningizda (masalan, `forma.barakaoffice.uz`) ochiq sahifa, qulf belgisi (HTTPS) bilan, telefondan ochiladi.

Domen yo‘li faqat 2-mashq tugaganlar uchun.
Domen bo‘lmasa yoki DNS hali tarqalmagan bo‘lsa, bot yo‘li bilan to‘xtang: mentor 4.8 ni «bot serverdan ishlaydi» deb belgilaydi.

## Bu nima: uchta so‘z, bitta rasm

Rasm: `demos/03-domen-dns-https/diagramma.html` (darsda ekranda ko‘rsatiladi).

- **IP manzil** - serverning telefon raqami: `203.0.113.10`.
  Kompyuterlar faqat raqamni tushunadi.
- **Domen** - shu raqamning odam eslab qoladigan ismi: `barakaoffice.uz`.
  **Subdomen** - ism oldiga qo‘shilgan so‘z: `forma.barakaoffice.uz`, `bot.barakaoffice.uz`. Bitta domen, ko‘p manzil.
- **DNS** - telefon kitobi: ismni raqamga bog‘laydi.
  Kitobga yozuvni Siz domen panelida qo‘shasiz: **A yozuvi** «forma -> 203.0.113.10».
  Yozuv butun internetga bir necha daqiqadan bir necha soatgacha tarqaladi.
- **HTTPS** - manzil satridagi qulf belgisi: sayt bilan telefon orasidagi gap shifrlangan.
  Qulfsiz formaga mijoz telefon raqamini yozishga ishonmaydi.
  Qulfni sertifikat beradi; uni **Let’s Encrypt** bepul beradi.
- **Caddy** - serverdagi «qabulxona»: kelgan mehmonni kerakli eshikka yo‘naltiradi va sertifikatni o‘zi olib, o‘zi yangilaydi.
  Dasturchi smetasida bu ish ko‘pincha **Nginx** deb yoziladi: vazifasi bir xil.

## Boshlashdan oldin kerak

| Nima | Tekshirish |
|---|---|
| 2-mashq tayyor | Noutbuk yopiq holda bot javob bergan |
| Domen | Registrator panelida domen «faol» |
| A yozuvi | `00-dars-oldidan.md`, 3-qadam; chorshanba kuni qo‘shilgan bo‘lsa yaxshi |
| Ikkita fayl: `sayt.py` va `sayt-sozlash.sh` | Stol chatidagi `4-dars-materiallar.zip` ichida |

## 1-qadam. DNS tayyormi (2 daqiqa)

Claude Code’ga (o‘z subdomeningiz bilan):

```text
"nslookup forma.barakaoffice.uz 1.1.1.1" ni ishga tushir. Javobdagi IP manzil .env dagi serverim IP manzili bilan bir xilmi?
.env ni ochma: men IP ni o'zim aytaman: 203.0.113.10
```

- Bir xil: 2-qadamga o‘ting.
- `NXDOMAIN` yoki boshqa IP: A yozuvini tekshiring (nom faqat `forma`, qiymat faqat raqam, `http://` siz).
  Yozuv to‘g‘ri bo‘lsa, kuting: tarqalish bir necha soat olishi mumkin.
  Kutayotganda ham 3-qadamni qilsangiz bo‘ladi: Caddy DNS tayyor bo‘lishi bilan sertifikatni o‘zi oladi.

## 2-qadam. Sayt papkasi (3 daqiqa)

Saytga faqat ochiq bo‘lishi mumkin bo‘lgan fayllar boradi.
Shuning uchun ular uchun alohida `sayt/` papka qilamiz.
Claude Code’ga:

```text
app ichida "sayt" papkasini yarat.
3-darsdagi lid formam bo'lsa (examples/lead-form/index.html), faqat shu index.html ni sayt/ ga nusxala.
Bo'lmasa, sayt/index.html ga kompaniyam uchun bitta oddiy sahifa yoz: nomi, nima bilan shug'ullanishi, telefon raqami
va Telegram botimga havola (t.me/BOT_NOMI). Telefonda chiroyli ko'rinsin, tashqi fayl va shriftlarsiz.
sayt/ ga .env, kod yoki xodimlar ma'lumotini qo'yma.
```

## 3-qadam. Joylash (5 daqiqa)

Avval ikkita faylni `app/deploy/` ga qo‘ying.
Claude Code’ga:

```text
Yuklanmalar papkasidagi 4-dars-materiallar.zip ichidan sayt.py va sayt-sozlash.sh ni app/deploy/ ga nusxala.
Keyin "uv run python deploy/sayt.py forma.barakaoffice.uz sayt" ni ishga tushir va har bosqichni bir gapda tushuntir.
```

`forma.barakaoffice.uz` o‘rniga o‘z subdomeningizni yozing.
Skript serverda 5 ish qiladi: Caddy’ni o‘rnatadi, firewall’da 80 va 443 portlarini ochadi, sahifani joylaydi, Caddy’ni sozlaydi, DNS va HTTPS’ni tekshiradi.

Kutilgan natija, DNS tayyor bo‘lsa (oxiri):

```text
==> 5/5 Tekshiruv: DNS va HTTPS
DNS: forma.barakaoffice.uz -> 203.0.113.10 (shu server). To'g'ri.

==> Tayyor: https://forma.barakaoffice.uz ochiladi (HTTPS, qulf belgisi bilan).
Sertifikatni Caddy o'zi yangilab turadi. Telefoningizda ham oching.
```

DNS hali tayyor bo‘lmasa (`namuna/natijalar/10b-sayt-dns-tayyor-emas.txt`):

```text
==> 5/5 Tekshiruv: DNS va HTTPS
DIQQAT: forma.barakaoffice.uz hali hech qaysi IP manzilga qaramayapti (DNS yozuvi yo'q yoki hali tarqalmagan).
Domen panelida A yozuvi qo'shing: nom = forma, qiymat = serveringiz IP manzili.

==> Caddy sozlandi, lekin https://forma.barakaoffice.uz hali ochilmadi.
DNS tayyor bo'lishi bilan Caddy sertifikatni o'zi oladi: qayta ishga tushirish shart emas.
```

Bu holatda hech narsani qayta qilmaysiz: kechqurun telefonda manzilni oching.

## 4-qadam. Telefonda tekshiring

Telefon brauzerida `https://forma.barakaoffice.uz` ni to‘liq yozing.
Manzil satrida qulf belgisi bor, sahifa ochiladi.
Qulfni bosing: «Connection is secure» va sertifikat beruvchi «Let’s Encrypt».

## Baraka namunasi

Rustamov S.A. chorshanba kuni Airnet panelida `forma` uchun A yozuvi qo‘shdi (qiymat - server IP).
Dars kuni `nslookup` server IP manzilini ko‘rsatdi.
`sayt/` papkasiga 3-darsdagi lid formasi (`examples/lead-form/index.html`) nusxalandi va `sayt.py` bilan joylandi.
Endi `https://forma.barakaoffice.uz` - Baraka Office’ning qulfli sahifasi: forma Google Sheets’ga yozadi va Telegram’ga xabar beradi (3-dars namoyishi).
Sinovimizda (Docker, 2026-11-03) shu sahifa Caddy orqali HTTPS bilan ochildi va server qayta yuklangandan keyin ham bot bilan birga o‘zi qaytdi (`namuna/natijalar/10-sayt-test.txt`).
Haqiqiy Let’s Encrypt sertifikati sinovda olinmadi: konteynerda ochiq domen yo‘q, Caddy’ning o‘z test sertifikati (`--test-local`) ishlatildi.

## Yomon namunalar va tuzatish

| Yomon | Nima xato | Tuzatish |
|---|---|---|
| A yozuvi: nom `forma.barakaoffice.uz`, qiymat `http://203.0.113.10` | Ko‘p panel nomga domenni o‘zi qo‘shadi: `forma.barakaoffice.uz.barakaoffice.uz` bo‘lib qoladi; qiymatda faqat raqam bo‘lishi kerak | Nom: `forma`. Qiymat: `203.0.113.10` |
| `sayt.py forma.barakaoffice.uz .` (butun `app/` papkasi) | `.env` yashirin fayl sifatida yuborilmaydi, lekin `data/` (narxlar, 1C qoldig‘i) va kod internetga ochiladi | Faqat `sayt/` papkasi; unda faqat ochiq sahifa |
| Saytni `http://203.0.113.10:8000` da ochish | IP bilan qulf (HTTPS) bo‘lmaydi; ochiq port - qo‘shimcha eshik | Faqat domen orqali; 80 va 443 dan boshqa portni ochmang |
| DNS tarqalmagan, Claude’ga «HTTPS’ni majburan ol» deyish | Let’s Encrypt DNS tayyor bo‘lmaguncha sertifikat bermaydi; ko‘p urinish limitga uriladi | Kuting; Caddy o‘zi qayta urinadi |

## Orqaga qaytarish (saytni o‘chirish)

Claude Code’ga:

```text
Serverda Caddy saytini o'chir: "systemctl disable --now caddy", keyin firewall'dan "ufw delete allow 80/tcp" va "ufw delete allow 443/tcp". Bot (pilot-bot) ga tegma.
```

## Tayyor bo‘ldi, agar

- [ ] Bot yo‘li: 2-mashq tayyor (mentor 4.8 ni «bot» deb belgilaydi).
- [ ] Yoki domen yo‘li: telefonda `https://<subdomen>` qulf bilan ochiladi (mentor 4.8 ni «domen» deb belgilaydi).
- [ ] DNS tarqalmagan bo‘lsa: `sayt.py` ishga tushirilgan, kechqurun tekshirasiz va natijani stol chatiga yozasiz.
