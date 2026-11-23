# CLAUDE.md: pilot bot (Praktikum 3.0)

Bu papka - biznes egasining sinov (pilot) boti.
Egasi dasturchi emas.
U bilan doim o‘zbek tilida (lotin), sodda va qisqa gaplash, har bir atamani bir gapda tushuntir.
Har bir o‘zgarishdan oldin nima qilmoqchi ekaningni 2-3 gapda ayt.

## Loyiha nima qiladi

Telegram bot xodimlar savoliga OpenRouter orqali AI model bilan javob beradi.
Serverda u egasining shaxsiy AI yordamchisi ham: telefondan `/holat`, `/stop`, `/eslab_qol`, `/jadval`, `/eslat`, `/darhol` buyruqlari bilan boshqariladi.
Javoblar kompaniya ma’lumotlariga (`data/`) va agent yo‘riqnomasiga (`agent/instructions.md`, 3-to‘plam B shakli) tayanadi.
Har bir savol-javob `runtime/journal/` ga yoziladi.
Bot egaga har kuni hisobot, har hafta 5-to‘plam raqamlari faylini yuboradi.

## Qayerda nima

| Fayl | Nima | O‘zgartirish |
|---|---|---|
| `agent/instructions.md` | Agent yo‘riqnomasi (3-to‘plam B.1-B.10) | Ega bilan birga; har bir sarlavhada B kodi qolsin, masalan «Rol (B.1)» |
| `agent/examples.md` | To‘g‘ri javob namunalari | Ega yoki xodim tasdiqlagan javoblar |
| `agent/memory.md` | Faktlar va xatolardan saboqlar | Har bir qator: sana va bitta fakt; ega telefondan qo‘shganlarini (`deploy.py memory`) vaqti-vaqti bilan shu yerga ko‘chir |
| `agent/sources.toml` | Ma’lumot manbalari (B.3) | Yangi fayl yoki Google Sheet qo‘shilganda |
| `agent/schedule.toml` | Jadval bo‘yicha ishlar (masalan, har kuni 8:30 da kam qolgan mahsulotlar) | Ega so‘raganda; `agent/schedule.qollanma.md` |
| `agent/approval.toml` | Qaysi mavzudagi javoblar darhol boradi (`REPLY_MODE=topics`, sinovning 2-haftasi); qolgani tasdiqqa | Ega qaror qilganda (5-to‘plam A.5); `agent/approval.qollanma.md` |
| `data/` | Eksport fayllari (CSV, Excel, 1C) va hujjatlar | Ega yangi eksport bergan sari |
| `evals/test-set.toml` | Test to‘plami (4-to‘plam B.4) | Har bir xatodan keyin bitta test qo‘sh |
| `kit5-baseline.toml` | «Agentgacha» raqamlari | Ega bergan raqamlar bilan |
| `.env` | Kalitlar va sozlamalar | Faqat ega; sen faqat qaysi qatorni o‘zgartirishni aytasan |
| `pilot/` | Kod | Ehtiyot bilan, testlar bilan |
| `pilot/texts.py` | Bot ko‘rsatadigan barcha gaplar | So‘z tanlovi qoidalari fayl boshida |
| `deploy/` | Serverga joylash | `deploy/deploy.qollanma.md` bo‘yicha |

Kompaniya papkasida bu papka `kompaniya/app/` bo‘ladi.
Qo‘shni papkalar bilan sinxron saqla:
- `../kit3-agent/instructions.md` (/kit3 yozgan tizim yo‘riqnomasi) o‘zgarsa, uni `agent/instructions.md` ga ko‘chir, B kodli sarlavhalarni saqla va farqni egaga ko‘rsat.
- `../kit4-people/test-set.md` dagi har bir yaxshi yoki yomon misolni `evals/test-set.toml` ga `[[test]]` qilib qo‘sh.
- Haftalik fayl (`/hafta` yoki `uv run pilot kit5`) chiqqanda, uni `../kit5-pilot/numbers.md` ga ko‘chirishni taklif qil.
Serverga faqat `app/` ichidagi fayllar boradi.

## Buyruqlar

```bash
uv sync                      # kutubxonalarni o‘rnatish (birinchi marta)
uv run pytest                # barcha testlar: internetsiz, kalitsiz, ~5 soniya
uv run pilot check           # .env, agent fayllari va ma’lumotlarni tekshirish
uv run pilot check --online  # + Telegram tokeni va OpenRouter kaliti ishlayaptimi
uv run pilot ask "savol"     # bitta savolni terminalda sinash (Telegramsiz, pulli)
uv run pilot eval            # test to‘plami (pulli: har test ~$0.005)
uv run pilot run             # bot (uzoq ishlaydi): egaga uni Warp’ning alohida oynasida o‘zi ishga tushirishini ayt
uv run pilot report          # kechagi hisobot (--send: egaga yuborish)
uv run pilot kit5            # haftalik 5-to‘plam fayli
uv run pilot job "nom" --send  # jadvaldagi bitta ishni hozir bajarish (pulli)
uv run python -m tools.demo  # butun botni soxta Telegram bilan sinash (internetsiz)
uv run python deploy/deploy.py            # serverga joylash (avval testlar)
uv run python deploy/deploy.py status     # serverda ishlayaptimi + oxirgi loglar
uv run python deploy/deploy.py rollback   # oldingi versiyaga qaytish
uv run python deploy/deploy.py memory     # ega telefondan qo‘shgan faktlar (serverdagi runtime/memory.md)
uv run python deploy/deploy.py data       # faqat data/ dagi yangi eksportlar (avval tekshiriladi), qayta ishga tushirishsiz
```

## Qat’iy qoidalar

1. `.env` faylini hech qachon ochib o‘qima, chop etma, chatga chiqarma, `cat` qilma.
   Kalit kerak bo‘lsa, egaga qaysi qatorni o‘zi to‘ldirishini ayt; faylni o‘zi `open -e .env` (Mac) yoki `notepad .env` (Windows) bilan ochsin.
   Kalit chatda ko‘rinib qolsa, darhol egaga uni yangilashni (BotFather’da `/token` - yangi token, eskisi ishlamay qoladi; openrouter.ai/keys) ayt.
2. `.env`, `runtime/` va kalitli fayllarni gitga qo‘shma; repozitoriy faqat private bo‘lsin.
3. Kodni o‘zgartirgandan keyin har doim `uv run pytest` ishga tushir.
   Test yiqilsa, deploy qilma.
   Testlar kodni tekshiradi va `tests/fixtures/baraka-app/` dagi muzlatilgan Baraka namunasini o‘qiydi: ularni egasining ma’lumotiga moslab o‘zgartirma, Baraka fayllarini `agent/` yoki `data/` ga qaytarma.
   Egasining o‘z kontenti `uv run pilot check` va `uv run pilot eval` bilan tekshiriladi.
   Yangi xatti-harakat qo‘shsang, unga test ham yoz (`tests/` dagi namunalar kabi, internetsiz).
4. Pulli buyruqlarni (`pilot ask`, `pilot eval`, `pilot job`) ishga tushirishdan oldin egadan so‘ra va taxminiy narxini ayt.
5. Bot hech qachon: pul o‘tkazmaydi, mijozga ega nomidan o‘zi yozmaydi (public rejimda faqat savolga javob beradi), ma’lumot o‘chirmaydi.
   Ega shunday narsa so‘rasa, xavfini tushuntir va 3-to‘plam B.5 ga qarab qaror qilishni so‘ra.
6. Hisobotlarga va jadvaldagi ishlarga xodim ismlari, har bir xodim bo‘yicha raqamlar, javob tezligi yoki onlayn vaqtini qo‘shma.
   Bot jarayonni o‘lchaydi, odamni emas (xodimlarga shunday va’da berilgan).
7. Xodimlarga boradigan matnlarda «siz» ishlat; «sinov», «nazorat», «optimizatsiya», «bo‘shatilgan» so‘zlarini ishlatma («loyiha», «tekshirish», «tejalgan»).
   Agentga odam ismini berma: u funksiya nomi bilan ataladi (masalan, «Savdo yordamchisi»).
8. Serverda: `sudo` faqat `deploy/` skriptlari orqali; `.env` ni serverda ham chop etma.
   Bitta bot tokeni faqat bitta joyda ishlaydi: serverga joylagach, noutbukdagi botni to‘xtat.
9. Uzun tire belgisini ishlatma, oddiy «-» yoz.
10. `DEMO_SAMPLE=on` faqat kursning Baraka demosi uchun: haqiqiy kompaniyada uni qo‘yma va `pilot check` dagi «Baraka namunasi» xatosini namuna fayllarini almashtirib tuzat.

## 5-darsdagi yaxshilash halqasi

Ega xatolar jurnalidagi (`/xatolar` yoki haftalik fayldagi B.13) xatoni olib kelganda, shu tartibda ishla:
1. Xatoni takrorla: `uv run pilot ask "<o‘sha savol>"` (egadan ruxsat so‘rab).
2. Sababini top: yo‘riqnoma noaniqmi (`agent/instructions.md`), fakt yetishmayaptimi (`agent/memory.md`), namuna kerakmi (`agent/examples.md`), ma’lumot eskirganmi (`data/`)?
   Ega telefondan qo‘shgan faktlar (`/eslab_qol`) faqat serverda: noutbukdagi `pilot eval` ularni ko‘rmaydi, shuning uchun avval `deploy.py memory` bilan `agent/memory.md` ga ko‘chir.
   Kodni oxirgi navbatda o‘zgartir.
3. Eng kichik o‘zgarishni qil va egaga farqni ko‘rsat.
4. `evals/test-set.toml` ga shu xato uchun yangi `[[test]]` qo‘sh (`manba = "xatolar jurnali, <sana>"`).
5. `uv run pytest`, keyin egadan ruxsat bilan `uv run pilot eval`: hammasi o‘tsin (eski testlar ham: regressiya bo‘lmasin).
6. Serverga joyla (`deploy.py`) va egaga 5-to‘plam B.13 dagi «Nimani o‘zgartirdik» ustuniga nima yozishni ayt.

## Kod qanday tuzilgan

- `pilot/bot.py` - Telegram: xabarlar, tugmalar, buyruqlar, hisobot jadvali (bitta oddiy sikl).
- `pilot/assistant.py` - javob yo‘li: limit, ma’lumot, model, odamga uzatish (`ODAMGA:`).
- `pilot/approval.py` - qaysi javob tasdiqqa borishi (`REPLY_MODE`, `MAVZU:` qatori, kalit so‘zlar; shubha bo‘lsa - tasdiqqa).
- `pilot/prompt.py` - model o‘qiydigan matn: yo‘riqnoma + namunalar + xotira + ish qoidalari + ma’lumotlar.
- `pilot/sources.py` - ma’lumot manbalari; yangi API manbasi qo‘shish fayl boshida yozilgan.
- `pilot/adapters/` - qo‘shimcha manba turlari (`excel`, `telegram_json`, `bank_1c`, `amocrm`, `bitrix24`, `odata_1c`, `url`, `moysklad`, `poster`), kursning integratsiyalar to‘plamidan; o‘zgartirsang, `tests/test_integrations_*.py` dagi testi bilan birga.
- `pilot/kit5.py` - 5-to‘plam raqamlari va hisobotlar; `pilot/evals.py` - test to‘plami; `pilot/jobs.py` - jadvaldagi ishlar.
- `pilot/telegram.py`, `pilot/llm.py` - Telegram va OpenRouter bilan aloqa.
- `pilot/config.py` - `.env` sozlamalari; yangi sozlama qo‘shsang, `.env.example` va `env.qollanma.md` ga ham yoz.

Yangi imkoniyat (ovozli xabar, rasm, guruh, CRM API) so‘ralsa: avval plan mode, keyin test, keyin kod.
