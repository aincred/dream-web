// app/admin/dashboard/page.tsx

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Certificate = {
  id: string
  name: string
  issued: string
  validity: string
  certificate_no: string
  pdf_url?: string | null
  link_file_url?: string | null
  file_data?: { type: "Buffer"; data: number[] } | null
  link_file_data?: { type: "Buffer"; data: number[]; name: string } | null
}

// Spinner Component
function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  )
}

function formatDate(iso: string | number | Date) {
  return new Date(iso).toISOString().split("T")[0]
}

function getValidityStatus(validUntil: string) {
  const now = new Date()
  const expiry = new Date(validUntil)
  const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return { status: "Expired", color: "text-red-600" }
  if (diffDays <= 60) return { status: "Expiring Soon", color: "text-yellow-500" }
  return { status: "Valid", color: "text-green-600" }
}

export default function AdminDashboard() {
  const router = useRouter()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)

  const [search, setSearch] = useState("")
  const [filtered, setFiltered] = useState<Certificate[]>([])

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/admin")
      return
    }

    fetch("/api/certificates", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data: Certificate[]) => {
        const sorted = data.reverse()
        setCertificates(sorted)
        setFiltered(sorted) // initially show all
      })
      .catch((err) => console.error("Failed to fetch certificates:", err))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/admin")
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/certificates/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      if (res.ok) {
        setCertificates((prev) => prev.filter((cert) => cert.id !== id))
        setFiltered((prev) => prev.filter((cert) => cert.id !== id))
      } else {
        alert("Failed to delete certificate")
      }
    } catch (err) {
      console.error("Delete error:", err)
    } finally {
      setDeletingId(null)
    }
  }

  const handleAddCertificate = () => {
    setAdding(true)
    router.push("/admin/AddCertificate")
  }

  // 🔍 Apply Search Only When Button Clicked
  const handleSearch = () => {
    if (search.trim() === "") {
      setFiltered(certificates)
    } else {
      const result = certificates.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.certificate_no.toLowerCase().includes(search.toLowerCase())
      )
      setFiltered(result)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-4">
        <h1 className="text-3xl font-bold">Admin Certificate Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold">Total</h2>
          <p className="text-2xl font-bold">{certificates.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-green-600">Valid</h2>
          <p className="text-2xl font-bold">
            {certificates.filter((c) => getValidityStatus(c.validity).status === "Valid").length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-yellow-500">Expiring Soon</h2>
          <p className="text-2xl font-bold">
            {certificates.filter((c) => getValidityStatus(c.validity).status === "Expiring Soon").length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-600">Expired</h2>
          <p className="text-2xl font-bold">
            {certificates.filter((c) => getValidityStatus(c.validity).status === "Expired").length}
          </p>
        </div>
      </div>

      {/* Search Box with Button */}
      <div className="mb-6 flex flex-col sm:flex-row gap-2 sm:gap-4">
        <input
          type="text"
          placeholder="Search by Name or Certificate No..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Certificates Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Certificate No</th>
              <th className="px-4 py-2 text-left">Valid Until</th>
              <th className="px-4 py-2 text-left">Issued</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((cert) => {
              const { status, color } = getValidityStatus(cert.validity)

              return (
                <tr
                  key={cert.id}
                  className="bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700"
                >
                  <td className="px-4 py-2 font-semibold">{cert.name}</td>
                  <td className="px-4 py-2">{cert.certificate_no}</td>
                  <td className="px-4 py-2">{formatDate(cert.validity)}</td>
                  <td className="px-4 py-2">{formatDate(cert.issued)}</td>
                  <td className={`px-4 py-2 font-semibold ${color}`}>{status}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => router.push(`/admin/certificate/${cert.id}`)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      More
                    </button>
                    <button
                      onClick={() => handleDelete(cert.id)}
                      disabled={deletingId === cert.id}
                      className={`px-3 py-1 flex items-center gap-1 rounded text-white ${
                        deletingId === cert.id
                          ? "bg-gray-500"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {deletingId === cert.id ? <Spinner /> : "Delete"}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={handleAddCertificate}
        disabled={adding}
        className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition flex items-center justify-center"
      >
        {adding ? <Spinner /> : "Add Certificate "}
      </button>
    </div>
  )
}


// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { Worker, Viewer } from "@react-pdf-viewer/core"
// import "@react-pdf-viewer/core/lib/styles/index.css"

// type Certificate = {
//   id: string
//   name: string
//   issued: string
//   validity: string
//   certificate_no: string
//   pdf_url?: string | null
//   link_file_url?: string | null
//   file_data?: { type: "Buffer"; data: number[] } | null
//   link_file_data?: { type: "Buffer"; data: number[]; name: string } | null
// }

// // 🔹 Small Spinner Component
// function Spinner() {
//   return (
//     <svg
//       className="animate-spin h-5 w-5 text-white"
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//     >
//       <circle
//         className="opacity-25"
//         cx="12"
//         cy="12"
//         r="10"
//         stroke="currentColor"
//         strokeWidth="4"
//       ></circle>
//       <path
//         className="opacity-75"
//         fill="currentColor"
//         d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//       ></path>
//     </svg>
//   )
// }

// function formatDate(iso: string | number | Date) {
//   return new Date(iso).toISOString().split("T")[0]
// }

// function getValidityStatus(validUntil: string) {
//   const now = new Date()
//   const expiry = new Date(validUntil)
//   const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

//   if (diffDays < 0) return { status: "Expired", color: "text-red-600", priority: 2 }
//   if (diffDays <= 60) return { status: "Expiring Soon", color: "text-yellow-500", priority: 0 }
//   return { status: "Valid", color: "text-green-600", priority: 1 }
// }

// export default function AdminDashboard() {
//   const router = useRouter()
//   const [certificates, setCertificates] = useState<Certificate[]>([])
//   const [deletingId, setDeletingId] = useState<string | null>(null)
//   const [adding, setAdding] = useState(false)

//   useEffect(() => {
//     const token = localStorage.getItem("token")
//     if (!token) {
//       router.push("/admin")
//       return
//     }

//     fetch("/api/certificates", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data: Certificate[]) => {
//         const sorted = data.reverse() // newest first
//         setCertificates(sorted)
//       })
//       .catch((err) => console.error("Failed to fetch certificates:", err))
//   }, [router])

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     router.push("/admin")
//   }

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this certificate?")) return
//     setDeletingId(id)
//     try {
//       const res = await fetch(`/api/certificates/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       })
//       if (res.ok) {
//         setCertificates((prev) => prev.filter((cert) => cert.id !== id))
//       } else {
//         alert("Failed to delete certificate")
//       }
//     } catch (err) {
//       console.error("Delete error:", err)
//     } finally {
//       setDeletingId(null)
//     }
//   }

//   const handleAddCertificate = () => {
//     setAdding(true)
//     router.push("/admin/AddCertificate")
//   }

//   const getPdfUrl = (cert: Certificate): string | null => {
//     if (cert.pdf_url) return cert.pdf_url
//     if (cert.link_file_url) return cert.link_file_url

//     if (cert.file_data?.data) {
//       const byteArray = new Uint8Array(cert.file_data.data)
//       const blob = new Blob([byteArray], { type: "application/pdf" })
//       return URL.createObjectURL(blob)
//     }
//     if (cert.link_file_data?.data) {
//       const byteArray = new Uint8Array(cert.link_file_data.data)
//       const blob = new Blob([byteArray], { type: "application/pdf" })
//       return URL.createObjectURL(blob)
//     }
//     return null
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6 px-4">
//         <h1 className="text-3xl font-bold">Admin Certificate Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
//         >
//           Logout
//         </button>
//       </div>

//       {/* 📊 Stats Section */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
//           <h2 className="text-xl font-semibold">Total</h2>
//           <p className="text-2xl font-bold">{certificates.length}</p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
//           <h2 className="text-xl font-semibold text-green-600">Valid</h2>
//           <p className="text-2xl font-bold">
//             {certificates.filter((c) => getValidityStatus(c.validity).status === "Valid").length}
//           </p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
//           <h2 className="text-xl font-semibold text-yellow-500">Expiring Soon</h2>
//           <p className="text-2xl font-bold">
//             {certificates.filter((c) => getValidityStatus(c.validity).status === "Expiring Soon").length}
//           </p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
//           <h2 className="text-xl font-semibold text-red-600">Expired</h2>
//           <p className="text-2xl font-bold">
//             {certificates.filter((c) => getValidityStatus(c.validity).status === "Expired").length}
//           </p>
//         </div>
//       </div>

//       {/* Certificates Row Table-like */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300 dark:border-gray-700">
//           <thead className="bg-gray-200 dark:bg-gray-700">
//             <tr>
//               <th className="px-4 py-2 text-left">Name</th>
//               <th className="px-4 py-2 text-left">Certificate No</th>
//               <th className="px-4 py-2 text-left">Valid Until</th>
//               <th className="px-4 py-2 text-left">Issued</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//               <th className="px-4 py-2 text-left">Preview</th>
//             </tr>
//           </thead>
//           <tbody>
//             {certificates.map((cert) => {
//               const pdfUrl = getPdfUrl(cert)
//               const { status, color } = getValidityStatus(cert.validity)

//               return (
//                 <tr
//                   key={cert.id}
//                   className="bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700"
//                 >
//                   <td className="px-4 py-2 font-semibold">{cert.name}</td>
//                   <td className="px-4 py-2">{cert.certificate_no}</td>
//                   <td className="px-4 py-2">{formatDate(cert.validity)}</td>
//                   <td className="px-4 py-2">{formatDate(cert.issued)}</td>
//                   <td className={`px-4 py-2 font-semibold ${color}`}>{status}</td>
//                   <td className="px-4 py-2 flex gap-2">
//                     <button
//                       onClick={() => router.push(`/admin/certificate/${cert.id}`)}
//                       className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
//                     >
//                       More
//                     </button>
//                     <button
//                       onClick={() => handleDelete(cert.id)}
//                       disabled={deletingId === cert.id}
//                       className={`px-3 py-1 flex items-center gap-1 rounded text-white ${
//                         deletingId === cert.id
//                           ? "bg-gray-500"
//                           : "bg-red-600 hover:bg-red-700"
//                       }`}
//                     >
//                       {deletingId === cert.id ? <Spinner /> : "Delete"}
//                     </button>
//                   </td>
//                   <td className="px-4 py-2 w-40">
//                     {pdfUrl ? (
//                       <div className="h-40 overflow-hidden border rounded">
//                         <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
//                           <Viewer fileUrl={pdfUrl} />
//                         </Worker>
//                       </div>
//                     ) : (
//                       <p className="text-sm text-gray-500 italic">No PDF</p>
//                     )}
//                   </td>
//                 </tr>
//               )
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* Floating Add Button */}
//       <button
//         onClick={handleAddCertificate}
//         disabled={adding}
//         className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition flex items-center justify-center"
//       >
//         {adding ? <Spinner /> : "Add Certificate "}
//       </button>
//     </div>
//   )
// }




// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Worker, Viewer } from "@react-pdf-viewer/core"
// import "@react-pdf-viewer/core/lib/styles/index.css"

// type Certificate = {
//   id: string
//   name: string
//   issued: string
//   validity: string
//   certificate_no: string
//   pdf_url?: string | null
//   link_file_url?: string | null
//   file_data?: { type: "Buffer"; data: number[] } | null
//   link_file_data?: { type: "Buffer"; data: number[]; name: string } | null
// }

// // 🔹 Small Spinner Component
// function Spinner() {
//   return (
//     <svg
//       className="animate-spin h-5 w-5 text-white"
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//     >
//       <circle
//         className="opacity-25"
//         cx="12"
//         cy="12"
//         r="10"
//         stroke="currentColor"
//         strokeWidth="4"
//       ></circle>
//       <path
//         className="opacity-75"
//         fill="currentColor"
//         d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//       ></path>
//     </svg>
//   )
// }

// function formatDate(iso: string | number | Date) {
//   return new Date(iso).toISOString().split("T")[0]
// }

// function getValidityStatus(validUntil: string) {
//   const now = new Date()
//   const expiry = new Date(validUntil)
//   const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

//   if (diffDays < 0) return { status: "Expired", color: "text-red-600", priority: 2 }
//   if (diffDays <= 60) return { status: "Expiring Soon", color: "text-yellow-500", priority: 0 }
//   return { status: "Valid", color: "text-green-600", priority: 1 }
// }

// export default function AdminDashboard() {
//   const router = useRouter()
//   const [certificates, setCertificates] = useState<Certificate[]>([])
//   const [deletingId, setDeletingId] = useState<string | null>(null)
//   const [adding, setAdding] = useState(false)

//   useEffect(() => {
//     const token = localStorage.getItem("token")
//     if (!token) {
//       router.push("/admin")
//       return
//     }

//     fetch("/api/certificates", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data: Certificate[]) => {
//         const sorted = data.sort((a, b) => {
//           const statusA = getValidityStatus(a.validity).priority
//           const statusB = getValidityStatus(b.validity).priority
//           return statusA - statusB
//         })
//         setCertificates(sorted)
//       })
//       .catch((err) => console.error("Failed to fetch certificates:", err))
//   }, [router])

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     router.push("/admin")
//   }

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this certificate?")) return
//     setDeletingId(id)
//     try {
//       const res = await fetch(`/api/certificates/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       })
//       if (res.ok) {
//         setCertificates((prev) => prev.filter((cert) => cert.id !== id))
//       } else {
//         alert("Failed to delete certificate")
//       }
//     } catch (err) {
//       console.error("Delete error:", err)
//     } finally {
//       setDeletingId(null)
//     }
//   }

//   const handleAddCertificate = () => {
//     setAdding(true)
//     router.push("/admin/AddCertificate")
//   }

//   const getPdfUrl = (cert: Certificate): string | null => {
//     if (cert.pdf_url) return cert.pdf_url
//     if (cert.link_file_url) return cert.link_file_url

//     if (cert.file_data?.data) {
//       const byteArray = new Uint8Array(cert.file_data.data)
//       const blob = new Blob([byteArray], { type: "application/pdf" })
//       return URL.createObjectURL(blob)
//     }
//     if (cert.link_file_data?.data) {
//       const byteArray = new Uint8Array(cert.link_file_data.data)
//       const blob = new Blob([byteArray], { type: "application/pdf" })
//       return URL.createObjectURL(blob)
//     }
//     return null
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6 px-4">
//         <h1 className="text-3xl font-bold">Admin Certificate Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
//         >
//           Logout
//         </button>
//       </div>

//       {/* 📊 Stats Section */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
//           <h2 className="text-xl font-semibold">Total</h2>
//           <p className="text-2xl font-bold">{certificates.length}</p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
//           <h2 className="text-xl font-semibold text-green-600">Valid</h2>
//           <p className="text-2xl font-bold">
//             {certificates.filter((c) => getValidityStatus(c.validity).status === "Valid").length}
//           </p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
//           <h2 className="text-xl font-semibold text-yellow-500">Expiring Soon</h2>
//           <p className="text-2xl font-bold">
//             {certificates.filter((c) => getValidityStatus(c.validity).status === "Expiring Soon").length}
//           </p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
//           <h2 className="text-xl font-semibold text-red-600">Expired</h2>
//           <p className="text-2xl font-bold">
//             {certificates.filter((c) => getValidityStatus(c.validity).status === "Expired").length}
//           </p>
//         </div>
//       </div>

//       {/* Certificates List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {certificates.map((cert) => {
//           const pdfUrl = getPdfUrl(cert)
//           const { status, color } = getValidityStatus(cert.validity)

//           return (
//             <Card
//               key={cert.id}
//               className="flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-lg"
//             >
//               <div className="p-6 flex flex-col space-y-4 w-full md:w-3/5">
//                 <CardHeader>
//                   <CardTitle className="text-2xl font-bold">{cert.name}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p>
//                     Certificate No:{" "}
//                     <span className="font-semibold">{cert.certificate_no}</span>
//                   </p>
//                   <p>Valid Until: {formatDate(cert.validity)}</p>
//                   <p>Issued: {formatDate(cert.issued)}</p>
//                   <p className={`font-semibold ${color}`}>Status: {status}</p>
//                 </CardContent>

//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => router.push(`/admin/certificate/${cert.id}`)}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//                   >
//                     More
//                   </button>
//                   <button
//                     onClick={() => handleDelete(cert.id)}
//                     disabled={deletingId === cert.id}
//                     className={`px-4 py-2 flex items-center gap-2 rounded text-white ${
//                       deletingId === cert.id
//                         ? "bg-gray-500"
//                         : "bg-red-600 hover:bg-red-700"
//                     }`}
//                   >
//                     {deletingId === cert.id ? (
//                       <>
//                         <Spinner /> Deleting...
//                       </>
//                     ) : (
//                       "Delete"
//                     )}
//                   </button>
//                 </div>
//               </div>

//               <div className="w-full md:w-2/5 p-4">
//                 {pdfUrl ? (
//                   <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
//                     <Viewer fileUrl={pdfUrl} />
//                   </Worker>
//                 ) : (
//                   <p className="text-sm text-gray-500 italic">No PDF available</p>
//                 )}
//               </div>
//             </Card>
//           )
//         })}
//       </div>

//       {/* Floating Add Button */}
//       <button
//         onClick={handleAddCertificate}
//         disabled={adding}
//         className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition flex items-center justify-center"
//       >
//         {adding ? <Spinner /> : "Add Certificate "}
//       </button>
//     </div>
//   )
// }

// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Worker, Viewer } from "@react-pdf-viewer/core"
// import "@react-pdf-viewer/core/lib/styles/index.css"

// type Certificate = {
//   id: string
//   name: string
//   issued: string
//   validity: string
//   certificate_no: string
//   pdf_url?: string | null
//   link_file_url?: string | null
//   file_data?: { type: "Buffer"; data: number[] } | null
//   link_file_data?: { type: "Buffer"; data: number[]; name: string } | null
// }

// function formatDate(iso: string | number | Date) {
//   return new Date(iso).toISOString().split("T")[0]
// }

// function getValidityStatus(validUntil: string) {
//   const now = new Date()
//   const expiry = new Date(validUntil)
//   const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

//   if (diffDays < 0) return { status: "Expired", color: "text-red-600", priority: 2 }
//   if (diffDays <= 60) return { status: "Expiring Soon", color: "text-yellow-500", priority: 0 }
//   return { status: "Valid", color: "text-green-600", priority: 1 }
// }

// export default function AdminDashboard() {
//   const router = useRouter()
//   const [certificates, setCertificates] = useState<Certificate[]>([])
//   const [deletingId, setDeletingId] = useState<string | null>(null)

//   useEffect(() => {
//     const token = localStorage.getItem("token")
//     if (!token) {
//       router.push("/admin")
//       return
//     }

//     fetch("/api/certificates", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data: Certificate[]) => {
//         const sorted = data.sort((a, b) => {
//           const statusA = getValidityStatus(a.validity).priority
//           const statusB = getValidityStatus(b.validity).priority
//           return statusA - statusB
//         })
//         setCertificates(sorted)
//       })
//       .catch((err) => console.error("Failed to fetch certificates:", err))
//   }, [router])

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     router.push("/admin")
//   }

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this certificate?")) return
//     setDeletingId(id)
//     try {
//       const res = await fetch(`/api/certificates/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       })
//       if (res.ok) {
//         setCertificates((prev) => prev.filter((cert) => cert.id !== id))
//       } else {
//         alert("Failed to delete certificate")
//       }
//     } catch (err) {
//       console.error("Delete error:", err)
//     } finally {
//       setDeletingId(null)
//     }
//   }

//   const getPdfUrl = (cert: Certificate): string | null => {
//     if (cert.pdf_url) return cert.pdf_url
//     if (cert.link_file_url) return cert.link_file_url

//     if (cert.file_data?.data) {
//       const byteArray = new Uint8Array(cert.file_data.data)
//       const blob = new Blob([byteArray], { type: "application/pdf" })
//       return URL.createObjectURL(blob)
//     }
//     if (cert.link_file_data?.data) {
//       const byteArray = new Uint8Array(cert.link_file_data.data)
//       const blob = new Blob([byteArray], { type: "application/pdf" })
//       return URL.createObjectURL(blob)
//     }
//     return null
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6 px-4">
//         <h1 className="text-3xl font-bold">Admin Certificate Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
//         >
//           Logout
//         </button>
//       </div>

//       {/* 📊 Stats Section */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
//           <h2 className="text-xl font-semibold">Total</h2>
//           <p className="text-2xl font-bold">{certificates.length}</p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
//           <h2 className="text-xl font-semibold text-green-600">Valid</h2>
//           <p className="text-2xl font-bold">
//             {certificates.filter((c) => getValidityStatus(c.validity).status === "Valid").length}
//           </p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
//           <h2 className="text-xl font-semibold text-yellow-500">Expiring Soon</h2>
//           <p className="text-2xl font-bold">
//             {certificates.filter((c) => getValidityStatus(c.validity).status === "Expiring Soon").length}
//           </p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
//           <h2 className="text-xl font-semibold text-red-600">Expired</h2>
//           <p className="text-2xl font-bold">
//             {certificates.filter((c) => getValidityStatus(c.validity).status === "Expired").length}
//           </p>
//         </div>
//       </div>

//       {/* Certificates List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {certificates.map((cert) => {
//           const pdfUrl = getPdfUrl(cert)
//           const { status, color } = getValidityStatus(cert.validity)

//           return (
//             <Card
//               key={cert.id}
//               className="flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-lg"
//             >
//               <div className="p-6 flex flex-col space-y-4 w-full md:w-3/5">
//                 <CardHeader>
//                   <CardTitle className="text-2xl font-bold">{cert.name}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p>
//                     Certificate No:{" "}
//                     <span className="font-semibold">{cert.certificate_no}</span>
//                   </p>
//                   <p>Valid Until: {formatDate(cert.validity)}</p>
//                   <p>Issued: {formatDate(cert.issued)}</p>
//                   <p className={`font-semibold ${color}`}>Status: {status}</p>
//                 </CardContent>

//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => router.push(`/admin/certificate/${cert.id}`)}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//                   >
//                     More
//                   </button>
//                   <button
//                     onClick={() => handleDelete(cert.id)}
//                     disabled={deletingId === cert.id}
//                     className={`px-4 py-2 rounded text-white ${
//                       deletingId === cert.id
//                         ? "bg-gray-500"
//                         : "bg-red-600 hover:bg-red-700"
//                     }`}
//                   >
//                     {deletingId === cert.id ? "Deleting..." : "Delete"}
//                   </button>
//                 </div>
//               </div>

//               <div className="w-full md:w-2/5 p-4">
//                 {pdfUrl ? (
//                   <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
//                     <Viewer fileUrl={pdfUrl} />
//                   </Worker>
//                 ) : (
//                   <p className="text-sm text-gray-500 italic">No PDF available</p>
//                 )}
//               </div>
//             </Card>
//           )
//         })}
//       </div>

//       {/* Floating Add Button */}
//       <button
//         onClick={() => router.push("/admin/AddCertificate")}
//         className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition"
//       >
//         Add Certificate
//       </button>
//     </div>
//   )
// }






// // "use client"

// // import { useEffect, useState } from "react"
// // import { useRouter } from "next/navigation"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Worker, Viewer } from "@react-pdf-viewer/core"
// // import "@react-pdf-viewer/core/lib/styles/index.css"

// // type Certificate = {
// //   id: string
// //   name: string
// //   issued: string
// //   certificateNumber: string
// //   validity: string
// //   file_data: { type: "Buffer"; data: number[] }
// //   link_file_data?: { type: "Buffer"; data: number[]; name: string } | null
// // }

// // function formatDate(iso: string | number | Date) {
// //   return new Date(iso).toISOString().split("T")[0]
// // }

// // function getValidityStatus(validUntil: string) {
// //   const now = new Date()
// //   const expiry = new Date(validUntil)
// //   const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

// //   if (diffDays < 0) return { status: "Expired", color: "text-red-600", priority: 2 }
// //   if (diffDays <= 60) return { status: "Expiring Soon", color: "text-yellow-500", priority: 0 }
// //   return { status: "Valid", color: "text-green-600", priority: 1 }
// // }

// // export default function AdminDashboard() {
// //   const router = useRouter()
// //   const [certificates, setCertificates] = useState<Certificate[]>([])
// //   const [deletingId, setDeletingId] = useState<string | null>(null)

// //   useEffect(() => {
// //     const token = localStorage.getItem("token")
// //     if (!token) {
// //       router.push("/admin")
// //     } else {
// //       const stored = localStorage.getItem("certificates")
// //       const certs: Certificate[] = stored ? JSON.parse(stored) : []

// //       const sorted = certs.sort((a, b) => {
// //         const statusA = getValidityStatus(a.validity).priority
// //         const statusB = getValidityStatus(b.validity).priority
// //         return statusA - statusB
// //       })

// //       setCertificates(sorted)
// //     }
// //   }, [router])

// //   const handleLogout = () => {
// //     localStorage.removeItem("token")
// //     localStorage.removeItem("certificates")
// //     router.push("/admin")
// //   }

// //   const handleDelete = (id: string) => {
// //     if (confirm("Are you sure you want to delete this certificate?")) {
// //       setDeletingId(id)
// //       setTimeout(() => {
// //         const updated = certificates.filter((cert) => cert.id !== id)
// //         setCertificates(updated)
// //         localStorage.setItem("certificates", JSON.stringify(updated))
// //         setDeletingId(null)
// //       }, 1000)
// //     }
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
// //       <div className="flex justify-between items-center mb-4 px-4">
// //         <h1 className="text-3xl font-bold">Admin Certificate Dashboard</h1>
// //         <button
// //           onClick={handleLogout}
// //           className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
// //         >
// //           Logout
// //         </button>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         {certificates.map((cert) => {
// //           const byteArray = new Uint8Array(cert.file_data.data)
// //           const blob = new Blob([byteArray], { type: "application/pdf" })
// //           const pdfUrl = URL.createObjectURL(blob)
// //           const { status, color } = getValidityStatus(cert.validity)

// //           return (
// //             <Card key={cert.id} className="flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-lg">
// //               <div className="p-6 flex flex-col space-y-4 w-full md:w-3/5">
// //                 <CardHeader>
// //                   <CardTitle className="text-2xl font-bold">{cert.name}</CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p>Certificate No: <span className="font-semibold">{cert.certificateNumber}</span></p>
// //                   <p>Valid Until: {formatDate(cert.validity)}</p>
// //                   <p>Issued: {formatDate(cert.issued)}</p>
// //                   <p className={`font-semibold ${color}`}>Status: {status}</p>
// //                 </CardContent>

// //                 <div className="flex gap-3">
// //                   <button
// //                     onClick={() => router.push(`/admin/certificate/${cert.id}`)}
// //                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
// //                   >
// //                     More
// //                   </button>
// //                   <button
// //                     onClick={() => handleDelete(cert.id)}
// //                     disabled={deletingId === cert.id}
// //                     className={`px-4 py-2 rounded text-white ${
// //                       deletingId === cert.id ? "bg-gray-500" : "bg-red-600 hover:bg-red-700"
// //                     }`}
// //                   >
// //                     {deletingId === cert.id ? "Deleting..." : "Delete"}
// //                   </button>
// //                 </div>
// //               </div>

// //               <div className="w-full md:w-2/5 p-4">
// //                 <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
// //                   <Viewer fileUrl={pdfUrl} />
// //                 </Worker>
// //               </div>
// //             </Card>
// //           )
// //         })}
// //       </div>

// //       <button
// //         onClick={() => router.push("/admin/AddCertificate")}
// //         className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition"
// //       >
// //         Add Certificate
// //       </button>
// //     </div>
// //   )
// // }

// // "use client"

// // import { useEffect, useState } from "react"
// // import { useRouter } from "next/navigation"
// // import { Worker, Viewer } from "@react-pdf-viewer/core"
// // import "@react-pdf-viewer/core/lib/styles/index.css"

// // type Cert = {
// //   id: string
// //   name: string
// //   certificate_number: string
// //   issued: string
// //   validity: string
// //   pdf_path: string
// //   link_file_path?: string | null
// //   pdf_url?: string       // signed URLs (from API)
// //   link_file_url?: string // signed URLs (from API)
// // }

// // function getValidityStatus(validUntil: string) {
// //   const now = new Date()
// //   const expiry = new Date(validUntil)
// //   const diff = Math.ceil((+expiry - +now) / (1000 * 60 * 60 * 24))
// //   if (diff < 0) return { label: "Expired", cls: "text-red-600" }
// //   if (diff <= 60) return { label: "Expiring Soon", cls: "text-yellow-600" }
// //   return { label: "Valid", cls: "text-green-600" }
// // }

// // export default function Dashboard() {
// //   const router = useRouter()
// //   const [certs, setCerts] = useState<Cert[]>([])
// //   const [deleting, setDeleting] = useState<string | null>(null)

// //   useEffect(() => {
// //     fetch("/api/certificates")
// //       .then((r) => r.json())
// //       .then(setCerts)
// //   }, [])

// //   const onDelete = async (id: string) => {
// //     if (!confirm("Delete this certificate?")) return
// //     setDeleting(id)
// //     const res = await fetch(`/api/certificates/${id}`, { method: "DELETE" })
// //     if (res.ok) setCerts((arr) => arr.filter((c) => c.id !== id))
// //     setDeleting(null)
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6">
// //       <div className="flex items-center justify-between mb-6">
// //         <h1 className="text-2xl font-bold">Admin Certificate Dashboard</h1>
// //         <button
// //           onClick={() => router.push("/admin/AddCertificate")}
// //           className="bg-red-600 text-white px-4 py-2 rounded"
// //         >
// //           Add Certificate
// //         </button>
// //       </div>

// //       <div className="grid md:grid-cols-2 gap-6">
// //         {certs.map((c) => {
// //           const status = getValidityStatus(c.validity)
// //           return (
// //             <div key={c.id} className="bg-white rounded shadow p-4 flex flex-col md:flex-row gap-4">
// //               <div className="flex-1">
// //                 <h2 className="text-lg font-semibold">{c.name}</h2>
// //                 <p><span className="font-medium">Number:</span> {c.certificate_number}</p>
// //                 <p><span className="font-medium">Issued:</span> {new Date(c.issued).toISOString().slice(0,10)}</p>
// //                 <p><span className="font-medium">Valid Until:</span> {new Date(c.validity).toISOString().slice(0,10)}</p>
// //                 <p className={`font-semibold ${status.cls}`}>Status: {status.label}</p>

// //                 <div className="mt-3 flex gap-2">
// //                   <button
// //                     onClick={() => router.push(`/admin/certificate/${c.id}`)}
// //                     className="bg-blue-600 text-white px-3 py-1 rounded"
// //                   >
// //                     More
// //                   </button>
// //                   <button
// //                     onClick={() => onDelete(c.id)}
// //                     disabled={deleting === c.id}
// //                     className={`px-3 py-1 rounded text-white ${deleting === c.id ? "bg-gray-500" : "bg-red-600"}`}
// //                   >
// //                     {deleting === c.id ? "Deleting..." : "Delete"}
// //                   </button>
// //                 </div>
// //               </div>

// //               <div className="md:w-1/2 w-full border rounded">
// //                 {c.pdf_url ? (
// //                   <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
// //                     <Viewer fileUrl={c.pdf_url} />
// //                   </Worker>
// //                 ) : (
// //                   <p className="p-3 text-sm text-gray-600">No preview available.</p>
// //                 )}
// //               </div>
// //             </div>
// //           )
// //         })}
// //       </div>
// //     </div>
// //   )
// // }
// // "use client"

// // import { useEffect, useState } from "react"
// // import { useRouter } from "next/navigation"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Worker, Viewer } from "@react-pdf-viewer/core"
// // import "@react-pdf-viewer/core/lib/styles/index.css"

// // type Certificate = {
// //   id: string
// //   name: string
// //   issued: string
// //   certificateNumber: string
// //   validity: string
// //   file_data: { type: "Buffer"; data: number[] }
// //   link_file_data?: { type: "Buffer"; data: number[]; name: string } | null
// // }

// // function formatDate(iso: string | number | Date) {
// //   return new Date(iso).toISOString().split("T")[0]
// // }

// // function getValidityStatus(validUntil: string) {
// //   const now = new Date()
// //   const expiry = new Date(validUntil)
// //   const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

// //   if (diffDays < 0) return { status: "Expired", color: "text-red-600", priority: 2 }
// //   if (diffDays <= 60) return { status: "Expiring Soon", color: "text-yellow-500", priority: 0 }
// //   return { status: "Valid", color: "text-green-600", priority: 1 }
// // }

// // export default function AdminDashboard() {
// //   const router = useRouter()
// //   const [certificates, setCertificates] = useState<Certificate[]>([])
// //   const [deletingId, setDeletingId] = useState<string | null>(null)

// //   useEffect(() => {
// //     const token = localStorage.getItem("token")
// //     if (!token) {
// //       router.push("/admin")
// //       return
// //     }

// //     fetch("/api/certificates", {
// //       headers: { Authorization: `Bearer ${token}` },
// //     })
// //       .then((res) => res.json())
// //       .then((data: Certificate[]) => {
// //         const sorted = data.sort((a, b) => {
// //           const statusA = getValidityStatus(a.validity).priority
// //           const statusB = getValidityStatus(b.validity).priority
// //           return statusA - statusB
// //         })
// //         setCertificates(sorted)
// //       })
// //       .catch((err) => console.error("Failed to fetch certificates:", err))
// //   }, [router])

// //   const handleLogout = () => {
// //     localStorage.removeItem("token")
// //     router.push("/admin")
// //   }

// //   const handleDelete = async (id: string) => {
// //     if (!confirm("Are you sure you want to delete this certificate?")) return
// //     setDeletingId(id)
// //     try {
// //       const res = await fetch(`/api/certificates/${id}`, {
// //         method: "DELETE",
// //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// //       })
// //       if (res.ok) {
// //         setCertificates((prev) => prev.filter((cert) => cert.id !== id))
// //       } else {
// //         alert("Failed to delete certificate")
// //       }
// //     } catch (err) {
// //       console.error("Delete error:", err)
// //     } finally {
// //       setDeletingId(null)
// //     }
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
// //       <div className="flex justify-between items-center mb-4 px-4">
// //         <h1 className="text-3xl font-bold">Admin Certificate Dashboard</h1>
// //         <button
// //           onClick={handleLogout}
// //           className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
// //         >
// //           Logout
// //         </button>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         {certificates.map((cert) => {
// //           const byteArray = new Uint8Array(cert.file_data.data)
// //           const blob = new Blob([byteArray], { type: "application/pdf" })
// //           const pdfUrl = URL.createObjectURL(blob)
// //           const { status, color } = getValidityStatus(cert.validity)

// //           return (
// //             <Card key={cert.id} className="flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-lg">
// //               <div className="p-6 flex flex-col space-y-4 w-full md:w-3/5">
// //                 <CardHeader>
// //                   <CardTitle className="text-2xl font-bold">{cert.name}</CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p>Certificate No: <span className="font-semibold">{cert.certificateNumber}</span></p>
// //                   <p>Valid Until: {formatDate(cert.validity)}</p>
// //                   <p>Issued: {formatDate(cert.issued)}</p>
// //                   <p className={`font-semibold ${color}`}>Status: {status}</p>
// //                 </CardContent>

// //                 <div className="flex gap-3">
// //                   <button
// //                     onClick={() => router.push(`/admin/certificate/${cert.id}`)}
// //                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
// //                   >
// //                     More
// //                   </button>
// //                   <button
// //                     onClick={() => handleDelete(cert.id)}
// //                     disabled={deletingId === cert.id}
// //                     className={`px-4 py-2 rounded text-white ${
// //                       deletingId === cert.id ? "bg-gray-500" : "bg-red-600 hover:bg-red-700"
// //                     }`}
// //                   >
// //                     {deletingId === cert.id ? "Deleting..." : "Delete"}
// //                   </button>
// //                 </div>
// //               </div>

// //               <div className="w-full md:w-2/5 p-4">
// //                 <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
// //                   <Viewer fileUrl={pdfUrl} />
// //                 </Worker>
// //               </div>
// //             </Card>
// //           )
// //         })}
// //       </div>

// //       <button
// //         onClick={() => router.push("/admin/AddCertificate")}
// //         className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition"
// //       >
// //         Add Certificate
// //       </button>
// //     </div>
// //   )
// // }

// // "use client"

// // import { useEffect, useState } from "react"
// // import { useRouter } from "next/navigation"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Worker, Viewer } from "@react-pdf-viewer/core"
// // import "@react-pdf-viewer/core/lib/styles/index.css"

// // type Certificate = {
// //   id: string
// //   name: string
// //   issued: string
// //   certificateNumber: string
// //   validity: string
// //   file_data?: { type: "Buffer"; data: number[] } | null
// //   link_file_data?: { type: "Buffer"; data: number[]; name: string } | null
// // }

// // function formatDate(iso: string | number | Date) {
// //   return new Date(iso).toISOString().split("T")[0]
// // }

// // function getValidityStatus(validUntil: string) {
// //   const now = new Date()
// //   const expiry = new Date(validUntil)
// //   const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

// //   if (diffDays < 0) return { status: "Expired", color: "text-red-600", priority: 2 }
// //   if (diffDays <= 60) return { status: "Expiring Soon", color: "text-yellow-500", priority: 0 }
// //   return { status: "Valid", color: "text-green-600", priority: 1 }
// // }

// // export default function AdminDashboard() {
// //   const router = useRouter()
// //   const [certificates, setCertificates] = useState<Certificate[]>([])
// //   const [deletingId, setDeletingId] = useState<string | null>(null)

// //   useEffect(() => {
// //     const token = localStorage.getItem("token")
// //     if (!token) {
// //       router.push("/admin")
// //       return
// //     }

// //     fetch("/api/certificates", {
// //       headers: { Authorization: `Bearer ${token}` },
// //     })
// //       .then((res) => res.json())
// //       .then((data: Certificate[]) => {
// //         const sorted = data.sort((a, b) => {
// //           const statusA = getValidityStatus(a.validity).priority
// //           const statusB = getValidityStatus(b.validity).priority
// //           return statusA - statusB
// //         })
// //         setCertificates(sorted)
// //       })
// //       .catch((err) => console.error("Failed to fetch certificates:", err))
// //   }, [router])

// //   const handleLogout = () => {
// //     localStorage.removeItem("token")
// //     router.push("/admin")
// //   }

// //   const handleDelete = async (id: string) => {
// //     if (!confirm("Are you sure you want to delete this certificate?")) return
// //     setDeletingId(id)
// //     try {
// //       const res = await fetch(`/api/certificates/${id}`, {
// //         method: "DELETE",
// //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// //       })
// //       if (res.ok) {
// //         setCertificates((prev) => prev.filter((cert) => cert.id !== id))
// //       } else {
// //         alert("Failed to delete certificate")
// //       }
// //     } catch (err) {
// //       console.error("Delete error:", err)
// //     } finally {
// //       setDeletingId(null)
// //     }
// //   }

// //   const getPdfUrl = (cert: Certificate): string | null => {
// //     if (cert.file_data?.data) {
// //       const byteArray = new Uint8Array(cert.file_data.data)
// //       const blob = new Blob([byteArray], { type: "application/pdf" })
// //       return URL.createObjectURL(blob)
// //     }
// //     if (cert.link_file_data?.data) {
// //       const byteArray = new Uint8Array(cert.link_file_data.data)
// //       const blob = new Blob([byteArray], { type: "application/pdf" })
// //       return URL.createObjectURL(blob)
// //     }
// //     return null
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
// //       <div className="flex justify-between items-center mb-4 px-4">
// //         <h1 className="text-3xl font-bold">Admin Certificate Dashboard</h1>
// //         <button
// //           onClick={handleLogout}
// //           className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
// //         >
// //           Logout
// //         </button>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         {certificates.map((cert) => {
// //           const pdfUrl = getPdfUrl(cert)
// //           const { status, color } = getValidityStatus(cert.validity)

// //           return (
// //             <Card
// //               key={cert.id}
// //               className="flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-lg"
// //             >
// //               <div className="p-6 flex flex-col space-y-4 w-full md:w-3/5">
// //                 <CardHeader>
// //                   <CardTitle className="text-2xl font-bold">{cert.name}</CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p>
// //                     Certificate No:{" "}
// //                     <span className="font-semibold">{cert.certificateNumber}</span>
// //                   </p>
// //                   <p>Valid Until: {formatDate(cert.validity)}</p>
// //                   <p>Issued: {formatDate(cert.issued)}</p>
// //                   <p className={`font-semibold ${color}`}>Status: {status}</p>
// //                 </CardContent>

// //                 <div className="flex gap-3">
// //                   <button
// //                     onClick={() => router.push(`/admin/certificate/${cert.id}`)}
// //                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
// //                   >
// //                     More
// //                   </button>
// //                   <button
// //                     onClick={() => handleDelete(cert.id)}
// //                     disabled={deletingId === cert.id}
// //                     className={`px-4 py-2 rounded text-white ${
// //                       deletingId === cert.id
// //                         ? "bg-gray-500"
// //                         : "bg-red-600 hover:bg-red-700"
// //                     }`}
// //                   >
// //                     {deletingId === cert.id ? "Deleting..." : "Delete"}
// //                   </button>
// //                 </div>
// //               </div>

// //               <div className="w-full md:w-2/5 p-4">
// //                 {pdfUrl ? (
// //                   <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
// //                     <Viewer fileUrl={pdfUrl} />
// //                   </Worker>
// //                 ) : (
// //                   <p className="text-sm text-gray-500 italic">No PDF available</p>
// //                 )}
// //               </div>
// //             </Card>
// //           )
// //         })}
// //       </div>

// //       <button
// //         onClick={() => router.push("/admin/AddCertificate")}
// //         className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition"
// //       >
// //         Add Certificate
// //       </button>
// //     </div>
// //   )
// // }


// // "use client"

// // import { useEffect, useState } from "react"
// // import { useRouter } from "next/navigation"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Worker, Viewer } from "@react-pdf-viewer/core"
// // import "@react-pdf-viewer/core/lib/styles/index.css"

// // type Certificate = {
// //   id: string
// //   name: string
// //   issued: string
// //   certificateNumber: string
// //   validity: string
// //   pdf_url?: string | null   // ✅ comes from API
// //   link_file_url?: string | null // ✅ comes from API
// //   file_data?: { type: "Buffer"; data: number[] } | null
// //   link_file_data?: { type: "Buffer"; data: number[]; name: string } | null
// // }

// // function formatDate(iso: string | number | Date) {
// //   return new Date(iso).toISOString().split("T")[0]
// // }

// // function getValidityStatus(validUntil: string) {
// //   const now = new Date()
// //   const expiry = new Date(validUntil)
// //   const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

// //   if (diffDays < 0) return { status: "Expired", color: "text-red-600", priority: 2 }
// //   if (diffDays <= 60) return { status: "Expiring Soon", color: "text-yellow-500", priority: 0 }
// //   return { status: "Valid", color: "text-green-600", priority: 1 }
// // }

// // export default function AdminDashboard() {
// //   const router = useRouter()
// //   const [certificates, setCertificates] = useState<Certificate[]>([])
// //   const [deletingId, setDeletingId] = useState<string | null>(null)

// //   useEffect(() => {
// //     const token = localStorage.getItem("token")
// //     if (!token) {
// //       router.push("/admin")
// //       return
// //     }

// //     fetch("/api/certificates", {
// //       headers: { Authorization: `Bearer ${token}` },
// //     })
// //       .then((res) => res.json())
// //       .then((data: Certificate[]) => {
// //         const sorted = data.sort((a, b) => {
// //           const statusA = getValidityStatus(a.validity).priority
// //           const statusB = getValidityStatus(b.validity).priority
// //           return statusA - statusB
// //         })
// //         setCertificates(sorted)
// //       })
// //       .catch((err) => console.error("Failed to fetch certificates:", err))
// //   }, [router])

// //   const handleLogout = () => {
// //     localStorage.removeItem("token")
// //     router.push("/admin")
// //   }

// //   const handleDelete = async (id: string) => {
// //     if (!confirm("Are you sure you want to delete this certificate?")) return
// //     setDeletingId(id)
// //     try {
// //       const res = await fetch(`/api/certificates/${id}`, {
// //         method: "DELETE",
// //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// //       })
// //       if (res.ok) {
// //         setCertificates((prev) => prev.filter((cert) => cert.id !== id))
// //       } else {
// //         alert("Failed to delete certificate")
// //       }
// //     } catch (err) {
// //       console.error("Delete error:", err)
// //     } finally {
// //       setDeletingId(null)
// //     }
// //   }

// //   // ✅ Fixed: Prefer signed URLs from API
// //   const getPdfUrl = (cert: Certificate): string | null => {
// //     if (cert.pdf_url) return cert.pdf_url
// //     if (cert.link_file_url) return cert.link_file_url

// //     // fallback (if raw buffer is still being used)
// //     if (cert.file_data?.data) {
// //       const byteArray = new Uint8Array(cert.file_data.data)
// //       const blob = new Blob([byteArray], { type: "application/pdf" })
// //       return URL.createObjectURL(blob)
// //     }
// //     if (cert.link_file_data?.data) {
// //       const byteArray = new Uint8Array(cert.link_file_data.data)
// //       const blob = new Blob([byteArray], { type: "application/pdf" })
// //       return URL.createObjectURL(blob)
// //     }
// //     return null
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
// //       <div className="flex justify-between items-center mb-4 px-4">
// //         <h1 className="text-3xl font-bold">Admin Certificate Dashboard</h1>
// //         <button
// //           onClick={handleLogout}
// //           className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
// //         >
// //           Logout
// //         </button>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         {certificates.map((cert) => {
// //           const pdfUrl = getPdfUrl(cert)
// //           const { status, color } = getValidityStatus(cert.validity)

// //           return (
// //             <Card
// //               key={cert.id}
// //               className="flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-lg"
// //             >
// //               <div className="p-6 flex flex-col space-y-4 w-full md:w-3/5">
// //                 <CardHeader>
// //                   <CardTitle className="text-2xl font-bold">{cert.name}</CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p>
// //                     Certificate No:{" "}
// //                     <span className="font-semibold">{cert.certificateNumber}</span>
// //                   </p>
// //                   <p>Valid Until: {formatDate(cert.validity)}</p>
// //                   <p>Issued: {formatDate(cert.issued)}</p>
// //                   <p className={`font-semibold ${color}`}>Status: {status}</p>
// //                 </CardContent>

// //                 <div className="flex gap-3">
// //                   <button
// //                     onClick={() => router.push(`/admin/certificate/${cert.id}`)}
// //                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
// //                   >
// //                     More
// //                   </button>
// //                   <button
// //                     onClick={() => handleDelete(cert.id)}
// //                     disabled={deletingId === cert.id}
// //                     className={`px-4 py-2 rounded text-white ${
// //                       deletingId === cert.id
// //                         ? "bg-gray-500"
// //                         : "bg-red-600 hover:bg-red-700"
// //                     }`}
// //                   >
// //                     {deletingId === cert.id ? "Deleting..." : "Delete"}
// //                   </button>
// //                 </div>
// //               </div>

// //               <div className="w-full md:w-2/5 p-4">
// //                 {pdfUrl ? (
// //                   <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
// //                     <Viewer fileUrl={pdfUrl} />
// //                   </Worker>
// //                 ) : (
// //                   <p className="text-sm text-gray-500 italic">No PDF available</p>
// //                 )}
// //               </div>
// //             </Card>
// //           )
// //         })}
// //       </div>

// //       <button
// //         onClick={() => router.push("/admin/AddCertificate")}
// //         className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition"
// //       >
// //         Add Certificate
// //       </button>
// //     </div>
// //   )
// // }


// // "use client"

// // import { useEffect, useState } from "react"
// // import { useRouter } from "next/navigation"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Worker, Viewer } from "@react-pdf-viewer/core"
// // import "@react-pdf-viewer/core/lib/styles/index.css"

// // type Certificate = {
// //   id: string
// //   name: string
// //   issued: string
// //   certificateNumber: string
// //   validity: string
// //   pdf_url?: string | null
// //   link_file_url?: string | null
// //   file_data?: { type: "Buffer"; data: number[] } | null
// //   link_file_data?: { type: "Buffer"; data: number[]; name: string } | null
// // }

// // function formatDate(iso: string | number | Date) {
// //   return new Date(iso).toISOString().split("T")[0]
// // }

// // function getValidityStatus(validUntil: string) {
// //   const now = new Date()
// //   const expiry = new Date(validUntil)
// //   const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

// //   if (diffDays < 0) return { status: "Expired", color: "text-red-600", priority: 2 }
// //   if (diffDays <= 60) return { status: "Expiring Soon", color: "text-yellow-500", priority: 0 }
// //   return { status: "Valid", color: "text-green-600", priority: 1 }
// // }

// // export default function AdminDashboard() {
// //   const router = useRouter()
// //   const [certificates, setCertificates] = useState<Certificate[]>([])
// //   const [deletingId, setDeletingId] = useState<string | null>(null)

// //   useEffect(() => {
// //     const token = localStorage.getItem("token")
// //     if (!token) {
// //       router.push("/admin")
// //       return
// //     }

// //     fetch("/api/certificates", {
// //       headers: { Authorization: `Bearer ${token}` },
// //     })
// //       .then((res) => res.json())
// //       .then((data: Certificate[]) => {
// //         const sorted = data.sort((a, b) => {
// //           const statusA = getValidityStatus(a.validity).priority
// //           const statusB = getValidityStatus(b.validity).priority
// //           return statusA - statusB
// //         })
// //         setCertificates(sorted)
// //       })
// //       .catch((err) => console.error("Failed to fetch certificates:", err))
// //   }, [router])

// //   const handleLogout = () => {
// //     localStorage.removeItem("token")
// //     router.push("/admin")
// //   }

// //   const handleDelete = async (id: string) => {
// //     if (!confirm("Are you sure you want to delete this certificate?")) return
// //     setDeletingId(id)
// //     try {
// //       const res = await fetch(`/api/certificates/${id}`, {
// //         method: "DELETE",
// //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// //       })
// //       if (res.ok) {
// //         setCertificates((prev) => prev.filter((cert) => cert.id !== id))
// //       } else {
// //         alert("Failed to delete certificate")
// //       }
// //     } catch (err) {
// //       console.error("Delete error:", err)
// //     } finally {
// //       setDeletingId(null)
// //     }
// //   }

// //   const getPdfUrl = (cert: Certificate): string | null => {
// //     if (cert.pdf_url) return cert.pdf_url
// //     if (cert.link_file_url) return cert.link_file_url

// //     if (cert.file_data?.data) {
// //       const byteArray = new Uint8Array(cert.file_data.data)
// //       const blob = new Blob([byteArray], { type: "application/pdf" })
// //       return URL.createObjectURL(blob)
// //     }
// //     if (cert.link_file_data?.data) {
// //       const byteArray = new Uint8Array(cert.link_file_data.data)
// //       const blob = new Blob([byteArray], { type: "application/pdf" })
// //       return URL.createObjectURL(blob)
// //     }
// //     return null
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
// //       {/* Header with count */}
// //       <div className="flex justify-between items-center mb-6 px-4">
// //         <h1 className="text-3xl font-bold">
// //           Admin Certificate Dashboard
// //         </h1>
// //         <div className="flex items-center gap-6">
// //           <span className="text-lg font-semibold bg-blue-600 text-white px-4 py-2 rounded">
// //             Total Certificates: {certificates.length}
// //           </span>
// //           <button
// //             onClick={handleLogout}
// //             className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
// //           >
// //             Logout
// //           </button>
// //         </div>
// //       </div>

// //       {/* Certificate grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         {certificates.map((cert) => {
// //           const pdfUrl = getPdfUrl(cert)
// //           const { status, color } = getValidityStatus(cert.validity)

// //           return (
// //             <Card
// //               key={cert.id}
// //               className="flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-lg"
// //             >
// //               <div className="p-6 flex flex-col space-y-4 w-full md:w-3/5">
// //                 <CardHeader>
// //                   <CardTitle className="text-2xl font-bold">{cert.name}</CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p>
// //                     Certificate No:{" "}
// //                     <span className="font-semibold">{cert.certificateNumber}</span>
// //                   </p>
// //                   <p>Valid Until: {formatDate(cert.validity)}</p>
// //                   <p>Issued: {formatDate(cert.issued)}</p>
// //                   <p className={`font-semibold ${color}`}>Status: {status}</p>
// //                 </CardContent>

// //                 <div className="flex gap-3">
// //                   <button
// //                     onClick={() => router.push(`/admin/certificate/${cert.id}`)}
// //                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
// //                   >
// //                     More
// //                   </button>
// //                   <button
// //                     onClick={() => handleDelete(cert.id)}
// //                     disabled={deletingId === cert.id}
// //                     className={`px-4 py-2 rounded text-white ${
// //                       deletingId === cert.id
// //                         ? "bg-gray-500"
// //                         : "bg-red-600 hover:bg-red-700"
// //                     }`}
// //                   >
// //                     {deletingId === cert.id ? "Deleting..." : "Delete"}
// //                   </button>
// //                 </div>
// //               </div>

// //               <div className="w-full md:w-2/5 p-4">
// //                 {pdfUrl ? (
// //                   <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
// //                     <Viewer fileUrl={pdfUrl} />
// //                   </Worker>
// //                 ) : (
// //                   <p className="text-sm text-gray-500 italic">No PDF available</p>
// //                 )}
// //               </div>
// //             </Card>
// //           )
// //         })}
// //       </div>

// //       {/* Floating button */}
// //       <button
// //         onClick={() => router.push("/admin/AddCertificate")}
// //         className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition"
// //       >
// //         Add Certificate
// //       </button>
// //     </div>
// //   )
// // }

// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Worker, Viewer } from "@react-pdf-viewer/core"
// import "@react-pdf-viewer/core/lib/styles/index.css"

// type Certificate = {
//   id: string
//   name: string
//   issued: string
//   validity: string
//   certificate_no: string   // ✅ fixed (match API column name)
//   pdf_url?: string | null
//   link_file_url?: string | null
//   file_data?: { type: "Buffer"; data: number[] } | null
//   link_file_data?: { type: "Buffer"; data: number[]; name: string } | null
// }

// function formatDate(iso: string | number | Date) {
//   return new Date(iso).toISOString().split("T")[0]
// }

// function getValidityStatus(validUntil: string) {
//   const now = new Date()
//   const expiry = new Date(validUntil)
//   const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

//   if (diffDays < 0) return { status: "Expired", color: "text-red-600", priority: 2 }
//   if (diffDays <= 60) return { status: "Expiring Soon", color: "text-yellow-500", priority: 0 }
//   return { status: "Valid", color: "text-green-600", priority: 1 }
// }

// export default function AdminDashboard() {
//   const router = useRouter()
//   const [certificates, setCertificates] = useState<Certificate[]>([])
//   const [deletingId, setDeletingId] = useState<string | null>(null)

//   useEffect(() => {
//     const token = localStorage.getItem("token")
//     if (!token) {
//       router.push("/admin")
//       return
//     }

//     fetch("/api/certificates", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data: Certificate[]) => {
//         console.log("Fetched certificates:", data) // ✅ Debug response
//         const sorted = data.sort((a, b) => {
//           const statusA = getValidityStatus(a.validity).priority
//           const statusB = getValidityStatus(b.validity).priority
//           return statusA - statusB
//         })
//         setCertificates(sorted)
//       })
//       .catch((err) => console.error("Failed to fetch certificates:", err))
//   }, [router])

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     router.push("/admin")
//   }

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this certificate?")) return
//     setDeletingId(id)
//     try {
//       const res = await fetch(`/api/certificates/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       })
//       if (res.ok) {
//         setCertificates((prev) => prev.filter((cert) => cert.id !== id))
//       } else {
//         alert("Failed to delete certificate")
//       }
//     } catch (err) {
//       console.error("Delete error:", err)
//     } finally {
//       setDeletingId(null)
//     }
//   }

//   const getPdfUrl = (cert: Certificate): string | null => {
//     if (cert.pdf_url) return cert.pdf_url
//     if (cert.link_file_url) return cert.link_file_url

//     if (cert.file_data?.data) {
//       const byteArray = new Uint8Array(cert.file_data.data)
//       const blob = new Blob([byteArray], { type: "application/pdf" })
//       return URL.createObjectURL(blob)
//     }
//     if (cert.link_file_data?.data) {
//       const byteArray = new Uint8Array(cert.link_file_data.data)
//       const blob = new Blob([byteArray], { type: "application/pdf" })
//       return URL.createObjectURL(blob)
//     }
//     return null
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
//       <div className="flex justify-between items-center mb-4 px-4">
//         <h1 className="text-3xl font-bold">Admin Certificate Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
//         >
//           Logout
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {certificates.map((cert) => {
//           const pdfUrl = getPdfUrl(cert)
//           const { status, color } = getValidityStatus(cert.validity)

//           return (
//             <Card
//               key={cert.id}
//               className="flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-lg"
//             >
//               <div className="p-6 flex flex-col space-y-4 w-full md:w-3/5">
//                 <CardHeader>
//                   <CardTitle className="text-2xl font-bold">{cert.name}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p>
//                     Certificate No:{" "}
//                     <span className="font-semibold">{cert.certificate_no}</span>
//                   </p>
//                   <p>Valid Until: {formatDate(cert.validity)}</p>
//                   <p>Issued: {formatDate(cert.issued)}</p>
//                   <p className={`font-semibold ${color}`}>Status: {status}</p>
//                 </CardContent>

//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => router.push(`/admin/certificate/${cert.id}`)}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//                   >
//                     More
//                   </button>
//                   <button
//                     onClick={() => handleDelete(cert.id)}
//                     disabled={deletingId === cert.id}
//                     className={`px-4 py-2 rounded text-white ${
//                       deletingId === cert.id
//                         ? "bg-gray-500"
//                         : "bg-red-600 hover:bg-red-700"
//                     }`}
//                   >
//                     {deletingId === cert.id ? "Deleting..." : "Delete"}
//                   </button>
//                 </div>
//               </div>

//               <div className="w-full md:w-2/5 p-4">
//                 {pdfUrl ? (
//                   <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
//                     <Viewer fileUrl={pdfUrl} />
//                   </Worker>
//                 ) : (
//                   <p className="text-sm text-gray-500 italic">No PDF available</p>
//                 )}
//               </div>
//             </Card>
//           )
//         })}
//       </div>

//       <button
//         onClick={() => router.push("/admin/AddCertificate")}
//         className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition"
//       >
//         Add Certificate
//       </button>
//     </div>
//   )
// }
