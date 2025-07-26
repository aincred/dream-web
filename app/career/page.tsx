"use client"

import { useState, useCallback } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import { useTheme } from "next-themes"
import { Engine } from "tsparticles-engine"
import ReCaptcha from "../components/ReCaptcha"

type FormData = {
  name: string
  email: string
  phone: string
  position: string
  experience: string
  message: string
  resume: FileList
}

export default function CareerPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()
  const [fileName, setFileName] = useState<string | null>(null)
  const [captchaToken, setCaptchaToken] = useState("")
  const [uploading, setUploading] = useState(false)
  const { theme } = useTheme()

  const uploadFile = async (file: File): Promise<string> => {
    const reader = new FileReader()
    
    return new Promise((resolve, reject) => {
      reader.onloadend = async function() {
        const base64String = reader.result?.toString().split(',')[1]
        
        const formData = new FormData()
        formData.append("media", base64String || '')
        formData.append("fileName", file.name)

        try {
          const response = await fetch("https://script.google.com/macros/s/AKfycbxKpL6nmUZ95vjtVvhouO8acwfxvsKQBz7T-lQUEng_OsIGEpAOeE6BjdPoG2bqh0qK2g/exec", {
            method: "POST",
            body: formData
          })

          const result = await response.json()
          if (result.fileUrl) {
            resolve(result.fileUrl)
          } else {
            reject(new Error("Upload failed"))
          }
        } catch (error) {
          reject(error)
        }
      }

      reader.onerror = () => {
        reject(new Error("File reading failed"))
      }

      reader.readAsDataURL(file)
    })
  }

  const onSubmit = async (data: FormData) => {
    if (!captchaToken) {
      alert("Please complete the captcha")
      return
    }

    try {
      setUploading(true)
      // First upload the file
      const fileUrl = await uploadFile(data.resume[0])

      // Then submit the form with all data including file URL
      const formUrl = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSesUcijdfuNT1gDoNPTiiXBCMoUSbRnsELUJry_-O2u0UMyMQ/formResponse"
      const formDataEncoded = new URLSearchParams({
        "entry.1668235426": data.name,
        "entry.413826055": data.email,
        "entry.1498792852": data.phone,
        "entry.631180199": data.position,
        "entry.1688206278": data.experience,
        "entry.2110234862": data.message,
        "entry.1025026578": fileUrl,
        "g-recaptcha-response": captchaToken,
      })

      await fetch(formUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formDataEncoded.toString(),
      })

      alert("Form submitted successfully!")
      reset()
      setFileName(null)
      setCaptchaToken("")
      window.grecaptcha.reset()
    } catch (error) {
      alert("Error submitting form. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
    }
  }

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: any) => {
    await console.log(container)
  }, [])

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative"
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            opacity: 0,
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: theme === "dark" ? "#ffffff" : "#000000",
            },
            links: {
              color: theme === "dark" ? "#ffffff" : "#000000",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <div className="min-h-screen bg-white/70 dark:bg-black/70 py-12 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Join Our Team
          </motion.h1>
          <motion.p
            className="text-xl text-gray-700 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            We're always looking for talented individuals to join our team. If you're passionate about cybersecurity and
            IT solutions, we'd love to hear from you.
          </motion.p>
          <motion.div
            className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...register("name", {
                    required: "Full name is required",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Name should only contain letters and spaces",
                    },
                  })}
                  className={`w-full mt-1 ${errors.name ? "border-red-500" : ""}`}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^A-Za-z\s]/g, "")
                    e.target.value = value
                  }}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full mt-1 ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid phone number, should be 10 digits",
                    },
                  })}
                  className={`w-full mt-1 ${errors.phone ? "border-red-500" : ""}`}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 10)
                    e.target.value = value
                  }}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
              </div>
              <div>
                <Label htmlFor="position">Position Applied For</Label>
                <Input
                  id="position"
                  {...register("position", { required: "Position is required" })}
                  className={`w-full mt-1 ${errors.position ? "border-red-500" : ""}`}
                />
                {errors.position && <p className="mt-1 text-sm text-red-500">{errors.position.message}</p>}
              </div>
              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="text"
                  inputMode="numeric"
                  {...register("experience", {
                    required: "Years of experience is required",
                    pattern: {
                      value: /^[0-9]{1,2}$/,
                      message: "Experience should be a number between 0 and 99",
                    },
                    min: {
                      value: 0,
                      message: "Experience cannot be negative",
                    },
                    max: {
                      value: 99,
                      message: "Experience cannot exceed 99 years",
                    },
                  })}
                  className={`w-full mt-1 ${errors.experience ? "border-red-500" : ""}`}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 2)
                    e.target.value = value
                  }}
                />
                {errors.experience && <p className="mt-1 text-sm text-red-500">{errors.experience.message}</p>}
              </div>
              <div>
                <Label htmlFor="message">Why do you want to join our team?</Label>
                <Textarea
                  id="message"
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 50,
                      message: "Message should be at least 50 characters long",
                    },
                  })}
                  className={`w-full mt-1 h-32 ${errors.message ? "border-red-500" : ""}`}
                />
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
              </div>
              <div>
                <Label htmlFor="resume">Upload Resume (PDF)</Label>
                <div className="mt-1 flex items-center">
                  <label
                    htmlFor="resume"
                    className="cursor-pointer bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 flex items-center justify-center text-sm leading-4 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    <span>Choose file</span>
                    <input
                      id="resume"
                      type="file"
                      accept=".pdf"
                      {...register("resume", {
                        required: "Resume is required",
                        validate: {
                          lessThan10MB: (files) => files[0]?.size < 10000000 || "Max 10MB",
                          acceptedFormats: (files) =>
                            ["application/pdf"].includes(files[0]?.type) || "Only PDF files are allowed",
                        },
                      })}
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                    {fileName ? fileName : "No file chosen"}
                  </span>
                </div>
                {errors.resume && <p className="mt-1 text-sm text-red-500">{errors.resume.message}</p>}
              </div>
              <ReCaptcha sitekey="6Lf6s9QqAAAAAHJlLKzLBUlGx-Nb9Rp_FoNinLMo" onChange={(token) => setCaptchaToken(token)} />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Submit Application"}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
