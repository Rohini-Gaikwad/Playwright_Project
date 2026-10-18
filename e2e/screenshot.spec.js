import { test, expect } from "@playwright/test";
require("dotenv").config();
const path = require("path");

test("Page Screenshot Test", async ({ page }) => {
  const projectRoot = path.resolve(__dirname, "..");
  await page.goto(process.env.HOST_NAME + "/index.html");
  await page.screenshot({
    path: projectRoot + "\\screenshots\\" + Date.now() + "Homepage.png",
  });
});

test("FullPage Screenshot Test", async ({ page }) => {
  const projectRoot = path.resolve(__dirname, "..");
  await page.goto(process.env.HOST_NAME + "/index.html");
  await page.screenshot({
    path: projectRoot + "\\screenshots\\" + Date.now() + "Fullpage.png",
    fullPage: true,
  });
});

test("Element Screenshot ", async ({ page }) => {
  const projectRoot = path.resolve(__dirname, "..");
  await page.goto(process.env.HOST_NAME + "/index.html");
  await page.locator("(//div[@class='card h-100'])[1]").screenshot({
    path:
      projectRoot + "\\screenshots\\" + Date.now() + "Samsung galaxy s6.png",
  });
});
