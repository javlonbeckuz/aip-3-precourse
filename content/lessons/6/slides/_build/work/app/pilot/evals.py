"""The agent's test set (Kit 4 B.4 good and bad examples), run after every change.

evals/test-set.toml holds the cases. Each case has a question and simple checks:
  kerak       - words or numbers the answer must contain (any spacing of numbers is fine)
  mumkin_emas - words or numbers the answer must NOT contain (taken from real bad answers)
  odamga      - true if the agent must hand this case to a person (Kit 3 B.6)
  mezon       - optional plain-language rule, checked by a second model with --judge

Run:  uv run pilot eval            (all cases, current model)
      uv run pilot eval --tier cheap
      uv run pilot eval --only narx-optima,chegirma-15
A report is written to runtime/evals/. Exit code 1 if any case fails, so a deploy can stop.
"""

from __future__ import annotations

import json
import re
import tomllib
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path

from .assistant import Answer, Assistant
from .sources import normalize

_NUM_GAP = re.compile(r"(?<=\d)[\s  ,.'](?=\d{3}(?!\d))")


def norm(text: str) -> str:
    """Lowercase, one apostrophe, Latin letters, and '1 450 000' == '1,450,000' == '1450000'."""
    text = normalize(text)
    prev = None
    while prev != text:  # repeat: each pass joins one gap per number group
        prev = text
        text = _NUM_GAP.sub("", text)
    return re.sub(r"\s+", " ", text)


@dataclass
class Case:
    id: str
    savol: str
    kerak: list[str] = field(default_factory=list)
    mumkin_emas: list[str] = field(default_factory=list)
    odamga: bool | None = None
    mezon: str = ""
    manba: str = ""


@dataclass
class Result:
    case: Case
    answer: Answer
    passed: bool
    reasons: list[str]


def load_cases(path: Path) -> list[Case]:
    raw = tomllib.loads(path.read_text(encoding="utf-8"))
    cases = []
    seen = set()
    for item in raw.get("test", []):
        if "id" not in item or "savol" not in item:
            raise ValueError(f"{path.name}: every [[test]] needs id and savol")
        if item["id"] in seen:
            raise ValueError(f"{path.name}: id '{item['id']}' is used twice")
        seen.add(item["id"])
        as_list = lambda v: [v] if isinstance(v, str) else list(v or [])  # noqa: E731
        cases.append(Case(
            id=item["id"], savol=item["savol"], kerak=as_list(item.get("kerak")),
            mumkin_emas=as_list(item.get("mumkin_emas")), odamga=item.get("odamga"),
            mezon=item.get("mezon", ""), manba=item.get("manba", ""),
        ))
    return cases


def check(case: Case, answer: Answer) -> list[str]:
    """Reasons the answer fails. Empty list = pass."""
    reasons = []
    if answer.status == "error":
        return [f"texnik xato: {answer.reason}"]
    if answer.status == "budget":
        return ["xarajat limiti tugagan"]
    handed = answer.status == "escalated"
    if case.odamga is True and not handed:
        reasons.append("odamga uzatishi kerak edi, lekin o‘zi javob berdi")
    if case.odamga is False and handed:
        reasons.append(f"o‘zi javob berishi kerak edi, lekin odamga uzatdi ({answer.reason})")
    text = norm(answer.text)
    if not handed:  # content checks only make sense for a real answer
        for want in case.kerak:
            if norm(want) not in text:
                reasons.append(f"javobda «{want}» yo‘q")
    for bad in case.mumkin_emas:
        if norm(bad) in text:
            reasons.append(f"javobda bo‘lmasligi kerak bo‘lgan «{bad}» bor")
    return reasons


JUDGE_PROMPT = """You check one answer of a business assistant against one rule.
Rule (in Uzbek): {rule}
Question: {question}
Answer: {answer}
Reply with JSON only: {{"pass": true or false, "reason": "<one short sentence in Uzbek>"}}"""


def judge(llm, model: str, case: Case, answer: Answer) -> tuple[bool, str, float]:
    reply = llm.chat(
        [{"role": "user", "content": JUDGE_PROMPT.format(rule=case.mezon, question=case.savol, answer=answer.text)}],
        model=model, max_tokens=200, temperature=0.0,
    )
    m = re.search(r"\{.*\}", reply.text, flags=re.S)
    try:
        verdict = json.loads(m.group(0)) if m else {}
    except json.JSONDecodeError:
        verdict = {}
    return bool(verdict.get("pass")), str(verdict.get("reason", "baholovchi javobi tushunarsiz")), reply.cost_usd


def run(assistant: Assistant, cases: list[Case], tier: str | None = None,
        judge_llm=None, judge_model: str | None = None) -> tuple[list[Result], float]:
    results, cost = [], 0.0
    for case in cases:
        answer = assistant.answer(case.savol, [], tier=tier)
        cost += answer.reply.cost_usd if answer.reply else 0.0
        reasons = check(case, answer)
        if case.mezon and judge_llm and not reasons and answer.status == "answered":
            ok, why, judge_cost = judge(judge_llm, judge_model, case, answer)
            cost += judge_cost
            if not ok:
                reasons.append(f"mezon bajarilmadi: {why}")
        results.append(Result(case, answer, not reasons, reasons))
    return results, cost


def report_markdown(results: list[Result], model: str, cost: float, when: datetime) -> str:
    passed = sum(r.passed for r in results)
    lines = [
        f"# Test natijalari: {passed} / {len(results)} o‘tdi",
        "",
        f"Sana: {when.strftime('%Y-%m-%d %H:%M')}. Model: {model}. Xarajat: ${cost:.4f}.",
        "",
        "| Natija | Test | Sabab |",
        "|---|---|---|",
    ]
    for r in results:
        mark = "✅" if r.passed else "❌"
        lines.append(f"| {mark} | {r.case.id} | {'; '.join(r.reasons) or '-'} |")
    for r in results:
        lines += [
            "",
            f"## {'✅' if r.passed else '❌'} {r.case.id}",
            "",
            f"Savol: {r.case.savol}",
            "",
            f"Javob ({r.answer.status}):",
            "",
            "> " + (r.answer.text or r.answer.reason or "-").replace("\n", "\n> "),
        ]
        if r.case.manba:
            lines += ["", f"Manba: {r.case.manba}"]
    return "\n".join(lines) + "\n"


def console_table(results: list[Result]) -> str:
    out = []
    for r in results:
        mark = "OK  " if r.passed else "FAIL"
        out.append(f"{mark} {r.case.id}" + (f"  -> {'; '.join(r.reasons)}" if r.reasons else ""))
    passed = sum(r.passed for r in results)
    out.append(f"\n{passed} / {len(results)} o‘tdi")
    return "\n".join(out)
