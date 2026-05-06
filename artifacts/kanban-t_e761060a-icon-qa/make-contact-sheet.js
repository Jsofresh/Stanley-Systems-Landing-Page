const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const base = __dirname;
const items = [
  ['Money Leak Map desktop','money-leak-map-desktop-1440.png'],
  ['Workflow Audit desktop','workflow-audit-desktop-1440.png'],
  ['Cash Flow Collection System desktop','cash-collection-system-desktop-1440.png'],
  ['Repeat Revenue System desktop','follow-up-system-desktop-1440.png'],
  ['Money Leak Map mobile','money-leak-map-mobile-390.png'],
  ['Workflow Audit mobile','workflow-audit-mobile-390.png'],
  ['Cash Flow Collection System mobile','cash-collection-system-mobile-390.png'],
  ['Repeat Revenue System mobile','follow-up-system-mobile-390.png'],
];
const cards = items.map(([label, file]) => {
  const imgPath = path.join(base, file);
  const encoded = fs.readFileSync(imgPath).toString('base64');
  return `<div class="card"><h2>${label}</h2><img src="data:image/png;base64,${encoded}"></div>`;
}).join('');
const html = `<!doctype html><html><head><style>
body{margin:0;background:#f4f5f2;font-family:Arial,sans-serif;color:#102033}.grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:20px}.card{background:white;border:1px solid #dfe7dc;border-radius:18px;padding:12px;box-shadow:0 8px 22px rgba(16,32,51,.08);overflow:hidden}h2{font-size:20px;margin:0 0 10px}img{display:block;max-width:100%;max-height:520px;object-fit:contain;margin:auto;border-radius:12px;border:1px solid #edf1ea}
</style></head><body><div class="grid">${cards}</div></body></html>`;
(async()=>{
  const browser = await chromium.launch({headless:true, executablePath:'/usr/bin/chromium'});
  const page = await browser.newPage({viewport:{width:1500,height:2300}});
  await page.setContent(html, {waitUntil:'load'});
  await page.screenshot({path:path.join(base,'approval-packet-contact-sheet.png'), fullPage:true});
  await browser.close();
})();
