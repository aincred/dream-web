import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

const EXPIRES = parseInt(process.env.SIGNED_URL_EXPIRES || "3600", 10)

async function signPath(path?: string | null) {
  if (!path) return null
  const { data, error } = await supabaseAdmin
    .storage
    .from("certificates")
    .createSignedUrl(path, EXPIRES)

  if (error) throw error
  return data.signedUrl
}

async function readTextFile(path?: string | null): Promise<string | null> {
  if (!path) return null

  // Get public URL temporarily
  const { data } = supabaseAdmin.storage.from("certificates").getPublicUrl(path)
  if (!data?.publicUrl) return null

  try {
    const res = await fetch(data.publicUrl)
    if (!res.ok) return null
    return await res.text()
  } catch {
    return null
  }
}

export async function GET(
  _: Request,
  { params }: { params: { certificateNumber: string } }
) {
  try {
    const { data, error } = await supabaseAdmin
      .from("certificates")
      .select("*")
      .eq("certificateNumber", params.certificateNumber)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 })
    }

    const pdf_url = await signPath(data.pdf_path)
    const link_file_url = await signPath(data.link_file_path)
    const link_file_text = await readTextFile(data.link_file_path)

    return NextResponse.json({
      certificateNumber: data.certificateNumber,
      issued: data.issued,
      validity: data.validity,
      pdf_url,
      link_file_url,
      link_file_text,
    })
  } catch (e: any) {
    console.error("CERT_VERIFY_ERROR", e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
