/** @vitest-environment-options {"url":"https://solesheet.app/"} */

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
	CloudflareWebAnalytics,
	resolveCloudflareWebAnalyticsConfig,
} from "@/app/components/cloudflare-web-analytics";

vi.mock("next/script", () => ({
	default: ({
		strategy,
		onReady,
		...props
	}: React.ComponentPropsWithoutRef<"script"> & {
		strategy?: string;
		onReady?: () => void;
	}) => {
		void strategy;
		void onReady;
		return <script {...props} />;
	},
}));

const analyticsSelector = 'script[data-cf-beacon]';

describe("resolveCloudflareWebAnalyticsConfig", () => {
	it("accepts only a matching non-local HTTP hostname with a public token", () => {
		expect(
			resolveCloudflareWebAnalyticsConfig({
				siteUrl: "https://solesheet.app",
				token: " public-site-token ",
				currentHostname: "SOLESHEET.APP",
			}),
		).toEqual({ token: "public-site-token" });
	});

	it("rejects missing, invalid, local, and unmatched configuration", () => {
		expect(
			resolveCloudflareWebAnalyticsConfig({
				siteUrl: "https://solesheet.app",
				currentHostname: "solesheet.app",
			}),
		).toBeNull();
		expect(
			resolveCloudflareWebAnalyticsConfig({
				siteUrl: "https://solesheet.solesheet.workers.dev",
				currentHostname: "solesheet.solesheet.workers.dev",
			}),
		).toBeNull();
		expect(
			resolveCloudflareWebAnalyticsConfig({
				siteUrl: "not-a-url",
				token: "public-site-token",
				currentHostname: "solesheet.app",
			}),
		).toBeNull();
		expect(
			resolveCloudflareWebAnalyticsConfig({
				siteUrl: "http://localhost:3000",
				token: "public-site-token",
				currentHostname: "localhost",
			}),
		).toBeNull();
		expect(
			resolveCloudflareWebAnalyticsConfig({
				siteUrl: "https://solesheet.app",
				token: "public-site-token",
				currentHostname: "preview.solesheet.workers.dev",
			}),
		).toBeNull();
	});
});

describe("CloudflareWebAnalytics", () => {
	it("renders exactly one non-blocking module beacon for the matching hostname", async () => {
		const view = render(
			<CloudflareWebAnalytics
				siteUrl="https://solesheet.app"
				token="public-site-token"
			/>,
		);

		await waitFor(() =>
			expect(view.container.querySelectorAll(analyticsSelector)).toHaveLength(1),
		);
		const beacon = view.container.querySelector(analyticsSelector);
		expect(beacon).toHaveAttribute(
			"src",
			"https://static.cloudflareinsights.com/beacon.min.js",
		);
		expect(beacon).toHaveAttribute("type", "module");
		expect(JSON.parse(beacon?.getAttribute("data-cf-beacon") ?? "{}")).toEqual({
			token: "public-site-token",
			spa: true,
		});
		expect(beacon?.outerHTML).not.toContain("TURNSTILE_SECRET_KEY");
		expect(beacon?.outerHTML).not.toContain("SURVEY_SUBMISSION_SECRET");

		view.rerender(
			<CloudflareWebAnalytics
				siteUrl="https://solesheet.app"
				token="public-site-token"
			/>,
		);
		expect(view.container.querySelectorAll(analyticsSelector)).toHaveLength(1);
	});

	it("emits no beacon without a token or on an unmatched hostname", async () => {
		const view = render(
			<CloudflareWebAnalytics siteUrl="https://solesheet.app" />,
		);
		expect(view.container.querySelector(analyticsSelector)).toBeNull();

		view.rerender(
			<CloudflareWebAnalytics
				siteUrl="https://preview.solesheet.workers.dev"
				token="public-site-token"
			/>,
		);
		await waitFor(() =>
			expect(view.container.querySelector(analyticsSelector)).toBeNull(),
		);
	});

	it("leaves visible application content unchanged when the beacon fails", async () => {
		const view = render(
			<>
				<main>
					<button type="button">Join the waitlist</button>
				</main>
				<CloudflareWebAnalytics
					siteUrl="https://solesheet.app"
					token="public-site-token"
				/>
			</>,
		);
		const beacon = await waitFor(() => {
			const script = view.container.querySelector(analyticsSelector);
			expect(script).not.toBeNull();
			return script!;
		});

		fireEvent.error(beacon);
		expect(
			screen.getByRole("button", { name: "Join the waitlist" }),
		).toBeEnabled();
		expect(screen.queryByRole("alert")).not.toBeInTheDocument();
	});
});
