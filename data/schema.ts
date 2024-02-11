import { serial, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const journals = pgTable("journals", {
  id: serial("id").primaryKey().notNull(),
  content: text("content").notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

