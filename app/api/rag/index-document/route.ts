import { type NextRequest, NextResponse } from "next/server"
import { indexDocument } from "@/lib/rag/rag-pipeline"

export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const { bookId, content, metadata } = await req.json()

    if (!bookId || !content) {
      return NextResponse.json({ error: "Missing required fields: bookId and content" }, { status: 400 })
    }

    console.log("[v0] Indexing document for book:", bookId)

    const result = await indexDocument(bookId, content, metadata)

    return NextResponse.json({
      success: true,
      ...result,
    })
  } catch (error: any) {
    console.error("[v0] Error indexing document:", error)
    return NextResponse.json({ error: error.message || "Failed to index document" }, { status: 500 })
  }
}
