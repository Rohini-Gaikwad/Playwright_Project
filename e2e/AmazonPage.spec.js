import { test, expect } from "@playwright/test";

test("Amazon category menu navigation", async ({ page }) => {
  await page.goto("https://www.amazon.com/", {
    waitUntil: "domcontentloaded",
  });

  const dismissButton = page.getByRole("button", { name: "Dismiss" });
  if (await dismissButton.isVisible().catch(() => false)) {
    await dismissButton.click();
  }

  // Open the categories menu
  await page
    .getByRole("button", {
      name: "Open All Categories Menu",
    })
    .click();

  // Select Prime Video
  await page.getByRole("button", { name: "Prime Video" }).click();

  // Return to the main menu
  await page
    .getByRole("button", {
      name: "Back to main menu",
    })
    .first()
    .click();

  // Select Amazon Music from the same menu
  await page.getByRole("button", { name: "Amazon Music" }).click();

  // Return to the main menu again
  await page
    .getByRole("button", {
      name: "Back to main menu",
    })
    .first()
    .click();

  // Add another button here
  await page.getByRole("button", { name: "Fire TV" }).click();
});
