CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`reference` text NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`object_type` text NOT NULL,
	`area` text DEFAULT '' NOT NULL,
	`comment` text DEFAULT '' NOT NULL,
	`language` text DEFAULT 'ru' NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `inquiries_reference_unique` ON `inquiries` (`reference`);