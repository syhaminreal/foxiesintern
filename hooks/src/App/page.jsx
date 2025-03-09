import { redirect } from "next/navigation"

export default function Home() {
  // In a real app, you would check authentication here
  // For demo purposes, we'll just redirect to the dashboard
  redirect("/dashboard")
}

