import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ success:false, message:'email/password required' }, { status:400 });

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ success:false, message:'Invalid credentials' }, { status:401 });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return NextResponse.json({ success:false, message:'Invalid credentials' }, { status:401 });

  const token = jwt.sign({ id: user._id, email: user.email, role: user.role, tenantId: user.tenantId }, JWT_SECRET, { expiresIn: '7d' });

  // set cookie (optional)
  const res = NextResponse.json({ success:true, token, user: { email: user.email, role: user.role, id: user._id } });
  // you can set cookie like below (httponly)
  res.cookies.set('token', token, { httpOnly: true, path: '/', maxAge: 60*60*24*7 });
  return res;
}
