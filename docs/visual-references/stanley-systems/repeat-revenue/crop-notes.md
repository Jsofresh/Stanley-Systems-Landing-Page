# Repeat Revenue reference crop notes

Task: Card 1.3 — Repeat Revenue visual contract
Spec: `docs/specs/repeat-revenue-system-visual-contract.md`
Atlas: `docs/visual-references/stanley-systems/REFERENCE_ATLAS.md`

## Reference image status

Concrete Repeat Revenue PNG references now exist in this folder and under `../crops/`, generated from available Hermes cache Repeat Revenue video frames. See `../REFERENCE_ATLAS.md` for exact filenames, source paths, and crop coordinates.

The available media covers the Repeat Revenue hub-and-spoke loop/medallion style. Direct screenshots for every requested Repeat Revenue page subsection were not present, so some crop roles remain proxy references plus written targets.

## Crop targets

### `docs/visual-references/stanley-systems/crops/repeat-hero-step-card.png`

Target section: Repeat Revenue hero

Approximate crop intent:

- Isolate one hero flow step card from the right-side hero visual.
- Include the full medallion, icon, label, card radius, shadow, and any status/description treatment.
- Include a small slice of connector/arrow if it shows how steps attach.

Visual details to preserve:

- Pale green medallion with white ring/depth.
- Green icon centered inside medallion.
- Navy step label as DOM text in implementation.
- Premium white card surface with subtle border and soft shadow.
- No flat green circle.

Useful source copy candidates:

- Past Customer
- Review Proof
- Referral Offer
- New Call
- Booked Work

### `docs/visual-references/stanley-systems/crops/repeat-flow-row.png`

Target section: Repeat Revenue hero or referral section

Approximate crop intent:

- Isolate a complete horizontal repeat revenue flow row.
- Preferred hero crop: `Past Customer → Review Proof → Referral Offer → New Call → Booked Work`.
- Alternate referral crop: `Happy Customer → Referral Offer → We Track It → New Work Booked`.
- Alternate call catcher crop: `Missed Call Captured → Voicemail Transcribed → Office Alerted → Auto-Reply Sent`.

Visual details to preserve:

- Consistent medallion/icon treatment across all nodes.
- Green arrows or dotted connector treatment.
- Centered labels.
- Spacious rhythm; no cramped tiny pills.
- Flow should read as a business system, not a generic process diagram.

### `docs/visual-references/stanley-systems/crops/repeat-support-tile.png`

Target section: Support Layer

Approximate crop intent:

- Isolate one support-layer feature tile from the 12-tile grid.
- Include tile border/radius, icon treatment, title hierarchy, and surrounding spacing.

Visual details to preserve:

- Compact premium card.
- Green icon chip or small medallion.
- Navy feature title.
- White/off-white fill with soft border.
- Enough padding to feel deliberate.

Useful source copy candidates:

- Dedicated local-area-code text line
- A2P 10DLC setup
- STOP and UNSUBSCRIBE handling
- Weekly activity digest
- Voicemail transcription
- Office alerts

### `docs/visual-references/stanley-systems/crops/repeat-alert-panel.png`

Target section: Review Booster & Recovery Loop or Referral + Call Catcher

Approximate crop intent:

- Isolate the low-score feedback/recovery panel or office alert panel.
- Include the alert header, action/routing content, icon treatment, and card shape.

Visual details to preserve:

- Alert styling should be restrained and premium.
- Use navy/green as the default palette; red may only appear as a small semantic accent if unavoidable.
- No orange/amber alert treatment.
- Must feel like a routed recovery workflow, not an error-state dashboard.

Useful source copy candidates:

- Low-Score Feedback Alert
- Recovery When Needed
- Office Alerted
- Manager routing for low-score feedback
- No reviews are hidden.

## Crop generation rule once images arrive

When real target screenshots are available:

1. Save originals under `docs/visual-references/stanley-systems/repeat-revenue/originals/`.
2. Generate crops under `docs/visual-references/stanley-systems/crops/` using the exact filenames above.
3. Verify each crop is a valid PNG with `file`.
4. Update `REFERENCE_ATLAS.md` entries from “unavailable” to the actual image/crop filenames.
5. Do not import these crops into production components; they are docs/reference assets only.
