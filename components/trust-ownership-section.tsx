import { BookOpenText, FolderCog, ShieldCheck, Wrench } from "lucide-react"

const trustPoints = [
  {
    text: "Stanley Systems works inside the tools your team already uses, instead of forcing a whole new operating layer onto the business.",
    icon: Wrench,
  },
  {
    text: "If something is not worth building yet, you should hear that directly before spending time or money on it.",
    icon: ShieldCheck,
  },
  {
    text: "You own the workflows, documentation, and operating logic that get built. Nothing is held hostage behind a black box.",
    icon: FolderCog,
  },
  {
    text: "The goal is practical control: fewer owner rescues, cleaner office handoffs, and clearer next steps for the team.",
    icon: BookOpenText,
  },
] as const

export function TrustOwnershipSection() {
  return (
    <section className="relative z-10 px-4 py-12 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-[#ece7dc] bg-[#f8f6f1] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[3rem]">
            You own everything. Full stop.
          </h2>
          <p className="mt-5 text-xl leading-9 text-slate-600 sm:text-[1.28rem]">
            Stanley Systems is not trying to wrap your business in another confusing layer. The setup stays yours, the documentation stays yours, and the team is not left guessing how the handoff works.
          </p>
          <p className="mt-5 text-base leading-7 text-slate-600">
            The practical standard is simple: make the workflow easier to run, easier to inspect, and easier to hand off without creating a dependency that traps the business later.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {trustPoints.map((point) => {
            const Icon = point.icon
            return (
              <div
                key={point.text}
                className="rounded-[1.5rem] border border-[#e8e1d3] bg-white p-6 text-lg leading-8 text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.05)] sm:text-[1.1rem]"
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
