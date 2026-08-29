import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MockupShowcase } from "@/app/components/mockups/mockup-showcase";

describe("MockupShowcase", () => {
	it("defaults to the emphasized Quick Sale responsive photograph", () => {
		render(<MockupShowcase />);

		expect(screen.getByText("Product preview gallery")).toBeInTheDocument();
		expect(
			screen.getByRole("heading", {
				name: "Seven everyday workflows, shown clearly.",
			}),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				/sale recorded → stock updated → profit calculated.*select a moment to switch the preview image./i,
			),
		).toBeInTheDocument();

		const quickSale = screen.getByRole("button", {
			name: /quick sale, fastest path/i,
		});
		expect(quickSale).toHaveAttribute("aria-pressed", "true");
		expect(quickSale).toHaveClass("bg-emerald-900");
		expect(screen.getByText("Fastest path")).toBeInTheDocument();
		expect(
			screen.getByTestId("preview-disclosure"),
		).toHaveTextContent("Illustrative sample data · Planned product preview");

		const image = screen.getByRole("img", {
			name: /paid Nike Dunk Low sale found by model, size, or colorway.*active pairs from 12 to 11.*₱1,700 sale profit.*monthly profit from ₱8,950 to ₱10,650/i,
		});
		expect(image).toHaveAttribute(
			"src",
			"/flow-mockups/quick-sale-desktop.webp",
		);
		const mobileSource = image.parentElement?.querySelector("source");
		expect(mobileSource).toHaveAttribute(
			"srcset",
			"/flow-mockups/quick-sale-mobile.webp",
		);
		expect(mobileSource).toHaveAttribute("media", "(max-width: 639px)");
		expect(screen.getByTestId("planned-flow-figure")).toHaveClass(
			"aspect-[2/3]",
			"sm:aspect-[4/3]",
		);
	});

	it("keeps exactly the seven planned-flow selectors operable", () => {
		render(<MockupShowcase />);

		const selector = screen.getByLabelText(/planned product screen selector/i);
		expect(within(selector).getAllByRole("button")).toHaveLength(7);
		for (const label of [
			"Quick Actions",
			"Search Stock",
			"Add Stock",
			"Installments",
			"Payments",
			"Backup",
		]) {
			expect(
				within(selector).getByRole("button", { name: label }),
			).toBeInTheDocument();
		}

		const figure = screen.getByTestId("planned-flow-figure");
		expect(within(figure).queryAllByRole("button")).toHaveLength(0);
		expect(within(figure).queryAllByRole("link")).toHaveLength(0);
		expect(within(figure).queryAllByRole("textbox")).toHaveLength(0);
	});

	it("switches photographs, descriptions, and source pairs while preserving focus", () => {
		render(<MockupShowcase />);

		const searchStock = screen.getByRole("button", { name: "Search Stock" });
		searchStock.focus();
		fireEvent.click(searchStock);

		expect(searchStock).toHaveFocus();
		expect(searchStock).toHaveAttribute("aria-pressed", "true");
		const image = screen.getByRole("img", {
			name: /query 530 7 silver resolving across model, size, and colorway/i,
		});
		expect(image).toHaveAttribute(
			"src",
			"/flow-mockups/search-stock-desktop.webp",
		);
		expect(image.parentElement?.querySelector("source")).toHaveAttribute(
			"srcset",
			"/flow-mockups/search-stock-mobile.webp",
		);
		expect(
			screen.getByText("Showing Search Stock product preview"),
		).toHaveAttribute("aria-live", "polite");
	});

	it("describes the complete anchored Quick Actions menu and trigger", () => {
		render(<MockupShowcase />);

		fireEvent.click(screen.getByRole("button", { name: "Quick Actions" }));
		const image = screen.getByRole("img", {
			name: /basic Home dashboard.*12 active pairs.*Stock mix of 9 available and 3 reserved pairs.*menu anchored above Quick Log listing Sell a pair, Record a payment, and Add a pair/i,
		});
		expect(image.parentElement?.querySelector("source")).toHaveAttribute(
			"srcset",
			"/flow-mockups/quick-actions-mobile.webp",
		);
	});
});
