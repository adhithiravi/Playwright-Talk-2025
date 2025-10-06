import { test, expect } from "@playwright/test";
import {
  waitForCartCount,
  clearCartState,
  addItemToCart,
} from "./test-helpers";
import { stubPiesOfTheMonthAPI, getExpectedCounts } from "./api-stubs";

test.describe("Bethany's Pie Shop Homepage", () => {
  test.beforeEach(async ({ page }) => {
    // Clear cart state
    await clearCartState(page);

    // Stub the API with consistent data
    await stubPiesOfTheMonthAPI(page);

    // Navigate to homepage
    await page.goto("/");

    // Wait for page to load with expected content
    await page.waitForLoadState("networkidle");
    await expect(page.locator("[data-testid=pies-section]")).toBeVisible();
    await page
      .locator("[data-testid=pie-item]")
      .first()
      .scrollIntoViewIfNeeded();
  });

  test("renders the home container @smoke", async ({ page }) => {
    await expect(page.locator("[data-testid=home-container]")).toBeVisible();
  });

  test("renders the pies section, and shows pies", async ({ page }) => {
    const items = page.locator("[data-testid=pie-item]");
    const count = await items.count();
    const expectedCount = getExpectedCounts().monthly;

    // Verify we have the expected number of items
    expect(count).toBe(expectedCount);
  });

  test("renders the hero carousel with all slides", async ({ page }) => {
    await expect(page.locator("[data-testid=hero-carousel]")).toBeVisible();
    await expect(page.locator("[data-testid=carousel-slide]")).toHaveCount(3);
  });

  test("lists all pies of the month with name and price", async ({ page }) => {
    const items = page.locator("[data-testid=pie-item]");
    const count = await items.count();
    const expectedCount = getExpectedCounts().monthly;

    // Verify we have the expected number of items
    expect(count).toBe(expectedCount);

    for (let i = 0; i < count; i++) {
      const el = items.nth(i);
      await expect(el.locator("h3")).toBeVisible();
      await expect(el.locator("p", { hasText: "$" })).toContainText("$");
    }
  });

  test("can add a pie of the month to the cart @smoke", async ({ page }) => {
    const firstItem = page.locator("[data-testid=pie-item]").first();
    await addItemToCart(page, firstItem);
    await waitForCartCount(page, 1);
  });
});
