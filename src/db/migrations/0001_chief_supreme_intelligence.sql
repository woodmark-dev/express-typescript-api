CREATE TABLE `note` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text
);
--> statement-breakpoint
DROP TABLE `user`;