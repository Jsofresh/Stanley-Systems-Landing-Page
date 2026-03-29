import SlideIn from "@/components/SlideIn"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative px-4 pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32">
      <div className="relative z-10 mx-auto max-w-7xl animate-fade-in-hero">
        <div className="rounded-[2rem] border border-[#ece7dc] bg-[#f8f6f1]/95 px-6 py-8 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div className="max-w-none text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e8e1d3] bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#15803D]" />
              FOR OWNER-LED SERVICE BUSINESSES
            </div>

            <SlideIn direction="up" duration={800}>
              <h1 className="mt-6 max-w-none text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-[4.2rem] lg:leading-[1.03] xl:text-[4.35rem]">
                Fix the office bottlenecks slowing your service business down.
              </h1>
            </SlideIn>
          </div>

          <div className="mt-8 grid items-start gap-10 lg:mt-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 xl:gap-10">
            <div className="max-w-2xl text-left">
              <SlideIn direction="up" delay={150} duration={800}>
                <div>
                  <p className="max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
                    Stanley Systems helps service businesses get invoices out faster, stay on top of estimates, and clean up the handoffs between the field, office, and billing — without forcing the team into a whole new system.
                  </p>

                  <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                    Built for businesses where too much still runs on calls, texts, memory, spreadsheets, and overloaded office staff.
                  </p>
                </div>
              </SlideIn>

              <SlideIn direction="up" delay={300} duration={800}>
                <div className="mt-8 hidden items-start gap-4 sm:flex-row sm:items-center md:flex">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-[#15803D] px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#166534] hover:shadow-lg"
                >
                  <a href="/contact">
                    Book a meeting
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-[#d8d1c4] bg-white px-8 py-4 text-base font-semibold text-slate-900 transition-all duration-200 hover:border-[#cfc7b9] hover:bg-[#f4efe6]"
                >
                  <a href="tel:+16179586372" className="inline-flex items-center justify-center text-center">
                    <Phone className="mr-2 h-5 w-5" />
                    Talk to the front desk
                  </a>
                </Button>
                </div>
              </SlideIn>

              <p className="mt-5 max-w-xl text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base">
                We will tell you what looks worth fixing first, and if it is not a fit, we will say that upfront.
              </p>

            </div>

            <div className="grid gap-4 lg:-ml-6 lg:mt-0 lg:gap-5 xl:-ml-8 xl:mt-0">
              <div className="rounded-[1.6rem] border border-[#e8e1d3] bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.08)]">
                <div className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">What improves first</div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      title: "Faster invoicing",
                      desc: "Jobs close → invoices go out the same day",
                    },
                    {
                      title: "Fewer dropped leads",
                      desc: "No more leads lost in a text thread",
                    },
                    {
                      title: "Less office admin",
                      desc: "Stop re-typing the same info into 3 systems",
                    },
                    {
                      title: "Less owner bottleneck",
                      desc: "Jobs keep moving even when you're in the field",
                    },
                  ].map(({ title, desc }) => (
                    <div key={title} className="flex min-h-[84px] items-start gap-4 rounded-[1.1rem] border border-[#ece6d9] bg-[#fbfaf7] px-4 py-4 text-slate-800">
                      <span className="mt-2 h-3 w-3 shrink-0 rounded-full bg-[#15803D]" />
                      <div className="min-w-0">
                        <div className="text-base font-semibold leading-6">{title}</div>
                        <div className="mt-1 text-sm font-medium leading-5 text-slate-600">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
