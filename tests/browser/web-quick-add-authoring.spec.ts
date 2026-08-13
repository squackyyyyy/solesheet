import { expect, test } from "@playwright/test";

test.describe("enabled Web Inventory authoring studio", () => {
  test.skip(
    process.env.SHOETRACK_ENABLE_WEB_QUICK_ADD_STUDIO !== "1",
    "Runs only through the gated authoring-browser command.",
  );

  for (const layout of ["desktop", "mobile"] as const) {
    test(`${layout} composition exposes the React Aria workspace semantics`, async ({ page }) => {
      const response = await page.goto(`/web-quick-add-studio/growth-web-quick-add-${layout}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/i);

      const composition = page.locator('[data-capture-ready="true"]');
      await expect(composition).toHaveAttribute("data-layout", layout);
      const table = page.getByRole("grid", { name: "Web Inventory table" });
      await expect(table.getByRole("columnheader")).toHaveCount(6);
      await expect(table.getByRole("row")).toHaveCount(5);
      await expect(page.getByRole("textbox", { name: /nike dunk low brand and model/i })).toHaveValue("Nike Dunk Low");
      await expect(page.getByRole("button", { name: /nike dunk low size/i })).toBeVisible();
      await expect(page.locator('[data-new-inventory-row="true"]')).toHaveCount(2);
      await expect(page.locator('[data-mobile-inventory-outcome="planned"]')).toContainText("Planned: web changes appear in mobile inventory.");
      await expect(page.getByText("₱53,200")).toBeVisible();

      const addRow = page.getByRole("button", { name: /add row/i });
      await addRow.focus();
      await expect(addRow).toBeFocused();
      const sourceSize = await addRow.evaluate((element: HTMLElement) => ({
        height: element.offsetHeight,
        width: element.offsetWidth,
      }));
      expect(sourceSize.height).toBeGreaterThanOrEqual(44);
      expect(sourceSize.width).toBeGreaterThanOrEqual(44);
    });
  }
});
