const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

test("Basic accessibility test", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/login");

  // Check that username and password fields have labels
  await expect(page.getByLabel("Username")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();

  // Check that the Login button is accessible
  await expect(page.getByRole("button", { name: /login/i })).toBeVisible();

  // Run accessibility scan
  const results = await new AxeBuilder({ page }).analyze();

  console.log("Accessibility violations:", results.violations.length);
  for (const violation of results.violations) {
    console.log("Rule:", violation.id);
    console.log("Impact:", violation.impact);
    console.log("Description:", violation.description);
    console.log(
      "Affected HTML:",
      violation.nodes.map((node) => node.html),
    );
  }
  expect(results.violations).toEqual([]);
});
