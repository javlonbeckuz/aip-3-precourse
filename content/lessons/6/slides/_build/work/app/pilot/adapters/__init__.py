"""Extra data sources for the pilot bot, from the Praktikum integrations cookbook.

`pilot/sources.py` calls `register(SOURCE_TYPES)` when this package exists, so every type
below can be used in agent/sources.toml. The guides (Uzbek) live next to the cookbook's
system folders: integrations/<system>/qollanma.md.

| type          | reads                                                              | key in .env           |
|---------------|--------------------------------------------------------------------|-----------------------|
| telegram_json | Telegram Desktop export (result.json), names hidden, phones masked | -                     |
| instagram_json| Instagram "Export your information" zip (JSON), names hidden       | -                     |
| excel, xls    | any "Excel": .xls that is HTML or XML, .xlsx, header and totals fix| -                     |
| bank_1c       | bank statement in the 1C text format (1CClientBankExchange)        | -                     |
| amocrm        | amoCRM deals, API v4                                               | AMOCRM_TOKEN          |
| bitrix24      | Bitrix24 deals, inbound webhook                                    | BITRIX24_WEBHOOK      |
| odata_1c      | 1C standard OData interface                                        | ONEC_ODATA_URL, ONEC_USER, ONEC_PASSWORD |
| url           | CSV or JSON from a private link (Apps Script, 1C HTTP service)     | the name in url_env   |
| moysklad      | MoySklad stock report                                              | MOYSKLAD_TOKEN        |
| poster        | Poster POS sales, stock or menu                                    | POSTER_TOKEN          |

Every reader only reads. File readers subclass FileSource, so a fresh file sent to the bot
or pushed with `deploy.py data` is picked up like any other export.
"""

from __future__ import annotations


TYPES = {
    "telegram_json": "telegram_json",
    "instagram_json": "instagram_json",
    "excel": "excel",
    "xls": "excel",
    "bank_1c": "bank_1c",
    "amocrm": "amocrm",
    "bitrix24": "bitrix24",
    "odata_1c": "odata_1c",
    "url": "url_source",
    "moysklad": "moysklad",
    "poster": "poster",
}


def _lazy(module: str):
    """A factory that imports its module only when sources.toml uses it.

    pilot/sources.py calls register() while it is still being imported, and every adapter
    imports pilot.sources, so importing the adapter modules here would be circular.
    """

    def factory(spec: dict, app_dir):
        from importlib import import_module

        return import_module(f"{__name__}.{module}").make(spec, app_dir)

    factory.__name__ = f"{module}_source"
    return factory


def register(source_types: dict) -> None:
    for kind, module in TYPES.items():
        source_types.setdefault(kind, _lazy(module))
