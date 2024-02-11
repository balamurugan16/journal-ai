CREATE TABLE IF NOT EXISTS "journals" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"title" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
