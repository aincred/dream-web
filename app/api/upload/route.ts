// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { certificates } from "@/drizzle/schema";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const form = await req.formData();

  const name = form.get("name") as string;
  const issued = form.get("issued") as string;
  const validity = form.get("validity") as string;
  const file = form.get("file") as File;

  if (!name || !issued || !validity || !file) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // 🧠 Signature setup
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "certificates";
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;

  const stringToSign = `folder=${folder}&timestamp=${timestamp}`;
  const signature = crypto
    .createHash("sha1")
    .update(stringToSign + apiSecret)
    .digest("hex");

  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder,
          timestamp,
          signature,
          api_key: process.env.CLOUDINARY_API_KEY!,
        },
        (err, res) => {
          if (err) return reject(err);
          resolve(res);
        }
      ).end(buffer);
    });

    const cloudinaryResult = result as { secure_url: string };

   
    const inserted = await db.insert(certificates).values({
      name,
      issued: new Date(issued),
      validity: new Date(validity),
      cloudinaryUrl: cloudinaryResult.secure_url,
    }).returning();

    return NextResponse.json({ success: true, cert: inserted[0] });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed", details: error }, { status: 500 });
  }
}


















// import { NextRequest, NextResponse } from "next/server";
// import cloudinary from "@/lib/cloudinary";
// import { db } from "@/lib/db";
// import { certificates } from "@/drizzle/schema";

// export async function POST(req: NextRequest) {
//   const form = await req.formData();

//   const name = form.get("name") as string;
//   const issued = form.get("issued") as string;
//   const validity = form.get("validity") as string;
//   const file = form.get("file") as File;

//   if (!name || !issued || !validity || !file) {
//     return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//   }

//   const buffer = Buffer.from(await file.arrayBuffer());

//   const result = await new Promise((resolve, reject) => {
//     cloudinary.uploader.upload_stream(
//       { resource_type: "auto", folder: "certificates" },
//       (err, res) => {
//         if (err) reject(err);
//         else resolve(res);
//       }
//     ).end(buffer);
//   });

//   const cloudinaryResult = result as { secure_url: string };

//   const inserted = await db.insert(certificates).values({
//     name,
//     issued: new Date(issued),
//     validity: new Date(validity),
//     cloudinaryUrl: cloudinaryResult.secure_url,
//   }).returning();

//   return NextResponse.json({ success: true, cert: inserted[0] });
// }

