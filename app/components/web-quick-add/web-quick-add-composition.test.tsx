import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WebQuickAddComposition } from "@/app/components/web-quick-add/web-quick-add-composition";
import { getWebQuickAddCapture } from "@/app/lib/web-quick-add-assets";

describe("WebQuickAddComposition", () => {
  it("uses React Aria table semantics for fixed-column inventory and new rows", () => {
    const capture = getWebQuickAddCapture("growth-web-quick-add-desktop");
    expect(capture).toBeDefined();

    const { container } = render(<WebQuickAddComposition capture={capture!} />);
    const table = screen.getByRole("grid", { name: "Web Inventory table" });
    expect(within(table).getAllByRole("columnheader")).toHaveLength(6);
    expect(within(table).getAllByRole("row")).toHaveLength(5);
    expect(within(table).getAllByRole("columnheader").map((column) => column.textContent)).toEqual([
      "Brand / model", "Size", "Colorway", "Cost", "Target", "Status",
    ]);
    expect(screen.getByRole("textbox", { name: /nike dunk low brand and model/i })).toHaveValue("Nike Dunk Low");
    expect(screen.getByRole("button", { name: /nike dunk low size/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add row/i })).toBeInTheDocument();
    expect(screen.getByText("Each row is one pair.")).toBeInTheDocument();
    expect(container.querySelectorAll('[data-new-inventory-row="true"]')).toHaveLength(2);
    expect(screen.getAllByText("New")).toHaveLength(2);
    expect(screen.getByText("12 pairs")).toBeInTheDocument();
    expect(screen.getByText("in inventory")).toBeInTheDocument();
    expect(screen.getByText("2 newly added")).toBeInTheDocument();
    expect(screen.getByText("on web")).toBeInTheDocument();
    expect(screen.getByText("₱53,200")).toBeInTheDocument();
    expect(container.querySelector('[data-mobile-inventory-outcome="planned"]')).toHaveTextContent("Planned: web changes appear in mobile inventory.");
    expect(screen.queryByRole("button", { name: /save/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /duplicate/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /delete/i })).not.toBeInTheDocument();
    expect(container).not.toHaveTextContent(/batch|cloud connection|pairs ready/i);
    expect(container).not.toHaveTextContent("₱63,200");
    expect(container.querySelector('[data-browser-workspace="true"]')).not.toBeNull();
  });

  it("has independent mobile art direction with both newly added rows visible", () => {
    const capture = getWebQuickAddCapture("growth-web-quick-add-mobile");
    expect(capture).toBeDefined();

    const { container } = render(<WebQuickAddComposition capture={capture!} />);
    expect(container.querySelector('[data-layout="mobile"]')).not.toBeNull();
    expect(screen.getByRole("grid", { name: "Web Inventory table" })).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(5);
    expect(container.querySelectorAll('[data-new-inventory-row="true"]')).toHaveLength(2);
    expect(screen.getByText("Growth · Web Inventory")).toBeInTheDocument();
    expect(container.querySelector('[data-mobile-inventory-outcome="planned"]')).toHaveTextContent("Planned: web changes appear in mobile inventory.");
    expect(screen.getByText("Growth plan · Planned")).toBeInTheDocument();
  });
});
