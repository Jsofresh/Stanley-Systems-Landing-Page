import Image from "next/image"

import { flywheelSteps, repeatRevenueAssets } from "./tokens"

export function RevenueFlywheel() {
  return (
    <section data-section="flywheel" className="bg-white px-4 py-18 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div className="order-2 lg:order-1">
          <div className="rounded-[1.35rem] border border-[#D5DEE8] bg-[#F8F4EA] p-3 shadow-[0_22px_60px_rgba(33,51,67,0.10)]">
            <Image
              src={repeatRevenueAssets.flywheel}
              alt="Illustration of a repeat revenue flywheel connecting completed jobs, customer follow-up, referrals, reactivation, and recovered demand."
              width={1536}
              height={1024}
              className="h-auto w-full rounded-[0.95rem]"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#FF5C35]">Repeat revenue flywheel</p>
          <h2 className="mt-5 font-serif text-[2.55rem] font-semibold leading-[1.03] tracking-[-0.04em] text-[#213343] sm:text-5xl">
            Every good job should create the next opportunity.
          </h2>
          <div className="mt-8 space-y-5">
            {flywheelSteps.map(([number, title, text]) => (
              <div key={title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-[#D5DEE8] pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF5C35] text-sm font-bold text-white">{number}</div>
                <div>
                  <h3 className="text-xl font-bold tracking-[-0.025em] text-[#213343]">{title}</h3>
                  <p className="mt-2 text-base leading-7 text-[#516F90]">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
