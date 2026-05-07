const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

const url = process.env.SECTION4_QA_URL || 'http://127.0.0.1:3069/'
const outDir = path.resolve('artifacts/section4-icons-fit-local-qa')
fs.mkdirSync(outDir, { recursive: true })

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const bad = []
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
  desktop.on('response', (response) => {
    if (response.status() >= 400) bad.push(`${response.status()} ${response.url()}`)
  })
  await desktop.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
  await desktop.addStyleTag({ content: 'header{display:none!important}' })
  const section = desktop.locator('[data-section="workflow-audit-mechanism"]').first()
  await section.waitFor({ state: 'visible', timeout: 20000 })
  await section.scrollIntoViewIfNeeded()
  await desktop.waitForTimeout(500)
  await section.screenshot({ path: path.join(outDir, 'section4-desktop.png') })
  const desktopMetrics = await desktop.evaluate(() => {
    const section = document.querySelector('[data-section="workflow-audit-mechanism"]')
    const imgs = [...section.querySelectorAll('img')].map((img) => ({
      src: img.getAttribute('src'),
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
    }))
    const r = section.getBoundingClientRect()
    return {
      sectionHeight: r.height,
      viewportHeight: window.innerHeight,
      noOverflow: document.documentElement.scrollWidth <= document.documentElement.clientWidth,
      images: imgs,
      imageCount: imgs.length,
      displayAssetCount: section.querySelectorAll('[data-stanley-display-asset="true"]').length,
      text: section.textContent,
    }
  })

  const mobile = await browser.newPage({ viewport: { width: 390, height: 1000 }, deviceScaleFactor: 1 })
  mobile.on('response', (response) => {
    if (response.status() >= 400) bad.push(`${response.status()} ${response.url()}`)
  })
  await mobile.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
  await mobile.addStyleTag({ content: 'header{display:none!important}' })
  const mobileSection = mobile.locator('[data-section="workflow-audit-mechanism"]').first()
  await mobileSection.waitFor({ state: 'visible', timeout: 20000 })
  await mobileSection.scrollIntoViewIfNeeded()
  await mobile.waitForTimeout(500)
  await mobileSection.screenshot({ path: path.join(outDir, 'section4-mobile.png') })
  const mobileMetrics = await mobile.evaluate(() => ({
    noOverflow: document.documentElement.scrollWidth <= document.documentElement.clientWidth,
  }))

  const requiredAssets = [
    'money-leak-map-display.png',
    'delayed-invoice-display.png',
    'inactive-customers-display.png',
    'file-estimate-display.png',
    'phone-missed-display.png',
    'estimate-next-step-badge-display.png',
    'shield-check-display.png',
    'invoice-delay-clock-display.png',
    'monthly-impact-trend-display.png',
    'billing-check-display.png',
  ]
  const srcs = desktopMetrics.images.map((img) => img.src || '')
  const missingAssets = requiredAssets.filter((asset) => !srcs.some((src) => src.includes(asset)))
  const unloaded = desktopMetrics.images.filter((img) => !img.complete || img.naturalWidth === 0)
  const text = desktopMetrics.text || ''
  const checks = {
    desktopFits900: desktopMetrics.sectionHeight <= 900,
    displayAssetCount: desktopMetrics.displayAssetCount >= 10,
    noDesktopOverflow: desktopMetrics.noOverflow,
    noMobileOverflow: mobileMetrics.noOverflow,
    noUnloadedImages: unloaded.length === 0,
    noMissingAssets: missingAssets.length === 0,
    ctaPresent: text.includes('Book Workflow Audit'),
  }
  const report = { url, checks, desktopMetrics: { ...desktopMetrics, text: undefined }, mobileMetrics, missingAssets, unloaded, bad }
  fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2))
  console.log(JSON.stringify(report, null, 2))
  await browser.close()
  if (bad.length || Object.values(checks).some((value) => !value)) process.exit(1)
})().catch((error) => {
  console.error(error)
  process.exit(1)
})
