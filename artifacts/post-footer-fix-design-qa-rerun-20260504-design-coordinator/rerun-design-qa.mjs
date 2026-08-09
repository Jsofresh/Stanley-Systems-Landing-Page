import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const artifactDir = '/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/post-footer-fix-design-qa-rerun-20260504-design-coordinator';
const base = 'http://127.0.0.1:3123';
const pricingPath = '/pricing?source=calculator&recommended=both&annual_leak=%24120K&monthly_leak=%2410K';
await fs.mkdir(artifactDir, { recursive: true });

function rgbParts(s) {
  const m = String(s || '').match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(',').map(x => Number.parseFloat(x.trim()));
  if (p.length < 3 || p.some((v, i) => i < 3 && Number.isNaN(v))) return null;
  return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1, raw: s };
}

const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium' });

async function runCase({ name, url, width, height, screenshot }) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  const response = await page.goto(base + url, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(artifactDir, screenshot), fullPage: true });
  const consoleMessages = [];
  page.on('console', msg => consoleMessages.push({ type: msg.type(), text: msg.text().slice(0, 300) }));

  const result = await page.evaluate(() => {
    function ownText(el) {
      return Array.from(el.childNodes).filter(n => n.nodeType === Node.TEXT_NODE).map(n => n.textContent || '').join(' ').replace(/\s+/g, ' ').trim();
    }
    function visible(el) {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && Number(s.opacity || '1') > 0.01;
    }
    function nearestSectionByText(text) {
      const candidates = Array.from(document.querySelectorAll('section, main > div, div')).filter(el => visible(el) && (el.innerText || '').includes(text));
      candidates.sort((a, b) => {
        const ar = a.getBoundingClientRect();
        const br = b.getBoundingClientRect();
        return (ar.width * ar.height) - (br.width * br.height);
      });
      return candidates[0] || null;
    }
    const doc = document.documentElement;
    const body = document.body;
    const clientWidth = doc.clientWidth;
    const scrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
    const horizontalOverflowPx = scrollWidth - clientWidth;
    const overflowingVisibleElements = Array.from(document.querySelectorAll('body *')).filter(visible).map(el => {
      const r = el.getBoundingClientRect();
      return { tag: el.tagName, text: (ownText(el) || (el.getAttribute('aria-label') || '')).slice(0, 90), className: String(el.className || '').slice(0, 160), left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), height: Math.round(r.height) };
    }).filter(x => x.left < -2 || x.right > clientWidth + 2).slice(0, 30);

    const cashSection = nearestSectionByText('Cash Flow Collection System');
    const cashRect = cashSection?.getBoundingClientRect();
    const cashItems = cashSection ? Array.from(cashSection.querySelectorAll('*')).filter(visible).map(el => {
      const r = el.getBoundingClientRect();
      return { tag: el.tagName, text: ownText(el).slice(0, 80), left: Math.round(r.left), right: Math.round(r.right), top: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height) };
    }).filter(x => x.left < -2 || x.right > clientWidth + 2).slice(0, 20) : [];

    const terms = ['Paid first step', 'Post-audit path', 'Cash Flow Collection System', 'Repeat Revenue System'];
    const visibleTermMatches = [];
    const badPricingKickerMatches = [];
    for (const el of Array.from(document.querySelectorAll('body *')).filter(visible)) {
      const text = ownText(el);
      for (const term of terms) {
        if (text.includes(term)) {
          const cls = String(el.className || '');
          const style = getComputedStyle(el);
          const isLikelyKicker = cls.includes('rounded-full') || cls.includes('uppercase') || cls.includes('tracking-') || Number.parseFloat(style.fontSize) <= 14;
          const hit = { term, tag: el.tagName, text: text.slice(0, 140), className: cls.slice(0, 180), fontSize: style.fontSize };
          visibleTermMatches.push(hit);
          if (isLikelyKicker) badPricingKickerMatches.push(hit);
        }
      }
    }

    const navButton = Array.from(document.querySelectorAll('button, a')).find(el => visible(el) && (el.textContent || '').trim() === 'Workflow Audit');
    const navStyle = navButton ? getComputedStyle(navButton) : null;
    const footer = document.querySelector('footer');
    const footerRect = footer?.getBoundingClientRect();
    const footerText = footer ? (footer.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 300) : '';
    const footerChildren = footer ? Array.from(footer.children).filter(visible).map(el => { const r = el.getBoundingClientRect(); return { tag: el.tagName, text: (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 120), top: Math.round(r.top), height: Math.round(r.height), bottom: Math.round(r.bottom), className: String(el.className || '').slice(0, 160) }; }) : [];
    const footerLinksStart = footer ? Math.min(...Array.from(footer.querySelectorAll('h3')).filter(visible).map(el => Math.round(el.getBoundingClientRect().top))) : null;
    const footerLogo = footer ? Array.from(footer.querySelectorAll('img')).find(visible) : null;
    const footerLogoRect = footerLogo?.getBoundingClientRect();

    const visualKitImages = Array.from(document.images).filter(img => visible(img) && img.currentSrc.includes('/visual-kit/')).map(img => {
      const r = img.getBoundingClientRect();
      return { src: img.currentSrc.replace(location.origin, ''), alt: img.alt, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight, complete: img.complete, left: Math.round(r.left), top: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height) };
    });

    const warmColors = [];
    for (const el of Array.from(document.querySelectorAll('body *')).filter(visible).slice(0, 2500)) {
      const s = getComputedStyle(el);
      for (const prop of ['backgroundColor', 'color', 'borderColor']) {
        const raw = s[prop];
        const m = String(raw).match(/rgba?\(([^)]+)\)/);
        if (!m) continue;
        const p = m[1].split(',').map(x => Number.parseFloat(x.trim()));
        const [r,g,b] = p;
        const a = p.length > 3 ? p[3] : 1;
        if (a < 0.4) continue;
        const max = Math.max(r,g,b), min = Math.min(r,g,b);
        const sat = max === 0 ? 0 : (max-min)/max;
        const warmish = r > 145 && g > 65 && g < 185 && b < 110 && r > b + 45;
        if (warmish && sat > 0.32) warmColors.push({ prop, raw, text: ownText(el).slice(0, 70), tag: el.tagName, className: String(el.className || '').slice(0, 100) });
      }
      if (warmColors.length >= 20) break;
    }

    return {
      title: document.title,
      clientWidth,
      scrollWidth,
      horizontalOverflowPx,
      noHorizontalOverflow: horizontalOverflowPx <= 0,
      overflowingVisibleElements,
      cashSection: cashRect ? { left: Math.round(cashRect.left), right: Math.round(cashRect.right), width: Math.round(cashRect.width), height: Math.round(cashRect.height), overflowingChildren: cashItems } : null,
      visibleTermMatches,
      badPricingKickerMatches,
      navButton: navStyle ? { color: navStyle.color, backgroundColor: navStyle.backgroundColor, borderColor: navStyle.borderColor } : null,
      footer: footerRect ? { height: Math.round(footerRect.height), top: Math.round(footerRect.top), text: footerText, children: footerChildren, linksStart: Number.isFinite(footerLinksStart) ? footerLinksStart : null, logo: footerLogoRect ? { top: Math.round(footerLogoRect.top), bottom: Math.round(footerLogoRect.bottom), height: Math.round(footerLogoRect.height) } : null } : null,
      visualKitImages,
      warmColors,
    };
  });

  await page.close();
  return { name, url, status: response?.status() ?? null, width, height, screenshot: path.join(artifactDir, screenshot), consoleMessages, ...result };
}

const results = [];
results.push(await runCase({ name: 'home-mobile', url: '/', width: 390, height: 1200, screenshot: 'home-mobile.png' }));
results.push(await runCase({ name: 'home-desktop', url: '/', width: 1440, height: 1600, screenshot: 'home-desktop.png' }));
results.push(await runCase({ name: 'pricing-mobile', url: pricingPath, width: 390, height: 1200, screenshot: 'pricing-mobile.png' }));
results.push(await runCase({ name: 'pricing-desktop', url: pricingPath, width: 1440, height: 1600, screenshot: 'pricing-desktop.png' }));

const failures = [];
for (const result of results) {
  if (result.status !== 200) failures.push(`${result.name}: HTTP ${result.status}`);
  if (result.name.includes('mobile') && !result.noHorizontalOverflow) failures.push(`${result.name}: horizontal overflow ${result.horizontalOverflowPx}px`);
  if (result.name === 'home-mobile' && result.cashSection?.overflowingChildren?.length) failures.push(`${result.name}: Cash Flow Collection System child overflow ${JSON.stringify(result.cashSection.overflowingChildren)}`);
  if (result.name.startsWith('pricing') && result.badPricingKickerMatches.length) failures.push(`${result.name}: old pricing kicker/eyebrow-like labels visible ${JSON.stringify(result.badPricingKickerMatches)}`);
  if (result.name.startsWith('pricing') && (!result.footer?.text || result.footer.height > 700)) failures.push(`${result.name}: footer missing content or too tall (${result.footer?.height})`);
  if (result.navButton) {
    const bg = rgbParts(result.navButton.backgroundColor);
    if (bg && bg.a > 0.8 && bg.r < 75 && bg.g < 75 && bg.b < 75) failures.push(`${result.name}: nav CTA background is dark ${result.navButton.backgroundColor}`);
  } else {
    failures.push(`${result.name}: Workflow Audit nav CTA not found`);
  }
  const badVisualKit = result.visualKitImages.filter(img => !img.complete || img.naturalWidth <= 0 || img.naturalHeight <= 0);
  if (badVisualKit.length) failures.push(`${result.name}: visual-kit image load failure ${JSON.stringify(badVisualKit)}`);
}

const summary = { artifactDir, base, pricingPath, failures, results };
await fs.writeFile(path.join(artifactDir, 'design-qa-rerun.json'), JSON.stringify(summary, null, 2));
await browser.close();
console.log(JSON.stringify({ artifactDir, failures, screenshots: results.map(r => r.screenshot), compact: results.map(r => ({ name: r.name, status: r.status, overflow: r.horizontalOverflowPx, visualKitImages: r.visualKitImages.length, footerHeight: r.footer?.height, footerLinksStart: r.footer?.linksStart, footerLogoBottom: r.footer?.logo?.bottom, navButton: r.navButton, badPricingKickerMatches: r.badPricingKickerMatches.length, warmColorHits: r.warmColors.length })) }, null, 2));
if (failures.length) process.exit(1);

