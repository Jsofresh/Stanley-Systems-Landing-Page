import { pricingPackageById } from "@/lib/pricing/source-of-truth"

export const workflowAudit = pricingPackageById.workflow_audit
export const repeatMonthly = pricingPackageById.repeat_revenue_monthly
export const repeatYearly = pricingPackageById.repeat_revenue_yearly
export const bothMonthly = pricingPackageById.both_systems_monthly
export const bothYearly = pricingPackageById.both_systems_yearly

export const repeatRevenueAssets = {
  hero: "/images/repeat-revenue/repeat-revenue-hero-hubspot-v2.png",
  flywheel: "/images/repeat-revenue/repeat-revenue-flywheel-hubspot-v2.png",
}

export const leakCards = [
  {
    title: "Past customers go quiet",
    text: "The jobs were good. The list exists. Nobody owns the next ask.",
    outcome: "Reactivation path",
  },
  {
    title: "Happy customers never get asked",
    text: "Reviews and referrals are left to chance after the work is done.",
    outcome: "Review + referral moments",
  },
  {
    title: "Missed calls cool off",
    text: "A buyer reaches out, nobody gets back fast enough, and the job disappears.",
    outcome: "Same-day recovery",
  },
]

export const moneyRows = [
  ["Past customer records", "500"],
  ["Ready to book again", "5%"],
  ["Average job value", "$1,200"],
  ["Revenue worth checking", "$30,000"],
] as const

export const flywheelSteps = [
  ["1", "Job finishes", "A completed job becomes the trigger, not the end of the relationship."],
  ["2", "Trust is captured", "The customer gets the right private check-in while the work is fresh."],
  ["3", "Happy customers get asked", "Reviews and referrals happen from the best moments, not random reminders."],
  ["4", "Old buyers hear from you", "Past customers get a useful reason to come back before they shop elsewhere."],
  ["5", "Missed demand is recovered", "Calls and inquiries get followed before they become dead leads."],
]

export const packageCards = [
  {
    name: "Repeat Revenue Monthly",
    package: repeatMonthly,
    description: "Build the follow-up machine without a yearly commitment.",
    install: repeatMonthly.setupFeeDisplay,
    credit: "$97 audit credit if you start there first",
    cta: "Buy monthly",
    secondary: "Start with the audit",
    highlight: false,
    bullets: ["Past-customer reactivation", "Review and referral asks", "Missed-call recovery", "Main number stays unchanged"],
  },
  {
    name: "Repeat Revenue Yearly",
    package: repeatYearly,
    description: "Best first-year value for the core Repeat Revenue System.",
    install: repeatYearly.waivedSetupDisplay ?? repeatYearly.setupFeeDisplay,
    credit: "$194 audit credit if you start there first",
    cta: "Buy yearly",
    secondary: "Start with the audit",
    highlight: true,
    bullets: ["Everything in monthly", "Installation waived", "20% yearly savings", "Lower first-year cost"],
  },
  {
    name: "Repeat Revenue + Cashflow Monthly",
    package: bothMonthly,
    description: "For shops leaking revenue before and after the work is done.",
    install: bothMonthly.setupFeeDisplay,
    credit: "$97 audit credit if you start there first",
    cta: "Buy both monthly",
    secondary: "Start with the audit",
    highlight: false,
    bullets: ["Repeat Revenue System", "Cashflow Control System", "Finished-job intake watch", "A/R follow-up prompts"],
  },
  {
    name: "Repeat Revenue + Cashflow Yearly",
    package: bothYearly,
    description: "The full revenue-control path with yearly savings and waived installation.",
    install: bothYearly.waivedSetupDisplay ?? bothYearly.setupFeeDisplay,
    credit: "$194 audit credit if you start there first",
    cta: "Buy both yearly",
    secondary: "Start with the audit",
    highlight: true,
    bullets: ["Repeat Revenue System", "Cashflow Control System", "Installation waived", "20% yearly savings"],
  },
]

export const faqItems = [
  ["Will this change my main business number?", "No. Your main number stays in place. Stanley Systems builds the follow-up path around the way customers already reach you."],
  ["Does this guarantee reviews, rankings, or new customers?", "No. The system creates the follow-up path. It does not promise customer behavior, platform approvals, search rankings, or guaranteed new customers."],
  ["Do I need the Workflow Audit first?", "No. You can buy directly. The audit is the safer first step if you want the leak map before choosing a package."],
  ["How does the audit credit work?", "The Workflow Audit costs $97. Buy a monthly package after the audit and get $97 off. Buy yearly and get $194 off."],
  ["Why buy yearly?", "Yearly saves 20%, waives installation, and doubles the audit credit."],
  ["When should I buy both systems?", "Buy both when follow-up leaks and cashflow leaks are happening together: old customers, reviews, referrals, missed calls, slow invoices, open balances, or office chasing."],
] as const

export const scopeItems = [
  "No promised new customers, review volume, search rankings, or platform approvals.",
  "No replacement of your booking, CRM, accounting, or review platform.",
  "No call center, sales team, or phone-provider replacement.",
  "Custom campaigns, unusual integrations, extra locations, or deep data cleanup are scoped separately.",
]
