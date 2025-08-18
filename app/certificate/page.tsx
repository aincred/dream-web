// "use client"

// import { useState } from "react"
// import { Worker, Viewer } from "@react-pdf-viewer/core"
// import "@react-pdf-viewer/core/lib/styles/index.css"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { cn } from "@/lib/utils"

// function formatDate(isoDate: string): string {
//   const date = new Date(isoDate)
//   return date.toISOString().split("T")[0]
// }

// export default function CertificateVerification() {
//   const [certificateNumber, setCertificateNumber] = useState("")
//   const [certificateData, setCertificateData] = useState({
//     certificateNumber: "",
//     issued: "",
//     validity: "",
//     link_file_data: "", // added field for extra file data (links)
//   })
//   const [isValid, setIsValid] = useState<boolean | null>(null)
//   const [selectedPdf, setSelectedPdf] = useState<string | null>(null)
//   const [linksContent, setLinksContent] = useState<string | null>(null)
//   const [showLinks, setShowLinks] = useState(false)

//   const handleVerify = () => {
//     if (!certificateNumber) {
//       alert("Please enter a certificate number")
//       return
//     }

//     const stored = localStorage.getItem("certificates")
//     const certs = stored ? JSON.parse(stored) : []

//     const match = certs.find((cert: any) => cert.certificateNumber === certificateNumber)

//     if (match && match.file_data) {
//       setCertificateData({
//         certificateNumber: match.certificateNumber,
//         issued: formatDate(match.issued),
//         validity: formatDate(match.validity),
//         link_file_data: match.link_file_data || "",
//       })

//       const byteArray = new Uint8Array(match.file_data.data)
//       const blob = new Blob([byteArray], { type: "application/pdf" })
//       const url = URL.createObjectURL(blob)
//       setSelectedPdf(url)
//       setIsValid(true)

//       if (match.link_file_data) {
//         const textDecoder = new TextDecoder()
//         const linkText = textDecoder.decode(new Uint8Array(match.link_file_data.data))
//         setLinksContent(linkText)
//       }
//     } else {
//       setIsValid(false)
//       setSelectedPdf(null)
//       setLinksContent(null)
//     }
//   }

//   const pdfJsVersion = "3.11.174"

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h1 className="text-3xl font-bold mb-6 text-center">Certificate Verification</h1>

//       {/* Input + Verify Button */}
//       <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-4 mb-10">
//         <Input
//           type="text"
//           placeholder="Enter Certificate Number"
//           value={certificateNumber}
//           onChange={(e) => setCertificateNumber(e.target.value)}
//           className="w-full sm:w-80"
//         />
//         <Button className="bg-red-500" onClick={handleVerify}>
//           Verify
//         </Button>
//       </div>

//       {/* Verification Result */}
//       {isValid !== null && (
//         <div
//           className={cn(
//             "grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 rounded-lg shadow-md",
//             isValid ? "bg-green-100" : "bg-red-100"
//           )}
//         >
//           {isValid ? (
//             <>
//               {/* Certificate Info */}
//               <div className="space-y-4">
//                 <p className="text-green-800 text-lg font-medium">✅ Certificate is valid and PDF is fetched.</p>
//                 <div className="text-green-900">
//                   <p className="font-bold">
//                     Certificate Number: <span className="font-normal">{certificateData.certificateNumber}</span>
//                   </p>
//                   <p className="font-bold">
//                     Issued: <span className="font-normal">{certificateData.issued}</span>
//                   </p>
//                   <p className="font-bold">
//                     Validity: <span className="font-normal">{certificateData.validity}</span>
//                   </p>
//                 </div>

//                 {/* More Details (Links Panel) */}
//                 {certificateData.link_file_data && (
//                   <div className="mt-6">
//                     <Button
//                       className="bg-gradient-to-r bg-green-500 hover:opacity-90 text-black rounded-xl shadow-md px-5 py-2 transition-all duration-300"
//                       onClick={() => setShowLinks(!showLinks)}
//                     >
//                       {showLinks ? "Hide More Details" : "Show More Details"}
//                     </Button>

//                     {showLinks && linksContent && (
//                       <div className="mt-5 relative">
//                         <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 max-h-72 overflow-y-auto transition-all duration-500 ease-in-out">
//                           <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//                             <span className="w-2 h-2 rounded-full bg-purple-500"></span>
//                             Attached Links File
//                           </h3>
//                           <div className="mt-3 space-y-2 text-sm text-gray-700">
//                             {linksContent.split("\n").map((line, idx) => (
//                               <div
//                                 key={idx}
//                                 className="p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
//                               >
//                                 {line.startsWith("http") ? (
//                                   <a
//                                     href={line}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-blue-600 underline hover:text-blue-800"
//                                   >
//                                     {line}
//                                   </a>
//                                 ) : (
//                                   <span>{line}</span>
//                                 )}
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* PDF Viewer */}
//               {selectedPdf && (
//                 <div className="w-full h-[700px] rounded-2xl border border-gray-300 shadow-lg p-4 bg-white overflow-auto">
//                   <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfJsVersion}/build/pdf.worker.min.js`}>
//                     <Viewer fileUrl={selectedPdf} />
//                   </Worker>
//                 </div>
//               )}
//             </>
//           ) : (
//             <p className="text-red-800 text-center col-span-2 text-lg font-medium">
//               ❌ Certificate is not valid or PDF not found.
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// "use client"

// import { useState } from "react"
// import { Worker, Viewer } from "@react-pdf-viewer/core"
// import "@react-pdf-viewer/core/lib/styles/index.css"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { cn } from "@/lib/utils"

// function formatDate(isoDate: string): string {
//   const date = new Date(isoDate)
//   return date.toISOString().split("T")[0]
// }

// export default function CertificateVerification() {
//   const [certificateNumber, setCertificateNumber] = useState("")
//   const [certificateData, setCertificateData] = useState<any>(null)
//   const [isValid, setIsValid] = useState<boolean | null>(null)
//   const [selectedPdf, setSelectedPdf] = useState<string | null>(null)
//   const [linksContent, setLinksContent] = useState<string | null>(null)
//   const [showLinks, setShowLinks] = useState(false)

//   const handleVerify = async () => {
//     if (!certificateNumber) {
//       alert("Please enter a certificate number")
//       return
//     }

//     try {
//       const res = await fetch("/api/certificates")
//       const data = await res.json()

//       // normalize DB field name
//       const match = data.find(
//         (cert: any) =>
//           cert.certificate_no === certificateNumber ||
//           cert.certificate_number === certificateNumber
//       )

//       if (match) {
//         setCertificateData({
//           certificateNumber: match.certificate_no || match.certificate_number,
//           issued: formatDate(match.issued),
//           validity: formatDate(match.validity),
//         })

//         if (match.pdf_url) {
//           setSelectedPdf(match.pdf_url)
//         }

//         if (match.link_file_url) {
//           const linkRes = await fetch(match.link_file_url)
//           const linkText = await linkRes.text()
//           setLinksContent(linkText)
//         }

//         setIsValid(true)
//       } else {
//         setIsValid(false)
//         setCertificateData(null)
//         setSelectedPdf(null)
//         setLinksContent(null)
//       }
//     } catch (err) {
//       console.error("VERIFY_ERROR", err)
//       setIsValid(false)
//     }
//   }

//   const pdfJsVersion = "3.11.174"

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h1 className="text-3xl font-bold mb-6 text-center">Certificate Verification</h1>

//       {/* Input + Verify Button */}
//       <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-4 mb-10">
//         <Input
//           type="text"
//           placeholder="Enter Certificate Number"
//           value={certificateNumber}
//           onChange={(e) => setCertificateNumber(e.target.value)}
//           className="w-full sm:w-80"
//         />
//         <Button className="bg-red-500" onClick={handleVerify}>
//           Verify
//         </Button>
//       </div>

//       {/* Verification Result */}
//       {isValid !== null && (
//         <div
//           className={cn(
//             "grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 rounded-lg shadow-md",
//             isValid ? "bg-green-100" : "bg-red-100"
//           )}
//         >
//           {isValid && certificateData ? (
//             <>
//               {/* Certificate Info */}
//               <div className="space-y-4">
//                 <p className="text-green-800 text-lg font-medium">✅ Certificate is valid.</p>
//                 <div className="text-green-900">
//                   <p className="font-bold">
//                     Certificate Number:{" "}
//                     <span className="font-normal">{certificateData.certificateNumber}</span>
//                   </p>
//                   <p className="font-bold">
//                     Issued: <span className="font-normal">{certificateData.issued}</span>
//                   </p>
//                   <p className="font-bold">
//                     Validity: <span className="font-normal">{certificateData.validity}</span>
//                   </p>
//                 </div>

//                 {/* More Details (Links Panel) */}
//                 {linksContent && (
//                   <div className="mt-6">
//                     <Button
//                       className="bg-gradient-to-r bg-green-500 hover:opacity-90 text-black rounded-xl shadow-md px-5 py-2 transition-all duration-300"
//                       onClick={() => setShowLinks(!showLinks)}
//                     >
//                       {showLinks ? "Hide More Details" : "Show More Details"}
//                     </Button>

//                     {showLinks && (
//                       <div className="mt-5 relative">
//                         <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 max-h-72 overflow-y-auto transition-all duration-500 ease-in-out">
//                           <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//                             <span className="w-2 h-2 rounded-full bg-purple-500"></span>
//                             Attached Links File
//                           </h3>
//                           <div className="mt-3 space-y-2 text-sm text-gray-700">
//                             {linksContent.split("\n").map((line, idx) => (
//                               <div key={idx} className="p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer">
//                                 {line.startsWith("http") ? (
//                                   <a
//                                     href={line}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-blue-600 underline hover:text-blue-800"
//                                   >
//                                     {line}
//                                   </a>
//                                 ) : (
//                                   <span>{line}</span>
//                                 )}
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* PDF Viewer */}
//               {selectedPdf && (
//                 <div className="w-full h-[700px] rounded-2xl border border-gray-300 shadow-lg p-4 bg-white overflow-auto">
//                   <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfJsVersion}/build/pdf.worker.min.js`}>
//                     <Viewer fileUrl={selectedPdf} />
//                   </Worker>
//                 </div>
//               )}
//             </>
//           ) : (
//             <p className="text-red-800 text-center col-span-2 text-lg font-medium">
//               ❌ Certificate is not valid or PDF not found.
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { Worker, Viewer } from "@react-pdf-viewer/core"
import "@react-pdf-viewer/core/lib/styles/index.css"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

function formatDate(isoDate: string): string {
  const date = new Date(isoDate)
  return date.toISOString().split("T")[0]
}

export default function CertificateVerification() {
  const [certificateNumber, setCertificateNumber] = useState("")
  const [certificateData, setCertificateData] = useState<any>(null)
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null)
  const [linksContent, setLinksContent] = useState<string | null>(null)
  const [showLinks, setShowLinks] = useState(false)
  const [loading, setLoading] = useState(false) // <-- NEW

  const handleVerify = async () => {
    if (!certificateNumber) {
      alert("Please enter a certificate number")
      return
    }

    setLoading(true) // start loading
    try {
      const res = await fetch("/api/certificates")
      const data = await res.json()

      const match = data.find(
        (cert: any) =>
          cert.certificate_no === certificateNumber ||
          cert.certificate_number === certificateNumber
      )

      if (match) {
        setCertificateData({
          certificateNumber: match.certificate_no || match.certificate_number,
          issued: formatDate(match.issued),
          validity: formatDate(match.validity),
        })

        if (match.pdf_url) {
          setSelectedPdf(match.pdf_url)
        }

        if (match.link_file_url) {
          const linkRes = await fetch(match.link_file_url)
          const linkText = await linkRes.text()
          setLinksContent(linkText)
        }

        setIsValid(true)
      } else {
        setIsValid(false)
        setCertificateData(null)
        setSelectedPdf(null)
        setLinksContent(null)
      }
    } catch (err) {
      console.error("VERIFY_ERROR", err)
      setIsValid(false)
    } finally {
      setLoading(false) // stop loading
    }
  }

  const pdfJsVersion = "3.11.174"

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Certificate Verification</h1>

      {/* Input + Verify Button */}
      <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-4 mb-10">
        <Input
          type="text"
          placeholder="Enter Certificate Number"
          value={certificateNumber}
          onChange={(e) => setCertificateNumber(e.target.value)}
          className="w-full sm:w-80"
        />
        <Button className="bg-red-500 flex items-center gap-2" onClick={handleVerify} disabled={loading}>
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </div>

      {/* Verification Result */}
      {isValid !== null && (
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 rounded-lg shadow-md",
            isValid ? "bg-green-100" : "bg-red-100"
          )}
        >
          {isValid && certificateData ? (
            <>
              {/* Certificate Info */}
              <div className="space-y-4">
                <p className="text-green-800 text-lg font-medium">✅ Certificate is valid.</p>
                <div className="text-green-900">
                  <p className="font-bold">
                    Certificate Number:{" "}
                    <span className="font-normal">{certificateData.certificateNumber}</span>
                  </p>
                  <p className="font-bold">
                    Issued: <span className="font-normal">{certificateData.issued}</span>
                  </p>
                  <p className="font-bold">
                    Validity: <span className="font-normal">{certificateData.validity}</span>
                  </p>
                </div>

                {/* More Details (Links Panel) */}
                {linksContent && (
                  <div className="mt-6">
                    <Button
                      className="bg-gradient-to-r bg-green-500 hover:opacity-90 text-black rounded-xl shadow-md px-5 py-2 transition-all duration-300"
                      onClick={() => setShowLinks(!showLinks)}
                    >
                      {showLinks ? "Hide More Details" : "Show More Details"}
                    </Button>

                    {showLinks && (
                      <div className="mt-5 relative">
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 max-h-72 overflow-y-auto transition-all duration-500 ease-in-out">
                          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            Attached Links 
                          </h3>
                          <div className="mt-3 space-y-2 text-sm text-gray-700">
                            {linksContent.split("\n").map((line, idx) => (
                              <div key={idx} className="p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                                {line.startsWith("http") ? (
                                  <a
                                    href={line}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline hover:text-blue-800"
                                  >
                                    {line}
                                  </a>
                                ) : (
                                  <span>{line}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* PDF Viewer */}
              {selectedPdf && (
                <div className="w-full h-[700px] rounded-2xl border border-gray-300 shadow-lg p-4 bg-white overflow-auto">
                  <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfJsVersion}/build/pdf.worker.min.js`}>
                    <Viewer fileUrl={selectedPdf} />
                  </Worker>
                </div>
              )}
            </>
          ) : (
            <p className="text-red-800 text-center col-span-2 text-lg font-medium">
              ❌ Certificate is not valid or PDF not found.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
