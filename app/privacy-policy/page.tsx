import type { Metadata } from "next"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "Privacy Policy | Stanley Systems",
  description:
    "Read how Stanley Systems collects, uses, stores, and protects website, account, and SMS-related information.",
  alternates: {
    canonical: "https://stanley-systems.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Stanley Systems",
    description:
      "Read how Stanley Systems collects, uses, stores, and protects website, account, and SMS-related information.",
    url: "https://stanley-systems.com/privacy-policy",
    siteName: "Stanley Systems",
    type: "article",
  },
}

const sections = [
  {
    title: "Introduction",
    body:
      "This Privacy Policy explains how Stanley Systems collects, uses, stores, and protects information shared through this website, through direct communication, and through account-related messaging channels. It is written to give visitors, leads, and clients a clear understanding of what information may be collected and how that information may be used in the normal course of business.",
  },
  {
    title: "Information Stanley Systems collects",
    body:
      "Stanley Systems may collect your name, email address, phone number, company name, and details you submit through our website forms. We use this information to respond to inquiries, schedule calls, provide service updates, follow up on account or billing matters, and communicate with people who request information from Stanley Systems.",
  },
  {
    title: "Information you voluntarily provide",
    body:
      "If you contact Stanley Systems through a form, email, phone call, text message, scheduling link, or direct conversation, you may provide personal or business information such as your name, email address, phone number, company name, billing details, service history, project notes, and operational information about your business. You are not required to provide more information than is reasonably necessary to begin a conversation or evaluate services.",
  },
  {
    title: "Information collected automatically",
    body:
      "Like most websites, Stanley Systems may collect limited technical and usage information automatically. This may include IP address, browser type, operating system, referring pages, device information, page views, interaction patterns, and basic performance telemetry. This information is used to keep the site working, understand usage patterns, and improve the quality of the website and related services.",
  },
  {
    title: "How information is used",
    body:
      "Information collected through the site or through direct communication may be used to respond to inquiries, schedule calls, provide service proposals, deliver client work, support billing and collections workflows, send account reminders, troubleshoot workflow issues, improve service delivery, and maintain business records. Stanley Systems uses information to operate its business and deliver relevant operational communication, not to build invasive profiles or sell data.",
  },
  {
    title: "SMS and account communication",
    body:
      "If you choose to opt in to SMS updates through the Stanley Systems contact form or another direct request channel, Stanley Systems may use your mobile number to send replies to inquiries, appointment confirmations, service updates, billing reminders, and account follow-up. Message frequency varies. Message and data rates may apply. You may reply STOP to opt out of text messages at any time or HELP for help.",
  },
  {
    title: "Consent for text messaging",
    body:
      "Stanley Systems sends text messages only to people who directly contact Stanley Systems and choose to opt in. Consent to receive text messages is not a condition of purchase.",
  },
  {
    title: "How information may be shared",
    body:
      "Stanley Systems does not sell personal information. Information may be shared only with service providers and vendors required to operate the website, communications stack, invoicing systems, hosting, analytics, or service delivery workflows. That sharing is limited to what is reasonably necessary to run the business and deliver services. Personal information is not shared with third parties for their own marketing purposes. SMS consent and phone numbers collected for SMS purposes will not be shared with third parties or affiliates for marketing purposes.",
  },
  {
    title: "Third-party tools and vendors",
    body:
      "Stanley Systems may rely on third-party providers for website hosting, analytics, calendar scheduling, communications delivery, invoicing, payments, workflow automation, and related business operations. Those providers may process information on behalf of Stanley Systems under their own service terms. While Stanley Systems works with standard commercial providers, it cannot independently control every aspect of third-party platform behavior once data is processed through those systems.",
  },
  {
    title: "Cookies and analytics",
    body:
      "This website may use cookies, analytics tools, and similar technologies to understand traffic, improve performance, and evaluate how visitors interact with pages and calls to action. These tools help identify what content is useful, where visitors drop off, and how site performance can be improved. They are used for site improvement and business operations, not for selling visitor profiles.",
  },
  {
    title: "Data retention",
    body:
      "Stanley Systems keeps information only as long as it is reasonably useful for inquiry handling, client communication, service delivery, billing, legal compliance, recordkeeping, or legitimate business operations. The exact retention period may vary depending on the nature of the relationship, the type of information involved, and whether continuing retention is needed for operational or legal reasons.",
  },
  {
    title: "Data Deletion",
    body:
      "Users can request deletion of app-connected data by contacting jaden@stanley-systems.com. Stanley Systems will review deletion requests and delete app-connected data that is no longer needed for legitimate business, security, billing, legal, or recordkeeping purposes.",
  },
  {
    title: "Data security",
    body:
      "Stanley Systems uses reasonable administrative, technical, and operational measures to protect information from unauthorized access, misuse, or disclosure. No internet transmission or storage system can be guaranteed to be completely secure, but reasonable efforts are made to protect sensitive business and contact data in the normal course of operations.",
  },
  {
    title: "Your choices and requests",
    body:
      "You may request that Stanley Systems update or delete information you previously submitted, subject to any business, legal, billing, or recordkeeping obligations that require continued retention. You may also opt out of non-essential future communication and may stop SMS messages by replying STOP. For questions, corrections, or requests, use the contact page or email the business directly.",
  },
  {
    title: "Children's privacy",
    body:
      "This website and its services are intended for business use and are not directed to children under 13. Stanley Systems does not knowingly collect personal information from children through the site.",
  },
  {
    title: "Policy changes",
    body:
      "This Privacy Policy may be updated from time to time to reflect operational, legal, or service changes. When updates are made, the revised version posted on this page becomes the current policy. Continued use of the website or continued communication with Stanley Systems after an update constitutes acceptance of the revised policy.",
  },
  {
    title: "Contact information",
    body:
      "Questions about this Privacy Policy, data handling, or communication preferences can be directed through the contact page at https://stanley-systems.com/contact or by email to jaden@stanley-systems.com.",
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
              This privacy policy explains, in plain language, how website, account, communication, and SMS-related information may be collected and used.
            </p>

            <div className="mt-10 space-y-8">
              {sections.map((section) => (
                <div key={section.title} className="border-t border-[#efe7db] pt-8 first:border-t-0 first:pt-0">
                  <h2
                    id={section.title === "Data Deletion" ? "data-deletion" : undefined}
                    className="scroll-mt-28 text-2xl font-semibold tracking-tight text-slate-900"
                  >
                    {section.title}
                  </h2>
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
