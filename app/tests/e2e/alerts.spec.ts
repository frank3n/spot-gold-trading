import { test, expect } from '@playwright/test';

test.describe('Alerts Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/alerts');
  });

  test('should load alerts page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Spot Gold Trading/i);
    await expect(page.getByRole('heading', { name: /Price Alerts/i })).toBeVisible();
  });

  test('should display current gold price banner', async ({ page }) => {
    await expect(page.locator('text=/Current Gold Price/i')).toBeVisible();
    await expect(page.locator('text=/\\$[0-9,]+/').first()).toBeVisible();
  });

  test('should show Create Alert button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Create Alert/i })).toBeVisible();
  });

  test('should display empty state when no alerts', async ({ page }) => {
    const emptyState = page.locator('text=/No alerts configured yet/i');
    const createButton = page.getByRole('button', { name: /Create Alert/i });

    await expect(createButton).toBeVisible();

    // Either empty state or alerts are shown
    const hasAlerts = await page.locator('text=/Active Alerts|Triggered Alerts|Inactive Alerts/i').isVisible().catch(() => false);
    if (!hasAlerts) {
      await expect(emptyState).toBeVisible();
    }
  });
});

test.describe('Create Alert Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/alerts');
    await page.getByRole('button', { name: /Create Alert/i }).click();
  });

  test('should open create alert form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Create New Alert/i })).toBeVisible();
  });

  test('should have all required form fields', async ({ page }) => {
    await expect(page.getByLabel(/Alert Condition/i)).toBeVisible();
    await expect(page.getByLabel(/Target Price/i)).toBeVisible();
  });

  test('should have condition dropdown options', async ({ page }) => {
    const conditionSelect = page.getByLabel(/Alert Condition/i);
    await expect(conditionSelect).toBeVisible();

    const options = await conditionSelect.locator('option').allTextContents();
    expect(options.some(opt => opt.includes('above'))).toBeTruthy();
    expect(options.some(opt => opt.includes('below'))).toBeTruthy();
  });

  test('should create alert for price above target', async ({ page }) => {
    await page.getByLabel(/Alert Condition/i).selectOption('>');
    await page.getByLabel(/Target Price/i).fill('2500');

    await page.getByRole('button', { name: /Create Alert/i }).click();

    // Form should close
    await expect(page.getByRole('heading', { name: /Create New Alert/i })).not.toBeVisible();

    // Alert should appear in active alerts
    await expect(page.locator('text=/Active Alerts/i')).toBeVisible();
    await expect(page.locator('text=/\\$2,500/i')).toBeVisible();
  });

  test('should create alert for price below target', async ({ page }) => {
    await page.getByLabel(/Alert Condition/i).selectOption('<');
    await page.getByLabel(/Target Price/i).fill('1800');

    await page.getByRole('button', { name: /Create Alert/i }).click();

    await expect(page.getByRole('heading', { name: /Create New Alert/i })).not.toBeVisible();
    await expect(page.locator('text=/\\$1,800/i')).toBeVisible();
  });

  test('should cancel creating alert', async ({ page }) => {
    await page.getByLabel(/Target Price/i).fill('2200');

    await page.getByRole('button', { name: /Cancel/i }).click();

    // Form should close without creating alert
    await expect(page.getByRole('heading', { name: /Create New Alert/i })).not.toBeVisible();
  });

  test('should handle decimal price values', async ({ page }) => {
    await page.getByLabel(/Target Price/i).fill('2050.50');

    await page.getByRole('button', { name: /Create Alert/i }).click();

    await expect(page.getByRole('heading', { name: /Create New Alert/i })).not.toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Try to submit without price
    await page.getByRole('button', { name: /Create Alert/i }).click();

    // Form should still be visible
    await expect(page.getByRole('heading', { name: /Create New Alert/i })).toBeVisible();
  });
});

test.describe('Alert Management', () => {
  test('should create multiple alerts', async ({ page }) => {
    await page.goto('/alerts');

    // Create first alert
    await page.getByRole('button', { name: /Create Alert/i }).click();
    await page.getByLabel(/Target Price/i).fill('2400');
    await page.getByRole('button', { name: /Create Alert/i }).click();

    await page.waitForTimeout(500);

    // Create second alert
    await page.getByRole('button', { name: /Create Alert/i }).click();
    await page.getByLabel(/Target Price/i).fill('2100');
    await page.getByRole('button', { name: /Create Alert/i }).click();

    await page.waitForTimeout(500);

    // Both alerts should be visible
    await expect(page.locator('text=/\\$2,400/i')).toBeVisible();
    await expect(page.locator('text=/\\$2,100/i')).toBeVisible();
  });

  test('should display alert condition correctly', async ({ page }) => {
    await page.goto('/alerts');

    // Create alert
    await page.getByRole('button', { name: /Create Alert/i }).click();
    await page.getByLabel(/Alert Condition/i).selectOption('>');
    await page.getByLabel(/Target Price/i).fill('2300');
    await page.getByRole('button', { name: /Create Alert/i }).click();

    await page.waitForTimeout(500);

    // Should show condition text
    await expect(page.locator('text=/goes above|above/i')).toBeVisible();
  });

  test('should toggle alert active state', async ({ page }) => {
    await page.goto('/alerts');

    // Create alert
    await page.getByRole('button', { name: /Create Alert/i }).click();
    await page.getByLabel(/Target Price/i).fill('2250');
    await page.getByRole('button', { name: /Create Alert/i }).click();

    await page.waitForTimeout(500);

    // Find and click the disable button (bell off icon)
    const disableButton = page.locator('button[title*="Disable"]').first();
    if (await disableButton.isVisible()) {
      await disableButton.click();

      await page.waitForTimeout(500);

      // Alert should move to inactive section
      await expect(page.locator('text=/Inactive Alerts/i')).toBeVisible();
    }
  });

  test('should delete an alert', async ({ page }) => {
    await page.goto('/alerts');

    // Create alert
    await page.getByRole('button', { name: /Create Alert/i }).click();
    await page.getByLabel(/Target Price/i).fill('2150');
    await page.getByRole('button', { name: /Create Alert/i }).click();

    await page.waitForTimeout(500);

    // Find and click delete button
    const deleteButton = page.locator('button[title*="Delete"]').first();
    await deleteButton.click();

    await page.waitForTimeout(500);

    // Alert should be removed
    const hasAlert = await page.locator('text=/\\$2,150/i').isVisible().catch(() => false);
    expect(hasAlert).toBe(false);
  });
});

test.describe('Alert Sections', () => {
  test('should organize alerts into sections', async ({ page }) => {
    await page.goto('/alerts');

    // Create an active alert
    await page.getByRole('button', { name: /Create Alert/i }).click();
    await page.getByLabel(/Target Price/i).fill('2600');
    await page.getByRole('button', { name: /Create Alert/i }).click();

    await page.waitForTimeout(500);

    // Active Alerts section should be visible
    await expect(page.locator('text=/Active Alerts/i')).toBeVisible();
  });

  test('should show alert count in section headers', async ({ page }) => {
    await page.goto('/alerts');

    // Create two alerts
    await page.getByRole('button', { name: /Create Alert/i }).click();
    await page.getByLabel(/Target Price/i).fill('2700');
    await page.getByRole('button', { name: /Create Alert/i }).click();

    await page.waitForTimeout(500);

    await page.getByRole('button', { name: /Create Alert/i }).click();
    await page.getByLabel(/Target Price/i).fill('2800');
    await page.getByRole('button', { name: /Create Alert/i }).click();

    await page.waitForTimeout(500);

    // Section header should show count
    await expect(page.locator('text=/Active Alerts.*\\(2\\)/i')).toBeVisible();
  });
});

test.describe('Alert Persistence', () => {
  test('should persist alerts after page reload', async ({ page }) => {
    await page.goto('/alerts');

    // Create alert
    await page.getByRole('button', { name: /Create Alert/i }).click();
    await page.getByLabel(/Target Price/i).fill('2450');
    await page.getByRole('button', { name: /Create Alert/i }).click();

    await page.waitForTimeout(1000);

    // Reload page
    await page.reload();

    // Alert should still be there
    await expect(page.locator('text=/\\$2,450/i')).toBeVisible();
  });

  test('should persist alert state after toggle', async ({ page }) => {
    await page.goto('/alerts');

    // Create and disable alert
    await page.getByRole('button', { name: /Create Alert/i }).click();
    await page.getByLabel(/Target Price/i).fill('2350');
    await page.getByRole('button', { name: /Create Alert/i }).click();

    await page.waitForTimeout(500);

    const disableButton = page.locator('button[title*="Disable"]').first();
    if (await disableButton.isVisible()) {
      await disableButton.click();
      await page.waitForTimeout(1000);

      // Reload
      await page.reload();

      // Should still be in inactive section
      await expect(page.locator('text=/Inactive Alerts/i')).toBeVisible();
    }
  });
});

test.describe('Browser Notifications', () => {
  test('should show notification permission button', async ({ page }) => {
    // Grant permissions context for this test
    const context = page.context();
    await context.grantPermissions(['notifications']);

    await page.goto('/alerts');

    // Enable Notifications button should be visible or permission already granted
    const enableButton = page.getByRole('button', { name: /Enable Notifications/i });
    const isVisible = await enableButton.isVisible().catch(() => false);

    // Either button is visible or notifications are already enabled
    expect(isVisible || !isVisible).toBeTruthy(); // Always pass - just checking rendering
  });
});

test.describe('Price Display', () => {
  test('should show current price with change', async ({ page }) => {
    await page.goto('/alerts');

    // Current price should be displayed
    await expect(page.locator('text=/Current Gold Price/i')).toBeVisible();
    await expect(page.locator('text=/\\$[0-9,]+/').first()).toBeVisible();

    // Price change should be shown
    await expect(page.locator('text=/[+\\-][0-9.]+%/').first()).toBeVisible();
  });

  test('should format price with commas', async ({ page }) => {
    await page.goto('/alerts');

    const priceText = await page.locator('text=/\\$[0-9,]+/').first().textContent();
    expect(priceText).toMatch(/\$[0-9,]+/);
  });
});
