# Sauce Demo Playwright Automation Suite

A professional-grade end-to-end (E2E) automation framework built with **Playwright**, **JavaScript**, and **GitHub Actions**. This project demonstrates a scalable **Page Object Model (POM)** architecture designed for stability, observability, and cloud-native execution.

## Key Features
*   **Page Object Model (POM):** Decoupled test logic from selectors across Login, Inventory, and Cart modules for high maintainability.
*   **CI/CD Integration:** Fully automated testing pipeline via **GitHub Actions**, triggering on every push and pull request.
*   **High Observability:** Configured with Playwright Trace Viewer and HTML Reporters for deep-dive failure analysis.
*   **Professional Git Workflow:** Managed via **GitKraken** with clean commit history and branch management.

## Tech Stack
*   **Framework:** Playwright (JavaScript)
*   **Environment:** Node.js v18+
*   **Version Control:** Git / GitHub / GitKraken
*   **CI/CD:** GitHub Actions
*   **SUT (System Under Test):** [Sauce Demo](https://saucedemo.com)

## Project Structure
```text
├── .github/workflows/    # CI/CD Pipeline (GitHub Actions)
├── pages/                # Page Object Model classes
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   └── CartPage.js
├── tests/                # E2E Test Suites
│   └── saucedemo.spec.js
├── playwright.config.js  # Framework Configuration
└── package.json          # Dependencies & Scripts
```

## Getting Started
**1. Clone the repository:**
* powershell > git clone https://github.com

**2. Install dependencies:**
* powershell > npm install

**3. Install Playwright Browsers:**
* powershell > npx playwright install

## Running Tests
**4. Run all tests (Headless):**
* powershell > npx playwright test

**5. Open Playwright UI Mode (Interactive Debugging):**
* powershell > npx playwright test --ui

**6. View HTML Report:**
* powershell > npx playwright show-report

## Engineering Highlights (Troubleshooting)
During development, I successfully navigated several architectural hurdles, including:
* **Environment Migration:** Resolved node_modules sync conflicts and file-locking issues caused by cloud-sync directories (OneDrive) by migrating to a local developer path.
* **Trace Configuration:** Troubleshot Playwright UI rendering issues to ensure 100% visibility into test actions and "time-travel" snapshots.
* **Syntax & Logic Resolution:** Debugged complex ReferenceErrors and CSS selector timeouts to ensure a robust "Green" pass across multi-page flows.

Developed by Michael A. Goynes II – QA Automation Engineer in Training