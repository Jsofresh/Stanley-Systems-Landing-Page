import { NextRequest, NextResponse } from 'next/server'
import { appendFile, mkdir, readFile } from 'node:fs/promises'
import crypto from 'node:crypto'
import path from 'node:path'
import { buildOpsLayerSnapshot } from '@/lib/stanley-demo/ops-layer'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const STORAGE_DIR = '/home/jaden/.local/share/stanley-systems/data/stanley-demo/twilio-sms'
const SECRET_FILE = '/home/jaden/.config/stanley-systems-demo/twilio.env'
const PUBLIC_WEBHOOK_URL = 'https://stanley-systems.com/api/twilio/sms'

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

async function loadTwilioAuthToken() {
  if (process.env.TWILIO_AUTH_TOKEN) return process.env.TWILIO_AUTH_TOKEN
  const fileValues = await readFile(SECRET_FILE, 'utf8').then(parseEnvFile).catch(() => ({}))
  return fileValues.TWILIO_AUTH_TOKEN || ''
}

function timingSafeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a)
  const bBuffer = Buffer.from(b)
  return aBuffer.length === bBuffer.length && crypto.timingSafeEqual(aBuffer, bBuffer)
}

function verifyTwilioSignature(url: string, params: Record<string, string>, signature: string | null, authToken: string) {
  if (!authToken) return { configured: false, valid: null as boolean | null, reason: 'auth_token_not_configured' }
  if (!signature) return { configured: true, valid: false, reason: 'missing_x_twilio_signature' }
  const data = Object.keys(params).sort().reduce((acc, key) => acc + key + params[key], url)
  const expected = crypto.createHmac('sha1', authToken).update(data).digest('base64')
  return { configured: true, valid: timingSafeEqual(expected, signature), reason: timingSafeEqual(expected, signature) ? 'signature_valid' : 'signature_invalid' }
}

function sanitizePhone(value: string | undefined) {
  if (!value) return undefined
  const digits = value.replace(/\D/g, '')
  return digits ? `***${digits.slice(-4)}` : undefined
}

function utcDayStamp(iso: string) {
  return iso.slice(0, 10)
}

async function persist(record: Record<string, unknown>, receivedAt: string) {
  await mkdir(STORAGE_DIR, { recursive: true })
  await appendFile(path.join(STORAGE_DIR, `${utcDayStamp(receivedAt)}.jsonl`), `${JSON.stringify(record)}\n`, 'utf8')
}

async function parseIncoming(request: NextRequest) {
  const contentType = request.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    const body = await request.json().catch(() => ({}))
    const params: Record<string, string> = {}
    for (const [key, value] of Object.entries(body || {})) params[key] = String(value ?? '')
    return params
  }
  const form = await request.formData()
  const params: Record<string, string> = {}
  form.forEach((value, key) => { params[key] = typeof value === 'string' ? value : value.name })
  return params
}

export async function GET() {
  const authToken = await loadTwilioAuthToken()
  return NextResponse.json({ ok: true, source: 'twilio', event: 'sms_webhook_health_check', signatureVerificationConfigured: Boolean(authToken), webhookUrl: PUBLIC_WEBHOOK_URL })
}

export async function POST(request: NextRequest) {
  const receivedAt = new Date().toISOString()
  const params = await parseIncoming(request)
  const authToken = await loadTwilioAuthToken()
  const signatureCheck = verifyTwilioSignature(PUBLIC_WEBHOOK_URL, params, request.headers.get('x-twilio-signature'), authToken)
  const record = {
    source: 'twilio',
    event: 'sms_received',
    receivedAt,
    MessageSid: params.MessageSid || params.SmsSid || params.SmsMessageSid || null,
    AccountSid: params.AccountSid ? 'present_redacted' : null,
    MessagingServiceSid: params.MessagingServiceSid ? 'present_redacted' : null,
    From: params.From || null,
    To: params.To || null,
    FromRedacted: sanitizePhone(params.From),
    ToRedacted: sanitizePhone(params.To),
    Body: params.Body || '',
    NumMedia: params.NumMedia || '0',
    NumSegments: params.NumSegments || null,
    signatureCheck,
  }
  await persist(record, receivedAt)

  if (signatureCheck.configured && signatureCheck.valid === false) {
    return NextResponse.json({ ok: false, source: 'twilio', event: 'sms_received', receivedAt, signatureCheck }, { status: 401 })
  }

  const snapshot = await buildOpsLayerSnapshot()
  const matched = snapshot.normalizedEvents.find((e) => e.source === 'twilio' && e.entityId === record.MessageSid)
  const responseXml = '<?xml version="1.0" encoding="UTF-8"?><Response></Response>'
  return new NextResponse(responseXml, {
    status: 200,
    headers: {
      'Content-Type': 'text/xml',
      'X-Stanley-Event-Status': 'received',
      'X-Stanley-Matched-Customer': matched?.customerName || 'unmatched',
    },
  })
}
