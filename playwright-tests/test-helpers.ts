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

export async function waitForCartCount(page: Page, expectedCount: number) {
  // Wait for cart count to be visible and have the expected value
  if (expectedCount > 0) {
    await expect(page.locator("[data-testid=cart-count]")).toBeVisible();
    await expect(page.locator("[data-testid=cart-count]")).toHaveText(
      String(expectedCount)
    );
  } else {
    // When count is 0, the cart count element should not be visible
    await expect(page.locator("[data-testid=cart-count]")).not.toBeVisible();
  }
}

export async function addItemToCartAndWait(page: Page, itemLocator: any) {
  // Click the add to cart button
  await itemLocator.locator("button", { hasText: "Add to Cart" }).click();

  // Wait for the cart count to appear (it only shows when count > 0)
  await page.waitForFunction(
    () => {
      const cartCount = document.querySelector('[data-testid="cart-count"]');
      return cartCount !== null;
    },
    { timeout: 5000 }
  );
}

export async function addAllItemsToCart(page: Page, expectedCount: number) {
  const items = page.locator("[data-testid=pie-item]");

  // Add all items to cart
  for (let i = 0; i < expectedCount; i++) {
    await items.nth(i).locator("button", { hasText: "Add to Cart" }).click();
    // Small delay to allow React state to update
    await page.waitForTimeout(100);
  }

  // Wait for cart count to be visible and have the correct value
  await expect(page.locator("[data-testid=cart-count]")).toBeVisible();
  await expect(page.locator("[data-testid=cart-count]")).toHaveText(
    String(expectedCount)
  );
}

export async function clearCartState(page: Page) {
  // Clear cart by setting localStorage and refreshing the page
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.setItem("cart", JSON.stringify([]));
  });
  await page.reload(); // Force reload to clear any React state

  // Wait for the page to be ready
  await page.waitForLoadState("domcontentloaded");

  // Verify cart is empty by checking that cart count is not visible
  await expect(page.locator("[data-testid=cart-count]")).not.toBeVisible();
}

export async function waitForPageLoad(page: Page, expectedTitle: string) {
  // Wait for the page to load completely
  await page.waitForLoadState("networkidle");

  // Wait for the expected title to be visible
  await expect(page.locator("h1", { hasText: expectedTitle })).toBeVisible();

  // Wait for pie items to be loaded
  await expect(page.locator("[data-testid=pie-item]").first()).toBeVisible();
}
