import {
  StructuredOutputParser,
} from 'langchain/output_parsers'
import { PromptTemplate } from '@langchain/core/prompts'
import { z } from "zod"

export const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    emotion: z
      .string()
      .describe("The emotion of the person who wrote the journal entry."),
    summary: z
      .string()
      .describe("A small summary about the entire journal entry in 256 letters"),
    score: z
      .number()
      .describe("sentiment score of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive"),
    tags: z
      .array(z.string())
      .describe("an array of emotions with emojis, for example, ['😔 Sad', '🙂 Happy']")
  })
)

export async function getPrompt() {
  const formatInstructions = parser.getFormatInstructions()
  const prompt = new PromptTemplate({
    template: `Analyze the following journal entry. Follow the instructions and format your response to match to format instructions, no matter what! \n{format_instructions}\n{title}\n{content}`,
    inputVariables: ['title', 'content'],
    partialVariables: { format_instructions: formatInstructions }
  });
  return prompt;
}

