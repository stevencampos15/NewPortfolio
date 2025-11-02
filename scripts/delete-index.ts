// @ts-nocheck
import path from "path";
import dotenv from "dotenv";
import { Pinecone } from "@pinecone-database/pinecone";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config();

const INDEX_NAME = process.env.PINECONE_INDEX ?? "portfolio-knowledge";
const API_KEY = process.env.PINECONE_API_KEY;

const ensureEnv = () => {
  const missing = ["PINECONE_API_KEY"].filter((k) => !process.env[k]);
  if (missing.length) {
    throw new Error(`Missing env keys: ${missing.join(", ")}. Add them to .env.local`);
  }
};

async function deleteIndex() {
  ensureEnv();
  const pc = new Pinecone({ apiKey: API_KEY! });
  const existing = await pc.listIndexes();
  if (!existing.indexes?.some((i) => i.name === INDEX_NAME)) {
    console.log(`Index '${INDEX_NAME}' not found. Nothing to delete.`);
    return;
  }
  console.log(`Deleting index '${INDEX_NAME}'...`);
  await pc.deleteIndex(INDEX_NAME);
  console.log(`Deleted index '${INDEX_NAME}'.`);
}

deleteIndex().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});


