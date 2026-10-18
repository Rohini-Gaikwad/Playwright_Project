const { test, expect } = require("@playwright/test");
require("dotenv").config();
test("Handle checkbox", async ({ page }) => {
  await page.goto(process.env.DEMOQA_HOST_NAME + "/automation-practice-form");
  // single checkbox
  await page.locator("//input[@id='hobbies-checkbox-1']").check();
  await expect(
    await page.locator("//input[@id='hobbies-checkbox-1']"),
  ).toBeChecked();
  await expect(
    await page.locator("//input[@id='hobbies-checkbox-1']").isChecked(),
  ).toBeTruthy();
  await expect(
    await page.locator("//input[@id='hobbies-checkbox-3']").isChecked(),
  ).toBeFalsy();

  // Multiple checkbox
  const checkboxLocators = [
    "//input[@id='hobbies-checkbox-1']",
    "//input[@id='hobbies-checkbox-2']",
    "//input[@id='hobbies-checkbox-3']",
  ];

  // select multiple checkboxes
  for (const locator of checkboxLocators) {
    await page.locator(locator).check();
  }
  await page.waitForTimeout(5000);

  // unselect multiple checkboxes which are already selected
  for (const locator of checkboxLocators) {
    if (await page.locator(locator).isChecked()) {
      await page.locator(locator).uncheck();
    }
  }
  await page.waitForTimeout(5000);
});
