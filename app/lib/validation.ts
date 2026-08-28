export const waitlistTextLimits = {
	name: 60,
	email: 254,
	currentToolOther: 100,
	priorityOther: 300,
	channelsOther: 100,
	additionalComments: 500,
} as const;

export function boundTextValue(value: string, maxLength: number) {
	return value.slice(0, maxLength);
}

export function normalizeOptionalText(value: string) {
	return value.trim();
}

export function isValidWaitlistEmail(value: string) {
	const normalizedValue = normalizeOptionalText(value);

	return (
		normalizedValue.length <= waitlistTextLimits.email &&
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedValue)
	);
}
