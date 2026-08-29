import { describe, expect, it } from "vitest";
import { rootMetadata } from "@/app/lib/site-metadata";

describe("root metadata", () => {
	it("uses SoleSheet's permanent origin instead of a provider or old domain", () => {
		expect(new URL(rootMetadata.metadataBase ?? "https://invalid.test").href).toBe(
			"https://solesheet.app/",
		);
		expect(rootMetadata.alternates?.canonical).toBe("/");
		expect(rootMetadata.openGraph?.url).toBe("/");
		expect(JSON.stringify(rootMetadata)).not.toMatch(/solesheet\.ph|workers\.dev/i);
	});

	it("publishes the complete SoleSheet shoe favicon set", () => {
		const icons = JSON.stringify(rootMetadata.icons);
		expect(icons).toContain("/web/favicon.svg");
		expect(icons).toContain("/web/favicon-16.png");
		expect(icons).toContain("/web/favicon-32.png");
		expect(icons).toContain("/web/favicon-48.png");
		expect(icons).toContain("/favicon.ico?v=2026-08-29");
		expect(icons).toContain("/web/apple-touch-icon.png");
	});
});
