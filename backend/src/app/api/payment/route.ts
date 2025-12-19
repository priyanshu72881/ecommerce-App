import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Payment } from "@/models/payment";
import { Order } from "@/models/order";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json(); // { orderId, tenantId, amount, method, providerResponse? }

  const payment = new Payment({
    orderId: body.orderId,
    tenantId: body.tenantId,
    amount: body.amount,
    method: body.method || 'cod',
    status: body.method === 'cod' ? 'success' : 'pending',
    providerResponse: body.providerResponse || null
  });

  await payment.save();

  if (body.method === 'cod') {
    // update order payment status
    await Order.findByIdAndUpdate(body.orderId, { paymentStatus: 'paid', paymentMethod: 'cod', status: 'created' });
  }

  return NextResponse.json({ success:true, payment });
}

/*
For online payments, you'd implement provider webhook endpoints to confirm payment and update Payment + Order.
*/
