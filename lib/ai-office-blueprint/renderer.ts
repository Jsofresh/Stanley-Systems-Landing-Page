import fs from "node:fs"
import path from "node:path"
import type { AiOfficeBlueprint, AiOfficeBlueprintPlay } from "./types"

const templatePath = path.join(process.cwd(), "templates", "ai-office-blueprint", "fable-blueprint-template.html")

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function renderChecklist(items: string[]) {
  return items
    .map((item, index) => {
      return `<div class="check-item">
      <span class="cbox"></span>
      <span class="cidx">${index + 1}.</span>
      <span>${escapeHtml(item)}</span>
    </div>`
    })
    .join("\n")
}

function playTokenMap(play: AiOfficeBlueprintPlay | undefined, index: number) {
  const fallback = {
    title: "",
    useWhen: "",
    staffInput: "",
    aiOutput: "",
    staffRule: "",
    expectedImpact: "",
    prompt: "",
  }
  const value = play ?? fallback
  return {
    [`play_${index}_title`]: value.title,
    [`play_${index}_use_when`]: value.useWhen,
    [`play_${index}_staff_input`]: value.staffInput,
    [`play_${index}_ai_output`]: value.aiOutput,
    [`play_${index}_staff_rule`]: value.staffRule,
    [`play_${index}_expected_impact`]: value.expectedImpact,
    [`play_${index}_prompt`]: value.prompt,
  }
}

export function renderAiOfficeBlueprintHtml(blueprint: AiOfficeBlueprint) {
  let html = fs.readFileSync(templatePath, "utf8")
  const secondPlay = blueprint.plays[1]
  const thirdPlay = blueprint.plays[2]

  const tokens: Record<string, unknown> = {
    blueprint_id: blueprint.blueprintId,
    generated_date: blueprint.generatedDate,
    business_name: blueprint.businessName,
    industry: blueprint.industry,
    primary_bottleneck: blueprint.primaryBottleneck,
    highest_drag_area: blueprint.highestDragArea,
    best_first_ai_use_case: blueprint.bestFirstAiUseCase,
    quick_capacity_win: blueprint.quickCapacityWin,
    tools_mentioned: blueprint.toolsMentioned.join(", "),
    quick_win_checklist: renderChecklist(blueprint.quickWinChecklist),
    recommended_workflow: blueprint.recommendedWorkflow,
    recommended_workflow_reason: blueprint.recommendedWorkflowReason,
    what_map_would_reveal: blueprint.whatMapWouldReveal,
    booking_url: blueprint.bookingUrl,
    ...playTokenMap(blueprint.plays[0], 1),
    ...playTokenMap(secondPlay, 2),
    ...playTokenMap(thirdPlay, 3),
  }

  if (!secondPlay) {
    html = html.replace(/\n\s*<!-- PLAY 2 -->[\s\S]*?<\/article>\n(?=\s*<!-- PLAY 3 -->)/, "\n")
  }

  if (!thirdPlay) {
    html = html.replace(/\n\s*<!-- PLAY 3 -->[\s\S]*?<\/article>\n(?=<\/section>)/, "\n")
  }

  for (const [token, value] of Object.entries(tokens)) {
    const rendered = token === "quick_win_checklist" ? String(value) : escapeHtml(value)
    html = html.replaceAll(`{{${token}}}`, rendered)
  }

  return html
}
