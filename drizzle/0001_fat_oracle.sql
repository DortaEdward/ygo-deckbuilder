CREATE TABLE `card_sets` (
	`card_id` integer NOT NULL,
	`set_name` text NOT NULL,
	`set_code` text NOT NULL,
	`set_rarity` text,
	`set_price` text,
	PRIMARY KEY(`card_id`, `set_code`),
	FOREIGN KEY (`card_id`) REFERENCES `cards`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `collection_entries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`card_id` integer NOT NULL,
	`set_code` text NOT NULL,
	`rarity` text NOT NULL,
	`condition` text DEFAULT 'near_mint' NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL,
	`notes` text,
	`acquired_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`card_id`,`set_code`) REFERENCES `card_sets`(`card_id`,`set_code`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `deck_cards` (
	`deck_id` integer NOT NULL,
	`card_id` integer NOT NULL,
	`section` text NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL,
	PRIMARY KEY(`deck_id`, `card_id`, `section`),
	FOREIGN KEY (`deck_id`) REFERENCES `decks`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`card_id`) REFERENCES `cards`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `decks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
ALTER TABLE `cards` ADD `scale` integer;--> statement-breakpoint
ALTER TABLE `cards` ADD `link_val` integer;--> statement-breakpoint
ALTER TABLE `cards` ADD `image_url` text;--> statement-breakpoint
ALTER TABLE `cards` ADD `image_url_small` text;