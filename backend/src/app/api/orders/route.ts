import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/order";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json(); // expect { tenantId, userId, items, totalAmount, paymentMethod }
  const order = new Order(body);
  await order.save();
  return NextResponse.json({ success:true, order });
}

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const tenantId = searchParams.get("tenantId");
  const userId = searchParams.get("userId");
  const query: any = {};
  if (tenantId) query.tenantId = tenantId;
  if (userId) query.userId = userId;
  const orders = await Order.find(query).sort({ createdAt: -1 });
  return NextResponse.json({ success:true, orders });
}

export async function PATCH(req: Request) {
  await connectDB();
  const body = await req.json(); // { id, status }
  const order = await Order.findByIdAndUpdate(body.id, { status: body.status }, { new: true });
  return NextResponse.json({ success:true, order });
}

export async function DELETE(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    // allow id in body as fallback
    try {
      const body = await req.json();
      if (body?.id) {
        await Order.findByIdAndDelete(body.id);
        return NextResponse.json({ success: true });
      }
    } catch (e) {
      // ignore
    }
    return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  }

  await Order.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
