import Image from "next/image"
import { page } from "./tokens"

export function ProblemObjection() {
  return (
    <section data-section="problem-objection" data-nav-theme="light" className="px-4 py-8 sm:px-6 lg:px-8 lg:py-9">
      <div className={page.wrap}>
        <div className="grid gap-7 lg:grid-cols-[0.58fr_1.42fr] lg:items-center">
          <div>
            <h2 className={page.h2}>The software is not always broken. The handoff around it is.</h2>
          </div>
          <div className="mx-auto w-full max-w-[825px] lg:ml-auto">
            <Image
              src="/images/uploaded/money-leak-map/money-leak-map-workflow-stanley-systems-automates.jpg"
              alt="AI Profit Map showing the workflow Stanley Systems automates."
              width={1280}
              height={720}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
