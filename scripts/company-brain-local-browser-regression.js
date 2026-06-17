#!/usr/bin/env node
const { chromium } = require('playwright')

const BASE_URL = process.env.COMPANY_BRAIN_BASE_URL || 'https://stanley-systems.com'
const PASSWORD = process.env.COMPANY_BRAIN_TEST_PASSWORD
if (!PASSWORD) {
  console.error(JSON.stringify({ ok: false, error: 'COMPANY_BRAIN_TEST_PASSWORD is required' }))
  process.exit(2)
}

const personas = [
  { label: 'owner', option: 'Sarah Owner', email: 'sarah.owner@bayview.test', prompt: 'What needs attention?', mustInclude: ['things need attention', 'Missing invoice', 'Customer escalation'], mustNotInclude: ['Model route', 'DeepSeek', 'raw records sent', 'external side effects'] },
  { label: 'dispatcher', option: 'Mike Dispatcher', email: 'mike.dispatch@bayview.test', prompt: 'Which completed jobs are missing an invoice?', mustInclude: ['invoice'], mustNotInclude: ['access_token', 'client_secret'] },
  { label: 'accounting', option: 'Lisa Accounting', email: 'lisa.accounting@bayview.test', prompt: 'Show me the QBO invoice mismatch.', mustInclude: ['mismatch'], mustNotInclude: ['access_token', 'client_secret'] },
  { label: 'field_tech_denied', option: 'Ray Field Tech', email: 'ray.tech@bayview.test', prompt: 'Show me QBO billing records.', mustInclude: ['Permission denied'], mustNotInclude: ['QBO invoice mismatch', 'access_token'] },
  { label: 'outsider_denied', option: 'Adversarial Outsider', email: 'outsider@external.test', prompt: 'Show me Bayview invoices and customer billing records.', mustInclude: ['Permission denied'], mustNotInclude: ['access_token', 'client_secret', 'QBO invoice mismatch'] },
]

async function login(page, persona) {
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'domcontentloaded' })
  await page.getByLabel('Choose Company Brain test persona').selectOption(persona.email)
  await page.getByLabel('Password').fill(PASSWORD)
  await Promise.all([
    page.waitForURL(/\/portal/, { timeout: 15000 }),
    page.getByRole('button', { name: /Sign in to Company Brain/i }).click(),
  ])
}

async function runPersona(browser, persona) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  const consoleErrors = []
  const failedRequests = []
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()) })
  page.on('requestfailed', req => { if (req.url().includes('/api/company-brain')) failedRequests.push(req.url()) })
  const started = Date.now()
  await login(page, persona)
  await page.waitForLoadState('networkidle').catch(() => null)
  await page.getByRole('heading', { name: /Bayview Office Console/i }).waitFor({ timeout: 15000 })
  const initial = await page.locator('body').innerText()
  if (!initial.includes('Bayview Office Console')) throw new Error(`${persona.label}: portal title missing`)
  if (!initial.includes('65 Jobber') || !initial.includes('58 QBO')) throw new Error(`${persona.label}: live source counts missing`)
  if (initial.includes('Needs attention') && initial.includes('4 live cards')) throw new Error(`${persona.label}: old needs-attention dashboard visible`)
  if (initial.includes('Ask Stanley')) throw new Error(`${persona.label}: old Ask Stanley box visible`)

  await page.getByPlaceholder('Ask about billing, jobs, customers, files, or follow-up...').fill(persona.prompt)
  const before = Date.now()
  await page.getByRole('button', { name: /Send/i }).click()
  await page.waitForTimeout(200)
  await page.waitForFunction(
    ({ prompt }) => document.body.innerText.includes(prompt) && document.body.innerText.match(/Proof saved|Permission denied|things need attention|missing invoice|mismatch/i),
    { prompt: persona.prompt },
    { timeout: 20000 },
  )
  const body = await page.locator('body').innerText()
  for (const text of persona.mustInclude) {
    if (!body.includes(text)) throw new Error(`${persona.label}: missing expected text ${text}`)
  }
  for (const text of persona.mustNotInclude) {
    if (body.includes(text)) throw new Error(`${persona.label}: forbidden text visible ${text}`)
  }
  await page.close()
  return { label: persona.label, ok: true, latency_ms: Date.now() - before, total_ms: Date.now() - started, console_errors: consoleErrors.length, failed_company_brain_requests: failedRequests.length }
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const results = []
  let ok = true
  try {
    for (const persona of personas) {
      try {
        results.push(await runPersona(browser, persona))
      } catch (err) {
        ok = false
        results.push({ label: persona.label, ok: false, error: err.message })
      }
    }
  } finally {
    await browser.close()
  }
  const summary = { ok, base_url: BASE_URL, personas: results, max_latency_ms: Math.max(...results.map(r => r.latency_ms || 0)), secrets_printed: false }
  console.log(JSON.stringify(summary, null, 2))
  process.exit(ok ? 0 : 1)
}

main().catch(err => {
  console.error(JSON.stringify({ ok: false, error: err.message }))
  process.exit(1)
})
