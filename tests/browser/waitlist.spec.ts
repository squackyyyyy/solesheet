import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("page remains responsive and exposes the complete product story", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Your shoe business",
  );
  await expect(page.getByRole("heading", { name: /built around the moments/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /inventory sold/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /free for the core work/i })).toBeVisible();

  const overflow = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]');

    return {
      dialog: dialog ? dialog.scrollWidth - dialog.clientWidth : 0,
      page: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  expect(overflow.page).toBeLessThanOrEqual(1);
  expect(overflow.dialog).toBeLessThanOrEqual(1);
});

test("pricing makes core inventory work free and reserves protection and scale for paid plans", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText(/₱349\/month/i)).toBeVisible();
  await expect(page.getByText(/search, filters, profit, and installments/i)).toBeVisible();
  await expect(page.getByText(/automatic cloud backup and restore/i)).toBeVisible();
  await expect(page.getByText(/installment reminders and monthly summaries/i)).toBeVisible();
  await expect(page.getByText(/web quick-add and spreadsheet import/i)).toBeVisible();
  await expect(page.getByText(/cloud sync and advanced reports/i)).toBeVisible();
  await expect(page.getByText(/planned pricing — core work stays free/i)).toBeVisible();
});

test("long founding offer selection does not create mobile page overflow", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"));

  await page.goto("/");
  await page.getByRole("button", { name: /join the waitlist/i }).first().tap();
  await page.getByRole("textbox", { name: /email or philippine mobile/i }).fill("09171234567");
  await page.getByText(/i agree to the collection and use/i).tap();
  await page.getByRole("button", { name: /join the waitlist/i }).last().tap();
  await page.getByRole("button", { name: /answer the quick survey/i }).first().tap();

  const planSelect = page.getByRole("button", { name: /which planned option feels closest/i });
  await planSelect.tap();
  await page.getByRole("option", { name: /founding starter/i }).tap();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test("progress-aware CTAs synchronize through the non-saving survey flow", async ({ page }) => {
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
  const joinCtas = page.getByRole("button", { name: /join the waitlist/i });
  await expect(joinCtas).toHaveCount(4);
  await joinCtas.first().click();
  await expect(page.getByRole("textbox", { name: /email or philippine mobile/i })).toBeFocused();

  await page.getByRole("textbox", { name: /email or philippine mobile/i }).fill("seller@example.com");
  const consent = page.getByRole("checkbox", { name: /i agree to the collection/i });
  await consent.focus();
  await page.keyboard.press("Space");
  await expect(consent).toBeChecked();
  await joinCtas.last().click();
  await expect(page.getByText(/part of the first look/i)).toBeVisible();

  const surveyCtas = page.getByRole("button", { name: /answer the quick survey/i });
  await expect(surveyCtas).toHaveCount(4);
  await expect(page.getByText(/you’re on the waitlist\. help shape what we build first/i)).toBeVisible();
  await surveyCtas.last().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const android = page.getByRole("radio", { name: "Android" });
  await android.focus();
  await page.keyboard.press("Space");
  await expect(android).toBeChecked();
  await page.getByRole("button", { name: /close survey/i }).click();
  await surveyCtas.first().click();
  await expect(page.getByRole("radio", { name: "Android" })).toBeChecked();
  await page.getByRole("button", { name: /finish quick survey/i }).click();
  await expect(page.getByText(/that’s the full flow/i)).toBeVisible();
  await page.getByRole("button", { name: /close survey/i }).first().click();
  await expect(page.getByText(/thanks for helping shape shoetrack/i)).toBeVisible();
  const completedCtas = page.getByRole("button", { name: /you’re all set — thank you/i });
  await expect(completedCtas).toHaveCount(4);
  for (let index = 0; index < 4; index += 1) {
    await expect(completedCtas.nth(index)).toBeDisabled();
    await expect(completedCtas.nth(index)).toContainText("✓");
  }

  expect(dataRequests).toEqual([]);
  const stored = await page.evaluate(() => ({
    local: window.localStorage.length,
    session: window.sessionStorage.length,
    cookie: document.cookie,
  }));
  expect(stored).toEqual(initialStored);

  await page.reload();
  await expect(page.getByRole("button", { name: /join the waitlist/i })).toHaveCount(4);
  await expect(page.getByRole("button", { name: /answer the quick survey/i })).toHaveCount(0);
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

  await page.getByRole("button", { name: /answer the quick survey/i }).first().tap();
  await page.getByText("Android", { exact: true }).tap();
  await expect(page.getByRole("radio", { name: "Android" })).toBeChecked();
});

test("founding Starter offer stays consistent across marketing and mockup copy", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText(/₱65\/month on Starter for your first 12 paid months/i)).toBeVisible();
  await expect(page.getByText(/first 50 eligible survey respondents/i).first()).toBeVisible();
  await page.getByRole("button", { name: /backup/i }).click();
  await expect(page.getByText(/Starter only · first 12 paid months/i)).toBeVisible();
  await expect(page.getByText(/first 50–100 paying users/i)).toHaveCount(0);
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
  const surveyTrigger = page.getByRole("button", { name: /answer the quick survey/i }).first();
  await surveyTrigger.click();
  await page.keyboard.press("Escape");
  await expect(surveyTrigger).toBeFocused();
});

test("has no automatically detectable accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
