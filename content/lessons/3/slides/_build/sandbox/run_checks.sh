#!/usr/bin/env bash
# Day 2: run the class prompts through the real Claude Code CLI in throwaway folders.
# Each check copies the Baraka Office example into a fresh temp folder (outside the
# project tree, so no parent CLAUDE.md leaks in), runs one headless `claude -p`,
# and saves the transcript and the files Claude wrote to ./out/<check>/.
# Usage: bash run_checks.sh [a b c d e]     (default: all)
# Needs: Claude Code logged in (uses the owner's plan; each check is one short run).
set -u
HERE="$(cd "$(dirname "$0")" && pwd)"
DAY2="$(cd "$HERE/../.." && pwd)"
BARAKA="$DAY2/company-folder-starter/baraka-office/kompaniya"
STARTER="$DAY2/company-folder-starter"
PROMPTS="$HERE/prompts"
OUT="$HERE/out"
WORK="$(mktemp -d)"
KIT1_PROMPT="$(python3 - "$DAY2/../kits/KIT_01_Ish_qayerga_ketyapti_UZ_LATN.md" <<'PY'
import sys, re
s = open(sys.argv[1], encoding="utf-8").read()
part = s.split("## AI chat uchun so‘rov", 1)[1]
print(re.search(r"```text\n(.*?)```", part, re.S).group(1).strip())
PY
)"
mkdir -p "$OUT"
checks="${*:-a b c d e}"
EXTRA=()

base_copy() {  # $1 = target; Baraka Kit 1 files and documents, no CLAUDE.md, no Kit 2 output
  mkdir -p "$1/kit1-interviews" "$1/kit2-scoring"
  cp "$BARAKA"/kit1-interviews/*-form-b.md "$1/kit1-interviews/"
  cp -R "$BARAKA/hujjatlar" "$1/"
  cp "$STARTER"/kompaniya/kit2-scoring/*.md "$1/kit2-scoring/"
}

run() {  # $1 check, $2 dir, $3 model, $4 mode, $5 prompt
  local log="$OUT/$1/transcript.txt"
  mkdir -p "$OUT/$1"
  echo "== $1 | model $3 | mode $4 | $(date '+%Y-%m-%d %H:%M') | claude $(claude --version 2>/dev/null)" > "$log"
  echo "== prompt:" >> "$log"; printf '%s\n' "$5" >> "$log"; echo "== output:" >> "$log"
  touch "$2/.stamp"; sleep 1
  # --setting-sources project,local: leave out the machine owner's personal settings
  # (output style, global CLAUDE.md), so the run looks like a participant's laptop.
  (cd "$2" && claude -p "$5" --model "$3" --permission-mode "$4" --setting-sources project,local ${EXTRA[@]+"${EXTRA[@]}"} >> "$log" 2>&1)
  echo "== exit $?" >> "$log"
  (cd "$2" && find . -type f -newer .stamp ! -name .stamp | sort) > "$OUT/$1/files-written.txt" 2>/dev/null
  rsync -a --exclude 'hujjatlar' --exclude '.stamp' "$2/" "$OUT/$1/folder/" 2>/dev/null
  # overnight folder rule: no em dash anywhere, so model output is normalised to a plain hyphen
  grep -rl $'\xe2\x80\x94' "$OUT/$1" 2>/dev/null | while read -r f; do LC_ALL=C sed -i '' $'s/\xe2\x80\x94/-/g' "$f"; done
}

for c in $checks; do
  d="$WORK/$c"; mkdir -p "$d"
  case "$c" in
    a) base_copy "$d"
       run a "$d" sonnet acceptEdits "/init" & ;;
    b) base_copy "$d"; cp "$STARTER/kompaniya/CLAUDE.md" "$d/"
       run b "$d" sonnet acceptEdits "/init" & ;;
    c) base_copy "$d"; cp "$BARAKA/CLAUDE.md" "$d/"
       run c "$d" sonnet acceptEdits "$(cat "$PROMPTS/c-kit2-scoring.txt" "$PROMPTS/c-suffix-headless.txt")" & ;;
    d) base_copy "$d"; cp "$BARAKA/CLAUDE.md" "$d/"; cp "$BARAKA"/kit2-scoring/* "$d/kit2-scoring/"
       run d "$d" opus plan "$(cat "$PROMPTS/d-plan-prd.txt" "$PROMPTS/d-suffix-headless.txt")" & ;;
    e) base_copy "$d"; cp "$BARAKA/CLAUDE.md" "$d/"; cp "$DAY2/demos/inputs/otabek-transcript.md" "$d/kit1-interviews/otabek-transcript.md"
       # Writing into .claude/ always needs the owner's approval (seen in the first run);
       # headless runs cannot click "Yes", so the approval is given as an allow rule.
       ( EXTRA=(--allowedTools "Edit(.claude/skills/**)")
         run e "$d" sonnet acceptEdits "$(cat "$PROMPTS/e-make-skill.txt")
$KIT1_PROMPT"
         EXTRA=()
         run f "$d" sonnet acceptEdits "/suhbat-tahlili kit1-interviews/otabek-transcript.md" ) & ;;
    g) base_copy "$d"; cp "$BARAKA/CLAUDE.md" "$d/"; cp "$DAY2/demos/inputs/otabek-transcript.md" "$d/kit1-interviews/"
       mkdir -p "$d/.claude/skills"; cp -R "$BARAKA/.claude/skills/suhbat-tahlili" "$d/.claude/skills/"
       # the skill as the participant has it after approving the write in check e
       run g "$d" sonnet acceptEdits "/suhbat-tahlili kit1-interviews/otabek-transcript.md" & ;;
    h|i) base_copy "$d"; [[ "$c" == i ]] && cp "$BARAKA/CLAUDE.md" "$d/"
       # Demo 4: the same question without (h) and with (i) CLAUDE.md, documents present in both
       run "$c" "$d" sonnet acceptEdits "Mijoz Telegram’da so‘radi: «Kafolat necha yil? Chirchiqqa yetkazib berish bepulmi?» Mijozga yuboriladigan javob matnini yoz va qaysi hujjatga tayanganingni alohida ayt." & ;;
    j) base_copy "$d"; cp "$BARAKA/CLAUDE.md" "$d/"
       # Demo 1: Claude Code compares the documents in the folder by itself
       run j "$d" sonnet acceptEdits "$(sed -n '/^hujjatlar\/ papkasidagi/p' "$PROMPTS/../../../prompt-pack.md" | head -1)" & ;;
  esac
done
wait
echo "done; work folder $WORK; results in $OUT"
