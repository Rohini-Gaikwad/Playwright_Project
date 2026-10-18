const { test, expect } = require("@playwright/test");
require("dotenv").config();
test("Home Page", async ({ page }) => {
  await page.goto(process.env.HOST_NAME + "/index.html");

  const pageTitle = page.title();
  await expect(page).toHaveTitle("STORE");
  await expect(page).toHaveURL(process.env.HOST_NAME + "/index.html");

  await page.close();
});
