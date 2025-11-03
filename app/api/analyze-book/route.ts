import { generateObject } from "ai"
import { z } from "zod"

export const maxDuration = 60
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const bookAnalysisSchema = z.object({
  title: z.string().describe("The title of the book"),
  author: z.string().optional().describe("The author of the book"),
  subject: z.string().describe("The main subject or field of study"),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]),
  estimatedStudyHours: z.number().describe("Estimated hours to complete"),
  tableOfContents: z.array(
    z.object({
      chapter: z.string(),
      title: z.string(),
      pageStart: z.number().optional(),
      topics: z.array(z.string()),
      estimatedMinutes: z.number(),
      difficulty: z.enum(["Easy", "Medium", "Hard"]),
    }),
  ),
  keyTopics: z.array(
    z.object({
      topic: z.string(),
      importance: z.enum(["High", "Medium", "Low"]),
      chapters: z.array(z.string()),
    }),
  ),
  prerequisites: z.array(z.string()).describe("Required prior knowledge"),
  learningObjectives: z.array(z.string()),
  recommendedStudyPath: z.array(
    z.object({
      step: z.number(),
      description: z.string(),
      chapters: z.array(z.string()),
      estimatedTime: z.string(),
    }),
  ),
  summary: z.string().describe("A comprehensive summary of the book content"),
  targetAudience: z.string(),
  practiceRecommendations: z.array(z.string()),
})

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    // Dynamic import of pdf-parse
    const pdfParse = (await import("pdf-parse")).default
    const data = await pdfParse(buffer)
    return data.text
  } catch (error) {
    console.error("[v0] PDF parsing error:", error)
    throw new Error("Failed to extract text from PDF")
  }
}

export async function POST(req: Request) {
  try {
    console.log("[v0] Received book analysis request")

    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      console.error("[v0] No file provided")
      return Response.json({ error: "No file provided" }, { status: 400 })
    }

    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      console.error("[v0] File too large:", file.size)
      return Response.json(
        { error: `File size must be less than 10MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB` },
        { status: 413 },
      )
    }

    console.log("[v0] Analyzing book:", file.name, `(${(file.size / 1024 / 1024).toFixed(2)}MB)`)

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    console.log("[v0] Extracting text from PDF...")
    let textContent: string

    try {
      textContent = await extractTextFromPDF(buffer)
      console.log("[v0] Text extracted, length:", textContent.length, "characters")

      if (!textContent || textContent.trim().length < 100) {
        throw new Error("Insufficient text content extracted from PDF")
      }
    } catch (error) {
      console.error("[v0] Text extraction failed:", error)
      return Response.json(
        {
          error: "Failed to extract text from PDF",
          details: error instanceof Error ? error.message : "Unknown error",
          suggestion: "Please ensure the PDF contains readable text (not just images)",
        },
        { status: 400 },
      )
    }

    const maxTextLength = 50000
    const truncatedText =
      textContent.length > maxTextLength
        ? textContent.substring(0, maxTextLength) + "\n\n[Content truncated for analysis...]"
        : textContent

    console.log("[v0] Sending to AI for analysis...")

    const { object } = await generateObject({
      model: "anthropic/claude-sonnet-4.5",
      schema: bookAnalysisSchema,
      messages: [
        {
          role: "user",
          content: `Analyze this textbook/educational book thoroughly based on the extracted text content below. Extract the table of contents, identify key topics, assess difficulty level, estimate study time, determine prerequisites, and provide a comprehensive learning path. Be detailed and accurate.

Book filename: ${file.name}

Content:
${truncatedText}`,
        },
      ],
    })

    console.log("[v0] Analysis complete:", object.title)

    return Response.json({ analysis: object })
  } catch (error) {
    console.error("[v0] Book analysis error:", error)

    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    const errorDetails = {
      error: "Failed to analyze book",
      details: errorMessage,
      timestamp: new Date().toISOString(),
    }

    console.error("[v0] Error details:", errorDetails)

    return Response.json(errorDetails, { status: 500 })
  }
}
