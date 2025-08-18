import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export const runtime = "nodejs" // ensure Node (not edge) for file streams

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const folder = (formData.get("folder") as string) || "uploads"

    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 })

    const ext = file.name.split(".").pop() || "bin"
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const filePath = `${folder}/${fileName}`

    const arrayBuffer = await file.arrayBuffer()
    const { error: uploadErr } = await supabaseAdmin.storage
      .from("certificates")
      .upload(filePath, Buffer.from(arrayBuffer), {
        upsert: false,
        contentType: file.type || "application/octet-stream",
      })

    if (uploadErr) throw uploadErr

    return NextResponse.json({ path: filePath })
  } catch (e: any) {
    console.error("UPLOAD_ERROR", e)
    return NextResponse.json({ error: e.message || "Upload failed" }, { status: 500 })
  }
}
