"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

type Certificate = {
  id: number;
  name: string;
  issued: string;
  validity: string;
  cloudinary_url: string;
};

function formatDate(date: string) {
  return new Date(date).toISOString().split("T")[0];
}

export default function AdminDashboard() {
  const router = useRouter();
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin");
    } else {
      fetch("/api/certificates")
        .then((res) => res.json())
        .then((data) => setCertificates(data))
        .catch((err) => console.error("Failed to fetch:", err));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-4 px-4">
        <h1 className="text-3xl font-bold text-center w-full sm:w-auto mb-4 sm:mb-0">
          Admin Certificate Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
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
                <Viewer fileUrl={cert.cloudinary_url} />
              </Worker>
            </div>
          </Card>
        ))}
      </div>

      <button
        onClick={() => router.push("/admin/AddCertificate")}
        className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition"
      >
        Add Certificate
      </button>
    </div>
  );
}
