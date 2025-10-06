import { test, expect } from "@playwright/test";
import {
  reviewCart,
  waitForCartCount,
  addItemToCartAndWait,
  clearCartState,
  waitForPageLoad,
} from "./test-helpers";
import { stubPiesAPI, getExpectedCounts } from "./api-mocks";

test.describe("Fruit Pies Shop Page", () => {
  test.beforeEach(async ({ page }) => {
    // Clear cart state
    await clearCartState(page);

    // Stub the API with fruit data
    await stubPiesAPI(page, "fruit");

    // Navigate to the fruit page
    await page.goto("/shop/fruit");

    // Wait for page to load with expected content
    await waitForPageLoad(page, "Fruit Pies");
  });

  test("renders the fruit pies section", async ({ page }) => {
    await expect(page.locator("h1", { hasText: "Fruit Pies" })).toBeVisible();
  });

  test("renders all fruit pies with name and price", async ({ page }) => {
    const items = page.locator("[data-testid=pie-item]");
    const count = await items.count();
    const expectedCount = getExpectedCounts().fruit;

    // Verify we have the expected number of items
    expect(count).toBe(expectedCount);

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
    const expectedCount = getExpectedCounts().fruit;

    // Verify we have the expected number of items
    expect(count).toBe(expectedCount);

    // Add all items to cart with proper waiting
    for (let i = 0; i < count; i++) {
      await addItemToCartAndWait(page, items.nth(i));
    }

    // Verify cart count shows the total number of items added
    await waitForCartCount(page, count);

    await reviewCart(page, count);
  });
});
