ALTER TABLE "analysis" DROP CONSTRAINT "analysis_journal_id_journals_id_fk";
--> statement-breakpoint
ALTER TABLE "journals" ADD COLUMN "analysis_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "journals" ADD CONSTRAINT "journals_analysis_id_analysis_id_fk" FOREIGN KEY ("analysis_id") REFERENCES "analysis"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "analysis" DROP COLUMN IF EXISTS "journal_id";