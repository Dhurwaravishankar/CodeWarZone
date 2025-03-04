// This is a mock implementation for demonstration purposes

interface Contest {
  id: string
  title: string
  description: string
  date: string
  startTime: string
  duration: string
  type: string
  createdBy: string
  status: "upcoming" | "active" | "completed"
}

// Mock contests database
const contests: Contest[] = [
  {
    id: "1",
    title: "Weekly Challenge #1",
    description: "Solve algorithmic problems in this weekly challenge.",
    date: "2025-03-15",
    startTime: "18:00",
    duration: "2",
    type: "weekly-challenge",
    createdBy: "2",
    status: "upcoming",
  },
  {
    id: "2",
    title: "Algorithm Sprint #1",
    description: "Test your algorithm skills in this timed sprint.",
    date: "2025-03-20",
    startTime: "20:00",
    duration: "1.5",
    type: "algorithm-sprint",
    createdBy: "2",
    status: "upcoming",
  },
]

export async function createContest(data: any): Promise<Contest> {
  // Simulate API request delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Create new contest
  const newContest: Contest = {
    id: String(contests.length + 1),
    title: data.title,
    description: data.description,
    date: data.date,
    startTime: data.startTime,
    duration: data.duration,
    type: data.type,
    createdBy: "2", // Admin ID
    status: "upcoming",
  }

  // Add contest to database
  contests.push(newContest)

  return newContest
}

export async function getUpcomingContests(): Promise<Contest[]> {
  // Simulate API request delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return upcoming contests
  return contests.filter((contest) => contest.status === "upcoming")
}

export async function getAllContests(): Promise<Contest[]> {
  // Simulate API request delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return all contests
  return contests
}

