import { chromium } from "playwright";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const origin = process.env.SHOETRACK_WEB_QUICK_ADD_ORIGIN || "http://127.0.0.1:3202";
const masterDir = path.resolve("artifacts/web-quick-add");
const publicDir = path.resolve("public/web-quick-add");
const registryPath = path.resolve("app/lib/web-quick-add-assets.json");
const registry = JSON.parse(await readFile(registryPath, "utf8"));
const captures = registry.flatMap((destination) =>
  ["desktop", "mobile"].map((layout) => ({
    destinationId: destination.id,
    label: destination.label,
    layout,
    ...destination[layout],
  })),
);

function pngDimensions(buffer) {
  if (buffer.toString("ascii", 1, 4) !== "PNG") throw new Error("Capture is not a PNG");
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

if (registry.length !== 1 || captures.length !== 2) {
  throw new Error(`Expected one Web Quick-Add destination and two captures, got ${registry.length} and ${captures.length}`);
}

await mkdir(masterDir, { recursive: true });
await mkdir(publicDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const manifestAssets = [];

try {
  for (const asset of captures) {
    const page = await browser.newPage({
      viewport: { width: asset.sourceWidth, height: asset.sourceHeight },
      deviceScaleFactor: 2,
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const response = await page.goto(`${origin}/web-quick-add-studio/${asset.captureId}`, { waitUntil: "networkidle" });
    if (!response?.ok()) throw new Error(`${asset.captureId}: authoring route returned ${response?.status() ?? "no response"}`);
    await page.evaluate(() => document.fonts.ready);
    await page.locator("nextjs-portal").evaluateAll((nodes) => nodes.forEach((node) => node.remove()));
    await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important}" });

    const composition = page.locator('[data-capture-ready="true"]');
    await composition.waitFor({ state: "visible" });
    const buffer = await composition.screenshot({ animations: "disabled", scale: "device" });
    const actual = pngDimensions(buffer);
    if (actual.width !== asset.width || actual.height !== asset.height) {
      throw new Error(`${asset.captureId}: expected ${asset.width}x${asset.height}, got ${actual.width}x${actual.height}`);
    }

    const masterPath = path.join(masterDir, asset.masterFilename);
    const publicPath = path.join(publicDir, asset.publicFilename);
    await writeFile(masterPath, buffer);
    await sharp(buffer).webp({ quality: 84, effort: 5, smartSubsample: true }).toFile(publicPath);
    const webp = await sharp(publicPath).metadata();
    if (webp.width !== asset.width || webp.height !== asset.height || webp.format !== "webp") {
      throw new Error(`${asset.captureId}: invalid public derivative`);
    }

    manifestAssets.push({
      id: asset.destinationId,
      label: asset.label,
      layout: asset.layout,
      captureId: asset.captureId,
      masterFilename: asset.masterFilename,
      publicFilename: asset.publicFilename,
      width: actual.width,
      height: actual.height,
    });
    await page.close();
    process.stdout.write(`captured ${asset.masterFilename} and ${asset.publicFilename} (${actual.width}x${actual.height})\n`);
  }

  await writeFile(
    path.join(masterDir, "manifest.json"),
    `${JSON.stringify({ generatedBy: "bun run assets:web-quick-add", destinations: registry.length, assets: manifestAssets }, null, 2)}\n`,
  );
} finally {
  await browser.close();
}
