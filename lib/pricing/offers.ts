import {
  pricingPackageById,
  pricingPackages,
  type PricingBillingPeriod,
  type PricingPackage,
  type PricingPackageId,
} from "@/lib/pricing/source-of-truth"

export type OfferId = PricingPackageId

export type CTAAction = "checkout" | "contact" | "calculator" | "anchor" | "systems"

export type PricingPlanKind = "front_door_audit" | "direct_purchase_system"

export type PricingPlan = {
  id: OfferId
  kind: PricingPlanKind
  title: string
  shortTitle?: string
  promise: string
  description: string
  priceDisplay: string | null
  priceRows: { label: string; value: string }[]
  priceApproved: boolean
  priceNote: string
  checklist: string[]
  goodFit?: string[]
  helperLine: string
  scopeNote: string | null
  cta: {
    label: string
    action: CTAAction
    href: string | null
    disabledReason?: string
  }
  secondaryCta?: {
    label: string
    action: CTAAction
    href: string
  }
  contactPathOnly: boolean
  directPurchaseReady: boolean
  billingPeriod: PricingBillingPeriod
  packageName: string
  analyticsPackageId: string
  recommended?: boolean
  accent?: "green" | "navy" | "neutral"
}

export type WorkflowAuditOffer = PricingPlan & {
  id: "workflow_audit"
  kind: "front_door_audit"
  contactPathOnly: false
  cta: PricingPlan["cta"] & { href: string }
  guarantee: OfferGuarantee
}

export type OfferGuarantee = {
  headline: string
  qualificationCopy: string
  scopeCopy: string
}

export type AuditCreditTerm = {
  status: "not_approved" | "approved"
  copy: string | null
  nonStackingCopy: string
}

export type PricingFAQItem = {
  question: string
  answer: string
}

export type PricingCalculatorContext = {
  source: "calculator" | "homepage" | "unknown"
  recommendedSystem: "cash_collection_system" | "follow_up_system" | "both" | "none" | "unknown"
  recommendedPlan: "workflow_audit_only" | "cash_collection_path" | "follow_up_path" | "both_paths" | "none" | "unknown"
  calculatorKind: "customer_revenue" | "invoicing_delay" | "not_provided"
  annualLeakEstimate: string | null
  monthlyLeakEstimate: string | null
}

const directPurchasePromises: Record<PricingPackageId, string> = {
  workflow_audit: "Find the money leak before buying the system.",
  cashflow_control_monthly: "Turn finished work into collected cash faster.",
  repeat_revenue_monthly: "Get more money from the customers you already earned.",
  both_systems_monthly: "Fix the billing stall and the repeat-revenue gap together.",
  cashflow_control_yearly: "Run the Cashflow Control System for the year with installation waived.",
  repeat_revenue_yearly: "Run the Repeat Revenue System for the year with installation waived.",
  both_systems_yearly: "Run both systems for the year with installation waived.",
}

const directPurchaseDescriptions: Record<PricingPackageId, string> = {
  workflow_audit:
    "Stanley Systems reviews the office path where money usually gets stuck and gives you a plain-English money leak map.",
  cashflow_control_monthly:
    "A monthly implementation path for billing checks, invoice follow-up, and office handoffs inside the tools your team already uses.",
  repeat_revenue_monthly:
    "A monthly implementation path for bringing past customers, reviews, referrals, and missed calls back into view without promising rankings or guaranteed reviews.",
  both_systems_monthly:
    "A combined monthly implementation path for Cashflow Control and Repeat Revenue. Checkout is paused until the Stripe install amount matches the approved price.",
  cashflow_control_yearly:
    "A yearly Cashflow Control implementation path with installation waived and the yearly audit credit available if you bought the audit first.",
  repeat_revenue_yearly:
    "A yearly Repeat Revenue implementation path with installation waived and the yearly audit credit available if you bought the audit first.",
  both_systems_yearly:
    "A yearly combined implementation path for Cashflow Control and Repeat Revenue with installation waived.",
}

const directPurchaseChecklists: Record<PricingPackageId, string[]> = {
  workflow_audit: [
    "Finished work to collected cash.",
    "Past customers, reviews, referrals, and missed calls.",
    "Office handoffs where work gets stuck.",
    "Where Stanley Systems can or cannot fix the leak.",
  ],
  cashflow_control_monthly: [
    "Finished work to invoice-ready handoff.",
    "Invoice follow-up and open-balance visibility.",
    "Office checks around job and billing details.",
  ],
  repeat_revenue_monthly: [
    "Past-customer follow-up.",
    "Review and referral request rhythm.",
    "Missed-call and repeat-work opportunities.",
  ],
  both_systems_monthly: [
    "Cashflow Control System plus Repeat Revenue System.",
    "One onboarding path for both workstreams.",
    "Best fit when billing and repeat work both leak money.",
  ],
  cashflow_control_yearly: [
    "Same Cashflow Control System implementation.",
    "Yearly payment with installation waived.",
    "Lower first-year cost than monthly.",
  ],
  repeat_revenue_yearly: [
    "Same Repeat Revenue System implementation.",
    "Yearly payment with installation waived.",
    "Lower first-year cost than monthly.",
  ],
  both_systems_yearly: [
    "Both systems for the year.",
    "Installation waived.",
    "Best first-year price for buying both systems together.",
  ],
}

function priceRowsFor(pricingPackage: PricingPackage) {
  if (pricingPackage.id === "workflow_audit") {
    return [
      { label: "Paid diagnostic", value: pricingPackage.priceDisplay },
      { label: "If you bought the Workflow Audit first", value: "$97 monthly credit or $194 yearly credit after the audit call" },
    ]
  }

  return [
    { label: "Plan", value: pricingPackage.priceDisplay },
    {
      label: pricingPackage.waivedSetup ? "Installation" : "Setup",
      value: pricingPackage.waivedSetupDisplay || pricingPackage.setupFeeDisplay,
    },
    { label: pricingPackage.auditCreditLabel, value: pricingPackage.auditCreditDisplay },
    { label: "First year after audit credit", value: pricingPackage.firstYearCostAfterAuditCreditDisplay },
    ...(pricingPackage.savings ? [{ label: "Savings", value: pricingPackage.savings.display }] : []),
  ]
}

function priceNoteFor(pricingPackage: PricingPackage) {
  if (pricingPackage.id === "workflow_audit") {
    return `${pricingPackage.priceDisplay} paid diagnostic. If you buy a package within 24 hours after the audit call, use the audit credit at checkout.`
  }

  const setupCopy = pricingPackage.waivedSetup
    ? pricingPackage.waivedSetupDisplay
    : pricingPackage.setupFeeDisplay
  const creditCopy = `${pricingPackage.auditCreditDisplay} audit credit ${pricingPackage.billingPeriod === "yearly" ? "if you bought the Workflow Audit first" : "if you bought the Workflow Audit first"}`
  const savingsCopy = pricingPackage.savings ? ` ${pricingPackage.savings.display}.` : ""

  return `${pricingPackage.priceDisplay} + ${setupCopy}. ${creditCopy}. First year after audit credit: ${pricingPackage.firstYearCostAfterAuditCreditDisplay}.${savingsCopy}`
}

function checkoutHrefFor(pricingPackage: PricingPackage) {
  if (pricingPackage.id === "both_systems_monthly") return null
  return pricingPackage.stripePaymentLink.url || null
}

function disabledReasonFor(pricingPackage: PricingPackage) {
  if (pricingPackage.id === "both_systems_monthly") {
    return "Monthly checkout is temporarily unavailable. Choose yearly checkout or compare the systems before buying."
  }
  if (!pricingPackage.stripePaymentLink.url) return "Checkout paused: Payment Link is missing."
  return undefined
}

function primaryCtaLabelFor(pricingPackage: PricingPackage) {
  if (pricingPackage.publicName === "Cashflow Control System") return "Buy Cashflow Control"
  if (pricingPackage.publicName === "Repeat Revenue System") return "Buy Repeat Revenue"
  if (pricingPackage.publicName === "Both Systems") return "Buy Both Systems"
  return pricingPackage.cta
}

function secondaryCtaFor(pricingPackage: PricingPackage): PricingPlan["secondaryCta"] {
  if (pricingPackage.publicName === "Cashflow Control System") {
    return { label: "Learn More", action: "systems", href: "/systems/cashflow-control" }
  }

  if (pricingPackage.publicName === "Repeat Revenue System") {
    return { label: "Learn More", action: "systems", href: "/systems/repeat-revenue" }
  }

  if (pricingPackage.publicName === "Both Systems") {
    return { label: "Compare Both Systems", action: "anchor", href: "/pricing#compare-systems" }
  }

  return undefined
}

function planFromPackage(pricingPackage: PricingPackage): PricingPlan {
  const href = checkoutHrefFor(pricingPackage)
  const isAudit = pricingPackage.id === "workflow_audit"

  return {
    id: pricingPackage.id,
    kind: isAudit ? "front_door_audit" : "direct_purchase_system",
    title: pricingPackage.publicName,
    shortTitle: pricingPackage.shortCheckoutName,
    promise: directPurchasePromises[pricingPackage.id],
    description: directPurchaseDescriptions[pricingPackage.id],
    priceDisplay: pricingPackage.priceDisplay,
    priceRows: priceRowsFor(pricingPackage),
    priceApproved: href !== null,
    priceNote: priceNoteFor(pricingPackage),
    checklist: directPurchaseChecklists[pricingPackage.id],
    helperLine: isAudit
      ? "You leave with a clear money leak map and a recommendation: Cashflow Control System, Repeat Revenue System, both, or neither."
      : "After checkout, onboarding and fit/access/scope review happen before implementation begins.",
    scopeNote: isAudit
      ? "If no clear fix is found for a qualified business, the Workflow Audit fee is refunded."
      : "Buying starts onboarding. Implementation proceeds after fit, access, and scope review. If this is not the right fit, Stanley Systems may refund, redirect, or pause before work begins.",
    cta: {
      label: href ? primaryCtaLabelFor(pricingPackage) : "Checkout paused",
      action: href ? "checkout" : "contact",
      href,
      disabledReason: disabledReasonFor(pricingPackage),
    },
    secondaryCta: secondaryCtaFor(pricingPackage),
    contactPathOnly: false,
    directPurchaseReady: href !== null,
    billingPeriod: pricingPackage.billingPeriod,
    packageName: pricingPackage.publicName,
    analyticsPackageId: pricingPackage.analyticsPackageId,
    recommended: isAudit || pricingPackage.id === "both_systems_yearly",
    accent: isAudit ? "green" : pricingPackage.publicName === "Both Systems" ? "green" : "navy",
  }
}

export const workflowAuditOffer: WorkflowAuditOffer = {
  ...planFromPackage(pricingPackageById.workflow_audit),
  id: "workflow_audit",
  kind: "front_door_audit",
  contactPathOnly: false,
  cta: {
    label: pricingPackageById.workflow_audit.cta,
    action: "checkout",
    href: pricingPackageById.workflow_audit.stripePaymentLink.url,
  },
  guarantee: {
    headline: "If Stanley Systems cannot find one clear money leak we can fix, you get your Workflow Audit fee back.",
    qualificationCopy:
      "The guarantee applies to qualified service businesses with enough job, invoice, customer, call, estimate, or review volume for leaks to matter. Stanley Systems needs access to the relevant systems and a reachable decision maker or operations contact during the audit.",
    scopeCopy: "The refund applies to the Workflow Audit fee only. It does not include a system build.",
  },
}

export const postAuditPlans: PricingPlan[] = pricingPackages
  .filter((pricingPackage) => pricingPackage.id !== "workflow_audit")
  .map(planFromPackage)

export const auditCreditTerm: AuditCreditTerm = {
  status: "approved",
  copy:
    "Bought the Workflow Audit first? Use your audit credit code at checkout. Monthly packages can receive a $97 audit credit; yearly packages can receive a $194 audit credit. The credit is valid once for 24 hours after the audit call.",
  nonStackingCopy: "If the audit is refunded because no clear fix is found, there is no build credit.",
}

export const pricingFAQItems: PricingFAQItem[] = [
  {
    question: "Is the Workflow Audit required before buying a package?",
    answer:
      "No. The Workflow Audit is the paid diagnostic path when you want Stanley Systems to find the leak before you choose a system. If you already know which path you need, you can buy Cashflow Control System, Repeat Revenue System, or Both Systems directly when checkout is available. Direct purchase still starts onboarding, access review, fit review, and scope confirmation before implementation proceeds.",
  },
  {
    question: "How does the Workflow Audit credit work?",
    answer:
      "If you buy the Workflow Audit first, the audit credit applies once when you buy a package within 24 hours after the audit call. Monthly packages receive a $97 audit credit. Yearly packages receive a $194 audit credit and the installation fee is waived. If the audit is refunded because no clear fix is found, no audit credit or package credit is also owed.",
  },
  {
    question: "What does the Workflow Audit guarantee mean?",
    answer:
      "If your business qualifies and Stanley Systems cannot find one clear money leak it can reasonably help fix, you get the Workflow Audit fee back. The refund applies to the Workflow Audit fee only. It does not include a free system build, subscription fee, third-party cost, or package credit.",
  },
  {
    question: "Who qualifies for the Workflow Audit guarantee?",
    answer:
      "The guarantee is for active service businesses with enough real job, customer, billing, estimate, review, call, or follow-up activity to inspect. Stanley Systems also needs timely access to the relevant tools or records and a reachable decision maker or operations contact during the audit.",
  },
  {
    question: "Can I buy Cashflow Control System or Repeat Revenue System directly?",
    answer:
      "Yes, when public checkout is available. Direct checkout starts onboarding and implementation intake. Stanley Systems still reviews fit, access, tool constraints, data quality, and requested scope before implementation proceeds. If the selected package is not the right fit, Stanley Systems may redirect you, propose a custom scope, pause the start, or refund before implementation begins.",
  },
  {
    question: "What happens after I buy a package?",
    answer:
      "You receive onboarding instructions so Stanley Systems can confirm your business details, required access, current tools, data quality, implementation fit, and first scope. Implementation proceeds after the required information and access are provided and Stanley Systems confirms the package fit and first scope.",
  },
  {
    question: "What if I buy the wrong package?",
    answer:
      "Stanley Systems may redirect you to the better package or a custom scope. Any price difference, credit, or refund will be confirmed in writing before redirected work begins.",
  },
  {
    question: "What is included in the package price?",
    answer:
      "The package price covers the selected system plan and the setup/onboarding scope described at checkout or in written follow-up. It does not include unlimited custom development, unsupported platform workarounds, third-party software costs, ad spend, legal/compliance advice, or guaranteed revenue, profit, customers, collection, review, ranking, or call-volume results.",
  },
  {
    question: "Do promotion codes or audit credits always apply?",
    answer:
      "Promotion code and audit credit availability depends on the active checkout link and Stripe settings at the time of purchase. Audit credit is available once only if you bought the Workflow Audit first and buy a package within 24 hours after the audit call.",
  },
  {
    question: "Can Stanley Systems work inside my current tools?",
    answer:
      "Usually, yes. Stanley Systems aims to work inside the tools your business already uses when practical. Some tools, permissions, data quality issues, or platform rules may limit what can be implemented without a custom scope.",
  },
]
