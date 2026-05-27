import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"
import { PackageHero } from "@/components/package-hero"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const greenButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]"

export const metadata: Metadata = {
  title: "Cashflow Control | Stanley Systems",
  description: "Cashflow Control helps service businesses move customer intake, job handoffs, billing, payment follow-up, and collected cash faster.",
  alternates: { canonical: "https://stanley-systems.com/systems/cashflow-control" },
}

const automations = [
  ["Job detail checks", "Catch missing notes, photos, approvals, and billing details before they stall the invoice."],
  ["Billing-ready alerts", "Show the office which jobs can be invoiced now and which ones need attention."],
  ["Invoice movement", "Keep completed work moving toward billing instead of sitting in office memory."],
  ["Payment follow-up", "Keep open balances visible until the next follow-up is owned."],
  ["Owner visibility", "Show what is stuck, who owns it, and what needs attention."],
  ["Shop-specific fixes", "Fix the gaps that show up in your office, your software, and your team’s process."],
]

function BuildImage() {
  return (
    <div className="relative mx-auto hidden w-full max-w-[760px] drop-shadow-[0_26px_54px_rgba(7,29,58,0.10)] lg:block">
      <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[radial-gradient(circle_at_50%_50%,rgba(244,251,245,0.92),rgba(244,251,245,0)_68%)] blur-2xl" aria-hidden="true" />
      <Image src="/images/uploaded/2026-05-25-jaden/job-details-bill-readiness-unpaid-invoices-exception-routing.jpg" alt="Cashflow Control workflow showing job details, bill readiness, unpaid invoices, and exception routing." width={1280} height={960} sizes="(min-width: 1024px) 52vw, 100vw" className="relative h-auto w-full rounded-[1.2rem] object-contain" />
    </div>
  )
}

export default function SystemPage() {
  return (
    <>
      <SiteHeader />
      <main data-nav-theme="light" className="min-h-screen overflow-hidden bg-white text-[#071D3A]">
        <PackageHero
          eyebrow="Cashflow Control System"
          title="Automate the Office Path From Customer Request to Paid Job"
          subheading="Cashflow Control moves job details through your office systems automatically, cuts down on re-entering the same information, and alerts the right staff when missing info, billing steps, or payment follow-up need attention."
          imageSrc="/images/uploaded/package-heroes/stanley-systems-cashflow-control-office-automation.jpg"
          imageAlt="Service business office team reviewing a Stanley Systems dashboard for customer requests, job details, billing steps, and payment follow-up."
          imageWidth={1280}
          imageHeight={720}
          objectPosition="center center"
          primaryHref="/workflow-audit"
          primaryLabel="Start the Cash Flow Assessment"
          secondaryHref="/systems-installation-sprint"
          secondaryLabel="See how the Sprint works"
          cards={[
            { label: "Request captured", detail: "New customer work starts in the system." },
            { label: "Job details complete", detail: "Notes, photos, and billing info move forward." },
            { label: "Office handoff ready", detail: "The right staff sees what needs attention." },
            { label: "Billing step queued", detail: "The next money step is not left to memory." },
            { label: "Payment follow-up due", detail: "Open balances stay visible until paid." },
          ]}
        />

        <section data-section="cashflow-systems" className="flex min-h-[100svh] items-center bg-white py-14 sm:py-16">
          <div className={shell}>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Find what is slowing your money down. Pick the pieces that fix it.</h2>
              <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">Every shop leaks cash in a different place. Some jobs stall before billing. Some invoices go out late. Some balances never get followed up. Stanley Systems helps identify the gaps, then builds the pieces that keep the next step moving.</p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {automations.map((item) => <article key={item[0]} className="rounded-[1.35rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5 shadow-[0_12px_30px_rgba(7,29,58,0.04)] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-white"><h3 className="text-xl font-semibold tracking-[-0.025em] text-[#102033]">{item[0]}</h3><p className="mt-3 text-sm leading-6 text-[#536173]">{item[1]}</p></article>)}
            </div>
          </div>
        </section>

        <section data-section="cashflow-sprint-build" className="flex min-h-[100svh] items-center bg-[#F4FBF5] py-14 sm:py-16">
          <div className={`${shell} grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-center`}>
            <div>
              <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">How Cashflow Control gets built</h2>
              <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">Stanley Systems builds the workflow around your real job process: job details get captured, billing readiness becomes visible, unpaid invoices stay in view, and exceptions route to the right person before cash gets stuck.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row"><Link href="/workflow-audit" className={greenButton}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link></div>
            </div>
            <BuildImage />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
