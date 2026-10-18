import { test, expect } from "@playwright/test";

test("Amazon category navigation test", async ({ page }) => {
  await page.goto("https://www.amazon.com/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  const dismissButton = page.getByRole("button", { name: "Dismiss" });
  if (await dismissButton.isVisible().catch(() => false)) {
    await dismissButton.click();
  }

  await page
    .getByRole("button", {
      name: "Open All Categories Menu",
    })
    .click();

  // Confirm the menu item is visible before clicking it
  const primeVideo = page.getByRole("button", {
    name: "Prime Video",
  });

  await expect(primeVideo).toBeVisible({ timeout: 10000 });
  await primeVideo.click({ timeout: 10000 });

  await expect(
    page.getByRole("button", { name: "Back to main menu" }).first(),
  ).toBeVisible();

  //   const amazonMusic = page.getByRole("button", {
  //     name: "Amazon Music",
  //   });
  //   await expect(amazonMusic).toBeVisible({ timeout: 10000 });
  //   await amazonMusic.click({ timeout: 10000 });
});
