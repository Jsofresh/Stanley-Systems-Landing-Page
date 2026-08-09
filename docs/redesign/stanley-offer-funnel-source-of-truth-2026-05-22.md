# Stanley Systems Offer/Funnel Source of Truth — 2026-05-22

This document is the approved offer and funnel source of truth for the next Stanley Systems website cleanup. It exists to prevent the site from having multiple conflicting interpretations of the offer.

## Non-negotiable offer ladder

1. **Free Money Leak Calculator**
   - Free first step.
   - Purpose: show the rough signal and make the lost-money problem visible.
   - Primary CTA language: `Start the free calculator`, `Run the free calculator`, or equivalent.

2. **$97 Office Process Assessment**
   - Paid diagnostic first step.
   - Purpose: identify where money is being missed, what it likely costs, the full fix list for every money leak found, and which fix should happen first.
   - The $97 Office Process Assessment becomes a **$194 credit** toward the Systems Installation Sprint.
   - CTA buttons should generally say `Get the Office Process Assessment` or equivalent. Avoid `$97` in button text unless specifically approved for a price card/context.

3. **$1,500 Systems Installation Sprint**
   - Approved positioning: **“Install the systems your business needs most.”**
   - The Sprint must not sound like it fixes only one thing.
   - The Sprint must not sound limited to only the system page the customer is viewing.
   - The Sprint can include specific needed fixes even if the exact fix is not publicly listed, when the fix fits the assessment/sprint scope.
   - Do **not** use the internal technician work-card/time-clock example in public copy.

4. **Monthly Control Plan**
   - Optional only after the Systems Installation Sprint.
   - Not a standalone retainer.
   - Purpose: after-Sprint control for systems Stanley Systems already built: checked, adjusted, and kept working.
   - Price range: **$147–$347/month**, based on how many automations/systems and automations Stanley Systems installed.
   - If the client declines Monthly Control, Stanley Systems hands over controls for what was built and the client owns upkeep/updates.

## Office Process Assessment rules

Approved homepage assessment subheading:

> Stanley Systems shows where money is being missed, what it likely costs, how to fix every problem found, and which fix should happen first.

Rules:
- Do not add extra homepage bullets under this subheading.
- The Assessment must promise a complete fix list, not just a recommendation.
- Avoid weird/over-explained DIY-vs-Stanley language.

Remove/avoid these lines:
- “Decide whether to build it yourself or have Stanley Systems install it.”
- “If you want to build it yourself, you can. If you want it built faster, the assessment becomes the blueprint for the Systems Installation Sprint.”
- “You can take the list and fix it internally. Most owners see the list and realize they would rather have Stanley Systems build it.”

## Homepage rules

Do not change the homepage hero direction.

Approved homepage hero:

- Headline: **“Find the money your service business is missing.”**
- Subcopy: **“Run the free calculator. See what calls, invoices, follow-ups, reviews, referrals, and past customers cost your business.”**

Approved calculator section headline:

> Use the free calculator to see what your business is losing.

Rules:
- The leaks section is approved as-is. Do not rework it unless source/live reconciliation shows a factual routing/pricing issue.
- Do not rewrite the calculator recommended intro unless it conflicts with this source of truth.
- Calculator results bridge should use:

> The calculator gives you the rough signal. The Office Process Assessment shows the actual problems, the full fix list, and what should be built first.

## Cashflow Control and Repeat Revenue rules

Core public idea to convey heavily on both system pages:

> Customers can choose individual automations from Cashflow Control or Repeat Revenue. The systems work best together, especially Repeat Revenue. Stanley Systems can build the specific fixes the business needs.

Implementation implications:
- Cashflow Control and Repeat Revenue should stay distinct systems/categories.
- Customers should not think they are forced into a rigid package if they only need specific automations.
- Customers should not think each page is an isolated offer that limits what the Sprint can cover.
- Old direct pricing cards on these pages should become CTA sections, not package checkout grids.
- The Systems Installation Sprint CTA/section on both pages must make clear the Sprint can cover fixes from either system and specific needed fixes found in the assessment.

## Assessment education page

The navbar item currently titled **How the Assessment Works** should route to a dedicated detailed Office Process Assessment education page.

Purpose:
- For skeptical buyers who want more information before starting.
- Explain how the Office Process Assessment works, what gets checked, what the buyer receives, how the fix list works, and how it connects to the Systems Installation Sprint.

Rules:
- Main conversion CTAs should not be confused with this education page unless intentionally routed there.
- Main CTAs should generally push buyers to start the Office Process Assessment, not merely read more.

## Pricing rules

- Pricing page should focus on pricing/buying.
- Pricing page should not feature the Free Money Leak Calculator as a major section. A small mention is fine if useful.
- Pricing hero must stop saying “fix the first one.”
- Pricing hero/subcopy should remove big free-calculator emphasis and avoid listing prices before cards if that creates clutter.
- Monthly Control should be one card/section, not old multi-card pricing behavior.
- Monthly Control must be shown as post-Sprint only, not standalone.
- Monthly Control price range: $147–$347/month based on systems/automations built and monitored.
- Jaden will create new Stripe payment links. Until those exist, do not invent new payment URLs.
- Remove old public direct package checkout rendering for Cashflow Control, Repeat Revenue, and Both Systems unless Jaden re-approves it.
- Keep old payment/link records dormant or placeholder-safe internally if needed to avoid breaking code during implementation.
- Do not present old Cashflow/Repeat/Both monthly/yearly package grids as the main offer path unless Jaden explicitly re-approves direct package checkout.

## Both Systems page rule

Keep `/systems/both-systems` as a supporting “work best together” bridge page, not a direct-buy package pricing page.

Purpose:
- Explain how Cashflow Control and Repeat Revenue work together.
- Reinforce that customers can choose individual automations, but the best outcome often comes from using the systems together.
- Route buyers toward the Office Process Assessment and Systems Installation Sprint.
- Link to the individual Cashflow Control and Repeat Revenue pages.

Do not:
- Keep direct `Buy Both Monthly` / `Buy Both Yearly` checkout behavior.
- Keep old package pricing cards on this page.

## Contact language

Approved contact section language:

> Get the Office Process Assessment. Stanley Systems finds the leaks, gives you the fix list, and can build the systems your business needs next.

## Internal route caution

Do not blindly rename internal routes like `/workflow-audit` unless the implementation plan proves it is safe. Public copy should say **Office Process Assessment**; internal route IDs may remain for checkout/analytics safety.
