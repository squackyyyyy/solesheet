import { describe, expect, it } from "vitest";
import {
	helloContactEmail,
	privacyContactEmail,
	supportContactEmail,
} from "@/app/lib/contact";

describe("public contact roles", () => {
	it("uses the approved branded email routes", () => {
		expect(helloContactEmail).toBe("hello@solesheet.app");
		expect(supportContactEmail).toBe("support@solesheet.app");
		expect(privacyContactEmail).toBe("privacy@solesheet.app");
	});

	it("produces the intended mailto targets", () => {
		for (const [email, target] of [
			[helloContactEmail, "mailto:hello@solesheet.app"],
			[supportContactEmail, "mailto:support@solesheet.app"],
			[privacyContactEmail, "mailto:privacy@solesheet.app"],
		] as const) {
			expect(`mailto:${email}`).toBe(target);
		}
	});
});
