"use server";

import { Journal } from "@/data/types";
import { getPrompt, parser, type LLMAnalysis } from "@/lib/prompt";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { LLMChain } from "langchain/chains"
import { db } from "@/data";
import { analysis } from "@/data/schema";
import { eq } from "drizzle-orm";

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY!,
  modelName: "gemini-pro",
  maxOutputTokens: 2048,
  temperature: 0
})

export async function createAnalysis(journal: Pick<Journal, "title" | "content">) {
  const _analysis = await analyseJournal(journal)
  const [newAnalysis] = await db.insert(analysis).values(_analysis).returning();
  return newAnalysis;
}

export async function updateAnalysis(journal: Pick<Journal, "title" | "content" | "analysisId">) {
  const _analysis = await analyseJournal(journal)
  await db
    .update(analysis)
    .set(_analysis)
    .where(eq(analysis.id, journal.analysisId!));
}

export async function analyseJournal(journal: Pick<Journal, "title" | "content">) {
  const prompt = await getPrompt();
  const chain = new LLMChain({
    prompt: prompt,
    llm: model,
    outputParser: parser,
    outputKey: "response"
  })
  const output = await chain.invoke({
    content: journal.content,
    title: journal.title,
  });
  return output.response as LLMAnalysis
}

