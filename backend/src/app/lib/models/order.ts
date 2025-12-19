import mongoose from "mongoose";

const OrderItem = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
  price: Number
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [OrderItem],
  status: { type: String, enum: ["created","paid","shipped","delivered","cancelled","returned"], default: "created" },
  totalAmount: Number,
  paymentMethod: String,
  paymentStatus: { type: String, enum: ["pending","paid","failed"], default: "pending" },
}, { timestamps: true });

export const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
