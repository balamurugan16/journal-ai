import { integer, text, varchar, timestamp, boolean, json, uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"

export const journals = pgTable("journals", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content").notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isFavorite: boolean("is_favorite").default(false),
  analysisId: uuid("analysis_id").references(() => analysis.id),
  userId: uuid("user_id").notNull()
})

export const journalsRelations = relations(journals, ({ one }) => ({
  analysis: one(analysis, {
    fields: [journals.analysisId],
    references: [analysis.id]
  }),
}))

export const analysis = pgTable("analysis", {
  id: uuid("id").primaryKey().defaultRandom(),
  summary: varchar("summary", { length: 256 }).notNull(),
  score: integer("score").notNull(),
  tags: json("tags").$type<string[]>().default([]).notNull(),
  emotion: varchar("emotion", { length: 15 }).notNull(),
})


