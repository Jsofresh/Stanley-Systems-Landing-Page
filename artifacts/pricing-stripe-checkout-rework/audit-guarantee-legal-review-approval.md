# Audit Guarantee + Direct Package Checkout Legal-Copy Gate Approval

Date: 2026-05-05
Task: t_8fd681f9
Project: Pricing + Stripe Checkout Rework
Status: approved for Codex implementation from the PM/legal-copy gate

## Decision

Approved for implementation as buyer-facing Terms, FAQ, checkout helper, onboarding, and package-page copy, subject to the constraints below.

Direct package checkout may be shown publicly if every direct package purchase is described as onboarding and implementation intake, not an unconditional promise that implementation begins immediately or that every requested scope will be accepted.

Stanley Systems may review fit, access, tool constraints, data quality, requested package scope, and implementation requirements before work proceeds. If the selected package or buyer context is not a fit before implementation begins, Stanley Systems may refund, redirect, pause, or propose custom scope.

The Workflow Audit guarantee remains limited to refunding the Workflow Audit fee only. It does not include a free system build, subscription fee, third-party cost, software cost, payment processing fee, advertising spend, phone/message cost, package credit, or any extra package work. If the Workflow Audit fee is refunded because no clear fix is found, no audit credit or package credit is also owed.

## Implementation constraints

Codex/frontend workers may use the copy positions in:

- `artifacts/pricing-stripe-checkout-rework/legal-faq-checkout-consistency-spec.md`
- `artifacts/pricing-stripe-checkout-rework/audit-guarantee-terms-faq-draft.md`

Treat `legal-faq-checkout-consistency-spec.md` as the newer and stronger source when the two drafts differ.

Required implementation rules:

1. Keep package-purchase CTAs and package cards paired with the onboarding/intake caveat.
2. Do not imply direct package purchase guarantees immediate start, guaranteed acceptance, unlimited work, or a guaranteed business result.
3. Keep direct package refund language limited to pre-implementation fit/access/scope problems unless Jaden separately approves broader refund terms.
4. Keep the Workflow Audit guarantee narrow: Workflow Audit fee refund only.
5. Keep audit credit language exact: applies once only if the Workflow Audit was bought first and the buyer buys a package within 24 hours after the audit call; monthly credit is $97; yearly credit is $194; yearly installation is waived; no credit if the audit is refunded.
6. Include buyer responsibility language for timely onboarding details, accurate business information, required access, third-party accounts, third-party costs, and platform constraints.
7. Keep the no-guaranteed-outcome language for revenue, profit, customers, collected cash, reviews, rankings, platform approvals, call volume, or unlimited custom work.
8. Do not request Stripe secret keys and do not deploy from this task.

## Caveat

This approval resolves the PM legal-copy launch blocker for implementation. It is not outside counsel legal advice. If Jaden wants attorney review later, that can happen separately, but this blocker should no longer stop Codex from implementing the drafted Terms/FAQ/checkout/package-page consistency copy.