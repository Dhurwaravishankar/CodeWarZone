"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { getCurrentUser } from "@/lib/auth"
import { CodeEditor } from "@/components/code-editor"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Trophy } from "lucide-react"

export default function ContestArenaPage() {
  const params = useParams()
  const contestId = params.id as string

  const [user, setUser] = useState<any>(null)
  const [contest, setContest] = useState<any>(null)
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState("02:00:00") // 2 hours in HH:MM:SS

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userData = await getCurrentUser()
        setUser(userData)

        // In a real app, this would fetch the contest from your API
        // const response = await fetch(`/api/contests/${contestId}`);
        // const contestData = await response.json();

        // Mock contest data for demonstration
        const mockContest = {
          id: contestId,
          title: "Algorithm Sprint #2",
          description:
            "Test your algorithm skills with timed challenges. Solve problems efficiently to earn more points.",
          date: "2025-04-15",
          startTime: "18:00",
          duration: "2",
          type: "algorithm-sprint",
          status: "active", // This contest is active/live
        }
        setContest(mockContest)

        // Mock questions data
        const mockQuestions = [
          {
            id: "q1",
            title: "Find the Largest Number",
            difficulty: "Easy",
            points: 10,
            solved: false,
            type: "coding",
            description: "Given an array of integers, find the largest number in the array.",
            inputFormat:
              "The first line contains an integer n (1 ≤ n ≤ 10^5), the number of elements in the array.\nThe second line contains n space-separated integers a[i] (1 ≤ a[i] ≤ 10^9).",
            outputFormat: "Print a single integer, the largest number in the array.",
            sampleInput: "5\n3 1 5 2 4",
            sampleOutput: "5",
            explanation: "The largest number in the array [3, 1, 5, 2, 4] is 5.",
          },
          {
            id: "q2",
            title: "Valid Parentheses",
            difficulty: "Medium",
            points: 20,
            solved: false,
            type: "coding",
            description:
              "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.",
            inputFormat: "The input consists of a single line containing a string s of length n (1 ≤ n ≤ 10^4).",
            outputFormat: "Print 'true' if the string is valid, or 'false' otherwise.",
            sampleInput: "()[]{}",
            sampleOutput: "true",
            explanation: "The string contains valid pairs of brackets: (), [], and {}.",
          },
          {
            id: "q3",
            title: "Merge Two Sorted Lists",
            difficulty: "Medium",
            points: 20,
            solved: false,
            type: "coding",
            description: "Merge two sorted linked lists and return it as a sorted list.",
            inputFormat:
              "The first line contains n integers representing the first linked list.\nThe second line contains m integers representing the second linked list.",
            outputFormat: "Print the merged sorted list.",
            sampleInput: "1 2 4\n1 3 4",
            sampleOutput: "1 1 2 3 4 4",
            explanation: "Merging [1,2,4] and [1,3,4] results in [1,1,2,3,4,4].",
          },
        ]
        setQuestions(mockQuestions)
        setCurrentQuestion(mockQuestions[0])
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Set up timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const [hours, minutes, seconds] = prev.split(":").map(Number)
        let newSeconds = seconds - 1
        let newMinutes = minutes
        let newHours = hours

        if (newSeconds < 0) {
          newSeconds = 59
          newMinutes -= 1
        }

        if (newMinutes < 0) {
          newMinutes = 59
          newHours -= 1
        }

        if (newHours < 0) {
          clearInterval(timer)
          return "00:00:00"
        }

        return `${newHours.toString().padStart(2, "0")}:${newMinutes.toString().padStart(2, "0")}:${newSeconds.toString().padStart(2, "0")}`
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [contestId])

  const handleQuestionSelect = (questionId: string) => {
    const question = questions.find((q) => q.id === questionId)
    if (question) {
      setCurrentQuestion(question)
    }
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <MainNav />
            {contest && (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm font-medium">{contest.title}</span>
                <Badge variant="outline" className="ml-2">
                  <Clock className="mr-1 h-3 w-3" /> {timeLeft}
                </Badge>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">
              <Users className="mr-1 h-3 w-3" /> 120 Participants
            </Badge>
            <UserNav user={user} />
          </div>
        </div>
      </header>
      <main className="flex-1 container py-4">
        <div className="md:hidden flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{contest?.title}</h2>
          <Badge variant="outline">
            <Clock className="mr-1 h-3 w-3" /> {timeLeft}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Questions List Sidebar */}
          <div className="md:col-span-1">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Problems</h3>
                <Badge>
                  <Trophy className="mr-1 h-3 w-3" /> Rank: #42
                </Badge>
              </div>
              <div className="space-y-2">
                {questions.map((question) => (
                  <Card
                    key={question.id}
                    className={`cursor-pointer hover:bg-accent/50 transition-colors ${currentQuestion?.id === question.id ? "border-primary" : ""}`}
                    onClick={() => handleQuestionSelect(question.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{question.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant={
                                question.difficulty === "Easy"
                                  ? "outline"
                                  : question.difficulty === "Medium"
                                    ? "secondary"
                                    : "default"
                              }
                            >
                              {question.difficulty}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{question.points} pts</span>
                          </div>
                        </div>
                        {question.solved && <Badge variant="success">Solved</Badge>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3">
            {currentQuestion && (
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{currentQuestion.title}</CardTitle>
                      <CardDescription>
                        {currentQuestion.points} points • {currentQuestion.difficulty}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Hint
                      </Button>
                      <Button variant="outline" size="sm">
                        Submissions
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Tabs defaultValue="problem">
                    <div className="border-b px-6">
                      <TabsList className="w-full justify-start h-12">
                        <TabsTrigger value="problem" className="data-[state=active]:bg-background">
                          Problem
                        </TabsTrigger>
                        <TabsTrigger value="solution" className="data-[state=active]:bg-background">
                          Solution
                        </TabsTrigger>
                        <TabsTrigger value="submissions" className="data-[state=active]:bg-background">
                          Submissions
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value="problem" className="p-6 space-y-4">
                      <div>
                        <h3 className="font-medium text-lg">Description</h3>
                        <p className="mt-2 whitespace-pre-line">{currentQuestion.description}</p>
                      </div>

                      <div>
                        <h3 className="font-medium text-lg">Input Format</h3>
                        <p className="mt-2 whitespace-pre-line">{currentQuestion.inputFormat}</p>
                      </div>

                      <div>
                        <h3 className="font-medium text-lg">Output Format</h3>
                        <p className="mt-2 whitespace-pre-line">{currentQuestion.outputFormat}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-muted rounded-md">
                          <h4 className="font-medium mb-2">Sample Input</h4>
                          <pre className="text-sm whitespace-pre-wrap">{currentQuestion.sampleInput}</pre>
                        </div>
                        <div className="p-4 bg-muted rounded-md">
                          <h4 className="font-medium mb-2">Sample Output</h4>
                          <pre className="text-sm whitespace-pre-wrap">{currentQuestion.sampleOutput}</pre>
                        </div>
                      </div>

                      {currentQuestion.explanation && (
                        <div>
                          <h3 className="font-medium text-lg">Explanation</h3>
                          <p className="mt-2 whitespace-pre-line">{currentQuestion.explanation}</p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="solution" className="p-0">
                      <div className="h-[600px]">
                        <CodeEditor
                          defaultLanguage="javascript"
                          defaultValue={`// Write your solution here\n\nfunction solve(arr) {\n  // Your code here\n  \n}`}
                        />
                      </div>
                      <div className="p-4 border-t flex justify-between">
                        <div className="flex gap-2">
                          <select className="px-3 py-1 border rounded-md text-sm">
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="cpp">C++</option>
                            <option value="java">Java</option>
                          </select>
                          <Button variant="outline" size="sm">
                            Run Code
                          </Button>
                        </div>
                        <Button size="sm">Submit Solution</Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="submissions" className="p-6">
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No submissions yet</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

