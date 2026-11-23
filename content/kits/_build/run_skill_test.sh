#!/bin/bash
# Run one headless Claude Code turn in a test company folder, the way a participant would type it.
# Usage: [MODEL=sonnet|haiku|opus] [TODAY=YYYY-MM-DD] run_skill_test.sh <company-dir> <out-name> <prompt> [session-id-to-resume]
# TODAY simulates the course calendar for worked examples: it is appended to the system prompt with the company CLAUDE.md.
# CLAUDE.md auto-discovery is switched off so the parent 01_MD and personal CLAUDE.md files do not leak in;
# the company CLAUDE.md is passed explicitly instead, which is what a participant's session sees.
set -u
DIR="$1"; OUT="$2"; PROMPT="$3"; RESUME="${4:-}"
cd "$DIR" || exit 2
SYS=CLAUDE.md
if [ -n "${TODAY:-}" ]; then
  SYS="../.$OUT.system.md"
  { cat CLAUDE.md; printf '\n## Sana\n\nBugungi sana: %s. Sanalarni shu kunga nisbatan tekshiring.\n' "$TODAY"; } > "$SYS"
fi
ARGS=(-p "$PROMPT" --append-system-prompt-file "$SYS" --setting-sources project,local --permission-mode acceptEdits --output-format json)
if [ -n "$RESUME" ]; then ARGS+=(--resume "$RESUME"); fi
if [ -n "${MODEL:-}" ]; then ARGS+=(--model "$MODEL"); fi
CLAUDE_CODE_DISABLE_CLAUDE_MDS=1 CLAUDE_CODE_DISABLE_AUTO_MEMORY=1 claude "${ARGS[@]}" > "../$OUT.json" 2> "../$OUT.err"
echo "exit=$?"
python3 - "../$OUT.json" <<'PY'
import json, sys
d = json.load(open(sys.argv[1]))
print("session:", d.get("session_id"), "turns:", d.get("num_turns"), "models:", list((d.get("modelUsage") or {}).keys()))
print(d.get("result", ""))
PY
