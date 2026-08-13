import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FlowMockupComposition } from "@/app/components/flow-mockups/flow-mockup-composition";
import { getFlowMockupCapture } from "@/app/lib/flow-mockup-assets";

describe("Quick Actions flow composition", () => {
  it("renders the canonical Home modules beneath the anchored menu", () => {
    const capture = getFlowMockupCapture("quick-actions-desktop");
    expect(capture).toBeDefined();

    const { container } = render(<FlowMockupComposition capture={capture!} />);
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("₱53,200")).toBeInTheDocument();
    expect(screen.getByText("₱8,950")).toBeInTheDocument();
    expect(screen.getByText("₱2,500")).toBeInTheDocument();
    expect(screen.getByText("Stock mix")).toBeInTheDocument();
    expect(screen.getByText("9 available")).toBeInTheDocument();
    expect(screen.getByText("3 reserved")).toBeInTheDocument();
    expect(screen.getByText("Recently updated")).toBeInTheDocument();

    const bar = container.querySelector('[data-stock-mix-bar="true"]');
    expect(bar).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll("button, a, input, select, textarea, [tabindex]")).toHaveLength(0);
  });

  it("keeps the Quick Log menu in its canonical order", () => {
    const capture = getFlowMockupCapture("quick-actions-mobile");
    expect(capture).toBeDefined();
    const { container } = render(<FlowMockupComposition capture={capture!} />);
    const composition = container.querySelector('[data-asset-id="quick-actions-mobile"]');
    expect(composition).not.toBeNull();

    const text = within(composition as HTMLElement).getByText("Sell a pair").parentElement?.parentElement?.textContent;
    expect(text).toContain("Sell a pair");
    expect(container.textContent?.indexOf("Sell a pair")).toBeLessThan(
      container.textContent?.indexOf("Record a payment") ?? -1,
    );
    expect(container.textContent?.indexOf("Record a payment")).toBeLessThan(
      container.textContent?.indexOf("Add a pair") ?? -1,
    );
    expect(screen.getByText("Quick Log")).toBeInTheDocument();
    expect(screen.getByText("Hold + for more")).toBeInTheDocument();
  });
});

describe("Add Stock flow composition", () => {
  it("depicts supported optional details without adding an operable control", () => {
    const capture = getFlowMockupCapture("add-stock-desktop");
    expect(capture).toBeDefined();

    const { container } = render(<FlowMockupComposition capture={capture!} />);
    const disclosure = container.querySelector('[data-optional-details-disclosure="collapsed"]');
    expect(disclosure).toHaveTextContent("Optional details");
    expect(disclosure).toHaveTextContent("Date acquired · Status · Notes");
    expect(disclosure).toHaveTextContent("Add or edit these later");
    expect(screen.getByText("Target price").compareDocumentPosition(disclosure as Node) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(disclosure?.compareDocumentPosition(screen.getByText("Add pair →")) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container).not.toHaveTextContent(/photos|supplier/i);
    expect(container.querySelectorAll("button, a, input, select, textarea, [tabindex]")).toHaveLength(0);
  });
});
