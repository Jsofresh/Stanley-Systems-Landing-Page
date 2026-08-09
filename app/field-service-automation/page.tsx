import type { Metadata } from "next"
import { ProblemPageTemplate } from "@/components/problem-page-template"

export const metadata: Metadata = {
  title: "Field Service Automation | Stanley Systems",
  description: "Field service automation that connects office handoffs, job details, estimate follow-up, billing, and customer follow-up for service businesses.",
}

export default function FieldServiceAutomationPage() {
  return <ProblemPageTemplate
    eyebrow="Field service automation"
    title="Field Service Automation That Moves Jobs, Cash, and Follow-Up Forward"
    intro="Get jobs billed faster, follow-up handled cleaner, and fewer details lost between the field and office. Stanley Systems connects the handoffs so your team knows what is ready, missing, and next."
    symptoms={["Field notes are in one place, photos somewhere else, and questions in texts.", "Estimate follow-up depends on memory after the quote is sent.", "Billing waits because the office has to clarify what happened."]}
    costTitle="Automation only helps when it removes the handoff drag."
    costBody="Adding another tool does not fix office workflow if the office still has to hunt for what is ready, missing, and overdue."
    before={["Customer calls or requests work.", "Job details spread across tools and texts.", "Office reconciles the story.", "Billing and follow-up happen late."]}
    after={["Critical handoffs are visible in one operating path.", "Missing details are flagged earlier.", "Follow-up and billing have owners.", "The owner sees the few exceptions that matter."]}
    fixTitle="Automate the handoffs that actually cost money."
    fixes={["Map the current path from call to cash and repeat work.", "Separate useful tools from the gaps between them.", "Build small automations around the highest-cost stops.", "Keep the process plain enough for the team to use on busy days."]}
    related={[{title:"Who Stanley Systems helps", href:"/who-stanley-systems-helps"},{title:"AI Office Installation Sprint", href:"/systems-installation-sprint"},{title:"AI Office Ops", href:"/pricing#ai-office-ops"}]}
  />
}
