import { describe, expect, it } from "vitest";
import robots from "@/app/robots";

describe("robots", () => {
	it("allows public crawling and excludes non-public route families", () => {
		expect(robots()).toEqual({
			rules: {
				userAgent: "*",
				allow: "/",
				disallow: [
					"/api/",
					"/flow-mockup-studio/",
					"/social-studio/",
					"/web-quick-add-studio/",
				],
			},
			sitemap: "https://solesheet.app/sitemap.xml",
		});
	});
});
