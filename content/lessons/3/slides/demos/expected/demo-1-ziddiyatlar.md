# Kutiladigan natija, 1-namoyish: hujjatlar va intervyular orasidagi ziddiyatlar

Haqiqiy Claude Code natijasi (Claude Code 2.1.316, Sonnet 5.5, 2026-11-03, `_build/sandbox/run_checks.sh j`), Baraka papkasida, CLAUDE.md bilan, B shakllari: Zarina, Malika, Jamshid aka (To‘plam namunasi).
Claude chiqishi tahrir qilinmagan (faqat uzun tire belgisi oddiy chiziqchaga almashtirilgan).

---

Zid raqamlar bor. Ular hujjatlar ichida ham, intervyularda ham uchraydi. Barcha qatorlar `grep` natijasidan olingan. Fayllarni to‘liq o‘qimadim.

## 1. Yetkazish muddati

| Fayl | Gap | Raqam | Holat |
|---|---|---|---|
| `hujjatlar/03_Namunaviy_Shartnoma_va_Kafolat.md`, 3.1 | «oldindan to'lov ... tushgan kundan boshlab **7 ish kuni** (MDF/shpon uchun **12 ish kuni**)» | 7 / 12 | Rasmiy, to‘g‘ri |
| `kit1-interviews/jamshid-form-b.md`, 9-qator (60-satr) | «uch ish kunida yetkazamiz» | 3 ish kuni | **Zid.** Og‘zaki; egasi to‘xtatgan |
| `kit1-interviews/jamshid-form-b.md`, 10-qator (61-satr) | «Zavod ba'zan yetti kunda chiqaradi» | 7 kun | Mos |
| `kit1-interviews/malika-form-b.md`, 12-qator (66-satr) | «uch kunda» va «yetti ish kuni» | 3 va 7 | **Zid** (ikki xil aytilgan). Egasi 7 ni tasdiqlagan; shu sabab 2 marta janjal bo‘lgan |
| `hujjatlar/02_Kompaniya_Taqdimoti_KP.md`, 34-37 satr | O‘lchov 1-kun, 3D-loyiha 2-kun, «1 kun ichida to'liq o'rnatib beriladi» | 1 / 2 / 1 kun | **Tekshirish kerak.** Bu o‘lchov va loyiha bosqichlari, yetkazish emas. Lekin mijoz «3 kun» deb o‘qishi mumkin. Montaj «1 kun» ham shartnomadagi 7 ish kuniga (yetkazish va montaj birga) aniq mos kelmaydi |

## 2. Chegirma

| Fayl | Gap | Raqam | Holat |
|---|---|---|---|
| `hujjatlar/01_Prays_list_va_Katalog_2026.md`, 57-58 satr | Menejer 5% gacha (buyurtma 20 mln dan oshsa). ROP 10% gacha (100% oldindan to‘lov yoki 50 mln dan oshsa, yozma ruxsat bilan) | 5% / 10% | Rasmiy |
| Shu fayl, 59-satr | 10% dan yuqori taqiqlangan; faqat Bosh direktor imzosi bilan, 150 mln dan yuqori tenderda ko‘riladi | >10% | Istisno bor. CLAUDE.md esa «10% dan yuqori taqiqlangan» deb istisnosiz yozgan |
| `kit1-interviews/jamshid-form-b.md`, 8-qator (59-satr) | «o'n ikki-o'n besh foizgacha» (30-40 mln buyurtmaga) | 12-15% | **Zid.** Og‘zaki; egasi to‘xtatgan |
| `kit1-interviews/jamshid-form-b.md`, 6-qator (57-satr) | «menejer 5% gacha, men 10% gacha» | 5% / 10% | Mos |
| `kit1-interviews/malika-form-b.md`, 6-vazifa (20-satr) va 81-satr | «chegirma qoidasi yozilmagan» | - | **Zid.** Prays-listning 5-bo‘limida yozma qoida bor. Xodim uni bilmaydi, shuning uchun har savol rahbarga ketadi (kuniga 4 marta) |
| `hujjatlar/04_Ichki_Tartib_va_KPI_Reglamenti.md`, 19-satr | KPI bonusidan «10% chegirish» (kechikish uchun) | 10% | Zid emas. Bu mijoz chegirmasi emas, jarima; adashtirmaslik kerak |

## 3. Kafolat

| Fayl | Gap | Raqam | Holat |
|---|---|---|---|
| `hujjatlar/03_Namunaviy_Shartnoma_va_Kafolat.md`, 4.1 (38-39 satr) | Korpus **24 oy**; kreslo mexanizmi, gazlift, g‘ildirak va furnitura **12 oy** | 24 / 12 | Rasmiy |
| `hujjatlar/02_Kompaniya_Taqdimoti_KP.md`, 25-26 satr | «3 yillik (**36 oy**) to'liq kafolat»; «barcha mebel va kreslolarga» | 36 | **Zid.** CLAUDE.md buni xato deb belgilagan, marketing tuzatishi kerak |
| Shu KP, 26-satr | Servis brigadasi «**48 soat** ichida» keladi | 48 soat | **Zid.** Shartnomada 4.2: murojaatdan **5 ish kuni** ichida ta’mirlaydi yoki almashtiradi |
| Intervyularda | Kafolat haqida gap topilmadi | - | Zid yo‘q |

## Xulosa
- Eng xavfli zidlik KP (`02_...KP.md`): 36 oy kafolat va 48 soatlik servis shartnomaga zid va mijozga va’da bo‘lib qolgan.
- Intervyudagi 3 kun va 12-15% - egasi 26-noyabrda to‘xtatgan og‘zaki qoidalar. Yozma hujjatlar to‘g‘ri.
- Malikada yozma chegirma qoidasidan xabarsizlik bor. Bu raqam zidligi emas, bilim bo‘shlig‘i. Agent mana shu bo‘shliqni yopishi mumkin.
- Prays-listdagi «Bosh direktor imzosi bilan, 150 mln dan yuqori tender» istisnosi CLAUDE.md va agent yo‘riqnomasida yo‘q. Kerak bo‘lsa, `kit3-agent/instructions.md` ni tekshirib beraman.
