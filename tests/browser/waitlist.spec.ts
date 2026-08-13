import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("page remains responsive and exposes the complete product story", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Your shoe business",
  );
  await expect(page.getByText("Inside SoleSheet", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: /see the workflows we’re building for everyday reselling/i })).toBeVisible();
  await expect(page.getByText(/browse seven static product previews.*they are not a live demo/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: /seven everyday workflows, shown clearly/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /your stockroom\. one clear table/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /sold doesn’t always mean settled/i })).toBeVisible();
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

test("public controls and surfaces use the SoleSheet brand palette", async ({ page }) => {
  await page.goto("/");

  const palette = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    return {
      action: styles.getPropertyValue("--brand-action").trim(),
      green: styles.getPropertyValue("--brand-green").trim(),
      ink: styles.getPropertyValue("--brand-ink").trim(),
      soft: styles.getPropertyValue("--brand-soft").trim(),
    };
  });
  expect(palette).toEqual({
    action: "#047857",
    green: "#22c55e",
    ink: "#14213d",
    soft: "#f7faf5",
  });

  const primaryCta = page.getByRole("button", { name: /join the waitlist/i }).first();
  await expect(primaryCta).toHaveCSS("background-color", "rgb(4, 120, 87)");

  const flow = page.getByRole("region", { name: /seven everyday workflows, shown clearly/i });
  const quickActions = flow.getByRole("button", { name: "Quick Actions" });
  await quickActions.click();
  await expect(quickActions).toHaveAttribute("aria-pressed", "true");
  expect(await quickActions.getAttribute("class")).toContain("bg-[var(--brand-ink)]");
});

test("mobile footer keeps the full horizontal SoleSheet lockup", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");

  const footerLogo = page.locator("footer").getByRole("img", { name: "SoleSheet" });
  await expect(footerLogo).toBeVisible();
  await expect.poll(() => footerLogo.evaluate((image: HTMLImageElement) => image.currentSrc)).toContain(
    "solesheet-horizontal-on-light.svg",
  );
});

test("mobile Flow art uses a tall cropped phone and a compact Planned pill", async ({ page }) => {
  await page.goto("/flow-mockup-studio/backup-mobile");

  const composition = page.locator('[data-capture-ready="true"]');
  const placement = page.locator('[data-phone-placement="mobile-cropped-tilted"]');
  const phone = page.locator('[data-phone-shell="mobile"]');
  const planned = page.getByText("Planned", { exact: true });
  const [compositionBox, phoneBox, plannedBox] = await Promise.all([
    composition.boundingBox(),
    phone.boundingBox(),
    planned.boundingBox(),
  ]);

  expect(compositionBox).not.toBeNull();
  expect(phoneBox).not.toBeNull();
  expect(plannedBox).not.toBeNull();
  const sourceRatio = await phone.evaluate((element: HTMLElement) => element.offsetHeight / element.offsetWidth);
  expect(sourceRatio).toBeGreaterThan(1.8);
  expect(sourceRatio).toBeLessThan(2);
  expect((phoneBox?.height ?? Infinity) / (compositionBox?.height ?? 1)).toBeLessThan(0.7);
  expect((phoneBox?.y ?? 0) + (phoneBox?.height ?? 0)).toBeGreaterThan(
    (compositionBox?.y ?? 0) + (compositionBox?.height ?? 0),
  );
  await expect(placement).toHaveCSS("transform", /matrix/);
  expect(plannedBox?.height ?? Infinity).toBeLessThan(30);
  expect((plannedBox?.width ?? 0) / (plannedBox?.height ?? 1)).toBeGreaterThan(2);
});

test("compact installment callout reinforces the gallery without duplicating the Payments preview", async ({ page }, testInfo) => {
  await page.goto("/");

  const section = page.locator("#installments");
  await expect(section).toHaveAttribute("aria-labelledby", "installment-title");
  await expect(section.getByRole("heading", { name: "Sold doesn’t always mean settled." })).toBeVisible();
  await expect(section.getByText(/keeps inventory state and payment state separate/i)).toBeVisible();
  await expect(section.getByText("₱5,500")).toBeVisible();
  await expect(section.getByText("₱1,000")).toBeVisible();
  await expect(section.getByText("Sold", { exact: true })).toBeVisible();
  await expect(section.getByText("Partially paid", { exact: true })).toBeVisible();
  await expect(section.getByText(/seller-managed tracking only.*payment processing/i)).toBeVisible();
  await expect(section.locator('[data-installment-state-callout="true"]')).toHaveCount(1);
  await expect(section.getByText("Record payment")).toHaveCount(0);
  await expect(section.getByText("Payment received")).toHaveCount(0);

  if (!testInfo.project.name.startsWith("mobile")) {
    await page.getByRole("link", { name: "Installments" }).click();
    await expect(page).toHaveURL(/#installments$/);
    await expect(section).toBeInViewport();
  }
});

test("pricing makes core inventory work free and reserves protection and scale for paid plans", async ({ page }) => {
  await page.goto("/");

  const pricing = page.locator("#pricing");
  const free = pricing.locator("article").filter({ hasText: "Free" });
  const starter = pricing.locator("article").filter({ hasText: "Starter" });
  const growth = pricing.locator("article").filter({ hasText: "Growth" });

  await expect(page.getByText(/₱349\/month/i)).toBeVisible();
  await expect(free.getByText(/search, filters, profit, and installments/i)).toBeVisible();
  await expect(starter.getByText(/automatic cloud backup and restore/i)).toBeVisible();
  await expect(starter.getByText(/installment reminders and monthly summaries/i)).toBeVisible();
  await expect(growth.getByText(/web inventory and spreadsheet import/i)).toBeVisible();
  await expect(growth.getByText(/cross-device sync and advanced reports/i)).toBeVisible();
  await expect(page.getByText(/SoleSheet is still in validation.*not available yet/i)).toBeVisible();
});

test("pricing comparison preserves the cumulative plan ladder on desktop and mobile", async ({ page, context }, testInfo) => {
  const writes: string[] = [];
  page.on("request", (request) => {
    if (!["GET", "HEAD"].includes(request.method())) writes.push(`${request.method()} ${request.url()}`);
  });

  await page.goto("/");
  const comparison = page.getByRole("region", { name: "Plan feature comparison" });
  const before = await page.evaluate(() => ({ local: { ...localStorage }, session: { ...sessionStorage } }));
  const cookiesBefore = await context.cookies();

  if (testInfo.project.name.startsWith("mobile")) {
    const disclosure = comparison.locator("details");
    await expect(disclosure).not.toHaveAttribute("open", "");
    await disclosure.locator("summary").click();
    await expect(disclosure).toHaveAttribute("open", "");
    await expect(comparison.getByText("Swipe to compare plans →")).toBeVisible();

    const scrollRegion = comparison.getByRole("region", { name: /feature comparison table.*swipe horizontally/i });
    await expect(scrollRegion).toBeVisible();
    expect(await scrollRegion.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
    await expect(scrollRegion.locator('th[scope="row"]').first()).toHaveClass(/\bsticky\b.*\bleft-0\b/);
  } else {
    const table = comparison.locator('[data-pricing-comparison-table="true"]:visible');
    await expect(table).toHaveCount(1);
    await expect(table.locator("thead th")).toHaveText(["Feature", "Free", "Starter", "Growth"]);
  }

  const visibleTable = comparison.locator('[data-pricing-comparison-table="true"]:visible');
  await expect(visibleTable).toHaveCount(1);
  await expect(visibleTable.getByRole("rowheader", { name: "Active pairs" })).toBeVisible();
  await expect(visibleTable.getByText("Planned", { exact: true })).toHaveCount(0);
  await expect(
    comparison.locator("p:visible").filter({
      hasText: /starter includes the Free core.*Growth includes Starter and Free benefits, then adds scale benefits/i,
    }),
  ).toBeVisible();
  expect(writes).toEqual([]);
  expect(await context.cookies()).toEqual(cookiesBefore);
  expect(await page.evaluate(() => ({ local: { ...localStorage }, session: { ...sessionStorage } }))).toEqual(before);
});

test("Growth Web Inventory is a responsive static proof with no product side effects", async ({ page, context }, testInfo) => {
  const writes: string[] = [];
  page.on("request", (request) => {
    if (!["GET", "HEAD"].includes(request.method())) writes.push(`${request.method()} ${request.url()}`);
  });

  await page.goto("/");
  const section = page.getByRole("region", { name: /your stockroom\. one clear table/i });
  await section.scrollIntoViewIfNeeded();
  await expect(section.getByText("Growth · Web Inventory", { exact: true })).toBeVisible();
  await expect(section.getByText(/manage the same SoleSheet inventory from your browser.*adding rows makes encoding multiple pairs faster.*planned for Growth/i)).toBeVisible();
  await expect(section.getByText(/planned Growth feature.*static product preview/i)).toBeVisible();

  const image = section.getByRole("img", { name: /fixed-column SoleSheet inventory table.*two emerald-highlighted New rows.*Add row as pair creation.*12 pairs in inventory.*2 newly added on web.*₱53,200.*planned web changes appearing in mobile inventory/i });
  await expect(image).toBeVisible();
  await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.currentSrc)).toContain(
    testInfo.project.name.startsWith("mobile")
      ? "growth-web-quick-add-mobile.webp"
      : "growth-web-quick-add-desktop.webp",
  );
  const figure = section.locator("figure");
  await expect(figure.locator("button, a, input, select, textarea, [role=grid], [tabindex]")).toHaveCount(0);

  const order = await page.evaluate(() => {
    const product = document.querySelector("#product");
    const web = document.querySelector("#web-quick-add");
    const installments = document.querySelector("#installments");
    return Boolean(
      product &&
      web &&
      installments &&
      product.compareDocumentPosition(installments) & Node.DOCUMENT_POSITION_FOLLOWING &&
      installments.compareDocumentPosition(web) & Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });
  expect(order).toBe(true);

  const before = await page.evaluate(() => ({
    local: { ...localStorage },
    session: { ...sessionStorage },
    cookie: document.cookie,
  }));
  const cookiesBefore = await context.cookies();
  await figure.click({ position: { x: 10, y: 10 } });
  expect(writes).toEqual([]);
  expect(await context.cookies()).toEqual(cookiesBefore);
  expect(await page.evaluate(() => ({
    local: { ...localStorage },
    session: { ...sessionStorage },
    cookie: document.cookie,
  }))).toEqual(before);

  const overflow = await page.evaluate(() => ({
    page: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    figure: document.querySelector("#web-quick-add figure")
      ? document.querySelector("#web-quick-add figure")!.scrollWidth - document.querySelector("#web-quick-add figure")!.clientWidth
      : 0,
  }));
  expect(overflow.page).toBeLessThanOrEqual(1);
  expect(overflow.figure).toBeLessThanOrEqual(1);
});

test("FAQ explains the intended Web Inventory workflow and availability", async ({ page }) => {
  await page.goto("/");

  const faq = page.locator("#faq");
  const question = faq.locator("summary").filter({
    hasText: "What is Web Inventory, and is it available now?",
  });
  await question.click();

  await expect(
    faq.getByText(/intended Growth feature for managing the same SoleSheet inventory.*fixed columns.*adding a row means adding a pair.*appear in mobile inventory/i),
  ).toBeVisible();
  await expect(
    faq.getByText(/not live yet.*adding one pair from your phone remains part of the core product.*spreadsheet import is another intended Growth feature/i),
  ).toBeVisible();
});

test("waitlist signup accepts email only and identifies phone values as invalid", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /join the waitlist/i }).first().click();

  const email = page.getByRole("textbox", { name: "Email address" });
  await expect(email).toBeFocused();
  await expect(email).toHaveAttribute("type", "email");
  await expect(email).toHaveAttribute("autocomplete", "email");
  await expect(email).toHaveAttribute("placeholder", "you@email.com");
  await email.fill("09171234567");
  const consent = page.getByRole("checkbox", { name: /i agree to the collection/i });
  await consent.focus();
  await page.keyboard.press("Space");
  await expect(consent).toBeChecked();
  await page.getByRole("button", { name: /join the waitlist/i }).last().click();

  await expect(email).toHaveValue("09171234567");
  await expect(email).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  await expect(page.getByText(/part of the first look/i)).toHaveCount(0);
});

test("long founding offer selection does not create mobile page overflow", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"));

  await page.goto("/");
  await page.getByRole("button", { name: /join the waitlist/i }).first().tap();
  await page.getByRole("textbox", { name: "Email address" }).fill("seller@example.com");
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
  await expect(page.getByRole("textbox", { name: "Email address" })).toBeFocused();

  await page.getByRole("textbox", { name: "Email address" }).fill("seller@example.com");
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
  await expect(page.getByText(/thanks for helping shape solesheet/i)).toBeVisible();
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

test("survey Other details work with keyboard and touch without persistence or overflow", async ({ page }, testInfo) => {
  const dataRequests: string[] = [];
  page.on("request", (request) => {
    if (!["GET", "HEAD"].includes(request.method())) dataRequests.push(request.url());
  });

  await page.goto("/");
  const initialStored = await page.evaluate(() => ({
    local: { ...localStorage },
    session: { ...sessionStorage },
    cookie: document.cookie,
  }));
  const isMobile = testInfo.project.name.startsWith("mobile");

  const join = page.getByRole("button", { name: /join the waitlist/i });
  if (isMobile) await join.first().tap();
  else await join.first().click();
  await page.getByRole("textbox", { name: "Email address" }).fill("seller@example.com");
  const consent = page.getByRole("checkbox", { name: /i agree to the collection/i });
  if (isMobile) await page.locator("label", { has: consent }).tap();
  else {
    await consent.focus();
    await page.keyboard.press("Space");
  }
  await expect(consent).toBeChecked();
  if (isMobile) await join.last().tap();
  else await join.last().click();
  await expect(page.getByText(/part of the first look/i)).toBeVisible();

  const surveyTrigger = page.getByRole("button", { name: /answer the quick survey/i }).first();
  if (isMobile) await surveyTrigger.tap();
  else await surveyTrigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  const chooseOther = async (question: RegExp) => {
    const select = dialog.getByRole("button", { name: question });
    if (isMobile) {
      await select.tap();
      await page.getByRole("option", { name: "Other" }).tap();
    } else {
      await select.focus();
      await page.keyboard.press("Enter");
      await page.keyboard.press("End");
      await page.keyboard.press("Enter");
    }
    await expect(select).toContainText("Other");
  };

  await chooseOther(/what do you use to track inventory today/i);
  const inventoryOther = dialog.getByRole("textbox", { name: "Other inventory method" });
  await expect(inventoryOther).toBeVisible();
  await inventoryOther.fill("Airtable");

  await chooseOther(/which feature matters most/i);
  const featureOther = dialog.getByRole("textbox", { name: "Other feature" });
  await expect(featureOther).toBeVisible();
  await featureOther.fill("Supplier purchase tracking");

  const instagram = dialog.getByRole("checkbox", { name: "Instagram" });
  const channelOther = dialog.getByRole("checkbox", { name: "Other" });
  const instagramLabel = instagram.locator("xpath=ancestor::label");
  const channelOtherLabel = channelOther.locator("xpath=ancestor::label");
  if (isMobile) {
    await instagramLabel.tap();
    await channelOtherLabel.tap();
  } else {
    await instagram.focus();
    await page.keyboard.press("Space");
    await channelOther.focus();
    await page.keyboard.press("Space");
  }
  await expect(instagram).toBeChecked();
  await expect(channelOther).toBeChecked();
  const salesChannelOther = dialog.getByRole("textbox", { name: "Other sales channel" });
  await salesChannelOther.fill("Weekend pop-ups");

  await expect(inventoryOther).toHaveValue("Airtable");
  await expect(featureOther).toHaveValue("Supplier purchase tracking");
  await expect(salesChannelOther).toHaveValue("Weekend pop-ups");

  if (isMobile) await channelOtherLabel.tap();
  else {
    await channelOther.focus();
    await page.keyboard.press("Space");
  }
  await expect(dialog.getByRole("textbox", { name: "Other sales channel" })).toHaveCount(0);
  await expect(instagram).toBeChecked();

  if (isMobile) await channelOtherLabel.tap();
  else {
    await channelOther.focus();
    await page.keyboard.press("Space");
  }
  const blankSalesChannelOther = dialog.getByRole("textbox", { name: "Other sales channel" });
  await expect(blankSalesChannelOther).toHaveValue("");

  const geometry = await page.evaluate(() => {
    const surveyDialog = document.querySelector('[role="dialog"]');
    const scroller = surveyDialog?.querySelector(".overflow-y-auto");
    return {
      pageOverflow:
        document.documentElement.scrollWidth - document.documentElement.clientWidth,
      dialogOverflow: surveyDialog
        ? surveyDialog.scrollWidth - surveyDialog.clientWidth
        : 0,
      canScroll: scroller ? scroller.scrollHeight >= scroller.clientHeight : false,
    };
  });
  expect(geometry.pageOverflow).toBeLessThanOrEqual(1);
  expect(geometry.dialogOverflow).toBeLessThanOrEqual(1);
  expect(geometry.canScroll).toBe(true);

  const finish = dialog.getByRole("button", { name: /finish quick survey/i });
  await finish.scrollIntoViewIfNeeded();
  if (isMobile) await finish.tap();
  else await finish.click();
  await expect(page.getByText(/that’s the full flow/i)).toBeVisible();

  expect(dataRequests).toEqual([]);
  expect(await page.evaluate(() => ({
    local: { ...localStorage },
    session: { ...sessionStorage },
    cookie: document.cookie,
  }))).toEqual(initialStored);
});

test("physical-touch controls activate through the LAN page", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"));

  await page.goto("/");

  const stock = page.getByRole("button", { name: "Search Stock" });
  await stock.tap();
  await expect(stock).toHaveAttribute("aria-pressed", "true");

  const overview = page.getByRole("button", { name: "Quick Actions" });
  await overview.tap();
  await expect(overview).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: /join the waitlist/i }).first().tap();
  await page.getByRole("textbox", { name: "Email address" }).fill("seller@example.com");
  await page.getByText(/i agree to the collection and use/i).tap();
  await expect(page.getByRole("checkbox", { name: /i agree to the collection/i })).toBeChecked();
  await page.getByRole("button", { name: /join the waitlist/i }).last().tap();
  await expect(page.getByText(/part of the first look/i)).toBeVisible();

  await page.getByRole("button", { name: /answer the quick survey/i }).first().tap();
  await page.getByText("Android", { exact: true }).tap();
  await expect(page.getByRole("radio", { name: "Android" })).toBeChecked();
});

test("backup photograph names Starter as the plan and backup as its feature", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText(/₱65\/month on Starter for your first 12 paid months/i)).toBeVisible();
  await expect(page.getByText(/first 50 eligible survey respondents/i).first()).toBeVisible();
  await page.getByRole("button", { name: /backup/i }).click();
  await expect(page.getByRole("img", { name: /planned Starter plan at ₱99 per month, with automatic cloud backup and restore clearly presented as a Starter feature/i })).toBeVisible();
  await expect(page.getByText(/first 50–100 paying users/i)).toHaveCount(0);
});

test("keyboard focus returns after dismissing the survey", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /join the waitlist/i }).first().click();
  await page.getByRole("textbox", { name: "Email address" }).fill("seller@example.com");
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

test("planned flow leads with Quick Sale and selects the viewport-specific photograph", async ({ page }, testInfo) => {
  await page.goto("/");
  const flow = page.getByRole("region", { name: /seven everyday workflows, shown clearly/i });
  const selectors = flow.getByRole("button");
  await expect(selectors).toHaveCount(7);

  const quickSale = flow.getByRole("button", { name: /quick sale, fastest path/i });
  await expect(quickSale).toHaveAttribute("aria-pressed", "true");
  const image = flow.getByRole("img", { name: /nike dunk low sale found by model, size, or colorway/i });
  await expect(image).toBeVisible();
  await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.currentSrc)).toContain(
    testInfo.project.name.startsWith("mobile") ? "quick-sale-mobile.webp" : "quick-sale-desktop.webp",
  );
  const figureBox = await flow.locator("figure").boundingBox();
  expect(figureBox).not.toBeNull();
  expect((figureBox?.height ?? 0) / (figureBox?.width ?? 1)).toBeCloseTo(
    testInfo.project.name.startsWith("mobile") ? 1.5 : 0.75,
    1,
  );

  await flow.getByRole("button", { name: "Quick Actions" }).click();
  const quickActions = flow.getByRole("img", {
    name: /basic Home dashboard.*12 active pairs.*Stock mix of 9 available and 3 reserved pairs.*menu anchored above Quick Log listing Sell a pair, Record a payment, and Add a pair/i,
  });
  await expect(quickActions).toBeVisible();
  await expect.poll(() => quickActions.evaluate((element: HTMLImageElement) => element.currentSrc)).toContain(
    testInfo.project.name.startsWith("mobile") ? "quick-actions-mobile.webp" : "quick-actions-desktop.webp",
  );
  await expect(flow.locator("figure").locator("button, a, input, select, textarea, [tabindex]")).toHaveCount(0);

  for (const control of await selectors.all()) {
    const box = await control.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
    expect(box?.width).toBeGreaterThanOrEqual(44);
  }

  const overflow = await page.evaluate(() => {
    const figure = document.querySelector("figure");
    return {
      page: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      figure: figure ? figure.scrollWidth - figure.clientWidth : 0,
    };
  });
  expect(overflow.page).toBeLessThanOrEqual(1);
  expect(overflow.figure).toBeLessThanOrEqual(1);
});

test("planned-flow selectors are keyboard-operable with reduced motion and forced colors", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  await page.goto("/");
  const flow = page.getByRole("region", { name: /seven everyday workflows, shown clearly/i });
  const stock = flow.getByRole("button", { name: "Search Stock" });
  await stock.focus();
  await expect(stock).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(stock).toHaveAttribute("aria-pressed", "true");
  await expect(flow.getByRole("img", { name: /query 530 7 silver resolving across model, size, and colorway/i })).toBeVisible();

  const quickSale = flow.getByRole("button", { name: /quick sale, fastest path/i });
  await quickSale.focus();
  await page.keyboard.press("Enter");
  await expect(quickSale).toBeFocused();
  await expect(quickSale).toHaveAttribute("aria-pressed", "true");
  await expect(flow.locator('[aria-live="polite"]')).toContainText("Showing Quick Sale product preview");
});

test("planned-flow selection sends no product data and persists no preview state", async ({ page, context }) => {
  const writes: string[] = [];
  page.on("request", (request) => {
    if (!["GET", "HEAD"].includes(request.method())) writes.push(`${request.method()} ${request.url()}`);
  });
  await page.goto("/");
  const flow = page.getByRole("region", { name: /seven everyday workflows, shown clearly/i });
  const before = await page.evaluate(() => ({
    local: { ...localStorage },
    session: { ...sessionStorage },
    cookie: document.cookie,
  }));
  const cookiesBefore = await context.cookies();

  await flow.getByRole("button", { name: "Quick Actions" }).click();
  await flow.getByRole("button", { name: "Search Stock" }).click();
  await flow.getByRole("button", { name: "Add Stock" }).click();
  await flow.getByRole("button", { name: /quick sale, fastest path/i }).click();

  expect(writes).toEqual([]);
  expect(await context.cookies()).toEqual(cookiesBefore);
  expect(await page.evaluate(() => ({
    local: { ...localStorage },
    session: { ...sessionStorage },
    cookie: document.cookie,
  }))).toEqual(before);

  await page.reload();
  const reloadedFlow = page.getByRole("region", { name: /seven everyday workflows, shown clearly/i });
  await expect(reloadedFlow.getByRole("button", { name: /quick sale, fastest path/i })).toHaveAttribute("aria-pressed", "true");
  await expect(reloadedFlow.getByRole("img", { name: /nike dunk low sale found by model, size, or colorway/i })).toBeVisible();
});

test("social studio is unavailable without its explicit authoring flag", async ({ page }) => {
  const response = await page.goto("/social-studio/quick-log-feed-01");
  expect(response?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/i);
});

test("Web Quick-Add studio is unavailable without its explicit authoring flag", async ({ page }) => {
  const response = await page.goto("/web-quick-add-studio/growth-web-quick-add-desktop");
  expect(response?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/i);
});
