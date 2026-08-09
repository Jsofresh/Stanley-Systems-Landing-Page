const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const outDir = path.resolve('artifacts/kanban-overnight/screenshots');
fs.mkdirSync(outDir, { recursive: true });

const cases = [
  { name: 'home-desktop', url: 'https://stanley-systems.com/?qa=overnight-live-visual', width: 1440, height: 1200 },
  { name: 'home-mobile', url: 'https://stanley-systems.com/?qa=overnight-live-visual-mobile', width: 390, height: 1200 },
  { name: 'pricing-desktop', url: 'https://stanley-systems.com/pricing?qa=overnight-live-visual', width: 1440, height: 1200 },
  { name: 'pricing-mobile', url: 'https://stanley-systems.com/pricing?qa=overnight-live-visual-mobile', width: 390, height: 1200 },
];

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium' });
  const results = [];
  for (const c of cases) {
    const page = await browser.newPage({ viewport: { width: c.width, height: c.height }, deviceScaleFactor: 1 });
    const response = await page.goto(c.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(1800);
    const screenshot = path.join(outDir, `${c.name}.png`);
    await page.screenshot({ path: screenshot, fullPage: true });
    const data = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const docScroll = document.documentElement.scrollWidth;
      const bodyScroll = document.body ? document.body.scrollWidth : 0;
      const overflow = Math.max(docScroll, bodyScroll) - vw;
      const text = (document.body?.innerText || '').replace(/\s+/g, ' ').trim();
      const visible = (el) => {
        const r = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        return r.width > 1 && r.height > 1 && s.display !== 'none' && s.visibility !== 'hidden' && Number(s.opacity || 1) > 0.01;
      };
      const imgDetails = Array.from(document.images).map((img) => {
        const r = img.getBoundingClientRect();
        return {
          src: img.currentSrc || img.src || '',
          alt: img.alt || '',
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          rect: { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) },
          visible: visible(img),
        };
      });
      const failedVisibleImages = imgDetails.filter(img => img.visible && (!img.complete || img.naturalWidth < 8 || img.naturalHeight < 8));
      const visualKitImages = imgDetails.filter(img => /\/visual-kit\//.test(img.src));
      const failedVisualKitImages = visualKitImages.filter(img => img.visible && (!img.complete || img.naturalWidth < 8 || img.naturalHeight < 8));
      const wideElements = Array.from(document.querySelectorAll('body *')).map((el) => {
        const r = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        return { tag: el.tagName.toLowerCase(), cls: String(el.className || '').slice(0, 120), text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 120), x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height), display: s.display };
      }).filter(e => e.width > vw + 2 && e.height > 2).slice(0, 20);
      const consoleErrorText = Array.from(document.querySelectorAll('nextjs-portal')).map(e => e.textContent).join('\n');
      return {
        title: document.title,
        viewport: { width: vw, height: window.innerHeight },
        scroll: { documentElement: docScroll, body: bodyScroll, overflowPx: overflow },
        bodyTextStart: text.slice(0, 600),
        visualKitImageCount: visualKitImages.length,
        visibleImageCount: imgDetails.filter(i => i.visible).length,
        failedVisibleImages,
        failedVisualKitImages,
        wideElements,
        hasApplicationErrorText: /Application error|client-side exception|server-side exception/i.test(text + '\n' + consoleErrorText),
        hasPricingCopy: /Workflow Audit|Cash Flow Collection System|Repeat Revenue System|Pricing|Get clear on the workflow/i.test(text),
        hasHomepageCopy: /Stanley Systems|billing|follow-up|office|service business/i.test(text),
      };
    });
    results.push({ ...c, status: response ? response.status() : null, finalUrl: page.url(), screenshot, data });
    await page.close();
  }
  await browser.close();
  const jsonPath = path.resolve('artifacts/kanban-overnight/live-visual-qa.json');
  fs.writeFileSync(jsonPath, JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2));
  console.log(jsonPath);
  for (const r of results) {
    console.log(`${r.name} status=${r.status} overflow=${r.data.scroll.overflowPx} visualKitImgs=${r.data.visualKitImageCount} failedVisibleImgs=${r.data.failedVisibleImages.length} failedVisualKitImgs=${r.data.failedVisualKitImages.length} screenshot=${r.screenshot}`);
    if (r.data.hasApplicationErrorText) console.log(`${r.name} APPLICATION_ERROR_TEXT=true`);
    if (r.data.wideElements.length) console.log(`${r.name} wideElements=${JSON.stringify(r.data.wideElements.slice(0,3))}`);
  }
})().catch(err => { console.error(err); process.exit(1); });
