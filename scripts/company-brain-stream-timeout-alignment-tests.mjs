import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const route = readFileSync(resolve(repoRoot, "app/api/company-brain/[...path]/route.ts"), "utf8")
const live = readFileSync(resolve(repoRoot, "lib/company-brain/live.ts"), "utf8")

const MINIMUM_MS = 480000
const REVERTED_MS = 180000

function extractProxyStreamTimeout(source) {
  const match = source.match(/nativeStreamRequest\s*\|\|\s*path\s*===\s*"brain\/chat"\s*\?\s*(\d+)/)
  assert.ok(match, "expected native-stream / brain/chat timeout constant in route.ts")
  return Number(match[1])
}

function extractClientStreamTimeout(source) {
  const match = source.match(/setTimeout\(\s*\(\)\s*=>\s*controller\.abort\(\)\s*,\s*(\d+)\s*\)/)
  assert.ok(match, "expected stream AbortController timeout constant in live.ts streamCompanyBrainMessage")
  return Number(match[1])
}

test("proxy native-stream / brain/chat timeout is at least 480000ms", () => {
  const proxyStreamTimeout = extractProxyStreamTimeout(route)
  assert.ok(
    proxyStreamTimeout >= MINIMUM_MS,
    `proxy native-stream timeout ${proxyStreamTimeout}ms is below the 480000ms minimum`,
  )
})

test("client stream AbortController timeout is at least 480000ms", () => {
  const clientStreamTimeout = extractClientStreamTimeout(live)
  assert.ok(
    clientStreamTimeout >= MINIMUM_MS,
    `client stream timeout ${clientStreamTimeout}ms is below the 480000ms minimum`,
  )
})

test("proxy and client stream timeouts are equal", () => {
  const proxyStreamTimeout = extractProxyStreamTimeout(route)
  const clientStreamTimeout = extractClientStreamTimeout(live)
  assert.equal(proxyStreamTimeout, clientStreamTimeout, "proxy and client stream timeouts must match to avoid a proxy/client abort race")
})

test("regression guard: neither stream timeout has reverted to 180000", () => {
  const proxyStreamTimeout = extractProxyStreamTimeout(route)
  const clientStreamTimeout = extractClientStreamTimeout(live)
  assert.notEqual(proxyStreamTimeout, REVERTED_MS, "proxy native-stream timeout reverted to 180000ms")
  assert.notEqual(clientStreamTimeout, REVERTED_MS, "client stream timeout reverted to 180000ms")
})
