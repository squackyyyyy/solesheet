import {
	normalizeOptionalText,
	waitlistTextLimits,
} from "@/app/lib/validation";

export const SURVEY_REQUEST_MAX_BYTES = 8_192;
export const SURVEY_TOKEN_MAX_LENGTH = 2_048;

export const surveyAnswerValues = {
	phoneType: ["android", "iphone", "both", "not_sure"],
	activeInventoryRange: ["1_20", "21_50", "51_150", "151_750", "750_plus"],
	inventoryMethod: [
		"google_sheets",
		"excel",
		"notes_app",
		"messenger",
		"notebook",
		"memory_only",
		"other",
	],
	priorityFeature: [
		"fast_inventory_updates",
		"profit_tracking",
		"installment_tracking",
		"web_inventory",
		"cloud_backup",
		"reports",
		"other",
	],
	likelyPlan: [
		"free",
		"starter_99",
		"growth_349",
		"founding_starter_65",
		"not_sure",
	],
	installmentFrequency: ["often", "sometimes", "rarely", "never"],
	cloudBackupPreference: ["yes", "maybe", "only_if_affordable", "no"],
	salesChannels: [
		"facebook_marketplace",
		"facebook_groups",
		"instagram",
		"tiktok",
		"shopee_lazada",
		"direct_messages",
		"physical_store",
		"other",
	],
	followUpAvailability: [
		"within_two_weeks",
		"next_month_or_later",
		"send_details_first",
		"no_thank_you",
	],
} as const;

type ValuesOf<T extends readonly string[]> = T[number];

export type SurveyAnswersPayload = {
	phoneType?: ValuesOf<typeof surveyAnswerValues.phoneType>;
	activeInventoryRange?: ValuesOf<
		typeof surveyAnswerValues.activeInventoryRange
	>;
	inventoryMethod?: ValuesOf<typeof surveyAnswerValues.inventoryMethod>;
	inventoryMethodOther?: string;
	priorityFeature?: ValuesOf<typeof surveyAnswerValues.priorityFeature>;
	priorityOther?: string;
	likelyPlan?: ValuesOf<typeof surveyAnswerValues.likelyPlan>;
	installmentFrequency?: ValuesOf<
		typeof surveyAnswerValues.installmentFrequency
	>;
	cloudBackupPreference?: ValuesOf<
		typeof surveyAnswerValues.cloudBackupPreference
	>;
	salesChannels?: ValuesOf<typeof surveyAnswerValues.salesChannels>[];
	salesChannelOther?: string;
	followUpAvailability?: ValuesOf<
		typeof surveyAnswerValues.followUpAvailability
	>;
	additionalComments?: string;
};

export type SurveySubmissionRequest = SurveyAnswersPayload & {
	surveyToken: string;
};

export type ValidSurveySubmission = {
	surveyToken: string;
	answers: SurveyAnswersPayload;
};

export type SurveyValidationResult =
	| { ok: true; value: ValidSurveySubmission }
	| { ok: false; message: string };

const displayedAnswerIds = {
	phone: {
		Android: "android",
		iPhone: "iphone",
		Both: "both",
		"Not sure": "not_sure",
	},
	inventorySize: {
		"1–20": "1_20",
		"21–50": "21_50",
		"51–150": "51_150",
		"151–750": "151_750",
		"750+": "750_plus",
	},
	currentTool: {
		"Google Sheets": "google_sheets",
		Excel: "excel",
		"Notes app": "notes_app",
		Messenger: "messenger",
		Notebook: "notebook",
		"Memory only": "memory_only",
		Other: "other",
	},
	priority: {
		"Fast inventory updates": "fast_inventory_updates",
		"Profit tracking": "profit_tracking",
		"Installment tracking": "installment_tracking",
		"Web inventory": "web_inventory",
		"Cloud backup": "cloud_backup",
		Reports: "reports",
		Other: "other",
	},
	plan: {
		"Free only": "free",
		"Up to ₱65/month": "founding_starter_65",
		"Up to ₱99/month": "starter_99",
		"Up to ₱349/month": "growth_349",
		"Not sure yet": "not_sure",
	},
	installments: {
		Often: "often",
		Sometimes: "sometimes",
		Rarely: "rarely",
		Never: "never",
	},
	backup: {
		Yes: "yes",
		Maybe: "maybe",
		"Only if affordable": "only_if_affordable",
		No: "no",
	},
	channels: {
		"Facebook Marketplace": "facebook_marketplace",
		"Facebook groups": "facebook_groups",
		Instagram: "instagram",
		TikTok: "tiktok",
		"Shopee / Lazada": "shopee_lazada",
		"Direct messages": "direct_messages",
		"Physical store": "physical_store",
		Other: "other",
	},
	interview: {
		"Yes — within the next 2 weeks": "within_two_weeks",
		"Yes — next month or later": "next_month_or_later",
		"Maybe — send me more details first": "send_details_first",
		"No, thank you": "no_thank_you",
	},
} as const;

const surveyRequestFields = [
	"surveyToken",
	"phoneType",
	"activeInventoryRange",
	"inventoryMethod",
	"inventoryMethodOther",
	"priorityFeature",
	"priorityOther",
	"likelyPlan",
	"installmentFrequency",
	"cloudBackupPreference",
	"salesChannels",
	"salesChannelOther",
	"followUpAvailability",
	"additionalComments",
] as const;

function isJsonObject(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isAllowedValue<T extends readonly string[]>(
	value: unknown,
	allowed: T,
): value is T[number] {
	return typeof value === "string" && allowed.includes(value as T[number]);
}

function normalizeDetail(value: unknown, limit: number) {
	if (value === undefined) return { ok: true as const, value: undefined };
	if (typeof value !== "string") return { ok: false as const };

	const normalized = normalizeOptionalText(value);
	if (normalized.length > limit) return { ok: false as const };
	return { ok: true as const, value: normalized || undefined };
}

function mapDisplayedAnswer(
	map: Readonly<Record<string, string>>,
	value: string | undefined,
) {
	if (!value) return undefined;
	const identifier = map[value];
	if (!identifier) throw new Error("Survey answer is not mapped to a stable value.");
	return identifier;
}

export function createSurveySubmissionRequest(
	surveyToken: string,
	answers: Record<string, string | string[]>,
): SurveySubmissionRequest {
	const request: SurveySubmissionRequest = { surveyToken };
	const phoneType = mapDisplayedAnswer(
		displayedAnswerIds.phone,
		String(answers.phone ?? ""),
	) as SurveyAnswersPayload["phoneType"];
	const activeInventoryRange = mapDisplayedAnswer(
		displayedAnswerIds.inventorySize,
		String(answers.inventorySize ?? ""),
	) as SurveyAnswersPayload["activeInventoryRange"];
	const inventoryMethod = mapDisplayedAnswer(
		displayedAnswerIds.currentTool,
		String(answers.currentTool ?? ""),
	) as SurveyAnswersPayload["inventoryMethod"];
	const priorityFeature = mapDisplayedAnswer(
		displayedAnswerIds.priority,
		String(answers.priority ?? ""),
	) as SurveyAnswersPayload["priorityFeature"];
	const likelyPlan = mapDisplayedAnswer(
		displayedAnswerIds.plan,
		String(answers.plan ?? ""),
	) as SurveyAnswersPayload["likelyPlan"];
	const installmentFrequency = mapDisplayedAnswer(
		displayedAnswerIds.installments,
		String(answers.installments ?? ""),
	) as SurveyAnswersPayload["installmentFrequency"];
	const cloudBackupPreference = mapDisplayedAnswer(
		displayedAnswerIds.backup,
		String(answers.backup ?? ""),
	) as SurveyAnswersPayload["cloudBackupPreference"];
	const followUpAvailability = mapDisplayedAnswer(
		displayedAnswerIds.interview,
		String(answers.interview ?? ""),
	) as SurveyAnswersPayload["followUpAvailability"];
	const displayedChannels = Array.isArray(answers.channels)
		? answers.channels
		: [];
	const salesChannels = displayedChannels.map(
		(channel) =>
			mapDisplayedAnswer(displayedAnswerIds.channels, channel) as ValuesOf<
				typeof surveyAnswerValues.salesChannels
			>,
	);
	if (!phoneType || !activeInventoryRange || !likelyPlan || !priorityFeature) {
		throw new Error("Complete the four required survey questions.");
	}

	request.phoneType = phoneType;
	request.activeInventoryRange = activeInventoryRange;
	request.likelyPlan = likelyPlan;
	request.priorityFeature = priorityFeature;
	if (inventoryMethod) request.inventoryMethod = inventoryMethod;
	if (installmentFrequency) request.installmentFrequency = installmentFrequency;
	if (cloudBackupPreference) {
		request.cloudBackupPreference = cloudBackupPreference;
	}
	if (followUpAvailability) request.followUpAvailability = followUpAvailability;
	if (salesChannels.length > 0) request.salesChannels = salesChannels;

	const inventoryMethodOther = normalizeOptionalText(
		String(answers.currentToolOther ?? ""),
	);
	const priorityOther = normalizeOptionalText(
		String(answers.priorityOther ?? ""),
	);
	const salesChannelOther = normalizeOptionalText(
		String(answers.channelsOther ?? ""),
	);
	const additionalComments = normalizeOptionalText(
		String(answers.comments ?? ""),
	);
	if (inventoryMethodOther) request.inventoryMethodOther = inventoryMethodOther;
	if (priorityOther) request.priorityOther = priorityOther;
	if (salesChannelOther) request.salesChannelOther = salesChannelOther;
	if (additionalComments) request.additionalComments = additionalComments;

	return request;
}

export function validateSurveySubmission(
	value: unknown,
): SurveyValidationResult {
	if (!isJsonObject(value)) {
		return { ok: false, message: "The survey submission was not recognized." };
	}

	const allowedFields = new Set<string>(surveyRequestFields);
	if (Object.keys(value).some((key) => !allowedFields.has(key))) {
		return { ok: false, message: "The survey submission was not recognized." };
	}

	if (typeof value.surveyToken !== "string") {
		return { ok: false, message: "The survey submission was not recognized." };
	}
	const surveyToken = value.surveyToken.trim();
	if (
		surveyToken.length === 0 ||
		surveyToken.length > SURVEY_TOKEN_MAX_LENGTH
	) {
		return { ok: false, message: "The survey session is no longer valid." };
	}

	const scalarFields = [
		["phoneType", surveyAnswerValues.phoneType],
		["activeInventoryRange", surveyAnswerValues.activeInventoryRange],
		["inventoryMethod", surveyAnswerValues.inventoryMethod],
		["priorityFeature", surveyAnswerValues.priorityFeature],
		["likelyPlan", surveyAnswerValues.likelyPlan],
		["installmentFrequency", surveyAnswerValues.installmentFrequency],
		["cloudBackupPreference", surveyAnswerValues.cloudBackupPreference],
		["followUpAvailability", surveyAnswerValues.followUpAvailability],
	] as const;

	for (const [field, allowed] of scalarFields) {
		if (value[field] !== undefined && !isAllowedValue(value[field], allowed)) {
			return { ok: false, message: "One or more survey answers are invalid." };
		}
	}
	const requiredCoreFields = [
		"phoneType",
		"activeInventoryRange",
		"likelyPlan",
		"priorityFeature",
	] as const;
	if (requiredCoreFields.some((field) => value[field] === undefined)) {
		return {
			ok: false,
			message: "Complete the four required survey questions.",
		};
	}

	let salesChannels: SurveyAnswersPayload["salesChannels"];
	if (value.salesChannels !== undefined) {
		if (!Array.isArray(value.salesChannels)) {
			return { ok: false, message: "One or more survey answers are invalid." };
		}
		if (
			value.salesChannels.some(
				(channel) => !isAllowedValue(channel, surveyAnswerValues.salesChannels),
			)
		) {
			return { ok: false, message: "One or more survey answers are invalid." };
		}
		const uniqueChannels = new Set(value.salesChannels);
		if (uniqueChannels.size !== value.salesChannels.length) {
			return { ok: false, message: "Sales channels cannot be repeated." };
		}
		salesChannels = value.salesChannels as SurveyAnswersPayload["salesChannels"];
	}

	const inventoryMethodOther = normalizeDetail(
		value.inventoryMethodOther,
		waitlistTextLimits.currentToolOther,
	);
	const priorityOther = normalizeDetail(
		value.priorityOther,
		waitlistTextLimits.priorityOther,
	);
	const salesChannelOther = normalizeDetail(
		value.salesChannelOther,
		waitlistTextLimits.channelsOther,
	);
	const additionalComments = normalizeDetail(
		value.additionalComments,
		waitlistTextLimits.additionalComments,
	);
	if (
		!inventoryMethodOther.ok ||
		!priorityOther.ok ||
		!salesChannelOther.ok ||
		!additionalComments.ok
	) {
		return { ok: false, message: "One or more survey details are too long." };
	}
	if (
		inventoryMethodOther.value !== undefined &&
		value.inventoryMethod !== "other"
	) {
		return {
			ok: false,
			message: "Other inventory details require the Other selection.",
		};
	}
	if (priorityOther.value !== undefined && value.priorityFeature !== "other") {
		return {
			ok: false,
			message: "Other feature details require the Other selection.",
		};
	}
	if (
		salesChannelOther.value !== undefined &&
		!salesChannels?.includes("other")
	) {
		return {
			ok: false,
			message: "Other sales-channel details require the Other selection.",
		};
	}

	const answers: SurveyAnswersPayload = {};
	for (const [field] of scalarFields) {
		if (value[field] !== undefined) {
			Object.assign(answers, { [field]: value[field] });
		}
	}
	if (salesChannels !== undefined) answers.salesChannels = salesChannels;
	if (inventoryMethodOther.value !== undefined) {
		answers.inventoryMethodOther = inventoryMethodOther.value;
	}
	if (priorityOther.value !== undefined) {
		answers.priorityOther = priorityOther.value;
	}
	if (salesChannelOther.value !== undefined) {
		answers.salesChannelOther = salesChannelOther.value;
	}
	if (additionalComments.value !== undefined) {
		answers.additionalComments = additionalComments.value;
	}

	return { ok: true, value: { surveyToken, answers } };
}
