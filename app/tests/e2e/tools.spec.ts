import { test, expect } from '@playwright/test';

test.describe('Tools Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools');
  });

  test('should load tools page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Spot Gold Trading/i);
    await expect(page.getByRole('heading', { name: /Trading Tools/i })).toBeVisible();
  });

  test('should display all three calculator sections', async ({ page }) => {
    // Check for all three calculator headings
    await expect(page.getByRole('heading', { name: /ATR/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Position Size/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Pivot/i })).toBeVisible();
  });
});

test.describe('ATR Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools');
  });

  test('should calculate ATR correctly', async ({ page }) => {
    // Input test values
    await page.getByPlaceholder(/High/i).first().fill('2100');
    await page.getByPlaceholder(/Low/i).first().fill('2080');
    await page.getByPlaceholder(/Close/i).first().fill('2090');

    // Click calculate button
    await page.getByRole('button', { name: /Calculate ATR/i }).click();

    // Verify result is displayed
    const result = page.locator('text=/ATR:.*\\$/i').first();
    await expect(result).toBeVisible();

    // Verify the result contains a numeric value
    const resultText = await result.textContent();
    expect(resultText).toMatch(/\$\d+(\.\d+)?/);
  });

  test('should handle decimal inputs', async ({ page }) => {
    await page.getByPlaceholder(/High/i).first().fill('2050.50');
    await page.getByPlaceholder(/Low/i).first().fill('2030.25');
    await page.getByPlaceholder(/Close/i).first().fill('2045.75');

    await page.getByRole('button', { name: /Calculate ATR/i }).click();

    const result = page.locator('text=/ATR:.*\\$/i').first();
    await expect(result).toBeVisible();
  });

  test('should show validation for empty fields', async ({ page }) => {
    // Click calculate without filling fields
    await page.getByRole('button', { name: /Calculate ATR/i }).click();

    // Result should not show or show error
    const result = page.locator('text=/ATR:.*\\$/i').first();
    const isVisible = await result.isVisible().catch(() => false);
    expect(isVisible).toBe(false);
  });
});

test.describe('Position Size Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools');
  });

  test('should calculate position size with risk management', async ({ page }) => {
    // Find position size calculator inputs
    const accountSize = page.getByPlaceholder(/Account Size/i);
    const riskPercent = page.getByPlaceholder(/Risk %/i);
    const stopLoss = page.getByPlaceholder(/Stop Loss/i);

    // Input test values
    await accountSize.fill('10000');
    await riskPercent.fill('2');
    await stopLoss.fill('10');

    // Click calculate
    await page.getByRole('button', { name: /Calculate.*Position/i }).click();

    // Verify results are displayed
    const results = page.locator('text=/Position Size:|Ounces:|Risk Amount:/i');
    await expect(results.first()).toBeVisible();
  });

  test('should update calculation when inputs change', async ({ page }) => {
    const accountSize = page.getByPlaceholder(/Account Size/i);
    const riskPercent = page.getByPlaceholder(/Risk %/i);
    const stopLoss = page.getByPlaceholder(/Stop Loss/i);

    // First calculation
    await accountSize.fill('10000');
    await riskPercent.fill('1');
    await stopLoss.fill('20');
    await page.getByRole('button', { name: /Calculate.*Position/i }).click();

    // Get first result
    const result1 = await page.locator('text=/\\$[0-9,]+/').first().textContent();

    // Change inputs
    await riskPercent.fill('2');
    await page.getByRole('button', { name: /Calculate.*Position/i }).click();

    // Get second result
    const result2 = await page.locator('text=/\\$[0-9,]+/').first().textContent();

    // Results should be different
    expect(result1).not.toBe(result2);
  });

  test('should handle large account sizes', async ({ page }) => {
    const accountSize = page.getByPlaceholder(/Account Size/i);
    const riskPercent = page.getByPlaceholder(/Risk %/i);
    const stopLoss = page.getByPlaceholder(/Stop Loss/i);

    await accountSize.fill('1000000');
    await riskPercent.fill('1');
    await stopLoss.fill('50');

    await page.getByRole('button', { name: /Calculate.*Position/i }).click();

    const results = page.locator('text=/Position Size:|Ounces:|Risk Amount:/i');
    await expect(results.first()).toBeVisible();
  });
});

test.describe('Pivot Point Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools');
  });

  test('should calculate pivot points correctly', async ({ page }) => {
    // Scroll to pivot calculator
    await page.locator('text=/Pivot.*Point/i').scrollIntoViewIfNeeded();

    // Find pivot calculator inputs (they'll be the last set on the page)
    const inputs = page.getByPlaceholder(/High|Low|Close/i);
    const high = inputs.nth(3); // Last set of inputs
    const low = inputs.nth(4);
    const close = inputs.nth(5);

    await high.fill('2100');
    await low.fill('2080');
    await close.fill('2090');

    // Click calculate button
    await page.getByRole('button', { name: /Calculate.*Pivot/i }).click();

    // Verify pivot point results
    await expect(page.locator('text=/Pivot Point:|R1:|R2:|R3:|S1:|S2:|S3:/i').first()).toBeVisible();
  });

  test('should display all support and resistance levels', async ({ page }) => {
    await page.locator('text=/Pivot.*Point/i').scrollIntoViewIfNeeded();

    const inputs = page.getByPlaceholder(/High|Low|Close/i);
    await inputs.nth(3).fill('2150');
    await inputs.nth(4).fill('2100');
    await inputs.nth(5).fill('2125');

    await page.getByRole('button', { name: /Calculate.*Pivot/i }).click();

    // Check for all levels (PP, R1, R2, R3, S1, S2, S3)
    const levels = ['Pivot Point', 'R1', 'R2', 'R3', 'S1', 'S2', 'S3'];

    for (const level of levels) {
      const levelElement = page.locator(`text=/${level}:/i`);
      await expect(levelElement).toBeVisible();
    }
  });

  test('should calculate different levels for different inputs', async ({ page }) => {
    await page.locator('text=/Pivot.*Point/i').scrollIntoViewIfNeeded();

    const inputs = page.getByPlaceholder(/High|Low|Close/i);

    // First calculation
    await inputs.nth(3).fill('2100');
    await inputs.nth(4).fill('2050');
    await inputs.nth(5).fill('2075');
    await page.getByRole('button', { name: /Calculate.*Pivot/i }).click();

    // Wait for result
    await expect(page.locator('text=/Pivot Point:/i').first()).toBeVisible();

    const result1 = await page.locator('text=/\\$2,0[0-9]{2}/').first().textContent();

    // Second calculation with different values
    await inputs.nth(3).fill('2200');
    await inputs.nth(4).fill('2150');
    await inputs.nth(5).fill('2175');
    await page.getByRole('button', { name: /Calculate.*Pivot/i }).click();

    await page.waitForTimeout(500); // Brief wait for calculation

    const result2 = await page.locator('text=/\\$2,[0-9]{3}/').first().textContent();

    // Results should be different
    expect(result1).not.toBe(result2);
  });
});

test.describe('Tools Page Integration', () => {
  test('should maintain calculator states independently', async ({ page }) => {
    await page.goto('/tools');

    // Calculate ATR
    await page.getByPlaceholder(/High/i).first().fill('2100');
    await page.getByPlaceholder(/Low/i).first().fill('2080');
    await page.getByPlaceholder(/Close/i).first().fill('2090');
    await page.getByRole('button', { name: /Calculate ATR/i }).click();

    // Calculate Position Size
    await page.getByPlaceholder(/Account Size/i).fill('10000');
    await page.getByPlaceholder(/Risk %/i).fill('2');
    await page.getByPlaceholder(/Stop Loss/i).fill('10');
    await page.getByRole('button', { name: /Calculate.*Position/i }).click();

    // Both results should be visible
    await expect(page.locator('text=/ATR:.*\\$/i').first()).toBeVisible();
    await expect(page.locator('text=/Position Size:|Risk Amount:/i').first()).toBeVisible();
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/tools');

    // All calculators should be accessible on mobile
    await expect(page.getByRole('heading', { name: /ATR/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Position Size/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Pivot/i })).toBeVisible();
  });
});
