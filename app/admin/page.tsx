"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, User } from "lucide-react"

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const { email, password } = credentials
    const isDemoUser = email === "admin@example.com" && password === "admin@123"

    await new Promise((res) => setTimeout(res, 800))

    if (isDemoUser) {
      localStorage.setItem("token", "demo_token")
      router.push("/admin/dashboard")
    } else {
      setError("Invalid email or password")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Admin Login</h2>
        <p className="text-1x2 font-sans text-center  text-gray-900 dark:text-white">Enter your credentials to access the admin dashboard</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                className="pl-10"
                placeholder="Admin Email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                className="pl-10"
                placeholder="Admin Password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Sign in"}
          </Button>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Demo: admin@example.com / admin@123
          </div>
        </form>
      </motion.div>
    </div>
  )
}