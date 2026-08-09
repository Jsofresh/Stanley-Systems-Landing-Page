# t_e2a0a760 public copy QA

Run time: 2026-05-05T00:50:34+00:00
Scope: no-deploy QA pass for current homepage/pricing funnel after icon fix.
Repo: /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page

## Method

No source edits were made.

Checks run:
- Read Stanley site instructions and Stanley Systems copy/GTM context.
- Started local Next dev server on http://127.0.0.1:3107 to render the current working tree.
- Rendered visible body text and page HTML for:
  - local /: 200
  - local /pricing: 200
  - live /: 200
  - live /pricing: 404
- Scanned source text in app, components, and lib/pricing, excluding app/api, app/dev, app/remotion, and remotion.
- Saved machine outputs:
  - artifacts/kanban-speedup/render-results.json
  - artifacts/kanban-speedup/source-scan.json
  - artifacts/kanban-speedup/local_home.txt
  - artifacts/kanban-speedup/local_pricing.txt
  - artifacts/kanban-speedup/live_home.txt
  - artifacts/kanban-speedup/live_pricing.txt

## Summary decision

BLOCKERS FOUND for final public funnel readiness.

1. Live /pricing is not public yet. The current working tree renders /pricing locally with status 200, but https://stanley-systems.com/pricing returns 404.
2. Homepage visible copy still contains unsupported-looking dollar amounts. These violate the task guardrail of no invented dollar amounts unless Jaden has approved them elsewhere.

No source edits were made because the task requested a no-deploy QA report and asked to avoid editing unless absolutely necessary.

## Naming checks

Approved naming appears in current local rendered/page-source text across the funnel:
- Cash Flow Collection System: present.
- Repeat Revenue System: present.
- Repeat Revenue System: present.
- Cash Flow Collection System: present on homepage and in source. It is not visible on local /pricing body text, but local /pricing still uses Cash Flow Collection System and Repeat Revenue System correctly.
- Stanley Systems: present.

No visible standalone "Stanley" references were found in local homepage, local pricing, or live homepage body text.

## Internal tool-name checks

Visible rendered text checks found no public mentions of:
- Hermes
- Codex
- Stanley H
- OpenClaw
- n8n
- QBO
- HCP
- Twilio

Source scan note: one unmounted visual-kit mini-feature component contains "Stanley step":
- components/visual-kit/mini-features/workflow-proof-mini.tsx:25

I did not classify that as a funnel blocker because it did not appear in the local or live rendered homepage/pricing text captured for this task.

## Follow-Up guarantee check

No free/no-cost Repeat Revenue System guarantee was found in visible local pricing, visible local homepage, or live homepage text.

Automated regex note: this unrelated line matched a broad "Follow-Up near free" pattern:
- components/best-fit-section.tsx:45: "Admin time, billing delays, and missed follow-up are treated as free."

I do not classify it as the prohibited guarantee because it refers to admin time being treated as free, not a free/no-cost Repeat Revenue System guarantee.

## Blocker 1: live pricing route is 404

Evidence:
- local /pricing: 200
- live /pricing: 404

Source route exists:
- app/pricing/page.tsx:1-25

Captured files:
- artifacts/kanban-speedup/local_pricing.txt
- artifacts/kanban-speedup/live_pricing.txt

Impact:
- The current public pricing funnel cannot pass live public-copy QA because the pricing page is absent from production.

## Blocker 2: invented/unsupported dollar amounts in homepage funnel

These amounts appeared in local rendered homepage body text:
- $3,000
- $25,000
- $3,250
- $7,500
- $50K-$300K
- $650
- $2,500

These amounts appeared in live homepage body text:
- $3,000
- $25,000
- $3,250
- $7,500
- $50K-$300K

Exact source references in the current homepage funnel:

- components/calculator-path-section.tsx:144
  - "$3,000 to $25,000+"

- components/how-it-works-section.tsx:43
  - "$3,250" at risk

- components/how-it-works-section.tsx:44
  - "$7,500" waiting

- components/pricing-section.tsx:275
  - "$50K-$300K" re-engageable revenue worth checking

- components/best-fit-section.tsx:21
  - "At $650 each, that is $3,250 in cash movement waiting on the office."

- components/best-fit-section.tsx:29
  - "At $2,500 each, that is $7,500 in quoted work waiting for a next step."

Impact:
- These look like illustrative or invented dollar amounts unless a current approved source exists. The task explicitly says no invented dollar amounts, so this is a blocker.

## Non-blocking notes

- Live homepage returns 200 and contains the approved current naming terms.
- Local current working tree renders /pricing correctly, but production does not.
- The repo was already dirty before this QA pass. I only added artifacts under artifacts/kanban-speedup/.

## Recommended next action

Have the implementation agent make a scoped copy pass before deploy:
1. Remove or qualify the homepage dollar figures listed above, unless Jaden approves those exact numbers.
2. Keep approved naming unchanged: Cash Flow Collection System, Repeat Revenue System, Repeat Revenue System, Cash Flow Collection System.
3. Build and deploy only after the copy blockers are resolved.
4. Verify live / and /pricing both return 200 and contain no unsupported dollar amounts or internal tool names.
