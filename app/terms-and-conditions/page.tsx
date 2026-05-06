import type { Metadata } from "next"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "Terms and Conditions | Stanley Systems",
  description:
    "Read the Stanley Systems terms and conditions for website use, service discussions, and SMS account notification programs.",
  alternates: {
    canonical: "https://stanley-systems.com/terms-and-conditions",
  },
  openGraph: {
    title: "Terms and Conditions | Stanley Systems",
    description:
      "Read the Stanley Systems terms and conditions for website use, service discussions, and SMS account notification programs.",
    url: "https://stanley-systems.com/terms-and-conditions",
    siteName: "Stanley Systems",
    type: "article",
  },
}

const sections = [
  {
    title: "Acceptance of terms",
    body:
      "By accessing or using the Stanley Systems website, you agree to be bound by these Terms and Conditions. If you do not agree with these terms, you should not use this website or rely on its content. These terms apply to general website visitors, prospective clients, and users of any communication workflow connected to Stanley Systems.",
  },
  {
    title: "Website content",
    body:
      "The information on this website is provided for general business and informational purposes. While Stanley Systems aims to keep content accurate and up to date, no guarantee is made that every statement, description, case example, or service reference will remain current, complete, or applicable to every business situation. Content may be changed, updated, or removed at any time without notice.",
  },
  {
    title: "Permitted use",
    body:
      "You agree to use this website only for lawful purposes and in a way that does not interfere with the operation of the site, damage the site, attempt unauthorized access, or impair the experience of other users. You may not use the site to transmit harmful code, scrape protected systems, misrepresent your identity, or engage in conduct that could reasonably harm Stanley Systems or others.",
  },
  {
    title: "No professional or guaranteed outcome",
    body:
      "Website content, examples, calculator estimates, service descriptions, package descriptions, and checkout pages do not create a guarantee of financial performance, revenue recovery, profit, collected cash, customer volume, review volume, search ranking, call volume, team adoption, platform approval, software availability, or operational outcome, except for the express Workflow Audit guarantee described below. Workflow, invoicing, follow-up, review, referral, call-handling, and cashflow improvements depend on the specific systems, data quality, team behavior, platform rules, access permissions, implementation conditions, and follow-through inside each client business.",
  },
  {
    title: "Workflow Audit purchase and guarantee terms",
    body:
      "The Workflow Audit is paid diagnostic work. The Workflow Audit guarantee applies only to qualified businesses that buy the Workflow Audit and provide the access and cooperation needed for Stanley Systems to perform the audit. If Stanley Systems cannot find one clear money leak it can reasonably help fix for a qualified business, Stanley Systems will refund the Workflow Audit fee.",
  },
  {
    title: "Workflow Audit guarantee qualification",
    body:
      "To qualify for the Workflow Audit guarantee, the business must be active and currently operating, have real job, customer, billing, estimate, review, call, or follow-up activity to inspect, use software or records Stanley Systems can reasonably review, identify a reachable decision maker or operations contact, and provide timely access to the systems and information needed for the audit. Stanley Systems may determine that a business does not qualify if there is not enough real workflow activity to inspect, required access is unavailable, the business is outside Stanley Systems' normal service scope, or the requested outcome depends on factors Stanley Systems cannot reasonably evaluate or influence.",
  },
  {
    title: "Workflow Audit guarantee scope",
    body:
      "The money-back portion of the guarantee applies to the Workflow Audit fee only. It does not include a free system build, implementation work, third-party software costs, subscription fees, advertising spend, phone/message costs, payment processing fees, package credits, or other outside charges. If the Workflow Audit fee is refunded because no clear fix is found, no audit credit or package credit is also owed.",
  },
  {
    title: "Audit credit terms",
    body:
      "If a buyer purchases the Workflow Audit first and later buys a package within 24 hours after the audit call, the audit credit may be applied once to the package purchase according to the active checkout terms. Monthly package purchases receive a $97 audit credit. Yearly package purchases receive a $194 audit credit and the installation fee is waived. Audit credit availability depends on the active checkout link, promotion code, or written Stanley Systems confirmation at the time of purchase. Audit credits are not cash-equivalent, do not stack with a Workflow Audit refund, and are not owed if the Workflow Audit fee is refunded.",
  },
  {
    title: "Direct package purchase and onboarding review",
    body:
      "Cashflow Control System, Repeat Revenue System, and Both Systems may be offered through direct checkout when public payment links are available. A direct package purchase starts onboarding and implementation intake; it does not waive Stanley Systems' right to review fit, access, requested scope, third-party tool constraints, data quality, and implementation requirements before work proceeds. The buyer agrees to provide accurate business information, a reachable implementation contact, and reasonable access to the tools, records, and workflows needed to evaluate and implement the selected package.",
  },
  {
    title: "Package scope and implementation limits",
    body:
      "Package purchases cover the selected Stanley Systems package and the setup/onboarding scope described at checkout or in written follow-up. Unless separately agreed in writing, packages do not include unlimited custom software development, unsupported third-party platform workarounds, data cleanup beyond the agreed implementation scope, legal/compliance advice, ad management, guaranteed review/ranking outcomes, guaranteed revenue, guaranteed profit, guaranteed customers, guaranteed collection results, or work requiring access the buyer cannot provide. Stanley Systems may recommend a narrower launch, a different package, a custom proposal, or no implementation if the selected package does not match the buyer's business or systems.",
  },
  {
    title: "Refunds, redirects, and paused starts after package purchase",
    body:
      "After a direct package purchase, Stanley Systems may refund, redirect, or pause the engagement if the buyer is not a fit, selected the wrong package, requests work outside package scope, cannot provide required access, does not provide required onboarding details, or depends on third-party tools or policies that make the requested implementation impractical. If Stanley Systems declines the engagement before implementation begins, the package payment will be refunded according to the payment processor's timing and policies. If the buyer is redirected to another Stanley Systems package or custom scope, any price difference, credit, or refund must be confirmed in writing before redirected work begins.",
  },
  {
    title: "Third-party tools, platform rules, and buyer responsibilities",
    body:
      "Stanley Systems work may depend on third-party software, payment processors, phone providers, messaging tools, review platforms, CRM/job-management systems, email providers, or other platforms the buyer already uses or chooses to use. Those services are controlled by their own providers and terms. The buyer is responsible for maintaining their own accounts, permissions, accurate data, platform compliance, and third-party costs unless a separate written agreement says otherwise. Stanley Systems is not responsible for platform outages, denied approvals, account restrictions, third-party policy changes, missing permissions, or inaccurate data supplied by the buyer.",
  },
  {
    title: "Service discussions, proposals, checkout, and written scope",
    body:
      "Submitting a form, scheduling a call, buying a Workflow Audit, buying a package, or exchanging messages with Stanley Systems does not create obligations beyond the specific purchased item and any written scope confirmed by Stanley Systems. Proposals, onboarding plans, implementation recommendations, package redirects, and checkout descriptions are informational until confirmed through checkout terms or a direct written agreement. Stanley Systems reserves the right to decline inquiries, refund purchases, redirect buyers, pause starts, or propose custom terms at its discretion.",
  },
  {
    title: "Intellectual property",
    body:
      "Unless otherwise stated, the content on this website, including copy, branding, graphics, layout, and original materials, is the property of Stanley Systems or is used with permission. You may not reproduce, republish, distribute, modify, or commercially use site content without prior written permission, except for ordinary personal or internal business review.",
  },
  {
    title: "Third-party links and tools",
    body:
      "This website may reference or link to third-party tools, platforms, or websites. Those external services are not controlled by Stanley Systems, and Stanley Systems is not responsible for their content, policies, availability, or practices. Use of third-party services is subject to their own terms and policies.",
  },
  {
    title: "SMS Terms for Stanley Systems",
    body:
      "By opting in, you agree to receive text messages from Stanley Systems. Messages may include replies to inquiries, appointment confirmations, service updates, billing reminders, and account follow-up related to your relationship with Stanley Systems.",
  },
  {
    title: "Program name and message frequency",
    body:
      "Program name: Stanley Systems. Message frequency varies.",
  },
  {
    title: "Message rates, STOP, and HELP",
    body:
      "Message and data rates may apply. Reply **STOP** to unsubscribe. Reply **HELP** for help.",
  },
  {
    title: "Support contact",
    body:
      "For support, contact Stanley Systems through https://stanley-systems.com/contact.",
  },
  {
    title: "Consent not required for purchase",
    body:
      "Consent to receive text messages is not a condition of purchase.",
  },
  {
    title: "Disclaimer of warranties",
    body:
      "This website and its content are provided on an as-is and as-available basis. Stanley Systems makes no warranties, express or implied, regarding availability, merchantability, fitness for a particular purpose, non-infringement, or uninterrupted operation. To the fullest extent permitted by law, use of the site is at your own risk.",
  },
  {
    title: "Limitation of liability",
    body:
      "To the fullest extent permitted by law, Stanley Systems will not be liable for any indirect, incidental, consequential, special, or punitive damages arising out of or related to use of the website, reliance on site content, inability to use the site, or use of linked third-party services. If liability is found despite this limitation, it will be limited to the smallest amount permitted under applicable law.",
  },
  {
    title: "Indemnification",
    body:
      "You agree to indemnify and hold harmless Stanley Systems from claims, damages, losses, liabilities, and expenses arising out of your misuse of the website, violation of these Terms and Conditions, infringement of another party's rights, or unlawful conduct connected to your use of the site or related communication channels.",
  },
  {
    title: "Changes to these terms",
    body:
      "Stanley Systems may revise these Terms and Conditions at any time. Updated terms become effective when posted to this page. Continued use of the website or continued interaction with Stanley Systems after changes are posted constitutes acceptance of the updated terms.",
  },
  {
    title: "Governing use",
    body:
      "These Terms and Conditions are intended to govern use of the Stanley Systems website and related communication programs in a commercially reasonable manner. If any section is found unenforceable, the remaining sections will continue in effect to the fullest extent possible.",
  },
]

export default function TermsAndConditionsPage() {
  return (
    <MarketingPageShell>
      <section className="px-4 pb-20 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.06)] backdrop-blur sm:p-12">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Stanley Systems terms and conditions
            </h1>
            <p className="mt-6 text-xl leading-9 text-slate-600 sm:text-[1.28rem]">
              These terms cover website use, service discussions, communication practices, and the SMS account notification program used for billing and operational follow-up.
            </p>

            <div className="mt-10 space-y-8">
              {sections.map((section) => (
                <div
                  key={section.title}
                  id={section.title === "Workflow Audit purchase and guarantee terms" ? "audit-guarantee-terms" : undefined}
                  className="scroll-mt-28 border-t border-[#efe7db] pt-8 first:border-t-0 first:pt-0"
                >
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
