const proofTiles = [
  {
    title: "Business judgment",
    body: "First-place winner in a competitive business school consulting competition.",
  },
  {
    title: "Hands-on coding",
    body: "Earned money for coding work through hackathons and technical builds.",
  },
  {
    title: "Technical training",
    body: "Continuing the coding side through Harvard computer science coursework.",
  },
]

export function FounderSection() {
  return (
    <section className="relative z-10 px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[2.25rem] border border-[#dfe8d4] bg-white px-6 py-8 shadow-[0_20px_70px_rgba(15,23,42,0.07)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-[3rem] lg:leading-[1.06]">
              Founder-led diagnosis. Hands-on build.
            </h2>
            <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              <p>
                I’m Jaden, founder of Stanley Systems. I built Stanley Systems because service businesses do not need another dashboard, software pitch, or bloated agency process. They need the money leak found, fixed, and kept from coming back.
              </p>
              <p>
                That is the point of the Cash Flow Assessment. Find where cash, follow-up, and office time are slipping. Then build the practical system that closes the gap.
              </p>
              <p>
                Stanley Systems carries my middle name and my grandfather’s name, so the work has to be practical, useful, and built to last.
              </p>
              <p className="font-semibold text-slate-950">
                You are not buying theory. You are getting a founder-led build tied to cash, follow-up, and office time.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {proofTiles.map((tile) => (
              <article key={tile.title} className="rounded-[1.5rem] border border-[#e5eadf] bg-[#fbfaf6] p-5 shadow-[0_14px_42px_rgba(15,23,42,0.045)]">
                <h3 className="text-lg font-semibold tracking-tight text-slate-950">{tile.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">{tile.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
