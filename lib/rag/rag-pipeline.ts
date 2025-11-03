import { generateText, streamText } from "ai"
import { generateEmbedding, chunkText } from "./embeddings"
import { storeDocumentChunks, searchSimilarChunks, type SearchResult } from "./vector-store"

/**
 * Process and index a document for RAG
 */
export async function indexDocument(
  bookId: string,
  content: string,
  metadata: {
    chapterId?: string
    title?: string
    author?: string
  } = {},
) {
  console.log("[v0] Starting document indexing for book:", bookId)

  // Step 1: Chunk the document
  const chunks = chunkText(content, 1000, 200)
  console.log("[v0] Created", chunks.length, "chunks")

  // Step 2: Generate embeddings for each chunk
  const embeddings = await Promise.all(chunks.map((chunk) => generateEmbedding(chunk)))
  console.log("[v0] Generated embeddings for all chunks")

  // Step 3: Store chunks with embeddings
  const documentChunks = chunks.map((chunk, index) => ({
    book_id: bookId,
    chapter_id: metadata.chapterId,
    chunk_index: index,
    content: chunk,
    embedding: embeddings[index],
    metadata: {
      title: metadata.title,
      author: metadata.author,
      chunk_count: chunks.length,
    },
  }))

  await storeDocumentChunks(documentChunks)
  console.log("[v0] Stored all chunks in vector database")

  return {
    chunkCount: chunks.length,
    bookId,
  }
}

/**
 * Retrieve relevant context for a query using RAG
 */
export async function retrieveContext(
  query: string,
  options: {
    bookId?: string
    chapterId?: string
    maxChunks?: number
  } = {},
): Promise<SearchResult[]> {
  // Generate embedding for the query
  const queryEmbedding = await generateEmbedding(query)

  // Search for similar chunks
  const results = await searchSimilarChunks(queryEmbedding, {
    matchCount: options.maxChunks || 5,
    matchThreshold: 0.7,
    bookId: options.bookId,
    chapterId: options.chapterId,
  })

  console.log("[v0] Retrieved", results.length, "relevant chunks")

  return results
}

/**
 * Generate an answer using RAG
 */
export async function generateRAGAnswer(
  question: string,
  options: {
    bookId?: string
    chapterId?: string
    maxChunks?: number
  } = {},
): Promise<string> {
  // Retrieve relevant context
  const context = await retrieveContext(question, options)

  if (context.length === 0) {
    return "I couldn't find relevant information in the document to answer your question."
  }

  // Build context string
  const contextText = context.map((chunk, i) => `[Context ${i + 1}]:\n${chunk.content}`).join("\n\n")

  // Generate answer using the context
  const { text } = await generateText({
    model: "anthropic/claude-sonnet-4.5",
    prompt: `You are a helpful educational assistant. Answer the student's question based on the provided context from their textbook.

Context from the textbook:
${contextText}

Student's question: ${question}

Instructions:
- Answer based primarily on the provided context
- If the context doesn't contain enough information, say so
- Be clear, concise, and educational
- Use examples from the context when helpful
- If relevant, suggest what chapter or section to review

Answer:`,
    maxOutputTokens: 1000,
  })

  return text
}

/**
 * Stream an answer using RAG
 */
export async function streamRAGAnswer(
  question: string,
  options: {
    bookId?: string
    chapterId?: string
    maxChunks?: number
  } = {},
) {
  // Retrieve relevant context
  const context = await retrieveContext(question, options)

  if (context.length === 0) {
    throw new Error("No relevant context found")
  }

  // Build context string
  const contextText = context.map((chunk, i) => `[Context ${i + 1}]:\n${chunk.content}`).join("\n\n")

  // Stream answer using the context
  return streamText({
    model: "anthropic/claude-sonnet-4.5",
    prompt: `You are a helpful educational assistant. Answer the student's question based on the provided context from their textbook.

Context from the textbook:
${contextText}

Student's question: ${question}

Instructions:
- Answer based primarily on the provided context
- If the context doesn't contain enough information, say so
- Be clear, concise, and educational
- Use examples from the context when helpful
- If relevant, suggest what chapter or section to review

Answer:`,
    maxOutputTokens: 1000,
  })
}
