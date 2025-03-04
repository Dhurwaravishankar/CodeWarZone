"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import RegisterForContest from "@/components/register-for-contest"
import { getCurrentUser } from "@/lib/auth"
import { ArrowLeft } from "lucide-react"

export default function ContestRegistrationPage() {
  const params = useParams()
  const contestId = params.id as string

  const [user, setUser] = useState<any>(null)
  const [contest, setContest] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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
          status: "upcoming",
        })
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [contestId])

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
            <h1 className="text-3xl font-bold tracking-tight">Contest Registration</h1>
            <p className="text-muted-foreground mt-2">
              Register for the contest to participate and compete with other coders
            </p>
          </div>

          {contest && <RegisterForContest contest={contest} />}
        </div>
      </main>
    </div>
  )
}

