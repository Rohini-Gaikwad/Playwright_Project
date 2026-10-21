import { test, expect } from "@playwright/test";
require("dotenv").config();
test.describe("E-Commerce Checkout Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto(process.env.CHECKOUT_HOST_NAME);
    await page.getByPlaceholder("Username").fill(process.env.CHECKOUT_USERNAME);
    await page.getByPlaceholder("Password").fill(process.env.CHECKOUT_PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();
  });

  test("add product and complete checkout", async ({ page }) => {
    // Add first product to cart
    const addButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]',
    );
    await addButton.click();

    // Verify cart badge shows 1 item
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

    // Navigate to cart
    await page.locator(".shopping_cart_link").click();
    await expect(page.locator(".cart_item")).toHaveCount(1);

    // Proceed to checkout
    await page.getByRole("button", { name: "Checkout" }).click();

    // Fill shipping information
    await page.getByPlaceholder("First Name").fill("John");
    await page.getByPlaceholder("Last Name").fill("Doe");
    await page.getByPlaceholder("Zip/Postal Code").fill("10001");
    await page.getByRole("button", { name: "Continue" }).click();

    // Complete order
    await page.getByRole("button", { name: "Finish" }).click();

    // Assert order confirmation
    await expect(page.getByText("Thank you for your order!")).toBeVisible();
  });

  test("sort products by price low to high", async ({ page }) => {
    await page
      .locator('[data-test="product-sort-container"]')
      .selectOption("lohi");

    // Verify first product is cheapest
    const prices = await page
      .locator(".inventory_item_price")
      .allTextContents();
    const numericPrices = prices.map((p) => parseFloat(p.replace("$", "")));
    const sorted = [...numericPrices].sort((a, b) => a - b);
    expect(numericPrices).toEqual(sorted);

    await page.waitForTimeout(5000);
  });
});
