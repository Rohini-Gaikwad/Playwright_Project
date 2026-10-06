import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { CartPage } from "./pages/CartPage";
require("dotenv").config();
test("Verify the login functionality", async ({ page }) => {
  // Login
  const loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage();
  await loginPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
  await page.waitForTimeout(3000);

  // Home
  const homePage = new HomePage(page);
  await homePage.addProductToCart("Samsung galaxy s6");
  await page.waitForTimeout(3000);
  await homePage.gotoCart();

  // Cart
  const cartPage = new CartPage(page);
  await page.waitForTimeout(3000);
  const status = await cartPage.checkProductsInCart("Samsung galaxy s6");
  expect(await status).toBe(true);
});
