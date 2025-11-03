import { embed } from "ai"

/**
 * Generate embeddings for text using OpenAI's embedding model
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: "openai/text-embedding-3-small",
    value: text,
  })

  return embedding
}

/**
 * Generate embeddings for multiple texts in batch
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const embeddings = await Promise.all(texts.map((text) => generateEmbedding(text)))

  return embeddings
}

/**
 * Chunk text into smaller pieces for embedding
 * Uses a sliding window approach with overlap
 */
export function chunkText(text: string, chunkSize = 1000, overlap = 200): string[] {
  const chunks: string[] = []
  let start = 0

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length)
    const chunk = text.slice(start, end)

    // Only add non-empty chunks
    if (chunk.trim().length > 0) {
      chunks.push(chunk.trim())
    }

    // Move start position with overlap
    start = end - overlap

    // Prevent infinite loop if we're at the end
    if (end === text.length) break
  }

  return chunks
}

/**
 * Extract text from PDF buffer
 * This is a placeholder - you'll need to implement actual PDF parsing
 */
export async function extractTextFromPDF(buffer: ArrayBuffer): Promise<string> {
  // TODO: Implement PDF text extraction using pdf-parse or similar
  // For now, return placeholder
  return "PDF text extraction not yet implemented"
}
