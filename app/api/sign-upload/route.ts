// // /app/api/sign-upload/route.js
// import crypto from "crypto";

// export async function POST(req) {
//   const body = await req.json();
//   const timestamp = body.timestamp;
//   const folder = body.folder || "certificates";

//   const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

//   // Step 1: Construct string to sign
//   const stringToSign = `folder=${folder}&timestamp=${timestamp}`;

//   // Step 2: Generate HMAC SHA1 signature
//   const signature = crypto
//     .createHmac("sha1", cloudinaryApiSecret)
//     .update(stringToSign)
//     .digest("hex");

//   return Response.json({ signature });
// }

import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const { timestamp, folder } = await req.json();
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!timestamp || !folder || !apiSecret) {
    return NextResponse.json({ error: "Missing parameters or secret" }, { status: 400 });
  }

  const stringToSign = `folder=${folder}&timestamp=${timestamp}`;
  const signature = crypto
    .createHmac("sha1", apiSecret)
    .update(stringToSign)
    .digest("hex");

  return NextResponse.json({ signature });
}



// import { NextResponse } from "next/server";
// import crypto from "crypto";

// export async function POST(req: Request) {
//   const { timestamp, folder } = await req.json();
//   const apiSecret = process.env.CLOUDINARY_API_SECRET;

//   if (!timestamp || !folder || !apiSecret) {
//     return NextResponse.json({ error: "Missing parameters or secret" }, { status: 400 });
//   }

//   const stringToSign = `folder=${folder}&timestamp=${timestamp}`;
//   const signature = crypto
//     .createHmac("sha1", apiSecret)
//     .update(stringToSign)
//     .digest("hex");

//   return NextResponse.json({ signature });
// }
