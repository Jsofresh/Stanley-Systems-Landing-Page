import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const source = readFileSync(resolve(repoRoot, "scripts/company-brain-local-browser-regression.js"), "utf8")
const runPersona = source.slice(
  source.indexOf("async function runPersona"),
  source.indexOf("async function main"),
)

test("untraced login hands in-memory storage state to a fresh workflow context", () => {
  const login = runPersona.indexOf("await login(loginPage, persona)")
  const storageState = runPersona.indexOf("const storageState = await loginContext.storageState()")
  const workflowContext = runPersona.indexOf("workflowContext = await browser.newContext")
  const loginContextClose = runPersona.indexOf("await loginContext.close()")
  assert.ok(login >= 0)
  assert.ok(storageState > login)
  assert.ok(workflowContext > storageState)
  assert.ok(loginContextClose > workflowContext)
  assert.match(runPersona.slice(storageState, loginContextClose), /browser\.newContext\(\{[\s\S]*\bstorageState\b[\s\S]*\}\)/)
  assert.doesNotMatch(source, /storageState\s*\(\s*\{[^)]*\bpath\b/)
  assert.doesNotMatch(source, /(?:writeFileSync|writeFile|appendFile|createWriteStream)\s*\([^)]*\bstorageState\b/)
})

test("workflow tracing starts before workflow page creation and portal navigation", () => {
  const traceStart = runPersona.indexOf("workflowContext.tracing.start")
  const workflowPage = runPersona.indexOf("workflowContext.newPage()")
  const portalNavigation = runPersona.indexOf("await page.goto(`${BASE_URL}/portal`")
  assert.ok(traceStart >= 0)
  assert.ok(workflowPage > traceStart)
  assert.ok(portalNavigation > workflowPage)
  assert.match(runPersona.slice(traceStart, traceStart + 120), /screenshots:\s*true/)
  assert.match(runPersona.slice(traceStart, traceStart + 120), /snapshots:\s*true/)
})

test("trace is saved before logout and logout precedes both context closes", () => {
  const traceStop = runPersona.indexOf("workflowContext.tracing.stop")
  const logout = runPersona.indexOf("/api/portal/logout")
  const workflowContextClose = runPersona.indexOf("workflowContext?.close", logout)
  const loginContextClose = runPersona.indexOf("loginContext?.close", logout)
  assert.ok(traceStop >= 0)
  assert.ok(logout > traceStop)
  assert.ok(workflowContextClose > logout)
  assert.ok(loginContextClose > workflowContextClose)
})

test("listeners cover both login and workflow pages and failure screenshots either page", () => {
  assert.match(runPersona, /wirePage\(loginPage\)/)
  assert.match(runPersona, /wirePage\(page\)/)
  assert.match(runPersona, /const screenshotPage = page \?\? loginPage/)
  assert.match(runPersona, /targetPage\.on\('console'/)
  assert.match(runPersona, /targetPage\.on\('requestfailed'/)
  assert.match(runPersona, /targetPage\.on\('response'/)
})

test("logout status is required and projected into the summary", () => {
  assert.match(runPersona, /result\.logout_status\s*=\s*logoutResponse\.status\(\)/)
  assert.match(runPersona, /result\.logout_status\s*!==\s*200/)
  assert.match(source, /logout_status:\s*r\.logout_status/)
})
