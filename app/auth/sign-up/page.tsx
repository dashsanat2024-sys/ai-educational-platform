"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BookOpen, Users, GraduationCap } from "lucide-react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [role, setRole] = useState<"learner" | "teacher" | "parent">("learner")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/library`,
          data: {
            full_name: fullName,
            role: role,
          },
        },
      })
      if (error) throw error
      router.push("/auth/sign-up-success")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-black">
      <div className="w-full max-w-md">
        <Card className="border-zinc-800 bg-zinc-950">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Create Account</CardTitle>
            <CardDescription className="text-zinc-400">Join our learning community</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="full-name" className="text-zinc-200">
                    Full Name
                  </Label>
                  <Input
                    id="full-name"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-zinc-200">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-zinc-200">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>

                <div className="grid gap-3">
                  <Label className="text-zinc-200">I am a...</Label>
                  <RadioGroup
                    value={role}
                    onValueChange={(value) => setRole(value as "learner" | "teacher" | "parent")}
                  >
                    <div className="flex items-center space-x-3 rounded-lg border border-zinc-800 p-4 hover:bg-zinc-900 transition-colors">
                      <RadioGroupItem value="learner" id="learner" />
                      <Label htmlFor="learner" className="flex items-center gap-3 cursor-pointer flex-1">
                        <BookOpen className="h-5 w-5 text-blue-500" />
                        <div>
                          <div className="font-medium text-white">Learner</div>
                          <div className="text-sm text-zinc-400">I want to learn from textbooks</div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 rounded-lg border border-zinc-800 p-4 hover:bg-zinc-900 transition-colors">
                      <RadioGroupItem value="teacher" id="teacher" />
                      <Label htmlFor="teacher" className="flex items-center gap-3 cursor-pointer flex-1">
                        <GraduationCap className="h-5 w-5 text-green-500" />
                        <div>
                          <div className="font-medium text-white">Teacher</div>
                          <div className="text-sm text-zinc-400">I want to create and assign content</div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 rounded-lg border border-zinc-800 p-4 hover:bg-zinc-900 transition-colors">
                      <RadioGroupItem value="parent" id="parent" />
                      <Label htmlFor="parent" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Users className="h-5 w-5 text-purple-500" />
                        <div>
                          <div className="font-medium text-white">Parent</div>
                          <div className="text-sm text-zinc-400">I want to monitor my child's progress</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </div>

              <div className="mt-4 text-center text-sm text-zinc-400">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-blue-500 hover:text-blue-400 underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
