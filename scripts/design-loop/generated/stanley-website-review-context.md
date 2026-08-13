# Stanley Website Review Context

Generated for Full-Context Smart Vision Reviewer from the current canonical design source and current shared Stanley Systems context.

IMPORTANT SOURCE BOUNDARY: DESIGN.md controls visual style only. The current approved task brief and shared offer/copy context control words, offers, pricing, claims, routes, and funnel logic. The live website is not a content source.
Generated at: 2026-08-04T15:26:53.736Z


---

## Canonical visual source: /home/jaden/stanley-landing/DESIGN.md

---
version: 1.0.0
name: Stanley Systems Live Website Visual System
description: Image-first, interactive Stanley Systems website style modeled on the current live site. Visual authority only; never a source for public copy, offers, pricing, claims, or routes.
colors:
  primary: "#15803D"
  secondary: "#071422"
  canvas: "#FBFCF7"
  canvasSoft: "#F5F9F2"
  surface: "#FFFFFF"
  ink: "#071D3A"
  inkOnDark: "#F8FAFC"
  muted: "#536173"
  mutedOnDark: "#C1C9D4"
  border: "#D5E5DA"
  borderDark: "#334155"
  stanleyGreen: "#15803D"
  stanleyGreenDark: "#116832"
  stanleyGreenBright: "#53D986"
  stanleyGreenSoft: "#E9F8ED"
  danger: "#B42318"
typography:
  hero:
    fontFamily: Neue Montreal, Arial, sans-serif
    fontSize: 5.25rem
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  h1:
    fontFamily: Neue Montreal, Arial, sans-serif
    fontSize: 4.75rem
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.035em"
  h2:
    fontFamily: Neue Montreal, Arial, sans-serif
    fontSize: 4rem
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  h3:
    fontFamily: Neue Montreal, Arial, sans-serif
    fontSize: 2rem
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: Neue Montreal, Arial, sans-serif
    fontSize: 1.125rem
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: Neue Montreal, Arial, sans-serif
    fontSize: 0.875rem
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.02em"
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  sectionY: 112px
  pageX: 40px
rounded:
  sm: 10px
  md: 16px
  lg: 26px
  xl: 32px
  pill: 999px
components:
  button-primary:
    backgroundColor: "{colors.stanleyGreen}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: 16px
  button-secondary-light:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: 16px
  button-secondary-dark:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.inkOnDark}"
    rounded: "{rounded.pill}"
    padding: 16px
  display-frame:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 24px
  popup-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: 20px
---

## 1. Authority and scope

This is the canonical visual design source for the Stanley Systems public website.

The current live homepage at `https://stanley-systems.com/` is the visual reference for:

- color
- typography
- spacing
- formatting
- image-led composition
- moving display imagery
- text placed over display images
- interactive CTA behavior
- visual pop-ups and reveal states
- the software-logo conveyor
- dark and light section rhythm

The live website is **not** a source for:

- public copy
- offer names
- product names
- pricing
- guarantees
- claims
- navigation labels
- routes
- funnel order

Those must come from the latest approved task brief and current Stanley Systems product and offer truth. A builder must never preserve obsolete content merely because its visual treatment is being preserved.

When this file conflicts with an older Stanley design prompt, taste reference, redesign north star, generated review packet, component foundry, or historical audit, this file wins.

## 2. Core design idea

The Stanley Systems website is a bold, image-first, interactive business website.

It should feel like a capable operating company showing real office work in motion, not like a generic AI startup or a template assembled from feature cards.

The dominant visual language is:

- oversized Neue Montreal headlines
- deep navy display sections
- warm off-white content sections
- Stanley green action color
- full-width or large-format imagery
- short copy placed over or beside display imagery
- moving images and interface states
- responsive buttons with visible interaction
- useful visual pop-ups and reveals
- strong alternation between dark and light chapters
- one clear visual idea per section

Imagery and interaction should carry more of the explanation than paragraphs.

## 3. Content density

### Website sections

A major section should usually contain:

- one title
- zero or one short supporting sentence
- one primary CTA
- an optional secondary CTA only when it represents a genuinely different next step
- one dominant image, video, animation, or interactive visual

Do not turn a section into a document. If an explanation needs multiple paragraphs, move the detail to a dedicated page, accordion, modal, or later proof section.

### Slides, videos, and moving display images

Default slide content is:

- one short title
- one clear visual
- one CTA or action label when a click is possible

Optional:

- one short supporting line
- up to three very short object or status labels

Do not place paragraphs, mini sales pages, stacked feature lists, complex pricing, or a full navigation system inside a slide or generated image.

### Text inside imagery

Prefer DOM text layered over or near the display image. Text baked into an image should be limited to short object labels or interface states.

## 4. Layout and composition

### Image-first chapters

Use large display images, moving image canvases, background videos, or full-width visual scenes as the anchor. The image should occupy meaningful visual territory instead of being placed as a small thumbnail inside a generic card.

Approved composition patterns include:

- dark hero with moving background media and left-aligned headline/CTA
- full-width operational photograph with a soft readability wash and text overlay
- split-screen chapter with concise copy on one side and a large interactive visual on the other
- dark display section with one large moving mechanism
- light section with a large product or workflow visual and minimal surrounding copy
- horizontal logo conveyor or continuous visual belt
- image-led carousel with short title and CTA
- click or hover reveal that explains one useful part of the visual

### Section rhythm

Use deliberate contrast:

1. dark display chapter
2. light image or proof chapter
3. dark mechanism or CTA chapter
4. light interactive product or workflow chapter

Do not alternate colors mechanically. Each change must signal a new chapter.

### One dominant visual

Every major section must answer:

> What is the one visual a visitor will remember from this section?

If the answer is “a group of similar cards,” the section is not finished.

## 5. Bento boxes and cards

Do not use bento grids as the page skeleton.

Rejected patterns include:

- large grids of equal rounded boxes
- a page made from interchangeable feature cards
- multiple cards competing at equal visual weight
- boxed text inside boxed sections
- icons and short blurbs repeated only to fill space
- fake dashboard panels used as decoration
- tiny visual fragments that never form one strong image

Cards are allowed only when the content is truly discrete, such as:

- one proof item
- one result
- one short status
- one customer artifact
- one interactive reveal

When multiple cards are necessary:

- keep the count low
- make the dominant image or mechanism visually stronger than the cards
- vary scale only for meaning, not to imitate a trendy bento layout
- do not repeat the same border, radius, shadow, and icon treatment across the entire page

## 6. Color

### Primary palette

- **Deep navy `#071422`:** hero, major display sections, final CTA, navigation shell, and high-contrast media stages.
- **Navy ink `#071D3A`:** headlines and important copy on light backgrounds.
- **Stanley green `#15803D`:** primary actions, progress, active states, visual connections, and outcome emphasis.
- **Warm white `#FBFCF7`:** default light canvas.
- **White `#FFFFFF`:** clean content, document, and product surfaces.
- **Soft green `#E9F8ED`:** restrained tint behind proof or interaction states.

### Gradient use

Gradients are allowed when they perform a job:

- preserve text readability over media
- fade a moving image into the page background
- add directional depth to a hero scene
- emphasize an active Stanley green state

Do not use gradients as decorative filler. Avoid purple, blue-purple, rainbow, neon, and generic AI glow palettes.

### Background texture

Subtle dots, grain, light falloff, or green atmosphere may support a display section. Texture must remain secondary to the image and headline.

## 7. Typography

Use Neue Montreal throughout the Stanley Systems website.

### Headline behavior

- bold and direct
- large enough to anchor the composition
- short enough to scan quickly
- modestly tight tracking, never fused lettering
- compact line height
- sentence case unless a designed label requires otherwise

Do not use `font-black` as the default for every heading. Use weight and scale intentionally so the hero remains the strongest typographic moment.

### Supporting copy

- keep it short
- use plain language
- maintain strong contrast
- prefer one sentence to a paragraph
- keep line length narrow when placed over an image

Typography must support the image, not compete with it.

## 8. Buttons and interaction

Buttons should feel physical and responsive.

### Primary CTA

- Stanley green
- white label
- pill or soft capsule geometry consistent with the current site
- short verb-led label
- optional directional arrow
- visible hover lift, color shift, arrow movement, or soft glow

### Secondary CTA

- white or transparent surface
- clear border on dark or image backgrounds
- high-contrast navy or white label
- interactive hover state equal in quality to the primary CTA

### Interaction rules

Every interactive control must communicate that it can be used.

Good interaction includes:

- CTA lift or arrow movement
- image zoom or parallax within a clipped frame
- carousel progress and drag affordance
- hover hotspot on a large image
- click-to-reveal detail
- modal, lightbox, or pop-up that expands a meaningful proof item
- before/after state transition
- workflow state change

Avoid decorative motion that does not improve comprehension.

## 9. Visual pop-ups and reveals

A visual pop-up is a focused layer that appears through hover, tap, click, or timed media choreography and helps the visitor understand the image.

Good pop-ups show:

- a short status
- a source used
- an approval state
- a completed office action
- a proof receipt
- a before/after detail
- a short caption or CTA

Pop-ups must:

- contain very little text
- remain visually connected to the source image
- work on touch devices through tap or click
- be dismissible when modal
- avoid covering the main title or CTA
- use clear focus states and keyboard access

Do not scatter floating widgets around a section solely to make it look like software.

## 10. Moving imagery and motion

Motion is part of the Stanley Systems visual identity when it shows continuity or progress.

Priority motion patterns:

- hero media crossfade or slow scene movement
- continuous software-logo conveyor
- smooth image carousel
- image or video reveal as a section enters view
- subtle text-over-image transition
- workflow path moving from request to completed result
- hover and tap feedback on CTAs and visual hotspots

Motion rules:

- one primary motion idea per section
- no bounce-heavy animation
- no endless floating cards
- no particle fields used as the main visual
- no movement that competes with reading
- respect `prefers-reduced-motion`
- preserve a meaningful static composition when motion is disabled
- avoid autoplay media with sound

## 11. Imagery

Use imagery that feels close to real service-business office work:

- back offices and shop offices
- casual workwear
- computers, phones, forms, invoices, job notes, and schedules
- operational environments
- screens showing a real, truthful product state
- large objects and scenes that remain readable on mobile

Generated or composited imagery is allowed when it follows the same standard.

Avoid:

- corporate boardrooms
- generic smiling office teams
- humanoid robots
- glowing AI brains
- futuristic control rooms
- fake analytics dashboards
- unreadable interface mosaics
- abstract technology visuals with no office-work meaning

## 12. Product and workflow visuals

A product visual must show something Stanley Systems can truthfully support.

Prefer clear states such as:

1. message or request received
2. relevant source identified
3. output or action preview prepared
4. approval or correction provided
5. approved result completed
6. proof or receipt shown

Do not imply unsupported integrations, universal write access, invisible automation, or production readiness through visual polish.

## 13. Responsive behavior

Desktop can use large cinematic compositions. Mobile must preserve the same visual idea rather than collapsing into a stack of tiny cards.

On mobile:

- keep the title and primary CTA visible early
- crop media deliberately around the focal object
- move text overlays when needed for contrast
- convert hover-only details into tap or inline reveals
- keep buttons large enough to use comfortably
- prevent long headings from becoming walls of text
- avoid horizontal overflow
- ensure the logo conveyor remains legible and smooth

## 14. Accessibility

- body and CTA text must meet WCAG AA contrast
- visible keyboard focus is required
- interactive visuals need semantic controls and accessible names
- modals and pop-ups need focus management and dismissal
- background imagery must not reduce text readability
- motion must respect `prefers-reduced-motion`
- meaningful images need useful alt text
- decorative media should use empty alt text or equivalent semantics

## 15. Source priority

Use this order for future Stanley Systems website work:

1. Current approved task brief for content, claims, offers, routes, and conversion intent.
2. This `DESIGN.md` for style, color, formatting, layout, imagery, and interaction.
3. The current live website for visual comparison only.
4. Current Stanley Systems image rules.
5. Current approved section mockups or reference assets when the task provides them.
6. Rejected-pattern library as a failure filter.
7. Repository implementation and component constraints.

Historical prompts, generated review bundles, old taste-site references, old package designs, and old funnel north stars are not active design authority.

## 16. Acceptance test

A section passes visual review only when:

- the title and CTA are immediately clear
- one image, moving scene, or interactive mechanism dominates
- the section still works with most supporting text removed
- it looks connected to the current Stanley Systems site
- it avoids bento-grid composition
- it does not look like a generic AI or SaaS template
- button and image interactions are visible and useful
- mobile retains the visual idea
- content comes from the current approved brief rather than the live page

The final test is simple:

> Does this feel like the current Stanley Systems visual system, with stronger imagery and interactivity, without copying obsolete content or falling back to bento boxes?


---

## Current shared source: /home/jaden/.hermes/workspaces/stanley-systems/shared-context/offer.md

# Offer Context

## Current ladder

- **Admin Drag Calculator** — free lead magnet. CTA: **Calculate Your Admin Drag**.
- **AI Office Map** — paid diagnostic, currently **$197**. Shows where the office is falling behind, what current software already handles, what staff still chase, and the top AI workflow opportunities.
- **AI Office Installation Sprint** — implementation, currently **$3,500 starting**. Installs AI workflows around the business's real office work, paperwork, and existing tools.
- **AI Office Ops** — retainer, currently **$500/month starting**. Keeps workflows useful, updated, monitored, and improving with staff.

## Core offer summary

Stanley Systems installs AI office workflows around the real work service businesses already do: jobs, paperwork, approvals, exceptions, follow-up, handoffs, emails, PDFs, spreadsheets, forms, job notes, vendor docs, closeouts, customer paperwork, and staff workflows.

The public outcome: more jobs processed, cleaner records, faster follow-up, same office team.

The internal moat: workflow-specific setup, staff training in real work, paperwork outside core software, role-specific AI playbooks, company-specific knowledge capture, and faster/better output.

## Public positioning rules

- Do not lead with old public offer names like Workflow Audit, Cashflow Control System, Repeat Revenue System, Both Systems, or Office Process Assessment.
- Do not frame Stanley Systems as generic AI tips, generic AI training, a dashboard, or a replacement for field-service/accounting software.
- Do not reduce the product to drafts/notifications. Those can be artifacts, but the product is installed AI office workflows and better office output.
- If talking about training, ground it in real work: emails, PDFs, spreadsheets, forms, job notes, vendor docs, closeouts, and follow-ups.

Focused reference: `stanley-business-plan-moat-2026-06-11.md`.


---

## Current shared source: /home/jaden/.hermes/workspaces/stanley-systems/shared-context/copy-rules.md

# Copy Rules

## Public copy posture

- Plain, strong, business-owner-facing, and designed to generate calls/sales conversations.
- Sell the pain, cost of waiting, payoff, and contrast between current mess and better outcome.
- Make the next step feel obvious.
- Avoid cautious, generic, teacherly, bureaucratic, or approval-seeking language.
- Avoid generic AI marketing filler.

## Banned / weak public frame

- Avoid: “This isn’t X. This is Y.”

## Content package rule

- Content System produces platform-specific packages, not one caption everywhere.


---

## Current shared source: /home/jaden/.hermes/workspaces/stanley-systems/shared-context/company-brain-product-vision-and-launch-doctrine.md

# Company Brain Product Vision and Launch Doctrine

Status: strategic direction
Captured: 2026-07-15
Owner: Jaden / Stanley Systems
Source: Jaden's direct product vision, current Company Brain architecture, current Jobber + QuickBooks connector scope, and Architect KB offer/GTM principles.

## North Star

Stanley Systems is building the AI office operator for service businesses.

A user should be able to tell Stanley what needs to happen in plain language. The request goes through the Stanley Systems chat UI to that company's dedicated Hermes Company Brain. Hermes checks the company's real records, reasons across the company's rules and context, uses approved Jobber and QuickBooks tools, performs permitted actions, verifies the provider result, and reports what changed.

The long-term interface to office software becomes intent instead of clicking:

```text
User intent
  -> Stanley Systems UI
  -> per-company Hermes Company Brain
  -> company context + workflow Skills
  -> permissioned Jobber/QBO tools
  -> approval when consequential
  -> provider write
  -> provider readback
  -> proof in plain language
```

The goal is not to replace Jobber, QuickBooks, the office team, or the business's existing systems. The goal is to let the existing team operate those systems faster and with less repetitive software work.

## Internal Product Definition

The long-term product is a **full AI office operator** delivered as service-as-software: software intelligence plus company-specific implementation, workflow setup, permissions, training, and ongoing improvement.

`Company Brain` is an internal architecture/product label. It is too general to assume the ICP will understand publicly without explanation. Public naming and offer language are intentionally deferred while the build is the priority.

## What We Sell Now

Do not wait for a future model to sell the broad vision. Sell the narrowest reliable version that produces an obvious office win today.

The first sellable product is not “an AI that can do everything in your software.” It is:

**A Stanley Systems Company Brain installed for a Jobber + QuickBooks service business, starting with one high-cost office workflow and a controlled menu of verified actions.**

The best initial wedge is the path from completed work to clean billing and collected cash:

1. Find completed jobs that are missing information or an invoice.
2. Gather the supporting customer, job, quote, line-item, and accounting records.
3. Prepare the exact Jobber and/or QuickBooks changes.
4. Ask one natural, batchable approval when the action is consequential.
5. Execute the approved changes.
6. Read back from the provider.
7. Report what changed and what remains blocked.

This wedge is concrete, frequent, expensive, cross-system, easy to demonstrate, and close to cash.

### Launch readiness boundary

Current connector breadth and enabled test-tenant write flags do not by themselves prove that every provider mutation is ready for a customer-facing promise. Until an exact action has passed independent end-to-end verification, sell and deliver:

- read and search;
- reconcile and explain;
- daily exception reporting;
- prepared corrections with before/after previews;
- shadow-mode approval flows.

Begin paid design-partner installations in read-only/shadow mode. Unlock each production write separately only after that exact operation passes authentication, role permission, approval binding, stale-record checks, duplicate/replay protection, provider response, independent readback, and recovery testing.

This means Stanley can take money and deliver value before broad write autonomy is available, without implying that unverified actions are ready.

## Current Offer Ladder Fit

The Company Brain is the product architecture underneath the existing Stanley Systems offer ladder, not a separate random SaaS offer.

- **Admin Drag Calculator:** exposes the cost of repetitive office work.
- **$197 AI Office Map:** identifies the first workflow the Company Brain should take over or support.
- **$3,500 starting AI Office Installation Sprint:** installs the Company Brain, connects approved systems, captures company rules, trains staff, and launches the first controlled workflow.
- **$500/month starting AI Office Ops:** monitors, maintains, improves, and expands the Company's Skills, tools, permissions, and workflows.

The chat UI is the operating interface. The installation, company-specific workflow design, training, knowledge capture, verification, and ongoing improvement are the paid value.

## Initial ICP

Start narrow:

- service businesses already using Jobber and QuickBooks Online;
- enough job and billing volume that office drag is expensive;
- at least one owner, office manager, admin, dispatcher, or bookkeeper touching both systems;
- repeated record changes, invoicing handoffs, follow-up, or cleanup work;
- willing to start with one controlled workflow and documented approval rules.

Do not market first to every small business, every CRM, or every accounting platform.

## Initial Capability Boundary

Launch with a named, tested action menu. Expand only after provider-level verification.

Examples already represented in the current connector surface include:

- Jobber customer/client search, create, and update;
- Jobber job and request creation/update;
- Jobber job close and client archive through guarded actions;
- QuickBooks customer search, create, update, and upsert;
- QuickBooks estimate and invoice creation;
- QuickBooks invoice send, payment creation, invoice lookup, void/delete/reassign through appropriate high-risk approval rails;
- cross-system search, comparison, preparation, and proof-backed reporting.

Schema exposure is not a product promise. Every action needs real provider smoke testing, required-field handling, permissions, idempotency where possible, and readback before it is advertised as supported.

## Trust Architecture Is Part of the Product

The moat is not merely that an LLM can call APIs. The product is trustworthy delegation.

Every consequential action should have:

- server-derived company, actor, role, and session;
- a clear source of truth;
- company-specific permission rules;
- a prepared before/after action packet;
- natural approval where required;
- stale-record checks;
- idempotency or duplicate protection where possible;
- provider response plus provider readback;
- a public-safe, append-only proof receipt;
- an honest blocked/degraded result when verification fails.

If the system cannot prove the change, it must not claim completion. If real data or connector access fails, it must fail closed rather than substitute synthetic or stale records.

## Human Boundary

The Company Brain should coordinate and execute office software work, but it should not silently invent business policy.

Humans remain responsible for:

- accounting and tax judgment;
- disputed billing, refunds, write-offs, prior-period changes, and reconciliation policy;
- payroll and labor-sensitive decisions;
- ambiguous facts about work completed or money physically received;
- credential, OAuth, MFA, app permission, and subscription changes;
- relationship-sensitive customer communication unless explicitly approved.

Stanley can gather evidence, recommend the likely path, and prepare the exact work so the human decision is fast.

## Product Development Rule

Build for current models, but design the architecture so better models increase capability without forcing a product rewrite.

- Hermes owns reasoning and orchestration.
- GBrain stores and retrieves company memory and context; it is not canonical accounting truth.
- Workflow Skills own judgment, office doctrine, examples, and edge cases.
- Deterministic tools own auth, API calls, schemas, permissions, approvals, idempotency, audit, and readback.
- Jobber and QuickBooks remain systems of record.
- The Stanley UI remains the primary operating interface.

This lets model improvements increase reasoning quality and workflow range while the safety rails and provider contracts remain stable.

## Model-Era Product Progression

Build the product as a widening responsibility ladder:

1. **Now:** complete and verify the Jobber + QuickBooks foundation and the narrow billing-readiness wedge.
2. **Early customers:** install the wedge, learn the company's real office rules, and expand only into adjacent verified actions.
3. **Improving models:** give Hermes broader office responsibilities as reasoning, tool use, context handling, and reliability improve.
4. **Mature product:** one AI office operator coordinates most repetitive software and information work across CRM, accounting, documents, inboxes, forms, approvals, and handoffs, while humans retain policy and high-consequence judgment.

Do not pause the build waiting for the mature-model stage. Every useful workflow installed now builds distribution, operating knowledge, customer trust, proof, and implementation capability before the broader technology becomes commonplace.

## Moat Hierarchy and Platform Risk

The primary moat is **distribution**.

Build it through:

- customer relationships and installed accounts;
- increased founder-led outreach after the build is launch-ready;
- SEO authority and accumulated search history;
- consistent posts, demos, and educational content;
- partner and referral channels;
- case studies, proof, and reputation in the service-business market;
- an audience and network that can adopt new Company Brain capabilities as soon as models support them.

Secondary moats strengthen distribution but do not replace it:

- company-specific workflow knowledge;
- Jobber, QuickBooks, and future provider integrations;
- reusable workflow Skills and installation playbooks;
- staff training and adoption experience;
- permissions, approvals, audit, and provider-readback infrastructure;
- customer context, feedback loops, and proof history;
- speed of implementation and ongoing support.

Do not rely on source code, prompts, model access, or the broad concept as durable protection. A foundation-model provider may eventually reproduce much of the raw agent capability, bundle a competing feature, or use greater resources and existing distribution. Stanley's defense is to build the customer network, category history, workflow credibility, and trusted implementation layer before that capability becomes commoditized.

## Launch and Distribution Commitment

The operating sequence is:

1. Finish the current build to the verified launch boundary.
2. Launch without waiting for future models.
3. Increase outreach significantly once the product is ready to install.
4. Begin with warm relationships, including a previous connection Jaden has already identified as a possible first customer or design partner.
5. Use early installations to collect real workflow learning, proof, referrals, and case studies.
6. Compound distribution through outreach, SEO, posts, demos, partnerships, and history while the product expands.

Public offer wording is not the current priority. When it is revisited, it should explain a concrete office result rather than assume the ICP understands the general `Company Brain` label.

## Expansion Sequence

1. Prove one completed-work-to-billing workflow for Jobber + QuickBooks.
2. Add adjacent cashflow workflows: invoice readiness, sync proof, payment/deposit matching, and follow-up preparation.
3. Add data hygiene: duplicates, customer/property cleanup, item mapping, and record corrections.
4. Add proactive scans that find problems and prepare fixes before the user asks.
5. Add more role-specific Skills and permission policies.
6. Add additional field-service and accounting platforms only after the Jobber + QuickBooks installation is repeatable.
7. Move from assisted approvals toward bounded autonomy only where the customer has explicitly configured rules and the action history proves reliability.

## What Not to Do

- Do not wait for the next model before selling.
- Do not promise “all software management” before each provider action is verified.
- Do not market this as a generic chatbot, generic AI training, or another automation agency.
- Do not position it as replacing the customer's CRM, accounting system, or office team.
- Do not build a giant hardcoded feature for every workflow; use fat Skills and broad deterministic tools.
- Do not let GBrain or generated prose override current Jobber/QuickBooks records.
- Do not make users approve every harmless read or draft, but do not silently perform consequential writes.
- Do not expand to many CRMs before the first vertical and workflow are repeatable.

## Strategic Thesis

The immediate opportunity is not to build a perfect autonomous company before launch. It is to install a useful, trusted office operator that handles one painful slice of real work today and expands as capability, customer trust, and models improve.

The winner will not necessarily be the company with the first access to the smartest model. It will be the company that first earns distribution, workflow knowledge, customer trust, provider integrations, proof history, and a repeatable installation system.
