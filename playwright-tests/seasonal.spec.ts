import { test, expect } from "@playwright/test";
import {
  reviewCart,
  addAllItemsToCart,
  clearCartState,
  waitForPageLoad,
} from "./test-helpers";
import { stubPiesAPI, getExpectedCounts } from "./api-stubs";

test.describe("Seasonal Shop Page", () => {
  test.beforeEach(async ({ page }) => {
    // Clear cart state
    await clearCartState(page);

    // Stub the API with seasonal data
    await stubPiesAPI(page, "seasonal");

    // Navigate to the seasonal page
    await page.goto("/shop/seasonal");

    // Wait for page to load with expected content
    await waitForPageLoad(page, "Seasonal");
  });

  test("renders the Seasonal section", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Seasonal" })).toBeVisible();
  });

  test("renders all Seasonal with name and price", async ({ page }) => {
    const items = page.locator("[data-testid=pie-item]");
    const count = await items.count();
    const expectedCount = getExpectedCounts().seasonal;

    // Verify we have the expected number of items
    expect(count).toBe(expectedCount);

    for (let i = 0; i < count; i++) {
      const el = items.nth(i);
      await expect(el.locator("h3")).toBeVisible();
      await expect(el.locator("p", { hasText: "$" })).toContainText("$");
    }
  });

  test("should add all seasonal pies to cart and review cart", async ({
    page,
  }) => {
    const expectedCount = getExpectedCounts().seasonal;

    // Add all items to cart with proper waiting
    await addAllItemsToCart(page, expectedCount);

    // Verify cart functionality
    await reviewCart(page, expectedCount);
  });
});
