ALTER TABLE "analysis" ADD COLUMN "journal_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "analysis" ADD CONSTRAINT "analysis_journal_id_journals_id_fk" FOREIGN KEY ("journal_id") REFERENCES "journals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
