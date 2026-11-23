# 3-mashq: Test to‘plamini qayta ishga tushirish va serverga joylash

5-dars, 1:15-1:40 (2-mashq bilan birga).
Natija: har bir xatodan bitta yangi test, hamma testlar o‘tadi (eskilari ham), tuzatilgan agent serverda.

Test to‘plami (evals) - javobi oldindan ma’lum haqiqiy savollar.
Har bir o‘zgarishdan keyin hammasi qayta ishga tushiriladi: tuzatish boshqa joyni buzmaganini shunday bilasiz.
3-darsda yig‘gan 3 ta yaxshi va 3 ta yomon misolingiz (To‘plam 4, B.4) - shu to‘plamning boshi.

## Kerak bo‘ladi

- `app/evals/test-set.toml` (3-darsdan beri bor) va `kit4-people/test-set.md`.
- 1-mashq jadvali va 2-mashqdagi tuzatishlar.
- `data/` dagi eksport fayllari; `max_age_hours` hali qo‘yilmagan bo‘lsin (2-mashq, «Tartib muhim»).
- Narx: bitta to‘liq ishga tushirish taxminan $0.03-0.05 (12 test), `--judge` bilan biroz ko‘proq.

## Qanday bajariladi

1. **Avval test, keyin tuzatish.**
   Har bir agent xatosidan bitta `[[test]]` yozing: o‘sha savol, to‘g‘ri javobdagi raqam (`kerak`), xato javobdagi raqam (`mumkin_emas`).
   `manba` ga xatolar jurnalidagi sanani yozing.
2. **Testlarni ishga tushiring:** `uv run pilot eval`.
   Yangi testlar yiqilishi kerak (qizil): demak, test xatoni ushlaydi.
3. **Tuzatishni kiriting** (2-mashq) va yana `uv run pilot eval`.
4. **Hamma testlarni o‘qing, faqat yangilarini emas.**
   Oldin o‘tgan test endi yiqilsa, bu regressiya: tuzatishni qaytaring va aniqroq qiling.
5. **Hammasi o‘tganda** (yashil) serverga joylang: `uv run python deploy/deploy.py`.
   `deploy.py` avval testlarni (`pytest`) va `pilot check` ni o‘zi ishga tushiradi; biror narsa yiqilsa, joylamaydi.
6. **Yozib qo‘ying:** `kit4-people/test-set.md` ga yangi misollar (3-darsdagi T1-T8 dan keyin: T9, T10 ...) va «Sinov natijalari» jadvaliga natija.

### Test qanday yoziladi

```toml
[[test]]
id = "ulgurji-5-dona"
savol = "Optima stolidan 5 ta kerak, narxi?"
kerak = ["9 450 000"]          # to‘g‘ri javobda albatta bo‘ladigan raqam
mumkin_emas = ["10 750 000"]   # xato javobdagi raqam: qaytib kelmasin
odamga = false                 # o‘zi javob berishi shart (true: odamga uzatishi shart)
manba = "xatolar jurnali, 2026-12-15"
```

Raqamlarni istalgan ko‘rinishda yozish mumkin: `9 450 000` = `9450000`.
Javob shaklini tekshirish uchun `mezon` qatori bor; uni ikkinchi, kuchliroq model tekshiradi: `uv run pilot eval --judge`.
Batafsil: `app/evals/test-set.qollanma.md`.

### Claude Code uchun topshiriq

```text
1-mashq jadvalidagi har bir agent xatosi uchun evals/test-set.toml ga bitta [[test]] qo'sh:
savol - o'sha savol, kerak - to'g'ri javobdagi raqam, mumkin_emas - xato javobdagi raqam,
manba - "xatolar jurnali, <sana>". Xato bo'lmagan qatorlarga test qo'shma.
Keyin narxini aytib, mendan ruxsat so'ra va "uv run pilot eval --judge" ni ishga tushir.
Natijani jadval qil: test, oldin o'tganmi, hozir o'tdimi. Oldin o'tib, hozir yiqilgan test bo'lsa, birinchi qatorda ayt.
Hammasi o'tsa, kit4-people/test-set.md ga T9 dan boshlab shu misollarni va natijani yoz.
```

Serverga joylash uchun:

```text
Hamma testlar o'tdi. "uv run python deploy/deploy.py" bilan serverga joyla,
keyin "deploy.py status" ni ko'rsat va oxirgi 10 log qatorini oddiy tilda tushuntir.
```

## Baraka Office namunasi

To‘rtta ishga tushirish, sinfda yakshanba 20-dekabr, 11:05-11:26 (`namuna/yaxshilash/eval-*.txt`).
Baraka sanalari yakshanba guruhiniki (5-dars 20-dekabr); shanba guruhida hammasi bir kun oldin (19-dekabr).
To‘plamda 12 ta test: 3-darsdagi 8 ta va 1-hafta xatolaridan 4 ta yangi.

| # | Nima qilindi | Natija | Yiqilgan testlar |
|---|---|---|---|
| 1 | 4 ta yangi test qo‘shildi, hali tuzatish yo‘q | 7 / 12 | 4 ta yangi test va **kafolat-kreslo** (3-darsdan beri bor edi) |
| 2 | KP manbadan olib tashlandi, `memory.md` ga bitta qator | 9 / 12 | ulgurji-5-dona, ulgurji-6-dona, chegirma-18-mln |
| 3 | B.4 ga keng qoida: «har doim ulgurji narx» | 9 / 12 | **chakana-start-2**, **chakana-ergopro-3** (ikkalasi oldin o‘tardi), chegirma-18-mln |
| 4 | B.4 aniq qoida + `examples.md` ga 2 ta namuna | 12 / 12 | - |

Birinchi ishga tushirishdan parcha (`eval-1-oldin.txt`):

```text
FAIL kafolat-kreslo  -> javobda «12 oy» yo‘q; javobda bo‘lmasligi kerak bo‘lgan «3 yil» bor
...
FAIL ulgurji-5-dona  -> javobda «9 450 000» yo‘q; javobda bo‘lmasligi kerak bo‘lgan «10 750 000» bor
FAIL ulgurji-6-dona  -> javobda «7 680 000» yo‘q; javobda bo‘lmasligi kerak bo‘lgan «8 700 000» bor
FAIL chegirma-18-mln  -> javobda «20 000 000» yo‘q; javobda bo‘lmasligi kerak bo‘lgan «5% gacha bera olasiz» bor
FAIL yetkazish-chirchiq  -> javobda «8 000» yo‘q; javobda bo‘lmasligi kerak bo‘lgan «bepul» bor

7 / 12 o‘tdi
```

`kafolat-kreslo` 3-darsdan beri test to‘plamida bor edi.
4-darsda KP manbaga qo‘shilgandan keyin testlar ishga tushirilmagan: tushirilganda, 17.12 dagi xato mijozga yetmasdan ushlanardi.
Saboq: har qanday o‘zgarishdan keyin, hatto yangi manba qo‘shilgandan keyin ham, hamma testlar.

Uchinchi ishga tushirish - regressiya (`eval-3-regressiya.txt`):

```text
FAIL chakana-start-2  -> javobda «2 900 000» yo‘q
FAIL chakana-ergopro-3  -> javobda «8 550 000» yo‘q; javobda bo‘lmasligi kerak bo‘lgan «7 500 000» bor

9 / 12 o‘tdi
```

Natija 2-ishga tushirishdagi bilan bir xil (9 / 12), lekin yiqilgan testlar boshqa.
Keng qoida 5 va 6 donani tuzatdi, lekin 2 va 3 donali oddiy savollarni buzdi.
Faqat jami raqamga qarasangiz, regressiyani ko‘rmaysiz: har bir yiqilgan testning nomini o‘qing.

Xarajat: har bir ishga tushirish taxminan $0.058 (`--judge` bilan), to‘rttasi birga 25 sentdan kam.

`kit4-people/test-set.md` ga qo‘shilgani:

| ID | Baho | Qisqacha | Manba |
|---|---|---|---|
| T9 | yomon | `ulgurji-5-dona`: 5 dona chakana narxda hisoblangan | xatolar jurnali, 15.12 |
| T10 | yomon | `ulgurji-6-dona`: 6 dona chakana narxda hisoblangan | xatolar jurnali, 15.12 |
| T11 | yomon | `chegirma-18-mln`: 18 mln buyurtmaga «chegirma bor» deyilgan | xatolar jurnali, 16.12 |
| T12 | yomon | `yetkazish-chirchiq`: «Chirchiqqa yetkazish bepul» (KP dan) | xatolar jurnali, 17.12 |

T1-T8 - 3-darsdagi 8 ta test (T7 `kafolat-kreslo`, T8 `tannarx-yashirin`); sinf oxirida 12 tadan 12 tasi o‘tadi.
2-haftada yana ikkitasi qo‘shiladi (T13 «Staf mesh», T14 3D chizma): sinov oxirida 14 ta test.

Eslatma: bu raqamlar soxta model bilan olingan (internetsiz mashq uchun, `_build/sim/brain.py`).
Haqiqiy modelda yiqiladigan testlar boshqacha bo‘lishi mumkin; usul bir xil.

## Yomon namuna: hech narsani tekshirmaydigan test

```toml
[[test]]
id = "optima-narx"
savol = "Optima stolidan 8 ta kerak, qancha bo'ladi?"
kerak = ["so‘m"]
```

**Nimasi yomon:**

- Har qanday narx so‘z bilan tugaydi: chakana narx ham (17 200 000 so‘m), noto‘g‘ri mahsulot ham bu testdan o‘tadi.
- `mumkin_emas` yo‘q: oldingi xato qaytib kelsa, test sezmaydi.
- `manba` yo‘q: 6-darsda bu test nima uchun borligini hech kim eslay olmaydi.

Ikkinchi yomon namuna: testga agentning o‘z javobini «to‘g‘ri» deb ko‘chirish.
Agent xato qilgan bo‘lsa, test endi xatoni himoya qiladi.
To‘g‘ri javobni har doim odam (ROP, buxgalter) tasdiqlaydi.

**To‘g‘rilangan:**

```toml
[[test]]
id = "ulgurji-optima-8"
savol = "Optima stolidan 8 ta kerak, qancha bo'ladi?"
kerak = ["15 120 000"]
mumkin_emas = ["17 200 000"]
odamga = false
manba = "yaxshi misol: ROP tekshirgan javob"
```

## Tez-tez uchraydigan xatolar

- **Faqat yangi testga qarash.**
  Asosiy savol: oldin o‘tgan test hozir ham o‘tadimi?
- **Qoldiq testi «odamga uzatdi» deb yiqildi.**
  `max_age_hours` allaqachon qo‘yilgan va 1C fayli eski (noutbukdagi nusxa eski yoki yakshanba kuni eksport yo‘q): bu regressiya emas, to‘g‘ri xatti-harakat.
  `max_age_hours` qatorini vaqtincha izohga oling (`#`), testlarni yashil qiling, keyin qaytaring va `pilot check` bilan tekshiring.
- **«Model har safar boshqacha javob beradi».**
  Bir test goh o‘tib, goh yiqilsa, ikki-uch marta ishga tushiring; yo‘riqnomada qoida yetarlicha aniq emas.
- **Testlar o‘tdi, lekin serverga joylanmadi.**
  Xodimlar hali eski agent bilan ishlayapti.
  `deploy.py status` da yangi versiya sanasini tekshiring.

## Tayyor, agar

- [ ] Har bir agent xatosi uchun bitta test, `manba` bilan.
- [ ] `uv run pilot eval`: hammasi o‘tdi, eski testlar ham.
- [ ] Serverga joylandi, `deploy.py status` - «active (running)».
- [ ] `kit4-people/test-set.md` da T9 ... yangi misollar va natija.
- [ ] Mentor «hamma testlar o‘tdi» ekranini ko‘rdi (tekshiruv 5.6).
