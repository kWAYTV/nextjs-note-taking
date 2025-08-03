CREATE TABLE "rate_limit" (
	"id" text PRIMARY KEY NOT NULL,
	"key" text,
	"count" integer,
	"last_request" bigint
);
--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_normalized_email_unique";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "normalized_email";