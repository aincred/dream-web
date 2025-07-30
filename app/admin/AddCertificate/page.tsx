"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"
import axios from "axios"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function AddCertificate() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    name: "",
    issuedDate: "",
    validityDate: "",
    file: null as File | null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push("/admin")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFormData(prev => ({
        ...prev,
        file: event.target.files![0]
      }))
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    
    try {
      const token = localStorage.getItem("token")
      const storedUser = localStorage.getItem("user")
      
      if (!token || !storedUser) {
        toast.error("Authentication required. Please login again.")
        router.push("/admin")
        return
      }

      const submitData = new FormData()
      
      submitData.append("name", formData.name)
      submitData.append("issued", formData.issuedDate)
      submitData.append("validity", formData.validityDate)
      
      if (formData.file) {
        submitData.append("pdfFile", formData.file)
      }

      console.log("Form Data:", {
        name: formData.name,
        issued: formData.issuedDate,
        validity: formData.validityDate,
        file: formData.file?.name
      })

      const response = await axios.post(
        "http://localhost:5000/api/pdf/upload",
        submitData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      if (response.data.success) {
        toast.success("Certificate uploaded successfully!")
        setFormData({
          name: "",
          issuedDate: "",
          validityDate: "",
          file: null
        })
        router.push("/admin/dashboard")
      } else {
        toast.error(response.data.message || "Failed to upload certificate")
      }
    } catch (error: any) {
      console.error("Error uploading file:", error)
      
      if (error.response?.status === 400) {
        toast.error(error.response.data || "Invalid form data")
      } else if (error.response?.status === 403) {
        toast.error("Access denied. Please ensure you have admin privileges.")
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        router.push("/admin")
      } else if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.")
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        router.push("/admin")
      } else {
        const errorMessage = error.response?.data || "Error uploading certificate"
        toast.error(typeof errorMessage === 'string' ? errorMessage : "Error uploading certificate")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-md mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle>Add Certificate</CardTitle>
            <CardDescription>Upload a new certificate to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter certificate name"
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="issuedDate">Issued Date</Label>
                <Input
                  id="issuedDate"
                  name="issuedDate"
                  type="date"
                  value={formData.issuedDate}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="validityDate">Validity Date</Label>
                <Input
                  id="validityDate"
                  name="validityDate"
                  type="date"
                  value={formData.validityDate}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Upload PDF</Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  required
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Uploading..." : "Upload Certificate"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}


