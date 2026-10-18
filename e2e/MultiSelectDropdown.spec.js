const { test, expect } = require("playwright/test");
test("Handle MultiSelectdropdowns", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  // select multiple options from multi select dropdown
  await page.selectOption("#colors", ["Red", "Green", "Yellow"]);

  // Assertions
  // 1) check number of options in the dropdown
  const options = await page.locator("#colors option");
  await expect(options).toHaveCount(7);

  // 2) check number of options in the dropdown using JS array
  const options = await page.$$("#colors option");
  await expect(options.length).toBe(7);
  console.log("Number of options:", options.length);

  // 3) check presence of value in the dropdown
  const content = await page.locator("#colors").textContent();
  await expect(content.includes("White")).toBeTruthy();

  await page.waitForTimeout(5000);
});
