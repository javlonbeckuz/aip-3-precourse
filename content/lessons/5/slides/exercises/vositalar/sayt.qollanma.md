# sayt.py: o‘z subdomeningizda HTTPS sahifa (qo‘llanma)

Bu vosita serveringizga kichik sahifa qo‘yadi va unga qulf belgisi (HTTPS) beradi: masalan, `https://forma.barakaoffice.uz`.
Bot bilan bir serverda ishlaydi, botga tegmaydi.
Assistent uchun shart emas: bot Telegram orqali ishlaydi.
Darsdagi mashq: `../03-domen-va-https.md`.

## Ichida nima bor

| Fayl | Nima qiladi |
|---|---|
| `sayt.py` | Noutbukda ishlaydi: `sayt/` papkasini arxivlaydi (yashirin fayllarsiz), serverga yuboradi va `sayt-sozlash.sh` ni ishga tushiradi. Server manzilini `.env` dagi `DEPLOY_HOST` dan o‘zi oladi |
| `sayt-sozlash.sh` | Serverda ishlaydi: Caddy’ni rasmiy manbadan o‘rnatadi, firewall’da 80 va 443 ni ochadi, sahifani `/var/www/sayt` ga qo‘yadi, Caddy’ni sozlaydi, DNS va HTTPS ni tekshiradi |

Ikkalasi ham `app/deploy/` papkasiga, `deploy.py` yoniga qo‘yiladi.

## Boshlashdan oldin kerak

| Nima | Qayerdan | Tekshirish |
|---|---|---|
| Ishlayotgan server va `DEPLOY_HOST` | 2-mashq | `deploy.py status` `active (running)` |
| Domen | Registrator (masalan, Airnet), `.uz` domen yiliga taxminan 27 000 so‘m | Panelda «faol» |
| A yozuvi | Domen panelidagi DNS bo‘limi: nom `forma`, qiymat - server IP | `nslookup forma.barakaoffice.uz 1.1.1.1` server IP ni ko‘rsatadi |
| `sayt/` papkasi, ichida `index.html` | 3-mashq, 2-qadam: Claude yozadi yoki 3-darsdagi lid formasi | Brauzerda faylni ochib ko‘ring |

## Qanday ishlatiladi

Claude Code’ga (`app/` papkasida):

```text
"uv run python deploy/sayt.py forma.barakaoffice.uz sayt" ni ishga tushir va har bosqichni bir gapda tushuntir.
```

| Qism | Nima yoziladi | Qayerdan |
|---|---|---|
| `forma.barakaoffice.uz` | Subdomeningiz, `https://` siz va `/` siz | A yozuvidagi nom + domeningiz |
| `sayt` | Sahifa papkasi (`app/` ichida) | 3-mashq, 2-qadam |
| `--test-local` (ixtiyoriy) | Haqiqiy domen yo‘q bo‘lsa, mashq uchun: Caddy’ning o‘z test sertifikati | Faqat sinash uchun; brauzer uni tanimaydi |

Qayta ishga tushirsangiz, zarar yo‘q: sahifa fayllari va Caddy sozlamasi yangilanadi, bot o‘zgarmaydi.
Sahifani o‘zgartirdingizmi?
Xuddi shu buyruqni qayta ishga tushiring.

## Namuna: «Baraka Office»

Kirish: `sayt/index.html` - 3-darsdagi lid formasi (`examples/lead-form/index.html` dan nusxa).
Buyruq: `uv run python deploy/sayt.py forma.barakaoffice.uz sayt`.
To‘liq natija, DNS tayyor bo‘lmagan holat: `../namuna/natijalar/10b-sayt-dns-tayyor-emas.txt`.
To‘liq natija, test sertifikati bilan: `../namuna/natijalar/10-sayt-test.txt`.
DNS tayyor bo‘lganda oxirgi qatorlar:

```text
==> 5/5 Tekshiruv: DNS va HTTPS
DNS: forma.barakaoffice.uz -> 203.0.113.10 (shu server). To'g'ri.

==> Tayyor: https://forma.barakaoffice.uz ochiladi (HTTPS, qulf belgisi bilan).
Sertifikatni Caddy o'zi yangilab turadi. Telefoningizda ham oching.
```

## Ko‘p uchraydigan xatolar

| Ekranda | Sabab | Yechim |
|---|---|---|
| `... domen emas. Namuna: forma.barakaoffice.uz` | Manzil xato yozilgan (bo‘sh joy, `http://...` qismi to‘liq emas) | Faqat `forma.barakaoffice.uz` |
| `... ichida index.html yo'q` | Papkada bosh sahifa yo‘q yoki boshqacha nomlangan | Bosh sahifa nomi aynan `index.html` |
| `Qaysi server? .env ga DEPLOY_HOST=...` | `.env` da `DEPLOY_HOST` yo‘q | 00-dars-oldidan, 1-qadam |
| `DIQQAT: ... hech qaysi IP manzilga qaramayapti` | A yozuvi yo‘q yoki hali tarqalmagan | Panelni tekshiring; to‘g‘ri bo‘lsa, kuting: Caddy o‘zi qayta urinadi |
| `DIQQAT: ... boshqa manzilga qarayapti` | A yozuvi eski yoki boshqa server IP sida | A yozuvini tuzating |
| `Caddy sozlamasi xato: hech narsa o'zgarmadi` | Kutilmagan holat | Skrinshot, mentor; eski sozlama joyida qoldi |

## Saytni o‘chirish

```text
Serverda Caddy saytini o'chir: "systemctl disable --now caddy", keyin "ufw delete allow 80/tcp" va "ufw delete allow 443/tcp". pilot-bot ga tegma.
```

## Tayyor bo‘ldi, agar

- [ ] Telefonda `https://<subdomen>` ochiladi, manzil satrida qulf.
- [ ] Qulfni bossangiz, sertifikat beruvchi «Let’s Encrypt».
- [ ] Botga `/holat`: bot ham ishlayapti.

Sinov: 2026-11-03, Docker ichidagi toza Ubuntu 24.04 va 26.04, Caddy v2.11.7 (rasmiy Debian/Ubuntu ombori).
Sahifa test sertifikati bilan HTTPS orqali ochildi, server qayta yuklangandan keyin ham ishladi; DNS tayyor bo‘lmagan holatdagi ogohlantirish chiqdi.
Haqiqiy Let’s Encrypt sertifikati sinovda olinmadi (konteynerda ochiq domen yo‘q).
Kod testlari: `day-4/_build/tests/test_sayt.py` (18 ta, internetsiz).
