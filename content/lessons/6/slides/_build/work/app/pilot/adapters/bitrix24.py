"""Bitrix24 CRM deals through an inbound webhook, read only, as a table.

.env:
    BITRIX24_WEBHOOK=https://kompaniya.bitrix24.uz/rest/15/abc123def456/   # the whole webhook URL

The webhook URL is the secret: whoever has it acts with the rights of the employee who made it.
Make it while logged in as an employee whose CRM role can only view deals.

sources.toml:

    [[source]]
    name = "Bitrix24 bitimlar"
    type = "bitrix24"
    updated_days = 60          # only deals changed in the last 60 days
    # pipeline = "Ulgurji"     # only this pipeline (name as in Bitrix24); default: all
    # responsible = "name"     # "name" (needs the user scope), "id" or "none"
    # fields = { UF_CRM_1700000001 = "Manba" }   # extra custom fields and their column names
    # refresh_minutes = 30
    # max_pages = 20           # 50 deals per page

API facts (apidocs.bitrix24.ru / .com, checked 2026-11-03): crm.item.list with entityTypeId 2
(crm.deal.list is deprecated), crm.category.list, crm.status.list (DEAL_STAGE, DEAL_STAGE_<id>),
user.get; about 2 requests per second on non-Enterprise plans.
Phones and e-mails (the "fm" field) are never selected.
"""

from __future__ import annotations

import time
from datetime import datetime, timedelta
from pathlib import Path

from ._common import TZ, TimedRefresh, finish, http_error, make_client, money, need_secret

BASE_FIELDS = ["id", "title", "stageId", "categoryId", "opportunity", "currencyId", "assignedById",
               "createdTime", "updatedTime", "closedate", "closed"]


def _date(value) -> str:
    if not value:
        return ""
    try:
        return datetime.fromisoformat(str(value)).astimezone(TZ).strftime("%Y-%m-%d %H:%M")
    except ValueError:
        return str(value)


class Bitrix24DealsSource(TimedRefresh):
    def __init__(self, spec: dict, app_dir: Path, client=None):
        self.name = spec["name"]
        self.app_dir = Path(app_dir)
        self.webhook_env = spec.get("webhook_env", "BITRIX24_WEBHOOK")
        self.updated_days = spec.get("updated_days")
        self.pipeline = spec.get("pipeline")
        self.responsible = spec.get("responsible", "name")
        self.fields = dict(spec.get("fields") or {})
        self.columns = spec.get("columns")
        self.check = spec.get("check")
        self.refresh_minutes = float(spec.get("refresh_minutes", 30))
        self.max_pages = int(spec.get("max_pages", 20))
        self.pause = float(spec.get("pause_seconds", 0.5))
        self._client = client

    def _call(self, client, base: str, method: str, body: dict) -> dict:
        resp = client.post(f"{base}{method}.json", json=body)
        if self.pause:
            time.sleep(self.pause)
        try:
            data = resp.json()
        except ValueError:
            data = {}
        if isinstance(data, dict) and data.get("error"):
            raise RuntimeError(f"Bitrix24: {data.get('error')} ({data.get('error_description', '')})".strip())
        if resp.status_code != 200:
            raise http_error("Bitrix24", resp)
        return data

    def load(self):
        hook = need_secret(self.webhook_env, self.app_dir, "Bitrix24 kiruvchi webhook manzili")
        base = hook if hook.endswith("/") else hook + "/"
        client = self._client or make_client()
        try:
            cats = self._call(client, base, "crm.category.list", {"entityTypeId": 2})
            categories = {int(c["id"]): c.get("name", "") for c in cats.get("result", {}).get("categories", [])}
            categories.setdefault(0, "Asosiy")
            wanted = None
            if self.pipeline:
                wanted = next((i for i, n in categories.items() if n == self.pipeline), None)
                if wanted is None:
                    raise RuntimeError(f"Bitrix24: «{self.pipeline}» voronkasi topilmadi. Bor: {', '.join(categories.values())}")
            stages: dict[str, str] = {}
            for cid in categories if wanted is None else [wanted]:
                entity = "DEAL_STAGE" if cid == 0 else f"DEAL_STAGE_{cid}"
                data = self._call(client, base, "crm.status.list", {"filter": {"ENTITY_ID": entity}})
                stages.update({s["STATUS_ID"]: s.get("NAME", "") for s in data.get("result", [])})
            users = self._users(client, base) if self.responsible == "name" else {}
            body: dict = {"entityTypeId": 2, "select": BASE_FIELDS + list(self.fields), "order": {"id": "desc"}}
            if self.fields:
                body["useOriginalUfNames"] = "Y"  # answer custom fields as UF_CRM_..., as written in sources.toml
            filt: dict = {}
            if self.updated_days:
                since = datetime.now(TZ) - timedelta(days=float(self.updated_days))
                filt[">updatedTime"] = since.isoformat(timespec="seconds")
            if wanted is not None:
                filt["categoryId"] = wanted
            if filt:
                body["filter"] = filt
            rows, start = [], 0
            for _ in range(self.max_pages):
                data = self._call(client, base, "crm.item.list", {**body, "start": start})
                for item in data.get("result", {}).get("items", []):
                    rows.append(self._row(item, categories, stages, users))
                if "next" not in data:
                    break
                start = data["next"]
        finally:
            if self._client is None:
                client.close()
        return finish(self.name, rows, "Bitrix24 API", self.columns, self.check,
                      "Bitrix24 bitimlar ro‘yxati bo‘sh (filtr yoki updated_days ni tekshiring)")

    def _users(self, client, base: str) -> dict:
        users, start = {}, 0
        try:
            for _ in range(10):
                data = self._call(client, base, "user.get", {"FILTER": {"ACTIVE": True}, "start": start})
                for u in data.get("result", []):
                    users[str(u.get("ID"))] = " ".join(x for x in (u.get("NAME"), u.get("LAST_NAME")) if x)
                if "next" not in data:
                    break
                start = data["next"]
        except RuntimeError:
            return {}  # the webhook has no "user" scope: show ids instead
        return users

    def _row(self, item: dict, categories: dict, stages: dict, users: dict) -> dict:
        cid = int(item.get("categoryId") or 0)
        row = {
            "ID": item.get("id", ""),
            "Bitim": item.get("title", ""),
            "Summa": money(item.get("opportunity")),
            "Valyuta": item.get("currencyId", ""),
            "Voronka": categories.get(cid, str(cid)),
            "Bosqich": stages.get(item.get("stageId", ""), item.get("stageId", "")),
        }
        uid = str(item.get("assignedById") or "")
        if self.responsible == "name":
            row["Mas’ul"] = users.get(uid, f"Foydalanuvchi {uid}" if uid else "")
        elif self.responsible == "id":
            row["Mas’ul"] = uid
        row["Yaratilgan"] = _date(item.get("createdTime"))
        row["Yangilangan"] = _date(item.get("updatedTime"))
        row["Yopilish sanasi"] = _date(item.get("closedate"))
        row["Yopilgan"] = "ha" if item.get("closed") in (True, "Y") else "yo‘q"
        for key, label in self.fields.items():
            value = item.get(key)
            if value is None:  # crm.item.list answers in camelCase: UF_CRM_1 -> ufCrm1
                camel = "ufCrm" + key.removeprefix("UF_CRM_").replace("_", "")
                value = item.get(camel, "")
            row[label] = ", ".join(map(str, value)) if isinstance(value, list) else value
        return row


def make(spec: dict, app_dir: Path) -> Bitrix24DealsSource:
    return Bitrix24DealsSource(spec, app_dir)
