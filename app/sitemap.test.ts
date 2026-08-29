import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
	it("lists only SoleSheet's public homepage and Privacy Policy", () => {
		const entries = sitemap();
		expect(entries).toEqual([
			{ url: "https://solesheet.app/" },
			{ url: "https://solesheet.app/privacy" },
		]);
		expect(JSON.stringify(entries)).not.toMatch(/api|studio|workers\.dev|solesheet\.ph/i);
	});
});
