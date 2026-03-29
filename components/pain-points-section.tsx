import { ArrowLeftRight, Brain, FileText, MessagesSquare } from "lucide-react"

const painPoints = [
  {
    title: "Invoices lag",
    description:
      "Jobs get finished, but billing still sits for days because someone has to track down details, clean things up, and send it manually.",
    icon: FileText,
  },
  {
    title: "Estimates go cold",
    description:
      "Calls, website forms, texts, and Facebook messages stack up while the team is on jobs, driving, or closing out the day.",
    icon: MessagesSquare,
  },
  {
    title: "The owner becomes the backup system",
    description:
      "Too much depends on one person remembering what was promised, what got scheduled, and what still needs attention.",
    icon: Brain,
  },
  {
    title: "The same information gets entered twice",
    description:
      "Customer details keep getting copied from one place to another, which wastes time and creates mistakes.",
    icon: ArrowLeftRight,
  },
] as const

export function PainPointsSection() {
  return (
    <section className="relative z-10 px-4 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2.25rem] border border-[#ece7dc] bg-[#fbfaf7]/95 px-7 py-10 shadow-[0_24px_70px_rgba(15,23,42,0.07)] sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[4rem] lg:leading-[1.02]">
              Does this sound familiar?
            </h2>

            <p className="mt-6 max-w-4xl text-xl leading-9 text-slate-700 sm:text-[1.35rem] lg:text-[1.45rem] lg:leading-10">
              This is what it looks like when the office side of the business is carrying too much of the load.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {painPoints.map((point) => {
              const Icon = point.icon

              return (
                <div key={point.title} className="rounded-[1.75rem] border border-[#e8e1d3] bg-white p-7 shadow-[0_16px_36px_rgba(15,23,42,0.06)] sm:p-8">
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

          <div className="mt-8 flex justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#15803D] px-7 py-3.5 text-base font-semibold text-white shadow-[0_12px_28px_rgba(15,23,42,0.16)] transition-all duration-200 hover:bg-[#166534]"
            >
              Show us where you're getting stuck
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
