import { test, expect } from "@playwright/test";
require("dotenv").config();
let page;
test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto("https://www.demoblaze.com/index.html");
  //Login
  await page.locator("#login2").click();
  await page.locator("#loginusername").fill(process.env.TEST_USERNAME);
  await page.locator("#loginpassword").fill(process.env.TEST_PASSWORD);
  await page.locator('//button[normalize-space()="Log in"]').click();
});

test.afterAll(async () => {
  await page.locator("#logout2").click();
});

test("Home Page Test", async () => {
  const products = await page.$$(".hrefch");
  console.log("Total products on home page: " + products.length);
  expect(products).toHaveLength(9);
});

test("Add product to cart test", async () => {
  await page.locator('//a[normalize-space()="Samsung galaxy s6"]').click();
  await page.locator('//a[normalize-space()="Add to cart"]').click();

  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toContain("Product added");
    await dialog.accept();
  });
});
