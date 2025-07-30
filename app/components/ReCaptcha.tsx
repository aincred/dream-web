"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import type React from "react" // Added import for React

declare global {
  interface Window {
    grecaptcha: any
  }
}

interface ReCaptchaProps {
  sitekey: string
  onChange: (token: string) => void
}

const ReCaptcha: React.FC<ReCaptchaProps> = ({ sitekey, onChange }) => {
  const { theme } = useTheme()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load the reCAPTCHA script only once
    const script = document.createElement("script")
    script.src = "https://www.google.com/recaptcha/api.js?render=explicit"
    script.async = true
    script.defer = true
    script.onload = () => setIsLoaded(true) // Set the flag to true when the script has loaded
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (isLoaded && window.grecaptcha) {
      window.grecaptcha.ready(() => {
        window.grecaptcha.render("recaptcha-container", {
          sitekey: sitekey,
          theme: theme === "dark" ? "dark" : "light",
          callback: onChange,
        })
      })
    }
  }, [sitekey, onChange, theme, isLoaded]) // Add isLoaded to dependencies

  return <div id="recaptcha-container"></div>
}

export default ReCaptcha

