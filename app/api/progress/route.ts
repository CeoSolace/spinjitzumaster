import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const GOAL = 100;

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const count = await db.collection("joins").countDocuments();

    return NextResponse.json({
      count,
      goal: GOAL,
      percent: Math.min(100, Math.round((count / GOAL) * 100)),
      remaining: Math.max(0, GOAL - count),
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json({
      count: 0,
      goal: GOAL,
      percent: 0,
      remaining: GOAL,
    });
  }
}
