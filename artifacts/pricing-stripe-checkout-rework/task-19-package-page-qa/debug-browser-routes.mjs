import { chromium } from 'playwright';
const baseUrl = process.env.QA_BASE_URL || 'http://127.0.0.1:3149';
const browser = await chromium.launch({headless:true, executablePath:'/usr/bin/chromium'});
for (const route of ['/checkout/cancel','/terms-and-conditions','/privacy-policy']) {
  const page = await browser.newPage();
  const logs=[];
  page.on('console', msg => logs.push({type:msg.type(), text:msg.text()}));
  page.on('pageerror', err => logs.push({type:'pageerror', text:String(err.stack||err)}));
  const res = await page.goto(baseUrl+route, {waitUntil:'networkidle'});
  const text = await page.locator('body').innerText().catch(e=>'ERR:'+e.message);
  console.log('\nROUTE', route, 'status', res?.status(), 'len', text.length, 'text', JSON.stringify(text.slice(0,300)));
  console.log(logs.slice(-10));
  await page.close();
}
await browser.close();
