import { ArrowLeftRight, Brain, FileText, MessagesSquare } from "lucide-react"

const painPoints = [
  {
    title: "Invoices go out late",
    description:
      "Completed work sits in limbo because someone still has to find the details, clean them up, and send the bill manually.",
    icon: FileText,
  },
  {
    title: "Leads cool off before anyone replies",
    description:
      "Calls, website forms, and Facebook messages pile up while the team is on jobs, driving, or closing out the day.",
    icon: MessagesSquare,
  },
  {
    title: "The office runs on memory",
    description:
      "Too much depends on one person remembering what was promised, what was scheduled, and what still needs follow-up.",
    icon: Brain,
  },
  {
    title: "You enter the same info twice",
    description:
      "Customer details get copied from form to inbox to CRM to invoicing software, wasting time and creating mistakes.",
    icon: ArrowLeftRight,
  },
] as const

export function PainPointsSection() {
  return (
    <section className="px-4 py-12 sm:py-16 lg:py-20 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[2.25rem] border border-[#ece7dc] bg-[#fbfaf7]/95 shadow-[0_24px_70px_rgba(15,23,42,0.07)] px-7 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[4rem] lg:leading-[1.02]">
              Does this sound familiar?
            </h2>

            <p className="mt-6 max-w-4xl text-xl leading-9 text-slate-700 sm:text-[1.45rem] lg:text-[1.55rem] lg:leading-10">
              Jobs finished but invoices do not go out for days. Estimates get sent, then nobody follows up. Staff re-enter the same job information into multiple systems. The office stays buried in admin work. The business slows down when the owner steps away.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-2">
            {painPoints.map((point) => {
              const Icon = point.icon

              return (
                <div
                  key={point.title}
                  className="rounded-[1.75rem] border border-[#e8e1d3] bg-white p-7 sm:p-8 shadow-[0_16px_36px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#f2d7dc] bg-[linear-gradient(180deg,#fff8f8_0%,#fff1f2_100%)] shadow-sm">
                      <Icon className="h-5 w-5 text-[#b91c1c]" strokeWidth={2} />
                    </span>
                    <h3 className="text-xl font-semibold leading-8 text-slate-900 sm:text-2xl">{point.title}</h3>
                  </div>
                  <p className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">{point.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
