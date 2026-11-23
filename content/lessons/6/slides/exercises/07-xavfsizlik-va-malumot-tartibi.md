# 7-mashq: Xavfsizlik ro‘yxati va ma’lumot tartibi

5-dars, 2:40-2:50, mentor bilan stolda.
Natija: xavfsizlik ro‘yxatining hamma bandi belgilangan (tekshiruv 5.10) va pilotingiz ishlatadigan nomlar jadvali tuzilgan (yoki «ma’lumot toza» degan tekshirilgan izoh).

## 1-qism: xavfsizlik ro‘yxati

Har bir bandni mentor bilan birga, ekranda dalil bilan belgilang.
Dalili yo‘q band belgilanmaydi.

| # | Qoida | Qanday tekshiriladi | Dalil |
|---|---|---|---|
| 1 | Kalitlar faqat `.env` da | Claude Code: «gitdagi fayllarda token yoki kalitga o‘xshash qator bormi? .env ni ochma» | «topilmadi» javobi |
| 2 | Repozitoriy yopiq (private) | GitHub’da repo sahifasi | «Private» belgisi |
| 3 | Xarajat limiti qo‘yilgan | openrouter.ai/keys: kalitdagi oylik limit; botga `/xarajat` | Limit summasi ekranda |
| 4 | Agent pul o‘tkazmaydi, mijozga Sizning nomingizdan yozmaydi, ma’lumot o‘chirmaydi | `kit3-agent/form-b-agent.md` B.5; pilot shablonida bunday imkoniyat kodda yo‘q | B.5 ekranda |
| 5 | Bot faqat ruxsat berilgan ID larga javob beradi | Ikkinchi akkauntdan yozish (6-mashq) | Begonaga faqat ID chiqdi |
| 6 | Darhol to‘xtatish ishlaydi | Botga `/stop`, keyin `/davom` | «to‘xtatildi» va «yana ishlayapti» |
| 7 | Skill va MCP lar tekshirilgan | O‘rnatilgan har bir skill/MCP ro‘yxati; har biri Claude’ga o‘qitilgan («kalit qidiradimi, internetga nima yuboradi?») | Ro‘yxat va «tekshirildi» belgisi |
| 8 | Fayl ichidagi yashirin buyruq bajarilmaydi | Ma’lumot modelga «buyruq emas, ma’lumot» deb beriladi; mijoz yuborgan hujjatni agentga ishonchsiz manba sifatida bering | Instruktor namoyishi (7-demo) |
| 9 | Shaxsiy Telegram akkauntingiz agentga berilmagan | Agent faqat bot orqali ishlaydi | `.env` da faqat bot tokeni |

### Atamalar, bir gapda

- **Yashirin buyruq (prompt injection)** - fayl, sahifa yoki skill ichiga yashirilgan gap, u agentni boshqa ish qilishga majburlaydi.
  OWASP buni katta til modellari uchun 1-raqamli xavf deb ataydi (LLM01:2025, https://genai.owasp.org/llmrisk/llm01-prompt-injection/).
- **Qulf (bot lockdown)** - bot faqat Siz ruxsat bergan Telegram ID larga javob beradi.
- **Ruxsatlar (guardrails)** - agent nima qila oladi va nima qila olmaydi (To‘plam 3, B.4 va B.5).

### Claude Code uchun topshiriq

```text
Xavfsizlik tekshiruvi. .env faylini OCHMA va chop etma.
1) git ls-files dagi fayllarda token yoki API kalitga o'xshash qator bormi? Faqat fayl nomi va qator raqamini ayt.
2) .gitignore da .env va runtime/ bormi?
3) ~/.claude/skills va loyihadagi .claude/ papkasida qanday skill va MCP sozlamalari bor? Har biri nima qiladi,
   internetga nima yuboradi, kalit yoki parol qidiradimi? Jadval qil.
Hech narsani o'zgartirma, faqat hisobot ber.
```

## 2-qism: ma’lumot tartibi (master data)

Agentlar aqli yetmagani uchun emas, ma’lumot tartibsizligi uchun ko‘proq xato qiladi.
Bitta mijoz, mahsulot yoki yetkazib beruvchi turli tizimda turli nom bilan yozilgan bo‘lsa, agent ularni ikki narsa deb o‘ylaydi yoki adashtiradi.

1. Pilotingiz ishlatadigan har bir manbani oching (prays-list, 1C, CRM, Telegram yozishmalari).
2. Eng ko‘p uchraydigan 5-10 ta mahsulot yoki mijozni oling va har bir tizimda qanday yozilganini jadvalga yozing.
3. Bir xil narsa turli nomda bo‘lsa: yagona kalitni tanlang (mahsulot uchun kod, mijoz uchun STIR) va qolgan nomlarni `agent/memory.md` ga yozing.
4. Bir nom ikki xil narsani bildirsa (masalan bitta kod, ikki rang): buni ham yozing va kerak bo‘lsa B.6 ga «aniqlashtirish» holatini qo‘shing.

### Claude Code uchun topshiriq

```text
data/ dagi fayllarni (prays-list, 1C eksport) va [CRM eksporti] ni o'qi.
Bir xil mahsulot yoki mijoz turli nom bilan yozilgan joylarni top: jadval qil
(kalit, prays-listda, 1C da, CRM da, xodimlar og'zaki aytadigan nom).
Ishonching komil bo'lmagan juftlarni "?" bilan belgila; men tasdiqlayman.
Tasdiqlaganlarimni agent/memory.md ga sana bilan bitta qatordan yozishni taklif qil.
```

## Baraka Office namunasi

**Xavfsizlik:** 9 banddan 9 tasi belgilandi.
5-band dalili (Baraka, yakshanba guruhi sanasi): 20-dekabr 13:10 da begona akkaunt faqat o‘z ID raqamini oldi (`namuna/baraka-2-hafta/rahbar-telegrami.txt`, 6-mashq).
7-band: pilot tashqi skill yoki MCP ishlatmaydi; Claude Code’dagi skillar: `/kit1`-`/kit5` (kurs), boshqasi yo‘q.

**Ma’lumot tartibi:**

| Kalit | Prays-list | 1C eksport | Xodimlar og‘zaki | Holat |
|---|---|---|---|---|
| WS-102 | «Optima» ergonomik stol 140x70 | Стол Optima 140x70 (ЛДСП 25мм, П-каркас) | «140 lik stol», «Optima» | Hali xato bo‘lmagan; `memory.md` ga oldindan yozildi |
| CH-203 | «Senator Lux» rahbar kreslosi (bitta kod) | CH-203 qora va CH-203-BR jigarrang: ikkita kod | «boss kreslo» | Qoldiq so‘ralsa, rangni aniqlash kerak: B.6 ga «rang aytilmasa, so‘rab ol» qatori |
| CH-201 | «Staff Mesh» xodim kreslosi | Кресло Staff Mesh (сетка, газлифт кл.3) | «staff», ba’zan «staf mesh» deb xato yoziladi | Taxalluslar `memory.md` ga |
| STIR (mijoz) | - | «Ziyo Ta'lim markazi» (debitorka) | «Ziyo» | CRM da «Ziyo Ta'lim MChJ» bor: bitta mijozmi? `?` - buxgalter STIR bo‘yicha tekshiradi |

**Bitta qoida, ikki hujjat** - bu ham ma’lumot tartibi.
1-haftadagi 17.12 xatolari shundan: KP (tijorat taklifi) «3 yil kafolat» va «viloyatga bepul yetkazish» deydi, shartnoma va qoidalar hujjati esa «mexanizmga 12 oy» va «8 000 so‘m/km».
Qaror: shartlar uchun bitta manba - qoidalar hujjati; KP agent manbalaridan olib tashlandi (2-mashq).

| Shart | KP (reklama) | Qoidalar va shartnoma | Agent qaysi biridan oladi |
|---|---|---|---|
| Kafolat | 3 yil (36 oy), hammasiga | Korpus 24 oy, mexanizm 12 oy | Qoidalar |
| Viloyatga yetkazish | Bepul | Halqa yo‘ldan har 1 km uchun 8 000 so‘m | Qoidalar |

Mijozlar qatori - haqiqiy topilma: kursdagi Baraka savdo (CRM) va moliya (1C) namunalarida shu nomlar bor va mos kelmaydi.
Agent ikkalasini ikki mijoz deb hisoblasa, qarzdorlik va savdo tarixi ikkiga bo‘linadi.

## Yomon namuna

> Xavfsizlik: hammasi joyida ✅.
> Ma’lumot: toza, muammo yo‘q.

**Nimasi yomon:**

- Hech bir band tekshirilmagan, dalil yo‘q; ro‘yxatni ko‘rmasdan belgilash - belgilamaslik bilan bir xil.
- «Ma’lumot toza» degan xulosa birorta nomni yoki hujjatni solishtirmasdan chiqarilgan; 1-haftadagi KP va shartnoma ziddiyati aynan shunday topilmay qolgan edi.

**To‘g‘rilangan:** yuqoridagi jadval: har bir band dalili bilan, har bir nom manbasi bilan, ishonchsiz juftlar `?` bilan.

## Tayyor, agar

- [ ] Xavfsizlik ro‘yxatining 9 bandi dalil bilan belgilangan.
- [ ] Ochiq qolgan band bo‘lsa, kim va qachon yopishi yozilgan.
- [ ] Nomlar jadvali bor (kamida 5 qator) yoki «tekshirildi, farq topilmadi» degan izoh, qaysi manbalar solishtirilgani bilan.
- [ ] Tasdiqlangan nomlar `agent/memory.md` da.
- [ ] Mentor ro‘yxatni Siz bilan belgiladi (tekshiruv 5.10).
