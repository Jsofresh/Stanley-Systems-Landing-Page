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
  workflow_audit: "Find the office work AI should remove first, then leave with the fixes to start removing it.",
  cashflow_control_monthly: "Turn your AI Profit Map into staff training, a company playbook, and practical office workflows.",
  repeat_revenue_monthly: "Keep installed workflows monitored, fixed, improved, and useful to staff.",
  both_systems_monthly: "Install priority workflows, then keep improving them month by month.",
  cashflow_control_yearly: "Turn your AI Profit Map into staff training, a company playbook, and practical office workflows.",
  repeat_revenue_yearly: "Bring past customers back for the year and remove the installation charge.",
  both_systems_yearly: "Fix both leaks with the best first-year price.",
}

const directPurchaseDescriptions: Record<PricingPackageId, string> = {
  workflow_audit:
    "Stanley Systems traces office drag just far enough to give you practical fixes, staff AI prompts, workflow tips, tool guidance, and the first AI-guided workflow worth installing.",
  cashflow_control_monthly:
    "For businesses ready to turn the AI Profit Map into staff training, your company playbook, and practical workflows around existing tools.",
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
    "Office work AI should remove first.",
    "Staff prompts and AI plays your team can use now.",
    "Tool and workflow recommendations.",
    "First AI Office Installation Sprint priority.",
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
    "Same AI Office Installation Sprint.",
    "Yearly payment with installation waived.",
    "Lower first-year cost than monthly.",
  ],
  repeat_revenue_yearly: [
    "Same AI Office Ops.",
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
      { label: "AI Profit Map", value: pricingPackage.priceDisplay },
      { label: "AI Office Installation Sprint credit", value: "$194 credited toward your AI Office Installation Sprint" },
    ]
  }

  return [
    { label: "Plan", value: pricingPackage.priceDisplay },
    {
      label: pricingPackage.waivedSetup ? "Installation" : "Setup",
      value: pricingPackage.waivedSetupDisplay || pricingPackage.setupFeeDisplay,
    },
    {
      label: "AI Profit Map credit",
      value: pricingPackage.auditCreditDisplay,
    },
    { label: "First year after AI Profit Map credit", value: pricingPackage.firstYearCostAfterAuditCreditDisplay },
    ...(pricingPackage.savings ? [{ label: "Savings", value: pricingPackage.savings.display }] : []),
  ]
}

function priceNoteFor(pricingPackage: PricingPackage) {
  if (pricingPackage.id === "workflow_audit") {
    return `${pricingPackage.priceDisplay} AI Profit Map. $194 credited toward your AI Office Installation Sprint when you move forward.`
  }

  const setupCopy = pricingPackage.waivedSetup
    ? pricingPackage.waivedSetupDisplay
    : pricingPackage.setupFeeDisplay
  const creditCopy = pricingPackage.auditCredit > 0 ? "$194 credited toward your AI Office Installation Sprint if you bought the AI Profit Map first" : pricingPackage.auditCreditDisplay
  const savingsCopy = pricingPackage.savings ? ` ${pricingPackage.savings.display}.` : ""

  return `${pricingPackage.priceDisplay} + ${setupCopy}. ${creditCopy}. First year after AI Profit Map credit: ${pricingPackage.firstYearCostAfterAuditCreditDisplay}.${savingsCopy}`
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
  if (pricingPackage.publicName === "AI Office Installation Sprint") {
    return { label: "See the billing readiness workflow", action: "systems", href: "/systems-installation-sprint" }
  }

  if (pricingPackage.publicName === "AI Office Ops") {
    return { label: "See the repeat leak", action: "systems", href: "/systems-installation-sprint" }
  }

  if (pricingPackage.publicName === "AI Office Installation Sprint + Ops") {
    return { label: "Compare AI Office Installation Sprint + Ops", action: "anchor", href: "/pricing#compare-systems" }
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
      ? "You leave with fixes, prompts, tool guidance, and a recommendation: what to automate, remove, restructure, or delegate."
      : "After checkout, onboarding and fit, access, and scope review happen before the build begins.",
    scopeNote: isAudit
      ? "If no clear first workflow is found for a qualified business, the AI Profit Map fee is refunded."
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
    accent: isAudit ? "green" : pricingPackage.publicName === "AI Office Installation Sprint + Ops" ? "green" : "navy",
  }
}

export const workflowAuditOffer: WorkflowAuditOffer = {
  ...planFromPackage(pricingPackageById.workflow_audit),
  title: "AI Profit Map",
  shortTitle: "AI Profit Map",
  promise: "Find the office work AI should remove first.",
  description: "In one focused session, Stanley Systems traces office drag just far enough to turn it into useful fixes: staff AI prompts, workflow tips, tool recommendations, quick wins, and the first AI-guided workflow worth installing.",
  id: "workflow_audit",
  kind: "front_door_audit",
  contactPathOnly: false,
  cta: {
    label: "Buy the $97 AI Profit Map",
    action: "checkout",
    href: pricingPackageById.workflow_audit.stripePaymentLink.url,
  },
  guarantee: {
    headline: "If Stanley Systems cannot find one clear admin drag we can fix, you get your AI Profit Map fee back.",
    qualificationCopy:
      "The guarantee applies to qualified service businesses with enough job, invoice, customer, call, estimate, or review volume for the workflow review to matter. Stanley Systems needs access to the relevant systems and a reachable decision maker or operations contact during the AI Profit Map.",
    scopeCopy: "The refund applies to the AI Profit Map fee only. It does not include a system build.",
  },
}

export const postAuditPlans: PricingPlan[] = pricingPackages
  .filter((pricingPackage) => pricingPackage.id !== "workflow_audit")
  .map(planFromPackage)

export const auditCreditTerm: AuditCreditTerm = {
  status: "approved",
  copy:
    "Bought the AI Profit Map first? $194 is credited toward your AI Office Installation Sprint. The credit follows the stated checkout and written follow-up terms.",
  nonStackingCopy: "If the AI Profit Map is refunded because no clear first workflow is found, there is no build credit.",
}

export const pricingFAQItems: PricingFAQItem[] = [
  {
    question: "Is the AI Profit Map required before buying a package?",
    answer:
      "The AI Profit Map is the recommended first paid step before the AI Office Installation Sprint. It gives you the fix list, staff AI prompts, tool guidance, workflow recommendations, and install priorities needed to build the right first workflow.",
  },
  {
    question: "How does the AI Profit Map credit work?",
    answer:
      "$194 is credited toward your AI Office Installation Sprint when you move forward. If the AI Profit Map is refunded because no clear first workflow is found, no package credit is also owed.",
  },
  {
    question: "What does the AI Profit Map guarantee mean?",
    answer:
      "If your business qualifies and Stanley Systems cannot find one clear first workflow it can reasonably help fix, you get the AI Profit Map fee back. The refund applies to the AI Profit Map fee only. It does not include a free system build, subscription fee, third-party cost, or package credit.",
  },
  {
    question: "Who qualifies for the AI Profit Map guarantee?",
    answer:
      "The guarantee is for active service businesses with enough real job, customer, billing, estimate, review, call, or follow-up activity to inspect. Stanley Systems also needs timely access to the relevant tools or records and a reachable decision maker or operations contact during the AI Profit Map.",
  },
  {
    question: "Can I buy AI Office Installation Sprint or AI Office Ops directly?",
    answer:
      "If you have not bought the Map yet, start there. Direct checkout links may remain available for operational reasons, but the public path is Map first, then Sprint if there is a clear fit.",
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
    question: "Do promotion codes or AI Profit Map credits always apply?",
    answer:
      "Promotion code and AI Profit Map credit availability depends on the active checkout link and Stripe settings at the time of purchase. The standard public credit is $194 credited toward your AI Office Installation Sprint.",
  },
  {
    question: "Can Stanley Systems work inside my current tools?",
    answer:
      "Usually, yes. Stanley Systems installs practical AI-guided workflows around your existing software and office systems. Some tools, permissions, data quality issues, or platform rules may limit what can be implemented without a custom scope.",
  },
]
