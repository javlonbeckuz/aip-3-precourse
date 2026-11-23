# `.env` faylini to‘ldirish: qo‘llanma

`.env` - botning kalitlari va sozlamalari turadigan maxfiy fayl.
U `.env.example` dan nusxa olinadi va faqat Sizning kompyuteringizda hamda serverda turadi.
Uni chatga, Telegram’ga yoki GitHub’ga hech qachon qo‘ymang.

## Qanday ochiladi

1. Claude Code’ga yozing: `.env.example dan .env faylini yarat, ichini o'qima`.
2. `.env` ni o‘zingiz oching: Warp’da `app` papkasida Mac’da `open -e .env`, Windows’da `notepad .env` deb yozing.
   Shu buyruq bilan ochilsa, fayl `.env.txt` bo‘lib qolmaydi (Notepad’ning «Fayl - Ochish» oynasi faqat `.txt` ni ko‘rsatadi va shu xatoga olib keladi).
3. To‘ldiring, saqlang, yoping.
4. Claude Code’ga yozing: `uv run pilot check ni ishga tushir` - qaysi qator yetishmasa, aytadi.

Har bir qator `NOM=qiymat` ko‘rinishida: `=` atrofida bo‘sh joy, qo‘shtirnoq kerak emas.

## Majburiy qatorlar

| Qator | Nima yoziladi | Qayerdan olinadi |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Bot tokeni, `123456789:AAH...` ko‘rinishida | Telegram’da @BotFather, `/newbot` |
| `OPENROUTER_API_KEY` | `sk-or-v1-...` | openrouter.ai/keys; kalitga oylik limit qo‘ying ($10-20) |
| `OWNER_CHAT_ID` | Sizning Telegram ID raqamingiz | Botni ishga tushirib, unga `/start` yozing: bot raqamni aytadi |
| `ALLOWED_USER_IDS` | Botdan foydalanadigan xodimlar ID raqamlari, vergul bilan | Xodim botga yozadi, bot unga raqamini aytadi; yoki keyin `/ruxsat` |

## Asosiy sozlamalar

| Qator | Ma’nosi | Namuna |
|---|---|---|
| `COMPANY_NAME` | Kompaniya nomi (bot salomlashuvida) | `Baraka Office` |
| `AGENT_NAME` | Agentning vazifa nomi, odam ismi emas | `Savdo yordamchisi` |
| `ADMIN_USER_IDS` | Loyiha yetakchisi: u ham `/stop` va `/hisobot` ishlata oladi | `5012345678` |
| `ACCESS_MODE` | `staff` - faqat xodimlar; `public` - hamma (mijozlar) | `staff` |
| `REPLY_MODE` | `direct` - darhol javob; `approve` - har bir javobni odam tasdiqlaydi (1-hafta); `topics` - `agent/approval.toml` dagi mavzular darhol, qolgani tasdiqqa (2-hafta, `agent/approval.qollanma.md`) | `approve` |
| `REVIEWER_CHAT_ID` | Javob loyihalarini kim tasdiqlaydi (bo‘sh bo‘lsa - Siz) | `5012345678` |
| `ESCALATION_CHAT_ID` | Odamga uzatilgan savollar kimga boradi (bo‘sh bo‘lsa - Siz) | `5023456789` |
| `MODEL_TIER` | `cheap`, `balanced` yoki `strong` | `balanced` |
| `DAILY_BUDGET_USD`, `MONTHLY_BUDGET_USD` | Shu summadan keyin bot modelni chaqirmaydi, savollarni odamga uzatadi | `1.00`, `15.00` |
| `DAILY_REPORT_TIME` | Ertalabki hisobot vaqti (bo‘sh - o‘chiq) | `09:00` |
| `WEEKLY_REPORT_DAY` | Haftalik 5-to‘plam fayli: 1 = dushanba (bo‘sh - o‘chiq) | `1` |
| `WORK_HOURS`, `WORK_DAYS` | Xodimlarga bot xabarlari faqat shu vaqtda boradi | `09:00-18:00`, `1-6` |
| `PILOT_START_DATE` | Sinov boshlangan kun: haftalar shundan sanaladi | `2026-12-14` |
| `DEPLOY_HOST` | Server manzili (4-dars) | `root@203.0.113.10` |
| `DEMO_SAMPLE` | Faqat kursning Baraka demosi uchun: `on` bo‘lsa, Baraka namuna fayllari bilan ham `pilot check` o‘tadi. O‘z kompaniyangizda qo‘ymang | bo‘sh |

Qolgan qatorlarni o‘zgartirmasangiz ham bo‘ladi: ularning izohi `.env.example` ichida.

## To‘ldirilgan namuna: Baraka Office

Raqamlar va kalitlar namuna uchun o‘ylab topilgan, ular ishlamaydi.

```
TELEGRAM_BOT_TOKEN=7712345678:AAH-namuna-token-ishlamaydi
OPENROUTER_API_KEY=sk-or-v1-namuna-kalit-ishlamaydi
OWNER_CHAT_ID=5001112233
ACCESS_MODE=staff
ALLOWED_USER_IDS=5004445566,5007778899,5008889900
ADMIN_USER_IDS=5002223344
COMPANY_NAME=Baraka Office
AGENT_NAME=Savdo yordamchisi
REPLY_MODE=approve
REVIEWER_CHAT_ID=5002223344
ESCALATION_CHAT_ID=5003334455
MODEL_TIER=balanced
DAILY_BUDGET_USD=1.00
MONTHLY_BUDGET_USD=15.00
DAILY_REPORT_TIME=09:00
WEEKLY_REPORT_DAY=1
WORK_HOURS=09:00-18:00
WORK_DAYS=1-6
PILOT_START_DATE=2026-12-14
DEPLOY_HOST=root@203.0.113.10
```

Nega shunday yozilgan:
- `OWNER_CHAT_ID` - bosh direktor Rustamov S.A.: hisobotlar unga boradi.
- `ADMIN_USER_IDS`, `REVIEWER_CHAT_ID` - Malika Rashidova (sotuv menejeri): u loyiha yetakchisi (5-to‘plam A), javob loyihalarini tasdiqlaydi va `/stop` bosa oladi.
- `ESCALATION_CHAT_ID` - ROP Jamshid aka: odamga uzatilgan savollar, masalan 5% dan katta chegirma, unga boradi (3-to‘plam B.6).
- `ALLOWED_USER_IDS` - Bekzod, Madina va Zarina: 4-to‘plam suhbatidan keyin qo‘shilgan (Malika admin sifatida ham yoza oladi).
- `REPLY_MODE=approve` - 1-hafta: har bir javobni Malika tasdiqlaydi.
  2-haftada `REPLY_MODE=topics`: narx va qoldiq javoblari darhol, qolgani Malika tasdig‘idan o‘tadi (`agent/approval.qollanma.md`).
- `MONTHLY_BUDGET_USD=15.00` - kuniga taxminan 100 savol x $0.004 = $0.40; oyiga $12, ozgina zaxira bilan.

## Yomon namuna va nima xato

```
TELEGRAM_BOT_TOKEN = "7712345678:AAH..."
OWNER_CHAT_ID=@rustamov_sa
ALLOWED_USER_IDS=Jamshid, Bekzod
MODEL_TIER=Claude
MONTHLY_BUDGET_USD=
```

| Qator | Nima xato | To‘g‘risi |
|---|---|---|
| `TELEGRAM_BOT_TOKEN = "..."` | `=` atrofida bo‘sh joy va qo‘shtirnoq: ishlashi mumkin, lekin chalkashtiradi | `TELEGRAM_BOT_TOKEN=7712345678:AAH...` |
| `OWNER_CHAT_ID=@rustamov_sa` | Username emas, raqam kerak | Botga `/id` yozing va raqamni qo‘ying |
| `ALLOWED_USER_IDS=Jamshid, Bekzod` | Ismlar emas, ID raqamlar kerak | `5004445566,5007778899` |
| `MODEL_TIER=Claude` | Faqat `cheap`, `balanced`, `strong` | `MODEL_TIER=balanced`; aniq modelni `MODEL_BALANCED=` qatorida o‘zgartiring |
| `MONTHLY_BUDGET_USD=` (bo‘sh) | Standart $15 ishlaydi, lekin limitni ongli tanlang | Kuniga savollar soni x $0.004 x 30 + zaxira |

`pilot check` xato qatorni nomi bilan aytadi, masalan: `.env: OWNER_CHAT_ID: '@rustamov_sa' must be a whole number.`

## `.env.txt` bo‘lib qolsa

Belgi: `pilot check` «`.env.txt` topildi» deydi yoki hamma kalitni «yo‘q» deb ko‘rsatadi.
Sabab: Notepad yoki TextEdit faylni `.env.txt` deb saqlagan.
Tuzatish (Warp’da, `app` papkasida): Windows `ren .env.txt .env`, Mac `mv .env.txt .env`.
Keyin yana `notepad .env` yoki `open -e .env` bilan oching.

## Kalit chatga tushib qolsa

Kalit Telegram’da, chatda yoki ekranda ko‘rinib qolsa, darhol yangilang:
- Telegram tokeni: @BotFather’da `/token`, botni tanlang: yangi token beriladi, eskisi ishlamay qoladi; yangisini `.env` ga yozing.
- OpenRouter kaliti: openrouter.ai/keys da eski kalitni o‘chiring, yangisini yarating (limit bilan).
Keyin serverga yuboring: `deploy.py env`.
