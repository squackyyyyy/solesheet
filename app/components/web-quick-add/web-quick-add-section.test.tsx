import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WebQuickAddSection } from "@/app/components/web-quick-add/web-quick-add-section";
import { faqs, plans, webQuickAddContent } from "@/app/lib/site-content";

describe("WebQuickAddSection", () => {
  it("frames Web Inventory truthfully as a planned Growth proof", () => {
    render(<WebQuickAddSection />);

    const section = screen.getByRole("region", { name: webQuickAddContent.heading });
    expect(within(section).getByText(webQuickAddContent.label)).toBeInTheDocument();
    expect(within(section).getByText(webQuickAddContent.positioning)).toBeInTheDocument();
    expect(within(section).getByText(webQuickAddContent.disclosure)).toBeInTheDocument();
    expect(within(section).getByRole("img", { name: webQuickAddContent.imageDescription })).toBeInTheDocument();
  });

  it("serves separate responsive assets as one non-operable image equivalent", () => {
    render(<WebQuickAddSection />);

    const figure = screen.getByTestId("web-quick-add-figure");
    const image = within(figure).getByRole("img");
    const source = image.parentElement?.querySelector("source");
    expect(image).toHaveAttribute("src", "/web-quick-add/growth-web-quick-add-desktop.webp");
    expect(image).toHaveAttribute("width", "3200");
    expect(image).toHaveAttribute("height", "2400");
    expect(image).toHaveAttribute("loading", "lazy");
    expect(source).toHaveAttribute("srcset", "/web-quick-add/growth-web-quick-add-mobile.webp");
    expect(source).toHaveAttribute("media", "(max-width: 639px)");
    expect(source).toHaveAttribute("width", "1600");
    expect(source).toHaveAttribute("height", "2400");
    expect(figure).toHaveClass("aspect-[2/3]", "sm:aspect-[4/3]");
    expect(within(figure).queryAllByRole("button")).toHaveLength(0);
    expect(within(figure).queryAllByRole("textbox")).toHaveLength(0);
    expect(within(figure).queryAllByRole("grid")).toHaveLength(0);
  });

  it("keeps Web Inventory in the intended Growth plan while mobile inventory entry remains core", () => {
    const growth = plans.find((plan) => plan.name === "Growth");
    const free = plans.find((plan) => plan.name === "Free");

    expect(growth?.features).toContain("Web Inventory and spreadsheet import");
    expect(growth?.description).toMatch(/phone and browser/i);
    expect(free?.features).toContain("Search, filters, profit, and installments");
    expect(webQuickAddContent.positioning).toMatch(/same SoleSheet inventory from your browser.*adding rows/i);
  });

  it("keeps the FAQ aligned with the intended Growth workflow", () => {
    const faq = faqs.find((entry) => entry.question.startsWith("What is Web Inventory"));

    expect(faq?.answer).toMatch(/intended Growth feature.*same SoleSheet inventory.*browser/i);
    expect(faq?.answer).toMatch(/fixed columns.*adding a row means adding a pair/i);
    expect(faq?.answer).toMatch(/row edits.*appear in mobile inventory.*not live yet/i);
    expect(faq?.answer).toMatch(/one pair from your phone.*core product/i);
    expect(faq?.answer).toMatch(/spreadsheet import is another intended Growth feature/i);
  });
});
