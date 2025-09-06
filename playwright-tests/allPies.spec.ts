import { test, expect } from '@playwright/test';
import { reviewCart } from './test-helpers';

test.describe('All Pies Shop Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/pies', route => route.continue());
    await page.goto('/shop');
    const res = await page.request.get('/api/pies');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.length).toBeGreaterThan(0);
  });

  test('renders the All Pies section', async ({ page }) => {
    await expect(page.locator('h1', { hasText: 'All Pies' })).toBeVisible();
  });

  test('renders all All Pies with name and price', async ({ page }) => {
    const items = page.locator('[data-testid=pie-item]');
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      const el = items.nth(i);
      await expect(el.locator('h3')).toBeVisible();
      await expect(el.locator('p', { hasText: '$' })).toContainText('$');
    }
  });

  test('should add all pies to cart and validate cart count', async ({ page }) => {
    const items = page.locator('[data-testid=pie-item]');
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      await items.nth(i).locator('button', { hasText: 'Add to Cart' }).click();
    }
    await expect(page.locator('[data-testid=cart-count]')).toHaveText(String(count));
    await reviewCart(page, count);
  });
});
