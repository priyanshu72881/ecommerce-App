import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  amount: Number,
  method: String,
  status: { type: String, enum: ["pending","success","failed"], default: "pending" },
  providerResponse: mongoose.Schema.Types.Mixed
}, { timestamps: true });

export const Payment = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
