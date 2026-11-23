"""Fake Telegram + fake OpenRouter on this computer, for offline demos and tests.

Run the real bot against it by setting, in a test .env:
  TELEGRAM_API_BASE=http://127.0.0.1:<port>
  OPENROUTER_BASE_URL=http://127.0.0.1:<port>/api/v1

The "model" here is a few rules, not AI: it reads the data block the bot put in the
system prompt and answers prices, stock, warranty, delivery, or hands over (ODAMGA).
That proves the data really flows from data/ through the prompt to the answer.

Control endpoints for scripts:
  POST /_test/message {"user_id", "first_name", "text", "reply_to"}  - a person writes to the bot
  POST /_test/button  {"user_id", "data", "message_id"}             - a person presses a button
  GET  /_test/sent                                                    - everything the bot sent
"""

from __future__ import annotations

import json
import re
import threading
import time
from email.parser import BytesParser
from email.policy import default as email_policy
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

PRICE_IN, PRICE_OUT = 0.825e-6, 4.125e-6  # balanced tier, $ per token (2026-11-03)


def _norm(text: str) -> str:
    from pilot.sources import normalize

    return normalize(text).replace("'", "").replace("«", "").replace("»", "").replace('"', "")


def _stems(text: str) -> set[str]:
    return {w[:4] for w in re.findall(r"[a-z]+", _norm(text)) if len(w) >= 4}


def _money(n: int) -> str:
    return f"{n:,}".replace(",", " ")


def _blocks(system: str) -> dict[str, list[str]]:
    out = {}
    for name, body in re.findall(r'<malumot nomi="([^"]+)"[^>]*>\n(.*?)\n</malumot>', system, flags=re.S):
        out[name] = [line for line in body.splitlines() if line.strip()]
    return out


def _table(lines: list[str]) -> list[dict]:
    if not lines or " | " not in lines[0]:
        return []
    header = lines[0].split(" | ")
    return [dict(zip(header, line.split(" | "))) for line in lines[1:] if " | " in line]


def _best(rows: list[dict], key: str, q: set[str]) -> dict | None:
    scored = [(len(q & _stems(r.get(key, ""))), r) for r in rows]
    scored = [s for s in scored if s[0] > 0]
    return max(scored, key=lambda s: s[0])[1] if scored else None


def _all_best(rows: list[dict], key: str, q: set[str]) -> list[dict]:
    scored = [(len(q & _stems(r.get(key, ""))), r) for r in rows]
    top = max((s for s, _ in scored), default=0)
    return [r for s, r in scored if s == top and s > 0]


def fake_model(messages: list[dict]) -> str:
    """Answer, plus a "MAVZU:" line when the prompt asks for one (REPLY_MODE=topics)."""
    text = _fake_answer(messages)
    if "MAVZU:" in messages[0]["content"] and not text.startswith("ODAMGA"):
        q = _norm(messages[-1]["content"])
        topic = ("chegirma" if "chegirma" in q else "muddat" if "yetkaz" in q else
                 "kafolat" if "kafolat" in q else "qoldiq" if "ombor" in q else "narx")
        text += f"\nMAVZU: {topic}"
    return text


def _fake_answer(messages: list[dict]) -> str:
    system = messages[0]["content"]
    question = messages[-1]["content"]
    q_norm = _norm(question)
    q = _stems(question)
    blocks = _blocks(system)
    prices = _table(next((v for k, v in blocks.items() if "Prays" in k), []))
    stock = _table(next((v for k, v in blocks.items() if "Ombor" in k), []))
    rules = next((v for k, v in blocks.items() if "qoida" in k.lower()), [])

    pct = re.search(r"(\d+)\s*%", question)
    if pct and "chegirma" in q_norm and int(pct.group(1)) > 5:
        return f"ODAMGA: {pct.group(1)}% chegirma menejer vakolatidan (5%) yuqori."
    if "chegirma" in q_norm:  # 5% or less, or no number: the rule from the rules document
        line = next((l for l in rules if l.lstrip("- ").startswith("Sotuv menejeri")), None)
        if line:
            return line.lstrip("- ").strip()
    if "tannarx" in q_norm:
        return "ODAMGA: tannarx ichki ma’lumot, menda yo‘q."
    if "kafolat" in q_norm:
        line = next((l for l in rules if "Kreslo mexanizmi" in l), None)
        return f"Kafolat: {line.lstrip('- ').strip()}" if line else "ODAMGA: kafolat ma’lumoti topilmadi."
    if "yetkaz" in q_norm:
        line = next((l for l in rules if l.lstrip("- ").startswith("Muddat")), None)
        if line:
            return ("Yo‘q, 3 kun deb va’da bermang. " + line.lstrip("- ").strip()
                    + " Tezroq kerak bo‘lsa, ROP bilan kelishing.")
    if "kam" in q_norm.split() and "ombor" in q_norm:  # the scheduled "low stock" job
        limit_m = re.search(r"(\d+) donadan kam", q_norm)
        limit = int(limit_m.group(1)) if limit_m else 3
        low = sorted((r for r in stock if int(r["Количество"]) < limit), key=lambda r: int(r["Количество"]))
        if not low:
            return "Hammasi yetarli."
        return f"Tayyor mahsulot {limit} donadan kam:\n" + "\n".join(
            f"- {r['Код']} {r['Номенклатура']}: {r['Количество']} dona" for r in low)
    if any(w in q_norm for w in ("ombor", "qoldiq", "bormi", "nechta bor")):
        rows = _all_best(stock, "Номенклатура", q)
        if rows:
            return "Omborda (1C, tayyor mahsulot):\n" + "\n".join(
                f"- {r['Код']} {r['Номенклатура']}: {r['Количество']} dona" for r in rows)
        return "ODAMGA: bu mahsulot ombor faylida topilmadi."
    row = _best(prices, "Mahsulot", q)
    if row:
        qty_m = re.search(r"(\d+)\s*(ta|dona)\b", q_norm)
        qty = int(qty_m.group(1)) if qty_m else 1
        col = "Ulgurji narx (5+ dona)" if qty >= 5 else "Chakana narx (1-4 dona)"
        price = int(re.sub(r"\D", "", row[col]))
        kind = "ulgurji" if qty >= 5 else "chakana"
        return (f"{row['Mahsulot']} ({row['Kod']}), {qty} dona - {kind} narx: "
                f"{_money(price)} x {qty} = {_money(price * qty)} so‘m.")
    return "ODAMGA: ma’lumotda javob topilmadi."


class FakeServices:
    def __init__(self, host: str = "127.0.0.1", port: int = 0):
        self.lock = threading.Condition()
        self.updates: list[dict] = []
        self.sent: list[dict] = []
        self.documents: list[dict] = []
        self.calls: list[str] = []
        self.files: dict[str, bytes] = {}
        self.llm_requests: list[dict] = []
        self._update_id = 1000
        self._message_id = 5000
        services = self

        class Handler(BaseHTTPRequestHandler):
            def log_message(self, *args):  # keep test output quiet
                pass

            def _json(self, code: int, body: dict) -> None:
                raw = json.dumps(body, ensure_ascii=False).encode()
                self.send_response(code)
                self.send_header("content-type", "application/json")
                self.send_header("content-length", str(len(raw)))
                self.end_headers()
                self.wfile.write(raw)

            def _body(self) -> bytes:
                return self.rfile.read(int(self.headers.get("content-length") or 0))

            def do_GET(self):
                if self.path.startswith("/api/v1/key"):
                    self._json(200, {"data": {"label": "fake", "limit": 20.0, "limit_remaining": 19.9,
                                              "usage": 0.1, "usage_daily": 0.01, "usage_monthly": 0.1}})
                elif self.path.startswith("/file/bot"):
                    data = services.files.get(self.path.rsplit("/", 1)[-1])
                    if data is None:
                        self._json(404, {"ok": False})
                        return
                    self.send_response(200)
                    self.send_header("content-length", str(len(data)))
                    self.end_headers()
                    self.wfile.write(data)
                elif self.path.startswith("/_test/sent"):
                    with services.lock:
                        self._json(200, {"sent": services.sent, "documents": services.documents})
                else:
                    self._json(404, {"ok": False})

            def do_POST(self):
                raw = self._body()
                if self.path.startswith("/_test/"):
                    self._json(200, services.control(self.path[len("/_test/"):], json.loads(raw or b"{}")))
                elif self.path == "/api/v1/chat/completions":
                    self._json(200, services.chat(json.loads(raw)))
                elif self.path.startswith("/bot"):
                    m = re.match(r"/bot([^/]+)/(\w+)", self.path)
                    if not m or ":" not in m.group(1):
                        self._json(404, {"ok": False, "error_code": 404, "description": "Not Found"})
                        return
                    ctype = self.headers.get("content-type", "")
                    params = services.parse_params(ctype, raw)
                    self._json(200, {"ok": True, "result": services.telegram(m.group(2), params)})
                else:
                    self._json(404, {"ok": False})

        self.server = ThreadingHTTPServer((host, port), Handler)
        self.server.daemon_threads = True
        self.port = self.server.server_address[1]
        self.url = f"http://{host}:{self.port}"
        self._thread = threading.Thread(target=self.server.serve_forever, daemon=True)

    # ------------------------------------------------------------ lifecycle
    def start(self) -> "FakeServices":
        self._thread.start()
        return self

    def stop(self) -> None:
        self.server.shutdown()
        self.server.server_close()

    # ------------------------------------------------------------ telegram
    @staticmethod
    def parse_params(ctype: str, raw: bytes) -> dict:
        if ctype.startswith("multipart/form-data"):
            msg = BytesParser(policy=email_policy).parsebytes(
                b"Content-Type: " + ctype.encode() + b"\r\n\r\n" + raw)
            params = {}
            for part in msg.iter_parts():
                name = part.get_param("name", header="content-disposition")
                if part.get_filename():
                    params[name] = {"filename": part.get_filename(), "bytes": part.get_payload(decode=True)}
                else:
                    params[name] = part.get_content().strip()
            return params
        return json.loads(raw or b"{}")

    def telegram(self, method: str, p: dict):
        with self.lock:
            self.calls.append(method)
        if method == "getMe":
            return {"id": 4242, "is_bot": True, "first_name": "Savdo yordamchisi", "username": "baraka_demo_bot"}
        if method == "getFile":
            return {"file_id": p["file_id"], "file_path": p["file_id"]}
        if method == "getUpdates":
            offset = p.get("offset") or 0
            deadline = time.time() + min(float(p.get("timeout") or 0), 2.0)
            with self.lock:
                while True:
                    self.updates = [u for u in self.updates if u["update_id"] >= offset]
                    if self.updates or time.time() >= deadline:
                        return list(self.updates)
                    self.lock.wait(timeout=0.05)
        if method == "sendMessage":
            with self.lock:
                self._message_id += 1
                self.sent.append({"message_id": self._message_id, "chat_id": int(p["chat_id"]),
                                  "text": p["text"], "markup": p.get("reply_markup")})
                self.lock.notify_all()
                return {"message_id": self._message_id, "chat": {"id": int(p["chat_id"])}, "text": p["text"]}
        if method == "sendDocument":
            doc = p.get("document", {})
            with self.lock:
                self.documents.append({"chat_id": int(p["chat_id"]), "filename": doc.get("filename"),
                                       "bytes": len(doc.get("bytes") or b""), "caption": p.get("caption", "")})
                self.lock.notify_all()
            return {"message_id": 1}
        return True  # deleteWebhook, setMyCommands, sendChatAction, answerCallbackQuery, editMessageReplyMarkup

    # ------------------------------------------------------------ openrouter
    def chat(self, body: dict) -> dict:
        self.llm_requests.append(body)
        text = fake_model(body["messages"])
        p_tok = sum(len(m["content"]) for m in body["messages"]) // 3
        c_tok = len(text) // 3
        return {"id": "gen-fake", "model": body["model"],
                "choices": [{"message": {"role": "assistant", "content": text}}],
                "usage": {"prompt_tokens": p_tok, "completion_tokens": c_tok,
                          "cost": round(p_tok * PRICE_IN + c_tok * PRICE_OUT, 6)}}

    # ------------------------------------------------------------ control
    def control(self, action: str, body: dict) -> dict:
        with self.lock:
            self._update_id += 1
            user = {"id": body["user_id"], "first_name": body.get("first_name", "Test")}
            if action == "message":
                msg = {"message_id": self._update_id, "from": user,
                       "chat": {"id": body["user_id"], "type": "private"}, "text": body["text"]}
                if body.get("reply_to"):
                    msg["reply_to_message"] = {"message_id": body["reply_to"]}
                self.updates.append({"update_id": self._update_id, "message": msg})
            elif action == "document":
                import base64

                file_id = f"f{self._update_id}"
                self.files[file_id] = base64.b64decode(body["content_b64"])
                msg = {"message_id": self._update_id, "from": user,
                       "chat": {"id": body["user_id"], "type": "private"},
                       "document": {"file_id": file_id, "file_name": body["file_name"],
                                    "file_size": len(self.files[file_id])}}
                self.updates.append({"update_id": self._update_id, "message": msg})
            elif action == "button":
                self.updates.append({"update_id": self._update_id, "callback_query": {
                    "id": f"cb{self._update_id}", "from": user, "data": body["data"],
                    "message": {"message_id": body.get("message_id", 1), "chat": {"id": body["user_id"]}}}})
            self.lock.notify_all()
            return {"ok": True}

    def wait_for(self, predicate, timeout: float = 15.0):
        """Wait until a sent message matches `predicate`; return it."""
        deadline = time.time() + timeout
        with self.lock:
            while time.time() < deadline:
                for m in self.sent:
                    if predicate(m):
                        return m
                self.lock.wait(timeout=0.1)
        raise TimeoutError("the bot did not send the expected message in time")


if __name__ == "__main__":
    import sys

    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8099
    host = sys.argv[2] if len(sys.argv) > 2 else "127.0.0.1"
    svc = FakeServices(host, port).start()
    print(f"Fake Telegram + OpenRouter on {svc.url}  (Ctrl+C to stop)")
    try:
        while True:
            time.sleep(3600)
    except KeyboardInterrupt:
        svc.stop()
