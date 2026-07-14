import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const portal = fs.readFileSync(path.join(root, "components/portal/portal-app.tsx"), "utf8")
const live = fs.readFileSync(path.join(root, "lib/company-brain/live.ts"), "utf8")
const route = fs.readFileSync(path.join(root, "app/api/company-brain/[...path]/route.ts"), "utf8")


test("portal chat uses Hermes sessions and does not cache full transcripts", () => {
  assert.match(portal, /getCompanyBrainSessions/)
  assert.match(portal, /getCompanyBrainSessionMessages/)
  assert.match(portal, /streamCompanyBrainMessage/)
  assert.match(portal, /nativeCompletionBlocks/)
  assert.match(portal, /PreviewDialog preview=\{preview\}/)
  assert.doesNotMatch(portal, /sessionStorage/)
  assert.doesNotMatch(portal, /session-index/)
  assert.doesNotMatch(portal, /mapCompanyBrainResponseBlocks\(response\)/)
  assert.doesNotMatch(portal, /conversation\.messages/)
  assert.doesNotMatch(portal, /messages\.slice\(/)
})

test("native stream exposes generic progress/completion state", () => {
  assert.match(live, /\/brain\/sessions\//)
  assert.match(live, /assistant\.delta/)
  assert.match(portal, /tool\.progress/)
  assert.match(portal, /approval\.request/)
  assert.match(portal, /onChoice/)
  assert.match(live, /status\?: \"completed\" \| \"failed\" \| \"cancelled\"/)
  assert.match(live, /stanley\.completed/)
})

test("authenticated proxy binds actor identity and authorizes native artifacts", () => {
  assert.match(route, /x-stanley-actor-name/) 
  assert.match(route, /x-stanley-actor-email/)
  assert.match(route, /authorizedNativeStream/)
  assert.match(route, /grantPortalArtifactAccess\(portalSessionStoreDir\(\), sessionKey, artifactIds\)/)
  assert.match(route, /nativeCompletionArtifactIds/)
})
