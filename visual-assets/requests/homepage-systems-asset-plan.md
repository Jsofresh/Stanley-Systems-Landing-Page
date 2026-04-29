# Homepage Systems Asset Plan

Scope: Replace the old combined Recommended System section with two full premium visual sections:

1. Cashflow Control System
2. Customer Revenue System

References:

- `/home/jaden/.openclaw/workspace/project/software-factory/artifacts/homepage_redesign/reference-screenshots/recommended-system-reference-section.jpg`
- `/home/jaden/.openclaw/workspace/project/software-factory/artifacts/homepage_redesign/reference-screenshots/cashflow-control-system.jpg`
- `/home/jaden/.openclaw/workspace/project/software-factory/artifacts/homepage_redesign/reference-screenshots/customer-revenue-system.jpg`
- `/home/jaden/.openclaw/workspace/project/software-factory/artifacts/homepage_redesign/reference-screenshots/reference-analysis.md`

Principle: Codex should build the actual section structure with React, Tailwind, and SVG. Higgsfield should only create textless polish layers where generated artwork adds depth that plain CSS/SVG would not.

## Assets to generate

### 1. cashflow-green-cash-arrow

- Section: Cashflow Control System
- Purpose: premium green collected-cash arrow with a few floating bill shapes at the end of the Cashflow pipeline.
- Why Codex cannot or should not build directly: Codex can draw a simple SVG arrow, but the reference has richer polished cash/bill motion and glow. A small textless generated layer can add depth while Codex keeps the pipeline, nodes, labels, and cards editable.
- Needs transparency: yes, transparent PNG preferred.
- Intended final path: `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/public/images/generated/cashflow-green-cash-arrow.png`
- Can contain text: no. No letters, numbers, labels, fake text, or watermarks.
- DOM layering: Codex builds the pipe, final Collected Cash node, labels, and all cards. This asset sits behind or just to the right of the final DOM stage as a decorative foreground/background layer.
- Desktop/mobile: desktop and tablet. Hide or heavily simplify on mobile if it crowds the vertical flow.
- Rejection criteria: reject if it contains text/fake text, orange/amber/tan cast, dark background, people, random icons, messy cash piles, or stock-art style.

### 2. cashflow-leak-puddle

- Section: Cashflow Control System
- Purpose: small red warning leak/drip/puddle decoration used near Cashflow leak points.
- Why Codex cannot or should not build directly: Codex can draw red warnings and dashed connectors, but a small polished leak accent can help match the target screenshot without baking labels or structure into an image.
- Needs transparency: yes, transparent PNG preferred.
- Intended final path: `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/public/images/generated/cashflow-leak-puddle.png`
- Can contain text: no. No letters, numbers, labels, fake text, or watermarks.
- DOM layering: Codex builds all leak badges as DOM. This asset is a small decorative drip/puddle under selected pipe joints, placed behind/near SVG pipe segments.
- Desktop/mobile: desktop and tablet. Optional on mobile, can be hidden if vertical stepper gets crowded.
- Rejection criteria: reject if it is a chaotic money spill, looks like blood, has text, includes coins/charts/people, is too large, too realistic, or clashes with the premium light UI.

### 3. customer-revenue-green-arrow

- Section: Customer Revenue System
- Purpose: premium green right-pointing revenue arrow with a few floating bill shapes and subtle motion detail beside the outcome cluster.
- Why Codex cannot or should not build directly: Codex can build the flywheel and outcome badges with DOM/SVG, but the large polished reference arrow and bill detail benefits from a generated textless decorative layer.
- Needs transparency: yes, transparent PNG preferred.
- Intended final path: `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/public/images/generated/customer-revenue-green-arrow.png`
- Can contain text: no. No letters, numbers, labels, fake text, or watermarks.
- DOM layering: Codex builds outcome badges, labels, connector lines, CTAs, and support cards. This asset sits behind or beside the right-side outcome cluster as a visual momentum layer.
- Desktop/mobile: desktop and tablet. Hide on mobile if it competes with readable loop/outcome content.
- Rejection criteria: reject if text/fake text appears, it looks crypto/neon, stock-art-like, too 3D/cartoon, too busy, dark, orange, or hard to place behind DOM elements.

### 4. customer-revenue-flywheel-glow

- Section: Customer Revenue System
- Purpose: soft circular pale-green glow/ring layer behind the DOM-built flywheel nodes.
- Why Codex cannot or should not build directly: Codex can draw simple circles and arrows, but a subtle generated glow can add the premium dimensional feel in the target without baking structure or copy into the image.
- Needs transparency: yes, transparent PNG preferred.
- Intended final path: `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/public/images/generated/customer-revenue-flywheel-glow.png`
- Can contain text: no. No letters, numbers, labels, icons, fake text, or watermarks.
- DOM layering: Codex builds center hub, four nodes, labels, icons, arrows, trust badge, and outcome cluster. This asset sits behind those DOM/SVG elements as a low-contrast glow only.
- Desktop/mobile: desktop, tablet, and possibly mobile if it scales cleanly. Hide if it makes mobile cluttered.
- Rejection criteria: reject if it contains icons, labels, fake typography, dark background, orange/purple/neon glow, hard edges, or competes with DOM nodes.

## Assets not generated

### Cashflow pipe decoration

Decision: do not generate initially.

Reason: the pipe structure must align with five DOM stages and leak badges. Codex can build this more reliably with SVG/CSS. A generated pipe backplate would increase overlay alignment risk.

### Cashflow floating bills separate asset

Decision: do not generate separately.

Reason: floating bills should be included in `cashflow-green-cash-arrow` if usable. Separate bill clusters create extra placement and clutter risk.

### Customer Revenue connector glow

Decision: do not generate initially.

Reason: Codex can build dotted/dashed connector lines in SVG and keep them responsive.

### Customer Revenue floating bills separate asset

Decision: do not generate separately.

Reason: floating bills should be included in `customer-revenue-green-arrow` if usable.

### Full structural backplates

Decision: do not generate.

Reason: all important labels, cards, badges, nodes, CTAs, and responsive behavior must remain DOM/SVG. Backplates would create alignment risk, baked-in fake text risk, and mobile inflexibility.

## Required output notes

All approved assets must be inspected before use and documented in:

`/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/visual-assets/generated/homepage-systems-assets-manifest.md`

No overlay coordinate map should be required because no structural backplates are planned. If this remains true after generation, write:

`No overlay map required. Codex will build structural layout with SVG/CSS.`
