/*
  Ingest markdown files from src/knowledge into Pinecone.
*/
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import { embedMany } from "../src/lib/embeddings";
import { chunkText } from "../src/lib/chunk-text";
import { getPineconeNamespace, EMBEDDING_DIMENSIONS } from "../src/lib/pinecone";

type VectorMetadata = {
  source?: string;
  heading?: string;
  chunkIndex?: number;
  text?: string;
};

const KNOWLEDGE_DIR = path.resolve(process.cwd(), "src/knowledge");
const BATCH_SIZE = 100;

// Load env from .env.local first, then fallback to .env
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config();

const ensureEnv = (): void => {
  const required = [
    "OPENAI_API_KEY",
    "PINECONE_API_KEY",
    "PINECONE_INDEX",
  ];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    throw new Error(`Missing env keys: ${missing.join(", ")}. Add them to .env.local`);
  }
};

const listMarkdownFiles = async (): Promise<string[]> => {
  try {
    const entries = await fs.readdir(KNOWLEDGE_DIR, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".md"))
      .map((e) => path.join(KNOWLEDGE_DIR, e.name));
  } catch (err) {
    throw new Error(`Knowledge directory missing at ${KNOWLEDGE_DIR}. Create it and add .md files.`);
  }
};

const readFileText = async (filePath: string): Promise<string> => {
  const buf = await fs.readFile(filePath);
  return buf.toString("utf8");
};

const upsertBatch = async (
  vectors: Array<{ id: string; values: number[]; metadata: VectorMetadata }>
): Promise<void> => {
  if (!vectors.length) return;
  const ns = getPineconeNamespace();
  await ns.upsert(vectors);
};

const ingest = async (): Promise<void> => {
  ensureEnv();
  const files = await listMarkdownFiles();
  if (!files.length) {
    console.log("No markdown files found in src/knowledge. Add content then rerun.");
    return;
  }

  console.log(`Found ${files.length} files. Starting ingestion...`);

  for (const filePath of files) {
    const source = path.basename(filePath);
    const text = await readFileText(filePath);
    const chunks = chunkText(text, { chunkSize: 1000, overlap: 200 });
    if (!chunks.length) continue;

    const contents = chunks.map((c) => c.content);
    const embeddings = await embedMany(contents);

    const toUpsert = embeddings.map((values, idx) => {
      if (!values || values.length !== EMBEDDING_DIMENSIONS) {
        throw new Error(`Embedding dimension mismatch for ${source} chunk ${idx}`);
      }
      const metadata: VectorMetadata = {
        source,
        heading: chunks[idx]?.heading,
        chunkIndex: chunks[idx]?.chunkIndex ?? idx,
        text: chunks[idx]?.content ?? "",
      };
      const id = `${source}-${metadata.chunkIndex}`;
      return { id, values, metadata };
    });

    for (let i = 0; i < toUpsert.length; i += BATCH_SIZE) {
      const batch = toUpsert.slice(i, i + BATCH_SIZE);
      await upsertBatch(batch);
      console.log(`Upserted ${Math.min(i + BATCH_SIZE, toUpsert.length)} / ${toUpsert.length} from ${source}`);
    }
  }

  console.log("Ingestion completed.");
};

// Run
ingest().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});


