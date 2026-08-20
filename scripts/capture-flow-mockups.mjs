import { chromium } from "playwright";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const origin = process.env.SHOETRACK_FLOW_ORIGIN || "http://127.0.0.1:3201";
const masterDir = path.resolve("artifacts/flow-mockups");
const publicDir = path.resolve("public/flow-mockups");
const registryPath = path.resolve("app/lib/flow-mockup-assets.json");
const manifestPath = path.join(masterDir, "manifest.json");
const registry = JSON.parse(await readFile(registryPath, "utf8"));

const destinationFlagIndex = process.argv.indexOf("--destination");
const destinationFilter =
  destinationFlagIndex === -1 ? undefined : process.argv[destinationFlagIndex + 1];

if (destinationFlagIndex !== -1 && !destinationFilter) {
  throw new Error("--destination requires a destination id");
}

if (destinationFilter && !registry.some((destination) => destination.id === destinationFilter)) {
  throw new Error(`Unknown flow destination: ${destinationFilter}`);
}

const selectedDestinations = destinationFilter
  ? registry.filter((destination) => destination.id === destinationFilter)
  : registry;
const assets = selectedDestinations.flatMap((destination) =>
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

if (registry.length !== 7 || assets.length !== 14) {
  if (!destinationFilter) {
    throw new Error(`Expected 7 destinations and 14 captures, got ${registry.length} and ${assets.length}`);
  }
  if (registry.length !== 7 || assets.length !== 2) {
    throw new Error(`Expected 7 registered destinations and 2 selected captures, got ${registry.length} and ${assets.length}`);
  }
}

await mkdir(masterDir, { recursive: true });
await mkdir(publicDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
let manifestAssets = [];

if (destinationFilter) {
  const existingManifest = JSON.parse(await readFile(manifestPath, "utf8"));
  if (!Array.isArray(existingManifest.assets) || existingManifest.assets.length !== 14) {
    throw new Error("A scoped capture requires an existing complete 14-asset manifest");
  }
  manifestAssets = existingManifest.assets.filter((asset) => asset.id !== destinationFilter);
}

try {
  for (const asset of assets) {
    const page = await browser.newPage({
      viewport: { width: asset.sourceWidth, height: asset.sourceHeight },
      deviceScaleFactor: 2,
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${origin}/flow-mockup-studio/${asset.captureId}`, { waitUntil: "networkidle" });
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

  const manifestOrder = new Map(
    registry.flatMap((destination, destinationIndex) =>
      ["desktop", "mobile"].map((layout, layoutIndex) => [
        `${destination.id}:${layout}`,
        destinationIndex * 2 + layoutIndex,
      ]),
    ),
  );
  manifestAssets.sort(
    (first, second) =>
      manifestOrder.get(`${first.id}:${first.layout}`) -
      manifestOrder.get(`${second.id}:${second.layout}`),
  );

  if (manifestAssets.length !== 14) {
    throw new Error(`Expected a complete 14-asset manifest, got ${manifestAssets.length}`);
  }

  await writeFile(
    manifestPath,
    `${JSON.stringify({ generatedBy: "node scripts/capture-flow-mockups.mjs", destinations: registry.length, assets: manifestAssets }, null, 2)}\n`,
  );
} finally {
  await browser.close();
}
