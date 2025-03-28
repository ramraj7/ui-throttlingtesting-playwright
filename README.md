# UI Throttling Testing with Playwright

This repository contains a project for testing UI performance under throttled network conditions using [Playwright](https://playwright.dev/). The goal is to simulate various network conditions and evaluate the responsiveness and behavior of the UI.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A code editor like [Visual Studio Code](https://code.visualstudio.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ui-throttlingtesting-playwright.git
   cd ui-throttlingtesting-playwright

2. Install dependencies:

```bash
npm install
```

3. Usage
Running Tests
To execute the Playwright tests, use the following command:

```bash
npx playwright test --headed <scriptname>.spec.ts

htmlchartcomparisonreport: node utilities/linechart-testresult.js
```

4. Running Tests with Network Throttling
You can simulate different network conditions (e.g., slow 3G, fast 3G) by configuring the network settings in the test files. Update the throttling configuration in the relevant test scripts.

5. Generating Test Reports
Playwright generates test reports by default. To view the HTML report:

npx playwright show-report

6. Project Structure

```bash
ui-throttlingtesting-playwright/
├── tests/                # Test files
├── playwright.config.js  # Playwright configuration
├── [package.json](http://_vscodecontentref_/1)          # Project metadata and dependencies
├── [README.md](http://_vscodecontentref_/2)             # Project documentation
└── ...                   # Other files and folders
```

7. Key Files
playwright.config.js: Configuration file for Playwright, including browser settings and test options.
tests/: Contains all the test scripts for UI throttling scenarios.

License
This project is licensed under the MIT License.

Happy testing!