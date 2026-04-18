import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const count = await db.collection("signups").countDocuments();

    return NextResponse.json({
      success: true,
      count,
      goal: 100,
      remaining: Math.max(0, 100 - count),
      percent: Math.min(100, Math.round((count / 100) * 100)),
    });
  } catch (error) {
    console.error("waitlist count error:", error);
    return NextResponse.json(
      {
        success: false,
        count: 0,
        goal: 100,
        remaining: 100,
        percent: 0,
      },
      { status: 500 }
    );
  }
}
