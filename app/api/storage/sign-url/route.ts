import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

const EXPIRES = parseInt(process.env.SIGNED_URL_EXPIRES || "3600", 10)

export async function POST(req: Request) {
  try {
    const { path } = await req.json()
    if (!path) return NextResponse.json({ error: "Missing path" }, { status: 400 })

    const { data, error } = await supabaseAdmin.storage
      .from("certificates")
      .createSignedUrl(path, EXPIRES)
    if (error) throw error

    return NextResponse.json({ url: data.signedUrl })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
