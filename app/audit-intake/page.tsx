import type { Metadata } from "next"
import { CheckCircle2 } from "lucide-react"

import { AuditIntakeForm } from "@/components/audit-intake-form"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "AI Profit Map Intake | Stanley Systems",
  description: "Send the work details Stanley Systems needs after buying the AI Profit Map.",
}

const intakeGroups = [
  {
    title: "Business and tools",
    items: ["Business type", "Field, job, CRM, dispatch, or shop system used", "Accounting, billing, invoice, or payment system used", "Rough monthly volume: jobs, invoices, estimates, and calls"],
  },
  {
    title: "Where money gets stuck",
    items: ["Who handles billing or follow-up?", "Where does money usually get stuck?", "How long after a job is complete does the invoice usually go out?", "Do estimates ever sit without a next step?"],
  },
  {
    title: "Follow-up and access",
    items: ["Do you ask for Google reviews now?", "Do you track referrals now?", "Preferred way to review data: screen share, exports/screenshots, or temporary invited user", "Anything else Stanley Systems should know?"],
  },
]

export default function AuditIntakePage() {
  return (
    <MarketingPageShell>
      <main className="px-4 pb-16 pt-24 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#071D3A] sm:text-6xl">Send the work details before the AI Profit Map session.</h1>
            <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">Use this after buying the AI Profit Map. The intake gives Stanley Systems enough detail to prepare useful fixes, prompts, tool guidance, and the first workflow worth installing.</p>
          </div>

          <section className="mt-7 rounded-[2rem] border border-[#DDEBE2] bg-[#FBFEFA] p-5 shadow-[0_18px_48px_rgba(7,29,58,0.06)] sm:p-6 lg:p-8">
            <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-[#071D3A]">Information to send</h2>
            <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-[#536173]">Send the details below so Stanley Systems can review how work moves through the business.</p>

            <AuditIntakeForm />

            <div className="mt-6 rounded-[1.25rem] border border-[#DDEBE2] bg-white p-4 sm:p-5">
              <h3 className="text-lg font-extrabold tracking-[-0.02em] text-[#071D3A]">Safe access</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#536173]">Do not send passwords. Share context by screen share, exports, screenshots, or a temporary invited user. Access should be limited to what is needed to find the stuck workflow and explain the fix.</p>
            </div>

            <div className="mt-5 grid gap-4">
              {intakeGroups.map((group) => (
                <div key={group.title} className="rounded-[1.25rem] border border-[#DDEBE2] bg-white p-4">
                  <h3 className="text-lg font-extrabold tracking-[-0.02em] text-[#071D3A]">{group.title}</h3>
                  <ul className="mt-3 grid gap-2 text-sm font-semibold leading-6 text-[#536173] sm:grid-cols-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#15803D]" />{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <a href="mailto:jaden@stanley-systems.com?subject=AI%20Office%20Map%20intake&body=Name%3A%0AEmail%3A%0APhone%3A%0A%0ABusiness%20type%3A%0AField%2Fjob%2FCRM%2Fdispatch%2Fshop%20system%3A%0AAccounting%2Fbilling%2Finvoice%2Fpayment%20system%3A%0ARough%20monthly%20volume%3A%0A%0AWho%20handles%20billing%20or%20follow-up%3A%0AWhere%20work%20gets%20stuck%3A%0AInvoice%20timing%20after%20job%20completion%3A%0AEstimate%20follow-up%20issue%3A%0A%0AGoogle%20reviews%20now%3A%0AReferrals%20tracked%20now%3A%0APreferred%20review%20method%3A%0AAnything%20else%3A" className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5]">Email intake instead</a>
          </section>
        </div>
      </main>
    </MarketingPageShell>
  )
}
