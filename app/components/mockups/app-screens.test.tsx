import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  DashboardScreen,
  mockupMeta,
} from "@/app/components/mockups/app-screens";

describe("Home dashboard preview", () => {
  it("renders the canonical basic dashboard and decorative Stock mix", () => {
    const { container } = render(<DashboardScreen />);

    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("₱53,200")).toBeInTheDocument();
    expect(screen.getByText("₱8,950")).toBeInTheDocument();
    expect(screen.getByText("₱2,500")).toBeInTheDocument();
    expect(screen.getByText("Stock mix")).toBeInTheDocument();
    expect(screen.getByText("9 available")).toBeInTheDocument();
    expect(screen.getByText("3 reserved")).toBeInTheDocument();

    const bar = container.querySelector('[data-stock-mix-bar="true"]');
    expect(bar).toHaveAttribute("aria-hidden", "true");
    expect(bar).not.toHaveAttribute("role");
    expect(
      container.querySelector('[data-stock-mix-segment="available"]'),
    ).toHaveStyle({ width: "75%" });
    expect(
      container.querySelector('[data-stock-mix-segment="reserved"]'),
    ).toHaveStyle({ width: "25%" });
  });

  it("describes the same canonical basic summary nonvisually", () => {
    const description = mockupMeta.find(({ id }) => id === "dashboard")?.description;

    expect(description).toMatch(
      /basic Home dashboard.*12 active pairs.*₱53,200.*₱8,950.*Stock mix of 9 available and 3 reserved.*₱2,500/i,
    );
  });
});
