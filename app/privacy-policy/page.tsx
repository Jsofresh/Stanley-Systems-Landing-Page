import { MarketingPageShell } from "@/components/marketing-page-shell"

const sections = [
  {
    title: "Information you submit",
    body:
      "If you contact Stanley Systems through a form, email, or direct conversation, the preview site may collect the contact details and business context you choose to provide. That may include your name, email address, phone number, company name, and notes about your workflow problems.",
  },
  {
    title: "How that information is used",
    body:
      "Information is used to respond to inquiries, understand operational bottlenecks, and determine whether Stanley Systems is a fit for your business. It is not collected to build invasive profiles or sell your data.",
  },
  {
    title: "Analytics and site performance",
    body:
      "Like most modern websites, Stanley Systems may use basic analytics and hosting telemetry to understand traffic, site performance, and page behavior. That data is used to improve the site and user experience.",
  },
  {
    title: "Data sharing",
    body:
      "Stanley Systems does not sell personal information. Data may be shared only with service providers required to run the website, hosting, analytics, or communications stack, and only to the extent needed to operate the business.",
  },
  {
    title: "Retention and requests",
    body:
      "Contact data is kept only as long as it is useful for legitimate business communication, client onboarding, or recordkeeping. If you want your information updated or deleted, the contact page should be used as the first request channel.",
  },
]

export default function PrivacyPolicyPage() {
  return (
    <MarketingPageShell>
      <section className="px-4 pb-20 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.06)] backdrop-blur sm:p-12">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Stanley Systems privacy policy
            </h1>
            <p className="mt-6 text-xl leading-9 text-slate-600 sm:text-[1.28rem]">
              This preview privacy page gives the website a credible policy route and explains, in plain language, how inquiry and website data are handled.
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
