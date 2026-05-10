import Image from "next/image"
import { sectionShell } from "./tokens"

export function WhatGetsAutomated() {
  return (
    <section className="bg-[#FBFCF7] py-14 sm:py-16">
      <div className={sectionShell}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#15803D]">What gets automated</p>
          <h2 className="mt-3 text-[2.4rem] font-semibold leading-[1] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">Customer intake to final bill gets handled automatically.</h2>
          <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">Stanley Systems moves the request, job details, billing requirements, invoice, payment follow-up, and final bill through your workflow. When the automation needs a human decision or missing information, it contacts the correct person and keeps cash moving.</p>
        </div>

        <div className="relative mt-7 aspect-[16/6.6] overflow-hidden rounded-[2rem] shadow-[0_18px_48px_rgba(7,29,58,0.08)]">
          <Image
            src="/images/uploaded/cashflow-control/automated-billing-lifecycle.jpg"
            alt="Stanley Systems automates the entire billing lifecycle from customer intake to cash collected."
            fill
            sizes="100vw"
            className="scale-[1.03] object-cover object-center"
          />
        </div>
        <p className="mx-auto mt-5 max-w-3xl rounded-[1.5rem] border border-[#BFE4C8] bg-[#F4FBF5] p-5 text-center text-xl font-extrabold leading-7 tracking-[-0.02em] text-[#102033]">
          Your office should not spend paid hours moving the same customer, job, invoice, and payment information by hand.
        </p>
      </div>
    </section>
  )
}
