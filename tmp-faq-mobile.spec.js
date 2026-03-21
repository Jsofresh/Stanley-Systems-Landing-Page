const { test, expect, devices } = require('playwright/test');

test.use({ ...devices['iPhone 13'] });

test('mobile FAQ toggle opens and closes', async ({ page }) => {
  await page.goto('http://127.0.0.1:3012', { waitUntil: 'networkidle' });
  await page.getByText('Before you book').scrollIntoViewIfNeeded();

  const trigger = page.getByRole('button', { name: /Do we need to switch software\?/i });
  const answer = page.getByText('No, they do not need to switch software. Stanley Systems works inside the tools the team already uses whenever possible.');

  await expect(answer).toBeVisible();
  await trigger.click();
  await expect(answer).toBeHidden();
  await trigger.click();
  await expect(answer).toBeVisible();
});
