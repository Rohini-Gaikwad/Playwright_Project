const { test, expect } = require("@playwright/test");
require("dotenv").config();

test.describe("Form Validation and Error Handling", () => {
  test.setTimeout(60000);
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.DEMOQA_HOST_NAME + "/text-box", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
  });

  test("Test1 - Submit form with valid data", async ({ page }) => {
    await page.locator("#userName").fill("John Smith");
    await page.locator("#userEmail").fill("john@example.com");
    await page.locator("#currentAddress").fill("Manchester, UK");
    await page.locator("#permanentAddress").fill("London, UK");

    await page.locator("#submit").click();
    await expect(page.locator("#name")).toHaveText("Name:John Smith");
    await expect(page.locator("#email")).toHaveText("Email:john@example.com");

    await expect(page.locator("#output #currentAddress")).toContainText(
      "Manchester, UK",
    );

    await expect(page.locator("#output #permanentAddress")).toContainText(
      "London, UK",
    );
  });

  test("Test2 - Submit empty form", async ({ page }) => {
    await page.locator("#submit").click();

    // Empty submission should not produce submitted data.
    await expect(page.locator("#output")).toBeHidden();
  });

  test("Test3 - Reject an invalid email format", async ({ page }) => {
    const email = page.locator("#userEmail");

    await email.fill("invalid-email");

    const isValid = await email.evaluate((element) => element.validity.valid);

    expect(isValid).toBe(false);
  });

  test("Test4 - Accept a valid email format", async ({ page }) => {
    const email = page.locator("#userEmail");

    await email.fill("john@example.com");

    const isValid = await email.evaluate((element) => element.validity.valid);

    expect(isValid).toBe(true);
  });

  test("Test5 - Submit a long address", async ({ page }) => {
    const longAddress = "A".repeat(500);

    await page.locator("#currentAddress").fill(longAddress);
    await page.locator("#submit").click();
    await expect(page.locator("#output #currentAddress")).toContainText(
      longAddress,
    );
  });

  test("Test6 - Handle special characters in the name", async ({ page }) => {
    const name = "John @Smith #123";

    await page.locator("#userName").fill(name);
    await page.locator("#submit").click();

    await expect(page.locator("#name")).toHaveText(`Name:${name}`);
  });

  test("Test7 - Submit whitespace in optional address fields", async ({
    page,
  }) => {
    await page.locator("#userName").fill("John Smith");
    await page.locator("#userEmail").fill("john@example.com");
    await page.locator("#currentAddress").fill("");
    await page.locator("#permanentAddress").fill("");

    await page.locator("#submit").click();

    // Verify the form submitted and produced output.
    await expect(page.locator("#output")).toBeVisible();
  });

  test("Test8 - Reload resets the form", async ({ page }) => {
    await page.locator("#userName").fill("John Smith");
    await page.locator("#userEmail").fill("john@example.com");

    await page.reload();

    await expect(page.locator("#userName")).toHaveValue("");
    await expect(page.locator("#userEmail")).toHaveValue("");
    await expect(page.locator("#currentAddress")).toHaveValue("");
    await expect(page.locator("#permanentAddress")).toHaveValue("");
  });
});
