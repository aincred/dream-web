// import { NextResponse } from "next/server"
// import { supabaseAdmin } from "@/lib/supabase"

// const EXPIRES = parseInt(process.env.SIGNED_URL_EXPIRES || "3600", 10)

// async function signPath(path?: string | null) {
//   if (!path) return null
//   const { data, error } = await supabaseAdmin.storage
//     .from("certificates")
//     .createSignedUrl(path, EXPIRES)
//   if (error) throw error
//   return data.signedUrl
// }

// export async function GET() {
//   try {
//     const { data, error } = await supabaseAdmin
//       .from("certificates")
//       .select("*")
//       .order("validity", { ascending: true })
//     if (error) throw error

//     // decorate with signed URLs for quick display
//     const rows = await Promise.all(
//       data.map(async (c) => ({
//         ...c,
//         pdf_url: await signPath(c.pdf_path),
//         link_file_url: await signPath(c.link_file_path),
//       }))
//     )
//     return NextResponse.json(rows)
//   } catch (e: any) {
//     console.error("CERT_LIST_ERROR", e)
//     return NextResponse.json({ error: e.message }, { status: 500 })
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json()
//     const { error } = await supabaseAdmin.from("certificates").insert([
//       {
//         name: body.name,
//         certificate_number: body.certificateNumber,
//         issued: body.issued,
//         validity: body.validity,
//         pdf_path: body.pdfPath,
//         link_file_path: body.linkFilePath || null,
//       },
//     ])
//     if (error) throw error
//     return NextResponse.json({ ok: true })
//   } catch (e: any) {
//     console.error("CERT_CREATE_ERROR", e)
//     return NextResponse.json({ error: e.message }, { status: 500 })
//   }
// }

import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

const EXPIRES = parseInt(process.env.SIGNED_URL_EXPIRES || "3600", 10)

async function signPath(path?: string | null) {
  if (!path) return null
  const { data, error } = await supabaseAdmin.storage
    .from("certificates")
    .createSignedUrl(path, EXPIRES)
  if (error) throw error
  return data.signedUrl
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("certificates")
      .select("*")
      .order("validity", { ascending: true })

    if (error) throw error

    // ✅ Normalize field names
    const rows = await Promise.all(
      data.map(async (c) => ({
        ...c,
        certificate_no: c.certificate_no || c.certificate_number || "", // normalize
        pdf_url: await signPath(c.pdf_path),
        link_file_url: await signPath(c.link_file_path),
      }))
    )

    return NextResponse.json(rows)
  } catch (e: any) {
    console.error("CERT_LIST_ERROR", e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { error } = await supabaseAdmin.from("certificates").insert([
      {
        name: body.name,
        certificate_number: body.certificateNumber, // keep DB consistent
        issued: body.issued,
        validity: body.validity,
        pdf_path: body.pdfPath,
        link_file_path: body.linkFilePath || null,
      },
    ])
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error("CERT_CREATE_ERROR", e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
