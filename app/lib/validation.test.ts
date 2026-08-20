import { describe, expect, it } from "vitest";
import {
	boundTextValue,
	isValidWaitlistEmail,
	normalizeOptionalText,
	waitlistTextLimits,
} from "@/app/lib/validation";

describe("isValidWaitlistEmail", () => {
  it.each([
    "seller@example.com",
    "name+reseller@shop.ph",
    " seller@example.com ",
  ])("accepts %s", (value) => {
    expect(isValidWaitlistEmail(value)).toBe(true);
  });

  it.each([
    "",
    "seller",
    "seller@invalid",
    "09171234567",
    "+639171234567",
    "0917 123 4567",
  ])("rejects %s", (value) => {
    expect(isValidWaitlistEmail(value)).toBe(false);
  });

	it("accepts a supported 254-character address and rejects a longer one", () => {
		const supportedEmail = `${"a".repeat(242)}@example.com`;
		const overLimitEmail = `${"a".repeat(243)}@example.com`;

		expect(supportedEmail).toHaveLength(waitlistTextLimits.email);
		expect(isValidWaitlistEmail(supportedEmail)).toBe(true);
		expect(overLimitEmail).toHaveLength(waitlistTextLimits.email + 1);
		expect(isValidWaitlistEmail(overLimitEmail)).toBe(false);
	});
});

describe("waitlist text helpers", () => {
	it("bounds values at the requested length", () => {
		expect(boundTextValue("a".repeat(61), waitlistTextLimits.name)).toBe(
			"a".repeat(60),
		);
	});

	it("trims meaningful values and treats whitespace-only values as empty", () => {
		expect(normalizeOptionalText("  Sole Supply MNL  ")).toBe(
			"Sole Supply MNL",
		);
		expect(normalizeOptionalText("   \n\t ")).toBe("");
	});

	it("preserves Unicode and punctuation", () => {
		const alias = "  Sapatos ni José 👟  ";

		expect(normalizeOptionalText(alias)).toBe("Sapatos ni José 👟");
		expect(boundTextValue(alias, 100)).toBe(alias);
	});
});
