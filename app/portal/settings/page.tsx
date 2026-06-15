import Link from "next/link"
import { ArrowLeft, Bell, Building2, CreditCard, Gauge, PlugZap, ShieldCheck, UserRound, UsersRound } from "lucide-react"

const settings = [
  {
    icon: Building2,
    title: "Company",
    value: "Bayview Service Co.",
    description: "Mock company profile for portal preview.",
  },
  {
    icon: UserRound,
    title: "Account",
    value: "owner@bayviewservice.example",
    description: "Demo user with owner-level review access.",
  },
  {
    icon: UsersRound,
    title: "Users and roles",
    value: "Owner, admin, staff",
    description: "Placeholder role map only. Permissions will live in the Company Brain runtime later.",
  },
  {
    icon: Gauge,
    title: "Usage",
    value: "Mock usage summary",
    description: "Spend and request totals are placeholders for the first frontend pass.",
  },
  {
    icon: PlugZap,
    title: "Connected brain status",
    value: "Mock brain online",
    description: "No real Company Brain VPS routing or connector sync is connected yet.",
  },
  {
    icon: CreditCard,
    title: "Billing",
    value: "Account placeholder",
    description: "Billing settings are visual only in this mock portal.",
  },
  {
    icon: ShieldCheck,
    title: "Safety",
    value: "Review before send",
    description: "Prepared actions stay inside chat until reviewed.",
  },
  {
    icon: Bell,
    title: "Notifications",
    value: "Prepared action alerts",
    description: "Placeholder only. No emails, SMS, or app alerts are sent.",
  },
]

export default function PortalSettingsPage() {
  return (
    <main className="min-h-screen bg-[#f7f2ea] px-4 py-6 text-[#102033] sm:px-6">
      <div className="mx-auto w-full max-w-4xl">
        <Link
          href="/portal"
          className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-bold text-[#435266] transition hover:bg-white hover:text-[#15803d]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to chat
        </Link>

        <header className="mt-8">
          <p className="text-sm font-bold uppercase text-[#15803d]">Settings</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Portal basics</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#667085]">
            Minimal mock settings for the first Company Brain frontend. Live routing, permissions, and writebacks are not connected.
          </p>
        </header>

        <section className="mt-8 grid gap-3 sm:grid-cols-2">
          {settings.map((item) => {
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
