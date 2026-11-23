# 2-mashq. Kompaniya papkasi va CLAUDE.md

2-dars · 0:59-1:14 · 15 daqiqa · Claude Code

## Maqsad

Noutbukingizda kompaniyangiz uchun bitta papka paydo bo‘ladi: `kompaniya/`.
Unda To‘plam 1 fayllaringiz va `CLAUDE.md` turadi.
`CLAUDE.md` - Claude uchun kompaniyangizning qoidalar daftari.
Claude Code shu papkada har safar ochilganda uni o‘qiydi, siz esa kompaniyangizni qayta-qayta tushuntirmaysiz.
Kurs oxirigacha hamma to‘plam natijasi, agent va hisobotlar shu papkada yig‘iladi.

## Boshlashdan oldin

- Guruh chatidagi `2-dars-kompaniya-papkasi.zip` fayli (yoki mentordagi fleshka).
- To‘plam 1 dagi B shakllaringiz `.md` fayl ko‘rinishida (masalan, `dilnoza-form-b.md`).
  B shaklingiz yo‘qmi?
  Bugun zip ichidagi «Baraka Office» fayllari bilan ishlang: `baraka-office/kompaniya/kit1-interviews/`.
  O‘zingiznikini chorshanbagacha mentorga yuboring.
- 1-mashqda Claude Code ochildi.

## Qadamlar

1. Zipni oching.
   - macOS: Yuklanmalar (Downloads) papkasida zipni ikki marta bosing: yonida `praktikum` papkasi chiqadi.
   - Windows: zipni o‘ng tugma bilan bosing, «Extract All» («Hammasini chiqarish»), joy sifatida `C:\Users\<ismingiz>` ni tanlang: fayllar 0-haftadagi `praktikum` papkasiga tushadi.
2. Hamma narsa uy papkangizdagi `praktikum` papkasida bo‘lsin: uni 0-haftada (8-qadam) yaratgansiz, kurs oxirigacha shu papkada ishlaymiz.
   macOS’da: Yuklanmalardagi yangi `praktikum` papkasini oching, ichidagi hamma narsani belgilang (Cmd+A) va uy papkangizdagi `praktikum` ga torting (Finder: «Go → Home»).
   Kurs papkasini tez ochish: Warp’da `cd ~/praktikum`, keyin `open .` (Windows: `explorer .`; oxirida nuqta bor).
   «Hujjatlar» (Documents) papkasiga qo‘ymang: Windows’da u ko‘pincha OneDrive ichida bo‘ladi va kalitlaringiz bulutga ketib qoladi.
   Ichida: `kompaniya/` (sizning papkangiz), `skills/` (kurs skill’lari, 8-mashqda kerak), `baraka-office/` (to‘ldirilgan namuna), `yomon-namuna/`, `natijalar/` (Claude’ning haqiqiy javoblari), `sahifalar/` (promptlar, mashqlar, uy vazifasi, shpargalka, lug‘at) va qo‘llanma.
   Promptlarni `sahifalar/promptlar.html` dan «Nusxa olish» tugmasi bilan oling.
3. B shakllaringizni `kompaniya/kit1-interviews/` ichiga torting (Finder yoki Explorer’da sichqoncha bilan).
   `ism-` bilan boshlanadigan fayllar bo‘sh andoza, ularga tegmang.
4. Warp’da yangi varaq oching (macOS: Cmd+T, Windows: Ctrl+Shift+T) va kompaniya papkasiga o‘ting: `cd ~/praktikum/kompaniya` (macOS’da ham, Windows’da ham bir xil).
   Ishlamasa yoki xato chiqsa: `cd ` deb yozing (oxirida bitta bo‘sh joy), keyin `kompaniya` papkasini Finder yoki Explorer’dan Warp oynasiga torting va Enter bosing: yo‘l o‘zi yoziladi.
5. `claude` deb yozing.
6. `/init` deb yozing va Enter bosing.
   Papkada `CLAUDE.md` andozasi bor, shuning uchun Claude uni ustidan yozmaydi: fayllarni o‘qib, andozani to‘ldirishni taklif qiladi.
   Taklifni o‘qing va «ha» deng.
   Claude uni `CLAUDE.new.md` degan alohida faylga yozsa, «buni CLAUDE.md ga ko‘chir» deng.
7. Tepada inglizcha qator paydo bo‘lsa («This file provides guidance to Claude Code...»), uni o‘chirishni so‘rang.
8. Bo‘sh qolgan joylarni to‘ldirish uchun quyidagi «Meni intervyu qil» promptini yuboring va savollarga javob bering.
9. Tekshirish savolini bering (pastda).
   Claude to‘g‘ri javob bersa, mashq tayyor.

## Prompt: bo‘sh joylarni to‘ldirish

```text
CLAUDE.md ni o‘qi.
Kvadrat qavsda qolgan va [?] bilan belgilangan joylarni men bilan birga to‘ldiramiz.
Menga savol ber, bir xabarda 3 tadan ko‘p emas.
Javoblarimni CLAUDE.md ga yoz, faylni 200 qatordan qisqa saqla.
Raqam to‘qima: men bilmagan joyni [?] bilan qoldir.
Parol, karta raqami yoki token aytsam, yozma va meni ogohlantir.
```

## Tekshirish savoli

O‘zingizga moslang:

```text
Faqat CLAUDE.md ga tayanib javob ber: biz nima sotamiz, asosiy mijozimiz kim va qaysi tizimlarda ishlaymiz? Javob qaysi qatordan olinganini ko‘rsat.
```

Claude uchala savolga ham to‘g‘ri javob berib, qatorni ko‘rsatsa, mashq tayyor.
Xato javob bersa, `CLAUDE.md` da shu qatorni aniqroq yozing.

## «Baraka Office» namunasi

To‘ldirilgan fayl (zip ichida): `baraka-office/kompaniya/CLAUDE.md`.
Uning ichidagi kulrang izohlar (izoh bloklari) nega har bir qator shunday yozilganini tushuntiradi.
Claude bu izohlarni o‘qimaydi, ular faqat siz uchun.

Eng muhim qismi - «Rasmiy hujjatlar: ziddiyat bo‘lsa, shular to‘g‘ri».
Baraka’da ROP «3 kunda yetkazamiz» deydi, shartnomada esa 7 ish kuni yozilgan.
`CLAUDE.md` da qaysi biri to‘g‘ri ekani yozilgani uchun Claude mijozga yolg‘on muddat aytmaydi.
Instruktor buni 4-namoyishda ko‘rsatadi: bir xil savol `CLAUDE.md` siz va `CLAUDE.md` bilan.

Baraka uchun tekshirish savoli va to‘g‘ri javob:

```text
Faqat CLAUDE.md ga tayanib javob ber: mijozga 3 kunda yetkazamiz deyish mumkinmi va sotuvchi qancha chegirma bera oladi?
```

Kutiladigan javob: «Yo‘q: yetkazish oldindan to‘lov tushgandan 7 ish kuni (MDF va shpon 12 ish kuni). Sotuvchi 20 mln so‘mdan katta buyurtmada 5% gacha; ROP yozma ruxsati bilan 10% gacha; undan yuqori taqiqlangan. Manba: CLAUDE.md, «Rasmiy hujjatlar» bo‘limi.»

Yomon namuna va undagi 9 ta xato: `yomon-namuna/nima-xato.md`.

## Tayyor bo‘lsa

- [ ] `kompaniya/` Hujjatlar papkasida, ichida B shakllaringiz bor.
- [ ] `CLAUDE.md` da kompaniya, mijozlar, xodimlar, bo‘limlar va tizimlar yozilgan.
- [ ] Faylda parol, token yoki karta raqami yo‘q.
- [ ] Claude tekshirish savoliga `CLAUDE.md` dan to‘g‘ri javob berdi.

## Ko‘p uchraydigan xatolar

| Nima bo‘ldi | Nima qilish kerak |
|---|---|
| Claude boshqa papkada ochilgan (yo‘l `kompaniya` bilan tugamaydi) | `/exit`, keyin 4-qadamdan boshlang. Warp tepasidagi yo‘lga qarang. |
| `/init` uzoq ishlayapti yoki g‘alati matn yozdi | Esc bosing. `/init` siz ham bo‘ladi: to‘g‘ridan-to‘g‘ri 8-qadamdagi promptni yuboring. |
| Claude `CLAUDE.md` ni inglizcha yozdi | «CLAUDE.md ni o‘zbek tilida qayta yoz» deng. 3-mashqdan keyin bu takrorlanmaydi. |
| Hamma narsani bitta uzun gap qilib yozdim | Har qatorda bitta fakt. Baraka namunasiga qarang. |
| 14 sahifalik prays-listni ichiga ko‘chirdim | Prays-listni `hujjatlar/` ga qo‘ying, `CLAUDE.md` da faqat fayl nomini yozing. |

## Kengaytma (tez tugatganlar uchun)

Bo‘lim uchun ichki `CLAUDE.md`: masalan, `kit1-interviews/CLAUDE.md` ga «Bu papkada xodimlarning shaxsiy ma’lumoti bor; ismlarni hech qayerga chiqarma» deb yozing.
Claude bu faylni faqat shu papkadagi faylni o‘qiganda yuklaydi, shuning uchun asosiy `CLAUDE.md` qisqa qoladi.

## Mentor tekshiruvi (2.5)

Ishtirokchi tekshirish savolini beradi, Claude `CLAUDE.md` dan to‘g‘ri javob beradi.
Faylda maxfiy ma’lumot yo‘qligiga ko‘z yugurting.
