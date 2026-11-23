# Jadval bo‘yicha ishlar (`schedule.toml`): qo‘llanma (5-dars)

Ko‘p foyda chatdan emas, jadvaldan keladi: «har kuni soat 9:00 da menga ... ni yubor».
`agent/schedule.toml` dagi har bir ish - belgilangan vaqtda agentga beriladigan savol.
Agent xodimlarga javob bergandagi kabi ma’lumotlar (`data/`) va yo‘riqnoma bilan javob tayyorlaydi va natijani Sizga yuboradi.
Bu kunlik hisobotdan (bot qancha savolga javob bergani) alohida: bu - biznes raqamlari haqida.

## Boshlashdan oldin kerak

- Ish kerakli ma’lumot `agent/sources.toml` da ulangan bo‘lsin (masalan, 1C qoldig‘i).
- Natija kimga borishini biling: Sizgami (standart) yoki xodimgami (`send_to`, faqat ish vaqtida).

## Qanday to‘ldiriladi

```toml
[[job]]
name = "Kam qolgan mahsulotlar"
time = "08:30"
days = "1-6"
sources = ["Ombor qoldig‘i (1C eksport)"]
prompt = """
Ombor qoldig'i (1C) jadvalidan tayyor mahsulot soni (Количество) 15 donadan kam
bo'lgan mahsulotlarni ro'yxat qil: kod, nomi, soni. Eng kami birinchi.
Bunday mahsulot bo'lmasa, "Hammasi yetarli" deb yoz.
Ombor fayli bo'sh yoki eski bo'lsa, ODAMGA qatori bilan javob ber.
"""
```

| Maydon | Ma’nosi |
|---|---|
| `name` | Ish nomi: xabar sarlavhasida chiqadi, takrorlanmasin |
| `time` | Soat: `08:30` |
| `days` | Hafta kunlari: 1 = dushanba ... 7 = yakshanba; `1-6` = dushanbadan shanbagacha |
| `prompt` | Agentga topshiriq: nimani, qaysi manbadan, qanday shaklda; ma’lumot bo‘lmasa nima qilsin |
| `send_to` | Ixtiyoriy: boshqa odamning ID raqami (bo‘lmasa - Siz) |
| `sources` | Ixtiyoriy, lekin tavsiya: ish tayanadigan manba nomlari (`sources.toml` dagi `name`); manba o‘chirilsa, `pilot check` xato beradi |

Claude Code’ga yozing:

```text
Har kuni 9:00 da menga kechagi savdo jadvalidan jami summa va eng ko'p sotilgan 3 ta mahsulotni
yuboradigan ish qo'sh (agent/schedule.toml). Avval qaysi manbadan olishini ayt.
Keyin "uv run pilot job <nom>" bilan sinab ko'r va narxini ayt.
```

Kutmasdan sinash: `uv run pilot job "Kam qolgan mahsulotlar" --send`.
Serverga joylagandan keyin ish o‘z vaqtida o‘zi ishlaydi.
Bot o‘sha paytda o‘chiq bo‘lsa, qayta ishga tushganda bajaradi (kuniga bir martadan ko‘p emas).

## To‘ldirilgan namuna: Baraka Office

Yuqoridagi ish har kuni soat 8:30 da (9:00 dagi hisobotdan oldin) ombor muammolarini ko‘rsatadi.
Natija (namuna 1C eksporti bo‘yicha):

```
⏰ Kam qolgan mahsulotlar

Tayyor mahsulot 15 donadan kam:
- CF-401 Стол переговоров Dialog-8 280x120: 2 dona
- CH-203 Кресло руководителя Senator Lux черное: 11 dona
- WS-102 Стол Optima 140x70 (ЛДСП 25мм, П-каркас): 12 dona
- CH-201 Кресло Staff Mesh (сетка, газлифт кл.3): 14 dona
```

Nega shunday yozilgan:
- 15 dona chegarasi namuna uchun olingan: o‘z chegarangizni ishlab chiqarish yoki yetkazish muddatiga qarab tanlang.
- «Eng kami birinchi»: rahbar ro‘yxatning tepasiga qaraydi.
- Bo‘sh holat uchun aniq javob («Hammasi yetarli»): xabar kelmasa, ish buzildimi yoki hammasi joyidami, bilib bo‘lmaydi.
- Fayl bo‘sh bo‘lsa, «ODAMGA»: agent nol deb yozmaydi, Sizga «javob tayyorlab bo‘lmadi» xabari keladi.

## Yomon namuna va tuzatilgani

```toml
[[job]]
name = "Hisobot"
time = "9"
prompt = "Menga kerakli narsalarni yubor"
```

Nima xato:
- `time = "9"` - noto‘g‘ri format; bot ishga tushmaydi va `09:00 ko‘rinishida bo‘lsin` deydi.
- «Kerakli narsalar» - agent nimani tanlashni bilmaydi, har kuni har xil narsa yuboradi.
- Manba, shakl va bo‘sh holat aytilmagan.

Tuzatilgani: yuqoridagi Baraka namunasi - bitta savol, bitta manba, aniq shakl, bo‘sh holat va xato holati yozilgan.

## Bilib qo‘ying

- Har bir ish bitta pulli savol (taxminan $0.003-0.005); kuniga bitta ish oyiga taxminan $0.15.
- Ishlar xarajati kunlik va oylik limitga kiradi va haftalik fayldagi model xarajatida ko‘rinadi.
- Xodimga yuboriladigan ishlar (`send_to`) faqat ish vaqtida boradi.
- Ish xodimlarni kuzatish uchun emas: «kim kech qoldi», «kim kam sotdi» kabi ishlarni qo‘shmang.

Bajarildi, agar: `pilot job ... --send` bilan birinchi xabar Sizga keldi va ertasi kuni ish o‘z vaqtida o‘zi keldi.
