import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const count = await db.collection("joins").countDocuments();

    return NextResponse.json({ count });
  } catch (error) {
    console.error("Count route error:", error);
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}
