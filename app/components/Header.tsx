"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, LogOut, Settings, LayoutDashboard } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ThemeToggle } from "./ThemeToggle"
import { useTheme } from "next-themes"
import { useAuth } from "@/app/context/AuthContext"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  // Define navigation items based on user role
  const adminNavItems = [
    { name: "Dashboard", href: "/admin/dashboard" },
    // Add more admin navigation items as needed
  ]

  const userNavItems = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
    { name: "Service", href: "/services" },
    // { name: "Certificate", href: "/certificate" },
    { name: "Company", href: "/company" },
    { name: "Career", href: "/career" },
  ]

  // Get current navigation items based on user status
  const currentNavItems = user ? adminNavItems : userNavItems

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const updateScrolled = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", updateScrolled)
    return () => window.removeEventListener("scroll", updateScrolled)
  }, [])

  // Protect routes - redirect to admin dashboard if trying to access user pages while logged in
  useEffect(() => {
    if (user && pathname && !pathname.startsWith('/admin')) {
      router.push('/admin/dashboard')
    }
  }, [pathname, user, router])

  const handleLogout = () => {
    logout()
    router.push('/admin')
    setIsMenuOpen(false)
  }

  if (!mounted) {
    return null
  }

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/70 dark:bg-zinc-950/70 shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image
              src={resolvedTheme === "dark" ? "/assets/logo/DW_dark.webp" : "/assets/logo/DW_light.webp"}
              alt="Logo"
              width={150}
              height={40}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {currentNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-black dark:text-white hover:text-red-600 dark:hover:text-red-400 ${
                  pathname === item.href ? "font-semibold" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
            {user ? (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500"
              >
                <LogOut className="h-5 w-5" />
              </button>
            ) : (
              <Link
                href="/admin"
                className="text-black dark:text-white hover:text-red-600 dark:hover:text-red-400"
              >
                
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-black dark:text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 py-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
          >
            {currentNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-2 px-4 text-black dark:text-white hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  pathname === item.href ? "font-semibold" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 px-4 text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/admin"
                className="block py-2 px-4 text-black dark:text-white hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Login
              </Link>
            )}
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}

export default Header

