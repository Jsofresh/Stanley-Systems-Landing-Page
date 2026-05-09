import { PhoneCall, RefreshCw, Star, ThumbsUp, Users, Wrench } from "lucide-react"

import { flywheelSteps } from "./tokens"

const icons = [Wrench, ThumbsUp, Star, Users, RefreshCw, PhoneCall]

export function RevenueFlywheel() {
  return (
    <section id="flywheel" data-section="flywheel" className="scroll-mt-[120px] bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="rounded-[1.25rem] border border-[#C8D8CE] bg-[#F8F4EA] p-5 shadow-[0_18px_46px_rgba(33,51,67,0.09)]">
          <div className="grid gap-3 sm:grid-cols-2">
            {flywheelSteps.map(([number, title, text], index) => {
              const Icon = icons[index]
              return (
                <article key={title} className="rounded-2xl border border-[#D5DEE8] bg-white p-4 transition hover:border-[#1F7A3A] hover:bg-[#F8FCF9]">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F6EC] text-[#1F7A3A]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-bold text-[#1F7A3A]">{number}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold tracking-[-0.025em] text-[#213343]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#516F90]">{text}</p>
                </article>
              )
            })}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#1F7A3A]">Repeat revenue flywheel</p>
          <h2 className="mt-4 font-serif text-[2.45rem] font-semibold leading-[1.03] tracking-[-0.04em] text-[#213343] sm:text-5xl">
            Every good job should create the next opportunity.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#33475B]">
            One job creates trust. Trust creates reviews. Reviews create referrals. Referrals and repeat customers create the next job.
          </p>
        </div>
      </div>
    </section>
  )
}
