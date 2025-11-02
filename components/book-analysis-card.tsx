"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Brain, Clock, TrendingUp, Target, Sparkles } from "lucide-react"

interface AnalysisMetric {
  label: string
  value: string
  icon: React.ReactNode
  color: string
}

export function BookAnalysisCard({ bookId }: { bookId: string }) {
  const metrics: AnalysisMetric[] = [
    {
      label: "Difficulty",
      value: "Advanced",
      icon: <TrendingUp className="w-4 h-4" />,
      color: "from-orange-500 to-red-500",
    },
    {
      label: "Study Time",
      value: "120 hrs",
      icon: <Clock className="w-4 h-4" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Completion",
      value: "45%",
      icon: <Target className="w-4 h-4" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "AI Score",
      value: "8.5/10",
      icon: <Brain className="w-4 h-4" />,
      color: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <Card className="bg-zinc-900 border-white/10 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-blue-400" />
        <h3 className="font-semibold">Quick Analysis</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className={`bg-gradient-to-br ${metric.color} p-1.5 rounded`}>{metric.icon}</div>
              <span className="text-xs text-white/60">{metric.label}</span>
            </div>
            <div className="text-lg font-bold">{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-sm text-white/80">
          <span className="font-semibold text-blue-400">AI Insight:</span> This book requires strong algebra
          foundations. Recommended study pace: 2 chapters per week.
        </p>
      </div>
    </Card>
  )
}
