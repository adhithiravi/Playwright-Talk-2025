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
    await page.getByRole("button", { name: "Shop" }).click();
    await page.getByRole("link", { name: "All Pies" }).click();
    await expect(page).toHaveURL(/\/shop/);
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "All Pies" })).toBeVisible();
  });

  test("should navigate to Fruit Pies page, and load fruit pies", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Shop" }).click();
    await page.getByRole("link", { name: "Fruit Pies" }).click();
    await expect(page).toHaveURL(/\/shop\/fruit/);
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("heading", { name: "Fruit Pies" })
    ).toBeVisible();
  });

  test("should navigate to Seasonal Pies page, and load seasonal pies", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Shop" }).click();
    await page.getByRole("link", { name: "Seasonal Pies" }).click();
    await expect(page).toHaveURL(/\/shop\/seasonal/);
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("heading", { name: "Seasonal Pies" })
    ).toBeVisible();
  });

  test("should navigate to Cheesecakes page, and load Cheesecakes", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Shop" }).click();
    await page.getByRole("link", { name: "Cheesecakes" }).click();
    await expect(page).toHaveURL(/\/shop\/cheesecake/);
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
