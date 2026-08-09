# 7 AI Office Fixes Funnel Assets

Source: uploaded standalone HTML guide, `7-ai-office-fixes (1).html`.

## Conversion intent

Use the guide as the instant-value step before the custom AI Office Blueprint.

Flow:

1. Visitor lands on Free AI Office Blueprint page.
2. They immediately see the 7 practical AI office fixes.
3. The page frames the intake as: “Now turn these generic fixes into your custom office Blueprint.”
4. They answer the shortened one-question-at-a-time intake.
5. A Hermes/automation worker uses their answers to fill the formatted Blueprint HTML.
6. The custom Blueprint is emailed to the user.
7. Email CTA: book/get the full AI Office Map.

Primary conversion idea:

> The generic guide gives them proof that Stanley Systems understands office drag. The emailed custom Blueprint proves we can apply it to *their* business.

## Tightened lead magnet page copy

### Hero headline

Get the Free AI Office Blueprint

### Hero subhead

See 7 AI office fixes you can use this week. Then answer the short intake and get a custom emailed Blueprint with staff plays, prompts, one quick capacity win, and the next workflow worth fixing first.

### Primary CTA

Get My Custom Blueprint

### Secondary CTA

Read the 7 Fixes First

## Above-intake bridge section

### Eyebrow

Start here

### Headline

Get the generic AI Office fixes first.

### Body

Use the free guide now. Then answer the intake so Stanley Systems can turn your answers into a custom formatted Blueprint and email it to you.

### 7 fix bullets

1. Clean messy tech notes into billing-ready summaries
2. Find what is blocking invoices before cash gets stuck
3. Sort stale estimates and write the next follow-up
4. Rewrite customer replies without sounding robotic
5. Build a daily office drag list from real staff friction
6. Give each role a simple AI cheat sheet
7. Map the workflow before buying another tool

### Bridge CTA

Customize my Blueprint

## Intake promise copy

### Section heading

One question at a time.

### Section body

Answer, tap next, and give Stanley Systems enough detail to build the custom version — without making you fill out a giant consultant form.

### What the form gives us

Specific tools, stuck points, staff cleanup work, billing drag, desired output, and one messy example — enough detail to fill the formatted Blueprint HTML and email the custom version.

## Shorter intake question set

Required questions should stay lean enough to finish quickly while still collecting enough context to avoid generic AI tips:

1. Name
2. Email
3. Business name
4. Business type
5. Software/tools already used
6. Where information gets stuck
7. What staff repeatedly copy, check, or rewrite
8. What delays invoices/payments
9. Tools touched by the messy workflow
10. Desired AI output
11. Team AI comfort level
12. One messy office example

Note: the implementation currently uses 12 visible steps because the software stack is compressed into one step, accounting/spreadsheets are no longer separate required questions, and the messy example remains the final diagnostic input.

## Email follow-up draft

Subject: Your AI Office Blueprint is ready

Body:

Hey {{first_name}},

Your AI Office Blueprint is attached below.

The big opportunity I’d look at first: {{recommended_workflow}}.

Based on what you sent, your fastest win is probably not another tool. It is cleaning up the office handoff around {{highest_drag_area}} so staff can move work into billing, follow-up, or customer updates faster.

Inside the Blueprint you’ll see:

- 2–3 AI staff plays based on your workflow
- copy/paste prompts your team can try immediately
- one quick capacity win
- the first workflow I would map deeper in the AI Office Map

If you want the full prioritized version, book the AI Office Map here:
{{map_link}}

— Stanley Systems

## Telegram promo draft

Service businesses do not need another generic AI tip list.

They need AI in the places office work actually slows jobs down:

- messy tech notes
- invoice blockers
- stale estimates
- customer replies
- daily office drag
- role-specific staff prompts
- workflow mapping before buying another tool

I put together 7 AI Office Fixes they can use this week.

Then the page turns their answers into a custom AI Office Blueprint with staff plays, prompts, and the first workflow worth fixing.

CTA: Get the Free AI Office Blueprint

## PDF / downloadable guide structure

Title: 7 AI Office Fixes Service Businesses Can Use This Week

Sections:

1. Why most AI tools do not fix office drag by themselves
2. Five prompt rules that make AI output usable
3. Fix 01 — messy technician updates into billing-ready notes
4. Fix 02 — invoice blocker checklist
5. Fix 03 — estimate follow-up cleanup
6. Fix 04 — customer replies that sound human
7. Fix 05 — daily office drag list
8. Fix 06 — role-specific AI cheat sheets
9. Fix 07 — workflow map before tool purchase
10. Next step — get the custom AI Office Blueprint

PDF CTA block:

> Want this translated to your actual office workflow? Answer the short intake and Stanley Systems will generate a custom AI Office Blueprint with staff plays, prompts, one quick capacity win, and the first workflow worth improving.

Button: Get My Free AI Office Blueprint

## Recommendation on delivery speed

The generic guide is the immediate payoff. The custom Blueprint should be generated after intake in the formatted HTML and emailed to the user.

Email should be the custom Blueprint delivery path:

- custom formatted Blueprint HTML
- saved copy
- follow-up nurture
- Map CTA
- recovery if they leave the page

Current verified implementation state before this doc was created:

- The website API generates a preview inline.
- It saves a local JSONL submission.
- It attempts webhook/contact delivery if env vars exist.
- It does **not** send a Gmail email directly.
- Live PM2 env check showed the relevant webhook vars were absent for the Stanley processes.
- Gmail searches across authenticated Stanley profiles found no recent AI Office Blueprint emails.
