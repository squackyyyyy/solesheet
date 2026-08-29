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
});
