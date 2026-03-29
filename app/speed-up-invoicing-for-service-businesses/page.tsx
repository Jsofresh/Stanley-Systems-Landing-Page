import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Speed Up Invoicing for Service Businesses | Stanley Systems",
  description:
    "Most service businesses lose 3–7 days on every invoice because of manual entry and delayed handoffs. Stanley Systems builds automations that get invoices out the same day work is done.",
}

export default function SpeedUpInvoicingPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-slate-800">
      <div className="mb-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-violet-600">
          Common Problem
        </p>
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
          Why invoicing drags — and how to fix it for service businesses
        </h1>
        <p className="text-xl leading-relaxed text-slate-600">
          For most service businesses, the gap between finishing a job and getting paid isn&apos;t a cash flow problem — it&apos;s a handoff problem. The work is done. The invoice just hasn&apos;t moved yet.
        </p>
      </div>

      <section className="mb-12 space-y-6 text-lg leading-relaxed">
        <h2 className="text-2xl font-semibold text-slate-900">Where the delay usually comes from</h2>
        <p>
          In most service businesses, invoicing involves at least two or three manual steps after the job closes: someone in the field notes the work done, someone in the office re-enters it, and then someone reviews and sends the invoice. Each handoff adds a day or two of delay — sometimes more if it falls into a queue.
        </p>
        <p>
          The result is a 3–7 day average gap between job completion and invoice delivery. For businesses running 50–200 jobs a month, that gap compounds into real cash flow drag every week.
        </p>
        <p>
          It is not a people problem. It is a process problem. The steps exist because no one set up a direct path from &ldquo;job done&rdquo; to &ldquo;invoice sent.&rdquo;
        </p>
      </section>

      <section className="mb-12 space-y-6 text-lg leading-relaxed">
        <h2 className="text-2xl font-semibold text-slate-900">What actually fixes it</h2>
        <p>
          The fix is not new software. It is a tighter connection between what is already being used — the field app, the job management system, and the accounting or invoicing tool.
        </p>
        <p>
          When a job closes, the invoice data should move automatically: job details pull into a draft invoice, the draft gets reviewed or sent based on your rules, and the customer receives it the same day. No re-entry. No waiting for someone to remember.
        </p>
        <p>
          This kind of automation works inside the tools most service businesses already have. It does not require replacing your system — it just fills the gap between steps that currently require manual intervention.
        </p>
      </section>

      <section className="mb-12 rounded-2xl border border-slate-200 bg-slate-50 px-8 py-8 space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">What this looks like in practice</h2>
        <ul className="space-y-3 text-base text-slate-700">
          <li className="flex gap-3"><span className="mt-1 text-violet-500">✓</span> Job closes in the field app → invoice draft created automatically</li>
          <li className="flex gap-3"><span className="mt-1 text-violet-500">✓</span> Office reviews in one click, or auto-sends based on job type</li>
          <li className="flex gap-3"><span className="mt-1 text-violet-500">✓</span> Customer receives the invoice the same day work is done</li>
          <li className="flex gap-3"><span className="mt-1 text-violet-500">✓</span> No duplicate data entry between field and office</li>
          <li className="flex gap-3"><span className="mt-1 text-violet-500">✓</span> Your team stays in control — you set the rules, you own the workflow</li>
        </ul>
      </section>

      <section className="mb-16 space-y-4 text-lg leading-relaxed">
        <h2 className="text-2xl font-semibold text-slate-900">Who this is for</h2>
        <p>
          This works best for owner-led or manager-led service businesses — HVAC, plumbing, electrical, marine service, landscaping, and similar trades — where the billing bottleneck is a handoff gap, not a complex billing dispute.
        </p>
        <p>
          If your team is doing 20 or more jobs a month and invoices are going out later than they should, the delay is fixable without a major technology change.
        </p>
      </section>

      <div className="rounded-2xl bg-slate-900 px-8 py-10 text-center">
        <h2 className="mb-3 text-2xl font-bold text-white">Find out where your billing is losing time</h2>
        <p className="mb-6 text-slate-400">
          The first call is used to figure out where the actual bottleneck is. No commitment, no pitch deck.
        </p>
        <Link
          href="/contact"
          className="inline-block rounded-full bg-white px-8 py-3.5 text-base font-semibold text-slate-900 transition-all duration-200 hover:bg-slate-100"
        >
          Book a free workflow audit
        </Link>
      </div>
    </main>
  )
}
