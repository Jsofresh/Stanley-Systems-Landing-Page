import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function FinalCTASection() {
  return (
    <section className="relative px-4 py-12 sm:py-16 lg:py-20 sm:px-6 lg:px-8 mb-24">
      <div className="max-w-5xl mx-auto rounded-[2.25rem] border border-[#dbe7cf] bg-[linear-gradient(180deg,#f7fbf2_0%,#ffffff_100%)] p-8 sm:p-10 lg:p-14 shadow-[0_24px_70px_rgba(15,23,42,0.09)] text-center">
        <h3 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 text-balance leading-tight">
          Ready to see where you’re losing 10+ hours a week?
        </h3>
        <p className="mt-5 text-lg sm:text-xl lg:text-[1.35rem] text-slate-700 max-w-3xl mx-auto leading-8 lg:leading-9">
          Book a free workflow audit and we’ll show you where the business is losing time and money across billing, follow-up, and admin work.
        </p>
        <div className="mt-8 sm:mt-10 flex items-center justify-center">
          <a
            href="https://calendly.com/jadenodorczuk24/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 rounded-full bg-[#15803D] px-9 py-5 text-lg sm:text-xl font-semibold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-[#166534] lg:px-10 lg:py-6 lg:text-2xl"
          >
            Book a Free Workflow Audit
            <ArrowRight className="w-6 h-6 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
