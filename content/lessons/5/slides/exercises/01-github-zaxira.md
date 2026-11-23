# 1-mashq. GitHub: kodning zaxira nusxasi (0:50-1:05, 15 daqiqa)

**Natija:** assistentingiz kodi GitHub’dagi **yopiq (private)** repoda turadi, ichida bitta ham kalit yo‘q.
Noutbuk yo‘qolsa yoki o‘zgarish hammasini buzsa, ishlagan versiya joyida qoladi.

## Bu nima va nega kerak

- **Git** - kodingizning «saqlash nuqtalari».
  Har bir saqlash nuqtasi (**commit**) - shu daqiqadagi barcha fayllarning surati.
  Xato qilsangiz, oxirgi yaxshi suratga qaytasiz.
- **GitHub** - shu suratlarni internetda saqlaydigan joy, dasturchilarning «YouTube»i.
  Suratlarni GitHub’ga yuborish - **push**.
- **Yopiq repo (private)** - kodni faqat Siz ko‘rasiz.
  Ochiq repodagi kalitni begonalar bir necha daqiqada topib ishlatadi: 2.0 da buni «Robin Gud» hikoyasida ko‘rgansiz.

GitHub’ga **faqat `app/` papkasi** boradi.
`kompaniya/` ning qolgan papkalarida (`kit1-interviews/`, `kit4-people/`) xodimlaringiz suhbatlari va ma’lumotlari bor.
Mehnat kodeksining 178-moddasi: xodim ma’lumotini uning yozma roziligisiz uchinchi shaxsga berib bo‘lmaydi, GitHub esa uchinchi shaxs.

## Boshlashdan oldin kerak

| Nima | Qayerdan | Tekshirish |
|---|---|---|
| GitHub akkaunti va `gh` dasturi | 4-dars oldidan xabar (`00-dars-oldidan.md`, 2-qadam) | Warp’da `gh auth status` «Logged in» deydi |
| Ishlayotgan assistent noutbukda | 3-dars | `kompaniya/app/` da `uv run pilot check` «Tayyor.» deydi |

`gh` hali yo‘q bo‘lsa: `00-dars-oldidan.md` dagi 2-matnni hozir yuboring (10 daqiqa).
Bu mashq deploy’ni to‘xtatmaydi: GitHub ishlamay qolsa ham, 2-mashqni boshlayverasiz, GitHub’ni kechqurun mentor bilan tugatasiz.

## Qadamlar

Warp’da `kompaniya/app` papkasini oching, `claude` deb yozing va yuboring:

```text
app papkasini GitHub'dagi yopiq (private) repoga zaxiralaymiz. Har qadamdan oldin nima qilishingni bir gapda ayt.
1. Faqat shu app papkasida ishla. Yuqoridagi kompaniya papkasini (kit1-interviews, kit4-people) GitHub'ga yuborma: unda xodimlar ma'lumoti bor.
2. .gitignore faylida .env, .env.* va runtime/ borligini tekshir. .env faylini ochma.
3. Git hali yo'q bo'lsa "git init -b main" qil. Keyin "git add -A" va "git status --short" ni ko'rsat.
   Ro'yxatda .env yoki runtime/ bo'lsa, darhol to'xta va menga ayt.
4. data/ va evals/ dagi fayllarda mijozning telefon raqami, karta raqami yoki pasport ma'lumoti bormi, tekshir. Bo'lsa, menga ko'rsat va commit qilma.
5. Commit qil: "4-dars: serverga chiqishdan oldin".
6. "gh repo create baraka-pilot --private --source=. --push" ni ishga tushir (baraka-pilot o'rniga o'z kompaniyam nomini qo'y).
7. "gh repo view --json visibility,url" bilan repo PRIVATE ekanini ko'rsat.
```

`baraka-pilot` o‘rniga o‘z nomingizni yozing, lotin harflarida, bo‘sh joysiz: masalan `sodiq-school-pilot`.

## Natija qanday bo‘lishi kerak

Bizning sinovimizda (Docker ichidagi toza server, 2026-11-03) git qismi shunday chiqdi (to‘liq: `namuna/natijalar/11-git.txt`):

```text
$ git status --short --branch
## main...origin/main

$ git ls-files | grep -E '(^|/)\.env$|^runtime/'
(bo'sh: kalit fayli repoda yo'q)
```

GitHub qismi taxminan shunday bo‘ladi (`gh` dasturining o‘z xabarlari):

```text
✓ Created repository rustamov-baraka/baraka-pilot on github.com
  https://github.com/rustamov-baraka/baraka-pilot
✓ Added remote https://github.com/rustamov-baraka/baraka-pilot.git
✓ Pushed commits to https://github.com/rustamov-baraka/baraka-pilot.git
{"url":"https://github.com/rustamov-baraka/baraka-pilot","visibility":"PRIVATE"}
```

Inglizcha: «repo yaratildi», «manzil qo‘shildi», «commit’lar yuborildi»; Claude o‘zbekcha tushuntiradi, nomlar Sizda boshqacha bo‘ladi.
Oxirgi qatorda `"visibility":"PRIVATE"` bo‘lishi shart.
Brauzerda repo sahifasini oching: nom yonida «Private» yozuvi turadi, fayllar ro‘yxatida `.env` yo‘q, `.env.example` bor.
`.env.example` - bo‘sh namuna, kalitsiz: u repoda turishi kerak.

## Bundan keyin: har bir o‘zgarishdan oldin commit

Bu bir martalik ish emas, odat.
Yo‘riqnoma, ma’lumot yoki kodni o‘zgartirishdan oldin Claude Code’ga yozing:

```text
Hozirgi holatni commit qil va GitHub'ga push qil. Xabar: "<nima o'zgarayotgani, bir gap>".
```

Xato chiqsa, «oxirgi commit’ga qaytar» deysiz (namuna: `namuna/natijalar/09-rollback.txt`, oxiri).

## Yomon namuna va tuzatish

**Yomon.**
Ishtirokchi Claude’ga «kodimni GitHub’ga qo‘y» deb yozdi.
Claude `kompaniya/` papkasining hammasini ochiq (public) repoga yukladi: ichida `app/.env` (bot tokeni va OpenRouter kaliti) va `kit1-interviews/` (xodimlar suhbatlari) bor edi.

**Nima xato:**

1. «Qaysi papka» va «yopiqmi» aytilmagan: Claude eng oddiy yo‘lni tanlagan.
2. `.env` repoga tushgan: kalit internetda ochiq.
3. Xodimlar suhbatlari uchinchi shaxsga berilgan.

**Tuzatish (shu tartibda, darhol):**

1. Kalitlarni almashtiring: BotFather’da `/token` (yangi token), openrouter.ai/keys da eski kalitni o‘chirib yangisini yarating.
   GitHub tarixida qolgan kalit o‘chirildi deb hisoblanmaydi: faqat almashtirish yordam beradi.
2. Repo sozlamalarida (Settings, General, oxirida «Danger Zone») reponi yoping yoki o‘chiring.
3. Yangi kalitlarni `.env` ga o‘zingiz yozing, `deploy.py env` bilan serverga yuboring.
4. Yuqoridagi to‘g‘ri topshiriq matni bilan faqat `app/` ni, yopiq repoga qayta yuklang.
5. Mentorga ayting (FAQ D-04, K-01).

## Tayyor bo‘ldi, agar

- [ ] `gh repo view --json visibility,url` `"PRIVATE"` ko‘rsatadi.
- [ ] Brauzerda repo ochiladi: `.env` yo‘q, `.env.example` bor, `kit1-interviews` yo‘q.
- [ ] Mentor ekranda ko‘rdi (tekshiruv kodi 4.6).
