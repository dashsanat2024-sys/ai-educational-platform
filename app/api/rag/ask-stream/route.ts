import type { NextRequest } from "next/server"
import { streamRAGAnswer } from "@/lib/rag/rag-pipeline"

export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const { question, bookId, chapterId, maxChunks } = await req.json()

    if (!question) {
      return new Response("Missing required field: question", { status: 400 })
    }

    console.log("[v0] Streaming RAG answer for question:", question)

    const result = await streamRAGAnswer(question, {
      bookId,
      chapterId,
      maxChunks,
    })

    return result.toTextStreamResponse()
  } catch (error: any) {
    console.error("[v0] Error streaming RAG answer:", error)
    return new Response(error.message || "Failed to generate answer", {
      status: 500,
    })
  }
}
