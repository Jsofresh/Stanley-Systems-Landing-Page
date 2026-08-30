type JsonRecord = Record<string, unknown>

const DIGEST = /^sha256:[0-9a-f]{64}$/
const ACTION_REFERENCE = /^actref_[A-Za-z0-9_-]{32,128}$/
const SAFE_IDENTIFIER = /^[A-Za-z0-9_.:-]{1,160}$/
const TIMESTAMP = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?Z$/
const CONNECTORS = new Set(["jobber", "quickbooks"])
const LEGACY_SOURCES = new Set(["conversation", "provider_action_batch"])
const LEGACY_STATUSES = new Set([
  "not_applicable",
  "read_verified",
  "executed_verified",
  "already_completed",
  "partial",
  "failed_before_dispatch",
  "failed",
  "unknown_outcome_reconciliation_required",
])
const LAYER_D_STATUSES = new Set([
  "verified_no_effect",
  "executed_verified",
  "already_completed",
  "partial",
  "failed_before_dispatch",
  "failed",
  "unknown_outcome_reconciliation_required",
])
const BASE_RECEIPT_KEYS = [
  "schema",
  "binding",
  "source",
  "status",
  "connectors",
  "action_count",
  "verified_action_count",
  "mutation_dispatch_count",
  "completed_batch_replay",
  "provider_readback_status",
  "provider_write_claimed",
  "safe_summary",
]
const COUNT_KEYS = [
  "source_count",
  "distinct_member_count",
  "duplicate_observation_count",
  "selected_count",
  "selected_by_branch",
  "ineligible_count",
  "already_satisfied_count",
  "bounded_out_count",
  "ambiguous_count",
  "conflict_blocked_count",
  "skipped_count",
]
const TERMINAL_COUNT_KEYS = [
  "selected_children",
  "executed",
  "verified",
  "already_completed",
  "skipped",
  "failed",
  "unknown",
  "not_dispatched",
]

function record(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? value as JsonRecord : null
}

function exactObjectKeys(value: JsonRecord, expected: string[]) {
  const actual = Object.keys(value).sort()
  const wanted = [...expected].sort()
  return actual.length === wanted.length && actual.every((key, index) => key === wanted[index])
}

function integer(value: unknown, maximum = 100) {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 && value <= maximum
}

function safeText(value: unknown, maximum: number, minimum = 1) {
  return typeof value === "string"
    && value.length >= minimum
    && value.length <= maximum
    && !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)
}

function timestamp(value: unknown) {
  return typeof value === "string" && TIMESTAMP.test(value) && Number.isFinite(Date.parse(value))
}

function sameJson(left: unknown, right: unknown): boolean {
  if (left === right) return true
  if (Array.isArray(left) || Array.isArray(right)) {
    return Array.isArray(left) && Array.isArray(right)
      && left.length === right.length
      && left.every((item, index) => sameJson(item, right[index]))
  }
  const leftRecord = record(left)
  const rightRecord = record(right)
  if (!leftRecord || !rightRecord) return false
  const leftKeys = Object.keys(leftRecord).sort()
  const rightKeys = Object.keys(rightRecord).sort()
  return leftKeys.length === rightKeys.length
    && leftKeys.every((key, index) => key === rightKeys[index] && sameJson(leftRecord[key], rightRecord[key]))
}

function publicBranchCounts(value: unknown) {
  const counts = record(value)
  if (!counts || !exactObjectKeys(counts, COUNT_KEYS)) return null
  const integerKeys = COUNT_KEYS.filter((key) => key !== "selected_by_branch")
  if (integerKeys.some((key) => !integer(counts[key], 100))) return null
  const selectedByBranch = counts.selected_by_branch
  if (!Array.isArray(selectedByBranch) || selectedByBranch.length > 48) return null
  const branches = new Set<string>()
  let selectedTotal = 0
  for (const raw of selectedByBranch) {
    const item = record(raw)
    if (!item || !exactObjectKeys(item, ["branch_id", "count"])
      || typeof item.branch_id !== "string" || !SAFE_IDENTIFIER.test(item.branch_id)
      || !integer(item.count, 48) || item.count === 0 || branches.has(item.branch_id)) return null
    branches.add(item.branch_id)
    selectedTotal += Number(item.count)
  }
  const distinct = Number(counts.distinct_member_count)
  const classified = Number(counts.selected_count)
    + Number(counts.ineligible_count)
    + Number(counts.already_satisfied_count)
    + Number(counts.bounded_out_count)
    + Number(counts.ambiguous_count)
    + Number(counts.conflict_blocked_count)
  if (Number(counts.source_count) !== distinct + Number(counts.duplicate_observation_count)
    || distinct !== classified
    || Number(counts.selected_count) !== selectedTotal
    || Number(counts.skipped_count) !== Number(counts.ineligible_count) + Number(counts.already_satisfied_count) + Number(counts.bounded_out_count)) return null
  return counts
}

function publicLayerDScope(value: unknown) {
  const scope = record(value)
  const keys = [
    "schema", "scenario_id", "business", "predicate_label", "predicate_identity",
    "counts", "bounded_maximum", "maximum_effect_count", "safe_membership_digest",
    "scope_digest", "consequence_summary", "later_matches_outside_approval",
    "frozen_at", "expires_at", "execution_authority",
  ]
  const counts = scope ? publicBranchCounts(scope.counts) : null
  if (!scope || !exactObjectKeys(scope, keys) || !counts
    || scope.schema !== "stanley.stage4.public-scope-receipt.v1"
    || typeof scope.scenario_id !== "string" || !SAFE_IDENTIFIER.test(scope.scenario_id)
    || (scope.business !== "A" && scope.business !== "B")
    || !safeText(scope.predicate_label, 240) || !safeText(scope.predicate_identity, 240)
    || !integer(scope.bounded_maximum, 24) || !integer(scope.maximum_effect_count, 48)
    || Number(counts.selected_count) > Number(scope.bounded_maximum)
    || Number(scope.maximum_effect_count) < Number(counts.selected_count)
    || Number(scope.maximum_effect_count) > Number(counts.selected_count) * 2
    || typeof scope.safe_membership_digest !== "string" || !DIGEST.test(scope.safe_membership_digest)
    || typeof scope.scope_digest !== "string" || !DIGEST.test(scope.scope_digest)
    || !safeText(scope.consequence_summary, 1000)
    || scope.later_matches_outside_approval !== true || scope.execution_authority !== false
    || !timestamp(scope.frozen_at) || !timestamp(scope.expires_at)
    || Date.parse(String(scope.expires_at)) <= Date.parse(String(scope.frozen_at))) return null
  return scope
}

function publicTerminalCounts(value: unknown) {
  const counts = record(value)
  if (!counts || !exactObjectKeys(counts, TERMINAL_COUNT_KEYS)
    || TERMINAL_COUNT_KEYS.some((key) => !integer(counts[key], 100))) return null
  if (Number(counts.executed) !== Number(counts.verified) + Number(counts.already_completed) + Number(counts.failed) + Number(counts.unknown)) return null
  return counts
}

function publicLayerDRun(value: unknown, scope: JsonRecord) {
  const run = record(value)
  const keys = [
    "schema", "scenario_id", "business", "scope_digest", "graph_digest",
    "branch_counts", "terminal_counts", "mutation_dispatch_count",
    "provider_enumeration_dispatch_count", "enumeration_complete", "fan_in_state",
    "replay_source_mode", "terminal_at", "run_digest", "safe_summary",
  ]
  const terminal = run ? publicTerminalCounts(run.terminal_counts) : null
  if (!run || !exactObjectKeys(run, keys) || !terminal
    || run.schema !== "stanley.stage4.public-run-receipt.v1"
    || run.scenario_id !== scope.scenario_id || run.business !== scope.business
    || run.scope_digest !== scope.scope_digest
    || typeof run.graph_digest !== "string" || !DIGEST.test(run.graph_digest)
    || !sameJson(run.branch_counts, scope.counts)
    || Number(terminal.selected_children) !== Number(record(scope.counts)?.selected_count)
    || !integer(run.mutation_dispatch_count, 48)
    || !integer(run.provider_enumeration_dispatch_count, 64)
    || run.enumeration_complete !== true
    || !["completed_verified_no_effect", "completed_verified", "reconciliation_required", "failed", "partial"].includes(String(run.fan_in_state))
    || !["current_execution", "durable_original"].includes(String(run.replay_source_mode))
    || !timestamp(run.terminal_at)
    || typeof run.run_digest !== "string" || !DIGEST.test(run.run_digest)
    || !safeText(run.safe_summary, 1000)) return null
  if (run.replay_source_mode === "durable_original"
    && (run.mutation_dispatch_count !== 0 || run.provider_enumeration_dispatch_count !== 0)) return null
  return run
}

function legacyPublicStreamText(value: unknown, maximum = 12000) {
  if (typeof value !== "string") return ""
  return value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").slice(0, maximum)
}

function layerDReceiptCommonValid(source: JsonRecord, companyId: string, conversationId: string) {
  const binding = record(source.binding)
  const connectors = source.connectors
  const safeSummary = source.safe_summary
  return Boolean(
    binding && exactObjectKeys(binding, ["company_id", "conversation_id"])
    && binding.company_id === companyId && binding.conversation_id === conversationId
    && source.schema === "company_brain.public_turn_receipt.v1"
    && Array.isArray(connectors) && connectors.length <= 2
    && connectors.every((item) => typeof item === "string" && CONNECTORS.has(item))
    && new Set(connectors).size === connectors.length
    && integer(source.action_count) && integer(source.verified_action_count)
    && Number(source.verified_action_count) <= Number(source.action_count)
    && integer(source.mutation_dispatch_count)
    && typeof source.completed_batch_replay === "boolean"
    && ["verified", "unavailable", "not_required"].includes(String(source.provider_readback_status))
    && typeof source.provider_write_claimed === "boolean"
    && Array.isArray(safeSummary) && safeSummary.length <= 16
    && safeSummary.every((item) => typeof item === "string" && safeText(item, 1000, 0))
    && (!Object.hasOwn(source, "action_reference")
      || (typeof source.action_reference === "string" && ACTION_REFERENCE.test(source.action_reference)))
  )
}

function publicLegacyReceipt(source: JsonRecord, companyId: string, conversationId: string) {
  const keys = Object.hasOwn(source, "action_reference") ? [...BASE_RECEIPT_KEYS, "action_reference"] : BASE_RECEIPT_KEYS
  const binding = record(source.binding)
  const connectors = Array.isArray(source.connectors) ? source.connectors : []
  const safeSummary = Array.isArray(source.safe_summary) ? source.safe_summary : []
  if (!exactObjectKeys(source, keys)
    || !binding || !exactObjectKeys(binding, ["company_id", "conversation_id"])
    || binding.company_id !== companyId || binding.conversation_id !== conversationId
    || source.schema !== "company_brain.public_turn_receipt.v1"
    || !LEGACY_SOURCES.has(String(source.source))
    || !LEGACY_STATUSES.has(String(source.status))
    || connectors.length > 100 || connectors.some((item) => item !== "jobber" && item !== "quickbooks")
    || ![source.action_count, source.verified_action_count, source.mutation_dispatch_count]
      .every((item) => integer(item, 100))
    || typeof source.completed_batch_replay !== "boolean"
    || !["verified", "unavailable", "not_required"].includes(String(source.provider_readback_status))
    || typeof source.provider_write_claimed !== "boolean"
    || safeSummary.length > 16
    || safeSummary.some((item) => typeof item !== "string" || item !== legacyPublicStreamText(item, 240))
    || (Object.hasOwn(source, "action_reference")
      && (typeof source.action_reference !== "string" || !ACTION_REFERENCE.test(source.action_reference)))) return undefined
  return source
}

function publicLayerDReceipt(source: JsonRecord, companyId: string, conversationId: string) {
  const keys = [
    ...BASE_RECEIPT_KEYS,
    "dynamic_scope",
    ...(Object.hasOwn(source, "dynamic_run") ? ["dynamic_run"] : []),
    ...(Object.hasOwn(source, "provider_enumeration_dispatch_count") ? ["provider_enumeration_dispatch_count"] : []),
    ...(Object.hasOwn(source, "action_reference") ? ["action_reference"] : []),
  ]
  const scope = publicLayerDScope(source.dynamic_scope)
  const hasRun = Object.hasOwn(source, "dynamic_run")
  const run = hasRun && scope ? publicLayerDRun(source.dynamic_run, scope) : null
  if (!exactObjectKeys(source, keys) || source.source !== "layer_d_scope"
    || !LAYER_D_STATUSES.has(String(source.status))
    || !layerDReceiptCommonValid(source, companyId, conversationId)
    || !scope || (hasRun && !run)
    || (Object.hasOwn(source, "provider_enumeration_dispatch_count")
      && !integer(source.provider_enumeration_dispatch_count, 64))) return undefined

  const branchCounts = scope.counts as JsonRecord
  if (source.status === "verified_no_effect") {
    const terminal = run?.terminal_counts as JsonRecord | undefined
    if (!run || !terminal || source.action_count !== 0 || source.verified_action_count !== 0
      || source.mutation_dispatch_count !== 0 || source.provider_write_claimed !== false
      || source.provider_readback_status !== "verified"
      || source.completed_batch_replay !== false
      || branchCounts.selected_count !== 0 || terminal.selected_children !== 0
      || terminal.executed !== 0 || run.mutation_dispatch_count !== 0
      || run.replay_source_mode !== "current_execution"
      || run.fan_in_state !== "completed_verified_no_effect"
      || (Object.hasOwn(source, "provider_enumeration_dispatch_count")
        && source.provider_enumeration_dispatch_count !== run.provider_enumeration_dispatch_count)) return undefined
  } else if (source.status === "executed_verified" || source.status === "already_completed") {
    const terminal = run?.terminal_counts as JsonRecord | undefined
    if (!run || !terminal || Number(source.action_count) < 1 || source.verified_action_count !== source.action_count
      || scope.maximum_effect_count !== source.action_count
      || Number(branchCounts.selected_count) < 1
      || terminal.selected_children !== branchCounts.selected_count
      || terminal.executed !== source.action_count
      || Number(terminal.verified) + Number(terminal.already_completed) !== Number(source.action_count)
      || terminal.failed !== 0 || terminal.unknown !== 0 || terminal.not_dispatched !== 0
      || run.fan_in_state !== "completed_verified" || source.provider_write_claimed !== true
      || source.provider_readback_status !== "verified" || !Object.hasOwn(source, "action_reference")) return undefined
    if (source.status === "already_completed") {
      if (source.completed_batch_replay !== true || source.mutation_dispatch_count !== 0
        || source.provider_enumeration_dispatch_count !== 0
        || run.replay_source_mode !== "durable_original") return undefined
    } else if (source.completed_batch_replay !== false
      || run.replay_source_mode !== "current_execution"
      || source.mutation_dispatch_count !== run.mutation_dispatch_count
      || source.provider_enumeration_dispatch_count !== run.provider_enumeration_dispatch_count) return undefined
  } else if (source.status === "failed_before_dispatch") {
    if (source.verified_action_count !== 0 || source.mutation_dispatch_count !== 0
      || source.provider_write_claimed !== false || source.provider_readback_status !== "not_required"
      || (Object.hasOwn(source, "provider_enumeration_dispatch_count")
        && source.provider_enumeration_dispatch_count !== 0)) return undefined
  } else if (run) {
    const terminal = run.terminal_counts as JsonRecord
    const verified = Number(terminal.verified) + Number(terminal.already_completed)
    if (source.action_count !== scope.maximum_effect_count
      || source.verified_action_count !== verified
      || source.mutation_dispatch_count !== run.mutation_dispatch_count
      || source.provider_enumeration_dispatch_count !== run.provider_enumeration_dispatch_count
      || source.provider_write_claimed !== (verified > 0)
      || source.provider_readback_status !== "unavailable") return undefined
  } else if (source.verified_action_count !== 0 || source.mutation_dispatch_count !== 0
    || source.provider_write_claimed !== false
    || (Object.hasOwn(source, "provider_enumeration_dispatch_count")
      && source.provider_enumeration_dispatch_count !== 0)) {
      return undefined
  }
  return source
}

export function publicTerminalReceipt(value: unknown, companyId: string, conversationId: string) {
  const source = record(value)
  if (!source) return undefined
  return source.source === "layer_d_scope"
    ? publicLayerDReceipt(source, companyId, conversationId)
    : publicLegacyReceipt(source, companyId, conversationId)
}
