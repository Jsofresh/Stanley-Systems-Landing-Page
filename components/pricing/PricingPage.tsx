import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, ClipboardCheck, MapPinned, MonitorCheck, UsersRound, type LucideIcon } from "lucide-react"

type PricingSearchParams = Record<string, string | string[] | undefined>

const card = "relative flex min-h-[31.5rem] flex-col overflow-hidden rounded-[1.75rem] border border-[#E7EAE6] bg-white px-7 pb-6 pt-7 text-center shadow-[0_18px_48px_rgba(7,29,58,0.055)] lg:min-h-[28.35rem] lg:px-6 lg:pb-5 lg:pt-6"
const greenButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832] hover:shadow-[0_22px_48px_rgba(21,128,61,0.28)]"
const lightButton = "inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5]"
const ladderButton = "inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#0F6F33] bg-white px-5 py-3 text-sm font-extrabold text-[#0F6F33] transition hover:-translate-y-0.5 hover:bg-[#F4FBF5] lg:min-h-11 lg:py-2"

const offerIcons: Record<string, LucideIcon> = {
  "ai-office-blueprint": ClipboardCheck,
  "ai-office-map": MapPinned,
  "installation-sprint": UsersRound,
  "ai-office-ops": MonitorCheck,
}

const opsFeatures: Array<{ title: string; copy: string; Icon: LucideIcon }> = [
  { title: "Continuous AI training for your staff", copy: "Keep your team using the workflows the right way.", Icon: UsersRound },
  { title: "Updated prompts, templates, and playbooks", copy: "Improve the system from real office usage.", Icon: ClipboardCheck },
  { title: "Ongoing AI workflow maintenance", copy: "Fix the work that still gets stuck or retyped.", Icon: MonitorCheck },
  { title: "Support as your office, tools, and team change", copy: "Adjust the AI office as roles and bottlenecks shift.", Icon: MapPinned },
]

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
    href: "/ai-office-map",
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
    cta: "See the AI Office Installation Sprint",
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
    <ul className="grid gap-3 text-left text-sm font-semibold leading-6 text-[#102033] lg:gap-2 lg:text-[13px] lg:leading-5">
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
      <section className="relative isolate overflow-hidden bg-[#FBFCF7] px-4 pb-10 pt-28 text-[#071D3A] sm:px-6 sm:pt-32 lg:min-h-[clamp(545px,42.9vw,660px)] lg:px-8 lg:pb-8 lg:pt-[6.25rem]">
        <Image
          src="/images/uploaded/ai-office-ops/ai-office-ops-laptop-mockup.jpg"
          alt=""
          width={1280}
          height={549}
          priority
          sizes="100vw"
          className="absolute inset-x-0 top-0 -z-30 h-auto w-full max-w-none"
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(251,252,247,0.98)_0%,rgba(251,252,247,0.96)_58%,rgba(251,252,247,0.91)_100%)] sm:bg-[linear-gradient(90deg,rgba(251,252,247,0.99)_0%,rgba(251,252,247,0.95)_29%,rgba(251,252,247,0.55)_48%,rgba(251,252,247,0.10)_68%,rgba(251,252,247,0)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent via-[#FBFCF7]/82 to-[#FBFCF7]" />
        <div className="mx-auto flex min-h-[330px] max-w-7xl items-center lg:min-h-[340px]">
          <div className="max-w-[38rem] pb-2 lg:pb-3">
            <h1 className="text-balance text-[2.65rem] font-semibold leading-[1.03] tracking-[-0.025em] text-[#071D3A] sm:text-[4.05rem] lg:text-[3.85rem] lg:leading-[1.01] lg:tracking-[-0.025em]">
              Start free. Map the work. Install the first AI office workflow. <span className="text-[#15803D]">Keep it running.</span>
            </h1>
            <p className="mt-4 max-w-[36rem] text-base font-semibold leading-7 text-[#536173] sm:text-lg sm:leading-7">Use the free Blueprint for starter plays, the $197 AI Office Map to find the first workflow, the $3,500+ Sprint to install it, and AI Office Ops when you need it maintained monthly.</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row"><Link href="/ai-office-blueprint" className={greenButton}>Get the Free Blueprint <ArrowRight className="ml-2 h-4 w-4" /></Link><Link href="#offers" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#DDEBE2] bg-white/86 px-6 py-3 text-sm font-extrabold text-[#071D3A] shadow-[0_12px_28px_rgba(7,29,58,0.06)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-white">Compare the four steps</Link></div>
          </div>
        </div>
      </section>
      <section id="ops-report" aria-label="What AI Office Ops does" className="scroll-mt-28 bg-[#FBFCF7] px-4 py-10 sm:scroll-mt-32 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="mx-auto max-w-5xl text-balance text-[2.55rem] font-semibold leading-[0.98] tracking-[-0.04em] text-[#071D3A] sm:text-[3.7rem] lg:text-[4.25rem]">
            Office Ops keeps your AI office working after launch
          </h2>
          <p className="mx-auto mt-3 max-w-4xl text-lg font-medium leading-8 text-[#536173] sm:text-xl">
            After the Sprint, Office Ops keeps your workflows improving as your office changes.
          </p>
        </div>
        <div className="mx-auto mt-6 grid max-w-6xl gap-4 md:grid-cols-2 lg:mt-7 lg:gap-5">
          {opsFeatures.map(({ title, copy, Icon }) => (
            <article key={title} className="flex min-h-[8.8rem] items-center gap-5 rounded-[1.2rem] border border-[#DDEBE2] bg-white px-6 py-5 text-left shadow-[0_18px_44px_rgba(7,29,58,0.075)]">
              <div className="grid h-[5.65rem] w-[5.65rem] shrink-0 place-items-center rounded-[1.15rem] bg-[#EFFAF2] text-[#15803D]">
                <Icon className="h-12 w-12 stroke-[1.45]" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-[1.4rem] font-semibold leading-[1.08] tracking-[-0.026em] text-[#071D3A]">{title}</h3>
                <p className="mt-2 text-base font-medium leading-6 text-[#536173]">{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="offers" aria-label="Offer ladder" className="scroll-mt-28 mx-auto max-w-7xl px-4 py-10 sm:scroll-mt-32 sm:px-6 sm:py-12 lg:max-w-[92rem] lg:px-8">
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

                <div className={`${offer.featured ? "mt-7 lg:mt-6" : ""} mx-auto flex h-[6.5rem] w-full max-w-[12.5rem] items-center justify-center text-[#15803D] lg:h-[5.85rem]`}>
                  <div className="relative flex h-24 w-28 items-center justify-center rounded-[1.35rem] bg-[#F4FBF5] ring-1 ring-[#DDEBE2] lg:h-20 lg:w-24">
                    <span className="absolute -right-3 top-7 h-11 w-11 rounded-full bg-[#E8F6EC] lg:top-6 lg:h-9 lg:w-9" />
                    <Icon className="relative h-14 w-14 stroke-[1.55] lg:h-12 lg:w-12" />
                  </div>
                </div>

                <h3 className="mt-3 min-h-[3.05rem] text-2xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#07132B] lg:min-h-[2.65rem] lg:text-[1.35rem]">{offer.title}</h3>
                <p className="mt-3 text-[2rem] font-extrabold leading-none tracking-[-0.045em] text-[#15803D] lg:mt-2 lg:text-[1.75rem]">{offer.price}</p>
                <p className="mx-auto mt-3 min-h-[4.15rem] max-w-[18.95rem] text-center text-sm font-semibold leading-6 text-[#334B60] lg:min-h-[3.35rem] lg:text-[13px] lg:leading-5">{offer.body}</p>

                <div className="mt-4 border-t border-[#E1E5DE] pt-4">
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
