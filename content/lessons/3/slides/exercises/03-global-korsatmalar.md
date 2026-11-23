# 3-mashq. Global ko‘rsatmalar

2-dars · 1:14-1:20 · 6 daqiqa · Claude ilovasi va Claude Code

## Maqsad

`CLAUDE.md` faqat kompaniya papkasida ishlaydi.
Global ko‘rsatmalar esa har bir suhbatda ishlaydi: qaysi papkada bo‘lsangiz ham, qaysi mavzuda yozsangiz ham.
Bir marta yozasiz, Claude keyin har safar shunga amal qiladi.
Ular maqtovni, ortiqcha gapni va eski yil bilan qidirishni to‘xtatadi.

## Ikki joy, bitta matn

| Qayerda | Qayerga yoziladi | Qachon ishlaydi |
|---|---|---|
| Claude ilovasi (claude.ai, telefon, kompyuter ilovasi) | Sozlamalar: chap pastdagi ismingiz, Settings, «Your Claude» (eski ko‘rinishda «Account»), «Instructions» | Ilovadagi hamma suhbatda |
| Claude Code | `~/.claude/CLAUDE.md` fayli (uy papkangizdagi yashirin `.claude` papkasida) | Kompyuterdagi hamma Claude Code sessiyasida |

Menyu nomlari 2026-11-03 da rasmiy yordam sahifasida tekshirildi: support.claude.com/en/articles/10185728.
Hisobingizda boshqacha ko‘rinsa, Settings ichida «Instructions» so‘zini qidiring.

## Matn

Shu 5 qatorni o‘zingizga moslang.
Masalan, javobni rus tilida olishni istasangiz, 5-qatorni o‘zgartiring.

```text
- Uzun tire belgisini ishlatma, oddiy chiziqcha (-) ishlat.
- Ortiqcha gap va maqtovsiz, qisqa va aniq yoz.
- Men xato bo‘lsam yoki yaxshiroq yo‘l bo‘lsa, ochiq ayt va sababini tushuntir.
- Hozir 2026-yil. Yangilik, narx yoki qonun qidirganda shu yilni hisobga ol.
- Men bilan o‘zbek tilida gaplash. Yangi atamani birinchi marta ishlatganda oddiy so‘zlar bilan tushuntir.
```

## Qadamlar

### A. Claude ilovasida (2 daqiqa)

1. claude.ai ni yoki Claude ilovasini oching.
2. Chap pastda ismingizni bosing, keyin Settings.
3. «Your Claude» (yoki «Account») bo‘limida «Instructions» maydonini toping.
4. Yuqoridagi matnni joylang va saqlang.
5. Yangi suhbat oching va tekshiring: «Bugun qaysi yil?»

### B. Claude Code’da (3 daqiqa)

1. Kompaniya papkangizdagi Claude Code oynasida quyidagi promptni yuboring.
2. Claude `~/.claude/CLAUDE.md` ga yozish uchun ruxsat so‘raydi: bu papka loyihangizdan tashqarida, shuning uchun so‘raydi.
   «Yes» ni tanlang.
3. `/exit` deb yozing, keyin yana `claude` deb oching: endi qoidalar ishlaydi.

```text
~/.claude/CLAUDE.md faylini och (yo‘q bo‘lsa, yarat) va oxiriga quyidagi qoidalarni qo‘sh.
Bor matnni o‘chirma.
Qo‘shgandan keyin faylning oxirgi 10 qatorini menga ko‘rsat.

- Uzun tire belgisini ishlatma, oddiy chiziqcha (-) ishlat.
- Ortiqcha gap va maqtovsiz, qisqa va aniq yoz.
- Men xato bo‘lsam yoki yaxshiroq yo‘l bo‘lsa, ochiq ayt va sababini tushuntir.
- Hozir 2026-yil. Yangilik, narx yoki qonun qidirganda shu yilni hisobga ol.
- Men bilan o‘zbek tilida gaplash. Yangi atamani birinchi marta ishlatganda oddiy so‘zlar bilan tushuntir.
```

## Nima uchun aynan shular

| Qoida | Nima uchun |
|---|---|
| Uzun tire yo‘q | AI yozgan matnni darhol tanitadigan belgi. Mijozga yuboriladigan matnda kerak emas. |
| Maqtovsiz, qisqa | «Ajoyib savol!» kabi gaplar vaqtingizni oladi. |
| Xato bo‘lsam, ayt | AI odatda rozi bo‘lishga moyil. Bu qoida unga e’tiroz bildirishga ruxsat beradi. |
| Hozir 2026-yil | Model bilimi ma’lum sanada to‘xtagan. Qidiruvda eski yilni yozib qo‘yadi. |
| O‘zbek tilida, atamani tushuntir | «5 yoshli bolaga tushuntir» odatining doimiy ko‘rinishi. |

## «Baraka Office» namunasi

Rustamov S.A. (Baraka egasi) yana bitta qator qo‘shdi, chunki u mijozga yoziladigan matnlarni ko‘p so‘raydi:

```text
- Mijozga yoziladigan matnda «Hurmatli [Ism] aka / opa» va «Siz» deb murojaat qil.
```

Bu qoida faqat Baraka uchun bo‘lsa, global ko‘rsatmaga emas, kompaniya `CLAUDE.md` siga yoziladi.
Qoida: hamma joyda kerak bo‘lsa - global; faqat shu kompaniyada kerak bo‘lsa - `CLAUDE.md`.

## Yomon namuna

```text
Sen eng aqlli yordamchisan. Doim batafsil va professional yoz. Qisqa yoz. Ingliz tilida javob ber, lekin o‘zbekcha tushuntir.
```

Xatolar: maqtov hech narsa bermaydi; «batafsil» va «qisqa» bir-biriga zid; tillar aralash.
Claude zid qoidalardan birini tasodifan tanlaydi (rasmiy hujjat: code.claude.com/docs/en/memory).

## Tayyor bo‘lsa

- [ ] Claude ilovasida Instructions saqlangan; yangi suhbatda «Bugun qaysi yil?» savoliga 2026 deb javob beradi.
- [ ] `~/.claude/CLAUDE.md` da 5 qator bor.
- [ ] Claude Code qayta ochilganda o‘zbek tilida javob beradi.

## Ko‘p uchraydigan xatolar

| Nima bo‘ldi | Nima qilish kerak |
|---|---|
| Settings’da «Instructions» topilmadi | Settings qidiruviga «Instructions» yozing. Topilmasa, B qismi bugun yetarli. |
| Claude `~/.claude/CLAUDE.md` ga yozishga ruxsat so‘ramadi va yozmadi | Prompt boshiga «Ruxsat so‘rab, yoz» deb qo‘shing. Yoki `/memory` deb yozing va ro‘yxatdan `~/.claude/CLAUDE.md` qatorini tanlang: fayl tahrirlagichda ochiladi. |
| Qoidalar ishlamayapti | Claude Code’ni qayta oching: fayl sessiya boshida o‘qiladi. |

## Mentor tekshiruvi (2.6)

Ilovada yoki Claude Code’da global ko‘rsatmalar saqlangan; ishtirokchi qayerdaligini ko‘rsata oladi.
