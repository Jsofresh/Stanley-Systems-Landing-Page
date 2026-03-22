import { ArrowRight, Phone } from "lucide-react"

export function FinalCTASection() {
  return (
    <section className="relative mb-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-5xl rounded-[2.25rem] border border-[#dbe7cf] bg-[linear-gradient(180deg,#f7fbf2_0%,#ffffff_100%)] p-8 text-center shadow-[0_24px_70px_rgba(15,23,42,0.09)] sm:p-10 lg:p-14">
        <h3 className="text-balance text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Show us where the office is getting stuck
        </h3>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-700 sm:text-xl lg:text-[1.35rem] lg:leading-9">
          Book a meeting. Stanley Systems will tell you what looks worth fixing first — and if it is not a fit, we will say that upfront.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          No pressure. No software pitch. Just a clear look at what is slowing the business down.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row">
          <a
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-[#15803D] px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-[#166534] sm:text-xl lg:px-10 lg:py-5"
          >
            Book a meeting
            <ArrowRight className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-1" />
          </a>

          <a
            href="tel:+16179586372"
            className="inline-flex items-center gap-3 rounded-full border border-[#d8d1c4] bg-white px-8 py-4 text-lg font-semibold text-slate-900 transition-all duration-200 hover:bg-[#f3eee2] sm:text-xl lg:px-10 lg:py-5"
          >
            <Phone className="h-5 w-5" />
            Call now
          </a>
        </div>
      </div>
    </section>
  )
}
