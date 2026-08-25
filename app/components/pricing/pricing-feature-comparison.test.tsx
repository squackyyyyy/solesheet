import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PricingFeatureComparison } from "@/app/components/pricing/pricing-feature-comparison";
import { planComparisonRows } from "@/app/lib/site-content";

describe("PricingFeatureComparison", () => {
  it("uses one cumulative fixture for the desktop and mobile semantic tables", () => {
    const { container } = render(<PricingFeatureComparison />);
    const tables = screen.getAllByRole("table");

    expect(tables).toHaveLength(2);
    expect(planComparisonRows).toHaveLength(13);
    expect(planComparisonRows.find((row) => row.feature === "Active pairs")).toMatchObject({
      free: { state: "limit", value: "20" },
      starter: { state: "limit", value: "150" },
      growth: { state: "limit", value: "750" },
    });
    expect(planComparisonRows.filter((row) => row.category === "Scale")).toEqual([
      expect.objectContaining({ feature: "Web Inventory", growth: { state: "included" } }),
      expect.objectContaining({ feature: "Spreadsheet import", growth: { state: "included" } }),
      expect.objectContaining({ feature: "Cross-device sync", growth: { state: "included" } }),
      expect.objectContaining({ feature: "Advanced reports", growth: { state: "included" } }),
    ]);

    for (const table of tables) {
      expect(within(table).getByText("Compare every SoleSheet plan feature")).toBeInTheDocument();
      expect(Array.from(table.querySelectorAll("thead th")).map((header) => header.textContent)).toEqual([
        "Feature", "Free", "Starter", "Growth",
      ]);
      expect(table.querySelectorAll('th[scope="row"]')).toHaveLength(planComparisonRows.length);
      expect(within(table).queryAllByRole("grid")).toHaveLength(0);
    }

    expect(screen.queryByText("Planned", { exact: true })).not.toBeInTheDocument();
    expect(container.querySelectorAll("button, [role=grid]")).toHaveLength(0);
  });

  it("keeps the mobile comparison closed until the native disclosure opens", () => {
    render(<PricingFeatureComparison />);

    const disclosure = screen.getByText("Compare every feature", { exact: true }).closest("details");
    expect(disclosure).not.toBeNull();
    expect(disclosure).not.toHaveAttribute("open");
    expect(within(disclosure!).getByText("Swipe to compare plans →")).toBeInTheDocument();
    expect(within(disclosure!).getByRole("region", { name: /feature comparison table.*swipe horizontally/i })).toHaveAttribute("tabindex", "0");
    expect(within(disclosure!).queryByRole("heading", { name: /compare every feature/i })).not.toBeInTheDocument();

    const summary = within(disclosure!).getByText("Compare every feature", { exact: true }).closest("summary");
    expect(summary).not.toBeNull();
    expect(within(summary!).getByText("＋")).toHaveClass("group-open:hidden");
    expect(within(summary!).getByText("−")).toHaveClass("hidden", "group-open:inline");
    fireEvent.click(summary!);
    expect(disclosure).toHaveAttribute("open");
  });
});
