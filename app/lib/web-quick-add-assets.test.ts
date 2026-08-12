import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import {
  getWebQuickAddCapture,
  publicWebQuickAddPath,
  webQuickAddAssets,
} from "@/app/lib/web-quick-add-assets";

describe("webQuickAddAssets", () => {
  it("defines one stable desktop/mobile asset pair with an equivalent description", () => {
    expect(webQuickAddAssets).toHaveLength(1);
    const [asset] = webQuickAddAssets;
    expect(asset).toMatchObject({ id: "growth-web-quick-add", label: "Growth Web Quick-Add" });
    expect(asset.description).toMatch(/structured inventory batch table.*Save 12 pairs.*₱53,200.*mobile inventory/i);
    expect(asset.desktop).toMatchObject({
      captureId: "growth-web-quick-add-desktop",
      width: 3200,
      height: 2400,
      sourceWidth: 1600,
      sourceHeight: 1200,
    });
    expect(asset.mobile).toMatchObject({
      captureId: "growth-web-quick-add-mobile",
      width: 1600,
      height: 2400,
      sourceWidth: 800,
      sourceHeight: 1200,
    });
    expect(getWebQuickAddCapture(asset.desktop.captureId)?.layout).toBe("desktop");
    expect(getWebQuickAddCapture(asset.mobile.captureId)?.layout).toBe("mobile");
    expect(publicWebQuickAddPath(asset.desktop.publicFilename)).toBe("/web-quick-add/growth-web-quick-add-desktop.webp");
  });

  it("has exact PNG masters, optimized derivatives, and a reproducible manifest", async () => {
    for (const asset of webQuickAddAssets) {
      for (const source of [asset.desktop, asset.mobile]) {
        const masterPath = path.resolve("artifacts/web-quick-add", source.masterFilename);
        const publicPath = path.resolve("public/web-quick-add", source.publicFilename);
        expect(existsSync(masterPath)).toBe(true);
        expect(existsSync(publicPath)).toBe(true);

        const png = readFileSync(masterPath);
        expect(png.toString("ascii", 1, 4)).toBe("PNG");
        expect({ width: png.readUInt32BE(16), height: png.readUInt32BE(20) }).toEqual({ width: source.width, height: source.height });
        expect(await sharp(publicPath).metadata()).toMatchObject({
          format: "webp",
          width: source.width,
          height: source.height,
        });
      }
    }

    const manifest = JSON.parse(readFileSync(path.resolve("artifacts/web-quick-add/manifest.json"), "utf8"));
    expect(manifest).toMatchObject({ generatedBy: "bun run assets:web-quick-add", destinations: 1 });
    expect(manifest.assets).toHaveLength(2);
  });
});
