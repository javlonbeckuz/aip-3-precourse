# AI Praktikum 3.0: UI glossary (uz → ru → en)

`reference-blueprint.md` confirms that 2.0 had UZ/RU/EN, but it names no RU or EN terms, so the suggested defaults stand. Product, tool and feature names stay as they are: NotebookLM, Claude, Claude Code, Code/Cowork, Hermes (Agent), Skill, Plugin, Connector, Plan, agent teams, here.now, /oops, RAG, AI, Uzcard, Humo, Visa, IDs, P1–P8/Q1–Q5, and the case name «Ravon Uy».

| Uzbek | Russian | English |
|---|---|---|
| Dastur | Программа | Program |
| Dars / {n}-dars | Урок / Урок {n} | Lesson / Lesson {n} |
| Tayyorgarlik | Подготовка | Preparation |
| Slaydlar | Слайды | Slides |
| Amaliyot | Практика | Practice |
| Vazifa | Задание (tabs, meta lines, short labels) · Домашнее задание (headings, pane labels, tab title) | Homework |
| Kitob | Книга | Book |
| Mashq | Упражнение | Exercise |
| Asosiy mashqlar | Основные упражнения | Core exercises |
| Qoʻshimcha | Дополнительно | Extra |
| ixtiyoriy | по желанию | optional |
| Yakuniy fayl | Итоговый файл | Final file |
| Karta (Hermes) | Карточка | Card |
| Prompt kutubxonasi | Библиотека промптов | Prompt library |
| Boʻlim | Раздел | Section |
| Band (prep) | Пункт | Item |
| Manba(lar) | Источник(и) | Source(s) |
| Qoʻllanma | Руководство | Guide |
| Keyingi qadam | Следующий шаг | Next step |
| qadam | шаг / шага / шагов | step / steps |
| Nusxalash / Nusxalandi | Копировать / Скопировано | Copy / Copied |
| Bajarildi | Выполнено | Done |
| Bajarildi deb belgilash | Отметить выполненным | Mark as done |
| Bajardim (free homework toggle) | Готово | I’m done |
| Bekor qilish | Отменить | Undo |
| Qayerga: | Куда: | Paste into: |
| Manba: | Источник: | Source: |
| Hozir davom etmoqda | Идёт сейчас | In progress now |
| Ochiq (lesson state) | Открыт | Open |
| Koʻrildi | Просмотрено | Viewed |
| Davom etish | Продолжить | Continue |
| Shaxsiy kabinet | Личный кабинет | My account |
| Shaxsiy ID | Личный ID | Personal ID |
| Kirish (button / tab title) | Войти / Вход | Sign in |
| Chiqish | Выйти | Sign out |
| Yopish | Закрыть | Close |
| Orqaga | Назад | Back |
| Yuklab olish | Скачать | Download |
| namuna | образец | sample |
| Erkin ijod | Свободный проект | Free project |
| Boshqaruv paneli | Панель управления | Dashboard |
| lotin / kirill (book script) | латиница / кириллица | Latin / Cyrillic |

## Judgement calls
- **Vazifa (ru), two forms.** "Домашнее задание" (16 chars) cannot fit the ≤ 11-char tab, and "ДЗ" is too school-like for adults. Short slots use "Задание"; headings use the full term. English is "Homework" everywhere.
- **Lesson titles.** "Skill va agentlar" becomes "Skills и агенты" / "Skills and agents". It keeps the Claude feature name the students see in the app, and the lede and tags keep "Skill" in Latin.
- **Gate title (en).** "My\naccount" rather than "Sign in", because the button below already says "Sign in".
- **Counts with no plural param in code** (`row.mark`, `tag.slide`, `tag.lesson`, `hero.sub`, `home.ring.valuetext`, the `{d}/4` and `{d}/9` counters) use number-neutral wording: "Основных упражнений выполнено: {d}/4", "промпты {d}/{t}", "Полностью пройдено уроков: {d} из {t}." This way no form is ever wrong.
- **Plural objects only where the code passes `pl`:** lesson.meta, steps, note.done, note.live_c, note.open, pane.sl.meta, gate.err.short, lib.found (ru + en), plus vz1.cnt (en only; the ru wording is neutral). The comp reads flat keys (`key#one`, `key#few`…), so the merge has to flatten these objects.
- **toast.done / live.marked:** "{no}: выполнено". The noun behind {no} can be a prompt (masc.) or an exercise (neut.), so the impersonal form avoids wrong gender agreement.
- **note.live_a/b (ru):** "Сейчас" + " идёт". Under 360 px, "Сейчас · 0/2 шага" still reads.
- **ns.text_qimmat** keeps the literal word "qimmat" next to «дорого» / “too expensive”, so the search demo finds it in every language. [Soha] → [Сфера] / [Industry], with the brackets kept.
- **Mentor name (ru):** "Х. Марозиков". Russian text in Uzbekistan usually writes names in Cyrillic. Revert to "X. Maroziqov" if the mentor prefers Latin.
- **book.title:** the main title stays Uzbek as a proper name; only the subtitle is translated.
- **book.note:** "toʻplam" was read as "sets (of worksheets)": "Пять наборов…" / "Five sets…". Confirm against the actual book.
- **Em dashes** in the Uzbek (book.note, vz1.g1_hint, vz1.sheet.meta) became a colon or a "·".
