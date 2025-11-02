"use client"

import { useState } from "react"
import { BookOpen, TrendingUp, Clock, Target, Award, Calendar, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface ActivityItem {
  id: string
  type: "quiz" | "lesson" | "achievement"
  title: string
  subtitle: string
  date: string
  score?: number
}

const mockActivity: ActivityItem[] = [
  {
    id: "1",
    type: "quiz",
    title: "Chapter 1 Quiz",
    subtitle: "Advanced Calculus",
    date: "2024-01-20",
    score: 85,
  },
  {
    id: "2",
    type: "lesson",
    title: "Introduction to Limits",
    subtitle: "Completed video lesson",
    date: "2024-01-20",
  },
  {
    id: "3",
    type: "achievement",
    title: "First Quiz Completed",
    subtitle: "Earned 50 points",
    date: "2024-01-20",
  },
  {
    id: "4",
    type: "quiz",
    title: "Chapter 2 Quiz",
    subtitle: "World History",
    date: "2024-01-19",
    score: 92,
  },
]

const weeklyData = [
  { day: "Mon", minutes: 45 },
  { day: "Tue", minutes: 60 },
  { day: "Wed", minutes: 30 },
  { day: "Thu", minutes: 75 },
  { day: "Fri", minutes: 50 },
  { day: "Sat", minutes: 90 },
  { day: "Sun", minutes: 40 },
]

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week")

  const maxMinutes = Math.max(...weeklyData.map((d) => d.minutes))

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
              <Link href="/library" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                Library
              </Link>
              <Link href="/dashboard" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/progress" className="text-sm font-medium text-blue-400">
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
          <h1 className="text-4xl font-bold mb-2 text-balance">Your Progress</h1>
          <p className="text-white/60 text-lg">Track your learning journey and achievements</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-zinc-900 border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold mb-1">24.5</div>
            <div className="text-sm text-white/60">Hours This Month</div>
            <div className="text-xs text-green-400 mt-2">+12% from last month</div>
          </Card>

          <Card className="bg-zinc-900 border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-cyan-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold mb-1">87%</div>
            <div className="text-sm text-white/60">Average Quiz Score</div>
            <div className="text-xs text-green-400 mt-2">+5% from last month</div>
          </Card>

          <Card className="bg-zinc-900 border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">12</div>
            <div className="text-sm text-white/60">Chapters Completed</div>
            <div className="text-xs text-white/40 mt-2">Across 3 books</div>
          </Card>

          <Card className="bg-zinc-900 border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">8</div>
            <div className="text-sm text-white/60">Achievements Earned</div>
            <div className="text-xs text-white/40 mt-2">2 more to next level</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Study Time Chart */}
            <Card className="bg-zinc-900 border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Study Time</h2>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={timeRange === "week" ? "default" : "outline"}
                    onClick={() => setTimeRange("week")}
                    className={
                      timeRange === "week" ? "bg-blue-500 hover:bg-blue-600" : "border-white/20 hover:bg-white/10"
                    }
                  >
                    Week
                  </Button>
                  <Button
                    size="sm"
                    variant={timeRange === "month" ? "default" : "outline"}
                    onClick={() => setTimeRange("month")}
                    className={
                      timeRange === "month" ? "bg-blue-500 hover:bg-blue-600" : "border-white/20 hover:bg-white/10"
                    }
                  >
                    Month
                  </Button>
                  <Button
                    size="sm"
                    variant={timeRange === "year" ? "default" : "outline"}
                    onClick={() => setTimeRange("year")}
                    className={
                      timeRange === "year" ? "bg-blue-500 hover:bg-blue-600" : "border-white/20 hover:bg-white/10"
                    }
                  >
                    Year
                  </Button>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="space-y-4">
                <div className="flex items-end justify-between gap-2 h-48">
                  {weeklyData.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex items-end justify-center h-full">
                        <div
                          className="w-full bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t-lg transition-all hover:from-blue-400 hover:to-cyan-400 cursor-pointer relative group"
                          style={{ height: `${(data.minutes / maxMinutes) * 100}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {data.minutes} min
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-white/60">{data.day}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-white/60 pt-4 border-t border-white/10">
                  <span>Total: 390 minutes</span>
                  <span>Daily avg: 56 minutes</span>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-zinc-900 border-white/10 p-6">
              <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {mockActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        activity.type === "quiz"
                          ? "bg-blue-500/20"
                          : activity.type === "lesson"
                            ? "bg-cyan-500/20"
                            : "bg-amber-500/20"
                      }`}
                    >
                      {activity.type === "quiz" ? (
                        <Target className="w-5 h-5 text-blue-400" />
                      ) : activity.type === "lesson" ? (
                        <BookOpen className="w-5 h-5 text-cyan-400" />
                      ) : (
                        <Award className="w-5 h-5 text-amber-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm">{activity.title}</h3>
                      <p className="text-xs text-white/60">{activity.subtitle}</p>
                    </div>
                    {activity.score && (
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-400">{activity.score}%</div>
                        <div className="text-xs text-white/60">Score</div>
                      </div>
                    )}
                    <div className="text-xs text-white/40">{new Date(activity.date).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Streak */}
            <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">7 Days</div>
                  <div className="text-sm text-white/60">Current Streak</div>
                </div>
              </div>
              <p className="text-sm text-white/80 mb-4">Keep it up! Study today to maintain your streak.</p>
              <div className="flex gap-1">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="flex-1 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
                ))}
              </div>
            </Card>

            {/* Goals */}
            <Card className="bg-zinc-900 border-white/10 p-6">
              <h3 className="font-semibold mb-4">Weekly Goals</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-white/60">Study Time</span>
                    <span className="font-medium">6.5 / 10 hours</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: "65%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-white/60">Quizzes Completed</span>
                    <span className="font-medium">3 / 5</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: "60%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-white/60">Chapters Read</span>
                    <span className="font-medium">4 / 6</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500" style={{ width: "67%" }} />
                  </div>
                </div>
              </div>
            </Card>

            {/* Books in Progress */}
            <Card className="bg-zinc-900 border-white/10 p-6">
              <h3 className="font-semibold mb-4">Books in Progress</h3>
              <div className="space-y-3">
                <Link href="/book/1" className="block">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="w-10 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm mb-1 truncate">Advanced Calculus</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: "45%" }} />
                        </div>
                        <span className="text-xs text-white/60">45%</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/40" />
                  </div>
                </Link>
                <Link href="/book/2" className="block">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="w-10 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm mb-1 truncate">World History</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                            style={{ width: "78%" }}
                          />
                        </div>
                        <span className="text-xs text-white/60">78%</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/40" />
                  </div>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
