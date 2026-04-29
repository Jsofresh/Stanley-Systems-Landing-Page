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
      "Website content, examples, and service descriptions do not create a guarantee of results, financial performance, or operational outcomes except for the express Workflow Audit guarantee described on this website. Workflow, invoicing, and follow-up improvements depend on the specific systems, data quality, team behavior, and implementation conditions inside each client business. Any service relationship, scope, timeline, or commitment is defined only through direct written agreement.",
  },
  {
    title: "Audit Guarantee Terms",
    body:
      "Qualified businesses only. To qualify, the business must be active and currently operating, have at least one designated office or admin staff member, have at least seven other employees, have real job, customer, billing, estimate, review, or call volume, use software systems Stanley Systems can inspect, and be willing to provide access to the systems needed for the audit.",
  },
  {
    title: "Audit guarantee disqualifying conditions",
    body:
      "A business may be disqualified from the Workflow Audit guarantee if it is not active or running, has no designated office or admin staff member, has fewer than seven other employees, refuses required software or workflow access, does not have enough real workflow activity to inspect, or is outside Stanley Systems' normal service scope.",
  },
  {
    title: "Audit guarantee scope",
    body:
      "The money-back portion applies to the Workflow Audit fee. The free Customer Revenue System applies only to qualified businesses and includes the standard setup, implementation, and first month. It does not include unlimited custom development and does not guarantee revenue, profit, customers, reviews, referrals, or call volume.",
  },
  {
    title: "Service discussions and proposals",
    body:
      "Submitting a form, scheduling a call, or exchanging messages with Stanley Systems does not by itself create a client relationship. Proposals, estimates, onboarding plans, and implementation recommendations are informational until confirmed through a direct written agreement. Stanley Systems reserves the right to decline inquiries or proposed engagements at its discretion.",
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
                  id={section.title === "Audit Guarantee Terms" ? "audit-guarantee-terms" : undefined}
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
