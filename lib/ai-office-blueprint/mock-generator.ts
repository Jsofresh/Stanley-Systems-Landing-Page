import { pricingPackageById } from "@/lib/pricing/source-of-truth"
import type { AiOfficeBlueprint, AiOfficeBlueprintIntake } from "./types"

function textOrFallback(value: string, fallback: string) {
  return value.trim() || fallback
}

function compactList(values: string[]) {
  return values.map((value) => value.trim()).filter(Boolean)
}

export function generateMockBlueprint(intake: AiOfficeBlueprintIntake, blueprintId: string): AiOfficeBlueprint {
  const tools = compactList([
    intake.fieldServiceSoftware,
    intake.accountingSoftware,
    intake.spreadsheetUsage.includes("Sheet") || intake.spreadsheetUsage.includes("Excel") ? intake.spreadsheetUsage : "",
    intake.toolsInvolved,
  ])

  const primaryBottleneck = textOrFallback(intake.billingDelays || intake.informationStuck, "Office work is getting stuck before staff can finish clean handoffs.")
  const messyExample = textOrFallback(intake.messyOfficeExample, "Paste the rough job update, customer message, or office note here.")
  const desiredOutput = textOrFallback(intake.desiredOutputType, "clean office notes and next actions")

  return {
    schemaVersion: "2026-06-12",
    blueprintId,
    generatedDate: new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date()),
    businessName: textOrFallback(intake.businessName, "Your Business"),
    industry: textOrFallback(intake.businessType, "Service business"),
    primaryBottleneck,
    highestDragArea: textOrFallback(intake.informationStuck, "Scattered office information"),
    bestFirstAiUseCase: `Turn messy inputs into ${desiredOutput}.`,
    quickCapacityWin: textOrFallback(intake.copyCheckRewrite, "Standardize what staff copy, check, and rewrite before sending work forward."),
    toolsMentioned: tools.length ? tools : ["Field-service software", "Accounting software", "Email", "Spreadsheets"],
    plays: [
      {
        title: "Messy Office Example to Clean Handoff",
        useWhen: "Staff receive rough notes, customer messages, job updates, or spreadsheet problems that must become clean office work.",
        staffInput: messyExample,
        aiOutput: `${desiredOutput}, missing-info checks, customer-safe wording, and next actions.`,
        staffRule: "Staff reviews facts, prices, customer promises, and account changes before anything is sent or entered.",
        expectedImpact: "Less retyping. Cleaner records. Faster handoffs.",
        prompt:
          `Turn this messy office input into ${desiredOutput}.\n\nReturn:\n1. Clean internal note\n2. Missing information to check\n3. Customer-safe update\n4. Next office action\n5. Manager approval flag\n\nRaw input:\n[PASTE MESSY OFFICE EXAMPLE HERE]`,
      },
      {
        title: "Billing Delay Check",
        useWhen: "A completed job cannot move cleanly into invoice prep or payment follow-up.",
        staffInput: textOrFallback(intake.billingDelays, "Paste job closeout notes, labor, material, approval, and billing context."),
        aiOutput: "Billing-ready summary, missing fields, approval gaps, and a short staff checklist.",
        staffRule: "The AI prepares the packet. Staff confirms billable details and financial records.",
        expectedImpact: "Faster billing prep. Fewer back-and-forth questions.",
        prompt:
          "Build a billing prep packet from this completed-work context.\n\nReturn:\n- Billing summary\n- Labor or materials mentioned\n- Missing billing details\n- Approval gaps\n- Staff next action\n\nContext:\n[PASTE CONTEXT HERE]",
      },
      {
        title: "Follow-Up Recovery Queue",
        useWhen: "Estimates, unpaid invoices, callbacks, or customer updates are slipping into inboxes, lists, or memory.",
        staffInput: textOrFallback(intake.missedFollowUp, "Paste the stale estimate, invoice, callback, or customer update context."),
        aiOutput: "The next follow-up message, internal action owner, urgency, and escalation flag.",
        staffRule: "Staff confirms tone, timing, and account status before sending.",
        expectedImpact: "More recovered work. Fewer dropped balls.",
        prompt:
          "Create the next follow-up action from this office context.\n\nReturn:\n- Customer message draft\n- Internal next action\n- Priority\n- Escalation flag\n\nContext:\n[PASTE CONTEXT HERE]",
      },
    ],
    quickWinChecklist: [
      "Pick one repeated office handoff to test this week.",
      "Save the prompt where staff can copy it without searching.",
      "Run five real examples through the prompt and mark what staff still has to fix.",
      "Turn the fixes into a short review checklist.",
    ],
    recommendedWorkflow: "Office handoff cleanup before billing and follow-up",
    recommendedWorkflowReason:
      "Your intake points to repeated copy, check, rewrite, and missing-info work. That is where AI can help without changing your core systems first.",
    whatMapWouldReveal:
      "The full Map would rank the highest-value bottlenecks, show what your current tools already cover, and define the first 30 days of improvement.",
    bookingUrl: pricingPackageById.workflow_audit.stripePaymentLink.url,
  }
}
