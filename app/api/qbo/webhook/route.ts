import { NextRequest, NextResponse } from 'next/server'
import { appendFile, mkdir, readFile } from 'node:fs/promises'
import crypto from 'node:crypto'
import path from 'node:path'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const STORAGE_DIR = '/home/jaden/.local/share/stanley-systems/data/stanley-demo/qbo-webhooks'
const SECRET_FILE = '/home/jaden/.config/stanley-systems-demo/qbo.env'
const N8N_FORWARD_URL = process.env.STANLEY_QBO_WEBHOOK_FORWARD_URL || ''

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

async function loadVerifierToken() {
  if (process.env.QBO_WEBHOOK_VERIFIER_TOKEN) return process.env.QBO_WEBHOOK_VERIFIER_TOKEN
  const fileValues = await readFile(SECRET_FILE, 'utf8').then(parseEnvFile).catch(() => ({}))
  return fileValues.QBO_WEBHOOK_VERIFIER_TOKEN || ''
}

function timingSafeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a)
  const bBuffer = Buffer.from(b)
  return aBuffer.length === bBuffer.length && crypto.timingSafeEqual(aBuffer, bBuffer)
}

function verifyIntuitSignature(rawBody: string, signature: string | null, verifierToken: string) {
  if (!verifierToken) return { configured: false, valid: null as boolean | null, reason: 'verifier_token_not_configured' }
  if (!signature) return { configured: true, valid: false, reason: 'missing_intuit_signature' }
  const expected = crypto.createHmac('sha256', verifierToken).update(rawBody).digest('base64')
  return { configured: true, valid: timingSafeEqual(expected, signature), reason: timingSafeEqual(expected, signature) ? 'signature_valid' : 'signature_invalid' }
}

function sanitizeHeaders(headers: Headers) {
  const safe: Record<string, string> = {}
  const sensitive = [/authorization/i, /token/i, /secret/i, /cookie/i, /signature/i]
  headers.forEach((value, key) => {
    safe[key] = sensitive.some((pattern) => pattern.test(key)) ? 'present_redacted' : value
  })
  return safe
}

async function persist(record: Record<string, unknown>, receivedAt: string) {
  await mkdir(STORAGE_DIR, { recursive: true })
  await appendFile(path.join(STORAGE_DIR, `${utcDayStamp(receivedAt)}.jsonl`), `${JSON.stringify(record)}\n`, 'utf8')
}

async function forwardToN8n(record: Record<string, unknown>) {
  if (!N8N_FORWARD_URL) return { attempted: false, delivered: false, detail: 'STANLEY_QBO_WEBHOOK_FORWARD_URL not set' }
  try {
    const response = await fetch(N8N_FORWARD_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(10000),
    })
    const detail = await response.text().catch(() => '')
    return { attempted: true, delivered: response.ok, status: response.status, detail: detail.slice(0, 1200) }
  } catch (error) {
    return { attempted: true, delivered: false, detail: error instanceof Error ? error.message : String(error) }
  }
}

export async function GET() {
  const verifierToken = await loadVerifierToken()
  return NextResponse.json({ ok: true, source: 'quickbooks_online', event: 'webhook_health_check', forwardConfigured: Boolean(N8N_FORWARD_URL), signatureVerificationConfigured: Boolean(verifierToken) })
}

export async function POST(request: NextRequest) {
  const receivedAt = new Date().toISOString()
  const headers = sanitizeHeaders(request.headers)
  const rawBody = await request.text()
  const verifierToken = await loadVerifierToken()
  const signatureCheck = verifyIntuitSignature(rawBody, request.headers.get('intuit-signature'), verifierToken)
  let payload: unknown = null
  try { payload = rawBody ? JSON.parse(rawBody) : null } catch { payload = { rawBody: rawBody.slice(0, 5000) } }

  const record = { source: 'quickbooks_online', event: 'webhook_received', receivedAt, headers, signatureCheck, payload }
  await persist(record, receivedAt)

  if (signatureCheck.configured && signatureCheck.valid === false) {
    return NextResponse.json({ ok: false, source: 'quickbooks_online', event: 'webhook_received', receivedAt, signatureCheck }, { status: 401 })
  }

  const forward = await forwardToN8n(record)
  return NextResponse.json({ ok: true, source: 'quickbooks_online', event: 'webhook_received', receivedAt, signatureCheck, forward })
}
