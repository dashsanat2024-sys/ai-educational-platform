import { generateObject } from "ai"
import { z } from "zod"

export const maxDuration = 60

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

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 })
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString("base64")

    // Use AI SDK to analyze the book
    const { object } = await generateObject({
      model: "anthropic/claude-sonnet-4.5",
      schema: bookAnalysisSchema,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this textbook/educational book thoroughly. Extract the table of contents, identify key topics, assess difficulty level, estimate study time, determine prerequisites, and provide a comprehensive learning path. Be detailed and accurate.`,
            },
            {
              type: "file",
              data: base64,
              mediaType: file.type || "application/pdf",
              filename: file.name,
            },
          ],
        },
      ],
    })

    return Response.json({ analysis: object })
  } catch (error) {
    console.error("[v0] Book analysis error:", error)
    return Response.json(
      { error: "Failed to analyze book", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
