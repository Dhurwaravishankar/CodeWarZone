import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Trophy, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
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
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Master Coding Through Competition
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Join our platform to compete with other coders, solve challenging problems, and improve your skills.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="gap-1">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contests">
                    <Button size="lg" variant="outline">
                      View Contests
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="Hero Image"
                  className="rounded-lg object-cover"
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Everything you need to improve your coding skills and compete with others.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Weekly Challenges</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Participate in weekly coding challenges and compete with others to win prizes.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Code className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Algorithm Sprints</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Test your algorithm skills with timed sprints and improve your problem-solving abilities.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Code Masters Cup</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Compete in our multi-round tournament to become the ultimate Code Master.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            <span className="text-sm font-medium">CodeMasters</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/about" className="text-xs hover:underline underline-offset-4">
              About
            </Link>
            <Link href="/terms" className="text-xs hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="/privacy" className="text-xs hover:underline underline-offset-4">
              Privacy
            </Link>
          </nav>
          <div className="flex-1 text-sm text-gray-500 text-center md:text-right dark:text-gray-400">
            © 2025 CodeMasters. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

