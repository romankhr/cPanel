
cPanel Automation Test 
Framework

Project Description

The cPanel Automation Framework is designed to automate end-to-end tests for the cPanel web application. 
It leverages Playwright and Cucumber for efficient test execution, reporting, and BDD-style test structuring.

Features

Cross-browser testing: Supports multiple browsers such as Chromium, Firefox, and WebKit.

Behavior-driven development (BDD): Uses Cucumber with Gherkin syntax for writing human-readable tests.

Automated reports: Generates detailed HTML reports for test results.

Easy configuration: Customizable via configuration files.

Reusable components: Modularized page object models and helper methods.

Installation

To get started with the project, follow these steps:

Clone the repository:
git clone <repository-url>

Install dependencies:
npm install

Ensure Playwright is installed:
npx playwright install

Running Tests

Run all tests:
npx cucumber-js

Run tests with specific tags:
npx cucumber-js tests/features --tags "@ui"

Run test and generate report:
npm run test-and-report

Generate report
npm run generate-report

Open Report
open cucumber_report.html in a folder