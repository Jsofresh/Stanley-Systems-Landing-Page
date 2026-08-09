import { mkdirSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { writeJson } from "./_lib.ts"
import { evaluateSection, makeFixtureManifest, runVisualAssetGate, writeGateReports, type SectionEvidence } from "./anti-ai-slop-gate.ts"

const manifest = makeFixtureManifest(`anti-ai-slop-smoke-${Date.now()}`)
const fixtureAssetDir = join(tmpdir(), "stanley-design-loop-fixtures", manifest.run_id, "assets")
const approvedFixtureAssetPath = join(fixtureAssetDir, "approved-cashflow-pipeline.png")
mkdirSync(fixtureAssetDir, { recursive: true })
writeFileSync(approvedFixtureAssetPath, "fixture generated asset evidence\n")

const cases: Array<{ name: string; section: SectionEvidence; expectPass: boolean; expectStatus?: string; expectPattern?: string; expectLanguage?: string }> = [
  {
    name: "hero_bottlenecks_fails",
    section: {
      section_name: "Hero",
      text: "Stanley Systems removes workflow bottlenecks with automation so owners can optimize operations.",
      visual_summary: "plain hero",
    },
    expectPass: false,
    expectLanguage: "bottlenecks",
  },
  {
    name: "hero_filler_ui_fails",
    section: {
      section_name: "Hero",
      text: "Turn finished work into collected cash faster.",
      visual_summary: "brand pill above headline, bottom support box, extra filler badge",
    },
    expectPass: false,
    expectPattern: "unnecessary_pill",
  },
  {
    name: "cashflow_icon_cards_fail",
    section: {
      section_name: "Cash Flow Collection System",
      text: "Turn finished work into collected cash faster.",
      visual_summary: "four generic icon cards arranged as an icon grid",
      generated_asset_status: "approved",
    },
    expectPass: false,
    expectPattern: "generic_icon_list",
  },
  {
    name: "cashflow_code_only_without_controller_approval_fails",
    section: {
      section_name: "Cash Flow Collection System",
      asset_strategy_hint: "code_only",
      text: "Finished work moves through invoice follow-up to collected cash.",
      visual_summary: "plain text layout requests code only instead of the required left-to-right pipeline",
    },
    expectPass: false,
    expectStatus: "blocked_missing_required_asset",
    expectPattern: "simple_icon_when_asset_required",
  },
  {
    name: "customer_revenue_orbiting_pills_fail",
    section: {
      section_name: "Repeat Revenue System",
      text: "Get more money from the customers you already earned.",
      visual_summary: "orbiting pill checklist assembly around the section",
      generated_asset_status: "approved",
    },
    expectPass: false,
    expectPattern: "orbiting_pill_checklist",
  },
  {
    name: "customer_revenue_code_only_without_controller_approval_fails",
    section: {
      section_name: "Repeat Revenue System",
      asset_strategy_hint: "code_only",
      text: "Get more money from the customers you already earned.",
      visual_summary: "plain text layout requests code only instead of the required circular wheel flywheel",
    },
    expectPass: false,
    expectStatus: "blocked_missing_required_asset",
    expectPattern: "simple_icon_when_asset_required",
  },
  {
    name: "approved_generated_asset_without_path_fails",
    section: {
      section_name: "Cash Flow Collection System",
      text: "Finished work moves through invoice follow-up to collected cash.",
      visual_summary: "left-to-right pipeline from finished work through invoice follow-up to collected cash",
      generated_asset_status: "approved",
    },
    expectPass: false,
    expectStatus: "blocked_missing_required_asset",
    expectPattern: "simple_icon_when_asset_required",
  },
  {
    name: "approved_generated_asset_with_real_fixture_path_passes",
    section: {
      section_name: "Cash Flow Collection System",
      text: "Finished work moves through invoice follow-up to collected cash.",
      visual_summary: "approved generated left-to-right pipeline from finished work through invoice follow-up to collected cash",
      generated_asset_status: "approved",
      generated_asset_path: approvedFixtureAssetPath,
    },
    expectPass: true,
  },
  {
    name: "justified_code_only_passes",
    section: {
      section_name: "Office Process Assessment",
      asset_strategy_hint: "code_only",
      code_only_justification: "Simple CTA section with no process visual need.",
      text: "Office Process Assessment. Find where finished work is not turning into collected cash.",
      visual_summary: "plain typography and CTA",
    },
    expectPass: true,
  },
  {
    name: "missing_required_asset_blocks",
    section: {
      section_name: "Cash Flow Collection System",
      text: "Finished work moves through invoice follow-up to collected cash.",
      visual_summary: "left-to-right pipeline required but no generated asset exists",
      generated_asset_status: "missing",
      generated_asset_route_available: false,
    },
    expectPass: false,
    expectStatus: "blocked_missing_required_asset",
  },
]

const caseResults = cases.map((item) => {
  const report = evaluateSection(item.section, manifest)
  assert(report.passes_gate === item.expectPass, `${item.name} expected pass=${item.expectPass}`)
  if (item.expectPattern) {
    assert(report.slop_findings.some((finding) => finding.pattern === item.expectPattern), `${item.name} expected ${item.expectPattern}`)
  }
  if (item.expectLanguage) {
    assert(
      report.language_findings.some((finding) => finding.term_or_issue === item.expectLanguage),
      `${item.name} expected language finding ${item.expectLanguage}`,
    )
  }
  if (item.expectStatus) {
    assert(report.asset_strategy === item.expectStatus, `${item.name} expected strategy ${item.expectStatus}`)
  }
  return { name: item.name, report }
})

const fullReport = runVisualAssetGate(
  manifest,
  cases.map((item) => item.section),
)
writeGateReports(manifest, fullReport)

assert(fullReport.status === "fail", "combined smoke report should fail because blocker fixtures are present")
assert(fullReport.next_status === "blocked_missing_required_asset", "missing required generated asset must block instead of silently approving")
assert(
  caseResults.some((item) => item.name === "justified_code_only_passes" && item.report.passes_gate),
  "justified code_only fixture must pass",
)

const smokePath = join(manifest.run_dir, "verification", "anti-ai-slop-smoke-report.json")
writeJson(smokePath, {
  status: "pass",
  run_id: manifest.run_id,
  smoke_report_path: fullReport.report_paths.run_json,
  cases: caseResults,
})

console.log(JSON.stringify({ status: "pass", run_id: manifest.run_id, smoke_report_path: fullReport.report_paths.run_json }, null, 2))

function assert(value: unknown, message: string) {
  if (!value) throw new Error(message)
}
