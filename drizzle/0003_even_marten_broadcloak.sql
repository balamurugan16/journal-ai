CREATE TABLE IF NOT EXISTS "analysis" (
	"summary" varchar(256) NOT NULL,
	"score" integer NOT NULL,
	"tags" json DEFAULT '[]'::json NOT NULL,
	"emotion" varchar(15) NOT NULL
);
