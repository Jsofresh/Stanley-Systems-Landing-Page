import type { AiOfficeBlueprintIntake } from "./types"

const WEBHOOK_URL = process.env.AI_OFFICE_BLUEPRINT_WEBHOOK_URL
const CONTACT_WEBHOOK_URL = process.env.STANLEY_CONTACT_WEBHOOK_URL
const AUTH_HEADER = process.env.AI_OFFICE_BLUEPRINT_WEBHOOK_AUTH_HEADER
const AUTH_TOKEN = process.env.AI_OFFICE_BLUEPRINT_WEBHOOK_AUTH_TOKEN

function safeHeaderName(value: string | undefined) {
  if (!value || !/^[A-Za-z0-9-]+$/.test(value)) return null
  return value
}

export async function forwardBlueprintRequest(submissionId: string, intake: AiOfficeBlueprintIntake) {
  const submittedAt = new Date().toISOString()

  if (WEBHOOK_URL) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }
    const authHeaderName = safeHeaderName(AUTH_HEADER)
    if (authHeaderName && AUTH_TOKEN) {
      headers[authHeaderName] = AUTH_TOKEN
    }

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        submissionId,
        submittedAt,
        intake,
      }),
      signal: AbortSignal.timeout(10000),
    })

    const responseBody = await response.json().catch(async () => {
      const text = await response.text().catch(() => "")
      return text ? { message: text } : {}
    })

    if (response.ok) {
      return {
        delivery: "webhook" as const,
        accepted: true,
        status: response.status,
        response: responseBody,
      }
    }
  }

  if (!CONTACT_WEBHOOK_URL) {
    return { delivery: "local-preview" as const, accepted: true }
  }

  const fallbackResponse = await fetch(CONTACT_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      telegram_alert_type: "ai_office_blueprint_intake",
      form_type: "ai_office_blueprint_intake",
      source: "website-ai-office-blueprint",
      page: "/ai-office-blueprint",
      status: "blueprint_request",
      submissionId,
      submittedAt,
      name: intake.name,
      email: intake.email,
      business: intake.businessName,
      company: intake.businessName,
      business_type: intake.businessType,
      question: intake.messyOfficeExample,
      message: `AI Office Blueprint request from ${intake.name} at ${intake.businessName}. Business type: ${intake.businessType}. Best output: ${intake.desiredOutputType}.`,
      intake,
    }),
    signal: AbortSignal.timeout(10000),
  })

  const fallbackBody = await fallbackResponse.json().catch(async () => {
    const text = await fallbackResponse.text().catch(() => "")
    return text ? { message: text } : {}
  })

  if (!fallbackResponse.ok) {
    return {
      delivery: "contact-webhook" as const,
      accepted: false,
      status: fallbackResponse.status,
      response: fallbackBody,
    }
  }

  return {
    delivery: "contact-webhook" as const,
    accepted: true,
    status: fallbackResponse.status,
    response: fallbackBody,
  }
}
