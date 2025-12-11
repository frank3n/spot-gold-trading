import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load dashboard page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Spot Gold Trading/i);
  });

  test('should display navigation menu', async ({ page }) => {
    // Check all main navigation links are present
    await expect(page.getByRole('link', { name: /Dashboard/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Tools/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Portfolio/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Alerts/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Strategies/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Settings/i })).toBeVisible();
  });

  test('should display current gold price', async ({ page }) => {
    // Check if gold price is displayed (should have $ sign)
    const priceElement = page.locator('text=/\\$[0-9,]+/').first();
    await expect(priceElement).toBeVisible();
  });

  test('should display price change indicators', async ({ page }) => {
    // Check for price change percentage
    const changeElement = page.locator('text=/%/').first();
    await expect(changeElement).toBeVisible({ timeout: 10000 });
  });

  test('should have dashboard heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Gold Trading/i })).toBeVisible();
  });

  test('should navigate to different pages from dashboard', async ({ page }) => {
    // Test navigation to Tools
    await page.getByRole('link', { name: /Tools/i }).click();
    await expect(page).toHaveURL(/\/tools/);

    // Navigate back to dashboard
    await page.goto('/');

    // Test navigation to Portfolio
    await page.getByRole('link', { name: /Portfolio/i }).click();
    await expect(page).toHaveURL(/\/portfolio/);
  });

  test('should be responsive and mobile-friendly', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();

    // Navigation should still be accessible
    await expect(page.getByRole('link', { name: /Dashboard/i })).toBeVisible();
  });

  test('should not have console errors', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out expected/harmless errors if any
    const criticalErrors = consoleErrors.filter(
      error => !error.includes('favicon') && !error.includes('404')
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;

    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });
});
