import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
require("dotenv").config();
test("Verify the login functionality", async ({ page }) => {
  //Login
  const loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage();
  await loginPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
  await page.waitForTimeout(3000);
});
