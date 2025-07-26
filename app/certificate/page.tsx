"use client"

import { useState } from "react"
import axios from "axios"
import { Worker, Viewer } from "@react-pdf-viewer/core"
import "@react-pdf-viewer/core/lib/styles/index.css"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"



function formatDate(isoDate: string): string {
  const date = new Date(isoDate)
  return date.toISOString().split('T')[0]
}

export default function CertificateVerification() {
  const [certificateNumber, setCertificateNumber] = useState("")
  const [cerificateData, setCertificateDAta] = useState({
    validity : '',
    issued : ""
  })
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null)

  const handleVerify = async () => {
    if (!certificateNumber) {
      alert("Please enter a certificate number")
      return
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/pdf/search-pdf?name=${certificateNumber}`)
      console.log(response)
      const pdfData = response.data[0]
      if (pdfData?.file_data) {
        setCertificateDAta({
          validity : formatDate(pdfData.validity),
          issued : formatDate(pdfData.issued)
        })
        const byteArray = new Uint8Array(pdfData.file_data.data)
        const blob = new Blob([byteArray], { type: "application/pdf" })
        const url = URL.createObjectURL(blob)
        setSelectedPdf(url)
        setIsValid(true) // Set valid if PDF is found
      } else {
        setIsValid(false) // Set invalid if no PDF found
        alert("PDF not found")
      }
    } catch (error) {
      console.error("Error fetching PDF:", error)
      setIsValid(false) // Set invalid on error
      // alert("Error fetching PDF")
    }
  }

  const pdfJsVersion = "3.11.174"

  return (
    <div className="container mt-6 mx-auto px-4 py-16 justify-center">
      <div className="mb-8 mt-6 ">
        <h1 className="text-2xl font-bold">Certificate Verification</h1>
      </div>
      <div className="flex items-center space-x-4 mt-4">
        <Input
          type="text"
          placeholder="Enter Certificate Number"
          value={certificateNumber}
          onChange={(e) => setCertificateNumber(e.target.value)}
          className="w-80"
        />
        <Button onClick={handleVerify}>Verify</Button>
      </div>

      {isValid !== null && (
        <div className={cn("mt-6 p-4 rounded-lg", isValid ? "bg-green-100" : "bg-red-100")}>
          {isValid ? (
            <div className="flex justify-around" >
              <div className="m-auto" >
                <p className="text-green-800">Certificate is valid and PDF is fetched.</p>
                <p className="text-green-900 font-bold">Certificate Number : {certificateNumber}</p>
                <p className="text-green-900 font-bold">Issued : {cerificateData.issued} <br/> Validity : {cerificateData.validity} </p>
              </div>
              {selectedPdf && (
                <div style={{ width: "38%", height: "800px", marginTop: "20px" }}>
                  <div style={{ width: "100%", height: "700px", marginTop: "20px" }}>
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfJsVersion}/build/pdf.worker.min.js`}>
                      <Viewer fileUrl={selectedPdf} />
                    </Worker>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-red-800">Certificate is not valid or PDF not found.</p>
          )}
        </div>
      )}

      
    </div>
  )
}
