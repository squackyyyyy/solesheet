import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WebQuickAddComposition } from "@/app/components/web-quick-add/web-quick-add-composition";
import { getWebQuickAddCapture } from "@/app/lib/web-quick-add-assets";

describe("WebQuickAddComposition", () => {
  it("uses React Aria table and control semantics with canonical values", () => {
    const capture = getWebQuickAddCapture("growth-web-quick-add-desktop");
    expect(capture).toBeDefined();

    const { container } = render(<WebQuickAddComposition capture={capture!} />);
    const table = screen.getByRole("grid", { name: "Web Quick-Add inventory batch" });
    expect(within(table).getAllByRole("columnheader")).toHaveLength(6);
    expect(within(table).getAllByRole("row")).toHaveLength(5);
    expect(screen.getByRole("textbox", { name: /nike dunk low brand and model/i })).toHaveValue("Nike Dunk Low");
    expect(screen.getByRole("button", { name: /nike dunk low size/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save 12 pairs/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add row/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /duplicate/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
    expect(screen.getByText("12 pairs ready")).toBeInTheDocument();
    expect(screen.getByText("₱53,200")).toBeInTheDocument();
    expect(container).not.toHaveTextContent("₱63,200");
    expect(container.querySelector('[data-browser-workspace="true"]')).not.toBeNull();
  });

  it("has independent mobile art direction with a representative row subset", () => {
    const capture = getWebQuickAddCapture("growth-web-quick-add-mobile");
    expect(capture).toBeDefined();

    const { container } = render(<WebQuickAddComposition capture={capture!} />);
    expect(container.querySelector('[data-layout="mobile"]')).not.toBeNull();
    expect(screen.getByRole("grid", { name: "Web Quick-Add inventory batch" })).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(4);
    expect(screen.getByText("Growth · Web Quick-Add")).toBeInTheDocument();
    expect(screen.getByText("Available in mobile inventory")).toBeInTheDocument();
    expect(screen.getByText("Growth plan · Planned")).toBeInTheDocument();
  });
});
