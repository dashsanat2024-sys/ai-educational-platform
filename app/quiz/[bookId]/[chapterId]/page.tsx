"use client"

import { useState } from "react"
import { BookOpen, CheckCircle2, XCircle, ArrowLeft, ArrowRight, Trophy, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const mockQuestions: Question[] = [
  {
    id: "1",
    question: "What is the limit of f(x) = (x² - 4)/(x - 2) as x approaches 2?",
    options: ["0", "2", "4", "Does not exist"],
    correctAnswer: 2,
    explanation:
      "By factoring the numerator as (x+2)(x-2) and canceling with the denominator, we get lim(x→2) = x + 2 = 4.",
  },
  {
    id: "2",
    question: "Which of the following statements about limits is true?",
    options: [
      "A limit always equals the function value at that point",
      "A limit can exist even if the function is not defined at that point",
      "Limits only exist for continuous functions",
      "One-sided limits are always equal",
    ],
    correctAnswer: 1,
    explanation:
      "A limit describes the behavior of a function as it approaches a point, regardless of whether the function is defined at that point.",
  },
  {
    id: "3",
    question: "What is lim(x→0) (sin x)/x?",
    options: ["0", "1", "∞", "Does not exist"],
    correctAnswer: 1,
    explanation:
      "This is a fundamental limit in calculus. As x approaches 0, (sin x)/x approaches 1. This can be proven using the squeeze theorem.",
  },
  {
    id: "4",
    question: "If lim(x→a⁺) f(x) ≠ lim(x→a⁻) f(x), what can we conclude?",
    options: [
      "The function is continuous at x = a",
      "The limit at x = a does not exist",
      "The function is not defined at x = a",
      "The function has a maximum at x = a",
    ],
    correctAnswer: 1,
    explanation:
      "When the left-hand and right-hand limits are not equal, the two-sided limit does not exist at that point.",
  },
  {
    id: "5",
    question: "What is lim(x→∞) (3x² + 2x)/(x² - 1)?",
    options: ["0", "1", "3", "∞"],
    correctAnswer: 2,
    explanation:
      "For rational functions, divide both numerator and denominator by the highest power of x. The limit becomes 3/1 = 3.",
  },
]

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(mockQuestions.length).fill(null))
  const [showResults, setShowResults] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)

  const handleSelectAnswer = (answerIndex: number) => {
    if (showResults) return
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    setShowResults(true)
    setTimeElapsed(12) // Mock time in minutes
  }

  const calculateScore = () => {
    let correct = 0
    selectedAnswers.forEach((answer, index) => {
      if (answer === mockQuestions[index].correctAnswer) {
        correct++
      }
    })
    return {
      correct,
      total: mockQuestions.length,
      percentage: Math.round((correct / mockQuestions.length) * 100),
    }
  }

  const score = showResults ? calculateScore() : null

  if (showResults && score) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="font-semibold text-lg">LearnAI</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Results */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Score Card */}
            <Card className="bg-zinc-900 border-white/10 p-8 mb-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
              <p className="text-white/60 mb-6">Great job on completing the quiz</p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-3xl font-bold text-green-400">{score.correct}</div>
                  <div className="text-sm text-white/60">Correct</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-400">{score.percentage}%</div>
                  <div className="text-sm text-white/60">Score</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-3xl font-bold text-cyan-400">{timeElapsed}</div>
                  <div className="text-sm text-white/60">Minutes</div>
                </div>
              </div>

              {score.percentage >= 80 ? (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                  <p className="text-green-400 font-medium">Excellent work! You've mastered this chapter.</p>
                </div>
              ) : score.percentage >= 60 ? (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                  <p className="text-blue-400 font-medium">Good job! Review the concepts below to improve.</p>
                </div>
              ) : (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6">
                  <p className="text-amber-400 font-medium">Keep practicing! Review the material and try again.</p>
                </div>
              )}

              <div className="flex gap-3 justify-center">
                <Link href={`/learn/${params.bookId}/${params.chapterId}`}>
                  <Button variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent">
                    Review Material
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    setShowResults(false)
                    setCurrentQuestion(0)
                    setSelectedAnswers(new Array(mockQuestions.length).fill(null))
                  }}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  Retake Quiz
                </Button>
              </div>
            </Card>

            {/* Answer Review */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Answer Review</h2>
              {mockQuestions.map((question, index) => {
                const isCorrect = selectedAnswers[index] === question.correctAnswer
                return (
                  <Card key={question.id} className="bg-zinc-900 border-white/10 p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCorrect ? "bg-green-500/20" : "bg-red-500/20"
                        }`}
                      >
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-3">Question {index + 1}</h3>
                        <p className="text-white/80 mb-4">{question.question}</p>

                        <div className="space-y-2 mb-4">
                          {question.options.map((option, optionIndex) => {
                            const isSelected = selectedAnswers[index] === optionIndex
                            const isCorrectOption = optionIndex === question.correctAnswer
                            return (
                              <div
                                key={optionIndex}
                                className={`p-3 rounded-lg border ${
                                  isCorrectOption
                                    ? "bg-green-500/10 border-green-500/30"
                                    : isSelected
                                      ? "bg-red-500/10 border-red-500/30"
                                      : "bg-white/5 border-white/10"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {isCorrectOption && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                                  {isSelected && !isCorrectOption && <XCircle className="w-4 h-4 text-red-400" />}
                                  <span
                                    className={
                                      isCorrectOption ? "text-green-400" : isSelected ? "text-red-400" : "text-white/80"
                                    }
                                  >
                                    {option}
                                  </span>
                                </div>
                              </div>
                            )
                          })}
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                          <p className="text-sm font-medium text-blue-400 mb-1">Explanation</p>
                          <p className="text-sm text-white/80">{question.explanation}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    )
  }

  const question = mockQuestions[currentQuestion]
  const allAnswered = selectedAnswers.every((answer) => answer !== null)

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
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Clock className="w-4 h-4" />
                <span>12:34</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link href={`/learn/${params.bookId}/${params.chapterId}`}>
            <Button variant="ghost" className="mb-6 text-white/60 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Learning
            </Button>
          </Link>

          {/* Quiz Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Chapter 1 Quiz</h1>
            <p className="text-white/60">Test your understanding of Introduction to Limits</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-white/60">
                Question {currentQuestion + 1} of {mockQuestions.length}
              </span>
              <span className="font-medium">{Math.round(((currentQuestion + 1) / mockQuestions.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
                style={{ width: `${((currentQuestion + 1) / mockQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <Card className="bg-zinc-900 border-white/10 p-8 mb-6">
            <h2 className="text-xl font-semibold mb-6 text-balance">{question.question}</h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedAnswers[currentQuestion] === index
                      ? "bg-blue-500/20 border-blue-500/50"
                      : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedAnswers[currentQuestion] === index ? "border-blue-400 bg-blue-400" : "border-white/30"
                      }`}
                    >
                      {selectedAnswers[currentQuestion] === index && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="text-white/90">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Question Navigator */}
          <div className="flex flex-wrap gap-2 mb-6">
            {mockQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-lg border transition-all ${
                  index === currentQuestion
                    ? "bg-blue-500 border-blue-500 text-white"
                    : selectedAnswers[index] !== null
                      ? "bg-green-500/20 border-green-500/30 text-green-400"
                      : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
              className="border-white/20 hover:bg-white/10 disabled:opacity-50 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentQuestion === mockQuestions.length - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50"
              >
                Submit Quiz
                <Trophy className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
