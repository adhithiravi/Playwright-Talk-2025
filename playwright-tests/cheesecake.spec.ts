import { test, expect } from "@playwright/test";
import {
  reviewCart,
  addAllItemsToCart,
  clearCartState,
  waitForPageLoad,
} from "./test-helpers";
import { stubPiesAPI, getExpectedCounts } from "./api-stubs";

test.describe("Cheesecake Shop Page", () => {
  test.beforeEach(async ({ page }) => {
    // Clear cart state
    await clearCartState(page);

    // Stub the API with cheesecake data
    await stubPiesAPI(page, "cheesecake");

    // Navigate to the cheesecake page
    await page.goto("/shop/cheesecake");

    // Wait for page to load with expected content
    await waitForPageLoad(page, "Cheesecakes");
  });

  test("renders the Cheesecake section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Cheesecakes" })
    ).toBeVisible();
  });

  test("renders all Cheesecake with name and price", async ({ page }) => {
    const items = page.locator("[data-testid=pie-item]");
    const count = await items.count();
    const expectedCount = getExpectedCounts().cheesecake;

    // Verify we have the expected number of items
    expect(count).toBe(expectedCount);

    for (let i = 0; i < count; i++) {
      const el = items.nth(i);
      await expect(el.locator("h3")).toBeVisible();
      await expect(el.locator("p", { hasText: "$" })).toContainText("$");
    }
  });

  test("should add all cheesecakes to cart and validate cart count", async ({
    page,
  }) => {
    const expectedCount = getExpectedCounts().cheesecake;

    // Add all items to cart with proper waiting
    await addAllItemsToCart(page, expectedCount);

    // Verify cart functionality
    await reviewCart(page, expectedCount);
  });
});
