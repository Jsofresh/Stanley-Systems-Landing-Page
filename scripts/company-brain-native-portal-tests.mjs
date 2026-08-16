import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import { companyBrainStreamRequestBody, isCompanyBrainApprovalEvent } from "../lib/company-brain/types.ts"

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
  assert.match(portal, /response\.schema === "company_brain\.portal_approval\.v1"/)
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
  assert.match(route, /projected\.event === "approval\.request"/)
  assert.match(live, /completion = data as unknown as NativePendingApproval/)
  const approvalEvent = {
    schema: "company_brain.portal_approval.v1",
    company_id: "company-test",
    conversation_id: "conversation-test",
    workflow_id: "conversation-test",
    server_sequence: 3,
    event_id: "event-test",
    phase: "approval_required",
    answer: "Approve this action?",
    action_reference: `actref_${"a".repeat(32)}`,
    action_count: 1,
    connectors: ["jobber"],
    choices: ["Approve", "Cancel"],
  }
  assert.equal(isCompanyBrainApprovalEvent(approvalEvent, "company-test", "conversation-test"), true)
  const missingReference = { ...approvalEvent }
  delete missingReference.action_reference
  assert.equal(isCompanyBrainApprovalEvent(missingReference, "company-test", "conversation-test"), false)
  assert.equal(isCompanyBrainApprovalEvent({ ...approvalEvent, action_reference: " " }, "company-test", "conversation-test"), false)
  const eventCallback = portal.match(/}, \(event\) => \{([\s\S]*?)\n      \}\)/)
  assert.ok(eventCallback)
  assert.doesNotMatch(eventCallback[1], /setPendingApproval/)
  assert.match(portal, /setMessages\([\s\S]*?response\.schema === "company_brain\.portal_approval\.v1"[\s\S]*?setPendingApproval\(response\)/)
  assert.match(portal, /catch \(error\)[\s\S]*?setPendingApproval\(null\)/)
  assert.doesNotMatch(live, /Company Brain could not finish that request\.\",\n    blocks:/)
  assert.doesNotMatch(route, /\\\\n/)
})

test("native stream forwards only the runtime request contract", () => {
  const streamForwarding = route.match(/else if \(path\.endsWith\("\/chat\/stream"\)\) \{([\s\S]*?)\n        \} else \{/)
  assert.ok(streamForwarding)
  assert.match(streamForwarding[1], /body = JSON\.stringify\(\{\s*conversation_id: conversationId,\s*message,\s*attachments: sanitizedAttachments\(incoming\.attachments\),\s*approval_decision: incoming\.approval_decision,\s*action_reference: incoming\.action_reference,\s*last_server_sequence: incoming\.last_server_sequence,\s*last_event_id: incoming\.last_event_id,\s*\}\)/)
  assert.doesNotMatch(streamForwarding[1], /\btitle\s*:/)
})

test("approval button builds the sealed continuation accepted by the proxy contract", () => {
  const request = companyBrainStreamRequestBody({
    companyId: "company-test",
    conversationId: "conversation-test",
    message: "Approve",
    attachments: [],
    approvalContinuation: {
      decision: "Approve",
      actionReference: `actref_${"a".repeat(32)}`,
      serverSequence: 3,
      eventId: "event-test",
    },
  })
  assert.deepEqual(request, {
    conversation_id: "conversation-test",
    message: "Approve",
    attachments: [],
    approval_decision: "Approve",
    action_reference: `actref_${"a".repeat(32)}`,
    last_server_sequence: 3,
    last_event_id: "event-test",
  })
  assert.match(portal, /onClick=\{\(\) => void sendMessage\(choice, \[\], \{\s*decision: choice,\s*actionReference: pendingApproval\.action_reference,\s*serverSequence: pendingApproval\.server_sequence,\s*eventId: pendingApproval\.event_id,/)
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
  assert.match(route, /company_brain\.portal_approval\.v1/)
  assert.match(route, /source\.phase !== "approval_required"/)
  assert.match(route, /publicEventIdentity\(source, companyId, conversationId\)/)
  assert.match(route, /\^actref_\[A-Za-z0-9_-\]\{32,128\}\$/)
  assert.match(route, /Number\.isSafeInteger\(source\.action_count\)/)
  assert.match(route, /actions\.length !== actionCount/)
  assert.match(route, /connectorsMatchActions/)
  assert.match(route, /connectorsMatchCollapsedSingleProvider/)
  assert.match(route, /action_reference: source\.action_reference/)
  assert.match(route, /connectors: projectedConnectors/)
  assert.match(route, /!approvalSummary/)
  assert.match(route, /choices\[0\] !== "Approve"/)
  assert.match(route, /choices\[1\] !== "Cancel"/)
  assert.match(route, /data: request/)
  const projected = route.match(/return \{\s*schema: source\.schema,[\s\S]*?choices: \["Approve", "Cancel"\],[\s\S]*?\n  \}/)
  assert.ok(projected)
  assert.doesNotMatch(projected[0], /actions|approval_summary/)
  assert.match(live, /Company Brain returned a mismatched approval event/)
})

test("pending approval reload reuses the sealed server projection", () => {
  assert.match(route, /\/messages\|\\\/chat\\\/stream\|\\\/cancel\|\\\/approval/)
  assert.match(route, /path\.endsWith\("\/approval"\) && response\.ok/)
  assert.match(route, /publicApprovalRequest\(parsed, session\.companyId, conversationId\)/)
  assert.match(route, /if \(!approval\) return jsonError\("invalid_upstream_response", 502\)/)
  assert.match(live, /getCompanyBrainPendingApproval/)
  assert.match(live, /if \(response\.status === 404\) return null/)
  assert.match(live, /isCompanyBrainApprovalEvent\(data as Record<string, unknown>, companyId, conversationId\)/)
  assert.match(portal, /getCompanyBrainPendingApproval\(companyId, activeId\)/)
  assert.match(portal, /getCompanyBrainPendingApproval\(session\?\.companyId \?\? "", conversation\.id\)/)
  assert.match(portal, /setPendingApproval\(approval\)/)
  assert.match(portal, /setPendingApproval\(null\)/)
})

test("approval reload is GET-only and stale hydration cannot overwrite a switched conversation", () => {
  const approvalMethodGuard = route.indexOf('path.endsWith("/approval") && request.method !== "GET"')
  const upstreamFetch = route.indexOf("response = await fetch(target")
  assert.ok(approvalMethodGuard >= 0 && upstreamFetch > approvalMethodGuard)
  assert.match(route.slice(approvalMethodGuard, upstreamFetch), /method_not_allowed.*405/)

  const hydration = portal.match(/const \[history, approval\] = await Promise\.all\([\s\S]*?setPendingApproval\(approval\)/)
  assert.ok(hydration)
  assert.match(hydration[0], /currentConversationIdRef\.current !== activeId/)
  assert.ok(hydration[0].indexOf("currentConversationIdRef.current !== activeId") < hydration[0].indexOf("setMessages"))
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
