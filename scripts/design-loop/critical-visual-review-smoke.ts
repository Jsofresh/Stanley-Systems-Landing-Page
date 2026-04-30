import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { createHash } from "node:crypto"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import { writeJson } from "./_lib.ts"
import { makeFixtureManifest } from "./anti-ai-slop-gate.ts"
import { shouldRetryCodexPatch } from "./retry-policy.ts"
import { runHermesCriticalVisualReviewCommand } from "./hermes-critical-visual-review-command.ts"
import {
  runCriticalVisualReviewGate,
  validateCriticalSectionReview,
  type CriticalFinalDecision,
  type CriticalReviewPacket,
  type CriticalSectionReview,
} from "./critical-visual-review-gate.ts"

type SmokeCase = {
  name: string
  withDesktop?: boolean
  withMobile?: boolean
  mutateAfterPacket?: boolean
  reviewer?: (packet: CriticalReviewPacket) => string | CriticalSectionReview
  expectedStatus: "pass" | "fail"
  expectedDecision: CriticalFinalDecision
  expectedNextStatus?: string
}

const cases: SmokeCase[] = [
  {
    name: "missing_mobile_screenshot_blocks",
    withDesktop: true,
    withMobile: false,
    expectedStatus: "fail",
    expectedDecision: "blocked_missing_screenshot",
    expectedNextStatus: "blocked",
  },
  {
    name: "mock_pass_allows_aggregate_pass",
    withDesktop: true,
    withMobile: true,
    reviewer: (packet) => review(packet, "pass"),
    expectedStatus: "pass",
    expectedDecision: "pass",
    expectedNextStatus: "critical_visual_review_passed",
  },
  {
    name: "codex_patch_failure_is_retryable",
    withDesktop: true,
    withMobile: true,
    reviewer: (packet) => review(packet, "fail_codex_patch_needed"),
    expectedStatus: "fail",
    expectedDecision: "fail_codex_patch_needed",
    expectedNextStatus: "needs_patch_2",
  },
  {
    name: "revert_recommended_blocks_without_retry",
    withDesktop: true,
    withMobile: true,
    reviewer: (packet) => review(packet, "fail_revert_recommended"),
    expectedStatus: "fail",
    expectedDecision: "fail_revert_recommended",
    expectedNextStatus: "blocked",
  },
  {
    name: "missing_screenshot_decision_blocks_without_retry",
    withDesktop: true,
    withMobile: true,
    reviewer: (packet) => review(packet, "blocked_missing_screenshot"),
    expectedStatus: "fail",
    expectedDecision: "blocked_missing_screenshot",
    expectedNextStatus: "blocked",
  },
  {
    name: "generated_asset_failure_blocks_missing_asset",
    withDesktop: true,
    withMobile: true,
    reviewer: (packet) => review(packet, "fail_generated_asset_needed", "code_plus_generated_asset"),
    expectedStatus: "fail",
    expectedDecision: "fail_generated_asset_needed",
    expectedNextStatus: "blocked_missing_required_asset",
  },
  {
    name: "invalid_json_blocks_validation",
    withDesktop: true,
    withMobile: true,
    reviewer: () => "{not-json",
    expectedStatus: "fail",
    expectedDecision: "fail_revert_recommended",
    expectedNextStatus: "blocked",
  },
  {
    name: "missing_required_fields_blocks_validation",
    withDesktop: true,
    withMobile: true,
    reviewer: (packet) => JSON.stringify({ section_id: packet.section_id, final_decision: "pass" }),
    expectedStatus: "fail",
    expectedDecision: "fail_revert_recommended",
    expectedNextStatus: "blocked",
  },
  {
    name: "threshold_violation_pass_fails_closed",
    withDesktop: true,
    withMobile: true,
    reviewer: (packet) => ({ ...review(packet, "pass"), visual_quality_score: 6 }),
    expectedStatus: "fail",
    expectedDecision: "fail_codex_patch_needed",
    expectedNextStatus: "needs_patch_2",
  },
  {
    name: "section_match_no_blocks",
    withDesktop: true,
    withMobile: true,
    reviewer: (packet) => ({ ...review(packet, "pass"), section_match: "no" }),
    expectedStatus: "fail",
    expectedDecision: "fail_revert_recommended",
    expectedNextStatus: "blocked",
  },
  {
    name: "section_match_unclear_blocks",
    withDesktop: true,
    withMobile: true,
    reviewer: (packet) => ({ ...review(packet, "pass"), section_match: "unclear" }),
    expectedStatus: "fail",
    expectedDecision: "fail_revert_recommended",
    expectedNextStatus: "blocked",
  },
  {
    name: "reviewed_hash_mismatch_blocks",
    withDesktop: true,
    withMobile: true,
    reviewer: (packet) => ({
      ...review(packet, "pass"),
      reviewed_screenshot_hashes: { ...packet.metadata.screenshot_hashes, desktop_after: "bad-hash" },
    }),
    expectedStatus: "fail",
    expectedDecision: "fail_revert_recommended",
    expectedNextStatus: "blocked",
  },
  {
    name: "reviewed_path_mismatch_blocks",
    withDesktop: true,
    withMobile: true,
    reviewer: (packet) => ({
      ...review(packet, "pass"),
      reviewed_screenshot_paths: { ...packet.screenshots, desktop_after: `${packet.screenshots.desktop_after}.other` },
    }),
    expectedStatus: "fail",
    expectedDecision: "fail_revert_recommended",
    expectedNextStatus: "blocked",
  },
  {
    name: "screenshot_hash_mismatch_blocks",
    withDesktop: true,
    withMobile: true,
    mutateAfterPacket: true,
    reviewer: (packet) => review(packet, "pass"),
    expectedStatus: "fail",
    expectedDecision: "fail_revert_recommended",
    expectedNextStatus: "blocked",
  },
  {
    name: "public_copy_guardrail_blocks",
    withDesktop: true,
    withMobile: true,
    reviewer: (packet) => review(packet, "pass"),
    expectedStatus: "fail",
    expectedDecision: "fail_codex_patch_needed",
    expectedNextStatus: "needs_patch_2",
  },
]

const results = cases.map(runCase)
const wrapperSmoke = runWrapperSmoke()

const strictPacket = fixturePacket("strict-field-check")
const completeReview = review(strictPacket, "pass")
validateCriticalSectionReview(completeReview, "strict-field-check")
for (const field of [
  "section_id",
  "reviewer_version",
  "reviewed_screenshot_paths",
  "reviewed_screenshot_hashes",
  "section_match",
  "desktop_pass",
  "mobile_pass",
  "visual_quality_score",
  "ai_slop_score",
  "clarity_score",
  "mobile_score",
  "asset_strategy",
  "blockers",
  "warnings",
  "exact_fix_recommendation",
  "final_decision",
]) {
  const copy = { ...completeReview } as Record<string, unknown>
  delete copy[field]
  assertThrows(() => validateCriticalSectionReview(copy, "strict-field-check"), `missing ${field} should fail validation`)
}

assert(
  results.some((item) => item.name === "mock_pass_allows_aggregate_pass" && item.report.status === "pass"),
  "mock pass must allow aggregate pass",
)
assert(
  results.some((item) => item.name === "codex_patch_failure_is_retryable" && item.report.next_status === "needs_patch_2"),
  "fail_codex_patch_needed must map to needs_patch_2",
)
assertRetryPolicy("codex_patch_failure_is_retryable", true)
assertRetryPolicy("revert_recommended_blocks_without_retry", false)
assertRetryPolicy("missing_screenshot_decision_blocks_without_retry", false)
assertRetryPolicy("invalid_json_blocks_validation", false)
assert(
  results.some((item) => item.name === "generated_asset_failure_blocks_missing_asset" && item.report.next_status === "blocked_missing_required_asset"),
  "fail_generated_asset_needed must map to blocked_missing_required_asset",
)
assert(
  results.some((item) => item.name === "invalid_json_blocks_validation" && item.report.validation_failures.length > 0),
  "invalid JSON must create validation failure",
)

const smokeReportPath = join(tmpdir(), "stanley-design-loop-fixtures", `critical-visual-review-smoke-${Date.now()}.json`)
writeJson(smokeReportPath, {
  status: "pass",
  cases: results.map((item) => ({
    name: item.name,
    status: item.report.status,
    next_status: item.report.next_status,
    final_decision: item.report.sections[0]?.final_decision,
    validation_failures: item.report.validation_failures,
    packet_path: item.report.report_paths.packet_dir,
    report_path: item.report.report_paths.run_json,
  })),
  wrapper_smoke: wrapperSmoke,
})

console.log(JSON.stringify({ status: "pass", smoke_report_path: smokeReportPath }, null, 2))

function runCase(item: SmokeCase) {
  const manifest = makeFixtureManifest(`critical-visual-review-${item.name}-${Date.now()}`)
  const sectionId = "workflow-audit"
  const screenshots = {
    desktop: join(manifest.run_dir, "screenshots", "after", "desktop", `${sectionId}.png`),
    mobile: join(manifest.run_dir, "screenshots", "after", "mobile", `${sectionId}.png`),
  }
  if (item.withDesktop) writeFixturePng(screenshots.desktop)
  if (item.withMobile) writeFixturePng(screenshots.mobile)
  writeJson(join(manifest.run_dir, "section-registry.json"), {
    run_id: manifest.run_id,
    phase: "after",
    sections: [
      {
        section_id: sectionId,
        purpose: item.name === "public_copy_guardrail_blocks" ? "Hermes Workflow Audit copy focused on collected revenue." : "Workflow Audit section focused on collected revenue and owner relief.",
        offer: "Workflow Audit",
        screenshots,
      },
    ],
  })

  const report = runCriticalVisualReviewGate(manifest, {
    fixture: true,
    reviewer: item.reviewer,
    beforeInvoke: item.mutateAfterPacket
      ? (packet) => {
          writeFileSync(packet.screenshots.desktop_after, "changed after packet\n")
        }
      : undefined,
  })
  assert(report.status === item.expectedStatus, `${item.name} expected status ${item.expectedStatus}, received ${report.status}`)
  assert(
    report.sections[0]?.final_decision === item.expectedDecision,
    `${item.name} expected final decision ${item.expectedDecision}, received ${report.sections[0]?.final_decision}`,
  )
  if (item.expectedNextStatus) {
    assert(report.next_status === item.expectedNextStatus, `${item.name} expected next status ${item.expectedNextStatus}, received ${report.next_status}`)
  }

  const packetPath = join(report.report_paths.packet_dir, `${sectionId}.json`)
  const packetText = item.name === "public_copy_guardrail_blocks" ? "" : readPacket(packetPath)
  if (item.name !== "public_copy_guardrail_blocks") {
    assert(!/"codex_reasoning"|"build_history"|"implementation_debate"|"patch_rationale"|"self_evaluation"|"excuses"/i.test(packetText), `${item.name} packet contains biased implementation fields`)
    assert(packetText.includes("desktop_after") && packetText.includes("mobile_after"), `${item.name} packet must include after screenshots`)
    assert(packetText.includes("screenshot_hashes") && packetText.includes("captured_at"), `${item.name} packet must include screenshot proof metadata`)
    assert(packetText.includes("mandatory_questions"), `${item.name} packet must include visual review rubric`)
  }

  return { name: item.name, report }
}

function runWrapperSmoke() {
  const manifest = makeFixtureManifest(`critical-visual-review-command-${Date.now()}`)
  const sectionId = "workflow-audit"
  const desktop = join(manifest.run_dir, "screenshots", "after", "desktop", `${sectionId}.png`)
  const mobile = join(manifest.run_dir, "screenshots", "after", "mobile", `${sectionId}.png`)
  writeFixturePng(desktop)
  writeFixturePng(mobile)
  const packetPath = join(manifest.run_dir, "critical-visual-review", "packets", `${sectionId}.json`)
  writeJson(packetPath, {
    packet_version: "critical-visual-review-v1",
    run_id: manifest.run_id,
    section_id: sectionId,
    section_purpose: "Workflow Audit section focused on collected revenue and owner relief.",
    screenshots: {
      desktop_after: desktop,
      mobile_after: mobile,
    },
    metadata: {
      git_sha: "fixture",
      build_id: manifest.run_id,
      run_id: manifest.run_id,
      captured_at: new Date().toISOString(),
      screenshot_hashes: {
        desktop_after: sha256File(desktop),
        mobile_after: sha256File(mobile),
      },
      screenshot_modified_times: {
        desktop_after: new Date().toISOString(),
        mobile_after: new Date().toISOString(),
      },
    },
    review_prompt: {
      role: "Fixture reviewer.",
      output_contract: "Return only strict JSON.",
      mandatory_questions: ["Is the section visually credible?"],
      visual_rules: ["Use Stanley Systems visual standards."],
      anti_ai_slop_rules: ["Reject generic AI-looking filler."],
      approved_offer_copy_guardrails: ["Workflow Audit is the first step."],
    },
  })

  const fakeHermes = join(manifest.run_dir, "fake-hermes")
  const fixtureReviewJson = JSON.stringify({
    section_id: sectionId,
    reviewer_version: "fixture-hermes-wrapper",
    reviewed_screenshot_paths: {
      desktop_after: desktop,
      mobile_after: mobile,
    },
    reviewed_screenshot_hashes: {
      desktop_after: sha256File(desktop),
      mobile_after: sha256File(mobile),
    },
    section_match: "yes",
    desktop_pass: true,
    mobile_pass: true,
    visual_quality_score: 9,
    ai_slop_score: 1,
    clarity_score: 9,
    mobile_score: 9,
    asset_strategy: "code_only",
    blockers: [],
    warnings: [],
    exact_fix_recommendation: "No critical visual fix required.",
    final_decision: "pass",
  })
  writeTextExecutable(fakeHermes, `#!/usr/bin/env bash
set -euo pipefail
printf 'Hermes fixture preface\\n'
printf '%s\\n' '${fixtureReviewJson.replace(/'/g, "'\\''")}'
`)
  const previousHermesBin = process.env.HERMES_CRITICAL_VISUAL_REVIEW_HERMES_BIN
  process.env.HERMES_CRITICAL_VISUAL_REVIEW_HERMES_BIN = fakeHermes
  try {
    const ok = runHermesCriticalVisualReviewCommand([packetPath])
    assert(ok.ok, `wrapper fixture should pass: ${ok.ok ? "" : ok.error}`)
    assert(ok.review.final_decision === "pass", "wrapper fixture should return normalized strict review JSON")

    const missingArg = runHermesCriticalVisualReviewCommand([])
    assert(!missingArg.ok && /exactly one positional/.test(missingArg.error), "wrapper must fail closed without packet path")

    const malformedPacket = join(manifest.run_dir, "critical-visual-review", "packets", "malformed.json")
    writeFileSync(malformedPacket, "{not-json")
    const malformed = runHermesCriticalVisualReviewCommand([malformedPacket])
    assert(!malformed.ok && /malformed/.test(malformed.error), "wrapper must fail closed on malformed packet JSON")

    const missingScreenshotPacket = join(manifest.run_dir, "critical-visual-review", "packets", "missing-screenshot.json")
    writeJson(missingScreenshotPacket, {
      packet_version: "critical-visual-review-v1",
      run_id: manifest.run_id,
      section_id: sectionId,
      section_purpose: "Workflow Audit section focused on collected revenue and owner relief.",
      screenshots: {
        desktop_after: join(manifest.run_dir, "missing-desktop.png"),
        mobile_after: mobile,
      },
      metadata: {
        git_sha: "fixture",
        build_id: manifest.run_id,
        run_id: manifest.run_id,
        captured_at: new Date().toISOString(),
        screenshot_hashes: {
          desktop_after: "missing",
          mobile_after: sha256File(mobile),
        },
        screenshot_modified_times: {
          desktop_after: new Date().toISOString(),
          mobile_after: new Date().toISOString(),
        },
      },
      review_prompt: {
        role: "Fixture reviewer.",
        output_contract: "Return only strict JSON.",
        mandatory_questions: [],
        visual_rules: [],
        anti_ai_slop_rules: [],
        approved_offer_copy_guardrails: [],
      },
    })
    const missingScreenshot = runHermesCriticalVisualReviewCommand([missingScreenshotPacket])
    assert(!missingScreenshot.ok && /Missing desktop after screenshot/.test(missingScreenshot.error), "wrapper must fail closed on missing screenshots")

    return {
      status: "pass",
      packet_path: packetPath,
      fake_hermes_path: fakeHermes,
    }
  } finally {
    if (previousHermesBin === undefined) {
      delete process.env.HERMES_CRITICAL_VISUAL_REVIEW_HERMES_BIN
    } else {
      process.env.HERMES_CRITICAL_VISUAL_REVIEW_HERMES_BIN = previousHermesBin
    }
  }
}

function review(
  packet: CriticalReviewPacket,
  finalDecision: CriticalFinalDecision,
  assetStrategy: CriticalSectionReview["asset_strategy"] = "code_only",
): CriticalSectionReview {
  const passing = finalDecision === "pass"
  return {
    section_id: packet.section_id,
    reviewer_version: "fixture-critical-reviewer-v1",
    reviewed_screenshot_paths: packet.screenshots,
    reviewed_screenshot_hashes: packet.metadata.screenshot_hashes,
    section_match: "yes",
    desktop_pass: passing,
    mobile_pass: passing,
    visual_quality_score: passing ? 9 : 4,
    ai_slop_score: passing ? 1 : 8,
    clarity_score: passing ? 9 : 4,
    mobile_score: passing ? 9 : 4,
    asset_strategy: assetStrategy,
    blockers: passing ? [] : [`fixture blocker for ${finalDecision}`],
    warnings: passing ? [] : ["fixture warning"],
    exact_fix_recommendation: passing ? "No critical visual fix required." : "Apply the fixture-specific visual fix before approval.",
    final_decision: finalDecision,
  }
}

function writeFixturePng(path: string) {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, "fixture screenshot\n")
}

function sha256File(path: string): string {
  return createHash("sha256").update(readFileSync(path)).digest("hex")
}

function fixturePacket(sectionId: string): CriticalReviewPacket {
  const manifest = makeFixtureManifest(`critical-visual-review-schema-${Date.now()}`)
  const desktop = join(manifest.run_dir, "screenshots", "after", "desktop", `${sectionId}.png`)
  const mobile = join(manifest.run_dir, "screenshots", "after", "mobile", `${sectionId}.png`)
  writeFixturePng(desktop)
  writeFixturePng(mobile)
  return {
    packet_version: "critical-visual-review-v1",
    run_id: manifest.run_id,
    section_id: sectionId,
    section_purpose: "Workflow Audit section focused on collected revenue and owner relief.",
    screenshots: {
      desktop_after: desktop,
      mobile_after: mobile,
    },
    metadata: {
      git_sha: "fixture",
      build_id: manifest.run_id,
      run_id: manifest.run_id,
      captured_at: new Date().toISOString(),
      screenshot_hashes: {
        desktop_after: sha256File(desktop),
        mobile_after: sha256File(mobile),
      },
      screenshot_modified_times: {
        desktop_after: new Date().toISOString(),
        mobile_after: new Date().toISOString(),
      },
    },
    review_prompt: {
      role: "Fixture reviewer.",
      output_contract: "Return strict JSON.",
      mandatory_questions: [],
      visual_rules: [],
      anti_ai_slop_rules: [],
      approved_offer_copy_guardrails: [],
    },
  }
}

function writeTextExecutable(path: string, text: string) {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, text)
  chmodSync(path, 0o755)
}

function readPacket(path: string): string {
  return readFileSync(path, "utf8")
}

function assert(value: unknown, message: string) {
  if (!value) throw new Error(message)
}

function assertThrows(fn: () => unknown, message: string) {
  try {
    fn()
  } catch {
    return
  }
  throw new Error(message)
}

function assertRetryPolicy(name: string, expected: boolean) {
  const item = results.find((result) => result.name === name)
  assert(item, `${name} smoke case must exist`)
  const actual = shouldRetryCodexPatch({
    failureClass: item.report.next_status === "blocked_missing_required_asset"
      ? "blocked_missing_required_asset"
      : item.report.status === "fail"
        ? "critical_visual_review_failed"
        : null,
    finalGateDecision: item.report.final_gate_decision,
    reason: item.report.sections[0]?.exact_fix_recommendation || "fixture",
    inScopeFindings: [],
    criticalVisualReviewNextStatus: item.report.next_status,
    criticalVisualReviewSections: item.report.sections,
  })
  assert(actual === expected, `${name} expected retry policy ${expected}, received ${actual}`)
}
