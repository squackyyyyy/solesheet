import { describe, expect, it } from "vitest";
import {
	createSurveySubmissionRequest,
	SURVEY_TOKEN_MAX_LENGTH,
	validateSurveySubmission,
} from "@/app/lib/survey";

describe("createSurveySubmissionRequest", () => {
	it("maps displayed survey copy to stable identifiers", () => {
		expect(
			createSurveySubmissionRequest("token", {
				phone: "Android",
				inventorySize: "21–50",
				currentTool: "Other",
				currentToolOther: "  POS export  ",
				priority: "Profit tracking",
				plan: "Founding Starter — ₱65/month",
				installments: "Sometimes",
				backup: "Only if affordable",
				channels: ["Instagram", "Physical store"],
				interview: "Maybe — send me more details first",
			}),
		).toEqual({
			surveyToken: "token",
			phoneType: "android",
			activeInventoryRange: "21_50",
			inventoryMethod: "other",
			inventoryMethodOther: "POS export",
			priorityFeature: "profit_tracking",
			likelyPlan: "founding_starter_65",
			installmentFrequency: "sometimes",
			cloudBackupPreference: "only_if_affordable",
			salesChannels: ["instagram", "physical_store"],
			followUpAvailability: "send_details_first",
		});
	});

	it("rejects unmapped display values instead of sending arbitrary text", () => {
		expect(() =>
			createSurveySubmissionRequest("token", { phone: "Windows Phone" }),
		).toThrow(/stable value/i);
	});
});

describe("validateSurveySubmission", () => {
	it("accepts a token with no answers because every question is optional", () => {
		expect(validateSurveySubmission({ surveyToken: "signed-token" })).toEqual({
			ok: true,
			value: { surveyToken: "signed-token", answers: {} },
		});
	});

	it("accepts and normalizes a complete supported answer set", () => {
		expect(
			validateSurveySubmission({
				surveyToken: " signed-token ",
				phoneType: "android",
				activeInventoryRange: "21_50",
				inventoryMethod: "other",
				inventoryMethodOther: "  POS export  ",
				priorityFeature: "other",
				priorityOther: "  Supplier purchase tracking  ",
				likelyPlan: "founding_starter_65",
				installmentFrequency: "sometimes",
				cloudBackupPreference: "only_if_affordable",
				salesChannels: ["instagram", "other"],
				salesChannelOther: "  Weekend pop-ups  ",
				followUpAvailability: "send_details_first",
			}),
		).toEqual({
			ok: true,
			value: {
				surveyToken: "signed-token",
				answers: {
					phoneType: "android",
					activeInventoryRange: "21_50",
					inventoryMethod: "other",
					inventoryMethodOther: "POS export",
					priorityFeature: "other",
					priorityOther: "Supplier purchase tracking",
					likelyPlan: "founding_starter_65",
					installmentFrequency: "sometimes",
					cloudBackupPreference: "only_if_affordable",
					salesChannels: ["instagram", "other"],
					salesChannelOther: "Weekend pop-ups",
					followUpAvailability: "send_details_first",
				},
			},
		});
	});

	it.each([
		[null],
		[{ surveyToken: "token", unknown: true }],
		[{ surveyToken: "" }],
		[{ surveyToken: "x".repeat(SURVEY_TOKEN_MAX_LENGTH + 1) }],
		[{ surveyToken: "token", phoneType: "windows_phone" }],
		[{ surveyToken: "token", salesChannels: "instagram" }],
		[{ surveyToken: "token", salesChannels: ["instagram", "instagram"] }],
		[{ surveyToken: "token", salesChannels: ["unknown"] }],
	])("rejects malformed or unsupported input %#", (value) => {
		expect(validateSurveySubmission(value).ok).toBe(false);
	});

	it("rejects over-limit and inconsistent Other details", () => {
		expect(
			validateSurveySubmission({
				surveyToken: "token",
				inventoryMethod: "other",
				inventoryMethodOther: "x".repeat(101),
			}).ok,
		).toBe(false);
		expect(
			validateSurveySubmission({
				surveyToken: "token",
				priorityFeature: "reports",
				priorityOther: "Different feature",
			}).ok,
		).toBe(false);
		expect(
			validateSurveySubmission({
				surveyToken: "token",
				salesChannels: ["instagram"],
				salesChannelOther: "Pop-up",
			}).ok,
		).toBe(false);
	});

	it("normalizes whitespace-only Other details to absence", () => {
		const result = validateSurveySubmission({
			surveyToken: "token",
			inventoryMethod: "other",
			inventoryMethodOther: "   ",
		});
		expect(result.ok).toBe(true);
		if (!result.ok) throw new Error(result.message);
		expect(result.value).toEqual({
			surveyToken: "token",
			answers: { inventoryMethod: "other" },
		});
	});
});
