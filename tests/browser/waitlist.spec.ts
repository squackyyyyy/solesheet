import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("page remains responsive and exposes the complete product story", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Your shoe business",
  );
  await expect(page.getByRole("heading", { name: /built around the moments/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /inventory sold/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /start simple/i })).toBeVisible();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test("CTA focuses the form and the non-saving survey flow works", async ({ page }) => {
  const dataRequests: string[] = [];
  page.on("request", (request) => {
    if (!["GET", "HEAD"].includes(request.method())) dataRequests.push(request.url());
  });

  await page.goto("/");
  const initialStored = await page.evaluate(() => ({
    local: window.localStorage.length,
    session: window.sessionStorage.length,
    cookie: document.cookie,
  }));
  await page.getByRole("button", { name: /join the waitlist/i }).first().click();
  await expect(page.getByRole("textbox", { name: /email or philippine mobile/i })).toBeFocused();

  await page.getByRole("textbox", { name: /email or philippine mobile/i }).fill("seller@example.com");
  const consent = page.getByRole("checkbox", { name: /i agree to the collection/i });
  await consent.focus();
  await page.keyboard.press("Space");
  await expect(consent).toBeChecked();
  await page.getByRole("button", { name: /join the waitlist/i }).last().click();
  await expect(page.getByText(/part of the first look/i)).toBeVisible();

  await page.getByRole("button", { name: /answer the quick survey/i }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const android = page.getByRole("radio", { name: "Android" });
  await android.focus();
  await page.keyboard.press("Space");
  await expect(android).toBeChecked();
  await page.getByRole("button", { name: /close survey/i }).click();
  await page.getByRole("button", { name: /answer the quick survey/i }).click();
  await expect(page.getByRole("radio", { name: "Android" })).toBeChecked();
  await page.getByRole("button", { name: /finish quick survey/i }).click();
  await expect(page.getByText(/that’s the full flow/i)).toBeVisible();

  expect(dataRequests).toEqual([]);
  const stored = await page.evaluate(() => ({
    local: window.localStorage.length,
    session: window.sessionStorage.length,
    cookie: document.cookie,
  }));
  expect(stored).toEqual(initialStored);
});

test("physical-touch controls activate through the LAN page", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"));

  await page.goto("/");

  const stock = page.getByRole("button", { name: /stock/i });
  await stock.tap();
  await expect(stock).toHaveAttribute("aria-pressed", "true");

  const overview = page.getByRole("button", { name: /overview/i });
  await overview.tap();
  await expect(overview).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: /join the waitlist/i }).first().tap();
  await page.getByRole("textbox", { name: /email or philippine mobile/i }).fill("09171234567");
  await page.getByText(/i agree to the collection and use/i).tap();
  await expect(page.getByRole("checkbox", { name: /i agree to the collection/i })).toBeChecked();
  await page.getByRole("button", { name: /join the waitlist/i }).last().tap();
  await expect(page.getByText(/part of the first look/i)).toBeVisible();

  await page.getByRole("button", { name: /answer the quick survey/i }).tap();
  await page.getByText("Android", { exact: true }).tap();
  await expect(page.getByRole("radio", { name: "Android" })).toBeChecked();
});

test("keyboard focus returns after dismissing the survey", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /join the waitlist/i }).first().click();
  await page.getByRole("textbox", { name: /email or philippine mobile/i }).fill("09171234567");
  const consent = page.getByRole("checkbox", { name: /i agree to the collection/i });
  await consent.focus();
  await page.keyboard.press("Space");
  await expect(consent).toBeChecked();
  await page.getByRole("button", { name: /join the waitlist/i }).last().click();
  const surveyTrigger = page.getByRole("button", { name: /answer the quick survey/i });
  await surveyTrigger.click();
  await page.keyboard.press("Escape");
  await expect(surveyTrigger).toBeFocused();
});

test("has no automatically detectable accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
