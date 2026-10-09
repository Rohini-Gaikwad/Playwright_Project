const { test, expect } = require("@playwright/test");
require("dotenv").config();
test("Test 1", async ({ page }) => {
  await page.goto(`${process.env.HOST_NAME}/index.html`);
  await expect(page).toHaveTitle("STORE");
});

test("Test 2", async ({ page }) => {
  await page.goto("https://demo.nopcommerce.com/");
  await expect(page).toHaveTitle("nopCommerce demo store");
});
