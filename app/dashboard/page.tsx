"use client"

import { useState } from "react"
import { BookOpen, Trophy, Award, Star, Zap, Target, TrendingUp, Users, Crown, Medal, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned: boolean
  progress?: number
  total?: number
  points: number
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface LeaderboardEntry {
  rank: number
  name: string
  points: number
  avatar: string
  isCurrentUser?: boolean
}

const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "First Steps",
    description: "Complete your first lesson",
    icon: "star",
    earned: true,
    points: 50,
    rarity: "common",
  },
  {
    id: "2",
    title: "Quiz Master",
    description: "Score 100% on any quiz",
    icon: "trophy",
    earned: true,
    points: 100,
    rarity: "rare",
  },
  {
    id: "3",
    title: "Week Warrior",
    description: "Maintain a 7-day study streak",
    icon: "flame",
    earned: true,
    points: 150,
    rarity: "epic",
  },
  {
    id: "4",
    title: "Speed Reader",
    description: "Complete 5 chapters in one day",
    icon: "zap",
    earned: false,
    progress: 3,
    total: 5,
    points: 200,
    rarity: "epic",
  },
  {
    id: "5",
    title: "Perfect Score",
    description: "Score 100% on 10 quizzes",
    icon: "target",
    earned: false,
    progress: 4,
    total: 10,
    points: 300,
    rarity: "legendary",
  },
  {
    id: "6",
    title: "Book Worm",
    description: "Complete 3 entire textbooks",
    icon: "book",
    earned: false,
    progress: 1,
    total: 3,
    points: 500,
    rarity: "legendary",
  },
]

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Sarah Chen", points: 12450, avatar: "from-purple-500 to-pink-500" },
  { rank: 2, name: "Alex Kumar", points: 11230, avatar: "from-blue-500 to-cyan-500" },
  { rank: 3, name: "You", points: 8750, avatar: "from-green-500 to-emerald-500", isCurrentUser: true },
  { rank: 4, name: "Emma Wilson", points: 7890, avatar: "from-amber-500 to-orange-500" },
  { rank: 5, name: "James Lee", points: 6540, avatar: "from-red-500 to-rose-500" },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"achievements" | "leaderboard">("achievements")

  const getRarityColor = (rarity: Achievement["rarity"]) => {
    switch (rarity) {
      case "common":
        return "from-gray-500 to-gray-600"
      case "rare":
        return "from-blue-500 to-cyan-500"
      case "epic":
        return "from-purple-500 to-pink-500"
      case "legendary":
        return "from-amber-500 to-orange-500"
    }
  }

  const getIconComponent = (icon: string) => {
    switch (icon) {
      case "star":
        return Star
      case "trophy":
        return Trophy
      case "flame":
        return Flame
      case "zap":
        return Zap
      case "target":
        return Target
      case "book":
        return BookOpen
      default:
        return Award
    }
  }

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
              <Link href="/dashboard" className="text-sm font-medium text-blue-400">
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
          <h1 className="text-4xl font-bold mb-2 text-balance">Dashboard</h1>
          <p className="text-white/60 text-lg">Track your achievements and compete with others</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Level Card */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl font-bold">
                  12
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-1">Level 12 Scholar</h2>
                  <p className="text-white/60 text-sm">Keep learning to reach Level 13</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-400">8,750</div>
                  <div className="text-sm text-white/60">Total Points</div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white/60">Progress to Level 13</span>
                  <span className="font-medium">750 / 1,000 XP</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: "75%" }} />
                </div>
              </div>
            </Card>

            {/* Tab Navigation */}
            <div className="flex gap-2 border-b border-white/10">
              <button
                onClick={() => setActiveTab("achievements")}
                className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === "achievements" ? "text-blue-400" : "text-white/60 hover:text-white"
                }`}
              >
                <Award className="w-4 h-4 inline mr-2" />
                Achievements
                {activeTab === "achievements" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />}
              </button>
              <button
                onClick={() => setActiveTab("leaderboard")}
                className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === "leaderboard" ? "text-blue-400" : "text-white/60 hover:text-white"
                }`}
              >
                <Trophy className="w-4 h-4 inline mr-2" />
                Leaderboard
                {activeTab === "leaderboard" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />}
              </button>
            </div>

            {/* Content */}
            {activeTab === "achievements" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockAchievements.map((achievement) => {
                  const Icon = getIconComponent(achievement.icon)
                  return (
                    <Card
                      key={achievement.id}
                      className={`border-white/10 p-6 transition-all ${
                        achievement.earned ? "bg-zinc-900 hover:scale-105" : "bg-zinc-900/50 opacity-60"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-14 h-14 bg-gradient-to-br ${getRarityColor(achievement.rarity)} rounded-lg flex items-center justify-center flex-shrink-0 ${
                            !achievement.earned && "grayscale"
                          }`}
                        >
                          <Icon className="w-7 h-7" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-semibold text-balance">{achievement.title}</h3>
                            <div className="flex items-center gap-1 text-amber-400 flex-shrink-0">
                              <Star className="w-3 h-3 fill-current" />
                              <span className="text-xs font-medium">{achievement.points}</span>
                            </div>
                          </div>
                          <p className="text-sm text-white/60 mb-3">{achievement.description}</p>

                          {achievement.earned ? (
                            <div className="flex items-center gap-2 text-xs text-green-400">
                              <Award className="w-4 h-4" />
                              <span>Unlocked</span>
                            </div>
                          ) : achievement.progress !== undefined && achievement.total !== undefined ? (
                            <div>
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-white/60">Progress</span>
                                <span className="font-medium">
                                  {achievement.progress} / {achievement.total}
                                </span>
                              </div>
                              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className={`h-full bg-gradient-to-r ${getRarityColor(achievement.rarity)}`}
                                  style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs text-white/40">Locked</div>
                          )}
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <Card className="bg-zinc-900 border-white/10 p-6">
                <div className="space-y-4">
                  {mockLeaderboard.map((entry) => (
                    <div
                      key={entry.rank}
                      className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                        entry.isCurrentUser
                          ? "bg-blue-500/20 border border-blue-500/30"
                          : "bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      {/* Rank */}
                      <div className="w-12 text-center flex-shrink-0">
                        {entry.rank === 1 ? (
                          <Crown className="w-8 h-8 text-amber-400 mx-auto" />
                        ) : entry.rank === 2 ? (
                          <Medal className="w-8 h-8 text-gray-300 mx-auto" />
                        ) : entry.rank === 3 ? (
                          <Medal className="w-8 h-8 text-amber-600 mx-auto" />
                        ) : (
                          <span className="text-2xl font-bold text-white/40">#{entry.rank}</span>
                        )}
                      </div>

                      {/* Avatar */}
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${entry.avatar} rounded-full flex items-center justify-center flex-shrink-0`}
                      >
                        <span className="text-lg font-bold">{entry.name[0]}</span>
                      </div>

                      {/* Name */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">
                          {entry.name}
                          {entry.isCurrentUser && <span className="ml-2 text-xs text-blue-400">(You)</span>}
                        </h3>
                        <p className="text-sm text-white/60">Level {Math.floor(entry.points / 1000) + 1}</p>
                      </div>

                      {/* Points */}
                      <div className="text-right">
                        <div className="text-xl font-bold">{entry.points.toLocaleString()}</div>
                        <div className="text-xs text-white/60">points</div>
                      </div>

                      {/* Trend */}
                      {entry.rank <= 3 && <TrendingUp className="w-5 h-5 text-green-400 flex-shrink-0" />}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                  <p className="text-sm text-white/60 mb-4">You're in the top 15% of learners this week!</p>
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    <Users className="w-4 h-4 mr-2" />
                    View Full Leaderboard
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="bg-zinc-900 border-white/10 p-6">
              <h3 className="font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span className="text-sm text-white/60">Achievements</span>
                  </div>
                  <span className="font-bold">8 / 24</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-white/60">Rank</span>
                  </div>
                  <span className="font-bold">#3</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="text-sm text-white/60">Streak</span>
                  </div>
                  <span className="font-bold">7 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-white/60">Total Points</span>
                  </div>
                  <span className="font-bold">8,750</span>
                </div>
              </div>
            </Card>

            {/* Recent Badges */}
            <Card className="bg-zinc-900 border-white/10 p-6">
              <h3 className="font-semibold mb-4">Recent Badges</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="aspect-square bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Trophy className="w-8 h-8" />
                </div>
                <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Flame className="w-8 h-8" />
                </div>
                <div className="aspect-square bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Star className="w-8 h-8" />
                </div>
              </div>
            </Card>

            {/* Challenge Card */}
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-purple-400">Weekly Challenge</h3>
                  <p className="text-sm text-white/80">Complete 5 quizzes this week</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white/60">Progress</span>
                  <span className="font-medium">3 / 5</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: "60%" }} />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-medium">Reward: 500 points</span>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
