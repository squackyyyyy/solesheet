import { chromium } from "playwright";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const origin = process.env.SHOETRACK_SOCIAL_ORIGIN || "http://127.0.0.1:3200";
const outputDir = path.resolve("artifacts/social");
const openGraphAssetId = "solesheet-link-preview";
const openGraphOutputPath = path.resolve("app/opengraph-image.png");
const registry = JSON.parse(
  await readFile(new URL("../app/lib/social-assets.json", import.meta.url), "utf8"),
);

function pngDimensions(buffer) {
  if (buffer.toString("ascii", 1, 4) !== "PNG") throw new Error("Capture is not a PNG");
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true });

try {
  for (const asset of registry) {
    const page = await browser.newPage({
      viewport: { width: asset.width, height: asset.height },
      deviceScaleFactor: 1,
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${origin}/social-studio/${asset.id}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.locator("nextjs-portal").evaluateAll((nodes) => nodes.forEach((node) => node.remove()));
    const composition = page.locator('[data-capture-ready="true"]');
    await composition.waitFor({ state: "visible" });
    await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important}" });
    const buffer = await composition.screenshot({ animations: "disabled" });
    const actual = pngDimensions(buffer);
    if (actual.width !== asset.width || actual.height !== asset.height) {
      throw new Error(`${asset.id}: expected ${asset.width}x${asset.height}, got ${actual.width}x${actual.height}`);
    }
    await writeFile(path.join(outputDir, asset.filename), buffer);
    if (asset.id === openGraphAssetId) {
      await writeFile(openGraphOutputPath, buffer);
      console.log(`synced ${path.relative(process.cwd(), openGraphOutputPath)}`);
    }
    await page.close();
    console.log(`captured ${asset.filename} (${actual.width}x${actual.height})`);
  }

  const manifest = {
    generatedBy: "bun run assets:social",
    disclosure: "Product preview",
    postingOrder: ["quick-log", "installment", "link-preview"],
    openGraphImage: {
      sourceId: openGraphAssetId,
      output: path.relative(process.cwd(), openGraphOutputPath),
    },
    assets: registry.map(({ id, filename, width, height, group, sequence, headline, caption }) => ({
      id, filename, width, height, group, sequence, headline, caption,
    })),
  };
  await writeFile(path.join(outputDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
} finally {
  await browser.close();
}
