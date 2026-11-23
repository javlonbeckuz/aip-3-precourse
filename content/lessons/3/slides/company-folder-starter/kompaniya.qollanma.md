# Kompaniya papkasi: qanday ishlatish

Praktikum 3.0 · 2-dars · bu qo‘llanma `2-dars-kompaniya-papkasi.zip` ichida ham bor.

## Bu nima

`kompaniya/` - kompaniyangiz uchun bitta papka.
Kurs davomida har bir To‘plam natijasi shu yerga `.md` fayl bo‘lib tushadi, Claude Code esa hammasini o‘qiydi.
6-darsga borib unda suhbatlar, baholash, agent yo‘riqnomasi, sinovdagi vositaning o‘zi va natija raqamlari bo‘ladi.

## Zip ichida nima bor

```
praktikum/                   uy papkangizda (0-haftada yaratilgan)
  kompaniya/                 sizning papkangiz
    CLAUDE.md                kompaniya qoidalari (andoza, izohlari bilan)
    hujjatlar/               rasmiy hujjatlaringiz: prays-list, shartnoma, ichki tartib
    kit1-interviews/         To‘plam 1: suhbatlar va B shakllari
    kit2-scoring/            To‘plam 2: baholash va matritsa
    kit3-agent/              To‘plam 3: jarayon qadamlari va agent yo‘riqnomasi (3-dars)
    kit4-people/             To‘plam 4: xodimlar va sinov to‘plami (4-dars)
    kit5-pilot/              To‘plam 5: boshlang‘ich raqamlar, reja, haftalik raqamlar
  skills/                    kurs skill’lari /kit1 ... /kit5 (8-mashqda o‘rnatiladi)
  baraka-office/kompaniya/   to‘ldirilgan namuna: «Baraka Office» MChJ, shartli misol
  yomon-namuna/              yomon CLAUDE.md va undagi 9 ta xato
  natijalar/                 Claude Code’ning haqiqiy javoblari (namoyishlardan)
  sahifalar/                 brauzerda ochiladi, internetsiz:
    promptlar.html           hamma promptlar, «Nusxa olish» tugmasi bilan
    mashqlar.html            8 ta mashq
    uy-vazifasi.html         uy vazifasi
    shpargalka.html          Claude Code shpargalkasi
    lugat.html               lug‘at
    kompaniya-qollanma.html  shu qo‘llanma
  prompt-pack.md             promptlar, Claude o‘qiy oladigan ko‘rinishda
  kompaniya.qollanma.md      shu qo‘llanma
```

`ism-` bilan boshlanadigan fayllar - bitta xodim uchun andoza: nusxalab, nomini xodim ismiga o‘zgartirasiz (`dilnoza-form-b.md`).
`/kit1` buni o‘zi qiladi.

## Boshlashdan oldin

- Claude Code o‘rnatilgan va Warp’da `claude` ochiladi (0-hafta).
- To‘plam 1 dagi B shakllaringiz `.md` fayl ko‘rinishida.
- Kompaniyangizning 2-4 ta rasmiy hujjati (prays-list, shartnoma namunasi, ichki tartib).
  Maxfiy hujjat (pasport, karta, parollar) qo‘ymang.

## Qadamlar

1. Zipni oching va ichidagilarni uy papkangizdagi `praktikum` papkasiga qo‘ying (0-haftada yaratgansiz).
   macOS: zipni ikki marta bosing, chiqqan `praktikum` papkasi ichidagi hamma narsani (Cmd+A) uy papkangizdagi `praktikum` ga torting.
   Windows: zipni o‘ng tugma bilan bosing, «Extract All» («Hammasini chiqarish»), joy: `C:\Users\<ismingiz>`.
   «Hujjatlar» (Documents) ga qo‘ymang: Windows’da u ko‘pincha OneDrive ichida bo‘ladi.
   Kurs papkasini tez ochish: Warp’da `cd ~/praktikum`, keyin `open .` (Windows: `explorer .`).
2. B shakllaringizni `kompaniya/kit1-interviews/` ga, hujjatlaringizni `kompaniya/hujjatlar/` ga torting.
3. Warp’da: `cd ~/praktikum/kompaniya` (macOS va Windows’da bir xil), keyin `claude`.
   Xato chiqsa: `cd ` deb yozing va `kompaniya` papkasini Finder yoki Explorer’dan Warp’ga torting.
4. `/init` deb yozing: Claude papkani o‘qib, `CLAUDE.md` andozasini to‘ldirishni taklif qiladi.
   Taklifni o‘qing va rozi bo‘ling.
5. Qolgan bo‘sh joylarni «Meni intervyu qil» prompti bilan to‘ldiring (`prompt-pack.md`, 6-prompt).
6. Tekshiring: «Faqat CLAUDE.md ga tayanib javob ber: biz nima sotamiz, asosiy mijozimiz kim va qaysi tizimlarda ishlaymiz?»
   To‘g‘ri javob - papka tayyor.

## CLAUDE.md da har bir bo‘lim nima uchun

| Bo‘lim | Nima yoziladi | Qayerdan olasiz |
|---|---|---|
| Kompaniya haqida | Nima sotasiz, kimga, nechta xodim, qaysi bo‘limlar, ish haftasi, o‘rtacha soatbay haq, tizimlar | O‘zingiz bilasiz; soatbay haq - buxgalterdan (oylik fondi / ish soatlari) |
| Rasmiy hujjatlar | Ziddiyat bo‘lsa, qaysi hujjat to‘g‘ri: narx, chegirma, muddat, kafolat | Tasdiqlangan prays-list, shartnoma namunasi |
| Hozirgi sinov jarayoni | To‘plam 2 dagi B.1, kim ishlatadi, bo‘lim boshlig‘i | 6-mashq, uy vazifasidan keyin aniqlanadi |
| Kim nimaga javob beradi | Masala, odam, Telegram | Ichki tartib yoki HR |
| Qoidalar | Kursning 6 ta qoidasi (o‘chirmang) va o‘zingiznikilar | - |
| Kitlar | O‘zgartirmang: skill’lar shu nomlarga tayanadi | - |

Kulrang izohlarni (izoh bloklari) Claude o‘qimaydi: ular siz uchun.
Rasmiy hujjat: code.claude.com/docs/en/memory, 2026-11-03 da tekshirildi.

## Kurs skill’larini o‘rnatish

8-mashqda, avval xavfsizlik tekshiruvidan keyin (`prompt-pack.md`, 20 va 21-promptlar):

```text
../skills ichidagi kit1, kit2, kit3, kit4, kit5 papkalarini shu papkadagi .claude/skills/ ichiga nusxala.
Bor faylning ustiga yozma.
Oxirida .claude/skills ichida nima borligini ko‘rsat.
```

Claude `.claude` papkasiga yozish uchun ruxsat so‘raydi: «Yes».
Keyin `/` deb yozing: `kit1` ... `kit5` ro‘yxatda bo‘lishi kerak.
Ko‘rinmasa: `/exit`, keyin yana `claude`.

Qo‘lda (macOS, terminalda, `~/praktikum` ichida): `mkdir -p kompaniya/.claude/skills && cp -R skills/kit* kompaniya/.claude/skills/`.

## Namunalar

- To‘ldirilgan papka: `baraka-office/kompaniya/` («Baraka Office» MChJ, shartli misol; undagi sanalar yakshanba guruhi bo‘yicha, shanba guruhi bir kun oldin): `CLAUDE.md` (izohlari bilan), uchta B shakli, To‘plam 2 natijasi va matritsa, `prd.md`, `tasks.md`, uy vazifasi `kit5-pilot/baseline.md`, o‘z skill’i `.claude/skills/suhbat-tahlili/`.
- Yomon `CLAUDE.md` va undagi 9 ta xato: `yomon-namuna/nima-xato.md`.

## Ko‘p uchraydigan xatolar

| Xato | Nima qilish kerak |
|---|---|
| Papka «Yuklanmalar» (Downloads) da qoldi | Tartiblashda yo‘qolib ketadi: uy papkangizdagi `praktikum` ga ko‘chiring |
| Claude boshqa papkada ochildi | Warp tepasidagi yo‘lga qarang: `kompaniya` bilan tugashi kerak |
| `CLAUDE.md` ga parol yoki token yozildi | Darhol o‘chiring va parolni almashtiring; kalitlar faqat `.env` da |
| Prays-list `CLAUDE.md` ichiga ko‘chirildi | `hujjatlar/` ga qo‘ying, `CLAUDE.md` da faqat nomi |
| Kitlar bo‘limi o‘chirildi | Andozadan qayta ko‘chiring: skill’lar fayllarni topa olmaydi |

## Tayyor bo‘lsa

- [ ] `kompaniya/` uy papkangizdagi `praktikum` ichida, B shakllari va hujjatlar joyida.
- [ ] `CLAUDE.md` to‘ldirilgan, parolsiz, 200 qatordan qisqa.
- [ ] Claude tekshirish savoliga to‘g‘ri javob beradi.
- [ ] 8-mashqdan keyin `/kit1` ... `/kit5` menyuda.
