export type AiOfficeBlueprintIntake = {
  name: string
  email: string
  businessName: string
  businessType: string
  teamSize: string
  fieldServiceSoftware: string
  accountingSoftware: string
  spreadsheetUsage: string
  informationStuck: string
  copyCheckRewrite: string
  billingDelays: string
  missedFollowUp: string
  toolsInvolved: string
  desiredOutputType: string
  aiComfortLevel: string
  messyOfficeExample: string
}

export type AiOfficeBlueprintPlay = {
  title: string
  useWhen: string
  staffInput: string
  aiOutput: string
  staffRule: string
  expectedImpact: string
  prompt: string
}

export type AiOfficeBlueprint = {
  schemaVersion: "2026-06-12"
  blueprintId: string
  generatedDate: string
  businessName: string
  industry: string
  primaryBottleneck: string
  highestDragArea: string
  bestFirstAiUseCase: string
  quickCapacityWin: string
  toolsMentioned: string[]
  plays: AiOfficeBlueprintPlay[]
  quickWinChecklist: string[]
  recommendedWorkflow: string
  recommendedWorkflowReason: string
  whatMapWouldReveal: string
  bookingUrl: string
}
