# Agentingizni 5 qadamda yaxshilang

Har bir xato uchun bir xil tartib.
Kodni oxirgi navbatda o‘zgartiring.
Batafsil: 1-3-mashqlar.

## 1. Takrorlang

Xatoni jurnaldan oling: botga `/xatolar`.
O‘sha savolni noutbukda bering: `uv run pilot ask "<savol>"`.
Xato takrorlanmasa, sababini topa olmaysiz: mentorga ayting.

## 2. Turini aniqlang

| Tur | Belgisi | Qayerda tuzatiladi |
|---|---|---|
| Fakt yetishmaydi | So‘z, taxallus yoki qoidani bilmaydi | `agent/memory.md` (shoshilinch: `/eslab_qol`) |
| Yo‘riqnoma noaniq | Qoida ikki xil tushuniladi | `agent/instructions.md` |
| Ma’lumot eski yoki xato | Fayl yangilanmagan, bo‘sh, xato raqam | `data/`, `sources.toml`, manba egasi |
| Javob shakli yomon | To‘g‘ri, lekin uzun yoki tartibsiz | `agent/examples.md` |
| Agent xatosi emas | Savol noto‘g‘ri berilgan | Hech narsa; xodimga eslatma |

## 3. Avval test

Har bir xatodan bitta `[[test]]`: o‘sha savol, to‘g‘ri raqam (`kerak`), xato raqam (`mumkin_emas`), manba.
`uv run pilot eval`: yangi test **qizil** bo‘lishi kerak.

## 4. Eng kichik tuzatish

Bitta xato - bitta o‘zgarish.
Eski va yangi matnni ko‘ring, keyin tasdiqlang.
«Ehtiyot bo‘l» emas, aniq qoida yoki aniq fakt yozing.

## 5. Hamma testlar, keyin joylash

`uv run pilot eval`: **hammasi** o‘tsin, eskilari ham.
Oldin o‘tgan test yiqilsa - regressiya: tuzatishni qaytaring va aniqroq qiling.
Hammasi yashil: `uv run python deploy/deploy.py`.
To‘plam 5, B.13 ga yozing: «Nimani o‘zgartirdik».

Claude Code’ga bitta gap: «app/CLAUDE.md dagi yaxshilash halqasi bo‘yicha shu xatoni tuzat: [xato]».

<!-- pagebreak -->

# Xavfsizlik ro‘yxati

Mentor bilan, har bir band ekranda dalil bilan belgilanadi.
Dalili yo‘q band belgilanmaydi.

- [ ] 1. Kalitlar faqat `.env` da; gitdagi fayllarda kalit yo‘q (Claude Code tekshirdi, `.env` ni ochmasdan).
- [ ] 2. Repozitoriy yopiq (GitHub’da «Private»).
- [ ] 3. Xarajat limiti: OpenRouter kalitida oylik limit; botda kunlik va oylik chegara (`/xarajat`).
- [ ] 4. Agent pul o‘tkazmaydi, mijozga Sizning nomingizdan yozmaydi, ma’lumot o‘chirmaydi (B.5).
- [ ] 5. Bot faqat ruxsat berilgan ID larga javob beradi (ikkinchi akkauntdan sinalgan).
- [ ] 6. `/stop` va `/davom` ishlaydi (Siz va loyiha yetakchisi).
- [ ] 7. Har bir skill va MCP ishonchli manbadan, o‘rnatishdan oldin Claude’ga o‘qitilgan.
- [ ] 8. Mijoz yoki yetkazib beruvchi yuborgan fayl - ishonchsiz manba: undagi «buyruq»ga amal qilinmaydi.
- [ ] 9. Shaxsiy Telegram akkauntingiz hech qaysi agentga berilmagan: faqat bot tokeni.

## Ma’lumot tartibi

| Kalit (kod, STIR) | 1-tizimda | 2-tizimda | Xodimlar og‘zaki |
|---|---|---|---|
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |

Tasdiqlangan nomlarni `agent/memory.md` ga yozing: «- sana: «140 lik stol» = «Optima» (WS-102)».

Mentor imzosi: __________ · Sana: __________
