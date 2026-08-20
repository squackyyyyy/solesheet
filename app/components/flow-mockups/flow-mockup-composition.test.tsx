import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FlowMockupComposition } from "@/app/components/flow-mockups/flow-mockup-composition";
import { getFlowMockupCapture } from "@/app/lib/flow-mockup-assets";

describe("Quick Sale flow composition", () => {
  it("connects the paid sale entry to its stock and profit outcome", () => {
    const capture = getFlowMockupCapture("quick-sale-mobile");
    expect(capture).toBeDefined();

    const { container } = render(<FlowMockupComposition capture={capture!} />);
    expect(screen.getByText("Sell a pair")).toBeInTheDocument();
    expect(screen.getByText("Search model, size, or colorway")).toBeInTheDocument();
    expect(screen.getByText("US 8.5 · Cacao Wow")).toBeInTheDocument();
    expect(screen.getByText("Today · Aug 11, 2026")).toBeInTheDocument();
    expect(screen.getByText("Paid in full")).toBeInTheDocument();
    expect(screen.getByText("Save sale →")).toBeInTheDocument();

    const outcome = container.querySelector('[data-quick-sale-outcome="paid-in-full"]');
    expect(outcome).not.toBeNull();
    expect(outcome).toHaveTextContent("Paid sale recorded");
    expect(outcome).toHaveTextContent("12→11");
    expect(outcome).toHaveTextContent("+₱1,700");
    expect(outcome).toHaveTextContent("₱8,950→₱10,650");
    expect(container).not.toHaveTextContent(/down payment|remaining balance|payment received/i);
    expect(container.querySelectorAll("button, a, input, select, textarea, [tabindex]")).toHaveLength(0);
  });

  it("uses the dedicated mobile placement without changing the desktop placement contract", () => {
    const mobile = getFlowMockupCapture("quick-sale-mobile");
    const desktop = getFlowMockupCapture("quick-sale-desktop");
    expect(mobile).toBeDefined();
    expect(desktop).toBeDefined();

    const { container, rerender } = render(<FlowMockupComposition capture={mobile!} />);
    expect(container.querySelector('[data-phone-placement="mobile-cropped-tilted"]')).toHaveClass("left-[400px]");

    rerender(<FlowMockupComposition capture={desktop!} />);
    expect(container.querySelector('[data-phone-placement="desktop-tilted"]')).toHaveClass("right-[140px]");
  });
});

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
    expect((disclosure as Node).compareDocumentPosition(screen.getByText("Add pair →")) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container).not.toHaveTextContent(/photos|supplier/i);
    expect(container.querySelectorAll("button, a, input, select, textarea, [tabindex]")).toHaveLength(0);
  });
});
