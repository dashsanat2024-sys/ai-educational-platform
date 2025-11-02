"use client"

import type React from "react"

import { useState } from "react"
import { Upload, BookOpen, Search, Filter, Plus, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface Book {
  id: string
  title: string
  subject: string
  grade: string
  coverColor: string
  uploadDate: string
  progress: number
  chapters: number
  analysis?: BookAnalysis
}

interface BookAnalysis {
  title: string
  author?: string
  subject: string
  difficulty: string
  estimatedStudyHours: number
  tableOfContents: Array<{
    chapter: string
    title: string
    pageStart?: number
    topics: string[]
    estimatedMinutes: number
    difficulty: string
  }>
  keyTopics: Array<{
    topic: string
    importance: string
    chapters: string[]
  }>
  prerequisites: string[]
  learningObjectives: string[]
  recommendedStudyPath: Array<{
    step: number
    description: string
    chapters: string[]
    estimatedTime: string
  }>
  summary: string
  targetAudience: string
  practiceRecommendations: string[]
}

const mockBooks: Book[] = [
  {
    id: "1",
    title: "Advanced Calculus",
    subject: "Mathematics",
    grade: "Grade 12",
    coverColor: "from-blue-500 to-cyan-500",
    uploadDate: "2024-01-15",
    progress: 45,
    chapters: 12,
  },
  {
    id: "2",
    title: "World History",
    subject: "History",
    grade: "Grade 10",
    coverColor: "from-amber-500 to-orange-500",
    uploadDate: "2024-01-10",
    progress: 78,
    chapters: 15,
  },
  {
    id: "3",
    title: "Biology Fundamentals",
    subject: "Science",
    grade: "Grade 11",
    coverColor: "from-green-500 to-emerald-500",
    uploadDate: "2024-01-08",
    progress: 23,
    chapters: 18,
  },
]

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>(mockBooks)
  const [searchQuery, setSearchQuery] = useState("")
  const [showUpload, setShowUpload] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [analyzingBook, setAnalyzingBook] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      await handleFileUpload(files[0])
    }
  }

  const handleFileUpload = async (file: File) => {
    const validTypes = ["application/pdf", "application/epub+zip", "application/x-mobipocket-ebook"]
    if (!validTypes.includes(file.type) && !file.name.endsWith(".pdf") && !file.name.endsWith(".epub")) {
      setUploadError("Please upload a PDF or EPUB file")
      return
    }

    if (file.size > 100 * 1024 * 1024) {
      setUploadError("File size must be less than 100MB")
      return
    }

    setIsUploading(true)
    setUploadError(null)

    try {
      const newBook: Book = {
        id: Date.now().toString(),
        title: file.name.replace(/\.(pdf|epub)$/i, ""),
        subject: "Analyzing...",
        grade: "TBD",
        coverColor: "from-purple-500 to-pink-500",
        uploadDate: new Date().toISOString().split("T")[0],
        progress: 0,
        chapters: 0,
      }

      setBooks([newBook, ...books])
      setShowUpload(false)
      setAnalyzingBook(newBook.id)

      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/analyze-book", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to analyze book")
      }

      const { analysis } = await response.json()

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === newBook.id
            ? {
                ...book,
                title: analysis.title,
                subject: analysis.subject,
                grade: analysis.targetAudience,
                chapters: analysis.tableOfContents.length,
                analysis,
              }
            : book,
        ),
      )

      setAnalyzingBook(null)
    } catch (error) {
      console.error("[v0] Upload error:", error)
      setUploadError(error instanceof Error ? error.message : "Failed to upload and analyze book")
      setAnalyzingBook(null)
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== Date.now().toString()))
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/library" className="text-sm font-medium text-blue-400">
                Library
              </Link>
              <Link href="/dashboard" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/progress" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                Progress
              </Link>
            </nav>

            <Button variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent">
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">Your Library</h1>
          <p className="text-white/60 text-lg">Manage and access all your textbooks in one place</p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <Input
              type="text"
              placeholder="Search books by title or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 h-12"
            />
          </div>

          <Button variant="outline" className="border-white/20 hover:bg-white/10 h-12 bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>

          <Button
            onClick={() => setShowUpload(true)}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 h-12"
          >
            <Plus className="w-4 h-4 mr-2" />
            Upload Book
          </Button>
        </div>

        {/* Upload Modal */}
        {showUpload && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="bg-zinc-900 border-white/10 p-8 max-w-2xl w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Upload Textbook</h2>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowUpload(false)
                    setUploadError(null)
                  }}
                  className="text-white/60 hover:text-white"
                  disabled={isUploading}
                >
                  ✕
                </Button>
              </div>

              {uploadError && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">{uploadError}</p>
                </div>
              )}

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  isDragging ? "border-blue-500 bg-blue-500/10" : "border-white/20 hover:border-white/40"
                } ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-400 animate-spin" />
                    <h3 className="text-lg font-semibold mb-2">Uploading and analyzing...</h3>
                    <p className="text-white/60">This may take a minute</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-12 h-12 mx-auto mb-4 text-white/40" />
                    <h3 className="text-lg font-semibold mb-2">Drag and drop your textbook here</h3>
                    <p className="text-white/60 mb-4">or</p>
                    <label htmlFor="file-upload">
                      <Button
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                        onClick={() => document.getElementById("file-upload")?.click()}
                        type="button"
                      >
                        Browse Files
                      </Button>
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".pdf,.epub"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                    <p className="text-sm text-white/40 mt-4">Supports PDF and EPUB formats (Max 100MB)</p>
                  </>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Analyzing Notification */}
        {analyzingBook && (
          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
            <div className="flex-1">
              <p className="font-semibold text-blue-400">Analyzing your textbook with AI...</p>
              <p className="text-sm text-white/60">
                Extracting table of contents, key topics, difficulty level, and study recommendations
              </p>
            </div>
            <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
          </div>
        )}

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-white/20" />
            <h3 className="text-xl font-semibold mb-2">No books found</h3>
            <p className="text-white/60 mb-6">
              {searchQuery ? "Try a different search term" : "Upload your first textbook to get started"}
            </p>
            <Button
              onClick={() => setShowUpload(true)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Upload Book
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <Link key={book.id} href={`/book/${book.id}`}>
                <Card className="bg-zinc-900 border-white/10 hover:border-white/20 transition-all hover:scale-105 overflow-hidden group cursor-pointer">
                  <div className={`h-48 bg-gradient-to-br ${book.coverColor} relative`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-bold text-lg text-white text-balance line-clamp-2">{book.title}</h3>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-white/60 mb-3">
                      <span>{book.subject}</span>
                      <span>•</span>
                      <span>{book.grade}</span>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-white/60">Progress</span>
                        <span className="font-medium">{book.progress}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
                          style={{ width: `${book.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-white/60">
                      <span>{book.chapters} chapters</span>
                      <span>Added {new Date(book.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
