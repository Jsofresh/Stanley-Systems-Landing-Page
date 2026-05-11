import type { Metadata } from "next"
import { BestFitSection } from "@/components/best-fit-section"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "Who Stanley Systems Helps | Service Business Workflows",
  description:
    "See which service businesses Stanley Systems helps most, where cash gets stuck, and when the Cash Flow Assessment is a good fit.",
  alternates: {
    canonical: "https://stanley-systems.com/who-stanley-systems-helps",
  },
  openGraph: {
    title: "Who Stanley Systems Helps | Service Business Workflows",
    description:
      "Stanley Systems helps service businesses find late invoices, stale estimates, messy handoffs, and owner cleanup inside the tools they already use.",
    url: "https://stanley-systems.com/who-stanley-systems-helps",
    siteName: "Stanley Systems",
    type: "article",
  },
}

export default function WhoStanleySystemsHelpsPage() {
  return (
    <MarketingPageShell>
      <BestFitSection className="pb-16 pt-28 sm:pt-32 lg:pt-36" />
    </MarketingPageShell>
  )
}
