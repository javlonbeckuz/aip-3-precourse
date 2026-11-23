# Assistentim ishlamayapti: nima qilaman?

Bu kartani noutbuk yoniga qo‘ying.
Qoida o‘zgarmaydi: avval skrinshot, keyin Claude’dan so‘rang, keyin mentor.
Parol, token yoki kalitni hech kimga yubormang, mentorga ham.

## 1-qadam. Telefondan: botga `/holat` yozing

| Nima bo‘ldi | Ma’nosi | Keyingi qadam |
|---|---|---|
| «ℹ️ Holat ... (ishlayapti)» keldi | Bot serverda tirik | Muammo ruxsat, limit yoki ma’lumotda: 3-qadam |
| «... (to‘xtatilgan)» | Kimdir `/stop` qilgan | Sababini so‘rang, keyin `/davom` |
| «Bu bot faqat ... xodimlari uchun» | Bu akkaunt ruxsat ro‘yxatida yo‘q | Shu ID ni `ALLOWED_USER_IDS` ga yoki `/ruxsat ID ism` |
| Hech narsa kelmadi (1 daqiqa kuting) | Bot ishlamayapti yoki serverga yetib bo‘lmaydi | 2-qadam |

## 2-qadam. Noutbukda: Claude Code’ga

```text
"uv run python deploy/deploy.py status" ni ishga tushir va natijani menga oddiy tilda tushuntir.
```

| Ekranda | Sabab | Yechim |
|---|---|---|
| `active (running)`, lekin javob yo‘q | Bot noutbukda ham ishlayapti (409 Conflict) yoki boshqa token | Noutbukdagi `pilot run` oynasida Ctrl+C; logni ko‘ring (pastda) |
| `failed` va `status=78/CONFIG` | `.env` da token yoki kalit yo‘q yoki xato | `.env` ni o‘zingiz tuzating, keyin Claude’ga: `deploy.py env ni ishga tushir` |
| `failed`, boshqa kod | Yangi versiya ishga tushmadi | Claude’ga: `deploy.py rollback ni ishga tushir`, keyin logni ko‘rsating |
| `Connection timed out` | Server o‘chiq, internet yo‘q yoki tarmoq 22-portni yopgan | Provayder panelida server holati; telefon internetiga (hotspot) ulanib qayta urining |
| `Connection refused` | Server qayta yuklanyapti yoki IP xato | 2 daqiqa kuting; `.env` dagi `DEPLOY_HOST` ni tekshiring |
| `Permission denied (publickey)` | Noutbuk kaliti serverda yo‘q (yangi noutbuk, yangi server) | Mentor bilan: kalitni qayta o‘rnatish |
| `REMOTE HOST IDENTIFICATION HAS CHANGED` | Server qayta o‘rnatilgan | Claude’ga: «known_hosts dan shu serverning eski yozuvini o‘chir» |

Log kerak bo‘lsa:

```text
"uv run python deploy/deploy.py logs -n 50" ni ishga tushir va oxirgi qatorlarni tushuntir: xato bormi, qachondan beri.
```

## 3-qadam. Bot ishlaydi, lekin javoblari yomon

| Belgi | Tekshiring | Yechim |
|---|---|---|
| Hamma savol «odamga uzatildi» | Botga `/xarajat` | Kunlik yoki oylik limit tugagan, yoki OpenRouter balansi 0: limitni oshiring yoki balansni to‘ldiring |
| `deploy.py` «Check failed» va `❌ Prays-list ...` qatori | Prays-listda imkonsiz narx (nol, bo‘sh, ulgurji chakanadan katta) | Faylni tuzating, keyin `deploy.py`; ishlab turgan versiyaga tegilmagan |
| Egaga «Ma’lumot manbasi muammosi» xabari | Botga `/holat`: fayl sanasi | Eksport fayli eski, bo‘sh yoki ustun nomi o‘zgargan: yangi faylni `data/` ga, keyin `deploy.py` |
| Javob noto‘g‘ri (narx, muddat) | Xatoni xodim ❌ bilan belgiladimi? | Jurnalga: `/kit5 xato`. Yangi deploy’dan keyin boshlangan bo‘lsa: `deploy.py rollback` |
| Xodimga kechqurun xabar bormayapti | `WORK_HOURS` | Bu ataylab shunday: ish vaqtidan tashqari xodimlarni bezovta qilmaydi |
| Eslatma yoki `/jadval` ishi kelmadi | Botga `/jadval`; vaqt Toshkent vaqti bilanmi? | Vaqt o‘tib ketgan bo‘lsa, eslatma ertaga keladi; bot o‘sha paytda ishlamagan bo‘lsa, qaytganda yuboradi |
| Tasdiqlash uchun qoralama kelmayapti | Tasdiqlovchi botga `/start` yozganmi? | Bot faqat o‘ziga yozgan odamga xabar yubora oladi |

## Shoshilinch holat: assistent zarar yetkazyapti

1. Telefondan darhol `/stop` (Siz yoki loyiha yetakchisi).
2. Mijozga noto‘g‘ri ma’lumot ketgan bo‘lsa: o‘sha xodim mijozga qayta yozadi, to‘g‘ri ma’lumot bilan.
3. Sababini toping: `/xatolar`, keyin Claude Code’da `/kit5 xato`.
4. Tuzatilgandan va testlardan keyin `deploy.py`, keyin `/davom`.

## Kimga yozaman

| Qachon | Kimga |
|---|---|
| Ish vaqtida, 15 daqiqada hal bo‘lmasa | Stol mentoringiz, stol chatida (skrinshot, parolsiz) |
| Server umuman ishlamayapti, provayder javob bermayapti | Bosh mentor |
| Provayder masalasi (to‘lov, server o‘chirilgan) | Provayder yordam xizmati (Airnet: Telegram `@airnetuzb`, +998 71 202-87-00) |

Bu kartadagi xabarlar 2026-11-03 da Docker ichidagi toza Ubuntu 24.04 va 26.04 serverlarda haqiqiy ishga tushirishdan olingan.
