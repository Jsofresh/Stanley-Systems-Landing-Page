import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { sectionShell } from "./tokens"

export function FitSetup() {
  return (
    <section className="bg-[#FBFCF7] py-10 sm:py-12">
      <div className={sectionShell}>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#15803D]">Automation layer</p>
          <h2 className="mt-2 text-[2.15rem] font-semibold leading-[1] tracking-[-0.04em] text-[#071D3A] sm:text-[2.9rem]">Stanley Systems adds the workflow your software still makes people carry.</h2>
        </div>

        <div className="mt-6 overflow-hidden rounded-[2rem] border border-[#DDEBE2] bg-white shadow-[0_24px_70px_rgba(7,29,58,0.08)]">
          <Image
            src="/images/uploaded/money-leak-map/money-leak-map-stanley-workflow-automation.jpg"
            alt="Stanley workflow automation layer connecting intake, job records, billing checks, routing, invoices, and payment follow-up."
            width={1280}
            height={720}
            sizes="(min-width: 1024px) 1180px, 100vw"
            className="h-auto w-full object-contain"
          />
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-[#DDEBE2] bg-white p-4 shadow-[0_12px_30px_rgba(7,29,58,0.04)] sm:flex sm:items-center sm:justify-between sm:gap-5">
          <p className="text-sm font-semibold leading-6 text-[#536173]"><strong className="text-[#071D3A]">Setup note:</strong> Stanley Systems maps the current intake-to-final-bill path first, then builds the safest automation around your existing tools, permissions, and exception rules.</p>
          <Link href="#cashflow-pricing" className="mt-4 inline-flex min-h-11 shrink-0 items-center rounded-full bg-[#15803D] px-5 py-2.5 text-sm font-extrabold text-white hover:bg-[#116832] sm:mt-0">See pricing options <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  )
}
