import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

import { howItWorksSteps } from "./tokens"

export function RevenueFlywheel() {
  return (
    <section id="flywheel" data-section="flywheel" className="scroll-mt-[120px] bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="rounded-[1.25rem] border border-[#C8D8CE] bg-[#F8F4EA] p-3 shadow-[0_18px_46px_rgba(33,51,67,0.09)] sm:p-4">
          <Image
            src="/images/repeat-revenue/repeat-revenue-flywheel.png"
            alt="Repeat Revenue Flywheel showing job complete, private rating, review ask, referral ask, past customer reactivation, missed call captured, and next job booked."
            width={1536}
            height={1024}
            className="aspect-video w-full rounded-[1rem] object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-bold text-[#1F7A3A]">Repeat Revenue flywheel</p>
          <h2 className="mt-4 text-[2.35rem] font-semibold leading-[1.03] tracking-[-0.045em] text-[#213343] sm:text-5xl">
            Every good job should create the next opportunity.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#33475B]">
            Repeat Revenue System turns completed jobs into follow-up moments your office can actually use. It does not wait for someone to remember. The system helps decide who should hear from you, what they should be asked, and what your office should do when they reply.
          </p>
          <div className="mt-6 grid gap-3">
            {howItWorksSteps.map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-[#D5DEE8] bg-[#F8FCF9] p-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1F7A3A]" aria-hidden="true" />
                  <div>
                    <h3 className="text-base font-bold tracking-[-0.02em] text-[#213343]">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#516F90]">{text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 rounded-2xl border border-[#B7D8C0] bg-[#E8F6EC] px-4 py-3 text-base font-bold leading-7 text-[#124E25]">
            One job creates trust. Trust creates reviews. Reviews create referrals. Referrals and repeat customers create the next job.
          </p>
        </div>
      </div>
    </section>
  )
}
