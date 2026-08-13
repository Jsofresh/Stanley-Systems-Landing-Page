# Stanley Component Foundry

> **LEGACY COMPONENT API — NOT DESIGN AUTHORITY.** This file documents historical components tied to obsolete package pages. Do not use its card-first grammar, old offer names, shadows, medallions, or page compositions as current style direction. Current visual authority is `/home/jaden/stanley-landing/DESIGN.md`. Existing components may remain for compatibility until a scoped implementation replaces them.

Scope: Homepage Section 5, Cashflow Control System page, and Repeat Revenue System page.

This document locks the shared component API for the Stanley Systems package/page foundry. Page files should compose these components and tokens instead of inventing new page-specific card shadows, buttons, medallions, underlines, headline styles, or diagram chrome.

## Import surface

Import from the barrel only:

```tsx
import {
  AlertPanel,
  DiagramPanel,
  DisplayHeadline,
  FeatureTile,
  FlowSequence,
  GreenUnderline,
  IconMedallion,
  MetricStrip,
  PremiumCard,
  RepeatRevenueFlowSlice,
  StanleyButton,
  StanleyIcon,
  SystemCTA,
  SystemPackageCard,
  SystemPageSection,
  stanleyIconNames,
  stanleySystemClassNames,
  stanleySystemColors,
  stanleySystemCssVars,
  stanleySystemFlow,
  stanleySystemRadii,
  stanleySystemShadows,
  stanleySystemSpacing,
  stanleySystemType,
  stanleySystemWidths,
} from '@/components/stanley-system'
```

Do not deep-import component internals from individual foundry files in page routes unless a refactor task explicitly allows it.

## Approved icon names

`StanleyIconName` is locked to:

- `check-circle`
- `dollar-circle`
- `file-estimate`
- `file-invoice`
- `message-bubble`
- `phone-missed`
- `shield-check`
- `trend-up`
- `users`
- `user`
- `gift`
- `referral-gift`

Use these names for `StanleyIcon`, `IconMedallion`, package cards, flow nodes, tiles, alerts, metrics, and CTAs. Do not paste arbitrary icon SVGs into page files for this scope. If a new icon is needed, add it to `StanleyIcon.tsx` and update this document in the same task.

## Component APIs

### `StanleyIcon`

Purpose: approved icon renderer backed by visual-kit primitives plus local gift/referral SVG.

Props:

```ts
type StanleyIconProps = Omit<VisualPrimitiveProps, 'children'> & {
  name: StanleyIconName
}
```

Example:

```tsx
<StanleyIcon name="file-invoice" size={42} ariaLabel="Invoice icon" />
```

Rules:

- Use an approved `name` only.
- Pass `ariaLabel` or `title` when the icon communicates meaning; omit both when it is decorative.
- Do not override icon palette in page files except for contained one-off state styling approved by the component owner.

### `IconMedallion`

Purpose: canonical Stanley circular icon medallion.

Props:

```ts
type IconMedallionSize = 'sm' | 'md' | 'lg' | 'xl'

type IconMedallionProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  icon: StanleyIconName
  size?: IconMedallionSize
  iconTitle?: string
  iconAriaLabel?: string
}
```

Defaults: `size="md"`.

Example:

```tsx
<IconMedallion icon="dollar-circle" size="lg" iconAriaLabel="Cashflow Control icon" />
```

Rules:

- Use this instead of hand-built round icon containers.
- Do not create new page-level medallion shadows, borders, radial backgrounds, or sizes.

### `GreenUnderline`

Purpose: canonical green accent underline for headline emphasis.

Props:

```ts
type GreenUnderlineProps = React.HTMLAttributes<HTMLSpanElement> & {
  underlineClassName?: string
  underlineOffsetClassName?: string
}
```

Example:

```tsx
<h2>
  Stop letting booked work <GreenUnderline>leak cash</GreenUnderline>
</h2>
```

Rules:

- Use only for major headline emphasis.
- Do not create alternate underline SVGs, brush strokes, highlights, or page-specific text decorations.

### `DisplayHeadline`

Purpose: canonical large page/section headline.

Props:

```ts
type DisplayHeadlineElement = 'h1' | 'h2' | 'h3'
type DisplayHeadlineAlign = 'left' | 'center'
type DisplayHeadlineSize = 'section' | 'page'

type DisplayHeadlineProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, 'children'> & {
  as?: DisplayHeadlineElement
  align?: DisplayHeadlineAlign
  size?: DisplayHeadlineSize
  before?: React.ReactNode
  highlight?: React.ReactNode
  after?: React.ReactNode
  children?: React.ReactNode
  underline?: boolean
  highlightClassName?: string
  underlineClassName?: string
}
```

Defaults: `as="h2"`, `align="center"`, `size="section"`, `underline={true}`.

Examples:

```tsx
<DisplayHeadline as="h1" size="page" align="left">
  Cashflow Control System
</DisplayHeadline>

<DisplayHeadline
  before="Turn missed follow-up into"
  highlight="booked work"
  after="without adding admin drag."
/>
```

Rules:

- Use for hero/page section headline scale in this scope.
- Do not invent page-specific clamp sizes, tracking, display font weights, or headline underlines.

### `StanleyButton`

Purpose: canonical Stanley CTA button for anchors and real buttons.

Props:

```ts
type StanleyButtonVariant = 'primary' | 'secondary' | 'quiet'
type StanleyButtonSize = 'md' | 'lg' | 'xl'

type StanleyButtonProps =
  | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement> & {
      variant?: StanleyButtonVariant
      size?: StanleyButtonSize
      showArrow?: boolean
      arrowLabel?: string
      children: React.ReactNode
    })
  | ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      variant?: StanleyButtonVariant
      size?: StanleyButtonSize
      showArrow?: boolean
      arrowLabel?: string
      children: React.ReactNode
    })
```

Defaults: `variant="primary"`, `size="lg"`, `showArrow={true}`, `arrowLabel="Go"`.

Examples:

```tsx
<StanleyButton href="/workflow-audit" size="xl">
  Book the Workflow Audit
</StanleyButton>

<StanleyButton type="button" variant="secondary" showArrow={false}>
  Compare systems
</StanleyButton>
```

Rules:

- Use this for all CTAs in the scoped pages/sections.
- Do not create page-local button shadows, hover states, arrow pills, border radii, or green button variants.

### `PremiumCard`

Purpose: base card shell for package, diagram, feature, support, alert, and metric surfaces.

Props:

```ts
type PremiumCardVariant = 'package' | 'diagram' | 'feature' | 'support' | 'alert' | 'metric'
type PremiumCardPadding = 'md' | 'lg' | 'xl'
type PremiumCardElement = 'article' | 'aside' | 'div' | 'li' | 'section'

type PremiumCardProps = React.HTMLAttributes<HTMLElement> & {
  as?: PremiumCardElement
  variant?: PremiumCardVariant
  padding?: PremiumCardPadding
  liftOnHover?: boolean
}
```

Defaults: `as="article"`, `variant="package"`, `padding="lg"`, `liftOnHover={false}`.

Example:

```tsx
<PremiumCard variant="diagram" padding="xl">
  <FlowSequence steps={steps} />
</PremiumCard>
```

Rules:

- Prefer higher-level foundry components first. Use `PremiumCard` when no specialized shell fits.
- Do not define new card shadows, repeated custom borders, or custom rounded-card treatments in page files.

### `FlowNode`

Purpose: one node in a horizontal/stacked system flow.

Props:

```ts
type FlowNodeTone = 'default' | 'emphasis' | 'quiet'

type FlowNodeProps = Omit<React.HTMLAttributes<HTMLElement>, 'title'> & {
  icon: StanleyIconName
  label: React.ReactNode
  description?: React.ReactNode
  step?: number | string
  tone?: FlowNodeTone
  iconTitle?: string
  iconAriaLabel?: string
}
```

Defaults: `tone="default"`.

Example:

```tsx
<FlowNode
  icon="file-invoice"
  label="Invoice sent"
  description="The payment request leaves with clean next-step context."
  step={1}
/>
```

Rules:

- Prefer `FlowSequence` for multi-step diagrams; use `FlowNode` directly only inside foundry-level components.
- Do not rebuild flow cards with ad hoc icon circles and arrows.

### `FlowSequence`

Purpose: canonical 4/5/6-step desktop flow with readable mobile stack and green connectors.

Props:

```ts
type FlowSequenceStep = Pick<
  FlowNodeProps,
  'icon' | 'label' | 'description' | 'tone' | 'iconTitle' | 'iconAriaLabel'
> & {
  id?: string
}

type FlowSequenceProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  steps: readonly FlowSequenceStep[]
  showStepNumbers?: boolean
  connectorLabel?: string
}
```

Defaults: `showStepNumbers={true}`, `connectorLabel="then"`.

Example:

```tsx
const cashflowSteps = [
  { id: 'estimate', icon: 'file-estimate', label: 'Estimate approved' },
  { id: 'invoice', icon: 'file-invoice', label: 'Invoice sent' },
  { id: 'reminder', icon: 'message-bubble', label: 'Reminder lands' },
  { id: 'paid', icon: 'dollar-circle', label: 'Payment collected', tone: 'emphasis' },
] satisfies FlowSequenceStep[]

<FlowSequence steps={cashflowSteps} connectorLabel="then" />
```

Rules:

- `steps.length` must be 4, 5, or 6.
- Do not create page-specific arrow connector systems.
- Keep all labels and descriptions as DOM text.

### `SystemPackageCard`

Purpose: reusable package card for Cashflow Control and Repeat Revenue entries.

Props:

```ts
type SystemPackageCardTone = 'cashflow' | 'repeat-revenue'

type SystemPackageCardProps = Omit<React.HTMLAttributes<HTMLElement>, 'title'> & {
  title: string
  subtext: string
  href: string
  ctaLabel?: string
  mainIcon: StanleyIconName
  accentIcon?: StanleyIconName
  steps: readonly FlowSequenceStep[]
  tone?: SystemPackageCardTone
  ctaProps?: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className' | 'href'>
}
```

Defaults: `ctaLabel="Learn more"`, `tone="cashflow"`; `accentIcon` defaults by tone in the component.

Example:

```tsx
<SystemPackageCard
  title="Cashflow Control System"
  subtext="Invoices, reminders, and payment follow-up move without manual chasing."
  href="/cashflow-control-system"
  mainIcon="dollar-circle"
  tone="cashflow"
  steps={cashflowSteps}
/>
```

Rules:

- Use approved offer names only: `Cashflow Control System` and `Repeat Revenue System`.
- Do not create alternate package-card layouts in pages.
- Do not bake CTA text or package labels into images.

### `RepeatRevenueFlowSlice`

Purpose: golden Repeat Revenue visual slice for the package/page system.

Props:

```ts
type RepeatRevenueFlowSliceProps = Omit<React.HTMLAttributes<HTMLElement>, 'title'> & {
  title?: string
  subtext?: string
  metric?: string
  metricDetail?: string
}
```

Defaults are built into the component.

Example:

```tsx
<RepeatRevenueFlowSlice
  title="Repeat revenue should move in a loop, not sit in a list."
  metric="More booked work from customers you already earned"
/>
```

Rules:

- Use as a reusable visual slice; do not duplicate its loop/grid treatment in page files.
- Text remains DOM text through props.

### `DiagramPanel`

Purpose: panel shell for diagrams, system explanations, and contained flows.

Props:

```ts
type DiagramPanelTone = 'default' | 'mint' | 'plain'

type DiagramPanelProps = Omit<React.HTMLAttributes<HTMLElement>, 'title'> & {
  as?: 'article' | 'aside' | 'div' | 'section'
  icon?: StanleyIconName
  title?: React.ReactNode
  subtitle?: React.ReactNode
  eyebrow?: React.ReactNode
  action?: React.ReactNode
  footer?: React.ReactNode
  tone?: DiagramPanelTone
  children: React.ReactNode
}
```

Defaults: `as="article"`, `tone="default"`.

Example:

```tsx
<DiagramPanel
  icon="shield-check"
  title="What the system controls"
  subtitle="The moving parts stay visible from estimate to paid invoice."
  tone="mint"
>
  <FlowSequence steps={cashflowSteps} />
</DiagramPanel>
```

Rules:

- Do not use `eyebrow` for public section eyebrow/kicker labels unless a spec explicitly requires it. Jaden dislikes generic eyebrow labels on the website.
- Use `action` for approved `StanleyButton` instances only.

### `SystemPageSection`

Purpose: page section wrapper with controlled background tone, width, headline, accent, and description.

Props:

```ts
type SystemPageSectionTone = 'warm' | 'white' | 'mint'
type SystemPageSectionWidth = 'page' | 'wide' | 'narrow'

type SystemPageSectionProps = Omit<React.HTMLAttributes<HTMLElement>, 'title'> & {
  title?: React.ReactNode
  accent?: React.ReactNode
  description?: React.ReactNode
  headerAlign?: 'left' | 'center'
  tone?: SystemPageSectionTone
  width?: SystemPageSectionWidth
  children: React.ReactNode
}
```

Defaults: `headerAlign="left"`, `tone="warm"`, `width="page"`.

Example:

```tsx
<SystemPageSection
  tone="white"
  width="page"
  title="The system keeps cash moving"
  accent="after the job is done"
  description="No new admin maze. Just the core follow-up path rebuilt so it stops leaking."
>
  <DiagramPanel>{/* ... */}</DiagramPanel>
</SystemPageSection>
```

Rules:

- Use this for major sections on the two system pages.
- Do not add page-local outer shells with unrelated `max-w-*`, background washes, or section spacing unless extending this component first.

### `MetricStrip`

Purpose: compact row/grid of metric cards.

Props:

```ts
type MetricStripItem = {
  value: React.ReactNode
  label: React.ReactNode
  description?: React.ReactNode
  icon?: StanleyIconName
}

type MetricStripProps = Omit<React.HTMLAttributes<HTMLElement>, 'children'> & {
  as?: 'aside' | 'div' | 'section'
  items: readonly MetricStripItem[]
  columns?: 2 | 3 | 4
}
```

Defaults: `as="aside"`, `columns={4}`.

Example:

```tsx
<MetricStrip
  columns={3}
  items={[
    { value: '24/7', label: 'Follow-up coverage', icon: 'message-bubble' },
    { value: '1 path', label: 'Estimate to paid', icon: 'file-invoice' },
    { value: 'Less drag', label: 'For the owner', icon: 'shield-check' },
  ]}
/>
```

Rules:

- Use for proof/support metrics, not decorative stat spam.
- Do not invent new metric card shadows or pill systems in page files.

### `AlertPanel`

Purpose: compact problem/recovery/notice panel.

Props:

```ts
type AlertPanelTone = 'attention' | 'recovery' | 'notice'

type AlertPanelProps = Omit<React.HTMLAttributes<HTMLElement>, 'title'> & {
  as?: 'aside' | 'article' | 'div'
  icon?: StanleyIconName
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  tone?: AlertPanelTone
  children?: React.ReactNode
}
```

Defaults: `as="aside"`, `icon="message-bubble"`, `tone="attention"`.

Example:

```tsx
<AlertPanel
  tone="attention"
  icon="phone-missed"
  title="Every missed handoff turns into a cash delay."
  description="The system exists to remove that delay before it becomes owner follow-up."
/>
```

Rules:

- Use `attention` for pain/loss, `recovery` for fixed-state messaging, and `notice` for neutral support.
- Do not build red/green alert boxes in page files.

### `FeatureTile`

Purpose: feature card with approved icon treatment.

Props:

```ts
type FeatureTileDensity = 'standard' | 'compact'

type FeatureTileProps = Omit<React.HTMLAttributes<HTMLElement>, 'title'> & {
  as?: 'article' | 'div' | 'li'
  icon: StanleyIconName
  title: React.ReactNode
  description?: React.ReactNode
  density?: FeatureTileDensity
  medallion?: boolean
}
```

Defaults: `as="article"`, `density="standard"`, `medallion={true}`.

Example:

```tsx
<FeatureTile
  as="li"
  icon="check-circle"
  title="Approved work moves forward"
  description="The next step is clear before the owner has to chase it."
/>
```

Rules:

- Use `FeatureTile` for benefits/capabilities.
- Use `density="compact"` for tight supporting lists.
- Do not invent custom feature icon cards inside page files.

### `StepCard`

Purpose: process step card with medallion, optional step number, metadata chip, and body slot.

Props:

```ts
type StepCardTone = 'default' | 'emphasis' | 'quiet' | 'success'

type StepCardProps = Omit<React.HTMLAttributes<HTMLElement>, 'title'> & {
  as?: 'article' | 'div' | 'li'
  icon: StanleyIconName
  title: React.ReactNode
  description?: React.ReactNode
  step?: number | string
  meta?: React.ReactNode
  tone?: StepCardTone
  children?: React.ReactNode
}
```

Defaults: `as="article"`, `tone="default"`.

Example:

```tsx
<StepCard
  as="li"
  step={2}
  icon="message-bubble"
  title="Follow-up lands automatically"
  description="The customer sees the next step before the invoice goes cold."
  tone="emphasis"
/>
```

Rules:

- Use for ordered process explanations that need more copy than `FlowNode`.
- Do not create new step badge/chip styles in page files.

### `SupportTile`

Purpose: compact support/proof tile.

Props:

```ts
type SupportTileProps = Omit<React.HTMLAttributes<HTMLElement>, 'title'> & {
  as?: 'article' | 'div' | 'li'
  icon: StanleyIconName
  title: React.ReactNode
  description?: React.ReactNode
  detail?: React.ReactNode
}
```

Defaults: `as="article"`.

Example:

```tsx
<SupportTile
  as="li"
  icon="shield-check"
  title="Owner-visible control"
  description="The moving pieces are legible without opening internal tools."
  detail="CONTROL POINT"
/>
```

Rules:

- Use for supporting details below a primary diagram/card.
- Keep `detail` short; it is an uppercase support label, not a section eyebrow.

### `SystemCTA`

Purpose: system-page CTA band with medallion and one/two approved buttons.

Props:

```ts
type SystemCTAAction = {
  label: React.ReactNode
  href: string
  ariaLabel?: string
}

type SystemCTAProps = Omit<React.HTMLAttributes<HTMLElement>, 'title'> & {
  as?: 'aside' | 'section' | 'div'
  icon?: StanleyIconName
  title: React.ReactNode
  description?: React.ReactNode
  primaryAction?: SystemCTAAction
  secondaryAction?: SystemCTAAction
  children?: React.ReactNode
}
```

Defaults: `as="aside"`, `icon="dollar-circle"`.

Example:

```tsx
<SystemCTA
  icon="shield-check"
  title="Want the leak fixed before it becomes another month of owner follow-up?"
  description="Start with the Workflow Audit."
  primaryAction={{ label: 'Book the Workflow Audit', href: '/workflow-audit' }}
  secondaryAction={{ label: 'See Repeat Revenue', href: '/repeat-revenue-system' }}
/>
```

Rules:

- Use for final/major CTAs on the two system pages.
- Do not create separate CTA card/button systems in page files.

## Token exports

The foundry exposes these token groups from `tokens.ts`:

- `stanleySystemColors`
- `stanleySystemRadii`
- `stanleySystemShadows`
- `stanleySystemWidths`
- `stanleySystemSpacing`
- `stanleySystemType`
- `stanleySystemCssVars`
- `stanleySystemFlow`
- `stanleySystemClassNames`

Rules:

- Foundry components should use tokens for shared colors, radii, shadows, widths, spacing, type, and flow styles.
- Page files may use exported layout helpers from `stanleySystemClassNames`; they should not introduce new visual-system constants.
- If a visual treatment is reusable, add/extend a foundry component or token. Do not hide it in a page route.

## Allowed page layout classes

Page files may use Tailwind classes for layout mechanics only:

- Display and positioning: `relative`, `absolute`, `isolate`, `overflow-hidden`, `grid`, `flex`, `block`, `hidden`, `items-*`, `justify-*`, `place-items-*`, `self-*`.
- Responsive grid/flex structure: `grid-cols-*`, `lg:grid-cols-*`, `sm:grid-cols-*`, `flex-col`, `flex-row`, `gap-*`, `space-y-*`.
- Sizing and shell mechanics: `w-full`, `max-w-*` only when matching `SystemPageSection`/token shell intent, `min-w-0`, `shrink-0`, `mx-auto`.
- Spacing between foundry components: `mt-*`, `mb-*`, `p*` only for page layout gaps, not for recreating card/button internals.
- Text flow helpers: `text-balance`, `text-pretty`, `sr-only`.
- Accessibility/DOM utilities: `aria-*`, `data-*`, semantic list/section/article tags.

When a page needs a repeated layout recipe, prefer adding a small foundry component or a `stanleySystemClassNames` token rather than duplicating a large class string.

## Disallowed page-specific styles

Page files in this scope may not invent or duplicate:

- New card shadows, lifted-card hovers, panel shadows, or metric-card shadows.
- New rounded card radii, border treatments, gradient shells, or glass effects.
- New button variants, arrow badges, CTA bands, hover states, or CTA sizing.
- New medallion/icon-circle treatments, icon palettes, or unapproved SVG icons.
- New underline/highlight/brush-stroke styles.
- New display headline clamp sizes, tracking, line-height, font weights, or hero/page heading systems.
- New process arrows, connector labels, flow-node cards, or diagram node chrome.
- New public section eyebrow/kicker labels unless specifically required by a brief.
- Baked-in text inside images or screenshots.
- Reference screenshots/images embedded in production.
- Stale public package names, including `Cash Flow Collection System`, `Cashflow Collection System`, `Customer Revenue System`, `Follow-Up System`, `Cash Collection System`, or `Customer Lifecycle System`.
- Internal/private tool language in public copy: Hermes, Codex, Stanley H, OpenClaw, n8n, QBO internals, HCP internals, secrets, or private implementation tools.
- Warm orange/amber/yellow/gold/sepia visual accents.

## Extension process

If a page needs a treatment not covered here:

1. Add or extend a component under `components/stanley-system/`.
2. Export it from `components/stanley-system/index.ts`.
3. Use existing visual-kit primitives and `tokens.ts` where applicable.
4. Keep all business copy and UI labels as DOM text.
5. Update this document with props, examples, and rules.
6. Run the required build/static checks for the task.

Do not solve reusable design needs by adding one-off page-level class systems.

## Minimal page composition example

```tsx
import {
  DiagramPanel,
  FeatureTile,
  FlowSequence,
  MetricStrip,
  SystemCTA,
  SystemPageSection,
  type FlowSequenceStep,
} from '@/components/stanley-system'

const steps = [
  { id: 'estimate', icon: 'file-estimate', label: 'Estimate approved' },
  { id: 'invoice', icon: 'file-invoice', label: 'Invoice sent' },
  { id: 'reminder', icon: 'message-bubble', label: 'Reminder lands' },
  { id: 'paid', icon: 'dollar-circle', label: 'Payment collected', tone: 'emphasis' },
] satisfies FlowSequenceStep[]

export function CashflowSection() {
  return (
    <SystemPageSection
      tone="white"
      title="The system keeps cash moving"
      accent="after the job is done"
      description="The handoff from approved work to paid invoice stops depending on owner memory."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
        <DiagramPanel title="Cashflow control path" tone="mint">
          <FlowSequence steps={steps} />
        </DiagramPanel>

        <div className="grid gap-4">
          <FeatureTile icon="shield-check" title="Owner-visible control" />
          <MetricStrip columns={2} items={[{ value: '1', label: 'clean path', icon: 'check-circle' }]} />
        </div>
      </div>

      <div className="mt-8">
        <SystemCTA
          title="Ready to stop chasing paid work manually?"
          primaryAction={{ label: 'Book the Workflow Audit', href: '/workflow-audit' }}
        />
      </div>
    </SystemPageSection>
  )
}
```
