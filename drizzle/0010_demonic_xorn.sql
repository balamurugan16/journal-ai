DROP TABLE "users";--> statement-breakpoint
ALTER TABLE "analysis" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "journals" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();