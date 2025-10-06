import { Page, expect } from "@playwright/test";

export async function reviewCart(page: Page, expectedCount: number) {
  // Click cart link with better locator
  await page.getByRole("link", { name: "Cart" }).click();
  await expect(page).toHaveURL(/\/cart/);

  // Wait for cart to load completely
  await page.waitForLoadState("networkidle");

  // Wait for cart items to be visible
  const items = page.locator("[data-testid=cart-items]");
  await expect(items).toHaveCount(expectedCount);

  // Verify each cart item has required elements
  for (let i = 0; i < expectedCount; i++) {
    const item = items.nth(i);
    await expect(item.locator("h3")).toBeVisible();
    await expect(item.locator("p", { hasText: "$" })).toContainText("$");
  }
}

export async function waitForCartCount(page: Page, expectedCount: number) {
  if (expectedCount > 0) {
    // Wait for cart count to appear and have correct value
    await expect(page.locator("[data-testid=cart-count]")).toBeVisible();
    await expect(page.locator("[data-testid=cart-count]")).toHaveText(
      String(expectedCount)
    );
  } else {
    // When count is 0, cart count should not be visible
    await expect(page.locator("[data-testid=cart-count]")).not.toBeVisible();
  }
}

export async function addItemToCart(page: Page, itemLocator: any) {
  // Click the add to cart button
  await itemLocator.getByRole("button", { name: "Add to Cart" }).click();

  // Wait for cart count to appear (indicates successful addition)
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
    await addItemToCart(page, items.nth(i));
  }

  // Verify final cart count
  await waitForCartCount(page, expectedCount);
}

export async function clearCartState(page: Page) {
  // Clear cart by setting localStorage and refreshing
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.setItem("cart", JSON.stringify([]));
  });
  await page.reload();

  // Wait for page to be ready
  await page.waitForLoadState("domcontentloaded");

  // Verify cart is empty
  await expect(page.locator("[data-testid=cart-count]")).not.toBeVisible();
}

export async function waitForPageLoad(page: Page, expectedTitle: string) {
  // Wait for network to be idle
  await page.waitForLoadState("networkidle");

  // Wait for the expected title to be visible
  await expect(
    page.getByRole("heading", { name: expectedTitle })
  ).toBeVisible();

  // Wait for pie items to be loaded
  await expect(page.locator("[data-testid=pie-item]").first()).toBeVisible();
}
