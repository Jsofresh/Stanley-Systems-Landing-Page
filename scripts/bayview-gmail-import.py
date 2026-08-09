#!/home/jaden/.hermes/hermes-agent/venv/bin/python
"""Import real Gmail messages into the Bayview office-email demo ledger.

Uses an existing Hermes Google Workspace profile token. This is intentionally a
thin harness: Gmail search/read + JSONL persistence. Judgment/routing stays in
lib/stanley-demo/ops-layer.ts.
"""
from __future__ import annotations

import argparse
import email.utils
import json
import os
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

DEFAULT_PROFILE = "/home/jaden/.hermes/profiles/stanley-scout"
GAPI = "/home/jaden/.hermes/skills/productivity/google-workspace/scripts/google_api.py"
PYTHON = "/home/jaden/.hermes/hermes-agent/venv/bin/python"
OUT_DIR = Path("/home/jaden/.local/share/stanley-systems/data/stanley-demo/office-emails")
STATE_FILE = Path("/home/jaden/.local/share/stanley-systems/data/stanley-demo/gmail-import-state.json")

STAFF_BY_TOKEN = {
    "dana": "Dana Brooks <dana@bayviewheating.demo>",
    "carla": "Carla Nguyen <carla@bayviewheating.demo>",
    "mike": "Mike Reynolds <mike@bayviewheating.demo>",
    "luis": "Luis Martinez <luis@bayviewheating.demo>",
    "trevor": "Trevor Hayes <trevor@bayviewheating.demo>",
    "marcus": "Marcus Reed <marcus@bayviewheating.demo>",
}


def run_gapi(profile: str, args: list[str]) -> Any:
    env = os.environ.copy()
    env["HERMES_HOME"] = profile
    p = subprocess.run([PYTHON, GAPI, *args], env=env, text=True, capture_output=True, timeout=120)
    if p.returncode != 0:
        raise RuntimeError(f"gapi failed: {p.stderr[:500] or p.stdout[:500]}")
    return json.loads(p.stdout)


def gmail_service(profile: str):
    creds = Credentials.from_authorized_user_file(str(Path(profile) / "google_token.json"))
    return build("gmail", "v1", credentials=creds, cache_discovery=False)


def get_header(headers: list[dict[str, str]], name: str) -> str:
    lower = name.lower()
    for h in headers:
        if h.get("name", "").lower() == lower:
            return h.get("value", "")
    return ""


def enrich_with_metadata(service: Any, msg_id: str, fallback: dict[str, Any]) -> dict[str, Any]:
    try:
        msg = service.users().messages().get(
            userId="me",
            id=msg_id,
            format="metadata",
            metadataHeaders=["From", "To", "Cc", "Subject", "Date"],
        ).execute()
        headers = msg.get("payload", {}).get("headers", [])
        return {
            **fallback,
            "from": get_header(headers, "From") or fallback.get("from", ""),
            "to": get_header(headers, "To") or fallback.get("to", ""),
            "cc": get_header(headers, "Cc") or fallback.get("cc", ""),
            "subject": get_header(headers, "Subject") or fallback.get("subject", ""),
            "date": get_header(headers, "Date") or fallback.get("date", ""),
        }
    except Exception:
        return fallback


def load_state() -> set[str]:
    if not STATE_FILE.exists():
        return set()
    try:
        return set(json.loads(STATE_FILE.read_text()).get("imported_message_ids", []))
    except Exception:
        return set()


def save_state(imported: set[str]) -> None:
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    STATE_FILE.write_text(json.dumps({"imported_message_ids": sorted(imported), "updatedAt": now_iso()}, indent=2) + "\n")


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def day_stamp(iso: str) -> str:
    return iso[:10]


def parse_addresses(value: str) -> list[str]:
    return [addr for _, addr in email.utils.getaddresses([value or ""]) if addr]


def infer_staff(value: str) -> str:
    lower = (value or "").lower()
    for token, display in STAFF_BY_TOKEN.items():
        if token in lower:
            return display
    if lower:
        parsed = email.utils.parseaddr(value)
        if parsed[1]:
            return f"{parsed[0] or parsed[1]} <{parsed[1]}>"
    return "Unknown Bayview Staff <unknown@bayviewheating.demo>"


def infer_customer(subject: str, body: str) -> str:
    text = f"{subject}\n{body}".lower()
    known = [
        "Sarah Johnson", "Tom Whitaker", "Maya Robinson", "Alicia Ramirez", "Denise Carter",
        "Nina Patel", "Kevin Huang", "George Miller", "Brian Cole", "Mei Tanaka",
        "Lena Ortiz", "Victor Nguyen", "Priya Shah", "Ethan Brooks", "Oscar Bennett",
    ]
    for name in known:
        if name.lower() in text or name.split()[-1].lower() in text:
            return name
    return ""


def record_from_message(summary: dict[str, Any], full: dict[str, Any]) -> dict[str, Any]:
    body = full.get("body") or summary.get("snippet") or ""
    subject = full.get("subject") or summary.get("subject") or ""
    from_header = full.get("from") or summary.get("from") or ""
    to_header = full.get("to") or summary.get("to") or ""
    date = full.get("date") or summary.get("date") or now_iso()
    return {
        "source": "gmail_real_office_email",
        "event": "office_email_received",
        "receivedAt": now_iso(),
        "gmailMessageId": summary.get("id"),
        "gmailThreadId": summary.get("threadId"),
        "gmailDate": date,
        "from": infer_staff(from_header),
        "to": [infer_staff(addr) for addr in parse_addresses(to_header)] or ["Bayview Office <office@bayviewheating.demo>"],
        "cc": [],
        "subject": subject,
        "body": body[:3000],
        "relatedCustomerName": infer_customer(subject, body),
        "relatedAddress": "",
        "priority": "high" if any(w in f"{subject} {body}".lower() for w in ["urgent", "today", "emergency", "cannot find", "invoice"]) else "normal",
        "realEmail": True,
    }


def append_record(record: dict[str, Any]) -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    path = OUT_DIR / f"{day_stamp(record['receivedAt'])}.jsonl"
    with path.open("a") as f:
        f.write(json.dumps(record, ensure_ascii=False) + "\n")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--profile", default=DEFAULT_PROFILE)
    ap.add_argument("--query", default='to:(jaden+bayview-dana@stanley-systems.com OR jaden+bayview-carla@stanley-systems.com OR jaden+bayview-mike@stanley-systems.com) newer_than:14d')
    ap.add_argument("--max", type=int, default=10)
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    imported = load_state()
    service = gmail_service(args.profile)
    results = run_gapi(args.profile, ["gmail", "search", args.query, "--max", str(args.max)])
    new_records = []
    for summary in results:
        msg_id = summary.get("id")
        if not msg_id or msg_id in imported:
            continue
        full = run_gapi(args.profile, ["gmail", "get", msg_id])
        full = enrich_with_metadata(service, msg_id, full)
        record = record_from_message(summary, full)
        new_records.append(record)
        if not args.dry_run:
            append_record(record)
            imported.add(msg_id)

    if not args.dry_run:
        save_state(imported)
    print(json.dumps({
        "ok": True,
        "query": args.query,
        "found": len(results),
        "imported": len(new_records),
        "dryRun": args.dry_run,
        "records": [{"subject": r["subject"], "relatedCustomerName": r["relatedCustomerName"], "priority": r["priority"]} for r in new_records],
    }, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
