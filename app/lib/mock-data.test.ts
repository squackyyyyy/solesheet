import { describe, expect, it } from "vitest";
import {
  dashboard,
  stockroomShoes,
  webQuickAddBatch,
  webQuickAddSummary,
} from "@/app/lib/mock-data";

describe("dashboard mock data", () => {
  it("derives the canonical active stock mix from inventory records", () => {
    expect(dashboard.stockMix).toEqual({ available: 9, reserved: 3 });
    expect(dashboard.stockMix.available + dashboard.stockMix.reserved).toBe(
      dashboard.activePairs,
    );
    expect(dashboard.activePairs).toBe(12);
    expect(stockroomShoes).toHaveLength(12);
  });

  it("keeps the canonical Home summary internally consistent", () => {
    expect(dashboard).toMatchObject({
      inventoryCost: 53200,
      monthlyProfit: 8950,
      unpaidBalance: 2500,
    });
  });

  it("derives the Web Quick-Add batch summary from the canonical 12 pairs", () => {
    expect(webQuickAddBatch).toHaveLength(12);
    expect(webQuickAddBatch.every((shoe) => shoe.status === "Available")).toBe(true);
    expect(webQuickAddBatch[0]).toMatchObject({
      brand: "Nike",
      model: "Dunk Low",
      size: "US 8.5",
      colorway: "Cacao Wow",
      cost: 4800,
      target: 6200,
    });
    expect(webQuickAddBatch).toContainEqual(
      expect.objectContaining({
        brand: "ASICS",
        model: "GEL-KAYANO 14",
        size: "US 8",
        colorway: "White / Pure Silver",
        cost: 5600,
        target: 7400,
      }),
    );
    expect(webQuickAddSummary).toEqual({
      readyCount: 12,
      inventoryCost: 53200,
    });
  });
});
