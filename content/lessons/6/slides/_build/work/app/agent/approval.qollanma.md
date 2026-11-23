# Mavzuga qarab tasdiq (`approval.toml`): qo‘llanma (5-dars, sinovning 2-haftasi)

1-haftada har bir javobni odam tasdiqlaydi (`REPLY_MODE=approve`).
Sinov tugagach, javoblar xodimga darhol boradi (`REPLY_MODE=direct`).
Oradagi qadam - `REPLY_MODE=topics`: xavfsiz mavzulardagi javoblar darhol boradi, qolganlarini hali ham odam tasdiqlaydi.
`agent/approval.toml` qaysi mavzu darhol borishini aytadi.

## Qachon yoqiladi

5-to‘plam A.5 bo‘yicha, 1-haftani ko‘rib chiqqandan keyin, ikkala shart bajarilgan bo‘lsa:
- to‘xtatish sharti (A.7) bir marta ham ishlamagan;
- 1-haftadagi har bir xato yo‘riqnomada tuzatilgan, unga test qo‘shilgan va `pilot eval` da hammasi o‘tgan.

Qaysi mavzu darhol borishini Siz (rahbar) loyiha yetakchisi bilan birga hal qilasiz.
Darhol faqat xatosi arzon va 1-haftada kam xato bo‘lgan mavzular boradi.
Xatosi qimmat mavzular (chegirma, muddat, shartnoma shartlari) tasdiqda qoladi.

## Qanday ishlaydi

1. Bot har bir javob oxiriga mavzuni yozadi, masalan «MAVZU: narx».
   Bu qatorni xodim ham, tekshiruvchi ham ko‘rmaydi: bot uni olib tashlaydi.
2. Javob xodimga darhol boradi, faqat agar:
   - mavzu `direct_topics` ro‘yxatida bo‘lsa;
   - va savolda ham, javobda ham boshqa mavzuning kalit so‘zi bo‘lmasa (masalan, «chegirma», «yetkaz»).
3. Qolgan hamma javob tekshiruvchiga (`REVIEWER_CHAT_ID`) boradi, xuddi 1-haftadagidek: «📝 Javob loyihasi», «✅ Yuborish» yoki «❌ Rad etish».
4. Shubha bo‘lsa - tasdiqqa: mavzu yozilmagan, ro‘yxatda yo‘q yoki «boshqa» bo‘lsa, javob odamga boradi.

Shuning uchun keyin yangi mavzu qo‘shsangiz, u avval tasdiqdan o‘tadi; darhol ro‘yxatiga uni o‘zingiz qo‘shasiz.

## Qanday to‘ldiriladi

```toml
direct_topics = ["narx", "qoldiq"]

[topics]
narx = ["narx", "necha pul", "qancha", "цена", "стоимость"]
qoldiq = ["ombor", "qoldiq", "bormi", "nechta bor", "остаток", "склад"]
chegirma = ["chegirma", "skidka", "скидка"]
muddat = ["yetkaz", "muddat", "qachon", "necha kunda", "dostavka", "доставк", "срок"]
kafolat = ["kafolat", "гарант"]
```

| Qator | Ma’nosi |
|---|---|
| `direct_topics` | Shu mavzulardagi javoblar xodimga darhol boradi; qolgani - tasdiqqa |
| `[topics]` | Hamma mavzular ro‘yxati; bot javobga shulardan birini yoki «boshqa» ni yozadi |
| `narx = [...]` | Mavzuning kalit so‘zlari: xodimlar qanday yozadi (o‘zbekcha, ruscha, xatosi bilan) |

Kalit so‘z matnning istalgan joyidan qidiriladi: «yetkaz» - «yetkazish», «yetkazib berish», «yetkazasizmi» ni topadi.
Katta-kichik harf va apostrof farq qilmaydi.

## Qanday yoqiladi

Ikki yo‘l bor, natija bir xil.

### 1-yo‘l: fayl orqali (doimiy, darsda shunday qilamiz)
1. `agent/approval.toml` da `direct_topics` qatorini yozing.
2. `.env` da `REPLY_MODE=topics` qo‘ying.
3. `uv run pilot check` - «Darhol boradigan mavzular: narx, qoldiq» deydi.
4. Testlar va serverga joylash: `deploy.py deploy` (fayl o‘zgardi) va `deploy.py env` (`.env` o‘zgardi).

Claude Code’ga yozing:

```text
agent/approval.qollanma.md ni o'qi. 2-haftaga o'tamiz: narx va ombor qoldig'i javoblari xodimga darhol,
qolgan hamma javob (chegirma, yetkazish muddati va boshqalar) tasdiqqa.
approval.toml va .env ni shunga moslab, pilot check va testlarni ishga tushir, keyin serverga joyla.
```

### 2-yo‘l: telefondan (darhol, fayl o‘zgarmaydi)
Botga yozing (faqat Siz va loyiha yetakchisi):

| Buyruq | Natija |
|---|---|
| `/darhol` | Hozirgi rejimni ko‘rsatadi |
| `/darhol narx qoldiq` | Faqat shu mavzular darhol, qolgani tasdiqqa |
| `/darhol hammasi` | Hamma javob darhol (`direct`) |
| `/darhol yo‘q` | Hamma javob tasdiqqa (1-hafta rejimi, `approve`) |
| `/darhol standart` | Telefondagi sozlama o‘chadi, `.env` va `approval.toml` dagisi ishlaydi |

Telefondagi sozlama serverda saqlanadi va bot qayta ishga tushsa ham qoladi.
`.env` dagi `REPLY_MODE` yoki `approval.toml` o‘zgarsa, yangisi ishlaydi: telefondagi sozlama o‘z-o‘zidan o‘chadi.
Har bir o‘zgarish jurnalga yoziladi.

## To‘ldirilgan namuna: Baraka Office, 2-hafta

1-hafta (14-19.12) natijasi: 7 ta xato bo‘ldi, lekin hammasini Malika tasdiqlashda ushladi, birortasi mijozga yetmadi.
Haftalik ko‘rib chiqishda (19-20.12) rahbar narx va ombor qoldig‘i javoblarini darhol yuborishga ruxsat berdi.
Chegirma va yetkazish muddati javoblari 100% Malika tasdig‘idan o‘tadi.

`.env` da:

```
REPLY_MODE=topics
REVIEWER_CHAT_ID=5002223344
```

`agent/approval.toml` - yuqoridagi fayl (shablonda shunday keladi).

Nega shunday yozilgan:
- `direct_topics = ["narx", "qoldiq"]` - prays-list va 1C eksportidan to‘g‘ridan-to‘g‘ri olinadigan javoblar; 1-haftadagi xatolar ularda tuzatildi va test qo‘shildi.
- `chegirma` darhol emas: xato chegirma - yo‘qotilgan pul; 10% faqat ROP yozma ruxsati bilan.
- `muddat` darhol emas: 17.12 dagi «Chirchiqqa yetkazish bepul» xatosi aynan shu yerda edi va tasdiqlashda ushlandi.
  «yetkaz» kalit so‘zi tufayli yetkazish narxi haqidagi javoblar ham tasdiqqa boradi.
- `kafolat` ro‘yxatda bor, lekin darhol emas: nizo bo‘lsa, ROP hal qiladi.
- `REVIEWER_CHAT_ID` - Malika Rashidova (loyiha yetakchisi), 1-haftadagidek.

Sinab ko‘rish (xodim hisobidan):

```
Xodim:  Optima stolidan 8 ta kerak, qancha bo'ladi?
Bot:    «Optima» ergonomik stol 140x70 (WS-102), 8 dona - ulgurji narx: 1 890 000 x 8 = 15 120 000 so‘m.
        [✅ To‘g‘ri] [❌ Xato]

Xodim:  Mijozga chegirma bersam bo'ladimi?
Bot:    Savolingiz qabul qilindi. Javobni xodim tekshirib, tez orada yuboradi.
Malikaga: 📝 Javob loyihasi ... [✅ Yuborish] [❌ Rad etish]
```

Rahbar telefonida:

```
Siz:  /darhol
Bot:  ✅ Javob rejimi: mavzuga qarab - darhol: narx, qoldiq; tasdiqqa: chegirma, muddat, kafolat, boshqa va mavzusi aniqlanmagan javoblar.
```

Ish vaqtidan tashqarida (`WORK_HOURS`) yozilgan savolning loyihasi Malikaga ertalab boradi; xodim shu vaqtgacha kutadi.

## Yomon namuna va nima xato

```toml
direct_topics = ["narx", "qoldiq", "chegirma"]

[topics]
narx = ["narx"]
chegirma = []
```

| Nima xato | Nima uchun | To‘g‘risi |
|---|---|---|
| `chegirma` darhol | 1-haftada eng qimmat xatolar chegirmada edi; A.5 ruxsat bermaydi | Chegirmani tasdiqda qoldiring |
| `qoldiq` `[topics]` da yo‘q | `pilot check` xato beradi: `direct_topics has unknown topics: qoldiq`; bot ishga tushmaydi | Har bir mavzu `[topics]` da bo‘lsin |
| `chegirma = []` | Kalit so‘z yo‘q: model «35 mln ga 10% bilan narxi qancha?» ga «narx» deb yozsa, javob tasdiqsiz ketadi | Har bir mavzuga 3-5 ta kalit so‘z |
| `narx = ["narx"]` | Xodimlar «necha pul», «qancha», «цена» deb ham yozadi | Xodimlarning haqiqiy so‘zlarini qo‘shing: `/xatolar` va jurnaldan oling |

Yana bir yomon qaror: 2-haftada hammasini `direct` qilish, chunki «bot yaxshi ishlayapti».
Barakada 1-hafta raqamlari A.6 maqsadlaridan past edi; xatolar mijozga yetmagani - faqat tasdiq tufayli.

## Ko‘p uchraydigan xatolar

| Holat | Nima uchun | Nima qilish |
|---|---|---|
| Narx savoli tasdiqqa ketdi | Savolda yoki javobda «chegirma», «yetkaz», «qachon» kabi so‘z bor, yoki model mavzuni yozmadi | Shunday bo‘lishi kerak: shubha bo‘lsa - tasdiqqa. Juda ko‘p bo‘lsa, kalit so‘zni aniqroq qiling |
| `.env` ni o‘zgartirdim, rejim o‘zgarmadi | `deploy.py env` ishga tushirilmagan | `deploy.py env`, keyin botga `/darhol` |
| `/darhol` bilan qo‘ygan sozlamam yo‘qoldi | Keyin `.env` yoki `approval.toml` o‘zgargan: yangisi ishlaydi | Kerak bo‘lsa, `/darhol narx qoldiq` ni qayta yozing |
| Tekshiruvchiga loyiha kelmadi | Kechqurun yoki dam olish kuni: ertalab keladi | `WORK_HOURS`, `WORK_DAYS` ni tekshiring |
| `pilot check`: «REPLY_MODE=topics, lekin agent/approval.toml yo‘q» | Fayl o‘chirilgan | Shablondan qaytaring: hozircha hamma javob tasdiqqa boradi |

## Bajarildi, agar

- [ ] 5-to‘plam A.5 shartlari tekshirildi, qaror rahbar bilan qabul qilindi.
- [ ] `pilot check` darhol boradigan mavzularni ko‘rsatdi.
- [ ] Xodim hisobidan sinaldi: narx savoli darhol, chegirma savoli tasdiqqa bordi.
- [ ] Botga `/darhol` yozildi: rejim to‘g‘ri.
- [ ] 5-to‘plam B.13 ga yozildi: «2-hafta: narx va qoldiq darhol, qolgani tasdiqda».
