import { test, expect } from '@playwright/test';

test.describe("Bethany's Pie Shop Homepage", () => {
  test.beforeEach(async ({ page }) => {
    const res = await page.request.get('/api/pies-of-the-month');
    expect(res.status()).toBe(200);
    await page.goto('/');
    await expect(page.locator('[data-testid=pies-section]')).toBeVisible();
    await page.locator('[data-testid=pie-item]').first().scrollIntoViewIfNeeded();
  });

  test('renders the home container', async ({ page }) => {
    await expect(page.locator('[data-testid=home-container]')).toBeVisible();
  });

  test('renders the pies section, and shows pies', async ({ page }) => {
    const items = page.locator('[data-testid=pie-item]');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });

  test('renders the hero carousel with all slides', async ({ page }) => {
    await expect(page.locator('[data-testid=hero-carousel]')).toBeVisible();
    await expect(page.locator('[data-testid=carousel-slide]')).toHaveCount(3);
  });

  test('lists all pies of the month with name and price', async ({ page }) => {
    const items = page.locator('[data-testid=pie-item]');
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      const el = items.nth(i);
      await expect(el.locator('h3')).toBeVisible();
      await expect(el.locator('p', { hasText: '$' })).toContainText('$');
    }
  });

  test('can add a pie of the month to the cart', async ({ page }) => {
    await page.locator('[data-testid=pie-item]').first().locator('button', { hasText: 'Add to Cart' }).click();
    await expect(page.locator('[data-testid=cart-count]')).toHaveCount(1);
  });

  test('Clicking on Show Now on carousal will navigate to /shop page', async ({ page }) => {
    await page.locator('[data-testid=carousal-shop-button]').first().click();
    await expect(page).toHaveURL(/\/shop/);
  });
});
