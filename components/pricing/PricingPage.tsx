import Link from "next/link"
import { ArrowRight, Check, CircleDollarSign, ClipboardCheck, MapPinned, MessageSquareReply, MonitorCheck, RefreshCw, UsersRound, Wrench, type LucideIcon } from "lucide-react"

type PricingSearchParams = Record<string, string | string[] | undefined>

const card = "relative flex min-h-[31.5rem] flex-col overflow-hidden rounded-[1.75rem] border border-[#E7EAE6] bg-white px-7 pb-6 pt-7 text-center shadow-[0_18px_48px_rgba(7,29,58,0.055)]"
const greenButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832] hover:shadow-[0_22px_48px_rgba(21,128,61,0.28)]"
const lightButton = "inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5]"
const ladderButton = "inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#0F6F33] bg-white px-5 py-3 text-sm font-extrabold text-[#0F6F33] transition hover:-translate-y-0.5 hover:bg-[#F4FBF5]"

const offerIcons: Record<string, LucideIcon> = {
  "ai-office-blueprint": ClipboardCheck,
  "ai-office-map": MapPinned,
  "installation-sprint": UsersRound,
  "ai-office-ops": MonitorCheck,
}

const offers = [
  {
    step: "Free",
    id: "ai-office-blueprint",
    title: "Free AI Office Blueprint",
    price: "Free",
    body: "Fill out a short office workflow form and get practical AI staff plays, copy/paste prompts, one quick capacity win, and the best next workflow to improve.",
    bullets: ["2-3 AI staff plays", "Copy/paste prompts", "One quick capacity win", "Best next workflow"],
    href: "/ai-office-blueprint",
    cta: "Get the Free Blueprint",
  },
  {
    step: "Diagnostic",
    id: "ai-office-map",
    title: "AI Office Map",
    price: "$197",
    body: "A focused session that turns office drag into practical fixes, staff AI prompts, workflow tips, tool guidance, and the first workflow worth installing.",
    bullets: ["45-60 minute owner or office-manager session", "Fix list, prompts, and staff AI plays", "Tool + workflow recommendations", "$197 credited toward your AI Office Installation Sprint"],
    href: "/workflow-audit",
    cta: "Book the AI Office Map",
    featured: true,
  },
  {
    step: "Install",
    id: "installation-sprint",
    title: "AI Office Installation Sprint",
    price: "$3,500 starting",
    body: "Turn your AI Office Map into staff training, your company playbook, and practical office workflows around the tools your staff already uses.",
    bullets: ["Workflows from your AI Office Map", "Your company playbook", "Staff AI training session", "Proof report + 30 days light support"],
    href: "/systems-installation-sprint",
    cta: "See the Installation Sprint",
  },
  {
    step: "Operate",
    id: "ai-office-ops",
    title: "AI Office Ops",
    price: "$500/mo starting",
    body: "Keep installed workflows working, improve prompts and SOPs, support staff, and add small improvements over time.",
    bullets: ["Workflow monitoring", "Broken automation fixes", "Staff support", "Monthly proof report"],
    href: "/contact?path=ai-office-ops",
    cta: "Ask about AI Office Ops",
  },
]

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 text-left text-sm font-semibold leading-6 text-[#102033]">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#15803D] text-[#15803D]">
            <Check className="h-3.5 w-3.5 stroke-[3]" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function PricingPage({ searchParams: _searchParams }: { searchParams: PricingSearchParams }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f7f4] text-[#102033]">
      <section className="relative isolate overflow-hidden bg-[#071D3A] px-4 pb-16 pt-28 text-white sm:px-6 sm:pt-32 lg:px-8 lg:pb-20 lg:pt-[8.25rem]">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_82%_18%,rgba(34,197,94,0.22),transparent_34%),radial-gradient(circle_at_16%_82%,rgba(21,128,61,0.22),transparent_32%),linear-gradient(135deg,#06172e_0%,#071D3A_54%,#0a2a34_100%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-3xl">
            <h1 className="text-balance text-[2.55rem] font-semibold leading-[0.99] tracking-[-0.035em] text-white sm:text-[4.25rem] lg:text-[5rem]">AI Office Ops keeps the installed workflow from going stale.</h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/78">After Stanley Systems installs the first workflow, Ops keeps the office system checked, adjusted, and useful: broken handoffs get fixed, prompts get sharpened, staff questions get answered, and the monthly proof stays visible.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/contact?path=ai-office-ops" className={greenButton}>Ask about AI Office Ops <ArrowRight className="ml-2 h-4 w-4" /></Link><Link href="/workflow-audit" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-extrabold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/16">Start with the Map</Link></div>
            <div className="mt-7 grid gap-3 text-sm font-bold leading-6 text-white/76 sm:grid-cols-3">
              <span className="rounded-2xl border border-white/15 bg-white/8 px-4 py-3">For installed workflows</span>
              <span className="rounded-2xl border border-white/15 bg-white/8 px-4 py-3">$500/mo starting</span>
              <span className="rounded-2xl border border-white/15 bg-white/8 px-4 py-3">Monthly proof report</span>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/14 bg-white/[0.07] p-4 shadow-[0_34px_100px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-5 lg:p-6">
            <div className="rounded-[1.5rem] border border-white/12 bg-[#06172E]/80 p-5">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#86efac]">Monthly operating loop</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-white">Checked, fixed, improved.</h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#15803D] text-white shadow-[0_16px_34px_rgba(21,128,61,0.32)]"><RefreshCw className="h-6 w-6" /></div>
              </div>
              <div className="mt-5 grid gap-3">
                {[
                  [MessageSquareReply, "Follow-up path", "Missed calls, stale quotes, review requests, and repeat-work lists keep getting next steps."],
                  [Wrench, "Workflow upkeep", "Prompts, SOPs, routing rules, and automations get adjusted when the real office changes."],
                  [CircleDollarSign, "Proof report", "Each month shows what moved: jobs followed up, issues found, fixes made, and next improvements."],
                ].map(([Icon, title, copy]) => {
                  const I = Icon as typeof MessageSquareReply
                  return (
                    <div key={title as string} className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#15803D]"><I className="h-5 w-5" /></div>
                      <div>
                        <h3 className="text-base font-extrabold text-white">{title as string}</h3>
                        <p className="mt-1 text-sm font-semibold leading-6 text-white/66">{copy as string}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section aria-label="What AI Office Ops does" className="bg-[#FBFCF7] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-[2rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_24px_70px_rgba(7,29,58,0.07)] sm:p-7 lg:grid-cols-[0.92fr_1.08fr] lg:p-8">
          <div className="rounded-[1.5rem] bg-[#F4FBF5] p-6 lg:p-8">
            <h2 className="text-[2.15rem] font-semibold leading-[1.02] tracking-[-0.035em] text-[#071D3A] sm:text-[3.15rem]">Ops is for the work after the first build.</h2>
            <p className="mt-5 text-base font-semibold leading-7 text-[#536173]">The Sprint installs the first useful workflow. Ops keeps it alive when staff changes, calls pile up, new bottlenecks appear, and the owner needs the system to keep improving without starting another project from scratch.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["01", "Watch the live handoffs", "Find the places where work is still waiting, getting retyped, or falling between people."],
              ["02", "Tune the office playbook", "Improve prompts, templates, staff steps, and approval rules from real usage."],
              ["03", "Add the next small win", "Layer in missed-call, estimate, review, referral, or repeat-customer improvements as the business is ready."],
            ].map(([number, title, copy]) => (
              <article key={title} className="rounded-[1.5rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5">
                <p className="text-sm font-extrabold text-[#15803D]">{number}</p>
                <h3 className="mt-5 text-xl font-extrabold tracking-[-0.025em] text-[#071D3A]">{title}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#536173]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section aria-label="Offer ladder" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <h2 className="mx-auto max-w-5xl text-center text-balance text-[2.45rem] font-semibold leading-[1.05] tracking-[-0.052em] text-[#07132B] sm:text-5xl lg:text-[3.55rem]">
          From ideas to installed AI workflows. We meet you at every step.
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {offers.map((offer) => {
            const Icon = offerIcons[offer.id]

            return (
              <article id={offer.id} key={offer.title} className={`${card} ${offer.featured ? "border-2 border-[#15803D] pt-8 shadow-[0_26px_80px_rgba(21,128,61,0.14)]" : ""}`}>
                {offer.featured ? (
                  <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-b-md bg-[#15803D] px-7 py-2 text-center text-xs font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_10px_24px_rgba(21,128,61,0.18)]">
                    Best Entry Point
                  </div>
                ) : null}

                <div className={`${offer.featured ? "mt-7" : ""} mx-auto flex h-[7.25rem] w-full max-w-[12.5rem] items-center justify-center text-[#15803D]`}>
                  <div className="relative flex h-24 w-28 items-center justify-center rounded-[1.35rem] bg-[#F4FBF5] ring-1 ring-[#DDEBE2]">
                    <span className="absolute -right-3 top-7 h-11 w-11 rounded-full bg-[#E8F6EC]" />
                    <Icon className="relative h-14 w-14 stroke-[1.55]" />
                  </div>
                </div>

                <h3 className="mt-4 min-h-[3.4rem] text-2xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#07132B]">{offer.title}</h3>
                <p className="mt-3 text-[2rem] font-extrabold leading-none tracking-[-0.045em] text-[#15803D]">{offer.price}</p>
                <p className="mx-auto mt-4 min-h-[4.6rem] max-w-[16.5rem] text-center text-sm font-semibold leading-6 text-[#334B60]">{offer.body}</p>

                <div className="mt-5 border-t border-[#E1E5DE] pt-5">
                  <BulletList items={offer.bullets} />
                </div>

                <Link href={offer.href} className={`mt-auto ${offer.featured ? greenButton : ladderButton}`}>{offer.cta}</Link>
              </article>
            )
          })}
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 pb-14 text-center sm:px-6 lg:px-8">
        <div className="rounded-[1.4rem] border border-[#DDEBE2] bg-white px-5 py-5 shadow-[0_12px_30px_rgba(7,29,58,0.04)]">
          <p className="text-base font-bold text-[#334B60]">Start with the Map, then move into the Sprint only if the next workflow is clear.</p>
        </div>
      </section>
    </main>
  )
}
