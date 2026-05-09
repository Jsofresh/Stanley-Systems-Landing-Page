import { pricingPackageById } from "@/lib/pricing/source-of-truth"

export const workflowAudit = pricingPackageById.workflow_audit
export const repeatMonthly = pricingPackageById.repeat_revenue_monthly
export const repeatYearly = pricingPackageById.repeat_revenue_yearly
export const bothMonthly = pricingPackageById.both_systems_monthly
export const bothYearly = pricingPackageById.both_systems_yearly

export const leakCards = [
  {
    title: "Past customers go quiet",
    text: "The jobs were good. The list exists. Nobody owns the next ask.",
  },
  {
    title: "Happy customers never get asked",
    text: "Reviews are left to chance after the work is done.",
  },
  {
    title: "Referrals depend on memory",
    text: "Your best customers would refer people, but nobody asks while the job is still fresh.",
  },
  {
    title: "Missed calls go cold",
    text: "A buyer reaches out, nobody gets back fast enough, and the job disappears.",
  },
]

export const cashflowUpsellChips = [
  "Invoices go out late",
  "Open balances need chasing",
  "Office keeps checking job details",
]

export const moneyRows = [
  ["Past customer records", "500"],
  ["Ready to book again", "5%"],
  ["Average job value", "$1,200"],
  ["Revenue worth checking", "$30,000"],
] as const

export const flywheelSteps = [
  ["1", "Job finishes", "The completed job becomes the trigger, not the end of the relationship."],
  ["2", "Private rating goes out", "Happy customers move forward. Bad experiences go to a manager first."],
  ["3", "Reviews get asked for", "Good work turns into fresh Google reviews while trust is still high."],
  ["4", "Referrals get asked for", "Your best customers get a simple way to send someone new."],
  ["5", "Past customers hear from you", "Old buyers get a useful reason to come back before they shop elsewhere."],
  ["6", "Missed calls get caught", "Calls and inquiries get followed before they turn into dead leads."],
]

export const packageCards = [
  {
    badge: "Monthly flexibility",
    name: "Repeat Revenue Monthly",
    package: repeatMonthly,
    description: "Best for shops that know the follow-up leak is the main problem.",
    install: "$349 installation",
    credit: "$97 audit credit if you start there first",
    callout: null,
    cta: "Buy monthly",
    secondary: "Start with the audit",
    tone: "monthly",
    bullets: ["Past customer reactivation", "Review and referral asks", "Missed-call recovery", "Main number stays unchanged"],
  },
  {
    badge: "Save 20%",
    name: "Repeat Revenue Yearly",
    package: repeatYearly,
    description: "Best first-year value for the core Repeat Revenue System.",
    install: "$349 installation waived",
    credit: "$194 audit credit if you start there first",
    callout: "Save $2,120 first year after audit credit",
    cta: "Buy yearly",
    secondary: "Start with the audit",
    tone: "yearly",
    bullets: ["Everything in monthly", "Installation waived", "20% yearly savings", "Lower first-year cost"],
  },
  {
    badge: "Most complete monthly",
    name: "Repeat Revenue + Cashflow Monthly",
    package: bothMonthly,
    description: "For shops leaking revenue before and after the work is done.",
    install: "$449 installation",
    credit: "$97 audit credit if you start there first",
    callout: null,
    cta: "Buy both monthly",
    secondary: "Start with the audit",
    tone: "monthly",
    bullets: ["Repeat Revenue System", "Cashflow Control System", "Finished-job intake watch", "A/R follow-up prompts"],
  },
  {
    badge: "Best value",
    name: "Repeat Revenue + Cashflow Yearly",
    package: bothYearly,
    description: "The full revenue-control path with yearly savings and waived installation.",
    install: "$449 installation waived",
    credit: "$194 audit credit if you start there first",
    callout: "Save $2,700 first year after audit credit",
    cta: "Buy both yearly",
    secondary: "Start with the audit",
    tone: "recommended",
    bullets: ["Repeat Revenue System", "Cashflow Control System", "Installation waived", "20% yearly savings"],
  },
]

export const proofCards = [
  ["Customer list found", "Past customers, old buyers, and missed calls grouped by next step."],
  ["Follow-up path shown", "Who gets contacted, when the ask happens, and what your office does after a reply."],
  ["Opportunities surfaced", "Old customers, review asks, referral asks, and missed inquiries shown in one place."],
  ["Main number stays unchanged", "Customers keep calling the same number. Stanley Systems adds the follow-up path around it."],
] as const

export const faqItems = [
  ["Will this change my main business number?", "No. Your main number stays in place. Stanley Systems builds the follow-up path around the way customers already reach you."],
  ["What does Repeat Revenue System actually do?", "It helps bring past customers back, asks happy customers for reviews and referrals, and catches missed calls before they become cold leads."],
  ["Does this guarantee reviews, rankings, or new customers?", "No. The system creates the follow-up path. It does not promise customer behavior, platform approvals, search rankings, or guaranteed new customers."],
  ["Do I need the Workflow Audit first?", "No. You can buy directly. The audit is the smart first step if you want the numbers to show which leak should be fixed first."],
  ["How does the audit credit work?", "The Workflow Audit costs $97. Buy a monthly package after the audit and get $97 off. Buy yearly and get $194 off."],
  ["Why buy yearly?", "Yearly saves 20%, waives installation, and doubles the audit credit."],
  ["When should I buy both systems?", "Buy both when follow-up leaks and cashflow leaks are happening together: old customers, reviews, referrals, missed calls, slow invoices, open balances, or office chasing."],
] as const

export const scopeItems = [
  "No promised new customers, review volume, rankings, or platform approvals.",
  "No replacement of your booking, CRM, accounting, or review platform.",
  "No call center, sales team, or phone-provider replacement.",
  "Custom campaigns, unusual integrations, extra locations, or deep data cleanup are scoped separately.",
]
