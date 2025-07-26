'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    // Use resolvedTheme for more accurate theme detection
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) return null

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-black dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors relative"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun 
          className="absolute top-0 left-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" 
          size={20}
        />
        <Moon 
          className="absolute top-0 left-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" 
          size={20}
        />
      </div>
    </button>
  )
}



// "use client"

// import { Moon, Sun } from "lucide-react"

// interface ThemeToggleProps {
//   setTheme: (theme: "light" | "dark") => void
// }

// export const ThemeToggle = ({ setTheme }: ThemeToggleProps) => {
//   const toggleTheme = () => {
//     // Check current theme from document
//     const isDark = document.documentElement.classList.contains("dark")
//     // Toggle theme
//     setTheme(isDark ? "light" : "dark")
//   }

//   return (
//     <button
//       onClick={toggleTheme}
//       className="p-2 text-black dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors relative"
//     >
//       <div className="relative w-5 h-5">
//         <Sun className="absolute top-0 left-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//         <Moon className="absolute top-0 left-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//       </div>
//     </button>
//   )
// }

