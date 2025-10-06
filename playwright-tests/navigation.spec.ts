import { test, expect } from "@playwright/test";
import { stubAllAPIs } from "./api-stubs";

test.describe("Navigate to Shop Pages", () => {
  test.beforeEach(async ({ page }) => {
    // Stub all APIs for consistent navigation testing
    await stubAllAPIs(page);
    await page.goto("/");
  });

  test("should navigate to All Pies page, and load pies @smoke", async ({
    page,
  }) => {
    // Hover over shop button to show dropdown
    await page.getByRole("button", { name: "Shop" }).hover();
    await page.getByRole("link", { name: "All Pies" }).click();
    await page.waitForURL(/\/shop/);
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "All Pies" })).toBeVisible();
  });

  test("should navigate to Fruit Pies page, and load fruit pies", async ({
    page,
  }) => {
    // Hover over shop button to show dropdown
    await page.getByRole("button", { name: "Shop" }).hover();
    await page.getByRole("link", { name: "Fruit Pies" }).click();
    await page.waitForURL(/\/shop\/fruit/);
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("heading", { name: "Fruit Pies" })
    ).toBeVisible();
  });

  test("should navigate to Seasonal Pies page, and load seasonal pies", async ({
    page,
  }) => {
    // Hover over shop button to show dropdown
    await page.getByRole("button", { name: "Shop" }).hover();
    await page.getByRole("link", { name: "Seasonal Pies" }).click();
    await page.waitForURL(/\/shop\/seasonal/);
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("heading", { name: "Seasonal Pies" })
    ).toBeVisible();
  });

  test("should navigate to Cheesecakes page, and load Cheesecakes", async ({
    page,
  }) => {
    // Hover over shop button to show dropdown
    await page.getByRole("button", { name: "Shop" }).hover();
    await page.getByRole("link", { name: "Cheesecakes" }).click();
    await page.waitForURL(/\/shop\/cheesecake/);
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("heading", { name: "Cheesecakes" })
    ).toBeVisible();
  });
});

test.describe("Navigate to Other Pages", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should navigate to contact page @smoke", async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveURL(/\/contact/);
    await page.waitForLoadState("networkidle");
  });

  test("should navigate to register page", async ({ page }) => {
    await page.goto("/register");
    await expect(page).toHaveURL(/\/register/);
    await page.waitForLoadState("networkidle");
  });

  test("should navigate to cart page", async ({ page }) => {
    await page.goto("/cart");
    await expect(page).toHaveURL(/\/cart/);
    await page.waitForLoadState("networkidle");
  });
});
