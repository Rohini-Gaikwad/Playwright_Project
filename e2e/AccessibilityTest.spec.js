const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

test("W3C page structure accessibility test", async ({ page }) => {
  // Open the W3C tutorial
  await page.goto("https://www.w3.org/WAI/tutorials/page-structure/");

  // Check that the page loaded
  await expect(page).toHaveTitle(/Page Structure/i);

  // Check the main heading
  await expect(
    page.getByRole("heading", { name: /page structure/i }).first(),
  ).toBeVisible();

  // Check that a main landmark exists
  await expect(page.getByRole("main")).toBeVisible();

  // Run automated accessibility scan
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  console.log("Total accessibility violations:", results.violations.length);

  // Print details of each violation
  for (const violation of results.violations) {
    console.log("Rule:", violation.id);
    console.log("Impact:", violation.impact);
    console.log("Description:", violation.description);

    for (const node of violation.nodes) {
      console.log("Element:", node.html);
      console.log("Fix:", node.failureSummary);
    }
  }

  // Fail the test if accessibility violations are found
  expect(results.violations).toEqual([]);
});
