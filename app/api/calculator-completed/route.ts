import { NextResponse } from "next/server"

const WEBHOOK_URL = process.env.STANLEY_CALCULATOR_COMPLETED_WEBHOOK_URL || process.env.STANLEY_CONTACT_WEBHOOK_URL

type JsonRecord = Record<string, unknown>

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 500) : ""
}

function cleanNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string") {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return 0
}

function cleanRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {}
}

function money(value: unknown) {
  return `$${Math.round(cleanNumber(value)).toLocaleString()}`
}

function moneyRange(min: unknown, max: unknown) {
  const low = cleanNumber(min)
  const high = cleanNumber(max)
  if (low === high) return money(low)
  return `${money(low)}–${money(high)}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    const inputs = cleanRecord(body?.inputs)
    const results = cleanRecord(body?.results)
    const attribution = cleanRecord(body?.attribution)

    if (!Object.keys(inputs).length || !Object.keys(results).length) {
      return NextResponse.json({ ok: false, error: "Missing calculator completion fields." }, { status: 400 })
    }

    const completedAt = cleanString(body?.completed_at) || new Date().toISOString()
    const sourcePage = cleanString(body?.source_page) || "/invoicing-delay-cash-flow-calculator"
    const visitorId = cleanString(body?.visitor_id)
    const sessionId = cleanString(body?.session_id)

    const totalMonthlyMin = cleanNumber(results.total_monthly_leak_min)
    const totalMonthlyMax = cleanNumber(results.total_monthly_leak_max)
    const totalAnnualMin = cleanNumber(results.total_annual_leak_min)
    const totalAnnualMax = cleanNumber(results.total_annual_leak_max)

    const payload = {
      telegram_alert_type: "calculator_completed",
      status: "calculator_completed",
      form_type: "calculator_completed",
      source: "stanley-website-calculator",
      source_page: sourcePage,
      page: sourcePage,
      completed_at: completedAt,
      submitted_at: completedAt,
      visitor_id: visitorId,
      session_id: sessionId,
      inputs: {
        average_invoice_value: cleanNumber(inputs.average_invoice_value),
        jobs_per_month: cleanNumber(inputs.jobs_per_month),
        invoice_delay_days: cleanNumber(inputs.invoice_delay_days),
        office_hours_lost_per_job: cleanNumber(inputs.office_hours_lost_per_job),
        unbilled_jobs: cleanNumber(inputs.unbilled_jobs),
        correction_rate_percent: cleanNumber(inputs.correction_rate_percent),
        customer_list_sources: Array.isArray(inputs.customer_list_sources) ? inputs.customer_list_sources.map(cleanString).filter(Boolean).slice(0, 8) : [],
        saved_customer_records: cleanNumber(inputs.saved_customer_records),
        average_repeat_job_value: cleanNumber(inputs.average_repeat_job_value),
        uncontacted_customer_rate: cleanString(inputs.uncontacted_customer_rate),
        review_followup: cleanString(inputs.review_followup),
        referral_followup: cleanString(inputs.referral_followup),
        missed_call_recovery: cleanString(inputs.missed_call_recovery),
        missed_calls_per_month: cleanNumber(inputs.missed_calls_per_month),
      },
      results: {
        total_monthly_leak_min: totalMonthlyMin,
        total_monthly_leak_max: totalMonthlyMax,
        total_annual_leak_min: totalAnnualMin,
        total_annual_leak_max: totalAnnualMax,
        cash_monthly_leak: cleanNumber(results.cash_monthly_leak),
        customer_monthly_leak_min: cleanNumber(results.customer_monthly_leak_min),
        customer_monthly_leak_max: cleanNumber(results.customer_monthly_leak_max),
        estimated_underworked_customers: cleanNumber(results.estimated_underworked_customers),
        recommended_first_move: cleanString(results.recommended_first_move),
        biggest_cash_driver: cleanString(results.biggest_cash_driver),
        biggest_customer_driver: cleanString(results.biggest_customer_driver),
        formatted_headline_range: cleanString(results.formatted_headline_range),
        formatted_monthly_range: cleanString(results.formatted_monthly_range),
      },
      attribution: {
        referrer: cleanString(attribution.referrer),
        utm_source: cleanString(attribution.utm_source),
        utm_medium: cleanString(attribution.utm_medium),
        utm_campaign: cleanString(attribution.utm_campaign),
        utm_content: cleanString(attribution.utm_content),
        utm_term: cleanString(attribution.utm_term),
      },
      telegram_message: [
        "🧮 Calculator completed",
        `Monthly leak: ${moneyRange(totalMonthlyMin, totalMonthlyMax)}`,
        `Annual leak: ${moneyRange(totalAnnualMin, totalAnnualMax)}`,
        `Cash drag: ${money(results.cash_monthly_leak)}/mo`,
        `Customer drag: ${moneyRange(results.customer_monthly_leak_min, results.customer_monthly_leak_max)}/mo`,
        `Jobs/mo: ${cleanNumber(inputs.jobs_per_month).toLocaleString()}`,
        `Avg invoice: ${money(inputs.average_invoice_value)}`,
        `Saved customers: ${cleanNumber(inputs.saved_customer_records).toLocaleString()}`,
        `Missed calls/mo: ${cleanNumber(inputs.missed_calls_per_month).toLocaleString()}`,
        cleanString(results.recommended_first_move) ? `First move: ${cleanString(results.recommended_first_move)}` : "",
        visitorId ? `Visitor: ${visitorId}` : "",
      ].filter(Boolean).join("\n"),
    }

    if (!WEBHOOK_URL) {
      return NextResponse.json({ ok: true, delivery: "not-configured", message: "Calculator completion captured, but no webhook URL is configured." })
    }

    const webhookResponse = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!webhookResponse.ok) {
      const responseText = await webhookResponse.text().catch(() => "")
      return NextResponse.json(
        { ok: false, error: "Calculator webhook failed.", detail: responseText || `Webhook returned ${webhookResponse.status}` },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true, delivery: "webhook" })
  } catch {
    return NextResponse.json({ ok: false, error: "Could not process calculator completion." }, { status: 500 })
  }
}
