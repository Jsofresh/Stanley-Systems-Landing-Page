const assert = require("node:assert/strict")
const fs = require("node:fs")
const path = require("node:path")
const { buildStanleyTelegramMessage } = require("./stanley-alert-routing.cjs")

const fixedTime = "2026-05-30T13:00:00.000Z"

const fixtures = [
  {
    name: "calculator started",
    payload: {
      telegram_alert_type: "calculator_started",
      form_type: "calculator_started",
      source_page: "/invoicing-delay-cash-flow-calculator",
      visitor_id: "visitor-123",
      inputs: { jobs_per_month: 25, average_invoice_value: 1200, invoice_delay_days: 4 },
      started_at: fixedTime,
    },
    title: "🟢 Calculator started",
    mustInclude: ["Page: /invoicing-delay-cash-flow-calculator", "Avg invoice: $1,200", "Jobs/mo: 25", "Invoice delay: 4 days", "Visitor: visitor-123"],
    mustNotInclude: ["🟢 New Stanley website form lead", "Name: Not captured", "Company: Not captured"],
  },
  {
    name: "calculator with telegram_message",
    payload: {
      telegram_alert_type: "calculator_completed",
      form_type: "calculator_completed",
      telegram_message: "🧮 Calculator completed\nMonthly leak: $1,000–$2,000\nFirst move: Fix <billing> & follow-up",
      submitted_at: fixedTime,
    },
    title: "🧮 Calculator completed",
    mustInclude: ["Monthly leak", "Fix &lt;billing&gt; &amp; follow-up"],
    mustNotInclude: ["🟢 New Stanley website form lead", "Name: Not captured", "Company: Not captured"],
  },
  {
    name: "calculator without telegram_message",
    payload: {
      telegram_alert_type: "calculator_completed",
      form_type: "calculator_completed",
      inputs: { jobs_per_month: 25, average_invoice_value: 1200, saved_customer_records: 400, missed_calls_per_month: 7 },
      results: {
        total_monthly_leak_min: 3000,
        total_monthly_leak_max: 5000,
        total_annual_leak_min: 36000,
        total_annual_leak_max: 60000,
        cash_monthly_leak: 1500,
        customer_monthly_leak_min: 500,
        customer_monthly_leak_max: 900,
        recommended_first_move: "Review <open> invoices & old customers",
      },
      submitted_at: fixedTime,
    },
    title: "🧮 Calculator completed",
    mustInclude: ["Annual leak: $36,000–$60,000", "Review &lt;open&gt; invoices &amp; old customers"],
    mustNotInclude: ["🟢 New Stanley website form lead", "Name: Not captured", "Company: Not captured"],
  },
  {
    name: "money leak checks",
    payload: {
      telegram_alert_type: "money_leak_checks",
      form_type: "money_leak_checks",
      email: "test@example.com",
      phone: "",
      current_system: "HCP < QuickBooks & Sheets",
      source_section: "home-leak-checks",
      page: "/",
      submitted_at: fixedTime,
    },
    title: "🟡 Money Leak Check signup",
    mustInclude: ["Email: test@example.com", "Phone: Not provided", "Current system: HCP &lt; QuickBooks &amp; Sheets", "Source section: home-leak-checks"],
    mustNotInclude: ["Name:", "Company:", "🟢 New Stanley website form lead"],
  },
  {
    name: "pre-buy question",
    payload: {
      telegram_alert_type: "pre_buy_question",
      form_type: "pre_buy_question",
      name: "Pat <Owner>",
      business: "ACME & Sons",
      email: "pat@example.com",
      phone: "555-0100",
      business_type: "HVAC",
      main_issue: "Invoices",
      message: "Will this work with QBO?",
      page: "/contact",
      submitted_at: fixedTime,
    },
    title: "🟠 Pre-buy question",
    mustInclude: ["Pat &lt;Owner&gt;", "ACME &amp; Sons", "Question/message: Will this work with QBO?"],
    mustNotInclude: ["🟢 New Stanley website form lead"],
  },
  {
    name: "assessment intake",
    payload: {
      telegram_alert_type: "assessment_intake",
      form_type: "assessment_intake",
      name: "Ari",
      company: "Pipe Co",
      email: "ari@example.com",
      phone: "555-0101",
      businessType: "Plumbing",
      problem: "Open balances",
      currentProcess: "Spreadsheet > QBO",
      page: "/audit-intake",
      submitted_at: fixedTime,
    },
    title: "🔵 Assessment intake submitted",
    mustInclude: ["Where money is stuck / problem: Open balances", "Workflow context / current process: Spreadsheet &gt; QBO"],
    mustNotInclude: ["🟢 New Stanley website form lead"],
  },
  {
    name: "cash flow application",
    payload: {
      telegram_alert_type: "cash_flow_assessment_application",
      form_type: "cash_flow_assessment_application",
      name: "Lee",
      company: "Roof Co",
      email: "lee@example.com",
      phone: "555-0102",
      businessType: "Roofing",
      bottleneck: "Estimate follow-up",
      invoiceDelay: "3-7 days",
      currentProcess: "CSR notes",
      problem: "Dropped leads",
      page: "/contact",
      submitted_at: fixedTime,
    },
    title: "🟢 Cash Flow Assessment application",
    mustInclude: ["Bottleneck: Estimate follow-up", "Invoice delay: 3-7 days"],
    mustNotInclude: ["🟢 New Stanley website form lead"],
  },
  {
    name: "paid buyer onboarding",
    payload: {
      telegram_alert_type: "paid_buyer_onboarding",
      form_type: "paid_buyer_onboarding",
      name: "Morgan",
      business: "Marine Co",
      email: "morgan@example.com",
      phone: "555-0103",
      whatBought: "Cash Flow Assessment",
      fieldJobDispatchSystem: "ServiceTitan",
      accountingBillingSystem: "QuickBooks",
      biggestLeak: "Billing delay",
      accessReadiness: "Ready now",
      preferredCallTime: "Tuesday morning",
      notes: "Uses <field> & office flow",
      page: "/checkout/onboarding",
      submitted_at: fixedTime,
    },
    title: "🧾 Paid buyer onboarding submitted",
    mustInclude: ["What bought: Cash Flow Assessment", "Notes: Uses &lt;field&gt; &amp; office flow"],
    mustNotInclude: ["🟢 New Stanley website form lead"],
  },
  {
    name: "unknown fallback",
    payload: { telegram_alert_type: "new_future_form", form_type: "future", source: "new-section", page: "/new", submitted_at: fixedTime },
    title: "⚪ Unknown Stanley website submission",
    mustInclude: ["telegram_alert_type: new_future_form", "Formatter fallback used — inspect payload shape."],
    mustNotInclude: ["🟢 New Stanley website form lead"],
  },
]

for (const fixture of fixtures) {
  const output = buildStanleyTelegramMessage(fixture.payload)
  assert.match(output, new RegExp(fixture.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), fixture.name)
  for (const text of fixture.mustInclude) assert.ok(output.includes(text), `${fixture.name} missing ${text}\n${output}`)
  for (const text of fixture.mustNotInclude) assert.ok(!output.includes(text), `${fixture.name} should not include ${text}\n${output}`)
  assert.ok(!/undefined|null|\[object Object\]/.test(output), `${fixture.name} leaked invalid placeholder: ${output}`)
}

const repo = path.resolve(__dirname, "..")
const sourceChecks = [
  ["app/api/contact/route.ts", 'telegram_alert_type: cleanAlertType'],
  ["app/api/calculator-started/route.ts", 'telegram_alert_type: "calculator_started"'],
  ["app/api/calculator-completed/route.ts", 'telegram_alert_type: "calculator_completed"'],
  ["app/api/checkout/onboarding/route.ts", 'telegram_alert_type: "paid_buyer_onboarding"'],
  ["components/money-leak-checks-form.tsx", 'telegram_alert_type: "money_leak_checks"'],
  ["components/contact-router.tsx", 'telegram_alert_type: "pre_buy_question"'],
  ["components/contact-section.tsx", 'telegram_alert_type: "cash_flow_assessment_application"'],
  ["components/audit-intake-form.tsx", 'telegram_alert_type: "assessment_intake"'],
  ["components/checkout/BuyerOnboardingForm.tsx", 'telegram_alert_type: "paid_buyer_onboarding"'],
  ["app/invoicing-delay-cash-flow-calculator/calculator-client.tsx", 'telegram_alert_type: "calculator_completed"'],
  ["app/invoicing-delay-cash-flow-calculator/calculator-client.tsx", 'telegram_alert_type: "calculator_started"'],
]
for (const [relativePath, expected] of sourceChecks) {
  const contents = fs.readFileSync(path.join(repo, relativePath), "utf8")
  assert.ok(contents.includes(expected), `${relativePath} missing ${expected}`)
}

console.log(`PASS stanley alert routing smoke: ${fixtures.length} formatter fixtures + ${sourceChecks.length} source checks`)
