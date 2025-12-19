import mongoose from "mongoose";

const ReturnSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reason: String,
  status: { type: String, enum: ["requested","approved","rejected","completed"], default: "requested" },
  items: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }]
}, { timestamps: true });

export const ReturnOrder = mongoose.models.ReturnOrder || mongoose.model("ReturnOrder", ReturnSchema);
