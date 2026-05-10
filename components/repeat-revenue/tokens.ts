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

export const leakResultPanels = [
  {
    image: "/images/repeat-revenue/result-past-customers.png",
    title: "Quiet customer lists become booked jobs.",
    body: "Stanley Systems finds past customers, old buyers, seasonal records, and completed jobs that should have a next step.",
    fixes: [
      "Finds customer records worth checking",
      "Groups them by follow-up timing",
      "Gives your office a clear next step when someone replies",
    ],
    cta: "See Repeat Revenue packages",
  },
  {
    image: "/images/repeat-revenue/result-review-path.png",
    title: "Happy customers get asked while trust is fresh.",
    body: "Stanley Systems gives happy customers a clear review ask while the job is still fresh and sends weak experiences to a manager first.",
    fixes: [
      "Sends a private rating step",
      "Routes happy customers toward reviews",
      "Flags bad experiences before they go public",
    ],
    cta: "See Repeat Revenue packages",
  },
  {
    image: "/images/repeat-revenue/result-referral-path.png",
    title: "Referral asks turn trust into new leads.",
    body: "Stanley Systems gives your best customers a simple referral ask while trust is highest.",
    fixes: [
      "Identifies the best referral moments",
      "Gives customers a simple next step",
      "Keeps referral opportunities visible to the office",
    ],
    cta: "See Repeat Revenue packages",
  },
  {
    image: "/images/repeat-revenue/result-missed-calls.png",
    title: "Missed calls get a recovery path.",
    body: "Stanley Systems helps missed and after-hours inquiries get acknowledged and routed before the customer calls someone else.",
    fixes: [
      "Captures missed inquiry moments",
      "Gives the office a follow-up path",
      "Helps good calls avoid turning into dead leads",
    ],
    cta: "See Repeat Revenue packages",
  },
]

export const cashflowUpsellChips = [
  "Invoices go out late",
  "Open balances need chasing",
  "Office keeps checking job details",
]

export const cashflowResultPanel = {
  title: "Repeat Revenue + Cashflow Control System is the stronger fix.",
  body: "Repeat Revenue System brings customers back. Cashflow Control System helps finished work turn into collected cash faster.",
  fixes: [
    "Repeat Revenue System protects future revenue",
    "Cashflow Control System protects earned revenue",
    "Together they catch leaks before and after the job",
  ],
  cta: "See both-system packages",
}

export const multiplierStack = [
  "Past customers create repeat jobs",
  "Happy customers create reviews",
  "Reviews create trust",
  "Trust creates referrals",
  "More calls create more chances to book",
] as const

export const howItWorksSteps = [
  [
    "A job or customer record creates the trigger",
    "The system looks for completed work, past customers, missed calls, and customer moments worth following up.",
  ],
  [
    "The right ask goes out at the right time",
    "Past buyers get a reason to come back. Happy customers get review and referral asks while trust is fresh.",
  ],
  [
    "Replies become office action",
    "When someone responds, your office sees what happened and what the next step should be.",
  ],
  [
    "The loop keeps feeding itself",
    "Reviews build trust. Referrals bring new calls. Past customers come back. Missed demand gets followed.",
  ],
] as const

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
    install: "Install discount: -$349",
    credit: "Audit credit: -$194 if you start there first",
    callout: "-$2,120 first-year package savings",
    cta: "Buy yearly",
    secondary: "Start with the audit",
    tone: "yearly",
    bullets: ["Everything in monthly", "Installation discount", "20% yearly savings", "Lower first-year cost"],
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
    tone: "complete",
    bullets: ["Repeat Revenue System", "Cashflow Control System", "Finished-job intake watch", "A/R follow-up prompts"],
  },
  {
    badge: "Best value",
    name: "Repeat Revenue + Cashflow Yearly",
    package: bothYearly,
    description: "The full revenue-control path with yearly savings and an installation discount.",
    install: "Install discount: -$449",
    credit: "Audit credit: -$194 if you start there first",
    callout: "-$2,700 first-year package savings",
    cta: "Buy both yearly",
    secondary: "Start with the audit",
    tone: "recommended",
    bullets: ["Repeat Revenue System", "Cashflow Control System", "Installation discount", "20% yearly savings"],
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
  ["What does Repeat Revenue System actually do?", "It brings past customers back, asks happy customers for reviews and referrals, and catches missed calls before they become cold leads."],
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
