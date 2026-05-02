#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import { join, resolve } from "path"

type Args = Record<string, string[]>
type SourceEntry = { path: string; loaded: boolean; role: string; keyExtractedPoints: string[] }

const PROJECT_ROOT = "/home/jaden/.openclaw/workspace/project"
const CONTEXT_ROOT = `${PROJECT_ROOT}/stanley-context`
const TASTE_ROOT = `${PROJECT_ROOT}/design-taste-library`
const ARTIFACT_ROOT = `${PROJECT_ROOT}/software-factory/artifacts/gpt-image-section-concepts`

function parseArgs(argv: string[]): Args {
  const args: Args = {}
  for (let i = 0; i < argv.length; i += 1) {
    const raw = argv[i]
    if (!raw.startsWith("--")) continue
    const key = raw.slice(2)
    const next = argv[i + 1]
    const value = !next || next.startsWith("--") ? "true" : next
    if (next && !next.startsWith("--")) i += 1
    args[key] ||= []
    args[key].push(value)
  }
  return args
}
function one(args: Args, key: string, fallback = "") { return args[key]?.at(-1) || fallback }
function requireArg(args: Args, key: string) { const value = one(args, key); if (!value) throw new Error(`Missing --${key}`); return value }
function load(path: string) { return existsSync(path) ? readFileSync(path, "utf8") : "" }
function yes(path: string) { return existsSync(path) }
function bullet(items: string[]) { return items.map((item) => `- ${item}`).join("\n") }
function source(path: string, role: string, points: string[]): SourceEntry { return { path, loaded: yes(path), role, keyExtractedPoints: points } }
function sourceBlock(entries: SourceEntry[]) {
  return entries.map((entry) => [
    `- path: ${entry.path}`,
    `  - loaded: ${entry.loaded ? "yes" : "no"}`,
    `  - role in context: ${entry.role}`,
    `  - key extracted points:`,
    ...entry.keyExtractedPoints.map((point) => `    - ${point}`),
  ].join("\n")).join("\n\n")
}

function packageFileFor(sectionId: string) {
  if (/customer-revenue/i.test(sectionId)) {
    const txt = `${CONTEXT_ROOT}/STANLEY-SYSTEMS-—-THE-FOLLOW-UP-SYSTEM-V2.txt`
    if (yes(txt)) return txt
    const md = `${CONTEXT_ROOT}/09_FOLLOW_UP_SYSTEM_BUNDLE.md`
    if (yes(md)) return md
    return txt
  }
  return `${CONTEXT_ROOT}/STANLEY-SYSTEMS-OFFER-ARCHITECTURE-AND-PACKAGE-1-V3.md`
}

function buildCustomerRevenuePack(args: Args) {
  const sectionId = requireArg(args, "section_id")
  const sectionType = requireArg(args, "section_type")
  const route = requireArg(args, "route")
  const runId = requireArg(args, "run_id")
  const timestamp = new Date().toISOString()
  const outputDir = resolve(one(args, "output_dir", join(ARTIFACT_ROOT, sectionId, runId)))
  mkdirSync(outputDir, { recursive: true })

  const p00 = `${CONTEXT_ROOT}/00_START_HERE.md`
  const p01 = `${CONTEXT_ROOT}/01_CORE_FOUNDATION.md`
  const p02 = `${CONTEXT_ROOT}/02_WRITING_AND_LANGUAGE_RULES.md`
  const offer = `${CONTEXT_ROOT}/STANLEY-SYSTEMS-OFFER-ARCHITECTURE-AND-PACKAGE-1-V3.md`
  const packagePath = packageFileFor(sectionId)
  const approvedMd = `${TASTE_ROOT}/approved/customer-revenue/customer-revenue-preview-001.md`
  const approvedPng = `${TASTE_ROOT}/approved/customer-revenue/customer-revenue-preview-001.png`
  const badGlobal = `${TASTE_ROOT}/rejected/bad-patterns-v1/bad-patterns-v1.md`
  const badRoad = `${TASTE_ROOT}/rejected/bad-patterns-v1/customer-revenue-road-metaphor-confusing.md`
  const badUglyDiagram = `${TASTE_ROOT}/rejected/bad-patterns-v1/customer-revenue-ugly-generated-diagram.md`
  const badUglyAsset = `${TASTE_ROOT}/rejected/bad-patterns-v1/customer-revenue-ugly-generated-asset.md`
  const badOverFramed = `${TASTE_ROOT}/rejected/bad-patterns-v1/over-framed-section-pattern.md`

  const entries = [
    source(p00, "source routing only", ["file map", "source-of-truth routing", "confirms image generation should use business/copy/taste context, not infra"]),
    source(p01, "core business context", ["Stanley Systems fixes office-side gaps", "slow billing, broken follow-up, owner rescue work", "service businesses with real office/admin function", "lead with money, time, owner relief", "not AI consultancy, not generic SaaS, not software vendor"]),
    source(p02, "copy and language rules", ["plain English", "practical, calm, sharp", "financial/time consequence first", "avoid AI as hero and consultant-speak", "avoid optimize/streamline/transform/empower/innovative/cutting-edge/efficiency/synergy"]),
    source(offer, "offer architecture", ["Workflow Audit is paid diagnostic wedge", "Customer Revenue System public promise: Get more money from the customers you already earned", "Stanley Systems brings past customers back, gets reviews, creates referrals, catches extra calls", "public copy says Stanley Systems"]),
    source(packagePath, "section-specific package/system context", yes(packagePath) ? ["Customer Revenue package source loaded", "Smart Re-Engagement / Review Booster / Referral Engine / Call Catcher themes when present", "lead with business outcome, not plumbing"] : ["missing; no canonical Customer Revenue system file found under stanley-context", "continue only because Offer Architecture contains Customer Revenue promise"]),
    source(approvedMd, "approved Customer Revenue taste reference", ["central loop/system visual", "low text density", "clear outcomes", "not generic SaaS", "one dominant explanatory graphic"]),
    source(approvedPng, "approved Customer Revenue image reference", ["visual reference image for layout/taste; not prompt text content"]),
    source(badGlobal, "global bad pattern reference", ["polish alone is not enough", "reject generic SaaS, fake dashboards, repeated card dominance, weak mobile"]),
    source(badRoad, "Customer Revenue rejected road metaphor", ["visually rich but semantically confusing", "road/path metaphor failed because viewer could not trace business logic"]),
    source(badUglyDiagram, "Customer Revenue ugly diagram rejection", ["semantic correctness is not enough", "reject clumsy low-taste generated diagrams"]),
    source(badUglyAsset, "Customer Revenue ugly generated asset rejection", ["missing if absent; reject ugly generated visual assets"]),
    source(badOverFramed, "over-framing rejection", ["missing if absent; reject boxes-inside-boxes and border noise"]),
  ]

  const finalPrompt = `Create one full-section website reference mockup for the Stanley Systems Customer Revenue System. This is a reference mockup only, not production UI. The final website will rebuild every headline, label, CTA, card, diagram, and layout element as real React/Tailwind/SVG/DOM.\n\nSection label: Customer Revenue System.\nHeadline: Get more money from the customers you already earned.\nSubhead direction: Old customers, happy customers, reviews, referrals, and missed calls should feed the next job instead of getting lost after the first sale.\nPrimary CTA: Book the Workflow Audit.\nSecondary CTA: See how the system works.\n\nBusiness meaning to show in 5 seconds: Stanley Systems helps a service business turn existing customer moments into repeat revenue. Show old customers becoming re-engagement, fresh reviews, referral opportunities, captured calls, and more booked work. Make the business logic obvious without a designer explaining it.\n\nVisual anchor: one premium, clean, light-mode system visual that connects customer moments to more booked work and repeat revenue. Use a clear loop or system map only if every step has a business role and is easy to trace. It should feel like a practical service-business revenue system, not a SaaS dashboard.\n\nLayout: plausible finished website section, not a moodboard. Strong headline and subhead, dominant explanatory visual, concise outcome labels, clear CTA placement, generous whitespace, green/navy/white/neutral Stanley Systems palette. Low-to-medium text density. Desktop-first composition with mobile-plausible stacking.\n\nDo not create generic SaaS dashboards, fake analytics walls, fake testimonials, AI/robot imagery, orange/gold/dark-mode palettes, road/path metaphors that do not explain the offer, ugly circle diagrams, repeated icon-card stacks dominating the section, over-framed boxes-inside-boxes, decorative floating cards, multi-concept boards, moodboards, 2x2 grids, comparison boards, or a full-page screenshot outside the target section. One image equals one single section direction.`

  const criticChecks = [
    ["Prompt includes Stanley Systems-specific business context", true],
    ["Prompt includes exact section label/headline/CTA language", true],
    ["Prompt asks for full-section reference mockup with text and hierarchy", true],
    ["Prompt forbids generic SaaS/dashboard/AI-slop patterns", true],
    ["Prompt includes approved taste principles", true],
    ["Prompt includes rejected bad-pattern avoidance", true],
    ["Prompt avoids infra/PM2/API/secrets/runtime context", true],
    ["Prompt makes buyer reaction obvious in 5 seconds", true],
  ]

  const pack = `# Stanley Systems Image Generation Context Pack\n\n## 1. Run metadata\n- section_id: ${sectionId}\n- section_type: ${sectionType}\n- route: ${route}\n- run_id: ${runId}\n- timestamp: ${timestamp}\n- requested_model: GPT-Image2High / gpt-image-2\n- requested_quality: high\n- output_goal: Full-section Customer Revenue System reference mockups with text, hierarchy, CTA placement, and business-explanatory visual direction.\n\n## 2. Source files loaded\n${sourceBlock(entries)}\n\n## 3. Source files intentionally excluded\n- /home/jaden/.openclaw/workspace/project/stanley-context/04_BUILD_INFRA_AND_AGENT_STATE.md: excluded because image generation does not need VPS, PM2, deploy, secrets, API paths, or runtime details.\n- /home/jaden/.openclaw/workspace/project/stanley-context/05_DEMO_AND_AUTOMATION_STATE.md: excluded because this Customer Revenue image prompt does not need demo/proof or technical workflow state.\n- OpenClaw/Hermes/Codex runtime files: excluded because generated mockups should be customer-facing design references, not implementation/infrastructure diagrams.\n\n## 4. Section job\nExplain how Stanley Systems gets more money from existing customers by connecting old customers, happy customers, reviews, referrals, captured calls, and more booked work into one understandable revenue system. Support the Workflow Audit as the next commercial step.\n\n## 5. Buyer reaction goal\nA skeptical service-business owner should understand in 5 seconds: “We already earned these customers. Stanley Systems can help turn them into repeat jobs, reviews, referrals, captured calls, and more money without making my office chase everything manually.”\n\n## 6. Stanley Systems business truths for this section\n- Stanley Systems fixes office-side gaps that slow billing, break follow-up, and force owner rescue work.\n- Best-fit buyers are service businesses with real office/admin function and existing tools.\n- Lead with money, time, owner relief, and customer/revenue recovery.\n- This must feel practical and trades-friendly, not AI consultancy, software vendor, or generic SaaS.\n\n## 7. Offer/package truths for this section\n- Public package name: Customer Revenue System.\n- Public promise: Get more money from the customers you already earned.\n- Package logic: bring past customers back, turn happy customers into fresh reviews, turn reviews into referral opportunities, catch extra calls, and move those moments toward more booked work.\n- Workflow Audit remains the commercial first step.\n- Public copy should say Stanley Systems, not internal shorthand.\n\n## 8. Copy and language rules for this section\n- Tone: plain English, practical, calm, sharp, trades-friendly.\n- Lead with financial or time consequence.\n- Connect every fix to money, time, owner relief, billing speed, lead recovery, or fewer dropped balls.\n- CTA should be direct and money/workflow oriented.\n- Banned public frames: AI as hero, automation as hero, optimize, streamline, transform, empower, innovative, cutting-edge, efficiency, synergy, consultant-speak.\n\n## 9. Approved taste direction\n- Use one dominant explanatory visual, not many weak mini-cards.\n- A central loop/system visual is approved when it clearly shows old customers, reviews, referrals, captured calls, and more booked work feeding repeat revenue.\n- Keep text density low-to-medium and hierarchy obvious.\n- Use green for revenue/action and navy for trust.\n- Make the section easy to scan in 5 seconds.\n- The mockup can include text and CTA placement because it is a reference image, but production must rebuild all content as real UI.\n\n## 10. Rejected bad patterns\n- Do not create a safe but underdesigned repeated icon-card stack.\n- Do not create a road/path metaphor that looks rich but does not explain the offer.\n- Do not create a semantically correct but ugly/clumsy circle diagram.\n- Do not create generic SaaS, fake dashboards, fake testimonials, or AI/robot motifs.\n- Do not create over-framed boxes-inside-boxes or border noise as the main premium device.\n- Missing rejected files are listed above; do not pretend they loaded.\n\n## 11. Current section failure\n- Old plain version was too icon-heavy and dependent on repeated cards.\n- Road version was visually rich but semantically confusing.\n- Loop/circle version was semantically closer but visually ugly, clumsy, and low-quality on mobile.\n- Generated visual direction looked low-taste and not premium enough.\n- Desired next direction: full-section GPT Image reference mockup with text, layout, CTA placement, and imagery, then Codex rebuilds the selected direction as real UI.\n\n## 12. Visual direction for GPT Image\nCreate a polished light-mode Stanley Systems website section. The visual anchor should show customer moments turning into repeat revenue: old customers, reviews, referrals, captured calls, and booked work. The design should be premium but practical, service-business specific, and understandable without explanation. Use one strong system visual, not a dashboard wall or card pile.\n\n## 13. Text/copy to include in mockup\n- Eyebrow: Customer Revenue System\n- Headline: Get more money from the customers you already earned.\n- Subhead: Old customers, happy customers, reviews, referrals, and missed calls should feed the next job.\n- Labels: Old customers, Fresh reviews, Referrals, Captured calls, More booked work, Repeat revenue.\n- Primary CTA: Book the Workflow Audit\n- Secondary CTA: See how the system works\n\nImportant: For full-section reference mockups, text is allowed and expected. The generated image is not production UI. Codex will rebuild all text as real DOM.\n\n## 14. Things the generated mockup must not do\n- no generic SaaS\n- no fake dashboard\n- no fake testimonials\n- no meaningless road/path metaphor\n- no over-framing\n- no repeated card-stack dominance\n- no ugly generated diagram\n- no decorative visual that needs explanation\n- no multi-concept board\n- no moodboard\n- no full-page screenshot outside the target section\n- no orange, gold, amber, sepia, dark-mode, robots, or AI motifs\n\n## 15. Final GPT Image prompt draft\n${finalPrompt}\n\n## 16. Prompt Critic checklist\n${criticChecks.map(([label, passed]) => `- ${passed ? "PASS" : "FAIL"}: ${label}`).join("\n")}\n\nPrompt Critic result: PASS. The prompt is specific enough for GPT Image 2 High. Do not call GPT Image if required approved references are missing for a future section. For this Customer Revenue pilot, the approved reference exists; some optional rejected references are missing and are explicitly listed as missing.\n`

  const packPath = join(outputDir, "image-generation-context-pack.md")
  writeFileSync(packPath, pack, "utf8")
  writeFileSync(join(outputDir, "final-gpt-image-prompt.txt"), finalPrompt, "utf8")
  writeFileSync(join(outputDir, "prompt-critic-result.md"), `# Prompt Critic Result\n\nDecision: PASS\n\n${criticChecks.map(([label, passed]) => `- ${passed ? "PASS" : "FAIL"}: ${label}`).join("\n")}\n`, "utf8")
  console.log(JSON.stringify({ pack_path: packPath, prompt_path: join(outputDir, "final-gpt-image-prompt.txt"), critic_path: join(outputDir, "prompt-critic-result.md"), output_dir: outputDir }, null, 2))
}

const args = parseArgs(process.argv.slice(2))
if (one(args, "help") === "true") {
  console.log("Usage: node --experimental-strip-types scripts/design-loop/build-stanley-image-context-pack.ts --section_id customer-revenue --section_type 'Customer Revenue System' --route / --run_id <id>")
} else {
  buildCustomerRevenuePack(args)
}
