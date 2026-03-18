import { BookOpenText, FolderCog, ShieldCheck, Wrench } from "lucide-react"

const trustPoints = [
  {
    text: "Stanley Systems works inside the tools you already use.",
    icon: Wrench,
  },
  {
    text: "Your team stays in control of the workflow.",
    icon: ShieldCheck,
  },
  {
    text: "You own 100% of what gets built.",
    icon: FolderCog,
  },
  {
    text: "No confusing setup and no mystery handoff.",
    icon: BookOpenText,
  },
] as const

export function TrustOwnershipSection() {
  return (
    <section className="px-4 py-12 sm:py-16 relative z-10">
      <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-[#ece7dc] bg-[#f8f6f1] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <h2 className="text-3xl sm:text-4xl lg:text-[3.1rem] font-semibold tracking-tight text-slate-900">
            You own everything. Full stop.
          </h2>
          <p className="mt-5 text-xl leading-9 text-slate-600 sm:text-[1.38rem]">
            Stanley Systems is not building a confusing system around your business. The systems stay yours, the documentation stays yours, and your team is not left guessing how anything works.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {trustPoints.map((point) => {
            const Icon = point.icon
            return (
              <div
                key={point.text}
                className="rounded-[1.5rem] border border-[#e8e1d3] bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] text-slate-700 text-lg leading-8 sm:text-[1.22rem]"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-[0.95rem] border border-[#e5dfd2] bg-[#f8f6f1] text-slate-700">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                {point.text}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
