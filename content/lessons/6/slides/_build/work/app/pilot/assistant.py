"""The answer pipeline, with no Telegram in it.

question -> spending guard -> data block -> model -> hand-over check -> Answer
The bot, the test-set runner (`pilot eval`) and `pilot ask` all use this one path,
so what the tests check is exactly what staff get.
"""

from __future__ import annotations

import time
from dataclasses import dataclass, field

from .budget import Budget
from .config import Config
from .llm import LlmError, LlmReply
from .approval import parse_topic
from .prompt import build_messages, load_agent_text, parse_escalation
from .sources import DataStore
from . import texts


@dataclass
class Answer:
    status: str  # answered | escalated | error | budget
    text: str = ""
    reason: str = ""
    reply: LlmReply | None = None
    sources: list[str] = field(default_factory=list)
    latency_ms: int = 0
    topic: str | None = None  # from the model's "MAVZU:" line (topics mode only)

    @property
    def handed_over(self) -> bool:
        return self.status in ("escalated", "error", "budget")


class Assistant:
    def __init__(self, cfg: Config, llm, store: DataStore, budget: Budget, clock):
        self.cfg = cfg
        self.llm = llm
        self.store = store
        self.budget = budget
        self.clock = clock

    def answer(self, question: str, history: list[dict] | None = None, tier: str | None = None,
               topics: list[str] | None = None) -> Answer:
        history = history or []
        now = self.clock()
        if self.budget.exceeded(now):
            return Answer(status="budget", reason=texts.REASON_BUDGET)

        # Search the data with the new question plus the previous one ("and 10 pieces?").
        recent = " ".join(m["content"] for m in history[-2:] if m["role"] == "user")
        data_block, used = self.store.context_for(f"{recent} {question}")
        # Read the agent files on every question: an edit to instructions.md works at once.
        agent_text = load_agent_text(self.cfg.agent_dir, self.cfg.runtime_dir)
        messages = build_messages(agent_text, data_block, history, question, now, topics)

        started = time.monotonic()
        try:
            reply = self.llm.chat(
                messages,
                model=self.cfg.model_for(tier),
                max_tokens=self.cfg.max_answer_tokens,
                temperature=self.cfg.temperature,
            )
        except LlmError as exc:
            return Answer(status="error", reason=texts.REASON_ERROR.format(error=exc), sources=used,
                          latency_ms=int((time.monotonic() - started) * 1000))
        latency = int((time.monotonic() - started) * 1000)
        self.budget.add(reply.cost_usd, now)

        topic, text = parse_topic(reply.text) if topics else (None, reply.text)
        handover, reason = parse_escalation(text)
        if handover or not text.strip():
            return Answer(status="escalated", text=text, reason=reason or texts.REASON_DEFAULT,
                          reply=reply, sources=used, latency_ms=latency, topic=topic)
        return Answer(status="answered", text=text, reply=reply, sources=used, latency_ms=latency, topic=topic)
