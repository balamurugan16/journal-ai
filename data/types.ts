import { analysis, journals } from "./schema";

export type NewJournal = typeof journals.$inferInsert;
export type Journal = typeof journals.$inferSelect;
export type Analysis = typeof analysis.$inferSelect;
