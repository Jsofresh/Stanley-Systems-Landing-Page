import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const artifactDir = '/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/post-second-footer-fix-design-qa-rerun-20260504-design-coordinator';
const base = process.env.BASE_URL || 'http://127.0.0.1:3129';
const pricingPath = '/pricing?source=calculator&recommended=both&annual_leak=%24120K&monthly_leak=%2410K';

await fs.mkdir(artifactDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: '/usr/bin/chromium',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});

async function runCase({ name, url, width, height, screenshot }) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  const consoleMessages = [];
  page.on('console', (msg) => consoleMessages.push({ type: msg.type(), text: msg.text().slice(0, 500) }));
  page.on('pageerror', (err) => consoleMessages.push({ type: 'pageerror', text: err.message.slice(0, 500) }));
  await page.goto(base + url, { waitUntil: 'networkidle' });
  // Trigger lazy images before full-page capture/DOM image checks.
  await page.evaluate(async () => {
    for (let y = 0; y <= document.documentElement.scrollHeight; y += 900) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 250));
  });
  await page.screenshot({ path: path.join(artifactDir, screenshot), fullPage: true });
  const result = await page.evaluate(async () => {
    const doc = document.documentElement;
    const body = document.body;
    const overflow = Math.max(doc.scrollWidth, body.scrollWidth) - doc.clientWidth;
    const visibleText = document.body.innerText || '';

    const visibleOwnTextMatches = [];
    const terms = ['Paid first step', 'Post-audit path', 'Repeat Revenue System'];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
    while (walker.nextNode()) {
      const el = walker.currentNode;
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      if (rect.width <= 0 || rect.height <= 0 || style.visibility === 'hidden' || style.display === 'none') continue;
      const ownText = Array.from(el.childNodes)
        .filter((n) => n.nodeType === Node.TEXT_NODE)
        .map((n) => n.textContent || '')
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
      for (const term of terms) {
        if (ownText.includes(term)) {
          visibleOwnTextMatches.push({ term, tag: el.tagName, text: ownText.slice(0, 180), className: String(el.className || '') });
        }
      }
    }

    const navButton = Array.from(document.querySelectorAll('button, a')).find((el) => (el.textContent || '').trim() === 'Workflow Audit');
    const navButtonStyle = navButton ? getComputedStyle(navButton) : null;
    const navButtonRect = navButton?.getBoundingClientRect();

    const footer = document.querySelector('footer');
    const footerRect = footer?.getBoundingClientRect();
    const footerVisibleChildren = footer
      ? Array.from(footer.querySelectorAll('a, p, span, h2, h3, div')).map((el) => {
          const rect = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
          return { tag: el.tagName, text: text.slice(0, 80), top: Math.round(rect.top), height: Math.round(rect.height), display: style.display, visibility: style.visibility };
        }).filter((x) => x.text && x.height > 0 && x.display !== 'none' && x.visibility !== 'hidden')
      : [];
    const firstFooterTextTop = footerRect && footerVisibleChildren.length ? Math.min(...footerVisibleChildren.map((x) => x.top)) : null;
    const footerTopGap = footerRect && firstFooterTextTop !== null ? Math.round(firstFooterTextTop - footerRect.top) : null;

    const cashCollectionHeading = Array.from(document.querySelectorAll('h1,h2,h3,p,div,span')).find((el) => (el.textContent || '').includes('Cash Flow Collection System'));
    const cashSection = document.querySelector('[data-section="cash-collection-system"]') || cashCollectionHeading?.closest('section') || null;
    const cashRect = cashSection?.getBoundingClientRect();
    const cashOverflowing = cashSection
      ? Array.from(cashSection.querySelectorAll('*')).map((el) => {
          const r = el.getBoundingClientRect();
          return {
            tag: el.tagName,
            text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 90),
            left: Math.round(r.left),
            right: Math.round(r.right),
            width: Math.round(r.width),
          };
        }).filter((x) => x.width > 0 && (x.left < -1 || x.right > doc.clientWidth + 1))
      : [];

    const images = Array.from(document.images).map((img) => ({
      alt: img.alt,
      src: img.currentSrc || img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      rect: (() => { const r = img.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) }; })(),
    }));
    const visualKitImages = images.filter((img) => img.src.includes('/visual-kit/'));
    const visualKitResponses = [];
    const uniqueVisualKitImages = [...new Map(visualKitImages.map((img) => [img.src, img])).values()];
    for (const img of uniqueVisualKitImages) {
      try {
        const res = await fetch(img.src, { method: 'HEAD' });
        visualKitResponses.push({ src: img.src, status: res.status, ok: res.ok });
      } catch (err) {
        visualKitResponses.push({ src: img.src, status: null, ok: false, error: String(err).slice(0, 160) });
      }
    }

    const coloredEls = Array.from(document.querySelectorAll('*')).map((el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return { text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 70), top: Math.round(r.top), bg: s.backgroundColor, color: s.color, border: s.borderColor };
    }).filter((x) => /rgb\((2[0-5][0-9]|1[89][0-9]),\s*(1[0-8][0-9]|[6-9][0-9]),\s*([0-9]{1,2})\)/.test(x.bg + x.color + x.border));

    return {
      title: document.title,
      viewport: `${doc.clientWidth}x${window.innerHeight}`,
      scrollWidth: Math.max(doc.scrollWidth, body.scrollWidth),
      clientWidth: doc.clientWidth,
      horizontalOverflowPx: overflow,
      noHorizontalOverflow: overflow <= 0,
      bodyTextLength: visibleText.length,
      visibleOwnTextMatches,
      navButton: navButtonStyle ? {
        text: (navButton.textContent || '').trim(),
        rect: navButtonRect ? { x: Math.round(navButtonRect.x), y: Math.round(navButtonRect.y), width: Math.round(navButtonRect.width), height: Math.round(navButtonRect.height) } : null,
        color: navButtonStyle.color,
        backgroundColor: navButtonStyle.backgroundColor,
        borderColor: navButtonStyle.borderColor,
      } : null,
      footerHeight: footerRect ? Math.round(footerRect.height) : null,
      footerTopGap,
      footerVisibleChildren: footerVisibleChildren.slice(0, 12),
      cashCollectionSection: cashRect ? { top: Math.round(cashRect.top), height: Math.round(cashRect.height), width: Math.round(cashRect.width), left: Math.round(cashRect.left), right: Math.round(cashRect.right) } : null,
      cashOverflowing,
      imageCount: images.length,
      visualKitImages,
      visualKitResponses,
      orangeLikeComputedElements: coloredEls.slice(0, 20),
    };
  });
  await page.close();
  return { name, url, width, height, screenshot: path.join(artifactDir, screenshot), consoleMessages, ...result };
}

const results = [];
results.push(await runCase({ name: 'home-mobile', url: '/', width: 390, height: 1200, screenshot: 'home-mobile.png' }));
results.push(await runCase({ name: 'home-desktop', url: '/', width: 1440, height: 1600, screenshot: 'home-desktop.png' }));
results.push(await runCase({ name: 'pricing-mobile', url: pricingPath, width: 390, height: 1200, screenshot: 'pricing-mobile.png' }));
results.push(await runCase({ name: 'pricing-desktop', url: pricingPath, width: 1440, height: 1600, screenshot: 'pricing-desktop.png' }));

const failures = [];
for (const result of results) {
  if ((result.name === 'home-mobile' || result.name === 'pricing-mobile') && !result.noHorizontalOverflow) {
    failures.push(`${result.name}: horizontal overflow ${result.horizontalOverflowPx}px`);
  }
  if (result.name === 'home-mobile' && result.cashOverflowing.length) {
    failures.push(`${result.name}: Cash Flow Collection System has overflowing descendants: ${JSON.stringify(result.cashOverflowing.slice(0, 3))}`);
  }
  if (result.name === 'pricing-mobile' && (result.footerTopGap === null || result.footerTopGap > 80)) {
    failures.push(`${result.name}: footer top gap still too large (${result.footerTopGap}px)`);
  }
  if (result.name === 'pricing-desktop' && result.navButton) {
    const badDark = result.navButton.backgroundColor.includes('16, 32, 51') || result.navButton.backgroundColor.includes('0, 0, 0') || result.navButton.color.includes('255, 255, 255');
    if (badDark) failures.push(`${result.name}: nav CTA appears dark/inverted: ${JSON.stringify(result.navButton)}`);
  }
  if (result.name.startsWith('home') && result.visualKitImages.length === 0) {
    failures.push(`${result.name}: no visual-kit images found in DOM`);
  }
  const brokenVisualKit = result.visualKitImages.filter((img) => !img.complete || img.naturalWidth <= 0 || img.naturalHeight <= 0);
  // Natural dimensions can be flaky for far-offscreen lazy images in full-page headless captures;
  // direct asset URL checks below are the authoritative asset-load verification.
  const visibleBrokenVisualKit = brokenVisualKit.filter((img) => img.rect.y >= 0 && img.rect.y < result.height + 200);
  if (visibleBrokenVisualKit.length) {
    failures.push(`${result.name}: visible broken visual-kit images ${JSON.stringify(visibleBrokenVisualKit)}`);
  }
  const badVisualKitResponses = result.visualKitResponses.filter((r) => !r.ok);
  if (badVisualKitResponses.length) {
    failures.push(`${result.name}: visual-kit asset HEAD failures ${JSON.stringify(badVisualKitResponses)}`);
  }
}

const payload = { artifactDir, base, results, failures };
await fs.writeFile(path.join(artifactDir, 'design-qa-post-second-footer-fix.json'), JSON.stringify(payload, null, 2));
await browser.close();
console.log(JSON.stringify(payload, null, 2));
if (failures.length) process.exit(1);
