"""OpenRouter client: one key, hundreds of models, one bill.

API: POST https://openrouter.ai/api/v1/chat/completions (OpenAI-compatible).
Every response carries `usage.cost` in USD (checked 2026-11-03:
https://openrouter.ai/docs/use-cases/usage-accounting), so each answer's price is logged.
`GET /api/v1/key` returns the key's usage and limit (https://openrouter.ai/docs/api-reference/limits).
The key's own limit on openrouter.ai is the hard stop; the bot's budget guard is a second fence.
"""

from __future__ import annotations

import logging
import time
from dataclasses import dataclass

import httpx

log = logging.getLogger(__name__)


class LlmError(Exception):
    pass


@dataclass
class LlmReply:
    text: str
    model: str
    tokens_in: int = 0
    tokens_out: int = 0
    cost_usd: float = 0.0


class OpenRouter:
    def __init__(
        self,
        api_key: str,
        base_url: str = "https://openrouter.ai/api/v1",
        client: httpx.Client | None = None,
        app_title: str = "Praktikum pilot bot",
        retry_wait: float = 2.0,
    ):
        if not api_key:
            raise ValueError("OPENROUTER_API_KEY is empty")
        self._key = api_key
        self._base = base_url.rstrip("/")
        self._client = client or httpx.Client(timeout=httpx.Timeout(90.0, connect=10.0))
        self._headers = {
            "Authorization": f"Bearer {api_key}",
            "X-Title": app_title,
        }
        self._retry_wait = retry_wait

    def chat(self, messages: list[dict], model: str, max_tokens: int = 700, temperature: float = 0.2) -> LlmReply:
        payload = {
            "model": model,
            "messages": messages,
            "max_tokens": max_tokens,
            "temperature": temperature,
        }
        last_error = "unknown error"
        for attempt in (1, 2):  # one retry for rate limits, server errors and timeouts
            try:
                resp = self._client.post(f"{self._base}/chat/completions", json=payload, headers=self._headers)
            except httpx.HTTPError as exc:
                last_error = f"{type(exc).__name__}"
            else:
                if resp.status_code == 200:
                    return self._parse(resp, model)
                last_error = f"HTTP {resp.status_code}: {self._error_text(resp)}"
                if resp.status_code not in (408, 429, 500, 502, 503, 504):
                    break  # wrong key, no credit, bad model name: retrying will not help
            if attempt == 1:
                log.warning("OpenRouter call failed (%s), retrying once", last_error)
                time.sleep(self._retry_wait)
        raise LlmError(last_error)

    @staticmethod
    def _error_text(resp: httpx.Response) -> str:
        try:
            err = resp.json().get("error", {})
            return str(err.get("message") or err)[:200]
        except ValueError:
            return resp.text[:200]

    @staticmethod
    def _parse(resp: httpx.Response, model: str) -> LlmReply:
        try:
            body = resp.json()
            if "error" in body:
                raise LlmError(str(body["error"].get("message", body["error"]))[:200])
            text = body["choices"][0]["message"]["content"] or ""
        except (ValueError, KeyError, IndexError, TypeError) as exc:
            raise LlmError(f"unexpected response: {exc}") from None
        usage = body.get("usage") or {}
        return LlmReply(
            text=text.strip(),
            model=body.get("model", model),
            tokens_in=int(usage.get("prompt_tokens") or 0),
            tokens_out=int(usage.get("completion_tokens") or 0),
            cost_usd=float(usage.get("cost") or 0.0),
        )

    def key_info(self) -> dict | None:
        """Usage and limit of this key, or None if OpenRouter cannot be reached."""
        try:
            resp = self._client.get(f"{self._base}/key", headers=self._headers, timeout=15.0)
            if resp.status_code != 200:
                return None
            return resp.json().get("data")
        except (httpx.HTTPError, ValueError):
            return None
