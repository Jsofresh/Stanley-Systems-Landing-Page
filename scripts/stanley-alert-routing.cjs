function escapeHtml(value) {
  if (value === undefined || value === null) return ""
  if (typeof value === "object") return JSON.stringify(value)
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function value(src, keys, fallback = "") {
  for (const key of keys) {
    const current = src?.[key]
    if (current !== undefined && current !== null && current !== "") return current
  }
  return fallback
}

function safe(src, keys, fallback = "") {
  return escapeHtml(value(src, keys, fallback))
}

function optional(src, keys) {
  const current = value(src, keys, "")
  return current === "" ? "Not provided" : escapeHtml(current)
}

function money(input) {
  const number = Number(input)
  if (!Number.isFinite(number)) return "$0"
  return `$${Math.round(number).toLocaleString("en-US")}`
}

function moneyRange(min, max) {
  const low = Number(min)
  const high = Number(max)
  if (!Number.isFinite(low) && !Number.isFinite(high)) return "Not provided"
  if (!Number.isFinite(high) || low === high) return money(low)
  return `${money(low)}–${money(high)}`
}

function submitted(src) {
  return safe(src, ["submitted_at", "submittedAt", "timestamp", "completed_at"], new Date().toISOString())
}

function page(src) {
  return safe(src, ["page", "source_page", "sourcePage", "page_source", "current_path"], "Not provided")
}

function typeOfSubmission(src) {
  return String(value(src, ["telegram_alert_type", "form_type", "status", "source"], "unknown"))
}

function calculatorStartedMessage(src) {
  if (src.telegram_message) return escapeHtml(src.telegram_message)
  const inputs = src.inputs || {}
  return [
    "🟢 Calculator started",
    `Page: ${page(src)}`,
    `Avg invoice: ${escapeHtml(money(inputs.average_invoice_value))}`,
    `Jobs/mo: ${escapeHtml(value(inputs, ["jobs_per_month"], "Not provided"))}`,
    `Invoice delay: ${escapeHtml(value(inputs, ["invoice_delay_days"], "Not provided"))} days`,
    `Visitor: ${optional(src, ["visitor_id"])}`,
    `Started: ${submitted(src)}`,
  ].join("\n")
}

function calculatorMessage(src) {
  if (src.telegram_message) return escapeHtml(src.telegram_message)
  const results = src.results || {}
  const inputs = src.inputs || {}
  return [
    "🧮 Calculator completed",
    `Monthly leak: ${escapeHtml(moneyRange(results.total_monthly_leak_min, results.total_monthly_leak_max))}`,
    `Annual leak: ${escapeHtml(moneyRange(results.total_annual_leak_min, results.total_annual_leak_max))}`,
    `Cash drag: ${escapeHtml(money(results.cash_monthly_leak))}/mo`,
    `Customer drag: ${escapeHtml(moneyRange(results.customer_monthly_leak_min, results.customer_monthly_leak_max))}/mo`,
    `Jobs/mo: ${escapeHtml(value(inputs, ["jobs_per_month"], "Not provided"))}`,
    `Avg invoice: ${escapeHtml(money(inputs.average_invoice_value))}`,
    `Saved customers: ${escapeHtml(value(inputs, ["saved_customer_records"], "Not provided"))}`,
    `Missed calls/mo: ${escapeHtml(value(inputs, ["missed_calls_per_month"], "Not provided"))}`,
    results.recommended_first_move ? `First move: ${escapeHtml(results.recommended_first_move)}` : "",
  ].filter(Boolean).join("\n")
}

function buildStanleyTelegramMessage(input, options = {}) {
  const src = input?.body || input || {}
  const prefix = options.prefix ? `${options.prefix}\n` : ""
  const kind = typeOfSubmission(src)

  if (kind === "calculator_started") {
    return prefix + calculatorStartedMessage(src)
  }

  if (kind === "calculator_completed") {
    return prefix + calculatorMessage(src)
  }

  if (kind === "money_leak_checks" || src.form_type === "money_leak_checks") {
    return prefix + [
      "🟡 Money Leak Check signup",
      `Email: ${safe(src, ["email"], "Not provided")}`,
      `Phone: ${optional(src, ["phone"])}`,
      `Current system: ${optional(src, ["current_system", "currentSystem"])}`,
      `Source section: ${safe(src, ["source_section", "source"], "Not provided")}`,
      `Page: ${page(src)}`,
      `Submitted: ${submitted(src)}`,
    ].join("\n")
  }

  if (kind === "pre_buy_question" || src.form_type === "pre_buy_question") {
    return prefix + [
      "🟠 Pre-buy question",
      `Name: ${safe(src, ["name"], "Not provided")}`,
      `Business/company: ${safe(src, ["business", "company"], "Not provided")}`,
      `Email: ${safe(src, ["email"], "Not provided")}`,
      `Phone: ${safe(src, ["phone"], "Not provided")}`,
      `Business type: ${optional(src, ["business_type", "businessType"])}`,
      `Main issue / bottleneck: ${safe(src, ["main_issue", "bottleneck", "problem"], "Not provided")}`,
      `Question/message: ${safe(src, ["question", "message"], "Not provided")}`,
      `Page: ${page(src)}`,
      `Submitted: ${submitted(src)}`,
    ].join("\n")
  }

  if (kind === "assessment_intake" || src.form_type === "assessment_intake") {
    return prefix + [
      "🔵 Assessment intake submitted",
      `Name: ${safe(src, ["name"], "Not provided")}`,
      `Business/company: ${safe(src, ["business", "company"], "Not provided")}`,
      `Email: ${safe(src, ["email"], "Not provided")}`,
      `Phone: ${safe(src, ["phone"], "Not provided")}`,
      `Business type: ${optional(src, ["business_type", "businessType"])}`,
      `Where money is stuck / problem: ${safe(src, ["main_issue", "problem"], "Not provided")}`,
      `Workflow context / current process: ${safe(src, ["currentProcess", "current_process", "message"], "Not provided")}`,
      `Page: ${page(src)}`,
      `Submitted: ${submitted(src)}`,
    ].join("\n")
  }

  if (kind === "cash_flow_assessment_application" || src.form_type === "cash_flow_assessment_application" || kind === "contact_form") {
    return prefix + [
      "🟢 Cash Flow Assessment application",
      `Name: ${safe(src, ["name"], "Not provided")}`,
      `Company: ${safe(src, ["company", "business"], "Not provided")}`,
      `Email: ${safe(src, ["email"], "Not provided")}`,
      `Phone: ${safe(src, ["phone"], "Not provided")}`,
      `Business type: ${safe(src, ["businessType", "business_type"], "Not provided")}`,
      `Bottleneck: ${safe(src, ["bottleneck", "main_issue"], "Not provided")}`,
      `Invoice delay: ${optional(src, ["invoiceDelay", "invoice_delay"])}`,
      `Current process: ${safe(src, ["currentProcess", "current_process"], "Not provided")}`,
      `Problem: ${safe(src, ["problem", "message"], "Not provided")}`,
      `Page: ${page(src)}`,
      `Submitted: ${submitted(src)}`,
    ].join("\n")
  }

  if (kind === "paid_buyer_onboarding" || src.form_type === "paid_buyer_onboarding") {
    return prefix + [
      "🧾 Paid buyer onboarding submitted",
      `Name: ${safe(src, ["name"], "Not provided")}`,
      `Business: ${safe(src, ["business", "company"], "Not provided")}`,
      `Email: ${safe(src, ["email"], "Not provided")}`,
      `Phone: ${safe(src, ["phone"], "Not provided")}`,
      `What bought: ${safe(src, ["whatBought", "what_bought"], "Not provided")}`,
      `Field/dispatch system: ${safe(src, ["fieldJobDispatchSystem", "field_job_dispatch_system"], "Not provided")}`,
      `Accounting/billing system: ${safe(src, ["accountingBillingSystem", "accounting_billing_system"], "Not provided")}`,
      `Biggest leak: ${safe(src, ["biggestLeak", "biggest_leak"], "Not provided")}`,
      `Access readiness: ${safe(src, ["accessReadiness", "access_readiness"], "Not provided")}`,
      `Preferred call time: ${safe(src, ["preferredCallTime", "preferred_call_time"], "Not provided")}`,
      `Notes: ${optional(src, ["notes"])}`,
      `Page: ${page(src)}`,
      `Submitted: ${submitted(src)}`,
    ].join("\n")
  }

  return prefix + [
    "⚪ Unknown Stanley website submission",
    `telegram_alert_type: ${optional(src, ["telegram_alert_type"])}`,
    `form_type: ${optional(src, ["form_type"])}`,
    `status: ${optional(src, ["status"])}`,
    `source: ${optional(src, ["source"])}`,
    `source_section: ${optional(src, ["source_section"])}`,
    `page: ${page(src)}`,
    `Submitted: ${submitted(src)}`,
    "Formatter fallback used — inspect payload shape.",
  ].join("\n")
}

module.exports = { buildStanleyTelegramMessage, escapeHtml }
