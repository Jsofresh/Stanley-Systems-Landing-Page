export type VerificationDecision = {
  failureClass: string | null
  finalGateDecision: string
  reason: string
  inScopeFindings: unknown[]
  criticalVisualReviewNextStatus?: string
  criticalVisualReviewSections?: Array<{ final_decision?: string }>
}

export const NON_RETRYABLE_FAILURE_CLASSES = [
  "infrastructure_verification_bug",
  "bridge_missing",
  "capture_failed",
  "backup_failed",
  "deploy_failed",
  "live_smoke_failed",
  "protected_surface_touched",
  "build_failed",
  "blocked_missing_required_asset",
  "downgraded_visual_strategy",
] as const

export function shouldRetryCodexPatch(decision: VerificationDecision): boolean {
  if (decision.finalGateDecision === "verified_pending_deploy") return false
  if (!decision.failureClass) return false
  if ((NON_RETRYABLE_FAILURE_CLASSES as readonly string[]).includes(decision.failureClass)) return false
  if (decision.failureClass === "copy_guardrail_failed" || decision.failureClass === "offer_guardrail_failed") {
    return decision.inScopeFindings.length > 0 || decision.failureClass === "offer_guardrail_failed"
  }
  return (
    decision.failureClass === "design_verification_failed" ||
    decision.failureClass === "anti_ai_slop_failed" ||
    isRetryableCriticalVisualReviewFailure(decision)
  )
}

function isRetryableCriticalVisualReviewFailure(decision: VerificationDecision): boolean {
  if (decision.failureClass !== "critical_visual_review_failed") return false
  return (
    decision.criticalVisualReviewNextStatus === "needs_patch_2" &&
    (decision.criticalVisualReviewSections ?? []).some(
      (section) => section.final_decision === "fail_codex_patch_needed",
    )
  )
}
