"""Who checks an answer before it goes out: everyone's answers, nobody's, or all but some topics.

REPLY_MODE in .env:
  direct  - answers go straight to staff (they press ✅ / ❌)
  approve - every answer goes to the reviewer first (pilot week 1)
  topics  - answers on the topics in `direct_topics` (agent/approval.toml) go straight to staff;
            every other answer goes to the reviewer (the canon's week 2: price and stock direct,
            discount, delivery date and the rest still approved)
The owner can change this from the phone with /darhol; that setting lasts until .env or
agent/approval.toml changes (the newer setting wins).

How an answer is let through in topics mode (when in doubt, approval):
1. the model ends each answer with a line "MAVZU: <topic>" (asked for only in topics mode);
   the line is removed before anyone sees the answer;
2. the topic must be in `direct_topics`, AND
3. no keyword of any other topic ([topics] in approval.toml) may appear in the question or the answer.
An answer with no topic line, or with a topic that is not listed, goes to the reviewer.
"""

from __future__ import annotations

import hashlib
import re
import tomllib
from dataclasses import dataclass, field
from pathlib import Path

from .sources import normalize

TOPIC_LINE = re.compile(r"^[\s>*_`-]*MAVZU[\s*_]*:[\s*_]*([^\s*_`.]+)", re.I)
OTHER = "boshqa"  # the model's tag for anything outside the list; never direct


@dataclass
class ApprovalRules:
    direct_topics: list[str] = field(default_factory=list)
    keywords: dict[str, list[str]] = field(default_factory=dict)
    fingerprint: str = ""  # changes whenever approval.toml changes (a phone setting then gives way)

    @property
    def topics(self) -> list[str]:
        return list(self.keywords)

    def prompt_topics(self, direct: list[str]) -> list[str]:
        """Topics for the model's MAVZU line: the ones that need approval first, so that
        "if several fit, take the first in the list" picks the safer one."""
        return [t for t in self.topics if t not in direct] + [t for t in self.topics if t in direct]


def load_rules(app_dir: Path) -> ApprovalRules:
    path = app_dir / "agent" / "approval.toml"
    if not path.exists():
        return ApprovalRules()
    text = path.read_text(encoding="utf-8")
    raw = tomllib.loads(text)
    keywords = {normalize(str(k)): [str(w) for w in v] for k, v in (raw.get("topics") or {}).items()}
    direct = [normalize(str(t)) for t in raw.get("direct_topics", [])]
    unknown = [t for t in direct if t not in keywords]
    if unknown:
        raise ValueError(f"approval.toml: direct_topics has unknown topics: {', '.join(unknown)} "
                         f"(known: {', '.join(keywords) or 'none, add a [topics] table'})")
    if OTHER in keywords:
        raise ValueError(f"approval.toml: '{OTHER}' is reserved for answers outside the list")
    return ApprovalRules(direct, keywords, hashlib.sha256(text.encode("utf-8")).hexdigest()[:12])


def parse_topic(text: str) -> tuple[str | None, str]:
    """('narx', answer without the MAVZU line) or (None, text). The last MAVZU line counts."""
    lines = text.splitlines()
    for i in range(len(lines) - 1, -1, -1):
        m = TOPIC_LINE.match(lines[i])
        if m:
            return normalize(m.group(1)), "\n".join(lines[:i] + lines[i + 1:]).strip()
    return None, text


def keyword_topics(text: str, keywords: dict[str, list[str]]) -> set[str]:
    norm = normalize(text)
    return {topic for topic, words in keywords.items() if any(normalize(w) in norm for w in words)}


def needs_approval(direct_topics: list[str], keywords: dict[str, list[str]], model_topic: str | None,
                   question: str, answer: str) -> tuple[bool, str]:
    """(True, why) when the answer must go to the reviewer. When in doubt: True."""
    if model_topic is None:
        return True, "mavzu aniqlanmadi"
    if model_topic not in direct_topics:
        return True, f"mavzu: {model_topic}"
    hits = sorted(keyword_topics(f"{question}\n{answer}", keywords) - set(direct_topics))
    if hits:
        return True, f"kalit so‘z: {', '.join(hits)}"
    return False, f"mavzu: {model_topic}"
