import type { Metadata } from "next"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "Terms | Stanley Systems",
  description: "Simple terms for Stanley Systems site and internal Content System use.",
  alternates: {
    canonical: "https://stanley-systems.com/terms",
  },
}

const sections = [
  {
    title: "Use of the site and Content System",
    body:
      "Stanley Systems provides this website and related internal tools, including the Stanley Systems Content System, for business operations, content planning, publishing support, and service communication. By using the site or an app-connected workflow, you agree to use it only for lawful business purposes.",
  },
  {
    title: "Accounts and connected services",
    body:
      "If you connect a third-party account or approve an OAuth connection, you confirm that you have permission to connect that account. You are responsible for keeping your accounts secure and for removing access if you no longer want the connection active.",
  },
  {
    title: "Content and data",
    body:
      "You remain responsible for the content, files, account data, posts, messages, and business information you provide or authorize the system to access. Stanley Systems uses connected data only to operate the requested workflow, support the service, troubleshoot issues, and maintain business records.",
  },
  {
    title: "No guarantees",
    body:
      "Stanley Systems works to keep its site and internal systems useful and reliable, but services may change, fail, pause, or depend on third-party platforms outside Stanley Systems' control. Stanley Systems does not guarantee platform availability, publishing results, account approval, social performance, or business outcomes.",
  },
  {
    title: "Acceptable use",
    body:
      "Do not use Stanley Systems tools or workflows for spam, fraud, harassment, unlawful scraping, misleading content, unauthorized account access, infringement, malware, or any activity that violates third-party platform terms or applicable law.",
  },
  {
    title: "Contact",
    body:
      "Questions about these terms or the Stanley Systems Content System can be sent to jaden@stanley-systems.com.",
  },
]

export default function TermsPage() {
  return (
    <MarketingPageShell>
      <section className="px-4 pb-20 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.06)] backdrop-blur sm:p-12">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Stanley Systems terms
            </h1>
            <p className="mt-6 text-xl leading-9 text-slate-600 sm:text-[1.28rem]">
              Simple terms for Stanley Systems site use and internal Content System OAuth setup.
            </p>

            <div className="mt-10 space-y-8">
              {sections.map((section) => (
                <div key={section.title} className="border-t border-[#efe7db] pt-8 first:border-t-0 first:pt-0">
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{section.title}</h2>
                  <p className="mt-3 text-base leading-8 text-slate-600">{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MarketingPageShell>
  )
}
