export type PricingPackageId =
  | "ai_office_command_map"
  | "founding_ai_office_installation"
  | "founding_ai_office_ops"
  | "workflow_audit"
  | "cashflow_control_monthly"
  | "repeat_revenue_monthly"
  | "both_systems_monthly"
  | "cashflow_control_yearly"
  | "repeat_revenue_yearly"
  | "both_systems_yearly"

export type PricingBillingPeriod = "one_time" | "monthly" | "yearly"

export type PricingPackage = {
  id: PricingPackageId
  publicName: string
  shortCheckoutName: string
  price: number
  priceDisplay: string
  billingPeriod: PricingBillingPeriod
  setupFee: number
  setupFeeDisplay: string
  waivedSetup: boolean
  waivedSetupDisplay: string | null
  auditCredit: number
  auditCreditDisplay: string
  auditCreditLabel: "Included" | "If you bought the AI Profit Map first" | "After AI Profit Map credit"
  firstYearCostAfterAuditCredit: number
  firstYearCostAfterAuditCreditDisplay: string
  savings: {
    label: string
    amount: number
    display: string
  } | null
  badge: string | null
  cta: string
  stripePaymentLink: {
    envName: string
    url: string
  }
  packageRoute: string
  analyticsPackageId: string
  notes?: string[]
}

export const pricingPackages: PricingPackage[] = [
  {
    id: "ai_office_command_map",
    publicName: "AI Office Command Map",
    shortCheckoutName: "AI Office Command Map",
    price: 197,
    priceDisplay: "$197",
    billingPeriod: "one_time",
    setupFee: 0,
    setupFeeDisplay: "$0",
    waivedSetup: false,
    waivedSetupDisplay: null,
    auditCredit: 0,
    auditCreditDisplay: "No installation credit policy is currently stated",
    auditCreditLabel: "Included",
    firstYearCostAfterAuditCredit: 197,
    firstYearCostAfterAuditCreditDisplay: "$197",
    savings: null,
    badge: "Practical first step",
    cta: "Get the $197 AI Office Command Map",
    stripePaymentLink: {
      envName: "NEXT_PUBLIC_STRIPE_WORKFLOW_AUDIT_PAYMENT_LINK",
      url: "https://buy.stripe.com/3cI7sKcHZder5I5cFkg7e09",
    },
    packageRoute: "/ai-office-command-map",
    analyticsPackageId: "ai_office_command_map",
    notes: [
      "One standardized starter automation installed with the buyer.",
      "Two do-it-yourself automation kits.",
      "Three personalized office-action blueprints.",
    ],
  },
  {
    id: "founding_ai_office_installation",
    publicName: "Founding Partner AI Office Installation",
    shortCheckoutName: "Founding Partner AI Office Installation",
    price: 3500,
    priceDisplay: "$3,500",
    billingPeriod: "one_time",
    setupFee: 3500,
    setupFeeDisplay: "$3,500 one-time setup",
    waivedSetup: false,
    waivedSetupDisplay: null,
    auditCredit: 0,
    auditCreditDisplay: "No Command Map credit policy is currently stated",
    auditCreditLabel: "Included",
    firstYearCostAfterAuditCredit: 9500,
    firstYearCostAfterAuditCreditDisplay: "$9,500 first year",
    savings: null,
    badge: "Two installations",
    cta: "Apply for a Founding Partner Installation",
    stripePaymentLink: { envName: "", url: "" },
    packageRoute: "/systems-installation-sprint#installation-contact",
    analyticsPackageId: "founding_ai_office_installation",
    notes: ["Application and fit review first.", "Includes 30 days of managed operation plus the 30-day money-back guarantee."],
  },
  {
    id: "founding_ai_office_ops",
    publicName: "Founding Partner AI Office Ops",
    shortCheckoutName: "Founding Partner AI Office Ops",
    price: 500,
    priceDisplay: "$500/month",
    billingPeriod: "monthly",
    setupFee: 0,
    setupFeeDisplay: "$0 after founding installation",
    waivedSetup: false,
    waivedSetupDisplay: null,
    auditCredit: 0,
    auditCreditDisplay: "Included in the founding plan",
    auditCreditLabel: "Included",
    firstYearCostAfterAuditCredit: 6000,
    firstYearCostAfterAuditCreditDisplay: "$6,000/year",
    savings: null,
    badge: "Base rate locked for life",
    cta: "Apply for a Founding Partner Installation",
    stripePaymentLink: { envName: "", url: "" },
    packageRoute: "/systems-installation-sprint#installation-contact",
    analyticsPackageId: "founding_ai_office_ops",
  },
  {
    id: "workflow_audit",
    publicName: "AI Office Command Map",
    shortCheckoutName: "AI Office Command Map",
    price: 197,
    priceDisplay: "$197",
    billingPeriod: "one_time",
    setupFee: 0,
    setupFeeDisplay: "$0",
    waivedSetup: false,
    waivedSetupDisplay: null,
    auditCredit: 0,
    auditCreditDisplay: "No installation credit policy is currently stated",
    auditCreditLabel: "Included",
    firstYearCostAfterAuditCredit: 197,
    firstYearCostAfterAuditCreditDisplay: "$197",
    savings: null,
    badge: "Legacy package ID",
    cta: "Get the $197 AI Office Command Map",
    stripePaymentLink: {
      envName: "NEXT_PUBLIC_STRIPE_WORKFLOW_AUDIT_PAYMENT_LINK",
      url: "https://buy.stripe.com/3cI7sKcHZder5I5cFkg7e09",
    },
    packageRoute: "/ai-office-command-map",
    analyticsPackageId: "ai_office_command_map",
    notes: [
      "Legacy workflow_audit alias retained for callbacks and historical attribution.",
      "Public offer is the AI Office Command Map with one installed starter, two DIY kits, and three personalized blueprints.",
    ],
  },
  {
    id: "cashflow_control_monthly",
    publicName: "AI Office Installation Sprint",
    shortCheckoutName: "AI Office Installation Sprint Deposit",
    price: 3500,
    priceDisplay: "$3,500 starting",
    billingPeriod: "one_time",
    setupFee: 0,
    setupFeeDisplay: "Starting beta install",
    waivedSetup: false,
    waivedSetupDisplay: null,
    auditCredit: 194,
    auditCreditDisplay: "-$194",
    auditCreditLabel: "If you bought the AI Profit Map first",
    firstYearCostAfterAuditCredit: 3306,
    firstYearCostAfterAuditCreditDisplay: "$3,306 starting after credit",
    savings: null,
    badge: "Priority workflows",
    cta: "See the AI Office Installation Sprint",
    stripePaymentLink: {
      envName: "NEXT_PUBLIC_STRIPE_CASHFLOW_CONTROL_MONTHLY_PAYMENT_LINK",
      url: "https://buy.stripe.com/28E7sKdM38Yb2vTaxcg7e03",
    },
    packageRoute: "/systems-installation-sprint",
    analyticsPackageId: "cashflow_control_monthly",
    notes: [
      "Installs practical office workflows around existing software.",
      "Includes fix plan, your company playbook, staff AI training, proof report, and 30 days light support.",
    ],
  },
  {
    id: "repeat_revenue_monthly",
    publicName: "AI Office Ops",
    shortCheckoutName: "AI Office Ops Monthly",
    price: 500,
    priceDisplay: "$500/mo starting",
    billingPeriod: "monthly",
    setupFee: 0,
    setupFeeDisplay: "$0 setup after Sprint",
    waivedSetup: false,
    waivedSetupDisplay: null,
    auditCredit: 0,
    auditCreditDisplay: "Sprint installed first",
    auditCreditLabel: "After AI Profit Map credit",
    firstYearCostAfterAuditCredit: 6000,
    firstYearCostAfterAuditCreditDisplay: "$6,000/year starting",
    savings: null,
    badge: "Monthly improvement",
    cta: "Ask about AI Office Ops",
    stripePaymentLink: {
      envName: "NEXT_PUBLIC_STRIPE_REPEAT_REVENUE_MONTHLY_PAYMENT_LINK",
      url: "https://buy.stripe.com/cNi7sK5fxgqD5I534Kg7e04",
    },
    packageRoute: "/pricing#ai-office-ops",
    analyticsPackageId: "repeat_revenue_monthly",
    notes: [
      "Workflow monitoring, prompt/SOP updates, broken automation fixes, staff support, and small improvements.",
      "Monthly proof report keeps the owner clear on what is working.",
    ],
  },
  {
    id: "both_systems_monthly",
    publicName: "AI Office Installation Sprint + Ops",
    shortCheckoutName: "Sprint + Ops Monthly",
    price: 500,
    priceDisplay: "$3,500 starting + $500/mo starting",
    billingPeriod: "monthly",
    setupFee: 3500,
    setupFeeDisplay: "$3,500 starting installation",
    waivedSetup: false,
    waivedSetupDisplay: null,
    auditCredit: 194,
    auditCreditDisplay: "-$194",
    auditCreditLabel: "If you bought the AI Profit Map first",
    firstYearCostAfterAuditCredit: 9306,
    firstYearCostAfterAuditCreditDisplay: "$9,306 starting first year after credit",
    savings: null,
    badge: "Install + improve",
    cta: "Buy the $197 AI Profit Map",
    stripePaymentLink: {
      envName: "NEXT_PUBLIC_STRIPE_BOTH_SYSTEMS_MONTHLY_PAYMENT_LINK",
      url: "https://buy.stripe.com/28EbJ0bDV7U7eeBeNsg7e05",
    },
    packageRoute: "/pricing#ai-office-ops",
    analyticsPackageId: "both_systems_monthly",
  },
  {
    id: "cashflow_control_yearly",
    publicName: "AI Office Installation Sprint",
    shortCheckoutName: "AI Office Installation Sprint Legacy Yearly Link",
    price: 3500,
    priceDisplay: "$3,500 starting",
    billingPeriod: "yearly",
    setupFee: 0,
    setupFeeDisplay: "Starting beta install",
    waivedSetup: true,
    waivedSetupDisplay: "Scoped after AI Profit Map",
    auditCredit: 194,
    auditCreditDisplay: "-$194",
    auditCreditLabel: "After AI Profit Map credit",
    firstYearCostAfterAuditCredit: 3306,
    firstYearCostAfterAuditCreditDisplay: "$3,306 starting after credit",
    savings: null,
    badge: "Legacy checkout link retained",
    cta: "See the AI Office Installation Sprint",
    stripePaymentLink: {
      envName: "NEXT_PUBLIC_STRIPE_CASHFLOW_CONTROL_YEARLY_PAYMENT_LINK",
      url: "https://buy.stripe.com/aFa3cu5fxa2f3zX7l0g7e07",
    },
    packageRoute: "/systems-installation-sprint",
    analyticsPackageId: "cashflow_control_yearly",
  },
  {
    id: "repeat_revenue_yearly",
    publicName: "AI Office Ops",
    shortCheckoutName: "AI Office Ops Legacy Yearly Link",
    price: 6000,
    priceDisplay: "$500/mo starting",
    billingPeriod: "yearly",
    setupFee: 0,
    setupFeeDisplay: "$0 setup after Sprint",
    waivedSetup: true,
    waivedSetupDisplay: "Scoped after AI Office Installation Sprint",
    auditCredit: 0,
    auditCreditDisplay: "Sprint installed first",
    auditCreditLabel: "After AI Profit Map credit",
    firstYearCostAfterAuditCredit: 6000,
    firstYearCostAfterAuditCreditDisplay: "$6,000/year starting",
    savings: null,
    badge: "Legacy checkout link retained",
    cta: "Ask about AI Office Ops",
    stripePaymentLink: {
      envName: "NEXT_PUBLIC_STRIPE_REPEAT_REVENUE_YEARLY_PAYMENT_LINK",
      url: "https://buy.stripe.com/6oUaEW0Zh7U72vTcFkg7e06",
    },
    packageRoute: "/pricing#ai-office-ops",
    analyticsPackageId: "repeat_revenue_yearly",
  },
  {
    id: "both_systems_yearly",
    publicName: "AI Office Installation Sprint + Ops",
    shortCheckoutName: "Sprint + Ops Legacy Yearly Link",
    price: 9500,
    priceDisplay: "$3,500 starting + $500/mo starting",
    billingPeriod: "yearly",
    setupFee: 3500,
    setupFeeDisplay: "$3,500 starting installation",
    waivedSetup: true,
    waivedSetupDisplay: "Scoped after AI Profit Map",
    auditCredit: 194,
    auditCreditDisplay: "-$194",
    auditCreditLabel: "After AI Profit Map credit",
    firstYearCostAfterAuditCredit: 9306,
    firstYearCostAfterAuditCreditDisplay: "$9,306 starting first year after credit",
    savings: null,
    badge: "Legacy checkout link retained",
    cta: "Buy the $197 AI Profit Map",
    stripePaymentLink: {
      envName: "NEXT_PUBLIC_STRIPE_BOTH_SYSTEMS_YEARLY_PAYMENT_LINK",
      url: "https://buy.stripe.com/eVq3cu9vN5LZgmJfRwg7e08",
    },
    packageRoute: "/pricing#ai-office-ops",
    analyticsPackageId: "both_systems_yearly",
    notes: [
      "Old Stripe Payment Link retained temporarily by Jaden approval; public offer copy is AI Office.",
    ],
  },
]

export const pricingPackageById = Object.fromEntries(
  pricingPackages.map((pricingPackage) => [pricingPackage.id, pricingPackage]),
) as Record<PricingPackageId, PricingPackage>

export const monthlyPricingPackages = pricingPackages.filter(
  (pricingPackage) => pricingPackage.billingPeriod === "monthly",
)

export const yearlyPricingPackages = pricingPackages.filter(
  (pricingPackage) => pricingPackage.billingPeriod === "yearly",
)

export const workflowAuditPricingPackage = pricingPackageById.workflow_audit
export const commandMapPricingPackage = pricingPackageById.ai_office_command_map
export const foundingInstallationPricingPackage = pricingPackageById.founding_ai_office_installation
export const foundingOpsPricingPackage = pricingPackageById.founding_ai_office_ops

export const pricingSourceOfTruthNotes = [
  "Approved public path: $197 AI Office Command Map, then application-first Founding Partner AI Office Installation and Ops.",
  "Public prices: $197 one time, $3,500 one-time setup, and $500/month with the founding-plan base rate locked for life.",
  "Legacy package IDs and the existing $197 Payment Link are intentionally retained for callback compatibility.",
  "Do not create or change Stripe links in this rewrite pass.",
]
