import { NextResponse } from "next/server"

const WEBHOOK_URL = process.env.STANLEY_CONTACT_WEBHOOK_URL
const FALLBACK_EMAIL = "jaden@stanley-systems.com"

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function cleanBoolean(value: unknown) {
  return value === true
}

function isEmailLike(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function getNestedClean(source: unknown, key: string) {
  if (!source || typeof source !== "object") return ""
  return clean((source as Record<string, unknown>)[key])
}

function cleanAlertType(body: Record<string, unknown>) {
  return clean(body?.telegram_alert_type) || clean(body?.form_type) || clean(body?.status) || "contact_form"
}

function yesNo(value: boolean) {
  return value ? "Yes" : "No"
}

function buildTelegramMessage(payload: Record<string, unknown>) {
  const formType = clean(payload.form_type) || clean(payload.form_name) || clean(payload.telegram_alert_type) || "contact_routing_request"
  const title = formType === "ai_office_map_info"
    ? "🗺️ AI Profit Map info request"
    : formType === "founding_partner_installation"
      ? "Founding Partner installation application"
      : "📬 Stanley Systems website contact"
  const lines = [
    title,
    `Type: ${formType}`,
    `Name: ${clean(payload.name) || "Not provided"}`,
    `Company: ${clean(payload.company) || clean(payload.business) || "Not provided"}`,
    `Email: ${clean(payload.email) || "Not provided"}`,
    `Phone: ${clean(payload.phone) || "Not provided"}`,
    `Business type: ${clean(payload.businessType) || clean(payload.business_type) || "Not provided"}`,
    `Bottleneck: ${clean(payload.bottleneck) || clean(payload.main_issue) || "Not provided"}`,
    `Invoice delay: ${clean(payload.invoiceDelay) || "Not provided"}`,
    `Current process: ${clean(payload.currentProcess) || "Not provided"}`,
    `Workflow to install first: ${clean(payload.workflow_to_install_first) || clean(payload.problem) || clean(payload.message) || "Not provided"}`,
    `Company size: ${clean(payload.company_size) || "Not provided"}`,
    `Office team size: ${clean(payload.office_team_size) || "Not provided"}`,
    `Software stack: ${clean(payload.software_stack) || "Not provided"}`,
    `Considering admin hire: ${clean(payload.considering_admin_hire) || "Not provided"}`,
    `Decision-maker role: ${clean(payload.decision_maker_role) || "Not provided"}`,
    `Readiness timeline: ${clean(payload.readiness_timeline) || "Not provided"}`,
    `Preferred fit-call time: ${clean(payload.preferred_demo_time) || "Not provided"}`,
    `Problem: ${clean(payload.problem) || clean(payload.message) || "Not provided"}`,
    `SMS consent: ${yesNo(payload.smsConsent === true || payload.sms_consent === true)}`,
    `Page: ${clean(payload.page_url) || clean(payload.page) || clean(payload.source_page) || "/contact"}`,
    `Source: ${clean(payload.source) || "website-contact-form"}`,
    `Submitted: ${clean(payload.submitted_at) || clean(payload.submittedAt) || new Date().toISOString()}`,
  ]

  return lines.join("\n")
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const submittedAt = clean(body?.submitted_at) || new Date().toISOString()
    const nestedUtm = body?.utm
    const nestedContext = body?.context
    const workflowToInstallFirst = clean(body?.workflow_to_install_first) || clean(body?.main_issue) || clean(body?.problem) || clean(body?.message)
    const formName = clean(body?.form_name) || clean(body?.form_type) || "contact_form"

    const payload = {
      source: clean(body?.source) || "website-contact-form",
      form_name: formName,
      form_type: clean(body?.form_type) || formName,
      offer: clean(body?.offer),
      intent: clean(body?.intent) || clean(body?.form_type),
      page_url: clean(body?.page_url),
      telegram_alert_type: cleanAlertType(body ?? {}),
      name: clean(body?.name),
      email: clean(body?.email),
      phone: clean(body?.phone),
      business: clean(body?.business) || clean(body?.company),
      company: clean(body?.company) || clean(body?.business),
      location: clean(body?.location),
      business_type: clean(body?.business_type) || clean(body?.businessType),
      workflow_to_install_first: workflowToInstallFirst,
      company_size: clean(body?.company_size),
      office_team_size: clean(body?.office_team_size),
      software_stack: clean(body?.software_stack),
      considering_admin_hire: clean(body?.considering_admin_hire),
      decision_maker_role: clean(body?.decision_maker_role),
      readiness_timeline: clean(body?.readiness_timeline),
      preferred_demo_time: clean(body?.preferred_demo_time),
      main_issue: workflowToInstallFirst,
      message: clean(body?.message) || workflowToInstallFirst,
      problem: clean(body?.problem) || workflowToInstallFirst,
      question: clean(body?.question) || clean(body?.message),
      current_system: clean(body?.current_system),
      consent: clean(body?.consent),
      timestamp: clean(body?.timestamp) || submittedAt,
      website: clean(body?.website),
      page_source: clean(body?.page_source),
      source_page: clean(body?.source_page) || clean(body?.page) || clean(body?.current_path),
      source_section: clean(body?.source_section) || clean(body?.source),
      current_path: clean(body?.current_path),
      businessType: clean(body?.businessType) || clean(body?.business_type),
      bottleneck: clean(body?.bottleneck),
      invoiceDelay: clean(body?.invoiceDelay),
      currentProcess: clean(body?.currentProcess),
      smsConsent: cleanBoolean(body?.smsConsent) || cleanBoolean(body?.sms_consent),
      sms_consent: cleanBoolean(body?.sms_consent) || cleanBoolean(body?.smsConsent),
      status: clean(body?.status) || "contact_request",
      utm_source: clean(body?.utm_source) || getNestedClean(nestedUtm, "source"),
      utm_medium: clean(body?.utm_medium) || getNestedClean(nestedUtm, "medium"),
      utm_campaign: clean(body?.utm_campaign) || getNestedClean(nestedUtm, "campaign"),
      utm_content: clean(body?.utm_content) || getNestedClean(nestedUtm, "content"),
      utm_term: clean(body?.utm_term) || getNestedClean(nestedUtm, "term"),
      utm: {
        source: clean(body?.utm_source) || getNestedClean(nestedUtm, "source"),
        medium: clean(body?.utm_medium) || getNestedClean(nestedUtm, "medium"),
        campaign: clean(body?.utm_campaign) || getNestedClean(nestedUtm, "campaign"),
        term: clean(body?.utm_term) || getNestedClean(nestedUtm, "term"),
        content: clean(body?.utm_content) || getNestedClean(nestedUtm, "content"),
      },
      context: {
        section: getNestedClean(nestedContext, "section") || clean(body?.source_section),
        cta_text: getNestedClean(nestedContext, "cta_text"),
      },
      referrer: clean(body?.referrer),
      page: clean(body?.page) || "/contact",
      submitted_at: submittedAt,
      submittedAt: new Date().toISOString(),
    }

    const telegram_message = buildTelegramMessage(payload)
    const webhookPayload = {
      ...payload,
      telegram_message,
    }

    if (payload.website) {
      return NextResponse.json({ ok: true, message: "Thanks. Stanley Systems received your note.", delivery: "filtered" })
    }

    if (payload.form_type === "assessment_intake") {
      if (!payload.name || !payload.email || !payload.phone || !payload.company || !payload.problem || !payload.currentProcess) {
        return NextResponse.json(
          { ok: false, error: "Missing required fields." },
          { status: 400 },
        )
      }
    } else if (payload.form_type === "pre_buy_question") {
      if (!payload.name || !payload.email || !payload.company || !payload.problem) {
        return NextResponse.json(
          { ok: false, error: "Missing required fields." },
          { status: 400 },
        )
      }
    } else if (payload.form_type === "money_leak_checks") {
      if (!payload.email) {
        return NextResponse.json(
          { ok: false, error: "Email is required for leak checks." },
          { status: 400 },
        )
      }
    } else if (payload.form_type === "founding_partner_installation" || payload.form_name === "founding_partner_installation") {
      if (!payload.name || !payload.email || !isEmailLike(payload.email) || !payload.company || !payload.businessType || !payload.workflow_to_install_first || !payload.company_size || !payload.office_team_size || !payload.software_stack || !payload.considering_admin_hire || !payload.decision_maker_role || !payload.readiness_timeline || !payload.preferred_demo_time || !payload.smsConsent) {
        return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 })
      }
    } else if (payload.form_type === "installation_sprint_contact" || payload.form_type === "start_sprint_contact" || payload.form_name === "start_sprint_contact") {
      if (!payload.name || !payload.email || !isEmailLike(payload.email) || !payload.company || !payload.businessType || !payload.workflow_to_install_first || !payload.smsConsent) {
        return NextResponse.json(
          { ok: false, error: "Missing required fields." },
          { status: 400 },
        )
      }
    } else if (payload.form_type === "ai_office_map_info") {
      if (!payload.name || !payload.email || !payload.company || !payload.businessType || !payload.problem) {
        return NextResponse.json(
          { ok: false, error: "Missing required fields." },
          { status: 400 },
        )
      }
    } else if (!payload.name || !payload.email || !payload.company || !payload.businessType || !payload.bottleneck || !payload.currentProcess || !payload.problem) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 },
      )
    }

    if (WEBHOOK_URL) {
      const webhookResponse = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookPayload),
        signal: AbortSignal.timeout(8000),
      })

      if (!webhookResponse.ok) {
        const responseText = await webhookResponse.text().catch(() => "")
        return NextResponse.json(
          {
            ok: false,
            error: "Contact webhook failed.",
            detail: responseText || `Webhook returned ${webhookResponse.status}`,
          },
          { status: 502 },
        )
      }
    }

    return NextResponse.json({
      ok: true,
      message: WEBHOOK_URL
        ? (payload.form_name === "founding_partner_installation" || payload.form_type === "founding_partner_installation"
          ? "Got it. Stanley Systems will review fit and reply with the next step for the Founding Partner installation."
          : "Thanks. Stanley Systems received your note and will reply soon.")
        : `Thanks. Stanley Systems saved your message path, but STANLEY_CONTACT_WEBHOOK_URL is not set yet. For now, email ${FALLBACK_EMAIL}.`,
      delivery: WEBHOOK_URL ? "webhook" : "not-configured",
    })
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not process contact request." },
      { status: 500 },
    )
  }
}
