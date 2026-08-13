# Stanley Systems Image, Motion, and Interactive Visual Rules

**Status:** Active visual source

**Canonical design source:** `/home/jaden/stanley-landing/DESIGN.md`

This ruleset governs generated images, photographs, videos, carousels, moving display images, text-over-image sections, visual pop-ups, and interactive product visuals.

The live website is a style reference only. Do not copy its current words, offers, prices, claims, labels, or routes.

## Core standard

Every visual must communicate one useful idea in five seconds.

A visitor looking at the visual should be able to understand at least one of these without reading a paragraph:

- the office problem
- the work moving through a process
- the before and after state
- the action being approved or completed
- the proof of what happened
- the next step the visitor can take

The image or interactive visual is allowed to dominate the section. The title and CTA should remain real DOM content whenever practical.

## Image-first composition

Stanley Systems sections should usually be built around one large visual rather than a collection of small cards.

Good uses include:

- moving hero background
- full-width operational photograph
- large workflow or product display
- image carousel
- interactive before/after scene
- text layered over a photograph or moving image
- visual hotspot that reveals one useful detail
- click-to-open proof or product state
- logo conveyor

Do not force a strong image into a small padded box. Let it bleed to the section edge, fill a display frame, or act as the section background.

## Text over display images

Text may sit over a photograph, video, animated canvas, or large illustration when readability is protected.

Default overlay content:

- one title
- zero or one short supporting sentence
- one primary CTA
- optional secondary CTA only when necessary

The title starts the section. Never place an eyebrow, kicker, all-caps category label, or decorative pre-title above a public section heading. Functional interface labels and real statuses inside the visual are allowed.

Use a directional navy wash, gradient, scrim, or quiet zone inside the image to keep the title readable.

Do not cover the focal object with copy. Do not place a long paragraph over moving media.

## Slides and moving display images

A slide should usually contain:

- one short title
- one dominant visual
- one CTA or interaction prompt when clickable

Optional:

- one short supporting line
- up to three brief labels or statuses

Do not put a mini landing page, pricing grid, full workflow explanation, dense feature list, or navigation bar inside a slide.

Motion should be slow enough to understand and fast enough to feel alive. Preserve a meaningful static state for reduced-motion users.

## Visual pop-ups and reveals

Good visual pop-ups reveal information connected to the main image, such as:

- source checked
- approval needed
- action ready
- task completed
- proof receipt
- before/after detail
- short caption
- clear CTA

A pop-up must:

- contain very little text
- remain visually connected to the main image
- work through tap or click on touch devices
- have a visible trigger
- be dismissible when modal
- use keyboard focus and accessible naming
- avoid covering the primary title and CTA

Do not create floating UI panels only to make the page look technical.

## Literal object requirement

Use recognizable service-business office objects and environments:

- shop or service-business back office
- casual workwear
- computer and phone
- email or text message
- form, job note, PDF, invoice, spreadsheet, estimate, or schedule
- customer or job record
- approval state
- completed-action receipt
- software logo or real provider result

Use three to six main visual objects when generating a single explanatory image. Larger photographs may naturally contain more detail, but they still need one focal story.

## Text inside images

Prefer real DOM text for section titles, explanations, CTAs, prices, claims, and proof.

Text embedded inside visual assets should be limited to:

- one to four word object labels
- short status labels
- interface states
- brief captions
- clearly designed text that is part of the product UI being shown

Do not bake paragraphs, pricing, guarantees, sales claims, or complex CTA copy into generated images.

## Product and workflow visuals

Use real product UI or truthful prototypes where possible.

A strong Stanley Systems product visual can show:

1. request received
2. source identified
3. output or approved action prepared
4. human approval or correction
5. result completed
6. proof returned

Do not imply unsupported integrations, universal write access, invisible automation, or production readiness.

## Brand and style

Use:

- deep navy display backgrounds
- warm off-white light canvases
- white product or document surfaces
- Stanley green actions and progress
- navy text and visual depth
- restrained green atmosphere or glow
- soft shadows that separate interactive layers
- Neue Montreal for DOM text
- bold image-led framing

Dark full-background images are allowed and encouraged when they match the live hero/display style and maintain readable contrast.

Avoid:

- purple AI gradients
- rainbow or neon palettes
- generic SaaS dashboards
- humanoid robots
- glowing AI brains
- corporate boardrooms
- stock teams in formal business clothing
- abstract technology visuals with no office-work meaning
- crowded interface mosaics
- bento-style image grids
- card-inside-card-inside-card framing
- tiny visuals trapped inside large boxes

## Motion rules

Use motion to show continuity, progress, or interaction:

- crossfade or slow movement in hero media
- image carousel
- logo conveyor
- before/after transition
- workflow state transition
- hover zoom inside a clipped image
- CTA lift or arrow movement
- tap-to-reveal detail

Use one primary motion idea per section.

Do not use:

- bounce-heavy animation
- endless floating cards
- decorative particle fields
- movement that competes with the title or CTA
- autoplay sound

Always respect `prefers-reduced-motion`.

## Bento and card restriction

A large image or moving mechanism must remain the visual anchor.

Do not use:

- grids of equal image cards as the section idea
- a collection of tiny panels that never form one memorable visual
- repeated rounded boxes with icons and blurbs
- fake dashboard widgets as supporting decoration

Discrete proof items may use cards, but they must support rather than replace the main image.

## Responsive integration

Desktop:

- use cinematic scale
- allow image bleed
- keep title and CTA grouped
- protect the focal object from overlay text

Mobile:

- crop around the focal object deliberately
- keep the primary CTA easy to reach
- convert hover-only details to tap or inline reveals
- keep moving visuals legible
- avoid horizontal overflow
- keep embedded labels large enough to read

## Visual QA checklist

Before accepting a visual, verify:

- Can the main idea be understood in five seconds?
- Is there one dominant image or moving mechanism?
- Is the title short and readable?
- Is the primary CTA clear?
- Does the visual use the current navy, warm-white, and Stanley green language?
- Does it feel connected to the current live website style?
- Does it avoid copying current live-site content?
- Does it avoid bento-grid composition?
- Does it avoid generic AI/SaaS decoration?
- Are pop-ups or reveal states useful rather than ornamental?
- Does the visual retain meaning when motion is reduced?
- Does mobile preserve the same visual idea?
- Does the product state remain truthful?

If any answer fails, revise the composition before adding more text, cards, or decoration.
