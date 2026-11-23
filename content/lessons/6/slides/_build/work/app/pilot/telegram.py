"""A small Telegram Bot API client.

No framework: every call is a plain HTTPS request to
https://api.telegram.org/bot<TOKEN>/<method>, documented at https://core.telegram.org/bots/api.
To use a method that is not here, call `tg.call("methodName", param=value)`.
"""

from __future__ import annotations

import html
import json
import logging
import re
import time

import httpx

log = logging.getLogger(__name__)

MAX_MESSAGE = 4096  # Telegram's limit per message
# Sending is retried only when Telegram surely did NOT get the message (no connection, or it
# answered 429 "too many requests"), so a retry can never deliver the same message twice.
# A timeout after the request went out is not retried: the message may already be there.
SEND_METHODS = {"sendMessage", "sendDocument"}
SEND_RETRY_DELAYS = (5.0, 20.0)  # 3 attempts within about 30 seconds
NOT_SENT_ERRORS = (httpx.ConnectError, httpx.ConnectTimeout, httpx.PoolTimeout)


class TelegramError(Exception):
    def __init__(self, method: str, code: int, description: str):
        super().__init__(f"Telegram {method} failed ({code}): {description}")
        self.method = method
        self.code = code
        self.description = description


class _NotSent(Exception):
    """Internal: the request surely did not deliver anything, so it may be retried."""

    def __init__(self, error: TelegramError, retry_after: float | None = None):
        super().__init__(str(error))
        self.error = error
        self.retry_after = retry_after


def to_telegram_html(text: str) -> str:
    """Escape text for parse_mode=HTML and turn **bold** into <b>bold</b>."""
    escaped = html.escape(text, quote=False)
    return re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", escaped, flags=re.S)


def split_text(text: str, limit: int = MAX_MESSAGE) -> list[str]:
    """Split long text into Telegram-sized parts, preferring line breaks."""
    text = text.strip() or "…"
    parts = []
    while len(text) > limit:
        cut = text.rfind("\n", 0, limit)
        if cut < limit // 2:
            cut = limit
        parts.append(text[:cut].rstrip())
        text = text[cut:].lstrip()
    parts.append(text)
    return parts


class Telegram:
    def __init__(
        self,
        token: str,
        base_url: str = "https://api.telegram.org",
        client: httpx.Client | None = None,
        retry_delays: tuple[float, ...] = SEND_RETRY_DELAYS,
        sleep=time.sleep,
    ):
        if not token:
            raise ValueError("TELEGRAM_BOT_TOKEN is empty")
        self._retry_delays = retry_delays
        self._sleep = sleep
        self._token = token
        self._base = f"{base_url.rstrip('/')}/bot{token}"
        self._client = client or httpx.Client(timeout=httpx.Timeout(40.0, connect=10.0))

    def _redact(self, text: str) -> str:
        return text.replace(self._token, "***")

    def call(self, method: str, http_timeout: float | None = None, files: dict | None = None, **params):
        """Call any Bot API method and return its `result`. Raises TelegramError.
        Sends (sendMessage, sendDocument) are retried with backoff when they surely did not arrive."""
        delays = list(self._retry_delays) if method in SEND_METHODS else []
        while True:
            try:
                return self._call_once(method, http_timeout, files, **params)
            except _NotSent as exc:
                if not delays:
                    raise exc.error from None
                wait = delays.pop(0) if exc.retry_after is None else min(float(exc.retry_after), 30.0)
                log.warning("%s not sent (%s), retrying in %.0f s", method, exc.error.description, wait)
                self._sleep(wait)

    def _call_once(self, method: str, http_timeout: float | None, files: dict | None, **params):
        params = {k: v for k, v in params.items() if v is not None}
        try:
            if files:
                data = {
                    k: json.dumps(v) if isinstance(v, (dict, list)) else str(v)
                    for k, v in params.items()
                }
                resp = self._client.post(f"{self._base}/{method}", data=data, files=files, timeout=http_timeout or 60.0)
            else:
                resp = self._client.post(f"{self._base}/{method}", json=params, timeout=http_timeout or 40.0)
        except httpx.HTTPError as exc:
            # httpx errors can contain the URL, and the URL contains the token.
            error = TelegramError(method, 0, self._redact(f"{type(exc).__name__}: {exc}"))
            if isinstance(exc, NOT_SENT_ERRORS):
                raise _NotSent(error) from None
            raise error from None
        try:
            body = resp.json()
        except ValueError:
            raise TelegramError(method, resp.status_code, "response is not JSON") from None
        if not body.get("ok"):
            error = TelegramError(method, body.get("error_code", resp.status_code), body.get("description", "?"))
            if error.code == 429:  # rejected, not delivered: safe to retry after the time Telegram asks
                raise _NotSent(error, (body.get("parameters") or {}).get("retry_after", 5)) from None
            raise error
        return body.get("result")

    # ---------------------------------------------------------------- reading

    def get_me(self) -> dict:
        return self.call("getMe")

    def delete_webhook(self) -> None:
        # Long polling and a webhook cannot both be active.
        self.call("deleteWebhook", drop_pending_updates=False)

    def get_updates(self, offset: int | None, timeout: int = 25) -> list[dict]:
        return self.call(
            "getUpdates",
            http_timeout=timeout + 10,
            offset=offset,
            allowed_updates=["message", "callback_query"],
            timeout=timeout,
        )

    # ---------------------------------------------------------------- writing

    def send_message(
        self,
        chat_id: int,
        text: str,
        buttons: list[list[tuple[str, str]]] | None = None,
        reply_to: int | None = None,
    ) -> dict:
        """Send text (split if long). Buttons go on the last part. Returns the last message."""
        parts = split_text(text)
        sent: dict = {}
        for i, part in enumerate(parts):
            markup = None
            if buttons and i == len(parts) - 1:
                markup = {"inline_keyboard": [[{"text": t, "callback_data": d} for t, d in row] for row in buttons]}
            params = dict(chat_id=chat_id, reply_markup=markup, link_preview_options={"is_disabled": True})
            if reply_to and i == 0:
                params["reply_parameters"] = {"message_id": reply_to, "allow_sending_without_reply": True}
            try:
                sent = self.call("sendMessage", text=to_telegram_html(part), parse_mode="HTML", **params)
            except TelegramError as exc:
                if exc.code != 400 or "parse" not in exc.description.lower():
                    raise
                sent = self.call("sendMessage", text=part, **params)  # plain text fallback
        return sent

    def send_typing(self, chat_id: int) -> None:
        try:
            self.call("sendChatAction", chat_id=chat_id, action="typing")
        except TelegramError as exc:
            log.debug("typing failed: %s", exc)

    def answer_callback(self, callback_id: str, text: str | None = None) -> None:
        try:
            self.call("answerCallbackQuery", callback_query_id=callback_id, text=text)
        except TelegramError as exc:
            log.debug("answerCallbackQuery failed: %s", exc)

    def remove_buttons(self, chat_id: int, message_id: int) -> None:
        try:
            self.call("editMessageReplyMarkup", chat_id=chat_id, message_id=message_id,
                      reply_markup={"inline_keyboard": []})
        except TelegramError as exc:
            log.debug("editMessageReplyMarkup failed: %s", exc)

    def send_document(self, chat_id: int, filename: str, content: bytes, caption: str = "") -> dict:
        return self.call(
            "sendDocument",
            files={"document": (filename, content)},
            chat_id=chat_id,
            caption=caption[:1024] or None,
        )

    def get_file(self, file_id: str) -> dict:
        return self.call("getFile", file_id=file_id)

    def download(self, file_path: str) -> bytes:
        """Download a file a user sent (Bot API limit: 20 MB)."""
        url = self._base.replace("/bot", "/file/bot", 1) + "/" + file_path
        try:
            resp = self._client.get(url, timeout=60.0)
        except httpx.HTTPError as exc:
            raise TelegramError("download", 0, self._redact(f"{type(exc).__name__}: {exc}")) from None
        if resp.status_code != 200:
            raise TelegramError("download", resp.status_code, "file download failed")
        return resp.content

    def set_commands(self, commands: list[tuple[str, str]]) -> None:
        try:
            self.call("setMyCommands", commands=[{"command": c, "description": d} for c, d in commands])
        except TelegramError as exc:
            log.warning("setMyCommands failed: %s", exc)
