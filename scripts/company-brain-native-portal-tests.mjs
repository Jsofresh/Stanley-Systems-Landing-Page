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

test("native stream accepts every versioned terminal result and requires its done", () => {
  assert.match(live, /\/brain\/sessions\//)
  assert.match(portal, /assistant\.delta/)
  assert.match(portal, /tool\.progress/)
  assert.match(portal, /approval\.request/)
  assert.match(portal, /onChoice/)
  assert.match(live, /status: \"completed\" \| \"partial\" \| \"failed\" \| \"cancelled\" \| \"unknown_outcome\"/)
  for (const event of ["stanley.completed", "stanley.failed", "stanley.cancelled", "stanley.unknown"]) {
    assert.match(live, new RegExp(event.replace(".", "\\.")))
    assert.match(route, new RegExp(event.replace(".", "\\.")))
  }
  assert.match(live, /data\.status === \"failed\" \|\| data\.status === \"partial\"/)
  assert.match(live, /sawDone/)
  assert.match(live, /stale or mismatched completion marker/)
  assert.match(route, /sameEventIdentity\(projected\.data, state\.terminal\)/)
  assert.doesNotMatch(live, /Company Brain could not finish that request\.\",\n    blocks:/)
  assert.doesNotMatch(route, /\\\\n/)
})

test("native stream forwards only the runtime request contract", () => {
  const streamForwarding = route.match(/else if \(path\.endsWith\("\/chat\/stream"\)\) \{([\s\S]*?)\n        \} else \{/)
  assert.ok(streamForwarding)
  assert.match(streamForwarding[1], /body = JSON\.stringify\(\{\s*conversation_id: conversationId,\s*message,\s*attachments: sanitizedAttachments\(incoming\.attachments\),\s*\}\)/)
  assert.doesNotMatch(streamForwarding[1], /\btitle\s*:/)
})

test("terminal receipt retains the complete public contract including batch references", () => {
  assert.match(route, /company_brain\.portal_result\.v1/)
  assert.match(route, /company_brain\.public_turn_receipt\.v1/)
  for (const field of ["source", "provider_write_claimed", "safe_summary", "action_reference"]) {
    assert.match(route, new RegExp(`\\"${field}\\"`))
    assert.match(live, new RegExp(`${field}\\??:`))
  }
  assert.match(route, /return source/)
  assert.doesNotMatch(route, /object: \"hermes\.portal\.completion\"/)
  assert.doesNotMatch(route, /provider_verification: publicProviderVerification/)
  assert.doesNotMatch(route, /work_result: publicWorkResult/)
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
  assert.match(route, /artifactIdsFromChatResponse\(projected\.data\)/)
})

test("portal remains a thin conversation surface with no client approval endpoint or action doctrine", () => {
  assert.doesNotMatch(route, /actions\/confirm/)
  assert.doesNotMatch(route, /confirmation_phrase/)
  assert.doesNotMatch(portal, /approvalReference/)
})

test("portal renders the server terminal answer without local status replacement", () => {
  assert.match(portal, /blocks: nativeCompletionBlocks\(response\)/)
  assert.doesNotMatch(portal, /response\.status && response\.status !== \"completed\"/)
})

test("active requests cannot be detached from their originating conversation", () => {
  assert.match(portal, /if \(isSendingRef\.current\) \{[\s\S]*?before switching conversations/)
  assert.match(portal, /if \(isSendingRef\.current\) \{[\s\S]*?before starting another conversation/)
  assert.match(portal, /busy=\{isSending \|\| isUploading\}/)
  assert.match(portal, /disabled=\{busy\}/)
})
