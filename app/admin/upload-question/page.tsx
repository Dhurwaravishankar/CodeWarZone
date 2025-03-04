"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Sidebar } from "@/components/sidebar"
import { Loader2, Plus, Trash2, Sun, Moon } from "lucide-react"

export default function UploadQuestionPage() {
  const router = useRouter()
  const [questionType, setQuestionType] = useState("coding")
  const [loading, setLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [mcqOptions, setMcqOptions] = useState([
    { id: 1, text: "", isCorrect: false },
    { id: 2, text: "", isCorrect: false },
    { id: 3, text: "", isCorrect: false },
    { id: 4, text: "", isCorrect: false },
  ])

  const handleQuestionTypeChange = (value: string) => {
    setQuestionType(value)
  }

  const handleMcqOptionChange = (id: number, text: string) => {
    setMcqOptions((options) => options.map((option) => (option.id === id ? { ...option, text } : option)))
  }

  const handleCorrectAnswerChange = (id: number) => {
    setMcqOptions((options) =>
      options.map((option) => (option.id === id ? { ...option, isCorrect: true } : { ...option, isCorrect: false })),
    )
  }

  const addMcqOption = () => {
    setMcqOptions((options) => [...options, { id: options.length + 1, text: "", isCorrect: false }])
  }

  const removeMcqOption = (id: number) => {
    setMcqOptions((options) => options.filter((option) => option.id !== id))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setLoading(false)
    // Redirect to questions list or show success message
    router.push("/admin/questions")
  }

  return (
    <div className={`flex min-h-screen flex-col ${darkMode ? "dark" : ""}`}>
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <div className="flex items-center gap-4">
            <Switch checked={darkMode} onCheckedChange={setDarkMode} className="mr-4" />
            {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <UserNav />
          </div>
        </div>
      </header>
      <div className="flex-1 md:grid md:grid-cols-[220px_1fr]">
        <Sidebar className="hidden md:block" />
        <main className="flex-1 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Upload Practice Question</h2>
          </div>
          <Tabs defaultValue="question" className="space-y-4 mt-6">
            <TabsList>
              <TabsTrigger value="question">Question</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="question" className="space-y-4">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>Question Details</CardTitle>
                    <CardDescription>Enter the details for the new practice question</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="questionType">Question Type</Label>
                      <Select value={questionType} onValueChange={handleQuestionTypeChange}>
                        <SelectTrigger id="questionType">
                          <SelectValue placeholder="Select question type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="coding">Coding</SelectItem>
                          <SelectItem value="mcq">MCQ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Question Title</Label>
                      <Input id="title" placeholder="Enter question title" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Question Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Enter detailed question description"
                        required
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty Level</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger id="difficulty">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="marks">Marks</Label>
                      <Input id="marks" type="number" placeholder="Enter marks" required />
                    </div>
                    {questionType === "coding" && (
                      <div className="space-y-2">
                        <Label htmlFor="expectedOutput">Expected Output</Label>
                        <Textarea
                          id="expectedOutput"
                          placeholder="Enter expected output or test cases"
                          className="min-h-[100px]"
                        />
                      </div>
                    )}
                    {questionType === "mcq" && (
                      <div className="space-y-4">
                        <Label>MCQ Options</Label>
                        <RadioGroup>
                          {mcqOptions.map((option) => (
                            <div key={option.id} className="flex items-center space-x-2">
                              <RadioGroupItem
                                value={option.id.toString()}
                                id={`option-${option.id}`}
                                checked={option.isCorrect}
                                onClick={() => handleCorrectAnswerChange(option.id)}
                              />
                              <Input
                                placeholder={`Option ${option.id}`}
                                value={option.text}
                                onChange={(e) => handleMcqOptionChange(option.id, e.target.value)}
                                className="flex-1"
                              />
                              {mcqOptions.length > 2 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeMcqOption(option.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </RadioGroup>
                        {mcqOptions.length < 6 && (
                          <Button type="button" variant="outline" size="sm" className="mt-2" onClick={addMcqOption}>
                            <Plus className="mr-2 h-4 w-4" /> Add Option
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => router.back()}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save & Upload"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="preview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Question Preview</CardTitle>
                  <CardDescription>This is how the question will appear to users</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Add preview content here */}
                  <p className="text-muted-foreground">Preview content will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

