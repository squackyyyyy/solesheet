import { describe, expect, it } from "vitest";
import {
	canonicalSiteOrigin,
	canonicalSiteUrl,
	canonicalUrl,
	resolveCanonicalSiteUrl,
} from "@/app/lib/site-url";

describe("canonical site URL", () => {
	it("falls back to the permanent public origin when configuration is absent or invalid", () => {
		expect(resolveCanonicalSiteUrl(undefined).href).toBe("https://solesheet.app/");
		expect(resolveCanonicalSiteUrl("not a URL").href).toBe(
			"https://solesheet.app/",
		);
	});

	it("does not allow old or provider-hosted origins to become canonical", () => {
		expect(resolveCanonicalSiteUrl("https://solesheet.ph").href).toBe(
			"https://solesheet.app/",
		);
		expect(
			resolveCanonicalSiteUrl("https://solesheet.solesheet.workers.dev").href,
		).toBe("https://solesheet.app/");
		expect(canonicalSiteUrl.origin).toBe(canonicalSiteOrigin);
		expect(canonicalUrl("/privacy")).toBe("https://solesheet.app/privacy");
	});
});
