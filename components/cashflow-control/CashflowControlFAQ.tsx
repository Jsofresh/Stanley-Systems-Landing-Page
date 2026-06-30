const faqs = [
  ["Does this replace my accounting or field software?", "No. Stanley Systems works around the tools your team already uses. It connects the workflow between customer intake, field work, office review, accounting, invoice creation, final bill, payment follow-up, and owner visibility. The goal is to remove the manual handoff drag, not make your team relearn the business."],
  ["Do staff need another screen?", "No. Most AI office workflow installs run through existing software, inbox, texts, and staff handoffs. Extra screens are scoped only when the business actually needs them to see exceptions. Stanley Systems does not add a screen just to make the build look bigger."],
  ["What gets automated?", "Stanley Systems can automate intake routing, job-detail handoffs, billing-readiness checks, missing-info requests, invoice paths, payment follow-up, open-balance visibility, exception alerts, and admin-drag summaries. The exact automation depends on your software permissions and workflow. The AI Profit Map or onboarding step decides what is safe to automate first."],
  ["Does this send invoices automatically?", "It can when the approved workflow, data quality, and software permissions support it. If a human decision is required first, the system routes the missing item to the right technician, office staff, manager, or customer contact instead of silently stalling. Stanley Systems should speed up billing without removing needed review."],
  ["Does this collect money automatically?", "It can automate the path to the final bill and payment follow-up, but it does not guarantee customer payment or replace your payment processor. The system removes the manual office drag that delays billing and cash collection. Customers still choose when and whether they pay."],
  ["What happens after I buy?", "Stanley Systems confirms fit, access, tool constraints, data quality, and first implementation scope before build work starts. If the selected package is not the right fit, Stanley Systems can redirect, pause, propose custom scope, or refund before implementation begins. Buying starts the onboarding path; it does not force a bad build."],
  ["How does the AI Profit Map credit work?", "If you buy the AI Office Installation Sprint after the AI Profit Map, your $97 map fee credits toward the AI Office Installation Sprint. The credit follows the stated terms and checkout path."],
  ["What happens if my setup is not a fit?", "Stanley Systems will tell you. If there is not enough volume, software structure, or office workflow for a system to make sense, you should not be pushed into one. The right answer may be a smaller workflow cleanup, a different package, or no build yet."],
] as const

export function AIOfficeWorkflowFAQ() {
  return (
    <section className="bg-white px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-[2.25rem] font-semibold leading-[1] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">Plain answers before you buy.</h2>
        </div>
        <div className="mt-8 divide-y divide-[#DDEBE2] overflow-hidden rounded-[1.75rem] border border-[#DDEBE2] bg-[#FBFCF7]">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group bg-white p-5 open:bg-[#F4FBF5]">
              <summary className="cursor-pointer list-none text-lg font-extrabold text-[#071D3A] marker:hidden">{question}<span className="float-right text-[#15803D] group-open:rotate-45">+</span></summary>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#536173]">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
