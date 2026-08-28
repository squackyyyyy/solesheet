import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { privacyNotice } from "@/app/lib/privacy";
import PrivacyPage from "@/app/privacy/page";

describe("PrivacyPage", () => {
	it("discloses the bounded Cloudflare Web Analytics practice", () => {
		render(<PrivacyPage />);

		expect(
			screen.getByText(/SoleSheet uses Cloudflare Web Analytics/i),
		).toBeInTheDocument();
		expect(
			screen.getByText(/does not use analytics cookies/i),
		).toBeInTheDocument();
		expect(
			screen.getByText(/do not join its measurements/i),
		).toBeInTheDocument();
		expect(
			screen.getByText(/exact device model, custom behavioral events/i),
		).toBeInTheDocument();
	});

	it("shows the analytics-aware consent notice version", () => {
		const { container } = render(<PrivacyPage />);

		expect(privacyNotice.version).toBe("2026-08-28.1");
		expect(privacyNotice.effectiveDateLabel).toBe("August 28, 2026");
		expect(container).toHaveTextContent(`Version ${privacyNotice.version}`);
		expect(
			container.querySelector(`time[datetime="${privacyNotice.effectiveDate}"]`),
		).toHaveTextContent(privacyNotice.effectiveDateLabel);
	});

	it("discloses the optional additional survey comment and its safeguards", () => {
		render(<PrivacyPage />);

		expect(
			screen.getByText(/an optional additional comment about SoleSheet/i),
		).toBeInTheDocument();
		expect(
			screen.getByText(/Please do not include passwords, payment information/i),
		).toBeInTheDocument();
		expect(
			screen.getByText(/structured survey answers, optional comments/i),
		).toBeInTheDocument();
	});
});
