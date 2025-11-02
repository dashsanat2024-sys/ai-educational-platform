"use client"

import { useState } from "react"
import {
  BookOpen,
  Play,
  Pause,
  Volume2,
  FileText,
  Brain,
  Lightbulb,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useParams } from "next/navigation"

interface KeyConcept {
  term: string
  definition: string
}

const mockKeyConcepts: KeyConcept[] = [
  {
    term: "Limit",
    definition: "The value that a function approaches as the input approaches some value.",
  },
  {
    term: "Continuity",
    definition: "A function is continuous if it has no breaks, jumps, or holes in its graph.",
  },
  {
    term: "Derivative",
    definition: "The rate of change of a function with respect to a variable.",
  },
]

export default function LearnPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState<"summary" | "video" | "audio" | "concepts">("summary")
  const [isPlaying, setIsPlaying] = useState(false)

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

            <div className="flex items-center gap-4">
              <span className="text-sm text-white/60 hidden md:block">Chapter 1 of 12</span>
              <Button variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href={`/book/${params.bookId}`}>
          <Button variant="ghost" className="mb-6 text-white/60 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Chapters
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Learning Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chapter Title */}
            <div>
              <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                <span>Chapter 1</span>
                <span>•</span>
                <span>Advanced Calculus</span>
              </div>
              <h1 className="text-3xl font-bold mb-2 text-balance">Introduction to Limits</h1>
              <p className="text-white/60">Learn the fundamental concepts of limits and their applications</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 border-b border-white/10">
              <button
                onClick={() => setActiveTab("summary")}
                className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === "summary" ? "text-blue-400" : "text-white/60 hover:text-white"
                }`}
              >
                <Brain className="w-4 h-4 inline mr-2" />
                AI Summary
                {activeTab === "summary" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />}
              </button>
              <button
                onClick={() => setActiveTab("video")}
                className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === "video" ? "text-blue-400" : "text-white/60 hover:text-white"
                }`}
              >
                <Play className="w-4 h-4 inline mr-2" />
                Video Lesson
                {activeTab === "video" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />}
              </button>
              <button
                onClick={() => setActiveTab("audio")}
                className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === "audio" ? "text-blue-400" : "text-white/60 hover:text-white"
                }`}
              >
                <Volume2 className="w-4 h-4 inline mr-2" />
                Audio
                {activeTab === "audio" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />}
              </button>
              <button
                onClick={() => setActiveTab("concepts")}
                className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === "concepts" ? "text-blue-400" : "text-white/60 hover:text-white"
                }`}
              >
                <Lightbulb className="w-4 h-4 inline mr-2" />
                Key Concepts
                {activeTab === "concepts" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />}
              </button>
            </div>

            {/* Content Area */}
            <Card className="bg-zinc-900 border-white/10 p-6">
              {activeTab === "summary" && (
                <div className="space-y-6">
                  {/* AI Badge */}
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-blue-400 font-medium">AI Generated Summary</span>
                    </div>
                  </div>

                  {/* Summary Content */}
                  <div className="prose prose-invert max-w-none">
                    <h3 className="text-xl font-semibold mb-4">Chapter Overview</h3>
                    <p className="text-white/80 leading-relaxed mb-4">
                      This chapter introduces the fundamental concept of limits in calculus. A limit describes the
                      behavior of a function as its input approaches a particular value. Understanding limits is crucial
                      as they form the foundation for derivatives and integrals.
                    </p>

                    <h3 className="text-xl font-semibold mb-4 mt-6">What You'll Learn</h3>
                    <ul className="space-y-3 text-white/80">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>How to evaluate limits using algebraic techniques and graphical methods</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Understanding one-sided limits and their significance in function behavior</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Recognizing when limits exist and when they don't through practical examples</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Applying limit laws to simplify complex limit problems</span>
                      </li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-4 mt-6">Key Takeaways</h3>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <p className="text-white/80 leading-relaxed">
                        Limits allow us to analyze function behavior at points where the function might not even be
                        defined. This concept is essential for understanding continuity, derivatives, and the broader
                        field of calculus. Mastering limits will enable you to solve real-world problems involving rates
                        of change and optimization.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "video" && (
                <div className="space-y-6">
                  {/* Video Player */}
                  <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20" />
                    <Button
                      size="lg"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="relative z-10 w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                    >
                      {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                    </Button>
                  </div>

                  {/* Video Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Introduction to Limits - Video Lesson</h3>
                    <p className="text-white/60 text-sm">Duration: 45 minutes</p>
                  </div>

                  {/* Video Description */}
                  <div className="text-white/80 leading-relaxed">
                    <p>
                      In this comprehensive video lesson, we'll explore the concept of limits through visual
                      demonstrations and step-by-step examples. You'll see how limits work graphically and learn
                      practical techniques for solving limit problems.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "audio" && (
                <div className="space-y-6">
                  {/* Audio Player */}
                  <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <Button
                        size="lg"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                      >
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                      </Button>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">Audio Explanation</h3>
                        <p className="text-sm text-white/60">Chapter 1: Introduction to Limits</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 w-1/3" />
                      </div>
                      <div className="flex items-center justify-between text-xs text-white/60">
                        <span>15:23</span>
                        <span>45:00</span>
                      </div>
                    </div>
                  </div>

                  {/* Audio Description */}
                  <div className="text-white/80 leading-relaxed">
                    <p className="mb-4">
                      Listen to a detailed audio explanation of limits, perfect for learning on the go. This audio
                      lesson covers all the key concepts with clear explanations and examples.
                    </p>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <p className="text-sm text-white/80">
                        <strong>Tip:</strong> Use audio lessons during commutes or while exercising to maximize your
                        learning time.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "concepts" && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Key Concepts & Definitions</h3>
                  {mockKeyConcepts.map((concept, index) => (
                    <Card key={index} className="bg-zinc-800 border-white/10 p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                          <Lightbulb className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{concept.term}</h4>
                          <p className="text-white/70 text-sm leading-relaxed">{concept.definition}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <Button variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent" disabled>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Chapter
              </Button>
              <Link href={`/quiz/${params.bookId}/${params.chapterId}`}>
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                  Take Quiz
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-24">
              {/* Progress Card */}
              <Card className="bg-zinc-900 border-white/10 p-6">
                <h3 className="font-semibold mb-4">Your Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-white/60">Chapter Progress</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: "65%" }} />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Time Spent</span>
                      <span className="font-medium">28 min</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Quiz Score</span>
                      <span className="font-medium">Not taken</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-zinc-900 border-white/10 p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/20 hover:bg-white/10 bg-transparent"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View Notes
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/20 hover:bg-white/10 bg-transparent"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Ask AI Question
                  </Button>
                </div>
              </Card>

              {/* Tips Card */}
              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 p-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2 text-blue-400">Study Tip</h3>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Try working through examples on paper as you watch the video. Active practice helps reinforce
                      concepts better than passive watching.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
