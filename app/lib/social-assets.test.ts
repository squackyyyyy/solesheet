import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { socialAssets, socialProductContent } from "@/app/lib/social-assets";

function pngDimensions(filename: string) {
  const buffer = readFileSync(path.resolve("artifacts/social", filename));
  expect(buffer.toString("ascii", 1, 4)).toBe("PNG");
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

describe("social asset registry", () => {
  it("defines eleven unique, stable outputs in the approved matrix", () => {
    expect(socialAssets).toHaveLength(11);
    expect(new Set(socialAssets.map((asset) => asset.id)).size).toBe(11);
    expect(new Set(socialAssets.map((asset) => asset.filename)).size).toBe(11);
    expect(socialAssets.filter((asset) => asset.width === 1080 && asset.height === 1350)).toHaveLength(8);
    expect(socialAssets.filter((asset) => asset.width === 1080 && asset.height === 1920)).toHaveLength(2);
    expect(socialAssets.filter((asset) => asset.width === 1200 && asset.height === 630)).toHaveLength(1);
  });

  it("keeps the approved preview disclosure and shared product values", () => {
    expect(socialProductContent.brand).toBe("SoleSheet");
    expect(socialProductContent.disclosure).toBe("Product preview");
    expect(socialProductContent.dashboard.activePairs).toBe(12);
    expect(socialProductContent.formatted.inventoryBefore).toBe("₱53,200");
    expect(socialProductContent.quickLog.afterPairs).toBe(13);
    expect(socialProductContent.formatted.inventoryAfter).toBe("₱57,400");
    expect(socialProductContent.formatted.paymentAfter).toBe("₱5,500");
    expect(socialProductContent.formatted.balanceAfter).toBe("₱1,000");
    expect(socialAssets.every((asset) => asset.headline && asset.caption)).toBe(true);
    expect(socialAssets.find((asset) => asset.group === "link-preview")?.filename).toBe(
      "solesheet-link-preview.png",
    );
  });

  it("has every generated PNG at the registered dimensions", () => {
    for (const asset of socialAssets) {
      expect(existsSync(path.resolve("artifacts/social", asset.filename))).toBe(true);
      expect(pngDimensions(asset.filename)).toEqual({ width: asset.width, height: asset.height });
    }
    expect(existsSync(path.resolve("artifacts/social/manifest.json"))).toBe(true);
  });
});
