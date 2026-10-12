const { test, expect } = require("playwright/test");
test("Handle dropdowns", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  // Multiple ways to select option from dropdowns
  await page.locator("#country").selectOption({ label: "United Kingdom" }); //label / visible text
  await page.locator("#country").selectOption("United Kingdom"); // visible text
  await page.locator("#country").selectOption({ value: "india" }); // by using value
  await page.locator("#country").selectOption({ index: 4 }); // by using index
  await page.selectOption("#country", "India"); // by using text

  // Assertions
  //   1) check no of options in dropdown --Approach 1
  const options = await page.locator("#country option");
  await expect(options).toHaveCount(10);

  // 2) check no of options in dropdown --Approach 2
  const options = await page.$$("#country option");
  await expect(options.length).toBe(10);
  console.log("Number of options: ", options.length);

  // 3) check presence of value in the dropdown --Approach 1
  const content = await page.locator("#country").textContent();
  await expect(content.includes("Canada")).toBeTruthy();

  // 4) check presence of value in the dropdown --Approach 2 --using looping
  const options = await page.$$("#country option");
  let status = false;
  for (const option of options) {
    let value = await option.textContent();
    if (value.includes("Japan")) {
      status = true;
      break;
    }
  }
  expect(status).toBeTruthy();

  // 5) select option from dropdown using loop
  const options = await page.$$("#country option");

  for (const option of options) {
    let value = await option.textContent();
    if (value.includes("Japan")) {
      await page.selectOption("#country", value);
      break;
    }
  }

  await page.waitForTimeout(5000);
});
