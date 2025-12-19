import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "/models/user";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password, role, tenantId } = await req.json();

    if (!email || !password || !tenantId) {
      return NextResponse.json(
        { success: false, message: "email, password, tenantId required" },
        { status: 400 }
      );
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashed,
      role: role || "admin",
      tenantId,
    });

    return NextResponse.json(
      { success: true, message: "User registered", user },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server error", err },
      { status: 500 }
    );
  }
}
