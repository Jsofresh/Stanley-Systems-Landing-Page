import { NextRequest, NextResponse } from "next/server"
import { appendFile, chmod, mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const STORAGE_DIR = "/home/jaden/.openclaw/data/stanley-demo/jobber-oauth"
const SECRET_FILE = "/home/jaden/.config/stanley-systems-demo/jobber.env"
const TOKEN_FILE = "/home/jaden/.config/stanley-systems-demo/jobber-token.json"
const DEFAULT_REDIRECT_URI = "https://stanley-systems.com/api/jobber/oauth/callback"
const DEFAULT_TOKEN_URL = "https://api.getjobber.com/api/oauth/token"

function utcDayStamp(iso: string) {
  return iso.slice(0, 10)
}

function redactedPresence(value: string | null | undefined) {
  return value ? "present_redacted" : null
}

function parseEnvFile(content: string) {
  const values: Record<string, string> = {}
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const separator = trimmed.indexOf("=")
    if (separator === -1) continue
    const key = trimmed.slice(0, separator).trim()
    let value = trimmed.slice(separator + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    values[key] = value
  }
  return values
}

async function loadJobberConfig() {
  const fileValues = await readFile(SECRET_FILE, "utf8").then(parseEnvFile).catch(() => ({}))
  return {
    clientId: process.env.JOBBER_CLIENT_ID || fileValues.JOBBER_CLIENT_ID || "",
    clientSecret: process.env.JOBBER_CLIENT_SECRET || fileValues.JOBBER_CLIENT_SECRET || "",
    redirectUri: process.env.JOBBER_REDIRECT_URI || fileValues.JOBBER_REDIRECT_URI || DEFAULT_REDIRECT_URI,
    tokenUrl: process.env.JOBBER_TOKEN_URL || fileValues.JOBBER_TOKEN_URL || DEFAULT_TOKEN_URL,
  }
}

async function persistCallback(record: Record<string, unknown>, receivedAt: string) {
  await mkdir(STORAGE_DIR, { recursive: true })
  const dailyLogPath = path.join(STORAGE_DIR, `${utcDayStamp(receivedAt)}.jsonl`)
  await appendFile(dailyLogPath, `${JSON.stringify(record)}\n`, "utf8")
}

function safeTokenSummary(token: Record<string, unknown>) {
  return {
    access_token: redactedPresence(typeof token.access_token === "string" ? token.access_token : null),
    refresh_token: redactedPresence(typeof token.refresh_token === "string" ? token.refresh_token : null),
    token_type: typeof token.token_type === "string" ? token.token_type : null,
    expires_in: typeof token.expires_in === "number" || typeof token.expires_in === "string" ? token.expires_in : null,
    scope: typeof token.scope === "string" ? token.scope : null,
  }
}

async function exchangeAuthorizationCode(code: string) {
  const config = await loadJobberConfig()
  if (!config.clientId || !config.clientSecret) {
    return {
      ok: false as const,
      status: 500,
      summary: { error: "missing_jobber_oauth_config" },
      raw: null,
    }
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: config.clientId,
    client_secret: config.clientSecret,
    redirect_uri: config.redirectUri,
  })

  const response = await fetch(config.tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
    },
    body,
    signal: AbortSignal.timeout(15000),
  })

  const text = await response.text()
  let parsed: Record<string, unknown> = {}
  try {
    parsed = JSON.parse(text)
  } catch {
    parsed = { rawText: text.slice(0, 1000) }
  }

  if (!response.ok) {
    return {
      ok: false as const,
      status: response.status,
      summary: {
        error: typeof parsed.error === "string" ? parsed.error : "jobber_token_exchange_failed",
        error_description: typeof parsed.error_description === "string" ? parsed.error_description : undefined,
      },
      raw: null,
    }
  }

  const stored = {
    source: "jobber",
    savedAt: new Date().toISOString(),
    redirectUri: config.redirectUri,
    token: parsed,
  }

  await mkdir(path.dirname(TOKEN_FILE), { recursive: true })
  await writeFile(TOKEN_FILE, `${JSON.stringify(stored, null, 2)}\n`, "utf8")
  await chmod(TOKEN_FILE, 0o600).catch(() => undefined)

  return {
    ok: true as const,
    status: response.status,
    summary: safeTokenSummary(parsed),
    raw: null,
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const receivedAt = new Date().toISOString()

  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const error = searchParams.get("error")
  const errorDescription = searchParams.get("error_description")

  const baseRecord = {
    source: "jobber",
    event: "oauth_callback",
    receivedAt,
    status: error ? "error" : "received",
    code: redactedPresence(code),
    state: state || null,
    error: error || null,
    errorDescription: errorDescription || null,
  }

  if (error) {
    await persistCallback(baseRecord, receivedAt)
    return NextResponse.json(
      {
        ok: false,
        source: "jobber",
        event: "oauth_callback",
        error,
        errorDescription,
      },
      { status: 400 },
    )
  }

  if (!code) {
    await persistCallback({ ...baseRecord, status: "missing_code" }, receivedAt)
    return NextResponse.json(
      {
        ok: false,
        source: "jobber",
        event: "oauth_callback",
        error: "missing_code",
      },
      { status: 400 },
    )
  }

  const exchange = await exchangeAuthorizationCode(code)
  await persistCallback(
    {
      ...baseRecord,
      status: exchange.ok ? "token_stored" : "token_exchange_failed",
      tokenExchange: exchange.summary,
    },
    receivedAt,
  )

  if (!exchange.ok) {
    return NextResponse.json(
      {
        ok: false,
        source: "jobber",
        event: "oauth_callback",
        code: redactedPresence(code),
        state: state || null,
        tokenExchange: exchange.summary,
      },
      { status: exchange.status || 502 },
    )
  }

  return NextResponse.json({
    ok: true,
    source: "jobber",
    event: "oauth_callback",
    code: redactedPresence(code),
    state: state || null,
    tokenExchange: exchange.summary,
    note: "Jobber OAuth callback exchanged the authorization code and stored tokens in the protected demo token file.",
  })
}
