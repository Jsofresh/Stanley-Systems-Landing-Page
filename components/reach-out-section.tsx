import { CalendarCheck, CircleHelp, PhoneCall } from "lucide-react"

const steps = [
  {
    title: "Show where the office is getting stuck",
    description: "Point to the billing, follow-up, or admin problem that keeps dragging the business down.",
    icon: CircleHelp,
  },
  {
    title: "Get a clear answer on what is worth fixing first",
    description: "Stanley Systems looks at the bottleneck, calls out what matters, and keeps the first move practical.",
    icon: CalendarCheck,
  },
  {
    title: "If it is a fit, move into setup",
    description: "The fix gets put into the tools your team already uses. If it is not a fit, Stanley Systems says that upfront.",
    icon: PhoneCall,
  },
] as const

export function ReachOutSection() {
  return (
    <section className="relative z-10 px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#e8e1d3] bg-[#fbfaf7] px-6 py-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="max-w-[50rem] sm:max-w-[56rem] lg:max-w-[64rem]">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">What happens after you reach out</div>
          <h2 className="mt-3 max-w-[58rem] text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[3rem] lg:leading-[1.06] xl:max-w-none">
            A quick call, a clear answer, and no forced fit.
          </h2>
          <p className="mt-4 max-w-[56rem] text-lg leading-8 text-slate-700 sm:text-xl xl:max-w-none">
            The first step is not a giant project. It is a simple conversation to see what is slowing the business down and what is actually worth fixing first.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="rounded-[1.5rem] border border-[#e8e1d3] bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[#15803D]">Step {index + 1}</div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#dce8d5] bg-[#f4f9f0] text-[#15803D]">
                    <Icon className="h-5 w-5" strokeWidth={2.1} />
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold leading-7 text-slate-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-[15px]">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
