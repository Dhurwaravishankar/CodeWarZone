"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { AdminContestList } from "@/components/admin-contest-list"
import { AdminUserList } from "@/components/admin-user-list"
import { getAdminProfile } from "@/lib/admin"

export default function AdminDashboard() {
  const [admin, setAdmin] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // In a real app, this would fetch the admin's profile from the API
        const adminData = await getAdminProfile()
        setAdmin(adminData)
      } catch (error) {
        console.error("Failed to fetch admin data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAdminData()
  }, [])

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <UserNav user={admin} />
        </div>
      </header>
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Link href="/admin/create-contest">
              <Button>Create Contest</Button>
            </Link>
          </div>
        </div>
        <Tabs defaultValue="contests" className="space-y-4">
          <TabsList>
            <TabsTrigger value="contests">Contests</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
          </TabsList>
          <TabsContent value="contests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Manage Contests</CardTitle>
                <CardDescription>Create, edit, and manage coding contests</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminContestList />
              </CardContent>
              <CardFooter>
                <Link href="/admin/create-contest" className="w-full">
                  <Button className="w-full">Create New Contest</Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Manage Users</CardTitle>
                <CardDescription>View and manage user accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminUserList />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="questions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Question Bank</CardTitle>
                <CardDescription>Create and manage coding questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Link href="/admin/create-question/coding">
                      <Button variant="outline" className="w-full">
                        Add Coding Question
                      </Button>
                    </Link>
                    <Link href="/admin/create-question/mcq">
                      <Button variant="outline" className="w-full">
                        Add MCQ Question
                      </Button>
                    </Link>
                  </div>
                  <div className="rounded-md border">
                    <div className="p-4">
                      <h3 className="font-medium">Question Bank Empty</h3>
                      <p className="text-sm text-muted-foreground">Add questions to populate your question bank</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

