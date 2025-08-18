// // app/admin/certificate/[id]/page.tsx

// "use client"

// import { useEffect, useState } from "react"
// import { useParams, useRouter } from "next/navigation"
// import { Worker, Viewer } from "@react-pdf-viewer/core"
// import "@react-pdf-viewer/core/lib/styles/index.css"

// type Certificate = {
//   id: string
//   name: string
//   issued: string
//   certificateNumber: string
//   validity: string
//   file_data: { type: "Buffer"; data: number[] }
//   link_file_data?: { type: "Buffer"; data: number[]; name: string } | null
// }

// function formatDate(iso: string | number | Date) {
//   return new Date(iso).toISOString().split("T")[0]
// }

// export default function CertificateDetail() {
//   const params = useParams()
//   const router = useRouter()
//   const [cert, setCert] = useState<Certificate | null>(null)
//   const [linksContent, setLinksContent] = useState<string | null>(null)
//   const [showLinks, setShowLinks] = useState(false)

//   useEffect(() => {
//     const stored = localStorage.getItem("certificates")
//     if (stored) {
//       const certificates: Certificate[] = JSON.parse(stored)
//       const found = certificates.find((c) => c.id === params.id)
//       if (found) {
//         setCert(found)

//         if (found.link_file_data) {
//           const byteArray = new Uint8Array(found.link_file_data.data)
//           const blob = new Blob([byteArray])
//           const reader = new FileReader()
//           reader.onload = () => setLinksContent(reader.result as string)
//           reader.readAsText(blob)
//         }
//       }
//     }
//   }, [params.id])

//   if (!cert) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
//         <p className="text-xl text-gray-600 dark:text-gray-300">Certificate not found.</p>
//       </div>
//     )
//   }

//   const pdfByteArray = new Uint8Array(cert.file_data.data)
//   const pdfBlob = new Blob([pdfByteArray], { type: "application/pdf" })
//   const pdfUrl = URL.createObjectURL(pdfBlob)

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
//       {/* Back Button */}
//       <div className="flex items-center mb-6">
//         <button
//           onClick={() => router.back()}
//           className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition"
//         >
//           ← Back
//         </button>
//       </div>

//       {/* Certificate Header */}
//       <div className="max-w-5xl mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-xl rounded-2xl p-8 mb-8">
//         <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{cert.name}</h1>
//         <div className="grid md:grid-cols-3 gap-6 text-gray-700 dark:text-gray-200">
//           <p>
//             <span className="font-semibold">Certificate No:</span>{" "}
//             <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{cert.certificateNumber}</span>
//           </p>
//           <p>
//             <span className="font-semibold">Issued:</span>{" "}
//             <span className="text-blue-600 dark:text-blue-400">{formatDate(cert.issued)}</span>
//           </p>
//           <p>
//             <span className="font-semibold">Valid Until:</span>{" "}
//             <span className="text-green-600 dark:text-green-400">{formatDate(cert.validity)}</span>
//           </p>
//         </div>
//       </div>

//       {/* PDF Viewer */}
//       <div className="max-w-5xl mx-auto mb-10">
//         <div className="border rounded-2xl shadow-lg overflow-hidden bg-white dark:bg-gray-800">
//           <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
//             <Viewer fileUrl={pdfUrl} />
//           </Worker>
//         </div>
//       </div>

//       {/* Links File */}
//       {cert.link_file_data && (
//         <div className="max-w-5xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Attached Links File</h2>
//             <a
//               href={URL.createObjectURL(
//                 new Blob([new Uint8Array(cert.link_file_data.data)])
//               )}
//               download={cert.link_file_data.name}
//               className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
//             >
//               Download {cert.link_file_data.name}
//             </a>
//           </div>

//           {linksContent && (
//             <div>
//               <button
//                 onClick={() => setShowLinks(!showLinks)}
//                 className="mb-3 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//               >
//                 {showLinks ? "Hide Content" : "Show Content"}
//               </button>

//               {showLinks && (
//                 <pre className="bg-gray-100 dark:bg-gray-900 text-sm p-4 rounded-xl border overflow-x-auto whitespace-pre-wrap text-gray-800 dark:text-gray-200">
//                   {linksContent}
//                 </pre>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// "use client"

// import { useEffect, useState } from "react"
// import { useParams, useRouter } from "next/navigation"
// import Papa from "papaparse"

// type Cert = {
//   id: string
//   name: string
//   certificate_number: string
//   issued: string
//   validity: string
//   pdf_url?: string
//   link_file_url?: string | null
// }

// export default function CertificateDetails() {
//   const { id } = useParams<{ id: string }>()
//   const router = useRouter()
//   const [cert, setCert] = useState<Cert | null>(null)
//   const [links, setLinks] = useState<string[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const run = async () => {
//       const res = await fetch(`/api/certificates/${id}`)
//       const data = await res.json()
//       setCert(data)
//       // Parse links file if present
//       if (data.link_file_url) {
//         const resp = await fetch(data.link_file_url)
//         const blob = await resp.blob()
//         const name = new URL(data.link_file_url).pathname.toLowerCase()

//         if (name.endsWith(".txt")) {
//           const text = await blob.text()
//           setLinks(text.split(/\r?\n/).map(s => s.trim()).filter(Boolean))
//         } else if (name.endsWith(".csv")) {
//           const text = await blob.text()
//           const parsed = Papa.parse<string[]>(text, { skipEmptyLines: true })
//           setLinks(parsed.data.flat().map(s => (Array.isArray(s) ? s.join(" ") : (s as any))).filter(Boolean))
//         } else if (name.endsWith(".xlsx")) {
//           const { read, utils } = await import("xlsx")
//           const buf = await blob.arrayBuffer()
//           const wb = read(buf, { type: "array" })
//           const sheet = wb.Sheets[wb.SheetNames[0]]
//           const rows = utils.sheet_to_json<string[]> (sheet, { header: 1 })
//           setLinks((rows as any[]).flat().filter(Boolean))
//         }
//       }
//       setLoading(false)
//     }
//     run()
//   }, [id])

//   if (loading) return <div className="p-6">Loading...</div>
//   if (!cert) return <div className="p-6">Not found</div>

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <button onClick={() => router.push("/admin/dashboard")} className="mb-4 bg-gray-800 text-white px-3 py-1 rounded">
//         Back
//       </button>

//       <div className="bg-white rounded shadow p-4 mb-6">
//         <h1 className="text-2xl font-bold">{cert.name}</h1>
//         <p>Number: {cert.certificate_number}</p>
//         <p>Issued: {new Date(cert.issued).toISOString().slice(0,10)}</p>
//         <p>Valid Until: {new Date(cert.validity).toISOString().slice(0,10)}</p>
//         {cert.pdf_url && (
//           <a href={cert.pdf_url} target="_blank" className="text-blue-600 underline mt-2 inline-block">Open PDF</a>
//         )}
//       </div>

//       <div className="bg-white rounded shadow p-4">
//         <h2 className="text-xl font-semibold mb-3">Links from Uploaded File</h2>
//         {links.length ? (
//           <ul className="list-disc pl-6 space-y-1">
//             {links.map((lnk, i) => (
//               <li key={i}>
//                 <a href={lnk} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//                   {lnk}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-600">No links file uploaded or file had no URLs.</p>
//         )}
//       </div>
//     </div>
//   )
// }

// app/admin/certificate/[id]/page.tsx

// "use client"

// import { useEffect, useState } from "react"
// import { useParams, useRouter } from "next/navigation"
// import { Worker, Viewer } from "@react-pdf-viewer/core"
// import "@react-pdf-viewer/core/lib/styles/index.css"

// type Certificate = {
//   id: string
//   name: string
//   issued: string
//   certificate_number: string
//   validity: string
//   pdf_url: string | null
//   link_file_url: string | null
// }

// function formatDate(iso: string | number | Date) {
//   return new Date(iso).toISOString().split("T")[0]
// }

// export default function CertificateDetail() {
//   const params = useParams()
//   const router = useRouter()
//   const [cert, setCert] = useState<Certificate | null>(null)
//   const [linksContent, setLinksContent] = useState<string | null>(null)
//   const [showLinks, setShowLinks] = useState(false)
//   const [loading, setLoading] = useState(true)

//   // Fetch certificate from API instead of localStorage
//   useEffect(() => {
//     const fetchCert = async () => {
//       try {
//         const res = await fetch(`/api/certificates/${params.id}`)
//         if (!res.ok) throw new Error("Not found")
//         const data = await res.json()
//         setCert(data)

//         if (data.link_file_url) {
//           const resp = await fetch(data.link_file_url)
//           const text = await resp.text()
//           setLinksContent(text)
//         }
//       } catch (err) {
//         setCert(null)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchCert()
//   }, [params.id])

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
//         <p className="text-xl text-gray-600 dark:text-gray-300">Loading certificate...</p>
//       </div>
//     )
//   }

//   if (!cert) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
//         <p className="text-xl text-gray-600 dark:text-gray-300">Certificate not found.</p>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
//       {/* Back Button */}
//       <div className="flex items-center mb-6">
//         <button
//           onClick={() => router.back()}
//           className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition"
//         >
//           ← Back
//         </button>
//       </div>

//       {/* Certificate Header */}
//       <div className="max-w-5xl mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-xl rounded-2xl p-8 mb-8">
//         <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{cert.name}</h1>
//         <div className="grid md:grid-cols-3 gap-6 text-gray-700 dark:text-gray-200">
//           <p>
//             <span className="font-semibold">Certificate No:</span>{" "}
//             <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{cert.certificate_number}</span>
//           </p>
//           <p>
//             <span className="font-semibold">Issued:</span>{" "}
//             <span className="text-blue-600 dark:text-blue-400">{formatDate(cert.issued)}</span>
//           </p>
//           <p>
//             <span className="font-semibold">Valid Until:</span>{" "}
//             <span className="text-green-600 dark:text-green-400">{formatDate(cert.validity)}</span>
//           </p>
//         </div>
//       </div>

//       {/* PDF Viewer */}
//       {cert.pdf_url && (
//         <div className="max-w-5xl mx-auto mb-10">
//           <div className="border rounded-2xl shadow-lg overflow-hidden bg-white dark:bg-gray-800">
//             <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
//               <Viewer fileUrl={cert.pdf_url} />
//             </Worker>
//           </div>
//         </div>
//       )}

//       {/* Links File */}
//       {cert.link_file_url && (
//         <div className="max-w-5xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Attached Links File</h2>
//             <a
//               href={cert.link_file_url}
//               download
//               className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
//             >
//               Download File
//             </a>
//           </div>

//           {linksContent && (
//             <div>
//               <button
//                 onClick={() => setShowLinks(!showLinks)}
//                 className="mb-3 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//               >
//                 {showLinks ? "Hide Content" : "Show Content"}
//               </button>

//               {showLinks && (
//                 <pre className="bg-gray-100 dark:bg-gray-900 text-sm p-4 rounded-xl border overflow-x-auto whitespace-pre-wrap text-gray-800 dark:text-gray-200">
//                   {linksContent}
//                 </pre>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Worker, Viewer } from "@react-pdf-viewer/core"
import "@react-pdf-viewer/core/lib/styles/index.css"

type Certificate = {
  id: string
  name: string
  issued: string
  certificate_number: string
  validity: string
  pdf_url: string | null
  link_file_url: string | null
}

function formatDate(iso: string | number | Date) {
  return new Date(iso).toISOString().split("T")[0]
}

export default function CertificateDetail() {
  const params = useParams()
  const router = useRouter()
  const [cert, setCert] = useState<Certificate | null>(null)
  const [linksContent, setLinksContent] = useState<string | null>(null)
  const [showLinks, setShowLinks] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fetch certificate from API
  useEffect(() => {
    const fetchCert = async () => {
      try {
        const res = await fetch(`/api/certificates/${params.id}`)
        if (!res.ok) throw new Error("Not found")
        const data = await res.json()
        setCert(data)

        if (data.link_file_url) {
          const resp = await fetch(data.link_file_url)
          const text = await resp.text()
          setLinksContent(text)
        }
      } catch (err) {
        setCert(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCert()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-600 dark:text-gray-300">Loading certificate...</p>
      </div>
    )
  }

  if (!cert) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-600 dark:text-gray-300">Certificate not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
   {/* Back Button */}
<div className="w-full flex justify-end mt-8 mb-6">
  <button
    onClick={() => router.push("/admin/dashboard")}
    className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition"
  >
    ← Back to Dashboard
  </button>
</div>


      {/* Certificate Header */}
      <div className="max-w-5xl mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-xl rounded-2xl p-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{cert.name}</h1>
        <div className="grid md:grid-cols-3 gap-6 text-gray-700 dark:text-gray-200">
          <p>
            <span className="font-semibold">Certificate No:</span>{" "}
            <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{cert.certificate_number}</span>
          </p>
          <p>
            <span className="font-semibold">Issued:</span>{" "}
            <span className="text-blue-600 dark:text-blue-400">{formatDate(cert.issued)}</span>
          </p>
          <p>
            <span className="font-semibold">Valid Until:</span>{" "}
            <span className="text-green-600 dark:text-green-400">{formatDate(cert.validity)}</span>
          </p>
        </div>
      </div>

      {/* PDF Viewer */}
      {cert.pdf_url && (
        <div className="max-w-5xl mx-auto mb-10">
          <div className="border rounded-2xl shadow-lg overflow-hidden bg-white dark:bg-gray-800">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer fileUrl={cert.pdf_url} />
            </Worker>
          </div>
        </div>
      )}

      {/* Links File */}
      {cert.link_file_url && (
        <div className="max-w-5xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Attached Links File</h2>
            <a
              href={cert.link_file_url}
              download
              className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
            >
              Download File
            </a>
          </div>

          {linksContent && (
            <div>
              <button
                onClick={() => setShowLinks(!showLinks)}
                className="mb-3 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              >
                {showLinks ? "Hide Content" : "Show Content"}
              </button>

              {showLinks && (
                <pre className="bg-gray-100 dark:bg-gray-900 text-sm p-4 rounded-xl border overflow-x-auto whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                  {linksContent}
                </pre>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
