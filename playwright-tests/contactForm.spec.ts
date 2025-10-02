import { test, expect } from "@playwright/test";

test.describe("Test Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("Should submit the contact form successfully @smoke", async ({
    page,
  }) => {
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
    // Test that the form doesn't submit and shows HTML5 validation
    await expect(page.locator('input[name="name"]')).toHaveAttribute(
      "required"
    );
    await expect(page.locator('input[name="email"]')).toHaveAttribute(
      "required"
    );
    await expect(page.locator('textarea[name="message"]')).toHaveAttribute(
      "required"
    );
    // Verify the form is still on the contact page (not submitted)
    await expect(page).toHaveURL(/\/contact/);
  });

  test("should show validation errors for empty email field", async ({
    page,
  }) => {
    await page.fill('input[name="name"]', "John Doe");
    await page.click('button[type="submit"]');
    // Test that the email field is required and form doesn't submit
    await expect(page.locator('input[name="email"]')).toHaveAttribute(
      "required"
    );
    await expect(page).toHaveURL(/\/contact/);
  });

  test("should show validation errors for empty message field", async ({
    page,
  }) => {
    await page.fill('input[name="name"]', "John Doe");
    await page.fill('input[name="email"]', "abc@outlook.com");
    await page.click('button[type="submit"]');
    // Test that the message field is required and form doesn't submit
    await expect(page.locator('textarea[name="message"]')).toHaveAttribute(
      "required"
    );
    await expect(page).toHaveURL(/\/contact/);
  });

  test("should show validation error for wrong email address", async ({
    page,
  }) => {
    await page.fill('input[name="name"]', "John Doe");
    await page.fill('input[name="email"]', "abc");
    await page.fill('textarea[name="message"]', "This is a test message.");
    await page.click('button[type="submit"]');
    // Test that the email field has type="email" validation and form doesn't submit
    await expect(page.locator('input[name="email"]')).toHaveAttribute(
      "type",
      "email"
    );
    await expect(page).toHaveURL(/\/contact/);
  });
});
