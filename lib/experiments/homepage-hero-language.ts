export const HERO_EXPERIMENT_KEY = "homepage-hero-language-v1"
export const HERO_VARIANT_STORAGE_KEY = "stanley_homepage_hero_language_v1"

export type HeroLanguageVariant = "prompt" | "message"

export const HERO_VARIANTS: Record<HeroLanguageVariant, { headline: string; cta: string }> = {
  prompt: {
    headline: "More jobs processed. Cleaner records. Faster follow-up. Same office team.",
    cta: "Calculate Your Admin Drag",
  },
  message: {
    headline: "More jobs processed. Cleaner records. Faster follow-up. Same office team.",
    cta: "Calculate Your Admin Drag",
  },
}

export function readHeroVariant(search = ""): HeroLanguageVariant {
  const forced = new URLSearchParams(search).get("hero")
  if (forced === "prompt" || forced === "message") return forced
  try {
    const stored = window.localStorage.getItem(HERO_VARIANT_STORAGE_KEY)
    if (stored === "prompt" || stored === "message") return stored
  } catch {}
  return Math.random() < 0.5 ? "prompt" : "message"
}
