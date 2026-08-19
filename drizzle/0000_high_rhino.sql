CREATE TABLE `cards` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` text,
	`frame_type` text,
	`description` text,
	`atk` integer,
	`def` integer,
	`level` integer,
	`race` text,
	`attribute` text,
	`archetype` text,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `meta` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text
);
