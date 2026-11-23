# Yomon namuna: sinov rejasi (To‘plam 5 A)

Bu - ataylab zaif yozilgan reja, xuddi shu «Baraka Office» jarayoni uchun.
4-mashqda juftlikda o‘qiysiz: har bir bandda nima xato ekanini toping, keyin pastdagi javob bilan solishtiring.

---

- Jarayon: savdo
- Sinov egasi: Jamshid
- Bo‘lim boshlig‘i: -
- Sana: dekabr

### A.1 Jarayon va agent

Savdo bo‘limini AI bilan avtomatlashtirish.

### A.2 Maqsad, bitta raqamda (... dan ... gacha)

Javoblarni tezlashtirish va xatolarni 50% kamaytirish, sotuvni oshirish.

### A.3 Sanalar: boshlanishi - tugashi (2-4 hafta)

Bot tayyor bo‘lgach, yanvargacha.

### A.4 Qamrov: qaysi mijozlar, so‘rovlar yoki buyurtmalar

Hamma menejerlar va mijozlar.

### A.5 Chegaralar: agent qila oladi / qila olmaydi

Agent hamma savolga javob beradi. Kerak bo‘lsa chegirma ham beradi.

### A.6 Muvaffaqiyat mezonlari

Xodimlar mamnun bo‘lsa va mijozlar shikoyat qilmasa.

### A.7 To‘xtatish sharti: agar ... bo‘lsa, darhol to‘xtatamiz

Juda ko‘p xato bo‘lsa.

### A.8 Agent javoblarini kim va qanchalik tez-tez tekshiradi

Agent o‘zi tekshiradi, ba’zan Jamshid ko‘radi.

### A.9 Haftalik ko‘rib chiqish: kun, vaqt, kim qatnashadi

Vaqt bo‘lganda.

---

## Nima xato (javob)

| Band | Xato | Tuzatilgan holi (`../kompaniya/kit5-pilot/plan.md`) |
|---|---|---|
| Sarlavha | Bo‘lim boshlig‘i yo‘q, sana yo‘q; «sinov egasi» rahbar o‘rniga bo‘lim boshlig‘i, loyiha yetakchisi yo‘q | Egasi Rustamov S.A., yetakchi Malika, boshliq Jamshid aka rozi, sana |
| A.1 | «Savdo bo‘limi» - jarayon emas, bo‘lim; agent nima qilishi yo‘q | Bitta jarayon, botning ishi bitta gapda |
| A.2 | Uchta maqsad, birortasida raqam yo‘q («tezlashtirish», «50%» - nimaning 50%i?) | Bitta raqam: 6 daqiqadan 2 daqiqagacha |
| A.3 | Boshlanish sanasi yo‘q: «bot tayyor bo‘lgach» hech qachon kelmasligi mumkin | 14-dekabr 14:00 - 26-dekabr, suhbatlar o‘sha kuni ertalab |
| A.4 | «Hamma» - xato bo‘lsa, butun bo‘limga va mijozlarga tegadi | 4 xodim, 4 mavzu, mijoz botga yozmaydi |
| A.5 | «Kerak bo‘lsa chegirma beradi» - To‘plam 3 B.5 ga zid, pulga tegadi | B.4 va B.5 dan aynan; 1-hafta faqat qoralama |
| A.6 | «Mamnun bo‘lsa» o‘lchanmaydi | Har mezon raqam bilan, agentgacha bilan yonma-yon |
| A.7 | «Juda ko‘p» - qancha? Kim to‘xtatadi? | Aniq hodisalar, kim, qaysi buyruq (`/stop`) |
| A.8 | Agent o‘zini o‘zi tekshiradi: xato hech kimga ko‘rinmaydi (To‘plam 3 qoidasi) | Malika, kunlik va har bir qoralama |
| A.9 | Taqvimda yo‘q ko‘rib chiqish bo‘lmaydi | Har shanba 16:00, kim qatnashishi bilan |

Eng xavflisi A.5 va A.8: bot chegirma va’da qiladi va buni hech kim tekshirmaydi.
6-darsda bunday reja bilan «davom etamizmi?» degan savolga javob berib bo‘lmaydi: nima bilan solishtirishni bilmaysiz.
