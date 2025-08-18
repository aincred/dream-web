// // "use client"

// // import { useState } from "react"
// // import { useRouter } from "next/navigation"
// // import { Input } from "@/components/ui/input"
// // import { Button } from "@/components/ui/button"
// // import { Label } from "@/components/ui/label"
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // import { Loader2 } from "lucide-react"

// // export default function AddCertificate() {
// //   const router = useRouter()
// //   const [name, setName] = useState("")
// //   const [certificateNumber, setCertificateNumber] = useState("")
// //   const [issued, setIssued] = useState("")
// //   const [validity, setValidity] = useState("")
// //   const [file, setFile] = useState<File | null>(null)
// //   const [linkFile, setLinkFile] = useState<File | null>(null)
// //   const [error, setError] = useState("")
// //   const [addUrl, setAddUrl] = useState("no")
// //   const [loading, setLoading] = useState(false)

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()

// //     if (!name || !certificateNumber || !issued || !validity || !file) {
// //       setError("Please fill out all fields and upload the certificate file.")
// //       return
// //     }

// //     if (addUrl === "yes" && !linkFile) {
// //       setError("Please upload an Excel, CSV, or Text file for links.")
// //       return
// //     }

// //     setError("")
// //     setLoading(true)

// //     const readFileAsBuffer = (file: File) =>
// //       new Promise<Uint8Array>((resolve, reject) => {
// //         const reader = new FileReader()
// //         reader.onload = () => {
// //           const fileData = reader.result as ArrayBuffer
// //           resolve(new Uint8Array(fileData))
// //         }
// //         reader.onerror = reject
// //         reader.readAsArrayBuffer(file)
// //       })

// //     try {
// //       const certBuffer = await readFileAsBuffer(file)
// //       let linkBuffer: Uint8Array | null = null

// //       if (linkFile) {
// //         linkBuffer = await readFileAsBuffer(linkFile)
// //       }

// //       const stored = localStorage.getItem("certificates")
// //       const certs = stored ? JSON.parse(stored) : []

// //       const newCert = {
// //         id: Date.now().toString(),
// //         name,
// //         certificateNumber,
// //         issued,
// //         validity,
// //         file_data: {
// //           type: "Buffer",
// //           data: Array.from(certBuffer),
// //         },
// //         link_file_data: linkBuffer
// //           ? {
// //               type: "Buffer",
// //               data: Array.from(linkBuffer),
// //               name: linkFile?.name,
// //             }
// //           : null,
// //       }

// //       localStorage.setItem("certificates", JSON.stringify([...certs, newCert]))

// //       setTimeout(() => {
// //         router.push("/admin/dashboard")
// //       }, 1000)
// //     } catch (err) {
// //       setError("Error processing files. Please try again.")
// //       setLoading(false)
// //     }
// //   }

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6 py-12">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="w-full max-w-4xl bg-white dark:bg-zinc-800 p-10 rounded-2xl shadow-xl"
// //       >
// //         <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-8">
// //           Add Certificate
// //         </h2>

// //         {error && <p className="text-red-500 text-center text-sm font-medium mb-6">{error}</p>}

// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
// //           <div className="flex flex-col">
// //             <Label htmlFor="name">Certificate Name</Label>
// //             <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
// //           </div>

// //           <div className="flex flex-col">
// //             <Label htmlFor="certificateNumber">Certificate Number</Label>
// //             <Input
// //               id="certificateNumber"
// //               value={certificateNumber}
// //               onChange={(e) => setCertificateNumber(e.target.value)}
// //               required
// //             />
// //           </div>

// //           <div className="flex flex-col">
// //             <Label htmlFor="issued">Issued Date</Label>
// //             <Input id="issued" type="date" value={issued} onChange={(e) => setIssued(e.target.value)} required />
// //           </div>

// //           <div className="flex flex-col">
// //             <Label htmlFor="validity">Valid Until</Label>
// //             <Input id="validity" type="date" value={validity} onChange={(e) => setValidity(e.target.value)} required />
// //           </div>

// //           <div className="flex flex-col col-span-1 md:col-span-2">
// //             <Label htmlFor="file">PDF File (Certificate)</Label>
// //             <Input id="file" type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
// //           </div>

// //           <div className="flex flex-col col-span-1 md:col-span-2">
// //             <Label>Add URL?</Label>
// //             <Select onValueChange={(value) => setAddUrl(value)} defaultValue="no">
// //               <SelectTrigger className="w-full">
// //                 <SelectValue placeholder="Select an option" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="yes">Yes</SelectItem>
// //                 <SelectItem value="no">No</SelectItem>
// //               </SelectContent>
// //             </Select>
// //           </div>

// //           {addUrl === "yes" && (
// //             <div className="flex flex-col col-span-1 md:col-span-2">
// //               <Label htmlFor="linkFile">Excel, CSV, or Text File (Links)</Label>
// //               <Input
// //                 id="linkFile"
// //                 type="file"
// //                 accept=".xlsx,.csv,.txt"
// //                 onChange={(e) => setLinkFile(e.target.files?.[0] || null)}
// //               />
// //             </div>
// //           )}
// //         </div>

// //         <div className="mt-8 flex justify-center">
// //           <Button
// //             type="submit"
// //             className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md shadow-md flex items-center gap-2"
// //             disabled={loading}
// //           >
// //             {loading && <Loader2 className="animate-spin h-5 w-5" />}
// //             {loading ? "Processing..." : "Add Certificate"}
// //           </Button>
// //         </div>
// //       </form>
// //     </div>
// //   )
// // }
// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"

// export default function AddCertificate() {
//   const router = useRouter()
//   const [name, setName] = useState("")
//   const [certificateNumber, setCertificateNumber] = useState("")
//   const [issued, setIssued] = useState("")
//   const [validity, setValidity] = useState("")
//   const [pdf, setPdf] = useState<File | null>(null)
//   const [linkFile, setLinkFile] = useState<File | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")

//   async function upload(file: File, folder: "pdfs" | "links") {
//     const fd = new FormData()
//     fd.append("file", file)
//     fd.append("folder", folder)
//     const res = await fetch("/api/upload", { method: "POST", body: fd })
//     const json = await res.json()
//     if (!res.ok) throw new Error(json.error || "Upload failed")
//     return json.path as string
//   }

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     if (!name || !certificateNumber || !issued || !validity || !pdf) {
//       setError("Please fill out all required fields and attach the PDF.")
//       return
//     }
//     setLoading(true)
//     try {
//       const pdfPath = await upload(pdf, "pdfs")
//       let linkFilePath: string | undefined
//       if (linkFile) linkFilePath = await upload(linkFile, "links")

//       const res = await fetch("/api/certificates", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           certificateNumber,
//           issued,
//           validity,
//           pdfPath,
//           linkFilePath,
//         }),
//       })
//       if (!res.ok) throw new Error("Failed to save certificate")

//       router.push("/admin/dashboard")
//     } catch (err: any) {
//       setError(err.message || "Something went wrong")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Add Certificate</h1>
//       {error && <p className="text-red-600 mb-4">{error}</p>}

//       <form onSubmit={onSubmit} className="grid gap-4">
//         <input className="border p-2 rounded" placeholder="Certificate name"
//           value={name} onChange={(e) => setName(e.target.value)} />
//         <input className="border p-2 rounded" placeholder="Certificate number"
//           value={certificateNumber} onChange={(e) => setCertificateNumber(e.target.value)} />
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm mb-1">Issued</label>
//             <input type="date" className="border p-2 rounded w-full"
//               value={issued} onChange={(e) => setIssued(e.target.value)} />
//           </div>
//           <div>
//             <label className="block text-sm mb-1">Valid Until</label>
//             <input type="date" className="border p-2 rounded w-full"
//               value={validity} onChange={(e) => setValidity(e.target.value)} />
//           </div>
//         </div>
//         <div>
//           <label className="block text-sm mb-1">PDF (certificate)</label>
//           <input type="file" accept="application/pdf" onChange={(e) => setPdf(e.target.files?.[0] || null)} />
//         </div>
//         <div>
//           <label className="block text-sm mb-1">Links file (txt/csv/xlsx) — optional</label>
//           <input type="file" accept=".txt,.csv,.xlsx" onChange={(e) => setLinkFile(e.target.files?.[0] || null)} />
//         </div>

//         <button disabled={loading}
//           className="bg-red-600 text-white px-4 py-2 rounded">
//           {loading ? "Saving..." : "Save"}
//         </button>
//       </form>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export default function AddCertificate() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [certificateNumber, setCertificateNumber] = useState("")
  const [issued, setIssued] = useState("")
  const [validity, setValidity] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [linkFile, setLinkFile] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [addUrl, setAddUrl] = useState("no")
  const [loading, setLoading] = useState(false)

  async function upload(file: File, folder: "pdfs" | "links") {
    const fd = new FormData()
    fd.append("file", file)
    fd.append("folder", folder)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error || "Upload failed")
    return json.path as string
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !certificateNumber || !issued || !validity || !file) {
      setError("Please fill out all required fields and upload the certificate PDF.")
      return
    }

    if (addUrl === "yes" && !linkFile) {
      setError("Please upload an Excel, CSV, or Text file for links.")
      return
    }

    setError("")
    setLoading(true)

    try {
      // Upload PDF
      const pdfPath = await upload(file, "pdfs")

      // Upload optional links file
      let linkFilePath: string | undefined
      if (linkFile) {
        linkFilePath = await upload(linkFile, "links")
      }

      // Save certificate entry in DB
      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          certificateNumber,
          issued,
          validity,
          pdfPath,
          linkFilePath,
        }),
      })

      if (!res.ok) throw new Error("Failed to save certificate")

      router.push("/admin/dashboard")
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white dark:bg-zinc-800 p-10 rounded-2xl shadow-xl"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-8">
          Add Certificate
        </h2>

        {error && (
          <p className="text-red-500 text-center text-sm font-medium mb-6">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col">
            <Label htmlFor="name">Certificate Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="certificateNumber">Certificate Number</Label>
            <Input
              id="certificateNumber"
              value={certificateNumber}
              onChange={(e) => setCertificateNumber(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="issued">Issued Date</Label>
            <Input
              id="issued"
              type="date"
              value={issued}
              onChange={(e) => setIssued(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="validity">Valid Until</Label>
            <Input
              id="validity"
              type="date"
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col col-span-1 md:col-span-2">
            <Label htmlFor="file">PDF File (Certificate)</Label>
            <Input
              id="file"
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <div className="flex flex-col col-span-1 md:col-span-2">
            <Label>Add URL?</Label>
            <Select onValueChange={(value) => setAddUrl(value)} defaultValue="no">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {addUrl === "yes" && (
            <div className="flex flex-col col-span-1 md:col-span-2">
              <Label htmlFor="linkFile">Excel, CSV, or Text File (Links)</Label>
              <Input
                id="linkFile"
                type="file"
                accept=".xlsx,.csv,.txt"
                onChange={(e) => setLinkFile(e.target.files?.[0] || null)}
              />
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md shadow-md flex items-center gap-2"
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin h-5 w-5" />}
            {loading ? "Saving..." : "Add Certificate"}
          </Button>
        </div>
      </form>
    </div>
  )
}
