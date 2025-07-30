"use client"

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import axios from "axios"

type User = {
  email: string
  role: string
  id?: number
} | null

type AuthContextType = {
  user: User
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Set up axios interceptor for all requests
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token")
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    return () => {
      axios.interceptors.request.eject(interceptor)
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")
    
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        // Set default authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        delete axios.defaults.headers.common['Authorization']
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      })

      console.log("Login response:", response.data) // Debug log

      // Check if login was successful
      if (response.data.token) {
        const token = response.data.token
        const userData = {
          id: response.data.id,
          email: email,
          role: 'admin' // Set role as admin for admin login
        }
        
        // Store auth data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(userData))
        
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        // Update user state
        setUser(userData)
        return true
      }
      
      return false
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message)
      return false
    }
  }

  const logout = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");
  
      // Call the backend logout endpoint
      await axios.post('http://localhost:5000/api/auth/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      // Clear frontend state and storage
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common['Authorization'];
  
      // Optionally, redirect to login page
      // navigate('/login');  // If using react-router
  
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally show error message to user
      // toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
