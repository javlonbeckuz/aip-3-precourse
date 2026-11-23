# Demo 4: memory files

Day 5, 0:46-0:52 (6 minutes), inside "Kinds of agents".
Terms taught: memory files (Soul, Agents, User, Memory), memory limits, audit trail (reference).
Curriculum: "Memory files: soul.md, agents.md, user.md, memory.md. Show the folder. Behavior is set in plain text you can edit" (`praktikum-3-curriculum.md:568-569`); 2.0 taught them on Day 4 with Hermes (`praktikum-2/day-4/hermes-lesson/content.uz.md`, A7).

## What the room should see

Everything the agent "is" sits in a few text files the owner can read and edit.
The pilot bot already has them; Hermes has the same idea with other names.
Small on purpose.

## Materials

| What | Path |
| --- | --- |
| Uzbek one-pager for the room (comparison table, Baraka examples, bad example) | `xotira-fayllari.md` |
| Baraka memory before and after Day 5 | `../../exercises/namuna/yaxshilash/agent-v1/memory.md`, `agent-v2/memory.md` |
| Baraka-flavoured Hermes files for demo 5 | `hermes-namuna/SOUL.md`, `AGENTS.md`, `USER.md`, `MEMORY.md` |

## Steps

1. Terminal in your demo bot: `ls agent/` and open `memory.md` (v2): two lines, each a date and one fact.
   UZ: «Bu agentning daftari. Bitta qator va KP ni manbadan olib tashlash 1-haftadagi ikkita xatoni yo‘qotdi.»
2. Phone: `/xotira` on the demo bot shows facts added from the phone (`/eslab_qol`), stored on the server in `runtime/memory.md`.
   UZ: «Telefondan qo‘shsangiz, darhol ishlaydi. Lekin hafta ichida uni memory.md ga ko‘chiring va test qo‘shing: noutbukdagi testlar telefon faktlarini ko‘rmaydi.»
3. Slide: the comparison table (pilot files vs SOUL, AGENTS, USER, MEMORY).
   Name the limits: MEMORY.md 2,200 characters and USER.md 1,375 characters in Hermes, loaded once per session; the pilot re-reads its files on every question.
4. Make the distinction: memory is the short notebook the agent reads every time; the journal (`runtime/journal/`) is the full record, read by people and Claude Code.
   That journal is the audit trail of Kit 3 B.7.

## Facts checked (2026-11-03)

- Hermes memory: `~/.hermes/memories/MEMORY.md` (2,200 chars) and `USER.md` (1,375 chars), injected as a frozen snapshot at session start, `/new` to reload: https://hermes-agent.nousresearch.com/docs/user-guide/features/memory.
- SOUL.md lives in `~/.hermes/SOUL.md` (`$HERMES_HOME`), never in the working directory: https://hermes-agent.nousresearch.com/docs/user-guide/features/personality.
- The pilot reads `agent/*.md` and `runtime/memory.md` on every question: `pilot-template/pilot/prompt.py` (`load_agent_text`), `pilot/assistant.py`.

## Fallback

`xotira-fayllari.md` on the screen; the 2.0 picture `../05-hermes/fallback/hermes-qanday-ishlaydi.png`.
