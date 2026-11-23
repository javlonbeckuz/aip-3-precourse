# 5-dars uy vazifasi: sinovning 2-haftasi

6-darsgacha: 26-dekabr (shanba guruhi) yoki 27-dekabr (yakshanba guruhi).
6-darsda raqamlaringiz bilan qaror qabul qilasiz va 3 daqiqa taqdim qilasiz.
Bu vazifalar kafolat sharti uchun hisobga olinadi: mentor har birini dalili bilan jadvalga yozadi.

## Vazifalar

1. **Sinovning 2-haftasini yaxshilangan agent bilan o‘tkazing.**
   5-darsdagi ruxsat qarori bo‘yicha: hali hamma javob tekshiriladi yoki bitta qadam bo‘shatilgan (Baraka: narx va qoldiq to‘g‘ridan-to‘g‘ri, chegirma va muddat - Malika tasdig‘i bilan).
   Qanday yoqiladi: `.env` da `REPLY_MODE=topics` va `agent/approval.toml` da `direct_topics`, yoki telefondan `/darhol narx qoldiq` (qo‘llanma: `app/agent/approval.qollanma.md`).
   Har bir yangi xatoni B.13 ga yozing va 2-mashqdagi tartibda tuzating: test, `pilot eval`, joylash.
2. **2-hafta ustunini to‘ldiring** (`kit5-pilot/numbers.md`), tekshirish soatlari (B.7) bilan.
   Botga `/hafta` yozing; bot sanaydigan qatorlarni ko‘chiring, qolganlarini qo‘lda, manbasi bilan.
   Yoki: `/kit5 hafta 2`.
   **6-darsdan ikki kun oldin, kechqurungacha** (yakshanba guruhi: payshanba 24-dekabr; shanba guruhi: chorshanba 23-dekabr) shu kungacha bo‘lgan raqamlar `numbers.md` da bo‘lsin: mentor 6-darsdan oldingi uch kunda har bir ishtirokchining raqamlarini oldindan tekshiradi (taxminan 20 daqiqa).
   Shanba kuni haftani yakunlang.
3. **Xarajatlarni qo‘shing:** B.9 obuna (oylikni 4,3 ga bo‘ling), B.10 sozlash, B.11 = B.7 x soatbay haq, B.12 jami.
4. **Topilgan pulni yozing (B.14):** oldi olingan xato, yo‘qolmagan so‘rov, tezroq tushgan pul.
   Har bir summa - alohida qator, hisob va hujjat bilan; isbotlanmagani `[?]` bilan, jamiga qo‘shilmaydi.
   Topilmagan bo‘lsa, «0» va bir gap sabab.
5. **3 daqiqalik namoyish tayyorlang:** 3 ta slayd yoki 3 daqiqa gap.
   1) Jarayon va «oldin» raqamlari; 2) nima buzildi va qanday tuzatdingiz; 3) «keyin» raqamlari va qanday qaror kutayotganingiz.
   Ekranda xodim ismi, mijoz ma’lumoti yoki transkript bo‘lmasin.
   **6-darsdan bir kun oldin, 18:00 gacha** (yakshanba guruhi: shanba 26-dekabr; shanba guruhi: juma 25-dekabr) mentoringizga yuboring: agent ishlayotgan 60 soniyalik ekran yozuvi va To‘plam 5 B natijasining bitta skrinshoti.
   Sahnadagi namoyishlar shu yozuvlardan bitta noutbukda ko‘rsatiladi.
   Qanday yozish (Mac: Cmd+Shift+5, Windows: Win+Shift+R, telefon): `day-6/demo-day/ekran-yozuvi.qollanma.md`.
6. **Telefondan qo‘shgan faktlaringizni** (`/xotira`) `agent/memory.md` ga ko‘chiring va har biriga test qo‘shing.

Chorshanba kuni mentor guruhda so‘raydi: «2-hafta raqamlari va xarajatlar qayerda?»

## Yaxshi namuna: «Baraka Office»

Shartli misol: kursning umumiy Baraka namunasi, 6-darsda shu raqamlar bilan ishlaysiz.
Baraka sanalari yakshanba guruhiniki (5-dars 20-dekabr); shanba guruhida hammasi bir kun oldin (19-dekabr).
Bot sanagan qatorlar soxta Telegram bilan ishlatib olingan (`exercises/namuna/baraka-2-hafta/kit5-raqamlar-2026-12-26.md`).
1-hafta: `exercises/namuna/kompaniya/kit5-pilot/numbers.md`.
Soatbay haq: 35 700 so‘m.

| Ko‘rsatkich | Agentgacha | 1-hafta | 2-hafta | Manba (2-hafta) |
|---|---|---|---|---|
| B.1 Bajarilgan so‘rovlar | 120 | 132 | 138 | bot, 21-26.12 |
| B.2 O‘rtacha vaqt, daqiqa | 6 | 2,5 | 2,0 | Madina o‘lchadi, yana 10 ta holat |
| B.3 Xato javoblar | 9 | 7 | 3 | bot (❌ bosilgan) |
| B.4 Takroriy so‘rovlar | 15 | 12 | 8 | savdo guruhi yozishmasi |
| B.5 To‘liq hal qilingan | 100 | 104 | 121 | bot |
| B.7 Tekshirish vaqti, soat | 0 | 4,5 | 2,0 | Malika: chegirma va muddat javoblari 100%; narx va qoldiqdan har 5 tadan bittasini keyin ko‘rdi |
| B.14 Topilgan pul, so‘m | 0 | 0 | 680 000 | pastda |
| B.8 Mijoz shikoyatlari | 2 | 2 | 1 | Telegram va amoCRM «shikoyat» tegi |

Topilgan pul, 2-hafta:

| Sana | Nima bo‘ldi | Summa, so‘m | Qanday hisobladik |
|---|---|---|---|
| 23.12 | Mijoz 34 000 000 so‘mlik buyurtmaga 12% chegirma so‘radi; Bekzod berishdan oldin botdan so‘radi; bot qoidani aytdi (menejer 5% gacha; 10% faqat 100% oldindan to‘lovda ROP yozma ruxsati bilan) va Jamshid akaga uzatdi; Jamshid aka 100% oldindan to‘lov sharti bilan 10% ga ruxsat berdi | 680 000 | 34 000 000 x (12% - 10%) = 680 000; agentgacha shunday buyurtmalarda 12% berilgan (noyabr, amoCRM: 3 ta bitim); amoCRM bitim kartasi, Jamshid akaning yozma ruxsati, to‘lov 24.12 da tushdi |

Hisob (ikki hafta, 6-darsdagi namuna bilan bir xil):

```text
B.9  = oyiga 504 500 (server 200 000, OpenRouter 37 000, Claude Pro 267 500)
       2 haftada: 504 500 x 2 / 4,3 = 234 651 so‘m
B.10 = egasi 14 soat x 125 000 + Sardorbek 3 soat x 45 000 = 1 885 000 so‘m
B.11 = (4,5 + 2,0) x 35 700 = 232 050 so‘m
B.12 = 234 651 + 1 885 000 + 232 050 = 2 351 701 so‘m
B.15 = (6 - 2,0) x 138 / 60 - 2,0 = 9,2 - 2,0 = 7,2 soat/hafta  (1-hafta: 3,2; oraliq 3,2-7,2)
B.16 = agent: 2 351 701 / (104 + 121) = 10 452 so‘m (sozlashsiz 2 074); inson: 6 / 60 x 35 700 = 3 570 so‘m
B.14 jami (isbotlangan): 0 + 680 000 = 680 000 so‘m
```

OpenRouter oyiga: ikki haftalik panel 1,45 $ (sinfdagi `pilot eval` lar bilan) / 2 x 4,3 = 3,12 $ x 11 941,65 ≈ 37 000 so‘m.
B.10 - bir martalik sozlash: 6-darsda u bilan va usiz ikkala hisob ko‘rsatiladi.

B.13 dagi yangi yozuvlar (2-hafta):

| Sana | Nima bo‘ldi | Kim topdi | Nimani o‘zgartirdik |
|---|---|---|---|
| 22.12 | «Optima 8 dona jami qancha?»: summani aytdi, lekin narx QQS bilan ekanini aytmadi; menejer mijozga aytishdan oldin so‘radi | Malika | «Narxlar QQS bilan» qatori; javob andozasiga qo‘shildi |
| 23.12 | «Staf mesh narxi qancha?»: xato yozilgan nomga boshqa kreslo narxini aytdi; Madina mijozga aytishdan oldin sezdi | Madina | O‘sha kuni ROP telefondan `/eslab_qol` bilan taxallusni qo‘shdi; keyin yo‘riqnomaga: aniq topilmasa, eng yaqin 3 tasini ko‘rsatib so‘raydi; T13 |
| 24.12 | «12 mln lik buyurtmaga 3D chizma bepulmi?»: «bepul» dedi (qoida: 15 000 000 dan oshsa); mijozga aytilmadi | Jamshid aka | 3D qoidasi raqam bilan; T14; 14 ta test o‘tdi |

Namoyish rejasi (3 daqiqa):
1. «Menejerlar narx va qoldiqni ROP va ombordan so‘rardi: bitta savolga 6 daqiqa, haftasiga 9 xato.»
2. «1-haftada agent 7 marta adashdi: 5-6 donaga chakana narx, eski 1C fayli, KP dagi va’dalar. Hammasi mijozga yetmasdan ushlandi. Tuzatishdan keyin 12 testdan 12 tasi o‘tadi.»
3. «2-haftada: savolga 2 daqiqa, 3 xato, tekshirish 4,5 dan 2 soatga tushdi, birinchi topilgan pul 680 000 so‘m. Qaror kutayapman: davom etamiz, keyingi qadam - KP tayyorlash.»

**Nega yaxshi:** har bir raqamning manbasi bor; 1-haftadagi «topilgan pul 0» yashirilmagan; topilgan pul hujjat bilan va hisobi bilan; namoyishda «nima buzildi» bor.

## Zaif namuna

> 2-hafta: hammasi yaxshi ishladi, xodimlar xursand.
> B.7: 0 (endi tekshirmaymiz).
> B.14: 45 000 000 so‘m (bot javob bergan buyurtmalar).
> Namoyish: «AI kelajagi» haqida 12 ta slayd.

**Nimasi zaif:**

- «Hammasi yaxshi» - taassurot, raqam emas: 6-darsda solishtirib bo‘lmaydi.
- B.7 = 0 bo‘lishi mumkin emas: ❌ bosilganlarni va uzatishlarni kimdir ko‘rgan; 0 yozilsa, tejalgan vaqt oshirib ko‘rsatiladi.
- Buyurtmalar summasi - daromad, topilgan pul emas; bot bo‘lmaganda ham sotilarmidi - noma’lum.
- Namoyishda jarayon ham, raqamlar ham, nima buzilgani ham yo‘q.

**Qanday tuzatiladi:** yaxshi namunadagi jadval tartibi bilan: har bir qator manbasi bilan, B.7 ROPdan so‘rab, B.14 faqat hujjatli holatlar, namoyish uch qismli.

## 6-dars boshida mentor tekshiruvi

Mentor varag‘i: `mentor-handbook/day-6.md` (kodlar 6.1-6.5).
6-darsdan oldingi uch kunda (yakshanba guruhi 24-26, shanba guruhi 23-25-dekabr) mentor har bir ishtirokchining raqamlarini oldindan tekshiradi (taxminan 20 daqiqa).

| Kod | Tekshiruv | Ekranda nimani ko‘radi |
|---|---|---|
| 6.1 V | 2-hafta raqamlari, xarajatlar va topilgan pul to‘ldirilgan | `numbers.md`: 2-hafta ustuni, B.9-B.12, B.14 (topilmagan bo‘lsa «0» va sababi) |
| 6.2 | Xatolar jurnalida tuzatishlar bor, test to‘plami o‘tadi | B.13 «Nimani o‘zgartirdik»; `uv run pilot eval` - hammasi o‘tdi |
| 6.3 | Rejali hisobot va eskalatsiya ishlayapti | Shu hafta kelgan hisobot va kamida bitta uzatish xabari |
| 6.4 | Xavfsizlik ro‘yxati to‘liq | 5-darsdagi 9 band, dalillari bilan |
| 6.5 V | Namoyish tayyor | 3 slayd yoki 3 daqiqa: jarayon, oldin va keyin, nima buzildi, qaror; 60 soniyalik ekran yozuvi va To‘plam 5 B skrinshoti 6-darsdan bir kun oldin 18:00 gacha mentorda |

V - uy vazifasi: kafolat sharti uchun hisoblanadi.

Raqamlar tekshiruvi (dars oldidan, `mentor-handbook/day-6.md` bo‘yicha qisqacha):

- [ ] Har bir raqamning birligi yozilgan (daqiqa, soat, so‘m, haftasiga).
- [ ] «Agentgacha» davri va manbasi yozilgan.
- [ ] Oldin va keyin bir xil ish o‘lchangan (sinov savollari B.1 dan ayirilgan).
- [ ] B.7 hisobga olingan va ikki marta ayirilmagan.
- [ ] B.3 xatolar jurnalidagi qatorlar soniga teng.
- [ ] Xarajatlar hisob yoki to‘lov tarixidan.
- [ ] B.14 ning har bir summasi manbasi bilan; manbasiz summa o‘chiriladi.
- [ ] Mentor asosiy natijani qo‘lda qayta hisoblaydi, farq 10 foizdan oshmaydi.
