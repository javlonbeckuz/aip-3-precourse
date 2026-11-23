"""amoCRM deals (leads) through API v4, read only, as a table.

.env:
    AMOCRM_TOKEN=...            # long-lived token ("долгосрочный токен") of a private integration

sources.toml:

    [[source]]
    name = "amoCRM bitimlar"
    type = "amocrm"
    domain = "baraka.amocrm.ru"     # your account address (amocrm.ru, amocrm.com or kommo.com)
    updated_days = 60               # only deals changed in the last 60 days (keeps it small)
    # pipeline = "B2B savdo"        # only this pipeline (name as in amoCRM)
    # responsible = "name"          # "name" (default), "id" or "none" (hide who is responsible)
    # custom_fields = ["Manba", "Hudud"]   # default: every custom field except phones and e-mails
    # refresh_minutes = 30
    # max_pages = 20                # 250 deals per page

Contacts (names, phones, e-mails) are never requested. The token gives full account access
(amoCRM has no read-only token), so this reader only sends GET requests.
API facts: amocrm.ru/developers/content/crm_platform/leads-api, checked 2026-11-03;
limit 7 requests per second per integration.
"""

from __future__ import annotations

import time
from pathlib import Path

from ._common import TimedRefresh, finish, http_error, local_time, make_client, money, need_secret

SKIP_TYPES = {"multitext", "smart_address", "legal_entity", "chained_list", "file"}


def _field_value(field: dict) -> str:
    out = []
    for v in field.get("values") or []:
        value = v.get("value")
        if value is None:
            value = v.get("enum") or v.get("enum_code") or ""
        if field.get("field_type") in ("date", "date_time", "birthday") and str(value).isdigit():
            value = local_time(value, with_time=field.get("field_type") == "date_time")
        out.append(str(value))
    return ", ".join(x for x in out if x)


class AmoCrmLeadsSource(TimedRefresh):
    def __init__(self, spec: dict, app_dir: Path, client=None):
        self.name = spec["name"]
        self.app_dir = Path(app_dir)
        domain = str(spec.get("domain", "")).strip().removeprefix("https://").removeprefix("http://").strip("/")
        if not domain:
            raise ValueError("sources.toml: amocrm uchun domain = \"kompaniya.amocrm.ru\" yozing")
        self.base = f"https://{domain}/api/v4"
        self.token_env = spec.get("token_env", "AMOCRM_TOKEN")
        self.updated_days = spec.get("updated_days")
        self.pipeline = spec.get("pipeline")
        self.responsible = spec.get("responsible", "name")
        self.custom_fields = spec.get("custom_fields")
        self.columns = spec.get("columns")
        self.check = spec.get("check")
        self.refresh_minutes = float(spec.get("refresh_minutes", 30))
        self.max_pages = int(spec.get("max_pages", 20))
        self.pause = float(spec.get("pause_seconds", 0.2))
        self._client = client

    def _get(self, client, path: str, params=None) -> dict | None:
        resp = client.get(self.base + path, params=params)
        if self.pause:
            time.sleep(self.pause)
        if resp.status_code == 204:
            return None
        if resp.status_code != 200:
            raise http_error("amoCRM", resp)
        return resp.json() if resp.content else None

    def load(self):
        token = need_secret(self.token_env, self.app_dir, "amoCRM uzoq muddatli tokeni")
        client = self._client or make_client()
        client.headers["Authorization"] = f"Bearer {token}"
        try:
            pipelines, stages = {}, {}
            data = self._get(client, "/leads/pipelines") or {}
            for p in data.get("_embedded", {}).get("pipelines", []):
                pipelines[p["id"]] = p.get("name", "")
                for s in p.get("_embedded", {}).get("statuses", []):
                    stages[(p["id"], s["id"])] = s.get("name", "")
            wanted_pipeline = None
            if self.pipeline:
                wanted_pipeline = next((i for i, n in pipelines.items() if n == self.pipeline), None)
                if wanted_pipeline is None:
                    raise RuntimeError(f"amoCRM: «{self.pipeline}» voronkasi topilmadi. Bor: {', '.join(pipelines.values())}")
            users = {}
            if self.responsible == "name":
                try:
                    data = self._get(client, "/users", {"limit": 250}) or {}
                    users = {u["id"]: u.get("name", "") for u in data.get("_embedded", {}).get("users", [])}
                except RuntimeError:
                    users = {}  # users need admin rights; fall back to ids
            params = {"limit": 250, "order[updated_at]": "desc", "with": "loss_reason"}
            if self.updated_days:
                params["filter[updated_at][from]"] = int(time.time() - float(self.updated_days) * 86400)
            rows = []
            for page in range(1, self.max_pages + 1):
                data = self._get(client, "/leads", {**params, "page": page})
                leads = (data or {}).get("_embedded", {}).get("leads", [])
                for lead in leads:
                    if wanted_pipeline is not None and lead.get("pipeline_id") != wanted_pipeline:
                        continue
                    rows.append(self._row(lead, pipelines, stages, users))
                if not data or "next" not in data.get("_links", {}):
                    break
        finally:
            if self._client is None:
                client.close()
        return finish(self.name, rows, "amoCRM API", self.columns, self.check,
                      "amoCRM bitimlar ro‘yxati bo‘sh (filtr yoki updated_days ni tekshiring)")

    def _row(self, lead: dict, pipelines: dict, stages: dict, users: dict) -> dict:
        pid, sid = lead.get("pipeline_id"), lead.get("status_id")
        row = {
            "ID": lead.get("id", ""),
            "Bitim": lead.get("name", ""),
            "Byudjet": money(lead.get("price")),
            "Voronka": pipelines.get(pid, str(pid or "")),
            "Bosqich": stages.get((pid, sid), {142: "Успешно реализовано", 143: "Закрыто и не реализовано"}.get(sid, str(sid or ""))),
        }
        if self.responsible == "name":
            uid = lead.get("responsible_user_id")
            row["Mas’ul"] = users.get(uid, f"Foydalanuvchi {uid}" if uid else "")
        elif self.responsible == "id":
            row["Mas’ul"] = lead.get("responsible_user_id", "")
        row["Yaratilgan"] = local_time(lead.get("created_at"))
        row["Yangilangan"] = local_time(lead.get("updated_at"))
        row["Yopilgan"] = local_time(lead.get("closed_at"))
        embedded = lead.get("_embedded") or {}
        row["Teglar"] = ", ".join(t.get("name", "") for t in embedded.get("tags", []))
        reasons = embedded.get("loss_reason") or []
        row["Rad etish sababi"] = reasons[0].get("name", "") if reasons else ""
        for field in lead.get("custom_fields_values") or []:
            name = field.get("field_name", "")
            if field.get("field_type") in SKIP_TYPES or field.get("field_code") in ("PHONE", "EMAIL"):
                continue
            if self.custom_fields is not None and name not in self.custom_fields:
                continue
            row[name] = _field_value(field)
        return row


def make(spec: dict, app_dir: Path) -> AmoCrmLeadsSource:
    return AmoCrmLeadsSource(spec, app_dir)
