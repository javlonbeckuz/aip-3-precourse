# 1-mashq. Birinchi topshiriq: Downloads papkasini tartibga keltirish

2-dars · 0:53-0:59 · 6 daqiqa · Claude Code

## Maqsad

Claude Code’ga oddiy o‘zbek tilida bitta haqiqiy ish topshirasiz va u kompyuteringizda o‘zi bajaradi.
Kod yozilmaydi.
Hech bir fayl o‘chirilmaydi.

## Boshlashdan oldin

- Warp va Claude Code o‘rnatilgan (0-hafta).
  Tekshirish: Warp’da `claude --version` versiya raqamini chiqaradi.
- Downloads (Yuklanmalar) papkangizda kamida 10 ta fayl bor.
  Juda shaxsiy fayllar bo‘lsa (pasport, bank ko‘chirmasi), boshqa papkani tanlang: masalan, Desktop yoki «Hujjatlar» ichidagi biror papka.

## Qadamlar

1. Warp’ni oching.
2. Downloads papkasiga o‘ting:
   - macOS: `cd ~/Downloads`
   - Windows: `cd $HOME\Downloads`
3. `claude` deb yozing va Enter bosing.
   Birinchi marta «Do you trust the files in this folder?» deb so‘rasa, «Yes» ni tanlang.
4. Quyidagi promptni nusxalab, Claude Code’ga joylang va Enter bosing.
5. Claude rejani jadval qilib ko‘rsatadi.
   O‘qing.
   Rozi bo‘lsangiz, «ha» deb yozing.
6. Fayllarni ko‘chirish uchun ruxsat so‘rasa, «Yes» ni tanlang.
7. Finder (Windows’da Explorer) da Downloads’ni oching va natijani ko‘ring.

## Prompt

```text
Bu papkadagi fayllarni ko‘rib chiq.
Ularni turiga qarab papkalarga ajratish rejasini tuz: Hujjatlar, Rasmlar, Jadvallar, Arxivlar, O‘rnatish fayllari, Boshqalar.
Avval rejani jadval qilib ko‘rsat: qaysi papkaga nechta fayl ketadi.
Men «ha» desam, ko‘chir.
Hech bir faylni o‘chirma va nomini o‘zgartirma.
Har bir ko‘chirishni tartib-jurnal.md fayliga yoz: qaysi fayl, qayerdan, qayerga.
Oxirida nechta fayl qayerga ketganini qisqa ayt.
```

## Qaytarish (undo)

Fayllarni ko‘chirish buyruq bilan bajariladi.
Bunday o‘zgarishni `/rewind` qaytarmaydi (rasmiy hujjat: code.claude.com/docs/en/checkpointing, 2026-11-03 da tekshirildi).
Shuning uchun promptda jurnal so‘radik.
Qaytarish kerak bo‘lsa, yozing:

```text
tartib-jurnal.md bo‘yicha hamma fayllarni joyiga qaytar. Avval nima qilishingni ko‘rsat.
```

## «Baraka Office» namunasi

Instruktor 2-namoyishda shu ishni Desktop papkasida ko‘rsatadi.
U yerda 40 ta aralash fayl bor edi: prays-list PDF, KP Word, 3D chizma rasmlari, Excel hisobotlar, Telegram’dan tushgan videolar.
Claude rejasi:

| Papka | Fayllar soni | Misol |
|---|---|---|
| Hujjatlar | 12 | `KP_Paynet_Tech_v3.docx`, `shartnoma-namuna.pdf` |
| Rasmlar | 11 | `3D_ofis_Chilonzor.png`, `IMG_4471.jpg` |
| Jadvallar | 9 | `savdo-oktabr.xlsx`, `ombor-qoldiq.csv` |
| Arxivlar | 3 | `katalog-2025.zip` |
| O‘rnatish fayllari | 2 | `AmoCRM-setup.dmg` |
| Boshqalar | 3 | `ovozli-xabar.ogg` |

Jami 40 ta fayl, 0 ta o‘chirilgan, jurnalda 40 qator.

## Tayyor bo‘lsa

- [ ] Fayllar papkalarga ajratilgan.
- [ ] Hech narsa o‘chirilmagan: fayllar soni avvalgidek.
- [ ] `tartib-jurnal.md` bor va ochiladi.

## Ko‘p uchraydigan xatolar

| Nima bo‘ldi | Nima qilish kerak |
|---|---|
| `claude: command not found` | Claude Code o‘rnatilmagan yoki Warp qayta ochilmagan. Warp’ni yopib, qayta oching. Bo‘lmasa, xatoni skrinshot qilib mentorga ko‘rsating. |
| Claude rejani ko‘rsatmay, darhol ko‘chira boshladi | Esc bosing (to‘xtaydi, sessiya yopilmaydi). Keyin yozing: «Avval rejani ko‘rsat». |
| Juda ko‘p fayl (1 000 dan ortiq) | Bu mashq uchun kichikroq papka tanlang. |
| Claude inglizcha javob beryapti | «O‘zbek tilida javob ber» deb yozing. 3-mashqdan keyin bu doimiy bo‘ladi. |

## Mentor tekshiruvi

Fayllar ajratilgan, `tartib-jurnal.md` bor, ishtirokchi «hech narsa o‘chirilmadi»ni o‘zi tekshirgan.
Vaqt yetmasa, bu mashq uyga vazifa bo‘ladi.
