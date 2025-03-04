// This is a mock implementation for demonstration purposes

export async function getAdminProfile() {
  // Simulate API request delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return mock admin data
  return {
    id: "2",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    image: "",
  }
}

