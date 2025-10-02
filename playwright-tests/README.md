# Playwright Test Suites

This directory contains Playwright tests organized into different test suites for different CI scenarios.

## Test Suites

### Smoke Tests (`@smoke`)
Quick, essential tests that verify core functionality. These run on every commit and PR.

**Run smoke tests locally:**
```bash
npx playwright test --config=playwright-smoke.config.ts --grep @smoke
```

**Smoke tests include:**
- Homepage loads correctly
- Basic navigation works
- Contact form submission
- Core cart functionality

### Full Test Suite
Comprehensive tests that run nightly and on main branch merges. Includes all tests across multiple browsers.

**Run full test suite locally:**
```bash
npx playwright test
```

**Full test suite includes:**
- All smoke tests
- All shop page tests (fruit, seasonal, cheesecake, all pies)
- All form validation tests
- Cross-browser testing (Chrome, Firefox, Safari)

## GitHub Actions Workflows

### Smoke Tests Workflow (`.github/workflows/playwright-smoke.yml`)
- **Triggers:** Every push and pull request
- **Timeout:** 30 minutes
- **Browsers:** Chrome only
- **Retries:** 1
- **Purpose:** Quick feedback on core functionality

### Full Test Suite Workflow (`.github/workflows/playwright-full.yml`)
- **Triggers:** 
  - Nightly at 2 AM UTC
  - Push to main/master
  - Manual trigger
- **Timeout:** 60 minutes
- **Browsers:** Chrome, Firefox, Safari
- **Retries:** 2
- **Purpose:** Comprehensive testing and regression detection

## Test Organization

Tests are tagged using the `@smoke` annotation to identify which tests should run in the smoke test suite. Only the most critical tests that verify core functionality are tagged as smoke tests.

## Running Tests Locally

### Development
```bash
# Run all tests
npx playwright test

# Run smoke tests only
npx playwright test --config=playwright-smoke.config.ts --grep @smoke

# Run specific test file
npx playwright test homepage.spec.ts

# Run with UI mode
npx playwright test --ui
```

### Debugging
```bash
# Run in headed mode
npx playwright test --headed

# Run with debug mode
npx playwright test --debug

# Run specific test with trace
npx playwright test --trace on homepage.spec.ts
```

## Reports

Test reports are automatically generated and uploaded as GitHub Actions artifacts:
- **Smoke tests:** 7-day retention
- **Full tests:** 30-day retention
- **Traces:** 30-day retention (full tests only)

Reports can be viewed by downloading the artifacts from the GitHub Actions run page.
