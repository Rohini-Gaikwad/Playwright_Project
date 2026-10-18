# 🎭 Playwright Test Automation Framework

A scalable and maintainable **Playwright test automation framework** designed for end-to-end testing of modern web applications. The project follows industry-standard automation practices to provide reliable test coverage, reusable components, and fast feedback during the software development lifecycle.

## 🚀 Key Features

* ✅ End-to-End Web Application Testing
* ✅ Functional & Regression Testing
* ✅ Cross-Browser Testing
* ✅ Page Object Model (POM)
* ✅ Reusable Test Components
* ✅ Data-Driven Testing
* ✅ API Testing Support
* ✅ Screenshot & Video Capture
* ✅ HTML Test Reports
* ✅ Trace Viewer & Debugging
* ✅ Parallel Test Execution
* ✅ CI/CD Integration
* ✅ Environment-Based Configuration

## 🛠️ Tech Stack

| Technology             | Purpose             |
| ---------------------- | ------------------- |
| Playwright             | Web Test Automation |
| TypeScript             | Test Development    |
| Node.js                | Runtime Environment |
| Git & GitHub           | Version Control     |
| GitHub Actions         | CI/CD               |
| Playwright HTML Report | Test Reporting      |

## 📁 Project Structure

```text
playwright-project/
│
├── tests/
│   ├── login.spec.ts
│   ├── dashboard.spec.ts
│   └── checkout.spec.ts
│
├── pages/
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   └── CheckoutPage.ts
│
├── fixtures/
│   └── testFixtures.ts
│
├── test-data/
│   └── testData.json
│
├── utils/
│   └── testUtils.ts
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/Rohini-Gaikwad/Playwright_Project.git
```

Navigate to the project:

```bash
cd playwright-project
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## ▶️ Running Tests

Run all tests:

Viewing the trace
npx playwright show-trace --file path

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```
Run test cases based upon tags
npx playwright test e2e/Tags.spec.js --project chromium --headed --grep "@regression"

Run a specific test:

```bash
npx playwright test tests/login.spec.ts
```

Run tests using a specific browser:

```bash
npx playwright test --project=chromium
```

## 🌐 Cross-Browser Testing

The framework can execute tests across multiple browsers:

* Chromium
* Firefox
* WebKit

Example:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## 📊 Test Reports

After execution, generate and view the Playwright HTML report:

```bash
npx playwright show-report
```

The report provides:

* Test execution status
* Failed test details
* Execution duration
* Screenshots
* Videos
* Traces
* Error messages

## 🧩 Page Object Model

The framework uses the **Page Object Model (POM)** to keep test logic maintainable and reusable.

Example:

```typescript
export class LoginPage {
    constructor(private page: Page) {}

    username = this.page.getByLabel('Username');
    password = this.page.getByLabel('Password');
    loginButton = this.page.getByRole('button', { name: 'Login' });

    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}
```

This approach separates page-specific actions from test scenarios and makes the framework easier to maintain as the application evolves.

## 🔌 API Testing

Playwright can also be used to validate REST APIs.

Example:

```typescript
const response = await request.get('/api/users');

expect(response.status()).toBe(200);

const data = await response.json();

expect(data).toHaveProperty('users');
```

API tests can be used for:

* GET requests
* POST requests
* PUT requests
* DELETE requests
* Status code validation
* Response validation
* Authentication testing
* JSON validation

## 🔄 CI/CD Integration

The project can be integrated into CI/CD pipelines to automatically execute tests whenever code changes are pushed.

Example workflow:

```text
Developer Push
      ↓
CI/CD Pipeline
      ↓
Install Dependencies
      ↓
Run Playwright Tests
      ↓
Generate Report
      ↓
Publish Results
```

This helps provide fast feedback and identify regressions before changes reach production.

## 🎯 Testing Coverage

The framework supports:

* Functional Testing
* Regression Testing
* Smoke Testing
* Sanity Testing
* End-to-End Testing
* Cross-Browser Testing
* API Testing
* Integration Testing

## 📈 Quality Goals

The main goals of this project are to:

* Improve test coverage
* Reduce repetitive manual testing
* Detect defects earlier
* Increase regression testing efficiency
* Provide reliable test results
* Support continuous integration
* Improve overall software quality

## 👨‍💻 Author

**Rohini Gaikwad**

QA Analyst | Automation Tester | API Tester

**Skills:** Playwright · Selenium · API Testing · Manual Testing · Accessibility Testing · CI/CD

## 📄 License

This project is created for learning, demonstration, and portfolio purposes.
