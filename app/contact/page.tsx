import { ContactSection } from "@/components/contact-section"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export default function ContactPage() {
  return (
    <MarketingPageShell>
      <div className="px-4 pb-4 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Let’s figure out where the bottleneck is.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-9 text-slate-600 sm:text-[1.32rem]">
            If follow-up is slipping, invoices are lagging, or the office keeps doing the same work twice, this is the page to start the conversation.
          </p>
        </div>
      </div>
      <ContactSection />
    </MarketingPageShell>
  )
}
