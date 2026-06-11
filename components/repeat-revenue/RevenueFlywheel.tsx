import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

import { howItWorksSteps } from "./tokens"

export function RevenueFlywheel() {
  return (
    <section id="flywheel" data-section="flywheel" className="scroll-mt-[120px] bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-bold text-[#15803D]">AI Office Ops loop</p>
          <h2 className="mt-3 text-[2.2rem] font-semibold leading-[1.03] tracking-[-0.045em] text-[#102033] sm:text-5xl">
            Every good job should create the next opportunity.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#33475B] sm:text-lg">
            AI Office Ops turns completed jobs into follow-up moments your office can actually use. The system helps decide who should hear from you, what they should be asked, and what happens when they reply.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {howItWorksSteps.map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-[#D5DEE8] bg-[#F8FBF9] p-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" aria-hidden="true" />
                  <div>
                    <h3 className="text-base font-bold tracking-[-0.02em] text-[#102033]">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#516F90]">{text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 rounded-2xl border border-[#B7D8C0] bg-[#E8F6EC] px-4 py-3 text-base font-bold leading-7 text-[#124E25]">
            One job creates trust. Trust creates reviews. Reviews create referrals. Referrals and repeat customers create the next job.
          </p>
        </div>

        <div className="relative min-h-[320px] overflow-hidden rounded-[1.65rem] border border-[#D5E9DC] bg-[#F8FBF9] shadow-[0_24px_70px_rgba(16,32,51,0.10),0_0_48px_rgba(21,128,61,0.12)] sm:min-h-[390px] lg:min-h-[480px]">
          <Image
            src="/images/repeat-revenue/repeat-revenue-flywheel.png"
AI Office Ops loop visual showing job done, review ask, referral ask, old customer, missed call, and booked job connected by a green loop.
            width={1536}
            height={1024}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  )
}
