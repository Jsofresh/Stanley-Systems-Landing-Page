# Stanley Systems Image Ruleset

## Core standard

Every generated image must be literal enough to understand in 5 seconds.

If a visitor covered the section headline and only looked at the image, they should still be able to roughly understand:

- what business problem the image is about
- what Stanley Systems is helping recover/fix
- what the before state is
- what the after state is

The image should support the DOM copy. It should not become the section.

## Image role

Generated images should act as premium support visuals, hero visuals, product visuals, or explanatory objects inside the page.

Generated images should not act as full website section mockups, mini landing pages, report screenshots, dashboard screenshots, pricing cards, fake app screens full of tiny UI, hero sections inside the actual hero section, or complete infographic posters with their own headline/body/CTA.

DOM owns section headlines, eyebrow text, paragraphs, CTAs, pricing, package details, discounts, sales claims, important proof, and explanations.

Images own visual metaphor, literal business objects, 3D depth, simple paths/flows, emotional clarity, and quick comprehension.

## 5-second clarity rule

Every image must tell one clear visual story:

```text
problem/source → Stanley Systems follow-up path → recovered outcome
```

Examples:

- old customer list → follow-up sent → booked job
- missed call → recovery text → customer reply → booked job
- completed job → review request → 5-star review
- happy customer → referral ask → new lead → booked job
- customer records + missed calls + reviews + referrals → revenue opportunity

Avoid abstract-only visuals. A glowing loop by itself is not enough. Floating cards by themselves are not enough. If an object is not immediately recognizable, label it briefly.

## Literal object requirement

Use recognizable service-business objects, such as customer profile cards, old customer lists, phone call bubbles, missed-call warning badges, message bubbles, review stars, referral nodes, calendar booking cards, job completed cards, booked-job confirmation cards, office task cards, invoice/job cards, opportunity cards, simple money/value objects, green recovery paths, and red leak/risk markers.

Each image should include 3–6 main visual objects maximum.

## Text inside images

Short object labels are allowed when they clarify visual meaning.

Allowed image text:

- 1–4 word labels
- labels attached to objects/icons/cards
- simple status labels
- tiny clarification text

Good examples:

- Old customers
- Missed call
- Follow-up sent
- Review ask
- Referral ask
- Customer reply
- Booked job
- Revenue leak
- Credit applied
- Opportunity found

Do not include section headlines, hero titles, paragraphs, long explanations, Stanley Systems logo, eyebrow labels, fake CTA buttons, fake nav bars, pricing cards, package names as big sales cards, fake brand names, technical-stack language, or the terms AI/GPT/backend/webhook/Twilio/n8n.

## Brand/style rules

Use Stanley Systems visual language:

- white or near-white backgrounds
- deep navy text/object depth
- Stanley green
- glowing green accents
- pale green support washes only when restrained
- bright red only for cost, risk, savings, discount, warning, or value emphasis
- occasional navy shadows/depth
- premium B2B service-business feel
- dimensional 3D pop
- clean spacing
- polished product-marketing quality

Avoid beige/tan/cream dominant backgrounds, orange, black/dark full-background images, muddy gradients, generic SaaS dashboards, purple AI gradients, random neon colors, dense microcopy, and crowded visual systems.

## Composition rules

Prefer one clear focal path, left-to-right or circular recovery flow, clear before/after relationship, large recognizable objects, strong depth/shadow, enough whitespace, and image edges that can bleed into a section panel.

Avoid card-inside-card-inside-card framing, tiny visuals trapped inside bento boxes, full page screenshots inside the image, dense dashboards, section-like layouts, internal hero blocks, fake buttons, and fake pricing tables.

## Layout integration rule

Use this pattern where appropriate:

```text
[ section panel ]
  image bleeds to panel edge
  DOM copy overlaps or sits beside it
```

Coded content should be placed around, beside, or partially overlapping the image.

Do not force images into small padded bento boxes unless the visual is intentionally a small icon/object.

For desktop, sections should generally fit in one normal desktop viewport when possible; avoid excessive vertical padding, huge stacked image + content layouts, and uncontrolled image heights.

For mobile, stack cleanly, keep images large enough to understand, avoid horizontal overflow, avoid tiny cropped visuals, and keep labels readable.

## Image QA checklist

Before accepting any generated image, verify:

- Can I understand the image in 5 seconds?
- Does it show a literal business problem or recovery path?
- Does it have 3–6 recognizable objects?
- Does it avoid becoming a section mockup?
- Are labels short object labels only?
- No section headline inside the image?
- No paragraph inside the image?
- No Stanley Systems logo inside the image?
- No fake CTA button?
- No pricing card?
- No dense dashboard?
- No fake brand names?
- No AI/GPT/backend/Twilio/webhook/n8n language?
- No beige/tan dominant background?
- No orange?
- No black/dark full background?
- Does it use white/near-white, Stanley green, deep navy, green glow, and controlled red correctly?
- Does it work as imagery inside a real coded section?
- Does it support DOM copy instead of replacing it?

If any answer fails, regenerate or revise the prompt.
