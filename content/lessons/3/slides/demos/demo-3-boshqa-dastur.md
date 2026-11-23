# Demo 3: control another app, then "Screenshot and ask" and "Explain like I'm 5"

Run sheet 0:42-0:50 · 8 minutes in two parts · slides 14-16 · bold term: **Screenshot and ask**; habits: «Skrinshot qilib so‘rang», «5 yoshli bolaga tushuntir».

## Part A (0:42-0:46): open Illustrator and draw a blue circle

Point: Claude Code is not only for code; it can drive other programs on the computer.
Hard stop at 0:46 whatever happens: 2.0 lost time on exactly this kind of side demo (`final-curriculum/_build/evidence/2-0-day-2.md`, section 10b point 8).

Two technical routes; rehearse the one you will use:

| Route | How | Needs | Check on 2026-11-03 |
|---|---|---|---|
| 1. Script (recommended) | Claude Code writes and runs a short AppleScript/JavaScript for Illustrator through `osascript` | Illustrator installed and opened once; macOS asks once to let Warp control Illustrator ("Automation" permission): click OK | Not in Anthropic’s docs (it is ordinary macOS scripting); rehearse it |
| 2. Computer use | Claude Code takes screenshots and clicks | Research preview, macOS, Pro, Max or Ultra plan; enable with `/mcp`, select `computer-use`, Enable; grant Accessibility and Screen Recording; approve the app each session | code.claude.com/docs/en/computer-use |

Prompt:

```text
Adobe Illustrator’ni och, yangi hujjat yarat va o‘rtasiga ko‘k rangli doira chiz. Faylni saqlama.
```

Say while it runs (UZ): "Bu yerda kod yo‘q, men faqat nima kerakligini aytdim. Kompyuterdagi istalgan dastur bilan shunday ishlash mumkin, lekin har safar ruxsat so‘raydi."

Fallback ladder (move down at the first sign of trouble, do not debug live):

1. Keynote instead of Illustrator: "Keynote’ni och, yangi taqdimot yarat va birinchi slaydga ko‘k doira qo‘y."
2. No app control at all: "Ko‘k doira chizilgan SVG fayl yarat va brauzerda och." (always works).
3. Slide 14 has a screenshot of the result.

## Part B (0:46-0:50): Screenshot and ask

Input: `demos/inputs/xato-skrinshot.png` (a Warp window with two classic errors: `cd: no such file or directory: Documents/kompaniya` and `zsh: command not found: claude`).
The demo user’s Desktop has a copy.

| Step | Do | Say (UZ) |
|---|---|---|
| 1 | Open the PNG in Preview, Cmd+A, Cmd+C (copy image). | "Ishtirokchi shunday xato ko‘rdi. Mentorni chaqirishdan oldin nima qiladi?" |
| 2 | In Claude Code: Ctrl+V (macOS; not Cmd+V), the chip `[Image #1]` appears. Windows: Alt+V. If paste does nothing in Warp, drag the PNG file into the window: its path is inserted. | "Ctrl+V. Rasm qo‘shildi." |
| 3 | Type: `Bu xato nima va nima qilishim kerak? 5 yoshli bolaga tushuntirgandek, keyin aniq buyruqni ber.` | "Mana ikki odat birga: skrinshot qilib so‘rang va 5 yoshli bolaga tushuntir." |
| 4 | Read the answer aloud: the folder is `~/praktikum/kompaniya` (the Week 0 course folder), not `Documents/kompaniya`; "command not found" means Warp has not seen the new install yet, close and reopen Warp, or run the installer again. | "Mentor ham shuni aytardi. Lekin endi siz o‘zingiz topdingiz." |
| 5 | ELI5 on a term: `Harness nima? 5 yoshli bolaga tushuntir.` | "Har yangi so‘zda shunday so‘rang." |

Mentor rule from now on (slide 15): before helping, the mentor asks "Skrinshot qilib Claude’dan so‘radingizmi?"
Exception: if Claude Code itself does not start, use the Claude app on the phone or the web for the same screenshot.

Facts checked 2026-11-03: image paste is Ctrl+V on macOS (Cmd+V only in iTerm2) and Alt+V on Windows (code.claude.com/docs/en/interactive-mode); drag-and-drop of the file is the fallback several sources recommend; test Ctrl+V in Warp on the demo machine the day before.

## Fallback

Slides 15-16 carry the screenshot and the expected answer; read them if the live paste fails.
