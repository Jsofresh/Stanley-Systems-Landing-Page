#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { chromium } = require('playwright')
const { isPermissionDenied } = require('./company-brain-denial-contract.cjs')

const BASE_URL = process.env.COMPANY_BRAIN_BASE_URL || 'https://stanley-systems.com'
const PASSWORD = process.env.COMPANY_BRAIN_TEST_PASSWORD
const CHROMIUM_PATH = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || '/usr/bin/chromium'
const OUT_DIR = process.env.COMPANY_BRAIN_REGRESSION_OUT || path.join(__dirname, '..', 'company-brain-regression-artifacts')
const ALL_PERSONAS_DIAGNOSTIC_FLAG = '--all-personas-diagnostic'
const WORKFLOW_FIXTURES_FLAG = '--workflow-fixtures'
const workflowFixtures = process.argv.includes(WORKFLOW_FIXTURES_FLAG)
const unknownArguments = process.argv.slice(2).filter(argument => argument !== ALL_PERSONAS_DIAGNOSTIC_FLAG && argument !== WORKFLOW_FIXTURES_FLAG)
if (unknownArguments.length) {
  console.error(JSON.stringify({ ok: false, error: 'unsupported browser regression argument' }))
  process.exit(2)
}
if (!workflowFixtures && !PASSWORD) {
  console.error(JSON.stringify({ ok: false, error: 'COMPANY_BRAIN_TEST_PASSWORD is required' }))
  process.exit(2)
}
const allPersonasDiagnostic = process.argv.includes(ALL_PERSONAS_DIAGNOSTIC_FLAG)

// TEST FIXTURES ONLY. This mode intercepts local browser requests and must
// never be represented as provider, customer, staging, or production proof.
const WORKFLOW_FIXTURE_LABEL = 'TEST FIXTURE ONLY'
const WORKFLOW_FIXTURE_PASSWORD = process.env.COMPANY_BRAIN_WORKFLOW_FIXTURE_PASSWORD || 'workflow-fixture-password'

function workflowUnit(outcome, system = 'jobber', operation = 'clientEdit') {
  return {
    kind: 'provider_action', entity_code: 'customer', operation,
    disposition: outcome === 'executed_verified' ? 'updated_existing' : 'unspecified',
    outcome, system, claims: [], omissions: [], omissions_complete: true,
    failures: outcome === 'failed' ? [{ reason_code: 'provider_rejected' }] : [],
  }
}

function workflowResult(status, units) {
  const verified = new Set(['read_verified', 'executed_verified', 'source_verified', 'nonfactual'])
  return {
    schema: 'company_brain.work_result.v1', status, unit_count: units.length,
    verified_unit_count: units.filter(unit => verified.has(unit.outcome)).length,
    omissions_complete: true, units,
  }
}

function providerVerification(status, connectors, verifiedActionCount = 0) {
  return {
    status, source: 'server_turn_receipt', connectors, action_count: connectors.length,
    verified_action_count: verifiedActionCount, completed_batch_replay: true,
    mutation_dispatch_count: connectors.length,
  }
}

function workflowSse(data, before = [], workflowId = 'conversation-fixture') {
  const frames = [
    ['run.started', { status: 'running' }],
    ...before,
    ['stanley.completed', data],
    ['done', {}],
  ]
  return frames.map(([event, payload], index) => {
    const identified = ['done', 'error'].includes(event) ? payload : {
      ...payload,
      workflow_id: payload.workflow_id || workflowId,
      server_sequence: payload.server_sequence || index + 1,
      event_id: payload.event_id || `event-${index + 1}`,
    }
    return `event: ${event}\ndata: ${JSON.stringify(identified)}\n\n`
  }).join('')
}

const exactApprovalFixture = { schema: 'company_brain.approval_request.v1', state: 'pending_approval', approval_ref: 'approval_1234567890abcdef12345678', approval_version: 1, binding: 'binding_1234567890abcdef12345678', action_count: 1, connectors: ['jobber'], actions: [{ order: 1, action_summary: 'Update customer status', target: 'Customer C-104', consequence_class: 'record_update', approval_class: 'explicit', step_scope: 'step-1' }], choices: ['Approve', 'Cancel'] }

const workflowFixtureScenarios = [
  {
    label: 'success', expected: ['Work completed', 'Provider readback', 'verified', 'Save as routine'],
    completion: {
      status: 'completed', answer: `${WORKFLOW_FIXTURE_LABEL}: customer update completed.`, artifacts: [],
      work_result: workflowResult('verified', [workflowUnit('executed_verified')]),
      provider_verification: providerVerification('verified', ['jobber'], 1),
    },
  },
  {
    label: 'approval-required', expected: ['Approval required', 'Approve', 'Cancel'],
    before: [['approval.request', exactApprovalFixture]],
    completion: {
      status: 'completed', answer: `${WORKFLOW_FIXTURE_LABEL}: approval required.`, artifacts: [],
      work_result: workflowResult('approval_required', [workflowUnit('pending_approval')]),
    },
  },
  {
    label: 'cancellation', expected: ['Request cancelled', 'Reconciliation: reconciliation required'],
    completion: { status: 'cancelled', answer: `${WORKFLOW_FIXTURE_LABEL}: request stopped.`, artifacts: [] },
  },
  {
    label: 'provider-rejection', expected: ['Work was not completed', 'rejected', 'Reconciliation: failed'],
    completion: {
      status: 'failed', answer: `${WORKFLOW_FIXTURE_LABEL}: provider rejected the update.`, artifacts: [],
      work_result: workflowResult('failed', [workflowUnit('failed')]),
      provider_verification: providerVerification('invalid', ['jobber']),
    },
  },
  {
    label: 'partial-completion', expected: ['Completed with exceptions', '1 of 2 results verified', 'reconciled with exceptions'],
    completion: {
      status: 'completed', answer: `${WORKFLOW_FIXTURE_LABEL}: one action completed and one was rejected.`, artifacts: [],
      work_result: workflowResult('partial', [workflowUnit('executed_verified'), workflowUnit('failed', 'quickbooks', 'invoiceCreate')]),
      provider_verification: providerVerification('invalid', ['jobber', 'quickbooks'], 1),
    },
  },
  {
    label: 'reconciliation-required', expected: ['Outcome needs confirmation', 'reconciliation required'],
    completion: {
      status: 'completed', answer: `${WORKFLOW_FIXTURE_LABEL}: final state is unknown.`, artifacts: [],
      work_result: workflowResult('reconciliation_required', [workflowUnit('unknown_outcome')]),
      provider_verification: providerVerification('invalid', ['jobber']),
    },
  },
  {
    label: 'malformed-payload', expected: ['Outcome unknown', 'No success is being claimed'],
    completion: { status: 'completed', answer: `${WORKFLOW_FIXTURE_LABEL}: malformed result omitted.`, artifacts: [] },
  },
  {
    label: 'server-replay-defense', expected: ['Approval required', 'Current target', 'Approve', 'Cancel'], forbidden: ['Stale target', 'Wrong workflow target'],
    before: [
      ['tool.progress', { state: 'tool.progress', label: 'working', server_sequence: 3, event_id: 'event-fresh' }],
      ['tool.progress', { state: 'tool.progress', label: 'working', server_sequence: 3, event_id: 'event-fresh' }],
      ['approval.request', { ...exactApprovalFixture, actions: [{ ...exactApprovalFixture.actions[0], target: 'Stale target' }], server_sequence: 2, event_id: 'event-reversed' }],
      ['approval.request', { ...exactApprovalFixture, approval_ref: 'approval_aaaaaaaaaaaaaaaaaaaaaaaa', binding: 'binding_aaaaaaaaaaaaaaaaaaaaaaaa', actions: [{ ...exactApprovalFixture.actions[0], target: 'Wrong workflow target' }], workflow_id: 'conversation-wrong', server_sequence: 4, event_id: 'event-wrong-workflow' }],
      ['approval.request', { ...exactApprovalFixture, actions: [{ ...exactApprovalFixture.actions[0], target: 'Current target' }], server_sequence: 4, event_id: 'event-current-approval' }],
    ],
    completion: {
      status: 'completed', answer: `${WORKFLOW_FIXTURE_LABEL}: approval required after replay filtering.`, artifacts: [],
      work_result: workflowResult('approval_required', [workflowUnit('pending_approval')]),
    },
  },
]

const durableReloadScenarios = [
  { phase: 'approval_required', expected: 'Approval required', approval: workflowFixtureScenarios[1].before[0][1] },
  { phase: 'cancelling', expected: 'Stopping' },
  { phase: 'reconciliation_required', expected: 'Reconciliation required', completion: workflowFixtureScenarios[5].completion },
  { phase: 'completed', expected: 'Completed', completion: workflowFixtureScenarios[0].completion },
  { phase: 'unknown_outcome', expected: 'Outcome unknown', completion: workflowFixtureScenarios[5].completion },
]

const matrixStateScenarios = [
  { state: 'unavailable', expected: 'Supported workflows are unavailable' },
  { state: 'denied', expected: 'do not have permission to view supported workflows' },
  { state: 'stale_version', expected: 'stale for this runtime version' },
  { state: 'error', expected: 'could not be verified' },
]

async function installWorkflowFixtureRoutes(context, scenario, reconnect = false, durable = durableReloadScenarios[3], matrixMode = 'ready') {
  await context.route('**/api/**', async route => {
    const requestUrl = new URL(route.request().url())
    const pathname = requestUrl.pathname
    if (pathname === '/api/portal/session') {
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ session: { actorId: 'fixture-actor', name: 'Fixture Owner', email: 'fixture@example.test', role: 'owner', roleLabel: 'Owner', companyId: 'fixture-tenant', companyName: 'Fixture Company', loginSessionId: 'fixture-session' } }) })
    }
    if (pathname.endsWith('/control/summary')) return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ runtime_status: 'fixture', runtime_version: WORKFLOW_FIXTURE_LABEL }) })
    if (pathname.endsWith('/brain/supported-actions')) {
      const matrix = matrixMode === 'error'
        ? { schema: 'invalid.fixture', state: 'ready', runtime_version: WORKFLOW_FIXTURE_LABEL, matrix_version: 'fixture-matrix-v1', actions: [] }
        : { schema: 'stanley.supported_actions.v1', state: matrixMode === 'stale_version' ? 'ready' : matrixMode, runtime_version: matrixMode === 'stale_version' ? 'different-runtime-version' : WORKFLOW_FIXTURE_LABEL, matrix_version: 'fixture-matrix-v1', actions: matrixMode === 'ready' ? [{ action: 'client_update', workflow: 'customer_sync', system: 'jobber', approval: 'explicit', readback: 'required' }] : [] }
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(matrix) })
    }
    if (pathname.endsWith('/brain/sessions')) {
      const sessions = reconnect ? [{ id: 'conversation-reconnect', title: 'Restored fixture conversation', message_count: 1, preview: `${WORKFLOW_FIXTURE_LABEL}: restored history` }] : []
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: sessions }) })
    }
    if (pathname.endsWith('/messages')) {
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: [{ id: 'restored-message', role: 'assistant', content: `${WORKFLOW_FIXTURE_LABEL}: restored history`, timestamp: 1786312800 }] }) })
    }
    if (pathname.endsWith('/workflow/status')) {
      const approval = durable.approval ? { ...durable.approval } : undefined
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ schema: 'stanley.workflow.hydration.v1', workflow_id: 'conversation-reconnect', conversation_id: 'conversation-reconnect', server_sequence: 8, event_id: `hydrate-${durable.phase}`, phase: durable.phase, operation: durable.phase === 'approval_required' ? 'approve' : durable.phase === 'cancelling' ? 'cancel' : 'get_result', updated_at: '2026-08-10T02:00:00Z', history: [{ server_sequence: 8, at: '2026-08-10T02:00:00Z', phase: durable.phase, label: `${WORKFLOW_FIXTURE_LABEL}: ${durable.expected}` }], approval, supported_next_actions: durable.phase === 'approval_required' ? ['approve', 'cancel'] : ['get_status'] }) })
    }
    if (pathname.endsWith('/workflow/result')) {
      const completion = durable.completion || scenario.completion
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ schema: 'stanley.workflow.hydration.v1', workflow_id: 'conversation-reconnect', conversation_id: 'conversation-reconnect', server_sequence: 9, event_id: `result-${durable.phase}`, phase: durable.phase, operation: 'get_result', updated_at: '2026-08-10T02:00:01Z', history: [], ...completion }) })
    }
    if (pathname.endsWith('/chat/stream')) {
      const workflowId = pathname.split('/').at(-3) || 'conversation-fixture'
      return route.fulfill({ status: 200, contentType: 'text/event-stream', body: workflowSse(scenario.completion, scenario.before, workflowId) })
    }
    if (pathname.endsWith('/cancel')) return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: 'cancelling' }) })
    return route.fulfill({ status: 404, contentType: 'application/json', body: '{}' })
  })
}

async function runWorkflowFixtureRegression(browser) {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const authContext = await browser.newContext()
  const fixtureLogin = await authContext.request.post(`${BASE_URL}/api/portal/login`, { data: { email: 'sarah.owner@bayview.test', password: WORKFLOW_FIXTURE_PASSWORD } })
  assertFixture(fixtureLogin.ok(), `workflow fixtures: local login failed (${fixtureLogin.status()})`)
  const fixtureStorageState = await authContext.storageState()
  await authContext.close()
  const results = []
  for (const scenario of workflowFixtureScenarios) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, storageState: fixtureStorageState })
    await installWorkflowFixtureRoutes(context, scenario)
    const page = await context.newPage()
    const consoleErrors = []
    page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()) })
    const result = { label: scenario.label, fixture_label: WORKFLOW_FIXTURE_LABEL, ok: false }
    try {
      await page.goto(`${BASE_URL}/portal`, { waitUntil: 'domcontentloaded', timeout: 60000 })
      const composer = page.getByPlaceholder('Message Company Brain')
      await composer.waitFor({ state: 'visible', timeout: 15000 })
      await composer.fill(`${WORKFLOW_FIXTURE_LABEL}: run ${scenario.label}`)
      await composer.press('Enter')
      await page.locator('[data-testid="workflow-status"]').waitFor({ state: 'visible', timeout: 15000 })
      await page.waitForFunction(() => !document.querySelector('textarea[placeholder="Message Company Brain"]')?.disabled, null, { timeout: 15000 })
      for (const expected of scenario.expected) {
        result.waiting_for = expected
        await page.waitForFunction(value => document.body.innerText.toLowerCase().includes(value.toLowerCase()), expected, { timeout: 15000 })
      }
      delete result.waiting_for
      const text = await page.locator('body').innerText()
      for (const expected of scenario.expected) assertFixture(text.toLowerCase().includes(expected.toLowerCase()), `${scenario.label}: missing ${expected}`)
      for (const forbidden of scenario.forbidden || []) assertFixture(!text.toLowerCase().includes(forbidden.toLowerCase()), `${scenario.label}: accepted stale or wrong-workflow frame ${forbidden}`)
      assertFixture(!/Hermes|Codex|OpenClaw|\bn8n\b|\bHCP\b|\bQBO\b/i.test(text), `${scenario.label}: internal implementation label leaked`)
      assertFixture(consoleErrors.length === 0, `${scenario.label}: console errors: ${consoleErrors.join('; ')}`)
      const scenarioDir = path.join(OUT_DIR, 'workflow-fixtures', scenario.label)
      fs.mkdirSync(scenarioDir, { recursive: true })
      if (scenario.label === 'success') await page.screenshot({ path: path.join(scenarioDir, 'desktop.png'), fullPage: true })
      result.ok = true
    } catch (error) {
      result.error = String(error.message).slice(0, 500)
      result.body_excerpt = page ? (await page.locator('body').innerText().catch(() => '')).slice(0, 2_000) : ''
    } finally {
      result.console_error_count = consoleErrors.length
      await context.close()
    }
    results.push(result)
  }

  const reconnectContext = await browser.newContext({ viewport: { width: 390, height: 844 }, storageState: fixtureStorageState })
  await installWorkflowFixtureRoutes(reconnectContext, workflowFixtureScenarios[0], true)
  const reconnectPage = await reconnectContext.newPage()
  const reconnectConsoleErrors = []
  reconnectPage.on('console', message => { if (message.type() === 'error') reconnectConsoleErrors.push(message.text()) })
  const reconnect = { label: 'reconnect-replay', fixture_label: WORKFLOW_FIXTURE_LABEL, ok: false }
  try {
    await reconnectPage.goto(`${BASE_URL}/portal`, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await reconnectPage.getByText(`${WORKFLOW_FIXTURE_LABEL}: restored history`).waitFor({ state: 'visible', timeout: 15000 })
    await reconnectPage.reload({ waitUntil: 'domcontentloaded' })
    await reconnectPage.getByText(`${WORKFLOW_FIXTURE_LABEL}: restored history`).waitFor({ state: 'visible', timeout: 15000 })
    assertFixture(await reconnectPage.getByText(`${WORKFLOW_FIXTURE_LABEL}: restored history`).count() === 1, 'reconnect replay duplicated history')
    const mobileDir = path.join(OUT_DIR, 'workflow-fixtures', 'reconnect-replay')
    fs.mkdirSync(mobileDir, { recursive: true })
    await reconnectPage.screenshot({ path: path.join(mobileDir, 'mobile.png'), fullPage: true })
    await reconnectPage.getByRole('button', { name: 'Open sidebar' }).click()
    await reconnectPage.getByRole('button', { name: 'New chat' }).click()
    const mobileComposer = reconnectPage.getByPlaceholder('Message Company Brain')
    await mobileComposer.fill(`${WORKFLOW_FIXTURE_LABEL}: mobile success`)
    await mobileComposer.press('Enter')
    await reconnectPage.locator('[data-testid="workflow-receipt"]').waitFor({ state: 'visible', timeout: 15000 })
    await reconnectPage.getByRole('button', { name: /Save as routine/i }).waitFor({ state: 'visible', timeout: 15000 })
    const mobileSuccessDir = path.join(OUT_DIR, 'workflow-fixtures', 'success')
    fs.mkdirSync(mobileSuccessDir, { recursive: true })
    await reconnectPage.screenshot({ path: path.join(mobileSuccessDir, 'mobile.png'), fullPage: true })
    assertFixture(reconnectConsoleErrors.length === 0, `reconnect-replay: console errors: ${reconnectConsoleErrors.join('; ')}`)
    reconnect.ok = true
  } catch (error) {
    reconnect.error = String(error.message).slice(0, 500)
  } finally {
    reconnect.console_error_count = reconnectConsoleErrors.length
    await reconnectContext.close()
  }
  results.push(reconnect)
  for (const durable of durableReloadScenarios) {
    const context = await browser.newContext({ viewport: { width: 900, height: 800 }, storageState: fixtureStorageState })
    await installWorkflowFixtureRoutes(context, workflowFixtureScenarios[0], true, durable)
    const page = await context.newPage()
    const result = { label: `durable-reload-${durable.phase}`, fixture_label: WORKFLOW_FIXTURE_LABEL, ok: false }
    try {
      await page.goto(`${BASE_URL}/portal`, { waitUntil: 'domcontentloaded', timeout: 60000 })
      await page.getByText(durable.expected, { exact: false }).first().waitFor({ state: 'visible', timeout: 15000 })
      await page.reload({ waitUntil: 'domcontentloaded' })
      await page.getByText(durable.expected, { exact: false }).first().waitFor({ state: 'visible', timeout: 15000 })
      result.ok = true
    } catch (error) {
      result.error = String(error.message).slice(0, 500)
    } finally {
      await context.close()
    }
    results.push(result)
  }
  for (const matrix of matrixStateScenarios) {
    const context = await browser.newContext({ viewport: { width: 900, height: 800 }, storageState: fixtureStorageState })
    await installWorkflowFixtureRoutes(context, workflowFixtureScenarios[0], false, durableReloadScenarios[3], matrix.state)
    const page = await context.newPage()
    const result = { label: `matrix-${matrix.state}`, fixture_label: WORKFLOW_FIXTURE_LABEL, ok: false }
    try {
      await page.goto(`${BASE_URL}/portal`, { waitUntil: 'domcontentloaded', timeout: 60000 })
      await page.getByText(matrix.expected, { exact: false }).first().waitFor({ state: 'visible', timeout: 15000 })
      result.ok = true
    } catch (error) {
      result.error = String(error.message).slice(0, 500)
    } finally {
      await context.close()
    }
    results.push(result)
  }
  const summary = { ok: results.every(result => result.ok), mode: 'workflow_test_fixtures_only', fixture_label: WORKFLOW_FIXTURE_LABEL, base_url: BASE_URL, results, secrets_printed: false, provider_calls: 0, customer_mutations: 0 }
  fs.writeFileSync(path.join(OUT_DIR, 'workflow-fixture-summary.json'), JSON.stringify(summary, null, 2))
  console.log(JSON.stringify(summary, null, 2))
  return summary.ok
}

function assertFixture(condition, message) {
  if (!condition) throw new Error(message)
}

// Sarah is the canonical live smoke identity. Other identities remain available
// only for explicit diagnostics; role denial belongs in deterministic tests.
const configuredPersonas = [
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
const personas = allPersonasDiagnostic ? configuredPersonas : [configuredPersonas[0]]

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
  if (workflowFixtures) {
    try {
      const ok = await runWorkflowFixtureRegression(browser)
      process.exitCode = ok ? 0 : 1
    } finally {
      await browser.close()
    }
    return
  }
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
    mode: allPersonasDiagnostic ? 'all_personas_diagnostic' : 'canonical_owner',
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
