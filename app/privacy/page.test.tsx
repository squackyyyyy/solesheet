import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { privacyNotice } from "@/app/lib/privacy";
import PrivacyPage, { metadata } from "@/app/privacy/page";

describe("PrivacyPage", () => {
	it("uses the Privacy Policy's own canonical URL", () => {
		expect(metadata.alternates?.canonical).toBe("/privacy");
		expect(metadata.openGraph?.url).toBe("/privacy");
	});

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

	it("shows the outreach-aware consent notice version", () => {
		const { container } = render(<PrivacyPage />);

		expect(privacyNotice.version).toBe("2026-09-02.1");
		expect(privacyNotice.effectiveDate).toBe("2026-09-02T00:00:00+08:00");
		expect(privacyNotice.effectiveDateLabel).toBe("September 2, 2026");
		expect(container).toHaveTextContent(`Version ${privacyNotice.version}`);
		expect(
			container.querySelector(`time[datetime="${privacyNotice.effectiveDate}"]`),
		).toHaveTextContent(privacyNotice.effectiveDateLabel);
	});

	it("discloses bounded Resend interview outreach", () => {
		const { container } = render(<PrivacyPage />);

		expect(container).toHaveTextContent(
			/send the corresponding research message through Resend/i,
		);
		expect(container).toHaveTextContent(
			/recipient email address.*sender and reply addresses.*message subject and body/i,
		);
		expect(container).toHaveTextContent(
			/delivery, bounce, complaint, failure, or suppression outcomes/i,
		);
		expect(container).toHaveTextContent(
			/does not enable open tracking or link-click tracking/i,
		);
		expect(container).toHaveTextContent(/30-day retention period for email data/i);
		expect(container).toHaveTextContent(
			/pseudonymous campaign and delivery-control metadata is removed within 90 days/i,
		);
		expect(container).toHaveTextContent(/replying to an outreach message/i);
		expect(container).toHaveTextContent(/stored in the United States/i);
	});

	it("discloses optional privacy-minimized Google Calendar booking", () => {
		const { container } = render(<PrivacyPage />);

		expect(container).toHaveTextContent(/optional public Google Calendar booking page/i);
		expect(container).toHaveTextContent(/does not require your legal name/i);
		expect(container).toHaveTextContent(/alias or shop name/i);
		expect(container).toHaveTextContent(/email address you can access/i);
		expect(container).toHaveTextContent(
			/confirmation, cancellation or rescheduling path, and Google Meet details/i,
		);
		expect(container).toHaveTextContent(/Booking is not anonymous/i);
		expect(container).toHaveTextContent(/does not use the Google Calendar API/i);
		expect(container).toHaveTextContent(
			/normally keeps a deleted event in the calendar bin for 30 days/i,
		);
		expect(container).toHaveTextContent(/Google operates servers around the world/i);
	});

	it("does not overstate outreach consent, delivery, or booking automation", () => {
		const { container } = render(<PrivacyPage />);
		const text = container.textContent ?? "";

		expect(text).not.toMatch(/consent to (general )?marketing/i);
		expect(text).not.toMatch(/provider engagement analytics/i);
		expect(text).not.toMatch(/public unsubscribe (page|endpoint)/i);
		expect(text).not.toMatch(/guaranteed (email|inbox) delivery/i);
		expect(text).not.toMatch(/anonymous booking/i);
		expect(text).not.toMatch(/legal name is required/i);
		expect(text).not.toMatch(/dashboard (automatically )?(sends|transfers).*Google/i);
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
