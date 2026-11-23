# Sinov va hisob-kitob

Praktikum 3.0 · To‘plam 5 / 5 · Tuzuvchi: Xurshid Maroziqov

Aniq chegaralangan 2-4 haftalik sinov (pilot) o‘tkazing va faqat agentning tezligini emas, balki pul va vaqtda nima o‘zgarganini hisoblang.

## Qanday ishlatiladi

1. 2-darsdan keyin: boshlang‘ich holat.
   Tanlangan jarayonning hozirgi raqamlarini yozing: bajarilgan so‘rovlar, o‘rtacha daqiqa, xatolar, takroriy so‘rovlar.
   Tarix bo‘lsa (Telegram eksporti, Excel, CRM), oxirgi 2-4 haftani Claude Code bilan oling; tarixi yo‘q narsani 5 ish kuni jonli yozing.
   Bu B shaklidagi «Agentgacha» ustuni: boshlang‘ich raqam bo‘lmasa, sizda faqat taassurot qoladi.
2. 4-darsda: sinov rejasi.
   Agent ishga tushishidan oldin bo‘lim boshlig‘i bilan A shaklini to‘ldiring: bitta raqamli maqsad, sanalar, agent nima qila oladi va nima qila olmaydi, sinovni to‘xtatish sharti.
3. Cheklangan ruxsat bilan boshlang: agent qoralama yozadi, odam har bir javobni tasdiqlaydi.
   Agentning har bir xatosini B.13 xatolar jurnaliga yozing: kim topgani va yo‘riqnomada nimani o‘zgartirganingiz bilan.
4. Har hafta B shaklining bitta ustunini to‘ldiring, xodimlarning tekshirishga sarflagan soatlari (B.7) bilan.
   Topilgan pulni (B.14) ham yozing: oldi olingan xatolar, yo‘qolmagan so‘rovlar, tezroq tushgan pul.
   Xarajatlarni qo‘shing: obuna, sozlash, tekshirish soatlari.
5. 6-darsda: o‘zgarish ustunini, jami xarajatni, tejalgan vaqtni va bitta bajarilgan ish narxini hisoblang.
   Natijani A.6 va A.7 bilan solishtiring va bitta qarorni belgilang: davom etish, o‘zgartirish yoki to‘xtatish.
   Sababini bir gapda yozing va natijani jamoaga ayting.

## Claude Code’da

/kit5 baseline, /kit5 reja, /kit5 hafta 1, /kit5 xato, /kit5 yakun.
Natija kit5-pilot/ papkasida.

Fayllar kompaniya papkasida:

- A shakli, Sinov rejasi: `kit5-pilot/plan.md`
- B shakli, Sinov raqamlari: `kit5-pilot/numbers.md`
- Jamoaga e’lon: `kit5-pilot/announcement.md`
- Loyiha yetakchisi bilan suhbat: `kit5-pilot/briefing.md`

## AI chat uchun so‘rov

Claude Code bo‘lmasa: shakl yoki transkriptni so‘rovdan keyin qo‘shib, hammasini Claude, ChatGPT yoki Gemini chatiga joylang.

```text
Siz kichik biznes egasi uchun 2-4 haftalik AI agenti sinovini ko‘rib chiqyapsiz.
Quyida A shakli (sinov rejasi, A.1-A.9) va B shakli (haftalik raqamlar B.1-B.8, topilgan pul B.14, xarajatlar B.9-B.12, natija B.15-B.16, xatolar jurnali B.13) berilgan.
Har bir hisobni formulasi va raqamlari bilan ko‘rsating.
1) Har bir ko‘rsatkich uchun boshlang‘ich holatdan oxirgi haftagacha bo‘lgan o‘zgarishni raqam va foizda hisoblang.
2) Tejalgan vaqtni haftasiga soatda hisoblang: B.15 = (B.2 agentgacha - B.2 oxirgi hafta) × B.1 oxirgi hafta / 60 - (B.7 oxirgi hafta - B.7 agentgacha). Ma’lumot 2 haftalik bo‘lgani uchun uni oraliq qilib bering.
3) Sinovning umumiy xarajatini (B.12) va bitta to‘liq bajarilgan ish narxini hisoblang: B.16 = B.12 / sinov haftalaridagi B.5 yig‘indisi. Uni agentgacha bo‘lgan inson narxi bilan solishtiring: B.2 agentgacha / 60 × soatbay haq. Soatbay haq berilmagan bo‘lsa, so‘rang.
4) Topilgan pulni (B.14) alohida yozing: har bir summa qayerdan kelganini ko‘rsating va isbotlanmagan summani ajratib qo‘ying.
5) Natijalarni muvaffaqiyat mezonlari (A.6) va to‘xtatish sharti (A.7) bilan solishtiring, har biriga bitta qator.
6) Xatolar jurnalini 2-4 turga bo‘ling va har bir turning oldini oladigan yo‘riqnoma o‘zgarishini nomlang.
7) Davom etish, o‘zgartirish yoki to‘xtatish bo‘yicha tavsiya bering, asosiy sababni bitta gapda yozing va hali isbotlanmagan narsalarni sanang.
Faqat berilgan raqamlardan foydalaning; har qanday taxminni ko‘rsating.
O‘zbek tilida javob bering.
```

## Shakl A: Sinov rejasi

Fayl: `kit5-pilot/plan.md`

- Jarayon: 
- Sinov egasi: 
- Bo‘lim boshlig‘i: 
- Sana: 

### A.1 Jarayon va agent


### A.2 Maqsad, bitta raqamda (... dan ... gacha)


### A.3 Sanalar: boshlanishi - tugashi (2-4 hafta)


### A.4 Qamrov: qaysi mijozlar, so‘rovlar yoki buyurtmalar


### A.5 Chegaralar: agent qila oladi / qila olmaydi


### A.6 Muvaffaqiyat mezonlari


### A.7 To‘xtatish sharti: agar ... bo‘lsa, darhol to‘xtatamiz


### A.8 Agent javoblarini kim va qanchalik tez-tez tekshiradi


### A.9 Haftalik ko‘rib chiqish: kun, vaqt, kim qatnashadi


## Shakl B: Sinov raqamlari

Fayl: `kit5-pilot/numbers.md`

- Jarayon: 
- Sinov sanalari: 
- Soatbay haq, so‘m: 

| Ko‘rsatkich | Agentgacha | 1-hafta | 2-hafta | 3-hafta | 4-hafta | O‘zgarish |
|---|---|---|---|---|---|---|
| B.1 Bajarilgan so‘rovlar |   |   |   |   |   |   |
| B.2 O‘rtacha vaqt, daqiqa |   |   |   |   |   |   |
| B.3 Xato javoblar |   |   |   |   |   |   |
| B.4 Takroriy so‘rovlar |   |   |   |   |   |   |
| B.5 To‘liq hal qilingan so‘rovlar |   |   |   |   |   |   |
| B.6 Yakunlangan bitimlar yoki buyurtmalar |   |   |   |   |   |   |
| B.7 Xodimning tekshirishga sarflagan vaqti, soat |   |   |   |   |   |   |
| B.14 Topilgan pul, so‘m |   |   |   |   |   |   |
| B.8 Mijoz shikoyatlari |   |   |   |   |   |   |

B.2 - bitta so‘rovga odam sarflagan daqiqa, tekshirishsiz (tekshirish B.7 da).
B.14 - oldi olingan xato, yo‘qolmagan so‘rov, tezroq tushgan pul.

### Xarajatlar

| Xarajat | So‘m |
|---|---|
| B.9 Obuna |   |
| B.10 Integratsiya va sozlash |   |
| B.11 Tekshirish soati x soatbay haq |   |
| B.12 Jami |   |

### Natija

| Ko‘rsatkich | Hisob | Natija |
|---|---|---|
| B.15 Tejalgan vaqt, soat/hafta | (B.2 agentgacha - B.2 sinovda) x B.1 / 60 - (B.7 sinovda - B.7 agentgacha) |   |
| B.16 Bitta bajarilgan ish narxi: agent / inson | agent: B.12 / B.5 yig‘indisi; inson: B.2 agentgacha / 60 x soatbay haq |   |

### Topilgan pul tafsiloti (B.14)

| Sana | Nima bo‘ldi | Summa, so‘m | Qanday hisobladik |
|---|---|---|---|
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |

### Xatolar jurnali

| B.13 Sana | Nima bo‘ldi | Kim topdi | Nimani o‘zgartirdik |
|---|---|---|---|
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |

### Qaror

- [ ] Davom etish
- [ ] O‘zgartirish
- [ ] To‘xtatish

Sababi: 

## Tayyor matnlar

Ovoz chiqarib o‘qing yoki o‘z so‘zlaringiz bilan ayting.
Kvadrat qavsdagi joylarni o‘zingiz to‘ldiring.

### Loyiha yetakchisi bilan suhbat

*2-darsdan keyin, boshlang‘ich raqamlardan oldin: yolg‘iz, taxminan 5 daqiqa.*

[Ism] aka/opa, sizdan bir narsani so‘ramoqchiman, «yo‘q» deyishingiz ham mumkin.
Kursda [jarayon] bo‘yicha AI yordamchisini taxminan to‘rt hafta ishlatib ko‘rmoqchiman.
Shu loyihani men bilan birga boshqarishingizni xohlayman, chunki bu ishni hammadan, mendan ham yaxshi bilasiz.
Avval bir hafta [jarayon] bugun qancha vaqt olishini sanaymiz: sizni emas, ishni hisoblaymiz.
Keyin yordamchi yoningizda ishlaydi: kuniga taxminan 10-15 daqiqa, ish vaqtida, u qilgan ishni tekshirasiz va qayerda xato qilganini menga aytasiz.
Uni istalgan payt [buyruq] bilan to‘xtata olasiz; to‘xtatganingiz yoki xato haqida aytganingiz uchun hech qachon ayblanmaysiz.
Men ko‘radigan har bir raqamni siz ham ko‘rasiz, ularning hech biri baholash yoki maoshingizga ta’sir qilmaydi.
Bu davrda [vazifa]ni sizdan olaman, shunda bu qo‘shimcha ish bo‘lmaydi; qo‘shimcha mehnat uchun natijadan qat’i nazar haftasiga [summa] to‘layman.
Ish chiqsa, xohlasangiz, ismingiz shu ishda turadi va [o‘qish yoki yangi rol] uchun birinchi navbat sizniki.
Ish chiqmasa, bu ham foydali natija, va bu sizning emas, mening javobgarligim.
Ertagacha o‘ylab ko‘ring; «yo‘q» desangiz, oramizda hech narsa o‘zgarmaydi, faqat qanday qilsak ishlashini aytib bering.

### Jamoaga e’lon

*6-darsdan keyin, har bir xodim bilan yolg‘iz gaplashgandan so‘ng: avval yig‘ilishda, keyin shu matn guruhga.*

Assalomu alaykum, jamoa.
Bir oy oldin [jarayon] bo‘yicha AI yordamchisini ishlatib ko‘rayotganimizni aytgan edim [va yozma majburiyat bergan bo‘lsangiz: bu sababli hech kim ishini yoki maoshini yo‘qotmasligini va’da qilgan edim].
Natija shunday: yordamchi endi [nima qiladi, bitta oddiy gapda].
[Jarayon] avval kuniga taxminan [X] daqiqa olardi; endi [Ism] tekshirishga sarflaydigan vaqt bilan birga taxminan [Y] daqiqa oladi.
Ba’zi narsalar ishlamadi: [bitta halol muvaffaqiyatsizlik], va biz [uni tuzatdik yoki o‘sha qismini to‘xtatdik].
Kundalik ishi bilan birga shu loyihani boshqargan, [n] ta xatoni topgan va yordamchini yaxshilagan [Ism]ga rahmat.
Nima o‘zgaradi: [sana]dan boshlab [Ism] tejalgan soatlarni [vazifa]ga sarflaydi; buni birga kelishdik.
Qolganlarning ishida [x]dan boshqa hech narsa o‘zgarmaydi; maosh va lavozimlar avvalgidek qoladi.
Keyingi qadam: [oy]da [2-jarayon]ni ko‘rib chiqamiz; birovning ishiga tegishdan oldin har biringiz bilan avval xuddi shunday gaplashaman.
Savollaringiz bo‘lsa, menga yoki [Ism]ga to‘g‘ridan-to‘g‘ri ayting yoki menga shaxsan yozing.
