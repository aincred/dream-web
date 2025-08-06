import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { certificates } from "@/drizzle/schema";

export async function GET() {
  const data = await db.select().from(certificates);
  return NextResponse.json(data);
}
