"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/data"
import { journals } from "@/data/schema";
import { Journal, NewJournal } from "@/data/types";
import { eq, sql } from "drizzle-orm";

export async function createJournal({ title, content }: NewJournal) {
  const createdJournal = await db.insert(journals).values({
    title,
    content
  }).returning({ id: journals.id })
  revalidatePath("/journals")
  redirect(`/journals/${createdJournal[0].id}`)
}

export async function getAllJournals(): Promise<Journal[]> {
  return db.select().from(journals);
}

export async function getJournal(id: number): Promise<Journal | null> {
  const result = await db.select().from(journals).where(eq(journals.id, id));
  if (result.length) return result[0]
  return null
}

export async function updateJournal(id: number, title: string, content: string) {
  await db
    .update(journals)
    .set({ title, updatedAt: sql`now()`, content })
    .where(eq(journals.id, id));
  revalidatePath("/journals")
}

