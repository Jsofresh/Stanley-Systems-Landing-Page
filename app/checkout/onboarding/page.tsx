import type { Metadata } from "next"
import { Suspense } from "react"
import { MarketingPageShell } from "@/components/marketing-page-shell"
import { BuyerOnboardingForm } from "@/components/checkout/BuyerOnboardingForm"

export const metadata: Metadata = {
  title: "Paid buyer onboarding | Stanley Systems",
  description: "Complete paid buyer onboarding after checkout so Stanley Systems can review what you bought, access readiness, current tools, biggest leak, and preferred call time.",
  alternates: {
    canonical: "/checkout/onboarding",
  },
}

export default function CheckoutOnboardingPage() {
  return (
    <MarketingPageShell>
      <main className="px-4 pb-20 pt-28 text-[#102033] sm:pt-32 lg:pt-36">
        <Suspense fallback={<div className="mx-auto max-w-5xl rounded-[2rem] border border-[#dfe7ee] bg-white p-8 text-[#536173]">Loading onboarding form...</div>}>
          <BuyerOnboardingForm />
        </Suspense>
      </main>
    </MarketingPageShell>
  )
}
