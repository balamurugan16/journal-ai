import { integer, serial, text, varchar, timestamp, boolean, json } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"

export const journals = pgTable("journals", {
  id: serial("id").primaryKey().notNull(),
  content: text("content").notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isFavorite: boolean("is_favorite").default(false),
  analysisId: integer("analysis_id").references(() => analysis.id)
})

export const analysis = pgTable("analysis", {
  id: serial("id").primaryKey(),
  summary: varchar("summary", { length: 256 }).notNull(),
  score: integer("score").notNull(),
  tags: json("tags").$type<string[]>().default([]).notNull(),
  emotion: varchar("emotion", { length: 15 }).notNull(),
})

export const journalsRelations = relations(journals, ({ one }) => ({
  analysis: one(analysis, {
    fields: [journals.analysisId],
    references: [analysis.id]
  })
}))

