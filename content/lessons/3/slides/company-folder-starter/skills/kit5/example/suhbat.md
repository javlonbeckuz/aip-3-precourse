# /kit5 namunasi: «Baraka Office» MChJ

Sana (kurs taqvimi bo‘yicha): 2026-12-12 (baseline) - 2026-12-27 (yakun).
Model: claude-opus-5-5.
Quyida egasi yozgan har bir xabar va Claude Code’ning to‘liq javobi, o‘zgartirilmagan holda (faqat apostrof va chiziqcha uslubi bir xil qilingan).

## 1-sessiya: /kit5 baseline (2-darsdan keyin)

### 1-xabar: siz yozasiz

```text
/kit5 baseline. Loyiha yetakchisi - Malika, 30-noyabr u bilan briefing.md bo‘yicha gaplashdim, rozi bo‘ldi. Tarix: «Baraka Savdo» Telegram guruhi eksportidan 30-noyabr - 5-dekabr haftasini sanadik: xodimlar narx, qoldiq, chegirma, muddat bo‘yicha 120 ta savol bergan; 100 tasiga to‘liq javob olingan; 15 tasi takroriy savol; Jamshid aka tekshirgan 9 ta javob xato chiqqan; mijozlardan 2 ta shikoyat. Jonli o‘lchov (Malika, 5 ish kuni, har turdan 3 ta holat): bitta savolga javob topish o‘rtacha 6 daqiqa. Jamshid aka javoblarni tekshirishga haftasiga 3 soat sarflaydi. Yakunlangan bitimlar amoCRMdan - bilmayman, [?] qolsin.
```

### Claude javobi

Fayl yozishdan oldin uchta narsani aniqlashtirib olishim kerak.
Hozircha hech narsa yozmadim.

**Hozir qo‘limda bor raqamlar (30.11-05.12, 1 hafta, 6 ish kuni):**

| Ko‘rsatkich | Haftasiga | Manba |
|---|---|---|
| B.1 Bajarilgan so‘rovlar | 120 | «Baraka Savdo» eksporti (tarix) |
| B.2 O‘rtacha vaqt | 6 daqiqa | Malikaning jonli o‘lchovi, 5 kun |
| B.3 Xato javoblar | 9 | Jamshid aka tekshirgan javoblar |
| B.4 Takroriy so‘rovlar | 15 | eksport (tarix) |
| B.5 To‘liq hal qilingan so‘rovlar | 100 | eksport (tarix) |
| B.6 Yakunlangan bitimlar | [?] | amoCRM, hali sanalmagan |
| B.8 Mijoz shikoyatlari | 2 | sizning so‘zingiz |

Qo‘shimcha hisob: 120 × 6 / 60 = 12 soat/hafta.
Ikki marta tekshirdim: 720 daqiqa / 60 = 12.
Inson qilgan bitta javobning narxi: 6 / 60 × 22 600 = 2 260 so‘m.

**Savollar:**

1. **Tarix bor-yo‘g‘i 1 hafta.** Qoida bo‘yicha 2-4 hafta kerak.
   Shu eksportdan 23-29 noyabrni (iloji bo‘lsa 16-22 noyabrni ham) shu tartibda sanab bera olasizmi?
   Bo‘lmasa, 1 haftaning o‘zini yozaman, ishonchni «o‘rta» qilib qo‘yaman.
2. **9 ta xato nechta javob ichidan chiqqan?** Jamshid aka hamma 100 ta javobni tekshirganmi yoki bir qismini (masalan, 30 tasini)?
   Bir qismini tekshirgan bo‘lsa, 9 eng kam son bo‘ladi, haqiqiy xato undan ko‘p bo‘lishi mumkin.
3. **Malikaning jonli yozuvi qaysi kunlarda bo‘ldi?** Har bir holatning daqiqasi saqlanganmi (4 tur × 3 = 12 holat)?
   Jonli yozuv jadvalini kunma-kun to‘ldirmoqchiman.
   Daqiqalar bo‘lmasa, kamida eng kam va eng ko‘p vaqtni ayting.

**Men shunday qilaman (e’tirozingiz bo‘lsa, ayting):**
- **Jamshid akaning 3 soati.** Qoida bo‘yicha B.7 «agentgacha» ustunida 0 bo‘ladi.
  Lekin bu 3 soat agentsiz ham ketayotgan haqiqiy vaqt.
  Shuning uchun uni alohida izoh qatoriga yozaman: 3 × 22 600 = 67 800 so‘m/hafta.
  Yakunda sinovdagi B.7 bilan solishtirsak, hisob halol chiqadi.
- **B.6 yakunlangan bitimlar.** Siz aytgandek [?] qoldiraman va qachon sanalishini yozaman.
  Papkada `data/amocrm-eksport-2026-11.csv` bor (852 ta bitim).
  Unda 30.11-05.12 haftasi bormi, hali tekshirmadim.
  Xohlasangiz, keyin o‘zim sanab beraman.
- **briefing.md.** Malika bilan gaplashib bo‘lgansiz, shuning uchun bu faylni yaratmayman.
  Suhbat yozib qo‘yilishini xohlasangiz, ayting.

### 2-xabar: siz yozasiz

```text
1. Eksportda faqat shu 1 hafta bor, ishonchni «o‘rta» qiling. 2. Jamshid aka hamma 100 ta javobni tekshirgan. 3. Jonli yozuv 1-5 dekabr; daqiqalar alohida saqlanmagan, eng kami 2, eng ko‘pi 15 daqiqa. B.7: Jamshid akaning 3 soatini «Agentgacha» ustuniga yozing, chunki u hozir ham javoblarni tekshiradi; izohda sababini yozing. B.6 [?] qolsin. briefing.md ni ham yozib qo‘ying: suhbat 30-noyabr bo‘ldi, buyruq /stop, Malikadan kunlik hisobotni olaman, qo‘shimcha haq haftasiga 200 000 so‘m, keyingi rol - pilotdan keyin Savdo yordamchisi bo‘yicha mas’ul.
```

### Claude javobi

Uchta fayl tayyor: `kit5-pilot/baseline.md`, `kit5-pilot/briefing.md` va `kit5-pilot/numbers.md`.
Hammasi yangi fayllar, hech narsaning ustidan yozilmadi.

**Raqamlar va ularning manbasi:**

| Ko‘rsatkich | Agentgacha | Qayerdan olindi |
|---|---|---|
| B.1 Bajarilgan so‘rovlar | 120 | Telegram tarixi, 30.11-05.12 |
| B.2 O‘rtacha vaqt | 6 daqiqa (eng kami 2, eng ko‘pi 15) | Malikaning jonli yozuvi, 01.12-05.12 (5 kun) |
| B.3 Xato javoblar | 9 (100 tadan, 9%) | Jamshid aka hamma 100 ta javobni tekshirgan |
| B.4 Takroriy so‘rovlar | 15 (12,5%) | Telegram tarixi |
| B.5 To‘liq hal qilingan | 100 (83,3%) | Telegram tarixi |
| B.6 Yakunlangan bitimlar | [?] | amoCRM, hali sanalmagan |
| B.7 Tekshirish soati | 3 soat | sizning so‘zingiz |
| B.8 Mijoz shikoyatlari | 2 | sizning so‘zingiz |

**Asosiy hisoblar** (ikki marta tekshirildi):
- Javob topishga ketadigan vaqt: 120 × 6 / 60 = 12 soat/hafta.
- Tekshirish bilan birga: 12 + 3 = 15 soat/hafta, ya’ni 15 × 22 600 = 339 000 so‘m/hafta.
- Inson qilgan bitta javobning narxi: 6 / 60 × 22 600 = 2 260 so‘m.

**Siz aytgandek qildim:**
- B.7 «Agentgacha» ustunida 3 soat.
  Izohda sababi yozildi: Jamshid aka agent yo‘q paytda ham javoblarni tekshiradi.
- B.6 [?] bo‘lib qoldi.
- `briefing.md` Malika bilan suhbat matni va kelishilgan 4 ta shart bilan yozildi.

**Ikkita narsaga e’tibor bering:**
- **B.15 formulasi.** Agentgacha B.7 = 3 bo‘lgani uchun yakunda «- B.7 sinovda» o‘rniga «- (B.7 sinovda - 3)» olish halolroq.
  Aks holda Jamshid akaning hozir ham ketayotgan 3 soati agentning hisobiga yozilib qoladi.
  Buni yakunda hal qilamiz.
- **Malikaning qo‘shimcha haqi (haftasiga 200 000 so‘m).** Bu sinovning xarajati.
  4 hafta bo‘lsa, 800 000 so‘m [?].
  Uni jami xarajatga (B.12) qo‘shamizmi, `reja` bosqichida kelishamiz.

**3-darsdagi mentor tekshiruvi:**
- Jonli yozuv 5 kun bo‘ldi, kamida 3 kun kerak edi, bu shart bajarildi.
- Tarix bor-yo‘g‘i 1 hafta, qoidada 2-4 hafta.
  Shuning uchun ishonch «o‘rta» deb yozildi.
- Malika har bir holatning daqiqasini alohida yozmagan, shuning uchun o‘rtacha 6 daqiqani qayta tekshirib bo‘lmaydi.
  Sinov haftalarida har bir holatning daqiqasini alohida yozib borish kerak.

**Keyingi qadam:** B.6 ni amoCRMdan sanash, keyin `/kit5 reja`.
Papkadagi `data/amocrm-eksport-2026-11.csv` ni sanashimni xohlasangiz, ayting.
Hozircha shu haftaning sanalari unda bormi, tekshirmadim.

## 2-sessiya: /kit5 reja (4-dars)

### 1-xabar: siz yozasiz

```text
/kit5 reja. Jamshid aka bilan kelishdik: A.1 Savdo yordamchisi boti, narx, qoldiq, chegirma, muddat savollari. A.2 bitta savolga javob topish vaqti 6 daqiqadan 3 daqiqagacha. A.3 2026-12-14 dan 2026-12-27 gacha, 2 hafta. A.4 savdo bo‘limining shu savollari; botdan Malika va Zarina foydalanadi, boshqa menejerlar savolni ular orqali beradi. A.5 bot faqat xodimga javob yozadi, mijozga hech narsa yozmaydi; 5% dan katta chegirma, tender, shikoyat Jamshid akaga. A.6 B.2 3 daqiqa yoki kam, B.3 haftasiga 3 tadan oshmaydi, shikoyat 2 dan oshmaydi. A.7 bot mijozga biror narsa yozsa yoki 5% dan katta chegirma va’da qilib, bu xodimga yetib borsa, darhol /stop. A.8 har bir javobni savol bergan xodim tekshiradi, Jamshid aka kunlik jurnalni ko‘radi. A.9 har shanba 15:00, men, Jamshid aka va Malika. Malikaning qo‘shimcha haqini (haftasiga 200 000) xarajatga kiriting. Kit 4 suhbatlari 14-dekabr ertalab bo‘ladi.
```

### Claude javobi

Sinov rejasi tayyor: `kit5-pilot/plan.md` ga yozdim.
Reja A.1-A.9 bo‘yicha siz Jamshid aka bilan kelishgan narsalar asosida tuzildi.
Sarlavhada Jamshid Karimov rozi deb yozilgan, sana 2026-12-13.

**Tekshirib chiqdim:**
- Rejadagi chegaralar yo‘riqnomadan (`instructions.md`, B.4 va B.5) ko‘proq ruxsat bermaydi.
  Ikki hafta davomida har bir javob qoralama bo‘lib qoladi va uni savol bergan xodim tekshiradi.
- A.5 da Jamshid akaga uzatiladigan uchta holatni yozgansiz: katta chegirma, tender, shikoyat.
  Rejada ularga B.6 dagi qolgan holatlarni ham qo‘shdim: prays-listda yo‘q mahsulot, 1C muammosi, tannarx haqidagi savol.
  Ular yo‘riqnomada allaqachon bor.
- Sanalar: 1-hafta 14.12-19.12, 2-hafta 21.12-26.12.
  Ko‘rib chiqish 19.12 va 26.12, ikkalasi ham shanba, 15:00 da.
- Maqsad: 6 daqiqadan 3 daqiqagacha.
  Hisobi: (3 - 6) / 6 × 100 = -50%.

**numbers.md ga ham ikki joyni yozdim:**
- Sinov sanalari kiritildi.
  3-hafta va 4-hafta ustunlari ishlatilmaydi.
- Malikaning qo‘shimcha haqi xarajatlar jadvaliga alohida qator bo‘lib qo‘shildi: 2 × 200 000 = 400 000 so‘m.
  Endi B.12 = B.9 + B.10 + B.11 + 400 000.

**Eslatma:** bot ishga tushishidan oldin To‘plam 4 suhbatlari o‘tishi kerak (`/kit4`).
Ular 14-dekabr ertalab bo‘ladi, shuning uchun botni o‘sha kuni suhbatlardan keyin yoqing.

**Ochiq savollar:**
1. Sinov paytida B.2 ni (bitta savolga ketgan vaqt) qanday o‘lchaymiz?
   Taklifim: Malika har hafta har bir savol turidan 3 ta holatni o‘lchaydi, boshlang‘ich o‘lchovdagi kabi jami 12 ta, va har bir daqiqani alohida yozadi.
   Shunday qilamizmi?
2. Shanba kuni ish 15:00 da tugaydi, demak yig‘ilish ish vaqtidan keyin bo‘ladi.
   Shu vaqt qoladimi yoki 14:00 ga o‘tkazamizmi?
3. Agentgacha B.6 (yakunlangan bitimlar) hali `[?]`.
   Uni 14-dekabrgacha amoCRM eksportidan sanab beraymi?

### 2-xabar: siz yozasiz

```text
1. Ha, shunday o‘lchaymiz. 2. Yaxshi topdingiz: yig‘ilishni shanba 14:00 ga o‘tkazing. 3. Yo‘q, B.6 [?] qolsin, bu pilotda asosiy emas.
```

### Claude javobi

Uchala javobingizni ham fayllarga yozdim, reja tayyor.

**plan.md da o‘zgardi:**
- Haftalik yig‘ilish endi shanba 14:00 da: 19.12 va 26.12.
  Shunday qilib u ish vaqti ichida bo‘ladi.
- B.2 qanday o‘lchanishi uchun alohida bo‘lim qo‘shdim.
  Malika har hafta 12 ta holatni o‘lchaydi: 4 tur × 3 holat.
  Har bir holatning daqiqasi alohida yoziladi.
  Javobni tekshirishga ketgan vaqt B.2 ga kirmaydi, u B.7 da yoziladi.
- B.6 `[?]` bo‘lib qoldi.
  Sababi yozildi: sizning qaroringiz, bu pilotda asosiy ko‘rsatkich emas.

**numbers.md da:** B.6 haqidagi izohni ham shu qarorga moslab yangiladim.

**Keyingi qadamlar:**
1. **13-dekabr, bugun:** Malika va Zarinaga 12 ta holat uchun jadval bering.
   Unda har bir holatga bitta qator bo‘lsin: sana, savol turi, necha daqiqa ketgani.
   Xodimning ismi uchun ustun kerak emas.
2. **14-dekabr ertalab:** Malika va Zarina bilan To‘plam 4 suhbatlari (`/kit4`).
   Botni shundan keyin yoqing.
3. **19-dekabr, 14:00:** birinchi haftani ko‘rib chiqamiz, `/kit5 hafta 1`.
4. **Sinov davomida:** bot xato qilsa, darhol `/kit5 xato` ni ishga tushiring.
   Bot mijozga yozsa yoki 5% dan katta chegirma va’da qilsa, avval `/stop` bering.

## 3-sessiya: /kit5 hafta 1, xatolar jurnali va yo‘riqnomani tuzatish (5-dars)

### 1-xabar: siz yozasiz

```text
/kit5 hafta 1. Bot jurnalidan (14-19 dekabr): B.1 115 savol, B.3 7 ta xato javob, B.5 104 tasi to‘liq hal qilindi. Malikaning 12 ta o‘lchovi: bitta savolga o‘rtacha 3 daqiqa. B.4 takroriy savollar 12, B.8 shikoyat 1, B.6 [?]. Tekshirish jami 3,5 soat. OpenRouter shu hafta 0,50 dollar, VPS oyiga 200 000 so‘m, dollar 11 941,65 so‘m. Sozlashni IT-administrator Sardorbek Umarov qildi, 8 soat; uning okladi 9 000 000. Topilgan pul: Bekzod Aliyev KPni eski narx bilan (10 ta ErgoPro, 2 350 000 dan) yozmoqchi edi, botdan narxni so‘rab 2 500 000 bilan yozdi, eski va yangi KP saqlangan. Yana: mijoz 35 mln lik buyurtmaga 15% so‘radi, bot Jamshid akaga uzatdi, bitim 5% bilan yopildi; mijoz 15% siz ham olishini bilmaymiz. Xatolar jurnali (Jamshid aka topdi): 12-14 «Bench-4 ni 3 ish kunida yetkazamiz» dedi; 12-15 «140 lik stol» topilmadi deb uzatdi, aslida Optima WS-102; 12-15 Optima 6 dona uchun chakana 2 150 000 aytdi, ulgurji 1 890 000 kerak edi; 12-16 Chirchiqqa yetkazish bepul dedi, bepul faqat Toshkent ichida, viloyatga 8 000 so‘m/km; 12-17 AeroLift kafolati 36 oy dedi, qoidada mexanizm 12 oy; 12-17 ErgoPro 10 dona narxiga QQSni ikki marta qo‘shdi, narxlar QQS bilan; 12-18 Senator qora 11 dona dedi, jigarrang CH-203-BR 26 dona borligini aytmadi. Ruxsatlar: 2-hafta ham shunday qoladi.
```

### Claude javobi

1-hafta ustunini `kit5-pilot/numbers.md` ga yozdim: barcha raqamlar, manbasi, formulasi va 7 ta xato.
`plan.md` ga ham bitta qator qo‘shdim: 2-hafta ham qoralama tartibida qoladi.

**To‘xtatish sharti bajarilmadi.** Bot mijozga yozmadi.
Mijoz 15% chegirma so‘raganda bot uni va’da qilmadi, Jamshid akaga uzatdi.

**Lekin xatolar bo‘yicha mezon bajarilmadi:** haftada ko‘pi bilan 3 ta xato bo‘lishi kerak edi, 7 ta bo‘ldi.

## 1-hafta va agentgacha

| Ko‘rsatkich | Agentgacha | 1-hafta | O‘zgarish |
|---|---|---|---|
| B.1 savollar | 120 | 115 | -4,2% |
| B.2 bitta savolga vaqt | 6 daq | 3 daq | -50% (maqsadga yetdi) |
| B.3 xatolar | 9 | 7 | -22,2%, lekin mezon ≤ 3 |
| B.4 takroriy | 15 | 12 | -20% |
| B.5 to‘liq hal qilingan | 100 | 104 | +4% |
| B.7 tekshirish | 3 soat | 3,5 soat | +16,7% |
| B.8 shikoyat | 2 | 1 | -50% (mezon bajarildi) |

## Pul

- **Xarajat:** B.12 = 52 482 (obuna) + 361 809 (sozlash, bir martalik) + 79 100 (tekshirish) + 200 000 (loyiha yetakchisi) = **693 391 so‘m**.
- **Topilgan pul, isbotlangani:** (2 500 000 - 2 350 000) × 10 = **1 500 000 so‘m**.
  Bu eski narxdagi KP.
  Pul KP qabul qilinib, to‘langandagina haqiqatda tushadi.
- **Isbotlanmagan:** 35 × (15% - 5%) = 3 500 000 so‘m [?].
  Bu summa yig‘indiga qo‘shilmadi.
- **Tejalgan vaqt (oraliq):** (6 - 3) × 115 / 60 - (3,5 - 3) = **5,25 soat/hafta**, ya’ni 118 650 so‘m.
- **Bitta ish narxi:** botda 693 391 / 104 = 6 667 so‘m.
  Bir martalik sozlashni chiqarsak, 3 188 so‘m.
  Odam qilganda 2 260 so‘m.

## Muhim kuzatuv

Sinov to‘plami botda hech qachon sinalmagan.
`test-set.md` dagi natijalar jadvalida «hali sinalmagan» turibdi.
Ikkita xato (36 oy kafolat, «3 kun») T4 va T6 misollarida bor edi.
Bot ishga tushishidan oldin shu misollarda sinalganida, ular oldindan ushlanardi.

## Yo‘riqnomaga taklif (`instructions.md`)

| Xato | Bo‘lim | Yangi matn (qisqacha) |
|---|---|---|
| 3 ish kuni | B.4 + B.5 | Muddat faqat 7 yoki 12 ish kuni; mahsulot omborda bo‘lsa ham qisqarmaydi. Boshqa muddat aytilmaydi («3 ish kunida», «ertaga»). Mijozga tezroq kerak bo‘lsa, Jamshid akaga uzatiladi |
| 140 lik stol | B.4 | Mahsulot o‘lcham yoki turi bilan aytilsa, `narxlar.csv` dagi nom va o‘lchamdan qidiriladi. Mosini kodi bilan aytib, «shu mahsulotmi?» deb so‘raladi |
| Optima 6 dona | B.4 | Javobda qoida ochiq yoziladi: «6 dona ≥ 5 → ulgurji» |
| Chirchiq | B.4 | Bepul yetkazish faqat Toshkent shahri ichida. Chirchiq, Olmaliq, Angren va boshqa shaharlar viloyat: 8 000 × km. Km noma’lum bo‘lsa, xodimdan so‘raladi |
| AeroLift 36 oy | B.4 + B.5 | Yangi qator: korpus 24 oy; mexanizm (AeroLift elektr mexanizmi ham), gazlift va g‘ildirak 12 oy. Boshqa son aytilmaydi |
| QQS ikki marta | B.4 + B.5 | Narxlar QQS bilan; summaga QQS qo‘shilmaydi. 10 × 2 500 000 = 25 000 000 so‘m |
| Senator rangi | B.4 | Qoldiqda 1C dagi hamma variantlar (-BR va boshqalar) alohida aytiladi |

B.4 va B.5 o‘zgargani uchun `form-b-agent.md` dagi shu maydonlar ham yangilanadi.
`test-set.md` ga T8-T14 qo‘shiladi, har bir xatoga bitta misol.

Agentni shu papkada sinab bo‘lmaydi: `app/` papkasi yo‘q.
Bot dushanbagacha (21.12) serverda T1-T14 da sinalishi kerak.

Yana yetishmaydi:
- Malikaning 12 ta o‘lchovi har biri alohida (hozir faqat o‘rtachasi bor).
- B.6 hali [?].
- IT-administrator soatini 199 soatlik norma bilan hisobladim [?], tasdiqlab bering.

**Savollar:**
1. Yuqoridagi 7 ta o‘zgarishni `instructions.md` va `form-b-agent.md` ga kiritib, T8-T14 ni qo‘shaymi?
2. 18.12 da serverda qaysi 1C fayli turgan edi?
   Papkadagi fayl 01.11.2026 sanali.
   Bot eski fayl bilan qoldiq aytgan bo‘lsa, bu yana bitta qoida buzilishi.
   Jigarrang CH-203-BR prays-listda yo‘q, uning narxi qancha?
3. 7 xatodan birortasi mijozga yetib bordimi, 1 ta shikoyat shulardan birimi?
   Eski narxdagi KP mijozga yuborilgan bo‘lsa, mijoz uni qabul qildimi?

### 2-xabar: siz yozasiz

```text
1. Ha, yettalasini instructions.md va form-b-agent.md ga kiriting va T8-T14 ni qo‘shing; har biri B.13 dagi «nimani o‘zgartirdik» ustuniga yozilsin. 2. 18-dekabr serverda 17-dekabrdagi 1C fayli turgan edi. CH-203-BR narxi qorasi bilan bir xil: chakana 4 900 000, ulgurji 4 400 000. 3. Hech biri mijozga yetmadi, xodimlar ❌ bosdi; shikoyat yetkazish kechikkani haqida edi, bot xatosi emas. Eski narxdagi KP yuborilmadi, yangisi yuborildi; mijoz uni qabul qilib, 18-dekabr kuni 70% avans to‘ladi. Malikaning 12 ta o‘lchovi uning jadvalida, o‘rtacha 3 daqiqa. IT-administrator soatini 199 soat bilan hisoblash to‘g‘ri.
```

### Claude javobi

Hammasini yozdim.
Siz aytgan yetti o‘zgarish yo‘riqnomaga kirdi, har biriga sinov misoli qo‘shildi.
Bot ularda hali sinalmagan: buni serverda qilish kerak.

**Nima o‘zgardi:**
- **`instructions.md` (B.4, B.5):**
  - narx tanlovi javobda ochiq yoziladi;
  - narxga QQS qo‘shilmaydi;
  - mahsulot o‘lchami bilan («140 lik stol») qidiriladi;
  - 1C dagi hamma rang variantlari aytiladi, CH-203-BR narxi ham yozildi;
  - muddat faqat 7 yoki 12 ish kuni;
  - bepul yetkazish faqat Toshkent shahri ichida, Chirchiq kabi viloyat shaharlariga 8 000 so‘m/km;
  - yangi kafolat qatori: korpus 24 oy, mexanizm 12 oy.
  - «O‘zgarishlar tarixi» ga bitta qator qo‘shildi.
- **`form-b-agent.md`:** B.4 va B.5 ham shunga moslandi, har bir yangi qatorda sana bor.
- **`test-set.md`:** T8-T14 qo‘shildi.
  Har birida savol, xato javob, to‘g‘ri javob va tekshirish qatorlari bor.
- **`numbers.md`:**
  - xatolar jurnalining «nimani o‘zgartirdik» ustuni to‘ldi;
  - 7 ta xatoning hech biri mijozga yetmagani yozildi;
  - shikoyat bot xatosi emas, yetkazish kechikkani haqida;
  - KP dan topilgan **1 500 000 so‘m** endi to‘liq isbotlangan: yangi KP yuborilgan, mijoz 18.12 da 70% avans to‘lagan;
  - IT-administrator soati uchun 199 soat tasdiqlandi.

**Siz qilishingiz kerak (21.12 gacha):**
1. Yangi `instructions.md` ni serverga joylang.
   Botni T1-T14 ning hammasida sinang.
   `app/` papkasi shu yerda yo‘q, shuning uchun men ishga tushira olmadim.
   Natijani menga ayting, `test-set.md` dagi «Sinov natijalari» jadvaliga yozaman.
2. CH-203-BR prays-listda (`narxlar.csv`) alohida qator emas.
   Narxi hozircha faqat yo‘riqnomada turibdi.
   Prays-listga qator qo‘shish kerak: `data/` papkasiga men yozmayman.
3. Malikaning jadvalidan 12 ta o‘lchovning eng kichik va eng katta daqiqasini oling.
   Yakunda oraliq uchun kerak bo‘ladi.

**Bitta yangi savol:** 18-dekabr kuni serverda 17-dekabr 1C fayli turgan.
Yo‘riqnomada «1C fayli bugungi bo‘lmasa, qoldiq aytilmaydi, Jamshid akaga uzatiladi» deyilgan.
Demak, bot Senator qoldig‘ini bir kun eski fayldan aytgan.
Bu ikkinchi buzilish.

Uni qanday hal qilamiz?
- **(a)** Xatolar jurnaliga 8-xato qilib qo‘shamiz va 1C fayli har kuni ertalab yangilanishini tekshirtiramiz.
- **(b)** Qoidani yumshatamiz: kechagi fayl bo‘lsa, bot qoldiqni aytadi va «fayl kechagi, omborchi tekshirsin» deb ogohlantiradi.

Qaysi biri?

### 3-xabar: siz yozasiz

```text
(a): 8-xato qilib yozing; Sardorbek 1C faylini har kuni 08:30 da yangilaydi, bot fayl sanasini javobda ko‘rsatadi.
```

### Claude javobi

Eski 1C fayli masalasini xatolar jurnaliga 8-xato qilib yozdim.
Yo‘riqnoma va sinov to‘plami ham yangilandi.

**Nima o‘zgardi:**
- **`numbers.md`:** xatolar jurnaliga 8-yozuv qo‘shildi.
  «Nimani o‘zgartirdik» ustunida: 1C fayli har kuni 08:30 da yangilanadi, bot har bir qoldiq javobida fayl sanasini yozadi.
  Sinov misoli T15.
- **`instructions.md`:**
  - B.3: 1C fayli har kuni 08:30 da yangilanadi.
  - B.4: bot qoldiqni aytishdan oldin fayl sanasini bugungi sana bilan solishtiradi.
    Fayl kechagi bo‘lsa ham qoldiqni aytmaydi, Jamshid akaga uzatadi.
    Javobda doim «Manba: 1C, sana» deb yozadi.
  - «O‘zgarishlar tarixi» ga qator qo‘shildi.
- **`form-b-agent.md`:** B.3 va B.4 ham shunga moslandi.
- **`test-set.md`:** T15 qo‘shildi: serverda kechagi fayl turganda bot qoldiqni aytmasligi kerak.

**Bitta farqni bilib qo‘ying:** xatolar jurnalida endi 8 ta yozuv bor, lekin xato javoblar soni (B.3) 7 ligicha qoldi.
8-xato 7-xatodagi Senator javobining o‘zida topildi: bitta javobda ikkita xato bor edi.
Uni 8 qilsak, bitta javob ikki marta sanalib qoladi.
Buni `numbers.md` ga ham yozdim.
Agar xatolarni javob bo‘yicha emas, turi bo‘yicha sanashni xohlasangiz, ayting, 8 qilaman.

**21.12 gacha qilinadigan ishlar:**
1. Yangi `instructions.md` ni serverga joylash.
2. Botni T1-T15 ning hammasida sinash.
   Natijani menga ayting, `test-set.md` dagi «Sinov natijalari» jadvaliga yozaman.
3. Sardorbek aka 08:30 dagi yangilanishni ishga tushirsin.
   21.12 ertalab fayl sanasini bir marta tekshirib ko‘rish kerak.

2-hafta raqamlari 26.12 da kerak bo‘ladi: `/kit5 hafta 2`.

## 4-sessiya: /kit5 yakun, 2-hafta raqamlari bilan (6-dars)

### 1-xabar: siz yozasiz

```text
/kit5 yakun. Avval 2-hafta (21-26 dekabr) raqamlarini yozing: bot jurnalidan B.1 134, B.3 2, B.5 125; Malikaning 12 ta o‘lchovi: o‘rtacha 2 daqiqa (eng kami 1, eng ko‘pi 4); B.4 takroriy 9, B.8 shikoyat 0, B.6 [?]; tekshirish 2,5 soat; OpenRouter 0,57 dollar; Malikaning haqi 200 000; topilgan pul bu hafta yo‘q. Qayta sinov: 20.12 da T1-T15 dan 14 tasi o‘tdi, T3 o‘tmadi (1C fayli eski edi); 21.12 fayl yangilangach, 15/15. Xatolar (Jamshid aka topdi): 12-21 bot Optima qoldig‘ini 18-dekabrdagi fayldan aytdi (12 dona), o‘sha kuni yangilanish ishlamagan edi; 12-23 60 mln lik buyurtma, 100% oldindan to‘lov, 7% chegirma so‘raldi, bot «ha, 10% gacha mumkin» dedi, Jamshid akaga uzatishi kerak edi. Ikkalasi ham mijozga yetmadi. Keyin yakuniy hisobni qiling va tavsiyangizni bering. Malikaning tejalgan vaqti: yangi menejerlarga botdan foydalanishni o‘rgatish va KP tekshirishga. Zarina: norozi mijozlar bilan suhbat.
```

### Claude javobi

**To‘xtatish sharti bajarildi:** 23.12 da bot xodimga «ha, 10% gacha mumkin» deb yozdi.
Bu A.7 dagi 2-shart: 5% dan katta chegirma va’dasi xodimga yetib bordi.
Mijozga yetmadi, xodim tekshiruvda ushlab qoldi.

## Nima yozildi

- `kit5-pilot/numbers.md`: 2-hafta ustuni, «O‘zgarish» ustuni, xarajatlar, B.13 jurnaliga 2 ta yangi qator va «Yakuniy hisob» bo‘limi.
  Hamma hisoblar formulasi bilan yozilgan.
- `kit4-people/test-set.md`: 20.12 va 21.12 dagi qayta sinov natijalari.
- «Qaror» bo‘limi bo‘sh qoldi, sizning javobingizni kutyapti.

## Asosiy raqamlar (agentgacha → 2-hafta)

| Ko‘rsatkich | Agentgacha | 2-hafta | O‘zgarish |
|---|---|---|---|
| B.2 vaqt, daqiqa | 6 | 2 | -4 (-66,7%) |
| B.3 xato javoblar | 9 | 2 | -7 (-77,8%) |
| B.5 hal qilingan so‘rovlar | 100 | 125 | +25 (+25%) |
| B.8 shikoyat | 2 | 0 | -2 (-100%) |
| B.7 tekshirish, soat | 3 | 2,5 | -0,5 (-16,7%) |

**Xarajat:**
- B.12 = 105 800 (obuna) + 361 809 (sozlash) + 135 600 (tekshirish) + 400 000 (Malikaning haqi) = **1 003 209 so‘m**.

**Tejalgan vaqt:**
- 1-hafta: 3 × 115 / 60 - 0,5 = 5,25 soat.
- 2-hafta: 4 × 134 / 60 + 0,5 = 9,43 soat.
- Oraliq: haftasiga **5,25-9,43 soat**.

**Bitta ish narxi:**
- Agent: 1 003 209 / 229 = **4 381 so‘m**.
  Haftalar bo‘yicha 2 479-6 667 so‘m.
- Inson: 6 / 60 × 22 600 = 2 260 so‘m.
- Inson narxiga tekshirish kirmaydi, shuning uchun to‘liq narxni ham solishtirdim.
  Agentgacha jarayon bitta ishga 3 390 so‘m turardi, 2-haftada 3 286 so‘m.
  Ya’ni hozircha deyarli farq yo‘q.

**Oylik hisob:**
- Tejalgan vaqt puli oyiga 510 195-916 731 so‘m.
- Malikaning haqisiz xarajat oyiga 227 472 so‘m.
  Foyda +282 723 dan +689 259 so‘mgacha.
- Malikaning haqi bilan xarajat oyiga 1 087 472 so‘m.
  Natija -577 277 dan -170 741 so‘mgacha, ya’ni zarar.
- Isbotlangan topilgan pul 1 500 000 so‘m.
  Lekin bu 2 haftada bitta holat, 2-haftada 0.
- Tejalgan vaqt pulga faqat ishlatilsa aylanadi.
  Siz aytgan reja: Malika yangi menejerlarni botga o‘rgatadi va KP tekshiradi, Zarina norozi mijozlar bilan gaplashadi.

**A.6 mezonlari:**
- B.2 ≤ 3 daqiqa: bajarildi.
- B.8 ≤ 2: bajarildi.
- B.3 «har haftada ≤ 3»: bajarilmadi (1-haftada 7 ta xato).

## Xatolar turlari (2 hafta, 10 yozuv)

1. **Qoidadan tashqari va’da (4 ta):** muddat, kafolat, Chirchiq, chegirma.
   2-haftada qaytdi.
2. **Eski 1C fayli (2 ta):** 2-haftada qaytdi.
   21.12 da sinovda 15/15 o‘tdi, lekin o‘sha kuni ishda bot qoldiqni eski fayldan aytdi.
3. **Hisob xatosi (2 ta):** 19.12 dagi tuzatishdan keyin qaytmadi.
4. **Qidiruv xatosi (2 ta):** bu ham qaytmadi.

Xulosa: 3 va 4-turni yo‘riqnoma matni tuzatdi.
1 va 2-tur uchun qoida matnda allaqachon bor edi, bot baribir buzdi.
Bu ikkisiga faqat matn yetmaydi.

## Yo‘riqnomaga taklif (`instructions.md`, B.4)

**a) Chegirma.**
- Eski: «Chegirmani faqat qoida doirasida aytasan: buyurtma 20 000 000 so‘mdan oshsa, 5% gacha.»
- Yangi: shu gap qoladi va qo‘shiladi: «Xodim 5% dan katta foiz so‘rasa, “ha”, “mumkin”, “... gacha” demaysan.
  5% dan boshqa foiz sonini yozmaysan. “Qoida: 5% gacha; 7% ni Jamshid aka hal qiladi” deb yozasan va savolni uzatasan.»
- Dastur darajasida ham tekshiruv qo‘shamiz: javobda 5% dan katta foiz bo‘lsa, xodimga yuborilmaydi va Jamshid akaga uzatiladi.

**b) 1C fayli.**
- Eski: «Avval fayl sanasini bugungi sana bilan solishtirasan...»
- Yangi: «Qoldiq javobining birinchi qatori: “1C fayli: [sana], bugun: [sana]”.
  Ikki sana bir xil bo‘lmasa, qoldiq sonini yozmaysan.»
- Bundan tashqari, sanani dastur o‘zi tekshiradi.
  08:30 dagi yangilanish ishlamasa, IT-administratorga xabar boradi.
- `app/` papkasi bu yerda yo‘q, shuning uchun dastur qismini kim qilishi [?].

**Yangi sinovlar:**
- T16: 60 mln, 100% to‘lov, 7% chegirma.
- T17: 1C fayli 3 kun eski.
- Keyin T1-T17 bo‘yicha qayta sinov.

## Tavsiyam: o‘zgartirish

Yana 2 hafta faqat qoralama tartibida ishlatamiz, hech qaysi qadamni odam tekshiruvisiz qoldirmaymiz.
Asosiy sabab: vaqt maqsadi bajarildi, lekin eng xavfli ikki xato (chegirma va eski qoldiq) matn bilan tuzatilgandan keyin ham qaytdi.

**Hali isbotlanmagan:**
- 23.12 da `/stop` berilganmi [?];
- 2-hafta dollar kursi [?] (1-hafta kursi 11 941,65 olindi);
- B.6 bitimlar [?];
- topilgan pul har oy takrorlanadimi;
- agentgacha olingan 6 daqiqaning alohida o‘lchovlari saqlanmagan.

**Savollar:**
1. Qaroringiz: o‘zgartirib davom etamizmi, shundayicha davom etamizmi yoki to‘xtatamizmi?
2. a) va b) o‘zgarishlarni hamda T16, T17 ni yozaymi?
3. Malikaning haftalik 200 000 so‘mi sinovdan keyin ham davom etadimi?
   Oylik hisob shunga bog‘liq.
   23.12 da `/stop` berilgan-berilmaganini bilsangiz, shuni ham ayting.

### 2-xabar: siz yozasiz

```text
1. Qaror: o‘zgartirish. Sabab sizniki bilan bir xil: vaqt maqsadi bajarildi, lekin chegirma va eski qoldiq xatosi matn tuzatilgandan keyin ham qaytdi; yana 2 hafta faqat qoralama, dastur tekshiruvi bilan. 2. Ha, a) va b) ni hamda T16, T17 ni yozing; dastur qismini Sardorbek qiladi. 3. Malikaning haqi yana 2 hafta qoladi, keyin to‘xtaydi. 23.12 da Jamshid aka /stop bermadi, chunki Malika ❌ bosdi va mijozga hech narsa ketmadi; buni A.7 bo‘yicha kamchilik deb yozing, keyingi safar /stop beriladi. Dollar kursini ikkala haftaga 11 941,65 qoldiring. Keyin jamoaga e’lonni tayyorlang: yozma majburiyat yo‘q.
```

### Claude javobi

Hammasi yozildi.
Qaror: **o‘zgartirish**.

## Nima o‘zgardi

**`kit5-pilot/numbers.md`:**
- «Qaror» katagi belgilandi, «Sababi» yozildi.
- Dollar kursi ikkala hafta uchun 11 941,65 qilib qo‘yildi, `[?]` belgilari olib tashlandi.
- Malikaning haqi 3-4-haftada qoladi, keyin to‘xtaydi.
  Shu hisobdan keyin bitta ish narxi 1 686 so‘m bo‘ladi (agentgacha 3 390 so‘m edi).
  Oylik foyda +282 723 dan +689 259 so‘mgacha.
- B.13 dagi ikkala xatoga «nimani o‘zgartirdik» yozildi.
- 23.12 da `/stop` berilmagani A.7 bo‘yicha kamchilik deb yozildi.

**`kit5-pilot/plan.md`:**
- A.5 ga yozildi: 3-4-hafta ham faqat qoralama, dastur tekshiruvi bilan.
- A.7 ga kamchilik va aniqlashtirilgan qoida yozildi: shart bajarilsa, `/stop` mijozga yetgan-yetmaganidan qat’i nazar beriladi.

**`kit3-agent/instructions.md`, B.4:**
- a) Chegirma: 5% dan katta foiz so‘ralsa, bot «ha», «mumkin» yoki «... gacha» demaydi.
  Tayyor gap bilan javob berib, savolni Jamshid akaga uzatadi.
- b) 1C: qoldiq javobining 1-qatori «1C fayli: [sana], bugun: [sana]» bo‘ladi.
  Sanalar bir xil bo‘lmasa, qoldiq soni yozilmaydi.
- Ikkala o‘zgarish «O‘zgarishlar tarixi»ga ham yozildi.

**`kit3-agent/form-b-agent.md`:** B.4 dagi shu ikki qoida yangilandi, shunda xodimlar ko‘radigan B shakli eskirmaydi.

**`kit4-people/test-set.md`:**
- T16 qo‘shildi: 60 mln buyurtma, 100% oldindan to‘lov, 7% so‘ralgan.
- T17 qo‘shildi: 3 kun eski 1C fayli.
- «Sinov natijalari» jadvaliga «T1-T17 da hali sinalmagan» qatori qo‘shildi.

**`kit5-pilot/announcement.md`:** jamoaga e’lon tayyor.
- Raqamlar: kuniga 150 daqiqadan 70 daqiqaga tushdi.
  Hisob: 900 / 6 = 150 va 418 / 6 = 69,7.
- Bitta halol muvaffaqiyatsizlik: «10% gacha mumkin» javobi.
- Malikaga loyihani boshqargani va vaqtni o‘lchagani uchun, Jamshid akaga 9 ta xatoni topgani uchun rahmat aytiladi.
- Yozma majburiyat yo‘qligi uchun va’da haqidagi gap olib tashlandi.
- Ishdan bo‘shatish va Malikaning qo‘shimcha haqi e’londa yo‘q.

## Ishga tushishdan oldin

1. Sardorbek dasturga ikkita tekshiruv qo‘shadi:
   - javobda 5% dan katta foiz bo‘lsa, javob xodimga yuborilmaydi va Jamshid akaga uzatiladi;
   - fayl sanasini dastur o‘zi tekshiradi; 08:30 dagi yangilanish ishlamasa, unga xabar boradi.
2. Bugungi 1C fayli bilan T1-T17 bo‘yicha qayta sinov qiling, keyin serverga joylang.
   `app/` papkasi bu yerda yo‘q, shuning uchun sinovni o‘zim ishga tushira olmadim.
   Natijani `test-set.md` ga yozamiz.
3. 3-4-hafta sanalari hali belgilanmagan (`plan.md` da `[?]`).
   Yangi yil bayramida ish kunlari kamroq bo‘lishi mumkin.

E’lon tartibi: avval Malika, Zarina va Jamshid aka bilan alohida gaplashing.
Keyin jamoa yig‘ilishida ayting, keyin matnni «Baraka Savdo» guruhiga yozing.

## Keyingi qadam

2-jarayon KP (tijorat taklifi) bo‘ladi: matritsada Qiymat 12, Osonlik 12, va B.3 da u 2-jarayon deb yozilgan.
Lekin uning Qiymat bahosida `[?]` bor, uni To‘plam 1 suhbatlaridan keyin qayta tekshirish kerak.

To‘plam 1 suhbatlari uchun taklifim:
- Jamshid aka: KPni tekshiradi;
- KPni eng ko‘p yozadigan 2 ta menejer;
- Malika: endi KP tekshirishni o‘z zimmasiga oladi;
- 3D loyiha qiladigan dizayner, chunki KP ga 3D ham kiradi.

Ro‘yxatni siz tasdiqlaysiz, keyin `/kit1` bilan boshlaymiz.
