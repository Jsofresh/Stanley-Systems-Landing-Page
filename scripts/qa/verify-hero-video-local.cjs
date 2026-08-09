const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

const url = process.env.HERO_QA_URL || 'http://127.0.0.1:3065/'
const outDir = path.resolve('artifacts/hero-video-local-qa')
fs.mkdirSync(outDir, { recursive: true })

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 920 }, deviceScaleFactor: 1 })
  const bad = []
  page.on('response', (response) => {
    if (response.status() >= 400) bad.push(`${response.status()} ${response.url()}`)
  })

  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(1600)

  const result = await page.evaluate(async () => {
    const hero = document.querySelector('[data-section="phase3-hero"]')
    const video = document.querySelector('video[data-hero-video="true"]')
    const sources = [...document.querySelectorAll('video[data-hero-video="true"] source')].map((source) => ({
      src: source.getAttribute('src'),
      type: source.getAttribute('type'),
    }))
    const blueBlobColors = [...document.querySelectorAll('[class*="right-[-8rem]"]')].map((element) => getComputedStyle(element).backgroundColor)
    const sourceChecks = []
    for (const source of sources.map((entry) => entry.src)) {
      const response = await fetch(source, { method: 'HEAD' })
      sourceChecks.push({
        src: source,
        status: response.status,
        type: response.headers.get('content-type'),
        length: response.headers.get('content-length'),
      })
    }

    return {
      heroExists: Boolean(hero),
      videoExists: Boolean(video),
      videoCurrentSrc: video?.currentSrc || null,
      videoReadyState: video?.readyState,
      videoPaused: video?.paused,
      videoWidth: video?.videoWidth || 0,
      videoHeight: video?.videoHeight || 0,
      sources,
      sourceChecks,
      blueBlobColors,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }
  })

  const heroBox = await page.locator('[data-section="phase3-hero"]').boundingBox()
  await page.screenshot({ path: path.join(outDir, 'hero-desktop.png'), clip: heroBox })
  await browser.close()

  const report = { result, bad, screenshot: path.join(outDir, 'hero-desktop.png') }
  fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2))
  console.log(JSON.stringify(report, null, 2))

  if (!result.heroExists || !result.videoExists) throw new Error('hero/video missing')
  if (result.sourceChecks.some((check) => check.status !== 200)) throw new Error('video source HEAD failed')
  if (result.scrollWidth > result.clientWidth) throw new Error('horizontal overflow')
  if (bad.length) throw new Error(`bad responses: ${bad.join('\n')}`)
})().catch((error) => {
  console.error(error)
  process.exit(1)
})
