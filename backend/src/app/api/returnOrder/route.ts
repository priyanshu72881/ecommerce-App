import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ReturnOrder } from "@/models/returnorder";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json(); // { tenantId, orderId, userId, reason, items }
  const r = new ReturnOrder(body);
  await r.save();
  return NextResponse.json({ success:true, returnOrder: r });
}

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const tenantId = searchParams.get('tenantId');
  const query: any = {};
  if (tenantId) query.tenantId = tenantId;
  const list = await ReturnOrder.find(query).sort({ createdAt: -1 });
  return NextResponse.json({ success:true, returnOrders: list });
}

export async function PATCH(req: Request) {
  await connectDB();
  const body = await req.json(); // { id, status }
  const r = await ReturnOrder.findByIdAndUpdate(body.id, { status: body.status }, { new: true });
  return NextResponse.json({ success:true, returnOrder: r });
}
