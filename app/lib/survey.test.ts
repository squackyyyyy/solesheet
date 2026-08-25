import { describe, expect, it } from "vitest";
import {
	createSurveySubmissionRequest,
	SURVEY_TOKEN_MAX_LENGTH,
	validateSurveySubmission,
} from "@/app/lib/survey";

const requiredCorePayload = {
	phoneType: "android",
	activeInventoryRange: "21_50",
	likelyPlan: "founding_starter_65",
	priorityFeature: "profit_tracking",
} as const;

describe("createSurveySubmissionRequest", () => {
	it("maps displayed survey copy to stable identifiers", () => {
		expect(
			createSurveySubmissionRequest("token", {
				phone: "Android",
				inventorySize: "21–50",
				currentTool: "Other",
				currentToolOther: "  POS export  ",
				priority: "Profit tracking",
				plan: "Up to ₱65/month",
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

	it.each([
		["Free only", "free"],
		["Up to ₱65/month", "founding_starter_65"],
		["Up to ₱99/month", "starter_99"],
		["Up to ₱349/month", "growth_349"],
		["Not sure yet", "not_sure"],
	] as const)("maps %s to the existing %s identifier", (displayed, stored) => {
		const request = createSurveySubmissionRequest("token", {
			phone: "Android",
			inventorySize: "21–50",
			plan: displayed,
			priority: "Profit tracking",
		});
		expect(request.likelyPlan).toBe(stored);
	});

	it("rejects unmapped display values instead of sending arbitrary text", () => {
		expect(() =>
			createSurveySubmissionRequest("token", { phone: "Windows Phone" }),
		).toThrow(/stable value/i);
	});

	it("rejects a submission request without all four displayed core answers", () => {
		expect(() =>
			createSurveySubmissionRequest("token", {
				phone: "Android",
				inventorySize: "21–50",
				priority: "Profit tracking",
			}),
		).toThrow(/four required/i);
	});
});

describe("validateSurveySubmission", () => {
	it("rejects a submission when any required core answer is missing", () => {
		expect(validateSurveySubmission({ surveyToken: "signed-token" })).toEqual({
			ok: false,
			message: "Complete the four required survey questions.",
		});
		expect(
			validateSurveySubmission({
				surveyToken: "signed-token",
				...requiredCorePayload,
				priorityFeature: undefined,
			}),
		).toEqual({
			ok: false,
			message: "Complete the four required survey questions.",
		});
	});

	it("accepts the required core without optional follow-ups", () => {
		expect(
			validateSurveySubmission({
				surveyToken: "signed-token",
				...requiredCorePayload,
			}),
		).toEqual({
			ok: true,
			value: {
				surveyToken: "signed-token",
				answers: requiredCorePayload,
			},
		});
	});

	it("accepts an omitted optional inventory method", () => {
		const result = validateSurveySubmission({
			surveyToken: "signed-token",
			...requiredCorePayload,
		});
		expect(result.ok).toBe(true);
		if (!result.ok) throw new Error(result.message);
		expect(result.value.answers.inventoryMethod).toBeUndefined();
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
				...requiredCorePayload,
				inventoryMethod: "other",
				inventoryMethodOther: "x".repeat(101),
			}).ok,
		).toBe(false);
		expect(
			validateSurveySubmission({
				surveyToken: "token",
				...requiredCorePayload,
				priorityFeature: "reports",
				priorityOther: "Different feature",
			}).ok,
		).toBe(false);
		expect(
			validateSurveySubmission({
				surveyToken: "token",
				...requiredCorePayload,
				salesChannels: ["instagram"],
				salesChannelOther: "Pop-up",
			}).ok,
		).toBe(false);
	});

	it("normalizes whitespace-only Other details to absence", () => {
		const result = validateSurveySubmission({
			surveyToken: "token",
			...requiredCorePayload,
			inventoryMethod: "other",
			inventoryMethodOther: "   ",
		});
		expect(result.ok).toBe(true);
		if (!result.ok) throw new Error(result.message);
		expect(result.value).toEqual({
			surveyToken: "token",
			answers: {
				...requiredCorePayload,
				inventoryMethod: "other",
			},
		});
	});
});
