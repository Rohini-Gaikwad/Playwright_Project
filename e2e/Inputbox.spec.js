const { test, expect } = require("@playwright/test");
require("dotenv").config();
test("Handle inputbox", async ({ page }) => {
  await page.goto(process.env.DEMOQA_HOST_NAME + "/automation-practice-form");

  await expect(await page.locator("//input[@id='firstName']")).toBeVisible();
  await expect(await page.locator("//input[@id='firstName']")).toBeEmpty();
  await expect(await page.locator("//input[@id='firstName']")).toBeEditable();
  await expect(await page.locator("//input[@id='firstName']")).toBeEnabled();

  await page.locator("//input[@id='firstName']").fill("John");

  await page.waitForTimeout(5000);
});
