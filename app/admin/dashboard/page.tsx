// dashboard page for admin to view and manage certificates
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Worker, Viewer } from "@react-pdf-viewer/core"
import "@react-pdf-viewer/core/lib/styles/index.css"

type Certificate = {
  id: string
  name: string
  issued: string
  validity: string
  file_data: { type: "Buffer"; data: number[] }
}

function formatDate(iso: string | number | Date) {
  return new Date(iso).toISOString().split("T")[0]
}

export default function AdminDashboard() {
  const router = useRouter()
  const [certificates, setCertificates] = useState<Certificate[]>([])

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/admin")
    } else {
      const stored = localStorage.getItem("certificates")
      const certs = stored ? JSON.parse(stored) : []
      setCertificates(certs)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("certificates")
    router.push("/admin")
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-4 px-4">
        <h1 className="text-3xl font-bold ">Admin Certificate Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => {
          const byteArray = new Uint8Array(cert.file_data.data)
          const blob = new Blob([byteArray], { type: "application/pdf" })
          const pdfUrl = URL.createObjectURL(blob)

          return (
            <Card key={cert.id} className="flex bg-white dark:bg-gray-800 border border-gray-200 rounded-2xl shadow-lg">
              <div className="p-6 flex flex-col space-y-4 w-3/5">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    {cert.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">Issued: {formatDate(cert.issued)}</p>
                  <p className="text-gray-700 dark:text-gray-300">Valid Until: {formatDate(cert.validity)}</p>
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
        onClick={() => router.push("/admin/AddCertificate")}
        className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition"
      >
        Add Certificate
      </button>
    </div>
  )
}
