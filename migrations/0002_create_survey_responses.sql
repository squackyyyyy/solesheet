CREATE TABLE survey_responses (
	signup_id TEXT PRIMARY KEY NOT NULL,
	phone_type TEXT,
	active_inventory_range TEXT,
	inventory_method TEXT,
	inventory_method_other TEXT,
	priority_feature TEXT,
	priority_other TEXT,
	likely_plan TEXT,
	installment_frequency TEXT,
	cloud_backup_preference TEXT,
	sales_channel_other TEXT,
	follow_up_availability TEXT,
	submitted_at TEXT NOT NULL,
	updated_at TEXT NOT NULL,
	FOREIGN KEY (signup_id) REFERENCES waitlist_signups(id) ON DELETE CASCADE,
	CHECK (phone_type IS NULL OR phone_type IN ('android', 'iphone', 'both', 'not_sure')),
	CHECK (active_inventory_range IS NULL OR active_inventory_range IN ('1_20', '21_50', '51_150', '151_750', '750_plus')),
	CHECK (inventory_method IS NULL OR inventory_method IN ('google_sheets', 'excel', 'notes_app', 'messenger', 'notebook', 'memory_only', 'other')),
	CHECK (inventory_method_other IS NULL OR (inventory_method = 'other' AND length(inventory_method_other) BETWEEN 1 AND 100)),
	CHECK (priority_feature IS NULL OR priority_feature IN ('fast_inventory_updates', 'profit_tracking', 'installment_tracking', 'web_inventory', 'cloud_backup', 'reports', 'other')),
	CHECK (priority_other IS NULL OR (priority_feature = 'other' AND length(priority_other) BETWEEN 1 AND 300)),
	CHECK (likely_plan IS NULL OR likely_plan IN ('free', 'starter_99', 'growth_349', 'founding_starter_65', 'not_sure')),
	CHECK (installment_frequency IS NULL OR installment_frequency IN ('often', 'sometimes', 'rarely', 'never')),
	CHECK (cloud_backup_preference IS NULL OR cloud_backup_preference IN ('yes', 'maybe', 'only_if_affordable', 'no')),
	CHECK (sales_channel_other IS NULL OR length(sales_channel_other) BETWEEN 1 AND 100),
	CHECK (follow_up_availability IS NULL OR follow_up_availability IN ('within_two_weeks', 'next_month_or_later', 'send_details_first', 'no_thank_you'))
);

CREATE TABLE survey_sales_channels (
	signup_id TEXT NOT NULL,
	channel TEXT NOT NULL,
	PRIMARY KEY (signup_id, channel),
	FOREIGN KEY (signup_id) REFERENCES survey_responses(signup_id) ON DELETE CASCADE,
	CHECK (channel IN ('facebook_marketplace', 'facebook_groups', 'instagram', 'tiktok', 'shopee_lazada', 'direct_messages', 'physical_store', 'other'))
) WITHOUT ROWID;
