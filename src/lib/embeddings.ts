import { getOpenAIClient } from "@/lib/openai";
import { EMBEDDING_MODEL } from "@/lib/pinecone";

export const embedText = async (text: string): Promise<number[]> => {
  if (!text || !text.trim()) {
    return [];
  }
  const openai = getOpenAIClient();
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text,
  });
  const vector = response.data?.[0]?.embedding ?? [];
  return vector;
};

export const embedMany = async (texts: string[]): Promise<number[][]> => {
  const normalized = texts.map((t) => (t ?? "").slice(0, 8000));
  const openai = getOpenAIClient();
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: normalized,
  });
  return response.data.map((d) => d.embedding);
};


