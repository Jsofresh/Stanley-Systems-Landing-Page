import type { Metadata } from "next"

import { ContactRouter } from "@/components/contact-router"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "Contact | Stanley Systems",
  description: "Get the right next step: start the Workflow Audit, ask a pre-buy question, or begin audit intake after buying.",
}

export default function ContactPage() {
  return (
    <MarketingPageShell>
      <ContactRouter />
    </MarketingPageShell>
  )
}
