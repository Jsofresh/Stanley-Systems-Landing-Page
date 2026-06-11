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
    cta: "Book the $197 AI Office Map",
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
    cta: "Book the $197 AI Office Map",
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
    cta: "Book the $197 AI Office Map",
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
    cta: "Book the $197 AI Office Map",
  },
]

export const cashflowUpsellChips = [
  "Invoices go out late",
  "Open balances need chasing",
  "Office keeps checking job details",
]

export const cashflowResultPanel = {
  title: "AI Office Ops + Installation Sprint is the stronger fix.",
  body: "AI Office Ops brings customers back. AI Office Installation Sprint helps finished work turn into collected cash faster.",
  fixes: [
    "AI Office Ops protects future revenue",
    "AI Office Installation Sprint protects earned revenue",
    "Together they catch leaks before and after the job",
  ],
  cta: "Book the $197 AI Office Map",
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
    name: "AI Office Ops — follow-up support",
    package: repeatMonthly,
    description: "Best for shops whose AI Office Map shows customer follow-up should be supported after install.",
    install: "$349 installation",
    credit: "$197 AI Office Map credit if you start there first",
    callout: null,
    cta: "Book the $197 AI Office Map",
    secondary: "Book the $197 AI Office Map",
    tone: "monthly",
    bullets: ["Past customer reactivation", "Review and referral asks", "Missed-call recovery", "Main number stays unchanged"],
  },
  {
    badge: "Save 20%",
    name: "AI Office Ops — yearly support",
    package: repeatYearly,
    description: "Best first-year value for the core AI Office Ops.",
    install: "Install discount: -$349",
    credit: "AI Office Map credit: -$197 if you start there first",
    callout: "-$2,120 first-year package savings",
    cta: "Book the $197 AI Office Map",
    secondary: "Book the $197 AI Office Map",
    tone: "yearly",
    bullets: ["Everything in monthly", "Installation discount", "20% yearly savings", "Lower first-year cost"],
  },
  {
    badge: "Most complete monthly",
    name: "AI Office Installation Sprint + Ops",
    package: bothMonthly,
    description: "For shops that need installed office workflows plus ongoing support after the Map.",
    install: "$449 installation",
    credit: "$197 AI Office Map credit if you start there first",
    callout: null,
    cta: "Book the $197 AI Office Map",
    secondary: "Book the $197 AI Office Map",
    tone: "complete",
    bullets: ["AI Office Ops", "AI Office Installation Sprint", "Finished-job intake watch", "A/R follow-up prompts"],
  },
  {
    badge: "Best value",
    name: "AI Office Installation Sprint + Ops — yearly",
    package: bothYearly,
    description: "The full revenue-control path with yearly savings and an installation discount.",
    install: "Install discount: -$449",
    credit: "AI Office Map credit: -$197 if you start there first",
    callout: "-$2,700 first-year package savings",
    cta: "Book the $197 AI Office Map",
    secondary: "Book the $197 AI Office Map",
    tone: "recommended",
    bullets: ["AI Office Ops", "AI Office Installation Sprint", "Installation discount", "20% yearly savings"],
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
  ["What does AI Office Ops actually do?", "It brings past customers back, asks happy customers for reviews and referrals, and catches missed calls before they become cold leads."],
  ["Does this guarantee reviews, rankings, or new customers?", "No. The system creates the follow-up path. It does not promise customer behavior, platform approvals, search rankings, or guaranteed new customers."],
  ["Do I need the AI Office Map first?", "Start there if you have not bought it yet. The Map shows whether follow-up is the first workflow worth installing or whether another office workflow should come first."],
  ["How does the AI Office Map credit work?", "$197 is credited toward your AI Office Installation Sprint when you move forward."],
  ["Why buy yearly?", "Yearly options are legacy checkout paths. The public path is Map first, then Sprint, then AI Office Ops when support makes sense."],
  ["When should I add AI Office Ops?", "Add Ops when follow-up and office workflow issues are happening together: old customers, reviews, referrals, missed calls, slow invoices, open balances, or office chasing."],
] as const

export const scopeItems = [
  "No promised new customers, review volume, rankings, or platform approvals.",
  "No replacement of your booking, CRM, accounting, or review platform.",
  "No call center, sales team, or phone-provider replacement.",
  "Custom campaigns, unusual integrations, extra locations, or deep data cleanup are scoped separately.",
]
