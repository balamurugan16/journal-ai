ALTER TABLE "journals" DROP CONSTRAINT "journals_analysis_id_analysis_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "journals" ADD CONSTRAINT "journals_analysis_id_analysis_id_fk" FOREIGN KEY ("analysis_id") REFERENCES "analysis"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
