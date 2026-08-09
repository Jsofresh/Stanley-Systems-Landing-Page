import test from "node:test"
import assert from "node:assert/strict"
import {
  applyWorkflowCommand,
  canSaveWorkflowAsRoutine,
  completionToWorkflowReceipt,
  createWorkflowAdapterState,
} from "../lib/company-brain/workflow.ts"

// TEST FIXTURES ONLY. These deterministic receipts never call a provider and
// must never be presented as live or customer evidence.
const TEST_FIXTURE_LABEL = "TEST FIXTURE ONLY"
const at = "2026-08-09T22:00:00.000Z"
const context = { workflowId: "conversation-test", tenantId: "tenant-test" }

function unit(outcome, system = "jobber", operation = "clientEdit") {
  return {
    kind: "provider_action",
    entity_code: "customer",
    operation,
    disposition: outcome === "executed_verified" ? "updated_existing" : "unspecified",
    outcome,
    system,
    claims: [],
    omissions: [],
    omissions_complete: true,
    failures: outcome === "failed" ? [{ reason_code: "provider_rejected" }] : [],
  }
}

function result(status, units) {
  const verified = new Set(["read_verified", "executed_verified", "source_verified", "nonfactual"])
  return {
    schema: "company_brain.work_result.v1",
    status,
    unit_count: units.length,
    verified_unit_count: units.filter((item) => verified.has(item.outcome)).length,
    omissions_complete: true,
    units,
  }
}

function verification(status, connectors, verifiedActionCount = 0) {
  return {
    status,
    source: "server_turn_receipt",
    connectors,
    action_count: connectors.length,
    verified_action_count: verifiedActionCount,
    completed_batch_replay: true,
    mutation_dispatch_count: connectors.length,
  }
}

test("success produces reconciled provider readback and same-tenant routine eligibility", () => {
  const receipt = completionToWorkflowReceipt({
    status: "completed",
    answer: `${TEST_FIXTURE_LABEL}: customer update verified.`,
    work_result: result("verified", [unit("executed_verified")]),
    provider_verification: verification("verified", ["jobber"], 1),
    artifacts: [],
  }, context)
  assert.ok(receipt)
  assert.equal(receipt?.resultSummary.status, "completed")
  assert.equal(receipt?.providerReadback[0].status, "verified")
  assert.equal(receipt?.reconciliationStatus, "reconciled")
  assert.equal(canSaveWorkflowAsRoutine(receipt, "tenant-test"), true)
  assert.equal(canSaveWorkflowAsRoutine(receipt, "different-tenant"), false)
  assert.equal(canSaveWorkflowAsRoutine({ ...receipt, providerReadback: [] }, "tenant-test"), false)
})

test("approval-required state preserves exact approval scope", () => {
  const initial = createWorkflowAdapterState(context.workflowId, context.tenantId, at)
  const state = applyWorkflowCommand(initial, {
    operation: "approve",
    sequence: 1,
    at,
    approval: { approvalRef: "approval_1234567890abcdef12345678", actionCount: 2, systems: ["Jobber", "QuickBooks"], choices: ["Approve", "Cancel"] },
  })
  assert.equal(state.phase, "approval_required")
  assert.equal(state.approval?.actionCount, 2)
})

test("cancellation remains explicit and never enables a saved routine", () => {
  const receipt = completionToWorkflowReceipt({ status: "cancelled", answer: `${TEST_FIXTURE_LABEL}: stopped.` }, context)
  assert.equal(receipt?.resultSummary.status, "cancelled")
  assert.equal(receipt?.reconciliationStatus, "reconciliation_required")
  assert.equal(canSaveWorkflowAsRoutine(receipt, context.tenantId), false)
})

test("provider rejection is shown as failed with rejected readback", () => {
  const receipt = completionToWorkflowReceipt({
    status: "failed",
    work_result: result("failed", [unit("failed")]),
    provider_verification: verification("invalid", ["jobber"]),
  }, context)
  assert.equal(receipt?.resultSummary.status, "failed")
  assert.equal(receipt?.providerReadback[0].status, "rejected")
  assert.equal(receipt?.reconciliationStatus, "failed")
})

test("partial completion reports verified units and exceptions without success gating", () => {
  const receipt = completionToWorkflowReceipt({
    status: "completed",
    work_result: result("partial", [unit("executed_verified"), unit("failed", "quickbooks", "invoiceCreate")]),
    provider_verification: verification("invalid", ["jobber", "quickbooks"], 1),
  }, context)
  assert.equal(receipt?.resultSummary.status, "partial")
  assert.equal(receipt?.resultSummary.completedUnits, 1)
  assert.equal(receipt?.reconciliationStatus, "reconciled_with_exceptions")
  assert.equal(canSaveWorkflowAsRoutine(receipt, context.tenantId), false)
})

test("unknown provider outcome requires reconciliation", () => {
  const receipt = completionToWorkflowReceipt({
    status: "completed",
    work_result: result("reconciliation_required", [unit("unknown_outcome")]),
    provider_verification: verification("invalid", ["jobber"]),
  }, context)
  assert.equal(receipt?.resultSummary.status, "unknown_outcome")
  assert.equal(receipt?.reconciliationStatus, "reconciliation_required")
})

test("stale updates and replayed events cannot overwrite newer state", () => {
  const initial = createWorkflowAdapterState(context.workflowId, context.tenantId, at)
  const running = applyWorkflowCommand(initial, { operation: "get_status", sequence: 2, at, phase: "running", label: `${TEST_FIXTURE_LABEL}: running` })
  const stale = applyWorkflowCommand(running, { operation: "start_work", sequence: 1, at, label: "stale" })
  const replay = applyWorkflowCommand(running, { operation: "get_status", sequence: 2, at, phase: "planning", label: "replay" })
  assert.equal(stale, running)
  assert.equal(replay, running)
})

test("malformed completion fails closed", () => {
  const malformed = completionToWorkflowReceipt({
    status: "completed",
    work_result: { ...result("verified", [unit("executed_verified")]), verified_unit_count: 0 },
    provider_verification: verification("verified", ["jobber"], 1),
  }, context)
  assert.equal(malformed, undefined)
  const initial = createWorkflowAdapterState(context.workflowId, context.tenantId, at)
  const state = applyWorkflowCommand(initial, { operation: "get_result", sequence: 1, at, error: "Malformed test fixture" })
  assert.equal(state.phase, "unknown_outcome")
  assert.equal(state.receipt, undefined)
})

test("reconnect status replay resumes monotonically without duplicate history", () => {
  const initial = createWorkflowAdapterState(context.workflowId, context.tenantId, at)
  const restored = applyWorkflowCommand(initial, { operation: "get_status", sequence: 1, at, phase: "running", label: `${TEST_FIXTURE_LABEL}: status restored` })
  const replay = applyWorkflowCommand(restored, { operation: "get_status", sequence: 1, at, phase: "running", label: "duplicate replay" })
  const resumed = applyWorkflowCommand(replay, { operation: "get_status", sequence: 2, at, phase: "running", label: `${TEST_FIXTURE_LABEL}: resumed` })
  assert.equal(replay.history.length, 1)
  assert.equal(resumed.history.length, 2)
  assert.equal(resumed.history.at(-1)?.label.includes("resumed"), true)
})
