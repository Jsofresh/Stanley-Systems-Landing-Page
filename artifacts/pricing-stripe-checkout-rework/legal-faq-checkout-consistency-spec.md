# Legal, FAQ, checkout, and package-page consistency spec

Task: t_a7b2ab15
Project: Pricing + Stripe Checkout Rework
Lifecycle status: draft_spec
Owner lane: copywriter
Status: approved for Codex implementation from PM legal-copy gate; see `audit-guarantee-legal-review-approval.md`

## Purpose

This spec is the consistency source for the pricing FAQ, Terms, checkout handoff copy, onboarding copy, and package-page legal clarity for the direct Stripe Payment Link rework.

It reconciles these buyer-facing facts:

- Workflow Audit is a paid $97 diagnostic.
- The audit credit is available only if the buyer bought the Workflow Audit first.
- The audit credit applies once.
- Monthly package audit credit is $97.
- Yearly package audit credit is $194.
- Audit credit is valid for 24 hours after the audit call.
- Yearly package installation is waived.
- Direct package purchase starts onboarding and implementation intake, not automatic work without review.
- Stanley Systems reviews access, fit, tool constraints, and scope before implementation proceeds.
- Stanley Systems may refund, redirect, or pause if fit, access, or scope does not work.
- Stanley Systems does not guarantee revenue, profit, customers, collected cash, reviews, search rankings, platform approvals, or unlimited custom work.

This is copy/legal draft material, not legal advice and not a deploy instruction.

## Public names to use

Use:

- Workflow Audit
- Cashflow Control System
- Repeat Revenue System
- Both Systems

Short checkout labels may use:

- Cashflow Control
- Repeat Revenue
- Both Systems

Do not use as public package names:

- Customer Revenue System
- Follow-Up System
- Cash Collection System
- Cash Flow Collection System

## Terms conflict status

Current `app/terms-and-conditions/page.tsx` conflicts with the direct checkout model because it is still audit-first/manual-funnel oriented and does not explain direct package purchase, onboarding/scope review, audit credit timing, package refund/redirect/pause rights, or yearly installation waiver.

Maintain a launch blocker for Jaden/legal final review before these Terms changes are deployed.

## Global required caveat

Use this near package purchase CTAs, package pages, pricing package sections, checkout success, and onboarding:

Direct purchase starts onboarding and implementation intake. Stanley Systems reviews fit, access, tool constraints, and package scope before implementation proceeds. If the purchase is not the right fit, Stanley Systems may redirect, pause, propose a custom scope, or refund before implementation begins.

Short version for tight cards:

Buying starts onboarding. Implementation proceeds after fit, access, and scope review. If this is not the right fit, Stanley Systems may refund, redirect, or pause before work begins.

## Audit credit copy

Use this wherever audit credit is explained:

If you buy the Workflow Audit first, the audit credit applies once when you buy a package within 24 hours after the audit call. Monthly packages receive a $97 audit credit. Yearly packages receive a $194 audit credit and the installation fee is waived.

Short version:

Bought the Workflow Audit first? Use the audit credit within 24 hours after the audit call: $97 off monthly, $194 off yearly. Credit applies once. Yearly installation is waived.

Non-stacking note:

If the Workflow Audit fee is refunded because no clear fix is found, no audit credit or package credit is also owed.

## Workflow Audit guarantee copy

Use this as the narrow guarantee statement:

If Stanley Systems cannot find one clear money leak it can reasonably help fix for a qualified business, the Workflow Audit fee is refunded. The guarantee applies to the Workflow Audit fee only. It does not include a free system build, subscription fee, third-party cost, software cost, payment processing fee, advertising spend, phone/message cost, or package credit.

## Terms replacement sections

Recommended file: `app/terms-and-conditions/page.tsx`

Replace the current sections from `No professional or guaranteed outcome` through `Service discussions and proposals` with these sections. Keep SMS, IP, third-party links, warranties, limitation, indemnification, changes, and governing-use sections unless counsel changes them.

### No professional or guaranteed outcome

Website content, examples, calculator estimates, service descriptions, package descriptions, and checkout pages do not create a guarantee of financial performance, revenue recovery, profit, collected cash, customer volume, review volume, search ranking, call volume, team adoption, platform approval, software availability, or operational outcome, except for the express Workflow Audit guarantee described below. Workflow, invoicing, follow-up, review, referral, call-handling, and cashflow improvements depend on the specific systems, data quality, team behavior, platform rules, access permissions, implementation conditions, and follow-through inside each client business.

### Workflow Audit purchase and guarantee terms

The Workflow Audit is paid diagnostic work. The Workflow Audit guarantee applies only to qualified businesses that buy the Workflow Audit and provide the access and cooperation needed for Stanley Systems to perform the audit. If Stanley Systems cannot find one clear money leak it can reasonably help fix for a qualified business, Stanley Systems will refund the Workflow Audit fee.

### Workflow Audit guarantee qualification

To qualify for the Workflow Audit guarantee, the business must be active and currently operating, have real job, customer, billing, estimate, review, call, or follow-up activity to inspect, use software or records Stanley Systems can reasonably review, identify a reachable decision maker or operations contact, and provide timely access to the systems and information needed for the audit. Stanley Systems may determine that a business does not qualify if there is not enough real workflow activity to inspect, required access is unavailable, the business is outside Stanley Systems' normal service scope, or the requested outcome depends on factors Stanley Systems cannot reasonably evaluate or influence.

### Workflow Audit guarantee scope

The money-back portion of the guarantee applies to the Workflow Audit fee only. It does not include a free system build, implementation work, third-party software costs, subscription fees, advertising spend, phone/message costs, payment processing fees, package credits, or other outside charges. If the Workflow Audit fee is refunded because no clear fix is found, no audit credit or package credit is also owed.

### Audit credit terms

If a buyer purchases the Workflow Audit first and later buys a package within 24 hours after the audit call, the audit credit may be applied once to the package purchase according to the active checkout terms. Monthly package purchases receive a $97 audit credit. Yearly package purchases receive a $194 audit credit and the installation fee is waived. Audit credit availability depends on the active checkout link, promotion code, or written Stanley Systems confirmation at the time of purchase. Audit credits are not cash-equivalent, do not stack with a Workflow Audit refund, and are not owed if the Workflow Audit fee is refunded.

### Direct package purchase and onboarding review

Cashflow Control System, Repeat Revenue System, and Both Systems may be offered through direct checkout when public payment links are available. A direct package purchase starts onboarding and implementation intake; it does not waive Stanley Systems' right to review fit, access, requested scope, third-party tool constraints, data quality, and implementation requirements before work proceeds. The buyer agrees to provide accurate business information, a reachable implementation contact, and reasonable access to the tools, records, and workflows needed to evaluate and implement the selected package.

### Package scope and implementation limits

Package purchases cover the selected Stanley Systems package and the setup/onboarding scope described at checkout or in written follow-up. Unless separately agreed in writing, packages do not include unlimited custom software development, unsupported third-party platform workarounds, data cleanup beyond the agreed implementation scope, legal/compliance advice, ad management, guaranteed review/ranking outcomes, guaranteed revenue, guaranteed profit, guaranteed customers, guaranteed collection results, or work requiring access the buyer cannot provide. Stanley Systems may recommend a narrower launch, a different package, a custom proposal, or no implementation if the selected package does not match the buyer's business or systems.

### Refunds, redirects, and paused starts after package purchase

After a direct package purchase, Stanley Systems may refund, redirect, or pause the engagement if the buyer is not a fit, selected the wrong package, requests work outside package scope, cannot provide required access, does not provide required onboarding details, or depends on third-party tools or policies that make the requested implementation impractical. If Stanley Systems declines the engagement before implementation begins, the package payment will be refunded according to the payment processor's timing and policies. If the buyer is redirected to another Stanley Systems package or custom scope, any price difference, credit, or refund must be confirmed in writing before redirected work begins.

### Third-party tools, platform rules, and buyer responsibilities

Stanley Systems work may depend on third-party software, payment processors, phone providers, messaging tools, review platforms, CRM/job-management systems, email providers, or other platforms the buyer already uses or chooses to use. Those services are controlled by their own providers and terms. The buyer is responsible for maintaining their own accounts, permissions, accurate data, platform compliance, and third-party costs unless a separate written agreement says otherwise. Stanley Systems is not responsible for platform outages, denied approvals, account restrictions, third-party policy changes, missing permissions, or inaccurate data supplied by the buyer.

### Service discussions, proposals, checkout, and written scope

Submitting a form, scheduling a call, buying a Workflow Audit, buying a package, or exchanging messages with Stanley Systems does not create obligations beyond the specific purchased item and any written scope confirmed by Stanley Systems. Proposals, onboarding plans, implementation recommendations, package redirects, and checkout descriptions are informational until confirmed through checkout terms or a direct written agreement. Stanley Systems reserves the right to decline inquiries, refund purchases, redirect buyers, pause starts, or propose custom terms at its discretion.

## Pricing FAQ replacement copy

Recommended file: `lib/pricing/offers.ts` (`pricingFAQItems`) or the pricing source-of-truth consumer that replaces it.

### Is the Workflow Audit required before buying a package?

No. The Workflow Audit is the paid diagnostic path when you want Stanley Systems to find the leak before you choose a system. If you already know which path you need, you can buy Cashflow Control System, Repeat Revenue System, or Both Systems directly when checkout is available. Direct purchase still starts onboarding, access review, fit review, and scope confirmation before implementation proceeds.

### How does the Workflow Audit credit work?

If you buy the Workflow Audit first, the audit credit applies once when you buy a package within 24 hours after the audit call. Monthly packages receive a $97 audit credit. Yearly packages receive a $194 audit credit and the installation fee is waived. If the audit is refunded because no clear fix is found, no audit credit or package credit is also owed.

### What does the Workflow Audit guarantee mean?

If your business qualifies and Stanley Systems cannot find one clear money leak it can reasonably help fix, you get the Workflow Audit fee back. The refund applies to the Workflow Audit fee only. It does not include a free system build, subscription fee, third-party cost, or package credit.

### Who qualifies for the Workflow Audit guarantee?

The guarantee is for active service businesses with enough real job, customer, billing, estimate, review, call, or follow-up activity to inspect. Stanley Systems also needs timely access to the relevant tools or records and a reachable decision maker or operations contact during the audit.

### Can I buy Cashflow Control System or Repeat Revenue System directly?

Yes, when public checkout is available. Direct checkout starts onboarding and implementation intake. Stanley Systems still reviews fit, access, tool constraints, and requested scope before implementation proceeds. If the selected package is not the right fit, Stanley Systems may redirect you, propose a custom scope, pause the start, or refund before implementation begins.

### What happens after I buy a package?

You receive onboarding instructions so Stanley Systems can confirm your business details, required access, current tools, and implementation fit. Implementation proceeds after the required information and access are provided and Stanley Systems confirms the package fit and first scope.

### What if I buy the wrong package?

Stanley Systems may redirect you to the better package or a custom scope. Any price difference, credit, or refund will be confirmed in writing before redirected work begins.

### What is included in the package price?

The package price covers the selected system plan and the setup/onboarding scope described at checkout or in written follow-up. It does not include unlimited custom development, unsupported platform workarounds, third-party software costs, ad spend, legal/compliance advice, or guaranteed revenue, profit, customers, collection, review, ranking, or call-volume results.

### Do promotion codes or audit credits always apply?

Promotion code and audit credit availability depends on the active checkout link and Stripe settings at the time of purchase. Audit credit is available once only if you bought the Workflow Audit first and buy a package within 24 hours after the audit call.

### Can Stanley Systems work inside my current tools?

Usually, yes. Stanley Systems aims to work inside the tools your business already uses when practical. Some tools, permissions, data quality issues, or platform rules may limit what can be implemented without a custom scope.

## Checkout copy

### Payment Link helper/caveat

Place near direct package checkout buttons or package selectors:

Checkout starts onboarding and implementation intake. Stanley Systems reviews fit, access, tool constraints, and package scope before implementation proceeds. If this is not the right fit, Stanley Systems may refund, redirect, or pause before work begins.

### Audit credit helper

Bought the Workflow Audit first? Use your audit credit within 24 hours after the audit call. Monthly packages receive $97 off. Yearly packages receive $194 off and installation is waived. Credit applies once.

### Success page

Recommended route: `app/checkout/success/page.tsx`

Headline:

Payment received. Next, complete onboarding.

Body:

Stanley Systems has received your purchase. Your next step is to complete onboarding so we can confirm your business details, required access, current tools, package fit, and implementation scope before work proceeds.

Scope note:

Direct package purchase starts onboarding and implementation intake. If the selected package is not the right fit, Stanley Systems may redirect you, pause until required access is available, propose custom scope, or refund before implementation begins.

CTA:

Complete onboarding

### Cancel page

Recommended route: `app/checkout/cancel/page.tsx`

Headline:

Checkout was not completed.

Body:

No payment was completed from this checkout session. You can return to pricing, buy the Workflow Audit, or contact Stanley Systems if you need help choosing the right path.

CTAs:

Return to pricing
Contact Stanley Systems

### Onboarding form intro

Recommended route: `app/checkout/onboarding/page.tsx` or `app/onboarding/page.tsx`

Headline:

Complete onboarding so we can confirm the right implementation path.

Body:

This form gives Stanley Systems the business details, tool context, and operational contact needed to confirm fit, access, and implementation scope for the selected package. Do not include passwords, secret keys, or private tokens. Stanley Systems will follow up with the exact access steps if anything sensitive needs to be connected securely.

Required field groups:

- Buyer name and business name
- Email and phone
- Package purchased
- Whether the buyer bought the Workflow Audit first
- Workflow Audit call date, if applicable
- Best implementation contact
- Current job-management, CRM, billing, and payment tools
- Current review, referral, and call tools, if relevant
- Main workflow problem to solve first
- Whether required access can be provided
- Notes or constraints

## Package-page legal clarity

Use on `/systems/cashflow-control`, `/systems/repeat-revenue`, and `/systems/both-systems` if those routes are created.

### Package scope note

Buying this package starts onboarding and implementation intake. Stanley Systems confirms fit, access, tool constraints, and first implementation scope before work proceeds. If the selected package is not the right fit, Stanley Systems may redirect, pause until required access is available, propose custom scope, or refund before implementation begins.

### Cashflow Control System scope line

Cashflow Control System helps finished work move toward billing, follow-up, and collected cash with fewer manual checks. It does not guarantee collected revenue, profit, customer payment behavior, third-party processor behavior, or unlimited custom billing work.

### Repeat Revenue System scope line

Repeat Revenue System helps past customers, reviews, referrals, and missed calls stay visible so the next step is easier to follow. It does not guarantee new customers, review volume, review ratings, search rankings, platform approvals, or unlimited custom outreach work.

### Both Systems scope line

Both Systems combines Cashflow Control System and Repeat Revenue System into one implementation path. It does not guarantee revenue, profit, customers, collected cash, reviews, rankings, platform approvals, or unlimited custom work.

## Implementation checklist for Codex/frontend workers

- Do not deploy until Jaden/legal approves the Terms and guarantee language.
- Do not request or expose Stripe secret keys.
- Use only public Payment Link URLs from the approved source of truth.
- Replace direct package purchase copy that sends ready buyers only to generic contact.
- Keep question/unusual-fit contact paths available as a secondary option.
- Add package purchase caveat near package cards, package routes, checkout success, onboarding, pricing FAQ, and Terms.
- Keep Workflow Audit guarantee limited to the Workflow Audit fee.
- Explain audit credit exactly once: $97 monthly, $194 yearly, valid 24 hours after the audit call, applies once, no credit if the audit is refunded.
- Explain yearly installation waived for yearly package purchases.
- Avoid banned public names: Customer Revenue System, Follow-Up System, Cash Collection System, Cash Flow Collection System.
- Avoid overclaims: guaranteed revenue, profit, customers, reviews, rankings, collected cash, platform approvals, or unlimited custom work.

## Narrow Jaden/legal review question

Approve this before implementation: Direct package checkout may be shown publicly if every direct purchase is described as onboarding and implementation intake, Stanley Systems may review fit/access/scope before work proceeds, and Stanley Systems may refund, redirect, pause, or propose custom scope before implementation begins. Workflow Audit guarantee remains limited to refunding the Workflow Audit fee only, with no free system build or extra package credit.
