"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/data"
import { journals } from "@/data/schema";
import { NewJournal } from "@/data/types";
import { desc, eq, sql } from "drizzle-orm";
import { analyseJournal } from "./analysis";

export async function createJournal({ title, content }: NewJournal) {
  const analysis = await analyseJournal({ title, content })
  const [createdJournal] = await db.insert(journals).values({
    title,
    content,
    analysisId: analysis.id
  }).returning();
  revalidatePath("/journals")
  redirect(`/journals/${createdJournal.id}`)
}

export async function getAllJournals() {
  return db.query.journals.findMany({
    orderBy: [desc(journals.updatedAt)]
  })
}

export async function getJournal(id: number) {
  return db.query.journals.findFirst({
    where: eq(journals.id, id),
    with: {
      analysis: true
    }
  })
}

export async function updateJournal(id: number, title: string, content: string) {
  const analysis = await analyseJournal({ content, title })
  await db
    .update(journals)
    .set({ title, updatedAt: sql`now()`, content, analysisId: analysis.id })
    .where(eq(journals.id, id));
  revalidatePath("/journals")
}

export async function toggleFavorite(id: number, isFavorite: boolean) {
  await db
    .update(journals)
    .set({ isFavorite: !isFavorite })
    .where(eq(journals.id, id));
  revalidatePath("/journals")
}

export async function deleteJournal(id: number) {
  await db.delete(journals).where(eq(journals.id, id))
  revalidatePath("/journals")
}

