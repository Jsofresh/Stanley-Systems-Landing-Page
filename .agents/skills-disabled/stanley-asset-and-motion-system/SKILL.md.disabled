---
name: stanley-asset-and-motion-system
description: Use when designing or editing Stanley Systems website sections that need icons, integration logos, motion primitives, Magic UI accents, or visual assets. Keeps Codex/Antigravity from using generic icon blobs, fake dashboards, or over-animated SaaS effects.
---

# Stanley Asset and Motion System

Use this skill for Stanley Systems website design work in Codex/Antigravity.

## Available packages in this repo

- `lucide-react` already installed: primary small UI icons and simple workflow symbols.
- `@tabler/icons-react` installed: larger icon set for service-business concepts, workflow, money, invoices, calendar, users, documents, and operations.
- `simple-icons` installed: real third-party brand SVGs for integrations such as QuickBooks, Google, Gmail, Stripe, HubSpot, Slack, etc. Use only when showing real tools/integrations.
- `motion-primitives` installed: refined motion primitives. Use for subtle premium transitions, disclosure, tabs, text/number changes, or scroll-state interactions.
- `magicui-cli` installed as a dev dependency: Magic UI registry access/installation helper. Use sparingly for accent components, not as the site’s overall look.
- `motion` and `framer-motion` already installed: existing animation stack.

## Stanley Systems visual rules

- Light mode only.
- Warm off-white canvas, navy text, Stanley green accents.
- Icons must feel practical, calm, and service-business friendly.
- Prefer line icons over filled cartoon illustrations.
- No generic AI blobs.
- No neon gradients.
- No loud purple/orange/amber.
- No fake dashboards unless Jaden explicitly asks.
- No random KPI cards just to fill space.
- No external media embeds.
- Animation should be smooth, restrained, and useful.
- Always respect reduced motion.

## Icon usage rules

### Lucide
Use for tiny UI details, nav, checkmarks, arrows, and simple status indicators.

Example:
```tsx
import { CheckCircle2, ArrowRight } from "lucide-react"
```

### Tabler Icons
Use when Lucide does not have the right business/service metaphor.

Good Stanley concepts:
- `IconReceipt2`, `IconFileInvoice`, `IconCash`, `IconPigMoney`
- `IconCalendarCheck`, `IconClipboardCheck`, `IconChecklist`
- `IconUsers`, `IconUserCheck`, `IconBriefcase`
- `IconTruck`, `IconTool`, `IconBuildingStore`
- `IconArrowsExchange`, `IconRoute`, `IconPlugConnected`

Example:
```tsx
import { IconFileInvoice, IconCalendarCheck } from "@tabler/icons-react"

<IconFileInvoice className="h-6 w-6 text-[#0F7B3F]" stroke={1.8} />
```

### Simple Icons
Use for real integration logos only. Do not invent unsupported integrations.

Example:
```tsx
import { siQuickbooks, siGmail } from "simple-icons"

function BrandIcon({ icon }: { icon: { path: string; title: string; hex: string } }) {
  return (
    <svg viewBox="0 0 24 24" aria-label={icon.title} className="h-5 w-5">
      <path d={icon.path} fill="currentColor" />
    </svg>
  )
}
```

Prefer rendering third-party brand icons in muted navy/green unless a brand-color logo is explicitly useful.

## Motion rules

Use motion for:
- fade/up reveal
- delayed prompt reveal
- subtle line/path animation
- number/count transitions
- tabs or disclosure transitions
- small hover state polish

Avoid:
- bounce
- parallax overload
- spinning/glowing widgets
- animated noise that hurts clarity
- anything that delays comprehension

Always include a reduced-motion fallback. If using Framer Motion:
```tsx
const shouldReduceMotion = useReducedMotion()
```

## Magic UI rules

Magic UI may be used for:
- subtle beams or border accents
- restrained background grids/dot patterns
- testimonial/logo marquee if later approved
- one supporting visual accent per section

Do not use Magic UI for:
- dark hero sections
- loud rainbow gradients
- AI SaaS grid clutter
- animated cards everywhere
- components that look unrelated to Stanley Systems

Note: `magicui-cli` is installed, but if the CLI has telemetry/auth issues, copy the component pattern manually from the Magic UI docs or registry and adapt it to Stanley tokens. Do not block the task on Magic UI CLI.

## Section workflow

For any website design task:
1. Read `DESIGN.md`.
2. Use `stanley-site-design-director`.
3. If homepage work, use `premium-homepage-section-workflow`.
4. Choose icons/assets from this skill.
5. Keep changes scoped to the requested section/component.
6. Run build/checks.
7. Use `stanley-visual-qa` for desktop/mobile screenshot verification.

## Recommended Antigravity prompt

```text
Use the Stanley Systems skills, DESIGN.md, and stanley-asset-and-motion-system. Use Lucide/Tabler/Simple Icons and restrained motion only where helpful. Keep the design warm, light, premium, and service-business clear. Do not use generic SaaS clutter.
```
