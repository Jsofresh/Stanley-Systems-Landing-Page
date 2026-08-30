import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), "utf8")
const failures = []
const requireText = (file, text) => { if (!read(file).includes(text)) failures.push(`${file}: missing ${JSON.stringify(text)}`) }
const forbidText = (file, text) => { if (read(file).includes(text)) failures.push(`${file}: forbidden ${JSON.stringify(text)}`) }

const mounted = [
  "components/home/cash-flow-homepage.tsx",
  "components/home/ai-office-hero.tsx",
  "components/home/one-message-demo-section.tsx",
  "components/home/value-image-strip.tsx",
  "components/hero-section.tsx",
  "components/footer.tsx",
  "components/mobile-sticky-cta.tsx",
  "app/ai-office-command-map/page.tsx",
  "app/systems-installation-sprint/page.tsx",
  "components/pricing/PricingPage.tsx",
  "app/ai-office-capacity-calculator/page.tsx",
  "components/ai-office-capacity-calculator/capacity-calculator.tsx",
  "app/checkout/success/page.tsx",
  "app/checkout/cancel/page.tsx",
  "components/checkout/BuyerOnboardingForm.tsx",
]

for (const file of mounted) {
  for (const phrase of ["AI Profit Map", "Admin Drag Calculator", "$60,000/month", "520+", "95%", "Get the Free Blueprint", "no new software", "any office action", "/videos/ai-office-map-demo-preview.mp4", "/videos/installation-sprint/office-installation-sprint-demo.mp4"]) forbidText(file, phrase)

  const source = read(file)
  const sectionEyebrow = /<p[^>]*className="[^"]*(?:uppercase[^" ]*|uppercase)[^"]*"[^>]*>[^<]*<\/p>\s*<h[12]\b/
  if (sectionEyebrow.test(source)) failures.push(`${file}: decorative section eyebrow or kicker found before h1/h2`)
}

requireText("lib/experiments/homepage-hero-language.ts", "More jobs processed. Cleaner records. Faster follow-up. Same office team.")
requireText("lib/offers/founding-partner.ts", "totalSlots: 2")
requireText("lib/offers/founding-partner.ts", "setupPrice: 3500")
requireText("lib/offers/founding-partner.ts", "monthlyPrice: 500")
requireText("lib/offers/founding-partner.ts", "locked for life")
requireText("lib/offers/founding-partner.ts", "managedOperationDays: 30")
requireText("lib/pricing/source-of-truth.ts", "ai_office_command_map")
requireText("lib/pricing/source-of-truth.ts", "price: 197")
requireText("next.config.mjs", 'source: "/ai-profit-map"')
requireText("next.config.mjs", 'destination: "/ai-office-command-map"')
requireText("next.config.mjs", 'destination: "/ai-office-capacity-calculator"')
requireText("components/home/cash-flow-homepage.tsx", "/images/uploaded/homepage/ai-office/office-desk-invoice-checklist-highvis.jpg")
requireText("components/home/cash-flow-homepage.tsx", "/images/uploaded/homepage/ai-office/service-owner-office-admin-shot.jpg")
requireText("components/video-demo-placeholder.tsx", "Production slot reserved")

if (failures.length) {
  console.error(failures.join("\n"))
  process.exit(1)
}
console.log(`AI Office release smoke passed: ${mounted.length} mounted surfaces and canonical route/offer truth checked.`)
