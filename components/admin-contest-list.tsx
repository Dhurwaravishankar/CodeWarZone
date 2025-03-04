"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getAllContests } from "@/lib/contests"
import { Edit, Trash2 } from "lucide-react"

export function AdminContestList() {
  const [contests, setContests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const data = await getAllContests()
        setContests(data)
      } catch (error) {
        console.error("Failed to fetch contests:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContests()
  }, [])

  if (loading) {
    return <div className="flex justify-center p-4">Loading contests...</div>
  }

  if (contests.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-muted-foreground">No contests found. Create your first contest!</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Title</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {contests.map((contest) => (
              <tr
                key={contest.id}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                <td className="p-4 align-middle">{contest.title}</td>
                <td className="p-4 align-middle">{new Date(contest.date).toLocaleDateString()}</td>
                <td className="p-4 align-middle capitalize">{contest.type.replace("-", " ")}</td>
                <td className="p-4 align-middle capitalize">{contest.status}</td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/edit-contest/${contest.id}`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
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

