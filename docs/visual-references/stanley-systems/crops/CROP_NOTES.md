# Stanley Systems Crop Notes

Source brief: `/home/jaden/.hermes/cache/documents/doc_83244fad04fc_message.txt`
Reference atlas: `docs/visual-references/stanley-systems/REFERENCE_ATLAS.md`

## Availability

Concrete PNG crops now exist for all requested crop filenames under `docs/visual-references/stanley-systems/crops/`. They were generated from the available Hermes cache media and current-homepage screenshots documented in `REFERENCE_ATLAS.md`.

Some crops are direct source crops; others are proxy crops because the cache did not include separate direct screenshots for every requested system-page subsection. Use `REFERENCE_ATLAS.md` as the authoritative filename/source/bounding-box inventory.

Do not use these crop descriptions as permission to embed screenshots in production. Reference images and crops belong in docs/artifacts only.

## Crop targets

### section-5-headline.png

Source target: Homepage Section 5 packages reference.

Approximate crop target:

- Top headline area only.
- Include the full headline `Systems that make money.`
- Include enough surrounding white/off-white space to judge centering and display scale.
- Include the green curved underline under `make money`.
- Exclude most of the package cards except maybe the top edge if needed for spacing context.

What to judge from crop:

- Headline scale: very large display, desktop roughly 72px–96px.
- Color split: `Systems that` deep navy, `make money` Stanley green.
- Underline shape: curved green mark, not border-bottom.
- Centering and premium whitespace.

### section-5-card.png

Source target: Homepage Section 5 packages reference.

Approximate crop target:

- One full package card, preferably Cashflow Control if only one card can be cropped.
- Include medallion, title, subtext, full flow row, and CTA button.
- Include a small amount of background around the card to judge shadow and radius.

What to judge from crop:

- Thick rounded corners.
- Subtle premium border and soft layered shadow.
- Generous padding.
- Title scale/weight.
- Flow readability.
- CTA size and button weight.

### section-5-button.png

Source target: Homepage Section 5 packages reference.

Approximate crop target:

- CTA button area from one package card.
- Include enough card background around the button to judge relative scale.
- Capture `Learn more` and arrow.

What to judge from crop:

- Large green button, desktop height roughly 64px–76px.
- Bold white text.
- Large arrow.
- Tasteful green shadow and hover-ready substantial feel.
- Button should not look like a small generic link.

### section-5-medallion.png

Source target: Homepage Section 5 packages reference.

Approximate crop target:

- Top icon medallion from one package card.
- Include surrounding card background.

What to judge from crop:

- Pale-green circular medallion.
- Outer white ring feel.
- Subtle inset/highlight.
- Soft shadow.
- Centered green icon.
- Icon size should feel large and intentional.

### section-5-flow-row.png

Source target: Homepage Section 5 packages reference.

Approximate crop target:

- Full four-step flow row from one card.
- Include icon nodes, labels, and arrows.
- Do not crop labels.

What to judge from crop:

- Four icon nodes.
- Green arrows between nodes.
- Centered labels below icons.
- No label overlap.
- Flow reads as a process, not random icons.

### repeat-hero-step-card.png

Source target: Repeat Revenue hero reference.

Approximate crop target:

- One prominent hero step card or node from the Repeat Revenue hero flow.
- Include enough neighboring space to judge card depth and flow relationship.

What to judge from crop:

- Native premium step-card treatment.
- Medallion/icon styling.
- Label readability.
- Green highlight/connector treatment.

### repeat-flow-row.png

Source target: Repeat Revenue flow references.

Approximate crop target:

- Full Repeat Revenue flow row.
- Include `Past Customer → Review Proof → Referral Offer → New Call → Booked Work` if using hero.
- For referral/call-catcher section, include one full flow panel.

What to judge from crop:

- Flow order is readable.
- Green arrows/connectors are intentional.
- Nodes are large enough.
- Copy is DOM-targeted and not image-only in implementation.

### repeat-support-tile.png

Source target: Repeat Revenue Support Layer reference.

Approximate crop target:

- One or two support-layer tiles plus surrounding grid context.
- Include tile title and any icon treatment.

What to judge from crop:

- Support tile is premium, not a generic checklist box.
- Icon medallion or small icon style matches foundry.
- Grid spacing is generous.
- Text remains readable at mobile-equivalent scale.

### repeat-alert-panel.png

Source target: Repeat Revenue Review Booster & Recovery Loop reference.

Approximate crop target:

- Low-score feedback alert / recovery panel.
- Include title, status, and enough surrounding context to judge restraint.

What to judge from crop:

- Alert is clear but not alarmist.
- No orange-heavy styling.
- Recovery logic is visible.
- Does not imply review suppression; `No reviews are hidden.` must remain part of section copy.

### cashflow-dashboard-card.png

Source target: Cashflow hero or dashboard references.

Approximate crop target:

- One full native dashboard card, preferably `Workflow Status`, `Invoice Performance`, or `Next Up`.
- Include header, main value/status, and surrounding panel context.

What to judge from crop:

- Card is native, clean, premium, and specific to cashflow.
- Does not look like a generic SaaS dashboard.
- Typography hierarchy is clear.
- White card and subtle shadow/border match Stanley visual language.

### cashflow-alert-card.png

Source target: Cashflow handoff/human exception or billing source scan reference.

Approximate crop target:

- `Action Needed`, `Blocker Detected`, or missing-detail exception panel.
- Include assigned-to/next-step/routing context if visible.

What to judge from crop:

- Human exception is obvious and actionable.
- Alert styling is restrained.
- No orange-heavy treatment.
- Routes the issue to the right person.

### cashflow-metric-strip.png

Source target: Cashflow hero metric strip reference.

Approximate crop target:

- Full metric strip from Cashflow hero.
- Include all metrics if possible:
  - `40%+ Faster time to invoice`
  - `25–35% Improvement in cash velocity`
  - `2–5 hrs/week Less office drag`
  - `100% Visibility across the flow`

What to judge from crop:

- Metrics are readable and balanced.
- Strip feels like proof, not clutter.
- Green/navy hierarchy matches Stanley palette.

### cashflow-flow-row.png

Source target: Cashflow hero or process sections.

Approximate crop target:

- Full six-step hero flow if possible:
  - `Customer Intake → Job Complete → Billing Ready → Invoice Sent → Followed Up → Cash Collected`
- If six-step flow is too wide, crop a 3–4 step segment and note continuation.

What to judge from crop:

- Multi-step flow remains readable.
- Connectors do not overlap.
- Mobile implementation needs alternate vertical/stacked treatment.
- Icons map to Stanley primitives.

## If reference images arrive later

1. Save original screenshots under one of:
   - `docs/visual-references/stanley-systems/section-5/`
   - `docs/visual-references/stanley-systems/repeat-revenue/`
   - `docs/visual-references/stanley-systems/cashflow-control/`
2. Create crops under:
   - `docs/visual-references/stanley-systems/crops/`
3. Use the exact filenames listed above.
4. Verify every crop with `file`.
5. Update `REFERENCE_ATLAS.md` to replace `not accessible in this run` with actual relative filenames.
6. Keep all reference images under docs/artifacts only; never import them into production components.
