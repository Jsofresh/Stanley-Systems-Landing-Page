# Fidelity Pass Assets Manifest

Date: 2026-04-29
Task: Systems homepage visual fidelity pass

## Generation status

New Higgsfield generation attempt during this pass was blocked by the remote MCP endpoint returning HTTP 403 from the direct controller call. To avoid stalling the autonomous production task, this pass reused earlier Higgsfield-generated assets from the same systems asset workflow, then cleaned them into public WebP assets with alpha.

The new request files for the desired asset classes were still written under:
`/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/visual-assets/requests/`

Request files:
- `fidelity-cashflow-pipeline-layer.request.md`
- `fidelity-cashflow-leak-accents.request.md`
- `fidelity-cashflow-collected-cash-arrow.request.md`
- `fidelity-revenue-flywheel-glow-ring.request.md`
- `fidelity-revenue-output-arrow.request.md`

## Approved public assets

### 1. Cashflow payoff arrow
Public path:
`/images/generated/fidelity-cashflow-payoff-arrow.webp`

Source:
`visual-assets/generated/fidelity-pass/fidelity-cashflow-arrow-source.png`

Original Higgsfield job:
`a0691cdf-be65-44b7-9f6a-841f2661a51f`

Use:
Decorative textless right-side payoff layer in Cash Flow Collection System main visual card. Place behind/near the DOM final pipeline node. Do not place copy on the image.

QA:
- Textless: yes.
- Conceptually useful: yes.
- Original had baked checkerboard/fake transparency risk.
- Cleaned to alpha WebP and cropped for public use.

### 2. Customer Revenue output arrow
Public path:
`/images/generated/fidelity-revenue-output-arrow.webp`

Source:
`visual-assets/generated/fidelity-pass/fidelity-revenue-arrow-source.png`

Original Higgsfield job:
`85f9a597-e58d-43ee-9cd8-11f812d4e86b`

Use:
Decorative textless right-side output/revenue layer in Repeat Revenue System main visual card. Place behind/near DOM outcome cluster.

QA:
- Textless: yes.
- Conceptually useful: yes.
- Original had baked checkerboard/fake transparency risk.
- Cleaned to alpha WebP and cropped for public use.

### 3. Customer Revenue flywheel glow
Public path:
`/images/generated/fidelity-revenue-flywheel-glow.webp`

Source:
`visual-assets/generated/fidelity-pass/fidelity-revenue-flywheel-glow-source.png`

Original Higgsfield job:
`ade987d4-ecb8-4cef-834c-9741e4f2108b`

Use:
Low-contrast decorative background layer behind the Customer Revenue flywheel. DOM/SVG nodes, arrows, and text remain on top.

QA:
- Textless: yes.
- Clean alpha WebP: yes.
- Very subtle after cleanup, so Codex should supplement with CSS radial gradients and SVG arcs.

## Rejected assets

### Cashflow leak source
Source:
`visual-assets/generated/fidelity-pass/fidelity-cashflow-leak-source.png`

Original Higgsfield job:
`c59c3606-c970-4d14-8d8e-981a08e9ca8d`

Decision: rejected.

Reason:
It was textless, but too cartoonish and too red/blood-like for the premium page. Codex should build leak accents with controlled DOM/CSS/SVG shapes instead.

## DOM/copy rule

All meaningful section copy must remain DOM text. These assets are decorative only.
