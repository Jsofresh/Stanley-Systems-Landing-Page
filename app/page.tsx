import { HeroSection } from "@/components/hero-section"
import { PainAgitationCarousel } from "@/components/sections/pain-agitation-carousel"
import { StakesSection } from "@/components/sections/stakes-section"
import { WorkflowAuditMechanismSection } from "@/components/sections/workflow-audit-mechanism-section"
import { Phase3HomepageSections } from "@/components/phase3-homepage-sections"
import { PricingSection } from "@/components/pricing-section"
import { FAQSection } from "@/components/faq-section"
import { FounderSection } from "@/components/founder-section"
import { FinalCTASection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"

function OfficeWorkflowProblemSection() {
  return (
    <section data-section="office-workflow-problem" className="bg-[#071422] px-5 py-20 text-white md:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-[88rem] gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div>
          <p className="text-[13px] font-extrabold uppercase tracking-[0.22em] text-[#53d986]">Office workflows leak money quietly</p>
          <h2 className="mt-5 max-w-[720px] text-balance text-4xl font-extrabold leading-[0.96] tracking-[-0.055em] text-white md:text-6xl">
            The problem is not effort. It is the space between the tools.
          </h2>
        </div>
        <div className="space-y-5 text-lg font-semibold leading-8 text-[#d3dce7]">
          <p>
            Service businesses already have people working hard. Stanley Systems finds the handoffs where money stalls and turns them into clear workflows your team can run.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Finished jobs", "Invoices do not wait for someone to rebuild the story."],
              ["Open estimates", "Follow-up stops depending on memory."],
              ["Past customers", "Repeat work becomes a visible revenue path."],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                <p className="text-base font-extrabold text-white">{title}</p>
                <p className="mt-2 text-sm font-medium leading-6 text-white/68">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f7f7f4] overflow-hidden">
      <main className="min-h-screen bg-white">
        <HeroSection />
        <PainAgitationCarousel />
        <OfficeWorkflowProblemSection />
        <StakesSection />
        <WorkflowAuditMechanismSection />
        <Phase3HomepageSections />
        <PricingSection />
        <FAQSection />
        <FounderSection />
        <FinalCTASection />
        <Footer />
      </main>
    </div>
  )
}
