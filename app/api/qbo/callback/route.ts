import { NextRequest, NextResponse } from 'next/server'
import { appendFile, chmod, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const STORAGE_DIR = '/home/jaden/.openclaw/data/stanley-demo/qbo-oauth'
const SECRET_FILE = '/home/jaden/.config/stanley-systems-demo/qbo.env'
const TOKEN_FILE = '/home/jaden/.config/stanley-systems-demo/qbo-token.json'
const DEFAULT_REDIRECT_URI = 'https://stanley-systems.com/api/qbo/callback'
const DEFAULT_TOKEN_URL = 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer'

function redactedPresence(value: string | null | undefined) {
  return value ? 'present_redacted' : null
}

function utcDayStamp(iso: string) {
  return iso.slice(0, 10)
}

function parseEnvFile(content: string) {
  const values: Record<string, string> = {}
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const separator = trimmed.indexOf('=')
    if (separator === -1) continue
    const key = trimmed.slice(0, separator).trim()
    let value = trimmed.slice(separator + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1)
    values[key] = value
  }
  return values
}

async function loadQboConfig() {
  const fileValues = await readFile(SECRET_FILE, 'utf8').then(parseEnvFile).catch(() => ({}))
  return {
    clientId: process.env.QBO_CLIENT_ID || fileValues.QBO_CLIENT_ID || '',
    clientSecret: process.env.QBO_CLIENT_SECRET || fileValues.QBO_CLIENT_SECRET || '',
    redirectUri: process.env.QBO_REDIRECT_URI || fileValues.QBO_REDIRECT_URI || DEFAULT_REDIRECT_URI,
    tokenUrl: process.env.QBO_TOKEN_URL || fileValues.QBO_TOKEN_URL || DEFAULT_TOKEN_URL,
    environment: process.env.QBO_ENVIRONMENT || fileValues.QBO_ENVIRONMENT || 'sandbox',
  }
}

async function persist(record: Record<string, unknown>, receivedAt: string) {
  await mkdir(STORAGE_DIR, { recursive: true })
  await appendFile(path.join(STORAGE_DIR, `${utcDayStamp(receivedAt)}.jsonl`), `${JSON.stringify(record)}\n`, 'utf8')
}

async function exchangeCode(code: string, realmId: string | null) {
  const config = await loadQboConfig()
  if (!config.clientId || !config.clientSecret) {
    return { ok: false as const, status: 500, summary: { error: 'missing_qbo_oauth_config' } }
  }

  const auth = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64')
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: config.redirectUri,
  })

  const response = await fetch(config.tokenUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
    signal: AbortSignal.timeout(15000),
  })

  const text = await response.text()
  let parsed: Record<string, unknown>
  try { parsed = JSON.parse(text) } catch { parsed = { rawText: text.slice(0, 1000) } }

  if (!response.ok) {
    return {
      ok: false as const,
      status: response.status,
      summary: {
        error: typeof parsed.error === 'string' ? parsed.error : 'qbo_token_exchange_failed',
        error_description: typeof parsed.error_description === 'string' ? parsed.error_description : undefined,
      },
    }
  }

  const stored = {
    source: 'quickbooks_online',
    environment: config.environment,
    savedAt: new Date().toISOString(),
    realmId,
    redirectUri: config.redirectUri,
    token: parsed,
  }
  await mkdir(path.dirname(TOKEN_FILE), { recursive: true })
  await writeFile(TOKEN_FILE, `${JSON.stringify(stored, null, 2)}\n`, 'utf8')
  await chmod(TOKEN_FILE, 0o600).catch(() => undefined)

  return {
    ok: true as const,
    status: response.status,
    summary: {
      access_token: redactedPresence(typeof parsed.access_token === 'string' ? parsed.access_token : null),
      refresh_token: redactedPresence(typeof parsed.refresh_token === 'string' ? parsed.refresh_token : null),
      token_type: typeof parsed.token_type === 'string' ? parsed.token_type : null,
      expires_in: typeof parsed.expires_in === 'number' || typeof parsed.expires_in === 'string' ? parsed.expires_in : null,
      realmId,
    },
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const receivedAt = new Date().toISOString()
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const realmId = searchParams.get('realmId')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  const baseRecord = {
    source: 'quickbooks_online',
    event: 'oauth_callback',
    receivedAt,
    status: error ? 'error' : 'received',
    code: redactedPresence(code),
    state: state || null,
    realmId: realmId || null,
    error: error || null,
    errorDescription: errorDescription || null,
  }

  if (error) {
    await persist(baseRecord, receivedAt)
    return NextResponse.json({ ok: false, source: 'quickbooks_online', event: 'oauth_callback', error, errorDescription }, { status: 400 })
  }
  if (!code) {
    await persist({ ...baseRecord, status: 'missing_code' }, receivedAt)
    return NextResponse.json({ ok: false, source: 'quickbooks_online', event: 'oauth_callback', error: 'missing_code' }, { status: 400 })
  }
  if (!realmId) {
    await persist({ ...baseRecord, status: 'missing_realm_id' }, receivedAt)
    return NextResponse.json({ ok: false, source: 'quickbooks_online', event: 'oauth_callback', error: 'missing_realm_id' }, { status: 400 })
  }

  const exchange = await exchangeCode(code, realmId)
  await persist({ ...baseRecord, status: exchange.ok ? 'token_stored' : 'token_exchange_failed', tokenExchange: exchange.summary }, receivedAt)

  if (!exchange.ok) {
    return NextResponse.json({ ok: false, source: 'quickbooks_online', event: 'oauth_callback', code: redactedPresence(code), realmId, tokenExchange: exchange.summary }, { status: exchange.status || 502 })
  }

  return NextResponse.json({ ok: true, source: 'quickbooks_online', event: 'oauth_callback', code: redactedPresence(code), realmId, tokenExchange: exchange.summary, note: 'QuickBooks Online OAuth callback exchanged the authorization code and stored tokens in the protected demo token file.' })
}
