const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const baseUrl = process.env.QA_BASE_URL || 'http://127.0.0.1:3107/?qa=icon-fix';
const outDir = path.resolve(__dirname);

const targets = [
  {
    key: 'money-leak-map',
    label: 'Money Leak Map',
    selector: 'section[data-section="audit-output-preview"]',
    minImages: 5,
  },
  {
    key: 'workflow-audit',
    label: 'Workflow Audit',
    selector: 'section[data-section="workflow-proof"]',
    minImages: 4,
  },
  {
    key: 'cash-collection-system',
    label: 'Cash Flow Collection System',
    selector: '[data-section="cash-collection-system"]',
    minImages: 9,
  },
  {
    key: 'follow-up-system',
    label: 'Repeat Revenue System',
    selector: '[data-section="follow-up-system"]',
    minImages: 6,
  },
  {
    key: 'the-follow-up-loop',
    label: 'Repeat Revenue System',
    selector: '[data-section="follow-up-system"] >> text=Repeat Revenue System',
    screenshotParentSelector: '[data-section="follow-up-system"]',
    minImages: 4,
  },
];

async function sectionReport(page, target, viewportName) {
  const locator = page.locator(target.selector).first();
  await locator.waitFor({ state: 'visible', timeout: 10000 });
  const shotLocator = target.screenshotParentSelector
    ? page.locator(target.screenshotParentSelector).first()
    : locator;
  await shotLocator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(350);

  const png = path.join(outDir, `${target.key}-${viewportName}.png`);
  await shotLocator.screenshot({ path: png, animations: 'disabled' });

  const scopeSelector = target.screenshotParentSelector || target.selector;
  const data = await page.locator(scopeSelector).first().evaluate((el, expectedLabel) => {
    const rect = el.getBoundingClientRect();
    const imgs = Array.from(el.querySelectorAll('img')).map((img) => {
      const r = img.getBoundingClientRect();
      const cs = window.getComputedStyle(img);
      const wrapper = img.closest('[data-stanley-display-asset="true"]');
      return {
        src: img.currentSrc || img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        rectWidth: Math.round(r.width),
        rectHeight: Math.round(r.height),
        opacity: cs.opacity,
        visibility: cs.visibility,
        display: cs.display,
        wrapper: Boolean(wrapper),
      };
    });
    const stanleyImgs = imgs.filter((img) => img.wrapper && img.src.includes('/visual-kit/display-assets/'));
    return {
      label: expectedLabel,
      textPresent: el.innerText.includes(expectedLabel) || document.body.innerText.includes(expectedLabel),
      rect: {
        x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height)
      },
      imageCount: imgs.length,
      stanleyImageCount: stanleyImgs.length,
      brokenImages: imgs.filter((img) => !img.complete || img.naturalWidth <= 0 || img.naturalHeight <= 0 || img.rectWidth <= 0 || img.rectHeight <= 0 || img.visibility === 'hidden' || img.display === 'none'),
      sampleStanleyImages: stanleyImgs.slice(0, 12),
    };
  }, target.label);

  return {
    ...data,
    key: target.key,
    viewport: viewportName,
    screenshot: png,
    pass: data.textPresent && data.stanleyImageCount >= target.minImages && data.brokenImages.length === 0 && data.rect.width > 250 && data.rect.height > 80,
    minImages: target.minImages,
  };
}

async function runViewport(browser, viewportName, viewport) {
  const page = await browser.newPage({ viewport });
  page.on('console', (msg) => {
    if (['error', 'warning'].includes(msg.type())) {
      console.log(`browser_${msg.type()}: ${msg.text()}`);
    }
  });
  const response = await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(700);
  const status = response ? response.status() : null;
  const overflow = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentClientWidth: document.documentElement.clientWidth,
    documentScrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) > document.documentElement.clientWidth + 1,
  }));
  const sections = [];
  for (const target of targets) {
    sections.push(await sectionReport(page, target, viewportName));
  }
  await page.close();
  return { viewportName, status, overflow, sections };
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium' });
  const results = [];
  results.push(await runViewport(browser, 'desktop-1440', { width: 1440, height: 1100 }));
  results.push(await runViewport(browser, 'mobile-390', { width: 390, height: 1200 }));
  await browser.close();

  const allImageUrls = new Set();
  for (const viewport of results) {
    for (const section of viewport.sections) {
      for (const img of section.sampleStanleyImages) allImageUrls.add(img.src);
    }
  }

  const summary = {
    baseUrl,
    outDir,
    createdAt: new Date().toISOString(),
    viewports: results,
    uniqueSampleStanleyAssetUrls: Array.from(allImageUrls),
    pass: results.every((r) => r.status === 200 && !r.overflow.overflow && r.sections.every((s) => s.pass)),
  };
  fs.writeFileSync(path.join(outDir, 'icon-qa-results.json'), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));
  if (!summary.pass) process.exit(1);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
