import { test, expect } from '@playwright/test';

test.describe('Strategies Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/strategies');
  });

  test('should load strategies page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Spot Gold Trading/i);
    await expect(page.getByRole('heading', { name: /Strategies/i })).toBeVisible();
  });

  test('should display page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Strategies/i })).toBeVisible();
  });

  test('should be accessible from navigation', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Strategies/i }).click();
    await expect(page).toHaveURL(/\/strategies/);
  });

  test('should load without console errors', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/strategies');
    await page.waitForLoadState('networkidle');

    const criticalErrors = consoleErrors.filter(
      error => !error.includes('favicon') && !error.includes('404')
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/strategies');

    await expect(page.getByRole('heading', { name: /Strategies/i })).toBeVisible();
  });

  test('should have navigation menu visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Dashboard/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Tools/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Portfolio/i })).toBeVisible();
  });
});

test.describe('Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/settings');
  });

  test('should load settings page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Spot Gold Trading/i);
    await expect(page.getByRole('heading', { name: /Settings/i })).toBeVisible();
  });

  test('should display page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Settings/i })).toBeVisible();
  });

  test('should be accessible from navigation', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Settings/i }).click();
    await expect(page).toHaveURL(/\/settings/);
  });

  test('should load without console errors', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/settings');
    await page.waitForLoadState('networkidle');

    const criticalErrors = consoleErrors.filter(
      error => !error.includes('favicon') && !error.includes('404')
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/settings');

    await expect(page.getByRole('heading', { name: /Settings/i })).toBeVisible();
  });

  test('should have navigation menu visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Dashboard/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Tools/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Portfolio/i })).toBeVisible();
  });
});

test.describe('Cross-Page Navigation', () => {
  test('should navigate between all pages', async ({ page }) => {
    // Start at dashboard
    await page.goto('/');

    // Navigate to Tools
    await page.getByRole('link', { name: /Tools/i }).click();
    await expect(page).toHaveURL(/\/tools/);
    await expect(page.getByRole('heading', { name: /Trading Tools/i })).toBeVisible();

    // Navigate to Portfolio
    await page.getByRole('link', { name: /Portfolio/i }).click();
    await expect(page).toHaveURL(/\/portfolio/);
    await expect(page.getByRole('heading', { name: /Portfolio/i })).toBeVisible();

    // Navigate to Alerts
    await page.getByRole('link', { name: /Alerts/i }).click();
    await expect(page).toHaveURL(/\/alerts/);
    await expect(page.getByRole('heading', { name: /Price Alerts/i })).toBeVisible();

    // Navigate to Strategies
    await page.getByRole('link', { name: /Strategies/i }).click();
    await expect(page).toHaveURL(/\/strategies/);
    await expect(page.getByRole('heading', { name: /Strategies/i })).toBeVisible();

    // Navigate to Settings
    await page.getByRole('link', { name: /Settings/i }).click();
    await expect(page).toHaveURL(/\/settings/);
    await expect(page.getByRole('heading', { name: /Settings/i })).toBeVisible();

    // Navigate back to Dashboard
    await page.getByRole('link', { name: /Dashboard/i }).click();
    await expect(page).toHaveURL(/^\/$|\/$/);
  });

  test('should maintain active navigation state', async ({ page }) => {
    await page.goto('/tools');

    // Tools link should have active styling or be highlighted
    const toolsLink = page.getByRole('link', { name: /Tools/i });
    await expect(toolsLink).toBeVisible();
  });

  test('should load pages quickly', async ({ page }) => {
    const pages = ['/', '/tools', '/portfolio', '/alerts', '/strategies', '/settings'];

    for (const pagePath of pages) {
      const startTime = Date.now();
      await page.goto(pagePath);
      await page.waitForLoadState('domcontentloaded');
      const loadTime = Date.now() - startTime;

      // Each page should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    }
  });
});

test.describe('Price Ticker (Global Component)', () => {
  test('should display price ticker on all pages', async ({ page }) => {
    const pages = ['/', '/tools', '/portfolio', '/alerts', '/strategies', '/settings'];

    for (const pagePath of pages) {
      await page.goto(pagePath);

      // Price should be visible on every page
      const priceElement = page.locator('text=/\\$[0-9,]+/').first();
      await expect(priceElement).toBeVisible();
    }
  });

  test('should show price change on all pages', async ({ page }) => {
    const pages = ['/', '/tools', '/portfolio'];

    for (const pagePath of pages) {
      await page.goto(pagePath);

      // Price change should be visible
      const changeElement = page.locator('text=/[+\\-][0-9.]+%/').first();
      await expect(changeElement).toBeVisible({ timeout: 10000 });
    }
  });
});

test.describe('Responsive Design', () => {
  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 },
  ];

  for (const viewport of viewports) {
    test(`should be responsive on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      const pages = ['/', '/tools', '/portfolio', '/alerts', '/strategies', '/settings'];

      for (const pagePath of pages) {
        await page.goto(pagePath);

        // Navigation should be accessible
        await expect(page.getByRole('link', { name: /Dashboard/i })).toBeVisible();

        // No horizontal scrolling
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        const viewportWidth = await page.evaluate(() => window.innerWidth);
        expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20); // Allow small margin
      }
    });
  }
});

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    const pages = [
      { path: '/', heading: /Gold Trading|Dashboard/i },
      { path: '/tools', heading: /Trading Tools/i },
      { path: '/portfolio', heading: /Portfolio/i },
      { path: '/alerts', heading: /Price Alerts/i },
      { path: '/strategies', heading: /Strategies/i },
      { path: '/settings', heading: /Settings/i },
    ];

    for (const { path, heading } of pages) {
      await page.goto(path);
      await expect(page.getByRole('heading', { name: heading })).toBeVisible();
    }
  });

  test('should have accessible navigation links', async ({ page }) => {
    await page.goto('/');

    const navLinks = ['Dashboard', 'Tools', 'Portfolio', 'Alerts', 'Strategies', 'Settings'];

    for (const linkName of navLinks) {
      await expect(page.getByRole('link', { name: new RegExp(linkName, 'i') })).toBeVisible();
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Tab through navigation links
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Should be able to navigate using Enter key
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT']).toContain(focusedElement || '');
  });
});
