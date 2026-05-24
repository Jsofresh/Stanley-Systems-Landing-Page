import type { Metadata } from "next"
import { ProblemPageTemplate } from "@/components/problem-page-template"

export const metadata: Metadata = {
  title: "Field Service Automation | Stanley Systems",
  description: "Field service automation that connects office handoffs, job details, estimate follow-up, billing, and customer follow-up for service businesses.",
}

export default function FieldServiceAutomationPage() {
  return <ProblemPageTemplate
    eyebrow="Field service automation"
    title="Most field service tools create more places the office has to check."
    intro="Stanley Systems connects the handoffs so the office knows what is ready, missing, and next."
    symptoms={["Field notes are in one place, photos somewhere else, and questions in texts.", "Estimate follow-up depends on memory after the quote is sent.", "Billing waits because the office has to clarify what happened."]}
    costTitle="Automation only helps when it removes the handoff drag."
    costBody="Adding another tool does not fix cash flow if the office still has to hunt for what is ready, missing, and overdue."
    before={["Customer calls or requests work.", "Job details spread across tools and texts.", "Office reconciles the story.", "Billing and follow-up happen late."]}
    after={["Critical handoffs are visible in one operating path.", "Missing details are flagged earlier.", "Follow-up and billing have owners.", "The owner sees the few exceptions that matter."]}
    fixTitle="Automate the handoffs that actually cost money."
    fixes={["Map the current path from call to cash and repeat work.", "Separate useful tools from the gaps between them.", "Build small automations around the highest-cost stops.", "Keep the process plain enough for the team to use on busy days."]}
    related={[{title:"Who Stanley Systems helps", href:"/who-stanley-systems-helps"},{title:"Cashflow Control", href:"/systems/cashflow-control"},{title:"Repeat Revenue", href:"/systems/repeat-revenue"}]}
  />
}
