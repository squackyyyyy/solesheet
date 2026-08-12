import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { flowMockupAssets } from "@/app/lib/flow-mockup-assets";

describe("flowMockupAssets", () => {
  it("defines stable and complete desktop/mobile sources for all seven destinations", () => {
    expect(flowMockupAssets.map((asset) => asset.id)).toEqual([
      "quick-sale",
      "quick-actions",
      "search-stock",
      "add-stock",
      "installments",
      "payments",
      "backup",
    ]);
    expect(flowMockupAssets.filter((asset) => asset.fastestPath).map((asset) => asset.id)).toEqual(["quick-sale"]);
    expect(flowMockupAssets.find((asset) => asset.id === "backup")?.description).toMatch(
      /Starter plan.*cloud backup and restore.*Starter feature/i,
    );
    expect(flowMockupAssets.find((asset) => asset.id === "quick-actions")?.description).toMatch(
      /basic Home dashboard.*12 active pairs.*₱53,200.*₱8,950.*Stock mix of 9 available and 3 reserved.*Sell a pair, Record a payment, and Add a pair/i,
    );

    const ids = new Set<string>();
    const filenames = new Set<string>();
    for (const asset of flowMockupAssets) {
      expect(asset.description).toMatch(/Product preview/i);
      expect(ids.has(asset.id)).toBe(false);
      ids.add(asset.id);
      expect(asset.desktop).toMatchObject({ width: 3200, height: 2400, sourceWidth: 1600, sourceHeight: 1200 });
      expect(asset.mobile).toMatchObject({ width: 1600, height: 2400, sourceWidth: 800, sourceHeight: 1200 });
      for (const source of [asset.desktop, asset.mobile]) {
        expect(source.masterFilename).toMatch(/\.png$/);
        expect(source.publicFilename).toMatch(/\.webp$/);
        expect(filenames.has(source.masterFilename)).toBe(false);
        filenames.add(source.masterFilename);
      }
    }
  });

  it("has all fourteen masters and optimized public derivatives at registered dimensions", async () => {
    for (const asset of flowMockupAssets) {
      for (const source of [asset.desktop, asset.mobile]) {
        const masterPath = path.resolve("artifacts/flow-mockups", source.masterFilename);
        const publicPath = path.resolve("public/flow-mockups", source.publicFilename);
        expect(existsSync(masterPath)).toBe(true);
        expect(existsSync(publicPath)).toBe(true);

        const png = readFileSync(masterPath);
        expect(png.toString("ascii", 1, 4)).toBe("PNG");
        expect({ width: png.readUInt32BE(16), height: png.readUInt32BE(20) }).toEqual({ width: source.width, height: source.height });

        const webp = await sharp(publicPath).metadata();
        expect(webp).toMatchObject({ format: "webp", width: source.width, height: source.height });
      }
    }
  });
});
