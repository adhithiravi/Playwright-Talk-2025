import { test, expect } from "@playwright/test";
import { reviewCart } from "./test-helpers";

test.describe("Fruit Pies Shop Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/shop/fruit");
    await page.waitForLoadState("networkidle");
    const res = await page.request.get("/api/pies?category=fruit");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.length).toBeGreaterThan(0);
  });

  test("renders the fruit pies section", async ({ page }) => {
    await expect(page.locator("h1", { hasText: "Fruit Pies" })).toBeVisible();
  });

  test("renders all fruit pies with name and price", async ({ page }) => {
    const items = page.locator("[data-testid=pie-item]");
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const el = items.nth(i);
      await expect(el.locator("h3")).toBeVisible();
      await expect(el.locator("p", { hasText: "$" })).toContainText("$");
    }
  });

  test("should add all fruit pies to cart and validate cart count", async ({
    page,
  }) => {
    const items = page.locator("[data-testid=pie-item]");
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      await items.nth(i).locator("button", { hasText: "Add to Cart" }).click();
      // Wait for cart to update
      await page.waitForTimeout(100);
    }
    await expect(page.locator("[data-testid=cart-count]")).toHaveText(
      String(count)
    );
    await reviewCart(page, count);
  });
});
