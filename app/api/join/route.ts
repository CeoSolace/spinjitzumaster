import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import EarlyUser from "@/models/EarlyUser";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email: string | undefined = body?.email;
    const username: string | undefined = body?.username;
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }
    // Basic email pattern validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }
    await connectDB();
    const existing = await EarlyUser.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: "This email is already registered" },
        { status: 400 }
      );
    }
    await EarlyUser.create({ email: email.toLowerCase(), username });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}