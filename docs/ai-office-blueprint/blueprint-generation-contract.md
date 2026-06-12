# AI Office Blueprint Generation Contract

Version: 2026-06-12

## Quality Bar

They understood my workflow better from one form than most consultants do from a full call.

## Intake Contract

Website request:

```json
{
  "submissionId": "aob_uuid",
  "submittedAt": "2026-06-12T00:00:00.000Z",
  "intake": {
    "name": "Jordan Lee",
    "email": "jordan@example.com",
    "businessName": "Bayview Mechanical",
    "businessType": "HVAC service and install",
    "teamSize": "12 field techs, 3 office staff",
    "fieldServiceSoftware": "ServiceTitan",
    "accountingSoftware": "QuickBooks Online",
    "spreadsheetUsage": "Install coordinator tracks permits and rebates in Google Sheets.",
    "informationStuck": "Photos, tech notes, and customer approvals sit in texts before billing sees them.",
    "copyCheckRewrite": "Office staff rewrite job notes into customer updates, invoice notes, and manager questions.",
    "billingDelays": "Invoices wait when labor, materials, or approval notes are missing after the job is marked complete.",
    "missedFollowUp": "Open estimates and warranty callbacks get checked when someone remembers.",
    "toolsInvolved": "ServiceTitan, QuickBooks Online, Gmail, Google Sheets, SMS",
    "desiredOutputType": "Billing-ready job summary and customer-safe update",
    "aiComfortLevel": "Some use, needs structure",
    "messyOfficeExample": "Tech note: done condenser swap, cust approved extra pad, old disconnect bad..."
  }
}
```

Expected response:

```json
{
  "accepted": true,
  "status": "queued",
  "submissionId": "aob_uuid"
}
```

Or, when generation completes synchronously:

```json
{
  "accepted": true,
  "status": "generated",
  "submissionId": "aob_uuid",
  "blueprint": {
    "schemaVersion": "2026-06-12"
  },
  "render": {
    "htmlUrl": "https://example.com/blueprints/aob_uuid",
    "pdfUrl": "https://example.com/blueprints/aob_uuid.pdf"
  }
}
```

## Prompt Rules

- Do not give generic AI tips.
- Aim for 2–3 bespoke mini-workflows using submitted tools, bottleneck, messy example, and desired output.
- One mini-workflow is acceptable only if intake is genuinely too thin and should almost never be the norm.
- Use the submitted field-service, accounting, spreadsheet, email, and messaging tools in the plays when relevant.
- Keep humans in review for billing, account changes, sensitive customer sends, pricing exceptions, and manager judgment.
- Make prompts copy/paste ready. Preserve line breaks and explicit output headings.
- Do not mention internal systems, private implementation tools, secrets, or routing details in generated customer copy.

Bad:

Use ChatGPT to summarize job notes.

Good:

When a tech sends a messy job update, paste it into this workflow. It produces billing notes, missing info, customer-safe summary, CRM note, and owner escalation question.

## Core JSON Shape

The renderer expects the exact shape in `docs/ai-office-blueprint/blueprint-schema.json`.

```json
{
  "schemaVersion": "2026-06-12",
  "blueprintId": "AOB-SAMPLE-001",
  "generatedDate": "June 12, 2026",
  "businessName": "Bayview Mechanical",
  "industry": "HVAC service and install",
  "primaryBottleneck": "Completed jobs are not billing-ready when the field marks them done.",
  "highestDragArea": "Job closeout notes, photos, approvals, labor, and billing context",
  "bestFirstAiUseCase": "Turn messy tech updates into billing notes, missing-info checks, and customer-safe summaries.",
  "quickCapacityWin": "Create one required closeout note format for completed jobs before billing review.",
  "toolsMentioned": ["ServiceTitan", "QuickBooks Online", "Gmail", "Google Sheets", "SMS"],
  "plays": [
    {
      "title": "Messy Tech Note to Billing Packet",
      "useWhen": "A job is marked complete but billing still needs labor, materials, approvals, and open questions clarified.",
      "staffInput": "Paste the raw tech note, photo captions, customer approval notes, and known labor or material details.",
      "aiOutput": "A billing-ready summary, missing-info list, customer-safe summary, CRM note, and owner escalation question.",
      "staffRule": "Staff reviews every billing detail before it is entered or sent. The AI flags gaps; it does not approve charges.",
      "expectedImpact": "Faster billing prep and fewer back-and-forth questions after completed work.",
      "prompt": "You are helping our office turn a messy completed-job update into clean billing prep.\n\nUse this format:\n1. Billing note\n2. Labor and materials mentioned\n3. Missing information to check\n4. Customer-safe update\n5. CRM note\n6. Owner or manager escalation question\n\nRaw update:\n[PASTE TECH NOTE HERE]"
    }
  ],
  "quickWinChecklist": [
    "Pick one completed-job note format for the office to request from techs.",
    "Add a missing-info checklist before billing starts cleanup.",
    "Save the billing packet prompt where office staff can copy it."
  ],
  "recommendedWorkflow": "Completed job to billing-ready handoff",
  "recommendedWorkflowReason": "This workflow touches cash speed, office workload, customer communication, and owner interruptions.",
  "whatMapWouldReveal": "The full Map would show which fields must be captured and which handoffs can be standardized first.",
  "bookingUrl": "/workflow-audit"
}
```

## Renderer Placeholder Mapping

Template path: `templates/ai-office-blueprint/fable-blueprint-template.html`

Renderer path: `lib/ai-office-blueprint/renderer.ts`

Mapping:

- `blueprint_id` from `blueprintId`
- `generated_date` from `generatedDate`
- `business_name` from `businessName`
- `industry` from `industry`
- `primary_bottleneck` from `primaryBottleneck`
- `highest_drag_area` from `highestDragArea`
- `best_first_ai_use_case` from `bestFirstAiUseCase`
- `quick_capacity_win` from `quickCapacityWin`
- `tools_mentioned` from `toolsMentioned.join(", ")`
- `play_1_*`, `play_2_*`, `play_3_*` from `plays`
- `quick_win_checklist` from `quickWinChecklist`
- `recommended_workflow` from `recommendedWorkflow`
- `recommended_workflow_reason` from `recommendedWorkflowReason`
- `what_map_would_reveal` from `whatMapWouldReveal`
- `booking_url` from `bookingUrl`

All untrusted values are HTML-escaped. Prompt line breaks are preserved by the template CSS. If play 3 is missing, the renderer removes the third play block.

## n8n / Hermes Handoff Contract

The website side posts intake payload plus submission ID to `AI_OFFICE_BLUEPRINT_WEBHOOK_URL` when configured. Optional auth is controlled by `AI_OFFICE_BLUEPRINT_WEBHOOK_AUTH_HEADER` and `AI_OFFICE_BLUEPRINT_WEBHOOK_AUTH_TOKEN`.

The automation side may return `accepted/queued` or generated Blueprint JSON plus rendered HTML/PDF locations. The website currently supports hosted HTML rendering and sample preview. PDF export should be added only through the existing Playwright dependency with a server-only renderer job. No new large PDF stack is required.

Website public UI must not mention internal tooling, webhook URLs, environment variable names, or implementation paths.
