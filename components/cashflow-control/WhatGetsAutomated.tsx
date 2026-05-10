import Image from "next/image"
import { sectionShell } from "./tokens"

export function WhatGetsAutomated() {
  return (
    <section className="bg-[#FBFCF7] py-14 sm:py-16">
      <div className={sectionShell}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#15803D]">What gets automated</p>
          <h2 className="mt-3 text-[2.4rem] font-semibold leading-[1] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">The office checks get handled automatically.</h2>
          <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">Stanley Systems watches the path from finished job to collected cash and sends the right notice when something needs attention.</p>
        </div>

        <div className="relative mt-7 aspect-[16/6.6] overflow-hidden rounded-[2rem] shadow-[0_18px_48px_rgba(7,29,58,0.08)]">
          <Image
            src="/images/uploaded/cashflow-control/job-complete-to-money-leak-digest.jpg"
            alt="Cashflow Control automation path from job complete to money leak digest."
            fill
            sizes="100vw"
            className="scale-[1.03] object-cover object-center"
          />
        </div>
        <p className="mx-auto mt-5 max-w-3xl rounded-[1.5rem] border border-[#BFE4C8] bg-[#F4FBF5] p-5 text-center text-xl font-extrabold leading-7 tracking-[-0.02em] text-[#102033]">
          Your office should not spend paid hours rebuilding the same billing checklist every week.
        </p>
      </div>
    </section>
  )
}
