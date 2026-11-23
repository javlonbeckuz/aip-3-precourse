"""1C:Enterprise 8.3 standard OData interface (REST), read only, as a table.

Needs the 1C installer: publish the infobase on a web server with "Публиковать стандартный
интерфейс OData", add the objects to the OData composition, and create a separate 1C user with
read-only rights and a Latin login (Basic auth with Cyrillic logins often fails).
Never expose 1C to the whole internet: HTTPS plus an IP allowlist for the bot's server, or a VPN.

.env:
    ONEC_ODATA_URL=https://1c.kompaniya.uz/baza/odata/standard.odata/
    ONEC_USER=ai_reader
    ONEC_PASSWORD=...

sources.toml (names of registers and fields differ between configurations; the installer
reads them from .../standard.odata/$metadata):

    [[source]]
    name = "Ombor qoldig‘i (1C OData)"
    type = "odata_1c"
    entity = "AccumulationRegister_ТоварыНаСкладах/Balance()"
    expand = ["Номенклатура"]
    select = ["Номенклатура/Code", "Номенклатура/Description", "КоличествоBalance"]
    rename = { "Номенклатура/Code" = "Kod", "Номенклатура/Description" = "Mahsulot", "КоличествоBalance" = "Qoldiq" }
    # filter = "Склад_Key eq guid'...'"
    # sum_by = ["Kod", "Mahsulot"]   # one row per product: add up the other number columns
    #                                # (a balance comes back per warehouse and characteristic)
    # top = 5000                     # more rows than this: the bot says the list was cut
    # refresh_minutes = 30

Official: v8.1c.ru/platforma/rest-interfeys/ (OData 3.0, JSON or Atom, read and write), checked 2026-11-03.
"""

from __future__ import annotations

from pathlib import Path

import httpx

from ._common import TimedRefresh, finish, flatten, http_error, make_client, need_secret


class OData1CSource(TimedRefresh):
    def __init__(self, spec: dict, app_dir: Path, client=None):
        self.name = spec["name"]
        self.app_dir = Path(app_dir)
        self.entity = spec.get("entity", "").strip("/")
        if not self.entity:
            raise ValueError("sources.toml: odata_1c uchun entity = \"...\" yozing (1C o‘rnatuvchidan so‘rang)")
        self.url_env = spec.get("url_env", "ONEC_ODATA_URL")
        self.user_env = spec.get("user_env", "ONEC_USER")
        self.password_env = spec.get("password_env", "ONEC_PASSWORD")
        self.select = spec.get("select") or []
        self.expand = spec.get("expand") or []
        self.filter = spec.get("filter")
        self.top = int(spec.get("top", 5000))
        self.rename = dict(spec.get("rename") or {})
        self.sum_by = list(spec.get("sum_by") or [])
        self.columns = spec.get("columns")
        self.check = spec.get("check")
        self.refresh_minutes = float(spec.get("refresh_minutes", 30))
        self._client = client

    def load(self):
        base = need_secret(self.url_env, self.app_dir, "1C OData manzili")
        user = need_secret(self.user_env, self.app_dir, "1C foydalanuvchisi")
        password = need_secret(self.password_env, self.app_dir, "1C paroli")
        if not base.endswith("/"):
            base += "/"
        params = {"$format": "json", "$top": str(self.top)}
        if self.select:
            params["$select"] = ",".join(self.select)
        if self.expand:
            params["$expand"] = ",".join(self.expand)
        if self.filter:
            params["$filter"] = self.filter
        client = self._client or make_client()
        try:
            resp = client.get(base + self.entity, params=params, auth=httpx.BasicAuth(user, password))
        finally:
            if self._client is None:
                client.close()
        if resp.status_code != 200:
            raise http_error("1C OData", resp)
        try:
            items = resp.json().get("value", [])
        except ValueError:
            raise RuntimeError("1C OData: JSON kelmadi (manzil yoki nashr sozlamasini tekshiring)") from None
        rows = []
        for item in items:
            flat = {k: v for k, v in flatten(item).items()
                    if not k.startswith("odata.") and "@" not in k}
            rows.append({self.rename.get(k, k): v for k, v in flat.items()})
        if self.sum_by:
            rows = sum_rows(rows, self.sum_by)
        table = finish(self.name, rows, "1C OData", self.columns, self.check,
                       "1C OData bo‘sh ro‘yxat qaytardi (obyekt OData tarkibiga qo‘shilganmi?)")
        if len(items) >= self.top and not table.problem:
            table.problem = (f"{self.name}: 1C {self.top} qatordan ko‘p qaytardi, ro‘yxat kesildi; "
                             "filter qo‘shing yoki top ni oshiring")
        return table


def sum_rows(rows: list[dict], keys: list[str]) -> list[dict]:
    """One row per key (e.g. product): numbers are added up, other columns keep the first value."""
    out: dict[tuple, dict] = {}
    for row in rows:
        key = tuple(str(row.get(k, "")) for k in keys)
        if key not in out:
            out[key] = dict(row)
            continue
        acc = out[key]
        for col, value in row.items():
            if col in keys:
                continue
            if isinstance(value, (int, float)) and isinstance(acc.get(col), (int, float)):
                acc[col] = acc[col] + value
    return list(out.values())


def make(spec: dict, app_dir: Path) -> OData1CSource:
    return OData1CSource(spec, app_dir)
