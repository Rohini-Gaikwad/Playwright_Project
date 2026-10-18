import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.getByRole("link", { name: "1", exact: true }).click();
  await page.getByRole("link", { name: "2", exact: true }).click();
  await page.getByRole("link", { name: "3", exact: true }).click();
  await page.getByRole("link", { name: "4", exact: true }).click();

  // Locate the table
  const table = page.locator("#productTable");
  // Locate pagination buttons
  const pagination = page.locator("#pagination li");

  // Get the number of pages
  const pageCount = await pagination.count();

  // Read all rows on the current page
  const rows = table.locator("tbody tr");
  const rowCount = await rows.count();

  // Read all columns on the current page
  const columns = table.locator("thead tr th");
  const columnCount = await columns.count();
  // Assertions
  expect(await rows.count()).toBe(5);
  expect(await columns.count()).toBe(4);
});
