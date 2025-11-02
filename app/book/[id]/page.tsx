"use client"

import { useState, useEffect } from "react"
import { BookOpen, Play, FileText, Brain, ChevronRight, ArrowLeft, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Chapter {
  id: string
  number: number
  title: string
  duration: string
  completed: boolean
}

const mockChapters: Chapter[] = [
  { id: "1", number: 1, title: "Introduction to Limits", duration: "45 min", completed: true },
  { id: "2", number: 2, title: "Continuity and Derivatives", duration: "52 min", completed: true },
  { id: "3", number: 3, title: "Applications of Derivatives", duration: "48 min", completed: false },
  { id: "4", number: 4, title: "Integration Techniques", duration: "55 min", completed: false },
  { id: "5", number: 5, title: "Definite Integrals", duration: "50 min", completed: false },
]

export default function BookDetailPage() {
  const params = useParams()
  const [chapters] = useState<Chapter[]>(mockChapters)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false)

  useEffect(() => {
    const booksData = localStorage.getItem("books")
    if (booksData) {
      try {
        const books = JSON.parse(booksData)
        const currentBook = books.find((b: any) => b.id === params.id)
        if (currentBook?.analysis) {
          setAnalysis(currentBook.analysis)
        }
      } catch (error) {
        console.error("[v0] Failed to load analysis:", error)
      }
    }
  }, [params.id])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-semibold text-lg">LearnAI</span>
            </Link>

            <Button variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent">
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/library">
          <Button variant="ghost" className="mb-6 text-white/60 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Library
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Book Info Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-zinc-900 border-white/10 overflow-hidden sticky top-24">
              {/* Book Cover */}
              <div className="h-64 bg-gradient-to-br from-blue-500 to-cyan-500 relative">
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Book Details */}
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-2 text-balance">Advanced Calculus</h1>
                <p className="text-white/60 mb-4">Mathematics • Grade 12</p>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-white/60">Overall Progress</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: "45%" }} />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-white/60">Chapters</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-2xl font-bold">48</div>
                    <div className="text-sm text-white/60">Quizzes</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    <Play className="w-4 h-4 mr-2" />
                    Continue Learning
                  </Button>
                  <Button
                    onClick={() => setShowAnalysis(true)}
                    variant="outline"
                    className="w-full border-white/20 hover:bg-white/10 bg-transparent"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Smart Analysis
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Chapters List */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Chapters</h2>
              <p className="text-white/60">Select a chapter to start learning</p>
            </div>

            <div className="space-y-4">
              {chapters.map((chapter) => (
                <Link key={chapter.id} href={`/learn/${params.id}/${chapter.id}`}>
                  <Card className="bg-zinc-900 border-white/10 hover:border-white/20 transition-all hover:scale-[1.02] cursor-pointer">
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Chapter Number */}
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            chapter.completed ? "bg-gradient-to-br from-green-500 to-emerald-500" : "bg-white/5"
                          }`}
                        >
                          <span className="font-bold">{chapter.number}</span>
                        </div>

                        {/* Chapter Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg mb-1 text-balance">{chapter.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <span className="flex items-center gap-1">
                              <Play className="w-4 h-4" />
                              {chapter.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              Video + Quiz
                            </span>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2">
                          {chapter.completed && <span className="text-sm text-green-400 font-medium">Completed</span>}
                          <ChevronRight className="w-5 h-5 text-white/40" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Smart Analysis Modal */}
        {showAnalysis && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <Card className="bg-zinc-900 border-white/10 max-w-5xl w-full my-8">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold">Smart Book Analysis</h2>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setShowAnalysis(false)}
                    className="text-white/60 hover:text-white"
                  >
                    ✕
                  </Button>
                </div>

                {analysis ? (
                  <SmartAnalysisContent analysis={analysis} />
                ) : (
                  <div className="text-center py-12">
                    <Brain className="w-16 h-16 mx-auto mb-4 text-white/20" />
                    <h3 className="text-xl font-semibold mb-2">No Analysis Available</h3>
                    <p className="text-white/60 mb-6">
                      This book hasn't been analyzed yet. Upload a new book to see AI-powered analysis.
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

function SmartAnalysisContent({ analysis }: { analysis?: any }) {
  if (!analysis) {
    return <div>Loading analysis...</div>
  }

  return (
    <div className="space-y-8">
      {/* Overview Section */}
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-400" />
          Book Overview
        </h3>
        <Card className="bg-white/5 border-white/10 p-6">
          <p className="text-white/80 leading-relaxed mb-4">{analysis.summary}</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-sm text-white/60 mb-1">Difficulty Level</div>
              <div className="text-lg font-semibold text-orange-400">{analysis.difficulty}</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-sm text-white/60 mb-1">Estimated Time</div>
              <div className="text-lg font-semibold text-blue-400">{analysis.estimatedStudyHours} hours</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-sm text-white/60 mb-1">Target Audience</div>
              <div className="text-lg font-semibold text-green-400">{analysis.targetAudience}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Key Topics */}
      <div>
        <h3 className="text-xl font-bold mb-4">Key Topics Covered</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {analysis.keyTopics.map((item: any, idx: number) => (
            <Card key={idx} className="bg-white/5 border-white/10 p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold">{item.topic}</h4>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    item.importance === "High"
                      ? "bg-orange-500/20 text-orange-400"
                      : item.importance === "Medium"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {item.importance}
                </span>
              </div>
              <p className="text-sm text-white/60">{item.chapters.join(", ")}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Learning Path */}
      <div>
        <h3 className="text-xl font-bold mb-4">Recommended Learning Path</h3>
        <Card className="bg-white/5 border-white/10 p-6">
          <div className="space-y-4">
            {analysis.recommendedStudyPath.map((phase: any, idx: number) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-sm">
                    {phase.step}
                  </div>
                  {idx < analysis.recommendedStudyPath.length - 1 && <div className="w-0.5 h-full bg-white/10 mt-2" />}
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold">{phase.description}</h4>
                    <span className="text-sm text-white/60">{phase.estimatedTime}</span>
                  </div>
                  <p className="text-sm text-white/60">{phase.chapters.join(", ")}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Table of Contents */}
      <div>
        <h3 className="text-xl font-bold mb-4">Chapter Breakdown</h3>
        <div className="space-y-3">
          {analysis.tableOfContents.map((chapter: any, idx: number) => (
            <Card key={idx} className="bg-white/5 border-white/10 p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">
                    {chapter.chapter}: {chapter.title}
                  </h4>
                  <p className="text-sm text-white/60 mb-2">Topics: {chapter.topics.join(", ")}</p>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span>~{chapter.estimatedMinutes} minutes</span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs ${
                        chapter.difficulty === "Hard"
                          ? "bg-red-500/20 text-red-400"
                          : chapter.difficulty === "Medium"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {chapter.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Prerequisites */}
      <div>
        <h3 className="text-xl font-bold mb-4">Prerequisites</h3>
        <Card className="bg-white/5 border-white/10 p-6">
          <div className="flex flex-wrap gap-2">
            {analysis.prerequisites.map((prereq: string, idx: number) => (
              <span key={idx} className="px-3 py-1.5 bg-white/10 rounded-full text-sm">
                {prereq}
              </span>
            ))}
          </div>
        </Card>
      </div>

      {/* Learning Objectives */}
      <div>
        <h3 className="text-xl font-bold mb-4">Learning Objectives</h3>
        <Card className="bg-white/5 border-white/10 p-6">
          <ul className="space-y-2">
            {analysis.learningObjectives.map((objective: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2 text-white/80">
                <span className="text-blue-400 mt-1">•</span>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Practice Recommendations */}
      <div>
        <h3 className="text-xl font-bold mb-4">Practice Recommendations</h3>
        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 p-6">
          <ul className="space-y-2">
            {analysis.practiceRecommendations.map((rec: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2 text-white/80">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
