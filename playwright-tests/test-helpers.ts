import { Page, expect } from "@playwright/test";

export async function reviewCart(page: Page, expectedCount: number) {
  await page.locator("a", { hasText: "Cart" }).click();
  await expect(page).toHaveURL(/\/cart/);

  // Wait for cart to load
  await page.waitForLoadState("networkidle");

  const items = page.locator("[data-testid=cart-items]");
  await expect(items).toHaveCount(expectedCount);

  for (let i = 0; i < expectedCount; i++) {
    const item = items.nth(i);
    await expect(item.locator("h3")).toBeVisible();
    await expect(item.locator("p", { hasText: "$" })).toContainText("$");
  }
}
