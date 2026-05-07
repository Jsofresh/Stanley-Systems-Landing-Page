# Stanley Systems reference atlas — Section 5 + System Pages

Source brief: `/home/jaden/.hermes/cache/documents/doc_83244fad04fc_message.txt`
Target repo branch observed: `feature/stanley-section-5-system-pages`
Created for Kanban task: `t_e7410282` / Reference Mapper

This atlas is an internal design/build reference. The files under `docs/visual-references/stanley-systems/` may be used by builders and judges as references only. Do not import these screenshots, frames, or crops into production UI. All important page copy must be rendered as DOM text.

## Reference source inventory

### Source media found in Hermes cache

- `/home/jaden/.hermes/cache/screenshots/browser_screenshot_092d0b38019a4418a4b6faecb9925c31.png`
  - 1265 x 7383 PNG.
  - Full current Stanley homepage screenshot containing the existing “TWO MONEY PATHS / Pick the system by where money gets stuck.” section.
  - Copied to `section-5/homepage-current-full-source.png`.
  - Cropped to `section-5/homepage-two-money-paths-current-crop.png`.

- `/home/jaden/.hermes/cache/videos/video_2ff9d9129303.mp4`
  - 1916 x 1080, 6.04s.
  - Light Cashflow Control System explainer frame.
  - Frame extracted to `cashflow-control/cashflow-control-system-frame-light.png`.

- `/home/jaden/.hermes/cache/videos/video_cc260eb9d022.mp4`
  - 1280 x 720, 8.04s.
  - Dark Cashflow Control System explainer frame.
  - Frame extracted to `cashflow-control/cashflow-control-system-frame-dark.png`.

- `/home/jaden/.hermes/cache/videos/video_adee68062314.mp4`
  - 1916 x 1080, 8.04s.
  - Light Repeat Revenue System hub-and-spoke explainer frame.
  - Frame extracted to `repeat-revenue/repeat-revenue-system-frame-light.png`.

- `/home/jaden/.hermes/cache/videos/video_2e65a98d0e8b.mp4`
  - 1920 x 1080, 8.04s.
  - Dark Repeat Revenue System hub-and-spoke explainer frame.
  - Frame extracted to `repeat-revenue/repeat-revenue-system-frame-dark.png`.

- `/home/jaden/.hermes/cache/videos/video_702a1a4c94e1.mp4`
  - 1280 x 720, 8.04s.
  - Dark Repeat Revenue System variant. Duplicate content of the Repeat Revenue hub-and-spoke system.
  - Inspected but not promoted as a canonical still because `video_2e65a98d0e8b.mp4` is higher resolution.

- `/home/jaden/.hermes/cache/videos/video_e8d1e3138521.mp4`
  - 1916 x 1080, 8.04s.
  - Dark Cashflow Control System variant. Duplicate content of the Cashflow four-step system.
  - Inspected but not promoted as canonical because `video_cc260eb9d022.mp4` is the smaller dark variant and `video_2ff9d9129303.mp4` is the clearest light variant.

### Repo artifacts inspected

The repo already contains many reference and QA artifacts under `artifacts/`, `references/`, and `public/visual-kit/`. Relevant findings:

- Existing homepage screenshots in `artifacts/*` show current production/homepage visual language, but most are not specific to the requested new Section 5 target.
- Existing primitive screenshots under `artifacts/visual-kit-primitives-screenshots/` confirm primitive icon availability for check-circle, dollar-circle, file-estimate, file-invoice, message-bubble, phone-missed, shield-check, trend-up, user, and users.
- Existing raw ServiceTitan references under `references/servicetitan/` are broad design research and should not be treated as the direct target for this Section 5/system-pages build.

## Atlas entries

### 1. Homepage Section 5 / packages section

Reference file:

- `section-5/homepage-two-money-paths-current-crop.png`
- Source: `/home/jaden/.hermes/cache/screenshots/browser_screenshot_092d0b38019a4418a4b6faecb9925c31.png`, cropped approximately at `x=0 y=3200 w=1265 h=600`.

Page/section:

- Homepage packages/system-selection section.
- Existing current-site section, not the final requested rebuild target.

Purpose:

- Shows the current two-card comparison pattern for Cashflow Control System vs Repeat Revenue System.
- Useful for route/copy continuity and a baseline comparison.
- Do not copy its price badges or old “Pick the system…” headline into the new requested Section 5 unless the active spec explicitly asks for them. The source brief’s requested new headline is “Systems that make money.”

Visible copy:

- “TWO MONEY PATHS”
- “Pick the system by where money gets stuck.”
- “Cashflow Control System”
- “$397/mo”
- “Turn finished work into invoice-ready handoffs, final bill follow-up, and collected cash.”
- “Finished jobs wait before billing”
- “Open balances need follow-up”
- “The owner keeps checking if invoices moved”
- “View Cashflow Control”
- “Repeat Revenue System”
- “$697/mo”
- “Build the flywheel from ratings, reviews, referrals, Google visibility, missed calls, and past customers.”
- “Past customers are not getting checked”
- “Reviews and referrals happen randomly”
- “Missed calls and old estimates go cold”
- “View Repeat Revenue”

Layout notes:

- White/off-white section background.
- Center/left headline area with supporting copy on the right.
- Two symmetric white rounded package cards.
- Pale green borders, green pill labels, green CTA buttons.
- Existing section is card/comparison oriented, not medallion/flow oriented.

Hard visual rules for the new Section 5 build:

- Use the source brief target, not the current-site old pricing-card structure.
- Required headline: “Systems that make money.”
- “Systems that” deep navy; “make money” Stanley green; curved green underline under “make money”.
- Two large symmetrical cards: Cashflow Control System and Repeat Revenue System.
- Large pale-green medallions with white ring feel and depth.
- Four icon nodes per card with green arrows between nodes.
- Large green “Learn more” CTAs.
- No pricing badges unless later specs explicitly reintroduce them.
- No screenshots or reference images embedded in production.
- No orange, no dark mode, no generic flat card block, no cramped mobile.

### 2. Cashflow Control System reference — four-step explainer

Reference files:

- `cashflow-control/cashflow-control-system-frame-light.png`
- `cashflow-control/cashflow-control-system-frame-dark.png`

Page/section:

- Cashflow Control System / process overview.
- Best suited for hero flow, Section 5 flow row, and cashflow page flow sequence inspiration.

Purpose:

- Gives a clean visual shorthand for turning completed work into collected cash.
- Supports the brief’s Cashflow flow: Job Complete / Billing Ready / Invoice Sent / Cash Collected.

Visible copy:

- “Cashflow Control System”
- “Work Done”
- “Invoice Ready”
- “Sent Fast”
- “Cash Collected”
- “INVOICE” inside the invoice icon.

Layout notes:

- Centered 16:9 frame.
- Four circular white icon medallions aligned horizontally.
- Green arrows between nodes.
- Large headline above the flow.
- Light variant: off-white background, navy headline.
- Dark variant: navy background, white headline.

Hard visual rules for builders:

- For production pages, use native React/Tailwind/SVG/primitive components, not the frame image.
- Adapt labels to the source brief: Job Complete → Billing Ready → Invoice Sent → Cash Collected for Section 5; Customer Intake → Job Complete → Billing Ready → Invoice Sent → Followed Up → Cash Collected for cashflow hero.
- Maintain medallion depth: white circular disc, soft shadow, green icon, not flat colored circles.
- Keep arrows evenly spaced and green; avoid awkward wraps on mobile.
- Do not use the dark-background variant as page background unless explicitly approved; the current project target says off-white / no dark mode.

### 3. Cashflow dashboard / Money Leak Map reference

Reference file:

- `cashflow-control/homepage-money-leak-map-dashboard-crop.png`
- Source: `/home/jaden/.hermes/cache/screenshots/browser_screenshot_092d0b38019a4418a4b6faecb9925c31.png`, cropped approximately at `x=620 y=2200 w=600 h=900`.

Page/section:

- Current homepage Workflow Audit / Money Leak Map card.
- Useful as a reference for native dashboard cards on the Cashflow Control page.

Purpose:

- Shows the desired “native dashboard card” feel: title, subtitle, metric grid, and a recommendation/status panel.

Visible copy:

- “Money Leak Map”
- “Example audit snapshot: where money is stuck and which fix should move first.”
- “Delayed invoices” / “Ready” / “TO BILL”
- “Open estimates” / “Open” / “NEXT STEP”
- “Office rework” / “30+” / “HRS/MO”
- “Inactive customers” / “12+” / “MONTHS”
- “Invoice-ready check”
- “Confirm job details before billing so finished work can move to invoice without office cleanup.”

Layout notes:

- White rounded dashboard panel on soft off-white background.
- 2x2 metric grid with pale green panels.
- Bottom pale-green recommendation card.
- Dark navy title text and Stanley green metric/status text.

Hard visual rules for builders:

- Dashboard cards should be native DOM/card components.
- Avoid generic SaaS analytics clutter.
- Use subtle borders and white/pale-green cards.
- Keep red/alert styling only for true exception cards where the page spec calls for it.

### 4. Repeat Revenue System reference — hub-and-spoke loop

Reference files:

- `repeat-revenue/repeat-revenue-system-frame-light.png`
- `repeat-revenue/repeat-revenue-system-frame-dark.png`

Page/section:

- Repeat Revenue System overview / customer-revenue loop.
- Best suited for Repeat Revenue hero flow, referral/review/call-catcher module, and medallion inspiration.

Purpose:

- Defines the four major Repeat Revenue pillars as a loop: Re-engage, Reviews, Missed Calls, Referrals.

Visible copy:

- “Repeat Revenue System”
- “Re-engage”
- “Reviews”
- “Missed Calls”
- “Referrals”

Layout notes:

- Central white circular hub with green rim.
- Four smaller white circular medallions around the hub.
- Pale green circular connector loop.
- Green dimensional icons, dark navy labels.
- Light variant on off-white; dark variant on navy.

Hard visual rules for builders:

- Use the loop concept as inspiration, but render production content in DOM/components.
- For the target Repeat Revenue hero flow, adapt the brief’s flow: Past Customer → Review Proof → Referral Offer → New Call → Booked Work.
- For page sections, the system should feel like a customer revenue loop, not a generic dashboard.
- Do not overuse the dark-background variant. Project target is soft off-white background/no dark mode.
- Keep labels readable and avoid text baked into images.

## Crop inventory

All requested crop target filenames were created under `crops/`. Some are exact crops from available references; some are approximations because the attached/cache source set did not include direct screenshots for every requested page section.

### Section 5 crop targets

- `crops/section-5-headline.png`
  - Source: `section-5/homepage-two-money-paths-current-crop.png`, approximate crop `x=70 y=20 w=1110 h=190`.
  - Shows current “TWO MONEY PATHS / Pick the system…” headline area. Use as current-site baseline only; new build headline must be “Systems that make money.”

- `crops/section-5-card.png`
  - Source: `section-5/homepage-two-money-paths-current-crop.png`, approximate crop `x=25 y=205 w=600 h=385`.
  - Shows current Cashflow Control card. Usable as a partial card baseline, but new build should be medallion/flow-card based, not pricing-card based.

- `crops/section-5-button.png`
  - Source: `section-5/homepage-two-money-paths-current-crop.png`, approximate crop `x=95 y=510 w=250 h=70`.
  - Shows current green “View Cashflow Control” CTA. New target requires larger “Learn more” buttons around 64–76px high on desktop.

- `crops/section-5-medallion.png`
  - Source: `repeat-revenue/repeat-revenue-system-frame-light.png`, approximate crop `x=330 y=120 w=620 h=430`.
  - Proxy medallion reference because the current homepage Section 5 source lacks the required large medallions. Use for white ring, pale-green accent, green icon, and soft-shadow depth.

- `crops/section-5-flow-row.png`
  - Source: `cashflow-control/cashflow-control-system-frame-light.png`, approximate crop `x=280 y=430 w=1350 h=360`.
  - Proxy flow-row reference for four icon nodes and green arrows.

### Repeat Revenue crop targets

- `crops/repeat-hero-step-card.png`
  - Source: `repeat-revenue/repeat-revenue-system-frame-light.png`, approximate crop `x=250 y=160 w=380 h=300`.
  - Shows a Repeat Revenue medallion/step card.

- `crops/repeat-flow-row.png`
  - Source: `repeat-revenue/repeat-revenue-system-frame-light.png`, approximate crop `x=410 y=170 w=1100 h=760`.
  - Shows the Repeat Revenue loop/hub-and-spoke system. This is a loop reference, not a literal horizontal row.

- `crops/repeat-support-tile.png`
  - Source: `repeat-revenue/repeat-revenue-system-frame-light.png`, approximate crop `x=1080 y=630 w=420 h=320`.
  - Shows a support/feature medallion-like tile from the Repeat Revenue system.

- `crops/repeat-alert-panel.png`
  - Source: `cashflow-control/homepage-money-leak-map-dashboard-crop.png`, approximate crop `x=30 y=675 w=540 h=190`.
  - Proxy dashboard/status panel because a direct Repeat Revenue low-score alert panel reference was not present in the discovered cache. Use only for panel density/status-card treatment, not for Repeat Revenue content.

### Cashflow Control crop targets

- `crops/cashflow-dashboard-card.png`
  - Source: `cashflow-control/homepage-money-leak-map-dashboard-crop.png`, approximate crop `x=20 y=70 w=560 h=800`.
  - Shows Money Leak Map dashboard card with metric grid and recommendation panel.

- `crops/cashflow-alert-card.png`
  - Source: `cashflow-control/homepage-money-leak-map-dashboard-crop.png`, approximate crop `x=30 y=675 w=540 h=190`.
  - Shows the “Invoice-ready check” status/recommendation panel. Use as dashboard alert/status-card reference.

- `crops/cashflow-metric-strip.png`
  - Source: `cashflow-control/homepage-money-leak-map-dashboard-crop.png`, approximate crop `x=35 y=265 w=540 h=360`.
  - Shows the four-metric grid: delayed invoices, open estimates, office rework, inactive customers.

- `crops/cashflow-flow-row.png`
  - Source: `cashflow-control/cashflow-control-system-frame-light.png`, approximate crop `x=280 y=430 w=1350 h=360`.
  - Shows four circular nodes with green arrows: Work Done → Invoice Ready → Sent Fast → Cash Collected.

## Missing/direct-reference gaps

The brief asks for detailed references for these page sections:

- Repeat Revenue hero
- Referral opportunities / call catcher section
- Review Booster & Recovery Loop
- Past Customer Re-Engagement
- Support Layer Included
- Cashflow hero
- Customer intake / billing path
- Handoff / human exception
- Money leaks / digest section
- Invoice details / billing source scan

The cache and repo artifacts available during this task did not include separate direct screenshots for every one of those named sections. The discovered media included:

- Current homepage long screenshots.
- Repeat Revenue loop explainer videos/frames.
- Cashflow Control four-step explainer videos/frames.
- Existing visual-kit primitive screenshots and broad ServiceTitan reference assets.

Therefore, this atlas uses:

- Direct crops for the current homepage two-card section and Money Leak Map dashboard.
- Direct video-frame crops for Cashflow flow and Repeat Revenue loop/medallions.
- Written crop notes and proxy crops where direct page-section screenshots were not present.

Builders should treat the source brief’s visual contracts as the authority for missing page-section details, and this atlas as the concrete source-media inventory plus visual-style support.

## Global hard visual rules

- Reference screenshots/images/videos stay in docs/reference folders only.
- Do not import reference screenshots/images/videos into production components.
- Do not bake important text into images.
- Keep text as DOM.
- Use native React/Tailwind and approved Stanley primitives/foundry components.
- No orange/amber/yellow/gold/sepia styling.
- No dark mode for the final pages/sections.
- No generic SaaS dashboard/icon-stack look.
- No giant image wells.
- No people/robots/AI metaphors.
- Preserve package names: Cashflow Control System and Repeat Revenue System.
- Use discovered intended routes unless superseded: `/systems/cashflow-control` and `/systems/repeat-revenue` were identified by the parent repo audit as existing intended routes.
- Header currently has older pricing-anchor links; do not change nav/routes in this reference task.
