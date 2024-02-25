"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/data"
import { journals } from "@/data/schema";
import { NewJournal } from "@/data/types";
import { asc, desc, eq, sql } from "drizzle-orm";
import { analyseJournal } from "./analysis";
import { getSupabaseUser } from "./user";

export async function createJournal({ title, content }: Pick<NewJournal, "title" | "content">) {
  const analysis = await analyseJournal({ title, content })
  const user = await getSupabaseUser()
  if (!user) {
    throw new Error("User is not authenticated")
  }
  const [createdJournal] = await db.insert(journals).values({
    title,
    content,
    userId: user.id,
    analysisId: analysis.id
  }).returning();
  revalidatePath("/journals")
  redirect(`/journals/${createdJournal.id}`)
}

export async function getAllJournals(order: "desc" | "asc" = "desc") {
  const user = await getSupabaseUser()
  if (!user) {
    throw new Error("User is not authenticated")
  }
  return db.query.journals.findMany({
    orderBy: [order === "desc" ? desc(journals.updatedAt) : asc(journals.updatedAt)],
    where: eq(journals.userId, user.id),
    with: {
      analysis: true
    }
  })
}

export async function getJournal(id: string) {
  return db.query.journals.findFirst({
    where: eq(journals.id, id),
    with: {
      analysis: true
    }
  })
}

export async function updateJournal(id: string, title: string, content: string) {
  const analysis = await analyseJournal({ content, title })
  await db
    .update(journals)
    .set({ title, updatedAt: sql`now()`, content, analysisId: analysis.id })
    .where(eq(journals.id, id));
  revalidatePath("/journals")
}

export async function toggleFavorite(id: string, isFavorite: boolean) {
  await db
    .update(journals)
    .set({ isFavorite: !isFavorite })
    .where(eq(journals.id, id));
  revalidatePath("/journals")
}

export async function deleteJournal(id: string) {
  await db.delete(journals).where(eq(journals.id, id))
  revalidatePath("/journals")
}

