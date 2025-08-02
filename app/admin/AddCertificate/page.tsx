//add certificate page for admin to add new certificates

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function AddCertificate() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [issued, setIssued] = useState("")
  const [validity, setValidity] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !issued || !validity || !file) {
      setError("Please fill out all fields and upload a file.")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const fileData = reader.result as ArrayBuffer
      const buffer = new Uint8Array(fileData)

      const stored = localStorage.getItem("certificates")
      const certs = stored ? JSON.parse(stored) : []

      const newCert = {
        id: Date.now().toString(),
        name,
        issued,
        validity,
        file_data: {
          type: "Buffer",
          data: Array.from(buffer),
        },
      }

      localStorage.setItem("certificates", JSON.stringify([...certs, newCert]))
      router.push("/admin/dashboard")
    }

    reader.readAsArrayBuffer(file)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Add Certificate</h2>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <div>
          <Label htmlFor="name">Certificate Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div>
          <Label htmlFor="issued">Issued Date</Label>
          <Input id="issued" type="date" value={issued} onChange={(e) => setIssued(e.target.value)} required />
        </div>

        <div>
          <Label htmlFor="validity">Valid Until</Label>
          <Input id="validity" type="date" value={validity} onChange={(e) => setValidity(e.target.value)} required />
        </div>

        <div>
          <Label htmlFor="file">PDF File</Label>
          <Input id="file" type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>

        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
          Add Certificate
        </Button>
      </form>
    </div>
  )
}

