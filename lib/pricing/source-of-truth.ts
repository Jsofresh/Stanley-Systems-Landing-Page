export type PricingPackageId =
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
  auditCreditLabel: "Included" | "If you bought the Workflow Audit first" | "After audit credit"
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
    id: "workflow_audit",
    publicName: "Workflow Audit",
    shortCheckoutName: "Workflow Audit",
    price: 97,
    priceDisplay: "$97",
    billingPeriod: "one_time",
    setupFee: 0,
    setupFeeDisplay: "$0",
    waivedSetup: false,
    waivedSetupDisplay: null,
    auditCredit: 0,
    auditCreditDisplay: "Credit source: $97 monthly or $194 yearly if a package is bought within 24 hours after the audit call",
    auditCreditLabel: "Included",
    firstYearCostAfterAuditCredit: 97,
    firstYearCostAfterAuditCreditDisplay: "$97",
    savings: null,
    badge: "Paid first step",
    cta: "Buy the Workflow Audit",
    stripePaymentLink: {
      envName: "NEXT_PUBLIC_STRIPE_WORKFLOW_AUDIT_PAYMENT_LINK",
      url: "https://buy.stripe.com/4gM7sKgYffmz7Qd8p4g7e02",
    },
    packageRoute: "/pricing#workflow-audit",
    analyticsPackageId: "workflow_audit",
    notes: [
      "Find the money leaks before buying a system.",
      "Audit credit applies once, requires buying the Workflow Audit first, and is valid for 24 hours after the audit call.",
    ],
  },
  {
    id: "cashflow_control_monthly",
    publicName: "Cashflow Control System",
    shortCheckoutName: "Cashflow Control Monthly",
    price: 397,
    priceDisplay: "$397/mo",
    billingPeriod: "monthly",
    setupFee: 199,
    setupFeeDisplay: "$199 installation",
    waivedSetup: false,
    waivedSetupDisplay: null,
    auditCredit: 97,
    auditCreditDisplay: "-$97",
    auditCreditLabel: "If you bought the Workflow Audit first",
    firstYearCostAfterAuditCredit: 4866,
    firstYearCostAfterAuditCreditDisplay: "$4,866",
    savings: null,
    badge: "Monthly",
    cta: "Buy Cashflow Control Monthly",
    stripePaymentLink: {
      envName: "NEXT_PUBLIC_STRIPE_CASHFLOW_CONTROL_MONTHLY_PAYMENT_LINK",
      url: "https://buy.stripe.com/28E7sKdM38Yb2vTaxcg7e03",
    },
    packageRoute: "/systems/cashflow-control",
    analyticsPackageId: "cashflow_control_monthly",
  },
  {
    id: "repeat_revenue_monthly",
    publicName: "Repeat Revenue System",
    shortCheckoutName: "Repeat Revenue Monthly",
    price: 697,
    priceDisplay: "$697/mo",
    billingPeriod: "monthly",
    setupFee: 349,
    setupFeeDisplay: "$349 installation",
    waivedSetup: false,
    waivedSetupDisplay: null,
    auditCredit: 97,
    auditCreditDisplay: "-$97",
    auditCreditLabel: "If you bought the Workflow Audit first",
    firstYearCostAfterAuditCredit: 8616,
    firstYearCostAfterAuditCreditDisplay: "$8,616",
    savings: null,
    badge: "Monthly",
    cta: "Buy Repeat Revenue Monthly",
    stripePaymentLink: {
      envName: "NEXT_PUBLIC_STRIPE_REPEAT_REVENUE_MONTHLY_PAYMENT_LINK",
      url: "https://buy.stripe.com/cNi7sK5fxgqD5I534Kg7e04",
    },
    packageRoute: "/systems/repeat-revenue",
    analyticsPackageId: "repeat_revenue_monthly",
  },
  {
    id: "both_systems_monthly",
    publicName: "Both Systems",
    shortCheckoutName: "Both Systems Monthly",
    price: 897,
    priceDisplay: "$897/mo",
    billingPeriod: "monthly",
    setupFee: 449,
    setupFeeDisplay: "$449 installation",
    waivedSetup: false,
    waivedSetupDisplay: null,
    auditCredit: 97,
    auditCreditDisplay: "-$97",
    auditCreditLabel: "If you bought the Workflow Audit first",
    firstYearCostAfterAuditCredit: 11116,
    firstYearCostAfterAuditCreditDisplay: "$11,116",
    savings: {
      label: "Separate monthly total would be $1,094/mo",
      amount: 197,
      display: "Save $197/mo vs buying both separately",
    },
    badge: "Best value monthly",
    cta: "Buy Both Monthly",
    stripePaymentLink: {
      envName: "NEXT_PUBLIC_STRIPE_BOTH_SYSTEMS_MONTHLY_PAYMENT_LINK",
      url: "https://buy.stripe.com/28EbJ0bDV7U7eeBeNsg7e05",
    },
    packageRoute: "/systems/both-systems",
    analyticsPackageId: "both_systems_monthly",
    notes: [
      "Launch blocker from Stripe spot-check: this Payment Link currently shows a $495 install line, while the approved model is $449 installation.",
    ],
  },
  {
    id: "cashflow_control_yearly",
    publicName: "Cashflow Control System",
    shortCheckoutName: "Cashflow Control Yearly",
    price: 3810,
    priceDisplay: "$3,810/yr",
    billingPeriod: "yearly",
    setupFee: 199,
    setupFeeDisplay: "$199 installation",
    waivedSetup: true,
    waivedSetupDisplay: "$199 installation waived",
    auditCredit: 194,
    auditCreditDisplay: "-$194",
    auditCreditLabel: "After audit credit",
    firstYearCostAfterAuditCredit: 3616,
    firstYearCostAfterAuditCreditDisplay: "$3,616",
    savings: {
      label: "Compared with Cashflow Control monthly first year after audit credit",
      amount: 1250,
      display: "Save $1,250 in year one vs monthly",
    },
    badge: "Yearly",
    cta: "Buy Cashflow Yearly",
    stripePaymentLink: {
      envName: "NEXT_PUBLIC_STRIPE_CASHFLOW_CONTROL_YEARLY_PAYMENT_LINK",
      url: "https://buy.stripe.com/aFa3cu5fxa2f3zX7l0g7e07",
    },
    packageRoute: "/systems/cashflow-control",
    analyticsPackageId: "cashflow_control_yearly",
  },
  {
    id: "repeat_revenue_yearly",
    publicName: "Repeat Revenue System",
    shortCheckoutName: "Repeat Revenue Yearly",
    price: 6690,
    priceDisplay: "$6,690/yr",
    billingPeriod: "yearly",
    setupFee: 349,
    setupFeeDisplay: "$349 installation",
    waivedSetup: true,
    waivedSetupDisplay: "$349 installation waived",
    auditCredit: 194,
    auditCreditDisplay: "-$194",
    auditCreditLabel: "After audit credit",
    firstYearCostAfterAuditCredit: 6496,
    firstYearCostAfterAuditCreditDisplay: "$6,496",
    savings: {
      label: "Compared with Repeat Revenue monthly first year after audit credit",
      amount: 2120,
      display: "Save $2,120 in year one vs monthly",
    },
    badge: "Yearly",
    cta: "Buy Repeat Revenue Yearly",
    stripePaymentLink: {
      envName: "NEXT_PUBLIC_STRIPE_REPEAT_REVENUE_YEARLY_PAYMENT_LINK",
      url: "https://buy.stripe.com/6oUaEW0Zh7U72vTcFkg7e06",
    },
    packageRoute: "/systems/repeat-revenue",
    analyticsPackageId: "repeat_revenue_yearly",
  },
  {
    id: "both_systems_yearly",
    publicName: "Both Systems",
    shortCheckoutName: "Both Systems Yearly",
    price: 8610,
    priceDisplay: "$8,610/yr",
    billingPeriod: "yearly",
    setupFee: 449,
    setupFeeDisplay: "$449 installation",
    waivedSetup: true,
    waivedSetupDisplay: "$449 installation waived",
    auditCredit: 194,
    auditCreditDisplay: "-$194",
    auditCreditLabel: "After audit credit",
    firstYearCostAfterAuditCredit: 8416,
    firstYearCostAfterAuditCreditDisplay: "$8,416",
    savings: {
      label: "Compared with Both Systems monthly first year after audit credit",
      amount: 2700,
      display: "Save $2,700 vs monthly first year",
    },
    badge: "Best value yearly",
    cta: "Buy Both Yearly",
    stripePaymentLink: {
      envName: "NEXT_PUBLIC_STRIPE_BOTH_SYSTEMS_YEARLY_PAYMENT_LINK",
      url: "https://buy.stripe.com/eVq3cu9vN5LZgmJfRwg7e08",
    },
    packageRoute: "/systems/both-systems",
    analyticsPackageId: "both_systems_yearly",
    notes: [
      "Stripe visible product name spot-check uses Cashflow Control + Repeat Revenue Yearly; approve or rename to Both Systems Yearly before launch.",
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

export const pricingSourceOfTruthNotes = [
  "Public Package 2 name changed from Customer Revenue System to Repeat Revenue System.",
  "Do not use Customer Revenue System, Follow-Up System, or Cash Collection System as public package names.",
  "Bought the Workflow Audit first? Use your audit credit code at checkout.",
  "$97 audit credit applies to monthly plans; $194 audit credit applies to yearly plans; credit is valid for 24 hours after the audit call and applies once.",
  "Use Stripe Payment Links v1 only; do not add Stripe secret keys or custom Checkout Sessions for this rework phase.",
]
