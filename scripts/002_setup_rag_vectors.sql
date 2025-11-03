-- Enable pgvector extension for vector similarity search
CREATE EXTENSION IF NOT EXISTS vector;

-- Create table for storing document chunks with embeddings
CREATE TABLE IF NOT EXISTS document_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id TEXT NOT NULL,
  chapter_id TEXT,
  chunk_index INTEGER NOT NULL,
  content TEXT NOT NULL,
  embedding vector(1536), -- OpenAI embeddings are 1536 dimensions
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster vector similarity search
CREATE INDEX IF NOT EXISTS document_chunks_embedding_idx 
ON document_chunks USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create index for book_id lookups
CREATE INDEX IF NOT EXISTS document_chunks_book_id_idx 
ON document_chunks(book_id);

-- Create index for chapter_id lookups
CREATE INDEX IF NOT EXISTS document_chunks_chapter_id_idx 
ON document_chunks(chapter_id);

-- Enable RLS
ALTER TABLE document_chunks ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read all chunks (for learning)
CREATE POLICY "Users can read all document chunks"
ON document_chunks FOR SELECT
TO authenticated
USING (true);

-- Policy: Service role can insert/update chunks
CREATE POLICY "Service role can manage chunks"
ON document_chunks FOR ALL
TO service_role
USING (true);

-- Function to search similar chunks
CREATE OR REPLACE FUNCTION match_document_chunks(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5,
  filter_book_id text DEFAULT NULL,
  filter_chapter_id text DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  book_id TEXT,
  chapter_id TEXT,
  content TEXT,
  metadata JSONB,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    document_chunks.id,
    document_chunks.book_id,
    document_chunks.chapter_id,
    document_chunks.content,
    document_chunks.metadata,
    1 - (document_chunks.embedding <=> query_embedding) AS similarity
  FROM document_chunks
  WHERE 
    (filter_book_id IS NULL OR document_chunks.book_id = filter_book_id)
    AND (filter_chapter_id IS NULL OR document_chunks.chapter_id = filter_chapter_id)
    AND 1 - (document_chunks.embedding <=> query_embedding) > match_threshold
  ORDER BY document_chunks.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
