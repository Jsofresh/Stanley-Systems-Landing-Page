# Homepage Revenue Leak + Systems UI Reference Audit

Scope: audit strong public-site sections before rebuilding the Stanley Systems homepage Revenue Leak CTA/report preview and Systems that Move Money product-suite section. Reference screenshots are local evidence only; implementation is custom Stanley Systems copy, colors, icons, and offer logic.

## 1. ServiceTitan — product-suite cards

Screenshot: `/home/jaden/.hermes/cache/screenshots/browser_screenshot_d12105234d7a464b86618c4b3ec9eb3e.png`

- Spacing: generous chapter break after the hero; centered heading; two wide cards with controlled gutter and bottom-anchored content.
- Density: intentionally low. One title, one paragraph, one CTA per card. Minimal competing elements.
- Hierarchy: section headline first, card title second, copy third, outlined CTA fourth.
- Card structure: large white cards, subtle border, rounded corners, bottom-aligned text/CTA; segmentation is obvious without visual noise.
- CTA treatment: card CTAs are wide but outlined/exploratory; main conversion remains elsewhere.
- Motion restraint: product cards read static; carousel behavior is reserved for a separate section.
- Stanley extraction: use two first-class product cards, but make them denser with real flow previews so they do not feel empty or toy-like.

## 2. Stripe — product grid/report-card system

Screenshot: `/home/jaden/.hermes/cache/screenshots/browser_screenshot_43f1c12679fa49f1b1981eb4676e346e.png`

- Spacing: airy but grid-disciplined; headline and subcopy form a clean editorial intro before the product modules.
- Density: medium-low; many product paths are present but each card stays sparse and scannable.
- Hierarchy: one dominant large card anchors the grid; smaller cards behave like supporting paths.
- Card structure: thin borders, pale backgrounds, top-left title, top-right affordance, optional embedded UI mockup.
- CTA treatment: restrained corner/link affordances keep repeated CTAs from making the grid noisy.
- Motion restraint: vivid visuals imply energy without relying on aggressive animation.
- Stanley extraction: build the calculator CTA as a static report interface with top header, internal metric cards, and restrained CTA rather than a homepage form.

## 3. Linear — dense product UI inside calm page spacing

Screenshot: `/home/jaden/.hermes/cache/screenshots/browser_screenshot_c7e8b0a54cad4d4795896e55c04f51c4.png`

- Spacing: large page-level breathing room; tight but precise spacing inside the product mockup.
- Density: high inside the UI card, low around it. This contrast makes complexity feel capable instead of messy.
- Hierarchy: bright title/actions, muted metadata, small status dots, floating action panel for current workflow.
- Card structure: layered dark surfaces, thin dividers, small labels, status pills, believable product fragments.
- CTA treatment: calm header/final CTAs; product credibility does most of the selling.
- Motion restraint: staged product UI appears mostly static; no distracting movement required.
- Stanley extraction: make the new sections feel like believable operations UI fragments: rows, statuses, flow states, final highlighted outcome.

## 4. Shopify — proof/report canvas

Screenshot: `/home/jaden/.hermes/cache/screenshots/browser_screenshot_2172caecba03464e9ca0c6cf5315c424.png`

- Spacing: very generous vertical whitespace; proof points distributed like an editorial report canvas.
- Density: low, but major metrics get scale and importance.
- Hierarchy: large section claim, then metric proof, then support/testimonial details.
- Card structure: subtle translucent proof cards, fine borders, large metric typography.
- CTA treatment: mostly inline/contextual in the proof section; avoids CTA fatigue.
- Motion restraint: typography, color, and layout carry the section; no visible aggressive animation.
- Stanley extraction: use a large sample money number as the report preview anchor, then a clear primary CTA to run the real calculator.

## Stanley implementation rules from the audit

- Use off-white backgrounds, white cards, thin pale-green borders, navy text, Stanley green accents.
- Keep the calculator homepage section non-functional: report preview only, no inputs, no state, no duplicated calculator formulas.
- Use visible Stanley display primitives for product/section concept visuals.
- Make product-suite cards tighter than ServiceTitan’s empty cards by adding slim product flows and compact outcome chips.
- Use one obvious CTA in the calculator preview: `Find the Revenue Leaks` to `/invoicing-delay-cash-flow-calculator`.
- Frame Workflow Audit as the next step after the calculator, not the main CTA in the calculator preview.
- Keep motion minimal and non-essential.
