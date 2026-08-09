import { mkdir } from "node:fs/promises"
import path from "node:path"
import { chromium } from "playwright"

const baseUrl = process.env.QA_BASE_URL || "http://127.0.0.1:3040"
const outDir = process.env.QA_OUT_DIR || "artifacts/redesign-phases-2-6-20260506/screenshots"

const routes = [
  ["/", "home"],
  ["/pricing", "pricing"],
  ["/systems/cashflow-control", "cashflow-control"],
  ["/systems/repeat-revenue", "repeat-revenue"],
]

const viewports = [
  { name: "desktop", width: 1440, height: 1200 },
  { name: "mobile", width: 390, height: 1100 },
]

await mkdir(outDir, { recursive: true })

const browser = await chromium.launch({
  chromiumSandbox: false,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
})
const results = []

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport })
  const consoleMessages = []
  const badResponses = []
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      consoleMessages.push(`${message.type()}: ${message.text()}`)
    }
  })
  page.on("response", (response) => {
    if (response.status() >= 400) {
      badResponses.push({ status: response.status(), url: response.url() })
    }
  })

  for (const [route, label] of routes) {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" })
    const status = response?.status() ?? 0
    const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)
    const screenshot = path.join(outDir, `${label}-${viewport.name}.png`)
    await page.screenshot({ path: screenshot, fullPage: true })

    results.push({
      route,
      viewport: viewport.name,
      status,
      horizontalOverflow,
      screenshot,
      consoleMessages: [...consoleMessages],
      badResponses: [...badResponses],
    })
    consoleMessages.length = 0
    badResponses.length = 0
  }

  await page.close()
}

await browser.close()

console.log(JSON.stringify(results, null, 2))

const failures = results.filter((result) => result.status >= 400 || result.horizontalOverflow || result.badResponses.length)
if (failures.length) {
  process.exitCode = 1
}
