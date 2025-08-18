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

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabaseAdmin
      .from("certificates")
      .select("*")
      .eq("id", params.id)
      .single()
    if (error) throw error

    const pdf_url = await signPath(data.pdf_path)
    const link_file_url = await signPath(data.link_file_path)

    return NextResponse.json({ ...data, pdf_url, link_file_url })
  } catch (e: any) {
    console.error("CERT_GET_ERROR", e)
    return NextResponse.json({ error: e.message }, { status: 404 })
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Optional: also delete storage files
    const { data: cert, error: getErr } = await supabaseAdmin
      .from("certificates")
      .select("*")
      .eq("id", params.id)
      .single()
    if (getErr) throw getErr

    // delete row first
    const { error: delErr } = await supabaseAdmin
      .from("certificates")
      .delete()
      .eq("id", params.id)
    if (delErr) throw delErr

    // delete files (if exist)
    const toRemove = [cert.pdf_path, cert.link_file_path].filter(Boolean) as string[]
    if (toRemove.length) {
      await supabaseAdmin.storage.from("certificates").remove(toRemove)
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error("CERT_DELETE_ERROR", e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
