# Test to‘plami (`test-set.toml`): qo‘llanma

Test to‘plami - javobi oldindan ma’lum bo‘lgan haqiqiy savollar.
Ular 4-to‘plam B.4 dagi 3 ta yaxshi va 3 ta yomon misoldan olinadi.
Yo‘riqnoma, ma’lumot yoki model o‘zgargan har safar ishga tushiriladi: bitta xato tuzalib, boshqasi buzilmaganini (regressiya) shu bilan bilasiz.

## Boshlashdan oldin kerak

- 3 ta yaxshi misol: savol va xodim yoki rahbar «to‘g‘ri» degan javob.
- 3 ta yomon misol: haqiqatda bo‘lgan xato javob (masalan, menejer 15% chegirma va’da qilgan).
- Xatolar jurnalidagi har bir xato ham keyinchalik testga aylanadi (5-dars).

## Har bir test qanday yoziladi

```toml
[[test]]
id = "ulgurji-optima-8"
savol = "Optima stolidan 8 ta kerak, qancha bo'ladi?"
kerak = ["15 120 000"]
mumkin_emas = ["17 200 000"]
odamga = false
manba = "yaxshi misol: ROP tekshirgan javob"
```

| Maydon | Ma’nosi |
|---|---|
| `id` | Qisqa nom, lotin harflari, takrorlanmasin |
| `savol` | Xodim yozadigan haqiqiy savol, uning so‘zlari bilan |
| `kerak` | Javobda albatta bo‘lishi kerak: raqam yoki so‘z. `1 450 000`, `1,450,000` va `1450000` bir xil hisoblanadi |
| `mumkin_emas` | Javobda bo‘lmasligi kerak: yomon misoldagi xato raqam yoki va’da |
| `odamga` | `true` - agent odamga uzatishi shart; `false` - o‘zi javob berishi shart; yozilmasa - ikkalasi ham bo‘ladi |
| `mezon` | Ixtiyoriy: oddiy so‘z bilan qoida; `--judge` bilan kuchliroq model tekshiradi |
| `manba` | Test qayerdan: yaxshi misol, yomon misol, xatolar jurnali va sana |

## Qanday ishga tushiriladi

Claude Code’ga yozing:

```text
Test to'plamining narxini taxmin qil, keyin "uv run pilot eval" ni ishga tushir.
O'tmagan testlar bo'lsa, sababini oddiy tilda tushuntir.
```

Bu pulli: har bir test bitta savol (taxminan $0.003-0.005).
8 ta test - taxminan $0.03-0.04 (350-500 so‘m).

Boshqa variantlar:
- `uv run pilot eval --only chegirma-15-foiz` - faqat bitta test.
- `uv run pilot eval --tier cheap` - arzon modelda (model tanlash uchun).
- `uv run pilot eval --judge` - `mezon` qatorlarini kuchli model tekshiradi (ikkinchi model - «tekshiruvchi agent»).

## To‘ldirilgan namuna: Baraka Office

`evals/test-set.toml` da 8 ta test bor: 4 ta yaxshi misol, 3 ta yomon misol va bitta xavfsizlik testi.
Aniq narx so‘raydigan 3 ta test (Optima, Start, ErgoPro) prays-listdagi xato raqamni ushlaydi: `pilot check` ishonchli ko‘ringan xatoni (masalan, 1 890 000 o‘rniga 1 980 000) sezmaydi, `pilot eval` esa sezadi.

| Test | Qayerdan | Nimani tekshiradi |
|---|---|---|
| `ulgurji-optima-8` | Yaxshi misol | 5+ dona - ulgurji narx: 1 890 000 x 8 = 15 120 000 |
| `chakana-start-2` | Yaxshi misol | 1-4 dona - chakana narx: 2 900 000 |
| `chakana-ergopro-3` | Yaxshi misol | Kreslo, 3 dona - chakana narx: 8 550 000 |
| `qoldiq-ergopro` | Yaxshi misol | 1C eksportidan qoldiq: 150 dona |
| `kafolat-kreslo` | Yomon misol: KP da «36 oy» deb yozilgan | Shartnoma bo‘yicha 12 oy; «36 oy» va «3 yil» bo‘lmasin |
| `chegirma-15-foiz` | Yomon misol: menejer 15% va’da qilgan | Odamga uzatishi shart |
| `yetkazish-3-kun` | Yomon misol: «3 kunda yetkazamiz» deyilgan | «7 ish kuni» bo‘lsin, «3 kunda yetkazib beramiz» bo‘lmasin |
| `tannarx-yashirin` | Xavfsizlik | Tannarx (1 520 000) javobda bo‘lmasin |

Kutilgan natija (soxta model bilan, to‘liq: `samples/pilot-eval.txt`):

```
OK   ulgurji-optima-8
OK   chakana-start-2
OK   chakana-ergopro-3
OK   kafolat-kreslo
OK   chegirma-15-foiz
OK   yetkazish-3-kun
OK   tannarx-yashirin
OK   qoldiq-ergopro

8 / 8 o‘tdi
```

Test o‘tmasa, qator shunday bo‘ladi:

```
FAIL chakana-start-2  -> javobda «2 900 000» yo‘q
```

Batafsil hisobot (savol, javob, sabab) `runtime/evals/` papkasiga yoziladi.

## Yomon namuna va tuzatilgan varianti

Yomon:

```toml
[[test]]
id = "test1"
savol = "narx?"
kerak = ["so'm"]
```

Nima xato:
- `savol` haqiqiy emas: xodim bunday yozmaydi, mahsulot va son yo‘q.
- `kerak = ["so'm"]` har qanday javobda bor: test hech narsani tekshirmaydi.
- `id` hech narsa aytmaydi: test yiqilsa, nima buzilganini bilmaysiz.
- Yomon misoldagi xato (`mumkin_emas`) yo‘q.

Tuzatilgan:

```toml
[[test]]
id = "chakana-start-2"
savol = "Start stoli 2 dona necha pul?"
kerak = ["2 900 000"]
mumkin_emas = ["2 560 000"]
odamga = false
manba = "yaxshi misol; yomon misolda menejer 2 dona uchun ulgurji narx aytgan"
```

## Xatolar jurnalidan yangi test (5-dars)

Har bir ❌ belgilangan javob - yangi test:
1. `/xatolar` dan savolni oling.
2. To‘g‘ri javobdagi raqamni `kerak` ga, xato javobdagi raqamni `mumkin_emas` ga yozing.
3. `manba = "xatolar jurnali, 2026-12-16"`.
4. Yo‘riqnomani tuzating, keyin `pilot eval`: yangi test ham, eskilari ham o‘tishi kerak.

Bajarildi, agar: Sizning 6 ta misolingiz testda, `pilot eval` hammasi o‘tdi deydi.
