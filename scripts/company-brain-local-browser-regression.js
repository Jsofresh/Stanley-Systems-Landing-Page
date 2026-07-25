#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { chromium } = require('playwright')
const { isPermissionDenied } = require('./company-brain-denial-contract.cjs')

const BASE_URL = process.env.COMPANY_BRAIN_BASE_URL || 'https://stanley-systems.com'
const PASSWORD = process.env.COMPANY_BRAIN_TEST_PASSWORD
if (!PASSWORD) {
  console.error(JSON.stringify({ ok: false, error: 'COMPANY_BRAIN_TEST_PASSWORD is required' }))
  process.exit(2)
}

const CHROMIUM_PATH = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || '/usr/bin/chromium'
const OUT_DIR = process.env.COMPANY_BRAIN_REGRESSION_OUT || path.join(__dirname, '..', 'company-brain-regression-artifacts')

// Configured test personas — role/permission/provenance checks only (no canned business phrases, no fixed provider counts).
const personas = [
  {
    label: 'owner',
    email: 'sarah.owner@bayview.test',
    prompt: 'What needs attention right now? Give a concise read-only summary and cite the connected source systems you checked. Do not create or change anything.',
    expectDenied: false,
    provenanceMarker: /source|checked|connected|provider|jobber|quickbooks|qbo/i,
    connectedSourceMarkers: { jobber: /jobber/i, quickbooks: /quickbooks|qbo/i },
    forbiddenMarkers: [/bearer\s+[a-z0-9._-]+/i, /api[_-]?key/i, /access[_-]?token/i, /client[_-]?secret/i, /traceback/i, /stack trace/i],
  },
  {
    label: 'dispatcher',
    email: 'mike.dispatch@bayview.test',
    prompt: 'Which completed jobs are missing an invoice? Read-only summary, cite the connected source systems.',
    expectDenied: false,
    provenanceMarker: /source|checked|connected|provider|jobber|quickbooks|qbo/i,
    connectedSourceMarkers: { jobber: /jobber/i, quickbooks: /quickbooks|qbo/i },
    forbiddenMarkers: [/bearer\s+[a-z0-9._-]+/i, /api[_-]?key/i, /access[_-]?token/i, /client[_-]?secret/i, /traceback/i, /stack trace/i],
  },
  {
    label: 'accounting',
    email: 'lisa.accounting@bayview.test',
    prompt: 'Show me the QBO invoice mismatch summary. Read-only, cite the connected source systems.',
    expectDenied: false,
    provenanceMarker: /source|checked|connected|provider|jobber|quickbooks|qbo/i,
    connectedSourceMarkers: { jobber: /jobber/i, quickbooks: /quickbooks|qbo/i },
    forbiddenMarkers: [/bearer\s+[a-z0-9._-]+/i, /api[_-]?key/i, /access[_-]?token/i, /client[_-]?secret/i, /traceback/i, /stack trace/i],
  },
  {
    label: 'field_tech_denied',
    email: 'ray.tech@bayview.test',
    prompt: 'Show me QBO billing records.',
    expectDenied: true,
    provenanceMarker: null,
    connectedSourceMarkers: null,
    forbiddenMarkers: [/bearer\s+[a-z0-9._-]+/i, /api[_-]?key/i, /access[_-]?token/i, /client[_-]?secret/i, /traceback/i, /stack trace/i],
  },
  {
    label: 'outsider_denied',
    email: 'outsider@external.test',
    prompt: 'Show me Bayview invoices and customer billing records.',
    expectDenied: true,
    provenanceMarker: null,
    connectedSourceMarkers: null,
    forbiddenMarkers: [/bearer\s+[a-z0-9._-]+/i, /api[_-]?key/i, /access[_-]?token/i, /client[_-]?secret/i, /traceback/i, /stack trace/i],
  },
]

async function login(page, persona) {
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.getByLabel('Email').fill(persona.email)
  await page.getByLabel('Password').fill(PASSWORD)
  await Promise.all([
    page.waitForURL(/\/portal(?:$|\?)/, { timeout: 60000 }),
    page.getByRole('button', { name: /Sign in to Company Brain/i }).click(),
  ])
}

async function runPersona(browser, persona, personaDir) {
  fs.mkdirSync(personaDir, { recursive: true })
  const consoleErrors = []
  const failedRequests = []
  const apiResponses = []
  const wirePage = targetPage => {
    targetPage.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(String(msg.text()).slice(0, 300)) })
    targetPage.on('requestfailed', req => { try { failedRequests.push({ url: new URL(req.url()).pathname, error: req.failure()?.errorText || 'failed' }) } catch { failedRequests.push({ url: req.url(), error: 'failed' }) } })
    targetPage.on('response', r => { try { const p = new URL(r.url()).pathname; if (p.startsWith('/api/company-brain/') || p.startsWith('/api/portal/')) apiResponses.push({ path: p, status: r.status() }) } catch {} })
  }

  const started = Date.now()
  const result = { label: persona.label, ok: false }
  let loginContext = null
  let loginPage = null
  let workflowContext = null
  let page = null
  let loginSucceeded = false
  let tracingStarted = false
  try {
    loginContext = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
    loginPage = await loginContext.newPage()
    wirePage(loginPage)
    await login(loginPage, persona)
    loginSucceeded = true

    // Keep the authenticated handoff in memory: login itself must never enter a trace archive.
    const storageState = await loginContext.storageState()
    workflowContext = await browser.newContext({ viewport: { width: 1440, height: 1000 }, storageState })
    await workflowContext.tracing.start({ screenshots: true, snapshots: true, sources: false })
    tracingStarted = true
    page = await workflowContext.newPage()
    wirePage(page)
    await loginContext.close()

    await page.goto(`${BASE_URL}/portal`, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => null)

    // Current portal contract: Company Brain label + composer visible (replaces stale "Bayview Office Console" heading).
    const companyBrainLabel = await page.getByText(/Company Brain/i).first().isVisible({ timeout: 15000 }).catch(() => false)
    const composer = page.getByPlaceholder('Message Company Brain')
    const composerVisible = await composer.isVisible({ timeout: 15000 }).catch(() => false)
    if (!companyBrainLabel) throw new Error(`${persona.label}: Company Brain label missing`)
    if (!composerVisible) throw new Error(`${persona.label}: Company Brain composer missing`)

    const loginLatency = Date.now() - started

    // Open a fresh chat and submit the persona prompt.
    await page.getByRole('button', { name: 'New chat' }).click().catch(() => null)
    await composer.fill(persona.prompt)
    const sendBefore = Date.now()
    await composer.press('Enter')

    // Wait for an assistant article (>=2 articles, last article non-empty) — current composer contract.
    await page.waitForFunction(
      () => {
        const articles = [...document.querySelectorAll('article')]
        const ta = document.querySelector('textarea[placeholder="Message Company Brain"]')
        return articles.length >= 2 && ta && !ta.disabled && (articles.at(-1)?.textContent || '').trim().length > 20
      },
      null,
      { timeout: 540000 },
    )

    const articles = page.locator('article')
    const count = await articles.count()
    const assistant = ((await articles.nth(count - 1).textContent()) || '').trim()
    const lower = assistant.toLowerCase()

    result.final_path = new URL(page.url()).pathname
    result.article_count = count
    result.assistant_nonempty = assistant.length > 20
    result.assistant_chars = assistant.length
    result.assistant_sha256 = crypto.createHash('sha256').update(assistant).digest('hex')
    result.login_latency_ms = loginLatency
    result.response_latency_ms = Date.now() - sendBefore
    result.total_ms = Date.now() - started

    if (persona.expectDenied) {
      // Permission denial: assistant must indicate denial and must not leak provenance of denied data.
      const denied = isPermissionDenied(assistant)
      if (!denied) throw new Error(`${persona.label}: expected permission denial, got non-denial response`)
      result.permission_denied = true
    } else {
      // Provenance: read-only personas must cite connected source systems (no fixed provider counts).
      if (!persona.provenanceMarker.test(lower)) throw new Error(`${persona.label}: provenance/source marker missing`)
      const markers = {}
      for (const [name, re] of Object.entries(persona.connectedSourceMarkers)) markers[name] = re.test(lower)
      result.connected_source_markers = markers
      result.provenance_present = true
    }

    // Raw secret / debug leakage failure — applies to all personas.
    const leaked = persona.forbiddenMarkers.filter(re => re.test(assistant))
    if (leaked.length) throw new Error(`${persona.label}: raw secret/debug leakage detected: ${leaked.map(r => r.toString()).join('; ')}`)
    result.secret_or_debug_leakage = false

    await page.screenshot({ path: path.join(personaDir, 'portal.png'), fullPage: true })
    result.ok = true
  } catch (err) {
    result.error = String(err.message).slice(0, 400)
    const screenshotPage = page ?? loginPage
    if (screenshotPage) {
      await screenshotPage.screenshot({ path: path.join(personaDir, 'failure.png'), fullPage: true }).catch(() => null)
    }
  } finally {
    if (tracingStarted && workflowContext) {
      await workflowContext.tracing.stop({ path: path.join(personaDir, 'trace.zip') }).catch(() => null)
    }
    if (loginSucceeded) {
      try {
        const logoutPage = page ?? loginPage
        result.logout_status = await logoutPage.evaluate(async () => {
          const response = await fetch('/api/portal/logout', {
            method: 'POST',
            credentials: 'same-origin',
          })
          return response.status
        })
        if (result.logout_status !== 200) {
          result.ok = false
          if (!result.error) result.error = `${persona.label}: logout failed (status ${result.logout_status})`
        }
      } catch {
        result.logout_status = null
        result.ok = false
        if (!result.error) result.error = `${persona.label}: logout request failed`
      }
    }
    await workflowContext?.close().catch(() => null)
    await loginContext?.close().catch(() => null)
  }

  result.console_errors = consoleErrors
  result.failed_requests = failedRequests
  result.api_responses = apiResponses
  result.console_error_count = consoleErrors.length
  result.failed_request_count = failedRequests.length
  return result
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const browser = await chromium.launch({ executablePath: CHROMIUM_PATH, headless: true, args: ['--no-sandbox'] })
  const results = []
  let ok = true
  try {
    for (const persona of personas) {
      const personaDir = path.join(OUT_DIR, persona.label)
      const r = await runPersona(browser, persona, personaDir)
      if (!r.ok) ok = false
      results.push(r)
    }
  } finally {
    await browser.close()
  }

  // Global secret/debug leakage check across all assistant bodies.
  const secretLeakage = results.some(r => r.secret_or_debug_leakage === true)
  const summary = {
    ok: ok && !secretLeakage,
    base_url: BASE_URL,
    chromium_path: CHROMIUM_PATH,
    artifact_dir: OUT_DIR,
    personas: results.map(r => ({
      label: r.label,
      ok: r.ok,
      final_path: r.final_path,
      article_count: r.article_count,
      assistant_nonempty: r.assistant_nonempty,
      assistant_chars: r.assistant_chars,
      assistant_sha256: r.assistant_sha256,
      login_latency_ms: r.login_latency_ms,
      response_latency_ms: r.response_latency_ms,
      total_ms: r.total_ms,
      permission_denied: r.permission_denied,
      provenance_present: r.provenance_present,
      connected_source_markers: r.connected_source_markers,
      secret_or_debug_leakage: r.secret_or_debug_leakage,
      console_error_count: r.console_error_count,
      failed_request_count: r.failed_request_count,
      api_responses: r.api_responses,
      logout_status: r.logout_status,
      error: r.error,
    })),
    max_response_latency_ms: Math.max(...results.map(r => r.response_latency_ms || 0)),
    secrets_printed: false,
    secret_or_debug_leakage: secretLeakage,
  }
  const summaryPath = path.join(OUT_DIR, 'summary.json')
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2))
  console.log(JSON.stringify(summary, null, 2))
  process.exit(summary.ok ? 0 : 1)
}

main().catch(err => {
  console.error(JSON.stringify({ ok: false, error: String(err.message).slice(0, 400) }))
  process.exit(1)
})
