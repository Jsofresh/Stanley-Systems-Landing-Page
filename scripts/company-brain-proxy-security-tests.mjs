import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const route = readFileSync(resolve(repoRoot, "app/api/company-brain/[...path]/route.ts"), "utf8")

test("proxy upstream is protected configuration rather than a hardcoded deployment", () => {
  assert.equal(route.includes('const BRAIN_BASE_URL = "https://brain-test.stanley-systems.com"'), false)
  assert.match(route, /COMPANY_BRAIN_UPSTREAM_URL/)
})

test("clients cannot attest or reconstruct provider actions outside Hermes conversation turns", () => {
  assert.equal(route.includes('"actions/confirm"'), false)
  assert.equal(route.includes("brain/actions/confirm"), false)
  assert.equal(route.includes("action_reference"), false)
  assert.equal(route.includes("confirmation_phrase"), false)
})

test("artifact proxy streams forced attachments with browser hardening", () => {
  assert.equal(route.includes("response.arrayBuffer()"), false)
  assert.match(route, /content-disposition/)
  assert.match(route, /attachment/)
  assert.match(route, /x-content-type-options/)
  assert.match(route, /nosniff/)
  assert.match(route, /portalArtifactAccessAllowed/)
  assert.match(route, /grantPortalArtifactAccess/)
})

test("uploads have explicit count, byte, and type limits before forwarding", () => {
  assert.match(route, /MAX_UPLOAD_FILES/)
  assert.match(route, /MAX_UPLOAD_BYTES/)
  assert.match(route, /ALLOWED_UPLOAD_TYPES/)
})

test("ambiguous proxy failures do not claim that no mutation occurred", () => {
  assert.equal(route.includes("Nothing was created or changed"), false)
  assert.match(route, /outcome is unknown/i)
})

test("degraded control responses fail HTTP readiness instead of reporting healthy 200", () => {
  assert.equal(route.includes("{ status: 200"), false)
  assert.match(route, /status: 503/)
})

test("signed outsider brain requests fail closed before upstream access", () => {
  const guardNeedle = 'session.role === "outsider" && path.startsWith("brain/")'
  const guardIndex = route.indexOf(guardNeedle)
  const upstreamConfigIndex = route.indexOf("const baseUrl = upstreamBaseUrl()", guardIndex)
  const fetchIndex = route.indexOf("response = await fetch(target", guardIndex)
  assert.ok(guardIndex >= 0, "outsider brain guard must exist")
  assert.ok(upstreamConfigIndex > guardIndex, "guard must precede upstream configuration")
  assert.ok(fetchIndex > upstreamConfigIndex, "guard must precede fetch(target)")
  const guard = route.slice(guardIndex, upstreamConfigIndex)
  assert.match(guard, /permission_denied/)
  assert.match(guard, /status:\s*403/)
  assert.match(guard, /securityHeaders\(\)/)
  assert.match(route, /"x-stanley-actor-role":\s*session\.role/)
  assert.doesNotMatch(route, /"x-stanley-actor-role":\s*(?:request|body|incoming)\./)
})
