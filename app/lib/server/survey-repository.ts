import "server-only";

import type { SurveyAnswersPayload } from "@/app/lib/survey";

type SurveyRepositoryOptions = {
	now?: () => Date;
};

const selectExistingResponseSql = `
	SELECT signup_id
	FROM survey_responses
	WHERE signup_id = ?
`;

const insertSurveyResponseSql = `
	INSERT INTO survey_responses (
		signup_id,
		phone_type,
		active_inventory_range,
		inventory_method,
		inventory_method_other,
		priority_feature,
		priority_other,
		likely_plan,
		installment_frequency,
		cloud_backup_preference,
		sales_channel_other,
		follow_up_availability,
		additional_comments,
		submitted_at,
		updated_at
	)
	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const insertSalesChannelSql = `
	INSERT INTO survey_sales_channels (signup_id, channel)
	VALUES (?, ?)
`;

const markSurveyCompleteSql = `
	UPDATE waitlist_signups
	SET survey_completed_at = ?, updated_at = ?
	WHERE id = ?
`;

async function responseExists(db: D1Database, signupId: string) {
	const response = await db
		.prepare(selectExistingResponseSql)
		.bind(signupId)
		.first<{ signup_id: string }>();
	return response?.signup_id === signupId;
}

export async function persistSurveyResponse(
	db: D1Database,
	signupId: string,
	answers: SurveyAnswersPayload,
	options: SurveyRepositoryOptions = {},
) {
	if (await responseExists(db, signupId)) return "existing" as const;

	const timestamp = (options.now ?? (() => new Date()))().toISOString();
	const statements: D1PreparedStatement[] = [
		db
			.prepare(insertSurveyResponseSql)
			.bind(
				signupId,
				answers.phoneType ?? null,
				answers.activeInventoryRange ?? null,
				answers.inventoryMethod ?? null,
				answers.inventoryMethodOther ?? null,
				answers.priorityFeature ?? null,
				answers.priorityOther ?? null,
				answers.likelyPlan ?? null,
				answers.installmentFrequency ?? null,
				answers.cloudBackupPreference ?? null,
				answers.salesChannelOther ?? null,
				answers.followUpAvailability ?? null,
				answers.additionalComments ?? null,
				timestamp,
				timestamp,
			),
	];

	for (const channel of answers.salesChannels ?? []) {
		statements.push(
			db.prepare(insertSalesChannelSql).bind(signupId, channel),
		);
	}
	statements.push(
		db.prepare(markSurveyCompleteSql).bind(timestamp, timestamp, signupId),
	);

	try {
		await db.batch(statements);
		return "created" as const;
	} catch (error) {
		if (await responseExists(db, signupId)) return "existing" as const;
		throw error;
	}
}
