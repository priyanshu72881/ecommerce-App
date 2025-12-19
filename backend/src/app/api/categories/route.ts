import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Category } from "@/models/category";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const tenantId = searchParams.get("tenantId");
  const query = tenantId ? { tenantId } : {};
  const cats = await Category.find(query).sort({ createdAt: -1 });
  return NextResponse.json({ success:true, categories: cats });
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const cat = new Category(body);
  await cat.save();
  return NextResponse.json({ success:true, category: cat });
}

export async function PATCH(req: Request) {
  await connectDB();
  const body = await req.json();
  const cat = await Category.findByIdAndUpdate(body.id, { name: body.name, slug: body.slug }, { new: true });
  return NextResponse.json({ success:true, category: cat });
}

export async function DELETE(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ success:false, message:'id missing' }, { status:400 });
  await Category.findByIdAndDelete(id);
  return NextResponse.json({ success:true });
}
