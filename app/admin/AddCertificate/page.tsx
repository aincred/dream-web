"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AddCertificate() {
  const router = useRouter();
 const [name, setName] = useState("");
const [issued, setIssued] = useState("");
const [validity, setValidity] = useState("");
const [file, setFile] = useState<File | null>(null);
const [error, setError] = useState("");
const [loading, setLoading] = useState(false); // 👈 This was missing

//  const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   if (!name || !issued || !validity || !file) {
//     setError("Please fill out all fields and upload a file.");
//     return;
//   }

//   if (file.type !== "application/pdf") {
//     setError("Only PDF files are allowed.");
//     return;
//   }

//   if (file.size > 5 * 1024 * 1024) {
//     setError("File is too large. Max 5MB.");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("name", name);
//   formData.append("issued", issued);
//   formData.append("validity", validity);
//   formData.append("file", file);

//   try {
//     setLoading(true);
//     const res = await fetch("/api/upload", {
//       method: "POST",
//       body: formData,
//     });
//     setLoading(false);

//     if (!res.ok) {
//       const errData = await res.json();
//       throw new Error(errData?.error || "Upload failed");
//     }

//     router.push("/admin/dashboard");
//   } catch (err: any) {
//     setError(err.message || "Something went wrong.");
//     setLoading(false);
//   }
// };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!name || !issued || !validity || !file) {
    setError("Please fill out all fields and upload a file.");
    return;
  }

  if (file.type !== "application/pdf") {
    setError("Only PDF files are allowed.");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    setError("File is too large. Max 5MB.");
    return;
  }

  try {
    setLoading(true);
    const timestamp = Math.floor(Date.now() / 1000);
    const folder = "certificates";

    // STEP 1: Get signed signature from server
    const sigRes = await fetch("/api/sign-upload", {
      method: "POST",
      body: JSON.stringify({ timestamp, folder }),
      headers: { "Content-Type": "application/json" },
    });

    const { signature } = await sigRes.json();

    // STEP 2: Upload to Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);
    formData.append("folder", folder);

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const uploadData = await uploadRes.json();

    if (!uploadRes.ok) {
      throw new Error(uploadData?.error?.message || "Cloudinary upload failed");
    }

    const cloudinaryUrl = uploadData.secure_url;

    // STEP 3: Save to Supabase or your own DB (optional)
    const saveRes = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({
        name,
        issued,
        validity,
        fileUrl: cloudinaryUrl,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!saveRes.ok) {
      const errData = await saveRes.json();
      throw new Error(errData?.error || "Database save failed");
    }

    router.push("/admin/dashboard");
  } catch (err: any) {
    setError(err.message || "Something went wrong.");
    setLoading(false);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6 py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg">
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
  );
}
