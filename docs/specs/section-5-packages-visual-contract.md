# Section 5 Packages Visual Contract

Project: Stanley Systems — Homepage Section 5 + Cashflow Control System Page + Repeat Revenue System Page
Task: 1.1 Section 5 visual contract
Role: Reference Mapper
Source brief: `/home/jaden/.hermes/cache/documents/doc_83244fad04fc_message.txt`
Discovery handoff: `artifacts/stanley-section-5-system-pages/discovery/repo-route-primitive-audit.md`

## Scope

This contract is for the new homepage Section 5 packages section only.

Purpose: Section 5 exists to make visitors click `Learn more` on one of the two systems.

Builders must implement the section in native React/Tailwind. Do not embed screenshots, do not import reference images into production, and do not bake important text into images.

## Route decisions

The source brief defaulted to `/cashflow-control-system` and `/repeat-revenue-system` unless the repo already has better intended routes.

The repo discovery task found existing canonical system routes. Use these:

- Cashflow Control System Learn more: `/systems/cashflow-control`
- Repeat Revenue System Learn more: `/systems/repeat-revenue`

Do not create duplicate `/cashflow-control-system` or `/repeat-revenue-system` routes unless Jaden explicitly asks later.

Recommended homepage insertion point:

- File: `app/page.tsx`
- Insert after `<WorkflowAuditMechanismSection />`
- Insert before `<Phase3HomepageSections />`

## Exact required copy

Headline:

```text
Systems that make money.
```

Headline treatment:

- `Systems that` in deep navy.
- `make money` in Stanley green.
- Green curved underline under `make money`.
- Centered.
- Very large display headline.
- Desktop target: roughly 72px–96px depending on fit.
- Mobile must scale cleanly without broken line breaks.

Left package card:

```text
Cashflow Control System
Turn finished work into collected cash faster.
Job Complete → Billing Ready → Invoice Sent → Cash Collected
Learn more
```

Right package card:

```text
Repeat Revenue System
Make your best customers your best lead generation.
Past Customer → Review Proof → Referral Offer → Booked Work
Learn more
```

The text above must be real DOM text.

## Section layout contract

Desktop:

- White or soft off-white full-width section background.
- Very subtle background corner/radial shapes only.
- Large centered display headline above the cards.
- Two large symmetric package cards in a side-by-side grid.
- Cards should feel substantial, premium, and clickable, not like generic SaaS pricing cards.
- Cards need generous internal padding and visible white space.
- Each card should have a large pale-green circular medallion near the top.
- Each card includes title, one-sentence subtext, four-step flow row, and large green CTA.
- The flow row should read left to right with green arrows between icon nodes.
- Labels belong under or near each node and must be centered/readable.
- CTAs should align visually across the two cards.

Mobile:

- Stack the two cards vertically.
- Preserve headline strength without forcing awkward wraps.
- Flow rows must become readable; use vertical or 2-column treatment if needed.
- Arrows must not overlap labels or wrap randomly.
- CTAs must remain large and thumb-friendly.
- No cramped mobile spacing.

## Visual language

Use the existing Stanley site palette and visual-kit conventions:

- Deep navy typography: `#071422`, `#0B1F33`, `#102033`, or existing equivalent.
- Stanley green: `#15803D` or visual-kit green equivalents.
- Green hover/deep: `#116832` where needed.
- Pale green: `#eef9f2`, `#f4fbf5`, `#eaf6e6`, or equivalent.
- Background: white, soft off-white, or `#f7f7f4` style.
- Card fill: white or soft white.
- Border: subtle neutral or green-tint border.
- Shadows: soft layered premium shadows; no heavy black shadow.
- Corners: thick rounded corners.
- Buttons: large green rounded rectangles/pills with bold white text, large arrow, and tasteful green shadow.

Do not use:

- Dark mode.
- Orange/amber/yellow/gold/sepia styling.
- Generic dashboard/icon stacks.
- People/robots/AI metaphors.
- Baked-in raster text.
- Screenshot-backed UI.

## Component/foundry expectations

This section should be composed from the Stanley component foundry once built. Page files may use layout classes only. Page files must not invent new card shadows, CTA styles, medallion styles, underline styles, or headline styles.

Expected foundry components:

- `DisplayHeadline`
- `GreenUnderline`
- `PremiumCard`
- `IconMedallion`
- `StanleyIcon`
- `FlowSequence`
- `FlowNode`
- `SystemPackageCard`
- `StanleyButton`

If a needed visual pattern is missing, add or patch it in the foundry first, then use it here.

## Primitive mapping

Primitive source: `components/visual-kit/primitives/` or barrel exports from `components/visual-kit`.

All required primitives were confirmed available by discovery:

- `check-circle` → `CheckCircle`
- `dollar-circle` → `DollarCircle`
- `file-estimate` → `FileEstimate`
- `file-invoice` → `FileInvoice`
- `message-bubble` → `MessageBubble`
- `phone-missed` → `PhoneMissed`
- `shield-check` → `ShieldCheck`
- `trend-up` → `TrendUp`
- `users` → `Users`
- `user` → `User`

Left card: Cashflow Control System

- Main medallion icon: `shield-check` or `dollar-circle`
- `Job Complete`: `check-circle`
- `Billing Ready`: `file-invoice`
- `Invoice Sent`: `message-bubble` or nearest send-like treatment
- `Cash Collected`: `dollar-circle`

Right card: Repeat Revenue System

- Main medallion icon: `users`
- `Past Customer`: `user`
- `Review Proof`: `message-bubble`
- `Referral Offer`: closest Stanley primitive, or a minimal inline SVG gift/referral icon inside the foundry if no primitive exists
- `Booked Work`: `check-circle` or `file-estimate`, depending on fit

## CTA tracking and route conventions

Use `CTALink` if the final component supports it cleanly.

Recommended tracking from discovery:

Cashflow Learn more:

- `href="/systems/cashflow-control"`
- `kind="systems"`
- `analyticsEvent="package_learn_more_clicked"`
- `location="home_section_5_cashflow_control"`
- `packageName="Cashflow Control System"`

Repeat Revenue Learn more:

- `href="/systems/repeat-revenue"`
- `kind="systems"`
- `analyticsEvent="package_learn_more_clicked"`
- `location="home_section_5_repeat_revenue"`
- `packageName="Repeat Revenue System"`

## Reference image availability

The source brief says attached reference images should be used, including a Section 5 packages reference. In this worker run, no named attached reference images for the Section 5 packages target were accessible at the expected repo/docs paths.

Because no Section 5 reference image file was available to crop, builders should follow the written crop targets in `docs/visual-references/stanley-systems/crops/CROP_NOTES.md` and the visual requirements in this contract.

Existing cached browser screenshots under `/home/jaden/.hermes/cache/screenshots/` appear to show broader Stanley Systems landing pages and current/reference-like site pages, not a named isolated Section 5 screenshot with the exact `Systems that make money.` headline. They were not copied into production and should not be used as production assets.

## Hard visual rules

- The section must be native React/Tailwind, not an image embed.
- Important text must be DOM text.
- Use approved Stanley primitives or minimal foundry-contained inline SVG only when a required primitive does not exist.
- Keep the section visually calm, premium, spacious, and sales-directed.
- The headline must dominate the section.
- The green underline must be curved/intentional, not a basic border-bottom.
- Package cards must feel like high-value system choices, not ordinary pricing blocks.
- Medallions must have depth: pale-green fill, outer white ring feel, subtle inset/highlight, soft shadow.
- Flow nodes need readable labels and intentional arrows.
- Buttons must feel large and worth clicking.
- Mobile readability is a first-class requirement.

## Hard fails

Fail the implementation if any of these are present:

- Screenshot embedded in production.
- Reference PNG/JPG/WebP imported into a production component.
- Important text hidden in images.
- Generic card block with weak visual hierarchy.
- Weak headline scale.
- Missing green underline under `make money`.
- CTA too small or visually secondary.
- Flat icon circles with no ring/depth.
- Page-specific generic icon library use where Stanley primitives exist.
- Orange/amber/yellow/gold/sepia styling.
- Dark mode treatment.
- Cramped or unreadable mobile layout.
- Flow labels overlap or arrows wrap awkwardly.
- Wrong package names.
- Wrong routes when repo canonical routes are known.
- Pricing/Stripe/payment changes.
- Unrelated homepage section changes.

## Acceptance checklist

- `Systems that make money.` exists as DOM text.
- `make money` is Stanley green and underlined with a curved green mark.
- Two cards exist: `Cashflow Control System` and `Repeat Revenue System`.
- Both one-sentence subtexts match this contract exactly.
- Both four-step flow labels match this contract exactly.
- Both CTAs say `Learn more`.
- Cashflow CTA routes to `/systems/cashflow-control`.
- Repeat Revenue CTA routes to `/systems/repeat-revenue`.
- Uses Stanley foundry components rather than one-off page styling.
- Uses approved visual primitives or foundry-contained fallback SVG.
- No reference screenshots/images are embedded in production.
- Desktop screenshot captured around 1600x900 or 1728x972 once implemented.
- Mobile screenshot captured around 390x844 once implemented.
- Blind visual judge score target: desktop 8.5/10 or higher; mobile usability 8/10 or higher.
