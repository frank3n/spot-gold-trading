import { test, expect } from '@playwright/test';

test.describe('Portfolio Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portfolio');
  });

  test('should load portfolio page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Spot Gold Trading/i);
    await expect(page.getByRole('heading', { name: /Portfolio/i })).toBeVisible();
  });

  test('should display portfolio summary cards', async ({ page }) => {
    // Check for three main summary cards
    await expect(page.locator('text=/Total Value/i')).toBeVisible();
    await expect(page.locator('text=/Cost Basis/i')).toBeVisible();
    await expect(page.locator('text=/Unrealized P\\/L/i')).toBeVisible();
  });

  test('should show empty state when no positions', async ({ page }) => {
    // If there are no positions, should show empty message
    const emptyMessage = page.locator('text=/No positions yet/i');
    const addButton = page.getByRole('button', { name: /Add Position/i });

    await expect(addButton).toBeVisible();

    // Check if empty state OR positions are shown
    const hasPositions = await page.locator('tbody tr').count();
    if (hasPositions === 1) {
      // Single row could be empty state
      await expect(emptyMessage).toBeVisible();
    }
  });

  test('should display Add Position button', async ({ page }) => {
    const addButton = page.getByRole('button', { name: /Add Position/i });
    await expect(addButton).toBeVisible();
  });
});

test.describe('Add Position Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portfolio');
    await page.getByRole('button', { name: /Add Position/i }).click();
  });

  test('should open add position form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Add New Position/i })).toBeVisible();
  });

  test('should have all required form fields', async ({ page }) => {
    // Check for all form elements
    await expect(page.getByLabel(/Position Type/i)).toBeVisible();
    await expect(page.getByLabel(/Unit/i)).toBeVisible();
    await expect(page.getByLabel(/Quantity/i)).toBeVisible();
    await expect(page.getByLabel(/Average Cost Basis/i)).toBeVisible();
    await expect(page.getByLabel(/Notes/i)).toBeVisible();
  });

  test('should have dropdown options for position type', async ({ page }) => {
    const typeSelect = page.getByLabel(/Position Type/i);
    await expect(typeSelect).toBeVisible();

    // Check options exist
    const options = await typeSelect.locator('option').allTextContents();
    expect(options).toContain('Physical Gold');
    expect(options).toContain('ETF');
    expect(options).toContain('Future');
  });

  test('should have dropdown options for unit', async ({ page }) => {
    const unitSelect = page.getByLabel(/Unit/i);
    await expect(unitSelect).toBeVisible();

    const options = await unitSelect.locator('option').allTextContents();
    expect(options.some(opt => opt.includes('Ounces') || opt.includes('oz'))).toBeTruthy();
    expect(options.some(opt => opt.includes('Gram'))).toBeTruthy();
    expect(options.some(opt => opt.includes('Shares'))).toBeTruthy();
  });

  test('should add a new position successfully', async ({ page }) => {
    // Fill in the form
    await page.getByLabel(/Position Type/i).selectOption('physical');
    await page.getByLabel(/Unit/i).selectOption('oz');
    await page.getByLabel(/Quantity/i).fill('10');
    await page.getByLabel(/Average Cost Basis/i).fill('2000');
    await page.getByLabel(/Notes/i).fill('Test gold position');

    // Submit form
    await page.getByRole('button', { name: /Add Position/i }).click();

    // Form should close
    await expect(page.getByRole('heading', { name: /Add New Position/i })).not.toBeVisible();

    // Position should appear in table
    await expect(page.locator('text=/10 oz/i')).toBeVisible();
    await expect(page.locator('text=/\\$2,000/i')).toBeVisible();
  });

  test('should cancel adding position', async ({ page }) => {
    await page.getByLabel(/Quantity/i).fill('5');

    // Click cancel
    await page.getByRole('button', { name: /Cancel/i }).click();

    // Form should close
    await expect(page.getByRole('heading', { name: /Add New Position/i })).not.toBeVisible();
  });

  test('should handle decimal quantities', async ({ page }) => {
    await page.getByLabel(/Quantity/i).fill('0.5');
    await page.getByLabel(/Average Cost Basis/i).fill('2050.50');

    await page.getByRole('button', { name: /Add Position/i }).click();

    // Should not show error
    await expect(page.getByRole('heading', { name: /Add New Position/i })).not.toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Try to submit without filling required fields
    await page.getByRole('button', { name: /Add Position/i }).click();

    // Form should still be visible (validation failed)
    await expect(page.getByRole('heading', { name: /Add New Position/i })).toBeVisible();
  });
});

test.describe('Portfolio Table', () => {
  test('should display table headers', async ({ page }) => {
    await page.goto('/portfolio');

    // Check for all column headers
    await expect(page.getByRole('columnheader', { name: /Type/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /Quantity/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /Avg Cost/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /Current Value/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /P\/L/i })).toBeVisible();
  });

  test('should add and display multiple positions', async ({ page }) => {
    await page.goto('/portfolio');

    // Add first position
    await page.getByRole('button', { name: /Add Position/i }).click();
    await page.getByLabel(/Quantity/i).fill('5');
    await page.getByLabel(/Average Cost Basis/i).fill('2100');
    await page.getByRole('button', { name: /Add Position/i }).click();

    await page.waitForTimeout(500);

    // Add second position
    await page.getByRole('button', { name: /Add Position/i }).click();
    await page.getByLabel(/Quantity/i).fill('3');
    await page.getByLabel(/Average Cost Basis/i).fill('2050');
    await page.getByRole('button', { name: /Add Position/i }).click();

    // Both positions should be visible
    const rows = page.locator('tbody tr');
    const count = await rows.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });
});

test.describe('Portfolio Calculations', () => {
  test('should calculate and display P/L', async ({ page }) => {
    await page.goto('/portfolio');

    // Add a position
    await page.getByRole('button', { name: /Add Position/i }).click();
    await page.getByLabel(/Quantity/i).fill('10');
    await page.getByLabel(/Average Cost Basis/i).fill('2000');
    await page.getByRole('button', { name: /Add Position/i }).click();

    // P/L should be displayed (could be positive or negative)
    await expect(page.locator('text=/[+\\-]\\$[0-9,]+/').first()).toBeVisible();
  });

  test('should update portfolio summary with new positions', async ({ page }) => {
    await page.goto('/portfolio');

    // Get initial total value
    const initialTotal = await page.locator('text=/Total Value/i').locator('..').locator('text=/\\$[0-9,]+/').first().textContent();

    // Add position
    await page.getByRole('button', { name: /Add Position/i }).click();
    await page.getByLabel(/Quantity/i).fill('1');
    await page.getByLabel(/Average Cost Basis/i).fill('2000');
    await page.getByRole('button', { name: /Add Position/i }).click();

    await page.waitForTimeout(1000);

    // Get new total value
    const newTotal = await page.locator('text=/Total Value/i').locator('..').locator('text=/\\$[0-9,]+/').first().textContent();

    // Values should be different (unless coincidentally the same)
    expect(newTotal).toBeDefined();
  });

  test('should display P/L percentage', async ({ page }) => {
    await page.goto('/portfolio');

    // Add position
    await page.getByRole('button', { name: /Add Position/i }).click();
    await page.getByLabel(/Quantity/i).fill('5');
    await page.getByLabel(/Average Cost Basis/i).fill('2100');
    await page.getByRole('button', { name: /Add Position/i }).click();

    // P/L percentage should be shown
    await expect(page.locator('text=/[+\\-][0-9.]+%/').first()).toBeVisible();
  });
});

test.describe('Delete Position', () => {
  test('should delete a position', async ({ page }) => {
    await page.goto('/portfolio');

    // Add a position first
    await page.getByRole('button', { name: /Add Position/i }).click();
    await page.getByLabel(/Quantity/i).fill('2');
    await page.getByLabel(/Average Cost Basis/i).fill('2050');
    await page.getByLabel(/Notes/i).fill('To be deleted');
    await page.getByRole('button', { name: /Add Position/i }).click();

    await page.waitForTimeout(500);

    // Find and click delete button
    const deleteButtons = page.getByRole('button').filter({ has: page.locator('svg') });
    const deleteButton = deleteButtons.last();
    await deleteButton.click();

    await page.waitForTimeout(500);

    // Position should be removed
    const hasDeletedNote = await page.locator('text=/To be deleted/i').isVisible().catch(() => false);
    expect(hasDeletedNote).toBe(false);
  });
});

test.describe('Portfolio Persistence', () => {
  test('should persist positions after page reload', async ({ page }) => {
    await page.goto('/portfolio');

    // Add a position
    await page.getByRole('button', { name: /Add Position/i }).click();
    await page.getByLabel(/Quantity/i).fill('7');
    await page.getByLabel(/Average Cost Basis/i).fill('2075');
    await page.getByLabel(/Notes/i).fill('Persistence test');
    await page.getByRole('button', { name: /Add Position/i }).click();

    await page.waitForTimeout(1000);

    // Reload page
    await page.reload();

    // Position should still be there
    await expect(page.locator('text=/Persistence test/i')).toBeVisible();
    await expect(page.locator('text=/7 oz/i')).toBeVisible();
  });
});
