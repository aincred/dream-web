"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Worker, Viewer } from "@react-pdf-viewer/core"
import "@react-pdf-viewer/core/lib/styles/index.css"

function formatDate(isoDate: string | number | Date) {
  const date = new Date(isoDate)
  return date.toISOString().split('T')[0]
}

export default function AdminDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [cards, setCards] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log("Token in local storage:", token); // Log the token
    if (!token || !user) {
      // If no token or user, redirect to login
      router.push("/admin")
    }
  }, [router, user])

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pdf/get-pdfs")
        console.log("response data ", response.file_data);
        const data = await response.json()
        setCards(data)
      } catch (error) {
        console.error("Failed to fetch cards:", error)
      }
    }

    if (user) {
      fetchCards()
    }
  }, [user])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-8">Certificate Lists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => {
          const byteArray = new Uint8Array(card.file_data.data)
          const blob = new Blob([byteArray], { type: "application/pdf" })
          const pdfUrl = URL.createObjectURL(blob)

          return (
            <Card key={card.id} className="flex bg-white dark:bg-gray-800 border border-gray-200 rounded-2xl shadow-lg hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700">
              <div className="p-6 flex flex-col space-y-4">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">{card.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">Issued: {formatDate(card.issued)}</p>
                  <p className="text-gray-700 dark:text-gray-300">Valid Until: {formatDate(card.validity)}</p>
                </CardContent>
              </div>
              <div style={{ width: "40%", height: "500px", marginTop: "20px" }}>
                <div style={{ width: "100%", height: "450px", marginTop: "20px" }}>
                  <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                    <Viewer fileUrl={pdfUrl} />
                  </Worker>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <button
        className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition"
        onClick={() => router.push("/admin/AddCertificate")}
      >
        Add Certificate
      </button>
    </div>
  )
}
