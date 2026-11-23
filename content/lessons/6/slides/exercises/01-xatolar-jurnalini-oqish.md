# 1-mashq: Xatolar jurnalini o‘qish va xatolarni turlarga ajratish

5-dars, 1:00-1:15 (instruktor namoyishidan keyin).
Natija: har bir xato uchun bitta qator: nima bo‘ldi, qaysi turga kiradi, qayerda tuzatiladi.
Bu mashq tuzatishdan oldin bajariladi: sababini bilmasdan tuzatsangiz, boshqa joyni buzasiz.

## Kerak bo‘ladi

- Botingiz kamida 4 ish kuni ishlagan bo‘lsin (4-darsdan keyin).
- Telefoningizda bot ochiq, Siz uning egasisiz (`OWNER_CHAT_ID`).
- Noutbukda Claude Code `kompaniya/` papkasida ochiq.
- To‘plam 5 B shakli: `kompaniya/kit5-pilot/numbers.md`.

## Qanday bajariladi

1. Telefoningizdan botga `/xatolar` yozing.
   Bot oxirgi 14 kundagi ❌ bosilgan, rad etilgan yoki tekshiruvchi tuzatgan javoblarni chiqaradi.
   Har birida: sana, raqam (#...), savol, agent javobi va izoh.
2. Botga `/hafta` yozing va kelgan faylni `kompaniya/kit5-pilot/` papkasiga saqlang.
   Faylning oxirida «Xatolar jurnali (B.13)» jadvali bor: bu o‘sha xatolar, jadval ko‘rinishida.
3. Har bir xatoni o‘qing va o‘zingizga uchta savol bering:
   - Agent nimani bilmadi yoki nimani noto‘g‘ri tushundi?
   - To‘g‘ri javob qayerda yozilgan edi: ma’lumotda, yo‘riqnomada yoki faqat odamning boshida?
   - Xato agentnikimi yoki savolning o‘zi noto‘g‘ri berilganmi?
4. Har bir xatoni quyidagi beshta turdan biriga qo‘ying.
5. Claude Code’ga yozing (pastdagi topshiriq matni) va jadvalni birga tekshiring.

### Beshta tur

| Tur | Belgisi | Qayerda tuzatiladi |
|---|---|---|
| 1. Fakt yetishmaydi | Agent biror so‘z, taxallus yoki qoidani bilmaydi («140 lik stol» nima?) | `agent/memory.md` (shoshilinch bo‘lsa telefondan `/eslab_qol`) |
| 2. Yo‘riqnoma noaniq | Qoida ikki xil tushuniladi, agent «noto‘g‘ri» tomonini tanlaydi | `agent/instructions.md` (To‘plam 3 B shakli) |
| 3. Ma’lumot eski yoki xato | Fayl yangilanmagan, bo‘sh keldi, raqam xato | `data/`, `agent/sources.toml` va manba egasi bilan kelishuv |
| 4. Javob shakli yomon | Javob to‘g‘ri, lekin uzun, tartibsiz, mijozga yuborib bo‘lmaydi | `agent/examples.md` (2-3 ta to‘g‘ri namuna) |
| 5. Agent xatosi emas | Savol noto‘g‘ri berilgan, xodim adashib ❌ bosgan | Hech narsa o‘zgarmaydi; xodimga qisqa eslatma |

Oltinchi, kam uchraydigan tur: texnik xato (bot javob bermadi, «texnik xato» yozuvi).
Uni mentor bilan `deploy.py logs` orqali ko‘rasiz, yo‘riqnoma bilan emas.

Qoida: kodni oxirgi navbatda o‘zgartiring.
Birinchi haftadagi xatolarning ko‘pi 1-3 turlarga tushadi va matn faylida tuzatiladi.

### Claude Code uchun topshiriq

```text
kit5-pilot/ papkasidagi oxirgi kit5-raqamlar fayli va men yuborgan /xatolar matni bor.
Har bir xatoni 5 turdan biriga ajrat: fakt yetishmaydi, yo'riqnoma noaniq,
ma'lumot eski yoki xato, javob shakli yomon, agent xatosi emas.
Jadval qil: sana, qisqacha nima bo'ldi, tur, qaysi faylda tuzatiladi, nega shu tur.
Izohsiz rad etilgan xato bo'lsa, "sababi noma'lum" deb yoz va kimdan so'rashni ayt.
Hech bir faylni o'zgartirma, faqat jadvalni ko'rsat.
```

Claude Code xato qilishi mumkin: har bir qatorni o‘zingiz tekshiring.
Turni Siz tasdiqlaysiz, chunki biznesni Siz bilasiz.

## Baraka Office namunasi

Shartli misol: «Baraka Office» MChJ, Savdo yordamchisi, sinovning 1-haftasi (14-19 dekabr, dushanba-shanba).
1-haftada har bir javobni xodim mijozga yuborishdan oldin hujjat bilan solishtirdi va ✅ yoki ❌ bosdi.
Bu yozuvlar botni soxta Telegram bilan bir hafta ishlatib olingan (`namuna/baraka-1-hafta/xatolar.txt`, `namuna/baraka-1-hafta/jurnal/`).
Raqamlar kursning umumiy Baraka namunasi bilan bir xil: 132 so‘rov, 7 xato.

| Sana, # | Nima bo‘ldi | Tur | Qayerda tuzatiladi |
|---|---|---|---|
| 15.12, #2e09e4b8 | «Optima stolidan 5 ta»: chakana narx (10 750 000), kerak edi ulgurji (9 450 000) | 2. Yo‘riqnoma noaniq | `instructions.md`, B.4: «5 dona ham ulgurji» |
| 15.12, #ab195b47 | «Start stoli 6 ta»: chakana narx (8 700 000), kerak edi ulgurji (7 680 000) | 2. Yo‘riqnoma noaniq (yuqoridagi bilan bitta sabab) | O‘sha tuzatish |
| 16.12, #c958a792 | «ErgoPro omborda bormi?» - «Ha, bor» dedi; 1C fayli 31 soat eski edi, mahsulot sotilgan | 3. Ma’lumot eski | `sources.toml`: `max_age_hours`; Otabek aka bilan har ish kuni 08:00 eksport; 10:30 da tekshiruv ishi (4-mashq) |
| 16.12, #7c213c12 | «18 mln lik buyurtmaga chegirma?» - «Ha, 5% gacha» dedi; qoida: faqat 20 000 000 so‘mdan oshsa | 2. Yo‘riqnoma: qoida bor, agent o‘tkazib yubordi | `examples.md`: 18 mln namunasi (few-shot) |
| 17.12, #e928d1d5 | «Chirchiqqa yetkazish bepulmi?» - «Ha, bepul» dedi (KP dagi gap); shartnomada 8 000 so‘m/km; Malika mijozga ketishidan oldin tasdiqlashda ushladi | 3. Ma’lumot xato: ikki hujjat bir-biriga zid | `sources.toml`: KP manbadan olib tashlanadi; `memory.md`: shartlar faqat qoidalar hujjatidan |
| 17.12, #ba30a818 | «Kreslo kafolati qancha?» - «3 yil» dedi (KP); shartnomada mexanizmga 12 oy | 3. Ma’lumot xato (yuqoridagi bilan bitta sabab) | O‘sha tuzatish |
| 18.12, #3f8803ea | «Senator kreslo omborda bormi?» - «Ha, bor» dedi; fayl yana eski edi | 3. Ma’lumot eski (16.12 bilan bitta sabab) | O‘sha tuzatish |

**Nega shunday yozildi (izohlar):**

- 15.12 (ikkala yozuv): B.4 da «5 va undan ko‘p dona uchun ulgurji» deb yozilgan.
  Agent 5 va 6 donani chakana hisobladi, 8 donani esa to‘g‘ri hisoblab keldi: qoida yetarlicha aniq emas.
  Ikki xato, bitta sabab: bitta tuzatish, ikkita test.
- 16.12 (ombor): agent faylda yozilganini to‘g‘ri aytdi.
  Xato faylda: u bir kun eski edi.
  Yo‘riqnomani o‘zgartirish yordam bermaydi; ma’lumotning yangiligini tekshirish kerak.
  18.12 da xato takrorlandi, chunki sabab hali tuzatilmagan edi.
- 16.12 (chegirma): qoida qoidalar hujjatida ham, B.4 da ham bor.
  Agent uni bilmagani uchun emas, chegarani o‘tkazib yuborgani uchun adashdi: aynan shu holatdagi to‘g‘ri javob namunasi eng tez yordam beradi.
- 17.12 (KP): 4-darsda mahsulot tavsiflari uchun KP (tijorat taklifi) ham manbaga qo‘shilgan.
  KP da «3 yil kafolat» va «viloyatga bepul yetkazish» deb yozilgan, shartnomada esa boshqacha.
  Bu kompaniyaning o‘z hujjatlaridagi ziddiyat: agent qaysi biri to‘g‘riligini bila olmaydi.
  Kafolat bo‘yicha test 3-darsdan beri bor edi, lekin KP qo‘shilgandan keyin testlar qayta ishga tushirilmagan.
- «Kim topdi»: Malika (loyiha yetakchisi, qoralamalarni tasdiqlagan), Madina va Jamshid aka (ROP).
  Yettala xato ham mijozga yetmasdan ushlangan: 1-haftada tasdiqlash shuning uchun kerak.
  Chirchiq xatosi eng xavflisi edi: Malika ushlamaganida mijozga noto‘g‘ri shart ketardi va To‘plam 5 A.7 bo‘yicha sinov to‘xtatilardi.

Natija: 7 ta yozuv - 4 ta sabab - 4 ta o‘zgarish (B.4 qoidasi, bitta namuna, KP ni manbadan olib tashlash, ombor faylining yangiligi).
Kod hech qayerda o‘zgarmaydi.

## Yomon namuna

> Xatolar jurnali: 7 ta xato.
> Sabab: AI hali yaxshi emas, model zaif.
> Tuzatish: kuchliroq modelga o‘tamiz (MODEL_TIER=strong).

**Nimasi yomon:**

- Birorta xato o‘qilmagan; «model zaif» - taxmin, dalil emas.
- Yettita xatoning birortasi model kuchidan emas: to‘rttasi ma’lumotda (eski fayl, KP), uchtasi qoidaning aniq yozilmaganida.
  Kuchli model eski 1C faylini yangilamaydi va KP bilan shartnomaning qaysi biri to‘g‘riligini bilmaydi.
- Kuchli model narxi taxminan 2-3 barobar qimmat, tekshiruv vaqti esa o‘zgarmaydi.

**To‘g‘rilangan:** yuqoridagi jadval kabi har bir xato alohida, turi va tuzatiladigan fayli bilan.
Model almashtirish faqat test to‘plami boshqa modelda yaxshiroq natija ko‘rsatsa (3-mashq, `pilot eval --tier`).

## Tez-tez uchraydigan xatolar

- **Jurnal bo‘sh.**
  Mentor so‘raydi: «Hech kim hech narsa topmadimi yoki hech kim tekshirmadimi?»
  Bo‘sh jurnal odatda tekshiruv yo‘qligini bildiradi.
  Shunda o‘tgan haftadagi 10 ta haqiqiy savolni `uv run pilot ask` bilan bering va javoblarni o‘zingiz tekshiring.
- **Izohsiz ❌ va rad etishlar.**
  Xodimdan yoki tekshiruvchidan bugun so‘rang va javobini jadvalga yozing.
  Keyingi hafta uchun kelishing: ❌ bosgandan keyin bir gap izoh.
- **Bitta xatoni ikki marta sanash.**
  Bir xil xato uch kun takrorlansa, bu bitta sabab: bitta tuzatish, bitta test.
- **Xodimni ayblash.**
  Jurnal ishni o‘lchaydi, odamni emas.
  «Kim topdi» ustuniga rolini yozing va topgani uchun rahmat ayting.

## Tayyor, agar

- [ ] `/xatolar` va `/hafta` ochildi, fayl `kit5-pilot/` da.
- [ ] Har bir xato bitta qator: nima bo‘ldi, tur, qaysi faylda tuzatiladi.
- [ ] Bir xil sababli xatolar bitta tuzatishga birlashtirilgan; «agent xatosi emas» qatorlari (bo‘lsa) ajratilgan.
- [ ] Izohsiz xatolar uchun kimdan so‘rash belgilangan.
- [ ] Mentor jadvalni ko‘rdi (stoldagi tekshiruv 5.2).
