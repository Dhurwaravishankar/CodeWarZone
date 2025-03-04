// This is a mock implementation for demonstration purposes
// In a real app, you would use a proper authentication system

interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  image?: string
}

interface SignupData {
  name: string
  email: string
  password: string
  role: string
  adminCode?: string
}

interface LoginData {
  email: string
  password: string
}

// Mock user database
const users: User[] = [
  {
    id: "1",
    name: "Test User",
    email: "user@example.com",
    role: "user",
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
]

export async function createUserAccount(data: SignupData): Promise<User> {
  // Simulate API request delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if user already exists
  if (users.some((user) => user.email === data.email)) {
    throw new Error("User with this email already exists")
  }

  // Validate admin code if role is admin
  if (data.role === "admin" && data.adminCode !== "123456") {
    throw new Error("Invalid admin code")
  }

  // Create new user
  const newUser: User = {
    id: String(users.length + 1),
    name: data.name,
    email: data.email,
    role: data.role as "user" | "admin",
  }

  // Add user to database
  users.push(newUser)

  return newUser
}

export async function loginUser(data: LoginData): Promise<User> {
  // Simulate API request delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Find user by email
  const user = users.find((user) => user.email === data.email)

  // Check if user exists and password is correct
  // In a real app, you would hash and compare passwords
  if (!user) {
    throw new Error("Invalid email or password")
  }

  // Set user in localStorage (in a real app, you would use a proper auth token)
  localStorage.setItem("currentUser", JSON.stringify(user))

  return user
}

export async function logoutUser(): Promise<void> {
  // Simulate API request delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Remove user from localStorage
  localStorage.removeItem("currentUser")
}

export async function getCurrentUser(): Promise<User | null> {
  // In a real app, you would validate the token with your backend
  const userJson = localStorage.getItem("currentUser")

  if (!userJson) {
    return null
  }

  return JSON.parse(userJson)
}

