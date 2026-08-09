# Audit Guarantee + Direct Package Purchase Terms Draft

Date: 2026-05-05
Task: t_bb712219 — Launch blocker: Resolve Audit Guarantee Terms
Status: ready for Jaden/legal review before implementation

## Purpose

This draft reconciles the current Terms/FAQ language with the new direct checkout path for:

- Workflow Audit
- Cashflow Control System
- Repeat Revenue System
- Both Systems

It removes the old “audit-first only / no direct package purchase” contradiction, keeps the Workflow Audit guarantee narrow, and adds buyer-facing purchase-scope language for direct package checkout, onboarding, access review, fit review, refund/redirect/pause rights, and implementation limits.

This is business/legal copy for review, not a deployed change and not legal advice.

## Public naming constraints applied

Use:
- Workflow Audit
- Cashflow Control System
- Repeat Revenue System
- Both Systems

Avoid in public package copy:
- Customer Revenue System
- Follow-Up System
- Cash Collection System

## Recommended policy position

1. Workflow Audit guarantee remains specific to the Workflow Audit fee.
2. Direct package checkout is allowed, but purchase does not guarantee immediate implementation before onboarding/access/scope review.
3. After direct package purchase, Stanley Systems may:
   - proceed with onboarding and implementation,
   - redirect the buyer to a better package/path,
   - pause start until required access/details are provided,
   - decline and refund if the business is not a fit or the requested scope cannot be served safely.
4. Package payments cover the selected system plan and stated setup/onboarding scope only. They do not promise every possible integration, custom software build, revenue result, collection result, review/ranking result, or platform approval.
5. Subscription billing begins according to the selected Stripe checkout terms unless changed by written agreement or a refund/redirect decision.
6. Promotion code eligibility is controlled by the checkout/payment link and is not guaranteed outside active checkout terms.

## Exact Terms replacement/addition draft

Recommended file: `app/terms-and-conditions/page.tsx`

Replace the current sections from “No professional or guaranteed outcome” through “Service discussions and proposals” with the following sections, keeping the existing SMS, IP, third-party, liability, and governing-use sections unless counsel changes them.

### No professional or guaranteed outcome

Website content, examples, calculator estimates, service descriptions, and package descriptions do not create a guarantee of financial performance, revenue recovery, collected cash, review volume, search ranking, call volume, team adoption, software availability, or operational outcome, except for the express Workflow Audit guarantee described below. Workflow, invoicing, follow-up, review, referral, and call-handling improvements depend on the specific systems, data quality, team behavior, platform rules, access permissions, implementation conditions, and follow-through inside each client business.

### Workflow Audit guarantee terms

The Workflow Audit guarantee applies only to qualified businesses that buy the Workflow Audit and provide the access and cooperation needed for Stanley Systems to perform the audit. If Stanley Systems cannot find one clear money leak it can reasonably help fix for a qualified business, Stanley Systems will refund the Workflow Audit fee.

### Workflow Audit guarantee qualification

To qualify for the Workflow Audit guarantee, the business must be active and currently operating, have real job, customer, billing, estimate, review, call, or follow-up activity to inspect, use software or records Stanley Systems can reasonably review, identify a reachable decision maker or operations contact, and provide timely access to the systems and information needed for the audit. Stanley Systems may determine that a business does not qualify if there is not enough real workflow activity to inspect, required access is unavailable, the business is outside Stanley Systems’ normal service scope, or the requested outcome depends on factors Stanley Systems cannot reasonably evaluate or influence.

### Workflow Audit guarantee scope

The money-back portion of the guarantee applies to the Workflow Audit fee only. It does not include a free system build, implementation work, third-party software costs, subscription fees, advertising spend, phone/message costs, payment processing fees, or other outside charges. If the Workflow Audit fee is refunded because no clear fix is found, no audit credit or package credit is also owed.

### Direct package purchase and onboarding review

Cashflow Control System, Repeat Revenue System, and Both Systems may be offered through direct checkout when public payment links are available. A direct package purchase starts the onboarding and scope-confirmation process; it does not waive Stanley Systems’ right to review fit, access, requested scope, third-party tool constraints, data quality, and implementation requirements before work begins. The buyer agrees to provide accurate business information, a reachable implementation contact, and reasonable access to the tools, records, and workflows needed to evaluate and implement the selected package.

### Package scope and implementation limits

Package purchases cover the selected Stanley Systems package and the setup/onboarding scope described at checkout or in written follow-up. Unless separately agreed in writing, packages do not include unlimited custom software development, unsupported third-party platform workarounds, data cleanup beyond the agreed implementation scope, legal/compliance advice, ad management, guaranteed review/ranking outcomes, guaranteed revenue recovery, guaranteed collection results, or work requiring access the buyer cannot provide. Stanley Systems may recommend a narrower launch, a different package, a custom proposal, or no implementation if the selected package does not match the buyer’s business or systems.

### Refunds, redirects, and paused starts after package purchase

After a direct package purchase, Stanley Systems may refund, redirect, or pause the engagement if the buyer is not a fit, selected the wrong package, requests work outside package scope, cannot provide required access, does not provide required onboarding details, or depends on third-party tools or policies that make the requested implementation impractical. If Stanley Systems declines the engagement before implementation begins, the package payment will be refunded according to the payment processor’s timing and policies. If the buyer is redirected to another Stanley Systems package or custom scope, any price difference, credit, or refund must be confirmed in writing.

### Third-party tools, platform rules, and buyer responsibilities

Stanley Systems work may depend on third-party software, payment processors, phone providers, messaging tools, review platforms, CRM/job-management systems, email providers, or other platforms the buyer already uses or chooses to use. Those services are controlled by their own providers and terms. The buyer is responsible for maintaining their own accounts, permissions, accurate data, platform compliance, and third-party costs unless a separate written agreement says otherwise. Stanley Systems is not responsible for platform outages, denied approvals, account restrictions, third-party policy changes, missing permissions, or inaccurate data supplied by the buyer.

### Service discussions, proposals, and written scope

Submitting a form, scheduling a call, buying a Workflow Audit, buying a package, or exchanging messages with Stanley Systems does not create obligations beyond the specific purchased item and any written scope confirmed by Stanley Systems. Proposals, onboarding plans, implementation recommendations, and package redirects are informational until confirmed through checkout terms or a direct written agreement. Stanley Systems reserves the right to decline inquiries, refund purchases, redirect buyers, pause starts, or propose custom terms at its discretion.

## Exact Pricing FAQ replacement draft

Recommended file: `lib/pricing/offers.ts` (`pricingFAQItems`)

Use these FAQ items when pricing becomes direct-checkout capable.

### Is the Workflow Audit required before buying a package?

No. You can start with the Workflow Audit if you want Stanley Systems to diagnose the leak before you buy a system. If you already know which path you need, you can buy Cashflow Control System, Repeat Revenue System, or Both Systems directly when checkout is available. Direct purchase still includes onboarding and fit review before implementation starts.

### What does the Workflow Audit guarantee mean?

If your business qualifies and Stanley Systems cannot find one clear money leak it can reasonably help fix, you get the Workflow Audit fee back. The refund applies to the Workflow Audit fee only. It does not include a free system build or outside costs.

### Who qualifies for the Workflow Audit guarantee?

The guarantee is for active service businesses with enough real job, customer, billing, estimate, review, call, or follow-up activity to inspect. Stanley Systems also needs timely access to the relevant tools or records and a reachable decision maker or operations contact during the audit.

### Can I buy Cashflow Control System or Repeat Revenue System directly?

Yes, when public checkout is available. Direct checkout starts onboarding and scope confirmation. Stanley Systems still reviews fit, access, tool constraints, and requested scope before implementation begins. If the selected package is not the right fit, Stanley Systems may redirect you, propose a custom scope, pause the start, or refund before implementation begins.

### What happens after I buy a package?

You receive onboarding instructions so Stanley Systems can confirm your business details, access needs, current tools, and the first implementation path. Work starts after the required information and access are provided and Stanley Systems confirms the package fit.

### What if I buy the wrong package?

Stanley Systems may redirect you to the better package or a custom scope. Any price difference, credit, or refund will be confirmed in writing before the redirected work begins.

### What is included in the package price?

The package price covers the selected system plan and the setup/onboarding scope described at checkout or in written follow-up. It does not include unlimited custom development, unsupported platform workarounds, third-party software costs, ad spend, legal/compliance advice, or guaranteed revenue, collection, review, ranking, or call-volume results.

### Do promotion codes always apply?

Promotion code availability depends on the active checkout link and Stripe settings at the time of purchase. A promotion code is not guaranteed unless the checkout page accepts it for that purchase.

### Can Stanley Systems work inside my current tools?

Usually, yes. Stanley Systems aims to work inside the tools your business already uses when practical. Some tools, permissions, data quality issues, or platform rules may limit what can be implemented without a custom scope.

## Homepage FAQ alignment draft

Recommended file: `components/faq-section.tsx`

Only update if the homepage starts mentioning direct package purchase. If homepage stays audit-first, the current FAQ can remain mostly intact. Add one buyer-scope FAQ if package checkout CTAs appear on the homepage.

### What happens if we buy a system directly?

Direct checkout starts onboarding and scope confirmation. Stanley Systems reviews your business, tools, access, and requested package before implementation begins. If the package is not the right fit, we may redirect you, pause until required access is available, propose custom scope, or refund before implementation starts.

## Short scope note for package cards / checkout-adjacent pages

Recommended placement: pricing package cards, package landing pages, and checkout-adjacent CTAs.

Direct purchase starts onboarding and scope confirmation. Stanley Systems reviews fit, access, tool constraints, and implementation scope before work begins. If this package is not the right fit, we may redirect, pause, propose custom scope, or refund before implementation starts.

## Short guarantee note for Workflow Audit card

Recommended placement: Workflow Audit card and guarantee panel.

If Stanley Systems cannot find one clear money leak it can reasonably help fix for a qualified business, the Workflow Audit fee is refunded. Guarantee applies to the Workflow Audit fee only. See terms.

## Success page copy draft

Recommended route if implemented: `app/checkout/success/page.tsx`

### Headline

Payment received. Next, complete onboarding.

### Body

Stanley Systems has received your purchase. Your next step is to complete onboarding so we can confirm your business details, required access, current tools, and implementation fit before work begins.

### Scope note

Direct package purchase starts onboarding and scope confirmation. If the selected package is not the right fit, Stanley Systems may redirect you, pause until required access is available, propose custom scope, or refund before implementation begins.

### CTA

Complete onboarding

## Cancel page copy draft

Recommended route if implemented: `app/checkout/cancel/page.tsx`

### Headline

Checkout was not completed.

### Body

No payment was completed from this checkout session. You can return to pricing, start with the Workflow Audit, or contact Stanley Systems if you need help choosing the right path.

### CTAs

Return to pricing
Contact Stanley Systems

## Onboarding form intro draft

Recommended route if implemented: `app/checkout/onboarding/page.tsx` or `app/onboarding/page.tsx`

### Headline

Complete onboarding so we can confirm the right implementation path.

### Body

This form gives Stanley Systems the business details, tool access context, and operational contact needed to confirm fit and start the selected package. Do not include passwords or secret keys. We will follow up with the exact access steps if anything sensitive needs to be connected securely.

### Required field groups

- Buyer name and business name
- Email and phone
- Package purchased
- Best implementation contact
- Current job-management/CRM/billing tools
- Current review/referral/call tools, if relevant
- Main workflow problem to solve first
- Whether required access can be provided
- Notes or constraints

## Implementation checklist for Codex/frontend task

- Replace stale `Cash Flow Collection System` public copy with `Cashflow Control System` where pricing/package direct-purchase copy is touched.
- Do not use `Customer Revenue System`, `Follow-Up System`, or `Cash Collection System` as public package names.
- Remove old pricing FAQ answer that says packages cannot be bought directly in v1.
- Keep direct checkout package copy paired with onboarding/scope-confirmation caveat.
- Keep Workflow Audit guarantee limited to Workflow Audit fee unless Jaden/legal explicitly approves a broader guarantee.
- Do not expose or request Stripe secret keys.
- Do not deploy until Jaden/legal approves this legal copy and Stripe readiness task confirms external checkout text/prices are fixed.

## Narrow approval question for Jaden/legal

Approve this policy position before implementation: direct package checkout may be shown publicly, but every package purchase starts with onboarding/scope confirmation and Stanley Systems can redirect, pause, propose custom scope, or refund before implementation begins if fit/access/scope is not right. Workflow Audit guarantee remains a refund of the Workflow Audit fee only, with no free system build.
