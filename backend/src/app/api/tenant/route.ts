import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Tenant } from "@/models/tenant";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) return NextResponse.json({ success:false, message:'slug missing' }, { status:400 });
  const tenant = await Tenant.findOne({ slug });
  if (!tenant) return NextResponse.json({ success:false, message:'not found' }, { status:404 });
  return NextResponse.json({ success:true, tenant });
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const tenant = new Tenant(body);
  await tenant.save();
  return NextResponse.json({ success:true, tenant });
}

export async function PATCH(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    let slug = searchParams.get('slug');

    const body = await req.json().catch(() => null) || {};
    if (!slug && body?.slug) slug = body.slug;
    if (!slug) return NextResponse.json({ success:false, message:'slug missing' }, { status:400 });

    // pick allowed fields to update
    const update: any = {};
    const allowed = ['name','logoUrl','primaryColor','secondaryColor','accentColor','backgroundColor','font','setupCompleted','cardSizes'];
    for (const f of allowed) {
      if (typeof (body as any)[f] !== 'undefined') {
        if (f === 'cardSizes') {
          // ensure nested object
          update['cardSizes'] = body['cardSizes'];
        } else {
          update[f] = (body as any)[f];
        }
      }
    }

    const updated = await Tenant.findOneAndUpdate({ slug }, update, { new: true });
    if (!updated) return NextResponse.json({ success:false, message:'Tenant not found' }, { status:404 });
    return NextResponse.json({ success:true, tenant: updated });
  } catch (err) {
    console.error('Tenant PATCH error:', err);
    return NextResponse.json({ success:false, message:'Server error', err }, { status:500 });
  }
}
