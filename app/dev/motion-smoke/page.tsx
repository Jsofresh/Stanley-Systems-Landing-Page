// Throwaway smoke page for Homepage Rev V3 motion primitives. Delete before homepage rev v3 ships.

import CountUp from "@/components/motion/CountUp"
import DirectionalReveal from "@/components/motion/DirectionalReveal"

export default function MotionSmokePage() {
  return (
    <main className="min-h-[220vh] bg-[#F9F7F4] px-6 py-20 text-[#1B2A4A]">
      <div className="mx-auto flex max-w-3xl flex-col gap-[42vh]">
        <DirectionalReveal direction="up">
          <h1 className="text-4xl font-semibold">Reveal up</h1>
        </DirectionalReveal>

        <DirectionalReveal direction="left">
          <p className="text-3xl font-semibold">Reveal left</p>
        </DirectionalReveal>

        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-wide text-[#0F7B3F]">
            Test count to $3,250
          </p>
          <p className="text-5xl font-semibold">
            <CountUp target={3250} prefix="$" />
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-wide text-[#0F7B3F]">
            Test count to $7,500
          </p>
          <p className="text-5xl font-semibold">
            <CountUp target={7500} prefix="$" />
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-wide text-[#0F7B3F]">
            Test count to 47%
          </p>
          <p className="text-5xl font-semibold">
            <CountUp target={47} suffix="%" />
          </p>
        </div>

        <p className="pb-24 text-base text-[#1B2A4A]/75">
          If reduced motion is enabled, all of the above should appear instantly with no animation.
        </p>
      </div>
    </main>
  )
}
