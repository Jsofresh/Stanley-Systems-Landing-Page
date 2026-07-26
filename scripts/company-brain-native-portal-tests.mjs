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
  assert.match(live, /sawDone/)
  assert.match(route, /publicProviderVerification/)
  assert.match(route, /server_turn_receipt/)
  assert.match(route, /provider_verification: publicProviderVerification\(source\.provider_verification\)/)
  assert.doesNotMatch(live, /Company Brain could not finish that request\.\",\n    blocks:/)
  assert.doesNotMatch(route, /\\\\n/)
})

test("native completion projects only validated structured work-result facts", () => {
  assert.match(route, /function publicWorkResult/)
  assert.match(route, /company_brain\.work_result\.v1/)
  assert.match(route, /work_result: publicWorkResult\(source\.work_result\)/)
  assert.match(route, /matched_existing/)
  assert.match(route, /created_new/)
  assert.match(route, /source_read/)
  assert.match(route, /reason_code/)
  assert.doesNotMatch(route, /record_digest: source\.record_digest/)
  assert.doesNotMatch(route, /unit_digest: unit\.unit_digest/)
  assert.match(route, /unitCount !== units\.length/)
  assert.match(route, /source\.status !== expectedStatus/)
  assert.match(route, /verifiedUnitCount !== units\.filter/)
})

test("native approval projection preserves only an exact deterministic binding", () => {
  assert.match(route, /function publicApprovalRequest/)
  assert.match(route, /company_brain\.approval_request\.v1/)
  assert.match(route, /pending_approval/)
  assert.match(route, /\^approval_\[0-9a-f\]\{24\}\$/)
  assert.match(route, /Number\.isSafeInteger\(source\.action_count\)/)
  assert.match(route, /new Set\(connectors\)\.size !== connectors\.length/)
  assert.match(route, /choices\[0\] !== "Approve"/)
  assert.match(route, /choices\[1\] !== "Cancel"/)
  assert.match(route, /data: request/)
  assert.doesNotMatch(route, /data: \{ choices \}/)
})

test("authenticated proxy binds actor identity and authorizes native artifacts", () => {
  assert.match(route, /x-stanley-actor-name/) 
  assert.match(route, /x-stanley-actor-email/)
  assert.match(route, /authorizedNativeStream/)
  assert.match(route, /grantPortalArtifactAccess\(portalSessionStoreDir\(\), sessionKey, artifactIds\)/)
  assert.match(route, /nativeCompletionArtifactIds/)
})

test("portal remains a thin conversation surface with no client approval endpoint or action doctrine", () => {
  assert.doesNotMatch(route, /actions\/confirm/)
  assert.doesNotMatch(route, /action_reference/)
  assert.doesNotMatch(route, /confirmation_phrase/)
  assert.doesNotMatch(portal, /approvalReference/)
})

test("active requests cannot be detached from their originating conversation", () => {
  assert.match(portal, /if \(isSendingRef\.current\) \{[\s\S]*?before switching conversations/)
  assert.match(portal, /if \(isSendingRef\.current\) \{[\s\S]*?before starting another conversation/)
  assert.match(portal, /busy=\{isSending \|\| isUploading\}/)
  assert.match(portal, /disabled=\{busy\}/)
})
