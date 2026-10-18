const { test, expect } = require("@playwright/test");
require("dotenv").config();
test("Handle radio button", async ({ page }) => {
  await page.goto(process.env.DEMOQA_HOST_NAME + "/radio-button");
  await page.locator("//input[@id='yesRadio']").check(); // yes
  await expect(await page.locator("//input[@id='yesRadio']")).toBeChecked();
  await expect(
    await page.locator("//input[@id='yesRadio']").isChecked(),
  ).toBeTruthy();

  await expect(
    await page.locator("//input[@id='noRadio']").isChecked(),
  ).toBeFalsy();

  await page.waitForTimeout(5000);
});
