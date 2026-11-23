# Server xavfsizligi: parol, kalit, yangilanish

Serveringiz - kompaniyangizning bir bo‘lagi: unda bot tokeni, AI kaliti va xodimlar savollari turadi.
Bu kartadagi qoidalar oddiy, lekin har birini 1.0 va 2.0 da kimdir buzgan.

## 1. Parol

- Provayder bergan root parolini **parol menejeriga** saqlang (iPhone «Parollar», Google Password Manager, Bitwarden).
- Parolni hech qachon chatga, guruhga, Claude’ga, mentorga yozmang, ekranda ko‘rsatmang.
- Parolni faqat bir marta, alohida terminal oynasida o‘zingiz yozasiz: SSH kalitni serverga o‘rnatish uchun.
  Keyin Claude Code kalit bilan kiradi.
- Parol ochilib qolsa: provayder panelida darhol almashtiring va mentorga ayting (FAQ S-06).

## 2. SSH kalit

| Qism | Qayerda | Kimga berish mumkin |
|---|---|---|
| Yopiq kalit (`~/.ssh/id_ed25519` yoki `id_vps`) | Faqat noutbukingizda | **Hech kimga** |
| Ochiq kalit (`.pub` bilan tugaydi) | Serverda (`authorized_keys`) | Mentorga, provayderga: bu qulf, kalit emas |

- Noutbuk yo‘qolsa yoki o‘g‘irlansa: provayder panelidagi «konsol» orqali serverga kiring yoki mentor bilan eski kalitni olib tashlang.
- Parol bilan kirishni butunlay o‘chirish (ixtiyoriy, kuchli himoya): `deploy.py setup --harden-ssh`.
  Faqat kalit bilan kirish ishlayotgan bo‘lsa qiling; skript kalit topmasa, o‘zi to‘xtaydi.
  Bajargach, yangi oynada `ssh vps echo ok` ni sinang, eski oynani yopmang.

## 3. Kalitlar va `.env`

- Bot tokeni va OpenRouter kaliti faqat `.env` da: noutbukda (`app/.env`) va serverda (`/opt/pilot/.env`, faqat bot o‘qiy oladi).
- `.env` GitHub’ga tushmaydi (`.gitignore`), repo faqat **private**.
- Claude Code `.env` ni ochmaydi: qatorni o‘zingiz yozasiz, Claude faqat `deploy.py env` ni ishga tushiradi.
- Kalit chatga, GitHub’ga yoki ekranga chiqib qolsa - **darhol almashtiring**, o‘chirish yetarli emas:

    1. Telegram: @BotFather, `/token`, botingizni tanlang: yangi token.
    2. OpenRouter: openrouter.ai/keys da eski kalitni o‘chiring, yangisini oylik limit bilan yarating.
    3. Yangilarini `.env` ga yozing, Claude’ga: `deploy.py env ni ishga tushir`.

## 4. Yangilanishlar

- Xavfsizlik yangilanishlari **avtomatik** o‘rnatiladi: buni `deploy.py setup` yoqib qo‘ygan.
- Oyiga bir marta Claude Code’ga:

```text
Serverda (ssh vps) qayta yuklash kerakmi, tekshir: /var/run/reboot-required fayli bormi va nechta yangilanish kutyapti?
Kerak bo'lsa, menga ayt; qayta yuklashni kechqurun 22:00 dan keyin qilamiz.
```

- Qayta yuklashdan qo‘rqmang: bot o‘zi qaytadi (sinovda tekshirilgan).
  Keyin telefondan `/holat` yozing.

## 5. Eshiklar va begonalar

- Firewall: faqat 22-port (SSH) ochiq; sayt qo‘ysangiz, 80 va 443.
  Bot uchun ochiq port kerak emas: u Telegram’ga o‘zi ulanadi.
- fail2ban: parolni 5 marta noto‘g‘ri yozgan IP manzil 10 daqiqaga bloklanadi.
  Zalda hamma bitta internetda: parolni qayta-qayta urinmang, mentorni chaqiring.
- Bot faqat `ALLOWED_USER_IDS` dagi odamlarga javob beradi; begona faqat o‘z ID raqamini ko‘radi.
- Har kim ko‘rgan xatoni `/stop` bilan to‘xtata oladigan odam bor: Siz va loyiha yetakchisi.

## 6. Pul

- OpenRouter kalitida **oylik limit** (masalan, $15): bu oxirgi to‘siq.
- Botning o‘z limiti: `DAILY_BUDGET_USD`, `MONTHLY_BUDGET_USD`; limitga yetsa, savollar odamga o‘tadi va Sizga xabar keladi.
- Server to‘lovi: provayder panelida muddatni kuzating; to‘lanmasa server o‘chadi, bot ham.

## 7. Ma’lumot

- Botga pasport, karta raqami, biometrik ma’lumot va xodimlarning shaxsiy ma’lumotini bermang.
- Server Toshkentda bo‘lsa ham, savol javob yozish uchun xorijdagi modelga boradi.
  Shaxsiy ma’lumotni chet elga berish shartlari: O‘RQ-1125 qonuni (2026-yil 27-martdan) va Vazirlar Mahkamasining 2026-yil 29-iyuldagi 415-son qarori.
  Xodim ma’lumotini uning yozma roziligisiz uchinchi shaxsga berib bo‘lmaydi (Mehnat kodeksi, 178-modda).
  Kompaniyangiz bunga tayanishidan oldin yurist tasdiqlasin.
- Ish jurnali (savol va javoblar) serverda 60 kun saqlanadi va o‘zi o‘chadi.

## Bir qarashda

| Qilasiz | Qilmaysiz |
|---|---|
| Parol - parol menejerida | Parol - chatda yoki eslatmada |
| Kirish - SSH kalit bilan | Claude’ga parol yozish |
| Kalitlar - `.env` da | Kalit - kodda, GitHub’da, ekranda |
| Repo - private, faqat `app/` | Butun `kompaniya/` papkasini GitHub’ga |
| Oyiga bir marta yangilanish tekshiruvi | Serverga yangi dastur «sinab ko‘rish uchun» o‘rnatish |
| Kalit ochilsa - almashtirish | Kalit ochilsa - faqat o‘chirib qo‘yish |
