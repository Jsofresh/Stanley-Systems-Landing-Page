import Image from "next/image"
import { sectionShell } from "./tokens"

export function WhatGetsAutomated() {
  return (
    <section className="scroll-mt-28 bg-[#FBFCF7] py-10 sm:py-12">
      <div className={sectionShell}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[2.15rem] font-semibold leading-[1] tracking-[-0.04em] text-[#071D3A] sm:text-[2.9rem]">Customer intake to final bill gets handled automatically.</h2>
        </div>

        <div className="relative mt-5 aspect-[16/7.0] overflow-hidden rounded-[2rem] shadow-[0_18px_48px_rgba(7,29,58,0.08)]">
          <Image
            src="/images/uploaded/cashflow-control/stanley-automates-entire-billing-lifecycle.jpg"
            alt="Stanley Systems automates the entire billing lifecycle from customer intake to cash collected."
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <p className="mx-auto mt-4 max-w-3xl rounded-[1.5rem] border border-[#BFE4C8] bg-[#F4FBF5] p-4 text-center text-lg font-extrabold leading-6 tracking-[-0.02em] text-[#102033] sm:text-xl">
          Your office should not spend paid hours moving the same customer, job, invoice, and payment information by hand.
        </p>
      </div>
    </section>
  )
}
