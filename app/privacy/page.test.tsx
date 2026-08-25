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

		expect(privacyNotice.version).toBe("2026-08-25.4");
		expect(privacyNotice.effectiveDateLabel).toBe("August 25, 2026");
		expect(container).toHaveTextContent(`Version ${privacyNotice.version}`);
		expect(
			container.querySelector(`time[datetime="${privacyNotice.effectiveDate}"]`),
		).toHaveTextContent(privacyNotice.effectiveDateLabel);
	});
});
