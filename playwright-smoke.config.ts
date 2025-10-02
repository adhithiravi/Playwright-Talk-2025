import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./playwright-tests",
  timeout: 30 * 1000,
  expect: { timeout: 10000 },
  fullyParallel: true,
  retries: 1, // Fewer retries for smoke tests
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
    trace: "on-first-retry",
    actionTimeout: 10000,
    navigationTimeout: 30000,
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
