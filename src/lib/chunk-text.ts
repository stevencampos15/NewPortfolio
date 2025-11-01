export type TextChunk = {
  content: string;
  chunkIndex: number;
  heading?: string;
};

export type ChunkOptions = {
  chunkSize?: number; // approximate characters per chunk
  overlap?: number; // approximate characters overlap between chunks
};

const isHeading = (line: string): boolean => line.trim().startsWith("#");

export const chunkText = (text: string, options?: ChunkOptions): TextChunk[] => {
  const chunkSize = options?.chunkSize ?? 1000;
  const overlap = options?.overlap ?? 200;

  if (!text || !text.trim()) {
    return [];
  }

  const paragraphs = text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks: TextChunk[] = [];
  let buffer = "";
  let lastHeading: string | undefined = undefined;
  let chunkIndex = 0;

  for (const para of paragraphs) {
    if (isHeading(para)) {
      lastHeading = para.replace(/^#+\s*/, "").trim();
    }

    if ((buffer + "\n\n" + para).length <= chunkSize) {
      buffer = buffer ? buffer + "\n\n" + para : para;
      continue;
    }

    if (buffer) {
      chunks.push({ content: buffer, chunkIndex, heading: lastHeading });
      chunkIndex += 1;
      const overlapText = buffer.slice(-overlap);
      buffer = overlapText + "\n\n" + para;
      if (buffer.length > chunkSize) {
        chunks.push({ content: buffer.slice(0, chunkSize), chunkIndex, heading: lastHeading });
        chunkIndex += 1;
        buffer = buffer.slice(chunkSize - overlap);
      }
    } else {
      chunks.push({ content: para.slice(0, chunkSize), chunkIndex, heading: lastHeading });
      chunkIndex += 1;
      buffer = para.slice(Math.max(0, para.length - overlap));
    }
  }

  if (buffer) {
    chunks.push({ content: buffer, chunkIndex, heading: lastHeading });
  }

  return chunks;
};


