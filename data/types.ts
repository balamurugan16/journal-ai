import { journals } from "./schema";

export type NewJournal = typeof journals.$inferInsert;
export type Journal = typeof journals.$inferSelect;

