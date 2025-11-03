import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export interface DocumentChunk {
  id?: string
  book_id: string
  chapter_id?: string
  chunk_index: number
  content: string
  embedding: number[]
  metadata?: Record<string, any>
}

export interface SearchResult {
  id: string
  book_id: string
  chapter_id: string | null
  content: string
  metadata: Record<string, any>
  similarity: number
}

/**
 * Store document chunks with embeddings in the vector database
 */
export async function storeDocumentChunks(chunks: DocumentChunk[]) {
  const { data, error } = await supabase.from("document_chunks").insert(chunks).select()

  if (error) {
    console.error("[v0] Error storing document chunks:", error)
    throw new Error(`Failed to store document chunks: ${error.message}`)
  }

  return data
}

/**
 * Search for similar document chunks using vector similarity
 */
export async function searchSimilarChunks(
  queryEmbedding: number[],
  options: {
    matchThreshold?: number
    matchCount?: number
    bookId?: string
    chapterId?: string
  } = {},
): Promise<SearchResult[]> {
  const { matchThreshold = 0.7, matchCount = 5, bookId, chapterId } = options

  const { data, error } = await supabase.rpc("match_document_chunks", {
    query_embedding: queryEmbedding,
    match_threshold: matchThreshold,
    match_count: matchCount,
    filter_book_id: bookId || null,
    filter_chapter_id: chapterId || null,
  })

  if (error) {
    console.error("[v0] Error searching similar chunks:", error)
    throw new Error(`Failed to search similar chunks: ${error.message}`)
  }

  return data || []
}

/**
 * Delete all chunks for a specific book
 */
export async function deleteBookChunks(bookId: string) {
  const { error } = await supabase.from("document_chunks").delete().eq("book_id", bookId)

  if (error) {
    console.error("[v0] Error deleting book chunks:", error)
    throw new Error(`Failed to delete book chunks: ${error.message}`)
  }
}

/**
 * Get chunk count for a book
 */
export async function getBookChunkCount(bookId: string): Promise<number> {
  const { count, error } = await supabase
    .from("document_chunks")
    .select("*", { count: "exact", head: true })
    .eq("book_id", bookId)

  if (error) {
    console.error("[v0] Error getting chunk count:", error)
    return 0
  }

  return count || 0
}
