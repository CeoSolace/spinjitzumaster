import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const username =
      typeof body.username === "string" ? body.username.trim() : "";

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("joins");

    const existing = await collection.findOne({ email });

    if (existing) {
      return NextResponse.json(
        { success: true, message: "You are already on the waitlist." },
        { status: 200 }
      );
    }

    await collection.insertOne({
      email,
      username: username || null,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, message: "You have entered the dojo. Welcome!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Join route error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
