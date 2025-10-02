import { test, expect } from "@playwright/test";

test.describe("Test Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("Should submit the contact form successfully @smoke", async ({ page }) => {
    await page.fill('input[name="name"]', "John Doe");
    await page.fill('input[name="email"]', "abc@outlook.com");
    await page.fill('textarea[name="message"]', "This is a test message.");
    await page.click('button[type="submit"]');
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("h1")).toContainText(
      "Thank you for contacting us!"
    );
  });

  test("should show validation errors for empty fields", async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.locator('input[name="name"]')).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  test("should show validation errors for empty email field", async ({
    page,
  }) => {
    await page.fill('input[name="name"]', "John Doe");
    await page.click('button[type="submit"]');
    await expect(page.locator('input[name="email"]')).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  test("should show validation errors for empty message field", async ({
    page,
  }) => {
    await page.fill('input[name="name"]', "John Doe");
    await page.fill('input[name="email"]', "abc@outlook.com");
    await page.click('button[type="submit"]');
    await expect(page.locator('textarea[name="message"]')).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  test("should show validation error for wrong email address", async ({
    page,
  }) => {
    await page.fill('input[name="name"]', "John Doe");
    await page.fill('input[name="email"]', "abc");
    await page.fill('textarea[name="message"]', "This is a test message.");
    await page.click('button[type="submit"]');
    await expect(page.locator('input[name="email"]')).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });
});
