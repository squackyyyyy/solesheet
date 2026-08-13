import { describe, expect, it } from "vitest";
import {
  dashboard,
  stockroomShoes,
  webInventoryNewRowIds,
  webInventoryRows,
  webInventorySummary,
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

  it("derives the Web Inventory table and newly added state from the canonical 12 pairs", () => {
    expect(webInventoryRows).toBe(stockroomShoes);
    expect(webInventoryRows).toHaveLength(12);
    expect(webInventoryRows[0]).toMatchObject({
      brand: "Nike",
      model: "Dunk Low",
      size: "US 8.5",
      colorway: "Cacao Wow",
      cost: 4800,
      target: 6200,
      status: "Reserved",
    });
    expect(webInventoryRows).toContainEqual(
      expect.objectContaining({
        brand: "ASICS",
        model: "GEL-KAYANO 14",
        size: "US 8",
        colorway: "White / Pure Silver",
        cost: 5600,
        target: 7400,
      }),
    );
    expect(webInventoryNewRowIds).toEqual(["vomero-photon-8", "gel-1130-white-75"]);
    expect(webInventoryRows.filter((shoe) => webInventoryNewRowIds.some((id) => id === shoe.id))).toHaveLength(2);
    expect(webInventorySummary).toEqual({
      pairCount: 12,
      newlyAddedCount: 2,
      inventoryCost: 53200,
    });
  });
});
