# Cashflow Control System crop notes

Source brief: `/home/jaden/.hermes/cache/documents/doc_83244fad04fc_message.txt`
Contract: `docs/specs/cashflow-control-system-visual-contract.md`
Atlas: `docs/visual-references/stanley-systems/REFERENCE_ATLAS.md`

## Source image availability

Concrete cashflow-related PNG references now exist in this folder and under `../crops/`, generated from available Hermes cache videos and current-homepage screenshots. See `../REFERENCE_ATLAS.md` for exact filenames, source paths, and crop coordinates.

The available media covers the Cashflow four-step explainer and current Money Leak Map dashboard. Direct screenshots for every requested cashflow page subsection were not present, so some crop roles remain proxy references plus written targets.

Do not use previous implementation screenshots under `artifacts/**/cashflow-control-*.png` as source targets unless an orchestrator explicitly marks them as approved references.

## Crop target: `crops/cashflow-dashboard-card.png`

Reference role:
- Cashflow hero dashboard card.

Target area if source screenshot exists:
- Crop the right-side hero dashboard composition.
- Include the primary white card boundaries, panel header(s), metric strip, and visible flow/status cards.
- Keep enough margin to capture shadow, border radius, pale green background glow, and card depth.

Required visible/semantic elements:
- Workflow Status
- Invoice Performance
- Next Up
- Metric strip with:
  - 40%+ Faster time to invoice
  - 25–35% Improvement in cash velocity
  - 2–5 hrs/week Less office drag
  - 100% Visibility across the flow

Layout qualities to preserve:
- Premium white dashboard, not dark or generic gray.
- Rounded card corners with subtle border and soft shadow.
- Green accents that indicate movement toward cash.
- A mix of compact status panels and proof metrics.
- Enough whitespace that the dashboard feels controlled, not dense.

Builder interpretation:
- Recreate as native DOM panels using `PremiumCard`, `DiagramPanel`, `MetricStrip`, `IconMedallion`, and `FlowSequence`/step components.
- Do not paste this crop into production.

## Crop target: `crops/cashflow-alert-card.png`

Reference role:
- Handoff/human exception or billing source blocker treatment.

Target area if source screenshot exists:
- Crop the specific exception/action panel where the system needs a human.
- Include title, owner/assignee, next steps, and routing status if visible.
- Keep surrounding connector/route context if it clarifies where the exception came from.

Required visible/semantic elements:
- Completed job missing details
- Action Needed
- Assigned to
- Next steps
- Blocker Detected
- Routed to the right person

Layout qualities to preserve:
- Alert treatment should be restrained and operational.
- Minimal red is acceptable for blocker status; orange/amber/yellow is not.
- The panel should feel actionable, not like a dead error.
- The route to the right person must be clear.

Builder interpretation:
- Use a shared `AlertPanel` from the component foundry.
- Use `message-bubble`, `file-invoice`, `user`, or `shield-check` primitives as needed.
- Keep all alert text as DOM text.

## Crop target: `crops/cashflow-metric-strip.png`

Reference role:
- Hero or dashboard proof/metric strip.

Target area if source screenshot exists:
- Crop the horizontal/stacked strip containing the four cashflow proof metrics.
- Include card boundaries and spacing between metrics.

Required visible/semantic elements:
- 40%+ Faster time to invoice
- 25–35% Improvement in cash velocity
- 2–5 hrs/week Less office drag
- 100% Visibility across the flow

Layout qualities to preserve:
- Proof metrics should be prominent, readable, and premium.
- Numbers should have stronger visual weight than labels.
- Cards/tiles should use soft green tint or green accent, not harsh colors.
- Mobile should wrap into two columns or stacked cards without truncation.

Builder interpretation:
- Implement with `MetricStrip` or shared metric-card component.
- Use native DOM text for all numbers and labels.

## Crop target: `crops/cashflow-flow-row.png`

Reference role:
- Cashflow hero or explanatory six-step flow.

Target area if source screenshot exists:
- Crop the complete row from the first node to the last node.
- Include arrows/connectors and node labels.
- Include enough vertical space to capture medallion depth and label placement.

Required visible/semantic elements:
- Customer Intake
- Job Complete
- Billing Ready
- Invoice Sent
- Followed Up
- Cash Collected

Layout qualities to preserve:
- Directional movement must be obvious.
- Green arrows/connectors should bind the sequence together.
- Nodes should use icon medallions or premium step cards, not plain bullets.
- Labels must be centered/readable.
- Mobile must become vertical or 2-column without awkward arrow overlap.

Primitive mapping:
- Customer Intake: `user` or `users`
- Job Complete: `check-circle`
- Billing Ready: `file-invoice`
- Invoice Sent: `message-bubble` or invoice/send treatment
- Followed Up: `phone-missed` or `message-bubble`
- Cash Collected: `dollar-circle`

Builder interpretation:
- Implement with `FlowSequence` and `FlowNode` once the component foundry exists.
- Keep labels as DOM text.

## Additional written crop targets from the five page sections

If source screenshots are later available, also consider these crops for visual review:

### `crops/cashflow-intake-billing-path.png`
- Capture both customer intake and job-complete-to-billing panels.
- Preserve labels: Where customer intake happens, Required Fields Validation, Customer Intake Captured, Job complete triggers the billing path, Missing details routed before invoice, On track for same-day billing.

### `crops/cashflow-handoff-diagram.png`
- Capture Field / Job Software → Clean Handoff Automated → Accounting Software plus exception side path.
- Preserve labels: Completed job missing details, Action Needed, Assigned to, Next steps.

### `crops/cashflow-money-leaks-digest.png`
- Capture the money-leak control section, including A/R Follow-Up Automation, Aging Buckets, Escalation Logic, Open Estimate Recovery, Office Exception Inbox, Weekly Money Leak Digest.
- Include bottom CTA strip: “Cash is the goal. Systems are how you get there.”

### `crops/cashflow-billing-source-scan.png`
- Capture Invoice-Ready Checklist, Technician Notes, Billing Source Scan, Blocker Detected, Routed to the right person.
- Preserve the scan-to-route relationship.

## Hard crop/use rules

- Crops are reference-only.
- Crops must never be imported into `app/**`, `components/**`, or `public/**` production UI as final visuals.
- If crops are added later, update the atlas with exact filenames and verify image type/dimensions.
- If source screenshot text is unreadable, mark it approximate and preserve the semantic role from the brief.
