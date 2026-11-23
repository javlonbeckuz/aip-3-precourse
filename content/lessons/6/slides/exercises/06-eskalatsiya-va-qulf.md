# 6-mashq: Odamga uzatish yo‘llari (B.6) va botni qulflash

5-dars, 2:15-2:27.
Natija: To‘plam 3 B.6 dagi har bir holat bir marta soxta savol bilan sinalgan (tekshiruv 5.8), bot begona akkauntga javob bermaydi (tekshiruv 5.9).

**Odamga uzatish (eskalatsiya)** - agent bilmagan yoki o‘zi hal qilmasligi kerak bo‘lgan holatni aniq odamga, aniq yo‘l bilan berish: holat - kimga - qanday.
Bu bo‘lmasa, agent jim xato qiladi: bo‘sh Excel kelsa «0 dona» deydi.

## Kerak bo‘ladi

- `kit3-agent/form-b-agent.md`, B.6 bo‘limi (har bir holat: holat - kimga - qanday).
- `.env` da `ESCALATION_CHAT_ID` - uzatilgan savollar kimga boradi.
- Ikkinchi Telegram akkaunt (oila a’zosining telefoni) - qulfni sinash uchun.

## Qanday bajariladi

1. **Holatlar ro‘yxati.**
   B.6 dagi har bir holatga bitta soxta savol yozing.
   Savol haqiqiy xodim yozadigandek bo‘lsin, lekin ichida «sinov» so‘zi bo‘lmasin: agent sinovni sezmasligi kerak.
2. **Har bir savolni noutbukda bering:** `uv run pilot ask "<savol>"`.
   Kutilgan natija: «ODAMGA: <sabab>» va `holat: escalated`.
   `pilot ask` jurnalga savol yozmaydi, shuning uchun To‘plam 5 dagi B.1 o‘zgarmaydi; har bir savol taxminan 40-60 so‘m.
3. **Yetkazish yo‘lini bir marta jonli tekshiring.**
   Agar shu haftada botda haqiqiy uzatish bo‘lmagan bo‘lsa, telefoningizdan botga bitta soxta savol yuboring.
   Bot xodimlarga faqat ish vaqtida yozadi (`WORK_HOURS`, `WORK_DAYS`): yakshanba guruhida xabar dushanba 09:00 da boradi; shanba guruhida darhol boradi, xodimni oldindan ogohlantiring.
   Dushanba kuni mas’ul odamdan «oldim» deb tasdiq oling va bu bitta savolni B.1 dan ayiring.
4. **Bo‘sh fayl sinovi (faqat noutbukda).**
   Serverdagi haqiqiy faylni buzmang.
   Noutbukda `data/` dagi eksportning nusxasini oling, faylni bo‘shating va `uv run pilot ask "<qoldiq savoli>"` bering: javob «ODAMGA: ...» bo‘lishi kerak, «0 dona» emas.
   Keyin faylni qaytaring.
5. **Qulf sinovi.**
   Ikkinchi akkauntdan botga istalgan savol yozing.
   Bot faqat «Bu bot faqat ... xodimlari uchun» va o‘sha akkauntning ID raqamini aytadi, savolga javob bermaydi.
   Bu sinov jurnalga yozilmaydi va pul turmaydi.

### Claude Code uchun topshiriq

```text
kit3-agent/form-b-agent.md dagi B.6 holatlarini o'qi.
Har bir holat uchun xodim yozadigandek bitta soxta savol tayyorla va kutilgan natijani yoz:
odamga uzatiladimi, kimga, qanday sabab bilan. Jadval qil.
Keyin noutbukda, data/ ning nusxasida, ombor faylini bo'shatib "uv run pilot ask" bilan
bitta qoldiq savolini ber (narxini ayt, ruxsat so'ra) va asl faylni qaytar.
Serverdagi fayllarga tegma.
```

## Baraka Office namunasi

Baraka sanalari yakshanba guruhiniki (5-dars 20-dekabr); shanba guruhida hammasi bir kun oldin (19-dekabr).

Rahbar sinfda, yakshanba 20-dekabr, 12:10, noutbukda (`namuna/yaxshilash/eskalatsiya-sinovi.txt`):

| B.6 holati | Soxta savol | `pilot ask` javobi |
|---|---|---|
| 5% dan katta chegirma | «Mijoz 45 mln buyurtmaga 15% chegirma so‘rayapti» | ODAMGA: 15% chegirma menejer vakolatidan (5%) yuqori |
| 7 ish kunidan tez yetkazish | «Mijoz ertaga yetkazib berishni so‘rayapti, mumkinmi?» | ODAMGA: 7 ish kunidan tez yetkazish so‘ralmoqda |
| Tender yoki 150 mln dan katta | «Tender: 170 mln lik buyurtma, nima qilamiz?» | ODAMGA: tender yoki 150 000 000 so‘mdan katta buyurtma, ROP hal qiladi |
| Ombor fayli eski yoki bo‘sh | «ErgoPro omborda nechta bor?» | ODAMGA: ombor fayli bilan muammo (fayl 28 soatdan beri yangilanmagan (chegara 25 soat)) |
| Shikoyat, kafolat nizosi | «Mijoz shikoyat qilyapti: kreslo mexanizmi 2 oyda buzildi, nima qilamiz?» | ODAMGA: mijoz shikoyati yoki kafolat bo‘yicha nizo, ROP hal qiladi |

Beshala holat ham odamga uzatildi; B.1 o‘zgarmadi (132).

Yetkazish yo‘li haftaning o‘zida jonli tekshirilgan: payshanba 17-dekabr 1C eksporti bo‘sh keldi.
Bot rahbarga 08:00 da yozdi: «⚠️ Ma’lumot manbasi muammosi: Ombor qoldig‘i (1C eksport): jadvalda qatorlar yo‘q».
09:10 dagi «ErgoPro omborda nechta bor?» savoli «0 dona» emas, Jamshid akaga uzatildi (`namuna/baraka-1-hafta/jamshid-telegrami.txt`):

```text
🙋 Odamga uzatildi #70ce7993
Kimdan: Zarina
Savol: ErgoPro omborda nechta bor?
Sabab: ombor fayli bilan muammo (Ombor qoldig‘i (1C eksport): jadvalda qatorlar yo‘q), qoldiqni Otabek akadan aniqlash kerak.

Javob berish uchun shu xabarga reply qiling - bot javobingizni yuboradi.
```

Jamshid aka reply qilib javob berdi, javob Zarinaga yetdi; Otabek aka 10:40 da qayta eksport qildi.
1-haftada jami 21 ta savol odamga uzatildi; shanba 18:40 dagi tender savoli Jamshid akaga dushanba 09:00 da yetdi (ish vaqti).

Qulf sinovi (13:10):

```text
Begona akkaunt: Assalomu alaykum, chegirma bormi?
Bot: Bu bot faqat Baraka Office xodimlari uchun.
Sizning Telegram ID raqamingiz: 7199999
Kirish kerak bo‘lsa, shu raqamni rahbaringizga yuboring.
```

Jurnalga hech narsa yozilmadi, model chaqirilmadi, pul sarflanmadi.

## Yomon namuna

> B.6: Murakkab savollar - direktorga.

**Nimasi yomon:**

- «Murakkab» - agent uchun o‘lchov emas: u o‘zini hamma narsani biladi deb hisoblaydi.
- Hammasi direktorga: direktor kuniga 15 ta chegirma savoliga javob beradigan bo‘ladi, ROP esa chetda qoladi.
- «Qanday» yo‘q: telefon, Telegram yoki bot orqali - noma’lum.
- Sinab bo‘lmaydi: qaysi savol «murakkab» ekanini hech kim bilmaydi.

**To‘g‘rilangan:** har bir holat bitta qator, sonlar bilan: «Mijoz 5% dan katta chegirma so‘rasa - ROP Jamshid aka - bot orqali».
Har birini bitta soxta savol bilan sinasa bo‘ladi (yuqoridagi jadval).

## Tez-tez uchraydigan xatolar

- **Uzatish o‘zingizga keladi, mas’ul odamga emas.**
  `ESCALATION_CHAT_ID` bo‘sh bo‘lsa, hammasi egaga boradi.
- **Mas’ul odam xabar olmaydi.**
  U botni hech qachon ochmagan: unga botni ochib `/start` bosishni ayting (Telegram boti birinchi bo‘lib yoza olmaydi).
- **Reply qilmasdan javob yozadi.**
  Mas’ul odam bot xabariga «reply» qilib yozishi kerak, shunda javob xodimga boradi.
- **Begona akkaunt javob oldi.**
  `.env` da `ACCESS_MODE=public` turibdi yoki ID `ALLOWED_USER_IDS` ga tasodifan qo‘shilgan.
  `/taqiq <ID>` bilan darhol olib tashlang.

## Tayyor, agar

- [ ] B.6 dagi har bir holat bitta soxta savol bilan sinalgan (`pilot ask`: «ODAMGA: ...»).
- [ ] Yetkazish yo‘li jonli tekshirilgan (shu haftadagi haqiqiy uzatish yoki bitta soxta savol, mas’ul odam tasdig‘i bilan).
- [ ] Bo‘sh fayl sinovi noutbukda o‘tkazilgan, asl fayl joyida.
- [ ] Ikkinchi akkauntga bot javob bermadi.
- [ ] Mentor ko‘rdi (tekshiruv 5.8 va 5.9).
