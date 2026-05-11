import type { Metadata } from "next"

import { ContactRouter } from "@/components/contact-router"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "Contact | Stanley Systems",
  description: "Get the right next step: start the Cash Flow Assessment, ask a pre-buy question, or begin assessment intake after buying.",
}

export default function ContactPage() {
  return (
    <MarketingPageShell>
      <ContactRouter />
    </MarketingPageShell>
  )
}
