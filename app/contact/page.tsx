import { ContactSection } from "@/components/contact-section"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export default function ContactPage() {
  return (
    <MarketingPageShell>
      <div className="px-4 pb-4 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Apply for the Workflow Audit.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-9 text-slate-600 sm:text-[1.32rem]">
            If finished work is not turning into collected cash fast enough, calls are slipping, or past customers are going quiet, this is the paid diagnostic first step.
          </p>
        </div>
      </div>
      <ContactSection />
    </MarketingPageShell>
  )
}
