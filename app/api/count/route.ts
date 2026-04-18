import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import EarlyUser from "@/models/EarlyUser";

export async function GET() {
  try {
    await connectDB();
    const count = await EarlyUser.countDocuments();
    return NextResponse.json({ count }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}