import { Pinecone, type ScoredPineconeRecord } from "@pinecone-database/pinecone";

export const EMBEDDING_MODEL = "text-embedding-3-small" as const;
export const EMBEDDING_DIMENSIONS = 1536 as const;

const getPineconeClient = (): Pinecone => {
  const apiKey = process.env.PINECONE_API_KEY;
  if (!apiKey) {
    throw new Error("PINECONE_API_KEY is not set in the environment.");
  }
  return new Pinecone({ apiKey });
};

export const getPineconeNamespace = () => {
  const indexName = process.env.PINECONE_INDEX;
  if (!indexName) {
    throw new Error("PINECONE_INDEX is not set in the environment.");
  }
  const namespaceName = process.env.PINECONE_NAMESPACE ?? "default";
  const client = getPineconeClient();
  const index = client.Index(indexName);
  return index.namespace(namespaceName);
};

export type RetrievalMatch = ScoredPineconeRecord<{
  source?: string;
  heading?: string;
  chunkIndex?: number;
  text?: string;
}>;


