# Stanley Systems pricing and visual icon context handoff

Use this file to start a fresh Hermes session without losing task context.

## Why this handoff exists

The Telegram session has grown too large because it includes repeated skill loads, Kanban task sheets, long file reads, build output, screenshot packet references, and several design QA loops. Hermes compression is configured correctly now, but the current session is already near the useful ceiling. Start a fresh session and point Stanley H here.

## Current repo

`/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page`

Live site: `https://stanley-systems.com`

PM2 app, not restarted yet: `stanley-landing`

## Kanban board

Board: `stanley-pricing-flow`

Latest observed state:
- done: 19
- running: 1
- todo: 28
- blocked: 0

Currently running:
- `t_e761060a` `qa-lead` `Post icon-fix visual QA and approval packet refresh`

Important: do not deploy until Jaden approves the refreshed approval packet.

## Latest user issue fixed

Jaden reported blank icon wells in:
- Money Leak Map
- Workflow Audit section
- Cash Flow Collection System
- Repeat Revenue System
- Repeat Revenue System

Root cause found: Stanley visual-kit display assets existed and were in the DOM, but native `loading="lazy"` delayed offscreen images during full-page/mobile screenshot capture, leaving pale/white blank wells in screenshots.

Changed:
- `components/visual-kit/display-assets/display-assets.tsx`

Specific change:
- Stanley display assets now use `loading="eager"` instead of conditional lazy loading.

Verification completed:
- `npm run build` passed.
- Local production preview on port 3145 returned HTTP 200.
- Rendered visual-kit images found: 32.
- Unloaded visual-kit images: 0.
- Vision verified no blank wells in fresh crops.

Fresh proof crops:
- `/tmp/stanley_icon_fix_verify/money-leak-map-workflow-audit.png`
- `/tmp/stanley_icon_fix_verify/cash-collection-system-1.png`
- `/tmp/stanley_icon_fix_verify/cash-collection-system-2.png`
- `/tmp/stanley_icon_fix_verify/follow-up-system-impact-loop.png`
- `/tmp/stanley_icon_fix_verify/follow-up-loop-cards.png`

## Naming and pricing direction

Approved public naming:
- Cash Flow Collection System
- Repeat Revenue System
- Repeat Revenue System
- Cash Flow Collection System
- Finished Work to Collected Cash where headline wording needs to be less mechanical

Do not use the free/no-cost Repeat Revenue System guarantee.
Approved commercial incentive:
- monthly plan: Workflow Audit price comes off the monthly plan
- yearly plan: double the Workflow Audit price comes off the yearly plan
- no stacking refund plus credit
- no invented dollar amounts until Jaden approves prices

## Current safety rules

- Do not deploy or PM2 restart without Jaden approving the refreshed packet.
- Do not start Stripe checkout implementation without approval.
- Do not remove Stanley Systems custom visual-kit primitive/display assets.
- Generic icons are acceptable only for tiny functional UI controls, not product/section visuals.
- Keep light mode only, no orange, no dark sections, deep navy text, Stanley green for positive outcomes, soft red for leaks/problems.
- Always write `Stanley Systems` in public copy.

## Helpful commands for a fresh session

```bash
hermes kanban --board stanley-pricing-flow stats --json
hermes kanban --board stanley-pricing-flow list | tail -20
hermes kanban --board stanley-pricing-flow show t_e761060a
hermes kanban --board stanley-pricing-flow tail t_e761060a --lines 120
```

Check compression config:

```bash
hermes config path
python3 - <<'PY'
import yaml, pathlib
p=pathlib.Path.home()/'.hermes/config.yaml'
data=yaml.safe_load(p.read_text()) or {}
print(data.get('compression'))
PY
```

Current compression config should be:
- threshold: `0.735294`
- roughly 200k tokens on 272k context

## Recommended next action in fresh session

1. Check `t_e761060a` completion.
2. If passed, send refreshed section screenshots to Jaden.
3. Ask for deploy approval only after Jaden can review the updated icons.
4. If approved, run build, restart `stanley-landing`, verify live routes.
