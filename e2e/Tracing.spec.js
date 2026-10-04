import { test, expect } from "@playwright/test";
require("dotenv").config();
test("Record Video Test", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/index.html");
  await page.getByRole("link", { name: "Log in" }).click();
  await page.locator("#loginusername").fill(process.env.TEST_USERNAME);
  await page.locator("#loginpassword").fill(process.env.TEST_PASSWORD);
  await page.getByRole("button", { name: "Log in" }).click();
  await expect(page.locator("#logout2")).toBeVisible();
});
