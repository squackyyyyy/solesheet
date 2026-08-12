import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  testMatch: "web-quick-add-authoring.spec.ts",
  fullyParallel: true,
  retries: 0,
  reporter: "line",
  use: {
    baseURL: "http://127.0.0.1:3102",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "mobile-chromium",
      use: { ...devices["Galaxy S9+"], viewport: { width: 360, height: 800 } },
    },
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } },
    },
  ],
  webServer: {
    command: "SHOETRACK_ENABLE_WEB_QUICK_ADD_STUDIO=1 SHOETRACK_NEXT_DIST_DIR=.next-playwright bun run dev -- --port 3102",
    url: "http://127.0.0.1:3102/web-quick-add-studio/growth-web-quick-add-desktop",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
