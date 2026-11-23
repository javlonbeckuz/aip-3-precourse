# 2-mashq: Yo‘riqnoma yoki ma’lumotni tuzatish

5-dars, 1:15-1:35.
Natija: 1-mashqdagi har bir xato uchun eng kichik tuzatish kiritilgan, To‘plam 5 B.13 dagi «Nimani o‘zgartirdik» katagi to‘ldirilgan.
Test va serverga joylash 3-mashqda.

## Kerak bo‘ladi

- 1-mashqdagi jadval: har bir xato, turi va fayli bilan.
- Claude Code `kompaniya/` papkasida ochiq (`app/` uning ichida).
- OpenRouter limiti yetarli: har bir `pilot ask` taxminan $0.003-0.005 (40-60 so‘m).

## Qanday bajariladi

Har bir xato uchun quyidagi tartib (`app/CLAUDE.md` dagi «yaxshilash halqasi» xuddi shu):

1. **Xatoni takrorlang.**
   Xuddi o‘sha savolni noutbukda bering: `uv run pilot ask "<savol>"`.
   Xato takrorlanmasa, sababini topa olmaysiz; mentor bilan gaplashing.
2. **Eng kichik o‘zgarishni toping.**
   - Fakt yetishmasa: `agent/memory.md` ga bitta qator, sana bilan.
   - Qoida noaniq bo‘lsa: `agent/instructions.md` dagi o‘sha bitta qator, aniq so‘zlar bilan.
   - Javob shakli yomon bo‘lsa: `agent/examples.md` ga 2-3 ta haqiqiy to‘g‘ri javob (few-shot).
   - Ma’lumot eski bo‘lsa: faylni yangilash tartibi va `agent/sources.toml` dagi `max_age_hours`.
3. **Farqni ko‘ring.**
   Claude Code eski va yangi matnni yonma-yon ko‘rsatsin; Siz tasdiqlaysiz.
4. **B shaklini sinxron qiling.**
   O‘zgarish B.4, B.5 yoki B.6 ga tegsa, `kit3-agent/form-b-agent.md` dagi o‘sha maydonni ham yangilang: xodimlar ko‘radigan shakl eskirmasin.
5. **B.13 ni to‘ldiring.**
   `kit5-pilot/numbers.md` dagi xatolar jurnalida «Nimani o‘zgartirdik» katagiga bir gap yozing.

### Claude Code uchun topshiriq (har bir xato uchun bittadan)

```text
Mana xatolar jurnalidan bitta xato: [xatoni /xatolar dan nusxalab qo'ying].
1-mashqda uning turini [tur] deb belgiladim.
app/CLAUDE.md dagi "yaxshilash halqasi" bo'yicha ishla:
avval "uv run pilot ask" bilan xatoni takrorla (narxini ayt, mendan ruxsat so'ra),
keyin eng kichik o'zgarishni taklif qil: qaysi fayl, eski matn, yangi matn.
Kodni o'zgartirma. Men tasdiqlamagunimcha faylga yozma.
O'zgarish B.4, B.5 yoki B.6 ga tegsa, kit3-agent/form-b-agent.md ni ham yangilashni taklif qil.
Oxirida kit5-pilot/numbers.md dagi B.13 "Nimani o'zgartirdik" katagiga bitta gap yoz.
```

To‘plam 5 skilli bilan ham shu ishni qilsa bo‘ladi: `/kit5 xato`.
U xatoni B.13 ga yozadi, `kit3-agent/instructions.md` ga o‘zgarish taklif qiladi va test qo‘shadi.
Keyin `app/agent/instructions.md` ni unga moslashtirishni Claude Code’dan so‘rang (`app/CLAUDE.md` buni biladi).

### Telefondan tez yo‘l: `/eslab_qol`

Fakt yetishmasa (1-tur), uni telefoningizdan darhol qo‘shishingiz mumkin:

```text
/eslab_qol Menejerlar «Staf mesh» yoki «stafmesh» deb yozsa, bu «Staff Mesh» xodim kreslosi (CH-201)
```

Baraka namunasida Jamshid aka buni 2-haftada, 23-dekabr kuni yozdi: ertasi kuni «Staf mesh 4 ta qancha?» savoliga to‘g‘ri narx chiqdi.

Bot uni keyingi savoldan boshlab ishlatadi, serverga joylash shart emas.
`/xotira` - ro‘yxat, `/unut 2` - 2-faktni o‘chirish.
Ehtiyot bo‘ling: bu faktlar faqat serverda saqlanadi (`runtime/memory.md`).
Noutbukdagi testlar ularni ko‘rmaydi.
Shu hafta ichida ularni `agent/memory.md` ga ko‘chiring va test qo‘shing (3-mashq).

## Baraka Office namunasi

To‘liq farq: `namuna/yaxshilash/farq.diff`.
Oldingi va keyingi fayllar: `namuna/yaxshilash/agent-v1/` va `namuna/yaxshilash/agent-v2/`.

**1. Takrorlash** (`namuna/yaxshilash/ask-1-5-dona-oldin.txt`, `ask-2-kafolat-oldin.txt`):

```text
$ uv run pilot ask "Optima stolidan 5 ta kerak, narxi?"
«Optima» 5 dona: 2 150 000 x 5 = 10 750 000 so‘m.

$ uv run pilot ask "Kreslo kafolati qancha?"
Barcha kreslolarga 3 yil kafolat.
--- holat: answered, ... manbalar: ..., Kompaniya taqdimoti (KP)
```

Ikkala xato takrorlandi; ikkinchisining manbalari orasida KP turibdi.

**2. Tuzatishlar** (eng kichigidan boshlab):

| Xato | Fayl | O‘zgarish |
|---|---|---|
| Kafolat 3 yil, Chirchiqqa bepul (17.12, KP) | `agent/sources.toml`, `agent/memory.md` | KP manbalar ro‘yxatidan olib tashlandi; `memory.md`: «- 2026-12-20: Narx, chegirma, kafolat va yetkazish shartlari faqat prays-list va qoidalar hujjatidan; KP (taqdimot) - reklama, unga tayanma.» |
| 5 va 6 dona chakana (15.12) | `agent/instructions.md`, B.4 | Eski: «1-4 dona uchun chakana, 5 va undan ko‘p dona uchun ulgurji narx». Yangi: «1-4 dona - chakana; 5 va undan ko‘p dona (5, 6, 7 ...) - ulgurji narx; 5 dona ham ulgurji.» |
| 18 mln chegirma (16.12) | `agent/examples.md` | Ikki namuna: 5 donali buyurtma hisobi va «18 mln: chegirma yo‘q» javobi |
| Eski 1C fayli (16.12, 18.12) | `agent/sources.toml` | `max_age_hours = 25`, oxirida qo‘yiladi; Otabek aka bilan kelishuv: har ish kuni 08:00 da eksport; 10:30 da tekshiruv ishi (4-mashq) |

**Nega `max_age_hours = 25`:** eksport har kuni 08:00 da keladi.
25 soat - kechagi fayl ertasi kuni 09:00 gacha hali «yangi», 09:00 dan keyin «eski» hisoblanadi.
Bot fayl yoshini har bir savolda tekshiradi.
Shunda 10:30 dagi tekshiruv ishi eksport kelmaganini ko‘radi.
Kamchiligi: yakshanba kuni ham «fayl eski» ogohlantirishi keladi; dushanba 08:00 da yangi fayl kelgach o‘tadi.

**Tartib muhim:** `max_age_hours` ni oxirida qo‘ying, testlar yashil bo‘lgandan keyin.
Dars kuni noutbukdagi 1C fayli odatda eski (yakshanba kuni eksport yo‘q, shanba kungi eksport esa serverda): shundan keyin `pilot eval` dagi qoldiq testlari odamga uzatadi va regressiyaga o‘xshab ko‘rinadi.
Ma’lumot tuzatishini `pilot eval` bilan emas, `pilot check` va `pilot ask` bilan tekshiring (pastda), keyin bir marta joylang.

**3. Ma’lumot tuzatilganini tekshirish** (`namuna/yaxshilash/check-eski-fayl.txt`, `ask-3-eski-fayl-keyin.txt`):

```text
⚠️ Ombor qoldig‘i (1C eksport): 11 qator, ustunlar: Код, Номенклатура, Количество, Последнее движение
   Ombor qoldig‘i (1C eksport): fayl 28 soatdan beri yangilanmagan (chegara 25 soat)

$ uv run pilot ask "ErgoPro omborda bormi?"
ODAMGA: ombor fayli bilan muammo (... fayl 28 soatdan beri yangilanmagan (chegara 25 soat)), qoldiqni Otabek akadan aniqlash kerak.
```

Endi eski fayldan «ha, bor» demaydi, Jamshid akaga uzatadi.

**4. B.13 ga yozilgani:**

| B.13 Sana | Nima bo‘ldi | Kim topdi | Nimani o‘zgartirdik |
|---|---|---|---|
| 15.12 | «Optima 5 ta»: chakana narx (10 750 000), kerak ulgurji (9 450 000) | Malika | Yo‘riqnoma B.4: «5 va undan ko‘p dona - ulgurji; 5 dona ham ulgurji»; namuna; T9 (test ulgurji-5-dona) |
| 15.12 | «Start 6 ta»: chakana narx (8 700 000), kerak ulgurji (7 680 000) | Madina | Xuddi shu o‘zgarish; T10 (test ulgurji-6-dona); testlar qayta o‘tdi |
| 16.12 | ErgoPro «bor» dedi, fayl 31 soat eski | Madina | sources.toml: max_age_hours = 25; 08:00 eksport kelishuvi; 10:30 tekshiruv ishi |
| 16.12 | 18 mln buyurtmaga «5% gacha bera olasiz» | Malika | examples.md: 18 mln namunasi (chegirma 20 000 000 dan); T11 (test chegirma-18-mln) |
| 17.12 | «Chirchiqqa yetkazish bepul» (KP); tasdiqlashda ushlandi, mijozga ketmadi | Malika | KP manbalardan olindi; memory.md: shartlar faqat qoidalar hujjatidan (shartnoma ustun); T12 (test yetkazish-chirchiq) |
| 17.12 | «Barcha kreslolarga 3 yil kafolat» (KP) | Jamshid aka | Xuddi shu o‘zgarish; T7 (test kafolat-kreslo) 3-darsdan beri bor edi |
| 18.12 | Senator «bor» dedi, fayl yana eski | Madina | 16.12 dagi bilan bitta tuzatish |

## Yomon namuna: bitta katta «tuzatish»

> instructions.md B.4 ga yozildi: «Mijozlarimiz korporativ, shuning uchun har doim ulgurji narxni aytasan.»
> 5 va 6 dona xatolari yo‘qoldi. Serverga joyladik.

**Nimasi yomon:**

- Ikki xatoni yo‘qotish uchun butun qoida o‘zgardi: endi 2 ta Start stoliga ham ulgurji narx chiqadi: 2 560 000 so‘m, to‘g‘risi 2 900 000 so‘m.
- Test to‘plami ishga tushirilmagan.
  Ishga tushirilganda natija o‘zgarmagan ko‘rinadi (12 dan 9 ta), lekin yiqilganlar boshqa: 3-darsdan beri o‘tib kelgan ikkita test (`chakana-start-2`, `chakana-ergopro-3`) endi yiqiladi (`namuna/yaxshilash/eval-3-regressiya.txt`).
  Bu **regressiya**: bitta tuzatish boshqa ishlayotgan joyni buzdi.
  Faqat jami raqamga qarasangiz, uni ko‘rmaysiz.
- Menejerlar mijozlarga 1-4 donali buyurtmalarda ham arzon narx aytgan bo‘lardi: har birida kompaniya pul yo‘qotardi.

**To‘g‘rilangan:** eski qoidaning noaniq joyini aniqlash: «1-4 dona - chakana; 5 va undan ko‘p dona - ulgurji; 5 dona ham ulgurji».
Natija: 12 dan 12 (`eval-4-keyin.txt`).

## Tez-tez uchraydigan xatolar

- **Hamma narsani bir vaqtda o‘zgartirish.**
  Bitta xato, bitta o‘zgarish, keyin test.
  Aks holda qaysi o‘zgarish yordam berganini bilmaysiz.
- **Yo‘riqnomaga «ehtiyot bo‘l», «diqqat qil» qo‘shish.**
  Bu so‘zlar hech narsani o‘zgartirmaydi; aniq qoida yoki aniq fakt yozing.
- **Bir martalik holatni qoidaga aylantirish.**
  Bitta mijoz bilan bo‘lgan voqea qoida emas; uni B.6 orqali odamga uzating.
- **Ma’lumot xatosini yo‘riqnoma bilan yopish.**
  Eski fayl muammosi faylning o‘zida hal bo‘ladi: kim, qachon eksport qiladi.
- **Kodni o‘zgartirish.**
  Birinchi haftada kod kamdan-kam kerak.
  Claude Code kod o‘zgartirmoqchi bo‘lsa, «nega matn fayli yetmaydi?» deb so‘rang.

## Tayyor, agar

- [ ] Har bir agent xatosi takrorlangan (`pilot ask`).
- [ ] Har biri uchun eng kichik o‘zgarish kiritilgan, farqni Siz ko‘rgansiz.
- [ ] B.4-B.6 o‘zgargan bo‘lsa, `kit3-agent/form-b-agent.md` ham yangilangan.
- [ ] B.13 dagi har bir qatorda «Nimani o‘zgartirdik» to‘ldirilgan.
- [ ] Telefondan qo‘shilgan faktlar `agent/memory.md` ga ko‘chirilgan yoki ko‘chirish rejalashtirilgan.
