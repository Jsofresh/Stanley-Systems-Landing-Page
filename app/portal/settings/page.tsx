import Link from "next/link"
import { ArrowLeft, Bell, Building2, CreditCard, Gauge, PlugZap, ShieldCheck, UserRound, UsersRound } from "lucide-react"
import { requirePortalSession } from "@/lib/portal/session"

export const dynamic = "force-dynamic"

const settings = (companyName: string) => [
  {
    icon: Building2,
    title: "Company",
    value: companyName,
    description: "Fixed test company for the brain-test Company Brain runtime.",
  },
  {
    icon: UserRound,
    title: "Account",
    value: "Signed-in persona account",
    description: "The portal session carries actor, role, company, and session context into brain-test.",
  },
  {
    icon: UsersRound,
    title: "Users and roles",
    value: "Owner, dispatcher, accounting, field tech, outsider",
    description: "Runtime tool/action rails enforce role permissions before source or model access.",
  },
  {
    icon: Gauge,
    title: "Usage",
    value: "Runtime usage ledger",
    description: "Proof, telemetry, and conversation state are tracked on the Company Brain runtime.",
  },
  {
    icon: PlugZap,
    title: "Connected brain status",
    value: "brain-test runtime",
    description: "The live portal talks to brain-test through the same-origin Company Brain proxy.",
  },
  {
    icon: CreditCard,
    title: "Billing",
    value: "Billing readiness checks",
    description: "Billing answers use current connected-provider reads and verified readback; stale source snapshots never establish provider truth.",
  },
  {
    icon: ShieldCheck,
    title: "Safety",
    value: "Exact in-chat approval",
    description: "Hermes binds consequential work to the signed-in user, conversation, exact action, and a later approval turn. The browser cannot author or confirm provider actions directly.",
  },
  {
    icon: Bell,
    title: "Notifications",
    value: "Conversation status only",
    description: "Placeholder only. No emails, SMS, or app alerts are sent.",
  },
]

export default function PortalSettingsPage() {
  const session = requirePortalSession()
  return (
    <main className="min-h-screen bg-[#f7f2ea] px-4 py-6 text-[#102033] sm:px-6">
      <div className="mx-auto w-full max-w-4xl">
        <Link
          href="/portal"
          prefetch={false}
          className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-bold text-[#435266] transition hover:bg-white hover:text-[#15803d]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to chat
        </Link>

        <header className="mt-8">
          <p className="text-sm font-bold uppercase text-[#15803d]">Settings</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Portal basics</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#667085]">
            Live Company Brain test portal state. This page is safe-status only; source records, connector payloads, secrets, and action ledgers stay on the brain-test runtime boundary.
          </p>
        </header>

        <section className="mt-8 grid gap-3 sm:grid-cols-2">
          {settings(session.companyName).map((item) => {
            const Icon = item.icon
            return (
              <article key={item.title} className="rounded-lg border border-[#ded6c8] bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#eef9f2] text-[#15803d]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold uppercase text-[#667085]">{item.title}</p>
                    <h2 className="mt-1 break-words text-lg font-bold text-[#102033]">{item.value}</h2>
                    <p className="mt-2 text-sm leading-6 text-[#667085]">{item.description}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </section>
      </div>
    </main>
  )
}
