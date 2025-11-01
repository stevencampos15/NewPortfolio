import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import { Pinecone } from "@pinecone-database/pinecone";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config();

const INDEX_NAME = process.env.PINECONE_INDEX ?? "portfolio-knowledge";
const API_KEY = process.env.PINECONE_API_KEY;
const CLOUD = process.env.PINECONE_CLOUD ?? "aws"; // aws|gcp|azure (serverless)
const REGION = process.env.PINECONE_REGION ?? "us-east-1";

const DIMENSION = 1536; // OpenAI text-embedding-3-small
const METRIC = "cosine" as const;

const ensureEnv = () => {
  const missing = ["PINECONE_API_KEY"].filter((k) => !process.env[k]);
  if (missing.length) {
    throw new Error(`Missing env keys: ${missing.join(", ")}. Add them to .env.local`);
  }
};

async function createIndex() {
  ensureEnv();
  const pc = new Pinecone({ apiKey: API_KEY! });

  // If index exists, check dimension and advise if mismatched
  const existing = await pc.listIndexes();
  if (existing.indexes?.some((i) => i.name === INDEX_NAME)) {
    const desc = await pc.describeIndex(INDEX_NAME);
    const currentDim = desc?.spec?.dimension ?? desc?.dimension;
    if (currentDim && currentDim !== DIMENSION) {
      console.error(
        `Index '${INDEX_NAME}' exists with dimension ${currentDim}, expected ${DIMENSION}.\n` +
        `Fix: run 'npm run delete-index' to remove it, then 'npm run create-index' to recreate; ` +
        `or set PINECONE_INDEX to a new name in .env.local.`
      );
      return;
    }
    console.log(`Index '${INDEX_NAME}' already exists and matches dimension ${DIMENSION}. Skipping creation.`);
    return;
  }

  console.log(`Creating Pinecone serverless index '${INDEX_NAME}' (${DIMENSION} dims, ${METRIC}) in ${CLOUD}/${REGION}...`);
  await pc.createIndex({
    name: INDEX_NAME,
    dimension: DIMENSION,
    metric: METRIC,
    spec: {
      serverless: {
        cloud: CLOUD as any,
        region: REGION,
      },
    },
  });

  // Wait for ready
  let status: any;
  for (let i = 0; i < 30; i++) {
    status = await pc.describeIndex(INDEX_NAME);
    if (status.status?.ready) break;
    await new Promise((r) => setTimeout(r, 4000));
  }
  if (!status?.status?.ready) {
    console.warn(`Index '${INDEX_NAME}' creation initiated but not yet ready. Try again shortly.`);
  } else {
    console.log(`Index '${INDEX_NAME}' is ready.`);
  }
}

createIndex().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});


