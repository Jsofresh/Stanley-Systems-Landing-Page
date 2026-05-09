const faqs = [
  ["Does this replace my accounting or field software?", "No. Stanley Systems works around the tools your team already uses. The goal is to make the handoff between job completion, billing readiness, invoice follow-up, and owner visibility harder to miss."],
  ["Do I need a dashboard?", "No. Most Cashflow Control builds run through emails, alerts, notifications, and existing software. A dashboard can be scoped only if the business actually needs one."],
  ["What gets automated?", "Stanley Systems can automate completed-job checks, billing-readiness checks, missing-info requests, invoice cutoff nudges, open-balance visibility, exception alerts, and weekly or monthly money-leak summaries."],
  ["Does this send invoices automatically?", "Only when the approved workflow supports it. In many shops, the safer first step is to automate the checks and handoff reminders so the office knows exactly what is ready, missing, or overdue."],
  ["Does this collect money automatically?", "No. It helps the billing and follow-up path stay visible. It does not guarantee customer payment or replace your payment processor."],
  ["What happens after I buy?", "Stanley Systems confirms fit, access, tool constraints, data quality, and first implementation scope before build work starts. If the selected package is not the right fit, Stanley Systems can redirect, pause, propose custom scope, or refund before implementation begins."],
  ["How does the Workflow Audit credit work?", "If you buy Cashflow Control or Repeat Revenue after the audit, your $97 audit fee credits toward the system. If you buy yearly, you get a $194 credit."],
  ["What happens if my setup is not a fit?", "Stanley Systems will tell you. If there is not enough volume, software structure, or office workflow for a system to make sense, you should not be pushed into one."],
] as const

export function CashflowControlFAQ() {
  return (
    <section className="bg-white px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#15803D]">FAQ</p>
          <h2 className="mt-3 text-[2.25rem] font-semibold leading-[1] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">Plain answers before you buy.</h2>
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
