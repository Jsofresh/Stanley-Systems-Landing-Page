# Live copy and CTA verification

Run time: 2026-05-05T01:44:07+00:00
Task: t_4b90615b
Scope: live public copy and CTA behavior after deployed copy-fix.
Constraint followed: no deploy, no PM2 restart, no source edits.

## Decision

PASS. No objective live public-copy blocker remains for `/` or `/pricing` under this task's checks.

The prior blockers appear resolved live:
- `/pricing` now returns 200.
- Visible `/` and `/pricing` text contains no dollar amounts.
- Visible `/` and `/pricing` text contains no internal tool names checked.
- Visible guarantee language does not offer a free or no-cost Repeat Revenue System.
- CTAs route coherently to `/contact`, the calculator, or the phone link.

## Live routes checked

- `https://stanley-systems.com/`: 200
- `https://stanley-systems.com/pricing`: 200
- `https://stanley-systems.com/contact`: 200
- `https://stanley-systems.com/invoicing-delay-cash-flow-calculator`: 200

## Public copy checks

### Unsupported dollar amounts

PASS.

Rendered visible text dollar scan:
- `/`: none found.
- `/pricing`: none found.

### Approved naming

PASS, using the approved naming carried forward from the previous copy QA handoff:
- Workflow Audit: present.
- Cash Flow Collection System: present.
- Repeat Revenue System: present.
- Repeat Revenue System: present.
- Stanley Systems: present.

Standalone `Stanley` references not followed by `Systems` or `H`:
- `/`: 0.
- `/pricing`: 0.

### Internal tool names

PASS.

Visible `/` and `/pricing` text contained no public mentions of:
- Hermes
- Codex
- Stanley H
- OpenClaw
- n8n
- QBO
- HCP
- Twilio

### Free or no-cost Follow-Up guarantee

PASS.

Live guarantee copy found:
- `/`: "If Stanley Systems cannot find one clear money leak we can fix, qualified businesses get the audit fee back. See guarantee terms."
- `/pricing`: "If Stanley Systems cannot find one clear money leak we can fix, you get your Workflow Audit fee back."
- `/pricing`: "The refund applies to the Workflow Audit fee only. It does not include a system build."
- `/pricing`: "If the audit is refunded because no clear fix is found, there is no build credit."

Automated broad-pattern false positives reviewed and not classified as blockers:
- `/`: "follow-up are treated as free" appears in the bad-fit line about admin time, not a Repeat Revenue System guarantee.
- `/pricing`: "Is the Workflow Audit free? ... Can I buy Cash Flow Collection System or Repeat Revenue System" is FAQ adjacency in visible text, not a free Repeat Revenue System guarantee. The visible refund copy explicitly says it does not include a system build.

## CTA and contact-path checks

PASS.

Homepage CTA destinations:
- Book the Workflow Audit -> `/contact`
- Calculate your revenue leak -> `/invoicing-delay-cash-flow-calculator`
- Use the Revenue Calculator -> `/invoicing-delay-cash-flow-calculator`
- Find My Money Leaks -> `/contact`
- Find the Cash Stuck in Your Office -> `/contact`
- Call now -> `tel:+16179586372`

Pricing CTA destinations:
- Apply for the Workflow Audit -> `/contact`
- Calculate Your Revenue Leak -> `/invoicing-delay-cash-flow-calculator`
- Start with the Workflow Audit -> `/contact`
- Book the Workflow Audit -> `/contact`
- Call now -> `tel:+16179586372`

Additional behavior check:
- Pricing page nav button "Workflow Audit" was clicked in the browser and navigated to `https://stanley-systems.com/contact`.

Contact path coherence:
- `/contact` returns 200.
- Contact page headline is "Apply for the Workflow Audit."
- Contact page contains direct email, direct phone, and a required-field application form titled "Apply for the Workflow Audit."

## Artifacts saved

- `artifacts/kanban-overnight/live-copy-cta-results.json`
- `artifacts/kanban-overnight/home_visible.txt`
- `artifacts/kanban-overnight/pricing_visible.txt`
- `artifacts/kanban-overnight/contact_visible.txt`
- `artifacts/kanban-overnight/invoicing-delay-cash-flow-calculator_visible.txt`
- `artifacts/kanban-overnight/live-copy-cta-report.md`

## Notes

- No build was run.
- No PM2 process was restarted.
- No source files were edited.
- Repo already had unrelated dirty working-tree state before this verification. This run only added/updated artifacts under `artifacts/kanban-overnight/`.
