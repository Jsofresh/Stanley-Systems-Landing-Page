import type { AiOfficeBlueprint, AiOfficeBlueprintIntake } from "./types"

export const sampleBlueprintIntake: AiOfficeBlueprintIntake = {
  name: "Jordan Lee",
  email: "jordan@example.com",
  businessName: "Bayview Mechanical",
  businessType: "HVAC service and install",
  teamSize: "12 field techs, 3 office staff",
  fieldServiceSoftware: "ServiceTitan",
  accountingSoftware: "QuickBooks Online",
  spreadsheetUsage: "Install coordinator tracks permits and rebates in Google Sheets.",
  informationStuck: "Photos, tech notes, and customer approvals sit in texts before billing sees them.",
  copyCheckRewrite: "Office staff rewrite job notes into customer updates, invoice notes, and manager questions.",
  billingDelays: "Invoices wait when labor, materials, or approval notes are missing after the job is marked complete.",
  missedFollowUp: "Open estimates and warranty callbacks get checked when someone remembers.",
  toolsInvolved: "ServiceTitan, QuickBooks Online, Gmail, Google Sheets, SMS",
  desiredOutputType: "Billing-ready job summary and customer-safe update",
  aiComfortLevel: "Some use, needs structure",
  messyOfficeExample:
    "Tech note: done condenser swap, cust approved extra pad, old disconnect bad, need office to call about surge protector, pics in thread, helper had 2.5 hrs.",
}

export const sampleGeneratedBlueprint: AiOfficeBlueprint = {
  schemaVersion: "2026-06-12",
  blueprintId: "AOB-SAMPLE-001",
  generatedDate: "June 12, 2026",
  businessName: sampleBlueprintIntake.businessName,
  industry: sampleBlueprintIntake.businessType,
  primaryBottleneck: "Completed jobs are not billing-ready when the field marks them done.",
  highestDragArea: "Job closeout notes, photos, approvals, labor, and billing context",
  bestFirstAiUseCase: "Turn messy tech updates into billing notes, missing-info checks, and customer-safe summaries.",
  quickCapacityWin: "Create one required closeout note format for completed jobs before billing review.",
  toolsMentioned: ["ServiceTitan", "QuickBooks Online", "Gmail", "Google Sheets", "SMS"],
  plays: [
    {
      title: "Messy Tech Note to Billing Packet",
      useWhen: "A job is marked complete but billing still needs labor, materials, approvals, and open questions clarified.",
      staffInput: "Paste the raw tech note, photo captions, customer approval notes, and known labor or material details.",
      aiOutput: "A billing-ready summary, missing-info list, customer-safe summary, CRM note, and owner escalation question.",
      staffRule: "Staff reviews every billing detail before it is entered or sent. The AI flags gaps; it does not approve charges.",
      expectedImpact: "Faster billing prep and fewer back-and-forth questions after completed work.",
      prompt:
        "You are helping our office turn a messy completed-job update into clean billing prep.\n\nUse this format:\n1. Billing note\n2. Labor and materials mentioned\n3. Missing information to check\n4. Customer-safe update\n5. CRM note\n6. Owner or manager escalation question\n\nRaw update:\n[PASTE TECH NOTE HERE]",
    },
    {
      title: "Estimate Follow-Up Control",
      useWhen: "Open estimates are aging and the office needs the next clean customer message.",
      staffInput: "Paste the estimate age, last customer message, job type, quoted work, and any decision blocker.",
      aiOutput: "A short follow-up message, internal next action, and reason the customer may be stalled.",
      staffRule: "Do not send pricing changes, discounts, or promises without manager approval.",
      expectedImpact: "More recovered work and fewer open estimates disappearing into memory.",
      prompt:
        "Turn this open estimate context into a follow-up action.\n\nReturn:\n- Customer message\n- Internal next action\n- Likely blocker\n- Approval needed, yes or no\n\nEstimate context:\n[PASTE DETAILS HERE]",
    },
    {
      title: "Permit and Rebate Sheet Cleanup",
      useWhen: "The install coordinator is updating a spreadsheet from emails, job notes, and customer messages.",
      staffInput: "Paste the spreadsheet row, latest email, job note, or customer update.",
      aiOutput: "A cleaned row update, missing documents list, and next office task.",
      staffRule: "Staff verifies official permit, rebate, and payment information before updating records.",
      expectedImpact: "Cleaner spreadsheet tracking and fewer stalled installs.",
      prompt:
        "Clean this install admin update for our tracking sheet.\n\nReturn:\n- Updated row values\n- Missing documents\n- Next office task\n- Customer or manager question\n\nRaw context:\n[PASTE CONTEXT HERE]",
    },
  ],
  quickWinChecklist: [
    "Pick one completed-job note format for the office to request from techs.",
    "Add a missing-info checklist before billing starts cleanup.",
    "Save the billing packet prompt where office staff can copy it.",
    "Test the prompt on five recent completed jobs and adjust the fields.",
  ],
  recommendedWorkflow: "Completed job to billing-ready handoff",
  recommendedWorkflowReason:
    "This workflow touches cash speed, office workload, customer communication, and owner interruptions. It is the highest-value first place to make AI useful.",
  whatMapWouldReveal:
    "The full Map would show which fields must be captured, where your current software already helps, what staff should review, and which handoffs can be standardized first.",
  bookingUrl: "/ai-profit-map",
}
