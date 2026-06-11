import type { Metadata } from "next"
import Link from "next/link"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "Payment received | Stanley Systems",
  description: "Your payment was received. Complete onboarding and book your call so Stanley Systems can review fit, access, and scope before implementation proceeds.",
  alternates: {
    canonical: "/checkout/success",
  },
}

const nextSteps = [
  {
    title: "Fill out the onboarding form",
    copy: "Tell Stanley Systems about your shop, your tools, and the leak you want fixed first.",
  },
  {
    title: "Book your kickoff or assessment call",
    copy: "Choose a time so Stanley Systems can review the right workflow with you.",
  },
  {
    title: "Stanley Systems reviews your info",
    copy: "Stanley Systems checks your tools, access needs, and fit before setup begins.",
  },
  {
    title: "We begin setup or assessment",
    copy: "If you bought the AI Office Map, Stanley Systems starts the assessment. If you bought a system, Stanley Systems starts onboarding and implementation.",
  },
]

const scopeNote =
  "Buying a system starts onboarding and implementation. Stanley Systems reviews your tools, access, and fit before setup begins. If your business is outside fit, refuses required access, lacks required systems, or needs work outside the package scope, Stanley Systems may refund, redirect, or pause the build before implementation."

export default function CheckoutSuccessPage() {
  return (
    <MarketingPageShell>
      <main className="px-4 pb-20 pt-28 text-[#102033] sm:pt-32 lg:pt-36">
        <section className="mx-auto max-w-5xl rounded-[2rem] border border-[#dfe7ee] bg-white/92 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10 lg:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[#102033] sm:text-5xl lg:text-6xl">
              Payment received. Here is what happens next.
            </h1>
            <p className="mt-5 text-lg leading-8 text-[#536173] sm:text-xl">
              Stanley Systems has received your purchase. Complete onboarding and book your call so Stanley Systems can review your tools, access, fit, and implementation scope before setup begins.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/checkout/onboarding"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#102033] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1b344f] focus:outline-none focus:ring-2 focus:ring-[#102033] focus:ring-offset-2"
                data-analytics-event="onboarding_form_started"
                data-analytics-source="checkout_success"
                data-cta-label="Complete onboarding"
                data-cta-location="checkout_success_primary"
              >
                Fill Out Onboarding Form
              </Link>
              <a
                href="https://calendly.com/stanleysystems/30min"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#c9d6df] bg-white px-6 py-3 text-sm font-semibold text-[#102033] transition hover:border-[#9fb7c8] hover:bg-[#f8fbfc] focus:outline-none focus:ring-2 focus:ring-[#102033] focus:ring-offset-2"
                data-cta-label="Book Your Call"
                data-cta-location="checkout_success_secondary"
              >
                Book Your Call
              </a>
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {nextSteps.map((step, index) => (
              <article key={step.title} className="rounded-2xl border border-[#dfe7ee] bg-[#f8fbfc] p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e6f4ea] text-sm font-semibold text-[#1d6b37]">
                  {index + 1}
                </div>
                <h2 className="mt-4 text-lg font-semibold leading-6 text-[#102033]">{step.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#536173]">{step.copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[#bfe4c8] bg-[#f4fbf5] p-5 text-sm font-medium leading-7 text-[#335244] sm:p-6">
            {scopeNote}
          </div>
        </section>
      </main>
    </MarketingPageShell>
  )
}
