# Systems Clean Icon Pass Manifest

Date: 2026-04-29
Task: Rebuild Cash Flow Collection System and Repeat Revenue System with cleaner top process/icon asset sets.

## Source files inspected

Source folder: `/home/jaden/.openclaw/workspace/customer-revenue-system-icons/`

- `payments-icon.jpg`
- `customer-confirmation-icon.jpg`
- `business-location-icon.jpg`
- `customer-growth-icon.jpg`
- `follow-up-scheduling-icon.jpg`
- `reviews-icon.jpg`
- `voice-messaging-icon.jpg`

## Normalized public exports

Saved to: `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/public/images/systems/icons/`

Existing source icons normalized to transparent PNG and WebP:

- `business-location.webp` and `business-location.png`
- `customer-confirmation.webp` and `customer-confirmation.png`
- `customer-growth.webp` and `customer-growth.png`
- `follow-up-scheduling.webp` and `follow-up-scheduling.png`
- `payments.webp` and `payments.png`
- `reviews.webp` and `reviews.png`
- `voice-messaging.webp` and `voice-messaging.png`

## Additional matching process SVGs generated

Cashflow top process icons:

- `completed-work.svg`
- `invoice-ready.svg`
- `invoice-sent.svg`
- `ar-follow-up.svg`
- `collected-cash.svg`

Customer Revenue top process icons:

- `return-customers.svg`
- `reviews-clean.svg`
- `referrals-clean.svg`
- `catch-calls.svg`

## Visual QA notes

The original JPG files were not production-ready as-is. Issues found:

- several had baked checkerboard or white backgrounds
- icons had inconsistent canvas sizes and padding
- style was mixed between semi-3D and flat vector
- some had tiny details that would not read well in a homepage process visual

Normalized exports are 512x512 and use transparent backgrounds. They remain available for future use. During QA, the normalized customer WebPs were still judged less cohesive in the top visual than the custom SVG set. The final top process visual therefore uses additional matching SVGs based on the same concepts, with consistent stroke, canvas, palette, and scale.

## Approved final top process asset systems

### Cash Flow Collection System

Used in the final section:

1. `/images/systems/icons/completed-work.svg`
2. `/images/systems/icons/invoice-ready.svg`
3. `/images/systems/icons/invoice-sent.svg`
4. `/images/systems/icons/ar-follow-up.svg`
5. `/images/systems/icons/collected-cash.svg`

Codex arranged these in a clean coded process row with restrained connectors. The old giant pipe, wedge arrow, money doodles, and decorative generated arrow were removed from the rendered section.

### Repeat Revenue System

Used in the final section:

1. `/images/systems/icons/return-customers.svg`
2. `/images/systems/icons/reviews-clean.svg`
3. `/images/systems/icons/referrals-clean.svg`
4. `/images/systems/icons/catch-calls.svg`

The normalized existing WebPs were inspected and preserved in the public asset folder, but not used in the final top process because the second-pass visual QA rejected them as less cohesive and too stock/AI-like at section scale.

## Assets stopped in section usage

Removed from the systems section render path:

- `/images/generated/fidelity-cashflow-payoff-arrow.webp`
- `/images/generated/fidelity-revenue-output-arrow.webp`
- `/images/generated/fidelity-revenue-flywheel-glow.webp`

## Redundancy removed

- Cashflow: removed the old separate middle support tile row from the previous version.
- Customer Revenue: removed the repeated lower outcome/card layer after QA flagged the section as explaining the same four ideas twice.
- CTA bug fixed: replaced `Find the Cash Stuck in Our Office` with `See where cash gets stuck`.

## Asset QA references

- Existing icon contact sheet: `/home/jaden/.openclaw/workspace/project/software-factory/artifacts/homepage_redesign/visual-qa/existing_customer_revenue_icons_contact_sheet.png`
- Normalized icon contact sheet: `/home/jaden/.openclaw/workspace/project/software-factory/artifacts/homepage_redesign/visual-qa/normalized_system_icons_contact_sheet.png`
