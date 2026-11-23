# Kursdan keyin: xarajatlar va texnik xizmat kartasi

Praktikum 3.0 · bitta varaq · kompyuteringiz yonida tursin

## 1. Har oy nima to‘laysiz

| Nima | Taxminan, so‘m/oy | Qayerda to‘lanadi | To‘xtatsa bo‘ladimi |
|---|---|---|---|
| Server (VPS): botingiz shu yerda ishlaydi | 200 000 | Provayder sayti (masalan, Click yoki Payme bilan) | Yo‘q: to‘xtatsangiz, bot to‘xtaydi |
| Model (OpenRouter): bot har javob uchun to‘laydi | bir necha dollar; Baraka namunasida taxminan 37 000 | openrouter.ai, Visa yoki Mastercard bilan | Yo‘q, lekin limit qo‘ying |
| Claude obunasi: Claude Code bilan botni tuzatish va yangisini qurish | Pro: 20 $ + 12% QQS (taxminan 270 000) | claude.ai saytida (App Store’da qimmatroq) | Ha: hech narsa qurmayotgan oyda to‘xtatsa bo‘ladi; bot ishlashda davom etadi |

Narxlar 2026-yil 3-noyabr holatiga; dollar kursi o‘zgaradi.
Claude to‘lovi Visa yoki Mastercard bilan; Uzcard va Humo tasdiqlanmagan.

## 2. Pulni nazorat qilish

- OpenRouter kalitiga oylik limit qo‘ying (masalan, 15 $): limitga yetsa, bot to‘xtaydi va savollar odamga uzatiladi.
- Botning `/xarajat` buyrug‘i oylik sarf va limitni ko‘rsatadi.
- Har oy 1-sanada uchta hisobni bitta jadvalga yozing: natija varag‘idagi «oylik xarajat» shu bilan to‘g‘ri bo‘ladi.

## 3. Bot to‘xtasa: 5 qadam

1. Telefondan botga `/start` yozing: javob bermasa, 2-qadam.
2. Noutbukda `uv run python deploy/deploy.py status`: «failed» yoki «inactive» bo‘lsa, 3-qadam.
3. `uv run python deploy/deploy.py logs`: oxirgi qatorlarni skrinshot qiling.
4. Claude Code’ga skrinshot bilan yozing: «Bot to‘xtadi, log shu.
   Sababini top va tuzat, avval menga ayt.»
5. Hal bo‘lmasa: oxirgi ishlagan versiyaga qaytish `uv run python deploy/deploy.py rollback`, keyin mentorga yozing (oy davomida) yoki «PRAKTIK» guruhiga.

To‘liq qo‘llanma: `pilot-template/deploy/deploy.qollanma.md` («Kundalik ishlar» va «Muammolar» bo‘limlari).

## 4. Kurs tugagach xavfsizlik

- [ ] Kurs davomida serveringizga mentor kaliti qo‘shilgan bo‘lsa, uni o‘chiring (mentoringiz bilan birga, bir marta).
- [ ] OpenRouter va Telegram bot tokenini almashtiring, agar ular hech qachon chatda yoki skrinshotda ko‘ringan bo‘lsa.
- [ ] Kod yopiq (private) repoda, `.env` repoda yo‘q.
- [ ] Bot faqat ruxsat berilgan Telegram ID’larga javob beradi.

## 5. «Baraka Office» namunasi

| Nima | So‘m/oy | Izoh |
|---|---|---|
| Server | 200 000 | Provayder hisobi |
| OpenRouter | 37 000 | 2 haftada 1,45 $; limit 15 $ |
| Claude Pro | 267 500 | 20 $ + 12% QQS, 1 $ = 11 941,65; 2-jarayonni qurish uchun qoldirildi |
| **Jami** | **504 500** | Natija varag‘idagi «Vosita xarajati» shu |

Hoshiyadagi izoh: Baraka Claude obunasini to‘xtatmadi, chunki yanvarda 2-jarayonni quradi; fevralda qurilish bo‘lmasa, bir oy to‘xtatib, oyiga 267 500 so‘m tejaydi.

## 6. Yomon namuna

> Hamma obunani yopdim, kurs tugadi.

Nimasi yomon: server yopilsa, bot to‘xtaydi va natija yo‘qoladi; OpenRouter limitisiz qoldirilsa, xarajat nazoratsiz.
To‘g‘risi: server va model qoladi (bot ishlaydi), Claude faqat qurilish bo‘lmagan oyda to‘xtatiladi.
