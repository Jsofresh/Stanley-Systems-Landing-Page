#!/home/jaden/.hermes/hermes-agent/venv/bin/python
"""Render and email a Stanley Systems AI Office Blueprint.

This is the deterministic delivery helper. A Hermes agent is responsible for
creating the custom blueprint JSON from the intake. This script only:
- validates the JSON shape lightly,
- fills templates/ai-office-blueprint/fable-blueprint-template.html,
- saves the rendered HTML,
- prints the HTML to PDF,
- sends a short email with the Blueprint PDF attached.

No secrets are printed.
"""
from __future__ import annotations

import argparse
import base64
import html
import json
import os
import re
import shutil
import subprocess
import sys
from datetime import datetime, timezone
from email.message import EmailMessage
from pathlib import Path
from typing import Any

from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

REPO = Path(__file__).resolve().parents[2]
TEMPLATE = REPO / "templates/ai-office-blueprint/fable-blueprint-template.html"
DEFAULT_OUT_DIR = Path("/home/jaden/.openclaw/data/stanley-landing/ai-office-blueprints")
DEFAULT_PROFILE = Path("/home/jaden/.hermes/profiles/stanley-outbound")


def esc(value: Any) -> str:
    return html.escape(str(value or ""), quote=True).replace("\n", "<br>")


def checklist(items: list[str]) -> str:
    clean = [str(item).strip() for item in items if str(item).strip()]
    rows = []
    for idx, item in enumerate(clean[:8], start=1):
        rows.append(
            f'<div class="check-item"><span class="cbox"></span><span class="cidx">{idx}.</span><span>{esc(item)}</span></div>'
        )
    return "\n".join(rows)


def token_map(blueprint: dict[str, Any]) -> dict[str, str]:
    plays = blueprint.get("plays") or []
    values: dict[str, str] = {
        "blueprint_id": esc(blueprint.get("blueprintId")),
        "generated_date": esc(blueprint.get("generatedDate")),
        "business_name": esc(blueprint.get("businessName")),
        "industry": esc(blueprint.get("industry")),
        "primary_bottleneck": esc(blueprint.get("primaryBottleneck")),
        "highest_drag_area": esc(blueprint.get("highestDragArea")),
        "best_first_ai_use_case": esc(blueprint.get("bestFirstAiUseCase")),
        "quick_capacity_win": esc(blueprint.get("quickCapacityWin")),
        "tools_mentioned": esc(", ".join(blueprint.get("toolsMentioned") or [])),
        "quick_win_checklist": checklist(blueprint.get("quickWinChecklist") or []),
        "recommended_workflow": esc(blueprint.get("recommendedWorkflow")),
        "recommended_workflow_reason": esc(blueprint.get("recommendedWorkflowReason")),
        "what_map_would_reveal": esc(blueprint.get("whatMapWouldReveal")),
        "booking_url": esc(blueprint.get("bookingUrl") or "https://stanley-systems.com/workflow-audit"),
    }
    for idx in range(1, 4):
        play = plays[idx - 1] if idx - 1 < len(plays) else {}
        values.update({
            f"play_{idx}_title": esc(play.get("title")),
            f"play_{idx}_use_when": esc(play.get("useWhen")),
            f"play_{idx}_staff_input": esc(play.get("staffInput")),
            f"play_{idx}_ai_output": esc(play.get("aiOutput")),
            f"play_{idx}_staff_rule": esc(play.get("staffRule")),
            f"play_{idx}_expected_impact": esc(play.get("expectedImpact")),
            f"play_{idx}_prompt": esc(play.get("prompt")),
        })
    return values


def render_html(blueprint: dict[str, Any]) -> str:
    template = TEMPLATE.read_text(encoding="utf-8")
    values = token_map(blueprint)

    def replace(match: re.Match[str]) -> str:
        key = match.group(1).strip()
        return values.get(key, "")

    rendered = re.sub(r"\{\{\s*([^}]+?)\s*\}\}", replace, template)
    if "{{" in rendered:
        unresolved = sorted(set(re.findall(r"\{\{\s*([^}]+?)\s*\}\}", rendered)))
        raise ValueError(f"unresolved template tokens: {unresolved[:8]}")
    return rendered


def gmail_service(profile: Path):
    token_path = profile / "google_token.json"
    if not token_path.exists():
        raise FileNotFoundError(f"Google token not found for profile: {profile}")
    creds = Credentials.from_authorized_user_file(str(token_path))
    return build("gmail", "v1", credentials=creds, cache_discovery=False)


def render_pdf(html_path: Path, pdf_path: Path) -> None:
    chromium = shutil.which("chromium") or shutil.which("chromium-browser") or shutil.which("google-chrome")
    if not chromium:
        raise FileNotFoundError("Chromium is required to render Blueprint PDF")
    pdf_path.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        chromium,
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--print-to-pdf-no-header",
        f"--print-to-pdf={pdf_path}",
        html_path.as_uri(),
    ]
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=45)
    if result.returncode != 0 or not pdf_path.exists() or pdf_path.stat().st_size < 10_000:
        raise RuntimeError((result.stderr or result.stdout or "PDF render failed").strip())


def email_body_html(business_name: str) -> str:
    safe_business = esc(business_name or "your business")
    return f"""
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.55;color:#111827;max-width:620px">
      <p>Thanks for filling out the AI Office Blueprint form.</p>
      <p>Your customized Stanley Systems Blueprint for <strong>{safe_business}</strong> is attached as a downloadable PDF.</p>
      <p>Start with the first staff prompt and the one-week workflow change. The goal is not generic AI tips. It is to help your team turn messy job notes, billing details, follow-ups, and office handoffs into cleaner work faster.</p>
      <p>If you want Stanley Systems to map the full workflow and install the first AI Office system, book the AI Office Map here:<br><a href="https://stanley-systems.com/workflow-audit">https://stanley-systems.com/workflow-audit</a></p>
      <p>Stanley Systems</p>
    </div>
    """.strip()


def send_email(profile: Path, to_email: str, subject: str, email_html: str, pdf_path: Path, from_header: str | None = None) -> dict[str, Any]:
    msg = EmailMessage()
    msg["To"] = to_email
    if from_header:
        msg["From"] = from_header
    msg["Subject"] = subject
    msg.set_content(
        "Thanks for filling out the AI Office Blueprint form. Your customized Stanley Systems Blueprint is attached as a downloadable PDF."
    )
    msg.add_alternative(email_html, subtype="html")
    msg.add_attachment(
        pdf_path.read_bytes(),
        maintype="application",
        subtype="pdf",
        filename=pdf_path.name,
    )
    raw = base64.urlsafe_b64encode(msg.as_bytes()).decode("ascii")
    result = gmail_service(profile).users().messages().send(userId="me", body={"raw": raw}).execute()
    return {"id": result.get("id"), "threadId": result.get("threadId")}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--blueprint-json", required=True, help="Path to custom Blueprint JSON generated by Hermes")
    parser.add_argument("--intake-json", required=True, help="Path to intake/submission JSON")
    parser.add_argument("--profile", default=str(DEFAULT_PROFILE), help="Hermes profile with Google Workspace token")
    parser.add_argument("--out-dir", default=str(DEFAULT_OUT_DIR))
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    blueprint_path = Path(args.blueprint_json)
    intake_path = Path(args.intake_json)
    blueprint = json.loads(blueprint_path.read_text(encoding="utf-8"))
    submission = json.loads(intake_path.read_text(encoding="utf-8"))
    intake = submission.get("intake", submission)
    to_email = str(intake.get("email") or "").strip()
    if not re.match(r"^[^\s@]+@[^\s@]+\.[^\s@]+$", to_email):
        raise ValueError("intake email is missing or invalid")

    if not blueprint.get("generatedDate"):
        blueprint["generatedDate"] = datetime.now(timezone.utc).strftime("%B %-d, %Y")
    if not blueprint.get("bookingUrl"):
        blueprint["bookingUrl"] = "https://stanley-systems.com/workflow-audit"

    rendered = render_html(blueprint)
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    safe_id = re.sub(r"[^A-Za-z0-9_.-]", "-", str(blueprint.get("blueprintId") or submission.get("submissionId") or "blueprint"))
    html_path = out_dir / f"{safe_id}.html"
    pdf_path = out_dir / f"{safe_id}.pdf"
    html_path.write_text(rendered, encoding="utf-8")
    render_pdf(html_path, pdf_path)

    business_name = str(blueprint.get('businessName') or intake.get('businessName') or 'your office')
    subject = f"Your Stanley Systems AI Office Blueprint for {business_name}"
    email_html = email_body_html(business_name)
    if args.dry_run:
        print(json.dumps({"ok": True, "dry_run": True, "html_path": str(html_path), "pdf_path": str(pdf_path), "to": to_email, "subject": subject}, indent=2))
        return 0

    result = send_email(Path(args.profile), to_email, subject, email_html, pdf_path, from_header='"Stanley Systems" <jaden@stanley-systems.com>')
    print(json.dumps({"ok": True, "html_path": str(html_path), "pdf_path": str(pdf_path), "to": to_email, "subject": subject, "gmail": result}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
