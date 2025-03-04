"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { UpcomingContests } from "@/components/upcoming-contests"
import { getCurrentUser } from "@/lib/auth"

export default function ContestsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUser()
        setUser(userData)
      } catch (error) {
        console.error("Failed to fetch user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

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
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Contests</h2>
        </div>
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="space-y-4">
            <UpcomingContests />
          </TabsContent>
          <TabsContent value="ongoing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>No Ongoing Contests</CardTitle>
                <CardDescription>There are no contests currently in progress.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Check the upcoming tab to see when the next contest will start.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="past" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Past Contests</CardTitle>
                <CardDescription>View results and solutions from previous contests.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="p-4">
                    <h3 className="font-medium">Weekly Challenge #4</h3>
                    <p className="text-sm text-muted-foreground">February 7, 2025</p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        View Results
                      </Button>
                    </div>
                  </div>
                  <div className="border-t p-4">
                    <h3 className="font-medium">Algorithm Sprint #1</h3>
                    <p className="text-sm text-muted-foreground">January 20, 2025</p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        View Results
                      </Button>
                    </div>
                  </div>
                  <div className="border-t p-4">
                    <h3 className="font-medium">Weekly Challenge #3</h3>
                    <p className="text-sm text-muted-foreground">January 7, 2025</p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        View Results
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Load More
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

