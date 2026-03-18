import Image from "next/image"
import { Button } from "@/components/ui/button"

const ArrowRight = () => (
  <svg
    className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

export function HeroSection() {
  return (
    <section className="px-4 pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 relative">
      <div className="max-w-7xl mx-auto relative z-10 animate-fade-in-hero">
        <div className="rounded-[2rem] border border-[#ece7dc] bg-[#f8f6f1]/95 shadow-[0_20px_70px_rgba(15,23,42,0.08)] px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div className="max-w-xl text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#e8e1d3] bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#15803D]"></span>
                TRUSTWORTHY AUTOMATION FOR SERVICE BUSINESSES
              </div>

              <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                You built a great trade business. You didn’t sign up to be a billing department.
              </h1>

              <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600 sm:text-xl">
                Stanley Systems helps blue-collar service businesses get paid faster, follow up automatically, and stop losing time to manual admin.
              </p>

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#15803D] text-white rounded-full px-8 py-4 text-base font-medium transition-all duration-300 hover:bg-[#166534] hover:scale-[1.02] hover:shadow-lg group cursor-pointer"
                >
                  <a href="https://calendly.com/jadenodorczuk24/30min" target="_blank" rel="noopener noreferrer">
                    Book a Free Workflow Audit
                    <ArrowRight />
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-[#d8d1c4] bg-[#eef3df] px-8 py-4 text-base font-medium text-slate-900 transition-all duration-200 hover:bg-[#e3ecd0] hover:border-[#cfc7b9]"
                >
                  <a href="#pricing" className="inline-flex items-center justify-center text-center">
                    See Pricing
                    <ArrowRight />
                  </a>
                </Button>
              </div>

              <div className="mt-8 border-t border-[#e7e0d5] pt-6">
                <div className="flex flex-col gap-2 text-slate-700">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div className="flex items-center gap-1.5 text-[#15803D] text-xl sm:text-2xl leading-none">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                    <span className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-900 sm:text-[0.95rem]">
                      “30-day satisfaction guarantee”
                    </span>
                  </div>
                  <span className="text-base font-semibold sm:text-lg">Trusted service. Clear communication. Professional systems.</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:pt-6">
              <div className="relative overflow-hidden rounded-[1.6rem] border border-[#e8e1d3] bg-white shadow-[0_15px_40px_rgba(15,23,42,0.08)] min-h-[360px] lg:translate-y-6">
                <Image
                  src="/professional-man-avatar-3.jpg"
                  alt="Business owner portrait"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
              </div>

              <div className="grid gap-4">
                <div className="rounded-[1.6rem] border border-[#e8e1d3] bg-white p-5 shadow-[0_15px_40px_rgba(15,23,42,0.08)]">
                  <div className="inline-block rounded-2xl bg-[#f8f6f1] px-4 py-3 shadow-sm">
                    <div className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Revenue Closed</div>
                    <div className="mt-3 flex items-end gap-2">
                      <div className="h-8 w-1.5 rounded-full bg-[#dbe7cf]"></div>
                      <div className="h-12 w-1.5 rounded-full bg-[#bfd7a8]"></div>
                      <div className="h-16 w-1.5 rounded-full bg-[#97bf73]"></div>
                      <div className="h-20 w-1.5 rounded-full bg-[#15803D]"></div>
                    </div>
                    <div className="mt-3 text-sm text-slate-600">Faster replies. Fewer dropped leads.</div>
                  </div>
                </div>

                <div className="rounded-[1.6rem] border border-[#e8e1d3] bg-[linear-gradient(180deg,#ffffff_0%,#f3efe6_100%)] p-6 shadow-[0_15px_40px_rgba(15,23,42,0.08)] min-h-[220px] flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">What Stanley fixes</div>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center gap-3 text-slate-700">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#15803D]"></span>
                        Late invoice follow-up
                      </div>
                      <div className="flex items-center gap-3 text-slate-700">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#15803D]"></span>
                        Missed customer messages
                      </div>
                      <div className="flex items-center gap-3 text-slate-700">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#15803D]"></span>
                        Manual double entry
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl bg-white/90 px-4 py-3 text-sm text-slate-600 shadow-sm border border-[#ebe5d9]">
                    Works with the tools you already use.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
