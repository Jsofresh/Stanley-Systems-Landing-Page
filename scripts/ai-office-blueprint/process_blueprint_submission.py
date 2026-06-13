#!/home/jaden/.hermes/hermes-agent/venv/bin/python
"""Immediately process queued AI Office Blueprint submissions.

This is the fast-path Stanley Systems Blueprint worker. The website API calls this
script as soon as a valid intake is completed so the user is not waiting on a
five-minute cron tick. The cron job remains useful only as a retry/fallback rail.

Flow:
1. Read the JSONL submission queue.
2. Select the requested submission ID, or the oldest eligible unprocessed record.
3. Generate a tailored Blueprint JSON from the intake.
4. Call send_blueprint_email.py to render the formatted HTML and email it.
5. Mark the submission processed only after the render/send helper succeeds.

No secrets are printed.
"""
from __future__ import annotations

import argparse
import fcntl
import json
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

REPO = Path(__file__).resolve().parents[2]
DATA_DIR = Path("/home/jaden/.openclaw/data/stanley-landing")
QUEUE_PATH = DATA_DIR / "ai-office-blueprint-submissions.jsonl"
STATE_PATH = DATA_DIR / "ai-office-blueprint-email-state.json"
LOCK_PATH = DATA_DIR / "ai-office-blueprint-email-state.lock"
WORK_DIR = DATA_DIR / "ai-office-blueprint-worker"
DELIVERY_HELPER = REPO / "scripts/ai-office-blueprint/send_blueprint_email.py"
DEFAULT_PROFILE = Path("/home/jaden/.hermes/profiles/stanley-outbound")
BOOKING_URL = "https://stanley-systems.com/workflow-audit"


def clean(value: Any, fallback: str = "") -> str:
    text = str(value or "").strip()
    text = re.sub(r"\s+", " ", text)
    return text or fallback


def sentence(value: Any, fallback: str) -> str:
    text = clean(value, fallback)
    return text if text.endswith((".", "!", "?")) else f"{text}."


def compact_snippet(value: Any, fallback: str, max_len: int = 220) -> str:
    text = clean(value, fallback)
    if len(text) <= max_len:
        return text
    return text[: max_len - 1].rstrip() + "…"


def split_tools(intake: dict[str, Any]) -> list[str]:
    raw_values = [
        intake.get("fieldServiceSoftware"),
        intake.get("accountingSoftware"),
        intake.get("spreadsheetUsage"),
        intake.get("toolsInvolved"),
    ]
    tools: list[str] = []
    for raw in raw_values:
        for piece in re.split(r"[,/;|]+|\band\b", str(raw or ""), flags=re.I):
            item = clean(piece)
            if item and item.lower() not in {t.lower() for t in tools}:
                tools.append(item)
    return tools[:8] or ["field-service software", "accounting software", "email", "spreadsheets"]


def pick_focus(intake: dict[str, Any]) -> tuple[str, str, str]:
    billing = clean(intake.get("billingDelays"))
    follow_up = clean(intake.get("missedFollowUp"))
    stuck = clean(intake.get("informationStuck"))
    rewrite = clean(intake.get("copyCheckRewrite"))
    messy = clean(intake.get("messyOfficeExample"))

    def score(text: str) -> int:
        return len(text)

    candidates = [
        (score(billing) + 80, "Billing closeout and invoice prep", "completed jobs are not becoming clean billing packets fast enough", "billing"),
        (score(follow_up) + 55, "Follow-up recovery", "follow-up work needs a clearer owner, message, urgency, and next action", "follow_up"),
        (score(stuck) + 45, "Office handoff cleanup", "job information is getting stuck between the field, inbox, tools, and office", "handoff"),
        (score(rewrite) + 30, "Copy, check, and rewrite cleanup", "staff are spending too much time rewriting rough information before work can move", "rewrite"),
        (score(messy) + 20, "Messy-input cleanup", "rough office inputs need to become cleaner staff actions with fewer manual checks", "messy"),
    ]
    _, workflow, reason, focus = max(candidates, key=lambda item: item[0])
    return workflow, reason, focus


def build_play(title: str, use_when: str, staff_input: str, ai_output: str, staff_rule: str, expected_impact: str, prompt: str) -> dict[str, str]:
    return {
        "title": title,
        "useWhen": use_when,
        "staffInput": staff_input,
        "aiOutput": ai_output,
        "staffRule": staff_rule,
        "expectedImpact": expected_impact,
        "prompt": prompt,
    }


def generate_blueprint(record: dict[str, Any]) -> dict[str, Any]:
    intake = record.get("intake") or record
    submission_id = clean(record.get("submissionId"), f"aob_{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')}")
    business = clean(intake.get("businessName"), "Your Business")
    industry = clean(intake.get("businessType"), "service business")
    desired = clean(intake.get("desiredOutputType"), "clean office notes, missing-info checks, and next actions")
    messy = compact_snippet(intake.get("messyOfficeExample"), "Paste the rough job note, customer message, invoice problem, or office update that staff normally has to clean up.", 420)
    stuck = compact_snippet(intake.get("informationStuck"), "Information gets stuck before office staff can finish the handoff.", 360)
    rewrite = compact_snippet(intake.get("copyCheckRewrite"), "Staff are spending time copying, checking, and rewriting office information.", 360)
    billing = compact_snippet(intake.get("billingDelays"), "Completed work is not turning into invoice-ready detail fast enough.", 360)
    follow_up = compact_snippet(intake.get("missedFollowUp"), "Follow-up work can slip when ownership and next action are not clear.", 360)
    tools = split_tools(intake)
    workflow, workflow_reason, focus = pick_focus(intake)

    if focus == "billing":
        primary = f"{business}'s biggest near-term drag is billing closeout: {billing}"
        best_use_case = f"Turn completed-work notes into a billing-ready packet for {business}, including missing details, approval checks, and the next staff action."
        quick_win = f"Run the last five delayed invoices through a single billing prep prompt and mark the exact fields staff had to chase after the job was done."
    elif focus == "follow_up":
        primary = f"{business}'s biggest near-term drag is follow-up leakage: {follow_up}"
        best_use_case = f"Turn stale estimates, unpaid invoices, callbacks, and customer updates into a ranked recovery queue with message drafts and owners."
        quick_win = f"Build one daily follow-up queue from the messy sources staff already check: inboxes, notes, spreadsheets, and {tools[0]}."
    elif focus == "rewrite":
        primary = f"{business}'s biggest near-term drag is repeated copy, check, and rewrite work: {rewrite}"
        best_use_case = f"Turn rough internal notes into {desired}, using one staff-reviewed format every time."
        quick_win = "Give staff one reusable cleanup prompt and require the same missing-info checklist before anything moves to billing or customer follow-up."
    else:
        primary = f"{business}'s biggest near-term drag is office handoff mess: {stuck}"
        best_use_case = f"Turn messy field, inbox, and spreadsheet inputs into {desired} before work reaches billing or follow-up."
        quick_win = f"Pick one repeated handoff in {tools[0]} and standardize the exact fields staff must confirm before passing it forward."

    play_1_prompt = (
        f"You are helping {business}, a {industry}. Turn the raw office input below into {desired}.\n\n"
        "Return exactly:\n"
        "1. Clean internal note\n"
        "2. Missing information to check\n"
        "3. Customer-safe update if needed\n"
        "4. Next office action and owner\n"
        "5. Manager approval flag\n\n"
        "Raw input:\n[PASTE THE REAL NOTE HERE]"
    )
    play_2_prompt = (
        f"Build a billing prep packet for {business}. Use this completed-work context and identify what blocks invoicing today.\n\n"
        "Return: billing summary, billable details mentioned, missing fields, approval gaps, and the next staff action.\n\n"
        "Context:\n[PASTE JOB CLOSEOUT CONTEXT HERE]"
    )
    play_3_prompt = (
        f"Create a follow-up recovery action for {business}. Use the stale estimate, invoice, callback, or customer update below.\n\n"
        "Return: customer message draft, internal next action, owner, urgency, and escalation flag.\n\n"
        "Context:\n[PASTE FOLLOW-UP CONTEXT HERE]"
    )

    return {
        "schemaVersion": "2026-06-12",
        "blueprintId": submission_id,
        "generatedDate": datetime.now(timezone.utc).strftime("%B %-d, %Y"),
        "businessName": business,
        "industry": industry,
        "primaryBottleneck": primary,
        "highestDragArea": sentence(stuck, "Office information gets stuck between the field, inbox, tools, and billing."),
        "bestFirstAiUseCase": best_use_case,
        "quickCapacityWin": quick_win,
        "toolsMentioned": tools,
        "plays": [
            build_play(
                "Messy Office Input to Clean Handoff",
                f"Use this when {business} staff get rough notes, customer messages, job updates, or spreadsheet details that need to become {desired}.",
                messy,
                f"A cleaned internal note, missing-info list, customer-safe wording, next action, and approval flag for {business}.",
                "AI prepares the handoff. Staff confirms facts, prices, promises, and system updates before anything is sent or entered.",
                "Less retyping, fewer dropped details, and faster movement from field notes to finished office work.",
                play_1_prompt,
            ),
            build_play(
                "Billing Delay Check",
                f"Use this when completed work at {business} cannot move cleanly into invoice prep or payment follow-up.",
                billing,
                "A billing-ready summary, missing fields, approval gaps, and the exact detail staff must chase before invoicing.",
                "AI assembles the packet. Staff owns billable detail, accounting accuracy, and final invoice approval.",
                "Faster billing prep and fewer end-of-day invoice delays.",
                play_2_prompt,
            ),
            build_play(
                "Follow-Up Recovery Queue",
                f"Use this when {business} has estimates, unpaid invoices, callbacks, or customer updates sitting without a clear next action.",
                follow_up,
                "A ranked next action, message draft, owner, urgency level, and escalation flag.",
                "AI drafts and organizes. Staff confirms timing, account status, and tone before sending.",
                "More recovered work and fewer follow-ups living in memory or scattered lists.",
                play_3_prompt,
            ),
        ],
        "quickWinChecklist": [
            f"Choose one repeated {workflow.lower()} example from this week.",
            f"Collect five real inputs from {tools[0]} or the inbox before changing any software.",
            "Run those five examples through the matching prompt in this Blueprint.",
            "Write down every fact staff still had to verify manually.",
            "Turn those manual checks into a short review checklist for the team.",
            "Use the checklist for one week before automating anything deeper.",
        ],
        "recommendedWorkflow": workflow,
        "recommendedWorkflowReason": f"The intake points to {workflow_reason}. That is the fastest place to create capacity without forcing {business} to switch systems first.",
        "whatMapWouldReveal": f"The full AI Office Map would trace where this drag starts, which fields in {', '.join(tools[:3])} already have the needed data, what staff still must approve, and the first install priority for turning this into a repeatable workflow.",
        "bookingUrl": BOOKING_URL,
    }


def read_queue() -> list[dict[str, Any]]:
    if not QUEUE_PATH.exists():
        return []
    records: list[dict[str, Any]] = []
    for line in QUEUE_PATH.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            records.append(json.loads(line))
        except json.JSONDecodeError:
            continue
    return records


def load_state() -> dict[str, Any]:
    if not STATE_PATH.exists():
        return {"processed": {}, "failures": {}}
    try:
        state = json.loads(STATE_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        state = {"processed": {}, "failures": {}}
    state.setdefault("processed", {})
    state.setdefault("failures", {})
    return state


def save_state(state: dict[str, Any]) -> None:
    STATE_PATH.parent.mkdir(parents=True, exist_ok=True)
    temp = STATE_PATH.with_suffix(".tmp")
    temp.write_text(json.dumps(state, indent=2, sort_keys=True), encoding="utf-8")
    temp.replace(STATE_PATH)


def eligible(record: dict[str, Any]) -> bool:
    return record.get("status") == "queued_for_hermes_email" or record.get("requestedDelivery") == "hermes_generated_html_email"


def select_record(records: list[dict[str, Any]], state: dict[str, Any], submission_id: str | None) -> dict[str, Any] | None:
    processed = state.get("processed", {})
    if submission_id:
        for record in records:
            if record.get("submissionId") == submission_id and eligible(record) and submission_id not in processed:
                return record
        return None
    for record in records:
        sid = record.get("submissionId")
        if sid and eligible(record) and sid not in processed:
            return record
    return None


def call_delivery(record_path: Path, blueprint_path: Path, dry_run: bool, profile: Path) -> dict[str, Any]:
    cmd = [
        str(DELIVERY_HELPER),
        "--blueprint-json",
        str(blueprint_path),
        "--intake-json",
        str(record_path),
        "--profile",
        str(profile),
    ]
    if dry_run:
        cmd.append("--dry-run")
    result = subprocess.run(cmd, cwd=str(REPO), text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=90)
    if result.returncode != 0:
        raise RuntimeError((result.stderr or result.stdout or f"delivery helper exited {result.returncode}").strip())
    return json.loads(result.stdout)


def process_one(submission_id: str | None, dry_run: bool, profile: Path) -> dict[str, Any]:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    WORK_DIR.mkdir(parents=True, exist_ok=True)
    with LOCK_PATH.open("w") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        state = load_state()
        records = read_queue()
        record = select_record(records, state, submission_id)
        if not record:
            return {"ok": True, "processed": False, "reason": "no eligible unprocessed submission", "submissionId": submission_id}

        sid = str(record["submissionId"])
        safe_sid = re.sub(r"[^A-Za-z0-9_.-]", "-", sid)
        record_path = WORK_DIR / f"{safe_sid}.submission.json"
        blueprint_path = WORK_DIR / f"{safe_sid}.blueprint.json"
        record_path.write_text(json.dumps(record, indent=2), encoding="utf-8")
        blueprint = generate_blueprint(record)
        blueprint_path.write_text(json.dumps(blueprint, indent=2), encoding="utf-8")

        try:
            delivery = call_delivery(record_path, blueprint_path, dry_run=dry_run, profile=profile)
        except Exception as exc:
            state.setdefault("failures", {})[sid] = {
                "failedAt": datetime.now(timezone.utc).isoformat(),
                "error": str(exc)[:1000],
                "dryRun": dry_run,
            }
            save_state(state)
            raise

        state.setdefault("processed", {})[sid] = {
            "processedAt": datetime.now(timezone.utc).isoformat(),
            "dryRun": dry_run,
            "blueprintPath": str(blueprint_path),
            "htmlPath": delivery.get("html_path"),
            "gmail": delivery.get("gmail"),
            "to": delivery.get("to"),
        }
        state.get("failures", {}).pop(sid, None)
        save_state(state)
        return {"ok": True, "processed": True, "submissionId": sid, "dryRun": dry_run, "delivery": delivery, "blueprintPath": str(blueprint_path)}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--submission-id")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--profile", default=str(DEFAULT_PROFILE))
    args = parser.parse_args()
    try:
        result = process_one(args.submission_id, args.dry_run, Path(args.profile))
        print(json.dumps(result, indent=2))
        return 0
    except Exception as exc:
        print(json.dumps({"ok": False, "error": str(exc), "submissionId": args.submission_id}, indent=2), file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
