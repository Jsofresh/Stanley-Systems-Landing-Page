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

test("login finishes before authenticated workflow tracing starts", () => {
  const login = runPersona.indexOf("await login(page, persona)")
  const traceStart = runPersona.indexOf("context.tracing.start")
  assert.ok(login >= 0)
  assert.ok(traceStart > login)
  assert.match(runPersona.slice(traceStart, traceStart + 120), /screenshots:\s*true/)
  assert.match(runPersona.slice(traceStart, traceStart + 120), /snapshots:\s*true/)
})

test("trace is saved before logout and logout precedes context close", () => {
  const traceStop = runPersona.indexOf("context.tracing.stop")
  const logout = runPersona.indexOf("/api/portal/logout")
  const contextClose = runPersona.indexOf("context.close")
  assert.ok(traceStop >= 0)
  assert.ok(logout > traceStop)
  assert.ok(contextClose > logout)
})

test("logout status is required and projected into the summary", () => {
  assert.match(runPersona, /result\.logout_status\s*=\s*logoutResponse\.status\(\)/)
  assert.match(runPersona, /result\.logout_status\s*!==\s*200/)
  assert.match(source, /logout_status:\s*r\.logout_status/)
})
