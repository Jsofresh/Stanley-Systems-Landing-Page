# Repeat Revenue System visual contract

Project: Stanley Systems — Homepage Section 5 + Cashflow Control System Page + Repeat Revenue System Page
Task: Card 1.3 — Repeat Revenue visual contract
Role: Reference Mapper
Source brief: `/home/jaden/.hermes/cache/documents/doc_83244fad04fc_message.txt`
Repo discovery handoff: `artifacts/stanley-section-5-system-pages/discovery/repo-route-primitive-audit.md`

## Reference status

The source brief says attached reference images exist for these Repeat Revenue sections:

- Repeat Revenue hero
- Referral opportunities / call catcher section
- Review Booster & Recovery Loop
- Past Customer Re-Engagement
- Support Layer Included

Those target reference images were not accessible in the repo docs/reference folders or under obvious Hermes cache attachment paths during this mapping pass. Existing older screenshots of current Stanley pages were found under `artifacts/**/repeat-revenue-*.png` and `/home/jaden/.hermes/cache/screenshots/`, but they appear to be prior live/local site captures, not the new target reference images from the brief. Do not use those older screenshots as the visual target unless the orchestrator explicitly promotes them.

Because target screenshots are unavailable, this contract uses the written reference/crop targets from the source brief as the visual source of truth.

## Canonical route

Use the existing intended repo route discovered by Card 0.1:

- Route: `/systems/repeat-revenue`
- Source file: `app/systems/repeat-revenue/page.tsx`
- Canonical metadata: `https://stanley-systems.com/systems/repeat-revenue`

Do not create duplicate `/repeat-revenue-system` routes unless Jaden or the orchestrator explicitly overrides discovery.

## Page purpose

The Repeat Revenue System page must make a service-business owner feel that past customers, reviews, referrals, and missed calls are not abstract marketing channels — they are already-paid-for revenue loops that can be systematized.

The page should sell the outcome:

- better public proof
- more repeat work from existing customers
- referral opportunities from happy customers
- faster recovery when feedback is poor
- more calls caught when reputation creates demand
- a support layer that handles SMS/compliance/alerting details without making the owner manage them manually

## Global visual language

- Large left/right hero composition.
- Deep navy headlines.
- Stanley green highlights.
- Curved green underlines under highlighted headline phrases.
- Soft off-white background.
- Pale green radial shapes in corners or behind major panels.
- White premium panels with subtle borders and soft layered shadows.
- Large pale-green icon medallions with white ring, inset highlight, and green icon.
- Flow cards and referral/review diagrams built natively in React/Tailwind.
- All important text must be DOM text.
- No screenshot embeds.
- No reference-image production imports.
- No dark mode.
- No orange/amber/yellow/gold/sepia styling.
- No people/robot/AI metaphor art.
- No generic SaaS dashboard clutter.

## Required page sections

### 1. Repeat Revenue hero

Required badge:

Repeat Revenue System

Required main headline:

Make your best customers your best lead generation.

Required subtext:

Stanley Systems helps service businesses bring past customers back, collect more useful feedback, turn happy customers into stronger public proof, create referral opportunities, and catch the extra calls that come from a stronger reputation.

Required primary CTA:

Book a Workflow Audit

Required secondary CTA:

See how Repeat Revenue works

Required hero flow:

Past Customer → Review Proof → Referral Offer → New Call → Booked Work

Required supporting visual ideas:

- Insights & automation keep the cycle going.
- More happy customers. More proof. More referrals. More booked work.
- Metric/proof strip:
  - +37% more booked work
  - Stronger reputation. Stronger pipeline.

Hero layout notes:

- Use a two-column desktop composition: left copy/CTA stack, right premium visual panel.
- The right panel should feel like a repeat-revenue engine, not a normal analytics dashboard.
- Flow should be visually prominent enough to be understood at a glance.
- Use 5 steps with green arrows or curved connector treatment.
- Place metric/proof strip as a compact premium strip under the flow or inside the hero visual panel.
- Mobile must stack copy first, visual second; flow must become readable vertical or two-column without overlap.

Primitive mapping:

- Badge/main hero medallion: `users` or `trend-up`.
- Past Customer: `user`.
- Review Proof: `message-bubble`.
- Referral Offer: minimal inline SVG gift/referral icon inside foundry if no approved primitive exists; otherwise use closest Stanley primitive.
- New Call: `phone-missed`.
- Booked Work: `check-circle` or `file-estimate`.
- Proof/metric strip: `trend-up`.

### 2. Referral + Call Catcher section

Required headlines:

Five-star moments turn into referral opportunities.

More demand only matters if the phone gets caught.

Required native flows:

Happy Customer → Referral Offer → We Track It → New Work Booked

Missed Call Captured → Voicemail Transcribed → Office Alerted → Auto-Reply Sent

Layout notes:

- Build as two large sibling premium flow panels on desktop.
- The referral panel should feel like a positive growth loop: soft mint, green connectors, confident proof/reward language.
- The call catcher panel should feel operational and immediate: phone signal, alert/status pill, voicemail/transcription cue, office action cue.
- Use dotted or arrow connector treatment where practical.
- Keep panel titles large and readable; do not compress steps into tiny pills.
- On mobile, stack panels and keep each flow readable with vertical arrows or two-column nodes.

Primitive mapping:

- Happy Customer: `user` or `users`.
- Referral Offer: foundry-owned inline SVG gift/referral mark if needed.
- We Track It: `trend-up`.
- New Work Booked: `check-circle` or `file-estimate`.
- Missed Call Captured: `phone-missed`.
- Voicemail Transcribed: `message-bubble`.
- Office Alerted: `message-bubble` with alert/status styling or foundry alert variant.
- Auto-Reply Sent: `message-bubble`.

### 3. Review Booster & Recovery Loop

Required headline:

More strong reviews. Faster recovery when something goes wrong.

Required content:

- Job Complete
- Feedback Request Sent
- Customer Shares Feedback
- Review Published
- Recovery When Needed
- Public Reviews That Build Trust
- Low-Score Feedback Alert
- Bottom feature tiles
- Note: No reviews are hidden.

Layout notes:

- Use a native loop/sequence that communicates feedback moving from job completion to public proof or recovery.
- A normal happy-path review card and a low-score recovery alert card should sit beside or below the flow.
- Alert styling should be restrained and only where the brief calls for low-score feedback/recovery.
- The note “No reviews are hidden.” must be real text and should feel like a trust-building compliance note, not a disclaimer footnote.
- Bottom feature tiles should support the loop without becoming a generic feature grid.

Primitive mapping:

- Job Complete: `check-circle`.
- Feedback Request Sent: `message-bubble`.
- Customer Shares Feedback: `user` or `message-bubble`.
- Review Published: `shield-check`, `check-circle`, or foundry-owned star/review mark if added.
- Recovery When Needed: `shield-check` plus alert panel treatment.
- Public Reviews That Build Trust: `shield-check`.
- Low-Score Feedback Alert: `message-bubble` or foundry alert variant.

### 4. Past Customer Re-Engagement

Required headline:

Past customers get followed up with before competitors win them.

Required content:

- Dormant Customer Records
- Re-Engagement Messages
- Re-Booked Work
- Benefit strip:
  - Works from your existing records.
  - Timed follow-up brings old customers back.
  - More value from customers you already earned.
  - Booked work without starting from zero.

Layout notes:

- Desktop target: three-column diagram or three major connected cards.
- The section should feel like dormant value being reactivated, not a cold outbound campaign.
- Use records/list visual on the left, message sequence in the middle, booked-work/proof outcome on the right.
- Benefit strip should be substantial and premium, not tiny metadata.
- Mobile stacks the three cards in order with clear connectors.

Primitive mapping:

- Dormant Customer Records: `users` or `user`.
- Re-Engagement Messages: `message-bubble`.
- Re-Booked Work: `check-circle` or `file-estimate`.
- Existing records benefit: `users`.
- Timed follow-up benefit: `message-bubble` or `trend-up`.
- More value benefit: `dollar-circle` or `trend-up`.
- Booked work benefit: `check-circle`.

### 5. Support Layer

Required headline:

The support layer is included.

Required subtext:

We handle the details that keep your Repeat Revenue System running smoothly—so your team can focus on happy customers and consistent growth.

Required feature grid:

- Dedicated local-area-code text line
- Main business number stays unchanged
- A2P 10DLC setup
- STOP and UNSUBSCRIBE handling
- Message throttling
- Weekly activity digest
- Configurable referral amounts
- Configurable timing and message copy
- Manager routing for low-score feedback
- Voicemail transcription
- Missed-call auto-reply
- Office alerts

Required final CTA strip headline:

Turn happy customers into a predictable source of repeat revenue.

Required final CTA:

Book a Workflow Audit

Required final secondary CTA:

See how Repeat Revenue works

Layout notes:

- The support layer should feel like the operational backend included with the system, not a legal/compliance appendix.
- Use a strong headline/subtext block, then a 12-tile feature grid.
- Feature tiles should be compact but premium: icon medallion or small icon chip, title text, maybe one short support phrase if the builder chooses.
- Grid target: 3 or 4 columns desktop; 2 columns tablet; 1 column or dense 2-column mobile only if readable.
- Final CTA strip must feel substantial and conversion-oriented, with green emphasis and enough whitespace.

Primitive mapping:

- Dedicated local-area-code text line: `message-bubble`.
- Main business number stays unchanged: `phone-missed` or simple phone foundry icon if added.
- A2P 10DLC setup: `shield-check`.
- STOP and UNSUBSCRIBE handling: `shield-check`.
- Message throttling: `message-bubble` or `trend-up`.
- Weekly activity digest: `file-estimate`.
- Configurable referral amounts: `dollar-circle`.
- Configurable timing and message copy: `message-bubble`.
- Manager routing for low-score feedback: `users` or `shield-check`.
- Voicemail transcription: `message-bubble`.
- Missed-call auto-reply: `phone-missed`.
- Office alerts: `message-bubble` with alert variant.

## CTA/link defaults

- Primary page CTA “Book a Workflow Audit” should use the current site/audit convention: `/#audit`, unless the implementation card discovers a stronger existing route convention.
- Secondary hero CTA “See how Repeat Revenue works” should scroll to the first explanatory section on the same page, e.g. `#repeat-revenue-system` or `#how-repeat-revenue-works`, using a stable in-page anchor chosen by the builder.
- Homepage Section 5 Repeat Revenue “Learn more” CTA should link to `/systems/repeat-revenue`.
- Preserve pricing/Stripe/payment links and package names; do not edit pricing source-of-truth in this visual build.

## Component foundry expectations

Page builders must compose from the shared foundry once created:

- `IconMedallion`
- `StanleyIcon`
- `DisplayHeadline`
- `GreenUnderline`
- `PremiumCard`
- `StanleyButton`
- `FlowNode`
- `FlowSequence`
- `SystemPackageCard`
- `DiagramPanel`
- `StepCard`
- `FeatureTile`
- `SupportTile`
- `MetricStrip`
- `AlertPanel`
- `SystemCTA`
- `SystemPageSection`

Page files may use layout classes. Page files may not invent new card shadows, CTA styles, medallion styles, underline styles, headline styles, or random colors. If a needed pattern does not exist, add it to the foundry first and render/review it before use.

## Hard visual rules

- Deep navy headline hierarchy must dominate.
- Stanley green highlight/underline must appear in hero and major section headline treatment.
- Flow diagrams must be native, visible, and useful — not decorative dots.
- Support layer grid is mandatory.
- Mobile readability is mandatory; no tiny flow labels.
- Cards must feel premium: generous padding, thick radius, soft border, layered soft shadow.
- Icon medallions need ring/depth; flat green circles fail.
- Keep exact required copy as DOM text.
- Use approved Stanley primitives where possible.
- Any new icon created for referral/gift/review must live in the foundry, not as ad hoc page-specific SVG clutter.

## Hard fails

- Page looks generic.
- Missing flow diagrams.
- Missing support grid.
- Required text baked into images.
- Reference screenshots/images embedded or imported in production UI.
- No green underline/headline treatment.
- Mobile unreadable.
- Inconsistent with component foundry.
- Orange/amber/yellow/gold/sepia styling.
- Dark mode.
- Page-specific style hacks that bypass foundry components.
- CTA paths missing or broken.
- Package names changed.
- Pricing or Stripe/payment code changed.

## Written crop targets for unavailable references

Use these as the substitute crop notes until real target reference images are accessible:

- `repeat-hero-step-card.png`: crop should isolate one hero flow step card with pale-green medallion, navy label, status/description if present, and green connector edge.
- `repeat-flow-row.png`: crop should isolate a full repeat-revenue flow row, ideally `Past Customer → Review Proof → Referral Offer → New Call → Booked Work`.
- `repeat-support-tile.png`: crop should isolate one support-layer feature tile showing icon treatment, card radius, padding, and title hierarchy.
- `repeat-alert-panel.png`: crop should isolate the low-score feedback/recovery or office alert panel, including restrained alert styling and routing/action language.

Create actual image crops under `docs/visual-references/stanley-systems/crops/` only after real target reference screenshots are available.
