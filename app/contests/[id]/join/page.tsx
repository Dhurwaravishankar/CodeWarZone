"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { getCurrentUser } from "@/lib/auth"
import { ArrowLeft, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

export default function JoinContestPage() {
  const params = useParams()
  const router = useRouter()
  const contestId = params.id as string

  const [user, setUser] = useState<any>(null)
  const [contest, setContest] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [registrationId, setRegistrationId] = useState("")
  const [joinLoading, setJoinLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

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
        setContest({
          id: contestId,
          title: "Algorithm Sprint #2",
          description:
            "Test your algorithm skills with timed challenges. Solve problems efficiently to earn more points.",
          date: "2025-04-15",
          startTime: "18:00",
          duration: "2",
          type: "algorithm-sprint",
          status: "active", // This contest is active/live
        })
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [contestId])

  const handleJoinContest = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!registrationId.trim()) {
      setError("Please enter your registration ID")
      return
    }

    setJoinLoading(true)
    setError("")
    setSuccess(false)

    try {
      // In a real app, this would be an API call to your backend
      // const response = await fetch("/api/join-contest", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ registrationId, contestId })
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);

      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check if registration ID is valid (for demo purposes)
      if (registrationId.length < 5) {
        throw new Error("Invalid registration ID or you are not registered for this contest.")
      }

      setSuccess(true)

      // Redirect to contest page after successful join
      setTimeout(() => {
        router.push(`/contests/${contestId}/arena`)
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join contest")
    } finally {
      setJoinLoading(false)
    }
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          {user ? (
            <UserNav user={user} />
          ) : (
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => (window.location.href = "/login")}>
                Login
              </Button>
              <Button onClick={() => (window.location.href = "/signup")}>Sign Up</Button>
            </div>
          )}
        </div>
      </header>
      <main className="flex-1 p-8 pt-6">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <Link href={`/contests`}>
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" /> Back to Contests
              </Button>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Join Live Contest</h1>
            <p className="text-muted-foreground mt-2">Enter your registration ID to join the ongoing contest</p>
          </div>

          {contest && (
            <Card className="w-full max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Join {contest.title}</CardTitle>
                <CardDescription>This contest is currently live and active</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-yellow-50 text-yellow-800 rounded-md dark:bg-yellow-900/20 dark:text-yellow-400">
                  <p className="text-sm font-medium">
                    Make sure you're ready before joining. The timer will start immediately after you join.
                  </p>
                </div>

                <form onSubmit={handleJoinContest}>
                  <div className="space-y-2">
                    <Label htmlFor="joinRegistrationId">Registration ID</Label>
                    <Input
                      id="joinRegistrationId"
                      placeholder="Enter your registration ID"
                      value={registrationId}
                      onChange={(e) => setRegistrationId(e.target.value)}
                      disabled={joinLoading || success}
                      required
                    />
                    <p className="text-xs text-muted-foreground">You must have registered for this contest earlier</p>
                  </div>

                  {error && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="mt-4 bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertDescription>
                        Successfully joined the contest! Redirecting to contest arena...
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full mt-4" disabled={joinLoading || success}>
                    {joinLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Joining...
                      </>
                    ) : success ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Joined
                      </>
                    ) : (
                      "Join Contest Now"
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <p className="text-xs text-center text-muted-foreground">
                  Not registered yet?{" "}
                  <Link href={`/contests/${contestId}/register`} className="text-primary underline">
                    Register first
                  </Link>
                </p>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

