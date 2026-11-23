# 8-mashq. Birinchi skill va kurs skill’larini xavfsiz o‘rnatish

2-dars · 2:38-2:50 · 12 daqiqa · Claude Code

## Maqsad

Takror ishlatadigan promptingizni skill qilib saqlaysiz: keyin uni bitta buyruq bilan chaqirasiz, `/suhbat-tahlili`.
Keyin kursning tayyor skill’larini (`/kit1` ... `/kit5`) o‘rnatasiz, lekin avval ularni Claude’ga tekshirtirasiz.

## Atamalar, oddiy so‘zlar bilan

- **Skill** - saqlangan, qayta ishlatiladigan yo‘riqnoma fayli.
  Restorandagi texnologik karta kabi: oshpaz har safar taomni bir xil tayyorlaydi.
  Fayl joyi: `kompaniya/.claude/skills/<nomi>/SKILL.md`.
- **Frontmatter** - `SKILL.md` ning eng tepasi, ikkita uch chiziqcha (`---`) orasida.
  Unda nom va «qachon ishlatiladi» yoziladi: Claude shunga qarab skill’ni o‘zi ham chaqira oladi.
- `.claude` papkasi yashirin: Finder va Explorer uni ko‘rsatmaydi.
  Shuning uchun faylni Claude’ning o‘zi yozadi.

## Qadamlar

### A. O‘z skill’ingiz (6 daqiqa)

1. Kompaniya papkasidagi Claude Code’da quyidagi 1-promptni yuboring.
   Oxiriga 1-darsdagi To‘plam 1 promptini joylang: u `KIT_01` qo‘llanmasining «AI chat uchun so‘rov» bo‘limida va `prompt-pack.md` da bor.
2. Claude `.claude/skills/...` ga yozish uchun ruxsat so‘raydi.
   Bu doim so‘raladi: `.claude` papkasi Claude Code’ning sozlamalari saqlanadigan joy.
   «Yes» ni tanlang.
3. `/` deb yozing va ro‘yxatdan `suhbat-tahlili` ni toping.
   Ko‘rinmasa, `/exit` qiling va `claude` ni qayta oching.
4. Sinab ko‘ring: `/suhbat-tahlili kit1-interviews/[bir xodimning transkripti].md`.
   Transkriptingiz yo‘q bo‘lsa, Otabek aka transkriptini o‘z papkangizga nusxalang va u bilan sinang: `baraka-office/kompaniya/kit1-interviews/otabek-transcript.md` (instruktor 7-namoyishda ko‘rsatgan).

### B. Kurs skill’larini tekshirib o‘rnatish (4 daqiqa)

1. 2-prompt bilan Claude’ga kurs skill’larini o‘qiting.
   Javobni o‘qing: fayllarni o‘chiradimi, internetga chiqadimi, parol so‘raydimi?
2. Hammasi tushunarli bo‘lsa, 3-prompt bilan o‘rnating va ruxsatni «Yes» bilan bering.
3. `/` deb yozing: `kit1` ... `kit5` ko‘rinishi kerak (2 daqiqa).

## 1-prompt: promptni skill qilish

```text
Quyidagi promptni Claude Code skill qilib saqla.
Joyi: .claude/skills/suhbat-tahlili/SKILL.md.
Tepasida frontmatter bo‘lsin: name: suhbat-tahlili, description: o‘zbekcha, bir-ikki gap, qachon ishlatilishini aytsin (xodim suhbati transkripti berilganda), argument-hint: [transkript fayli].
Skill argument sifatida transkript faylini olsin va natijani kit1-interviews/<ism>-form-b.md ga yozishdan oldin mendan so‘rasin.
Promptning matnini o‘zgartirma, faqat «Quyida ... transkripti berilgan» joyini «$ARGUMENTS faylini o‘qi» ga almashtir.
Prompt:
[1-darsdagi To‘plam 1 promptini shu yerga joylang]
```

## 2-prompt: o‘rnatishdan oldin xavfsizlik tekshiruvi

```text
../skills papkasidagi kit1, kit2, kit3, kit4, kit5 skill’larini o‘qi, hali o‘rnatma.
Har biri uchun jadval qil: qaysi fayllarni o‘qiydi va yozadi, buyruq (Bash) ishga tushiradimi, internetga chiqadimi, kalit yoki parol so‘raydimi, faylni o‘chiradimi.
Shubhali joy bo‘lsa, qatorini ko‘rsat.
```

## 3-prompt: o‘rnatish

```text
../skills ichidagi kit1, kit2, kit3, kit4, kit5 papkalarini shu papkadagi .claude/skills/ ichiga nusxala.
Bor faylning ustiga yozma.
Oxirida .claude/skills ichida nima borligini ko‘rsat.
```

## «Baraka Office» namunasi

O‘z skill’i (zip ichida): `baraka-office/kompaniya/.claude/skills/suhbat-tahlili/SKILL.md`.
`.claude` yashirin papka: macOS Finder’da Cmd+Shift+. (nuqta) bilan, Windows Explorer’da «View → Show → Hidden items» («Ko‘rinish → Ko‘rsatish → Yashirin elementlar») bilan ko‘rinadi.
Uni ochib ko‘ring: tepada frontmatter, keyin 1-darsdagi prompt so‘zma-so‘z, faqat birinchi gapda fayl nomi o‘rniga `$ARGUMENTS`.

Sinov: `/suhbat-tahlili kit1-interviews/otabek-transcript.md`.
To‘liq natija: `natijalar/suhbat-tahlili-otabek.md` (haqiqiy Claude Code natijasi, 2026-11-03).
Skill ikki tuzoqni ushladi:

- «bir uch yuz ming so‘m kam oldik» - taxminan 300 000 so‘m, 1 300 000 emas.
- «Kuniga 1520 ta savol» - 1 520 bo‘lishi mumkin emas, ehtimol «15-20»; [?] bilan qoldirdi va Otabek akadan so‘rashni taklif qildi.

Kurs skill’larini tekshirish (2-prompt) natijasi, qisqacha: beshtasi ham faqat kompaniya papkasidagi `.md` (va `/kit2` da bitta `.html`) fayllarni o‘qiydi va yozadi.
Oldindan ruxsat faqat fayl o‘qish va yozishga berilgan (`allowed-tools: Read Write Edit Glob Grep`); buyruq (Bash) ruxsati yo‘q, matnida internet, parol yoki o‘chirish yo‘q.
Mavjud faylning ustidan yozishdan oldin so‘raydi.
Eslatma: `allowed-tools` taqiq emas, oldindan berilgan ruxsat; boshqa ish kerak bo‘lsa, Claude baribir sizdan so‘raydi.

## Yomon namuna: tekshirmasdan o‘rnatish

2.0 kursida bir ishtirokchi, 1C administratori, internetdan tekshirilmagan vosita o‘rnatdi.
U administrator hisobini o‘chirib, yangisini yaratmoqchi bo‘ldi.
Rasmiy hujjatda ham yozilgan: o‘rnatilgan plagin kompyuteringizda siz nomingizdan istalgan buyruqni bajara oladi (code.claude.com/docs/en/plugins/security, 2026-11-03 da tekshirildi).
Qoida: begona skill yoki plaginni o‘rnatishdan oldin Claude’ga o‘qiting va jadvalni o‘zingiz ko‘ring.
Kursning o‘z skill’lari ham bundan mustasno emas.

## Tayyor bo‘lsa

- [ ] `/` menyusida `suhbat-tahlili` bor va bitta transkript bilan ishladi.
- [ ] Kurs skill’lari tekshirildi (2-prompt jadvali bor).
- [ ] `/` menyusida `kit1` ... `kit5` bor.

## Ko‘p uchraydigan xatolar

| Nima bo‘ldi | Nima qilish kerak |
|---|---|
| Claude «ruxsat berilmadi» deydi va fayl yozilmadi | Ruxsat so‘raganda «No» bosilgan. Promptni qayta yuboring va «Yes» ni tanlang. |
| Skill menyuda yo‘q | `/exit`, keyin `claude`. Papka nomi to‘g‘rimi: `.claude/skills/suhbat-tahlili/SKILL.md` (katta harflar bilan `SKILL.md`). |
| `../skills` topilmadi | `kompaniya` va `skills` bitta `praktikum` papkasi ichida emas. Zip ichidagilarni uy papkangizdagi `praktikum` ga ko‘chiring (2-mashq, 2-qadam). |
| Skill ishladi, lekin natija boshqa shaklda | Skill = siz yozgan prompt. Promptni aniqroq qiling yoki kursning `/kit1` ini ishlating. |

## Mentor tekshiruvi (2.9)

Ishtirokchi `/` menyusida o‘z skill’ini va `kit1` ni ko‘rsatadi.
Uyga vazifa uchun `/kit5` ishlashi shart: `/kit5` yozilganda Claude «baseline» rejimini taklif qiladi.
