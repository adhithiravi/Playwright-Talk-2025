# From Zero to CI Getting Playwright Into Your Pipeline Talk

## Instructor: Adhithi Ravichandran

## 📚 Talk Overview

End-to-end testing is only useful if it runs consistently where it matters: inside your CI/CD pipeline. Playwright makes writing tests simple, but many teams stall when it comes to running them reliably within their CI/CD pipeline. Tests run fine locally, but in CI they suddenly hang, fail intermittently, or add minutes of runtime.

In this session, we will take Playwright from your laptop to a fully automated pipeline. You will learn how to configure Playwright to run consistently in your CI environments like GitHub Actions, set up parallel jobs to keep test runs fast, and set up retries and timeouts to minimize flakes. We will also cover best practices for caching dependencies, generating trace/video artifacts for debugging, and integrating test results into your build reports.

By the end of this session, you will have a practical playbook for running Playwright tests smoothly in any modern CI/CD setup.

## 🚀 Getting Started

### Prerequisites

* **Node.js v22 or newer** installed on your system

### Installation Steps


1. **Install dependencies**

```bash
npm install
```

2. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 🧪 Running Playwright Tests

To open the Playwright test runner:

```bash
npm run test:ui-run
```

This command launches the Playwright UI for running your tests interactively.

---

## 📦 Scripts

From `package.json`, available scripts include:

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Runs the Next.js development server  |
| `npm run build`   | Builds the Next.js application       |
| `npm start`       | Starts the Next.js production server |
| `npm run lint`    | Runs ESLint on the project           |
| `npm run test:run`  | Run Playwright tests in headless mode|
| `npm run test:ui-run`| Run Playwright tests in browser mode|


---

## 🔧 Technologies Used

* **Next.js v15**
* **React v19**
* **Tailwind CSS**
* **TypeScript**
* **Playwright v1.40.0**

---

## 👩‍💻 About the Instructor

Adhithi Ravichandran is a Software Consultant, Author, and Speaker.
🌐 [adhithiravichandran.com](https://www.adhithiravichandran.com) | [LinkedIn](https://www.linkedin.com/in/adhithi/)

---
