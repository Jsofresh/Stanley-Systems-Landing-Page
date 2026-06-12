import type { AiOfficeBlueprintIntake } from "./types"

const WEBHOOK_URL = process.env.AI_OFFICE_BLUEPRINT_WEBHOOK_URL
const AUTH_HEADER = process.env.AI_OFFICE_BLUEPRINT_WEBHOOK_AUTH_HEADER
const AUTH_TOKEN = process.env.AI_OFFICE_BLUEPRINT_WEBHOOK_AUTH_TOKEN

function safeHeaderName(value: string | undefined) {
  if (!value || !/^[A-Za-z0-9-]+$/.test(value)) return null
  return value
}

export async function forwardBlueprintRequest(submissionId: string, intake: AiOfficeBlueprintIntake) {
  if (!WEBHOOK_URL) {
    return { delivery: "mock" as const, accepted: true }
  }

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
      submittedAt: new Date().toISOString(),
      intake,
    }),
    signal: AbortSignal.timeout(10000),
  })

  const responseBody = await response.json().catch(async () => {
    const text = await response.text().catch(() => "")
    return text ? { message: text } : {}
  })

  if (!response.ok) {
    return {
      delivery: "webhook" as const,
      accepted: false,
      status: response.status,
      response: responseBody,
    }
  }

  return {
    delivery: "webhook" as const,
    accepted: true,
    status: response.status,
    response: responseBody,
  }
}
