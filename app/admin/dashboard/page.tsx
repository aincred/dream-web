"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Worker, Viewer } from "@react-pdf-viewer/core"
import "@react-pdf-viewer/core/lib/styles/index.css"

function formatDate(isoDate: string | number | Date) {
  const date = new Date(isoDate)
  return date.toISOString().split("T")[0]
}

type Certificate = {
  id: string
  name: string
  issued: string
  validity: string
  file_data: {
    type: "Buffer"
    data: number[]
  }
}

export default function AdminDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [cards, setCards] = useState<Certificate[]>([])

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token || !user) {
      router.push("/admin")
    }
  }, [router, user])

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pdf/get-pdfs`)
        const data = await response.json()
        setCards(data)
      } catch (error) {
        console.error("Failed to fetch certificates:", error)
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
    return null // redirect happens in useEffect
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
            <Card
              key={card.id}
              className="flex bg-white dark:bg-gray-800 border border-gray-200 rounded-2xl shadow-lg hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <div className="p-6 flex flex-col space-y-4 w-3/5">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    {card.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">Issued: {formatDate(card.issued)}</p>
                  <p className="text-gray-700 dark:text-gray-300">Valid Until: {formatDate(card.validity)}</p>
                </CardContent>
              </div>

              <div className="w-2/5 p-4">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <Viewer fileUrl={pdfUrl} />
                </Worker>
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
