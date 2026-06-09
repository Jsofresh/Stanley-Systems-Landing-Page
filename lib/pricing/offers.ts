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

export type PackageDemo = {
  bestFor: string
  leak: string
  before: string[]
  after: string[]
}

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
  demo?: PackageDemo
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
  workflow_audit: "Map the office work your business should not have to pay for anymore.",
  cashflow_control_monthly: "Stop finished work from sitting unpaid.",
  repeat_revenue_monthly: "Bring past customers back before they buy from someone else.",
  both_systems_monthly: "Stop the leak before the job and after the job.",
  cashflow_control_yearly: "Stop the billing leak for the year and remove the installation charge.",
  repeat_revenue_yearly: "Bring past customers back for the year and remove the installation charge.",
  both_systems_yearly: "Fix both leaks with the best first-year price.",
}

const directPurchaseDescriptions: Record<PricingPackageId, string> = {
  workflow_audit:
    "Stanley Systems checks where calls, invoices, follow-ups, and past customers are slipping through, then tells you which system should be built first.",
  cashflow_control_monthly:
    "For jobs that are done before the office gets the bill out, follows up, and collects.",
  repeat_revenue_monthly:
    "For past customers who bought once, stopped hearing from you, and now book with whoever follows up first.",
  both_systems_monthly:
    "For owners leaking money before the job is booked and after the customer leaves.",
  cashflow_control_yearly:
    "Same billing-leak fix, lower first-year cost, installation waived.",
  repeat_revenue_yearly:
    "Same past-customer follow-up system, lower first-year cost, installation waived.",
  both_systems_yearly:
    "The combined before-and-after-job fix with installation waived.",
}

const directPurchaseChecklists: Record<PricingPackageId, string[]> = {
  workflow_audit: [
    "Finished work to collected cash.",
    "Past customers, reviews, referrals, and missed calls.",
    "Office handoffs where work gets stuck.",
    "Where Stanley Systems can or cannot fix the leak.",
  ],
  cashflow_control_monthly: [
    "Customer recorded, job moves, invoice goes out.",
    "Payment gets followed up with.",
    "Missing job details get routed before the bill stalls.",
  ],
  repeat_revenue_monthly: [
    "Customer recorded after the first job.",
    "Follow-up, review, and referral asks go out.",
    "Repeat work gets booked before a competitor gets it.",
  ],
  both_systems_monthly: [
    "Calls, jobs, billing, and past-customer follow-up in one rollout.",
    "One onboarding path for both leaks.",
    "Best fit when money is being dropped before and after the job.",
  ],
  cashflow_control_yearly: [
    "Same Cashflow Control System.",
    "Yearly payment with installation waived.",
    "Lower first-year cost than monthly.",
  ],
  repeat_revenue_yearly: [
    "Same Repeat Revenue System.",
    "Yearly payment with installation waived.",
    "Lower first-year cost than monthly.",
  ],
  both_systems_yearly: [
    "Both systems for the year.",
    "Installation waived.",
    "Best first-year price for buying both systems together.",
  ],
}


const packageDemos: Partial<Record<PricingPackageId, PackageDemo>> = {
  cashflow_control_monthly: {
    bestFor: "Jobs are getting done before the office gets the bill out.",
    leak: "Finished work sitting unpaid, late invoices, missing job details, and payment follow-up that depends on memory.",
    before: ["Customer calls", "Staff writes it down somewhere", "Invoice is late", "Owner finds out late"],
    after: ["Customer is recorded", "Job moves forward", "Invoice goes out", "Payment gets followed up with"],
  },
  cashflow_control_yearly: {
    bestFor: "Jobs are getting done before the office gets the bill out.",
    leak: "Finished work sitting unpaid, late invoices, missing job details, and payment follow-up that depends on memory.",
    before: ["Customer calls", "Staff writes it down somewhere", "Invoice is late", "Owner finds out late"],
    after: ["Customer is recorded", "Job moves forward", "Invoice goes out", "Payment gets followed up with"],
  },
  repeat_revenue_monthly: {
    bestFor: "Past customers are not being contacted again.",
    leak: "One-time customers, quiet follow-up, missed review asks, and repeat work going to someone else.",
    before: ["Customer buys once", "No reminder goes out", "No follow-up happens", "Competitor gets the next job"],
    after: ["Customer is recorded", "Follow-up is triggered", "Text or email goes out", "Repeat work gets booked"],
  },
  repeat_revenue_yearly: {
    bestFor: "Past customers are not being contacted again.",
    leak: "One-time customers, quiet follow-up, missed review asks, and repeat work going to someone else.",
    before: ["Customer buys once", "No reminder goes out", "No follow-up happens", "Competitor gets the next job"],
    after: ["Customer is recorded", "Follow-up is triggered", "Text or email goes out", "Repeat work gets booked"],
  },
  both_systems_monthly: {
    bestFor: "Money is leaking before and after the job.",
    leak: "Missed calls, delayed jobs, late invoices, and past customers nobody contacts again.",
    before: ["Calls get missed", "Jobs get delayed", "Invoices go out late", "Past customers disappear"],
    after: ["Customers are recorded", "Jobs move", "Billing happens faster", "Past customers get contacted again"],
  },
  both_systems_yearly: {
    bestFor: "Money is leaking before and after the job.",
    leak: "Missed calls, delayed jobs, late invoices, and past customers nobody contacts again.",
    before: ["Calls get missed", "Jobs get delayed", "Invoices go out late", "Past customers disappear"],
    after: ["Customers are recorded", "Jobs move", "Billing happens faster", "Past customers get contacted again"],
  },
}

function priceRowsFor(pricingPackage: PricingPackage) {
  if (pricingPackage.id === "workflow_audit") {
    return [
      { label: "Assessment", value: pricingPackage.priceDisplay },
      { label: "If you bought the Office Process Assessment first", value: "$97 monthly credit or $194 yearly credit after the assessment call" },
    ]
  }

  return [
    { label: "Plan", value: pricingPackage.priceDisplay },
    {
      label: pricingPackage.waivedSetup ? "Installation" : "Setup",
      value: pricingPackage.waivedSetupDisplay || pricingPackage.setupFeeDisplay,
    },
    {
      label: pricingPackage.billingPeriod === "yearly"
        ? "After assessment credit"
        : "If you bought the Office Process Assessment first",
      value: pricingPackage.auditCreditDisplay,
    },
    { label: "First year after assessment credit", value: pricingPackage.firstYearCostAfterAuditCreditDisplay },
    ...(pricingPackage.savings ? [{ label: "Savings", value: pricingPackage.savings.display }] : []),
  ]
}

function priceNoteFor(pricingPackage: PricingPackage) {
  if (pricingPackage.id === "workflow_audit") {
    return `${pricingPackage.priceDisplay} assessment. If you buy a package within 24 hours after the assessment call, use the assessment credit at checkout.`
  }

  const setupCopy = pricingPackage.waivedSetup
    ? pricingPackage.waivedSetupDisplay
    : pricingPackage.setupFeeDisplay
  const creditCopy = `${pricingPackage.auditCreditDisplay} assessment credit ${pricingPackage.billingPeriod === "yearly" ? "if you bought the Office Process Assessment first" : "if you bought the Office Process Assessment first"}`
  const savingsCopy = pricingPackage.savings ? ` ${pricingPackage.savings.display}.` : ""

  return `${pricingPackage.priceDisplay} + ${setupCopy}. ${creditCopy}. First year after assessment credit: ${pricingPackage.firstYearCostAfterAuditCreditDisplay}.${savingsCopy}`
}

function checkoutHrefFor(pricingPackage: PricingPackage) {
  return pricingPackage.stripePaymentLink.url || null
}

function disabledReasonFor(pricingPackage: PricingPackage) {
  if (!pricingPackage.stripePaymentLink.url) return "Checkout paused: Payment Link is missing."
  return undefined
}

function primaryCtaLabelFor(pricingPackage: PricingPackage) {
  if (pricingPackage.id === "workflow_audit") return pricingPackage.cta
  return "Buy this package"
}

function secondaryCtaFor(pricingPackage: PricingPackage): PricingPlan["secondaryCta"] {
  if (pricingPackage.publicName === "Cashflow Control System") {
    return { label: "See the billing leak", action: "systems", href: "/systems/cashflow-control" }
  }

  if (pricingPackage.publicName === "Repeat Revenue System") {
    return { label: "See the repeat leak", action: "systems", href: "/systems/repeat-revenue" }
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
    demo: packageDemos[pricingPackage.id],
    helperLine: isAudit
      ? "You leave with a clear office work map and a recommendation: what to automate, remove, restructure, or delegate."
      : "After checkout, onboarding and fit, access, and scope review happen before the build begins.",
    scopeNote: isAudit
      ? "If no clear fix is found for a qualified business, the Office Process Assessment fee is refunded."
      : "Buying starts onboarding. The build begins after fit, access, and scope review. If this is not the right fit, Stanley Systems may refund, redirect, or pause before work begins.",
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
  title: "Office Process Assessment",
  shortTitle: "Assessment",
  promise: "Map the office work your business should not have to pay for anymore.",
  description: "We map the office work your business should not have to pay for anymore — then show what to automate, remove, restructure, or delegate.",
  id: "workflow_audit",
  kind: "front_door_audit",
  contactPathOnly: false,
  cta: {
    label: "Get the Office Process Assessment",
    action: "checkout",
    href: pricingPackageById.workflow_audit.stripePaymentLink.url,
  },
  guarantee: {
    headline: "If Stanley Systems cannot find one clear money leak we can fix, you get your Office Process Assessment fee back.",
    qualificationCopy:
      "The guarantee applies to qualified service businesses with enough job, invoice, customer, call, estimate, or review volume for leaks to matter. Stanley Systems needs access to the relevant systems and a reachable decision maker or operations contact during the assessment.",
    scopeCopy: "The refund applies to the Office Process Assessment fee only. It does not include a system build.",
  },
}

export const postAuditPlans: PricingPlan[] = pricingPackages
  .filter((pricingPackage) => pricingPackage.id !== "workflow_audit")
  .map(planFromPackage)

export const auditCreditTerm: AuditCreditTerm = {
  status: "approved",
  copy:
    "Bought the Office Process Assessment first? Use your assessment credit code at checkout. Monthly packages can receive a $97 assessment credit; yearly packages can receive a $194 assessment credit. The credit is valid once for 24 hours after the assessment call.",
  nonStackingCopy: "If the assessment is refunded because no clear fix is found, there is no build credit.",
}

export const pricingFAQItems: PricingFAQItem[] = [
  {
    question: "Is the Office Process Assessment required before buying a package?",
    answer:
      "No. The Office Process Assessment is the paid first step when you want Stanley Systems to map the office work your business should not have to pay for anymore. If you already know which path you need, you can buy Cashflow Control System, Repeat Revenue System, or Both Systems directly when checkout is available. Direct purchase still starts onboarding, access review, fit review, and scope confirmation before the build begins.",
  },
  {
    question: "How does the Office Process Assessment credit work?",
    answer:
      "If you buy the Office Process Assessment first, the assessment credit applies once when you buy a package within 24 hours after the assessment call. Monthly packages receive a $97 assessment credit. Yearly packages receive a $194 assessment credit and the installation fee is waived. If the assessment is refunded because no clear fix is found, no assessment credit or package credit is also owed.",
  },
  {
    question: "What does the Office Process Assessment guarantee mean?",
    answer:
      "If your business qualifies and Stanley Systems cannot find one clear money leak it can reasonably help fix, you get the Office Process Assessment fee back. The refund applies to the Office Process Assessment fee only. It does not include a free system build, subscription fee, third-party cost, or package credit.",
  },
  {
    question: "Who qualifies for the Office Process Assessment guarantee?",
    answer:
      "The guarantee is for active service businesses with enough real job, customer, billing, estimate, review, call, or follow-up activity to inspect. Stanley Systems also needs timely access to the relevant tools or records and a reachable decision maker or operations contact during the assessment.",
  },
  {
    question: "Can I buy Cashflow Control System or Repeat Revenue System directly?",
    answer:
      "Yes, when public checkout is available. Direct checkout starts onboarding and build intake. Stanley Systems still reviews fit, access, tool limits, record quality, and requested scope before the build begins. If the selected package is not the right fit, Stanley Systems may redirect you, propose a custom scope, pause the start, or refund before work begins.",
  },
  {
    question: "What happens after I buy a package?",
    answer:
      "You receive onboarding instructions so Stanley Systems can confirm your business details, required access, current tools, record quality, build fit, and first scope. The build begins after the required information and access are provided and Stanley Systems confirms the package fit and first scope.",
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
    question: "Do promotion codes or assessment credits always apply?",
    answer:
      "Promotion code and assessment credit availability depends on the active checkout link and Stripe settings at the time of purchase. Assessment credit is available once only if you bought the Office Process Assessment first and buy a package within 24 hours after the assessment call.",
  },
  {
    question: "Can Stanley Systems work inside my current tools?",
    answer:
      "Usually, yes. Stanley Systems installs a control layer on top of your existing software and office systems. Some tools, permissions, data quality issues, or platform rules may limit what can be implemented without a custom scope.",
  },
]
