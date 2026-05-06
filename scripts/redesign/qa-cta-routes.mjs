import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { chromium } from "playwright"

const baseUrl = process.env.QA_BASE_URL || "http://127.0.0.1:3040"
const outDir = process.env.QA_OUT_DIR || "artifacts/redesign-final-qa-20260506T0140"
const routes = ["/", "/pricing", "/systems/cashflow-control", "/systems/repeat-revenue"]
const expectedStripeLinks = {
  bothSystemsMonthly: "https://buy.stripe.com/28EbJ0bDV7U7eeBeNsg7e05",
}

await mkdir(outDir, { recursive: true })

const browser = await chromium.launch({ chromiumSandbox: false, args: ["--no-sandbox", "--disable-setuid-sandbox"] })
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } })
const report = { pages: [], failures: [] }

function normalizeHref(href) {
  if (!href) return ""
  if (href.startsWith(baseUrl)) return href.slice(baseUrl.length) || "/"
  return href
}

for (const route of routes) {
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" })
  const anchors = await page.$$eval("a[href]", (links) =>
    links.map((a) => ({ text: (a.textContent || "").replace(/\s+/g, " ").trim(), href: a.href })),
  )
  report.pages.push({ route, status: response?.status() || 0, anchors: anchors.map((a) => ({ ...a, href: normalizeHref(a.href) })) })
  if ((response?.status() || 0) !== 200) report.failures.push(`${route} returned ${response?.status()}`)
}

// Internal route health for every rendered internal link on checked pages.
const internalHrefs = new Set()
for (const p of report.pages) {
  for (const a of p.anchors) {
    const href = a.href
    if (href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/_next")) {
      internalHrefs.add(href.split("#")[0] || "/")
    }
  }
}
for (const href of [...internalHrefs].sort()) {
  const response = await page.goto(`${baseUrl}${href}`, { waitUntil: "domcontentloaded" })
  const status = response?.status() || 0
  if (status >= 400) report.failures.push(`Internal link ${href} returned ${status}`)
}

function findAnchor(route, textIncludes, hrefIncludes) {
  const pageReport = report.pages.find((p) => p.route === route)
  return pageReport?.anchors.find((a) => a.text.includes(textIncludes) && a.href.includes(hrefIncludes))
}

const assertions = [
  ["Homepage Cashflow CTA routes to system page", !!findAnchor("/", "Cashflow", "/systems/cashflow-control")],
  ["Homepage Repeat Revenue CTA routes to system page", !!findAnchor("/", "Repeat Revenue", "/systems/repeat-revenue")],
  ["Homepage calculator CTA routes to calculator", !!findAnchor("/", "Calculate", "/invoicing-delay-cash-flow-calculator")],
  ["Pricing Both Systems Monthly checkout link present", report.pages.find((p) => p.route === "/pricing")?.anchors.some((a) => a.href === expectedStripeLinks.bothSystemsMonthly)],
  ["Pricing Cashflow learn-more routes to system page", !!findAnchor("/pricing", "Learn More", "/systems/cashflow-control")],
  ["Pricing Repeat learn-more routes to system page", !!findAnchor("/pricing", "Learn More", "/systems/repeat-revenue")],
]
for (const [label, pass] of assertions) {
  if (!pass) report.failures.push(label)
}

await browser.close()
await writeFile(path.join(outDir, "qa-cta-routes.json"), JSON.stringify(report, null, 2))
console.log(JSON.stringify({ failures: report.failures, pages: report.pages.map((p) => ({ route: p.route, status: p.status, anchors: p.anchors.length })) }, null, 2))
if (report.failures.length) process.exitCode = 1
