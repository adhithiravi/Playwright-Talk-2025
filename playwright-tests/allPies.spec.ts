import { test, expect } from "@playwright/test";
import {
  reviewCart,
  addAllItemsToCart,
  clearCartState,
  waitForPageLoad,
} from "./test-helpers";
import { stubPiesAPI, getExpectedCounts } from "./api-mocks";

test.describe("All Pies Shop Page", () => {
  test.beforeEach(async ({ page }) => {
    // Clear cart state
    await clearCartState(page);

    // Stub the API with consistent data
    await stubPiesAPI(page);

    // Navigate to the shop page
    await page.goto("/shop");

    // Wait for page to load with expected content
    await waitForPageLoad(page, "All Pies");
  });

  test("renders the All Pies section", async ({ page }) => {
    await expect(page.locator("h1", { hasText: "All Pies" })).toBeVisible();
  });

  test("renders all All Pies with name and price", async ({ page }) => {
    const items = page.locator("[data-testid=pie-item]");
    const count = await items.count();
    const expectedCount = getExpectedCounts().all;

    // Verify we have the expected number of items
    expect(count).toBe(expectedCount);

    for (let i = 0; i < count; i++) {
      const el = items.nth(i);
      await expect(el.locator("h3")).toBeVisible();
      await expect(el.locator("p", { hasText: "$" })).toContainText("$");
    }
  });

  test("should add all pies to cart and validate cart count", async ({
    page,
  }) => {
    const items = page.locator("[data-testid=pie-item]");
    const count = await items.count();
    const expectedCount = getExpectedCounts().all;

    // Verify we have the expected number of items
    expect(count).toBe(expectedCount);

    // Add all items to cart
    await addAllItemsToCart(page, expectedCount);

    await reviewCart(page, expectedCount);
  });
});
