"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Unlock, UserX } from "lucide-react"

export function AdminUserList() {
  // Mock user data for demonstration
  const [users] = useState([
    { id: "1", name: "John Doe", email: "john@example.com", role: "user", status: "active" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "user", status: "active" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "user", status: "inactive" },
    { id: "4", name: "Alice Brown", email: "alice@example.com", role: "admin", status: "active" },
  ])

  return (
    <div className="rounded-md border">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {users.map((user) => (
              <tr key={user.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle">{user.name}</td>
                <td className="p-4 align-middle">{user.email}</td>
                <td className="p-4 align-middle">
                  <Badge variant={user.role === "admin" ? "default" : "outline"}>{user.role}</Badge>
                </td>
                <td className="p-4 align-middle">
                  <Badge variant={user.status === "active" ? "success" : "secondary"}>{user.status}</Badge>
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      {user.status === "active" ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                      <span className="sr-only">{user.status === "active" ? "Deactivate" : "Activate"}</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <UserX className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

