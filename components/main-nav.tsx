import Link from "next/link"
import { Code } from "lucide-react"

export function MainNav() {
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link href="/" className="flex items-center gap-2 font-bold text-xl">
        <Code className="h-6 w-6" />
        <span>CodeMasters</span>
      </Link>
      <nav className="hidden md:flex gap-6">
        <Link href="/contests" className="text-sm font-medium hover:underline underline-offset-4">
          Contests
        </Link>
        <Link href="/practice" className="text-sm font-medium hover:underline underline-offset-4">
          Practice
        </Link>
        <Link href="/leaderboard" className="text-sm font-medium hover:underline underline-offset-4">
          Leaderboard
        </Link>
      </nav>
    </div>
  )
}

