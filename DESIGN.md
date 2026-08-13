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

### No section eyebrows or kickers

Start every public marketing section with its real headline. Never place a small category label, all-caps eyebrow, kicker, pre-title, or decorative micro-heading above an `h1` or `h2`.

Functional labels inside the product interface remain allowed when they communicate real state or structure, such as a form label, workflow stage, status, table heading, metric label, or approval state. They must not be used as decorative substitutes for a section headline.

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
