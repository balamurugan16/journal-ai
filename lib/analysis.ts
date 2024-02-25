"use server";

import { Journal } from "@/data/types";
import { getPrompt, parser } from "@/lib/prompt";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { RunnableSequence } from "@langchain/core/runnables"
import { db } from "@/data";
import { analysis } from "@/data/schema";

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY!,
  modelName: "gemini-pro",
  maxOutputTokens: 2048,
  temperature: 0
})

export async function analyseJournal(journal: Pick<Journal, "title" | "content">) {
  const prompt = await getPrompt();
  const chain = RunnableSequence.from([
    prompt,
    model,
    parser
  ]);
  const response = await chain.invoke({
    content: journal.content,
    title: journal.title,
  });
  const [newAnalysis] = await db.insert(analysis).values(response).returning();
  return newAnalysis;
}


