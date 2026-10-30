# Praktikum 3.0 Curriculum

v3 · 2026-10-19 · @Khurshid

Built on Khurshid's "Praktikum 3.0 Curriculum (REALITY)" of 19 October 2026 (source copy: `_build/reality-2026-10-19.md`), kept close to Praktikum 2.0.
The edits made to that draft are listed at the end, in "What changed from the REALITY draft".
v2 and its lesson-by-lesson manual are archived in `90_archive/praktikum-3/2026-10-19_curriculum-v2/`.
English master; the Uzbek edition follows once this version is approved.

---

Praktikum 3.0 is a six-session weekend program that takes business owners and senior decision-makers from "I use ChatGPT" to a deployed AI tool running on one real process in their own company, with measured before/after numbers.

Every session teaches the vocabulary and tools through building, and every session advances one of the five "Biznesda AI'ni qo'llash" kits on the participant's own business.
By demo day, each participant has run a 2-week pilot.

## Program overview

### Who it is for

Business owners, founders, and people in key decision roles (CEO, COO, CFO, department heads).
Most are non-technical.
They will not become programmers.
They need to understand the vocabulary, build and connect things themselves, direct their teams, and judge what vendors sell them.

### Three threads: understand, build, apply

Every session carries all three threads.
The balance shifts from understanding on Day 1 to applying on Day 6.

| Thread | What the owner gains | Where it is taught |
| --- | --- | --- |
| Understand | How AI works: the infrastructure it runs on, what a model is, tokens, context, frontier vs open-weight models; enough vocabulary to direct a team and judge a vendor | Day 1 in depth (50 minutes), then the new terms of each day |
| Build | Claude Code as their own builder: plan, build, connect to real systems, deploy, improve | First build on Day 1, Claude Code from Day 2, connected on Day 3, deployed on Day 4, improved on Day 5 |
| Apply | The five kits run on their own company, ending in one measured pilot | Kit 1 on Day 1 through Kit 5 on Day 6 |

### Outcomes: what every participant can do at the end

| # | Thread | Outcome | Proven by |
| --- | --- | --- | --- |
| 1 | Understand | Explain infrastructure, model, token, context window, frontier vs open-weight, API, MCP, agent in plain words | Day 1-3 quick quizzes, demo day Q&A |
| 2 | Understand | Choose the right model and tool for a job, and estimate its cost | Model choice in their own build, Kit 5 cost lines |
| 3 | Build | Build with Claude Code: plan, PRD, task list, iterate, fix by screenshot | Their own pilot tool |
| 4 | Build | Connect a tool to real systems through API, MCP, or an export | Pilot connected to Telegram plus at least one business data source (Sheets, CRM, 1C, etc.) |
| 5 | Build | Deploy a tool that runs 24/7 without their laptop | Pilot live on a VPS with a domain or bot |
| 6 | Apply | Pick the right process to automate and measure the result | Completed Kits 1-5, continue / change / stop decision |

### Format

| Item | Detail |
| --- | --- |
| Sessions | 6, weekly, weekend daytime |
| Dates | Day 1 on 21/22 November 2026, then every weekend to Day 6 on 26/27 December |
| Days | Saturday group and Sunday group, same content |
| Group | 40 participants per group |
| Length | About 3 hours per session (2.5 hours minimum), one 10-minute break |
| Split | About 40% concepts and demo, about 60% hands-on on own laptop |
| Week 0 | One 30-minute online setup call in the two weeks before Day 1: Claude paid plan, Google account, Warp and Claude Code installed and opened once |
| Support | One mentor per 5 participants, at the same table every week |
| Between sessions | Kit homework + build, mentor support in the group chat |
| After the program | 1 month of mentor support, AI Community group access |

### The company folder

On Day 2 every participant creates one folder on their laptop for their company.
Each kit's output is saved there as a .md file, and Claude Code reads it all.
By Day 6 the folder holds the interviews, the scoring, the agent instructions, the pilot code, and the results.

This turns the kits from paperwork into context.
CLAUDE.md, skills, and system prompts are taught on the participant's own business, not on a demo company.

```
kompaniya/
  CLAUDE.md              company context, rules for Claude
  kit1-interviews/       transcripts + Form B task lists
  kit2-scoring/          scoring table + Value/Ease matrix
  kit3-agent/            process steps + agent instructions (system prompt)
  kit4-people/           skills map + training tasks
  kit5-pilot/            pilot plan, weekly numbers, error log
  app/                   the pilot tool itself
```

### How the five kits run across the six sessions

The pilot must go live by Day 4, because Kit 5 needs at least 2 weeks of data before demo day.
Everything is ordered backwards from that.

| Day | Date (Sat/Sun) | Theme | Kit work in class | Kit homework |
| --- | --- | --- | --- | --- |
| 1 | 21/22 Nov | How AI works | Kit 1 introduced, mock interview + transcript | Kit 1 A + B with 2-3 employees |
| 2 | 28/29 Nov | Claude Code | Kit 2 A + B built with Claude Code from Kit 1 files | Confirm pilot with department head, start the baseline |
| 3 | 5/6 Dec | API and MCP | Kit 3 A + B, B becomes the system prompt | Staff review of Kit 3 B, finish agent v0 |
| 4 | 12/13 Dec | Ship it | Kit 5 A (pilot plan), Kit 4 A + B prepared | Kit 4 conversations, then pilot goes live |
| 5 | 19/20 Dec | Agents that improve | Kit 5 B week 1 + error log, fix the agent | Pilot week 2 |
| 6 | 26/27 Dec | Results + demo day | Kit 5 B final numbers + decision | Process #2 from the matrix |

### Prerequisites

| Item | When | Note |
| --- | --- | --- |
| Laptop (macOS or Windows) | Week 0 call | Admin rights to install software |
| Claude paid plan | Week 0 call | Pro minimum; Max recommended from Day 2 (open decision) |
| Google account | Week 0 call | NotebookLM, Gemini, Sheets |
| Warp terminal + Claude Code installed | Week 0 call | Mentors fix anyone the call missed at the end of Day 1 |
| Telegram bot token (BotFather) | Before Day 3 | 5-minute setup |
| OpenRouter account with a spending limit | Before Day 3 | $10-20 limit |
| VPS + domain | Before Day 4 | Setup video provided; about 200,000 so'm per month |
| Access to one real process and 2-3 employees | Day 1 homework | Solo owners interview themselves |

### Definition of done per participant

A participant graduates when one small tool, connected to at least one real system in their business, has run for 2 weeks with a colleague using it, and the Kit 5 numbers show the result against the baseline.

### How to read the terminology tables

Each day has a terminology table.
Terms in **bold** are taught live, with the demo in the table; there are 5-8 per day.
The rest are reference: they go on the glossary handout and are explained when someone meets them in their own build.

## Day 1: How AI works, and where your work goes

Participants build something in the first 30 minutes, then learn how AI works underneath it: where it runs, what a model is, what they pay for, and which model to pick.
They leave with Kit 1 ready to run on their own staff.

The 2.0 lesson: 90 minutes of chips and geopolitics before touching a keyboard lost the room.
3.0 keeps the infrastructure story but cuts it to 15 minutes, after the first build, and ties each layer to a question an owner actually asks.

### Learning outcomes

- Draw the three layers of AI (infrastructure, models, platforms) and say where their data physically goes when they type into a chat.
- Explain in plain words what a model, a token, and a context window are, and why Uzbek costs more than English.
- Tell frontier models from open-weight models, and say when each is the right choice.
- Choose between a cheap, a balanced, and a strong model for a job.
- Know when AI is guessing (hallucination) and how to check it.
- Use NotebookLM to answer only from their own company documents.
- Run a Kit 1 interview, transcribe it, and turn it into a Form B task list with corrected numbers.

### Run of show (180 min)

| Time | Segment | What happens | Format |
| --- | --- | --- | --- |
| 0:00-0:15 | Why we are here | 80% of survey respondents say AI has improved their productivity; only 37% of companies see any of it in profit (McKinsey, State of AI 2026). This program is about the profit line. Format, mentors, the company folder, demo day. | Talk |
| 0:15-0:45 | First build | Everyone builds a price calculator or one-page offer for their own business as a Claude artifact. Mentors help at tables. | Hands-on |
| 0:45-1:00 | Where AI lives | The three layers on one diagram; the trip a chat message takes to a data center and back; why prices and access move; what "running it on our own server" means | Talk + diagram |
| 1:00-1:35 | How a model works | Prediction, tokens, context window, model tiers, frontier vs open-weight; each shown live on the calculator they just built or on a short demo | Demo + talk |
| 1:35-1:45 | Break |  |  |
| 1:45-2:10 | NotebookLM: AI on your own documents | Load company documents, ask, find contradictions, generate audio and quiz | Hands-on |
| 2:10-2:45 | Kit 1: Where does the work go? | Why map work first; the consent script; live interview of a volunteer, transcribed and turned into Form B; catching a wrong number | Demo + pairs |
| 2:45-3:00 | Homework + setup check | Kit 1 homework brief; mentors check Claude Code opens for everyone and fix anyone the Week 0 call missed | Tables |

### Concepts and terminology

| Term | Plain explanation | Analogy or live demo | Why an owner cares |
| --- | --- | --- | --- |
| **AI landscape: 3 layers** | Infrastructure (chips, power, data centers) → models → platforms (apps) | One diagram: Nvidia designs the chips, TSMC makes them, labs train models in data centers, apps sell them to you | Reading the news without being fooled; prices and access move with chip supply and politics |
| Data center, GPU, compute | Buildings full of GPU chips that train and run models; "compute" is rented chip time | Training one frontier model takes tens of thousands of GPUs for months | Why strong models are paid per word, and why prices keep falling as chips get cheaper |
| **Where your data goes** | A chat message leaves your laptop, runs on a GPU in the provider's data center (usually the US or Europe), and the answer comes back | Trace one message on the diagram | Customer data typed into a chat is data sent abroad. Uzbek law allows ordinary personal data to go to 49 listed countries, the US and Germany included (Law No. 1125 of 2026). A server in Tashkent does not keep data local if the model it calls runs abroad |
| **Large language model (LLM)** | Predicts the most likely next word, trained on text | "Pick a number 1-10": most models say 7 | It guesses; it does not calculate or know |
| **Token** | The unit text is cut into; the unit you pay in | Tokenizer: the same sentence in Uzbek, Russian and English; Uzbek comes out longest | Uzbek prompts cost more and long chats cost more; the exact gap differs by model, so measure it live rather than quote one number |
| Input / output / reasoning / cached tokens | What you send, what it writes, what it "thinks", what it re-reads | Show a thinking trace | Output and reasoning are the expensive part |
| **Context window** | How much the model can hold in one conversation | The dastarxon: when it fills, things fall off | Long chats get dumber; start a new chat per topic |
| "Dumb zone" | Quality drops well before the window is full | Show a long chat going wrong | New task = new chat; in Claude Code, /compact |
| **Model tiers and effort** | Cheap/fast (Haiku), balanced (Sonnet), strong (Opus, Fable); effort = how hard it thinks | Same Uzbek task on Haiku vs Sonnet vs Opus: Haiku invents "shavlama" | Strong model for planning, cheap model for sorting |
| **Frontier vs open-weight models** | Frontier: the strongest models, reached only through the maker's app or API (Claude, GPT, Gemini). Open-weight: the trained model file is published, so anyone can download it and run it on their own server (DeepSeek, Qwen, Kimi, GLM) | The DeepSeek moment: Nvidia lost nearly $600B in one day (January 2025). Same Uzbek task on a frontier and an open-weight model through OpenRouter, with the price per million tokens side by side | Open-weight models are often good enough for routine sorting and drafting at a fraction of the cost, and can keep data on your own server; frontier models still lead on hard reasoning and on Uzbek. Using DeepSeek's own website still sends your data to DeepSeek: "open" means you could run it yourself, not that their site is private |
| Platform | The app around the model (ChatGPT, Claude, Gemini, ElevenLabs, Higgsfield) | Model = engine, platform = car | Pick the platform by job: Claude has no image generation, Gemini is strong in Uzbek |
| Knowledge cutoff + web search | The model's knowledge stops at a date; web search fetches today | Ask a current fact with search on and off | Turn search on for anything current |
| **Hallucination** | Confident wrong answers; AI never shows a red error cell | "Show me your formula" on a wrong total | Never trust numbers without checking |
| RAG (source grounding) | AI answers only from documents you gave it | NotebookLM with company policies | Safe internal knowledge base |
| Prompt basics that survive | Goal, short context, constraints, output format | "Marketing plan" vs a 4-part prompt | Better answers with the same model |
| Iterate three times | The first answer is a draft | Improve one answer twice live | Most people quit after one try |
| Transcription (speech-to-text) | Audio to text; weak on Uzbek numbers | "Bir uch-to'rt yuz ming" becomes 1,300,000 | Every transcript gets a human number check |

Model names, prices and limits change every month.
They live on one dated "This week in AI" sheet handed out each session, not on the core slides.

### Instructor demos

1. **The 7 test.** Whole room asks a model for a number from 1 to 10.
   Shows prediction, not thinking.
2. **Where a message goes.** One diagram: laptop → internet → data center → GPU → answer.
   Then the same diagram for a model on your own server.
3. **Token count.** One sentence in Uzbek, Russian, English through a tokenizer.
4. **Model ladder.** "List 20 Uzbek national dishes" on Haiku, Sonnet, Opus.
5. **Frontier vs open-weight.** The same Uzbek business task on a frontier model and an open-weight model through OpenRouter; compare the answers and the price per million tokens.
6. **The context dastarxon.** Show the context meter fill; explain why to start a new chat.
7. **Formula check.** Upload a small sales Excel, ask for a total, then ask "how did you calculate this?"
8. **Kit 1 live interview.** Instructor interviews a volunteer for 5 minutes on their real job, transcribes with Gemini, runs the Kit 1 prompt, and fixes one misheard number in front of the room.

### Hands-on practice (on their own laptops)

| # | Exercise | Steps | Done when |
| --- | --- | --- | --- |
| 1 | First artifact | In the Claude app, ask for a price calculator or one-page offer for your products; change one thing by chatting | Calculator works with your real products |
| 2 | Token experiment | Paste one business sentence in Uzbek and English into a tokenizer | You can say the token difference |
| 3 | Model comparison | Same non-sensitive task on two Claude tiers, then on one free open-weight chat (DeepSeek or Qwen); note quality and speed | You picked a model for each of 2 tasks and can say why |
| 4 | Company knowledge base | NotebookLM: upload 3-5 company documents (price list, rules, contracts); ask 3 questions; ask it to find contradictions; generate an audio overview or quiz | 3 answers with source citations |
| 5 | Kit 1 mock | Pair up, record a 5-minute interview with the A.1-A.7 questions, transcribe in Gemini, run the Kit 1 prompt | A Form B table; at least one number corrected by hand |

### Kit 1 integration: Where does the work go?

| Form | Done in class | Done as homework |
| --- | --- | --- |
| Consent script | Practiced aloud in pairs | Read to each employee before recording |
| A: Employee interview (A.1-A.7) | Mock with seatmate | 20-30 min with 2-3 real employees |
| Transcription + AI prompt | Practiced on the mock | Run on each real interview |
| B: Task list (B.1-B.9) | Generated from the mock | Generated, then corrected by the employee; weekly hours summed; B.9 A/R/I/B marked |

Before the first interview, the owner tells the whole team why the interviews are happening: to map the work, not to replace people.
The interviewer says it again at the start of each interview.
This is where the fear is highest.

### Homework

1. Tell the team why the interviews are happening (one message or a short meeting).
2. Kit 1 A with 2-3 employees in one department.
   Solo owners or managers without a team interview themselves or their department head.
3. Transcribe each interview and run the Kit 1 prompt.
4. Show each Form B to the employee; correct minutes and frequency.
5. Save each as a .md file (e.g. `kit1-dilnoza.md`).
   Bring them on Day 2.
6. Confirm Warp and Claude Code open on your laptop.

### Mentor check at the start of Day 2

- [ ] At least 2 Form B files exist as .md
- [ ] Minutes and frequencies were corrected by the employee, not left as AI guesses ([?] marks resolved)
- [ ] B.9 (agent / robot / human / both) filled for every task
- [ ] Claude Code starts in Warp

## Day 2: Claude Code, and which process to start with

Participants learn Claude Code by pointing it at their own Kit 1 files, and leave with a scored Value/Ease matrix, a chosen pilot process, and a first plan for the tool.

The opening line, where fear peaks: "Forget the word code. This is not a programming tool. It is an expert you hire who sits at your computer and works. Code is just one thing it knows."

### Learning outcomes

- Open Claude Code in a folder and give it everyday tasks in plain Uzbek.
- Explain model vs harness, and the three ways to use Claude (web, desktop, terminal).
- Write a CLAUDE.md that tells Claude about their company.
- Use plan mode, a PRD, and a task list before building anything bigger than one page.
- Turn a repeated prompt into a skill, and know the risk of installing other people's skills.
- Score processes with Kit 2 and pick the first pilot.

### Run of show (180 min)

| Time | Segment | What happens | Format |
| --- | --- | --- | --- |
| 0:00-0:20 | Kit 1 review | Mentors check Form B files at each table; 2 participants share one surprising finding | Tables |
| 0:20-0:50 | Meet Claude Code | Model vs harness; web, desktop, terminal; Warp; live: "organize my Desktop", "open Illustrator and draw a blue circle" | Demo |
| 0:50-1:20 | The company folder | Create `kompaniya/`, move Kit 1 files in, run /init, write CLAUDE.md, set global instructions | Hands-on |
| 1:20-1:50 | Kit 2 with Claude Code | Claude Code extracts up to 8 processes from Kit 1 files, fills the scoring table, computes Value and Ease, draws the matrix | Hands-on |
| 1:50-2:00 | Break |  |  |
| 2:00-2:30 | Plan before you build | Plan mode → PRD → task list "for a junior developer", written for their likely pilot | Demo + hands-on |
| 2:30-2:50 | Skills | What a skill is; turn the Kit 1 and Kit 2 prompts into /kit1 and /kit2; skill safety | Hands-on |
| 2:50-3:00 | Homework | Pilot decision, baseline, Day 3 setup | Talk |

### Concepts and terminology

| Term | Plain explanation | Analogy or live demo | Why an owner cares |
| --- | --- | --- | --- |
| **Harness** | The program around a model that gives it tools: read files, run commands, browse | Same engine, different car: Opus in Claude Code behaves differently than in a chat window | Tool choice matters as much as model choice |
| Agentic | Breaks a job into steps and does them, checking its own work | "Organize my Desktop" | It acts, not just answers |
| **Claude web / desktop / Claude Code** | Same brain; Claude Code works on files on your computer, no 20 MB upload limit | Read a 200 MB folder that chat cannot | Real company data lives on disks, not in chat uploads |
| Terminal, CLI, Warp | A text window to talk to the computer; Warp shows folders and formats .md files | "It is just another chat window" | No fear of the black screen |
| Working directory (folder) | The folder Claude Code is working in | Show the path at the top | Each project gets its own folder |
| .md file | Plain text with simple formatting | Open a Form B in Warp | Everything in this course is saved as .md |
| **CLAUDE.md** | The project's rulebook and memory, read every session | The restaurant's house rules for cooks | Write your company context once |
| Global instructions | Rules for every chat: no em dashes, cut the fluff, push back when I am wrong, the current year | Show settings | Stops flattery, stops stale searches |
| Nested CLAUDE.md | A small CLAUDE.md per subfolder, loaded only when Claude enters it | Department rulebooks inside the company one | Keeps context lean as the folder grows |
| /init | Claude reads the folder and writes a first CLAUDE.md | Run it on the company folder | Fast start |
| **Plan mode (Shift+Tab)** | Claude plans and asks questions, writes nothing yet | Plan a lead form before building it | Building without a plan = re-piping a 9-floor building |
| **PRD** | Product requirements document: what to build, for whom, limits, scale | A building's project drawings | Your TZ; vendors should give you one too |
| Task list | The PRD cut into small steps a junior developer understands | Foundation, walls, roof | Lets several agents work in parallel later |
| **Skill** | A saved, reusable instruction file Claude loads when relevant | Restaurant tech card for a dish | Repeat jobs done the same way every time |
| Frontmatter | The top of a skill that says when to use it | Show three dashes in SKILL.md | Controls when the skill wakes up |
| Plugin | A package of skills, commands, and connectors | A franchise package | Install a whole capability at once |
| Prompt injection via skills | Malicious skills can steal keys or run commands | Scan a skill before install | Not every popular skill is safe |
| Key commands | Esc (pause, not cancel), Shift+Tab (modes), /model, /usage, /context, /compact, /resume, /rewind, /btw | Live on screen | Control, cost, recovery |
| **Screenshot and ask** | When stuck, screenshot the error and ask Claude itself | Paste an error screenshot | The paradigm shift: the tool is your first teacher |
| Imagine there is no AI | Before asking, think who would do this job without AI | Website: designer, developer, content, deploy | Gives Claude the right roles and questions |

### Instructor demos

1. **Organize the Desktop.** "Desktop papkamni tartibga keltir" in plain Uzbek; show files moved, nothing deleted.
2. **Control another app.** Open Illustrator and draw a shape: Claude Code is not only for code.
3. **Company CLAUDE.md.** Write a 15-line CLAUDE.md for a sample company; show Claude using it in the next answer.
4. **Kit 2 from files.** Point Claude Code at three Form B files, produce the scoring table and the 2x2 matrix as an HTML page.
5. **Plan mode.** Plan a Telegram report bot; show the questions it asks before writing code.
6. **Skill creation.** Turn the Kit 1 prompt into /kit1; run it on a new transcript.

### Hands-on practice (on their own laptops)

| # | Exercise | Steps | Done when |
| --- | --- | --- | --- |
| 1 | First chore | Open Claude Code; ask it to organize your Downloads or Desktop folder | Files sorted into folders, nothing deleted |
| 2 | Company folder | Create `kompaniya/`; move Kit 1 .md files in; run /init; edit CLAUDE.md with company name, products, departments, systems used | Claude answers a question about your company correctly from CLAUDE.md |
| 3 | Global instructions | Add: no em dashes, cut the fluff, tell me when I am wrong, current year 2026 | Settings saved |
| 4 | Kit 2 scoring | Ask Claude Code to list up to 8 processes from Kit 1 files and score A.2-A.7; correct any score you disagree with; compute Value and Ease | Scoring table saved in `kit2-scoring/` |
| 5 | Kit 2 matrix | Ask for the Value/Ease matrix as an HTML page; open it in the browser | Matrix shows each process as a numbered dot |
| 6 | Model switching | Do exercise 4 on Haiku or Sonnet, the pilot choice on Opus; check /usage | You can say which model you used where and why |
| 7 | First PRD | Plan mode: describe the likely pilot; get a PRD and a task list | `prd.md` and `tasks.md` in the folder |
| 8 | First skill | Turn the Kit 1 prompt into a skill; run it with /kit1 | Skill appears in the / menu |

### Kit 2 integration: Which process do we start with?

| Form | Done in class | Done as homework |
| --- | --- | --- |
| A: Process scoring (A.1-A.9) | Draft generated by Claude Code from Kit 1 files, corrected by the participant | Reviewed with the department head (owners usually underestimate how messy the data is) |
| B: Value/Ease matrix | Drawn by Claude Code as HTML | Final choice: B.1 chosen process, B.2 why this one, B.3 what we are not doing now |

### Homework

1. Review the Kit 2 scores with the department head.
   Fill B.1-B.3 and save.
2. **Start the baseline.** Record the current numbers for the chosen process: requests handled, average minutes, errors, repeat requests.
   Where history exists (Telegram chat export, Excel, the CRM), pull the last 2-4 weeks from it with Claude Code; record live for 5 working days only what has no history.
   These are the "Agentgacha" column of Kit 5 B.
   Without a baseline there is no result on demo day.
3. Create a Telegram bot with BotFather; keep the token private.
4. Create an OpenRouter account and set a $10-20 limit.
5. List the systems your pilot touches (Excel, Google Sheets, Telegram groups, 1C, Bitrix, amoCRM, Click, Payme).
   Find out whether each has an API.

### Mentor check at the start of Day 3

- [ ] Kit 2 B.1-B.3 filled and agreed with a department head
- [ ] Baseline numbers exist (from history, or at least 3 days recorded live)
- [ ] Bot token and OpenRouter account ready, with a spending limit
- [ ] CLAUDE.md describes the company and the chosen process

## Day 3: API, MCP, and redistributing the work

Participants map the chosen process step by step, write the agent's instructions (Kit 3), and build agent v0 connected to the real systems those instructions name.

Kit 3 B.3 ("sources the agent may use") decides each person's integration.
The API and MCP lesson is driven by what their own process needs, not by a generic demo.

### Learning outcomes

- Explain API, API key, MCP, and connector, and when each is used.
- Store keys safely and set spending limits.
- Tell frontend from backend and know what a database is.
- Break a process into steps and decide who does, checks, decides, and is responsible for each.
- Turn Kit 3 B into a system prompt and a PRD, and build agent v0 against real data.
- Know where to find ready open-source solutions before building from zero.

### Run of show (180 min)

| Time | Segment | What happens | Format |
| --- | --- | --- | --- |
| 0:00-0:20 | Kit 2 + baseline review | Each table: chosen process, why, baseline numbers so far | Tables |
| 0:20-1:00 | Kit 3 A: process steps | Map the chosen process, one action per row; today vs tomorrow (agent / robot / human); who checks, decides, is responsible. Rule: the agent never checks its own step | Hands-on with mentors |
| 1:00-1:20 | Kit 3 B: agent instructions | Fill B.1-B.10; run the Kit 3 prompt in Claude Code; save as `kit3-agent/instructions.md` | Hands-on |
| 1:20-1:30 | Break |  |  |
| 1:30-2:10 | How systems talk | API, keys, MCP, connectors, frontend/backend; live: a lead form that writes to Google Sheets and pings Telegram | Demo + talk |
| 2:10-2:50 | Build agent v0 | Plan mode with Kit 3 B as the PRD; connect 1-2 real sources from B.3; mentors unblock integrations | Hands-on |
| 2:50-3:00 | Homework | Staff review of instructions, finish v0, VPS purchase | Talk |

### Concepts and terminology

| Term | Plain explanation | Analogy or live demo | Why an owner cares |
| --- | --- | --- | --- |
| **API** | A program's official menu of what others can ask it for | Restaurant menu: you order, the kitchen cooks | Before buying anything, ask "does it have an API?" |
| API documentation | The written menu: how to ask and what comes back | Open Click's API docs; give Claude the link | Claude reads docs so you don't have to |
| **API key / secret** | The password that lets a program use the API | House key: whoever has it gets in; copies cost nothing | A leaked key can drain your card |
| **.env file** | A private file where keys live, never in chat or code | A safe, not a sticky note | Keys in chat end up in logs |
| Rate limit / pay per call | How many requests you may send; some APIs charge per 1,000 calls | Travel APIs charging per search | Hidden running costs |
| OpenRouter | One key for hundreds of models, one bill | Wholesale market for models | Switch models, frontier or open-weight, without new contracts; set a limit |
| **MCP (Model Context Protocol)** | A standard plug that lets AI use other apps | Type-C cable for AI | Connect Claude to Canva, Calendar, Higgsfield in one line |
| Connector / custom connector | A ready MCP inside Claude settings | Google Calendar: "meet Nodirbek tomorrow at 19:50" | Uzbek vendors (e.g. Billz) are starting to ship them |
| API vs MCP | API: for any program. MCP: built for AI agents on top of APIs | Menu vs a waiter who knows the menu | Ask vendors for both |
| **Frontend / backend** | What the customer sees vs the kitchen where calculations and data live | OLX: listings page vs the database behind it | Understand what a developer quotes you for |
| Database | Where records are stored and searched | One table of every listing | Your data's single source of truth |
| JSON | Structured text machines read | Telegram chat export as JSON | Telegram exports are now agent-readable |
| Webhook | One app notifies another when something happens | Form submitted → Telegram message | Real-time alerts without polling |
| Telegram Bot API, BotFather, chat ID | How bots are created and where they send messages | Create a bot live | Telegram is Uzbekistan's de facto ERP |
| Google Apps Script | Small code inside Google Sheets that receives data | Paste the script Claude wrote | Free backend for small tools |
| Browser agent | AI that uses websites with no API, via Chrome | Find a car on OLX | Last resort when no API exists |
| **Open source, GitHub, repository, stars, forks** | Free code others built and tested; GitHub is developers' YouTube | Twenty CRM, Postiz, ERPNext | Search open source before paying for custom builds |
| **System prompt** | Standing instructions an agent always follows | Kit 3 B rewritten by Claude | The job description of your agent |
| Escalation | When the agent hands a case to a human | Kit 3 B.6 | Where most agent failures are prevented |
| Subagent / reviewer agent | A separate agent with its own context, e.g. one that checks the first | Finance-news subagent; code reviewer | Puts the "agent never checks itself" rule into practice |

### Instructor demos

1. **Read an API doc with Claude.** Paste Click's API docs link: "Explain like I'm 5, then tell me what I need from Click to connect."
2. **Lead form end to end.** A landing page form → Google Sheets row → Telegram message, built in plan mode.
3. **Connector in Claude.** Google Calendar connector creates a meeting from one sentence.
4. **Open source first.** Find Twenty CRM on GitHub; agent team (CRM expert, business analyst, developer) debates if it fits a 20-branch phone retailer.
5. **Kit 3 to system prompt.** Run the Kit 3 prompt on a sample Kit 3 A + B; show the rewritten system prompt and the escalation cases it found.

### Hands-on practice (on their own laptops)

| # | Exercise | Steps | Done when |
| --- | --- | --- | --- |
| 1 | Kit 3 A | Write every step of the chosen process; fill today / tomorrow / checks / decides / responsible | No empty cells; one real case from last week walked through |
| 2 | Kit 3 B | Fill B.1-B.10; run /kit3 (or the Kit 3 prompt) | `instructions.md` with sources, limits, escalation |
| 3 | API check | For each system in B.3, ask Claude: "Does X have an API or MCP? What do I need?" | A list: system → API / MCP / export only / none |
| 4 | Keys done right | Put bot token and OpenRouter key in `.env`; confirm `.env` is not shared | Claude reads keys from `.env`, never from chat |
| 5 | Connector | Enable one connector in the Claude app (Calendar, Drive, or Canva) and use it once | One real action done through a connector |
| 6 | Agent v0 | Plan mode with instructions.md as the PRD → task list → build; connect Telegram plus at least one data source. An export file (Excel, CSV, Telegram JSON) counts when the system has no API or the vendor will not give a key | v0 runs on your laptop on 3 real past cases |
| 7 | Reviewer | Add a subagent or second step that checks v0's output against instructions.md | Reviewer catches at least one planted mistake |

### Kit 3 integration: Redistributing the work

| Form | Done in class | Done as homework |
| --- | --- | --- |
| A: Process steps, today and tomorrow (A.1-A.8) | Full draft with mentor | Check against one real case from last week |
| B: Agent instructions (B.1-B.10) | Drafted and rewritten into a system prompt by Claude Code | Shown to the employees who will work with the agent; all exceptions added to B.6; signed and dated |

### Homework

1. Show `instructions.md` (Kit 3 B) to the employees involved.
   Add every exception they name to B.6.
2. Finish agent v0 with mentor support in the group chat.
   Test on at least 5 real past cases.
3. Collect 3 good and 3 bad real examples of the process output.
   These become Kit 4 B.4 training examples and the agent's test set.
4. Buy a VPS and a domain, following the setup video, and ask Claude Code to log in to the VPS once.
   Send the access details to nobody; keep them in `.env`.
5. Finish the live part of the baseline, if your process had no history to pull from.

### Mentor check at the start of Day 4

- [ ] Kit 3 A has no empty cells; B signed with exceptions from staff
- [ ] v0 runs locally on real cases
- [ ] 3 good + 3 bad examples saved
- [ ] VPS and domain purchased, and Claude Code has logged in to the VPS at least once
- [ ] Baseline complete

## Day 4: Ship it, prepare the people, plan the pilot

Participants move their agent from the laptop to a server that runs 24/7, write the pilot plan (Kit 5 A), and prepare the staff conversation (Kit 4) so the pilot can go live this week.

In 2.0 deployment and domains were pushed to a post-course webinar.
In 3.0 they are a full session, because a tool that dies when the laptop closes is not a business tool.

### Learning outcomes

- Explain local vs server, VPS, domain, DNS, and HTTPS in plain words.
- Deploy their agent to a VPS with Claude Code as the builder, reachable by domain or Telegram.
- Use Git and GitHub as backup and undo.
- Write a pilot plan with one numeric goal, scope, limits, success criteria, and a stop condition.
- Map each affected employee's strongest skill to a new role and run a 15-minute change conversation.

### Run of show (180 min)

| Time | Segment | What happens | Format |
| --- | --- | --- | --- |
| 0:00-0:20 | v0 round | Each table: 1-minute demo of v0 on a real case; mentors note blockers and anyone who cannot log in to their VPS | Tables |
| 0:20-0:50 | Where software lives | Local vs server; VPS vs Mac mini; domain, DNS, HTTPS; Git as undo; logs. Links back to Day 1: this is the infrastructure layer, now your own | Talk + demo |
| 0:50-1:40 | Deploy the pilot | Claude Code connects to the VPS, deploys the agent, connects the domain or bot, keys in server `.env`; test from the phone | Hands-on |
| 1:40-1:50 | Break |  |  |
| 1:50-2:20 | Kit 5 A: pilot plan | One numeric goal, dates, scope, can / cannot, success, stop condition, who checks, weekly review slot | Hands-on |
| 2:20-2:50 | Kit 4: people | Skills map (A); training task (B) built on the 3 good / 3 bad examples; role-play the 15-minute conversation in pairs | Pairs |
| 2:50-3:00 | Homework | Conversations, then go-live with limited permissions | Talk |

### Concepts and terminology

| Term | Plain explanation | Analogy or live demo | Why an owner cares |
| --- | --- | --- | --- |
| **Local vs server** | Local runs on your laptop; a server runs always, somewhere else | Close the laptop: the local bot dies | Business tools must not depend on your laptop |
| **VPS** | A rented computer in a data center, yours alone | Renting an apartment vs buying a house (Mac mini) | About 200,000 so'm per month vs $600-800 upfront plus power and internet |
| SSH | A secure line from your laptop to the server | Claude Code "walks into" the server | You never need to learn the commands |
| **IP address, domain, DNS** | The server's number, its human name, and the phone book that links them | sodiqschool.uz → 185.x.x.x | Customers need a name, not a number |
| Subdomain | A sub-address on your domain | media.yourcompany.uz | One domain, many tools |
| HTTPS / SSL | The lock icon: encrypted traffic | Show the padlock | Forms without it look untrustworthy |
| Nginx / reverse proxy | The receptionist that sends each visitor to the right app | ELI5 it with Claude live | Recognize the word in a developer's quote |
| Uptime | How often the service is up | 24/7 bot | What you pay a server for |
| **Git, commit, push** | Save points of your code, and sending them to GitHub | Undo a broken change | Never lose a working version |
| Private vs public repository | Who can see the code | Keys must never be in a public repo | Robin Hood key-stealing is real |
| Server environment variables | The server's own `.env` | Keys copied to the server, not to GitHub | Same safety rule, new place |
| Logs | The server's diary of what happened | Read the last 20 lines with Claude | First place to look when something breaks |
| Staging vs production | A test copy vs the live one | Test on staging, then switch | Staff see only the working version |
| Rollback | Going back to the last good version | Rewind a bad deploy | Mistakes are cheap if undo is easy |
| Remote control | Steer a running Claude Code session from your phone | Ask "done yet?" from the car | Work continues while you are away |
| **Pilot** | A limited, time-boxed real test | 2-4 weeks, one department | Learn cheaply before rolling out |
| Baseline | The numbers before the agent | Kit 5 B "Agentgacha" column | Without it you have only an impression |
| **Success criteria / stop condition** | What counts as working, and what ends the test immediately | "Two wrong numbers in the boss's report = stop" | Protects customers and money |
| Limited permissions | Week one: agent drafts, human approves | No sending, no payments | Trust is earned in steps |
| **Upgrade, not replace** | Freed time goes to higher-value work | Dilnoza: from copying Excel to sales analyst | Fear makes staff hide the real process |

### Instructor demos

1. **The laptop test.** Close the laptop; the local bot stops answering.
   Then show the same bot on a VPS answering from a phone.
2. **Deploy in plain words.** "Here are my VPS details in .env. Deploy this agent, connect bot X, set it to restart if it crashes."
3. **Domain.** Point a subdomain at the VPS and get HTTPS.
4. **Rollback.** Break the bot on purpose, then return to the last commit.
5. **The Dilnoza conversation.** Instructor role-plays the 15-minute Kit 4 talk with a mentor playing a worried employee.

### Hands-on practice (on their own laptops)

| # | Exercise | Steps | Done when |
| --- | --- | --- | --- |
| 1 | GitHub backup | Ask Claude Code to create a private repo and push the pilot code | Code visible in your private GitHub repo, no keys in it |
| 2 | Deploy | Give Claude Code the VPS details from `.env`; deploy the agent; enable auto-restart | Agent answers from your phone with the laptop closed |
| 3 | Domain or bot | Connect a subdomain with HTTPS, or confirm the Telegram bot runs from the server | Public address or bot works |
| 4 | Logs | Ask Claude to show and explain the last 20 log lines | You can say what the agent did last |
| 5 | Kit 5 A | Fill A.1-A.9 with the mentor; keep the goal to one number ("from 60 to 10 minutes a day") | Plan saved in `kit5-pilot/plan.md` |
| 6 | Kit 4 A | List each affected employee: strongest skill (real example), today's job, new role, new checking task, training needed | Skills map saved |
| 7 | Kit 4 B | One training task per employee using the 3 good / 3 bad examples; run the Kit 4 prompt | Training task with criteria and a 2-week measure |
| 8 | Role-play | Practice the 15-minute talk in pairs: what changes, what stays, what they now check | Each partner has heard and answered one worry |

### Kit integration

| Kit | Form | Done in class | Done as homework |
| --- | --- | --- | --- |
| Kit 4: New roles | A: Skills map | Drafted per affected employee | Checked with the department head |
| Kit 4: New roles | B: Training task | Drafted with real good/bad examples | The 15-minute conversation with each employee; worries recorded in B.8, agreement in B.9 |
| Kit 5: Pilot | A: Pilot plan | Filled A.1-A.9 | Agreed with the department head before go-live |
| Kit 5: Pilot | B: Pilot numbers | "Agentgacha" column from the baseline | Week 1 column starts |

Order matters: the Kit 4 conversation happens **before** the agent is switched on, never after.

### Homework

1. Hold the Kit 4 conversation with each affected employee.
   Record worries and agreements.
2. Go live with limited permissions: the agent drafts, a human approves every output.
3. Log every agent mistake in Kit 5 B.13: date, what happened, who found it, what we changed.
4. Fill the week 1 column of Kit 5 B.

### Mentor check at the start of Day 5

- [ ] Agent runs on the VPS, not the laptop
- [ ] Code in a private repo, no keys committed
- [ ] Kit 5 A agreed; Kit 4 conversations held before go-live
- [ ] Pilot live at least 4 working days, error log has entries
- [ ] Week 1 column of Kit 5 B filled

## Day 5: Agents that work while you sleep, and get better

Participants use one week of real pilot mistakes to improve their agent, then add scheduled reports, escalation paths, and the security rules every owner must enforce.

The always-on assistant (Hermes) is taught here as a business job (a 9:00 report, an escalation), not as the "Jarvis" hype.
In 2.0 the hype framing raised "Gemini already does this."

### Learning outcomes

- Explain the difference between a builder (Claude Code) and an always-on assistant agent.
- Run the improvement loop: error log → instruction change → test against good/bad examples → redeploy.
- Add a scheduled job (cron) and escalation paths from Kit 3 B.6.
- Name the main AI security risks and the rules that prevent them.
- Spot data governance problems that break agents (one customer, three names).

### Run of show (180 min)

| Time | Segment | What happens | Format |
| --- | --- | --- | --- |
| 0:00-0:30 | Pilot week 1 review | Each table: Kit 5 B week 1 column + error log; one participant per table presents the worst mistake and its fix | Tables |
| 0:30-1:00 | Kinds of agents | Builder vs assistant; proactive agents; memory files; cron; human in the loop; multi-agent | Talk + demo |
| 1:00-1:40 | The improvement loop | Turn each error log entry into an instruction change; test against the 3 good / 3 bad examples; redeploy | Hands-on |
| 1:40-1:50 | Break |  |  |
| 1:50-2:30 | Schedules and escalation | Add a daily report to the owner's Telegram; build B.6 escalation paths; optional always-on assistant | Hands-on |
| 2:30-2:50 | Security and data governance | Prompt injection, skill and MCP scanning, bot locked to user ID, what agents must never do, master data | Talk + checklist |
| 2:50-3:00 | Homework | Pilot week 2 | Talk |

### Concepts and terminology

| Term | Plain explanation | Analogy or live demo | Why an owner cares |
| --- | --- | --- | --- |
| Agent | Software that takes a goal and does several steps on its own | The pilot itself | Not a robot with arms; a sequence of decisions |
| **Builder vs assistant** | Claude Code builds and fixes; an assistant (Hermes) lives in Telegram and serves you daily | Builder = construction team; assistant = secretary | Use the builder to set up and repair the assistant |
| Proactive agent | Acts on a schedule or event without being asked | Morning sales summary at 9:00 | Information comes to you |
| **Cron job** | A task set to run at a fixed time | "Every day at 9:00" | Most business value is scheduled, not chatted |
| Memory files | soul.md (who the agent is), agents.md (business rules), user.md (about you), memory.md (what happened) | Show the folder | Behavior is set in plain text you can edit |
| Memory limits | Small memory forgets old details on purpose | Like a person with a notebook | Big memory = slower and costlier |
| Human in the loop | A person approves before the action counts | Dilnoza checks the morning report | Keeps errors away from customers |
| **Escalation path** | Case → who gets it → how | Unknown format → Dilnoza; ±40% anomaly → finance head; no file by 10:30 → reminder | Prevents silent wrong answers |
| **Test set (evals)** | Real examples with known right answers, run after every change | The 3 good / 3 bad examples | You know a fix did not break something else |
| Few-shot examples | Good examples placed in the instructions | Add 3 correct reports to instructions.md | Fastest way to improve output |
| Regression | A fix that breaks something that worked | Re-run the test set | Why every change gets tested |
| Guardrails and permissions | What the agent may and may not do | Kit 3 B.4 / B.5 | Never: move money, message customers in your name, delete data |
| Model per agent | Each agent can use a different model, frontier or open-weight | Uzbek writer on Gemini, coder on Opus, sorting on a cheap open-weight model | Quality where it matters, savings elsewhere |
| Multi-agent / profiles | Several specialized agents behind one assistant | Accountant, content, support | Grows with the business; start with one |
| **Prompt injection** | Hidden instructions in a file, page, or skill that hijack the agent | A skill that searches for API keys | Only trusted sources; scan before installing |
| Bot lockdown | The bot answers only your Telegram user ID | Message it from another account | Strangers cannot use your agent |
| **Data governance / master data** | One record per customer, product, supplier across systems | "Umidjon aka", "Umidjon sinfdosh", "U. Karimov" in three systems | Agents fail on messy data before they fail on intelligence |
| Audit trail | What the agent did, when, why (Kit 3 B.7) | Read the log | Accountability when something goes wrong |
| Text-to-speech / speech-to-text | Voice in, voice out | Voice report in the car | Useful for owners on the move; optional |

### Instructor demos

1. **Error log to fix.** Take a real participant's error (e.g. VAT left out of a total), change instructions.md, re-run the test set, redeploy.
2. **Morning report.** "Every day at 9:00, send me yesterday's numbers and anything unusual" set up as a cron job.
3. **Escalation.** An empty Excel arrives; the agent sends it to the responsible person instead of writing zero.
4. **Always-on assistant.** Hermes on the VPS, talking through Telegram, with its own memory files; Claude Code used to install and connect it.
5. **Injection.** A document with a hidden instruction; show the agent following it, then the rule that stops it.

### Hands-on practice (on their own laptops)

| # | Exercise | Steps | Done when |
| --- | --- | --- | --- |
| 1 | Improvement loop | For each Kit 5 B.13 entry: change instructions.md, add a test case, re-run all tests, redeploy | All tests pass; B.13 "what we changed" filled |
| 2 | Few-shot | Add 2-3 correct real outputs to the instructions | Output format matches the good examples |
| 3 | Scheduled report | Add a daily or weekly report to your own Telegram | First scheduled message received |
| 4 | Escalation paths | Implement every B.6 case: condition → person → channel | Each case tested once with a fake input |
| 5 | Lockdown | Confirm the bot ignores unknown users | Test from a second account fails |
| 6 | Security checklist | Keys only in .env; no public repo; skills and MCPs scanned; spending limits set; agent cannot pay, send to customers, or delete | All boxes ticked with the mentor |
| 7 | Data check | List the names your pilot uses for the same customer or product across systems | A mapping table, or a note that data is clean |

### Kit 5 integration: Pilot, week 1

| Form | Done in class | Done as homework |
| --- | --- | --- |
| B: Pilot numbers, week 1 | Reviewed against the baseline at the table | Week 2 column |
| B.13: Error log | Each entry turned into a fix | Keep logging |
| B.7: Staff checking time | First reading: is checking time falling? | Track daily |
| Permissions | Decide: still draft-only, or loosen one step | Apply only what was agreed |

### Homework

1. Run pilot week 2 with the improved agent.
2. Fill the week 2 column of Kit 5 B, including staff checking hours (B.7).
3. Add costs: subscriptions (B.9), setup (B.10), checking hours × hourly rate (B.11).
4. Note any money the pilot found: errors caught before they cost, requests no longer lost, cash collected sooner.
5. Prepare a 3-minute demo: the process, before/after, what broke, the decision you expect.

### Mentor check at the start of Day 6

- [ ] Week 2 numbers filled, costs filled
- [ ] Error log shows fixes, and the test set passes
- [ ] Scheduled report and escalation paths working
- [ ] Security checklist complete
- [ ] Demo ready

## Day 6: Results, decisions, and demo day

Participants calculate what their pilot really changed in time, money, and errors, decide to continue, change, or stop, and present it.
They leave with a plan for process #2 and the judgment to evaluate any AI vendor.

This is where the McKinsey point from Day 1 lands with their own numbers.
About 80% of companies use AI for efficiency, yet only 37% see any profit effect.
The roughly 6% "high performers" also use AI to grow, and nearly three-quarters of them redesign the work instead of bolting AI onto the old process, against one-quarter of everyone else.
(McKinsey, State of AI 2026: a global survey, many respondents at large firms; a direction, not a measurement of Uzbek SMEs.)

### Learning outcomes

- Calculate the change against baseline, including all costs and checking time.
- Make and defend a continue / change / stop decision.
- Explain why redesigning a process beats bolting AI onto the old one.
- Decide build vs buy vs open source, and evaluate a vendor's AI offer.
- Pick the next process from their own matrix.

### Run of show (180 min)

| Time | Segment | What happens | Format |
| --- | --- | --- | --- |
| 0:00-0:40 | Kit 5 B final | Fill the change column, total costs, cost per completed task, money found; run the Kit 5 prompt; decision with mentor | Hands-on |
| 0:40-1:10 | AI that shows up in profit | Cut vs grow; redesign vs bolt-on; freed hours to R&D and analysis (Dilnoza becomes a sales analyst); scaling to process #2 | Talk |
| 1:10-1:30 | Buying AI wisely | Build vs buy vs open source; frontier vs open-weight on cost and data; vendor checklist; what a fair price looks like | Talk + checklist |
| 1:30-1:40 | Break |  |  |
| 1:40-2:20 | Demo round 1: tables | Every participant presents 3 minutes at their table; table picks one for the stage | Tables |
| 2:20-2:50 | Demo round 2: stage | One per table, 3-4 minutes each, Q&A from the room | Stage |
| 2:50-3:00 | Graduation | Certificates; 1 month mentor support; AI Community; process #2; short video testimonials | Talk |

### Concepts and terminology

| Term | Plain explanation | Analogy or live demo | Why an owner cares |
| --- | --- | --- | --- |
| **Baseline and delta** | Before vs after, as numbers | 60 → 9 minutes a day; 3 → 0 errors a week | The only honest proof of value |
| **Cost per completed task** | All costs ÷ tasks fully done | Subscriptions + setup + checking hours ÷ reports produced | Compares agent vs human fairly |
| Total cost of ownership | Subscription + integration + checking time + maintenance | Kit 5 B.9-B.12 | Cheap models can cost more if they need more checking |
| **Money found** | Money the pilot brought in or protected: errors caught before they cost, requests no longer lost, cash collected sooner | "3 wrong invoices caught this month" | At local wages, saved hours alone are often small next to the tool's monthly cost; money found is usually the line that convinces partners |
| **ROI** | Value gained vs cost, over a period | Hours saved × hourly rate, plus money found, vs monthly cost | Language for the board and partners |
| **Continue / change / stop** | The three honest outcomes of a pilot | Stop if numbers in the boss's report are still wrong after 3 weeks | Knowing when to pull the plug |
| Process redesign | Rebuild the process around what AI can do, not insert AI into each old step | Nine steps → seven agent, two human | Where real gains come from |
| Cut vs grow mindset | Same output with fewer people vs more output with the same people | 14 days of import → 11 days | Growth, not only efficiency, is what the high performers pursue |
| Scale-out | Moving from one process to the next | Next dot in the top-right of the matrix | Compounding value |
| **Build vs buy vs open source** | Custom build, a vendor product, or a free tested project adapted with Claude Code | Twenty CRM vs custom CRM | Spend where you are unique |
| Vendor lock-in | Being stuck on one provider's models or data | A closed assistant you cannot add models or MCPs to | Prefer tools with API, MCP, and model choice |
| Data handling / NDA | Where your data goes and who may see it | Which provider stores chats; Meta's data record | Protect customers and trade secrets; check which country the data lands in (Day 1) |
| Software as Excel | Custom tools becoming as common as spreadsheets | Excel once cost $50,000 to teach | Your team will build its own tools |

### The vendor checklist

Used when someone offers to "build you an AI agent" or a "personal Jarvis" (market price in Uzbekistan: $2,000-5,000).

| Question | Good answer | Red flag |
| --- | --- | --- |
| Which process, and what is the baseline? | A specific process with numbers | "AI for the whole company" |
| How will we measure success, and when do we stop? | Kit 5-style goal and stop condition | No numbers, only demos |
| Which models, and can we switch? | Named models, switchable, open-weight considered for routine steps | One locked model |
| Does it have API / MCP access to our systems? | Yes, named systems | Copy-paste or screenshots only |
| Where is our data stored, who sees it? | Clear answer, in writing, with the country | Vague |
| Who checks the agent's work, and how? | A human checkpoint and logs | "It doesn't make mistakes" |
| Is there an open-source option? | Considered and compared | Never heard of it |
| What does it cost per month after launch? | Subscription + maintenance + checking time | Only the setup fee |

### Hands-on practice (on their own laptops)

| # | Exercise | Steps | Done when |
| --- | --- | --- | --- |
| 1 | Final numbers | Fill the change column of Kit 5 B; sum costs B.9-B.12; add the money-found line | Every row has before, week 1, week 2, change |
| 2 | Cost per task | Divide total cost by completed tasks; compare with the human-only cost from baseline | One number for agent, one for human |
| 3 | Decision | Run the Kit 5 prompt; compare with success criteria and stop condition | Continue / change / stop ticked, reason in one sentence |
| 4 | Next process | Open the Kit 2 matrix; pick process #2; draft its Kit 1 interview list | Process #2 named, interviewees named |
| 5 | Demo | 3 slides or 3 minutes: process, before/after, what broke and how you fixed it, decision | Presented at the table |

### Kit 5 integration: Pilot results

| Form | Done in class | After the program |
| --- | --- | --- |
| B: Pilot numbers | Final change column, costs and money found | Weeks 3-4 if the pilot continues |
| B: Decision | Continue / change / stop with reason | Review with the department head |
| Kit 4 B.6: Employee growth | First 2-week check of the training task | Adjust criteria, plan next skills |

### After the program

- 1 month of mentor support in the group chat, any time of day.
- AI Community access with alumni of Praktikum 1.0 and 2.0.
- One or two online webinars on topics that surfaced during the cohort.
- Process #2 run with the same five kits; the company folder and skills already exist.
- Short video testimonials recorded on Day 6, honest and specific: what was built, what changed.

## Across the program

### Habits woven through every session

These are not lessons.
They are introduced once and reinforced every time a participant gets stuck.

| Habit | What the participant does | Introduced | Reinforced |
| --- | --- | --- | --- |
| Imagine there is no AI | Before asking, name who would do this job and how | Day 2 | Every build: PRD roles, agent teams |
| Interview me | Ask Claude to question you before it answers | Day 1 (Kit 1 is the human version) | Plan mode, every PRD |
| Screenshot and ask | Stuck? Screenshot the error, ask Claude first | Day 2 | Every session; mentors redirect questions here |
| Show your work | Ask for the formula, source, or log line | Day 1 | Kit 2 scores, Kit 5 numbers |
| Three critics | Review an idea as a skeptical investor, a cynical customer, a crushing competitor | Day 3 (agent team demo) | Day 6 decision |
| Exclude the default | Tell the model what not to suggest | Day 1 | Ideas for process #2 |
| Iterate three times | Judge only after the third round | Day 1 | Every build |
| Explain like I'm 5 | Ask for any new term in simple words | Day 2 | Day 3-4 jargon (Nginx, DNS) |
| New task, new chat | Keep context lean | Day 1 | Claude Code sessions, /compact |
| Open source first | Search GitHub before building or buying | Day 3 | Day 6 vendor checklist |

### Kept from 2.0, and where it moved

3.0 keeps most of what 2.0 taught.
It moves each topic to the day the participant's own build needs it, and cuts the time spent on lists.

| 2.0 topic (day) | In 3.0 |
| --- | --- |
| Three-layer AI cake, chips, data centers (Day 1) | Day 1, 15 minutes after the first build, tied to where data goes and why prices move |
| How LLMs work, tokens, Uzbek token cost, input vs output (Day 1) | Day 1, each shown live |
| Context window, "lost in the middle", memory (Day 1) | Day 1 (the dastarxon); memory files on Day 5 |
| 2026 models, closed vs open (Day 1) | Day 1 as frontier vs open-weight, with a live side-by-side; model names on the dated sheet |
| Hallucination, RAG, NotebookLM on company documents (Day 1) | Day 1, 25 minutes, on their own documents |
| Claude chat vs Cowork vs Claude Code; CLAUDE.md and memory setup (Day 2) | Day 2, on the company folder |
| Lead form → Google Sheets → Telegram (Day 2 build) | Day 3 instructor demo; participants build their own pilot instead |
| Skills, plugins, connectors, MCP (Day 3) | Skills on Day 2; MCP and connectors on Day 3 |
| Plan mode, team of agents (Day 3) | Plan mode and PRD on Day 2; agent team and reviewer on Day 3 |
| GitHub, domain, DNS, SSL, deploy (Day 3) | Day 4, deployed to a VPS instead of Vercel, because the pilot is an agent that must run 24/7 |
| Hermes, Soul.md, User.md, Memory.md, loops (Day 4) | Day 5, as a business job (scheduled report, escalation) |
| Open-source alternatives, self-hosting (Day 4) | Day 3 (open source first) and Day 6 (build vs buy) |
| The five kits (Day 4 handout) | Spread across all six days, run on their own company |

### Cut from 2.0, and why

| Item | Decision | Reason |
| --- | --- | --- |
| Chips, TSMC, ASML, export bans, data-center cooling | 15 minutes on Day 1, after the first build | 90 minutes of it did not change behavior and lost the room |
| NotebookLM as a standalone lesson | 25 minutes on Day 1, tied to company documents and Kit 1 transcripts | The Huberman demo did not land |
| Media tool tours (Higgsfield, Magnific, Remotion, Hyperframes, voice emotions) | Demo only if a participant's pilot needs it | Lists, not systems |
| Postiz, Composio, Paperclip, Multica | One-line mentions on Day 3 or 5 | Too early for first builds |
| Hermes as "your own Jarvis" | Reframed as a business job on Day 5 | Participants asked why not just use Gemini |
| Domains and deployment as a later webinar | Full session on Day 4 | Builders need tools that run without their laptop |
| 5-kit walkthrough at the end | Spread across all six days on their own business | Value came too late and was never built |

### Changes to the kit handout for 3.0

| Kit | Change |
| --- | --- |
| All | Relabel "Praktikum 3.0"; ship each form as .md plus a matching skill (/kit1 to /kit5), not only PDF |
| Kit 1 | Homework scale: 2-3 employees instead of 3-5; add a fallback for solo owners and managers (interview yourself or your department head) |
| Kit 1 | Add a first step: the owner tells the team why the interviews happen, before any interview |
| Kit 1 | Step 3: add an explicit check of every number in the transcript, with the "bir uch-to'rt yuz ming" example |
| Kit 3 | Note under B.3: each source listed here needs an API, MCP, export, or manual step; mark which |
| Kit 4 | Note: the good / bad examples in B.4 are also the agent's test set |
| Kit 5 | Split the order for weekly sessions: baseline starts after Day 2 (from history where it exists); Form A is filled on Day 4 |
| Kit 5 | Add a "money found" line to Form B next to the hours |

### Mentor rhythm (every session)

| When | Mentor does |
| --- | --- |
| First 20 minutes | Checks the previous kit and build at the table, using that day's checklist |
| Hands-on blocks | Unblocks by asking "did you screenshot it and ask Claude?" before helping |
| Last 10 minutes | Confirms each participant knows their homework and the next blocker |
| Between sessions | Answers in the group chat; flags anyone more than one kit behind to the instructor |

### Open decisions

- [ ] **Pilot length.** Day 4 to Day 6 gives about 2 weeks, the minimum Kit 5 allows.
  Accept it, add a 2-week gap before Day 6, or make demo day a seventh session?
- [ ] **Subscription prerequisite.** Pro is enough for Days 1-2; Max is safer from Day 3.
  Require Max, or recommend it?
- [ ] **Demo format.** With 40 per group, a stage slot for everyone takes about 3 hours.
  Two rounds (table, then stage) are assumed here.
- [ ] **Always-on assistant.** Keep Hermes on Day 5 as an optional business job (this draft), or make it core for everyone (the answer given on 19 October before this draft), or replace it with scheduled tasks inside the pilot itself?
- [ ] **Who buys the VPS.** This draft: each participant, before Day 4, with a setup video.
  Risk (head-mentor review): 80 separate orders, activation waits and root passwords passed around in Telegram; 1.0 dropped its VPS exercise because owners had no card at hand.
  Mitigations already in: the Day 3 homework login test and the Day 4 mentor check.
  Alternative: the course buys the servers in bulk and hands over the logins.
- [ ] **Price and group size.** Same as 2.0 ($3,000, two groups of 40, 1 mentor per 5), or adjusted for six sessions?
- [ ] **Uzbek version.** Translate this curriculum and the participant-facing parts after the English version is approved.

### What changed from the REALITY draft

| Where | Change | Why |
| --- | --- | --- |
| Overview | Added "Three threads: understand, build, apply" and a thread column on the outcomes | Makes the three goals for owners visible on page one |
| Outcome 4, Day 3 exercise 6 | "At least 2 sources" became "Telegram plus at least one business data source"; an export counts when there is no API | REALITY's outcome (2 sources) and definition of done (1 real system) disagreed; 1C installers often refuse to hand over API keys |
| Format, prerequisites | Dates added; the pre-Day 1 setup call became the Week 0 call (it was an open decision) | 1.0 setup time fell from 11% to 3% of class only when installs moved out of class |
| Day 1 run of show | "How AI works" split into "Where AI lives" (15 min) and "How a model works" (35 min); NotebookLM 30 → 25 min | Infrastructure and frontier vs open-weight are named goals; one slide was too little |
| Day 1 terms and demos | Added "Data center, GPU, compute", "Where your data goes", "Frontier vs open-weight" with a live side-by-side; "Uzbek is about 30% more tokens" replaced by "measure it live"; "open models are enough for 90% of tasks" softened | The ratio differs by model and 2.0 quoted a different one; the 90% figure has no source |
| Day 1, Day 6 | McKinsey figures corrected: 80% of respondents report better productivity, 37% of companies any profit effect, 6% are high performers | REALITY read 37% as "profit stays flat" and tied the 37%/6% split to cutting headcount, which the survey does not say |
| Kit 1 | The owner tells the team before any interview | Fear starts at the first interview; one message from the owner prevents hidden work |
| Day 2 homework, Kit 5 | Baseline pulled from history (Telegram, Excel, CRM) where it exists; live recording only where it does not | More weeks of data, less self-reporting, and it uses Claude Code on real exports |
| Day 3 homework, Day 4 check | VPS login tested before Day 4 | Turns "purchased" into "works" before the 50-minute deploy block |
| Day 5 homework, Day 6, Kit 5 | "Money found" line next to hours | Hours × local wages often barely cover the tool's cost; partners ask "how much money?" |
| Terminology tables | 5-8 bold terms per day are taught live; the rest are a glossary | REALITY lists 12-20 terms per day; 2.0 Day 3 morning had about 14 concepts and 7 demos, and visible hands-on was about 3% of that day |
| Across the program | Added "Kept from 2.0, and where it moved" | Shows that 3.0 stays close to 2.0 |
